function Xp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var hh = { exports: {} }, Et = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jo = Symbol.for("react.element"), Qp = Symbol.for("react.portal"), Jp = Symbol.for("react.fragment"), Zp = Symbol.for("react.strict_mode"), qp = Symbol.for("react.profiler"), em = Symbol.for("react.provider"), tm = Symbol.for("react.context"), nm = Symbol.for("react.forward_ref"), sm = Symbol.for("react.suspense"), rm = Symbol.for("react.memo"), lm = Symbol.for("react.lazy"), Uu = Symbol.iterator;
function om(e) {
  return e === null || typeof e != "object" ? null : (e = Uu && e[Uu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ph = Object.assign, mh = {};
function bl(e, t, n) {
  this.props = e, this.context = t, this.refs = mh, this.updater = n || fh;
}
bl.prototype.isReactComponent = {};
bl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
bl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function gh() {
}
gh.prototype = bl.prototype;
function Bc(e, t, n) {
  this.props = e, this.context = t, this.refs = mh, this.updater = n || fh;
}
var Uc = Bc.prototype = new gh();
Uc.constructor = Bc;
ph(Uc, bl.prototype);
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
  return { $$typeof: jo, type: e, key: o, ref: a, props: l, _owner: Wc.current };
}
function am(e, t) {
  return { $$typeof: jo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function zc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === jo;
}
function im(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var zu = /\/+/g;
function oi(e, t) {
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
        case jo:
        case Qp:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + oi(a, 0) : r, Wu(l) ? (n = "", e != null && (n = e.replace(zu, "$&/") + "/"), ea(l, t, n, "", function(d) {
    return d;
  })) : l != null && (zc(l) && (l = am(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(zu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Wu(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + oi(o, i);
    a += ea(o, t, n, c, l);
  }
  else if (c = om(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + oi(o, i++), a += ea(o, t, n, c, l);
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
var _n = { current: null }, ta = { transition: null }, um = { ReactCurrentDispatcher: _n, ReactCurrentBatchConfig: ta, ReactCurrentOwner: Wc };
function Nh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Et.Children = { map: Oo, forEach: function(e, t, n) {
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
Et.Component = bl;
Et.Fragment = Jp;
Et.Profiler = qp;
Et.PureComponent = Bc;
Et.StrictMode = Zp;
Et.Suspense = sm;
Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = um;
Et.act = Nh;
Et.cloneElement = function(e, t, n) {
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
  return { $$typeof: jo, type: e.type, key: l, ref: o, props: r, _owner: a };
};
Et.createContext = function(e) {
  return e = { $$typeof: tm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: em, _context: e }, e.Consumer = e;
};
Et.createElement = vh;
Et.createFactory = function(e) {
  var t = vh.bind(null, e);
  return t.type = e, t;
};
Et.createRef = function() {
  return { current: null };
};
Et.forwardRef = function(e) {
  return { $$typeof: nm, render: e };
};
Et.isValidElement = zc;
Et.lazy = function(e) {
  return { $$typeof: lm, _payload: { _status: -1, _result: e }, _init: cm };
};
Et.memo = function(e, t) {
  return { $$typeof: rm, type: e, compare: t === void 0 ? null : t };
};
Et.startTransition = function(e) {
  var t = ta.transition;
  ta.transition = {};
  try {
    e();
  } finally {
    ta.transition = t;
  }
};
Et.unstable_act = Nh;
Et.useCallback = function(e, t) {
  return _n.current.useCallback(e, t);
};
Et.useContext = function(e) {
  return _n.current.useContext(e);
};
Et.useDebugValue = function() {
};
Et.useDeferredValue = function(e) {
  return _n.current.useDeferredValue(e);
};
Et.useEffect = function(e, t) {
  return _n.current.useEffect(e, t);
};
Et.useId = function() {
  return _n.current.useId();
};
Et.useImperativeHandle = function(e, t, n) {
  return _n.current.useImperativeHandle(e, t, n);
};
Et.useInsertionEffect = function(e, t) {
  return _n.current.useInsertionEffect(e, t);
};
Et.useLayoutEffect = function(e, t) {
  return _n.current.useLayoutEffect(e, t);
};
Et.useMemo = function(e, t) {
  return _n.current.useMemo(e, t);
};
Et.useReducer = function(e, t, n) {
  return _n.current.useReducer(e, t, n);
};
Et.useRef = function(e) {
  return _n.current.useRef(e);
};
Et.useState = function(e) {
  return _n.current.useState(e);
};
Et.useSyncExternalStore = function(e, t, n) {
  return _n.current.useSyncExternalStore(e, t, n);
};
Et.useTransition = function() {
  return _n.current.useTransition();
};
Et.version = "18.3.1";
hh.exports = Et;
var u = hh.exports;
const Co = /* @__PURE__ */ Xp(u);
var ma = {}, kh = { exports: {} }, ls = {}, wh = { exports: {} }, Eh = {};
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
  function t(I, B) {
    var O = I.length;
    I.push(B);
    e: for (; 0 < O; ) {
      var K = O - 1 >>> 1, R = I[K];
      if (0 < l(R, B)) I[K] = B, I[O] = R, O = K;
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function r(I) {
    if (I.length === 0) return null;
    var B = I[0], O = I.pop();
    if (O !== B) {
      I[0] = O;
      e: for (var K = 0, R = I.length, oe = R >>> 1; K < oe; ) {
        var q = 2 * (K + 1) - 1, J = I[q], Y = q + 1, Le = I[Y];
        if (0 > l(J, O)) Y < R && 0 > l(Le, J) ? (I[K] = Le, I[Y] = O, K = Y) : (I[K] = J, I[q] = O, K = q);
        else if (Y < R && 0 > l(Le, O)) I[K] = Le, I[Y] = O, K = Y;
        else break e;
      }
    }
    return B;
  }
  function l(I, B) {
    var O = I.sortIndex - B.sortIndex;
    return O !== 0 ? O : I.id - B.id;
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
  var c = [], d = [], v = 1, f = null, p = 3, y = !1, S = !1, M = !1, _ = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, x = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(I) {
    for (var B = n(d); B !== null; ) {
      if (B.callback === null) r(d);
      else if (B.startTime <= I) r(d), B.sortIndex = B.expirationTime, t(c, B);
      else break;
      B = n(d);
    }
  }
  function T(I) {
    if (M = !1, m(I), !S) if (n(c) !== null) S = !0, ne(w);
    else {
      var B = n(d);
      B !== null && V(T, B.startTime - I);
    }
  }
  function w(I, B) {
    S = !1, M && (M = !1, k(A), A = -1), y = !0;
    var O = p;
    try {
      for (m(B), f = n(c); f !== null && (!(f.expirationTime > B) || I && !P()); ) {
        var K = f.callback;
        if (typeof K == "function") {
          f.callback = null, p = f.priorityLevel;
          var R = K(f.expirationTime <= B);
          B = e.unstable_now(), typeof R == "function" ? f.callback = R : f === n(c) && r(c), m(B);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var oe = !0;
      else {
        var q = n(d);
        q !== null && V(T, q.startTime - B), oe = !1;
      }
      return oe;
    } finally {
      f = null, p = O, y = !1;
    }
  }
  var b = !1, h = null, A = -1, j = 5, N = -1;
  function P() {
    return !(e.unstable_now() - N < j);
  }
  function U() {
    if (h !== null) {
      var I = e.unstable_now();
      N = I;
      var B = !0;
      try {
        B = h(!0, I);
      } finally {
        B ? L() : (b = !1, h = null);
      }
    } else b = !1;
  }
  var L;
  if (typeof x == "function") L = function() {
    x(U);
  };
  else if (typeof MessageChannel < "u") {
    var z = new MessageChannel(), le = z.port2;
    z.port1.onmessage = U, L = function() {
      le.postMessage(null);
    };
  } else L = function() {
    _(U, 0);
  };
  function ne(I) {
    h = I, b || (b = !0, L());
  }
  function V(I, B) {
    A = _(function() {
      I(e.unstable_now());
    }, B);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, ne(w));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(I) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var B = 3;
        break;
      default:
        B = p;
    }
    var O = p;
    p = B;
    try {
      return I();
    } finally {
      p = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, B) {
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
      return B();
    } finally {
      p = O;
    }
  }, e.unstable_scheduleCallback = function(I, B, O) {
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
    return R = O + R, I = { id: v++, callback: B, priorityLevel: I, startTime: O, expirationTime: R, sortIndex: -1 }, O > K ? (I.sortIndex = O, t(d, I), n(c) === null && I === n(d) && (M ? (k(A), A = -1) : M = !0, V(T, O - K))) : (I.sortIndex = R, t(c, I), S || y || (S = !0, ne(w))), I;
  }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(I) {
    var B = p;
    return function() {
      var O = p;
      p = B;
      try {
        return I.apply(this, arguments);
      } finally {
        p = O;
      }
    };
  };
})(Eh);
wh.exports = Eh;
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
var hm = u, rs = dm;
function Ne(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var jh = /* @__PURE__ */ new Set(), lo = {};
function zr(e, t) {
  kl(e, t), kl(e + "Capture", t);
}
function kl(e, t) {
  for (lo[e] = t, e = 0; e < t.length; e++) jh.add(t[e]);
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
function Fn(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var jn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  jn[e] = new Fn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  jn[t] = new Fn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  jn[e] = new Fn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  jn[e] = new Fn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  jn[e] = new Fn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  jn[e] = new Fn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  jn[e] = new Fn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  jn[e] = new Fn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  jn[e] = new Fn(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  jn[t] = new Fn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Hc, Kc);
  jn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Hc, Kc);
  jn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  jn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
jn.xlinkHref = new Fn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  jn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Vc(e, t, n, r) {
  var l = jn.hasOwnProperty(t) ? jn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (gm(t, n, l, r) && (n = null), r || l === null ? pm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ys = hm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Do = Symbol.for("react.element"), qr = Symbol.for("react.portal"), el = Symbol.for("react.fragment"), Yc = Symbol.for("react.strict_mode"), Ui = Symbol.for("react.profiler"), Ch = Symbol.for("react.provider"), Sh = Symbol.for("react.context"), Gc = Symbol.for("react.forward_ref"), Wi = Symbol.for("react.suspense"), zi = Symbol.for("react.suspense_list"), Xc = Symbol.for("react.memo"), tr = Symbol.for("react.lazy"), Mh = Symbol.for("react.offscreen"), Vu = Symbol.iterator;
function Ol(e) {
  return e === null || typeof e != "object" ? null : (e = Vu && e[Vu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var rn = Object.assign, ai;
function Vl(e) {
  if (ai === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    ai = t && t[1] || "";
  }
  return `
` + ai + e;
}
var ii = !1;
function ci(e, t) {
  if (!e || ii) return "";
  ii = !0;
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
    ii = !1, Error.prepareStackTrace = n;
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
      return e = ci(e.type, !1), e;
    case 11:
      return e = ci(e.type.render, !1), e;
    case 1:
      return e = ci(e.type, !0), e;
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
function bh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function vm(e) {
  var t = bh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  return e && (r = bh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ga(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ki(e, t) {
  var n = t.checked;
  return rn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
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
  (t !== "number" || ga(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
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
  if (t.dangerouslySetInnerHTML != null) throw Error(Ne(91));
  return rn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Xu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Ne(92));
      if (Yl(n)) {
        if (1 < n.length) throw Error(Ne(93));
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
var km = rn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Qi(e, t) {
  if (t) {
    if (km[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Ne(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Ne(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Ne(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Ne(62));
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
  if (e = bo(e)) {
    if (typeof qi != "function") throw Error(Ne(280));
    var t = e.stateNode;
    t && (t = Va(t), qi(e.stateNode, e.type, t));
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
var ui = !1;
function Bh(e, t, n) {
  if (ui) return e(t, n);
  ui = !0;
  try {
    return _h(e, t, n);
  } finally {
    ui = !1, (fl !== null || pl !== null) && (Fh(), Ph());
  }
}
function ao(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Va(n);
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
  } catch (v) {
    this.onError(v);
  }
}
var Jl = !1, xa = null, ya = !1, tc = null, Em = { onError: function(e) {
  Jl = !0, xa = e;
} };
function jm(e, t, n, r, l, o, a, i, c) {
  Jl = !1, xa = null, wm.apply(Em, arguments);
}
function Cm(e, t, n, r, l, o, a, i, c) {
  if (jm.apply(this, arguments), Jl) {
    if (Jl) {
      var d = xa;
      Jl = !1, xa = null;
    } else throw Error(Ne(198));
    ya || (ya = !0, tc = d);
  }
}
function Hr(e) {
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
  if (Hr(e) !== e) throw Error(Ne(188));
}
function Sm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Hr(e), t === null) throw Error(Ne(188));
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
var Hh = rs.unstable_scheduleCallback, qu = rs.unstable_cancelCallback, Mm = rs.unstable_shouldYield, bm = rs.unstable_requestPaint, cn = rs.unstable_now, Im = rs.unstable_getCurrentPriorityLevel, Jc = rs.unstable_ImmediatePriority, Kh = rs.unstable_UserBlockingPriority, va = rs.unstable_NormalPriority, Tm = rs.unstable_LowPriority, Vh = rs.unstable_IdlePriority, Wa = null, $s = null;
function Am(e) {
  if ($s && typeof $s.onCommitFiberRoot == "function") try {
    $s.onCommitFiberRoot(Wa, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Es = Math.clz32 ? Math.clz32 : Lm, $m = Math.log, Rm = Math.LN2;
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
function Na(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Gl(i) : (o &= a, o !== 0 && (r = Gl(o)));
  } else a = n & ~l, a !== 0 ? r = Gl(a) : o !== 0 && (r = Gl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Es(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var a = 31 - Es(o), i = 1 << a, c = l[a];
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
function di(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function So(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Es(t), e[t] = n;
}
function Pm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Es(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Zc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Es(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Bt = 0;
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
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = bo(t), t !== null && qc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
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
  var t = Ar(e.target);
  if (t !== null) {
    var n = Hr(t);
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
    } else return t = bo(n), t !== null && qc(t), e.blockedOn = n, !1;
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
  e.blockedOn === t && (e.blockedOn = null, sc || (sc = !0, rs.unstable_scheduleCallback(rs.unstable_NormalPriority, Bm)));
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
var ml = Ys.ReactCurrentBatchConfig, ka = !0;
function Um(e, t, n, r) {
  var l = Bt, o = ml.transition;
  ml.transition = null;
  try {
    Bt = 1, eu(e, t, n, r);
  } finally {
    Bt = l, ml.transition = o;
  }
}
function Wm(e, t, n, r) {
  var l = Bt, o = ml.transition;
  ml.transition = null;
  try {
    Bt = 4, eu(e, t, n, r);
  } finally {
    Bt = l, ml.transition = o;
  }
}
function eu(e, t, n, r) {
  if (ka) {
    var l = rc(e, t, n, r);
    if (l === null) ki(e, t, r, wa, n), ed(e, r);
    else if (Fm(l, e, t, n, r)) r.stopPropagation();
    else if (ed(e, r), t & 4 && -1 < _m.indexOf(e)) {
      for (; l !== null; ) {
        var o = bo(l);
        if (o !== null && Xh(o), o = rc(e, t, n, r), o === null && ki(e, t, r, wa, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ki(e, t, r, null, n);
  }
}
var wa = null;
function rc(e, t, n, r) {
  if (wa = null, e = Qc(r), e = Ar(e), e !== null) if (t = Hr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Uh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return wa = e, null;
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
        case va:
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
function os(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Wo : nd, this.isPropagationStopped = nd, this;
  }
  return rn(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, nu = os(Il), Mo = rn({}, Il, { view: 0, detail: 0 }), zm = os(Mo), hi, fi, Fl, za = rn({}, Mo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: su, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Fl && (Fl && e.type === "mousemove" ? (hi = e.screenX - Fl.screenX, fi = e.screenY - Fl.screenY) : fi = hi = 0, Fl = e), hi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : fi;
} }), sd = os(za), Hm = rn({}, za, { dataTransfer: 0 }), Km = os(Hm), Vm = rn({}, Mo, { relatedTarget: 0 }), pi = os(Vm), Ym = rn({}, Il, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gm = os(Ym), Xm = rn({}, Il, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Qm = os(Xm), Jm = rn({}, Il, { data: 0 }), rd = os(Jm), Zm = {
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
var n0 = rn({}, Mo, { key: function(e) {
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
} }), s0 = os(n0), r0 = rn({}, za, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ld = os(r0), l0 = rn({}, Mo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: su }), o0 = os(l0), a0 = rn({}, Il, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), i0 = os(a0), c0 = rn({}, za, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), u0 = os(c0), d0 = [9, 13, 27, 32], ru = zs && "CompositionEvent" in window, Zl = null;
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
  Dh(r), t = Ea(t, "onChange"), 0 < t.length && (n = new nu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ql = null, ho = null;
function g0(e) {
  xf(e, 0);
}
function Ha(e) {
  var t = rl(e);
  if (Ih(t)) return e;
}
function x0(e, t) {
  if (e === "change") return t;
}
var of = !1;
if (zs) {
  var mi;
  if (zs) {
    var gi = "oninput" in document;
    if (!gi) {
      var cd = document.createElement("div");
      cd.setAttribute("oninput", "return;"), gi = typeof cd.oninput == "function";
    }
    mi = gi;
  } else mi = !1;
  of = mi && (!document.documentMode || 9 < document.documentMode);
}
function ud() {
  ql && (ql.detachEvent("onpropertychange", af), ho = ql = null);
}
function af(e) {
  if (e.propertyName === "value" && Ha(ho)) {
    var t = [];
    lf(t, ho, e, Qc(e)), Bh(g0, t);
  }
}
function y0(e, t, n) {
  e === "focusin" ? (ud(), ql = t, ho = n, ql.attachEvent("onpropertychange", af)) : e === "focusout" && ud();
}
function v0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ha(ho);
}
function N0(e, t) {
  if (e === "click") return Ha(t);
}
function k0(e, t) {
  if (e === "input" || e === "change") return Ha(t);
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
  for (var e = window, t = ga(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ga(e.document);
  }
  return t;
}
function lu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function E0(e) {
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
var j0 = zs && "documentMode" in document && 11 >= document.documentMode, nl = null, lc = null, eo = null, oc = !1;
function fd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  oc || nl == null || nl !== ga(r) || (r = nl, "selectionStart" in r && lu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), eo && fo(eo, r) || (eo = r, r = Ea(lc, "onSelect"), 0 < r.length && (t = new nu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = nl)));
}
function zo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var sl = { animationend: zo("Animation", "AnimationEnd"), animationiteration: zo("Animation", "AnimationIteration"), animationstart: zo("Animation", "AnimationStart"), transitionend: zo("Transition", "TransitionEnd") }, xi = {}, df = {};
zs && (df = document.createElement("div").style, "AnimationEvent" in window || (delete sl.animationend.animation, delete sl.animationiteration.animation, delete sl.animationstart.animation), "TransitionEvent" in window || delete sl.transitionend.transition);
function Ka(e) {
  if (xi[e]) return xi[e];
  if (!sl[e]) return e;
  var t = sl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in df) return xi[e] = t[n];
  return e;
}
var hf = Ka("animationend"), ff = Ka("animationiteration"), pf = Ka("animationstart"), mf = Ka("transitionend"), gf = /* @__PURE__ */ new Map(), pd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nr(e, t) {
  gf.set(e, t), zr(t, [e]);
}
for (var yi = 0; yi < pd.length; yi++) {
  var vi = pd[yi], C0 = vi.toLowerCase(), S0 = vi[0].toUpperCase() + vi.slice(1);
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
zr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
zr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
zr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
zr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
zr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
zr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), M0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xl));
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
  if (ya) throw e = tc, ya = !1, tc = null, e;
}
function Qt(e, t) {
  var n = t[dc];
  n === void 0 && (n = t[dc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (yf(t, e, 2, !1), n.add(r));
}
function Ni(e, t, n) {
  var r = 0;
  t && (r |= 4), yf(n, e, r, t);
}
var Ho = "_reactListening" + Math.random().toString(36).slice(2);
function po(e) {
  if (!e[Ho]) {
    e[Ho] = !0, jh.forEach(function(n) {
      n !== "selectionchange" && (M0.has(n) || Ni(n, !1, e), Ni(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ho] || (t[Ho] = !0, Ni("selectionchange", !1, t));
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
function ki(e, t, n, r, l) {
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
  Bh(function() {
    var d = o, v = Qc(n), f = [];
    e: {
      var p = gf.get(e);
      if (p !== void 0) {
        var y = nu, S = e;
        switch (e) {
          case "keypress":
            if (ra(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = s0;
            break;
          case "focusin":
            S = "focus", y = pi;
            break;
          case "focusout":
            S = "blur", y = pi;
            break;
          case "beforeblur":
          case "afterblur":
            y = pi;
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
            y = sd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Km;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = o0;
            break;
          case hf:
          case ff:
          case pf:
            y = Gm;
            break;
          case mf:
            y = i0;
            break;
          case "scroll":
            y = zm;
            break;
          case "wheel":
            y = u0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Qm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = ld;
        }
        var M = (t & 4) !== 0, _ = !M && e === "scroll", k = M ? p !== null ? p + "Capture" : null : p;
        M = [];
        for (var x = d, m; x !== null; ) {
          m = x;
          var T = m.stateNode;
          if (m.tag === 5 && T !== null && (m = T, k !== null && (T = ao(x, k), T != null && M.push(mo(x, T, m)))), _) break;
          x = x.return;
        }
        0 < M.length && (p = new y(p, S, null, n, v), f.push({ event: p, listeners: M }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== Zi && (S = n.relatedTarget || n.fromElement) && (Ar(S) || S[Hs])) break e;
        if ((y || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? Ar(S) : null, S !== null && (_ = Hr(S), S !== _ || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (M = sd, T = "onMouseLeave", k = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (M = ld, T = "onPointerLeave", k = "onPointerEnter", x = "pointer"), _ = y == null ? p : rl(y), m = S == null ? p : rl(S), p = new M(T, x + "leave", y, n, v), p.target = _, p.relatedTarget = m, T = null, Ar(v) === d && (M = new M(k, x + "enter", S, n, v), M.target = m, M.relatedTarget = _, T = M), _ = T, y && S) t: {
            for (M = y, k = S, x = 0, m = M; m; m = Yr(m)) x++;
            for (m = 0, T = k; T; T = Yr(T)) m++;
            for (; 0 < x - m; ) M = Yr(M), x--;
            for (; 0 < m - x; ) k = Yr(k), m--;
            for (; x--; ) {
              if (M === k || k !== null && M === k.alternate) break t;
              M = Yr(M), k = Yr(k);
            }
            M = null;
          }
          else M = null;
          y !== null && gd(f, p, y, M, !1), S !== null && _ !== null && gd(f, _, S, M, !0);
        }
      }
      e: {
        if (p = d ? rl(d) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var w = x0;
        else if (id(p)) if (of) w = k0;
        else {
          w = v0;
          var b = y0;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (w = N0);
        if (w && (w = w(e, d))) {
          lf(f, w, n, v);
          break e;
        }
        b && b(e, p, d), e === "focusout" && (b = p._wrapperState) && b.controlled && p.type === "number" && Yi(p, "number", p.value);
      }
      switch (b = d ? rl(d) : window, e) {
        case "focusin":
          (id(b) || b.contentEditable === "true") && (nl = b, lc = d, eo = null);
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
          oc = !1, fd(f, n, v);
          break;
        case "selectionchange":
          if (j0) break;
        case "keydown":
        case "keyup":
          fd(f, n, v);
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
      A && (nf && n.locale !== "ko" && (tl || A !== "onCompositionStart" ? A === "onCompositionEnd" && tl && (h = tf()) : (ir = v, tu = "value" in ir ? ir.value : ir.textContent, tl = !0)), b = Ea(d, A), 0 < b.length && (A = new rd(A, e, null, n, v), f.push({ event: A, listeners: b }), h ? A.data = h : (h = rf(n), h !== null && (A.data = h)))), (h = h0 ? f0(e, n) : p0(e, n)) && (d = Ea(d, "onBeforeInput"), 0 < d.length && (v = new rd("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = h));
    }
    xf(f, t);
  });
}
function mo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ea(e, t) {
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
var b0 = /\r\n?/g, I0 = /\u0000|\uFFFD/g;
function xd(e) {
  return (typeof e == "string" ? e : "" + e).replace(b0, `
`).replace(I0, "");
}
function Ko(e, t, n) {
  if (t = xd(t), xd(e) !== t && n) throw Error(Ne(425));
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
function wi(e, t) {
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
function Ar(e) {
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
function bo(e) {
  return e = e[Ts] || e[Hs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function rl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Ne(33));
}
function Va(e) {
  return e[go] || null;
}
var hc = [], ll = -1;
function kr(e) {
  return { current: e };
}
function Jt(e) {
  0 > ll || (e.current = hc[ll], hc[ll] = null, ll--);
}
function Gt(e, t) {
  ll++, hc[ll] = e.current, e.current = t;
}
var vr = {}, Tn = kr(vr), Yn = kr(!1), _r = vr;
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
function Ca() {
  Jt(Yn), Jt(Tn);
}
function Nd(e, t, n) {
  if (Tn.current !== vr) throw Error(Ne(168));
  Gt(Tn, t), Gt(Yn, n);
}
function vf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(Ne(108, ym(e) || "Unknown", l));
  return rn({}, n, r);
}
function Sa(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, _r = Tn.current, Gt(Tn, e), Gt(Yn, Yn.current), !0;
}
function kd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Ne(169));
  n ? (e = vf(e, t, _r), r.__reactInternalMemoizedMergedChildContext = e, Jt(Yn), Jt(Tn), Gt(Tn, e)) : Jt(Yn), Gt(Yn, n);
}
var Ps = null, Ya = !1, Ei = !1;
function Nf(e) {
  Ps === null ? Ps = [e] : Ps.push(e);
}
function O0(e) {
  Ya = !0, Nf(e);
}
function wr() {
  if (!Ei && Ps !== null) {
    Ei = !0;
    var e = 0, t = Bt;
    try {
      var n = Ps;
      for (Bt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ps = null, Ya = !1;
    } catch (l) {
      throw Ps !== null && (Ps = Ps.slice(e + 1)), Hh(Jc, wr), l;
    } finally {
      Bt = t, Ei = !1;
    }
  }
  return null;
}
var ol = [], al = 0, Ma = null, ba = 0, us = [], ds = 0, Fr = null, Fs = 1, Bs = "";
function br(e, t) {
  ol[al++] = ba, ol[al++] = Ma, Ma = e, ba = t;
}
function kf(e, t, n) {
  us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Fr, Fr = e;
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
function ou(e) {
  e.return !== null && (br(e, 1), kf(e, 1, 0));
}
function au(e) {
  for (; e === Ma; ) Ma = ol[--al], ol[al] = null, ba = ol[--al], ol[al] = null;
  for (; e === Fr; ) Fr = us[--ds], us[ds] = null, Bs = us[--ds], us[ds] = null, Fs = us[--ds], us[ds] = null;
}
var ss = null, ns = null, qt = !1, ks = null;
function wf(e, t) {
  var n = hs(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function wd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = fr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ss = e, ns = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Fr !== null ? { id: Fs, overflow: Bs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = hs(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ss = e, ns = null, !0) : !1;
    default:
      return !1;
  }
}
function fc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function pc(e) {
  if (qt) {
    var t = ns;
    if (t) {
      var n = t;
      if (!wd(e, t)) {
        if (fc(e)) throw Error(Ne(418));
        t = fr(n.nextSibling);
        var r = ss;
        t && wd(e, t) ? wf(r, n) : (e.flags = e.flags & -4097 | 2, qt = !1, ss = e);
      }
    } else {
      if (fc(e)) throw Error(Ne(418));
      e.flags = e.flags & -4097 | 2, qt = !1, ss = e;
    }
  }
}
function Ed(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ss = e;
}
function Vo(e) {
  if (e !== ss) return !1;
  if (!qt) return Ed(e), qt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !cc(e.type, e.memoizedProps)), t && (t = ns)) {
    if (fc(e)) throw Ef(), Error(Ne(418));
    for (; t; ) wf(e, t), t = fr(t.nextSibling);
  }
  if (Ed(e), e.tag === 13) {
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
function Ef() {
  for (var e = ns; e; ) e = fr(e.nextSibling);
}
function El() {
  ns = ss = null, qt = !1;
}
function iu(e) {
  ks === null ? ks = [e] : ks.push(e);
}
var D0 = Ys.ReactCurrentBatchConfig;
function Bl(e, t, n) {
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
function Yo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Ne(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function jd(e) {
  var t = e._init;
  return t(e._payload);
}
function jf(e) {
  function t(k, x) {
    if (e) {
      var m = k.deletions;
      m === null ? (k.deletions = [x], k.flags |= 16) : m.push(x);
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
  function o(k, x, m) {
    return k.index = m, e ? (m = k.alternate, m !== null ? (m = m.index, m < x ? (k.flags |= 2, x) : m) : (k.flags |= 2, x)) : (k.flags |= 1048576, x);
  }
  function a(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function i(k, x, m, T) {
    return x === null || x.tag !== 6 ? (x = Ti(m, k.mode, T), x.return = k, x) : (x = l(x, m), x.return = k, x);
  }
  function c(k, x, m, T) {
    var w = m.type;
    return w === el ? v(k, x, m.props.children, T, m.key) : x !== null && (x.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && jd(w) === x.type) ? (T = l(x, m.props), T.ref = Bl(k, x, m), T.return = k, T) : (T = da(m.type, m.key, m.props, null, k.mode, T), T.ref = Bl(k, x, m), T.return = k, T);
  }
  function d(k, x, m, T) {
    return x === null || x.tag !== 4 || x.stateNode.containerInfo !== m.containerInfo || x.stateNode.implementation !== m.implementation ? (x = Ai(m, k.mode, T), x.return = k, x) : (x = l(x, m.children || []), x.return = k, x);
  }
  function v(k, x, m, T, w) {
    return x === null || x.tag !== 7 ? (x = Pr(m, k.mode, T, w), x.return = k, x) : (x = l(x, m), x.return = k, x);
  }
  function f(k, x, m) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return x = Ti("" + x, k.mode, m), x.return = k, x;
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Do:
          return m = da(x.type, x.key, x.props, null, k.mode, m), m.ref = Bl(k, null, x), m.return = k, m;
        case qr:
          return x = Ai(x, k.mode, m), x.return = k, x;
        case tr:
          var T = x._init;
          return f(k, T(x._payload), m);
      }
      if (Yl(x) || Ol(x)) return x = Pr(x, k.mode, m, null), x.return = k, x;
      Yo(k, x);
    }
    return null;
  }
  function p(k, x, m, T) {
    var w = x !== null ? x.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return w !== null ? null : i(k, x, "" + m, T);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Do:
          return m.key === w ? c(k, x, m, T) : null;
        case qr:
          return m.key === w ? d(k, x, m, T) : null;
        case tr:
          return w = m._init, p(
            k,
            x,
            w(m._payload),
            T
          );
      }
      if (Yl(m) || Ol(m)) return w !== null ? null : v(k, x, m, T, null);
      Yo(k, m);
    }
    return null;
  }
  function y(k, x, m, T, w) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return k = k.get(m) || null, i(x, k, "" + T, w);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Do:
          return k = k.get(T.key === null ? m : T.key) || null, c(x, k, T, w);
        case qr:
          return k = k.get(T.key === null ? m : T.key) || null, d(x, k, T, w);
        case tr:
          var b = T._init;
          return y(k, x, m, b(T._payload), w);
      }
      if (Yl(T) || Ol(T)) return k = k.get(m) || null, v(x, k, T, w, null);
      Yo(x, T);
    }
    return null;
  }
  function S(k, x, m, T) {
    for (var w = null, b = null, h = x, A = x = 0, j = null; h !== null && A < m.length; A++) {
      h.index > A ? (j = h, h = null) : j = h.sibling;
      var N = p(k, h, m[A], T);
      if (N === null) {
        h === null && (h = j);
        break;
      }
      e && h && N.alternate === null && t(k, h), x = o(N, x, A), b === null ? w = N : b.sibling = N, b = N, h = j;
    }
    if (A === m.length) return n(k, h), qt && br(k, A), w;
    if (h === null) {
      for (; A < m.length; A++) h = f(k, m[A], T), h !== null && (x = o(h, x, A), b === null ? w = h : b.sibling = h, b = h);
      return qt && br(k, A), w;
    }
    for (h = r(k, h); A < m.length; A++) j = y(h, k, A, m[A], T), j !== null && (e && j.alternate !== null && h.delete(j.key === null ? A : j.key), x = o(j, x, A), b === null ? w = j : b.sibling = j, b = j);
    return e && h.forEach(function(P) {
      return t(k, P);
    }), qt && br(k, A), w;
  }
  function M(k, x, m, T) {
    var w = Ol(m);
    if (typeof w != "function") throw Error(Ne(150));
    if (m = w.call(m), m == null) throw Error(Ne(151));
    for (var b = w = null, h = x, A = x = 0, j = null, N = m.next(); h !== null && !N.done; A++, N = m.next()) {
      h.index > A ? (j = h, h = null) : j = h.sibling;
      var P = p(k, h, N.value, T);
      if (P === null) {
        h === null && (h = j);
        break;
      }
      e && h && P.alternate === null && t(k, h), x = o(P, x, A), b === null ? w = P : b.sibling = P, b = P, h = j;
    }
    if (N.done) return n(
      k,
      h
    ), qt && br(k, A), w;
    if (h === null) {
      for (; !N.done; A++, N = m.next()) N = f(k, N.value, T), N !== null && (x = o(N, x, A), b === null ? w = N : b.sibling = N, b = N);
      return qt && br(k, A), w;
    }
    for (h = r(k, h); !N.done; A++, N = m.next()) N = y(h, k, A, N.value, T), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? A : N.key), x = o(N, x, A), b === null ? w = N : b.sibling = N, b = N);
    return e && h.forEach(function(U) {
      return t(k, U);
    }), qt && br(k, A), w;
  }
  function _(k, x, m, T) {
    if (typeof m == "object" && m !== null && m.type === el && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Do:
          e: {
            for (var w = m.key, b = x; b !== null; ) {
              if (b.key === w) {
                if (w = m.type, w === el) {
                  if (b.tag === 7) {
                    n(k, b.sibling), x = l(b, m.props.children), x.return = k, k = x;
                    break e;
                  }
                } else if (b.elementType === w || typeof w == "object" && w !== null && w.$$typeof === tr && jd(w) === b.type) {
                  n(k, b.sibling), x = l(b, m.props), x.ref = Bl(k, b, m), x.return = k, k = x;
                  break e;
                }
                n(k, b);
                break;
              } else t(k, b);
              b = b.sibling;
            }
            m.type === el ? (x = Pr(m.props.children, k.mode, T, m.key), x.return = k, k = x) : (T = da(m.type, m.key, m.props, null, k.mode, T), T.ref = Bl(k, x, m), T.return = k, k = T);
          }
          return a(k);
        case qr:
          e: {
            for (b = m.key; x !== null; ) {
              if (x.key === b) if (x.tag === 4 && x.stateNode.containerInfo === m.containerInfo && x.stateNode.implementation === m.implementation) {
                n(k, x.sibling), x = l(x, m.children || []), x.return = k, k = x;
                break e;
              } else {
                n(k, x);
                break;
              }
              else t(k, x);
              x = x.sibling;
            }
            x = Ai(m, k.mode, T), x.return = k, k = x;
          }
          return a(k);
        case tr:
          return b = m._init, _(k, x, b(m._payload), T);
      }
      if (Yl(m)) return S(k, x, m, T);
      if (Ol(m)) return M(k, x, m, T);
      Yo(k, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, x !== null && x.tag === 6 ? (n(k, x.sibling), x = l(x, m), x.return = k, k = x) : (n(k, x), x = Ti(m, k.mode, T), x.return = k, k = x), a(k)) : n(k, x);
  }
  return _;
}
var jl = jf(!0), Cf = jf(!1), Ia = kr(null), Ta = null, il = null, cu = null;
function uu() {
  cu = il = Ta = null;
}
function du(e) {
  var t = Ia.current;
  Jt(Ia), e._currentValue = t;
}
function mc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function gl(e, t) {
  Ta = e, cu = il = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Vn = !0), e.firstContext = null);
}
function ps(e) {
  var t = e._currentValue;
  if (cu !== e) if (e = { context: e, memoizedValue: t, next: null }, il === null) {
    if (Ta === null) throw Error(Ne(308));
    il = e, Ta.dependencies = { lanes: 0, firstContext: e };
  } else il = il.next = e;
  return t;
}
var $r = null;
function hu(e) {
  $r === null ? $r = [e] : $r.push(e);
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
function Mf(e, t) {
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
function Aa(e, t, n, r) {
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
              f = rn({}, f, p);
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
    Ur |= a, e.lanes = a, e.memoizedState = f;
  }
}
function Sd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(Ne(191, l));
      l.call(r);
    }
  }
}
var Io = {}, Rs = kr(Io), xo = kr(Io), yo = kr(Io);
function Rr(e) {
  if (e === Io) throw Error(Ne(174));
  return e;
}
function pu(e, t) {
  switch (Gt(yo, t), Gt(xo, e), Gt(Rs, Io), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Xi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Xi(t, e);
  }
  Jt(Rs), Gt(Rs, t);
}
function Cl() {
  Jt(Rs), Jt(xo), Jt(yo);
}
function bf(e) {
  Rr(yo.current);
  var t = Rr(Rs.current), n = Xi(t, e.type);
  t !== n && (Gt(xo, e), Gt(Rs, n));
}
function mu(e) {
  xo.current === e && (Jt(Rs), Jt(xo));
}
var nn = kr(0);
function $a(e) {
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
var oa = Ys.ReactCurrentDispatcher, Ci = Ys.ReactCurrentBatchConfig, Br = 0, sn = null, gn = null, vn = null, Ra = !1, to = !1, vo = 0, P0 = 0;
function Mn() {
  throw Error(Ne(321));
}
function xu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Cs(e[n], t[n])) return !1;
  return !0;
}
function yu(e, t, n, r, l, o) {
  if (Br = o, sn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, oa.current = e === null || e.memoizedState === null ? U0 : W0, e = n(r, l), to) {
    o = 0;
    do {
      if (to = !1, vo = 0, 25 <= o) throw Error(Ne(301));
      o += 1, vn = gn = null, t.updateQueue = null, oa.current = z0, e = n(r, l);
    } while (to);
  }
  if (oa.current = La, t = gn !== null && gn.next !== null, Br = 0, vn = gn = sn = null, Ra = !1, t) throw Error(Ne(300));
  return e;
}
function vu() {
  var e = vo !== 0;
  return vo = 0, e;
}
function Is() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return vn === null ? sn.memoizedState = vn = e : vn = vn.next = e, vn;
}
function ms() {
  if (gn === null) {
    var e = sn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = gn.next;
  var t = vn === null ? sn.memoizedState : vn.next;
  if (t !== null) vn = t, gn = e;
  else {
    if (e === null) throw Error(Ne(310));
    gn = e, e = { memoizedState: gn.memoizedState, baseState: gn.baseState, baseQueue: gn.baseQueue, queue: gn.queue, next: null }, vn === null ? sn.memoizedState = vn = e : vn = vn.next = e;
  }
  return vn;
}
function No(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Si(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(Ne(311));
  n.lastRenderedReducer = e;
  var r = gn, l = r.baseQueue, o = n.pending;
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
      if ((Br & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = f, a = r) : c = c.next = f, sn.lanes |= v, Ur |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, Cs(r, t.memoizedState) || (Vn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, sn.lanes |= o, Ur |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Mi(e) {
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
    Cs(o, t.memoizedState) || (Vn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function If() {
}
function Tf(e, t) {
  var n = sn, r = ms(), l = t(), o = !Cs(r.memoizedState, l);
  if (o && (r.memoizedState = l, Vn = !0), r = r.queue, Nu(Rf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || vn !== null && vn.memoizedState.tag & 1) {
    if (n.flags |= 2048, ko(9, $f.bind(null, n, r, l, t), void 0, null), Nn === null) throw Error(Ne(349));
    Br & 30 || Af(n, t, l);
  }
  return l;
}
function Af(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = sn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, sn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
  t !== null && js(t, e, 1, -1);
}
function Md(e) {
  var t = Is();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: No, lastRenderedState: e }, t.queue = e, e = e.dispatch = B0.bind(null, sn, e), [t.memoizedState, e];
}
function ko(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = sn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, sn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Df() {
  return ms().memoizedState;
}
function aa(e, t, n, r) {
  var l = Is();
  sn.flags |= e, l.memoizedState = ko(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ga(e, t, n, r) {
  var l = ms();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (gn !== null) {
    var a = gn.memoizedState;
    if (o = a.destroy, r !== null && xu(r, a.deps)) {
      l.memoizedState = ko(t, n, o, r);
      return;
    }
  }
  sn.flags |= e, l.memoizedState = ko(1 | t, n, o, r);
}
function bd(e, t) {
  return aa(8390656, 8, e, t);
}
function Nu(e, t) {
  return Ga(2048, 8, e, t);
}
function Pf(e, t) {
  return Ga(4, 2, e, t);
}
function _f(e, t) {
  return Ga(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, Ga(4, 4, Ff.bind(null, t, e), n);
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
  return Br & 21 ? (Cs(n, t) || (n = Yh(), sn.lanes |= n, Ur |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Vn = !0), e.memoizedState = n);
}
function _0(e, t) {
  var n = Bt;
  Bt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ci.transition;
  Ci.transition = {};
  try {
    e(!1), t();
  } finally {
    Bt = n, Ci.transition = r;
  }
}
function Hf() {
  return ms().memoizedState;
}
function F0(e, t, n) {
  var r = gr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Kf(e)) Vf(t, n);
  else if (n = Sf(e, t, n, r), n !== null) {
    var l = Pn();
    js(n, e, r, l), Yf(n, t, r);
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
    n = Sf(e, t, l, r), n !== null && (l = Pn(), js(n, e, r, l), Yf(n, t, r));
  }
}
function Kf(e) {
  var t = e.alternate;
  return e === sn || t !== null && t === sn;
}
function Vf(e, t) {
  to = Ra = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Yf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Zc(e, n);
  }
}
var La = { readContext: ps, useCallback: Mn, useContext: Mn, useEffect: Mn, useImperativeHandle: Mn, useInsertionEffect: Mn, useLayoutEffect: Mn, useMemo: Mn, useReducer: Mn, useRef: Mn, useState: Mn, useDebugValue: Mn, useDeferredValue: Mn, useTransition: Mn, useMutableSource: Mn, useSyncExternalStore: Mn, useId: Mn, unstable_isNewReconciler: !1 }, U0 = { readContext: ps, useCallback: function(e, t) {
  return Is().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ps, useEffect: bd, useImperativeHandle: function(e, t, n) {
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
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = F0.bind(null, sn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Is();
  return e = { current: e }, t.memoizedState = e;
}, useState: Md, useDebugValue: ku, useDeferredValue: function(e) {
  return Is().memoizedState = e;
}, useTransition: function() {
  var e = Md(!1), t = e[0];
  return e = _0.bind(null, e[1]), Is().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = sn, l = Is();
  if (qt) {
    if (n === void 0) throw Error(Ne(407));
    n = n();
  } else {
    if (n = t(), Nn === null) throw Error(Ne(349));
    Br & 30 || Af(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, bd(Rf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ko(9, $f.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Is(), t = Nn.identifierPrefix;
  if (qt) {
    var n = Bs, r = Fs;
    n = (r & ~(1 << 32 - Es(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = vo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
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
  useReducer: Si,
  useRef: Df,
  useState: function() {
    return Si(No);
  },
  useDebugValue: ku,
  useDeferredValue: function(e) {
    var t = ms();
    return zf(t, gn.memoizedState, e);
  },
  useTransition: function() {
    var e = Si(No)[0], t = ms().memoizedState;
    return [e, t];
  },
  useMutableSource: If,
  useSyncExternalStore: Tf,
  useId: Hf,
  unstable_isNewReconciler: !1
}, z0 = { readContext: ps, useCallback: Uf, useContext: ps, useEffect: Nu, useImperativeHandle: Bf, useInsertionEffect: Pf, useLayoutEffect: _f, useMemo: Wf, useReducer: Mi, useRef: Df, useState: function() {
  return Mi(No);
}, useDebugValue: ku, useDeferredValue: function(e) {
  var t = ms();
  return gn === null ? t.memoizedState = e : zf(t, gn.memoizedState, e);
}, useTransition: function() {
  var e = Mi(No)[0], t = ms().memoizedState;
  return [e, t];
}, useMutableSource: If, useSyncExternalStore: Tf, useId: Hf, unstable_isNewReconciler: !1 };
function vs(e, t) {
  if (e && e.defaultProps) {
    t = rn({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function gc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : rn({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Xa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Hr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Pn(), l = gr(e), o = Us(r, l);
  o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), la(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Pn(), l = gr(e), o = Us(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), la(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Pn(), r = gr(e), l = Us(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pr(e, l, r), t !== null && (js(t, e, r, n), la(t, e, r));
} };
function Id(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !fo(n, r) || !fo(l, o) : !0;
}
function Gf(e, t, n) {
  var r = !1, l = vr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ps(o) : (l = Gn(t) ? _r : Tn.current, r = t.contextTypes, o = (r = r != null) ? wl(e, l) : vr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Xa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Td(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Xa.enqueueReplaceState(t, t.state, null);
}
function xc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, fu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ps(o) : (o = Gn(t) ? _r : Tn.current, l.context = wl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (gc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Xa.enqueueReplaceState(l, l.state, null), Aa(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
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
    Da || (Da = !0, bc = r), yc(e, t);
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
function Dn(e, t, n, r) {
  t.child = e === null ? Cf(t, null, n, r) : jl(t, e.child, n, r);
}
function Ld(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return gl(t, l), r = yu(e, t, n, r, o, l), n = vu(), e !== null && !Vn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (qt && n && ou(t), t.flags |= 1, Dn(e, t, r, l), t.child);
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
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Gt(ul, es), es |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Gt(ul, es), es |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Gt(ul, es), es |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Gt(ul, es), es |= r;
  return Dn(e, t, l, n), t.child;
}
function qf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function vc(e, t, n, r, l) {
  var o = Gn(n) ? _r : Tn.current;
  return o = wl(t, o), gl(t, l), n = yu(e, t, n, r, o, l), r = vu(), e !== null && !Vn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (qt && r && ou(t), t.flags |= 1, Dn(e, t, n, l), t.child);
}
function Dd(e, t, n, r, l) {
  if (Gn(n)) {
    var o = !0;
    Sa(t);
  } else o = !1;
  if (gl(t, l), t.stateNode === null) ia(e, t), Gf(t, n, r), xc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ps(d) : (d = Gn(n) ? _r : Tn.current, d = wl(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Td(t, a, r, d), nr = !1;
    var p = t.memoizedState;
    a.state = p, Aa(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Yn.current || nr ? (typeof v == "function" && (gc(t, n, v, r), c = t.memoizedState), (i = nr || Id(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Mf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : vs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = ps(c) : (c = Gn(n) ? _r : Tn.current, c = wl(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Td(t, a, r, c), nr = !1, p = t.memoizedState, a.state = p, Aa(t, r, a, l);
    var S = t.memoizedState;
    i !== f || p !== S || Yn.current || nr ? (typeof y == "function" && (gc(t, n, y, r), S = t.memoizedState), (d = nr || Id(t, n, d, r, p, S, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, S, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, S, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), a.props = r, a.state = S, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Nc(e, t, n, r, o, l);
}
function Nc(e, t, n, r, l, o) {
  qf(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && kd(t, n, !1), Vs(e, t, o);
  r = t.stateNode, K0.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = jl(t, e.child, null, o), t.child = jl(t, null, i, o)) : Dn(e, t, i, o), t.memoizedState = r.state, l && kd(t, n, !0), t.child;
}
function ep(e) {
  var t = e.stateNode;
  t.pendingContext ? Nd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Nd(e, t.context, !1), pu(e, t.containerInfo);
}
function Pd(e, t, n, r, l) {
  return El(), iu(l), t.flags |= 256, Dn(e, t, n, r), t.child;
}
var kc = { dehydrated: null, treeContext: null, retryLane: 0 };
function wc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tp(e, t, n) {
  var r = t.pendingProps, l = nn.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Gt(nn, l & 1), e === null)
    return pc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Za(a, r, 0, null), e = Pr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = wc(n), t.memoizedState = kc, e) : wu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return V0(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = xr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = xr(i, o) : (o = Pr(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? wc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = kc, r;
  }
  return o = e.child, e = o.sibling, r = xr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function wu(e, t) {
  return t = Za({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Go(e, t, n, r) {
  return r !== null && iu(r), jl(t, e.child, null, n), e = wu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function V0(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = bi(Error(Ne(422))), Go(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Za({ mode: "visible", children: r.children }, l, 0, null), o = Pr(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && jl(t, e.child, null, a), t.child.memoizedState = wc(a), t.memoizedState = kc, o);
  if (!(t.mode & 1)) return Go(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(Ne(419)), r = bi(o, r, void 0), Go(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Vn || i) {
    if (r = Nn, r !== null) {
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
    return bu(), r = bi(Error(Ne(421))), Go(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = lg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ns = fr(l.nextSibling), ss = t, qt = !0, ks = null, e !== null && (us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Fr, Fs = e.id, Bs = e.overflow, Fr = t), t = wu(t, r.children), t.flags |= 4096, t);
}
function _d(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), mc(e.return, t, n);
}
function Ii(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function np(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Dn(e, t, r.children, n), r = nn.current, r & 2) r = r & 1 | 2, t.flags |= 128;
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
  if (Gt(nn, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && $a(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ii(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && $a(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Ii(t, !0, n, null, o);
      break;
    case "together":
      Ii(t, !1, null, null, void 0);
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
  if (e !== null && (t.dependencies = e.dependencies), Ur |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Ne(153));
  if (t.child !== null) {
    for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Y0(e, t, n) {
  switch (t.tag) {
    case 3:
      ep(t), El();
      break;
    case 5:
      bf(t);
      break;
    case 1:
      Gn(t.type) && Sa(t);
      break;
    case 4:
      pu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Gt(Ia, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Gt(nn, nn.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? tp(e, t, n) : (Gt(nn, nn.current & 1), e = Vs(e, t, n), e !== null ? e.sibling : null);
      Gt(nn, nn.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return np(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Gt(nn, nn.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zf(e, t, n);
  }
  return Vs(e, t, n);
}
var sp, Ec, rp, lp;
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
Ec = function() {
};
rp = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Rr(Rs.current);
    var o = null;
    switch (n) {
      case "input":
        l = Ki(e, l), r = Ki(e, r), o = [];
        break;
      case "select":
        l = rn({}, l, { value: void 0 }), r = rn({}, r, { value: void 0 }), o = [];
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
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (lo.hasOwnProperty(d) ? (c != null && d === "onScroll" && Qt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
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
function bn(e) {
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
      return bn(t), null;
    case 1:
      return Gn(t.type) && Ca(), bn(t), null;
    case 3:
      return r = t.stateNode, Cl(), Jt(Yn), Jt(Tn), gu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Vo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ks !== null && (Ac(ks), ks = null))), Ec(e, t), bn(t), null;
    case 5:
      mu(t);
      var l = Rr(yo.current);
      if (n = t.type, e !== null && t.stateNode != null) rp(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Ne(166));
          return bn(t), null;
        }
        if (e = Rr(Rs.current), Vo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ts] = t, r[go] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Xl.length; l++) Qt(Xl[l], r);
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
              Yu(r, o), Qt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Qt("invalid", r);
              break;
            case "textarea":
              Xu(r, o), Qt("invalid", r);
          }
          Qi(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Ko(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Ko(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : lo.hasOwnProperty(a) && i != null && a === "onScroll" && Qt("scroll", r);
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
                Qt("cancel", e), Qt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Qt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Xl.length; l++) Qt(Xl[l], e);
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
                Yu(e, r), l = Ki(e, r), Qt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = rn({}, r, { value: void 0 }), Qt("invalid", e);
                break;
              case "textarea":
                Xu(e, r), l = Gi(e, r), Qt("invalid", e);
                break;
              default:
                l = r;
            }
            Qi(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Oh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Rh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && oo(e, c) : typeof c == "number" && oo(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (lo.hasOwnProperty(o) ? c != null && o === "onScroll" && Qt("scroll", e) : c != null && Vc(e, o, c, a));
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
      return bn(t), null;
    case 6:
      if (e && t.stateNode != null) lp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Ne(166));
        if (n = Rr(yo.current), Rr(Rs.current), Vo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ts] = t, (o = r.nodeValue !== n) && (e = ss, e !== null)) switch (e.tag) {
            case 3:
              Ko(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ko(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ts] = t, t.stateNode = r;
      }
      return bn(t), null;
    case 13:
      if (Jt(nn), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (qt && ns !== null && t.mode & 1 && !(t.flags & 128)) Ef(), El(), t.flags |= 98560, o = !1;
        else if (o = Vo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(Ne(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(Ne(317));
            o[Ts] = t;
          } else El(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          bn(t), o = !1;
        } else ks !== null && (Ac(ks), ks = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || nn.current & 1 ? xn === 0 && (xn = 3) : bu())), t.updateQueue !== null && (t.flags |= 4), bn(t), null);
    case 4:
      return Cl(), Ec(e, t), e === null && po(t.stateNode.containerInfo), bn(t), null;
    case 10:
      return du(t.type._context), bn(t), null;
    case 17:
      return Gn(t.type) && Ca(), bn(t), null;
    case 19:
      if (Jt(nn), o = t.memoizedState, o === null) return bn(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Ul(o, !1);
      else {
        if (xn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = $a(e), a !== null) {
            for (t.flags |= 128, Ul(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Gt(nn, nn.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && cn() > Ml && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = $a(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ul(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !qt) return bn(t), null;
        } else 2 * cn() - o.renderingStartTime > Ml && n !== 1073741824 && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = cn(), t.sibling = null, n = nn.current, Gt(nn, r ? n & 1 | 2 : n & 1), t) : (bn(t), null);
    case 22:
    case 23:
      return Mu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? es & 1073741824 && (bn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : bn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Ne(156, t.tag));
}
function X0(e, t) {
  switch (au(t), t.tag) {
    case 1:
      return Gn(t.type) && Ca(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Cl(), Jt(Yn), Jt(Tn), gu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return mu(t), null;
    case 13:
      if (Jt(nn), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Ne(340));
        El();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Jt(nn), null;
    case 4:
      return Cl(), null;
    case 10:
      return du(t.type._context), null;
    case 22:
    case 23:
      return Mu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Xo = !1, In = !1, Q0 = typeof WeakSet == "function" ? WeakSet : Set, We = null;
function cl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    an(e, t, r);
  }
  else n.current = null;
}
function jc(e, t, n) {
  try {
    n();
  } catch (r) {
    an(e, t, r);
  }
}
var Fd = !1;
function J0(e, t) {
  if (ac = ka, e = uf(), lu(e)) {
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
  for (ic = { focusedElem: e, selectionRange: n }, ka = !1, We = t; We !== null; ) if (t = We, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, We = e;
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
            var M = S.memoizedProps, _ = S.memoizedState, k = t.stateNode, x = k.getSnapshotBeforeUpdate(t.elementType === t.type ? M : vs(t.type, M), _);
            k.__reactInternalSnapshotBeforeUpdate = x;
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
      an(t, t.return, T);
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
        l.destroy = void 0, o !== void 0 && jc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Qa(e, t) {
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
function Mc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Mc(e, t, n), e = e.sibling; e !== null; ) Mc(e, t, n), e = e.sibling;
}
var wn = null, Ns = !1;
function Zs(e, t, n) {
  for (n = n.child; n !== null; ) ip(e, t, n), n = n.sibling;
}
function ip(e, t, n) {
  if ($s && typeof $s.onCommitFiberUnmount == "function") try {
    $s.onCommitFiberUnmount(Wa, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      In || cl(n, t);
    case 6:
      var r = wn, l = Ns;
      wn = null, Zs(e, t, n), wn = r, Ns = l, wn !== null && (Ns ? (e = wn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : wn.removeChild(n.stateNode));
      break;
    case 18:
      wn !== null && (Ns ? (e = wn, n = n.stateNode, e.nodeType === 8 ? wi(e.parentNode, n) : e.nodeType === 1 && wi(e, n), uo(e)) : wi(wn, n.stateNode));
      break;
    case 4:
      r = wn, l = Ns, wn = n.stateNode.containerInfo, Ns = !0, Zs(e, t, n), wn = r, Ns = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!In && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && jc(n, t, a), l = l.next;
        } while (l !== r);
      }
      Zs(e, t, n);
      break;
    case 1:
      if (!In && (cl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        an(n, t, i);
      }
      Zs(e, t, n);
      break;
    case 21:
      Zs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (In = (r = In) || n.memoizedState !== null, Zs(e, t, n), In = r) : Zs(e, t, n);
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
      if (wn === null) throw Error(Ne(160));
      ip(o, a, l), wn = null, Ns = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      an(l, t, d);
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
      if (ys(t, e), bs(e), r & 4) {
        try {
          no(3, e, e.return), Qa(3, e);
        } catch (M) {
          an(e, e.return, M);
        }
        try {
          no(5, e, e.return);
        } catch (M) {
          an(e, e.return, M);
        }
      }
      break;
    case 1:
      ys(t, e), bs(e), r & 512 && n !== null && cl(n, n.return);
      break;
    case 5:
      if (ys(t, e), bs(e), r & 512 && n !== null && cl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          oo(l, "");
        } catch (M) {
          an(e, e.return, M);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && Th(l, o), Ji(i, a);
          var d = Ji(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], f = c[a + 1];
            v === "style" ? Oh(l, f) : v === "dangerouslySetInnerHTML" ? Rh(l, f) : v === "children" ? oo(l, f) : Vc(l, v, f, d);
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
              var y = o.value;
              y != null ? hl(l, !!o.multiple, y, !1) : p !== !!o.multiple && (o.defaultValue != null ? hl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : hl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[go] = o;
        } catch (M) {
          an(e, e.return, M);
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
          an(e, e.return, M);
        }
      }
      break;
    case 3:
      if (ys(t, e), bs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        uo(t.containerInfo);
      } catch (M) {
        an(e, e.return, M);
      }
      break;
    case 4:
      ys(t, e), bs(e);
      break;
    case 13:
      ys(t, e), bs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Cu = cn())), r & 4 && Ud(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (In = (d = In) || v, ys(t, e), In = d) : ys(t, e), bs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (We = e, v = e.child; v !== null; ) {
          for (f = We = v; We !== null; ) {
            switch (p = We, y = p.child, p.tag) {
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
                  } catch (M) {
                    an(r, n, M);
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
            y !== null ? (y.return = p, We = y) : zd(f);
          }
          v = v.sibling;
        }
        e: for (v = null, f = e; ; ) {
          if (f.tag === 5) {
            if (v === null) {
              v = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = f.stateNode, c = f.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Lh("display", a));
              } catch (M) {
                an(e, e.return, M);
              }
            }
          } else if (f.tag === 6) {
            if (v === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (M) {
              an(e, e.return, M);
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
      ys(t, e), bs(e), r & 4 && Ud(e);
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
          if (ap(n)) {
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
          r.flags & 32 && (oo(l, ""), r.flags &= -33);
          var o = Bd(e);
          Mc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = Bd(e);
          Sc(e, i, a);
          break;
        default:
          throw Error(Ne(161));
      }
    } catch (c) {
      an(e, e.return, c);
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
        var i = l.alternate, c = i !== null && i.memoizedState !== null || In;
        i = Xo;
        var d = In;
        if (Xo = a, (In = c) && !d) for (We = l; We !== null; ) a = We, c = a.child, a.tag === 22 && a.memoizedState !== null ? Hd(l) : c !== null ? (c.return = a, We = c) : Hd(l);
        for (; o !== null; ) We = o, up(o), o = o.sibling;
        We = l, Xo = i, In = d;
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
            In || Qa(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !In) if (n === null) r.componentDidMount();
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
                var v = d.memoizedState;
                if (v !== null) {
                  var f = v.dehydrated;
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
            throw Error(Ne(163));
        }
        In || t.flags & 512 && Cc(t);
      } catch (p) {
        an(t, t.return, p);
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
            Qa(4, t);
          } catch (c) {
            an(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              an(t, l, c);
            }
          }
          var o = t.return;
          try {
            Cc(t);
          } catch (c) {
            an(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Cc(t);
          } catch (c) {
            an(t, a, c);
          }
      }
    } catch (c) {
      an(t, t.return, c);
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
var q0 = Math.ceil, Oa = Ys.ReactCurrentDispatcher, Eu = Ys.ReactCurrentOwner, fs = Ys.ReactCurrentBatchConfig, It = 0, Nn = null, hn = null, En = 0, es = 0, ul = kr(0), xn = 0, wo = null, Ur = 0, Ja = 0, ju = 0, so = null, Kn = null, Cu = 0, Ml = 1 / 0, Ds = null, Da = !1, bc = null, mr = null, Qo = !1, cr = null, Pa = 0, ro = 0, Ic = null, ca = -1, ua = 0;
function Pn() {
  return It & 6 ? cn() : ca !== -1 ? ca : ca = cn();
}
function gr(e) {
  return e.mode & 1 ? It & 2 && En !== 0 ? En & -En : D0.transition !== null ? (ua === 0 && (ua = Yh()), ua) : (e = Bt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ef(e.type)), e) : 1;
}
function js(e, t, n, r) {
  if (50 < ro) throw ro = 0, Ic = null, Error(Ne(185));
  So(e, n, r), (!(It & 2) || e !== Nn) && (e === Nn && (!(It & 2) && (Ja |= n), xn === 4 && or(e, En)), Xn(e, r), n === 1 && It === 0 && !(t.mode & 1) && (Ml = cn() + 500, Ya && wr()));
}
function Xn(e, t) {
  var n = e.callbackNode;
  Dm(e, t);
  var r = Na(e, e === Nn ? En : 0);
  if (r === 0) n !== null && qu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && qu(n), t === 1) e.tag === 0 ? O0(Kd.bind(null, e)) : Nf(Kd.bind(null, e)), A0(function() {
      !(It & 6) && wr();
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
          n = va;
          break;
        case 536870912:
          n = Vh;
          break;
        default:
          n = va;
      }
      n = yp(n, dp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function dp(e, t) {
  if (ca = -1, ua = 0, It & 6) throw Error(Ne(327));
  var n = e.callbackNode;
  if (xl() && e.callbackNode !== n) return null;
  var r = Na(e, e === Nn ? En : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = _a(e, r);
  else {
    t = r;
    var l = It;
    It |= 2;
    var o = fp();
    (Nn !== e || En !== t) && (Ds = null, Ml = cn() + 500, Dr(e, t));
    do
      try {
        ng();
        break;
      } catch (i) {
        hp(e, i);
      }
    while (!0);
    uu(), Oa.current = o, It = l, hn !== null ? t = 0 : (Nn = null, En = 0, t = xn);
  }
  if (t !== 0) {
    if (t === 2 && (l = nc(e), l !== 0 && (r = l, t = Tc(e, l))), t === 1) throw n = wo, Dr(e, 0), or(e, r), Xn(e, cn()), n;
    if (t === 6) or(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !eg(l) && (t = _a(e, r), t === 2 && (o = nc(e), o !== 0 && (r = o, t = Tc(e, o))), t === 1)) throw n = wo, Dr(e, 0), or(e, r), Xn(e, cn()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Ne(345));
        case 2:
          Ir(e, Kn, Ds);
          break;
        case 3:
          if (or(e, r), (r & 130023424) === r && (t = Cu + 500 - cn(), 10 < t)) {
            if (Na(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Pn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = uc(Ir.bind(null, e, Kn, Ds), t);
            break;
          }
          Ir(e, Kn, Ds);
          break;
        case 4:
          if (or(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - Es(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = cn() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * q0(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = uc(Ir.bind(null, e, Kn, Ds), r);
            break;
          }
          Ir(e, Kn, Ds);
          break;
        case 5:
          Ir(e, Kn, Ds);
          break;
        default:
          throw Error(Ne(329));
      }
    }
  }
  return Xn(e, cn()), e.callbackNode === n ? dp.bind(null, e) : null;
}
function Tc(e, t) {
  var n = so;
  return e.current.memoizedState.isDehydrated && (Dr(e, t).flags |= 256), e = _a(e, t), e !== 2 && (t = Kn, Kn = n, t !== null && Ac(t)), e;
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
  for (t &= ~ju, t &= ~Ja, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Es(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Kd(e) {
  if (It & 6) throw Error(Ne(327));
  xl();
  var t = Na(e, 0);
  if (!(t & 1)) return Xn(e, cn()), null;
  var n = _a(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = nc(e);
    r !== 0 && (t = r, n = Tc(e, r));
  }
  if (n === 1) throw n = wo, Dr(e, 0), or(e, t), Xn(e, cn()), n;
  if (n === 6) throw Error(Ne(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ir(e, Kn, Ds), Xn(e, cn()), null;
}
function Su(e, t) {
  var n = It;
  It |= 1;
  try {
    return e(t);
  } finally {
    It = n, It === 0 && (Ml = cn() + 500, Ya && wr());
  }
}
function Wr(e) {
  cr !== null && cr.tag === 0 && !(It & 6) && xl();
  var t = It;
  It |= 1;
  var n = fs.transition, r = Bt;
  try {
    if (fs.transition = null, Bt = 1, e) return e();
  } finally {
    Bt = r, fs.transition = n, It = t, !(It & 6) && wr();
  }
}
function Mu() {
  es = ul.current, Jt(ul);
}
function Dr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, T0(n)), hn !== null) for (n = hn.return; n !== null; ) {
    var r = n;
    switch (au(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ca();
        break;
      case 3:
        Cl(), Jt(Yn), Jt(Tn), gu();
        break;
      case 5:
        mu(r);
        break;
      case 4:
        Cl();
        break;
      case 13:
        Jt(nn);
        break;
      case 19:
        Jt(nn);
        break;
      case 10:
        du(r.type._context);
        break;
      case 22:
      case 23:
        Mu();
    }
    n = n.return;
  }
  if (Nn = e, hn = e = xr(e.current, null), En = es = t, xn = 0, wo = null, ju = Ja = Ur = 0, Kn = so = null, $r !== null) {
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
function hp(e, t) {
  do {
    var n = hn;
    try {
      if (uu(), oa.current = La, Ra) {
        for (var r = sn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Ra = !1;
      }
      if (Br = 0, vn = gn = sn = null, to = !1, vo = 0, Eu.current = null, n === null || n.return === null) {
        xn = 1, wo = t, hn = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = En, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, f = v.tag;
          if (!(v.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = $d(a);
          if (y !== null) {
            y.flags &= -257, Rd(y, a, i, o, t), y.mode & 1 && Ad(o, d, t), t = y, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var M = /* @__PURE__ */ new Set();
              M.add(c), t.updateQueue = M;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Ad(o, d, t), bu();
              break e;
            }
            c = Error(Ne(426));
          }
        } else if (qt && i.mode & 1) {
          var _ = $d(a);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), Rd(_, a, i, o, t), iu(Sl(c, i));
            break e;
          }
        }
        o = c = Sl(c, i), xn !== 4 && (xn = 2), so === null ? so = [o] : so.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var k = Xf(o, c, t);
              Cd(o, k);
              break e;
            case 1:
              i = c;
              var x = o.type, m = o.stateNode;
              if (!(o.flags & 128) && (typeof x.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (mr === null || !mr.has(m)))) {
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
      t = w, hn === n && n !== null && (hn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function fp() {
  var e = Oa.current;
  return Oa.current = La, e === null ? La : e;
}
function bu() {
  (xn === 0 || xn === 3 || xn === 2) && (xn = 4), Nn === null || !(Ur & 268435455) && !(Ja & 268435455) || or(Nn, En);
}
function _a(e, t) {
  var n = It;
  It |= 2;
  var r = fp();
  (Nn !== e || En !== t) && (Ds = null, Dr(e, t));
  do
    try {
      tg();
      break;
    } catch (l) {
      hp(e, l);
    }
  while (!0);
  if (uu(), It = n, Oa.current = r, hn !== null) throw Error(Ne(261));
  return Nn = null, En = 0, xn;
}
function tg() {
  for (; hn !== null; ) pp(hn);
}
function ng() {
  for (; hn !== null && !Mm(); ) pp(hn);
}
function pp(e) {
  var t = xp(e.alternate, e, es);
  e.memoizedProps = e.pendingProps, t === null ? mp(e) : hn = t, Eu.current = null;
}
function mp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = X0(n, t), n !== null) {
        n.flags &= 32767, hn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        xn = 6, hn = null;
        return;
      }
    } else if (n = G0(n, t, es), n !== null) {
      hn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      hn = t;
      return;
    }
    hn = t = e;
  } while (t !== null);
  xn === 0 && (xn = 5);
}
function Ir(e, t, n) {
  var r = Bt, l = fs.transition;
  try {
    fs.transition = null, Bt = 1, sg(e, t, n, r);
  } finally {
    fs.transition = l, Bt = r;
  }
  return null;
}
function sg(e, t, n, r) {
  do
    xl();
  while (cr !== null);
  if (It & 6) throw Error(Ne(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Ne(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Pm(e, o), e === Nn && (hn = Nn = null, En = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Qo || (Qo = !0, yp(va, function() {
    return xl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = fs.transition, fs.transition = null;
    var a = Bt;
    Bt = 1;
    var i = It;
    It |= 4, Eu.current = null, J0(e, n), cp(n, e), E0(ic), ka = !!ac, ic = ac = null, e.current = n, Z0(n), bm(), It = i, Bt = a, fs.transition = o;
  } else e.current = n;
  if (Qo && (Qo = !1, cr = e, Pa = l), o = e.pendingLanes, o === 0 && (mr = null), Am(n.stateNode), Xn(e, cn()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Da) throw Da = !1, e = bc, bc = null, e;
  return Pa & 1 && e.tag !== 0 && xl(), o = e.pendingLanes, o & 1 ? e === Ic ? ro++ : (ro = 0, Ic = e) : ro = 0, wr(), null;
}
function xl() {
  if (cr !== null) {
    var e = Gh(Pa), t = fs.transition, n = Bt;
    try {
      if (fs.transition = null, Bt = 16 > e ? 16 : e, cr === null) var r = !1;
      else {
        if (e = cr, cr = null, Pa = 0, It & 6) throw Error(Ne(331));
        var l = It;
        for (It |= 4, We = e.current; We !== null; ) {
          var o = We, a = o.child;
          if (We.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var c = 0; c < i.length; c++) {
                var d = i[c];
                for (We = d; We !== null; ) {
                  var v = We;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      no(8, v, o);
                  }
                  var f = v.child;
                  if (f !== null) f.return = v, We = f;
                  else for (; We !== null; ) {
                    v = We;
                    var p = v.sibling, y = v.return;
                    if (op(v), v === d) {
                      We = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = y, We = p;
                      break;
                    }
                    We = y;
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
          var m = a.child;
          if (a.subtreeFlags & 2064 && m !== null) m.return = a, We = m;
          else e: for (a = x; We !== null; ) {
            if (i = We, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  Qa(9, i);
              }
            } catch (w) {
              an(i, i.return, w);
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
        if (It = l, wr(), $s && typeof $s.onPostCommitFiberRoot == "function") try {
          $s.onPostCommitFiberRoot(Wa, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Bt = n, fs.transition = t;
    }
  }
  return !1;
}
function Vd(e, t, n) {
  t = Sl(n, t), t = Xf(e, t, 1), e = pr(e, t, 1), t = Pn(), e !== null && (So(e, 1, t), Xn(e, t));
}
function an(e, t, n) {
  if (e.tag === 3) Vd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Vd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mr === null || !mr.has(r))) {
        e = Sl(n, e), e = Qf(t, e, 1), t = pr(t, e, 1), e = Pn(), t !== null && (So(t, 1, e), Xn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function rg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Pn(), e.pingedLanes |= e.suspendedLanes & n, Nn === e && (En & n) === n && (xn === 4 || xn === 3 && (En & 130023424) === En && 500 > cn() - Cu ? Dr(e, 0) : ju |= n), Xn(e, t);
}
function gp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Bo, Bo <<= 1, !(Bo & 130023424) && (Bo = 4194304)) : t = 1);
  var n = Pn();
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
      throw Error(Ne(314));
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
  else Vn = !1, qt && t.flags & 1048576 && kf(t, ba, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ia(e, t), e = t.pendingProps;
      var l = wl(t, Tn.current);
      gl(t, n), l = yu(null, t, r, e, l, n);
      var o = vu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Gn(r) ? (o = !0, Sa(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fu(t), l.updater = Xa, t.stateNode = l, l._reactInternals = t, xc(t, r, e, n), t = Nc(null, t, r, !0, o, n)) : (t.tag = 0, qt && o && ou(t), Dn(null, t, l, n), t = t.child), t;
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
        throw Error(Ne(
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
        if (ep(t), e === null) throw Error(Ne(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Mf(e, t), Aa(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Sl(Error(Ne(423)), t), t = Pd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Sl(Error(Ne(424)), t), t = Pd(e, t, r, n, l);
          break e;
        } else for (ns = fr(t.stateNode.containerInfo.firstChild), ss = t, qt = !0, ks = null, n = Cf(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (El(), r === l) {
            t = Vs(e, t, n);
            break e;
          }
          Dn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return bf(t), e === null && pc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, cc(r, l) ? a = null : o !== null && cc(r, o) && (t.flags |= 32), qf(e, t), Dn(e, t, a, n), t.child;
    case 6:
      return e === null && pc(t), null;
    case 13:
      return tp(e, t, n);
    case 4:
      return pu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = jl(t, null, r, n) : Dn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), Ld(e, t, r, l, n);
    case 7:
      return Dn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Dn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Dn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Gt(Ia, r._currentValue), r._currentValue = a, o !== null) if (Cs(o.value, a)) {
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
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
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
            if (a = o.return, a === null) throw Error(Ne(341));
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
        Dn(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, gl(t, n), l = ps(l), r = r(l), t.flags |= 1, Dn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = vs(r, t.pendingProps), l = vs(r.type, l), Od(e, t, r, l, n);
    case 15:
      return Jf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), ia(e, t), t.tag = 1, Gn(r) ? (e = !0, Sa(t)) : e = !1, gl(t, n), Gf(t, r, l), xc(t, r, l, n), Nc(null, t, r, !0, e, n);
    case 19:
      return np(e, t, n);
    case 22:
      return Zf(e, t, n);
  }
  throw Error(Ne(156, t.tag));
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
      return Pr(n.children, l, o, t);
    case Yc:
      a = 8, l |= 8;
      break;
    case Ui:
      return e = hs(12, n, t, l | 2), e.elementType = Ui, e.lanes = o, e;
    case Wi:
      return e = hs(13, n, t, l), e.elementType = Wi, e.lanes = o, e;
    case zi:
      return e = hs(19, n, t, l), e.elementType = zi, e.lanes = o, e;
    case Mh:
      return Za(n, l, o, t);
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
      throw Error(Ne(130, e == null ? e : typeof e, ""));
  }
  return t = hs(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Pr(e, t, n, r) {
  return e = hs(7, e, r, t), e.lanes = n, e;
}
function Za(e, t, n, r) {
  return e = hs(22, e, r, t), e.elementType = Mh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ti(e, t, n) {
  return e = hs(6, e, null, t), e.lanes = n, e;
}
function Ai(e, t, n) {
  return t = hs(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function cg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = di(0), this.expirationTimes = di(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = di(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
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
    if (Hr(e) !== e || e.tag !== 1) throw Error(Ne(170));
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
    throw Error(Ne(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Gn(n)) return vf(e, n, t);
  }
  return t;
}
function Np(e, t, n, r, l, o, a, i, c) {
  return e = Tu(n, r, !0, e, l, o, a, i, c), e.context = vp(null), n = e.current, r = Pn(), l = gr(n), o = Us(r, l), o.callback = t ?? null, pr(n, o, l), e.current.lanes = l, So(e, l, r), Xn(e, r), e;
}
function qa(e, t, n, r) {
  var l = t.current, o = Pn(), a = gr(l);
  return n = vp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Us(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pr(l, t, a), e !== null && (js(e, l, a, o), la(e, l, a)), a;
}
function Fa(e) {
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
ei.prototype.render = $u.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Ne(409));
  qa(e, t, null, null);
};
ei.prototype.unmount = $u.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Wr(function() {
      qa(null, e, null, null);
    }), t[Hs] = null;
  }
};
function ei(e) {
  this._internalRoot = e;
}
ei.prototype.unstable_scheduleHydration = function(e) {
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
function ti(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Gd() {
}
function hg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Fa(a);
        o.call(d);
      };
    }
    var a = Np(t, r, e, 0, null, !1, !1, "", Gd);
    return e._reactRootContainer = a, e[Hs] = a.current, po(e.nodeType === 8 ? e.parentNode : e), Wr(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = Fa(c);
      i.call(d);
    };
  }
  var c = Tu(e, 0, !1, null, null, !1, !1, "", Gd);
  return e._reactRootContainer = c, e[Hs] = c.current, po(e.nodeType === 8 ? e.parentNode : e), Wr(function() {
    qa(t, c, n, r);
  }), c;
}
function ni(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = Fa(a);
        i.call(c);
      };
    }
    qa(t, a, e, l);
  } else a = hg(n, t, e, l, r);
  return Fa(a);
}
Xh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Gl(t.pendingLanes);
        n !== 0 && (Zc(t, n | 1), Xn(t, cn()), !(It & 6) && (Ml = cn() + 500, wr()));
      }
      break;
    case 13:
      Wr(function() {
        var r = Ks(e, 1);
        if (r !== null) {
          var l = Pn();
          js(r, e, 1, l);
        }
      }), Au(e, 1);
  }
};
qc = function(e) {
  if (e.tag === 13) {
    var t = Ks(e, 134217728);
    if (t !== null) {
      var n = Pn();
      js(t, e, 134217728, n);
    }
    Au(e, 134217728);
  }
};
Qh = function(e) {
  if (e.tag === 13) {
    var t = gr(e), n = Ks(e, t);
    if (n !== null) {
      var r = Pn();
      js(n, e, t, r);
    }
    Au(e, t);
  }
};
Jh = function() {
  return Bt;
};
Zh = function(e, t) {
  var n = Bt;
  try {
    return Bt = e, t();
  } finally {
    Bt = n;
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
            var l = Va(r);
            if (!l) throw Error(Ne(90));
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
Fh = Wr;
var fg = { usingClientEntryPoint: !1, Events: [bo, rl, Va, Dh, Ph, Su] }, Wl = { findFiberByHostInstance: Ar, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, pg = { bundleType: Wl.bundleType, version: Wl.version, rendererPackageName: Wl.rendererPackageName, rendererConfig: Wl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ys.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Wh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wl.findFiberByHostInstance || dg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Jo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Jo.isDisabled && Jo.supportsFiber) try {
    Wa = Jo.inject(pg), $s = Jo;
  } catch {
  }
}
ls.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fg;
ls.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ru(t)) throw Error(Ne(200));
  return ug(e, t, null, n);
};
ls.createRoot = function(e, t) {
  if (!Ru(e)) throw Error(Ne(299));
  var n = !1, r = "", l = kp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Tu(e, 1, !1, null, null, n, !1, r, l), e[Hs] = t.current, po(e.nodeType === 8 ? e.parentNode : e), new $u(t);
};
ls.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Ne(188)) : (e = Object.keys(e).join(","), Error(Ne(268, e)));
  return e = Wh(t), e = e === null ? null : e.stateNode, e;
};
ls.flushSync = function(e) {
  return Wr(e);
};
ls.hydrate = function(e, t, n) {
  if (!ti(t)) throw Error(Ne(200));
  return ni(null, e, t, !0, n);
};
ls.hydrateRoot = function(e, t, n) {
  if (!Ru(e)) throw Error(Ne(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = kp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Np(t, null, e, 1, n ?? null, l, !1, o, a), e[Hs] = t.current, po(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new ei(t);
};
ls.render = function(e, t, n) {
  if (!ti(t)) throw Error(Ne(200));
  return ni(null, e, t, !1, n);
};
ls.unmountComponentAtNode = function(e) {
  if (!ti(e)) throw Error(Ne(40));
  return e._reactRootContainer ? (Wr(function() {
    ni(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Hs] = null;
    });
  }), !0) : !1;
};
ls.unstable_batchedUpdates = Su;
ls.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ti(n)) throw Error(Ne(200));
  if (e == null || e._reactInternals === void 0) throw Error(Ne(38));
  return ni(e, t, n, !1, r);
};
ls.version = "18.3.1-next-f1338f8080-20240426";
function wp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wp);
    } catch (e) {
      console.error(e);
    }
}
wp(), kh.exports = ls;
var Ls = kh.exports, Xd = Ls;
ma.createRoot = Xd.createRoot, ma.hydrateRoot = Xd.hydrateRoot;
var Ep = { exports: {} }, si = {};
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
function jp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) yg.call(t, r) && !Ng.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: gg, type: e, key: o, ref: a, props: l, _owner: vg.current };
}
si.Fragment = xg;
si.jsx = jp;
si.jsxs = jp;
Ep.exports = si;
var s = Ep.exports;
let ar = [], Cp = 120, $i = !1;
async function kg() {
  if (!$i) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          wg(n), $i = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    $i = !0;
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
function Ba(e, t) {
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
function Eg(e) {
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
function jg(e) {
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
  return t === "UTC" ? jg(e) : Eg(e);
}
function Qd(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Lr(e, t);
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
  const v = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return v;
  const f = Ba(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const p = v - Cp * 6e4, { offsetMin: y } = Ws(p);
  let S = v - y * 6e4;
  const M = Ws(S);
  return M.offsetMin !== y && (S = v - M.offsetMin * 6e4), S;
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
    const h = w + b, A = (V) => String(V).padStart(2, "0"), j = Lr(w, n), N = Lr(h, n), P = `${j.year}-${A(j.month)}-${A(j.day)}`, U = `${A(j.hour)}:${A(j.minute)}:${A(j.second)}`, L = `${N.year}-${A(N.month)}-${A(N.day)}`, z = `${A(N.hour)}:${A(N.minute)}:${A(N.second)}`, le = n === "UTC" ? " (UTC)" : j.label ? ` (${j.label})` : "", ne = P === L ? z : `${L} ${z}`;
    return `${P} ${U} ➔ ${ne}${le}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), x = u.useMemo(() => {
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
const Gr = (e) => String(e).padStart(2, "0");
function St(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), y = Gr(p.getUTCHours()), S = Gr(p.getUTCMinutes()), M = Gr(p.getUTCSeconds()), _ = l ? `${y}:${S}:${M}` : `${y}:${S}`;
    return r ? `${_} UTC` : _;
  }
  const { offsetMin: o, label: a } = Ws(e), i = new Date(e + o * 60 * 1e3), c = Gr(i.getUTCHours()), d = Gr(i.getUTCMinutes()), v = Gr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Sg = 600, Jd = 250, cs = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), Rc = /* @__PURE__ */ new Set(), Zd = 4;
let yl = 0, ws = [];
function Lc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / Jd) * Jd;
}
function Mp() {
  var e;
  if (!(yl >= Zd || ws.length === 0))
    for (ws = ws.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); yl < Zd && ws.length > 0; ) {
      const t = ws.pop();
      !t || (e = t.signal) != null && e.aborted || (yl++, Mg(t));
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
async function Mg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      ha(n, r, v, l), a(v);
    } else c.status === 204 ? (ha(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (ha(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    yl = Math.max(0, yl - 1), Tr.delete(t), Mp();
  }
}
const On = {
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
    }), cs.clear(), Tr.clear(), ws = [], yl = 0;
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
      }, { once: !0 }), ws.push(d), Mp();
    });
    return Tr.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  On.clearAll();
});
const Lu = "ITB_STUDIO_SESSION_CACHE_V2", bp = "itb_player_audio_settings";
let Ri = null;
function bg() {
  try {
    const e = localStorage.getItem(Lu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Ip(e) {
  e && (Ri && clearTimeout(Ri), Ri = setTimeout(() => {
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
    const e = localStorage.getItem(bp);
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
    localStorage.setItem(bp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let sr = null, dl = null, Li = null, zn = 0, Xr = 0, Zo = -60, Eo = 1;
function Ag() {
  if (!sr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (sr = new e());
  }
  return sr && sr.state === "suspended" && sr.resume().catch(() => {
  }), sr;
}
function Ua(e, t = 1) {
  if (!e) return null;
  Eo = typeof t == "number" && t >= 0 ? t : 1;
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
    return l && l.gain.setValueAtTime(Eo, n.currentTime), dl = e, $g(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function qd(e) {
  if (Eo = Math.max(0, Number(e) || 1), dl != null && dl.__audioGainNode && sr)
    try {
      dl.__audioGainNode.gain.setValueAtTime(Eo, sr.currentTime);
    } catch {
    }
}
function $g() {
  if (Li) return;
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
        gain: Eo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Li = requestAnimationFrame(t);
  };
  Li = requestAnimationFrame(t);
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
    let y = 1 / 0, S = 1 / 0, M = -1 / 0, _ = -1 / 0;
    e.forEach((m) => {
      const T = m.x ?? m.X ?? 0, w = m.y ?? m.Y ?? 0, b = m.width ?? m.Width ?? 1920, h = m.height ?? m.Height ?? 1080;
      y = Math.min(y, T), S = Math.min(S, w), M = Math.max(M, T + b), _ = Math.max(_, w + h);
    });
    const k = Math.max(1, M - y), x = Math.max(1, _ - S);
    return { minX: y, minY: S, totalW: k, totalH: x };
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
              const M = y.displayId ?? y.DisplayId ?? `mon-${S}`, _ = (y.x ?? y.X ?? 0) - a.minX, k = (y.y ?? y.Y ?? 0) - a.minY, x = y.width ?? y.Width ?? 1920, m = y.height ?? y.Height ?? 1080, T = M === t;
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
                        width: Math.max(10, x - 20),
                        height: Math.max(10, m - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: _ + x / 2,
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
  isSpotlightActive: v,
  globalGaps: f = [],
  recordingSegments: p = {},
  playbackSpeed: y = 1,
  activeAudioStationId: S = null,
  directorPlan: M = null,
  isAutoDirectorEnabled: _ = !0,
  targetDisplayId: k = "auto",
  onSelectDisplayId: x = null,
  areAllDisplaysPlaced: m = !1,
  hideDisplayStrip: T = !1
}) {
  var He;
  const w = e.hostname || e.name || e.id || "", b = Math.round(t), [h, A] = u.useState(() => !w || !b ? null : On.get(w, b) || null), [j, N] = u.useState(""), [P, U] = u.useState(!1), [L, z] = u.useState(!1), [le, ne] = u.useState(!1), V = u.useRef(l), I = u.useRef(null), B = u.useRef(0), O = u.useRef(t - a), K = u.useRef(t - a), R = u.useRef(!1), oe = u.useRef(null), q = u.useRef(!1);
  O.current = t - a;
  const J = (e == null ? void 0 : e.displays) || ((He = e == null ? void 0 : e.topology) == null ? void 0 : He.displays) || [], [Y, Le] = u.useState(null);
  u.useEffect(() => {
    Le(null);
  }, [k]);
  const _e = u.useMemo(() => {
    const ge = M || (e == null ? void 0 : e.directorPlan);
    return !ge || !ge.segments || ge.segments.length === 0 ? null : ge.segments.find((he) => {
      const $ = he.startEpochMs ?? he.StartEpochMs ?? 0, Q = he.endEpochMs ?? he.EndEpochMs ?? 0;
      return t >= $ && t <= Q;
    }) || ge.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t]), je = u.useMemo(() => {
    var ge;
    return Y ? Y.toLowerCase() : k && k !== "auto" && k !== "director" ? k.toLowerCase() : J.length > 1 && _ !== !1 && _e ? (_e.targetDisplayId || _e.TargetDisplayId || "mon-0").toLowerCase() : (((ge = J[0]) == null ? void 0 : ge.displayId) || "mon-0").toLowerCase();
  }, [Y, k, J, _, _e]), Qe = u.useRef(je), [Me, be] = u.useState(!1);
  u.useEffect(() => {
    if (Qe.current && Qe.current !== je) {
      be(!0);
      const ge = setTimeout(() => be(!1), 2e3);
      return Qe.current = je, () => clearTimeout(ge);
    }
    Qe.current = je;
  }, [je]);
  const Ze = p[e == null ? void 0 : e.id] || p[w] || (e == null ? void 0 : e.segments) || [], ot = Ze.length === 0 || Ze.some((ge) => {
    const he = ge.startEpochMs ?? ge.startEpoch ?? 0, $ = ge.endEpochMs ?? ge.endEpoch ?? 0;
    return t >= he && t <= $;
  }), ie = !!(r ? !vl().isMuted : S && (e.id === S || w === S)), ke = u.useCallback(() => {
    if (!I.current) return;
    const ge = vl();
    if (r)
      I.current.volume = ge.volume, I.current.muted = ge.isMuted, ge.isMuted || Ua(I.current);
    else {
      const he = !!(S && (e.id === S || w === S));
      I.current.muted = !he, he && (I.current.volume = ge.volume, Ua(I.current));
    }
  }, [r, S, e.id, w]);
  u.useEffect(() => {
    ke();
  }, [ke]), u.useEffect(() => {
    const ge = (he) => {
      I.current && he.detail && ke();
    };
    return window.addEventListener("itb-audio-state-changed", ge), () => window.removeEventListener("itb-audio-state-changed", ge);
  }, [ke]), u.useEffect(() => {
    I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !b || !w) return;
    if (l) {
      V.current = !0;
      return;
    }
    const ge = V.current;
    V.current = l;
    let he = !0;
    const $ = new AbortController(), Q = On.get(w, b, je);
    if (Q) {
      A(Q), z(!1), ne(!1);
      return;
    }
    ne(!0);
    const te = setTimeout(() => {
      he && On.fetchFrame(w, b, $.signal, je).then((Z) => {
        he && (ne(!1), Z && Z !== "NO_SIGNAL" ? (A(Z), z(!1)) : Z === "NO_SIGNAL" && z(!0));
      });
    }, ge ? 25 : 40), ee = On.subscribe((Z, se, Ae, ve) => {
      Z === w && se === b && (!ve || ve === je) && he && (ne(!1), Ae && Ae !== "NO_SIGNAL" ? (A(Ae), z(!1)) : Ae === "NO_SIGNAL" && z(!0));
    });
    return () => {
      he = !1, clearTimeout(te), $.abort(), ee();
    };
  }, [w, b, n, l, r, P, je]), u.useEffect(() => {
    if (!w || !(r || l)) {
      l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load()));
      return;
    }
    let he = null;
    return l && !v && ot ? he = setTimeout(() => {
      const $ = O.current;
      B.current = $, K.current = $, R.current = !1;
      const Q = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + $}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      U(!1), N(Q);
    }, 80) : l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), U(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load())), () => {
      he && clearTimeout(he);
    };
  }, [l, r, w, a, i, v, ot, je]), u.useEffect(() => {
    if (!w || !(r || l)) return;
    const he = O.current, $ = Math.abs(he - K.current);
    if (!l || $ < 800) {
      K.current = he;
      return;
    }
    return R.current = !0, K.current = he, B.current = he, I.current && I.current.pause(), U(!1), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!ot || v) {
        N(""), U(!1), R.current = !1;
        return;
      }
      const Q = O.current, W = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Q}&displayId=${encodeURIComponent(je)}&_t=${Date.now()}`;
      N(W);
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [t, l, r, w, a, i, v, ot, je]), u.useEffect(() => {
    if (r || !l || !I.current || !P || R.current) return;
    const ge = (O.current - B.current) / 1e3;
    if (ge >= 0) {
      const he = I.current, $ = he.currentTime, Q = Math.abs($ - ge);
      if (Q > 0.35 && Q < 3)
        try {
          he.currentTime = ge;
        } catch {
        }
    }
  }, [r, l, t, P]), u.useEffect(() => {
    if (!r || !l || !j || !P || v) return;
    let ge = null, he = I.current ? I.current.currentTime : 0, $ = performance.now(), Q = B.current + Math.round(he * 1e3);
    const W = () => {
      const te = I.current;
      if (te && !te.paused && !te.ended && !q.current && !R.current) {
        const ee = performance.now(), Z = te.currentTime;
        Math.abs(Z - he) > 5e-4 && (he = Z, $ = ee);
        const se = Math.max(0, (ee - $) / 1e3), Ae = te.playbackRate || y || 1, ve = he + se * Ae;
        let lt = B.current + Math.round(ve * 1e3);
        const st = lt - Q;
        if (st < 0 && st > -300 && (lt = Q), lt >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const et = a + lt, xt = f == null ? void 0 : f.find((Je) => et >= Je.startEpochMs && et < Je.endEpochMs);
        if (xt) {
          q.current = !0;
          const Je = xt.endEpochMs - a;
          d(Je), B.current = Je, Q = Je, K.current = Je;
          const $t = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Je}&_t=${Date.now()}`;
          U(!1), N($t), setTimeout(() => {
            q.current = !1;
          }, 300);
          return;
        }
        lt !== Q && (Q = lt, K.current = lt, d == null || d(lt));
      }
      ge = requestAnimationFrame(W);
    };
    return ge = requestAnimationFrame(W), () => {
      ge && cancelAnimationFrame(ge);
    };
  }, [
    r,
    l,
    j,
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
  const ze = () => {
    if (q.current) return;
    const ge = a + O.current, he = Ze.map(($) => ({ start: $.startEpochMs ?? $.startEpoch ?? 0, end: $.endEpochMs ?? $.endEpoch ?? 0 })).filter(($) => $.start > ge + 200).sort(($, Q) => $.start - Q.start)[0];
    if (he && he.start - a < c) {
      q.current = !0;
      const $ = he.start - a;
      d($), B.current = $;
      const Q = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(w)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + $}&_t=${Date.now()}`;
      U(!1), N(Q), setTimeout(() => {
        q.current = !1;
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
    (r || l) && j && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: I,
        src: j,
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
          R.current = !1, U(!0), ke(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onWaiting: () => {
          U(!1);
        },
        onTimeUpdate: () => {
          var ge;
          !P && ((ge = I.current) == null ? void 0 : ge.currentTime) > 0 && (R.current = !1, U(!0));
        },
        onEnded: ze
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
            onError: () => z(!0)
          }
        ) : (!h || L || !ot) && !j ? /* @__PURE__ */ s.jsx(Tp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && ot && !P && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    J.length > 1 && /* @__PURE__ */ s.jsx(
      Ap,
      {
        displays: J,
        activeDisplayId: je,
        onSelectDisplay: (ge) => {
          Le(ge), x == null || x(ge);
        },
        isTransitioning: Me,
        mode: _ ? "AUTO" : "MANUAL"
      }
    ),
    !T && /* @__PURE__ */ s.jsx(
      Rg,
      {
        displays: J,
        activeDisplayId: je,
        onSelectDisplay: (ge) => {
          Le(ge), x == null || x(ge);
        },
        areAllDisplaysPlaced: m,
        isAutoDirectorEnabled: _
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
  outPointMs: v,
  setPlayheadMs: f,
  isSpotlightActive: p,
  globalGaps: y = [],
  onOpenSpotlight: S,
  onSelectActiveStation: M,
  recordingSegments: _ = {},
  playbackSpeed: k = 1,
  activeAudioStationId: x = null,
  onSoloAudio: m,
  directorPlan: T = null,
  isAutoDirectorEnabled: w = !0,
  targetDisplayId: b = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: j = 0,
  borderColor: N = null,
  onSwapWithNext: P = null
}) {
  var I;
  const U = !!(x && (e.id === x || e.hostname && e.hostname === x)), L = (e.hostname || e.name || "").includes("Offline"), z = L ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((I = e == null ? void 0 : e.topology) == null ? void 0 : I.displays) || []).length > 1;
  const ne = () => {
    if (t) {
      const B = b && b !== "auto" && b !== "director" ? b : null;
      S && S(e.id, B);
    } else
      M && M(e.id);
  }, V = (B) => {
    B.preventDefault(), B.stopPropagation(), t && M && (i && i(!1), M(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: ne,
      onContextMenu: V,
      className: `camera-card ${z} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${z}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            P && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (B) => {
                  B.stopPropagation(), P();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            m && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${U ? "audio-active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), m(U ? null : e.id);
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
            S && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (B) => {
                  B.stopPropagation();
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
                onClick: (B) => {
                  B.stopPropagation(), t && i && i(!1), M(t ? null : e.id);
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
                onClick: (B) => {
                  B.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${L ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Lg,
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
              activeAudioStationId: x,
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
          St(l, o)
        ] }) })
      ]
    }
  ) });
}
const Oi = ["top-right", "bottom-right", "bottom-left", "top-left"];
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
  }), o = t || r, a = u.useCallback((_) => {
    _ && (_.preventDefault(), _.stopPropagation());
    const x = (Oi.indexOf(o) + 1) % Oi.length, m = Oi[x];
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
function tn(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function _g(e) {
  const t = tn(e, 0, 1);
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
  var M, _, k, x, m, T;
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
    return ((x = l.layout) == null ? void 0 : x.placements) || n;
  const d = (t - c) / a, v = tn(d, 0, 1), f = i === "linear" ? v : _g(v), p = ((m = l.layout) == null ? void 0 : m.placements) || [], y = ((T = o.layout) == null ? void 0 : T.placements) || [], S = y.map((w) => {
    const b = p.find((U) => U.stationId === w.stationId && U.displayId === w.displayId);
    if (!b)
      return {
        ...w,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(b.x + (w.x - b.x) * f), A = Math.round(b.y + (w.y - b.y) * f), j = Math.round(b.width + (w.width - b.width) * f), N = Math.round(b.height + (w.height - b.height) * f), P = Number(((b.rotation || 0) + ((w.rotation || 0) - (b.rotation || 0)) * f).toFixed(1));
    return {
      ...w,
      x: h,
      y: A,
      width: j,
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
function zg(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
], Dc = 1920, Pc = 1080, wt = [
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
  let i, c, d, v;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), v = t), { x: d, y: v, width: i, height: c };
}
function qs(e, t = Dc, n = Pc) {
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
      borderColor: wt[0],
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
        borderColor: wt[v % wt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const p = Math.round(t / 3);
      return e.slice(0, 3).map((y, S) => {
        const M = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: _, y: k, width: x, height: m } = rr(S * p, 0, p, n, M);
        return {
          ...y,
          x: _,
          y: k,
          width: x,
          height: m,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: M,
          aspectRatio: M,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: wt[S % wt.length],
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
      const S = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: M, cy: _ } = f[y], { x: k, y: x, width: m, height: T } = rr(M, _, d, v, S);
      return {
        ...p,
        x: k,
        y: x,
        width: m,
        height: T,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: wt[y % wt.length],
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
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: S, cy: M } = v[p], { x: _, y: k, width: x, height: m } = rr(S, M, c, d, y);
      return {
        ...f,
        x: _,
        y: k,
        width: x,
        height: m,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: p,
        rotation: 0,
        borderWidth: 2,
        borderColor: wt[p % wt.length],
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
      borderColor: wt[d % wt.length],
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
  playheadMs: v = 0,
  playheadEpochMs: f = 0,
  timeMode: p = "LOCAL",
  isPlaying: y = !1,
  setIsPlaying: S,
  totalDurationMs: M,
  inPointMs: _ = 0,
  outPointMs: k,
  setPlayheadMs: x,
  globalGaps: m = [],
  recordingSegments: T = {},
  playbackSpeed: w = 1,
  onChangePlaybackSpeed: b,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: j = null,
  onOverrideDisplay: N,
  onResetOverride: P,
  compositionLayout: U = "canvas",
  onChangeCompositionLayout: L,
  isAutoDirectorEnabled: z = !0,
  onToggleAutoDirector: le,
  onUpdateCanvasLayout: ne,
  canvasLayoutTimeline: V = null,
  onUpdateCanvasLayoutTimeline: I,
  activeKfIndex: B = 0,
  setActiveKfIndex: O,
  isModalOpen: K = !1,
  isGridFullscreen: R = void 0,
  onToggleGridFullscreen: oe = null
}) {
  const q = f > 0 ? f : d + v, [J, Y] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Le, _e] = u.useState(() => {
    var g;
    return ((g = t[0]) == null ? void 0 : g.id) || null;
  }), [je, Qe] = u.useState(!1), [Me, be] = u.useState(null), [Ze, ot] = u.useState({ index: null, position: null }), [ie, ke] = u.useState(!1), [ze, He] = u.useState(!1), [ge, he] = u.useState(!1), [$, Q] = u.useState(!1), [W, te] = u.useState(""), [ee, Z] = u.useState(""), se = u.useRef(null), [Ae, ve] = u.useState(() => {
    try {
      const g = localStorage.getItem("itb_canvas_saved_presets");
      return g ? JSON.parse(g) : [];
    } catch {
      return [];
    }
  }), lt = (g) => {
    ve(g);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(g));
    } catch {
    }
  }, [st, et] = u.useState(!1), xt = R !== void 0 ? R : st, [Je, $t] = u.useState(!1);
  u.useRef(null);
  const Ut = u.useRef(null), Ct = u.useRef(null), Wt = u.useRef(null), [ct, rt] = u.useState({ width: 960, height: 540 }), [Ke, Ve] = u.useState(0), [Rt, Tt] = u.useState(!1);
  u.useEffect(() => {
    const g = (E) => {
      E.key === "Escape" && Tt(!1);
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, []);
  const [en, Cn] = u.useState(!1), [Qn, Oe] = u.useState(!1), [Re, tt] = u.useState(!1), [ae, qe] = u.useState(!1), [H, de] = u.useState(!1), [fe, Fe] = u.useState({ vertical: null, horizontal: null }), [Ge, ut] = u.useState(!0), [dt, Xe] = u.useState(!0), [ht, jt] = u.useState(null), [Mt, Ot] = u.useState({ x: 0, y: 0, isInside: !1 }), ln = u.useRef(null), Dt = u.useRef(null), zt = u.useRef(!1), [un, Xt] = u.useState("auto-grid"), At = u.useRef([]), An = u.useRef([]), gs = u.useRef(null), [, Ss] = u.useState(0), Kr = u.useRef(null), [Bn, Gs] = u.useState(null), Pt = u.useCallback((g, E = "success", D = "💾") => {
    Kr.current && clearTimeout(Kr.current), Gs({ text: g, type: E, icon: D }), Kr.current = setTimeout(() => {
      Gs(null), Kr.current = null;
    }, 2200);
  }, []), [Kt, as] = u.useState(() => {
    var D, X, G, F, ce, Te;
    const g = (G = (X = (D = V == null ? void 0 : V.keyframes) == null ? void 0 : D[0]) == null ? void 0 : X.layout) == null ? void 0 : G.width, E = (Te = (ce = (F = V == null ? void 0 : V.keyframes) == null ? void 0 : F[0]) == null ? void 0 : ce.layout) == null ? void 0 : Te.height;
    if (g && E) {
      const pe = is.find((Ee) => Ee.w === g && Ee.h === E);
      if (pe) return pe.id;
    }
    return "16:9";
  }), [Un, Er] = u.useState(() => {
    try {
      const g = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (g !== null) return g === "true";
    } catch {
    }
    return !1;
  }), Sn = u.useCallback(() => {
    Er((g) => {
      const E = !g;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(E));
      } catch {
      }
      return E;
    });
  }, []), Ms = u.useMemo(() => is.find((g) => g.id === Kt) || is[0], [Kt]), De = Ms.w, Se = Ms.h, Os = Ms.ratio, To = u.useMemo(() => {
    const g = [], E = De >= 3e3 ? 200 : 100, D = E / 2, X = E / 10;
    for (let G = 0; G <= De; G += X) {
      const F = G % E === 0, ce = !F && G % D === 0;
      g.push({ val: G, isMajor: F, isMed: ce });
    }
    return g;
  }, [De]), jr = u.useMemo(() => {
    const g = [];
    for (let G = 0; G <= Se; G += 10) {
      const F = G % 100 === 0, ce = !F && G % 50 === 0;
      g.push({ val: G, isMajor: F, isMed: ce });
    }
    return g;
  }, [Se]), Ao = u.useCallback((g) => {
    const E = ln.current || Ct.current;
    if (!E) return;
    const D = E.getBoundingClientRect(), X = tn(Math.round((g.clientX - D.left) / D.width * De), 0, De), G = tn(Math.round((g.clientY - D.top) / D.height * Se), 0, Se);
    Ot({ x: X, y: G, isInside: !0 });
  }, [De, Se]), $o = u.useCallback(() => {
    Ot((g) => ({ ...g, isInside: !1 }));
  }, []), Jn = u.useCallback(() => {
    const g = Wt.current;
    if (!g) return;
    const E = g.getBoundingClientRect(), X = Math.max(320, Math.floor(E.width || 960) - 104 - 16), G = Math.max(180, Math.floor(E.height || 540) - 16);
    let F, ce;
    Un ? (F = X, ce = Math.round(F / Os)) : X / G >= Os ? (ce = G, F = Math.round(ce * Os)) : (F = X, ce = Math.round(F / Os)), rt((Te) => Te.width === F && Te.height === ce ? Te : { width: F, height: ce });
  }, [Un, Os]);
  u.useEffect(() => {
    const g = Wt.current;
    if (!g) return;
    Jn();
    let E = null;
    return typeof ResizeObserver < "u" && (E = new ResizeObserver(() => {
      Jn();
    }), E.observe(g)), window.addEventListener("resize", Jn), () => {
      E && E.disconnect(), window.removeEventListener("resize", Jn);
    };
  }, [Jn]);
  const dn = u.useMemo(() => (t && t.length > 0 ? t : n).map((E) => {
    const D = E.displays && E.displays.length > 0 ? E.displays : E.topology && E.topology.displays && E.topology.displays.length > 0 ? E.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: E.width || 1920, height: E.height || 1080 }], X = D.find((pe) => pe.isPrimary) || D[0], G = X.width || X.Width || E.width || 1920, F = X.height || X.Height || E.height || 1080, ce = G && F ? G / F : 16 / 9, Te = D.length > 1;
    return {
      stationId: E.id,
      displayId: "auto",
      label: `${E.displayName || E.roleAlias || E.hostname || E.name} - ${Te ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: E.displayName || E.roleAlias || E.hostname || E.name,
      stationHostname: E.hostname || E.id,
      isPrimary: !0,
      sourceWidth: G,
      sourceHeight: F,
      nativeAspectRatio: ce,
      aspectRatio: ce,
      width: G,
      height: F
    };
  }), [t, n]), Zt = u.useMemo(() => {
    const g = t && t.length > 0 ? t : n, E = [];
    return g.forEach((D) => {
      const X = D.displays && D.displays.length > 0 ? D.displays : D.topology && D.topology.displays && D.topology.displays.length > 0 ? D.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: D.width || 1920, height: D.height || 1080 }], G = X.find((pe) => pe.isPrimary) || X[0], F = G.width || G.Width || D.width || 1920, ce = G.height || G.Height || D.height || 1080, Te = F / ce;
      E.push({
        stationId: D.id,
        displayId: "auto",
        label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${X.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: D.displayName || D.roleAlias || D.hostname || D.name,
        stationHostname: D.hostname || D.id,
        isPrimary: !0,
        sourceWidth: F,
        sourceHeight: ce,
        nativeAspectRatio: Te,
        aspectRatio: Te,
        width: F,
        height: ce
      }), X.length > 1 && X.forEach((pe, Ee) => {
        const yt = (pe.displayId || `mon-${Ee}`).toLowerCase(), ft = pe.displayNumber || Ee + 1, pt = pe.displayName || `Screen ${ft}`, xe = pe.width || pe.Width || D.width || 1920, mt = pe.height || pe.Height || D.height || 1080, _t = xe / mt;
        E.push({
          stationId: D.id,
          displayId: yt,
          label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${pt}`,
          stationName: D.displayName || D.roleAlias || D.hostname || D.name,
          stationHostname: D.hostname || D.id,
          isPrimary: !!pe.isPrimary,
          sourceWidth: xe,
          sourceHeight: mt,
          nativeAspectRatio: _t,
          aspectRatio: _t,
          width: xe,
          height: mt
        });
      });
    }), E;
  }, [t, n]), [yn, fn] = u.useState(() => {
    var g;
    if (((g = V == null ? void 0 : V.keyframes) == null ? void 0 : g.length) > 0) {
      const E = JSON.parse(JSON.stringify(V));
      if (t && t.length > 0) {
        const D = new Set(t.map((G) => G.id));
        if (E.keyframes.forEach((G) => {
          var F, ce;
          ((ce = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0 && (G.layout.placements = G.layout.placements.filter((Te) => D.has(Te.stationId)));
        }), E.keyframes.some((G) => {
          var F, ce;
          return ((ce = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0;
        })) return E;
      } else
        return E;
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
            placements: qs(dn, Dc, Pc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var g;
    if (((g = V == null ? void 0 : V.keyframes) == null ? void 0 : g.length) > 0) {
      const E = JSON.parse(JSON.stringify(V));
      if (t && t.length > 0) {
        const X = new Set(t.map((G) => G.id));
        E.keyframes.forEach((G) => {
          var F, ce;
          ((ce = (F = G.layout) == null ? void 0 : F.placements) == null ? void 0 : ce.length) > 0 && (G.layout.placements = G.layout.placements.filter((Te) => X.has(Te.stationId)));
        });
      }
      fn(E), E.keyframes.some((X) => {
        var G, F;
        return ((F = (G = X.layout) == null ? void 0 : G.placements) == null ? void 0 : F.length) > 0;
      }) && (zt.current = !0, Xt("custom"));
    }
  }, [V, t]);
  const kn = yn.keyframes || [], Ro = u.useMemo(() => Fg(kn, q), [kn, q]), pn = tn(
    B ?? Ro,
    0,
    Math.max(0, kn.length - 1)
  ), Wn = kn[pn] || kn[Ro] || kn[0], me = u.useMemo(() => {
    var g;
    return ((g = Wn == null ? void 0 : Wn.layout) == null ? void 0 : g.placements) || [];
  }, [Wn]), Zn = u.useCallback((g = "Action") => ({
    label: g,
    timeline: JSON.parse(JSON.stringify(yn)),
    aspectId: Kt,
    presetId: un,
    selectedFeedIndex: Ke
  }), [yn, Kt, un, Ke]), $n = u.useCallback((g = "Action") => {
    const E = Zn(g);
    At.current.push(E), At.current.length > 50 && At.current.shift(), An.current = [], Ss((D) => D + 1);
  }, [Zn]), Al = u.useCallback(() => {
    gs.current && (At.current.push(gs.current), At.current.length > 50 && At.current.shift(), An.current = [], gs.current = null, Ss((g) => g + 1));
  }, []), $l = u.useCallback(() => {
    const g = f > 0 ? f : d + v, E = 500;
    if (g <= d + E) return pn;
    const D = (Wn == null ? void 0 : Wn.layout) || {
      width: De,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: me
    }, { nextTimeline: X, newIndex: G, isNew: F } = eh(yn, g, D, E);
    return F && (fn(X), I && I(X), O && O(G), Pt(
      `Keyframe #${G + 1} created at ${St(g, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), G;
  }, [f, d, v, pn, Wn, De, Se, me, yn, I, O, p, Pt]), C = u.useCallback((g, E = null) => {
    E && $n(E);
    const D = f > 0 ? f : d + v;
    fn((X) => {
      const { nextTimeline: G, newIndex: F, isNewKeyframe: ce } = Ug({
        prevTimeline: X,
        newPlacements: g,
        currentEpochMs: D,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: De,
        virtualH: Se,
        fps: 30
      });
      return I && I(G), O && O(F), ce && F > 0 && Pt(
        `Keyframe #${F + 1} created at ${St(D, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), G;
    });
  }, [f, d, v, De, Se, I, O, p, Pt, $n]);
  u.useEffect(() => {
    if (dn.length > 0 && (!me || me.length === 0) && !zt.current) {
      let g = Kt;
      dn.length === 2 && Kt === "16:9" && (g = "32:9", as("32:9"));
      const E = is.find((X) => X.id === g) || is[0], D = qs(dn, E.w, E.h);
      D.length > 0 && (C(D), Xt("auto-grid"));
    }
  }, [dn, me, C, Kt]);
  const re = u.useRef("");
  u.useEffect(() => {
    const g = (t || []).map((E) => E.id).sort().join(",");
    if (re.current === "") {
      re.current = g;
      return;
    }
    if (re.current !== g && (re.current = g, t && t.length > 0)) {
      const E = new Set(t.map((D) => D.id));
      if (un === "auto-grid" || !zt.current) {
        let D = Kt;
        dn.length === 2 && Kt === "16:9" && (D = "32:9", as("32:9"));
        const X = is.find((F) => F.id === D) || is[0], G = qs(dn, X.w, X.h);
        G.length > 0 && C(G);
      } else if (me && me.length > 0) {
        const D = me.filter((X) => E.has(X.stationId));
        if (D.length !== me.length)
          if (D.length === 0) {
            const X = qs(dn, De, Se);
            C(X);
          } else
            C(D);
      }
    }
  }, [t, dn, un, Kt, me, C, De, Se]), u.useEffect(() => {
    ne && ne({
      width: De,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: me,
      timeline: yn
    });
  }, [me, yn, ne, De, Se]);
  const ue = u.useCallback((g) => {
    const E = Ms, D = is.find((X) => X.id === g) || is[0];
    if (E.id !== D.id)
      if (as(D.id), zt.current) {
        const X = D.w / E.w, G = D.h / E.h, F = me.map((ce) => ({
          ...ce,
          x: Math.round(ce.x * X),
          y: Math.round(ce.y * G),
          width: Math.round(ce.width * X),
          height: Math.round(ce.height * G)
        }));
        C(F);
      } else {
        const X = dn.length > 0 ? dn : me && me.length > 0 ? me : Zt, G = qs(X, D.w, D.h);
        C(G);
      }
  }, [Ms, me, Zt, C]), ye = u.useCallback((g) => {
    const E = me.length > 0 ? Math.max(...me.map((pe) => pe.zIndex || 0)) + 1 : 0, D = wt[me.length % wt.length], X = g.nativeAspectRatio || (g.sourceWidth && g.sourceHeight ? g.sourceWidth / g.sourceHeight : 16 / 9), G = X >= 1 ? 640 : Math.round(360 * X), F = X >= 1 ? Math.round(640 / X) : 360, ce = {
      stationId: g.stationId,
      displayId: g.displayId,
      label: g.label,
      x: 100 + me.length * 40 % 800,
      y: 80 + me.length * 40 % 500,
      width: G,
      height: F,
      sourceWidth: g.sourceWidth || 1920,
      sourceHeight: g.sourceHeight || 1080,
      nativeAspectRatio: X,
      aspectRatio: X,
      zIndex: E,
      rotation: 0,
      borderWidth: 2,
      borderColor: D,
      shadowEffect: "deep",
      borderRadius: 0
    }, Te = [...me, ce];
    C(Te), Ve(Te.length - 1);
  }, [me, C]), Ce = u.useCallback((g) => {
    const E = me.filter((D, X) => X !== g);
    C(E), Ve((D) => Math.max(0, D - 1));
  }, [me, C]), we = u.useCallback(() => {
    C([]), Ve(-1);
  }, [C]), Ie = (g) => {
    const E = g.map((X, G) => ({ p: X, origIdx: G }));
    E.sort((X, G) => (X.p.zIndex ?? X.origIdx) - (G.p.zIndex ?? G.origIdx));
    const D = [...g];
    return E.forEach(({ origIdx: X }, G) => {
      D[X] = { ...D[X], zIndex: G + 1 };
    }), D;
  };
  u.useCallback((g = Ke) => {
    if (g < 0 || !me[g]) return;
    const E = Ie(me), D = E[g].zIndex, X = E.length;
    if (D >= X) return;
    const G = E.map((F, ce) => ce === g ? { ...F, zIndex: X } : F.zIndex > D ? { ...F, zIndex: F.zIndex - 1 } : F);
    C(G);
  }, [Ke, me, C]), u.useCallback((g = Ke) => {
    if (g < 0 || !me[g]) return;
    const E = Ie(me), D = E[g].zIndex;
    if (D <= 1) return;
    const X = E.map((G, F) => F === g ? { ...G, zIndex: 1 } : G.zIndex < D ? { ...G, zIndex: G.zIndex + 1 } : G);
    C(X);
  }, [Ke, me, C]);
  const $e = u.useCallback((g = Ke) => {
    if (g < 0 || !me[g]) return;
    const E = Ie(me), D = E[g].zIndex, X = D + 1;
    if (X > E.length) return;
    const G = E.map((F, ce) => ce === g ? { ...F, zIndex: X } : F.zIndex === X ? { ...F, zIndex: D } : F);
    C(G);
  }, [Ke, me, C]), Ye = u.useCallback((g = Ke) => {
    if (g < 0 || !me[g]) return;
    const E = Ie(me), D = E[g].zIndex, X = D - 1;
    if (X < 1) return;
    const G = E.map((F, ce) => ce === g ? { ...F, zIndex: X } : F.zIndex === X ? { ...F, zIndex: D } : F);
    C(G);
  }, [Ke, me, C]), Be = u.useCallback((g) => {
    if (Ke < 0 || !me[Ke]) return;
    const E = me.map((D, X) => X === Ke ? { ...D, ...g } : D);
    C(E);
  }, [Ke, me, C]), Ue = u.useCallback((g = 90) => {
    const E = me[Ke];
    if (!E) return;
    const X = ((E.rotation || 0) + g) % 360;
    Be({ rotation: X });
  }, [Ke, me, Be]), at = u.useCallback((g = Ke) => {
    if (g < 0 || !me[g]) return;
    const E = me.length, D = me.map((X, G) => G === g ? {
      ...X,
      x: 0,
      y: 0,
      width: De,
      height: Se,
      zIndex: E
    } : X);
    C(D);
  }, [Ke, me, C, De, Se]), nt = u.useCallback((g) => {
    let E = [];
    const D = dn.length > 0 ? dn : Zt.length > 0 ? Zt : me;
    switch (g) {
      case "auto":
      case "auto-grid":
        E = qs(D, De, Se);
        break;
      case "1x1":
        D.length > 0 && (E = [{
          ...D[0],
          x: 0,
          y: 0,
          width: De,
          height: Se,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: wt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (D.length >= 2) {
          const X = Math.round(De / 2);
          E = D.slice(0, 2).map((G, F) => {
            const ce = G.nativeAspectRatio || (G.sourceWidth && G.sourceHeight ? G.sourceWidth / G.sourceHeight : 1.7777777777777777), { x: Te, y: pe, width: Ee, height: yt } = rr(F * X, 0, X, Se, ce);
            return {
              ...G,
              x: Te,
              y: pe,
              width: Ee,
              height: yt,
              sourceWidth: G.sourceWidth || 1920,
              sourceHeight: G.sourceHeight || 1080,
              nativeAspectRatio: ce,
              aspectRatio: ce,
              zIndex: F + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: wt[F % wt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          E = qs(D, De, Se);
        break;
      case "2x2": {
        const X = Math.round(De / 2), G = Math.round(Se / 2);
        E = D.slice(0, 4).map((F, ce) => ({
          ...F,
          x: ce % 2 * X,
          y: Math.floor(ce / 2) * G,
          width: X,
          height: G,
          zIndex: ce,
          rotation: 0,
          borderWidth: 2,
          borderColor: wt[ce % wt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (D.length >= 2) {
          E = [
            { ...D[0], x: 0, y: 0, width: De, height: Se, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: wt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const X = D.slice(1, 4), G = Math.round(De * 0.23), F = Math.round(G / (16 / 9));
          X.forEach((ce, Te) => {
            E.push({
              ...ce,
              x: De - G - 24,
              y: 24 + Te * (F + 16),
              width: G,
              height: F,
              zIndex: 10 + Te,
              rotation: 0,
              borderWidth: 3,
              borderColor: wt[(Te + 1) % wt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (D.length >= 3) {
          const X = Math.round(De * 0.666), G = De - X, F = Math.round(Se / 2);
          E = [
            { ...D[0], x: 0, y: 0, width: X, height: Se, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: wt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...D[1], x: X, y: 0, width: G, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: wt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...D[2], x: X, y: F, width: G, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: wt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (D.length >= 3)
          if (De / Se >= 2.5) {
            const G = Math.round(De / 3);
            E = D.slice(0, 3).map((F, ce) => {
              const Te = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 1.7777777777777777), { x: pe, y: Ee, width: yt, height: ft } = rr(ce * G, 0, G, Se, Te);
              return {
                ...F,
                x: pe,
                y: Ee,
                width: yt,
                height: ft,
                sourceWidth: F.sourceWidth || 1920,
                sourceHeight: F.sourceHeight || 1080,
                nativeAspectRatio: Te,
                aspectRatio: Te,
                zIndex: ce,
                rotation: 0,
                borderWidth: 2,
                borderColor: wt[ce % wt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const G = Math.round(De / 2), F = Math.round(Se / 2);
            E = [
              { ...D[0], x: 0, y: 0, width: G, height: F, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: wt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...D[1], x: G, y: 0, width: G, height: F, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: wt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...D[2], x: Math.round(G / 2), y: F, width: G, height: F, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: wt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    E.length > 0 && (C(E), Ve(0), g === "auto" || g === "auto-grid" ? Xt("auto-grid") : (Xt(g), zt.current = !0));
  }, [Zt, me, C, De, Se]), bt = u.useCallback(() => {
    const g = W.trim() || `Custom Layout ${Ae.length + 1}`, D = [{
      id: `preset-${Date.now()}`,
      name: g,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(me)),
      keyframes: JSON.parse(JSON.stringify(kn))
    }, ...Ae];
    lt(D), te(""), ke(!1);
  }, [W, Ae, me, kn]), on = u.useCallback((g) => {
    !g || !g.placements || (C(g.placements), Ve(0), Xt("custom"), zt.current = !0, He(!1));
  }, [C]), Vt = u.useCallback((g, E) => {
    E == null || E.stopPropagation();
    const D = Ae.filter((X) => X.id !== g);
    lt(D);
  }, [Ae]), mn = u.useCallback(() => {
    const g = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: De,
      height: Se,
      aspectRatio: Kt,
      placements: me,
      timeline: yn
    }, E = JSON.stringify(g, null, 2), D = new window.Blob([E], { type: "application/json" }), X = window.URL.createObjectURL(D), G = document.createElement("a"), F = /* @__PURE__ */ new Date(), ce = (pe) => String(pe).padStart(2, "0"), Te = `${F.getFullYear()}${ce(F.getMonth() + 1)}${ce(F.getDate())}_${ce(F.getHours())}${ce(F.getMinutes())}${ce(F.getSeconds())}`;
    G.href = X, G.download = `canvas_layout_${Te}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), window.URL.revokeObjectURL(X);
  }, [me, yn, De, Se, Kt]), xs = u.useCallback((g) => {
    var X;
    const E = (X = g.target.files) == null ? void 0 : X[0];
    if (!E) return;
    const D = new window.FileReader();
    D.onload = (G) => {
      var F, ce, Te;
      try {
        const pe = JSON.parse(G.target.result);
        if (pe.width && pe.height) {
          const yt = is.find((ft) => ft.w === pe.width && ft.h === pe.height);
          yt && as(yt.id);
        } else if (pe.aspectRatio) {
          const yt = is.find((ft) => ft.id === pe.aspectRatio);
          yt && as(yt.id);
        }
        let Ee = null;
        Array.isArray(pe) ? Ee = pe : pe.placements && Array.isArray(pe.placements) ? Ee = pe.placements : (F = pe.layout) != null && F.placements && Array.isArray(pe.layout.placements) && (Ee = pe.layout.placements), Ee && Ee.length > 0 && (C(Ee), Ve(0), Xt("custom"), zt.current = !0), ((Te = (ce = pe.timeline) == null ? void 0 : ce.keyframes) == null ? void 0 : Te.length) > 0 && (fn(pe.timeline), I && I(pe.timeline));
      } catch (pe) {
        console.error("Failed to parse imported canvas JSON:", pe), alert(`Canvas Import Error: ${pe.message}`);
      }
    }, D.readAsText(E), g.target.value = "";
  }, [C, I]), Cr = (g, E) => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault(), Ve(E), zt.current = !0, Xt("custom");
    const D = $l(), X = ln.current || Ct.current;
    if (!X) return;
    const G = X.getBoundingClientRect(), F = me[E];
    if (!F) return;
    gs.current = Zn("Move Feed"), Dt.current = {
      mode: "drag",
      index: E,
      startX: g.clientX,
      startY: g.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      scaleX: De / G.width,
      scaleY: Se / G.height,
      activeSnapZone: null
    }, qe(!0);
    const ce = (pe) => {
      if (!Dt.current || Dt.current.mode !== "drag") return;
      const Ee = Dt.current, yt = ln.current || Ct.current;
      if (!yt) return;
      const ft = yt.getBoundingClientRect(), pt = (pe.clientX - Ee.startX) * Ee.scaleX, xe = (pe.clientY - Ee.startY) * Ee.scaleY;
      let mt = Math.round(Ee.initialX + pt), _t = Math.round(Ee.initialY + xe);
      mt = tn(mt, 0, De - Ee.initialW), _t = tn(_t, 0, Se - Ee.initialH);
      const Nt = dt && !pe.altKey;
      let kt = null, Rn = null, qn = null;
      if (Nt) {
        const Ht = pe.clientX - ft.left, Lt = pe.clientY - ft.top, Ft = 32, Pe = Math.round(De / 2), vt = Math.round(Se / 2);
        if (Ht <= Ft ? Lt <= ft.height * 0.22 ? kt = { x: 0, y: 0, width: Pe, height: vt, label: "◰ Top-Left Quarter" } : Lt >= ft.height * 0.78 ? kt = { x: 0, y: vt, width: Pe, height: vt, label: "◱ Bottom-Left Quarter" } : kt = { x: 0, y: 0, width: Pe, height: Se, label: "◧ Left Half (50%)" } : Ht >= ft.width - Ft ? Lt <= ft.height * 0.22 ? kt = { x: Pe, y: 0, width: Pe, height: vt, label: "◲ Top-Right Quarter" } : Lt >= ft.height * 0.78 ? kt = { x: Pe, y: vt, width: Pe, height: vt, label: "◳ Bottom-Right Quarter" } : kt = { x: Pe, y: 0, width: Pe, height: Se, label: "◨ Right Half (50%)" } : Lt <= Ft && Ht >= ft.width * 0.25 && Ht <= ft.width * 0.75 && (kt = { x: 0, y: 0, width: De, height: Se, label: "🗖 Full Canvas Maximize" }), !kt) {
          const Sr = me.filter((it, Mr) => Mr !== Ee.index), Js = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: De, targetX: De - Ee.initialW, guide: 100 },
            { snapTo: Pe, targetX: Pe - Math.round(Ee.initialW / 2), guide: 50 }
          ];
          Sr.forEach((it) => {
            Js.push({ snapTo: it.x, targetX: it.x, guide: it.x / De * 100 }), Js.push({ snapTo: it.x + it.width, targetX: it.x + it.width - Ee.initialW, guide: (it.x + it.width) / De * 100 }), Js.push({ snapTo: it.x + it.width, targetX: it.x + it.width, guide: (it.x + it.width) / De * 100 }), Js.push({ snapTo: it.x, targetX: it.x - Ee.initialW, guide: it.x / De * 100 });
          });
          let Fu = 18;
          Js.forEach((it) => {
            const Mr = Math.abs(mt - it.targetX);
            Mr < Fu && (Fu = Mr, mt = it.targetX, Rn = it.guide);
          });
          const Ll = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Se, targetY: Se - Ee.initialH, guide: 100 },
            { snapTo: vt, targetY: vt - Math.round(Ee.initialH / 2), guide: 50 }
          ];
          Sr.forEach((it) => {
            Ll.push({ snapTo: it.y, targetY: it.y, guide: it.y / Se * 100 }), Ll.push({ snapTo: it.y + it.height, targetY: it.y + it.height - Ee.initialH, guide: (it.y + it.height) / Se * 100 }), Ll.push({ snapTo: it.y + it.height, targetY: it.y + it.height, guide: (it.y + it.height) / Se * 100 }), Ll.push({ snapTo: it.y, targetY: it.y - Ee.initialH, guide: it.y / Se * 100 });
          });
          let Bu = 18;
          Ll.forEach((it) => {
            const Mr = Math.abs(_t - it.targetY);
            Mr < Bu && (Bu = Mr, _t = it.targetY, qn = it.guide);
          });
        }
      }
      Ee.activeSnapZone = kt, Ee.latestX = mt, Ee.latestY = _t, jt(kt), Fe({ vertical: Rn, horizontal: qn }), fn((Ht) => {
        const Lt = [...Ht.keyframes || []], Ft = D < Lt.length ? D : pn;
        if (!Lt[Ft]) return Ht;
        const Pe = [...Lt[Ft].layout.placements || []];
        return Pe[Ee.index] ? (Pe[Ee.index] = { ...Pe[Ee.index], x: mt, y: _t }, Lt[Ft] = {
          ...Lt[Ft],
          layout: { ...Lt[Ft].layout, placements: Pe }
        }, { ...Ht, keyframes: Lt }) : Ht;
      });
    }, Te = () => {
      var pe;
      if (qe(!1), Fe({ vertical: null, horizontal: null }), (pe = Dt.current) != null && pe.activeSnapZone) {
        const Ee = Dt.current.activeSnapZone, yt = Dt.current.index;
        fn((ft) => {
          const pt = [...ft.keyframes || []], xe = D < pt.length ? D : pn;
          if (!pt[xe]) return ft;
          const mt = [...pt[xe].layout.placements || []];
          return mt[yt] ? (mt[yt] = {
            ...mt[yt],
            x: Ee.x,
            y: Ee.y,
            width: Ee.width,
            height: Ee.height
          }, pt[xe] = {
            ...pt[xe],
            layout: { ...pt[xe].layout, placements: mt }
          }, { ...ft, keyframes: pt }) : ft;
        });
      }
      if (Dt.current) {
        const Ee = Dt.current, yt = Ee.initialX, ft = Ee.initialY, pt = Ee.activeSnapZone ? Ee.activeSnapZone.x : Ee.latestX ?? yt, xe = Ee.activeSnapZone ? Ee.activeSnapZone.y : Ee.latestY ?? ft;
        pt !== yt || xe !== ft ? (Al(), I && fn((mt) => (I(mt), mt))) : gs.current = null;
      }
      jt(null), Dt.current = null, window.removeEventListener("mousemove", ce), window.removeEventListener("mouseup", Te);
    };
    window.addEventListener("mousemove", ce), window.addEventListener("mouseup", Te);
  }, Vr = (g, E, D = "br") => {
    if (g.button !== 0) return;
    g.stopPropagation(), g.preventDefault(), Ve(E), zt.current = !0, Xt("custom");
    const X = $l();
    if (!Ct.current) return;
    const G = Ct.current.getBoundingClientRect(), F = me[E];
    if (!F) return;
    gs.current = Zn("Resize Feed");
    const ce = Zt.find((pt) => pt.stationId === F.stationId && pt.displayId === F.displayId), Te = F.sourceWidth || (ce == null ? void 0 : ce.sourceWidth) || 1920, pe = F.sourceHeight || (ce == null ? void 0 : ce.sourceHeight) || 1080, Ee = F.nativeAspectRatio || F.aspectRatio || (ce == null ? void 0 : ce.nativeAspectRatio) || Te / pe || F.width / F.height || 16 / 9;
    Dt.current = {
      mode: "resize",
      corner: D,
      index: E,
      startX: g.clientX,
      startY: g.clientY,
      initialX: F.x,
      initialY: F.y,
      initialW: F.width,
      initialH: F.height,
      sourceWidth: Te,
      sourceHeight: pe,
      nativeAspectRatio: Ee,
      scaleX: De / G.width,
      scaleY: Se / G.height
    }, de(!0);
    const yt = (pt) => {
      if (!Dt.current || Dt.current.mode !== "resize") return;
      const xe = Dt.current, mt = (pt.clientX - xe.startX) * xe.scaleX, _t = (pt.clientY - xe.startY) * xe.scaleY, Nt = pt.ctrlKey || pt.shiftKey || pt.metaKey, kt = xe.nativeAspectRatio > 0 ? xe.nativeAspectRatio : xe.initialW / xe.initialH;
      let Rn = xe.initialX, qn = xe.initialY, Ht = xe.initialW, Lt = xe.initialH;
      if (xe.corner === "br") {
        const Ft = De - xe.initialX, Pe = Se - xe.initialY;
        if (Nt) {
          let vt = Math.max(160, Math.min(Ft, Math.round(xe.initialW + mt))), gt = Math.round(vt / kt);
          gt > Pe && (gt = Pe, vt = Math.round(gt * kt)), gt < 90 && (gt = 90, vt = Math.round(gt * kt)), Ht = vt, Lt = gt;
        } else
          Ht = tn(Math.round(xe.initialW + mt), 160, Ft), Lt = tn(Math.round(xe.initialH + _t), 90, Pe);
      } else if (xe.corner === "bl") {
        const Ft = xe.initialX + xe.initialW, Pe = Se - xe.initialY;
        if (Nt) {
          let vt = Math.max(160, Math.min(Ft, Math.round(xe.initialW - mt))), gt = Math.round(vt / kt);
          gt > Pe && (gt = Pe, vt = Math.round(gt * kt)), gt < 90 && (gt = 90, vt = Math.round(gt * kt)), Ht = vt, Lt = gt, Rn = xe.initialX + xe.initialW - Ht;
        } else
          Ht = tn(Math.round(xe.initialW - mt), 160, Ft), Lt = tn(Math.round(xe.initialH + _t), 90, Pe), Rn = xe.initialX + xe.initialW - Ht;
      } else if (xe.corner === "tr") {
        const Ft = De - xe.initialX, Pe = xe.initialY + xe.initialH;
        if (Nt) {
          let vt = Math.max(160, Math.min(Ft, Math.round(xe.initialW + mt))), gt = Math.round(vt / kt);
          gt > Pe && (gt = Pe, vt = Math.round(gt * kt)), gt < 90 && (gt = 90, vt = Math.round(gt * kt)), Ht = vt, Lt = gt, qn = xe.initialY + xe.initialH - Lt;
        } else
          Ht = tn(Math.round(xe.initialW + mt), 160, Ft), Lt = tn(Math.round(xe.initialH - _t), 90, Pe), qn = xe.initialY + xe.initialH - Lt;
      } else if (xe.corner === "tl") {
        const Ft = xe.initialX + xe.initialW, Pe = xe.initialY + xe.initialH;
        if (Nt) {
          let vt = Math.max(160, Math.min(Ft, Math.round(xe.initialW - mt))), gt = Math.round(vt / kt);
          gt > Pe && (gt = Pe, vt = Math.round(gt * kt)), gt < 90 && (gt = 90, vt = Math.round(gt * kt)), Ht = vt, Lt = gt, Rn = xe.initialX + xe.initialW - Ht, qn = xe.initialY + xe.initialH - Lt;
        } else
          Ht = tn(Math.round(xe.initialW - mt), 160, Ft), Lt = tn(Math.round(xe.initialH - _t), 90, Pe), Rn = xe.initialX + xe.initialW - Ht, qn = xe.initialY + xe.initialH - Lt;
      }
      fn((Ft) => {
        const Pe = [...Ft.keyframes || []], vt = X < Pe.length ? X : pn;
        if (!Pe[vt]) return Ft;
        const gt = [...Pe[vt].layout.placements || []];
        return gt[xe.index] ? (gt[xe.index] = {
          ...gt[xe.index],
          x: Rn,
          y: qn,
          width: Ht,
          height: Lt,
          sourceWidth: xe.sourceWidth,
          sourceHeight: xe.sourceHeight,
          nativeAspectRatio: xe.nativeAspectRatio,
          aspectRatio: xe.nativeAspectRatio
        }, Pe[vt] = {
          ...Pe[vt],
          layout: { ...Pe[vt].layout, placements: gt }
        }, { ...Ft, keyframes: Pe }) : Ft;
      });
    }, ft = () => {
      if (Dt.current) {
        const pt = Dt.current, xe = pt.latestW ?? pt.initialW, mt = pt.latestH ?? pt.initialH;
        xe !== pt.initialW || mt !== pt.initialH ? (Al(), I && fn((_t) => (I(_t), _t))) : gs.current = null;
      }
      de(!1), Dt.current = null, window.removeEventListener("mousemove", yt), window.removeEventListener("mouseup", ft);
    };
    window.addEventListener("mousemove", yt), window.addEventListener("mouseup", ft);
  }, Rl = u.useCallback((g) => {
    const E = me[g];
    if (!E) return;
    const D = Zt.find((Te) => Te.stationId === E.stationId && Te.displayId === E.displayId), X = E.nativeAspectRatio || E.aspectRatio || (D == null ? void 0 : D.nativeAspectRatio) || (E.sourceWidth && E.sourceHeight ? E.sourceWidth / E.sourceHeight : 16 / 9);
    let G = E.width, F = Math.round(G / X);
    E.y + F > Se && (F = Se - E.y, G = Math.round(F * X)), E.x + G > De && (G = De - E.x, F = Math.round(G / X));
    const ce = me.map((Te, pe) => pe === g ? {
      ...Te,
      width: Math.max(160, G),
      height: Math.max(90, F),
      sourceWidth: E.sourceWidth || (D == null ? void 0 : D.sourceWidth) || 1920,
      sourceHeight: E.sourceHeight || (D == null ? void 0 : D.sourceHeight) || 1080,
      nativeAspectRatio: X,
      aspectRatio: X
    } : Te);
    C(ce, "Snap Native Aspect");
  }, [me, Zt, C]), ri = u.useCallback(() => {
    if (At.current.length === 0) return;
    const g = Zn("Redo State");
    An.current.push(g), An.current.length > 50 && An.current.shift();
    const E = At.current.pop();
    E && (fn(E.timeline), I && I(E.timeline), E.aspectId && E.aspectId !== Kt && as(E.aspectId), E.presetId && Xt(E.presetId), E.selectedFeedIndex !== void 0 && Ve(E.selectedFeedIndex), zt.current = !0, Ss((D) => D + 1), Pt(`Undo: ${E.label || "Previous State"}`, "undo", "↺"));
  }, [Zn, I, Kt, Pt]), li = u.useCallback(() => {
    if (An.current.length === 0) return;
    const g = Zn("Undo State");
    At.current.push(g), At.current.length > 50 && At.current.shift();
    const E = An.current.pop();
    E && (fn(E.timeline), I && I(E.timeline), E.aspectId && E.aspectId !== Kt && as(E.aspectId), E.presetId && Xt(E.presetId), E.selectedFeedIndex !== void 0 && Ve(E.selectedFeedIndex), zt.current = !0, Ss((D) => D + 1), Pt(`Redo: ${E.label || "Restored State"}`, "info", "↻"));
  }, [Zn, I, Kt, Pt]), Ou = u.useCallback(() => {
    const E = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(me)),
      keyframes: JSON.parse(JSON.stringify(kn)),
      aspectId: Kt,
      width: De,
      height: Se
    }, ...Ae.filter((D) => D.id !== "preset-quicksave")];
    lt(E);
    try {
      Ip({
        canvasLayoutTimeline: yn,
        selectedAspectId: Kt,
        selectedPresetId: un,
        isFullWidth: Un
      });
    } catch (D) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", D);
    }
    Pt(`State Saved (${De}×${Se} • ${me.length} Feeds)`, "success", "💾");
  }, [me, kn, Kt, De, Se, Ae, lt, yn, un, Un, Pt]);
  u.useEffect(() => {
    const g = () => ri(), E = () => li(), D = () => Ou();
    return window.addEventListener("itb:studio-undo", g), window.addEventListener("itb:studio-redo", E), window.addEventListener("itb:studio-save-now", D), () => {
      window.removeEventListener("itb:studio-undo", g), window.removeEventListener("itb:studio-redo", E), window.removeEventListener("itb:studio-save-now", D);
    };
  }, [ri, li, Ou]);
  const Wp = u.useCallback(() => {
    if (oe) {
      oe();
      return;
    }
    et((g) => {
      const E = !g;
      if (E) {
        r && r(null);
        const D = Ut.current;
        D && D.requestFullscreen && D.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return E;
    });
  }, [oe, r]), zp = u.useCallback(() => {
    const g = f > 0 ? f : d + v, { nextTimeline: E, newIndex: D, isNew: X } = eh(
      yn,
      g,
      (Wn == null ? void 0 : Wn.layout) || {
        width: De,
        height: Se,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(me))
      }
    );
    X ? ($n("Add Keyframe"), fn(E), I && I(E), O && O(D), Pt(`Keyframe #${D + 1} created at ${St(g, p, { includeSeconds: !0 })}`, "success", "💎")) : (O && O(D), Pt(`Jumped to existing Keyframe #${D + 1}`, "info", "💎"));
  }, [f, d, v, Wn, me, De, Se, yn, I, O, p, Pt, $n]);
  u.useCallback(() => {
    if (kn.length <= 1 || pn === 0) {
      Pt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    $n("Delete Keyframe");
    const { nextTimeline: g, success: E, newIndex: D } = Wg(yn, pn);
    E && (fn(g), I && I(g), O && O(D), Pt("Keyframe deleted", "info", "🗑️"));
  }, [kn, pn, yn, I, O, Pt, $n]), u.useCallback((g) => {
    pn !== 0 && ($n("Update Transition Type"), fn((E) => {
      const D = Oc(E, pn, { transitionType: g });
      return I && I(D), D;
    }));
  }, [pn, I, $n]), u.useCallback((g) => {
    pn !== 0 && ($n("Update Transition Duration"), fn((E) => {
      const D = Oc(E, pn, { transitionDurationSec: g });
      return I && I(D), D;
    }));
  }, [pn, I, $n]), u.useEffect(() => {
    const g = (E) => {
      if (!(E.target.tagName === "INPUT" || E.target.tagName === "TEXTAREA" || E.target.isContentEditable)) {
        if (E.key === "Delete" || E.key === "Backspace") {
          Ke >= 0 && me[Ke] && (E.preventDefault(), Ce(Ke));
          return;
        }
        if ((E.code === "Space" || E.key === " ") && S) {
          E.preventDefault(), S((D) => !D);
          return;
        }
        if ((E.key === "k" || E.key === "K") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), zp();
          return;
        }
        if (E.key === "Escape") {
          Qe(!1), He(!1), Oe(!1), Cn(!1), tt(!1), ke(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(E.key)) {
          if (Ke >= 0 && me[Ke]) {
            E.preventDefault(), zt.current = !0, Xt("custom");
            const D = E.shiftKey ? 1 : 10;
            let X = 0, G = 0;
            E.key === "ArrowLeft" && (X = -D), E.key === "ArrowRight" && (X = D), E.key === "ArrowUp" && (G = -D), E.key === "ArrowDown" && (G = D);
            const F = me[Ke], ce = tn(F.x + X, 0, De - F.width), Te = tn(F.y + G, 0, Se - F.height), pe = me.map((Ee, yt) => yt === Ke ? { ...Ee, x: ce, y: Te } : Ee);
            C(pe);
          }
          return;
        }
        if ((E.key === "r" || E.key === "R") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), ut((D) => !D);
          return;
        }
        if ((E.key === "s" || E.key === "S") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), Xe((D) => !D);
          return;
        }
      }
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [Ke, me, Ce, C, ut, Xe]);
  const Du = u.useMemo(() => Bg({
    keyframes: kn,
    currentEpochMs: q,
    currentPlacements: me,
    isEditing: ae || H
  }), [ae, H, kn, q, me]), Hp = u.useMemo(() => Du.map((g, E) => ({ ...g, originalIndex: E })).sort((g, E) => (g.zIndex ?? g.originalIndex) - (E.zIndex ?? E.originalIndex)), [Du]), Xs = me[Ke] || null, { filteredPlaced: Qs, filteredUnplaced: Lo } = u.useMemo(() => {
    const g = (ee || "").toLowerCase(), E = me.map((F, ce) => {
      const Te = F.zIndex ?? ce + 1, pe = Zt.find((Ee) => Ee.stationId === F.stationId && Ee.displayId === F.displayId);
      return {
        type: "placed",
        origIdx: ce,
        placement: F,
        feed: pe,
        stationId: F.stationId,
        displayId: F.displayId,
        label: F.label || (pe == null ? void 0 : pe.label) || `${F.stationId} (${F.displayId})`,
        layerRank: Te,
        isSelected: ce === Ke,
        sourceWidth: F.sourceWidth || (pe == null ? void 0 : pe.sourceWidth) || 1920,
        sourceHeight: F.sourceHeight || (pe == null ? void 0 : pe.sourceHeight) || 1080
      };
    });
    E.sort((F, ce) => ce.layerRank - F.layerRank);
    const D = Zt.filter((F) => !me.some((ce) => ce.stationId === F.stationId && ce.displayId === F.displayId)).map((F) => ({
      type: "unplaced",
      feed: F,
      stationId: F.stationId,
      displayId: F.displayId,
      label: F.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: F.sourceWidth || 1920,
      sourceHeight: F.sourceHeight || 1080
    })), X = g ? E.filter((F) => F.label.toLowerCase().includes(g)) : E, G = g ? D.filter((F) => F.label.toLowerCase().includes(g)) : D;
    return { filteredPlaced: X, filteredUnplaced: G };
  }, [me, Zt, Ke, ee]), Pu = u.useCallback((g, E) => {
    g.stopPropagation(), be(E), g.dataTransfer.effectAllowed = "copyMove", g.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: E.origIdx,
      type: E.type,
      stationId: E.stationId,
      displayId: E.displayId
    }));
  }, []), Kp = u.useCallback((g, E) => {
    g.preventDefault(), g.stopPropagation(), g.dataTransfer.dropEffect = "move";
    const D = g.currentTarget.getBoundingClientRect(), X = D.top + D.height / 2, G = g.clientY < X ? "above" : "below";
    ot((F) => F.index === E && F.position === G ? F : { index: E, position: G });
  }, []), Vp = u.useCallback((g, E) => {
    g.stopPropagation(), ot((D) => D.index === E ? { index: null, position: null } : D);
  }, []), _u = u.useCallback(() => {
    be(null), ot({ index: null, position: null });
  }, []), Yp = u.useCallback((g, E) => {
    g.preventDefault(), g.stopPropagation();
    const D = Ze;
    ot({ index: null, position: null }), be(null);
    const X = g.dataTransfer.getData("text/plain");
    if (X)
      try {
        const G = JSON.parse(X);
        if (G.type === "placed") {
          const F = G.origIdx, ce = Qs.findIndex((pt) => pt.origIdx === F);
          if (ce === -1) return;
          let Te = E;
          if (D.position === "below" && (Te += 1), ce < Te && (Te -= 1), ce === Te) return;
          const pe = [...Qs], [Ee] = pe.splice(ce, 1);
          pe.splice(Te, 0, Ee);
          const yt = pe.length, ft = me.map((pt, xe) => {
            const mt = pe.findIndex((_t) => _t.origIdx === xe);
            return mt !== -1 ? {
              ...pt,
              zIndex: yt - mt
            } : pt;
          });
          C(ft), Ve(Ee.origIdx);
        } else if (G.type === "unplaced") {
          const F = Zt.find((kt) => kt.stationId === G.stationId && kt.displayId === G.displayId);
          if (!F) return;
          const ce = F.nativeAspectRatio || (F.sourceWidth && F.sourceHeight ? F.sourceWidth / F.sourceHeight : 16 / 9), Te = ce >= 1 ? 640 : Math.round(360 * ce), pe = ce >= 1 ? Math.round(640 / ce) : 360, Ee = wt[me.length % wt.length];
          let yt = E;
          D.position === "below" && (yt += 1);
          const ft = {
            stationId: F.stationId,
            displayId: F.displayId,
            label: F.label,
            x: 100 + me.length * 40 % 800,
            y: 80 + me.length * 40 % 500,
            width: Te,
            height: pe,
            sourceWidth: F.sourceWidth || 1920,
            sourceHeight: F.sourceHeight || 1080,
            nativeAspectRatio: ce,
            aspectRatio: ce,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ee,
            shadowEffect: "deep",
            borderRadius: 0
          }, pt = [...me, ft], xe = pt.length - 1, mt = [...Qs];
          mt.splice(yt, 0, { origIdx: xe });
          const _t = mt.length, Nt = pt.map((kt, Rn) => {
            const qn = mt.findIndex((Ht) => Ht.origIdx === Rn);
            return {
              ...kt,
              zIndex: qn !== -1 ? _t - qn : 1
            };
          });
          C(Nt), Ve(xe);
        }
      } catch (G) {
        console.warn("Failed to handle layer drag drop:", G);
      }
  }, [Ze, Qs, me, Zt, C]), Gp = u.useCallback((g) => {
    g.preventDefault();
    const E = g.dataTransfer.getData("text/plain");
    if (!(!E || !Ct.current))
      try {
        const D = JSON.parse(E), X = Ct.current.getBoundingClientRect(), G = g.clientX - X.left, F = g.clientY - X.top, ce = tn(Math.round(G / X.width * De), 0, De - 320), Te = tn(Math.round(F / X.height * Se), 0, Se - 180);
        if (D.type === "unplaced") {
          const pe = Zt.find((Ee) => Ee.stationId === D.stationId && Ee.displayId === D.displayId);
          if (pe) {
            const Ee = pe.nativeAspectRatio || (pe.sourceWidth && pe.sourceHeight ? pe.sourceWidth / pe.sourceHeight : 1.7777777777777777), yt = Ee >= 1 ? 640 : Math.round(360 * Ee), ft = Ee >= 1 ? Math.round(640 / Ee) : 360, pt = me.length > 0 ? Math.max(...me.map((Nt) => Nt.zIndex || 0)) + 1 : 1, xe = wt[me.length % wt.length], mt = {
              stationId: pe.stationId,
              displayId: pe.displayId,
              label: pe.label,
              x: tn(ce, 0, De - yt),
              y: tn(Te, 0, Se - ft),
              width: yt,
              height: ft,
              sourceWidth: pe.sourceWidth || 1920,
              sourceHeight: pe.sourceHeight || 1080,
              nativeAspectRatio: Ee,
              aspectRatio: Ee,
              zIndex: pt,
              rotation: 0,
              borderWidth: 2,
              borderColor: xe,
              shadowEffect: "deep",
              borderRadius: 0
            }, _t = [...me, mt];
            C(_t), Ve(_t.length - 1);
          }
        } else if (D.type === "placed" && D.origIdx !== void 0) {
          const pe = me.map((Ee, yt) => yt === D.origIdx ? {
            ...Ee,
            x: tn(ce, 0, De - Ee.width),
            y: tn(Te, 0, Se - Ee.height)
          } : Ee);
          C(pe), Ve(D.origIdx);
        }
      } catch (D) {
        console.warn("Canvas drop failed:", D);
      }
  }, [Zt, me, C, De, Se]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Ut,
      className: `multicam-viewport-root canvas-grid ${xt ? "fullscreen-grid-active" : ""}`,
      children: [
        (ae || H) && /* @__PURE__ */ s.jsx(
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
        Bn && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Bn.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Bn.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Bn.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Wt, className: `canvas-stage-wrapper ${Un ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          je && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  me.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Qe(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: ee,
                onChange: (g) => Z(g.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Qs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Qs.length })
                ] }),
                Qs.map((g, E) => {
                  const D = Me && Me.type === "placed" && Me.origIdx === g.origIdx, G = Ze.index === E ? Ze.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${g.isSelected ? "is-selected" : ""} ${D ? "is-dragging-row" : ""} ${G}`,
                      draggable: !0,
                      onDragStart: (F) => Pu(F, g),
                      onDragOver: (F) => Kp(F, E),
                      onDragLeave: (F) => Vp(F, E),
                      onDrop: (F) => Yp(F, E),
                      onDragEnd: _u,
                      onClick: () => Ve(g.origIdx),
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
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (F) => F.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => $e(g.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Ye(g.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => Ce(g.origIdx),
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
              Lo.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Lo.length })
                ] }),
                Lo.map((g) => {
                  const E = Me && Me.type === "unplaced" && Me.stationId === g.stationId && Me.displayId === g.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${E ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (D) => Pu(D, g),
                      onDragEnd: _u,
                      onClick: () => ye(g.feed),
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
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (D) => D.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-add-row",
                            onClick: () => ye(g.feed),
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
              Qs.length === 0 && Lo.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => nt("auto"), children: "⊞ ADD ALL FEEDS" }),
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
                  onClick: () => Qe((g) => !g),
                  title: `Feeds & Layers Palette (${me.length}/${Zt.length} on canvas)`,
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: me.length }),
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
                    className: `btn-wing-tool ${ge ? "active" : ""}`,
                    onClick: () => {
                      he((g) => !g), Q(!1);
                    },
                    title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                    ]
                  }
                ),
                ge && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        Xt("auto-grid"), nt("auto-grid"), he(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const g = new Set((t && t.length > 0 ? t : n).map((X) => X.id)), E = (me || []).filter((X) => g.has(X.stationId)), D = (t && t.length > 0 ? t : n).filter((X) => !E.some((G) => G.stationId === X.id));
                          return E.length > 0 ? E.length + D.length : dn.length;
                        })() })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "1x1" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1x1"), nt("1x1"), he(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "1x2" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1x2"), nt("1x2"), he(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "2x2" ? "active" : ""}`,
                      onClick: () => {
                        Xt("2x2"), nt("2x2"), he(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "1+3-pip" ? "active" : ""}`,
                      onClick: () => {
                        Xt("1+3-pip"), nt("1+3-pip"), he(!1);
                      },
                      children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${un === "hero-stacked" ? "active" : ""}`,
                      onClick: () => {
                        Xt("hero-stacked"), nt("hero-stacked"), he(!1);
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
                    className: `btn-wing-tool ${$ ? "active" : ""}`,
                    onClick: () => {
                      Q((g) => !g), he(!1);
                    },
                    title: `Aspect Ratio: ${Kt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Kt })
                    ]
                  }
                ),
                $ && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  is.map((g) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Kt === g.id ? "active" : ""}`,
                      onClick: () => {
                        ue(g.id), Q(!1);
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
                  className: `btn-wing-tool ${Un ? "highlight-emerald" : "highlight-cyan"}`,
                  onClick: Sn,
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
                  className: `btn-wing-tool ${dt ? "active" : ""}`,
                  onClick: () => Xe((g) => !g),
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
                  className: `btn-wing-tool ${Ge ? "active" : ""}`,
                  onClick: () => ut((g) => !g),
                  title: Ge ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: ri,
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
                  onClick: li,
                  disabled: An.current.length === 0,
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
                  Ct.current = g, ln.current = g;
                },
                className: `canvas-master-frame-16-9 ${Un ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: ct.width > 180 ? `${ct.width}px` : "100%",
                  height: ct.height > 100 ? `${ct.height}px` : "auto",
                  aspectRatio: `${De} / ${Se}`
                },
                onMouseMove: Ao,
                onMouseLeave: $o,
                onDragOver: (g) => {
                  g.preventDefault(), g.dataTransfer.dropEffect = "copy";
                },
                onDrop: Gp,
                onClick: () => Tt(!1),
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
                        top: `${ht.y / Se * 100}%`,
                        width: `${ht.width / De * 100}%`,
                        height: `${ht.height / Se * 100}%`,
                        zIndex: 9990,
                        pointerEvents: "none"
                      },
                      children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: ht.label })
                      ] })
                    }
                  ),
                  Ge && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${De}×${Se}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Mt.isInside ? `${Mt.x},${Mt.y}` : "px" }) }),
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
                          To.map((g) => g.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "0", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: g.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: g.val })
                          ] }, `rx-${g.val}`) : g.isMed ? /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "8", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${g.val}`) : /* @__PURE__ */ s.jsx("line", { x1: g.val, y1: "13", x2: g.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${g.val}`)),
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
                        viewBox: `0 0 20 ${Se}`,
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
                          jr.map((g) => g.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                            /* @__PURE__ */ s.jsx("line", { x1: "0", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                            /* @__PURE__ */ s.jsx("text", { x: "2", y: g.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: g.val })
                          ] }, `ry-${g.val}`) : g.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${g.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: g.val, x2: "18", y2: g.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${g.val}`)),
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
                  fe.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${fe.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  fe.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${fe.horizontal}%`,
                        height: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  me.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                    /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                    /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                    /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Qe(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => nt("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Hp.map((g) => {
                    var Ft;
                    const E = g.originalIndex, D = Ke === E, X = ae && Ke === E, G = H && Ke === E, F = (n.length > 0 ? n : t).find(
                      (Pe) => {
                        var vt, gt, Sr, Js;
                        return Pe.id === g.stationId || ((vt = Pe.hostname) == null ? void 0 : vt.toLowerCase()) === ((gt = g.stationId) == null ? void 0 : gt.toLowerCase()) || ((Sr = Pe.id) == null ? void 0 : Sr.toLowerCase()) === ((Js = g.stationId) == null ? void 0 : Js.toLowerCase());
                      }
                    ), ce = Zt.find((Pe) => Pe.stationId === g.stationId && Pe.displayId === g.displayId), Te = F || {
                      id: g.stationId,
                      hostname: (ce == null ? void 0 : ce.stationHostname) || g.stationHostname || g.stationId,
                      displayName: (ce == null ? void 0 : ce.stationName) || g.label || g.stationId,
                      displays: ce ? [{ displayId: ce.displayId, width: ce.sourceWidth, height: ce.sourceHeight }] : []
                    }, pe = (Te == null ? void 0 : Te.displays) || ((Ft = Te == null ? void 0 : Te.topology) == null ? void 0 : Ft.displays) || [], Ee = me.filter(
                      (Pe) => Pe.stationId === g.stationId || Te && (Pe.stationId === Te.id || Pe.stationId === Te.hostname)
                    ), yt = pe.length > 1 && Ee.length >= pe.length, ft = g.borderColor || wt[E % wt.length], pt = g.borderWidth !== void 0 ? g.borderWidth : 2, xe = g.rotation || 0, mt = g.shadowEffect || "deep", _t = g.borderRadius || 0, Nt = g.x / De * 100, kt = g.y / Se * 100, Rn = g.width / De * 100, qn = g.height / Se * 100, Ht = Kg(mt, D, ft);
                    g.y < 50, g.x < 100, g.x + g.width > De - 100;
                    const Lt = g.zIndex !== void 0 ? g.zIndex : E + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${D ? "is-selected" : ""} ${X ? "is-dragging" : ""} ${G ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${Nt}%`,
                          top: `${kt}%`,
                          width: `${Rn}%`,
                          height: `${qn}%`,
                          zIndex: Lt * 10 + (X ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${pt}px solid ${ft}`,
                          borderRadius: `${_t}px`,
                          boxShadow: Ht,
                          opacity: g.opacity !== void 0 ? g.opacity : 1,
                          pointerEvents: g.opacity !== void 0 && g.opacity < 0.1 ? "none" : "auto",
                          cursor: X ? "grabbing" : "grab",
                          transition: X || G ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Pe) => Cr(Pe, E),
                        onContextMenu: (Pe) => {
                          Pe.preventDefault(), Pe.stopPropagation(), Ve(E), Tt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Pe) => Cr(Pe, E),
                              onDoubleClick: () => at(E),
                              title: "Click and drag to move window (Double-click to expand 1x1)",
                              children: [
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                  /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                  /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                  /* @__PURE__ */ s.jsx("span", { children: g.label || `${Te.displayName || g.stationId} (${g.displayId})` })
                                ] }),
                                /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                  Math.round(g.width),
                                  "×",
                                  Math.round(g.height),
                                  " (",
                                  Qr(g.width, g.height),
                                  ") @ (",
                                  Math.round(g.x),
                                  ",",
                                  Math.round(g.y),
                                  ")",
                                  xe !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    xe,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Lt}`, children: [
                                  "#$",
                                  Lt
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${D && Rt ? "active" : ""}`,
                                    onClick: (Pe) => {
                                      Pe.stopPropagation(), Ve(E), Tt((vt) => !vt || Ke !== E);
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
                                  transform: xe ? `rotate(${xe}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: X ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Og,
                                  {
                                    station: Te,
                                    isSolo: !1,
                                    currentEpochMs: q,
                                    timeMode: p,
                                    isPlaying: y,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: M,
                                    outPointMs: k,
                                    setPlayheadMs: x,
                                    globalGaps: m,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: T,
                                    playbackSpeed: w,
                                    activeAudioStationId: Le,
                                    onSoloAudio: _e,
                                    directorPlan: j || (Te == null ? void 0 : Te.directorPlan),
                                    isAutoDirectorEnabled: i ? i[Te.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: g.displayId,
                                    onSelectDisplayId: (Pe) => {
                                      const vt = me.map((gt, Sr) => Sr === E ? { ...gt, displayId: Pe } : gt);
                                      C(vt);
                                    },
                                    areAllDisplaysPlaced: yt,
                                    slotIndex: E,
                                    borderColor: ft
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (Pe) => Cr(Pe, E),
                                onDoubleClick: () => at(E),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          D && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Pe) => Vr(Pe, E, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Qr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Pe) => Vr(Pe, E, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Qr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Pe) => Vr(Pe, E, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Qr(g.sourceWidth, g.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Pe) => Vr(Pe, E, "br"),
                                title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Qr(g.sourceWidth, g.sourceHeight)})`,
                                children: "↘"
                              }
                            )
                          ] })
                        ]
                      },
                      `feed-${g.stationId}-${g.displayId}-${E}`
                    );
                  }),
                  !K && Rt && Ke !== null && Xs && (() => {
                    const g = Xs, E = Ke, D = g.borderColor || wt[E % wt.length], X = g.borderWidth !== void 0 ? g.borderWidth : 2, G = g.rotation || 0, F = g.shadowEffect || "deep", ce = g.zIndex !== void 0 ? g.zIndex : E + 1, Te = g.x / De * 100, pe = g.width / De * 100, Ee = Te + pe / 2;
                    let yt = `${Ee}%`, ft = "translateX(-50%)";
                    Ee < 28 ? (yt = `${Math.max(1, Te)}%`, ft = "none") : Ee > 72 && (yt = `${Math.min(99, Te + pe)}%`, ft = "translateX(-100%)");
                    const pt = g.y + g.height + 8;
                    let xe;
                    pt + 45 > Se ? xe = `${Math.max(20, (g.y + g.height - 44) / Se * 100)}%` : xe = `${pt / Se * 100}%`;
                    const mt = (n.length > 0 ? n : t).find(
                      (Nt) => {
                        var kt, Rn;
                        return Nt.id === g.stationId || ((kt = Nt.hostname) == null ? void 0 : kt.toLowerCase()) === ((Rn = g.stationId) == null ? void 0 : Rn.toLowerCase());
                      }
                    ), _t = mt ? mt.id : g.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: yt,
                          top: xe,
                          transform: ft,
                          zIndex: 99999
                        },
                        onMouseDown: (Nt) => Nt.stopPropagation(),
                        onClick: (Nt) => Nt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${g.label || _t} • Layer #${ce}`, children: [
                            "🎛️ #$",
                            ce
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool color-swatch-trigger",
                                onClick: () => tt((Nt) => !Nt),
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
                            Re && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Hg.map((Nt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${D === Nt ? "is-active" : ""}`,
                                style: { backgroundColor: Nt === "transparent" ? "#1E293B" : Nt },
                                onClick: () => {
                                  Be({ borderColor: Nt }), tt(!1);
                                },
                                title: Nt === "transparent" ? "No Border (Transparent)" : `Border Color: ${Nt}`
                              },
                              Nt
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => {
                                const Nt = [0, 2, 4, 8], kt = Nt[(Nt.indexOf(X) + 1) % Nt.length];
                                Be({ borderWidth: kt });
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
                              className: `btn-mini-tool ${F !== "none" ? "highlight-glow" : ""}`,
                              onClick: () => {
                                const Nt = ["none", "deep", "glow-cyan", "glow-emerald"], kt = Nt[(Nt.indexOf(F) + 1) % Nt.length];
                                Be({ shadowEffect: kt });
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
                                onClick: () => $e(E),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Ye(E),
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
                              title: `Rotate: Step 90° clockwise (Current: ${G}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => Rl(E),
                              title: `Snap to Native Recorded Aspect (${Qr(g.sourceWidth, g.sourceHeight)})`,
                              children: "📐 NATIVE"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => at(E),
                              title: "1x1 Focus Mode (Double-click window to toggle)",
                              children: "⛶ 1x1"
                            }
                          ),
                          l && /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool",
                              onClick: () => l(_t, g.displayId),
                              title: "Deep Forensic Multi-Angle Spotlight",
                              children: "🔍"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-del-feed",
                              onClick: () => Ce(E),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Ve(null),
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
                      currentEpochMs: q,
                      position: J,
                      onPositionChange: (g) => {
                        Y(g);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", g);
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
                    className: `btn-wing-tool ${ze ? "active" : ""}`,
                    onClick: () => He((g) => !g),
                    title: `Saved Presets Library (${Ae.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Ae.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                ze && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => He(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Ae.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Ae.map((g) => {
                    var E;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      on(g), He(!1);
                    }, children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                        /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: g.name }),
                        /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                          ((E = g.placements) == null ? void 0 : E.length) || 0,
                          " screens • ",
                          g.dateStr
                        ] })
                      ] }),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-del-preset",
                          onClick: (D) => Vt(g.id, D),
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
                  onClick: mn,
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
                    return (g = se.current) == null ? void 0 : g.click();
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
                  ref: se,
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
                    const g = dn.length > 0 ? dn : Zt, E = qs(g, De, Se), D = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: De,
                            height: Se,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: E
                          }
                        }
                      ]
                    };
                    fn(D), I && I(D), Ve(0);
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
                  className: `btn-wing-tool ${xt ? "active" : ""}`,
                  onClick: Wp,
                  title: "Fullscreen Canvas Grid (F)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: xt ? "⤓" : "⛶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: xt ? "EXIT" : "FULL" })
                  ]
                }
              )
            ] })
          ] }),
          " "
        ] }) }),
        " ",
        ie && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => ke(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (g) => g.stopPropagation(), children: [
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
                value: W,
                onChange: (g) => te(g.target.value),
                autoFocus: !0,
                onKeyDown: (g) => {
                  g.key === "Enter" && bt();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              me.length,
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
const Di = [0.5, 1, 1.25, 1.5, 2, 4];
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
  hasGridPlacements: v = !0,
  onStepFrameForward: f,
  onStepFrameBackward: p,
  playbackSpeed: y = 1,
  onChangeSpeed: S,
  onSetInPoint: M,
  onSetOutPoint: _
}) {
  const [k, x] = u.useState(() => vl()), { volume: m, isMuted: T } = k, w = !!(v && d > 0);
  u.useEffect(() => {
    const V = (I) => {
      I.detail && x(I.detail);
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []);
  const b = u.useCallback((V, I, B) => {
    const O = {
      volume: typeof V == "number" ? V : m,
      isMuted: typeof I == "boolean" ? I : T,
      channelMode: B || k.channelMode || "both"
    };
    x(O), Tg(O);
  }, [m, T, k.channelMode]), h = (V) => {
    V == null || V.stopPropagation(), w && n(!t);
  }, A = (V) => {
    if (V == null || V.stopPropagation(), !w || !S) return;
    const I = Di.indexOf(y), B = I === -1 ? 1 : (I + 1) % Di.length;
    S(Di[B]);
  }, j = (V) => {
    V == null || V.stopPropagation(), T ? b(m === 0 ? 0.5 : m, !1) : b(m, !0);
  }, N = (V) => {
    V.stopPropagation();
    const I = parseFloat(V.target.value);
    I === 0 ? b(0, !0) : b(I, !1);
  }, P = (V) => {
    const I = u.useRef(null), B = u.useRef(null), O = u.useRef(0), K = u.useCallback(() => {
      I.current && clearTimeout(I.current), B.current && clearInterval(B.current), I.current = null, B.current = null;
    }, []), R = u.useCallback((q = 1) => {
      if (n && n(!1), a) {
        const J = 33 * q;
        a((Y) => {
          const Le = V === "forward" ? Y + J : Y - J;
          return Math.max(0, Math.min(d, Le));
        });
      } else V === "forward" && f ? f() : V === "backward" && p && p();
    }, [V]), oe = u.useCallback((q) => {
      q.preventDefault(), q.stopPropagation(), w && (K(), R(1), O.current = performance.now(), I.current = setTimeout(() => {
        B.current = setInterval(() => {
          const J = performance.now() - O.current, Y = J > 2500 ? 4 : J > 1e3 ? 2 : 1;
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
  }, U = P("backward"), L = P("forward"), z = (V) => {
    V.stopPropagation(), w && (n && n(!1), a && a(i));
  }, le = (V) => {
    V.stopPropagation(), w && (n && n(!1), a && a(c));
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
            onClick: (V) => {
              V.stopPropagation(), M == null || M();
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
              onClick: z,
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
              ...U,
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
              onClick: le,
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
            onClick: (V) => {
              V.stopPropagation(), _ == null || _();
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
              onClick: j,
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
    const m = new AbortController(), T = Math.max(0, l + a - fa), w = l + a + i + fa;
    p(!0);
    const b = y.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${T}&endEpoch=${w}`;
      return fetch(A, { signal: m.signal }).then((j) => j.ok ? j.json() : []).then((j) => (Array.isArray(j) ? j : []).map((N) => ({
        ...N,
        stationId: h.id,
        stationName: h.name
      }))).catch((j) => {
        if (j.name !== "AbortError") return [];
        throw j;
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
    const m = l + a, T = m + i, w = [...S].sort((j, N) => j.epochMs - N.epochMs), b = [];
    let h = null, A = -999;
    for (const j of w) {
      const N = j.epochMs + fa;
      if (N < m || N > T)
        continue;
      const P = N - l, U = (P - a) / i * c;
      if (h && U - A < Xg) {
        h.events.push(j), h.endOffsetMs = P, h.endEpochMs = N;
        const L = new Set(h.events.map((z) => z.stationName || "Workstation"));
        h.isMultiStation = L.size > 1, h.stationCount = L.size, A = U;
      } else {
        const L = (P - a) / i * 100;
        h = {
          id: `kc_${j.epochMs}_${b.length}`,
          startOffsetMs: P,
          endOffsetMs: P,
          startEpochMs: N,
          endEpochMs: N,
          pct: L,
          events: [j],
          isMultiStation: !1,
          stationCount: 1
        }, b.push(h), A = U;
      }
    }
    return b;
  }, [S, l, a, i, c]);
  function _(m) {
    if (!m.events.length) return "";
    if (m.events.length === 1)
      return zl(m.events[0].keyCombination);
    const T = m.events.find((h) => h.keyCombination.includes("+"));
    if (T) {
      const h = zl(T.keyCombination);
      return m.events.length > 1 ? `${h} (+${m.events.length - 1})` : h;
    }
    const w = zl(m.events[0].keyCombination);
    return m.events.every((h) => zl(h.keyCombination) === w) ? `${w} ×${m.events.length}` : `${w} (+${m.events.length - 1})`;
  }
  function k(m, T = "LOCAL") {
    return St(m, T);
  }
  function x(m) {
    const T = [];
    for (const w of m) {
      const b = zl(w.keyCombination);
      T.length && T[T.length - 1].key === b ? T[T.length - 1].count++ : T.push({ key: b, count: 1 });
    }
    return T;
  }
  return M.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: M.map((m) => {
    const T = m.events.length, w = T > 1, b = m.isMultiStation, h = _(m), A = k(m.startEpochMs, o), j = m.pct < 10 ? "edge-left" : m.pct > 90 ? "edge-right" : "", N = {};
    return m.events.forEach((P) => {
      const U = P.stationName || e || "Workstation";
      N[U] || (N[U] = []), N[U].push(P);
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
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${j}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: b ? `MULTICAM KEYSTROKES (${m.stationCount} WORKSTATIONS • ${T} EVT)` : w ? `KEYSTROKE BURST (${T})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([P, U]) => {
              const L = x(U);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: P }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    U.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  L.slice(0, 6).map((z, le) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    z.key,
                    z.count > 1 ? ` ×${z.count}` : ""
                  ] }, le)),
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
const Jg = u.memo(Qg), Pi = [
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
  earliestMediaMs: v = null,
  movieBoundaries: f = null,
  stationHostname: p = "",
  activeStationName: y = "",
  showKeystrokes: S = !0,
  keystrokes: M = []
}) {
  const _ = u.useRef(null), [k, x] = u.useState(1e3);
  u.useEffect(() => {
    if (!_.current) return;
    const R = new ResizeObserver((oe) => {
      for (let q of oe)
        q.contentRect.width > 50 && x(q.contentRect.width);
    });
    return R.observe(_.current), () => R.disconnect();
  }, []);
  const m = u.useCallback((R) => !r || r <= 0 ? "0%" : `${(R - n) / r * 100}%`, [r, n]), T = u.useCallback((R) => {
    const q = (R - n) / r * 100;
    return q >= -5 && q <= 105;
  }, [n, r]), w = (R) => {
    if (!_.current) return;
    const oe = _.current.getBoundingClientRect(), q = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), J = Math.round(n + q / oe.width * r);
    a && a(J);
  }, b = () => {
    a && a(null);
  }, h = (R) => {
    if (!_.current || !i) return;
    const oe = _.current.getBoundingClientRect(), q = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), J = Math.round(n + q / oe.width * r);
    i(Math.max(0, Math.min(l, J)));
  }, A = u.useMemo(() => {
    const R = Math.max(3, Math.floor(k / 95)), oe = r / R;
    for (let q of Pi)
      if (q >= oe) return q;
    return Pi[Pi.length - 1];
  }, [r, k]), j = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const R = e + n, oe = R + r, q = t === "LOCAL" ? Ws(R).offsetMin * 60 * 1e3 : 0, J = R + q, Y = Math.ceil(J / A) * A, Le = [];
    for (let _e = Y; _e <= oe + q; _e += A) {
      const je = _e - q, Qe = (je - R) / r * 100;
      Qe >= 0 && Qe <= 100 && Le.push({
        epoch: je,
        pct: Qe,
        label: St(je, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return Le;
  }, [e, n, r, A, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const R = e + n, oe = R + r;
    return Sp(R, oe).map((q) => ({
      ...q,
      pct: (q.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), P = u.useMemo(() => {
    if (!r || !e) return [];
    const R = e + n, oe = R + r, q = t === "UTC", J = [], Y = q ? 0 : Ws(R).offsetMin * 60 * 1e3, Le = R + Y, _e = oe + Y, je = new Date(Le);
    for (je.setUTCHours(0, 0, 0, 0), je.getTime() < Le && je.setUTCDate(je.getUTCDate() + 1); je.getTime() <= _e; ) {
      const Me = je.getTime() - Y, be = (Me - R) / r * 100, Ze = String(je.getUTCDate()).padStart(2, "0"), ot = Zg[je.getUTCMonth()], ie = `${Ze} ${ot}`;
      J.push({ epoch: Me, pct: be, dateLabel: ie }), je.setUTCDate(je.getUTCDate() + 1);
    }
    return J;
  }, [e, n, r, t]), {
    globalFirstMs: U = v,
    globalLastMs: L = null,
    currentFirstMs: z = null,
    currentLastMs: le = null
  } = f || { globalFirstMs: v }, ne = U !== null && z !== null && Math.abs(U - z) < 1e3, V = L !== null && le !== null && Math.abs(L - le) < 1e3, I = u.useMemo(() => {
    const R = [];
    return ne ? T(U) && R.push({
      id: "first-combined",
      ms: U,
      pct: m(U),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${St(e + U, t)} (Click to jump)`
    }) : (T(U) && R.push({
      id: "first-global",
      ms: U,
      pct: m(U),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${St(e + U, t)} (Click to jump)`
    }), T(z) && R.push({
      id: "first-current",
      ms: z,
      pct: m(z),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${St(e + z, t)} (Click to jump)`
    })), V ? T(L) && R.push({
      id: "last-combined",
      ms: L,
      pct: m(L),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${St(e + L, t)} (Click to jump)`
    }) : (T(le) && R.push({
      id: "last-current",
      ms: le,
      pct: m(le),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${St(e + le, t)} (Click to jump)`
    }), T(L) && R.push({
      id: "last-global",
      ms: L,
      pct: m(L),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${St(e + L, t)} (Click to jump)`
    })), R;
  }, [
    U,
    L,
    z,
    le,
    ne,
    V,
    e,
    t,
    y,
    T,
    m
  ]), B = u.useMemo(() => {
    const R = [];
    return typeof c == "number" && T(c) && R.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: m(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${St(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && T(d) && R.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: m(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${St(e + d, t, { includeSeconds: !0 })} (Click to seek)`
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
          j.map((R) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${R.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: R.label })
          ] }, R.epoch)),
          S && /* @__PURE__ */ s.jsx(
            Jg,
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
          B.map((R) => /* @__PURE__ */ s.jsxs(
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
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: St(e + o, t, { includeSeconds: !0 }) }),
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
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, p] = u.useState(""), [y, S] = u.useState(""), M = u.useCallback((j) => {
    if (!j || isNaN(j) || j <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const L = new Date(j);
      return {
        timeStr: `${Hn(L.getUTCHours())}:${Hn(L.getUTCMinutes())}:${Hn(L.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: P } = Ws(j), U = new Date(j + N * 60 * 1e3);
    return {
      timeStr: `${Hn(U.getUTCHours())}:${Hn(U.getUTCMinutes())}:${Hn(U.getUTCSeconds())}`,
      zoneLabel: P
    };
  }, [t]), _ = u.useCallback((j) => {
    if (!j || j < 0) return "00:00:00";
    const N = Math.floor(j / 1e3), P = Math.floor(N / 3600), U = Math.floor(N % 3600 / 60), L = N % 60;
    return `${Hn(P)}:${Hn(U)}:${Hn(L)}`;
  }, []), k = u.useMemo(() => M(e + r), [M, e, r]), x = u.useMemo(() => M(e + o), [M, e, o]), m = u.useMemo(() => _(Math.max(0, o - r)), [_, r, o]), T = u.useCallback((j, N) => {
    if (!j || !j.trim()) return N;
    const U = j.trim().split(" ")[0].split(":").map(Number);
    if (U.length < 2 || U.some(isNaN)) return N;
    const [L, z, le = 0] = U;
    if (t === "UTC") {
      const Y = new Date(e);
      Y.setUTCHours(L, z, le, 0);
      let Le = Y.getTime();
      for (; Le < e; ) Le += 864e5;
      for (; Le > e + n + 1e3; ) Le -= 864e5;
      const _e = Le - e;
      return isNaN(_e) ? N : Math.max(0, Math.min(n, _e));
    }
    const { offsetMin: ne } = Ws(e), V = new Date(e + ne * 6e4), I = V.getUTCFullYear(), B = V.getUTCMonth(), O = V.getUTCDate(), K = `${I}-${Hn(B + 1)}-${Hn(O)}`, R = `${Hn(L)}:${Hn(z)}:${Hn(le)}`, oe = Ba(K, R);
    let q;
    if (oe.isAmbiguous) {
      const Y = e + N, Le = Math.abs(oe.firstOccurrenceEpoch - Y), _e = Math.abs(oe.secondOccurrenceEpoch - Y);
      q = Le <= _e ? oe.firstOccurrenceEpoch : oe.secondOccurrenceEpoch;
    } else {
      const Y = Date.UTC(I, B, O, L, z, le), { offsetMin: Le } = Ws(Y - ne * 6e4);
      q = Y - Le * 6e4;
    }
    for (; q < e; ) q += 864e5;
    for (; q > e + n + 1e3; ) q -= 864e5;
    const J = q - e;
    return isNaN(J) ? N : Math.max(0, Math.min(n, J));
  }, [e, t, n]), w = () => {
    p(k.timeStr), c(!0);
  }, b = () => {
    if (c(!1), !f || !f.trim() || f.trim() === k.timeStr)
      return;
    const j = T(f.trim(), r);
    j !== null && !isNaN(j) && j < o && l(j);
  }, h = () => {
    S(x.timeStr), v(!0);
  }, A = () => {
    if (v(!1), !y || !y.trim() || y.trim() === x.timeStr)
      return;
    const j = T(y.trim(), o);
    j !== null && !isNaN(j) && j > r && a(j);
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
          onChange: (j) => p(j.target.value),
          onBlur: b,
          onKeyDown: (j) => {
            j.key === "Enter" && b(), j.key === "Escape" && c(!1);
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
          onChange: (j) => S(j.target.value),
          onBlur: A,
          onKeyDown: (j) => {
            j.key === "Enter" && A(), j.key === "Escape" && v(!1);
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: m })
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
  onStartDragMinimap: v
}) {
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, p - f), S = Math.max(0, Math.min(100, l / r * 100)), M = Math.max(0, Math.min(100 - S, o / r * 100)), _ = S + M, k = a > 1.05, x = 7, m = y >= 10, T = y >= 16, w = m, b = T, h = w && Math.abs(S - f) < x, A = k && M >= 12 && !h, j = b && Math.abs(_ - p) < x, N = k && M >= 12 && !j;
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
              w && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: St(t + i, n) }),
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: St(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${M}%` },
            children: [
              A && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: St(t + l, n) }),
              N && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: St(t + l + o, n) })
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
        title: `Jump playhead to first media (${St(i + e, c)})`,
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
        title: `Jump playhead to last media (${St(i + t, c)})`,
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
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), Nl = Math.max(0, Nl - 1), Zr.delete(t), Lp());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, sx);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(p, { signal: a });
    if (y.ok && y.status !== 204) {
      const S = await y.blob();
      if (S && S.size > 1500) {
        const M = URL.createObjectURL(S);
        if (As.size >= rx) {
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
        _s = _s.filter((v) => v.key !== a), Zr.delete(a), c(null);
      }, { once: !0 }), _s.push(d), Lp();
    });
    return Zr.set(a, i), i;
  },
  clear() {
    As.forEach((e) => URL.revokeObjectURL(e)), As.clear(), Zr.clear(), _s = [], Nl = 0;
  }
}, ax = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ts = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Or = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
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
  directorSegments: v = [],
  isAutoDirectorEnabled: f = !1,
  showDirectorCoverage: p = !1,
  stepperSegments: y = null,
  isCanvasSummary: S = !1
}) {
  const [M, _] = u.useState({}), k = u.useRef(M);
  k.current = M;
  const x = u.useMemo(() => ax(l), [l]), m = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: P } = x, U = [], L = o + r, z = L + l, le = L - N, ne = z + N, V = [...n].sort((R, oe) => ts(R) - ts(oe)), I = S ? c || [] : [...c || [], ...d || []], B = (R, oe) => !I || I.length === 0 ? !1 : I.some((q) => {
      const J = q.startEpochMs ?? q.startEpoch ?? q.start ?? 0, Y = q.endEpochMs ?? q.endEpoch ?? q.end ?? 0;
      return Y <= J ? !1 : Math.max(R, J) < Math.min(oe, Y);
    }), O = o + a, K = o + i;
    if (V.forEach((R, oe) => {
      const q = Math.round(ts(R)), J = Math.round(Or(R));
      if (J <= q) return;
      const Y = Math.max(q, O), Le = Math.min(J, K);
      if (Le <= Y) return;
      const _e = Math.max(Y, le), je = Math.min(Le, ne);
      if (je <= _e) return;
      const Qe = Math.floor(_e / N) * N;
      for (let Me = Qe; Me < je; Me += N) {
        const be = Me + N, Ze = Math.max(Y, Me), ot = Math.min(Le, be);
        ot > Ze && !B(Ze, ot) && U.push({
          key: `${e}_${t}_${Ze}_${ot}_${P}`,
          sIdx: oe,
          startEpoch: Ze,
          endEpoch: ot,
          framesPerTile: P,
          displayId: t
        });
      }
    }), U.length > 20) {
      const R = o + r + l / 2;
      U.sort((oe, q) => {
        const J = Math.abs((oe.startEpoch + oe.endEpoch) / 2 - R), Y = Math.abs((q.startEpoch + q.endEpoch) / 2 - R);
        return J - Y;
      }), U.length = 20, U.sort((oe, q) => oe.startEpoch - q.startEpoch);
    }
    return U;
  }, [n, o, e, t, r, l, x, a, i, d, c]);
  u.useEffect(() => {
    if (m.length === 0) return;
    let N = !0;
    const P = new AbortController(), U = [], L = {};
    let z = !1;
    m.forEach((O) => {
      const K = nh.get(e, O.startEpoch, O.endEpoch, O.framesPerTile, t);
      K ? k.current[O.key] !== K && (L[O.key] = K, z = !0) : U.push(O);
    });
    const le = new Set(m.map((O) => O.key)), ne = k.current, V = {};
    let I = !1;
    if (Object.keys(ne).forEach((O) => {
      le.has(O) ? V[O] = ne[O] : I = !0;
    }), z || I) {
      const O = { ...V, ...L };
      k.current = O, _(O);
    }
    if (U.length === 0) return () => {
      N = !1;
    };
    const B = setTimeout(() => {
      U.forEach((O) => {
        nh.fetchTile(e, O.startEpoch, O.endEpoch, O.framesPerTile, P.signal, t).then((K) => {
          N && K && (k.current[O.key] = K, _((R) => ({ ...R, [O.key]: K })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(B), P.abort();
    };
  }, [m, e, t]);
  const T = (a - r) / l * 100, w = (i - r) / l * 100, b = u.useMemo(() => {
    if (m.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return m.map((U) => {
      const L = U.startEpoch - o, z = U.endEpoch - o;
      if (z <= N || L >= P) return null;
      const le = Math.max(N, L), ne = Math.min(P, z);
      return {
        key: U.key,
        spriteUrl: M[U.key] || null,
        leftPct: (le - N) / l * 100,
        widthPct: (ne - le) / l * 100
      };
    }).filter(Boolean);
  }, [m, o, r, l, M]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return n.map((U, L) => {
      const z = Math.round(ts(U)) - o, le = Math.round(Or(U)) - o;
      if (le <= N || z >= P) return null;
      const ne = Math.max(N, z), V = Math.min(P, le);
      return {
        id: L,
        leftPct: (ne - N) / l * 100,
        widthPct: (V - ne) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), A = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((B, O) => ts(B) - ts(O)), P = [], U = r, L = r + l, z = o + U, le = o + L, ne = o + (a !== void 0 ? a : U), V = o + (i !== void 0 ? i : L);
    if (N.length > 0) {
      const B = ts(N[0]);
      B > z && P.push({ startEpoch: z, endEpoch: B });
    } else l > 0 && P.push({ startEpoch: z, endEpoch: le });
    for (let B = 0; B < N.length - 1; B++) {
      const O = Or(N[B]), K = ts(N[B + 1]);
      K - O > 1e3 && P.push({ startEpoch: O, endEpoch: K });
    }
    if (N.length > 0) {
      const B = Or(N[N.length - 1]);
      B < le && P.push({ startEpoch: B, endEpoch: le });
    }
    const I = [];
    return c && c.length > 0 && c.forEach((B, O) => {
      const K = Math.max(B.startEpochMs ?? B.StartEpochMs, ne), R = Math.min(B.endEpochMs ?? B.EndEpochMs, V);
      if (R > K && R > z && K < le) {
        const oe = Math.max(z, K), q = Math.min(le, R), J = (q - o - (oe - o)) / l * 100;
        J > 0 && I.push({
          id: `global-${O}`,
          type: "global",
          startEpoch: oe,
          endEpoch: q,
          leftPct: (oe - o - U) / l * 100,
          widthPct: J,
          durationSec: Math.round((R - K) / 1e3)
        });
      }
    }), S || P.forEach((B, O) => {
      let K = [B];
      c && c.length > 0 && c.forEach((R) => {
        const oe = Math.max(R.startEpochMs ?? R.StartEpochMs, ne), q = Math.min(R.endEpochMs ?? R.EndEpochMs, V);
        if (q <= oe) return;
        const J = [];
        K.forEach((Y) => {
          q <= Y.startEpoch || oe >= Y.endEpoch ? J.push(Y) : (oe > Y.startEpoch && J.push({ startEpoch: Y.startEpoch, endEpoch: oe }), q < Y.endEpoch && J.push({ startEpoch: q, endEpoch: Y.endEpoch }));
        }), K = J;
      }), K.forEach((R, oe) => {
        if (R.endEpoch - R.startEpoch < 1e3 || R.endEpoch <= z || R.startEpoch >= le) return;
        const q = Math.max(z, R.startEpoch), J = Math.min(le, R.endEpoch), Y = (J - o - (q - o)) / l * 100;
        Y > 0 && I.push({
          id: `station-${O}-${oe}`,
          type: "station",
          startEpoch: q,
          endEpoch: J,
          leftPct: (q - o - U) / l * 100,
          widthPct: Y,
          durationSec: Math.round((R.endEpoch - R.startEpoch) / 1e3)
        });
      });
    }), I;
  }, [n, c, o, r, l, a, i, S]), j = u.useMemo(() => {
    if (!p || !f || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), P = r, U = r + l;
    return v.map((L, z) => {
      const le = (L.startEpochMs ?? L.StartEpochMs ?? 0) - o, ne = (L.endEpochMs ?? L.EndEpochMs ?? 0) - o;
      if (ne <= P || le >= U) return null;
      const V = Math.max(P, le), I = Math.min(U, ne), B = (V - P) / l * 100, O = (I - V) / l * 100;
      if (O <= 0) return null;
      const R = (L.targetDisplayId || L.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${z}`,
        isFeatured: R,
        leftPct: B,
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
    j.map((N) => N.isFeatured ? /* @__PURE__ */ s.jsx(
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
  onStationContextMenu: v,
  onDeselectStation: f,
  viewportStartMs: p = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: S = 0,
  outPointMs: M = 36e5,
  baseEpochMs: _ = 0,
  segments: k = [],
  recordingSegments: x = {},
  globalGaps: m = []
}) {
  const T = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", w = (e == null ? void 0 : e.id) || T, b = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var O, K, R;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((O = e == null ? void 0 : e.displayTopology) == null ? void 0 : O.displays) || ((K = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : K.Displays) || ((R = e == null ? void 0 : e.topology) == null ? void 0 : R.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), j = u.useMemo(() => {
    var K, R;
    const O = A.find((oe) => oe.isPrimary || oe.IsPrimary);
    return ((O == null ? void 0 : O.displayId) || (O == null ? void 0 : O.DisplayId) || ((K = A[0]) == null ? void 0 : K.displayId) || ((R = A[0]) == null ? void 0 : R.DisplayId) || "mon-0").toLowerCase();
  }, [A]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), P = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), U = P && P.length > 0, L = !!(A && A.length > 1), z = !!(t && L), le = u.useMemo(() => {
    let O = x[w] || x[T] || k || [];
    if (!O || O.length === 0) {
      const K = (w || "").toLowerCase(), R = (T || "").toLowerCase();
      for (const [oe, q] of Object.entries(x || {})) {
        const J = oe.toLowerCase();
        if (K && J === K || R && J === R) {
          O = q;
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
  }, [x, k, w, T, e, A]), ne = u.useMemo(() => {
    if (!_ || y <= 0) return [];
    const O = [...le].sort((J, Y) => ts(J) - ts(Y)), K = [], R = _ + y;
    if (m && m.length > 0 && m.forEach((J) => {
      const Y = J.startEpochMs ?? J.StartEpochMs ?? 0, Le = J.endEpochMs ?? J.EndEpochMs ?? 0;
      Le > Y && K.push({ startEpoch: Y, endEpoch: Le, type: "global" });
    }), O.length === 0)
      return K.push({ startEpoch: _, endEpoch: R, type: "station" }), K;
    const oe = Math.round(ts(O[0]));
    oe - _ > 2e3 && (K.some((Y) => Y.type === "global" && Y.startEpoch <= _ && Y.endEpoch >= oe) || K.push({ startEpoch: _, endEpoch: oe, type: "station" }));
    for (let J = 0; J < O.length - 1; J++) {
      const Y = Math.round(Or(O[J])), Le = Math.round(ts(O[J + 1]));
      Le - Y > 2e3 && (K.some((je) => je.type === "global" && je.startEpoch <= Y && je.endEpoch >= Le) || K.push({ startEpoch: Y, endEpoch: Le, type: "station" }));
    }
    const q = Math.round(Or(O[O.length - 1]));
    return R - q > 2e3 && (K.some((Y) => Y.type === "global" && Y.startEpoch <= q && Y.endEpoch >= R) || K.push({ startEpoch: q, endEpoch: R, type: "station" })), K;
  }, [le, m, _, y]), V = u.useMemo(() => {
    const O = _ + S, K = _ + M;
    return zg(P, ne, m, O, K, j);
  }, [P, ne, m, _, S, M, j]), I = u.useMemo(() => {
    if (!U || y <= 0) return null;
    const O = p, K = p + y;
    return V.map((R, oe) => {
      const q = (R.startEpochMs ?? R.StartEpochMs ?? 0) - _, J = (R.endEpochMs ?? R.EndEpochMs ?? 0) - _;
      if (J <= O || q >= K) return null;
      const Y = Math.max(O, q), Le = Math.min(K, J), _e = (Y - O) / y * 100, je = (Le - Y) / y * 100;
      if (je <= 0) return null;
      const Qe = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase(), Me = A.findIndex((ot) => (ot.displayId || ot.DisplayId || "").toLowerCase() === Qe);
      let be = Me >= 0 ? Me + 1 : null;
      if (!be) {
        const ot = Qe.match(/\d+/);
        be = ot ? parseInt(ot[0], 10) + 1 : 1;
      }
      const Ze = Me >= 0 ? A[Me].displayName || A[Me].DisplayName || `Screen ${be}` : `Screen ${be}`;
      return {
        id: oe,
        dispNum: be,
        dispLabel: Ze,
        leftPct: _e,
        widthPct: je
      };
    }).filter(Boolean);
  }, [U, V, A, _, p, y]), B = u.useCallback((O) => {
    const K = (O || "mon-0").toLowerCase();
    return o.some((R) => {
      if (R.stationId !== w) return !1;
      const oe = (R.displayId || "mon-0").toLowerCase();
      return oe === K || oe === "auto" && (K === "mon-0" || K === "screen-0");
    });
  }, [o, w]);
  return z ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
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
      const R = (O.displayId || O.DisplayId || `mon-${K}`).toLowerCase(), oe = O.displayNumber || O.DisplayNumber || K + 1, q = O.displayName || O.DisplayName || "", J = q && !q.toLowerCase().includes(T.toLowerCase()) ? q : `Screen ${oe}${O.isPrimary || K === 0 ? " (Main)" : ""}`, Y = B(R);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${J} (${O.width || 1920}×${O.height || 1080})`, children: J }),
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
              Fc,
              {
                hostname: T,
                displayId: R,
                activeSegments: O.segments && O.segments.length > 0 ? O.segments : le,
                viewportStartMs: p,
                viewportDurationMs: y,
                baseEpochMs: _,
                inPointMs: S,
                outPointMs: M,
                globalGaps: m,
                directorSegments: V,
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
          Fc,
          {
            hostname: T,
            displayId: j,
            activeSegments: le,
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
const Jr = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Map();
function sh(e, t, n, r = 250) {
  return `${(e || "").replace(/^live\//i, "").toLowerCase().trim()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const pa = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = sh(e, t, n, r);
    return Jr.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = sh(e, t, n, l);
    if (Jr.has(a))
      return Jr.get(a);
    if (Hl.has(a))
      return Hl.get(a);
    const i = (async () => {
      try {
        const c = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(o)}&startEpoch=${Math.round(t)}&endEpoch=${Math.round(n)}&points=${l}`, d = await fetch(c, { signal: r });
        if (!d.ok) {
          if (d.status === 204) return null;
          throw new Error(`HTTP ${d.status}`);
        }
        const v = await d.json();
        if (Array.isArray(v) && v.length > 0)
          return Jr.set(a, v), v;
      } catch (c) {
        if (c.name !== "AbortError") {
          const d = new Array(l).fill(0.02);
          return Jr.set(a, d), d;
        }
      } finally {
        Hl.delete(a);
      }
      return null;
    })();
    return Hl.set(a, i), i;
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
    const p = f * i, y = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), S = o - y * a;
    d += f === 0 ? `M ${p.toFixed(2)},${S.toFixed(2)}` : ` L ${p.toFixed(2)},${S.toFixed(2)}`;
  }
  let v = "";
  for (let f = l - 1; f >= 0; f--) {
    const p = f * i, y = Math.min(1, Math.max(0.02, (e[f] || 0) * c)), S = o + y * a;
    v += ` L ${p.toFixed(2)},${S.toFixed(2)}`;
  }
  return `${d}${v} Z`;
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
  onClipMoveDrag: i,
  vpStartEpoch: c,
  viewportDurationMs: d,
  timeMode: v,
  stationName: f
}) {
  const [p, y] = u.useState(() => pa.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [S, M] = u.useState(!1);
  u.useEffect(() => {
    let z = !0;
    const le = new AbortController(), ne = pa.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (ne) {
      y(ne), M(!1);
      return;
    }
    return y(null), M(!0), pa.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, le.signal, 250).then((V) => {
      z && (V && y(V), M(!1));
    }).catch(() => {
      z && M(!1);
    }), () => {
      z = !1, le.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const _ = e.startEpochMs, k = e.endEpochMs, x = Math.max(1, k - _), m = (e.gain || 1) * (t.gain || 1), T = u.useMemo(() => cx(p, 100, 24, m), [p, m]), w = Math.max(c, _), b = Math.min(c + d, k), h = (w - c) / d * 100, A = (b - w) / d * 100;
  if (A <= 0) return null;
  const j = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, P = e.fadeOutMs ?? 50, U = Math.min(45, N / x * 100), L = Math.min(45, P / x * 100);
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
      onMouseDown: (z) => {
        !z.target.closest(".trim-handle") && !z.target.closest(".btn-menu-close") && (i == null || i(z));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${f} [${j.toUpperCase()}] (${St(_, v, { includeSeconds: !0 })} - ${St(k, v, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${P}ms
Drag body: Move in time • Drag edges: Trim • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (z) => a(z, "start"),
            title: "Drag to trim Clip In-Point"
          }
        ),
        N > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${U}%` },
            title: `Fade In: ${N}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: S ? /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
          /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
          /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
        ] }) : /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
          "path",
          {
            d: T,
            fill: n,
            fillOpacity: "0.45",
            stroke: n,
            strokeWidth: "1.2",
            strokeOpacity: "0.85"
          }
        ) }) }),
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
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: f }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${j}`, children: j.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
            Math.round(e.gain * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-right",
            onMouseDown: (z) => a(z, "end"),
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
  }), [_, k] = u.useState(!1), [x, m] = u.useState(null), [T, w] = u.useState(1), [b, h] = u.useState(50), [A, j] = u.useState(50), [N, P] = u.useState([]), [U, L] = u.useState(null), [z, le] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const $ = (Q) => {
      Q.detail && le(Q.detail);
    };
    return window.addEventListener("itb-live-audio-level", $), () => window.removeEventListener("itb-live-audio-level", $);
  }, []);
  const ne = u.useCallback(() => {
    M(($) => {
      const Q = !$;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(Q));
      } catch {
      }
      return Q;
    });
  }, []), [V, I] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map(($, Q) => {
        var W;
        return {
          id: `clip_${Q}_${$.startEpochMs || $.StartEpochMs}`,
          startEpochMs: $.startEpochMs ?? $.StartEpochMs ?? l,
          endEpochMs: $.endEpochMs ?? $.EndEpochMs ?? l + r,
          sourceStationId: $.sourceStationId ?? $.SourceStationId ?? (((W = t[0]) == null ? void 0 : W.id) || "station-0"),
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
  ]), B = l + o, O = l + n, K = O + r, R = u.useCallback(($) => {
    if (!p) return;
    const Q = [];
    $.forEach((W) => {
      W.isMuted || _ || W.clips.forEach((te) => {
        Q.push({
          startEpochMs: te.startEpochMs,
          endEpochMs: te.endEpochMs,
          sourceStationId: te.sourceStationId,
          gain: te.gain * W.gain,
          channelMode: te.channelMode || W.channelMode || "both",
          fadeInMs: te.fadeInMs ?? 50,
          fadeOutMs: te.fadeOutMs ?? 50
        });
      });
    }), Q.sort((W, te) => W.startEpochMs - te.startEpochMs), p({ segments: Q });
  }, [p, _]);
  u.useEffect(() => {
    let $ = null;
    for (const Q of V)
      if (!(Q.isMuted || _)) {
        for (const W of Q.clips)
          if (B >= W.startEpochMs && B <= W.endEpochMs) {
            const te = t.find((ee) => ee.id === W.sourceStationId);
            $ = {
              stationId: W.sourceStationId,
              stationName: te ? te.displayName || te.hostname || te.id : W.sourceStationId,
              channelMode: W.channelMode || Q.channelMode || "both",
              gain: W.gain * Q.gain,
              isPlaying: z.isPlaying
            };
            break;
          }
        if ($) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: $ }));
  }, [V, _, B, t, z.isPlaying]), u.useEffect(() => {
    const $ = () => {
      N.length !== 0 && (I((te) => {
        const ee = te.map((Z) => ({
          ...Z,
          clips: Z.clips.filter((se) => !N.includes(se.id))
        }));
        return R(ee), ee;
      }), P([]), m(null));
    }, Q = (te) => {
      if (te.key === "Delete" || te.key === "Backspace") {
        const ee = te.target;
        if (ee.tagName === "INPUT" || ee.tagName === "TEXTAREA" || ee.isContentEditable) return;
        N.length > 0 && (te.preventDefault(), $());
      }
    }, W = () => $();
    return window.addEventListener("keydown", Q), window.addEventListener("itb:studio-delete-selected", W), () => {
      window.removeEventListener("keydown", Q), window.removeEventListener("itb:studio-delete-selected", W);
    };
  }, [N, R]);
  const oe = u.useCallback(() => {
    I(($) => {
      const W = `A${$.length + 1}`, te = {
        id: W,
        name: `Track ${W}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, ee = [...$, te];
      return R(ee), ee;
    });
  }, [R]), q = u.useCallback(($) => {
    I((Q) => {
      if (Q.length <= 1) return Q;
      const W = Q.filter((te) => te.id !== $);
      return R(W), W;
    });
  }, [R]), J = u.useCallback(($) => {
    I((Q) => {
      const W = Q.map((te) => te.id === $ ? { ...te, isMuted: !te.isMuted } : te);
      return R(W), W;
    });
  }, [R]), Y = u.useCallback(($) => {
    I((Q) => {
      var ee;
      const W = (ee = Q.find((Z) => Z.id === $)) == null ? void 0 : ee.isSolo, te = Q.map((Z) => ({
        ...Z,
        isSolo: Z.id === $ ? !W : !1,
        isMuted: Z.id === $ ? !1 : !W
      }));
      return R(te), te;
    });
  }, [R]), Le = u.useCallback(($) => {
    const Q = ["both", "sys", "mic"];
    I((W) => {
      const te = W.map((ee) => {
        if (ee.id !== $) return ee;
        const Z = ee.channelMode || "both", se = Q[(Q.indexOf(Z) + 1) % Q.length];
        return {
          ...ee,
          channelMode: se,
          clips: ee.clips.map((Ae) => ({ ...Ae, channelMode: se }))
        };
      });
      return R(te), te;
    });
  }, [R]), _e = u.useCallback(($, Q) => {
    const W = Math.max(0, Math.min(2, Number(Q)));
    I((te) => {
      const ee = te.map((Z) => Z.id === $ ? { ...Z, gain: W } : Z);
      return R(ee), ee;
    }), qd(W);
  }, [R]), je = u.useCallback(($, Q) => {
    Q && I((W) => {
      const te = W.map((ee) => {
        if (ee.id !== $) return ee;
        if (ee.clips.length === 0) {
          const Z = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: Q,
            gain: 1,
            channelMode: ee.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...ee, clips: [Z] };
        }
        return {
          ...ee,
          clips: ee.clips.map((Z) => ({ ...Z, sourceStationId: Q }))
        };
      });
      return R(te), te;
    });
  }, [l, r, R]), Qe = u.useCallback(($, Q = null, W = null) => {
    var st;
    const te = Q || ((st = t[0]) == null ? void 0 : st.id) || "station-0", ee = W !== null ? W : B, Z = Math.min(r, 6e4), se = ee + Z, Ae = V.find((et) => et.id === $), ve = (Ae == null ? void 0 : Ae.channelMode) || "both", lt = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(ee),
      endEpochMs: Math.round(se),
      sourceStationId: te,
      gain: 1,
      channelMode: ve,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    I((et) => {
      const xt = et.map((Je) => Je.id === $ ? {
        ...Je,
        clips: [...Je.clips, lt].sort(($t, Ut) => $t.startEpochMs - Ut.startEpochMs)
      } : Je);
      return R(xt), xt;
    });
  }, [V, B, r, t, R]), Me = u.useCallback(($, Q = null) => {
    I((W) => {
      const te = W.map((ee) => {
        if ($ && ee.id !== $) return ee;
        const Z = [];
        return ee.clips.forEach((se) => {
          (!Q || se.id === Q || N.includes(se.id)) && B > se.startEpochMs + 500 && B < se.endEpochMs - 500 ? (Z.push({ ...se, endEpochMs: B }), Z.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: B,
            endEpochMs: se.endEpochMs,
            sourceStationId: se.sourceStationId,
            gain: se.gain,
            channelMode: se.channelMode || ee.channelMode || "both",
            fadeInMs: se.fadeInMs ?? 50,
            fadeOutMs: se.fadeOutMs ?? 50
          })) : Z.push(se);
        }), { ...ee, clips: Z };
      });
      return R(te), te;
    }), m(null);
  }, [B, N, R]), be = u.useCallback(() => {
    Me(null, null);
  }, [Me]), Ze = u.useCallback(($, Q) => {
    I((W) => {
      const te = W.map((ee) => ee.id !== $ ? ee : {
        ...ee,
        clips: ee.clips.filter((Z) => Z.id !== Q)
      });
      return R(te), te;
    }), m(null);
  }, [R]), ot = u.useCallback(($, Q, W) => {
    I((te) => {
      const ee = te.map((Z) => Z.id !== $ ? Z : {
        ...Z,
        clips: Z.clips.map((se) => se.id === Q ? { ...se, sourceStationId: W } : se)
      });
      return R(ee), ee;
    }), m((te) => te ? { ...te, stationId: W } : null);
  }, [R]), ie = u.useCallback(($, Q, W) => {
    const te = Math.max(0, Math.min(2.5, Number(W)));
    w(te), I((ee) => {
      const Z = ee.map((se) => se.id !== $ ? se : {
        ...se,
        clips: se.clips.map((Ae) => Ae.id === Q ? { ...Ae, gain: te } : Ae)
      });
      return R(Z), Z;
    }), qd(te);
  }, [R]), ke = u.useCallback(($, Q, W, te) => {
    const ee = Math.max(0, Math.min(1e4, Math.round(Number(te) || 0)));
    W === "in" ? h(ee) : j(ee), I((Z) => {
      const se = Z.map((Ae) => Ae.id !== $ ? Ae : {
        ...Ae,
        clips: Ae.clips.map((ve) => ve.id === Q ? W === "in" ? { ...ve, fadeInMs: ee } : { ...ve, fadeOutMs: ee } : ve)
      });
      return R(se), se;
    }), m((Z) => Z ? W === "in" ? { ...Z, fadeInMs: ee } : { ...Z, fadeOutMs: ee } : null);
  }, [R]), ze = u.useCallback(($, Q, W) => {
    var $t, Ut;
    if ($.preventDefault(), $.stopPropagation(), $.button !== 0) return;
    const te = V.find((Ct) => Ct.id === Q), ee = ($t = te == null ? void 0 : te.clips) == null ? void 0 : $t.find((Ct) => Ct.id === W);
    if (!ee) return;
    const Z = $.clientX, se = ee.startEpochMs, ve = ee.endEpochMs - se, lt = y.current;
    if (!lt) return;
    const st = (Ut = lt.querySelector(".audio-lane-timeline")) == null ? void 0 : Ut.getBoundingClientRect();
    if (!st || st.width <= 0) return;
    let et = !1;
    const xt = (Ct) => {
      const Wt = Ct.clientX - Z;
      Math.abs(Wt) > 3 && (et = !0);
      const ct = Wt / st.width * r;
      let rt = Math.round(se + ct), Ke = rt + ve;
      const Ve = 12 / st.width * r;
      Math.abs(rt - B) <= Ve ? (rt = B, Ke = rt + ve) : Math.abs(Ke - B) <= Ve && (Ke = B, rt = Ke - ve), rt < l && (rt = l, Ke = rt + ve), I((Rt) => Rt.map((Tt) => Tt.id !== Q ? Tt : {
        ...Tt,
        clips: Tt.clips.map((en) => en.id === W ? { ...en, startEpochMs: rt, endEpochMs: Ke } : en)
      }));
    }, Je = () => {
      window.removeEventListener("mousemove", xt), window.removeEventListener("mouseup", Je), et && I((Ct) => (R(Ct), Ct));
    };
    window.addEventListener("mousemove", xt), window.addEventListener("mouseup", Je);
  }, [V, r, B, l, R]), He = u.useCallback(($, Q, W, te) => {
    $.preventDefault(), $.stopPropagation();
    const ee = $.clientX, Z = V.find((et) => et.id === Q), se = Z == null ? void 0 : Z.clips.find((et) => et.id === W);
    if (!se) return;
    const Ae = se.startEpochMs, ve = se.endEpochMs, lt = (et) => {
      var Ct;
      const xt = et.clientX - ee, Je = (Ct = y.current) == null ? void 0 : Ct.querySelector(".audio-lane-timeline");
      if (!Je) return;
      const $t = Je.getBoundingClientRect(), Ut = xt / $t.width * r;
      I((Wt) => Wt.map((ct) => ct.id !== Q ? ct : {
        ...ct,
        clips: ct.clips.map((rt) => {
          if (rt.id !== W) return rt;
          if (te === "start") {
            const Ke = Math.min(ve - 500, Ae + Ut);
            return { ...rt, startEpochMs: Math.round(Ke) };
          } else {
            const Ke = Math.max(Ae + 500, ve + Ut);
            return { ...rt, endEpochMs: Math.round(Ke) };
          }
        })
      }));
    }, st = () => {
      window.removeEventListener("mousemove", lt), window.removeEventListener("mouseup", st), I((et) => (R(et), et));
    };
    window.addEventListener("mousemove", lt), window.addEventListener("mouseup", st);
  }, [V, r, R]), ge = ($, Q, W) => {
    $.preventDefault(), $.stopPropagation();
    const te = 280, ee = 350, Z = Math.max(16, Math.min(window.innerWidth - te - 16, $.clientX - te / 2));
    let se = $.clientY - ee - 12;
    se < 80 && (se = Math.min(window.innerHeight - ee - 16, $.clientY + 24)), w(W.gain || 1), h(W.fadeInMs ?? 50), j(W.fadeOutMs ?? 50), m({
      laneId: Q,
      clipId: W.id,
      s: W.startEpochMs,
      e: W.endEpochMs,
      x: Z,
      y: se,
      stationId: W.sourceStationId,
      gain: W.gain || 1,
      channelMode: W.channelMode || "both",
      fadeInMs: W.fadeInMs ?? 50,
      fadeOutMs: W.fadeOutMs ?? 50
    });
  };
  u.useEffect(() => {
    if (!x) return;
    const $ = () => m(null), Q = (W) => {
      W.key === "Escape" && m(null);
    };
    return window.addEventListener("click", $), window.addEventListener("keydown", Q), () => {
      window.removeEventListener("click", $), window.removeEventListener("keydown", Q);
    };
  }, [x]);
  const he = u.useMemo(() => V.reduce(($, Q) => $ + (Q.isMuted ? 0 : Q.clips.length), 0), [V]);
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
          V.length,
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
            onClick: be,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${z.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: z.db > -55 ? `${z.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (z.peak || 0) * 100))}%`,
                background: z.peak > 0.85 ? "#F43F5E" : z.peak > 0.65 ? "#F59E0B" : "#10B981"
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
                const Q = !$;
                return R(V), Q;
              });
            },
            title: _ ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: _ ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: V.map(($, Q) => {
      const W = rh[Q % rh.length], te = U === $.id, ee = t.find((Z) => {
        var se;
        return Z.id === ((se = $.clips[0]) == null ? void 0 : se.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: W }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: W }, children: $.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: $.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (ee == null ? void 0 : ee.id) || "",
              onChange: (Z) => je($.id, Z.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((Z) => /* @__PURE__ */ s.jsx("option", { value: Z.id, children: Z.displayName || Z.hostname || Z.id }, Z.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${$.isMuted ? "active" : ""}`,
                onClick: () => J($.id),
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
                onChange: (Z) => _e($.id, Z.target.value),
                title: `Lane Gain: ${Math.round($.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round($.gain * 100),
              "%"
            ] })
          ] }),
          V.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => q($.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${te ? "is-drag-over" : ""}`,
            onClick: () => P([]),
            onDragOver: (Z) => {
              Z.preventDefault(), Z.dataTransfer.dropEffect = "copy", U !== $.id && L($.id);
            },
            onDragLeave: () => {
              U === $.id && L(null);
            },
            onDrop: (Z) => {
              Z.preventDefault(), L(null);
              const se = Z.dataTransfer.getData("text/station-id") || Z.dataTransfer.getData("text/plain");
              if (se) {
                const Ae = Z.currentTarget.getBoundingClientRect(), ve = Math.max(0, Math.min(1, (Z.clientX - Ae.left) / Ae.width)), lt = Math.round(O + ve * r);
                Qe($.id, se, lt);
              }
            },
            onDoubleClick: (Z) => {
              var lt;
              const se = Z.currentTarget.getBoundingClientRect(), Ae = Math.max(0, Math.min(1, (Z.clientX - se.left) / se.width)), ve = Math.round(O + Ae * r);
              Qe($.id, (lt = t[0]) == null ? void 0 : lt.id, ve);
            },
            children: [
              $.clips.map((Z) => {
                const se = t.find((ve) => ve.id === Z.sourceStationId), Ae = se ? se.displayName || se.hostname || se.id : Z.sourceStationId;
                return Z.endEpochMs <= O || Z.startEpochMs >= K ? null : /* @__PURE__ */ s.jsx(
                  ux,
                  {
                    clip: Z,
                    lane: $,
                    laneColor: W,
                    isSelected: N.includes(Z.id),
                    onSelect: (ve) => {
                      ve.stopPropagation(), ve.ctrlKey || ve.metaKey ? P(
                        (lt) => lt.includes(Z.id) ? lt.filter((st) => st !== Z.id) : [...lt, Z.id]
                      ) : P([Z.id]);
                    },
                    onOpenMenu: (ve) => ge(ve, $.id, Z),
                    onTrimDrag: (ve, lt) => He(ve, $.id, Z.id, lt),
                    onClipMoveDrag: (ve) => ze(ve, $.id, Z.id),
                    vpStartEpoch: O,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: Ae
                  },
                  Z.id
                );
              }),
              $.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Z;
                    return Qe($.id, (Z = t[0]) == null ? void 0 : Z.id, B);
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
    x && Ls.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: x.x, top: x.y },
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
                const Q = $.id === x.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${Q ? "is-selected" : ""}`,
                    onClick: () => ot(x.laneId, x.clipId, $.id),
                    children: $.displayName || $.hostname || $.id
                  },
                  $.id
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
                  onChange: ($) => ie(x.laneId, x.clipId, $.target.value),
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
                      onChange: ($) => ke(x.laneId, x.clipId, "in", $.target.value),
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
                      onChange: ($) => ke(x.laneId, x.clipId, "out", $.target.value),
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
                  onClick: () => Me(x.laneId, x.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => Ze(x.laneId, x.clipId),
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
      onClick: ne,
      title: "Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔇" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: he > 0 ? `${he} CLIPS ACTIVE` : "MUTED (0 ACTIVE)" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: z.isPlaying ? "#10B981" : "#64748B" } })
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
  totalDurationMs: v = 36e5,
  playheadMs: f = 0,
  inPointMs: p = 0,
  outPointMs: y = 36e5,
  timeMode: S = "LOCAL"
}) {
  const M = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [_, k] = u.useState(null), [x, m] = u.useState(null);
  Co.useEffect(() => {
    if (x === null) return;
    const j = (P) => {
      P.key === "Escape" && m(null);
    }, N = (P) => {
      !P.target.closest(".kf-inspector-popover") && !P.target.closest(".kf-marker-diamond") && m(null);
    };
    return window.addEventListener("keydown", j), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", j), window.removeEventListener("mousedown", N);
    };
  }, [x]);
  const T = d + f, w = d + i, b = w + c, h = (j) => {
    const N = j.currentTarget.getBoundingClientRect(), P = j.clientX - N.left, U = Math.max(0, Math.min(1, P / N.width)), L = Math.round(w + U * c);
    r && r(L);
  }, A = (j, N, P) => {
    if (j.button !== 0) return;
    j.stopPropagation(), j.preventDefault();
    const U = j.clientX, L = P.timestampEpochMs, z = P.id || `kf_${N}_${L}`, le = j.currentTarget.closest(".track-surface");
    if (!le) return;
    let ne = !1;
    k({
      idx: N,
      kfId: z,
      startClientX: U,
      initialEpoch: L,
      currentEpoch: L
    });
    const V = (B) => {
      const O = B.clientX - U;
      Math.abs(O) > 3 && (ne = !0);
      const K = le.getBoundingClientRect(), R = O / K.width * c;
      let oe = Math.round(L + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const q = d + p, J = d + y, Y = 14 / K.width * c;
      Math.abs(oe - T) <= Y ? oe = T : Math.abs(oe - q) <= Y ? oe = q : Math.abs(oe - J) <= Y && (oe = J), k((Le) => Le ? { ...Le, currentEpoch: oe } : null);
    }, I = (B) => {
      window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", I), k(null);
      const O = le.getBoundingClientRect(), R = (B.clientX - U) / O.width * c;
      let oe = Math.round(L + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const q = d + p, J = d + y, Y = 14 / O.width * c;
      Math.abs(oe - T) <= Y ? oe = T : Math.abs(oe - q) <= Y ? oe = q : Math.abs(oe - J) <= Y && (oe = J), ne ? (o && o(z, oe), n && n(N, oe)) : (n && n(N, L), m((Le) => Le === N ? null : N));
    };
    window.addEventListener("mousemove", V), window.addEventListener("mouseup", I);
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
          onClick: (j) => {
            j.stopPropagation(), r && r(T);
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
          M.map((j, N) => {
            const P = (_ == null ? void 0 : _.idx) === N, U = P ? _.currentEpoch : j.timestampEpochMs;
            if (U < w - 5e4 || U > b + 5e4) return null;
            const L = (U - w) / c * 100;
            if (L < -2 || L > 102) return null;
            const z = N === t, le = St(U, S, { includeSeconds: !0 }), ne = `${j.transitionType || "smooth"} (${j.transitionDurationSec ?? 0.5}s)`, V = Math.max(0, (U - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${z ? "is-active" : ""} ${P ? "is-dragging" : ""}`,
                style: { left: `${L}%` },
                onMouseDown: (I) => A(I, N, j),
                onContextMenu: (I) => {
                  I.preventDefault(), I.stopPropagation(), M.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${le} (+${V}s) • ${ne}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  P && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: le }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      V,
                      "s"
                    ] })
                  ] }),
                  x === N && !P && /* @__PURE__ */ s.jsxs(
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
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: le }),
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
                                  className: `btn-trans-choice ${(j.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${j.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${j.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          j.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((I) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(j.transitionDurationSec ?? 0.5) === I ? "is-active" : ""}`,
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
  const c = (j) => !r || r <= 0 ? "0%" : `${(j - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), S = Math.max(0, d), M = Math.min(100, v), _ = Math.max(0, M - S), k = (j) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(j, N);
  }, x = d < 1.5, m = v > 98.5, T = d <= 0.2 && d >= -0.2, w = v >= 99.8 && v <= 100.2, b = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => St(e + l, t), [e, l, t]);
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
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: St(t + e.targetMs, n) })
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
  getMsFromClientX: v,
  minimapRef: f
}) {
  const [p, y] = u.useState(null), [S, M] = u.useState(null), _ = (k, x) => {
    y(k), M({
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
        const b = f.current.getBoundingClientRect(), A = Math.max(0, Math.min(T.clientX - b.left, b.width)) / b.width * t, j = Math.max(0, Math.min(A - e / 2, t - e));
        d(j);
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
        let A = S.initialIn + b, j = S.initialOut + b;
        A < 0 ? (A = 0, j = h) : j > t && (j = t, A = t - h), o(A), i(j);
      }
    }, m = () => {
      y(null), M(null);
    };
    return window.addEventListener("mousemove", x), window.addEventListener("mouseup", m), () => {
      window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", m);
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
  zoomLevel: v = 1,
  onZoomChange: f,
  onZoomReset: p,
  playheadMs: y = 0,
  setPlayheadMs: S,
  inPointMs: M = 0,
  setInPointMs: _,
  outPointMs: k = 36e5,
  setOutPointMs: x,
  onExport: m,
  recordingSegments: T = {},
  movieBoundaries: w,
  viewportStartMs: b = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: j,
  onJumpViewportTo: N,
  keystrokeMode: P = "BURN_IN",
  onChangeKeystrokeMode: U,
  keystrokes: L = [],
  showKeystrokes: z = !1,
  showRulerKeystrokes: le = !1,
  onToggleRulerKeystrokes: ne,
  _onSplitDirectorSegment: V,
  _onChangeDirectorSegmentDisplay: I,
  _onResetDirectorSegmentToAuto: B,
  audioRoutingPlan: O,
  onSplitAudioSegment: K,
  onChangeAudioSegmentStation: R,
  onChangeAudioSegmentGain: oe,
  onFollowVisualFeed: q,
  isAutoFollowAudio: J,
  canvasLayoutTimeline: Y,
  activeKfIndex: Le = 0,
  onSelectKeyframe: _e,
  onAddKeyframeAtEpoch: je,
  onDeleteKeyframe: Qe,
  onUpdateKeyframeEpoch: Me,
  onUpdateKeyframeTransition: be,
  onToggleDisplayOnCanvas: Ze,
  onUpdateAudioPlan: ot
}) {
  var Re, tt;
  const [ie, ke] = u.useState(null), [ze, He] = u.useState(0), [ge, he] = u.useState(null), [$, Q] = u.useState(!0), W = (ae) => {
    var H, de, fe;
    return ((ae == null ? void 0 : ae.displays) || (ae == null ? void 0 : ae.Displays) || ((H = ae == null ? void 0 : ae.displayTopology) == null ? void 0 : H.displays) || ((de = ae == null ? void 0 : ae.DisplayTopology) == null ? void 0 : de.Displays) || ((fe = ae == null ? void 0 : ae.topology) == null ? void 0 : fe.displays) || []).length;
  }, [te, ee] = u.useState(() => {
    var ae;
    return e.length === 1 && W(e[0]) > 1 ? (ae = e[0]) == null ? void 0 : ae.id : null;
  });
  u.useEffect(() => {
    var ae;
    if (e.length === 1 && !te && ((ae = e[0]) != null && ae.id) && W(e[0]) > 1)
      ee(e[0].id);
    else if (te) {
      const qe = e.find((H) => H.id === te);
      (!qe || W(qe) <= 1) && ee(null);
    }
  }, [e, te]);
  const Z = u.useRef(null), se = u.useRef(null), Ae = d / Math.max(1, v), ve = Math.ceil(e.length / er) || 1, lt = u.useMemo(() => {
    const ae = ze * er;
    return e.slice(ae, ae + er);
  }, [e, ze]);
  u.useEffect(() => {
    if (!t && !te) return;
    const ae = te || t, qe = e.findIndex((H) => H.id === ae);
    if (qe !== -1) {
      const H = Math.floor(qe / er);
      H !== ze && He(H);
    }
  }, [t, te, e, ze]);
  const st = ((Re = Y == null ? void 0 : Y.keyframes) == null ? void 0 : Re[Le]) || ((tt = Y == null ? void 0 : Y.keyframes) == null ? void 0 : tt[0]), et = u.useMemo(() => {
    var ae;
    return ((ae = st == null ? void 0 : st.layout) == null ? void 0 : ae.placements) || [];
  }, [st]), xt = u.useMemo(() => e.find((ae) => ae.id === t) || null, [e, t]), Je = (w == null ? void 0 : w.globalFirstMs) ?? null, $t = (w == null ? void 0 : w.globalLastMs) ?? null, Ut = u.useMemo(() => (M > 500 || k < d - 500) && k - M >= 1e3, [M, k, d]), Ct = u.useMemo(() => e.map((ae) => ae.id).sort().join(","), [e]), { estimateData: Wt, isEstimating: ct, formatEstimateSize: rt } = yx({
    stationIdsKey: Ct,
    inPointMs: M,
    outPointMs: k,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), Ke = u.useCallback((ae) => {
    if (!Z.current) return b;
    const qe = Z.current.getBoundingClientRect(), H = qe.left + 200, de = qe.width - 200 - 58;
    if (de <= 0) return b;
    const fe = Math.max(0, Math.min(ae - H, de));
    return Math.round(b + fe / de * Ae);
  }, [b, Ae]), { draggingTarget: Ve, handleStartDrag: Rt } = vx({
    viewportDurationMs: Ae,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: S,
    inPointMs: M,
    setInPointMs: _,
    outPointMs: k,
    setOutPointMs: x,
    viewportStartMs: b,
    setViewportStartMs: h,
    getMsFromClientX: Ke,
    minimapRef: se
  }), Tt = u.useRef(v);
  Tt.current = v;
  const en = u.useRef(b);
  en.current = b;
  const Cn = u.useRef(d);
  Cn.current = d;
  const Qn = u.useRef(y);
  Qn.current = y, u.useEffect(() => {
    const ae = Z.current;
    if (!ae) return;
    const qe = (H) => {
      H.preventDefault(), H.stopPropagation();
      const de = H.ctrlKey || H.shiftKey, fe = Tt.current, Fe = en.current, Ge = Cn.current, ut = Qn.current;
      if (de) {
        const dt = Math.abs(H.deltaX) > Math.abs(H.deltaY) ? H.deltaX : H.deltaY;
        if (dt === 0) return;
        const Xe = Ge / Math.max(1, fe), ht = Math.max(0, Ge - Xe), jt = Xe * 0.08 * (dt > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(ht, Fe + jt)));
      } else {
        if (H.deltaY === 0) return;
        const Xe = H.deltaY < 0 ? 1.25 : 0.8, ht = Math.max(32, Ge / 2e3), jt = ae.getBoundingClientRect(), Mt = jt.left + 200, Ot = jt.width - 200 - 58;
        let ln = 0.5;
        if (Ot > 0)
          if (H.clientX >= Mt && H.clientX <= jt.right - 58)
            ln = Math.max(0, Math.min(1, (H.clientX - Mt) / Ot));
          else {
            const gs = Ge / Math.max(1, fe), Ss = (ut - Fe) / gs;
            ln = Ss >= 0 && Ss <= 1 ? Ss : 0.5;
          }
        const Dt = Math.max(1, Math.min(ht, Math.round(fe * Xe * 100) / 100));
        if (Dt === fe) return;
        const zt = Ge / fe, un = Ge / Dt, At = Fe + ln * zt - ln * un, An = Math.max(0, Ge - un);
        f == null || f(Dt), h == null || h(Math.max(0, Math.min(An, At)));
      }
    };
    return ae.addEventListener("wheel", qe, { passive: !1, capture: !0 }), () => ae.removeEventListener("wheel", qe, { capture: !0 });
  }, [f, h]);
  const Oe = e.length > 0 && Math.abs(k - M) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Z,
      className: "timeline-board-root",
      onContextMenu: (ae) => {
        var H;
        ae.preventDefault();
        const qe = (H = Z.current) == null ? void 0 : H.getBoundingClientRect();
        !qe || ae.clientX - qe.left < 200 || ae.clientX > qe.right - 58 || he({ x: ae.clientX, y: ae.clientY, targetMs: Math.max(0, Math.min(d, Ke(ae.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            ex,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: M,
              setInPointMs: _,
              outPointMs: k,
              setOutPointMs: x
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                tx,
                {
                  minimapRef: se,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: b,
                  viewportDurationMs: Ae,
                  zoomLevel: v,
                  inPointMs: M,
                  outPointMs: k,
                  playheadMs: y,
                  onStartDragMinimap: Rt
                }
              ),
              /* @__PURE__ */ s.jsx(
                nx,
                {
                  earliestMediaMs: Je,
                  latestMediaMs: $t,
                  hasActiveCut: Ut,
                  onJumpToFirst: () => {
                    Je !== null && (S == null || S(Je), N == null || N(Je, "start"));
                  },
                  onJumpToLast: () => {
                    $t !== null && (S == null || S($t), N == null || N($t, "end"));
                  },
                  onContextualFit: () => {
                    Ut ? j == null || j(M, k) : Je !== null && $t !== null && $t > Je ? j == null || j(Je, $t) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: P,
                  onChangeKeystrokeMode: U,
                  showRulerKeystrokes: le,
                  onToggleRulerKeystrokes: ne
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              qg,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: b,
                viewportDurationMs: Ae,
                totalDurationMs: d,
                hoverMs: ie,
                onHoverChange: ke,
                onSeek: (ae) => S == null ? void 0 : S(ae),
                inPointMs: M,
                outPointMs: k,
                earliestMediaMs: Je,
                movieBoundaries: w,
                stationHostname: (xt == null ? void 0 : xt.hostname) || (xt == null ? void 0 : xt.id) || (xt == null ? void 0 : xt.name),
                activeStationName: (xt == null ? void 0 : xt.displayName) || (xt == null ? void 0 : xt.hostname) || (xt == null ? void 0 : xt.name),
                showKeystrokes: !!(le ?? z),
                keystrokes: L
              }
            ) })
          ] })
        ] }),
        ve > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ze === 0,
              onClick: () => He((ae) => Math.max(0, ae - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            ze * er + 1,
            "–",
            Math.min(e.length, (ze + 1) * er),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ze >= ve - 1,
              onClick: () => He((ae) => Math.min(ve - 1, ae + 1)),
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
              if (Ve || !Z.current) return;
              const qe = Z.current.getBoundingClientRect();
              ae.clientX >= qe.left + 200 && ae.clientX <= qe.right - 58 ? ke(Ke(ae.clientX)) : ke(null);
            },
            onMouseLeave: () => !Ve && ke(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => Q((ae) => !ae), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: $ ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  $ && ve > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ze === 0,
                        onClick: (ae) => {
                          ae.stopPropagation(), He((qe) => Math.max(0, qe - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      ze + 1,
                      "/",
                      ve,
                      " (",
                      ze * er + 1,
                      "–",
                      Math.min(e.length, (ze + 1) * er),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ze >= ve - 1,
                        onClick: (ae) => {
                          ae.stopPropagation(), He((qe) => Math.min(ve - 1, qe + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !$ && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => Q(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (et == null ? void 0 : et.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var fe, Fe, Ge, ut, dt;
                    const ae = (et == null ? void 0 : et.find((Xe) => Xe.isPrimary || Xe.isFocused)) || (et == null ? void 0 : et[0]), qe = (ae == null ? void 0 : ae.stationId) || ((fe = e[0]) == null ? void 0 : fe.hostname) || ((Fe = e[0]) == null ? void 0 : Fe.id), H = (ae == null ? void 0 : ae.displayId) || "mon-0";
                    let de = [];
                    if (et && et.length > 0) {
                      const Xe = /* @__PURE__ */ new Map();
                      et.forEach((ht) => {
                        var Mt;
                        (T[ht.stationId] || T[(Mt = ht.stationId) == null ? void 0 : Mt.toLowerCase()] || []).forEach((Ot) => {
                          const ln = `${Ot.startEpochMs || Ot.start}_${Ot.endEpochMs || Ot.end}`;
                          Xe.has(ln) || Xe.set(ln, Ot);
                        });
                      }), de = Array.from(Xe.values());
                    }
                    return de.length === 0 && (de = T[(Ge = e[0]) == null ? void 0 : Ge.id] || T[(ut = e[0]) == null ? void 0 : ut.hostname] || ((dt = e[0]) == null ? void 0 : dt.segments) || []), /* @__PURE__ */ s.jsx(
                      Fc,
                      {
                        hostname: qe,
                        displayId: H,
                        activeSegments: de,
                        viewportStartMs: b,
                        viewportDurationMs: Ae,
                        baseEpochMs: i,
                        inPointMs: M,
                        outPointMs: k,
                        globalGaps: (Wt == null ? void 0 : Wt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                $ && (e.length > 0 ? lt.map((ae) => {
                  const qe = !!(t && ae.id === t), H = te === ae.id, de = o ? o[ae.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    ix,
                    {
                      station: ae,
                      isExpanded: H && W(ae) > 1,
                      onToggleExpand: () => {
                        W(ae) > 1 && ee((fe) => fe === ae.id ? null : ae.id);
                      },
                      isAutoDirectorEnabled: de,
                      onToggleAutoDirector: a,
                      canvasPlacements: et,
                      onToggleDisplayOnCanvas: Ze,
                      directorPlan: ae.directorPlan,
                      isActive: qe,
                      onSelect: () => n == null ? void 0 : n(ae.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: b,
                      viewportDurationMs: Ae,
                      inPointMs: M,
                      outPointMs: k,
                      baseEpochMs: i,
                      segments: T[ae.id] || T[ae.hostname] || ae.segments || [],
                      recordingSegments: T,
                      globalGaps: (Wt == null ? void 0 : Wt.removedGlobalGaps) || []
                    },
                    ae.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  dx,
                  {
                    audioPlan: O,
                    stations: e,
                    viewportStartMs: b,
                    viewportDurationMs: Ae,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: K,
                    onChangeSegmentStation: R,
                    onChangeSegmentGain: oe,
                    onFollowVisualFeed: q,
                    isAutoFollow: J,
                    timeMode: c,
                    onUpdateAudioPlan: ot
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  hx,
                  {
                    canvasLayoutTimeline: Y,
                    activeKfIndex: Le,
                    onSelectKeyframe: _e,
                    onAddKeyframeAtEpoch: je,
                    onDeleteKeyframe: Qe,
                    onUpdateKeyframeEpoch: Me,
                    onUpdateKeyframeTransition: be,
                    viewportStartMs: b,
                    viewportDurationMs: Ae,
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
                gx,
                {
                  isRangeValid: Oe,
                  onExport: m,
                  isEstimating: ct,
                  estimateData: Wt,
                  formatEstimateSize: rt,
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
            viewportStartMs: b,
            viewportDurationMs: Ae,
            playheadMs: y,
            inPointMs: M,
            outPointMs: k,
            onStartDrag: Rt
          }
        ),
        /* @__PURE__ */ s.jsx(
          mx,
          {
            contextMenu: ge,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ae) => {
              ge && (ae === "playhead" ? S == null || S(ge.targetMs) : ae === "in" ? _ == null || _(Math.max(0, Math.min(ge.targetMs, k - 1e3))) : ae === "out" && (x == null || x(Math.min(d, Math.max(ge.targetMs, M + 1e3)))), he(null));
            },
            onClose: () => he(null)
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
function Ex({
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
  viewMode: x = "grid",
  onViewModeChange: m,
  isDrawerMode: T = !1
}) {
  const [w, b] = u.useState(!1), h = v !== "all", A = !M || M.toLowerCase() === "all", j = A ? "Select All" : `Select ${M}`, N = A ? "Clear All" : `Clear ${M}`;
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
            className: `btn-view-mode ${x === "grid" ? "active" : ""}`,
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
            className: `btn-view-mode ${x === "table" ? "active" : ""}`,
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
            const U = P.id === "all" ? c.map((z) => z.id) : P.stationIds || [], L = U.filter((z) => d.includes(z)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: P.id, children: [
              P.name,
              " (",
              L,
              "/",
              U.length,
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
        const U = o === P.id, L = P.id === "all" ? c.map((ne) => ne.id) : P.stationIds || [], z = L.length, le = L.filter((ne) => d.includes(ne)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${U ? "active" : ""}`,
            onClick: () => a(P.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: P.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${le > 0 ? "has-selected" : ""}`, children: [
                le,
                "/",
                z
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
          j
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
function jx({
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
function Cx({
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
function Mx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function bx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Dp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Mx(e.bytesRecorded) : "--");
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
      fileSize: v,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: h,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const f = l, p = l + o, y = [];
  for (const h of t) {
    const A = Math.max(h.startEpoch, f), j = Math.min(h.endEpoch, p);
    j > A && y.push({ startEpoch: A, endEpoch: j });
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
  const _ = o > 0 ? M / o * 100 : 0, k = _ > 0 && _ < 1 ? Number(_.toFixed(1)) : Math.min(100, Math.round(_)), x = [];
  let m = f, T = 0;
  for (const h of S) {
    if (h.startEpoch > m + 2e3) {
      const N = (h.startEpoch - m) / o * 100, P = (m - f) / o * 100;
      x.push({
        type: "gap",
        startPct: Math.max(0, P),
        widthPct: Math.min(100, N)
      }), T++;
    }
    const A = (h.endEpoch - h.startEpoch) / o * 100, j = (h.startEpoch - f) / o * 100;
    x.push({
      type: "rec",
      startPct: Math.max(0, j),
      widthPct: Math.min(100, A)
    }), m = h.endEpoch;
  }
  if (m < p - 2e3) {
    const h = (p - m) / o * 100, A = (m - f) / o * 100;
    x.push({
      type: "gap",
      startPct: Math.max(0, A),
      widthPct: Math.min(100, h)
    }), T++;
  }
  const w = T > 0 || k < 100, b = lh(k, w, r);
  return {
    coveragePct: k,
    recordedDuration: Sx(M),
    totalRecordedMs: M,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: w,
    gapsCount: T,
    trafficStatus: b,
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
  onApply: v,
  onOpenRangeModal: f,
  systemTabs: p = Ix,
  recordingSegments: y = {},
  baseEpochMs: S = 0,
  durationMs: M = 0
}) {
  const [_, k] = u.useState([]), [x, m] = u.useState("all"), [T, w] = u.useState(""), [b, h] = u.useState(!0), [A, j] = u.useState("all"), [N, P] = u.useState(null), [U, L] = u.useState(!1), [z, le] = u.useState(15), [ne, V] = u.useState(8), [I, B] = u.useState(1), O = u.useRef(!1), K = u.useRef(null), R = c && r.length === 0, oe = r.length === 0 && !c;
  let q = "is-closed";
  i || oe || R ? q = "is-full-width" : e && (q = "is-open"), u.useLayoutEffect(() => {
    const $ = () => {
      if (!K.current) return;
      const W = K.current.clientHeight;
      if (W <= 0) return;
      const te = K.current.querySelector(".station-row, .hub-table-row"), ee = te ? te.offsetHeight : 40;
      if (ee > 0) {
        const se = Math.floor(W / ee) - 2, ve = [5, 10, 15, 20, 25, 30].filter((lt) => lt <= se).pop() || 5;
        le(ve);
      }
      const Z = K.current.clientWidth;
      if (Z > 0) {
        const ve = Math.max(1, Math.floor((Z + 12) / 252)), st = Math.max(1, Math.floor((W + 12) / (175 + 12))), et = Math.max(ve * st, ve);
        V(et);
      }
    };
    $(), window.addEventListener("resize", $);
    const Q = new ResizeObserver($);
    return K.current && Q.observe(K.current), () => {
      window.removeEventListener("resize", $), Q.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      k(p);
      return;
    }
    if (O.current || !e && !i) return;
    O.current = !0;
    let $ = !0;
    return (async () => {
      L(!0);
      try {
        const W = await fetch("/api/v1/dashboard/tabs");
        if (W.ok && $) {
          const te = await W.json();
          Array.isArray(te) && k(te);
        }
      } catch (W) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", W);
      } finally {
        $ && L(!1);
      }
    })(), () => {
      $ = !1;
    };
  }, [e, i, p]);
  const J = u.useMemo(() => {
    const $ = _.length > 0 ? _ : p;
    if ($ && $.length > 0) {
      const Q = $.map((W) => {
        const te = W.hostnames || W.assignedHostnames || W.stations || W.stationIds || [], ee = r.filter((Z) => {
          const se = (Z.hostname || Z.name || "").trim().toLowerCase();
          return te.some((Ae) => typeof Ae == "string" ? Ae.trim().toLowerCase() === se || se.includes(Ae.trim().toLowerCase()) : (Ae.hostname || Ae.name || "").trim().toLowerCase() === se);
        }).map((Z) => Z.id);
        return {
          id: String(W.id || W.tabId || W.name),
          name: W.name || "Tab",
          stationIds: ee
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((W) => W.id) },
        ...Q.filter((W) => W.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Q) => Q.id) }];
  }, [_, p, r]), Y = u.useMemo(() => J.find(($) => $.id === x) || J[0], [J, x]), Le = u.useMemo(() => !Y || Y.id === "all" ? r.map(($) => $.id) : Y.stationIds || [], [Y, r]), _e = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter(($) => $.isLoaded || $.segments && $.segments.length > 0).length : r.filter(($) => y[$.id] !== void 0 || $.isLoaded).length, [r, y]), je = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && _e < r.length && Object.keys(y).length > 0), [d, c, r.length, _e, y]), Qe = u.useMemo(() => {
    const $ = /* @__PURE__ */ new Map(), Q = { baseEpochMs: S, durationMs: M };
    for (const W of r) {
      const ee = !(y && y[W.id] !== void 0 || W.isLoaded === !0 || W.segments && W.segments.length > 0) && (je || c || d), Z = y && y[W.id] || W.segments || [], se = bx(W, Z, Q);
      $.set(W.id, {
        ...se,
        hasAudio: W.hasAudio !== void 0 ? W.hasAudio : se == null ? void 0 : se.hasAudio,
        audioLabel: W.audioLabel || (W.hasAudio ? "AAC" : (se == null ? void 0 : se.audioLabel) || "NONE"),
        audioChannels: W.audioChannels ? W.audioChannels === 1 ? "Mono" : "Stereo" : se == null ? void 0 : se.audioChannels,
        feedSpec: W.feedSpec || (se == null ? void 0 : se.feedSpec) || `${W.resolution || "1080p"} • ${W.fps || 30}fps`,
        resolution: W.resolution || (se == null ? void 0 : se.resolution) || "1080p",
        fps: W.fps || (se == null ? void 0 : se.fps) || 30,
        isLoading: ee
      });
    }
    return $;
  }, [r, y, S, M, je, c, d]), Me = u.useMemo(() => r.filter(($) => {
    const Q = Qe.get($.id), W = y && y[$.id] && y[$.id].length > 0 || $.segments && $.segments.length > 0, te = Q && (Q.coveragePct > 0 || Q.totalRecordedMs > 0), ee = typeof $.recordingsCount == "number" && $.recordingsCount > 0;
    return Q && !Q.isLoading ? te || W : ee || W;
  }), [r, Qe, y]), be = u.useMemo(() => Me.filter(($) => {
    if (Y.id !== "all" && !Le.includes($.id) || !($.displayName || $.hostname || $.name || "").toLowerCase().includes(T.toLowerCase())) return !1;
    const W = l.includes($.id), te = Qe.get($.id);
    return A === "selected" ? W : A === "unselected" ? !W : A === "gaps" ? te == null ? void 0 : te.hasGaps : A === "audio" ? te == null ? void 0 : te.hasAudio : !0;
  }).sort(($, Q) => b ? ($.displayName || $.hostname || "").localeCompare(Q.displayName || Q.hostname || "") : 0), [Me, Y, Le, T, A, l, b, Qe]), Ze = u.useMemo(() => N !== null ? N : be.length > Tx ? "table" : "grid", [N, be.length]), ot = Ze === "table" ? z : ne, ie = Math.max(1, Math.ceil(be.length / ot));
  u.useEffect(() => {
    B(1);
  }, [x, T, A, Ze]), u.useEffect(() => {
    I > ie && B(ie);
  }, [ie, I]);
  const ke = u.useMemo(() => {
    if (q !== "is-full-width") return be;
    const $ = (I - 1) * ot;
    return be.slice($, $ + ot);
  }, [be, I, ot, q]), ze = () => {
    if (!a) return;
    const $ = Y.id === "all" ? be.map((Q) => Q.id) : Le;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...$])));
  }, He = () => {
    if (!a) return;
    const $ = new Set(
      Y.id === "all" ? be.map((Q) => Q.id) : Le
    );
    a(l.filter((Q) => !$.has(Q)));
  }, ge = Le.filter(($) => l.includes($)).length, he = be.filter(($) => l.includes($.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${q}`, children: [
    q !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => q === "is-closed" && t && t(), children: [
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
              _e,
              "/",
              r.length
            ] })
          ] })
        ] }),
        q === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      q === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: ze,
            disabled: be.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                be.length,
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
            onClick: He,
            disabled: he === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                he,
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
          style: { width: `${r.length > 0 ? _e / r.length * 100 : 0}%` }
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
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: q === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
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
      q === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${je ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: je ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: je ? `ANALYZING TIMELINE ARCHIVES • ${_e} OF ${Me.length} STATIONS SYNCED (${Me.length > 0 ? Math.min(100, Math.round(_e / Me.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${Me.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: je ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(_e / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Ex,
        {
          searchTerm: T,
          onSearchChange: w,
          sortAlpha: b,
          onToggleSort: () => h(!b),
          effectiveTabs: J,
          selectedTabId: x,
          onSelectTab: ($) => {
            m($), P(null);
          },
          isLoadingTabs: U,
          allStations: Me,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: j,
          filteredCount: be.length,
          selectedInTabCount: ge,
          unselectedInTabCount: Le.length - ge,
          activeTabName: Y.name,
          onSelectAllInScope: ze,
          onClearInScope: He,
          viewMode: Ze,
          onViewModeChange: q === "is-full-width" ? P : null,
          isDrawerMode: q !== "is-full-width"
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: ze,
              disabled: be.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  be.length,
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
              onClick: He,
              disabled: he === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  he,
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
      q === "is-full-width" && Ze === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${q === "is-full-width" ? Ze === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: ke.map(($) => {
            const Q = l.includes($.id), W = Qe.get($.id);
            return q === "is-full-width" ? Ze === "grid" ? /* @__PURE__ */ s.jsx(
              Nx,
              {
                station: $,
                isSelected: Q,
                onToggle: o,
                meta: W
              },
              $.id
            ) : /* @__PURE__ */ s.jsx(
              kx,
              {
                station: $,
                isSelected: Q,
                onToggle: o,
                meta: W
              },
              $.id
            ) : /* @__PURE__ */ s.jsx(
              wx,
              {
                station: $,
                isSelected: Q,
                onToggle: o,
                meta: W
              },
              $.id
            );
          })
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsx(
        jx,
        {
          currentPage: I,
          totalPages: ie,
          pageSize: ot,
          totalItems: be.length,
          onPageChange: B,
          onPageSizeChange: ($) => {
            Ze === "table" ? le($) : V($), B(1);
          },
          viewMode: Ze
        }
      ),
      q === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
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
const Ln = (e) => String(e).padStart(2, "0"), $x = [
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
  const [a, i] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: f, m: p, s: y } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const j = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, j[0] || 0)),
      m: Math.min(59, Math.max(0, j[1] || 0)),
      s: Math.min(59, Math.max(0, j[2] || 0))
    };
  }, [e]), S = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const M = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((le) => le.length > 0);
    let P = 0, U = 0, L = 0;
    N.length >= 1 && (P = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (U = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && (L = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const z = l ? `${Ln(P)}:${Ln(U)}:${Ln(L)}` : `${Ln(P)}:${Ln(U)}`;
    i(z), t && t(z, { h: P, m: U, s: L });
  }, _ = (j) => {
    let N = f;
    j === "AM" && f >= 12 ? N = f - 12 : j === "PM" && f < 12 && (N = f + 12);
    const P = l ? `${Ln(N)}:${Ln(p)}:${Ln(y)}` : `${Ln(N)}:${Ln(p)}`;
    i(P), t && t(P, { h: N, m: p, s: y });
  }, k = u.useCallback((j, N) => {
    if (!v.current) return null;
    const P = v.current.getBoundingClientRect(), U = P.left + P.width / 2, L = P.top + P.height / 2, z = j.clientX - U, le = j.clientY - L;
    let ne = Math.atan2(le, z) * 180 / Math.PI + 90;
    if (ne < 0 && (ne += 360), N === "hours") {
      const V = Math.round(ne / 30) % 12;
      return S ? V === 0 ? 12 : V + 12 : V === 0 ? 0 : V;
    }
    return Math.round(ne / 6) % 60;
  }, [S]), x = u.useCallback((j, N) => {
    let P = f, U = p, L = y;
    j === "hours" ? P = N : j === "minutes" ? U = N : j === "seconds" && (L = N);
    const z = l ? `${Ln(P)}:${Ln(U)}:${Ln(L)}` : `${Ln(P)}:${Ln(U)}`;
    i(z), t && t(z, { h: P, m: U, s: L });
  }, [f, p, y, l, t]), m = (j, N) => {
    N.preventDefault(), N.stopPropagation(), d(j);
    const P = k(N, j);
    P !== null && x(j, P);
  };
  u.useEffect(() => {
    if (!c) return;
    const j = (P) => {
      const U = k(P, c);
      U !== null && x(c, U);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", j), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", N);
    };
  }, [c, k, x]);
  const T = u.useMemo(() => f % 12 * 30, [f]), w = u.useMemo(() => p % 60 * 6, [p]), b = u.useMemo(() => y % 60 * 6, [y]), h = S ? Rx : $x, A = u.useMemo(() => {
    const j = [];
    for (let N = 0; N < 60; N++) {
      const P = (N * 6 - 90) * (Math.PI / 180), U = N % 5 === 0, L = 104, z = U ? 93 : 98;
      j.push({
        index: N,
        x1: 110 + z * Math.cos(P),
        y1: 110 + z * Math.sin(P),
        x2: 110 + L * Math.cos(P),
        y2: 110 + L * Math.sin(P),
        isMajor: U
      });
    }
    return j;
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
            onChange: (j) => i(j.target.value),
            onBlur: M,
            onKeyDown: (j) => {
              j.key === "Enter" && j.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: A.map((j) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: j.x1,
              y1: j.y1,
              x2: j.x2,
              y2: j.y2,
              className: `dial-tick ${j.isMajor ? "major" : "minor"}`
            },
            `tick-${j.index}`
          )) }),
          h.map((j) => {
            const N = (j.angle - 90) * (Math.PI / 180), P = 76, U = 110 + P * Math.cos(N), L = 110 + P * Math.sin(N), z = f === j.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: U,
                y: L,
                className: `dial-num ${z ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: j.label
              },
              `dial-h-${j.val}`
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
                    onPointerDown: (j) => m("hours", j)
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
                    onPointerDown: (j) => m("minutes", j)
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
                    onPointerDown: (j) => m("seconds", j)
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
const qo = 7 * 24 * 60 * 60 * 1e3, Yt = (e) => String(e).padStart(2, "0");
function Lx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, p] = u.useState("00:00:00"), [y, S] = u.useState("00:00:00"), [M, _] = u.useState(() => /* @__PURE__ */ new Date()), [k, x] = u.useState(null), [m, T] = u.useState([]), [w, b] = u.useState(!1), [h, A] = u.useState(""), [j, N] = u.useState(1), [P, U] = u.useState(2), [L, z] = u.useState(null), le = u.useCallback(() => {
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
    le();
    let ie = n == null ? void 0 : n.startEpochMs, ke = n == null ? void 0 : n.endEpochMs;
    if (!ie || isNaN(ie))
      if (n != null && n.start) {
        const ge = String(n.start).replace(" ", "T"), he = new Date(ge).getTime();
        ie = isNaN(he) ? Date.now() - 24 * 3600 * 1e3 : he;
      } else
        ke = Date.now(), ie = ke - 24 * 3600 * 1e3;
    if (!ke || isNaN(ke))
      if (n != null && n.end) {
        const ge = String(n.end).replace(" ", "T"), he = new Date(ge).getTime();
        ke = isNaN(he) ? Date.now() : he;
      } else
        ke = ie + 24 * 3600 * 1e3;
    z(null);
    const ze = Lr(ie, o), He = Lr(ke, o);
    c(`${ze.year}-${Yt(ze.month)}-${Yt(ze.day)}`), v(`${He.year}-${Yt(He.month)}-${Yt(He.day)}`), p(`${Yt(ze.hour)}:${Yt(ze.minute)}:${Yt(ze.second)}`), S(`${Yt(He.hour)}:${Yt(He.minute)}:${Yt(He.second)}`), _(new Date(Date.UTC(ze.year, ze.month - 1, 1)));
  }, [e, n, o, le]);
  const ne = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), V = d || i, I = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), B = u.useMemo(() => V ? `${V}T${y}` : "", [V, y]), O = u.useMemo(() => {
    const ie = {};
    return m.forEach((ke) => {
      const ze = ke.startTime || ke.start, He = ke.endTime || ke.end || ze;
      if (!ze) return;
      const ge = String(ze).substring(0, 10), he = String(He).substring(0, 10), [$, Q, W] = ge.split("-").map(Number), [te, ee, Z] = he.split("-").map(Number);
      if (isNaN($) || isNaN(Q) || isNaN(W) || isNaN(te) || isNaN(ee) || isNaN(Z)) return;
      let se = new Date(Date.UTC($, Q - 1, W));
      const Ae = new Date(Date.UTC(te, ee - 1, Z));
      for (; se.getTime() <= Ae.getTime(); ) {
        const ve = `${se.getUTCFullYear()}-${Yt(se.getUTCMonth() + 1)}-${Yt(se.getUTCDate())}`;
        ie[ve] || (ie[ve] = []), ie[ve].push(ke), se.setUTCDate(se.getUTCDate() + 1);
      }
    }), ie;
  }, [m]), K = async (ie, ke) => {
    if (ke && ke.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ze = m.filter((He) => (He.id || He.startTime) !== ie);
    T(ze);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ze)), localStorage.setItem("itb_bookmarks", JSON.stringify(ze)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ze }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${ie}`, { method: "DELETE" });
    } catch {
    }
  }, R = (ie) => {
    const ke = ie.startTime || ie.start, ze = ie.endTime || ie.end;
    if (!ke || !ze) return;
    const He = ke.substring(0, 10), ge = ke.includes("T") ? ke.split("T")[1].substring(0, 8) : "00:00:00", he = ze.substring(0, 10), $ = ze.includes("T") ? ze.split("T")[1].substring(0, 8) : "23:59:59";
    c(He), v(he), p(ge), S($);
    const [Q, W] = He.split("-").map(Number);
    _(new Date(Date.UTC(Q, W - 1, 1))), b(!1);
  }, oe = (ie) => {
    l ? (l(ie), t && t()) : R(ie);
  }, q = u.useMemo(() => {
    if (o === "UTC" || !I.includes("T")) return { isAmbiguous: !1 };
    const [ie, ke] = I.split("T");
    return Ba(ie, ke);
  }, [I, o]), J = u.useMemo(() => {
    if (o === "UTC" || !B.includes("T")) return { isAmbiguous: !1 };
    const [ie, ke] = B.split("T");
    return Ba(ie, ke);
  }, [B, o]), Y = u.useMemo(() => {
    if (!i || !V) return null;
    const ie = $c(i, f, o, j), ke = $c(V, y, o, P);
    return ie === null || ke === null || isNaN(ie) || isNaN(ke) ? null : { startEpoch: ie, endEpoch: ke, durationMs: ke - ie };
  }, [i, f, V, y, o, j, P]), Le = u.useMemo(() => !Y || Y.durationMs <= 0 ? [] : Sp(Y.startEpoch, Y.endEpoch), [Y]), _e = u.useMemo(() => {
    if (!Y || Y.durationMs <= 0) return "0h";
    const ie = Y.durationMs / (1e3 * 60 * 60);
    return ie >= 24 ? `${(ie / 24).toFixed(1)}d (${ie.toFixed(0)}h)` : `${ie.toFixed(1)}h`;
  }, [Y]), je = u.useMemo(() => {
    const ie = M.getUTCFullYear(), ke = M.getUTCMonth(), ze = new Date(Date.UTC(ie, ke, 1)).getUTCDay(), He = new Date(Date.UTC(ie, ke + 1, 0)).getUTCDate(), ge = [];
    for (let he = 0; he < ze; he++) ge.push(null);
    for (let he = 1; he <= He; he++) ge.push(`${ie}-${Yt(ke + 1)}-${Yt(he)}`);
    return ge;
  }, [M]), Qe = (ie) => {
    if (ie) {
      if (z(null), !i || i && d)
        c(ie), v("");
      else if (i && !d)
        if (ie < i)
          c(ie), v("");
        else {
          const ke = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ie + "T00:00:00Z")).getTime() - ke > qo) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const He = new Date(ke + qo);
            v(`${He.getUTCFullYear()}-${Yt(He.getUTCMonth() + 1)}-${Yt(He.getUTCDate())}`);
          } else
            v(ie);
        }
    }
  }, Me = (ie, ke) => {
    z(ke);
    const ze = Date.now(), He = ze - ie, ge = Lr(He, o), he = Lr(ze, o);
    c(`${ge.year}-${Yt(ge.month)}-${Yt(ge.day)}`), v(`${he.year}-${Yt(he.month)}-${Yt(he.day)}`), p(`${Yt(ge.hour)}:${Yt(ge.minute)}:${Yt(ge.second)}`), S(`${Yt(he.hour)}:${Yt(he.minute)}:${Yt(he.second)}`), _(new Date(Date.UTC(ge.year, ge.month - 1, 1)));
  }, be = () => {
    if (ne(), !Y || isNaN(Y.startEpoch) || isNaN(Y.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (Y.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (Y.durationMs > qo) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: I,
      end: B,
      startEpochMs: Y.startEpoch,
      endEpochMs: Y.endEpoch,
      durationMs: Y.durationMs,
      timeMode: o
    }), t && t();
  }, Ze = u.useMemo(() => {
    if (!h.trim()) return m;
    const ie = h.toLowerCase();
    return m.filter(
      (ke) => (ke.title || ke.name || "").toLowerCase().includes(ie) || (ke.startTime || "").includes(ie)
    );
  }, [m, h]);
  if (!e) return null;
  const ot = o === "UTC";
  return Ls.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ie) => ie.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${ot ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: ot ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ot ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${ot ? "active" : ""}`,
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
            onClick: () => Me(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => Me(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => Me(24 * 3600 * 1e3, "24h"),
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
            onClick: () => Me(8 * 3600 * 1e3, "8h"),
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
            Ze.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: Ze.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : Ze.map((ie) => {
          var he;
          const ke = ie.id || ie.startTime, ze = ie.title || ie.name || "Untitled Mission", He = (ie.startTime || "").replace("T", " "), ge = (ie.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => R(ie), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ze }),
                ie.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  ie.cutStationName
                ] }),
                ((he = ie.stationIds) == null ? void 0 : he.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  ie.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                He,
                " ➔ ",
                ge
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: ($) => {
                    $.stopPropagation(), R(ie);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: ($) => {
                    $.stopPropagation(), oe(ie);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: ($) => K(ke, $),
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
            const ze = parseInt(ie.split("-")[2], 10), He = ie === i, ge = ie === (d || i), he = d || k, $ = i && he && ie > i && ie < he, Q = O[ie], W = !!(Q && Q.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${He ? "start-edge" : ""} ${ge ? "end-edge" : ""} ${$ ? "in-range" : ""} ${W ? "has-bookmark" : ""}`,
                onClick: () => Qe(ie),
                onMouseEnter: () => !d && i && x(ie),
                onMouseLeave: () => x(null),
                title: W ? `${Q.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ze }),
                  W && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (te) => {
                        te.stopPropagation(), b(!0), A(ie);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Q.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Q.length })
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
            oh,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (ie) => {
                ne(), p(ie), z(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            oh,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (ie) => {
                ne(), S(ie), z(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (q.isAmbiguous || J.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        q.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
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
                className: j === 1 ? "active" : "",
                onClick: () => N(1),
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
                className: j === 2 ? "active" : "",
                onClick: () => N(2),
                children: [
                  "2nd Occurrence (",
                  q.transition.labelAfter,
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
                onClick: () => U(1),
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
                onClick: () => U(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: Y && Y.durationMs > qo ? "#f43f5e" : "#22d3ee" }, children: _e }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Le.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: be, children: "APPLY SCOPE" })
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
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [p, y] = u.useState(!1), [S, M] = u.useState(null), [_, k] = u.useState(""), x = u.useCallback((L) => {
    Ox.forEach((z) => {
      try {
        localStorage.setItem(z, JSON.stringify(L));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: L }));
  }, []), m = u.useCallback(async () => {
    f(!0);
    try {
      const L = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (L.ok) {
        const z = await L.json(), le = Array.isArray(z) ? z : [];
        i(le), x(le);
        return;
      }
    } catch (L) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", L);
    } finally {
      f(!1);
    }
    try {
      const L = localStorage.getItem(Pp) || localStorage.getItem("itb_studio_bookmarks");
      L && i(JSON.parse(L));
    } catch {
    }
  }, [x]);
  if (u.useEffect(() => {
    e && m();
  }, [e, m]), !e) return null;
  const T = async () => {
    var q, J, Y, Le, _e, je;
    if (!c.trim() || p) return;
    const L = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((q = n == null ? void 0 : n.timeRange) != null && q.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), z = (n == null ? void 0 : n.inPointMs) ?? 0, le = (n == null ? void 0 : n.outPointMs) ?? (((J = n == null ? void 0 : n.timeRange) == null ? void 0 : J.durationMs) || 0), ne = (n == null ? void 0 : n.playheadMs) ?? z, V = L + z, I = L + le, B = L + ne, O = (n == null ? void 0 : n.selectedStationIds) || [], K = (n == null ? void 0 : n.selectedStationNames) || [], R = ((Y = n == null ? void 0 : n.allStationIds) == null ? void 0 : Y.length) > 0 ? n.allStationIds : O, oe = {
      title: c.trim(),
      startTime: ((Le = n == null ? void 0 : n.timeRange) == null ? void 0 : Le.start) || "",
      endTime: ((_e = n == null ? void 0 : n.timeRange) == null ? void 0 : _e.end) || "",
      baseEpochMs: L,
      timelineBaseEpochMs: L,
      inPointMs: z,
      outPointMs: le,
      playheadMs: ne,
      inEpochMs: V,
      outEpochMs: I,
      playheadEpochMs: B,
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
      const Qe = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(oe)
      });
      if (Qe.ok) {
        const Me = await Qe.json(), Ze = [{
          ...oe,
          ...Me.bookmark || {},
          inEpochMs: V,
          outEpochMs: I,
          playheadEpochMs: B,
          selectedStationIds: O,
          selectedStationNames: K,
          allStationIds: R,
          id: ((je = Me.bookmark) == null ? void 0 : je.id) || Me.id || `bm_${Date.now()}`
        }, ...a];
        i(Ze), x(Ze), d("");
      } else
        throw new Error(`Server returned ${Qe.status}`);
    } catch (Qe) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Qe);
      const be = [{
        ...oe,
        inEpochMs: V,
        outEpochMs: I,
        playheadEpochMs: B,
        selectedStationIds: O,
        selectedStationNames: K,
        allStationIds: R,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(be), x(be), d("");
    } finally {
      y(!1);
    }
  }, w = async (L, z) => {
    if (z.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const le = a.filter((ne) => (ne.id || ne.startTime) !== L);
    i(le), x(le);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${L}`, { method: "DELETE" });
    } catch (ne) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", ne);
    }
  }, b = (L, z) => {
    z.stopPropagation(), M(L.id || L.startTime), k(L.title || L.name || "");
  }, h = async (L, z) => {
    if (z && z.stopPropagation(), !_.trim()) return;
    const le = a.find((I) => (I.id || I.startTime) === L), ne = _.trim(), V = a.map(
      (I) => (I.id || I.startTime) === L ? { ...I, title: ne, name: ne } : I
    );
    i(V), x(V), M(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${L}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...le, title: ne })
      });
    } catch (I) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", I);
    }
  }, A = (L) => {
    L.stopPropagation(), M(null);
  }, j = (L) => !L || isNaN(L) ? "--:--:--" : St(L, o), N = (L) => {
    const z = L.startTime || L.StartTime, le = L.endTime || L.EndTime;
    if (!z) return "--";
    const ne = String(z).replace("T", " ").substring(0, 19), V = le ? String(le).replace("T", " ").substring(0, 19) : ne;
    return `${ne} ➔ ${V}`;
  }, P = (L) => {
    let z = L.inEpochMs || L.InEpochMs, le = L.outEpochMs || L.OutEpochMs;
    if (!z || !le) {
      const ne = L.timelineBaseEpochMs || L.baseEpochMs || (L.startTime ? new Date(String(L.startTime).replace(" ", "T")).getTime() : 0), V = L.inPointMs ?? L.InPointMs, I = L.outPointMs ?? L.OutPointMs;
      ne && typeof V == "number" && typeof I == "number" && (V > 0 || I > 0) && (z = ne + V, le = ne + I);
    }
    if (z && le && !isNaN(z) && !isNaN(le) && z > 0) {
      const ne = j(z), V = j(le), I = Math.max(0, le - z), B = Math.floor(I / 6e4), O = Math.floor(B / 60), K = B % 60, R = O > 0 ? `${O}h ${K}m` : `${B}m`;
      return { timeText: `${ne} ➔ ${V}`, duration: R };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, U = (L) => {
    const z = L.selectedStationNames || [], le = L.selectedStationIds || L.cutStationIds || L.stationIds || [];
    return z.length > 0 ? z.join(", ") : le.length > 0 ? le.join(", ") : L.cutStationName ? L.cutStationName : L.activeStationName ? L.activeStationName : "All Stations in Scope";
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
        var B, O, K;
        const z = L.id || L.startTime, le = S === z, ne = P(L), V = U(L), I = ((B = L.allStationIds) == null ? void 0 : B.length) || ((O = L.selectedStationIds) == null ? void 0 : O.length) || ((K = L.stationIds) == null ? void 0 : K.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${le ? "is-editing" : ""}`,
            onClick: () => {
              le || (r && r(L), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                le ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (R) => R.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: _,
                      onChange: (R) => k(R.target.value),
                      onKeyDown: (R) => {
                        R.key === "Enter" && h(z, R), R.key === "Escape" && A(R);
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
                        onClick: (R) => h(z, R),
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
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${V}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: V })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (R) => R.stopPropagation(), children: [
                !le && /* @__PURE__ */ s.jsx(
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
                    onClick: (R) => w(z, R),
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
  outPointMs: v = 36e5,
  isLooping: f = !0,
  recordingSegments: p = {},
  globalGaps: y = [],
  showWatermark: S = !0,
  directorPlan: M,
  onOverrideDisplay: _,
  onResetOverride: k,
  viewMode: x,
  onViewModeChange: m,
  onOpenFullscreen: T,
  isPipSwapped: w,
  onPipSwapChange: b,
  className: h = ""
}) {
  const A = u.useRef(null), j = u.useRef(null), N = u.useRef(null), P = u.useRef(r), U = u.useRef(r), L = u.useRef(r), z = u.useRef(!1), le = u.useRef(null), ne = u.useRef(o), V = u.useRef(!1);
  P.current = r;
  const I = e == null ? void 0 : e.id, B = e && (e.hostname || e.name) || "", O = u.useMemo(() => {
    var Fe, Ge, ut, dt;
    const H = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Fe = e == null ? void 0 : e.displayTopology) == null ? void 0 : Fe.displays) || ((Ge = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ge.Displays) || ((ut = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : ut.Displays) || ((dt = e == null ? void 0 : e.topology) == null ? void 0 : dt.displays) || [];
    if (!Array.isArray(H) || H.length === 0) return [];
    const de = H.length > 1 && H.every((Xe) => (Xe.X ?? Xe.x ?? 0) === 0 && (Xe.Y ?? Xe.y ?? 0) === 0);
    let fe = 0;
    return H.map((Xe, ht) => {
      const jt = Xe.Width || Xe.width || 1920, Mt = Xe.Height || Xe.height || 1080, Ot = de ? fe : Xe.X ?? Xe.x ?? ht * jt, ln = de ? 0 : Xe.Y ?? Xe.y ?? 0;
      de && (fe += jt);
      const Dt = (Xe.displayId ?? Xe.DisplayId ?? `mon-${ht}`).toLowerCase(), zt = Xe.displayNumber ?? Xe.DisplayNumber ?? ht + 1, At = (Xe.displayName || Xe.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${zt}`, An = !!(Xe.isPrimary ?? Xe.IsPrimary ?? ht === 0);
      return {
        ...Xe,
        displayId: Dt,
        DisplayId: Dt,
        displayIndex: ht,
        displayNumber: zt,
        DisplayNumber: zt,
        displayName: At,
        DisplayName: At,
        isPrimary: An,
        IsPrimary: An,
        x: Ot,
        y: ln,
        X: Ot,
        Y: ln,
        width: jt,
        height: Mt,
        Width: jt,
        Height: Mt
      };
    });
  }, [e]), K = O.length > 1, [R, oe] = u.useState(() => {
    if (!K) return "mon-0";
    try {
      const H = localStorage.getItem("itb_solo_viewmode");
      if (H) return H;
    } catch {
    }
    return "canvas";
  }), J = K ? x !== void 0 ? x : R : "mon-0", Y = u.useCallback((H) => {
    const de = typeof H == "function" ? H(J) : H;
    oe(de);
    try {
      localStorage.setItem("itb_solo_viewmode", de);
    } catch {
    }
    m && m(de);
  }, [J, m]), [Le, _e] = u.useState(!1), je = w !== void 0 ? w : Le, Qe = u.useCallback((H) => {
    const de = typeof H == "function" ? H(je) : H;
    _e(de), b && b(de);
  }, [je, b]), Me = u.useMemo(() => {
    const H = M || (e == null ? void 0 : e.directorPlan);
    if (!H || !H.segments || H.segments.length === 0) return null;
    const de = t + r;
    return H.segments.find((fe) => {
      const Fe = fe.startEpochMs ?? fe.StartEpochMs ?? 0, Ge = fe.endEpochMs ?? fe.EndEpochMs ?? 0;
      return de >= Fe && de <= Ge;
    }) || H.segments[0];
  }, [M, e == null ? void 0 : e.directorPlan, t, r]), be = u.useMemo(() => {
    var H, de;
    if (!K) return "mon-0";
    if (J === "split" || J === "pip" || J === "canvas" || J === "all-displays") {
      const fe = (((H = O[0]) == null ? void 0 : H.displayId) ?? "mon-0").toLowerCase(), Fe = (((de = O[1]) == null ? void 0 : de.displayId) ?? "mon-1").toLowerCase();
      return je ? Fe : fe;
    }
    return J !== "director" ? J.toLowerCase() : ((Me == null ? void 0 : Me.targetDisplayId) ?? (Me == null ? void 0 : Me.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [K, J, Me, O, je]), Ze = u.useMemo(() => {
    var de;
    if (!K) return null;
    const H = O.find((fe) => (fe.displayId ?? fe.DisplayId ?? "").toLowerCase() !== be);
    return H ? (H.displayId ?? H.DisplayId).toLowerCase() : (((de = O[1]) == null ? void 0 : de.displayId) || "mon-1").toLowerCase();
  }, [K, O, be]), ot = u.useMemo(() => {
    const H = O.find((fe) => (fe.displayId ?? "").toLowerCase() === (be || "").toLowerCase());
    if (H) return H.displayName || `Screen ${H.displayNumber || 1}`;
    if (be === "mon-0" || be === "0") return "Screen 1";
    if (be === "mon-1" || be === "1") return "Screen 2";
    const de = (be || "").match(/\d+/);
    if (de) {
      const fe = parseInt(de[0], 10);
      return `Screen ${(be || "").startsWith("mon-") ? fe + 1 : fe}`;
    }
    return (be || "Screen 1").toUpperCase();
  }, [O, be]), ie = u.useMemo(() => {
    const H = O.find((de) => (de.displayId ?? "").toLowerCase() === (Ze || "").toLowerCase());
    return H ? H.displayName || `Screen ${H.displayNumber || 2}` : "Screen 2";
  }, [O, Ze]), ke = u.useMemo(() => J !== "director" && J !== "split" && J !== "pip" && J !== "canvas" ? !0 : !!((Me == null ? void 0 : Me.isManualOverride) ?? (Me == null ? void 0 : Me.IsManualOverride)), [J, Me]), [ze, He] = u.useState({}), ge = u.useRef(null), [he, $] = u.useState({ width: 0, height: 0 }), Q = u.useMemo(() => Px(O), [O]);
  u.useEffect(() => {
    if (!K || J !== "canvas" && J !== "all-displays" || o)
      return;
    const H = () => {
      const fe = ge.current;
      if (!fe) return;
      const Fe = 48, Ge = 72, ut = Math.max(100, fe.clientWidth - Fe), dt = Math.max(100, fe.clientHeight - Ge), Xe = Q.totalWidth || 1920, ht = Q.totalHeight || 1080, jt = Xe / ht;
      let Mt = ut, Ot = Mt / jt;
      Ot > dt && (Ot = dt, Mt = Ot * jt), $({ width: Math.round(Mt), height: Math.round(Ot) });
    };
    H();
    const de = new ResizeObserver(H);
    return ge.current && de.observe(ge.current), () => de.disconnect();
  }, [K, J, Q]);
  const W = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!K || J !== "canvas" && J !== "all-displays")
      return;
    let H = !0;
    const de = new AbortController(), fe = W;
    O.forEach((Ge, ut) => {
      const dt = (Ge.displayId ?? Ge.DisplayId ?? `mon-${ut}`).toLowerCase(), Xe = On.get(B, fe, dt);
      Xe ? He((ht) => ({ ...ht, [dt]: Xe })) : On.fetchFrame(B, fe, de.signal, dt).then((ht) => {
        H && ht && He((jt) => ({ ...jt, [dt]: ht }));
      });
    });
    const Fe = On.subscribe((Ge, ut, dt, Xe) => {
      Ge === B && ut === fe && Xe && H && He((ht) => ({ ...ht, [Xe.toLowerCase()]: dt }));
    });
    return () => {
      H = !1, de.abort(), Fe();
    };
  }, [K, J, O, B, W]);
  const te = u.useRef(be), ee = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), Z = t + r, se = u.useMemo(() => ee.length === 0 ? !0 : ee.some((H) => {
    const de = (H.startEpochMs ?? H.startEpoch ?? 0) - 2e3, fe = (H.endEpochMs ?? H.endEpoch ?? 0) + 2e3;
    return Z >= de && Z <= fe;
  }), [ee, Z]), Ae = !se && ee.length > 0, [ve, lt] = u.useState("A"), [st, et] = u.useState(""), [xt, Je] = u.useState(""), [$t, Ut] = u.useState(""), [Ct, Wt] = u.useState(null), [ct, rt] = u.useState(!1), [Ke, Ve] = u.useState(!1), [Rt, Tt] = u.useState(() => {
    if (!B) return null;
    const H = Math.round(t + r);
    return On.get(B, H, be) || null;
  }), [en, Cn] = u.useState(null), Qn = ve === "A" ? A : j, Oe = u.useCallback(() => {
    const H = vl();
    A.current && (A.current.volume = H.volume, A.current.muted = ve !== "A" || H.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, ve === "A" && !H.isMuted && Ua(A.current)), j.current && (j.current.volume = H.volume, j.current.muted = ve !== "B" || H.isMuted, j.current.defaultPlaybackRate = i, j.current.playbackRate = i, ve === "B" && !H.isMuted && Ua(j.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [ve, i]);
  u.useEffect(() => {
    const H = (de) => {
      de.detail && (A.current && (A.current.volume = de.detail.volume), j.current && (j.current.volume = de.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", H), () => window.removeEventListener("itb-audio-state-changed", H);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), j.current && (j.current.defaultPlaybackRate = i, j.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!I || !B) return;
    if (o) {
      ne.current = !0;
      return;
    }
    const H = ne.current;
    ne.current = o;
    let de = !0;
    const fe = new AbortController(), Fe = Math.round(t + r), Ge = On.get(B, Fe, be);
    if (Ge) {
      Tt(Ge);
      return;
    }
    const dt = setTimeout(() => {
      de && On.fetchFrame(B, Fe, fe.signal, be).then((ht) => {
        de && ht && Tt(ht);
      });
    }, H ? 25 : 35), Xe = On.subscribe((ht, jt, Mt, Ot) => {
      ht === B && jt === Fe && (!Ot || Ot === be) && de && Tt(Mt);
    });
    return () => {
      de = !1, clearTimeout(dt), fe.abort(), Xe();
    };
  }, [I, B, t, r, o, ct, be]), u.useEffect(() => {
    if (!K || J !== "split" && J !== "pip" || !Ze || o) {
      Cn(null);
      return;
    }
    let H = !0;
    const de = new AbortController(), fe = Math.round(t + r), Fe = On.get(B, fe, Ze);
    if (Fe) {
      Cn(Fe);
      return;
    }
    const Ge = setTimeout(() => {
      H && On.fetchFrame(B, fe, de.signal, Ze).then((dt) => {
        H && dt && Cn(dt);
      });
    }, 40), ut = On.subscribe((dt, Xe, ht, jt) => {
      dt === B && Xe === fe && (!jt || jt === Ze) && H && Cn(ht);
    });
    return () => {
      H = !1, clearTimeout(Ge), de.abort(), ut();
    };
  }, [K, J, Ze, I, B, t, r]);
  const Re = u.useCallback((H, de = be) => {
    const fe = Math.round(t), Fe = Math.round(t + n), Ge = Math.min(Fe, Math.max(fe, Math.round(t + H)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(B)}&startEpoch=${fe}&endEpoch=${Fe}&seekEpoch=${Ge}&displayId=${encodeURIComponent(de)}&_t=${Date.now()}`;
  }, [t, n, B, be]);
  u.useEffect(() => {
    if (!(!I || !B))
      if (o && se) {
        const H = P.current;
        U.current = H, L.current = H, z.current = !1;
        const de = Re(H, be);
        rt(!1), Ve(!0), lt("A"), et(de), Je(""), Wt(null), Ut((J === "split" || J === "pip") && Ze ? Re(H, Ze) : "");
      } else o || (le.current && clearTimeout(le.current), z.current = !1, et(""), Je(""), Ut(""), Wt(null), rt(!1), Ve(!1), A.current && A.current.pause(), j.current && j.current.pause(), N.current && N.current.pause());
  }, [o, I, B, se, Re, be, J, Ze]), u.useEffect(() => {
    if (te.current !== be && (te.current = be, o && se)) {
      const H = P.current;
      U.current = H;
      const de = Re(H, be);
      rt(!1), Ve(!0), lt("A"), et(de), Je("");
    }
  }, [be, o, se, Re]), u.useEffect(() => {
    if (!I || !B) return;
    const H = Math.abs(r - L.current);
    if (!o || H < 15) {
      L.current = r;
      return;
    }
    return z.current = !0, L.current = r, U.current = r, A.current && A.current.pause(), j.current && j.current.pause(), N.current && N.current.pause(), rt(!1), Ve(!0), le.current && clearTimeout(le.current), le.current = setTimeout(() => {
      if (!se) {
        et(""), Je(""), Ut(""), Ve(!1), z.current = !1;
        return;
      }
      const de = P.current, fe = Re(de, be);
      lt("A"), et(fe), Je(""), Wt(null), (J === "split" || J === "pip") && Ze && Ut(Re(de, Ze));
    }, 75), () => {
      le.current && clearTimeout(le.current);
    };
  }, [r, o, I, B, se, Re, be, J, Ze]), u.useEffect(() => {
    if (!o || !ct || ee.length === 0) return;
    const H = t + P.current, de = ee.map((fe) => ({
      start: fe.startEpochMs ?? fe.startEpoch ?? 0,
      end: fe.endEpochMs ?? fe.endEpoch ?? 0
    })).filter((fe) => fe.start > H + 500).sort((fe, Fe) => fe.start - Fe.start)[0];
    if (de && (!Ct || Ct.start !== de.start)) {
      const fe = de.start - t;
      if (fe < v) {
        const Fe = Re(fe, be);
        Wt({ start: de.start, ms: fe }), ve === "A" ? Je(Fe) : et(Fe);
      }
    }
  }, [o, ct, r, t, v, ee, Ct, ve, Re, be]);
  const tt = u.useCallback(() => {
    if (Ct) {
      const H = ve === "A" ? "B" : "A", de = H === "A" ? A : j;
      lt(H), U.current = Ct.ms, L.current = Ct.ms, Wt(null), de.current && de.current.play().then(() => {
        Oe();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Ct, ve, Oe, f, d, l, a]), ae = u.useCallback(() => {
    const H = Qn.current;
    if (!H || z.current || !o || V.current) return;
    const de = H.currentTime * 1e3, fe = Math.round(U.current + de);
    if (y && y.length > 0) {
      const Fe = t + fe, Ge = y.find((ut) => Fe >= ut.startEpochMs && Fe < ut.endEpochMs);
      if (Ge) {
        V.current = !0;
        const ut = Math.round(Ge.endEpochMs - t) + 10;
        l(ut), setTimeout(() => {
          V.current = !1;
        }, 150);
        return;
      }
    }
    if (fe >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    L.current = fe, l(fe);
  }, [Qn, o, t, y, v, f, d, l, a]), qe = Ke && o && !Ae;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${J} ${h}`, children: [
    K && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (H) => H.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "director" ? "active" : ""}`,
          onClick: () => Y("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "canvas" ? "active" : ""}`,
          onClick: () => Y("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "split" ? "active" : ""}`,
          onClick: () => Y("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "pip" ? "active" : ""}`,
          onClick: () => Y("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      O.map((H, de) => {
        const fe = (H.displayId ?? `mon-${de}`).toLowerCase(), Fe = H.displayNumber ?? de + 1, Ge = H.displayName || `Screen ${Fe}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${J === fe ? "active" : ""}`,
            onClick: () => Y(fe),
            title: `Pin directly to ${Ge}`,
            children: [
              "🖥️ ",
              Fe
            ]
          },
          fe
        );
      }),
      J === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          O.map((H, de) => {
            const fe = (H.displayId ?? `mon-${de}`).toLowerCase(), Fe = H.displayNumber ?? de + 1, Ge = H.displayName || `Screen ${Fe}`, ut = be === fe;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${ut ? "active" : ""} ${ke && ut ? "is-override" : ""}`,
                onClick: () => {
                  _ == null || _(I, t + r, fe);
                },
                title: `Punch ${Ge} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Fe
                  ] }),
                  ut && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: ke ? "✋" : "⚡" })
                ]
              },
              `punch-${fe}`
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
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: J === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : J === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : J === "pip" ? `🪟 PiP MODE: ${ot.toUpperCase()} (HERO)` : `${ke ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${ot.toUpperCase()}` }),
      ke && J === "director" && k && /* @__PURE__ */ s.jsx(
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
    st && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: st,
        className: "feed-video-element",
        style: {
          opacity: ct && ve === "A" ? 1 : 0,
          zIndex: ve === "A" ? 3 : 1,
          pointerEvents: ve === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ve === "A",
        preload: "auto",
        muted: ve !== "A" || vl().isMuted,
        onCanPlay: () => {
          Oe(), o && ve === "A" && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ve === "A" && (z.current = !1, rt(!0), Ve(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          ve === "A" && Ve(!0);
        },
        onTimeUpdate: () => {
          var H;
          ve === "A" && (!ct && ((H = A.current) == null ? void 0 : H.currentTime) > 0 && (z.current = !1, rt(!0), Ve(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), ae());
        },
        onError: () => {
          ve === "A" && (z.current = !1, Ve(!1), rt(!1));
        },
        onEnded: () => {
          ve === "A" && tt();
        }
      }
    ),
    xt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: j,
        src: xt,
        className: "feed-video-element",
        style: {
          opacity: ct && ve === "B" ? 1 : 0,
          zIndex: ve === "B" ? 3 : 1,
          pointerEvents: ve === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: ve === "B",
        preload: "auto",
        muted: ve !== "B" || vl().isMuted,
        onCanPlay: () => {
          Oe(), o && ve === "B" && j.current && j.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ve === "B" && (z.current = !1, rt(!0), Ve(!1), j.current && (j.current.defaultPlaybackRate = i, j.current.playbackRate = i));
        },
        onWaiting: () => {
          ve === "B" && Ve(!0);
        },
        onTimeUpdate: () => {
          var H;
          ve === "B" && (!ct && ((H = j.current) == null ? void 0 : H.currentTime) > 0 && (z.current = !1, rt(!0), Ve(!1), j.current && (j.current.defaultPlaybackRate = i, j.current.playbackRate = i)), ae());
        },
        onError: () => {
          ve === "B" && (z.current = !1, Ve(!1), rt(!1));
        },
        onEnded: () => {
          ve === "B" && tt();
        }
      }
    ),
    J !== "split" && J !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: ct ? 0 : 2 },
        children: Ae ? /* @__PURE__ */ s.jsx(Tp, { isPlaying: o }) : Rt && Rt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
    J === "split" && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Rt && Rt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Rt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        en && en !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: en, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    J === "pip" && K && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (H) => {
          H.stopPropagation(), Qe((de) => !de);
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
          en && en !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: en, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (J === "canvas" || J === "all-displays") && K && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: ge, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: he.width ? `${he.width}px` : "92%",
            height: he.height ? `${he.height}px` : "auto",
            aspectRatio: `${Q.totalWidth} / ${Q.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: O.map((H, de) => {
            const fe = _x(H, Q), Fe = (H.displayId ?? H.DisplayId ?? `mon-${de}`).toLowerCase(), Ge = ze[Fe] || (Fe === be ? Rt : null), ut = !!(H.isPrimary ?? H.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${ut ? "is-primary" : ""}`,
                style: {
                  left: `${fe.leftPct}%`,
                  top: `${fe.topPct}%`,
                  width: `${fe.widthPct}%`,
                  height: `${fe.heightPct}%`
                },
                onClick: (dt) => {
                  dt.stopPropagation(), T ? T(Fe) : Y(Fe);
                },
                title: `Display ${de + 1} (${H.width || 1920}x${H.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      ut ? "★ " : "",
                      "🖥 ",
                      de + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: H.displayName || H.DisplayName || Fe.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      H.width || 1920,
                      "x",
                      H.height || 1080
                    ] }),
                    T && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (dt) => {
                          dt.stopPropagation(), T(Fe);
                        },
                        title: `Open Display ${de + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Ge && Ge !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Ge,
                      className: "canvas-frame-img",
                      alt: Fe
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      H.displayName || Fe.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              Fe
            );
          })
        }
      )
    ] }),
    qe && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          B,
          " • ",
          be.toUpperCase()
        ] })
      ] })
    ] }) }),
    J === "director" && Me && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        be.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        St(Me.startEpochMs ?? Me.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        St(Me.endEpochMs ?? Me.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    K && J !== "canvas" && /* @__PURE__ */ s.jsx(
      Ap,
      {
        displays: O,
        activeDisplayId: be,
        mode: ke ? "MANUAL" : "AUTO",
        activeTimeRange: Me ? `${St(Me.startEpochMs ?? Me.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${St(Me.endEpochMs ?? Me.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (H) => {
          _ && _(I, t + r, H), Y(H);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      B
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
      const d = t[c], v = d.epochMs + fa, f = e - v;
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
  onZoomChange: v,
  onZoomReset: f,
  onFitRange: p,
  onJumpViewportTo: y,
  viewportStartMs: S = 0,
  onViewportStartChange: M,
  playheadMs: _ = 0,
  playheadEpochMs: k = 0,
  setPlayheadMs: x,
  inPointMs: m = 0,
  setInPointMs: T,
  outPointMs: w = 36e5,
  setOutPointMs: b,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: j,
  isPlaying: N,
  setIsPlaying: P,
  isLooping: U = !0,
  setIsLooping: L,
  playbackSpeed: z,
  setPlaybackSpeed: le,
  keystrokeMode: ne = "BURN_IN",
  onChangeKeystrokeMode: V,
  keystrokes: I = [],
  showRulerKeystrokes: B = !1,
  onToggleRulerKeystrokes: O,
  directorPlan: K,
  onOverrideDisplay: R,
  onSplitDirectorSegment: oe,
  onChangeDirectorSegmentDisplay: q,
  onResetDirectorSegmentToAuto: J
}) {
  var en, Cn, Qn;
  const [Y, Le] = u.useState(!1), _e = N !== void 0 ? N : Y, je = u.useCallback((Oe) => {
    const Re = typeof Oe == "function" ? Oe(_e) : Oe;
    P ? P(Re) : Le(Re), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Re } }));
  }, [_e, P]), [Qe, Me] = u.useState(!0), be = U !== void 0 ? U : Qe, Ze = L || Me, [ot, ie] = u.useState(1), ke = z !== void 0 ? z : ot, ze = le || ie, [He, ge] = u.useState(null), [he, $] = u.useState(!1), [Q, W] = u.useState(A), te = ((en = t == null ? void 0 : t.displays) == null ? void 0 : en.length) > 1 || ((Qn = (Cn = t == null ? void 0 : t.topology) == null ? void 0 : Cn.displays) == null ? void 0 : Qn.length) > 1, [ee, Z] = u.useState(() => {
    if (!te) return "mon-0";
    if (n) return n;
    try {
      const Oe = localStorage.getItem("itb_spotlight_viewmode");
      if (Oe) return Oe;
    } catch {
    }
    return "canvas";
  }), se = u.useCallback((Oe) => {
    Z((Re) => {
      const tt = typeof Oe == "function" ? Oe(Re) : Oe;
      try {
        localStorage.setItem("itb_spotlight_viewmode", tt);
      } catch {
      }
      return tt;
    });
  }, []), [Ae, ve] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!te) {
        Z("mon-0");
        return;
      }
      if (n)
        Z(n);
      else
        try {
          const Oe = localStorage.getItem("itb_spotlight_viewmode");
          Z(Oe || "canvas");
        } catch {
          Z("canvas");
        }
    }
  }, [e, n, te, t == null ? void 0 : t.id]);
  const lt = u.useRef(null), st = u.useRef(d);
  st.current = d;
  const et = u.useRef(S);
  et.current = S;
  const xt = u.useRef(c);
  xt.current = c;
  const Je = u.useRef(t && t.id);
  u.useEffect(() => {
    var Oe, Re, tt;
    t && t.id && Je.current !== t.id && (Je.current = t.id, ze(1), ((Oe = t.displays) == null ? void 0 : Oe.length) > 1 || ((tt = (Re = t.topology) == null ? void 0 : Re.displays) == null ? void 0 : tt.length) > 1 || se("mon-0"));
  }, [t, ze]);
  const $t = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Oe = lt.current;
    if (!Oe || !v || !M) return;
    const Re = (tt) => {
      tt.preventDefault(), tt.stopPropagation();
      const ae = tt.ctrlKey || tt.shiftKey, qe = st.current, H = et.current, de = xt.current || 36e5;
      if (ae) {
        const fe = Math.abs(tt.deltaX) > Math.abs(tt.deltaY) ? tt.deltaX : tt.deltaY;
        if (fe === 0) return;
        const Fe = de / qe, Ge = Math.max(0, de - Fe), ut = Fe * 0.08 * (fe > 0 ? 1 : -1), dt = Math.max(0, Math.min(Ge, H + ut));
        et.current = dt, M(dt);
      } else {
        if (tt.deltaY === 0) return;
        const Fe = tt.deltaY < 0 ? 1.25 : 0.8, Ge = Oe.getBoundingClientRect(), ut = Ge.left + 150, dt = Ge.right - 58, Xe = Math.max(100, dt - ut);
        let ht = 0.5;
        tt.clientX >= ut && tt.clientX <= dt ? ht = (tt.clientX - ut) / Xe : Ge.width > 0 && (ht = Math.max(0, Math.min(1, (tt.clientX - Ge.left) / Ge.width)));
        const jt = Math.max(32, de / 2e3), Mt = Math.max(1, Math.min(jt, Math.round(qe * Fe * 100) / 100));
        if (Mt === qe) return;
        const Ot = de / qe, ln = de / Mt, zt = H + ht * Ot - ht * ln, un = Math.max(0, de - ln), Xt = Math.max(0, Math.min(un, zt));
        st.current = Mt, et.current = Xt, M(Xt), v(Mt);
      }
    };
    return Oe.addEventListener("wheel", Re, { passive: !1, capture: !0 }), () => Oe.removeEventListener("wheel", Re, { capture: !0 });
  }, [e, t, v, M]);
  const Ut = u.useCallback(() => {
    f ? f() : (et.current = 0, st.current = 1, M == null || M(0), v == null || v(1));
  }, [f, M, v]), Ct = u.useCallback((Oe, Re) => {
    if (p)
      p(Oe, Re);
    else {
      const tt = Math.max(1e3, Re - Oe), ae = Math.max(500, tt * 0.05), qe = Math.max(0, Oe - ae), de = Math.min(c, Re + ae) - qe, fe = Math.max(32, c / 2e3), Fe = Math.max(1, Math.min(fe, Number((c / de).toFixed(1)))), Ge = c / Fe, ut = Math.max(0, Math.min(qe, c - Ge));
      et.current = ut, st.current = Fe, M == null || M(ut), v == null || v(Fe);
    }
  }, [p, c, M, v]), Wt = u.useCallback((Oe, Re = "center") => {
    if (y)
      y(Oe, Re);
    else {
      if (Oe == null) return;
      const tt = st.current || 1, ae = c / Math.max(1, tt), qe = Re === "start" ? ae / 4 : ae * 0.75, H = Math.max(0, Math.min(Oe - qe, c - ae));
      et.current = H, M == null || M(H);
    }
  }, [y, c, M]), ct = u.useCallback(() => {
    je((Oe) => !Oe);
  }, [je]), rt = u.useCallback(async () => {
    var ae;
    if (!t || Math.abs(w - m) < 1e3) return;
    const Oe = (ne || "NONE").toUpperCase().replace("-", "_");
    let Re;
    Oe === "NONE" || Oe === "OFF" ? Re = "None" : Oe === "CAPTION" ? Re = "Caption" : Re = "BurnIn";
    const tt = {
      createdBy: _p(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(m),
      outEpochMs: a + Math.round(w),
      keystrokeMode: Re,
      layoutMode: te ? ee : "mon-0",
      targetDisplayId: !te || ee === "mon-0" || ee === "mon-1" || ee.startsWith("mon-") ? te ? ee : "mon-0" : null,
      isPipSwapped: Ae,
      directorSegments: te ? (K == null ? void 0 : K.segments) || ((ae = t == null ? void 0 : t.directorPlan) == null ? void 0 : ae.segments) || [] : []
    };
    try {
      j ? await j(tt) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tt)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tt)
      });
    } catch (qe) {
      console.warn("[SoloSpotlightModal] Export trigger error:", qe);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, m, w, a, j, ne, ee, Ae, K]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Oe = (Re) => {
      if ((Re.ctrlKey || Re.metaKey) && (Re.key === "e" || Re.key === "E")) {
        Re.preventDefault(), rt();
        return;
      }
      if (Re.key === "?" || Re.shiftKey && Re.code === "Slash") {
        Re.preventDefault(), $((tt) => !tt);
        return;
      }
      if (he) {
        Re.key === "Escape" && $(!1);
        return;
      }
      if (Re.key === "Escape" || Re.code === "Escape") {
        Re.preventDefault(), Re.stopPropagation(), o == null || o();
        return;
      }
      if (Re.code === "Space") {
        Re.preventDefault(), ct();
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
        const tt = Re.code === "ArrowLeft";
        let ae;
        if (Re.ctrlKey || Re.metaKey)
          ae = 33;
        else if (Re.shiftKey)
          ae = 5e3;
        else {
          const qe = Math.max(1, d);
          ae = Math.max(33, Math.round(1e3 / qe));
        }
        x((qe) => {
          const H = tt ? qe - ae : qe + ae;
          return Math.max(0, Math.min(c, H));
        });
        return;
      }
      if (Re.key === "ArrowDown") {
        Re.preventDefault();
        const tt = r.findIndex((ae) => ae.id === t.id);
        if (tt !== -1) {
          const ae = (tt + 1) % r.length;
          l(r[ae].id);
        }
        return;
      }
      if (Re.key === "ArrowUp") {
        Re.preventDefault();
        const tt = r.findIndex((ae) => ae.id === t.id);
        if (tt !== -1) {
          const ae = (tt - 1 + r.length) % r.length;
          l(r[ae].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Oe, { capture: !0 }), () => window.removeEventListener("keydown", Oe, { capture: !0 });
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
    x,
    rt,
    ct,
    je,
    he
  ]);
  const Ke = r.findIndex((Oe) => Oe.id === (t && t.id)), Ve = r[Ke - 1], Rt = r[Ke + 1];
  if (!e || !t) return null;
  const Tt = k > 0 ? k : Math.round(a + _);
  return Ls.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      He && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${He.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          He.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          He.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          He.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: He.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            ih(w - m),
            " (",
            St(a + m, i),
            " → ",
            St(a + w, i),
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
            playheadMs: _,
            setPlayheadMs: x,
            isPlaying: _e,
            setIsPlaying: je,
            playbackSpeed: ke,
            timeMode: i,
            inPointMs: m,
            outPointMs: w,
            isLooping: be,
            recordingSegments: h,
            globalGaps: Q,
            showWatermark: !0,
            directorPlan: K || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: R,
            onResetOverride: J,
            viewMode: ee,
            onViewModeChange: se,
            isPipSwapped: Ae,
            onPipSwapChange: ve
          }
        ),
        /* @__PURE__ */ s.jsx(
          Bx,
          {
            currentEpochMs: Tt,
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
              onClick: (Oe) => {
                Oe.preventDefault(), Oe.stopPropagation(), o == null || o();
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
              onClick: () => $(!0),
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
              disabled: !Ve,
              onClick: () => Ve && l(Ve.id),
              title: Ve ? `Previous: ${Ve.displayName || Ve.roleAlias || Ve.hostname || Ve.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Ke + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${_e ? "is-playing-dimmed" : ""}`, ref: lt, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: ih(w - m) })
            ] }),
            (() => {
              const Oe = ee === "mon-0" ? "SCREEN 1" : ee === "mon-1" ? "SCREEN 2" : ee.startsWith("mon-") ? `SCREEN ${parseInt(ee.slice(4)) + 1}` : ee.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: rt,
                  title: `Export Selected Cut Window as ${Oe} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: ee === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Oe})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            _c,
            {
              activeStationId: t.id,
              isPlaying: _e,
              setIsPlaying: ct,
              isLooping: be,
              setIsLooping: Ze,
              playbackSpeed: ke,
              onChangeSpeed: ze,
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
                je(!1), x((Oe) => Math.max(0, Oe - 33));
              },
              onStepFrameForward: () => {
                je(!1), x((Oe) => Math.min(c, Oe + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(a + _, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Op,
          {
            stations: $t,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: Ut,
            onFitRange: Ct,
            onJumpViewportTo: Wt,
            viewportStartMs: S,
            onViewportStartChange: M,
            playheadMs: _,
            setPlayheadMs: (Oe) => {
              je(!1), x(Oe);
            },
            inPointMs: m,
            setInPointMs: T,
            outPointMs: w,
            setOutPointMs: b,
            recordingSegments: h,
            onExport: rt,
            onEstimateLoaded: (Oe) => {
              Oe != null && Oe.removedGlobalGaps && W(Oe.removedGlobalGaps);
            },
            keystrokeMode: ne,
            onChangeKeystrokeMode: V,
            keystrokes: I,
            showKeystrokes: B,
            showRulerKeystrokes: B,
            onToggleRulerKeystrokes: O,
            onSplitDirectorSegment: oe,
            onChangeDirectorSegmentDisplay: q,
            onResetDirectorSegmentToAuto: J
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Fp,
        {
          isOpen: he,
          onClose: () => $(!1)
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
          const A = await h.json(), j = Array.isArray(A) ? A : [];
          n(j), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: j }));
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
    const j = () => {
      if (!h) return;
      let P = 2500;
      typeof document < "u" && document.hidden ? P = 3e4 : i.current > 0 && (P = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), j();
      }, P);
    }, N = () => {
      !document.hidden && h && (clearTimeout(A), i.current = 0, p().then(j));
    };
    return document.addEventListener("visibilitychange", N), p().then(j), () => {
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
  }, x = (h, A) => {
    A.stopPropagation(), !(!h || r.has(h)) && (l((j) => new Set(j).add(h)), setTimeout(() => {
      n((j) => {
        const N = j.filter((P) => (P.jobId || P.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: N })), N;
      }), l((j) => {
        const N = new Set(j);
        return N.delete(h), N;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((j) => console.warn("[ExportJobMonitor] Dismiss failed:", j)));
  }, m = async (h, A) => {
    A.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), p();
    } catch (j) {
      console.warn("[ExportJobMonitor] Bookmark failed:", j);
    }
  }, T = (h, A) => {
    A.stopPropagation();
    const j = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    j && (navigator.clipboard.writeText(j), alert(`UNC Directory Path copied to clipboard:
${j}`));
  }, w = (h) => {
    const A = h.jobId || h.id, j = `/api/v1/extractor-advanced/jobs/${A}/download`, N = document.createElement("a");
    N.href = j, N.download = h.fileName || `archive_${A}.tar`, document.body.appendChild(N), N.click(), document.body.removeChild(N), setTimeout(p, 1e3);
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
          const A = h.status === "Completed" || h.isCompleted, j = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", P = h.jobId || h.id, U = r.has(P), L = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${h.status.toLowerCase()} ${h.isBookmarked ? "is-bookmarked" : ""} ${U ? "is-dismissing" : ""}`,
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
                      onClick: (z) => x(P, z),
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
                        onClick: (z) => m(P, z),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (z) => T(h, z),
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
                j && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
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
  }, v = (h, A) => {
    const j = Math.round(h * A / 2073600 * 6 * 10) / 10, N = Math.round(j * 60 / 8 * 10) / 10;
    return `~${j} Mbps (~${N} MB/min)`;
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
  const x = async () => {
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: x, disabled: _, children: _ ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${b.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Kx(e, t, n, r, l = null) {
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
        const x = k.headers.get("content-type");
        if (x && x.includes("application/json")) {
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
            const j = w.map((N) => {
              const P = h.get(N.id);
              return P ? P.isOnline === N.isOnline && P.displayName === N.displayName && P.roleAlias === N.roleAlias && P.feedSpec === N.feedSpec && P.recordingsCount === N.recordingsCount && P.fps === N.fps ? P : (A = !0, { ...P, ...N }) : (A = !0, N);
            });
            return A ? j : b;
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
        const k = e + t, x = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${k}`);
        if (x.ok && M) {
          const m = await x.json() || {}, T = {};
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
    let k = 1 / 0, x = -1 / 0;
    l && (i[l] || []).forEach((w) => {
      const b = w.startEpochMs ?? w.startEpoch ?? 0, h = w.endEpochMs ?? w.endEpoch ?? 0;
      b > 0 && b < k && (k = b), h > 0 && h > x && (x = h);
    });
    const m = (T) => T === 1 / 0 || T === -1 / 0 ? null : Math.max(0, Math.min(t, T - e));
    return {
      globalFirstMs: m(M),
      globalLastMs: m(_),
      currentFirstMs: m(k),
      currentLastMs: m(x)
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
  initialPlaybackSpeed: v = 1,
  isGridMode: f = !1
}) {
  const [p, y] = u.useState(i), [S, M] = u.useState(c), [_, k] = u.useState(d), [x, m] = u.useState(v), T = u.useRef(null), w = u.useRef(null), b = o || l, h = u.useMemo(() => b ? a[b.id] || b.segments || [] : [], [b, a]), A = h.some((U) => {
    const L = U.startEpochMs ?? U.startEpoch ?? 0, z = U.endEpochMs ?? U.endEpoch ?? 0, le = e + p;
    return le >= L && le <= z;
  }), j = !!(!f && b && A);
  u.useEffect(() => {
    y((U) => U < t ? t : U > n ? (M(!1), n) : U);
  }, [t, n]);
  const N = u.useCallback((U) => {
    T.current || (T.current = U);
    const L = (U - T.current) * x, z = Math.min(L, 250 * x);
    T.current = U, y((le) => {
      let ne = le + z;
      if (r && r.length > 0) {
        const V = e + ne, I = r.find((B) => V >= B.startEpochMs && V < B.endEpochMs);
        I && (ne = I.endEpochMs - e);
      }
      return ne >= n && (_ ? ne = t : (M(!1), ne = n)), ne;
    }), S && (!j || f) && (w.current = requestAnimationFrame(N));
  }, [S, _, t, n, r, e, j, x, f]);
  u.useEffect(() => (S && (!j || f) ? (T.current = performance.now(), w.current = requestAnimationFrame(N)) : (w.current && cancelAnimationFrame(w.current), T.current = null), () => {
    w.current && cancelAnimationFrame(w.current);
  }), [S, N, j, f]);
  const P = u.useCallback(() => {
    if (S)
      M(!1);
    else {
      let U = p;
      const L = e + U, z = r == null ? void 0 : r.find((le) => L >= le.startEpochMs && L < le.endEpochMs);
      if (z)
        U = z.endEpochMs - e;
      else if (b && !A) {
        const le = h.map((ne) => ({ start: ne.startEpochMs ?? ne.startEpoch ?? 0, end: ne.endEpochMs ?? ne.endEpoch ?? 0 })).filter((ne) => ne.start > L).sort((ne, V) => ne.start - V.start)[0];
        le && (U = le.start - e);
      }
      U !== p && y(U), M(!0);
    }
  }, [S, p, e, r, b, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: y,
    isPlaying: S,
    setIsPlaying: M,
    isLooping: _,
    setIsLooping: k,
    playbackSpeed: x,
    setPlaybackSpeed: m,
    togglePlaySmart: P
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
  const v = u.useRef(l);
  v.current = l;
  const f = u.useRef(t);
  f.current = t;
  const p = Math.max(32, t / 2e3), y = t / l, S = u.useCallback((x, m = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const T = d.current, w = x - T;
    if (Math.abs(w) < 1) return;
    const b = performance.now(), h = (A) => {
      const j = A - b, N = Math.min(1, j / m);
      i(Math.round(T + w * Yx(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), M = u.useCallback((x, m) => {
    const T = Math.max(1e3, m - x), w = Math.max(500, T * 0.05), b = Math.max(0, x - w), A = Math.min(t, m + w) - b, j = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), N = t / j, P = Math.max(0, Math.min(b, t - N));
    S(P), o(j);
  }, [t, p, S]), _ = u.useCallback(() => {
    S(0), o(1);
  }, [S]), k = u.useCallback((x, m = "center") => {
    if (x == null) return;
    const T = m === "start" ? y / 4 : y * 0.75, w = Math.max(0, Math.min(x - T, t - y));
    S(w);
  }, [y, t, S]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let x = null;
    const m = (w) => {
      if (w.defaultPrevented) return;
      w.preventDefault(), w.stopPropagation();
      const b = w.ctrlKey || w.shiftKey, h = v.current, A = d.current, j = f.current;
      if (b) {
        const N = Math.abs(w.deltaX) > Math.abs(w.deltaY) ? w.deltaX : w.deltaY;
        if (N === 0) return;
        const P = j / Math.max(1, h), U = Math.max(0, j - P), L = P * 0.08 * (N > 0 ? 1 : -1);
        i((z) => Math.max(0, Math.min(U, z + L)));
      } else {
        if (w.deltaY === 0) return;
        const P = w.deltaY < 0 ? 1.25 : 0.8, U = Math.max(32, j / 2e3), L = x ? x.getBoundingClientRect() : { left: 0, width: window.innerWidth }, z = Math.max(0, Math.min(L.width, w.clientX - L.left)), le = L.width > 0 ? z / L.width : 0.5;
        o((ne) => {
          const V = Math.max(1, Math.min(U, Math.round(ne * P * 100) / 100));
          if (V === ne) return ne;
          const I = j / ne, B = j / V, K = A + le * I - le * B, R = Math.max(0, j - B);
          return i(Math.max(0, Math.min(R, K))), V;
        });
      }
    }, T = () => {
      const w = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return w && !x ? (x = w, x.addEventListener("wheel", m, { passive: !1, capture: !0 }), !0) : !!x;
    };
    if (!T()) {
      const w = setInterval(() => {
        T() && clearInterval(w);
      }, 100);
      return () => {
        clearInterval(w), x && x.removeEventListener("wheel", m, { capture: !0 });
      };
    }
    return () => {
      x && x.removeEventListener("wheel", m, { capture: !0 });
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
  outPointMs: v,
  setOutPointMs: f,
  totalTimelineDurationMs: p,
  zoomLevel: y = 1,
  togglePlaySmart: S,
  onToggleHelpModal: M,
  onSplitDirectorAtPlayhead: _,
  isModalActive: k = !1,
  hasGridPlacements: x = !0,
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
            if (h.preventDefault(), !x) return;
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
              const U = Math.max(1, y);
              P = Math.max(33, Math.round(1e3 / U));
            }
            i == null || i((U) => {
              const L = N ? U - P : U + P;
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
    x,
    m,
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
  const e = u.useMemo(() => bg() || {}, []), [t, n] = u.useState(() => {
    var C, re;
    return (C = e.timeRange) != null && C.startEpochMs && ((re = e.timeRange) != null && re.endEpochMs) ? e.timeRange : ch();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    kg().catch((C) => console.warn("[Studio] DST init error:", C));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Kl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), p = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, S] = u.useState(e.selectedStationIds || []), [M, _] = u.useState(e.activeStationId || null), [k, x] = u.useState(null), [m, T] = u.useState(null), [w, b] = u.useState([]), [h, A] = u.useState(!1), [j, N] = u.useState(null), [P, U] = u.useState(() => {
    var C;
    return e.compositionScope || (((C = e.selectedStationIds) == null ? void 0 : C.length) > 1 ? "inter-station" : "intra-station");
  }), [L, z] = u.useState(() => {
    try {
      const C = localStorage.getItem("itb_composition_layout");
      if (C) return C;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), le = u.useCallback((C) => {
    z((re) => {
      const ue = typeof C == "function" ? C(re) : C;
      try {
        localStorage.setItem("itb_composition_layout", ue);
      } catch {
      }
      return ue;
    });
  }, []), [ne, V] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [I, B] = u.useState(() => !!e.isPipSwapped), [O, K] = u.useState(() => e.audioRoutingPlan || null), [R, oe] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [q, J] = u.useState(!1), [Y, Le] = u.useState(null), [_e, je] = u.useState(() => e.canvasLayoutTimeline || null), [Qe, Me] = u.useState(0), be = u.useCallback((C) => {
    je((re) => {
      const ue = [...(re == null ? void 0 : re.keyframes) || []], ye = ue.findIndex((Be) => Math.abs(Be.timestampEpochMs - C) < 300);
      if (ye >= 0)
        return Me(ye), re;
      const Ce = ue[Qe] || ue[0], we = (Ce == null ? void 0 : Ce.layout) || Y || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ie = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(C),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(we))
      }, $e = [...ue, Ie].sort((Be, Ue) => Be.timestampEpochMs - Ue.timestampEpochMs), Ye = $e.findIndex((Be) => Be.timestampEpochMs === Math.round(C));
      return Me(Ye >= 0 ? Ye : 0), {
        ...re || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: $e
      };
    });
  }, [Qe, Y]), Ze = u.useCallback((C, re) => {
    je((ue) => !(ue != null && ue.keyframes) || ue.keyframes.length === 0 ? ue : Oc(ue, C, re));
  }, []), ot = u.useCallback((C) => {
    je((re) => {
      if (!(re != null && re.keyframes) || re.keyframes.length <= 1) return re;
      const ue = re.keyframes.filter((ye, Ce) => Ce !== C);
      return Me((ye) => Math.max(0, ye - 1)), { ...re, keyframes: ue };
    });
  }, []), ie = u.useCallback((C, re) => {
    je((ue) => {
      if (!(ue != null && ue.keyframes) || ue.keyframes.length === 0) return ue;
      const ye = Math.round(re), Ce = typeof C == "number" && ue.keyframes[C] ? C : ue.keyframes.findIndex(($e) => $e.id === C);
      if (Ce === -1) return ue;
      const we = [...ue.keyframes];
      we[Ce] = {
        ...we[Ce],
        timestampEpochMs: ye
      }, we.sort(($e, Ye) => $e.timestampEpochMs - Ye.timestampEpochMs);
      const Ie = we.findIndex(($e) => $e.timestampEpochMs === ye);
      return Ie >= 0 && Me(Ie), {
        ...ue,
        keyframes: we
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [ke, ze] = u.useState({}), He = u.useCallback((C) => {
    S((re) => re.filter((ue) => ue !== C)), M === C && _(null), k === C && x(null), je((re) => {
      if (!re || !re.keyframes) return re;
      const ue = re.keyframes.map((ye) => {
        var Ce;
        return {
          ...ye,
          layout: {
            ...ye.layout,
            placements: (((Ce = ye.layout) == null ? void 0 : Ce.placements) || []).filter((we) => we.stationId !== C)
          }
        };
      });
      return { ...re, keyframes: ue };
    });
  }, [M, k]), ge = u.useCallback((C, re) => {
    C.preventDefault(), C.stopPropagation();
    const ue = 195, ye = 110, Ce = Math.min(C.clientX, window.innerWidth - ue - 10), we = Math.min(C.clientY, window.innerHeight - ye - 10);
    N({ x: Ce, y: we, station: re });
  }, []), he = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, p, v]), $ = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(he + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(he + 1e3, Math.min(p, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, v, t.durationMs, he]), Q = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : he, [e.playheadEpochMs, e.playheadMs, f, p, he]), [W, te] = u.useState(he), [ee, Z] = u.useState($);
  u.useEffect(() => {
    if (!f) return;
    const C = Math.round(f + W), re = Math.round(f + ee);
    je((ue) => {
      var $e, Ye;
      if (!ue || !ue.keyframes || ue.keyframes.length === 0) return ue;
      let ye = [...ue.keyframes], Ce = !1, we = ye.find((Be) => Be.tag === "cut-in");
      if (we)
        we.timestampEpochMs !== C && (we.timestampEpochMs = C, Ce = !0);
      else {
        const Be = ye.find((Ue) => Math.abs(Ue.timestampEpochMs - C) < 500);
        if (Be)
          Be.tag = "cut-in", Be.timestampEpochMs = C, Ce = !0;
        else {
          const Ue = (($e = ye[0]) == null ? void 0 : $e.layout) || Y || { width: 1920, height: 1080, placements: [] };
          ye.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: C,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ue))
          }), Ce = !0;
        }
      }
      let Ie = ye.find((Be) => Be.tag === "cut-out");
      if (Ie)
        Ie.timestampEpochMs !== re && (Ie.timestampEpochMs = re, Ce = !0);
      else {
        const Be = ye.find((Ue) => Math.abs(Ue.timestampEpochMs - re) < 500 && Ue.tag !== "cut-in");
        if (Be)
          Be.tag = "cut-out", Be.timestampEpochMs = re, Ce = !0;
        else {
          const Ue = ((Ye = ye[ye.length - 1]) == null ? void 0 : Ye.layout) || Y || { width: 1920, height: 1080, placements: [] };
          ye.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: re,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ue))
          }), Ce = !0;
        }
      }
      return Ce ? (ye.sort((Be, Ue) => Be.timestampEpochMs - Ue.timestampEpochMs), {
        ...ue,
        keyframes: ye
      }) : ue;
    });
  }, [f, W, ee, Y]);
  const { allStations: se, recordingSegments: Ae, isLoadingStations: ve, movieBoundaries: lt } = Kx(
    f,
    p,
    t,
    r,
    M
  ), st = u.useMemo(() => se.find((C) => C.id === M) || null, [se, M]), et = u.useCallback((C) => {
    ze((re) => {
      const ue = !(re[C] ?? !0);
      return je((ye) => {
        if (!(ye != null && ye.keyframes)) return ye;
        const Ce = ye.keyframes.map((we) => {
          var Be;
          const Ie = ((Be = we.layout) == null ? void 0 : Be.placements) || [];
          let $e = !1;
          const Ye = Ie.map((Ue) => {
            if (Ue.stationId === C) {
              if (!ue && (Ue.displayId === "auto" || !Ue.displayId)) {
                $e = !0;
                const at = se.find((nt) => nt.id === C);
                return {
                  ...Ue,
                  displayId: "mon-0",
                  label: `${(at == null ? void 0 : at.displayName) || C} - Screen 1 (Main)`
                };
              } else if (ue && (Ue.displayId === "mon-0" || !Ue.displayId) && Ie.filter((nt) => nt.stationId === C).length === 1) {
                $e = !0;
                const nt = se.find((bt) => bt.id === C);
                return {
                  ...Ue,
                  displayId: "auto",
                  label: `${(nt == null ? void 0 : nt.displayName) || C} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ue;
          });
          return $e ? {
            ...we,
            layout: {
              ...we.layout,
              placements: Ye
            }
          } : we;
        });
        return { ...ye, keyframes: Ce };
      }), {
        ...re,
        [C]: ue
      };
    });
  }, [se]), xt = u.useCallback((C, re) => {
    je((ue) => {
      var Ue, at;
      if (!ue || !ue.keyframes || ue.keyframes.length === 0) return ue;
      const ye = Qe >= 0 && Qe < ue.keyframes.length ? Qe : 0, Ce = ue.keyframes[ye], we = ((Ue = Ce == null ? void 0 : Ce.layout) == null ? void 0 : Ue.placements) || [], Ie = (re || "mon-0").toLowerCase(), $e = we.findIndex((nt) => {
        if (nt.stationId !== C) return !1;
        const bt = (nt.displayId || "mon-0").toLowerCase();
        return bt === Ie || bt === "auto" && (Ie === "mon-0" || Ie === "screen-0");
      });
      let Ye;
      if ($e >= 0)
        Ye = we.filter((nt, bt) => bt !== $e);
      else {
        const nt = se.find((Rl) => Rl.id === C), bt = ((at = nt == null ? void 0 : nt.displays) == null ? void 0 : at.find((Rl) => (Rl.displayId || "").toLowerCase() === Ie)) || { width: 1920, height: 1080 }, on = bt.width || 1920, Vt = bt.height || 1080, mn = on / Vt, xs = mn >= 1 ? 640 : Math.round(360 * mn), Cr = mn >= 1 ? Math.round(640 / mn) : 360, Vr = {
          stationId: C,
          displayId: Ie,
          label: `${(nt == null ? void 0 : nt.displayName) || C} - ${bt.displayName || Ie}`,
          x: 120 + we.length * 40 % 800,
          y: 100 + we.length * 40 % 500,
          width: xs,
          height: Cr,
          sourceWidth: on,
          sourceHeight: Vt,
          nativeAspectRatio: mn,
          aspectRatio: mn,
          zIndex: we.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ye = [...we, Vr];
      }
      const Be = [...ue.keyframes];
      return Be[ye] = {
        ...Be[ye],
        layout: {
          ...Be[ye].layout,
          placements: Ye
        }
      }, { ...ue, keyframes: Be };
    });
  }, [Qe, se]), Je = u.useMemo(() => !y || y.length === 0 ? [] : se.filter((C) => y.includes(C.id)), [se, y]);
  u.useEffect(() => {
    !f || isNaN(f) || je((C) => {
      if (C != null && C.keyframes && C.keyframes.length > 0) return C;
      const re = f + (W || 0), ue = f + (ee || p || 36e5), ye = Y || {
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
            id: `kf_root_${re}`,
            timestampEpochMs: Math.round(re),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ye))
          },
          {
            id: `kf_out_${ue}`,
            timestampEpochMs: Math.round(ue),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(ye))
          }
        ]
      };
    });
  }, [f, W, ee, p, Y]), u.useEffect(() => {
    if (!Je || Je.length === 0 || !f || isNaN(f)) return;
    const C = f + (W || 0), re = f + (ee || p || 36e5);
    re <= C || Je.forEach((ue) => {
      pa.fetchWaveform(ue.id, C, re, null, 250);
    });
  }, [Je, f, W, ee, p]);
  const $t = u.useMemo(() => se.find((C) => C.id === k) || null, [se, k]), Ut = !!(k && $t), Ct = u.useRef("grid"), Wt = u.useRef(null), {
    playheadMs: ct,
    setPlayheadMs: rt,
    isPlaying: Ke,
    setIsPlaying: Ve,
    playbackSpeed: Rt,
    setPlaybackSpeed: Tt,
    isLooping: en,
    setIsLooping: Cn,
    togglePlaySmart: Qn
  } = Vx({
    timelineBaseEpochMs: f,
    inPointMs: W,
    outPointMs: ee,
    globalGaps: w,
    activeStation: st,
    spotlightStation: $t,
    recordingSegments: Ae,
    initialPlayheadMs: Q,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !M
  }), {
    zoomLevel: Oe,
    setZoomLevel: Re,
    viewportStartMs: tt,
    setViewportStartMs: ae,
    resetZoom: qe,
    fitRange: H,
    jumpViewportTo: de
  } = Gx({
    containerRef: Wt,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [fe, Fe] = u.useState(!1), [Ge, ut] = u.useState(!1), [dt, Xe] = u.useState(!1), [ht, jt] = u.useState(!1), [Mt, Ot] = u.useState(
    !!(e.isWorkspaceActive && ((Al = e.selectedStationIds) == null ? void 0 : Al.length) > 0)
  ), [ln, Dt] = u.useState([]);
  u.useEffect(() => {
    const C = Ut && $t || st, re = (C == null ? void 0 : C.hostname) || (C == null ? void 0 : C.displayName) || (C == null ? void 0 : C.id), ue = (o || "NONE").toUpperCase().replace("-", "_");
    if (!re || !f || !(ue !== "NONE" && ue !== "OFF" || i)) {
      Dt([]);
      return;
    }
    const Ce = Math.max(0, f - 5e3), we = f + p + 5e3, Ie = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(re)}&startEpoch=${Ce}&endEpoch=${we}`, { signal: Ie.signal }).then(($e) => $e.ok ? $e.json() : []).then(($e) => Dt(Array.isArray($e) ? $e : [])).catch(($e) => {
      $e.name !== "AbortError" && Dt([]);
    }), () => Ie.abort();
  }, [st, $t, Ut, f, p, o, i]), u.useEffect(() => {
    ve || (se.length === 0 ? ((y.length > 0 || M || Mt) && (S([]), _(null), x(null), Ot(!1)), jt(!0), A(!0)) : (A(!1), S((C) => {
      const re = C.filter((ue) => se.some((ye) => ye.id === ue));
      return re.length !== C.length ? (re.length === 0 && (Ot(!1), jt(!0)), re) : C;
    })));
  }, [ve, se]);
  const zt = u.useCallback((C) => {
    if (C === null) {
      Ve(!1), Tt(1), _(null);
      return;
    }
    C !== M && Tt(1), _(C);
  }, [M, Ve, Tt]), un = u.useCallback((C, re = null) => {
    C !== M && Tt(1), Ct.current = y.length <= 1 || M ? "spotlight" : "grid", _(C), x(C), T(re || null);
  }, [M, y.length, Tt]), Xt = u.useCallback(() => {
    x(null), T(null), Ct.current === "grid" && _(null);
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
  }, [O, y, M, f, p]), An = u.useCallback((C) => {
    K((re) => {
      const ue = re || At, ye = [...ue.segments || []], Ce = ye.findIndex((at) => {
        const nt = at.startEpochMs ?? at.StartEpochMs ?? 0, bt = at.endEpochMs ?? at.EndEpochMs ?? 0;
        return C > nt + 500 && C < bt - 500;
      });
      if (Ce === -1) return re;
      const we = ye[Ce], Ie = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0, Ye = we.sourceStationId ?? we.SourceStationId ?? y[0], Be = { startEpochMs: Ie, endEpochMs: C, sourceStationId: Ye }, Ue = { startEpochMs: C, endEpochMs: $e, sourceStationId: Ye };
      return ye.splice(Ce, 1, Be, Ue), { ...ue, segments: ye };
    });
  }, [At, y]), gs = u.useCallback((C, re) => {
    K((ue) => {
      const ye = ue || At, Ce = (ye.segments || []).map((we) => {
        const Ie = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0;
        return C >= Ie && C <= $e ? { ...we, sourceStationId: re } : we;
      });
      return { ...ye, segments: Ce };
    }), oe(!1);
  }, [At]), Ss = u.useCallback((C, re) => {
    K((ue) => {
      const ye = ue || At, Ce = (ye.segments || []).map((we) => {
        const Ie = we.startEpochMs ?? we.StartEpochMs ?? 0, $e = we.endEpochMs ?? we.EndEpochMs ?? 0;
        return C >= Ie && C <= $e ? { ...we, gain: re } : we;
      });
      return { ...ye, segments: Ce };
    });
  }, [At]), Kr = u.useCallback(() => {
    oe((C) => !C);
  }, []), [Bn, Gs] = u.useState({}), Pt = u.useCallback((C) => {
    if (!C) return null;
    if (Bn[C]) return Bn[C];
    const re = se.find((ue) => ue.id === C);
    return re != null && re.directorPlan ? re.directorPlan : {
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
  }, [Bn, se, f, p]), Kt = u.useCallback((C, re) => {
    C && Gs((ue) => {
      const ye = ue[C] || Pt(C), Ce = [...ye.segments || []], we = Ce.findIndex((bt) => {
        const on = bt.startEpochMs ?? bt.StartEpochMs ?? 0, Vt = bt.endEpochMs ?? bt.EndEpochMs ?? 0;
        return re > on + 500 && re < Vt - 500;
      });
      if (we === -1) return ue;
      const Ie = Ce[we], $e = Ie.startEpochMs ?? Ie.StartEpochMs ?? 0, Ye = Ie.endEpochMs ?? Ie.EndEpochMs ?? 0, Be = Ie.targetDisplayId ?? Ie.TargetDisplayId ?? "mon-0", Ue = !!(Ie.isManualOverride ?? Ie.IsManualOverride), at = { ...Ie, startEpochMs: $e, endEpochMs: re, targetDisplayId: Be, isManualOverride: Ue }, nt = { ...Ie, startEpochMs: re, endEpochMs: Ye, targetDisplayId: Be, isManualOverride: Ue };
      return Ce.splice(we, 1, at, nt), { ...ue, [C]: { ...ye, segments: Ce } };
    });
  }, [Pt]), as = u.useCallback((C, re, ue) => {
    C && Gs((ye) => {
      const Ce = ye[C] || Pt(C), we = [...Ce.segments || []];
      let Ie = we.findIndex((Ye) => {
        const Be = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Ue = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0;
        return re > Be && re < Ue;
      });
      if (Ie === -1 && (Ie = we.findIndex((Ye) => {
        const Be = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Ue = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0;
        return re >= Be && re <= Ue;
      })), Ie === -1) return ye;
      const $e = we[Ie];
      return we[Ie] = { ...$e, targetDisplayId: ue, isManualOverride: !0 }, { ...ye, [C]: { ...Ce, segments: we } };
    });
  }, [Pt]), Un = u.useCallback((C, re) => {
    if (!C) return;
    const ue = se.find((Ce) => Ce.id === C), ye = ue == null ? void 0 : ue.directorPlan;
    Gs((Ce) => {
      var on;
      const we = Ce[C] || Pt(C), Ie = [...we.segments || []];
      let $e = Ie.findIndex((Vt) => {
        const mn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return re > mn && re < xs;
      });
      if ($e === -1 && ($e = Ie.findIndex((Vt) => {
        const mn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return re >= mn && re <= xs;
      })), $e === -1) return Ce;
      const Ye = Ie[$e], Be = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Ue = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0, at = (Be + Ue) / 2, nt = (on = ye == null ? void 0 : ye.segments) == null ? void 0 : on.find((Vt) => {
        const mn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return at >= mn && at <= xs;
      }), bt = nt ? nt.targetDisplayId ?? nt.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ie[$e] = { ...Ye, targetDisplayId: bt, isManualOverride: !1 }, { ...Ce, [C]: { ...we, segments: Ie } };
    });
  }, [se, Pt]);
  u.useEffect(() => {
    if (!Je || Je.length === 0 || isNaN(f)) return;
    const C = f + W, re = f + ee;
    if (re <= C) return;
    const ue = setTimeout(async () => {
      const ye = Je.filter((Ce) => {
        var Ie;
        return (Ce.displays || Ce.Displays || ((Ie = Ce.displayTopology) == null ? void 0 : Ie.displays) || []).length > 1;
      });
      if (ye.length !== 0)
        for (const Ce of ye)
          try {
            const we = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(Ce.id)}&startEpoch=${C}&endEpoch=${re}`);
            if (we.ok) {
              const Ie = await we.json();
              Ie != null && Ie.segments && Ie.segments.length > 0 && Gs(($e) => {
                const Ye = $e[Ce.id] || Ce.directorPlan, Be = ((Ye == null ? void 0 : Ye.segments) || []).filter((at) => at.isManualOverride || at.IsManualOverride);
                if (Be.length === 0)
                  return { ...$e, [Ce.id]: Ie };
                const Ue = [...Ie.segments];
                return Be.forEach((at) => {
                  const nt = at.startEpochMs ?? at.StartEpochMs, bt = at.endEpochMs ?? at.EndEpochMs;
                  for (let on = Ue.length - 1; on >= 0; on--) {
                    const Vt = Ue[on].startEpochMs ?? Ue[on].StartEpochMs, mn = Ue[on].endEpochMs ?? Ue[on].EndEpochMs;
                    if (!(mn <= nt || Vt >= bt))
                      if (Vt >= nt && mn <= bt)
                        Ue.splice(on, 1);
                      else if (Vt < nt && mn > bt) {
                        const xs = { ...Ue[on], endEpochMs: nt }, Cr = { ...Ue[on], startEpochMs: bt };
                        Ue.splice(on, 1, xs, Cr);
                      } else Vt < nt ? Ue[on].endEpochMs = nt : mn > bt && (Ue[on].startEpochMs = bt);
                  }
                  Ue.push(at);
                }), Ue.sort((at, nt) => (at.startEpochMs ?? at.StartEpochMs) - (nt.startEpochMs ?? nt.StartEpochMs)), { ...$e, [Ce.id]: { ...Ie, segments: Ue } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(ue);
  }, [W, ee, Je, f]);
  const Er = u.useMemo(() => Je.map((C) => ({
    ...C,
    directorPlan: Bn[C.id] || C.directorPlan || Pt(C.id)
  })), [Je, Bn, Pt]), Sn = u.useMemo(() => st ? {
    ...st,
    directorPlan: Bn[st.id] || st.directorPlan || Pt(st.id)
  } : null, [st, Bn, Pt]), Ms = u.useMemo(() => $t ? {
    ...$t,
    directorPlan: Bn[$t.id] || $t.directorPlan || Pt($t.id)
  } : null, [$t, Bn, Pt]), De = (C, re = 30) => {
    const ue = Math.max(0, C), ye = Math.floor(ue / 1e3), Ce = Math.floor(ye / 3600), we = Math.floor(ye % 3600 / 60), Ie = ye % 60, $e = Math.floor(ue % 1e3 / 1e3 * re), Ye = (Be) => String(Be).padStart(2, "0");
    return `${Ye(Ce)}:${Ye(we)}:${Ye(Ie)}.${Ye($e)}`;
  }, [Se, Os] = u.useState(!1), [To, jr] = u.useState(!0), [Ao, $o] = u.useState(!1), Jn = u.useRef(null), dn = u.useMemo(() => {
    var ye;
    const C = _e == null ? void 0 : _e.keyframes, re = (C == null ? void 0 : C[Qe]) || (C == null ? void 0 : C[0]);
    return (((ye = re == null ? void 0 : re.layout) == null ? void 0 : ye.placements) || (Y == null ? void 0 : Y.placements) || []).length > 0 || y && y.length > 0;
  }, [_e, Qe, Y, y]), Zt = u.useCallback(() => {
    Jn.current && clearTimeout(Jn.current), jr(!0), Jn.current = setTimeout(() => {
      Ao || jr(!1);
    }, 2500);
  }, [Ao]);
  u.useEffect(() => {
    if (!Se) {
      jr(!0), Jn.current && clearTimeout(Jn.current);
      return;
    }
    const C = (re) => {
      re.clientY >= window.innerHeight - 280 && jr(!0), Zt();
    };
    return window.addEventListener("mousemove", C, { passive: !0 }), Zt(), () => {
      window.removeEventListener("mousemove", C), Jn.current && clearTimeout(Jn.current);
    };
  }, [Se, Zt]);
  const yn = u.useCallback(() => {
    Os((C) => {
      const re = !C;
      return re ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), re;
    });
  }, []), fn = u.useCallback(() => {
    Os(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const C = () => {
      !document.fullscreenElement && Se && Os(!1);
    };
    return document.addEventListener("fullscreenchange", C), () => document.removeEventListener("fullscreenchange", C);
  }, [Se]), Xx({
    activeStationId: M,
    spotlightStationId: k,
    timelineStations: Er,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: zt,
    setPlaybackSpeed: Tt,
    playheadMs: ct,
    setPlayheadMs: rt,
    inPointMs: W,
    setInPointMs: te,
    outPointMs: ee,
    setOutPointMs: Z,
    totalTimelineDurationMs: p,
    zoomLevel: Oe,
    togglePlaySmart: Qn,
    onToggleHelpModal: () => Xe((C) => !C),
    onSplitDirectorAtPlayhead: () => {
      var re, ue, ye;
      const C = M || (y.length === 1 ? y[0] : null);
      if (C) {
        const Ce = se.find((Ie) => Ie.id === C);
        (((re = Ce == null ? void 0 : Ce.displays) == null ? void 0 : re.length) > 1 || ((ye = (ue = Ce == null ? void 0 : Ce.topology) == null ? void 0 : ue.displays) == null ? void 0 : ye.length) > 1) && Kt(C, f + ct);
      }
    },
    isModalActive: fe || Ge || dt,
    hasGridPlacements: dn,
    onToggleGridFullscreen: yn,
    isGridFullscreen: Se,
    onExitGridFullscreen: fn
  }), u.useEffect(() => {
    const C = f + W, re = f + ee, ue = f + ct;
    Ip({
      timeRange: t,
      timeMode: r,
      inPointMs: W,
      outPointMs: ee,
      playheadMs: Math.round(ct),
      inEpochMs: C,
      outEpochMs: re,
      playheadEpochMs: ue,
      selectedStationIds: y,
      activeStationId: M,
      zoomLevel: Oe,
      viewportStartMs: tt,
      isWorkspaceActive: Mt,
      isLooping: en,
      playbackSpeed: Rt,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: P,
      compositionLayout: L,
      isAutoDirectorEnabled: ne,
      isPipSwapped: I,
      audioRoutingPlan: At,
      isAutoFollowAudio: R,
      canvasLayoutTimeline: _e
    });
  }, [
    t,
    r,
    W,
    ee,
    ct,
    y,
    M,
    Oe,
    tt,
    Mt,
    en,
    Rt,
    f,
    o,
    i,
    P,
    L,
    ne,
    I,
    At,
    R,
    _e
  ]);
  const kn = u.useCallback((C) => {
    var Be, Ue;
    const re = Kl(C.startTime), ue = Kl(C.endTime), ye = Math.max(0, ue - re) || 144e5, Ce = {
      start: C.startTime,
      end: C.endTime,
      durationMs: ye,
      startEpochMs: re,
      endEpochMs: ue
    }, we = Math.max(6e4, Math.round(ye * 0.05)), Ie = re - we, $e = ye + 2 * we;
    if (n(Ce), C.inEpochMs && C.outEpochMs) {
      const at = Math.max(0, Math.min($e, C.inEpochMs - Ie)), nt = Math.max(at + 1e3, Math.min($e, C.outEpochMs - Ie)), bt = C.playheadEpochMs ? Math.max(0, Math.min($e, C.playheadEpochMs - Ie)) : at;
      te(at), Z(nt), rt(bt);
    } else {
      const at = typeof C.inPointMs == "number" ? C.inPointMs : we, nt = typeof C.outPointMs == "number" ? C.outPointMs : we + ye, bt = typeof C.playheadMs == "number" ? C.playheadMs : at;
      te(Math.max(0, Math.min($e, at))), Z(Math.max(0, Math.min($e, nt))), rt(Math.max(0, Math.min($e, bt)));
    }
    const Ye = ((Be = C.selectedStationIds) == null ? void 0 : Be.length) > 0 ? C.selectedStationIds : ((Ue = C.cutStationIds) == null ? void 0 : Ue.length) > 0 ? C.cutStationIds : C.stationIds;
    if ((Ye == null ? void 0 : Ye.length) > 0) {
      S(Ye);
      const at = C.spotlightStationId || C.SpotlightStationId || null, nt = C.activeStationId || C.ActiveStationId || null;
      at && Ye.includes(at) ? (_(at), x(at)) : nt && Ye.includes(nt) ? (_(nt), x(null)) : (_(null), x(null));
    }
    C.keystrokeMode && a(C.keystrokeMode), Ot(!0), jt(!1);
  }, []), Ro = u.useCallback((C) => {
    const re = C.startEpochMs || Kl(C.start, null, r), ue = C.endEpochMs || Kl(C.end, null, r), ye = Math.max(0, ue - re) || 144e5, Ce = Math.max(6e4, Math.round(ye * 0.05)), we = re - Ce, Ie = ye + 2 * Ce;
    n({
      ...C,
      startEpochMs: re,
      endEpochMs: ue,
      durationMs: ye
    }), A(!1), te(Ce), Z(Ce + ye), rt(Ce), je(($e) => {
      if (!($e != null && $e.keyframes) || $e.keyframes.length === 0) return $e;
      const Ye = $e.keyframes.map((Be, Ue) => Ue === 0 ? { ...Be, timestampEpochMs: we } : Be).filter((Be) => Be.timestampEpochMs >= we && Be.timestampEpochMs <= we + Ie);
      return { ...$e, keyframes: Ye };
    }), K(($e) => {
      if (!($e != null && $e.segments) || $e.segments.length === 0) return $e;
      if (!$e.segments.some((Be) => {
        const Ue = Be.startEpochMs ?? Be.StartEpochMs ?? 0;
        return (Be.endEpochMs ?? Be.EndEpochMs ?? 0) > we && Ue < we + Ie;
      })) {
        const Be = y[0] || M || "station-0";
        return {
          segments: [
            {
              startEpochMs: we,
              endEpochMs: we + Ie,
              sourceStationId: Be
            }
          ]
        };
      }
      return $e;
    }), Gs({});
  }, [r, y, M]), pn = u.useCallback(() => {
    if (Je.map((re) => re.id).length === 0) return alert("No active stations selected in timeline.");
    J(!0);
  }, [Je]), Wn = u.useCallback(async (C, re) => {
    var Ie, $e, Ye, Be;
    const ue = Je.map((Ue) => Ue.id);
    if (ue.length === 0) return;
    let ye = C === "None" ? "None" : "BurnIn";
    const Ce = re || "NATIVE", we = ((Ie = Sn == null ? void 0 : Sn.displays) == null ? void 0 : Ie.length) > 1 || ((Ye = ($e = Sn == null ? void 0 : Sn.topology) == null ? void 0 : $e.displays) == null ? void 0 : Ye.length) > 1 ? ((Be = Sn == null ? void 0 : Sn.directorPlan) == null ? void 0 : Be.segments) || [] : [];
    try {
      const Ue = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: _p(),
          stationIds: ue,
          inEpochMs: f + W,
          outEpochMs: f + ee,
          keystrokeMode: ye,
          resolution: Ce,
          videoQuality: Ce,
          compositionScope: P,
          layoutMode: "canvas",
          canvasLayout: Y,
          canvasLayoutTimeline: _e,
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
      if (!Ue.ok) throw new Error(`HTTP ${Ue.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (Ue) {
      console.error("[Studio] Export failed:", Ue), alert("Failed to launch background master MP4 export job.");
    }
  }, [Je, f, W, ee, P, Y, _e, I, ne, Sn, At]), me = u.useCallback(() => {
    Ig();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const C = ch(), re = Math.max(6e4, Math.round(C.durationMs * 0.05));
    n(C), te(re), Z(re + C.durationMs), rt(re), S([]), _(null), x(null), Ve(!1), Tt(1), a("BURN_IN"), qe(), Ot(!1), jt(!0);
  }, [qe, Ve, Tt, rt]), Zn = !Mt || y.length === 0, $n = f + ct;
  return u.useEffect(() => {
    const C = _e == null ? void 0 : _e.keyframes;
    if (!C || C.length === 0) return;
    let re = 0;
    for (let ue = 0; ue < C.length && C[ue].timestampEpochMs <= $n + 50; ue++)
      re = ue;
    re !== Qe && Me(re);
  }, [$n, _e == null ? void 0 : _e.keyframes, Qe]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Cg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: M,
          hideBackToGrid: Je.length <= 1,
          onResetActiveStation: () => zt(null),
          onOpenRangeModal: () => Fe(!0),
          onOpenBookmarksModal: () => ut(!0),
          onOpenHelpModal: () => Xe(!0),
          onToggleDrawer: () => jt(!ht),
          isInitialSetup: Zn,
          selectedCount: y.length,
          totalCount: se.length,
          onResetStudio: me
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
              onClick: () => Fe(!0),
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${Se ? "cinema-fullscreen-mode" : ""}`, children: [
        Se && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${To ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: fn,
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
                onClick: () => Xe(!0),
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
              Vg,
              {
                activeStation: Sn,
                timelineStations: Er,
                allStations: se,
                onSelectActiveStation: zt,
                onOpenSpotlight: un,
                onStationContextMenu: ge,
                onDeselectStation: He,
                stationAutoDirectorMap: ke,
                onToggleStationAutoDirector: et,
                onOpenDrawer: () => jt(!0),
                baseEpochMs: f,
                playheadMs: ct,
                playheadEpochMs: $n,
                timeMode: r,
                isPlaying: Ut ? !1 : Ke,
                setIsPlaying: Ve,
                totalDurationMs: p,
                inPointMs: W,
                outPointMs: ee,
                setPlayheadMs: rt,
                globalGaps: w,
                recordingSegments: Ae,
                playbackSpeed: Rt,
                onChangePlaybackSpeed: Tt,
                keystrokeMode: o,
                keystrokes: ln,
                directorPlan: Sn == null ? void 0 : Sn.directorPlan,
                onOverrideDisplay: as,
                onResetOverride: Un,
                compositionScope: P,
                onChangeCompositionScope: U,
                compositionLayout: L,
                onChangeCompositionLayout: le,
                isAutoDirectorEnabled: ne,
                onToggleAutoDirector: () => V((C) => !C),
                isPipSwapped: I,
                onTogglePipSwap: () => B((C) => !C),
                onUpdateCanvasLayout: Le,
                canvasLayoutTimeline: _e,
                onUpdateCanvasLayoutTimeline: je,
                activeKfIndex: Qe,
                setActiveKfIndex: Me,
                isModalOpen: q || fe || Ge || Ut || dt,
                isGridFullscreen: Se,
                onToggleGridFullscreen: yn
              }
            ),
            !Se && /* @__PURE__ */ s.jsx(
              _c,
              {
                hasGridPlacements: dn,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: ct,
                setPlayheadMs: rt,
                inPointMs: W,
                setInPointMs: te,
                outPointMs: ee,
                setOutPointMs: Z,
                activeStationId: M,
                isPlaying: Ke,
                setIsPlaying: Qn,
                isLooping: en,
                setIsLooping: Cn,
                playbackSpeed: Rt,
                onChangeSpeed: Tt,
                onSetInPoint: () => te(Math.max(0, Math.min(ct, ee - 1e3))),
                onSetOutPoint: () => Z(Math.min(p, Math.max(ct, W + 1e3))),
                onStepFrameBackward: () => {
                  Ve(!1), rt((C) => Math.max(0, C - 33));
                },
                onStepFrameForward: () => {
                  Ve(!1), rt((C) => Math.min(p, C + 33));
                }
              }
            )
          ] }),
          Se && /* @__PURE__ */ s.jsx(
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
              className: `studio-bottom-timeline ${Se ? "cinema-timeline-island" : ""} ${Se && !To ? "dock-hidden" : ""} ${Se && Ke ? "is-playing-dimmed" : ""}`,
              ref: Wt,
              onMouseEnter: () => $o(!0),
              onMouseLeave: () => {
                $o(!1), Se && Zt();
              },
              children: [
                Se && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: De(ee - W) })
                    ] }),
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "btn-export-cut-hero",
                        onClick: pn,
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
                      hasGridPlacements: dn,
                      baseEpochMs: f,
                      timeMode: r,
                      totalDurationMs: p,
                      playheadMs: ct,
                      setPlayheadMs: rt,
                      inPointMs: W,
                      setInPointMs: te,
                      outPointMs: ee,
                      setOutPointMs: Z,
                      activeStationId: M,
                      isPlaying: Ke,
                      setIsPlaying: Qn,
                      isLooping: en,
                      setIsLooping: Cn,
                      playbackSpeed: Rt,
                      onChangeSpeed: Tt,
                      onSetInPoint: () => te(Math.max(0, Math.min(ct, ee - 1e3))),
                      onSetOutPoint: () => Z(Math.min(p, Math.max(ct, W + 1e3))),
                      onStepFrameBackward: () => {
                        Ve(!1), rt((C) => Math.max(0, C - 33));
                      },
                      onStepFrameForward: () => {
                        Ve(!1), rt((C) => Math.min(p, C + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(f + ct, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  Op,
                  {
                    stations: Er,
                    activeStationId: M,
                    onSelectActiveStation: (C) => zt(y.length <= 1 ? C : C === M ? null : C),
                    onStationContextMenu: ge,
                    onDeselectStation: He,
                    stationAutoDirectorMap: ke,
                    onToggleStationAutoDirector: et,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: Oe,
                    onZoomChange: Re,
                    onZoomReset: qe,
                    onFitRange: H,
                    onJumpViewportTo: de,
                    playheadMs: ct,
                    setPlayheadMs: rt,
                    inPointMs: W,
                    setInPointMs: te,
                    outPointMs: ee,
                    setOutPointMs: Z,
                    viewportStartMs: tt,
                    onViewportStartChange: ae,
                    onExport: pn,
                    recordingSegments: Ae,
                    movieBoundaries: lt,
                    onEstimateLoaded: (C) => (C == null ? void 0 : C.removedGlobalGaps) && b(C.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: ln,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((C) => !C),
                    onSplitDirectorSegment: Kt,
                    onChangeDirectorSegmentDisplay: as,
                    onResetDirectorSegmentToAuto: Un,
                    audioRoutingPlan: At,
                    onSplitAudioSegment: An,
                    onChangeAudioSegmentStation: gs,
                    onChangeAudioSegmentGain: Ss,
                    onFollowVisualFeed: Kr,
                    isAutoFollowAudio: R,
                    canvasLayoutTimeline: _e,
                    activeKfIndex: Qe,
                    onSelectKeyframe: (C, re) => {
                      Me(C), rt(Math.max(0, re - f));
                    },
                    onAddKeyframeAtEpoch: be,
                    onDeleteKeyframe: ot,
                    onUpdateKeyframeEpoch: ie,
                    onUpdateKeyframeTransition: Ze,
                    onToggleDisplayOnCanvas: xt,
                    onUpdateAudioPlan: K
                  }
                )
              ]
            }
          )
        ] }),
        !Se && /* @__PURE__ */ s.jsx(
          Ax,
          {
            isOpen: ht || Zn,
            onToggle: () => jt(!ht),
            onClose: () => jt(!1),
            allStations: se,
            selectedStationIds: y,
            onToggleStation: (C) => S((re) => re.includes(C) ? re.filter((ue) => ue !== C) : [...re, C]),
            onUpdateSelections: S,
            isInitialSetup: Zn,
            isLoadingStations: ve,
            recordingSegments: Ae,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (_(null), x(null), Ot(!0), jt(!1));
            },
            onOpenRangeModal: () => Fe(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Lx,
      {
        isOpen: fe,
        onClose: () => Fe(!1),
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
        isOpen: Ge,
        onClose: () => ut(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: ct,
          inPointMs: W,
          outPointMs: ee,
          selectedStationIds: y,
          selectedStationNames: se.filter((C) => y.includes(C.id)).map((C) => C.displayName || C.hostname || C.id),
          allStationIds: se.map((C) => C.id),
          activeStationId: M,
          activeStationName: (st == null ? void 0 : st.displayName) || (st == null ? void 0 : st.hostname) || null,
          spotlightStationId: k,
          keystrokeMode: o
        },
        onLoadBookmark: kn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Fp,
      {
        isOpen: dt,
        onClose: () => Xe(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Wx,
      {
        isOpen: Ut,
        station: Ms,
        initialDisplayId: m,
        allStations: Er,
        onSelectStation: (C) => {
          C !== k && Tt(1), _(C), x(C);
        },
        onClose: Xt,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: Oe,
        onZoomChange: Re,
        onZoomReset: qe,
        onFitRange: H,
        onJumpViewportTo: de,
        viewportStartMs: tt,
        onViewportStartChange: ae,
        playheadMs: ct,
        setPlayheadMs: rt,
        playheadEpochMs: $n,
        inPointMs: W,
        setInPointMs: te,
        outPointMs: ee,
        setOutPointMs: Z,
        recordingSegments: Ae,
        globalGaps: w,
        isPlaying: Ke,
        setIsPlaying: Ve,
        isLooping: en,
        setIsLooping: Cn,
        playbackSpeed: Rt,
        setPlaybackSpeed: Tt,
        onExport: pn,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: ln,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((C) => !C),
        directorPlan: Ms == null ? void 0 : Ms.directorPlan,
        onOverrideDisplay: as,
        onSplitDirectorSegment: Kt,
        onChangeDirectorSegmentDisplay: as,
        onResetDirectorSegmentToAuto: Un
      }
    ),
    /* @__PURE__ */ s.jsx(
      zx,
      {
        menu: j,
        onClose: () => N(null),
        onDeselect: He,
        onFocusSolo: zt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Hx,
      {
        isOpen: q,
        onClose: () => J(!1),
        onConfirm: Wn,
        compositionSummary: {
          scope: P,
          layout: (Y == null ? void 0 : Y.preset) || L,
          isPipSwapped: I,
          isAutoDirectorEnabled: ne,
          stationsCount: Je.length,
          audioSegmentsCount: (($l = At == null ? void 0 : At.segments) == null ? void 0 : $l.length) || 1,
          resolution: (_e == null ? void 0 : _e.resolution) || "NATIVE",
          canvasWidth: (Y == null ? void 0 : Y.width) || 1920,
          canvasHeight: (Y == null ? void 0 : Y.height) || 1080
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
      ma.createRoot(t).render(Co.createElement(Bp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function Jx(e, t = {}) {
  Up();
  const n = ma.createRoot(e);
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
