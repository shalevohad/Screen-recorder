function Hp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nh = { exports: {} }, yt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho = Symbol.for("react.element"), Kp = Symbol.for("react.portal"), Vp = Symbol.for("react.fragment"), Yp = Symbol.for("react.strict_mode"), Gp = Symbol.for("react.profiler"), Xp = Symbol.for("react.provider"), Qp = Symbol.for("react.context"), Jp = Symbol.for("react.forward_ref"), Zp = Symbol.for("react.suspense"), qp = Symbol.for("react.memo"), em = Symbol.for("react.lazy"), $u = Symbol.iterator;
function tm(e) {
  return e === null || typeof e != "object" ? null : (e = $u && e[$u] || e["@@iterator"], typeof e == "function" ? e : null);
}
var sh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, rh = Object.assign, lh = {};
function xl(e, t, n) {
  this.props = e, this.context = t, this.refs = lh, this.updater = n || sh;
}
xl.prototype.isReactComponent = {};
xl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function oh() {
}
oh.prototype = xl.prototype;
function Tc(e, t, n) {
  this.props = e, this.context = t, this.refs = lh, this.updater = n || sh;
}
var Ac = Tc.prototype = new oh();
Ac.constructor = Tc;
rh(Ac, xl.prototype);
Ac.isPureReactComponent = !0;
var Ru = Array.isArray, ah = Object.prototype.hasOwnProperty, $c = { current: null }, ih = { key: !0, ref: !0, __self: !0, __source: !0 };
function ch(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) ah.call(t, r) && !ih.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: ho, type: e, key: o, ref: a, props: l, _owner: $c.current };
}
function nm(e, t) {
  return { $$typeof: ho, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Rc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ho;
}
function sm(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Lu = /\/+/g;
function Qa(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? sm("" + e.key) : t.toString(36);
}
function Uo(e, t, n, r, l) {
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
        case ho:
        case Kp:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + Qa(a, 0) : r, Ru(l) ? (n = "", e != null && (n = e.replace(Lu, "$&/") + "/"), Uo(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Rc(l) && (l = nm(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Lu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Ru(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + Qa(o, i);
    a += Uo(o, t, n, c, l);
  }
  else if (c = tm(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + Qa(o, i++), a += Uo(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function wo(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Uo(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function rm(e) {
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
var Ln = { current: null }, Wo = { transition: null }, lm = { ReactCurrentDispatcher: Ln, ReactCurrentBatchConfig: Wo, ReactCurrentOwner: $c };
function uh() {
  throw Error("act(...) is not supported in production builds of React.");
}
yt.Children = { map: wo, forEach: function(e, t, n) {
  wo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return wo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return wo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Rc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
yt.Component = xl;
yt.Fragment = Vp;
yt.Profiler = Gp;
yt.PureComponent = Tc;
yt.StrictMode = Yp;
yt.Suspense = Zp;
yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lm;
yt.act = uh;
yt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = rh({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = $c.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) ah.call(t, c) && !ih.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    i = Array(c);
    for (var d = 0; d < c; d++) i[d] = arguments[d + 2];
    r.children = i;
  }
  return { $$typeof: ho, type: e.type, key: l, ref: o, props: r, _owner: a };
};
yt.createContext = function(e) {
  return e = { $$typeof: Qp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Xp, _context: e }, e.Consumer = e;
};
yt.createElement = ch;
yt.createFactory = function(e) {
  var t = ch.bind(null, e);
  return t.type = e, t;
};
yt.createRef = function() {
  return { current: null };
};
yt.forwardRef = function(e) {
  return { $$typeof: Jp, render: e };
};
yt.isValidElement = Rc;
yt.lazy = function(e) {
  return { $$typeof: em, _payload: { _status: -1, _result: e }, _init: rm };
};
yt.memo = function(e, t) {
  return { $$typeof: qp, type: e, compare: t === void 0 ? null : t };
};
yt.startTransition = function(e) {
  var t = Wo.transition;
  Wo.transition = {};
  try {
    e();
  } finally {
    Wo.transition = t;
  }
};
yt.unstable_act = uh;
yt.useCallback = function(e, t) {
  return Ln.current.useCallback(e, t);
};
yt.useContext = function(e) {
  return Ln.current.useContext(e);
};
yt.useDebugValue = function() {
};
yt.useDeferredValue = function(e) {
  return Ln.current.useDeferredValue(e);
};
yt.useEffect = function(e, t) {
  return Ln.current.useEffect(e, t);
};
yt.useId = function() {
  return Ln.current.useId();
};
yt.useImperativeHandle = function(e, t, n) {
  return Ln.current.useImperativeHandle(e, t, n);
};
yt.useInsertionEffect = function(e, t) {
  return Ln.current.useInsertionEffect(e, t);
};
yt.useLayoutEffect = function(e, t) {
  return Ln.current.useLayoutEffect(e, t);
};
yt.useMemo = function(e, t) {
  return Ln.current.useMemo(e, t);
};
yt.useReducer = function(e, t, n) {
  return Ln.current.useReducer(e, t, n);
};
yt.useRef = function(e) {
  return Ln.current.useRef(e);
};
yt.useState = function(e) {
  return Ln.current.useState(e);
};
yt.useSyncExternalStore = function(e, t, n) {
  return Ln.current.useSyncExternalStore(e, t, n);
};
yt.useTransition = function() {
  return Ln.current.useTransition();
};
yt.version = "18.3.1";
nh.exports = yt;
var u = nh.exports;
const fo = /* @__PURE__ */ Hp(u);
var ta = {}, dh = { exports: {} }, Qn = {}, hh = { exports: {} }, fh = {};
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
  function t(C, R) {
    var F = C.length;
    C.push(R);
    e: for (; 0 < F; ) {
      var Y = F - 1 >>> 1, B = C[Y];
      if (0 < l(B, R)) C[Y] = R, C[F] = B, F = Y;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var R = C[0], F = C.pop();
    if (F !== R) {
      C[0] = F;
      e: for (var Y = 0, B = C.length, se = B >>> 1; Y < se; ) {
        var ee = 2 * (Y + 1) - 1, J = C[ee], le = ee + 1, We = C[le];
        if (0 > l(J, F)) le < B && 0 > l(We, J) ? (C[Y] = We, C[le] = F, Y = le) : (C[Y] = J, C[ee] = F, Y = ee);
        else if (le < B && 0 > l(We, F)) C[Y] = We, C[le] = F, Y = le;
        else break e;
      }
    }
    return R;
  }
  function l(C, R) {
    var F = C.sortIndex - R.sortIndex;
    return F !== 0 ? F : C.id - R.id;
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
  var c = [], d = [], v = 1, f = null, m = 3, y = !1, E = !1, M = !1, D = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(C) {
    for (var R = n(d); R !== null; ) {
      if (R.callback === null) r(d);
      else if (R.startTime <= C) r(d), R.sortIndex = R.expirationTime, t(c, R);
      else break;
      R = n(d);
    }
  }
  function b(C) {
    if (M = !1, h(C), !E) if (n(c) !== null) E = !0, V(S);
    else {
      var R = n(d);
      R !== null && oe(b, R.startTime - C);
    }
  }
  function S(C, R) {
    E = !1, M && (M = !1, k(T), T = -1), y = !0;
    var F = m;
    try {
      for (h(R), f = n(c); f !== null && (!(f.expirationTime > R) || C && !P()); ) {
        var Y = f.callback;
        if (typeof Y == "function") {
          f.callback = null, m = f.priorityLevel;
          var B = Y(f.expirationTime <= R);
          R = e.unstable_now(), typeof B == "function" ? f.callback = B : f === n(c) && r(c), h(R);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var se = !0;
      else {
        var ee = n(d);
        ee !== null && oe(b, ee.startTime - R), se = !1;
      }
      return se;
    } finally {
      f = null, m = F, y = !1;
    }
  }
  var j = !1, N = null, T = -1, x = 5, I = -1;
  function P() {
    return !(e.unstable_now() - I < x);
  }
  function K() {
    if (N !== null) {
      var C = e.unstable_now();
      I = C;
      var R = !0;
      try {
        R = N(!0, C);
      } finally {
        R ? $() : (j = !1, N = null);
      }
    } else j = !1;
  }
  var $;
  if (typeof p == "function") $ = function() {
    p(K);
  };
  else if (typeof MessageChannel < "u") {
    var U = new MessageChannel(), ne = U.port2;
    U.port1.onmessage = K, $ = function() {
      ne.postMessage(null);
    };
  } else $ = function() {
    D(K, 0);
  };
  function V(C) {
    N = C, j || (j = !0, $());
  }
  function oe(C, R) {
    T = D(function() {
      C(e.unstable_now());
    }, R);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    E || y || (E = !0, V(S));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : x = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(C) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = m;
    }
    var F = m;
    m = R;
    try {
      return C();
    } finally {
      m = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, R) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var F = m;
    m = C;
    try {
      return R();
    } finally {
      m = F;
    }
  }, e.unstable_scheduleCallback = function(C, R, F) {
    var Y = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? Y + F : Y) : F = Y, C) {
      case 1:
        var B = -1;
        break;
      case 2:
        B = 250;
        break;
      case 5:
        B = 1073741823;
        break;
      case 4:
        B = 1e4;
        break;
      default:
        B = 5e3;
    }
    return B = F + B, C = { id: v++, callback: R, priorityLevel: C, startTime: F, expirationTime: B, sortIndex: -1 }, F > Y ? (C.sortIndex = F, t(d, C), n(c) === null && C === n(d) && (M ? (k(T), T = -1) : M = !0, oe(b, F - Y))) : (C.sortIndex = B, t(c, C), E || y || (E = !0, V(S))), C;
  }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(C) {
    var R = m;
    return function() {
      var F = m;
      m = R;
      try {
        return C.apply(this, arguments);
      } finally {
        m = F;
      }
    };
  };
})(fh);
hh.exports = fh;
var om = hh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var am = u, Xn = om;
function ye(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ph = /* @__PURE__ */ new Set(), Yl = {};
function Rr(e, t) {
  ul(e, t), ul(e + "Capture", t);
}
function ul(e, t) {
  for (Yl[e] = t, e = 0; e < t.length; e++) ph.add(t[e]);
}
var Rs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ai = Object.prototype.hasOwnProperty, im = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ou = {}, Du = {};
function cm(e) {
  return Ai.call(Du, e) ? !0 : Ai.call(Ou, e) ? !1 : im.test(e) ? Du[e] = !0 : (Ou[e] = !0, !1);
}
function um(e, t, n, r) {
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
function dm(e, t, n, r) {
  if (t === null || typeof t > "u" || um(e, t, n, r)) return !0;
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
function On(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var Nn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Nn[e] = new On(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Nn[t] = new On(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Nn[e] = new On(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Nn[e] = new On(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Nn[e] = new On(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Nn[e] = new On(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Nn[e] = new On(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Nn[e] = new On(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Nn[e] = new On(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Lc = /[\-:]([a-z])/g;
function Oc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Lc,
    Oc
  );
  Nn[t] = new On(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Lc, Oc);
  Nn[t] = new On(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Lc, Oc);
  Nn[t] = new On(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Nn[e] = new On(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Nn.xlinkHref = new On("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Nn[e] = new On(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Dc(e, t, n, r) {
  var l = Nn.hasOwnProperty(t) ? Nn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (dm(t, n, l, r) && (n = null), r || l === null ? cm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ps = am.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, jo = Symbol.for("react.element"), Wr = Symbol.for("react.portal"), zr = Symbol.for("react.fragment"), Pc = Symbol.for("react.strict_mode"), $i = Symbol.for("react.profiler"), mh = Symbol.for("react.provider"), gh = Symbol.for("react.context"), _c = Symbol.for("react.forward_ref"), Ri = Symbol.for("react.suspense"), Li = Symbol.for("react.suspense_list"), Fc = Symbol.for("react.memo"), Vs = Symbol.for("react.lazy"), xh = Symbol.for("react.offscreen"), Pu = Symbol.iterator;
function jl(e) {
  return e === null || typeof e != "object" ? null : (e = Pu && e[Pu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var en = Object.assign, Ja;
function Ll(e) {
  if (Ja === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ja = t && t[1] || "";
  }
  return `
` + Ja + e;
}
var Za = !1;
function qa(e, t) {
  if (!e || Za) return "";
  Za = !0;
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
    Za = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Ll(e) : "";
}
function hm(e) {
  switch (e.tag) {
    case 5:
      return Ll(e.type);
    case 16:
      return Ll("Lazy");
    case 13:
      return Ll("Suspense");
    case 19:
      return Ll("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = qa(e.type, !1), e;
    case 11:
      return e = qa(e.type.render, !1), e;
    case 1:
      return e = qa(e.type, !0), e;
    default:
      return "";
  }
}
function Oi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case zr:
      return "Fragment";
    case Wr:
      return "Portal";
    case $i:
      return "Profiler";
    case Pc:
      return "StrictMode";
    case Ri:
      return "Suspense";
    case Li:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case gh:
      return (e.displayName || "Context") + ".Consumer";
    case mh:
      return (e._context.displayName || "Context") + ".Provider";
    case _c:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Fc:
      return t = e.displayName || null, t !== null ? t : Oi(e.type) || "Memo";
    case Vs:
      t = e._payload, e = e._init;
      try {
        return Oi(e(t));
      } catch {
      }
  }
  return null;
}
function fm(e) {
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
      return Oi(t);
    case 8:
      return t === Pc ? "StrictMode" : "Mode";
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
function yh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function pm(e) {
  var t = yh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function Eo(e) {
  e._valueTracker || (e._valueTracker = pm(e));
}
function vh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = yh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function na(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Di(e, t) {
  var n = t.checked;
  return en({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function _u(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = cr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Nh(e, t) {
  t = t.checked, t != null && Dc(e, "checked", t, !1);
}
function Pi(e, t) {
  Nh(e, t);
  var n = cr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? _i(e, t.type, n) : t.hasOwnProperty("defaultValue") && _i(e, t.type, cr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Fu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function _i(e, t, n) {
  (t !== "number" || na(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ol = Array.isArray;
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
function Fi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ye(91));
  return en({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Bu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(ye(92));
      if (Ol(n)) {
        if (1 < n.length) throw Error(ye(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: cr(n) };
}
function kh(e, t) {
  var n = cr(t.value), r = cr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Uu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function wh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Bi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? wh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Co, jh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Co = Co || document.createElement("div"), Co.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Co.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Gl(e, t) {
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
}, mm = ["Webkit", "ms", "Moz", "O"];
Object.keys(_l).forEach(function(e) {
  mm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), _l[t] = _l[e];
  });
});
function Eh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _l.hasOwnProperty(e) && _l[e] ? ("" + t).trim() : t + "px";
}
function Ch(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Eh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var gm = en({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ui(e, t) {
  if (t) {
    if (gm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ye(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ye(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ye(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ye(62));
  }
}
function Wi(e, t) {
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
var zi = null;
function Bc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Hi = null, nl = null, sl = null;
function Wu(e) {
  if (e = go(e)) {
    if (typeof Hi != "function") throw Error(ye(280));
    var t = e.stateNode;
    t && (t = $a(t), Hi(e.stateNode, e.type, t));
  }
}
function Sh(e) {
  nl ? sl ? sl.push(e) : sl = [e] : nl = e;
}
function bh() {
  if (nl) {
    var e = nl, t = sl;
    if (sl = nl = null, Wu(e), t) for (e = 0; e < t.length; e++) Wu(t[e]);
  }
}
function Mh(e, t) {
  return e(t);
}
function Ih() {
}
var ei = !1;
function Th(e, t, n) {
  if (ei) return e(t, n);
  ei = !0;
  try {
    return Mh(e, t, n);
  } finally {
    ei = !1, (nl !== null || sl !== null) && (Ih(), bh());
  }
}
function Xl(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = $a(n);
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
  if (n && typeof n != "function") throw Error(ye(231, t, typeof n));
  return n;
}
var Ki = !1;
if (Rs) try {
  var El = {};
  Object.defineProperty(El, "passive", { get: function() {
    Ki = !0;
  } }), window.addEventListener("test", El, El), window.removeEventListener("test", El, El);
} catch {
  Ki = !1;
}
function xm(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Fl = !1, sa = null, ra = !1, Vi = null, ym = { onError: function(e) {
  Fl = !0, sa = e;
} };
function vm(e, t, n, r, l, o, a, i, c) {
  Fl = !1, sa = null, xm.apply(ym, arguments);
}
function Nm(e, t, n, r, l, o, a, i, c) {
  if (vm.apply(this, arguments), Fl) {
    if (Fl) {
      var d = sa;
      Fl = !1, sa = null;
    } else throw Error(ye(198));
    ra || (ra = !0, Vi = d);
  }
}
function Lr(e) {
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
function Ah(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function zu(e) {
  if (Lr(e) !== e) throw Error(ye(188));
}
function km(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Lr(e), t === null) throw Error(ye(188));
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
        if (o === n) return zu(l), e;
        if (o === r) return zu(l), t;
        o = o.sibling;
      }
      throw Error(ye(188));
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
        if (!a) throw Error(ye(189));
      }
    }
    if (n.alternate !== r) throw Error(ye(190));
  }
  if (n.tag !== 3) throw Error(ye(188));
  return n.stateNode.current === n ? e : t;
}
function $h(e) {
  return e = km(e), e !== null ? Rh(e) : null;
}
function Rh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Rh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Lh = Xn.unstable_scheduleCallback, Hu = Xn.unstable_cancelCallback, wm = Xn.unstable_shouldYield, jm = Xn.unstable_requestPaint, rn = Xn.unstable_now, Em = Xn.unstable_getCurrentPriorityLevel, Uc = Xn.unstable_ImmediatePriority, Oh = Xn.unstable_UserBlockingPriority, la = Xn.unstable_NormalPriority, Cm = Xn.unstable_LowPriority, Dh = Xn.unstable_IdlePriority, Ma = null, ks = null;
function Sm(e) {
  if (ks && typeof ks.onCommitFiberRoot == "function") try {
    ks.onCommitFiberRoot(Ma, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var fs = Math.clz32 ? Math.clz32 : Im, bm = Math.log, Mm = Math.LN2;
function Im(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (bm(e) / Mm | 0) | 0;
}
var So = 64, bo = 4194304;
function Dl(e) {
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
function oa(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Dl(i) : (o &= a, o !== 0 && (r = Dl(o)));
  } else a = n & ~l, a !== 0 ? r = Dl(a) : o !== 0 && (r = Dl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - fs(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Tm(e, t) {
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
function Am(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - fs(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = Tm(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function Yi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ph() {
  var e = So;
  return So <<= 1, !(So & 4194240) && (So = 64), e;
}
function ti(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function po(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - fs(t), e[t] = n;
}
function $m(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - fs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Wc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - fs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Lt = 0;
function _h(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Fh, zc, Bh, Uh, Wh, Gi = !1, Mo = [], tr = null, nr = null, sr = null, Ql = /* @__PURE__ */ new Map(), Jl = /* @__PURE__ */ new Map(), Qs = [], Rm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Ku(e, t) {
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
      Ql.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jl.delete(t.pointerId);
  }
}
function Cl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = go(t), t !== null && zc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Lm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return tr = Cl(tr, e, t, n, r, l), !0;
    case "dragenter":
      return nr = Cl(nr, e, t, n, r, l), !0;
    case "mouseover":
      return sr = Cl(sr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ql.set(o, Cl(Ql.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Jl.set(o, Cl(Jl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function zh(e) {
  var t = kr(e.target);
  if (t !== null) {
    var n = Lr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ah(n), t !== null) {
          e.blockedOn = t, Wh(e.priority, function() {
            Bh(n);
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
function zo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Xi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      zi = r, n.target.dispatchEvent(r), zi = null;
    } else return t = go(n), t !== null && zc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Vu(e, t, n) {
  zo(e) && n.delete(t);
}
function Om() {
  Gi = !1, tr !== null && zo(tr) && (tr = null), nr !== null && zo(nr) && (nr = null), sr !== null && zo(sr) && (sr = null), Ql.forEach(Vu), Jl.forEach(Vu);
}
function Sl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Gi || (Gi = !0, Xn.unstable_scheduleCallback(Xn.unstable_NormalPriority, Om)));
}
function Zl(e) {
  function t(l) {
    return Sl(l, e);
  }
  if (0 < Mo.length) {
    Sl(Mo[0], e);
    for (var n = 1; n < Mo.length; n++) {
      var r = Mo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (tr !== null && Sl(tr, e), nr !== null && Sl(nr, e), sr !== null && Sl(sr, e), Ql.forEach(t), Jl.forEach(t), n = 0; n < Qs.length; n++) r = Qs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Qs.length && (n = Qs[0], n.blockedOn === null); ) zh(n), n.blockedOn === null && Qs.shift();
}
var rl = Ps.ReactCurrentBatchConfig, aa = !0;
function Dm(e, t, n, r) {
  var l = Lt, o = rl.transition;
  rl.transition = null;
  try {
    Lt = 1, Hc(e, t, n, r);
  } finally {
    Lt = l, rl.transition = o;
  }
}
function Pm(e, t, n, r) {
  var l = Lt, o = rl.transition;
  rl.transition = null;
  try {
    Lt = 4, Hc(e, t, n, r);
  } finally {
    Lt = l, rl.transition = o;
  }
}
function Hc(e, t, n, r) {
  if (aa) {
    var l = Xi(e, t, n, r);
    if (l === null) di(e, t, r, ia, n), Ku(e, r);
    else if (Lm(l, e, t, n, r)) r.stopPropagation();
    else if (Ku(e, r), t & 4 && -1 < Rm.indexOf(e)) {
      for (; l !== null; ) {
        var o = go(l);
        if (o !== null && Fh(o), o = Xi(e, t, n, r), o === null && di(e, t, r, ia, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else di(e, t, r, null, n);
  }
}
var ia = null;
function Xi(e, t, n, r) {
  if (ia = null, e = Bc(r), e = kr(e), e !== null) if (t = Lr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ah(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ia = e, null;
}
function Hh(e) {
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
      switch (Em()) {
        case Uc:
          return 1;
        case Oh:
          return 4;
        case la:
        case Cm:
          return 16;
        case Dh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var qs = null, Kc = null, Ho = null;
function Kh() {
  if (Ho) return Ho;
  var e, t = Kc, n = t.length, r, l = "value" in qs ? qs.value : qs.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return Ho = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ko(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Io() {
  return !0;
}
function Yu() {
  return !1;
}
function Jn(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Io : Yu, this.isPropagationStopped = Yu, this;
  }
  return en(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Io);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Io);
  }, persist: function() {
  }, isPersistent: Io }), t;
}
var yl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Vc = Jn(yl), mo = en({}, yl, { view: 0, detail: 0 }), _m = Jn(mo), ni, si, bl, Ia = en({}, mo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Yc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== bl && (bl && e.type === "mousemove" ? (ni = e.screenX - bl.screenX, si = e.screenY - bl.screenY) : si = ni = 0, bl = e), ni);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : si;
} }), Gu = Jn(Ia), Fm = en({}, Ia, { dataTransfer: 0 }), Bm = Jn(Fm), Um = en({}, mo, { relatedTarget: 0 }), ri = Jn(Um), Wm = en({}, yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), zm = Jn(Wm), Hm = en({}, yl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Km = Jn(Hm), Vm = en({}, yl, { data: 0 }), Xu = Jn(Vm), Ym = {
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
}, Gm = {
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
}, Xm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Qm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Xm[e]) ? !!t[e] : !1;
}
function Yc() {
  return Qm;
}
var Jm = en({}, mo, { key: function(e) {
  if (e.key) {
    var t = Ym[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ko(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Gm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Yc, charCode: function(e) {
  return e.type === "keypress" ? Ko(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ko(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Zm = Jn(Jm), qm = en({}, Ia, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Qu = Jn(qm), e0 = en({}, mo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Yc }), t0 = Jn(e0), n0 = en({}, yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), s0 = Jn(n0), r0 = en({}, Ia, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), l0 = Jn(r0), o0 = [9, 13, 27, 32], Gc = Rs && "CompositionEvent" in window, Bl = null;
Rs && "documentMode" in document && (Bl = document.documentMode);
var a0 = Rs && "TextEvent" in window && !Bl, Vh = Rs && (!Gc || Bl && 8 < Bl && 11 >= Bl), Ju = " ", Zu = !1;
function Yh(e, t) {
  switch (e) {
    case "keyup":
      return o0.indexOf(t.keyCode) !== -1;
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
function Gh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Hr = !1;
function i0(e, t) {
  switch (e) {
    case "compositionend":
      return Gh(t);
    case "keypress":
      return t.which !== 32 ? null : (Zu = !0, Ju);
    case "textInput":
      return e = t.data, e === Ju && Zu ? null : e;
    default:
      return null;
  }
}
function c0(e, t) {
  if (Hr) return e === "compositionend" || !Gc && Yh(e, t) ? (e = Kh(), Ho = Kc = qs = null, Hr = !1, e) : null;
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
      return Vh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var u0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function qu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!u0[e.type] : t === "textarea";
}
function Xh(e, t, n, r) {
  Sh(r), t = ca(t, "onChange"), 0 < t.length && (n = new Vc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Ul = null, ql = null;
function d0(e) {
  of(e, 0);
}
function Ta(e) {
  var t = Yr(e);
  if (vh(t)) return e;
}
function h0(e, t) {
  if (e === "change") return t;
}
var Qh = !1;
if (Rs) {
  var li;
  if (Rs) {
    var oi = "oninput" in document;
    if (!oi) {
      var ed = document.createElement("div");
      ed.setAttribute("oninput", "return;"), oi = typeof ed.oninput == "function";
    }
    li = oi;
  } else li = !1;
  Qh = li && (!document.documentMode || 9 < document.documentMode);
}
function td() {
  Ul && (Ul.detachEvent("onpropertychange", Jh), ql = Ul = null);
}
function Jh(e) {
  if (e.propertyName === "value" && Ta(ql)) {
    var t = [];
    Xh(t, ql, e, Bc(e)), Th(d0, t);
  }
}
function f0(e, t, n) {
  e === "focusin" ? (td(), Ul = t, ql = n, Ul.attachEvent("onpropertychange", Jh)) : e === "focusout" && td();
}
function p0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ta(ql);
}
function m0(e, t) {
  if (e === "click") return Ta(t);
}
function g0(e, t) {
  if (e === "input" || e === "change") return Ta(t);
}
function x0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ms = typeof Object.is == "function" ? Object.is : x0;
function eo(e, t) {
  if (ms(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ai.call(t, l) || !ms(e[l], t[l])) return !1;
  }
  return !0;
}
function nd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function sd(e, t) {
  var n = nd(e);
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
    n = nd(n);
  }
}
function Zh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function qh() {
  for (var e = window, t = na(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = na(e.document);
  }
  return t;
}
function Xc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function y0(e) {
  var t = qh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Zh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Xc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = sd(n, o);
        var a = sd(
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
var v0 = Rs && "documentMode" in document && 11 >= document.documentMode, Kr = null, Qi = null, Wl = null, Ji = !1;
function rd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ji || Kr == null || Kr !== na(r) || (r = Kr, "selectionStart" in r && Xc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Wl && eo(Wl, r) || (Wl = r, r = ca(Qi, "onSelect"), 0 < r.length && (t = new Vc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Kr)));
}
function To(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Vr = { animationend: To("Animation", "AnimationEnd"), animationiteration: To("Animation", "AnimationIteration"), animationstart: To("Animation", "AnimationStart"), transitionend: To("Transition", "TransitionEnd") }, ai = {}, ef = {};
Rs && (ef = document.createElement("div").style, "AnimationEvent" in window || (delete Vr.animationend.animation, delete Vr.animationiteration.animation, delete Vr.animationstart.animation), "TransitionEvent" in window || delete Vr.transitionend.transition);
function Aa(e) {
  if (ai[e]) return ai[e];
  if (!Vr[e]) return e;
  var t = Vr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ef) return ai[e] = t[n];
  return e;
}
var tf = Aa("animationend"), nf = Aa("animationiteration"), sf = Aa("animationstart"), rf = Aa("transitionend"), lf = /* @__PURE__ */ new Map(), ld = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function dr(e, t) {
  lf.set(e, t), Rr(t, [e]);
}
for (var ii = 0; ii < ld.length; ii++) {
  var ci = ld[ii], N0 = ci.toLowerCase(), k0 = ci[0].toUpperCase() + ci.slice(1);
  dr(N0, "on" + k0);
}
dr(tf, "onAnimationEnd");
dr(nf, "onAnimationIteration");
dr(sf, "onAnimationStart");
dr("dblclick", "onDoubleClick");
dr("focusin", "onFocus");
dr("focusout", "onBlur");
dr(rf, "onTransitionEnd");
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
var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), w0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pl));
function od(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Nm(r, t, void 0, e), e.currentTarget = null;
}
function of(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var i = r[a], c = i.instance, d = i.currentTarget;
        if (i = i.listener, c !== o && l.isPropagationStopped()) break e;
        od(l, i, d), o = c;
      }
      else for (a = 0; a < r.length; a++) {
        if (i = r[a], c = i.instance, d = i.currentTarget, i = i.listener, c !== o && l.isPropagationStopped()) break e;
        od(l, i, d), o = c;
      }
    }
  }
  if (ra) throw e = Vi, ra = !1, Vi = null, e;
}
function Vt(e, t) {
  var n = t[nc];
  n === void 0 && (n = t[nc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (af(t, e, 2, !1), n.add(r));
}
function ui(e, t, n) {
  var r = 0;
  t && (r |= 4), af(n, e, r, t);
}
var Ao = "_reactListening" + Math.random().toString(36).slice(2);
function to(e) {
  if (!e[Ao]) {
    e[Ao] = !0, ph.forEach(function(n) {
      n !== "selectionchange" && (w0.has(n) || ui(n, !1, e), ui(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ao] || (t[Ao] = !0, ui("selectionchange", !1, t));
  }
}
function af(e, t, n, r) {
  switch (Hh(t)) {
    case 1:
      var l = Dm;
      break;
    case 4:
      l = Pm;
      break;
    default:
      l = Hc;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ki || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function di(e, t, n, r, l) {
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
        if (a = kr(i), a === null) return;
        if (c = a.tag, c === 5 || c === 6) {
          r = o = a;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  Th(function() {
    var d = o, v = Bc(n), f = [];
    e: {
      var m = lf.get(e);
      if (m !== void 0) {
        var y = Vc, E = e;
        switch (e) {
          case "keypress":
            if (Ko(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Zm;
            break;
          case "focusin":
            E = "focus", y = ri;
            break;
          case "focusout":
            E = "blur", y = ri;
            break;
          case "beforeblur":
          case "afterblur":
            y = ri;
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
            y = Gu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Bm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = t0;
            break;
          case tf:
          case nf:
          case sf:
            y = zm;
            break;
          case rf:
            y = s0;
            break;
          case "scroll":
            y = _m;
            break;
          case "wheel":
            y = l0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Km;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Qu;
        }
        var M = (t & 4) !== 0, D = !M && e === "scroll", k = M ? m !== null ? m + "Capture" : null : m;
        M = [];
        for (var p = d, h; p !== null; ) {
          h = p;
          var b = h.stateNode;
          if (h.tag === 5 && b !== null && (h = b, k !== null && (b = Xl(p, k), b != null && M.push(no(p, b, h)))), D) break;
          p = p.return;
        }
        0 < M.length && (m = new y(m, E, null, n, v), f.push({ event: m, listeners: M }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", m && n !== zi && (E = n.relatedTarget || n.fromElement) && (kr(E) || E[Ls])) break e;
        if ((y || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, y ? (E = n.relatedTarget || n.toElement, y = d, E = E ? kr(E) : null, E !== null && (D = Lr(E), E !== D || E.tag !== 5 && E.tag !== 6) && (E = null)) : (y = null, E = d), y !== E)) {
          if (M = Gu, b = "onMouseLeave", k = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (M = Qu, b = "onPointerLeave", k = "onPointerEnter", p = "pointer"), D = y == null ? m : Yr(y), h = E == null ? m : Yr(E), m = new M(b, p + "leave", y, n, v), m.target = D, m.relatedTarget = h, b = null, kr(v) === d && (M = new M(k, p + "enter", E, n, v), M.target = h, M.relatedTarget = D, b = M), D = b, y && E) t: {
            for (M = y, k = E, p = 0, h = M; h; h = Dr(h)) p++;
            for (h = 0, b = k; b; b = Dr(b)) h++;
            for (; 0 < p - h; ) M = Dr(M), p--;
            for (; 0 < h - p; ) k = Dr(k), h--;
            for (; p--; ) {
              if (M === k || k !== null && M === k.alternate) break t;
              M = Dr(M), k = Dr(k);
            }
            M = null;
          }
          else M = null;
          y !== null && ad(f, m, y, M, !1), E !== null && D !== null && ad(f, D, E, M, !0);
        }
      }
      e: {
        if (m = d ? Yr(d) : window, y = m.nodeName && m.nodeName.toLowerCase(), y === "select" || y === "input" && m.type === "file") var S = h0;
        else if (qu(m)) if (Qh) S = g0;
        else {
          S = p0;
          var j = f0;
        }
        else (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (S = m0);
        if (S && (S = S(e, d))) {
          Xh(f, S, n, v);
          break e;
        }
        j && j(e, m, d), e === "focusout" && (j = m._wrapperState) && j.controlled && m.type === "number" && _i(m, "number", m.value);
      }
      switch (j = d ? Yr(d) : window, e) {
        case "focusin":
          (qu(j) || j.contentEditable === "true") && (Kr = j, Qi = d, Wl = null);
          break;
        case "focusout":
          Wl = Qi = Kr = null;
          break;
        case "mousedown":
          Ji = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ji = !1, rd(f, n, v);
          break;
        case "selectionchange":
          if (v0) break;
        case "keydown":
        case "keyup":
          rd(f, n, v);
      }
      var N;
      if (Gc) e: {
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
      else Hr ? Yh(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Vh && n.locale !== "ko" && (Hr || T !== "onCompositionStart" ? T === "onCompositionEnd" && Hr && (N = Kh()) : (qs = v, Kc = "value" in qs ? qs.value : qs.textContent, Hr = !0)), j = ca(d, T), 0 < j.length && (T = new Xu(T, e, null, n, v), f.push({ event: T, listeners: j }), N ? T.data = N : (N = Gh(n), N !== null && (T.data = N)))), (N = a0 ? i0(e, n) : c0(e, n)) && (d = ca(d, "onBeforeInput"), 0 < d.length && (v = new Xu("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = N));
    }
    of(f, t);
  });
}
function no(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ca(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Xl(e, n), o != null && r.unshift(no(e, o, l)), o = Xl(e, t), o != null && r.push(no(e, o, l))), e = e.return;
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
function ad(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var i = n, c = i.alternate, d = i.stateNode;
    if (c !== null && c === r) break;
    i.tag === 5 && d !== null && (i = d, l ? (c = Xl(n, o), c != null && a.unshift(no(n, c, i))) : l || (c = Xl(n, o), c != null && a.push(no(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var j0 = /\r\n?/g, E0 = /\u0000|\uFFFD/g;
function id(e) {
  return (typeof e == "string" ? e : "" + e).replace(j0, `
`).replace(E0, "");
}
function $o(e, t, n) {
  if (t = id(t), id(e) !== t && n) throw Error(ye(425));
}
function ua() {
}
var Zi = null, qi = null;
function ec(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var tc = typeof setTimeout == "function" ? setTimeout : void 0, C0 = typeof clearTimeout == "function" ? clearTimeout : void 0, cd = typeof Promise == "function" ? Promise : void 0, S0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof cd < "u" ? function(e) {
  return cd.resolve(null).then(e).catch(b0);
} : tc;
function b0(e) {
  setTimeout(function() {
    throw e;
  });
}
function hi(e, t) {
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
function ud(e) {
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
var vl = Math.random().toString(36).slice(2), vs = "__reactFiber$" + vl, so = "__reactProps$" + vl, Ls = "__reactContainer$" + vl, nc = "__reactEvents$" + vl, M0 = "__reactListeners$" + vl, I0 = "__reactHandles$" + vl;
function kr(e) {
  var t = e[vs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ls] || n[vs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ud(e); e !== null; ) {
        if (n = e[vs]) return n;
        e = ud(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function go(e) {
  return e = e[vs] || e[Ls], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Yr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ye(33));
}
function $a(e) {
  return e[so] || null;
}
var sc = [], Gr = -1;
function hr(e) {
  return { current: e };
}
function Yt(e) {
  0 > Gr || (e.current = sc[Gr], sc[Gr] = null, Gr--);
}
function Ht(e, t) {
  Gr++, sc[Gr] = e.current, e.current = t;
}
var ur = {}, Sn = hr(ur), Un = hr(!1), Mr = ur;
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
function da() {
  Yt(Un), Yt(Sn);
}
function dd(e, t, n) {
  if (Sn.current !== ur) throw Error(ye(168));
  Ht(Sn, t), Ht(Un, n);
}
function cf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ye(108, fm(e) || "Unknown", l));
  return en({}, n, r);
}
function ha(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ur, Mr = Sn.current, Ht(Sn, e), Ht(Un, Un.current), !0;
}
function hd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ye(169));
  n ? (e = cf(e, t, Mr), r.__reactInternalMemoizedMergedChildContext = e, Yt(Un), Yt(Sn), Ht(Sn, e)) : Yt(Un), Ht(Un, n);
}
var bs = null, Ra = !1, fi = !1;
function uf(e) {
  bs === null ? bs = [e] : bs.push(e);
}
function T0(e) {
  Ra = !0, uf(e);
}
function fr() {
  if (!fi && bs !== null) {
    fi = !0;
    var e = 0, t = Lt;
    try {
      var n = bs;
      for (Lt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      bs = null, Ra = !1;
    } catch (l) {
      throw bs !== null && (bs = bs.slice(e + 1)), Lh(Uc, fr), l;
    } finally {
      Lt = t, fi = !1;
    }
  }
  return null;
}
var Xr = [], Qr = 0, fa = null, pa = 0, ts = [], ns = 0, Ir = null, Is = 1, Ts = "";
function yr(e, t) {
  Xr[Qr++] = pa, Xr[Qr++] = fa, fa = e, pa = t;
}
function df(e, t, n) {
  ts[ns++] = Is, ts[ns++] = Ts, ts[ns++] = Ir, Ir = e;
  var r = Is;
  e = Ts;
  var l = 32 - fs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - fs(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Is = 1 << 32 - fs(t) + l | n << l | r, Ts = o + e;
  } else Is = 1 << o | n << l | r, Ts = e;
}
function Qc(e) {
  e.return !== null && (yr(e, 1), df(e, 1, 0));
}
function Jc(e) {
  for (; e === fa; ) fa = Xr[--Qr], Xr[Qr] = null, pa = Xr[--Qr], Xr[Qr] = null;
  for (; e === Ir; ) Ir = ts[--ns], ts[ns] = null, Ts = ts[--ns], ts[ns] = null, Is = ts[--ns], ts[ns] = null;
}
var Gn = null, Yn = null, Gt = !1, ds = null;
function hf(e, t) {
  var n = ss(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function fd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Gn = e, Yn = rr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Gn = e, Yn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ir !== null ? { id: Is, overflow: Ts } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ss(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Gn = e, Yn = null, !0) : !1;
    default:
      return !1;
  }
}
function rc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function lc(e) {
  if (Gt) {
    var t = Yn;
    if (t) {
      var n = t;
      if (!fd(e, t)) {
        if (rc(e)) throw Error(ye(418));
        t = rr(n.nextSibling);
        var r = Gn;
        t && fd(e, t) ? hf(r, n) : (e.flags = e.flags & -4097 | 2, Gt = !1, Gn = e);
      }
    } else {
      if (rc(e)) throw Error(ye(418));
      e.flags = e.flags & -4097 | 2, Gt = !1, Gn = e;
    }
  }
}
function pd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Gn = e;
}
function Ro(e) {
  if (e !== Gn) return !1;
  if (!Gt) return pd(e), Gt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ec(e.type, e.memoizedProps)), t && (t = Yn)) {
    if (rc(e)) throw ff(), Error(ye(418));
    for (; t; ) hf(e, t), t = rr(t.nextSibling);
  }
  if (pd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ye(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Yn = rr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Yn = null;
    }
  } else Yn = Gn ? rr(e.stateNode.nextSibling) : null;
  return !0;
}
function ff() {
  for (var e = Yn; e; ) e = rr(e.nextSibling);
}
function hl() {
  Yn = Gn = null, Gt = !1;
}
function Zc(e) {
  ds === null ? ds = [e] : ds.push(e);
}
var A0 = Ps.ReactCurrentBatchConfig;
function Ml(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ye(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(ye(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var i = l.refs;
        a === null ? delete i[o] : i[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(ye(284));
    if (!n._owner) throw Error(ye(290, e));
  }
  return e;
}
function Lo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ye(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function md(e) {
  var t = e._init;
  return t(e._payload);
}
function pf(e) {
  function t(k, p) {
    if (e) {
      var h = k.deletions;
      h === null ? (k.deletions = [p], k.flags |= 16) : h.push(p);
    }
  }
  function n(k, p) {
    if (!e) return null;
    for (; p !== null; ) t(k, p), p = p.sibling;
    return null;
  }
  function r(k, p) {
    for (k = /* @__PURE__ */ new Map(); p !== null; ) p.key !== null ? k.set(p.key, p) : k.set(p.index, p), p = p.sibling;
    return k;
  }
  function l(k, p) {
    return k = ir(k, p), k.index = 0, k.sibling = null, k;
  }
  function o(k, p, h) {
    return k.index = h, e ? (h = k.alternate, h !== null ? (h = h.index, h < p ? (k.flags |= 2, p) : h) : (k.flags |= 2, p)) : (k.flags |= 1048576, p);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function i(k, p, h, b) {
    return p === null || p.tag !== 6 ? (p = Ni(h, k.mode, b), p.return = k, p) : (p = l(p, h), p.return = k, p);
  }
  function c(k, p, h, b) {
    var S = h.type;
    return S === zr ? v(k, p, h.props.children, b, h.key) : p !== null && (p.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Vs && md(S) === p.type) ? (b = l(p, h.props), b.ref = Ml(k, p, h), b.return = k, b) : (b = Zo(h.type, h.key, h.props, null, k.mode, b), b.ref = Ml(k, p, h), b.return = k, b);
  }
  function d(k, p, h, b) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== h.containerInfo || p.stateNode.implementation !== h.implementation ? (p = ki(h, k.mode, b), p.return = k, p) : (p = l(p, h.children || []), p.return = k, p);
  }
  function v(k, p, h, b, S) {
    return p === null || p.tag !== 7 ? (p = br(h, k.mode, b, S), p.return = k, p) : (p = l(p, h), p.return = k, p);
  }
  function f(k, p, h) {
    if (typeof p == "string" && p !== "" || typeof p == "number") return p = Ni("" + p, k.mode, h), p.return = k, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case jo:
          return h = Zo(p.type, p.key, p.props, null, k.mode, h), h.ref = Ml(k, null, p), h.return = k, h;
        case Wr:
          return p = ki(p, k.mode, h), p.return = k, p;
        case Vs:
          var b = p._init;
          return f(k, b(p._payload), h);
      }
      if (Ol(p) || jl(p)) return p = br(p, k.mode, h, null), p.return = k, p;
      Lo(k, p);
    }
    return null;
  }
  function m(k, p, h, b) {
    var S = p !== null ? p.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return S !== null ? null : i(k, p, "" + h, b);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case jo:
          return h.key === S ? c(k, p, h, b) : null;
        case Wr:
          return h.key === S ? d(k, p, h, b) : null;
        case Vs:
          return S = h._init, m(
            k,
            p,
            S(h._payload),
            b
          );
      }
      if (Ol(h) || jl(h)) return S !== null ? null : v(k, p, h, b, null);
      Lo(k, h);
    }
    return null;
  }
  function y(k, p, h, b, S) {
    if (typeof b == "string" && b !== "" || typeof b == "number") return k = k.get(h) || null, i(p, k, "" + b, S);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case jo:
          return k = k.get(b.key === null ? h : b.key) || null, c(p, k, b, S);
        case Wr:
          return k = k.get(b.key === null ? h : b.key) || null, d(p, k, b, S);
        case Vs:
          var j = b._init;
          return y(k, p, h, j(b._payload), S);
      }
      if (Ol(b) || jl(b)) return k = k.get(h) || null, v(p, k, b, S, null);
      Lo(p, b);
    }
    return null;
  }
  function E(k, p, h, b) {
    for (var S = null, j = null, N = p, T = p = 0, x = null; N !== null && T < h.length; T++) {
      N.index > T ? (x = N, N = null) : x = N.sibling;
      var I = m(k, N, h[T], b);
      if (I === null) {
        N === null && (N = x);
        break;
      }
      e && N && I.alternate === null && t(k, N), p = o(I, p, T), j === null ? S = I : j.sibling = I, j = I, N = x;
    }
    if (T === h.length) return n(k, N), Gt && yr(k, T), S;
    if (N === null) {
      for (; T < h.length; T++) N = f(k, h[T], b), N !== null && (p = o(N, p, T), j === null ? S = N : j.sibling = N, j = N);
      return Gt && yr(k, T), S;
    }
    for (N = r(k, N); T < h.length; T++) x = y(N, k, T, h[T], b), x !== null && (e && x.alternate !== null && N.delete(x.key === null ? T : x.key), p = o(x, p, T), j === null ? S = x : j.sibling = x, j = x);
    return e && N.forEach(function(P) {
      return t(k, P);
    }), Gt && yr(k, T), S;
  }
  function M(k, p, h, b) {
    var S = jl(h);
    if (typeof S != "function") throw Error(ye(150));
    if (h = S.call(h), h == null) throw Error(ye(151));
    for (var j = S = null, N = p, T = p = 0, x = null, I = h.next(); N !== null && !I.done; T++, I = h.next()) {
      N.index > T ? (x = N, N = null) : x = N.sibling;
      var P = m(k, N, I.value, b);
      if (P === null) {
        N === null && (N = x);
        break;
      }
      e && N && P.alternate === null && t(k, N), p = o(P, p, T), j === null ? S = P : j.sibling = P, j = P, N = x;
    }
    if (I.done) return n(
      k,
      N
    ), Gt && yr(k, T), S;
    if (N === null) {
      for (; !I.done; T++, I = h.next()) I = f(k, I.value, b), I !== null && (p = o(I, p, T), j === null ? S = I : j.sibling = I, j = I);
      return Gt && yr(k, T), S;
    }
    for (N = r(k, N); !I.done; T++, I = h.next()) I = y(N, k, T, I.value, b), I !== null && (e && I.alternate !== null && N.delete(I.key === null ? T : I.key), p = o(I, p, T), j === null ? S = I : j.sibling = I, j = I);
    return e && N.forEach(function(K) {
      return t(k, K);
    }), Gt && yr(k, T), S;
  }
  function D(k, p, h, b) {
    if (typeof h == "object" && h !== null && h.type === zr && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case jo:
          e: {
            for (var S = h.key, j = p; j !== null; ) {
              if (j.key === S) {
                if (S = h.type, S === zr) {
                  if (j.tag === 7) {
                    n(k, j.sibling), p = l(j, h.props.children), p.return = k, k = p;
                    break e;
                  }
                } else if (j.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Vs && md(S) === j.type) {
                  n(k, j.sibling), p = l(j, h.props), p.ref = Ml(k, j, h), p.return = k, k = p;
                  break e;
                }
                n(k, j);
                break;
              } else t(k, j);
              j = j.sibling;
            }
            h.type === zr ? (p = br(h.props.children, k.mode, b, h.key), p.return = k, k = p) : (b = Zo(h.type, h.key, h.props, null, k.mode, b), b.ref = Ml(k, p, h), b.return = k, k = b);
          }
          return a(k);
        case Wr:
          e: {
            for (j = h.key; p !== null; ) {
              if (p.key === j) if (p.tag === 4 && p.stateNode.containerInfo === h.containerInfo && p.stateNode.implementation === h.implementation) {
                n(k, p.sibling), p = l(p, h.children || []), p.return = k, k = p;
                break e;
              } else {
                n(k, p);
                break;
              }
              else t(k, p);
              p = p.sibling;
            }
            p = ki(h, k.mode, b), p.return = k, k = p;
          }
          return a(k);
        case Vs:
          return j = h._init, D(k, p, j(h._payload), b);
      }
      if (Ol(h)) return E(k, p, h, b);
      if (jl(h)) return M(k, p, h, b);
      Lo(k, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, p !== null && p.tag === 6 ? (n(k, p.sibling), p = l(p, h), p.return = k, k = p) : (n(k, p), p = Ni(h, k.mode, b), p.return = k, k = p), a(k)) : n(k, p);
  }
  return D;
}
var fl = pf(!0), mf = pf(!1), ma = hr(null), ga = null, Jr = null, qc = null;
function eu() {
  qc = Jr = ga = null;
}
function tu(e) {
  var t = ma.current;
  Yt(ma), e._currentValue = t;
}
function oc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ll(e, t) {
  ga = e, qc = Jr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Bn = !0), e.firstContext = null);
}
function ls(e) {
  var t = e._currentValue;
  if (qc !== e) if (e = { context: e, memoizedValue: t, next: null }, Jr === null) {
    if (ga === null) throw Error(ye(308));
    Jr = e, ga.dependencies = { lanes: 0, firstContext: e };
  } else Jr = Jr.next = e;
  return t;
}
var wr = null;
function nu(e) {
  wr === null ? wr = [e] : wr.push(e);
}
function gf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, nu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Os(e, r);
}
function Os(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ys = !1;
function su(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function xf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function As(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function lr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, St & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Os(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, nu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Os(e, n);
}
function Vo(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Wc(e, n);
  }
}
function gd(e, t) {
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
function xa(e, t, n, r) {
  var l = e.updateQueue;
  Ys = !1;
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
      var m = i.lane, y = i.eventTime;
      if ((r & m) === m) {
        v !== null && (v = v.next = {
          eventTime: y,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var E = e, M = i;
          switch (m = t, y = n, M.tag) {
            case 1:
              if (E = M.payload, typeof E == "function") {
                f = E.call(y, f, m);
                break e;
              }
              f = E;
              break e;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = M.payload, m = typeof E == "function" ? E.call(y, f, m) : E, m == null) break e;
              f = en({}, f, m);
              break e;
            case 2:
              Ys = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [i] : m.push(i));
      } else y = { eventTime: y, lane: m, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (d = v = y, c = f) : v = v.next = y, a |= m;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        m = i, i = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = f), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ar |= a, e.lanes = a, e.memoizedState = f;
  }
}
function xd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(ye(191, l));
      l.call(r);
    }
  }
}
var xo = {}, ws = hr(xo), ro = hr(xo), lo = hr(xo);
function jr(e) {
  if (e === xo) throw Error(ye(174));
  return e;
}
function ru(e, t) {
  switch (Ht(lo, t), Ht(ro, e), Ht(ws, xo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Bi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Bi(t, e);
  }
  Yt(ws), Ht(ws, t);
}
function pl() {
  Yt(ws), Yt(ro), Yt(lo);
}
function yf(e) {
  jr(lo.current);
  var t = jr(ws.current), n = Bi(t, e.type);
  t !== n && (Ht(ro, e), Ht(ws, n));
}
function lu(e) {
  ro.current === e && (Yt(ws), Yt(ro));
}
var Zt = hr(0);
function ya(e) {
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
var pi = [];
function ou() {
  for (var e = 0; e < pi.length; e++) pi[e]._workInProgressVersionPrimary = null;
  pi.length = 0;
}
var Yo = Ps.ReactCurrentDispatcher, mi = Ps.ReactCurrentBatchConfig, Tr = 0, qt = null, dn = null, mn = null, va = !1, zl = !1, oo = 0, $0 = 0;
function jn() {
  throw Error(ye(321));
}
function au(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ms(e[n], t[n])) return !1;
  return !0;
}
function iu(e, t, n, r, l, o) {
  if (Tr = o, qt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Yo.current = e === null || e.memoizedState === null ? D0 : P0, e = n(r, l), zl) {
    o = 0;
    do {
      if (zl = !1, oo = 0, 25 <= o) throw Error(ye(301));
      o += 1, mn = dn = null, t.updateQueue = null, Yo.current = _0, e = n(r, l);
    } while (zl);
  }
  if (Yo.current = Na, t = dn !== null && dn.next !== null, Tr = 0, mn = dn = qt = null, va = !1, t) throw Error(ye(300));
  return e;
}
function cu() {
  var e = oo !== 0;
  return oo = 0, e;
}
function ys() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return mn === null ? qt.memoizedState = mn = e : mn = mn.next = e, mn;
}
function os() {
  if (dn === null) {
    var e = qt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = dn.next;
  var t = mn === null ? qt.memoizedState : mn.next;
  if (t !== null) mn = t, dn = e;
  else {
    if (e === null) throw Error(ye(310));
    dn = e, e = { memoizedState: dn.memoizedState, baseState: dn.baseState, baseQueue: dn.baseQueue, queue: dn.queue, next: null }, mn === null ? qt.memoizedState = mn = e : mn = mn.next = e;
  }
  return mn;
}
function ao(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function gi(e) {
  var t = os(), n = t.queue;
  if (n === null) throw Error(ye(311));
  n.lastRenderedReducer = e;
  var r = dn, l = r.baseQueue, o = n.pending;
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
      if ((Tr & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = f, a = r) : c = c.next = f, qt.lanes |= v, Ar |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, ms(r, t.memoizedState) || (Bn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, qt.lanes |= o, Ar |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xi(e) {
  var t = os(), n = t.queue;
  if (n === null) throw Error(ye(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    ms(o, t.memoizedState) || (Bn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function vf() {
}
function Nf(e, t) {
  var n = qt, r = os(), l = t(), o = !ms(r.memoizedState, l);
  if (o && (r.memoizedState = l, Bn = !0), r = r.queue, uu(jf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || mn !== null && mn.memoizedState.tag & 1) {
    if (n.flags |= 2048, io(9, wf.bind(null, n, r, l, t), void 0, null), gn === null) throw Error(ye(349));
    Tr & 30 || kf(n, t, l);
  }
  return l;
}
function kf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = qt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, qt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function wf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ef(t) && Cf(e);
}
function jf(e, t, n) {
  return n(function() {
    Ef(t) && Cf(e);
  });
}
function Ef(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ms(e, n);
  } catch {
    return !0;
  }
}
function Cf(e) {
  var t = Os(e, 1);
  t !== null && ps(t, e, 1, -1);
}
function yd(e) {
  var t = ys();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ao, lastRenderedState: e }, t.queue = e, e = e.dispatch = O0.bind(null, qt, e), [t.memoizedState, e];
}
function io(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = qt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, qt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Sf() {
  return os().memoizedState;
}
function Go(e, t, n, r) {
  var l = ys();
  qt.flags |= e, l.memoizedState = io(1 | t, n, void 0, r === void 0 ? null : r);
}
function La(e, t, n, r) {
  var l = os();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (dn !== null) {
    var a = dn.memoizedState;
    if (o = a.destroy, r !== null && au(r, a.deps)) {
      l.memoizedState = io(t, n, o, r);
      return;
    }
  }
  qt.flags |= e, l.memoizedState = io(1 | t, n, o, r);
}
function vd(e, t) {
  return Go(8390656, 8, e, t);
}
function uu(e, t) {
  return La(2048, 8, e, t);
}
function bf(e, t) {
  return La(4, 2, e, t);
}
function Mf(e, t) {
  return La(4, 4, e, t);
}
function If(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Tf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, La(4, 4, If.bind(null, t, e), n);
}
function du() {
}
function Af(e, t) {
  var n = os();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && au(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function $f(e, t) {
  var n = os();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && au(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Rf(e, t, n) {
  return Tr & 21 ? (ms(n, t) || (n = Ph(), qt.lanes |= n, Ar |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Bn = !0), e.memoizedState = n);
}
function R0(e, t) {
  var n = Lt;
  Lt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = mi.transition;
  mi.transition = {};
  try {
    e(!1), t();
  } finally {
    Lt = n, mi.transition = r;
  }
}
function Lf() {
  return os().memoizedState;
}
function L0(e, t, n) {
  var r = ar(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Of(e)) Df(t, n);
  else if (n = gf(e, t, n, r), n !== null) {
    var l = Rn();
    ps(n, e, r, l), Pf(n, t, r);
  }
}
function O0(e, t, n) {
  var r = ar(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Of(e)) Df(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, i = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = i, ms(i, a)) {
        var c = t.interleaved;
        c === null ? (l.next = l, nu(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = gf(e, t, l, r), n !== null && (l = Rn(), ps(n, e, r, l), Pf(n, t, r));
  }
}
function Of(e) {
  var t = e.alternate;
  return e === qt || t !== null && t === qt;
}
function Df(e, t) {
  zl = va = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Pf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Wc(e, n);
  }
}
var Na = { readContext: ls, useCallback: jn, useContext: jn, useEffect: jn, useImperativeHandle: jn, useInsertionEffect: jn, useLayoutEffect: jn, useMemo: jn, useReducer: jn, useRef: jn, useState: jn, useDebugValue: jn, useDeferredValue: jn, useTransition: jn, useMutableSource: jn, useSyncExternalStore: jn, useId: jn, unstable_isNewReconciler: !1 }, D0 = { readContext: ls, useCallback: function(e, t) {
  return ys().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ls, useEffect: vd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Go(
    4194308,
    4,
    If.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Go(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Go(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ys();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ys();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = L0.bind(null, qt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ys();
  return e = { current: e }, t.memoizedState = e;
}, useState: yd, useDebugValue: du, useDeferredValue: function(e) {
  return ys().memoizedState = e;
}, useTransition: function() {
  var e = yd(!1), t = e[0];
  return e = R0.bind(null, e[1]), ys().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = qt, l = ys();
  if (Gt) {
    if (n === void 0) throw Error(ye(407));
    n = n();
  } else {
    if (n = t(), gn === null) throw Error(ye(349));
    Tr & 30 || kf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, vd(jf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, io(9, wf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ys(), t = gn.identifierPrefix;
  if (Gt) {
    var n = Ts, r = Is;
    n = (r & ~(1 << 32 - fs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = oo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = $0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, P0 = {
  readContext: ls,
  useCallback: Af,
  useContext: ls,
  useEffect: uu,
  useImperativeHandle: Tf,
  useInsertionEffect: bf,
  useLayoutEffect: Mf,
  useMemo: $f,
  useReducer: gi,
  useRef: Sf,
  useState: function() {
    return gi(ao);
  },
  useDebugValue: du,
  useDeferredValue: function(e) {
    var t = os();
    return Rf(t, dn.memoizedState, e);
  },
  useTransition: function() {
    var e = gi(ao)[0], t = os().memoizedState;
    return [e, t];
  },
  useMutableSource: vf,
  useSyncExternalStore: Nf,
  useId: Lf,
  unstable_isNewReconciler: !1
}, _0 = { readContext: ls, useCallback: Af, useContext: ls, useEffect: uu, useImperativeHandle: Tf, useInsertionEffect: bf, useLayoutEffect: Mf, useMemo: $f, useReducer: xi, useRef: Sf, useState: function() {
  return xi(ao);
}, useDebugValue: du, useDeferredValue: function(e) {
  var t = os();
  return dn === null ? t.memoizedState = e : Rf(t, dn.memoizedState, e);
}, useTransition: function() {
  var e = xi(ao)[0], t = os().memoizedState;
  return [e, t];
}, useMutableSource: vf, useSyncExternalStore: Nf, useId: Lf, unstable_isNewReconciler: !1 };
function cs(e, t) {
  if (e && e.defaultProps) {
    t = en({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ac(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : en({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Oa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Lr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Rn(), l = ar(e), o = As(r, l);
  o.payload = t, n != null && (o.callback = n), t = lr(e, o, l), t !== null && (ps(t, e, l, r), Vo(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Rn(), l = ar(e), o = As(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = lr(e, o, l), t !== null && (ps(t, e, l, r), Vo(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Rn(), r = ar(e), l = As(n, r);
  l.tag = 2, t != null && (l.callback = t), t = lr(e, l, r), t !== null && (ps(t, e, r, n), Vo(t, e, r));
} };
function Nd(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !eo(n, r) || !eo(l, o) : !0;
}
function _f(e, t, n) {
  var r = !1, l = ur, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ls(o) : (l = Wn(t) ? Mr : Sn.current, r = t.contextTypes, o = (r = r != null) ? dl(e, l) : ur), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Oa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function kd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Oa.enqueueReplaceState(t, t.state, null);
}
function ic(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, su(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ls(o) : (o = Wn(t) ? Mr : Sn.current, l.context = dl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ac(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Oa.enqueueReplaceState(l, l.state, null), xa(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function ml(e, t) {
  try {
    var n = "", r = t;
    do
      n += hm(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function yi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function cc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var F0 = typeof WeakMap == "function" ? WeakMap : Map;
function Ff(e, t, n) {
  n = As(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    wa || (wa = !0, vc = r), cc(e, t);
  }, n;
}
function Bf(e, t, n) {
  n = As(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      cc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    cc(e, t), typeof r != "function" && (or === null ? or = /* @__PURE__ */ new Set([this]) : or.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function wd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new F0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = q0.bind(null, e, t, n), t.then(e, e));
}
function jd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ed(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = As(-1, 1), t.tag = 2, lr(n, t, 1))), n.lanes |= 1), e);
}
var B0 = Ps.ReactCurrentOwner, Bn = !1;
function $n(e, t, n, r) {
  t.child = e === null ? mf(t, null, n, r) : fl(t, e.child, n, r);
}
function Cd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return ll(t, l), r = iu(e, t, n, r, o, l), n = cu(), e !== null && !Bn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ds(e, t, l)) : (Gt && n && Qc(t), t.flags |= 1, $n(e, t, r, l), t.child);
}
function Sd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !vu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Uf(e, t, o, r, l)) : (e = Zo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : eo, n(a, r) && e.ref === t.ref) return Ds(e, t, l);
  }
  return t.flags |= 1, e = ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Uf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (eo(o, r) && e.ref === t.ref) if (Bn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Bn = !0);
    else return t.lanes = e.lanes, Ds(e, t, l);
  }
  return uc(e, t, n, r, l);
}
function Wf(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ht(qr, Kn), Kn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ht(qr, Kn), Kn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Ht(qr, Kn), Kn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Ht(qr, Kn), Kn |= r;
  return $n(e, t, l, n), t.child;
}
function zf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function uc(e, t, n, r, l) {
  var o = Wn(n) ? Mr : Sn.current;
  return o = dl(t, o), ll(t, l), n = iu(e, t, n, r, o, l), r = cu(), e !== null && !Bn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ds(e, t, l)) : (Gt && r && Qc(t), t.flags |= 1, $n(e, t, n, l), t.child);
}
function bd(e, t, n, r, l) {
  if (Wn(n)) {
    var o = !0;
    ha(t);
  } else o = !1;
  if (ll(t, l), t.stateNode === null) Xo(e, t), _f(t, n, r), ic(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ls(d) : (d = Wn(n) ? Mr : Sn.current, d = dl(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && kd(t, a, r, d), Ys = !1;
    var m = t.memoizedState;
    a.state = m, xa(t, r, a, l), c = t.memoizedState, i !== r || m !== c || Un.current || Ys ? (typeof v == "function" && (ac(t, n, v, r), c = t.memoizedState), (i = Ys || Nd(t, n, i, r, m, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, xf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : cs(t.type, i), a.props = d, f = t.pendingProps, m = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = ls(c) : (c = Wn(n) ? Mr : Sn.current, c = dl(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || m !== c) && kd(t, a, r, c), Ys = !1, m = t.memoizedState, a.state = m, xa(t, r, a, l);
    var E = t.memoizedState;
    i !== f || m !== E || Un.current || Ys ? (typeof y == "function" && (ac(t, n, y, r), E = t.memoizedState), (d = Ys || Nd(t, n, d, r, m, E, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, E, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, E, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = E), a.props = r, a.state = E, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return dc(e, t, n, r, o, l);
}
function dc(e, t, n, r, l, o) {
  zf(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && hd(t, n, !1), Ds(e, t, o);
  r = t.stateNode, B0.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = fl(t, e.child, null, o), t.child = fl(t, null, i, o)) : $n(e, t, i, o), t.memoizedState = r.state, l && hd(t, n, !0), t.child;
}
function Hf(e) {
  var t = e.stateNode;
  t.pendingContext ? dd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && dd(e, t.context, !1), ru(e, t.containerInfo);
}
function Md(e, t, n, r, l) {
  return hl(), Zc(l), t.flags |= 256, $n(e, t, n, r), t.child;
}
var hc = { dehydrated: null, treeContext: null, retryLane: 0 };
function fc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Kf(e, t, n) {
  var r = t.pendingProps, l = Zt.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ht(Zt, l & 1), e === null)
    return lc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = _a(a, r, 0, null), e = br(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = fc(n), t.memoizedState = hc, e) : hu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return U0(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = ir(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = ir(i, o) : (o = br(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? fc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = hc, r;
  }
  return o = e.child, e = o.sibling, r = ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function hu(e, t) {
  return t = _a({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Oo(e, t, n, r) {
  return r !== null && Zc(r), fl(t, e.child, null, n), e = hu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function U0(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = yi(Error(ye(422))), Oo(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = _a({ mode: "visible", children: r.children }, l, 0, null), o = br(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && fl(t, e.child, null, a), t.child.memoizedState = fc(a), t.memoizedState = hc, o);
  if (!(t.mode & 1)) return Oo(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(ye(419)), r = yi(o, r, void 0), Oo(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Bn || i) {
    if (r = gn, r !== null) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Os(e, l), ps(r, e, l, -1));
    }
    return yu(), r = yi(Error(ye(421))), Oo(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = eg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Yn = rr(l.nextSibling), Gn = t, Gt = !0, ds = null, e !== null && (ts[ns++] = Is, ts[ns++] = Ts, ts[ns++] = Ir, Is = e.id, Ts = e.overflow, Ir = t), t = hu(t, r.children), t.flags |= 4096, t);
}
function Id(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), oc(e.return, t, n);
}
function vi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Vf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if ($n(e, t, r.children, n), r = Zt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Id(e, n, t);
      else if (e.tag === 19) Id(e, n, t);
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
  if (Ht(Zt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ya(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), vi(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ya(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      vi(t, !0, n, null, o);
      break;
    case "together":
      vi(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Xo(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ds(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ar |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ye(153));
  if (t.child !== null) {
    for (e = t.child, n = ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function W0(e, t, n) {
  switch (t.tag) {
    case 3:
      Hf(t), hl();
      break;
    case 5:
      yf(t);
      break;
    case 1:
      Wn(t.type) && ha(t);
      break;
    case 4:
      ru(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Ht(ma, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Ht(Zt, Zt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Kf(e, t, n) : (Ht(Zt, Zt.current & 1), e = Ds(e, t, n), e !== null ? e.sibling : null);
      Ht(Zt, Zt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Vf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ht(Zt, Zt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Wf(e, t, n);
  }
  return Ds(e, t, n);
}
var Yf, pc, Gf, Xf;
Yf = function(e, t) {
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
pc = function() {
};
Gf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, jr(ws.current);
    var o = null;
    switch (n) {
      case "input":
        l = Di(e, l), r = Di(e, r), o = [];
        break;
      case "select":
        l = en({}, l, { value: void 0 }), r = en({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Fi(e, l), r = Fi(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ua);
    }
    Ui(n, r);
    var a;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var i = l[d];
      for (a in i) i.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Yl.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (i = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== i && (c != null || i != null)) if (d === "style") if (i) {
        for (a in i) !i.hasOwnProperty(a) || c && c.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in c) c.hasOwnProperty(a) && i[a] !== c[a] && (n || (n = {}), n[a] = c[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Yl.hasOwnProperty(d) ? (c != null && d === "onScroll" && Vt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Xf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Il(e, t) {
  if (!Gt) switch (e.tailMode) {
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
function En(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function z0(e, t, n) {
  var r = t.pendingProps;
  switch (Jc(t), t.tag) {
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
      return En(t), null;
    case 1:
      return Wn(t.type) && da(), En(t), null;
    case 3:
      return r = t.stateNode, pl(), Yt(Un), Yt(Sn), ou(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ro(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ds !== null && (wc(ds), ds = null))), pc(e, t), En(t), null;
    case 5:
      lu(t);
      var l = jr(lo.current);
      if (n = t.type, e !== null && t.stateNode != null) Gf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ye(166));
          return En(t), null;
        }
        if (e = jr(ws.current), Ro(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[vs] = t, r[so] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Vt("cancel", r), Vt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Vt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pl.length; l++) Vt(Pl[l], r);
              break;
            case "source":
              Vt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Vt(
                "error",
                r
              ), Vt("load", r);
              break;
            case "details":
              Vt("toggle", r);
              break;
            case "input":
              _u(r, o), Vt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Vt("invalid", r);
              break;
            case "textarea":
              Bu(r, o), Vt("invalid", r);
          }
          Ui(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && $o(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && $o(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : Yl.hasOwnProperty(a) && i != null && a === "onScroll" && Vt("scroll", r);
          }
          switch (n) {
            case "input":
              Eo(r), Fu(r, o, !0);
              break;
            case "textarea":
              Eo(r), Uu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ua);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = wh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[vs] = t, e[so] = r, Yf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = Wi(n, r), n) {
              case "dialog":
                Vt("cancel", e), Vt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Vt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pl.length; l++) Vt(Pl[l], e);
                l = r;
                break;
              case "source":
                Vt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Vt(
                  "error",
                  e
                ), Vt("load", e), l = r;
                break;
              case "details":
                Vt("toggle", e), l = r;
                break;
              case "input":
                _u(e, r), l = Di(e, r), Vt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = en({}, r, { value: void 0 }), Vt("invalid", e);
                break;
              case "textarea":
                Bu(e, r), l = Fi(e, r), Vt("invalid", e);
                break;
              default:
                l = r;
            }
            Ui(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Ch(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && jh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Gl(e, c) : typeof c == "number" && Gl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Yl.hasOwnProperty(o) ? c != null && o === "onScroll" && Vt("scroll", e) : c != null && Dc(e, o, c, a));
            }
            switch (n) {
              case "input":
                Eo(e), Fu(e, r, !1);
                break;
              case "textarea":
                Eo(e), Uu(e);
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
                typeof l.onClick == "function" && (e.onclick = ua);
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
      return En(t), null;
    case 6:
      if (e && t.stateNode != null) Xf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(ye(166));
        if (n = jr(lo.current), jr(ws.current), Ro(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[vs] = t, (o = r.nodeValue !== n) && (e = Gn, e !== null)) switch (e.tag) {
            case 3:
              $o(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && $o(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vs] = t, t.stateNode = r;
      }
      return En(t), null;
    case 13:
      if (Yt(Zt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Gt && Yn !== null && t.mode & 1 && !(t.flags & 128)) ff(), hl(), t.flags |= 98560, o = !1;
        else if (o = Ro(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ye(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ye(317));
            o[vs] = t;
          } else hl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          En(t), o = !1;
        } else ds !== null && (wc(ds), ds = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Zt.current & 1 ? hn === 0 && (hn = 3) : yu())), t.updateQueue !== null && (t.flags |= 4), En(t), null);
    case 4:
      return pl(), pc(e, t), e === null && to(t.stateNode.containerInfo), En(t), null;
    case 10:
      return tu(t.type._context), En(t), null;
    case 17:
      return Wn(t.type) && da(), En(t), null;
    case 19:
      if (Yt(Zt), o = t.memoizedState, o === null) return En(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Il(o, !1);
      else {
        if (hn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = ya(e), a !== null) {
            for (t.flags |= 128, Il(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Ht(Zt, Zt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && rn() > gl && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ya(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Il(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Gt) return En(t), null;
        } else 2 * rn() - o.renderingStartTime > gl && n !== 1073741824 && (t.flags |= 128, r = !0, Il(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = rn(), t.sibling = null, n = Zt.current, Ht(Zt, r ? n & 1 | 2 : n & 1), t) : (En(t), null);
    case 22:
    case 23:
      return xu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Kn & 1073741824 && (En(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : En(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ye(156, t.tag));
}
function H0(e, t) {
  switch (Jc(t), t.tag) {
    case 1:
      return Wn(t.type) && da(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pl(), Yt(Un), Yt(Sn), ou(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return lu(t), null;
    case 13:
      if (Yt(Zt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ye(340));
        hl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Yt(Zt), null;
    case 4:
      return pl(), null;
    case 10:
      return tu(t.type._context), null;
    case 22:
    case 23:
      return xu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Do = !1, Cn = !1, K0 = typeof WeakSet == "function" ? WeakSet : Set, Ue = null;
function Zr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    nn(e, t, r);
  }
  else n.current = null;
}
function mc(e, t, n) {
  try {
    n();
  } catch (r) {
    nn(e, t, r);
  }
}
var Td = !1;
function V0(e, t) {
  if (Zi = aa, e = qh(), Xc(e)) {
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
        var a = 0, i = -1, c = -1, d = 0, v = 0, f = e, m = null;
        t: for (; ; ) {
          for (var y; f !== n || l !== 0 && f.nodeType !== 3 || (i = a + l), f !== o || r !== 0 && f.nodeType !== 3 || (c = a + r), f.nodeType === 3 && (a += f.nodeValue.length), (y = f.firstChild) !== null; )
            m = f, f = y;
          for (; ; ) {
            if (f === e) break t;
            if (m === n && ++d === l && (i = a), m === o && ++v === r && (c = a), (y = f.nextSibling) !== null) break;
            f = m, m = f.parentNode;
          }
          f = y;
        }
        n = i === -1 || c === -1 ? null : { start: i, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (qi = { focusedElem: e, selectionRange: n }, aa = !1, Ue = t; Ue !== null; ) if (t = Ue, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ue = e;
  else for (; Ue !== null; ) {
    t = Ue;
    try {
      var E = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (E !== null) {
            var M = E.memoizedProps, D = E.memoizedState, k = t.stateNode, p = k.getSnapshotBeforeUpdate(t.elementType === t.type ? M : cs(t.type, M), D);
            k.__reactInternalSnapshotBeforeUpdate = p;
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
          throw Error(ye(163));
      }
    } catch (b) {
      nn(t, t.return, b);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Ue = e;
      break;
    }
    Ue = t.return;
  }
  return E = Td, Td = !1, E;
}
function Hl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && mc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Da(e, t) {
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
function gc(e) {
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
function Qf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Qf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vs], delete t[so], delete t[nc], delete t[M0], delete t[I0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Jf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ad(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Jf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function xc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ua));
  else if (r !== 4 && (e = e.child, e !== null)) for (xc(e, t, n), e = e.sibling; e !== null; ) xc(e, t, n), e = e.sibling;
}
function yc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (yc(e, t, n), e = e.sibling; e !== null; ) yc(e, t, n), e = e.sibling;
}
var yn = null, us = !1;
function zs(e, t, n) {
  for (n = n.child; n !== null; ) Zf(e, t, n), n = n.sibling;
}
function Zf(e, t, n) {
  if (ks && typeof ks.onCommitFiberUnmount == "function") try {
    ks.onCommitFiberUnmount(Ma, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Cn || Zr(n, t);
    case 6:
      var r = yn, l = us;
      yn = null, zs(e, t, n), yn = r, us = l, yn !== null && (us ? (e = yn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : yn.removeChild(n.stateNode));
      break;
    case 18:
      yn !== null && (us ? (e = yn, n = n.stateNode, e.nodeType === 8 ? hi(e.parentNode, n) : e.nodeType === 1 && hi(e, n), Zl(e)) : hi(yn, n.stateNode));
      break;
    case 4:
      r = yn, l = us, yn = n.stateNode.containerInfo, us = !0, zs(e, t, n), yn = r, us = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Cn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && mc(n, t, a), l = l.next;
        } while (l !== r);
      }
      zs(e, t, n);
      break;
    case 1:
      if (!Cn && (Zr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        nn(n, t, i);
      }
      zs(e, t, n);
      break;
    case 21:
      zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Cn = (r = Cn) || n.memoizedState !== null, zs(e, t, n), Cn = r) : zs(e, t, n);
      break;
    default:
      zs(e, t, n);
  }
}
function $d(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new K0()), t.forEach(function(r) {
      var l = tg.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function is(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, i = a;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            yn = i.stateNode, us = !1;
            break e;
          case 3:
            yn = i.stateNode.containerInfo, us = !0;
            break e;
          case 4:
            yn = i.stateNode.containerInfo, us = !0;
            break e;
        }
        i = i.return;
      }
      if (yn === null) throw Error(ye(160));
      Zf(o, a, l), yn = null, us = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      nn(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) qf(t, e), t = t.sibling;
}
function qf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (is(t, e), xs(e), r & 4) {
        try {
          Hl(3, e, e.return), Da(3, e);
        } catch (M) {
          nn(e, e.return, M);
        }
        try {
          Hl(5, e, e.return);
        } catch (M) {
          nn(e, e.return, M);
        }
      }
      break;
    case 1:
      is(t, e), xs(e), r & 512 && n !== null && Zr(n, n.return);
      break;
    case 5:
      if (is(t, e), xs(e), r & 512 && n !== null && Zr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Gl(l, "");
        } catch (M) {
          nn(e, e.return, M);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && Nh(l, o), Wi(i, a);
          var d = Wi(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], f = c[a + 1];
            v === "style" ? Ch(l, f) : v === "dangerouslySetInnerHTML" ? jh(l, f) : v === "children" ? Gl(l, f) : Dc(l, v, f, d);
          }
          switch (i) {
            case "input":
              Pi(l, o);
              break;
            case "textarea":
              kh(l, o);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? tl(l, !!o.multiple, y, !1) : m !== !!o.multiple && (o.defaultValue != null ? tl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : tl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[so] = o;
        } catch (M) {
          nn(e, e.return, M);
        }
      }
      break;
    case 6:
      if (is(t, e), xs(e), r & 4) {
        if (e.stateNode === null) throw Error(ye(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (M) {
          nn(e, e.return, M);
        }
      }
      break;
    case 3:
      if (is(t, e), xs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Zl(t.containerInfo);
      } catch (M) {
        nn(e, e.return, M);
      }
      break;
    case 4:
      is(t, e), xs(e);
      break;
    case 13:
      is(t, e), xs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (mu = rn())), r & 4 && $d(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (Cn = (d = Cn) || v, is(t, e), Cn = d) : is(t, e), xs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (Ue = e, v = e.child; v !== null; ) {
          for (f = Ue = v; Ue !== null; ) {
            switch (m = Ue, y = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Hl(4, m, m.return);
                break;
              case 1:
                Zr(m, m.return);
                var E = m.stateNode;
                if (typeof E.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, E.props = t.memoizedProps, E.state = t.memoizedState, E.componentWillUnmount();
                  } catch (M) {
                    nn(r, n, M);
                  }
                }
                break;
              case 5:
                Zr(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  Ld(f);
                  continue;
                }
            }
            y !== null ? (y.return = m, Ue = y) : Ld(f);
          }
          v = v.sibling;
        }
        e: for (v = null, f = e; ; ) {
          if (f.tag === 5) {
            if (v === null) {
              v = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = f.stateNode, c = f.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Eh("display", a));
              } catch (M) {
                nn(e, e.return, M);
              }
            }
          } else if (f.tag === 6) {
            if (v === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (M) {
              nn(e, e.return, M);
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
      is(t, e), xs(e), r & 4 && $d(e);
      break;
    case 21:
      break;
    default:
      is(
        t,
        e
      ), xs(e);
  }
}
function xs(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Jf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(ye(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Gl(l, ""), r.flags &= -33);
          var o = Ad(e);
          yc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = Ad(e);
          xc(e, i, a);
          break;
        default:
          throw Error(ye(161));
      }
    } catch (c) {
      nn(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Y0(e, t, n) {
  Ue = e, ep(e);
}
function ep(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Ue !== null; ) {
    var l = Ue, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Do;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || Cn;
        i = Do;
        var d = Cn;
        if (Do = a, (Cn = c) && !d) for (Ue = l; Ue !== null; ) a = Ue, c = a.child, a.tag === 22 && a.memoizedState !== null ? Od(l) : c !== null ? (c.return = a, Ue = c) : Od(l);
        for (; o !== null; ) Ue = o, ep(o), o = o.sibling;
        Ue = l, Do = i, Cn = d;
      }
      Rd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Ue = o) : Rd(e);
  }
}
function Rd(e) {
  for (; Ue !== null; ) {
    var t = Ue;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Cn || Da(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Cn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : cs(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && xd(t, o, r);
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
              xd(t, a, n);
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
                  f !== null && Zl(f);
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
            throw Error(ye(163));
        }
        Cn || t.flags & 512 && gc(t);
      } catch (m) {
        nn(t, t.return, m);
      }
    }
    if (t === e) {
      Ue = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Ue = n;
      break;
    }
    Ue = t.return;
  }
}
function Ld(e) {
  for (; Ue !== null; ) {
    var t = Ue;
    if (t === e) {
      Ue = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Ue = n;
      break;
    }
    Ue = t.return;
  }
}
function Od(e) {
  for (; Ue !== null; ) {
    var t = Ue;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Da(4, t);
          } catch (c) {
            nn(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              nn(t, l, c);
            }
          }
          var o = t.return;
          try {
            gc(t);
          } catch (c) {
            nn(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            gc(t);
          } catch (c) {
            nn(t, a, c);
          }
      }
    } catch (c) {
      nn(t, t.return, c);
    }
    if (t === e) {
      Ue = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, Ue = i;
      break;
    }
    Ue = t.return;
  }
}
var G0 = Math.ceil, ka = Ps.ReactCurrentDispatcher, fu = Ps.ReactCurrentOwner, rs = Ps.ReactCurrentBatchConfig, St = 0, gn = null, an = null, vn = 0, Kn = 0, qr = hr(0), hn = 0, co = null, Ar = 0, Pa = 0, pu = 0, Kl = null, Fn = null, mu = 0, gl = 1 / 0, Ss = null, wa = !1, vc = null, or = null, Po = !1, er = null, ja = 0, Vl = 0, Nc = null, Qo = -1, Jo = 0;
function Rn() {
  return St & 6 ? rn() : Qo !== -1 ? Qo : Qo = rn();
}
function ar(e) {
  return e.mode & 1 ? St & 2 && vn !== 0 ? vn & -vn : A0.transition !== null ? (Jo === 0 && (Jo = Ph()), Jo) : (e = Lt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Hh(e.type)), e) : 1;
}
function ps(e, t, n, r) {
  if (50 < Vl) throw Vl = 0, Nc = null, Error(ye(185));
  po(e, n, r), (!(St & 2) || e !== gn) && (e === gn && (!(St & 2) && (Pa |= n), hn === 4 && Js(e, vn)), zn(e, r), n === 1 && St === 0 && !(t.mode & 1) && (gl = rn() + 500, Ra && fr()));
}
function zn(e, t) {
  var n = e.callbackNode;
  Am(e, t);
  var r = oa(e, e === gn ? vn : 0);
  if (r === 0) n !== null && Hu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Hu(n), t === 1) e.tag === 0 ? T0(Dd.bind(null, e)) : uf(Dd.bind(null, e)), S0(function() {
      !(St & 6) && fr();
    }), n = null;
    else {
      switch (_h(r)) {
        case 1:
          n = Uc;
          break;
        case 4:
          n = Oh;
          break;
        case 16:
          n = la;
          break;
        case 536870912:
          n = Dh;
          break;
        default:
          n = la;
      }
      n = ip(n, tp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function tp(e, t) {
  if (Qo = -1, Jo = 0, St & 6) throw Error(ye(327));
  var n = e.callbackNode;
  if (ol() && e.callbackNode !== n) return null;
  var r = oa(e, e === gn ? vn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ea(e, r);
  else {
    t = r;
    var l = St;
    St |= 2;
    var o = sp();
    (gn !== e || vn !== t) && (Ss = null, gl = rn() + 500, Sr(e, t));
    do
      try {
        J0();
        break;
      } catch (i) {
        np(e, i);
      }
    while (!0);
    eu(), ka.current = o, St = l, an !== null ? t = 0 : (gn = null, vn = 0, t = hn);
  }
  if (t !== 0) {
    if (t === 2 && (l = Yi(e), l !== 0 && (r = l, t = kc(e, l))), t === 1) throw n = co, Sr(e, 0), Js(e, r), zn(e, rn()), n;
    if (t === 6) Js(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !X0(l) && (t = Ea(e, r), t === 2 && (o = Yi(e), o !== 0 && (r = o, t = kc(e, o))), t === 1)) throw n = co, Sr(e, 0), Js(e, r), zn(e, rn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ye(345));
        case 2:
          vr(e, Fn, Ss);
          break;
        case 3:
          if (Js(e, r), (r & 130023424) === r && (t = mu + 500 - rn(), 10 < t)) {
            if (oa(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Rn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = tc(vr.bind(null, e, Fn, Ss), t);
            break;
          }
          vr(e, Fn, Ss);
          break;
        case 4:
          if (Js(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - fs(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = rn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * G0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = tc(vr.bind(null, e, Fn, Ss), r);
            break;
          }
          vr(e, Fn, Ss);
          break;
        case 5:
          vr(e, Fn, Ss);
          break;
        default:
          throw Error(ye(329));
      }
    }
  }
  return zn(e, rn()), e.callbackNode === n ? tp.bind(null, e) : null;
}
function kc(e, t) {
  var n = Kl;
  return e.current.memoizedState.isDehydrated && (Sr(e, t).flags |= 256), e = Ea(e, t), e !== 2 && (t = Fn, Fn = n, t !== null && wc(t)), e;
}
function wc(e) {
  Fn === null ? Fn = e : Fn.push.apply(Fn, e);
}
function X0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!ms(o(), l)) return !1;
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
  for (t &= ~pu, t &= ~Pa, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - fs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Dd(e) {
  if (St & 6) throw Error(ye(327));
  ol();
  var t = oa(e, 0);
  if (!(t & 1)) return zn(e, rn()), null;
  var n = Ea(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Yi(e);
    r !== 0 && (t = r, n = kc(e, r));
  }
  if (n === 1) throw n = co, Sr(e, 0), Js(e, t), zn(e, rn()), n;
  if (n === 6) throw Error(ye(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, vr(e, Fn, Ss), zn(e, rn()), null;
}
function gu(e, t) {
  var n = St;
  St |= 1;
  try {
    return e(t);
  } finally {
    St = n, St === 0 && (gl = rn() + 500, Ra && fr());
  }
}
function $r(e) {
  er !== null && er.tag === 0 && !(St & 6) && ol();
  var t = St;
  St |= 1;
  var n = rs.transition, r = Lt;
  try {
    if (rs.transition = null, Lt = 1, e) return e();
  } finally {
    Lt = r, rs.transition = n, St = t, !(St & 6) && fr();
  }
}
function xu() {
  Kn = qr.current, Yt(qr);
}
function Sr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, C0(n)), an !== null) for (n = an.return; n !== null; ) {
    var r = n;
    switch (Jc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && da();
        break;
      case 3:
        pl(), Yt(Un), Yt(Sn), ou();
        break;
      case 5:
        lu(r);
        break;
      case 4:
        pl();
        break;
      case 13:
        Yt(Zt);
        break;
      case 19:
        Yt(Zt);
        break;
      case 10:
        tu(r.type._context);
        break;
      case 22:
      case 23:
        xu();
    }
    n = n.return;
  }
  if (gn = e, an = e = ir(e.current, null), vn = Kn = t, hn = 0, co = null, pu = Pa = Ar = 0, Fn = Kl = null, wr !== null) {
    for (t = 0; t < wr.length; t++) if (n = wr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    wr = null;
  }
  return e;
}
function np(e, t) {
  do {
    var n = an;
    try {
      if (eu(), Yo.current = Na, va) {
        for (var r = qt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        va = !1;
      }
      if (Tr = 0, mn = dn = qt = null, zl = !1, oo = 0, fu.current = null, n === null || n.return === null) {
        hn = 1, co = t, an = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = vn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, f = v.tag;
          if (!(v.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var m = v.alternate;
            m ? (v.updateQueue = m.updateQueue, v.memoizedState = m.memoizedState, v.lanes = m.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = jd(a);
          if (y !== null) {
            y.flags &= -257, Ed(y, a, i, o, t), y.mode & 1 && wd(o, d, t), t = y, c = d;
            var E = t.updateQueue;
            if (E === null) {
              var M = /* @__PURE__ */ new Set();
              M.add(c), t.updateQueue = M;
            } else E.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              wd(o, d, t), yu();
              break e;
            }
            c = Error(ye(426));
          }
        } else if (Gt && i.mode & 1) {
          var D = jd(a);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Ed(D, a, i, o, t), Zc(ml(c, i));
            break e;
          }
        }
        o = c = ml(c, i), hn !== 4 && (hn = 2), Kl === null ? Kl = [o] : Kl.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Ff(o, c, t);
              gd(o, k);
              break e;
            case 1:
              i = c;
              var p = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (or === null || !or.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var b = Bf(o, i, t);
                gd(o, b);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      lp(n);
    } catch (S) {
      t = S, an === n && n !== null && (an = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function sp() {
  var e = ka.current;
  return ka.current = Na, e === null ? Na : e;
}
function yu() {
  (hn === 0 || hn === 3 || hn === 2) && (hn = 4), gn === null || !(Ar & 268435455) && !(Pa & 268435455) || Js(gn, vn);
}
function Ea(e, t) {
  var n = St;
  St |= 2;
  var r = sp();
  (gn !== e || vn !== t) && (Ss = null, Sr(e, t));
  do
    try {
      Q0();
      break;
    } catch (l) {
      np(e, l);
    }
  while (!0);
  if (eu(), St = n, ka.current = r, an !== null) throw Error(ye(261));
  return gn = null, vn = 0, hn;
}
function Q0() {
  for (; an !== null; ) rp(an);
}
function J0() {
  for (; an !== null && !wm(); ) rp(an);
}
function rp(e) {
  var t = ap(e.alternate, e, Kn);
  e.memoizedProps = e.pendingProps, t === null ? lp(e) : an = t, fu.current = null;
}
function lp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = H0(n, t), n !== null) {
        n.flags &= 32767, an = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        hn = 6, an = null;
        return;
      }
    } else if (n = z0(n, t, Kn), n !== null) {
      an = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      an = t;
      return;
    }
    an = t = e;
  } while (t !== null);
  hn === 0 && (hn = 5);
}
function vr(e, t, n) {
  var r = Lt, l = rs.transition;
  try {
    rs.transition = null, Lt = 1, Z0(e, t, n, r);
  } finally {
    rs.transition = l, Lt = r;
  }
  return null;
}
function Z0(e, t, n, r) {
  do
    ol();
  while (er !== null);
  if (St & 6) throw Error(ye(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ye(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if ($m(e, o), e === gn && (an = gn = null, vn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Po || (Po = !0, ip(la, function() {
    return ol(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = rs.transition, rs.transition = null;
    var a = Lt;
    Lt = 1;
    var i = St;
    St |= 4, fu.current = null, V0(e, n), qf(n, e), y0(qi), aa = !!Zi, qi = Zi = null, e.current = n, Y0(n), jm(), St = i, Lt = a, rs.transition = o;
  } else e.current = n;
  if (Po && (Po = !1, er = e, ja = l), o = e.pendingLanes, o === 0 && (or = null), Sm(n.stateNode), zn(e, rn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (wa) throw wa = !1, e = vc, vc = null, e;
  return ja & 1 && e.tag !== 0 && ol(), o = e.pendingLanes, o & 1 ? e === Nc ? Vl++ : (Vl = 0, Nc = e) : Vl = 0, fr(), null;
}
function ol() {
  if (er !== null) {
    var e = _h(ja), t = rs.transition, n = Lt;
    try {
      if (rs.transition = null, Lt = 16 > e ? 16 : e, er === null) var r = !1;
      else {
        if (e = er, er = null, ja = 0, St & 6) throw Error(ye(331));
        var l = St;
        for (St |= 4, Ue = e.current; Ue !== null; ) {
          var o = Ue, a = o.child;
          if (Ue.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var c = 0; c < i.length; c++) {
                var d = i[c];
                for (Ue = d; Ue !== null; ) {
                  var v = Ue;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hl(8, v, o);
                  }
                  var f = v.child;
                  if (f !== null) f.return = v, Ue = f;
                  else for (; Ue !== null; ) {
                    v = Ue;
                    var m = v.sibling, y = v.return;
                    if (Qf(v), v === d) {
                      Ue = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = y, Ue = m;
                      break;
                    }
                    Ue = y;
                  }
                }
              }
              var E = o.alternate;
              if (E !== null) {
                var M = E.child;
                if (M !== null) {
                  E.child = null;
                  do {
                    var D = M.sibling;
                    M.sibling = null, M = D;
                  } while (M !== null);
                }
              }
              Ue = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, Ue = a;
          else e: for (; Ue !== null; ) {
            if (o = Ue, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Hl(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, Ue = k;
              break e;
            }
            Ue = o.return;
          }
        }
        var p = e.current;
        for (Ue = p; Ue !== null; ) {
          a = Ue;
          var h = a.child;
          if (a.subtreeFlags & 2064 && h !== null) h.return = a, Ue = h;
          else e: for (a = p; Ue !== null; ) {
            if (i = Ue, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  Da(9, i);
              }
            } catch (S) {
              nn(i, i.return, S);
            }
            if (i === a) {
              Ue = null;
              break e;
            }
            var b = i.sibling;
            if (b !== null) {
              b.return = i.return, Ue = b;
              break e;
            }
            Ue = i.return;
          }
        }
        if (St = l, fr(), ks && typeof ks.onPostCommitFiberRoot == "function") try {
          ks.onPostCommitFiberRoot(Ma, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Lt = n, rs.transition = t;
    }
  }
  return !1;
}
function Pd(e, t, n) {
  t = ml(n, t), t = Ff(e, t, 1), e = lr(e, t, 1), t = Rn(), e !== null && (po(e, 1, t), zn(e, t));
}
function nn(e, t, n) {
  if (e.tag === 3) Pd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Pd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (or === null || !or.has(r))) {
        e = ml(n, e), e = Bf(t, e, 1), t = lr(t, e, 1), e = Rn(), t !== null && (po(t, 1, e), zn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function q0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Rn(), e.pingedLanes |= e.suspendedLanes & n, gn === e && (vn & n) === n && (hn === 4 || hn === 3 && (vn & 130023424) === vn && 500 > rn() - mu ? Sr(e, 0) : pu |= n), zn(e, t);
}
function op(e, t) {
  t === 0 && (e.mode & 1 ? (t = bo, bo <<= 1, !(bo & 130023424) && (bo = 4194304)) : t = 1);
  var n = Rn();
  e = Os(e, t), e !== null && (po(e, t, n), zn(e, n));
}
function eg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), op(e, n);
}
function tg(e, t) {
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
      throw Error(ye(314));
  }
  r !== null && r.delete(t), op(e, n);
}
var ap;
ap = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Un.current) Bn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Bn = !1, W0(e, t, n);
    Bn = !!(e.flags & 131072);
  }
  else Bn = !1, Gt && t.flags & 1048576 && df(t, pa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Xo(e, t), e = t.pendingProps;
      var l = dl(t, Sn.current);
      ll(t, n), l = iu(null, t, r, e, l, n);
      var o = cu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wn(r) ? (o = !0, ha(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, su(t), l.updater = Oa, t.stateNode = l, l._reactInternals = t, ic(t, r, e, n), t = dc(null, t, r, !0, o, n)) : (t.tag = 0, Gt && o && Qc(t), $n(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Xo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = sg(r), e = cs(r, e), l) {
          case 0:
            t = uc(null, t, r, e, n);
            break e;
          case 1:
            t = bd(null, t, r, e, n);
            break e;
          case 11:
            t = Cd(null, t, r, e, n);
            break e;
          case 14:
            t = Sd(null, t, r, cs(r.type, e), n);
            break e;
        }
        throw Error(ye(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), uc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), bd(e, t, r, l, n);
    case 3:
      e: {
        if (Hf(t), e === null) throw Error(ye(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, xf(e, t), xa(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = ml(Error(ye(423)), t), t = Md(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = ml(Error(ye(424)), t), t = Md(e, t, r, n, l);
          break e;
        } else for (Yn = rr(t.stateNode.containerInfo.firstChild), Gn = t, Gt = !0, ds = null, n = mf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hl(), r === l) {
            t = Ds(e, t, n);
            break e;
          }
          $n(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return yf(t), e === null && lc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, ec(r, l) ? a = null : o !== null && ec(r, o) && (t.flags |= 32), zf(e, t), $n(e, t, a, n), t.child;
    case 6:
      return e === null && lc(t), null;
    case 13:
      return Kf(e, t, n);
    case 4:
      return ru(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = fl(t, null, r, n) : $n(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), Cd(e, t, r, l, n);
    case 7:
      return $n(e, t, t.pendingProps, n), t.child;
    case 8:
      return $n(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return $n(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Ht(ma, r._currentValue), r._currentValue = a, o !== null) if (ms(o.value, a)) {
          if (o.children === l.children && !Un.current) {
            t = Ds(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            a = o.child;
            for (var c = i.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = As(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), oc(
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
            if (a = o.return, a === null) throw Error(ye(341));
            a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), oc(a, n, t), a = o.sibling;
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
        $n(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, ll(t, n), l = ls(l), r = r(l), t.flags |= 1, $n(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = cs(r, t.pendingProps), l = cs(r.type, l), Sd(e, t, r, l, n);
    case 15:
      return Uf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), Xo(e, t), t.tag = 1, Wn(r) ? (e = !0, ha(t)) : e = !1, ll(t, n), _f(t, r, l), ic(t, r, l, n), dc(null, t, r, !0, e, n);
    case 19:
      return Vf(e, t, n);
    case 22:
      return Wf(e, t, n);
  }
  throw Error(ye(156, t.tag));
};
function ip(e, t) {
  return Lh(e, t);
}
function ng(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ss(e, t, n, r) {
  return new ng(e, t, n, r);
}
function vu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function sg(e) {
  if (typeof e == "function") return vu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === _c) return 11;
    if (e === Fc) return 14;
  }
  return 2;
}
function ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = ss(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Zo(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") vu(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case zr:
      return br(n.children, l, o, t);
    case Pc:
      a = 8, l |= 8;
      break;
    case $i:
      return e = ss(12, n, t, l | 2), e.elementType = $i, e.lanes = o, e;
    case Ri:
      return e = ss(13, n, t, l), e.elementType = Ri, e.lanes = o, e;
    case Li:
      return e = ss(19, n, t, l), e.elementType = Li, e.lanes = o, e;
    case xh:
      return _a(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case mh:
          a = 10;
          break e;
        case gh:
          a = 9;
          break e;
        case _c:
          a = 11;
          break e;
        case Fc:
          a = 14;
          break e;
        case Vs:
          a = 16, r = null;
          break e;
      }
      throw Error(ye(130, e == null ? e : typeof e, ""));
  }
  return t = ss(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function br(e, t, n, r) {
  return e = ss(7, e, r, t), e.lanes = n, e;
}
function _a(e, t, n, r) {
  return e = ss(22, e, r, t), e.elementType = xh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ni(e, t, n) {
  return e = ss(6, e, null, t), e.lanes = n, e;
}
function ki(e, t, n) {
  return t = ss(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function rg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ti(0), this.expirationTimes = ti(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ti(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Nu(e, t, n, r, l, o, a, i, c) {
  return e = new rg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ss(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, su(o), e;
}
function lg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function cp(e) {
  if (!e) return ur;
  e = e._reactInternals;
  e: {
    if (Lr(e) !== e || e.tag !== 1) throw Error(ye(170));
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
    throw Error(ye(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Wn(n)) return cf(e, n, t);
  }
  return t;
}
function up(e, t, n, r, l, o, a, i, c) {
  return e = Nu(n, r, !0, e, l, o, a, i, c), e.context = cp(null), n = e.current, r = Rn(), l = ar(n), o = As(r, l), o.callback = t ?? null, lr(n, o, l), e.current.lanes = l, po(e, l, r), zn(e, r), e;
}
function Fa(e, t, n, r) {
  var l = t.current, o = Rn(), a = ar(l);
  return n = cp(n), t.context === null ? t.context = n : t.pendingContext = n, t = As(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = lr(l, t, a), e !== null && (ps(e, l, a, o), Vo(e, l, a)), a;
}
function Ca(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function _d(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ku(e, t) {
  _d(e, t), (e = e.alternate) && _d(e, t);
}
function og() {
  return null;
}
var dp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function wu(e) {
  this._internalRoot = e;
}
Ba.prototype.render = wu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ye(409));
  Fa(e, t, null, null);
};
Ba.prototype.unmount = wu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    $r(function() {
      Fa(null, e, null, null);
    }), t[Ls] = null;
  }
};
function Ba(e) {
  this._internalRoot = e;
}
Ba.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Uh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Qs.length && t !== 0 && t < Qs[n].priority; n++) ;
    Qs.splice(n, 0, e), n === 0 && zh(e);
  }
};
function ju(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ua(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Fd() {
}
function ag(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Ca(a);
        o.call(d);
      };
    }
    var a = up(t, r, e, 0, null, !1, !1, "", Fd);
    return e._reactRootContainer = a, e[Ls] = a.current, to(e.nodeType === 8 ? e.parentNode : e), $r(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = Ca(c);
      i.call(d);
    };
  }
  var c = Nu(e, 0, !1, null, null, !1, !1, "", Fd);
  return e._reactRootContainer = c, e[Ls] = c.current, to(e.nodeType === 8 ? e.parentNode : e), $r(function() {
    Fa(t, c, n, r);
  }), c;
}
function Wa(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = Ca(a);
        i.call(c);
      };
    }
    Fa(t, a, e, l);
  } else a = ag(n, t, e, l, r);
  return Ca(a);
}
Fh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Dl(t.pendingLanes);
        n !== 0 && (Wc(t, n | 1), zn(t, rn()), !(St & 6) && (gl = rn() + 500, fr()));
      }
      break;
    case 13:
      $r(function() {
        var r = Os(e, 1);
        if (r !== null) {
          var l = Rn();
          ps(r, e, 1, l);
        }
      }), ku(e, 1);
  }
};
zc = function(e) {
  if (e.tag === 13) {
    var t = Os(e, 134217728);
    if (t !== null) {
      var n = Rn();
      ps(t, e, 134217728, n);
    }
    ku(e, 134217728);
  }
};
Bh = function(e) {
  if (e.tag === 13) {
    var t = ar(e), n = Os(e, t);
    if (n !== null) {
      var r = Rn();
      ps(n, e, t, r);
    }
    ku(e, t);
  }
};
Uh = function() {
  return Lt;
};
Wh = function(e, t) {
  var n = Lt;
  try {
    return Lt = e, t();
  } finally {
    Lt = n;
  }
};
Hi = function(e, t, n) {
  switch (t) {
    case "input":
      if (Pi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = $a(r);
            if (!l) throw Error(ye(90));
            vh(r), Pi(r, l);
          }
        }
      }
      break;
    case "textarea":
      kh(e, n);
      break;
    case "select":
      t = n.value, t != null && tl(e, !!n.multiple, t, !1);
  }
};
Mh = gu;
Ih = $r;
var ig = { usingClientEntryPoint: !1, Events: [go, Yr, $a, Sh, bh, gu] }, Tl = { findFiberByHostInstance: kr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, cg = { bundleType: Tl.bundleType, version: Tl.version, rendererPackageName: Tl.rendererPackageName, rendererConfig: Tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ps.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = $h(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tl.findFiberByHostInstance || og, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var _o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!_o.isDisabled && _o.supportsFiber) try {
    Ma = _o.inject(cg), ks = _o;
  } catch {
  }
}
Qn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ig;
Qn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ju(t)) throw Error(ye(200));
  return lg(e, t, null, n);
};
Qn.createRoot = function(e, t) {
  if (!ju(e)) throw Error(ye(299));
  var n = !1, r = "", l = dp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Nu(e, 1, !1, null, null, n, !1, r, l), e[Ls] = t.current, to(e.nodeType === 8 ? e.parentNode : e), new wu(t);
};
Qn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ye(188)) : (e = Object.keys(e).join(","), Error(ye(268, e)));
  return e = $h(t), e = e === null ? null : e.stateNode, e;
};
Qn.flushSync = function(e) {
  return $r(e);
};
Qn.hydrate = function(e, t, n) {
  if (!Ua(t)) throw Error(ye(200));
  return Wa(null, e, t, !0, n);
};
Qn.hydrateRoot = function(e, t, n) {
  if (!ju(e)) throw Error(ye(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = dp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = up(t, null, e, 1, n ?? null, l, !1, o, a), e[Ls] = t.current, to(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Ba(t);
};
Qn.render = function(e, t, n) {
  if (!Ua(t)) throw Error(ye(200));
  return Wa(null, e, t, !1, n);
};
Qn.unmountComponentAtNode = function(e) {
  if (!Ua(e)) throw Error(ye(40));
  return e._reactRootContainer ? ($r(function() {
    Wa(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ls] = null;
    });
  }), !0) : !1;
};
Qn.unstable_batchedUpdates = gu;
Qn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ua(n)) throw Error(ye(200));
  if (e == null || e._reactInternals === void 0) throw Error(ye(38));
  return Wa(e, t, n, !1, r);
};
Qn.version = "18.3.1-next-f1338f8080-20240426";
function hp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hp);
    } catch (e) {
      console.error(e);
    }
}
hp(), dh.exports = Qn;
var _s = dh.exports, Bd = _s;
ta.createRoot = Bd.createRoot, ta.hydrateRoot = Bd.hydrateRoot;
var fp = { exports: {} }, za = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ug = u, dg = Symbol.for("react.element"), hg = Symbol.for("react.fragment"), fg = Object.prototype.hasOwnProperty, pg = ug.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, mg = { key: !0, ref: !0, __self: !0, __source: !0 };
function pp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) fg.call(t, r) && !mg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: dg, type: e, key: o, ref: a, props: l, _owner: pg.current };
}
za.Fragment = hg;
za.jsx = pp;
za.jsxs = pp;
fp.exports = za;
var s = fp.exports;
let Zs = [], mp = 120, wi = !1;
async function gg() {
  if (!wi) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          xg(n), wi = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    wi = !0;
  }
}
function xg(e) {
  Array.isArray(e) && (Zs = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function $s(e) {
  for (let t = Zs.length - 1; t >= 0; t--) {
    const n = Zs[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return Zs.length > 0 ? {
    offsetMin: Zs[0].offsetBeforeMin,
    label: Zs[0].labelBefore
  } : { offsetMin: mp, label: "LOCAL" };
}
function gp(e, t) {
  return Zs.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Sa(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, i] = t.split(":").map(Number);
  for (const c of Zs)
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
function yg(e) {
  const { offsetMin: t, label: n } = $s(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function vg(e) {
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
function Er(e, t = "LOCAL") {
  return t === "UTC" ? vg(e) : yg(e);
}
function Ud(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Er(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function jc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [i, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(i) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return v;
  const f = Sa(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const m = v - mp * 6e4, { offsetMin: y } = $s(m);
  let E = v - y * 6e4;
  const M = $s(E);
  return M.offsetMin !== y && (E = v - M.offsetMin * 6e4), E;
}
function Ng({
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
  selectedCount: m = 0,
  totalCount: y = 0,
  onResetStudio: E
}) {
  const [M, D] = u.useState(!1);
  u.useEffect(() => {
    if (!M) return;
    const S = (j) => {
      j.key === "Escape" && D(!1);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [M]);
  const k = u.useMemo(() => {
    const S = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!S || j <= 0) return "-- ➔ --";
    const N = S + j, T = (oe) => String(oe).padStart(2, "0"), x = Er(S, n), I = Er(N, n), P = `${x.year}-${T(x.month)}-${T(x.day)}`, K = `${T(x.hour)}:${T(x.minute)}:${T(x.second)}`, $ = `${I.year}-${T(I.month)}-${T(I.day)}`, U = `${T(I.hour)}:${T(I.minute)}:${T(I.second)}`, ne = n === "UTC" ? " (UTC)" : x.label ? ` (${x.label})` : "", V = P === $ ? U : `${$} ${U}`;
    return `${P} ${K} ➔ ${V}${ne}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), p = u.useMemo(() => {
    const S = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (S >= 1440) {
      const j = (S / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${S}m Total)`;
    }
    return `(${S}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), h = () => {
    D(!1), E == null || E();
  }, b = M ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => D(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (S) => S.stopPropagation(), dir: "ltr", children: [
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
          onClick: i,
          title: "Click to modify mission time window",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: k }),
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
          onClick: v,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && b && _s.createPortal(b, document.body)
  ] });
}
const Pr = (e) => String(e).padStart(2, "0");
function wt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const m = new Date(e), y = Pr(m.getUTCHours()), E = Pr(m.getUTCMinutes()), M = Pr(m.getUTCSeconds()), D = l ? `${y}:${E}:${M}` : `${y}:${E}`;
    return r ? `${D} UTC` : D;
  }
  const { offsetMin: o, label: a } = $s(e), i = new Date(e + o * 60 * 1e3), c = Pr(i.getUTCHours()), d = Pr(i.getUTCMinutes()), v = Pr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const kg = 600, Wd = 250, es = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), Ec = /* @__PURE__ */ new Set(), zd = 4;
let al = 0, hs = [];
function Cc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Wd) * Wd;
}
function xp() {
  var e;
  if (!(al >= zd || hs.length === 0))
    for (hs = hs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); al < zd && hs.length > 0; ) {
      const t = hs.pop();
      !t || (e = t.signal) != null && e.aborted || (al++, wg(t));
    }
}
function qo(e, t, n, r = "mon-0") {
  const l = Cc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (es.size >= kg) {
    const i = es.keys().next().value, c = es.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), es.delete(i);
  }
  es.set(a, n), Ec.forEach((i) => i(e, l, n, o));
}
async function wg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      qo(n, r, v, l), a(v);
    } else c.status === 204 ? (qo(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (qo(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    al = Math.max(0, al - 1), Nr.delete(t), xp();
  }
}
const An = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = Cc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!es.has(o)) return null;
    const a = es.get(o);
    return es.delete(o), es.set(o, a), a;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: qo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    es.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), es.clear(), Nr.clear(), hs = [], al = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Ec.add(e), () => Ec.delete(e);
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
    const l = Cc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (es.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Nr.has(a))
      return Nr.get(a);
    const i = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      hs = hs.filter((v) => v.hostname === e && v.displayId === o && v.key !== a ? (Nr.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        hs = hs.filter((v) => v.key !== a), Nr.delete(a), c(null);
      }, { once: !0 }), hs.push(d), xp();
    });
    return Nr.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  An.clearAll();
});
const Eu = "ITB_STUDIO_SESSION_CACHE_V2", yp = "itb_player_audio_settings";
let ji = null;
function jg() {
  try {
    const e = localStorage.getItem(Eu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function vp(e) {
  e && (ji && clearTimeout(ji), ji = setTimeout(() => {
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
      localStorage.setItem(Eu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Eg() {
  try {
    localStorage.removeItem(Eu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function il() {
  try {
    const e = localStorage.getItem(yp);
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
function Cg(e) {
  try {
    localStorage.setItem(yp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Gs = null, el = null, Ei = null, Pn = 0, _r = 0, Fo = -60, uo = 1;
function Sg() {
  if (!Gs) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Gs = new e());
  }
  return Gs && Gs.state === "suspended" && Gs.resume().catch(() => {
  }), Gs;
}
function ba(e, t = 1) {
  if (!e) return null;
  uo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Sg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(uo, n.currentTime), el = e, bg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Hd(e) {
  if (uo = Math.max(0, Number(e) || 1), el != null && el.__audioGainNode && Gs)
    try {
      el.__audioGainNode.gain.setValueAtTime(uo, Gs.currentTime);
    } catch {
    }
}
function bg() {
  if (Ei) return;
  const e = new Uint8Array(256), t = () => {
    const n = el, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Pn *= 0.85, _r *= 0.85, Pn < 1e-3 && (Pn = 0), _r < 1e-3 && (_r = 0), Fo = Pn > 1e-3 ? 20 * Math.log10(Pn) : -60;
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
        Pn = a > Pn ? Pn * 0.3 + a * 0.7 : Pn * 0.85 + a * 0.15, _r = Math.max(Pn, o), Fo = Pn > 1e-4 ? 20 * Math.log10(Pn) : -60;
      } catch {
        Pn = 0, _r = 0, Fo = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Pn,
        peak: _r,
        db: Fo,
        gain: uo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Ei = requestAnimationFrame(t);
  };
  Ei = requestAnimationFrame(t);
}
function Np({ isPlaying: e = !1 }) {
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
function Mg({
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
          const d = (i.displayId ?? i.DisplayId ?? `mon-${c}`).toLowerCase(), v = !a && o === d, f = i.width ?? i.Width ?? 1920, m = i.height ?? i.Height ?? 1080, y = i.displayName ?? i.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (E) => {
                E.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${y} (${f}×${m})`,
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
function kp({
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
    let y = 1 / 0, E = 1 / 0, M = -1 / 0, D = -1 / 0;
    e.forEach((h) => {
      const b = h.x ?? h.X ?? 0, S = h.y ?? h.Y ?? 0, j = h.width ?? h.Width ?? 1920, N = h.height ?? h.Height ?? 1080;
      y = Math.min(y, b), E = Math.min(E, S), M = Math.max(M, b + j), D = Math.max(D, S + N);
    });
    const k = Math.max(1, M - y), p = Math.max(1, D - E);
    return { minX: y, minY: E, totalW: k, totalH: p };
  }, [e]);
  if (!e || e.length <= 1 || !a)
    return null;
  const i = e.find((y) => (y.displayId ?? y.DisplayId) === t) || e[0], c = e.indexOf(i), d = c >= 0 ? c + 1 : 1, f = (i ? i.displayName ?? i.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), m = f && !f.toLowerCase().includes("screen") ? `SCREEN ${d} (${f.toUpperCase()})` : f ? f.toUpperCase() : `SCREEN ${d}`;
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
          m,
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
            m
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${a.totalW} ${a.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((y, E) => {
              const M = y.displayId ?? y.DisplayId ?? `mon-${E}`, D = (y.x ?? y.X ?? 0) - a.minX, k = (y.y ?? y.Y ?? 0) - a.minY, p = y.width ?? y.Width ?? 1920, h = y.height ?? y.Height ?? 1080, b = M === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${b ? "is-active" : ""}`,
                  onClick: (S) => {
                    S.stopPropagation(), n == null || n(M);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: D + 10,
                        y: k + 10,
                        width: Math.max(10, p - 20),
                        height: Math.max(10, h - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: D + p / 2,
                        y: k + h / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: E + 1
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
function Ig({
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
  recordingSegments: m = {},
  playbackSpeed: y = 1,
  activeAudioStationId: E = null,
  directorPlan: M = null,
  isAutoDirectorEnabled: D = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: p = null,
  areAllDisplaysPlaced: h = !1,
  hideDisplayStrip: b = !1
}) {
  var re;
  const S = e.hostname || e.name || e.id || "", j = Math.round(t), [N, T] = u.useState(() => !S || !j ? null : An.get(S, j) || null), [x, I] = u.useState(""), [P, K] = u.useState(!1), [$, U] = u.useState(!1), [ne, V] = u.useState(!1), oe = u.useRef(l), C = u.useRef(null), R = u.useRef(0), F = u.useRef(t - a), Y = u.useRef(t - a), B = u.useRef(!1), se = u.useRef(null), ee = u.useRef(!1);
  F.current = t - a;
  const J = (e == null ? void 0 : e.displays) || ((re = e == null ? void 0 : e.topology) == null ? void 0 : re.displays) || [], [le, We] = u.useState(null);
  u.useEffect(() => {
    We(null);
  }, [k]);
  const Pe = u.useMemo(() => {
    const q = M || (e == null ? void 0 : e.directorPlan);
    return !q || !q.segments || q.segments.length === 0 ? null : q.segments.find((W) => {
      const z = W.startEpochMs ?? W.StartEpochMs ?? 0, he = W.endEpochMs ?? W.EndEpochMs ?? 0;
      return t >= z && t <= he;
    }) || q.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t]), we = u.useMemo(() => {
    var q;
    return le ? le.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : J.length > 1 && D !== !1 && Pe ? (Pe.targetDisplayId || Pe.TargetDisplayId || "mon-0").toLowerCase() : (((q = J[0]) == null ? void 0 : q.displayId) || "mon-0").toLowerCase();
  }, [le, k, J, D, Pe]), ze = u.useRef(we), [Le, Se] = u.useState(!1);
  u.useEffect(() => {
    if (ze.current && ze.current !== we) {
      Se(!0);
      const q = setTimeout(() => Se(!1), 2e3);
      return ze.current = we, () => clearTimeout(q);
    }
    ze.current = we;
  }, [we]);
  const He = m[e == null ? void 0 : e.id] || m[S] || (e == null ? void 0 : e.segments) || [], ht = He.length === 0 || He.some((q) => {
    const W = q.startEpochMs ?? q.startEpoch ?? 0, z = q.endEpochMs ?? q.endEpoch ?? 0;
    return t >= W && t <= z;
  }), A = !!(r ? !il().isMuted : E && (e.id === E || S === E)), G = u.useCallback(() => {
    if (!C.current) return;
    const q = il();
    if (r)
      C.current.volume = q.volume, C.current.muted = q.isMuted, q.isMuted || ba(C.current);
    else {
      const W = !!(E && (e.id === E || S === E));
      C.current.muted = !W, W && (C.current.volume = q.volume, ba(C.current));
    }
  }, [r, E, e.id, S]);
  u.useEffect(() => {
    G();
  }, [G]), u.useEffect(() => {
    const q = (W) => {
      C.current && W.detail && G();
    };
    return window.addEventListener("itb-audio-state-changed", q), () => window.removeEventListener("itb-audio-state-changed", q);
  }, [G]), u.useEffect(() => {
    C.current && (C.current.defaultPlaybackRate = y, C.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !j || !S) return;
    if (l) {
      oe.current = !0;
      return;
    }
    const q = oe.current;
    oe.current = l;
    let W = !0;
    const z = new AbortController(), he = An.get(S, j, we);
    if (he) {
      T(he), U(!1), V(!1);
      return;
    }
    V(!0);
    const Ie = setTimeout(() => {
      W && An.fetchFrame(S, j, z.signal, we).then((Me) => {
        W && (V(!1), Me && Me !== "NO_SIGNAL" ? (T(Me), U(!1)) : Me === "NO_SIGNAL" && U(!0));
      });
    }, q ? 25 : 40), _e = An.subscribe((Me, Ne, nt, Be) => {
      Me === S && Ne === j && (!Be || Be === we) && W && (V(!1), nt && nt !== "NO_SIGNAL" ? (T(nt), U(!1)) : nt === "NO_SIGNAL" && U(!0));
    });
    return () => {
      W = !1, clearTimeout(Ie), z.abort(), _e();
    };
  }, [S, j, n, l, r, P, we]), u.useEffect(() => {
    if (!S || !(r || l)) {
      l || (se.current && clearTimeout(se.current), B.current = !1, I(""), K(!1), C.current && (C.current.pause(), C.current.removeAttribute("src"), C.current.load()));
      return;
    }
    let W = null;
    return l && !v && ht ? W = setTimeout(() => {
      const z = F.current;
      R.current = z, Y.current = z, B.current = !1;
      const he = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + z}&displayId=${encodeURIComponent(we)}&_t=${Date.now()}`;
      K(!1), I(he);
    }, 80) : l || (se.current && clearTimeout(se.current), B.current = !1, I(""), K(!1), C.current && (C.current.pause(), C.current.removeAttribute("src"), C.current.load())), () => {
      W && clearTimeout(W);
    };
  }, [l, r, S, a, i, v, ht, we]), u.useEffect(() => {
    if (!S || !(r || l)) return;
    const W = F.current, z = Math.abs(W - Y.current);
    if (!l || z < 800) {
      Y.current = W;
      return;
    }
    return B.current = !0, Y.current = W, R.current = W, C.current && C.current.pause(), K(!1), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!ht || v) {
        I(""), K(!1), B.current = !1;
        return;
      }
      const he = F.current, de = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + he}&displayId=${encodeURIComponent(we)}&_t=${Date.now()}`;
      I(de);
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [t, l, r, S, a, i, v, ht, we]), u.useEffect(() => {
    if (r || !l || !C.current || !P || B.current) return;
    const q = (F.current - R.current) / 1e3;
    if (q >= 0) {
      const W = C.current, z = W.currentTime, he = Math.abs(z - q);
      if (he > 0.35 && he < 3)
        try {
          W.currentTime = q;
        } catch {
        }
    }
  }, [r, l, t, P]), u.useEffect(() => {
    if (!r || !l || !x || !P || v) return;
    let q = null, W = C.current ? C.current.currentTime : 0, z = performance.now(), he = R.current + Math.round(W * 1e3);
    const de = () => {
      const Ie = C.current;
      if (Ie && !Ie.paused && !Ie.ended && !ee.current && !B.current) {
        const _e = performance.now(), Me = Ie.currentTime;
        Math.abs(Me - W) > 5e-4 && (W = Me, z = _e);
        const Ne = Math.max(0, (_e - z) / 1e3), nt = Ie.playbackRate || y || 1, Be = W + Ne * nt;
        let Tt = R.current + Math.round(Be * 1e3);
        const Ke = Tt - he;
        if (Ke < 0 && Ke > -300 && (Tt = he), Tt >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Nt = a + Tt, Ft = f == null ? void 0 : f.find((Je) => Nt >= Je.startEpochMs && Nt < Je.endEpochMs);
        if (Ft) {
          ee.current = !0;
          const Je = Ft.endEpochMs - a;
          d(Je), R.current = Je, he = Je, Y.current = Je;
          const Kt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Je}&_t=${Date.now()}`;
          K(!1), I(Kt), setTimeout(() => {
            ee.current = !1;
          }, 300);
          return;
        }
        Tt !== he && (he = Tt, Y.current = Tt, d == null || d(Tt));
      }
      q = requestAnimationFrame(de);
    };
    return q = requestAnimationFrame(de), () => {
      q && cancelAnimationFrame(q);
    };
  }, [
    r,
    l,
    x,
    P,
    v,
    y,
    c,
    a,
    i,
    S,
    f,
    d,
    o
  ]);
  const ae = () => {
    if (ee.current) return;
    const q = a + F.current, W = He.map((z) => ({ start: z.startEpochMs ?? z.startEpoch ?? 0, end: z.endEpochMs ?? z.endEpoch ?? 0 })).filter((z) => z.start > q + 200).sort((z, he) => z.start - he.start)[0];
    if (W && W.start - a < c) {
      ee.current = !0;
      const z = W.start - a;
      d(z), R.current = z;
      const he = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(S)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + z}&_t=${Date.now()}`;
      K(!1), I(he), setTimeout(() => {
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
    (r || l) && x && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: C,
        src: x,
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
        muted: !A,
        onLoadedData: () => {
          C.current && (C.current.defaultPlaybackRate = y, C.current.playbackRate = y);
        },
        onCanPlay: () => {
          G(), C.current && (C.current.defaultPlaybackRate = y, C.current.playbackRate = y), l && C.current && C.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          B.current = !1, K(!0), G(), C.current && (C.current.defaultPlaybackRate = y, C.current.playbackRate = y);
        },
        onWaiting: () => {
          K(!1);
        },
        onTimeUpdate: () => {
          var q;
          !P && ((q = C.current) == null ? void 0 : q.currentTime) > 0 && (B.current = !1, K(!0));
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
          zIndex: (r || l) && P && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: N && !$ ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: N,
            alt: S,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => U(!0)
          }
        ) : (!N || $ || !ht) && !x ? /* @__PURE__ */ s.jsx(Np, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && ht && !P && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    J.length > 1 && /* @__PURE__ */ s.jsx(
      kp,
      {
        displays: J,
        activeDisplayId: we,
        onSelectDisplay: (q) => {
          We(q), p == null || p(q);
        },
        isTransitioning: Le,
        mode: D ? "AUTO" : "MANUAL"
      }
    ),
    !b && /* @__PURE__ */ s.jsx(
      Mg,
      {
        displays: J,
        activeDisplayId: we,
        onSelectDisplay: (q) => {
          We(q), p == null || p(q);
        },
        areAllDisplaysPlaced: h,
        isAutoDirectorEnabled: D
      }
    )
  ] });
}
function Tg({
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
  isSpotlightActive: m,
  globalGaps: y = [],
  onOpenSpotlight: E,
  onSelectActiveStation: M,
  recordingSegments: D = {},
  playbackSpeed: k = 1,
  activeAudioStationId: p = null,
  onSoloAudio: h,
  directorPlan: b = null,
  isAutoDirectorEnabled: S = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: T = !1,
  _slotIndex: x = 0,
  borderColor: I = null,
  onSwapWithNext: P = null
}) {
  var C;
  const K = !!(p && (e.id === p || e.hostname && e.hostname === p)), $ = (e.hostname || e.name || "").includes("Offline"), U = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((C = e == null ? void 0 : e.topology) == null ? void 0 : C.displays) || []).length > 1;
  const V = () => {
    if (t) {
      const R = j && j !== "auto" && j !== "director" ? j : null;
      E && E(e.id, R);
    } else
      M && M(e.id);
  }, oe = (R) => {
    R.preventDefault(), R.stopPropagation(), t && M && (i && i(!1), M(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: V,
      onContextMenu: oe,
      className: `camera-card ${U} ${t ? "is-solo-card" : ""}`,
      style: I ? { borderColor: I } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${U}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            P && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (R) => {
                  R.stopPropagation(), P();
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
                onClick: (R) => {
                  R.stopPropagation(), h(K ? null : e.id);
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
            E && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (R) => {
                  R.stopPropagation();
                  const F = j && j !== "auto" && j !== "director" ? j : null;
                  E(e.id, F);
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
                onClick: (R) => {
                  R.stopPropagation(), t && i && i(!1), M(t ? null : e.id);
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
                onClick: (R) => {
                  R.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${$ ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Ig,
            {
              station: e,
              currentEpochMs: l,
              isOffline: $,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: i,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: v,
              setPlayheadMs: f,
              isSpotlightActive: m,
              globalGaps: y,
              recordingSegments: D,
              playbackSpeed: k,
              activeAudioStationId: p,
              directorPlan: b,
              isAutoDirectorEnabled: S,
              targetDisplayId: j,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: T,
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
          wt(l, o)
        ] }) })
      ]
    }
  ) });
}
const Ci = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Ag({
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
    const p = (Ci.indexOf(o) + 1) % Ci.length, h = Ci[p];
    l(h);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", h);
    } catch {
    }
    n && n(h);
  }, [o, n]), i = new Date(e || Date.now()), c = i.getUTCFullYear(), d = String(i.getUTCMonth() + 1).padStart(2, "0"), v = String(i.getUTCDate()).padStart(2, "0"), f = String(i.getUTCHours()).padStart(2, "0"), m = String(i.getUTCMinutes()).padStart(2, "0"), y = String(i.getUTCSeconds()).padStart(2, "0"), E = `${c}-${d}-${v}`, M = `${f}:${m}:${y} UTC`;
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
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: E }),
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
function $g() {
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
function Jt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Rg(e) {
  const t = Jt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Lg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Og({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var M, D, k, p, h, b;
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
    return ((M = l.layout) == null ? void 0 : M.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((D = l.layout) == null ? void 0 : D.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (i === "cut")
    return ((p = l.layout) == null ? void 0 : p.placements) || n;
  const d = (t - c) / a, v = Jt(d, 0, 1), f = i === "linear" ? v : Rg(v), m = ((h = l.layout) == null ? void 0 : h.placements) || [], y = ((b = o.layout) == null ? void 0 : b.placements) || [], E = y.map((S) => {
    const j = m.find((K) => K.stationId === S.stationId && K.displayId === S.displayId);
    if (!j)
      return {
        ...S,
        opacity: Math.max(0.05, f)
      };
    const N = Math.round(j.x + (S.x - j.x) * f), T = Math.round(j.y + (S.y - j.y) * f), x = Math.round(j.width + (S.width - j.width) * f), I = Math.round(j.height + (S.height - j.height) * f), P = Number(((j.rotation || 0) + ((S.rotation || 0) - (j.rotation || 0)) * f).toFixed(1));
    return {
      ...S,
      x: N,
      y: T,
      width: x,
      height: I,
      rotation: P,
      opacity: 1
    };
  });
  return m.forEach((S) => {
    y.some((N) => N.stationId === S.stationId && N.displayId === S.displayId) || E.push({
      ...S,
      opacity: Math.max(0, 1 - f)
    });
  }), E;
}
function Dg({
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
    const E = {
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
  }, f = [...c, v].sort((E, M) => E.timestampEpochMs - M.timestampEpochMs), m = f.findIndex((E) => E.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: m >= 0 ? m : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function Sc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Pg(e, t) {
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
function Kd(e, t, n, r = 500) {
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
function _g(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
    f > v && !i.some((m) => m.startEpoch === v && m.endEpoch === f) && i.push({ startEpoch: v, endEpoch: f });
  }), i.forEach((d) => {
    const v = d.startEpoch, f = d.endEpoch, m = [];
    a.forEach((y) => {
      y.endEpochMs <= v || y.startEpochMs >= f ? m.push(y) : (y.startEpochMs < v && m.push({
        ...y,
        endEpochMs: v
      }), y.endEpochMs > f && m.push({
        ...y,
        startEpochMs: f
      }));
    }), a = m;
  }), (t || []).filter((d) => d.type !== "global").forEach((d) => {
    const v = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, f = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    if (!(!v || !f || f <= v))
      for (let m = a.length - 1; m > 0; m--) {
        const y = a[m].startEpochMs;
        y >= v && y <= f && a[m].startEpochMs === a[m - 1].endEpochMs && (a[m - 1].endEpochMs = a[m].endEpochMs, a.splice(m, 1));
      }
  });
  for (let d = a.length - 1; d > 0; d--)
    a[d].targetDisplayId === a[d - 1].targetDisplayId && a[d].startEpochMs === a[d - 1].endEpochMs && (a[d - 1].endEpochMs = a[d].endEpochMs, a.splice(d, 1));
  return a;
}
const qn = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], bc = 1920, Mc = 1080, xt = [
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
], Fg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function Bg(e, t, n) {
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
function Fr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Xs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let i, c, d, v;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), v = t), { x: d, y: v, width: i, height: c };
}
function Hs(e, t = bc, n = Mc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: f, width: m, height: y } = Xs(0, 0, t, n, d);
    return [{
      ...c,
      x: v,
      y: f,
      width: m,
      height: y,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: xt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: m, y, width: E, height: M } = Xs(v * c, 0, c, n, f);
      return {
        ...d,
        x: m,
        y,
        width: E,
        height: M,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: f,
        aspectRatio: f,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: xt[v % xt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const m = Math.round(t / 3);
      return e.slice(0, 3).map((y, E) => {
        const M = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: D, y: k, width: p, height: h } = Xs(E * m, 0, m, n, M);
        return {
          ...y,
          x: D,
          y: k,
          width: p,
          height: h,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: M,
          aspectRatio: M,
          zIndex: E,
          rotation: 0,
          borderWidth: 2,
          borderColor: xt[E % xt.length],
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
    return e.slice(0, 3).map((m, y) => {
      const E = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: M, cy: D } = f[y], { x: k, y: p, width: h, height: b } = Xs(M, D, d, v, E);
      return {
        ...m,
        x: k,
        y: p,
        width: h,
        height: b,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: E,
        aspectRatio: E,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: xt[y % xt.length],
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
    return e.slice(0, 4).map((f, m) => {
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: E, cy: M } = v[m], { x: D, y: k, width: p, height: h } = Xs(E, M, c, d, y);
      return {
        ...f,
        x: D,
        y: k,
        width: p,
        height: h,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: m,
        rotation: 0,
        borderWidth: 2,
        borderColor: xt[m % xt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), i = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, f = Math.floor(d / l), m = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: E, width: M, height: D } = Xs(v * a, f * i, a, i, m);
    return {
      ...c,
      x: y,
      y: E,
      width: M,
      height: D,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: m,
      aspectRatio: m,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: xt[d % xt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Ug({
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
  timeMode: m = "LOCAL",
  isPlaying: y = !1,
  setIsPlaying: E,
  totalDurationMs: M,
  inPointMs: D = 0,
  outPointMs: k,
  setPlayheadMs: p,
  globalGaps: h = [],
  recordingSegments: b = {},
  playbackSpeed: S = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: N = "BurnIn",
  keystrokes: T = [],
  directorPlan: x = null,
  onOverrideDisplay: I,
  onResetOverride: P,
  compositionLayout: K = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: U = !0,
  onToggleAutoDirector: ne,
  onUpdateCanvasLayout: V,
  canvasLayoutTimeline: oe = null,
  onUpdateCanvasLayoutTimeline: C,
  activeKfIndex: R = 0,
  setActiveKfIndex: F,
  isModalOpen: Y = !1
}) {
  const B = f > 0 ? f : d + v, [se, ee] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [J, le] = u.useState(() => {
    var g;
    return ((g = t[0]) == null ? void 0 : g.id) || null;
  }), [We, Pe] = u.useState(!1), [we, ze] = u.useState(null), [Le, Se] = u.useState({ index: null, position: null }), [He, ht] = u.useState(!1), [A, G] = u.useState(!1), [ae, re] = u.useState(!1), [q, W] = u.useState(!1), [z, he] = u.useState(""), [de, Ie] = u.useState(""), _e = u.useRef(null), [Me, Ne] = u.useState(() => {
    try {
      const g = localStorage.getItem("itb_canvas_saved_presets");
      return g ? JSON.parse(g) : [];
    } catch {
      return [];
    }
  }), nt = (g) => {
    Ne(g);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(g));
    } catch {
    }
  }, [Be, Tt] = u.useState(!1), [Ke, Nt] = u.useState(!1);
  u.useRef(null);
  const Ft = u.useRef(null), Je = u.useRef(null), Kt = u.useRef(null), [Bt, kn] = u.useState({ width: 960, height: 540 }), [Ze, Xe] = u.useState(0), [jt, xn] = u.useState(!1);
  u.useEffect(() => {
    const g = (w) => {
      w.key === "Escape" && xn(!1);
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, []);
  const [Et, Ot] = u.useState(!1), [tn, cn] = u.useState(!1), [Dn, bn] = u.useState(!1), [Te, Ae] = u.useState(!1), [Ve, ft] = u.useState(!1), [bt, te] = u.useState({ vertical: null, horizontal: null }), [me, Z] = u.useState(!0), [Ee, Oe] = u.useState(!0), [Qe, et] = u.useState(null), [Ye, ct] = u.useState({ x: 0, y: 0, isInside: !1 }), Ct = u.useRef(null), dt = u.useRef(null), pt = u.useRef(!1), [Ut, Mt] = u.useState("auto-grid"), Dt = u.useRef([]), wn = u.useRef([]), fn = u.useRef(null), [, Wt] = u.useState(0), as = u.useRef(null), [js, Nl] = u.useState(null), ln = u.useCallback((g, w = "success", L = "💾") => {
    as.current && clearTimeout(as.current), Nl({ text: g, type: w, icon: L }), as.current = setTimeout(() => {
      Nl(null), as.current = null;
    }, 2200);
  }, []), [kt, Mn] = u.useState(() => {
    var L, Q, X, _, ie, be;
    const g = (X = (Q = (L = oe == null ? void 0 : oe.keyframes) == null ? void 0 : L[0]) == null ? void 0 : Q.layout) == null ? void 0 : X.width, w = (be = (ie = (_ = oe == null ? void 0 : oe.keyframes) == null ? void 0 : _[0]) == null ? void 0 : ie.layout) == null ? void 0 : be.height;
    if (g && w) {
      const pe = qn.find((ke) => ke.w === g && ke.h === w);
      if (pe) return pe.id;
    }
    return "16:9";
  }), [Pt, kl] = u.useState(() => {
    try {
      const g = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (g !== null) return g === "true";
    } catch {
    }
    return !1;
  }), Or = u.useCallback(() => {
    kl((g) => {
      const w = !g;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(w));
      } catch {
      }
      return w;
    });
  }, []), Es = u.useMemo(() => qn.find((g) => g.id === kt) || qn[0], [kt]), $e = Es.w, Ce = Es.h, gs = Es.ratio, yo = u.useMemo(() => {
    const g = [], w = $e >= 3e3 ? 200 : 100, L = w / 2, Q = w / 10;
    for (let X = 0; X <= $e; X += Q) {
      const _ = X % w === 0, ie = !_ && X % L === 0;
      g.push({ val: X, isMajor: _, isMed: ie });
    }
    return g;
  }, [$e]), Ha = u.useMemo(() => {
    const g = [];
    for (let X = 0; X <= Ce; X += 10) {
      const _ = X % 100 === 0, ie = !_ && X % 50 === 0;
      g.push({ val: X, isMajor: _, isMed: ie });
    }
    return g;
  }, [Ce]), vo = u.useCallback((g) => {
    const w = Ct.current || Je.current;
    if (!w) return;
    const L = w.getBoundingClientRect(), Q = Jt(Math.round((g.clientX - L.left) / L.width * $e), 0, $e), X = Jt(Math.round((g.clientY - L.top) / L.height * Ce), 0, Ce);
    ct({ x: Q, y: X, isInside: !0 });
  }, [$e, Ce]), Ka = u.useCallback(() => {
    ct((g) => ({ ...g, isInside: !1 }));
  }, []), pr = u.useCallback(() => {
    const g = Kt.current;
    if (!g) return;
    const w = g.getBoundingClientRect(), Q = Math.max(320, Math.floor(w.width || 960) - 104 - 16), X = Math.max(180, Math.floor(w.height || 540) - 16);
    let _, ie;
    Pt ? (_ = Q, ie = Math.round(_ / gs)) : Q / X >= gs ? (ie = X, _ = Math.round(ie * gs)) : (_ = Q, ie = Math.round(_ / gs)), kn((be) => be.width === _ && be.height === ie ? be : { width: _, height: ie });
  }, [Pt, gs]);
  u.useEffect(() => {
    const g = Kt.current;
    if (!g) return;
    pr();
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(() => {
      pr();
    }), w.observe(g)), window.addEventListener("resize", pr), () => {
      w && w.disconnect(), window.removeEventListener("resize", pr);
    };
  }, [pr]);
  const sn = u.useMemo(() => (t && t.length > 0 ? t : n).map((w) => {
    const L = w.displays && w.displays.length > 0 ? w.displays : w.topology && w.topology.displays && w.topology.displays.length > 0 ? w.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: w.width || 1920, height: w.height || 1080 }], Q = L.find((pe) => pe.isPrimary) || L[0], X = Q.width || Q.Width || w.width || 1920, _ = Q.height || Q.Height || w.height || 1080, ie = X && _ ? X / _ : 16 / 9, be = L.length > 1;
    return {
      stationId: w.id,
      displayId: "auto",
      label: `${w.displayName || w.roleAlias || w.hostname || w.name} - ${be ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: w.displayName || w.roleAlias || w.hostname || w.name,
      stationHostname: w.hostname || w.id,
      isPrimary: !0,
      sourceWidth: X,
      sourceHeight: _,
      nativeAspectRatio: ie,
      aspectRatio: ie,
      width: X,
      height: _
    };
  }), [t, n]), Xt = u.useMemo(() => {
    const g = t && t.length > 0 ? t : n, w = [];
    return g.forEach((L) => {
      const Q = L.displays && L.displays.length > 0 ? L.displays : L.topology && L.topology.displays && L.topology.displays.length > 0 ? L.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: L.width || 1920, height: L.height || 1080 }], X = Q.find((pe) => pe.isPrimary) || Q[0], _ = X.width || X.Width || L.width || 1920, ie = X.height || X.Height || L.height || 1080, be = _ / ie;
      w.push({
        stationId: L.id,
        displayId: "auto",
        label: `${L.displayName || L.roleAlias || L.hostname || L.name} - ${Q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: L.displayName || L.roleAlias || L.hostname || L.name,
        stationHostname: L.hostname || L.id,
        isPrimary: !0,
        sourceWidth: _,
        sourceHeight: ie,
        nativeAspectRatio: be,
        aspectRatio: be,
        width: _,
        height: ie
      }), Q.length > 1 && Q.forEach((pe, ke) => {
        const it = (pe.displayId || `mon-${ke}`).toLowerCase(), rt = pe.displayNumber || ke + 1, lt = pe.displayName || `Screen ${rt}`, ge = pe.width || pe.Width || L.width || 1920, ot = pe.height || pe.Height || L.height || 1080, $t = ge / ot;
        w.push({
          stationId: L.id,
          displayId: it,
          label: `${L.displayName || L.roleAlias || L.hostname || L.name} - ${lt}`,
          stationName: L.displayName || L.roleAlias || L.hostname || L.name,
          stationHostname: L.hostname || L.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: ge,
          sourceHeight: ot,
          nativeAspectRatio: $t,
          aspectRatio: $t,
          width: ge,
          height: ot
        });
      });
    }), w;
  }, [t, n]), [pn, un] = u.useState(() => {
    var g;
    if (((g = oe == null ? void 0 : oe.keyframes) == null ? void 0 : g.length) > 0) {
      const w = JSON.parse(JSON.stringify(oe));
      if (t && t.length > 0) {
        const L = new Set(t.map((X) => X.id));
        if (w.keyframes.forEach((X) => {
          var _, ie;
          ((ie = (_ = X.layout) == null ? void 0 : _.placements) == null ? void 0 : ie.length) > 0 && (X.layout.placements = X.layout.placements.filter((be) => L.has(be.stationId)));
        }), w.keyframes.some((X) => {
          var _, ie;
          return ((ie = (_ = X.layout) == null ? void 0 : _.placements) == null ? void 0 : ie.length) > 0;
        })) return w;
      } else
        return w;
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
            width: bc,
            height: Mc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Hs(sn, bc, Mc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var g;
    if (((g = oe == null ? void 0 : oe.keyframes) == null ? void 0 : g.length) > 0) {
      const w = JSON.parse(JSON.stringify(oe));
      if (t && t.length > 0) {
        const Q = new Set(t.map((X) => X.id));
        w.keyframes.forEach((X) => {
          var _, ie;
          ((ie = (_ = X.layout) == null ? void 0 : _.placements) == null ? void 0 : ie.length) > 0 && (X.layout.placements = X.layout.placements.filter((be) => Q.has(be.stationId)));
        });
      }
      un(w), w.keyframes.some((Q) => {
        var X, _;
        return ((_ = (X = Q.layout) == null ? void 0 : X.placements) == null ? void 0 : _.length) > 0;
      }) && (pt.current = !0, Mt("custom"));
    }
  }, [oe, t]);
  const O = pn.keyframes || [], ue = u.useMemo(() => Lg(O, B), [O, B]), ce = Jt(
    R ?? ue,
    0,
    Math.max(0, O.length - 1)
  ), xe = O[ce] || O[ue] || O[0], H = u.useMemo(() => {
    var g;
    return ((g = xe == null ? void 0 : xe.layout) == null ? void 0 : g.placements) || [];
  }, [xe]), ve = u.useCallback((g = "Action") => ({
    label: g,
    timeline: JSON.parse(JSON.stringify(pn)),
    aspectId: kt,
    presetId: Ut,
    selectedFeedIndex: Ze
  }), [pn, kt, Ut, Ze]), je = u.useCallback((g = "Action") => {
    const w = ve(g);
    Dt.current.push(w), Dt.current.length > 50 && Dt.current.shift(), wn.current = [], Wt((L) => L + 1);
  }, [ve]), Re = u.useCallback(() => {
    fn.current && (Dt.current.push(fn.current), Dt.current.length > 50 && Dt.current.shift(), wn.current = [], fn.current = null, Wt((g) => g + 1));
  }, []), Ge = u.useCallback(() => {
    const g = f > 0 ? f : d + v, w = 500;
    if (g <= d + w) return ce;
    const L = (xe == null ? void 0 : xe.layout) || {
      width: $e,
      height: Ce,
      backgroundColor: "#070A10",
      fps: 30,
      placements: H
    }, { nextTimeline: Q, newIndex: X, isNew: _ } = Kd(pn, g, L, w);
    return _ && (un(Q), C && C(Q), F && F(X), ln(
      `Keyframe #${X + 1} created at ${wt(g, m, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), X;
  }, [f, d, v, ce, xe, $e, Ce, H, pn, C, F, m, ln]), fe = u.useCallback((g, w = null) => {
    w && je(w);
    const L = f > 0 ? f : d + v;
    un((Q) => {
      const { nextTimeline: X, newIndex: _, isNewKeyframe: ie } = Dg({
        prevTimeline: Q,
        newPlacements: g,
        currentEpochMs: L,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: $e,
        virtualH: Ce,
        fps: 30
      });
      return C && C(X), F && F(_), ie && _ > 0 && ln(
        `Keyframe #${_ + 1} created at ${wt(L, m, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), X;
    });
  }, [f, d, v, $e, Ce, C, F, m, ln, je]);
  u.useEffect(() => {
    if (sn.length > 0 && (!H || H.length === 0) && !pt.current) {
      let g = kt;
      sn.length === 2 && kt === "16:9" && (g = "32:9", Mn("32:9"));
      const w = qn.find((Q) => Q.id === g) || qn[0], L = Hs(sn, w.w, w.h);
      L.length > 0 && (fe(L), Mt("auto-grid"));
    }
  }, [sn, H, fe, kt]);
  const Fe = u.useRef("");
  u.useEffect(() => {
    const g = (t || []).map((w) => w.id).sort().join(",");
    if (Fe.current === "") {
      Fe.current = g;
      return;
    }
    if (Fe.current !== g && (Fe.current = g, t && t.length > 0)) {
      const w = new Set(t.map((L) => L.id));
      if (Ut === "auto-grid" || !pt.current) {
        let L = kt;
        sn.length === 2 && kt === "16:9" && (L = "32:9", Mn("32:9"));
        const Q = qn.find((_) => _.id === L) || qn[0], X = Hs(sn, Q.w, Q.h);
        X.length > 0 && fe(X);
      } else if (H && H.length > 0) {
        const L = H.filter((Q) => w.has(Q.stationId));
        if (L.length !== H.length)
          if (L.length === 0) {
            const Q = Hs(sn, $e, Ce);
            fe(Q);
          } else
            fe(L);
      }
    }
  }, [t, sn, Ut, kt, H, fe, $e, Ce]), u.useEffect(() => {
    V && V({
      width: $e,
      height: Ce,
      backgroundColor: "#070A10",
      fps: 30,
      placements: H,
      timeline: pn
    });
  }, [H, pn, V, $e, Ce]);
  const st = u.useCallback((g) => {
    const w = Es, L = qn.find((Q) => Q.id === g) || qn[0];
    if (w.id !== L.id)
      if (Mn(L.id), pt.current) {
        const Q = L.w / w.w, X = L.h / w.h, _ = H.map((ie) => ({
          ...ie,
          x: Math.round(ie.x * Q),
          y: Math.round(ie.y * X),
          width: Math.round(ie.width * Q),
          height: Math.round(ie.height * X)
        }));
        fe(_);
      } else {
        const Q = sn.length > 0 ? sn : H && H.length > 0 ? H : Xt, X = Hs(Q, L.w, L.h);
        fe(X);
      }
  }, [Es, H, Xt, fe]), qe = u.useCallback((g) => {
    const w = H.length > 0 ? Math.max(...H.map((pe) => pe.zIndex || 0)) + 1 : 0, L = xt[H.length % xt.length], Q = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 16 / 9), X = Q >= 1 ? 640 : Math.round(360 * Q), _ = Q >= 1 ? Math.round(640 / Q) : 360, ie = {
      stationId: g.stationId,
      displayId: g.displayId,
      label: g.label,
      x: 100 + H.length * 40 % 800,
      y: 80 + H.length * 40 % 500,
      width: X,
      height: _,
      sourceWidth: g.sourceWidth || 1920,
      sourceHeight: g.sourceHeight || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q,
      zIndex: w,
      rotation: 0,
      borderWidth: 2,
      borderColor: L,
      shadowEffect: "deep",
      borderRadius: 0
    }, be = [...H, ie];
    fe(be), Xe(be.length - 1);
  }, [H, fe]), vt = u.useCallback((g) => {
    const w = H.filter((L, Q) => Q !== g);
    fe(w), Xe((L) => Math.max(0, L - 1));
  }, [H, fe]), Qt = u.useCallback(() => {
    fe([]), Xe(-1);
  }, [fe]), At = (g) => {
    const w = g.map((Q, X) => ({ p: Q, origIdx: X }));
    w.sort((Q, X) => (Q.p.zIndex ?? Q.origIdx) - (X.p.zIndex ?? X.origIdx));
    const L = [...g];
    return w.forEach(({ origIdx: Q }, X) => {
      L[Q] = { ...L[Q], zIndex: X + 1 };
    }), L;
  };
  u.useCallback((g = Ze) => {
    if (g < 0 || !H[g]) return;
    const w = At(H), L = w[g].zIndex, Q = w.length;
    if (L >= Q) return;
    const X = w.map((_, ie) => ie === g ? { ..._, zIndex: Q } : _.zIndex > L ? { ..._, zIndex: _.zIndex - 1 } : _);
    fe(X);
  }, [Ze, H, fe]), u.useCallback((g = Ze) => {
    if (g < 0 || !H[g]) return;
    const w = At(H), L = w[g].zIndex;
    if (L <= 1) return;
    const Q = w.map((X, _) => _ === g ? { ...X, zIndex: 1 } : X.zIndex < L ? { ...X, zIndex: X.zIndex + 1 } : X);
    fe(Q);
  }, [Ze, H, fe]);
  const on = u.useCallback((g = Ze) => {
    if (g < 0 || !H[g]) return;
    const w = At(H), L = w[g].zIndex, Q = L + 1;
    if (Q > w.length) return;
    const X = w.map((_, ie) => ie === g ? { ..._, zIndex: Q } : _.zIndex === Q ? { ..._, zIndex: L } : _);
    fe(X);
  }, [Ze, H, fe]), Zn = u.useCallback((g = Ze) => {
    if (g < 0 || !H[g]) return;
    const w = At(H), L = w[g].zIndex, Q = L - 1;
    if (Q < 1) return;
    const X = w.map((_, ie) => ie === g ? { ..._, zIndex: Q } : _.zIndex === Q ? { ..._, zIndex: L } : _);
    fe(X);
  }, [Ze, H, fe]), Cs = u.useCallback((g) => {
    if (Ze < 0 || !H[Ze]) return;
    const w = H.map((L, Q) => Q === Ze ? { ...L, ...g } : L);
    fe(w);
  }, [Ze, H, fe]), Va = u.useCallback((g = 90) => {
    const w = H[Ze];
    if (!w) return;
    const Q = ((w.rotation || 0) + g) % 360;
    Cs({ rotation: Q });
  }, [Ze, H, Cs]), mr = u.useCallback((g = Ze) => {
    if (g < 0 || !H[g]) return;
    const w = H.length, L = H.map((Q, X) => X === g ? {
      ...Q,
      x: 0,
      y: 0,
      width: $e,
      height: Ce,
      zIndex: w
    } : Q);
    fe(L);
  }, [Ze, H, fe, $e, Ce]), Fs = u.useCallback((g) => {
    let w = [];
    const L = sn.length > 0 ? sn : Xt.length > 0 ? Xt : H;
    switch (g) {
      case "auto":
      case "auto-grid":
        w = Hs(L, $e, Ce);
        break;
      case "1x1":
        L.length > 0 && (w = [{
          ...L[0],
          x: 0,
          y: 0,
          width: $e,
          height: Ce,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: xt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (L.length >= 2) {
          const Q = Math.round($e / 2);
          w = L.slice(0, 2).map((X, _) => {
            const ie = X.nativeAspectRatio || (X.sourceWidth && X.sourceHeight ? X.sourceWidth / X.sourceHeight : 1.7777777777777777), { x: be, y: pe, width: ke, height: it } = Xs(_ * Q, 0, Q, Ce, ie);
            return {
              ...X,
              x: be,
              y: pe,
              width: ke,
              height: it,
              sourceWidth: X.sourceWidth || 1920,
              sourceHeight: X.sourceHeight || 1080,
              nativeAspectRatio: ie,
              aspectRatio: ie,
              zIndex: _ + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: xt[_ % xt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          w = Hs(L, $e, Ce);
        break;
      case "2x2": {
        const Q = Math.round($e / 2), X = Math.round(Ce / 2);
        w = L.slice(0, 4).map((_, ie) => ({
          ..._,
          x: ie % 2 * Q,
          y: Math.floor(ie / 2) * X,
          width: Q,
          height: X,
          zIndex: ie,
          rotation: 0,
          borderWidth: 2,
          borderColor: xt[ie % xt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (L.length >= 2) {
          w = [
            { ...L[0], x: 0, y: 0, width: $e, height: Ce, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: xt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Q = L.slice(1, 4), X = Math.round($e * 0.23), _ = Math.round(X / (16 / 9));
          Q.forEach((ie, be) => {
            w.push({
              ...ie,
              x: $e - X - 24,
              y: 24 + be * (_ + 16),
              width: X,
              height: _,
              zIndex: 10 + be,
              rotation: 0,
              borderWidth: 3,
              borderColor: xt[(be + 1) % xt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (L.length >= 3) {
          const Q = Math.round($e * 0.666), X = $e - Q, _ = Math.round(Ce / 2);
          w = [
            { ...L[0], x: 0, y: 0, width: Q, height: Ce, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: xt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...L[1], x: Q, y: 0, width: X, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: xt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...L[2], x: Q, y: _, width: X, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: xt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (L.length >= 3)
          if ($e / Ce >= 2.5) {
            const X = Math.round($e / 3);
            w = L.slice(0, 3).map((_, ie) => {
              const be = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 1.7777777777777777), { x: pe, y: ke, width: it, height: rt } = Xs(ie * X, 0, X, Ce, be);
              return {
                ..._,
                x: pe,
                y: ke,
                width: it,
                height: rt,
                sourceWidth: _.sourceWidth || 1920,
                sourceHeight: _.sourceHeight || 1080,
                nativeAspectRatio: be,
                aspectRatio: be,
                zIndex: ie,
                rotation: 0,
                borderWidth: 2,
                borderColor: xt[ie % xt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const X = Math.round($e / 2), _ = Math.round(Ce / 2);
            w = [
              { ...L[0], x: 0, y: 0, width: X, height: _, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: xt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...L[1], x: X, y: 0, width: X, height: _, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: xt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...L[2], x: Math.round(X / 2), y: _, width: X, height: _, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: xt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    w.length > 0 && (fe(w), Xe(0), g === "auto" || g === "auto-grid" ? Mt("auto-grid") : (Mt(g), pt.current = !0));
  }, [Xt, H, fe, $e, Ce]), Cu = u.useCallback(() => {
    const g = z.trim() || `Custom Layout ${Me.length + 1}`, L = [{
      id: `preset-${Date.now()}`,
      name: g,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(H)),
      keyframes: JSON.parse(JSON.stringify(O))
    }, ...Me];
    nt(L), he(""), ht(!1);
  }, [z, Me, H, O]), $p = u.useCallback((g) => {
    !g || !g.placements || (fe(g.placements), Xe(0), Mt("custom"), pt.current = !0, G(!1));
  }, [fe]), Rp = u.useCallback((g, w) => {
    w == null || w.stopPropagation();
    const L = Me.filter((Q) => Q.id !== g);
    nt(L);
  }, [Me]), Lp = u.useCallback(() => {
    const g = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: $e,
      height: Ce,
      aspectRatio: kt,
      placements: H,
      timeline: pn
    }, w = JSON.stringify(g, null, 2), L = new window.Blob([w], { type: "application/json" }), Q = window.URL.createObjectURL(L), X = document.createElement("a"), _ = /* @__PURE__ */ new Date(), ie = (pe) => String(pe).padStart(2, "0"), be = `${_.getFullYear()}${ie(_.getMonth() + 1)}${ie(_.getDate())}_${ie(_.getHours())}${ie(_.getMinutes())}${ie(_.getSeconds())}`;
    X.href = Q, X.download = `canvas_layout_${be}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), window.URL.revokeObjectURL(Q);
  }, [H, pn, $e, Ce, kt]), Op = u.useCallback((g) => {
    var Q;
    const w = (Q = g.target.files) == null ? void 0 : Q[0];
    if (!w) return;
    const L = new window.FileReader();
    L.onload = (X) => {
      var _, ie, be;
      try {
        const pe = JSON.parse(X.target.result);
        if (pe.width && pe.height) {
          const it = qn.find((rt) => rt.w === pe.width && rt.h === pe.height);
          it && Mn(it.id);
        } else if (pe.aspectRatio) {
          const it = qn.find((rt) => rt.id === pe.aspectRatio);
          it && Mn(it.id);
        }
        let ke = null;
        Array.isArray(pe) ? ke = pe : pe.placements && Array.isArray(pe.placements) ? ke = pe.placements : (_ = pe.layout) != null && _.placements && Array.isArray(pe.layout.placements) && (ke = pe.layout.placements), ke && ke.length > 0 && (fe(ke), Xe(0), Mt("custom"), pt.current = !0), ((be = (ie = pe.timeline) == null ? void 0 : ie.keyframes) == null ? void 0 : be.length) > 0 && (un(pe.timeline), C && C(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, L.readAsText(w), g.target.value = "";
  }, [fe, C]), Ya = (g, w) => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault(), Xe(w), pt.current = !0, Mt("custom");
    const L = Ge(), Q = Ct.current || Je.current;
    if (!Q) return;
    const X = Q.getBoundingClientRect(), _ = H[w];
    if (!_) return;
    fn.current = ve("Move Feed"), dt.current = {
      mode: "drag",
      index: w,
      startX: g.clientX,
      startY: g.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      scaleX: $e / X.width,
      scaleY: Ce / X.height,
      activeSnapZone: null
    }, Ae(!0);
    const ie = (pe) => {
      if (!dt.current || dt.current.mode !== "drag") return;
      const ke = dt.current, it = Ct.current || Je.current;
      if (!it) return;
      const rt = it.getBoundingClientRect(), lt = (pe.clientX - ke.startX) * ke.scaleX, ge = (pe.clientY - ke.startY) * ke.scaleY;
      let ot = Math.round(ke.initialX + lt), $t = Math.round(ke.initialY + ge);
      ot = Jt(ot, 0, $e - ke.initialW), $t = Jt($t, 0, Ce - ke.initialH);
      const mt = Ee && !pe.altKey;
      let gt = null, In = null, Hn = null;
      if (mt) {
        const _t = pe.clientX - rt.left, It = pe.clientY - rt.top, Rt = 32, De = Math.round($e / 2), ut = Math.round(Ce / 2);
        if (_t <= Rt ? It <= rt.height * 0.22 ? gt = { x: 0, y: 0, width: De, height: ut, label: "◰ Top-Left Quarter" } : It >= rt.height * 0.78 ? gt = { x: 0, y: ut, width: De, height: ut, label: "◱ Bottom-Left Quarter" } : gt = { x: 0, y: 0, width: De, height: Ce, label: "◧ Left Half (50%)" } : _t >= rt.width - Rt ? It <= rt.height * 0.22 ? gt = { x: De, y: 0, width: De, height: ut, label: "◲ Top-Right Quarter" } : It >= rt.height * 0.78 ? gt = { x: De, y: ut, width: De, height: ut, label: "◳ Bottom-Right Quarter" } : gt = { x: De, y: 0, width: De, height: Ce, label: "◨ Right Half (50%)" } : It <= Rt && _t >= rt.width * 0.25 && _t <= rt.width * 0.75 && (gt = { x: 0, y: 0, width: $e, height: Ce, label: "🗖 Full Canvas Maximize" }), !gt) {
          const gr = H.filter((tt, xr) => xr !== ke.index), Ws = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: $e, targetX: $e - ke.initialW, guide: 100 },
            { snapTo: De, targetX: De - Math.round(ke.initialW / 2), guide: 50 }
          ];
          gr.forEach((tt) => {
            Ws.push({ snapTo: tt.x, targetX: tt.x, guide: tt.x / $e * 100 }), Ws.push({ snapTo: tt.x + tt.width, targetX: tt.x + tt.width - ke.initialW, guide: (tt.x + tt.width) / $e * 100 }), Ws.push({ snapTo: tt.x + tt.width, targetX: tt.x + tt.width, guide: (tt.x + tt.width) / $e * 100 }), Ws.push({ snapTo: tt.x, targetX: tt.x - ke.initialW, guide: tt.x / $e * 100 });
          });
          let Tu = 18;
          Ws.forEach((tt) => {
            const xr = Math.abs(ot - tt.targetX);
            xr < Tu && (Tu = xr, ot = tt.targetX, In = tt.guide);
          });
          const wl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Ce, targetY: Ce - ke.initialH, guide: 100 },
            { snapTo: ut, targetY: ut - Math.round(ke.initialH / 2), guide: 50 }
          ];
          gr.forEach((tt) => {
            wl.push({ snapTo: tt.y, targetY: tt.y, guide: tt.y / Ce * 100 }), wl.push({ snapTo: tt.y + tt.height, targetY: tt.y + tt.height - ke.initialH, guide: (tt.y + tt.height) / Ce * 100 }), wl.push({ snapTo: tt.y + tt.height, targetY: tt.y + tt.height, guide: (tt.y + tt.height) / Ce * 100 }), wl.push({ snapTo: tt.y, targetY: tt.y - ke.initialH, guide: tt.y / Ce * 100 });
          });
          let Au = 18;
          wl.forEach((tt) => {
            const xr = Math.abs($t - tt.targetY);
            xr < Au && (Au = xr, $t = tt.targetY, Hn = tt.guide);
          });
        }
      }
      ke.activeSnapZone = gt, ke.latestX = ot, ke.latestY = $t, et(gt), te({ vertical: In, horizontal: Hn }), un((_t) => {
        const It = [..._t.keyframes || []], Rt = L < It.length ? L : ce;
        if (!It[Rt]) return _t;
        const De = [...It[Rt].layout.placements || []];
        return De[ke.index] ? (De[ke.index] = { ...De[ke.index], x: ot, y: $t }, It[Rt] = {
          ...It[Rt],
          layout: { ...It[Rt].layout, placements: De }
        }, { ..._t, keyframes: It }) : _t;
      });
    }, be = () => {
      var pe;
      if (Ae(!1), te({ vertical: null, horizontal: null }), (pe = dt.current) != null && pe.activeSnapZone) {
        const ke = dt.current.activeSnapZone, it = dt.current.index;
        un((rt) => {
          const lt = [...rt.keyframes || []], ge = L < lt.length ? L : ce;
          if (!lt[ge]) return rt;
          const ot = [...lt[ge].layout.placements || []];
          return ot[it] ? (ot[it] = {
            ...ot[it],
            x: ke.x,
            y: ke.y,
            width: ke.width,
            height: ke.height
          }, lt[ge] = {
            ...lt[ge],
            layout: { ...lt[ge].layout, placements: ot }
          }, { ...rt, keyframes: lt }) : rt;
        });
      }
      if (dt.current) {
        const ke = dt.current, it = ke.initialX, rt = ke.initialY, lt = ke.activeSnapZone ? ke.activeSnapZone.x : ke.latestX ?? it, ge = ke.activeSnapZone ? ke.activeSnapZone.y : ke.latestY ?? rt;
        lt !== it || ge !== rt ? (Re(), C && un((ot) => (C(ot), ot))) : fn.current = null;
      }
      et(null), dt.current = null, window.removeEventListener("mousemove", ie), window.removeEventListener("mouseup", be);
    };
    window.addEventListener("mousemove", ie), window.addEventListener("mouseup", be);
  }, No = (g, w, L = "br") => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault(), Xe(w), pt.current = !0, Mt("custom");
    const Q = Ge();
    if (!Je.current) return;
    const X = Je.current.getBoundingClientRect(), _ = H[w];
    if (!_) return;
    fn.current = ve("Resize Feed");
    const ie = Xt.find((lt) => lt.stationId === _.stationId && lt.displayId === _.displayId), be = _.sourceWidth || (ie == null ? void 0 : ie.sourceWidth) || 1920, pe = _.sourceHeight || (ie == null ? void 0 : ie.sourceHeight) || 1080, ke = _.nativeAspectRatio || _.aspectRatio || (ie == null ? void 0 : ie.nativeAspectRatio) || be / pe || _.width / _.height || 16 / 9;
    dt.current = {
      mode: "resize",
      corner: L,
      index: w,
      startX: g.clientX,
      startY: g.clientY,
      initialX: _.x,
      initialY: _.y,
      initialW: _.width,
      initialH: _.height,
      sourceWidth: be,
      sourceHeight: pe,
      nativeAspectRatio: ke,
      scaleX: $e / X.width,
      scaleY: Ce / X.height
    }, ft(!0);
    const it = (lt) => {
      if (!dt.current || dt.current.mode !== "resize") return;
      const ge = dt.current, ot = (lt.clientX - ge.startX) * ge.scaleX, $t = (lt.clientY - ge.startY) * ge.scaleY, mt = lt.ctrlKey || lt.shiftKey || lt.metaKey, gt = ge.nativeAspectRatio > 0 ? ge.nativeAspectRatio : ge.initialW / ge.initialH;
      let In = ge.initialX, Hn = ge.initialY, _t = ge.initialW, It = ge.initialH;
      if (ge.corner === "br") {
        const Rt = $e - ge.initialX, De = Ce - ge.initialY;
        if (mt) {
          let ut = Math.max(160, Math.min(Rt, Math.round(ge.initialW + ot))), at = Math.round(ut / gt);
          at > De && (at = De, ut = Math.round(at * gt)), at < 90 && (at = 90, ut = Math.round(at * gt)), _t = ut, It = at;
        } else
          _t = Jt(Math.round(ge.initialW + ot), 160, Rt), It = Jt(Math.round(ge.initialH + $t), 90, De);
      } else if (ge.corner === "bl") {
        const Rt = ge.initialX + ge.initialW, De = Ce - ge.initialY;
        if (mt) {
          let ut = Math.max(160, Math.min(Rt, Math.round(ge.initialW - ot))), at = Math.round(ut / gt);
          at > De && (at = De, ut = Math.round(at * gt)), at < 90 && (at = 90, ut = Math.round(at * gt)), _t = ut, It = at, In = ge.initialX + ge.initialW - _t;
        } else
          _t = Jt(Math.round(ge.initialW - ot), 160, Rt), It = Jt(Math.round(ge.initialH + $t), 90, De), In = ge.initialX + ge.initialW - _t;
      } else if (ge.corner === "tr") {
        const Rt = $e - ge.initialX, De = ge.initialY + ge.initialH;
        if (mt) {
          let ut = Math.max(160, Math.min(Rt, Math.round(ge.initialW + ot))), at = Math.round(ut / gt);
          at > De && (at = De, ut = Math.round(at * gt)), at < 90 && (at = 90, ut = Math.round(at * gt)), _t = ut, It = at, Hn = ge.initialY + ge.initialH - It;
        } else
          _t = Jt(Math.round(ge.initialW + ot), 160, Rt), It = Jt(Math.round(ge.initialH - $t), 90, De), Hn = ge.initialY + ge.initialH - It;
      } else if (ge.corner === "tl") {
        const Rt = ge.initialX + ge.initialW, De = ge.initialY + ge.initialH;
        if (mt) {
          let ut = Math.max(160, Math.min(Rt, Math.round(ge.initialW - ot))), at = Math.round(ut / gt);
          at > De && (at = De, ut = Math.round(at * gt)), at < 90 && (at = 90, ut = Math.round(at * gt)), _t = ut, It = at, In = ge.initialX + ge.initialW - _t, Hn = ge.initialY + ge.initialH - It;
        } else
          _t = Jt(Math.round(ge.initialW - ot), 160, Rt), It = Jt(Math.round(ge.initialH - $t), 90, De), In = ge.initialX + ge.initialW - _t, Hn = ge.initialY + ge.initialH - It;
      }
      un((Rt) => {
        const De = [...Rt.keyframes || []], ut = Q < De.length ? Q : ce;
        if (!De[ut]) return Rt;
        const at = [...De[ut].layout.placements || []];
        return at[ge.index] ? (at[ge.index] = {
          ...at[ge.index],
          x: In,
          y: Hn,
          width: _t,
          height: It,
          sourceWidth: ge.sourceWidth,
          sourceHeight: ge.sourceHeight,
          nativeAspectRatio: ge.nativeAspectRatio,
          aspectRatio: ge.nativeAspectRatio
        }, De[ut] = {
          ...De[ut],
          layout: { ...De[ut].layout, placements: at }
        }, { ...Rt, keyframes: De }) : Rt;
      });
    }, rt = () => {
      if (dt.current) {
        const lt = dt.current, ge = lt.latestW ?? lt.initialW, ot = lt.latestH ?? lt.initialH;
        ge !== lt.initialW || ot !== lt.initialH ? (Re(), C && un(($t) => (C($t), $t))) : fn.current = null;
      }
      ft(!1), dt.current = null, window.removeEventListener("mousemove", it), window.removeEventListener("mouseup", rt);
    };
    window.addEventListener("mousemove", it), window.addEventListener("mouseup", rt);
  }, Dp = u.useCallback((g) => {
    const w = H[g];
    if (!w) return;
    const L = Xt.find((be) => be.stationId === w.stationId && be.displayId === w.displayId), Q = w.nativeAspectRatio || w.aspectRatio || (L == null ? void 0 : L.nativeAspectRatio) || (w.sourceWidth && w.sourceHeight ? w.sourceWidth / w.sourceHeight : 16 / 9);
    let X = w.width, _ = Math.round(X / Q);
    w.y + _ > Ce && (_ = Ce - w.y, X = Math.round(_ * Q)), w.x + X > $e && (X = $e - w.x, _ = Math.round(X / Q));
    const ie = H.map((be, pe) => pe === g ? {
      ...be,
      width: Math.max(160, X),
      height: Math.max(90, _),
      sourceWidth: w.sourceWidth || (L == null ? void 0 : L.sourceWidth) || 1920,
      sourceHeight: w.sourceHeight || (L == null ? void 0 : L.sourceHeight) || 1080,
      nativeAspectRatio: Q,
      aspectRatio: Q
    } : be);
    fe(ie, "Snap Native Aspect");
  }, [H, Xt, fe]), Ga = u.useCallback(() => {
    if (Dt.current.length === 0) return;
    const g = ve("Redo State");
    wn.current.push(g), wn.current.length > 50 && wn.current.shift();
    const w = Dt.current.pop();
    w && (un(w.timeline), C && C(w.timeline), w.aspectId && w.aspectId !== kt && Mn(w.aspectId), w.presetId && Mt(w.presetId), w.selectedFeedIndex !== void 0 && Xe(w.selectedFeedIndex), pt.current = !0, Wt((L) => L + 1), ln(`Undo: ${w.label || "Previous State"}`, "undo", "↺"));
  }, [ve, C, kt, ln]), Xa = u.useCallback(() => {
    if (wn.current.length === 0) return;
    const g = ve("Undo State");
    Dt.current.push(g), Dt.current.length > 50 && Dt.current.shift();
    const w = wn.current.pop();
    w && (un(w.timeline), C && C(w.timeline), w.aspectId && w.aspectId !== kt && Mn(w.aspectId), w.presetId && Mt(w.presetId), w.selectedFeedIndex !== void 0 && Xe(w.selectedFeedIndex), pt.current = !0, Wt((L) => L + 1), ln(`Redo: ${w.label || "Restored State"}`, "info", "↻"));
  }, [ve, C, kt, ln]), Su = u.useCallback(() => {
    const w = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(H)),
      keyframes: JSON.parse(JSON.stringify(O)),
      aspectId: kt,
      width: $e,
      height: Ce
    }, ...Me.filter((L) => L.id !== "preset-quicksave")];
    nt(w);
    try {
      vp({
        canvasLayoutTimeline: pn,
        selectedAspectId: kt,
        selectedPresetId: Ut,
        isFullWidth: Pt
      });
    } catch (L) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", L);
    }
    ln(`State Saved (${$e}×${Ce} • ${H.length} Feeds)`, "success", "💾");
  }, [H, O, kt, $e, Ce, Me, nt, pn, Ut, Pt, ln]);
  u.useEffect(() => {
    const g = () => Ga(), w = () => Xa(), L = () => Su();
    return window.addEventListener("itb:studio-undo", g), window.addEventListener("itb:studio-redo", w), window.addEventListener("itb:studio-save-now", L), () => {
      window.removeEventListener("itb:studio-undo", g), window.removeEventListener("itb:studio-redo", w), window.removeEventListener("itb:studio-save-now", L);
    };
  }, [Ga, Xa, Su]);
  const Pp = u.useCallback(() => {
    Tt((g) => {
      const w = !g;
      if (w) {
        r && r(null);
        const L = Ft.current;
        L && L.requestFullscreen && L.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return w;
    });
  }, [r]), _p = u.useCallback(() => {
    const g = f > 0 ? f : d + v, { nextTimeline: w, newIndex: L, isNew: Q } = Kd(
      pn,
      g,
      (xe == null ? void 0 : xe.layout) || {
        width: $e,
        height: Ce,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(H))
      }
    );
    Q ? (je("Add Keyframe"), un(w), C && C(w), F && F(L), ln(`Keyframe #${L + 1} created at ${wt(g, m, { includeSeconds: !0 })}`, "success", "💎")) : (F && F(L), ln(`Jumped to existing Keyframe #${L + 1}`, "info", "💎"));
  }, [f, d, v, xe, H, $e, Ce, pn, C, F, m, ln, je]);
  u.useCallback(() => {
    if (O.length <= 1 || ce === 0) {
      ln("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    je("Delete Keyframe");
    const { nextTimeline: g, success: w, newIndex: L } = Pg(pn, ce);
    w && (un(g), C && C(g), F && F(L), ln("Keyframe deleted", "info", "🗑️"));
  }, [O, ce, pn, C, F, ln, je]), u.useCallback((g) => {
    ce !== 0 && (je("Update Transition Type"), un((w) => {
      const L = Sc(w, ce, { transitionType: g });
      return C && C(L), L;
    }));
  }, [ce, C, je]), u.useCallback((g) => {
    ce !== 0 && (je("Update Transition Duration"), un((w) => {
      const L = Sc(w, ce, { transitionDurationSec: g });
      return C && C(L), L;
    }));
  }, [ce, C, je]), u.useEffect(() => {
    const g = (w) => {
      if (!(w.target.tagName === "INPUT" || w.target.tagName === "TEXTAREA" || w.target.isContentEditable)) {
        if (w.key === "Delete" || w.key === "Backspace") {
          Ze >= 0 && H[Ze] && (w.preventDefault(), vt(Ze));
          return;
        }
        if ((w.code === "Space" || w.key === " ") && E) {
          w.preventDefault(), E((L) => !L);
          return;
        }
        if ((w.key === "k" || w.key === "K") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), _p();
          return;
        }
        if (w.key === "Escape") {
          Pe(!1), G(!1), cn(!1), Ot(!1), bn(!1), ht(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(w.key)) {
          if (Ze >= 0 && H[Ze]) {
            w.preventDefault(), pt.current = !0, Mt("custom");
            const L = w.shiftKey ? 1 : 10;
            let Q = 0, X = 0;
            w.key === "ArrowLeft" && (Q = -L), w.key === "ArrowRight" && (Q = L), w.key === "ArrowUp" && (X = -L), w.key === "ArrowDown" && (X = L);
            const _ = H[Ze], ie = Jt(_.x + Q, 0, $e - _.width), be = Jt(_.y + X, 0, Ce - _.height), pe = H.map((ke, it) => it === Ze ? { ...ke, x: ie, y: be } : ke);
            fe(pe);
          }
          return;
        }
        if ((w.key === "r" || w.key === "R") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Z((L) => !L);
          return;
        }
        if ((w.key === "s" || w.key === "S") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Oe((L) => !L);
          return;
        }
      }
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [Ze, H, vt, fe, Z, Oe]);
  const bu = u.useMemo(() => Og({
    keyframes: O,
    currentEpochMs: B,
    currentPlacements: H,
    isEditing: Te || Ve
  }), [Te, Ve, O, B, H]), Fp = u.useMemo(() => bu.map((g, w) => ({ ...g, originalIndex: w })).sort((g, w) => (g.zIndex ?? g.originalIndex) - (w.zIndex ?? w.originalIndex)), [bu]), Bs = H[Ze] || null, { filteredPlaced: Us, filteredUnplaced: ko } = u.useMemo(() => {
    const g = (de || "").toLowerCase(), w = H.map((_, ie) => {
      const be = _.zIndex ?? ie + 1, pe = Xt.find((ke) => ke.stationId === _.stationId && ke.displayId === _.displayId);
      return {
        type: "placed",
        origIdx: ie,
        placement: _,
        feed: pe,
        stationId: _.stationId,
        displayId: _.displayId,
        label: _.label || (pe == null ? void 0 : pe.label) || `${_.stationId} (${_.displayId})`,
        layerRank: be,
        isSelected: ie === Ze,
        sourceWidth: _.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: _.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    w.sort((_, ie) => ie.layerRank - _.layerRank);
    const L = Xt.filter((_) => !H.some((ie) => ie.stationId === _.stationId && ie.displayId === _.displayId)).map((_) => ({
      type: "unplaced",
      feed: _,
      stationId: _.stationId,
      displayId: _.displayId,
      label: _.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: _.sourceWidth || 1920,
      sourceHeight: _.sourceHeight || 1080
    })), Q = g ? w.filter((_) => _.label.toLowerCase().includes(g)) : w, X = g ? L.filter((_) => _.label.toLowerCase().includes(g)) : L;
    return { filteredPlaced: Q, filteredUnplaced: X };
  }, [H, Xt, Ze, de]), Mu = u.useCallback((g, w) => {
    g.stopPropagation(), ze(w), g.dataTransfer.effectAllowed = "copyMove", g.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: w.origIdx,
      type: w.type,
      stationId: w.stationId,
      displayId: w.displayId
    }));
  }, []), Bp = u.useCallback((g, w) => {
    g.preventDefault(), g.stopPropagation(), g.dataTransfer.dropEffect = "move";
    const L = g.currentTarget.getBoundingClientRect(), Q = L.top + L.height / 2, X = g.clientY < Q ? "above" : "below";
    Se((_) => _.index === w && _.position === X ? _ : { index: w, position: X });
  }, []), Up = u.useCallback((g, w) => {
    g.stopPropagation(), Se((L) => L.index === w ? { index: null, position: null } : L);
  }, []), Iu = u.useCallback(() => {
    ze(null), Se({ index: null, position: null });
  }, []), Wp = u.useCallback((g, w) => {
    g.preventDefault(), g.stopPropagation();
    const L = Le;
    Se({ index: null, position: null }), ze(null);
    const Q = g.dataTransfer.getData("text/plain");
    if (Q)
      try {
        const X = JSON.parse(Q);
        if (X.type === "placed") {
          const _ = X.origIdx, ie = Us.findIndex((lt) => lt.origIdx === _);
          if (ie === -1) return;
          let be = w;
          if (L.position === "below" && (be += 1), ie < be && (be -= 1), ie === be) return;
          const pe = [...Us], [ke] = pe.splice(ie, 1);
          pe.splice(be, 0, ke);
          const it = pe.length, rt = H.map((lt, ge) => {
            const ot = pe.findIndex(($t) => $t.origIdx === ge);
            return ot !== -1 ? {
              ...lt,
              zIndex: it - ot
            } : lt;
          });
          fe(rt), Xe(ke.origIdx);
        } else if (X.type === "unplaced") {
          const _ = Xt.find((gt) => gt.stationId === X.stationId && gt.displayId === X.displayId);
          if (!_) return;
          const ie = _.nativeAspectRatio || (_.sourceWidth && _.sourceHeight ? _.sourceWidth / _.sourceHeight : 16 / 9), be = ie >= 1 ? 640 : Math.round(360 * ie), pe = ie >= 1 ? Math.round(640 / ie) : 360, ke = xt[H.length % xt.length];
          let it = w;
          L.position === "below" && (it += 1);
          const rt = {
            stationId: _.stationId,
            displayId: _.displayId,
            label: _.label,
            x: 100 + H.length * 40 % 800,
            y: 80 + H.length * 40 % 500,
            width: be,
            height: pe,
            sourceWidth: _.sourceWidth || 1920,
            sourceHeight: _.sourceHeight || 1080,
            nativeAspectRatio: ie,
            aspectRatio: ie,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ke,
            shadowEffect: "deep",
            borderRadius: 0
          }, lt = [...H, rt], ge = lt.length - 1, ot = [...Us];
          ot.splice(it, 0, { origIdx: ge });
          const $t = ot.length, mt = lt.map((gt, In) => {
            const Hn = ot.findIndex((_t) => _t.origIdx === In);
            return {
              ...gt,
              zIndex: Hn !== -1 ? $t - Hn : 1
            };
          });
          fe(mt), Xe(ge);
        }
      } catch (X) {
        console.warn("Failed to handle layer drag drop:", X);
      }
  }, [Le, Us, H, Xt, fe]), zp = u.useCallback((g) => {
    g.preventDefault();
    const w = g.dataTransfer.getData("text/plain");
    if (!(!w || !Je.current))
      try {
        const L = JSON.parse(w), Q = Je.current.getBoundingClientRect(), X = g.clientX - Q.left, _ = g.clientY - Q.top, ie = Jt(Math.round(X / Q.width * $e), 0, $e - 320), be = Jt(Math.round(_ / Q.height * Ce), 0, Ce - 180);
        if (L.type === "unplaced") {
          const pe = Xt.find((ke) => ke.stationId === L.stationId && ke.displayId === L.displayId);
          if (pe) {
            const ke = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), it = ke >= 1 ? 640 : Math.round(360 * ke), rt = ke >= 1 ? Math.round(640 / ke) : 360, lt = H.length > 0 ? Math.max(...H.map((mt) => mt.zIndex || 0)) + 1 : 1, ge = xt[H.length % xt.length], ot = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: Jt(ie, 0, $e - it),
              y: Jt(be, 0, Ce - rt),
              width: it,
              height: rt,
              sourceWidth: pe.sourceWidth || 1920,
              sourceHeight: pe.sourceHeight || 1080,
              nativeAspectRatio: ke,
              aspectRatio: ke,
              zIndex: lt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ge,
              shadowEffect: "deep",
              borderRadius: 0
            }, $t = [...H, ot];
            fe($t), Xe($t.length - 1);
          }
        } else if (L.type === "placed" && L.origIdx !== void 0) {
          const pe = H.map((ke, it) => it === L.origIdx ? {
            ...ke,
            x: Jt(ie, 0, $e - ke.width),
            y: Jt(be, 0, Ce - ke.height)
          } : ke);
          fe(pe), Xe(L.origIdx);
        }
      } catch (L) {
        console.warn("Canvas drop failed:", L);
      }
  }, [Xt, H, fe, $e, Ce]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Ft,
      className: `multicam-viewport-root canvas-grid ${Be ? "fullscreen-grid-active" : ""}`,
      children: [
        (Te || Ve) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: Te ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        js && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${js.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: js.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: js.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Kt, className: `canvas-stage-wrapper ${Pt ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          We && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  H.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Pe(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: de,
                onChange: (g) => Ie(g.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Us.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Us.length })
                ] }),
                Us.map((g, w) => {
                  const L = we && we.type === "placed" && we.origIdx === g.origIdx, X = Le.index === w ? Le.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${g.isSelected ? "is-selected" : ""} ${L ? "is-dragging-row" : ""} ${X}`,
                      draggable: !0,
                      onDragStart: (_) => Mu(_, g),
                      onDragOver: (_) => Bp(_, w),
                      onDragLeave: (_) => Up(_, w),
                      onDrop: (_) => Wp(_, w),
                      onDragEnd: Iu,
                      onClick: () => Xe(g.origIdx),
                      title: `Drag to reorder layer (${g.label})`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                        /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${g.layerRank}`, children: [
                          "#",
                          g.layerRank
                        ] }),
                        /* @__PURE__ */ s.jsx("span", { className: `status-dot ${g.isSelected ? "active" : ""}` }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: g.label, children: g.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          g.sourceWidth,
                          "×",
                          g.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (_) => _.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => on(g.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Zn(g.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => vt(g.origIdx),
                              title: "Remove from canvas",
                              children: "✕"
                            }
                          )
                        ] })
                      ]
                    },
                    `feed-layer-${g.stationId}-${g.displayId}-${g.origIdx}`
                  );
                })
              ] }),
              ko.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: ko.length })
                ] }),
                ko.map((g) => {
                  const w = we && we.type === "unplaced" && we.stationId === g.stationId && we.displayId === g.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${w ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (L) => Mu(L, g),
                      onDragEnd: Iu,
                      onClick: () => qe(g.feed),
                      title: `Drag onto canvas or layers, or click to add ${g.label}`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                        /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                        /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                        /* @__PURE__ */ s.jsx("span", { className: "row-label", title: g.label, children: g.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                          g.sourceWidth,
                          "×",
                          g.sourceHeight
                        ] }),
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => qe(g.feed),
                            title: "Add to canvas",
                            children: "＋ ADD"
                          }
                        ) })
                      ]
                    },
                    `unplaced-feed-${g.stationId}-${g.displayId}`
                  );
                })
              ] }),
              Us.length === 0 && ko.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Fs("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: Qt, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${We ? "active" : ""}`,
                  onClick: () => Pe((g) => !g),
                  title: `Feeds & Layers Palette (${H.length}/${Xt.length} on canvas)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: H.length }),
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
                    className: `btn-wing-tool ${ae ? "active" : ""}`,
                    onClick: () => {
                      re((g) => !g), W(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                ae && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        Mt("auto-grid"), Fs("auto-grid"), re(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const g = new Set((t && t.length > 0 ? t : n).map((Q) => Q.id)), w = (H || []).filter((Q) => g.has(Q.stationId)), L = (t && t.length > 0 ? t : n).filter((Q) => !w.some((X) => X.stationId === Q.id));
                          return w.length > 0 ? w.length + L.length : sn.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        Mt("1x1"), Fs("1x1"), re(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        Mt("1x2"), Fs("1x2"), re(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        Mt("2x2"), Fs("2x2"), re(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        Mt("1+3-pip"), Fs("1+3-pip"), re(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ut === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        Mt("hero-stacked"), Fs("hero-stacked"), re(!1);
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
                    className: `btn-wing-tool ${q ? "active" : ""}`,
                    onClick: () => {
                      W((g) => !g), re(!1);
                    },
                    title: `Aspect Ratio: ${kt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: kt })
                    ]
                  }
                ),
                q && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  qn.map((g) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${kt === g.id ? "active" : ""}`,
                      onClick: () => {
                        st(g.id), W(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: g.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                          g.w,
                          "×",
                          g.h
                        ] })
                      ]
                    },
                    g.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Pt ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: Or,
                  title: Pt ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Pt ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Pt ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Ee ? "active" : ""}`,
                  onClick: () => Oe((g) => !g),
                  title: Ee ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                  className: `btn-wing-tool ${me ? "active" : ""}`,
                  onClick: () => Z((g) => !g),
                  title: me ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: Ga,
                  disabled: Dt.current.length === 0,
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
                  onClick: Xa,
                  disabled: wn.current.length === 0,
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
                ref: (g) => {
                  Je.current = g, Ct.current = g;
                },
                className: `canvas-master-frame-16-9 ${Pt ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: Bt.width > 180 ? `${Bt.width}px` : "100%",
                  height: Bt.height > 100 ? `${Bt.height}px` : "auto",
                  aspectRatio: `${$e} / ${Ce}`
                },
                onMouseMove: vo,
                onMouseLeave: Ka,
                onDragOver: (g) => {
                  g.preventDefault(), g.dataTransfer.dropEffect = "copy";
                },
                onDrop: zp,
                onClick: () => xn(!1),
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  Qe && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${Qe.x / $e * 100}%`,
                        top: `${Qe.y / Ce * 100}%`,
                        width: `${Qe.width / $e * 100}%`,
                        height: `${Qe.height / Ce * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Qe.label })
                      ] })
                    }
                  ),
                  me && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${$e}×${Ce}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ye.isInside ? `${Ye.x},${Ye.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${$e} 20`,
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
                          yo.map((g) => g.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "0", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: g.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: g.val })
                          ] }, `rx-${g.val}`) : g.isMed ? /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "8", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${g.val}`) : /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "13", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${g.val}`)),
                          Ye.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: Ye.x,
                              y1: "0",
                              x2: Ye.x,
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
                        viewBox: `0 0 20 ${Ce}`,
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
                          Ha.map((g) => g.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: g.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: g.val })
                          ] }, `ry-${g.val}`) : g.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${g.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${g.val}`)),
                          Ye.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: Ye.y,
                              x2: "20",
                              y2: Ye.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  bt.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${bt.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  bt.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${bt.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  H.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Pe(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Fs("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Fp.map((g) => {
                    var Rt;
                    const w = g.originalIndex, L = Ze === w, Q = Te && Ze === w, X = Ve && Ze === w, _ = (n.length > 0 ? n : t).find(
                      (De) => {
                        var ut, at, gr, Ws;
                        return De.id === g.stationId || ((ut = De.hostname) == null ? void 0 : ut.toLowerCase()) === ((at = g.stationId) == null ? void 0 : at.toLowerCase()) || ((gr = De.id) == null ? void 0 : gr.toLowerCase()) === ((Ws = g.stationId) == null ? void 0 : Ws.toLowerCase());
                      }
                    ), ie = Xt.find((De) => De.stationId === g.stationId && De.displayId === g.displayId), be = _ || {
                      id: g.stationId,
                      hostname: (ie == null ? void 0 : ie.stationHostname) || g.stationHostname || g.stationId,
                      displayName: (ie == null ? void 0 : ie.stationName) || g.label || g.stationId,
                      displays: ie ? [{ displayId: ie.displayId, width: ie.sourceWidth, height: ie.sourceHeight }] : []
                    }, pe = (be == null ? void 0 : be.displays) || ((Rt = be == null ? void 0 : be.topology) == null ? void 0 : Rt.displays) || [], ke = H.filter(
                      (De) => De.stationId === g.stationId || be && (De.stationId === be.id || De.stationId === be.hostname)
                    ), it = pe.length > 1 && ke.length >= pe.length, rt = g.borderColor || xt[w % xt.length], lt = g.borderWidth !== void 0 ? g.borderWidth : 2, ge = g.rotation || 0, ot = g.shadowEffect || "deep", $t = g.borderRadius || 0, mt = g.x / $e * 100, gt = g.y / Ce * 100, In = g.width / $e * 100, Hn = g.height / Ce * 100, _t = Bg(ot, L, rt);
                    g.y < 50, g.x < 100, g.x + g.width > $e - 100;
                    const It = g.zIndex !== void 0 ? g.zIndex : w + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${L ? "is-selected" : ""} ${Q ? "is-dragging" : ""} ${X ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${mt}%`,
                          top: `${gt}%`,
                          width: `${In}%`,
                          height: `${Hn}%`,
                          zIndex: It * 10 + (Q ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${lt}px solid ${rt}`,
                          borderRadius: `${$t}px`,
                          boxShadow: _t,
                          opacity: g.opacity !== void 0 ? g.opacity : 1,
                          pointerEvents: g.opacity !== void 0 && g.opacity < 0.1 ? "none" : "auto",
                          cursor: Q ? "grabbing" : "grab",
                          transition: Q || X ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (De) => Ya(De, w),
                        onContextMenu: (De) => {
                          De.preventDefault(), De.stopPropagation(), Xe(w), xn(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (De) => Ya(De, w),
                              onDoubleClick: () => mr(w),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: g.label || `${be.displayName || g.stationId} (${g.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(g.width),
                                  "×",
                                  Math.round(g.height),
                                  " (",
                                  Fr(g.width, g.height),
                                  ") @ (",
                                  Math.round(g.x),
                                  ",",
                                  Math.round(g.y),
                                  ")",
                                  ge !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    ge,
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
                                    className: `btn-badge-action-inspector ${L && jt ? "active" : ""}`,
                                    onClick: (De) => {
                                      De.stopPropagation(), Xe(w), xn((ut) => !ut || Ze !== w);
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
                                  transform: ge ? `rotate(${ge}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: Q ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Tg,
                                  {
                                    station: be,
                                    isSolo: !1,
                                    currentEpochMs: B,
                                    timeMode: m,
                                    isPlaying: y,
                                    setIsPlaying: E,
                                    baseEpochMs: d,
                                    totalDurationMs: M,
                                    outPointMs: k,
                                    setPlayheadMs: p,
                                    globalGaps: h,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: b,
                                    playbackSpeed: S,
                                    activeAudioStationId: J,
                                    onSoloAudio: le,
                                    directorPlan: x || (be == null ? void 0 : be.directorPlan),
                                    isAutoDirectorEnabled: i ? i[be.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: g.displayId,
                                    onSelectDisplayId: (De) => {
                                      const ut = H.map((at, gr) => gr === w ? { ...at, displayId: De } : at);
                                      fe(ut);
                                    },
                                    areAllDisplaysPlaced: it,
                                    slotIndex: w,
                                    borderColor: rt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (De) => Ya(De, w),
                                onDoubleClick: () => mr(w),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          L && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (De) => No(De, w, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Fr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (De) => No(De, w, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Fr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (De) => No(De, w, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Fr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (De) => No(De, w, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Fr(g.sourceWidth, g.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${g.stationId}-${g.displayId}-${w}`
                    );
                  }),
                  !Y && jt && Ze !== null && Bs && (() => {
                    const g = Bs, w = Ze, L = g.borderColor || xt[w % xt.length], Q = g.borderWidth !== void 0 ? g.borderWidth : 2, X = g.rotation || 0, _ = g.shadowEffect || "deep", ie = g.zIndex !== void 0 ? g.zIndex : w + 1, be = g.x / $e * 100, pe = g.width / $e * 100, ke = be + pe / 2;
                    let it = `${ke}%`, rt = "translateX(-50%)";
                    ke < 28 ? (it = `${Math.max(1, be)}%`, rt = "none") : ke > 72 && (it = `${Math.min(99, be + pe)}%`, rt = "translateX(-100%)");
                    const lt = g.y + g.height + 8;
                    let ge;
                    lt + 45 > Ce ? ge = `${Math.max(20, (g.y + g.height - 44) / Ce * 100)}%` : ge = `${lt / Ce * 100}%`;
                    const ot = (n.length > 0 ? n : t).find(
                      (mt) => {
                        var gt, In;
                        return mt.id === g.stationId || ((gt = mt.hostname) == null ? void 0 : gt.toLowerCase()) === ((In = g.stationId) == null ? void 0 : In.toLowerCase());
                      }
                    ), $t = ot ? ot.id : g.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: it,
                          top: ge,
                          transform: rt,
                          zIndex: 99999
                        },
                        onMouseDown: (mt) => mt.stopPropagation(),
                        onClick: (mt) => mt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${g.label || $t} • Layer #${ie}`, children: [
                            "🎛️ #$",
                            ie
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => bn((mt) => !mt),
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
                            Dn && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Fg.map((mt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${L === mt ? "is-active" : ""}`,
                                style: { backgroundColor: mt === "transparent" ? "#1E293B" : mt },
                                onClick: () => {
                                  Cs({ borderColor: mt }), bn(!1);
                                },
                                title: mt === "transparent" ? "No Border (Transparent)" : `Border Color: ${mt}`
                              },
                              mt
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => {
                                const mt = [0, 2, 4, 8], gt = mt[(mt.indexOf(Q) + 1) % mt.length];
                                Cs({ borderWidth: gt });
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
                              className: `btn-mini-tool ${_ !== "none" ? "highlight-glow" : ""}`,
                              onClick: () => {
                                const mt = ["none", "deep", "glow-cyan", "glow-emerald"], gt = mt[(mt.indexOf(_) + 1) % mt.length];
                                Cs({ shadowEffect: gt });
                              },
                              title: `Shadow Effect: ${_} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                              children: "🌑"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => on(w),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Zn(w),
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
                              onClick: () => Va(90),
                              title: `Rotate: Step 90° clockwise (Current: ${X}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Dp(w),
                              title: `Snap to Native Recorded Aspect (${Fr(g.sourceWidth, g.sourceHeight)})`,
                              children: "📐 NATIVE"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => mr(w),
                              title: "1x1 Focus Mode (Double-click window to toggle)",
                              children: "⛶ 1x1"
                            }
                          ),
                          l && /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => l($t, g.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => vt(w),
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
                    Ag,
                    {
                      currentEpochMs: B,
                      position: se,
                      onPositionChange: (g) => {
                        ee(g);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", g);
                        } catch {
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx($g, {})
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => ht(!0),
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
                    className: `btn-wing-tool ${A ? "active" : ""}`,
                    onClick: () => G((g) => !g),
                    title: `Saved Presets Library (${Me.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Me.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                A && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => G(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Me.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Me.map((g) => {
                    var w;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      $p(g), G(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: g.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((w = g.placements) == null ? void 0 : w.length) || 0,
                          " screens • ",
                          g.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: (L) => Rp(g.id, L),
                          title: "Delete saved preset",
                          children: "🗑️"
                        }
                      )
                    ] }, g.id);
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool",
                  onClick: Lp,
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
                    var g;
                    return (g = _e.current) == null ? void 0 : g.click();
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
                  ref: _e,
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: Op
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-rose",
                  onClick: () => {
                    pt.current = !1, Mt("auto-grid");
                    const g = sn.length > 0 ? sn : Xt, w = Hs(g, $e, Ce), L = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: $e,
                            height: Ce,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: w
                          }
                        }
                      ]
                    };
                    un(L), C && C(L), Xe(0);
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
                  onClick: Qt,
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
                  className: `btn-wing-tool ${Be ? "active" : ""}`,
                  onClick: Pp,
                  title: "Fullscreen Canvas Grid (F)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Be ? "⤓" : "⛶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Be ? "EXIT" : "FULL" })
                  ]
                }
              )
            ] })
          ] }),
          " "
        ] }) }),
        " ",
        He && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ht(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (g) => g.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ht(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: z,
                onChange: (g) => he(g.target.value),
                autoFocus: !0,
                onKeyDown: (g) => {
                  g.key === "Enter" && Cu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              H.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ht(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Cu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Si = [0.5, 1, 1.25, 1.5, 2, 4];
function wp({
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
  onStepFrameForward: v,
  onStepFrameBackward: f,
  playbackSpeed: m = 1,
  onChangeSpeed: y,
  onSetInPoint: E,
  onSetOutPoint: M
}) {
  const [D, k] = u.useState(() => il()), { volume: p, isMuted: h } = D, b = !!(e || d > 0);
  u.useEffect(() => {
    const V = (oe) => {
      oe.detail && k(oe.detail);
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []);
  const S = u.useCallback((V, oe, C) => {
    const R = {
      volume: typeof V == "number" ? V : p,
      isMuted: typeof oe == "boolean" ? oe : h,
      channelMode: C || D.channelMode || "both"
    };
    k(R), Cg(R);
  }, [p, h, D.channelMode]), j = (V) => {
    V == null || V.stopPropagation(), b && n(!t);
  }, N = (V) => {
    if (V == null || V.stopPropagation(), !b || !y) return;
    const oe = Si.indexOf(m), C = oe === -1 ? 1 : (oe + 1) % Si.length;
    y(Si[C]);
  }, T = (V) => {
    V == null || V.stopPropagation(), h ? S(p === 0 ? 0.5 : p, !1) : S(p, !0);
  }, x = (V) => {
    V.stopPropagation();
    const oe = parseFloat(V.target.value);
    oe === 0 ? S(0, !0) : S(oe, !1);
  }, I = (V) => {
    const oe = u.useRef(null), C = u.useRef(null), R = u.useRef(0), F = u.useCallback(() => {
      oe.current && clearTimeout(oe.current), C.current && clearInterval(C.current), oe.current = null, C.current = null;
    }, []), Y = u.useCallback((se = 1) => {
      if (n && n(!1), a) {
        const ee = 33 * se;
        a((J) => {
          const le = V === "forward" ? J + ee : J - ee;
          return Math.max(0, Math.min(d, le));
        });
      } else V === "forward" && v ? v() : V === "backward" && f && f();
    }, [V]), B = u.useCallback((se) => {
      se.preventDefault(), se.stopPropagation(), b && (F(), Y(1), R.current = performance.now(), oe.current = setTimeout(() => {
        C.current = setInterval(() => {
          const ee = performance.now() - R.current, J = ee > 2500 ? 4 : ee > 1e3 ? 2 : 1;
          Y(J);
        }, 50);
      }, 280));
    }, [Y, F]);
    return u.useEffect(() => F, [F]), {
      onMouseDown: B,
      onMouseUp: F,
      onMouseLeave: F,
      onTouchStart: B,
      onTouchEnd: F
    };
  }, P = I("backward"), K = I("forward"), $ = (V) => {
    V.stopPropagation(), b && (n && n(!1), a && a(i));
  }, U = (V) => {
    V.stopPropagation(), b && (n && n(!1), a && a(c));
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
      className: `transport-bar-root ${b ? "is-expanded" : "is-compact-disabled"}`,
      title: b ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !b,
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
            disabled: !E,
            onClick: (V) => {
              V.stopPropagation(), E == null || E();
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
              disabled: !b,
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
              disabled: !b,
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
              disabled: !b,
              ...P,
              title: "Step 1 Frame Back (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "16 5 7 12 16 19 16 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-play-hero ${t ? "playing" : ""}`,
              disabled: !b,
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
              disabled: !b,
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
              disabled: !b,
              onClick: U,
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
            disabled: !M,
            onClick: (V) => {
              V.stopPropagation(), M == null || M();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        b && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${h || p === 0 ? "is-muted" : ""}`,
              onClick: T,
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
              onChange: x,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ea = 2500, Wg = {
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
function zg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Wg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function jp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(zg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Ep(e, t = " + ") {
  return jp(e).join(t);
}
function Al(e) {
  return Ep(e, "+");
}
const Hg = 8;
function Kg({
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
  const [v, f] = u.useState([]), [, m] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((h) => ({
    id: h.id,
    name: h.displayName || h.hostname || h.name || h.id,
    hostname: h.hostname || h.id
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
    const h = new AbortController(), b = Math.max(0, l + a - ea), S = l + a + i + ea;
    m(!0);
    const j = y.map((N) => {
      const T = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(N.hostname)}&startEpoch=${b}&endEpoch=${S}`;
      return fetch(T, { signal: h.signal }).then((x) => x.ok ? x.json() : []).then((x) => (Array.isArray(x) ? x : []).map((I) => ({
        ...I,
        stationId: N.id,
        stationName: N.name
      }))).catch((x) => {
        if (x.name !== "AbortError") return [];
        throw x;
      });
    });
    return Promise.all(j).then((N) => {
      const T = N.flat();
      f(T), m(!1);
    }).catch((N) => {
      N.name !== "AbortError" && (f([]), m(!1));
    }), () => h.abort();
  }, [y, l, a, i, r]);
  const E = r && Array.isArray(r) && r.length > 0 ? r : v, M = u.useMemo(() => {
    if (!E.length || i <= 0 || c <= 0)
      return [];
    const h = l + a, b = h + i, S = [...E].sort((x, I) => x.epochMs - I.epochMs), j = [];
    let N = null, T = -999;
    for (const x of S) {
      const I = x.epochMs + ea;
      if (I < h || I > b)
        continue;
      const P = I - l, K = (P - a) / i * c;
      if (N && K - T < Hg) {
        N.events.push(x), N.endOffsetMs = P, N.endEpochMs = I;
        const $ = new Set(N.events.map((U) => U.stationName || "Workstation"));
        N.isMultiStation = $.size > 1, N.stationCount = $.size, T = K;
      } else {
        const $ = (P - a) / i * 100;
        N = {
          id: `kc_${x.epochMs}_${j.length}`,
          startOffsetMs: P,
          endOffsetMs: P,
          startEpochMs: I,
          endEpochMs: I,
          pct: $,
          events: [x],
          isMultiStation: !1,
          stationCount: 1
        }, j.push(N), T = K;
      }
    }
    return j;
  }, [E, l, a, i, c]);
  function D(h) {
    if (!h.events.length) return "";
    if (h.events.length === 1)
      return Al(h.events[0].keyCombination);
    const b = h.events.find((N) => N.keyCombination.includes("+"));
    if (b) {
      const N = Al(b.keyCombination);
      return h.events.length > 1 ? `${N} (+${h.events.length - 1})` : N;
    }
    const S = Al(h.events[0].keyCombination);
    return h.events.every((N) => Al(N.keyCombination) === S) ? `${S} ×${h.events.length}` : `${S} (+${h.events.length - 1})`;
  }
  function k(h, b = "LOCAL") {
    return wt(h, b);
  }
  function p(h) {
    const b = [];
    for (const S of h) {
      const j = Al(S.keyCombination);
      b.length && b[b.length - 1].key === j ? b[b.length - 1].count++ : b.push({ key: j, count: 1 });
    }
    return b;
  }
  return M.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: M.map((h) => {
    const b = h.events.length, S = b > 1, j = h.isMultiStation, N = D(h), T = k(h.startEpochMs, o), x = h.pct < 10 ? "edge-left" : h.pct > 90 ? "edge-right" : "", I = {};
    return h.events.forEach((P) => {
      const K = P.stationName || e || "Workstation";
      I[K] || (I[K] = []), I[K].push(P);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${S ? "is-cluster" : "is-single"} ${j ? "is-multi-station" : ""}`,
        style: { left: `${h.pct}%` },
        onClick: (P) => {
          P.stopPropagation(), d && d(h.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${N} at ${T}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            S && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: j ? `${h.stationCount}S` : b > 9 ? "9+" : b })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${x}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: j ? `MULTICAM KEYSTROKES (${h.stationCount} WORKSTATIONS • ${b} EVT)` : S ? `KEYSTROKE BURST (${b})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: T })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(I).map(([P, K]) => {
              const $ = p(K);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: P }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    K.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  $.slice(0, 6).map((U, ne) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    U.key,
                    U.count > 1 ? ` ×${U.count}` : ""
                  ] }, ne)),
                  $.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    $.length - 6,
                    " more"
                  ] })
                ] })
              ] }, P);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      h.id
    );
  }) }) : null;
}
const Vg = u.memo(Kg), bi = [
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
], Yg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function Gg({
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
  stationHostname: m = "",
  activeStationName: y = "",
  showKeystrokes: E = !0,
  keystrokes: M = []
}) {
  const D = u.useRef(null), [k, p] = u.useState(1e3);
  u.useEffect(() => {
    if (!D.current) return;
    const B = new ResizeObserver((se) => {
      for (let ee of se)
        ee.contentRect.width > 50 && p(ee.contentRect.width);
    });
    return B.observe(D.current), () => B.disconnect();
  }, []);
  const h = u.useCallback((B) => !r || r <= 0 ? "0%" : `${(B - n) / r * 100}%`, [r, n]), b = u.useCallback((B) => {
    const ee = (B - n) / r * 100;
    return ee >= -5 && ee <= 105;
  }, [n, r]), S = (B) => {
    if (!D.current) return;
    const se = D.current.getBoundingClientRect(), ee = Math.max(0, Math.min(B.clientX - se.left, se.width)), J = Math.round(n + ee / se.width * r);
    a && a(J);
  }, j = () => {
    a && a(null);
  }, N = (B) => {
    if (!D.current || !i) return;
    const se = D.current.getBoundingClientRect(), ee = Math.max(0, Math.min(B.clientX - se.left, se.width)), J = Math.round(n + ee / se.width * r);
    i(Math.max(0, Math.min(l, J)));
  }, T = u.useMemo(() => {
    const B = Math.max(3, Math.floor(k / 95)), se = r / B;
    for (let ee of bi)
      if (ee >= se) return ee;
    return bi[bi.length - 1];
  }, [r, k]), x = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const B = e + n, se = B + r, ee = t === "LOCAL" ? $s(B).offsetMin * 60 * 1e3 : 0, J = B + ee, le = Math.ceil(J / T) * T, We = [];
    for (let Pe = le; Pe <= se + ee; Pe += T) {
      const we = Pe - ee, ze = (we - B) / r * 100;
      ze >= 0 && ze <= 100 && We.push({
        epoch: we,
        pct: ze,
        label: wt(we, t, {
          includeSeconds: T < 6e4
        })
      });
    }
    return We;
  }, [e, n, r, T, t]), I = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const B = e + n, se = B + r;
    return gp(B, se).map((ee) => ({
      ...ee,
      pct: (ee.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), P = u.useMemo(() => {
    if (!r || !e) return [];
    const B = e + n, se = B + r, ee = t === "UTC", J = [], le = ee ? 0 : $s(B).offsetMin * 60 * 1e3, We = B + le, Pe = se + le, we = new Date(We);
    for (we.setUTCHours(0, 0, 0, 0), we.getTime() < We && we.setUTCDate(we.getUTCDate() + 1); we.getTime() <= Pe; ) {
      const Le = we.getTime() - le, Se = (Le - B) / r * 100, He = String(we.getUTCDate()).padStart(2, "0"), ht = Yg[we.getUTCMonth()], A = `${He} ${ht}`;
      J.push({ epoch: Le, pct: Se, dateLabel: A }), we.setUTCDate(we.getUTCDate() + 1);
    }
    return J;
  }, [e, n, r, t]), {
    globalFirstMs: K = v,
    globalLastMs: $ = null,
    currentFirstMs: U = null,
    currentLastMs: ne = null
  } = f || { globalFirstMs: v }, V = K !== null && U !== null && Math.abs(K - U) < 1e3, oe = $ !== null && ne !== null && Math.abs($ - ne) < 1e3, C = u.useMemo(() => {
    const B = [];
    return V ? b(K) && B.push({
      id: "first-combined",
      ms: K,
      pct: h(K),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${wt(e + K, t)} (Click to jump)`
    }) : (b(K) && B.push({
      id: "first-global",
      ms: K,
      pct: h(K),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${wt(e + K, t)} (Click to jump)`
    }), b(U) && B.push({
      id: "first-current",
      ms: U,
      pct: h(U),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${wt(e + U, t)} (Click to jump)`
    })), oe ? b($) && B.push({
      id: "last-combined",
      ms: $,
      pct: h($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${wt(e + $, t)} (Click to jump)`
    }) : (b(ne) && B.push({
      id: "last-current",
      ms: ne,
      pct: h(ne),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${wt(e + ne, t)} (Click to jump)`
    }), b($) && B.push({
      id: "last-global",
      ms: $,
      pct: h($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${wt(e + $, t)} (Click to jump)`
    })), B;
  }, [
    K,
    $,
    U,
    ne,
    V,
    oe,
    e,
    t,
    y,
    b,
    h
  ]), R = u.useMemo(() => {
    const B = [];
    return typeof c == "number" && b(c) && B.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: h(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${wt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && b(d) && B.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: h(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${wt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), B;
  }, [c, d, e, t, b, h]), F = o !== null ? h(o) : null, Y = F !== null && F >= 0 && F <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: D,
      className: "timeline-ruler-root",
      onMouseMove: S,
      onMouseLeave: j,
      onClick: N,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          x.map((B) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${B.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: B.label })
          ] }, B.epoch)),
          E && /* @__PURE__ */ s.jsx(
            Vg,
            {
              stationHostname: m,
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
          I.map((B) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${B.pct}%` },
              title: `${B.description} (${B.labelBefore} ➔ ${B.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: B.description })
                ] })
              ]
            },
            B.switchEpochMs
          )),
          P.map((B) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${B.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: B.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            B.epoch
          )),
          C.map((B) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: B.className,
              style: { left: `${B.pct}` },
              onClick: (se) => {
                se.stopPropagation(), i && i(B.ms);
              },
              title: B.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: B.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            B.id
          )),
          R.map((B) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${B.type}-cut-tick`,
              style: { left: `${B.pct}` },
              onClick: (se) => {
                se.stopPropagation(), i && i(B.ms);
              },
              title: B.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: B.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: B.shortLabel })
                ] })
              ]
            },
            B.id
          ))
        ] }),
        Y && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${F}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: wt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const _n = (e) => String(e).padStart(2, "0");
function Xg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, m] = u.useState(""), [y, E] = u.useState(""), M = u.useCallback((x) => {
    if (!x || isNaN(x) || x <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(x);
      return {
        timeStr: `${_n($.getUTCHours())}:${_n($.getUTCMinutes())}:${_n($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: I, label: P } = $s(x), K = new Date(x + I * 60 * 1e3);
    return {
      timeStr: `${_n(K.getUTCHours())}:${_n(K.getUTCMinutes())}:${_n(K.getUTCSeconds())}`,
      zoneLabel: P
    };
  }, [t]), D = u.useCallback((x) => {
    if (!x || x < 0) return "00:00:00";
    const I = Math.floor(x / 1e3), P = Math.floor(I / 3600), K = Math.floor(I % 3600 / 60), $ = I % 60;
    return `${_n(P)}:${_n(K)}:${_n($)}`;
  }, []), k = u.useMemo(() => M(e + r), [M, e, r]), p = u.useMemo(() => M(e + o), [M, e, o]), h = u.useMemo(() => D(Math.max(0, o - r)), [D, r, o]), b = u.useCallback((x, I) => {
    if (!x || !x.trim()) return I;
    const K = x.trim().split(" ")[0].split(":").map(Number);
    if (K.length < 2 || K.some(isNaN)) return I;
    const [$, U, ne = 0] = K;
    if (t === "UTC") {
      const le = new Date(e);
      le.setUTCHours($, U, ne, 0);
      let We = le.getTime();
      for (; We < e; ) We += 864e5;
      for (; We > e + n + 1e3; ) We -= 864e5;
      const Pe = We - e;
      return isNaN(Pe) ? I : Math.max(0, Math.min(n, Pe));
    }
    const { offsetMin: V } = $s(e), oe = new Date(e + V * 6e4), C = oe.getUTCFullYear(), R = oe.getUTCMonth(), F = oe.getUTCDate(), Y = `${C}-${_n(R + 1)}-${_n(F)}`, B = `${_n($)}:${_n(U)}:${_n(ne)}`, se = Sa(Y, B);
    let ee;
    if (se.isAmbiguous) {
      const le = e + I, We = Math.abs(se.firstOccurrenceEpoch - le), Pe = Math.abs(se.secondOccurrenceEpoch - le);
      ee = We <= Pe ? se.firstOccurrenceEpoch : se.secondOccurrenceEpoch;
    } else {
      const le = Date.UTC(C, R, F, $, U, ne), { offsetMin: We } = $s(le - V * 6e4);
      ee = le - We * 6e4;
    }
    for (; ee < e; ) ee += 864e5;
    for (; ee > e + n + 1e3; ) ee -= 864e5;
    const J = ee - e;
    return isNaN(J) ? I : Math.max(0, Math.min(n, J));
  }, [e, t, n]), S = () => {
    m(k.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !f || !f.trim() || f.trim() === k.timeStr)
      return;
    const x = b(f.trim(), r);
    x !== null && !isNaN(x) && x < o && l(x);
  }, N = () => {
    E(p.timeStr), v(!0);
  }, T = () => {
    if (v(!1), !y || !y.trim() || y.trim() === p.timeStr)
      return;
    const x = b(y.trim(), o);
    x !== null && !isNaN(x) && x > r && a(x);
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
          onChange: (x) => m(x.target.value),
          onBlur: j,
          onKeyDown: (x) => {
            x.key === "Enter" && j(), x.key === "Escape" && c(!1);
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
      d ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: y,
          autoFocus: !0,
          onChange: (x) => E(x.target.value),
          onBlur: T,
          onKeyDown: (x) => {
            x.key === "Enter" && T(), x.key === "Escape" && v(!1);
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: h })
    ] })
  ] });
}
function Qg({
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
  const f = Math.max(0, Math.min(100, i / r * 100)), m = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, m - f), E = Math.max(0, Math.min(100, l / r * 100)), M = Math.max(0, Math.min(100 - E, o / r * 100)), D = E + M, k = a > 1.05, p = 7, h = y >= 10, b = y >= 16, S = h, j = b, N = S && Math.abs(E - f) < p, T = k && M >= 12 && !N, x = j && Math.abs(D - m) < p, I = k && M >= 12 && !x;
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
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: wt(t + i, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: wt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${E}%`, width: `${M}%` },
            children: [
              T && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: wt(t + l, n) }),
              I && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: wt(t + l + o, n) })
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
function Jg({
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
  onToggleRulerKeystrokes: m
}) {
  const y = (d || "NONE").toUpperCase().replace("-", "_"), E = () => {
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
        onClick: E,
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
        title: `Jump playhead to first media (${wt(i + e, c)})`,
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
        title: `Jump playhead to last media (${wt(i + t, c)})`,
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
const Ns = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new Map();
let Ms = [], cl = 0;
const Vd = 3, Zg = 8e3, qg = 80;
function Cp() {
  setTimeout(ex, 0);
}
function ex() {
  var e;
  if (!(cl >= Vd || Ms.length === 0))
    for (Ms = Ms.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); cl < Vd && Ms.length > 0; ) {
      const t = Ms.pop();
      !t || (e = t.signal) != null && e.aborted || (cl++, tx(t));
    }
}
async function tx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), cl = Math.max(0, cl - 1), Ur.delete(t), Cp());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, Zg);
  try {
    const m = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(m, { signal: a });
    if (y.ok && y.status !== 204) {
      const E = await y.blob();
      if (E && E.size > 1500) {
        const M = URL.createObjectURL(E);
        if (Ns.size >= qg) {
          const D = Ns.keys().next().value, k = Ns.get(D);
          k && URL.revokeObjectURL(k), Ns.delete(D);
        }
        Ns.set(t, M), i(M);
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
const Yd = {
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
    const a = `${e}_${o || "mon-0"}_${t}_${n}_${r}`;
    if (Ns.has(a))
      return Promise.resolve(Ns.get(a));
    if (Ur.has(a))
      return Ur.get(a);
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
        Ms = Ms.filter((v) => v.key !== a), Ur.delete(a), c(null);
      }, { once: !0 }), Ms.push(d), Cp();
    });
    return Ur.set(a, i), i;
  },
  clear() {
    Ns.forEach((e) => URL.revokeObjectURL(e)), Ns.clear(), Ur.clear(), Ms = [], cl = 0;
  }
}, nx = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Vn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Cr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Ic({
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
  showDirectorCoverage: m = !1,
  stepperSegments: y = null
}) {
  const [E, M] = u.useState({}), D = u.useRef(E);
  D.current = E;
  const k = u.useMemo(() => nx(l), [l]), p = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: x, framesPerTile: I } = k, P = [], K = o + r, $ = K + l, U = K - x, ne = $ + x, V = [...n].sort((Y, B) => Vn(Y) - Vn(B)), oe = [...c || [], ...d || []], C = (Y, B) => !oe || oe.length === 0 ? !1 : oe.some((se) => {
      const ee = se.startEpochMs ?? se.startEpoch ?? se.start ?? 0, J = se.endEpochMs ?? se.endEpoch ?? se.end ?? 0;
      return J <= ee ? !1 : Math.max(Y, ee) < Math.min(B, J);
    }), R = o + a, F = o + i;
    if (V.forEach((Y, B) => {
      const se = Math.round(Vn(Y)), ee = Math.round(Cr(Y));
      if (ee <= se) return;
      const J = Math.max(se, R), le = Math.min(ee, F);
      if (le <= J) return;
      const We = Math.max(J, U), Pe = Math.min(le, ne);
      if (Pe <= We) return;
      const we = Math.floor(We / x) * x;
      for (let ze = we; ze < Pe; ze += x) {
        const Le = ze + x, Se = Math.max(J, ze), He = Math.min(le, Le);
        He > Se && !C(Se, He) && P.push({
          key: `${e}_${t}_${Se}_${He}_${I}`,
          sIdx: B,
          startEpoch: Se,
          endEpoch: He,
          framesPerTile: I,
          displayId: t
        });
      }
    }), P.length > 20) {
      const Y = o + r + l / 2;
      P.sort((B, se) => {
        const ee = Math.abs((B.startEpoch + B.endEpoch) / 2 - Y), J = Math.abs((se.startEpoch + se.endEpoch) / 2 - Y);
        return ee - J;
      }), P.length = 20, P.sort((B, se) => B.startEpoch - se.startEpoch);
    }
    return P;
  }, [n, o, e, t, r, l, k, a, i, d, c]);
  u.useEffect(() => {
    if (p.length === 0) return;
    let x = !0;
    const I = new AbortController(), P = [], K = {};
    let $ = !1;
    p.forEach((R) => {
      const F = Yd.get(e, R.startEpoch, R.endEpoch, R.framesPerTile, t);
      F ? D.current[R.key] !== F && (K[R.key] = F, $ = !0) : P.push(R);
    });
    const U = new Set(p.map((R) => R.key)), ne = D.current, V = {};
    let oe = !1;
    if (Object.keys(ne).forEach((R) => {
      U.has(R) ? V[R] = ne[R] : oe = !0;
    }), $ || oe) {
      const R = { ...V, ...K };
      D.current = R, M(R);
    }
    if (P.length === 0) return () => {
      x = !1;
    };
    const C = setTimeout(() => {
      P.forEach((R) => {
        Yd.fetchTile(e, R.startEpoch, R.endEpoch, R.framesPerTile, I.signal, t).then((F) => {
          x && F && (D.current[R.key] = F, M((Y) => ({ ...Y, [R.key]: F })));
        });
      });
    }, 150);
    return () => {
      x = !1, clearTimeout(C), I.abort();
    };
  }, [p, e, t]);
  const h = (a - r) / l * 100, b = (i - r) / l * 100, S = u.useMemo(() => {
    if (p.length === 0 || !o || l <= 0) return [];
    const x = r, I = r + l;
    return p.map((P) => {
      const K = P.startEpoch - o, $ = P.endEpoch - o;
      if ($ <= x || K >= I) return null;
      const U = Math.max(x, K), ne = Math.min(I, $);
      return {
        key: P.key,
        spriteUrl: E[P.key] || null,
        leftPct: (U - x) / l * 100,
        widthPct: (ne - U) / l * 100
      };
    }).filter(Boolean);
  }, [p, o, r, l, E]), j = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const x = r, I = r + l;
    return n.map((P, K) => {
      const $ = Math.round(Vn(P)) - o, U = Math.round(Cr(P)) - o;
      if (U <= x || $ >= I) return null;
      const ne = Math.max(x, $), V = Math.min(I, U);
      return {
        id: K,
        leftPct: (ne - x) / l * 100,
        widthPct: (V - ne) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), N = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const x = [...n].sort((C, R) => Vn(C) - Vn(R)), I = [], P = r, K = r + l, $ = o + P, U = o + K, ne = o + (a !== void 0 ? a : P), V = o + (i !== void 0 ? i : K);
    if (x.length > 0) {
      const C = Vn(x[0]);
      C > $ && I.push({ startEpoch: $, endEpoch: C });
    } else l > 0 && I.push({ startEpoch: $, endEpoch: U });
    for (let C = 0; C < x.length - 1; C++) {
      const R = Cr(x[C]), F = Vn(x[C + 1]);
      F - R > 1e3 && I.push({ startEpoch: R, endEpoch: F });
    }
    if (x.length > 0) {
      const C = Cr(x[x.length - 1]);
      C < U && I.push({ startEpoch: C, endEpoch: U });
    }
    const oe = [];
    return c && c.length > 0 && c.forEach((C, R) => {
      const F = Math.max(C.startEpochMs ?? C.StartEpochMs, ne), Y = Math.min(C.endEpochMs ?? C.EndEpochMs, V);
      if (Y > F && Y > $ && F < U) {
        const B = Math.max($, F), se = Math.min(U, Y), ee = (se - o - (B - o)) / l * 100;
        ee > 0 && oe.push({
          id: `global-${R}`,
          type: "global",
          startEpoch: B,
          endEpoch: se,
          leftPct: (B - o - P) / l * 100,
          widthPct: ee,
          durationSec: Math.round((Y - F) / 1e3)
        });
      }
    }), I.forEach((C, R) => {
      let F = [C];
      c && c.length > 0 && c.forEach((Y) => {
        const B = Math.max(Y.startEpochMs ?? Y.StartEpochMs, ne), se = Math.min(Y.endEpochMs ?? Y.EndEpochMs, V);
        if (se <= B) return;
        const ee = [];
        F.forEach((J) => {
          se <= J.startEpoch || B >= J.endEpoch ? ee.push(J) : (B > J.startEpoch && ee.push({ startEpoch: J.startEpoch, endEpoch: B }), se < J.endEpoch && ee.push({ startEpoch: se, endEpoch: J.endEpoch }));
        }), F = ee;
      }), F.forEach((Y, B) => {
        if (Y.endEpoch - Y.startEpoch < 1e3 || Y.endEpoch <= $ || Y.startEpoch >= U) return;
        const se = Math.max($, Y.startEpoch), ee = Math.min(U, Y.endEpoch), J = (ee - o - (se - o)) / l * 100;
        J > 0 && oe.push({
          id: `station-${R}-${B}`,
          type: "station",
          startEpoch: se,
          endEpoch: ee,
          leftPct: (se - o - P) / l * 100,
          widthPct: J,
          durationSec: Math.round((Y.endEpoch - Y.startEpoch) / 1e3)
        });
      });
    }), oe;
  }, [n, c, o, r, l, a, i]), T = u.useMemo(() => {
    if (!m || !f || !v || v.length === 0) return [];
    const x = (t || "mon-0").toLowerCase(), I = r, P = r + l;
    return v.map((K, $) => {
      const U = (K.startEpochMs ?? K.StartEpochMs ?? 0) - o, ne = (K.endEpochMs ?? K.EndEpochMs ?? 0) - o;
      if (ne <= I || U >= P) return null;
      const V = Math.max(I, U), oe = Math.min(P, ne), C = (V - I) / l * 100, R = (oe - V) / l * 100;
      if (R <= 0) return null;
      const Y = (K.targetDisplayId || K.TargetDisplayId || "mon-0").toLowerCase() === x;
      return {
        id: `cov_${$}`,
        isFeatured: Y,
        leftPct: C,
        widthPct: R
      };
    }).filter(Boolean);
  }, [m, f, v, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: N.map((x) => /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: S.map((x) => /* @__PURE__ */ s.jsx(
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
    T.map((x) => x.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
        title: "Display Featured by Auto-Director"
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
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${y ? "has-stepper" : ""}`, children: j.map((x) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }
      },
      `bar_${x.id}`
    )) }),
    y && y.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: f ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      y.map((x, I) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${x.dispNum}`,
          style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` },
          title: `Auto-Director: Screen ${x.dispNum} (${x.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: x.dispNum })
        },
        `stp_${I}`
      )),
      N && N.map((x) => /* @__PURE__ */ s.jsx(
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
    h > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, h)}%` } }),
    b < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, b)}%`, right: 0 } })
  ] });
}
function sx({
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
  viewportStartMs: m = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: E = 0,
  outPointMs: M = 36e5,
  baseEpochMs: D = 0,
  segments: k = [],
  recordingSegments: p = {},
  globalGaps: h = []
}) {
  const b = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", S = (e == null ? void 0 : e.id) || b, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", T = u.useMemo(() => {
    var R, F, Y;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((R = e == null ? void 0 : e.displayTopology) == null ? void 0 : R.displays) || ((F = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : F.Displays) || ((Y = e == null ? void 0 : e.topology) == null ? void 0 : Y.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), x = u.useMemo(() => {
    var F, Y;
    const R = T.find((B) => B.isPrimary || B.IsPrimary);
    return ((R == null ? void 0 : R.displayId) || (R == null ? void 0 : R.DisplayId) || ((F = T[0]) == null ? void 0 : F.displayId) || ((Y = T[0]) == null ? void 0 : Y.DisplayId) || "mon-0").toLowerCase();
  }, [T]), I = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), P = u.useMemo(() => (I == null ? void 0 : I.segments) || (I == null ? void 0 : I.Segments) || [], [I]), K = P && P.length > 0, $ = T.length > 1 || K, U = u.useMemo(() => {
    let R = p[S] || p[b] || k || [];
    if (!R || R.length === 0) {
      const F = (S || "").toLowerCase(), Y = (b || "").toLowerCase();
      for (const [B, se] of Object.entries(p || {})) {
        const ee = B.toLowerCase();
        if (F && ee === F || Y && ee === Y) {
          R = se;
          break;
        }
      }
    }
    if ((!R || R.length === 0) && (R = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !R || R.length === 0)
      for (const F of T) {
        const Y = F.segments || F.Segments || [];
        if (Y.length > 0) {
          R = Y;
          break;
        }
      }
    return (R || []).filter((F) => Cr(F) - Vn(F) > 0);
  }, [p, k, S, b, e, T]), ne = u.useMemo(() => {
    if (!D || y <= 0) return [];
    const R = [...U].sort((ee, J) => Vn(ee) - Vn(J)), F = [], Y = D + y;
    if (h && h.length > 0 && h.forEach((ee) => {
      const J = ee.startEpochMs ?? ee.StartEpochMs ?? 0, le = ee.endEpochMs ?? ee.EndEpochMs ?? 0;
      le > J && F.push({ startEpoch: J, endEpoch: le, type: "global" });
    }), R.length === 0)
      return F.push({ startEpoch: D, endEpoch: Y, type: "station" }), F;
    const B = Math.round(Vn(R[0]));
    B - D > 2e3 && (F.some((J) => J.type === "global" && J.startEpoch <= D && J.endEpoch >= B) || F.push({ startEpoch: D, endEpoch: B, type: "station" }));
    for (let ee = 0; ee < R.length - 1; ee++) {
      const J = Math.round(Cr(R[ee])), le = Math.round(Vn(R[ee + 1]));
      le - J > 2e3 && (F.some((Pe) => Pe.type === "global" && Pe.startEpoch <= J && Pe.endEpoch >= le) || F.push({ startEpoch: J, endEpoch: le, type: "station" }));
    }
    const se = Math.round(Cr(R[R.length - 1]));
    return Y - se > 2e3 && (F.some((J) => J.type === "global" && J.startEpoch <= se && J.endEpoch >= Y) || F.push({ startEpoch: se, endEpoch: Y, type: "station" })), F;
  }, [U, h, D, y]), V = u.useMemo(() => {
    const R = D + E, F = D + M;
    return _g(P, ne, h, R, F, x);
  }, [P, ne, h, D, E, M, x]), oe = u.useMemo(() => {
    if (!K || y <= 0) return null;
    const R = m, F = m + y;
    return V.map((Y, B) => {
      const se = (Y.startEpochMs ?? Y.StartEpochMs ?? 0) - D, ee = (Y.endEpochMs ?? Y.EndEpochMs ?? 0) - D;
      if (ee <= R || se >= F) return null;
      const J = Math.max(R, se), le = Math.min(F, ee), We = (J - R) / y * 100, Pe = (le - J) / y * 100;
      if (Pe <= 0) return null;
      const we = (Y.targetDisplayId || Y.TargetDisplayId || "mon-0").toLowerCase(), ze = T.findIndex((He) => (He.displayId || He.DisplayId || "").toLowerCase() === we);
      let Le = ze >= 0 ? ze + 1 : null;
      if (!Le) {
        const He = we.match(/\d+/);
        Le = He ? parseInt(He[0], 10) + 1 : 1;
      }
      const Se = ze >= 0 ? T[ze].displayName || T[ze].DisplayName || `Screen ${Le}` : `Screen ${Le}`;
      return {
        id: B,
        dispNum: Le,
        dispLabel: Se,
        leftPct: We,
        widthPct: Pe
      };
    }).filter(Boolean);
  }, [K, V, T, D, m, y]), C = u.useCallback((R) => {
    const F = (R || "mon-0").toLowerCase();
    return o.some((Y) => {
      if (Y.stationId !== S) return !1;
      const B = (Y.displayId || "mon-0").toLowerCase();
      return B === F || B === "auto" && (F === "mon-0" || F === "screen-0");
    });
  }, [o, S]);
  return t ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (R) => {
              R.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: j, children: j }),
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (R) => {
              R.stopPropagation(), l(e.id);
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
            onClick: (R) => {
              R.stopPropagation(), l(e.id);
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
            onClick: (R) => {
              R.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: T.map((R, F) => {
      const Y = (R.displayId || R.DisplayId || `mon-${F}`).toLowerCase(), B = R.displayNumber || R.DisplayNumber || F + 1, se = R.displayName || R.DisplayName || "", ee = se && !se.toLowerCase().includes(b.toLowerCase()) ? se : `Screen ${B}${R.isPrimary || F === 0 ? " (Main)" : ""}`, J = C(Y);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${ee} (${R.width || 1920}×${R.height || 1080})`, children: ee }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${J ? "is-on-canvas" : ""}`,
                  onClick: (le) => {
                    le.stopPropagation(), a(e.id, Y);
                  },
                  title: J ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: J ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Ic,
              {
                hostname: b,
                displayId: Y,
                activeSegments: U,
                viewportStartMs: m,
                viewportDurationMs: y,
                baseEpochMs: D,
                inPointMs: E,
                outPointMs: M,
                globalGaps: h,
                directorSegments: V,
                isAutoDirectorEnabled: r,
                gaps: ne,
                showDirectorCoverage: $
              }
            )
          ]
        },
        `${e.id}-${Y}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), $ && n && n();
      },
      onContextMenu: (R) => {
        v && (R.preventDefault(), R.stopPropagation(), v(R, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${$ ? "has-stepper" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${j}${N ? ` (${N})` : ""} • Click to select / expand`,
            children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (R) => {
                    R.stopPropagation(), n == null || n();
                  },
                  title: t ? "Collapse station tracks" : "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: j, children: j }),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (R) => {
                    R.stopPropagation(), l(e.id);
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
                  title: `Remove ${j} from project`,
                  onClick: (R) => {
                    R.stopPropagation(), f(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ic,
          {
            hostname: b,
            displayId: x,
            activeSegments: U,
            viewportStartMs: m,
            viewportDurationMs: y,
            baseEpochMs: D,
            inPointMs: E,
            outPointMs: M,
            globalGaps: h,
            isAutoDirectorEnabled: r,
            gaps: ne,
            stepperSegments: $ ? oe : null
          }
        )
      ]
    }
  );
}
const Br = /* @__PURE__ */ new Map(), $l = /* @__PURE__ */ new Map();
function Gd(e, t, n, r = 200) {
  return `${(e || "").toLowerCase()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const Mi = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 200) {
    const l = Gd(e, t, n, r);
    return Br.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 200) {
    if (!e || n <= t) return null;
    const o = Gd(e, t, n, l);
    if (Br.has(o))
      return Br.get(o);
    if ($l.has(o))
      return $l.get(o);
    const a = (async () => {
      try {
        const i = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(e)}&startEpoch=${Math.round(t)}&endEpoch=${Math.round(n)}&points=${l}`, c = await fetch(i, { signal: r });
        if (!c.ok) {
          if (c.status === 204) return null;
          throw new Error(`HTTP ${c.status}`);
        }
        const d = await c.json();
        if (Array.isArray(d) && d.length > 0)
          return Br.set(o, d), d;
      } catch (i) {
        if (i.name !== "AbortError") {
          const c = new Array(l).fill(0.03);
          return Br.set(o, c), c;
        }
      } finally {
        $l.delete(o);
      }
      return null;
    })();
    return $l.set(o, a), a;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    Br.clear(), $l.clear();
  }
};
function rx(e, t = 100, n = 24, r = 1) {
  if (!e || !Array.isArray(e) || e.length === 0) {
    const f = n / 2;
    return `M 0,${f} L ${t},${f}`;
  }
  const l = e.length, o = n / 2, a = n / 2 - 1.5, i = t / Math.max(1, l - 1), c = Math.max(0, Math.min(3, Number(r) || 1));
  let d = "";
  for (let f = 0; f < l; f++) {
    const m = f * i, y = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), E = o - y * a;
    d += f === 0 ? `M ${m.toFixed(2)},${E.toFixed(2)}` : ` L ${m.toFixed(2)},${E.toFixed(2)}`;
  }
  let v = "";
  for (let f = l - 1; f >= 0; f--) {
    const m = f * i, y = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), E = o + y * a;
    v += ` L ${m.toFixed(2)},${E.toFixed(2)}`;
  }
  return `${d}${v} Z`;
}
const Xd = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function lx({
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
  stationName: v
}) {
  const [f, m] = u.useState(() => Mi.get(e.sourceStationId, e.startEpochMs, e.endEpochMs) || null);
  u.useEffect(() => {
    let j = !0;
    const N = new AbortController(), T = Mi.get(e.sourceStationId, e.startEpochMs, e.endEpochMs);
    if (T) {
      m(T);
      return;
    }
    return Mi.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, N.signal, 180).then((x) => {
      j && x && m(x);
    }).catch(() => {
    }), () => {
      j = !1, N.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const y = e.startEpochMs, E = e.endEpochMs, M = (e.gain || 1) * (t.gain || 1), D = u.useMemo(() => rx(f, 100, 24, M), [f, M]), k = Math.max(i, y), p = Math.min(i + c, E), h = (k - i) / c * 100, b = (p - k) / c * 100;
  if (b <= 0) return null;
  const S = e.channelMode || t.channelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${h}%`,
        width: `${b}%`,
        borderLeftColor: n
      },
      onClick: l,
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${v} [${S.toUpperCase()}] (${wt(y, d, { includeSeconds: !0 })} - ${wt(E, d, { includeSeconds: !0 })}) • Gain: ${Math.round(e.gain * 100)}%`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (j) => a(j, "start"),
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
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: v }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${S}`, children: S.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
            Math.round(e.gain * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-right",
            onMouseDown: (j) => a(j, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function ox({
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
  onUpdateAudioPlan: m = null
}) {
  const y = u.useRef(null), [E, M] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [D, k] = u.useState(!1), [p, h] = u.useState(null), [b, S] = u.useState(1), [j, N] = u.useState([]), [T, x] = u.useState(null), [I, P] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const A = (G) => {
      G.detail && P(G.detail);
    };
    return window.addEventListener("itb-live-audio-level", A), () => window.removeEventListener("itb-live-audio-level", A);
  }, []);
  const K = u.useCallback(() => {
    M((A) => {
      const G = !A;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(G));
      } catch {
      }
      return G;
    });
  }, []), [$, U] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((A, G) => {
        var ae;
        return {
          id: `clip_${G}_${A.startEpochMs || A.StartEpochMs}`,
          startEpochMs: A.startEpochMs ?? A.StartEpochMs ?? l,
          endEpochMs: A.endEpochMs ?? A.EndEpochMs ?? l + r,
          sourceStationId: A.sourceStationId ?? A.SourceStationId ?? (((ae = t[0]) == null ? void 0 : ae.id) || "station-0"),
          gain: A.gain ?? A.Gain ?? 1,
          channelMode: A.channelMode ?? A.ChannelMode ?? "both"
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
  ]), ne = l + o, V = l + n, oe = V + r, C = u.useCallback((A) => {
    if (!m) return;
    const G = [];
    A.forEach((ae) => {
      ae.isMuted || D || ae.clips.forEach((re) => {
        G.push({
          startEpochMs: re.startEpochMs,
          endEpochMs: re.endEpochMs,
          sourceStationId: re.sourceStationId,
          gain: re.gain * ae.gain,
          channelMode: re.channelMode || ae.channelMode || "both"
        });
      });
    }), G.sort((ae, re) => ae.startEpochMs - re.startEpochMs), m({ segments: G });
  }, [m, D]);
  u.useEffect(() => {
    let A = null;
    for (const G of $)
      if (!(G.isMuted || D)) {
        for (const ae of G.clips)
          if (ne >= ae.startEpochMs && ne <= ae.endEpochMs) {
            const re = t.find((q) => q.id === ae.sourceStationId);
            A = {
              stationId: ae.sourceStationId,
              stationName: re ? re.displayName || re.hostname || re.id : ae.sourceStationId,
              channelMode: ae.channelMode || G.channelMode || "both",
              gain: ae.gain * G.gain,
              isPlaying: I.isPlaying
            };
            break;
          }
        if (A) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: A }));
  }, [$, D, ne, t, I.isPlaying]), u.useEffect(() => {
    const A = () => {
      j.length !== 0 && (U((re) => {
        const q = re.map((W) => ({
          ...W,
          clips: W.clips.filter((z) => !j.includes(z.id))
        }));
        return C(q), q;
      }), N([]), h(null));
    }, G = (re) => {
      if (re.key === "Delete" || re.key === "Backspace") {
        const q = re.target;
        if (q.tagName === "INPUT" || q.tagName === "TEXTAREA" || q.isContentEditable) return;
        j.length > 0 && (re.preventDefault(), A());
      }
    }, ae = () => A();
    return window.addEventListener("keydown", G), window.addEventListener("itb:studio-delete-selected", ae), () => {
      window.removeEventListener("keydown", G), window.removeEventListener("itb:studio-delete-selected", ae);
    };
  }, [j, C]);
  const R = u.useCallback(() => {
    U((A) => {
      const ae = `A${A.length + 1}`, re = {
        id: ae,
        name: `Track ${ae}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, q = [...A, re];
      return C(q), q;
    });
  }, [C]), F = u.useCallback((A) => {
    U((G) => {
      if (G.length <= 1) return G;
      const ae = G.filter((re) => re.id !== A);
      return C(ae), ae;
    });
  }, [C]), Y = u.useCallback((A) => {
    U((G) => {
      const ae = G.map((re) => re.id === A ? { ...re, isMuted: !re.isMuted } : re);
      return C(ae), ae;
    });
  }, [C]), B = u.useCallback((A) => {
    U((G) => {
      var q;
      const ae = (q = G.find((W) => W.id === A)) == null ? void 0 : q.isSolo, re = G.map((W) => ({
        ...W,
        isSolo: W.id === A ? !ae : !1,
        isMuted: W.id === A ? !1 : !ae
      }));
      return C(re), re;
    });
  }, [C]), se = u.useCallback((A) => {
    const G = ["both", "sys", "mic"];
    U((ae) => {
      const re = ae.map((q) => {
        if (q.id !== A) return q;
        const W = q.channelMode || "both", z = G[(G.indexOf(W) + 1) % G.length];
        return {
          ...q,
          channelMode: z,
          clips: q.clips.map((he) => ({ ...he, channelMode: z }))
        };
      });
      return C(re), re;
    });
  }, [C]), ee = u.useCallback((A, G) => {
    const ae = Math.max(0, Math.min(2, Number(G)));
    U((re) => {
      const q = re.map((W) => W.id === A ? { ...W, gain: ae } : W);
      return C(q), q;
    }), Hd(ae);
  }, [C]), J = u.useCallback((A, G) => {
    G && U((ae) => {
      const re = ae.map((q) => {
        if (q.id !== A) return q;
        if (q.clips.length === 0) {
          const W = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: G,
            gain: 1,
            channelMode: q.channelMode || "both"
          };
          return { ...q, clips: [W] };
        }
        return {
          ...q,
          clips: q.clips.map((W) => ({ ...W, sourceStationId: G }))
        };
      });
      return C(re), re;
    });
  }, [l, r, C]), le = u.useCallback((A, G = null, ae = null) => {
    var _e;
    const re = G || ((_e = t[0]) == null ? void 0 : _e.id) || "station-0", q = ae !== null ? ae : ne, W = Math.min(r, 6e4), z = q + W, he = $.find((Me) => Me.id === A), de = (he == null ? void 0 : he.channelMode) || "both", Ie = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(q),
      endEpochMs: Math.round(z),
      sourceStationId: re,
      gain: 1,
      channelMode: de
    };
    U((Me) => {
      const Ne = Me.map((nt) => nt.id === A ? {
        ...nt,
        clips: [...nt.clips, Ie].sort((Be, Tt) => Be.startEpochMs - Tt.startEpochMs)
      } : nt);
      return C(Ne), Ne;
    });
  }, [$, ne, r, t, C]), We = u.useCallback((A, G = null) => {
    U((ae) => {
      const re = ae.map((q) => {
        if (A && q.id !== A) return q;
        const W = [];
        return q.clips.forEach((z) => {
          (!G || z.id === G || j.includes(z.id)) && ne > z.startEpochMs + 500 && ne < z.endEpochMs - 500 ? (W.push({ ...z, endEpochMs: ne }), W.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: ne,
            endEpochMs: z.endEpochMs,
            sourceStationId: z.sourceStationId,
            gain: z.gain,
            channelMode: z.channelMode || q.channelMode || "both"
          })) : W.push(z);
        }), { ...q, clips: W };
      });
      return C(re), re;
    }), h(null);
  }, [ne, j, C]), Pe = u.useCallback(() => {
    We(null, null);
  }, [We]), we = u.useCallback((A, G) => {
    U((ae) => {
      const re = ae.map((q) => q.id !== A ? q : { ...q, clips: q.clips.filter((W) => W.id !== G) });
      return C(re), re;
    }), h(null);
  }, [C]), ze = u.useCallback((A, G, ae) => {
    U((re) => {
      const q = re.map((W) => W.id !== A ? W : {
        ...W,
        clips: W.clips.map((z) => z.id === G ? { ...z, sourceStationId: ae } : z)
      });
      return C(q), q;
    }), h((re) => re ? { ...re, stationId: ae } : null);
  }, [C]), Le = u.useCallback((A, G, ae) => {
    const re = Math.max(0, Math.min(2.5, Number(ae)));
    S(re), U((q) => {
      const W = q.map((z) => z.id !== A ? z : {
        ...z,
        clips: z.clips.map((he) => he.id === G ? { ...he, gain: re } : he)
      });
      return C(W), W;
    }), Hd(re);
  }, [C]), Se = u.useCallback((A, G, ae, re) => {
    A.preventDefault(), A.stopPropagation();
    const q = A.clientX, W = $.find((Me) => Me.id === G), z = W == null ? void 0 : W.clips.find((Me) => Me.id === ae);
    if (!z) return;
    const he = z.startEpochMs, de = z.endEpochMs, Ie = (Me) => {
      var Ke;
      const Ne = Me.clientX - q, nt = (Ke = y.current) == null ? void 0 : Ke.querySelector(".audio-lane-timeline");
      if (!nt) return;
      const Be = nt.getBoundingClientRect(), Tt = Ne / Be.width * r;
      U((Nt) => Nt.map((Ft) => Ft.id !== G ? Ft : {
        ...Ft,
        clips: Ft.clips.map((Je) => {
          if (Je.id !== ae) return Je;
          if (re === "start") {
            const Kt = Math.min(de - 500, he + Tt);
            return { ...Je, startEpochMs: Math.round(Kt) };
          } else {
            const Kt = Math.max(he + 500, de + Tt);
            return { ...Je, endEpochMs: Math.round(Kt) };
          }
        })
      }));
    }, _e = () => {
      window.removeEventListener("mousemove", Ie), window.removeEventListener("mouseup", _e), U((Me) => (C(Me), Me));
    };
    window.addEventListener("mousemove", Ie), window.addEventListener("mouseup", _e);
  }, [$, r, C]), He = (A, G, ae) => {
    A.preventDefault(), A.stopPropagation();
    const re = 260, q = 280, W = Math.max(16, Math.min(window.innerWidth - re - 16, A.clientX - re / 2));
    let z = A.clientY - q - 12;
    z < 140 && (z = Math.min(window.innerHeight - q - 16, A.clientY + 24)), S(ae.gain || 1), h({
      laneId: G,
      clipId: ae.id,
      s: ae.startEpochMs,
      e: ae.endEpochMs,
      x: W,
      y: z,
      stationId: ae.sourceStationId,
      gain: ae.gain || 1,
      channelMode: ae.channelMode || "both"
    });
  };
  u.useEffect(() => {
    if (!p) return;
    const A = () => h(null), G = (ae) => {
      ae.key === "Escape" && h(null);
    };
    return window.addEventListener("click", A), window.addEventListener("keydown", G), () => {
      window.removeEventListener("click", A), window.removeEventListener("keydown", G);
    };
  }, [p]);
  const ht = u.useMemo(() => $.reduce((A, G) => A + (G.isMuted ? 0 : G.clips.length), 0), [$]);
  return !t || t.length === 0 ? null : E ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: K,
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
            onClick: R,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Pe,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "master-vu-readout", children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: I.isPlaying ? `${I.db.toFixed(1)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "master-vu-bar-outer", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "master-vu-bar-inner",
              style: {
                width: `${Math.min(100, Math.max(0, I.rms * 120))}%`,
                background: I.db > -3 ? "#F43F5E" : I.db > -9 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${D ? "is-muted" : ""}`,
            onClick: () => k((A) => !A),
            title: D ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: D ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: $.map((A, G) => {
      const ae = Xd[G % Xd.length], re = t.find((W) => {
        var z, he;
        return W.id === (((z = A.clips[0]) == null ? void 0 : z.sourceStationId) || ((he = t[0]) == null ? void 0 : he.id));
      }), q = T === A.id;
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ae}26`, borderColor: `${ae}80`, color: ae }, children: A.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: A.name }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-lane-channel-mode mode-${A.channelMode || "both"}`,
              onClick: () => se(A.id),
              title: `Discrete Audio Channel: ${(A.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
              children: (A.channelMode || "both") === "mic" ? "🎤 MIC" : (A.channelMode || "both") === "sys" ? "🔊 SYS" : "🎧 BOTH"
            }
          ),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-dropdown-wrapper", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (re == null ? void 0 : re.id) || "",
              onChange: (W) => J(A.id, W.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((W) => /* @__PURE__ */ s.jsx("option", { value: W.id, children: W.displayName || W.hostname || W.id }, W.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${A.isMuted ? "active" : ""}`,
                onClick: () => Y(A.id),
                title: A.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${A.isSolo ? "active" : ""}`,
                onClick: () => B(A.id),
                title: A.isSolo ? "Unsolo Lane" : "Solo Lane",
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
                value: A.gain,
                onChange: (W) => ee(A.id, W.target.value),
                title: `Lane Gain: ${Math.round(A.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(A.gain * 100),
              "%"
            ] })
          ] }),
          $.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => F(A.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${q ? "is-drag-over" : ""}`,
            onClick: () => N([]),
            onDragOver: (W) => {
              W.preventDefault(), W.dataTransfer.dropEffect = "copy", T !== A.id && x(A.id);
            },
            onDragLeave: () => {
              T === A.id && x(null);
            },
            onDrop: (W) => {
              W.preventDefault(), x(null);
              const z = W.dataTransfer.getData("text/station-id") || W.dataTransfer.getData("text/plain");
              if (z) {
                const he = W.currentTarget.getBoundingClientRect(), de = Math.max(0, Math.min(1, (W.clientX - he.left) / he.width)), Ie = Math.round(V + de * r);
                le(A.id, z, Ie);
              }
            },
            onDoubleClick: (W) => {
              var Ie;
              const z = W.currentTarget.getBoundingClientRect(), he = Math.max(0, Math.min(1, (W.clientX - z.left) / z.width)), de = Math.round(V + he * r);
              le(A.id, (Ie = t[0]) == null ? void 0 : Ie.id, de);
            },
            children: [
              A.clips.map((W) => {
                const z = t.find((de) => de.id === W.sourceStationId), he = z ? z.displayName || z.hostname || z.id : W.sourceStationId;
                return W.endEpochMs <= V || W.startEpochMs >= oe ? null : /* @__PURE__ */ s.jsx(
                  lx,
                  {
                    clip: W,
                    lane: A,
                    laneColor: ae,
                    isSelected: j.includes(W.id),
                    onSelect: (de) => {
                      de.stopPropagation(), de.ctrlKey || de.metaKey ? N(
                        (Ie) => Ie.includes(W.id) ? Ie.filter((_e) => _e !== W.id) : [...Ie, W.id]
                      ) : N([W.id]);
                    },
                    onOpenMenu: (de) => He(de, A.id, W),
                    onTrimDrag: (de, Ie) => Se(de, A.id, W.id, Ie),
                    vpStartEpoch: V,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: he
                  },
                  W.id
                );
              }),
              A.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var W;
                    return le(A.id, (W = t[0]) == null ? void 0 : W.id, ne);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    A.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, A.id);
    }) }),
    p && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: p.x, top: p.y },
        onClick: (A) => A.stopPropagation(),
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
            /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((A) => {
              const G = A.id === p.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${G ? "is-selected" : ""}`,
                  onClick: () => ze(p.laneId, p.clipId, A.id),
                  children: A.displayName || A.hostname || A.id
                },
                A.id
              );
            }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME GAIN" }),
              /* @__PURE__ */ s.jsxs("span", { className: "gain-val", children: [
                Math.round(b * 100),
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
                value: b,
                onChange: (A) => Le(p.laneId, p.clipId, A.target.value),
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
                onClick: () => We(p.laneId, p.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => we(p.laneId, p.clipId),
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
      ref: y,
      onClick: K,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: ht > 0 ? `${ht} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: I.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-timeline collapsed-bus-timeline", children: [
          /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS — CLICK TO EXPAND MULTI-TRACK LANES (A1, A2...) ]" })
        ] })
      ]
    }
  );
}
function ax({
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
  inPointMs: m = 0,
  outPointMs: y = 36e5,
  timeMode: E = "LOCAL"
}) {
  const M = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [D, k] = u.useState(null), [p, h] = u.useState(null);
  fo.useEffect(() => {
    if (p === null) return;
    const x = (P) => {
      P.key === "Escape" && h(null);
    }, I = (P) => {
      !P.target.closest(".kf-inspector-popover") && !P.target.closest(".kf-marker-diamond") && h(null);
    };
    return window.addEventListener("keydown", x), window.addEventListener("mousedown", I), () => {
      window.removeEventListener("keydown", x), window.removeEventListener("mousedown", I);
    };
  }, [p]);
  const b = d + f, S = d + i, j = S + c, N = (x) => {
    const I = x.currentTarget.getBoundingClientRect(), P = x.clientX - I.left, K = Math.max(0, Math.min(1, P / I.width)), $ = Math.round(S + K * c);
    r && r($);
  }, T = (x, I, P) => {
    if (x.button !== 0) return;
    x.stopPropagation(), x.preventDefault();
    const K = x.clientX, $ = P.timestampEpochMs, U = P.id || `kf_${I}_${$}`, ne = x.currentTarget.closest(".track-surface");
    if (!ne) return;
    let V = !1;
    k({
      idx: I,
      kfId: U,
      startClientX: K,
      initialEpoch: $,
      currentEpoch: $
    });
    const oe = (R) => {
      const F = R.clientX - K;
      Math.abs(F) > 3 && (V = !0);
      const Y = ne.getBoundingClientRect(), B = F / Y.width * c;
      let se = Math.round($ + B);
      se = Math.max(d, Math.min(d + v, se));
      const ee = d + m, J = d + y, le = 14 / Y.width * c;
      Math.abs(se - b) <= le ? se = b : Math.abs(se - ee) <= le ? se = ee : Math.abs(se - J) <= le && (se = J), k((We) => We ? { ...We, currentEpoch: se } : null);
    }, C = (R) => {
      window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", C), k(null);
      const F = ne.getBoundingClientRect(), B = (R.clientX - K) / F.width * c;
      let se = Math.round($ + B);
      se = Math.max(d, Math.min(d + v, se));
      const ee = d + m, J = d + y, le = 14 / F.width * c;
      Math.abs(se - b) <= le ? se = b : Math.abs(se - ee) <= le ? se = ee : Math.abs(se - J) <= le && (se = J), V ? (o && o(U, se), n && n(I, se)) : (n && n(I, $), h((We) => We === I ? null : I));
    };
    window.addEventListener("mousemove", oe), window.addEventListener("mouseup", C);
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
          onClick: (x) => {
            x.stopPropagation(), r && r(b);
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
        onClick: N,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          M.map((x, I) => {
            const P = (D == null ? void 0 : D.idx) === I, K = P ? D.currentEpoch : x.timestampEpochMs;
            if (K < S - 5e4 || K > j + 5e4) return null;
            const $ = (K - S) / c * 100;
            if ($ < -2 || $ > 102) return null;
            const U = I === t, ne = wt(K, E, { includeSeconds: !0 }), V = `${x.transitionType || "smooth"} (${x.transitionDurationSec ?? 0.5}s)`, oe = Math.max(0, (K - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${U ? "is-active" : ""} ${P ? "is-dragging" : ""}`,
                style: { left: `${$}%` },
                onMouseDown: (C) => T(C, I, x),
                onContextMenu: (C) => {
                  C.preventDefault(), C.stopPropagation(), M.length > 1 && l && l(I);
                },
                title: `Keyframe #${I + 1} at ${ne} (+${oe}s) • ${V}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  P && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: ne }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      oe,
                      "s"
                    ] })
                  ] }),
                  p === I && !P && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (C) => C.stopPropagation(),
                      onMouseDown: (C) => C.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            I + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: ne }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (C) => {
                                C.stopPropagation(), h(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        I > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(x.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(I, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${x.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(I, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${x.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(I, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          x.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((C) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(x.transitionDurationSec ?? 0.5) === C ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(I, { transitionDurationSec: C }),
                                children: [
                                  C,
                                  "s"
                                ]
                              },
                              C
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (C) => {
                                C.stopPropagation(), l && l(I), h(null);
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
              `kf-${I}`
            );
          })
        ]
      }
    )
  ] });
}
function ix({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (x) => !r || r <= 0 ? "0%" : `${(x - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, m = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), E = Math.max(0, d), M = Math.min(100, v), D = Math.max(0, M - E), k = (x) => (I) => {
    I.preventDefault(), I.stopPropagation(), typeof i == "function" && i(x, I);
  }, p = d < 1.5, h = v > 98.5, b = d <= 0.2 && d >= -0.2, S = v >= 99.8 && v <= 100.2, j = f >= -0.2 && f < 3.5, N = f > 96.5 && f <= 100.2, T = u.useMemo(() => wt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    D > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${E}%`, width: `${D}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${p ? "flipped" : ""} ${b ? "at-edge" : ""}`,
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
        className: `marker out-marker ${h ? "flipped" : ""} ${S ? "at-edge" : ""}`,
        style: { left: c(a) },
        onMouseDown: k("out"),
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
        style: { left: `${y}%` },
        onMouseDown: k("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${j ? "edge-left" : ""} ${N ? "edge-right" : ""}`, children: T }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const cx = fo.memo(ix);
function ux({
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
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: wt(t + e.targetMs, n) })
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
  return _s.createPortal(v, document.body);
}
function dx({
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
const hx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function fx({
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
        const m = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, y = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
          signal: v.signal
        });
        if (y.ok) {
          const E = await y.json();
          a(E), d.current && d.current(E);
        }
      } catch (m) {
        m.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", m);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(f), v.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: hx };
}
function px({
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
  const [m, y] = u.useState(null), [E, M] = u.useState(null), D = (k, p) => {
    y(k), M({
      target: k,
      startX: p.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!m) return;
    const k = e * 0.015, p = (b) => {
      if (m === "minimap-viewport" && (f != null && f.current)) {
        const j = f.current.getBoundingClientRect(), T = Math.max(0, Math.min(b.clientX - j.left, j.width)) / j.width * t, x = Math.max(0, Math.min(T - e / 2, t - e));
        d(x);
        return;
      }
      const S = v(b.clientX);
      if (m === "playhead") {
        let j = S;
        Math.abs(j - l) <= k ? j = l : Math.abs(j - a) <= k && (j = a), r(Math.max(0, Math.min(t, j)));
      } else if (m === "in") {
        const j = a - 1e3;
        o(Math.max(0, Math.min(S, j)));
      } else if (m === "out") {
        const j = l + 1e3;
        i(Math.min(t, Math.max(S, j)));
      } else if (m === "range" && E) {
        const j = S - v(E.startX), N = E.initialOut - E.initialIn;
        let T = E.initialIn + j, x = E.initialOut + j;
        T < 0 ? (T = 0, x = N) : x > t && (x = t, T = t - N), o(T), i(x);
      }
    }, h = () => {
      y(null), M(null);
    };
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", h), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", h);
    };
  }, [
    m,
    E,
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
  ]), { draggingTarget: m, handleStartDrag: D };
}
const Ks = 4;
function Sp({
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
  onZoomReset: m,
  playheadMs: y = 0,
  setPlayheadMs: E,
  inPointMs: M = 0,
  setInPointMs: D,
  outPointMs: k = 36e5,
  setOutPointMs: p,
  onExport: h,
  recordingSegments: b = {},
  movieBoundaries: S,
  viewportStartMs: j = 0,
  onViewportStartChange: N,
  onEstimateLoaded: T,
  onFitRange: x,
  onJumpViewportTo: I,
  keystrokeMode: P = "BURN_IN",
  onChangeKeystrokeMode: K,
  keystrokes: $ = [],
  showKeystrokes: U = !1,
  showRulerKeystrokes: ne = !1,
  onToggleRulerKeystrokes: V,
  _onSplitDirectorSegment: oe,
  _onChangeDirectorSegmentDisplay: C,
  _onResetDirectorSegmentToAuto: R,
  audioRoutingPlan: F,
  onSplitAudioSegment: Y,
  onChangeAudioSegmentStation: B,
  onChangeAudioSegmentGain: se,
  onFollowVisualFeed: ee,
  isAutoFollowAudio: J,
  canvasLayoutTimeline: le,
  activeKfIndex: We = 0,
  onSelectKeyframe: Pe,
  onAddKeyframeAtEpoch: we,
  onDeleteKeyframe: ze,
  onUpdateKeyframeEpoch: Le,
  onToggleDisplayOnCanvas: Se,
  onUpdateAudioPlan: He
}) {
  var bn, Te, Ae, Ve, ft, bt, te, me;
  const [ht, A] = u.useState(null), [G, ae] = u.useState(0), [re, q] = u.useState(null), [W, z] = u.useState(!0), [he, de] = u.useState(() => {
    var Z;
    return e.length === 1 ? (Z = e[0]) == null ? void 0 : Z.id : null;
  });
  u.useEffect(() => {
    var Z;
    e.length === 1 && !he && ((Z = e[0]) != null && Z.id) && de(e[0].id);
  }, [e, he]);
  const Ie = u.useRef(null), _e = u.useRef(null), Me = d / Math.max(1, v), Ne = Math.ceil(e.length / Ks) || 1, nt = u.useMemo(() => {
    const Z = G * Ks;
    return e.slice(Z, Z + Ks);
  }, [e, G]);
  u.useEffect(() => {
    if (!t && !he) return;
    const Z = he || t, Ee = e.findIndex((Oe) => Oe.id === Z);
    if (Ee !== -1) {
      const Oe = Math.floor(Ee / Ks);
      Oe !== G && ae(Oe);
    }
  }, [t, he, e, G]);
  const Be = ((bn = le == null ? void 0 : le.keyframes) == null ? void 0 : bn[We]) || ((Te = le == null ? void 0 : le.keyframes) == null ? void 0 : Te[0]), Tt = u.useMemo(() => {
    var Z;
    return ((Z = Be == null ? void 0 : Be.layout) == null ? void 0 : Z.placements) || [];
  }, [Be]), Ke = u.useMemo(() => e.find((Z) => Z.id === t) || null, [e, t]), Nt = (S == null ? void 0 : S.globalFirstMs) ?? null, Ft = (S == null ? void 0 : S.globalLastMs) ?? null, Je = u.useMemo(() => (M > 500 || k < d - 500) && k - M >= 1e3, [M, k, d]), Kt = u.useMemo(() => e.map((Z) => Z.id).sort().join(","), [e]), { estimateData: Bt, isEstimating: kn, formatEstimateSize: Ze } = fx({
    stationIdsKey: Kt,
    inPointMs: M,
    outPointMs: k,
    baseEpochMs: i,
    onEstimateLoaded: T
  }), Xe = u.useCallback((Z) => {
    if (!Ie.current) return j;
    const Ee = Ie.current.getBoundingClientRect(), Oe = Ee.left + 200, Qe = Ee.width - 200 - 58;
    if (Qe <= 0) return j;
    const et = Math.max(0, Math.min(Z - Oe, Qe));
    return Math.round(j + et / Qe * Me);
  }, [j, Me]), { draggingTarget: jt, handleStartDrag: xn } = px({
    viewportDurationMs: Me,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: E,
    inPointMs: M,
    setInPointMs: D,
    outPointMs: k,
    setOutPointMs: p,
    viewportStartMs: j,
    setViewportStartMs: N,
    getMsFromClientX: Xe,
    minimapRef: _e
  }), Et = u.useRef(v);
  Et.current = v;
  const Ot = u.useRef(j);
  Ot.current = j;
  const tn = u.useRef(d);
  tn.current = d;
  const cn = u.useRef(y);
  cn.current = y, u.useEffect(() => {
    const Z = Ie.current;
    if (!Z) return;
    const Ee = (Oe) => {
      Oe.preventDefault(), Oe.stopPropagation();
      const Qe = Oe.ctrlKey || Oe.shiftKey, et = Et.current, Ye = Ot.current, ct = tn.current, Ct = cn.current;
      if (Qe) {
        const dt = Math.abs(Oe.deltaX) > Math.abs(Oe.deltaY) ? Oe.deltaX : Oe.deltaY;
        if (dt === 0) return;
        const pt = ct / Math.max(1, et), Ut = Math.max(0, ct - pt), Mt = pt * 0.08 * (dt > 0 ? 1 : -1);
        N == null || N(Math.max(0, Math.min(Ut, Ye + Mt)));
      } else {
        if (Oe.deltaY === 0) return;
        const pt = Oe.deltaY < 0 ? 1.25 : 0.8, Ut = Math.max(32, ct / 2e3), Mt = Z.getBoundingClientRect(), Dt = Mt.left + 200, wn = Mt.width - 200 - 58;
        let fn = 0.5;
        if (wn > 0)
          if (Oe.clientX >= Dt && Oe.clientX <= Mt.right - 58)
            fn = Math.max(0, Math.min(1, (Oe.clientX - Dt) / wn));
          else {
            const Mn = ct / Math.max(1, et), Pt = (Ct - Ye) / Mn;
            fn = Pt >= 0 && Pt <= 1 ? Pt : 0.5;
          }
        const Wt = Math.max(1, Math.min(Ut, Math.round(et * pt * 100) / 100));
        if (Wt === et) return;
        const as = ct / et, js = ct / Wt, ln = Ye + fn * as - fn * js, kt = Math.max(0, ct - js);
        f == null || f(Wt), N == null || N(Math.max(0, Math.min(kt, ln)));
      }
    };
    return Z.addEventListener("wheel", Ee, { passive: !1, capture: !0 }), () => Z.removeEventListener("wheel", Ee, { capture: !0 });
  }, [f, N]);
  const Dn = e.length > 0 && Math.abs(k - M) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Ie,
      className: "timeline-board-root",
      onContextMenu: (Z) => {
        var Oe;
        Z.preventDefault();
        const Ee = (Oe = Ie.current) == null ? void 0 : Oe.getBoundingClientRect();
        !Ee || Z.clientX - Ee.left < 200 || Z.clientX > Ee.right - 58 || q({ x: Z.clientX, y: Z.clientY, targetMs: Math.max(0, Math.min(d, Xe(Z.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Xg,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: M,
              setInPointMs: D,
              outPointMs: k,
              setOutPointMs: p
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Qg,
                {
                  minimapRef: _e,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: j,
                  viewportDurationMs: Me,
                  zoomLevel: v,
                  inPointMs: M,
                  outPointMs: k,
                  playheadMs: y,
                  onStartDragMinimap: xn
                }
              ),
              /* @__PURE__ */ s.jsx(
                Jg,
                {
                  earliestMediaMs: Nt,
                  latestMediaMs: Ft,
                  hasActiveCut: Je,
                  onJumpToFirst: () => {
                    Nt !== null && (E == null || E(Nt), I == null || I(Nt, "start"));
                  },
                  onJumpToLast: () => {
                    Ft !== null && (E == null || E(Ft), I == null || I(Ft, "end"));
                  },
                  onContextualFit: () => {
                    Je ? x == null || x(M, k) : Nt !== null && Ft !== null && Ft > Nt ? x == null || x(Nt, Ft) : m == null || m();
                  },
                  onResetZoom: m,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: P,
                  onChangeKeystrokeMode: K,
                  showRulerKeystrokes: ne,
                  onToggleRulerKeystrokes: V
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Gg,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Me,
                totalDurationMs: d,
                hoverMs: ht,
                onHoverChange: A,
                onSeek: (Z) => E == null ? void 0 : E(Z),
                inPointMs: M,
                outPointMs: k,
                earliestMediaMs: Nt,
                movieBoundaries: S,
                stationHostname: (Ke == null ? void 0 : Ke.hostname) || (Ke == null ? void 0 : Ke.id) || (Ke == null ? void 0 : Ke.name),
                activeStationName: (Ke == null ? void 0 : Ke.displayName) || (Ke == null ? void 0 : Ke.hostname) || (Ke == null ? void 0 : Ke.name),
                showKeystrokes: !!(ne ?? U),
                keystrokes: $
              }
            ) })
          ] })
        ] }),
        Ne > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G === 0,
              onClick: () => ae((Z) => Math.max(0, Z - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            G * Ks + 1,
            "–",
            Math.min(e.length, (G + 1) * Ks),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: G >= Ne - 1,
              onClick: () => ae((Z) => Math.min(Ne - 1, Z + 1)),
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
            onMouseMove: (Z) => {
              if (jt || !Ie.current) return;
              const Ee = Ie.current.getBoundingClientRect();
              Z.clientX >= Ee.left + 200 && Z.clientX <= Ee.right - 58 ? A(Xe(Z.clientX)) : A(null);
            },
            onMouseLeave: () => !jt && A(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => z((Z) => !Z), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: W ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  W && Ne > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G === 0,
                        onClick: (Z) => {
                          Z.stopPropagation(), ae((Ee) => Math.max(0, Ee - 1));
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
                      Ne,
                      " (",
                      G * Ks + 1,
                      "–",
                      Math.min(e.length, (G + 1) * Ks),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: G >= Ne - 1,
                        onClick: (Z) => {
                          Z.stopPropagation(), ae((Ee) => Math.min(Ne - 1, Ee + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !W && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => z(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && /* @__PURE__ */ s.jsx(
                    Ic,
                    {
                      hostname: ((Ae = e[0]) == null ? void 0 : Ae.hostname) || ((Ve = e[0]) == null ? void 0 : Ve.id),
                      displayId: "mon-0",
                      activeSegments: b[(ft = e[0]) == null ? void 0 : ft.id] || b[(bt = e[0]) == null ? void 0 : bt.hostname] || ((te = e[0]) == null ? void 0 : te.segments) || [],
                      viewportStartMs: j,
                      viewportDurationMs: Me,
                      baseEpochMs: i,
                      inPointMs: M,
                      outPointMs: k,
                      globalGaps: (Bt == null ? void 0 : Bt.removedGlobalGaps) || [],
                      isAutoDirectorEnabled: !1
                    }
                  ) })
                ] }),
                W && (e.length > 0 ? nt.map((Z) => {
                  const Ee = !!(t && Z.id === t), Oe = he === Z.id, Qe = o ? o[Z.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    sx,
                    {
                      station: Z,
                      isExpanded: Oe,
                      onToggleExpand: () => de((et) => et === Z.id ? null : Z.id),
                      isAutoDirectorEnabled: Qe,
                      onToggleAutoDirector: a,
                      canvasPlacements: Tt,
                      onToggleDisplayOnCanvas: Se,
                      directorPlan: Z.directorPlan,
                      isActive: Ee,
                      onSelect: () => n == null ? void 0 : n(Z.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Me,
                      inPointMs: M,
                      outPointMs: k,
                      baseEpochMs: i,
                      segments: b[Z.id] || b[Z.hostname] || Z.segments || [],
                      recordingSegments: b,
                      globalGaps: (Bt == null ? void 0 : Bt.removedGlobalGaps) || []
                    },
                    Z.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  ox,
                  {
                    audioPlan: F,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Me,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: Y,
                    onChangeSegmentStation: B,
                    onChangeSegmentGain: se,
                    onFollowVisualFeed: ee,
                    isAutoFollow: J,
                    timeMode: c,
                    onUpdateAudioPlan: He
                  }
                ),
                ((me = le == null ? void 0 : le.keyframes) == null ? void 0 : me.length) > 0 && /* @__PURE__ */ s.jsx(
                  ax,
                  {
                    canvasLayoutTimeline: le,
                    activeKfIndex: We,
                    onSelectKeyframe: Pe,
                    onAddKeyframeAtEpoch: we,
                    onDeleteKeyframe: ze,
                    onUpdateKeyframeEpoch: Le,
                    viewportStartMs: j,
                    viewportDurationMs: Me,
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
                dx,
                {
                  isRangeValid: Dn,
                  onExport: h,
                  isEstimating: kn,
                  estimateData: Bt,
                  formatEstimateSize: Ze,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          cx,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Me,
            playheadMs: y,
            inPointMs: M,
            outPointMs: k,
            onStartDrag: xn
          }
        ),
        /* @__PURE__ */ s.jsx(
          ux,
          {
            contextMenu: re,
            baseEpochMs: i,
            timeMode: c,
            onAction: (Z) => {
              re && (Z === "playhead" ? E == null || E(re.targetMs) : Z === "in" ? D == null || D(Math.max(0, Math.min(re.targetMs, k - 1e3))) : Z === "out" && (p == null || p(Math.min(d, Math.max(re.targetMs, M + 1e3)))), q(null));
            },
            onClose: () => q(null)
          }
        )
      ]
    }
  );
}
function mx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function gx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function xx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function yx({
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
  filteredCount: m,
  selectedInTabCount: y,
  unselectedInTabCount: E,
  activeTabName: M,
  onSelectAllInScope: D,
  onClearInScope: k,
  viewMode: p = "grid",
  onViewModeChange: h,
  isDrawerMode: b = !1
}) {
  const [S, j] = u.useState(!1), N = v !== "all", T = !M || M.toLowerCase() === "all", x = T ? "Select All" : `Select ${M}`, I = T ? "Clear All" : `Clear ${M}`;
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
            onChange: (P) => t(P.target.value)
          }
        )
      ] }),
      b && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${S ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => j(!S),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !b && h && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
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
    l.length > 1 && (b ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (P) => a(P.target.value),
          children: l.map((P) => {
            const K = P.id === "all" ? c.map((U) => U.id) : P.stationIds || [], $ = K.filter((U) => d.includes(U)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: P.id, children: [
              P.name,
              " (",
              $,
              "/",
              K.length,
              ")"
            ] }, P.id);
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
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((P) => {
        const K = o === P.id, $ = P.id === "all" ? c.map((V) => V.id) : P.stationIds || [], U = $.length, ne = $.filter((V) => d.includes(V)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${K ? "active" : ""}`,
            onClick: () => a(P.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: P.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${ne > 0 ? "has-selected" : ""}`, children: [
                ne,
                "/",
                U
              ] })
            ]
          },
          P.id
        );
      }) })
    ] })),
    (!b || S) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${b ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
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
              E,
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
      !b && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: D, children: [
          "+ ",
          x
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          I
        ] })
      ] })
    ] })
  ] });
}
function vx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const i = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, f = (m) => {
    if (m === n) return !0;
    const y = Math.min(n, r), E = Math.min(m, r), M = Math.ceil(r / n), D = Math.ceil(r / m);
    return y !== E || M !== D;
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((m) => {
        const y = n === m, E = !f(m);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${E ? "redundant-disabled" : ""}`,
            disabled: E,
            onClick: () => o(m),
            title: E ? `All stations already fit on screen (Total: ${r})` : `Show ${m} per page`,
            children: m
          },
          m
        );
      }) })
    ] })
  ] });
}
function Nx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, a] = u.useState(!1), i = u.useRef(null);
  u.useEffect(() => {
    const m = (y) => {
      i.current && !i.current.contains(y.target) && a(!1);
    };
    return o && document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [o]);
  const c = u.useMemo(() => {
    const m = new Map(t.map((y) => [y.id, y]));
    return e.map((y) => m.get(y) || { id: y, hostname: `Station ${y}` });
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
      d.map((m) => {
        const y = m.displayName || m.hostname || m.name || m.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: y, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: y }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (E) => {
                E.stopPropagation(), n(m.id);
              },
              title: `Remove ${y}`,
              children: "✕"
            }
          )
        ] }, m.id);
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((m) => {
            const y = m.displayName || m.hostname || m.name || m.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: y, children: y }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(m.id),
                  title: `Remove ${y}`,
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
const bp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Qd(e, t, n = bp) {
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
function kx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function wx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function jx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = bp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? wx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = Qd(0, !0, r);
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
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const f = l, m = l + o, y = [];
  for (const N of t) {
    const T = Math.max(N.startEpoch, f), x = Math.min(N.endEpoch, m);
    x > T && y.push({ startEpoch: T, endEpoch: x });
  }
  y.sort((N, T) => N.startEpoch - T.endEpoch);
  const E = [];
  for (const N of y)
    if (E.length === 0)
      E.push({ ...N });
    else {
      const T = E[E.length - 1];
      N.startEpoch <= T.endEpoch + 1e3 ? T.endEpoch = Math.max(T.endEpoch, N.endEpoch) : E.push({ ...N });
    }
  let M = 0;
  for (const N of E)
    M += N.endEpoch - N.startEpoch;
  const D = o > 0 ? M / o * 100 : 0, k = D > 0 && D < 1 ? Number(D.toFixed(1)) : Math.min(100, Math.round(D)), p = [];
  let h = f, b = 0;
  for (const N of E) {
    if (N.startEpoch > h + 2e3) {
      const I = (N.startEpoch - h) / o * 100, P = (h - f) / o * 100;
      p.push({
        type: "gap",
        startPct: Math.max(0, P),
        widthPct: Math.min(100, I)
      }), b++;
    }
    const T = (N.endEpoch - N.startEpoch) / o * 100, x = (N.startEpoch - f) / o * 100;
    p.push({
      type: "rec",
      startPct: Math.max(0, x),
      widthPct: Math.min(100, T)
    }), h = N.endEpoch;
  }
  if (h < m - 2e3) {
    const N = (m - h) / o * 100, T = (h - f) / o * 100;
    p.push({
      type: "gap",
      startPct: Math.max(0, T),
      widthPct: Math.min(100, N)
    }), b++;
  }
  const S = b > 0 || k < 100, j = Qd(k, S, r);
  return {
    coveragePct: k,
    recordedDuration: kx(M),
    totalRecordedMs: M,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: S,
    gapsCount: b,
    trafficStatus: j,
    segments: p.length > 0 ? p : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Ex = Object.freeze([]), Cx = 12;
function Sx({
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
  systemTabs: m = Ex,
  recordingSegments: y = {},
  baseEpochMs: E = 0,
  durationMs: M = 0
}) {
  const [D, k] = u.useState([]), [p, h] = u.useState("all"), [b, S] = u.useState(""), [j, N] = u.useState(!0), [T, x] = u.useState("all"), [I, P] = u.useState(null), [K, $] = u.useState(!1), [U, ne] = u.useState(15), [V, oe] = u.useState(8), [C, R] = u.useState(1), F = u.useRef(!1), Y = u.useRef(null), B = c && r.length === 0, se = r.length === 0 && !c;
  let ee = "is-closed";
  i || se || B ? ee = "is-full-width" : e && (ee = "is-open"), u.useLayoutEffect(() => {
    const z = () => {
      if (!Y.current) return;
      const de = Y.current.clientHeight;
      if (de <= 0) return;
      const Ie = Y.current.querySelector(".station-row, .hub-table-row"), _e = Ie ? Ie.offsetHeight : 40;
      if (_e > 0) {
        const Ne = Math.floor(de / _e) - 2, Be = [5, 10, 15, 20, 25, 30].filter((Tt) => Tt <= Ne).pop() || 5;
        ne(Be);
      }
      const Me = Y.current.clientWidth;
      if (Me > 0) {
        const Be = Math.max(1, Math.floor((Me + 12) / 252)), Ke = Math.max(1, Math.floor((de + 12) / (175 + 12))), Nt = Math.max(Be * Ke, Be);
        oe(Nt);
      }
    };
    z(), window.addEventListener("resize", z);
    const he = new ResizeObserver(z);
    return Y.current && he.observe(Y.current), () => {
      window.removeEventListener("resize", z), he.disconnect();
    };
  }, [I, r.length]), u.useEffect(() => {
    if (m && m.length > 0) {
      k(m);
      return;
    }
    if (F.current || !e && !i) return;
    F.current = !0;
    let z = !0;
    return (async () => {
      $(!0);
      try {
        const de = await fetch("/api/v1/dashboard/tabs");
        if (de.ok && z) {
          const Ie = await de.json();
          Array.isArray(Ie) && k(Ie);
        }
      } catch (de) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", de);
      } finally {
        z && $(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [e, i, m]);
  const J = u.useMemo(() => {
    const z = D.length > 0 ? D : m;
    if (z && z.length > 0) {
      const he = z.map((de) => {
        const Ie = de.hostnames || de.assignedHostnames || de.stations || de.stationIds || [], _e = r.filter((Me) => {
          const Ne = (Me.hostname || Me.name || "").trim().toLowerCase();
          return Ie.some((nt) => typeof nt == "string" ? nt.trim().toLowerCase() === Ne || Ne.includes(nt.trim().toLowerCase()) : (nt.hostname || nt.name || "").trim().toLowerCase() === Ne);
        }).map((Me) => Me.id);
        return {
          id: String(de.id || de.tabId || de.name),
          name: de.name || "Tab",
          stationIds: _e
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((de) => de.id) },
        ...he.filter((de) => de.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((he) => he.id) }];
  }, [D, m, r]), le = u.useMemo(() => J.find((z) => z.id === p) || J[0], [J, p]), We = u.useMemo(() => !le || le.id === "all" ? r.map((z) => z.id) : le.stationIds || [], [le, r]), Pe = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((z) => z.isLoaded || z.segments && z.segments.length > 0).length : r.filter((z) => y[z.id] !== void 0 || z.isLoaded).length, [r, y]), we = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Pe < r.length && Object.keys(y).length > 0), [d, c, r.length, Pe, y]), ze = u.useMemo(() => {
    const z = /* @__PURE__ */ new Map(), he = { baseEpochMs: E, durationMs: M };
    for (const de of r) {
      const _e = !(y && y[de.id] !== void 0 || de.isLoaded === !0 || de.segments && de.segments.length > 0) && (we || c || d), Me = y && y[de.id] || de.segments || [], Ne = jx(de, Me, he);
      z.set(de.id, {
        ...Ne,
        hasAudio: de.hasAudio !== void 0 ? de.hasAudio : Ne == null ? void 0 : Ne.hasAudio,
        audioLabel: de.audioLabel || (de.hasAudio ? "AAC" : (Ne == null ? void 0 : Ne.audioLabel) || "NONE"),
        audioChannels: de.audioChannels ? de.audioChannels === 1 ? "Mono" : "Stereo" : Ne == null ? void 0 : Ne.audioChannels,
        feedSpec: de.feedSpec || (Ne == null ? void 0 : Ne.feedSpec) || `${de.resolution || "1080p"} • ${de.fps || 30}fps`,
        resolution: de.resolution || (Ne == null ? void 0 : Ne.resolution) || "1080p",
        fps: de.fps || (Ne == null ? void 0 : Ne.fps) || 30,
        isLoading: _e
      });
    }
    return z;
  }, [r, y, E, M, we, c, d]), Le = u.useMemo(() => r.filter((z) => {
    const he = ze.get(z.id), de = y && y[z.id] && y[z.id].length > 0 || z.segments && z.segments.length > 0, Ie = he && (he.coveragePct > 0 || he.totalRecordedMs > 0), _e = typeof z.recordingsCount == "number" && z.recordingsCount > 0;
    return he && !he.isLoading ? Ie || de : _e || de;
  }), [r, ze, y]), Se = u.useMemo(() => Le.filter((z) => {
    if (le.id !== "all" && !We.includes(z.id) || !(z.displayName || z.hostname || z.name || "").toLowerCase().includes(b.toLowerCase())) return !1;
    const de = l.includes(z.id), Ie = ze.get(z.id);
    return T === "selected" ? de : T === "unselected" ? !de : T === "gaps" ? Ie == null ? void 0 : Ie.hasGaps : T === "audio" ? Ie == null ? void 0 : Ie.hasAudio : !0;
  }).sort((z, he) => j ? (z.displayName || z.hostname || "").localeCompare(he.displayName || he.hostname || "") : 0), [Le, le, We, b, T, l, j, ze]), He = u.useMemo(() => I !== null ? I : Se.length > Cx ? "table" : "grid", [I, Se.length]), ht = He === "table" ? U : V, A = Math.max(1, Math.ceil(Se.length / ht));
  u.useEffect(() => {
    R(1);
  }, [p, b, T, He]), u.useEffect(() => {
    C > A && R(A);
  }, [A, C]);
  const G = u.useMemo(() => {
    if (ee !== "is-full-width") return Se;
    const z = (C - 1) * ht;
    return Se.slice(z, z + ht);
  }, [Se, C, ht, ee]), ae = () => {
    if (!a) return;
    const z = le.id === "all" ? Se.map((he) => he.id) : We;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...z])));
  }, re = () => {
    if (!a) return;
    const z = new Set(
      le.id === "all" ? Se.map((he) => he.id) : We
    );
    a(l.filter((he) => !z.has(he)));
  }, q = We.filter((z) => l.includes(z)).length, W = Se.filter((z) => l.includes(z.id)).length;
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
            we && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Pe,
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
            onClick: ae,
            disabled: Se.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                Se.length,
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
            onClick: re,
            disabled: W === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                W,
                ")"
              ] })
            ]
          }
        )
      ] }),
      we && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Pe / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: B ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : se ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: f, children: "Change Time Scope" })
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
      ee === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${we ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: we ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: we ? `ANALYZING TIMELINE ARCHIVES • ${Pe} OF ${Le.length} STATIONS SYNCED (${Le.length > 0 ? Math.min(100, Math.round(Pe / Le.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Le.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: we ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(Pe / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        yx,
        {
          searchTerm: b,
          onSearchChange: S,
          sortAlpha: j,
          onToggleSort: () => N(!j),
          effectiveTabs: J,
          selectedTabId: p,
          onSelectTab: (z) => {
            h(z), P(null);
          },
          isLoadingTabs: K,
          allStations: Le,
          selectedStationIds: l,
          filterMode: T,
          onFilterModeChange: x,
          filteredCount: Se.length,
          selectedInTabCount: q,
          unselectedInTabCount: We.length - q,
          activeTabName: le.name,
          onSelectAllInScope: ae,
          onClearInScope: re,
          viewMode: He,
          onViewModeChange: ee === "is-full-width" ? P : null,
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
              onClick: ae,
              disabled: Se.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  Se.length,
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
              onClick: re,
              disabled: W === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  W,
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
      ee === "is-full-width" && He === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: Y,
          className: `station-list ${ee === "is-full-width" ? He === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: G.map((z) => {
            const he = l.includes(z.id), de = ze.get(z.id);
            return ee === "is-full-width" ? He === "grid" ? /* @__PURE__ */ s.jsx(
              mx,
              {
                station: z,
                isSelected: he,
                onToggle: o,
                meta: de
              },
              z.id
            ) : /* @__PURE__ */ s.jsx(
              gx,
              {
                station: z,
                isSelected: he,
                onToggle: o,
                meta: de
              },
              z.id
            ) : /* @__PURE__ */ s.jsx(
              xx,
              {
                station: z,
                isSelected: he,
                onToggle: o,
                meta: de
              },
              z.id
            );
          })
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsx(
        vx,
        {
          currentPage: C,
          totalPages: A,
          pageSize: ht,
          totalItems: Se.length,
          onPageChange: R,
          onPageSizeChange: (z) => {
            He === "table" ? ne(z) : oe(z), R(1);
          },
          viewMode: He
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Nx,
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
const Tn = (e) => String(e).padStart(2, "0"), bx = [
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
], Mx = [
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
function Jd({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, i] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: f, m, s: y } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const x = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, x[0] || 0)),
      m: Math.min(59, Math.max(0, x[1] || 0)),
      s: Math.min(59, Math.max(0, x[2] || 0))
    };
  }, [e]), E = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const M = () => {
    const I = a.replace(/[^0-9:]/g, "").trim().split(":").filter((ne) => ne.length > 0);
    let P = 0, K = 0, $ = 0;
    I.length >= 1 && (P = Math.min(23, Math.max(0, parseInt(I[0], 10) || 0))), I.length >= 2 && (K = Math.min(59, Math.max(0, parseInt(I[1], 10) || 0))), I.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(I[2], 10) || 0)));
    const U = l ? `${Tn(P)}:${Tn(K)}:${Tn($)}` : `${Tn(P)}:${Tn(K)}`;
    i(U), t && t(U, { h: P, m: K, s: $ });
  }, D = (x) => {
    let I = f;
    x === "AM" && f >= 12 ? I = f - 12 : x === "PM" && f < 12 && (I = f + 12);
    const P = l ? `${Tn(I)}:${Tn(m)}:${Tn(y)}` : `${Tn(I)}:${Tn(m)}`;
    i(P), t && t(P, { h: I, m, s: y });
  }, k = u.useCallback((x, I) => {
    if (!v.current) return null;
    const P = v.current.getBoundingClientRect(), K = P.left + P.width / 2, $ = P.top + P.height / 2, U = x.clientX - K, ne = x.clientY - $;
    let V = Math.atan2(ne, U) * 180 / Math.PI + 90;
    if (V < 0 && (V += 360), I === "hours") {
      const oe = Math.round(V / 30) % 12;
      return E ? oe === 0 ? 12 : oe + 12 : oe === 0 ? 0 : oe;
    }
    return Math.round(V / 6) % 60;
  }, [E]), p = u.useCallback((x, I) => {
    let P = f, K = m, $ = y;
    x === "hours" ? P = I : x === "minutes" ? K = I : x === "seconds" && ($ = I);
    const U = l ? `${Tn(P)}:${Tn(K)}:${Tn($)}` : `${Tn(P)}:${Tn(K)}`;
    i(U), t && t(U, { h: P, m: K, s: $ });
  }, [f, m, y, l, t]), h = (x, I) => {
    I.preventDefault(), I.stopPropagation(), d(x);
    const P = k(I, x);
    P !== null && p(x, P);
  };
  u.useEffect(() => {
    if (!c) return;
    const x = (P) => {
      const K = k(P, c);
      K !== null && p(c, K);
    }, I = () => {
      d(null);
    };
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", I);
    };
  }, [c, k, p]);
  const b = u.useMemo(() => f % 12 * 30, [f]), S = u.useMemo(() => m % 60 * 6, [m]), j = u.useMemo(() => y % 60 * 6, [y]), N = E ? Mx : bx, T = u.useMemo(() => {
    const x = [];
    for (let I = 0; I < 60; I++) {
      const P = (I * 6 - 90) * (Math.PI / 180), K = I % 5 === 0, $ = 104, U = K ? 93 : 98;
      x.push({
        index: I,
        x1: 110 + U * Math.cos(P),
        y1: 110 + U * Math.sin(P),
        x2: 110 + $ * Math.cos(P),
        y2: 110 + $ * Math.sin(P),
        isMajor: K
      });
    }
    return x;
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
              onClick: () => D("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${E ? "active" : ""}`,
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
            onChange: (x) => i(x.target.value),
            onBlur: M,
            onKeyDown: (x) => {
              x.key === "Enter" && x.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: T.map((x) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: x.x1,
              y1: x.y1,
              x2: x.x2,
              y2: x.y2,
              className: `dial-tick ${x.isMajor ? "major" : "minor"}`
            },
            `tick-${x.index}`
          )) }),
          N.map((x) => {
            const I = (x.angle - 90) * (Math.PI / 180), P = 76, K = 110 + P * Math.cos(I), $ = 110 + P * Math.sin(I), U = f === x.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: K,
                y: $,
                className: `dial-num ${U ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: x.label
              },
              `dial-h-${x.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
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
                    onPointerDown: (x) => h("hours", x)
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
                    onPointerDown: (x) => h("minutes", x)
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
                    onPointerDown: (x) => h("seconds", x)
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
const Bo = 7 * 24 * 60 * 60 * 1e3, zt = (e) => String(e).padStart(2, "0");
function Ix({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, m] = u.useState("00:00:00"), [y, E] = u.useState("00:00:00"), [M, D] = u.useState(() => /* @__PURE__ */ new Date()), [k, p] = u.useState(null), [h, b] = u.useState([]), [S, j] = u.useState(!1), [N, T] = u.useState(""), [x, I] = u.useState(1), [P, K] = u.useState(2), [$, U] = u.useState(null), ne = u.useCallback(() => {
    try {
      const A = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (A) {
        const G = JSON.parse(A);
        Array.isArray(G) && b(G);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((A) => A.ok ? A.json() : null).then((A) => {
      Array.isArray(A) && A.length > 0 && b(A);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    ne();
    let A = n == null ? void 0 : n.startEpochMs, G = n == null ? void 0 : n.endEpochMs;
    if (!A || isNaN(A))
      if (n != null && n.start) {
        const q = String(n.start).replace(" ", "T"), W = new Date(q).getTime();
        A = isNaN(W) ? Date.now() - 24 * 3600 * 1e3 : W;
      } else
        G = Date.now(), A = G - 24 * 3600 * 1e3;
    if (!G || isNaN(G))
      if (n != null && n.end) {
        const q = String(n.end).replace(" ", "T"), W = new Date(q).getTime();
        G = isNaN(W) ? Date.now() : W;
      } else
        G = A + 24 * 3600 * 1e3;
    U(null);
    const ae = Er(A, o), re = Er(G, o);
    c(`${ae.year}-${zt(ae.month)}-${zt(ae.day)}`), v(`${re.year}-${zt(re.month)}-${zt(re.day)}`), m(`${zt(ae.hour)}:${zt(ae.minute)}:${zt(ae.second)}`), E(`${zt(re.hour)}:${zt(re.minute)}:${zt(re.second)}`), D(new Date(Date.UTC(ae.year, ae.month - 1, 1)));
  }, [e, n, o, ne]);
  const V = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), oe = d || i, C = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), R = u.useMemo(() => oe ? `${oe}T${y}` : "", [oe, y]), F = u.useMemo(() => {
    const A = {};
    return h.forEach((G) => {
      const ae = G.startTime || G.start, re = G.endTime || G.end || ae;
      if (!ae) return;
      const q = String(ae).substring(0, 10), W = String(re).substring(0, 10), [z, he, de] = q.split("-").map(Number), [Ie, _e, Me] = W.split("-").map(Number);
      if (isNaN(z) || isNaN(he) || isNaN(de) || isNaN(Ie) || isNaN(_e) || isNaN(Me)) return;
      let Ne = new Date(Date.UTC(z, he - 1, de));
      const nt = new Date(Date.UTC(Ie, _e - 1, Me));
      for (; Ne.getTime() <= nt.getTime(); ) {
        const Be = `${Ne.getUTCFullYear()}-${zt(Ne.getUTCMonth() + 1)}-${zt(Ne.getUTCDate())}`;
        A[Be] || (A[Be] = []), A[Be].push(G), Ne.setUTCDate(Ne.getUTCDate() + 1);
      }
    }), A;
  }, [h]), Y = async (A, G) => {
    if (G && G.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ae = h.filter((re) => (re.id || re.startTime) !== A);
    b(ae);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ae)), localStorage.setItem("itb_bookmarks", JSON.stringify(ae)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ae }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, { method: "DELETE" });
    } catch {
    }
  }, B = (A) => {
    const G = A.startTime || A.start, ae = A.endTime || A.end;
    if (!G || !ae) return;
    const re = G.substring(0, 10), q = G.includes("T") ? G.split("T")[1].substring(0, 8) : "00:00:00", W = ae.substring(0, 10), z = ae.includes("T") ? ae.split("T")[1].substring(0, 8) : "23:59:59";
    c(re), v(W), m(q), E(z);
    const [he, de] = re.split("-").map(Number);
    D(new Date(Date.UTC(he, de - 1, 1))), j(!1);
  }, se = (A) => {
    l ? (l(A), t && t()) : B(A);
  }, ee = u.useMemo(() => {
    if (o === "UTC" || !C.includes("T")) return { isAmbiguous: !1 };
    const [A, G] = C.split("T");
    return Sa(A, G);
  }, [C, o]), J = u.useMemo(() => {
    if (o === "UTC" || !R.includes("T")) return { isAmbiguous: !1 };
    const [A, G] = R.split("T");
    return Sa(A, G);
  }, [R, o]), le = u.useMemo(() => {
    if (!i || !oe) return null;
    const A = jc(i, f, o, x), G = jc(oe, y, o, P);
    return A === null || G === null || isNaN(A) || isNaN(G) ? null : { startEpoch: A, endEpoch: G, durationMs: G - A };
  }, [i, f, oe, y, o, x, P]), We = u.useMemo(() => !le || le.durationMs <= 0 ? [] : gp(le.startEpoch, le.endEpoch), [le]), Pe = u.useMemo(() => {
    if (!le || le.durationMs <= 0) return "0h";
    const A = le.durationMs / (1e3 * 60 * 60);
    return A >= 24 ? `${(A / 24).toFixed(1)}d (${A.toFixed(0)}h)` : `${A.toFixed(1)}h`;
  }, [le]), we = u.useMemo(() => {
    const A = M.getUTCFullYear(), G = M.getUTCMonth(), ae = new Date(Date.UTC(A, G, 1)).getUTCDay(), re = new Date(Date.UTC(A, G + 1, 0)).getUTCDate(), q = [];
    for (let W = 0; W < ae; W++) q.push(null);
    for (let W = 1; W <= re; W++) q.push(`${A}-${zt(G + 1)}-${zt(W)}`);
    return q;
  }, [M]), ze = (A) => {
    if (A) {
      if (U(null), !i || i && d)
        c(A), v("");
      else if (i && !d)
        if (A < i)
          c(A), v("");
        else {
          const G = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(A + "T00:00:00Z")).getTime() - G > Bo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const re = new Date(G + Bo);
            v(`${re.getUTCFullYear()}-${zt(re.getUTCMonth() + 1)}-${zt(re.getUTCDate())}`);
          } else
            v(A);
        }
    }
  }, Le = (A, G) => {
    U(G);
    const ae = Date.now(), re = ae - A, q = Er(re, o), W = Er(ae, o);
    c(`${q.year}-${zt(q.month)}-${zt(q.day)}`), v(`${W.year}-${zt(W.month)}-${zt(W.day)}`), m(`${zt(q.hour)}:${zt(q.minute)}:${zt(q.second)}`), E(`${zt(W.hour)}:${zt(W.minute)}:${zt(W.second)}`), D(new Date(Date.UTC(q.year, q.month - 1, 1)));
  }, Se = () => {
    if (V(), !le || isNaN(le.startEpoch) || isNaN(le.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (le.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (le.durationMs > Bo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: C,
      end: R,
      startEpochMs: le.startEpoch,
      endEpochMs: le.endEpoch,
      durationMs: le.durationMs,
      timeMode: o
    }), t && t();
  }, He = u.useMemo(() => {
    if (!N.trim()) return h;
    const A = N.toLowerCase();
    return h.filter(
      (G) => (G.title || G.name || "").toLowerCase().includes(A) || (G.startTime || "").includes(A)
    );
  }, [h, N]);
  if (!e) return null;
  const ht = o === "UTC";
  return _s.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (A) => A.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${ht ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: ht ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ht ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ht ? "active" : ""}`,
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
      We.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: We.map((A) => `${A.description} (${A.labelBefore} ➔ ${A.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "7d" ? "active" : ""}`,
            onClick: () => Le(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => Le(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => Le(24 * 3600 * 1e3, "24h"),
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
            onClick: () => Le(8 * 3600 * 1e3, "8h"),
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
                onChange: (A) => T(A.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            He.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: He.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : He.map((A) => {
          var W;
          const G = A.id || A.startTime, ae = A.title || A.name || "Untitled Mission", re = (A.startTime || "").replace("T", " "), q = (A.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => B(A), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ae }),
                A.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  A.cutStationName
                ] }),
                ((W = A.stationIds) == null ? void 0 : W.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  A.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                re,
                " ➔ ",
                q
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (z) => {
                    z.stopPropagation(), B(A);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (z) => {
                    z.stopPropagation(), se(A);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (z) => Y(G, z),
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
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: M.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((A) => new Date(Date.UTC(A.getUTCFullYear(), A.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((A) => new Date(Date.UTC(A.getUTCFullYear(), A.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: we.map((A, G) => {
            if (!A) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${G}`);
            const ae = parseInt(A.split("-")[2], 10), re = A === i, q = A === (d || i), W = d || k, z = i && W && A > i && A < W, he = F[A], de = !!(he && he.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${re ? "start-edge" : ""} ${q ? "end-edge" : ""} ${z ? "in-range" : ""} ${de ? "has-bookmark" : ""}`,
                onClick: () => ze(A),
                onMouseEnter: () => !d && i && p(A),
                onMouseLeave: () => p(null),
                title: de ? `${he.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ae }),
                  de && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Ie) => {
                        Ie.stopPropagation(), j(!0), T(A);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        he.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: he.length })
                      ]
                    }
                  )
                ]
              },
              A
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: V, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Jd,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (A) => {
                V(), m(A), U(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Jd,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (A) => {
                V(), E(A), U(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ee.isAmbiguous || J.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
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
                className: x === 1 ? "active" : "",
                onClick: () => I(1),
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
                className: x === 2 ? "active" : "",
                onClick: () => I(2),
                children: [
                  "2nd Occurrence (",
                  ee.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        J.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            J.transition.labelBefore,
            " / ",
            J.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: P === 1 ? "active" : "",
                onClick: () => K(1),
                children: [
                  "1st Occurrence (",
                  J.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: P === 2 ? "active" : "",
                onClick: () => K(2),
                children: [
                  "2nd Occurrence (",
                  J.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: le && le.durationMs > Bo ? "#f43f5e" : "#22d3ee" }, children: Pe }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: We.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Se, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Mp = "extractor_incident_bookmarks_fallback", Tx = ["itb_studio_bookmarks", "itb_bookmarks", Mp];
function Ax({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [m, y] = u.useState(!1), [E, M] = u.useState(null), [D, k] = u.useState(""), p = u.useCallback(($) => {
    Tx.forEach((U) => {
      try {
        localStorage.setItem(U, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), h = u.useCallback(async () => {
    f(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const U = await $.json(), ne = Array.isArray(U) ? U : [];
        i(ne), p(ne);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      f(!1);
    }
    try {
      const $ = localStorage.getItem(Mp) || localStorage.getItem("itb_studio_bookmarks");
      $ && i(JSON.parse($));
    } catch {
    }
  }, [p]);
  if (u.useEffect(() => {
    e && h();
  }, [e, h]), !e) return null;
  const b = async () => {
    var ee, J, le, We, Pe, we;
    if (!c.trim() || m) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ee = n == null ? void 0 : n.timeRange) != null && ee.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), U = (n == null ? void 0 : n.inPointMs) ?? 0, ne = (n == null ? void 0 : n.outPointMs) ?? (((J = n == null ? void 0 : n.timeRange) == null ? void 0 : J.durationMs) || 0), V = (n == null ? void 0 : n.playheadMs) ?? U, oe = $ + U, C = $ + ne, R = $ + V, F = (n == null ? void 0 : n.selectedStationIds) || [], Y = (n == null ? void 0 : n.selectedStationNames) || [], B = ((le = n == null ? void 0 : n.allStationIds) == null ? void 0 : le.length) > 0 ? n.allStationIds : F, se = {
      title: c.trim(),
      startTime: ((We = n == null ? void 0 : n.timeRange) == null ? void 0 : We.start) || "",
      endTime: ((Pe = n == null ? void 0 : n.timeRange) == null ? void 0 : Pe.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: U,
      outPointMs: ne,
      playheadMs: V,
      inEpochMs: oe,
      outEpochMs: C,
      playheadEpochMs: R,
      selectedStationIds: F,
      selectedStationNames: Y,
      allStationIds: B,
      stationIds: F.length > 0 ? F : B,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const ze = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(se)
      });
      if (ze.ok) {
        const Le = await ze.json(), He = [{
          ...se,
          ...Le.bookmark || {},
          inEpochMs: oe,
          outEpochMs: C,
          playheadEpochMs: R,
          selectedStationIds: F,
          selectedStationNames: Y,
          allStationIds: B,
          id: ((we = Le.bookmark) == null ? void 0 : we.id) || Le.id || `bm_${Date.now()}`
        }, ...a];
        i(He), p(He), d("");
      } else
        throw new Error(`Server returned ${ze.status}`);
    } catch (ze) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", ze);
      const Se = [{
        ...se,
        inEpochMs: oe,
        outEpochMs: C,
        playheadEpochMs: R,
        selectedStationIds: F,
        selectedStationNames: Y,
        allStationIds: B,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Se), p(Se), d("");
    } finally {
      y(!1);
    }
  }, S = async ($, U) => {
    if (U.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ne = a.filter((V) => (V.id || V.startTime) !== $);
    i(ne), p(ne);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (V) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", V);
    }
  }, j = ($, U) => {
    U.stopPropagation(), M($.id || $.startTime), k($.title || $.name || "");
  }, N = async ($, U) => {
    if (U && U.stopPropagation(), !D.trim()) return;
    const ne = a.find((C) => (C.id || C.startTime) === $), V = D.trim(), oe = a.map(
      (C) => (C.id || C.startTime) === $ ? { ...C, title: V, name: V } : C
    );
    i(oe), p(oe), M(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ne, title: V })
      });
    } catch (C) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", C);
    }
  }, T = ($) => {
    $.stopPropagation(), M(null);
  }, x = ($) => !$ || isNaN($) ? "--:--:--" : wt($, o), I = ($) => {
    const U = $.startTime || $.StartTime, ne = $.endTime || $.EndTime;
    if (!U) return "--";
    const V = String(U).replace("T", " ").substring(0, 19), oe = ne ? String(ne).replace("T", " ").substring(0, 19) : V;
    return `${V} ➔ ${oe}`;
  }, P = ($) => {
    let U = $.inEpochMs || $.InEpochMs, ne = $.outEpochMs || $.OutEpochMs;
    if (!U || !ne) {
      const V = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), oe = $.inPointMs ?? $.InPointMs, C = $.outPointMs ?? $.OutPointMs;
      V && typeof oe == "number" && typeof C == "number" && (oe > 0 || C > 0) && (U = V + oe, ne = V + C);
    }
    if (U && ne && !isNaN(U) && !isNaN(ne) && U > 0) {
      const V = x(U), oe = x(ne), C = Math.max(0, ne - U), R = Math.floor(C / 6e4), F = Math.floor(R / 60), Y = R % 60, B = F > 0 ? `${F}h ${Y}m` : `${R}m`;
      return { timeText: `${V} ➔ ${oe}`, duration: B };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, K = ($) => {
    const U = $.selectedStationNames || [], ne = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return U.length > 0 ? U.join(", ") : ne.length > 0 ? ne.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return _s.createPortal(
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
              onKeyDown: ($) => $.key === "Enter" && b(),
              disabled: m,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !m ? "active" : ""}`,
            onClick: b,
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
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: v ? "SYNCING..." : `${a.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: a.length === 0 && !v ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : a.map(($) => {
        var R, F, Y;
        const U = $.id || $.startTime, ne = E === U, V = P($), oe = K($), C = ((R = $.allStationIds) == null ? void 0 : R.length) || ((F = $.selectedStationIds) == null ? void 0 : F.length) || ((Y = $.stationIds) == null ? void 0 : Y.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${ne ? "is-editing" : ""}`,
            onClick: () => {
              ne || (r && r($), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                ne ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (B) => B.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: D,
                      onChange: (B) => k(B.target.value),
                      onKeyDown: (B) => {
                        B.key === "Enter" && N(U, B), B.key === "Escape" && T(B);
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
                        onClick: (B) => N(U, B),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: T,
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
                    /* @__PURE__ */ s.jsx("strong", { children: I($) })
                  ] }),
                  C > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    C,
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
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${oe}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: oe })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (B) => B.stopPropagation(), children: [
                !ne && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (B) => j($, B),
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
                    onClick: (B) => S(U, B),
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
          U
        );
      }) })
    ] }) }),
    document.body
  );
}
function $x(e) {
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
function Rx(e, t) {
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
function Lx({
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
  recordingSegments: m = {},
  globalGaps: y = [],
  showWatermark: E = !0,
  directorPlan: M,
  onOverrideDisplay: D,
  onResetOverride: k,
  viewMode: p,
  onViewModeChange: h,
  onOpenFullscreen: b,
  isPipSwapped: S,
  onPipSwapChange: j,
  className: N = ""
}) {
  const T = u.useRef(null), x = u.useRef(null), I = u.useRef(null), P = u.useRef(r), K = u.useRef(r), $ = u.useRef(r), U = u.useRef(!1), ne = u.useRef(null), V = u.useRef(o), oe = u.useRef(!1);
  P.current = r;
  const C = e == null ? void 0 : e.id, R = e && (e.hostname || e.name) || "", F = u.useMemo(() => {
    var Ee, Oe, Qe, et;
    const te = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ee = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ee.displays) || ((Oe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Oe.Displays) || ((Qe = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Qe.Displays) || ((et = e == null ? void 0 : e.topology) == null ? void 0 : et.displays) || [];
    if (!Array.isArray(te) || te.length === 0) return [];
    const me = te.length > 1 && te.every((Ye) => (Ye.X ?? Ye.x ?? 0) === 0 && (Ye.Y ?? Ye.y ?? 0) === 0);
    let Z = 0;
    return te.map((Ye, ct) => {
      const Ct = Ye.Width || Ye.width || 1920, dt = Ye.Height || Ye.height || 1080, pt = me ? Z : Ye.X ?? Ye.x ?? ct * Ct, Ut = me ? 0 : Ye.Y ?? Ye.y ?? 0;
      me && (Z += Ct);
      const Mt = (Ye.displayId ?? Ye.DisplayId ?? `mon-${ct}`).toLowerCase(), Dt = Ye.displayNumber ?? Ye.DisplayNumber ?? ct + 1, Wt = (Ye.displayName || Ye.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Dt}`, as = !!(Ye.isPrimary ?? Ye.IsPrimary ?? ct === 0);
      return {
        ...Ye,
        displayId: Mt,
        DisplayId: Mt,
        displayIndex: ct,
        displayNumber: Dt,
        DisplayNumber: Dt,
        displayName: Wt,
        DisplayName: Wt,
        isPrimary: as,
        IsPrimary: as,
        x: pt,
        y: Ut,
        X: pt,
        Y: Ut,
        width: Ct,
        height: dt,
        Width: Ct,
        Height: dt
      };
    });
  }, [e]), Y = F.length > 1, [B, se] = u.useState(() => {
    if (!Y) return "mon-0";
    try {
      const te = localStorage.getItem("itb_solo_viewmode");
      if (te) return te;
    } catch {
    }
    return "canvas";
  }), J = Y ? p !== void 0 ? p : B : "mon-0", le = u.useCallback((te) => {
    const me = typeof te == "function" ? te(J) : te;
    se(me);
    try {
      localStorage.setItem("itb_solo_viewmode", me);
    } catch {
    }
    h && h(me);
  }, [J, h]), [We, Pe] = u.useState(!1), we = S !== void 0 ? S : We, ze = u.useCallback((te) => {
    const me = typeof te == "function" ? te(we) : te;
    Pe(me), j && j(me);
  }, [we, j]), Le = u.useMemo(() => {
    const te = M || (e == null ? void 0 : e.directorPlan);
    if (!te || !te.segments || te.segments.length === 0) return null;
    const me = t + r;
    return te.segments.find((Z) => {
      const Ee = Z.startEpochMs ?? Z.StartEpochMs ?? 0, Oe = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      return me >= Ee && me <= Oe;
    }) || te.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t, r]), Se = u.useMemo(() => {
    var te, me;
    if (!Y) return "mon-0";
    if (J === "split" || J === "pip" || J === "canvas" || J === "all-displays") {
      const Z = (((te = F[0]) == null ? void 0 : te.displayId) ?? "mon-0").toLowerCase(), Ee = (((me = F[1]) == null ? void 0 : me.displayId) ?? "mon-1").toLowerCase();
      return we ? Ee : Z;
    }
    return J !== "director" ? J.toLowerCase() : ((Le == null ? void 0 : Le.targetDisplayId) ?? (Le == null ? void 0 : Le.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [Y, J, Le, F, we]), He = u.useMemo(() => {
    var me;
    if (!Y) return null;
    const te = F.find((Z) => (Z.displayId ?? Z.DisplayId ?? "").toLowerCase() !== Se);
    return te ? (te.displayId ?? te.DisplayId).toLowerCase() : (((me = F[1]) == null ? void 0 : me.displayId) || "mon-1").toLowerCase();
  }, [Y, F, Se]), ht = u.useMemo(() => {
    const te = F.find((Z) => (Z.displayId ?? "").toLowerCase() === (Se || "").toLowerCase());
    if (te) return te.displayName || `Screen ${te.displayNumber || 1}`;
    if (Se === "mon-0" || Se === "0") return "Screen 1";
    if (Se === "mon-1" || Se === "1") return "Screen 2";
    const me = (Se || "").match(/\d+/);
    if (me) {
      const Z = parseInt(me[0], 10);
      return `Screen ${(Se || "").startsWith("mon-") ? Z + 1 : Z}`;
    }
    return (Se || "Screen 1").toUpperCase();
  }, [F, Se]), A = u.useMemo(() => {
    const te = F.find((me) => (me.displayId ?? "").toLowerCase() === (He || "").toLowerCase());
    return te ? te.displayName || `Screen ${te.displayNumber || 2}` : "Screen 2";
  }, [F, He]), G = u.useMemo(() => J !== "director" && J !== "split" && J !== "pip" && J !== "canvas" ? !0 : !!((Le == null ? void 0 : Le.isManualOverride) ?? (Le == null ? void 0 : Le.IsManualOverride)), [J, Le]), [ae, re] = u.useState({}), q = u.useRef(null), [W, z] = u.useState({ width: 0, height: 0 }), he = u.useMemo(() => $x(F), [F]);
  u.useEffect(() => {
    if (!Y || J !== "canvas" && J !== "all-displays" || o)
      return;
    const te = () => {
      const Z = q.current;
      if (!Z) return;
      const Ee = 48, Oe = 72, Qe = Math.max(100, Z.clientWidth - Ee), et = Math.max(100, Z.clientHeight - Oe), Ye = he.totalWidth || 1920, ct = he.totalHeight || 1080, Ct = Ye / ct;
      let dt = Qe, pt = dt / Ct;
      pt > et && (pt = et, dt = pt * Ct), z({ width: Math.round(dt), height: Math.round(pt) });
    };
    te();
    const me = new ResizeObserver(te);
    return q.current && me.observe(q.current), () => me.disconnect();
  }, [Y, J, he]);
  const de = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!Y || J !== "canvas" && J !== "all-displays")
      return;
    let te = !0;
    const me = new AbortController(), Z = de;
    F.forEach((Oe, Qe) => {
      const et = (Oe.displayId ?? Oe.DisplayId ?? `mon-${Qe}`).toLowerCase(), Ye = An.get(R, Z, et);
      Ye ? re((ct) => ({ ...ct, [et]: Ye })) : An.fetchFrame(R, Z, me.signal, et).then((ct) => {
        te && ct && re((Ct) => ({ ...Ct, [et]: ct }));
      });
    });
    const Ee = An.subscribe((Oe, Qe, et, Ye) => {
      Oe === R && Qe === Z && Ye && te && re((ct) => ({ ...ct, [Ye.toLowerCase()]: et }));
    });
    return () => {
      te = !1, me.abort(), Ee();
    };
  }, [Y, J, F, R, de]);
  const Ie = u.useRef(Se), _e = u.useMemo(() => e ? m[e.id] || m[e.hostname] || e.segments || [] : [], [e, m]), Me = t + r, Ne = u.useMemo(() => _e.length === 0 ? !0 : _e.some((te) => {
    const me = (te.startEpochMs ?? te.startEpoch ?? 0) - 2e3, Z = (te.endEpochMs ?? te.endEpoch ?? 0) + 2e3;
    return Me >= me && Me <= Z;
  }), [_e, Me]), nt = !Ne && _e.length > 0, [Be, Tt] = u.useState("A"), [Ke, Nt] = u.useState(""), [Ft, Je] = u.useState(""), [Kt, Bt] = u.useState(""), [kn, Ze] = u.useState(null), [Xe, jt] = u.useState(!1), [xn, Et] = u.useState(!1), [Ot, tn] = u.useState(() => {
    if (!R) return null;
    const te = Math.round(t + r);
    return An.get(R, te, Se) || null;
  }), [cn, Dn] = u.useState(null), bn = Be === "A" ? T : x, Te = u.useCallback(() => {
    const te = il();
    T.current && (T.current.volume = te.volume, T.current.muted = Be !== "A" || te.isMuted, T.current.defaultPlaybackRate = i, T.current.playbackRate = i, Be === "A" && !te.isMuted && ba(T.current)), x.current && (x.current.volume = te.volume, x.current.muted = Be !== "B" || te.isMuted, x.current.defaultPlaybackRate = i, x.current.playbackRate = i, Be === "B" && !te.isMuted && ba(x.current)), I.current && (I.current.muted = !0, I.current.defaultPlaybackRate = i, I.current.playbackRate = i);
  }, [Be, i]);
  u.useEffect(() => {
    const te = (me) => {
      me.detail && (T.current && (T.current.volume = me.detail.volume), x.current && (x.current.volume = me.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", te), () => window.removeEventListener("itb-audio-state-changed", te);
  }, []), u.useEffect(() => {
    T.current && (T.current.defaultPlaybackRate = i, T.current.playbackRate = i), x.current && (x.current.defaultPlaybackRate = i, x.current.playbackRate = i), I.current && (I.current.defaultPlaybackRate = i, I.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!C || !R) return;
    if (o) {
      V.current = !0;
      return;
    }
    const te = V.current;
    V.current = o;
    let me = !0;
    const Z = new AbortController(), Ee = Math.round(t + r), Oe = An.get(R, Ee, Se);
    if (Oe) {
      tn(Oe);
      return;
    }
    const et = setTimeout(() => {
      me && An.fetchFrame(R, Ee, Z.signal, Se).then((ct) => {
        me && ct && tn(ct);
      });
    }, te ? 25 : 35), Ye = An.subscribe((ct, Ct, dt, pt) => {
      ct === R && Ct === Ee && (!pt || pt === Se) && me && tn(dt);
    });
    return () => {
      me = !1, clearTimeout(et), Z.abort(), Ye();
    };
  }, [C, R, t, r, o, Xe, Se]), u.useEffect(() => {
    if (!Y || J !== "split" && J !== "pip" || !He || o) {
      Dn(null);
      return;
    }
    let te = !0;
    const me = new AbortController(), Z = Math.round(t + r), Ee = An.get(R, Z, He);
    if (Ee) {
      Dn(Ee);
      return;
    }
    const Oe = setTimeout(() => {
      te && An.fetchFrame(R, Z, me.signal, He).then((et) => {
        te && et && Dn(et);
      });
    }, 40), Qe = An.subscribe((et, Ye, ct, Ct) => {
      et === R && Ye === Z && (!Ct || Ct === He) && te && Dn(ct);
    });
    return () => {
      te = !1, clearTimeout(Oe), me.abort(), Qe();
    };
  }, [Y, J, He, C, R, t, r]);
  const Ae = u.useCallback((te, me = Se) => {
    const Z = Math.round(t), Ee = Math.round(t + n), Oe = Math.min(Ee, Math.max(Z, Math.round(t + te)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(R)}&startEpoch=${Z}&endEpoch=${Ee}&seekEpoch=${Oe}&displayId=${encodeURIComponent(me)}&_t=${Date.now()}`;
  }, [t, n, R, Se]);
  u.useEffect(() => {
    if (!(!C || !R))
      if (o && Ne) {
        const te = P.current;
        K.current = te, $.current = te, U.current = !1;
        const me = Ae(te, Se);
        jt(!1), Et(!0), Tt("A"), Nt(me), Je(""), Ze(null), Bt((J === "split" || J === "pip") && He ? Ae(te, He) : "");
      } else o || (ne.current && clearTimeout(ne.current), U.current = !1, Nt(""), Je(""), Bt(""), Ze(null), jt(!1), Et(!1), T.current && T.current.pause(), x.current && x.current.pause(), I.current && I.current.pause());
  }, [o, C, R, Ne, Ae, Se, J, He]), u.useEffect(() => {
    if (Ie.current !== Se && (Ie.current = Se, o && Ne)) {
      const te = P.current;
      K.current = te;
      const me = Ae(te, Se);
      jt(!1), Et(!0), Tt("A"), Nt(me), Je("");
    }
  }, [Se, o, Ne, Ae]), u.useEffect(() => {
    if (!C || !R) return;
    const te = Math.abs(r - $.current);
    if (!o || te < 15) {
      $.current = r;
      return;
    }
    return U.current = !0, $.current = r, K.current = r, T.current && T.current.pause(), x.current && x.current.pause(), I.current && I.current.pause(), jt(!1), Et(!0), ne.current && clearTimeout(ne.current), ne.current = setTimeout(() => {
      if (!Ne) {
        Nt(""), Je(""), Bt(""), Et(!1), U.current = !1;
        return;
      }
      const me = P.current, Z = Ae(me, Se);
      Tt("A"), Nt(Z), Je(""), Ze(null), (J === "split" || J === "pip") && He && Bt(Ae(me, He));
    }, 75), () => {
      ne.current && clearTimeout(ne.current);
    };
  }, [r, o, C, R, Ne, Ae, Se, J, He]), u.useEffect(() => {
    if (!o || !Xe || _e.length === 0) return;
    const te = t + P.current, me = _e.map((Z) => ({
      start: Z.startEpochMs ?? Z.startEpoch ?? 0,
      end: Z.endEpochMs ?? Z.endEpoch ?? 0
    })).filter((Z) => Z.start > te + 500).sort((Z, Ee) => Z.start - Ee.start)[0];
    if (me && (!kn || kn.start !== me.start)) {
      const Z = me.start - t;
      if (Z < v) {
        const Ee = Ae(Z, Se);
        Ze({ start: me.start, ms: Z }), Be === "A" ? Je(Ee) : Nt(Ee);
      }
    }
  }, [o, Xe, r, t, v, _e, kn, Be, Ae, Se]);
  const Ve = u.useCallback(() => {
    if (kn) {
      const te = Be === "A" ? "B" : "A", me = te === "A" ? T : x;
      Tt(te), K.current = kn.ms, $.current = kn.ms, Ze(null), me.current && me.current.play().then(() => {
        Te();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [kn, Be, Te, f, d, l, a]), ft = u.useCallback(() => {
    const te = bn.current;
    if (!te || U.current || !o || oe.current) return;
    const me = te.currentTime * 1e3, Z = Math.round(K.current + me);
    if (y && y.length > 0) {
      const Ee = t + Z, Oe = y.find((Qe) => Ee >= Qe.startEpochMs && Ee < Qe.endEpochMs);
      if (Oe) {
        oe.current = !0;
        const Qe = Math.round(Oe.endEpochMs - t) + 10;
        l(Qe), setTimeout(() => {
          oe.current = !1;
        }, 150);
        return;
      }
    }
    if (Z >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    $.current = Z, l(Z);
  }, [bn, o, t, y, v, f, d, l, a]), bt = xn && o && !nt;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${J} ${N}`, children: [
    Y && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (te) => te.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "director" ? "active" : ""}`,
          onClick: () => le("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "canvas" ? "active" : ""}`,
          onClick: () => le("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "split" ? "active" : ""}`,
          onClick: () => le("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "pip" ? "active" : ""}`,
          onClick: () => le("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      F.map((te, me) => {
        const Z = (te.displayId ?? `mon-${me}`).toLowerCase(), Ee = te.displayNumber ?? me + 1, Oe = te.displayName || `Screen ${Ee}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${J === Z ? "active" : ""}`,
            onClick: () => le(Z),
            title: `Pin directly to ${Oe}`,
            children: [
              "🖥️ ",
              Ee
            ]
          },
          Z
        );
      }),
      J === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          F.map((te, me) => {
            const Z = (te.displayId ?? `mon-${me}`).toLowerCase(), Ee = te.displayNumber ?? me + 1, Oe = te.displayName || `Screen ${Ee}`, Qe = Se === Z;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Qe ? "active" : ""} ${G && Qe ? "is-override" : ""}`,
                onClick: () => {
                  D == null || D(C, t + r, Z);
                },
                title: `Punch ${Oe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ee
                  ] }),
                  Qe && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: G ? "✋" : "⚡" })
                ]
              },
              `punch-${Z}`
            );
          }),
          G && k && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                k == null || k(C, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    Y && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${G ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: J === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : J === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : J === "pip" ? `🪟 PiP MODE: ${ht.toUpperCase()} (HERO)` : `${G ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${ht.toUpperCase()}` }),
      G && J === "director" && k && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => k == null ? void 0 : k(C, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    Ke && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: T,
        src: Ke,
        className: "feed-video-element",
        style: {
          opacity: Xe && Be === "A" ? 1 : 0,
          zIndex: Be === "A" ? 3 : 1,
          pointerEvents: Be === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Be === "A",
        preload: "auto",
        muted: Be !== "A" || il().isMuted,
        onCanPlay: () => {
          Te(), o && Be === "A" && T.current && T.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Be === "A" && (U.current = !1, jt(!0), Et(!1), T.current && (T.current.defaultPlaybackRate = i, T.current.playbackRate = i));
        },
        onWaiting: () => {
          Be === "A" && Et(!0);
        },
        onTimeUpdate: () => {
          var te;
          Be === "A" && (!Xe && ((te = T.current) == null ? void 0 : te.currentTime) > 0 && (U.current = !1, jt(!0), Et(!1), T.current && (T.current.defaultPlaybackRate = i, T.current.playbackRate = i)), ft());
        },
        onError: () => {
          Be === "A" && (U.current = !1, Et(!1), jt(!1));
        },
        onEnded: () => {
          Be === "A" && Ve();
        }
      }
    ),
    Ft && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: x,
        src: Ft,
        className: "feed-video-element",
        style: {
          opacity: Xe && Be === "B" ? 1 : 0,
          zIndex: Be === "B" ? 3 : 1,
          pointerEvents: Be === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: Be === "B",
        preload: "auto",
        muted: Be !== "B" || il().isMuted,
        onCanPlay: () => {
          Te(), o && Be === "B" && x.current && x.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Be === "B" && (U.current = !1, jt(!0), Et(!1), x.current && (x.current.defaultPlaybackRate = i, x.current.playbackRate = i));
        },
        onWaiting: () => {
          Be === "B" && Et(!0);
        },
        onTimeUpdate: () => {
          var te;
          Be === "B" && (!Xe && ((te = x.current) == null ? void 0 : te.currentTime) > 0 && (U.current = !1, jt(!0), Et(!1), x.current && (x.current.defaultPlaybackRate = i, x.current.playbackRate = i)), ft());
        },
        onError: () => {
          Be === "B" && (U.current = !1, Et(!1), jt(!1));
        },
        onEnded: () => {
          Be === "B" && Ve();
        }
      }
    ),
    J !== "split" && J !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: Xe ? 0 : 2 },
        children: nt ? /* @__PURE__ */ s.jsx(Np, { isPlaying: o }) : Ot && Ot !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
    J === "split" && Y && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
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
    J === "pip" && Y && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (te) => {
          te.stopPropagation(), ze((me) => !me);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              A.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          cn && cn !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: cn, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (J === "canvas" || J === "all-displays") && Y && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: q, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: W.width ? `${W.width}px` : "92%",
            height: W.height ? `${W.height}px` : "auto",
            aspectRatio: `${he.totalWidth} / ${he.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: F.map((te, me) => {
            const Z = Rx(te, he), Ee = (te.displayId ?? te.DisplayId ?? `mon-${me}`).toLowerCase(), Oe = ae[Ee] || (Ee === Se ? Ot : null), Qe = !!(te.isPrimary ?? te.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${Qe ? "is-primary" : ""}`,
                style: {
                  left: `${Z.leftPct}%`,
                  top: `${Z.topPct}%`,
                  width: `${Z.widthPct}%`,
                  height: `${Z.heightPct}%`
                },
                onClick: (et) => {
                  et.stopPropagation(), b ? b(Ee) : le(Ee);
                },
                title: `Display ${me + 1} (${te.width || 1920}x${te.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Qe ? "★ " : "",
                      "🖥 ",
                      me + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: te.displayName || te.DisplayName || Ee.toUpperCase() }),
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
                        onClick: (et) => {
                          et.stopPropagation(), b(Ee);
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
                      alt: Ee
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      te.displayName || Ee.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ee
            );
          })
        }
      )
    ] }),
    bt && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          R,
          " • ",
          Se.toUpperCase()
        ] })
      ] })
    ] }) }),
    J === "director" && Le && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Se.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        wt(Le.startEpochMs ?? Le.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        wt(Le.endEpochMs ?? Le.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    Y && J !== "canvas" && /* @__PURE__ */ s.jsx(
      kp,
      {
        displays: F,
        activeDisplayId: Se,
        mode: G ? "MANUAL" : "AUTO",
        activeTimeRange: Le ? `${wt(Le.startEpochMs ?? Le.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${wt(Le.endEpochMs ?? Le.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (te) => {
          D && D(C, t + r, te), le(te);
        }
      }
    ),
    E && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      R
    ] }) })
  ] });
}
const Ii = 2200, Ti = 400;
function Ox({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + ea, f = e - v;
      if (f >= 0 && f <= Ii)
        return {
          ...d,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let a = 1;
  if (o.elapsed > Ii - Ti) {
    const c = (o.elapsed - (Ii - Ti)) / Ti;
    a = Math.max(0, 1 - c);
  }
  if (a <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Ep(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = jp(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(fo.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const Dx = [
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
function Ip({ isOpen: e, onClose: t }) {
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Dx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const Zd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, i = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(a)}.${c(i)}`;
};
function Px({
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
  onFitRange: m,
  onJumpViewportTo: y,
  viewportStartMs: E = 0,
  onViewportStartChange: M,
  playheadMs: D = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: p,
  inPointMs: h = 0,
  setInPointMs: b,
  outPointMs: S = 36e5,
  setOutPointMs: j,
  recordingSegments: N = {},
  globalGaps: T = [],
  onExport: x,
  isPlaying: I,
  setIsPlaying: P,
  isLooping: K = !0,
  setIsLooping: $,
  playbackSpeed: U,
  setPlaybackSpeed: ne,
  keystrokeMode: V = "BURN_IN",
  onChangeKeystrokeMode: oe,
  keystrokes: C = [],
  showRulerKeystrokes: R = !1,
  onToggleRulerKeystrokes: F,
  directorPlan: Y,
  onOverrideDisplay: B,
  onSplitDirectorSegment: se,
  onChangeDirectorSegmentDisplay: ee,
  onResetDirectorSegmentToAuto: J
}) {
  var cn, Dn, bn;
  const [le, We] = u.useState(!1), Pe = I !== void 0 ? I : le, we = u.useCallback((Te) => {
    const Ae = typeof Te == "function" ? Te(Pe) : Te;
    P ? P(Ae) : We(Ae), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Ae } }));
  }, [Pe, P]), [ze, Le] = u.useState(!0), Se = K !== void 0 ? K : ze, He = $ || Le, [ht, A] = u.useState(1), G = U !== void 0 ? U : ht, ae = ne || A, [re, q] = u.useState(null), [W, z] = u.useState(!1), [he, de] = u.useState(T), Ie = ((cn = t == null ? void 0 : t.displays) == null ? void 0 : cn.length) > 1 || ((bn = (Dn = t == null ? void 0 : t.topology) == null ? void 0 : Dn.displays) == null ? void 0 : bn.length) > 1, [_e, Me] = u.useState(() => {
    if (!Ie) return "mon-0";
    if (n) return n;
    try {
      const Te = localStorage.getItem("itb_spotlight_viewmode");
      if (Te) return Te;
    } catch {
    }
    return "canvas";
  }), Ne = u.useCallback((Te) => {
    Me((Ae) => {
      const Ve = typeof Te == "function" ? Te(Ae) : Te;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Ve);
      } catch {
      }
      return Ve;
    });
  }, []), [nt, Be] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Ie) {
        Me("mon-0");
        return;
      }
      if (n)
        Me(n);
      else
        try {
          const Te = localStorage.getItem("itb_spotlight_viewmode");
          Me(Te || "canvas");
        } catch {
          Me("canvas");
        }
    }
  }, [e, n, Ie, t == null ? void 0 : t.id]);
  const Tt = u.useRef(null), Ke = u.useRef(d);
  Ke.current = d;
  const Nt = u.useRef(E);
  Nt.current = E;
  const Ft = u.useRef(c);
  Ft.current = c;
  const Je = u.useRef(t && t.id);
  u.useEffect(() => {
    var Te, Ae, Ve;
    t && t.id && Je.current !== t.id && (Je.current = t.id, ae(1), ((Te = t.displays) == null ? void 0 : Te.length) > 1 || ((Ve = (Ae = t.topology) == null ? void 0 : Ae.displays) == null ? void 0 : Ve.length) > 1 || Ne("mon-0"));
  }, [t, ae]);
  const Kt = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Te = Tt.current;
    if (!Te || !v || !M) return;
    const Ae = (Ve) => {
      Ve.preventDefault(), Ve.stopPropagation();
      const ft = Ve.ctrlKey || Ve.shiftKey, bt = Ke.current, te = Nt.current, me = Ft.current || 36e5;
      if (ft) {
        const Z = Math.abs(Ve.deltaX) > Math.abs(Ve.deltaY) ? Ve.deltaX : Ve.deltaY;
        if (Z === 0) return;
        const Ee = me / bt, Oe = Math.max(0, me - Ee), Qe = Ee * 0.08 * (Z > 0 ? 1 : -1), et = Math.max(0, Math.min(Oe, te + Qe));
        Nt.current = et, M(et);
      } else {
        if (Ve.deltaY === 0) return;
        const Ee = Ve.deltaY < 0 ? 1.25 : 0.8, Oe = Te.getBoundingClientRect(), Qe = Oe.left + 150, et = Oe.right - 58, Ye = Math.max(100, et - Qe);
        let ct = 0.5;
        Ve.clientX >= Qe && Ve.clientX <= et ? ct = (Ve.clientX - Qe) / Ye : Oe.width > 0 && (ct = Math.max(0, Math.min(1, (Ve.clientX - Oe.left) / Oe.width)));
        const Ct = Math.max(32, me / 2e3), dt = Math.max(1, Math.min(Ct, Math.round(bt * Ee * 100) / 100));
        if (dt === bt) return;
        const pt = me / bt, Ut = me / dt, Dt = te + ct * pt - ct * Ut, wn = Math.max(0, me - Ut), fn = Math.max(0, Math.min(wn, Dt));
        Ke.current = dt, Nt.current = fn, M(fn), v(dt);
      }
    };
    return Te.addEventListener("wheel", Ae, { passive: !1, capture: !0 }), () => Te.removeEventListener("wheel", Ae, { capture: !0 });
  }, [e, t, v, M]);
  const Bt = u.useCallback(() => {
    f ? f() : (Nt.current = 0, Ke.current = 1, M == null || M(0), v == null || v(1));
  }, [f, M, v]), kn = u.useCallback((Te, Ae) => {
    if (m)
      m(Te, Ae);
    else {
      const Ve = Math.max(1e3, Ae - Te), ft = Math.max(500, Ve * 0.05), bt = Math.max(0, Te - ft), me = Math.min(c, Ae + ft) - bt, Z = Math.max(32, c / 2e3), Ee = Math.max(1, Math.min(Z, Number((c / me).toFixed(1)))), Oe = c / Ee, Qe = Math.max(0, Math.min(bt, c - Oe));
      Nt.current = Qe, Ke.current = Ee, M == null || M(Qe), v == null || v(Ee);
    }
  }, [m, c, M, v]), Ze = u.useCallback((Te, Ae = "center") => {
    if (y)
      y(Te, Ae);
    else {
      if (Te == null) return;
      const Ve = Ke.current || 1, ft = c / Math.max(1, Ve), bt = Ae === "start" ? ft / 4 : ft * 0.75, te = Math.max(0, Math.min(Te - bt, c - ft));
      Nt.current = te, M == null || M(te);
    }
  }, [y, c, M]), Xe = u.useCallback(() => {
    we((Te) => !Te);
  }, [we]), jt = u.useCallback(async () => {
    var ft;
    if (!t || Math.abs(S - h) < 1e3) return;
    const Te = (V || "NONE").toUpperCase().replace("-", "_");
    let Ae;
    Te === "NONE" || Te === "OFF" ? Ae = "None" : Te === "CAPTION" ? Ae = "Caption" : Ae = "BurnIn";
    const Ve = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(h),
      outEpochMs: a + Math.round(S),
      keystrokeMode: Ae,
      layoutMode: Ie ? _e : "mon-0",
      targetDisplayId: !Ie || _e === "mon-0" || _e === "mon-1" || _e.startsWith("mon-") ? Ie ? _e : "mon-0" : null,
      isPipSwapped: nt,
      directorSegments: Ie ? (Y == null ? void 0 : Y.segments) || ((ft = t == null ? void 0 : t.directorPlan) == null ? void 0 : ft.segments) || [] : []
    };
    try {
      x ? await x(Ve) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ve)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ve)
      });
    } catch (bt) {
      console.warn("[SoloSpotlightModal] Export trigger error:", bt);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, h, S, a, x, V, _e, nt, Y]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Te = (Ae) => {
      if ((Ae.ctrlKey || Ae.metaKey) && (Ae.key === "e" || Ae.key === "E")) {
        Ae.preventDefault(), jt();
        return;
      }
      if (Ae.key === "?" || Ae.shiftKey && Ae.code === "Slash") {
        Ae.preventDefault(), z((Ve) => !Ve);
        return;
      }
      if (W) {
        Ae.key === "Escape" && z(!1);
        return;
      }
      if (Ae.key === "Escape" || Ae.code === "Escape") {
        Ae.preventDefault(), Ae.stopPropagation(), o == null || o();
        return;
      }
      if (Ae.code === "Space") {
        Ae.preventDefault(), Xe();
        return;
      }
      if (Ae.code === "KeyI") {
        Ae.preventDefault(), b(Math.max(0, Math.min(D, S - 1e3)));
        return;
      }
      if (Ae.code === "KeyO") {
        Ae.preventDefault(), j(Math.min(c, Math.max(D, h + 1e3)));
        return;
      }
      if (Ae.code === "ArrowLeft" || Ae.code === "ArrowRight") {
        Ae.preventDefault(), we(!1);
        const Ve = Ae.code === "ArrowLeft";
        let ft;
        if (Ae.ctrlKey || Ae.metaKey)
          ft = 33;
        else if (Ae.shiftKey)
          ft = 5e3;
        else {
          const bt = Math.max(1, d);
          ft = Math.max(33, Math.round(1e3 / bt));
        }
        p((bt) => {
          const te = Ve ? bt - ft : bt + ft;
          return Math.max(0, Math.min(c, te));
        });
        return;
      }
      if (Ae.key === "ArrowDown") {
        Ae.preventDefault();
        const Ve = r.findIndex((ft) => ft.id === t.id);
        if (Ve !== -1) {
          const ft = (Ve + 1) % r.length;
          l(r[ft].id);
        }
        return;
      }
      if (Ae.key === "ArrowUp") {
        Ae.preventDefault();
        const Ve = r.findIndex((ft) => ft.id === t.id);
        if (Ve !== -1) {
          const ft = (Ve - 1 + r.length) % r.length;
          l(r[ft].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Te, { capture: !0 }), () => window.removeEventListener("keydown", Te, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    D,
    h,
    S,
    c,
    d,
    b,
    j,
    p,
    jt,
    Xe,
    we,
    W
  ]);
  const xn = r.findIndex((Te) => Te.id === (t && t.id)), Et = r[xn - 1], Ot = r[xn + 1];
  if (!e || !t) return null;
  const tn = k > 0 ? k : Math.round(a + D);
  return _s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      re && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${re.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          re.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          re.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          re.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: re.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Zd(S - h),
            " (",
            wt(a + h, i),
            " → ",
            wt(a + S, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Lx,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: D,
            setPlayheadMs: p,
            isPlaying: Pe,
            setIsPlaying: we,
            playbackSpeed: G,
            timeMode: i,
            inPointMs: h,
            outPointMs: S,
            isLooping: Se,
            recordingSegments: N,
            globalGaps: he,
            showWatermark: !0,
            directorPlan: Y || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: B,
            onResetOverride: J,
            viewMode: _e,
            onViewModeChange: Ne,
            isPipSwapped: nt,
            onPipSwapChange: Be
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ox,
          {
            currentEpochMs: tn,
            keystrokes: C,
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
              onClick: (Te) => {
                Te.preventDefault(), Te.stopPropagation(), o == null || o();
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
              onClick: () => z(!0),
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
              disabled: !Et,
              onClick: () => Et && l(Et.id),
              title: Et ? `Previous: ${Et.displayName || Et.roleAlias || Et.hostname || Et.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            xn + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Pe ? "is-playing-dimmed" : ""}`, ref: Tt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Zd(S - h) })
            ] }),
            (() => {
              const Te = _e === "mon-0" ? "SCREEN 1" : _e === "mon-1" ? "SCREEN 2" : _e.startsWith("mon-") ? `SCREEN ${parseInt(_e.slice(4)) + 1}` : _e.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: jt,
                  title: `Export Selected Cut Window as ${Te} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: _e === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Te})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            wp,
            {
              activeStationId: t.id,
              isPlaying: Pe,
              setIsPlaying: Xe,
              isLooping: Se,
              setIsLooping: He,
              playbackSpeed: G,
              onChangeSpeed: ae,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: h,
              setInPointMs: b,
              outPointMs: S,
              setOutPointMs: j,
              onSetInPoint: () => b(Math.max(0, Math.min(D, S - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(D, h + 1e3))),
              onStepFrameBackward: () => {
                we(!1), p((Te) => Math.max(0, Te - 33));
              },
              onStepFrameForward: () => {
                we(!1), p((Te) => Math.min(c, Te + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: wt(a + D, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Sp,
          {
            stations: Kt,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: Bt,
            onFitRange: kn,
            onJumpViewportTo: Ze,
            viewportStartMs: E,
            onViewportStartChange: M,
            playheadMs: D,
            setPlayheadMs: (Te) => {
              we(!1), p(Te);
            },
            inPointMs: h,
            setInPointMs: b,
            outPointMs: S,
            setOutPointMs: j,
            recordingSegments: N,
            onExport: jt,
            onEstimateLoaded: (Te) => {
              Te != null && Te.removedGlobalGaps && de(Te.removedGlobalGaps);
            },
            keystrokeMode: V,
            onChangeKeystrokeMode: oe,
            keystrokes: C,
            showKeystrokes: R,
            showRulerKeystrokes: R,
            onToggleRulerKeystrokes: F,
            onSplitDirectorSegment: se,
            onChangeDirectorSegmentDisplay: ee,
            onResetDirectorSegmentToAuto: J
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Ip,
        {
          isOpen: W,
          onClose: () => z(!1)
        }
      )
    ] }),
    document.body
  );
}
function Tp({ isGlobalHost: e = !1 }) {
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
  }), m = u.useCallback(async () => {
    if (!a.current && !(typeof document < "u" && document.hidden)) {
      a.current = !0;
      try {
        let N = await fetch("/api/v1/extractor-advanced/jobs");
        if (N.ok || (N = await fetch("/api/v1/extractor/jobs")), N.ok) {
          i.current = 0;
          const T = await N.json(), x = Array.isArray(T) ? T : [];
          n(x), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: x }));
        } else
          i.current++;
      } catch (N) {
        i.current++, i.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", N);
      } finally {
        a.current = !1;
      }
    }
  }, []);
  u.useEffect(() => {
    let N = !0, T = null;
    const x = () => {
      if (!N) return;
      let P = 2500;
      typeof document < "u" && document.hidden ? P = 3e4 : i.current > 0 && (P = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), T = setTimeout(async () => {
        await m(), x();
      }, P);
    }, I = () => {
      !document.hidden && N && (clearTimeout(T), i.current = 0, m().then(x));
    };
    return document.addEventListener("visibilitychange", I), m().then(x), () => {
      N = !1, clearTimeout(T), document.removeEventListener("visibilitychange", I);
    };
  }, [m]), u.useEffect(() => {
    const N = () => {
      f(!0), m();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [m]), u.useEffect(() => {
    if (!v || c) return;
    const N = (T) => {
      o.current && !o.current.contains(T.target) && !T.target.closest(".export-floating-hud") && f(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [v, c]);
  const y = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && y)
    return null;
  const E = t.filter((N) => N.status === "Processing" || N.status === "Queued"), M = t.filter((N) => N.status === "Completed" || N.isCompleted), D = () => {
    d((N) => {
      const T = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(T));
      } catch {
      }
      return T;
    });
  }, k = () => {
    f(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, p = (N, T) => {
    T.stopPropagation(), !(!N || r.has(N)) && (l((x) => new Set(x).add(N)), setTimeout(() => {
      n((x) => {
        const I = x.filter((P) => (P.jobId || P.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: I })), I;
      }), l((x) => {
        const I = new Set(x);
        return I.delete(N), I;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch((x) => console.warn("[ExportJobMonitor] Dismiss failed:", x)));
  }, h = async (N, T) => {
    T.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), m();
    } catch (x) {
      console.warn("[ExportJobMonitor] Bookmark failed:", x);
    }
  }, b = (N, T) => {
    T.stopPropagation();
    const x = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    x && (navigator.clipboard.writeText(x), alert(`UNC Directory Path copied to clipboard:
${x}`));
  }, S = (N) => {
    const T = N.jobId || N.id, x = `/api/v1/extractor-advanced/jobs/${T}/download`, I = document.createElement("a");
    I.href = x, I.download = N.fileName || `archive_${T}.tar`, document.body.appendChild(I), I.click(), document.body.removeChild(I), setTimeout(m, 1e3);
  }, j = (N) => {
    if (!N || N <= 0) return "0 B";
    const T = N / (1024 * 1024);
    return T >= 1e3 ? `${(T / 1024).toFixed(2)} GB` : `${T.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : _s.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${E.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${E.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: E.length > 0 ? `EXPORTS: ${E.length} PACKAGING` : `${M.length} ARCHIVE${M.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${E.length > 0 ? "" : "ready"}`, children: E.length > 0 ? `${E[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && f(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((N) => {
          const T = N.status === "Completed" || N.isCompleted, x = N.status === "Failed" || N.isFailed, I = N.status === "Processing" || N.status === "Queued", P = N.jobId || N.id, K = r.has(P), $ = T ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${K ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${N.status.toLowerCase()}`, children: T ? "READY" : N.status }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: N.fileName, children: N.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (U) => p(P, U),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                I && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
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
                T && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
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
                T && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${N.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (U) => h(P, U),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (U) => b(N, U),
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
                x && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  N.errorMessage || N.error || "Export failed"
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
function _x({
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
function Fx({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, a = r.canvasHeight || 1080, i = o / a;
  let c;
  Math.abs(i - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(i - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(i - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(i - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(i - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(i * 100) / 100}:1 Custom`;
  const d = (N) => {
    const T = Math.round(N * i);
    return T - T % 2;
  }, v = (N, T) => {
    const x = Math.round(N * T / 2073600 * 6 * 10) / 10, I = Math.round(x * 60 / 8 * 10) / 10;
    return `~${x} Mbps (~${I} MB/min)`;
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
  ], [m, y] = u.useState("BurnIn"), [E, M] = u.useState(r.resolution || "NATIVE"), [D, k] = u.useState(!1);
  if (!e) return null;
  const p = async () => {
    k(!0);
    try {
      await n(m, E), t();
    } finally {
      k(!1);
    }
  }, h = (r.layout || "DIRECTOR").toUpperCase(), b = r.stationsCount || 1, S = r.audioSegmentsCount || 1, j = f.find((N) => N.id === E) || f[0];
  return _s.createPortal(
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
              a,
              " (Ratio ",
              i.toFixed(2),
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
              b,
              " WORKSTATION",
              b > 1 ? "S" : ""
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
              (typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "TOP-RIGHT").toUpperCase(),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((N) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${E === N.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: N.id,
              checked: E === N.id,
              onChange: () => M(N.id)
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
                onChange: () => y("BurnIn")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: D, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: p, disabled: D, children: D ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Bx(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, v] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const m = u.useCallback(async () => {
    if (isNaN(e)) return;
    const M = e + t;
    v(!0);
    try {
      const D = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(M),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${D.toString()}`);
      if (k.ok) {
        const p = k.headers.get("content-type");
        if (p && p.includes("application/json")) {
          const h = await k.json(), S = (Array.isArray(h) ? h : h.stations || h.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
            var N, T;
            return {
              id: String(j.id || j.stationId || j.agentId || j.hostname),
              hostname: j.hostname || "Station",
              roleAlias: j.roleAlias || null,
              roleHistory: j.roleHistory || [],
              displayName: j.displayName || j.roleAlias || j.hostname || "Station",
              isOnline: j.isOnline !== void 0 ? j.isOnline : !0,
              recordingsCount: j.recordingsCount || 0,
              segments: j.segments || [],
              displays: j.displays || j.Displays || ((N = j.displayTopology) == null ? void 0 : N.displays) || ((T = j.DisplayTopology) == null ? void 0 : T.Displays) || [],
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
          a((j) => {
            if (!j || j.length === 0) return S;
            const N = new Map(j.map((I) => [I.id, I]));
            let T = j.length !== S.length;
            const x = S.map((I) => {
              const P = N.get(I.id);
              return P ? P.isOnline === I.isOnline && P.displayName === I.displayName && P.roleAlias === I.roleAlias && P.feedSpec === I.feedSpec && P.recordingsCount === I.recordingsCount && P.fps === I.fps ? P : (T = !0, { ...P, ...I }) : (T = !0, I);
            });
            return T ? x : j;
          });
        }
      }
    } catch (D) {
      console.warn("[useStudioData] Failed fetching active stations:", D);
    } finally {
      v(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    m();
  }, [m]);
  const y = u.useMemo(() => {
    const M = /* @__PURE__ */ new Set();
    return o.forEach((D) => {
      D.id && M.add(D.id), D.hostname && M.add(D.hostname);
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
        const k = e + t, p = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${k}`);
        if (p.ok && M) {
          const h = await p.json() || {}, b = {};
          (f.current || []).forEach((S) => {
            const j = h[S.id] || h[S.hostname] || h[S.displayName] || [];
            b[S.id] = j, b[S.hostname] = j;
          }), Object.keys(h).forEach((S) => {
            b[S] || (b[S] = h[S]);
          }), c(b);
        }
      } catch {
        M && c({});
      }
    })(), () => {
      M = !1;
    };
  }, [y, e, t]);
  const E = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let M = 1 / 0, D = -1 / 0;
    o.forEach((b) => {
      (i[b.id] || i[b.hostname] || b.segments || []).forEach((j) => {
        const N = j.startEpochMs ?? j.startEpoch ?? 0, T = j.endEpochMs ?? j.endEpoch ?? 0;
        N > 0 && N < M && (M = N), T > 0 && T > D && (D = T);
      });
    });
    let k = 1 / 0, p = -1 / 0;
    l && (i[l] || []).forEach((S) => {
      const j = S.startEpochMs ?? S.startEpoch ?? 0, N = S.endEpochMs ?? S.endEpoch ?? 0;
      j > 0 && j < k && (k = j), N > 0 && N > p && (p = N);
    });
    const h = (b) => b === 1 / 0 || b === -1 / 0 ? null : Math.max(0, Math.min(t, b - e));
    return {
      globalFirstMs: h(M),
      globalLastMs: h(D),
      currentFirstMs: h(k),
      currentLastMs: h(p)
    };
  }, [o, i, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: i,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: m,
    movieBoundaries: E
  };
}
function Ux({
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
  const [m, y] = u.useState(i), [E, M] = u.useState(c), [D, k] = u.useState(d), [p, h] = u.useState(v), b = u.useRef(null), S = u.useRef(null), j = o || l, N = u.useMemo(() => j ? a[j.id] || j.segments || [] : [], [j, a]), T = N.some((K) => {
    const $ = K.startEpochMs ?? K.startEpoch ?? 0, U = K.endEpochMs ?? K.endEpoch ?? 0, ne = e + m;
    return ne >= $ && ne <= U;
  }), x = !!(!f && j && T);
  u.useEffect(() => {
    y((K) => K < t ? t : K > n ? (M(!1), n) : K);
  }, [t, n]);
  const I = u.useCallback((K) => {
    b.current || (b.current = K);
    const $ = (K - b.current) * p, U = Math.min($, 250 * p);
    b.current = K, y((ne) => {
      let V = ne + U;
      if (r && r.length > 0) {
        const oe = e + V, C = r.find((R) => oe >= R.startEpochMs && oe < R.endEpochMs);
        C && (V = C.endEpochMs - e);
      }
      return V >= n && (D ? V = t : (M(!1), V = n)), V;
    }), E && (!x || f) && (S.current = requestAnimationFrame(I));
  }, [E, D, t, n, r, e, x, p, f]);
  u.useEffect(() => (E && (!x || f) ? (b.current = performance.now(), S.current = requestAnimationFrame(I)) : (S.current && cancelAnimationFrame(S.current), b.current = null), () => {
    S.current && cancelAnimationFrame(S.current);
  }), [E, I, x, f]);
  const P = u.useCallback(() => {
    if (E)
      M(!1);
    else {
      let K = m;
      const $ = e + K, U = r == null ? void 0 : r.find((ne) => $ >= ne.startEpochMs && $ < ne.endEpochMs);
      if (U)
        K = U.endEpochMs - e;
      else if (j && !T) {
        const ne = N.map((V) => ({ start: V.startEpochMs ?? V.startEpoch ?? 0, end: V.endEpochMs ?? V.endEpoch ?? 0 })).filter((V) => V.start > $).sort((V, oe) => V.start - oe.start)[0];
        ne && (K = ne.start - e);
      }
      K !== m && y(K), M(!0);
    }
  }, [E, m, e, r, j, T, N]);
  return {
    playheadMs: m,
    setPlayheadMs: y,
    isPlaying: E,
    setIsPlaying: M,
    isLooping: D,
    setIsLooping: k,
    playbackSpeed: p,
    setPlaybackSpeed: h,
    togglePlaySmart: P
  };
}
function Wx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function zx({
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
  const m = Math.max(32, t / 2e3), y = t / l, E = u.useCallback((p, h = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const b = d.current, S = p - b;
    if (Math.abs(S) < 1) return;
    const j = performance.now(), N = (T) => {
      const x = T - j, I = Math.min(1, x / h);
      i(Math.round(b + S * Wx(I))), I < 1 ? c.current = requestAnimationFrame(N) : c.current = null;
    };
    c.current = requestAnimationFrame(N);
  }, []), M = u.useCallback((p, h) => {
    const b = Math.max(1e3, h - p), S = Math.max(500, b * 0.05), j = Math.max(0, p - S), T = Math.min(t, h + S) - j, x = Math.max(1, Math.min(m, Number((t / T).toFixed(1)))), I = t / x, P = Math.max(0, Math.min(j, t - I));
    E(P), o(x);
  }, [t, m, E]), D = u.useCallback(() => {
    E(0), o(1);
  }, [E]), k = u.useCallback((p, h = "center") => {
    if (p == null) return;
    const b = h === "start" ? y / 4 : y * 0.75, S = Math.max(0, Math.min(p - b, t - y));
    E(S);
  }, [y, t, E]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let p = null;
    const h = (S) => {
      if (S.defaultPrevented) return;
      S.preventDefault(), S.stopPropagation();
      const j = S.ctrlKey || S.shiftKey, N = v.current, T = d.current, x = f.current;
      if (j) {
        const I = Math.abs(S.deltaX) > Math.abs(S.deltaY) ? S.deltaX : S.deltaY;
        if (I === 0) return;
        const P = x / Math.max(1, N), K = Math.max(0, x - P), $ = P * 0.08 * (I > 0 ? 1 : -1);
        i((U) => Math.max(0, Math.min(K, U + $)));
      } else {
        if (S.deltaY === 0) return;
        const P = S.deltaY < 0 ? 1.25 : 0.8, K = Math.max(32, x / 2e3), $ = p ? p.getBoundingClientRect() : { left: 0, width: window.innerWidth }, U = Math.max(0, Math.min($.width, S.clientX - $.left)), ne = $.width > 0 ? U / $.width : 0.5;
        o((V) => {
          const oe = Math.max(1, Math.min(K, Math.round(V * P * 100) / 100));
          if (oe === V) return V;
          const C = x / V, R = x / oe, Y = T + ne * C - ne * R, B = Math.max(0, x - R);
          return i(Math.max(0, Math.min(B, Y))), oe;
        });
      }
    }, b = () => {
      const S = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return S && !p ? (p = S, p.addEventListener("wheel", h, { passive: !1, capture: !0 }), !0) : !!p;
    };
    if (!b()) {
      const S = setInterval(() => {
        b() && clearInterval(S);
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
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: y,
    animateViewportTo: E,
    fitRange: M,
    resetZoom: D,
    jumpViewportTo: k
  };
}
function Hx({
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
  totalTimelineDurationMs: m,
  zoomLevel: y = 1,
  togglePlaySmart: E,
  onToggleHelpModal: M,
  onSplitDirectorAtPlayhead: D,
  isModalActive: k = !1
}) {
  u.useEffect(() => {
    const p = (h) => {
      const b = h.target;
      if (!(b.tagName === "INPUT" || b.tagName === "TEXTAREA" || b.tagName === "SELECT" || b.isContentEditable || b.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
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
            h.preventDefault(), f == null || f(Math.min(m, Math.max(a, c + 1e3)));
            return;
          }
          if (h.code === "KeyX" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(0), f == null || f(m);
            return;
          }
          if (h.code === "KeyL" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), o == null || o((j) => j <= 0 ? 1 : j === 1 ? 2 : j === 2 ? 4 : j >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
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
            if (h.preventDefault(), !e && !t && r > 1) return;
            E();
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
            const j = h.code === "ArrowLeft";
            let N;
            if (h.ctrlKey || h.metaKey)
              N = 33;
            else if (h.shiftKey)
              N = 5e3;
            else {
              const T = Math.max(1, y);
              N = Math.max(33, Math.round(1e3 / T));
            }
            i == null || i((T) => {
              const x = j ? T - N : T + N;
              return Math.max(0, Math.min(m, x));
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
    return window.addEventListener("keydown", p, { capture: !0 }), () => window.removeEventListener("keydown", p, { capture: !0 });
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
    m,
    y,
    E,
    M,
    D,
    k
  ]);
}
const qd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Ud(n, e), l = Ud(t, e);
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
    const c = o.substring(0, 8), d = jc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), i = new Date(a).getTime();
  return isNaN(i) ? Date.now() : i;
};
function Kx() {
  var pn, un;
  const e = u.useMemo(() => jg() || {}, []), [t, n] = u.useState(() => {
    var O, ue;
    return (O = e.timeRange) != null && O.startEpochMs && ((ue = e.timeRange) != null && ue.endEpochMs) ? e.timeRange : qd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    gg().catch((O) => console.warn("[Studio] DST init error:", O));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Rl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), m = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, E] = u.useState(e.selectedStationIds || []), [M, D] = u.useState(e.activeStationId || null), [k, p] = u.useState(null), [h, b] = u.useState(null), [S, j] = u.useState([]), [N, T] = u.useState(!1), [x, I] = u.useState(null), [P, K] = u.useState(() => {
    var O;
    return e.compositionScope || (((O = e.selectedStationIds) == null ? void 0 : O.length) > 1 ? "inter-station" : "intra-station");
  }), [$, U] = u.useState(() => {
    try {
      const O = localStorage.getItem("itb_composition_layout");
      if (O) return O;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), ne = u.useCallback((O) => {
    U((ue) => {
      const ce = typeof O == "function" ? O(ue) : O;
      try {
        localStorage.setItem("itb_composition_layout", ce);
      } catch {
      }
      return ce;
    });
  }, []), [V, oe] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [C, R] = u.useState(() => !!e.isPipSwapped), [F, Y] = u.useState(() => e.audioRoutingPlan || null), [B, se] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ee, J] = u.useState(!1), [le, We] = u.useState(null), [Pe, we] = u.useState(() => e.canvasLayoutTimeline || null), [ze, Le] = u.useState(0), Se = u.useCallback((O) => {
    we((ue) => {
      const ce = [...(ue == null ? void 0 : ue.keyframes) || []], xe = ce.findIndex((fe) => Math.abs(fe.timestampEpochMs - O) < 300);
      if (xe >= 0)
        return Le(xe), ue;
      const H = ce[ze] || ce[0], ve = (H == null ? void 0 : H.layout) || le || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, je = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(O),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(ve))
      }, Re = [...ce, je].sort((fe, Fe) => fe.timestampEpochMs - Fe.timestampEpochMs), Ge = Re.findIndex((fe) => fe.timestampEpochMs === Math.round(O));
      return Le(Ge >= 0 ? Ge : 0), {
        ...ue || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Re
      };
    });
  }, [ze, le]), He = u.useCallback((O, ue) => {
    we((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : Sc(ce, O, ue));
  }, []), ht = u.useCallback((O) => {
    we((ue) => {
      if (!(ue != null && ue.keyframes) || ue.keyframes.length <= 1) return ue;
      const ce = ue.keyframes.filter((xe, H) => H !== O);
      return Le((xe) => Math.max(0, xe - 1)), { ...ue, keyframes: ce };
    });
  }, []), A = u.useCallback((O, ue) => {
    we((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length === 0) return ce;
      const xe = Math.round(ue), H = typeof O == "number" && ce.keyframes[O] ? O : ce.keyframes.findIndex((Re) => Re.id === O);
      if (H === -1) return ce;
      const ve = [...ce.keyframes];
      ve[H] = {
        ...ve[H],
        timestampEpochMs: xe
      }, ve.sort((Re, Ge) => Re.timestampEpochMs - Ge.timestampEpochMs);
      const je = ve.findIndex((Re) => Re.timestampEpochMs === xe);
      return je >= 0 && Le(je), {
        ...ce,
        keyframes: ve
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [G, ae] = u.useState({}), re = u.useCallback((O) => {
    E((ue) => ue.filter((ce) => ce !== O)), M === O && D(null), k === O && p(null), we((ue) => {
      if (!ue || !ue.keyframes) return ue;
      const ce = ue.keyframes.map((xe) => {
        var H;
        return {
          ...xe,
          layout: {
            ...xe.layout,
            placements: (((H = xe.layout) == null ? void 0 : H.placements) || []).filter((ve) => ve.stationId !== O)
          }
        };
      });
      return { ...ue, keyframes: ce };
    });
  }, [M, k]), q = u.useCallback((O, ue) => {
    O.preventDefault(), O.stopPropagation();
    const ce = 195, xe = 110, H = Math.min(O.clientX, window.innerWidth - ce - 10), ve = Math.min(O.clientY, window.innerHeight - xe - 10);
    I({ x: H, y: ve, station: ue });
  }, []), W = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(m, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(m, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, m, v]), z = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(W + 1e3, Math.min(m, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(W + 1e3, Math.min(m, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, m, v, t.durationMs, W]), he = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(m, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(m, e.playheadMs)) : W, [e.playheadEpochMs, e.playheadMs, f, m, W]), [de, Ie] = u.useState(W), [_e, Me] = u.useState(z);
  u.useEffect(() => {
    if (!f) return;
    const O = Math.round(f + de), ue = Math.round(f + _e);
    we((ce) => {
      var Re, Ge;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      let xe = [...ce.keyframes], H = !1, ve = xe.find((fe) => fe.tag === "cut-in");
      if (ve)
        ve.timestampEpochMs !== O && (ve.timestampEpochMs = O, H = !0);
      else {
        const fe = xe.find((Fe) => Math.abs(Fe.timestampEpochMs - O) < 500);
        if (fe)
          fe.tag = "cut-in", fe.timestampEpochMs = O, H = !0;
        else {
          const Fe = ((Re = xe[0]) == null ? void 0 : Re.layout) || le || { width: 1920, height: 1080, placements: [] };
          xe.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: O,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Fe))
          }), H = !0;
        }
      }
      let je = xe.find((fe) => fe.tag === "cut-out");
      if (je)
        je.timestampEpochMs !== ue && (je.timestampEpochMs = ue, H = !0);
      else {
        const fe = xe.find((Fe) => Math.abs(Fe.timestampEpochMs - ue) < 500 && Fe.tag !== "cut-in");
        if (fe)
          fe.tag = "cut-out", fe.timestampEpochMs = ue, H = !0;
        else {
          const Fe = ((Ge = xe[xe.length - 1]) == null ? void 0 : Ge.layout) || le || { width: 1920, height: 1080, placements: [] };
          xe.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ue,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Fe))
          }), H = !0;
        }
      }
      return H ? (xe.sort((fe, Fe) => fe.timestampEpochMs - Fe.timestampEpochMs), {
        ...ce,
        keyframes: xe
      }) : ce;
    });
  }, [f, de, _e, le]);
  const { allStations: Ne, recordingSegments: nt, isLoadingStations: Be, movieBoundaries: Tt } = Bx(
    f,
    m,
    t,
    r,
    M
  ), Ke = u.useMemo(() => Ne.find((O) => O.id === M) || null, [Ne, M]), Nt = u.useCallback((O) => {
    ae((ue) => {
      const ce = !(ue[O] ?? !0);
      return we((xe) => {
        if (!(xe != null && xe.keyframes)) return xe;
        const H = xe.keyframes.map((ve) => {
          var fe;
          const je = ((fe = ve.layout) == null ? void 0 : fe.placements) || [];
          let Re = !1;
          const Ge = je.map((Fe) => {
            if (Fe.stationId === O) {
              if (!ce && (Fe.displayId === "auto" || !Fe.displayId)) {
                Re = !0;
                const st = Ne.find((qe) => qe.id === O);
                return {
                  ...Fe,
                  displayId: "mon-0",
                  label: `${(st == null ? void 0 : st.displayName) || O} - Screen 1 (Main)`
                };
              } else if (ce && (Fe.displayId === "mon-0" || !Fe.displayId) && je.filter((qe) => qe.stationId === O).length === 1) {
                Re = !0;
                const qe = Ne.find((vt) => vt.id === O);
                return {
                  ...Fe,
                  displayId: "auto",
                  label: `${(qe == null ? void 0 : qe.displayName) || O} - Central Composition (Auto-Director)`
                };
              }
            }
            return Fe;
          });
          return Re ? {
            ...ve,
            layout: {
              ...ve.layout,
              placements: Ge
            }
          } : ve;
        });
        return { ...xe, keyframes: H };
      }), {
        ...ue,
        [O]: ce
      };
    });
  }, [Ne]), Ft = u.useCallback((O, ue) => {
    we((ce) => {
      var Fe, st;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      const xe = ze >= 0 && ze < ce.keyframes.length ? ze : 0, H = ce.keyframes[xe], ve = ((Fe = H == null ? void 0 : H.layout) == null ? void 0 : Fe.placements) || [], je = (ue || "mon-0").toLowerCase(), Re = ve.findIndex((qe) => {
        if (qe.stationId !== O) return !1;
        const vt = (qe.displayId || "mon-0").toLowerCase();
        return vt === je || vt === "auto" && (je === "mon-0" || je === "screen-0");
      });
      let Ge;
      if (Re >= 0)
        Ge = ve.filter((qe, vt) => vt !== Re);
      else {
        const qe = Ne.find((mr) => mr.id === O), vt = ((st = qe == null ? void 0 : qe.displays) == null ? void 0 : st.find((mr) => (mr.displayId || "").toLowerCase() === je)) || { width: 1920, height: 1080 }, Qt = vt.width || 1920, At = vt.height || 1080, on = Qt / At, Zn = on >= 1 ? 640 : Math.round(360 * on), Cs = on >= 1 ? Math.round(640 / on) : 360, Va = {
          stationId: O,
          displayId: je,
          label: `${(qe == null ? void 0 : qe.displayName) || O} - ${vt.displayName || je}`,
          x: 120 + ve.length * 40 % 800,
          y: 100 + ve.length * 40 % 500,
          width: Zn,
          height: Cs,
          sourceWidth: Qt,
          sourceHeight: At,
          nativeAspectRatio: on,
          aspectRatio: on,
          zIndex: ve.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ge = [...ve, Va];
      }
      const fe = [...ce.keyframes];
      return fe[xe] = {
        ...fe[xe],
        layout: {
          ...fe[xe].layout,
          placements: Ge
        }
      }, { ...ce, keyframes: fe };
    });
  }, [ze, Ne]), Je = u.useMemo(() => !y || y.length === 0 ? [] : Ne.filter((O) => y.includes(O.id)), [Ne, y]), Kt = u.useMemo(() => Ne.find((O) => O.id === k) || null, [Ne, k]), Bt = !!(k && Kt), kn = u.useRef("grid"), Ze = u.useRef(null), {
    playheadMs: Xe,
    setPlayheadMs: jt,
    isPlaying: xn,
    setIsPlaying: Et,
    playbackSpeed: Ot,
    setPlaybackSpeed: tn,
    isLooping: cn,
    setIsLooping: Dn,
    togglePlaySmart: bn
  } = Ux({
    timelineBaseEpochMs: f,
    inPointMs: de,
    outPointMs: _e,
    globalGaps: S,
    activeStation: Ke,
    spotlightStation: Kt,
    recordingSegments: nt,
    initialPlayheadMs: he,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !M
  }), {
    zoomLevel: Te,
    setZoomLevel: Ae,
    viewportStartMs: Ve,
    setViewportStartMs: ft,
    resetZoom: bt,
    fitRange: te,
    jumpViewportTo: me
  } = zx({
    containerRef: Ze,
    totalTimelineDurationMs: m,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [Z, Ee] = u.useState(!1), [Oe, Qe] = u.useState(!1), [et, Ye] = u.useState(!1), [ct, Ct] = u.useState(!1), [dt, pt] = u.useState(
    !!(e.isWorkspaceActive && ((pn = e.selectedStationIds) == null ? void 0 : pn.length) > 0)
  ), [Ut, Mt] = u.useState([]);
  u.useEffect(() => {
    const O = Bt && Kt || Ke, ue = (O == null ? void 0 : O.hostname) || (O == null ? void 0 : O.displayName) || (O == null ? void 0 : O.id), ce = (o || "NONE").toUpperCase().replace("-", "_");
    if (!ue || !f || !(ce !== "NONE" && ce !== "OFF" || i)) {
      Mt([]);
      return;
    }
    const H = Math.max(0, f - 5e3), ve = f + m + 5e3, je = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(ue)}&startEpoch=${H}&endEpoch=${ve}`, { signal: je.signal }).then((Re) => Re.ok ? Re.json() : []).then((Re) => Mt(Array.isArray(Re) ? Re : [])).catch((Re) => {
      Re.name !== "AbortError" && Mt([]);
    }), () => je.abort();
  }, [Ke, Kt, Bt, f, m, o, i]), u.useEffect(() => {
    Be || (Ne.length === 0 ? ((y.length > 0 || M || dt) && (E([]), D(null), p(null), pt(!1)), Ct(!0), T(!0)) : (T(!1), E((O) => {
      const ue = O.filter((ce) => Ne.some((xe) => xe.id === ce));
      return ue.length !== O.length ? (ue.length === 0 && (pt(!1), Ct(!0)), ue) : O;
    })));
  }, [Be, Ne]);
  const Dt = u.useCallback((O) => {
    if (O === null) {
      Et(!1), tn(1), D(null);
      return;
    }
    O !== M && tn(1), D(O);
  }, [M, Et, tn]), wn = u.useCallback((O, ue = null) => {
    O !== M && tn(1), kn.current = y.length <= 1 || M ? "spotlight" : "grid", D(O), p(O), b(ue || null);
  }, [M, y.length, tn]), fn = u.useCallback(() => {
    p(null), b(null), kn.current === "grid" && D(null);
  }, []), Wt = u.useMemo(() => {
    if (F != null && F.segments && F.segments.length > 0)
      return F;
    const O = y[0] || M || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + m,
          sourceStationId: O
        }
      ]
    };
  }, [F, y, M, f, m]), as = u.useCallback((O) => {
    Y((ue) => {
      const ce = ue || Wt, xe = [...ce.segments || []], H = xe.findIndex((st) => {
        const qe = st.startEpochMs ?? st.StartEpochMs ?? 0, vt = st.endEpochMs ?? st.EndEpochMs ?? 0;
        return O > qe + 500 && O < vt - 500;
      });
      if (H === -1) return ue;
      const ve = xe[H], je = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Re = ve.endEpochMs ?? ve.EndEpochMs ?? 0, Ge = ve.sourceStationId ?? ve.SourceStationId ?? y[0], fe = { startEpochMs: je, endEpochMs: O, sourceStationId: Ge }, Fe = { startEpochMs: O, endEpochMs: Re, sourceStationId: Ge };
      return xe.splice(H, 1, fe, Fe), { ...ce, segments: xe };
    });
  }, [Wt, y]), js = u.useCallback((O, ue) => {
    Y((ce) => {
      const xe = ce || Wt, H = (xe.segments || []).map((ve) => {
        const je = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Re = ve.endEpochMs ?? ve.EndEpochMs ?? 0;
        return O >= je && O <= Re ? { ...ve, sourceStationId: ue } : ve;
      });
      return { ...xe, segments: H };
    }), se(!1);
  }, [Wt]), Nl = u.useCallback((O, ue) => {
    Y((ce) => {
      const xe = ce || Wt, H = (xe.segments || []).map((ve) => {
        const je = ve.startEpochMs ?? ve.StartEpochMs ?? 0, Re = ve.endEpochMs ?? ve.EndEpochMs ?? 0;
        return O >= je && O <= Re ? { ...ve, gain: ue } : ve;
      });
      return { ...xe, segments: H };
    });
  }, [Wt]), ln = u.useCallback(() => {
    se((O) => !O);
  }, []), [kt, Mn] = u.useState({}), Pt = u.useCallback((O) => {
    if (!O) return null;
    if (kt[O]) return kt[O];
    const ue = Ne.find((ce) => ce.id === O);
    return ue != null && ue.directorPlan ? ue.directorPlan : {
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
  }, [kt, Ne, f, m]), kl = u.useCallback((O, ue) => {
    O && Mn((ce) => {
      const xe = ce[O] || Pt(O), H = [...xe.segments || []], ve = H.findIndex((vt) => {
        const Qt = vt.startEpochMs ?? vt.StartEpochMs ?? 0, At = vt.endEpochMs ?? vt.EndEpochMs ?? 0;
        return ue > Qt + 500 && ue < At - 500;
      });
      if (ve === -1) return ce;
      const je = H[ve], Re = je.startEpochMs ?? je.StartEpochMs ?? 0, Ge = je.endEpochMs ?? je.EndEpochMs ?? 0, fe = je.targetDisplayId ?? je.TargetDisplayId ?? "mon-0", Fe = !!(je.isManualOverride ?? je.IsManualOverride), st = { ...je, startEpochMs: Re, endEpochMs: ue, targetDisplayId: fe, isManualOverride: Fe }, qe = { ...je, startEpochMs: ue, endEpochMs: Ge, targetDisplayId: fe, isManualOverride: Fe };
      return H.splice(ve, 1, st, qe), { ...ce, [O]: { ...xe, segments: H } };
    });
  }, [Pt]), Or = u.useCallback((O, ue, ce) => {
    O && Mn((xe) => {
      const H = xe[O] || Pt(O), ve = [...H.segments || []];
      let je = ve.findIndex((Ge) => {
        const fe = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Fe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ue > fe && ue < Fe;
      });
      if (je === -1 && (je = ve.findIndex((Ge) => {
        const fe = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Fe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0;
        return ue >= fe && ue <= Fe;
      })), je === -1) return xe;
      const Re = ve[je];
      return ve[je] = { ...Re, targetDisplayId: ce, isManualOverride: !0 }, { ...xe, [O]: { ...H, segments: ve } };
    });
  }, [Pt]), Es = u.useCallback((O, ue) => {
    if (!O) return;
    const ce = Ne.find((H) => H.id === O), xe = ce == null ? void 0 : ce.directorPlan;
    Mn((H) => {
      var Qt;
      const ve = H[O] || Pt(O), je = [...ve.segments || []];
      let Re = je.findIndex((At) => {
        const on = At.startEpochMs ?? At.StartEpochMs ?? 0, Zn = At.endEpochMs ?? At.EndEpochMs ?? 0;
        return ue > on && ue < Zn;
      });
      if (Re === -1 && (Re = je.findIndex((At) => {
        const on = At.startEpochMs ?? At.StartEpochMs ?? 0, Zn = At.endEpochMs ?? At.EndEpochMs ?? 0;
        return ue >= on && ue <= Zn;
      })), Re === -1) return H;
      const Ge = je[Re], fe = Ge.startEpochMs ?? Ge.StartEpochMs ?? 0, Fe = Ge.endEpochMs ?? Ge.EndEpochMs ?? 0, st = (fe + Fe) / 2, qe = (Qt = xe == null ? void 0 : xe.segments) == null ? void 0 : Qt.find((At) => {
        const on = At.startEpochMs ?? At.StartEpochMs ?? 0, Zn = At.endEpochMs ?? At.EndEpochMs ?? 0;
        return st >= on && st <= Zn;
      }), vt = qe ? qe.targetDisplayId ?? qe.TargetDisplayId ?? "mon-0" : "mon-0";
      return je[Re] = { ...Ge, targetDisplayId: vt, isManualOverride: !1 }, { ...H, [O]: { ...ve, segments: je } };
    });
  }, [Ne, Pt]);
  u.useEffect(() => {
    if (!Je || Je.length === 0 || isNaN(f)) return;
    const O = f + de, ue = f + _e;
    if (ue <= O) return;
    const ce = setTimeout(async () => {
      const xe = Je.filter((H) => {
        var je;
        return (H.displays || H.Displays || ((je = H.displayTopology) == null ? void 0 : je.displays) || []).length > 1;
      });
      if (xe.length !== 0)
        for (const H of xe)
          try {
            const ve = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(H.id)}&startEpoch=${O}&endEpoch=${ue}`);
            if (ve.ok) {
              const je = await ve.json();
              je != null && je.segments && je.segments.length > 0 && Mn((Re) => {
                const Ge = Re[H.id] || H.directorPlan, fe = ((Ge == null ? void 0 : Ge.segments) || []).filter((st) => st.isManualOverride || st.IsManualOverride);
                if (fe.length === 0)
                  return { ...Re, [H.id]: je };
                const Fe = [...je.segments];
                return fe.forEach((st) => {
                  const qe = st.startEpochMs ?? st.StartEpochMs, vt = st.endEpochMs ?? st.EndEpochMs;
                  for (let Qt = Fe.length - 1; Qt >= 0; Qt--) {
                    const At = Fe[Qt].startEpochMs ?? Fe[Qt].StartEpochMs, on = Fe[Qt].endEpochMs ?? Fe[Qt].EndEpochMs;
                    if (!(on <= qe || At >= vt))
                      if (At >= qe && on <= vt)
                        Fe.splice(Qt, 1);
                      else if (At < qe && on > vt) {
                        const Zn = { ...Fe[Qt], endEpochMs: qe }, Cs = { ...Fe[Qt], startEpochMs: vt };
                        Fe.splice(Qt, 1, Zn, Cs);
                      } else At < qe ? Fe[Qt].endEpochMs = qe : on > vt && (Fe[Qt].startEpochMs = vt);
                  }
                  Fe.push(st);
                }), Fe.sort((st, qe) => (st.startEpochMs ?? st.StartEpochMs) - (qe.startEpochMs ?? qe.StartEpochMs)), { ...Re, [H.id]: { ...je, segments: Fe } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(ce);
  }, [de, _e, Je, f]);
  const $e = u.useMemo(() => Je.map((O) => ({
    ...O,
    directorPlan: kt[O.id] || O.directorPlan || Pt(O.id)
  })), [Je, kt, Pt]), Ce = u.useMemo(() => Ke ? {
    ...Ke,
    directorPlan: kt[Ke.id] || Ke.directorPlan || Pt(Ke.id)
  } : null, [Ke, kt, Pt]), gs = u.useMemo(() => Kt ? {
    ...Kt,
    directorPlan: kt[Kt.id] || Kt.directorPlan || Pt(Kt.id)
  } : null, [Kt, kt, Pt]);
  Hx({
    activeStationId: M,
    spotlightStationId: k,
    timelineStations: $e,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: Dt,
    setPlaybackSpeed: tn,
    playheadMs: Xe,
    setPlayheadMs: jt,
    inPointMs: de,
    setInPointMs: Ie,
    outPointMs: _e,
    setOutPointMs: Me,
    totalTimelineDurationMs: m,
    zoomLevel: Te,
    togglePlaySmart: bn,
    onToggleHelpModal: () => Ye((O) => !O),
    onSplitDirectorAtPlayhead: () => {
      var ue, ce, xe;
      const O = M || (y.length === 1 ? y[0] : null);
      if (O) {
        const H = Ne.find((je) => je.id === O);
        (((ue = H == null ? void 0 : H.displays) == null ? void 0 : ue.length) > 1 || ((xe = (ce = H == null ? void 0 : H.topology) == null ? void 0 : ce.displays) == null ? void 0 : xe.length) > 1) && kl(O, f + Xe);
      }
    },
    isModalActive: Z || Oe || et
  }), u.useEffect(() => {
    const O = f + de, ue = f + _e, ce = f + Xe;
    vp({
      timeRange: t,
      timeMode: r,
      inPointMs: de,
      outPointMs: _e,
      playheadMs: Math.round(Xe),
      inEpochMs: O,
      outEpochMs: ue,
      playheadEpochMs: ce,
      selectedStationIds: y,
      activeStationId: M,
      zoomLevel: Te,
      viewportStartMs: Ve,
      isWorkspaceActive: dt,
      isLooping: cn,
      playbackSpeed: Ot,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: P,
      compositionLayout: $,
      isAutoDirectorEnabled: V,
      isPipSwapped: C,
      audioRoutingPlan: Wt,
      isAutoFollowAudio: B,
      canvasLayoutTimeline: Pe
    });
  }, [
    t,
    r,
    de,
    _e,
    Xe,
    y,
    M,
    Te,
    Ve,
    dt,
    cn,
    Ot,
    f,
    o,
    i,
    P,
    $,
    V,
    C,
    Wt,
    B,
    Pe
  ]);
  const yo = u.useCallback((O) => {
    var fe, Fe;
    const ue = Rl(O.startTime), ce = Rl(O.endTime), xe = Math.max(0, ce - ue) || 144e5, H = {
      start: O.startTime,
      end: O.endTime,
      durationMs: xe,
      startEpochMs: ue,
      endEpochMs: ce
    }, ve = Math.max(6e4, Math.round(xe * 0.05)), je = ue - ve, Re = xe + 2 * ve;
    if (n(H), O.inEpochMs && O.outEpochMs) {
      const st = Math.max(0, Math.min(Re, O.inEpochMs - je)), qe = Math.max(st + 1e3, Math.min(Re, O.outEpochMs - je)), vt = O.playheadEpochMs ? Math.max(0, Math.min(Re, O.playheadEpochMs - je)) : st;
      Ie(st), Me(qe), jt(vt);
    } else {
      const st = typeof O.inPointMs == "number" ? O.inPointMs : ve, qe = typeof O.outPointMs == "number" ? O.outPointMs : ve + xe, vt = typeof O.playheadMs == "number" ? O.playheadMs : st;
      Ie(Math.max(0, Math.min(Re, st))), Me(Math.max(0, Math.min(Re, qe))), jt(Math.max(0, Math.min(Re, vt)));
    }
    const Ge = ((fe = O.selectedStationIds) == null ? void 0 : fe.length) > 0 ? O.selectedStationIds : ((Fe = O.cutStationIds) == null ? void 0 : Fe.length) > 0 ? O.cutStationIds : O.stationIds;
    if ((Ge == null ? void 0 : Ge.length) > 0) {
      E(Ge);
      const st = O.spotlightStationId || O.SpotlightStationId || null, qe = O.activeStationId || O.ActiveStationId || null;
      st && Ge.includes(st) ? (D(st), p(st)) : qe && Ge.includes(qe) ? (D(qe), p(null)) : (D(null), p(null));
    }
    O.keystrokeMode && a(O.keystrokeMode), pt(!0), Ct(!1);
  }, []), Ha = u.useCallback((O) => {
    const ue = O.startEpochMs || Rl(O.start, null, r), ce = O.endEpochMs || Rl(O.end, null, r), xe = Math.max(0, ce - ue) || 144e5, H = Math.max(6e4, Math.round(xe * 0.05)), ve = ue - H, je = xe + 2 * H;
    n({
      ...O,
      startEpochMs: ue,
      endEpochMs: ce,
      durationMs: xe
    }), T(!1), Ie(H), Me(H + xe), jt(H), we((Re) => {
      if (!(Re != null && Re.keyframes) || Re.keyframes.length === 0) return Re;
      const Ge = Re.keyframes.map((fe, Fe) => Fe === 0 ? { ...fe, timestampEpochMs: ve } : fe).filter((fe) => fe.timestampEpochMs >= ve && fe.timestampEpochMs <= ve + je);
      return { ...Re, keyframes: Ge };
    }), Y((Re) => {
      if (!(Re != null && Re.segments) || Re.segments.length === 0) return Re;
      if (!Re.segments.some((fe) => {
        const Fe = fe.startEpochMs ?? fe.StartEpochMs ?? 0;
        return (fe.endEpochMs ?? fe.EndEpochMs ?? 0) > ve && Fe < ve + je;
      })) {
        const fe = y[0] || M || "station-0";
        return {
          segments: [
            {
              startEpochMs: ve,
              endEpochMs: ve + je,
              sourceStationId: fe
            }
          ]
        };
      }
      return Re;
    }), Mn({});
  }, [r, y, M]), vo = u.useCallback(() => {
    if (Je.map((ue) => ue.id).length === 0) return alert("No active stations selected in timeline.");
    J(!0);
  }, [Je]), Ka = u.useCallback(async (O, ue) => {
    var je, Re, Ge, fe;
    const ce = Je.map((Fe) => Fe.id);
    if (ce.length === 0) return;
    let xe = O === "None" ? "None" : "BurnIn";
    const H = ue || "NATIVE", ve = ((je = Ce == null ? void 0 : Ce.displays) == null ? void 0 : je.length) > 1 || ((Ge = (Re = Ce == null ? void 0 : Ce.topology) == null ? void 0 : Re.displays) == null ? void 0 : Ge.length) > 1 ? ((fe = Ce == null ? void 0 : Ce.directorPlan) == null ? void 0 : fe.segments) || [] : [];
    try {
      const Fe = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: ce,
          inEpochMs: f + de,
          outEpochMs: f + _e,
          keystrokeMode: xe,
          resolution: H,
          videoQuality: H,
          compositionScope: P,
          layoutMode: "canvas",
          canvasLayout: le,
          canvasLayoutTimeline: Pe,
          isPipSwapped: C,
          isAutoDirectorEnabled: V,
          directorSegments: ve,
          audioRoutingSegments: Wt.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!Fe.ok) throw new Error(`HTTP ${Fe.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Fe) {
      console.error("[Studio] Export failed:", Fe), alert("Failed to launch background master MP4 export job.");
    }
  }, [Je, f, de, _e, P, le, Pe, C, V, Ce, Wt]), pr = u.useCallback(() => {
    Eg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const O = qd(), ue = Math.max(6e4, Math.round(O.durationMs * 0.05));
    n(O), Ie(ue), Me(ue + O.durationMs), jt(ue), E([]), D(null), p(null), Et(!1), tn(1), a("BURN_IN"), bt(), pt(!1), Ct(!0);
  }, [bt, Et, tn, jt]), sn = !dt || y.length === 0, Xt = f + Xe;
  return u.useEffect(() => {
    const O = Pe == null ? void 0 : Pe.keyframes;
    if (!O || O.length === 0) return;
    let ue = 0;
    for (let ce = 0; ce < O.length && O[ce].timestampEpochMs <= Xt + 50; ce++)
      ue = ce;
    ue !== ze && Le(ue);
  }, [Xt, Pe == null ? void 0 : Pe.keyframes, ze]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Ng,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: M,
          hideBackToGrid: Je.length <= 1,
          onResetActiveStation: () => Dt(null),
          onOpenRangeModal: () => Ee(!0),
          onOpenBookmarksModal: () => Qe(!0),
          onOpenHelpModal: () => Ye(!0),
          onToggleDrawer: () => Ct(!ct),
          isInitialSetup: sn,
          selectedCount: y.length,
          totalCount: Ne.length,
          onResetStudio: pr
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
              onClick: () => Ee(!0),
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
              onClick: () => T(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "studio-lower-body", children: [
        !sn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              Ug,
              {
                activeStation: Ce,
                timelineStations: $e,
                allStations: Ne,
                onSelectActiveStation: Dt,
                onOpenSpotlight: wn,
                onStationContextMenu: q,
                onDeselectStation: re,
                stationAutoDirectorMap: G,
                onToggleStationAutoDirector: Nt,
                onOpenDrawer: () => Ct(!0),
                baseEpochMs: f,
                playheadMs: Xe,
                playheadEpochMs: Xt,
                timeMode: r,
                isPlaying: Bt ? !1 : xn,
                setIsPlaying: Et,
                totalDurationMs: m,
                inPointMs: de,
                outPointMs: _e,
                setPlayheadMs: jt,
                globalGaps: S,
                recordingSegments: nt,
                playbackSpeed: Ot,
                onChangePlaybackSpeed: tn,
                keystrokeMode: o,
                keystrokes: Ut,
                directorPlan: Ce == null ? void 0 : Ce.directorPlan,
                onOverrideDisplay: Or,
                onResetOverride: Es,
                compositionScope: P,
                onChangeCompositionScope: K,
                compositionLayout: $,
                onChangeCompositionLayout: ne,
                isAutoDirectorEnabled: V,
                onToggleAutoDirector: () => oe((O) => !O),
                isPipSwapped: C,
                onTogglePipSwap: () => R((O) => !O),
                onUpdateCanvasLayout: We,
                canvasLayoutTimeline: Pe,
                onUpdateCanvasLayoutTimeline: we,
                activeKfIndex: ze,
                setActiveKfIndex: Le,
                isModalOpen: ee || Z || Oe || Bt || et
              }
            ),
            /* @__PURE__ */ s.jsx(
              wp,
              {
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: m,
                playheadMs: Xe,
                setPlayheadMs: jt,
                inPointMs: de,
                setInPointMs: Ie,
                outPointMs: _e,
                setOutPointMs: Me,
                activeStationId: M,
                isPlaying: xn,
                setIsPlaying: bn,
                isLooping: cn,
                setIsLooping: Dn,
                playbackSpeed: Ot,
                onChangeSpeed: tn,
                onSetInPoint: () => Ie(Math.max(0, Math.min(Xe, _e - 1e3))),
                onSetOutPoint: () => Me(Math.min(m, Math.max(Xe, de + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Ze, children: /* @__PURE__ */ s.jsx(
            Sp,
            {
              stations: $e,
              activeStationId: M,
              onSelectActiveStation: (O) => Dt(y.length <= 1 ? O : O === M ? null : O),
              onStationContextMenu: q,
              onDeselectStation: re,
              stationAutoDirectorMap: G,
              onToggleStationAutoDirector: Nt,
              baseEpochMs: f,
              timeMode: r,
              totalDurationMs: m,
              zoomLevel: Te,
              onZoomChange: Ae,
              onZoomReset: bt,
              onFitRange: te,
              onJumpViewportTo: me,
              playheadMs: Xe,
              setPlayheadMs: jt,
              inPointMs: de,
              setInPointMs: Ie,
              outPointMs: _e,
              setOutPointMs: Me,
              viewportStartMs: Ve,
              onViewportStartChange: ft,
              onExport: vo,
              recordingSegments: nt,
              movieBoundaries: Tt,
              onEstimateLoaded: (O) => (O == null ? void 0 : O.removedGlobalGaps) && j(O.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: a,
              keystrokes: Ut,
              showKeystrokes: i,
              showRulerKeystrokes: i,
              onToggleRulerKeystrokes: () => c((O) => !O),
              onSplitDirectorSegment: kl,
              onChangeDirectorSegmentDisplay: Or,
              onResetDirectorSegmentToAuto: Es,
              audioRoutingPlan: Wt,
              onSplitAudioSegment: as,
              onChangeAudioSegmentStation: js,
              onChangeAudioSegmentGain: Nl,
              onFollowVisualFeed: ln,
              isAutoFollowAudio: B,
              canvasLayoutTimeline: Pe,
              activeKfIndex: ze,
              onSelectKeyframe: (O, ue) => {
                Le(O), jt(Math.max(0, ue - f));
              },
              onAddKeyframeAtEpoch: Se,
              onDeleteKeyframe: ht,
              onUpdateKeyframeEpoch: A,
              onUpdateKeyframeTransition: He,
              onToggleDisplayOnCanvas: Ft,
              onUpdateAudioPlan: Y
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          Sx,
          {
            isOpen: ct || sn,
            onToggle: () => Ct(!ct),
            onClose: () => Ct(!1),
            allStations: Ne,
            selectedStationIds: y,
            onToggleStation: (O) => E((ue) => ue.includes(O) ? ue.filter((ce) => ce !== O) : [...ue, O]),
            onUpdateSelections: E,
            isInitialSetup: sn,
            isLoadingStations: Be,
            recordingSegments: nt,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (D(null), p(null), pt(!0), Ct(!1));
            },
            onOpenRangeModal: () => Ee(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Ix,
      {
        isOpen: Z,
        onClose: () => Ee(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: yo,
        onApplyRange: Ha
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ax,
      {
        isOpen: Oe,
        onClose: () => Qe(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: Xe,
          inPointMs: de,
          outPointMs: _e,
          selectedStationIds: y,
          selectedStationNames: Ne.filter((O) => y.includes(O.id)).map((O) => O.displayName || O.hostname || O.id),
          allStationIds: Ne.map((O) => O.id),
          activeStationId: M,
          activeStationName: (Ke == null ? void 0 : Ke.displayName) || (Ke == null ? void 0 : Ke.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: yo
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ip,
      {
        isOpen: et,
        onClose: () => Ye(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Px,
      {
        isOpen: Bt,
        station: gs,
        initialDisplayId: h,
        allStations: $e,
        onSelectStation: (O) => {
          O !== k && tn(1), D(O), p(O);
        },
        onClose: fn,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: m,
        zoomLevel: Te,
        onZoomChange: Ae,
        onZoomReset: bt,
        onFitRange: te,
        onJumpViewportTo: me,
        viewportStartMs: Ve,
        onViewportStartChange: ft,
        playheadMs: Xe,
        setPlayheadMs: jt,
        playheadEpochMs: Xt,
        inPointMs: de,
        setInPointMs: Ie,
        outPointMs: _e,
        setOutPointMs: Me,
        recordingSegments: nt,
        globalGaps: S,
        isPlaying: xn,
        setIsPlaying: Et,
        isLooping: cn,
        setIsLooping: Dn,
        playbackSpeed: Ot,
        setPlaybackSpeed: tn,
        onExport: vo,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: Ut,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((O) => !O),
        directorPlan: gs == null ? void 0 : gs.directorPlan,
        onOverrideDisplay: Or,
        onSplitDirectorSegment: kl,
        onChangeDirectorSegmentDisplay: Or,
        onResetDirectorSegmentToAuto: Es
      }
    ),
    /* @__PURE__ */ s.jsx(
      _x,
      {
        menu: x,
        onClose: () => I(null),
        onDeselect: re,
        onFocusSolo: Dt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Fx,
      {
        isOpen: ee,
        onClose: () => J(!1),
        onConfirm: Ka,
        compositionSummary: {
          scope: P,
          layout: (le == null ? void 0 : le.preset) || $,
          isPipSwapped: C,
          isAutoDirectorEnabled: V,
          stationsCount: Je.length,
          audioSegmentsCount: ((un = Wt == null ? void 0 : Wt.segments) == null ? void 0 : un.length) || 1,
          resolution: (Pe == null ? void 0 : Pe.resolution) || "NATIVE",
          canvasWidth: (le == null ? void 0 : le.width) || 1920,
          canvasHeight: (le == null ? void 0 : le.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Tp, {})
  ] });
}
const eh = "itb-extractor-advanced-theme", th = "itb-global-export-job-monitor-root";
function Ap() {
  if (!(typeof document > "u") && !document.getElementById(eh)) {
    const e = document.createElement("link");
    e.id = eh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Ap();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(th);
  if (!t) {
    t = document.createElement("div"), t.id = th, document.body.appendChild(t);
    try {
      ta.createRoot(t).render(fo.createElement(Tp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Vx(e, t = {}) {
  Ap();
  const n = ta.createRoot(e);
  return n.render(fo.createElement(Kx, t)), () => {
    n.unmount();
  };
}
export {
  Tp as ExportJobMonitor,
  Kx as ExtractorAdvancedStudio,
  Kx as default,
  Vx as mount
};
