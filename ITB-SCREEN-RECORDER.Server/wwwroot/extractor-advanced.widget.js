function Bp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zd = { exports: {} }, xt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var co = Symbol.for("react.element"), Up = Symbol.for("react.portal"), Wp = Symbol.for("react.fragment"), zp = Symbol.for("react.strict_mode"), Hp = Symbol.for("react.profiler"), Kp = Symbol.for("react.provider"), Vp = Symbol.for("react.context"), Yp = Symbol.for("react.forward_ref"), Gp = Symbol.for("react.suspense"), Xp = Symbol.for("react.memo"), Qp = Symbol.for("react.lazy"), Iu = Symbol.iterator;
function Jp(e) {
  return e === null || typeof e != "object" ? null : (e = Iu && e[Iu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var qd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, eh = Object.assign, th = {};
function gl(e, t, n) {
  this.props = e, this.context = t, this.refs = th, this.updater = n || qd;
}
gl.prototype.isReactComponent = {};
gl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
gl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function nh() {
}
nh.prototype = gl.prototype;
function bc(e, t, n) {
  this.props = e, this.context = t, this.refs = th, this.updater = n || qd;
}
var Mc = bc.prototype = new nh();
Mc.constructor = bc;
eh(Mc, gl.prototype);
Mc.isPureReactComponent = !0;
var Tu = Array.isArray, sh = Object.prototype.hasOwnProperty, Ic = { current: null }, rh = { key: !0, ref: !0, __self: !0, __source: !0 };
function lh(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) sh.call(t, r) && !rh.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), h = 0; h < a; h++) c[h] = arguments[h + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: co, type: e, key: o, ref: i, props: l, _owner: Ic.current };
}
function Zp(e, t) {
  return { $$typeof: co, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Tc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === co;
}
function qp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Au = /\/+/g;
function Gi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? qp("" + e.key) : t.toString(36);
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
        case co:
        case Up:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Gi(i, 0) : r, Tu(l) ? (n = "", e != null && (n = e.replace(Au, "$&/") + "/"), Fo(l, t, n, "", function(h) {
    return h;
  })) : l != null && (Tc(l) && (l = Zp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Au, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Tu(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + Gi(o, a);
    i += Fo(o, t, n, c, l);
  }
  else if (c = Jp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + Gi(o, a++), i += Fo(o, t, n, c, l);
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
function em(e) {
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
var Rn = { current: null }, Bo = { transition: null }, tm = { ReactCurrentDispatcher: Rn, ReactCurrentBatchConfig: Bo, ReactCurrentOwner: Ic };
function oh() {
  throw Error("act(...) is not supported in production builds of React.");
}
xt.Children = { map: No, forEach: function(e, t, n) {
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
  if (!Tc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
xt.Component = gl;
xt.Fragment = Wp;
xt.Profiler = Hp;
xt.PureComponent = bc;
xt.StrictMode = zp;
xt.Suspense = Gp;
xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tm;
xt.act = oh;
xt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = eh({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Ic.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) sh.call(t, c) && !rh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var h = 0; h < c; h++) a[h] = arguments[h + 2];
    r.children = a;
  }
  return { $$typeof: co, type: e.type, key: l, ref: o, props: r, _owner: i };
};
xt.createContext = function(e) {
  return e = { $$typeof: Vp, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Kp, _context: e }, e.Consumer = e;
};
xt.createElement = lh;
xt.createFactory = function(e) {
  var t = lh.bind(null, e);
  return t.type = e, t;
};
xt.createRef = function() {
  return { current: null };
};
xt.forwardRef = function(e) {
  return { $$typeof: Yp, render: e };
};
xt.isValidElement = Tc;
xt.lazy = function(e) {
  return { $$typeof: Qp, _payload: { _status: -1, _result: e }, _init: em };
};
xt.memo = function(e, t) {
  return { $$typeof: Xp, type: e, compare: t === void 0 ? null : t };
};
xt.startTransition = function(e) {
  var t = Bo.transition;
  Bo.transition = {};
  try {
    e();
  } finally {
    Bo.transition = t;
  }
};
xt.unstable_act = oh;
xt.useCallback = function(e, t) {
  return Rn.current.useCallback(e, t);
};
xt.useContext = function(e) {
  return Rn.current.useContext(e);
};
xt.useDebugValue = function() {
};
xt.useDeferredValue = function(e) {
  return Rn.current.useDeferredValue(e);
};
xt.useEffect = function(e, t) {
  return Rn.current.useEffect(e, t);
};
xt.useId = function() {
  return Rn.current.useId();
};
xt.useImperativeHandle = function(e, t, n) {
  return Rn.current.useImperativeHandle(e, t, n);
};
xt.useInsertionEffect = function(e, t) {
  return Rn.current.useInsertionEffect(e, t);
};
xt.useLayoutEffect = function(e, t) {
  return Rn.current.useLayoutEffect(e, t);
};
xt.useMemo = function(e, t) {
  return Rn.current.useMemo(e, t);
};
xt.useReducer = function(e, t, n) {
  return Rn.current.useReducer(e, t, n);
};
xt.useRef = function(e) {
  return Rn.current.useRef(e);
};
xt.useState = function(e) {
  return Rn.current.useState(e);
};
xt.useSyncExternalStore = function(e, t, n) {
  return Rn.current.useSyncExternalStore(e, t, n);
};
xt.useTransition = function() {
  return Rn.current.useTransition();
};
xt.version = "18.3.1";
Zd.exports = xt;
var u = Zd.exports;
const uo = /* @__PURE__ */ Bp(u);
var qo = {}, ih = { exports: {} }, Xn = {}, ah = { exports: {} }, ch = {};
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
  function t(I, R) {
    var _ = I.length;
    I.push(R);
    e: for (; 0 < _; ) {
      var K = _ - 1 >>> 1, F = I[K];
      if (0 < l(F, R)) I[K] = R, I[_] = F, _ = K;
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function r(I) {
    if (I.length === 0) return null;
    var R = I[0], _ = I.pop();
    if (_ !== R) {
      I[0] = _;
      e: for (var K = 0, F = I.length, te = F >>> 1; K < te; ) {
        var Z = 2 * (K + 1) - 1, G = I[Z], le = Z + 1, ze = I[le];
        if (0 > l(G, _)) le < F && 0 > l(ze, G) ? (I[K] = ze, I[le] = _, K = le) : (I[K] = G, I[Z] = _, K = Z);
        else if (le < F && 0 > l(ze, _)) I[K] = ze, I[le] = _, K = le;
        else break e;
      }
    }
    return R;
  }
  function l(I, R) {
    var _ = I.sortIndex - R.sortIndex;
    return _ !== 0 ? _ : I.id - R.id;
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
  var c = [], h = [], v = 1, m = null, x = 3, y = !1, C = !1, b = !1, D = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(I) {
    for (var R = n(h); R !== null; ) {
      if (R.callback === null) r(h);
      else if (R.startTime <= I) r(h), R.sortIndex = R.expirationTime, t(c, R);
      else break;
      R = n(h);
    }
  }
  function S(I) {
    if (b = !1, d(I), !C) if (n(c) !== null) C = !0, B(E);
    else {
      var R = n(h);
      R !== null && re(S, R.startTime - I);
    }
  }
  function E(I, R) {
    C = !1, b && (b = !1, k(T), T = -1), y = !0;
    var _ = x;
    try {
      for (d(R), m = n(c); m !== null && (!(m.expirationTime > R) || I && !O()); ) {
        var K = m.callback;
        if (typeof K == "function") {
          m.callback = null, x = m.priorityLevel;
          var F = K(m.expirationTime <= R);
          R = e.unstable_now(), typeof F == "function" ? m.callback = F : m === n(c) && r(c), d(R);
        } else r(c);
        m = n(c);
      }
      if (m !== null) var te = !0;
      else {
        var Z = n(h);
        Z !== null && re(S, Z.startTime - R), te = !1;
      }
      return te;
    } finally {
      m = null, x = _, y = !1;
    }
  }
  var j = !1, N = null, T = -1, g = 5, M = -1;
  function O() {
    return !(e.unstable_now() - M < g);
  }
  function U() {
    if (N !== null) {
      var I = e.unstable_now();
      M = I;
      var R = !0;
      try {
        R = N(!0, I);
      } finally {
        R ? A() : (j = !1, N = null);
      }
    } else j = !1;
  }
  var A;
  if (typeof f == "function") A = function() {
    f(U);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), oe = W.port2;
    W.port1.onmessage = U, A = function() {
      oe.postMessage(null);
    };
  } else A = function() {
    D(U, 0);
  };
  function B(I) {
    N = I, j || (j = !0, A());
  }
  function re(I, R) {
    T = D(function() {
      I(e.unstable_now());
    }, R);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    C || y || (C = !0, B(E));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : g = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return x;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(I) {
    switch (x) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = x;
    }
    var _ = x;
    x = R;
    try {
      return I();
    } finally {
      x = _;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, R) {
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
    var _ = x;
    x = I;
    try {
      return R();
    } finally {
      x = _;
    }
  }, e.unstable_scheduleCallback = function(I, R, _) {
    var K = e.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? K + _ : K) : _ = K, I) {
      case 1:
        var F = -1;
        break;
      case 2:
        F = 250;
        break;
      case 5:
        F = 1073741823;
        break;
      case 4:
        F = 1e4;
        break;
      default:
        F = 5e3;
    }
    return F = _ + F, I = { id: v++, callback: R, priorityLevel: I, startTime: _, expirationTime: F, sortIndex: -1 }, _ > K ? (I.sortIndex = _, t(h, I), n(c) === null && I === n(h) && (b ? (k(T), T = -1) : b = !0, re(S, _ - K))) : (I.sortIndex = F, t(c, I), C || y || (C = !0, B(E))), I;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(I) {
    var R = x;
    return function() {
      var _ = x;
      x = R;
      try {
        return I.apply(this, arguments);
      } finally {
        x = _;
      }
    };
  };
})(ch);
ah.exports = ch;
var nm = ah.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sm = u, Gn = nm;
function ve(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var uh = /* @__PURE__ */ new Set(), Kl = {};
function $r(e, t) {
  cl(e, t), cl(e + "Capture", t);
}
function cl(e, t) {
  for (Kl[e] = t, e = 0; e < t.length; e++) uh.add(t[e]);
}
var Rs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ma = Object.prototype.hasOwnProperty, rm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ru = {}, $u = {};
function lm(e) {
  return Ma.call($u, e) ? !0 : Ma.call(Ru, e) ? !1 : rm.test(e) ? $u[e] = !0 : (Ru[e] = !0, !1);
}
function om(e, t, n, r) {
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
function im(e, t, n, r) {
  if (t === null || typeof t > "u" || om(e, t, n, r)) return !0;
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
var yn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  yn[e] = new $n(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  yn[t] = new $n(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  yn[e] = new $n(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  yn[e] = new $n(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  yn[e] = new $n(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  yn[e] = new $n(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  yn[e] = new $n(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  yn[e] = new $n(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  yn[e] = new $n(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ac = /[\-:]([a-z])/g;
function Rc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ac,
    Rc
  );
  yn[t] = new $n(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ac, Rc);
  yn[t] = new $n(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ac, Rc);
  yn[t] = new $n(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  yn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
yn.xlinkHref = new $n("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  yn[e] = new $n(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function $c(e, t, n, r) {
  var l = yn.hasOwnProperty(t) ? yn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (im(t, n, l, r) && (n = null), r || l === null ? lm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ds = sm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ko = Symbol.for("react.element"), Ur = Symbol.for("react.portal"), Wr = Symbol.for("react.fragment"), Lc = Symbol.for("react.strict_mode"), Ia = Symbol.for("react.profiler"), dh = Symbol.for("react.provider"), hh = Symbol.for("react.context"), Oc = Symbol.for("react.forward_ref"), Ta = Symbol.for("react.suspense"), Aa = Symbol.for("react.suspense_list"), Dc = Symbol.for("react.memo"), Ks = Symbol.for("react.lazy"), fh = Symbol.for("react.offscreen"), Lu = Symbol.iterator;
function wl(e) {
  return e === null || typeof e != "object" ? null : (e = Lu && e[Lu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Jt = Object.assign, Xi;
function Rl(e) {
  if (Xi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Xi = t && t[1] || "";
  }
  return `
` + Xi + e;
}
var Qi = !1;
function Ji(e, t) {
  if (!e || Qi) return "";
  Qi = !0;
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
    Qi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Rl(e) : "";
}
function am(e) {
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
      return e = Ji(e.type, !1), e;
    case 11:
      return e = Ji(e.type.render, !1), e;
    case 1:
      return e = Ji(e.type, !0), e;
    default:
      return "";
  }
}
function Ra(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Wr:
      return "Fragment";
    case Ur:
      return "Portal";
    case Ia:
      return "Profiler";
    case Lc:
      return "StrictMode";
    case Ta:
      return "Suspense";
    case Aa:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case hh:
      return (e.displayName || "Context") + ".Consumer";
    case dh:
      return (e._context.displayName || "Context") + ".Provider";
    case Oc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Dc:
      return t = e.displayName || null, t !== null ? t : Ra(e.type) || "Memo";
    case Ks:
      t = e._payload, e = e._init;
      try {
        return Ra(e(t));
      } catch {
      }
  }
  return null;
}
function cm(e) {
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
      return Ra(t);
    case 8:
      return t === Lc ? "StrictMode" : "Mode";
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
function ph(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function um(e) {
  var t = ph(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = um(e));
}
function mh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ph(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ei(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function $a(e, t) {
  var n = t.checked;
  return Jt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ou(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ar(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function gh(e, t) {
  t = t.checked, t != null && $c(e, "checked", t, !1);
}
function La(e, t) {
  gh(e, t);
  var n = ar(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Oa(e, t.type, n) : t.hasOwnProperty("defaultValue") && Oa(e, t.type, ar(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Du(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Oa(e, t, n) {
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
function Da(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ve(91));
  return Jt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Pu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(ve(92));
      if ($l(n)) {
        if (1 < n.length) throw Error(ve(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ar(n) };
}
function xh(e, t) {
  var n = ar(t.value), r = ar(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function _u(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function yh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Pa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? yh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var jo, vh = function(e) {
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
function Vl(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Dl = {
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
}, dm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Dl).forEach(function(e) {
  dm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Dl[t] = Dl[e];
  });
});
function Nh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Dl.hasOwnProperty(e) && Dl[e] ? ("" + t).trim() : t + "px";
}
function kh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Nh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var hm = Jt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function _a(e, t) {
  if (t) {
    if (hm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ve(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ve(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ve(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ve(62));
  }
}
function Fa(e, t) {
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
var Ba = null;
function Pc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ua = null, tl = null, nl = null;
function Fu(e) {
  if (e = po(e)) {
    if (typeof Ua != "function") throw Error(ve(280));
    var t = e.stateNode;
    t && (t = Ti(t), Ua(e.stateNode, e.type, t));
  }
}
function wh(e) {
  tl ? nl ? nl.push(e) : nl = [e] : tl = e;
}
function jh() {
  if (tl) {
    var e = tl, t = nl;
    if (nl = tl = null, Fu(e), t) for (e = 0; e < t.length; e++) Fu(t[e]);
  }
}
function Eh(e, t) {
  return e(t);
}
function Ch() {
}
var Zi = !1;
function Sh(e, t, n) {
  if (Zi) return e(t, n);
  Zi = !0;
  try {
    return Eh(e, t, n);
  } finally {
    Zi = !1, (tl !== null || nl !== null) && (Ch(), jh());
  }
}
function Yl(e, t) {
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
  if (n && typeof n != "function") throw Error(ve(231, t, typeof n));
  return n;
}
var Wa = !1;
if (Rs) try {
  var jl = {};
  Object.defineProperty(jl, "passive", { get: function() {
    Wa = !0;
  } }), window.addEventListener("test", jl, jl), window.removeEventListener("test", jl, jl);
} catch {
  Wa = !1;
}
function fm(e, t, n, r, l, o, i, a, c) {
  var h = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, h);
  } catch (v) {
    this.onError(v);
  }
}
var Pl = !1, ti = null, ni = !1, za = null, pm = { onError: function(e) {
  Pl = !0, ti = e;
} };
function mm(e, t, n, r, l, o, i, a, c) {
  Pl = !1, ti = null, fm.apply(pm, arguments);
}
function gm(e, t, n, r, l, o, i, a, c) {
  if (mm.apply(this, arguments), Pl) {
    if (Pl) {
      var h = ti;
      Pl = !1, ti = null;
    } else throw Error(ve(198));
    ni || (ni = !0, za = h);
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
function bh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Bu(e) {
  if (Lr(e) !== e) throw Error(ve(188));
}
function xm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Lr(e), t === null) throw Error(ve(188));
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
        if (o === n) return Bu(l), e;
        if (o === r) return Bu(l), t;
        o = o.sibling;
      }
      throw Error(ve(188));
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
        if (!i) throw Error(ve(189));
      }
    }
    if (n.alternate !== r) throw Error(ve(190));
  }
  if (n.tag !== 3) throw Error(ve(188));
  return n.stateNode.current === n ? e : t;
}
function Mh(e) {
  return e = xm(e), e !== null ? Ih(e) : null;
}
function Ih(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ih(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Th = Gn.unstable_scheduleCallback, Uu = Gn.unstable_cancelCallback, ym = Gn.unstable_shouldYield, vm = Gn.unstable_requestPaint, sn = Gn.unstable_now, Nm = Gn.unstable_getCurrentPriorityLevel, _c = Gn.unstable_ImmediatePriority, Ah = Gn.unstable_UserBlockingPriority, si = Gn.unstable_NormalPriority, km = Gn.unstable_LowPriority, Rh = Gn.unstable_IdlePriority, Si = null, ks = null;
function wm(e) {
  if (ks && typeof ks.onCommitFiberRoot == "function") try {
    ks.onCommitFiberRoot(Si, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ds = Math.clz32 ? Math.clz32 : Cm, jm = Math.log, Em = Math.LN2;
function Cm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (jm(e) / Em | 0) | 0;
}
var Eo = 64, Co = 4194304;
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
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ds(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Sm(e, t) {
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
function bm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - ds(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = Sm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Ha(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function $h() {
  var e = Eo;
  return Eo <<= 1, !(Eo & 4194240) && (Eo = 64), e;
}
function qi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ho(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ds(t), e[t] = n;
}
function Mm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ds(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Fc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ds(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Rt = 0;
function Lh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Oh, Bc, Dh, Ph, _h, Ka = !1, So = [], er = null, tr = null, nr = null, Gl = /* @__PURE__ */ new Map(), Xl = /* @__PURE__ */ new Map(), Xs = [], Im = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Wu(e, t) {
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
      Gl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xl.delete(t.pointerId);
  }
}
function El(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = po(t), t !== null && Bc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Tm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return er = El(er, e, t, n, r, l), !0;
    case "dragenter":
      return tr = El(tr, e, t, n, r, l), !0;
    case "mouseover":
      return nr = El(nr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Gl.set(o, El(Gl.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Xl.set(o, El(Xl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Fh(e) {
  var t = kr(e.target);
  if (t !== null) {
    var n = Lr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = bh(n), t !== null) {
          e.blockedOn = t, _h(e.priority, function() {
            Dh(n);
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
    var n = Va(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ba = r, n.target.dispatchEvent(r), Ba = null;
    } else return t = po(n), t !== null && Bc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function zu(e, t, n) {
  Uo(e) && n.delete(t);
}
function Am() {
  Ka = !1, er !== null && Uo(er) && (er = null), tr !== null && Uo(tr) && (tr = null), nr !== null && Uo(nr) && (nr = null), Gl.forEach(zu), Xl.forEach(zu);
}
function Cl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ka || (Ka = !0, Gn.unstable_scheduleCallback(Gn.unstable_NormalPriority, Am)));
}
function Ql(e) {
  function t(l) {
    return Cl(l, e);
  }
  if (0 < So.length) {
    Cl(So[0], e);
    for (var n = 1; n < So.length; n++) {
      var r = So[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (er !== null && Cl(er, e), tr !== null && Cl(tr, e), nr !== null && Cl(nr, e), Gl.forEach(t), Xl.forEach(t), n = 0; n < Xs.length; n++) r = Xs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Xs.length && (n = Xs[0], n.blockedOn === null); ) Fh(n), n.blockedOn === null && Xs.shift();
}
var sl = Ds.ReactCurrentBatchConfig, li = !0;
function Rm(e, t, n, r) {
  var l = Rt, o = sl.transition;
  sl.transition = null;
  try {
    Rt = 1, Uc(e, t, n, r);
  } finally {
    Rt = l, sl.transition = o;
  }
}
function $m(e, t, n, r) {
  var l = Rt, o = sl.transition;
  sl.transition = null;
  try {
    Rt = 4, Uc(e, t, n, r);
  } finally {
    Rt = l, sl.transition = o;
  }
}
function Uc(e, t, n, r) {
  if (li) {
    var l = Va(e, t, n, r);
    if (l === null) ca(e, t, r, oi, n), Wu(e, r);
    else if (Tm(l, e, t, n, r)) r.stopPropagation();
    else if (Wu(e, r), t & 4 && -1 < Im.indexOf(e)) {
      for (; l !== null; ) {
        var o = po(l);
        if (o !== null && Oh(o), o = Va(e, t, n, r), o === null && ca(e, t, r, oi, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ca(e, t, r, null, n);
  }
}
var oi = null;
function Va(e, t, n, r) {
  if (oi = null, e = Pc(r), e = kr(e), e !== null) if (t = Lr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = bh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return oi = e, null;
}
function Bh(e) {
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
      switch (Nm()) {
        case _c:
          return 1;
        case Ah:
          return 4;
        case si:
        case km:
          return 16;
        case Rh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Zs = null, Wc = null, Wo = null;
function Uh() {
  if (Wo) return Wo;
  var e, t = Wc, n = t.length, r, l = "value" in Zs ? Zs.value : Zs.textContent, o = l.length;
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
function Hu() {
  return !1;
}
function Qn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? bo : Hu, this.isPropagationStopped = Hu, this;
  }
  return Jt(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, zc = Qn(xl), fo = Jt({}, xl, { view: 0, detail: 0 }), Lm = Qn(fo), ea, ta, Sl, bi = Jt({}, fo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Hc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sl && (Sl && e.type === "mousemove" ? (ea = e.screenX - Sl.screenX, ta = e.screenY - Sl.screenY) : ta = ea = 0, Sl = e), ea);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ta;
} }), Ku = Qn(bi), Om = Jt({}, bi, { dataTransfer: 0 }), Dm = Qn(Om), Pm = Jt({}, fo, { relatedTarget: 0 }), na = Qn(Pm), _m = Jt({}, xl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Fm = Qn(_m), Bm = Jt({}, xl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Um = Qn(Bm), Wm = Jt({}, xl, { data: 0 }), Vu = Qn(Wm), zm = {
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
}, Hm = {
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
}, Km = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Vm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Km[e]) ? !!t[e] : !1;
}
function Hc() {
  return Vm;
}
var Ym = Jt({}, fo, { key: function(e) {
  if (e.key) {
    var t = zm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Hc, charCode: function(e) {
  return e.type === "keypress" ? zo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Gm = Qn(Ym), Xm = Jt({}, bi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Yu = Qn(Xm), Qm = Jt({}, fo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Hc }), Jm = Qn(Qm), Zm = Jt({}, xl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qm = Qn(Zm), e0 = Jt({}, bi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), t0 = Qn(e0), n0 = [9, 13, 27, 32], Kc = Rs && "CompositionEvent" in window, _l = null;
Rs && "documentMode" in document && (_l = document.documentMode);
var s0 = Rs && "TextEvent" in window && !_l, Wh = Rs && (!Kc || _l && 8 < _l && 11 >= _l), Gu = " ", Xu = !1;
function zh(e, t) {
  switch (e) {
    case "keyup":
      return n0.indexOf(t.keyCode) !== -1;
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
function Hh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var zr = !1;
function r0(e, t) {
  switch (e) {
    case "compositionend":
      return Hh(t);
    case "keypress":
      return t.which !== 32 ? null : (Xu = !0, Gu);
    case "textInput":
      return e = t.data, e === Gu && Xu ? null : e;
    default:
      return null;
  }
}
function l0(e, t) {
  if (zr) return e === "compositionend" || !Kc && zh(e, t) ? (e = Uh(), Wo = Wc = Zs = null, zr = !1, e) : null;
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
      return Wh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var o0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Qu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!o0[e.type] : t === "textarea";
}
function Kh(e, t, n, r) {
  wh(r), t = ii(t, "onChange"), 0 < t.length && (n = new zc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Fl = null, Jl = null;
function i0(e) {
  nf(e, 0);
}
function Mi(e) {
  var t = Vr(e);
  if (mh(t)) return e;
}
function a0(e, t) {
  if (e === "change") return t;
}
var Vh = !1;
if (Rs) {
  var sa;
  if (Rs) {
    var ra = "oninput" in document;
    if (!ra) {
      var Ju = document.createElement("div");
      Ju.setAttribute("oninput", "return;"), ra = typeof Ju.oninput == "function";
    }
    sa = ra;
  } else sa = !1;
  Vh = sa && (!document.documentMode || 9 < document.documentMode);
}
function Zu() {
  Fl && (Fl.detachEvent("onpropertychange", Yh), Jl = Fl = null);
}
function Yh(e) {
  if (e.propertyName === "value" && Mi(Jl)) {
    var t = [];
    Kh(t, Jl, e, Pc(e)), Sh(i0, t);
  }
}
function c0(e, t, n) {
  e === "focusin" ? (Zu(), Fl = t, Jl = n, Fl.attachEvent("onpropertychange", Yh)) : e === "focusout" && Zu();
}
function u0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Mi(Jl);
}
function d0(e, t) {
  if (e === "click") return Mi(t);
}
function h0(e, t) {
  if (e === "input" || e === "change") return Mi(t);
}
function f0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var fs = typeof Object.is == "function" ? Object.is : f0;
function Zl(e, t) {
  if (fs(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ma.call(t, l) || !fs(e[l], t[l])) return !1;
  }
  return !0;
}
function qu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ed(e, t) {
  var n = qu(e);
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
    n = qu(n);
  }
}
function Gh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Xh() {
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
function Vc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function p0(e) {
  var t = Xh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Vc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ed(n, o);
        var i = ed(
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
var m0 = Rs && "documentMode" in document && 11 >= document.documentMode, Hr = null, Ya = null, Bl = null, Ga = !1;
function td(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ga || Hr == null || Hr !== ei(r) || (r = Hr, "selectionStart" in r && Vc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Bl && Zl(Bl, r) || (Bl = r, r = ii(Ya, "onSelect"), 0 < r.length && (t = new zc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Hr)));
}
function Mo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Kr = { animationend: Mo("Animation", "AnimationEnd"), animationiteration: Mo("Animation", "AnimationIteration"), animationstart: Mo("Animation", "AnimationStart"), transitionend: Mo("Transition", "TransitionEnd") }, la = {}, Qh = {};
Rs && (Qh = document.createElement("div").style, "AnimationEvent" in window || (delete Kr.animationend.animation, delete Kr.animationiteration.animation, delete Kr.animationstart.animation), "TransitionEvent" in window || delete Kr.transitionend.transition);
function Ii(e) {
  if (la[e]) return la[e];
  if (!Kr[e]) return e;
  var t = Kr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Qh) return la[e] = t[n];
  return e;
}
var Jh = Ii("animationend"), Zh = Ii("animationiteration"), qh = Ii("animationstart"), ef = Ii("transitionend"), tf = /* @__PURE__ */ new Map(), nd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ur(e, t) {
  tf.set(e, t), $r(t, [e]);
}
for (var oa = 0; oa < nd.length; oa++) {
  var ia = nd[oa], g0 = ia.toLowerCase(), x0 = ia[0].toUpperCase() + ia.slice(1);
  ur(g0, "on" + x0);
}
ur(Jh, "onAnimationEnd");
ur(Zh, "onAnimationIteration");
ur(qh, "onAnimationStart");
ur("dblclick", "onDoubleClick");
ur("focusin", "onFocus");
ur("focusout", "onBlur");
ur(ef, "onTransitionEnd");
cl("onMouseEnter", ["mouseout", "mouseover"]);
cl("onMouseLeave", ["mouseout", "mouseover"]);
cl("onPointerEnter", ["pointerout", "pointerover"]);
cl("onPointerLeave", ["pointerout", "pointerover"]);
$r("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
$r("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
$r("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
$r("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
$r("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
$r("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ol = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), y0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ol));
function sd(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, gm(r, t, void 0, e), e.currentTarget = null;
}
function nf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, h = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        sd(l, a, h), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, h = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        sd(l, a, h), o = c;
      }
    }
  }
  if (ni) throw e = za, ni = !1, za = null, e;
}
function zt(e, t) {
  var n = t[qa];
  n === void 0 && (n = t[qa] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (sf(t, e, 2, !1), n.add(r));
}
function aa(e, t, n) {
  var r = 0;
  t && (r |= 4), sf(n, e, r, t);
}
var Io = "_reactListening" + Math.random().toString(36).slice(2);
function ql(e) {
  if (!e[Io]) {
    e[Io] = !0, uh.forEach(function(n) {
      n !== "selectionchange" && (y0.has(n) || aa(n, !1, e), aa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Io] || (t[Io] = !0, aa("selectionchange", !1, t));
  }
}
function sf(e, t, n, r) {
  switch (Bh(t)) {
    case 1:
      var l = Rm;
      break;
    case 4:
      l = $m;
      break;
    default:
      l = Uc;
  }
  n = l.bind(null, t, n, e), l = void 0, !Wa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ca(e, t, n, r, l) {
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
  Sh(function() {
    var h = o, v = Pc(n), m = [];
    e: {
      var x = tf.get(e);
      if (x !== void 0) {
        var y = zc, C = e;
        switch (e) {
          case "keypress":
            if (zo(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Gm;
            break;
          case "focusin":
            C = "focus", y = na;
            break;
          case "focusout":
            C = "blur", y = na;
            break;
          case "beforeblur":
          case "afterblur":
            y = na;
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
            y = Ku;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Dm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Jm;
            break;
          case Jh:
          case Zh:
          case qh:
            y = Fm;
            break;
          case ef:
            y = qm;
            break;
          case "scroll":
            y = Lm;
            break;
          case "wheel":
            y = t0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Um;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Yu;
        }
        var b = (t & 4) !== 0, D = !b && e === "scroll", k = b ? x !== null ? x + "Capture" : null : x;
        b = [];
        for (var f = h, d; f !== null; ) {
          d = f;
          var S = d.stateNode;
          if (d.tag === 5 && S !== null && (d = S, k !== null && (S = Yl(f, k), S != null && b.push(eo(f, S, d)))), D) break;
          f = f.return;
        }
        0 < b.length && (x = new y(x, C, null, n, v), m.push({ event: x, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (x = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", x && n !== Ba && (C = n.relatedTarget || n.fromElement) && (kr(C) || C[$s])) break e;
        if ((y || x) && (x = v.window === v ? v : (x = v.ownerDocument) ? x.defaultView || x.parentWindow : window, y ? (C = n.relatedTarget || n.toElement, y = h, C = C ? kr(C) : null, C !== null && (D = Lr(C), C !== D || C.tag !== 5 && C.tag !== 6) && (C = null)) : (y = null, C = h), y !== C)) {
          if (b = Ku, S = "onMouseLeave", k = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (b = Yu, S = "onPointerLeave", k = "onPointerEnter", f = "pointer"), D = y == null ? x : Vr(y), d = C == null ? x : Vr(C), x = new b(S, f + "leave", y, n, v), x.target = D, x.relatedTarget = d, S = null, kr(v) === h && (b = new b(k, f + "enter", C, n, v), b.target = d, b.relatedTarget = D, S = b), D = S, y && C) t: {
            for (b = y, k = C, f = 0, d = b; d; d = Dr(d)) f++;
            for (d = 0, S = k; S; S = Dr(S)) d++;
            for (; 0 < f - d; ) b = Dr(b), f--;
            for (; 0 < d - f; ) k = Dr(k), d--;
            for (; f--; ) {
              if (b === k || k !== null && b === k.alternate) break t;
              b = Dr(b), k = Dr(k);
            }
            b = null;
          }
          else b = null;
          y !== null && rd(m, x, y, b, !1), C !== null && D !== null && rd(m, D, C, b, !0);
        }
      }
      e: {
        if (x = h ? Vr(h) : window, y = x.nodeName && x.nodeName.toLowerCase(), y === "select" || y === "input" && x.type === "file") var E = a0;
        else if (Qu(x)) if (Vh) E = h0;
        else {
          E = u0;
          var j = c0;
        }
        else (y = x.nodeName) && y.toLowerCase() === "input" && (x.type === "checkbox" || x.type === "radio") && (E = d0);
        if (E && (E = E(e, h))) {
          Kh(m, E, n, v);
          break e;
        }
        j && j(e, x, h), e === "focusout" && (j = x._wrapperState) && j.controlled && x.type === "number" && Oa(x, "number", x.value);
      }
      switch (j = h ? Vr(h) : window, e) {
        case "focusin":
          (Qu(j) || j.contentEditable === "true") && (Hr = j, Ya = h, Bl = null);
          break;
        case "focusout":
          Bl = Ya = Hr = null;
          break;
        case "mousedown":
          Ga = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ga = !1, td(m, n, v);
          break;
        case "selectionchange":
          if (m0) break;
        case "keydown":
        case "keyup":
          td(m, n, v);
      }
      var N;
      if (Kc) e: {
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
      else zr ? zh(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Wh && n.locale !== "ko" && (zr || T !== "onCompositionStart" ? T === "onCompositionEnd" && zr && (N = Uh()) : (Zs = v, Wc = "value" in Zs ? Zs.value : Zs.textContent, zr = !0)), j = ii(h, T), 0 < j.length && (T = new Vu(T, e, null, n, v), m.push({ event: T, listeners: j }), N ? T.data = N : (N = Hh(n), N !== null && (T.data = N)))), (N = s0 ? r0(e, n) : l0(e, n)) && (h = ii(h, "onBeforeInput"), 0 < h.length && (v = new Vu("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: h }), v.data = N));
    }
    nf(m, t);
  });
}
function eo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ii(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Yl(e, n), o != null && r.unshift(eo(e, o, l)), o = Yl(e, t), o != null && r.push(eo(e, o, l))), e = e.return;
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
function rd(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, h = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && h !== null && (a = h, l ? (c = Yl(n, o), c != null && i.unshift(eo(n, c, a))) : l || (c = Yl(n, o), c != null && i.push(eo(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var v0 = /\r\n?/g, N0 = /\u0000|\uFFFD/g;
function ld(e) {
  return (typeof e == "string" ? e : "" + e).replace(v0, `
`).replace(N0, "");
}
function To(e, t, n) {
  if (t = ld(t), ld(e) !== t && n) throw Error(ve(425));
}
function ai() {
}
var Xa = null, Qa = null;
function Ja(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Za = typeof setTimeout == "function" ? setTimeout : void 0, k0 = typeof clearTimeout == "function" ? clearTimeout : void 0, od = typeof Promise == "function" ? Promise : void 0, w0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof od < "u" ? function(e) {
  return od.resolve(null).then(e).catch(j0);
} : Za;
function j0(e) {
  setTimeout(function() {
    throw e;
  });
}
function ua(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Ql(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Ql(t);
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
function id(e) {
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
var yl = Math.random().toString(36).slice(2), vs = "__reactFiber$" + yl, to = "__reactProps$" + yl, $s = "__reactContainer$" + yl, qa = "__reactEvents$" + yl, E0 = "__reactListeners$" + yl, C0 = "__reactHandles$" + yl;
function kr(e) {
  var t = e[vs];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[$s] || n[vs]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = id(e); e !== null; ) {
        if (n = e[vs]) return n;
        e = id(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function po(e) {
  return e = e[vs] || e[$s], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ve(33));
}
function Ti(e) {
  return e[to] || null;
}
var ec = [], Yr = -1;
function dr(e) {
  return { current: e };
}
function Ht(e) {
  0 > Yr || (e.current = ec[Yr], ec[Yr] = null, Yr--);
}
function Wt(e, t) {
  Yr++, ec[Yr] = e.current, e.current = t;
}
var cr = {}, En = dr(cr), Bn = dr(!1), Mr = cr;
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
  Ht(Bn), Ht(En);
}
function ad(e, t, n) {
  if (En.current !== cr) throw Error(ve(168));
  Wt(En, t), Wt(Bn, n);
}
function rf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ve(108, cm(e) || "Unknown", l));
  return Jt({}, n, r);
}
function ui(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || cr, Mr = En.current, Wt(En, e), Wt(Bn, Bn.current), !0;
}
function cd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ve(169));
  n ? (e = rf(e, t, Mr), r.__reactInternalMemoizedMergedChildContext = e, Ht(Bn), Ht(En), Wt(En, e)) : Ht(Bn), Wt(Bn, n);
}
var Ss = null, Ai = !1, da = !1;
function lf(e) {
  Ss === null ? Ss = [e] : Ss.push(e);
}
function S0(e) {
  Ai = !0, lf(e);
}
function hr() {
  if (!da && Ss !== null) {
    da = !0;
    var e = 0, t = Rt;
    try {
      var n = Ss;
      for (Rt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ss = null, Ai = !1;
    } catch (l) {
      throw Ss !== null && (Ss = Ss.slice(e + 1)), Th(_c, hr), l;
    } finally {
      Rt = t, da = !1;
    }
  }
  return null;
}
var Gr = [], Xr = 0, di = null, hi = 0, qn = [], es = 0, Ir = null, Ms = 1, Is = "";
function yr(e, t) {
  Gr[Xr++] = hi, Gr[Xr++] = di, di = e, hi = t;
}
function of(e, t, n) {
  qn[es++] = Ms, qn[es++] = Is, qn[es++] = Ir, Ir = e;
  var r = Ms;
  e = Is;
  var l = 32 - ds(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ds(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ms = 1 << 32 - ds(t) + l | n << l | r, Is = o + e;
  } else Ms = 1 << o | n << l | r, Is = e;
}
function Yc(e) {
  e.return !== null && (yr(e, 1), of(e, 1, 0));
}
function Gc(e) {
  for (; e === di; ) di = Gr[--Xr], Gr[Xr] = null, hi = Gr[--Xr], Gr[Xr] = null;
  for (; e === Ir; ) Ir = qn[--es], qn[es] = null, Is = qn[--es], qn[es] = null, Ms = qn[--es], qn[es] = null;
}
var Yn = null, Vn = null, Vt = !1, cs = null;
function af(e, t) {
  var n = ts(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ud(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Yn = e, Vn = sr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Yn = e, Vn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ir !== null ? { id: Ms, overflow: Is } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ts(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Yn = e, Vn = null, !0) : !1;
    default:
      return !1;
  }
}
function tc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function nc(e) {
  if (Vt) {
    var t = Vn;
    if (t) {
      var n = t;
      if (!ud(e, t)) {
        if (tc(e)) throw Error(ve(418));
        t = sr(n.nextSibling);
        var r = Yn;
        t && ud(e, t) ? af(r, n) : (e.flags = e.flags & -4097 | 2, Vt = !1, Yn = e);
      }
    } else {
      if (tc(e)) throw Error(ve(418));
      e.flags = e.flags & -4097 | 2, Vt = !1, Yn = e;
    }
  }
}
function dd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Yn = e;
}
function Ao(e) {
  if (e !== Yn) return !1;
  if (!Vt) return dd(e), Vt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ja(e.type, e.memoizedProps)), t && (t = Vn)) {
    if (tc(e)) throw cf(), Error(ve(418));
    for (; t; ) af(e, t), t = sr(t.nextSibling);
  }
  if (dd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ve(317));
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
  } else Vn = Yn ? sr(e.stateNode.nextSibling) : null;
  return !0;
}
function cf() {
  for (var e = Vn; e; ) e = sr(e.nextSibling);
}
function dl() {
  Vn = Yn = null, Vt = !1;
}
function Xc(e) {
  cs === null ? cs = [e] : cs.push(e);
}
var b0 = Ds.ReactCurrentBatchConfig;
function bl(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ve(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(ve(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(ve(284));
    if (!n._owner) throw Error(ve(290, e));
  }
  return e;
}
function Ro(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ve(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function hd(e) {
  var t = e._init;
  return t(e._payload);
}
function uf(e) {
  function t(k, f) {
    if (e) {
      var d = k.deletions;
      d === null ? (k.deletions = [f], k.flags |= 16) : d.push(f);
    }
  }
  function n(k, f) {
    if (!e) return null;
    for (; f !== null; ) t(k, f), f = f.sibling;
    return null;
  }
  function r(k, f) {
    for (k = /* @__PURE__ */ new Map(); f !== null; ) f.key !== null ? k.set(f.key, f) : k.set(f.index, f), f = f.sibling;
    return k;
  }
  function l(k, f) {
    return k = ir(k, f), k.index = 0, k.sibling = null, k;
  }
  function o(k, f, d) {
    return k.index = d, e ? (d = k.alternate, d !== null ? (d = d.index, d < f ? (k.flags |= 2, f) : d) : (k.flags |= 2, f)) : (k.flags |= 1048576, f);
  }
  function i(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function a(k, f, d, S) {
    return f === null || f.tag !== 6 ? (f = ya(d, k.mode, S), f.return = k, f) : (f = l(f, d), f.return = k, f);
  }
  function c(k, f, d, S) {
    var E = d.type;
    return E === Wr ? v(k, f, d.props.children, S, d.key) : f !== null && (f.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Ks && hd(E) === f.type) ? (S = l(f, d.props), S.ref = bl(k, f, d), S.return = k, S) : (S = Qo(d.type, d.key, d.props, null, k.mode, S), S.ref = bl(k, f, d), S.return = k, S);
  }
  function h(k, f, d, S) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== d.containerInfo || f.stateNode.implementation !== d.implementation ? (f = va(d, k.mode, S), f.return = k, f) : (f = l(f, d.children || []), f.return = k, f);
  }
  function v(k, f, d, S, E) {
    return f === null || f.tag !== 7 ? (f = br(d, k.mode, S, E), f.return = k, f) : (f = l(f, d), f.return = k, f);
  }
  function m(k, f, d) {
    if (typeof f == "string" && f !== "" || typeof f == "number") return f = ya("" + f, k.mode, d), f.return = k, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ko:
          return d = Qo(f.type, f.key, f.props, null, k.mode, d), d.ref = bl(k, null, f), d.return = k, d;
        case Ur:
          return f = va(f, k.mode, d), f.return = k, f;
        case Ks:
          var S = f._init;
          return m(k, S(f._payload), d);
      }
      if ($l(f) || wl(f)) return f = br(f, k.mode, d, null), f.return = k, f;
      Ro(k, f);
    }
    return null;
  }
  function x(k, f, d, S) {
    var E = f !== null ? f.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : a(k, f, "" + d, S);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ko:
          return d.key === E ? c(k, f, d, S) : null;
        case Ur:
          return d.key === E ? h(k, f, d, S) : null;
        case Ks:
          return E = d._init, x(
            k,
            f,
            E(d._payload),
            S
          );
      }
      if ($l(d) || wl(d)) return E !== null ? null : v(k, f, d, S, null);
      Ro(k, d);
    }
    return null;
  }
  function y(k, f, d, S, E) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return k = k.get(d) || null, a(f, k, "" + S, E);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case ko:
          return k = k.get(S.key === null ? d : S.key) || null, c(f, k, S, E);
        case Ur:
          return k = k.get(S.key === null ? d : S.key) || null, h(f, k, S, E);
        case Ks:
          var j = S._init;
          return y(k, f, d, j(S._payload), E);
      }
      if ($l(S) || wl(S)) return k = k.get(d) || null, v(f, k, S, E, null);
      Ro(f, S);
    }
    return null;
  }
  function C(k, f, d, S) {
    for (var E = null, j = null, N = f, T = f = 0, g = null; N !== null && T < d.length; T++) {
      N.index > T ? (g = N, N = null) : g = N.sibling;
      var M = x(k, N, d[T], S);
      if (M === null) {
        N === null && (N = g);
        break;
      }
      e && N && M.alternate === null && t(k, N), f = o(M, f, T), j === null ? E = M : j.sibling = M, j = M, N = g;
    }
    if (T === d.length) return n(k, N), Vt && yr(k, T), E;
    if (N === null) {
      for (; T < d.length; T++) N = m(k, d[T], S), N !== null && (f = o(N, f, T), j === null ? E = N : j.sibling = N, j = N);
      return Vt && yr(k, T), E;
    }
    for (N = r(k, N); T < d.length; T++) g = y(N, k, T, d[T], S), g !== null && (e && g.alternate !== null && N.delete(g.key === null ? T : g.key), f = o(g, f, T), j === null ? E = g : j.sibling = g, j = g);
    return e && N.forEach(function(O) {
      return t(k, O);
    }), Vt && yr(k, T), E;
  }
  function b(k, f, d, S) {
    var E = wl(d);
    if (typeof E != "function") throw Error(ve(150));
    if (d = E.call(d), d == null) throw Error(ve(151));
    for (var j = E = null, N = f, T = f = 0, g = null, M = d.next(); N !== null && !M.done; T++, M = d.next()) {
      N.index > T ? (g = N, N = null) : g = N.sibling;
      var O = x(k, N, M.value, S);
      if (O === null) {
        N === null && (N = g);
        break;
      }
      e && N && O.alternate === null && t(k, N), f = o(O, f, T), j === null ? E = O : j.sibling = O, j = O, N = g;
    }
    if (M.done) return n(
      k,
      N
    ), Vt && yr(k, T), E;
    if (N === null) {
      for (; !M.done; T++, M = d.next()) M = m(k, M.value, S), M !== null && (f = o(M, f, T), j === null ? E = M : j.sibling = M, j = M);
      return Vt && yr(k, T), E;
    }
    for (N = r(k, N); !M.done; T++, M = d.next()) M = y(N, k, T, M.value, S), M !== null && (e && M.alternate !== null && N.delete(M.key === null ? T : M.key), f = o(M, f, T), j === null ? E = M : j.sibling = M, j = M);
    return e && N.forEach(function(U) {
      return t(k, U);
    }), Vt && yr(k, T), E;
  }
  function D(k, f, d, S) {
    if (typeof d == "object" && d !== null && d.type === Wr && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ko:
          e: {
            for (var E = d.key, j = f; j !== null; ) {
              if (j.key === E) {
                if (E = d.type, E === Wr) {
                  if (j.tag === 7) {
                    n(k, j.sibling), f = l(j, d.props.children), f.return = k, k = f;
                    break e;
                  }
                } else if (j.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Ks && hd(E) === j.type) {
                  n(k, j.sibling), f = l(j, d.props), f.ref = bl(k, j, d), f.return = k, k = f;
                  break e;
                }
                n(k, j);
                break;
              } else t(k, j);
              j = j.sibling;
            }
            d.type === Wr ? (f = br(d.props.children, k.mode, S, d.key), f.return = k, k = f) : (S = Qo(d.type, d.key, d.props, null, k.mode, S), S.ref = bl(k, f, d), S.return = k, k = S);
          }
          return i(k);
        case Ur:
          e: {
            for (j = d.key; f !== null; ) {
              if (f.key === j) if (f.tag === 4 && f.stateNode.containerInfo === d.containerInfo && f.stateNode.implementation === d.implementation) {
                n(k, f.sibling), f = l(f, d.children || []), f.return = k, k = f;
                break e;
              } else {
                n(k, f);
                break;
              }
              else t(k, f);
              f = f.sibling;
            }
            f = va(d, k.mode, S), f.return = k, k = f;
          }
          return i(k);
        case Ks:
          return j = d._init, D(k, f, j(d._payload), S);
      }
      if ($l(d)) return C(k, f, d, S);
      if (wl(d)) return b(k, f, d, S);
      Ro(k, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, f !== null && f.tag === 6 ? (n(k, f.sibling), f = l(f, d), f.return = k, k = f) : (n(k, f), f = ya(d, k.mode, S), f.return = k, k = f), i(k)) : n(k, f);
  }
  return D;
}
var hl = uf(!0), df = uf(!1), fi = dr(null), pi = null, Qr = null, Qc = null;
function Jc() {
  Qc = Qr = pi = null;
}
function Zc(e) {
  var t = fi.current;
  Ht(fi), e._currentValue = t;
}
function sc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function rl(e, t) {
  pi = e, Qc = Qr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Fn = !0), e.firstContext = null);
}
function ss(e) {
  var t = e._currentValue;
  if (Qc !== e) if (e = { context: e, memoizedValue: t, next: null }, Qr === null) {
    if (pi === null) throw Error(ve(308));
    Qr = e, pi.dependencies = { lanes: 0, firstContext: e };
  } else Qr = Qr.next = e;
  return t;
}
var wr = null;
function qc(e) {
  wr === null ? wr = [e] : wr.push(e);
}
function hf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, qc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ls(e, r);
}
function Ls(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Vs = !1;
function eu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ff(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ts(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function rr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, jt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ls(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, qc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ls(e, n);
}
function Ho(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Fc(e, n);
  }
}
function fd(e, t) {
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
  Vs = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, h = c.next;
    c.next = null, i === null ? o = h : i.next = h, i = c;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== i && (a === null ? v.firstBaseUpdate = h : a.next = h, v.lastBaseUpdate = c));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = h = c = null, a = o;
    do {
      var x = a.lane, y = a.eventTime;
      if ((r & x) === x) {
        v !== null && (v = v.next = {
          eventTime: y,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var C = e, b = a;
          switch (x = t, y = n, b.tag) {
            case 1:
              if (C = b.payload, typeof C == "function") {
                m = C.call(y, m, x);
                break e;
              }
              m = C;
              break e;
            case 3:
              C.flags = C.flags & -65537 | 128;
            case 0:
              if (C = b.payload, x = typeof C == "function" ? C.call(y, m, x) : C, x == null) break e;
              m = Jt({}, m, x);
              break e;
            case 2:
              Vs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, x = l.effects, x === null ? l.effects = [a] : x.push(a));
      } else y = { eventTime: y, lane: x, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (h = v = y, c = m) : v = v.next = y, i |= x;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        x = a, a = x.next, x.next = null, l.lastBaseUpdate = x, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = m), l.baseState = c, l.firstBaseUpdate = h, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ar |= i, e.lanes = i, e.memoizedState = m;
  }
}
function pd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(ve(191, l));
      l.call(r);
    }
  }
}
var mo = {}, ws = dr(mo), no = dr(mo), so = dr(mo);
function jr(e) {
  if (e === mo) throw Error(ve(174));
  return e;
}
function tu(e, t) {
  switch (Wt(so, t), Wt(no, e), Wt(ws, mo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Pa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Pa(t, e);
  }
  Ht(ws), Wt(ws, t);
}
function fl() {
  Ht(ws), Ht(no), Ht(so);
}
function pf(e) {
  jr(so.current);
  var t = jr(ws.current), n = Pa(t, e.type);
  t !== n && (Wt(no, e), Wt(ws, n));
}
function nu(e) {
  no.current === e && (Ht(ws), Ht(no));
}
var Xt = dr(0);
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
var ha = [];
function su() {
  for (var e = 0; e < ha.length; e++) ha[e]._workInProgressVersionPrimary = null;
  ha.length = 0;
}
var Ko = Ds.ReactCurrentDispatcher, fa = Ds.ReactCurrentBatchConfig, Tr = 0, Qt = null, cn = null, fn = null, xi = !1, Ul = !1, ro = 0, M0 = 0;
function kn() {
  throw Error(ve(321));
}
function ru(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!fs(e[n], t[n])) return !1;
  return !0;
}
function lu(e, t, n, r, l, o) {
  if (Tr = o, Qt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ko.current = e === null || e.memoizedState === null ? R0 : $0, e = n(r, l), Ul) {
    o = 0;
    do {
      if (Ul = !1, ro = 0, 25 <= o) throw Error(ve(301));
      o += 1, fn = cn = null, t.updateQueue = null, Ko.current = L0, e = n(r, l);
    } while (Ul);
  }
  if (Ko.current = yi, t = cn !== null && cn.next !== null, Tr = 0, fn = cn = Qt = null, xi = !1, t) throw Error(ve(300));
  return e;
}
function ou() {
  var e = ro !== 0;
  return ro = 0, e;
}
function ys() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return fn === null ? Qt.memoizedState = fn = e : fn = fn.next = e, fn;
}
function rs() {
  if (cn === null) {
    var e = Qt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = cn.next;
  var t = fn === null ? Qt.memoizedState : fn.next;
  if (t !== null) fn = t, cn = e;
  else {
    if (e === null) throw Error(ve(310));
    cn = e, e = { memoizedState: cn.memoizedState, baseState: cn.baseState, baseQueue: cn.baseQueue, queue: cn.queue, next: null }, fn === null ? Qt.memoizedState = fn = e : fn = fn.next = e;
  }
  return fn;
}
function lo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function pa(e) {
  var t = rs(), n = t.queue;
  if (n === null) throw Error(ve(311));
  n.lastRenderedReducer = e;
  var r = cn, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var a = i = null, c = null, h = o;
    do {
      var v = h.lane;
      if ((Tr & v) === v) c !== null && (c = c.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), r = h.hasEagerState ? h.eagerState : e(r, h.action);
      else {
        var m = {
          lane: v,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        };
        c === null ? (a = c = m, i = r) : c = c.next = m, Qt.lanes |= v, Ar |= v;
      }
      h = h.next;
    } while (h !== null && h !== o);
    c === null ? i = r : c.next = a, fs(r, t.memoizedState) || (Fn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Qt.lanes |= o, Ar |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ma(e) {
  var t = rs(), n = t.queue;
  if (n === null) throw Error(ve(311));
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
function mf() {
}
function gf(e, t) {
  var n = Qt, r = rs(), l = t(), o = !fs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Fn = !0), r = r.queue, iu(vf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || fn !== null && fn.memoizedState.tag & 1) {
    if (n.flags |= 2048, oo(9, yf.bind(null, n, r, l, t), void 0, null), pn === null) throw Error(ve(349));
    Tr & 30 || xf(n, t, l);
  }
  return l;
}
function xf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Qt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Qt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function yf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Nf(t) && kf(e);
}
function vf(e, t, n) {
  return n(function() {
    Nf(t) && kf(e);
  });
}
function Nf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !fs(e, n);
  } catch {
    return !0;
  }
}
function kf(e) {
  var t = Ls(e, 1);
  t !== null && hs(t, e, 1, -1);
}
function md(e) {
  var t = ys();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lo, lastRenderedState: e }, t.queue = e, e = e.dispatch = A0.bind(null, Qt, e), [t.memoizedState, e];
}
function oo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Qt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Qt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function wf() {
  return rs().memoizedState;
}
function Vo(e, t, n, r) {
  var l = ys();
  Qt.flags |= e, l.memoizedState = oo(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ri(e, t, n, r) {
  var l = rs();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (cn !== null) {
    var i = cn.memoizedState;
    if (o = i.destroy, r !== null && ru(r, i.deps)) {
      l.memoizedState = oo(t, n, o, r);
      return;
    }
  }
  Qt.flags |= e, l.memoizedState = oo(1 | t, n, o, r);
}
function gd(e, t) {
  return Vo(8390656, 8, e, t);
}
function iu(e, t) {
  return Ri(2048, 8, e, t);
}
function jf(e, t) {
  return Ri(4, 2, e, t);
}
function Ef(e, t) {
  return Ri(4, 4, e, t);
}
function Cf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Sf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ri(4, 4, Cf.bind(null, t, e), n);
}
function au() {
}
function bf(e, t) {
  var n = rs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ru(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Mf(e, t) {
  var n = rs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ru(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function If(e, t, n) {
  return Tr & 21 ? (fs(n, t) || (n = $h(), Qt.lanes |= n, Ar |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Fn = !0), e.memoizedState = n);
}
function I0(e, t) {
  var n = Rt;
  Rt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = fa.transition;
  fa.transition = {};
  try {
    e(!1), t();
  } finally {
    Rt = n, fa.transition = r;
  }
}
function Tf() {
  return rs().memoizedState;
}
function T0(e, t, n) {
  var r = or(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Af(e)) Rf(t, n);
  else if (n = hf(e, t, n, r), n !== null) {
    var l = An();
    hs(n, e, r, l), $f(n, t, r);
  }
}
function A0(e, t, n) {
  var r = or(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Af(e)) Rf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, fs(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, qc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = hf(e, t, l, r), n !== null && (l = An(), hs(n, e, r, l), $f(n, t, r));
  }
}
function Af(e) {
  var t = e.alternate;
  return e === Qt || t !== null && t === Qt;
}
function Rf(e, t) {
  Ul = xi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function $f(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Fc(e, n);
  }
}
var yi = { readContext: ss, useCallback: kn, useContext: kn, useEffect: kn, useImperativeHandle: kn, useInsertionEffect: kn, useLayoutEffect: kn, useMemo: kn, useReducer: kn, useRef: kn, useState: kn, useDebugValue: kn, useDeferredValue: kn, useTransition: kn, useMutableSource: kn, useSyncExternalStore: kn, useId: kn, unstable_isNewReconciler: !1 }, R0 = { readContext: ss, useCallback: function(e, t) {
  return ys().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ss, useEffect: gd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Vo(
    4194308,
    4,
    Cf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Vo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Vo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ys();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ys();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = T0.bind(null, Qt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ys();
  return e = { current: e }, t.memoizedState = e;
}, useState: md, useDebugValue: au, useDeferredValue: function(e) {
  return ys().memoizedState = e;
}, useTransition: function() {
  var e = md(!1), t = e[0];
  return e = I0.bind(null, e[1]), ys().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Qt, l = ys();
  if (Vt) {
    if (n === void 0) throw Error(ve(407));
    n = n();
  } else {
    if (n = t(), pn === null) throw Error(ve(349));
    Tr & 30 || xf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, gd(vf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, oo(9, yf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ys(), t = pn.identifierPrefix;
  if (Vt) {
    var n = Is, r = Ms;
    n = (r & ~(1 << 32 - ds(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ro++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = M0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, $0 = {
  readContext: ss,
  useCallback: bf,
  useContext: ss,
  useEffect: iu,
  useImperativeHandle: Sf,
  useInsertionEffect: jf,
  useLayoutEffect: Ef,
  useMemo: Mf,
  useReducer: pa,
  useRef: wf,
  useState: function() {
    return pa(lo);
  },
  useDebugValue: au,
  useDeferredValue: function(e) {
    var t = rs();
    return If(t, cn.memoizedState, e);
  },
  useTransition: function() {
    var e = pa(lo)[0], t = rs().memoizedState;
    return [e, t];
  },
  useMutableSource: mf,
  useSyncExternalStore: gf,
  useId: Tf,
  unstable_isNewReconciler: !1
}, L0 = { readContext: ss, useCallback: bf, useContext: ss, useEffect: iu, useImperativeHandle: Sf, useInsertionEffect: jf, useLayoutEffect: Ef, useMemo: Mf, useReducer: ma, useRef: wf, useState: function() {
  return ma(lo);
}, useDebugValue: au, useDeferredValue: function(e) {
  var t = rs();
  return cn === null ? t.memoizedState = e : If(t, cn.memoizedState, e);
}, useTransition: function() {
  var e = ma(lo)[0], t = rs().memoizedState;
  return [e, t];
}, useMutableSource: mf, useSyncExternalStore: gf, useId: Tf, unstable_isNewReconciler: !1 };
function is(e, t) {
  if (e && e.defaultProps) {
    t = Jt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function rc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Jt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $i = { isMounted: function(e) {
  return (e = e._reactInternals) ? Lr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = or(e), o = Ts(r, l);
  o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (hs(t, e, l, r), Ho(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = An(), l = or(e), o = Ts(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = rr(e, o, l), t !== null && (hs(t, e, l, r), Ho(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = An(), r = or(e), l = Ts(n, r);
  l.tag = 2, t != null && (l.callback = t), t = rr(e, l, r), t !== null && (hs(t, e, r, n), Ho(t, e, r));
} };
function xd(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Zl(n, r) || !Zl(l, o) : !0;
}
function Lf(e, t, n) {
  var r = !1, l = cr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ss(o) : (l = Un(t) ? Mr : En.current, r = t.contextTypes, o = (r = r != null) ? ul(e, l) : cr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = $i, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function yd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && $i.enqueueReplaceState(t, t.state, null);
}
function lc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, eu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ss(o) : (o = Un(t) ? Mr : En.current, l.context = ul(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (rc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && $i.enqueueReplaceState(l, l.state, null), mi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function pl(e, t) {
  try {
    var n = "", r = t;
    do
      n += am(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ga(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function oc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var O0 = typeof WeakMap == "function" ? WeakMap : Map;
function Of(e, t, n) {
  n = Ts(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ni || (Ni = !0, gc = r), oc(e, t);
  }, n;
}
function Df(e, t, n) {
  n = Ts(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      oc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    oc(e, t), typeof r != "function" && (lr === null ? lr = /* @__PURE__ */ new Set([this]) : lr.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function vd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new O0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = X0.bind(null, e, t, n), t.then(e, e));
}
function Nd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ts(-1, 1), t.tag = 2, rr(n, t, 1))), n.lanes |= 1), e);
}
var D0 = Ds.ReactCurrentOwner, Fn = !1;
function Tn(e, t, n, r) {
  t.child = e === null ? df(t, null, n, r) : hl(t, e.child, n, r);
}
function wd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return rl(t, l), r = lu(e, t, n, r, o, l), n = ou(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Vt && n && Yc(t), t.flags |= 1, Tn(e, t, r, l), t.child);
}
function jd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !gu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Pf(e, t, o, r, l)) : (e = Qo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Zl, n(i, r) && e.ref === t.ref) return Os(e, t, l);
  }
  return t.flags |= 1, e = ir(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Pf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Zl(o, r) && e.ref === t.ref) if (Fn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Fn = !0);
    else return t.lanes = e.lanes, Os(e, t, l);
  }
  return ic(e, t, n, r, l);
}
function _f(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Wt(Zr, Hn), Hn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Wt(Zr, Hn), Hn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Wt(Zr, Hn), Hn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Wt(Zr, Hn), Hn |= r;
  return Tn(e, t, l, n), t.child;
}
function Ff(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function ic(e, t, n, r, l) {
  var o = Un(n) ? Mr : En.current;
  return o = ul(t, o), rl(t, l), n = lu(e, t, n, r, o, l), r = ou(), e !== null && !Fn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Os(e, t, l)) : (Vt && r && Yc(t), t.flags |= 1, Tn(e, t, n, l), t.child);
}
function Ed(e, t, n, r, l) {
  if (Un(n)) {
    var o = !0;
    ui(t);
  } else o = !1;
  if (rl(t, l), t.stateNode === null) Yo(e, t), Lf(t, n, r), lc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, h = n.contextType;
    typeof h == "object" && h !== null ? h = ss(h) : (h = Un(n) ? Mr : En.current, h = ul(t, h));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== h) && yd(t, i, r, h), Vs = !1;
    var x = t.memoizedState;
    i.state = x, mi(t, r, i, l), c = t.memoizedState, a !== r || x !== c || Bn.current || Vs ? (typeof v == "function" && (rc(t, n, v, r), c = t.memoizedState), (a = Vs || xd(t, n, a, r, x, c, h)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = h, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, ff(e, t), a = t.memoizedProps, h = t.type === t.elementType ? a : is(t.type, a), i.props = h, m = t.pendingProps, x = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = ss(c) : (c = Un(n) ? Mr : En.current, c = ul(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || x !== c) && yd(t, i, r, c), Vs = !1, x = t.memoizedState, i.state = x, mi(t, r, i, l);
    var C = t.memoizedState;
    a !== m || x !== C || Bn.current || Vs ? (typeof y == "function" && (rc(t, n, y, r), C = t.memoizedState), (h = Vs || xd(t, n, h, r, x, C, c) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, C, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, C, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), i.props = r, i.state = C, i.context = c, r = h) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return ac(e, t, n, r, o, l);
}
function ac(e, t, n, r, l, o) {
  Ff(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && cd(t, n, !1), Os(e, t, o);
  r = t.stateNode, D0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = hl(t, e.child, null, o), t.child = hl(t, null, a, o)) : Tn(e, t, a, o), t.memoizedState = r.state, l && cd(t, n, !0), t.child;
}
function Bf(e) {
  var t = e.stateNode;
  t.pendingContext ? ad(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ad(e, t.context, !1), tu(e, t.containerInfo);
}
function Cd(e, t, n, r, l) {
  return dl(), Xc(l), t.flags |= 256, Tn(e, t, n, r), t.child;
}
var cc = { dehydrated: null, treeContext: null, retryLane: 0 };
function uc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Uf(e, t, n) {
  var r = t.pendingProps, l = Xt.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Wt(Xt, l & 1), e === null)
    return nc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Di(i, r, 0, null), e = br(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = uc(n), t.memoizedState = cc, e) : cu(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return P0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = ir(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = ir(a, o) : (o = br(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? uc(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = cc, r;
  }
  return o = e.child, e = o.sibling, r = ir(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function cu(e, t) {
  return t = Di({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $o(e, t, n, r) {
  return r !== null && Xc(r), hl(t, e.child, null, n), e = cu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function P0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ga(Error(ve(422))), $o(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Di({ mode: "visible", children: r.children }, l, 0, null), o = br(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hl(t, e.child, null, i), t.child.memoizedState = uc(i), t.memoizedState = cc, o);
  if (!(t.mode & 1)) return $o(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(ve(419)), r = ga(o, r, void 0), $o(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Fn || a) {
    if (r = pn, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ls(e, l), hs(r, e, l, -1));
    }
    return mu(), r = ga(Error(ve(421))), $o(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Q0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Vn = sr(l.nextSibling), Yn = t, Vt = !0, cs = null, e !== null && (qn[es++] = Ms, qn[es++] = Is, qn[es++] = Ir, Ms = e.id, Is = e.overflow, Ir = t), t = cu(t, r.children), t.flags |= 4096, t);
}
function Sd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), sc(e.return, t, n);
}
function xa(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Wf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Tn(e, t, r.children, n), r = Xt.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Sd(e, n, t);
      else if (e.tag === 19) Sd(e, n, t);
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
  if (Wt(Xt, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && gi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), xa(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && gi(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      xa(t, !0, n, null, o);
      break;
    case "together":
      xa(t, !1, null, null, void 0);
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
  if (e !== null && (t.dependencies = e.dependencies), Ar |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ve(153));
  if (t.child !== null) {
    for (e = t.child, n = ir(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ir(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function _0(e, t, n) {
  switch (t.tag) {
    case 3:
      Bf(t), dl();
      break;
    case 5:
      pf(t);
      break;
    case 1:
      Un(t.type) && ui(t);
      break;
    case 4:
      tu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Wt(fi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Wt(Xt, Xt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Uf(e, t, n) : (Wt(Xt, Xt.current & 1), e = Os(e, t, n), e !== null ? e.sibling : null);
      Wt(Xt, Xt.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Wf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Wt(Xt, Xt.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, _f(e, t, n);
  }
  return Os(e, t, n);
}
var zf, dc, Hf, Kf;
zf = function(e, t) {
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
dc = function() {
};
Hf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, jr(ws.current);
    var o = null;
    switch (n) {
      case "input":
        l = $a(e, l), r = $a(e, r), o = [];
        break;
      case "select":
        l = Jt({}, l, { value: void 0 }), r = Jt({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Da(e, l), r = Da(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ai);
    }
    _a(n, r);
    var i;
    n = null;
    for (h in l) if (!r.hasOwnProperty(h) && l.hasOwnProperty(h) && l[h] != null) if (h === "style") {
      var a = l[h];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else h !== "dangerouslySetInnerHTML" && h !== "children" && h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (Kl.hasOwnProperty(h) ? o || (o = []) : (o = o || []).push(h, null));
    for (h in r) {
      var c = r[h];
      if (a = l != null ? l[h] : void 0, r.hasOwnProperty(h) && c !== a && (c != null || a != null)) if (h === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        h,
        n
      )), n = c;
      else h === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(h, c)) : h === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(h, "" + c) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (Kl.hasOwnProperty(h) ? (c != null && h === "onScroll" && zt("scroll", e), o || a === c || (o = [])) : (o = o || []).push(h, c));
    }
    n && (o = o || []).push("style", n);
    var h = o;
    (t.updateQueue = h) && (t.flags |= 4);
  }
};
Kf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ml(e, t) {
  if (!Vt) switch (e.tailMode) {
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
function F0(e, t, n) {
  var r = t.pendingProps;
  switch (Gc(t), t.tag) {
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
      return Un(t.type) && ci(), wn(t), null;
    case 3:
      return r = t.stateNode, fl(), Ht(Bn), Ht(En), su(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ao(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, cs !== null && (vc(cs), cs = null))), dc(e, t), wn(t), null;
    case 5:
      nu(t);
      var l = jr(so.current);
      if (n = t.type, e !== null && t.stateNode != null) Hf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ve(166));
          return wn(t), null;
        }
        if (e = jr(ws.current), Ao(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[vs] = t, r[to] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              zt("cancel", r), zt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              zt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ol.length; l++) zt(Ol[l], r);
              break;
            case "source":
              zt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              zt(
                "error",
                r
              ), zt("load", r);
              break;
            case "details":
              zt("toggle", r);
              break;
            case "input":
              Ou(r, o), zt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, zt("invalid", r);
              break;
            case "textarea":
              Pu(r, o), zt("invalid", r);
          }
          _a(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && To(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && To(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Kl.hasOwnProperty(i) && a != null && i === "onScroll" && zt("scroll", r);
          }
          switch (n) {
            case "input":
              wo(r), Du(r, o, !0);
              break;
            case "textarea":
              wo(r), _u(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ai);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = yh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[vs] = t, e[to] = r, zf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Fa(n, r), n) {
              case "dialog":
                zt("cancel", e), zt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                zt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ol.length; l++) zt(Ol[l], e);
                l = r;
                break;
              case "source":
                zt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                zt(
                  "error",
                  e
                ), zt("load", e), l = r;
                break;
              case "details":
                zt("toggle", e), l = r;
                break;
              case "input":
                Ou(e, r), l = $a(e, r), zt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Jt({}, r, { value: void 0 }), zt("invalid", e);
                break;
              case "textarea":
                Pu(e, r), l = Da(e, r), zt("invalid", e);
                break;
              default:
                l = r;
            }
            _a(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? kh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && vh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Vl(e, c) : typeof c == "number" && Vl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Kl.hasOwnProperty(o) ? c != null && o === "onScroll" && zt("scroll", e) : c != null && $c(e, o, c, i));
            }
            switch (n) {
              case "input":
                wo(e), Du(e, r, !1);
                break;
              case "textarea":
                wo(e), _u(e);
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
      return wn(t), null;
    case 6:
      if (e && t.stateNode != null) Kf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(ve(166));
        if (n = jr(so.current), jr(ws.current), Ao(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[vs] = t, (o = r.nodeValue !== n) && (e = Yn, e !== null)) switch (e.tag) {
            case 3:
              To(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && To(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vs] = t, t.stateNode = r;
      }
      return wn(t), null;
    case 13:
      if (Ht(Xt), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Vt && Vn !== null && t.mode & 1 && !(t.flags & 128)) cf(), dl(), t.flags |= 98560, o = !1;
        else if (o = Ao(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ve(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ve(317));
            o[vs] = t;
          } else dl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          wn(t), o = !1;
        } else cs !== null && (vc(cs), cs = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Xt.current & 1 ? un === 0 && (un = 3) : mu())), t.updateQueue !== null && (t.flags |= 4), wn(t), null);
    case 4:
      return fl(), dc(e, t), e === null && ql(t.stateNode.containerInfo), wn(t), null;
    case 10:
      return Zc(t.type._context), wn(t), null;
    case 17:
      return Un(t.type) && ci(), wn(t), null;
    case 19:
      if (Ht(Xt), o = t.memoizedState, o === null) return wn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Ml(o, !1);
      else {
        if (un !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = gi(e), i !== null) {
            for (t.flags |= 128, Ml(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Wt(Xt, Xt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && sn() > ml && (t.flags |= 128, r = !0, Ml(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = gi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ml(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Vt) return wn(t), null;
        } else 2 * sn() - o.renderingStartTime > ml && n !== 1073741824 && (t.flags |= 128, r = !0, Ml(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = sn(), t.sibling = null, n = Xt.current, Wt(Xt, r ? n & 1 | 2 : n & 1), t) : (wn(t), null);
    case 22:
    case 23:
      return pu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Hn & 1073741824 && (wn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : wn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ve(156, t.tag));
}
function B0(e, t) {
  switch (Gc(t), t.tag) {
    case 1:
      return Un(t.type) && ci(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return fl(), Ht(Bn), Ht(En), su(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return nu(t), null;
    case 13:
      if (Ht(Xt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ve(340));
        dl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ht(Xt), null;
    case 4:
      return fl(), null;
    case 10:
      return Zc(t.type._context), null;
    case 22:
    case 23:
      return pu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Lo = !1, jn = !1, U0 = typeof WeakSet == "function" ? WeakSet : Set, Ue = null;
function Jr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    qt(e, t, r);
  }
  else n.current = null;
}
function hc(e, t, n) {
  try {
    n();
  } catch (r) {
    qt(e, t, r);
  }
}
var bd = !1;
function W0(e, t) {
  if (Xa = li, e = Xh(), Vc(e)) {
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
        var i = 0, a = -1, c = -1, h = 0, v = 0, m = e, x = null;
        t: for (; ; ) {
          for (var y; m !== n || l !== 0 && m.nodeType !== 3 || (a = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (c = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (y = m.firstChild) !== null; )
            x = m, m = y;
          for (; ; ) {
            if (m === e) break t;
            if (x === n && ++h === l && (a = i), x === o && ++v === r && (c = i), (y = m.nextSibling) !== null) break;
            m = x, x = m.parentNode;
          }
          m = y;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Qa = { focusedElem: e, selectionRange: n }, li = !1, Ue = t; Ue !== null; ) if (t = Ue, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ue = e;
  else for (; Ue !== null; ) {
    t = Ue;
    try {
      var C = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (C !== null) {
            var b = C.memoizedProps, D = C.memoizedState, k = t.stateNode, f = k.getSnapshotBeforeUpdate(t.elementType === t.type ? b : is(t.type, b), D);
            k.__reactInternalSnapshotBeforeUpdate = f;
          }
          break;
        case 3:
          var d = t.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ve(163));
      }
    } catch (S) {
      qt(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Ue = e;
      break;
    }
    Ue = t.return;
  }
  return C = bd, bd = !1, C;
}
function Wl(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && hc(t, n, o);
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
function fc(e) {
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
function Vf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Vf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vs], delete t[to], delete t[qa], delete t[E0], delete t[C0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Yf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Md(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Yf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function pc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ai));
  else if (r !== 4 && (e = e.child, e !== null)) for (pc(e, t, n), e = e.sibling; e !== null; ) pc(e, t, n), e = e.sibling;
}
function mc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (mc(e, t, n), e = e.sibling; e !== null; ) mc(e, t, n), e = e.sibling;
}
var gn = null, as = !1;
function Ws(e, t, n) {
  for (n = n.child; n !== null; ) Gf(e, t, n), n = n.sibling;
}
function Gf(e, t, n) {
  if (ks && typeof ks.onCommitFiberUnmount == "function") try {
    ks.onCommitFiberUnmount(Si, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      jn || Jr(n, t);
    case 6:
      var r = gn, l = as;
      gn = null, Ws(e, t, n), gn = r, as = l, gn !== null && (as ? (e = gn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : gn.removeChild(n.stateNode));
      break;
    case 18:
      gn !== null && (as ? (e = gn, n = n.stateNode, e.nodeType === 8 ? ua(e.parentNode, n) : e.nodeType === 1 && ua(e, n), Ql(e)) : ua(gn, n.stateNode));
      break;
    case 4:
      r = gn, l = as, gn = n.stateNode.containerInfo, as = !0, Ws(e, t, n), gn = r, as = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!jn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && hc(n, t, i), l = l.next;
        } while (l !== r);
      }
      Ws(e, t, n);
      break;
    case 1:
      if (!jn && (Jr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        qt(n, t, a);
      }
      Ws(e, t, n);
      break;
    case 21:
      Ws(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (jn = (r = jn) || n.memoizedState !== null, Ws(e, t, n), jn = r) : Ws(e, t, n);
      break;
    default:
      Ws(e, t, n);
  }
}
function Id(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new U0()), t.forEach(function(r) {
      var l = J0.bind(null, e, r);
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
            gn = a.stateNode, as = !1;
            break e;
          case 3:
            gn = a.stateNode.containerInfo, as = !0;
            break e;
          case 4:
            gn = a.stateNode.containerInfo, as = !0;
            break e;
        }
        a = a.return;
      }
      if (gn === null) throw Error(ve(160));
      Gf(o, i, l), gn = null, as = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (h) {
      qt(l, t, h);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Xf(t, e), t = t.sibling;
}
function Xf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (os(t, e), xs(e), r & 4) {
        try {
          Wl(3, e, e.return), Li(3, e);
        } catch (b) {
          qt(e, e.return, b);
        }
        try {
          Wl(5, e, e.return);
        } catch (b) {
          qt(e, e.return, b);
        }
      }
      break;
    case 1:
      os(t, e), xs(e), r & 512 && n !== null && Jr(n, n.return);
      break;
    case 5:
      if (os(t, e), xs(e), r & 512 && n !== null && Jr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Vl(l, "");
        } catch (b) {
          qt(e, e.return, b);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && gh(l, o), Fa(a, i);
          var h = Fa(a, o);
          for (i = 0; i < c.length; i += 2) {
            var v = c[i], m = c[i + 1];
            v === "style" ? kh(l, m) : v === "dangerouslySetInnerHTML" ? vh(l, m) : v === "children" ? Vl(l, m) : $c(l, v, m, h);
          }
          switch (a) {
            case "input":
              La(l, o);
              break;
            case "textarea":
              xh(l, o);
              break;
            case "select":
              var x = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? el(l, !!o.multiple, y, !1) : x !== !!o.multiple && (o.defaultValue != null ? el(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : el(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[to] = o;
        } catch (b) {
          qt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (os(t, e), xs(e), r & 4) {
        if (e.stateNode === null) throw Error(ve(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (b) {
          qt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (os(t, e), xs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ql(t.containerInfo);
      } catch (b) {
        qt(e, e.return, b);
      }
      break;
    case 4:
      os(t, e), xs(e);
      break;
    case 13:
      os(t, e), xs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (hu = sn())), r & 4 && Id(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (jn = (h = jn) || v, os(t, e), jn = h) : os(t, e), xs(e), r & 8192) {
        if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !v && e.mode & 1) for (Ue = e, v = e.child; v !== null; ) {
          for (m = Ue = v; Ue !== null; ) {
            switch (x = Ue, y = x.child, x.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Wl(4, x, x.return);
                break;
              case 1:
                Jr(x, x.return);
                var C = x.stateNode;
                if (typeof C.componentWillUnmount == "function") {
                  r = x, n = x.return;
                  try {
                    t = r, C.props = t.memoizedProps, C.state = t.memoizedState, C.componentWillUnmount();
                  } catch (b) {
                    qt(r, n, b);
                  }
                }
                break;
              case 5:
                Jr(x, x.return);
                break;
              case 22:
                if (x.memoizedState !== null) {
                  Ad(m);
                  continue;
                }
            }
            y !== null ? (y.return = x, Ue = y) : Ad(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, h ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, c = m.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = Nh("display", i));
              } catch (b) {
                qt(e, e.return, b);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = h ? "" : m.memoizedProps;
            } catch (b) {
              qt(e, e.return, b);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            v === m && (v = null), m = m.return;
          }
          v === m && (v = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      os(t, e), xs(e), r & 4 && Id(e);
      break;
    case 21:
      break;
    default:
      os(
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
          if (Yf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(ve(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Vl(l, ""), r.flags &= -33);
          var o = Md(e);
          mc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Md(e);
          pc(e, a, i);
          break;
        default:
          throw Error(ve(161));
      }
    } catch (c) {
      qt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function z0(e, t, n) {
  Ue = e, Qf(e);
}
function Qf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Ue !== null; ) {
    var l = Ue, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Lo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || jn;
        a = Lo;
        var h = jn;
        if (Lo = i, (jn = c) && !h) for (Ue = l; Ue !== null; ) i = Ue, c = i.child, i.tag === 22 && i.memoizedState !== null ? Rd(l) : c !== null ? (c.return = i, Ue = c) : Rd(l);
        for (; o !== null; ) Ue = o, Qf(o), o = o.sibling;
        Ue = l, Lo = a, jn = h;
      }
      Td(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Ue = o) : Td(e);
  }
}
function Td(e) {
  for (; Ue !== null; ) {
    var t = Ue;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            jn || Li(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !jn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : is(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && pd(t, o, r);
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
              pd(t, i, n);
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
              var h = t.alternate;
              if (h !== null) {
                var v = h.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && Ql(m);
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
            throw Error(ve(163));
        }
        jn || t.flags & 512 && fc(t);
      } catch (x) {
        qt(t, t.return, x);
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
function Ad(e) {
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
function Rd(e) {
  for (; Ue !== null; ) {
    var t = Ue;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Li(4, t);
          } catch (c) {
            qt(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              qt(t, l, c);
            }
          }
          var o = t.return;
          try {
            fc(t);
          } catch (c) {
            qt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            fc(t);
          } catch (c) {
            qt(t, i, c);
          }
      }
    } catch (c) {
      qt(t, t.return, c);
    }
    if (t === e) {
      Ue = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, Ue = a;
      break;
    }
    Ue = t.return;
  }
}
var H0 = Math.ceil, vi = Ds.ReactCurrentDispatcher, uu = Ds.ReactCurrentOwner, ns = Ds.ReactCurrentBatchConfig, jt = 0, pn = null, ln = null, xn = 0, Hn = 0, Zr = dr(0), un = 0, io = null, Ar = 0, Oi = 0, du = 0, zl = null, _n = null, hu = 0, ml = 1 / 0, Cs = null, Ni = !1, gc = null, lr = null, Oo = !1, qs = null, ki = 0, Hl = 0, xc = null, Go = -1, Xo = 0;
function An() {
  return jt & 6 ? sn() : Go !== -1 ? Go : Go = sn();
}
function or(e) {
  return e.mode & 1 ? jt & 2 && xn !== 0 ? xn & -xn : b0.transition !== null ? (Xo === 0 && (Xo = $h()), Xo) : (e = Rt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Bh(e.type)), e) : 1;
}
function hs(e, t, n, r) {
  if (50 < Hl) throw Hl = 0, xc = null, Error(ve(185));
  ho(e, n, r), (!(jt & 2) || e !== pn) && (e === pn && (!(jt & 2) && (Oi |= n), un === 4 && Qs(e, xn)), Wn(e, r), n === 1 && jt === 0 && !(t.mode & 1) && (ml = sn() + 500, Ai && hr()));
}
function Wn(e, t) {
  var n = e.callbackNode;
  bm(e, t);
  var r = ri(e, e === pn ? xn : 0);
  if (r === 0) n !== null && Uu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Uu(n), t === 1) e.tag === 0 ? S0($d.bind(null, e)) : lf($d.bind(null, e)), w0(function() {
      !(jt & 6) && hr();
    }), n = null;
    else {
      switch (Lh(r)) {
        case 1:
          n = _c;
          break;
        case 4:
          n = Ah;
          break;
        case 16:
          n = si;
          break;
        case 536870912:
          n = Rh;
          break;
        default:
          n = si;
      }
      n = rp(n, Jf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Jf(e, t) {
  if (Go = -1, Xo = 0, jt & 6) throw Error(ve(327));
  var n = e.callbackNode;
  if (ll() && e.callbackNode !== n) return null;
  var r = ri(e, e === pn ? xn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wi(e, r);
  else {
    t = r;
    var l = jt;
    jt |= 2;
    var o = qf();
    (pn !== e || xn !== t) && (Cs = null, ml = sn() + 500, Sr(e, t));
    do
      try {
        Y0();
        break;
      } catch (a) {
        Zf(e, a);
      }
    while (!0);
    Jc(), vi.current = o, jt = l, ln !== null ? t = 0 : (pn = null, xn = 0, t = un);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ha(e), l !== 0 && (r = l, t = yc(e, l))), t === 1) throw n = io, Sr(e, 0), Qs(e, r), Wn(e, sn()), n;
    if (t === 6) Qs(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !K0(l) && (t = wi(e, r), t === 2 && (o = Ha(e), o !== 0 && (r = o, t = yc(e, o))), t === 1)) throw n = io, Sr(e, 0), Qs(e, r), Wn(e, sn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ve(345));
        case 2:
          vr(e, _n, Cs);
          break;
        case 3:
          if (Qs(e, r), (r & 130023424) === r && (t = hu + 500 - sn(), 10 < t)) {
            if (ri(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              An(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Za(vr.bind(null, e, _n, Cs), t);
            break;
          }
          vr(e, _n, Cs);
          break;
        case 4:
          if (Qs(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ds(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = sn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * H0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Za(vr.bind(null, e, _n, Cs), r);
            break;
          }
          vr(e, _n, Cs);
          break;
        case 5:
          vr(e, _n, Cs);
          break;
        default:
          throw Error(ve(329));
      }
    }
  }
  return Wn(e, sn()), e.callbackNode === n ? Jf.bind(null, e) : null;
}
function yc(e, t) {
  var n = zl;
  return e.current.memoizedState.isDehydrated && (Sr(e, t).flags |= 256), e = wi(e, t), e !== 2 && (t = _n, _n = n, t !== null && vc(t)), e;
}
function vc(e) {
  _n === null ? _n = e : _n.push.apply(_n, e);
}
function K0(e) {
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
function Qs(e, t) {
  for (t &= ~du, t &= ~Oi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ds(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function $d(e) {
  if (jt & 6) throw Error(ve(327));
  ll();
  var t = ri(e, 0);
  if (!(t & 1)) return Wn(e, sn()), null;
  var n = wi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ha(e);
    r !== 0 && (t = r, n = yc(e, r));
  }
  if (n === 1) throw n = io, Sr(e, 0), Qs(e, t), Wn(e, sn()), n;
  if (n === 6) throw Error(ve(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, vr(e, _n, Cs), Wn(e, sn()), null;
}
function fu(e, t) {
  var n = jt;
  jt |= 1;
  try {
    return e(t);
  } finally {
    jt = n, jt === 0 && (ml = sn() + 500, Ai && hr());
  }
}
function Rr(e) {
  qs !== null && qs.tag === 0 && !(jt & 6) && ll();
  var t = jt;
  jt |= 1;
  var n = ns.transition, r = Rt;
  try {
    if (ns.transition = null, Rt = 1, e) return e();
  } finally {
    Rt = r, ns.transition = n, jt = t, !(jt & 6) && hr();
  }
}
function pu() {
  Hn = Zr.current, Ht(Zr);
}
function Sr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, k0(n)), ln !== null) for (n = ln.return; n !== null; ) {
    var r = n;
    switch (Gc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ci();
        break;
      case 3:
        fl(), Ht(Bn), Ht(En), su();
        break;
      case 5:
        nu(r);
        break;
      case 4:
        fl();
        break;
      case 13:
        Ht(Xt);
        break;
      case 19:
        Ht(Xt);
        break;
      case 10:
        Zc(r.type._context);
        break;
      case 22:
      case 23:
        pu();
    }
    n = n.return;
  }
  if (pn = e, ln = e = ir(e.current, null), xn = Hn = t, un = 0, io = null, du = Oi = Ar = 0, _n = zl = null, wr !== null) {
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
function Zf(e, t) {
  do {
    var n = ln;
    try {
      if (Jc(), Ko.current = yi, xi) {
        for (var r = Qt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        xi = !1;
      }
      if (Tr = 0, fn = cn = Qt = null, Ul = !1, ro = 0, uu.current = null, n === null || n.return === null) {
        un = 1, io = t, ln = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = xn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var h = c, v = a, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var x = v.alternate;
            x ? (v.updateQueue = x.updateQueue, v.memoizedState = x.memoizedState, v.lanes = x.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Nd(i);
          if (y !== null) {
            y.flags &= -257, kd(y, i, a, o, t), y.mode & 1 && vd(o, h, t), t = y, c = h;
            var C = t.updateQueue;
            if (C === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else C.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              vd(o, h, t), mu();
              break e;
            }
            c = Error(ve(426));
          }
        } else if (Vt && a.mode & 1) {
          var D = Nd(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), kd(D, i, a, o, t), Xc(pl(c, a));
            break e;
          }
        }
        o = c = pl(c, a), un !== 4 && (un = 2), zl === null ? zl = [o] : zl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Of(o, c, t);
              fd(o, k);
              break e;
            case 1:
              a = c;
              var f = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof f.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (lr === null || !lr.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var S = Df(o, a, t);
                fd(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      tp(n);
    } catch (E) {
      t = E, ln === n && n !== null && (ln = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function qf() {
  var e = vi.current;
  return vi.current = yi, e === null ? yi : e;
}
function mu() {
  (un === 0 || un === 3 || un === 2) && (un = 4), pn === null || !(Ar & 268435455) && !(Oi & 268435455) || Qs(pn, xn);
}
function wi(e, t) {
  var n = jt;
  jt |= 2;
  var r = qf();
  (pn !== e || xn !== t) && (Cs = null, Sr(e, t));
  do
    try {
      V0();
      break;
    } catch (l) {
      Zf(e, l);
    }
  while (!0);
  if (Jc(), jt = n, vi.current = r, ln !== null) throw Error(ve(261));
  return pn = null, xn = 0, un;
}
function V0() {
  for (; ln !== null; ) ep(ln);
}
function Y0() {
  for (; ln !== null && !ym(); ) ep(ln);
}
function ep(e) {
  var t = sp(e.alternate, e, Hn);
  e.memoizedProps = e.pendingProps, t === null ? tp(e) : ln = t, uu.current = null;
}
function tp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = B0(n, t), n !== null) {
        n.flags &= 32767, ln = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        un = 6, ln = null;
        return;
      }
    } else if (n = F0(n, t, Hn), n !== null) {
      ln = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ln = t;
      return;
    }
    ln = t = e;
  } while (t !== null);
  un === 0 && (un = 5);
}
function vr(e, t, n) {
  var r = Rt, l = ns.transition;
  try {
    ns.transition = null, Rt = 1, G0(e, t, n, r);
  } finally {
    ns.transition = l, Rt = r;
  }
  return null;
}
function G0(e, t, n, r) {
  do
    ll();
  while (qs !== null);
  if (jt & 6) throw Error(ve(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ve(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Mm(e, o), e === pn && (ln = pn = null, xn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Oo || (Oo = !0, rp(si, function() {
    return ll(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ns.transition, ns.transition = null;
    var i = Rt;
    Rt = 1;
    var a = jt;
    jt |= 4, uu.current = null, W0(e, n), Xf(n, e), p0(Qa), li = !!Xa, Qa = Xa = null, e.current = n, z0(n), vm(), jt = a, Rt = i, ns.transition = o;
  } else e.current = n;
  if (Oo && (Oo = !1, qs = e, ki = l), o = e.pendingLanes, o === 0 && (lr = null), wm(n.stateNode), Wn(e, sn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ni) throw Ni = !1, e = gc, gc = null, e;
  return ki & 1 && e.tag !== 0 && ll(), o = e.pendingLanes, o & 1 ? e === xc ? Hl++ : (Hl = 0, xc = e) : Hl = 0, hr(), null;
}
function ll() {
  if (qs !== null) {
    var e = Lh(ki), t = ns.transition, n = Rt;
    try {
      if (ns.transition = null, Rt = 16 > e ? 16 : e, qs === null) var r = !1;
      else {
        if (e = qs, qs = null, ki = 0, jt & 6) throw Error(ve(331));
        var l = jt;
        for (jt |= 4, Ue = e.current; Ue !== null; ) {
          var o = Ue, i = o.child;
          if (Ue.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var h = a[c];
                for (Ue = h; Ue !== null; ) {
                  var v = Ue;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Wl(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, Ue = m;
                  else for (; Ue !== null; ) {
                    v = Ue;
                    var x = v.sibling, y = v.return;
                    if (Vf(v), v === h) {
                      Ue = null;
                      break;
                    }
                    if (x !== null) {
                      x.return = y, Ue = x;
                      break;
                    }
                    Ue = y;
                  }
                }
              }
              var C = o.alternate;
              if (C !== null) {
                var b = C.child;
                if (b !== null) {
                  C.child = null;
                  do {
                    var D = b.sibling;
                    b.sibling = null, b = D;
                  } while (b !== null);
                }
              }
              Ue = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, Ue = i;
          else e: for (; Ue !== null; ) {
            if (o = Ue, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Wl(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, Ue = k;
              break e;
            }
            Ue = o.return;
          }
        }
        var f = e.current;
        for (Ue = f; Ue !== null; ) {
          i = Ue;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, Ue = d;
          else e: for (i = f; Ue !== null; ) {
            if (a = Ue, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Li(9, a);
              }
            } catch (E) {
              qt(a, a.return, E);
            }
            if (a === i) {
              Ue = null;
              break e;
            }
            var S = a.sibling;
            if (S !== null) {
              S.return = a.return, Ue = S;
              break e;
            }
            Ue = a.return;
          }
        }
        if (jt = l, hr(), ks && typeof ks.onPostCommitFiberRoot == "function") try {
          ks.onPostCommitFiberRoot(Si, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Rt = n, ns.transition = t;
    }
  }
  return !1;
}
function Ld(e, t, n) {
  t = pl(n, t), t = Of(e, t, 1), e = rr(e, t, 1), t = An(), e !== null && (ho(e, 1, t), Wn(e, t));
}
function qt(e, t, n) {
  if (e.tag === 3) Ld(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ld(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (lr === null || !lr.has(r))) {
        e = pl(n, e), e = Df(t, e, 1), t = rr(t, e, 1), e = An(), t !== null && (ho(t, 1, e), Wn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function X0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = An(), e.pingedLanes |= e.suspendedLanes & n, pn === e && (xn & n) === n && (un === 4 || un === 3 && (xn & 130023424) === xn && 500 > sn() - hu ? Sr(e, 0) : du |= n), Wn(e, t);
}
function np(e, t) {
  t === 0 && (e.mode & 1 ? (t = Co, Co <<= 1, !(Co & 130023424) && (Co = 4194304)) : t = 1);
  var n = An();
  e = Ls(e, t), e !== null && (ho(e, t, n), Wn(e, n));
}
function Q0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), np(e, n);
}
function J0(e, t) {
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
      throw Error(ve(314));
  }
  r !== null && r.delete(t), np(e, n);
}
var sp;
sp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Bn.current) Fn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Fn = !1, _0(e, t, n);
    Fn = !!(e.flags & 131072);
  }
  else Fn = !1, Vt && t.flags & 1048576 && of(t, hi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Yo(e, t), e = t.pendingProps;
      var l = ul(t, En.current);
      rl(t, n), l = lu(null, t, r, e, l, n);
      var o = ou();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Un(r) ? (o = !0, ui(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, eu(t), l.updater = $i, t.stateNode = l, l._reactInternals = t, lc(t, r, e, n), t = ac(null, t, r, !0, o, n)) : (t.tag = 0, Vt && o && Yc(t), Tn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Yo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = q0(r), e = is(r, e), l) {
          case 0:
            t = ic(null, t, r, e, n);
            break e;
          case 1:
            t = Ed(null, t, r, e, n);
            break e;
          case 11:
            t = wd(null, t, r, e, n);
            break e;
          case 14:
            t = jd(null, t, r, is(r.type, e), n);
            break e;
        }
        throw Error(ve(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), ic(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), Ed(e, t, r, l, n);
    case 3:
      e: {
        if (Bf(t), e === null) throw Error(ve(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, ff(e, t), mi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = pl(Error(ve(423)), t), t = Cd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = pl(Error(ve(424)), t), t = Cd(e, t, r, n, l);
          break e;
        } else for (Vn = sr(t.stateNode.containerInfo.firstChild), Yn = t, Vt = !0, cs = null, n = df(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return pf(t), e === null && nc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ja(r, l) ? i = null : o !== null && Ja(r, o) && (t.flags |= 32), Ff(e, t), Tn(e, t, i, n), t.child;
    case 6:
      return e === null && nc(t), null;
    case 13:
      return Uf(e, t, n);
    case 4:
      return tu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hl(t, null, r, n) : Tn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), wd(e, t, r, l, n);
    case 7:
      return Tn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Tn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Wt(fi, r._currentValue), r._currentValue = i, o !== null) if (fs(o.value, i)) {
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
                  var h = o.updateQueue;
                  if (h !== null) {
                    h = h.shared;
                    var v = h.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), h.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), sc(
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
            if (i = o.return, i === null) throw Error(ve(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), sc(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, rl(t, n), l = ss(l), r = r(l), t.flags |= 1, Tn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = is(r, t.pendingProps), l = is(r.type, l), jd(e, t, r, l, n);
    case 15:
      return Pf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : is(r, l), Yo(e, t), t.tag = 1, Un(r) ? (e = !0, ui(t)) : e = !1, rl(t, n), Lf(t, r, l), lc(t, r, l, n), ac(null, t, r, !0, e, n);
    case 19:
      return Wf(e, t, n);
    case 22:
      return _f(e, t, n);
  }
  throw Error(ve(156, t.tag));
};
function rp(e, t) {
  return Th(e, t);
}
function Z0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ts(e, t, n, r) {
  return new Z0(e, t, n, r);
}
function gu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function q0(e) {
  if (typeof e == "function") return gu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Oc) return 11;
    if (e === Dc) return 14;
  }
  return 2;
}
function ir(e, t) {
  var n = e.alternate;
  return n === null ? (n = ts(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Qo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") gu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Wr:
      return br(n.children, l, o, t);
    case Lc:
      i = 8, l |= 8;
      break;
    case Ia:
      return e = ts(12, n, t, l | 2), e.elementType = Ia, e.lanes = o, e;
    case Ta:
      return e = ts(13, n, t, l), e.elementType = Ta, e.lanes = o, e;
    case Aa:
      return e = ts(19, n, t, l), e.elementType = Aa, e.lanes = o, e;
    case fh:
      return Di(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case dh:
          i = 10;
          break e;
        case hh:
          i = 9;
          break e;
        case Oc:
          i = 11;
          break e;
        case Dc:
          i = 14;
          break e;
        case Ks:
          i = 16, r = null;
          break e;
      }
      throw Error(ve(130, e == null ? e : typeof e, ""));
  }
  return t = ts(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function br(e, t, n, r) {
  return e = ts(7, e, r, t), e.lanes = n, e;
}
function Di(e, t, n, r) {
  return e = ts(22, e, r, t), e.elementType = fh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ya(e, t, n) {
  return e = ts(6, e, null, t), e.lanes = n, e;
}
function va(e, t, n) {
  return t = ts(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function eg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qi(0), this.expirationTimes = qi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function xu(e, t, n, r, l, o, i, a, c) {
  return e = new eg(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ts(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, eu(o), e;
}
function tg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ur, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function lp(e) {
  if (!e) return cr;
  e = e._reactInternals;
  e: {
    if (Lr(e) !== e || e.tag !== 1) throw Error(ve(170));
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
    throw Error(ve(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Un(n)) return rf(e, n, t);
  }
  return t;
}
function op(e, t, n, r, l, o, i, a, c) {
  return e = xu(n, r, !0, e, l, o, i, a, c), e.context = lp(null), n = e.current, r = An(), l = or(n), o = Ts(r, l), o.callback = t ?? null, rr(n, o, l), e.current.lanes = l, ho(e, l, r), Wn(e, r), e;
}
function Pi(e, t, n, r) {
  var l = t.current, o = An(), i = or(l);
  return n = lp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ts(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = rr(l, t, i), e !== null && (hs(e, l, i, o), Ho(e, l, i)), i;
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
function Od(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function yu(e, t) {
  Od(e, t), (e = e.alternate) && Od(e, t);
}
function ng() {
  return null;
}
var ip = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function vu(e) {
  this._internalRoot = e;
}
_i.prototype.render = vu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ve(409));
  Pi(e, t, null, null);
};
_i.prototype.unmount = vu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Rr(function() {
      Pi(null, e, null, null);
    }), t[$s] = null;
  }
};
function _i(e) {
  this._internalRoot = e;
}
_i.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ph();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Xs.length && t !== 0 && t < Xs[n].priority; n++) ;
    Xs.splice(n, 0, e), n === 0 && Fh(e);
  }
};
function Nu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Fi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Dd() {
}
function sg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var h = ji(i);
        o.call(h);
      };
    }
    var i = op(t, r, e, 0, null, !1, !1, "", Dd);
    return e._reactRootContainer = i, e[$s] = i.current, ql(e.nodeType === 8 ? e.parentNode : e), Rr(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var h = ji(c);
      a.call(h);
    };
  }
  var c = xu(e, 0, !1, null, null, !1, !1, "", Dd);
  return e._reactRootContainer = c, e[$s] = c.current, ql(e.nodeType === 8 ? e.parentNode : e), Rr(function() {
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
  } else i = sg(n, t, e, l, r);
  return ji(i);
}
Oh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ll(t.pendingLanes);
        n !== 0 && (Fc(t, n | 1), Wn(t, sn()), !(jt & 6) && (ml = sn() + 500, hr()));
      }
      break;
    case 13:
      Rr(function() {
        var r = Ls(e, 1);
        if (r !== null) {
          var l = An();
          hs(r, e, 1, l);
        }
      }), yu(e, 1);
  }
};
Bc = function(e) {
  if (e.tag === 13) {
    var t = Ls(e, 134217728);
    if (t !== null) {
      var n = An();
      hs(t, e, 134217728, n);
    }
    yu(e, 134217728);
  }
};
Dh = function(e) {
  if (e.tag === 13) {
    var t = or(e), n = Ls(e, t);
    if (n !== null) {
      var r = An();
      hs(n, e, t, r);
    }
    yu(e, t);
  }
};
Ph = function() {
  return Rt;
};
_h = function(e, t) {
  var n = Rt;
  try {
    return Rt = e, t();
  } finally {
    Rt = n;
  }
};
Ua = function(e, t, n) {
  switch (t) {
    case "input":
      if (La(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ti(r);
            if (!l) throw Error(ve(90));
            mh(r), La(r, l);
          }
        }
      }
      break;
    case "textarea":
      xh(e, n);
      break;
    case "select":
      t = n.value, t != null && el(e, !!n.multiple, t, !1);
  }
};
Eh = fu;
Ch = Rr;
var rg = { usingClientEntryPoint: !1, Events: [po, Vr, Ti, wh, jh, fu] }, Il = { findFiberByHostInstance: kr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, lg = { bundleType: Il.bundleType, version: Il.version, rendererPackageName: Il.rendererPackageName, rendererConfig: Il.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ds.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Mh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Il.findFiberByHostInstance || ng, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Do = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Do.isDisabled && Do.supportsFiber) try {
    Si = Do.inject(lg), ks = Do;
  } catch {
  }
}
Xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rg;
Xn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Nu(t)) throw Error(ve(200));
  return tg(e, t, null, n);
};
Xn.createRoot = function(e, t) {
  if (!Nu(e)) throw Error(ve(299));
  var n = !1, r = "", l = ip;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = xu(e, 1, !1, null, null, n, !1, r, l), e[$s] = t.current, ql(e.nodeType === 8 ? e.parentNode : e), new vu(t);
};
Xn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ve(188)) : (e = Object.keys(e).join(","), Error(ve(268, e)));
  return e = Mh(t), e = e === null ? null : e.stateNode, e;
};
Xn.flushSync = function(e) {
  return Rr(e);
};
Xn.hydrate = function(e, t, n) {
  if (!Fi(t)) throw Error(ve(200));
  return Bi(null, e, t, !0, n);
};
Xn.hydrateRoot = function(e, t, n) {
  if (!Nu(e)) throw Error(ve(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = ip;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = op(t, null, e, 1, n ?? null, l, !1, o, i), e[$s] = t.current, ql(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new _i(t);
};
Xn.render = function(e, t, n) {
  if (!Fi(t)) throw Error(ve(200));
  return Bi(null, e, t, !1, n);
};
Xn.unmountComponentAtNode = function(e) {
  if (!Fi(e)) throw Error(ve(40));
  return e._reactRootContainer ? (Rr(function() {
    Bi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[$s] = null;
    });
  }), !0) : !1;
};
Xn.unstable_batchedUpdates = fu;
Xn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Fi(n)) throw Error(ve(200));
  if (e == null || e._reactInternals === void 0) throw Error(ve(38));
  return Bi(e, t, n, !1, r);
};
Xn.version = "18.3.1-next-f1338f8080-20240426";
function ap() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ap);
    } catch (e) {
      console.error(e);
    }
}
ap(), ih.exports = Xn;
var Ps = ih.exports, Pd = Ps;
qo.createRoot = Pd.createRoot, qo.hydrateRoot = Pd.hydrateRoot;
var cp = { exports: {} }, Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var og = u, ig = Symbol.for("react.element"), ag = Symbol.for("react.fragment"), cg = Object.prototype.hasOwnProperty, ug = og.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, dg = { key: !0, ref: !0, __self: !0, __source: !0 };
function up(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) cg.call(t, r) && !dg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: ig, type: e, key: o, ref: i, props: l, _owner: ug.current };
}
Ui.Fragment = ag;
Ui.jsx = up;
Ui.jsxs = up;
cp.exports = Ui;
var s = cp.exports;
let Js = [], dp = 120, Na = !1;
async function hg() {
  if (!Na) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          fg(n), Na = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Na = !0;
  }
}
function fg(e) {
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
  } : { offsetMin: dp, label: "LOCAL" };
}
function hp(e, t) {
  return Js.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ei(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of Js)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const h = (c.offsetBeforeMin - c.offsetAfterMin) / 60, v = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (v.getUTCFullYear() === n && v.getUTCMonth() + 1 === r && v.getUTCDate() === l) {
        const m = v.getUTCHours();
        if (o >= m && o < m + h)
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
function pg(e) {
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
function mg(e) {
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
  return t === "UTC" ? mg(e) : pg(e);
}
function _d(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Er(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function Nc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, i] = e.split("-").map(Number), [a, c, h = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, i, a, c, h);
  if (n === "UTC")
    return v;
  const m = Ei(e, t);
  if (m.isAmbiguous)
    return r === 2 ? m.secondOccurrenceEpoch : m.firstOccurrenceEpoch;
  const x = v - dp * 6e4, { offsetMin: y } = As(x);
  let C = v - y * 6e4;
  const b = As(C);
  return b.offsetMin !== y && (C = v - b.offsetMin * 6e4), C;
}
function gg({
  timeRange: e,
  baseEpochMs: t,
  timeMode: n,
  setTimeMode: r,
  activeStationId: l,
  hideBackToGrid: o,
  onResetActiveStation: i,
  onOpenRangeModal: a,
  onOpenBookmarksModal: c,
  onOpenHelpModal: h,
  onToggleDrawer: v,
  isInitialSetup: m = !1,
  selectedCount: x = 0,
  totalCount: y = 0,
  onResetStudio: C
}) {
  const [b, D] = u.useState(!1);
  u.useEffect(() => {
    if (!b) return;
    const E = (j) => {
      j.key === "Escape" && D(!1);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [b]);
  const k = u.useMemo(() => {
    const E = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!E || j <= 0) return "-- ➔ --";
    const N = E + j, T = (re) => String(re).padStart(2, "0"), g = Er(E, n), M = Er(N, n), O = `${g.year}-${T(g.month)}-${T(g.day)}`, U = `${T(g.hour)}:${T(g.minute)}:${T(g.second)}`, A = `${M.year}-${T(M.month)}-${T(M.day)}`, W = `${T(M.hour)}:${T(M.minute)}:${T(M.second)}`, oe = n === "UTC" ? " (UTC)" : g.label ? ` (${g.label})` : "", B = O === A ? W : `${A} ${W}`;
    return `${O} ${U} ➔ ${B}${oe}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), f = u.useMemo(() => {
    const E = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (E >= 1440) {
      const j = (E / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${E}m Total)`;
    }
    return `(${E}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), d = () => {
    D(!1), C == null || C();
  }, S = b ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => D(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (E) => E.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: d, children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: k }),
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: f })
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: x }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              y
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
      !m && /* @__PURE__ */ s.jsx(
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
    typeof document < "u" && S && Ps.createPortal(S, document.body)
  ] });
}
const Pr = (e) => String(e).padStart(2, "0");
function vt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const x = new Date(e), y = Pr(x.getUTCHours()), C = Pr(x.getUTCMinutes()), b = Pr(x.getUTCSeconds()), D = l ? `${y}:${C}:${b}` : `${y}:${C}`;
    return r ? `${D} UTC` : D;
  }
  const { offsetMin: o, label: i } = As(e), a = new Date(e + o * 60 * 1e3), c = Pr(a.getUTCHours()), h = Pr(a.getUTCMinutes()), v = Pr(a.getUTCSeconds()), m = l ? `${c}:${h}:${v}` : `${c}:${h}`;
  return r ? `${m} ${i}` : m;
}
const xg = 600, Fd = 250, Zn = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), kc = /* @__PURE__ */ new Set(), Bd = 4;
let ol = 0, us = [];
function wc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Fd) * Fd;
}
function fp() {
  var e;
  if (!(ol >= Bd || us.length === 0))
    for (us = us.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); ol < Bd && us.length > 0; ) {
      const t = us.pop();
      !t || (e = t.signal) != null && e.aborted || (ol++, yg(t));
    }
}
function Jo(e, t, n, r = "mon-0") {
  const l = wc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (Zn.size >= xg) {
    const a = Zn.keys().next().value, c = Zn.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), Zn.delete(a);
  }
  Zn.set(i, n), kc.forEach((a) => a(e, l, n, o));
}
async function yg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: i } = e;
  try {
    if (o != null && o.aborted) {
      i(null);
      return;
    }
    const a = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${a}`, { signal: o });
    if (c.status === 200) {
      const h = await c.blob(), v = URL.createObjectURL(h);
      Jo(n, r, v, l), i(v);
    } else c.status === 204 ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Jo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    ol = Math.max(0, ol - 1), Nr.delete(t), fp();
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
    const r = wc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!Zn.has(o)) return null;
    const i = Zn.get(o);
    return Zn.delete(o), Zn.set(o, i), i;
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
    Zn.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), Zn.clear(), Nr.clear(), us = [], ol = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return kc.add(e), () => kc.delete(e);
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
    const l = wc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
    if (Zn.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (Nr.has(i))
      return Nr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      us = us.filter((v) => v.hostname === e && v.displayId === o && v.key !== i ? (Nr.delete(v.key), v.resolve(null), !1) : !0);
      const h = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        us = us.filter((v) => v.key !== i), Nr.delete(i), c(null);
      }, { once: !0 }), us.push(h), fp();
    });
    return Nr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  In.clearAll();
});
const ku = "ITB_STUDIO_SESSION_CACHE_V2", pp = "itb_player_audio_settings";
let ka = null;
function vg() {
  try {
    const e = localStorage.getItem(ku);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function mp(e) {
  e && (ka && clearTimeout(ka), ka = setTimeout(() => {
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
      localStorage.setItem(ku, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Ng() {
  try {
    localStorage.removeItem(ku);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function il() {
  try {
    const e = localStorage.getItem(pp);
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
function kg(e) {
  try {
    localStorage.setItem(pp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Ys = null, qr = null, wa = null, Dn = 0, _r = 0, Po = -60, ao = 1;
function wg() {
  if (!Ys) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Ys = new e());
  }
  return Ys && Ys.state === "suspended" && Ys.resume().catch(() => {
  }), Ys;
}
function Ci(e, t = 1) {
  if (!e) return null;
  ao = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = wg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (i) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", i);
      }
    return l && l.gain.setValueAtTime(ao, n.currentTime), qr = e, jg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function Ud(e) {
  if (ao = Math.max(0, Number(e) || 1), qr != null && qr.__audioGainNode && Ys)
    try {
      qr.__audioGainNode.gain.setValueAtTime(ao, Ys.currentTime);
    } catch {
    }
}
function jg() {
  if (wa) return;
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
          const h = Math.abs(c);
          h > o && (o = h);
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
        gain: ao,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), wa = requestAnimationFrame(t);
  };
  wa = requestAnimationFrame(t);
}
function gp({ isPlaying: e = !1 }) {
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
function Eg({
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
          const h = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), v = !i && o === h, m = a.width ?? a.Width ?? 1920, x = a.height ?? a.Height ?? 1080, y = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (C) => {
                C.stopPropagation(), n == null || n(h);
              },
              title: `Switch window to Monitor ${c + 1}: ${y} (${m}×${x})`,
              "aria-label": `Monitor ${c + 1}`,
              children: /* @__PURE__ */ s.jsx("span", { className: "number-label", children: c + 1 })
            },
            h
          );
        })
      ] })
    }
  );
}
function xp({
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
    let y = 1 / 0, C = 1 / 0, b = -1 / 0, D = -1 / 0;
    e.forEach((d) => {
      const S = d.x ?? d.X ?? 0, E = d.y ?? d.Y ?? 0, j = d.width ?? d.Width ?? 1920, N = d.height ?? d.Height ?? 1080;
      y = Math.min(y, S), C = Math.min(C, E), b = Math.max(b, S + j), D = Math.max(D, E + N);
    });
    const k = Math.max(1, b - y), f = Math.max(1, D - C);
    return { minX: y, minY: C, totalW: k, totalH: f };
  }, [e]);
  if (!e || e.length <= 1 || !i)
    return null;
  const a = e.find((y) => (y.displayId ?? y.DisplayId) === t) || e[0], c = e.indexOf(a), h = c >= 0 ? c + 1 : 1, m = (a ? a.displayName ?? a.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), x = m && !m.toLowerCase().includes("screen") ? `SCREEN ${h} (${m.toUpperCase()})` : m ? m.toUpperCase() : `SCREEN ${h}`;
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
          x,
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
            x
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${i.totalW} ${i.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((y, C) => {
              const b = y.displayId ?? y.DisplayId ?? `mon-${C}`, D = (y.x ?? y.X ?? 0) - i.minX, k = (y.y ?? y.Y ?? 0) - i.minY, f = y.width ?? y.Width ?? 1920, d = y.height ?? y.Height ?? 1080, S = b === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${S ? "is-active" : ""}`,
                  onClick: (E) => {
                    E.stopPropagation(), n == null || n(b);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: D + 10,
                        y: k + 10,
                        width: Math.max(10, f - 20),
                        height: Math.max(10, d - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: D + f / 2,
                        y: k + d / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: C + 1
                      }
                    )
                  ]
                },
                b
              );
            })
          }
        ) })
      ]
    }
  );
}
function Cg({
  station: e,
  currentEpochMs: t,
  isOffline: n,
  isSolo: r,
  isPlaying: l,
  setIsPlaying: o,
  baseEpochMs: i,
  totalDurationMs: a,
  outPointMs: c,
  setPlayheadMs: h,
  isSpotlightActive: v,
  globalGaps: m = [],
  recordingSegments: x = {},
  playbackSpeed: y = 1,
  activeAudioStationId: C = null,
  directorPlan: b = null,
  isAutoDirectorEnabled: D = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: f = null,
  areAllDisplaysPlaced: d = !1,
  hideDisplayStrip: S = !1
}) {
  var Oe;
  const E = e.hostname || e.name || e.id || "", j = Math.round(t), [N, T] = u.useState(() => !E || !j ? null : In.get(E, j) || null), [g, M] = u.useState(""), [O, U] = u.useState(!1), [A, W] = u.useState(!1), [oe, B] = u.useState(!1), re = u.useRef(l), I = u.useRef(null), R = u.useRef(0), _ = u.useRef(t - i), K = u.useRef(t - i), F = u.useRef(!1), te = u.useRef(null), Z = u.useRef(!1);
  _.current = t - i;
  const G = (e == null ? void 0 : e.displays) || ((Oe = e == null ? void 0 : e.topology) == null ? void 0 : Oe.displays) || [], [le, ze] = u.useState(null);
  u.useEffect(() => {
    ze(null);
  }, [k]);
  const Le = u.useMemo(() => {
    const me = b || (e == null ? void 0 : e.directorPlan);
    return !me || !me.segments || me.segments.length === 0 ? null : me.segments.find((de) => {
      const J = de.startEpochMs ?? de.StartEpochMs ?? 0, pe = de.endEpochMs ?? de.EndEpochMs ?? 0;
      return t >= J && t <= pe;
    }) || me.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t]), je = u.useMemo(() => {
    var me;
    return le ? le.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : G.length > 1 && D !== !1 && Le ? (Le.targetDisplayId || Le.TargetDisplayId || "mon-0").toLowerCase() : (((me = G[0]) == null ? void 0 : me.displayId) || "mon-0").toLowerCase();
  }, [le, k, G, D, Le]), X = u.useRef(je), [ie, ee] = u.useState(!1);
  u.useEffect(() => {
    if (X.current && X.current !== je) {
      ee(!0);
      const me = setTimeout(() => ee(!1), 2e3);
      return X.current = je, () => clearTimeout(me);
    }
    X.current = je;
  }, [je]);
  const se = x[e == null ? void 0 : e.id] || x[E] || (e == null ? void 0 : e.segments) || [], be = se.length === 0 || se.some((me) => {
    const de = me.startEpochMs ?? me.startEpoch ?? 0, J = me.endEpochMs ?? me.endEpoch ?? 0;
    return t >= de && t <= J;
  }), z = !!(r ? !il().isMuted : C && (e.id === C || E === C)), ne = u.useCallback(() => {
    if (!I.current) return;
    const me = il();
    if (r)
      I.current.volume = me.volume, I.current.muted = me.isMuted, me.isMuted || Ci(I.current);
    else {
      const de = !!(C && (e.id === C || E === C));
      I.current.muted = !de, de && (I.current.volume = me.volume, Ci(I.current));
    }
  }, [r, C, e.id, E]);
  u.useEffect(() => {
    ne();
  }, [ne]), u.useEffect(() => {
    const me = (de) => {
      I.current && de.detail && ne();
    };
    return window.addEventListener("itb-audio-state-changed", me), () => window.removeEventListener("itb-audio-state-changed", me);
  }, [ne]), u.useEffect(() => {
    I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !j || !E) return;
    if (l) {
      re.current = !0;
      return;
    }
    const me = re.current;
    re.current = l;
    let de = !0;
    const J = new AbortController(), pe = In.get(E, j, je);
    if (pe) {
      T(pe), W(!1), B(!1);
      return;
    }
    B(!0);
    const We = setTimeout(() => {
      de && In.fetchFrame(E, j, J.signal, je).then((Fe) => {
        de && (B(!1), Fe && Fe !== "NO_SIGNAL" ? (T(Fe), W(!1)) : Fe === "NO_SIGNAL" && W(!0));
      });
    }, me ? 25 : 40), He = In.subscribe((Fe, Ee, ot, Be) => {
      Fe === E && Ee === j && (!Be || Be === je) && de && (B(!1), ot && ot !== "NO_SIGNAL" ? (T(ot), W(!1)) : ot === "NO_SIGNAL" && W(!0));
    });
    return () => {
      de = !1, clearTimeout(We), J.abort(), He();
    };
  }, [E, j, n, l, r, O, je]), u.useEffect(() => {
    if (!E || !(r || l)) {
      l || (te.current && clearTimeout(te.current), F.current = !1, M(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load()));
      return;
    }
    let de = null;
    return l && !v && be ? de = setTimeout(() => {
      const J = _.current;
      R.current = J, K.current = J, F.current = !1;
      const pe = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + J}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      U(!1), M(pe);
    }, 80) : l || (te.current && clearTimeout(te.current), F.current = !1, M(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load())), () => {
      de && clearTimeout(de);
    };
  }, [l, r, E, i, a, v, be, je]), u.useEffect(() => {
    if (!E || !(r || l)) return;
    const de = _.current, J = Math.abs(de - K.current);
    if (!l || J < 800) {
      K.current = de;
      return;
    }
    return F.current = !0, K.current = de, R.current = de, I.current && I.current.pause(), U(!1), te.current && clearTimeout(te.current), te.current = setTimeout(() => {
      if (!be || v) {
        M(""), U(!1), F.current = !1;
        return;
      }
      const pe = _.current, he = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + pe}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      M(he);
    }, 75), () => {
      te.current && clearTimeout(te.current);
    };
  }, [t, l, r, E, i, a, v, be, je]), u.useEffect(() => {
    if (r || !l || !I.current || !O || F.current) return;
    const me = (_.current - R.current) / 1e3;
    if (me >= 0) {
      const de = I.current, J = de.currentTime, pe = Math.abs(J - me);
      if (pe > 0.35 && pe < 3)
        try {
          de.currentTime = me;
        } catch {
        }
    }
  }, [r, l, t, O]), u.useEffect(() => {
    if (!r || !l || !g || !O || v) return;
    let me = null, de = I.current ? I.current.currentTime : 0, J = performance.now(), pe = R.current + Math.round(de * 1e3);
    const he = () => {
      const We = I.current;
      if (We && !We.paused && !We.ended && !Z.current && !F.current) {
        const He = performance.now(), Fe = We.currentTime;
        Math.abs(Fe - de) > 5e-4 && (de = Fe, J = He);
        const Ee = Math.max(0, (He - J) / 1e3), ot = We.playbackRate || y || 1, Be = de + Ee * ot;
        let It = R.current + Math.round(Be * 1e3);
        const Ge = It - pe;
        if (Ge < 0 && Ge > -300 && (It = pe), It >= c) {
          o == null || o(!1), h == null || h(c);
          return;
        }
        const Et = i + It, en = m == null ? void 0 : m.find((ut) => Et >= ut.startEpochMs && Et < ut.endEpochMs);
        if (en) {
          Z.current = !0;
          const ut = en.endEpochMs - i;
          h(ut), R.current = ut, pe = ut, K.current = ut;
          const tn = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ut}&_t=${Date.now()}`;
          U(!1), M(tn), setTimeout(() => {
            Z.current = !1;
          }, 300);
          return;
        }
        It !== pe && (pe = It, K.current = It, h == null || h(It));
      }
      me = requestAnimationFrame(he);
    };
    return me = requestAnimationFrame(he), () => {
      me && cancelAnimationFrame(me);
    };
  }, [
    r,
    l,
    g,
    O,
    v,
    y,
    c,
    i,
    a,
    E,
    m,
    h,
    o
  ]);
  const _e = () => {
    if (Z.current) return;
    const me = i + _.current, de = se.map((J) => ({ start: J.startEpochMs ?? J.startEpoch ?? 0, end: J.endEpochMs ?? J.endEpoch ?? 0 })).filter((J) => J.start > me + 200).sort((J, pe) => J.start - pe.start)[0];
    if (de && de.start - i < c) {
      Z.current = !0;
      const J = de.start - i;
      h(J), R.current = J;
      const pe = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + J}&_t=${Date.now()}`;
      U(!1), M(pe), setTimeout(() => {
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
    (r || l) && g && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: I,
        src: g,
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
        muted: !z,
        onLoadedData: () => {
          I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onCanPlay: () => {
          ne(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y), l && I.current && I.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          F.current = !1, U(!0), ne(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onWaiting: () => {
          U(!1);
        },
        onTimeUpdate: () => {
          var me;
          !O && ((me = I.current) == null ? void 0 : me.currentTime) > 0 && (F.current = !1, U(!0));
        },
        onEnded: _e
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && O && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: N && !A ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: N,
            alt: E,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => W(!0)
          }
        ) : (!N || A || !be) && !g ? /* @__PURE__ */ s.jsx(gp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && be && !O && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          E
        ] })
      ] })
    ] }) }),
    G.length > 1 && /* @__PURE__ */ s.jsx(
      xp,
      {
        displays: G,
        activeDisplayId: je,
        onSelectDisplay: (me) => {
          ze(me), f == null || f(me);
        },
        isTransitioning: ie,
        mode: D ? "AUTO" : "MANUAL"
      }
    ),
    !S && /* @__PURE__ */ s.jsx(
      Eg,
      {
        displays: G,
        activeDisplayId: je,
        onSelectDisplay: (me) => {
          ze(me), f == null || f(me);
        },
        areAllDisplaysPlaced: d,
        isAutoDirectorEnabled: D
      }
    )
  ] });
}
function Sg({
  station: e,
  isSolo: t = !1,
  stationsCount: n = 1,
  onDeselectStation: r = null,
  currentEpochMs: l,
  timeMode: o = "LOCAL",
  isPlaying: i,
  setIsPlaying: a,
  baseEpochMs: c,
  totalDurationMs: h,
  outPointMs: v,
  setPlayheadMs: m,
  isSpotlightActive: x,
  globalGaps: y = [],
  onOpenSpotlight: C,
  onSelectActiveStation: b,
  recordingSegments: D = {},
  playbackSpeed: k = 1,
  activeAudioStationId: f = null,
  onSoloAudio: d,
  directorPlan: S = null,
  isAutoDirectorEnabled: E = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: T = !1,
  _slotIndex: g = 0,
  borderColor: M = null,
  onSwapWithNext: O = null
}) {
  var I;
  const U = !!(f && (e.id === f || e.hostname && e.hostname === f)), A = (e.hostname || e.name || "").includes("Offline"), W = A ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((I = e == null ? void 0 : e.topology) == null ? void 0 : I.displays) || []).length > 1;
  const B = () => {
    if (t) {
      const R = j && j !== "auto" && j !== "director" ? j : null;
      C && C(e.id, R);
    } else
      b && b(e.id);
  }, re = (R) => {
    R.preventDefault(), R.stopPropagation(), t && b && (a && a(!1), b(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: B,
      onContextMenu: re,
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
                onClick: (R) => {
                  R.stopPropagation(), O();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            d && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${U ? "audio-active" : ""}`,
                onClick: (R) => {
                  R.stopPropagation(), d(U ? null : e.id);
                },
                title: U ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: U ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            C && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (R) => {
                  R.stopPropagation();
                  const _ = j && j !== "auto" && j !== "director" ? j : null;
                  C(e.id, _);
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
                onClick: (R) => {
                  R.stopPropagation(), t && a && a(!1), b(t ? null : e.id);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${A ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Cg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: A,
              isSolo: t,
              isPlaying: i,
              setIsPlaying: a,
              baseEpochMs: c,
              totalDurationMs: h,
              outPointMs: v,
              setPlayheadMs: m,
              isSpotlightActive: x,
              globalGaps: y,
              recordingSegments: D,
              playbackSpeed: k,
              activeAudioStationId: f,
              directorPlan: S,
              isAutoDirectorEnabled: E,
              targetDisplayId: j,
              onSelectDisplayId: N,
              areAllDisplaysPlaced: T,
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
        !A && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          vt(l, o)
        ] }) })
      ]
    }
  ) });
}
const ja = ["top-right", "bottom-right", "bottom-left", "top-left"];
function bg({
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
  }), o = t || r, i = u.useCallback((D) => {
    D && (D.preventDefault(), D.stopPropagation());
    const f = (ja.indexOf(o) + 1) % ja.length, d = ja[f];
    l(d);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", d);
    } catch {
    }
    n && n(d);
  }, [o, n]), a = new Date(e || Date.now()), c = a.getUTCFullYear(), h = String(a.getUTCMonth() + 1).padStart(2, "0"), v = String(a.getUTCDate()).padStart(2, "0"), m = String(a.getUTCHours()).padStart(2, "0"), x = String(a.getUTCMinutes()).padStart(2, "0"), y = String(a.getUTCSeconds()).padStart(2, "0"), C = `${c}-${h}-${v}`, b = `${m}:${x}:${y} UTC`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `canvas-utc-wall-clock corner-${o}`,
      onClick: i,
      title: "Persistent Canvas UTC Wall Clock • Click or use [⤢] to cycle corner position (Permanent orientation clock)",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: C }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: b })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cycle-corner",
            onClick: i,
            title: `Current corner: ${o.toUpperCase()} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function Gt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Mg(e) {
  const t = Gt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ig(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Tg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var b, D, k, f, d, S;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let E = 0; E < e.length; E++)
    if (e[E].timestampEpochMs <= t)
      l = e[E], o = e[E + 1] || e[E];
    else {
      o === l && e[E] && (o = e[E]);
      break;
    }
  if (l === o)
    return ((b = l.layout) == null ? void 0 : b.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((D = l.layout) == null ? void 0 : D.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (a === "cut")
    return ((f = l.layout) == null ? void 0 : f.placements) || n;
  const h = (t - c) / i, v = Gt(h, 0, 1), m = a === "linear" ? v : Mg(v), x = ((d = l.layout) == null ? void 0 : d.placements) || [], y = ((S = o.layout) == null ? void 0 : S.placements) || [], C = y.map((E) => {
    const j = x.find((U) => U.stationId === E.stationId && U.displayId === E.displayId);
    if (!j)
      return {
        ...E,
        opacity: Math.max(0.05, m)
      };
    const N = Math.round(j.x + (E.x - j.x) * m), T = Math.round(j.y + (E.y - j.y) * m), g = Math.round(j.width + (E.width - j.width) * m), M = Math.round(j.height + (E.height - j.height) * m), O = Number(((j.rotation || 0) + ((E.rotation || 0) - (j.rotation || 0)) * m).toFixed(1));
    return {
      ...E,
      x: N,
      y: T,
      width: g,
      height: M,
      rotation: O,
      opacity: 1
    };
  });
  return x.forEach((E) => {
    y.some((N) => N.stationId === E.stationId && N.displayId === E.displayId) || C.push({
      ...E,
      opacity: Math.max(0, 1 - m)
    });
  }), C;
}
function Ag({
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
    const C = {
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
      nextTimeline: { ...e || {}, keyframes: [C] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: C
    };
  }
  const h = c.findIndex((C) => Math.abs(C.timestampEpochMs - n) <= l);
  if (h >= 0)
    return c[h] = {
      ...c[h],
      layout: {
        ...c[h].layout,
        width: o,
        height: i,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: c },
      newIndex: h,
      isNewKeyframe: !1,
      activeKeyframe: c[h]
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
  }, m = [...c, v].sort((C, b) => C.timestampEpochMs - b.timestampEpochMs), x = m.findIndex((C) => C.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: m },
    newIndex: x >= 0 ? x : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function jc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function Rg(e, t) {
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
function Wd(e, t, n, r = 500) {
  const l = (e == null ? void 0 : e.keyframes) || [], o = l.findIndex((h) => Math.abs(h.timestampEpochMs - t) <= r);
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
  }, a = [...l, i].sort((h, v) => h.timestampEpochMs - v.timestampEpochMs), c = a.findIndex((h) => h.id === i.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: a
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
function $g(e, t = [], n = []) {
  if (!Array.isArray(e) || e.length === 0) return [];
  let r = e.map((i) => ({
    ...i,
    startEpochMs: i.startEpochMs ?? i.StartEpochMs ?? 0,
    endEpochMs: i.endEpochMs ?? i.EndEpochMs ?? 0,
    targetDisplayId: (i.targetDisplayId || i.TargetDisplayId || "mon-0").toLowerCase()
  })).sort((i, a) => i.startEpochMs - a.startEpochMs);
  const l = [];
  Array.isArray(n) && n.length > 0 && n.forEach((i) => {
    const a = i.startEpochMs ?? i.StartEpochMs ?? i.startEpoch ?? 0, c = i.endEpochMs ?? i.EndEpochMs ?? i.endEpoch ?? 0;
    c > a && l.push({ startEpoch: a, endEpoch: c });
  }), Array.isArray(t) && t.filter((i) => i.type === "global").forEach((i) => {
    const a = i.startEpochMs ?? i.startEpoch ?? 0, c = i.endEpochMs ?? i.endEpoch ?? 0;
    c > a && !l.some((h) => h.startEpoch === a && h.endEpoch === c) && l.push({ startEpoch: a, endEpoch: c });
  }), l.forEach((i) => {
    const a = i.startEpoch, c = i.endEpoch, h = [];
    r.forEach((v) => {
      v.endEpochMs <= a || v.startEpochMs >= c ? h.push(v) : (v.startEpochMs < a && h.push({
        ...v,
        endEpochMs: a
      }), v.endEpochMs > c && h.push({
        ...v,
        startEpochMs: c
      }));
    }), r = h;
  }), (t || []).filter((i) => i.type !== "global").forEach((i) => {
    const a = i.startEpochMs ?? i.StartEpochMs ?? i.startEpoch ?? 0, c = i.endEpochMs ?? i.EndEpochMs ?? i.endEpoch ?? 0;
    if (!(!a || !c || c <= a))
      for (let h = r.length - 1; h > 0; h--) {
        const v = r[h].startEpochMs;
        v >= a && v <= c && r[h].startEpochMs === r[h - 1].endEpochMs && (r[h - 1].endEpochMs = r[h].endEpochMs, r.splice(h, 1));
      }
  });
  for (let i = r.length - 1; i > 0; i--)
    r[i].targetDisplayId === r[i - 1].targetDisplayId && r[i].startEpochMs === r[i - 1].endEpochMs && (r[i - 1].endEpochMs = r[i].endEpochMs, r.splice(i, 1));
  return r;
}
const Jn = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], Ec = 1920, Cc = 1080, gt = [
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
], Lg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function Og(e, t, n) {
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
function Gs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, h, v;
  return o >= i ? (a = n, c = Math.round(a / o), h = e, v = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), h = e + Math.round((n - a) / 2), v = t), { x: h, y: v, width: a, height: c };
}
function zs(e, t = Ec, n = Cc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], h = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: m, width: x, height: y } = Gs(0, 0, t, n, h);
    return [{
      ...c,
      x: v,
      y: m,
      width: x,
      height: y,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: h,
      aspectRatio: h,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: gt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((h, v) => {
      const m = h.nativeAspectRatio || (h.sourceWidth && h.sourceHeight ? h.sourceWidth / h.sourceHeight : 1.7777777777777777), { x, y, width: C, height: b } = Gs(v * c, 0, c, n, m);
      return {
        ...h,
        x,
        y,
        width: C,
        height: b,
        sourceWidth: h.sourceWidth || 1920,
        sourceHeight: h.sourceHeight || 1080,
        nativeAspectRatio: m,
        aspectRatio: m,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: gt[v % gt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const x = Math.round(t / 3);
      return e.slice(0, 3).map((y, C) => {
        const b = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: D, y: k, width: f, height: d } = Gs(C * x, 0, x, n, b);
        return {
          ...y,
          x: D,
          y: k,
          width: f,
          height: d,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: b,
          aspectRatio: b,
          zIndex: C,
          rotation: 0,
          borderWidth: 2,
          borderColor: gt[C % gt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const h = Math.round(t / 2), v = Math.round(n / 2), m = [
      { cx: 0, cy: 0 },
      { cx: h, cy: 0 },
      { cx: Math.round(h / 2), cy: v }
    ];
    return e.slice(0, 3).map((x, y) => {
      const C = x.nativeAspectRatio || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 1.7777777777777777), { cx: b, cy: D } = m[y], { x: k, y: f, width: d, height: S } = Gs(b, D, h, v, C);
      return {
        ...x,
        x: k,
        y: f,
        width: d,
        height: S,
        sourceWidth: x.sourceWidth || 1920,
        sourceHeight: x.sourceHeight || 1080,
        nativeAspectRatio: C,
        aspectRatio: C,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: gt[y % gt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const c = Math.round(t / 2), h = Math.round(n / 2), v = [
      { cx: 0, cy: 0 },
      { cx: c, cy: 0 },
      { cx: 0, cy: h },
      { cx: c, cy: h }
    ];
    return e.slice(0, 4).map((m, x) => {
      const y = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: C, cy: b } = v[x], { x: D, y: k, width: f, height: d } = Gs(C, b, c, h, y);
      return {
        ...m,
        x: D,
        y: k,
        width: f,
        height: d,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: x,
        rotation: 0,
        borderWidth: 2,
        borderColor: gt[x % gt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, h) => {
    const v = h % l, m = Math.floor(h / l), x = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: C, width: b, height: D } = Gs(v * i, m * a, i, a, x);
    return {
      ...c,
      x: y,
      y: C,
      width: b,
      height: D,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: x,
      aspectRatio: x,
      zIndex: h,
      rotation: 0,
      borderWidth: 2,
      borderColor: gt[h % gt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Dg({
  activeStation: e,
  timelineStations: t = [],
  allStations: n = [],
  onSelectActiveStation: r,
  onOpenSpotlight: l,
  onStationContextMenu: o,
  onDeselectStation: i = null,
  stationAutoDirectorMap: a = {},
  onToggleStationAutoDirector: c = null,
  baseEpochMs: h = 0,
  playheadMs: v = 0,
  playheadEpochMs: m = 0,
  timeMode: x = "LOCAL",
  isPlaying: y = !1,
  setIsPlaying: C,
  totalDurationMs: b,
  inPointMs: D = 0,
  outPointMs: k,
  setPlayheadMs: f,
  globalGaps: d = [],
  recordingSegments: S = {},
  playbackSpeed: E = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: N = "BurnIn",
  keystrokes: T = [],
  directorPlan: g = null,
  onOverrideDisplay: M,
  onResetOverride: O,
  compositionLayout: U = "canvas",
  onChangeCompositionLayout: A,
  isAutoDirectorEnabled: W = !0,
  onToggleAutoDirector: oe,
  onUpdateCanvasLayout: B,
  canvasLayoutTimeline: re = null,
  onUpdateCanvasLayoutTimeline: I,
  activeKfIndex: R = 0,
  setActiveKfIndex: _,
  isModalOpen: K = !1
}) {
  const F = m > 0 ? m : h + v, [te, Z] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [G, le] = u.useState(() => {
    var p;
    return ((p = t[0]) == null ? void 0 : p.id) || null;
  }), [ze, Le] = u.useState(!1), [je, X] = u.useState(null), [ie, ee] = u.useState({ index: null, position: null }), [se, be] = u.useState(!1), [z, ne] = u.useState(!1), [_e, Oe] = u.useState(!1), [me, de] = u.useState(!1), [J, pe] = u.useState(""), [he, We] = u.useState(""), He = u.useRef(null), [Fe, Ee] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_canvas_saved_presets");
      return p ? JSON.parse(p) : [];
    } catch {
      return [];
    }
  }), ot = (p) => {
    Ee(p);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(p));
    } catch {
    }
  }, [Be, It] = u.useState(!1), [Ge, Et] = u.useState(!1);
  u.useRef(null);
  const en = u.useRef(null), ut = u.useRef(null), tn = u.useRef(null), [_t, vn] = u.useState({ width: 960, height: 540 }), [Ze, Xe] = u.useState(0), [Nt, mn] = u.useState(!1);
  u.useEffect(() => {
    const p = (w) => {
      w.key === "Escape" && mn(!1);
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, []);
  const [kt, Lt] = u.useState(!1), [Zt, on] = u.useState(!1), [Ln, Cn] = u.useState(!1), [Ie, Te] = u.useState(!1), [Ke, dt] = u.useState(!1), [Ct, q] = u.useState({ vertical: null, horizontal: null }), [xe, Q] = u.useState(!0), [Ce, $e] = u.useState(!0), [Qe, qe] = u.useState(null), [Ve, it] = u.useState({ x: 0, y: 0, isInside: !1 }), wt = u.useRef(null), ct = u.useRef(null), ht = u.useRef(!1), [Ft, St] = u.useState("auto-grid"), Ot = u.useRef([]), Nn = u.useRef([]), dn = u.useRef(null), [, Bt] = u.useState(0), ls = u.useRef(null), [js, vl] = u.useState(null), rn = u.useCallback((p, w = "success", $ = "💾") => {
    ls.current && clearTimeout(ls.current), vl({ text: p, type: w, icon: $ }), ls.current = setTimeout(() => {
      vl(null), ls.current = null;
    }, 2200);
  }, []), [yt, On] = u.useState(() => {
    var $, Y, V, P, ae, Me;
    const p = (V = (Y = ($ = re == null ? void 0 : re.keyframes) == null ? void 0 : $[0]) == null ? void 0 : Y.layout) == null ? void 0 : V.width, w = (Me = (ae = (P = re == null ? void 0 : re.keyframes) == null ? void 0 : P[0]) == null ? void 0 : ae.layout) == null ? void 0 : Me.height;
    if (p && w) {
      const ge = Jn.find((we) => we.w === p && we.h === w);
      if (ge) return ge.id;
    }
    return "16:9";
  }), [Dt, Nl] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (p !== null) return p === "true";
    } catch {
    }
    return !1;
  }), Or = u.useCallback(() => {
    Nl((p) => {
      const w = !p;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(w));
      } catch {
      }
      return w;
    });
  }, []), Es = u.useMemo(() => Jn.find((p) => p.id === yt) || Jn[0], [yt]), Ae = Es.w, Se = Es.h, ps = Es.ratio, go = u.useMemo(() => {
    const p = [], w = Ae >= 3e3 ? 200 : 100, $ = w / 2, Y = w / 10;
    for (let V = 0; V <= Ae; V += Y) {
      const P = V % w === 0, ae = !P && V % $ === 0;
      p.push({ val: V, isMajor: P, isMed: ae });
    }
    return p;
  }, [Ae]), Wi = u.useMemo(() => {
    const p = [];
    for (let V = 0; V <= Se; V += 10) {
      const P = V % 100 === 0, ae = !P && V % 50 === 0;
      p.push({ val: V, isMajor: P, isMed: ae });
    }
    return p;
  }, [Se]), xo = u.useCallback((p) => {
    const w = wt.current || ut.current;
    if (!w) return;
    const $ = w.getBoundingClientRect(), Y = Gt(Math.round((p.clientX - $.left) / $.width * Ae), 0, Ae), V = Gt(Math.round((p.clientY - $.top) / $.height * Se), 0, Se);
    it({ x: Y, y: V, isInside: !0 });
  }, [Ae, Se]), zi = u.useCallback(() => {
    it((p) => ({ ...p, isInside: !1 }));
  }, []), fr = u.useCallback(() => {
    const p = tn.current;
    if (!p) return;
    const w = p.getBoundingClientRect(), Y = Math.max(320, Math.floor(w.width || 960) - 104 - 16), V = Math.max(180, Math.floor(w.height || 540) - 16);
    let P, ae;
    Dt ? (P = Y, ae = Math.round(P / ps)) : Y / V >= ps ? (ae = V, P = Math.round(ae * ps)) : (P = Y, ae = Math.round(P / ps)), vn((Me) => Me.width === P && Me.height === ae ? Me : { width: P, height: ae });
  }, [Dt, ps]);
  u.useEffect(() => {
    const p = tn.current;
    if (!p) return;
    fr();
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(() => {
      fr();
    }), w.observe(p)), window.addEventListener("resize", fr), () => {
      w && w.disconnect(), window.removeEventListener("resize", fr);
    };
  }, [fr]);
  const nn = u.useMemo(() => (t && t.length > 0 ? t : n).map((w) => {
    const $ = w.displays && w.displays.length > 0 ? w.displays : w.topology && w.topology.displays && w.topology.displays.length > 0 ? w.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: w.width || 1920, height: w.height || 1080 }], Y = $.find((ge) => ge.isPrimary) || $[0], V = Y.width || Y.Width || w.width || 1920, P = Y.height || Y.Height || w.height || 1080, ae = V && P ? V / P : 16 / 9, Me = $.length > 1;
    return {
      stationId: w.id,
      displayId: "auto",
      label: `${w.displayName || w.roleAlias || w.hostname || w.name} - ${Me ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: w.displayName || w.roleAlias || w.hostname || w.name,
      stationHostname: w.hostname || w.id,
      isPrimary: !0,
      sourceWidth: V,
      sourceHeight: P,
      nativeAspectRatio: ae,
      aspectRatio: ae,
      width: V,
      height: P
    };
  }), [t, n]), Yt = u.useMemo(() => {
    const p = t && t.length > 0 ? t : n, w = [];
    return p.forEach(($) => {
      const Y = $.displays && $.displays.length > 0 ? $.displays : $.topology && $.topology.displays && $.topology.displays.length > 0 ? $.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: $.width || 1920, height: $.height || 1080 }], V = Y.find((ge) => ge.isPrimary) || Y[0], P = V.width || V.Width || $.width || 1920, ae = V.height || V.Height || $.height || 1080, Me = P / ae;
      w.push({
        stationId: $.id,
        displayId: "auto",
        label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${Y.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: $.displayName || $.roleAlias || $.hostname || $.name,
        stationHostname: $.hostname || $.id,
        isPrimary: !0,
        sourceWidth: P,
        sourceHeight: ae,
        nativeAspectRatio: Me,
        aspectRatio: Me,
        width: P,
        height: ae
      }), Y.length > 1 && Y.forEach((ge, we) => {
        const lt = (ge.displayId || `mon-${we}`).toLowerCase(), tt = ge.displayNumber || we + 1, nt = ge.displayName || `Screen ${tt}`, ye = ge.width || ge.Width || $.width || 1920, st = ge.height || ge.Height || $.height || 1080, Tt = ye / st;
        w.push({
          stationId: $.id,
          displayId: lt,
          label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${nt}`,
          stationName: $.displayName || $.roleAlias || $.hostname || $.name,
          stationHostname: $.hostname || $.id,
          isPrimary: !!ge.isPrimary,
          sourceWidth: ye,
          sourceHeight: st,
          nativeAspectRatio: Tt,
          aspectRatio: Tt,
          width: ye,
          height: st
        });
      });
    }), w;
  }, [t, n]), [hn, an] = u.useState(() => {
    var p;
    if (((p = re == null ? void 0 : re.keyframes) == null ? void 0 : p.length) > 0) {
      const w = JSON.parse(JSON.stringify(re));
      if (t && t.length > 0) {
        const $ = new Set(t.map((V) => V.id));
        if (w.keyframes.forEach((V) => {
          var P, ae;
          ((ae = (P = V.layout) == null ? void 0 : P.placements) == null ? void 0 : ae.length) > 0 && (V.layout.placements = V.layout.placements.filter((Me) => $.has(Me.stationId)));
        }), w.keyframes.some((V) => {
          var P, ae;
          return ((ae = (P = V.layout) == null ? void 0 : P.placements) == null ? void 0 : ae.length) > 0;
        })) return w;
      } else
        return w;
    }
    return {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: h,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          layout: {
            width: Ec,
            height: Cc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: zs(nn, Ec, Cc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var p;
    if (((p = re == null ? void 0 : re.keyframes) == null ? void 0 : p.length) > 0) {
      const w = JSON.parse(JSON.stringify(re));
      if (t && t.length > 0) {
        const Y = new Set(t.map((V) => V.id));
        w.keyframes.forEach((V) => {
          var P, ae;
          ((ae = (P = V.layout) == null ? void 0 : P.placements) == null ? void 0 : ae.length) > 0 && (V.layout.placements = V.layout.placements.filter((Me) => Y.has(Me.stationId)));
        });
      }
      an(w), w.keyframes.some((Y) => {
        var V, P;
        return ((P = (V = Y.layout) == null ? void 0 : V.placements) == null ? void 0 : P.length) > 0;
      }) && (ht.current = !0, St("custom"));
    }
  }, [re, t]);
  const L = hn.keyframes || [], ue = u.useMemo(() => Ig(L, F), [L, F]), ce = Gt(
    R ?? ue,
    0,
    Math.max(0, L.length - 1)
  ), Ne = L[ce] || L[ue] || L[0], H = u.useMemo(() => {
    var p;
    return ((p = Ne == null ? void 0 : Ne.layout) == null ? void 0 : p.placements) || [];
  }, [Ne]), ke = u.useCallback((p = "Action") => ({
    label: p,
    timeline: JSON.parse(JSON.stringify(hn)),
    aspectId: yt,
    presetId: Ft,
    selectedFeedIndex: Ze
  }), [hn, yt, Ft, Ze]), Re = u.useCallback((p = "Action") => {
    const w = ke(p);
    Ot.current.push(w), Ot.current.length > 50 && Ot.current.shift(), Nn.current = [], Bt(($) => $ + 1);
  }, [ke]), Pe = u.useCallback(() => {
    dn.current && (Ot.current.push(dn.current), Ot.current.length > 50 && Ot.current.shift(), Nn.current = [], dn.current = null, Bt((p) => p + 1));
  }, []), Je = u.useCallback(() => {
    const p = m > 0 ? m : h + v, w = 500;
    if (p <= h + w) return ce;
    const $ = (Ne == null ? void 0 : Ne.layout) || {
      width: Ae,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: H
    }, { nextTimeline: Y, newIndex: V, isNew: P } = Wd(hn, p, $, w);
    return P && (an(Y), I && I(Y), _ && _(V), rn(
      `Keyframe #${V + 1} created at ${vt(p, x, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), V;
  }, [m, h, v, ce, Ne, Ae, Se, H, hn, I, _, x, rn]), fe = u.useCallback((p, w = null) => {
    w && Re(w);
    const $ = m > 0 ? m : h + v;
    an((Y) => {
      const { nextTimeline: V, newIndex: P, isNewKeyframe: ae } = Ag({
        prevTimeline: Y,
        newPlacements: p,
        currentEpochMs: $,
        baseEpochMs: h,
        toleranceMs: 500,
        virtualW: Ae,
        virtualH: Se,
        fps: 30
      });
      return I && I(V), _ && _(P), ae && P > 0 && rn(
        `Keyframe #${P + 1} created at ${vt($, x, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), V;
    });
  }, [m, h, v, Ae, Se, I, _, x, rn, Re]);
  u.useEffect(() => {
    if (nn.length > 0 && (!H || H.length === 0) && !ht.current) {
      let p = yt;
      nn.length === 2 && yt === "16:9" && (p = "32:9", On("32:9"));
      const w = Jn.find((Y) => Y.id === p) || Jn[0], $ = zs(nn, w.w, w.h);
      $.length > 0 && (fe($), St("auto-grid"));
    }
  }, [nn, H, fe, yt]);
  const Ye = u.useRef("");
  u.useEffect(() => {
    const p = (t || []).map((w) => w.id).sort().join(",");
    if (Ye.current === "") {
      Ye.current = p;
      return;
    }
    if (Ye.current !== p && (Ye.current = p, t && t.length > 0)) {
      const w = new Set(t.map(($) => $.id));
      if (Ft === "auto-grid" || !ht.current) {
        let $ = yt;
        nn.length === 2 && yt === "16:9" && ($ = "32:9", On("32:9"));
        const Y = Jn.find((P) => P.id === $) || Jn[0], V = zs(nn, Y.w, Y.h);
        V.length > 0 && fe(V);
      } else if (H && H.length > 0) {
        const $ = H.filter((Y) => w.has(Y.stationId));
        if ($.length !== H.length)
          if ($.length === 0) {
            const Y = zs(nn, Ae, Se);
            fe(Y);
          } else
            fe($);
      }
    }
  }, [t, nn, Ft, yt, H, fe, Ae, Se]), u.useEffect(() => {
    B && B({
      width: Ae,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: H,
      timeline: hn
    });
  }, [H, hn, B, Ae, Se]);
  const bt = u.useCallback((p) => {
    const w = Es, $ = Jn.find((Y) => Y.id === p) || Jn[0];
    if (w.id !== $.id)
      if (On($.id), ht.current) {
        const Y = $.w / w.w, V = $.h / w.h, P = H.map((ae) => ({
          ...ae,
          x: Math.round(ae.x * Y),
          y: Math.round(ae.y * V),
          width: Math.round(ae.width * Y),
          height: Math.round(ae.height * V)
        }));
        fe(P);
      } else {
        const Y = nn.length > 0 ? nn : H && H.length > 0 ? H : Yt, V = zs(Y, $.w, $.h);
        fe(V);
      }
  }, [Es, H, Yt, fe]), ft = u.useCallback((p) => {
    const w = H.length > 0 ? Math.max(...H.map((ge) => ge.zIndex || 0)) + 1 : 0, $ = gt[H.length % gt.length], Y = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 16 / 9), V = Y >= 1 ? 640 : Math.round(360 * Y), P = Y >= 1 ? Math.round(640 / Y) : 360, ae = {
      stationId: p.stationId,
      displayId: p.displayId,
      label: p.label,
      x: 100 + H.length * 40 % 800,
      y: 80 + H.length * 40 % 500,
      width: V,
      height: P,
      sourceWidth: p.sourceWidth || 1920,
      sourceHeight: p.sourceHeight || 1080,
      nativeAspectRatio: Y,
      aspectRatio: Y,
      zIndex: w,
      rotation: 0,
      borderWidth: 2,
      borderColor: $,
      shadowEffect: "deep",
      borderRadius: 0
    }, Me = [...H, ae];
    fe(Me), Xe(Me.length - 1);
  }, [H, fe]), $t = u.useCallback((p) => {
    const w = H.filter(($, Y) => Y !== p);
    fe(w), Xe(($) => Math.max(0, $ - 1));
  }, [H, fe]), ms = u.useCallback(() => {
    fe([]), Xe(-1);
  }, [fe]), Kt = (p) => {
    const w = p.map((Y, V) => ({ p: Y, origIdx: V }));
    w.sort((Y, V) => (Y.p.zIndex ?? Y.origIdx) - (V.p.zIndex ?? V.origIdx));
    const $ = [...p];
    return w.forEach(({ origIdx: Y }, V) => {
      $[Y] = { ...$[Y], zIndex: V + 1 };
    }), $;
  };
  u.useCallback((p = Ze) => {
    if (p < 0 || !H[p]) return;
    const w = Kt(H), $ = w[p].zIndex, Y = w.length;
    if ($ >= Y) return;
    const V = w.map((P, ae) => ae === p ? { ...P, zIndex: Y } : P.zIndex > $ ? { ...P, zIndex: P.zIndex - 1 } : P);
    fe(V);
  }, [Ze, H, fe]), u.useCallback((p = Ze) => {
    if (p < 0 || !H[p]) return;
    const w = Kt(H), $ = w[p].zIndex;
    if ($ <= 1) return;
    const Y = w.map((V, P) => P === p ? { ...V, zIndex: 1 } : V.zIndex < $ ? { ...V, zIndex: V.zIndex + 1 } : V);
    fe(Y);
  }, [Ze, H, fe]);
  const Sn = u.useCallback((p = Ze) => {
    if (p < 0 || !H[p]) return;
    const w = Kt(H), $ = w[p].zIndex, Y = $ + 1;
    if (Y > w.length) return;
    const V = w.map((P, ae) => ae === p ? { ...P, zIndex: Y } : P.zIndex === Y ? { ...P, zIndex: $ } : P);
    fe(V);
  }, [Ze, H, fe]), gs = u.useCallback((p = Ze) => {
    if (p < 0 || !H[p]) return;
    const w = Kt(H), $ = w[p].zIndex, Y = $ - 1;
    if (Y < 1) return;
    const V = w.map((P, ae) => ae === p ? { ...P, zIndex: Y } : P.zIndex === Y ? { ...P, zIndex: $ } : P);
    fe(V);
  }, [Ze, H, fe]), pr = u.useCallback((p) => {
    if (Ze < 0 || !H[Ze]) return;
    const w = H.map(($, Y) => Y === Ze ? { ...$, ...p } : $);
    fe(w);
  }, [Ze, H, fe]), Hi = u.useCallback((p = 90) => {
    const w = H[Ze];
    if (!w) return;
    const Y = ((w.rotation || 0) + p) % 360;
    pr({ rotation: Y });
  }, [Ze, H, pr]), mr = u.useCallback((p = Ze) => {
    if (p < 0 || !H[p]) return;
    const w = H.length, $ = H.map((Y, V) => V === p ? {
      ...Y,
      x: 0,
      y: 0,
      width: Ae,
      height: Se,
      zIndex: w
    } : Y);
    fe($);
  }, [Ze, H, fe, Ae, Se]), _s = u.useCallback((p) => {
    let w = [];
    const $ = nn.length > 0 ? nn : Yt.length > 0 ? Yt : H;
    switch (p) {
      case "auto":
      case "auto-grid":
        w = zs($, Ae, Se);
        break;
      case "1x1":
        $.length > 0 && (w = [{
          ...$[0],
          x: 0,
          y: 0,
          width: Ae,
          height: Se,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: gt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if ($.length >= 2) {
          const Y = Math.round(Ae / 2);
          w = $.slice(0, 2).map((V, P) => {
            const ae = V.nativeAspectRatio || (V.sourceWidth && V.sourceHeight ? V.sourceWidth / V.sourceHeight : 1.7777777777777777), { x: Me, y: ge, width: we, height: lt } = Gs(P * Y, 0, Y, Se, ae);
            return {
              ...V,
              x: Me,
              y: ge,
              width: we,
              height: lt,
              sourceWidth: V.sourceWidth || 1920,
              sourceHeight: V.sourceHeight || 1080,
              nativeAspectRatio: ae,
              aspectRatio: ae,
              zIndex: P + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: gt[P % gt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          w = zs($, Ae, Se);
        break;
      case "2x2": {
        const Y = Math.round(Ae / 2), V = Math.round(Se / 2);
        w = $.slice(0, 4).map((P, ae) => ({
          ...P,
          x: ae % 2 * Y,
          y: Math.floor(ae / 2) * V,
          width: Y,
          height: V,
          zIndex: ae,
          rotation: 0,
          borderWidth: 2,
          borderColor: gt[ae % gt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if ($.length >= 2) {
          w = [
            { ...$[0], x: 0, y: 0, width: Ae, height: Se, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: gt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Y = $.slice(1, 4), V = Math.round(Ae * 0.23), P = Math.round(V / (16 / 9));
          Y.forEach((ae, Me) => {
            w.push({
              ...ae,
              x: Ae - V - 24,
              y: 24 + Me * (P + 16),
              width: V,
              height: P,
              zIndex: 10 + Me,
              rotation: 0,
              borderWidth: 3,
              borderColor: gt[(Me + 1) % gt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if ($.length >= 3) {
          const Y = Math.round(Ae * 0.666), V = Ae - Y, P = Math.round(Se / 2);
          w = [
            { ...$[0], x: 0, y: 0, width: Y, height: Se, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: gt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...$[1], x: Y, y: 0, width: V, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: gt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...$[2], x: Y, y: P, width: V, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: gt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if ($.length >= 3)
          if (Ae / Se >= 2.5) {
            const V = Math.round(Ae / 3);
            w = $.slice(0, 3).map((P, ae) => {
              const Me = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 1.7777777777777777), { x: ge, y: we, width: lt, height: tt } = Gs(ae * V, 0, V, Se, Me);
              return {
                ...P,
                x: ge,
                y: we,
                width: lt,
                height: tt,
                sourceWidth: P.sourceWidth || 1920,
                sourceHeight: P.sourceHeight || 1080,
                nativeAspectRatio: Me,
                aspectRatio: Me,
                zIndex: ae,
                rotation: 0,
                borderWidth: 2,
                borderColor: gt[ae % gt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const V = Math.round(Ae / 2), P = Math.round(Se / 2);
            w = [
              { ...$[0], x: 0, y: 0, width: V, height: P, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: gt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...$[1], x: V, y: 0, width: V, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: gt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...$[2], x: Math.round(V / 2), y: P, width: V, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: gt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    w.length > 0 && (fe(w), Xe(0), p === "auto" || p === "auto-grid" ? St("auto-grid") : (St(p), ht.current = !0));
  }, [Yt, H, fe, Ae, Se]), wu = u.useCallback(() => {
    const p = J.trim() || `Custom Layout ${Fe.length + 1}`, $ = [{
      id: `preset-${Date.now()}`,
      name: p,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(H)),
      keyframes: JSON.parse(JSON.stringify(L))
    }, ...Fe];
    ot($), pe(""), be(!1);
  }, [J, Fe, H, L]), Mp = u.useCallback((p) => {
    !p || !p.placements || (fe(p.placements), Xe(0), St("custom"), ht.current = !0, ne(!1));
  }, [fe]), Ip = u.useCallback((p, w) => {
    w == null || w.stopPropagation();
    const $ = Fe.filter((Y) => Y.id !== p);
    ot($);
  }, [Fe]), Tp = u.useCallback(() => {
    const p = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Ae,
      height: Se,
      aspectRatio: yt,
      placements: H,
      timeline: hn
    }, w = JSON.stringify(p, null, 2), $ = new window.Blob([w], { type: "application/json" }), Y = window.URL.createObjectURL($), V = document.createElement("a"), P = /* @__PURE__ */ new Date(), ae = (ge) => String(ge).padStart(2, "0"), Me = `${P.getFullYear()}${ae(P.getMonth() + 1)}${ae(P.getDate())}_${ae(P.getHours())}${ae(P.getMinutes())}${ae(P.getSeconds())}`;
    V.href = Y, V.download = `canvas_layout_${Me}.json`, document.body.appendChild(V), V.click(), document.body.removeChild(V), window.URL.revokeObjectURL(Y);
  }, [H, hn, Ae, Se, yt]), Ap = u.useCallback((p) => {
    var Y;
    const w = (Y = p.target.files) == null ? void 0 : Y[0];
    if (!w) return;
    const $ = new window.FileReader();
    $.onload = (V) => {
      var P, ae, Me;
      try {
        const ge = JSON.parse(V.target.result);
        if (ge.width && ge.height) {
          const lt = Jn.find((tt) => tt.w === ge.width && tt.h === ge.height);
          lt && On(lt.id);
        } else if (ge.aspectRatio) {
          const lt = Jn.find((tt) => tt.id === ge.aspectRatio);
          lt && On(lt.id);
        }
        let we = null;
        Array.isArray(ge) ? we = ge : ge.placements && Array.isArray(ge.placements) ? we = ge.placements : (P = ge.layout) != null && P.placements && Array.isArray(ge.layout.placements) && (we = ge.layout.placements), we && we.length > 0 && (fe(we), Xe(0), St("custom"), ht.current = !0), ((Me = (ae = ge.timeline) == null ? void 0 : ae.keyframes) == null ? void 0 : Me.length) > 0 && (an(ge.timeline), I && I(ge.timeline));
      } catch (ge) {
        console.error("Failed to parse imported canvas JSON:", ge), alert(`Canvas Import Error: ${ge.message}`);
      }
    }, $.readAsText(w), p.target.value = "";
  }, [fe, I]), Ki = (p, w) => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), Xe(w), ht.current = !0, St("custom");
    const $ = Je(), Y = wt.current || ut.current;
    if (!Y) return;
    const V = Y.getBoundingClientRect(), P = H[w];
    if (!P) return;
    dn.current = ke("Move Feed"), ct.current = {
      mode: "drag",
      index: w,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      scaleX: Ae / V.width,
      scaleY: Se / V.height,
      activeSnapZone: null
    }, Te(!0);
    const ae = (ge) => {
      if (!ct.current || ct.current.mode !== "drag") return;
      const we = ct.current, lt = wt.current || ut.current;
      if (!lt) return;
      const tt = lt.getBoundingClientRect(), nt = (ge.clientX - we.startX) * we.scaleX, ye = (ge.clientY - we.startY) * we.scaleY;
      let st = Math.round(we.initialX + nt), Tt = Math.round(we.initialY + ye);
      st = Gt(st, 0, Ae - we.initialW), Tt = Gt(Tt, 0, Se - we.initialH);
      const pt = Ce && !ge.altKey;
      let mt = null, bn = null, zn = null;
      if (pt) {
        const Pt = ge.clientX - tt.left, Mt = ge.clientY - tt.top, At = 32, De = Math.round(Ae / 2), at = Math.round(Se / 2);
        if (Pt <= At ? Mt <= tt.height * 0.22 ? mt = { x: 0, y: 0, width: De, height: at, label: "◰ Top-Left Quarter" } : Mt >= tt.height * 0.78 ? mt = { x: 0, y: at, width: De, height: at, label: "◱ Bottom-Left Quarter" } : mt = { x: 0, y: 0, width: De, height: Se, label: "◧ Left Half (50%)" } : Pt >= tt.width - At ? Mt <= tt.height * 0.22 ? mt = { x: De, y: 0, width: De, height: at, label: "◲ Top-Right Quarter" } : Mt >= tt.height * 0.78 ? mt = { x: De, y: at, width: De, height: at, label: "◳ Bottom-Right Quarter" } : mt = { x: De, y: 0, width: De, height: Se, label: "◨ Right Half (50%)" } : Mt <= At && Pt >= tt.width * 0.25 && Pt <= tt.width * 0.75 && (mt = { x: 0, y: 0, width: Ae, height: Se, label: "🗖 Full Canvas Maximize" }), !mt) {
          const gr = H.filter((et, xr) => xr !== we.index), Us = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Ae, targetX: Ae - we.initialW, guide: 100 },
            { snapTo: De, targetX: De - Math.round(we.initialW / 2), guide: 50 }
          ];
          gr.forEach((et) => {
            Us.push({ snapTo: et.x, targetX: et.x, guide: et.x / Ae * 100 }), Us.push({ snapTo: et.x + et.width, targetX: et.x + et.width - we.initialW, guide: (et.x + et.width) / Ae * 100 }), Us.push({ snapTo: et.x + et.width, targetX: et.x + et.width, guide: (et.x + et.width) / Ae * 100 }), Us.push({ snapTo: et.x, targetX: et.x - we.initialW, guide: et.x / Ae * 100 });
          });
          let bu = 18;
          Us.forEach((et) => {
            const xr = Math.abs(st - et.targetX);
            xr < bu && (bu = xr, st = et.targetX, bn = et.guide);
          });
          const kl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Se, targetY: Se - we.initialH, guide: 100 },
            { snapTo: at, targetY: at - Math.round(we.initialH / 2), guide: 50 }
          ];
          gr.forEach((et) => {
            kl.push({ snapTo: et.y, targetY: et.y, guide: et.y / Se * 100 }), kl.push({ snapTo: et.y + et.height, targetY: et.y + et.height - we.initialH, guide: (et.y + et.height) / Se * 100 }), kl.push({ snapTo: et.y + et.height, targetY: et.y + et.height, guide: (et.y + et.height) / Se * 100 }), kl.push({ snapTo: et.y, targetY: et.y - we.initialH, guide: et.y / Se * 100 });
          });
          let Mu = 18;
          kl.forEach((et) => {
            const xr = Math.abs(Tt - et.targetY);
            xr < Mu && (Mu = xr, Tt = et.targetY, zn = et.guide);
          });
        }
      }
      we.activeSnapZone = mt, we.latestX = st, we.latestY = Tt, qe(mt), q({ vertical: bn, horizontal: zn }), an((Pt) => {
        const Mt = [...Pt.keyframes || []], At = $ < Mt.length ? $ : ce;
        if (!Mt[At]) return Pt;
        const De = [...Mt[At].layout.placements || []];
        return De[we.index] ? (De[we.index] = { ...De[we.index], x: st, y: Tt }, Mt[At] = {
          ...Mt[At],
          layout: { ...Mt[At].layout, placements: De }
        }, { ...Pt, keyframes: Mt }) : Pt;
      });
    }, Me = () => {
      var ge;
      if (Te(!1), q({ vertical: null, horizontal: null }), (ge = ct.current) != null && ge.activeSnapZone) {
        const we = ct.current.activeSnapZone, lt = ct.current.index;
        an((tt) => {
          const nt = [...tt.keyframes || []], ye = $ < nt.length ? $ : ce;
          if (!nt[ye]) return tt;
          const st = [...nt[ye].layout.placements || []];
          return st[lt] ? (st[lt] = {
            ...st[lt],
            x: we.x,
            y: we.y,
            width: we.width,
            height: we.height
          }, nt[ye] = {
            ...nt[ye],
            layout: { ...nt[ye].layout, placements: st }
          }, { ...tt, keyframes: nt }) : tt;
        });
      }
      if (ct.current) {
        const we = ct.current, lt = we.initialX, tt = we.initialY, nt = we.activeSnapZone ? we.activeSnapZone.x : we.latestX ?? lt, ye = we.activeSnapZone ? we.activeSnapZone.y : we.latestY ?? tt;
        nt !== lt || ye !== tt ? (Pe(), I && an((st) => (I(st), st))) : dn.current = null;
      }
      qe(null), ct.current = null, window.removeEventListener("mousemove", ae), window.removeEventListener("mouseup", Me);
    };
    window.addEventListener("mousemove", ae), window.addEventListener("mouseup", Me);
  }, yo = (p, w, $ = "br") => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), Xe(w), ht.current = !0, St("custom");
    const Y = Je();
    if (!ut.current) return;
    const V = ut.current.getBoundingClientRect(), P = H[w];
    if (!P) return;
    dn.current = ke("Resize Feed");
    const ae = Yt.find((nt) => nt.stationId === P.stationId && nt.displayId === P.displayId), Me = P.sourceWidth || (ae == null ? void 0 : ae.sourceWidth) || 1920, ge = P.sourceHeight || (ae == null ? void 0 : ae.sourceHeight) || 1080, we = P.nativeAspectRatio || P.aspectRatio || (ae == null ? void 0 : ae.nativeAspectRatio) || Me / ge || P.width / P.height || 16 / 9;
    ct.current = {
      mode: "resize",
      corner: $,
      index: w,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      sourceWidth: Me,
      sourceHeight: ge,
      nativeAspectRatio: we,
      scaleX: Ae / V.width,
      scaleY: Se / V.height
    }, dt(!0);
    const lt = (nt) => {
      if (!ct.current || ct.current.mode !== "resize") return;
      const ye = ct.current, st = (nt.clientX - ye.startX) * ye.scaleX, Tt = (nt.clientY - ye.startY) * ye.scaleY, pt = nt.ctrlKey || nt.shiftKey || nt.metaKey, mt = ye.nativeAspectRatio > 0 ? ye.nativeAspectRatio : ye.initialW / ye.initialH;
      let bn = ye.initialX, zn = ye.initialY, Pt = ye.initialW, Mt = ye.initialH;
      if (ye.corner === "br") {
        const At = Ae - ye.initialX, De = Se - ye.initialY;
        if (pt) {
          let at = Math.max(160, Math.min(At, Math.round(ye.initialW + st))), rt = Math.round(at / mt);
          rt > De && (rt = De, at = Math.round(rt * mt)), rt < 90 && (rt = 90, at = Math.round(rt * mt)), Pt = at, Mt = rt;
        } else
          Pt = Gt(Math.round(ye.initialW + st), 160, At), Mt = Gt(Math.round(ye.initialH + Tt), 90, De);
      } else if (ye.corner === "bl") {
        const At = ye.initialX + ye.initialW, De = Se - ye.initialY;
        if (pt) {
          let at = Math.max(160, Math.min(At, Math.round(ye.initialW - st))), rt = Math.round(at / mt);
          rt > De && (rt = De, at = Math.round(rt * mt)), rt < 90 && (rt = 90, at = Math.round(rt * mt)), Pt = at, Mt = rt, bn = ye.initialX + ye.initialW - Pt;
        } else
          Pt = Gt(Math.round(ye.initialW - st), 160, At), Mt = Gt(Math.round(ye.initialH + Tt), 90, De), bn = ye.initialX + ye.initialW - Pt;
      } else if (ye.corner === "tr") {
        const At = Ae - ye.initialX, De = ye.initialY + ye.initialH;
        if (pt) {
          let at = Math.max(160, Math.min(At, Math.round(ye.initialW + st))), rt = Math.round(at / mt);
          rt > De && (rt = De, at = Math.round(rt * mt)), rt < 90 && (rt = 90, at = Math.round(rt * mt)), Pt = at, Mt = rt, zn = ye.initialY + ye.initialH - Mt;
        } else
          Pt = Gt(Math.round(ye.initialW + st), 160, At), Mt = Gt(Math.round(ye.initialH - Tt), 90, De), zn = ye.initialY + ye.initialH - Mt;
      } else if (ye.corner === "tl") {
        const At = ye.initialX + ye.initialW, De = ye.initialY + ye.initialH;
        if (pt) {
          let at = Math.max(160, Math.min(At, Math.round(ye.initialW - st))), rt = Math.round(at / mt);
          rt > De && (rt = De, at = Math.round(rt * mt)), rt < 90 && (rt = 90, at = Math.round(rt * mt)), Pt = at, Mt = rt, bn = ye.initialX + ye.initialW - Pt, zn = ye.initialY + ye.initialH - Mt;
        } else
          Pt = Gt(Math.round(ye.initialW - st), 160, At), Mt = Gt(Math.round(ye.initialH - Tt), 90, De), bn = ye.initialX + ye.initialW - Pt, zn = ye.initialY + ye.initialH - Mt;
      }
      an((At) => {
        const De = [...At.keyframes || []], at = Y < De.length ? Y : ce;
        if (!De[at]) return At;
        const rt = [...De[at].layout.placements || []];
        return rt[ye.index] ? (rt[ye.index] = {
          ...rt[ye.index],
          x: bn,
          y: zn,
          width: Pt,
          height: Mt,
          sourceWidth: ye.sourceWidth,
          sourceHeight: ye.sourceHeight,
          nativeAspectRatio: ye.nativeAspectRatio,
          aspectRatio: ye.nativeAspectRatio
        }, De[at] = {
          ...De[at],
          layout: { ...De[at].layout, placements: rt }
        }, { ...At, keyframes: De }) : At;
      });
    }, tt = () => {
      if (ct.current) {
        const nt = ct.current, ye = nt.latestW ?? nt.initialW, st = nt.latestH ?? nt.initialH;
        ye !== nt.initialW || st !== nt.initialH ? (Pe(), I && an((Tt) => (I(Tt), Tt))) : dn.current = null;
      }
      dt(!1), ct.current = null, window.removeEventListener("mousemove", lt), window.removeEventListener("mouseup", tt);
    };
    window.addEventListener("mousemove", lt), window.addEventListener("mouseup", tt);
  }, Rp = u.useCallback((p) => {
    const w = H[p];
    if (!w) return;
    const $ = Yt.find((Me) => Me.stationId === w.stationId && Me.displayId === w.displayId), Y = w.nativeAspectRatio || w.aspectRatio || ($ == null ? void 0 : $.nativeAspectRatio) || (w.sourceWidth && w.sourceHeight ? w.sourceWidth / w.sourceHeight : 16 / 9);
    let V = w.width, P = Math.round(V / Y);
    w.y + P > Se && (P = Se - w.y, V = Math.round(P * Y)), w.x + V > Ae && (V = Ae - w.x, P = Math.round(V / Y));
    const ae = H.map((Me, ge) => ge === p ? {
      ...Me,
      width: Math.max(160, V),
      height: Math.max(90, P),
      sourceWidth: w.sourceWidth || ($ == null ? void 0 : $.sourceWidth) || 1920,
      sourceHeight: w.sourceHeight || ($ == null ? void 0 : $.sourceHeight) || 1080,
      nativeAspectRatio: Y,
      aspectRatio: Y
    } : Me);
    fe(ae, "Snap Native Aspect");
  }, [H, Yt, fe]), Vi = u.useCallback(() => {
    if (Ot.current.length === 0) return;
    const p = ke("Redo State");
    Nn.current.push(p), Nn.current.length > 50 && Nn.current.shift();
    const w = Ot.current.pop();
    w && (an(w.timeline), I && I(w.timeline), w.aspectId && w.aspectId !== yt && On(w.aspectId), w.presetId && St(w.presetId), w.selectedFeedIndex !== void 0 && Xe(w.selectedFeedIndex), ht.current = !0, Bt(($) => $ + 1), rn(`Undo: ${w.label || "Previous State"}`, "undo", "↺"));
  }, [ke, I, yt, rn]), Yi = u.useCallback(() => {
    if (Nn.current.length === 0) return;
    const p = ke("Undo State");
    Ot.current.push(p), Ot.current.length > 50 && Ot.current.shift();
    const w = Nn.current.pop();
    w && (an(w.timeline), I && I(w.timeline), w.aspectId && w.aspectId !== yt && On(w.aspectId), w.presetId && St(w.presetId), w.selectedFeedIndex !== void 0 && Xe(w.selectedFeedIndex), ht.current = !0, Bt(($) => $ + 1), rn(`Redo: ${w.label || "Restored State"}`, "info", "↻"));
  }, [ke, I, yt, rn]), ju = u.useCallback(() => {
    const w = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(H)),
      keyframes: JSON.parse(JSON.stringify(L)),
      aspectId: yt,
      width: Ae,
      height: Se
    }, ...Fe.filter(($) => $.id !== "preset-quicksave")];
    ot(w);
    try {
      mp({
        canvasLayoutTimeline: hn,
        selectedAspectId: yt,
        selectedPresetId: Ft,
        isFullWidth: Dt
      });
    } catch ($) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", $);
    }
    rn(`State Saved (${Ae}×${Se} • ${H.length} Feeds)`, "success", "💾");
  }, [H, L, yt, Ae, Se, Fe, ot, hn, Ft, Dt, rn]);
  u.useEffect(() => {
    const p = () => Vi(), w = () => Yi(), $ = () => ju();
    return window.addEventListener("itb:studio-undo", p), window.addEventListener("itb:studio-redo", w), window.addEventListener("itb:studio-save-now", $), () => {
      window.removeEventListener("itb:studio-undo", p), window.removeEventListener("itb:studio-redo", w), window.removeEventListener("itb:studio-save-now", $);
    };
  }, [Vi, Yi, ju]);
  const $p = u.useCallback(() => {
    It((p) => {
      const w = !p;
      if (w) {
        r && r(null);
        const $ = en.current;
        $ && $.requestFullscreen && $.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return w;
    });
  }, [r]), Lp = u.useCallback(() => {
    const p = m > 0 ? m : h + v, { nextTimeline: w, newIndex: $, isNew: Y } = Wd(
      hn,
      p,
      (Ne == null ? void 0 : Ne.layout) || {
        width: Ae,
        height: Se,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(H))
      }
    );
    Y ? (Re("Add Keyframe"), an(w), I && I(w), _ && _($), rn(`Keyframe #${$ + 1} created at ${vt(p, x, { includeSeconds: !0 })}`, "success", "💎")) : (_ && _($), rn(`Jumped to existing Keyframe #${$ + 1}`, "info", "💎"));
  }, [m, h, v, Ne, H, Ae, Se, hn, I, _, x, rn, Re]);
  u.useCallback(() => {
    if (L.length <= 1 || ce === 0) {
      rn("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Re("Delete Keyframe");
    const { nextTimeline: p, success: w, newIndex: $ } = Rg(hn, ce);
    w && (an(p), I && I(p), _ && _($), rn("Keyframe deleted", "info", "🗑️"));
  }, [L, ce, hn, I, _, rn, Re]), u.useCallback((p) => {
    ce !== 0 && (Re("Update Transition Type"), an((w) => {
      const $ = jc(w, ce, { transitionType: p });
      return I && I($), $;
    }));
  }, [ce, I, Re]), u.useCallback((p) => {
    ce !== 0 && (Re("Update Transition Duration"), an((w) => {
      const $ = jc(w, ce, { transitionDurationSec: p });
      return I && I($), $;
    }));
  }, [ce, I, Re]), u.useEffect(() => {
    const p = (w) => {
      if (!(w.target.tagName === "INPUT" || w.target.tagName === "TEXTAREA" || w.target.isContentEditable)) {
        if (w.key === "Delete" || w.key === "Backspace") {
          Ze >= 0 && H[Ze] && (w.preventDefault(), $t(Ze));
          return;
        }
        if ((w.code === "Space" || w.key === " ") && C) {
          w.preventDefault(), C(($) => !$);
          return;
        }
        if ((w.key === "k" || w.key === "K") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Lp();
          return;
        }
        if (w.key === "Escape") {
          Le(!1), ne(!1), on(!1), Lt(!1), Cn(!1), be(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(w.key)) {
          if (Ze >= 0 && H[Ze]) {
            w.preventDefault(), ht.current = !0, St("custom");
            const $ = w.shiftKey ? 1 : 10;
            let Y = 0, V = 0;
            w.key === "ArrowLeft" && (Y = -$), w.key === "ArrowRight" && (Y = $), w.key === "ArrowUp" && (V = -$), w.key === "ArrowDown" && (V = $);
            const P = H[Ze], ae = Gt(P.x + Y, 0, Ae - P.width), Me = Gt(P.y + V, 0, Se - P.height), ge = H.map((we, lt) => lt === Ze ? { ...we, x: ae, y: Me } : we);
            fe(ge);
          }
          return;
        }
        if ((w.key === "r" || w.key === "R") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Q(($) => !$);
          return;
        }
        if ((w.key === "s" || w.key === "S") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), $e(($) => !$);
          return;
        }
      }
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [Ze, H, $t, fe, Q, $e]);
  const Eu = u.useMemo(() => Tg({
    keyframes: L,
    currentEpochMs: F,
    currentPlacements: H,
    isEditing: Ie || Ke
  }), [Ie, Ke, L, F, H]), Op = u.useMemo(() => Eu.map((p, w) => ({ ...p, originalIndex: w })).sort((p, w) => (p.zIndex ?? p.originalIndex) - (w.zIndex ?? w.originalIndex)), [Eu]), Fs = H[Ze] || null, { filteredPlaced: Bs, filteredUnplaced: vo } = u.useMemo(() => {
    const p = (he || "").toLowerCase(), w = H.map((P, ae) => {
      const Me = P.zIndex ?? ae + 1, ge = Yt.find((we) => we.stationId === P.stationId && we.displayId === P.displayId);
      return {
        type: "placed",
        origIdx: ae,
        placement: P,
        feed: ge,
        stationId: P.stationId,
        displayId: P.displayId,
        label: P.label || (ge == null ? void 0 : ge.label) || `${P.stationId} (${P.displayId})`,
        layerRank: Me,
        isSelected: ae === Ze,
        sourceWidth: P.sourceWidth || (ge == null ? void 0 : ge.sourceWidth) || 1920,
        sourceHeight: P.sourceHeight || (ge == null ? void 0 : ge.sourceHeight) || 1080
      };
    });
    w.sort((P, ae) => ae.layerRank - P.layerRank);
    const $ = Yt.filter((P) => !H.some((ae) => ae.stationId === P.stationId && ae.displayId === P.displayId)).map((P) => ({
      type: "unplaced",
      feed: P,
      stationId: P.stationId,
      displayId: P.displayId,
      label: P.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: P.sourceWidth || 1920,
      sourceHeight: P.sourceHeight || 1080
    })), Y = p ? w.filter((P) => P.label.toLowerCase().includes(p)) : w, V = p ? $.filter((P) => P.label.toLowerCase().includes(p)) : $;
    return { filteredPlaced: Y, filteredUnplaced: V };
  }, [H, Yt, Ze, he]), Cu = u.useCallback((p, w) => {
    p.stopPropagation(), X(w), p.dataTransfer.effectAllowed = "copyMove", p.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: w.origIdx,
      type: w.type,
      stationId: w.stationId,
      displayId: w.displayId
    }));
  }, []), Dp = u.useCallback((p, w) => {
    p.preventDefault(), p.stopPropagation(), p.dataTransfer.dropEffect = "move";
    const $ = p.currentTarget.getBoundingClientRect(), Y = $.top + $.height / 2, V = p.clientY < Y ? "above" : "below";
    ee((P) => P.index === w && P.position === V ? P : { index: w, position: V });
  }, []), Pp = u.useCallback((p, w) => {
    p.stopPropagation(), ee(($) => $.index === w ? { index: null, position: null } : $);
  }, []), Su = u.useCallback(() => {
    X(null), ee({ index: null, position: null });
  }, []), _p = u.useCallback((p, w) => {
    p.preventDefault(), p.stopPropagation();
    const $ = ie;
    ee({ index: null, position: null }), X(null);
    const Y = p.dataTransfer.getData("text/plain");
    if (Y)
      try {
        const V = JSON.parse(Y);
        if (V.type === "placed") {
          const P = V.origIdx, ae = Bs.findIndex((nt) => nt.origIdx === P);
          if (ae === -1) return;
          let Me = w;
          if ($.position === "below" && (Me += 1), ae < Me && (Me -= 1), ae === Me) return;
          const ge = [...Bs], [we] = ge.splice(ae, 1);
          ge.splice(Me, 0, we);
          const lt = ge.length, tt = H.map((nt, ye) => {
            const st = ge.findIndex((Tt) => Tt.origIdx === ye);
            return st !== -1 ? {
              ...nt,
              zIndex: lt - st
            } : nt;
          });
          fe(tt), Xe(we.origIdx);
        } else if (V.type === "unplaced") {
          const P = Yt.find((mt) => mt.stationId === V.stationId && mt.displayId === V.displayId);
          if (!P) return;
          const ae = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 16 / 9), Me = ae >= 1 ? 640 : Math.round(360 * ae), ge = ae >= 1 ? Math.round(640 / ae) : 360, we = gt[H.length % gt.length];
          let lt = w;
          $.position === "below" && (lt += 1);
          const tt = {
            stationId: P.stationId,
            displayId: P.displayId,
            label: P.label,
            x: 100 + H.length * 40 % 800,
            y: 80 + H.length * 40 % 500,
            width: Me,
            height: ge,
            sourceWidth: P.sourceWidth || 1920,
            sourceHeight: P.sourceHeight || 1080,
            nativeAspectRatio: ae,
            aspectRatio: ae,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: we,
            shadowEffect: "deep",
            borderRadius: 0
          }, nt = [...H, tt], ye = nt.length - 1, st = [...Bs];
          st.splice(lt, 0, { origIdx: ye });
          const Tt = st.length, pt = nt.map((mt, bn) => {
            const zn = st.findIndex((Pt) => Pt.origIdx === bn);
            return {
              ...mt,
              zIndex: zn !== -1 ? Tt - zn : 1
            };
          });
          fe(pt), Xe(ye);
        }
      } catch (V) {
        console.warn("Failed to handle layer drag drop:", V);
      }
  }, [ie, Bs, H, Yt, fe]), Fp = u.useCallback((p) => {
    p.preventDefault();
    const w = p.dataTransfer.getData("text/plain");
    if (!(!w || !ut.current))
      try {
        const $ = JSON.parse(w), Y = ut.current.getBoundingClientRect(), V = p.clientX - Y.left, P = p.clientY - Y.top, ae = Gt(Math.round(V / Y.width * Ae), 0, Ae - 320), Me = Gt(Math.round(P / Y.height * Se), 0, Se - 180);
        if ($.type === "unplaced") {
          const ge = Yt.find((we) => we.stationId === $.stationId && we.displayId === $.displayId);
          if (ge) {
            const we = ge.nativeAspectRatio || (ge.sourceWidth && ge.sourceHeight ? ge.sourceWidth / ge.sourceHeight : 1.7777777777777777), lt = we >= 1 ? 640 : Math.round(360 * we), tt = we >= 1 ? Math.round(640 / we) : 360, nt = H.length > 0 ? Math.max(...H.map((pt) => pt.zIndex || 0)) + 1 : 1, ye = gt[H.length % gt.length], st = {
              stationId: ge.stationId,
              displayId: ge.displayId,
              label: ge.label,
              x: Gt(ae, 0, Ae - lt),
              y: Gt(Me, 0, Se - tt),
              width: lt,
              height: tt,
              sourceWidth: ge.sourceWidth || 1920,
              sourceHeight: ge.sourceHeight || 1080,
              nativeAspectRatio: we,
              aspectRatio: we,
              zIndex: nt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ye,
              shadowEffect: "deep",
              borderRadius: 0
            }, Tt = [...H, st];
            fe(Tt), Xe(Tt.length - 1);
          }
        } else if ($.type === "placed" && $.origIdx !== void 0) {
          const ge = H.map((we, lt) => lt === $.origIdx ? {
            ...we,
            x: Gt(ae, 0, Ae - we.width),
            y: Gt(Me, 0, Se - we.height)
          } : we);
          fe(ge), Xe($.origIdx);
        }
      } catch ($) {
        console.warn("Canvas drop failed:", $);
      }
  }, [Yt, H, fe, Ae, Se]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: en,
      className: `multicam-viewport-root canvas-grid ${Be ? "fullscreen-grid-active" : ""}`,
      children: [
        (Ie || Ke) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: Ie ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        js && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${js.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: js.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: js.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: tn, className: `canvas-stage-wrapper ${Dt ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          ze && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  H.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Le(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: he,
                onChange: (p) => We(p.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Bs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Bs.length })
                ] }),
                Bs.map((p, w) => {
                  const $ = je && je.type === "placed" && je.origIdx === p.origIdx, V = ie.index === w ? ie.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${p.isSelected ? "is-selected" : ""} ${$ ? "is-dragging-row" : ""} ${V}`,
                      draggable: !0,
                      onDragStart: (P) => Cu(P, p),
                      onDragOver: (P) => Dp(P, w),
                      onDragLeave: (P) => Pp(P, w),
                      onDrop: (P) => _p(P, w),
                      onDragEnd: Su,
                      onClick: () => Xe(p.origIdx),
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
                              onClick: () => Sn(p.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => gs(p.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => $t(p.origIdx),
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
              vo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: vo.length })
                ] }),
                vo.map((p) => {
                  const w = je && je.type === "unplaced" && je.stationId === p.stationId && je.displayId === p.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${w ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: ($) => Cu($, p),
                      onDragEnd: Su,
                      onClick: () => ft(p.feed),
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
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: ($) => $.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => ft(p.feed),
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
              Bs.length === 0 && vo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => _s("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: ms, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${ze ? "active" : ""}`,
                  onClick: () => Le((p) => !p),
                  title: `Feeds & Layers Palette (${H.length}/${Yt.length} on canvas)`,
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
                    className: `btn-wing-tool ${_e ? "active" : ""}`,
                    onClick: () => {
                      Oe((p) => !p), de(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                _e && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        St("auto-grid"), _s("auto-grid"), Oe(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const p = new Set((t && t.length > 0 ? t : n).map((Y) => Y.id)), w = (H || []).filter((Y) => p.has(Y.stationId)), $ = (t && t.length > 0 ? t : n).filter((Y) => !w.some((V) => V.stationId === Y.id));
                          return w.length > 0 ? w.length + $.length : nn.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        St("1x1"), _s("1x1"), Oe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        St("1x2"), _s("1x2"), Oe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        St("2x2"), _s("2x2"), Oe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        St("1+3-pip"), _s("1+3-pip"), Oe(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Ft === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        St("hero-stacked"), _s("hero-stacked"), Oe(!1);
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
                    className: `btn-wing-tool ${me ? "active" : ""}`,
                    onClick: () => {
                      de((p) => !p), Oe(!1);
                    },
                    title: `Aspect Ratio: ${yt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: yt })
                    ]
                  }
                ),
                me && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  Jn.map((p) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${yt === p.id ? "active" : ""}`,
                      onClick: () => {
                        bt(p.id), de(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: p.label }),
                        /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                          p.w,
                          "×",
                          p.h
                        ] })
                      ]
                    },
                    p.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Dt ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: Or,
                  title: Dt ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Dt ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Dt ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${Ce ? "active" : ""}`,
                  onClick: () => $e((p) => !p),
                  title: Ce ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                  className: `btn-wing-tool ${xe ? "active" : ""}`,
                  onClick: () => Q((p) => !p),
                  title: xe ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  disabled: Ot.current.length === 0,
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
                  onClick: Yi,
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
                ref: (p) => {
                  ut.current = p, wt.current = p;
                },
                className: `canvas-master-frame-16-9 ${Dt ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: _t.width > 180 ? `${_t.width}px` : "100%",
                  height: _t.height > 100 ? `${_t.height}px` : "auto",
                  aspectRatio: `${Ae} / ${Se}`
                },
                onMouseMove: xo,
                onMouseLeave: zi,
                onDragOver: (p) => {
                  p.preventDefault(), p.dataTransfer.dropEffect = "copy";
                },
                onDrop: Fp,
                onClick: () => mn(!1),
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
                        left: `${Qe.x / Ae * 100}%`,
                        top: `${Qe.y / Se * 100}%`,
                        width: `${Qe.width / Ae * 100}%`,
                        height: `${Qe.height / Se * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Qe.label })
                      ] })
                    }
                  ),
                  xe && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Ae}×${Se}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ve.isInside ? `${Ve.x},${Ve.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Ae} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          Fs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: Fs.x,
                              y: "0",
                              width: Fs.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          go.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "0", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: p.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: p.val })
                          ] }, `rx-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "8", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "13", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${p.val}`)),
                          Ve.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: Ve.x,
                              y1: "0",
                              x2: Ve.x,
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
                        viewBox: `0 0 20 ${Se}`,
                        preserveAspectRatio: "none",
                        children: [
                          Fs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: Fs.y,
                              width: "20",
                              height: Fs.height,
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          Wi.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: p.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: p.val })
                          ] }, `ry-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${p.val}`)),
                          Ve.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: Ve.y,
                              x2: "20",
                              y2: Ve.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  Ct.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${Ct.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  Ct.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${Ct.horizontal}%`,
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
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Le(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => _s("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Op.map((p) => {
                    var At;
                    const w = p.originalIndex, $ = Ze === w, Y = Ie && Ze === w, V = Ke && Ze === w, P = (n.length > 0 ? n : t).find(
                      (De) => {
                        var at, rt, gr, Us;
                        return De.id === p.stationId || ((at = De.hostname) == null ? void 0 : at.toLowerCase()) === ((rt = p.stationId) == null ? void 0 : rt.toLowerCase()) || ((gr = De.id) == null ? void 0 : gr.toLowerCase()) === ((Us = p.stationId) == null ? void 0 : Us.toLowerCase());
                      }
                    ), ae = Yt.find((De) => De.stationId === p.stationId && De.displayId === p.displayId), Me = P || {
                      id: p.stationId,
                      hostname: (ae == null ? void 0 : ae.stationHostname) || p.stationHostname || p.stationId,
                      displayName: (ae == null ? void 0 : ae.stationName) || p.label || p.stationId,
                      displays: ae ? [{ displayId: ae.displayId, width: ae.sourceWidth, height: ae.sourceHeight }] : []
                    }, ge = (Me == null ? void 0 : Me.displays) || ((At = Me == null ? void 0 : Me.topology) == null ? void 0 : At.displays) || [], we = H.filter(
                      (De) => De.stationId === p.stationId || Me && (De.stationId === Me.id || De.stationId === Me.hostname)
                    ), lt = ge.length > 1 && we.length >= ge.length, tt = p.borderColor || gt[w % gt.length], nt = p.borderWidth !== void 0 ? p.borderWidth : 2, ye = p.rotation || 0, st = p.shadowEffect || "deep", Tt = p.borderRadius || 0, pt = p.x / Ae * 100, mt = p.y / Se * 100, bn = p.width / Ae * 100, zn = p.height / Se * 100, Pt = Og(st, $, tt);
                    p.y < 50, p.x < 100, p.x + p.width > Ae - 100;
                    const Mt = p.zIndex !== void 0 ? p.zIndex : w + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${$ ? "is-selected" : ""} ${Y ? "is-dragging" : ""} ${V ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${pt}%`,
                          top: `${mt}%`,
                          width: `${bn}%`,
                          height: `${zn}%`,
                          zIndex: Mt * 10 + (Y ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${nt}px solid ${tt}`,
                          borderRadius: `${Tt}px`,
                          boxShadow: Pt,
                          opacity: p.opacity !== void 0 ? p.opacity : 1,
                          pointerEvents: p.opacity !== void 0 && p.opacity < 0.1 ? "none" : "auto",
                          cursor: Y ? "grabbing" : "grab",
                          transition: Y || V ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (De) => Ki(De, w),
                        onContextMenu: (De) => {
                          De.preventDefault(), De.stopPropagation(), Xe(w), mn(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (De) => Ki(De, w),
                              onDoubleClick: () => mr(w),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: p.label || `${Me.displayName || p.stationId} (${p.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(p.width),
                                  "×",
                                  Math.round(p.height),
                                  " (",
                                  Fr(p.width, p.height),
                                  ") @ (",
                                  Math.round(p.x),
                                  ",",
                                  Math.round(p.y),
                                  ")",
                                  ye !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    ye,
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
                                    className: `btn-badge-action-inspector ${$ && Nt ? "active" : ""}`,
                                    onClick: (De) => {
                                      De.stopPropagation(), Xe(w), mn((at) => !at || Ze !== w);
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
                                  transition: Y ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Sg,
                                  {
                                    station: Me,
                                    isSolo: !1,
                                    currentEpochMs: F,
                                    timeMode: x,
                                    isPlaying: y,
                                    setIsPlaying: C,
                                    baseEpochMs: h,
                                    totalDurationMs: b,
                                    outPointMs: k,
                                    setPlayheadMs: f,
                                    globalGaps: d,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: S,
                                    playbackSpeed: E,
                                    activeAudioStationId: G,
                                    onSoloAudio: le,
                                    directorPlan: g || (Me == null ? void 0 : Me.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Me.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: p.displayId,
                                    onSelectDisplayId: (De) => {
                                      const at = H.map((rt, gr) => gr === w ? { ...rt, displayId: De } : rt);
                                      fe(at);
                                    },
                                    areAllDisplaysPlaced: lt,
                                    slotIndex: w,
                                    borderColor: tt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (De) => Ki(De, w),
                                onDoubleClick: () => mr(w),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          $ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (De) => yo(De, w, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Fr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (De) => yo(De, w, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Fr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (De) => yo(De, w, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Fr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (De) => yo(De, w, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Fr(p.sourceWidth, p.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${p.stationId}-${p.displayId}-${w}`
                    );
                  }),
                  !K && Nt && Ze !== null && Fs && (() => {
                    const p = Fs, w = Ze, $ = p.borderColor || gt[w % gt.length], Y = p.borderWidth !== void 0 ? p.borderWidth : 2, V = p.rotation || 0, P = p.shadowEffect || "deep", ae = p.zIndex !== void 0 ? p.zIndex : w + 1, Me = p.x / Ae * 100, ge = p.width / Ae * 100, we = Me + ge / 2;
                    let lt = `${we}%`, tt = "translateX(-50%)";
                    we < 28 ? (lt = `${Math.max(1, Me)}%`, tt = "none") : we > 72 && (lt = `${Math.min(99, Me + ge)}%`, tt = "translateX(-100%)");
                    const nt = p.y + p.height + 8;
                    let ye;
                    nt + 45 > Se ? ye = `${Math.max(20, (p.y + p.height - 44) / Se * 100)}%` : ye = `${nt / Se * 100}%`;
                    const st = (n.length > 0 ? n : t).find(
                      (pt) => {
                        var mt, bn;
                        return pt.id === p.stationId || ((mt = pt.hostname) == null ? void 0 : mt.toLowerCase()) === ((bn = p.stationId) == null ? void 0 : bn.toLowerCase());
                      }
                    ), Tt = st ? st.id : p.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: lt,
                          top: ye,
                          transform: tt,
                          zIndex: 99999
                        },
                        onMouseDown: (pt) => pt.stopPropagation(),
                        onClick: (pt) => pt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${p.label || Tt} • Layer #${ae}`, children: [
                            "🎛️ #$",
                            ae
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => Cn((pt) => !pt),
                                title: "🎨 Frame Color: Choose border color",
                                children: /* @__PURE__ */ s.jsx(
                                  "span",
                                  {
                                    className: "swatch-circle",
                                    style: { backgroundColor: $ === "transparent" ? "#1E293B" : $ }
                                  }
                                )
                              }
                            ),
                            Ln && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Lg.map((pt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${$ === pt ? "is-active" : ""}`,
                                style: { backgroundColor: pt === "transparent" ? "#1E293B" : pt },
                                onClick: () => {
                                  pr({ borderColor: pt }), Cn(!1);
                                },
                                title: pt === "transparent" ? "No Border (Transparent)" : `Border Color: ${pt}`
                              },
                              pt
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => {
                                const pt = [0, 2, 4, 8], mt = pt[(pt.indexOf(Y) + 1) % pt.length];
                                pr({ borderWidth: mt });
                              },
                              title: `Border Width: ${Y}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                Y,
                                "px"
                              ]
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: `btn-mini-tool ${P !== "none" ? "highlight-glow" : ""}`,
                              onClick: () => {
                                const pt = ["none", "deep", "glow-cyan", "glow-emerald"], mt = pt[(pt.indexOf(P) + 1) % pt.length];
                                pr({ shadowEffect: mt });
                              },
                              title: `Shadow Effect: ${P} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                              children: "🌑"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Sn(w),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => gs(w),
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
                              onClick: () => Hi(90),
                              title: `Rotate: Step 90° clockwise (Current: ${V}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Rp(w),
                              title: `Snap to Native Recorded Aspect (${Fr(p.sourceWidth, p.sourceHeight)})`,
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
                              onClick: () => l(Tt, p.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => $t(w),
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
                    bg,
                    {
                      currentEpochMs: F,
                      position: te,
                      onPositionChange: (p) => {
                        Z(p);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", p);
                        } catch {
                        }
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => be(!0),
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
                    className: `btn-wing-tool ${z ? "active" : ""}`,
                    onClick: () => ne((p) => !p),
                    title: `Saved Presets Library (${Fe.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Fe.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                z && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => ne(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Fe.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Fe.map((p) => {
                    var w;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      Mp(p), ne(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: p.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((w = p.placements) == null ? void 0 : w.length) || 0,
                          " screens • ",
                          p.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: ($) => Ip(p.id, $),
                          title: "Delete saved preset",
                          children: "🗑️"
                        }
                      )
                    ] }, p.id);
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool",
                  onClick: Tp,
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
                    var p;
                    return (p = He.current) == null ? void 0 : p.click();
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
                  ref: He,
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: Ap
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-rose",
                  onClick: () => {
                    ht.current = !1, St("auto-grid");
                    const p = nn.length > 0 ? nn : Yt, w = zs(p, Ae, Se), $ = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: h,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Ae,
                            height: Se,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: w
                          }
                        }
                      ]
                    };
                    an($), I && I($), Xe(0);
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
                  onClick: ms,
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
                  onClick: $p,
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
        se && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => be(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (p) => p.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => be(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: J,
                onChange: (p) => pe(p.target.value),
                autoFocus: !0,
                onKeyDown: (p) => {
                  p.key === "Enter" && wu();
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => be(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: wu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Ea = [0.5, 1, 1.25, 1.5, 2, 4];
function yp({
  activeStationId: e,
  isPlaying: t,
  setIsPlaying: n,
  isLooping: r = !0,
  setIsLooping: l,
  _playheadMs: o = 0,
  setPlayheadMs: i,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  totalDurationMs: h = 36e5,
  onStepFrameForward: v,
  onStepFrameBackward: m,
  playbackSpeed: x = 1,
  onChangeSpeed: y,
  onSetInPoint: C,
  onSetOutPoint: b
}) {
  const [D, k] = u.useState(() => il()), { volume: f, isMuted: d } = D, S = !!(e || h > 0);
  u.useEffect(() => {
    const B = (re) => {
      re.detail && k(re.detail);
    };
    return window.addEventListener("itb-audio-state-changed", B), () => window.removeEventListener("itb-audio-state-changed", B);
  }, []);
  const E = u.useCallback((B, re, I) => {
    const R = {
      volume: typeof B == "number" ? B : f,
      isMuted: typeof re == "boolean" ? re : d,
      channelMode: I || D.channelMode || "both"
    };
    k(R), kg(R);
  }, [f, d, D.channelMode]), j = (B) => {
    B == null || B.stopPropagation(), S && n(!t);
  }, N = (B) => {
    if (B == null || B.stopPropagation(), !S || !y) return;
    const re = Ea.indexOf(x), I = re === -1 ? 1 : (re + 1) % Ea.length;
    y(Ea[I]);
  }, T = (B) => {
    B == null || B.stopPropagation(), d ? E(f === 0 ? 0.5 : f, !1) : E(f, !0);
  }, g = (B) => {
    B.stopPropagation();
    const re = parseFloat(B.target.value);
    re === 0 ? E(0, !0) : E(re, !1);
  }, M = (B) => {
    const re = u.useRef(null), I = u.useRef(null), R = u.useRef(0), _ = u.useCallback(() => {
      re.current && clearTimeout(re.current), I.current && clearInterval(I.current), re.current = null, I.current = null;
    }, []), K = u.useCallback((te = 1) => {
      if (n && n(!1), i) {
        const Z = 33 * te;
        i((G) => {
          const le = B === "forward" ? G + Z : G - Z;
          return Math.max(0, Math.min(h, le));
        });
      } else B === "forward" && v ? v() : B === "backward" && m && m();
    }, [B]), F = u.useCallback((te) => {
      te.preventDefault(), te.stopPropagation(), S && (_(), K(1), R.current = performance.now(), re.current = setTimeout(() => {
        I.current = setInterval(() => {
          const Z = performance.now() - R.current, G = Z > 2500 ? 4 : Z > 1e3 ? 2 : 1;
          K(G);
        }, 50);
      }, 280));
    }, [K, _]);
    return u.useEffect(() => _, [_]), {
      onMouseDown: F,
      onMouseUp: _,
      onMouseLeave: _,
      onTouchStart: F,
      onTouchEnd: _
    };
  }, O = M("backward"), U = M("forward"), A = (B) => {
    B.stopPropagation(), S && (n && n(!1), i && i(a));
  }, W = (B) => {
    B.stopPropagation(), S && (n && n(!1), i && i(c));
  }, oe = () => d || f === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : f < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${S ? "is-expanded" : "is-compact-disabled"}`,
      title: S ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !S,
            onClick: N,
            title: "Playback Speed",
            children: [
              x,
              "x"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-in",
            disabled: !C,
            onClick: (B) => {
              B.stopPropagation(), C == null || C();
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
              disabled: !S,
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
              disabled: !S,
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
              disabled: !S,
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
              disabled: !S,
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
              disabled: !S,
              ...U,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !S,
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
            onClick: (B) => {
              B.stopPropagation(), b == null || b();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        S && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${d || f === 0 ? "is-muted" : ""}`,
              onClick: T,
              title: d ? "Unmute" : `Mute (${Math.round(f * 100)}%)`,
              children: oe()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: d ? 0 : f,
              onChange: g,
              className: "volume-slider"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-audio-mode-toggle",
              onClick: () => {
                const B = ["both", "mic", "sys", "stereo"], re = D.channelMode || "both", I = B[(B.indexOf(re) + 1) % B.length];
                E(f, d, I);
              },
              title: `Discrete Audio Channel: ${(D.channelMode || "both").toUpperCase()} (Click to cycle Both / Mic / System / Stereo)`,
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
              children: (D.channelMode || "both") === "mic" ? "🎤 MIC" : (D.channelMode || "both") === "sys" ? "🔊 SYS" : (D.channelMode || "both") === "stereo" ? "⮂ STEREO" : "🎧 BOTH"
            }
          )
        ] })
      ]
    }
  );
}
const Zo = 2500, Pg = {
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
function _g(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Pg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function vp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(_g), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Np(e, t = " + ") {
  return vp(e).join(t);
}
function Tl(e) {
  return Np(e, "+");
}
const Fg = 8;
function Bg({
  activeStationName: e = "",
  stationHostname: t = "",
  stations: n = [],
  keystrokes: r = null,
  baseEpochMs: l = 0,
  timeMode: o = "LOCAL",
  viewportStartMs: i = 0,
  viewportDurationMs: a = 36e5,
  pixelWidth: c = 1e3,
  onSeek: h
}) {
  const [v, m] = u.useState([]), [, x] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((d) => ({
    id: d.id,
    name: d.displayName || d.hostname || d.name || d.id,
    hostname: d.hostname || d.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  u.useEffect(() => {
    if (r && Array.isArray(r) && r.length > 0)
      return;
    if (!y.length || !l || a <= 0) {
      m([]);
      return;
    }
    const d = new AbortController(), S = Math.max(0, l + i - Zo), E = l + i + a + Zo;
    x(!0);
    const j = y.map((N) => {
      const T = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(N.hostname)}&startEpoch=${S}&endEpoch=${E}`;
      return fetch(T, { signal: d.signal }).then((g) => g.ok ? g.json() : []).then((g) => (Array.isArray(g) ? g : []).map((M) => ({
        ...M,
        stationId: N.id,
        stationName: N.name
      }))).catch((g) => {
        if (g.name !== "AbortError") return [];
        throw g;
      });
    });
    return Promise.all(j).then((N) => {
      const T = N.flat();
      m(T), x(!1);
    }).catch((N) => {
      N.name !== "AbortError" && (m([]), x(!1));
    }), () => d.abort();
  }, [y, l, i, a, r]);
  const C = r && Array.isArray(r) && r.length > 0 ? r : v, b = u.useMemo(() => {
    if (!C.length || a <= 0 || c <= 0)
      return [];
    const d = l + i, S = d + a, E = [...C].sort((g, M) => g.epochMs - M.epochMs), j = [];
    let N = null, T = -999;
    for (const g of E) {
      const M = g.epochMs + Zo;
      if (M < d || M > S)
        continue;
      const O = M - l, U = (O - i) / a * c;
      if (N && U - T < Fg) {
        N.events.push(g), N.endOffsetMs = O, N.endEpochMs = M;
        const A = new Set(N.events.map((W) => W.stationName || "Workstation"));
        N.isMultiStation = A.size > 1, N.stationCount = A.size, T = U;
      } else {
        const A = (O - i) / a * 100;
        N = {
          id: `kc_${g.epochMs}_${j.length}`,
          startOffsetMs: O,
          endOffsetMs: O,
          startEpochMs: M,
          endEpochMs: M,
          pct: A,
          events: [g],
          isMultiStation: !1,
          stationCount: 1
        }, j.push(N), T = U;
      }
    }
    return j;
  }, [C, l, i, a, c]);
  function D(d) {
    if (!d.events.length) return "";
    if (d.events.length === 1)
      return Tl(d.events[0].keyCombination);
    const S = d.events.find((N) => N.keyCombination.includes("+"));
    if (S) {
      const N = Tl(S.keyCombination);
      return d.events.length > 1 ? `${N} (+${d.events.length - 1})` : N;
    }
    const E = Tl(d.events[0].keyCombination);
    return d.events.every((N) => Tl(N.keyCombination) === E) ? `${E} ×${d.events.length}` : `${E} (+${d.events.length - 1})`;
  }
  function k(d, S = "LOCAL") {
    return vt(d, S);
  }
  function f(d) {
    const S = [];
    for (const E of d) {
      const j = Tl(E.keyCombination);
      S.length && S[S.length - 1].key === j ? S[S.length - 1].count++ : S.push({ key: j, count: 1 });
    }
    return S;
  }
  return b.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: b.map((d) => {
    const S = d.events.length, E = S > 1, j = d.isMultiStation, N = D(d), T = k(d.startEpochMs, o), g = d.pct < 10 ? "edge-left" : d.pct > 90 ? "edge-right" : "", M = {};
    return d.events.forEach((O) => {
      const U = O.stationName || e || "Workstation";
      M[U] || (M[U] = []), M[U].push(O);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${E ? "is-cluster" : "is-single"} ${j ? "is-multi-station" : ""}`,
        style: { left: `${d.pct}%` },
        onClick: (O) => {
          O.stopPropagation(), h && h(d.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${N} at ${T}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            E && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: j ? `${d.stationCount}S` : S > 9 ? "9+" : S })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${g}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: j ? `MULTICAM KEYSTROKES (${d.stationCount} WORKSTATIONS • ${S} EVT)` : E ? `KEYSTROKE BURST (${S})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: T })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(M).map(([O, U]) => {
              const A = f(U);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: O }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    U.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  A.slice(0, 6).map((W, oe) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    W.key,
                    W.count > 1 ? ` ×${W.count}` : ""
                  ] }, oe)),
                  A.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    A.length - 6,
                    " more"
                  ] })
                ] })
              ] }, O);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      d.id
    );
  }) }) : null;
}
const Ug = u.memo(Bg), Ca = [
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
], Wg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function zg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  totalDurationMs: l = 36e5,
  hoverMs: o = null,
  onHoverChange: i,
  onSeek: a,
  inPointMs: c = null,
  outPointMs: h = null,
  earliestMediaMs: v = null,
  movieBoundaries: m = null,
  stationHostname: x = "",
  activeStationName: y = "",
  showKeystrokes: C = !0,
  keystrokes: b = []
}) {
  const D = u.useRef(null), [k, f] = u.useState(1e3);
  u.useEffect(() => {
    if (!D.current) return;
    const F = new ResizeObserver((te) => {
      for (let Z of te)
        Z.contentRect.width > 50 && f(Z.contentRect.width);
    });
    return F.observe(D.current), () => F.disconnect();
  }, []);
  const d = u.useCallback((F) => !r || r <= 0 ? "0%" : `${(F - n) / r * 100}%`, [r, n]), S = u.useCallback((F) => {
    const Z = (F - n) / r * 100;
    return Z >= -5 && Z <= 105;
  }, [n, r]), E = (F) => {
    if (!D.current) return;
    const te = D.current.getBoundingClientRect(), Z = Math.max(0, Math.min(F.clientX - te.left, te.width)), G = Math.round(n + Z / te.width * r);
    i && i(G);
  }, j = () => {
    i && i(null);
  }, N = (F) => {
    if (!D.current || !a) return;
    const te = D.current.getBoundingClientRect(), Z = Math.max(0, Math.min(F.clientX - te.left, te.width)), G = Math.round(n + Z / te.width * r);
    a(Math.max(0, Math.min(l, G)));
  }, T = u.useMemo(() => {
    const F = Math.max(3, Math.floor(k / 95)), te = r / F;
    for (let Z of Ca)
      if (Z >= te) return Z;
    return Ca[Ca.length - 1];
  }, [r, k]), g = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const F = e + n, te = F + r, Z = t === "LOCAL" ? As(F).offsetMin * 60 * 1e3 : 0, G = F + Z, le = Math.ceil(G / T) * T, ze = [];
    for (let Le = le; Le <= te + Z; Le += T) {
      const je = Le - Z, X = (je - F) / r * 100;
      X >= 0 && X <= 100 && ze.push({
        epoch: je,
        pct: X,
        label: vt(je, t, {
          includeSeconds: T < 6e4
        })
      });
    }
    return ze;
  }, [e, n, r, T, t]), M = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const F = e + n, te = F + r;
    return hp(F, te).map((Z) => ({
      ...Z,
      pct: (Z.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), O = u.useMemo(() => {
    if (!r || !e) return [];
    const F = e + n, te = F + r, Z = t === "UTC", G = [], le = Z ? 0 : As(F).offsetMin * 60 * 1e3, ze = F + le, Le = te + le, je = new Date(ze);
    for (je.setUTCHours(0, 0, 0, 0), je.getTime() < ze && je.setUTCDate(je.getUTCDate() + 1); je.getTime() <= Le; ) {
      const ie = je.getTime() - le, ee = (ie - F) / r * 100, se = String(je.getUTCDate()).padStart(2, "0"), be = Wg[je.getUTCMonth()], z = `${se} ${be}`;
      G.push({ epoch: ie, pct: ee, dateLabel: z }), je.setUTCDate(je.getUTCDate() + 1);
    }
    return G;
  }, [e, n, r, t]), {
    globalFirstMs: U = v,
    globalLastMs: A = null,
    currentFirstMs: W = null,
    currentLastMs: oe = null
  } = m || { globalFirstMs: v }, B = U !== null && W !== null && Math.abs(U - W) < 1e3, re = A !== null && oe !== null && Math.abs(A - oe) < 1e3, I = u.useMemo(() => {
    const F = [];
    return B ? S(U) && F.push({
      id: "first-combined",
      ms: U,
      pct: d(U),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${vt(e + U, t)} (Click to jump)`
    }) : (S(U) && F.push({
      id: "first-global",
      ms: U,
      pct: d(U),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${vt(e + U, t)} (Click to jump)`
    }), S(W) && F.push({
      id: "first-current",
      ms: W,
      pct: d(W),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${vt(e + W, t)} (Click to jump)`
    })), re ? S(A) && F.push({
      id: "last-combined",
      ms: A,
      pct: d(A),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${vt(e + A, t)} (Click to jump)`
    }) : (S(oe) && F.push({
      id: "last-current",
      ms: oe,
      pct: d(oe),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${vt(e + oe, t)} (Click to jump)`
    }), S(A) && F.push({
      id: "last-global",
      ms: A,
      pct: d(A),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${vt(e + A, t)} (Click to jump)`
    })), F;
  }, [
    U,
    A,
    W,
    oe,
    B,
    re,
    e,
    t,
    y,
    S,
    d
  ]), R = u.useMemo(() => {
    const F = [];
    return typeof c == "number" && S(c) && F.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: d(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${vt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof h == "number" && S(h) && F.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: h,
      pct: d(h),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${vt(e + h, t, { includeSeconds: !0 })} (Click to seek)`
    }), F;
  }, [c, h, e, t, S, d]), _ = o !== null ? d(o) : null, K = _ !== null && _ >= 0 && _ <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: D,
      className: "timeline-ruler-root",
      onMouseMove: E,
      onMouseLeave: j,
      onClick: N,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          g.map((F) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${F.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: F.label })
          ] }, F.epoch)),
          C && /* @__PURE__ */ s.jsx(
            Ug,
            {
              stationHostname: x,
              activeStationName: y,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: a,
              keystrokes: b
            }
          ),
          M.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${F.pct}%` },
              title: `${F.description} (${F.labelBefore} ➔ ${F.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: F.description })
                ] })
              ]
            },
            F.switchEpochMs
          )),
          O.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${F.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: F.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            F.epoch
          )),
          I.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: F.className,
              style: { left: `${F.pct}` },
              onClick: (te) => {
                te.stopPropagation(), a && a(F.ms);
              },
              title: F.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: F.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            F.id
          )),
          R.map((F) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${F.type}-cut-tick`,
              style: { left: `${F.pct}` },
              onClick: (te) => {
                te.stopPropagation(), a && a(F.ms);
              },
              title: F.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: F.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: F.shortLabel })
                ] })
              ]
            },
            F.id
          ))
        ] }),
        K && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${_}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: vt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Pn = (e) => String(e).padStart(2, "0");
function Hg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [h, v] = u.useState(!1), [m, x] = u.useState(""), [y, C] = u.useState(""), b = u.useCallback((g) => {
    if (!g || isNaN(g) || g <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const A = new Date(g);
      return {
        timeStr: `${Pn(A.getUTCHours())}:${Pn(A.getUTCMinutes())}:${Pn(A.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: M, label: O } = As(g), U = new Date(g + M * 60 * 1e3);
    return {
      timeStr: `${Pn(U.getUTCHours())}:${Pn(U.getUTCMinutes())}:${Pn(U.getUTCSeconds())}`,
      zoneLabel: O
    };
  }, [t]), D = u.useCallback((g) => {
    if (!g || g < 0) return "00:00:00";
    const M = Math.floor(g / 1e3), O = Math.floor(M / 3600), U = Math.floor(M % 3600 / 60), A = M % 60;
    return `${Pn(O)}:${Pn(U)}:${Pn(A)}`;
  }, []), k = u.useMemo(() => b(e + r), [b, e, r]), f = u.useMemo(() => b(e + o), [b, e, o]), d = u.useMemo(() => D(Math.max(0, o - r)), [D, r, o]), S = u.useCallback((g, M) => {
    if (!g || !g.trim()) return M;
    const U = g.trim().split(" ")[0].split(":").map(Number);
    if (U.length < 2 || U.some(isNaN)) return M;
    const [A, W, oe = 0] = U;
    if (t === "UTC") {
      const le = new Date(e);
      le.setUTCHours(A, W, oe, 0);
      let ze = le.getTime();
      for (; ze < e; ) ze += 864e5;
      for (; ze > e + n + 1e3; ) ze -= 864e5;
      const Le = ze - e;
      return isNaN(Le) ? M : Math.max(0, Math.min(n, Le));
    }
    const { offsetMin: B } = As(e), re = new Date(e + B * 6e4), I = re.getUTCFullYear(), R = re.getUTCMonth(), _ = re.getUTCDate(), K = `${I}-${Pn(R + 1)}-${Pn(_)}`, F = `${Pn(A)}:${Pn(W)}:${Pn(oe)}`, te = Ei(K, F);
    let Z;
    if (te.isAmbiguous) {
      const le = e + M, ze = Math.abs(te.firstOccurrenceEpoch - le), Le = Math.abs(te.secondOccurrenceEpoch - le);
      Z = ze <= Le ? te.firstOccurrenceEpoch : te.secondOccurrenceEpoch;
    } else {
      const le = Date.UTC(I, R, _, A, W, oe), { offsetMin: ze } = As(le - B * 6e4);
      Z = le - ze * 6e4;
    }
    for (; Z < e; ) Z += 864e5;
    for (; Z > e + n + 1e3; ) Z -= 864e5;
    const G = Z - e;
    return isNaN(G) ? M : Math.max(0, Math.min(n, G));
  }, [e, t, n]), E = () => {
    x(k.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !m || !m.trim() || m.trim() === k.timeStr)
      return;
    const g = S(m.trim(), r);
    g !== null && !isNaN(g) && g < o && l(g);
  }, N = () => {
    C(f.timeStr), v(!0);
  }, T = () => {
    if (v(!1), !y || !y.trim() || y.trim() === f.timeStr)
      return;
    const g = S(y.trim(), o);
    g !== null && !isNaN(g) && g > r && i(g);
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
          onChange: (g) => x(g.target.value),
          onBlur: j,
          onKeyDown: (g) => {
            g.key === "Enter" && j(), g.key === "Escape" && c(!1);
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
      h ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: y,
          autoFocus: !0,
          onChange: (g) => C(g.target.value),
          onBlur: T,
          onKeyDown: (g) => {
            g.key === "Enter" && T(), g.key === "Escape" && v(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: N,
          title: `Click to edit OUT time (${f.zoneLabel})`,
          children: [
            f.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: f.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-duration-shelf", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dur-label-group", children: [
        /* @__PURE__ */ s.jsx("span", { className: "dur-dot" }),
        /* @__PURE__ */ s.jsx("span", { className: "dur-title", children: "DUR" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: d })
    ] })
  ] });
}
function Kg({
  minimapRef: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  totalDurationMs: r = 36e5,
  viewportStartMs: l = 0,
  viewportDurationMs: o = 36e5,
  zoomLevel: i = 1,
  inPointMs: a = 0,
  outPointMs: c = 36e5,
  playheadMs: h = 0,
  onStartDragMinimap: v
}) {
  const m = Math.max(0, Math.min(100, a / r * 100)), x = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, x - m), C = Math.max(0, Math.min(100, l / r * 100)), b = Math.max(0, Math.min(100 - C, o / r * 100)), D = C + b, k = i > 1.05, f = 7, d = y >= 10, S = y >= 16, E = d, j = S, N = E && Math.abs(C - m) < f, T = k && b >= 12 && !N, g = j && Math.abs(D - x) < f, M = k && b >= 12 && !g;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (O) => v && v("minimap-viewport", O),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${m}%`, width: `${y}%` },
            children: [
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: vt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: vt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${C}%`, width: `${b}%` },
            children: [
              T && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: vt(t + l, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: vt(t + l + o, n) })
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
function Vg({
  earliestMediaMs: e,
  latestMediaMs: t,
  hasActiveCut: n,
  onJumpToFirst: r,
  onJumpToLast: l,
  onContextualFit: o,
  onResetZoom: i,
  baseEpochMs: a,
  timeMode: c,
  keystrokeMode: h = "BURN_IN",
  // 'NONE' | 'CAPTION' | 'BURN_IN'
  onChangeKeystrokeMode: v,
  showRulerKeystrokes: m = !1,
  onToggleRulerKeystrokes: x
}) {
  const y = (h || "NONE").toUpperCase().replace("-", "_"), C = () => {
    v && v(y === "NONE" || y === "OFF" ? "BURN_IN" : y === "BURN_IN" ? "CAPTION" : "NONE");
  }, b = () => {
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
        onClick: C,
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
    x && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${m ? "active" : "inactive"}`,
        onClick: x,
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
        title: `Jump playhead to first media (${vt(a + e, c)})`,
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
        title: `Jump playhead to last media (${vt(a + t, c)})`,
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
let bs = [], al = 0;
const zd = 3, Yg = 8e3, Gg = 80;
function kp() {
  setTimeout(Xg, 0);
}
function Xg() {
  var e;
  if (!(al >= zd || bs.length === 0))
    for (bs = bs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); al < zd && bs.length > 0; ) {
      const t = bs.pop();
      !t || (e = t.signal) != null && e.aborted || (al++, Qg(t));
    }
}
async function Qg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let h = !1, v = null;
  const m = () => {
    h || (h = !0, v && clearTimeout(v), al = Math.max(0, al - 1), Br.delete(t), kp());
  };
  v = setTimeout(() => {
    m(), a(null);
  }, Yg);
  try {
    const x = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(x, { signal: i });
    if (y.ok && y.status !== 204) {
      const C = await y.blob();
      if (C && C.size > 1500) {
        const b = URL.createObjectURL(C);
        if (Ns.size >= Gg) {
          const D = Ns.keys().next().value, k = Ns.get(D);
          k && URL.revokeObjectURL(k), Ns.delete(D);
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
const Hd = {
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
      const h = {
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
        bs = bs.filter((v) => v.key !== i), Br.delete(i), c(null);
      }, { once: !0 }), bs.push(h), kp();
    });
    return Br.set(i, a), a;
  },
  clear() {
    Ns.forEach((e) => URL.revokeObjectURL(e)), Ns.clear(), Br.clear(), bs = [], al = 0;
  }
}, Jg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Kn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Cr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Sc({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: l = 36e5,
  baseEpochMs: o = 0,
  inPointMs: i = 0,
  outPointMs: a = 36e5,
  globalGaps: c = [],
  gaps: h = [],
  directorSegments: v = [],
  isAutoDirectorEnabled: m = !1,
  showDirectorCoverage: x = !1,
  stepperSegments: y = null
}) {
  const [C, b] = u.useState({}), D = u.useRef(C);
  D.current = C;
  const k = u.useMemo(() => Jg(l), [l]), f = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: g, framesPerTile: M } = k, O = [], U = o + r, A = U + l, W = U - g, oe = A + g, B = [...n].sort((K, F) => Kn(K) - Kn(F)), re = [...c || [], ...h || []], I = (K, F) => !re || re.length === 0 ? !1 : re.some((te) => {
      const Z = te.startEpochMs ?? te.startEpoch ?? te.start ?? 0, G = te.endEpochMs ?? te.endEpoch ?? te.end ?? 0;
      return G <= Z ? !1 : Math.max(K, Z) < Math.min(F, G);
    }), R = o + i, _ = o + a;
    if (B.forEach((K, F) => {
      const te = Math.round(Kn(K)), Z = Math.round(Cr(K));
      if (Z <= te) return;
      const G = Math.max(te, R), le = Math.min(Z, _);
      if (le <= G) return;
      const ze = Math.max(G, W), Le = Math.min(le, oe);
      if (Le <= ze) return;
      const je = Math.floor(ze / g) * g;
      for (let X = je; X < Le; X += g) {
        const ie = X + g, ee = Math.max(G, X), se = Math.min(le, ie);
        se > ee && !I(ee, se) && O.push({
          key: `${e}_${t}_${ee}_${se}_${M}`,
          sIdx: F,
          startEpoch: ee,
          endEpoch: se,
          framesPerTile: M,
          displayId: t
        });
      }
    }), O.length > 20) {
      const K = o + r + l / 2;
      O.sort((F, te) => {
        const Z = Math.abs((F.startEpoch + F.endEpoch) / 2 - K), G = Math.abs((te.startEpoch + te.endEpoch) / 2 - K);
        return Z - G;
      }), O.length = 20, O.sort((F, te) => F.startEpoch - te.startEpoch);
    }
    return O;
  }, [n, o, e, t, r, l, k, i, a, h, c]);
  u.useEffect(() => {
    if (f.length === 0) return;
    let g = !0;
    const M = new AbortController(), O = [], U = {};
    let A = !1;
    f.forEach((R) => {
      const _ = Hd.get(e, R.startEpoch, R.endEpoch, R.framesPerTile, t);
      _ ? D.current[R.key] !== _ && (U[R.key] = _, A = !0) : O.push(R);
    });
    const W = new Set(f.map((R) => R.key)), oe = D.current, B = {};
    let re = !1;
    if (Object.keys(oe).forEach((R) => {
      W.has(R) ? B[R] = oe[R] : re = !0;
    }), A || re) {
      const R = { ...B, ...U };
      D.current = R, b(R);
    }
    if (O.length === 0) return () => {
      g = !1;
    };
    const I = setTimeout(() => {
      O.forEach((R) => {
        Hd.fetchTile(e, R.startEpoch, R.endEpoch, R.framesPerTile, M.signal, t).then((_) => {
          g && _ && (D.current[R.key] = _, b((K) => ({ ...K, [R.key]: _ })));
        });
      });
    }, 150);
    return () => {
      g = !1, clearTimeout(I), M.abort();
    };
  }, [f, e, t]);
  const d = (i - r) / l * 100, S = (a - r) / l * 100, E = u.useMemo(() => {
    if (f.length === 0 || !o || l <= 0) return [];
    const g = r, M = r + l;
    return f.map((O) => {
      const U = O.startEpoch - o, A = O.endEpoch - o;
      if (A <= g || U >= M) return null;
      const W = Math.max(g, U), oe = Math.min(M, A);
      return {
        key: O.key,
        spriteUrl: C[O.key] || null,
        leftPct: (W - g) / l * 100,
        widthPct: (oe - W) / l * 100
      };
    }).filter(Boolean);
  }, [f, o, r, l, C]), j = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const g = r, M = r + l;
    return n.map((O, U) => {
      const A = Math.round(Kn(O)) - o, W = Math.round(Cr(O)) - o;
      if (W <= g || A >= M) return null;
      const oe = Math.max(g, A), B = Math.min(M, W);
      return {
        id: U,
        leftPct: (oe - g) / l * 100,
        widthPct: (B - oe) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), N = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const g = [...n].sort((I, R) => Kn(I) - Kn(R)), M = [], O = r, U = r + l, A = o + O, W = o + U, oe = o + (i !== void 0 ? i : O), B = o + (a !== void 0 ? a : U);
    if (g.length > 0) {
      const I = Kn(g[0]);
      I > A && M.push({ startEpoch: A, endEpoch: I });
    } else l > 0 && M.push({ startEpoch: A, endEpoch: W });
    for (let I = 0; I < g.length - 1; I++) {
      const R = Cr(g[I]), _ = Kn(g[I + 1]);
      _ - R > 1e3 && M.push({ startEpoch: R, endEpoch: _ });
    }
    if (g.length > 0) {
      const I = Cr(g[g.length - 1]);
      I < W && M.push({ startEpoch: I, endEpoch: W });
    }
    const re = [];
    return c && c.length > 0 && c.forEach((I, R) => {
      const _ = Math.max(I.startEpochMs ?? I.StartEpochMs, oe), K = Math.min(I.endEpochMs ?? I.EndEpochMs, B);
      if (K > _ && K > A && _ < W) {
        const F = Math.max(A, _), te = Math.min(W, K), Z = (te - o - (F - o)) / l * 100;
        Z > 0 && re.push({
          id: `global-${R}`,
          type: "global",
          startEpoch: F,
          endEpoch: te,
          leftPct: (F - o - O) / l * 100,
          widthPct: Z,
          durationSec: Math.round((K - _) / 1e3)
        });
      }
    }), M.forEach((I, R) => {
      let _ = [I];
      c && c.length > 0 && c.forEach((K) => {
        const F = Math.max(K.startEpochMs ?? K.StartEpochMs, oe), te = Math.min(K.endEpochMs ?? K.EndEpochMs, B);
        if (te <= F) return;
        const Z = [];
        _.forEach((G) => {
          te <= G.startEpoch || F >= G.endEpoch ? Z.push(G) : (F > G.startEpoch && Z.push({ startEpoch: G.startEpoch, endEpoch: F }), te < G.endEpoch && Z.push({ startEpoch: te, endEpoch: G.endEpoch }));
        }), _ = Z;
      }), _.forEach((K, F) => {
        if (K.endEpoch - K.startEpoch < 1e3 || K.endEpoch <= A || K.startEpoch >= W) return;
        const te = Math.max(A, K.startEpoch), Z = Math.min(W, K.endEpoch), G = (Z - o - (te - o)) / l * 100;
        G > 0 && re.push({
          id: `station-${R}-${F}`,
          type: "station",
          startEpoch: te,
          endEpoch: Z,
          leftPct: (te - o - O) / l * 100,
          widthPct: G,
          durationSec: Math.round((K.endEpoch - K.startEpoch) / 1e3)
        });
      });
    }), re;
  }, [n, c, o, r, l, i, a]), T = u.useMemo(() => {
    if (!x || !m || !v || v.length === 0) return [];
    const g = (t || "mon-0").toLowerCase(), M = r, O = r + l;
    return v.map((U, A) => {
      const W = (U.startEpochMs ?? U.StartEpochMs ?? 0) - o, oe = (U.endEpochMs ?? U.EndEpochMs ?? 0) - o;
      if (oe <= M || W >= O) return null;
      const B = Math.max(M, W), re = Math.min(O, oe), I = (B - M) / l * 100, R = (re - B) / l * 100;
      if (R <= 0) return null;
      const K = (U.targetDisplayId || U.TargetDisplayId || "mon-0").toLowerCase() === g;
      return {
        id: `cov_${A}`,
        isFeatured: K,
        leftPct: I,
        widthPct: R
      };
    }).filter(Boolean);
  }, [x, m, v, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: N.map((g) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${g.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
        title: g.type === "global" ? `Shared Gap: ${g.durationSec}s will be skipped` : `Station Gap: ${g.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          g.widthPct > 5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${g.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: g.type === "global" ? `✂ SKIPPED (${g.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      g.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: E.map((g) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${g.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${g.leftPct}%`,
          width: `${g.widthPct}%`,
          height: "100%",
          backgroundImage: g.spriteUrl ? `url("${g.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !g.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      g.key
    )) }),
    T.map((g) => g.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      g.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      g.id
    )),
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${y ? "has-stepper" : ""}`, children: j.map((g) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` }
      },
      `bar_${g.id}`
    )) }),
    y && y.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      y.map((g, M) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${g.dispNum}`,
          style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
          title: `Auto-Director: Screen ${g.dispNum} (${g.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: g.dispNum })
        },
        `stp_${M}`
      )),
      N && N.map((g) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${g.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
          title: g.type === "global" ? `Global Gap: ${g.durationSec}s skipped in export (No switches)` : `Station Gap: ${g.durationSec}s No Signal (No switches)`,
          children: g.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: g.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${g.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    d > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, d)}%` } }),
    S < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, S)}%`, right: 0 } })
  ] });
}
function Zg({
  station: e,
  isExpanded: t = !1,
  onToggleExpand: n,
  isAutoDirectorEnabled: r = !0,
  onToggleAutoDirector: l,
  canvasPlacements: o = [],
  onToggleDisplayOnCanvas: i,
  directorPlan: a = null,
  isActive: c = !0,
  onSelect: h,
  onStationContextMenu: v,
  onDeselectStation: m,
  viewportStartMs: x = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: C = 0,
  outPointMs: b = 36e5,
  baseEpochMs: D = 0,
  segments: k = [],
  recordingSegments: f = {},
  globalGaps: d = []
}) {
  const S = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", E = (e == null ? void 0 : e.id) || S, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", T = u.useMemo(() => {
    var R, _, K;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((R = e == null ? void 0 : e.displayTopology) == null ? void 0 : R.displays) || ((_ = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : _.Displays) || ((K = e == null ? void 0 : e.topology) == null ? void 0 : K.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), g = u.useMemo(() => {
    var _, K;
    const R = T.find((F) => F.isPrimary || F.IsPrimary);
    return ((R == null ? void 0 : R.displayId) || (R == null ? void 0 : R.DisplayId) || ((_ = T[0]) == null ? void 0 : _.displayId) || ((K = T[0]) == null ? void 0 : K.DisplayId) || "mon-0").toLowerCase();
  }, [T]), M = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), O = u.useMemo(() => (M == null ? void 0 : M.segments) || (M == null ? void 0 : M.Segments) || [], [M]), U = O && O.length > 0, A = T.length > 1 || U, W = u.useMemo(() => {
    let R = f[E] || f[S] || k || [];
    if (!R || R.length === 0) {
      const _ = (E || "").toLowerCase(), K = (S || "").toLowerCase();
      for (const [F, te] of Object.entries(f || {})) {
        const Z = F.toLowerCase();
        if (_ && Z === _ || K && Z === K) {
          R = te;
          break;
        }
      }
    }
    if ((!R || R.length === 0) && (R = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !R || R.length === 0)
      for (const _ of T) {
        const K = _.segments || _.Segments || [];
        if (K.length > 0) {
          R = K;
          break;
        }
      }
    return (R || []).filter((_) => Cr(_) - Kn(_) > 0);
  }, [f, k, E, S, e, T]), oe = u.useMemo(() => {
    if (!D || y <= 0) return [];
    const R = [...W].sort((Z, G) => Kn(Z) - Kn(G)), _ = [], K = D + y;
    if (d && d.length > 0 && d.forEach((Z) => {
      const G = Z.startEpochMs ?? Z.StartEpochMs ?? 0, le = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      le > G && _.push({ startEpoch: G, endEpoch: le, type: "global" });
    }), R.length === 0)
      return _.push({ startEpoch: D, endEpoch: K, type: "station" }), _;
    const F = Math.round(Kn(R[0]));
    F - D > 2e3 && (_.some((G) => G.type === "global" && G.startEpoch <= D && G.endEpoch >= F) || _.push({ startEpoch: D, endEpoch: F, type: "station" }));
    for (let Z = 0; Z < R.length - 1; Z++) {
      const G = Math.round(Cr(R[Z])), le = Math.round(Kn(R[Z + 1]));
      le - G > 2e3 && (_.some((Le) => Le.type === "global" && Le.startEpoch <= G && Le.endEpoch >= le) || _.push({ startEpoch: G, endEpoch: le, type: "station" }));
    }
    const te = Math.round(Cr(R[R.length - 1]));
    return K - te > 2e3 && (_.some((G) => G.type === "global" && G.startEpoch <= te && G.endEpoch >= K) || _.push({ startEpoch: te, endEpoch: K, type: "station" })), _;
  }, [W, d, D, y]), B = u.useMemo(() => $g(O, oe, d), [O, oe, d]), re = u.useMemo(() => {
    if (!U || y <= 0) return null;
    const R = x, _ = x + y;
    return B.map((K, F) => {
      const te = (K.startEpochMs ?? K.StartEpochMs ?? 0) - D, Z = (K.endEpochMs ?? K.EndEpochMs ?? 0) - D;
      if (Z <= R || te >= _) return null;
      const G = Math.max(R, te), le = Math.min(_, Z), ze = (G - R) / y * 100, Le = (le - G) / y * 100;
      if (Le <= 0) return null;
      const je = (K.targetDisplayId || K.TargetDisplayId || "mon-0").toLowerCase(), X = T.findIndex((se) => (se.displayId || se.DisplayId || "").toLowerCase() === je);
      let ie = X >= 0 ? X + 1 : null;
      if (!ie) {
        const se = je.match(/\d+/);
        ie = se ? parseInt(se[0], 10) + 1 : 1;
      }
      const ee = X >= 0 ? T[X].displayName || T[X].DisplayName || `Screen ${ie}` : `Screen ${ie}`;
      return {
        id: F,
        dispNum: ie,
        dispLabel: ee,
        leftPct: ze,
        widthPct: Le
      };
    }).filter(Boolean);
  }, [U, B, T, D, x, y]), I = u.useCallback((R) => {
    const _ = (R || "mon-0").toLowerCase();
    return o.some((K) => {
      if (K.stationId !== E) return !1;
      const F = (K.displayId || "mon-0").toLowerCase();
      return F === _ || F === "auto" && (_ === "mon-0" || _ === "screen-0");
    });
  }, [o, E]);
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: T.map((R, _) => {
      const K = (R.displayId || R.DisplayId || `mon-${_}`).toLowerCase(), F = R.displayNumber || R.DisplayNumber || _ + 1, te = R.displayName || R.DisplayName || "", Z = te && !te.toLowerCase().includes(S.toLowerCase()) ? te : `Screen ${F}${R.isPrimary || _ === 0 ? " (Main)" : ""}`, G = I(K);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${Z} (${R.width || 1920}×${R.height || 1080})`, children: Z }),
              !r && i && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${G ? "is-on-canvas" : ""}`,
                  onClick: (le) => {
                    le.stopPropagation(), i(e.id, K);
                  },
                  title: G ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: G ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Sc,
              {
                hostname: S,
                displayId: K,
                activeSegments: W,
                viewportStartMs: x,
                viewportDurationMs: y,
                baseEpochMs: D,
                inPointMs: C,
                outPointMs: b,
                globalGaps: d,
                directorSegments: B,
                isAutoDirectorEnabled: r,
                gaps: oe,
                showDirectorCoverage: A
              }
            )
          ]
        },
        `${e.id}-${K}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        h && h(), A && n && n();
      },
      onContextMenu: (R) => {
        v && (R.preventDefault(), R.stopPropagation(), v(R, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${A ? "has-stepper" : ""}`,
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
              m && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${j} from project`,
                  onClick: (R) => {
                    R.stopPropagation(), m(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Sc,
          {
            hostname: S,
            displayId: g,
            activeSegments: W,
            viewportStartMs: x,
            viewportDurationMs: y,
            baseEpochMs: D,
            inPointMs: C,
            outPointMs: b,
            globalGaps: d,
            isAutoDirectorEnabled: r,
            gaps: oe,
            stepperSegments: A ? re : null
          }
        )
      ]
    }
  );
}
const Kd = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function qg({
  audioPlan: e,
  stations: t = [],
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  baseEpochMs: l = 0,
  playheadMs: o = 0,
  onSplitSegment: i,
  onChangeSegmentStation: a,
  onChangeSegmentGain: c,
  onFollowVisualFeed: h,
  isAutoFollow: v = !1,
  timeMode: m = "LOCAL",
  onUpdateAudioPlan: x = null
}) {
  const y = u.useRef(null), [C, b] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [D, k] = u.useState(!1), [f, d] = u.useState(null), [S, E] = u.useState(1), [j, N] = u.useState([]), [T, g] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const X = (ie) => {
      ie.detail && g(ie.detail);
    };
    return window.addEventListener("itb-live-audio-level", X), () => window.removeEventListener("itb-live-audio-level", X);
  }, []);
  const M = u.useCallback(() => {
    b((X) => {
      const ie = !X;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(ie));
      } catch {
      }
      return ie;
    });
  }, []), [O, U] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((X, ie) => {
        var ee;
        return {
          id: `clip_${ie}_${X.startEpochMs || X.StartEpochMs}`,
          startEpochMs: X.startEpochMs ?? X.StartEpochMs ?? l,
          endEpochMs: X.endEpochMs ?? X.EndEpochMs ?? l + r,
          sourceStationId: X.sourceStationId ?? X.SourceStationId ?? (((ee = t[0]) == null ? void 0 : ee.id) || "station-0"),
          gain: X.gain ?? X.Gain ?? 1
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
  ]), A = l + o, W = l + n, oe = W + r, B = u.useCallback((X) => {
    if (!x) return;
    const ie = [];
    X.forEach((ee) => {
      ee.isMuted || D || ee.clips.forEach((se) => {
        ie.push({
          startEpochMs: se.startEpochMs,
          endEpochMs: se.endEpochMs,
          sourceStationId: se.sourceStationId,
          gain: se.gain * ee.gain
        });
      });
    }), ie.sort((ee, se) => ee.startEpochMs - se.startEpochMs), x({ segments: ie });
  }, [x, D]);
  u.useEffect(() => {
    const X = () => {
      j.length !== 0 && (U((se) => {
        const be = se.map((z) => ({
          ...z,
          clips: z.clips.filter((ne) => !j.includes(ne.id))
        }));
        return B(be), be;
      }), N([]), d(null));
    }, ie = (se) => {
      if (se.key === "Delete" || se.key === "Backspace") {
        const be = se.target;
        if (be.tagName === "INPUT" || be.tagName === "TEXTAREA" || be.isContentEditable) return;
        j.length > 0 && (se.preventDefault(), X());
      }
    }, ee = () => X();
    return window.addEventListener("keydown", ie), window.addEventListener("itb:studio-delete-selected", ee), () => {
      window.removeEventListener("keydown", ie), window.removeEventListener("itb:studio-delete-selected", ee);
    };
  }, [j, B]);
  const re = u.useCallback(() => {
    U((X) => {
      const ee = `A${X.length + 1}`, se = {
        id: ee,
        name: `Track ${ee}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, be = [...X, se];
      return B(be), be;
    });
  }, [B]), I = u.useCallback((X) => {
    U((ie) => {
      if (ie.length <= 1) return ie;
      const ee = ie.filter((se) => se.id !== X);
      return B(ee), ee;
    });
  }, [B]), R = u.useCallback((X) => {
    U((ie) => {
      const ee = ie.map((se) => se.id === X ? { ...se, isMuted: !se.isMuted } : se);
      return B(ee), ee;
    });
  }, [B]), _ = u.useCallback((X) => {
    U((ie) => {
      var be;
      const ee = (be = ie.find((z) => z.id === X)) == null ? void 0 : be.isSolo, se = ie.map((z) => ({
        ...z,
        isSolo: z.id === X ? !ee : !1,
        isMuted: z.id === X ? !1 : !ee
      }));
      return B(se), se;
    });
  }, [B]), K = u.useCallback((X, ie) => {
    const ee = Math.max(0, Math.min(2, Number(ie)));
    U((se) => {
      const be = se.map((z) => z.id === X ? { ...z, gain: ee } : z);
      return B(be), be;
    }), Ud(ee);
  }, [B]), F = u.useCallback((X, ie = null, ee = null) => {
    var Oe;
    const se = ie || ((Oe = t[0]) == null ? void 0 : Oe.id) || "station-0", be = ee !== null ? ee : A, z = Math.min(r, 6e4), ne = be + z, _e = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(be),
      endEpochMs: Math.round(ne),
      sourceStationId: se,
      gain: 1
    };
    U((me) => {
      const de = me.map((J) => J.id === X ? {
        ...J,
        clips: [...J.clips, _e].sort((pe, he) => pe.startEpochMs - he.startEpochMs)
      } : J);
      return B(de), de;
    });
  }, [A, r, t, B]), te = u.useCallback((X, ie) => {
    U((ee) => {
      const se = ee.map((be) => {
        if (be.id !== X) return be;
        const z = [];
        return be.clips.forEach((ne) => {
          ne.id === ie && A > ne.startEpochMs + 500 && A < ne.endEpochMs - 500 ? (z.push({ ...ne, endEpochMs: A }), z.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: A,
            endEpochMs: ne.endEpochMs,
            sourceStationId: ne.sourceStationId,
            gain: ne.gain
          })) : z.push(ne);
        }), { ...be, clips: z };
      });
      return B(se), se;
    }), d(null);
  }, [A, B]), Z = u.useCallback((X, ie) => {
    U((ee) => {
      const se = ee.map((be) => be.id !== X ? be : { ...be, clips: be.clips.filter((z) => z.id !== ie) });
      return B(se), se;
    }), d(null);
  }, [B]), G = u.useCallback((X, ie, ee) => {
    U((se) => {
      const be = se.map((z) => z.id !== X ? z : {
        ...z,
        clips: z.clips.map((ne) => ne.id === ie ? { ...ne, sourceStationId: ee } : ne)
      });
      return B(be), be;
    }), d((se) => se ? { ...se, stationId: ee } : null);
  }, [B]), le = u.useCallback((X, ie, ee) => {
    const se = Math.max(0, Math.min(2.5, Number(ee)));
    E(se), U((be) => {
      const z = be.map((ne) => ne.id !== X ? ne : {
        ...ne,
        clips: ne.clips.map((_e) => _e.id === ie ? { ..._e, gain: se } : _e)
      });
      return B(z), z;
    }), Ud(se);
  }, [B]), ze = u.useCallback((X, ie, ee, se) => {
    X.preventDefault(), X.stopPropagation();
    const be = X.clientX, z = O.find((J) => J.id === ie), ne = z == null ? void 0 : z.clips.find((J) => J.id === ee);
    if (!ne) return;
    const _e = ne.startEpochMs, Oe = ne.endEpochMs, me = (J) => {
      var Fe;
      const pe = J.clientX - be, he = (Fe = y.current) == null ? void 0 : Fe.querySelector(".audio-lane-timeline");
      if (!he) return;
      const We = he.getBoundingClientRect(), He = pe / We.width * r;
      U((Ee) => Ee.map((ot) => ot.id !== ie ? ot : {
        ...ot,
        clips: ot.clips.map((Be) => {
          if (Be.id !== ee) return Be;
          if (se === "start") {
            const It = Math.min(Oe - 500, _e + He);
            return { ...Be, startEpochMs: Math.round(It) };
          } else {
            const It = Math.max(_e + 500, Oe + He);
            return { ...Be, endEpochMs: Math.round(It) };
          }
        })
      }));
    }, de = () => {
      window.removeEventListener("mousemove", me), window.removeEventListener("mouseup", de), U((J) => (B(J), J));
    };
    window.addEventListener("mousemove", me), window.addEventListener("mouseup", de);
  }, [O, r, B]), Le = (X, ie, ee) => {
    X.preventDefault(), X.stopPropagation();
    const se = 260, be = 280, z = Math.max(16, Math.min(window.innerWidth - se - 16, X.clientX - se / 2));
    let ne = X.clientY - be - 12;
    ne < 140 && (ne = Math.min(window.innerHeight - be - 16, X.clientY + 24)), E(ee.gain || 1), d({
      laneId: ie,
      clipId: ee.id,
      s: ee.startEpochMs,
      e: ee.endEpochMs,
      x: z,
      y: ne,
      stationId: ee.sourceStationId,
      gain: ee.gain || 1
    });
  };
  u.useEffect(() => {
    if (!f) return;
    const X = () => d(null), ie = (ee) => {
      ee.key === "Escape" && d(null);
    };
    return window.addEventListener("click", X), window.addEventListener("keydown", ie), () => {
      window.removeEventListener("click", X), window.removeEventListener("keydown", ie);
    };
  }, [f]);
  const je = u.useMemo(() => O.reduce((X, ie) => X + (ie.isMuted ? 0 : ie.clips.length), 0), [O]);
  return !t || t.length === 0 ? null : C ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: M,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          O.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: re,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "master-vu-readout", children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: T.isPlaying ? `${T.db.toFixed(1)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "master-vu-bar-outer", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "master-vu-bar-inner",
              style: {
                width: `${Math.min(100, Math.max(0, T.rms * 120))}%`,
                background: T.db > -3 ? "#F43F5E" : T.db > -9 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${D ? "is-muted" : ""}`,
            onClick: () => k((X) => !X),
            title: D ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: D ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: O.map((X, ie) => {
      const ee = Kd[ie % Kd.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ee}26`, borderColor: `${ee}80`, color: ee }, children: X.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: X.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${X.isMuted ? "active" : ""}`,
                onClick: () => R(X.id),
                title: X.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${X.isSolo ? "active" : ""}`,
                onClick: () => _(X.id),
                title: X.isSolo ? "Unsolo Lane" : "Solo Lane",
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
                value: X.gain,
                onChange: (se) => K(X.id, se.target.value),
                title: `Lane Gain: ${Math.round(X.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(X.gain * 100),
              "%"
            ] })
          ] }),
          O.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => I(X.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "audio-lane-timeline",
            onClick: () => N([]),
            onDoubleClick: (se) => {
              var _e;
              const be = se.currentTarget.getBoundingClientRect(), z = Math.max(0, Math.min(1, (se.clientX - be.left) / be.width)), ne = Math.round(W + z * r);
              F(X.id, (_e = t[0]) == null ? void 0 : _e.id, ne);
            },
            children: [
              X.clips.map((se) => {
                const be = se.startEpochMs, z = se.endEpochMs, ne = t.find((pe) => pe.id === se.sourceStationId), _e = ne ? ne.displayName || ne.hostname || ne.id : se.sourceStationId;
                if (z <= W || be >= oe) return null;
                const Oe = Math.max(W, be), me = Math.min(oe, z), de = (Oe - W) / r * 100, J = (me - Oe) / r * 100;
                return J <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${X.isMuted ? "lane-muted" : ""} ${j.includes(se.id) ? "is-selected" : ""}`,
                    style: {
                      left: `${de}%`,
                      width: `${J}%`,
                      borderLeftColor: ee
                    },
                    onClick: (pe) => {
                      pe.stopPropagation(), pe.ctrlKey || pe.metaKey ? N(
                        (he) => he.includes(se.id) ? he.filter((We) => We !== se.id) : [...he, se.id]
                      ) : N([se.id]);
                    },
                    onDoubleClick: (pe) => Le(pe, X.id, se),
                    onContextMenu: (pe) => Le(pe, X.id, se),
                    title: `Audio Clip: ${_e} [${vt(be, m, { includeSeconds: !0 })} - ${vt(z, m, { includeSeconds: !0 })}] • Gain: ${Math.round(se.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (pe) => ze(pe, X.id, se.id, "start"),
                          title: "Drag to trim Clip In-Point"
                        }
                      ),
                      /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
                        "path",
                        {
                          d: "M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12",
                          fill: "none",
                          stroke: ee,
                          strokeWidth: "1.2",
                          strokeOpacity: "0.85"
                        }
                      ) }) }),
                      /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: _e }),
                        /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
                          Math.round(se.gain * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-right",
                          onMouseDown: (pe) => ze(pe, X.id, se.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  se.id
                );
              }),
              X.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var se;
                    return F(X.id, (se = t[0]) == null ? void 0 : se.id, A);
                  },
                  title: "Click to insert audio clip at playhead",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK TO INSERT AUDIO CLIP (",
                    X.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, X.id);
    }) }),
    f && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: f.x, top: f.y },
        onClick: (X) => X.stopPropagation(),
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
            /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-close",
                onClick: () => d(null),
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE STATION" }),
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((X) => {
              const ie = X.id === f.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${ie ? "is-selected" : ""}`,
                  onClick: () => G(f.laneId, f.clipId, X.id),
                  children: X.displayName || X.hostname || X.id
                },
                X.id
              );
            }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME GAIN" }),
              /* @__PURE__ */ s.jsxs("span", { className: "gain-val", children: [
                Math.round(S * 100),
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
                value: S,
                onChange: (X) => le(f.laneId, f.clipId, X.target.value),
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
                onClick: () => te(f.laneId, f.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => Z(f.laneId, f.clipId),
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
      onClick: M,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: je > 0 ? `${je} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: T.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-timeline collapsed-bus-timeline", children: [
          /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS — CLICK TO EXPAND MULTI-TRACK LANES (A1, A2...) ]" })
        ] })
      ]
    }
  );
}
function ex({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: l,
  onUpdateKeyframeEpoch: o,
  onUpdateKeyframeTransition: i,
  viewportStartMs: a = 0,
  viewportDurationMs: c = 36e5,
  baseEpochMs: h = 0,
  totalDurationMs: v = 36e5,
  playheadMs: m = 0,
  inPointMs: x = 0,
  outPointMs: y = 36e5,
  timeMode: C = "LOCAL"
}) {
  const b = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [D, k] = u.useState(null), [f, d] = u.useState(null);
  uo.useEffect(() => {
    if (f === null) return;
    const g = (O) => {
      O.key === "Escape" && d(null);
    }, M = (O) => {
      !O.target.closest(".kf-inspector-popover") && !O.target.closest(".kf-marker-diamond") && d(null);
    };
    return window.addEventListener("keydown", g), window.addEventListener("mousedown", M), () => {
      window.removeEventListener("keydown", g), window.removeEventListener("mousedown", M);
    };
  }, [f]);
  const S = h + m, E = h + a, j = E + c, N = (g) => {
    const M = g.currentTarget.getBoundingClientRect(), O = g.clientX - M.left, U = Math.max(0, Math.min(1, O / M.width)), A = Math.round(E + U * c);
    r && r(A);
  }, T = (g, M, O) => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault();
    const U = g.clientX, A = O.timestampEpochMs, W = O.id || `kf_${M}_${A}`, oe = g.currentTarget.closest(".track-surface");
    if (!oe) return;
    let B = !1;
    k({
      idx: M,
      kfId: W,
      startClientX: U,
      initialEpoch: A,
      currentEpoch: A
    });
    const re = (R) => {
      const _ = R.clientX - U;
      Math.abs(_) > 3 && (B = !0);
      const K = oe.getBoundingClientRect(), F = _ / K.width * c;
      let te = Math.round(A + F);
      te = Math.max(h, Math.min(h + v, te));
      const Z = h + x, G = h + y, le = 14 / K.width * c;
      Math.abs(te - S) <= le ? te = S : Math.abs(te - Z) <= le ? te = Z : Math.abs(te - G) <= le && (te = G), k((ze) => ze ? { ...ze, currentEpoch: te } : null);
    }, I = (R) => {
      window.removeEventListener("mousemove", re), window.removeEventListener("mouseup", I), k(null);
      const _ = oe.getBoundingClientRect(), F = (R.clientX - U) / _.width * c;
      let te = Math.round(A + F);
      te = Math.max(h, Math.min(h + v, te));
      const Z = h + x, G = h + y, le = 14 / _.width * c;
      Math.abs(te - S) <= le ? te = S : Math.abs(te - Z) <= le ? te = Z : Math.abs(te - G) <= le && (te = G), B ? (o && o(W, te), n && n(M, te)) : (n && n(M, A), d((ze) => ze === M ? null : M));
    };
    window.addEventListener("mousemove", re), window.addEventListener("mouseup", I);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        b.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (g) => {
            g.stopPropagation(), r && r(S);
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
          b.map((g, M) => {
            const O = (D == null ? void 0 : D.idx) === M, U = O ? D.currentEpoch : g.timestampEpochMs;
            if (U < E - 5e4 || U > j + 5e4) return null;
            const A = (U - E) / c * 100;
            if (A < -2 || A > 102) return null;
            const W = M === t, oe = vt(U, C, { includeSeconds: !0 }), B = `${g.transitionType || "smooth"} (${g.transitionDurationSec ?? 0.5}s)`, re = Math.max(0, (U - h) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${W ? "is-active" : ""} ${O ? "is-dragging" : ""}`,
                style: { left: `${A}%` },
                onMouseDown: (I) => T(I, M, g),
                onContextMenu: (I) => {
                  I.preventDefault(), I.stopPropagation(), b.length > 1 && l && l(M);
                },
                title: `Keyframe #${M + 1} at ${oe} (+${re}s) • ${B}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  O && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: oe }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      re,
                      "s"
                    ] })
                  ] }),
                  f === M && !O && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (I) => I.stopPropagation(),
                      onMouseDown: (I) => I.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            M + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: oe }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (I) => {
                                I.stopPropagation(), d(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        M > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(g.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(M, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${g.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(M, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${g.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(M, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          g.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((I) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(g.transitionDurationSec ?? 0.5) === I ? "is-active" : ""}`,
                                onClick: () => i == null ? void 0 : i(M, { transitionDurationSec: I }),
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
                                I.stopPropagation(), l && l(M), d(null);
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
              `kf-${M}`
            );
          })
        ]
      }
    )
  ] });
}
function tx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: i = 36e5,
  onStartDrag: a
}) {
  const c = (g) => !r || r <= 0 ? "0%" : `${(g - n) / r * 100}%`, h = (o - n) / r * 100, v = (i - n) / r * 100, m = (l - n) / r * 100, x = m >= -0.2 && m <= 100.2, y = Math.max(0, Math.min(100, m)), C = Math.max(0, h), b = Math.min(100, v), D = Math.max(0, b - C), k = (g) => (M) => {
    M.preventDefault(), M.stopPropagation(), typeof a == "function" && a(g, M);
  }, f = h < 1.5, d = v > 98.5, S = h <= 0.2 && h >= -0.2, E = v >= 99.8 && v <= 100.2, j = m >= -0.2 && m < 3.5, N = m > 96.5 && m <= 100.2, T = u.useMemo(() => vt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    D > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${C}%`, width: `${D}%` },
        onMouseDown: k("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${f ? "flipped" : ""} ${S ? "at-edge" : ""}`,
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
        className: `marker out-marker ${d ? "flipped" : ""} ${E ? "at-edge" : ""}`,
        style: { left: c(i) },
        onMouseDown: k("out"),
        title: "Drag OUT Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "OUT" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    x && /* @__PURE__ */ s.jsxs(
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
const nx = uo.memo(tx);
function sx({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const m = (x) => {
      x.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e, l]), !e) return null;
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), h = Math.min(e.y, window.innerHeight - a - 12), v = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: h, left: c },
      onClick: (m) => m.stopPropagation(),
      onContextMenu: (m) => m.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: vt(t + e.targetMs, n) })
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
function rx({
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
const lx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function ox({
  stationIdsKey: e,
  inPointMs: t,
  outPointMs: n,
  baseEpochMs: r,
  onEstimateLoaded: l
}) {
  const [o, i] = u.useState(null), [a, c] = u.useState(!1), h = u.useRef(l);
  return u.useEffect(() => {
    h.current = l;
  }, [l]), u.useEffect(() => {
    if (!e || n <= t || !r) {
      i(null);
      return;
    }
    const v = new AbortController();
    c(!0);
    const m = setTimeout(async () => {
      try {
        const x = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, y = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(x),
          signal: v.signal
        });
        if (y.ok) {
          const C = await y.json();
          i(C), h.current && h.current(C);
        }
      } catch (x) {
        x.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", x);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(m), v.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: a, formatEstimateSize: lx };
}
function ix({
  viewportDurationMs: e,
  totalDurationMs: t,
  playheadMs: n,
  setPlayheadMs: r,
  inPointMs: l,
  setInPointMs: o,
  outPointMs: i,
  setOutPointMs: a,
  viewportStartMs: c,
  setViewportStartMs: h,
  getMsFromClientX: v,
  minimapRef: m
}) {
  const [x, y] = u.useState(null), [C, b] = u.useState(null), D = (k, f) => {
    y(k), b({
      target: k,
      startX: f.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!x) return;
    const k = e * 0.015, f = (S) => {
      if (x === "minimap-viewport" && (m != null && m.current)) {
        const j = m.current.getBoundingClientRect(), T = Math.max(0, Math.min(S.clientX - j.left, j.width)) / j.width * t, g = Math.max(0, Math.min(T - e / 2, t - e));
        h(g);
        return;
      }
      const E = v(S.clientX);
      if (x === "playhead") {
        let j = E;
        Math.abs(j - l) <= k ? j = l : Math.abs(j - i) <= k && (j = i), r(Math.max(0, Math.min(t, j)));
      } else if (x === "in") {
        const j = i - 1e3;
        o(Math.max(0, Math.min(E, j)));
      } else if (x === "out") {
        const j = l + 1e3;
        a(Math.min(t, Math.max(E, j)));
      } else if (x === "range" && C) {
        const j = E - v(C.startX), N = C.initialOut - C.initialIn;
        let T = C.initialIn + j, g = C.initialOut + j;
        T < 0 ? (T = 0, g = N) : g > t && (g = t, T = t - N), o(T), a(g);
      }
    }, d = () => {
      y(null), b(null);
    };
    return window.addEventListener("mousemove", f), window.addEventListener("mouseup", d), () => {
      window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", d);
    };
  }, [
    x,
    C,
    v,
    l,
    i,
    n,
    t,
    e,
    r,
    o,
    a,
    h,
    m
  ]), { draggingTarget: x, handleStartDrag: D };
}
const Hs = 4;
function wp({
  stations: e = [],
  activeStationId: t,
  onSelectActiveStation: n,
  onStationContextMenu: r,
  onDeselectStation: l,
  stationAutoDirectorMap: o = {},
  onToggleStationAutoDirector: i,
  baseEpochMs: a = 0,
  timeMode: c = "LOCAL",
  totalDurationMs: h = 36e5,
  zoomLevel: v = 1,
  onZoomChange: m,
  onZoomReset: x,
  playheadMs: y = 0,
  setPlayheadMs: C,
  inPointMs: b = 0,
  setInPointMs: D,
  outPointMs: k = 36e5,
  setOutPointMs: f,
  onExport: d,
  recordingSegments: S = {},
  movieBoundaries: E,
  viewportStartMs: j = 0,
  onViewportStartChange: N,
  onEstimateLoaded: T,
  onFitRange: g,
  onJumpViewportTo: M,
  keystrokeMode: O = "BURN_IN",
  onChangeKeystrokeMode: U,
  keystrokes: A = [],
  showKeystrokes: W = !1,
  showRulerKeystrokes: oe = !1,
  onToggleRulerKeystrokes: B,
  _onSplitDirectorSegment: re,
  _onChangeDirectorSegmentDisplay: I,
  _onResetDirectorSegmentToAuto: R,
  audioRoutingPlan: _,
  onSplitAudioSegment: K,
  onChangeAudioSegmentStation: F,
  onChangeAudioSegmentGain: te,
  onFollowVisualFeed: Z,
  isAutoFollowAudio: G,
  canvasLayoutTimeline: le,
  activeKfIndex: ze = 0,
  onSelectKeyframe: Le,
  onAddKeyframeAtEpoch: je,
  onDeleteKeyframe: X,
  onUpdateKeyframeEpoch: ie,
  onToggleDisplayOnCanvas: ee,
  onUpdateAudioPlan: se
}) {
  var Cn, Ie, Te, Ke, dt, Ct, q, xe;
  const [be, z] = u.useState(null), [ne, _e] = u.useState(0), [Oe, me] = u.useState(null), [de, J] = u.useState(!0), [pe, he] = u.useState(() => {
    var Q;
    return e.length === 1 ? (Q = e[0]) == null ? void 0 : Q.id : null;
  });
  u.useEffect(() => {
    var Q;
    e.length === 1 && !pe && ((Q = e[0]) != null && Q.id) && he(e[0].id);
  }, [e, pe]);
  const We = u.useRef(null), He = u.useRef(null), Fe = h / Math.max(1, v), Ee = Math.ceil(e.length / Hs) || 1, ot = u.useMemo(() => {
    const Q = ne * Hs;
    return e.slice(Q, Q + Hs);
  }, [e, ne]);
  u.useEffect(() => {
    if (!t && !pe) return;
    const Q = pe || t, Ce = e.findIndex(($e) => $e.id === Q);
    if (Ce !== -1) {
      const $e = Math.floor(Ce / Hs);
      $e !== ne && _e($e);
    }
  }, [t, pe, e, ne]);
  const Be = ((Cn = le == null ? void 0 : le.keyframes) == null ? void 0 : Cn[ze]) || ((Ie = le == null ? void 0 : le.keyframes) == null ? void 0 : Ie[0]), It = u.useMemo(() => {
    var Q;
    return ((Q = Be == null ? void 0 : Be.layout) == null ? void 0 : Q.placements) || [];
  }, [Be]), Ge = u.useMemo(() => e.find((Q) => Q.id === t) || null, [e, t]), Et = (E == null ? void 0 : E.globalFirstMs) ?? null, en = (E == null ? void 0 : E.globalLastMs) ?? null, ut = u.useMemo(() => (b > 500 || k < h - 500) && k - b >= 1e3, [b, k, h]), tn = u.useMemo(() => e.map((Q) => Q.id).sort().join(","), [e]), { estimateData: _t, isEstimating: vn, formatEstimateSize: Ze } = ox({
    stationIdsKey: tn,
    inPointMs: b,
    outPointMs: k,
    baseEpochMs: a,
    onEstimateLoaded: T
  }), Xe = u.useCallback((Q) => {
    if (!We.current) return j;
    const Ce = We.current.getBoundingClientRect(), $e = Ce.left + 200, Qe = Ce.width - 200 - 58;
    if (Qe <= 0) return j;
    const qe = Math.max(0, Math.min(Q - $e, Qe));
    return Math.round(j + qe / Qe * Fe);
  }, [j, Fe]), { draggingTarget: Nt, handleStartDrag: mn } = ix({
    viewportDurationMs: Fe,
    totalDurationMs: h,
    playheadMs: y,
    setPlayheadMs: C,
    inPointMs: b,
    setInPointMs: D,
    outPointMs: k,
    setOutPointMs: f,
    viewportStartMs: j,
    setViewportStartMs: N,
    getMsFromClientX: Xe,
    minimapRef: He
  }), kt = u.useRef(v);
  kt.current = v;
  const Lt = u.useRef(j);
  Lt.current = j;
  const Zt = u.useRef(h);
  Zt.current = h;
  const on = u.useRef(y);
  on.current = y, u.useEffect(() => {
    const Q = We.current;
    if (!Q) return;
    const Ce = ($e) => {
      $e.preventDefault(), $e.stopPropagation();
      const Qe = $e.ctrlKey || $e.shiftKey, qe = kt.current, Ve = Lt.current, it = Zt.current, wt = on.current;
      if (Qe) {
        const ct = Math.abs($e.deltaX) > Math.abs($e.deltaY) ? $e.deltaX : $e.deltaY;
        if (ct === 0) return;
        const ht = it / Math.max(1, qe), Ft = Math.max(0, it - ht), St = ht * 0.08 * (ct > 0 ? 1 : -1);
        N == null || N(Math.max(0, Math.min(Ft, Ve + St)));
      } else {
        if ($e.deltaY === 0) return;
        const ht = $e.deltaY < 0 ? 1.25 : 0.8, Ft = Math.max(32, it / 2e3), St = Q.getBoundingClientRect(), Ot = St.left + 200, Nn = St.width - 200 - 58;
        let dn = 0.5;
        if (Nn > 0)
          if ($e.clientX >= Ot && $e.clientX <= St.right - 58)
            dn = Math.max(0, Math.min(1, ($e.clientX - Ot) / Nn));
          else {
            const On = it / Math.max(1, qe), Dt = (wt - Ve) / On;
            dn = Dt >= 0 && Dt <= 1 ? Dt : 0.5;
          }
        const Bt = Math.max(1, Math.min(Ft, Math.round(qe * ht * 100) / 100));
        if (Bt === qe) return;
        const ls = it / qe, js = it / Bt, rn = Ve + dn * ls - dn * js, yt = Math.max(0, it - js);
        m == null || m(Bt), N == null || N(Math.max(0, Math.min(yt, rn)));
      }
    };
    return Q.addEventListener("wheel", Ce, { passive: !1, capture: !0 }), () => Q.removeEventListener("wheel", Ce, { capture: !0 });
  }, [m, N]);
  const Ln = e.length > 0 && Math.abs(k - b) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: We,
      className: "timeline-board-root",
      onContextMenu: (Q) => {
        var $e;
        Q.preventDefault();
        const Ce = ($e = We.current) == null ? void 0 : $e.getBoundingClientRect();
        !Ce || Q.clientX - Ce.left < 200 || Q.clientX > Ce.right - 58 || me({ x: Q.clientX, y: Q.clientY, targetMs: Math.max(0, Math.min(h, Xe(Q.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Hg,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: h,
              inPointMs: b,
              setInPointMs: D,
              outPointMs: k,
              setOutPointMs: f
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Kg,
                {
                  minimapRef: He,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: h,
                  viewportStartMs: j,
                  viewportDurationMs: Fe,
                  zoomLevel: v,
                  inPointMs: b,
                  outPointMs: k,
                  playheadMs: y,
                  onStartDragMinimap: mn
                }
              ),
              /* @__PURE__ */ s.jsx(
                Vg,
                {
                  earliestMediaMs: Et,
                  latestMediaMs: en,
                  hasActiveCut: ut,
                  onJumpToFirst: () => {
                    Et !== null && (C == null || C(Et), M == null || M(Et, "start"));
                  },
                  onJumpToLast: () => {
                    en !== null && (C == null || C(en), M == null || M(en, "end"));
                  },
                  onContextualFit: () => {
                    ut ? g == null || g(b, k) : Et !== null && en !== null && en > Et ? g == null || g(Et, en) : x == null || x();
                  },
                  onResetZoom: x,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: O,
                  onChangeKeystrokeMode: U,
                  showRulerKeystrokes: oe,
                  onToggleRulerKeystrokes: B
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              zg,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Fe,
                totalDurationMs: h,
                hoverMs: be,
                onHoverChange: z,
                onSeek: (Q) => C == null ? void 0 : C(Q),
                inPointMs: b,
                outPointMs: k,
                earliestMediaMs: Et,
                movieBoundaries: E,
                stationHostname: (Ge == null ? void 0 : Ge.hostname) || (Ge == null ? void 0 : Ge.id) || (Ge == null ? void 0 : Ge.name),
                activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || (Ge == null ? void 0 : Ge.name),
                showKeystrokes: !!(oe ?? W),
                keystrokes: A
              }
            ) })
          ] })
        ] }),
        Ee > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ne === 0,
              onClick: () => _e((Q) => Math.max(0, Q - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            ne * Hs + 1,
            "–",
            Math.min(e.length, (ne + 1) * Hs),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ne >= Ee - 1,
              onClick: () => _e((Q) => Math.min(Ee - 1, Q + 1)),
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
            onMouseMove: (Q) => {
              if (Nt || !We.current) return;
              const Ce = We.current.getBoundingClientRect();
              Q.clientX >= Ce.left + 200 && Q.clientX <= Ce.right - 58 ? z(Xe(Q.clientX)) : z(null);
            },
            onMouseLeave: () => !Nt && z(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => J((Q) => !Q), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: de ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  de && Ee > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ne === 0,
                        onClick: (Q) => {
                          Q.stopPropagation(), _e((Ce) => Math.max(0, Ce - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      ne + 1,
                      "/",
                      Ee,
                      " (",
                      ne * Hs + 1,
                      "–",
                      Math.min(e.length, (ne + 1) * Hs),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ne >= Ee - 1,
                        onClick: (Q) => {
                          Q.stopPropagation(), _e((Ce) => Math.min(Ee - 1, Ce + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !de && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => J(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && /* @__PURE__ */ s.jsx(
                    Sc,
                    {
                      hostname: ((Te = e[0]) == null ? void 0 : Te.hostname) || ((Ke = e[0]) == null ? void 0 : Ke.id),
                      displayId: "mon-0",
                      activeSegments: S[(dt = e[0]) == null ? void 0 : dt.id] || S[(Ct = e[0]) == null ? void 0 : Ct.hostname] || ((q = e[0]) == null ? void 0 : q.segments) || [],
                      viewportStartMs: j,
                      viewportDurationMs: Fe,
                      baseEpochMs: a,
                      inPointMs: b,
                      outPointMs: k,
                      globalGaps: (_t == null ? void 0 : _t.removedGlobalGaps) || [],
                      isAutoDirectorEnabled: !1
                    }
                  ) })
                ] }),
                de && (e.length > 0 ? ot.map((Q) => {
                  const Ce = !!(t && Q.id === t), $e = pe === Q.id, Qe = o ? o[Q.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Zg,
                    {
                      station: Q,
                      isExpanded: $e,
                      onToggleExpand: () => he((qe) => qe === Q.id ? null : Q.id),
                      isAutoDirectorEnabled: Qe,
                      onToggleAutoDirector: i,
                      canvasPlacements: It,
                      onToggleDisplayOnCanvas: ee,
                      directorPlan: Q.directorPlan,
                      isActive: Ce,
                      onSelect: () => n == null ? void 0 : n(Q.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Fe,
                      inPointMs: b,
                      outPointMs: k,
                      baseEpochMs: a,
                      segments: S[Q.id] || S[Q.hostname] || Q.segments || [],
                      recordingSegments: S,
                      globalGaps: (_t == null ? void 0 : _t.removedGlobalGaps) || []
                    },
                    Q.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  qg,
                  {
                    audioPlan: _,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Fe,
                    baseEpochMs: a,
                    playheadMs: y,
                    onSplitSegment: K,
                    onChangeSegmentStation: F,
                    onChangeSegmentGain: te,
                    onFollowVisualFeed: Z,
                    isAutoFollow: G,
                    timeMode: c,
                    onUpdateAudioPlan: se
                  }
                ),
                ((xe = le == null ? void 0 : le.keyframes) == null ? void 0 : xe.length) > 0 && /* @__PURE__ */ s.jsx(
                  ex,
                  {
                    canvasLayoutTimeline: le,
                    activeKfIndex: ze,
                    onSelectKeyframe: Le,
                    onAddKeyframeAtEpoch: je,
                    onDeleteKeyframe: X,
                    onUpdateKeyframeEpoch: ie,
                    viewportStartMs: j,
                    viewportDurationMs: Fe,
                    baseEpochMs: a,
                    totalDurationMs: h,
                    playheadMs: y,
                    inPointMs: b,
                    outPointMs: k,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                rx,
                {
                  isRangeValid: Ln,
                  onExport: d,
                  isEstimating: vn,
                  estimateData: _t,
                  formatEstimateSize: Ze,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          nx,
          {
            baseEpochMs: a,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Fe,
            playheadMs: y,
            inPointMs: b,
            outPointMs: k,
            onStartDrag: mn
          }
        ),
        /* @__PURE__ */ s.jsx(
          sx,
          {
            contextMenu: Oe,
            baseEpochMs: a,
            timeMode: c,
            onAction: (Q) => {
              Oe && (Q === "playhead" ? C == null || C(Oe.targetMs) : Q === "in" ? D == null || D(Math.max(0, Math.min(Oe.targetMs, k - 1e3))) : Q === "out" && (f == null || f(Math.min(h, Math.max(Oe.targetMs, b + 1e3)))), me(null));
            },
            onClose: () => me(null)
          }
        )
      ]
    }
  );
}
function ax({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
              let c, h;
              return o ? (c = "SCANNING...", h = "is-loading") : i ? (c = "NO RECORDINGS", h = "gap-warning") : a ? (c = "100% COVERAGE", h = "full-archived") : (c = r != null && r.hasGaps ? "GAPS DETECTED" : `${r == null ? void 0 : r.coveragePct}% COVERAGE`, h = "gap-warning"), /* @__PURE__ */ s.jsxs("span", { className: `status-indicator-badge ${h}`, children: [
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
function cx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function ux({ station: e, isSelected: t, onToggle: n, meta: r }) {
  var c, h;
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
      /* @__PURE__ */ s.jsx("div", { className: `status-dot ${a}`, title: o ? "Scanning..." : (h = r.trafficStatus) == null ? void 0 : h.label }),
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
function dx({
  searchTerm: e,
  onSearchChange: t,
  sortAlpha: n,
  onToggleSort: r,
  effectiveTabs: l,
  selectedTabId: o,
  onSelectTab: i,
  isLoadingTabs: a,
  allStations: c,
  selectedStationIds: h,
  filterMode: v,
  onFilterModeChange: m,
  filteredCount: x,
  selectedInTabCount: y,
  unselectedInTabCount: C,
  activeTabName: b,
  onSelectAllInScope: D,
  onClearInScope: k,
  viewMode: f = "grid",
  onViewModeChange: d,
  isDrawerMode: S = !1
}) {
  const [E, j] = u.useState(!1), N = v !== "all", T = !b || b.toLowerCase() === "all", g = T ? "Select All" : `Select ${b}`, M = T ? "Clear All" : `Clear ${b}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${S ? "is-drawer-compact" : ""}`, children: [
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
      S && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${E ? "open" : ""} ${N ? "has-filter" : ""}`,
          onClick: () => j(!E),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            N && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !S && d && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${f === "grid" ? "active" : ""}`,
            onClick: () => d("grid"),
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
            className: `btn-view-mode ${f === "table" ? "active" : ""}`,
            onClick: () => d("table"),
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
    l.length > 1 && (S ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (O) => i(O.target.value),
          children: l.map((O) => {
            const U = O.id === "all" ? c.map((W) => W.id) : O.stationIds || [], A = U.filter((W) => h.includes(W)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: O.id, children: [
              O.name,
              " (",
              A,
              "/",
              U.length,
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
        a && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((O) => {
        const U = o === O.id, A = O.id === "all" ? c.map((B) => B.id) : O.stationIds || [], W = A.length, oe = A.filter((B) => h.includes(B)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${U ? "active" : ""}`,
            onClick: () => i(O.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: O.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${oe > 0 ? "has-selected" : ""}`, children: [
                oe,
                "/",
                W
              ] })
            ]
          },
          O.id
        );
      }) })
    ] })),
    (!S || E) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${S ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
            onClick: () => m("all"),
            children: [
              "All (",
              x,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "selected" ? "active" : ""}`,
            onClick: () => m("selected"),
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
            onClick: () => m("unselected"),
            children: [
              "Unsel (",
              C,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "gaps" ? "active" : ""}`,
            onClick: () => m("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "audio" ? "active" : ""}`,
            onClick: () => m("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !S && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: D, children: [
          "+ ",
          g
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: k, children: [
          "✕ ",
          M
        ] })
      ] })
    ] })
  ] });
}
function hx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: i = "table"
}) {
  if (r === 0) return null;
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), h = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, m = (x) => {
    if (x === n) return !0;
    const y = Math.min(n, r), C = Math.min(x, r), b = Math.ceil(r / n), D = Math.ceil(r / x);
    return y !== C || b !== D;
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: h.map((x) => {
        const y = n === x, C = !m(x);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${C ? "redundant-disabled" : ""}`,
            disabled: C,
            onClick: () => o(x),
            title: C ? `All stations already fit on screen (Total: ${r})` : `Show ${x} per page`,
            children: x
          },
          x
        );
      }) })
    ] })
  ] });
}
function fx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, i] = u.useState(!1), a = u.useRef(null);
  u.useEffect(() => {
    const x = (y) => {
      a.current && !a.current.contains(y.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [o]);
  const c = u.useMemo(() => {
    const x = new Map(t.map((y) => [y.id, y]));
    return e.map((y) => x.get(y) || { id: y, hostname: `Station ${y}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const h = c.slice(0, l), v = c.slice(l), m = v.length > 0;
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
      h.map((x) => {
        const y = x.displayName || x.hostname || x.name || x.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: y, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: y }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (C) => {
                C.stopPropagation(), n(x.id);
              },
              title: `Remove ${y}`,
              children: "✕"
            }
          )
        ] }, x.id);
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((x) => {
            const y = x.displayName || x.hostname || x.name || x.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: y, children: y }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(x.id),
                  title: `Remove ${y}`,
                  children: "✕"
                }
              )
            ] }, x.id);
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
const jp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function Vd(e, t, n = jp) {
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
function px(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (i) => String(i).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function mx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function gx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = jp) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), h = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? mx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = Vd(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: i,
      audioChannels: a,
      resolution: c,
      fps: h,
      fileSize: v,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const m = l, x = l + o, y = [];
  for (const N of t) {
    const T = Math.max(N.startEpoch, m), g = Math.min(N.endEpoch, x);
    g > T && y.push({ startEpoch: T, endEpoch: g });
  }
  y.sort((N, T) => N.startEpoch - T.endEpoch);
  const C = [];
  for (const N of y)
    if (C.length === 0)
      C.push({ ...N });
    else {
      const T = C[C.length - 1];
      N.startEpoch <= T.endEpoch + 1e3 ? T.endEpoch = Math.max(T.endEpoch, N.endEpoch) : C.push({ ...N });
    }
  let b = 0;
  for (const N of C)
    b += N.endEpoch - N.startEpoch;
  const D = o > 0 ? b / o * 100 : 0, k = D > 0 && D < 1 ? Number(D.toFixed(1)) : Math.min(100, Math.round(D)), f = [];
  let d = m, S = 0;
  for (const N of C) {
    if (N.startEpoch > d + 2e3) {
      const M = (N.startEpoch - d) / o * 100, O = (d - m) / o * 100;
      f.push({
        type: "gap",
        startPct: Math.max(0, O),
        widthPct: Math.min(100, M)
      }), S++;
    }
    const T = (N.endEpoch - N.startEpoch) / o * 100, g = (N.startEpoch - m) / o * 100;
    f.push({
      type: "rec",
      startPct: Math.max(0, g),
      widthPct: Math.min(100, T)
    }), d = N.endEpoch;
  }
  if (d < x - 2e3) {
    const N = (x - d) / o * 100, T = (d - m) / o * 100;
    f.push({
      type: "gap",
      startPct: Math.max(0, T),
      widthPct: Math.min(100, N)
    }), S++;
  }
  const E = S > 0 || k < 100, j = Vd(k, E, r);
  return {
    coveragePct: k,
    recordedDuration: px(b),
    totalRecordedMs: b,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: h,
    fileSize: v,
    hasGaps: E,
    gapsCount: S,
    trafficStatus: j,
    segments: f.length > 0 ? f : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const xx = Object.freeze([]), yx = 12;
function vx({
  isOpen: e,
  onToggle: t,
  onClose: n,
  allStations: r = [],
  selectedStationIds: l = [],
  onToggleStation: o,
  onUpdateSelections: i,
  isInitialSetup: a,
  isLoadingStations: c = !1,
  isLoadingSegments: h = !1,
  onApply: v,
  onOpenRangeModal: m,
  systemTabs: x = xx,
  recordingSegments: y = {},
  baseEpochMs: C = 0,
  durationMs: b = 0
}) {
  const [D, k] = u.useState([]), [f, d] = u.useState("all"), [S, E] = u.useState(""), [j, N] = u.useState(!0), [T, g] = u.useState("all"), [M, O] = u.useState(null), [U, A] = u.useState(!1), [W, oe] = u.useState(15), [B, re] = u.useState(8), [I, R] = u.useState(1), _ = u.useRef(!1), K = u.useRef(null), F = c && r.length === 0, te = r.length === 0 && !c;
  let Z = "is-closed";
  a || te || F ? Z = "is-full-width" : e && (Z = "is-open"), u.useLayoutEffect(() => {
    const J = () => {
      if (!K.current) return;
      const he = K.current.clientHeight;
      if (he <= 0) return;
      const We = K.current.querySelector(".station-row, .hub-table-row"), He = We ? We.offsetHeight : 40;
      if (He > 0) {
        const Ee = Math.floor(he / He) - 2, Be = [5, 10, 15, 20, 25, 30].filter((It) => It <= Ee).pop() || 5;
        oe(Be);
      }
      const Fe = K.current.clientWidth;
      if (Fe > 0) {
        const Be = Math.max(1, Math.floor((Fe + 12) / 252)), Ge = Math.max(1, Math.floor((he + 12) / (175 + 12))), Et = Math.max(Be * Ge, Be);
        re(Et);
      }
    };
    J(), window.addEventListener("resize", J);
    const pe = new ResizeObserver(J);
    return K.current && pe.observe(K.current), () => {
      window.removeEventListener("resize", J), pe.disconnect();
    };
  }, [M, r.length]), u.useEffect(() => {
    if (x && x.length > 0) {
      k(x);
      return;
    }
    if (_.current || !e && !a) return;
    _.current = !0;
    let J = !0;
    return (async () => {
      A(!0);
      try {
        const he = await fetch("/api/v1/dashboard/tabs");
        if (he.ok && J) {
          const We = await he.json();
          Array.isArray(We) && k(We);
        }
      } catch (he) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", he);
      } finally {
        J && A(!1);
      }
    })(), () => {
      J = !1;
    };
  }, [e, a, x]);
  const G = u.useMemo(() => {
    const J = D.length > 0 ? D : x;
    if (J && J.length > 0) {
      const pe = J.map((he) => {
        const We = he.hostnames || he.assignedHostnames || he.stations || he.stationIds || [], He = r.filter((Fe) => {
          const Ee = (Fe.hostname || Fe.name || "").trim().toLowerCase();
          return We.some((ot) => typeof ot == "string" ? ot.trim().toLowerCase() === Ee || Ee.includes(ot.trim().toLowerCase()) : (ot.hostname || ot.name || "").trim().toLowerCase() === Ee);
        }).map((Fe) => Fe.id);
        return {
          id: String(he.id || he.tabId || he.name),
          name: he.name || "Tab",
          stationIds: He
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((he) => he.id) },
        ...pe.filter((he) => he.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((pe) => pe.id) }];
  }, [D, x, r]), le = u.useMemo(() => G.find((J) => J.id === f) || G[0], [G, f]), ze = u.useMemo(() => !le || le.id === "all" ? r.map((J) => J.id) : le.stationIds || [], [le, r]), Le = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((J) => J.isLoaded || J.segments && J.segments.length > 0).length : r.filter((J) => y[J.id] !== void 0 || J.isLoaded).length, [r, y]), je = u.useMemo(() => !!(h || c && r.length > 0 || r.length > 0 && Le < r.length && Object.keys(y).length > 0), [h, c, r.length, Le, y]), X = u.useMemo(() => {
    const J = /* @__PURE__ */ new Map(), pe = { baseEpochMs: C, durationMs: b };
    for (const he of r) {
      const He = !(y && y[he.id] !== void 0 || he.isLoaded === !0 || he.segments && he.segments.length > 0) && (je || c || h), Fe = y && y[he.id] || he.segments || [], Ee = gx(he, Fe, pe);
      J.set(he.id, {
        ...Ee,
        hasAudio: he.hasAudio !== void 0 ? he.hasAudio : Ee == null ? void 0 : Ee.hasAudio,
        audioLabel: he.audioLabel || (he.hasAudio ? "AAC" : (Ee == null ? void 0 : Ee.audioLabel) || "NONE"),
        audioChannels: he.audioChannels ? he.audioChannels === 1 ? "Mono" : "Stereo" : Ee == null ? void 0 : Ee.audioChannels,
        feedSpec: he.feedSpec || (Ee == null ? void 0 : Ee.feedSpec) || `${he.resolution || "1080p"} • ${he.fps || 30}fps`,
        resolution: he.resolution || (Ee == null ? void 0 : Ee.resolution) || "1080p",
        fps: he.fps || (Ee == null ? void 0 : Ee.fps) || 30,
        isLoading: He
      });
    }
    return J;
  }, [r, y, C, b, je, c, h]), ie = u.useMemo(() => r.filter((J) => {
    const pe = X.get(J.id), he = y && y[J.id] && y[J.id].length > 0 || J.segments && J.segments.length > 0, We = pe && (pe.coveragePct > 0 || pe.totalRecordedMs > 0), He = typeof J.recordingsCount == "number" && J.recordingsCount > 0;
    return pe && !pe.isLoading ? We || he : He || he;
  }), [r, X, y]), ee = u.useMemo(() => ie.filter((J) => {
    if (le.id !== "all" && !ze.includes(J.id) || !(J.displayName || J.hostname || J.name || "").toLowerCase().includes(S.toLowerCase())) return !1;
    const he = l.includes(J.id), We = X.get(J.id);
    return T === "selected" ? he : T === "unselected" ? !he : T === "gaps" ? We == null ? void 0 : We.hasGaps : T === "audio" ? We == null ? void 0 : We.hasAudio : !0;
  }).sort((J, pe) => j ? (J.displayName || J.hostname || "").localeCompare(pe.displayName || pe.hostname || "") : 0), [ie, le, ze, S, T, l, j, X]), se = u.useMemo(() => M !== null ? M : ee.length > yx ? "table" : "grid", [M, ee.length]), be = se === "table" ? W : B, z = Math.max(1, Math.ceil(ee.length / be));
  u.useEffect(() => {
    R(1);
  }, [f, S, T, se]), u.useEffect(() => {
    I > z && R(z);
  }, [z, I]);
  const ne = u.useMemo(() => {
    if (Z !== "is-full-width") return ee;
    const J = (I - 1) * be;
    return ee.slice(J, J + be);
  }, [ee, I, be, Z]), _e = () => {
    if (!i) return;
    const J = le.id === "all" ? ee.map((pe) => pe.id) : ze;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...J])));
  }, Oe = () => {
    if (!i) return;
    const J = new Set(
      le.id === "all" ? ee.map((pe) => pe.id) : ze
    );
    i(l.filter((pe) => !J.has(pe)));
  }, me = ze.filter((J) => l.includes(J)).length, de = ee.filter((J) => l.includes(J.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${Z}`, children: [
    Z !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => Z === "is-closed" && t && t(), children: [
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
              Le,
              "/",
              r.length
            ] })
          ] })
        ] }),
        Z === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      Z === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: _e,
            disabled: ee.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                ee.length,
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
            onClick: Oe,
            disabled: de === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                de,
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
          style: { width: `${r.length > 0 ? Le / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: F ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
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
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: m, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: Z === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      Z === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      Z === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${je ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: je ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: je ? `ANALYZING TIMELINE ARCHIVES • ${Le} OF ${ie.length} STATIONS SYNCED (${ie.length > 0 ? Math.min(100, Math.round(Le / ie.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${ie.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: je ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(Le / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        dx,
        {
          searchTerm: S,
          onSearchChange: E,
          sortAlpha: j,
          onToggleSort: () => N(!j),
          effectiveTabs: G,
          selectedTabId: f,
          onSelectTab: (J) => {
            d(J), O(null);
          },
          isLoadingTabs: U,
          allStations: ie,
          selectedStationIds: l,
          filterMode: T,
          onFilterModeChange: g,
          filteredCount: ee.length,
          selectedInTabCount: me,
          unselectedInTabCount: ze.length - me,
          activeTabName: le.name,
          onSelectAllInScope: _e,
          onClearInScope: Oe,
          viewMode: se,
          onViewModeChange: Z === "is-full-width" ? O : null,
          isDrawerMode: Z !== "is-full-width"
        }
      ),
      Z === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: _e,
              disabled: ee.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  ee.length,
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
              onClick: Oe,
              disabled: de === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  de,
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
      Z === "is-full-width" && se === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${Z === "is-full-width" ? se === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: ne.map((J) => {
            const pe = l.includes(J.id), he = X.get(J.id);
            return Z === "is-full-width" ? se === "grid" ? /* @__PURE__ */ s.jsx(
              ax,
              {
                station: J,
                isSelected: pe,
                onToggle: o,
                meta: he
              },
              J.id
            ) : /* @__PURE__ */ s.jsx(
              cx,
              {
                station: J,
                isSelected: pe,
                onToggle: o,
                meta: he
              },
              J.id
            ) : /* @__PURE__ */ s.jsx(
              ux,
              {
                station: J,
                isSelected: pe,
                onToggle: o,
                meta: he
              },
              J.id
            );
          })
        }
      ),
      Z === "is-full-width" && /* @__PURE__ */ s.jsx(
        hx,
        {
          currentPage: I,
          totalPages: z,
          pageSize: be,
          totalItems: ee.length,
          onPageChange: R,
          onPageSizeChange: (J) => {
            se === "table" ? oe(J) : re(J), R(1);
          },
          viewMode: se
        }
      ),
      Z === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          fx,
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
const Mn = (e) => String(e).padStart(2, "0"), Nx = [
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
], kx = [
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
function Yd({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [i, a] = u.useState(e), [c, h] = u.useState(null), v = u.useRef(null), { h: m, m: x, s: y } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const g = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, g[0] || 0)),
      m: Math.min(59, Math.max(0, g[1] || 0)),
      s: Math.min(59, Math.max(0, g[2] || 0))
    };
  }, [e]), C = u.useMemo(() => m >= 12, [m]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const b = () => {
    const M = i.replace(/[^0-9:]/g, "").trim().split(":").filter((oe) => oe.length > 0);
    let O = 0, U = 0, A = 0;
    M.length >= 1 && (O = Math.min(23, Math.max(0, parseInt(M[0], 10) || 0))), M.length >= 2 && (U = Math.min(59, Math.max(0, parseInt(M[1], 10) || 0))), M.length >= 3 && l && (A = Math.min(59, Math.max(0, parseInt(M[2], 10) || 0)));
    const W = l ? `${Mn(O)}:${Mn(U)}:${Mn(A)}` : `${Mn(O)}:${Mn(U)}`;
    a(W), t && t(W, { h: O, m: U, s: A });
  }, D = (g) => {
    let M = m;
    g === "AM" && m >= 12 ? M = m - 12 : g === "PM" && m < 12 && (M = m + 12);
    const O = l ? `${Mn(M)}:${Mn(x)}:${Mn(y)}` : `${Mn(M)}:${Mn(x)}`;
    a(O), t && t(O, { h: M, m: x, s: y });
  }, k = u.useCallback((g, M) => {
    if (!v.current) return null;
    const O = v.current.getBoundingClientRect(), U = O.left + O.width / 2, A = O.top + O.height / 2, W = g.clientX - U, oe = g.clientY - A;
    let B = Math.atan2(oe, W) * 180 / Math.PI + 90;
    if (B < 0 && (B += 360), M === "hours") {
      const re = Math.round(B / 30) % 12;
      return C ? re === 0 ? 12 : re + 12 : re === 0 ? 0 : re;
    }
    return Math.round(B / 6) % 60;
  }, [C]), f = u.useCallback((g, M) => {
    let O = m, U = x, A = y;
    g === "hours" ? O = M : g === "minutes" ? U = M : g === "seconds" && (A = M);
    const W = l ? `${Mn(O)}:${Mn(U)}:${Mn(A)}` : `${Mn(O)}:${Mn(U)}`;
    a(W), t && t(W, { h: O, m: U, s: A });
  }, [m, x, y, l, t]), d = (g, M) => {
    M.preventDefault(), M.stopPropagation(), h(g);
    const O = k(M, g);
    O !== null && f(g, O);
  };
  u.useEffect(() => {
    if (!c) return;
    const g = (O) => {
      const U = k(O, c);
      U !== null && f(c, U);
    }, M = () => {
      h(null);
    };
    return window.addEventListener("pointermove", g), window.addEventListener("pointerup", M), () => {
      window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", M);
    };
  }, [c, k, f]);
  const S = u.useMemo(() => m % 12 * 30, [m]), E = u.useMemo(() => x % 60 * 6, [x]), j = u.useMemo(() => y % 60 * 6, [y]), N = C ? kx : Nx, T = u.useMemo(() => {
    const g = [];
    for (let M = 0; M < 60; M++) {
      const O = (M * 6 - 90) * (Math.PI / 180), U = M % 5 === 0, A = 104, W = U ? 93 : 98;
      g.push({
        index: M,
        x1: 110 + W * Math.cos(O),
        y1: 110 + W * Math.sin(O),
        x2: 110 + A * Math.cos(O),
        y2: 110 + A * Math.sin(O),
        isMajor: U
      });
    }
    return g;
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
              className: `btn-period ${C ? "" : "active"}`,
              onClick: () => D("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${C ? "active" : ""}`,
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
            value: i,
            onChange: (g) => a(g.target.value),
            onBlur: b,
            onKeyDown: (g) => {
              g.key === "Enter" && g.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: T.map((g) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: g.x1,
              y1: g.y1,
              x2: g.x2,
              y2: g.y2,
              className: `dial-tick ${g.isMajor ? "major" : "minor"}`
            },
            `tick-${g.index}`
          )) }),
          N.map((g) => {
            const M = (g.angle - 90) * (Math.PI / 180), O = 76, U = 110 + O * Math.cos(M), A = 110 + O * Math.sin(M), W = m === g.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: U,
                y: A,
                className: `dial-num ${W ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: g.label
              },
              `dial-h-${g.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
              transform: `rotate(${S} 110 110)`,
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
                    onPointerDown: (g) => d("hours", g)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
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
                    onPointerDown: (g) => d("minutes", g)
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
                    onPointerDown: (g) => d("seconds", g)
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
const _o = 7 * 24 * 60 * 60 * 1e3, Ut = (e) => String(e).padStart(2, "0");
function wx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [h, v] = u.useState(""), [m, x] = u.useState("00:00:00"), [y, C] = u.useState("00:00:00"), [b, D] = u.useState(() => /* @__PURE__ */ new Date()), [k, f] = u.useState(null), [d, S] = u.useState([]), [E, j] = u.useState(!1), [N, T] = u.useState(""), [g, M] = u.useState(1), [O, U] = u.useState(2), [A, W] = u.useState(null), oe = u.useCallback(() => {
    try {
      const z = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (z) {
        const ne = JSON.parse(z);
        Array.isArray(ne) && S(ne);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((z) => z.ok ? z.json() : null).then((z) => {
      Array.isArray(z) && z.length > 0 && S(z);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    oe();
    let z = n == null ? void 0 : n.startEpochMs, ne = n == null ? void 0 : n.endEpochMs;
    if (!z || isNaN(z))
      if (n != null && n.start) {
        const me = String(n.start).replace(" ", "T"), de = new Date(me).getTime();
        z = isNaN(de) ? Date.now() - 24 * 3600 * 1e3 : de;
      } else
        ne = Date.now(), z = ne - 24 * 3600 * 1e3;
    if (!ne || isNaN(ne))
      if (n != null && n.end) {
        const me = String(n.end).replace(" ", "T"), de = new Date(me).getTime();
        ne = isNaN(de) ? Date.now() : de;
      } else
        ne = z + 24 * 3600 * 1e3;
    W(null);
    const _e = Er(z, o), Oe = Er(ne, o);
    c(`${_e.year}-${Ut(_e.month)}-${Ut(_e.day)}`), v(`${Oe.year}-${Ut(Oe.month)}-${Ut(Oe.day)}`), x(`${Ut(_e.hour)}:${Ut(_e.minute)}:${Ut(_e.second)}`), C(`${Ut(Oe.hour)}:${Ut(Oe.minute)}:${Ut(Oe.second)}`), D(new Date(Date.UTC(_e.year, _e.month - 1, 1)));
  }, [e, n, o, oe]);
  const B = u.useCallback(() => {
    a && !h && v(a);
  }, [a, h]), re = h || a, I = u.useMemo(() => a ? `${a}T${m}` : "", [a, m]), R = u.useMemo(() => re ? `${re}T${y}` : "", [re, y]), _ = u.useMemo(() => {
    const z = {};
    return d.forEach((ne) => {
      const _e = ne.startTime || ne.start, Oe = ne.endTime || ne.end || _e;
      if (!_e) return;
      const me = String(_e).substring(0, 10), de = String(Oe).substring(0, 10), [J, pe, he] = me.split("-").map(Number), [We, He, Fe] = de.split("-").map(Number);
      if (isNaN(J) || isNaN(pe) || isNaN(he) || isNaN(We) || isNaN(He) || isNaN(Fe)) return;
      let Ee = new Date(Date.UTC(J, pe - 1, he));
      const ot = new Date(Date.UTC(We, He - 1, Fe));
      for (; Ee.getTime() <= ot.getTime(); ) {
        const Be = `${Ee.getUTCFullYear()}-${Ut(Ee.getUTCMonth() + 1)}-${Ut(Ee.getUTCDate())}`;
        z[Be] || (z[Be] = []), z[Be].push(ne), Ee.setUTCDate(Ee.getUTCDate() + 1);
      }
    }), z;
  }, [d]), K = async (z, ne) => {
    if (ne && ne.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const _e = d.filter((Oe) => (Oe.id || Oe.startTime) !== z);
    S(_e);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(_e)), localStorage.setItem("itb_bookmarks", JSON.stringify(_e)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: _e }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${z}`, { method: "DELETE" });
    } catch {
    }
  }, F = (z) => {
    const ne = z.startTime || z.start, _e = z.endTime || z.end;
    if (!ne || !_e) return;
    const Oe = ne.substring(0, 10), me = ne.includes("T") ? ne.split("T")[1].substring(0, 8) : "00:00:00", de = _e.substring(0, 10), J = _e.includes("T") ? _e.split("T")[1].substring(0, 8) : "23:59:59";
    c(Oe), v(de), x(me), C(J);
    const [pe, he] = Oe.split("-").map(Number);
    D(new Date(Date.UTC(pe, he - 1, 1))), j(!1);
  }, te = (z) => {
    l ? (l(z), t && t()) : F(z);
  }, Z = u.useMemo(() => {
    if (o === "UTC" || !I.includes("T")) return { isAmbiguous: !1 };
    const [z, ne] = I.split("T");
    return Ei(z, ne);
  }, [I, o]), G = u.useMemo(() => {
    if (o === "UTC" || !R.includes("T")) return { isAmbiguous: !1 };
    const [z, ne] = R.split("T");
    return Ei(z, ne);
  }, [R, o]), le = u.useMemo(() => {
    if (!a || !re) return null;
    const z = Nc(a, m, o, g), ne = Nc(re, y, o, O);
    return z === null || ne === null || isNaN(z) || isNaN(ne) ? null : { startEpoch: z, endEpoch: ne, durationMs: ne - z };
  }, [a, m, re, y, o, g, O]), ze = u.useMemo(() => !le || le.durationMs <= 0 ? [] : hp(le.startEpoch, le.endEpoch), [le]), Le = u.useMemo(() => {
    if (!le || le.durationMs <= 0) return "0h";
    const z = le.durationMs / (1e3 * 60 * 60);
    return z >= 24 ? `${(z / 24).toFixed(1)}d (${z.toFixed(0)}h)` : `${z.toFixed(1)}h`;
  }, [le]), je = u.useMemo(() => {
    const z = b.getUTCFullYear(), ne = b.getUTCMonth(), _e = new Date(Date.UTC(z, ne, 1)).getUTCDay(), Oe = new Date(Date.UTC(z, ne + 1, 0)).getUTCDate(), me = [];
    for (let de = 0; de < _e; de++) me.push(null);
    for (let de = 1; de <= Oe; de++) me.push(`${z}-${Ut(ne + 1)}-${Ut(de)}`);
    return me;
  }, [b]), X = (z) => {
    if (z) {
      if (W(null), !a || a && h)
        c(z), v("");
      else if (a && !h)
        if (z < a)
          c(z), v("");
        else {
          const ne = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(z + "T00:00:00Z")).getTime() - ne > _o) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const Oe = new Date(ne + _o);
            v(`${Oe.getUTCFullYear()}-${Ut(Oe.getUTCMonth() + 1)}-${Ut(Oe.getUTCDate())}`);
          } else
            v(z);
        }
    }
  }, ie = (z, ne) => {
    W(ne);
    const _e = Date.now(), Oe = _e - z, me = Er(Oe, o), de = Er(_e, o);
    c(`${me.year}-${Ut(me.month)}-${Ut(me.day)}`), v(`${de.year}-${Ut(de.month)}-${Ut(de.day)}`), x(`${Ut(me.hour)}:${Ut(me.minute)}:${Ut(me.second)}`), C(`${Ut(de.hour)}:${Ut(de.minute)}:${Ut(de.second)}`), D(new Date(Date.UTC(me.year, me.month - 1, 1)));
  }, ee = () => {
    if (B(), !le || isNaN(le.startEpoch) || isNaN(le.endEpoch)) {
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
      start: I,
      end: R,
      startEpochMs: le.startEpoch,
      endEpochMs: le.endEpoch,
      durationMs: le.durationMs,
      timeMode: o
    }), t && t();
  }, se = u.useMemo(() => {
    if (!N.trim()) return d;
    const z = N.toLowerCase();
    return d.filter(
      (ne) => (ne.title || ne.name || "").toLowerCase().includes(z) || (ne.startTime || "").includes(z)
    );
  }, [d, N]);
  if (!e) return null;
  const be = o === "UTC";
  return Ps.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (z) => z.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${be ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: be ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${be ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${be ? "active" : ""}`,
                  onClick: () => i("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${E ? "active" : ""}`,
                onClick: () => j(!E),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: d.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      ze.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: ze.map((z) => `${z.description} (${z.labelBefore} ➔ ${z.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "7d" ? "active" : ""}`,
            onClick: () => ie(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => ie(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => ie(24 * 3600 * 1e3, "24h"),
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
            onClick: () => ie(8 * 3600 * 1e3, "8h"),
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
                value: N,
                onChange: (z) => T(z.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            se.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: se.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : se.map((z) => {
          var de;
          const ne = z.id || z.startTime, _e = z.title || z.name || "Untitled Mission", Oe = (z.startTime || "").replace("T", " "), me = (z.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => F(z), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: _e }),
                z.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  z.cutStationName
                ] }),
                ((de = z.stationIds) == null ? void 0 : de.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  z.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                Oe,
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
                  onClick: (J) => {
                    J.stopPropagation(), F(z);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (J) => {
                    J.stopPropagation(), te(z);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (J) => K(ne, J),
                  children: "✕"
                }
              )
            ] })
          ] }, ne);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: b.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((z) => new Date(Date.UTC(z.getUTCFullYear(), z.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => D((z) => new Date(Date.UTC(z.getUTCFullYear(), z.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: je.map((z, ne) => {
            if (!z) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${ne}`);
            const _e = parseInt(z.split("-")[2], 10), Oe = z === a, me = z === (h || a), de = h || k, J = a && de && z > a && z < de, pe = _[z], he = !!(pe && pe.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${Oe ? "start-edge" : ""} ${me ? "end-edge" : ""} ${J ? "in-range" : ""} ${he ? "has-bookmark" : ""}`,
                onClick: () => X(z),
                onMouseEnter: () => !h && a && f(z),
                onMouseLeave: () => f(null),
                title: he ? `${pe.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: _e }),
                  he && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (We) => {
                        We.stopPropagation(), j(!0), T(z);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        pe.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: pe.length })
                      ]
                    }
                  )
                ]
              },
              z
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
              /* @__PURE__ */ s.jsx("strong", { children: h || a || "--" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: B, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Yd,
            {
              label: "START TIME (FROM)",
              value: m,
              onChange: (z) => {
                B(), x(z), W(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Yd,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (z) => {
                B(), C(z), W(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (Z.isAmbiguous || G.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        Z.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
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
                className: g === 1 ? "active" : "",
                onClick: () => M(1),
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
                className: g === 2 ? "active" : "",
                onClick: () => M(2),
                children: [
                  "2nd Occurrence (",
                  Z.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        G.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            G.transition.labelBefore,
            " / ",
            G.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 1 ? "active" : "",
                onClick: () => U(1),
                children: [
                  "1st Occurrence (",
                  G.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: O === 2 ? "active" : "",
                onClick: () => U(2),
                children: [
                  "2nd Occurrence (",
                  G.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: le && le.durationMs > _o ? "#f43f5e" : "#22d3ee" }, children: Le }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: ze.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: ee, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Ep = "extractor_incident_bookmarks_fallback", jx = ["itb_studio_bookmarks", "itb_bookmarks", Ep];
function Ex({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, h] = u.useState(""), [v, m] = u.useState(!1), [x, y] = u.useState(!1), [C, b] = u.useState(null), [D, k] = u.useState(""), f = u.useCallback((A) => {
    jx.forEach((W) => {
      try {
        localStorage.setItem(W, JSON.stringify(A));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: A }));
  }, []), d = u.useCallback(async () => {
    m(!0);
    try {
      const A = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (A.ok) {
        const W = await A.json(), oe = Array.isArray(W) ? W : [];
        a(oe), f(oe);
        return;
      }
    } catch (A) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", A);
    } finally {
      m(!1);
    }
    try {
      const A = localStorage.getItem(Ep) || localStorage.getItem("itb_studio_bookmarks");
      A && a(JSON.parse(A));
    } catch {
    }
  }, [f]);
  if (u.useEffect(() => {
    e && d();
  }, [e, d]), !e) return null;
  const S = async () => {
    var Z, G, le, ze, Le, je;
    if (!c.trim() || x) return;
    const A = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((Z = n == null ? void 0 : n.timeRange) != null && Z.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), W = (n == null ? void 0 : n.inPointMs) ?? 0, oe = (n == null ? void 0 : n.outPointMs) ?? (((G = n == null ? void 0 : n.timeRange) == null ? void 0 : G.durationMs) || 0), B = (n == null ? void 0 : n.playheadMs) ?? W, re = A + W, I = A + oe, R = A + B, _ = (n == null ? void 0 : n.selectedStationIds) || [], K = (n == null ? void 0 : n.selectedStationNames) || [], F = ((le = n == null ? void 0 : n.allStationIds) == null ? void 0 : le.length) > 0 ? n.allStationIds : _, te = {
      title: c.trim(),
      startTime: ((ze = n == null ? void 0 : n.timeRange) == null ? void 0 : ze.start) || "",
      endTime: ((Le = n == null ? void 0 : n.timeRange) == null ? void 0 : Le.end) || "",
      baseEpochMs: A,
      timelineBaseEpochMs: A,
      inPointMs: W,
      outPointMs: oe,
      playheadMs: B,
      inEpochMs: re,
      outEpochMs: I,
      playheadEpochMs: R,
      selectedStationIds: _,
      selectedStationNames: K,
      allStationIds: F,
      stationIds: _.length > 0 ? _ : F,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const X = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(te)
      });
      if (X.ok) {
        const ie = await X.json(), se = [{
          ...te,
          ...ie.bookmark || {},
          inEpochMs: re,
          outEpochMs: I,
          playheadEpochMs: R,
          selectedStationIds: _,
          selectedStationNames: K,
          allStationIds: F,
          id: ((je = ie.bookmark) == null ? void 0 : je.id) || ie.id || `bm_${Date.now()}`
        }, ...i];
        a(se), f(se), h("");
      } else
        throw new Error(`Server returned ${X.status}`);
    } catch (X) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", X);
      const ee = [{
        ...te,
        inEpochMs: re,
        outEpochMs: I,
        playheadEpochMs: R,
        selectedStationIds: _,
        selectedStationNames: K,
        allStationIds: F,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(ee), f(ee), h("");
    } finally {
      y(!1);
    }
  }, E = async (A, W) => {
    if (W.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const oe = i.filter((B) => (B.id || B.startTime) !== A);
    a(oe), f(oe);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, { method: "DELETE" });
    } catch (B) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", B);
    }
  }, j = (A, W) => {
    W.stopPropagation(), b(A.id || A.startTime), k(A.title || A.name || "");
  }, N = async (A, W) => {
    if (W && W.stopPropagation(), !D.trim()) return;
    const oe = i.find((I) => (I.id || I.startTime) === A), B = D.trim(), re = i.map(
      (I) => (I.id || I.startTime) === A ? { ...I, title: B, name: B } : I
    );
    a(re), f(re), b(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...oe, title: B })
      });
    } catch (I) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", I);
    }
  }, T = (A) => {
    A.stopPropagation(), b(null);
  }, g = (A) => !A || isNaN(A) ? "--:--:--" : vt(A, o), M = (A) => {
    const W = A.startTime || A.StartTime, oe = A.endTime || A.EndTime;
    if (!W) return "--";
    const B = String(W).replace("T", " ").substring(0, 19), re = oe ? String(oe).replace("T", " ").substring(0, 19) : B;
    return `${B} ➔ ${re}`;
  }, O = (A) => {
    let W = A.inEpochMs || A.InEpochMs, oe = A.outEpochMs || A.OutEpochMs;
    if (!W || !oe) {
      const B = A.timelineBaseEpochMs || A.baseEpochMs || (A.startTime ? new Date(String(A.startTime).replace(" ", "T")).getTime() : 0), re = A.inPointMs ?? A.InPointMs, I = A.outPointMs ?? A.OutPointMs;
      B && typeof re == "number" && typeof I == "number" && (re > 0 || I > 0) && (W = B + re, oe = B + I);
    }
    if (W && oe && !isNaN(W) && !isNaN(oe) && W > 0) {
      const B = g(W), re = g(oe), I = Math.max(0, oe - W), R = Math.floor(I / 6e4), _ = Math.floor(R / 60), K = R % 60, F = _ > 0 ? `${_}h ${K}m` : `${R}m`;
      return { timeText: `${B} ➔ ${re}`, duration: F };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, U = (A) => {
    const W = A.selectedStationNames || [], oe = A.selectedStationIds || A.cutStationIds || A.stationIds || [];
    return W.length > 0 ? W.join(", ") : oe.length > 0 ? oe.join(", ") : A.cutStationName ? A.cutStationName : A.activeStationName ? A.activeStationName : "All Stations in Scope";
  };
  return Ps.createPortal(
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
              onChange: (A) => h(A.target.value),
              onKeyDown: (A) => A.key === "Enter" && S(),
              disabled: x,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !x ? "active" : ""}`,
            onClick: S,
            disabled: !c.trim() || x,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: x ? "SAVING..." : "SAVE SNAPSHOT" })
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
      ] }) : i.map((A) => {
        var R, _, K;
        const W = A.id || A.startTime, oe = C === W, B = O(A), re = U(A), I = ((R = A.allStationIds) == null ? void 0 : R.length) || ((_ = A.selectedStationIds) == null ? void 0 : _.length) || ((K = A.stationIds) == null ? void 0 : K.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${oe ? "is-editing" : ""}`,
            onClick: () => {
              oe || (r && r(A), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                oe ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (F) => F.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: D,
                      onChange: (F) => k(F.target.value),
                      onKeyDown: (F) => {
                        F.key === "Enter" && N(W, F), F.key === "Escape" && T(F);
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
                        onClick: (F) => N(W, F),
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
                    /* @__PURE__ */ s.jsx("strong", { children: M(A) })
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
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: B.timeText }),
                    B.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      B.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${re}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: re })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (F) => F.stopPropagation(), children: [
                !oe && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (F) => j(A, F),
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
                    onClick: (F) => E(W, F),
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
function Cx(e) {
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
function Sx(e, t) {
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
function bx({
  station: e,
  baseEpochMs: t = 0,
  totalDurationMs: n = 36e5,
  playheadMs: r = 0,
  setPlayheadMs: l,
  isPlaying: o = !1,
  setIsPlaying: i,
  playbackSpeed: a = 1,
  _timeMode: c = "LOCAL",
  inPointMs: h = 0,
  outPointMs: v = 36e5,
  isLooping: m = !0,
  recordingSegments: x = {},
  globalGaps: y = [],
  showWatermark: C = !0,
  directorPlan: b,
  onOverrideDisplay: D,
  onResetOverride: k,
  viewMode: f,
  onViewModeChange: d,
  onOpenFullscreen: S,
  isPipSwapped: E,
  onPipSwapChange: j,
  className: N = ""
}) {
  const T = u.useRef(null), g = u.useRef(null), M = u.useRef(null), O = u.useRef(r), U = u.useRef(r), A = u.useRef(r), W = u.useRef(!1), oe = u.useRef(null), B = u.useRef(o), re = u.useRef(!1);
  O.current = r;
  const I = e == null ? void 0 : e.id, R = e && (e.hostname || e.name) || "", _ = u.useMemo(() => {
    var Ce, $e, Qe, qe;
    const q = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ce = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ce.displays) || (($e = e == null ? void 0 : e.displayTopology) == null ? void 0 : $e.Displays) || ((Qe = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Qe.Displays) || ((qe = e == null ? void 0 : e.topology) == null ? void 0 : qe.displays) || [];
    if (!Array.isArray(q) || q.length === 0) return [];
    const xe = q.length > 1 && q.every((Ve) => (Ve.X ?? Ve.x ?? 0) === 0 && (Ve.Y ?? Ve.y ?? 0) === 0);
    let Q = 0;
    return q.map((Ve, it) => {
      const wt = Ve.Width || Ve.width || 1920, ct = Ve.Height || Ve.height || 1080, ht = xe ? Q : Ve.X ?? Ve.x ?? it * wt, Ft = xe ? 0 : Ve.Y ?? Ve.y ?? 0;
      xe && (Q += wt);
      const St = (Ve.displayId ?? Ve.DisplayId ?? `mon-${it}`).toLowerCase(), Ot = Ve.displayNumber ?? Ve.DisplayNumber ?? it + 1, Bt = (Ve.displayName || Ve.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Ot}`, ls = !!(Ve.isPrimary ?? Ve.IsPrimary ?? it === 0);
      return {
        ...Ve,
        displayId: St,
        DisplayId: St,
        displayIndex: it,
        displayNumber: Ot,
        DisplayNumber: Ot,
        displayName: Bt,
        DisplayName: Bt,
        isPrimary: ls,
        IsPrimary: ls,
        x: ht,
        y: Ft,
        X: ht,
        Y: Ft,
        width: wt,
        height: ct,
        Width: wt,
        Height: ct
      };
    });
  }, [e]), K = _.length > 1, [F, te] = u.useState(() => {
    if (!K) return "mon-0";
    try {
      const q = localStorage.getItem("itb_solo_viewmode");
      if (q) return q;
    } catch {
    }
    return "canvas";
  }), G = K ? f !== void 0 ? f : F : "mon-0", le = u.useCallback((q) => {
    const xe = typeof q == "function" ? q(G) : q;
    te(xe);
    try {
      localStorage.setItem("itb_solo_viewmode", xe);
    } catch {
    }
    d && d(xe);
  }, [G, d]), [ze, Le] = u.useState(!1), je = E !== void 0 ? E : ze, X = u.useCallback((q) => {
    const xe = typeof q == "function" ? q(je) : q;
    Le(xe), j && j(xe);
  }, [je, j]), ie = u.useMemo(() => {
    const q = b || (e == null ? void 0 : e.directorPlan);
    if (!q || !q.segments || q.segments.length === 0) return null;
    const xe = t + r;
    return q.segments.find((Q) => {
      const Ce = Q.startEpochMs ?? Q.StartEpochMs ?? 0, $e = Q.endEpochMs ?? Q.EndEpochMs ?? 0;
      return xe >= Ce && xe <= $e;
    }) || q.segments[0];
  }, [b, e == null ? void 0 : e.directorPlan, t, r]), ee = u.useMemo(() => {
    var q, xe;
    if (!K) return "mon-0";
    if (G === "split" || G === "pip" || G === "canvas" || G === "all-displays") {
      const Q = (((q = _[0]) == null ? void 0 : q.displayId) ?? "mon-0").toLowerCase(), Ce = (((xe = _[1]) == null ? void 0 : xe.displayId) ?? "mon-1").toLowerCase();
      return je ? Ce : Q;
    }
    return G !== "director" ? G.toLowerCase() : ((ie == null ? void 0 : ie.targetDisplayId) ?? (ie == null ? void 0 : ie.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [K, G, ie, _, je]), se = u.useMemo(() => {
    var xe;
    if (!K) return null;
    const q = _.find((Q) => (Q.displayId ?? Q.DisplayId ?? "").toLowerCase() !== ee);
    return q ? (q.displayId ?? q.DisplayId).toLowerCase() : (((xe = _[1]) == null ? void 0 : xe.displayId) || "mon-1").toLowerCase();
  }, [K, _, ee]), be = u.useMemo(() => {
    const q = _.find((Q) => (Q.displayId ?? "").toLowerCase() === (ee || "").toLowerCase());
    if (q) return q.displayName || `Screen ${q.displayNumber || 1}`;
    if (ee === "mon-0" || ee === "0") return "Screen 1";
    if (ee === "mon-1" || ee === "1") return "Screen 2";
    const xe = (ee || "").match(/\d+/);
    if (xe) {
      const Q = parseInt(xe[0], 10);
      return `Screen ${(ee || "").startsWith("mon-") ? Q + 1 : Q}`;
    }
    return (ee || "Screen 1").toUpperCase();
  }, [_, ee]), z = u.useMemo(() => {
    const q = _.find((xe) => (xe.displayId ?? "").toLowerCase() === (se || "").toLowerCase());
    return q ? q.displayName || `Screen ${q.displayNumber || 2}` : "Screen 2";
  }, [_, se]), ne = u.useMemo(() => G !== "director" && G !== "split" && G !== "pip" && G !== "canvas" ? !0 : !!((ie == null ? void 0 : ie.isManualOverride) ?? (ie == null ? void 0 : ie.IsManualOverride)), [G, ie]), [_e, Oe] = u.useState({}), me = u.useRef(null), [de, J] = u.useState({ width: 0, height: 0 }), pe = u.useMemo(() => Cx(_), [_]);
  u.useEffect(() => {
    if (!K || G !== "canvas" && G !== "all-displays" || o)
      return;
    const q = () => {
      const Q = me.current;
      if (!Q) return;
      const Ce = 48, $e = 72, Qe = Math.max(100, Q.clientWidth - Ce), qe = Math.max(100, Q.clientHeight - $e), Ve = pe.totalWidth || 1920, it = pe.totalHeight || 1080, wt = Ve / it;
      let ct = Qe, ht = ct / wt;
      ht > qe && (ht = qe, ct = ht * wt), J({ width: Math.round(ct), height: Math.round(ht) });
    };
    q();
    const xe = new ResizeObserver(q);
    return me.current && xe.observe(me.current), () => xe.disconnect();
  }, [K, G, pe]);
  const he = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!K || G !== "canvas" && G !== "all-displays")
      return;
    let q = !0;
    const xe = new AbortController(), Q = he;
    _.forEach(($e, Qe) => {
      const qe = ($e.displayId ?? $e.DisplayId ?? `mon-${Qe}`).toLowerCase(), Ve = In.get(R, Q, qe);
      Ve ? Oe((it) => ({ ...it, [qe]: Ve })) : In.fetchFrame(R, Q, xe.signal, qe).then((it) => {
        q && it && Oe((wt) => ({ ...wt, [qe]: it }));
      });
    });
    const Ce = In.subscribe(($e, Qe, qe, Ve) => {
      $e === R && Qe === Q && Ve && q && Oe((it) => ({ ...it, [Ve.toLowerCase()]: qe }));
    });
    return () => {
      q = !1, xe.abort(), Ce();
    };
  }, [K, G, _, R, he]);
  const We = u.useRef(ee), He = u.useMemo(() => e ? x[e.id] || x[e.hostname] || e.segments || [] : [], [e, x]), Fe = t + r, Ee = u.useMemo(() => He.length === 0 ? !0 : He.some((q) => {
    const xe = (q.startEpochMs ?? q.startEpoch ?? 0) - 2e3, Q = (q.endEpochMs ?? q.endEpoch ?? 0) + 2e3;
    return Fe >= xe && Fe <= Q;
  }), [He, Fe]), ot = !Ee && He.length > 0, [Be, It] = u.useState("A"), [Ge, Et] = u.useState(""), [en, ut] = u.useState(""), [tn, _t] = u.useState(""), [vn, Ze] = u.useState(null), [Xe, Nt] = u.useState(!1), [mn, kt] = u.useState(!1), [Lt, Zt] = u.useState(() => {
    if (!R) return null;
    const q = Math.round(t + r);
    return In.get(R, q, ee) || null;
  }), [on, Ln] = u.useState(null), Cn = Be === "A" ? T : g, Ie = u.useCallback(() => {
    const q = il();
    T.current && (T.current.volume = q.volume, T.current.muted = Be !== "A" || q.isMuted, T.current.defaultPlaybackRate = a, T.current.playbackRate = a, Be === "A" && !q.isMuted && Ci(T.current)), g.current && (g.current.volume = q.volume, g.current.muted = Be !== "B" || q.isMuted, g.current.defaultPlaybackRate = a, g.current.playbackRate = a, Be === "B" && !q.isMuted && Ci(g.current)), M.current && (M.current.muted = !0, M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [Be, a]);
  u.useEffect(() => {
    const q = (xe) => {
      xe.detail && (T.current && (T.current.volume = xe.detail.volume), g.current && (g.current.volume = xe.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", q), () => window.removeEventListener("itb-audio-state-changed", q);
  }, []), u.useEffect(() => {
    T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a), M.current && (M.current.defaultPlaybackRate = a, M.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!I || !R) return;
    if (o) {
      B.current = !0;
      return;
    }
    const q = B.current;
    B.current = o;
    let xe = !0;
    const Q = new AbortController(), Ce = Math.round(t + r), $e = In.get(R, Ce, ee);
    if ($e) {
      Zt($e);
      return;
    }
    const qe = setTimeout(() => {
      xe && In.fetchFrame(R, Ce, Q.signal, ee).then((it) => {
        xe && it && Zt(it);
      });
    }, q ? 25 : 35), Ve = In.subscribe((it, wt, ct, ht) => {
      it === R && wt === Ce && (!ht || ht === ee) && xe && Zt(ct);
    });
    return () => {
      xe = !1, clearTimeout(qe), Q.abort(), Ve();
    };
  }, [I, R, t, r, o, Xe, ee]), u.useEffect(() => {
    if (!K || G !== "split" && G !== "pip" || !se || o) {
      Ln(null);
      return;
    }
    let q = !0;
    const xe = new AbortController(), Q = Math.round(t + r), Ce = In.get(R, Q, se);
    if (Ce) {
      Ln(Ce);
      return;
    }
    const $e = setTimeout(() => {
      q && In.fetchFrame(R, Q, xe.signal, se).then((qe) => {
        q && qe && Ln(qe);
      });
    }, 40), Qe = In.subscribe((qe, Ve, it, wt) => {
      qe === R && Ve === Q && (!wt || wt === se) && q && Ln(it);
    });
    return () => {
      q = !1, clearTimeout($e), xe.abort(), Qe();
    };
  }, [K, G, se, I, R, t, r]);
  const Te = u.useCallback((q, xe = ee) => {
    const Q = Math.round(t), Ce = Math.round(t + n), $e = Math.min(Ce, Math.max(Q, Math.round(t + q)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(R)}&startEpoch=${Q}&endEpoch=${Ce}&seekEpoch=${$e}&displayId=${encodeURIComponent(xe)}&_t=${Date.now()}`;
  }, [t, n, R, ee]);
  u.useEffect(() => {
    if (!(!I || !R))
      if (o && Ee) {
        const q = O.current;
        U.current = q, A.current = q, W.current = !1;
        const xe = Te(q, ee);
        Nt(!1), kt(!0), It("A"), Et(xe), ut(""), Ze(null), _t((G === "split" || G === "pip") && se ? Te(q, se) : "");
      } else o || (oe.current && clearTimeout(oe.current), W.current = !1, Et(""), ut(""), _t(""), Ze(null), Nt(!1), kt(!1), T.current && T.current.pause(), g.current && g.current.pause(), M.current && M.current.pause());
  }, [o, I, R, Ee, Te, ee, G, se]), u.useEffect(() => {
    if (We.current !== ee && (We.current = ee, o && Ee)) {
      const q = O.current;
      U.current = q;
      const xe = Te(q, ee);
      Nt(!1), kt(!0), It("A"), Et(xe), ut("");
    }
  }, [ee, o, Ee, Te]), u.useEffect(() => {
    if (!I || !R) return;
    const q = Math.abs(r - A.current);
    if (!o || q < 15) {
      A.current = r;
      return;
    }
    return W.current = !0, A.current = r, U.current = r, T.current && T.current.pause(), g.current && g.current.pause(), M.current && M.current.pause(), Nt(!1), kt(!0), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!Ee) {
        Et(""), ut(""), _t(""), kt(!1), W.current = !1;
        return;
      }
      const xe = O.current, Q = Te(xe, ee);
      It("A"), Et(Q), ut(""), Ze(null), (G === "split" || G === "pip") && se && _t(Te(xe, se));
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [r, o, I, R, Ee, Te, ee, G, se]), u.useEffect(() => {
    if (!o || !Xe || He.length === 0) return;
    const q = t + O.current, xe = He.map((Q) => ({
      start: Q.startEpochMs ?? Q.startEpoch ?? 0,
      end: Q.endEpochMs ?? Q.endEpoch ?? 0
    })).filter((Q) => Q.start > q + 500).sort((Q, Ce) => Q.start - Ce.start)[0];
    if (xe && (!vn || vn.start !== xe.start)) {
      const Q = xe.start - t;
      if (Q < v) {
        const Ce = Te(Q, ee);
        Ze({ start: xe.start, ms: Q }), Be === "A" ? ut(Ce) : Et(Ce);
      }
    }
  }, [o, Xe, r, t, v, He, vn, Be, Te, ee]);
  const Ke = u.useCallback(() => {
    if (vn) {
      const q = Be === "A" ? "B" : "A", xe = q === "A" ? T : g;
      It(q), U.current = vn.ms, A.current = vn.ms, Ze(null), xe.current && xe.current.play().then(() => {
        Ie();
      }).catch(() => {
      });
    } else
      m ? l(h) : i(!1);
  }, [vn, Be, Ie, m, h, l, i]), dt = u.useCallback(() => {
    const q = Cn.current;
    if (!q || W.current || !o || re.current) return;
    const xe = q.currentTime * 1e3, Q = Math.round(U.current + xe);
    if (y && y.length > 0) {
      const Ce = t + Q, $e = y.find((Qe) => Ce >= Qe.startEpochMs && Ce < Qe.endEpochMs);
      if ($e) {
        re.current = !0;
        const Qe = Math.round($e.endEpochMs - t) + 10;
        l(Qe), setTimeout(() => {
          re.current = !1;
        }, 150);
        return;
      }
    }
    if (Q >= v) {
      m ? l(h) : (i(!1), l(v));
      return;
    }
    A.current = Q, l(Q);
  }, [Cn, o, t, y, v, m, h, l, i]), Ct = mn && o && !ot;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${G} ${N}`, children: [
    K && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (q) => q.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "director" ? "active" : ""}`,
          onClick: () => le("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "canvas" ? "active" : ""}`,
          onClick: () => le("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "split" ? "active" : ""}`,
          onClick: () => le("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "pip" ? "active" : ""}`,
          onClick: () => le("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      _.map((q, xe) => {
        const Q = (q.displayId ?? `mon-${xe}`).toLowerCase(), Ce = q.displayNumber ?? xe + 1, $e = q.displayName || `Screen ${Ce}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${G === Q ? "active" : ""}`,
            onClick: () => le(Q),
            title: `Pin directly to ${$e}`,
            children: [
              "🖥️ ",
              Ce
            ]
          },
          Q
        );
      }),
      G === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          _.map((q, xe) => {
            const Q = (q.displayId ?? `mon-${xe}`).toLowerCase(), Ce = q.displayNumber ?? xe + 1, $e = q.displayName || `Screen ${Ce}`, Qe = ee === Q;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Qe ? "active" : ""} ${ne && Qe ? "is-override" : ""}`,
                onClick: () => {
                  D == null || D(I, t + r, Q);
                },
                title: `Punch ${$e} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ce
                  ] }),
                  Qe && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: ne ? "✋" : "⚡" })
                ]
              },
              `punch-${Q}`
            );
          }),
          ne && k && /* @__PURE__ */ s.jsx(
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
    K && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${ne ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: G === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : G === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : G === "pip" ? `🪟 PiP MODE: ${be.toUpperCase()} (HERO)` : `${ne ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${be.toUpperCase()}` }),
      ne && G === "director" && k && /* @__PURE__ */ s.jsx(
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
    Ge && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: T,
        src: Ge,
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
          Ie(), o && Be === "A" && T.current && T.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Be === "A" && (W.current = !1, Nt(!0), kt(!1), T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a));
        },
        onWaiting: () => {
          Be === "A" && kt(!0);
        },
        onTimeUpdate: () => {
          var q;
          Be === "A" && (!Xe && ((q = T.current) == null ? void 0 : q.currentTime) > 0 && (W.current = !1, Nt(!0), kt(!1), T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a)), dt());
        },
        onError: () => {
          Be === "A" && (W.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Be === "A" && Ke();
        }
      }
    ),
    en && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: g,
        src: en,
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
          Ie(), o && Be === "B" && g.current && g.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Be === "B" && (W.current = !1, Nt(!0), kt(!1), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a));
        },
        onWaiting: () => {
          Be === "B" && kt(!0);
        },
        onTimeUpdate: () => {
          var q;
          Be === "B" && (!Xe && ((q = g.current) == null ? void 0 : q.currentTime) > 0 && (W.current = !1, Nt(!0), kt(!1), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a)), dt());
        },
        onError: () => {
          Be === "B" && (W.current = !1, kt(!1), Nt(!1));
        },
        onEnded: () => {
          Be === "B" && Ke();
        }
      }
    ),
    G !== "split" && G !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: Xe ? 0 : 2 },
        children: ot ? /* @__PURE__ */ s.jsx(gp, { isPlaying: o }) : Lt && Lt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Lt,
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
    G === "split" && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Lt && Lt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Lt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        on && on !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: on, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    G === "pip" && K && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (q) => {
          q.stopPropagation(), X((xe) => !xe);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              z.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          on && on !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: on, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (G === "canvas" || G === "all-displays") && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: me, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: de.width ? `${de.width}px` : "92%",
            height: de.height ? `${de.height}px` : "auto",
            aspectRatio: `${pe.totalWidth} / ${pe.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: _.map((q, xe) => {
            const Q = Sx(q, pe), Ce = (q.displayId ?? q.DisplayId ?? `mon-${xe}`).toLowerCase(), $e = _e[Ce] || (Ce === ee ? Lt : null), Qe = !!(q.isPrimary ?? q.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${Qe ? "is-primary" : ""}`,
                style: {
                  left: `${Q.leftPct}%`,
                  top: `${Q.topPct}%`,
                  width: `${Q.widthPct}%`,
                  height: `${Q.heightPct}%`
                },
                onClick: (qe) => {
                  qe.stopPropagation(), S ? S(Ce) : le(Ce);
                },
                title: `Display ${xe + 1} (${q.width || 1920}x${q.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Qe ? "★ " : "",
                      "🖥 ",
                      xe + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: q.displayName || q.DisplayName || Ce.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      q.width || 1920,
                      "x",
                      q.height || 1080
                    ] }),
                    S && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (qe) => {
                          qe.stopPropagation(), S(Ce);
                        },
                        title: `Open Display ${xe + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  $e && $e !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: $e,
                      className: "canvas-frame-img",
                      alt: Ce
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      q.displayName || Ce.toUpperCase(),
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
          R,
          " • ",
          ee.toUpperCase()
        ] })
      ] })
    ] }) }),
    G === "director" && ie && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        ee.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        vt(ie.startEpochMs ?? ie.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        vt(ie.endEpochMs ?? ie.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    K && G !== "canvas" && /* @__PURE__ */ s.jsx(
      xp,
      {
        displays: _,
        activeDisplayId: ee,
        mode: ne ? "MANUAL" : "AUTO",
        activeTimeRange: ie ? `${vt(ie.startEpochMs ?? ie.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${vt(ie.endEpochMs ?? ie.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (q) => {
          D && D(I, t + r, q), le(q);
        }
      }
    ),
    C && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      R
    ] }) })
  ] });
}
const Sa = 2200, ba = 400;
function Mx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const h = t[c], v = h.epochMs + Zo, m = e - v;
      if (m >= 0 && m <= Sa)
        return {
          ...h,
          elapsed: m
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > Sa - ba) {
    const c = (o.elapsed - (Sa - ba)) / ba;
    i = Math.max(0, 1 - c);
  }
  if (i <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Np(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const a = vp(o.keyCombination);
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, h) => /* @__PURE__ */ s.jsxs(uo.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    h < a.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, h)) }) }) : null;
}
const Ix = [
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
function Cp({ isOpen: e, onClose: t }) {
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Ix.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
        /* @__PURE__ */ s.jsx("h4", { className: "group-title", children: n.title }),
        /* @__PURE__ */ s.jsx("div", { className: "group-items-list", children: n.shortcuts.map((l, o) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-row", children: [
          /* @__PURE__ */ s.jsx("div", { className: "keys-cluster", children: l.keys.map((i, a) => i === "or" || i === "+" || i === "← / →" || i === "Z / Y" ? /* @__PURE__ */ s.jsx("span", { className: "key-separator", children: i }, a) : /* @__PURE__ */ s.jsx("kbd", { className: "tactical-kbd", children: i }, a)) }),
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
const Gd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), i = r % 60, a = Math.floor(n % 1e3 / 1e3 * t), c = (h) => String(h).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(i)}.${c(a)}`;
};
function Tx({
  isOpen: e,
  station: t,
  initialDisplayId: n = null,
  allStations: r = [],
  onSelectStation: l,
  onClose: o,
  baseEpochMs: i = 0,
  timeMode: a = "LOCAL",
  totalDurationMs: c = 36e5,
  zoomLevel: h = 1,
  onZoomChange: v,
  onZoomReset: m,
  onFitRange: x,
  onJumpViewportTo: y,
  viewportStartMs: C = 0,
  onViewportStartChange: b,
  playheadMs: D = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: f,
  inPointMs: d = 0,
  setInPointMs: S,
  outPointMs: E = 36e5,
  setOutPointMs: j,
  recordingSegments: N = {},
  globalGaps: T = [],
  onExport: g,
  isPlaying: M,
  setIsPlaying: O,
  isLooping: U = !0,
  setIsLooping: A,
  playbackSpeed: W,
  setPlaybackSpeed: oe,
  keystrokeMode: B = "BURN_IN",
  onChangeKeystrokeMode: re,
  keystrokes: I = [],
  showRulerKeystrokes: R = !1,
  onToggleRulerKeystrokes: _,
  directorPlan: K,
  onOverrideDisplay: F,
  onSplitDirectorSegment: te,
  onChangeDirectorSegmentDisplay: Z,
  onResetDirectorSegmentToAuto: G
}) {
  var on, Ln, Cn;
  const [le, ze] = u.useState(!1), Le = M !== void 0 ? M : le, je = u.useCallback((Ie) => {
    const Te = typeof Ie == "function" ? Ie(Le) : Ie;
    O ? O(Te) : ze(Te), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Te } }));
  }, [Le, O]), [X, ie] = u.useState(!0), ee = U !== void 0 ? U : X, se = A || ie, [be, z] = u.useState(1), ne = W !== void 0 ? W : be, _e = oe || z, [Oe, me] = u.useState(null), [de, J] = u.useState(!1), [pe, he] = u.useState(T), We = ((on = t == null ? void 0 : t.displays) == null ? void 0 : on.length) > 1 || ((Cn = (Ln = t == null ? void 0 : t.topology) == null ? void 0 : Ln.displays) == null ? void 0 : Cn.length) > 1, [He, Fe] = u.useState(() => {
    if (!We) return "mon-0";
    if (n) return n;
    try {
      const Ie = localStorage.getItem("itb_spotlight_viewmode");
      if (Ie) return Ie;
    } catch {
    }
    return "canvas";
  }), Ee = u.useCallback((Ie) => {
    Fe((Te) => {
      const Ke = typeof Ie == "function" ? Ie(Te) : Ie;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Ke);
      } catch {
      }
      return Ke;
    });
  }, []), [ot, Be] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!We) {
        Fe("mon-0");
        return;
      }
      if (n)
        Fe(n);
      else
        try {
          const Ie = localStorage.getItem("itb_spotlight_viewmode");
          Fe(Ie || "canvas");
        } catch {
          Fe("canvas");
        }
    }
  }, [e, n, We, t == null ? void 0 : t.id]);
  const It = u.useRef(null), Ge = u.useRef(h);
  Ge.current = h;
  const Et = u.useRef(C);
  Et.current = C;
  const en = u.useRef(c);
  en.current = c;
  const ut = u.useRef(t && t.id);
  u.useEffect(() => {
    var Ie, Te, Ke;
    t && t.id && ut.current !== t.id && (ut.current = t.id, _e(1), ((Ie = t.displays) == null ? void 0 : Ie.length) > 1 || ((Ke = (Te = t.topology) == null ? void 0 : Te.displays) == null ? void 0 : Ke.length) > 1 || Ee("mon-0"));
  }, [t, _e]);
  const tn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Ie = It.current;
    if (!Ie || !v || !b) return;
    const Te = (Ke) => {
      Ke.preventDefault(), Ke.stopPropagation();
      const dt = Ke.ctrlKey || Ke.shiftKey, Ct = Ge.current, q = Et.current, xe = en.current || 36e5;
      if (dt) {
        const Q = Math.abs(Ke.deltaX) > Math.abs(Ke.deltaY) ? Ke.deltaX : Ke.deltaY;
        if (Q === 0) return;
        const Ce = xe / Ct, $e = Math.max(0, xe - Ce), Qe = Ce * 0.08 * (Q > 0 ? 1 : -1), qe = Math.max(0, Math.min($e, q + Qe));
        Et.current = qe, b(qe);
      } else {
        if (Ke.deltaY === 0) return;
        const Ce = Ke.deltaY < 0 ? 1.25 : 0.8, $e = Ie.getBoundingClientRect(), Qe = $e.left + 150, qe = $e.right - 58, Ve = Math.max(100, qe - Qe);
        let it = 0.5;
        Ke.clientX >= Qe && Ke.clientX <= qe ? it = (Ke.clientX - Qe) / Ve : $e.width > 0 && (it = Math.max(0, Math.min(1, (Ke.clientX - $e.left) / $e.width)));
        const wt = Math.max(32, xe / 2e3), ct = Math.max(1, Math.min(wt, Math.round(Ct * Ce * 100) / 100));
        if (ct === Ct) return;
        const ht = xe / Ct, Ft = xe / ct, Ot = q + it * ht - it * Ft, Nn = Math.max(0, xe - Ft), dn = Math.max(0, Math.min(Nn, Ot));
        Ge.current = ct, Et.current = dn, b(dn), v(ct);
      }
    };
    return Ie.addEventListener("wheel", Te, { passive: !1, capture: !0 }), () => Ie.removeEventListener("wheel", Te, { capture: !0 });
  }, [e, t, v, b]);
  const _t = u.useCallback(() => {
    m ? m() : (Et.current = 0, Ge.current = 1, b == null || b(0), v == null || v(1));
  }, [m, b, v]), vn = u.useCallback((Ie, Te) => {
    if (x)
      x(Ie, Te);
    else {
      const Ke = Math.max(1e3, Te - Ie), dt = Math.max(500, Ke * 0.05), Ct = Math.max(0, Ie - dt), xe = Math.min(c, Te + dt) - Ct, Q = Math.max(32, c / 2e3), Ce = Math.max(1, Math.min(Q, Number((c / xe).toFixed(1)))), $e = c / Ce, Qe = Math.max(0, Math.min(Ct, c - $e));
      Et.current = Qe, Ge.current = Ce, b == null || b(Qe), v == null || v(Ce);
    }
  }, [x, c, b, v]), Ze = u.useCallback((Ie, Te = "center") => {
    if (y)
      y(Ie, Te);
    else {
      if (Ie == null) return;
      const Ke = Ge.current || 1, dt = c / Math.max(1, Ke), Ct = Te === "start" ? dt / 4 : dt * 0.75, q = Math.max(0, Math.min(Ie - Ct, c - dt));
      Et.current = q, b == null || b(q);
    }
  }, [y, c, b]), Xe = u.useCallback(() => {
    je((Ie) => !Ie);
  }, [je]), Nt = u.useCallback(async () => {
    var dt;
    if (!t || Math.abs(E - d) < 1e3) return;
    const Ie = (B || "NONE").toUpperCase().replace("-", "_");
    let Te;
    Ie === "NONE" || Ie === "OFF" ? Te = "None" : Ie === "CAPTION" ? Te = "Caption" : Te = "BurnIn";
    const Ke = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(d),
      outEpochMs: i + Math.round(E),
      keystrokeMode: Te,
      layoutMode: We ? He : "mon-0",
      targetDisplayId: !We || He === "mon-0" || He === "mon-1" || He.startsWith("mon-") ? We ? He : "mon-0" : null,
      isPipSwapped: ot,
      directorSegments: We ? (K == null ? void 0 : K.segments) || ((dt = t == null ? void 0 : t.directorPlan) == null ? void 0 : dt.segments) || [] : []
    };
    try {
      g ? await g(Ke) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ke)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Ke)
      });
    } catch (Ct) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Ct);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, d, E, i, g, B, He, ot, K]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Ie = (Te) => {
      if ((Te.ctrlKey || Te.metaKey) && (Te.key === "e" || Te.key === "E")) {
        Te.preventDefault(), Nt();
        return;
      }
      if (Te.key === "?" || Te.shiftKey && Te.code === "Slash") {
        Te.preventDefault(), J((Ke) => !Ke);
        return;
      }
      if (de) {
        Te.key === "Escape" && J(!1);
        return;
      }
      if (Te.key === "Escape" || Te.code === "Escape") {
        Te.preventDefault(), Te.stopPropagation(), o == null || o();
        return;
      }
      if (Te.code === "Space") {
        Te.preventDefault(), Xe();
        return;
      }
      if (Te.code === "KeyI") {
        Te.preventDefault(), S(Math.max(0, Math.min(D, E - 1e3)));
        return;
      }
      if (Te.code === "KeyO") {
        Te.preventDefault(), j(Math.min(c, Math.max(D, d + 1e3)));
        return;
      }
      if (Te.code === "ArrowLeft" || Te.code === "ArrowRight") {
        Te.preventDefault(), je(!1);
        const Ke = Te.code === "ArrowLeft";
        let dt;
        if (Te.ctrlKey || Te.metaKey)
          dt = 33;
        else if (Te.shiftKey)
          dt = 5e3;
        else {
          const Ct = Math.max(1, h);
          dt = Math.max(33, Math.round(1e3 / Ct));
        }
        f((Ct) => {
          const q = Ke ? Ct - dt : Ct + dt;
          return Math.max(0, Math.min(c, q));
        });
        return;
      }
      if (Te.key === "ArrowDown") {
        Te.preventDefault();
        const Ke = r.findIndex((dt) => dt.id === t.id);
        if (Ke !== -1) {
          const dt = (Ke + 1) % r.length;
          l(r[dt].id);
        }
        return;
      }
      if (Te.key === "ArrowUp") {
        Te.preventDefault();
        const Ke = r.findIndex((dt) => dt.id === t.id);
        if (Ke !== -1) {
          const dt = (Ke - 1 + r.length) % r.length;
          l(r[dt].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Ie, { capture: !0 }), () => window.removeEventListener("keydown", Ie, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    D,
    d,
    E,
    c,
    h,
    S,
    j,
    f,
    Nt,
    Xe,
    je,
    de
  ]);
  const mn = r.findIndex((Ie) => Ie.id === (t && t.id)), kt = r[mn - 1], Lt = r[mn + 1];
  if (!e || !t) return null;
  const Zt = k > 0 ? k : Math.round(i + D);
  return Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      Oe && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${Oe.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          Oe.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          Oe.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          Oe.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: Oe.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Gd(E - d),
            " (",
            vt(i + d, a),
            " → ",
            vt(i + E, a),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          bx,
          {
            station: t,
            baseEpochMs: i,
            totalDurationMs: c,
            playheadMs: D,
            setPlayheadMs: f,
            isPlaying: Le,
            setIsPlaying: je,
            playbackSpeed: ne,
            timeMode: a,
            inPointMs: d,
            outPointMs: E,
            isLooping: ee,
            recordingSegments: N,
            globalGaps: pe,
            showWatermark: !0,
            directorPlan: K || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: F,
            onResetOverride: G,
            viewMode: He,
            onViewModeChange: Ee,
            isPipSwapped: ot,
            onPipSwapChange: Be
          }
        ),
        /* @__PURE__ */ s.jsx(
          Mx,
          {
            currentEpochMs: Zt,
            keystrokes: I,
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
              onClick: (Ie) => {
                Ie.preventDefault(), Ie.stopPropagation(), o == null || o();
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
              onClick: () => J(!0),
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
            mn + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Lt,
              onClick: () => Lt && l(Lt.id),
              title: Lt ? `Next: ${Lt.displayName || Lt.roleAlias || Lt.hostname || Lt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Le ? "is-playing-dimmed" : ""}`, ref: It, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Gd(E - d) })
            ] }),
            (() => {
              const Ie = He === "mon-0" ? "SCREEN 1" : He === "mon-1" ? "SCREEN 2" : He.startsWith("mon-") ? `SCREEN ${parseInt(He.slice(4)) + 1}` : He.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: Nt,
                  title: `Export Selected Cut Window as ${Ie} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: He === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Ie})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            yp,
            {
              activeStationId: t.id,
              isPlaying: Le,
              setIsPlaying: Xe,
              isLooping: ee,
              setIsLooping: se,
              playbackSpeed: ne,
              onChangeSpeed: _e,
              baseEpochMs: i,
              timeMode: a,
              totalDurationMs: c,
              inPointMs: d,
              setInPointMs: S,
              outPointMs: E,
              setOutPointMs: j,
              onSetInPoint: () => S(Math.max(0, Math.min(D, E - 1e3))),
              onSetOutPoint: () => j(Math.min(c, Math.max(D, d + 1e3))),
              onStepFrameBackward: () => {
                je(!1), f((Ie) => Math.max(0, Ie - 33));
              },
              onStepFrameForward: () => {
                je(!1), f((Ie) => Math.min(c, Ie + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: vt(i + D, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          wp,
          {
            stations: tn,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: h,
            onZoomChange: v,
            onZoomReset: _t,
            onFitRange: vn,
            onJumpViewportTo: Ze,
            viewportStartMs: C,
            onViewportStartChange: b,
            playheadMs: D,
            setPlayheadMs: (Ie) => {
              je(!1), f(Ie);
            },
            inPointMs: d,
            setInPointMs: S,
            outPointMs: E,
            setOutPointMs: j,
            recordingSegments: N,
            onExport: Nt,
            onEstimateLoaded: (Ie) => {
              Ie != null && Ie.removedGlobalGaps && he(Ie.removedGlobalGaps);
            },
            keystrokeMode: B,
            onChangeKeystrokeMode: re,
            keystrokes: I,
            showKeystrokes: R,
            showRulerKeystrokes: R,
            onToggleRulerKeystrokes: _,
            onSplitDirectorSegment: te,
            onChangeDirectorSegmentDisplay: Z,
            onResetDirectorSegmentToAuto: G
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Cp,
        {
          isOpen: de,
          onClose: () => J(!1)
        }
      )
    ] }),
    document.body
  );
}
function Sp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, h] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [v, m] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), x = u.useCallback(async () => {
    if (!i.current && !(typeof document < "u" && document.hidden)) {
      i.current = !0;
      try {
        let N = await fetch("/api/v1/extractor-advanced/jobs");
        if (N.ok || (N = await fetch("/api/v1/extractor/jobs")), N.ok) {
          a.current = 0;
          const T = await N.json(), g = Array.isArray(T) ? T : [];
          n(g), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: g }));
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
    let N = !0, T = null;
    const g = () => {
      if (!N) return;
      let O = 2500;
      typeof document < "u" && document.hidden ? O = 3e4 : a.current > 0 && (O = Math.min(3e4, 2500 * Math.pow(2, Math.min(a.current, 4)))), T = setTimeout(async () => {
        await x(), g();
      }, O);
    }, M = () => {
      !document.hidden && N && (clearTimeout(T), a.current = 0, x().then(g));
    };
    return document.addEventListener("visibilitychange", M), x().then(g), () => {
      N = !1, clearTimeout(T), document.removeEventListener("visibilitychange", M);
    };
  }, [x]), u.useEffect(() => {
    const N = () => {
      m(!0), x();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [x]), u.useEffect(() => {
    if (!v || c) return;
    const N = (T) => {
      o.current && !o.current.contains(T.target) && !T.target.closest(".export-floating-hud") && m(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [v, c]);
  const y = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && y)
    return null;
  const C = t.filter((N) => N.status === "Processing" || N.status === "Queued"), b = t.filter((N) => N.status === "Completed" || N.isCompleted), D = () => {
    h((N) => {
      const T = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(T));
      } catch {
      }
      return T;
    });
  }, k = () => {
    m(!1), h(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, f = (N, T) => {
    T.stopPropagation(), !(!N || r.has(N)) && (l((g) => new Set(g).add(N)), setTimeout(() => {
      n((g) => {
        const M = g.filter((O) => (O.jobId || O.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: M })), M;
      }), l((g) => {
        const M = new Set(g);
        return M.delete(N), M;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${N}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}`, { method: "DELETE" })).catch((g) => console.warn("[ExportJobMonitor] Dismiss failed:", g)));
  }, d = async (N, T) => {
    T.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${N}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${N}/bookmark`, { method: "POST" })), x();
    } catch (g) {
      console.warn("[ExportJobMonitor] Bookmark failed:", g);
    }
  }, S = (N, T) => {
    T.stopPropagation();
    const g = N.networkFolderPath || (N.outputFilePath ? N.outputFilePath.substring(0, N.outputFilePath.lastIndexOf("\\")) : "");
    g && (navigator.clipboard.writeText(g), alert(`UNC Directory Path copied to clipboard:
${g}`));
  }, E = (N) => {
    const T = N.jobId || N.id, g = `/api/v1/extractor-advanced/jobs/${T}/download`, M = document.createElement("a");
    M.href = g, M.download = N.fileName || `archive_${T}.tar`, document.body.appendChild(M), M.click(), document.body.removeChild(M), setTimeout(x, 1e3);
  }, j = (N) => {
    if (!N || N <= 0) return "0 B";
    const T = N / (1024 * 1024);
    return T >= 1e3 ? `${(T / 1024).toFixed(2)} GB` : `${T.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : Ps.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${C.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => m(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${C.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: C.length > 0 ? `EXPORTS: ${C.length} PACKAGING` : `${b.length} ARCHIVE${b.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${C.length > 0 ? "" : "ready"}`, children: C.length > 0 ? `${C[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && m(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (N) => N.stopPropagation(), children: [
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
          const T = N.status === "Completed" || N.isCompleted, g = N.status === "Failed" || N.isFailed, M = N.status === "Processing" || N.status === "Queued", O = N.jobId || N.id, U = r.has(O), A = T ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${N.status.toLowerCase()} ${N.isBookmarked ? "is-bookmarked" : ""} ${U ? "is-dismissing" : ""}`,
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
                      onClick: (W) => f(O, W),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                M && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
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
                        onClick: (W) => d(O, W),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (W) => S(N, W),
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
                      onClick: () => E(N),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                g && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  N.errorMessage || N.error || "Export failed"
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
function Ax({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const h = (m) => {
      m.key === "Escape" && (t == null || t());
    }, v = (m) => {
      l.current && !l.current.contains(m.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", v), window.addEventListener("keydown", h), () => {
      window.removeEventListener("mousedown", v), window.removeEventListener("keydown", h);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: o, y: i, station: a } = e, c = a.displayName || a.hostname || a.name || a.id;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
      className: "station-context-menu-root",
      style: { top: `${i}px`, left: `${o}px` },
      onClick: (h) => h.stopPropagation(),
      onContextMenu: (h) => h.preventDefault(),
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
function Rx({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, i = r.canvasHeight || 1080, a = o / i;
  let c;
  Math.abs(a - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(a - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(a - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(a - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(a - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(a * 100) / 100}:1 Custom`;
  const h = (N) => {
    const T = Math.round(N * a);
    return T - T % 2;
  }, v = (N, T) => {
    const g = Math.round(N * T / 2073600 * 6 * 10) / 10, M = Math.round(g * 60 / 8 * 10) / 10;
    return `~${g} Mbps (~${M} MB/min)`;
  }, m = [
    {
      id: "NATIVE",
      badge: `Native 1:1 (${o}×${i})`,
      res: `${o} × ${i}`,
      bitrate: v(o, i),
      desc: "Exact 1:1 canvas match (Recommended). Preserves original recorded pixel fidelity without scaling or distortion."
    },
    {
      id: "4K",
      badge: `4K UHD (${h(2160)}×2160)`,
      res: `${h(2160)} × 2160`,
      bitrate: v(h(2160), 2160),
      desc: "Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls."
    },
    {
      id: "2K",
      badge: `2K QHD (${h(1440)}×1440)`,
      res: `${h(1440)} × 1440`,
      bitrate: v(h(1440), 1440),
      desc: "High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows."
    },
    {
      id: "HD",
      badge: `HD 720p (${h(720)}×720)`,
      res: `${h(720)} × 720`,
      bitrate: v(h(720), 720),
      desc: "Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage."
    }
  ], [x, y] = u.useState("BurnIn"), [C, b] = u.useState(r.resolution || "NATIVE"), [D, k] = u.useState(!1);
  if (!e) return null;
  const f = async () => {
    k(!0);
    try {
      await n(x, C), t();
    } finally {
      k(!1);
    }
  }, d = (r.layout || "DIRECTOR").toUpperCase(), S = r.stationsCount || 1, E = r.audioSegmentsCount || 1, j = m.find((N) => N.id === C) || m[0];
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
              d,
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
              S,
              " WORKSTATION",
              S > 1 ? "S" : ""
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
              (typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "TOP-RIGHT").toUpperCase(),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: m.map((N) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${C === N.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: N.id,
              checked: C === N.id,
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
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${x === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: x === "BurnIn",
                onChange: () => y("BurnIn")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "HARD BURN-IN (IN-PLACE ON VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence." })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${x === "None" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "None",
                checked: x === "None",
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: f, disabled: D, children: D ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function $x(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [h, v] = u.useState(!1), m = u.useRef(o);
  m.current = o;
  const x = u.useCallback(async () => {
    if (isNaN(e)) return;
    const b = e + t;
    v(!0);
    try {
      const D = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(b),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${D.toString()}`);
      if (k.ok) {
        const f = k.headers.get("content-type");
        if (f && f.includes("application/json")) {
          const d = await k.json(), E = (Array.isArray(d) ? d : d.stations || d.items || []).filter((j) => (j.recordingsCount || (j.segments ? j.segments.length : 0)) > 0).map((j) => {
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
          i((j) => {
            if (!j || j.length === 0) return E;
            const N = new Map(j.map((M) => [M.id, M]));
            let T = j.length !== E.length;
            const g = E.map((M) => {
              const O = N.get(M.id);
              return O ? O.isOnline === M.isOnline && O.displayName === M.displayName && O.roleAlias === M.roleAlias && O.feedSpec === M.feedSpec && O.recordingsCount === M.recordingsCount && O.fps === M.fps ? O : (T = !0, { ...O, ...M }) : (T = !0, M);
            });
            return T ? g : j;
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
    x();
  }, [x]);
  const y = u.useMemo(() => {
    const b = /* @__PURE__ */ new Set();
    return o.forEach((D) => {
      D.id && b.add(D.id), D.hostname && b.add(D.hostname);
    }), Array.from(b).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!y || isNaN(e)) {
      c({});
      return;
    }
    let b = !0;
    return (async () => {
      try {
        const k = e + t, f = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${k}`);
        if (f.ok && b) {
          const d = await f.json() || {}, S = {};
          (m.current || []).forEach((E) => {
            const j = d[E.id] || d[E.hostname] || d[E.displayName] || [];
            S[E.id] = j, S[E.hostname] = j;
          }), Object.keys(d).forEach((E) => {
            S[E] || (S[E] = d[E]);
          }), c(S);
        }
      } catch {
        b && c({});
      }
    })(), () => {
      b = !1;
    };
  }, [y, e, t]);
  const C = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let b = 1 / 0, D = -1 / 0;
    o.forEach((S) => {
      (a[S.id] || a[S.hostname] || S.segments || []).forEach((j) => {
        const N = j.startEpochMs ?? j.startEpoch ?? 0, T = j.endEpochMs ?? j.endEpoch ?? 0;
        N > 0 && N < b && (b = N), T > 0 && T > D && (D = T);
      });
    });
    let k = 1 / 0, f = -1 / 0;
    l && (a[l] || []).forEach((E) => {
      const j = E.startEpochMs ?? E.startEpoch ?? 0, N = E.endEpochMs ?? E.endEpoch ?? 0;
      j > 0 && j < k && (k = j), N > 0 && N > f && (f = N);
    });
    const d = (S) => S === 1 / 0 || S === -1 / 0 ? null : Math.max(0, Math.min(t, S - e));
    return {
      globalFirstMs: d(b),
      globalLastMs: d(D),
      currentFirstMs: d(k),
      currentLastMs: d(f)
    };
  }, [o, a, l, e, t]);
  return {
    allStations: o,
    setAllStations: i,
    recordingSegments: a,
    setRecordingSegments: c,
    isLoadingStations: h,
    refetchStations: x,
    movieBoundaries: C
  };
}
function Lx({
  timelineBaseEpochMs: e,
  inPointMs: t,
  outPointMs: n,
  globalGaps: r = [],
  activeStation: l,
  spotlightStation: o,
  recordingSegments: i = {},
  initialPlayheadMs: a = 0,
  initialIsPlaying: c = !1,
  initialIsLooping: h = !0,
  initialPlaybackSpeed: v = 1,
  isGridMode: m = !1
}) {
  const [x, y] = u.useState(a), [C, b] = u.useState(c), [D, k] = u.useState(h), [f, d] = u.useState(v), S = u.useRef(null), E = u.useRef(null), j = o || l, N = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), T = N.some((U) => {
    const A = U.startEpochMs ?? U.startEpoch ?? 0, W = U.endEpochMs ?? U.endEpoch ?? 0, oe = e + x;
    return oe >= A && oe <= W;
  }), g = !!(!m && j && T);
  u.useEffect(() => {
    y((U) => U < t ? t : U > n ? (b(!1), n) : U);
  }, [t, n]);
  const M = u.useCallback((U) => {
    S.current || (S.current = U);
    const A = (U - S.current) * f, W = Math.min(A, 250 * f);
    S.current = U, y((oe) => {
      let B = oe + W;
      if (r && r.length > 0) {
        const re = e + B, I = r.find((R) => re >= R.startEpochMs && re < R.endEpochMs);
        I && (B = I.endEpochMs - e);
      }
      return B >= n && (D ? B = t : (b(!1), B = n)), B;
    }), C && (!g || m) && (E.current = requestAnimationFrame(M));
  }, [C, D, t, n, r, e, g, f, m]);
  u.useEffect(() => (C && (!g || m) ? (S.current = performance.now(), E.current = requestAnimationFrame(M)) : (E.current && cancelAnimationFrame(E.current), S.current = null), () => {
    E.current && cancelAnimationFrame(E.current);
  }), [C, M, g, m]);
  const O = u.useCallback(() => {
    if (C)
      b(!1);
    else {
      let U = x;
      const A = e + U, W = r == null ? void 0 : r.find((oe) => A >= oe.startEpochMs && A < oe.endEpochMs);
      if (W)
        U = W.endEpochMs - e;
      else if (j && !T) {
        const oe = N.map((B) => ({ start: B.startEpochMs ?? B.startEpoch ?? 0, end: B.endEpochMs ?? B.endEpoch ?? 0 })).filter((B) => B.start > A).sort((B, re) => B.start - re.start)[0];
        oe && (U = oe.start - e);
      }
      U !== x && y(U), b(!0);
    }
  }, [C, x, e, r, j, T, N]);
  return {
    playheadMs: x,
    setPlayheadMs: y,
    isPlaying: C,
    setIsPlaying: b,
    isLooping: D,
    setIsLooping: k,
    playbackSpeed: f,
    setPlaybackSpeed: d,
    togglePlaySmart: O
  };
}
function Ox(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Dx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [i, a] = u.useState(r), c = u.useRef(null), h = u.useRef(i);
  h.current = i;
  const v = u.useRef(l);
  v.current = l;
  const m = u.useRef(t);
  m.current = t;
  const x = Math.max(32, t / 2e3), y = t / l, C = u.useCallback((f, d = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const S = h.current, E = f - S;
    if (Math.abs(E) < 1) return;
    const j = performance.now(), N = (T) => {
      const g = T - j, M = Math.min(1, g / d);
      a(Math.round(S + E * Ox(M))), M < 1 ? c.current = requestAnimationFrame(N) : c.current = null;
    };
    c.current = requestAnimationFrame(N);
  }, []), b = u.useCallback((f, d) => {
    const S = Math.max(1e3, d - f), E = Math.max(500, S * 0.05), j = Math.max(0, f - E), T = Math.min(t, d + E) - j, g = Math.max(1, Math.min(x, Number((t / T).toFixed(1)))), M = t / g, O = Math.max(0, Math.min(j, t - M));
    C(O), o(g);
  }, [t, x, C]), D = u.useCallback(() => {
    C(0), o(1);
  }, [C]), k = u.useCallback((f, d = "center") => {
    if (f == null) return;
    const S = d === "start" ? y / 4 : y * 0.75, E = Math.max(0, Math.min(f - S, t - y));
    C(E);
  }, [y, t, C]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let f = null;
    const d = (E) => {
      if (E.defaultPrevented) return;
      E.preventDefault(), E.stopPropagation();
      const j = E.ctrlKey || E.shiftKey, N = v.current, T = h.current, g = m.current;
      if (j) {
        const M = Math.abs(E.deltaX) > Math.abs(E.deltaY) ? E.deltaX : E.deltaY;
        if (M === 0) return;
        const O = g / Math.max(1, N), U = Math.max(0, g - O), A = O * 0.08 * (M > 0 ? 1 : -1);
        a((W) => Math.max(0, Math.min(U, W + A)));
      } else {
        if (E.deltaY === 0) return;
        const O = E.deltaY < 0 ? 1.25 : 0.8, U = Math.max(32, g / 2e3), A = f ? f.getBoundingClientRect() : { left: 0, width: window.innerWidth }, W = Math.max(0, Math.min(A.width, E.clientX - A.left)), oe = A.width > 0 ? W / A.width : 0.5;
        o((B) => {
          const re = Math.max(1, Math.min(U, Math.round(B * O * 100) / 100));
          if (re === B) return B;
          const I = g / B, R = g / re, K = T + oe * I - oe * R, F = Math.max(0, g - R);
          return a(Math.max(0, Math.min(F, K))), re;
        });
      }
    }, S = () => {
      const E = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return E && !f ? (f = E, f.addEventListener("wheel", d, { passive: !1, capture: !0 }), !0) : !!f;
    };
    if (!S()) {
      const E = setInterval(() => {
        S() && clearInterval(E);
      }, 100);
      return () => {
        clearInterval(E), f && f.removeEventListener("wheel", d, { capture: !0 });
      };
    }
    return () => {
      f && f.removeEventListener("wheel", d, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: y,
    animateViewportTo: C,
    fitRange: b,
    resetZoom: D,
    jumpViewportTo: k
  };
}
function Px({
  activeStationId: e,
  spotlightStationId: t,
  timelineStations: n = [],
  selectedStationIdsCount: r = 0,
  onSelectActiveStation: l,
  setPlaybackSpeed: o,
  playheadMs: i,
  setPlayheadMs: a,
  inPointMs: c,
  setInPointMs: h,
  outPointMs: v,
  setOutPointMs: m,
  totalTimelineDurationMs: x,
  zoomLevel: y = 1,
  togglePlaySmart: C,
  onToggleHelpModal: b,
  onSplitDirectorAtPlayhead: D,
  isModalActive: k = !1
}) {
  u.useEffect(() => {
    const f = (d) => {
      const S = d.target;
      if (!(S.tagName === "INPUT" || S.tagName === "TEXTAREA" || S.tagName === "SELECT" || S.isContentEditable || S.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (d.key === "?" || d.shiftKey && d.code === "Slash") {
          d.preventDefault(), b == null || b();
          return;
        }
        if (!(k || t)) {
          if (d.code === "KeyI" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), h == null || h(Math.max(0, Math.min(i, v - 1e3)));
            return;
          }
          if (d.code === "KeyO" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), m == null || m(Math.min(x, Math.max(i, c + 1e3)));
            return;
          }
          if (d.code === "KeyX" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), h == null || h(0), m == null || m(x);
            return;
          }
          if (d.code === "KeyL" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), o == null || o((j) => j <= 0 ? 1 : j === 1 ? 2 : j === 2 ? 4 : j >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
            return;
          }
          if (d.code === "KeyK" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), o == null || o(1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-pause"));
            return;
          }
          if (d.code === "KeyJ" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-reverse"));
            return;
          }
          if (d.code === "KeyM" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-mute"));
            return;
          }
          if (d.code === "Digit1" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 1 } }));
            return;
          }
          if (d.code === "Digit2" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 2 } }));
            return;
          }
          if (d.code === "Digit4" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 4 } }));
            return;
          }
          if (d.code === "KeyG" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-auto-grid"));
            return;
          }
          if (d.code === "KeyR" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-reset-canvas"));
            return;
          }
          if (d.code === "KeyF" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-fullscreen"));
            return;
          }
          if ((d.code === "Equal" || d.code === "NumpadAdd" || d.code === "Insert") && !d.ctrlKey && !d.metaKey) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-add-keyframe"));
            return;
          }
          if ((d.code === "Delete" || d.code === "Backspace") && window.dispatchEvent(new CustomEvent("itb:studio-delete-selected")), d.code === "BracketLeft") {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "in" } }));
            return;
          }
          if (d.code === "BracketRight") {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "out" } }));
            return;
          }
          if (d.code === "Backslash") {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-fit-cut"));
            return;
          }
          if (d.code === "KeyS") {
            if (d.ctrlKey || d.metaKey) {
              d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!d.altKey) {
              d.preventDefault(), D == null || D();
              return;
            }
          }
          if (d.code === "KeyZ" && (d.ctrlKey || d.metaKey)) {
            d.preventDefault(), d.shiftKey ? window.dispatchEvent(new CustomEvent("itb:studio-redo")) : window.dispatchEvent(new CustomEvent("itb:studio-undo"));
            return;
          }
          if (d.code === "KeyY" && (d.ctrlKey || d.metaKey)) {
            d.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-redo"));
            return;
          }
          if (d.code === "Space") {
            if (d.preventDefault(), !e && !t && r > 1) return;
            C();
            return;
          }
          if (d.key === "Home") {
            d.preventDefault(), a == null || a(c);
            return;
          }
          if (d.key === "End") {
            d.preventDefault(), a == null || a(v);
            return;
          }
          if (d.code === "ArrowLeft" || d.code === "ArrowRight") {
            d.preventDefault();
            const j = d.code === "ArrowLeft";
            let N;
            if (d.ctrlKey || d.metaKey)
              N = 33;
            else if (d.shiftKey)
              N = 5e3;
            else {
              const T = Math.max(1, y);
              N = Math.max(33, Math.round(1e3 / T));
            }
            a == null || a((T) => {
              const g = j ? T - N : T + N;
              return Math.max(0, Math.min(x, g));
            });
            return;
          }
          if (d.code === "ArrowDown" || d.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            d.preventDefault();
            const j = n.findIndex((N) => N.id === e);
            if (j === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (d.code === "ArrowDown") {
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
    return window.addEventListener("keydown", f, { capture: !0 }), () => window.removeEventListener("keydown", f, { capture: !0 });
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
    h,
    v,
    m,
    x,
    y,
    C,
    b,
    D,
    k
  ]);
}
const Xd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = _d(n, e), l = _d(t, e);
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
    const c = o.substring(0, 8), h = Nc(l, c, n);
    if (h !== null && !isNaN(h)) return h;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function _x() {
  var hn, an;
  const e = u.useMemo(() => vg() || {}, []), [t, n] = u.useState(() => {
    var L, ue;
    return (L = e.timeRange) != null && L.startEpochMs && ((ue = e.timeRange) != null && ue.endEpochMs) ? e.timeRange : Xd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    hg().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const h = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Al(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), m = u.useMemo(() => h - v, [h, v]), x = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, C] = u.useState(e.selectedStationIds || []), [b, D] = u.useState(e.activeStationId || null), [k, f] = u.useState(null), [d, S] = u.useState(null), [E, j] = u.useState([]), [N, T] = u.useState(!1), [g, M] = u.useState(null), [O, U] = u.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [A, W] = u.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), oe = u.useCallback((L) => {
    W((ue) => {
      const ce = typeof L == "function" ? L(ue) : L;
      try {
        localStorage.setItem("itb_composition_layout", ce);
      } catch {
      }
      return ce;
    });
  }, []), [B, re] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [I, R] = u.useState(() => !!e.isPipSwapped), [_, K] = u.useState(() => e.audioRoutingPlan || null), [F, te] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [Z, G] = u.useState(!1), [le, ze] = u.useState(null), [Le, je] = u.useState(() => e.canvasLayoutTimeline || null), [X, ie] = u.useState(0), ee = u.useCallback((L) => {
    je((ue) => {
      const ce = [...(ue == null ? void 0 : ue.keyframes) || []], Ne = ce.findIndex((fe) => Math.abs(fe.timestampEpochMs - L) < 300);
      if (Ne >= 0)
        return ie(Ne), ue;
      const H = ce[X] || ce[0], ke = (H == null ? void 0 : H.layout) || le || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Re = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(ke))
      }, Pe = [...ce, Re].sort((fe, Ye) => fe.timestampEpochMs - Ye.timestampEpochMs), Je = Pe.findIndex((fe) => fe.timestampEpochMs === Math.round(L));
      return ie(Je >= 0 ? Je : 0), {
        ...ue || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Pe
      };
    });
  }, [X, le]), se = u.useCallback((L, ue) => {
    je((ce) => !(ce != null && ce.keyframes) || ce.keyframes.length === 0 ? ce : jc(ce, L, ue));
  }, []), be = u.useCallback((L) => {
    je((ue) => {
      if (!(ue != null && ue.keyframes) || ue.keyframes.length <= 1) return ue;
      const ce = ue.keyframes.filter((Ne, H) => H !== L);
      return ie((Ne) => Math.max(0, Ne - 1)), { ...ue, keyframes: ce };
    });
  }, []), z = u.useCallback((L, ue) => {
    je((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length === 0) return ce;
      const Ne = Math.round(ue), H = typeof L == "number" && ce.keyframes[L] ? L : ce.keyframes.findIndex((Pe) => Pe.id === L);
      if (H === -1) return ce;
      const ke = [...ce.keyframes];
      ke[H] = {
        ...ke[H],
        timestampEpochMs: Ne
      }, ke.sort((Pe, Je) => Pe.timestampEpochMs - Je.timestampEpochMs);
      const Re = ke.findIndex((Pe) => Pe.timestampEpochMs === Ne);
      return Re >= 0 && ie(Re), {
        ...ce,
        keyframes: ke
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [ne, _e] = u.useState({}), Oe = u.useCallback((L) => {
    C((ue) => ue.filter((ce) => ce !== L)), b === L && D(null), k === L && f(null), je((ue) => {
      if (!ue || !ue.keyframes) return ue;
      const ce = ue.keyframes.map((Ne) => {
        var H;
        return {
          ...Ne,
          layout: {
            ...Ne.layout,
            placements: (((H = Ne.layout) == null ? void 0 : H.placements) || []).filter((ke) => ke.stationId !== L)
          }
        };
      });
      return { ...ue, keyframes: ce };
    });
  }, [b, k]), me = u.useCallback((L, ue) => {
    L.preventDefault(), L.stopPropagation();
    const ce = 195, Ne = 110, H = Math.min(L.clientX, window.innerWidth - ce - 10), ke = Math.min(L.clientY, window.innerHeight - Ne - 10);
    M({ x: H, y: ke, station: ue });
  }, []), de = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(x, e.inEpochMs - m)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(x, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, m, x, v]), J = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(de + 1e3, Math.min(x, e.outEpochMs - m)) : typeof e.outPointMs == "number" ? Math.max(de + 1e3, Math.min(x, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, m, x, v, t.durationMs, de]), pe = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(x, e.playheadEpochMs - m)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(x, e.playheadMs)) : de, [e.playheadEpochMs, e.playheadMs, m, x, de]), [he, We] = u.useState(de), [He, Fe] = u.useState(J);
  u.useEffect(() => {
    if (!m) return;
    const L = Math.round(m + he), ue = Math.round(m + He);
    je((ce) => {
      var Pe, Je;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      let Ne = [...ce.keyframes], H = !1, ke = Ne.find((fe) => fe.tag === "cut-in");
      if (ke)
        ke.timestampEpochMs !== L && (ke.timestampEpochMs = L, H = !0);
      else {
        const fe = Ne.find((Ye) => Math.abs(Ye.timestampEpochMs - L) < 500);
        if (fe)
          fe.tag = "cut-in", fe.timestampEpochMs = L, H = !0;
        else {
          const Ye = ((Pe = Ne[0]) == null ? void 0 : Pe.layout) || le || { width: 1920, height: 1080, placements: [] };
          Ne.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: L,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), H = !0;
        }
      }
      let Re = Ne.find((fe) => fe.tag === "cut-out");
      if (Re)
        Re.timestampEpochMs !== ue && (Re.timestampEpochMs = ue, H = !0);
      else {
        const fe = Ne.find((Ye) => Math.abs(Ye.timestampEpochMs - ue) < 500 && Ye.tag !== "cut-in");
        if (fe)
          fe.tag = "cut-out", fe.timestampEpochMs = ue, H = !0;
        else {
          const Ye = ((Je = Ne[Ne.length - 1]) == null ? void 0 : Je.layout) || le || { width: 1920, height: 1080, placements: [] };
          Ne.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ue,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), H = !0;
        }
      }
      return H ? (Ne.sort((fe, Ye) => fe.timestampEpochMs - Ye.timestampEpochMs), {
        ...ce,
        keyframes: Ne
      }) : ce;
    });
  }, [m, he, He, le]);
  const { allStations: Ee, recordingSegments: ot, isLoadingStations: Be, movieBoundaries: It } = $x(
    m,
    x,
    t,
    r,
    b
  ), Ge = u.useMemo(() => Ee.find((L) => L.id === b) || null, [Ee, b]), Et = u.useCallback((L) => {
    _e((ue) => {
      const ce = !(ue[L] ?? !0);
      return je((Ne) => {
        if (!(Ne != null && Ne.keyframes)) return Ne;
        const H = Ne.keyframes.map((ke) => {
          var fe;
          const Re = ((fe = ke.layout) == null ? void 0 : fe.placements) || [];
          let Pe = !1;
          const Je = Re.map((Ye) => {
            if (Ye.stationId === L) {
              if (!ce && (Ye.displayId === "auto" || !Ye.displayId)) {
                Pe = !0;
                const bt = Ee.find((ft) => ft.id === L);
                return {
                  ...Ye,
                  displayId: "mon-0",
                  label: `${(bt == null ? void 0 : bt.displayName) || L} - Screen 1 (Main)`
                };
              } else if (ce && (Ye.displayId === "mon-0" || !Ye.displayId) && Re.filter((ft) => ft.stationId === L).length === 1) {
                Pe = !0;
                const ft = Ee.find(($t) => $t.id === L);
                return {
                  ...Ye,
                  displayId: "auto",
                  label: `${(ft == null ? void 0 : ft.displayName) || L} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ye;
          });
          return Pe ? {
            ...ke,
            layout: {
              ...ke.layout,
              placements: Je
            }
          } : ke;
        });
        return { ...Ne, keyframes: H };
      }), {
        ...ue,
        [L]: ce
      };
    });
  }, [Ee]), en = u.useCallback((L, ue) => {
    je((ce) => {
      var Ye, bt;
      if (!ce || !ce.keyframes || ce.keyframes.length === 0) return ce;
      const Ne = X >= 0 && X < ce.keyframes.length ? X : 0, H = ce.keyframes[Ne], ke = ((Ye = H == null ? void 0 : H.layout) == null ? void 0 : Ye.placements) || [], Re = (ue || "mon-0").toLowerCase(), Pe = ke.findIndex((ft) => {
        if (ft.stationId !== L) return !1;
        const $t = (ft.displayId || "mon-0").toLowerCase();
        return $t === Re || $t === "auto" && (Re === "mon-0" || Re === "screen-0");
      });
      let Je;
      if (Pe >= 0)
        Je = ke.filter((ft, $t) => $t !== Pe);
      else {
        const ft = Ee.find((mr) => mr.id === L), $t = ((bt = ft == null ? void 0 : ft.displays) == null ? void 0 : bt.find((mr) => (mr.displayId || "").toLowerCase() === Re)) || { width: 1920, height: 1080 }, ms = $t.width || 1920, Kt = $t.height || 1080, Sn = ms / Kt, gs = Sn >= 1 ? 640 : Math.round(360 * Sn), pr = Sn >= 1 ? Math.round(640 / Sn) : 360, Hi = {
          stationId: L,
          displayId: Re,
          label: `${(ft == null ? void 0 : ft.displayName) || L} - ${$t.displayName || Re}`,
          x: 120 + ke.length * 40 % 800,
          y: 100 + ke.length * 40 % 500,
          width: gs,
          height: pr,
          sourceWidth: ms,
          sourceHeight: Kt,
          nativeAspectRatio: Sn,
          aspectRatio: Sn,
          zIndex: ke.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Je = [...ke, Hi];
      }
      const fe = [...ce.keyframes];
      return fe[Ne] = {
        ...fe[Ne],
        layout: {
          ...fe[Ne].layout,
          placements: Je
        }
      }, { ...ce, keyframes: fe };
    });
  }, [X, Ee]), ut = u.useMemo(() => !y || y.length === 0 ? [] : Ee.filter((L) => y.includes(L.id)), [Ee, y]), tn = u.useMemo(() => Ee.find((L) => L.id === k) || null, [Ee, k]), _t = !!(k && tn), vn = u.useRef("grid"), Ze = u.useRef(null), {
    playheadMs: Xe,
    setPlayheadMs: Nt,
    isPlaying: mn,
    setIsPlaying: kt,
    playbackSpeed: Lt,
    setPlaybackSpeed: Zt,
    isLooping: on,
    setIsLooping: Ln,
    togglePlaySmart: Cn
  } = Lx({
    timelineBaseEpochMs: m,
    inPointMs: he,
    outPointMs: He,
    globalGaps: E,
    activeStation: Ge,
    spotlightStation: tn,
    recordingSegments: ot,
    initialPlayheadMs: pe,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !b
  }), {
    zoomLevel: Ie,
    setZoomLevel: Te,
    viewportStartMs: Ke,
    setViewportStartMs: dt,
    resetZoom: Ct,
    fitRange: q,
    jumpViewportTo: xe
  } = Dx({
    containerRef: Ze,
    totalTimelineDurationMs: x,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [Q, Ce] = u.useState(!1), [$e, Qe] = u.useState(!1), [qe, Ve] = u.useState(!1), [it, wt] = u.useState(!1), [ct, ht] = u.useState(
    !!(e.isWorkspaceActive && ((hn = e.selectedStationIds) == null ? void 0 : hn.length) > 0)
  ), [Ft, St] = u.useState([]);
  u.useEffect(() => {
    const L = _t && tn || Ge, ue = (L == null ? void 0 : L.hostname) || (L == null ? void 0 : L.displayName) || (L == null ? void 0 : L.id), ce = (o || "NONE").toUpperCase().replace("-", "_");
    if (!ue || !m || !(ce !== "NONE" && ce !== "OFF" || a)) {
      St([]);
      return;
    }
    const H = Math.max(0, m - 5e3), ke = m + x + 5e3, Re = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(ue)}&startEpoch=${H}&endEpoch=${ke}`, { signal: Re.signal }).then((Pe) => Pe.ok ? Pe.json() : []).then((Pe) => St(Array.isArray(Pe) ? Pe : [])).catch((Pe) => {
      Pe.name !== "AbortError" && St([]);
    }), () => Re.abort();
  }, [Ge, tn, _t, m, x, o, a]), u.useEffect(() => {
    Be || (Ee.length === 0 ? ((y.length > 0 || b || ct) && (C([]), D(null), f(null), ht(!1)), wt(!0), T(!0)) : (T(!1), C((L) => {
      const ue = L.filter((ce) => Ee.some((Ne) => Ne.id === ce));
      return ue.length !== L.length ? (ue.length === 0 && (ht(!1), wt(!0)), ue) : L;
    })));
  }, [Be, Ee]);
  const Ot = u.useCallback((L) => {
    if (L === null) {
      kt(!1), Zt(1), D(null);
      return;
    }
    L !== b && Zt(1), D(L);
  }, [b, kt, Zt]), Nn = u.useCallback((L, ue = null) => {
    L !== b && Zt(1), vn.current = y.length <= 1 || b ? "spotlight" : "grid", D(L), f(L), S(ue || null);
  }, [b, y.length, Zt]), dn = u.useCallback(() => {
    f(null), S(null), vn.current === "grid" && D(null);
  }, []), Bt = u.useMemo(() => {
    if (_ != null && _.segments && _.segments.length > 0)
      return _;
    const L = y[0] || b || "mon-0";
    return {
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + x,
          sourceStationId: L
        }
      ]
    };
  }, [_, y, b, m, x]), ls = u.useCallback((L) => {
    K((ue) => {
      const ce = ue || Bt, Ne = [...ce.segments || []], H = Ne.findIndex((bt) => {
        const ft = bt.startEpochMs ?? bt.StartEpochMs ?? 0, $t = bt.endEpochMs ?? bt.EndEpochMs ?? 0;
        return L > ft + 500 && L < $t - 500;
      });
      if (H === -1) return ue;
      const ke = Ne[H], Re = ke.startEpochMs ?? ke.StartEpochMs ?? 0, Pe = ke.endEpochMs ?? ke.EndEpochMs ?? 0, Je = ke.sourceStationId ?? ke.SourceStationId ?? y[0], fe = { startEpochMs: Re, endEpochMs: L, sourceStationId: Je }, Ye = { startEpochMs: L, endEpochMs: Pe, sourceStationId: Je };
      return Ne.splice(H, 1, fe, Ye), { ...ce, segments: Ne };
    });
  }, [Bt, y]), js = u.useCallback((L, ue) => {
    K((ce) => {
      const Ne = ce || Bt, H = (Ne.segments || []).map((ke) => {
        const Re = ke.startEpochMs ?? ke.StartEpochMs ?? 0, Pe = ke.endEpochMs ?? ke.EndEpochMs ?? 0;
        return L >= Re && L <= Pe ? { ...ke, sourceStationId: ue } : ke;
      });
      return { ...Ne, segments: H };
    }), te(!1);
  }, [Bt]), vl = u.useCallback((L, ue) => {
    K((ce) => {
      const Ne = ce || Bt, H = (Ne.segments || []).map((ke) => {
        const Re = ke.startEpochMs ?? ke.StartEpochMs ?? 0, Pe = ke.endEpochMs ?? ke.EndEpochMs ?? 0;
        return L >= Re && L <= Pe ? { ...ke, gain: ue } : ke;
      });
      return { ...Ne, segments: H };
    });
  }, [Bt]), rn = u.useCallback(() => {
    te((L) => !L);
  }, []), [yt, On] = u.useState({}), Dt = u.useCallback((L) => {
    if (!L) return null;
    if (yt[L]) return yt[L];
    const ue = Ee.find((ce) => ce.id === L);
    return ue != null && ue.directorPlan ? ue.directorPlan : {
      stationId: L,
      segments: [
        {
          startEpochMs: m,
          endEpochMs: m + x,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [yt, Ee, m, x]), Nl = u.useCallback((L, ue) => {
    L && On((ce) => {
      const Ne = ce[L] || Dt(L), H = [...Ne.segments || []], ke = H.findIndex(($t) => {
        const ms = $t.startEpochMs ?? $t.StartEpochMs ?? 0, Kt = $t.endEpochMs ?? $t.EndEpochMs ?? 0;
        return ue > ms + 500 && ue < Kt - 500;
      });
      if (ke === -1) return ce;
      const Re = H[ke], Pe = Re.startEpochMs ?? Re.StartEpochMs ?? 0, Je = Re.endEpochMs ?? Re.EndEpochMs ?? 0, fe = Re.targetDisplayId ?? Re.TargetDisplayId ?? "mon-0", Ye = !!(Re.isManualOverride ?? Re.IsManualOverride), bt = { ...Re, startEpochMs: Pe, endEpochMs: ue, targetDisplayId: fe, isManualOverride: Ye }, ft = { ...Re, startEpochMs: ue, endEpochMs: Je, targetDisplayId: fe, isManualOverride: Ye };
      return H.splice(ke, 1, bt, ft), { ...ce, [L]: { ...Ne, segments: H } };
    });
  }, [Dt]), Or = u.useCallback((L, ue, ce) => {
    L && On((Ne) => {
      const H = Ne[L] || Dt(L), ke = [...H.segments || []];
      let Re = ke.findIndex((Je) => {
        const fe = Je.startEpochMs ?? Je.StartEpochMs ?? 0, Ye = Je.endEpochMs ?? Je.EndEpochMs ?? 0;
        return ue > fe && ue < Ye;
      });
      if (Re === -1 && (Re = ke.findIndex((Je) => {
        const fe = Je.startEpochMs ?? Je.StartEpochMs ?? 0, Ye = Je.endEpochMs ?? Je.EndEpochMs ?? 0;
        return ue >= fe && ue <= Ye;
      })), Re === -1) return Ne;
      const Pe = ke[Re];
      return ke[Re] = { ...Pe, targetDisplayId: ce, isManualOverride: !0 }, { ...Ne, [L]: { ...H, segments: ke } };
    });
  }, [Dt]), Es = u.useCallback((L, ue) => {
    if (!L) return;
    const ce = Ee.find((H) => H.id === L), Ne = ce == null ? void 0 : ce.directorPlan;
    On((H) => {
      var ms;
      const ke = H[L] || Dt(L), Re = [...ke.segments || []];
      let Pe = Re.findIndex((Kt) => {
        const Sn = Kt.startEpochMs ?? Kt.StartEpochMs ?? 0, gs = Kt.endEpochMs ?? Kt.EndEpochMs ?? 0;
        return ue > Sn && ue < gs;
      });
      if (Pe === -1 && (Pe = Re.findIndex((Kt) => {
        const Sn = Kt.startEpochMs ?? Kt.StartEpochMs ?? 0, gs = Kt.endEpochMs ?? Kt.EndEpochMs ?? 0;
        return ue >= Sn && ue <= gs;
      })), Pe === -1) return H;
      const Je = Re[Pe], fe = Je.startEpochMs ?? Je.StartEpochMs ?? 0, Ye = Je.endEpochMs ?? Je.EndEpochMs ?? 0, bt = (fe + Ye) / 2, ft = (ms = Ne == null ? void 0 : Ne.segments) == null ? void 0 : ms.find((Kt) => {
        const Sn = Kt.startEpochMs ?? Kt.StartEpochMs ?? 0, gs = Kt.endEpochMs ?? Kt.EndEpochMs ?? 0;
        return bt >= Sn && bt <= gs;
      }), $t = ft ? ft.targetDisplayId ?? ft.TargetDisplayId ?? "mon-0" : "mon-0";
      return Re[Pe] = { ...Je, targetDisplayId: $t, isManualOverride: !1 }, { ...H, [L]: { ...ke, segments: Re } };
    });
  }, [Ee, Dt]), Ae = u.useMemo(() => ut.map((L) => ({
    ...L,
    directorPlan: yt[L.id] || L.directorPlan || Dt(L.id)
  })), [ut, yt, Dt]), Se = u.useMemo(() => Ge ? {
    ...Ge,
    directorPlan: yt[Ge.id] || Ge.directorPlan || Dt(Ge.id)
  } : null, [Ge, yt, Dt]), ps = u.useMemo(() => tn ? {
    ...tn,
    directorPlan: yt[tn.id] || tn.directorPlan || Dt(tn.id)
  } : null, [tn, yt, Dt]);
  Px({
    activeStationId: b,
    spotlightStationId: k,
    timelineStations: Ae,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: Ot,
    setPlaybackSpeed: Zt,
    playheadMs: Xe,
    setPlayheadMs: Nt,
    inPointMs: he,
    setInPointMs: We,
    outPointMs: He,
    setOutPointMs: Fe,
    totalTimelineDurationMs: x,
    zoomLevel: Ie,
    togglePlaySmart: Cn,
    onToggleHelpModal: () => Ve((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var ue, ce, Ne;
      const L = b || (y.length === 1 ? y[0] : null);
      if (L) {
        const H = Ee.find((Re) => Re.id === L);
        (((ue = H == null ? void 0 : H.displays) == null ? void 0 : ue.length) > 1 || ((Ne = (ce = H == null ? void 0 : H.topology) == null ? void 0 : ce.displays) == null ? void 0 : Ne.length) > 1) && Nl(L, m + Xe);
      }
    },
    isModalActive: Q || $e || qe
  }), u.useEffect(() => {
    const L = m + he, ue = m + He, ce = m + Xe;
    mp({
      timeRange: t,
      timeMode: r,
      inPointMs: he,
      outPointMs: He,
      playheadMs: Math.round(Xe),
      inEpochMs: L,
      outEpochMs: ue,
      playheadEpochMs: ce,
      selectedStationIds: y,
      activeStationId: b,
      zoomLevel: Ie,
      viewportStartMs: Ke,
      isWorkspaceActive: ct,
      isLooping: on,
      playbackSpeed: Lt,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: O,
      compositionLayout: A,
      isAutoDirectorEnabled: B,
      isPipSwapped: I,
      audioRoutingPlan: Bt,
      isAutoFollowAudio: F,
      canvasLayoutTimeline: Le
    });
  }, [
    t,
    r,
    he,
    He,
    Xe,
    y,
    b,
    Ie,
    Ke,
    ct,
    on,
    Lt,
    m,
    o,
    a,
    O,
    A,
    B,
    I,
    Bt,
    F,
    Le
  ]);
  const go = u.useCallback((L) => {
    var fe, Ye;
    const ue = Al(L.startTime), ce = Al(L.endTime), Ne = Math.max(0, ce - ue) || 144e5, H = {
      start: L.startTime,
      end: L.endTime,
      durationMs: Ne,
      startEpochMs: ue,
      endEpochMs: ce
    }, ke = Math.max(6e4, Math.round(Ne * 0.05)), Re = ue - ke, Pe = Ne + 2 * ke;
    if (n(H), L.inEpochMs && L.outEpochMs) {
      const bt = Math.max(0, Math.min(Pe, L.inEpochMs - Re)), ft = Math.max(bt + 1e3, Math.min(Pe, L.outEpochMs - Re)), $t = L.playheadEpochMs ? Math.max(0, Math.min(Pe, L.playheadEpochMs - Re)) : bt;
      We(bt), Fe(ft), Nt($t);
    } else {
      const bt = typeof L.inPointMs == "number" ? L.inPointMs : ke, ft = typeof L.outPointMs == "number" ? L.outPointMs : ke + Ne, $t = typeof L.playheadMs == "number" ? L.playheadMs : bt;
      We(Math.max(0, Math.min(Pe, bt))), Fe(Math.max(0, Math.min(Pe, ft))), Nt(Math.max(0, Math.min(Pe, $t)));
    }
    const Je = ((fe = L.selectedStationIds) == null ? void 0 : fe.length) > 0 ? L.selectedStationIds : ((Ye = L.cutStationIds) == null ? void 0 : Ye.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((Je == null ? void 0 : Je.length) > 0) {
      C(Je);
      const bt = L.spotlightStationId || L.SpotlightStationId || null, ft = L.activeStationId || L.ActiveStationId || null;
      bt && Je.includes(bt) ? (D(bt), f(bt)) : ft && Je.includes(ft) ? (D(ft), f(null)) : (D(null), f(null));
    }
    L.keystrokeMode && i(L.keystrokeMode), ht(!0), wt(!1);
  }, []), Wi = u.useCallback((L) => {
    const ue = L.startEpochMs || Al(L.start, null, r), ce = L.endEpochMs || Al(L.end, null, r), Ne = Math.max(0, ce - ue) || 144e5, H = Math.max(6e4, Math.round(Ne * 0.05)), ke = ue - H, Re = Ne + 2 * H;
    n({
      ...L,
      startEpochMs: ue,
      endEpochMs: ce,
      durationMs: Ne
    }), T(!1), We(H), Fe(H + Ne), Nt(H), je((Pe) => {
      if (!(Pe != null && Pe.keyframes) || Pe.keyframes.length === 0) return Pe;
      const Je = Pe.keyframes.map((fe, Ye) => Ye === 0 ? { ...fe, timestampEpochMs: ke } : fe).filter((fe) => fe.timestampEpochMs >= ke && fe.timestampEpochMs <= ke + Re);
      return { ...Pe, keyframes: Je };
    }), K((Pe) => {
      if (!(Pe != null && Pe.segments) || Pe.segments.length === 0) return Pe;
      if (!Pe.segments.some((fe) => {
        const Ye = fe.startEpochMs ?? fe.StartEpochMs ?? 0;
        return (fe.endEpochMs ?? fe.EndEpochMs ?? 0) > ke && Ye < ke + Re;
      })) {
        const fe = y[0] || b || "station-0";
        return {
          segments: [
            {
              startEpochMs: ke,
              endEpochMs: ke + Re,
              sourceStationId: fe
            }
          ]
        };
      }
      return Pe;
    }), On({});
  }, [r, y, b]), xo = u.useCallback(() => {
    if (ut.map((ue) => ue.id).length === 0) return alert("No active stations selected in timeline.");
    G(!0);
  }, [ut]), zi = u.useCallback(async (L, ue) => {
    var Re, Pe, Je, fe;
    const ce = ut.map((Ye) => Ye.id);
    if (ce.length === 0) return;
    let Ne = L === "None" ? "None" : "BurnIn";
    const H = ue || "NATIVE", ke = ((Re = Se == null ? void 0 : Se.displays) == null ? void 0 : Re.length) > 1 || ((Je = (Pe = Se == null ? void 0 : Se.topology) == null ? void 0 : Pe.displays) == null ? void 0 : Je.length) > 1 ? ((fe = Se == null ? void 0 : Se.directorPlan) == null ? void 0 : fe.segments) || [] : [];
    try {
      const Ye = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: ce,
          inEpochMs: m + he,
          outEpochMs: m + He,
          keystrokeMode: Ne,
          resolution: H,
          videoQuality: H,
          compositionScope: O,
          layoutMode: "canvas",
          canvasLayout: le,
          canvasLayoutTimeline: Le,
          isPipSwapped: I,
          isAutoDirectorEnabled: B,
          directorSegments: ke,
          audioRoutingSegments: Bt.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!Ye.ok) throw new Error(`HTTP ${Ye.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Ye) {
      console.error("[Studio] Export failed:", Ye), alert("Failed to launch background master MP4 export job.");
    }
  }, [ut, m, he, He, O, le, Le, I, B, Se, Bt]), fr = u.useCallback(() => {
    Ng();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Xd(), ue = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), We(ue), Fe(ue + L.durationMs), Nt(ue), C([]), D(null), f(null), kt(!1), Zt(1), i("BURN_IN"), Ct(), ht(!1), wt(!0);
  }, [Ct, kt, Zt, Nt]), nn = !ct || y.length === 0, Yt = m + Xe;
  return u.useEffect(() => {
    const L = Le == null ? void 0 : Le.keyframes;
    if (!L || L.length === 0) return;
    let ue = 0;
    for (let ce = 0; ce < L.length && L[ce].timestampEpochMs <= Yt + 50; ce++)
      ue = ce;
    ue !== X && ie(ue);
  }, [Yt, Le == null ? void 0 : Le.keyframes, X]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        gg,
        {
          timeRange: t,
          baseEpochMs: h,
          timeMode: r,
          setTimeMode: l,
          activeStationId: b,
          hideBackToGrid: ut.length <= 1,
          onResetActiveStation: () => Ot(null),
          onOpenRangeModal: () => Ce(!0),
          onOpenBookmarksModal: () => Qe(!0),
          onOpenHelpModal: () => Ve(!0),
          onToggleDrawer: () => wt(!it),
          isInitialSetup: nn,
          selectedCount: y.length,
          totalCount: Ee.length,
          onResetStudio: fr
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
              onClick: () => T(!1),
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
              Dg,
              {
                activeStation: Se,
                timelineStations: Ae,
                allStations: Ee,
                onSelectActiveStation: Ot,
                onOpenSpotlight: Nn,
                onStationContextMenu: me,
                onDeselectStation: Oe,
                stationAutoDirectorMap: ne,
                onToggleStationAutoDirector: Et,
                onOpenDrawer: () => wt(!0),
                baseEpochMs: m,
                playheadMs: Xe,
                playheadEpochMs: Yt,
                timeMode: r,
                isPlaying: _t ? !1 : mn,
                setIsPlaying: kt,
                totalDurationMs: x,
                inPointMs: he,
                outPointMs: He,
                setPlayheadMs: Nt,
                globalGaps: E,
                recordingSegments: ot,
                playbackSpeed: Lt,
                onChangePlaybackSpeed: Zt,
                keystrokeMode: o,
                keystrokes: Ft,
                directorPlan: Se == null ? void 0 : Se.directorPlan,
                onOverrideDisplay: Or,
                onResetOverride: Es,
                compositionScope: O,
                onChangeCompositionScope: U,
                compositionLayout: A,
                onChangeCompositionLayout: oe,
                isAutoDirectorEnabled: B,
                onToggleAutoDirector: () => re((L) => !L),
                isPipSwapped: I,
                onTogglePipSwap: () => R((L) => !L),
                onUpdateCanvasLayout: ze,
                canvasLayoutTimeline: Le,
                onUpdateCanvasLayoutTimeline: je,
                activeKfIndex: X,
                setActiveKfIndex: ie,
                isModalOpen: Z || Q || $e || _t || qe
              }
            ),
            /* @__PURE__ */ s.jsx(
              yp,
              {
                baseEpochMs: m,
                timeMode: r,
                totalDurationMs: x,
                playheadMs: Xe,
                setPlayheadMs: Nt,
                inPointMs: he,
                setInPointMs: We,
                outPointMs: He,
                setOutPointMs: Fe,
                activeStationId: b,
                isPlaying: mn,
                setIsPlaying: Cn,
                isLooping: on,
                setIsLooping: Ln,
                playbackSpeed: Lt,
                onChangeSpeed: Zt,
                onSetInPoint: () => We(Math.max(0, Math.min(Xe, He - 1e3))),
                onSetOutPoint: () => Fe(Math.min(x, Math.max(Xe, he + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Ze, children: /* @__PURE__ */ s.jsx(
            wp,
            {
              stations: Ae,
              activeStationId: b,
              onSelectActiveStation: (L) => Ot(y.length <= 1 ? L : L === b ? null : L),
              onStationContextMenu: me,
              onDeselectStation: Oe,
              stationAutoDirectorMap: ne,
              onToggleStationAutoDirector: Et,
              baseEpochMs: m,
              timeMode: r,
              totalDurationMs: x,
              zoomLevel: Ie,
              onZoomChange: Te,
              onZoomReset: Ct,
              onFitRange: q,
              onJumpViewportTo: xe,
              playheadMs: Xe,
              setPlayheadMs: Nt,
              inPointMs: he,
              setInPointMs: We,
              outPointMs: He,
              setOutPointMs: Fe,
              viewportStartMs: Ke,
              onViewportStartChange: dt,
              onExport: xo,
              recordingSegments: ot,
              movieBoundaries: It,
              onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && j(L.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: Ft,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((L) => !L),
              onSplitDirectorSegment: Nl,
              onChangeDirectorSegmentDisplay: Or,
              onResetDirectorSegmentToAuto: Es,
              audioRoutingPlan: Bt,
              onSplitAudioSegment: ls,
              onChangeAudioSegmentStation: js,
              onChangeAudioSegmentGain: vl,
              onFollowVisualFeed: rn,
              isAutoFollowAudio: F,
              canvasLayoutTimeline: Le,
              activeKfIndex: X,
              onSelectKeyframe: (L, ue) => {
                ie(L), Nt(Math.max(0, ue - m));
              },
              onAddKeyframeAtEpoch: ee,
              onDeleteKeyframe: be,
              onUpdateKeyframeEpoch: z,
              onUpdateKeyframeTransition: se,
              onToggleDisplayOnCanvas: en,
              onUpdateAudioPlan: K
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          vx,
          {
            isOpen: it || nn,
            onToggle: () => wt(!it),
            onClose: () => wt(!1),
            allStations: Ee,
            selectedStationIds: y,
            onToggleStation: (L) => C((ue) => ue.includes(L) ? ue.filter((ce) => ce !== L) : [...ue, L]),
            onUpdateSelections: C,
            isInitialSetup: nn,
            isLoadingStations: Be,
            recordingSegments: ot,
            baseEpochMs: h,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (D(null), f(null), ht(!0), wt(!1));
            },
            onOpenRangeModal: () => Ce(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      wx,
      {
        isOpen: Q,
        onClose: () => Ce(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: go,
        onApplyRange: Wi
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ex,
      {
        isOpen: $e,
        onClose: () => Qe(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: m,
          timelineBaseEpochMs: m,
          playheadMs: Xe,
          inPointMs: he,
          outPointMs: He,
          selectedStationIds: y,
          selectedStationNames: Ee.filter((L) => y.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: Ee.map((L) => L.id),
          activeStationId: b,
          activeStationName: (Ge == null ? void 0 : Ge.displayName) || (Ge == null ? void 0 : Ge.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: go
      }
    ),
    /* @__PURE__ */ s.jsx(
      Cp,
      {
        isOpen: qe,
        onClose: () => Ve(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Tx,
      {
        isOpen: _t,
        station: ps,
        initialDisplayId: d,
        allStations: Ae,
        onSelectStation: (L) => {
          L !== k && Zt(1), D(L), f(L);
        },
        onClose: dn,
        baseEpochMs: m,
        timeMode: r,
        totalDurationMs: x,
        zoomLevel: Ie,
        onZoomChange: Te,
        onZoomReset: Ct,
        onFitRange: q,
        onJumpViewportTo: xe,
        viewportStartMs: Ke,
        onViewportStartChange: dt,
        playheadMs: Xe,
        setPlayheadMs: Nt,
        playheadEpochMs: Yt,
        inPointMs: he,
        setInPointMs: We,
        outPointMs: He,
        setOutPointMs: Fe,
        recordingSegments: ot,
        globalGaps: E,
        isPlaying: mn,
        setIsPlaying: kt,
        isLooping: on,
        setIsLooping: Ln,
        playbackSpeed: Lt,
        setPlaybackSpeed: Zt,
        onExport: xo,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: Ft,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((L) => !L),
        directorPlan: ps == null ? void 0 : ps.directorPlan,
        onOverrideDisplay: Or,
        onSplitDirectorSegment: Nl,
        onChangeDirectorSegmentDisplay: Or,
        onResetDirectorSegmentToAuto: Es
      }
    ),
    /* @__PURE__ */ s.jsx(
      Ax,
      {
        menu: g,
        onClose: () => M(null),
        onDeselect: Oe,
        onFocusSolo: Ot
      }
    ),
    /* @__PURE__ */ s.jsx(
      Rx,
      {
        isOpen: Z,
        onClose: () => G(!1),
        onConfirm: zi,
        compositionSummary: {
          scope: O,
          layout: (le == null ? void 0 : le.preset) || A,
          isPipSwapped: I,
          isAutoDirectorEnabled: B,
          stationsCount: ut.length,
          audioSegmentsCount: ((an = Bt == null ? void 0 : Bt.segments) == null ? void 0 : an.length) || 1,
          resolution: (Le == null ? void 0 : Le.resolution) || "NATIVE",
          canvasWidth: (le == null ? void 0 : le.width) || 1920,
          canvasHeight: (le == null ? void 0 : le.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Sp, {})
  ] });
}
const Qd = "itb-extractor-advanced-theme", Jd = "itb-global-export-job-monitor-root";
function bp() {
  if (!(typeof document > "u") && !document.getElementById(Qd)) {
    const e = document.createElement("link");
    e.id = Qd, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
bp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Jd);
  if (!t) {
    t = document.createElement("div"), t.id = Jd, document.body.appendChild(t);
    try {
      qo.createRoot(t).render(uo.createElement(Sp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Fx(e, t = {}) {
  bp();
  const n = qo.createRoot(e);
  return n.render(uo.createElement(_x, t)), () => {
    n.unmount();
  };
}
export {
  Sp as ExportJobMonitor,
  _x as ExtractorAdvancedStudio,
  _x as default,
  Fx as mount
};
