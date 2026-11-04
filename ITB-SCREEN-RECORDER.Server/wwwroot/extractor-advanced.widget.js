function Dp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gd = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho = Symbol.for("react.element"), Pp = Symbol.for("react.portal"), _p = Symbol.for("react.fragment"), Fp = Symbol.for("react.strict_mode"), Bp = Symbol.for("react.profiler"), Wp = Symbol.for("react.provider"), Up = Symbol.for("react.context"), zp = Symbol.for("react.forward_ref"), Hp = Symbol.for("react.suspense"), Kp = Symbol.for("react.memo"), Vp = Symbol.for("react.lazy"), Su = Symbol.iterator;
function Yp(e) {
  return e === null || typeof e != "object" ? null : (e = Su && e[Su] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Qd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Jd = Object.assign, Zd = {};
function yl(e, t, n) {
  this.props = e, this.context = t, this.refs = Zd, this.updater = n || Qd;
}
yl.prototype.isReactComponent = {};
yl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
yl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function qd() {
}
qd.prototype = yl.prototype;
function Cc(e, t, n) {
  this.props = e, this.context = t, this.refs = Zd, this.updater = n || Qd;
}
var Sc = Cc.prototype = new qd();
Sc.constructor = Cc;
Jd(Sc, yl.prototype);
Sc.isPureReactComponent = !0;
var bu = Array.isArray, eh = Object.prototype.hasOwnProperty, bc = { current: null }, th = { key: !0, ref: !0, __self: !0, __source: !0 };
function nh(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) eh.call(t, r) && !th.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), h = 0; h < a; h++) c[h] = arguments[h + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: ho, type: e, key: o, ref: i, props: l, _owner: bc.current };
}
function Xp(e, t) {
  return { $$typeof: ho, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Mc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ho;
}
function Gp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Mu = /\/+/g;
function Yi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Gp("" + e.key) : t.toString(36);
}
function Bo(e, t, n, r, l) {
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
        case Pp:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Yi(i, 0) : r, bu(l) ? (n = "", e != null && (n = e.replace(Mu, "$&/") + "/"), Bo(l, t, n, "", function(h) {
    return h;
  })) : l != null && (Mc(l) && (l = Xp(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Mu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", bu(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var c = r + Yi(o, a);
    i += Bo(o, t, n, c, l);
  }
  else if (c = Yp(e), typeof c == "function") for (e = c.call(e), a = 0; !(o = e.next()).done; ) o = o.value, c = r + Yi(o, a++), i += Bo(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function ko(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Bo(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Qp(e) {
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
var $n = { current: null }, Wo = { transition: null }, Jp = { ReactCurrentDispatcher: $n, ReactCurrentBatchConfig: Wo, ReactCurrentOwner: bc };
function sh() {
  throw Error("act(...) is not supported in production builds of React.");
}
mt.Children = { map: ko, forEach: function(e, t, n) {
  ko(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ko(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ko(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Mc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
mt.Component = yl;
mt.Fragment = _p;
mt.Profiler = Bp;
mt.PureComponent = Cc;
mt.StrictMode = Fp;
mt.Suspense = Hp;
mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jp;
mt.act = sh;
mt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Jd({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = bc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) eh.call(t, c) && !th.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var h = 0; h < c; h++) a[h] = arguments[h + 2];
    r.children = a;
  }
  return { $$typeof: ho, type: e.type, key: l, ref: o, props: r, _owner: i };
};
mt.createContext = function(e) {
  return e = { $$typeof: Up, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Wp, _context: e }, e.Consumer = e;
};
mt.createElement = nh;
mt.createFactory = function(e) {
  var t = nh.bind(null, e);
  return t.type = e, t;
};
mt.createRef = function() {
  return { current: null };
};
mt.forwardRef = function(e) {
  return { $$typeof: zp, render: e };
};
mt.isValidElement = Mc;
mt.lazy = function(e) {
  return { $$typeof: Vp, _payload: { _status: -1, _result: e }, _init: Qp };
};
mt.memo = function(e, t) {
  return { $$typeof: Kp, type: e, compare: t === void 0 ? null : t };
};
mt.startTransition = function(e) {
  var t = Wo.transition;
  Wo.transition = {};
  try {
    e();
  } finally {
    Wo.transition = t;
  }
};
mt.unstable_act = sh;
mt.useCallback = function(e, t) {
  return $n.current.useCallback(e, t);
};
mt.useContext = function(e) {
  return $n.current.useContext(e);
};
mt.useDebugValue = function() {
};
mt.useDeferredValue = function(e) {
  return $n.current.useDeferredValue(e);
};
mt.useEffect = function(e, t) {
  return $n.current.useEffect(e, t);
};
mt.useId = function() {
  return $n.current.useId();
};
mt.useImperativeHandle = function(e, t, n) {
  return $n.current.useImperativeHandle(e, t, n);
};
mt.useInsertionEffect = function(e, t) {
  return $n.current.useInsertionEffect(e, t);
};
mt.useLayoutEffect = function(e, t) {
  return $n.current.useLayoutEffect(e, t);
};
mt.useMemo = function(e, t) {
  return $n.current.useMemo(e, t);
};
mt.useReducer = function(e, t, n) {
  return $n.current.useReducer(e, t, n);
};
mt.useRef = function(e) {
  return $n.current.useRef(e);
};
mt.useState = function(e) {
  return $n.current.useState(e);
};
mt.useSyncExternalStore = function(e, t, n) {
  return $n.current.useSyncExternalStore(e, t, n);
};
mt.useTransition = function() {
  return $n.current.useTransition();
};
mt.version = "18.3.1";
Gd.exports = mt;
var u = Gd.exports;
const fo = /* @__PURE__ */ Dp(u);
var ei = {}, rh = { exports: {} }, Qn = {}, lh = { exports: {} }, oh = {};
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
      var V = _ - 1 >>> 1, F = I[V];
      if (0 < l(F, R)) I[V] = R, I[_] = F, _ = V;
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
      e: for (var V = 0, F = I.length, ne = F >>> 1; V < ne; ) {
        var Z = 2 * (V + 1) - 1, G = I[Z], se = Z + 1, _e = I[se];
        if (0 > l(G, _)) se < F && 0 > l(_e, G) ? (I[V] = _e, I[se] = _, V = se) : (I[V] = G, I[Z] = _, V = Z);
        else if (se < F && 0 > l(_e, _)) I[V] = _e, I[se] = _, V = se;
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
  var c = [], h = [], y = 1, f = null, x = 3, v = !1, C = !1, M = !1, D = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
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
    if (M = !1, d(I), !C) if (n(c) !== null) C = !0, W(E);
    else {
      var R = n(h);
      R !== null && re(S, R.startTime - I);
    }
  }
  function E(I, R) {
    C = !1, M && (M = !1, k(T), T = -1), v = !0;
    var _ = x;
    try {
      for (d(R), f = n(c); f !== null && (!(f.expirationTime > R) || I && !O()); ) {
        var V = f.callback;
        if (typeof V == "function") {
          f.callback = null, x = f.priorityLevel;
          var F = V(f.expirationTime <= R);
          R = e.unstable_now(), typeof F == "function" ? f.callback = F : f === n(c) && r(c), d(R);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var ne = !0;
      else {
        var Z = n(h);
        Z !== null && re(S, Z.startTime - R), ne = !1;
      }
      return ne;
    } finally {
      f = null, x = _, v = !1;
    }
  }
  var j = !1, N = null, T = -1, g = 5, b = -1;
  function O() {
    return !(e.unstable_now() - b < g);
  }
  function U() {
    if (N !== null) {
      var I = e.unstable_now();
      b = I;
      var R = !0;
      try {
        R = N(!0, I);
      } finally {
        R ? A() : (j = !1, N = null);
      }
    } else j = !1;
  }
  var A;
  if (typeof m == "function") A = function() {
    m(U);
  };
  else if (typeof MessageChannel < "u") {
    var H = new MessageChannel(), oe = H.port2;
    H.port1.onmessage = U, A = function() {
      oe.postMessage(null);
    };
  } else A = function() {
    D(U, 0);
  };
  function W(I) {
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
    C || v || (C = !0, W(E));
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
    var V = e.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? V + _ : V) : _ = V, I) {
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
    return F = _ + F, I = { id: y++, callback: R, priorityLevel: I, startTime: _, expirationTime: F, sortIndex: -1 }, _ > V ? (I.sortIndex = _, t(h, I), n(c) === null && I === n(h) && (M ? (k(T), T = -1) : M = !0, re(S, _ - V))) : (I.sortIndex = F, t(c, I), C || v || (C = !0, W(E))), I;
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
})(oh);
lh.exports = oh;
var Zp = lh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qp = u, Gn = Zp;
function ye(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ih = /* @__PURE__ */ new Set(), Yl = {};
function Lr(e, t) {
  dl(e, t), dl(e + "Capture", t);
}
function dl(e, t) {
  for (Yl[e] = t, e = 0; e < t.length; e++) ih.add(t[e]);
}
var Os = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Sa = Object.prototype.hasOwnProperty, em = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Iu = {}, Tu = {};
function tm(e) {
  return Sa.call(Tu, e) ? !0 : Sa.call(Iu, e) ? !1 : em.test(e) ? Tu[e] = !0 : (Iu[e] = !0, !1);
}
function nm(e, t, n, r) {
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
function sm(e, t, n, r) {
  if (t === null || typeof t > "u" || nm(e, t, n, r)) return !0;
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
function Ln(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var Nn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Nn[e] = new Ln(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Nn[t] = new Ln(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Nn[e] = new Ln(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Nn[e] = new Ln(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Nn[e] = new Ln(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Nn[e] = new Ln(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Nn[e] = new Ln(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Nn[e] = new Ln(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Nn[e] = new Ln(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ic = /[\-:]([a-z])/g;
function Tc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ic,
    Tc
  );
  Nn[t] = new Ln(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ic, Tc);
  Nn[t] = new Ln(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ic, Tc);
  Nn[t] = new Ln(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Nn[e] = new Ln(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Nn.xlinkHref = new Ln("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Nn[e] = new Ln(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ac(e, t, n, r) {
  var l = Nn.hasOwnProperty(t) ? Nn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (sm(t, n, l, r) && (n = null), r || l === null ? tm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Fs = qp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, wo = Symbol.for("react.element"), zr = Symbol.for("react.portal"), Hr = Symbol.for("react.fragment"), Rc = Symbol.for("react.strict_mode"), ba = Symbol.for("react.profiler"), ah = Symbol.for("react.provider"), ch = Symbol.for("react.context"), $c = Symbol.for("react.forward_ref"), Ma = Symbol.for("react.suspense"), Ia = Symbol.for("react.suspense_list"), Lc = Symbol.for("react.memo"), Gs = Symbol.for("react.lazy"), uh = Symbol.for("react.offscreen"), Au = Symbol.iterator;
function El(e) {
  return e === null || typeof e != "object" ? null : (e = Au && e[Au] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Vt = Object.assign, Xi;
function Ll(e) {
  if (Xi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Xi = t && t[1] || "";
  }
  return `
` + Xi + e;
}
var Gi = !1;
function Qi(e, t) {
  if (!e || Gi) return "";
  Gi = !0;
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
    Gi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Ll(e) : "";
}
function rm(e) {
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
    case Hr:
      return "Fragment";
    case zr:
      return "Portal";
    case ba:
      return "Profiler";
    case Rc:
      return "StrictMode";
    case Ma:
      return "Suspense";
    case Ia:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ch:
      return (e.displayName || "Context") + ".Consumer";
    case ah:
      return (e._context.displayName || "Context") + ".Provider";
    case $c:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Lc:
      return t = e.displayName || null, t !== null ? t : Ta(e.type) || "Memo";
    case Gs:
      t = e._payload, e = e._init;
      try {
        return Ta(e(t));
      } catch {
      }
  }
  return null;
}
function lm(e) {
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
      return t === Rc ? "StrictMode" : "Mode";
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
function hr(e) {
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
function om(e) {
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
function jo(e) {
  e._valueTracker || (e._valueTracker = om(e));
}
function hh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = dh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ti(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Aa(e, t) {
  var n = t.checked;
  return Vt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ru(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = hr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function fh(e, t) {
  t = t.checked, t != null && Ac(e, "checked", t, !1);
}
function Ra(e, t) {
  fh(e, t);
  var n = hr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? $a(e, t.type, n) : t.hasOwnProperty("defaultValue") && $a(e, t.type, hr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
  (t !== "number" || ti(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ol = Array.isArray;
function nl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + hr(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(ye(91));
  return Vt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Lu(e, t) {
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
  e._wrapperState = { initialValue: hr(n) };
}
function ph(e, t) {
  var n = hr(t.value), r = hr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ou(e) {
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
function Oa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? mh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Eo, gh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Eo = Eo || document.createElement("div"), Eo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Eo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Xl(e, t) {
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
}, im = ["Webkit", "ms", "Moz", "O"];
Object.keys(_l).forEach(function(e) {
  im.forEach(function(t) {
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
var am = Vt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Da(e, t) {
  if (t) {
    if (am[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ye(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ye(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ye(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ye(62));
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
function Oc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Fa = null, sl = null, rl = null;
function Du(e) {
  if (e = go(e)) {
    if (typeof Fa != "function") throw Error(ye(280));
    var t = e.stateNode;
    t && (t = Ai(t), Fa(e.stateNode, e.type, t));
  }
}
function vh(e) {
  sl ? rl ? rl.push(e) : rl = [e] : sl = e;
}
function Nh() {
  if (sl) {
    var e = sl, t = rl;
    if (rl = sl = null, Du(e), t) for (e = 0; e < t.length; e++) Du(t[e]);
  }
}
function kh(e, t) {
  return e(t);
}
function wh() {
}
var Ji = !1;
function jh(e, t, n) {
  if (Ji) return e(t, n);
  Ji = !0;
  try {
    return kh(e, t, n);
  } finally {
    Ji = !1, (sl !== null || rl !== null) && (wh(), Nh());
  }
}
function Gl(e, t) {
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
  if (n && typeof n != "function") throw Error(ye(231, t, typeof n));
  return n;
}
var Ba = !1;
if (Os) try {
  var Cl = {};
  Object.defineProperty(Cl, "passive", { get: function() {
    Ba = !0;
  } }), window.addEventListener("test", Cl, Cl), window.removeEventListener("test", Cl, Cl);
} catch {
  Ba = !1;
}
function cm(e, t, n, r, l, o, i, a, c) {
  var h = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, h);
  } catch (y) {
    this.onError(y);
  }
}
var Fl = !1, ni = null, si = !1, Wa = null, um = { onError: function(e) {
  Fl = !0, ni = e;
} };
function dm(e, t, n, r, l, o, i, a, c) {
  Fl = !1, ni = null, cm.apply(um, arguments);
}
function hm(e, t, n, r, l, o, i, a, c) {
  if (dm.apply(this, arguments), Fl) {
    if (Fl) {
      var h = ni;
      Fl = !1, ni = null;
    } else throw Error(ye(198));
    si || (si = !0, Wa = h);
  }
}
function Or(e) {
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
  if (Or(e) !== e) throw Error(ye(188));
}
function fm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Or(e), t === null) throw Error(ye(188));
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
      throw Error(ye(188));
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
        if (!i) throw Error(ye(189));
      }
    }
    if (n.alternate !== r) throw Error(ye(190));
  }
  if (n.tag !== 3) throw Error(ye(188));
  return n.stateNode.current === n ? e : t;
}
function Ch(e) {
  return e = fm(e), e !== null ? Sh(e) : null;
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
var bh = Gn.unstable_scheduleCallback, _u = Gn.unstable_cancelCallback, pm = Gn.unstable_shouldYield, mm = Gn.unstable_requestPaint, nn = Gn.unstable_now, gm = Gn.unstable_getCurrentPriorityLevel, Dc = Gn.unstable_ImmediatePriority, Mh = Gn.unstable_UserBlockingPriority, ri = Gn.unstable_NormalPriority, xm = Gn.unstable_LowPriority, Ih = Gn.unstable_IdlePriority, bi = null, js = null;
function ym(e) {
  if (js && typeof js.onCommitFiberRoot == "function") try {
    js.onCommitFiberRoot(bi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var fs = Math.clz32 ? Math.clz32 : km, vm = Math.log, Nm = Math.LN2;
function km(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (vm(e) / Nm | 0) | 0;
}
var Co = 64, So = 4194304;
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
function li(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? r = Dl(a) : (o &= i, o !== 0 && (r = Dl(o)));
  } else i = n & ~l, i !== 0 ? r = Dl(i) : o !== 0 && (r = Dl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - fs(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function wm(e, t) {
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
function jm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - fs(o), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & r) && (l[i] = wm(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Ua(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Th() {
  var e = Co;
  return Co <<= 1, !(Co & 4194240) && (Co = 64), e;
}
function Zi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function po(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - fs(t), e[t] = n;
}
function Em(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - fs(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Pc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - fs(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var It = 0;
function Ah(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Rh, _c, $h, Lh, Oh, za = !1, bo = [], rr = null, lr = null, or = null, Ql = /* @__PURE__ */ new Map(), Jl = /* @__PURE__ */ new Map(), qs = [], Cm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Fu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rr = null;
      break;
    case "dragenter":
    case "dragleave":
      lr = null;
      break;
    case "mouseover":
    case "mouseout":
      or = null;
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
function Sl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = go(t), t !== null && _c(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Sm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return rr = Sl(rr, e, t, n, r, l), !0;
    case "dragenter":
      return lr = Sl(lr, e, t, n, r, l), !0;
    case "mouseover":
      return or = Sl(or, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ql.set(o, Sl(Ql.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Jl.set(o, Sl(Jl.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Dh(e) {
  var t = wr(e.target);
  if (t !== null) {
    var n = Or(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Eh(n), t !== null) {
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
    var n = Ha(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      _a = r, n.target.dispatchEvent(r), _a = null;
    } else return t = go(n), t !== null && _c(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Bu(e, t, n) {
  Uo(e) && n.delete(t);
}
function bm() {
  za = !1, rr !== null && Uo(rr) && (rr = null), lr !== null && Uo(lr) && (lr = null), or !== null && Uo(or) && (or = null), Ql.forEach(Bu), Jl.forEach(Bu);
}
function bl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, za || (za = !0, Gn.unstable_scheduleCallback(Gn.unstable_NormalPriority, bm)));
}
function Zl(e) {
  function t(l) {
    return bl(l, e);
  }
  if (0 < bo.length) {
    bl(bo[0], e);
    for (var n = 1; n < bo.length; n++) {
      var r = bo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (rr !== null && bl(rr, e), lr !== null && bl(lr, e), or !== null && bl(or, e), Ql.forEach(t), Jl.forEach(t), n = 0; n < qs.length; n++) r = qs[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < qs.length && (n = qs[0], n.blockedOn === null); ) Dh(n), n.blockedOn === null && qs.shift();
}
var ll = Fs.ReactCurrentBatchConfig, oi = !0;
function Mm(e, t, n, r) {
  var l = It, o = ll.transition;
  ll.transition = null;
  try {
    It = 1, Fc(e, t, n, r);
  } finally {
    It = l, ll.transition = o;
  }
}
function Im(e, t, n, r) {
  var l = It, o = ll.transition;
  ll.transition = null;
  try {
    It = 4, Fc(e, t, n, r);
  } finally {
    It = l, ll.transition = o;
  }
}
function Fc(e, t, n, r) {
  if (oi) {
    var l = Ha(e, t, n, r);
    if (l === null) aa(e, t, r, ii, n), Fu(e, r);
    else if (Sm(l, e, t, n, r)) r.stopPropagation();
    else if (Fu(e, r), t & 4 && -1 < Cm.indexOf(e)) {
      for (; l !== null; ) {
        var o = go(l);
        if (o !== null && Rh(o), o = Ha(e, t, n, r), o === null && aa(e, t, r, ii, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else aa(e, t, r, null, n);
  }
}
var ii = null;
function Ha(e, t, n, r) {
  if (ii = null, e = Oc(r), e = wr(e), e !== null) if (t = Or(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Eh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ii = e, null;
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
      switch (gm()) {
        case Dc:
          return 1;
        case Mh:
          return 4;
        case ri:
        case xm:
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
var nr = null, Bc = null, zo = null;
function _h() {
  if (zo) return zo;
  var e, t = Bc, n = t.length, r, l = "value" in nr ? nr.value : nr.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return zo = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ho(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Mo() {
  return !0;
}
function Wu() {
  return !1;
}
function Jn(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Mo : Wu, this.isPropagationStopped = Wu, this;
  }
  return Vt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Mo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Mo);
  }, persist: function() {
  }, isPersistent: Mo }), t;
}
var vl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Wc = Jn(vl), mo = Vt({}, vl, { view: 0, detail: 0 }), Tm = Jn(mo), qi, ea, Ml, Mi = Vt({}, mo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Uc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Ml && (Ml && e.type === "mousemove" ? (qi = e.screenX - Ml.screenX, ea = e.screenY - Ml.screenY) : ea = qi = 0, Ml = e), qi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ea;
} }), Uu = Jn(Mi), Am = Vt({}, Mi, { dataTransfer: 0 }), Rm = Jn(Am), $m = Vt({}, mo, { relatedTarget: 0 }), ta = Jn($m), Lm = Vt({}, vl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Om = Jn(Lm), Dm = Vt({}, vl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Pm = Jn(Dm), _m = Vt({}, vl, { data: 0 }), zu = Jn(_m), Fm = {
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
}, Bm = {
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
function Um(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Wm[e]) ? !!t[e] : !1;
}
function Uc() {
  return Um;
}
var zm = Vt({}, mo, { key: function(e) {
  if (e.key) {
    var t = Fm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ho(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Uc, charCode: function(e) {
  return e.type === "keypress" ? Ho(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ho(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Hm = Jn(zm), Km = Vt({}, Mi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hu = Jn(Km), Vm = Vt({}, mo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Uc }), Ym = Jn(Vm), Xm = Vt({}, vl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Gm = Jn(Xm), Qm = Vt({}, Mi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Jm = Jn(Qm), Zm = [9, 13, 27, 32], zc = Os && "CompositionEvent" in window, Bl = null;
Os && "documentMode" in document && (Bl = document.documentMode);
var qm = Os && "TextEvent" in window && !Bl, Fh = Os && (!zc || Bl && 8 < Bl && 11 >= Bl), Ku = " ", Vu = !1;
function Bh(e, t) {
  switch (e) {
    case "keyup":
      return Zm.indexOf(t.keyCode) !== -1;
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
var Kr = !1;
function e0(e, t) {
  switch (e) {
    case "compositionend":
      return Wh(t);
    case "keypress":
      return t.which !== 32 ? null : (Vu = !0, Ku);
    case "textInput":
      return e = t.data, e === Ku && Vu ? null : e;
    default:
      return null;
  }
}
function t0(e, t) {
  if (Kr) return e === "compositionend" || !zc && Bh(e, t) ? (e = _h(), zo = Bc = nr = null, Kr = !1, e) : null;
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
var n0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Yu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!n0[e.type] : t === "textarea";
}
function Uh(e, t, n, r) {
  vh(r), t = ai(t, "onChange"), 0 < t.length && (n = new Wc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Wl = null, ql = null;
function s0(e) {
  qh(e, 0);
}
function Ii(e) {
  var t = Xr(e);
  if (hh(t)) return e;
}
function r0(e, t) {
  if (e === "change") return t;
}
var zh = !1;
if (Os) {
  var na;
  if (Os) {
    var sa = "oninput" in document;
    if (!sa) {
      var Xu = document.createElement("div");
      Xu.setAttribute("oninput", "return;"), sa = typeof Xu.oninput == "function";
    }
    na = sa;
  } else na = !1;
  zh = na && (!document.documentMode || 9 < document.documentMode);
}
function Gu() {
  Wl && (Wl.detachEvent("onpropertychange", Hh), ql = Wl = null);
}
function Hh(e) {
  if (e.propertyName === "value" && Ii(ql)) {
    var t = [];
    Uh(t, ql, e, Oc(e)), jh(s0, t);
  }
}
function l0(e, t, n) {
  e === "focusin" ? (Gu(), Wl = t, ql = n, Wl.attachEvent("onpropertychange", Hh)) : e === "focusout" && Gu();
}
function o0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ii(ql);
}
function i0(e, t) {
  if (e === "click") return Ii(t);
}
function a0(e, t) {
  if (e === "input" || e === "change") return Ii(t);
}
function c0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ms = typeof Object.is == "function" ? Object.is : c0;
function eo(e, t) {
  if (ms(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Sa.call(t, l) || !ms(e[l], t[l])) return !1;
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
function Vh() {
  for (var e = window, t = ti(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ti(e.document);
  }
  return t;
}
function Hc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function u0(e) {
  var t = Vh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Kh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Hc(n)) {
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
var d0 = Os && "documentMode" in document && 11 >= document.documentMode, Vr = null, Ka = null, Ul = null, Va = !1;
function Zu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Va || Vr == null || Vr !== ti(r) || (r = Vr, "selectionStart" in r && Hc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ul && eo(Ul, r) || (Ul = r, r = ai(Ka, "onSelect"), 0 < r.length && (t = new Wc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vr)));
}
function Io(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Yr = { animationend: Io("Animation", "AnimationEnd"), animationiteration: Io("Animation", "AnimationIteration"), animationstart: Io("Animation", "AnimationStart"), transitionend: Io("Transition", "TransitionEnd") }, ra = {}, Yh = {};
Os && (Yh = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
function Ti(e) {
  if (ra[e]) return ra[e];
  if (!Yr[e]) return e;
  var t = Yr[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Yh) return ra[e] = t[n];
  return e;
}
var Xh = Ti("animationend"), Gh = Ti("animationiteration"), Qh = Ti("animationstart"), Jh = Ti("transitionend"), Zh = /* @__PURE__ */ new Map(), qu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function pr(e, t) {
  Zh.set(e, t), Lr(t, [e]);
}
for (var la = 0; la < qu.length; la++) {
  var oa = qu[la], h0 = oa.toLowerCase(), f0 = oa[0].toUpperCase() + oa.slice(1);
  pr(h0, "on" + f0);
}
pr(Xh, "onAnimationEnd");
pr(Gh, "onAnimationIteration");
pr(Qh, "onAnimationStart");
pr("dblclick", "onDoubleClick");
pr("focusin", "onFocus");
pr("focusout", "onBlur");
pr(Jh, "onTransitionEnd");
dl("onMouseEnter", ["mouseout", "mouseover"]);
dl("onMouseLeave", ["mouseout", "mouseover"]);
dl("onPointerEnter", ["pointerout", "pointerover"]);
dl("onPointerLeave", ["pointerout", "pointerover"]);
Lr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Lr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Lr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Lr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Lr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Lr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), p0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pl));
function ed(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, hm(r, t, void 0, e), e.currentTarget = null;
}
function qh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], c = a.instance, h = a.currentTarget;
        if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
        ed(l, a, h), o = c;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], c = a.instance, h = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
        ed(l, a, h), o = c;
      }
    }
  }
  if (si) throw e = Wa, si = !1, Wa = null, e;
}
function Ft(e, t) {
  var n = t[Ja];
  n === void 0 && (n = t[Ja] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ef(t, e, 2, !1), n.add(r));
}
function ia(e, t, n) {
  var r = 0;
  t && (r |= 4), ef(n, e, r, t);
}
var To = "_reactListening" + Math.random().toString(36).slice(2);
function to(e) {
  if (!e[To]) {
    e[To] = !0, ih.forEach(function(n) {
      n !== "selectionchange" && (p0.has(n) || ia(n, !1, e), ia(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[To] || (t[To] = !0, ia("selectionchange", !1, t));
  }
}
function ef(e, t, n, r) {
  switch (Ph(t)) {
    case 1:
      var l = Mm;
      break;
    case 4:
      l = Im;
      break;
    default:
      l = Fc;
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
        if (i = wr(a), i === null) return;
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
    var h = o, y = Oc(n), f = [];
    e: {
      var x = Zh.get(e);
      if (x !== void 0) {
        var v = Wc, C = e;
        switch (e) {
          case "keypress":
            if (Ho(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Hm;
            break;
          case "focusin":
            C = "focus", v = ta;
            break;
          case "focusout":
            C = "blur", v = ta;
            break;
          case "beforeblur":
          case "afterblur":
            v = ta;
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
            v = Uu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Rm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Ym;
            break;
          case Xh:
          case Gh:
          case Qh:
            v = Om;
            break;
          case Jh:
            v = Gm;
            break;
          case "scroll":
            v = Tm;
            break;
          case "wheel":
            v = Jm;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Pm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Hu;
        }
        var M = (t & 4) !== 0, D = !M && e === "scroll", k = M ? x !== null ? x + "Capture" : null : x;
        M = [];
        for (var m = h, d; m !== null; ) {
          d = m;
          var S = d.stateNode;
          if (d.tag === 5 && S !== null && (d = S, k !== null && (S = Gl(m, k), S != null && M.push(no(m, S, d)))), D) break;
          m = m.return;
        }
        0 < M.length && (x = new v(x, C, null, n, y), f.push({ event: x, listeners: M }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (x = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", x && n !== _a && (C = n.relatedTarget || n.fromElement) && (wr(C) || C[Ds])) break e;
        if ((v || x) && (x = y.window === y ? y : (x = y.ownerDocument) ? x.defaultView || x.parentWindow : window, v ? (C = n.relatedTarget || n.toElement, v = h, C = C ? wr(C) : null, C !== null && (D = Or(C), C !== D || C.tag !== 5 && C.tag !== 6) && (C = null)) : (v = null, C = h), v !== C)) {
          if (M = Uu, S = "onMouseLeave", k = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (M = Hu, S = "onPointerLeave", k = "onPointerEnter", m = "pointer"), D = v == null ? x : Xr(v), d = C == null ? x : Xr(C), x = new M(S, m + "leave", v, n, y), x.target = D, x.relatedTarget = d, S = null, wr(y) === h && (M = new M(k, m + "enter", C, n, y), M.target = d, M.relatedTarget = D, S = M), D = S, v && C) t: {
            for (M = v, k = C, m = 0, d = M; d; d = _r(d)) m++;
            for (d = 0, S = k; S; S = _r(S)) d++;
            for (; 0 < m - d; ) M = _r(M), m--;
            for (; 0 < d - m; ) k = _r(k), d--;
            for (; m--; ) {
              if (M === k || k !== null && M === k.alternate) break t;
              M = _r(M), k = _r(k);
            }
            M = null;
          }
          else M = null;
          v !== null && td(f, x, v, M, !1), C !== null && D !== null && td(f, D, C, M, !0);
        }
      }
      e: {
        if (x = h ? Xr(h) : window, v = x.nodeName && x.nodeName.toLowerCase(), v === "select" || v === "input" && x.type === "file") var E = r0;
        else if (Yu(x)) if (zh) E = a0;
        else {
          E = o0;
          var j = l0;
        }
        else (v = x.nodeName) && v.toLowerCase() === "input" && (x.type === "checkbox" || x.type === "radio") && (E = i0);
        if (E && (E = E(e, h))) {
          Uh(f, E, n, y);
          break e;
        }
        j && j(e, x, h), e === "focusout" && (j = x._wrapperState) && j.controlled && x.type === "number" && $a(x, "number", x.value);
      }
      switch (j = h ? Xr(h) : window, e) {
        case "focusin":
          (Yu(j) || j.contentEditable === "true") && (Vr = j, Ka = h, Ul = null);
          break;
        case "focusout":
          Ul = Ka = Vr = null;
          break;
        case "mousedown":
          Va = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Va = !1, Zu(f, n, y);
          break;
        case "selectionchange":
          if (d0) break;
        case "keydown":
        case "keyup":
          Zu(f, n, y);
      }
      var N;
      if (zc) e: {
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
      else Kr ? Bh(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Fh && n.locale !== "ko" && (Kr || T !== "onCompositionStart" ? T === "onCompositionEnd" && Kr && (N = _h()) : (nr = y, Bc = "value" in nr ? nr.value : nr.textContent, Kr = !0)), j = ai(h, T), 0 < j.length && (T = new zu(T, e, null, n, y), f.push({ event: T, listeners: j }), N ? T.data = N : (N = Wh(n), N !== null && (T.data = N)))), (N = qm ? e0(e, n) : t0(e, n)) && (h = ai(h, "onBeforeInput"), 0 < h.length && (y = new zu("onBeforeInput", "beforeinput", null, n, y), f.push({ event: y, listeners: h }), y.data = N));
    }
    qh(f, t);
  });
}
function no(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ai(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Gl(e, n), o != null && r.unshift(no(e, o, l)), o = Gl(e, t), o != null && r.push(no(e, o, l))), e = e.return;
  }
  return r;
}
function _r(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function td(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, c = a.alternate, h = a.stateNode;
    if (c !== null && c === r) break;
    a.tag === 5 && h !== null && (a = h, l ? (c = Gl(n, o), c != null && i.unshift(no(n, c, a))) : l || (c = Gl(n, o), c != null && i.push(no(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var m0 = /\r\n?/g, g0 = /\u0000|\uFFFD/g;
function nd(e) {
  return (typeof e == "string" ? e : "" + e).replace(m0, `
`).replace(g0, "");
}
function Ao(e, t, n) {
  if (t = nd(t), nd(e) !== t && n) throw Error(ye(425));
}
function ci() {
}
var Ya = null, Xa = null;
function Ga(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Qa = typeof setTimeout == "function" ? setTimeout : void 0, x0 = typeof clearTimeout == "function" ? clearTimeout : void 0, sd = typeof Promise == "function" ? Promise : void 0, y0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof sd < "u" ? function(e) {
  return sd.resolve(null).then(e).catch(v0);
} : Qa;
function v0(e) {
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
        e.removeChild(l), Zl(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Zl(t);
}
function ir(e) {
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
var Nl = Math.random().toString(36).slice(2), ks = "__reactFiber$" + Nl, so = "__reactProps$" + Nl, Ds = "__reactContainer$" + Nl, Ja = "__reactEvents$" + Nl, N0 = "__reactListeners$" + Nl, k0 = "__reactHandles$" + Nl;
function wr(e) {
  var t = e[ks];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ds] || n[ks]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = rd(e); e !== null; ) {
        if (n = e[ks]) return n;
        e = rd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function go(e) {
  return e = e[ks] || e[Ds], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Xr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ye(33));
}
function Ai(e) {
  return e[so] || null;
}
var Za = [], Gr = -1;
function mr(e) {
  return { current: e };
}
function Bt(e) {
  0 > Gr || (e.current = Za[Gr], Za[Gr] = null, Gr--);
}
function Pt(e, t) {
  Gr++, Za[Gr] = e.current, e.current = t;
}
var fr = {}, Cn = mr(fr), Wn = mr(!1), Ir = fr;
function hl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Un(e) {
  return e = e.childContextTypes, e != null;
}
function ui() {
  Bt(Wn), Bt(Cn);
}
function ld(e, t, n) {
  if (Cn.current !== fr) throw Error(ye(168));
  Pt(Cn, t), Pt(Wn, n);
}
function tf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ye(108, lm(e) || "Unknown", l));
  return Vt({}, n, r);
}
function di(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fr, Ir = Cn.current, Pt(Cn, e), Pt(Wn, Wn.current), !0;
}
function od(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ye(169));
  n ? (e = tf(e, t, Ir), r.__reactInternalMemoizedMergedChildContext = e, Bt(Wn), Bt(Cn), Pt(Cn, e)) : Bt(Wn), Pt(Wn, n);
}
var Is = null, Ri = !1, ua = !1;
function nf(e) {
  Is === null ? Is = [e] : Is.push(e);
}
function w0(e) {
  Ri = !0, nf(e);
}
function gr() {
  if (!ua && Is !== null) {
    ua = !0;
    var e = 0, t = It;
    try {
      var n = Is;
      for (It = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Is = null, Ri = !1;
    } catch (l) {
      throw Is !== null && (Is = Is.slice(e + 1)), bh(Dc, gr), l;
    } finally {
      It = t, ua = !1;
    }
  }
  return null;
}
var Qr = [], Jr = 0, hi = null, fi = 0, ts = [], ns = 0, Tr = null, As = 1, Rs = "";
function vr(e, t) {
  Qr[Jr++] = fi, Qr[Jr++] = hi, hi = e, fi = t;
}
function sf(e, t, n) {
  ts[ns++] = As, ts[ns++] = Rs, ts[ns++] = Tr, Tr = e;
  var r = As;
  e = Rs;
  var l = 32 - fs(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - fs(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, As = 1 << 32 - fs(t) + l | n << l | r, Rs = o + e;
  } else As = 1 << o | n << l | r, Rs = e;
}
function Kc(e) {
  e.return !== null && (vr(e, 1), sf(e, 1, 0));
}
function Vc(e) {
  for (; e === hi; ) hi = Qr[--Jr], Qr[Jr] = null, fi = Qr[--Jr], Qr[Jr] = null;
  for (; e === Tr; ) Tr = ts[--ns], ts[ns] = null, Rs = ts[--ns], ts[ns] = null, As = ts[--ns], ts[ns] = null;
}
var Xn = null, Yn = null, Wt = !1, ds = null;
function rf(e, t) {
  var n = ss(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function id(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Xn = e, Yn = ir(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Xn = e, Yn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Tr !== null ? { id: As, overflow: Rs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ss(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Xn = e, Yn = null, !0) : !1;
    default:
      return !1;
  }
}
function qa(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ec(e) {
  if (Wt) {
    var t = Yn;
    if (t) {
      var n = t;
      if (!id(e, t)) {
        if (qa(e)) throw Error(ye(418));
        t = ir(n.nextSibling);
        var r = Xn;
        t && id(e, t) ? rf(r, n) : (e.flags = e.flags & -4097 | 2, Wt = !1, Xn = e);
      }
    } else {
      if (qa(e)) throw Error(ye(418));
      e.flags = e.flags & -4097 | 2, Wt = !1, Xn = e;
    }
  }
}
function ad(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Xn = e;
}
function Ro(e) {
  if (e !== Xn) return !1;
  if (!Wt) return ad(e), Wt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ga(e.type, e.memoizedProps)), t && (t = Yn)) {
    if (qa(e)) throw lf(), Error(ye(418));
    for (; t; ) rf(e, t), t = ir(t.nextSibling);
  }
  if (ad(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ye(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Yn = ir(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Yn = null;
    }
  } else Yn = Xn ? ir(e.stateNode.nextSibling) : null;
  return !0;
}
function lf() {
  for (var e = Yn; e; ) e = ir(e.nextSibling);
}
function fl() {
  Yn = Xn = null, Wt = !1;
}
function Yc(e) {
  ds === null ? ds = [e] : ds.push(e);
}
var j0 = Fs.ReactCurrentBatchConfig;
function Il(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ye(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(ye(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(ye(284));
    if (!n._owner) throw Error(ye(290, e));
  }
  return e;
}
function $o(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ye(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function cd(e) {
  var t = e._init;
  return t(e._payload);
}
function of(e) {
  function t(k, m) {
    if (e) {
      var d = k.deletions;
      d === null ? (k.deletions = [m], k.flags |= 16) : d.push(m);
    }
  }
  function n(k, m) {
    if (!e) return null;
    for (; m !== null; ) t(k, m), m = m.sibling;
    return null;
  }
  function r(k, m) {
    for (k = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? k.set(m.key, m) : k.set(m.index, m), m = m.sibling;
    return k;
  }
  function l(k, m) {
    return k = dr(k, m), k.index = 0, k.sibling = null, k;
  }
  function o(k, m, d) {
    return k.index = d, e ? (d = k.alternate, d !== null ? (d = d.index, d < m ? (k.flags |= 2, m) : d) : (k.flags |= 2, m)) : (k.flags |= 1048576, m);
  }
  function i(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function a(k, m, d, S) {
    return m === null || m.tag !== 6 ? (m = xa(d, k.mode, S), m.return = k, m) : (m = l(m, d), m.return = k, m);
  }
  function c(k, m, d, S) {
    var E = d.type;
    return E === Hr ? y(k, m, d.props.children, S, d.key) : m !== null && (m.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Gs && cd(E) === m.type) ? (S = l(m, d.props), S.ref = Il(k, m, d), S.return = k, S) : (S = Jo(d.type, d.key, d.props, null, k.mode, S), S.ref = Il(k, m, d), S.return = k, S);
  }
  function h(k, m, d, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== d.containerInfo || m.stateNode.implementation !== d.implementation ? (m = ya(d, k.mode, S), m.return = k, m) : (m = l(m, d.children || []), m.return = k, m);
  }
  function y(k, m, d, S, E) {
    return m === null || m.tag !== 7 ? (m = Mr(d, k.mode, S, E), m.return = k, m) : (m = l(m, d), m.return = k, m);
  }
  function f(k, m, d) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = xa("" + m, k.mode, d), m.return = k, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case wo:
          return d = Jo(m.type, m.key, m.props, null, k.mode, d), d.ref = Il(k, null, m), d.return = k, d;
        case zr:
          return m = ya(m, k.mode, d), m.return = k, m;
        case Gs:
          var S = m._init;
          return f(k, S(m._payload), d);
      }
      if (Ol(m) || El(m)) return m = Mr(m, k.mode, d, null), m.return = k, m;
      $o(k, m);
    }
    return null;
  }
  function x(k, m, d, S) {
    var E = m !== null ? m.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : a(k, m, "" + d, S);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case wo:
          return d.key === E ? c(k, m, d, S) : null;
        case zr:
          return d.key === E ? h(k, m, d, S) : null;
        case Gs:
          return E = d._init, x(
            k,
            m,
            E(d._payload),
            S
          );
      }
      if (Ol(d) || El(d)) return E !== null ? null : y(k, m, d, S, null);
      $o(k, d);
    }
    return null;
  }
  function v(k, m, d, S, E) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return k = k.get(d) || null, a(m, k, "" + S, E);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case wo:
          return k = k.get(S.key === null ? d : S.key) || null, c(m, k, S, E);
        case zr:
          return k = k.get(S.key === null ? d : S.key) || null, h(m, k, S, E);
        case Gs:
          var j = S._init;
          return v(k, m, d, j(S._payload), E);
      }
      if (Ol(S) || El(S)) return k = k.get(d) || null, y(m, k, S, E, null);
      $o(m, S);
    }
    return null;
  }
  function C(k, m, d, S) {
    for (var E = null, j = null, N = m, T = m = 0, g = null; N !== null && T < d.length; T++) {
      N.index > T ? (g = N, N = null) : g = N.sibling;
      var b = x(k, N, d[T], S);
      if (b === null) {
        N === null && (N = g);
        break;
      }
      e && N && b.alternate === null && t(k, N), m = o(b, m, T), j === null ? E = b : j.sibling = b, j = b, N = g;
    }
    if (T === d.length) return n(k, N), Wt && vr(k, T), E;
    if (N === null) {
      for (; T < d.length; T++) N = f(k, d[T], S), N !== null && (m = o(N, m, T), j === null ? E = N : j.sibling = N, j = N);
      return Wt && vr(k, T), E;
    }
    for (N = r(k, N); T < d.length; T++) g = v(N, k, T, d[T], S), g !== null && (e && g.alternate !== null && N.delete(g.key === null ? T : g.key), m = o(g, m, T), j === null ? E = g : j.sibling = g, j = g);
    return e && N.forEach(function(O) {
      return t(k, O);
    }), Wt && vr(k, T), E;
  }
  function M(k, m, d, S) {
    var E = El(d);
    if (typeof E != "function") throw Error(ye(150));
    if (d = E.call(d), d == null) throw Error(ye(151));
    for (var j = E = null, N = m, T = m = 0, g = null, b = d.next(); N !== null && !b.done; T++, b = d.next()) {
      N.index > T ? (g = N, N = null) : g = N.sibling;
      var O = x(k, N, b.value, S);
      if (O === null) {
        N === null && (N = g);
        break;
      }
      e && N && O.alternate === null && t(k, N), m = o(O, m, T), j === null ? E = O : j.sibling = O, j = O, N = g;
    }
    if (b.done) return n(
      k,
      N
    ), Wt && vr(k, T), E;
    if (N === null) {
      for (; !b.done; T++, b = d.next()) b = f(k, b.value, S), b !== null && (m = o(b, m, T), j === null ? E = b : j.sibling = b, j = b);
      return Wt && vr(k, T), E;
    }
    for (N = r(k, N); !b.done; T++, b = d.next()) b = v(N, k, T, b.value, S), b !== null && (e && b.alternate !== null && N.delete(b.key === null ? T : b.key), m = o(b, m, T), j === null ? E = b : j.sibling = b, j = b);
    return e && N.forEach(function(U) {
      return t(k, U);
    }), Wt && vr(k, T), E;
  }
  function D(k, m, d, S) {
    if (typeof d == "object" && d !== null && d.type === Hr && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case wo:
          e: {
            for (var E = d.key, j = m; j !== null; ) {
              if (j.key === E) {
                if (E = d.type, E === Hr) {
                  if (j.tag === 7) {
                    n(k, j.sibling), m = l(j, d.props.children), m.return = k, k = m;
                    break e;
                  }
                } else if (j.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Gs && cd(E) === j.type) {
                  n(k, j.sibling), m = l(j, d.props), m.ref = Il(k, j, d), m.return = k, k = m;
                  break e;
                }
                n(k, j);
                break;
              } else t(k, j);
              j = j.sibling;
            }
            d.type === Hr ? (m = Mr(d.props.children, k.mode, S, d.key), m.return = k, k = m) : (S = Jo(d.type, d.key, d.props, null, k.mode, S), S.ref = Il(k, m, d), S.return = k, k = S);
          }
          return i(k);
        case zr:
          e: {
            for (j = d.key; m !== null; ) {
              if (m.key === j) if (m.tag === 4 && m.stateNode.containerInfo === d.containerInfo && m.stateNode.implementation === d.implementation) {
                n(k, m.sibling), m = l(m, d.children || []), m.return = k, k = m;
                break e;
              } else {
                n(k, m);
                break;
              }
              else t(k, m);
              m = m.sibling;
            }
            m = ya(d, k.mode, S), m.return = k, k = m;
          }
          return i(k);
        case Gs:
          return j = d._init, D(k, m, j(d._payload), S);
      }
      if (Ol(d)) return C(k, m, d, S);
      if (El(d)) return M(k, m, d, S);
      $o(k, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, m !== null && m.tag === 6 ? (n(k, m.sibling), m = l(m, d), m.return = k, k = m) : (n(k, m), m = xa(d, k.mode, S), m.return = k, k = m), i(k)) : n(k, m);
  }
  return D;
}
var pl = of(!0), af = of(!1), pi = mr(null), mi = null, Zr = null, Xc = null;
function Gc() {
  Xc = Zr = mi = null;
}
function Qc(e) {
  var t = pi.current;
  Bt(pi), e._currentValue = t;
}
function tc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ol(e, t) {
  mi = e, Xc = Zr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Bn = !0), e.firstContext = null);
}
function ls(e) {
  var t = e._currentValue;
  if (Xc !== e) if (e = { context: e, memoizedValue: t, next: null }, Zr === null) {
    if (mi === null) throw Error(ye(308));
    Zr = e, mi.dependencies = { lanes: 0, firstContext: e };
  } else Zr = Zr.next = e;
  return t;
}
var jr = null;
function Jc(e) {
  jr === null ? jr = [e] : jr.push(e);
}
function cf(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Jc(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ps(e, r);
}
function Ps(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Qs = !1;
function Zc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function uf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function $s(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ar(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, jt & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ps(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Jc(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ps(e, n);
}
function Ko(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Pc(e, n);
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
function gi(e, t, n, r) {
  var l = e.updateQueue;
  Qs = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, h = c.next;
    c.next = null, i === null ? o = h : i.next = h, i = c;
    var y = e.alternate;
    y !== null && (y = y.updateQueue, a = y.lastBaseUpdate, a !== i && (a === null ? y.firstBaseUpdate = h : a.next = h, y.lastBaseUpdate = c));
  }
  if (o !== null) {
    var f = l.baseState;
    i = 0, y = h = c = null, a = o;
    do {
      var x = a.lane, v = a.eventTime;
      if ((r & x) === x) {
        y !== null && (y = y.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var C = e, M = a;
          switch (x = t, v = n, M.tag) {
            case 1:
              if (C = M.payload, typeof C == "function") {
                f = C.call(v, f, x);
                break e;
              }
              f = C;
              break e;
            case 3:
              C.flags = C.flags & -65537 | 128;
            case 0:
              if (C = M.payload, x = typeof C == "function" ? C.call(v, f, x) : C, x == null) break e;
              f = Vt({}, f, x);
              break e;
            case 2:
              Qs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, x = l.effects, x === null ? l.effects = [a] : x.push(a));
      } else v = { eventTime: v, lane: x, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, y === null ? (h = y = v, c = f) : y = y.next = v, i |= x;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        x = a, a = x.next, x.next = null, l.lastBaseUpdate = x, l.shared.pending = null;
      }
    } while (!0);
    if (y === null && (c = f), l.baseState = c, l.firstBaseUpdate = h, l.lastBaseUpdate = y, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Rr |= i, e.lanes = i, e.memoizedState = f;
  }
}
function dd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(ye(191, l));
      l.call(r);
    }
  }
}
var xo = {}, Es = mr(xo), ro = mr(xo), lo = mr(xo);
function Er(e) {
  if (e === xo) throw Error(ye(174));
  return e;
}
function qc(e, t) {
  switch (Pt(lo, t), Pt(ro, e), Pt(Es, xo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oa(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Oa(t, e);
  }
  Bt(Es), Pt(Es, t);
}
function ml() {
  Bt(Es), Bt(ro), Bt(lo);
}
function df(e) {
  Er(lo.current);
  var t = Er(Es.current), n = Oa(t, e.type);
  t !== n && (Pt(ro, e), Pt(Es, n));
}
function eu(e) {
  ro.current === e && (Bt(Es), Bt(ro));
}
var Ht = mr(0);
function xi(e) {
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
function tu() {
  for (var e = 0; e < da.length; e++) da[e]._workInProgressVersionPrimary = null;
  da.length = 0;
}
var Vo = Fs.ReactCurrentDispatcher, ha = Fs.ReactCurrentBatchConfig, Ar = 0, Kt = null, an = null, pn = null, yi = !1, zl = !1, oo = 0, E0 = 0;
function wn() {
  throw Error(ye(321));
}
function nu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ms(e[n], t[n])) return !1;
  return !0;
}
function su(e, t, n, r, l, o) {
  if (Ar = o, Kt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Vo.current = e === null || e.memoizedState === null ? M0 : I0, e = n(r, l), zl) {
    o = 0;
    do {
      if (zl = !1, oo = 0, 25 <= o) throw Error(ye(301));
      o += 1, pn = an = null, t.updateQueue = null, Vo.current = T0, e = n(r, l);
    } while (zl);
  }
  if (Vo.current = vi, t = an !== null && an.next !== null, Ar = 0, pn = an = Kt = null, yi = !1, t) throw Error(ye(300));
  return e;
}
function ru() {
  var e = oo !== 0;
  return oo = 0, e;
}
function Ns() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return pn === null ? Kt.memoizedState = pn = e : pn = pn.next = e, pn;
}
function os() {
  if (an === null) {
    var e = Kt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = an.next;
  var t = pn === null ? Kt.memoizedState : pn.next;
  if (t !== null) pn = t, an = e;
  else {
    if (e === null) throw Error(ye(310));
    an = e, e = { memoizedState: an.memoizedState, baseState: an.baseState, baseQueue: an.baseQueue, queue: an.queue, next: null }, pn === null ? Kt.memoizedState = pn = e : pn = pn.next = e;
  }
  return pn;
}
function io(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fa(e) {
  var t = os(), n = t.queue;
  if (n === null) throw Error(ye(311));
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
    var a = i = null, c = null, h = o;
    do {
      var y = h.lane;
      if ((Ar & y) === y) c !== null && (c = c.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), r = h.hasEagerState ? h.eagerState : e(r, h.action);
      else {
        var f = {
          lane: y,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        };
        c === null ? (a = c = f, i = r) : c = c.next = f, Kt.lanes |= y, Rr |= y;
      }
      h = h.next;
    } while (h !== null && h !== o);
    c === null ? i = r : c.next = a, ms(r, t.memoizedState) || (Bn = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Kt.lanes |= o, Rr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function pa(e) {
  var t = os(), n = t.queue;
  if (n === null) throw Error(ye(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    ms(o, t.memoizedState) || (Bn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function hf() {
}
function ff(e, t) {
  var n = Kt, r = os(), l = t(), o = !ms(r.memoizedState, l);
  if (o && (r.memoizedState = l, Bn = !0), r = r.queue, lu(gf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || pn !== null && pn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ao(9, mf.bind(null, n, r, l, t), void 0, null), mn === null) throw Error(ye(349));
    Ar & 30 || pf(n, t, l);
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
    return !ms(e, n);
  } catch {
    return !0;
  }
}
function yf(e) {
  var t = Ps(e, 1);
  t !== null && ps(t, e, 1, -1);
}
function hd(e) {
  var t = Ns();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: io, lastRenderedState: e }, t.queue = e, e = e.dispatch = b0.bind(null, Kt, e), [t.memoizedState, e];
}
function ao(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Kt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Kt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function vf() {
  return os().memoizedState;
}
function Yo(e, t, n, r) {
  var l = Ns();
  Kt.flags |= e, l.memoizedState = ao(1 | t, n, void 0, r === void 0 ? null : r);
}
function $i(e, t, n, r) {
  var l = os();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (an !== null) {
    var i = an.memoizedState;
    if (o = i.destroy, r !== null && nu(r, i.deps)) {
      l.memoizedState = ao(t, n, o, r);
      return;
    }
  }
  Kt.flags |= e, l.memoizedState = ao(1 | t, n, o, r);
}
function fd(e, t) {
  return Yo(8390656, 8, e, t);
}
function lu(e, t) {
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
function ou() {
}
function Ef(e, t) {
  var n = os();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && nu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Cf(e, t) {
  var n = os();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && nu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Sf(e, t, n) {
  return Ar & 21 ? (ms(n, t) || (n = Th(), Kt.lanes |= n, Rr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Bn = !0), e.memoizedState = n);
}
function C0(e, t) {
  var n = It;
  It = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ha.transition;
  ha.transition = {};
  try {
    e(!1), t();
  } finally {
    It = n, ha.transition = r;
  }
}
function bf() {
  return os().memoizedState;
}
function S0(e, t, n) {
  var r = ur(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Mf(e)) If(t, n);
  else if (n = cf(e, t, n, r), n !== null) {
    var l = Rn();
    ps(n, e, r, l), Tf(n, t, r);
  }
}
function b0(e, t, n) {
  var r = ur(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Mf(e)) If(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, ms(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Jc(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = cf(e, t, l, r), n !== null && (l = Rn(), ps(n, e, r, l), Tf(n, t, r));
  }
}
function Mf(e) {
  var t = e.alternate;
  return e === Kt || t !== null && t === Kt;
}
function If(e, t) {
  zl = yi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Tf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Pc(e, n);
  }
}
var vi = { readContext: ls, useCallback: wn, useContext: wn, useEffect: wn, useImperativeHandle: wn, useInsertionEffect: wn, useLayoutEffect: wn, useMemo: wn, useReducer: wn, useRef: wn, useState: wn, useDebugValue: wn, useDeferredValue: wn, useTransition: wn, useMutableSource: wn, useSyncExternalStore: wn, useId: wn, unstable_isNewReconciler: !1 }, M0 = { readContext: ls, useCallback: function(e, t) {
  return Ns().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ls, useEffect: fd, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Yo(
    4194308,
    4,
    wf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Yo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Yo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ns();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ns();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = S0.bind(null, Kt, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ns();
  return e = { current: e }, t.memoizedState = e;
}, useState: hd, useDebugValue: ou, useDeferredValue: function(e) {
  return Ns().memoizedState = e;
}, useTransition: function() {
  var e = hd(!1), t = e[0];
  return e = C0.bind(null, e[1]), Ns().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Kt, l = Ns();
  if (Wt) {
    if (n === void 0) throw Error(ye(407));
    n = n();
  } else {
    if (n = t(), mn === null) throw Error(ye(349));
    Ar & 30 || pf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, fd(gf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ao(9, mf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ns(), t = mn.identifierPrefix;
  if (Wt) {
    var n = Rs, r = As;
    n = (r & ~(1 << 32 - fs(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = oo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = E0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, I0 = {
  readContext: ls,
  useCallback: Ef,
  useContext: ls,
  useEffect: lu,
  useImperativeHandle: jf,
  useInsertionEffect: Nf,
  useLayoutEffect: kf,
  useMemo: Cf,
  useReducer: fa,
  useRef: vf,
  useState: function() {
    return fa(io);
  },
  useDebugValue: ou,
  useDeferredValue: function(e) {
    var t = os();
    return Sf(t, an.memoizedState, e);
  },
  useTransition: function() {
    var e = fa(io)[0], t = os().memoizedState;
    return [e, t];
  },
  useMutableSource: hf,
  useSyncExternalStore: ff,
  useId: bf,
  unstable_isNewReconciler: !1
}, T0 = { readContext: ls, useCallback: Ef, useContext: ls, useEffect: lu, useImperativeHandle: jf, useInsertionEffect: Nf, useLayoutEffect: kf, useMemo: Cf, useReducer: pa, useRef: vf, useState: function() {
  return pa(io);
}, useDebugValue: ou, useDeferredValue: function(e) {
  var t = os();
  return an === null ? t.memoizedState = e : Sf(t, an.memoizedState, e);
}, useTransition: function() {
  var e = pa(io)[0], t = os().memoizedState;
  return [e, t];
}, useMutableSource: hf, useSyncExternalStore: ff, useId: bf, unstable_isNewReconciler: !1 };
function cs(e, t) {
  if (e && e.defaultProps) {
    t = Vt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function nc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Vt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Li = { isMounted: function(e) {
  return (e = e._reactInternals) ? Or(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Rn(), l = ur(e), o = $s(r, l);
  o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (ps(t, e, l, r), Ko(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Rn(), l = ur(e), o = $s(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (ps(t, e, l, r), Ko(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Rn(), r = ur(e), l = $s(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ar(e, l, r), t !== null && (ps(t, e, r, n), Ko(t, e, r));
} };
function pd(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !eo(n, r) || !eo(l, o) : !0;
}
function Af(e, t, n) {
  var r = !1, l = fr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ls(o) : (l = Un(t) ? Ir : Cn.current, r = t.contextTypes, o = (r = r != null) ? hl(e, l) : fr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Li, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function md(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Li.enqueueReplaceState(t, t.state, null);
}
function sc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Zc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ls(o) : (o = Un(t) ? Ir : Cn.current, l.context = hl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (nc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Li.enqueueReplaceState(l, l.state, null), gi(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gl(e, t) {
  try {
    var n = "", r = t;
    do
      n += rm(r), r = r.return;
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
var A0 = typeof WeakMap == "function" ? WeakMap : Map;
function Rf(e, t, n) {
  n = $s(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ki || (ki = !0, pc = r), rc(e, t);
  }, n;
}
function $f(e, t, n) {
  n = $s(-1, n), n.tag = 3;
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
    rc(e, t), typeof r != "function" && (cr === null ? cr = /* @__PURE__ */ new Set([this]) : cr.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function gd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new A0();
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
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = $s(-1, 1), t.tag = 2, ar(n, t, 1))), n.lanes |= 1), e);
}
var R0 = Fs.ReactCurrentOwner, Bn = !1;
function An(e, t, n, r) {
  t.child = e === null ? af(t, null, n, r) : pl(t, e.child, n, r);
}
function vd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return ol(t, l), r = su(e, t, n, r, o, l), n = ru(), e !== null && !Bn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, _s(e, t, l)) : (Wt && n && Kc(t), t.flags |= 1, An(e, t, r, l), t.child);
}
function Nd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !pu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Lf(e, t, o, r, l)) : (e = Jo(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : eo, n(i, r) && e.ref === t.ref) return _s(e, t, l);
  }
  return t.flags |= 1, e = dr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Lf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (eo(o, r) && e.ref === t.ref) if (Bn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Bn = !0);
    else return t.lanes = e.lanes, _s(e, t, l);
  }
  return lc(e, t, n, r, l);
}
function Of(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Pt(el, Kn), Kn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Pt(el, Kn), Kn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Pt(el, Kn), Kn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Pt(el, Kn), Kn |= r;
  return An(e, t, l, n), t.child;
}
function Df(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function lc(e, t, n, r, l) {
  var o = Un(n) ? Ir : Cn.current;
  return o = hl(t, o), ol(t, l), n = su(e, t, n, r, o, l), r = ru(), e !== null && !Bn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, _s(e, t, l)) : (Wt && r && Kc(t), t.flags |= 1, An(e, t, n, l), t.child);
}
function kd(e, t, n, r, l) {
  if (Un(n)) {
    var o = !0;
    di(t);
  } else o = !1;
  if (ol(t, l), t.stateNode === null) Xo(e, t), Af(t, n, r), sc(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, h = n.contextType;
    typeof h == "object" && h !== null ? h = ls(h) : (h = Un(n) ? Ir : Cn.current, h = hl(t, h));
    var y = n.getDerivedStateFromProps, f = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    f || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== h) && md(t, i, r, h), Qs = !1;
    var x = t.memoizedState;
    i.state = x, gi(t, r, i, l), c = t.memoizedState, a !== r || x !== c || Wn.current || Qs ? (typeof y == "function" && (nc(t, n, y, r), c = t.memoizedState), (a = Qs || pd(t, n, a, r, x, c, h)) ? (f || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = h, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, uf(e, t), a = t.memoizedProps, h = t.type === t.elementType ? a : cs(t.type, a), i.props = h, f = t.pendingProps, x = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = ls(c) : (c = Un(n) ? Ir : Cn.current, c = hl(t, c));
    var v = n.getDerivedStateFromProps;
    (y = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== f || x !== c) && md(t, i, r, c), Qs = !1, x = t.memoizedState, i.state = x, gi(t, r, i, l);
    var C = t.memoizedState;
    a !== f || x !== C || Wn.current || Qs ? (typeof v == "function" && (nc(t, n, v, r), C = t.memoizedState), (h = Qs || pd(t, n, h, r, x, C, c) || !1) ? (y || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, C, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, C, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), i.props = r, i.state = C, i.context = c, r = h) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return oc(e, t, n, r, o, l);
}
function oc(e, t, n, r, l, o) {
  Df(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && od(t, n, !1), _s(e, t, o);
  r = t.stateNode, R0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = pl(t, e.child, null, o), t.child = pl(t, null, a, o)) : An(e, t, a, o), t.memoizedState = r.state, l && od(t, n, !0), t.child;
}
function Pf(e) {
  var t = e.stateNode;
  t.pendingContext ? ld(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ld(e, t.context, !1), qc(e, t.containerInfo);
}
function wd(e, t, n, r, l) {
  return fl(), Yc(l), t.flags |= 256, An(e, t, n, r), t.child;
}
var ic = { dehydrated: null, treeContext: null, retryLane: 0 };
function ac(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function _f(e, t, n) {
  var r = t.pendingProps, l = Ht.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Pt(Ht, l & 1), e === null)
    return ec(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Pi(i, r, 0, null), e = Mr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ac(n), t.memoizedState = ic, e) : iu(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return $0(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = dr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = dr(a, o) : (o = Mr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? ac(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = ic, r;
  }
  return o = e.child, e = o.sibling, r = dr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function iu(e, t) {
  return t = Pi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Lo(e, t, n, r) {
  return r !== null && Yc(r), pl(t, e.child, null, n), e = iu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function $0(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ma(Error(ye(422))), Lo(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Pi({ mode: "visible", children: r.children }, l, 0, null), o = Mr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && pl(t, e.child, null, i), t.child.memoizedState = ac(i), t.memoizedState = ic, o);
  if (!(t.mode & 1)) return Lo(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(ye(419)), r = ma(o, r, void 0), Lo(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, Bn || a) {
    if (r = mn, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ps(e, l), ps(r, e, l, -1));
    }
    return fu(), r = ma(Error(ye(421))), Lo(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = V0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Yn = ir(l.nextSibling), Xn = t, Wt = !0, ds = null, e !== null && (ts[ns++] = As, ts[ns++] = Rs, ts[ns++] = Tr, As = e.id, Rs = e.overflow, Tr = t), t = iu(t, r.children), t.flags |= 4096, t);
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
function Ff(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (An(e, t, r.children, n), r = Ht.current, r & 2) r = r & 1 | 2, t.flags |= 128;
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
  if (Pt(Ht, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && xi(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ga(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && xi(e) === null) {
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
function Xo(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function _s(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Rr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ye(153));
  if (t.child !== null) {
    for (e = t.child, n = dr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = dr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function L0(e, t, n) {
  switch (t.tag) {
    case 3:
      Pf(t), fl();
      break;
    case 5:
      df(t);
      break;
    case 1:
      Un(t.type) && di(t);
      break;
    case 4:
      qc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Pt(pi, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Pt(Ht, Ht.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? _f(e, t, n) : (Pt(Ht, Ht.current & 1), e = _s(e, t, n), e !== null ? e.sibling : null);
      Pt(Ht, Ht.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Ff(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Pt(Ht, Ht.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Of(e, t, n);
  }
  return _s(e, t, n);
}
var Bf, cc, Wf, Uf;
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
cc = function() {
};
Wf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Er(Es.current);
    var o = null;
    switch (n) {
      case "input":
        l = Aa(e, l), r = Aa(e, r), o = [];
        break;
      case "select":
        l = Vt({}, l, { value: void 0 }), r = Vt({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = La(e, l), r = La(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ci);
    }
    Da(n, r);
    var i;
    n = null;
    for (h in l) if (!r.hasOwnProperty(h) && l.hasOwnProperty(h) && l[h] != null) if (h === "style") {
      var a = l[h];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else h !== "dangerouslySetInnerHTML" && h !== "children" && h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (Yl.hasOwnProperty(h) ? o || (o = []) : (o = o || []).push(h, null));
    for (h in r) {
      var c = r[h];
      if (a = l != null ? l[h] : void 0, r.hasOwnProperty(h) && c !== a && (c != null || a != null)) if (h === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (o || (o = []), o.push(
        h,
        n
      )), n = c;
      else h === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(h, c)) : h === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(h, "" + c) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (Yl.hasOwnProperty(h) ? (c != null && h === "onScroll" && Ft("scroll", e), o || a === c || (o = [])) : (o = o || []).push(h, c));
    }
    n && (o = o || []).push("style", n);
    var h = o;
    (t.updateQueue = h) && (t.flags |= 4);
  }
};
Uf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Tl(e, t) {
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
function jn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function O0(e, t, n) {
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
      return jn(t), null;
    case 1:
      return Un(t.type) && ui(), jn(t), null;
    case 3:
      return r = t.stateNode, ml(), Bt(Wn), Bt(Cn), tu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ro(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ds !== null && (xc(ds), ds = null))), cc(e, t), jn(t), null;
    case 5:
      eu(t);
      var l = Er(lo.current);
      if (n = t.type, e !== null && t.stateNode != null) Wf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ye(166));
          return jn(t), null;
        }
        if (e = Er(Es.current), Ro(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[ks] = t, r[so] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Ft("cancel", r), Ft("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ft("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pl.length; l++) Ft(Pl[l], r);
              break;
            case "source":
              Ft("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Ft(
                "error",
                r
              ), Ft("load", r);
              break;
            case "details":
              Ft("toggle", r);
              break;
            case "input":
              Ru(r, o), Ft("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Ft("invalid", r);
              break;
            case "textarea":
              Lu(r, o), Ft("invalid", r);
          }
          Da(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && Ao(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && Ao(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Yl.hasOwnProperty(i) && a != null && i === "onScroll" && Ft("scroll", r);
          }
          switch (n) {
            case "input":
              jo(r), $u(r, o, !0);
              break;
            case "textarea":
              jo(r), Ou(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ci);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = mh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[ks] = t, e[so] = r, Bf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Pa(n, r), n) {
              case "dialog":
                Ft("cancel", e), Ft("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Ft("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pl.length; l++) Ft(Pl[l], e);
                l = r;
                break;
              case "source":
                Ft("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Ft(
                  "error",
                  e
                ), Ft("load", e), l = r;
                break;
              case "details":
                Ft("toggle", e), l = r;
                break;
              case "input":
                Ru(e, r), l = Aa(e, r), Ft("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Vt({}, r, { value: void 0 }), Ft("invalid", e);
                break;
              case "textarea":
                Lu(e, r), l = La(e, r), Ft("invalid", e);
                break;
              default:
                l = r;
            }
            Da(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var c = a[o];
              o === "style" ? yh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && gh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Xl(e, c) : typeof c == "number" && Xl(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Yl.hasOwnProperty(o) ? c != null && o === "onScroll" && Ft("scroll", e) : c != null && Ac(e, o, c, i));
            }
            switch (n) {
              case "input":
                jo(e), $u(e, r, !1);
                break;
              case "textarea":
                jo(e), Ou(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + hr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? nl(e, !!r.multiple, o, !1) : r.defaultValue != null && nl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ci);
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
      return jn(t), null;
    case 6:
      if (e && t.stateNode != null) Uf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(ye(166));
        if (n = Er(lo.current), Er(Es.current), Ro(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ks] = t, (o = r.nodeValue !== n) && (e = Xn, e !== null)) switch (e.tag) {
            case 3:
              Ao(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ao(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ks] = t, t.stateNode = r;
      }
      return jn(t), null;
    case 13:
      if (Bt(Ht), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Wt && Yn !== null && t.mode & 1 && !(t.flags & 128)) lf(), fl(), t.flags |= 98560, o = !1;
        else if (o = Ro(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ye(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ye(317));
            o[ks] = t;
          } else fl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          jn(t), o = !1;
        } else ds !== null && (xc(ds), ds = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ht.current & 1 ? cn === 0 && (cn = 3) : fu())), t.updateQueue !== null && (t.flags |= 4), jn(t), null);
    case 4:
      return ml(), cc(e, t), e === null && to(t.stateNode.containerInfo), jn(t), null;
    case 10:
      return Qc(t.type._context), jn(t), null;
    case 17:
      return Un(t.type) && ui(), jn(t), null;
    case 19:
      if (Bt(Ht), o = t.memoizedState, o === null) return jn(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Tl(o, !1);
      else {
        if (cn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = xi(e), i !== null) {
            for (t.flags |= 128, Tl(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Pt(Ht, Ht.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && nn() > xl && (t.flags |= 128, r = !0, Tl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = xi(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Tl(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Wt) return jn(t), null;
        } else 2 * nn() - o.renderingStartTime > xl && n !== 1073741824 && (t.flags |= 128, r = !0, Tl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = nn(), t.sibling = null, n = Ht.current, Pt(Ht, r ? n & 1 | 2 : n & 1), t) : (jn(t), null);
    case 22:
    case 23:
      return hu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Kn & 1073741824 && (jn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ye(156, t.tag));
}
function D0(e, t) {
  switch (Vc(t), t.tag) {
    case 1:
      return Un(t.type) && ui(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return ml(), Bt(Wn), Bt(Cn), tu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return eu(t), null;
    case 13:
      if (Bt(Ht), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ye(340));
        fl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Bt(Ht), null;
    case 4:
      return ml(), null;
    case 10:
      return Qc(t.type._context), null;
    case 22:
    case 23:
      return hu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Oo = !1, En = !1, P0 = typeof WeakSet == "function" ? WeakSet : Set, Be = null;
function qr(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Zt(e, t, r);
  }
  else n.current = null;
}
function uc(e, t, n) {
  try {
    n();
  } catch (r) {
    Zt(e, t, r);
  }
}
var Ed = !1;
function _0(e, t) {
  if (Ya = oi, e = Vh(), Hc(e)) {
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
        var i = 0, a = -1, c = -1, h = 0, y = 0, f = e, x = null;
        t: for (; ; ) {
          for (var v; f !== n || l !== 0 && f.nodeType !== 3 || (a = i + l), f !== o || r !== 0 && f.nodeType !== 3 || (c = i + r), f.nodeType === 3 && (i += f.nodeValue.length), (v = f.firstChild) !== null; )
            x = f, f = v;
          for (; ; ) {
            if (f === e) break t;
            if (x === n && ++h === l && (a = i), x === o && ++y === r && (c = i), (v = f.nextSibling) !== null) break;
            f = x, x = f.parentNode;
          }
          f = v;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Xa = { focusedElem: e, selectionRange: n }, oi = !1, Be = t; Be !== null; ) if (t = Be, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Be = e;
  else for (; Be !== null; ) {
    t = Be;
    try {
      var C = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (C !== null) {
            var M = C.memoizedProps, D = C.memoizedState, k = t.stateNode, m = k.getSnapshotBeforeUpdate(t.elementType === t.type ? M : cs(t.type, M), D);
            k.__reactInternalSnapshotBeforeUpdate = m;
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
          throw Error(ye(163));
      }
    } catch (S) {
      Zt(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Be = e;
      break;
    }
    Be = t.return;
  }
  return C = Ed, Ed = !1, C;
}
function Hl(e, t, n) {
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
function zf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, zf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ks], delete t[so], delete t[Ja], delete t[N0], delete t[k0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Hf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Cd(e) {
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
function hc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ci));
  else if (r !== 4 && (e = e.child, e !== null)) for (hc(e, t, n), e = e.sibling; e !== null; ) hc(e, t, n), e = e.sibling;
}
function fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (fc(e, t, n), e = e.sibling; e !== null; ) fc(e, t, n), e = e.sibling;
}
var yn = null, us = !1;
function Vs(e, t, n) {
  for (n = n.child; n !== null; ) Kf(e, t, n), n = n.sibling;
}
function Kf(e, t, n) {
  if (js && typeof js.onCommitFiberUnmount == "function") try {
    js.onCommitFiberUnmount(bi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      En || qr(n, t);
    case 6:
      var r = yn, l = us;
      yn = null, Vs(e, t, n), yn = r, us = l, yn !== null && (us ? (e = yn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : yn.removeChild(n.stateNode));
      break;
    case 18:
      yn !== null && (us ? (e = yn, n = n.stateNode, e.nodeType === 8 ? ca(e.parentNode, n) : e.nodeType === 1 && ca(e, n), Zl(e)) : ca(yn, n.stateNode));
      break;
    case 4:
      r = yn, l = us, yn = n.stateNode.containerInfo, us = !0, Vs(e, t, n), yn = r, us = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!En && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && uc(n, t, i), l = l.next;
        } while (l !== r);
      }
      Vs(e, t, n);
      break;
    case 1:
      if (!En && (qr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Zt(n, t, a);
      }
      Vs(e, t, n);
      break;
    case 21:
      Vs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (En = (r = En) || n.memoizedState !== null, Vs(e, t, n), En = r) : Vs(e, t, n);
      break;
    default:
      Vs(e, t, n);
  }
}
function Sd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new P0()), t.forEach(function(r) {
      var l = Y0.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function as(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            yn = a.stateNode, us = !1;
            break e;
          case 3:
            yn = a.stateNode.containerInfo, us = !0;
            break e;
          case 4:
            yn = a.stateNode.containerInfo, us = !0;
            break e;
        }
        a = a.return;
      }
      if (yn === null) throw Error(ye(160));
      Kf(o, i, l), yn = null, us = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (h) {
      Zt(l, t, h);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Vf(t, e), t = t.sibling;
}
function Vf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (as(t, e), vs(e), r & 4) {
        try {
          Hl(3, e, e.return), Oi(3, e);
        } catch (M) {
          Zt(e, e.return, M);
        }
        try {
          Hl(5, e, e.return);
        } catch (M) {
          Zt(e, e.return, M);
        }
      }
      break;
    case 1:
      as(t, e), vs(e), r & 512 && n !== null && qr(n, n.return);
      break;
    case 5:
      if (as(t, e), vs(e), r & 512 && n !== null && qr(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Xl(l, "");
        } catch (M) {
          Zt(e, e.return, M);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && o.type === "radio" && o.name != null && fh(l, o), Pa(a, i);
          var h = Pa(a, o);
          for (i = 0; i < c.length; i += 2) {
            var y = c[i], f = c[i + 1];
            y === "style" ? yh(l, f) : y === "dangerouslySetInnerHTML" ? gh(l, f) : y === "children" ? Xl(l, f) : Ac(l, y, f, h);
          }
          switch (a) {
            case "input":
              Ra(l, o);
              break;
            case "textarea":
              ph(l, o);
              break;
            case "select":
              var x = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var v = o.value;
              v != null ? nl(l, !!o.multiple, v, !1) : x !== !!o.multiple && (o.defaultValue != null ? nl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : nl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[so] = o;
        } catch (M) {
          Zt(e, e.return, M);
        }
      }
      break;
    case 6:
      if (as(t, e), vs(e), r & 4) {
        if (e.stateNode === null) throw Error(ye(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (M) {
          Zt(e, e.return, M);
        }
      }
      break;
    case 3:
      if (as(t, e), vs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Zl(t.containerInfo);
      } catch (M) {
        Zt(e, e.return, M);
      }
      break;
    case 4:
      as(t, e), vs(e);
      break;
    case 13:
      as(t, e), vs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (uu = nn())), r & 4 && Sd(e);
      break;
    case 22:
      if (y = n !== null && n.memoizedState !== null, e.mode & 1 ? (En = (h = En) || y, as(t, e), En = h) : as(t, e), vs(e), r & 8192) {
        if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !y && e.mode & 1) for (Be = e, y = e.child; y !== null; ) {
          for (f = Be = y; Be !== null; ) {
            switch (x = Be, v = x.child, x.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Hl(4, x, x.return);
                break;
              case 1:
                qr(x, x.return);
                var C = x.stateNode;
                if (typeof C.componentWillUnmount == "function") {
                  r = x, n = x.return;
                  try {
                    t = r, C.props = t.memoizedProps, C.state = t.memoizedState, C.componentWillUnmount();
                  } catch (M) {
                    Zt(r, n, M);
                  }
                }
                break;
              case 5:
                qr(x, x.return);
                break;
              case 22:
                if (x.memoizedState !== null) {
                  Md(f);
                  continue;
                }
            }
            v !== null ? (v.return = x, Be = v) : Md(f);
          }
          y = y.sibling;
        }
        e: for (y = null, f = e; ; ) {
          if (f.tag === 5) {
            if (y === null) {
              y = f;
              try {
                l = f.stateNode, h ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = f.stateNode, c = f.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = xh("display", i));
              } catch (M) {
                Zt(e, e.return, M);
              }
            }
          } else if (f.tag === 6) {
            if (y === null) try {
              f.stateNode.nodeValue = h ? "" : f.memoizedProps;
            } catch (M) {
              Zt(e, e.return, M);
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
      as(t, e), vs(e), r & 4 && Sd(e);
      break;
    case 21:
      break;
    default:
      as(
        t,
        e
      ), vs(e);
  }
}
function vs(e) {
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
        throw Error(ye(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Xl(l, ""), r.flags &= -33);
          var o = Cd(e);
          fc(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Cd(e);
          hc(e, a, i);
          break;
        default:
          throw Error(ye(161));
      }
    } catch (c) {
      Zt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function F0(e, t, n) {
  Be = e, Yf(e);
}
function Yf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Be !== null; ) {
    var l = Be, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Oo;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || En;
        a = Oo;
        var h = En;
        if (Oo = i, (En = c) && !h) for (Be = l; Be !== null; ) i = Be, c = i.child, i.tag === 22 && i.memoizedState !== null ? Id(l) : c !== null ? (c.return = i, Be = c) : Id(l);
        for (; o !== null; ) Be = o, Yf(o), o = o.sibling;
        Be = l, Oo = a, En = h;
      }
      bd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Be = o) : bd(e);
  }
}
function bd(e) {
  for (; Be !== null; ) {
    var t = Be;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            En || Oi(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !En) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : cs(t.type, n.memoizedProps);
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
              var h = t.alternate;
              if (h !== null) {
                var y = h.memoizedState;
                if (y !== null) {
                  var f = y.dehydrated;
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
        En || t.flags & 512 && dc(t);
      } catch (x) {
        Zt(t, t.return, x);
      }
    }
    if (t === e) {
      Be = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Be = n;
      break;
    }
    Be = t.return;
  }
}
function Md(e) {
  for (; Be !== null; ) {
    var t = Be;
    if (t === e) {
      Be = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Be = n;
      break;
    }
    Be = t.return;
  }
}
function Id(e) {
  for (; Be !== null; ) {
    var t = Be;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Oi(4, t);
          } catch (c) {
            Zt(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              Zt(t, l, c);
            }
          }
          var o = t.return;
          try {
            dc(t);
          } catch (c) {
            Zt(t, o, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            dc(t);
          } catch (c) {
            Zt(t, i, c);
          }
      }
    } catch (c) {
      Zt(t, t.return, c);
    }
    if (t === e) {
      Be = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, Be = a;
      break;
    }
    Be = t.return;
  }
}
var B0 = Math.ceil, Ni = Fs.ReactCurrentDispatcher, au = Fs.ReactCurrentOwner, rs = Fs.ReactCurrentBatchConfig, jt = 0, mn = null, ln = null, vn = 0, Kn = 0, el = mr(0), cn = 0, co = null, Rr = 0, Di = 0, cu = 0, Kl = null, Fn = null, uu = 0, xl = 1 / 0, Ms = null, ki = !1, pc = null, cr = null, Do = !1, sr = null, wi = 0, Vl = 0, mc = null, Go = -1, Qo = 0;
function Rn() {
  return jt & 6 ? nn() : Go !== -1 ? Go : Go = nn();
}
function ur(e) {
  return e.mode & 1 ? jt & 2 && vn !== 0 ? vn & -vn : j0.transition !== null ? (Qo === 0 && (Qo = Th()), Qo) : (e = It, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ph(e.type)), e) : 1;
}
function ps(e, t, n, r) {
  if (50 < Vl) throw Vl = 0, mc = null, Error(ye(185));
  po(e, n, r), (!(jt & 2) || e !== mn) && (e === mn && (!(jt & 2) && (Di |= n), cn === 4 && er(e, vn)), zn(e, r), n === 1 && jt === 0 && !(t.mode & 1) && (xl = nn() + 500, Ri && gr()));
}
function zn(e, t) {
  var n = e.callbackNode;
  jm(e, t);
  var r = li(e, e === mn ? vn : 0);
  if (r === 0) n !== null && _u(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && _u(n), t === 1) e.tag === 0 ? w0(Td.bind(null, e)) : nf(Td.bind(null, e)), y0(function() {
      !(jt & 6) && gr();
    }), n = null;
    else {
      switch (Ah(r)) {
        case 1:
          n = Dc;
          break;
        case 4:
          n = Mh;
          break;
        case 16:
          n = ri;
          break;
        case 536870912:
          n = Ih;
          break;
        default:
          n = ri;
      }
      n = tp(n, Xf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Xf(e, t) {
  if (Go = -1, Qo = 0, jt & 6) throw Error(ye(327));
  var n = e.callbackNode;
  if (il() && e.callbackNode !== n) return null;
  var r = li(e, e === mn ? vn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ji(e, r);
  else {
    t = r;
    var l = jt;
    jt |= 2;
    var o = Qf();
    (mn !== e || vn !== t) && (Ms = null, xl = nn() + 500, br(e, t));
    do
      try {
        z0();
        break;
      } catch (a) {
        Gf(e, a);
      }
    while (!0);
    Gc(), Ni.current = o, jt = l, ln !== null ? t = 0 : (mn = null, vn = 0, t = cn);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ua(e), l !== 0 && (r = l, t = gc(e, l))), t === 1) throw n = co, br(e, 0), er(e, r), zn(e, nn()), n;
    if (t === 6) er(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !W0(l) && (t = ji(e, r), t === 2 && (o = Ua(e), o !== 0 && (r = o, t = gc(e, o))), t === 1)) throw n = co, br(e, 0), er(e, r), zn(e, nn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ye(345));
        case 2:
          Nr(e, Fn, Ms);
          break;
        case 3:
          if (er(e, r), (r & 130023424) === r && (t = uu + 500 - nn(), 10 < t)) {
            if (li(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Rn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Qa(Nr.bind(null, e, Fn, Ms), t);
            break;
          }
          Nr(e, Fn, Ms);
          break;
        case 4:
          if (er(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - fs(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = nn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * B0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Qa(Nr.bind(null, e, Fn, Ms), r);
            break;
          }
          Nr(e, Fn, Ms);
          break;
        case 5:
          Nr(e, Fn, Ms);
          break;
        default:
          throw Error(ye(329));
      }
    }
  }
  return zn(e, nn()), e.callbackNode === n ? Xf.bind(null, e) : null;
}
function gc(e, t) {
  var n = Kl;
  return e.current.memoizedState.isDehydrated && (br(e, t).flags |= 256), e = ji(e, t), e !== 2 && (t = Fn, Fn = n, t !== null && xc(t)), e;
}
function xc(e) {
  Fn === null ? Fn = e : Fn.push.apply(Fn, e);
}
function W0(e) {
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
function er(e, t) {
  for (t &= ~cu, t &= ~Di, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - fs(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Td(e) {
  if (jt & 6) throw Error(ye(327));
  il();
  var t = li(e, 0);
  if (!(t & 1)) return zn(e, nn()), null;
  var n = ji(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ua(e);
    r !== 0 && (t = r, n = gc(e, r));
  }
  if (n === 1) throw n = co, br(e, 0), er(e, t), zn(e, nn()), n;
  if (n === 6) throw Error(ye(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Nr(e, Fn, Ms), zn(e, nn()), null;
}
function du(e, t) {
  var n = jt;
  jt |= 1;
  try {
    return e(t);
  } finally {
    jt = n, jt === 0 && (xl = nn() + 500, Ri && gr());
  }
}
function $r(e) {
  sr !== null && sr.tag === 0 && !(jt & 6) && il();
  var t = jt;
  jt |= 1;
  var n = rs.transition, r = It;
  try {
    if (rs.transition = null, It = 1, e) return e();
  } finally {
    It = r, rs.transition = n, jt = t, !(jt & 6) && gr();
  }
}
function hu() {
  Kn = el.current, Bt(el);
}
function br(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, x0(n)), ln !== null) for (n = ln.return; n !== null; ) {
    var r = n;
    switch (Vc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ui();
        break;
      case 3:
        ml(), Bt(Wn), Bt(Cn), tu();
        break;
      case 5:
        eu(r);
        break;
      case 4:
        ml();
        break;
      case 13:
        Bt(Ht);
        break;
      case 19:
        Bt(Ht);
        break;
      case 10:
        Qc(r.type._context);
        break;
      case 22:
      case 23:
        hu();
    }
    n = n.return;
  }
  if (mn = e, ln = e = dr(e.current, null), vn = Kn = t, cn = 0, co = null, cu = Di = Rr = 0, Fn = Kl = null, jr !== null) {
    for (t = 0; t < jr.length; t++) if (n = jr[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    jr = null;
  }
  return e;
}
function Gf(e, t) {
  do {
    var n = ln;
    try {
      if (Gc(), Vo.current = vi, yi) {
        for (var r = Kt.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        yi = !1;
      }
      if (Ar = 0, pn = an = Kt = null, zl = !1, oo = 0, au.current = null, n === null || n.return === null) {
        cn = 1, co = t, ln = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, c = t;
        if (t = vn, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var h = c, y = a, f = y.tag;
          if (!(y.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var x = y.alternate;
            x ? (y.updateQueue = x.updateQueue, y.memoizedState = x.memoizedState, y.lanes = x.lanes) : (y.updateQueue = null, y.memoizedState = null);
          }
          var v = xd(i);
          if (v !== null) {
            v.flags &= -257, yd(v, i, a, o, t), v.mode & 1 && gd(o, h, t), t = v, c = h;
            var C = t.updateQueue;
            if (C === null) {
              var M = /* @__PURE__ */ new Set();
              M.add(c), t.updateQueue = M;
            } else C.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              gd(o, h, t), fu();
              break e;
            }
            c = Error(ye(426));
          }
        } else if (Wt && a.mode & 1) {
          var D = xd(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), yd(D, i, a, o, t), Yc(gl(c, a));
            break e;
          }
        }
        o = c = gl(c, a), cn !== 4 && (cn = 2), Kl === null ? Kl = [o] : Kl.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Rf(o, c, t);
              ud(o, k);
              break e;
            case 1:
              a = c;
              var m = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof m.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (cr === null || !cr.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var S = $f(o, a, t);
                ud(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Zf(n);
    } catch (E) {
      t = E, ln === n && n !== null && (ln = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Qf() {
  var e = Ni.current;
  return Ni.current = vi, e === null ? vi : e;
}
function fu() {
  (cn === 0 || cn === 3 || cn === 2) && (cn = 4), mn === null || !(Rr & 268435455) && !(Di & 268435455) || er(mn, vn);
}
function ji(e, t) {
  var n = jt;
  jt |= 2;
  var r = Qf();
  (mn !== e || vn !== t) && (Ms = null, br(e, t));
  do
    try {
      U0();
      break;
    } catch (l) {
      Gf(e, l);
    }
  while (!0);
  if (Gc(), jt = n, Ni.current = r, ln !== null) throw Error(ye(261));
  return mn = null, vn = 0, cn;
}
function U0() {
  for (; ln !== null; ) Jf(ln);
}
function z0() {
  for (; ln !== null && !pm(); ) Jf(ln);
}
function Jf(e) {
  var t = ep(e.alternate, e, Kn);
  e.memoizedProps = e.pendingProps, t === null ? Zf(e) : ln = t, au.current = null;
}
function Zf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = D0(n, t), n !== null) {
        n.flags &= 32767, ln = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        cn = 6, ln = null;
        return;
      }
    } else if (n = O0(n, t, Kn), n !== null) {
      ln = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ln = t;
      return;
    }
    ln = t = e;
  } while (t !== null);
  cn === 0 && (cn = 5);
}
function Nr(e, t, n) {
  var r = It, l = rs.transition;
  try {
    rs.transition = null, It = 1, H0(e, t, n, r);
  } finally {
    rs.transition = l, It = r;
  }
  return null;
}
function H0(e, t, n, r) {
  do
    il();
  while (sr !== null);
  if (jt & 6) throw Error(ye(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ye(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Em(e, o), e === mn && (ln = mn = null, vn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Do || (Do = !0, tp(ri, function() {
    return il(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = rs.transition, rs.transition = null;
    var i = It;
    It = 1;
    var a = jt;
    jt |= 4, au.current = null, _0(e, n), Vf(n, e), u0(Xa), oi = !!Ya, Xa = Ya = null, e.current = n, F0(n), mm(), jt = a, It = i, rs.transition = o;
  } else e.current = n;
  if (Do && (Do = !1, sr = e, wi = l), o = e.pendingLanes, o === 0 && (cr = null), ym(n.stateNode), zn(e, nn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ki) throw ki = !1, e = pc, pc = null, e;
  return wi & 1 && e.tag !== 0 && il(), o = e.pendingLanes, o & 1 ? e === mc ? Vl++ : (Vl = 0, mc = e) : Vl = 0, gr(), null;
}
function il() {
  if (sr !== null) {
    var e = Ah(wi), t = rs.transition, n = It;
    try {
      if (rs.transition = null, It = 16 > e ? 16 : e, sr === null) var r = !1;
      else {
        if (e = sr, sr = null, wi = 0, jt & 6) throw Error(ye(331));
        var l = jt;
        for (jt |= 4, Be = e.current; Be !== null; ) {
          var o = Be, i = o.child;
          if (Be.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var h = a[c];
                for (Be = h; Be !== null; ) {
                  var y = Be;
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hl(8, y, o);
                  }
                  var f = y.child;
                  if (f !== null) f.return = y, Be = f;
                  else for (; Be !== null; ) {
                    y = Be;
                    var x = y.sibling, v = y.return;
                    if (zf(y), y === h) {
                      Be = null;
                      break;
                    }
                    if (x !== null) {
                      x.return = v, Be = x;
                      break;
                    }
                    Be = v;
                  }
                }
              }
              var C = o.alternate;
              if (C !== null) {
                var M = C.child;
                if (M !== null) {
                  C.child = null;
                  do {
                    var D = M.sibling;
                    M.sibling = null, M = D;
                  } while (M !== null);
                }
              }
              Be = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, Be = i;
          else e: for (; Be !== null; ) {
            if (o = Be, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Hl(9, o, o.return);
            }
            var k = o.sibling;
            if (k !== null) {
              k.return = o.return, Be = k;
              break e;
            }
            Be = o.return;
          }
        }
        var m = e.current;
        for (Be = m; Be !== null; ) {
          i = Be;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, Be = d;
          else e: for (i = m; Be !== null; ) {
            if (a = Be, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Oi(9, a);
              }
            } catch (E) {
              Zt(a, a.return, E);
            }
            if (a === i) {
              Be = null;
              break e;
            }
            var S = a.sibling;
            if (S !== null) {
              S.return = a.return, Be = S;
              break e;
            }
            Be = a.return;
          }
        }
        if (jt = l, gr(), js && typeof js.onPostCommitFiberRoot == "function") try {
          js.onPostCommitFiberRoot(bi, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      It = n, rs.transition = t;
    }
  }
  return !1;
}
function Ad(e, t, n) {
  t = gl(n, t), t = Rf(e, t, 1), e = ar(e, t, 1), t = Rn(), e !== null && (po(e, 1, t), zn(e, t));
}
function Zt(e, t, n) {
  if (e.tag === 3) Ad(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ad(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (cr === null || !cr.has(r))) {
        e = gl(n, e), e = $f(t, e, 1), t = ar(t, e, 1), e = Rn(), t !== null && (po(t, 1, e), zn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function K0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Rn(), e.pingedLanes |= e.suspendedLanes & n, mn === e && (vn & n) === n && (cn === 4 || cn === 3 && (vn & 130023424) === vn && 500 > nn() - uu ? br(e, 0) : cu |= n), zn(e, t);
}
function qf(e, t) {
  t === 0 && (e.mode & 1 ? (t = So, So <<= 1, !(So & 130023424) && (So = 4194304)) : t = 1);
  var n = Rn();
  e = Ps(e, t), e !== null && (po(e, t, n), zn(e, n));
}
function V0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), qf(e, n);
}
function Y0(e, t) {
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
  r !== null && r.delete(t), qf(e, n);
}
var ep;
ep = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Wn.current) Bn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Bn = !1, L0(e, t, n);
    Bn = !!(e.flags & 131072);
  }
  else Bn = !1, Wt && t.flags & 1048576 && sf(t, fi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Xo(e, t), e = t.pendingProps;
      var l = hl(t, Cn.current);
      ol(t, n), l = su(null, t, r, e, l, n);
      var o = ru();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Un(r) ? (o = !0, di(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Zc(t), l.updater = Li, t.stateNode = l, l._reactInternals = t, sc(t, r, e, n), t = oc(null, t, r, !0, o, n)) : (t.tag = 0, Wt && o && Kc(t), An(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Xo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = G0(r), e = cs(r, e), l) {
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
            t = Nd(null, t, r, cs(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), lc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), kd(e, t, r, l, n);
    case 3:
      e: {
        if (Pf(t), e === null) throw Error(ye(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, uf(e, t), gi(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = gl(Error(ye(423)), t), t = wd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gl(Error(ye(424)), t), t = wd(e, t, r, n, l);
          break e;
        } else for (Yn = ir(t.stateNode.containerInfo.firstChild), Xn = t, Wt = !0, ds = null, n = af(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (fl(), r === l) {
            t = _s(e, t, n);
            break e;
          }
          An(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return df(t), e === null && ec(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ga(r, l) ? i = null : o !== null && Ga(r, o) && (t.flags |= 32), Df(e, t), An(e, t, i, n), t.child;
    case 6:
      return e === null && ec(t), null;
    case 13:
      return _f(e, t, n);
    case 4:
      return qc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = pl(t, null, r, n) : An(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), vd(e, t, r, l, n);
    case 7:
      return An(e, t, t.pendingProps, n), t.child;
    case 8:
      return An(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return An(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Pt(pi, r._currentValue), r._currentValue = i, o !== null) if (ms(o.value, i)) {
          if (o.children === l.children && !Wn.current) {
            t = _s(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = $s(-1, n & -n), c.tag = 2;
                  var h = o.updateQueue;
                  if (h !== null) {
                    h = h.shared;
                    var y = h.pending;
                    y === null ? c.next = c : (c.next = y.next, y.next = c), h.pending = c;
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
            if (i = o.return, i === null) throw Error(ye(341));
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
        An(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, ol(t, n), l = ls(l), r = r(l), t.flags |= 1, An(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = cs(r, t.pendingProps), l = cs(r.type, l), Nd(e, t, r, l, n);
    case 15:
      return Lf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : cs(r, l), Xo(e, t), t.tag = 1, Un(r) ? (e = !0, di(t)) : e = !1, ol(t, n), Af(t, r, l), sc(t, r, l, n), oc(null, t, r, !0, e, n);
    case 19:
      return Ff(e, t, n);
    case 22:
      return Of(e, t, n);
  }
  throw Error(ye(156, t.tag));
};
function tp(e, t) {
  return bh(e, t);
}
function X0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ss(e, t, n, r) {
  return new X0(e, t, n, r);
}
function pu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function G0(e) {
  if (typeof e == "function") return pu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === $c) return 11;
    if (e === Lc) return 14;
  }
  return 2;
}
function dr(e, t) {
  var n = e.alternate;
  return n === null ? (n = ss(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Jo(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") pu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Hr:
      return Mr(n.children, l, o, t);
    case Rc:
      i = 8, l |= 8;
      break;
    case ba:
      return e = ss(12, n, t, l | 2), e.elementType = ba, e.lanes = o, e;
    case Ma:
      return e = ss(13, n, t, l), e.elementType = Ma, e.lanes = o, e;
    case Ia:
      return e = ss(19, n, t, l), e.elementType = Ia, e.lanes = o, e;
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
        case $c:
          i = 11;
          break e;
        case Lc:
          i = 14;
          break e;
        case Gs:
          i = 16, r = null;
          break e;
      }
      throw Error(ye(130, e == null ? e : typeof e, ""));
  }
  return t = ss(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Mr(e, t, n, r) {
  return e = ss(7, e, r, t), e.lanes = n, e;
}
function Pi(e, t, n, r) {
  return e = ss(22, e, r, t), e.elementType = uh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function xa(e, t, n) {
  return e = ss(6, e, null, t), e.lanes = n, e;
}
function ya(e, t, n) {
  return t = ss(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Q0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zi(0), this.expirationTimes = Zi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function mu(e, t, n, r, l, o, i, a, c) {
  return e = new Q0(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ss(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Zc(o), e;
}
function J0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: zr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function np(e) {
  if (!e) return fr;
  e = e._reactInternals;
  e: {
    if (Or(e) !== e || e.tag !== 1) throw Error(ye(170));
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
    throw Error(ye(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Un(n)) return tf(e, n, t);
  }
  return t;
}
function sp(e, t, n, r, l, o, i, a, c) {
  return e = mu(n, r, !0, e, l, o, i, a, c), e.context = np(null), n = e.current, r = Rn(), l = ur(n), o = $s(r, l), o.callback = t ?? null, ar(n, o, l), e.current.lanes = l, po(e, l, r), zn(e, r), e;
}
function _i(e, t, n, r) {
  var l = t.current, o = Rn(), i = ur(l);
  return n = np(n), t.context === null ? t.context = n : t.pendingContext = n, t = $s(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ar(l, t, i), e !== null && (ps(e, l, i, o), Ko(e, l, i)), i;
}
function Ei(e) {
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
function gu(e, t) {
  Rd(e, t), (e = e.alternate) && Rd(e, t);
}
function Z0() {
  return null;
}
var rp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function xu(e) {
  this._internalRoot = e;
}
Fi.prototype.render = xu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ye(409));
  _i(e, t, null, null);
};
Fi.prototype.unmount = xu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    $r(function() {
      _i(null, e, null, null);
    }), t[Ds] = null;
  }
};
function Fi(e) {
  this._internalRoot = e;
}
Fi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Lh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < qs.length && t !== 0 && t < qs[n].priority; n++) ;
    qs.splice(n, 0, e), n === 0 && Dh(e);
  }
};
function yu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Bi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function $d() {
}
function q0(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var h = Ei(i);
        o.call(h);
      };
    }
    var i = sp(t, r, e, 0, null, !1, !1, "", $d);
    return e._reactRootContainer = i, e[Ds] = i.current, to(e.nodeType === 8 ? e.parentNode : e), $r(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var h = Ei(c);
      a.call(h);
    };
  }
  var c = mu(e, 0, !1, null, null, !1, !1, "", $d);
  return e._reactRootContainer = c, e[Ds] = c.current, to(e.nodeType === 8 ? e.parentNode : e), $r(function() {
    _i(t, c, n, r);
  }), c;
}
function Wi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Ei(i);
        a.call(c);
      };
    }
    _i(t, i, e, l);
  } else i = q0(n, t, e, l, r);
  return Ei(i);
}
Rh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Dl(t.pendingLanes);
        n !== 0 && (Pc(t, n | 1), zn(t, nn()), !(jt & 6) && (xl = nn() + 500, gr()));
      }
      break;
    case 13:
      $r(function() {
        var r = Ps(e, 1);
        if (r !== null) {
          var l = Rn();
          ps(r, e, 1, l);
        }
      }), gu(e, 1);
  }
};
_c = function(e) {
  if (e.tag === 13) {
    var t = Ps(e, 134217728);
    if (t !== null) {
      var n = Rn();
      ps(t, e, 134217728, n);
    }
    gu(e, 134217728);
  }
};
$h = function(e) {
  if (e.tag === 13) {
    var t = ur(e), n = Ps(e, t);
    if (n !== null) {
      var r = Rn();
      ps(n, e, t, r);
    }
    gu(e, t);
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
Fa = function(e, t, n) {
  switch (t) {
    case "input":
      if (Ra(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ai(r);
            if (!l) throw Error(ye(90));
            hh(r), Ra(r, l);
          }
        }
      }
      break;
    case "textarea":
      ph(e, n);
      break;
    case "select":
      t = n.value, t != null && nl(e, !!n.multiple, t, !1);
  }
};
kh = du;
wh = $r;
var eg = { usingClientEntryPoint: !1, Events: [go, Xr, Ai, vh, Nh, du] }, Al = { findFiberByHostInstance: wr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, tg = { bundleType: Al.bundleType, version: Al.version, rendererPackageName: Al.rendererPackageName, rendererConfig: Al.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Fs.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ch(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Al.findFiberByHostInstance || Z0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Po = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Po.isDisabled && Po.supportsFiber) try {
    bi = Po.inject(tg), js = Po;
  } catch {
  }
}
Qn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eg;
Qn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!yu(t)) throw Error(ye(200));
  return J0(e, t, null, n);
};
Qn.createRoot = function(e, t) {
  if (!yu(e)) throw Error(ye(299));
  var n = !1, r = "", l = rp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = mu(e, 1, !1, null, null, n, !1, r, l), e[Ds] = t.current, to(e.nodeType === 8 ? e.parentNode : e), new xu(t);
};
Qn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ye(188)) : (e = Object.keys(e).join(","), Error(ye(268, e)));
  return e = Ch(t), e = e === null ? null : e.stateNode, e;
};
Qn.flushSync = function(e) {
  return $r(e);
};
Qn.hydrate = function(e, t, n) {
  if (!Bi(t)) throw Error(ye(200));
  return Wi(null, e, t, !0, n);
};
Qn.hydrateRoot = function(e, t, n) {
  if (!yu(e)) throw Error(ye(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = rp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = sp(t, null, e, 1, n ?? null, l, !1, o, i), e[Ds] = t.current, to(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Fi(t);
};
Qn.render = function(e, t, n) {
  if (!Bi(t)) throw Error(ye(200));
  return Wi(null, e, t, !1, n);
};
Qn.unmountComponentAtNode = function(e) {
  if (!Bi(e)) throw Error(ye(40));
  return e._reactRootContainer ? ($r(function() {
    Wi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ds] = null;
    });
  }), !0) : !1;
};
Qn.unstable_batchedUpdates = du;
Qn.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Bi(n)) throw Error(ye(200));
  if (e == null || e._reactInternals === void 0) throw Error(ye(38));
  return Wi(e, t, n, !1, r);
};
Qn.version = "18.3.1-next-f1338f8080-20240426";
function lp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lp);
    } catch (e) {
      console.error(e);
    }
}
lp(), rh.exports = Qn;
var Bs = rh.exports, Ld = Bs;
ei.createRoot = Ld.createRoot, ei.hydrateRoot = Ld.hydrateRoot;
var op = { exports: {} }, Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ng = u, sg = Symbol.for("react.element"), rg = Symbol.for("react.fragment"), lg = Object.prototype.hasOwnProperty, og = ng.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ig = { key: !0, ref: !0, __self: !0, __source: !0 };
function ip(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) lg.call(t, r) && !ig.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: sg, type: e, key: o, ref: i, props: l, _owner: og.current };
}
Ui.Fragment = rg;
Ui.jsx = ip;
Ui.jsxs = ip;
op.exports = Ui;
var s = op.exports;
let tr = [], ap = 120, va = !1;
async function ag() {
  if (!va) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          cg(n), va = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    va = !0;
  }
}
function cg(e) {
  Array.isArray(e) && (tr = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Ls(e) {
  for (let t = tr.length - 1; t >= 0; t--) {
    const n = tr[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return tr.length > 0 ? {
    offsetMin: tr[0].offsetBeforeMin,
    label: tr[0].labelBefore
  } : { offsetMin: ap, label: "LOCAL" };
}
function cp(e, t) {
  return tr.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ci(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, i, a] = t.split(":").map(Number);
  for (const c of tr)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const h = (c.offsetBeforeMin - c.offsetAfterMin) / 60, y = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (y.getUTCFullYear() === n && y.getUTCMonth() + 1 === r && y.getUTCDate() === l) {
        const f = y.getUTCHours();
        if (o >= f && o < f + h)
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
function ug(e) {
  const { offsetMin: t, label: n } = Ls(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function dg(e) {
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
  return t === "UTC" ? dg(e) : ug(e);
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
  const [l, o, i] = e.split("-").map(Number), [a, c, h = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(i) || isNaN(a) || isNaN(c)) return null;
  const y = Date.UTC(l, o - 1, i, a, c, h);
  if (n === "UTC")
    return y;
  const f = Ci(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const x = y - ap * 6e4, { offsetMin: v } = Ls(x);
  let C = y - v * 6e4;
  const M = Ls(C);
  return M.offsetMin !== v && (C = y - M.offsetMin * 6e4), C;
}
function hg({
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
  onToggleDrawer: y,
  isInitialSetup: f = !1,
  selectedCount: x = 0,
  totalCount: v = 0,
  onResetStudio: C
}) {
  const [M, D] = u.useState(!1);
  u.useEffect(() => {
    if (!M) return;
    const E = (j) => {
      j.key === "Escape" && D(!1);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [M]);
  const k = u.useMemo(() => {
    const E = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), j = (e == null ? void 0 : e.durationMs) || 0;
    if (!E || j <= 0) return "-- ➔ --";
    const N = E + j, T = (re) => String(re).padStart(2, "0"), g = Cr(E, n), b = Cr(N, n), O = `${g.year}-${T(g.month)}-${T(g.day)}`, U = `${T(g.hour)}:${T(g.minute)}:${T(g.second)}`, A = `${b.year}-${T(b.month)}-${T(b.day)}`, H = `${T(b.hour)}:${T(b.minute)}:${T(b.second)}`, oe = n === "UTC" ? " (UTC)" : g.label ? ` (${g.label})` : "", W = O === A ? H : `${A} ${H}`;
    return `${O} ${U} ➔ ${W}${oe}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), m = u.useMemo(() => {
    const E = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (E >= 1440) {
      const j = (E / 1440).toFixed(1);
      return `(${j.endsWith(".0") ? parseInt(j, 10) : j}d / ${E}m Total)`;
    }
    return `(${E}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), d = () => {
    D(!1), C == null || C();
  }, S = M ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => D(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (E) => E.stopPropagation(), dir: "ltr", children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: m })
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
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: x }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              v
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
    typeof document < "u" && S && Bs.createPortal(S, document.body)
  ] });
}
const Fr = (e) => String(e).padStart(2, "0");
function kt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const x = new Date(e), v = Fr(x.getUTCHours()), C = Fr(x.getUTCMinutes()), M = Fr(x.getUTCSeconds()), D = l ? `${v}:${C}:${M}` : `${v}:${C}`;
    return r ? `${D} UTC` : D;
  }
  const { offsetMin: o, label: i } = Ls(e), a = new Date(e + o * 60 * 1e3), c = Fr(a.getUTCHours()), h = Fr(a.getUTCMinutes()), y = Fr(a.getUTCSeconds()), f = l ? `${c}:${h}:${y}` : `${c}:${h}`;
  return r ? `${f} ${i}` : f;
}
const fg = 600, Dd = 250, es = /* @__PURE__ */ new Map(), kr = /* @__PURE__ */ new Map(), vc = /* @__PURE__ */ new Set(), Pd = 4;
let al = 0, hs = [];
function Nc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Dd) * Dd;
}
function up() {
  var e;
  if (!(al >= Pd || hs.length === 0))
    for (hs = hs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); al < Pd && hs.length > 0; ) {
      const t = hs.pop();
      !t || (e = t.signal) != null && e.aborted || (al++, pg(t));
    }
}
function Zo(e, t, n, r = "mon-0") {
  const l = Nc(t), o = r || "mon-0", i = `${e}_${o}_${l}`;
  if (es.size >= fg) {
    const a = es.keys().next().value, c = es.get(a);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), es.delete(a);
  }
  es.set(i, n), vc.forEach((a) => a(e, l, n, o));
}
async function pg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: i } = e;
  try {
    if (o != null && o.aborted) {
      i(null);
      return;
    }
    const a = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${a}`, { signal: o });
    if (c.status === 200) {
      const h = await c.blob(), y = URL.createObjectURL(h);
      Zo(n, r, y, l), i(y);
    } else c.status === 204 ? (Zo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } catch (a) {
    a.name !== "AbortError" ? (Zo(n, r, "NO_SIGNAL", l), i("NO_SIGNAL")) : i(null);
  } finally {
    al = Math.max(0, al - 1), kr.delete(t), up();
  }
}
const Tn = {
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
    if (!es.has(o)) return null;
    const i = es.get(o);
    return es.delete(o), es.set(o, i), i;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: Zo,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    es.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), es.clear(), kr.clear(), hs = [], al = 0;
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
    if (es.has(i))
      return Promise.resolve(this.get(e, l, o));
    if (kr.has(i))
      return kr.get(i);
    const a = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      hs = hs.filter((y) => y.hostname === e && y.displayId === o && y.key !== i ? (kr.delete(y.key), y.resolve(null), !1) : !0);
      const h = { key: i, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        hs = hs.filter((y) => y.key !== i), kr.delete(i), c(null);
      }, { once: !0 }), hs.push(h), up();
    });
    return kr.set(i, a), a;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Tn.clearAll();
});
const vu = "ITB_STUDIO_SESSION_CACHE_V2", dp = "itb_player_audio_settings";
let Na = null;
function mg() {
  try {
    const e = localStorage.getItem(vu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function hp(e) {
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
      localStorage.setItem(vu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function gg() {
  try {
    localStorage.removeItem(vu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function cl() {
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
function xg(e) {
  try {
    localStorage.setItem(dp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let Js = null, tl = null, ka = null, Pn = 0, Br = 0, _o = -60, uo = 1;
function yg() {
  if (!Js) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (Js = new e());
  }
  return Js && Js.state === "suspended" && Js.resume().catch(() => {
  }), Js;
}
function Si(e, t = 1) {
  if (!e) return null;
  uo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = yg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (i) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", i);
      }
    return l && l.gain.setValueAtTime(uo, n.currentTime), tl = e, vg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function _d(e) {
  if (uo = Math.max(0, Number(e) || 1), tl != null && tl.__audioGainNode && Js)
    try {
      tl.__audioGainNode.gain.setValueAtTime(uo, Js.currentTime);
    } catch {
    }
}
function vg() {
  if (ka) return;
  const e = new Uint8Array(256), t = () => {
    const n = tl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Pn *= 0.85, Br *= 0.85, Pn < 1e-3 && (Pn = 0), Br < 1e-3 && (Br = 0), _o = Pn > 1e-3 ? 20 * Math.log10(Pn) : -60;
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
        Pn = i > Pn ? Pn * 0.3 + i * 0.7 : Pn * 0.85 + i * 0.15, Br = Math.max(Pn, o), _o = Pn > 1e-4 ? 20 * Math.log10(Pn) : -60;
      } catch {
        Pn = 0, Br = 0, _o = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Pn,
        peak: Br,
        db: _o,
        gain: uo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), ka = requestAnimationFrame(t);
  };
  ka = requestAnimationFrame(t);
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
function Ng({
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
          const h = (a.displayId ?? a.DisplayId ?? `mon-${c}`).toLowerCase(), y = !i && o === h, f = a.width ?? a.Width ?? 1920, x = a.height ?? a.Height ?? 1080, v = a.displayName ?? a.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${y ? "is-active" : ""}`,
              onClick: (C) => {
                C.stopPropagation(), n == null || n(h);
              },
              title: `Switch window to Monitor ${c + 1}: ${v} (${f}×${x})`,
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
function kg({
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
  isSpotlightActive: y,
  globalGaps: f = [],
  recordingSegments: x = {},
  playbackSpeed: v = 1,
  activeAudioStationId: C = null,
  directorPlan: M = null,
  isAutoDirectorEnabled: D = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: m = null,
  areAllDisplaysPlaced: d = !1,
  hideDisplayStrip: S = !1
}) {
  var z;
  const E = e.hostname || e.name || e.id || "", j = Math.round(t), [N, T] = u.useState(() => !E || !j ? null : Tn.get(E, j) || null), [g, b] = u.useState(""), [O, U] = u.useState(!1), [A, H] = u.useState(!1), [oe, W] = u.useState(!1), re = u.useRef(l), I = u.useRef(null), R = u.useRef(0), _ = u.useRef(t - i), V = u.useRef(t - i), F = u.useRef(!1), ne = u.useRef(null), Z = u.useRef(!1);
  _.current = t - i;
  const G = (e == null ? void 0 : e.displays) || ((z = e == null ? void 0 : e.topology) == null ? void 0 : z.displays) || [], [se, _e] = u.useState(null);
  u.useEffect(() => {
    _e(null);
  }, [k]);
  const De = u.useMemo(() => {
    const K = M || (e == null ? void 0 : e.directorPlan);
    return !K || !K.segments || K.segments.length === 0 ? null : K.segments.find((de) => {
      const pe = de.startEpochMs ?? de.StartEpochMs ?? 0, Ae = de.endEpochMs ?? de.EndEpochMs ?? 0;
      return t >= pe && t <= Ae;
    }) || K.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t]), Se = u.useMemo(() => {
    var K;
    return se ? se.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : G.length > 1 && D !== !1 && De ? (De.targetDisplayId || De.TargetDisplayId || "mon-0").toLowerCase() : (((K = G[0]) == null ? void 0 : K.displayId) || "mon-0").toLowerCase();
  }, [se, k, G, D, De]), Q = x[e == null ? void 0 : e.id] || x[E] || (e == null ? void 0 : e.segments) || [], le = Q.length === 0 || Q.some((K) => {
    const de = K.startEpochMs ?? K.startEpoch ?? 0, pe = K.endEpochMs ?? K.endEpoch ?? 0;
    return t >= de && t <= pe;
  }), ee = !!(r ? !cl().isMuted : C && (e.id === C || E === C)), te = u.useCallback(() => {
    if (!I.current) return;
    const K = cl();
    if (r)
      I.current.volume = K.volume, I.current.muted = K.isMuted, K.isMuted || Si(I.current);
    else {
      const de = !!(C && (e.id === C || E === C));
      I.current.muted = !de, de && (I.current.volume = K.volume, Si(I.current));
    }
  }, [r, C, e.id, E]);
  u.useEffect(() => {
    te();
  }, [te]), u.useEffect(() => {
    const K = (de) => {
      I.current && de.detail && te();
    };
    return window.addEventListener("itb-audio-state-changed", K), () => window.removeEventListener("itb-audio-state-changed", K);
  }, [te]), u.useEffect(() => {
    I.current && (I.current.defaultPlaybackRate = v, I.current.playbackRate = v);
  }, [v]), u.useEffect(() => {
    if (n || !j || !E) return;
    if (l) {
      re.current = !0;
      return;
    }
    const K = re.current;
    re.current = l;
    let de = !0;
    const pe = new AbortController(), Ae = Tn.get(E, j, Se);
    if (Ae) {
      T(Ae), H(!1), W(!1);
      return;
    }
    W(!0);
    const ae = setTimeout(() => {
      de && Tn.fetchFrame(E, j, pe.signal, Se).then((he) => {
        de && (W(!1), he && he !== "NO_SIGNAL" ? (T(he), H(!1)) : he === "NO_SIGNAL" && H(!0));
      });
    }, K ? 25 : 40), we = Tn.subscribe((he, Pe, We, Ve) => {
      he === E && Pe === j && (!Ve || Ve === Se) && de && (W(!1), We && We !== "NO_SIGNAL" ? (T(We), H(!1)) : We === "NO_SIGNAL" && H(!0));
    });
    return () => {
      de = !1, clearTimeout(ae), pe.abort(), we();
    };
  }, [E, j, n, l, r, O, Se]), u.useEffect(() => {
    if (!E || !(r || l)) {
      l || (ne.current && clearTimeout(ne.current), F.current = !1, b(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load()));
      return;
    }
    let de = null;
    return l && !y && le ? de = setTimeout(() => {
      const pe = _.current;
      R.current = pe, V.current = pe, F.current = !1;
      const Ae = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + pe}&displayId=${encodeURIComponent(Se)}&_t=${Date.now()}`;
      U(!1), b(Ae);
    }, 80) : l || (ne.current && clearTimeout(ne.current), F.current = !1, b(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load())), () => {
      de && clearTimeout(de);
    };
  }, [l, r, E, i, a, y, le, Se]), u.useEffect(() => {
    if (!E || !(r || l)) return;
    const de = _.current, pe = Math.abs(de - V.current);
    if (!l || pe < 800) {
      V.current = de;
      return;
    }
    return F.current = !0, V.current = de, R.current = de, I.current && I.current.pause(), U(!1), ne.current && clearTimeout(ne.current), ne.current = setTimeout(() => {
      if (!le || y) {
        b(""), U(!1), F.current = !1;
        return;
      }
      const Ae = _.current, $e = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + Ae}&displayId=${encodeURIComponent(Se)}&_t=${Date.now()}`;
      b($e);
    }, 75), () => {
      ne.current && clearTimeout(ne.current);
    };
  }, [t, l, r, E, i, a, y, le, Se]), u.useEffect(() => {
    if (r || !l || !I.current || !O || F.current) return;
    const K = (_.current - R.current) / 1e3;
    if (K >= 0) {
      const de = I.current, pe = de.currentTime, Ae = Math.abs(pe - K);
      if (Ae > 0.35 && Ae < 3)
        try {
          de.currentTime = K;
        } catch {
        }
    }
  }, [r, l, t, O]), u.useEffect(() => {
    if (!r || !l || !g || !O || y) return;
    let K = null, de = I.current ? I.current.currentTime : 0, pe = performance.now(), Ae = R.current + Math.round(de * 1e3);
    const $e = () => {
      const ae = I.current;
      if (ae && !ae.paused && !ae.ended && !Z.current && !F.current) {
        const we = performance.now(), he = ae.currentTime;
        Math.abs(he - de) > 5e-4 && (de = he, pe = we);
        const Pe = Math.max(0, (we - pe) / 1e3), We = ae.playbackRate || v || 1, Ve = de + Pe * We;
        let xe = R.current + Math.round(Ve * 1e3);
        const vt = xe - Ae;
        if (vt < 0 && vt > -300 && (xe = Ae), xe >= c) {
          o == null || o(!1), h == null || h(c);
          return;
        }
        const Ue = i + xe, Yt = f == null ? void 0 : f.find((ze) => Ue >= ze.startEpochMs && Ue < ze.endEpochMs);
        if (Yt) {
          Z.current = !0;
          const ze = Yt.endEpochMs - i;
          h(ze), R.current = ze, Ae = ze, V.current = ze;
          const ct = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + ze}&_t=${Date.now()}`;
          U(!1), b(ct), setTimeout(() => {
            Z.current = !1;
          }, 300);
          return;
        }
        xe !== Ae && (Ae = xe, V.current = xe, h == null || h(xe));
      }
      K = requestAnimationFrame($e);
    };
    return K = requestAnimationFrame($e), () => {
      K && cancelAnimationFrame(K);
    };
  }, [
    r,
    l,
    g,
    O,
    y,
    v,
    c,
    i,
    a,
    E,
    f,
    h,
    o
  ]);
  const Me = () => {
    if (Z.current) return;
    const K = i + _.current, de = Q.map((pe) => ({ start: pe.startEpochMs ?? pe.startEpoch ?? 0, end: pe.endEpochMs ?? pe.endEpoch ?? 0 })).filter((pe) => pe.start > K + 200).sort((pe, Ae) => pe.start - Ae.start)[0];
    if (de && de.start - i < c) {
      Z.current = !0;
      const pe = de.start - i;
      h(pe), R.current = pe;
      const Ae = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${i}&endEpoch=${i + a}&seekEpoch=${i + pe}&_t=${Date.now()}`;
      U(!1), b(Ae), setTimeout(() => {
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
        muted: !ee,
        onLoadedData: () => {
          I.current && (I.current.defaultPlaybackRate = v, I.current.playbackRate = v);
        },
        onCanPlay: () => {
          te(), I.current && (I.current.defaultPlaybackRate = v, I.current.playbackRate = v), l && I.current && I.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          F.current = !1, U(!0), te(), I.current && (I.current.defaultPlaybackRate = v, I.current.playbackRate = v);
        },
        onWaiting: () => {
          U(!1);
        },
        onTimeUpdate: () => {
          var K;
          !O && ((K = I.current) == null ? void 0 : K.currentTime) > 0 && (F.current = !1, U(!0));
        },
        onEnded: Me
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && O && !y ? 0 : 2,
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
            onError: () => H(!0)
          }
        ) : (!N || A || !le) && !g ? /* @__PURE__ */ s.jsx(fp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && le && !O && !y && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    !S && /* @__PURE__ */ s.jsx(
      Ng,
      {
        displays: G,
        activeDisplayId: Se,
        onSelectDisplay: (K) => {
          _e(K), m == null || m(K);
        },
        areAllDisplaysPlaced: d,
        isAutoDirectorEnabled: D
      }
    )
  ] });
}
function wg({
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
  outPointMs: y,
  setPlayheadMs: f,
  isSpotlightActive: x,
  globalGaps: v = [],
  onOpenSpotlight: C,
  onSelectActiveStation: M,
  recordingSegments: D = {},
  playbackSpeed: k = 1,
  activeAudioStationId: m = null,
  onSoloAudio: d,
  directorPlan: S = null,
  isAutoDirectorEnabled: E = !0,
  targetDisplayId: j = "auto",
  onSelectDisplayId: N = null,
  areAllDisplaysPlaced: T = !1,
  _slotIndex: g = 0,
  borderColor: b = null,
  onSwapWithNext: O = null
}) {
  var I;
  const U = !!(m && (e.id === m || e.hostname && e.hostname === m)), A = (e.hostname || e.name || "").includes("Offline"), H = A ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((I = e == null ? void 0 : e.topology) == null ? void 0 : I.displays) || []).length > 1;
  const W = () => {
    if (t) {
      const R = j && j !== "auto" && j !== "director" ? j : null;
      C && C(e.id, R);
    } else
      M && M(e.id);
  }, re = (R) => {
    R.preventDefault(), R.stopPropagation(), t && M && (a && a(!1), M(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: W,
      onContextMenu: re,
      className: `camera-card ${H} ${t ? "is-solo-card" : ""}`,
      style: b ? { borderColor: b } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${H}` }),
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
            M && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (R) => {
                  R.stopPropagation(), t && a && a(!1), M(t ? null : e.id);
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
            kg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: A,
              isSolo: t,
              isPlaying: i,
              setIsPlaying: a,
              baseEpochMs: c,
              totalDurationMs: h,
              outPointMs: y,
              setPlayheadMs: f,
              isSpotlightActive: x,
              globalGaps: v,
              recordingSegments: D,
              playbackSpeed: k,
              activeAudioStationId: m,
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
          kt(l, o)
        ] }) })
      ]
    }
  ) });
}
function zt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function jg(e) {
  const t = zt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Eg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Cg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var M, D, k, m, d, S;
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
    return ((M = l.layout) == null ? void 0 : M.placements) || n;
  const i = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), a = o.transitionType || "smooth", c = o.timestampEpochMs - i;
  if (t < c)
    return ((D = l.layout) == null ? void 0 : D.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((k = o.layout) == null ? void 0 : k.placements) || n;
  if (a === "cut")
    return ((m = l.layout) == null ? void 0 : m.placements) || n;
  const h = (t - c) / i, y = zt(h, 0, 1), f = a === "linear" ? y : jg(y), x = ((d = l.layout) == null ? void 0 : d.placements) || [], v = ((S = o.layout) == null ? void 0 : S.placements) || [], C = v.map((E) => {
    const j = x.find((U) => U.stationId === E.stationId && U.displayId === E.displayId);
    if (!j)
      return {
        ...E,
        opacity: Math.max(0.05, f)
      };
    const N = Math.round(j.x + (E.x - j.x) * f), T = Math.round(j.y + (E.y - j.y) * f), g = Math.round(j.width + (E.width - j.width) * f), b = Math.round(j.height + (E.height - j.height) * f), O = Number(((j.rotation || 0) + ((E.rotation || 0) - (j.rotation || 0)) * f).toFixed(1));
    return {
      ...E,
      x: N,
      y: T,
      width: g,
      height: b,
      rotation: O,
      opacity: 1
    };
  });
  return x.forEach((E) => {
    v.some((N) => N.stationId === E.stationId && N.displayId === E.displayId) || C.push({
      ...E,
      opacity: Math.max(0, 1 - f)
    });
  }), C;
}
function Sg({
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
  }, f = [...c, y].sort((C, M) => C.timestampEpochMs - M.timestampEpochMs), x = f.findIndex((C) => C.id === y.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: x >= 0 ? x : 0,
    isNewKeyframe: !0,
    activeKeyframe: y
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
function bg(e, t) {
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
  }, a = [...l, i].sort((h, y) => h.timestampEpochMs - y.timestampEpochMs), c = a.findIndex((h) => h.id === i.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: a
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
function Mg(e, t = [], n = []) {
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
    r.forEach((y) => {
      y.endEpochMs <= a || y.startEpochMs >= c ? h.push(y) : (y.startEpochMs < a && h.push({
        ...y,
        endEpochMs: a
      }), y.endEpochMs > c && h.push({
        ...y,
        startEpochMs: c
      }));
    }), r = h;
  }), (t || []).filter((i) => i.type !== "global").forEach((i) => {
    const a = i.startEpochMs ?? i.StartEpochMs ?? i.startEpoch ?? 0, c = i.endEpochMs ?? i.EndEpochMs ?? i.endEpoch ?? 0;
    if (!(!a || !c || c <= a))
      for (let h = r.length - 1; h > 0; h--) {
        const y = r[h].startEpochMs;
        y >= a && y <= c && r[h].startEpochMs === r[h - 1].endEpochMs && (r[h - 1].endEpochMs = r[h].endEpochMs, r.splice(h, 1));
      }
  });
  for (let i = r.length - 1; i > 0; i--)
    r[i].targetDisplayId === r[i - 1].targetDisplayId && r[i].startEpochMs === r[i - 1].endEpochMs && (r[i - 1].endEpochMs = r[i].endEpochMs, r.splice(i, 1));
  return r;
}
const qn = [
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
];
function Tg(e, t, n) {
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
function Wr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function Zs(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, i = n / r;
  let a, c, h, y;
  return o >= i ? (a = n, c = Math.round(a / o), h = e, y = t + Math.round((r - c) / 2)) : (c = r, a = Math.round(c * o), h = e + Math.round((n - a) / 2), y = t), { x: h, y, width: a, height: c };
}
function Ys(e, t = wc, n = jc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], h = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: f, width: x, height: v } = Zs(0, 0, t, n, h);
    return [{
      ...c,
      x: y,
      y: f,
      width: x,
      height: v,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: h,
      aspectRatio: h,
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
    return e.slice(0, 2).map((h, y) => {
      const f = h.nativeAspectRatio || (h.sourceWidth && h.sourceHeight ? h.sourceWidth / h.sourceHeight : 1.7777777777777777), { x, y: v, width: C, height: M } = Zs(y * c, 0, c, n, f);
      return {
        ...h,
        x,
        y: v,
        width: C,
        height: M,
        sourceWidth: h.sourceWidth || 1920,
        sourceHeight: h.sourceHeight || 1080,
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
      const x = Math.round(t / 3);
      return e.slice(0, 3).map((v, C) => {
        const M = v.nativeAspectRatio || (v.sourceWidth && v.sourceHeight ? v.sourceWidth / v.sourceHeight : 1.7777777777777777), { x: D, y: k, width: m, height: d } = Zs(C * x, 0, x, n, M);
        return {
          ...v,
          x: D,
          y: k,
          width: m,
          height: d,
          sourceWidth: v.sourceWidth || 1920,
          sourceHeight: v.sourceHeight || 1080,
          nativeAspectRatio: M,
          aspectRatio: M,
          zIndex: C,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[C % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const h = Math.round(t / 2), y = Math.round(n / 2), f = [
      { cx: 0, cy: 0 },
      { cx: h, cy: 0 },
      { cx: Math.round(h / 2), cy: y }
    ];
    return e.slice(0, 3).map((x, v) => {
      const C = x.nativeAspectRatio || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 1.7777777777777777), { cx: M, cy: D } = f[v], { x: k, y: m, width: d, height: S } = Zs(M, D, h, y, C);
      return {
        ...x,
        x: k,
        y: m,
        width: d,
        height: S,
        sourceWidth: x.sourceWidth || 1920,
        sourceHeight: x.sourceHeight || 1080,
        nativeAspectRatio: C,
        aspectRatio: C,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[v % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const c = Math.round(t / 2), h = Math.round(n / 2), y = [
      { cx: 0, cy: 0 },
      { cx: c, cy: 0 },
      { cx: 0, cy: h },
      { cx: c, cy: h }
    ];
    return e.slice(0, 4).map((f, x) => {
      const v = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: C, cy: M } = y[x], { x: D, y: k, width: m, height: d } = Zs(C, M, c, h, v);
      return {
        ...f,
        x: D,
        y: k,
        width: m,
        height: d,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: v,
        aspectRatio: v,
        zIndex: x,
        rotation: 0,
        borderWidth: 2,
        borderColor: pt[x % pt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), i = Math.floor(t / l), a = Math.floor(n / o);
  return e.map((c, h) => {
    const y = h % l, f = Math.floor(h / l), x = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: C, width: M, height: D } = Zs(y * i, f * a, i, a, x);
    return {
      ...c,
      x: v,
      y: C,
      width: M,
      height: D,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: x,
      aspectRatio: x,
      zIndex: h,
      rotation: 0,
      borderWidth: 2,
      borderColor: pt[h % pt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function Ag({
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
  playheadMs: y = 0,
  playheadEpochMs: f = 0,
  timeMode: x = "LOCAL",
  isPlaying: v = !1,
  setIsPlaying: C,
  totalDurationMs: M,
  inPointMs: D = 0,
  outPointMs: k,
  setPlayheadMs: m,
  globalGaps: d = [],
  recordingSegments: S = {},
  playbackSpeed: E = 1,
  onChangePlaybackSpeed: j,
  keystrokeMode: N = "BurnIn",
  keystrokes: T = [],
  directorPlan: g = null,
  onOverrideDisplay: b,
  onResetOverride: O,
  compositionLayout: U = "canvas",
  onChangeCompositionLayout: A,
  isAutoDirectorEnabled: H = !0,
  onToggleAutoDirector: oe,
  onUpdateCanvasLayout: W,
  canvasLayoutTimeline: re = null,
  onUpdateCanvasLayoutTimeline: I,
  activeKfIndex: R = 0,
  setActiveKfIndex: _,
  isModalOpen: V = !1
}) {
  const F = f > 0 ? f : h + y, [ne, Z] = u.useState(() => {
    var p;
    return ((p = t[0]) == null ? void 0 : p.id) || null;
  }), [G, se] = u.useState(!1), [_e, De] = u.useState(null), [Se, Q] = u.useState({ index: null, position: null }), [le, ee] = u.useState(!1), [te, Me] = u.useState(!1), [z, K] = u.useState(!1), [de, pe] = u.useState(!1), [Ae, $e] = u.useState(""), [ae, we] = u.useState(""), he = u.useRef(null), [Pe, We] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_canvas_saved_presets");
      return p ? JSON.parse(p) : [];
    } catch {
      return [];
    }
  }), Ve = (p) => {
    We(p);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(p));
    } catch {
    }
  }, [xe, vt] = u.useState(!1), [Ue, Yt] = u.useState(!1);
  u.useRef(null);
  const ze = u.useRef(null), ct = u.useRef(null), on = u.useRef(null), [$t, gn] = u.useState({ width: 960, height: 540 }), [Ke, Nt] = u.useState(0), [Sn, gt] = u.useState(!1);
  u.useEffect(() => {
    const p = (w) => {
      w.key === "Escape" && gt(!1);
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, []);
  const [Et, On] = u.useState(!1), [wt, At] = u.useState(!1), [Ut, qt] = u.useState(!1), [un, Dn] = u.useState(!1), [be, Ie] = u.useState(!1), [Xe, ut] = u.useState({ vertical: null, horizontal: null }), [Ct, q] = u.useState(!0), [me, J] = u.useState(!0), [Ne, Le] = u.useState(null), [Ge, qe] = u.useState({ x: 0, y: 0, isInside: !1 }), Ze = u.useRef(null), Ye = u.useRef(null), lt = u.useRef(!1), [xt, ot] = u.useState("auto-grid"), Lt = u.useRef([]), Xt = u.useRef([]), Gt = u.useRef(null), [, Zn] = u.useState(0), bn = u.useRef(null), [Ot, Cs] = u.useState(null), en = u.useCallback((p, w = "success", $ = "💾") => {
    bn.current && clearTimeout(bn.current), Cs({ text: p, type: w, icon: $ }), bn.current = setTimeout(() => {
      Cs(null), bn.current = null;
    }, 2200);
  }, []), [_t, is] = u.useState(() => {
    var $, X, Y, P, ie, Ce;
    const p = (Y = (X = ($ = re == null ? void 0 : re.keyframes) == null ? void 0 : $[0]) == null ? void 0 : X.layout) == null ? void 0 : Y.width, w = (Ce = (ie = (P = re == null ? void 0 : re.keyframes) == null ? void 0 : P[0]) == null ? void 0 : ie.layout) == null ? void 0 : Ce.height;
    if (p && w) {
      const fe = qn.find((ve) => ve.w === p && ve.h === w);
      if (fe) return fe.id;
    }
    return "16:9";
  }), [Qt, Ws] = u.useState(() => {
    try {
      const p = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (p !== null) return p === "true";
    } catch {
    }
    return !1;
  }), dn = u.useCallback(() => {
    Ws((p) => {
      const w = !p;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(w));
      } catch {
      }
      return w;
    });
  }, []), Ss = u.useMemo(() => qn.find((p) => p.id === _t) || qn[0], [_t]), Te = Ss.w, Re = Ss.h, gs = Ss.ratio, kn = u.useMemo(() => {
    const p = [], w = Te >= 3e3 ? 200 : 100, $ = w / 2, X = w / 10;
    for (let Y = 0; Y <= Te; Y += X) {
      const P = Y % w === 0, ie = !P && Y % $ === 0;
      p.push({ val: Y, isMajor: P, isMed: ie });
    }
    return p;
  }, [Te]), Dr = u.useMemo(() => {
    const p = [];
    for (let Y = 0; Y <= Re; Y += 10) {
      const P = Y % 100 === 0, ie = !P && Y % 50 === 0;
      p.push({ val: Y, isMajor: P, isMed: ie });
    }
    return p;
  }, [Re]), yo = u.useCallback((p) => {
    const w = Ze.current || ct.current;
    if (!w) return;
    const $ = w.getBoundingClientRect(), X = zt(Math.round((p.clientX - $.left) / $.width * Te), 0, Te), Y = zt(Math.round((p.clientY - $.top) / $.height * Re), 0, Re);
    qe({ x: X, y: Y, isInside: !0 });
  }, [Te, Re]), zi = u.useCallback(() => {
    qe((p) => ({ ...p, isInside: !1 }));
  }, []), Us = u.useCallback(() => {
    const p = on.current;
    if (!p) return;
    const w = p.getBoundingClientRect(), X = Math.max(320, Math.floor(w.width || 960) - 104 - 16), Y = Math.max(180, Math.floor(w.height || 540) - 16);
    let P, ie;
    Qt ? (P = X, ie = Math.round(P / gs)) : X / Y >= gs ? (ie = Y, P = Math.round(ie * gs)) : (P = X, ie = Math.round(P / gs)), gn((Ce) => Ce.width === P && Ce.height === ie ? Ce : { width: P, height: ie });
  }, [Qt, gs]);
  u.useEffect(() => {
    const p = on.current;
    if (!p) return;
    Us();
    let w = null;
    return typeof ResizeObserver < "u" && (w = new ResizeObserver(() => {
      Us();
    }), w.observe(p)), window.addEventListener("resize", Us), () => {
      w && w.disconnect(), window.removeEventListener("resize", Us);
    };
  }, [Us]);
  const hn = u.useMemo(() => (t && t.length > 0 ? t : n).map((w) => {
    const $ = w.displays && w.displays.length > 0 ? w.displays : w.topology && w.topology.displays && w.topology.displays.length > 0 ? w.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: w.width || 1920, height: w.height || 1080 }], X = $.find((fe) => fe.isPrimary) || $[0], Y = X.width || X.Width || w.width || 1920, P = X.height || X.Height || w.height || 1080, ie = Y && P ? Y / P : 16 / 9, Ce = $.length > 1;
    return {
      stationId: w.id,
      displayId: "auto",
      label: `${w.displayName || w.roleAlias || w.hostname || w.name} - ${Ce ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: w.displayName || w.roleAlias || w.hostname || w.name,
      stationHostname: w.hostname || w.id,
      isPrimary: !0,
      sourceWidth: Y,
      sourceHeight: P,
      nativeAspectRatio: ie,
      aspectRatio: ie,
      width: Y,
      height: P
    };
  }), [t, n]), sn = u.useMemo(() => {
    const p = t && t.length > 0 ? t : n, w = [];
    return p.forEach(($) => {
      const X = $.displays && $.displays.length > 0 ? $.displays : $.topology && $.topology.displays && $.topology.displays.length > 0 ? $.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: $.width || 1920, height: $.height || 1080 }], Y = X.find((fe) => fe.isPrimary) || X[0], P = Y.width || Y.Width || $.width || 1920, ie = Y.height || Y.Height || $.height || 1080, Ce = P / ie;
      w.push({
        stationId: $.id,
        displayId: "auto",
        label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${X.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: $.displayName || $.roleAlias || $.hostname || $.name,
        stationHostname: $.hostname || $.id,
        isPrimary: !0,
        sourceWidth: P,
        sourceHeight: ie,
        nativeAspectRatio: Ce,
        aspectRatio: Ce,
        width: P,
        height: ie
      }), X.length > 1 && X.forEach((fe, ve) => {
        const it = (fe.displayId || `mon-${ve}`).toLowerCase(), tt = fe.displayNumber || ve + 1, nt = fe.displayName || `Screen ${tt}`, ge = fe.width || fe.Width || $.width || 1920, st = fe.height || fe.Height || $.height || 1080, bt = ge / st;
        w.push({
          stationId: $.id,
          displayId: it,
          label: `${$.displayName || $.roleAlias || $.hostname || $.name} - ${nt}`,
          stationName: $.displayName || $.roleAlias || $.hostname || $.name,
          stationHostname: $.hostname || $.id,
          isPrimary: !!fe.isPrimary,
          sourceWidth: ge,
          sourceHeight: st,
          nativeAspectRatio: bt,
          aspectRatio: bt,
          width: ge,
          height: st
        });
      });
    }), w;
  }, [t, n]), [rn, tn] = u.useState(() => {
    var p;
    if (((p = re == null ? void 0 : re.keyframes) == null ? void 0 : p.length) > 0) {
      const w = JSON.parse(JSON.stringify(re));
      if (t && t.length > 0) {
        const $ = new Set(t.map((Y) => Y.id));
        if (w.keyframes.forEach((Y) => {
          var P, ie;
          ((ie = (P = Y.layout) == null ? void 0 : P.placements) == null ? void 0 : ie.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((Ce) => $.has(Ce.stationId)));
        }), w.keyframes.some((Y) => {
          var P, ie;
          return ((ie = (P = Y.layout) == null ? void 0 : P.placements) == null ? void 0 : ie.length) > 0;
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
            width: wc,
            height: jc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: Ys(hn, wc, jc)
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
        const X = new Set(t.map((Y) => Y.id));
        w.keyframes.forEach((Y) => {
          var P, ie;
          ((ie = (P = Y.layout) == null ? void 0 : P.placements) == null ? void 0 : ie.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((Ce) => X.has(Ce.stationId)));
        });
      }
      tn(w), w.keyframes.some((X) => {
        var Y, P;
        return ((P = (Y = X.layout) == null ? void 0 : Y.placements) == null ? void 0 : P.length) > 0;
      }) && (lt.current = !0, ot("custom"));
    }
  }, [re, t]);
  const xn = rn.keyframes || [], kl = u.useMemo(() => Eg(xn, F), [xn, F]), L = zt(
    R ?? kl,
    0,
    Math.max(0, xn.length - 1)
  ), ce = xn[L] || xn[kl] || xn[0], B = u.useMemo(() => {
    var p;
    return ((p = ce == null ? void 0 : ce.layout) == null ? void 0 : p.placements) || [];
  }, [ce]), ke = u.useCallback((p = "Action") => ({
    label: p,
    timeline: JSON.parse(JSON.stringify(rn)),
    aspectId: _t,
    presetId: xt,
    selectedFeedIndex: Ke
  }), [rn, _t, xt, Ke]), Ee = u.useCallback((p = "Action") => {
    const w = ke(p);
    Lt.current.push(w), Lt.current.length > 50 && Lt.current.shift(), Xt.current = [], Zn(($) => $ + 1);
  }, [ke]), je = u.useCallback(() => {
    Gt.current && (Lt.current.push(Gt.current), Lt.current.length > 50 && Lt.current.shift(), Xt.current = [], Gt.current = null, Zn((p) => p + 1));
  }, []), Fe = u.useCallback(() => {
    const p = f > 0 ? f : h + y, w = 500;
    if (p <= h + w) return L;
    const $ = (ce == null ? void 0 : ce.layout) || {
      width: Te,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      placements: B
    }, { nextTimeline: X, newIndex: Y, isNew: P } = Fd(rn, p, $, w);
    return P && (tn(X), I && I(X), _ && _(Y), en(
      `Keyframe #${Y + 1} created at ${kt(p, x, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), Y;
  }, [f, h, y, L, ce, Te, Re, B, rn, I, _, x, en]), ue = u.useCallback((p, w = null) => {
    w && Ee(w);
    const $ = f > 0 ? f : h + y;
    tn((X) => {
      const { nextTimeline: Y, newIndex: P, isNewKeyframe: ie } = Sg({
        prevTimeline: X,
        newPlacements: p,
        currentEpochMs: $,
        baseEpochMs: h,
        toleranceMs: 500,
        virtualW: Te,
        virtualH: Re,
        fps: 30
      });
      return I && I(Y), _ && _(P), ie && P > 0 && en(
        `Keyframe #${P + 1} created at ${kt($, x, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), Y;
    });
  }, [f, h, y, Te, Re, I, _, x, en, Ee]);
  u.useEffect(() => {
    if (hn.length > 0 && (!B || B.length === 0) && !lt.current) {
      let p = _t;
      hn.length === 2 && _t === "16:9" && (p = "32:9", is("32:9"));
      const w = qn.find((X) => X.id === p) || qn[0], $ = Ys(hn, w.w, w.h);
      $.length > 0 && (ue($), ot("auto-grid"));
    }
  }, [hn, B, ue, _t]);
  const Qe = u.useRef("");
  u.useEffect(() => {
    const p = (t || []).map((w) => w.id).sort().join(",");
    if (Qe.current === "") {
      Qe.current = p;
      return;
    }
    if (Qe.current !== p && (Qe.current = p, t && t.length > 0)) {
      const w = new Set(t.map(($) => $.id));
      if (xt === "auto-grid" || !lt.current) {
        let $ = _t;
        hn.length === 2 && _t === "16:9" && ($ = "32:9", is("32:9"));
        const X = qn.find((P) => P.id === $) || qn[0], Y = Ys(hn, X.w, X.h);
        Y.length > 0 && ue(Y);
      } else if (B && B.length > 0) {
        const $ = B.filter((X) => w.has(X.stationId));
        if ($.length !== B.length)
          if ($.length === 0) {
            const X = Ys(hn, Te, Re);
            ue(X);
          } else
            ue($);
      }
    }
  }, [t, hn, xt, _t, B, ue, Te, Re]), u.useEffect(() => {
    W && W({
      width: Te,
      height: Re,
      backgroundColor: "#070A10",
      fps: 30,
      placements: B,
      timeline: rn
    });
  }, [B, rn, W, Te, Re]);
  const He = u.useCallback((p) => {
    const w = Ss, $ = qn.find((X) => X.id === p) || qn[0];
    if (w.id !== $.id)
      if (is($.id), lt.current) {
        const X = $.w / w.w, Y = $.h / w.h, P = B.map((ie) => ({
          ...ie,
          x: Math.round(ie.x * X),
          y: Math.round(ie.y * Y),
          width: Math.round(ie.width * X),
          height: Math.round(ie.height * Y)
        }));
        ue(P);
      } else {
        const X = hn.length > 0 ? hn : B && B.length > 0 ? B : sn, Y = Ys(X, $.w, $.h);
        ue(Y);
      }
  }, [Ss, B, sn, ue]), Je = u.useCallback((p) => {
    const w = B.length > 0 ? Math.max(...B.map((fe) => fe.zIndex || 0)) + 1 : 0, $ = pt[B.length % pt.length], X = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 16 / 9), Y = X >= 1 ? 640 : Math.round(360 * X), P = X >= 1 ? Math.round(640 / X) : 360, ie = {
      stationId: p.stationId,
      displayId: p.displayId,
      label: p.label,
      x: 100 + B.length * 40 % 800,
      y: 80 + B.length * 40 % 500,
      width: Y,
      height: P,
      sourceWidth: p.sourceWidth || 1920,
      sourceHeight: p.sourceHeight || 1080,
      nativeAspectRatio: X,
      aspectRatio: X,
      zIndex: w,
      rotation: 0,
      borderWidth: 2,
      borderColor: $,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ce = [...B, ie];
    ue(Ce), Nt(Ce.length - 1);
  }, [B, ue]), yt = u.useCallback((p) => {
    const w = B.filter(($, X) => X !== p);
    ue(w), Nt(($) => Math.max(0, $ - 1));
  }, [B, ue]), dt = u.useCallback(() => {
    ue([]), Nt(-1);
  }, [ue]), Tt = (p) => {
    const w = p.map((X, Y) => ({ p: X, origIdx: Y }));
    w.sort((X, Y) => (X.p.zIndex ?? X.origIdx) - (Y.p.zIndex ?? Y.origIdx));
    const $ = [...p];
    return w.forEach(({ origIdx: X }, Y) => {
      $[X] = { ...$[X], zIndex: Y + 1 };
    }), $;
  };
  u.useCallback((p = Ke) => {
    if (p < 0 || !B[p]) return;
    const w = Tt(B), $ = w[p].zIndex, X = w.length;
    if ($ >= X) return;
    const Y = w.map((P, ie) => ie === p ? { ...P, zIndex: X } : P.zIndex > $ ? { ...P, zIndex: P.zIndex - 1 } : P);
    ue(Y);
  }, [Ke, B, ue]), u.useCallback((p = Ke) => {
    if (p < 0 || !B[p]) return;
    const w = Tt(B), $ = w[p].zIndex;
    if ($ <= 1) return;
    const X = w.map((Y, P) => P === p ? { ...Y, zIndex: 1 } : Y.zIndex < $ ? { ...Y, zIndex: Y.zIndex + 1 } : Y);
    ue(X);
  }, [Ke, B, ue]);
  const xs = u.useCallback((p = Ke) => {
    if (p < 0 || !B[p]) return;
    const w = Tt(B), $ = w[p].zIndex, X = $ + 1;
    if (X > w.length) return;
    const Y = w.map((P, ie) => ie === p ? { ...P, zIndex: X } : P.zIndex === X ? { ...P, zIndex: $ } : P);
    ue(Y);
  }, [Ke, B, ue]), Jt = u.useCallback((p = Ke) => {
    if (p < 0 || !B[p]) return;
    const w = Tt(B), $ = w[p].zIndex, X = $ - 1;
    if (X < 1) return;
    const Y = w.map((P, ie) => ie === p ? { ...P, zIndex: X } : P.zIndex === X ? { ...P, zIndex: $ } : P);
    ue(Y);
  }, [Ke, B, ue]), fn = u.useCallback((p) => {
    if (Ke < 0 || !B[Ke]) return;
    const w = B.map(($, X) => X === Ke ? { ...$, ...p } : $);
    ue(w);
  }, [Ke, B, ue]), bs = u.useCallback((p = 90) => {
    const w = B[Ke];
    if (!w) return;
    const X = ((w.rotation || 0) + p) % 360;
    fn({ rotation: X });
  }, [Ke, B, fn]), wl = u.useCallback((p = Ke) => {
    if (p < 0 || !B[p]) return;
    const w = B.length, $ = B.map((X, Y) => Y === p ? {
      ...X,
      x: 0,
      y: 0,
      width: Te,
      height: Re,
      zIndex: w
    } : X);
    ue($);
  }, [Ke, B, ue, Te, Re]), ys = u.useCallback((p) => {
    let w = [];
    const $ = hn.length > 0 ? hn : sn.length > 0 ? sn : B;
    switch (p) {
      case "auto":
      case "auto-grid":
        w = Ys($, Te, Re);
        break;
      case "1x1":
        $.length > 0 && (w = [{
          ...$[0],
          x: 0,
          y: 0,
          width: Te,
          height: Re,
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
          const X = Math.round(Te / 2);
          w = $.slice(0, 2).map((Y, P) => {
            const ie = Y.nativeAspectRatio || (Y.sourceWidth && Y.sourceHeight ? Y.sourceWidth / Y.sourceHeight : 1.7777777777777777), { x: Ce, y: fe, width: ve, height: it } = Zs(P * X, 0, X, Re, ie);
            return {
              ...Y,
              x: Ce,
              y: fe,
              width: ve,
              height: it,
              sourceWidth: Y.sourceWidth || 1920,
              sourceHeight: Y.sourceHeight || 1080,
              nativeAspectRatio: ie,
              aspectRatio: ie,
              zIndex: P + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: pt[P % pt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          w = Ys($, Te, Re);
        break;
      case "2x2": {
        const X = Math.round(Te / 2), Y = Math.round(Re / 2);
        w = $.slice(0, 4).map((P, ie) => ({
          ...P,
          x: ie % 2 * X,
          y: Math.floor(ie / 2) * Y,
          width: X,
          height: Y,
          zIndex: ie,
          rotation: 0,
          borderWidth: 2,
          borderColor: pt[ie % pt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if ($.length >= 2) {
          w = [
            { ...$[0], x: 0, y: 0, width: Te, height: Re, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: pt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const X = $.slice(1, 4), Y = Math.round(Te * 0.23), P = Math.round(Y / (16 / 9));
          X.forEach((ie, Ce) => {
            w.push({
              ...ie,
              x: Te - Y - 24,
              y: 24 + Ce * (P + 16),
              width: Y,
              height: P,
              zIndex: 10 + Ce,
              rotation: 0,
              borderWidth: 3,
              borderColor: pt[(Ce + 1) % pt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if ($.length >= 3) {
          const X = Math.round(Te * 0.666), Y = Te - X, P = Math.round(Re / 2);
          w = [
            { ...$[0], x: 0, y: 0, width: X, height: Re, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...$[1], x: X, y: 0, width: Y, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...$[2], x: X, y: P, width: Y, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if ($.length >= 3)
          if (Te / Re >= 2.5) {
            const Y = Math.round(Te / 3);
            w = $.slice(0, 3).map((P, ie) => {
              const Ce = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 1.7777777777777777), { x: fe, y: ve, width: it, height: tt } = Zs(ie * Y, 0, Y, Re, Ce);
              return {
                ...P,
                x: fe,
                y: ve,
                width: it,
                height: tt,
                sourceWidth: P.sourceWidth || 1920,
                sourceHeight: P.sourceHeight || 1080,
                nativeAspectRatio: Ce,
                aspectRatio: Ce,
                zIndex: ie,
                rotation: 0,
                borderWidth: 2,
                borderColor: pt[ie % pt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const Y = Math.round(Te / 2), P = Math.round(Re / 2);
            w = [
              { ...$[0], x: 0, y: 0, width: Y, height: P, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: pt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...$[1], x: Y, y: 0, width: Y, height: P, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: pt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...$[2], x: Math.round(Y / 2), y: P, width: Y, height: P, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: pt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    w.length > 0 && (ue(w), Nt(0), p === "auto" || p === "auto-grid" ? ot("auto-grid") : (ot(p), lt.current = !0));
  }, [sn, B, ue, Te, Re]), Pr = u.useCallback(() => {
    const p = Ae.trim() || `Custom Layout ${Pe.length + 1}`, $ = [{
      id: `preset-${Date.now()}`,
      name: p,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(B)),
      keyframes: JSON.parse(JSON.stringify(xn))
    }, ...Pe];
    Ve($), $e(""), ee(!1);
  }, [Ae, Pe, B, xn]), Ep = u.useCallback((p) => {
    !p || !p.placements || (ue(p.placements), Nt(0), ot("custom"), lt.current = !0, Me(!1));
  }, [ue]), Cp = u.useCallback((p, w) => {
    w == null || w.stopPropagation();
    const $ = Pe.filter((X) => X.id !== p);
    Ve($);
  }, [Pe]), Sp = u.useCallback(() => {
    const p = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Te,
      height: Re,
      aspectRatio: _t,
      placements: B,
      timeline: rn
    }, w = JSON.stringify(p, null, 2), $ = new window.Blob([w], { type: "application/json" }), X = window.URL.createObjectURL($), Y = document.createElement("a"), P = /* @__PURE__ */ new Date(), ie = (fe) => String(fe).padStart(2, "0"), Ce = `${P.getFullYear()}${ie(P.getMonth() + 1)}${ie(P.getDate())}_${ie(P.getHours())}${ie(P.getMinutes())}${ie(P.getSeconds())}`;
    Y.href = X, Y.download = `canvas_layout_${Ce}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), window.URL.revokeObjectURL(X);
  }, [B, rn, Te, Re, _t]), bp = u.useCallback((p) => {
    var X;
    const w = (X = p.target.files) == null ? void 0 : X[0];
    if (!w) return;
    const $ = new window.FileReader();
    $.onload = (Y) => {
      var P, ie, Ce;
      try {
        const fe = JSON.parse(Y.target.result);
        if (fe.width && fe.height) {
          const it = qn.find((tt) => tt.w === fe.width && tt.h === fe.height);
          it && is(it.id);
        } else if (fe.aspectRatio) {
          const it = qn.find((tt) => tt.id === fe.aspectRatio);
          it && is(it.id);
        }
        let ve = null;
        Array.isArray(fe) ? ve = fe : fe.placements && Array.isArray(fe.placements) ? ve = fe.placements : (P = fe.layout) != null && P.placements && Array.isArray(fe.layout.placements) && (ve = fe.layout.placements), ve && ve.length > 0 && (ue(ve), Nt(0), ot("custom"), lt.current = !0), ((Ce = (ie = fe.timeline) == null ? void 0 : ie.keyframes) == null ? void 0 : Ce.length) > 0 && (tn(fe.timeline), I && I(fe.timeline));
      } catch (fe) {
        console.error("Failed to parse imported canvas JSON:", fe), alert(`Canvas Import Error: ${fe.message}`);
      }
    }, $.readAsText(w), p.target.value = "";
  }, [ue, I]), Hi = (p, w) => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), Nt(w), lt.current = !0, ot("custom");
    const $ = Fe(), X = Ze.current || ct.current;
    if (!X) return;
    const Y = X.getBoundingClientRect(), P = B[w];
    if (!P) return;
    Gt.current = ke("Move Feed"), Ye.current = {
      mode: "drag",
      index: w,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      scaleX: Te / Y.width,
      scaleY: Re / Y.height,
      activeSnapZone: null
    }, Dn(!0);
    const ie = (fe) => {
      if (!Ye.current || Ye.current.mode !== "drag") return;
      const ve = Ye.current, it = Ze.current || ct.current;
      if (!it) return;
      const tt = it.getBoundingClientRect(), nt = (fe.clientX - ve.startX) * ve.scaleX, ge = (fe.clientY - ve.startY) * ve.scaleY;
      let st = Math.round(ve.initialX + nt), bt = Math.round(ve.initialY + ge);
      st = zt(st, 0, Te - ve.initialW), bt = zt(bt, 0, Re - ve.initialH);
      const ht = me && !fe.altKey;
      let ft = null, Mn = null, Hn = null;
      if (ht) {
        const Rt = fe.clientX - tt.left, St = fe.clientY - tt.top, Mt = 32, Oe = Math.round(Te / 2), at = Math.round(Re / 2);
        if (Rt <= Mt ? St <= tt.height * 0.22 ? ft = { x: 0, y: 0, width: Oe, height: at, label: "◰ Top-Left Quarter" } : St >= tt.height * 0.78 ? ft = { x: 0, y: at, width: Oe, height: at, label: "◱ Bottom-Left Quarter" } : ft = { x: 0, y: 0, width: Oe, height: Re, label: "◧ Left Half (50%)" } : Rt >= tt.width - Mt ? St <= tt.height * 0.22 ? ft = { x: Oe, y: 0, width: Oe, height: at, label: "◲ Top-Right Quarter" } : St >= tt.height * 0.78 ? ft = { x: Oe, y: at, width: Oe, height: at, label: "◳ Bottom-Right Quarter" } : ft = { x: Oe, y: 0, width: Oe, height: Re, label: "◨ Right Half (50%)" } : St <= Mt && Rt >= tt.width * 0.25 && Rt <= tt.width * 0.75 && (ft = { x: 0, y: 0, width: Te, height: Re, label: "🗖 Full Canvas Maximize" }), !ft) {
          const xr = B.filter((et, yr) => yr !== ve.index), Ks = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Te, targetX: Te - ve.initialW, guide: 100 },
            { snapTo: Oe, targetX: Oe - Math.round(ve.initialW / 2), guide: 50 }
          ];
          xr.forEach((et) => {
            Ks.push({ snapTo: et.x, targetX: et.x, guide: et.x / Te * 100 }), Ks.push({ snapTo: et.x + et.width, targetX: et.x + et.width - ve.initialW, guide: (et.x + et.width) / Te * 100 }), Ks.push({ snapTo: et.x + et.width, targetX: et.x + et.width, guide: (et.x + et.width) / Te * 100 }), Ks.push({ snapTo: et.x, targetX: et.x - ve.initialW, guide: et.x / Te * 100 });
          });
          let Eu = 18;
          Ks.forEach((et) => {
            const yr = Math.abs(st - et.targetX);
            yr < Eu && (Eu = yr, st = et.targetX, Mn = et.guide);
          });
          const jl = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Re, targetY: Re - ve.initialH, guide: 100 },
            { snapTo: at, targetY: at - Math.round(ve.initialH / 2), guide: 50 }
          ];
          xr.forEach((et) => {
            jl.push({ snapTo: et.y, targetY: et.y, guide: et.y / Re * 100 }), jl.push({ snapTo: et.y + et.height, targetY: et.y + et.height - ve.initialH, guide: (et.y + et.height) / Re * 100 }), jl.push({ snapTo: et.y + et.height, targetY: et.y + et.height, guide: (et.y + et.height) / Re * 100 }), jl.push({ snapTo: et.y, targetY: et.y - ve.initialH, guide: et.y / Re * 100 });
          });
          let Cu = 18;
          jl.forEach((et) => {
            const yr = Math.abs(bt - et.targetY);
            yr < Cu && (Cu = yr, bt = et.targetY, Hn = et.guide);
          });
        }
      }
      ve.activeSnapZone = ft, ve.latestX = st, ve.latestY = bt, Le(ft), ut({ vertical: Mn, horizontal: Hn }), tn((Rt) => {
        const St = [...Rt.keyframes || []], Mt = $ < St.length ? $ : L;
        if (!St[Mt]) return Rt;
        const Oe = [...St[Mt].layout.placements || []];
        return Oe[ve.index] ? (Oe[ve.index] = { ...Oe[ve.index], x: st, y: bt }, St[Mt] = {
          ...St[Mt],
          layout: { ...St[Mt].layout, placements: Oe }
        }, { ...Rt, keyframes: St }) : Rt;
      });
    }, Ce = () => {
      var fe;
      if (Dn(!1), ut({ vertical: null, horizontal: null }), (fe = Ye.current) != null && fe.activeSnapZone) {
        const ve = Ye.current.activeSnapZone, it = Ye.current.index;
        tn((tt) => {
          const nt = [...tt.keyframes || []], ge = $ < nt.length ? $ : L;
          if (!nt[ge]) return tt;
          const st = [...nt[ge].layout.placements || []];
          return st[it] ? (st[it] = {
            ...st[it],
            x: ve.x,
            y: ve.y,
            width: ve.width,
            height: ve.height
          }, nt[ge] = {
            ...nt[ge],
            layout: { ...nt[ge].layout, placements: st }
          }, { ...tt, keyframes: nt }) : tt;
        });
      }
      if (Ye.current) {
        const ve = Ye.current, it = ve.initialX, tt = ve.initialY, nt = ve.activeSnapZone ? ve.activeSnapZone.x : ve.latestX ?? it, ge = ve.activeSnapZone ? ve.activeSnapZone.y : ve.latestY ?? tt;
        nt !== it || ge !== tt ? (je(), I && tn((st) => (I(st), st))) : Gt.current = null;
      }
      Le(null), Ye.current = null, window.removeEventListener("mousemove", ie), window.removeEventListener("mouseup", Ce);
    };
    window.addEventListener("mousemove", ie), window.addEventListener("mouseup", Ce);
  }, vo = (p, w, $ = "br") => {
    if (p.button !== 0) return;
    p.stopPropagation(), p.preventDefault(), Nt(w), lt.current = !0, ot("custom");
    const X = Fe();
    if (!ct.current) return;
    const Y = ct.current.getBoundingClientRect(), P = B[w];
    if (!P) return;
    Gt.current = ke("Resize Feed");
    const ie = sn.find((nt) => nt.stationId === P.stationId && nt.displayId === P.displayId), Ce = P.sourceWidth || (ie == null ? void 0 : ie.sourceWidth) || 1920, fe = P.sourceHeight || (ie == null ? void 0 : ie.sourceHeight) || 1080, ve = P.nativeAspectRatio || P.aspectRatio || (ie == null ? void 0 : ie.nativeAspectRatio) || Ce / fe || P.width / P.height || 16 / 9;
    Ye.current = {
      mode: "resize",
      corner: $,
      index: w,
      startX: p.clientX,
      startY: p.clientY,
      initialX: P.x,
      initialY: P.y,
      initialW: P.width,
      initialH: P.height,
      sourceWidth: Ce,
      sourceHeight: fe,
      nativeAspectRatio: ve,
      scaleX: Te / Y.width,
      scaleY: Re / Y.height
    }, Ie(!0);
    const it = (nt) => {
      if (!Ye.current || Ye.current.mode !== "resize") return;
      const ge = Ye.current, st = (nt.clientX - ge.startX) * ge.scaleX, bt = (nt.clientY - ge.startY) * ge.scaleY, ht = nt.ctrlKey || nt.shiftKey || nt.metaKey, ft = ge.nativeAspectRatio > 0 ? ge.nativeAspectRatio : ge.initialW / ge.initialH;
      let Mn = ge.initialX, Hn = ge.initialY, Rt = ge.initialW, St = ge.initialH;
      if (ge.corner === "br") {
        const Mt = Te - ge.initialX, Oe = Re - ge.initialY;
        if (ht) {
          let at = Math.max(160, Math.min(Mt, Math.round(ge.initialW + st))), rt = Math.round(at / ft);
          rt > Oe && (rt = Oe, at = Math.round(rt * ft)), rt < 90 && (rt = 90, at = Math.round(rt * ft)), Rt = at, St = rt;
        } else
          Rt = zt(Math.round(ge.initialW + st), 160, Mt), St = zt(Math.round(ge.initialH + bt), 90, Oe);
      } else if (ge.corner === "bl") {
        const Mt = ge.initialX + ge.initialW, Oe = Re - ge.initialY;
        if (ht) {
          let at = Math.max(160, Math.min(Mt, Math.round(ge.initialW - st))), rt = Math.round(at / ft);
          rt > Oe && (rt = Oe, at = Math.round(rt * ft)), rt < 90 && (rt = 90, at = Math.round(rt * ft)), Rt = at, St = rt, Mn = ge.initialX + ge.initialW - Rt;
        } else
          Rt = zt(Math.round(ge.initialW - st), 160, Mt), St = zt(Math.round(ge.initialH + bt), 90, Oe), Mn = ge.initialX + ge.initialW - Rt;
      } else if (ge.corner === "tr") {
        const Mt = Te - ge.initialX, Oe = ge.initialY + ge.initialH;
        if (ht) {
          let at = Math.max(160, Math.min(Mt, Math.round(ge.initialW + st))), rt = Math.round(at / ft);
          rt > Oe && (rt = Oe, at = Math.round(rt * ft)), rt < 90 && (rt = 90, at = Math.round(rt * ft)), Rt = at, St = rt, Hn = ge.initialY + ge.initialH - St;
        } else
          Rt = zt(Math.round(ge.initialW + st), 160, Mt), St = zt(Math.round(ge.initialH - bt), 90, Oe), Hn = ge.initialY + ge.initialH - St;
      } else if (ge.corner === "tl") {
        const Mt = ge.initialX + ge.initialW, Oe = ge.initialY + ge.initialH;
        if (ht) {
          let at = Math.max(160, Math.min(Mt, Math.round(ge.initialW - st))), rt = Math.round(at / ft);
          rt > Oe && (rt = Oe, at = Math.round(rt * ft)), rt < 90 && (rt = 90, at = Math.round(rt * ft)), Rt = at, St = rt, Mn = ge.initialX + ge.initialW - Rt, Hn = ge.initialY + ge.initialH - St;
        } else
          Rt = zt(Math.round(ge.initialW - st), 160, Mt), St = zt(Math.round(ge.initialH - bt), 90, Oe), Mn = ge.initialX + ge.initialW - Rt, Hn = ge.initialY + ge.initialH - St;
      }
      tn((Mt) => {
        const Oe = [...Mt.keyframes || []], at = X < Oe.length ? X : L;
        if (!Oe[at]) return Mt;
        const rt = [...Oe[at].layout.placements || []];
        return rt[ge.index] ? (rt[ge.index] = {
          ...rt[ge.index],
          x: Mn,
          y: Hn,
          width: Rt,
          height: St,
          sourceWidth: ge.sourceWidth,
          sourceHeight: ge.sourceHeight,
          nativeAspectRatio: ge.nativeAspectRatio,
          aspectRatio: ge.nativeAspectRatio
        }, Oe[at] = {
          ...Oe[at],
          layout: { ...Oe[at].layout, placements: rt }
        }, { ...Mt, keyframes: Oe }) : Mt;
      });
    }, tt = () => {
      if (Ye.current) {
        const nt = Ye.current, ge = nt.latestW ?? nt.initialW, st = nt.latestH ?? nt.initialH;
        ge !== nt.initialW || st !== nt.initialH ? (je(), I && tn((bt) => (I(bt), bt))) : Gt.current = null;
      }
      Ie(!1), Ye.current = null, window.removeEventListener("mousemove", it), window.removeEventListener("mouseup", tt);
    };
    window.addEventListener("mousemove", it), window.addEventListener("mouseup", tt);
  }, Mp = u.useCallback((p) => {
    const w = B[p];
    if (!w) return;
    const $ = sn.find((Ce) => Ce.stationId === w.stationId && Ce.displayId === w.displayId), X = w.nativeAspectRatio || w.aspectRatio || ($ == null ? void 0 : $.nativeAspectRatio) || (w.sourceWidth && w.sourceHeight ? w.sourceWidth / w.sourceHeight : 16 / 9);
    let Y = w.width, P = Math.round(Y / X);
    w.y + P > Re && (P = Re - w.y, Y = Math.round(P * X)), w.x + Y > Te && (Y = Te - w.x, P = Math.round(Y / X));
    const ie = B.map((Ce, fe) => fe === p ? {
      ...Ce,
      width: Math.max(160, Y),
      height: Math.max(90, P),
      sourceWidth: w.sourceWidth || ($ == null ? void 0 : $.sourceWidth) || 1920,
      sourceHeight: w.sourceHeight || ($ == null ? void 0 : $.sourceHeight) || 1080,
      nativeAspectRatio: X,
      aspectRatio: X
    } : Ce);
    ue(ie, "Snap Native Aspect");
  }, [B, sn, ue]), Ki = u.useCallback(() => {
    if (Lt.current.length === 0) return;
    const p = ke("Redo State");
    Xt.current.push(p), Xt.current.length > 50 && Xt.current.shift();
    const w = Lt.current.pop();
    w && (tn(w.timeline), I && I(w.timeline), w.aspectId && w.aspectId !== _t && is(w.aspectId), w.presetId && ot(w.presetId), w.selectedFeedIndex !== void 0 && Nt(w.selectedFeedIndex), lt.current = !0, Zn(($) => $ + 1), en(`Undo: ${w.label || "Previous State"}`, "undo", "↺"));
  }, [ke, I, _t, en]), Vi = u.useCallback(() => {
    if (Xt.current.length === 0) return;
    const p = ke("Undo State");
    Lt.current.push(p), Lt.current.length > 50 && Lt.current.shift();
    const w = Xt.current.pop();
    w && (tn(w.timeline), I && I(w.timeline), w.aspectId && w.aspectId !== _t && is(w.aspectId), w.presetId && ot(w.presetId), w.selectedFeedIndex !== void 0 && Nt(w.selectedFeedIndex), lt.current = !0, Zn(($) => $ + 1), en(`Redo: ${w.label || "Restored State"}`, "info", "↻"));
  }, [ke, I, _t, en]), Nu = u.useCallback(() => {
    const w = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(B)),
      keyframes: JSON.parse(JSON.stringify(xn)),
      aspectId: _t,
      width: Te,
      height: Re
    }, ...Pe.filter(($) => $.id !== "preset-quicksave")];
    Ve(w);
    try {
      hp({
        canvasLayoutTimeline: rn,
        selectedAspectId: _t,
        selectedPresetId: xt,
        isFullWidth: Qt
      });
    } catch ($) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", $);
    }
    en(`State Saved (${Te}×${Re} • ${B.length} Feeds)`, "success", "💾");
  }, [B, xn, _t, Te, Re, Pe, Ve, rn, xt, Qt, en]);
  u.useEffect(() => {
    const p = () => Ki(), w = () => Vi(), $ = () => Nu();
    return window.addEventListener("itb:studio-undo", p), window.addEventListener("itb:studio-redo", w), window.addEventListener("itb:studio-save-now", $), () => {
      window.removeEventListener("itb:studio-undo", p), window.removeEventListener("itb:studio-redo", w), window.removeEventListener("itb:studio-save-now", $);
    };
  }, [Ki, Vi, Nu]);
  const Ip = u.useCallback(() => {
    vt((p) => {
      const w = !p;
      if (w) {
        r && r(null);
        const $ = ze.current;
        $ && $.requestFullscreen && $.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return w;
    });
  }, [r]), Tp = u.useCallback(() => {
    const p = f > 0 ? f : h + y, { nextTimeline: w, newIndex: $, isNew: X } = Fd(
      rn,
      p,
      (ce == null ? void 0 : ce.layout) || {
        width: Te,
        height: Re,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(B))
      }
    );
    X ? (Ee("Add Keyframe"), tn(w), I && I(w), _ && _($), en(`Keyframe #${$ + 1} created at ${kt(p, x, { includeSeconds: !0 })}`, "success", "💎")) : (_ && _($), en(`Jumped to existing Keyframe #${$ + 1}`, "info", "💎"));
  }, [f, h, y, ce, B, Te, Re, rn, I, _, x, en, Ee]);
  u.useCallback(() => {
    if (xn.length <= 1 || L === 0) {
      en("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Ee("Delete Keyframe");
    const { nextTimeline: p, success: w, newIndex: $ } = bg(rn, L);
    w && (tn(p), I && I(p), _ && _($), en("Keyframe deleted", "info", "🗑️"));
  }, [xn, L, rn, I, _, en, Ee]), u.useCallback((p) => {
    L !== 0 && (Ee("Update Transition Type"), tn((w) => {
      const $ = kc(w, L, { transitionType: p });
      return I && I($), $;
    }));
  }, [L, I, Ee]), u.useCallback((p) => {
    L !== 0 && (Ee("Update Transition Duration"), tn((w) => {
      const $ = kc(w, L, { transitionDurationSec: p });
      return I && I($), $;
    }));
  }, [L, I, Ee]), u.useEffect(() => {
    const p = (w) => {
      if (!(w.target.tagName === "INPUT" || w.target.tagName === "TEXTAREA" || w.target.isContentEditable)) {
        if (w.key === "Delete" || w.key === "Backspace") {
          Ke >= 0 && B[Ke] && (w.preventDefault(), yt(Ke));
          return;
        }
        if ((w.code === "Space" || w.key === " ") && C) {
          w.preventDefault(), C(($) => !$);
          return;
        }
        if ((w.key === "k" || w.key === "K") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), Tp();
          return;
        }
        if (w.key === "Escape") {
          se(!1), Me(!1), At(!1), On(!1), qt(!1), ee(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(w.key)) {
          if (Ke >= 0 && B[Ke]) {
            w.preventDefault(), lt.current = !0, ot("custom");
            const $ = w.shiftKey ? 1 : 10;
            let X = 0, Y = 0;
            w.key === "ArrowLeft" && (X = -$), w.key === "ArrowRight" && (X = $), w.key === "ArrowUp" && (Y = -$), w.key === "ArrowDown" && (Y = $);
            const P = B[Ke], ie = zt(P.x + X, 0, Te - P.width), Ce = zt(P.y + Y, 0, Re - P.height), fe = B.map((ve, it) => it === Ke ? { ...ve, x: ie, y: Ce } : ve);
            ue(fe);
          }
          return;
        }
        if ((w.key === "r" || w.key === "R") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), q(($) => !$);
          return;
        }
        if ((w.key === "s" || w.key === "S") && !w.ctrlKey && !w.metaKey && !w.altKey) {
          w.preventDefault(), J(($) => !$);
          return;
        }
      }
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [Ke, B, yt, ue, q, J]);
  const ku = u.useMemo(() => Cg({
    keyframes: xn,
    currentEpochMs: F,
    currentPlacements: B,
    isEditing: un || be
  }), [un, be, xn, F, B]), Ap = u.useMemo(() => ku.map((p, w) => ({ ...p, originalIndex: w })).sort((p, w) => (p.zIndex ?? p.originalIndex) - (w.zIndex ?? w.originalIndex)), [ku]), zs = B[Ke] || null, { filteredPlaced: Hs, filteredUnplaced: No } = u.useMemo(() => {
    const p = (ae || "").toLowerCase(), w = B.map((P, ie) => {
      const Ce = P.zIndex ?? ie + 1, fe = sn.find((ve) => ve.stationId === P.stationId && ve.displayId === P.displayId);
      return {
        type: "placed",
        origIdx: ie,
        placement: P,
        feed: fe,
        stationId: P.stationId,
        displayId: P.displayId,
        label: P.label || (fe == null ? void 0 : fe.label) || `${P.stationId} (${P.displayId})`,
        layerRank: Ce,
        isSelected: ie === Ke,
        sourceWidth: P.sourceWidth || (fe == null ? void 0 : fe.sourceWidth) || 1920,
        sourceHeight: P.sourceHeight || (fe == null ? void 0 : fe.sourceHeight) || 1080
      };
    });
    w.sort((P, ie) => ie.layerRank - P.layerRank);
    const $ = sn.filter((P) => !B.some((ie) => ie.stationId === P.stationId && ie.displayId === P.displayId)).map((P) => ({
      type: "unplaced",
      feed: P,
      stationId: P.stationId,
      displayId: P.displayId,
      label: P.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: P.sourceWidth || 1920,
      sourceHeight: P.sourceHeight || 1080
    })), X = p ? w.filter((P) => P.label.toLowerCase().includes(p)) : w, Y = p ? $.filter((P) => P.label.toLowerCase().includes(p)) : $;
    return { filteredPlaced: X, filteredUnplaced: Y };
  }, [B, sn, Ke, ae]), wu = u.useCallback((p, w) => {
    p.stopPropagation(), De(w), p.dataTransfer.effectAllowed = "copyMove", p.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: w.origIdx,
      type: w.type,
      stationId: w.stationId,
      displayId: w.displayId
    }));
  }, []), Rp = u.useCallback((p, w) => {
    p.preventDefault(), p.stopPropagation(), p.dataTransfer.dropEffect = "move";
    const $ = p.currentTarget.getBoundingClientRect(), X = $.top + $.height / 2, Y = p.clientY < X ? "above" : "below";
    Q((P) => P.index === w && P.position === Y ? P : { index: w, position: Y });
  }, []), $p = u.useCallback((p, w) => {
    p.stopPropagation(), Q(($) => $.index === w ? { index: null, position: null } : $);
  }, []), ju = u.useCallback(() => {
    De(null), Q({ index: null, position: null });
  }, []), Lp = u.useCallback((p, w) => {
    p.preventDefault(), p.stopPropagation();
    const $ = Se;
    Q({ index: null, position: null }), De(null);
    const X = p.dataTransfer.getData("text/plain");
    if (X)
      try {
        const Y = JSON.parse(X);
        if (Y.type === "placed") {
          const P = Y.origIdx, ie = Hs.findIndex((nt) => nt.origIdx === P);
          if (ie === -1) return;
          let Ce = w;
          if ($.position === "below" && (Ce += 1), ie < Ce && (Ce -= 1), ie === Ce) return;
          const fe = [...Hs], [ve] = fe.splice(ie, 1);
          fe.splice(Ce, 0, ve);
          const it = fe.length, tt = B.map((nt, ge) => {
            const st = fe.findIndex((bt) => bt.origIdx === ge);
            return st !== -1 ? {
              ...nt,
              zIndex: it - st
            } : nt;
          });
          ue(tt), Nt(ve.origIdx);
        } else if (Y.type === "unplaced") {
          const P = sn.find((ft) => ft.stationId === Y.stationId && ft.displayId === Y.displayId);
          if (!P) return;
          const ie = P.nativeAspectRatio || (P.sourceWidth && P.sourceHeight ? P.sourceWidth / P.sourceHeight : 16 / 9), Ce = ie >= 1 ? 640 : Math.round(360 * ie), fe = ie >= 1 ? Math.round(640 / ie) : 360, ve = pt[B.length % pt.length];
          let it = w;
          $.position === "below" && (it += 1);
          const tt = {
            stationId: P.stationId,
            displayId: P.displayId,
            label: P.label,
            x: 100 + B.length * 40 % 800,
            y: 80 + B.length * 40 % 500,
            width: Ce,
            height: fe,
            sourceWidth: P.sourceWidth || 1920,
            sourceHeight: P.sourceHeight || 1080,
            nativeAspectRatio: ie,
            aspectRatio: ie,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: ve,
            shadowEffect: "deep",
            borderRadius: 0
          }, nt = [...B, tt], ge = nt.length - 1, st = [...Hs];
          st.splice(it, 0, { origIdx: ge });
          const bt = st.length, ht = nt.map((ft, Mn) => {
            const Hn = st.findIndex((Rt) => Rt.origIdx === Mn);
            return {
              ...ft,
              zIndex: Hn !== -1 ? bt - Hn : 1
            };
          });
          ue(ht), Nt(ge);
        }
      } catch (Y) {
        console.warn("Failed to handle layer drag drop:", Y);
      }
  }, [Se, Hs, B, sn, ue]), Op = u.useCallback((p) => {
    p.preventDefault();
    const w = p.dataTransfer.getData("text/plain");
    if (!(!w || !ct.current))
      try {
        const $ = JSON.parse(w), X = ct.current.getBoundingClientRect(), Y = p.clientX - X.left, P = p.clientY - X.top, ie = zt(Math.round(Y / X.width * Te), 0, Te - 320), Ce = zt(Math.round(P / X.height * Re), 0, Re - 180);
        if ($.type === "unplaced") {
          const fe = sn.find((ve) => ve.stationId === $.stationId && ve.displayId === $.displayId);
          if (fe) {
            const ve = fe.nativeAspectRatio || (fe.sourceWidth && fe.sourceHeight ? fe.sourceWidth / fe.sourceHeight : 1.7777777777777777), it = ve >= 1 ? 640 : Math.round(360 * ve), tt = ve >= 1 ? Math.round(640 / ve) : 360, nt = B.length > 0 ? Math.max(...B.map((ht) => ht.zIndex || 0)) + 1 : 1, ge = pt[B.length % pt.length], st = {
              stationId: fe.stationId,
              displayId: fe.displayId,
              label: fe.label,
              x: zt(ie, 0, Te - it),
              y: zt(Ce, 0, Re - tt),
              width: it,
              height: tt,
              sourceWidth: fe.sourceWidth || 1920,
              sourceHeight: fe.sourceHeight || 1080,
              nativeAspectRatio: ve,
              aspectRatio: ve,
              zIndex: nt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ge,
              shadowEffect: "deep",
              borderRadius: 0
            }, bt = [...B, st];
            ue(bt), Nt(bt.length - 1);
          }
        } else if ($.type === "placed" && $.origIdx !== void 0) {
          const fe = B.map((ve, it) => it === $.origIdx ? {
            ...ve,
            x: zt(ie, 0, Te - ve.width),
            y: zt(Ce, 0, Re - ve.height)
          } : ve);
          ue(fe), Nt($.origIdx);
        }
      } catch ($) {
        console.warn("Canvas drop failed:", $);
      }
  }, [sn, B, ue, Te, Re]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: ze,
      className: `multicam-viewport-root canvas-grid ${xe ? "fullscreen-grid-active" : ""}`,
      children: [
        (un || be) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: un ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        Ot && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Ot.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Ot.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Ot.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: on, className: `canvas-stage-wrapper ${Qt ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          G && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  B.length,
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
                value: ae,
                onChange: (p) => we(p.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Hs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Hs.length })
                ] }),
                Hs.map((p, w) => {
                  const $ = _e && _e.type === "placed" && _e.origIdx === p.origIdx, Y = Se.index === w ? Se.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${p.isSelected ? "is-selected" : ""} ${$ ? "is-dragging-row" : ""} ${Y}`,
                      draggable: !0,
                      onDragStart: (P) => wu(P, p),
                      onDragOver: (P) => Rp(P, w),
                      onDragLeave: (P) => $p(P, w),
                      onDrop: (P) => Lp(P, w),
                      onDragEnd: ju,
                      onClick: () => Nt(p.origIdx),
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
                              onClick: () => xs(p.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Jt(p.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => yt(p.origIdx),
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
              No.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: No.length })
                ] }),
                No.map((p) => {
                  const w = _e && _e.type === "unplaced" && _e.stationId === p.stationId && _e.displayId === p.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${w ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: ($) => wu($, p),
                      onDragEnd: ju,
                      onClick: () => Je(p.feed),
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
                            onClick: () => Je(p.feed),
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
              Hs.length === 0 && No.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => ys("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: dt, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${G ? "active" : ""}`,
                  onClick: () => se((p) => !p),
                  title: `Feeds & Layers Palette (${B.length}/${sn.length} on canvas)`,
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
                    className: `btn-wing-tool ${z ? "active" : ""}`,
                    onClick: () => {
                      K((p) => !p), pe(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                z && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        ot("auto-grid"), ys("auto-grid"), K(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const p = new Set((t && t.length > 0 ? t : n).map((X) => X.id)), w = (B || []).filter((X) => p.has(X.stationId)), $ = (t && t.length > 0 ? t : n).filter((X) => !w.some((Y) => Y.stationId === X.id));
                          return w.length > 0 ? w.length + $.length : hn.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        ot("1x1"), ys("1x1"), K(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        ot("1x2"), ys("1x2"), K(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        ot("2x2"), ys("2x2"), K(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        ot("1+3-pip"), ys("1+3-pip"), K(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${xt === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        ot("hero-stacked"), ys("hero-stacked"), K(!1);
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
                    className: `btn-wing-tool ${de ? "active" : ""}`,
                    onClick: () => {
                      pe((p) => !p), K(!1);
                    },
                    title: `Aspect Ratio: ${_t} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: _t })
                    ]
                  }
                ),
                de && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  qn.map((p) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${_t === p.id ? "active" : ""}`,
                      onClick: () => {
                        He(p.id), pe(!1);
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
                  className: `btn-wing-tool ${Qt ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: dn,
                  title: Qt ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Qt ? "↔" : "⊞" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Qt ? "100%" : "FIT" })
                  ]
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${me ? "active" : ""}`,
                  onClick: () => J((p) => !p),
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
                  onClick: () => q((p) => !p),
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
                  onClick: Ki,
                  disabled: Lt.current.length === 0,
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
                  disabled: Xt.current.length === 0,
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
                  ct.current = p, Ze.current = p;
                },
                className: `canvas-master-frame-16-9 ${Qt ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: $t.width > 180 ? `${$t.width}px` : "100%",
                  height: $t.height > 100 ? `${$t.height}px` : "auto",
                  aspectRatio: `${Te} / ${Re}`
                },
                onMouseMove: yo,
                onMouseLeave: zi,
                onDragOver: (p) => {
                  p.preventDefault(), p.dataTransfer.dropEffect = "copy";
                },
                onDrop: Op,
                onClick: () => gt(!1),
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                  /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                  Ne && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-ghost-preview",
                      style: {
                        position: "absolute",
                        left: `${Ne.x / Te * 100}%`,
                        top: `${Ne.y / Re * 100}%`,
                        width: `${Ne.width / Te * 100}%`,
                        height: `${Ne.height / Re * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Ne.label })
                      ] })
                    }
                  ),
                  Ct && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Te}×${Re}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Ge.isInside ? `${Ge.x},${Ge.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Te} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          zs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: zs.x,
                              y: "0",
                              width: zs.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          kn.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "0", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: p.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: p.val })
                          ] }, `rx-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "8", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: p.val, y1: "13", x2: p.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${p.val}`)),
                          Ge.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: Ge.x,
                              y1: "0",
                              x2: Ge.x,
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
                          zs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: zs.y,
                              width: "20",
                              height: zs.height,
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          Dr.map((p) => p.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: p.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: p.val })
                          ] }, `ry-${p.val}`) : p.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${p.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: p.val, x2: "18", y2: p.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${p.val}`)),
                          Ge.isInside && /* @__PURE__ */ s.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: Ge.y,
                              x2: "20",
                              y2: Ge.y,
                              stroke: "#06B6D4",
                              strokeWidth: "2"
                            }
                          )
                        ]
                      }
                    ) })
                  ] }),
                  Xe.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${Xe.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  Xe.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${Xe.horizontal}%`,
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
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => se(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => ys("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Ap.map((p) => {
                    var Mt;
                    const w = p.originalIndex, $ = Ke === w, X = un && Ke === w, Y = be && Ke === w, P = (n.length > 0 ? n : t).find(
                      (Oe) => {
                        var at, rt, xr, Ks;
                        return Oe.id === p.stationId || ((at = Oe.hostname) == null ? void 0 : at.toLowerCase()) === ((rt = p.stationId) == null ? void 0 : rt.toLowerCase()) || ((xr = Oe.id) == null ? void 0 : xr.toLowerCase()) === ((Ks = p.stationId) == null ? void 0 : Ks.toLowerCase());
                      }
                    ), ie = sn.find((Oe) => Oe.stationId === p.stationId && Oe.displayId === p.displayId), Ce = P || {
                      id: p.stationId,
                      hostname: (ie == null ? void 0 : ie.stationHostname) || p.stationHostname || p.stationId,
                      displayName: (ie == null ? void 0 : ie.stationName) || p.label || p.stationId,
                      displays: ie ? [{ displayId: ie.displayId, width: ie.sourceWidth, height: ie.sourceHeight }] : []
                    }, fe = (Ce == null ? void 0 : Ce.displays) || ((Mt = Ce == null ? void 0 : Ce.topology) == null ? void 0 : Mt.displays) || [], ve = B.filter(
                      (Oe) => Oe.stationId === p.stationId || Ce && (Oe.stationId === Ce.id || Oe.stationId === Ce.hostname)
                    ), it = fe.length > 1 && ve.length >= fe.length, tt = p.borderColor || pt[w % pt.length], nt = p.borderWidth !== void 0 ? p.borderWidth : 2, ge = p.rotation || 0, st = p.shadowEffect || "deep", bt = p.borderRadius || 0, ht = p.x / Te * 100, ft = p.y / Re * 100, Mn = p.width / Te * 100, Hn = p.height / Re * 100, Rt = Tg(st, $, tt);
                    p.y < 50, p.x < 100, p.x + p.width > Te - 100;
                    const St = p.zIndex !== void 0 ? p.zIndex : w + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${$ ? "is-selected" : ""} ${X ? "is-dragging" : ""} ${Y ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${ht}%`,
                          top: `${ft}%`,
                          width: `${Mn}%`,
                          height: `${Hn}%`,
                          zIndex: St * 10 + (X ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${nt}px solid ${tt}`,
                          borderRadius: `${bt}px`,
                          boxShadow: Rt,
                          opacity: p.opacity !== void 0 ? p.opacity : 1,
                          pointerEvents: p.opacity !== void 0 && p.opacity < 0.1 ? "none" : "auto",
                          cursor: X ? "grabbing" : "grab",
                          transition: X || Y ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Oe) => Hi(Oe, w),
                        onContextMenu: (Oe) => {
                          Oe.preventDefault(), Oe.stopPropagation(), Nt(w), gt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Oe) => Hi(Oe, w),
                              onDoubleClick: () => wl(w),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: p.label || `${Ce.displayName || p.stationId} (${p.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(p.width),
                                  "×",
                                  Math.round(p.height),
                                  " (",
                                  Wr(p.width, p.height),
                                  ") @ (",
                                  Math.round(p.x),
                                  ",",
                                  Math.round(p.y),
                                  ")",
                                  ge !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    ge,
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
                                    className: `btn-badge-action-inspector ${$ && Sn ? "active" : ""}`,
                                    onClick: (Oe) => {
                                      Oe.stopPropagation(), Nt(w), gt((at) => !at || Ke !== w);
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
                                  transition: X ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  wg,
                                  {
                                    station: Ce,
                                    isSolo: !1,
                                    currentEpochMs: F,
                                    timeMode: x,
                                    isPlaying: v,
                                    setIsPlaying: C,
                                    baseEpochMs: h,
                                    totalDurationMs: M,
                                    outPointMs: k,
                                    setPlayheadMs: m,
                                    globalGaps: d,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: S,
                                    playbackSpeed: E,
                                    activeAudioStationId: ne,
                                    onSoloAudio: Z,
                                    directorPlan: g || (Ce == null ? void 0 : Ce.directorPlan),
                                    isAutoDirectorEnabled: a ? a[Ce.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: i,
                                    targetDisplayId: p.displayId,
                                    onSelectDisplayId: (Oe) => {
                                      const at = B.map((rt, xr) => xr === w ? { ...rt, displayId: Oe } : rt);
                                      ue(at);
                                    },
                                    areAllDisplaysPlaced: it,
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
                                onMouseDown: (Oe) => Hi(Oe, w),
                                onDoubleClick: () => wl(w),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          $ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Oe) => vo(Oe, w, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Wr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Oe) => vo(Oe, w, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Wr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Oe) => vo(Oe, w, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Wr(p.sourceWidth, p.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Oe) => vo(Oe, w, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Wr(p.sourceWidth, p.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${p.stationId}-${p.displayId}-${w}`
                    );
                  }),
                  !V && Sn && Ke !== null && zs && (() => {
                    const p = zs, w = Ke, $ = p.borderColor || pt[w % pt.length], X = p.borderWidth !== void 0 ? p.borderWidth : 2, Y = p.rotation || 0, P = p.shadowEffect || "deep", ie = p.zIndex !== void 0 ? p.zIndex : w + 1, Ce = p.x / Te * 100, fe = p.width / Te * 100, ve = Ce + fe / 2;
                    let it = `${ve}%`, tt = "translateX(-50%)";
                    ve < 28 ? (it = `${Math.max(1, Ce)}%`, tt = "none") : ve > 72 && (it = `${Math.min(99, Ce + fe)}%`, tt = "translateX(-100%)");
                    const nt = p.y + p.height + 8;
                    let ge;
                    nt + 45 > Re ? ge = `${Math.max(20, (p.y + p.height - 44) / Re * 100)}%` : ge = `${nt / Re * 100}%`;
                    const st = (n.length > 0 ? n : t).find(
                      (ht) => {
                        var ft, Mn;
                        return ht.id === p.stationId || ((ft = ht.hostname) == null ? void 0 : ft.toLowerCase()) === ((Mn = p.stationId) == null ? void 0 : Mn.toLowerCase());
                      }
                    ), bt = st ? st.id : p.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: it,
                          top: ge,
                          transform: tt,
                          zIndex: 99999
                        },
                        onMouseDown: (ht) => ht.stopPropagation(),
                        onClick: (ht) => ht.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${p.label || bt} • Layer #${ie}`, children: [
                            "🎛️ #$",
                            ie
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => qt((ht) => !ht),
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
                            Ut && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Ig.map((ht) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${$ === ht ? "is-active" : ""}`,
                                style: { backgroundColor: ht === "transparent" ? "#1E293B" : ht },
                                onClick: () => {
                                  fn({ borderColor: ht }), qt(!1);
                                },
                                title: ht === "transparent" ? "No Border (Transparent)" : `Border Color: ${ht}`
                              },
                              ht
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => {
                                const ht = [0, 2, 4, 8], ft = ht[(ht.indexOf(X) + 1) % ht.length];
                                fn({ borderWidth: ft });
                              },
                              title: `Border Width: ${X}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                X,
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
                                const ht = ["none", "deep", "glow-cyan", "glow-emerald"], ft = ht[(ht.indexOf(P) + 1) % ht.length];
                                fn({ shadowEffect: ft });
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
                                onClick: () => xs(w),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Jt(w),
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
                              onClick: () => bs(90),
                              title: `Rotate: Step 90° clockwise (Current: ${Y}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Mp(w),
                              title: `Snap to Native Recorded Aspect (${Wr(p.sourceWidth, p.sourceHeight)})`,
                              children: "📐 NATIVE"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => wl(w),
                              title: "1x1 Focus Mode (Double-click window to toggle)",
                              children: "⛶ 1x1"
                            }
                          ),
                          l && /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => l(bt, p.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => yt(w),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Nt(null),
                              title: "Close Menu (Esc)",
                              children: "✕"
                            }
                          )
                        ]
                      }
                    );
                  })()
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => ee(!0),
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
                    className: `btn-wing-tool ${te ? "active" : ""}`,
                    onClick: () => Me((p) => !p),
                    title: `Saved Presets Library (${Pe.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Pe.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                te && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Me(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Pe.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Pe.map((p) => {
                    var w;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      Ep(p), Me(!1);
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
                          onClick: ($) => Cp(p.id, $),
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
                    var p;
                    return (p = he.current) == null ? void 0 : p.click();
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
                  ref: he,
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
                    lt.current = !1, ot("auto-grid");
                    const p = hn.length > 0 ? hn : sn, w = Ys(p, Te, Re), $ = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: h,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Te,
                            height: Re,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: w
                          }
                        }
                      ]
                    };
                    tn($), I && I($), Nt(0);
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
                  onClick: dt,
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
          " "
        ] }) }),
        " ",
        le && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ee(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (p) => p.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => ee(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: Ae,
                onChange: (p) => $e(p.target.value),
                autoFocus: !0,
                onKeyDown: (p) => {
                  p.key === "Enter" && Pr();
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => ee(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Pr, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const wa = [0.5, 1, 1.25, 1.5, 2, 4];
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
  totalDurationMs: h = 36e5,
  onStepFrameForward: y,
  onStepFrameBackward: f,
  playbackSpeed: x = 1,
  onChangeSpeed: v,
  onSetInPoint: C,
  onSetOutPoint: M
}) {
  const [D, k] = u.useState(() => cl()), { volume: m, isMuted: d } = D, S = !!(e || h > 0);
  u.useEffect(() => {
    const W = (re) => {
      re.detail && k(re.detail);
    };
    return window.addEventListener("itb-audio-state-changed", W), () => window.removeEventListener("itb-audio-state-changed", W);
  }, []);
  const E = u.useCallback((W, re, I) => {
    const R = {
      volume: typeof W == "number" ? W : m,
      isMuted: typeof re == "boolean" ? re : d,
      channelMode: I || D.channelMode || "both"
    };
    k(R), xg(R);
  }, [m, d, D.channelMode]), j = (W) => {
    W == null || W.stopPropagation(), S && n(!t);
  }, N = (W) => {
    if (W == null || W.stopPropagation(), !S || !v) return;
    const re = wa.indexOf(x), I = re === -1 ? 1 : (re + 1) % wa.length;
    v(wa[I]);
  }, T = (W) => {
    W == null || W.stopPropagation(), d ? E(m === 0 ? 0.5 : m, !1) : E(m, !0);
  }, g = (W) => {
    W.stopPropagation();
    const re = parseFloat(W.target.value);
    re === 0 ? E(0, !0) : E(re, !1);
  }, b = (W) => {
    const re = u.useRef(null), I = u.useRef(null), R = u.useRef(0), _ = u.useCallback(() => {
      re.current && clearTimeout(re.current), I.current && clearInterval(I.current), re.current = null, I.current = null;
    }, []), V = u.useCallback((ne = 1) => {
      if (n && n(!1), i) {
        const Z = 33 * ne;
        i((G) => {
          const se = W === "forward" ? G + Z : G - Z;
          return Math.max(0, Math.min(h, se));
        });
      } else W === "forward" && y ? y() : W === "backward" && f && f();
    }, [W]), F = u.useCallback((ne) => {
      ne.preventDefault(), ne.stopPropagation(), S && (_(), V(1), R.current = performance.now(), re.current = setTimeout(() => {
        I.current = setInterval(() => {
          const Z = performance.now() - R.current, G = Z > 2500 ? 4 : Z > 1e3 ? 2 : 1;
          V(G);
        }, 50);
      }, 280));
    }, [V, _]);
    return u.useEffect(() => _, [_]), {
      onMouseDown: F,
      onMouseUp: _,
      onMouseLeave: _,
      onTouchStart: F,
      onTouchEnd: _
    };
  }, O = b("backward"), U = b("forward"), A = (W) => {
    W.stopPropagation(), S && (n && n(!1), i && i(a));
  }, H = (W) => {
    W.stopPropagation(), S && (n && n(!1), i && i(c));
  }, oe = () => d || m === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
            onClick: (W) => {
              W.stopPropagation(), C == null || C();
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
              onClick: (W) => {
                W.stopPropagation(), l && l(!r);
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
              onClick: H,
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
            onClick: (W) => {
              W.stopPropagation(), M == null || M();
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
              className: `btn-audio-mute ${d || m === 0 ? "is-muted" : ""}`,
              onClick: T,
              title: d ? "Unmute" : `Mute (${Math.round(m * 100)}%)`,
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
              value: d ? 0 : m,
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
                const W = ["both", "mic", "sys", "stereo"], re = D.channelMode || "both", I = W[(W.indexOf(re) + 1) % W.length];
                E(m, d, I);
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
const qo = 2500, Rg = {
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
function $g(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Rg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function mp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map($g), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function gp(e, t = " + ") {
  return mp(e).join(t);
}
function Rl(e) {
  return gp(e, "+");
}
const Lg = 8;
function Og({
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
  const [y, f] = u.useState([]), [, x] = u.useState(!1), v = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((d) => ({
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
    if (!v.length || !l || a <= 0) {
      f([]);
      return;
    }
    const d = new AbortController(), S = Math.max(0, l + i - qo), E = l + i + a + qo;
    x(!0);
    const j = v.map((N) => {
      const T = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(N.hostname)}&startEpoch=${S}&endEpoch=${E}`;
      return fetch(T, { signal: d.signal }).then((g) => g.ok ? g.json() : []).then((g) => (Array.isArray(g) ? g : []).map((b) => ({
        ...b,
        stationId: N.id,
        stationName: N.name
      }))).catch((g) => {
        if (g.name !== "AbortError") return [];
        throw g;
      });
    });
    return Promise.all(j).then((N) => {
      const T = N.flat();
      f(T), x(!1);
    }).catch((N) => {
      N.name !== "AbortError" && (f([]), x(!1));
    }), () => d.abort();
  }, [v, l, i, a, r]);
  const C = r && Array.isArray(r) && r.length > 0 ? r : y, M = u.useMemo(() => {
    if (!C.length || a <= 0 || c <= 0)
      return [];
    const d = l + i, S = d + a, E = [...C].sort((g, b) => g.epochMs - b.epochMs), j = [];
    let N = null, T = -999;
    for (const g of E) {
      const b = g.epochMs + qo;
      if (b < d || b > S)
        continue;
      const O = b - l, U = (O - i) / a * c;
      if (N && U - T < Lg) {
        N.events.push(g), N.endOffsetMs = O, N.endEpochMs = b;
        const A = new Set(N.events.map((H) => H.stationName || "Workstation"));
        N.isMultiStation = A.size > 1, N.stationCount = A.size, T = U;
      } else {
        const A = (O - i) / a * 100;
        N = {
          id: `kc_${g.epochMs}_${j.length}`,
          startOffsetMs: O,
          endOffsetMs: O,
          startEpochMs: b,
          endEpochMs: b,
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
      return Rl(d.events[0].keyCombination);
    const S = d.events.find((N) => N.keyCombination.includes("+"));
    if (S) {
      const N = Rl(S.keyCombination);
      return d.events.length > 1 ? `${N} (+${d.events.length - 1})` : N;
    }
    const E = Rl(d.events[0].keyCombination);
    return d.events.every((N) => Rl(N.keyCombination) === E) ? `${E} ×${d.events.length}` : `${E} (+${d.events.length - 1})`;
  }
  function k(d, S = "LOCAL") {
    return kt(d, S);
  }
  function m(d) {
    const S = [];
    for (const E of d) {
      const j = Rl(E.keyCombination);
      S.length && S[S.length - 1].key === j ? S[S.length - 1].count++ : S.push({ key: j, count: 1 });
    }
    return S;
  }
  return M.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: M.map((d) => {
    const S = d.events.length, E = S > 1, j = d.isMultiStation, N = D(d), T = k(d.startEpochMs, o), g = d.pct < 10 ? "edge-left" : d.pct > 90 ? "edge-right" : "", b = {};
    return d.events.forEach((O) => {
      const U = O.stationName || e || "Workstation";
      b[U] || (b[U] = []), b[U].push(O);
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
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(b).map(([O, U]) => {
              const A = m(U);
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
                  A.slice(0, 6).map((H, oe) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    H.key,
                    H.count > 1 ? ` ×${H.count}` : ""
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
const Dg = u.memo(Og), ja = [
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
], Pg = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function _g({
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
  earliestMediaMs: y = null,
  movieBoundaries: f = null,
  stationHostname: x = "",
  activeStationName: v = "",
  showKeystrokes: C = !0,
  keystrokes: M = []
}) {
  const D = u.useRef(null), [k, m] = u.useState(1e3);
  u.useEffect(() => {
    if (!D.current) return;
    const F = new ResizeObserver((ne) => {
      for (let Z of ne)
        Z.contentRect.width > 50 && m(Z.contentRect.width);
    });
    return F.observe(D.current), () => F.disconnect();
  }, []);
  const d = u.useCallback((F) => !r || r <= 0 ? "0%" : `${(F - n) / r * 100}%`, [r, n]), S = u.useCallback((F) => {
    const Z = (F - n) / r * 100;
    return Z >= -5 && Z <= 105;
  }, [n, r]), E = (F) => {
    if (!D.current) return;
    const ne = D.current.getBoundingClientRect(), Z = Math.max(0, Math.min(F.clientX - ne.left, ne.width)), G = Math.round(n + Z / ne.width * r);
    i && i(G);
  }, j = () => {
    i && i(null);
  }, N = (F) => {
    if (!D.current || !a) return;
    const ne = D.current.getBoundingClientRect(), Z = Math.max(0, Math.min(F.clientX - ne.left, ne.width)), G = Math.round(n + Z / ne.width * r);
    a(Math.max(0, Math.min(l, G)));
  }, T = u.useMemo(() => {
    const F = Math.max(3, Math.floor(k / 95)), ne = r / F;
    for (let Z of ja)
      if (Z >= ne) return Z;
    return ja[ja.length - 1];
  }, [r, k]), g = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const F = e + n, ne = F + r, Z = t === "LOCAL" ? Ls(F).offsetMin * 60 * 1e3 : 0, G = F + Z, se = Math.ceil(G / T) * T, _e = [];
    for (let De = se; De <= ne + Z; De += T) {
      const Se = De - Z, Q = (Se - F) / r * 100;
      Q >= 0 && Q <= 100 && _e.push({
        epoch: Se,
        pct: Q,
        label: kt(Se, t, {
          includeSeconds: T < 6e4
        })
      });
    }
    return _e;
  }, [e, n, r, T, t]), b = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const F = e + n, ne = F + r;
    return cp(F, ne).map((Z) => ({
      ...Z,
      pct: (Z.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), O = u.useMemo(() => {
    if (!r || !e) return [];
    const F = e + n, ne = F + r, Z = t === "UTC", G = [], se = Z ? 0 : Ls(F).offsetMin * 60 * 1e3, _e = F + se, De = ne + se, Se = new Date(_e);
    for (Se.setUTCHours(0, 0, 0, 0), Se.getTime() < _e && Se.setUTCDate(Se.getUTCDate() + 1); Se.getTime() <= De; ) {
      const le = Se.getTime() - se, ee = (le - F) / r * 100, te = String(Se.getUTCDate()).padStart(2, "0"), Me = Pg[Se.getUTCMonth()], z = `${te} ${Me}`;
      G.push({ epoch: le, pct: ee, dateLabel: z }), Se.setUTCDate(Se.getUTCDate() + 1);
    }
    return G;
  }, [e, n, r, t]), {
    globalFirstMs: U = y,
    globalLastMs: A = null,
    currentFirstMs: H = null,
    currentLastMs: oe = null
  } = f || { globalFirstMs: y }, W = U !== null && H !== null && Math.abs(U - H) < 1e3, re = A !== null && oe !== null && Math.abs(A - oe) < 1e3, I = u.useMemo(() => {
    const F = [];
    return W ? S(U) && F.push({
      id: "first-combined",
      ms: U,
      pct: d(U),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${kt(e + U, t)} (Click to jump)`
    }) : (S(U) && F.push({
      id: "first-global",
      ms: U,
      pct: d(U),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${kt(e + U, t)} (Click to jump)`
    }), S(H) && F.push({
      id: "first-current",
      ms: H,
      pct: d(H),
      className: "ruler-media-pin current-first",
      badge: v ? `FIRST (${v})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${kt(e + H, t)} (Click to jump)`
    })), re ? S(A) && F.push({
      id: "last-combined",
      ms: A,
      pct: d(A),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${kt(e + A, t)} (Click to jump)`
    }) : (S(oe) && F.push({
      id: "last-current",
      ms: oe,
      pct: d(oe),
      className: "ruler-media-pin current-last",
      badge: v ? `LAST (${v})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${kt(e + oe, t)} (Click to jump)`
    }), S(A) && F.push({
      id: "last-global",
      ms: A,
      pct: d(A),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${kt(e + A, t)} (Click to jump)`
    })), F;
  }, [
    U,
    A,
    H,
    oe,
    W,
    re,
    e,
    t,
    v,
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
      title: `First Frame in Cut (IN): ${kt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof h == "number" && S(h) && F.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: h,
      pct: d(h),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${kt(e + h, t, { includeSeconds: !0 })} (Click to seek)`
    }), F;
  }, [c, h, e, t, S, d]), _ = o !== null ? d(o) : null, V = _ !== null && _ >= 0 && _ <= 100;
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
            Dg,
            {
              stationHostname: x,
              activeStationName: v,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: k,
              onSeek: a,
              keystrokes: M
            }
          ),
          b.map((F) => /* @__PURE__ */ s.jsxs(
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
              onClick: (ne) => {
                ne.stopPropagation(), a && a(F.ms);
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
              onClick: (ne) => {
                ne.stopPropagation(), a && a(F.ms);
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
        V && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${_}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: kt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const _n = (e) => String(e).padStart(2, "0");
function Fg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: i
}) {
  const [a, c] = u.useState(!1), [h, y] = u.useState(!1), [f, x] = u.useState(""), [v, C] = u.useState(""), M = u.useCallback((g) => {
    if (!g || isNaN(g) || g <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const A = new Date(g);
      return {
        timeStr: `${_n(A.getUTCHours())}:${_n(A.getUTCMinutes())}:${_n(A.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: b, label: O } = Ls(g), U = new Date(g + b * 60 * 1e3);
    return {
      timeStr: `${_n(U.getUTCHours())}:${_n(U.getUTCMinutes())}:${_n(U.getUTCSeconds())}`,
      zoneLabel: O
    };
  }, [t]), D = u.useCallback((g) => {
    if (!g || g < 0) return "00:00:00";
    const b = Math.floor(g / 1e3), O = Math.floor(b / 3600), U = Math.floor(b % 3600 / 60), A = b % 60;
    return `${_n(O)}:${_n(U)}:${_n(A)}`;
  }, []), k = u.useMemo(() => M(e + r), [M, e, r]), m = u.useMemo(() => M(e + o), [M, e, o]), d = u.useMemo(() => D(Math.max(0, o - r)), [D, r, o]), S = u.useCallback((g, b) => {
    if (!g || !g.trim()) return b;
    const U = g.trim().split(" ")[0].split(":").map(Number);
    if (U.length < 2 || U.some(isNaN)) return b;
    const [A, H, oe = 0] = U;
    if (t === "UTC") {
      const se = new Date(e);
      se.setUTCHours(A, H, oe, 0);
      let _e = se.getTime();
      for (; _e < e; ) _e += 864e5;
      for (; _e > e + n + 1e3; ) _e -= 864e5;
      const De = _e - e;
      return isNaN(De) ? b : Math.max(0, Math.min(n, De));
    }
    const { offsetMin: W } = Ls(e), re = new Date(e + W * 6e4), I = re.getUTCFullYear(), R = re.getUTCMonth(), _ = re.getUTCDate(), V = `${I}-${_n(R + 1)}-${_n(_)}`, F = `${_n(A)}:${_n(H)}:${_n(oe)}`, ne = Ci(V, F);
    let Z;
    if (ne.isAmbiguous) {
      const se = e + b, _e = Math.abs(ne.firstOccurrenceEpoch - se), De = Math.abs(ne.secondOccurrenceEpoch - se);
      Z = _e <= De ? ne.firstOccurrenceEpoch : ne.secondOccurrenceEpoch;
    } else {
      const se = Date.UTC(I, R, _, A, H, oe), { offsetMin: _e } = Ls(se - W * 6e4);
      Z = se - _e * 6e4;
    }
    for (; Z < e; ) Z += 864e5;
    for (; Z > e + n + 1e3; ) Z -= 864e5;
    const G = Z - e;
    return isNaN(G) ? b : Math.max(0, Math.min(n, G));
  }, [e, t, n]), E = () => {
    x(k.timeStr), c(!0);
  }, j = () => {
    if (c(!1), !f || !f.trim() || f.trim() === k.timeStr)
      return;
    const g = S(f.trim(), r);
    g !== null && !isNaN(g) && g < o && l(g);
  }, N = () => {
    C(m.timeStr), y(!0);
  }, T = () => {
    if (y(!1), !v || !v.trim() || v.trim() === m.timeStr)
      return;
    const g = S(v.trim(), o);
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
          value: f,
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
          value: v,
          autoFocus: !0,
          onChange: (g) => C(g.target.value),
          onBlur: T,
          onKeyDown: (g) => {
            g.key === "Enter" && T(), g.key === "Escape" && y(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: N,
          title: `Click to edit OUT time (${m.zoneLabel})`,
          children: [
            m.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: m.zoneLabel })
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
function Bg({
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
  onStartDragMinimap: y
}) {
  const f = Math.max(0, Math.min(100, a / r * 100)), x = Math.max(0, Math.min(100, c / r * 100)), v = Math.max(0, x - f), C = Math.max(0, Math.min(100, l / r * 100)), M = Math.max(0, Math.min(100 - C, o / r * 100)), D = C + M, k = i > 1.05, m = 7, d = v >= 10, S = v >= 16, E = d, j = S, N = E && Math.abs(C - f) < m, T = k && M >= 12 && !N, g = j && Math.abs(D - x) < m, b = k && M >= 12 && !g;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (O) => y && y("minimap-viewport", O),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${f}%`, width: `${v}%` },
            children: [
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: kt(t + a, n) }),
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: kt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${C}%`, width: `${M}%` },
            children: [
              T && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: kt(t + l, n) }),
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: kt(t + l + o, n) })
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
  keystrokeMode: h = "BURN_IN",
  // 'NONE' | 'CAPTION' | 'BURN_IN'
  onChangeKeystrokeMode: y,
  showRulerKeystrokes: f = !1,
  onToggleRulerKeystrokes: x
}) {
  const v = (h || "NONE").toUpperCase().replace("-", "_"), C = () => {
    y && y(v === "NONE" || v === "OFF" ? "BURN_IN" : v === "BURN_IN" ? "CAPTION" : "NONE");
  }, M = () => {
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
    y && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${v.toLowerCase().replace("_", "-")}`,
        onClick: C,
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
    x && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${f ? "active" : "inactive"}`,
        onClick: x,
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
        title: `Jump playhead to first media (${kt(a + e, c)})`,
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
        title: `Jump playhead to last media (${kt(a + t, c)})`,
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
const ws = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new Map();
let Ts = [], ul = 0;
const Bd = 3, Ug = 8e3, zg = 80;
function xp() {
  setTimeout(Hg, 0);
}
function Hg() {
  var e;
  if (!(ul >= Bd || Ts.length === 0))
    for (Ts = Ts.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); ul < Bd && Ts.length > 0; ) {
      const t = Ts.pop();
      !t || (e = t.signal) != null && e.aborted || (ul++, Kg(t));
    }
}
async function Kg(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: i, resolve: a, displayId: c } = e;
  let h = !1, y = null;
  const f = () => {
    h || (h = !0, y && clearTimeout(y), ul = Math.max(0, ul - 1), Ur.delete(t), xp());
  };
  y = setTimeout(() => {
    f(), a(null);
  }, Ug);
  try {
    const x = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, v = await fetch(x, { signal: i });
    if (v.ok && v.status !== 204) {
      const C = await v.blob();
      if (C && C.size > 1500) {
        const M = URL.createObjectURL(C);
        if (ws.size >= zg) {
          const D = ws.keys().next().value, k = ws.get(D);
          k && URL.revokeObjectURL(k), ws.delete(D);
        }
        ws.set(t, M), a(M);
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
    return ws.get(o);
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
    if (ws.has(i))
      return Promise.resolve(ws.get(i));
    if (Ur.has(i))
      return Ur.get(i);
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
        Ts = Ts.filter((y) => y.key !== i), Ur.delete(i), c(null);
      }, { once: !0 }), Ts.push(h), xp();
    });
    return Ur.set(i, a), a;
  },
  clear() {
    ws.forEach((e) => URL.revokeObjectURL(e)), ws.clear(), Ur.clear(), Ts = [], ul = 0;
  }
}, Vg = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Vn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Sr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Ec({
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
  directorSegments: y = [],
  isAutoDirectorEnabled: f = !1,
  showDirectorCoverage: x = !1,
  stepperSegments: v = null
}) {
  const [C, M] = u.useState({}), D = u.useRef(C);
  D.current = C;
  const k = u.useMemo(() => Vg(l), [l]), m = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: g, framesPerTile: b } = k, O = [], U = o + r, A = U + l, H = U - g, oe = A + g, W = [...n].sort((V, F) => Vn(V) - Vn(F)), re = [...c || [], ...h || []], I = (V, F) => !re || re.length === 0 ? !1 : re.some((ne) => {
      const Z = ne.startEpochMs ?? ne.startEpoch ?? ne.start ?? 0, G = ne.endEpochMs ?? ne.endEpoch ?? ne.end ?? 0;
      return G <= Z ? !1 : Math.max(V, Z) < Math.min(F, G);
    }), R = o + i, _ = o + a;
    if (W.forEach((V, F) => {
      const ne = Math.round(Vn(V)), Z = Math.round(Sr(V));
      if (Z <= ne) return;
      const G = Math.max(ne, R), se = Math.min(Z, _);
      if (se <= G) return;
      const _e = Math.max(G, H), De = Math.min(se, oe);
      if (De <= _e) return;
      const Se = Math.floor(_e / g) * g;
      for (let Q = Se; Q < De; Q += g) {
        const le = Q + g, ee = Math.max(G, Q), te = Math.min(se, le);
        te > ee && !I(ee, te) && O.push({
          key: `${e}_${t}_${ee}_${te}_${b}`,
          sIdx: F,
          startEpoch: ee,
          endEpoch: te,
          framesPerTile: b,
          displayId: t
        });
      }
    }), O.length > 20) {
      const V = o + r + l / 2;
      O.sort((F, ne) => {
        const Z = Math.abs((F.startEpoch + F.endEpoch) / 2 - V), G = Math.abs((ne.startEpoch + ne.endEpoch) / 2 - V);
        return Z - G;
      }), O.length = 20, O.sort((F, ne) => F.startEpoch - ne.startEpoch);
    }
    return O;
  }, [n, o, e, t, r, l, k, i, a, h, c]);
  u.useEffect(() => {
    if (m.length === 0) return;
    let g = !0;
    const b = new AbortController(), O = [], U = {};
    let A = !1;
    m.forEach((R) => {
      const _ = Wd.get(e, R.startEpoch, R.endEpoch, R.framesPerTile, t);
      _ ? D.current[R.key] !== _ && (U[R.key] = _, A = !0) : O.push(R);
    });
    const H = new Set(m.map((R) => R.key)), oe = D.current, W = {};
    let re = !1;
    if (Object.keys(oe).forEach((R) => {
      H.has(R) ? W[R] = oe[R] : re = !0;
    }), A || re) {
      const R = { ...W, ...U };
      D.current = R, M(R);
    }
    if (O.length === 0) return () => {
      g = !1;
    };
    const I = setTimeout(() => {
      O.forEach((R) => {
        Wd.fetchTile(e, R.startEpoch, R.endEpoch, R.framesPerTile, b.signal, t).then((_) => {
          g && _ && (D.current[R.key] = _, M((V) => ({ ...V, [R.key]: _ })));
        });
      });
    }, 150);
    return () => {
      g = !1, clearTimeout(I), b.abort();
    };
  }, [m, e, t]);
  const d = (i - r) / l * 100, S = (a - r) / l * 100, E = u.useMemo(() => {
    if (m.length === 0 || !o || l <= 0) return [];
    const g = r, b = r + l;
    return m.map((O) => {
      const U = O.startEpoch - o, A = O.endEpoch - o;
      if (A <= g || U >= b) return null;
      const H = Math.max(g, U), oe = Math.min(b, A);
      return {
        key: O.key,
        spriteUrl: C[O.key] || null,
        leftPct: (H - g) / l * 100,
        widthPct: (oe - H) / l * 100
      };
    }).filter(Boolean);
  }, [m, o, r, l, C]), j = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const g = r, b = r + l;
    return n.map((O, U) => {
      const A = Math.round(Vn(O)) - o, H = Math.round(Sr(O)) - o;
      if (H <= g || A >= b) return null;
      const oe = Math.max(g, A), W = Math.min(b, H);
      return {
        id: U,
        leftPct: (oe - g) / l * 100,
        widthPct: (W - oe) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), N = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const g = [...n].sort((I, R) => Vn(I) - Vn(R)), b = [], O = r, U = r + l, A = o + O, H = o + U, oe = o + (i !== void 0 ? i : O), W = o + (a !== void 0 ? a : U);
    if (g.length > 0) {
      const I = Vn(g[0]);
      I > A && b.push({ startEpoch: A, endEpoch: I });
    } else l > 0 && b.push({ startEpoch: A, endEpoch: H });
    for (let I = 0; I < g.length - 1; I++) {
      const R = Sr(g[I]), _ = Vn(g[I + 1]);
      _ - R > 1e3 && b.push({ startEpoch: R, endEpoch: _ });
    }
    if (g.length > 0) {
      const I = Sr(g[g.length - 1]);
      I < H && b.push({ startEpoch: I, endEpoch: H });
    }
    const re = [];
    return c && c.length > 0 && c.forEach((I, R) => {
      const _ = Math.max(I.startEpochMs ?? I.StartEpochMs, oe), V = Math.min(I.endEpochMs ?? I.EndEpochMs, W);
      if (V > _ && V > A && _ < H) {
        const F = Math.max(A, _), ne = Math.min(H, V), Z = (ne - o - (F - o)) / l * 100;
        Z > 0 && re.push({
          id: `global-${R}`,
          type: "global",
          startEpoch: F,
          endEpoch: ne,
          leftPct: (F - o - O) / l * 100,
          widthPct: Z,
          durationSec: Math.round((V - _) / 1e3)
        });
      }
    }), b.forEach((I, R) => {
      let _ = [I];
      c && c.length > 0 && c.forEach((V) => {
        const F = Math.max(V.startEpochMs ?? V.StartEpochMs, oe), ne = Math.min(V.endEpochMs ?? V.EndEpochMs, W);
        if (ne <= F) return;
        const Z = [];
        _.forEach((G) => {
          ne <= G.startEpoch || F >= G.endEpoch ? Z.push(G) : (F > G.startEpoch && Z.push({ startEpoch: G.startEpoch, endEpoch: F }), ne < G.endEpoch && Z.push({ startEpoch: ne, endEpoch: G.endEpoch }));
        }), _ = Z;
      }), _.forEach((V, F) => {
        if (V.endEpoch - V.startEpoch < 1e3 || V.endEpoch <= A || V.startEpoch >= H) return;
        const ne = Math.max(A, V.startEpoch), Z = Math.min(H, V.endEpoch), G = (Z - o - (ne - o)) / l * 100;
        G > 0 && re.push({
          id: `station-${R}-${F}`,
          type: "station",
          startEpoch: ne,
          endEpoch: Z,
          leftPct: (ne - o - O) / l * 100,
          widthPct: G,
          durationSec: Math.round((V.endEpoch - V.startEpoch) / 1e3)
        });
      });
    }), re;
  }, [n, c, o, r, l, i, a]), T = u.useMemo(() => {
    if (!x || !f || !y || y.length === 0) return [];
    const g = (t || "mon-0").toLowerCase(), b = r, O = r + l;
    return y.map((U, A) => {
      const H = (U.startEpochMs ?? U.StartEpochMs ?? 0) - o, oe = (U.endEpochMs ?? U.EndEpochMs ?? 0) - o;
      if (oe <= b || H >= O) return null;
      const W = Math.max(b, H), re = Math.min(O, oe), I = (W - b) / l * 100, R = (re - W) / l * 100;
      if (R <= 0) return null;
      const V = (U.targetDisplayId || U.TargetDisplayId || "mon-0").toLowerCase() === g;
      return {
        id: `cov_${A}`,
        isFeatured: V,
        leftPct: I,
        widthPct: R
      };
    }).filter(Boolean);
  }, [x, f, y, t, o, r, l]);
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
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${v ? "has-stepper" : ""}`, children: j.map((g) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` }
      },
      `bar_${g.id}`
    )) }),
    v && v.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: f ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      v.map((g, b) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${g.dispNum}`,
          style: { left: `${g.leftPct}%`, width: `${g.widthPct}%` },
          title: `Auto-Director: Screen ${g.dispNum} (${g.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: g.dispNum })
        },
        `stp_${b}`
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
function Yg({
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
  onStationContextMenu: y,
  onDeselectStation: f,
  viewportStartMs: x = 0,
  viewportDurationMs: v = 36e5,
  inPointMs: C = 0,
  outPointMs: M = 36e5,
  baseEpochMs: D = 0,
  segments: k = [],
  recordingSegments: m = {},
  globalGaps: d = []
}) {
  const S = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", E = (e == null ? void 0 : e.id) || S, j = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", N = (e == null ? void 0 : e.hostname) || "", T = u.useMemo(() => {
    var R, _, V;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((R = e == null ? void 0 : e.displayTopology) == null ? void 0 : R.displays) || ((_ = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : _.Displays) || ((V = e == null ? void 0 : e.topology) == null ? void 0 : V.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), g = u.useMemo(() => {
    var _, V;
    const R = T.find((F) => F.isPrimary || F.IsPrimary);
    return ((R == null ? void 0 : R.displayId) || (R == null ? void 0 : R.DisplayId) || ((_ = T[0]) == null ? void 0 : _.displayId) || ((V = T[0]) == null ? void 0 : V.DisplayId) || "mon-0").toLowerCase();
  }, [T]), b = a || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), O = u.useMemo(() => (b == null ? void 0 : b.segments) || (b == null ? void 0 : b.Segments) || [], [b]), U = O && O.length > 0, A = T.length > 1 || U, H = u.useMemo(() => {
    let R = m[E] || m[S] || k || [];
    if (!R || R.length === 0) {
      const _ = (E || "").toLowerCase(), V = (S || "").toLowerCase();
      for (const [F, ne] of Object.entries(m || {})) {
        const Z = F.toLowerCase();
        if (_ && Z === _ || V && Z === V) {
          R = ne;
          break;
        }
      }
    }
    if ((!R || R.length === 0) && (R = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !R || R.length === 0)
      for (const _ of T) {
        const V = _.segments || _.Segments || [];
        if (V.length > 0) {
          R = V;
          break;
        }
      }
    return (R || []).filter((_) => Sr(_) - Vn(_) > 0);
  }, [m, k, E, S, e, T]), oe = u.useMemo(() => {
    if (!D || v <= 0) return [];
    const R = [...H].sort((Z, G) => Vn(Z) - Vn(G)), _ = [], V = D + v;
    if (d && d.length > 0 && d.forEach((Z) => {
      const G = Z.startEpochMs ?? Z.StartEpochMs ?? 0, se = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      se > G && _.push({ startEpoch: G, endEpoch: se, type: "global" });
    }), R.length === 0)
      return _.push({ startEpoch: D, endEpoch: V, type: "station" }), _;
    const F = Math.round(Vn(R[0]));
    F - D > 2e3 && (_.some((G) => G.type === "global" && G.startEpoch <= D && G.endEpoch >= F) || _.push({ startEpoch: D, endEpoch: F, type: "station" }));
    for (let Z = 0; Z < R.length - 1; Z++) {
      const G = Math.round(Sr(R[Z])), se = Math.round(Vn(R[Z + 1]));
      se - G > 2e3 && (_.some((De) => De.type === "global" && De.startEpoch <= G && De.endEpoch >= se) || _.push({ startEpoch: G, endEpoch: se, type: "station" }));
    }
    const ne = Math.round(Sr(R[R.length - 1]));
    return V - ne > 2e3 && (_.some((G) => G.type === "global" && G.startEpoch <= ne && G.endEpoch >= V) || _.push({ startEpoch: ne, endEpoch: V, type: "station" })), _;
  }, [H, d, D, v]), W = u.useMemo(() => Mg(O, oe, d), [O, oe, d]), re = u.useMemo(() => {
    if (!U || v <= 0) return null;
    const R = x, _ = x + v;
    return W.map((V, F) => {
      const ne = (V.startEpochMs ?? V.StartEpochMs ?? 0) - D, Z = (V.endEpochMs ?? V.EndEpochMs ?? 0) - D;
      if (Z <= R || ne >= _) return null;
      const G = Math.max(R, ne), se = Math.min(_, Z), _e = (G - R) / v * 100, De = (se - G) / v * 100;
      if (De <= 0) return null;
      const Se = (V.targetDisplayId || V.TargetDisplayId || "mon-0").toLowerCase(), Q = T.findIndex((te) => (te.displayId || te.DisplayId || "").toLowerCase() === Se);
      let le = Q >= 0 ? Q + 1 : null;
      if (!le) {
        const te = Se.match(/\d+/);
        le = te ? parseInt(te[0], 10) + 1 : 1;
      }
      const ee = Q >= 0 ? T[Q].displayName || T[Q].DisplayName || `Screen ${le}` : `Screen ${le}`;
      return {
        id: F,
        dispNum: le,
        dispLabel: ee,
        leftPct: _e,
        widthPct: De
      };
    }).filter(Boolean);
  }, [U, W, T, D, x, v]), I = u.useCallback((R) => {
    const _ = (R || "mon-0").toLowerCase();
    return o.some((V) => {
      if (V.stationId !== E) return !1;
      const F = (V.displayId || "mon-0").toLowerCase();
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
      const V = (R.displayId || R.DisplayId || `mon-${_}`).toLowerCase(), F = R.displayNumber || R.DisplayNumber || _ + 1, ne = R.displayName || R.DisplayName || "", Z = ne && !ne.toLowerCase().includes(S.toLowerCase()) ? ne : `Screen ${F}${R.isPrimary || _ === 0 ? " (Main)" : ""}`, G = I(V);
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
                  onClick: (se) => {
                    se.stopPropagation(), i(e.id, V);
                  },
                  title: G ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: G ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Ec,
              {
                hostname: S,
                displayId: V,
                activeSegments: H,
                viewportStartMs: x,
                viewportDurationMs: v,
                baseEpochMs: D,
                inPointMs: C,
                outPointMs: M,
                globalGaps: d,
                directorSegments: W,
                isAutoDirectorEnabled: r,
                gaps: oe,
                showDirectorCoverage: A
              }
            )
          ]
        },
        `${e.id}-${V}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        h && h(), A && n && n();
      },
      onContextMenu: (R) => {
        y && (R.preventDefault(), R.stopPropagation(), y(R, e));
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
          Ec,
          {
            hostname: S,
            displayId: g,
            activeSegments: H,
            viewportStartMs: x,
            viewportDurationMs: v,
            baseEpochMs: D,
            inPointMs: C,
            outPointMs: M,
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
const Ud = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
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
  onFollowVisualFeed: h,
  isAutoFollow: y = !1,
  timeMode: f = "LOCAL",
  onUpdateAudioPlan: x = null
}) {
  const v = u.useRef(null), [C, M] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [D, k] = u.useState(!1), [m, d] = u.useState(null), [S, E] = u.useState(1), [j, N] = u.useState([]), [T, g] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const Q = (le) => {
      le.detail && g(le.detail);
    };
    return window.addEventListener("itb-live-audio-level", Q), () => window.removeEventListener("itb-live-audio-level", Q);
  }, []);
  const b = u.useCallback(() => {
    M((Q) => {
      const le = !Q;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(le));
      } catch {
      }
      return le;
    });
  }, []), [O, U] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      clips: e.segments.map((Q, le) => {
        var ee;
        return {
          id: `clip_${le}_${Q.startEpochMs || Q.StartEpochMs}`,
          startEpochMs: Q.startEpochMs ?? Q.StartEpochMs ?? l,
          endEpochMs: Q.endEpochMs ?? Q.EndEpochMs ?? l + r,
          sourceStationId: Q.sourceStationId ?? Q.SourceStationId ?? (((ee = t[0]) == null ? void 0 : ee.id) || "station-0"),
          gain: Q.gain ?? Q.Gain ?? 1
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
  ]), A = l + o, H = l + n, oe = H + r, W = u.useCallback((Q) => {
    if (!x) return;
    const le = [];
    Q.forEach((ee) => {
      ee.isMuted || D || ee.clips.forEach((te) => {
        le.push({
          startEpochMs: te.startEpochMs,
          endEpochMs: te.endEpochMs,
          sourceStationId: te.sourceStationId,
          gain: te.gain * ee.gain
        });
      });
    }), le.sort((ee, te) => ee.startEpochMs - te.startEpochMs), x({ segments: le });
  }, [x, D]);
  u.useEffect(() => {
    const Q = () => {
      j.length !== 0 && (U((te) => {
        const Me = te.map((z) => ({
          ...z,
          clips: z.clips.filter((K) => !j.includes(K.id))
        }));
        return W(Me), Me;
      }), N([]), d(null));
    }, le = (te) => {
      if (te.key === "Delete" || te.key === "Backspace") {
        const Me = te.target;
        if (Me.tagName === "INPUT" || Me.tagName === "TEXTAREA" || Me.isContentEditable) return;
        j.length > 0 && (te.preventDefault(), Q());
      }
    }, ee = () => Q();
    return window.addEventListener("keydown", le), window.addEventListener("itb:studio-delete-selected", ee), () => {
      window.removeEventListener("keydown", le), window.removeEventListener("itb:studio-delete-selected", ee);
    };
  }, [j, W]);
  const re = u.useCallback(() => {
    U((Q) => {
      const ee = `A${Q.length + 1}`, te = {
        id: ee,
        name: `Track ${ee}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        clips: []
      }, Me = [...Q, te];
      return W(Me), Me;
    });
  }, [W]), I = u.useCallback((Q) => {
    U((le) => {
      if (le.length <= 1) return le;
      const ee = le.filter((te) => te.id !== Q);
      return W(ee), ee;
    });
  }, [W]), R = u.useCallback((Q) => {
    U((le) => {
      const ee = le.map((te) => te.id === Q ? { ...te, isMuted: !te.isMuted } : te);
      return W(ee), ee;
    });
  }, [W]), _ = u.useCallback((Q) => {
    U((le) => {
      var Me;
      const ee = (Me = le.find((z) => z.id === Q)) == null ? void 0 : Me.isSolo, te = le.map((z) => ({
        ...z,
        isSolo: z.id === Q ? !ee : !1,
        isMuted: z.id === Q ? !1 : !ee
      }));
      return W(te), te;
    });
  }, [W]), V = u.useCallback((Q, le) => {
    const ee = Math.max(0, Math.min(2, Number(le)));
    U((te) => {
      const Me = te.map((z) => z.id === Q ? { ...z, gain: ee } : z);
      return W(Me), Me;
    }), _d(ee);
  }, [W]), F = u.useCallback((Q, le = null, ee = null) => {
    var pe;
    const te = le || ((pe = t[0]) == null ? void 0 : pe.id) || "station-0", Me = ee !== null ? ee : A, z = Math.min(r, 6e4), K = Me + z, de = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(Me),
      endEpochMs: Math.round(K),
      sourceStationId: te,
      gain: 1
    };
    U((Ae) => {
      const $e = Ae.map((ae) => ae.id === Q ? {
        ...ae,
        clips: [...ae.clips, de].sort((we, he) => we.startEpochMs - he.startEpochMs)
      } : ae);
      return W($e), $e;
    });
  }, [A, r, t, W]), ne = u.useCallback((Q, le) => {
    U((ee) => {
      const te = ee.map((Me) => {
        if (Me.id !== Q) return Me;
        const z = [];
        return Me.clips.forEach((K) => {
          K.id === le && A > K.startEpochMs + 500 && A < K.endEpochMs - 500 ? (z.push({ ...K, endEpochMs: A }), z.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: A,
            endEpochMs: K.endEpochMs,
            sourceStationId: K.sourceStationId,
            gain: K.gain
          })) : z.push(K);
        }), { ...Me, clips: z };
      });
      return W(te), te;
    }), d(null);
  }, [A, W]), Z = u.useCallback((Q, le) => {
    U((ee) => {
      const te = ee.map((Me) => Me.id !== Q ? Me : { ...Me, clips: Me.clips.filter((z) => z.id !== le) });
      return W(te), te;
    }), d(null);
  }, [W]), G = u.useCallback((Q, le, ee) => {
    U((te) => {
      const Me = te.map((z) => z.id !== Q ? z : {
        ...z,
        clips: z.clips.map((K) => K.id === le ? { ...K, sourceStationId: ee } : K)
      });
      return W(Me), Me;
    }), d((te) => te ? { ...te, stationId: ee } : null);
  }, [W]), se = u.useCallback((Q, le, ee) => {
    const te = Math.max(0, Math.min(2.5, Number(ee)));
    E(te), U((Me) => {
      const z = Me.map((K) => K.id !== Q ? K : {
        ...K,
        clips: K.clips.map((de) => de.id === le ? { ...de, gain: te } : de)
      });
      return W(z), z;
    }), _d(te);
  }, [W]), _e = u.useCallback((Q, le, ee, te) => {
    Q.preventDefault(), Q.stopPropagation();
    const Me = Q.clientX, z = O.find((ae) => ae.id === le), K = z == null ? void 0 : z.clips.find((ae) => ae.id === ee);
    if (!K) return;
    const de = K.startEpochMs, pe = K.endEpochMs, Ae = (ae) => {
      var Ve;
      const we = ae.clientX - Me, he = (Ve = v.current) == null ? void 0 : Ve.querySelector(".audio-lane-timeline");
      if (!he) return;
      const Pe = he.getBoundingClientRect(), We = we / Pe.width * r;
      U((xe) => xe.map((vt) => vt.id !== le ? vt : {
        ...vt,
        clips: vt.clips.map((Ue) => {
          if (Ue.id !== ee) return Ue;
          if (te === "start") {
            const Yt = Math.min(pe - 500, de + We);
            return { ...Ue, startEpochMs: Math.round(Yt) };
          } else {
            const Yt = Math.max(de + 500, pe + We);
            return { ...Ue, endEpochMs: Math.round(Yt) };
          }
        })
      }));
    }, $e = () => {
      window.removeEventListener("mousemove", Ae), window.removeEventListener("mouseup", $e), U((ae) => (W(ae), ae));
    };
    window.addEventListener("mousemove", Ae), window.addEventListener("mouseup", $e);
  }, [O, r, W]), De = (Q, le, ee) => {
    Q.preventDefault(), Q.stopPropagation();
    const te = 260, Me = 280, z = Math.max(16, Math.min(window.innerWidth - te - 16, Q.clientX - te / 2));
    let K = Q.clientY - Me - 12;
    K < 140 && (K = Math.min(window.innerHeight - Me - 16, Q.clientY + 24)), E(ee.gain || 1), d({
      laneId: le,
      clipId: ee.id,
      s: ee.startEpochMs,
      e: ee.endEpochMs,
      x: z,
      y: K,
      stationId: ee.sourceStationId,
      gain: ee.gain || 1
    });
  };
  u.useEffect(() => {
    if (!m) return;
    const Q = () => d(null), le = (ee) => {
      ee.key === "Escape" && d(null);
    };
    return window.addEventListener("click", Q), window.addEventListener("keydown", le), () => {
      window.removeEventListener("click", Q), window.removeEventListener("keydown", le);
    };
  }, [m]);
  const Se = u.useMemo(() => O.reduce((Q, le) => Q + (le.isMuted ? 0 : le.clips.length), 0), [O]);
  return !t || t.length === 0 ? null : C ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: v, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: b,
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
            onClick: () => k((Q) => !Q),
            title: D ? "Unmute Master Audio" : "Mute All Audio Lanes",
            children: D ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: O.map((Q, le) => {
      const ee = Ud[le % Ud.length];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-sidebar", children: [
          /* @__PURE__ */ s.jsx("div", { className: "lane-badge", style: { backgroundColor: `${ee}26`, borderColor: `${ee}80`, color: ee }, children: Q.id }),
          /* @__PURE__ */ s.jsx("span", { className: "lane-name-text", children: Q.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${Q.isMuted ? "active" : ""}`,
                onClick: () => R(Q.id),
                title: Q.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${Q.isSolo ? "active" : ""}`,
                onClick: () => _(Q.id),
                title: Q.isSolo ? "Unsolo Lane" : "Solo Lane",
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
                value: Q.gain,
                onChange: (te) => V(Q.id, te.target.value),
                title: `Lane Gain: ${Math.round(Q.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(Q.gain * 100),
              "%"
            ] })
          ] }),
          O.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => I(Q.id),
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
            onDoubleClick: (te) => {
              var de;
              const Me = te.currentTarget.getBoundingClientRect(), z = Math.max(0, Math.min(1, (te.clientX - Me.left) / Me.width)), K = Math.round(H + z * r);
              F(Q.id, (de = t[0]) == null ? void 0 : de.id, K);
            },
            children: [
              Q.clips.map((te) => {
                const Me = te.startEpochMs, z = te.endEpochMs, K = t.find((we) => we.id === te.sourceStationId), de = K ? K.displayName || K.hostname || K.id : te.sourceStationId;
                if (z <= H || Me >= oe) return null;
                const pe = Math.max(H, Me), Ae = Math.min(oe, z), $e = (pe - H) / r * 100, ae = (Ae - pe) / r * 100;
                return ae <= 0 ? null : /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    className: `audio-clip-block ${Q.isMuted ? "lane-muted" : ""} ${j.includes(te.id) ? "is-selected" : ""}`,
                    style: {
                      left: `${$e}%`,
                      width: `${ae}%`,
                      borderLeftColor: ee
                    },
                    onClick: (we) => {
                      we.stopPropagation(), we.ctrlKey || we.metaKey ? N(
                        (he) => he.includes(te.id) ? he.filter((Pe) => Pe !== te.id) : [...he, te.id]
                      ) : N([te.id]);
                    },
                    onDoubleClick: (we) => De(we, Q.id, te),
                    onContextMenu: (we) => De(we, Q.id, te),
                    title: `Audio Clip: ${de} [${kt(Me, f, { includeSeconds: !0 })} - ${kt(z, f, { includeSeconds: !0 })}] • Gain: ${Math.round(te.gain * 100)}%`,
                    children: [
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-left",
                          onMouseDown: (we) => _e(we, Q.id, te.id, "start"),
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
                        /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: de }),
                        /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
                          Math.round(te.gain * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "trim-handle trim-handle-right",
                          onMouseDown: (we) => _e(we, Q.id, te.id, "end"),
                          title: "Drag to trim Clip Out-Point"
                        }
                      )
                    ]
                  },
                  te.id
                );
              }),
              Q.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var te;
                    return F(Q.id, (te = t[0]) == null ? void 0 : te.id, A);
                  },
                  title: "Click to insert audio clip at playhead",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK TO INSERT AUDIO CLIP (",
                    Q.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, Q.id);
    }) }),
    m && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "audio-clip-context-menu",
        style: { left: m.x, top: m.y },
        onClick: (Q) => Q.stopPropagation(),
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
            /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((Q) => {
              const le = Q.id === m.stationId;
              return /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-station-chip ${le ? "is-selected" : ""}`,
                  onClick: () => G(m.laneId, m.clipId, Q.id),
                  children: Q.displayName || Q.hostname || Q.id
                },
                Q.id
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
                onChange: (Q) => se(m.laneId, m.clipId, Q.target.value),
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
                onClick: () => ne(m.laneId, m.clipId),
                title: "Split clip at timeline playhead (Ctrl+K)",
                children: "✂️ SPLIT AT PLAYHEAD"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-menu-action delete",
                onClick: () => Z(m.laneId, m.clipId),
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
      onClick: b,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Se > 0 ? `${Se} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
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
function Gg({
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
  totalDurationMs: y = 36e5,
  playheadMs: f = 0,
  inPointMs: x = 0,
  outPointMs: v = 36e5,
  timeMode: C = "LOCAL"
}) {
  const M = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [D, k] = u.useState(null), [m, d] = u.useState(null);
  fo.useEffect(() => {
    if (m === null) return;
    const g = (O) => {
      O.key === "Escape" && d(null);
    }, b = (O) => {
      !O.target.closest(".kf-inspector-popover") && !O.target.closest(".kf-marker-diamond") && d(null);
    };
    return window.addEventListener("keydown", g), window.addEventListener("mousedown", b), () => {
      window.removeEventListener("keydown", g), window.removeEventListener("mousedown", b);
    };
  }, [m]);
  const S = h + f, E = h + a, j = E + c, N = (g) => {
    const b = g.currentTarget.getBoundingClientRect(), O = g.clientX - b.left, U = Math.max(0, Math.min(1, O / b.width)), A = Math.round(E + U * c);
    r && r(A);
  }, T = (g, b, O) => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault();
    const U = g.clientX, A = O.timestampEpochMs, H = O.id || `kf_${b}_${A}`, oe = g.currentTarget.closest(".track-surface");
    if (!oe) return;
    let W = !1;
    k({
      idx: b,
      kfId: H,
      startClientX: U,
      initialEpoch: A,
      currentEpoch: A
    });
    const re = (R) => {
      const _ = R.clientX - U;
      Math.abs(_) > 3 && (W = !0);
      const V = oe.getBoundingClientRect(), F = _ / V.width * c;
      let ne = Math.round(A + F);
      ne = Math.max(h, Math.min(h + y, ne));
      const Z = h + x, G = h + v, se = 14 / V.width * c;
      Math.abs(ne - S) <= se ? ne = S : Math.abs(ne - Z) <= se ? ne = Z : Math.abs(ne - G) <= se && (ne = G), k((_e) => _e ? { ..._e, currentEpoch: ne } : null);
    }, I = (R) => {
      window.removeEventListener("mousemove", re), window.removeEventListener("mouseup", I), k(null);
      const _ = oe.getBoundingClientRect(), F = (R.clientX - U) / _.width * c;
      let ne = Math.round(A + F);
      ne = Math.max(h, Math.min(h + y, ne));
      const Z = h + x, G = h + v, se = 14 / _.width * c;
      Math.abs(ne - S) <= se ? ne = S : Math.abs(ne - Z) <= se ? ne = Z : Math.abs(ne - G) <= se && (ne = G), W ? (o && o(H, ne), n && n(b, ne)) : (n && n(b, A), d((_e) => _e === b ? null : b));
    };
    window.addEventListener("mousemove", re), window.addEventListener("mouseup", I);
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
          M.map((g, b) => {
            const O = (D == null ? void 0 : D.idx) === b, U = O ? D.currentEpoch : g.timestampEpochMs;
            if (U < E - 5e4 || U > j + 5e4) return null;
            const A = (U - E) / c * 100;
            if (A < -2 || A > 102) return null;
            const H = b === t, oe = kt(U, C, { includeSeconds: !0 }), W = `${g.transitionType || "smooth"} (${g.transitionDurationSec ?? 0.5}s)`, re = Math.max(0, (U - h) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${H ? "is-active" : ""} ${O ? "is-dragging" : ""}`,
                style: { left: `${A}%` },
                onMouseDown: (I) => T(I, b, g),
                onContextMenu: (I) => {
                  I.preventDefault(), I.stopPropagation(), M.length > 1 && l && l(b);
                },
                title: `Keyframe #${b + 1} at ${oe} (+${re}s) • ${W}
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
                  m === b && !O && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (I) => I.stopPropagation(),
                      onMouseDown: (I) => I.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            b + 1
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
                        b > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(g.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(b, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${g.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(b, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${g.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => i == null ? void 0 : i(b, { transitionType: "cut" }),
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
                                onClick: () => i == null ? void 0 : i(b, { transitionDurationSec: I }),
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
                                I.stopPropagation(), l && l(b), d(null);
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
function Qg({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: i = 36e5,
  onStartDrag: a
}) {
  const c = (g) => !r || r <= 0 ? "0%" : `${(g - n) / r * 100}%`, h = (o - n) / r * 100, y = (i - n) / r * 100, f = (l - n) / r * 100, x = f >= -0.2 && f <= 100.2, v = Math.max(0, Math.min(100, f)), C = Math.max(0, h), M = Math.min(100, y), D = Math.max(0, M - C), k = (g) => (b) => {
    b.preventDefault(), b.stopPropagation(), typeof a == "function" && a(g, b);
  }, m = h < 1.5, d = y > 98.5, S = h <= 0.2 && h >= -0.2, E = y >= 99.8 && y <= 100.2, j = f >= -0.2 && f < 3.5, N = f > 96.5 && f <= 100.2, T = u.useMemo(() => kt(e + l, t), [e, l, t]);
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
        className: `marker in-marker ${m ? "flipped" : ""} ${S ? "at-edge" : ""}`,
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
        style: { left: `${v}%` },
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
const Jg = fo.memo(Qg);
function Zg({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const f = (x) => {
      x.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, l]), !e) return null;
  const i = 210, a = 150, c = Math.min(e.x, window.innerWidth - i - 12), h = Math.min(e.y, window.innerHeight - a - 12), y = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: h, left: c },
      onClick: (f) => f.stopPropagation(),
      onContextMenu: (f) => f.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: kt(t + e.targetMs, n) })
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
  return Bs.createPortal(y, document.body);
}
function qg({
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
const ex = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function tx({
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
    const y = new AbortController();
    c(!0);
    const f = setTimeout(async () => {
      try {
        const x = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, v = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(x),
          signal: y.signal
        });
        if (v.ok) {
          const C = await v.json();
          i(C), h.current && h.current(C);
        }
      } catch (x) {
        x.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", x);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(f), y.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: a, formatEstimateSize: ex };
}
function nx({
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
  getMsFromClientX: y,
  minimapRef: f
}) {
  const [x, v] = u.useState(null), [C, M] = u.useState(null), D = (k, m) => {
    v(k), M({
      target: k,
      startX: m.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: i,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!x) return;
    const k = e * 0.015, m = (S) => {
      if (x === "minimap-viewport" && (f != null && f.current)) {
        const j = f.current.getBoundingClientRect(), T = Math.max(0, Math.min(S.clientX - j.left, j.width)) / j.width * t, g = Math.max(0, Math.min(T - e / 2, t - e));
        h(g);
        return;
      }
      const E = y(S.clientX);
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
        const j = E - y(C.startX), N = C.initialOut - C.initialIn;
        let T = C.initialIn + j, g = C.initialOut + j;
        T < 0 ? (T = 0, g = N) : g > t && (g = t, T = t - N), o(T), a(g);
      }
    }, d = () => {
      v(null), M(null);
    };
    return window.addEventListener("mousemove", m), window.addEventListener("mouseup", d), () => {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", d);
    };
  }, [
    x,
    C,
    y,
    l,
    i,
    n,
    t,
    e,
    r,
    o,
    a,
    h,
    f
  ]), { draggingTarget: x, handleStartDrag: D };
}
const Xs = 4;
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
  totalDurationMs: h = 36e5,
  zoomLevel: y = 1,
  onZoomChange: f,
  onZoomReset: x,
  playheadMs: v = 0,
  setPlayheadMs: C,
  inPointMs: M = 0,
  setInPointMs: D,
  outPointMs: k = 36e5,
  setOutPointMs: m,
  onExport: d,
  recordingSegments: S = {},
  movieBoundaries: E,
  viewportStartMs: j = 0,
  onViewportStartChange: N,
  onEstimateLoaded: T,
  onFitRange: g,
  onJumpViewportTo: b,
  keystrokeMode: O = "BURN_IN",
  onChangeKeystrokeMode: U,
  keystrokes: A = [],
  showKeystrokes: H = !1,
  showRulerKeystrokes: oe = !1,
  onToggleRulerKeystrokes: W,
  _onSplitDirectorSegment: re,
  _onChangeDirectorSegmentDisplay: I,
  _onResetDirectorSegmentToAuto: R,
  audioRoutingPlan: _,
  onSplitAudioSegment: V,
  onChangeAudioSegmentStation: F,
  onChangeAudioSegmentGain: ne,
  onFollowVisualFeed: Z,
  isAutoFollowAudio: G,
  canvasLayoutTimeline: se,
  activeKfIndex: _e = 0,
  onSelectKeyframe: De,
  onAddKeyframeAtEpoch: Se,
  onDeleteKeyframe: Q,
  onUpdateKeyframeEpoch: le,
  onToggleDisplayOnCanvas: ee,
  onUpdateAudioPlan: te
}) {
  var Dn, be, Ie, Xe, ut, Ct, q, me;
  const [Me, z] = u.useState(null), [K, de] = u.useState(0), [pe, Ae] = u.useState(null), [$e, ae] = u.useState(!0), [we, he] = u.useState(() => {
    var J;
    return e.length === 1 ? (J = e[0]) == null ? void 0 : J.id : null;
  });
  u.useEffect(() => {
    var J;
    e.length === 1 && !we && ((J = e[0]) != null && J.id) && he(e[0].id);
  }, [e, we]);
  const Pe = u.useRef(null), We = u.useRef(null), Ve = h / Math.max(1, y), xe = Math.ceil(e.length / Xs) || 1, vt = u.useMemo(() => {
    const J = K * Xs;
    return e.slice(J, J + Xs);
  }, [e, K]);
  u.useEffect(() => {
    if (!t && !we) return;
    const J = we || t, Ne = e.findIndex((Le) => Le.id === J);
    if (Ne !== -1) {
      const Le = Math.floor(Ne / Xs);
      Le !== K && de(Le);
    }
  }, [t, we, e, K]);
  const Ue = ((Dn = se == null ? void 0 : se.keyframes) == null ? void 0 : Dn[_e]) || ((be = se == null ? void 0 : se.keyframes) == null ? void 0 : be[0]), Yt = u.useMemo(() => {
    var J;
    return ((J = Ue == null ? void 0 : Ue.layout) == null ? void 0 : J.placements) || [];
  }, [Ue]), ze = u.useMemo(() => e.find((J) => J.id === t) || null, [e, t]), ct = (E == null ? void 0 : E.globalFirstMs) ?? null, on = (E == null ? void 0 : E.globalLastMs) ?? null, $t = u.useMemo(() => (M > 500 || k < h - 500) && k - M >= 1e3, [M, k, h]), gn = u.useMemo(() => e.map((J) => J.id).sort().join(","), [e]), { estimateData: Ke, isEstimating: Nt, formatEstimateSize: Sn } = tx({
    stationIdsKey: gn,
    inPointMs: M,
    outPointMs: k,
    baseEpochMs: a,
    onEstimateLoaded: T
  }), gt = u.useCallback((J) => {
    if (!Pe.current) return j;
    const Ne = Pe.current.getBoundingClientRect(), Le = Ne.left + 200, Ge = Ne.width - 200 - 58;
    if (Ge <= 0) return j;
    const qe = Math.max(0, Math.min(J - Le, Ge));
    return Math.round(j + qe / Ge * Ve);
  }, [j, Ve]), { draggingTarget: Et, handleStartDrag: On } = nx({
    viewportDurationMs: Ve,
    totalDurationMs: h,
    playheadMs: v,
    setPlayheadMs: C,
    inPointMs: M,
    setInPointMs: D,
    outPointMs: k,
    setOutPointMs: m,
    viewportStartMs: j,
    setViewportStartMs: N,
    getMsFromClientX: gt,
    minimapRef: We
  }), wt = u.useRef(y);
  wt.current = y;
  const At = u.useRef(j);
  At.current = j;
  const Ut = u.useRef(h);
  Ut.current = h;
  const qt = u.useRef(v);
  qt.current = v, u.useEffect(() => {
    const J = Pe.current;
    if (!J) return;
    const Ne = (Le) => {
      Le.preventDefault(), Le.stopPropagation();
      const Ge = Le.ctrlKey || Le.shiftKey, qe = wt.current, Ze = At.current, Ye = Ut.current, lt = qt.current;
      if (Ge) {
        const xt = Math.abs(Le.deltaX) > Math.abs(Le.deltaY) ? Le.deltaX : Le.deltaY;
        if (xt === 0) return;
        const ot = Ye / Math.max(1, qe), Lt = Math.max(0, Ye - ot), Xt = ot * 0.08 * (xt > 0 ? 1 : -1);
        N == null || N(Math.max(0, Math.min(Lt, Ze + Xt)));
      } else {
        if (Le.deltaY === 0) return;
        const ot = Le.deltaY < 0 ? 1.25 : 0.8, Lt = Math.max(32, Ye / 2e3), Xt = J.getBoundingClientRect(), Gt = Xt.left + 200, Zn = Xt.width - 200 - 58;
        let bn = 0.5;
        if (Zn > 0)
          if (Le.clientX >= Gt && Le.clientX <= Xt.right - 58)
            bn = Math.max(0, Math.min(1, (Le.clientX - Gt) / Zn));
          else {
            const Ws = Ye / Math.max(1, qe), dn = (lt - Ze) / Ws;
            bn = dn >= 0 && dn <= 1 ? dn : 0.5;
          }
        const Ot = Math.max(1, Math.min(Lt, Math.round(qe * ot * 100) / 100));
        if (Ot === qe) return;
        const Cs = Ye / qe, en = Ye / Ot, is = Ze + bn * Cs - bn * en, Qt = Math.max(0, Ye - en);
        f == null || f(Ot), N == null || N(Math.max(0, Math.min(Qt, is)));
      }
    };
    return J.addEventListener("wheel", Ne, { passive: !1, capture: !0 }), () => J.removeEventListener("wheel", Ne, { capture: !0 });
  }, [f, N]);
  const un = e.length > 0 && Math.abs(k - M) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Pe,
      className: "timeline-board-root",
      onContextMenu: (J) => {
        var Le;
        J.preventDefault();
        const Ne = (Le = Pe.current) == null ? void 0 : Le.getBoundingClientRect();
        !Ne || J.clientX - Ne.left < 200 || J.clientX > Ne.right - 58 || Ae({ x: J.clientX, y: J.clientY, targetMs: Math.max(0, Math.min(h, gt(J.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Fg,
            {
              baseEpochMs: a,
              timeMode: c,
              totalDurationMs: h,
              inPointMs: M,
              setInPointMs: D,
              outPointMs: k,
              setOutPointMs: m
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                Bg,
                {
                  minimapRef: We,
                  baseEpochMs: a,
                  timeMode: c,
                  totalDurationMs: h,
                  viewportStartMs: j,
                  viewportDurationMs: Ve,
                  zoomLevel: y,
                  inPointMs: M,
                  outPointMs: k,
                  playheadMs: v,
                  onStartDragMinimap: On
                }
              ),
              /* @__PURE__ */ s.jsx(
                Wg,
                {
                  earliestMediaMs: ct,
                  latestMediaMs: on,
                  hasActiveCut: $t,
                  onJumpToFirst: () => {
                    ct !== null && (C == null || C(ct), b == null || b(ct, "start"));
                  },
                  onJumpToLast: () => {
                    on !== null && (C == null || C(on), b == null || b(on, "end"));
                  },
                  onContextualFit: () => {
                    $t ? g == null || g(M, k) : ct !== null && on !== null && on > ct ? g == null || g(ct, on) : x == null || x();
                  },
                  onResetZoom: x,
                  baseEpochMs: a,
                  timeMode: c,
                  keystrokeMode: O,
                  onChangeKeystrokeMode: U,
                  showRulerKeystrokes: oe,
                  onToggleRulerKeystrokes: W
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              _g,
              {
                baseEpochMs: a,
                timeMode: c,
                viewportStartMs: j,
                viewportDurationMs: Ve,
                totalDurationMs: h,
                hoverMs: Me,
                onHoverChange: z,
                onSeek: (J) => C == null ? void 0 : C(J),
                inPointMs: M,
                outPointMs: k,
                earliestMediaMs: ct,
                movieBoundaries: E,
                stationHostname: (ze == null ? void 0 : ze.hostname) || (ze == null ? void 0 : ze.id) || (ze == null ? void 0 : ze.name),
                activeStationName: (ze == null ? void 0 : ze.displayName) || (ze == null ? void 0 : ze.hostname) || (ze == null ? void 0 : ze.name),
                showKeystrokes: !!(oe ?? H),
                keystrokes: A
              }
            ) })
          ] })
        ] }),
        xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: K === 0,
              onClick: () => de((J) => Math.max(0, J - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            K * Xs + 1,
            "–",
            Math.min(e.length, (K + 1) * Xs),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: K >= xe - 1,
              onClick: () => de((J) => Math.min(xe - 1, J + 1)),
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
            onMouseMove: (J) => {
              if (Et || !Pe.current) return;
              const Ne = Pe.current.getBoundingClientRect();
              J.clientX >= Ne.left + 200 && J.clientX <= Ne.right - 58 ? z(gt(J.clientX)) : z(null);
            },
            onMouseLeave: () => !Et && z(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => ae((J) => !J), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: $e ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  $e && xe > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: K === 0,
                        onClick: (J) => {
                          J.stopPropagation(), de((Ne) => Math.max(0, Ne - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      K + 1,
                      "/",
                      xe,
                      " (",
                      K * Xs + 1,
                      "–",
                      Math.min(e.length, (K + 1) * Xs),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: K >= xe - 1,
                        onClick: (J) => {
                          J.stopPropagation(), de((Ne) => Math.min(xe - 1, Ne + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !$e && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => ae(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && /* @__PURE__ */ s.jsx(
                    Ec,
                    {
                      hostname: ((Ie = e[0]) == null ? void 0 : Ie.hostname) || ((Xe = e[0]) == null ? void 0 : Xe.id),
                      displayId: "mon-0",
                      activeSegments: S[(ut = e[0]) == null ? void 0 : ut.id] || S[(Ct = e[0]) == null ? void 0 : Ct.hostname] || ((q = e[0]) == null ? void 0 : q.segments) || [],
                      viewportStartMs: j,
                      viewportDurationMs: Ve,
                      baseEpochMs: a,
                      inPointMs: M,
                      outPointMs: k,
                      globalGaps: (Ke == null ? void 0 : Ke.removedGlobalGaps) || [],
                      isAutoDirectorEnabled: !1
                    }
                  ) })
                ] }),
                $e && (e.length > 0 ? vt.map((J) => {
                  const Ne = !!(t && J.id === t), Le = we === J.id, Ge = o ? o[J.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Yg,
                    {
                      station: J,
                      isExpanded: Le,
                      onToggleExpand: () => he((qe) => qe === J.id ? null : J.id),
                      isAutoDirectorEnabled: Ge,
                      onToggleAutoDirector: i,
                      canvasPlacements: Yt,
                      onToggleDisplayOnCanvas: ee,
                      directorPlan: J.directorPlan,
                      isActive: Ne,
                      onSelect: () => n == null ? void 0 : n(J.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: j,
                      viewportDurationMs: Ve,
                      inPointMs: M,
                      outPointMs: k,
                      baseEpochMs: a,
                      segments: S[J.id] || S[J.hostname] || J.segments || [],
                      recordingSegments: S,
                      globalGaps: (Ke == null ? void 0 : Ke.removedGlobalGaps) || []
                    },
                    J.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Xg,
                  {
                    audioPlan: _,
                    stations: e,
                    viewportStartMs: j,
                    viewportDurationMs: Ve,
                    baseEpochMs: a,
                    playheadMs: v,
                    onSplitSegment: V,
                    onChangeSegmentStation: F,
                    onChangeSegmentGain: ne,
                    onFollowVisualFeed: Z,
                    isAutoFollow: G,
                    timeMode: c,
                    onUpdateAudioPlan: te
                  }
                ),
                ((me = se == null ? void 0 : se.keyframes) == null ? void 0 : me.length) > 0 && /* @__PURE__ */ s.jsx(
                  Gg,
                  {
                    canvasLayoutTimeline: se,
                    activeKfIndex: _e,
                    onSelectKeyframe: De,
                    onAddKeyframeAtEpoch: Se,
                    onDeleteKeyframe: Q,
                    onUpdateKeyframeEpoch: le,
                    viewportStartMs: j,
                    viewportDurationMs: Ve,
                    baseEpochMs: a,
                    totalDurationMs: h,
                    playheadMs: v,
                    inPointMs: M,
                    outPointMs: k,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                qg,
                {
                  isRangeValid: un,
                  onExport: d,
                  isEstimating: Nt,
                  estimateData: Ke,
                  formatEstimateSize: Sn,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Jg,
          {
            baseEpochMs: a,
            timeMode: c,
            viewportStartMs: j,
            viewportDurationMs: Ve,
            playheadMs: v,
            inPointMs: M,
            outPointMs: k,
            onStartDrag: On
          }
        ),
        /* @__PURE__ */ s.jsx(
          Zg,
          {
            contextMenu: pe,
            baseEpochMs: a,
            timeMode: c,
            onAction: (J) => {
              pe && (J === "playhead" ? C == null || C(pe.targetMs) : J === "in" ? D == null || D(Math.max(0, Math.min(pe.targetMs, k - 1e3))) : J === "out" && (m == null || m(Math.min(h, Math.max(pe.targetMs, M + 1e3)))), Ae(null));
            },
            onClose: () => Ae(null)
          }
        )
      ]
    }
  );
}
function sx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function rx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function lx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function ox({
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
  filterMode: y,
  onFilterModeChange: f,
  filteredCount: x,
  selectedInTabCount: v,
  unselectedInTabCount: C,
  activeTabName: M,
  onSelectAllInScope: D,
  onClearInScope: k,
  viewMode: m = "grid",
  onViewModeChange: d,
  isDrawerMode: S = !1
}) {
  const [E, j] = u.useState(!1), N = y !== "all", T = !M || M.toLowerCase() === "all", g = T ? "Select All" : `Select ${M}`, b = T ? "Clear All" : `Clear ${M}`;
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
            className: `btn-view-mode ${m === "grid" ? "active" : ""}`,
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
            className: `btn-view-mode ${m === "table" ? "active" : ""}`,
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
            const U = O.id === "all" ? c.map((H) => H.id) : O.stationIds || [], A = U.filter((H) => h.includes(H)).length;
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
        const U = o === O.id, A = O.id === "all" ? c.map((W) => W.id) : O.stationIds || [], H = A.length, oe = A.filter((W) => h.includes(W)).length;
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
                H
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
            className: `filter-pill ${y === "all" ? "active" : ""}`,
            onClick: () => f("all"),
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
            className: `filter-pill ${y === "selected" ? "active" : ""}`,
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
            className: `filter-pill ${y === "unselected" ? "active" : ""}`,
            onClick: () => f("unselected"),
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
      !S && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: D, children: [
          "+ ",
          g
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
function ix({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: i = "table"
}) {
  if (r === 0) return null;
  const a = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), h = i === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], y = t <= 1, f = (x) => {
    if (x === n) return !0;
    const v = Math.min(n, r), C = Math.min(x, r), M = Math.ceil(r / n), D = Math.ceil(r / x);
    return v !== C || M !== D;
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
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: h.map((x) => {
        const v = n === x, C = !f(x);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${v ? "active" : ""} ${C ? "redundant-disabled" : ""}`,
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
function ax({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, i] = u.useState(!1), a = u.useRef(null);
  u.useEffect(() => {
    const x = (v) => {
      a.current && !a.current.contains(v.target) && i(!1);
    };
    return o && document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [o]);
  const c = u.useMemo(() => {
    const x = new Map(t.map((v) => [v.id, v]));
    return e.map((v) => x.get(v) || { id: v, hostname: `Station ${v}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const h = c.slice(0, l), y = c.slice(l), f = y.length > 0;
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
        const v = x.displayName || x.hostname || x.name || x.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: v, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: v }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (C) => {
                C.stopPropagation(), n(x.id);
              },
              title: `Remove ${v}`,
              children: "✕"
            }
          )
        ] }, x.id);
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
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: y.map((x) => {
            const v = x.displayName || x.hostname || x.name || x.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: v, children: v }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(x.id),
                  title: `Remove ${v}`,
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
function cx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (i) => String(i).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function ux(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function dx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = vp) {
  const { baseEpochMs: l, durationMs: o } = n, i = !!(e != null && e.hasAudio), a = (e == null ? void 0 : e.audioChannels) || (i ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), h = (e == null ? void 0 : e.fps) || 30, y = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? ux(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const N = zd(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: i,
      audioChannels: a,
      resolution: c,
      fps: h,
      fileSize: y,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: N,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const f = l, x = l + o, v = [];
  for (const N of t) {
    const T = Math.max(N.startEpoch, f), g = Math.min(N.endEpoch, x);
    g > T && v.push({ startEpoch: T, endEpoch: g });
  }
  v.sort((N, T) => N.startEpoch - T.endEpoch);
  const C = [];
  for (const N of v)
    if (C.length === 0)
      C.push({ ...N });
    else {
      const T = C[C.length - 1];
      N.startEpoch <= T.endEpoch + 1e3 ? T.endEpoch = Math.max(T.endEpoch, N.endEpoch) : C.push({ ...N });
    }
  let M = 0;
  for (const N of C)
    M += N.endEpoch - N.startEpoch;
  const D = o > 0 ? M / o * 100 : 0, k = D > 0 && D < 1 ? Number(D.toFixed(1)) : Math.min(100, Math.round(D)), m = [];
  let d = f, S = 0;
  for (const N of C) {
    if (N.startEpoch > d + 2e3) {
      const b = (N.startEpoch - d) / o * 100, O = (d - f) / o * 100;
      m.push({
        type: "gap",
        startPct: Math.max(0, O),
        widthPct: Math.min(100, b)
      }), S++;
    }
    const T = (N.endEpoch - N.startEpoch) / o * 100, g = (N.startEpoch - f) / o * 100;
    m.push({
      type: "rec",
      startPct: Math.max(0, g),
      widthPct: Math.min(100, T)
    }), d = N.endEpoch;
  }
  if (d < x - 2e3) {
    const N = (x - d) / o * 100, T = (d - f) / o * 100;
    m.push({
      type: "gap",
      startPct: Math.max(0, T),
      widthPct: Math.min(100, N)
    }), S++;
  }
  const E = S > 0 || k < 100, j = zd(k, E, r);
  return {
    coveragePct: k,
    recordedDuration: cx(M),
    totalRecordedMs: M,
    hasAudio: i,
    audioChannels: a,
    resolution: c,
    fps: h,
    fileSize: y,
    hasGaps: E,
    gapsCount: S,
    trafficStatus: j,
    segments: m.length > 0 ? m : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const hx = Object.freeze([]), fx = 12;
function px({
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
  onApply: y,
  onOpenRangeModal: f,
  systemTabs: x = hx,
  recordingSegments: v = {},
  baseEpochMs: C = 0,
  durationMs: M = 0
}) {
  const [D, k] = u.useState([]), [m, d] = u.useState("all"), [S, E] = u.useState(""), [j, N] = u.useState(!0), [T, g] = u.useState("all"), [b, O] = u.useState(null), [U, A] = u.useState(!1), [H, oe] = u.useState(15), [W, re] = u.useState(8), [I, R] = u.useState(1), _ = u.useRef(!1), V = u.useRef(null), F = c && r.length === 0, ne = r.length === 0 && !c;
  let Z = "is-closed";
  a || ne || F ? Z = "is-full-width" : e && (Z = "is-open"), u.useLayoutEffect(() => {
    const ae = () => {
      if (!V.current) return;
      const he = V.current.clientHeight;
      if (he <= 0) return;
      const Pe = V.current.querySelector(".station-row, .hub-table-row"), We = Pe ? Pe.offsetHeight : 40;
      if (We > 0) {
        const xe = Math.floor(he / We) - 2, Ue = [5, 10, 15, 20, 25, 30].filter((Yt) => Yt <= xe).pop() || 5;
        oe(Ue);
      }
      const Ve = V.current.clientWidth;
      if (Ve > 0) {
        const Ue = Math.max(1, Math.floor((Ve + 12) / 252)), ze = Math.max(1, Math.floor((he + 12) / (175 + 12))), ct = Math.max(Ue * ze, Ue);
        re(ct);
      }
    };
    ae(), window.addEventListener("resize", ae);
    const we = new ResizeObserver(ae);
    return V.current && we.observe(V.current), () => {
      window.removeEventListener("resize", ae), we.disconnect();
    };
  }, [b, r.length]), u.useEffect(() => {
    if (x && x.length > 0) {
      k(x);
      return;
    }
    if (_.current || !e && !a) return;
    _.current = !0;
    let ae = !0;
    return (async () => {
      A(!0);
      try {
        const he = await fetch("/api/v1/dashboard/tabs");
        if (he.ok && ae) {
          const Pe = await he.json();
          Array.isArray(Pe) && k(Pe);
        }
      } catch (he) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", he);
      } finally {
        ae && A(!1);
      }
    })(), () => {
      ae = !1;
    };
  }, [e, a, x]);
  const G = u.useMemo(() => {
    const ae = D.length > 0 ? D : x;
    if (ae && ae.length > 0) {
      const we = ae.map((he) => {
        const Pe = he.hostnames || he.assignedHostnames || he.stations || he.stationIds || [], We = r.filter((Ve) => {
          const xe = (Ve.hostname || Ve.name || "").trim().toLowerCase();
          return Pe.some((vt) => typeof vt == "string" ? vt.trim().toLowerCase() === xe || xe.includes(vt.trim().toLowerCase()) : (vt.hostname || vt.name || "").trim().toLowerCase() === xe);
        }).map((Ve) => Ve.id);
        return {
          id: String(he.id || he.tabId || he.name),
          name: he.name || "Tab",
          stationIds: We
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((he) => he.id) },
        ...we.filter((he) => he.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((we) => we.id) }];
  }, [D, x, r]), se = u.useMemo(() => G.find((ae) => ae.id === m) || G[0], [G, m]), _e = u.useMemo(() => !se || se.id === "all" ? r.map((ae) => ae.id) : se.stationIds || [], [se, r]), De = u.useMemo(() => !v || Object.keys(v).length === 0 ? r.filter((ae) => ae.isLoaded || ae.segments && ae.segments.length > 0).length : r.filter((ae) => v[ae.id] !== void 0 || ae.isLoaded).length, [r, v]), Se = u.useMemo(() => !!(h || c && r.length > 0 || r.length > 0 && De < r.length && Object.keys(v).length > 0), [h, c, r.length, De, v]), Q = u.useMemo(() => {
    const ae = /* @__PURE__ */ new Map(), we = { baseEpochMs: C, durationMs: M };
    for (const he of r) {
      const We = !(v && v[he.id] !== void 0 || he.isLoaded === !0 || he.segments && he.segments.length > 0) && (Se || c || h), Ve = v && v[he.id] || he.segments || [], xe = dx(he, Ve, we);
      ae.set(he.id, {
        ...xe,
        hasAudio: he.hasAudio !== void 0 ? he.hasAudio : xe == null ? void 0 : xe.hasAudio,
        audioLabel: he.audioLabel || (he.hasAudio ? "AAC" : (xe == null ? void 0 : xe.audioLabel) || "NONE"),
        audioChannels: he.audioChannels ? he.audioChannels === 1 ? "Mono" : "Stereo" : xe == null ? void 0 : xe.audioChannels,
        feedSpec: he.feedSpec || (xe == null ? void 0 : xe.feedSpec) || `${he.resolution || "1080p"} • ${he.fps || 30}fps`,
        resolution: he.resolution || (xe == null ? void 0 : xe.resolution) || "1080p",
        fps: he.fps || (xe == null ? void 0 : xe.fps) || 30,
        isLoading: We
      });
    }
    return ae;
  }, [r, v, C, M, Se, c, h]), le = u.useMemo(() => r.filter((ae) => {
    const we = Q.get(ae.id), he = v && v[ae.id] && v[ae.id].length > 0 || ae.segments && ae.segments.length > 0, Pe = we && (we.coveragePct > 0 || we.totalRecordedMs > 0), We = typeof ae.recordingsCount == "number" && ae.recordingsCount > 0;
    return we && !we.isLoading ? Pe || he : We || he;
  }), [r, Q, v]), ee = u.useMemo(() => le.filter((ae) => {
    if (se.id !== "all" && !_e.includes(ae.id) || !(ae.displayName || ae.hostname || ae.name || "").toLowerCase().includes(S.toLowerCase())) return !1;
    const he = l.includes(ae.id), Pe = Q.get(ae.id);
    return T === "selected" ? he : T === "unselected" ? !he : T === "gaps" ? Pe == null ? void 0 : Pe.hasGaps : T === "audio" ? Pe == null ? void 0 : Pe.hasAudio : !0;
  }).sort((ae, we) => j ? (ae.displayName || ae.hostname || "").localeCompare(we.displayName || we.hostname || "") : 0), [le, se, _e, S, T, l, j, Q]), te = u.useMemo(() => b !== null ? b : ee.length > fx ? "table" : "grid", [b, ee.length]), Me = te === "table" ? H : W, z = Math.max(1, Math.ceil(ee.length / Me));
  u.useEffect(() => {
    R(1);
  }, [m, S, T, te]), u.useEffect(() => {
    I > z && R(z);
  }, [z, I]);
  const K = u.useMemo(() => {
    if (Z !== "is-full-width") return ee;
    const ae = (I - 1) * Me;
    return ee.slice(ae, ae + Me);
  }, [ee, I, Me, Z]), de = () => {
    if (!i) return;
    const ae = se.id === "all" ? ee.map((we) => we.id) : _e;
    i(Array.from(/* @__PURE__ */ new Set([...l, ...ae])));
  }, pe = () => {
    if (!i) return;
    const ae = new Set(
      se.id === "all" ? ee.map((we) => we.id) : _e
    );
    i(l.filter((we) => !ae.has(we)));
  }, Ae = _e.filter((ae) => l.includes(ae)).length, $e = ee.filter((ae) => l.includes(ae.id)).length;
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
            Se && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              De,
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
            onClick: de,
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
            onClick: pe,
            disabled: $e === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                $e,
                ")"
              ] })
            ]
          }
        )
      ] }),
      Se && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? De / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: F ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : ne ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: f, children: "Change Time Scope" })
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
      Z === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Se ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Se ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Se ? `ANALYZING TIMELINE ARCHIVES • ${De} OF ${le.length} STATIONS SYNCED (${le.length > 0 ? Math.min(100, Math.round(De / le.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${le.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Se ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(De / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        ox,
        {
          searchTerm: S,
          onSearchChange: E,
          sortAlpha: j,
          onToggleSort: () => N(!j),
          effectiveTabs: G,
          selectedTabId: m,
          onSelectTab: (ae) => {
            d(ae), O(null);
          },
          isLoadingTabs: U,
          allStations: le,
          selectedStationIds: l,
          filterMode: T,
          onFilterModeChange: g,
          filteredCount: ee.length,
          selectedInTabCount: Ae,
          unselectedInTabCount: _e.length - Ae,
          activeTabName: se.name,
          onSelectAllInScope: de,
          onClearInScope: pe,
          viewMode: te,
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
              onClick: de,
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
              onClick: pe,
              disabled: $e === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  $e,
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
      Z === "is-full-width" && te === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: V,
          className: `station-list ${Z === "is-full-width" ? te === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: K.map((ae) => {
            const we = l.includes(ae.id), he = Q.get(ae.id);
            return Z === "is-full-width" ? te === "grid" ? /* @__PURE__ */ s.jsx(
              sx,
              {
                station: ae,
                isSelected: we,
                onToggle: o,
                meta: he
              },
              ae.id
            ) : /* @__PURE__ */ s.jsx(
              rx,
              {
                station: ae,
                isSelected: we,
                onToggle: o,
                meta: he
              },
              ae.id
            ) : /* @__PURE__ */ s.jsx(
              lx,
              {
                station: ae,
                isSelected: we,
                onToggle: o,
                meta: he
              },
              ae.id
            );
          })
        }
      ),
      Z === "is-full-width" && /* @__PURE__ */ s.jsx(
        ix,
        {
          currentPage: I,
          totalPages: z,
          pageSize: Me,
          totalItems: ee.length,
          onPageChange: R,
          onPageSizeChange: (ae) => {
            te === "table" ? oe(ae) : re(ae), R(1);
          },
          viewMode: te
        }
      ),
      Z === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          ax,
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
const In = (e) => String(e).padStart(2, "0"), mx = [
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
], gx = [
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
  const [i, a] = u.useState(e), [c, h] = u.useState(null), y = u.useRef(null), { h: f, m: x, s: v } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const g = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, g[0] || 0)),
      m: Math.min(59, Math.max(0, g[1] || 0)),
      s: Math.min(59, Math.max(0, g[2] || 0))
    };
  }, [e]), C = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    a(e);
  }, [e]);
  const M = () => {
    const b = i.replace(/[^0-9:]/g, "").trim().split(":").filter((oe) => oe.length > 0);
    let O = 0, U = 0, A = 0;
    b.length >= 1 && (O = Math.min(23, Math.max(0, parseInt(b[0], 10) || 0))), b.length >= 2 && (U = Math.min(59, Math.max(0, parseInt(b[1], 10) || 0))), b.length >= 3 && l && (A = Math.min(59, Math.max(0, parseInt(b[2], 10) || 0)));
    const H = l ? `${In(O)}:${In(U)}:${In(A)}` : `${In(O)}:${In(U)}`;
    a(H), t && t(H, { h: O, m: U, s: A });
  }, D = (g) => {
    let b = f;
    g === "AM" && f >= 12 ? b = f - 12 : g === "PM" && f < 12 && (b = f + 12);
    const O = l ? `${In(b)}:${In(x)}:${In(v)}` : `${In(b)}:${In(x)}`;
    a(O), t && t(O, { h: b, m: x, s: v });
  }, k = u.useCallback((g, b) => {
    if (!y.current) return null;
    const O = y.current.getBoundingClientRect(), U = O.left + O.width / 2, A = O.top + O.height / 2, H = g.clientX - U, oe = g.clientY - A;
    let W = Math.atan2(oe, H) * 180 / Math.PI + 90;
    if (W < 0 && (W += 360), b === "hours") {
      const re = Math.round(W / 30) % 12;
      return C ? re === 0 ? 12 : re + 12 : re === 0 ? 0 : re;
    }
    return Math.round(W / 6) % 60;
  }, [C]), m = u.useCallback((g, b) => {
    let O = f, U = x, A = v;
    g === "hours" ? O = b : g === "minutes" ? U = b : g === "seconds" && (A = b);
    const H = l ? `${In(O)}:${In(U)}:${In(A)}` : `${In(O)}:${In(U)}`;
    a(H), t && t(H, { h: O, m: U, s: A });
  }, [f, x, v, l, t]), d = (g, b) => {
    b.preventDefault(), b.stopPropagation(), h(g);
    const O = k(b, g);
    O !== null && m(g, O);
  };
  u.useEffect(() => {
    if (!c) return;
    const g = (O) => {
      const U = k(O, c);
      U !== null && m(c, U);
    }, b = () => {
      h(null);
    };
    return window.addEventListener("pointermove", g), window.addEventListener("pointerup", b), () => {
      window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", b);
    };
  }, [c, k, m]);
  const S = u.useMemo(() => f % 12 * 30, [f]), E = u.useMemo(() => x % 60 * 6, [x]), j = u.useMemo(() => v % 60 * 6, [v]), N = C ? gx : mx, T = u.useMemo(() => {
    const g = [];
    for (let b = 0; b < 60; b++) {
      const O = (b * 6 - 90) * (Math.PI / 180), U = b % 5 === 0, A = 104, H = U ? 93 : 98;
      g.push({
        index: b,
        x1: 110 + H * Math.cos(O),
        y1: 110 + H * Math.sin(O),
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
            onBlur: M,
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
        ref: y,
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
            const b = (g.angle - 90) * (Math.PI / 180), O = 76, U = 110 + O * Math.cos(b), A = 110 + O * Math.sin(b), H = f === g.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: U,
                y: A,
                className: `dial-num ${H ? "selected" : ""}`,
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
const Fo = 7 * 24 * 60 * 60 * 1e3, Dt = (e) => String(e).padStart(2, "0");
function xx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: i
}) {
  const [a, c] = u.useState(""), [h, y] = u.useState(""), [f, x] = u.useState("00:00:00"), [v, C] = u.useState("00:00:00"), [M, D] = u.useState(() => /* @__PURE__ */ new Date()), [k, m] = u.useState(null), [d, S] = u.useState([]), [E, j] = u.useState(!1), [N, T] = u.useState(""), [g, b] = u.useState(1), [O, U] = u.useState(2), [A, H] = u.useState(null), oe = u.useCallback(() => {
    try {
      const z = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (z) {
        const K = JSON.parse(z);
        Array.isArray(K) && S(K);
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
    let z = n == null ? void 0 : n.startEpochMs, K = n == null ? void 0 : n.endEpochMs;
    if (!z || isNaN(z))
      if (n != null && n.start) {
        const Ae = String(n.start).replace(" ", "T"), $e = new Date(Ae).getTime();
        z = isNaN($e) ? Date.now() - 24 * 3600 * 1e3 : $e;
      } else
        K = Date.now(), z = K - 24 * 3600 * 1e3;
    if (!K || isNaN(K))
      if (n != null && n.end) {
        const Ae = String(n.end).replace(" ", "T"), $e = new Date(Ae).getTime();
        K = isNaN($e) ? Date.now() : $e;
      } else
        K = z + 24 * 3600 * 1e3;
    H(null);
    const de = Cr(z, o), pe = Cr(K, o);
    c(`${de.year}-${Dt(de.month)}-${Dt(de.day)}`), y(`${pe.year}-${Dt(pe.month)}-${Dt(pe.day)}`), x(`${Dt(de.hour)}:${Dt(de.minute)}:${Dt(de.second)}`), C(`${Dt(pe.hour)}:${Dt(pe.minute)}:${Dt(pe.second)}`), D(new Date(Date.UTC(de.year, de.month - 1, 1)));
  }, [e, n, o, oe]);
  const W = u.useCallback(() => {
    a && !h && y(a);
  }, [a, h]), re = h || a, I = u.useMemo(() => a ? `${a}T${f}` : "", [a, f]), R = u.useMemo(() => re ? `${re}T${v}` : "", [re, v]), _ = u.useMemo(() => {
    const z = {};
    return d.forEach((K) => {
      const de = K.startTime || K.start, pe = K.endTime || K.end || de;
      if (!de) return;
      const Ae = String(de).substring(0, 10), $e = String(pe).substring(0, 10), [ae, we, he] = Ae.split("-").map(Number), [Pe, We, Ve] = $e.split("-").map(Number);
      if (isNaN(ae) || isNaN(we) || isNaN(he) || isNaN(Pe) || isNaN(We) || isNaN(Ve)) return;
      let xe = new Date(Date.UTC(ae, we - 1, he));
      const vt = new Date(Date.UTC(Pe, We - 1, Ve));
      for (; xe.getTime() <= vt.getTime(); ) {
        const Ue = `${xe.getUTCFullYear()}-${Dt(xe.getUTCMonth() + 1)}-${Dt(xe.getUTCDate())}`;
        z[Ue] || (z[Ue] = []), z[Ue].push(K), xe.setUTCDate(xe.getUTCDate() + 1);
      }
    }), z;
  }, [d]), V = async (z, K) => {
    if (K && K.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const de = d.filter((pe) => (pe.id || pe.startTime) !== z);
    S(de);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(de)), localStorage.setItem("itb_bookmarks", JSON.stringify(de)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: de }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${z}`, { method: "DELETE" });
    } catch {
    }
  }, F = (z) => {
    const K = z.startTime || z.start, de = z.endTime || z.end;
    if (!K || !de) return;
    const pe = K.substring(0, 10), Ae = K.includes("T") ? K.split("T")[1].substring(0, 8) : "00:00:00", $e = de.substring(0, 10), ae = de.includes("T") ? de.split("T")[1].substring(0, 8) : "23:59:59";
    c(pe), y($e), x(Ae), C(ae);
    const [we, he] = pe.split("-").map(Number);
    D(new Date(Date.UTC(we, he - 1, 1))), j(!1);
  }, ne = (z) => {
    l ? (l(z), t && t()) : F(z);
  }, Z = u.useMemo(() => {
    if (o === "UTC" || !I.includes("T")) return { isAmbiguous: !1 };
    const [z, K] = I.split("T");
    return Ci(z, K);
  }, [I, o]), G = u.useMemo(() => {
    if (o === "UTC" || !R.includes("T")) return { isAmbiguous: !1 };
    const [z, K] = R.split("T");
    return Ci(z, K);
  }, [R, o]), se = u.useMemo(() => {
    if (!a || !re) return null;
    const z = yc(a, f, o, g), K = yc(re, v, o, O);
    return z === null || K === null || isNaN(z) || isNaN(K) ? null : { startEpoch: z, endEpoch: K, durationMs: K - z };
  }, [a, f, re, v, o, g, O]), _e = u.useMemo(() => !se || se.durationMs <= 0 ? [] : cp(se.startEpoch, se.endEpoch), [se]), De = u.useMemo(() => {
    if (!se || se.durationMs <= 0) return "0h";
    const z = se.durationMs / (1e3 * 60 * 60);
    return z >= 24 ? `${(z / 24).toFixed(1)}d (${z.toFixed(0)}h)` : `${z.toFixed(1)}h`;
  }, [se]), Se = u.useMemo(() => {
    const z = M.getUTCFullYear(), K = M.getUTCMonth(), de = new Date(Date.UTC(z, K, 1)).getUTCDay(), pe = new Date(Date.UTC(z, K + 1, 0)).getUTCDate(), Ae = [];
    for (let $e = 0; $e < de; $e++) Ae.push(null);
    for (let $e = 1; $e <= pe; $e++) Ae.push(`${z}-${Dt(K + 1)}-${Dt($e)}`);
    return Ae;
  }, [M]), Q = (z) => {
    if (z) {
      if (H(null), !a || a && h)
        c(z), y("");
      else if (a && !h)
        if (z < a)
          c(z), y("");
        else {
          const K = (/* @__PURE__ */ new Date(a + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(z + "T00:00:00Z")).getTime() - K > Fo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const pe = new Date(K + Fo);
            y(`${pe.getUTCFullYear()}-${Dt(pe.getUTCMonth() + 1)}-${Dt(pe.getUTCDate())}`);
          } else
            y(z);
        }
    }
  }, le = (z, K) => {
    H(K);
    const de = Date.now(), pe = de - z, Ae = Cr(pe, o), $e = Cr(de, o);
    c(`${Ae.year}-${Dt(Ae.month)}-${Dt(Ae.day)}`), y(`${$e.year}-${Dt($e.month)}-${Dt($e.day)}`), x(`${Dt(Ae.hour)}:${Dt(Ae.minute)}:${Dt(Ae.second)}`), C(`${Dt($e.hour)}:${Dt($e.minute)}:${Dt($e.second)}`), D(new Date(Date.UTC(Ae.year, Ae.month - 1, 1)));
  }, ee = () => {
    if (W(), !se || isNaN(se.startEpoch) || isNaN(se.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (se.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (se.durationMs > Fo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: I,
      end: R,
      startEpochMs: se.startEpoch,
      endEpochMs: se.endEpoch,
      durationMs: se.durationMs,
      timeMode: o
    }), t && t();
  }, te = u.useMemo(() => {
    if (!N.trim()) return d;
    const z = N.toLowerCase();
    return d.filter(
      (K) => (K.title || K.name || "").toLowerCase().includes(z) || (K.startTime || "").includes(z)
    );
  }, [d, N]);
  if (!e) return null;
  const Me = o === "UTC";
  return Bs.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (z) => z.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${Me ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: Me ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            i && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Me ? "" : "active"}`,
                  onClick: () => i("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${Me ? "active" : ""}`,
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
      _e.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: _e.map((z) => `${z.description} (${z.labelBefore} ➔ ${z.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${A === "7d" ? "active" : ""}`,
            onClick: () => le(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => le(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => le(24 * 3600 * 1e3, "24h"),
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
            onClick: () => le(8 * 3600 * 1e3, "8h"),
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
            te.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: te.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : te.map((z) => {
          var $e;
          const K = z.id || z.startTime, de = z.title || z.name || "Untitled Mission", pe = (z.startTime || "").replace("T", " "), Ae = (z.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => F(z), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: de }),
                z.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  z.cutStationName
                ] }),
                (($e = z.stationIds) == null ? void 0 : $e.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  z.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                pe,
                " ➔ ",
                Ae
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (ae) => {
                    ae.stopPropagation(), F(z);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (ae) => {
                    ae.stopPropagation(), ne(z);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (ae) => V(K, ae),
                  children: "✕"
                }
              )
            ] })
          ] }, K);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: M.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Se.map((z, K) => {
            if (!z) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${K}`);
            const de = parseInt(z.split("-")[2], 10), pe = z === a, Ae = z === (h || a), $e = h || k, ae = a && $e && z > a && z < $e, we = _[z], he = !!(we && we.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${pe ? "start-edge" : ""} ${Ae ? "end-edge" : ""} ${ae ? "in-range" : ""} ${he ? "has-bookmark" : ""}`,
                onClick: () => Q(z),
                onMouseEnter: () => !h && a && m(z),
                onMouseLeave: () => m(null),
                title: he ? `${we.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: de }),
                  he && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Pe) => {
                        Pe.stopPropagation(), j(!0), T(z);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        we.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: we.length })
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: W, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            Hd,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (z) => {
                W(), x(z), H(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            Hd,
            {
              label: "END TIME (TO)",
              value: v,
              onChange: (z) => {
                W(), C(z), H(null);
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
                onClick: () => b(1),
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
                onClick: () => b(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: se && se.durationMs > Fo ? "#f43f5e" : "#22d3ee" }, children: De }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: _e.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: ee, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Np = "extractor_incident_bookmarks_fallback", yx = ["itb_studio_bookmarks", "itb_bookmarks", Np];
function vx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [i, a] = u.useState([]), [c, h] = u.useState(""), [y, f] = u.useState(!1), [x, v] = u.useState(!1), [C, M] = u.useState(null), [D, k] = u.useState(""), m = u.useCallback((A) => {
    yx.forEach((H) => {
      try {
        localStorage.setItem(H, JSON.stringify(A));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: A }));
  }, []), d = u.useCallback(async () => {
    f(!0);
    try {
      const A = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (A.ok) {
        const H = await A.json(), oe = Array.isArray(H) ? H : [];
        a(oe), m(oe);
        return;
      }
    } catch (A) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", A);
    } finally {
      f(!1);
    }
    try {
      const A = localStorage.getItem(Np) || localStorage.getItem("itb_studio_bookmarks");
      A && a(JSON.parse(A));
    } catch {
    }
  }, [m]);
  if (u.useEffect(() => {
    e && d();
  }, [e, d]), !e) return null;
  const S = async () => {
    var Z, G, se, _e, De, Se;
    if (!c.trim() || x) return;
    const A = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((Z = n == null ? void 0 : n.timeRange) != null && Z.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), H = (n == null ? void 0 : n.inPointMs) ?? 0, oe = (n == null ? void 0 : n.outPointMs) ?? (((G = n == null ? void 0 : n.timeRange) == null ? void 0 : G.durationMs) || 0), W = (n == null ? void 0 : n.playheadMs) ?? H, re = A + H, I = A + oe, R = A + W, _ = (n == null ? void 0 : n.selectedStationIds) || [], V = (n == null ? void 0 : n.selectedStationNames) || [], F = ((se = n == null ? void 0 : n.allStationIds) == null ? void 0 : se.length) > 0 ? n.allStationIds : _, ne = {
      title: c.trim(),
      startTime: ((_e = n == null ? void 0 : n.timeRange) == null ? void 0 : _e.start) || "",
      endTime: ((De = n == null ? void 0 : n.timeRange) == null ? void 0 : De.end) || "",
      baseEpochMs: A,
      timelineBaseEpochMs: A,
      inPointMs: H,
      outPointMs: oe,
      playheadMs: W,
      inEpochMs: re,
      outEpochMs: I,
      playheadEpochMs: R,
      selectedStationIds: _,
      selectedStationNames: V,
      allStationIds: F,
      stationIds: _.length > 0 ? _ : F,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    v(!0);
    try {
      const Q = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ne)
      });
      if (Q.ok) {
        const le = await Q.json(), te = [{
          ...ne,
          ...le.bookmark || {},
          inEpochMs: re,
          outEpochMs: I,
          playheadEpochMs: R,
          selectedStationIds: _,
          selectedStationNames: V,
          allStationIds: F,
          id: ((Se = le.bookmark) == null ? void 0 : Se.id) || le.id || `bm_${Date.now()}`
        }, ...i];
        a(te), m(te), h("");
      } else
        throw new Error(`Server returned ${Q.status}`);
    } catch (Q) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Q);
      const ee = [{
        ...ne,
        inEpochMs: re,
        outEpochMs: I,
        playheadEpochMs: R,
        selectedStationIds: _,
        selectedStationNames: V,
        allStationIds: F,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...i];
      a(ee), m(ee), h("");
    } finally {
      v(!1);
    }
  }, E = async (A, H) => {
    if (H.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const oe = i.filter((W) => (W.id || W.startTime) !== A);
    a(oe), m(oe);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, { method: "DELETE" });
    } catch (W) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", W);
    }
  }, j = (A, H) => {
    H.stopPropagation(), M(A.id || A.startTime), k(A.title || A.name || "");
  }, N = async (A, H) => {
    if (H && H.stopPropagation(), !D.trim()) return;
    const oe = i.find((I) => (I.id || I.startTime) === A), W = D.trim(), re = i.map(
      (I) => (I.id || I.startTime) === A ? { ...I, title: W, name: W } : I
    );
    a(re), m(re), M(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${A}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...oe, title: W })
      });
    } catch (I) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", I);
    }
  }, T = (A) => {
    A.stopPropagation(), M(null);
  }, g = (A) => !A || isNaN(A) ? "--:--:--" : kt(A, o), b = (A) => {
    const H = A.startTime || A.StartTime, oe = A.endTime || A.EndTime;
    if (!H) return "--";
    const W = String(H).replace("T", " ").substring(0, 19), re = oe ? String(oe).replace("T", " ").substring(0, 19) : W;
    return `${W} ➔ ${re}`;
  }, O = (A) => {
    let H = A.inEpochMs || A.InEpochMs, oe = A.outEpochMs || A.OutEpochMs;
    if (!H || !oe) {
      const W = A.timelineBaseEpochMs || A.baseEpochMs || (A.startTime ? new Date(String(A.startTime).replace(" ", "T")).getTime() : 0), re = A.inPointMs ?? A.InPointMs, I = A.outPointMs ?? A.OutPointMs;
      W && typeof re == "number" && typeof I == "number" && (re > 0 || I > 0) && (H = W + re, oe = W + I);
    }
    if (H && oe && !isNaN(H) && !isNaN(oe) && H > 0) {
      const W = g(H), re = g(oe), I = Math.max(0, oe - H), R = Math.floor(I / 6e4), _ = Math.floor(R / 60), V = R % 60, F = _ > 0 ? `${_}h ${V}m` : `${R}m`;
      return { timeText: `${W} ➔ ${re}`, duration: F };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, U = (A) => {
    const H = A.selectedStationNames || [], oe = A.selectedStationIds || A.cutStationIds || A.stationIds || [];
    return H.length > 0 ? H.join(", ") : oe.length > 0 ? oe.join(", ") : A.cutStationName ? A.cutStationName : A.activeStationName ? A.activeStationName : "All Stations in Scope";
  };
  return Bs.createPortal(
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
        var R, _, V;
        const H = A.id || A.startTime, oe = C === H, W = O(A), re = U(A), I = ((R = A.allStationIds) == null ? void 0 : R.length) || ((_ = A.selectedStationIds) == null ? void 0 : _.length) || ((V = A.stationIds) == null ? void 0 : V.length) || 0;
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
                        F.key === "Enter" && N(H, F), F.key === "Escape" && T(F);
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
                        onClick: (F) => N(H, F),
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
                    /* @__PURE__ */ s.jsx("strong", { children: b(A) })
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
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: W.timeText }),
                    W.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      W.duration,
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
                    onClick: (F) => E(H, F),
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
          H
        );
      }) })
    ] }) }),
    document.body
  );
}
function Nx({
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
    let f = 1 / 0, x = 1 / 0, v = -1 / 0, C = -1 / 0;
    e.forEach((k) => {
      const m = k.x ?? k.X ?? 0, d = k.y ?? k.Y ?? 0, S = k.width ?? k.Width ?? 1920, E = k.height ?? k.Height ?? 1080;
      f = Math.min(f, m), x = Math.min(x, d), v = Math.max(v, m + S), C = Math.max(C, d + E);
    });
    const M = Math.max(1, v - f), D = Math.max(1, C - x);
    return { minX: f, minY: x, totalW: M, totalH: D };
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
            children: e.map((f, x) => {
              const v = f.displayId ?? f.DisplayId ?? `mon-${x}`, C = (f.x ?? f.X ?? 0) - i.minX, M = (f.y ?? f.Y ?? 0) - i.minY, D = f.width ?? f.Width ?? 1920, k = f.height ?? f.Height ?? 1080, m = v === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${m ? "is-active" : ""}`,
                  onClick: (d) => {
                    d.stopPropagation(), n == null || n(v);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: C + 10,
                        y: M + 10,
                        width: Math.max(10, D - 20),
                        height: Math.max(10, k - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: C + D / 2,
                        y: M + k / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: x + 1
                      }
                    )
                  ]
                },
                v
              );
            })
          }
        ) })
      ]
    }
  );
}
function kx(e) {
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
function wx(e, t) {
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
function jx({
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
  outPointMs: y = 36e5,
  isLooping: f = !0,
  recordingSegments: x = {},
  globalGaps: v = [],
  showWatermark: C = !0,
  directorPlan: M,
  onOverrideDisplay: D,
  onResetOverride: k,
  viewMode: m,
  onViewModeChange: d,
  onOpenFullscreen: S,
  isPipSwapped: E,
  onPipSwapChange: j,
  className: N = ""
}) {
  const T = u.useRef(null), g = u.useRef(null), b = u.useRef(null), O = u.useRef(r), U = u.useRef(r), A = u.useRef(r), H = u.useRef(!1), oe = u.useRef(null), W = u.useRef(o), re = u.useRef(!1);
  O.current = r;
  const I = e == null ? void 0 : e.id, R = e && (e.hostname || e.name) || "", _ = u.useMemo(() => {
    var Ne, Le, Ge, qe;
    const q = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ne = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ne.displays) || ((Le = e == null ? void 0 : e.displayTopology) == null ? void 0 : Le.Displays) || ((Ge = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : Ge.Displays) || ((qe = e == null ? void 0 : e.topology) == null ? void 0 : qe.displays) || [];
    if (!Array.isArray(q) || q.length === 0) return [];
    const me = q.length > 1 && q.every((Ze) => (Ze.X ?? Ze.x ?? 0) === 0 && (Ze.Y ?? Ze.y ?? 0) === 0);
    let J = 0;
    return q.map((Ze, Ye) => {
      const lt = Ze.Width || Ze.width || 1920, xt = Ze.Height || Ze.height || 1080, ot = me ? J : Ze.X ?? Ze.x ?? Ye * lt, Lt = me ? 0 : Ze.Y ?? Ze.y ?? 0;
      me && (J += lt);
      const Xt = (Ze.displayId ?? Ze.DisplayId ?? `mon-${Ye}`).toLowerCase(), Gt = Ze.displayNumber ?? Ze.DisplayNumber ?? Ye + 1, Ot = (Ze.displayName || Ze.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${Gt}`, Cs = !!(Ze.isPrimary ?? Ze.IsPrimary ?? Ye === 0);
      return {
        ...Ze,
        displayId: Xt,
        DisplayId: Xt,
        displayIndex: Ye,
        displayNumber: Gt,
        DisplayNumber: Gt,
        displayName: Ot,
        DisplayName: Ot,
        isPrimary: Cs,
        IsPrimary: Cs,
        x: ot,
        y: Lt,
        X: ot,
        Y: Lt,
        width: lt,
        height: xt,
        Width: lt,
        Height: xt
      };
    });
  }, [e]), V = _.length > 1, [F, ne] = u.useState(() => {
    if (!V) return "mon-0";
    try {
      const q = localStorage.getItem("itb_solo_viewmode");
      if (q) return q;
    } catch {
    }
    return "canvas";
  }), G = V ? m !== void 0 ? m : F : "mon-0", se = u.useCallback((q) => {
    const me = typeof q == "function" ? q(G) : q;
    ne(me);
    try {
      localStorage.setItem("itb_solo_viewmode", me);
    } catch {
    }
    d && d(me);
  }, [G, d]), [_e, De] = u.useState(!1), Se = E !== void 0 ? E : _e, Q = u.useCallback((q) => {
    const me = typeof q == "function" ? q(Se) : q;
    De(me), j && j(me);
  }, [Se, j]), le = u.useMemo(() => {
    const q = M || (e == null ? void 0 : e.directorPlan);
    if (!q || !q.segments || q.segments.length === 0) return null;
    const me = t + r;
    return q.segments.find((J) => {
      const Ne = J.startEpochMs ?? J.StartEpochMs ?? 0, Le = J.endEpochMs ?? J.EndEpochMs ?? 0;
      return me >= Ne && me <= Le;
    }) || q.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t, r]), ee = u.useMemo(() => {
    var q, me;
    if (!V) return "mon-0";
    if (G === "split" || G === "pip" || G === "canvas" || G === "all-displays") {
      const J = (((q = _[0]) == null ? void 0 : q.displayId) ?? "mon-0").toLowerCase(), Ne = (((me = _[1]) == null ? void 0 : me.displayId) ?? "mon-1").toLowerCase();
      return Se ? Ne : J;
    }
    return G !== "director" ? G.toLowerCase() : ((le == null ? void 0 : le.targetDisplayId) ?? (le == null ? void 0 : le.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [V, G, le, _, Se]), te = u.useMemo(() => {
    var me;
    if (!V) return null;
    const q = _.find((J) => (J.displayId ?? J.DisplayId ?? "").toLowerCase() !== ee);
    return q ? (q.displayId ?? q.DisplayId).toLowerCase() : (((me = _[1]) == null ? void 0 : me.displayId) || "mon-1").toLowerCase();
  }, [V, _, ee]), Me = u.useMemo(() => {
    const q = _.find((J) => (J.displayId ?? "").toLowerCase() === (ee || "").toLowerCase());
    if (q) return q.displayName || `Screen ${q.displayNumber || 1}`;
    if (ee === "mon-0" || ee === "0") return "Screen 1";
    if (ee === "mon-1" || ee === "1") return "Screen 2";
    const me = (ee || "").match(/\d+/);
    if (me) {
      const J = parseInt(me[0], 10);
      return `Screen ${(ee || "").startsWith("mon-") ? J + 1 : J}`;
    }
    return (ee || "Screen 1").toUpperCase();
  }, [_, ee]), z = u.useMemo(() => {
    const q = _.find((me) => (me.displayId ?? "").toLowerCase() === (te || "").toLowerCase());
    return q ? q.displayName || `Screen ${q.displayNumber || 2}` : "Screen 2";
  }, [_, te]), K = u.useMemo(() => G !== "director" && G !== "split" && G !== "pip" && G !== "canvas" ? !0 : !!((le == null ? void 0 : le.isManualOverride) ?? (le == null ? void 0 : le.IsManualOverride)), [G, le]), [de, pe] = u.useState({}), Ae = u.useRef(null), [$e, ae] = u.useState({ width: 0, height: 0 }), we = u.useMemo(() => kx(_), [_]);
  u.useEffect(() => {
    if (!V || G !== "canvas" && G !== "all-displays" || o)
      return;
    const q = () => {
      const J = Ae.current;
      if (!J) return;
      const Ne = 48, Le = 72, Ge = Math.max(100, J.clientWidth - Ne), qe = Math.max(100, J.clientHeight - Le), Ze = we.totalWidth || 1920, Ye = we.totalHeight || 1080, lt = Ze / Ye;
      let xt = Ge, ot = xt / lt;
      ot > qe && (ot = qe, xt = ot * lt), ae({ width: Math.round(xt), height: Math.round(ot) });
    };
    q();
    const me = new ResizeObserver(q);
    return Ae.current && me.observe(Ae.current), () => me.disconnect();
  }, [V, G, we]);
  const he = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!V || G !== "canvas" && G !== "all-displays")
      return;
    let q = !0;
    const me = new AbortController(), J = he;
    _.forEach((Le, Ge) => {
      const qe = (Le.displayId ?? Le.DisplayId ?? `mon-${Ge}`).toLowerCase(), Ze = Tn.get(R, J, qe);
      Ze ? pe((Ye) => ({ ...Ye, [qe]: Ze })) : Tn.fetchFrame(R, J, me.signal, qe).then((Ye) => {
        q && Ye && pe((lt) => ({ ...lt, [qe]: Ye }));
      });
    });
    const Ne = Tn.subscribe((Le, Ge, qe, Ze) => {
      Le === R && Ge === J && Ze && q && pe((Ye) => ({ ...Ye, [Ze.toLowerCase()]: qe }));
    });
    return () => {
      q = !1, me.abort(), Ne();
    };
  }, [V, G, _, R, he]);
  const Pe = u.useRef(ee), We = u.useMemo(() => e ? x[e.id] || x[e.hostname] || e.segments || [] : [], [e, x]), Ve = t + r, xe = u.useMemo(() => We.length === 0 ? !0 : We.some((q) => {
    const me = (q.startEpochMs ?? q.startEpoch ?? 0) - 2e3, J = (q.endEpochMs ?? q.endEpoch ?? 0) + 2e3;
    return Ve >= me && Ve <= J;
  }), [We, Ve]), vt = !xe && We.length > 0, [Ue, Yt] = u.useState("A"), [ze, ct] = u.useState(""), [on, $t] = u.useState(""), [gn, Ke] = u.useState(""), [Nt, Sn] = u.useState(null), [gt, Et] = u.useState(!1), [On, wt] = u.useState(!1), [At, Ut] = u.useState(() => {
    if (!R) return null;
    const q = Math.round(t + r);
    return Tn.get(R, q, ee) || null;
  }), [qt, un] = u.useState(null), Dn = Ue === "A" ? T : g, be = u.useCallback(() => {
    const q = cl();
    T.current && (T.current.volume = q.volume, T.current.muted = Ue !== "A" || q.isMuted, T.current.defaultPlaybackRate = a, T.current.playbackRate = a, Ue === "A" && !q.isMuted && Si(T.current)), g.current && (g.current.volume = q.volume, g.current.muted = Ue !== "B" || q.isMuted, g.current.defaultPlaybackRate = a, g.current.playbackRate = a, Ue === "B" && !q.isMuted && Si(g.current)), b.current && (b.current.muted = !0, b.current.defaultPlaybackRate = a, b.current.playbackRate = a);
  }, [Ue, a]);
  u.useEffect(() => {
    const q = (me) => {
      me.detail && (T.current && (T.current.volume = me.detail.volume), g.current && (g.current.volume = me.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", q), () => window.removeEventListener("itb-audio-state-changed", q);
  }, []), u.useEffect(() => {
    T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a), b.current && (b.current.defaultPlaybackRate = a, b.current.playbackRate = a);
  }, [a]), u.useEffect(() => {
    if (!I || !R) return;
    if (o) {
      W.current = !0;
      return;
    }
    const q = W.current;
    W.current = o;
    let me = !0;
    const J = new AbortController(), Ne = Math.round(t + r), Le = Tn.get(R, Ne, ee);
    if (Le) {
      Ut(Le);
      return;
    }
    const qe = setTimeout(() => {
      me && Tn.fetchFrame(R, Ne, J.signal, ee).then((Ye) => {
        me && Ye && Ut(Ye);
      });
    }, q ? 25 : 35), Ze = Tn.subscribe((Ye, lt, xt, ot) => {
      Ye === R && lt === Ne && (!ot || ot === ee) && me && Ut(xt);
    });
    return () => {
      me = !1, clearTimeout(qe), J.abort(), Ze();
    };
  }, [I, R, t, r, o, gt, ee]), u.useEffect(() => {
    if (!V || G !== "split" && G !== "pip" || !te || o) {
      un(null);
      return;
    }
    let q = !0;
    const me = new AbortController(), J = Math.round(t + r), Ne = Tn.get(R, J, te);
    if (Ne) {
      un(Ne);
      return;
    }
    const Le = setTimeout(() => {
      q && Tn.fetchFrame(R, J, me.signal, te).then((qe) => {
        q && qe && un(qe);
      });
    }, 40), Ge = Tn.subscribe((qe, Ze, Ye, lt) => {
      qe === R && Ze === J && (!lt || lt === te) && q && un(Ye);
    });
    return () => {
      q = !1, clearTimeout(Le), me.abort(), Ge();
    };
  }, [V, G, te, I, R, t, r]);
  const Ie = u.useCallback((q, me = ee) => {
    const J = Math.round(t), Ne = Math.round(t + n), Le = Math.min(Ne, Math.max(J, Math.round(t + q)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(R)}&startEpoch=${J}&endEpoch=${Ne}&seekEpoch=${Le}&displayId=${encodeURIComponent(me)}&_t=${Date.now()}`;
  }, [t, n, R, ee]);
  u.useEffect(() => {
    if (!(!I || !R))
      if (o && xe) {
        const q = O.current;
        U.current = q, A.current = q, H.current = !1;
        const me = Ie(q, ee);
        Et(!1), wt(!0), Yt("A"), ct(me), $t(""), Sn(null), Ke((G === "split" || G === "pip") && te ? Ie(q, te) : "");
      } else o || (oe.current && clearTimeout(oe.current), H.current = !1, ct(""), $t(""), Ke(""), Sn(null), Et(!1), wt(!1), T.current && T.current.pause(), g.current && g.current.pause(), b.current && b.current.pause());
  }, [o, I, R, xe, Ie, ee, G, te]), u.useEffect(() => {
    if (Pe.current !== ee && (Pe.current = ee, o && xe)) {
      const q = O.current;
      U.current = q;
      const me = Ie(q, ee);
      Et(!1), wt(!0), Yt("A"), ct(me), $t("");
    }
  }, [ee, o, xe, Ie]), u.useEffect(() => {
    if (!I || !R) return;
    const q = Math.abs(r - A.current);
    if (!o || q < 15) {
      A.current = r;
      return;
    }
    return H.current = !0, A.current = r, U.current = r, T.current && T.current.pause(), g.current && g.current.pause(), b.current && b.current.pause(), Et(!1), wt(!0), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!xe) {
        ct(""), $t(""), Ke(""), wt(!1), H.current = !1;
        return;
      }
      const me = O.current, J = Ie(me, ee);
      Yt("A"), ct(J), $t(""), Sn(null), (G === "split" || G === "pip") && te && Ke(Ie(me, te));
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [r, o, I, R, xe, Ie, ee, G, te]), u.useEffect(() => {
    if (!o || !gt || We.length === 0) return;
    const q = t + O.current, me = We.map((J) => ({
      start: J.startEpochMs ?? J.startEpoch ?? 0,
      end: J.endEpochMs ?? J.endEpoch ?? 0
    })).filter((J) => J.start > q + 500).sort((J, Ne) => J.start - Ne.start)[0];
    if (me && (!Nt || Nt.start !== me.start)) {
      const J = me.start - t;
      if (J < y) {
        const Ne = Ie(J, ee);
        Sn({ start: me.start, ms: J }), Ue === "A" ? $t(Ne) : ct(Ne);
      }
    }
  }, [o, gt, r, t, y, We, Nt, Ue, Ie, ee]);
  const Xe = u.useCallback(() => {
    if (Nt) {
      const q = Ue === "A" ? "B" : "A", me = q === "A" ? T : g;
      Yt(q), U.current = Nt.ms, A.current = Nt.ms, Sn(null), me.current && me.current.play().then(() => {
        be();
      }).catch(() => {
      });
    } else
      f ? l(h) : i(!1);
  }, [Nt, Ue, be, f, h, l, i]), ut = u.useCallback(() => {
    const q = Dn.current;
    if (!q || H.current || !o || re.current) return;
    const me = q.currentTime * 1e3, J = Math.round(U.current + me);
    if (v && v.length > 0) {
      const Ne = t + J, Le = v.find((Ge) => Ne >= Ge.startEpochMs && Ne < Ge.endEpochMs);
      if (Le) {
        re.current = !0;
        const Ge = Math.round(Le.endEpochMs - t) + 10;
        l(Ge), setTimeout(() => {
          re.current = !1;
        }, 150);
        return;
      }
    }
    if (J >= y) {
      f ? l(h) : (i(!1), l(y));
      return;
    }
    A.current = J, l(J);
  }, [Dn, o, t, v, y, f, h, l, i]), Ct = On && o && !vt;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${G} ${N}`, children: [
    V && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (q) => q.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "director" ? "active" : ""}`,
          onClick: () => se("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "canvas" ? "active" : ""}`,
          onClick: () => se("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "split" ? "active" : ""}`,
          onClick: () => se("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${G === "pip" ? "active" : ""}`,
          onClick: () => se("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      _.map((q, me) => {
        const J = (q.displayId ?? `mon-${me}`).toLowerCase(), Ne = q.displayNumber ?? me + 1, Le = q.displayName || `Screen ${Ne}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${G === J ? "active" : ""}`,
            onClick: () => se(J),
            title: `Pin directly to ${Le}`,
            children: [
              "🖥️ ",
              Ne
            ]
          },
          J
        );
      }),
      G === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          _.map((q, me) => {
            const J = (q.displayId ?? `mon-${me}`).toLowerCase(), Ne = q.displayNumber ?? me + 1, Le = q.displayName || `Screen ${Ne}`, Ge = ee === J;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${Ge ? "active" : ""} ${K && Ge ? "is-override" : ""}`,
                onClick: () => {
                  D == null || D(I, t + r, J);
                },
                title: `Punch ${Le} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ne
                  ] }),
                  Ge && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: K ? "✋" : "⚡" })
                ]
              },
              `punch-${J}`
            );
          }),
          K && k && /* @__PURE__ */ s.jsx(
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
    V && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${K ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: G === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : G === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : G === "pip" ? `🪟 PiP MODE: ${Me.toUpperCase()} (HERO)` : `${K ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${Me.toUpperCase()}` }),
      K && G === "director" && k && /* @__PURE__ */ s.jsx(
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
    ze && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: T,
        src: ze,
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
        muted: Ue !== "A" || cl().isMuted,
        onCanPlay: () => {
          be(), o && Ue === "A" && T.current && T.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "A" && (H.current = !1, Et(!0), wt(!1), T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "A" && wt(!0);
        },
        onTimeUpdate: () => {
          var q;
          Ue === "A" && (!gt && ((q = T.current) == null ? void 0 : q.currentTime) > 0 && (H.current = !1, Et(!0), wt(!1), T.current && (T.current.defaultPlaybackRate = a, T.current.playbackRate = a)), ut());
        },
        onError: () => {
          Ue === "A" && (H.current = !1, wt(!1), Et(!1));
        },
        onEnded: () => {
          Ue === "A" && Xe();
        }
      }
    ),
    on && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: g,
        src: on,
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
        muted: Ue !== "B" || cl().isMuted,
        onCanPlay: () => {
          be(), o && Ue === "B" && g.current && g.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          Ue === "B" && (H.current = !1, Et(!0), wt(!1), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a));
        },
        onWaiting: () => {
          Ue === "B" && wt(!0);
        },
        onTimeUpdate: () => {
          var q;
          Ue === "B" && (!gt && ((q = g.current) == null ? void 0 : q.currentTime) > 0 && (H.current = !1, Et(!0), wt(!1), g.current && (g.current.defaultPlaybackRate = a, g.current.playbackRate = a)), ut());
        },
        onError: () => {
          Ue === "B" && (H.current = !1, wt(!1), Et(!1));
        },
        onEnded: () => {
          Ue === "B" && Xe();
        }
      }
    ),
    G !== "split" && G !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: gt ? 0 : 2 },
        children: vt ? /* @__PURE__ */ s.jsx(fp, { isPlaying: o }) : At && At !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: At,
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
    G === "split" && V && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        At && At !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: At, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        qt && qt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: qt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    G === "pip" && V && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (q) => {
          q.stopPropagation(), Q((me) => !me);
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
          qt && qt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: qt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (G === "canvas" || G === "all-displays") && V && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: Ae, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: $e.width ? `${$e.width}px` : "92%",
            height: $e.height ? `${$e.height}px` : "auto",
            aspectRatio: `${we.totalWidth} / ${we.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: _.map((q, me) => {
            const J = wx(q, we), Ne = (q.displayId ?? q.DisplayId ?? `mon-${me}`).toLowerCase(), Le = de[Ne] || (Ne === ee ? At : null), Ge = !!(q.isPrimary ?? q.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${Ge ? "is-primary" : ""}`,
                style: {
                  left: `${J.leftPct}%`,
                  top: `${J.topPct}%`,
                  width: `${J.widthPct}%`,
                  height: `${J.heightPct}%`
                },
                onClick: (qe) => {
                  qe.stopPropagation(), S ? S(Ne) : se(Ne);
                },
                title: `Display ${me + 1} (${q.width || 1920}x${q.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      Ge ? "★ " : "",
                      "🖥 ",
                      me + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: q.displayName || q.DisplayName || Ne.toUpperCase() }),
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
                          qe.stopPropagation(), S(Ne);
                        },
                        title: `Open Display ${me + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Le && Le !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Le,
                      className: "canvas-frame-img",
                      alt: Ne
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      q.displayName || Ne.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Ne
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
    G === "director" && le && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        ee.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        kt(le.startEpochMs ?? le.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        kt(le.endEpochMs ?? le.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    V && G !== "canvas" && /* @__PURE__ */ s.jsx(
      Nx,
      {
        displays: _,
        activeDisplayId: ee,
        mode: K ? "MANUAL" : "AUTO",
        activeTimeRange: le ? `${kt(le.startEpochMs ?? le.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${kt(le.endEpochMs ?? le.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (q) => {
          D && D(I, t + r, q), se(q);
        }
      }
    ),
    C && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      R
    ] }) })
  ] });
}
const Ea = 2200, Ca = 400;
function Ex({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const h = t[c], y = h.epochMs + qo, f = e - y;
      if (f >= 0 && f <= Ea)
        return {
          ...h,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let i = 1;
  if (o.elapsed > Ea - Ca) {
    const c = (o.elapsed - (Ea - Ca)) / Ca;
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
  return a.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: i }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: a.map((c, h) => /* @__PURE__ */ s.jsxs(fo.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    h < a.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, h)) }) }) : null;
}
const Cx = [
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
function kp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Bs.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Cx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const Kd = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), i = r % 60, a = Math.floor(n % 1e3 / 1e3 * t), c = (h) => String(h).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(i)}.${c(a)}`;
};
function Sx({
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
  onZoomChange: y,
  onZoomReset: f,
  onFitRange: x,
  onJumpViewportTo: v,
  viewportStartMs: C = 0,
  onViewportStartChange: M,
  playheadMs: D = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: m,
  inPointMs: d = 0,
  setInPointMs: S,
  outPointMs: E = 36e5,
  setOutPointMs: j,
  recordingSegments: N = {},
  globalGaps: T = [],
  onExport: g,
  isPlaying: b,
  setIsPlaying: O,
  isLooping: U = !0,
  setIsLooping: A,
  playbackSpeed: H,
  setPlaybackSpeed: oe,
  keystrokeMode: W = "BURN_IN",
  onChangeKeystrokeMode: re,
  keystrokes: I = [],
  showRulerKeystrokes: R = !1,
  onToggleRulerKeystrokes: _,
  directorPlan: V,
  onOverrideDisplay: F,
  onSplitDirectorSegment: ne,
  onChangeDirectorSegmentDisplay: Z,
  onResetDirectorSegmentToAuto: G
}) {
  var qt, un, Dn;
  const [se, _e] = u.useState(!1), De = b !== void 0 ? b : se, Se = u.useCallback((be) => {
    const Ie = typeof be == "function" ? be(De) : be;
    O ? O(Ie) : _e(Ie), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Ie } }));
  }, [De, O]), [Q, le] = u.useState(!0), ee = U !== void 0 ? U : Q, te = A || le, [Me, z] = u.useState(1), K = H !== void 0 ? H : Me, de = oe || z, [pe, Ae] = u.useState(null), [$e, ae] = u.useState(!1), [we, he] = u.useState(T), Pe = ((qt = t == null ? void 0 : t.displays) == null ? void 0 : qt.length) > 1 || ((Dn = (un = t == null ? void 0 : t.topology) == null ? void 0 : un.displays) == null ? void 0 : Dn.length) > 1, [We, Ve] = u.useState(() => {
    if (!Pe) return "mon-0";
    if (n) return n;
    try {
      const be = localStorage.getItem("itb_spotlight_viewmode");
      if (be) return be;
    } catch {
    }
    return "canvas";
  }), xe = u.useCallback((be) => {
    Ve((Ie) => {
      const Xe = typeof be == "function" ? be(Ie) : be;
      try {
        localStorage.setItem("itb_spotlight_viewmode", Xe);
      } catch {
      }
      return Xe;
    });
  }, []), [vt, Ue] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Pe) {
        Ve("mon-0");
        return;
      }
      if (n)
        Ve(n);
      else
        try {
          const be = localStorage.getItem("itb_spotlight_viewmode");
          Ve(be || "canvas");
        } catch {
          Ve("canvas");
        }
    }
  }, [e, n, Pe, t == null ? void 0 : t.id]);
  const Yt = u.useRef(null), ze = u.useRef(h);
  ze.current = h;
  const ct = u.useRef(C);
  ct.current = C;
  const on = u.useRef(c);
  on.current = c;
  const $t = u.useRef(t && t.id);
  u.useEffect(() => {
    var be, Ie, Xe;
    t && t.id && $t.current !== t.id && ($t.current = t.id, de(1), ((be = t.displays) == null ? void 0 : be.length) > 1 || ((Xe = (Ie = t.topology) == null ? void 0 : Ie.displays) == null ? void 0 : Xe.length) > 1 || xe("mon-0"));
  }, [t, de]);
  const gn = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const be = Yt.current;
    if (!be || !y || !M) return;
    const Ie = (Xe) => {
      Xe.preventDefault(), Xe.stopPropagation();
      const ut = Xe.ctrlKey || Xe.shiftKey, Ct = ze.current, q = ct.current, me = on.current || 36e5;
      if (ut) {
        const J = Math.abs(Xe.deltaX) > Math.abs(Xe.deltaY) ? Xe.deltaX : Xe.deltaY;
        if (J === 0) return;
        const Ne = me / Ct, Le = Math.max(0, me - Ne), Ge = Ne * 0.08 * (J > 0 ? 1 : -1), qe = Math.max(0, Math.min(Le, q + Ge));
        ct.current = qe, M(qe);
      } else {
        if (Xe.deltaY === 0) return;
        const Ne = Xe.deltaY < 0 ? 1.25 : 0.8, Le = be.getBoundingClientRect(), Ge = Le.left + 150, qe = Le.right - 58, Ze = Math.max(100, qe - Ge);
        let Ye = 0.5;
        Xe.clientX >= Ge && Xe.clientX <= qe ? Ye = (Xe.clientX - Ge) / Ze : Le.width > 0 && (Ye = Math.max(0, Math.min(1, (Xe.clientX - Le.left) / Le.width)));
        const lt = Math.max(32, me / 2e3), xt = Math.max(1, Math.min(lt, Math.round(Ct * Ne * 100) / 100));
        if (xt === Ct) return;
        const ot = me / Ct, Lt = me / xt, Gt = q + Ye * ot - Ye * Lt, Zn = Math.max(0, me - Lt), bn = Math.max(0, Math.min(Zn, Gt));
        ze.current = xt, ct.current = bn, M(bn), y(xt);
      }
    };
    return be.addEventListener("wheel", Ie, { passive: !1, capture: !0 }), () => be.removeEventListener("wheel", Ie, { capture: !0 });
  }, [e, t, y, M]);
  const Ke = u.useCallback(() => {
    f ? f() : (ct.current = 0, ze.current = 1, M == null || M(0), y == null || y(1));
  }, [f, M, y]), Nt = u.useCallback((be, Ie) => {
    if (x)
      x(be, Ie);
    else {
      const Xe = Math.max(1e3, Ie - be), ut = Math.max(500, Xe * 0.05), Ct = Math.max(0, be - ut), me = Math.min(c, Ie + ut) - Ct, J = Math.max(32, c / 2e3), Ne = Math.max(1, Math.min(J, Number((c / me).toFixed(1)))), Le = c / Ne, Ge = Math.max(0, Math.min(Ct, c - Le));
      ct.current = Ge, ze.current = Ne, M == null || M(Ge), y == null || y(Ne);
    }
  }, [x, c, M, y]), Sn = u.useCallback((be, Ie = "center") => {
    if (v)
      v(be, Ie);
    else {
      if (be == null) return;
      const Xe = ze.current || 1, ut = c / Math.max(1, Xe), Ct = Ie === "start" ? ut / 4 : ut * 0.75, q = Math.max(0, Math.min(be - Ct, c - ut));
      ct.current = q, M == null || M(q);
    }
  }, [v, c, M]), gt = u.useCallback(() => {
    Se((be) => !be);
  }, [Se]), Et = u.useCallback(async () => {
    var ut;
    if (!t || Math.abs(E - d) < 1e3) return;
    const be = (W || "NONE").toUpperCase().replace("-", "_");
    let Ie;
    be === "NONE" || be === "OFF" ? Ie = "None" : be === "CAPTION" ? Ie = "Caption" : Ie = "BurnIn";
    const Xe = {
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: i + Math.round(d),
      outEpochMs: i + Math.round(E),
      keystrokeMode: Ie,
      layoutMode: Pe ? We : "mon-0",
      targetDisplayId: !Pe || We === "mon-0" || We === "mon-1" || We.startsWith("mon-") ? Pe ? We : "mon-0" : null,
      isPipSwapped: vt,
      directorSegments: Pe ? (V == null ? void 0 : V.segments) || ((ut = t == null ? void 0 : t.directorPlan) == null ? void 0 : ut.segments) || [] : []
    };
    try {
      g ? await g(Xe) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Xe)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Xe)
      });
    } catch (Ct) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Ct);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, d, E, i, g, W, We, vt, V]);
  u.useEffect(() => {
    if (!e || !t) return;
    const be = (Ie) => {
      if ((Ie.ctrlKey || Ie.metaKey) && (Ie.key === "e" || Ie.key === "E")) {
        Ie.preventDefault(), Et();
        return;
      }
      if (Ie.key === "?" || Ie.shiftKey && Ie.code === "Slash") {
        Ie.preventDefault(), ae((Xe) => !Xe);
        return;
      }
      if ($e) {
        Ie.key === "Escape" && ae(!1);
        return;
      }
      if (Ie.key === "Escape" || Ie.code === "Escape") {
        Ie.preventDefault(), Ie.stopPropagation(), o == null || o();
        return;
      }
      if (Ie.code === "Space") {
        Ie.preventDefault(), gt();
        return;
      }
      if (Ie.code === "KeyI") {
        Ie.preventDefault(), S(Math.max(0, Math.min(D, E - 1e3)));
        return;
      }
      if (Ie.code === "KeyO") {
        Ie.preventDefault(), j(Math.min(c, Math.max(D, d + 1e3)));
        return;
      }
      if (Ie.code === "ArrowLeft" || Ie.code === "ArrowRight") {
        Ie.preventDefault(), Se(!1);
        const Xe = Ie.code === "ArrowLeft";
        let ut;
        if (Ie.ctrlKey || Ie.metaKey)
          ut = 33;
        else if (Ie.shiftKey)
          ut = 5e3;
        else {
          const Ct = Math.max(1, h);
          ut = Math.max(33, Math.round(1e3 / Ct));
        }
        m((Ct) => {
          const q = Xe ? Ct - ut : Ct + ut;
          return Math.max(0, Math.min(c, q));
        });
        return;
      }
      if (Ie.key === "ArrowDown") {
        Ie.preventDefault();
        const Xe = r.findIndex((ut) => ut.id === t.id);
        if (Xe !== -1) {
          const ut = (Xe + 1) % r.length;
          l(r[ut].id);
        }
        return;
      }
      if (Ie.key === "ArrowUp") {
        Ie.preventDefault();
        const Xe = r.findIndex((ut) => ut.id === t.id);
        if (Xe !== -1) {
          const ut = (Xe - 1 + r.length) % r.length;
          l(r[ut].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", be, { capture: !0 }), () => window.removeEventListener("keydown", be, { capture: !0 });
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
    m,
    Et,
    gt,
    Se,
    $e
  ]);
  const On = r.findIndex((be) => be.id === (t && t.id)), wt = r[On - 1], At = r[On + 1];
  if (!e || !t) return null;
  const Ut = k > 0 ? k : Math.round(i + D);
  return Bs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      pe && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${pe.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          pe.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          pe.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          pe.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: pe.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            Kd(E - d),
            " (",
            kt(i + d, a),
            " → ",
            kt(i + E, a),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          jx,
          {
            station: t,
            baseEpochMs: i,
            totalDurationMs: c,
            playheadMs: D,
            setPlayheadMs: m,
            isPlaying: De,
            setIsPlaying: Se,
            playbackSpeed: K,
            timeMode: a,
            inPointMs: d,
            outPointMs: E,
            isLooping: ee,
            recordingSegments: N,
            globalGaps: we,
            showWatermark: !0,
            directorPlan: V || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: F,
            onResetOverride: G,
            viewMode: We,
            onViewModeChange: xe,
            isPipSwapped: vt,
            onPipSwapChange: Ue
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ex,
          {
            currentEpochMs: Ut,
            keystrokes: I,
            keystrokeMode: W
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
              onClick: (be) => {
                be.preventDefault(), be.stopPropagation(), o == null || o();
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
              onClick: () => ae(!0),
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
            On + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !At,
              onClick: () => At && l(At.id),
              title: At ? `Next: ${At.displayName || At.roleAlias || At.hostname || At.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${De ? "is-playing-dimmed" : ""}`, ref: Yt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: Kd(E - d) })
            ] }),
            (() => {
              const be = We === "mon-0" ? "SCREEN 1" : We === "mon-1" ? "SCREEN 2" : We.startsWith("mon-") ? `SCREEN ${parseInt(We.slice(4)) + 1}` : We.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: Et,
                  title: `Export Selected Cut Window as ${be} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: We === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${be})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            pp,
            {
              activeStationId: t.id,
              isPlaying: De,
              setIsPlaying: gt,
              isLooping: ee,
              setIsLooping: te,
              playbackSpeed: K,
              onChangeSpeed: de,
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
                Se(!1), m((be) => Math.max(0, be - 33));
              },
              onStepFrameForward: () => {
                Se(!1), m((be) => Math.min(c, be + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: kt(i + D, a) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          yp,
          {
            stations: gn,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: i,
            timeMode: a,
            totalDurationMs: c,
            zoomLevel: h,
            onZoomChange: y,
            onZoomReset: Ke,
            onFitRange: Nt,
            onJumpViewportTo: Sn,
            viewportStartMs: C,
            onViewportStartChange: M,
            playheadMs: D,
            setPlayheadMs: (be) => {
              Se(!1), m(be);
            },
            inPointMs: d,
            setInPointMs: S,
            outPointMs: E,
            setOutPointMs: j,
            recordingSegments: N,
            onExport: Et,
            onEstimateLoaded: (be) => {
              be != null && be.removedGlobalGaps && he(be.removedGlobalGaps);
            },
            keystrokeMode: W,
            onChangeKeystrokeMode: re,
            keystrokes: I,
            showKeystrokes: R,
            showRulerKeystrokes: R,
            onToggleRulerKeystrokes: _,
            onSplitDirectorSegment: ne,
            onChangeDirectorSegmentDisplay: Z,
            onResetDirectorSegmentToAuto: G
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        kp,
        {
          isOpen: $e,
          onClose: () => ae(!1)
        }
      )
    ] }),
    document.body
  );
}
function wp({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), i = u.useRef(!1), a = u.useRef(0), [c, h] = u.useState(() => {
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
    }, b = () => {
      !document.hidden && N && (clearTimeout(T), a.current = 0, x().then(g));
    };
    return document.addEventListener("visibilitychange", b), x().then(g), () => {
      N = !1, clearTimeout(T), document.removeEventListener("visibilitychange", b);
    };
  }, [x]), u.useEffect(() => {
    const N = () => {
      f(!0), x();
    };
    return window.addEventListener("open-export-monitor", N), () => window.removeEventListener("open-export-monitor", N);
  }, [x]), u.useEffect(() => {
    if (!y || c) return;
    const N = (T) => {
      o.current && !o.current.contains(T.target) && !T.target.closest(".export-floating-hud") && f(!1);
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [y, c]);
  const v = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && v)
    return null;
  const C = t.filter((N) => N.status === "Processing" || N.status === "Queued"), M = t.filter((N) => N.status === "Completed" || N.isCompleted), D = () => {
    h((N) => {
      const T = !N;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(T));
      } catch {
      }
      return T;
    });
  }, k = () => {
    f(!1), h(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, m = (N, T) => {
    T.stopPropagation(), !(!N || r.has(N)) && (l((g) => new Set(g).add(N)), setTimeout(() => {
      n((g) => {
        const b = g.filter((O) => (O.jobId || O.id) !== N);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: b })), b;
      }), l((g) => {
        const b = new Set(g);
        return b.delete(N), b;
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
    const T = N.jobId || N.id, g = `/api/v1/extractor-advanced/jobs/${T}/download`, b = document.createElement("a");
    b.href = g, b.download = N.fileName || `archive_${T}.tar`, document.body.appendChild(b), b.click(), document.body.removeChild(b), setTimeout(x, 1e3);
  }, j = (N) => {
    if (!N || N <= 0) return "0 B";
    const T = N / (1024 * 1024);
    return T >= 1e3 ? `${(T / 1024).toFixed(2)} GB` : `${T.toFixed(1)} MB`;
  };
  return t.length === 0 && !y ? null : Bs.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !y && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${C.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${C.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: C.length > 0 ? `EXPORTS: ${C.length} PACKAGING` : `${M.length} ARCHIVE${M.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${C.length > 0 ? "" : "ready"}`, children: C.length > 0 ? `${C[0].progressPercent}%` : "DOWNLOAD" })
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
          const T = N.status === "Completed" || N.isCompleted, g = N.status === "Failed" || N.isFailed, b = N.status === "Processing" || N.status === "Queued", O = N.jobId || N.id, U = r.has(O), A = T ? 100 : Math.round(N.progressPercent || N.progressPercentage || N.progress || 0);
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
                      onClick: (H) => m(O, H),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                b && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
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
                        onClick: (H) => d(O, H),
                        title: N.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: N.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (H) => S(N, H),
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
function bx({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const h = (f) => {
      f.key === "Escape" && (t == null || t());
    }, y = (f) => {
      l.current && !l.current.contains(f.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", y), window.addEventListener("keydown", h), () => {
      window.removeEventListener("mousedown", y), window.removeEventListener("keydown", h);
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
function Mx({
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
  }, y = (N, T) => {
    const g = Math.round(N * T / 2073600 * 6 * 10) / 10, b = Math.round(g * 60 / 8 * 10) / 10;
    return `~${g} Mbps (~${b} MB/min)`;
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
      badge: `4K UHD (${h(2160)}×2160)`,
      res: `${h(2160)} × 2160`,
      bitrate: y(h(2160), 2160),
      desc: "Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls."
    },
    {
      id: "2K",
      badge: `2K QHD (${h(1440)}×1440)`,
      res: `${h(1440)} × 1440`,
      bitrate: y(h(1440), 1440),
      desc: "High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows."
    },
    {
      id: "HD",
      badge: `HD 720p (${h(720)}×720)`,
      res: `${h(720)} × 720`,
      bitrate: y(h(720), 720),
      desc: "Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage."
    }
  ], [x, v] = u.useState("BurnIn"), [C, M] = u.useState(r.resolution || "NATIVE"), [D, k] = u.useState(!1);
  if (!e) return null;
  const m = async () => {
    k(!0);
    try {
      await n(x, C), t();
    } finally {
      k(!1);
    }
  }, d = (r.layout || "DIRECTOR").toUpperCase(), S = r.stationsCount || 1, E = r.audioSegmentsCount || 1, j = f.find((N) => N.id === C) || f[0];
  return Bs.createPortal(
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
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((N) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${C === N.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: N.id,
              checked: C === N.id,
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
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${x === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: x === "BurnIn",
                onChange: () => v("BurnIn")
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: m, disabled: D, children: D ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${j.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Ix(e, t, n, r, l = null) {
  const [o, i] = u.useState([]), [a, c] = u.useState({}), [h, y] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const x = u.useCallback(async () => {
    if (isNaN(e)) return;
    const M = e + t;
    y(!0);
    try {
      const D = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(M),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), k = await fetch(`/api/v1/extractor-advanced/stations?${D.toString()}`);
      if (k.ok) {
        const m = k.headers.get("content-type");
        if (m && m.includes("application/json")) {
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
            const N = new Map(j.map((b) => [b.id, b]));
            let T = j.length !== E.length;
            const g = E.map((b) => {
              const O = N.get(b.id);
              return O ? O.isOnline === b.isOnline && O.displayName === b.displayName && O.roleAlias === b.roleAlias && O.feedSpec === b.feedSpec && O.recordingsCount === b.recordingsCount && O.fps === b.fps ? O : (T = !0, { ...O, ...b }) : (T = !0, b);
            });
            return T ? g : j;
          });
        }
      }
    } catch (D) {
      console.warn("[useStudioData] Failed fetching active stations:", D);
    } finally {
      y(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    x();
  }, [x]);
  const v = u.useMemo(() => {
    const M = /* @__PURE__ */ new Set();
    return o.forEach((D) => {
      D.id && M.add(D.id), D.hostname && M.add(D.hostname);
    }), Array.from(M).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!v || isNaN(e)) {
      c({});
      return;
    }
    let M = !0;
    return (async () => {
      try {
        const k = e + t, m = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(v)}&startEpoch=${e}&endEpoch=${k}`);
        if (m.ok && M) {
          const d = await m.json() || {}, S = {};
          (f.current || []).forEach((E) => {
            const j = d[E.id] || d[E.hostname] || d[E.displayName] || [];
            S[E.id] = j, S[E.hostname] = j;
          }), Object.keys(d).forEach((E) => {
            S[E] || (S[E] = d[E]);
          }), c(S);
        }
      } catch {
        M && c({});
      }
    })(), () => {
      M = !1;
    };
  }, [v, e, t]);
  const C = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let M = 1 / 0, D = -1 / 0;
    o.forEach((S) => {
      (a[S.id] || a[S.hostname] || S.segments || []).forEach((j) => {
        const N = j.startEpochMs ?? j.startEpoch ?? 0, T = j.endEpochMs ?? j.endEpoch ?? 0;
        N > 0 && N < M && (M = N), T > 0 && T > D && (D = T);
      });
    });
    let k = 1 / 0, m = -1 / 0;
    l && (a[l] || []).forEach((E) => {
      const j = E.startEpochMs ?? E.startEpoch ?? 0, N = E.endEpochMs ?? E.endEpoch ?? 0;
      j > 0 && j < k && (k = j), N > 0 && N > m && (m = N);
    });
    const d = (S) => S === 1 / 0 || S === -1 / 0 ? null : Math.max(0, Math.min(t, S - e));
    return {
      globalFirstMs: d(M),
      globalLastMs: d(D),
      currentFirstMs: d(k),
      currentLastMs: d(m)
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
function Tx({
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
  initialPlaybackSpeed: y = 1,
  isGridMode: f = !1
}) {
  const [x, v] = u.useState(a), [C, M] = u.useState(c), [D, k] = u.useState(h), [m, d] = u.useState(y), S = u.useRef(null), E = u.useRef(null), j = o || l, N = u.useMemo(() => j ? i[j.id] || j.segments || [] : [], [j, i]), T = N.some((U) => {
    const A = U.startEpochMs ?? U.startEpoch ?? 0, H = U.endEpochMs ?? U.endEpoch ?? 0, oe = e + x;
    return oe >= A && oe <= H;
  }), g = !!(!f && j && T);
  u.useEffect(() => {
    v((U) => U < t ? t : U > n ? (M(!1), n) : U);
  }, [t, n]);
  const b = u.useCallback((U) => {
    S.current || (S.current = U);
    const A = (U - S.current) * m, H = Math.min(A, 250 * m);
    S.current = U, v((oe) => {
      let W = oe + H;
      if (r && r.length > 0) {
        const re = e + W, I = r.find((R) => re >= R.startEpochMs && re < R.endEpochMs);
        I && (W = I.endEpochMs - e);
      }
      return W >= n && (D ? W = t : (M(!1), W = n)), W;
    }), C && (!g || f) && (E.current = requestAnimationFrame(b));
  }, [C, D, t, n, r, e, g, m, f]);
  u.useEffect(() => (C && (!g || f) ? (S.current = performance.now(), E.current = requestAnimationFrame(b)) : (E.current && cancelAnimationFrame(E.current), S.current = null), () => {
    E.current && cancelAnimationFrame(E.current);
  }), [C, b, g, f]);
  const O = u.useCallback(() => {
    if (C)
      M(!1);
    else {
      let U = x;
      const A = e + U, H = r == null ? void 0 : r.find((oe) => A >= oe.startEpochMs && A < oe.endEpochMs);
      if (H)
        U = H.endEpochMs - e;
      else if (j && !T) {
        const oe = N.map((W) => ({ start: W.startEpochMs ?? W.startEpoch ?? 0, end: W.endEpochMs ?? W.endEpoch ?? 0 })).filter((W) => W.start > A).sort((W, re) => W.start - re.start)[0];
        oe && (U = oe.start - e);
      }
      U !== x && v(U), M(!0);
    }
  }, [C, x, e, r, j, T, N]);
  return {
    playheadMs: x,
    setPlayheadMs: v,
    isPlaying: C,
    setIsPlaying: M,
    isLooping: D,
    setIsLooping: k,
    playbackSpeed: m,
    setPlaybackSpeed: d,
    togglePlaySmart: O
  };
}
function Ax(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Rx({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [i, a] = u.useState(r), c = u.useRef(null), h = u.useRef(i);
  h.current = i;
  const y = u.useRef(l);
  y.current = l;
  const f = u.useRef(t);
  f.current = t;
  const x = Math.max(32, t / 2e3), v = t / l, C = u.useCallback((m, d = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const S = h.current, E = m - S;
    if (Math.abs(E) < 1) return;
    const j = performance.now(), N = (T) => {
      const g = T - j, b = Math.min(1, g / d);
      a(Math.round(S + E * Ax(b))), b < 1 ? c.current = requestAnimationFrame(N) : c.current = null;
    };
    c.current = requestAnimationFrame(N);
  }, []), M = u.useCallback((m, d) => {
    const S = Math.max(1e3, d - m), E = Math.max(500, S * 0.05), j = Math.max(0, m - E), T = Math.min(t, d + E) - j, g = Math.max(1, Math.min(x, Number((t / T).toFixed(1)))), b = t / g, O = Math.max(0, Math.min(j, t - b));
    C(O), o(g);
  }, [t, x, C]), D = u.useCallback(() => {
    C(0), o(1);
  }, [C]), k = u.useCallback((m, d = "center") => {
    if (m == null) return;
    const S = d === "start" ? v / 4 : v * 0.75, E = Math.max(0, Math.min(m - S, t - v));
    C(E);
  }, [v, t, C]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let m = null;
    const d = (E) => {
      if (E.defaultPrevented) return;
      E.preventDefault(), E.stopPropagation();
      const j = E.ctrlKey || E.shiftKey, N = y.current, T = h.current, g = f.current;
      if (j) {
        const b = Math.abs(E.deltaX) > Math.abs(E.deltaY) ? E.deltaX : E.deltaY;
        if (b === 0) return;
        const O = g / Math.max(1, N), U = Math.max(0, g - O), A = O * 0.08 * (b > 0 ? 1 : -1);
        a((H) => Math.max(0, Math.min(U, H + A)));
      } else {
        if (E.deltaY === 0) return;
        const O = E.deltaY < 0 ? 1.25 : 0.8, U = Math.max(32, g / 2e3), A = m ? m.getBoundingClientRect() : { left: 0, width: window.innerWidth }, H = Math.max(0, Math.min(A.width, E.clientX - A.left)), oe = A.width > 0 ? H / A.width : 0.5;
        o((W) => {
          const re = Math.max(1, Math.min(U, Math.round(W * O * 100) / 100));
          if (re === W) return W;
          const I = g / W, R = g / re, V = T + oe * I - oe * R, F = Math.max(0, g - R);
          return a(Math.max(0, Math.min(F, V))), re;
        });
      }
    }, S = () => {
      const E = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return E && !m ? (m = E, m.addEventListener("wheel", d, { passive: !1, capture: !0 }), !0) : !!m;
    };
    if (!S()) {
      const E = setInterval(() => {
        S() && clearInterval(E);
      }, 100);
      return () => {
        clearInterval(E), m && m.removeEventListener("wheel", d, { capture: !0 });
      };
    }
    return () => {
      m && m.removeEventListener("wheel", d, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: i,
    setViewportStartMs: a,
    viewportDurationMs: v,
    animateViewportTo: C,
    fitRange: M,
    resetZoom: D,
    jumpViewportTo: k
  };
}
function $x({
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
  outPointMs: y,
  setOutPointMs: f,
  totalTimelineDurationMs: x,
  zoomLevel: v = 1,
  togglePlaySmart: C,
  onToggleHelpModal: M,
  onSplitDirectorAtPlayhead: D,
  isModalActive: k = !1
}) {
  u.useEffect(() => {
    const m = (d) => {
      const S = d.target;
      if (!(S.tagName === "INPUT" || S.tagName === "TEXTAREA" || S.tagName === "SELECT" || S.isContentEditable || S.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (d.key === "?" || d.shiftKey && d.code === "Slash") {
          d.preventDefault(), M == null || M();
          return;
        }
        if (!(k || t)) {
          if (d.code === "KeyI" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), h == null || h(Math.max(0, Math.min(i, y - 1e3)));
            return;
          }
          if (d.code === "KeyO" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), f == null || f(Math.min(x, Math.max(i, c + 1e3)));
            return;
          }
          if (d.code === "KeyX" && !d.ctrlKey && !d.metaKey && !d.altKey) {
            d.preventDefault(), h == null || h(0), f == null || f(x);
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
            d.preventDefault(), a == null || a(y);
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
              const T = Math.max(1, v);
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
    return window.addEventListener("keydown", m, { capture: !0 }), () => window.removeEventListener("keydown", m, { capture: !0 });
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
    y,
    f,
    x,
    v,
    C,
    M,
    D,
    k
  ]);
}
const Vd = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = Od(n, e), l = Od(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, $l = (e, t = null, n = "LOCAL") => {
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
    const c = o.substring(0, 8), h = yc(l, c, n);
    if (h !== null && !isNaN(h)) return h;
  }
  const i = r.replace(" ", "T"), a = new Date(i).getTime();
  return isNaN(a) ? Date.now() : a;
};
function Lx() {
  var xn, kl;
  const e = u.useMemo(() => mg() || {}, []), [t, n] = u.useState(() => {
    var L, ce;
    return (L = e.timeRange) != null && L.startEpochMs && ((ce = e.timeRange) != null && ce.endEpochMs) ? e.timeRange : Vd();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, i] = u.useState(e.keystrokeMode || "BURN_IN"), [a, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    ag().catch((L) => console.warn("[Studio] DST init error:", L));
  }, []);
  const h = u.useMemo(() => t.startEpochMs ? t.startEpochMs : $l(t.start), [t.start, t.startEpochMs]), y = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => h - y, [h, y]), x = u.useMemo(() => t.durationMs + 2 * y, [t.durationMs, y]), [v, C] = u.useState(e.selectedStationIds || []), [M, D] = u.useState(e.activeStationId || null), [k, m] = u.useState(null), [d, S] = u.useState(null), [E, j] = u.useState([]), [N, T] = u.useState(!1), [g, b] = u.useState(null), [O, U] = u.useState(() => {
    var L;
    return e.compositionScope || (((L = e.selectedStationIds) == null ? void 0 : L.length) > 1 ? "inter-station" : "intra-station");
  }), [A, H] = u.useState(() => {
    try {
      const L = localStorage.getItem("itb_composition_layout");
      if (L) return L;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), oe = u.useCallback((L) => {
    H((ce) => {
      const B = typeof L == "function" ? L(ce) : L;
      try {
        localStorage.setItem("itb_composition_layout", B);
      } catch {
      }
      return B;
    });
  }, []), [W, re] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [I, R] = u.useState(() => !!e.isPipSwapped), [_, V] = u.useState(() => e.audioRoutingPlan || null), [F, ne] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [Z, G] = u.useState(!1), [se, _e] = u.useState(null), [De, Se] = u.useState(() => e.canvasLayoutTimeline || null), [Q, le] = u.useState(0), ee = u.useCallback((L) => {
    Se((ce) => {
      const B = [...(ce == null ? void 0 : ce.keyframes) || []], ke = B.findIndex((He) => Math.abs(He.timestampEpochMs - L) < 300);
      if (ke >= 0)
        return le(ke), ce;
      const Ee = B[Q] || B[0], je = (Ee == null ? void 0 : Ee.layout) || se || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Fe = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(L),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(je))
      }, ue = [...B, Fe].sort((He, Je) => He.timestampEpochMs - Je.timestampEpochMs), Qe = ue.findIndex((He) => He.timestampEpochMs === Math.round(L));
      return le(Qe >= 0 ? Qe : 0), {
        ...ce || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: ue
      };
    });
  }, [Q, se]), te = u.useCallback((L, ce) => {
    Se((B) => !(B != null && B.keyframes) || B.keyframes.length === 0 ? B : kc(B, L, ce));
  }, []), Me = u.useCallback((L) => {
    Se((ce) => {
      if (!(ce != null && ce.keyframes) || ce.keyframes.length <= 1) return ce;
      const B = ce.keyframes.filter((ke, Ee) => Ee !== L);
      return le((ke) => Math.max(0, ke - 1)), { ...ce, keyframes: B };
    });
  }, []), z = u.useCallback((L, ce) => {
    Se((B) => {
      if (!(B != null && B.keyframes) || B.keyframes.length === 0) return B;
      const ke = Math.round(ce), Ee = typeof L == "number" && B.keyframes[L] ? L : B.keyframes.findIndex((ue) => ue.id === L);
      if (Ee === -1) return B;
      const je = [...B.keyframes];
      je[Ee] = {
        ...je[Ee],
        timestampEpochMs: ke
      }, je.sort((ue, Qe) => ue.timestampEpochMs - Qe.timestampEpochMs);
      const Fe = je.findIndex((ue) => ue.timestampEpochMs === ke);
      return Fe >= 0 && le(Fe), {
        ...B,
        keyframes: je
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [K, de] = u.useState({}), pe = u.useCallback((L) => {
    C((ce) => ce.filter((B) => B !== L)), M === L && D(null), k === L && m(null), Se((ce) => {
      if (!ce || !ce.keyframes) return ce;
      const B = ce.keyframes.map((ke) => {
        var Ee;
        return {
          ...ke,
          layout: {
            ...ke.layout,
            placements: (((Ee = ke.layout) == null ? void 0 : Ee.placements) || []).filter((je) => je.stationId !== L)
          }
        };
      });
      return { ...ce, keyframes: B };
    });
  }, [M, k]), Ae = u.useCallback((L, ce) => {
    L.preventDefault(), L.stopPropagation();
    const B = 195, ke = 110, Ee = Math.min(L.clientX, window.innerWidth - B - 10), je = Math.min(L.clientY, window.innerHeight - ke - 10);
    b({ x: Ee, y: je, station: ce });
  }, []), $e = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(x, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(x, e.inPointMs)) : y, [e.inEpochMs, e.inPointMs, f, x, y]), ae = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max($e + 1e3, Math.min(x, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max($e + 1e3, Math.min(x, e.outPointMs)) : y + t.durationMs, [e.outEpochMs, e.outPointMs, f, x, y, t.durationMs, $e]), we = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(x, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(x, e.playheadMs)) : $e, [e.playheadEpochMs, e.playheadMs, f, x, $e]), [he, Pe] = u.useState($e), [We, Ve] = u.useState(ae);
  u.useEffect(() => {
    if (!f) return;
    const L = Math.round(f + he), ce = Math.round(f + We);
    Se((B) => {
      var ue, Qe;
      if (!B || !B.keyframes || B.keyframes.length === 0) return B;
      let ke = [...B.keyframes], Ee = !1, je = ke.find((He) => He.tag === "cut-in");
      if (je)
        je.timestampEpochMs !== L && (je.timestampEpochMs = L, Ee = !0);
      else {
        const He = ke.find((Je) => Math.abs(Je.timestampEpochMs - L) < 500);
        if (He)
          He.tag = "cut-in", He.timestampEpochMs = L, Ee = !0;
        else {
          const Je = ((ue = ke[0]) == null ? void 0 : ue.layout) || se || { width: 1920, height: 1080, placements: [] };
          ke.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: L,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Je))
          }), Ee = !0;
        }
      }
      let Fe = ke.find((He) => He.tag === "cut-out");
      if (Fe)
        Fe.timestampEpochMs !== ce && (Fe.timestampEpochMs = ce, Ee = !0);
      else {
        const He = ke.find((Je) => Math.abs(Je.timestampEpochMs - ce) < 500 && Je.tag !== "cut-in");
        if (He)
          He.tag = "cut-out", He.timestampEpochMs = ce, Ee = !0;
        else {
          const Je = ((Qe = ke[ke.length - 1]) == null ? void 0 : Qe.layout) || se || { width: 1920, height: 1080, placements: [] };
          ke.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: ce,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Je))
          }), Ee = !0;
        }
      }
      return Ee ? (ke.sort((He, Je) => He.timestampEpochMs - Je.timestampEpochMs), {
        ...B,
        keyframes: ke
      }) : B;
    });
  }, [f, he, We, se]);
  const { allStations: xe, recordingSegments: vt, isLoadingStations: Ue, movieBoundaries: Yt } = Ix(
    f,
    x,
    t,
    r,
    M
  ), ze = u.useMemo(() => xe.find((L) => L.id === M) || null, [xe, M]), ct = u.useCallback((L) => {
    de((ce) => {
      const B = !(ce[L] ?? !0);
      return Se((ke) => {
        if (!(ke != null && ke.keyframes)) return ke;
        const Ee = ke.keyframes.map((je) => {
          var He;
          const Fe = ((He = je.layout) == null ? void 0 : He.placements) || [];
          let ue = !1;
          const Qe = Fe.map((Je) => {
            if (Je.stationId === L) {
              if (!B && (Je.displayId === "auto" || !Je.displayId)) {
                ue = !0;
                const yt = xe.find((dt) => dt.id === L);
                return {
                  ...Je,
                  displayId: "mon-0",
                  label: `${(yt == null ? void 0 : yt.displayName) || L} - Screen 1 (Main)`
                };
              } else if (B && (Je.displayId === "mon-0" || !Je.displayId) && Fe.filter((dt) => dt.stationId === L).length === 1) {
                ue = !0;
                const dt = xe.find((Tt) => Tt.id === L);
                return {
                  ...Je,
                  displayId: "auto",
                  label: `${(dt == null ? void 0 : dt.displayName) || L} - Central Composition (Auto-Director)`
                };
              }
            }
            return Je;
          });
          return ue ? {
            ...je,
            layout: {
              ...je.layout,
              placements: Qe
            }
          } : je;
        });
        return { ...ke, keyframes: Ee };
      }), {
        ...ce,
        [L]: B
      };
    });
  }, [xe]), on = u.useCallback((L, ce) => {
    Se((B) => {
      var Je, yt;
      if (!B || !B.keyframes || B.keyframes.length === 0) return B;
      const ke = Q >= 0 && Q < B.keyframes.length ? Q : 0, Ee = B.keyframes[ke], je = ((Je = Ee == null ? void 0 : Ee.layout) == null ? void 0 : Je.placements) || [], Fe = (ce || "mon-0").toLowerCase(), ue = je.findIndex((dt) => {
        if (dt.stationId !== L) return !1;
        const Tt = (dt.displayId || "mon-0").toLowerCase();
        return Tt === Fe || Tt === "auto" && (Fe === "mon-0" || Fe === "screen-0");
      });
      let Qe;
      if (ue >= 0)
        Qe = je.filter((dt, Tt) => Tt !== ue);
      else {
        const dt = xe.find((Pr) => Pr.id === L), Tt = ((yt = dt == null ? void 0 : dt.displays) == null ? void 0 : yt.find((Pr) => (Pr.displayId || "").toLowerCase() === Fe)) || { width: 1920, height: 1080 }, xs = Tt.width || 1920, Jt = Tt.height || 1080, fn = xs / Jt, bs = fn >= 1 ? 640 : Math.round(360 * fn), wl = fn >= 1 ? Math.round(640 / fn) : 360, ys = {
          stationId: L,
          displayId: Fe,
          label: `${(dt == null ? void 0 : dt.displayName) || L} - ${Tt.displayName || Fe}`,
          x: 120 + je.length * 40 % 800,
          y: 100 + je.length * 40 % 500,
          width: bs,
          height: wl,
          sourceWidth: xs,
          sourceHeight: Jt,
          nativeAspectRatio: fn,
          aspectRatio: fn,
          zIndex: je.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Qe = [...je, ys];
      }
      const He = [...B.keyframes];
      return He[ke] = {
        ...He[ke],
        layout: {
          ...He[ke].layout,
          placements: Qe
        }
      }, { ...B, keyframes: He };
    });
  }, [Q, xe]), $t = u.useMemo(() => !v || v.length === 0 ? [] : xe.filter((L) => v.includes(L.id)), [xe, v]), gn = u.useMemo(() => xe.find((L) => L.id === k) || null, [xe, k]), Ke = !!(k && gn), Nt = u.useRef("grid"), Sn = u.useRef(null), {
    playheadMs: gt,
    setPlayheadMs: Et,
    isPlaying: On,
    setIsPlaying: wt,
    playbackSpeed: At,
    setPlaybackSpeed: Ut,
    isLooping: qt,
    setIsLooping: un,
    togglePlaySmart: Dn
  } = Tx({
    timelineBaseEpochMs: f,
    inPointMs: he,
    outPointMs: We,
    globalGaps: E,
    activeStation: ze,
    spotlightStation: gn,
    recordingSegments: vt,
    initialPlayheadMs: we,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !M
  }), {
    zoomLevel: be,
    setZoomLevel: Ie,
    viewportStartMs: Xe,
    setViewportStartMs: ut,
    resetZoom: Ct,
    fitRange: q,
    jumpViewportTo: me
  } = Rx({
    containerRef: Sn,
    totalTimelineDurationMs: x,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [J, Ne] = u.useState(!1), [Le, Ge] = u.useState(!1), [qe, Ze] = u.useState(!1), [Ye, lt] = u.useState(!1), [xt, ot] = u.useState(
    !!(e.isWorkspaceActive && ((xn = e.selectedStationIds) == null ? void 0 : xn.length) > 0)
  ), [Lt, Xt] = u.useState([]);
  u.useEffect(() => {
    const L = Ke && gn || ze, ce = (L == null ? void 0 : L.hostname) || (L == null ? void 0 : L.displayName) || (L == null ? void 0 : L.id), B = (o || "NONE").toUpperCase().replace("-", "_");
    if (!ce || !f || !(B !== "NONE" && B !== "OFF" || a)) {
      Xt([]);
      return;
    }
    const Ee = Math.max(0, f - 5e3), je = f + x + 5e3, Fe = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(ce)}&startEpoch=${Ee}&endEpoch=${je}`, { signal: Fe.signal }).then((ue) => ue.ok ? ue.json() : []).then((ue) => Xt(Array.isArray(ue) ? ue : [])).catch((ue) => {
      ue.name !== "AbortError" && Xt([]);
    }), () => Fe.abort();
  }, [ze, gn, Ke, f, x, o, a]), u.useEffect(() => {
    Ue || (xe.length === 0 ? ((v.length > 0 || M || xt) && (C([]), D(null), m(null), ot(!1)), lt(!0), T(!0)) : (T(!1), C((L) => {
      const ce = L.filter((B) => xe.some((ke) => ke.id === B));
      return ce.length !== L.length ? (ce.length === 0 && (ot(!1), lt(!0)), ce) : L;
    })));
  }, [Ue, xe]);
  const Gt = u.useCallback((L) => {
    if (L === null) {
      wt(!1), Ut(1), D(null);
      return;
    }
    L !== M && Ut(1), D(L);
  }, [M, wt, Ut]), Zn = u.useCallback((L, ce = null) => {
    L !== M && Ut(1), Nt.current = v.length <= 1 || M ? "spotlight" : "grid", D(L), m(L), S(ce || null);
  }, [M, v.length, Ut]), bn = u.useCallback(() => {
    m(null), S(null), Nt.current === "grid" && D(null);
  }, []), Ot = u.useMemo(() => {
    if (_ != null && _.segments && _.segments.length > 0)
      return _;
    const L = v[0] || M || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + x,
          sourceStationId: L
        }
      ]
    };
  }, [_, v, M, f, x]), Cs = u.useCallback((L) => {
    V((ce) => {
      const B = ce || Ot, ke = [...B.segments || []], Ee = ke.findIndex((yt) => {
        const dt = yt.startEpochMs ?? yt.StartEpochMs ?? 0, Tt = yt.endEpochMs ?? yt.EndEpochMs ?? 0;
        return L > dt + 500 && L < Tt - 500;
      });
      if (Ee === -1) return ce;
      const je = ke[Ee], Fe = je.startEpochMs ?? je.StartEpochMs ?? 0, ue = je.endEpochMs ?? je.EndEpochMs ?? 0, Qe = je.sourceStationId ?? je.SourceStationId ?? v[0], He = { startEpochMs: Fe, endEpochMs: L, sourceStationId: Qe }, Je = { startEpochMs: L, endEpochMs: ue, sourceStationId: Qe };
      return ke.splice(Ee, 1, He, Je), { ...B, segments: ke };
    });
  }, [Ot, v]), en = u.useCallback((L, ce) => {
    V((B) => {
      const ke = B || Ot, Ee = (ke.segments || []).map((je) => {
        const Fe = je.startEpochMs ?? je.StartEpochMs ?? 0, ue = je.endEpochMs ?? je.EndEpochMs ?? 0;
        return L >= Fe && L <= ue ? { ...je, sourceStationId: ce } : je;
      });
      return { ...ke, segments: Ee };
    }), ne(!1);
  }, [Ot]), _t = u.useCallback((L, ce) => {
    V((B) => {
      const ke = B || Ot, Ee = (ke.segments || []).map((je) => {
        const Fe = je.startEpochMs ?? je.StartEpochMs ?? 0, ue = je.endEpochMs ?? je.EndEpochMs ?? 0;
        return L >= Fe && L <= ue ? { ...je, gain: ce } : je;
      });
      return { ...ke, segments: Ee };
    });
  }, [Ot]), is = u.useCallback(() => {
    ne((L) => !L);
  }, []), [Qt, Ws] = u.useState({}), dn = u.useCallback((L) => {
    if (!L) return null;
    if (Qt[L]) return Qt[L];
    const ce = xe.find((B) => B.id === L);
    return ce != null && ce.directorPlan ? ce.directorPlan : {
      stationId: L,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + x,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [Qt, xe, f, x]), Ss = u.useCallback((L, ce) => {
    L && Ws((B) => {
      const ke = B[L] || dn(L), Ee = [...ke.segments || []], je = Ee.findIndex((Tt) => {
        const xs = Tt.startEpochMs ?? Tt.StartEpochMs ?? 0, Jt = Tt.endEpochMs ?? Tt.EndEpochMs ?? 0;
        return ce > xs + 500 && ce < Jt - 500;
      });
      if (je === -1) return B;
      const Fe = Ee[je], ue = Fe.startEpochMs ?? Fe.StartEpochMs ?? 0, Qe = Fe.endEpochMs ?? Fe.EndEpochMs ?? 0, He = Fe.targetDisplayId ?? Fe.TargetDisplayId ?? "mon-0", Je = !!(Fe.isManualOverride ?? Fe.IsManualOverride), yt = { ...Fe, startEpochMs: ue, endEpochMs: ce, targetDisplayId: He, isManualOverride: Je }, dt = { ...Fe, startEpochMs: ce, endEpochMs: Qe, targetDisplayId: He, isManualOverride: Je };
      return Ee.splice(je, 1, yt, dt), { ...B, [L]: { ...ke, segments: Ee } };
    });
  }, [dn]), Te = u.useCallback((L, ce, B) => {
    L && Ws((ke) => {
      const Ee = ke[L] || dn(L), je = [...Ee.segments || []];
      let Fe = je.findIndex((Qe) => {
        const He = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Je = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return ce > He && ce < Je;
      });
      if (Fe === -1 && (Fe = je.findIndex((Qe) => {
        const He = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Je = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return ce >= He && ce <= Je;
      })), Fe === -1) return ke;
      const ue = je[Fe];
      return je[Fe] = { ...ue, targetDisplayId: B, isManualOverride: !0 }, { ...ke, [L]: { ...Ee, segments: je } };
    });
  }, [dn]), Re = u.useCallback((L, ce) => {
    if (!L) return;
    const B = xe.find((Ee) => Ee.id === L), ke = B == null ? void 0 : B.directorPlan;
    Ws((Ee) => {
      var xs;
      const je = Ee[L] || dn(L), Fe = [...je.segments || []];
      let ue = Fe.findIndex((Jt) => {
        const fn = Jt.startEpochMs ?? Jt.StartEpochMs ?? 0, bs = Jt.endEpochMs ?? Jt.EndEpochMs ?? 0;
        return ce > fn && ce < bs;
      });
      if (ue === -1 && (ue = Fe.findIndex((Jt) => {
        const fn = Jt.startEpochMs ?? Jt.StartEpochMs ?? 0, bs = Jt.endEpochMs ?? Jt.EndEpochMs ?? 0;
        return ce >= fn && ce <= bs;
      })), ue === -1) return Ee;
      const Qe = Fe[ue], He = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Je = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0, yt = (He + Je) / 2, dt = (xs = ke == null ? void 0 : ke.segments) == null ? void 0 : xs.find((Jt) => {
        const fn = Jt.startEpochMs ?? Jt.StartEpochMs ?? 0, bs = Jt.endEpochMs ?? Jt.EndEpochMs ?? 0;
        return yt >= fn && yt <= bs;
      }), Tt = dt ? dt.targetDisplayId ?? dt.TargetDisplayId ?? "mon-0" : "mon-0";
      return Fe[ue] = { ...Qe, targetDisplayId: Tt, isManualOverride: !1 }, { ...Ee, [L]: { ...je, segments: Fe } };
    });
  }, [xe, dn]), gs = u.useMemo(() => $t.map((L) => ({
    ...L,
    directorPlan: Qt[L.id] || L.directorPlan || dn(L.id)
  })), [$t, Qt, dn]), kn = u.useMemo(() => ze ? {
    ...ze,
    directorPlan: Qt[ze.id] || ze.directorPlan || dn(ze.id)
  } : null, [ze, Qt, dn]), Dr = u.useMemo(() => gn ? {
    ...gn,
    directorPlan: Qt[gn.id] || gn.directorPlan || dn(gn.id)
  } : null, [gn, Qt, dn]);
  $x({
    activeStationId: M,
    spotlightStationId: k,
    timelineStations: gs,
    selectedStationIdsCount: v.length,
    onSelectActiveStation: Gt,
    setPlaybackSpeed: Ut,
    playheadMs: gt,
    setPlayheadMs: Et,
    inPointMs: he,
    setInPointMs: Pe,
    outPointMs: We,
    setOutPointMs: Ve,
    totalTimelineDurationMs: x,
    zoomLevel: be,
    togglePlaySmart: Dn,
    onToggleHelpModal: () => Ze((L) => !L),
    onSplitDirectorAtPlayhead: () => {
      var ce, B, ke;
      const L = M || (v.length === 1 ? v[0] : null);
      if (L) {
        const Ee = xe.find((Fe) => Fe.id === L);
        (((ce = Ee == null ? void 0 : Ee.displays) == null ? void 0 : ce.length) > 1 || ((ke = (B = Ee == null ? void 0 : Ee.topology) == null ? void 0 : B.displays) == null ? void 0 : ke.length) > 1) && Ss(L, f + gt);
      }
    },
    isModalActive: J || Le || qe
  }), u.useEffect(() => {
    const L = f + he, ce = f + We, B = f + gt;
    hp({
      timeRange: t,
      timeMode: r,
      inPointMs: he,
      outPointMs: We,
      playheadMs: Math.round(gt),
      inEpochMs: L,
      outEpochMs: ce,
      playheadEpochMs: B,
      selectedStationIds: v,
      activeStationId: M,
      zoomLevel: be,
      viewportStartMs: Xe,
      isWorkspaceActive: xt,
      isLooping: qt,
      playbackSpeed: At,
      keystrokeMode: o,
      showRulerKeystrokes: a,
      compositionScope: O,
      compositionLayout: A,
      isAutoDirectorEnabled: W,
      isPipSwapped: I,
      audioRoutingPlan: Ot,
      isAutoFollowAudio: F,
      canvasLayoutTimeline: De
    });
  }, [
    t,
    r,
    he,
    We,
    gt,
    v,
    M,
    be,
    Xe,
    xt,
    qt,
    At,
    f,
    o,
    a,
    O,
    A,
    W,
    I,
    Ot,
    F,
    De
  ]);
  const yo = u.useCallback((L) => {
    var He, Je;
    const ce = $l(L.startTime), B = $l(L.endTime), ke = Math.max(0, B - ce) || 144e5, Ee = {
      start: L.startTime,
      end: L.endTime,
      durationMs: ke,
      startEpochMs: ce,
      endEpochMs: B
    }, je = Math.max(6e4, Math.round(ke * 0.05)), Fe = ce - je, ue = ke + 2 * je;
    if (n(Ee), L.inEpochMs && L.outEpochMs) {
      const yt = Math.max(0, Math.min(ue, L.inEpochMs - Fe)), dt = Math.max(yt + 1e3, Math.min(ue, L.outEpochMs - Fe)), Tt = L.playheadEpochMs ? Math.max(0, Math.min(ue, L.playheadEpochMs - Fe)) : yt;
      Pe(yt), Ve(dt), Et(Tt);
    } else {
      const yt = typeof L.inPointMs == "number" ? L.inPointMs : je, dt = typeof L.outPointMs == "number" ? L.outPointMs : je + ke, Tt = typeof L.playheadMs == "number" ? L.playheadMs : yt;
      Pe(Math.max(0, Math.min(ue, yt))), Ve(Math.max(0, Math.min(ue, dt))), Et(Math.max(0, Math.min(ue, Tt)));
    }
    const Qe = ((He = L.selectedStationIds) == null ? void 0 : He.length) > 0 ? L.selectedStationIds : ((Je = L.cutStationIds) == null ? void 0 : Je.length) > 0 ? L.cutStationIds : L.stationIds;
    if ((Qe == null ? void 0 : Qe.length) > 0) {
      C(Qe);
      const yt = L.spotlightStationId || L.SpotlightStationId || null, dt = L.activeStationId || L.ActiveStationId || null;
      yt && Qe.includes(yt) ? (D(yt), m(yt)) : dt && Qe.includes(dt) ? (D(dt), m(null)) : (D(null), m(null));
    }
    L.keystrokeMode && i(L.keystrokeMode), ot(!0), lt(!1);
  }, []), zi = u.useCallback((L) => {
    const ce = L.startEpochMs || $l(L.start, null, r), B = L.endEpochMs || $l(L.end, null, r), ke = Math.max(0, B - ce) || 144e5, Ee = Math.max(6e4, Math.round(ke * 0.05)), je = ce - Ee, Fe = ke + 2 * Ee;
    n({
      ...L,
      startEpochMs: ce,
      endEpochMs: B,
      durationMs: ke
    }), T(!1), Pe(Ee), Ve(Ee + ke), Et(Ee), Se((ue) => {
      if (!(ue != null && ue.keyframes) || ue.keyframes.length === 0) return ue;
      const Qe = ue.keyframes.map((He, Je) => Je === 0 ? { ...He, timestampEpochMs: je } : He).filter((He) => He.timestampEpochMs >= je && He.timestampEpochMs <= je + Fe);
      return { ...ue, keyframes: Qe };
    }), V((ue) => {
      if (!(ue != null && ue.segments) || ue.segments.length === 0) return ue;
      if (!ue.segments.some((He) => {
        const Je = He.startEpochMs ?? He.StartEpochMs ?? 0;
        return (He.endEpochMs ?? He.EndEpochMs ?? 0) > je && Je < je + Fe;
      })) {
        const He = v[0] || M || "station-0";
        return {
          segments: [
            {
              startEpochMs: je,
              endEpochMs: je + Fe,
              sourceStationId: He
            }
          ]
        };
      }
      return ue;
    }), Ws({});
  }, [r, v, M]), Us = u.useCallback(() => {
    if ($t.map((ce) => ce.id).length === 0) return alert("No active stations selected in timeline.");
    G(!0);
  }, [$t]), hn = u.useCallback(async (L, ce) => {
    var Fe, ue, Qe, He;
    const B = $t.map((Je) => Je.id);
    if (B.length === 0) return;
    let ke = L === "None" ? "None" : "BurnIn";
    const Ee = ce || "NATIVE", je = ((Fe = kn == null ? void 0 : kn.displays) == null ? void 0 : Fe.length) > 1 || ((Qe = (ue = kn == null ? void 0 : kn.topology) == null ? void 0 : ue.displays) == null ? void 0 : Qe.length) > 1 ? ((He = kn == null ? void 0 : kn.directorPlan) == null ? void 0 : He.segments) || [] : [];
    try {
      const Je = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationIds: B,
          inEpochMs: f + he,
          outEpochMs: f + We,
          keystrokeMode: ke,
          resolution: Ee,
          videoQuality: Ee,
          compositionScope: O,
          layoutMode: "canvas",
          canvasLayout: se,
          canvasLayoutTimeline: De,
          isPipSwapped: I,
          isAutoDirectorEnabled: W,
          directorSegments: je,
          audioRoutingSegments: Ot.segments || []
        })
      });
      if (!Je.ok) throw new Error(`HTTP ${Je.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Je) {
      console.error("[Studio] Export failed:", Je), alert("Failed to launch background master MP4 export job.");
    }
  }, [$t, f, he, We, O, se, De, I, W, kn, Ot]), sn = u.useCallback(() => {
    gg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const L = Vd(), ce = Math.max(6e4, Math.round(L.durationMs * 0.05));
    n(L), Pe(ce), Ve(ce + L.durationMs), Et(ce), C([]), D(null), m(null), wt(!1), Ut(1), i("BURN_IN"), Ct(), ot(!1), lt(!0);
  }, [Ct, wt, Ut, Et]), rn = !xt || v.length === 0, tn = f + gt;
  return u.useEffect(() => {
    const L = De == null ? void 0 : De.keyframes;
    if (!L || L.length === 0) return;
    let ce = 0;
    for (let B = 0; B < L.length && L[B].timestampEpochMs <= tn + 50; B++)
      ce = B;
    ce !== Q && le(ce);
  }, [tn, De == null ? void 0 : De.keyframes, Q]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        hg,
        {
          timeRange: t,
          baseEpochMs: h,
          timeMode: r,
          setTimeMode: l,
          activeStationId: M,
          hideBackToGrid: $t.length <= 1,
          onResetActiveStation: () => Gt(null),
          onOpenRangeModal: () => Ne(!0),
          onOpenBookmarksModal: () => Ge(!0),
          onOpenHelpModal: () => Ze(!0),
          onToggleDrawer: () => lt(!Ye),
          isInitialSetup: rn,
          selectedCount: v.length,
          totalCount: xe.length,
          onResetStudio: sn
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
              onClick: () => Ne(!0),
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
        !rn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              Ag,
              {
                activeStation: kn,
                timelineStations: gs,
                allStations: xe,
                onSelectActiveStation: Gt,
                onOpenSpotlight: Zn,
                onStationContextMenu: Ae,
                onDeselectStation: pe,
                stationAutoDirectorMap: K,
                onToggleStationAutoDirector: ct,
                onOpenDrawer: () => lt(!0),
                baseEpochMs: f,
                playheadMs: gt,
                playheadEpochMs: tn,
                timeMode: r,
                isPlaying: Ke ? !1 : On,
                setIsPlaying: wt,
                totalDurationMs: x,
                inPointMs: he,
                outPointMs: We,
                setPlayheadMs: Et,
                globalGaps: E,
                recordingSegments: vt,
                playbackSpeed: At,
                onChangePlaybackSpeed: Ut,
                keystrokeMode: o,
                keystrokes: Lt,
                directorPlan: kn == null ? void 0 : kn.directorPlan,
                onOverrideDisplay: Te,
                onResetOverride: Re,
                compositionScope: O,
                onChangeCompositionScope: U,
                compositionLayout: A,
                onChangeCompositionLayout: oe,
                isAutoDirectorEnabled: W,
                onToggleAutoDirector: () => re((L) => !L),
                isPipSwapped: I,
                onTogglePipSwap: () => R((L) => !L),
                onUpdateCanvasLayout: _e,
                canvasLayoutTimeline: De,
                onUpdateCanvasLayoutTimeline: Se,
                activeKfIndex: Q,
                setActiveKfIndex: le,
                isModalOpen: Z || J || Le || Ke || qe
              }
            ),
            /* @__PURE__ */ s.jsx(
              pp,
              {
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: x,
                playheadMs: gt,
                setPlayheadMs: Et,
                inPointMs: he,
                setInPointMs: Pe,
                outPointMs: We,
                setOutPointMs: Ve,
                activeStationId: M,
                isPlaying: On,
                setIsPlaying: Dn,
                isLooping: qt,
                setIsLooping: un,
                playbackSpeed: At,
                onChangeSpeed: Ut,
                onSetInPoint: () => Pe(Math.max(0, Math.min(gt, We - 1e3))),
                onSetOutPoint: () => Ve(Math.min(x, Math.max(gt, he + 1e3)))
              }
            )
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "studio-bottom-timeline", ref: Sn, children: /* @__PURE__ */ s.jsx(
            yp,
            {
              stations: gs,
              activeStationId: M,
              onSelectActiveStation: (L) => Gt(v.length <= 1 ? L : L === M ? null : L),
              onStationContextMenu: Ae,
              onDeselectStation: pe,
              stationAutoDirectorMap: K,
              onToggleStationAutoDirector: ct,
              baseEpochMs: f,
              timeMode: r,
              totalDurationMs: x,
              zoomLevel: be,
              onZoomChange: Ie,
              onZoomReset: Ct,
              onFitRange: q,
              onJumpViewportTo: me,
              playheadMs: gt,
              setPlayheadMs: Et,
              inPointMs: he,
              setInPointMs: Pe,
              outPointMs: We,
              setOutPointMs: Ve,
              viewportStartMs: Xe,
              onViewportStartChange: ut,
              onExport: Us,
              recordingSegments: vt,
              movieBoundaries: Yt,
              onEstimateLoaded: (L) => (L == null ? void 0 : L.removedGlobalGaps) && j(L.removedGlobalGaps),
              keystrokeMode: o,
              onChangeKeystrokeMode: i,
              keystrokes: Lt,
              showKeystrokes: a,
              showRulerKeystrokes: a,
              onToggleRulerKeystrokes: () => c((L) => !L),
              onSplitDirectorSegment: Ss,
              onChangeDirectorSegmentDisplay: Te,
              onResetDirectorSegmentToAuto: Re,
              audioRoutingPlan: Ot,
              onSplitAudioSegment: Cs,
              onChangeAudioSegmentStation: en,
              onChangeAudioSegmentGain: _t,
              onFollowVisualFeed: is,
              isAutoFollowAudio: F,
              canvasLayoutTimeline: De,
              activeKfIndex: Q,
              onSelectKeyframe: (L, ce) => {
                le(L), Et(Math.max(0, ce - f));
              },
              onAddKeyframeAtEpoch: ee,
              onDeleteKeyframe: Me,
              onUpdateKeyframeEpoch: z,
              onUpdateKeyframeTransition: te,
              onToggleDisplayOnCanvas: on,
              onUpdateAudioPlan: V
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          px,
          {
            isOpen: Ye || rn,
            onToggle: () => lt(!Ye),
            onClose: () => lt(!1),
            allStations: xe,
            selectedStationIds: v,
            onToggleStation: (L) => C((ce) => ce.includes(L) ? ce.filter((B) => B !== L) : [...ce, L]),
            onUpdateSelections: C,
            isInitialSetup: rn,
            isLoadingStations: Ue,
            recordingSegments: vt,
            baseEpochMs: h,
            durationMs: t.durationMs,
            onApply: () => {
              v.length > 0 && (D(null), m(null), ot(!0), lt(!1));
            },
            onOpenRangeModal: () => Ne(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      xx,
      {
        isOpen: J,
        onClose: () => Ne(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: yo,
        onApplyRange: zi
      }
    ),
    /* @__PURE__ */ s.jsx(
      vx,
      {
        isOpen: Le,
        onClose: () => Ge(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: gt,
          inPointMs: he,
          outPointMs: We,
          selectedStationIds: v,
          selectedStationNames: xe.filter((L) => v.includes(L.id)).map((L) => L.displayName || L.hostname || L.id),
          allStationIds: xe.map((L) => L.id),
          activeStationId: M,
          activeStationName: (ze == null ? void 0 : ze.displayName) || (ze == null ? void 0 : ze.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: yo
      }
    ),
    /* @__PURE__ */ s.jsx(
      kp,
      {
        isOpen: qe,
        onClose: () => Ze(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Sx,
      {
        isOpen: Ke,
        station: Dr,
        initialDisplayId: d,
        allStations: gs,
        onSelectStation: (L) => {
          L !== k && Ut(1), D(L), m(L);
        },
        onClose: bn,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: x,
        zoomLevel: be,
        onZoomChange: Ie,
        onZoomReset: Ct,
        onFitRange: q,
        onJumpViewportTo: me,
        viewportStartMs: Xe,
        onViewportStartChange: ut,
        playheadMs: gt,
        setPlayheadMs: Et,
        playheadEpochMs: tn,
        inPointMs: he,
        setInPointMs: Pe,
        outPointMs: We,
        setOutPointMs: Ve,
        recordingSegments: vt,
        globalGaps: E,
        isPlaying: On,
        setIsPlaying: wt,
        isLooping: qt,
        setIsLooping: un,
        playbackSpeed: At,
        setPlaybackSpeed: Ut,
        onExport: Us,
        keystrokeMode: o,
        onChangeKeystrokeMode: i,
        keystrokes: Lt,
        showRulerKeystrokes: a,
        onToggleRulerKeystrokes: () => c((L) => !L),
        directorPlan: Dr == null ? void 0 : Dr.directorPlan,
        onOverrideDisplay: Te,
        onSplitDirectorSegment: Ss,
        onChangeDirectorSegmentDisplay: Te,
        onResetDirectorSegmentToAuto: Re
      }
    ),
    /* @__PURE__ */ s.jsx(
      bx,
      {
        menu: g,
        onClose: () => b(null),
        onDeselect: pe,
        onFocusSolo: Gt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Mx,
      {
        isOpen: Z,
        onClose: () => G(!1),
        onConfirm: hn,
        compositionSummary: {
          scope: O,
          layout: (se == null ? void 0 : se.preset) || A,
          isPipSwapped: I,
          isAutoDirectorEnabled: W,
          stationsCount: $t.length,
          audioSegmentsCount: ((kl = Ot == null ? void 0 : Ot.segments) == null ? void 0 : kl.length) || 1,
          resolution: (De == null ? void 0 : De.resolution) || "NATIVE",
          canvasWidth: (se == null ? void 0 : se.width) || 1920,
          canvasHeight: (se == null ? void 0 : se.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(wp, {})
  ] });
}
const Yd = "itb-extractor-advanced-theme", Xd = "itb-global-export-job-monitor-root";
function jp() {
  if (!(typeof document > "u") && !document.getElementById(Yd)) {
    const e = document.createElement("link");
    e.id = Yd, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
jp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(Xd);
  if (!t) {
    t = document.createElement("div"), t.id = Xd, document.body.appendChild(t);
    try {
      ei.createRoot(t).render(fo.createElement(wp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Ox(e, t = {}) {
  jp();
  const n = ei.createRoot(e);
  return n.render(fo.createElement(Lx, t)), () => {
    n.unmount();
  };
}
export {
  wp as ExportJobMonitor,
  Lx as ExtractorAdvancedStudio,
  Lx as default,
  Ox as mount
};
