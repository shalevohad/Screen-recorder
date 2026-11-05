function qp(e) {
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
var So = Symbol.for("react.element"), em = Symbol.for("react.portal"), tm = Symbol.for("react.fragment"), nm = Symbol.for("react.strict_mode"), sm = Symbol.for("react.profiler"), rm = Symbol.for("react.provider"), lm = Symbol.for("react.context"), om = Symbol.for("react.forward_ref"), am = Symbol.for("react.suspense"), im = Symbol.for("react.memo"), cm = Symbol.for("react.lazy"), Hu = Symbol.iterator;
function um(e) {
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
  return { $$typeof: So, type: e, key: o, ref: a, props: l, _owner: Kc.current };
}
function dm(e, t) {
  return { $$typeof: So, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Vc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === So;
}
function hm(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Vu = /\/+/g;
function ui(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? hm("" + e.key) : t.toString(36);
}
function ra(e, t, n, r, l) {
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
        case So:
        case em:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + ui(a, 0) : r, Ku(l) ? (n = "", e != null && (n = e.replace(Vu, "$&/") + "/"), ra(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Vc(l) && (l = dm(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Vu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Ku(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + ui(o, i);
    a += ra(o, t, n, c, l);
  }
  else if (c = um(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + ui(o, i++), a += ra(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function Po(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return ra(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function fm(e) {
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
var Fn = { current: null }, la = { transition: null }, pm = { ReactCurrentDispatcher: Fn, ReactCurrentBatchConfig: la, ReactCurrentOwner: Kc };
function wh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Ct.Children = { map: Po, forEach: function(e, t, n) {
  Po(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Po(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Po(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Vc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Ct.Component = Il;
Ct.Fragment = tm;
Ct.Profiler = sm;
Ct.PureComponent = zc;
Ct.StrictMode = nm;
Ct.Suspense = am;
Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pm;
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
  return { $$typeof: So, type: e.type, key: l, ref: o, props: r, _owner: a };
};
Ct.createContext = function(e) {
  return e = { $$typeof: lm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: rm, _context: e }, e.Consumer = e;
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
  return { $$typeof: om, render: e };
};
Ct.isValidElement = Vc;
Ct.lazy = function(e) {
  return { $$typeof: cm, _payload: { _status: -1, _result: e }, _init: fm };
};
Ct.memo = function(e, t) {
  return { $$typeof: im, type: e, compare: t === void 0 ? null : t };
};
Ct.startTransition = function(e) {
  var t = la.transition;
  la.transition = {};
  try {
    e();
  } finally {
    la.transition = t;
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
const Mo = /* @__PURE__ */ qp(u);
var ya = {}, Eh = { exports: {} }, ls = {}, jh = { exports: {} }, Ch = {};
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
      var z = O - 1 >>> 1, R = I[z];
      if (0 < l(R, U)) I[z] = U, I[O] = R, O = z;
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
      e: for (var z = 0, R = I.length, re = R >>> 1; z < re; ) {
        var ee = 2 * (z + 1) - 1, J = I[ee], V = ee + 1, $e = I[V];
        if (0 > l(J, O)) V < R && 0 > l($e, J) ? (I[z] = $e, I[V] = O, z = V) : (I[z] = J, I[ee] = O, z = ee);
        else if (V < R && 0 > l($e, O)) I[z] = $e, I[V] = O, z = V;
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
  var c = [], d = [], v = 1, f = null, p = 3, y = !1, M = !1, C = !1, _ = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(I) {
    for (var U = n(d); U !== null; ) {
      if (U.callback === null) r(d);
      else if (U.startTime <= I) r(d), U.sortIndex = U.expirationTime, t(c, U);
      else break;
      U = n(d);
    }
  }
  function T(I) {
    if (C = !1, g(I), !M) if (n(c) !== null) M = !0, ne(E);
    else {
      var U = n(d);
      U !== null && K(T, U.startTime - I);
    }
  }
  function E(I, U) {
    M = !1, C && (C = !1, w(A), A = -1), y = !0;
    var O = p;
    try {
      for (g(U), f = n(c); f !== null && (!(f.expirationTime > U) || I && !D()); ) {
        var z = f.callback;
        if (typeof z == "function") {
          f.callback = null, p = f.priorityLevel;
          var R = z(f.expirationTime <= U);
          U = e.unstable_now(), typeof R == "function" ? f.callback = R : f === n(c) && r(c), g(U);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var re = !0;
      else {
        var ee = n(d);
        ee !== null && K(T, ee.startTime - U), re = !1;
      }
      return re;
    } finally {
      f = null, p = O, y = !1;
    }
  }
  var b = !1, h = null, A = -1, k = 5, N = -1;
  function D() {
    return !(e.unstable_now() - N < k);
  }
  function W() {
    if (h !== null) {
      var I = e.unstable_now();
      N = I;
      var U = !0;
      try {
        U = h(!0, I);
      } finally {
        U ? $() : (b = !1, h = null);
      }
    } else b = !1;
  }
  var $;
  if (typeof m == "function") $ = function() {
    m(W);
  };
  else if (typeof MessageChannel < "u") {
    var F = new MessageChannel(), se = F.port2;
    F.port1.onmessage = W, $ = function() {
      se.postMessage(null);
    };
  } else $ = function() {
    _(W, 0);
  };
  function ne(I) {
    h = I, b || (b = !0, $());
  }
  function K(I, U) {
    A = _(function() {
      I(e.unstable_now());
    }, U);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    M || y || (M = !0, ne(E));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : k = 0 < I ? Math.floor(1e3 / I) : 5;
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
    var z = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? z + O : z) : O = z, I) {
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
    return R = O + R, I = { id: v++, callback: U, priorityLevel: I, startTime: O, expirationTime: R, sortIndex: -1 }, O > z ? (I.sortIndex = O, t(d, I), n(c) === null && I === n(d) && (C ? (w(A), A = -1) : C = !0, K(T, O - z))) : (I.sortIndex = R, t(c, I), M || y || (M = !0, ne(E))), I;
  }, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(I) {
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
var mm = jh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gm = u, rs = mm;
function ke(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Sh = /* @__PURE__ */ new Set(), ao = {};
function Hr(e, t) {
  wl(e, t), wl(e + "Capture", t);
}
function wl(e, t) {
  for (ao[e] = t, e = 0; e < t.length; e++) Sh.add(t[e]);
}
var zs = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zi = Object.prototype.hasOwnProperty, xm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yu = {}, Xu = {};
function ym(e) {
  return zi.call(Xu, e) ? !0 : zi.call(Yu, e) ? !1 : xm.test(e) ? Xu[e] = !0 : (Yu[e] = !0, !1);
}
function vm(e, t, n, r) {
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
function Nm(e, t, n, r) {
  if (t === null || typeof t > "u" || vm(e, t, n, r)) return !0;
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
function Xc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Yc,
    Xc
  );
  Sn[t] = new Bn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Yc, Xc);
  Sn[t] = new Bn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Yc, Xc);
  Sn[t] = new Bn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Sn[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Sn.xlinkHref = new Bn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Sn[e] = new Bn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Gc(e, t, n, r) {
  var l = Sn.hasOwnProperty(t) ? Sn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Nm(t, n, l, r) && (n = null), r || l === null ? ym(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ys = gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _o = Symbol.for("react.element"), el = Symbol.for("react.portal"), tl = Symbol.for("react.fragment"), Qc = Symbol.for("react.strict_mode"), Hi = Symbol.for("react.profiler"), Mh = Symbol.for("react.provider"), bh = Symbol.for("react.context"), Jc = Symbol.for("react.forward_ref"), Ki = Symbol.for("react.suspense"), Vi = Symbol.for("react.suspense_list"), Zc = Symbol.for("react.memo"), tr = Symbol.for("react.lazy"), Ih = Symbol.for("react.offscreen"), Gu = Symbol.iterator;
function Dl(e) {
  return e === null || typeof e != "object" ? null : (e = Gu && e[Gu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var sn = Object.assign, di;
function Yl(e) {
  if (di === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    di = t && t[1] || "";
  }
  return `
` + di + e;
}
var hi = !1;
function fi(e, t) {
  if (!e || hi) return "";
  hi = !0;
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
    hi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Yl(e) : "";
}
function km(e) {
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
      return e = fi(e.type, !1), e;
    case 11:
      return e = fi(e.type.render, !1), e;
    case 1:
      return e = fi(e.type, !0), e;
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
function wm(e) {
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
function Em(e) {
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
function Fo(e) {
  e._valueTracker || (e._valueTracker = Em(e));
}
function Ah(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Th(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function va(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Xi(e, t) {
  var n = t.checked;
  return sn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Qu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function $h(e, t) {
  t = t.checked, t != null && Gc(e, "checked", t, !1);
}
function Gi(e, t) {
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
  (t !== "number" || va(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Xl = Array.isArray;
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
  if (t.dangerouslySetInnerHTML != null) throw Error(ke(91));
  return sn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Zu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(ke(92));
      if (Xl(n)) {
        if (1 < n.length) throw Error(ke(93));
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
var Bo, Oh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Bo = Bo || document.createElement("div"), Bo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Bo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function io(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Zl = {
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
}, jm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zl).forEach(function(e) {
  jm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Zl[t] = Zl[e];
  });
});
function Dh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Zl.hasOwnProperty(e) && Zl[e] ? ("" + t).trim() : t + "px";
}
function Ph(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Dh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Cm = sn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function qi(e, t) {
  if (t) {
    if (Cm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ke(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ke(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ke(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ke(62));
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
  if (e = To(e)) {
    if (typeof nc != "function") throw Error(ke(280));
    var t = e.stateNode;
    t && (t = Qa(t), nc(e.stateNode, e.type, t));
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
var pi = !1;
function Wh(e, t, n) {
  if (pi) return e(t, n);
  pi = !0;
  try {
    return Bh(e, t, n);
  } finally {
    pi = !1, (pl !== null || ml !== null) && (Uh(), Fh());
  }
}
function co(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Qa(n);
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
  if (n && typeof n != "function") throw Error(ke(231, t, typeof n));
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
function Sm(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var ql = !1, Na = null, ka = !1, rc = null, Mm = { onError: function(e) {
  ql = !0, Na = e;
} };
function bm(e, t, n, r, l, o, a, i, c) {
  ql = !1, Na = null, Sm.apply(Mm, arguments);
}
function Im(e, t, n, r, l, o, a, i, c) {
  if (bm.apply(this, arguments), ql) {
    if (ql) {
      var d = Na;
      ql = !1, Na = null;
    } else throw Error(ke(198));
    ka || (ka = !0, rc = d);
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
  if (Kr(e) !== e) throw Error(ke(188));
}
function Tm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Kr(e), t === null) throw Error(ke(188));
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
      throw Error(ke(188));
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
        if (!a) throw Error(ke(189));
      }
    }
    if (n.alternate !== r) throw Error(ke(190));
  }
  if (n.tag !== 3) throw Error(ke(188));
  return n.stateNode.current === n ? e : t;
}
function Hh(e) {
  return e = Tm(e), e !== null ? Kh(e) : null;
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
var Vh = rs.unstable_scheduleCallback, nd = rs.unstable_cancelCallback, Am = rs.unstable_shouldYield, $m = rs.unstable_requestPaint, un = rs.unstable_now, Rm = rs.unstable_getCurrentPriorityLevel, eu = rs.unstable_ImmediatePriority, Yh = rs.unstable_UserBlockingPriority, wa = rs.unstable_NormalPriority, Lm = rs.unstable_LowPriority, Xh = rs.unstable_IdlePriority, Va = null, $s = null;
function Om(e) {
  if ($s && typeof $s.onCommitFiberRoot == "function") try {
    $s.onCommitFiberRoot(Va, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Es = Math.clz32 ? Math.clz32 : _m, Dm = Math.log, Pm = Math.LN2;
function _m(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Dm(e) / Pm | 0) | 0;
}
var Uo = 64, Wo = 4194304;
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
function Ea(e, t) {
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
function Fm(e, t) {
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
function Bm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - Es(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = Fm(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function lc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Gh() {
  var e = Uo;
  return Uo <<= 1, !(Uo & 4194240) && (Uo = 64), e;
}
function mi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function bo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Es(t), e[t] = n;
}
function Um(e, t) {
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
var Jh, nu, Zh, qh, ef, oc = !1, zo = [], ur = null, dr = null, hr = null, uo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), lr = [], Wm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
      uo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ho.delete(t.pointerId);
  }
}
function _l(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = To(t), t !== null && nu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function zm(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ur = _l(ur, e, t, n, r, l), !0;
    case "dragenter":
      return dr = _l(dr, e, t, n, r, l), !0;
    case "mouseover":
      return hr = _l(hr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return uo.set(o, _l(uo.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, ho.set(o, _l(ho.get(o) || null, e, t, n, r, l)), !0;
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
function oa(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ac(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      tc = r, n.target.dispatchEvent(r), tc = null;
    } else return t = To(n), t !== null && nu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function rd(e, t, n) {
  oa(e) && n.delete(t);
}
function Hm() {
  oc = !1, ur !== null && oa(ur) && (ur = null), dr !== null && oa(dr) && (dr = null), hr !== null && oa(hr) && (hr = null), uo.forEach(rd), ho.forEach(rd);
}
function Fl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, oc || (oc = !0, rs.unstable_scheduleCallback(rs.unstable_NormalPriority, Hm)));
}
function fo(e) {
  function t(l) {
    return Fl(l, e);
  }
  if (0 < zo.length) {
    Fl(zo[0], e);
    for (var n = 1; n < zo.length; n++) {
      var r = zo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ur !== null && Fl(ur, e), dr !== null && Fl(dr, e), hr !== null && Fl(hr, e), uo.forEach(t), ho.forEach(t), n = 0; n < lr.length; n++) r = lr[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lr.length && (n = lr[0], n.blockedOn === null); ) tf(n), n.blockedOn === null && lr.shift();
}
var gl = Ys.ReactCurrentBatchConfig, ja = !0;
function Km(e, t, n, r) {
  var l = Wt, o = gl.transition;
  gl.transition = null;
  try {
    Wt = 1, su(e, t, n, r);
  } finally {
    Wt = l, gl.transition = o;
  }
}
function Vm(e, t, n, r) {
  var l = Wt, o = gl.transition;
  gl.transition = null;
  try {
    Wt = 4, su(e, t, n, r);
  } finally {
    Wt = l, gl.transition = o;
  }
}
function su(e, t, n, r) {
  if (ja) {
    var l = ac(e, t, n, r);
    if (l === null) Ci(e, t, r, Ca, n), sd(e, r);
    else if (zm(l, e, t, n, r)) r.stopPropagation();
    else if (sd(e, r), t & 4 && -1 < Wm.indexOf(e)) {
      for (; l !== null; ) {
        var o = To(l);
        if (o !== null && Jh(o), o = ac(e, t, n, r), o === null && Ci(e, t, r, Ca, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ci(e, t, r, null, n);
  }
}
var Ca = null;
function ac(e, t, n, r) {
  if (Ca = null, e = qc(r), e = Ar(e), e !== null) if (t = Kr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = zh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ca = e, null;
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
      switch (Rm()) {
        case eu:
          return 1;
        case Yh:
          return 4;
        case wa:
        case Lm:
          return 16;
        case Xh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ir = null, ru = null, aa = null;
function sf() {
  if (aa) return aa;
  var e, t = ru, n = t.length, r, l = "value" in ir ? ir.value : ir.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return aa = l.slice(e, 1 < r ? 1 - r : void 0);
}
function ia(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Ho() {
  return !0;
}
function ld() {
  return !1;
}
function os(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ho : ld, this.isPropagationStopped = ld, this;
  }
  return sn(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ho);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ho);
  }, persist: function() {
  }, isPersistent: Ho }), t;
}
var Tl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, lu = os(Tl), Io = sn({}, Tl, { view: 0, detail: 0 }), Ym = os(Io), gi, xi, Bl, Ya = sn({}, Io, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ou, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Bl && (Bl && e.type === "mousemove" ? (gi = e.screenX - Bl.screenX, xi = e.screenY - Bl.screenY) : xi = gi = 0, Bl = e), gi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : xi;
} }), od = os(Ya), Xm = sn({}, Ya, { dataTransfer: 0 }), Gm = os(Xm), Qm = sn({}, Io, { relatedTarget: 0 }), yi = os(Qm), Jm = sn({}, Tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Zm = os(Jm), qm = sn({}, Tl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), e0 = os(qm), t0 = sn({}, Tl, { data: 0 }), ad = os(t0), n0 = {
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
}, s0 = {
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
}, r0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function l0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = r0[e]) ? !!t[e] : !1;
}
function ou() {
  return l0;
}
var o0 = sn({}, Io, { key: function(e) {
  if (e.key) {
    var t = n0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ia(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? s0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ou, charCode: function(e) {
  return e.type === "keypress" ? ia(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ia(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), a0 = os(o0), i0 = sn({}, Ya, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), id = os(i0), c0 = sn({}, Io, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ou }), u0 = os(c0), d0 = sn({}, Tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), h0 = os(d0), f0 = sn({}, Ya, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), p0 = os(f0), m0 = [9, 13, 27, 32], au = zs && "CompositionEvent" in window, eo = null;
zs && "documentMode" in document && (eo = document.documentMode);
var g0 = zs && "TextEvent" in window && !eo, rf = zs && (!au || eo && 8 < eo && 11 >= eo), cd = " ", ud = !1;
function lf(e, t) {
  switch (e) {
    case "keyup":
      return m0.indexOf(t.keyCode) !== -1;
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
function x0(e, t) {
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
function y0(e, t) {
  if (nl) return e === "compositionend" || !au && lf(e, t) ? (e = sf(), aa = ru = ir = null, nl = !1, e) : null;
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
var v0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function dd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!v0[e.type] : t === "textarea";
}
function af(e, t, n, r) {
  _h(r), t = Sa(t, "onChange"), 0 < t.length && (n = new lu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var to = null, po = null;
function N0(e) {
  vf(e, 0);
}
function Xa(e) {
  var t = ll(e);
  if (Ah(t)) return e;
}
function k0(e, t) {
  if (e === "change") return t;
}
var cf = !1;
if (zs) {
  var vi;
  if (zs) {
    var Ni = "oninput" in document;
    if (!Ni) {
      var hd = document.createElement("div");
      hd.setAttribute("oninput", "return;"), Ni = typeof hd.oninput == "function";
    }
    vi = Ni;
  } else vi = !1;
  cf = vi && (!document.documentMode || 9 < document.documentMode);
}
function fd() {
  to && (to.detachEvent("onpropertychange", uf), po = to = null);
}
function uf(e) {
  if (e.propertyName === "value" && Xa(po)) {
    var t = [];
    af(t, po, e, qc(e)), Wh(N0, t);
  }
}
function w0(e, t, n) {
  e === "focusin" ? (fd(), to = t, po = n, to.attachEvent("onpropertychange", uf)) : e === "focusout" && fd();
}
function E0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xa(po);
}
function j0(e, t) {
  if (e === "click") return Xa(t);
}
function C0(e, t) {
  if (e === "input" || e === "change") return Xa(t);
}
function S0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Cs = typeof Object.is == "function" ? Object.is : S0;
function mo(e, t) {
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
  for (var e = window, t = va(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = va(e.document);
  }
  return t;
}
function iu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function M0(e) {
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
var b0 = zs && "documentMode" in document && 11 >= document.documentMode, sl = null, ic = null, no = null, cc = !1;
function gd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  cc || sl == null || sl !== va(r) || (r = sl, "selectionStart" in r && iu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), no && mo(no, r) || (no = r, r = Sa(ic, "onSelect"), 0 < r.length && (t = new lu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = sl)));
}
function Ko(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var rl = { animationend: Ko("Animation", "AnimationEnd"), animationiteration: Ko("Animation", "AnimationIteration"), animationstart: Ko("Animation", "AnimationStart"), transitionend: Ko("Transition", "TransitionEnd") }, ki = {}, ff = {};
zs && (ff = document.createElement("div").style, "AnimationEvent" in window || (delete rl.animationend.animation, delete rl.animationiteration.animation, delete rl.animationstart.animation), "TransitionEvent" in window || delete rl.transitionend.transition);
function Ga(e) {
  if (ki[e]) return ki[e];
  if (!rl[e]) return e;
  var t = rl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ff) return ki[e] = t[n];
  return e;
}
var pf = Ga("animationend"), mf = Ga("animationiteration"), gf = Ga("animationstart"), xf = Ga("transitionend"), yf = /* @__PURE__ */ new Map(), xd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nr(e, t) {
  yf.set(e, t), Hr(t, [e]);
}
for (var wi = 0; wi < xd.length; wi++) {
  var Ei = xd[wi], I0 = Ei.toLowerCase(), T0 = Ei[0].toUpperCase() + Ei.slice(1);
  Nr(I0, "on" + T0);
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
var Ql = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), A0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ql));
function yd(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Im(r, t, void 0, e), e.currentTarget = null;
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
  if (ka) throw e = rc, ka = !1, rc = null, e;
}
function Qt(e, t) {
  var n = t[pc];
  n === void 0 && (n = t[pc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Nf(t, e, 2, !1), n.add(r));
}
function ji(e, t, n) {
  var r = 0;
  t && (r |= 4), Nf(n, e, r, t);
}
var Vo = "_reactListening" + Math.random().toString(36).slice(2);
function go(e) {
  if (!e[Vo]) {
    e[Vo] = !0, Sh.forEach(function(n) {
      n !== "selectionchange" && (A0.has(n) || ji(n, !1, e), ji(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Vo] || (t[Vo] = !0, ji("selectionchange", !1, t));
  }
}
function Nf(e, t, n, r) {
  switch (nf(t)) {
    case 1:
      var l = Km;
      break;
    case 4:
      l = Vm;
      break;
    default:
      l = su;
  }
  n = l.bind(null, t, n, e), l = void 0, !sc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ci(e, t, n, r, l) {
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
        var y = lu, M = e;
        switch (e) {
          case "keypress":
            if (ia(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = a0;
            break;
          case "focusin":
            M = "focus", y = yi;
            break;
          case "focusout":
            M = "blur", y = yi;
            break;
          case "beforeblur":
          case "afterblur":
            y = yi;
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
            y = u0;
            break;
          case pf:
          case mf:
          case gf:
            y = Zm;
            break;
          case xf:
            y = h0;
            break;
          case "scroll":
            y = Ym;
            break;
          case "wheel":
            y = p0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = e0;
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
        var C = (t & 4) !== 0, _ = !C && e === "scroll", w = C ? p !== null ? p + "Capture" : null : p;
        C = [];
        for (var m = d, g; m !== null; ) {
          g = m;
          var T = g.stateNode;
          if (g.tag === 5 && T !== null && (g = T, w !== null && (T = co(m, w), T != null && C.push(xo(m, T, g)))), _) break;
          m = m.return;
        }
        0 < C.length && (p = new y(p, M, null, n, v), f.push({ event: p, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== tc && (M = n.relatedTarget || n.fromElement) && (Ar(M) || M[Hs])) break e;
        if ((y || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (M = n.relatedTarget || n.toElement, y = d, M = M ? Ar(M) : null, M !== null && (_ = Kr(M), M !== _ || M.tag !== 5 && M.tag !== 6) && (M = null)) : (y = null, M = d), y !== M)) {
          if (C = od, T = "onMouseLeave", w = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (C = id, T = "onPointerLeave", w = "onPointerEnter", m = "pointer"), _ = y == null ? p : ll(y), g = M == null ? p : ll(M), p = new C(T, m + "leave", y, n, v), p.target = _, p.relatedTarget = g, T = null, Ar(v) === d && (C = new C(w, m + "enter", M, n, v), C.target = g, C.relatedTarget = _, T = C), _ = T, y && M) t: {
            for (C = y, w = M, m = 0, g = C; g; g = Xr(g)) m++;
            for (g = 0, T = w; T; T = Xr(T)) g++;
            for (; 0 < m - g; ) C = Xr(C), m--;
            for (; 0 < g - m; ) w = Xr(w), g--;
            for (; m--; ) {
              if (C === w || w !== null && C === w.alternate) break t;
              C = Xr(C), w = Xr(w);
            }
            C = null;
          }
          else C = null;
          y !== null && vd(f, p, y, C, !1), M !== null && _ !== null && vd(f, _, M, C, !0);
        }
      }
      e: {
        if (p = d ? ll(d) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var E = k0;
        else if (dd(p)) if (cf) E = C0;
        else {
          E = E0;
          var b = w0;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = j0);
        if (E && (E = E(e, d))) {
          af(f, E, n, v);
          break e;
        }
        b && b(e, p, d), e === "focusout" && (b = p._wrapperState) && b.controlled && p.type === "number" && Qi(p, "number", p.value);
      }
      switch (b = d ? ll(d) : window, e) {
        case "focusin":
          (dd(b) || b.contentEditable === "true") && (sl = b, ic = d, no = null);
          break;
        case "focusout":
          no = ic = sl = null;
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
          if (b0) break;
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
      A && (rf && n.locale !== "ko" && (nl || A !== "onCompositionStart" ? A === "onCompositionEnd" && nl && (h = sf()) : (ir = v, ru = "value" in ir ? ir.value : ir.textContent, nl = !0)), b = Sa(d, A), 0 < b.length && (A = new ad(A, e, null, n, v), f.push({ event: A, listeners: b }), h ? A.data = h : (h = of(n), h !== null && (A.data = h)))), (h = g0 ? x0(e, n) : y0(e, n)) && (d = Sa(d, "onBeforeInput"), 0 < d.length && (v = new ad("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = h));
    }
    vf(f, t);
  });
}
function xo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Sa(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = co(e, n), o != null && r.unshift(xo(e, o, l)), o = co(e, t), o != null && r.push(xo(e, o, l))), e = e.return;
  }
  return r;
}
function Xr(e) {
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
    i.tag === 5 && d !== null && (i = d, l ? (c = co(n, o), c != null && a.unshift(xo(n, c, i))) : l || (c = co(n, o), c != null && a.push(xo(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var $0 = /\r\n?/g, R0 = /\u0000|\uFFFD/g;
function Nd(e) {
  return (typeof e == "string" ? e : "" + e).replace($0, `
`).replace(R0, "");
}
function Yo(e, t, n) {
  if (t = Nd(t), Nd(e) !== t && n) throw Error(ke(425));
}
function Ma() {
}
var uc = null, dc = null;
function hc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var fc = typeof setTimeout == "function" ? setTimeout : void 0, L0 = typeof clearTimeout == "function" ? clearTimeout : void 0, kd = typeof Promise == "function" ? Promise : void 0, O0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof kd < "u" ? function(e) {
  return kd.resolve(null).then(e).catch(D0);
} : fc;
function D0(e) {
  setTimeout(function() {
    throw e;
  });
}
function Si(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), fo(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  fo(t);
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
var Al = Math.random().toString(36).slice(2), Ts = "__reactFiber$" + Al, yo = "__reactProps$" + Al, Hs = "__reactContainer$" + Al, pc = "__reactEvents$" + Al, P0 = "__reactListeners$" + Al, _0 = "__reactHandles$" + Al;
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
function To(e) {
  return e = e[Ts] || e[Hs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ll(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ke(33));
}
function Qa(e) {
  return e[yo] || null;
}
var mc = [], ol = -1;
function kr(e) {
  return { current: e };
}
function Jt(e) {
  0 > ol || (e.current = mc[ol], mc[ol] = null, ol--);
}
function Xt(e, t) {
  ol++, mc[ol] = e.current, e.current = t;
}
var vr = {}, An = kr(vr), Xn = kr(!1), Fr = vr;
function El(e, t) {
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
function ba() {
  Jt(Xn), Jt(An);
}
function Ed(e, t, n) {
  if (An.current !== vr) throw Error(ke(168));
  Xt(An, t), Xt(Xn, n);
}
function kf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ke(108, wm(e) || "Unknown", l));
  return sn({}, n, r);
}
function Ia(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, Fr = An.current, Xt(An, e), Xt(Xn, Xn.current), !0;
}
function jd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ke(169));
  n ? (e = kf(e, t, Fr), r.__reactInternalMemoizedMergedChildContext = e, Jt(Xn), Jt(An), Xt(An, e)) : Jt(Xn), Xt(Xn, n);
}
var Ps = null, Ja = !1, Mi = !1;
function wf(e) {
  Ps === null ? Ps = [e] : Ps.push(e);
}
function F0(e) {
  Ja = !0, wf(e);
}
function wr() {
  if (!Mi && Ps !== null) {
    Mi = !0;
    var e = 0, t = Wt;
    try {
      var n = Ps;
      for (Wt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ps = null, Ja = !1;
    } catch (l) {
      throw Ps !== null && (Ps = Ps.slice(e + 1)), Vh(eu, wr), l;
    } finally {
      Wt = t, Mi = !1;
    }
  }
  return null;
}
var al = [], il = 0, Ta = null, Aa = 0, us = [], ds = 0, Br = null, Fs = 1, Bs = "";
function br(e, t) {
  al[il++] = Aa, al[il++] = Ta, Ta = e, Aa = t;
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
  for (; e === Ta; ) Ta = al[--il], al[il] = null, Aa = al[--il], al[il] = null;
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
        if (gc(e)) throw Error(ke(418));
        t = fr(n.nextSibling);
        var r = ss;
        t && Cd(e, t) ? jf(r, n) : (e.flags = e.flags & -4097 | 2, qt = !1, ss = e);
      }
    } else {
      if (gc(e)) throw Error(ke(418));
      e.flags = e.flags & -4097 | 2, qt = !1, ss = e;
    }
  }
}
function Sd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ss = e;
}
function Xo(e) {
  if (e !== ss) return !1;
  if (!qt) return Sd(e), qt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !hc(e.type, e.memoizedProps)), t && (t = ns)) {
    if (gc(e)) throw Cf(), Error(ke(418));
    for (; t; ) jf(e, t), t = fr(t.nextSibling);
  }
  if (Sd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ke(317));
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
var B0 = Ys.ReactCurrentBatchConfig;
function Ul(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ke(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(ke(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var i = l.refs;
        a === null ? delete i[o] : i[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(ke(284));
    if (!n._owner) throw Error(ke(290, e));
  }
  return e;
}
function Go(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ke(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Md(e) {
  var t = e._init;
  return t(e._payload);
}
function Sf(e) {
  function t(w, m) {
    if (e) {
      var g = w.deletions;
      g === null ? (w.deletions = [m], w.flags |= 16) : g.push(m);
    }
  }
  function n(w, m) {
    if (!e) return null;
    for (; m !== null; ) t(w, m), m = m.sibling;
    return null;
  }
  function r(w, m) {
    for (w = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? w.set(m.key, m) : w.set(m.index, m), m = m.sibling;
    return w;
  }
  function l(w, m) {
    return w = xr(w, m), w.index = 0, w.sibling = null, w;
  }
  function o(w, m, g) {
    return w.index = g, e ? (g = w.alternate, g !== null ? (g = g.index, g < m ? (w.flags |= 2, m) : g) : (w.flags |= 2, m)) : (w.flags |= 1048576, m);
  }
  function a(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function i(w, m, g, T) {
    return m === null || m.tag !== 6 ? (m = Li(g, w.mode, T), m.return = w, m) : (m = l(m, g), m.return = w, m);
  }
  function c(w, m, g, T) {
    var E = g.type;
    return E === tl ? v(w, m, g.props.children, T, g.key) : m !== null && (m.elementType === E || typeof E == "object" && E !== null && E.$$typeof === tr && Md(E) === m.type) ? (T = l(m, g.props), T.ref = Ul(w, m, g), T.return = w, T) : (T = ma(g.type, g.key, g.props, null, w.mode, T), T.ref = Ul(w, m, g), T.return = w, T);
  }
  function d(w, m, g, T) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== g.containerInfo || m.stateNode.implementation !== g.implementation ? (m = Oi(g, w.mode, T), m.return = w, m) : (m = l(m, g.children || []), m.return = w, m);
  }
  function v(w, m, g, T, E) {
    return m === null || m.tag !== 7 ? (m = Pr(g, w.mode, T, E), m.return = w, m) : (m = l(m, g), m.return = w, m);
  }
  function f(w, m, g) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Li("" + m, w.mode, g), m.return = w, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case _o:
          return g = ma(m.type, m.key, m.props, null, w.mode, g), g.ref = Ul(w, null, m), g.return = w, g;
        case el:
          return m = Oi(m, w.mode, g), m.return = w, m;
        case tr:
          var T = m._init;
          return f(w, T(m._payload), g);
      }
      if (Xl(m) || Dl(m)) return m = Pr(m, w.mode, g, null), m.return = w, m;
      Go(w, m);
    }
    return null;
  }
  function p(w, m, g, T) {
    var E = m !== null ? m.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return E !== null ? null : i(w, m, "" + g, T);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case _o:
          return g.key === E ? c(w, m, g, T) : null;
        case el:
          return g.key === E ? d(w, m, g, T) : null;
        case tr:
          return E = g._init, p(
            w,
            m,
            E(g._payload),
            T
          );
      }
      if (Xl(g) || Dl(g)) return E !== null ? null : v(w, m, g, T, null);
      Go(w, g);
    }
    return null;
  }
  function y(w, m, g, T, E) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return w = w.get(g) || null, i(m, w, "" + T, E);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case _o:
          return w = w.get(T.key === null ? g : T.key) || null, c(m, w, T, E);
        case el:
          return w = w.get(T.key === null ? g : T.key) || null, d(m, w, T, E);
        case tr:
          var b = T._init;
          return y(w, m, g, b(T._payload), E);
      }
      if (Xl(T) || Dl(T)) return w = w.get(g) || null, v(m, w, T, E, null);
      Go(m, T);
    }
    return null;
  }
  function M(w, m, g, T) {
    for (var E = null, b = null, h = m, A = m = 0, k = null; h !== null && A < g.length; A++) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var N = p(w, h, g[A], T);
      if (N === null) {
        h === null && (h = k);
        break;
      }
      e && h && N.alternate === null && t(w, h), m = o(N, m, A), b === null ? E = N : b.sibling = N, b = N, h = k;
    }
    if (A === g.length) return n(w, h), qt && br(w, A), E;
    if (h === null) {
      for (; A < g.length; A++) h = f(w, g[A], T), h !== null && (m = o(h, m, A), b === null ? E = h : b.sibling = h, b = h);
      return qt && br(w, A), E;
    }
    for (h = r(w, h); A < g.length; A++) k = y(h, w, A, g[A], T), k !== null && (e && k.alternate !== null && h.delete(k.key === null ? A : k.key), m = o(k, m, A), b === null ? E = k : b.sibling = k, b = k);
    return e && h.forEach(function(D) {
      return t(w, D);
    }), qt && br(w, A), E;
  }
  function C(w, m, g, T) {
    var E = Dl(g);
    if (typeof E != "function") throw Error(ke(150));
    if (g = E.call(g), g == null) throw Error(ke(151));
    for (var b = E = null, h = m, A = m = 0, k = null, N = g.next(); h !== null && !N.done; A++, N = g.next()) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var D = p(w, h, N.value, T);
      if (D === null) {
        h === null && (h = k);
        break;
      }
      e && h && D.alternate === null && t(w, h), m = o(D, m, A), b === null ? E = D : b.sibling = D, b = D, h = k;
    }
    if (N.done) return n(
      w,
      h
    ), qt && br(w, A), E;
    if (h === null) {
      for (; !N.done; A++, N = g.next()) N = f(w, N.value, T), N !== null && (m = o(N, m, A), b === null ? E = N : b.sibling = N, b = N);
      return qt && br(w, A), E;
    }
    for (h = r(w, h); !N.done; A++, N = g.next()) N = y(h, w, A, N.value, T), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? A : N.key), m = o(N, m, A), b === null ? E = N : b.sibling = N, b = N);
    return e && h.forEach(function(W) {
      return t(w, W);
    }), qt && br(w, A), E;
  }
  function _(w, m, g, T) {
    if (typeof g == "object" && g !== null && g.type === tl && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case _o:
          e: {
            for (var E = g.key, b = m; b !== null; ) {
              if (b.key === E) {
                if (E = g.type, E === tl) {
                  if (b.tag === 7) {
                    n(w, b.sibling), m = l(b, g.props.children), m.return = w, w = m;
                    break e;
                  }
                } else if (b.elementType === E || typeof E == "object" && E !== null && E.$$typeof === tr && Md(E) === b.type) {
                  n(w, b.sibling), m = l(b, g.props), m.ref = Ul(w, b, g), m.return = w, w = m;
                  break e;
                }
                n(w, b);
                break;
              } else t(w, b);
              b = b.sibling;
            }
            g.type === tl ? (m = Pr(g.props.children, w.mode, T, g.key), m.return = w, w = m) : (T = ma(g.type, g.key, g.props, null, w.mode, T), T.ref = Ul(w, m, g), T.return = w, w = T);
          }
          return a(w);
        case el:
          e: {
            for (b = g.key; m !== null; ) {
              if (m.key === b) if (m.tag === 4 && m.stateNode.containerInfo === g.containerInfo && m.stateNode.implementation === g.implementation) {
                n(w, m.sibling), m = l(m, g.children || []), m.return = w, w = m;
                break e;
              } else {
                n(w, m);
                break;
              }
              else t(w, m);
              m = m.sibling;
            }
            m = Oi(g, w.mode, T), m.return = w, w = m;
          }
          return a(w);
        case tr:
          return b = g._init, _(w, m, b(g._payload), T);
      }
      if (Xl(g)) return M(w, m, g, T);
      if (Dl(g)) return C(w, m, g, T);
      Go(w, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, m !== null && m.tag === 6 ? (n(w, m.sibling), m = l(m, g), m.return = w, w = m) : (n(w, m), m = Li(g, w.mode, T), m.return = w, w = m), a(w)) : n(w, m);
  }
  return _;
}
var Cl = Sf(!0), Mf = Sf(!1), $a = kr(null), Ra = null, cl = null, hu = null;
function fu() {
  hu = cl = Ra = null;
}
function pu(e) {
  var t = $a.current;
  Jt($a), e._currentValue = t;
}
function yc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function xl(e, t) {
  Ra = e, hu = cl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Yn = !0), e.firstContext = null);
}
function ps(e) {
  var t = e._currentValue;
  if (hu !== e) if (e = { context: e, memoizedValue: t, next: null }, cl === null) {
    if (Ra === null) throw Error(ke(308));
    cl = e, Ra.dependencies = { lanes: 0, firstContext: e };
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
function ca(e, t, n) {
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
function La(e, t, n, r) {
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
          var M = e, C = i;
          switch (p = t, y = n, C.tag) {
            case 1:
              if (M = C.payload, typeof M == "function") {
                f = M.call(y, f, p);
                break e;
              }
              f = M;
              break e;
            case 3:
              M.flags = M.flags & -65537 | 128;
            case 0:
              if (M = C.payload, p = typeof M == "function" ? M.call(y, f, p) : M, p == null) break e;
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
      if (r.callback = null, r = n, typeof l != "function") throw Error(ke(191, l));
      l.call(r);
    }
  }
}
var Ao = {}, Rs = kr(Ao), vo = kr(Ao), No = kr(Ao);
function Rr(e) {
  if (e === Ao) throw Error(ke(174));
  return e;
}
function xu(e, t) {
  switch (Xt(No, t), Xt(vo, e), Xt(Rs, Ao), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Zi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Zi(t, e);
  }
  Jt(Rs), Xt(Rs, t);
}
function Sl() {
  Jt(Rs), Jt(vo), Jt(No);
}
function Tf(e) {
  Rr(No.current);
  var t = Rr(Rs.current), n = Zi(t, e.type);
  t !== n && (Xt(vo, e), Xt(Rs, n));
}
function yu(e) {
  vo.current === e && (Jt(Rs), Jt(vo));
}
var tn = kr(0);
function Oa(e) {
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
var bi = [];
function vu() {
  for (var e = 0; e < bi.length; e++) bi[e]._workInProgressVersionPrimary = null;
  bi.length = 0;
}
var ua = Ys.ReactCurrentDispatcher, Ii = Ys.ReactCurrentBatchConfig, Ur = 0, nn = null, xn = null, Nn = null, Da = !1, so = !1, ko = 0, U0 = 0;
function bn() {
  throw Error(ke(321));
}
function Nu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Cs(e[n], t[n])) return !1;
  return !0;
}
function ku(e, t, n, r, l, o) {
  if (Ur = o, nn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ua.current = e === null || e.memoizedState === null ? K0 : V0, e = n(r, l), so) {
    o = 0;
    do {
      if (so = !1, ko = 0, 25 <= o) throw Error(ke(301));
      o += 1, Nn = xn = null, t.updateQueue = null, ua.current = Y0, e = n(r, l);
    } while (so);
  }
  if (ua.current = Pa, t = xn !== null && xn.next !== null, Ur = 0, Nn = xn = nn = null, Da = !1, t) throw Error(ke(300));
  return e;
}
function wu() {
  var e = ko !== 0;
  return ko = 0, e;
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
    if (e === null) throw Error(ke(310));
    xn = e, e = { memoizedState: xn.memoizedState, baseState: xn.baseState, baseQueue: xn.baseQueue, queue: xn.queue, next: null }, Nn === null ? nn.memoizedState = Nn = e : Nn = Nn.next = e;
  }
  return Nn;
}
function wo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ti(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(ke(311));
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
function Ai(e) {
  var t = ms(), n = t.queue;
  if (n === null) throw Error(ke(311));
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
    if (n.flags |= 2048, Eo(9, Lf.bind(null, n, r, l, t), void 0, null), kn === null) throw Error(ke(349));
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
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: wo, lastRenderedState: e }, t.queue = e, e = e.dispatch = H0.bind(null, nn, e), [t.memoizedState, e];
}
function Eo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = nn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, nn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function _f() {
  return ms().memoizedState;
}
function da(e, t, n, r) {
  var l = Is();
  nn.flags |= e, l.memoizedState = Eo(1 | t, n, void 0, r === void 0 ? null : r);
}
function Za(e, t, n, r) {
  var l = ms();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (xn !== null) {
    var a = xn.memoizedState;
    if (o = a.destroy, r !== null && Nu(r, a.deps)) {
      l.memoizedState = Eo(t, n, o, r);
      return;
    }
  }
  nn.flags |= e, l.memoizedState = Eo(1 | t, n, o, r);
}
function Ad(e, t) {
  return da(8390656, 8, e, t);
}
function Eu(e, t) {
  return Za(2048, 8, e, t);
}
function Ff(e, t) {
  return Za(4, 2, e, t);
}
function Bf(e, t) {
  return Za(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, Za(4, 4, Uf.bind(null, t, e), n);
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
  return Ur & 21 ? (Cs(n, t) || (n = Gh(), nn.lanes |= n, Wr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Yn = !0), e.memoizedState = n);
}
function W0(e, t) {
  var n = Wt;
  Wt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ii.transition;
  Ii.transition = {};
  try {
    e(!1), t();
  } finally {
    Wt = n, Ii.transition = r;
  }
}
function Vf() {
  return ms().memoizedState;
}
function z0(e, t, n) {
  var r = gr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Yf(e)) Xf(t, n);
  else if (n = bf(e, t, n, r), n !== null) {
    var l = _n();
    js(n, e, r, l), Gf(n, t, r);
  }
}
function H0(e, t, n) {
  var r = gr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Yf(e)) Xf(t, l);
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
    n = bf(e, t, l, r), n !== null && (l = _n(), js(n, e, r, l), Gf(n, t, r));
  }
}
function Yf(e) {
  var t = e.alternate;
  return e === nn || t !== null && t === nn;
}
function Xf(e, t) {
  so = Da = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Gf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tu(e, n);
  }
}
var Pa = { readContext: ps, useCallback: bn, useContext: bn, useEffect: bn, useImperativeHandle: bn, useInsertionEffect: bn, useLayoutEffect: bn, useMemo: bn, useReducer: bn, useRef: bn, useState: bn, useDebugValue: bn, useDeferredValue: bn, useTransition: bn, useMutableSource: bn, useSyncExternalStore: bn, useId: bn, unstable_isNewReconciler: !1 }, K0 = { readContext: ps, useCallback: function(e, t) {
  return Is().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ps, useEffect: Ad, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, da(
    4194308,
    4,
    Uf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return da(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return da(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Is();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Is();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = z0.bind(null, nn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Is();
  return e = { current: e }, t.memoizedState = e;
}, useState: Td, useDebugValue: ju, useDeferredValue: function(e) {
  return Is().memoizedState = e;
}, useTransition: function() {
  var e = Td(!1), t = e[0];
  return e = W0.bind(null, e[1]), Is().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = nn, l = Is();
  if (qt) {
    if (n === void 0) throw Error(ke(407));
    n = n();
  } else {
    if (n = t(), kn === null) throw Error(ke(349));
    Ur & 30 || Rf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ad(Of.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Eo(9, Lf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Is(), t = kn.identifierPrefix;
  if (qt) {
    var n = Bs, r = Fs;
    n = (r & ~(1 << 32 - Es(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ko++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = U0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, V0 = {
  readContext: ps,
  useCallback: zf,
  useContext: ps,
  useEffect: Eu,
  useImperativeHandle: Wf,
  useInsertionEffect: Ff,
  useLayoutEffect: Bf,
  useMemo: Hf,
  useReducer: Ti,
  useRef: _f,
  useState: function() {
    return Ti(wo);
  },
  useDebugValue: ju,
  useDeferredValue: function(e) {
    var t = ms();
    return Kf(t, xn.memoizedState, e);
  },
  useTransition: function() {
    var e = Ti(wo)[0], t = ms().memoizedState;
    return [e, t];
  },
  useMutableSource: Af,
  useSyncExternalStore: $f,
  useId: Vf,
  unstable_isNewReconciler: !1
}, Y0 = { readContext: ps, useCallback: zf, useContext: ps, useEffect: Eu, useImperativeHandle: Wf, useInsertionEffect: Ff, useLayoutEffect: Bf, useMemo: Hf, useReducer: Ai, useRef: _f, useState: function() {
  return Ai(wo);
}, useDebugValue: ju, useDeferredValue: function(e) {
  var t = ms();
  return xn === null ? t.memoizedState = e : Kf(t, xn.memoizedState, e);
}, useTransition: function() {
  var e = Ai(wo)[0], t = ms().memoizedState;
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
var qa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Kr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), ca(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = _n(), l = gr(e), o = Us(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pr(e, o, l), t !== null && (js(t, e, l, r), ca(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = _n(), r = gr(e), l = Us(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pr(e, l, r), t !== null && (js(t, e, r, n), ca(t, e, r));
} };
function $d(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !mo(n, r) || !mo(l, o) : !0;
}
function Qf(e, t, n) {
  var r = !1, l = vr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ps(o) : (l = Gn(t) ? Fr : An.current, r = t.contextTypes, o = (r = r != null) ? El(e, l) : vr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = qa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Rd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && qa.enqueueReplaceState(t, t.state, null);
}
function Nc(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, gu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ps(o) : (o = Gn(t) ? Fr : An.current, l.context = El(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (vc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && qa.enqueueReplaceState(l, l.state, null), La(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ml(e, t) {
  try {
    var n = "", r = t;
    do
      n += km(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function $i(e, t, n) {
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
var X0 = typeof WeakMap == "function" ? WeakMap : Map;
function Jf(e, t, n) {
  n = Us(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Fa || (Fa = !0, Ac = r), kc(e, t);
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
    r = e.pingCache = new X0();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = ig.bind(null, e, t, n), t.then(e, e));
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
    return typeof o == "function" && !$u(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, qf(e, t, o, r, l)) : (e = ma(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : mo, n(a, r) && e.ref === t.ref) return Vs(e, t, l);
  }
  return t.flags |= 1, e = xr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function qf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (mo(o, r) && e.ref === t.ref) if (Yn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Yn = !0);
    else return t.lanes = e.lanes, Vs(e, t, l);
  }
  return wc(e, t, n, r, l);
}
function ep(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Xt(dl, es), es |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Xt(dl, es), es |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Xt(dl, es), es |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Xt(dl, es), es |= r;
  return Pn(e, t, l, n), t.child;
}
function tp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function wc(e, t, n, r, l) {
  var o = Gn(n) ? Fr : An.current;
  return o = El(t, o), xl(t, l), n = ku(e, t, n, r, o, l), r = wu(), e !== null && !Yn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Vs(e, t, l)) : (qt && r && cu(t), t.flags |= 1, Pn(e, t, n, l), t.child);
}
function Fd(e, t, n, r, l) {
  if (Gn(n)) {
    var o = !0;
    Ia(t);
  } else o = !1;
  if (xl(t, l), t.stateNode === null) ha(e, t), Qf(t, n, r), Nc(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = ps(d) : (d = Gn(n) ? Fr : An.current, d = El(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Rd(t, a, r, d), nr = !1;
    var p = t.memoizedState;
    a.state = p, La(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Xn.current || nr ? (typeof v == "function" && (vc(t, n, v, r), c = t.memoizedState), (i = nr || $d(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, If(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : vs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = ps(c) : (c = Gn(n) ? Fr : An.current, c = El(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Rd(t, a, r, c), nr = !1, p = t.memoizedState, a.state = p, La(t, r, a, l);
    var M = t.memoizedState;
    i !== f || p !== M || Xn.current || nr ? (typeof y == "function" && (vc(t, n, y, r), M = t.memoizedState), (d = nr || $d(t, n, d, r, p, M, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, M, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, M, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = M), a.props = r, a.state = M, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
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
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Xt(tn, l & 1), e === null)
    return xc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = ni(a, r, 0, null), e = Pr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Cc(n), t.memoizedState = jc, e) : Cu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return Q0(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = xr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = xr(i, o) : (o = Pr(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Cc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = jc, r;
  }
  return o = e.child, e = o.sibling, r = xr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Cu(e, t) {
  return t = ni({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Qo(e, t, n, r) {
  return r !== null && du(r), Cl(t, e.child, null, n), e = Cu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Q0(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = $i(Error(ke(422))), Qo(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = ni({ mode: "visible", children: r.children }, l, 0, null), o = Pr(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Cl(t, e.child, null, a), t.child.memoizedState = Cc(a), t.memoizedState = jc, o);
  if (!(t.mode & 1)) return Qo(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(ke(419)), r = $i(o, r, void 0), Qo(e, t, a, r);
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
    return Au(), r = $i(Error(ke(421))), Qo(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = cg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ns = fr(l.nextSibling), ss = t, qt = !0, ks = null, e !== null && (us[ds++] = Fs, us[ds++] = Bs, us[ds++] = Br, Fs = e.id, Bs = e.overflow, Br = t), t = Cu(t, r.children), t.flags |= 4096, t);
}
function Ud(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), yc(e.return, t, n);
}
function Ri(e, t, n, r, l) {
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
  if (Xt(tn, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Oa(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ri(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Oa(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Ri(t, !0, n, null, o);
      break;
    case "together":
      Ri(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ha(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Vs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Wr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ke(153));
  if (t.child !== null) {
    for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function J0(e, t, n) {
  switch (t.tag) {
    case 3:
      np(t), jl();
      break;
    case 5:
      Tf(t);
      break;
    case 1:
      Gn(t.type) && Ia(t);
      break;
    case 4:
      xu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Xt($a, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Xt(tn, tn.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? sp(e, t, n) : (Xt(tn, tn.current & 1), e = Vs(e, t, n), e !== null ? e.sibling : null);
      Xt(tn, tn.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return rp(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Xt(tn, tn.current), r) break;
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
        l = Xi(e, l), r = Xi(e, r), o = [];
        break;
      case "select":
        l = sn({}, l, { value: void 0 }), r = sn({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Ji(e, l), r = Ji(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ma);
    }
    qi(n, r);
    var a;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var i = l[d];
      for (a in i) i.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (ao.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (i = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== i && (c != null || i != null)) if (d === "style") if (i) {
        for (a in i) !i.hasOwnProperty(a) || c && c.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in c) c.hasOwnProperty(a) && i[a] !== c[a] && (n || (n = {}), n[a] = c[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (ao.hasOwnProperty(d) ? (c != null && d === "onScroll" && Qt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
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
function Z0(e, t, n) {
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
      return Gn(t.type) && ba(), In(t), null;
    case 3:
      return r = t.stateNode, Sl(), Jt(Xn), Jt(An), vu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Xo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ks !== null && (Lc(ks), ks = null))), Sc(e, t), In(t), null;
    case 5:
      yu(t);
      var l = Rr(No.current);
      if (n = t.type, e !== null && t.stateNode != null) op(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ke(166));
          return In(t), null;
        }
        if (e = Rr(Rs.current), Xo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ts] = t, r[yo] = o, e = (t.mode & 1) !== 0, n) {
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
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Yo(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Yo(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : ao.hasOwnProperty(a) && i != null && a === "onScroll" && Qt("scroll", r);
          }
          switch (n) {
            case "input":
              Fo(r), Ju(r, o, !0);
              break;
            case "textarea":
              Fo(r), qu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ma);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Lh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ts] = t, e[yo] = r, lp(e, t, !1, !1), t.stateNode = e;
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
                Qu(e, r), l = Xi(e, r), Qt("invalid", e);
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
              o === "style" ? Ph(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Oh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && io(e, c) : typeof c == "number" && io(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (ao.hasOwnProperty(o) ? c != null && o === "onScroll" && Qt("scroll", e) : c != null && Gc(e, o, c, a));
            }
            switch (n) {
              case "input":
                Fo(e), Ju(e, r, !1);
                break;
              case "textarea":
                Fo(e), qu(e);
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
                typeof l.onClick == "function" && (e.onclick = Ma);
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
        if (typeof r != "string" && t.stateNode === null) throw Error(ke(166));
        if (n = Rr(No.current), Rr(Rs.current), Xo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ts] = t, (o = r.nodeValue !== n) && (e = ss, e !== null)) switch (e.tag) {
            case 3:
              Yo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Yo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ts] = t, t.stateNode = r;
      }
      return In(t), null;
    case 13:
      if (Jt(tn), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (qt && ns !== null && t.mode & 1 && !(t.flags & 128)) Cf(), jl(), t.flags |= 98560, o = !1;
        else if (o = Xo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ke(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ke(317));
            o[Ts] = t;
          } else jl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          In(t), o = !1;
        } else ks !== null && (Lc(ks), ks = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || tn.current & 1 ? yn === 0 && (yn = 3) : Au())), t.updateQueue !== null && (t.flags |= 4), In(t), null);
    case 4:
      return Sl(), Sc(e, t), e === null && go(t.stateNode.containerInfo), In(t), null;
    case 10:
      return pu(t.type._context), In(t), null;
    case 17:
      return Gn(t.type) && ba(), In(t), null;
    case 19:
      if (Jt(tn), o = t.memoizedState, o === null) return In(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Wl(o, !1);
      else {
        if (yn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = Oa(e), a !== null) {
            for (t.flags |= 128, Wl(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Xt(tn, tn.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && un() > bl && (t.flags |= 128, r = !0, Wl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Oa(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Wl(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !qt) return In(t), null;
        } else 2 * un() - o.renderingStartTime > bl && n !== 1073741824 && (t.flags |= 128, r = !0, Wl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = un(), t.sibling = null, n = tn.current, Xt(tn, r ? n & 1 | 2 : n & 1), t) : (In(t), null);
    case 22:
    case 23:
      return Tu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? es & 1073741824 && (In(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : In(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ke(156, t.tag));
}
function q0(e, t) {
  switch (uu(t), t.tag) {
    case 1:
      return Gn(t.type) && ba(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Sl(), Jt(Xn), Jt(An), vu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return yu(t), null;
    case 13:
      if (Jt(tn), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ke(340));
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
var Jo = !1, Tn = !1, eg = typeof WeakSet == "function" ? WeakSet : Set, He = null;
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
function tg(e, t) {
  if (uc = ja, e = hf(), iu(e)) {
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
  for (dc = { focusedElem: e, selectionRange: n }, ja = !1, He = t; He !== null; ) if (t = He, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, He = e;
  else for (; He !== null; ) {
    t = He;
    try {
      var M = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (M !== null) {
            var C = M.memoizedProps, _ = M.memoizedState, w = t.stateNode, m = w.getSnapshotBeforeUpdate(t.elementType === t.type ? C : vs(t.type, C), _);
            w.__reactInternalSnapshotBeforeUpdate = m;
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
          throw Error(ke(163));
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
  return M = Wd, Wd = !1, M;
}
function ro(e, t, n) {
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
function ei(e, t) {
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
  t !== null && (e.alternate = null, ip(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ts], delete t[yo], delete t[pc], delete t[P0], delete t[_0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ma));
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
    $s.onCommitFiberUnmount(Va, n);
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
      jn !== null && (Ns ? (e = jn, n = n.stateNode, e.nodeType === 8 ? Si(e.parentNode, n) : e.nodeType === 1 && Si(e, n), fo(e)) : Si(jn, n.stateNode));
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
    n === null && (n = e.stateNode = new eg()), t.forEach(function(r) {
      var l = ug.bind(null, e, r);
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
      if (jn === null) throw Error(ke(160));
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
          ro(3, e, e.return), ei(3, e);
        } catch (C) {
          on(e, e.return, C);
        }
        try {
          ro(5, e, e.return);
        } catch (C) {
          on(e, e.return, C);
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
          io(l, "");
        } catch (C) {
          on(e, e.return, C);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && $h(l, o), ec(i, a);
          var d = ec(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], f = c[a + 1];
            v === "style" ? Ph(l, f) : v === "dangerouslySetInnerHTML" ? Oh(l, f) : v === "children" ? io(l, f) : Gc(l, v, f, d);
          }
          switch (i) {
            case "input":
              Gi(l, o);
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
          l[yo] = o;
        } catch (C) {
          on(e, e.return, C);
        }
      }
      break;
    case 6:
      if (ys(t, e), bs(e), r & 4) {
        if (e.stateNode === null) throw Error(ke(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (C) {
          on(e, e.return, C);
        }
      }
      break;
    case 3:
      if (ys(t, e), bs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        fo(t.containerInfo);
      } catch (C) {
        on(e, e.return, C);
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
                ro(4, p, p.return);
                break;
              case 1:
                ul(p, p.return);
                var M = p.stateNode;
                if (typeof M.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                  } catch (C) {
                    on(r, n, C);
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
              } catch (C) {
                on(e, e.return, C);
              }
            }
          } else if (f.tag === 6) {
            if (v === null) try {
              f.stateNode.nodeValue = d ? "" : f.memoizedProps;
            } catch (C) {
              on(e, e.return, C);
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
        throw Error(ke(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (io(l, ""), r.flags &= -33);
          var o = zd(e);
          Tc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = zd(e);
          Ic(e, i, a);
          break;
        default:
          throw Error(ke(161));
      }
    } catch (c) {
      on(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function ng(e, t, n) {
  He = e, hp(e);
}
function hp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; He !== null; ) {
    var l = He, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Jo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || Tn;
        i = Jo;
        var d = Tn;
        if (Jo = a, (Tn = c) && !d) for (He = l; He !== null; ) a = He, c = a.child, a.tag === 22 && a.memoizedState !== null ? Yd(l) : c !== null ? (c.return = a, He = c) : Yd(l);
        for (; o !== null; ) He = o, hp(o), o = o.sibling;
        He = l, Jo = i, Tn = d;
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
            Tn || ei(5, t);
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
                  f !== null && fo(f);
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
            throw Error(ke(163));
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
            ei(4, t);
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
var sg = Math.ceil, _a = Ys.ReactCurrentDispatcher, Su = Ys.ReactCurrentOwner, fs = Ys.ReactCurrentBatchConfig, It = 0, kn = null, fn = null, Cn = 0, es = 0, dl = kr(0), yn = 0, jo = null, Wr = 0, ti = 0, Mu = 0, lo = null, Vn = null, bu = 0, bl = 1 / 0, Ds = null, Fa = !1, Ac = null, mr = null, Zo = !1, cr = null, Ba = 0, oo = 0, $c = null, fa = -1, pa = 0;
function _n() {
  return It & 6 ? un() : fa !== -1 ? fa : fa = un();
}
function gr(e) {
  return e.mode & 1 ? It & 2 && Cn !== 0 ? Cn & -Cn : B0.transition !== null ? (pa === 0 && (pa = Gh()), pa) : (e = Wt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : nf(e.type)), e) : 1;
}
function js(e, t, n, r) {
  if (50 < oo) throw oo = 0, $c = null, Error(ke(185));
  bo(e, n, r), (!(It & 2) || e !== kn) && (e === kn && (!(It & 2) && (ti |= n), yn === 4 && or(e, Cn)), Qn(e, r), n === 1 && It === 0 && !(t.mode & 1) && (bl = un() + 500, Ja && wr()));
}
function Qn(e, t) {
  var n = e.callbackNode;
  Bm(e, t);
  var r = Ea(e, e === kn ? Cn : 0);
  if (r === 0) n !== null && nd(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && nd(n), t === 1) e.tag === 0 ? F0(Xd.bind(null, e)) : wf(Xd.bind(null, e)), O0(function() {
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
          n = wa;
          break;
        case 536870912:
          n = Xh;
          break;
        default:
          n = wa;
      }
      n = Np(n, fp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function fp(e, t) {
  if (fa = -1, pa = 0, It & 6) throw Error(ke(327));
  var n = e.callbackNode;
  if (yl() && e.callbackNode !== n) return null;
  var r = Ea(e, e === kn ? Cn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ua(e, r);
  else {
    t = r;
    var l = It;
    It |= 2;
    var o = mp();
    (kn !== e || Cn !== t) && (Ds = null, bl = un() + 500, Dr(e, t));
    do
      try {
        og();
        break;
      } catch (i) {
        pp(e, i);
      }
    while (!0);
    fu(), _a.current = o, It = l, fn !== null ? t = 0 : (kn = null, Cn = 0, t = yn);
  }
  if (t !== 0) {
    if (t === 2 && (l = lc(e), l !== 0 && (r = l, t = Rc(e, l))), t === 1) throw n = jo, Dr(e, 0), or(e, r), Qn(e, un()), n;
    if (t === 6) or(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !rg(l) && (t = Ua(e, r), t === 2 && (o = lc(e), o !== 0 && (r = o, t = Rc(e, o))), t === 1)) throw n = jo, Dr(e, 0), or(e, r), Qn(e, un()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ke(345));
        case 2:
          Ir(e, Vn, Ds);
          break;
        case 3:
          if (or(e, r), (r & 130023424) === r && (t = bu + 500 - un(), 10 < t)) {
            if (Ea(e, 0) !== 0) break;
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
          if (r = l, r = un() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * sg(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = fc(Ir.bind(null, e, Vn, Ds), r);
            break;
          }
          Ir(e, Vn, Ds);
          break;
        case 5:
          Ir(e, Vn, Ds);
          break;
        default:
          throw Error(ke(329));
      }
    }
  }
  return Qn(e, un()), e.callbackNode === n ? fp.bind(null, e) : null;
}
function Rc(e, t) {
  var n = lo;
  return e.current.memoizedState.isDehydrated && (Dr(e, t).flags |= 256), e = Ua(e, t), e !== 2 && (t = Vn, Vn = n, t !== null && Lc(t)), e;
}
function Lc(e) {
  Vn === null ? Vn = e : Vn.push.apply(Vn, e);
}
function rg(e) {
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
  for (t &= ~Mu, t &= ~ti, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Es(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Xd(e) {
  if (It & 6) throw Error(ke(327));
  yl();
  var t = Ea(e, 0);
  if (!(t & 1)) return Qn(e, un()), null;
  var n = Ua(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = lc(e);
    r !== 0 && (t = r, n = Rc(e, r));
  }
  if (n === 1) throw n = jo, Dr(e, 0), or(e, t), Qn(e, un()), n;
  if (n === 6) throw Error(ke(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ir(e, Vn, Ds), Qn(e, un()), null;
}
function Iu(e, t) {
  var n = It;
  It |= 1;
  try {
    return e(t);
  } finally {
    It = n, It === 0 && (bl = un() + 500, Ja && wr());
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
  if (n !== -1 && (e.timeoutHandle = -1, L0(n)), fn !== null) for (n = fn.return; n !== null; ) {
    var r = n;
    switch (uu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ba();
        break;
      case 3:
        Sl(), Jt(Xn), Jt(An), vu();
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
  if (kn = e, fn = e = xr(e.current, null), Cn = es = t, yn = 0, jo = null, Mu = ti = Wr = 0, Vn = lo = null, $r !== null) {
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
      if (fu(), ua.current = Pa, Da) {
        for (var r = nn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Da = !1;
      }
      if (Ur = 0, Nn = xn = nn = null, so = !1, ko = 0, Su.current = null, n === null || n.return === null) {
        yn = 1, jo = t, fn = null;
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
            var M = t.updateQueue;
            if (M === null) {
              var C = /* @__PURE__ */ new Set();
              C.add(c), t.updateQueue = C;
            } else M.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Ld(o, d, t), Au();
              break e;
            }
            c = Error(ke(426));
          }
        } else if (qt && i.mode & 1) {
          var _ = Od(a);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), Dd(_, a, i, o, t), du(Ml(c, i));
            break e;
          }
        }
        o = c = Ml(c, i), yn !== 4 && (yn = 2), lo === null ? lo = [o] : lo.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = Jf(o, c, t);
              bd(o, w);
              break e;
            case 1:
              i = c;
              var m = o.type, g = o.stateNode;
              if (!(o.flags & 128) && (typeof m.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (mr === null || !mr.has(g)))) {
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
    } catch (E) {
      t = E, fn === n && n !== null && (fn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function mp() {
  var e = _a.current;
  return _a.current = Pa, e === null ? Pa : e;
}
function Au() {
  (yn === 0 || yn === 3 || yn === 2) && (yn = 4), kn === null || !(Wr & 268435455) && !(ti & 268435455) || or(kn, Cn);
}
function Ua(e, t) {
  var n = It;
  It |= 2;
  var r = mp();
  (kn !== e || Cn !== t) && (Ds = null, Dr(e, t));
  do
    try {
      lg();
      break;
    } catch (l) {
      pp(e, l);
    }
  while (!0);
  if (fu(), It = n, _a.current = r, fn !== null) throw Error(ke(261));
  return kn = null, Cn = 0, yn;
}
function lg() {
  for (; fn !== null; ) gp(fn);
}
function og() {
  for (; fn !== null && !Am(); ) gp(fn);
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
      if (n = q0(n, t), n !== null) {
        n.flags &= 32767, fn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        yn = 6, fn = null;
        return;
      }
    } else if (n = Z0(n, t, es), n !== null) {
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
    fs.transition = null, Wt = 1, ag(e, t, n, r);
  } finally {
    fs.transition = l, Wt = r;
  }
  return null;
}
function ag(e, t, n, r) {
  do
    yl();
  while (cr !== null);
  if (It & 6) throw Error(ke(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ke(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Um(e, o), e === kn && (fn = kn = null, Cn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Zo || (Zo = !0, Np(wa, function() {
    return yl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = fs.transition, fs.transition = null;
    var a = Wt;
    Wt = 1;
    var i = It;
    It |= 4, Su.current = null, tg(e, n), dp(n, e), M0(dc), ja = !!uc, dc = uc = null, e.current = n, ng(n), $m(), It = i, Wt = a, fs.transition = o;
  } else e.current = n;
  if (Zo && (Zo = !1, cr = e, Ba = l), o = e.pendingLanes, o === 0 && (mr = null), Om(n.stateNode), Qn(e, un()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Fa) throw Fa = !1, e = Ac, Ac = null, e;
  return Ba & 1 && e.tag !== 0 && yl(), o = e.pendingLanes, o & 1 ? e === $c ? oo++ : (oo = 0, $c = e) : oo = 0, wr(), null;
}
function yl() {
  if (cr !== null) {
    var e = Qh(Ba), t = fs.transition, n = Wt;
    try {
      if (fs.transition = null, Wt = 16 > e ? 16 : e, cr === null) var r = !1;
      else {
        if (e = cr, cr = null, Ba = 0, It & 6) throw Error(ke(331));
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
                      ro(8, v, o);
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
              var M = o.alternate;
              if (M !== null) {
                var C = M.child;
                if (C !== null) {
                  M.child = null;
                  do {
                    var _ = C.sibling;
                    C.sibling = null, C = _;
                  } while (C !== null);
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
                ro(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, He = w;
              break e;
            }
            He = o.return;
          }
        }
        var m = e.current;
        for (He = m; He !== null; ) {
          a = He;
          var g = a.child;
          if (a.subtreeFlags & 2064 && g !== null) g.return = a, He = g;
          else e: for (a = m; He !== null; ) {
            if (i = He, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  ei(9, i);
              }
            } catch (E) {
              on(i, i.return, E);
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
          $s.onPostCommitFiberRoot(Va, e);
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
function Gd(e, t, n) {
  t = Ml(n, t), t = Jf(e, t, 1), e = pr(e, t, 1), t = _n(), e !== null && (bo(e, 1, t), Qn(e, t));
}
function on(e, t, n) {
  if (e.tag === 3) Gd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Gd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mr === null || !mr.has(r))) {
        e = Ml(n, e), e = Zf(t, e, 1), t = pr(t, e, 1), e = _n(), t !== null && (bo(t, 1, e), Qn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function ig(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = _n(), e.pingedLanes |= e.suspendedLanes & n, kn === e && (Cn & n) === n && (yn === 4 || yn === 3 && (Cn & 130023424) === Cn && 500 > un() - bu ? Dr(e, 0) : Mu |= n), Qn(e, t);
}
function yp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Wo, Wo <<= 1, !(Wo & 130023424) && (Wo = 4194304)) : t = 1);
  var n = _n();
  e = Ks(e, t), e !== null && (bo(e, t, n), Qn(e, n));
}
function cg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), yp(e, n);
}
function ug(e, t) {
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
      throw Error(ke(314));
  }
  r !== null && r.delete(t), yp(e, n);
}
var vp;
vp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Xn.current) Yn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Yn = !1, J0(e, t, n);
    Yn = !!(e.flags & 131072);
  }
  else Yn = !1, qt && t.flags & 1048576 && Ef(t, Aa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ha(e, t), e = t.pendingProps;
      var l = El(t, An.current);
      xl(t, n), l = ku(null, t, r, e, l, n);
      var o = wu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Gn(r) ? (o = !0, Ia(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, gu(t), l.updater = qa, t.stateNode = l, l._reactInternals = t, Nc(t, r, e, n), t = Ec(null, t, r, !0, o, n)) : (t.tag = 0, qt && o && cu(t), Pn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ha(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = hg(r), e = vs(r, e), l) {
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
        throw Error(ke(
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
        if (np(t), e === null) throw Error(ke(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, If(e, t), La(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Ml(Error(ke(423)), t), t = Bd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Ml(Error(ke(424)), t), t = Bd(e, t, r, n, l);
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
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Xt($a, r._currentValue), r._currentValue = a, o !== null) if (Cs(o.value, a)) {
          if (o.children === l.children && !Xn.current) {
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
            if (a = o.return, a === null) throw Error(ke(341));
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : vs(r, l), ha(e, t), t.tag = 1, Gn(r) ? (e = !0, Ia(t)) : e = !1, xl(t, n), Qf(t, r, l), Nc(t, r, l, n), Ec(null, t, r, !0, e, n);
    case 19:
      return rp(e, t, n);
    case 22:
      return ep(e, t, n);
  }
  throw Error(ke(156, t.tag));
};
function Np(e, t) {
  return Vh(e, t);
}
function dg(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function hs(e, t, n, r) {
  return new dg(e, t, n, r);
}
function $u(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function hg(e) {
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
function ma(e, t, n, r, l, o) {
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
      return ni(n, l, o, t);
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
      throw Error(ke(130, e == null ? e : typeof e, ""));
  }
  return t = hs(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Pr(e, t, n, r) {
  return e = hs(7, e, r, t), e.lanes = n, e;
}
function ni(e, t, n, r) {
  return e = hs(22, e, r, t), e.elementType = Ih, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Li(e, t, n) {
  return e = hs(6, e, null, t), e.lanes = n, e;
}
function Oi(e, t, n) {
  return t = hs(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function fg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = mi(0), this.expirationTimes = mi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ru(e, t, n, r, l, o, a, i, c) {
  return e = new fg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = hs(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gu(o), e;
}
function pg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: el, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function kp(e) {
  if (!e) return vr;
  e = e._reactInternals;
  e: {
    if (Kr(e) !== e || e.tag !== 1) throw Error(ke(170));
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
    throw Error(ke(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Gn(n)) return kf(e, n, t);
  }
  return t;
}
function wp(e, t, n, r, l, o, a, i, c) {
  return e = Ru(n, r, !0, e, l, o, a, i, c), e.context = kp(null), n = e.current, r = _n(), l = gr(n), o = Us(r, l), o.callback = t ?? null, pr(n, o, l), e.current.lanes = l, bo(e, l, r), Qn(e, r), e;
}
function si(e, t, n, r) {
  var l = t.current, o = _n(), a = gr(l);
  return n = kp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Us(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pr(l, t, a), e !== null && (js(e, l, a, o), ca(e, l, a)), a;
}
function Wa(e) {
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
function mg() {
  return null;
}
var Ep = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ou(e) {
  this._internalRoot = e;
}
ri.prototype.render = Ou.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ke(409));
  si(e, t, null, null);
};
ri.prototype.unmount = Ou.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    zr(function() {
      si(null, e, null, null);
    }), t[Hs] = null;
  }
};
function ri(e) {
  this._internalRoot = e;
}
ri.prototype.unstable_scheduleHydration = function(e) {
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
function li(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Jd() {
}
function gg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Wa(a);
        o.call(d);
      };
    }
    var a = wp(t, r, e, 0, null, !1, !1, "", Jd);
    return e._reactRootContainer = a, e[Hs] = a.current, go(e.nodeType === 8 ? e.parentNode : e), zr(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = Wa(c);
      i.call(d);
    };
  }
  var c = Ru(e, 0, !1, null, null, !1, !1, "", Jd);
  return e._reactRootContainer = c, e[Hs] = c.current, go(e.nodeType === 8 ? e.parentNode : e), zr(function() {
    si(t, c, n, r);
  }), c;
}
function oi(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = Wa(a);
        i.call(c);
      };
    }
    si(t, a, e, l);
  } else a = gg(n, t, e, l, r);
  return Wa(a);
}
Jh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Gl(t.pendingLanes);
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
      if (Gi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Qa(r);
            if (!l) throw Error(ke(90));
            Ah(r), Gi(r, l);
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
var xg = { usingClientEntryPoint: !1, Events: [To, ll, Qa, _h, Fh, Iu] }, zl = { findFiberByHostInstance: Ar, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, yg = { bundleType: zl.bundleType, version: zl.version, rendererPackageName: zl.rendererPackageName, rendererConfig: zl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ys.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Hh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: zl.findFiberByHostInstance || mg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!qo.isDisabled && qo.supportsFiber) try {
    Va = qo.inject(yg), $s = qo;
  } catch {
  }
}
ls.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xg;
ls.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Du(t)) throw Error(ke(200));
  return pg(e, t, null, n);
};
ls.createRoot = function(e, t) {
  if (!Du(e)) throw Error(ke(299));
  var n = !1, r = "", l = Ep;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ru(e, 1, !1, null, null, n, !1, r, l), e[Hs] = t.current, go(e.nodeType === 8 ? e.parentNode : e), new Ou(t);
};
ls.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ke(188)) : (e = Object.keys(e).join(","), Error(ke(268, e)));
  return e = Hh(t), e = e === null ? null : e.stateNode, e;
};
ls.flushSync = function(e) {
  return zr(e);
};
ls.hydrate = function(e, t, n) {
  if (!li(t)) throw Error(ke(200));
  return oi(null, e, t, !0, n);
};
ls.hydrateRoot = function(e, t, n) {
  if (!Du(e)) throw Error(ke(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = Ep;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = wp(t, null, e, 1, n ?? null, l, !1, o, a), e[Hs] = t.current, go(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new ri(t);
};
ls.render = function(e, t, n) {
  if (!li(t)) throw Error(ke(200));
  return oi(null, e, t, !1, n);
};
ls.unmountComponentAtNode = function(e) {
  if (!li(e)) throw Error(ke(40));
  return e._reactRootContainer ? (zr(function() {
    oi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Hs] = null;
    });
  }), !0) : !1;
};
ls.unstable_batchedUpdates = Iu;
ls.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!li(n)) throw Error(ke(200));
  if (e == null || e._reactInternals === void 0) throw Error(ke(38));
  return oi(e, t, n, !1, r);
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
ya.createRoot = Zd.createRoot, ya.hydrateRoot = Zd.hydrateRoot;
var Cp = { exports: {} }, ai = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vg = u, Ng = Symbol.for("react.element"), kg = Symbol.for("react.fragment"), wg = Object.prototype.hasOwnProperty, Eg = vg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, jg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) wg.call(t, r) && !jg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ng, type: e, key: o, ref: a, props: l, _owner: Eg.current };
}
ai.Fragment = kg;
ai.jsx = Sp;
ai.jsxs = Sp;
Cp.exports = ai;
var s = Cp.exports;
let ar = [], Mp = 120, Di = !1;
async function Cg() {
  if (!Di) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Sg(n), Di = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Di = !0;
  }
}
function Sg(e) {
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
function za(e, t) {
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
function Mg(e) {
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
function bg(e) {
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
  return t === "UTC" ? bg(e) : Mg(e);
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
  const f = za(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const p = v - Mp * 6e4, { offsetMin: y } = Ws(p);
  let M = v - y * 6e4;
  const C = Ws(M);
  return C.offsetMin !== y && (M = v - C.offsetMin * 6e4), M;
}
function Ig({
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
  onResetStudio: M
}) {
  const [C, _] = u.useState(!1);
  u.useEffect(() => {
    if (!C) return;
    const E = (b) => {
      b.key === "Escape" && _(!1);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [C]);
  const w = u.useMemo(() => {
    const E = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), b = (e == null ? void 0 : e.durationMs) || 0;
    if (!E || b <= 0) return "-- ➔ --";
    const h = E + b, A = (K) => String(K).padStart(2, "0"), k = Lr(E, n), N = Lr(h, n), D = `${k.year}-${A(k.month)}-${A(k.day)}`, W = `${A(k.hour)}:${A(k.minute)}:${A(k.second)}`, $ = `${N.year}-${A(N.month)}-${A(N.day)}`, F = `${A(N.hour)}:${A(N.minute)}:${A(N.second)}`, se = n === "UTC" ? " (UTC)" : k.label ? ` (${k.label})` : "", ne = D === $ ? F : `${$} ${F}`;
    return `${D} ${W} ➔ ${ne}${se}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), m = u.useMemo(() => {
    const E = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (E >= 1440) {
      const b = (E / 1440).toFixed(1);
      return `(${b.endsWith(".0") ? parseInt(b, 10) : b}d / ${E}m Total)`;
    }
    return `(${E}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), g = () => {
    _(!1), M == null || M();
  }, T = C ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => _(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (E) => E.stopPropagation(), dir: "ltr", children: [
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
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: w }),
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
function jt(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), y = Gr(p.getUTCHours()), M = Gr(p.getUTCMinutes()), C = Gr(p.getUTCSeconds()), _ = l ? `${y}:${M}:${C}` : `${y}:${M}`;
    return r ? `${_} UTC` : _;
  }
  const { offsetMin: o, label: a } = Ws(e), i = new Date(e + o * 60 * 1e3), c = Gr(i.getUTCHours()), d = Gr(i.getUTCMinutes()), v = Gr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Tg = 600, eh = 250, cs = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), Dc = /* @__PURE__ */ new Set(), th = 4;
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
      !t || (e = t.signal) != null && e.aborted || (vl++, Ag(t));
    }
}
function ga(e, t, n, r = "mon-0") {
  const l = Pc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (cs.size >= Tg) {
    const i = cs.keys().next().value, c = cs.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), cs.delete(i);
  }
  cs.set(a, n), Dc.forEach((i) => i(e, l, n, o));
}
async function Ag(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      ga(n, r, v, l), a(v);
    } else c.status === 204 ? (ga(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (ga(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
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
  set: ga,
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
let Pi = null;
function $g() {
  try {
    const e = localStorage.getItem(Pu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Ap(e) {
  e && (Pi && clearTimeout(Pi), Pi = setTimeout(() => {
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
function Rg() {
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
function Lg(e) {
  try {
    localStorage.setItem(Tp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let sr = null, hl = null, _i = null, Hn = 0, Qr = 0, ea = -60, Co = 1;
function Og() {
  if (!sr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (sr = new e());
  }
  return sr && sr.state === "suspended" && sr.resume().catch(() => {
  }), sr;
}
function Ha(e, t = 1) {
  if (!e) return null;
  Co = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Og();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(Co, n.currentTime), hl = e, Dg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function nh(e) {
  if (Co = Math.max(0, Number(e) || 1), hl != null && hl.__audioGainNode && sr)
    try {
      hl.__audioGainNode.gain.setValueAtTime(Co, sr.currentTime);
    } catch {
    }
}
function Dg() {
  if (_i) return;
  const e = new Uint8Array(256), t = () => {
    const n = hl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Hn *= 0.85, Qr *= 0.85, Hn < 1e-3 && (Hn = 0), Qr < 1e-3 && (Qr = 0), ea = Hn > 1e-3 ? 20 * Math.log10(Hn) : -60;
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
        Hn = a > Hn ? Hn * 0.3 + a * 0.7 : Hn * 0.85 + a * 0.15, Qr = Math.max(Hn, o), ea = Hn > 1e-4 ? 20 * Math.log10(Hn) : -60;
      } catch {
        Hn = 0, Qr = 0, ea = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Hn,
        peak: Qr,
        db: ea,
        gain: Co,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), _i = requestAnimationFrame(t);
  };
  _i = requestAnimationFrame(t);
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
function Pg({
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
              onClick: (M) => {
                M.stopPropagation(), n == null || n(d);
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
    let y = 1 / 0, M = 1 / 0, C = -1 / 0, _ = -1 / 0;
    e.forEach((g) => {
      const T = g.x ?? g.X ?? 0, E = g.y ?? g.Y ?? 0, b = g.width ?? g.Width ?? 1920, h = g.height ?? g.Height ?? 1080;
      y = Math.min(y, T), M = Math.min(M, E), C = Math.max(C, T + b), _ = Math.max(_, E + h);
    });
    const w = Math.max(1, C - y), m = Math.max(1, _ - M);
    return { minX: y, minY: M, totalW: w, totalH: m };
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
            children: e.map((y, M) => {
              const C = y.displayId ?? y.DisplayId ?? `mon-${M}`, _ = (y.x ?? y.X ?? 0) - a.minX, w = (y.y ?? y.Y ?? 0) - a.minY, m = y.width ?? y.Width ?? 1920, g = y.height ?? y.Height ?? 1080, T = C === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${T ? "is-active" : ""}`,
                  onClick: (E) => {
                    E.stopPropagation(), n == null || n(C);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: _ + 10,
                        y: w + 10,
                        width: Math.max(10, m - 20),
                        height: Math.max(10, g - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: _ + m / 2,
                        y: w + g / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: M + 1
                      }
                    )
                  ]
                },
                C
              );
            })
          }
        ) })
      ]
    }
  );
}
function _g({
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
  activeAudioStationId: M = null,
  directorPlan: C = null,
  isAutoDirectorEnabled: _ = !0,
  targetDisplayId: w = "auto",
  onSelectDisplayId: m = null,
  areAllDisplaysPlaced: g = !1,
  hideDisplayStrip: T = !1
}) {
  var Ve;
  const E = e.hostname || e.name || e.id || "", b = Math.round(t), [h, A] = u.useState(() => !E || !b ? null : Dn.get(E, b) || null), [k, N] = u.useState(""), [D, W] = u.useState(!1), [$, F] = u.useState(!1), [se, ne] = u.useState(!1), K = u.useRef(l), I = u.useRef(null), U = u.useRef(0), O = u.useRef(t - a), z = u.useRef(t - a), R = u.useRef(!1), re = u.useRef(null), ee = u.useRef(!1);
  O.current = t - a;
  const J = (e == null ? void 0 : e.displays) || ((Ve = e == null ? void 0 : e.topology) == null ? void 0 : Ve.displays) || [], [V, $e] = u.useState(null);
  u.useEffect(() => {
    $e(null);
  }, [w]);
  const Le = u.useMemo(() => {
    const me = C || (e == null ? void 0 : e.directorPlan);
    return !me || !me.segments || me.segments.length === 0 ? null : me.segments.find((fe) => {
      const oe = fe.startEpochMs ?? fe.StartEpochMs ?? 0, Ce = fe.endEpochMs ?? fe.EndEpochMs ?? 0;
      return t >= oe && t <= Ce;
    }) || me.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t]), ye = u.useMemo(() => {
    var me;
    return V ? V.toLowerCase() : w && w !== "auto" && w !== "director" ? w.toLowerCase() : J.length > 1 && _ !== !1 && Le ? (Le.targetDisplayId || Le.TargetDisplayId || "mon-0").toLowerCase() : (((me = J[0]) == null ? void 0 : me.displayId) || "mon-0").toLowerCase();
  }, [V, w, J, _, Le]), ze = u.useRef(ye), [be, Ie] = u.useState(!1);
  u.useEffect(() => {
    if (ze.current && ze.current !== ye) {
      Ie(!0);
      const me = setTimeout(() => Ie(!1), 2e3);
      return ze.current = ye, () => clearTimeout(me);
    }
    ze.current = ye;
  }, [ye]);
  const tt = p[e == null ? void 0 : e.id] || p[E] || (e == null ? void 0 : e.segments) || [], it = tt.length === 0 || tt.some((me) => {
    const fe = me.startEpochMs ?? me.startEpoch ?? 0, oe = me.endEpochMs ?? me.endEpoch ?? 0;
    return t >= fe && t <= oe;
  }), ie = !!(r ? !Nl().isMuted : M && (e.id === M || E === M)), we = u.useCallback(() => {
    if (!I.current) return;
    const me = Nl();
    if (r)
      I.current.volume = me.volume, I.current.muted = me.isMuted, me.isMuted || Ha(I.current);
    else {
      const fe = !!(M && (e.id === M || E === M));
      I.current.muted = !fe, fe && (I.current.volume = me.volume, Ha(I.current));
    }
  }, [r, M, e.id, E]);
  u.useEffect(() => {
    we();
  }, [we]), u.useEffect(() => {
    const me = (fe) => {
      I.current && fe.detail && we();
    };
    return window.addEventListener("itb-audio-state-changed", me), () => window.removeEventListener("itb-audio-state-changed", me);
  }, [we]), u.useEffect(() => {
    I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !b || !E) return;
    if (l) {
      K.current = !0;
      return;
    }
    const me = K.current;
    K.current = l;
    let fe = !0;
    const oe = new AbortController(), Ce = Dn.get(E, b, ye);
    if (Ce) {
      A(Ce), F(!1), ne(!1);
      return;
    }
    ne(!0);
    const te = setTimeout(() => {
      fe && Dn.fetchFrame(E, b, oe.signal, ye).then((q) => {
        fe && (ne(!1), q && q !== "NO_SIGNAL" ? (A(q), F(!1)) : q === "NO_SIGNAL" && F(!0));
      });
    }, me ? 25 : 40), Y = Dn.subscribe((q, G, Q, ce) => {
      q === E && G === b && (!ce || ce === ye) && fe && (ne(!1), Q && Q !== "NO_SIGNAL" ? (A(Q), F(!1)) : Q === "NO_SIGNAL" && F(!0));
    });
    return () => {
      fe = !1, clearTimeout(te), oe.abort(), Y();
    };
  }, [E, b, n, l, r, D, ye]), u.useEffect(() => {
    if (!E || !(r || l)) {
      l || (re.current && clearTimeout(re.current), R.current = !1, N(""), W(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load()));
      return;
    }
    let fe = null;
    return l && !v && it ? fe = setTimeout(() => {
      const oe = O.current;
      U.current = oe, z.current = oe, R.current = !1;
      const Ce = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + oe}&displayId=${encodeURIComponent(ye)}&_t=${Date.now()}`;
      W(!1), N(Ce);
    }, 80) : l || (re.current && clearTimeout(re.current), R.current = !1, N(""), W(!1), I.current && (I.current.pause(), I.current.removeAttribute("src"), I.current.load())), () => {
      fe && clearTimeout(fe);
    };
  }, [l, r, E, a, i, v, it, ye]), u.useEffect(() => {
    if (!E || !(r || l)) return;
    const fe = O.current, oe = Math.abs(fe - z.current);
    if (!l || oe < 800) {
      z.current = fe;
      return;
    }
    return R.current = !0, z.current = fe, U.current = fe, I.current && I.current.pause(), W(!1), re.current && clearTimeout(re.current), re.current = setTimeout(() => {
      if (!it || v) {
        N(""), W(!1), R.current = !1;
        return;
      }
      const Ce = O.current, L = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Ce}&displayId=${encodeURIComponent(ye)}&_t=${Date.now()}`;
      N(L);
    }, 75), () => {
      re.current && clearTimeout(re.current);
    };
  }, [t, l, r, E, a, i, v, it, ye]), u.useEffect(() => {
    if (r || !l || !I.current || !D || R.current) return;
    const me = (O.current - U.current) / 1e3;
    if (me >= 0) {
      const fe = I.current, oe = fe.currentTime, Ce = Math.abs(oe - me);
      if (Ce > 0.35 && Ce < 3)
        try {
          fe.currentTime = me;
        } catch {
        }
    }
  }, [r, l, t, D]), u.useEffect(() => {
    if (!r || !l || !k || !D || v) return;
    let me = null, fe = I.current ? I.current.currentTime : 0, oe = performance.now(), Ce = U.current + Math.round(fe * 1e3);
    const L = () => {
      const te = I.current;
      if (te && !te.paused && !te.ended && !ee.current && !R.current) {
        const Y = performance.now(), q = te.currentTime;
        Math.abs(q - fe) > 5e-4 && (fe = q, oe = Y);
        const G = Math.max(0, (Y - oe) / 1e3), Q = te.playbackRate || y || 1, ce = fe + G * Q;
        let qe = U.current + Math.round(ce * 1e3);
        const De = qe - Ce;
        if (De < 0 && De > -300 && (qe = Ce), qe >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Xe = a + qe, at = f == null ? void 0 : f.find((Ge) => Xe >= Ge.startEpochMs && Xe < Ge.endEpochMs);
        if (at) {
          ee.current = !0;
          const Ge = at.endEpochMs - a;
          d(Ge), U.current = Ge, Ce = Ge, z.current = Ge;
          const Tt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Ge}&_t=${Date.now()}`;
          W(!1), N(Tt), setTimeout(() => {
            ee.current = !1;
          }, 300);
          return;
        }
        qe !== Ce && (Ce = qe, z.current = qe, d == null || d(qe));
      }
      me = requestAnimationFrame(L);
    };
    return me = requestAnimationFrame(L), () => {
      me && cancelAnimationFrame(me);
    };
  }, [
    r,
    l,
    k,
    D,
    v,
    y,
    c,
    a,
    i,
    E,
    f,
    d,
    o
  ]);
  const Ke = () => {
    if (ee.current) return;
    const me = a + O.current, fe = tt.map((oe) => ({ start: oe.startEpochMs ?? oe.startEpoch ?? 0, end: oe.endEpochMs ?? oe.endEpoch ?? 0 })).filter((oe) => oe.start > me + 200).sort((oe, Ce) => oe.start - Ce.start)[0];
    if (fe && fe.start - a < c) {
      ee.current = !0;
      const oe = fe.start - a;
      d(oe), U.current = oe;
      const Ce = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(E)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + oe}&_t=${Date.now()}`;
      W(!1), N(Ce), setTimeout(() => {
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
    (r || l) && k && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: I,
        src: k,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: D ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: D ? 3 : 1,
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
          we(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y), l && I.current && I.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          R.current = !1, W(!0), we(), I.current && (I.current.defaultPlaybackRate = y, I.current.playbackRate = y);
        },
        onWaiting: () => {
          W(!1);
        },
        onTimeUpdate: () => {
          var me;
          !D && ((me = I.current) == null ? void 0 : me.currentTime) > 0 && (R.current = !1, W(!0));
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
          zIndex: (r || l) && D && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: h && !$ ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: h,
            alt: E,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => F(!0)
          }
        ) : (!h || $ || !it) && !k ? /* @__PURE__ */ s.jsx($p, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && it && !D && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
    J.length > 1 && /* @__PURE__ */ s.jsx(
      Rp,
      {
        displays: J,
        activeDisplayId: ye,
        onSelectDisplay: (me) => {
          $e(me), m == null || m(me);
        },
        isTransitioning: be,
        mode: _ ? "AUTO" : "MANUAL"
      }
    ),
    !T && /* @__PURE__ */ s.jsx(
      Pg,
      {
        displays: J,
        activeDisplayId: ye,
        onSelectDisplay: (me) => {
          $e(me), m == null || m(me);
        },
        areAllDisplaysPlaced: g,
        isAutoDirectorEnabled: _
      }
    )
  ] });
}
function Fg({
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
  onOpenSpotlight: M,
  onSelectActiveStation: C,
  recordingSegments: _ = {},
  playbackSpeed: w = 1,
  activeAudioStationId: m = null,
  onSoloAudio: g,
  directorPlan: T = null,
  isAutoDirectorEnabled: E = !0,
  targetDisplayId: b = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: k = 0,
  borderColor: N = null,
  onSwapWithNext: D = null
}) {
  var I;
  const W = !!(m && (e.id === m || e.hostname && e.hostname === m)), $ = (e.hostname || e.name || "").includes("Offline"), F = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((I = e == null ? void 0 : e.topology) == null ? void 0 : I.displays) || []).length > 1;
  const ne = () => {
    if (t) {
      const U = b && b !== "auto" && b !== "director" ? b : null;
      M && M(e.id, U);
    } else
      C && C(e.id);
  }, K = (U) => {
    U.preventDefault(), U.stopPropagation(), t && C && (i && i(!1), C(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: ne,
      onContextMenu: K,
      className: `camera-card ${F} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${F}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            D && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (U) => {
                  U.stopPropagation(), D();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            g && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${W ? "audio-active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), g(W ? null : e.id);
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
            M && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (U) => {
                  U.stopPropagation();
                  const O = b && b !== "auto" && b !== "director" ? b : null;
                  M(e.id, O);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            C && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), t && i && i(!1), C(t ? null : e.id);
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
            _g,
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
              isSpotlightActive: p,
              globalGaps: y,
              recordingSegments: _,
              playbackSpeed: w,
              activeAudioStationId: m,
              directorPlan: T,
              isAutoDirectorEnabled: E,
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
        !$ && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
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
const Jl = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Lp(e) {
  if (!e || typeof e != "string")
    return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
  const t = e.trim().toLowerCase();
  if (Jl.includes(t)) {
    const n = t.includes("right") ? 100 : 0, r = t.includes("bottom") ? 100 : 0;
    return { isCustom: !1, preset: t, xPct: n, yPct: r };
  }
  if (t.startsWith("custom:") || t.includes(",")) {
    const n = t.replace("custom:", "").split(/[,;]/);
    if (n.length >= 2) {
      const r = parseFloat(n[0].replace("%", "")), l = parseFloat(n[1].replace("%", ""));
      if (!isNaN(r) && !isNaN(l))
        return {
          isCustom: !0,
          preset: null,
          xPct: Math.max(0, Math.min(100, r)),
          yPct: Math.max(0, Math.min(100, l))
        };
    }
  }
  return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
}
function Bg(e) {
  const t = Lp(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Ug({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var W;
  const r = u.useRef(null), l = u.useRef(null), [o, a] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), i = t || o, c = Lp(i), [d, v] = u.useState(!1), [f, p] = u.useState(null);
  u.useEffect(() => {
    d || (c.isCustom ? p({ xPct: c.xPct, yPct: c.yPct }) : p(null));
  }, [i, d, c.isCustom, c.xPct, c.yPct]);
  const y = u.useCallback(($) => {
    $ && ($.preventDefault(), $.stopPropagation());
    let F;
    if (c.isCustom || !Jl.includes(c.preset))
      F = "top-right";
    else {
      const ne = (Jl.indexOf(c.preset) + 1) % Jl.length;
      F = Jl[ne];
    }
    a(F), p(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", F);
    } catch {
    }
    n && n(F);
  }, [c.isCustom, c.preset, n]), M = u.useCallback(($) => {
    if ($.button !== void 0 && $.button !== 0 || $.target.closest(".btn-cycle-corner")) return;
    const F = r.current;
    if (!F) return;
    const se = F.parentElement;
    if (!se) return;
    const ne = F.getBoundingClientRect(), K = se.getBoundingClientRect();
    l.current = {
      startX: $.clientX,
      startY: $.clientY,
      clockWidth: ne.width,
      clockHeight: ne.height,
      parentRect: K,
      offsetX: $.clientX - ne.left,
      offsetY: $.clientY - ne.top,
      hasMoved: !1
    };
    const I = (O) => {
      if (!l.current) return;
      const z = l.current, R = Math.hypot(O.clientX - z.startX, O.clientY - z.startY);
      if (!z.hasMoved && R > 4 && (z.hasMoved = !0, v(!0)), !z.hasMoved) return;
      const re = z.parentRect.width, ee = z.parentRect.height, J = Math.max(1, re - z.clockWidth - 28), V = Math.max(1, ee - z.clockHeight - 28), $e = O.clientX - z.parentRect.left - z.offsetX - 14, Le = O.clientY - z.parentRect.top - z.offsetY - 14, ye = Math.max(0, Math.min(J, $e)), ze = Math.max(0, Math.min(V, Le)), be = Math.round(ye / J * 1e3) / 10, Ie = Math.round(ze / V * 1e3) / 10;
      p({ xPct: be, yPct: Ie });
    }, U = (O) => {
      window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", U);
      const z = l.current;
      if (l.current = null, v(!1), !z) return;
      if (!z.hasMoved) {
        y();
        return;
      }
      const R = Math.max(1, z.parentRect.width - z.clockWidth - 28), re = Math.max(1, z.parentRect.height - z.clockHeight - 28), ee = O.clientX - z.parentRect.left - z.offsetX - 14, J = O.clientY - z.parentRect.top - z.offsetY - 14, V = Math.max(0, Math.min(R, ee)), $e = Math.max(0, Math.min(re, J)), Le = V / R * 100, ye = $e / re * 100;
      let ze;
      Le > 94 && ye < 6 ? ze = "top-right" : Le < 6 && ye < 6 ? ze = "top-left" : Le > 94 && ye > 94 ? ze = "bottom-right" : Le < 6 && ye > 94 ? ze = "bottom-left" : ze = `custom:${Le.toFixed(1)},${ye.toFixed(1)}`, a(ze);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", ze);
      } catch {
      }
      n && n(ze);
    };
    window.addEventListener("pointermove", I), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", U);
  }, [y, n]), C = new Date(e || Date.now()), _ = C.getUTCFullYear(), w = String(C.getUTCMonth() + 1).padStart(2, "0"), m = String(C.getUTCDate()).padStart(2, "0"), g = String(C.getUTCHours()).padStart(2, "0"), T = String(C.getUTCMinutes()).padStart(2, "0"), E = String(C.getUTCSeconds()).padStart(2, "0"), b = `${_}-${w}-${m}`, h = `${g}:${T}:${E} UTC`, A = f !== null || c.isCustom, k = f || (c.isCustom ? { xPct: c.xPct, yPct: c.yPct } : null);
  let N;
  if (k) {
    const $ = k.xPct / 100, F = k.yPct / 100;
    N = {
      left: `calc(14px + (100% - 28px) * ${$})`,
      top: `calc(14px + (100% - 28px) * ${F})`,
      transform: `translate(-${k.xPct}%, -${k.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const D = !A && c.preset ? `corner-${c.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${D} ${d ? "is-dragging" : ""} ${A ? "is-custom" : ""}`,
      style: N,
      onPointerDown: M,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: b }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: h })
        ] }),
        d && k && /* @__PURE__ */ s.jsx("div", { className: "clock-drag-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
          Math.round(k.xPct),
          "%, ",
          Math.round(k.yPct),
          "%"
        ] }) }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cycle-corner",
            onClick: y,
            title: A ? `Custom Position (${Math.round((k == null ? void 0 : k.xPct) || 0)}%, ${Math.round((k == null ? void 0 : k.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((W = c.preset) == null ? void 0 : W.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function Wg() {
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
function zg(e) {
  const t = en(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Hg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function Kg({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var C, _, w, m, g, T;
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
    return ((C = l.layout) == null ? void 0 : C.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((_ = l.layout) == null ? void 0 : _.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((w = o.layout) == null ? void 0 : w.placements) || n;
  if (i === "cut")
    return ((m = l.layout) == null ? void 0 : m.placements) || n;
  const d = (t - c) / a, v = en(d, 0, 1), f = i === "linear" ? v : zg(v), p = ((g = l.layout) == null ? void 0 : g.placements) || [], y = ((T = o.layout) == null ? void 0 : T.placements) || [], M = y.map((E) => {
    const b = p.find((W) => W.stationId === E.stationId && W.displayId === E.displayId);
    if (!b)
      return {
        ...E,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(b.x + (E.x - b.x) * f), A = Math.round(b.y + (E.y - b.y) * f), k = Math.round(b.width + (E.width - b.width) * f), N = Math.round(b.height + (E.height - b.height) * f), D = Number(((b.rotation || 0) + ((E.rotation || 0) - (b.rotation || 0)) * f).toFixed(1));
    return {
      ...E,
      x: h,
      y: A,
      width: k,
      height: N,
      rotation: D,
      opacity: 1
    };
  });
  return p.forEach((E) => {
    y.some((h) => h.stationId === E.stationId && h.displayId === E.displayId) || M.push({
      ...E,
      opacity: Math.max(0, 1 - f)
    });
  }), M;
}
function Vg({
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
    const M = {
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
      nextTimeline: { ...e || {}, keyframes: [M] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: M
    };
  }
  const d = c.findIndex((M) => Math.abs(M.timestampEpochMs - n) <= l);
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
  }, f = [...c, v].sort((M, C) => M.timestampEpochMs - C.timestampEpochMs), p = f.findIndex((M) => M.id === v.id);
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
function Yg(e, t) {
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
function Xg(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
], Gg = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function Qg(e, t, n) {
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
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: p, y, width: M, height: C } = rr(v * c, 0, c, n, f);
      return {
        ...d,
        x: p,
        y,
        width: M,
        height: C,
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
      return e.slice(0, 3).map((y, M) => {
        const C = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: _, y: w, width: m, height: g } = rr(M * p, 0, p, n, C);
        return {
          ...y,
          x: _,
          y: w,
          width: m,
          height: g,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: C,
          aspectRatio: C,
          zIndex: M,
          rotation: 0,
          borderWidth: 2,
          borderColor: Et[M % Et.length],
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
      const M = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: C, cy: _ } = f[y], { x: w, y: m, width: g, height: T } = rr(C, _, d, v, M);
      return {
        ...p,
        x: w,
        y: m,
        width: g,
        height: T,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: M,
        aspectRatio: M,
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
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: M, cy: C } = v[p], { x: _, y: w, width: m, height: g } = rr(M, C, c, d, y);
      return {
        ...f,
        x: _,
        y: w,
        width: m,
        height: g,
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
    const v = d % l, f = Math.floor(d / l), p = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: M, width: C, height: _ } = rr(v * a, f * i, a, i, p);
    return {
      ...c,
      x: y,
      y: M,
      width: C,
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
function Jg({
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
  setIsPlaying: M,
  totalDurationMs: C,
  inPointMs: _ = 0,
  outPointMs: w,
  setPlayheadMs: m,
  globalGaps: g = [],
  recordingSegments: T = {},
  playbackSpeed: E = 1,
  onChangePlaybackSpeed: b,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: k = null,
  onOverrideDisplay: N,
  onResetOverride: D,
  compositionLayout: W = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: F = !0,
  onToggleAutoDirector: se,
  onUpdateCanvasLayout: ne,
  canvasLayoutTimeline: K = null,
  onUpdateCanvasLayoutTimeline: I,
  activeKfIndex: U = 0,
  setActiveKfIndex: O,
  isModalOpen: z = !1,
  isGridFullscreen: R = void 0,
  onToggleGridFullscreen: re = null
}) {
  const ee = f > 0 ? f : d + v, [J, V] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [$e, Le] = u.useState(() => {
    var x;
    return ((x = t[0]) == null ? void 0 : x.id) || null;
  }), [ye, ze] = u.useState(!1), [be, Ie] = u.useState(null), [tt, it] = u.useState({ index: null, position: null }), [ie, we] = u.useState(!1), [Ke, Ve] = u.useState(!1), [me, fe] = u.useState(!1), [oe, Ce] = u.useState(!1), [L, te] = u.useState(""), [Y, q] = u.useState(""), G = u.useRef(null), [Q, ce] = u.useState(() => {
    try {
      const x = localStorage.getItem("itb_canvas_saved_presets");
      return x ? JSON.parse(x) : [];
    } catch {
      return [];
    }
  }), qe = (x) => {
    ce(x);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(x));
    } catch {
    }
  }, [De, Xe] = u.useState(!1), at = R !== void 0 ? R : De, [Ge, Tt] = u.useState(!1);
  u.useRef(null);
  const Rt = u.useRef(null), Lt = u.useRef(null), Ot = u.useRef(null), [ot, yt] = u.useState({ width: 960, height: 540 }), [Je, Be] = u.useState(0), [Nt, Dt] = u.useState(!1);
  u.useEffect(() => {
    const x = (j) => {
      j.key === "Escape" && Dt(!1);
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, []);
  const [an, cn] = u.useState(!1), [wn, Pe] = u.useState(!1), [Oe, st] = u.useState(!1), [ae, nt] = u.useState(!1), [H, he] = u.useState(!1), [pe, Ue] = u.useState({ vertical: null, horizontal: null }), [Ze, ut] = u.useState(!0), [dt, et] = u.useState(!0), [ht, St] = u.useState(null), [Mt, Pt] = u.useState({ x: 0, y: 0, isInside: !1 }), rn = u.useRef(null), _t = u.useRef(null), zt = u.useRef(!1), [dn, Gt] = u.useState("auto-grid"), At = u.useRef([]), $n = u.useRef([]), gs = u.useRef(null), [, Ss] = u.useState(0), Vr = u.useRef(null), [Un, Xs] = u.useState(null), Ft = u.useCallback((x, j = "success", P = "💾") => {
    Vr.current && clearTimeout(Vr.current), Xs({ text: x, type: j, icon: P }), Vr.current = setTimeout(() => {
      Xs(null), Vr.current = null;
    }, 2200);
  }, []), [Kt, as] = u.useState(() => {
    var P, Z, X, B, ue, Ae;
    const x = (X = (Z = (P = K == null ? void 0 : K.keyframes) == null ? void 0 : P[0]) == null ? void 0 : Z.layout) == null ? void 0 : X.width, j = (Ae = (ue = (B = K == null ? void 0 : K.keyframes) == null ? void 0 : B[0]) == null ? void 0 : ue.layout) == null ? void 0 : Ae.height;
    if (x && j) {
      const ge = is.find((je) => je.w === x && je.h === j);
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
  }, []), Ms = u.useMemo(() => is.find((x) => x.id === Kt) || is[0], [Kt]), _e = Ms.w, Se = Ms.h, Os = Ms.ratio, $o = u.useMemo(() => {
    const x = [], j = _e >= 3e3 ? 200 : 100, P = j / 2, Z = j / 10;
    for (let X = 0; X <= _e; X += Z) {
      const B = X % j === 0, ue = !B && X % P === 0;
      x.push({ val: X, isMajor: B, isMed: ue });
    }
    return x;
  }, [_e]), jr = u.useMemo(() => {
    const x = [];
    for (let X = 0; X <= Se; X += 10) {
      const B = X % 100 === 0, ue = !B && X % 50 === 0;
      x.push({ val: X, isMajor: B, isMed: ue });
    }
    return x;
  }, [Se]), Ro = u.useCallback((x) => {
    const j = rn.current || Lt.current;
    if (!j) return;
    const P = j.getBoundingClientRect(), Z = en(Math.round((x.clientX - P.left) / P.width * _e), 0, _e), X = en(Math.round((x.clientY - P.top) / P.height * Se), 0, Se);
    Pt({ x: Z, y: X, isInside: !0 });
  }, [_e, Se]), Lo = u.useCallback(() => {
    Pt((x) => ({ ...x, isInside: !1 }));
  }, []), Jn = u.useCallback(() => {
    const x = Ot.current;
    if (!x) return;
    const j = x.getBoundingClientRect(), Z = Math.max(320, Math.floor(j.width || 960) - 104 - 16), X = Math.max(180, Math.floor(j.height || 540) - 16);
    let B, ue;
    Wn ? (B = Z, ue = Math.round(B / Os)) : Z / X >= Os ? (ue = X, B = Math.round(ue * Os)) : (B = Z, ue = Math.round(B / Os)), yt((Ae) => Ae.width === B && Ae.height === ue ? Ae : { width: B, height: ue });
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
    const P = j.displays && j.displays.length > 0 ? j.displays : j.topology && j.topology.displays && j.topology.displays.length > 0 ? j.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: j.width || 1920, height: j.height || 1080 }], Z = P.find((ge) => ge.isPrimary) || P[0], X = Z.width || Z.Width || j.width || 1920, B = Z.height || Z.Height || j.height || 1080, ue = X && B ? X / B : 16 / 9, Ae = P.length > 1;
    return {
      stationId: j.id,
      displayId: "auto",
      label: `${j.displayName || j.roleAlias || j.hostname || j.name} - ${Ae ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: j.displayName || j.roleAlias || j.hostname || j.name,
      stationHostname: j.hostname || j.id,
      isPrimary: !0,
      sourceWidth: X,
      sourceHeight: B,
      nativeAspectRatio: ue,
      aspectRatio: ue,
      width: X,
      height: B
    };
  }), [t, n]), Zt = u.useMemo(() => {
    const x = t && t.length > 0 ? t : n, j = [];
    return x.forEach((P) => {
      const Z = P.displays && P.displays.length > 0 ? P.displays : P.topology && P.topology.displays && P.topology.displays.length > 0 ? P.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: P.width || 1920, height: P.height || 1080 }], X = Z.find((ge) => ge.isPrimary) || Z[0], B = X.width || X.Width || P.width || 1920, ue = X.height || X.Height || P.height || 1080, Ae = B / ue;
      j.push({
        stationId: P.id,
        displayId: "auto",
        label: `${P.displayName || P.roleAlias || P.hostname || P.name} - ${Z.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: P.displayName || P.roleAlias || P.hostname || P.name,
        stationHostname: P.hostname || P.id,
        isPrimary: !0,
        sourceWidth: B,
        sourceHeight: ue,
        nativeAspectRatio: Ae,
        aspectRatio: Ae,
        width: B,
        height: ue
      }), Z.length > 1 && Z.forEach((ge, je) => {
        const xt = (ge.displayId || `mon-${je}`).toLowerCase(), ft = ge.displayNumber || je + 1, pt = ge.displayName || `Screen ${ft}`, Ne = ge.width || ge.Width || P.width || 1920, mt = ge.height || ge.Height || P.height || 1080, Bt = Ne / mt;
        j.push({
          stationId: P.id,
          displayId: xt,
          label: `${P.displayName || P.roleAlias || P.hostname || P.name} - ${pt}`,
          stationName: P.displayName || P.roleAlias || P.hostname || P.name,
          stationHostname: P.hostname || P.id,
          isPrimary: !!ge.isPrimary,
          sourceWidth: Ne,
          sourceHeight: mt,
          nativeAspectRatio: Bt,
          aspectRatio: Bt,
          width: Ne,
          height: mt
        });
      });
    }), j;
  }, [t, n]), [vn, pn] = u.useState(() => {
    var x;
    if (((x = K == null ? void 0 : K.keyframes) == null ? void 0 : x.length) > 0) {
      const j = JSON.parse(JSON.stringify(K));
      if (t && t.length > 0) {
        const P = new Set(t.map((X) => X.id));
        if (j.keyframes.forEach((X) => {
          var B, ue;
          ((ue = (B = X.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0 && (X.layout.placements = X.layout.placements.filter((Ae) => P.has(Ae.stationId)));
        }), j.keyframes.some((X) => {
          var B, ue;
          return ((ue = (B = X.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0;
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
    if (((x = K == null ? void 0 : K.keyframes) == null ? void 0 : x.length) > 0) {
      const j = JSON.parse(JSON.stringify(K));
      if (t && t.length > 0) {
        const Z = new Set(t.map((X) => X.id));
        j.keyframes.forEach((X) => {
          var B, ue;
          ((ue = (B = X.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0 && (X.layout.placements = X.layout.placements.filter((Ae) => Z.has(Ae.stationId)));
        });
      }
      pn(j), j.keyframes.some((Z) => {
        var X, B;
        return ((B = (X = Z.layout) == null ? void 0 : X.placements) == null ? void 0 : B.length) > 0;
      }) && (zt.current = !0, Gt("custom"));
    }
  }, [K, t]);
  const En = vn.keyframes || [], Oo = u.useMemo(() => Hg(En, ee), [En, ee]), mn = en(
    U ?? Oo,
    0,
    Math.max(0, En.length - 1)
  ), zn = En[mn] || En[Oo] || En[0], xe = u.useMemo(() => {
    var x;
    return ((x = zn == null ? void 0 : zn.layout) == null ? void 0 : x.placements) || [];
  }, [zn]), Zn = u.useCallback((x = "Action") => ({
    label: x,
    timeline: JSON.parse(JSON.stringify(vn)),
    aspectId: Kt,
    presetId: dn,
    selectedFeedIndex: Je
  }), [vn, Kt, dn, Je]), Rn = u.useCallback((x = "Action") => {
    const j = Zn(x);
    At.current.push(j), At.current.length > 50 && At.current.shift(), $n.current = [], Ss((P) => P + 1);
  }, [Zn]), $l = u.useCallback(() => {
    gs.current && (At.current.push(gs.current), At.current.length > 50 && At.current.shift(), $n.current = [], gs.current = null, Ss((x) => x + 1));
  }, []), Rl = u.useCallback(() => {
    const x = f > 0 ? f : d + v, j = 500;
    if (x <= d + j) return mn;
    const P = (zn == null ? void 0 : zn.layout) || {
      width: _e,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: xe
    }, { nextTimeline: Z, newIndex: X, isNew: B } = sh(vn, x, P, j);
    return B && (pn(Z), I && I(Z), O && O(X), Ft(
      `Keyframe #${X + 1} created at ${jt(x, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), X;
  }, [f, d, v, mn, zn, _e, Se, xe, vn, I, O, p, Ft]), S = u.useCallback((x, j = null) => {
    j && Rn(j);
    const P = f > 0 ? f : d + v;
    pn((Z) => {
      const { nextTimeline: X, newIndex: B, isNewKeyframe: ue } = Vg({
        prevTimeline: Z,
        newPlacements: x,
        currentEpochMs: P,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: _e,
        virtualH: Se,
        fps: 30
      });
      return I && I(X), O && O(B), ue && B > 0 && Ft(
        `Keyframe #${B + 1} created at ${jt(P, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), X;
    });
  }, [f, d, v, _e, Se, I, O, p, Ft, Rn]);
  u.useEffect(() => {
    if (hn.length > 0 && (!xe || xe.length === 0) && !zt.current) {
      let x = Kt;
      hn.length === 2 && Kt === "16:9" && (x = "32:9", as("32:9"));
      const j = is.find((Z) => Z.id === x) || is[0], P = qs(hn, j.w, j.h);
      P.length > 0 && (S(P), Gt("auto-grid"));
    }
  }, [hn, xe, S, Kt]);
  const le = u.useRef("");
  u.useEffect(() => {
    const x = (t || []).map((j) => j.id).sort().join(",");
    if (le.current === "") {
      le.current = x;
      return;
    }
    if (le.current !== x && (le.current = x, t && t.length > 0)) {
      const j = new Set(t.map((P) => P.id));
      if (dn === "auto-grid" || !zt.current) {
        let P = Kt;
        hn.length === 2 && Kt === "16:9" && (P = "32:9", as("32:9"));
        const Z = is.find((B) => B.id === P) || is[0], X = qs(hn, Z.w, Z.h);
        X.length > 0 && S(X);
      } else if (xe && xe.length > 0) {
        const P = xe.filter((Z) => j.has(Z.stationId));
        if (P.length !== xe.length)
          if (P.length === 0) {
            const Z = qs(hn, _e, Se);
            S(Z);
          } else
            S(P);
      }
    }
  }, [t, hn, dn, Kt, xe, S, _e, Se]), u.useEffect(() => {
    ne && ne({
      width: _e,
      height: Se,
      backgroundColor: "#070A10",
      fps: 30,
      placements: xe,
      timeline: vn
    });
  }, [xe, vn, ne, _e, Se]);
  const de = u.useCallback((x) => {
    const j = Ms, P = is.find((Z) => Z.id === x) || is[0];
    if (j.id !== P.id)
      if (as(P.id), zt.current) {
        const Z = P.w / j.w, X = P.h / j.h, B = xe.map((ue) => ({
          ...ue,
          x: Math.round(ue.x * Z),
          y: Math.round(ue.y * X),
          width: Math.round(ue.width * Z),
          height: Math.round(ue.height * X)
        }));
        S(B);
      } else {
        const Z = hn.length > 0 ? hn : xe && xe.length > 0 ? xe : Zt, X = qs(Z, P.w, P.h);
        S(X);
      }
  }, [Ms, xe, Zt, S]), ve = u.useCallback((x) => {
    const j = xe.length > 0 ? Math.max(...xe.map((ge) => ge.zIndex || 0)) + 1 : 0, P = Et[xe.length % Et.length], Z = x.nativeAspectRatio || (x.sourceWidth && x.sourceHeight ? x.sourceWidth / x.sourceHeight : 16 / 9), X = Z >= 1 ? 640 : Math.round(360 * Z), B = Z >= 1 ? Math.round(640 / Z) : 360, ue = {
      stationId: x.stationId,
      displayId: x.displayId,
      label: x.label,
      x: 100 + xe.length * 40 % 800,
      y: 80 + xe.length * 40 % 500,
      width: X,
      height: B,
      sourceWidth: x.sourceWidth || 1920,
      sourceHeight: x.sourceHeight || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z,
      zIndex: j,
      rotation: 0,
      borderWidth: 2,
      borderColor: P,
      shadowEffect: "deep",
      borderRadius: 0
    }, Ae = [...xe, ue];
    S(Ae), Be(Ae.length - 1);
  }, [xe, S]), Me = u.useCallback((x) => {
    const j = xe.filter((P, Z) => Z !== x);
    S(j), Be((P) => Math.max(0, P - 1));
  }, [xe, S]), Ee = u.useCallback(() => {
    S([]), Be(-1);
  }, [S]), Te = (x) => {
    const j = x.map((Z, X) => ({ p: Z, origIdx: X }));
    j.sort((Z, X) => (Z.p.zIndex ?? Z.origIdx) - (X.p.zIndex ?? X.origIdx));
    const P = [...x];
    return j.forEach(({ origIdx: Z }, X) => {
      P[Z] = { ...P[Z], zIndex: X + 1 };
    }), P;
  };
  u.useCallback((x = Je) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), P = j[x].zIndex, Z = j.length;
    if (P >= Z) return;
    const X = j.map((B, ue) => ue === x ? { ...B, zIndex: Z } : B.zIndex > P ? { ...B, zIndex: B.zIndex - 1 } : B);
    S(X);
  }, [Je, xe, S]), u.useCallback((x = Je) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), P = j[x].zIndex;
    if (P <= 1) return;
    const Z = j.map((X, B) => B === x ? { ...X, zIndex: 1 } : X.zIndex < P ? { ...X, zIndex: X.zIndex + 1 } : X);
    S(Z);
  }, [Je, xe, S]);
  const Re = u.useCallback((x = Je) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), P = j[x].zIndex, Z = P + 1;
    if (Z > j.length) return;
    const X = j.map((B, ue) => ue === x ? { ...B, zIndex: Z } : B.zIndex === Z ? { ...B, zIndex: P } : B);
    S(X);
  }, [Je, xe, S]), Qe = u.useCallback((x = Je) => {
    if (x < 0 || !xe[x]) return;
    const j = Te(xe), P = j[x].zIndex, Z = P - 1;
    if (Z < 1) return;
    const X = j.map((B, ue) => ue === x ? { ...B, zIndex: Z } : B.zIndex === Z ? { ...B, zIndex: P } : B);
    S(X);
  }, [Je, xe, S]), We = u.useCallback((x) => {
    if (Je < 0 || !xe[Je]) return;
    const j = xe.map((P, Z) => Z === Je ? { ...P, ...x } : P);
    S(j);
  }, [Je, xe, S]), Ye = u.useCallback((x = 90) => {
    const j = xe[Je];
    if (!j) return;
    const Z = ((j.rotation || 0) + x) % 360;
    We({ rotation: Z });
  }, [Je, xe, We]), rt = u.useCallback((x = Je) => {
    if (x < 0 || !xe[x]) return;
    const j = xe.length, P = xe.map((Z, X) => X === x ? {
      ...Z,
      x: 0,
      y: 0,
      width: _e,
      height: Se,
      zIndex: j
    } : Z);
    S(P);
  }, [Je, xe, S, _e, Se]), lt = u.useCallback((x) => {
    let j = [];
    const P = hn.length > 0 ? hn : Zt.length > 0 ? Zt : xe;
    switch (x) {
      case "auto":
      case "auto-grid":
        j = qs(P, _e, Se);
        break;
      case "1x1":
        P.length > 0 && (j = [{
          ...P[0],
          x: 0,
          y: 0,
          width: _e,
          height: Se,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: Et[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (P.length >= 2) {
          const Z = Math.round(_e / 2);
          j = P.slice(0, 2).map((X, B) => {
            const ue = X.nativeAspectRatio || (X.sourceWidth && X.sourceHeight ? X.sourceWidth / X.sourceHeight : 1.7777777777777777), { x: Ae, y: ge, width: je, height: xt } = rr(B * Z, 0, Z, Se, ue);
            return {
              ...X,
              x: Ae,
              y: ge,
              width: je,
              height: xt,
              sourceWidth: X.sourceWidth || 1920,
              sourceHeight: X.sourceHeight || 1080,
              nativeAspectRatio: ue,
              aspectRatio: ue,
              zIndex: B + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: Et[B % Et.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          j = qs(P, _e, Se);
        break;
      case "2x2": {
        const Z = Math.round(_e / 2), X = Math.round(Se / 2);
        j = P.slice(0, 4).map((B, ue) => ({
          ...B,
          x: ue % 2 * Z,
          y: Math.floor(ue / 2) * X,
          width: Z,
          height: X,
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
        if (P.length >= 2) {
          j = [
            { ...P[0], x: 0, y: 0, width: _e, height: Se, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: Et[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Z = P.slice(1, 4), X = Math.round(_e * 0.23), B = Math.round(X / (16 / 9));
          Z.forEach((ue, Ae) => {
            j.push({
              ...ue,
              x: _e - X - 24,
              y: 24 + Ae * (B + 16),
              width: X,
              height: B,
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
        if (P.length >= 3) {
          const Z = Math.round(_e * 0.666), X = _e - Z, B = Math.round(Se / 2);
          j = [
            { ...P[0], x: 0, y: 0, width: Z, height: Se, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Et[0], shadowEffect: "deep", borderRadius: 0 },
            { ...P[1], x: Z, y: 0, width: X, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Et[1], shadowEffect: "deep", borderRadius: 0 },
            { ...P[2], x: Z, y: B, width: X, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Et[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (P.length >= 3)
          if (_e / Se >= 2.5) {
            const X = Math.round(_e / 3);
            j = P.slice(0, 3).map((B, ue) => {
              const Ae = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 1.7777777777777777), { x: ge, y: je, width: xt, height: ft } = rr(ue * X, 0, X, Se, Ae);
              return {
                ...B,
                x: ge,
                y: je,
                width: xt,
                height: ft,
                sourceWidth: B.sourceWidth || 1920,
                sourceHeight: B.sourceHeight || 1080,
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
            const X = Math.round(_e / 2), B = Math.round(Se / 2);
            j = [
              { ...P[0], x: 0, y: 0, width: X, height: B, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Et[0], shadowEffect: "deep", borderRadius: 0 },
              { ...P[1], x: X, y: 0, width: X, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Et[1], shadowEffect: "deep", borderRadius: 0 },
              { ...P[2], x: Math.round(X / 2), y: B, width: X, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Et[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    j.length > 0 && (S(j), Be(0), x === "auto" || x === "auto-grid" ? Gt("auto-grid") : (Gt(x), zt.current = !0));
  }, [Zt, xe, S, _e, Se]), bt = u.useCallback(() => {
    const x = L.trim() || `Custom Layout ${Q.length + 1}`, P = [{
      id: `preset-${Date.now()}`,
      name: x,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(xe)),
      keyframes: JSON.parse(JSON.stringify(En))
    }, ...Q];
    qe(P), te(""), we(!1);
  }, [L, Q, xe, En]), ln = u.useCallback((x) => {
    !x || !x.placements || (S(x.placements), Be(0), Gt("custom"), zt.current = !0, Ve(!1));
  }, [S]), Vt = u.useCallback((x, j) => {
    j == null || j.stopPropagation();
    const P = Q.filter((Z) => Z.id !== x);
    qe(P);
  }, [Q]), gn = u.useCallback(() => {
    const x = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: _e,
      height: Se,
      aspectRatio: Kt,
      placements: xe,
      timeline: vn
    }, j = JSON.stringify(x, null, 2), P = new window.Blob([j], { type: "application/json" }), Z = window.URL.createObjectURL(P), X = document.createElement("a"), B = /* @__PURE__ */ new Date(), ue = (ge) => String(ge).padStart(2, "0"), Ae = `${B.getFullYear()}${ue(B.getMonth() + 1)}${ue(B.getDate())}_${ue(B.getHours())}${ue(B.getMinutes())}${ue(B.getSeconds())}`;
    X.href = Z, X.download = `canvas_layout_${Ae}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), window.URL.revokeObjectURL(Z);
  }, [xe, vn, _e, Se, Kt]), xs = u.useCallback((x) => {
    var Z;
    const j = (Z = x.target.files) == null ? void 0 : Z[0];
    if (!j) return;
    const P = new window.FileReader();
    P.onload = (X) => {
      var B, ue, Ae;
      try {
        const ge = JSON.parse(X.target.result);
        if (ge.width && ge.height) {
          const xt = is.find((ft) => ft.w === ge.width && ft.h === ge.height);
          xt && as(xt.id);
        } else if (ge.aspectRatio) {
          const xt = is.find((ft) => ft.id === ge.aspectRatio);
          xt && as(xt.id);
        }
        let je = null;
        Array.isArray(ge) ? je = ge : ge.placements && Array.isArray(ge.placements) ? je = ge.placements : (B = ge.layout) != null && B.placements && Array.isArray(ge.layout.placements) && (je = ge.layout.placements), je && je.length > 0 && (S(je), Be(0), Gt("custom"), zt.current = !0), ((Ae = (ue = ge.timeline) == null ? void 0 : ue.keyframes) == null ? void 0 : Ae.length) > 0 && (pn(ge.timeline), I && I(ge.timeline));
      } catch (ge) {
        console.error("Failed to parse imported canvas JSON:", ge), alert(`Canvas Import Error: ${ge.message}`);
      }
    }, P.readAsText(j), x.target.value = "";
  }, [S, I]), Cr = (x, j) => {
    if (x.button !== 0) return;
    x.stopPropagation(), x.preventDefault(), Be(j), zt.current = !0, Gt("custom");
    const P = Rl(), Z = rn.current || Lt.current;
    if (!Z) return;
    const X = Z.getBoundingClientRect(), B = xe[j];
    if (!B) return;
    gs.current = Zn("Move Feed"), _t.current = {
      mode: "drag",
      index: j,
      startX: x.clientX,
      startY: x.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      scaleX: _e / X.width,
      scaleY: Se / X.height,
      activeSnapZone: null
    }, nt(!0);
    const ue = (ge) => {
      if (!_t.current || _t.current.mode !== "drag") return;
      const je = _t.current, xt = rn.current || Lt.current;
      if (!xt) return;
      const ft = xt.getBoundingClientRect(), pt = (ge.clientX - je.startX) * je.scaleX, Ne = (ge.clientY - je.startY) * je.scaleY;
      let mt = Math.round(je.initialX + pt), Bt = Math.round(je.initialY + Ne);
      mt = en(mt, 0, _e - je.initialW), Bt = en(Bt, 0, Se - je.initialH);
      const kt = dt && !ge.altKey;
      let wt = null, Ln = null, qn = null;
      if (kt) {
        const Ht = ge.clientX - ft.left, $t = ge.clientY - ft.top, Ut = 32, Fe = Math.round(_e / 2), vt = Math.round(Se / 2);
        if (Ht <= Ut ? $t <= ft.height * 0.22 ? wt = { x: 0, y: 0, width: Fe, height: vt, label: "◰ Top-Left Quarter" } : $t >= ft.height * 0.78 ? wt = { x: 0, y: vt, width: Fe, height: vt, label: "◱ Bottom-Left Quarter" } : wt = { x: 0, y: 0, width: Fe, height: Se, label: "◧ Left Half (50%)" } : Ht >= ft.width - Ut ? $t <= ft.height * 0.22 ? wt = { x: Fe, y: 0, width: Fe, height: vt, label: "◲ Top-Right Quarter" } : $t >= ft.height * 0.78 ? wt = { x: Fe, y: vt, width: Fe, height: vt, label: "◳ Bottom-Right Quarter" } : wt = { x: Fe, y: 0, width: Fe, height: Se, label: "◨ Right Half (50%)" } : $t <= Ut && Ht >= ft.width * 0.25 && Ht <= ft.width * 0.75 && (wt = { x: 0, y: 0, width: _e, height: Se, label: "🗖 Full Canvas Maximize" }), !wt) {
          const Sr = xe.filter((ct, Mr) => Mr !== je.index), Js = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: _e, targetX: _e - je.initialW, guide: 100 },
            { snapTo: Fe, targetX: Fe - Math.round(je.initialW / 2), guide: 50 }
          ];
          Sr.forEach((ct) => {
            Js.push({ snapTo: ct.x, targetX: ct.x, guide: ct.x / _e * 100 }), Js.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width - je.initialW, guide: (ct.x + ct.width) / _e * 100 }), Js.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width, guide: (ct.x + ct.width) / _e * 100 }), Js.push({ snapTo: ct.x, targetX: ct.x - je.initialW, guide: ct.x / _e * 100 });
          });
          let Wu = 18;
          Js.forEach((ct) => {
            const Mr = Math.abs(mt - ct.targetX);
            Mr < Wu && (Wu = Mr, mt = ct.targetX, Ln = ct.guide);
          });
          const Ol = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Se, targetY: Se - je.initialH, guide: 100 },
            { snapTo: vt, targetY: vt - Math.round(je.initialH / 2), guide: 50 }
          ];
          Sr.forEach((ct) => {
            Ol.push({ snapTo: ct.y, targetY: ct.y, guide: ct.y / Se * 100 }), Ol.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height - je.initialH, guide: (ct.y + ct.height) / Se * 100 }), Ol.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height, guide: (ct.y + ct.height) / Se * 100 }), Ol.push({ snapTo: ct.y, targetY: ct.y - je.initialH, guide: ct.y / Se * 100 });
          });
          let zu = 18;
          Ol.forEach((ct) => {
            const Mr = Math.abs(Bt - ct.targetY);
            Mr < zu && (zu = Mr, Bt = ct.targetY, qn = ct.guide);
          });
        }
      }
      je.activeSnapZone = wt, je.latestX = mt, je.latestY = Bt, St(wt), Ue({ vertical: Ln, horizontal: qn }), pn((Ht) => {
        const $t = [...Ht.keyframes || []], Ut = P < $t.length ? P : mn;
        if (!$t[Ut]) return Ht;
        const Fe = [...$t[Ut].layout.placements || []];
        return Fe[je.index] ? (Fe[je.index] = { ...Fe[je.index], x: mt, y: Bt }, $t[Ut] = {
          ...$t[Ut],
          layout: { ...$t[Ut].layout, placements: Fe }
        }, { ...Ht, keyframes: $t }) : Ht;
      });
    }, Ae = () => {
      var ge;
      if (nt(!1), Ue({ vertical: null, horizontal: null }), (ge = _t.current) != null && ge.activeSnapZone) {
        const je = _t.current.activeSnapZone, xt = _t.current.index;
        pn((ft) => {
          const pt = [...ft.keyframes || []], Ne = P < pt.length ? P : mn;
          if (!pt[Ne]) return ft;
          const mt = [...pt[Ne].layout.placements || []];
          return mt[xt] ? (mt[xt] = {
            ...mt[xt],
            x: je.x,
            y: je.y,
            width: je.width,
            height: je.height
          }, pt[Ne] = {
            ...pt[Ne],
            layout: { ...pt[Ne].layout, placements: mt }
          }, { ...ft, keyframes: pt }) : ft;
        });
      }
      if (_t.current) {
        const je = _t.current, xt = je.initialX, ft = je.initialY, pt = je.activeSnapZone ? je.activeSnapZone.x : je.latestX ?? xt, Ne = je.activeSnapZone ? je.activeSnapZone.y : je.latestY ?? ft;
        pt !== xt || Ne !== ft ? ($l(), I && pn((mt) => (I(mt), mt))) : gs.current = null;
      }
      St(null), _t.current = null, window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", Ae);
    };
    window.addEventListener("mousemove", ue), window.addEventListener("mouseup", Ae);
  }, Yr = (x, j, P = "br") => {
    if (x.button !== 0) return;
    x.stopPropagation(), x.preventDefault(), Be(j), zt.current = !0, Gt("custom");
    const Z = Rl();
    if (!Lt.current) return;
    const X = Lt.current.getBoundingClientRect(), B = xe[j];
    if (!B) return;
    gs.current = Zn("Resize Feed");
    const ue = Zt.find((pt) => pt.stationId === B.stationId && pt.displayId === B.displayId), Ae = B.sourceWidth || (ue == null ? void 0 : ue.sourceWidth) || 1920, ge = B.sourceHeight || (ue == null ? void 0 : ue.sourceHeight) || 1080, je = B.nativeAspectRatio || B.aspectRatio || (ue == null ? void 0 : ue.nativeAspectRatio) || Ae / ge || B.width / B.height || 16 / 9;
    _t.current = {
      mode: "resize",
      corner: P,
      index: j,
      startX: x.clientX,
      startY: x.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      sourceWidth: Ae,
      sourceHeight: ge,
      nativeAspectRatio: je,
      scaleX: _e / X.width,
      scaleY: Se / X.height
    }, he(!0);
    const xt = (pt) => {
      if (!_t.current || _t.current.mode !== "resize") return;
      const Ne = _t.current, mt = (pt.clientX - Ne.startX) * Ne.scaleX, Bt = (pt.clientY - Ne.startY) * Ne.scaleY, kt = pt.ctrlKey || pt.shiftKey || pt.metaKey, wt = Ne.nativeAspectRatio > 0 ? Ne.nativeAspectRatio : Ne.initialW / Ne.initialH;
      let Ln = Ne.initialX, qn = Ne.initialY, Ht = Ne.initialW, $t = Ne.initialH;
      if (Ne.corner === "br") {
        const Ut = _e - Ne.initialX, Fe = Se - Ne.initialY;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(Ne.initialW + mt))), gt = Math.round(vt / wt);
          gt > Fe && (gt = Fe, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt;
        } else
          Ht = en(Math.round(Ne.initialW + mt), 160, Ut), $t = en(Math.round(Ne.initialH + Bt), 90, Fe);
      } else if (Ne.corner === "bl") {
        const Ut = Ne.initialX + Ne.initialW, Fe = Se - Ne.initialY;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(Ne.initialW - mt))), gt = Math.round(vt / wt);
          gt > Fe && (gt = Fe, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, Ln = Ne.initialX + Ne.initialW - Ht;
        } else
          Ht = en(Math.round(Ne.initialW - mt), 160, Ut), $t = en(Math.round(Ne.initialH + Bt), 90, Fe), Ln = Ne.initialX + Ne.initialW - Ht;
      } else if (Ne.corner === "tr") {
        const Ut = _e - Ne.initialX, Fe = Ne.initialY + Ne.initialH;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(Ne.initialW + mt))), gt = Math.round(vt / wt);
          gt > Fe && (gt = Fe, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, qn = Ne.initialY + Ne.initialH - $t;
        } else
          Ht = en(Math.round(Ne.initialW + mt), 160, Ut), $t = en(Math.round(Ne.initialH - Bt), 90, Fe), qn = Ne.initialY + Ne.initialH - $t;
      } else if (Ne.corner === "tl") {
        const Ut = Ne.initialX + Ne.initialW, Fe = Ne.initialY + Ne.initialH;
        if (kt) {
          let vt = Math.max(160, Math.min(Ut, Math.round(Ne.initialW - mt))), gt = Math.round(vt / wt);
          gt > Fe && (gt = Fe, vt = Math.round(gt * wt)), gt < 90 && (gt = 90, vt = Math.round(gt * wt)), Ht = vt, $t = gt, Ln = Ne.initialX + Ne.initialW - Ht, qn = Ne.initialY + Ne.initialH - $t;
        } else
          Ht = en(Math.round(Ne.initialW - mt), 160, Ut), $t = en(Math.round(Ne.initialH - Bt), 90, Fe), Ln = Ne.initialX + Ne.initialW - Ht, qn = Ne.initialY + Ne.initialH - $t;
      }
      pn((Ut) => {
        const Fe = [...Ut.keyframes || []], vt = Z < Fe.length ? Z : mn;
        if (!Fe[vt]) return Ut;
        const gt = [...Fe[vt].layout.placements || []];
        return gt[Ne.index] ? (gt[Ne.index] = {
          ...gt[Ne.index],
          x: Ln,
          y: qn,
          width: Ht,
          height: $t,
          sourceWidth: Ne.sourceWidth,
          sourceHeight: Ne.sourceHeight,
          nativeAspectRatio: Ne.nativeAspectRatio,
          aspectRatio: Ne.nativeAspectRatio
        }, Fe[vt] = {
          ...Fe[vt],
          layout: { ...Fe[vt].layout, placements: gt }
        }, { ...Ut, keyframes: Fe }) : Ut;
      });
    }, ft = () => {
      if (_t.current) {
        const pt = _t.current, Ne = pt.latestW ?? pt.initialW, mt = pt.latestH ?? pt.initialH;
        Ne !== pt.initialW || mt !== pt.initialH ? ($l(), I && pn((Bt) => (I(Bt), Bt))) : gs.current = null;
      }
      he(!1), _t.current = null, window.removeEventListener("mousemove", xt), window.removeEventListener("mouseup", ft);
    };
    window.addEventListener("mousemove", xt), window.addEventListener("mouseup", ft);
  }, Ll = u.useCallback((x) => {
    const j = xe[x];
    if (!j) return;
    const P = Zt.find((Ae) => Ae.stationId === j.stationId && Ae.displayId === j.displayId), Z = j.nativeAspectRatio || j.aspectRatio || (P == null ? void 0 : P.nativeAspectRatio) || (j.sourceWidth && j.sourceHeight ? j.sourceWidth / j.sourceHeight : 16 / 9);
    let X = j.width, B = Math.round(X / Z);
    j.y + B > Se && (B = Se - j.y, X = Math.round(B * Z)), j.x + X > _e && (X = _e - j.x, B = Math.round(X / Z));
    const ue = xe.map((Ae, ge) => ge === x ? {
      ...Ae,
      width: Math.max(160, X),
      height: Math.max(90, B),
      sourceWidth: j.sourceWidth || (P == null ? void 0 : P.sourceWidth) || 1920,
      sourceHeight: j.sourceHeight || (P == null ? void 0 : P.sourceHeight) || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z
    } : Ae);
    S(ue, "Snap Native Aspect");
  }, [xe, Zt, S]), ii = u.useCallback(() => {
    if (At.current.length === 0) return;
    const x = Zn("Redo State");
    $n.current.push(x), $n.current.length > 50 && $n.current.shift();
    const j = At.current.pop();
    j && (pn(j.timeline), I && I(j.timeline), j.aspectId && j.aspectId !== Kt && as(j.aspectId), j.presetId && Gt(j.presetId), j.selectedFeedIndex !== void 0 && Be(j.selectedFeedIndex), zt.current = !0, Ss((P) => P + 1), Ft(`Undo: ${j.label || "Previous State"}`, "undo", "↺"));
  }, [Zn, I, Kt, Ft]), ci = u.useCallback(() => {
    if ($n.current.length === 0) return;
    const x = Zn("Undo State");
    At.current.push(x), At.current.length > 50 && At.current.shift();
    const j = $n.current.pop();
    j && (pn(j.timeline), I && I(j.timeline), j.aspectId && j.aspectId !== Kt && as(j.aspectId), j.presetId && Gt(j.presetId), j.selectedFeedIndex !== void 0 && Be(j.selectedFeedIndex), zt.current = !0, Ss((P) => P + 1), Ft(`Redo: ${j.label || "Restored State"}`, "info", "↻"));
  }, [Zn, I, Kt, Ft]), _u = u.useCallback(() => {
    const j = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(xe)),
      keyframes: JSON.parse(JSON.stringify(En)),
      aspectId: Kt,
      width: _e,
      height: Se
    }, ...Q.filter((P) => P.id !== "preset-quicksave")];
    qe(j);
    try {
      Ap({
        canvasLayoutTimeline: vn,
        selectedAspectId: Kt,
        selectedPresetId: dn,
        isFullWidth: Wn
      });
    } catch (P) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", P);
    }
    Ft(`State Saved (${_e}×${Se} • ${xe.length} Feeds)`, "success", "💾");
  }, [xe, En, Kt, _e, Se, Q, qe, vn, dn, Wn, Ft]);
  u.useEffect(() => {
    const x = () => ii(), j = () => ci(), P = () => _u();
    return window.addEventListener("itb:studio-undo", x), window.addEventListener("itb:studio-redo", j), window.addEventListener("itb:studio-save-now", P), () => {
      window.removeEventListener("itb:studio-undo", x), window.removeEventListener("itb:studio-redo", j), window.removeEventListener("itb:studio-save-now", P);
    };
  }, [ii, ci, _u]);
  const Vp = u.useCallback(() => {
    if (re) {
      re();
      return;
    }
    Xe((x) => {
      const j = !x;
      if (j) {
        r && r(null);
        const P = Rt.current;
        P && P.requestFullscreen && P.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return j;
    });
  }, [re, r]), Yp = u.useCallback(() => {
    const x = f > 0 ? f : d + v, { nextTimeline: j, newIndex: P, isNew: Z } = sh(
      vn,
      x,
      (zn == null ? void 0 : zn.layout) || {
        width: _e,
        height: Se,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(xe))
      }
    );
    Z ? (Rn("Add Keyframe"), pn(j), I && I(j), O && O(P), Ft(`Keyframe #${P + 1} created at ${jt(x, p, { includeSeconds: !0 })}`, "success", "💎")) : (O && O(P), Ft(`Jumped to existing Keyframe #${P + 1}`, "info", "💎"));
  }, [f, d, v, zn, xe, _e, Se, vn, I, O, p, Ft, Rn]);
  u.useCallback(() => {
    if (En.length <= 1 || mn === 0) {
      Ft("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Rn("Delete Keyframe");
    const { nextTimeline: x, success: j, newIndex: P } = Yg(vn, mn);
    j && (pn(x), I && I(x), O && O(P), Ft("Keyframe deleted", "info", "🗑️"));
  }, [En, mn, vn, I, O, Ft, Rn]), u.useCallback((x) => {
    mn !== 0 && (Rn("Update Transition Type"), pn((j) => {
      const P = _c(j, mn, { transitionType: x });
      return I && I(P), P;
    }));
  }, [mn, I, Rn]), u.useCallback((x) => {
    mn !== 0 && (Rn("Update Transition Duration"), pn((j) => {
      const P = _c(j, mn, { transitionDurationSec: x });
      return I && I(P), P;
    }));
  }, [mn, I, Rn]), u.useEffect(() => {
    const x = (j) => {
      if (!(j.target.tagName === "INPUT" || j.target.tagName === "TEXTAREA" || j.target.isContentEditable)) {
        if (j.key === "Delete" || j.key === "Backspace") {
          Je >= 0 && xe[Je] && (j.preventDefault(), Me(Je));
          return;
        }
        if ((j.code === "Space" || j.key === " ") && M) {
          j.preventDefault(), M((P) => !P);
          return;
        }
        if ((j.key === "k" || j.key === "K") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), Yp();
          return;
        }
        if (j.key === "Escape") {
          ze(!1), Ve(!1), Pe(!1), cn(!1), st(!1), we(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(j.key)) {
          if (Je >= 0 && xe[Je]) {
            j.preventDefault(), zt.current = !0, Gt("custom");
            const P = j.shiftKey ? 1 : 10;
            let Z = 0, X = 0;
            j.key === "ArrowLeft" && (Z = -P), j.key === "ArrowRight" && (Z = P), j.key === "ArrowUp" && (X = -P), j.key === "ArrowDown" && (X = P);
            const B = xe[Je], ue = en(B.x + Z, 0, _e - B.width), Ae = en(B.y + X, 0, Se - B.height), ge = xe.map((je, xt) => xt === Je ? { ...je, x: ue, y: Ae } : je);
            S(ge);
          }
          return;
        }
        if ((j.key === "r" || j.key === "R") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), ut((P) => !P);
          return;
        }
        if ((j.key === "s" || j.key === "S") && !j.ctrlKey && !j.metaKey && !j.altKey) {
          j.preventDefault(), et((P) => !P);
          return;
        }
      }
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [Je, xe, Me, S, ut, et]);
  const Fu = u.useMemo(() => Kg({
    keyframes: En,
    currentEpochMs: ee,
    currentPlacements: xe,
    isEditing: ae || H
  }), [ae, H, En, ee, xe]), Xp = u.useMemo(() => Fu.map((x, j) => ({ ...x, originalIndex: j })).sort((x, j) => (x.zIndex ?? x.originalIndex) - (j.zIndex ?? j.originalIndex)), [Fu]), Gs = xe[Je] || null, { filteredPlaced: Qs, filteredUnplaced: Do } = u.useMemo(() => {
    const x = (Y || "").toLowerCase(), j = xe.map((B, ue) => {
      const Ae = B.zIndex ?? ue + 1, ge = Zt.find((je) => je.stationId === B.stationId && je.displayId === B.displayId);
      return {
        type: "placed",
        origIdx: ue,
        placement: B,
        feed: ge,
        stationId: B.stationId,
        displayId: B.displayId,
        label: B.label || (ge == null ? void 0 : ge.label) || `${B.stationId} (${B.displayId})`,
        layerRank: Ae,
        isSelected: ue === Je,
        sourceWidth: B.sourceWidth || (ge == null ? void 0 : ge.sourceWidth) || 1920,
        sourceHeight: B.sourceHeight || (ge == null ? void 0 : ge.sourceHeight) || 1080
      };
    });
    j.sort((B, ue) => ue.layerRank - B.layerRank);
    const P = Zt.filter((B) => !xe.some((ue) => ue.stationId === B.stationId && ue.displayId === B.displayId)).map((B) => ({
      type: "unplaced",
      feed: B,
      stationId: B.stationId,
      displayId: B.displayId,
      label: B.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: B.sourceWidth || 1920,
      sourceHeight: B.sourceHeight || 1080
    })), Z = x ? j.filter((B) => B.label.toLowerCase().includes(x)) : j, X = x ? P.filter((B) => B.label.toLowerCase().includes(x)) : P;
    return { filteredPlaced: Z, filteredUnplaced: X };
  }, [xe, Zt, Je, Y]), Bu = u.useCallback((x, j) => {
    x.stopPropagation(), Ie(j), x.dataTransfer.effectAllowed = "copyMove", x.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: j.origIdx,
      type: j.type,
      stationId: j.stationId,
      displayId: j.displayId
    }));
  }, []), Gp = u.useCallback((x, j) => {
    x.preventDefault(), x.stopPropagation(), x.dataTransfer.dropEffect = "move";
    const P = x.currentTarget.getBoundingClientRect(), Z = P.top + P.height / 2, X = x.clientY < Z ? "above" : "below";
    it((B) => B.index === j && B.position === X ? B : { index: j, position: X });
  }, []), Qp = u.useCallback((x, j) => {
    x.stopPropagation(), it((P) => P.index === j ? { index: null, position: null } : P);
  }, []), Uu = u.useCallback(() => {
    Ie(null), it({ index: null, position: null });
  }, []), Jp = u.useCallback((x, j) => {
    x.preventDefault(), x.stopPropagation();
    const P = tt;
    it({ index: null, position: null }), Ie(null);
    const Z = x.dataTransfer.getData("text/plain");
    if (Z)
      try {
        const X = JSON.parse(Z);
        if (X.type === "placed") {
          const B = X.origIdx, ue = Qs.findIndex((pt) => pt.origIdx === B);
          if (ue === -1) return;
          let Ae = j;
          if (P.position === "below" && (Ae += 1), ue < Ae && (Ae -= 1), ue === Ae) return;
          const ge = [...Qs], [je] = ge.splice(ue, 1);
          ge.splice(Ae, 0, je);
          const xt = ge.length, ft = xe.map((pt, Ne) => {
            const mt = ge.findIndex((Bt) => Bt.origIdx === Ne);
            return mt !== -1 ? {
              ...pt,
              zIndex: xt - mt
            } : pt;
          });
          S(ft), Be(je.origIdx);
        } else if (X.type === "unplaced") {
          const B = Zt.find((wt) => wt.stationId === X.stationId && wt.displayId === X.displayId);
          if (!B) return;
          const ue = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 16 / 9), Ae = ue >= 1 ? 640 : Math.round(360 * ue), ge = ue >= 1 ? Math.round(640 / ue) : 360, je = Et[xe.length % Et.length];
          let xt = j;
          P.position === "below" && (xt += 1);
          const ft = {
            stationId: B.stationId,
            displayId: B.displayId,
            label: B.label,
            x: 100 + xe.length * 40 % 800,
            y: 80 + xe.length * 40 % 500,
            width: Ae,
            height: ge,
            sourceWidth: B.sourceWidth || 1920,
            sourceHeight: B.sourceHeight || 1080,
            nativeAspectRatio: ue,
            aspectRatio: ue,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: je,
            shadowEffect: "deep",
            borderRadius: 0
          }, pt = [...xe, ft], Ne = pt.length - 1, mt = [...Qs];
          mt.splice(xt, 0, { origIdx: Ne });
          const Bt = mt.length, kt = pt.map((wt, Ln) => {
            const qn = mt.findIndex((Ht) => Ht.origIdx === Ln);
            return {
              ...wt,
              zIndex: qn !== -1 ? Bt - qn : 1
            };
          });
          S(kt), Be(Ne);
        }
      } catch (X) {
        console.warn("Failed to handle layer drag drop:", X);
      }
  }, [tt, Qs, xe, Zt, S]), Zp = u.useCallback((x) => {
    x.preventDefault();
    const j = x.dataTransfer.getData("text/plain");
    if (!(!j || !Lt.current))
      try {
        const P = JSON.parse(j), Z = Lt.current.getBoundingClientRect(), X = x.clientX - Z.left, B = x.clientY - Z.top, ue = en(Math.round(X / Z.width * _e), 0, _e - 320), Ae = en(Math.round(B / Z.height * Se), 0, Se - 180);
        if (P.type === "unplaced") {
          const ge = Zt.find((je) => je.stationId === P.stationId && je.displayId === P.displayId);
          if (ge) {
            const je = ge.nativeAspectRatio || (ge.sourceWidth && ge.sourceHeight ? ge.sourceWidth / ge.sourceHeight : 1.7777777777777777), xt = je >= 1 ? 640 : Math.round(360 * je), ft = je >= 1 ? Math.round(640 / je) : 360, pt = xe.length > 0 ? Math.max(...xe.map((kt) => kt.zIndex || 0)) + 1 : 1, Ne = Et[xe.length % Et.length], mt = {
              stationId: ge.stationId,
              displayId: ge.displayId,
              label: ge.label,
              x: en(ue, 0, _e - xt),
              y: en(Ae, 0, Se - ft),
              width: xt,
              height: ft,
              sourceWidth: ge.sourceWidth || 1920,
              sourceHeight: ge.sourceHeight || 1080,
              nativeAspectRatio: je,
              aspectRatio: je,
              zIndex: pt,
              rotation: 0,
              borderWidth: 2,
              borderColor: Ne,
              shadowEffect: "deep",
              borderRadius: 0
            }, Bt = [...xe, mt];
            S(Bt), Be(Bt.length - 1);
          }
        } else if (P.type === "placed" && P.origIdx !== void 0) {
          const ge = xe.map((je, xt) => xt === P.origIdx ? {
            ...je,
            x: en(ue, 0, _e - je.width),
            y: en(Ae, 0, Se - je.height)
          } : je);
          S(ge), Be(P.origIdx);
        }
      } catch (P) {
        console.warn("Canvas drop failed:", P);
      }
  }, [Zt, xe, S, _e, Se]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Rt,
      className: `multicam-viewport-root canvas-grid ${at ? "fullscreen-grid-active" : ""}`,
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
        Un && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Un.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Un.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Un.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Ot, className: `canvas-stage-wrapper ${Wn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          ye && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  xe.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => ze(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: Y,
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
                  const P = be && be.type === "placed" && be.origIdx === x.origIdx, X = tt.index === j ? tt.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${x.isSelected ? "is-selected" : ""} ${P ? "is-dragging-row" : ""} ${X}`,
                      draggable: !0,
                      onDragStart: (B) => Bu(B, x),
                      onDragOver: (B) => Gp(B, j),
                      onDragLeave: (B) => Qp(B, j),
                      onDrop: (B) => Jp(B, j),
                      onDragEnd: Uu,
                      onClick: () => Be(x.origIdx),
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
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (B) => B.stopPropagation(), children: [
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Re(x.origIdx),
                              title: "Bring Forward (Layer +1)",
                              children: "⬆️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => Qe(x.origIdx),
                              title: "Send Backward (Layer -1)",
                              children: "⬇️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-remove-row",
                              onClick: () => Me(x.origIdx),
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
              Do.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Do.length })
                ] }),
                Do.map((x) => {
                  const j = be && be.type === "unplaced" && be.stationId === x.stationId && be.displayId === x.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${j ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (P) => Bu(P, x),
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
                        /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (P) => P.stopPropagation(), children: /* @__PURE__ */ s.jsx(
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
              Qs.length === 0 && Do.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => lt("auto"), children: "⊞ ADD ALL FEEDS" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: Ee, children: "🗑️ CLEAR CANVAS" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `btn-wing-tool ${ye ? "active" : ""}`,
                  onClick: () => ze((x) => !x),
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
                      fe((x) => !x), Ce(!1);
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
                        Gt("auto-grid"), lt("auto-grid"), fe(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const x = new Set((t && t.length > 0 ? t : n).map((Z) => Z.id)), j = (xe || []).filter((Z) => x.has(Z.stationId)), P = (t && t.length > 0 ? t : n).filter((Z) => !j.some((X) => X.stationId === Z.id));
                          return j.length > 0 ? j.length + P.length : hn.length;
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
                        Gt("1x1"), lt("1x1"), fe(!1);
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
                        Gt("1x2"), lt("1x2"), fe(!1);
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
                        Gt("2x2"), lt("2x2"), fe(!1);
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
                        Gt("1+3-pip"), lt("1+3-pip"), fe(!1);
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
                        Gt("hero-stacked"), lt("hero-stacked"), fe(!1);
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
                    className: `btn-wing-tool ${oe ? "active" : ""}`,
                    onClick: () => {
                      Ce((x) => !x), fe(!1);
                    },
                    title: `Aspect Ratio: ${Kt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Kt })
                    ]
                  }
                ),
                oe && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  is.map((x) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${Kt === x.id ? "active" : ""}`,
                      onClick: () => {
                        de(x.id), Ce(!1);
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
                  onClick: () => et((x) => !x),
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
                  className: `btn-wing-tool ${Ze ? "active" : ""}`,
                  onClick: () => ut((x) => !x),
                  title: Ze ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  onClick: ii,
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
                  onClick: ci,
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
                  width: ot.width > 180 ? `${ot.width}px` : "100%",
                  height: ot.height > 100 ? `${ot.height}px` : "auto",
                  aspectRatio: `${_e} / ${Se}`
                },
                onMouseMove: Ro,
                onMouseLeave: Lo,
                onDragOver: (x) => {
                  x.preventDefault(), x.dataTransfer.dropEffect = "copy";
                },
                onDrop: Zp,
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
                        left: `${ht.x / _e * 100}%`,
                        top: `${ht.y / Se * 100}%`,
                        width: `${ht.width / _e * 100}%`,
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
                  Ze && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${_e}×${Se}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Mt.isInside ? `${Mt.x},${Mt.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${_e} 20`,
                        preserveAspectRatio: "none",
                        children: [
                          Gs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: Gs.x,
                              y: "0",
                              width: Gs.width,
                              height: "20",
                              fill: "rgba(6, 182, 212, 0.25)",
                              stroke: "#06B6D4",
                              strokeWidth: "1"
                            }
                          ),
                          $o.map((x) => x.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
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
                        viewBox: `0 0 20 ${Se}`,
                        preserveAspectRatio: "none",
                        children: [
                          Gs && /* @__PURE__ */ s.jsx(
                            "rect",
                            {
                              x: "0",
                              y: Gs.y,
                              width: "20",
                              height: Gs.height,
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
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => ze(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => lt("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  Xp.map((x) => {
                    var Ut;
                    const j = x.originalIndex, P = Je === j, Z = ae && Je === j, X = H && Je === j, B = (n.length > 0 ? n : t).find(
                      (Fe) => {
                        var vt, gt, Sr, Js;
                        return Fe.id === x.stationId || ((vt = Fe.hostname) == null ? void 0 : vt.toLowerCase()) === ((gt = x.stationId) == null ? void 0 : gt.toLowerCase()) || ((Sr = Fe.id) == null ? void 0 : Sr.toLowerCase()) === ((Js = x.stationId) == null ? void 0 : Js.toLowerCase());
                      }
                    ), ue = Zt.find((Fe) => Fe.stationId === x.stationId && Fe.displayId === x.displayId), Ae = B || {
                      id: x.stationId,
                      hostname: (ue == null ? void 0 : ue.stationHostname) || x.stationHostname || x.stationId,
                      displayName: (ue == null ? void 0 : ue.stationName) || x.label || x.stationId,
                      displays: ue ? [{ displayId: ue.displayId, width: ue.sourceWidth, height: ue.sourceHeight }] : []
                    }, ge = (Ae == null ? void 0 : Ae.displays) || ((Ut = Ae == null ? void 0 : Ae.topology) == null ? void 0 : Ut.displays) || [], je = xe.filter(
                      (Fe) => Fe.stationId === x.stationId || Ae && (Fe.stationId === Ae.id || Fe.stationId === Ae.hostname)
                    ), xt = ge.length > 1 && je.length >= ge.length, ft = x.borderColor || Et[j % Et.length], pt = x.borderWidth !== void 0 ? x.borderWidth : 2, Ne = x.rotation || 0, mt = x.shadowEffect || "deep", Bt = x.borderRadius || 0, kt = x.x / _e * 100, wt = x.y / Se * 100, Ln = x.width / _e * 100, qn = x.height / Se * 100, Ht = Qg(mt, P, ft);
                    x.y < 50, x.x < 100, x.x + x.width > _e - 100;
                    const $t = x.zIndex !== void 0 ? x.zIndex : j + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${P ? "is-selected" : ""} ${Z ? "is-dragging" : ""} ${X ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${kt}%`,
                          top: `${wt}%`,
                          width: `${Ln}%`,
                          height: `${qn}%`,
                          zIndex: $t * 10 + (Z ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${pt}px solid ${ft}`,
                          borderRadius: `${Bt}px`,
                          boxShadow: Ht,
                          opacity: x.opacity !== void 0 ? x.opacity : 1,
                          pointerEvents: x.opacity !== void 0 && x.opacity < 0.1 ? "none" : "auto",
                          cursor: Z ? "grabbing" : "grab",
                          transition: Z || X ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Fe) => Cr(Fe, j),
                        onContextMenu: (Fe) => {
                          Fe.preventDefault(), Fe.stopPropagation(), Be(j), Dt(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Fe) => Cr(Fe, j),
                              onDoubleClick: () => rt(j),
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
                                  Ne !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    Ne,
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
                                    className: `btn-badge-action-inspector ${P && Nt ? "active" : ""}`,
                                    onClick: (Fe) => {
                                      Fe.stopPropagation(), Be(j), Dt((vt) => !vt || Je !== j);
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
                                  transform: Ne ? `rotate(${Ne}deg)` : void 0,
                                  transformOrigin: "center center",
                                  transition: Z ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Fg,
                                  {
                                    station: Ae,
                                    isSolo: !1,
                                    currentEpochMs: ee,
                                    timeMode: p,
                                    isPlaying: y,
                                    setIsPlaying: M,
                                    baseEpochMs: d,
                                    totalDurationMs: C,
                                    outPointMs: w,
                                    setPlayheadMs: m,
                                    globalGaps: g,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: T,
                                    playbackSpeed: E,
                                    activeAudioStationId: $e,
                                    onSoloAudio: Le,
                                    directorPlan: k || (Ae == null ? void 0 : Ae.directorPlan),
                                    isAutoDirectorEnabled: i ? i[Ae.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: x.displayId,
                                    onSelectDisplayId: (Fe) => {
                                      const vt = xe.map((gt, Sr) => Sr === j ? { ...gt, displayId: Fe } : gt);
                                      S(vt);
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
                                onMouseDown: (Fe) => Cr(Fe, j),
                                onDoubleClick: () => rt(j),
                                title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                              }
                            )
                          ] }),
                          P && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tl",
                                onMouseDown: (Fe) => Yr(Fe, j, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Fe) => Yr(Fe, j, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Fe) => Yr(Fe, j, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Jr(x.sourceWidth, x.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Fe) => Yr(Fe, j, "br"),
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
                  !z && Nt && Je !== null && Gs && (() => {
                    const x = Gs, j = Je, P = x.borderColor || Et[j % Et.length], Z = x.borderWidth !== void 0 ? x.borderWidth : 2, X = x.rotation || 0, B = x.shadowEffect || "deep", ue = x.zIndex !== void 0 ? x.zIndex : j + 1, Ae = x.x / _e * 100, ge = x.width / _e * 100, je = Ae + ge / 2;
                    let xt = `${je}%`, ft = "translateX(-50%)";
                    je < 28 ? (xt = `${Math.max(1, Ae)}%`, ft = "none") : je > 72 && (xt = `${Math.min(99, Ae + ge)}%`, ft = "translateX(-100%)");
                    const pt = x.y + x.height + 8;
                    let Ne;
                    pt + 45 > Se ? Ne = `${Math.max(20, (x.y + x.height - 44) / Se * 100)}%` : Ne = `${pt / Se * 100}%`;
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
                          top: Ne,
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
                                    style: { backgroundColor: P === "transparent" ? "#1E293B" : P }
                                  }
                                )
                              }
                            ),
                            Oe && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: Gg.map((kt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${P === kt ? "is-active" : ""}`,
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
                                const kt = [0, 2, 4, 8], wt = kt[(kt.indexOf(Z) + 1) % kt.length];
                                We({ borderWidth: wt });
                              },
                              title: `Border Width: ${Z}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                Z,
                                "px"
                              ]
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: `btn-mini-tool ${B !== "none" ? "highlight-glow" : ""}`,
                              onClick: () => {
                                const kt = ["none", "deep", "glow-cyan", "glow-emerald"], wt = kt[(kt.indexOf(B) + 1) % kt.length];
                                We({ shadowEffect: wt });
                              },
                              title: `Shadow Effect: ${B} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                              children: "🌑"
                            }
                          ),
                          /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Re(j),
                                title: "Step Layer Up (+1)",
                                children: "▲"
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-mini-tool",
                                onClick: () => Qe(j),
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
                              onClick: () => Ye(90),
                              title: `Rotate: Step 90° clockwise (Current: ${X}°)`,
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
                              onClick: () => rt(j),
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
                              onClick: () => Me(j),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Be(null),
                              title: "Close Menu (Esc)",
                              children: "✕"
                            }
                          )
                        ]
                      }
                    );
                  })(),
                  /* @__PURE__ */ s.jsx(
                    Ug,
                    {
                      currentEpochMs: ee,
                      position: J,
                      onPositionChange: (x) => {
                        V(x);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", x);
                        } catch {
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(Wg, {})
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => we(!0),
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
                          onClick: (P) => Vt(x.id, P),
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
                    return (x = G.current) == null ? void 0 : x.click();
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
                  ref: G,
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
                    zt.current = !1, Gt("auto-grid");
                    const x = hn.length > 0 ? hn : Zt, j = qs(x, _e, Se), P = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: _e,
                            height: Se,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: j
                          }
                        }
                      ]
                    };
                    pn(P), I && I(P), Be(0);
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
                  onClick: Ee,
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
                  className: `btn-wing-tool ${at ? "active" : ""}`,
                  onClick: Vp,
                  title: "Fullscreen Canvas Grid (F)",
                  children: [
                    /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: at ? "⤓" : "⛶" }),
                    /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: at ? "EXIT" : "FULL" })
                  ]
                }
              )
            ] })
          ] }),
          " "
        ] }) }),
        " ",
        ie && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => we(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (x) => x.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => we(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: L,
                onChange: (x) => te(x.target.value),
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => we(!1), children: "Cancel" }),
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
  onChangeSpeed: M,
  onSetInPoint: C,
  onSetOutPoint: _
}) {
  const [w, m] = u.useState(() => Nl()), { volume: g, isMuted: T } = w, E = !!(v && d > 0);
  u.useEffect(() => {
    const K = (I) => {
      I.detail && m(I.detail);
    };
    return window.addEventListener("itb-audio-state-changed", K), () => window.removeEventListener("itb-audio-state-changed", K);
  }, []);
  const b = u.useCallback((K, I, U) => {
    const O = {
      volume: typeof K == "number" ? K : g,
      isMuted: typeof I == "boolean" ? I : T,
      channelMode: U || w.channelMode || "both"
    };
    m(O), Lg(O);
  }, [g, T, w.channelMode]), h = (K) => {
    K == null || K.stopPropagation(), E && n(!t);
  }, A = (K) => {
    if (K == null || K.stopPropagation(), !E || !M) return;
    const I = Fi.indexOf(y), U = I === -1 ? 1 : (I + 1) % Fi.length;
    M(Fi[U]);
  }, k = (K) => {
    K == null || K.stopPropagation(), T ? b(g === 0 ? 0.5 : g, !1) : b(g, !0);
  }, N = (K) => {
    K.stopPropagation();
    const I = parseFloat(K.target.value);
    I === 0 ? b(0, !0) : b(I, !1);
  }, D = (K) => {
    const I = u.useRef(null), U = u.useRef(null), O = u.useRef(0), z = u.useCallback(() => {
      I.current && clearTimeout(I.current), U.current && clearInterval(U.current), I.current = null, U.current = null;
    }, []), R = u.useCallback((ee = 1) => {
      if (n && n(!1), a) {
        const J = 33 * ee;
        a((V) => {
          const $e = K === "forward" ? V + J : V - J;
          return Math.max(0, Math.min(d, $e));
        });
      } else K === "forward" && f ? f() : K === "backward" && p && p();
    }, [K]), re = u.useCallback((ee) => {
      ee.preventDefault(), ee.stopPropagation(), E && (z(), R(1), O.current = performance.now(), I.current = setTimeout(() => {
        U.current = setInterval(() => {
          const J = performance.now() - O.current, V = J > 2500 ? 4 : J > 1e3 ? 2 : 1;
          R(V);
        }, 50);
      }, 280));
    }, [R, z]);
    return u.useEffect(() => z, [z]), {
      onMouseDown: re,
      onMouseUp: z,
      onMouseLeave: z,
      onTouchStart: re,
      onTouchEnd: z
    };
  }, W = D("backward"), $ = D("forward"), F = (K) => {
    K.stopPropagation(), E && (n && n(!1), a && a(i));
  }, se = (K) => {
    K.stopPropagation(), E && (n && n(!1), a && a(c));
  }, ne = () => T || g === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${E ? "is-expanded" : "is-compact-disabled"}`,
      title: E ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !E,
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
            disabled: !C,
            onClick: (K) => {
              K.stopPropagation(), C == null || C();
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
              disabled: !E,
              onClick: (K) => {
                K.stopPropagation(), l && l(!r);
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
              disabled: !E,
              onClick: F,
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
              disabled: !E,
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
              disabled: !E,
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
              disabled: !E,
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
              disabled: !E,
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
            disabled: !_,
            onClick: (K) => {
              K.stopPropagation(), _ == null || _();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        E && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${T || g === 0 ? "is-muted" : ""}`,
              onClick: k,
              title: T ? "Unmute" : `Mute (${Math.round(g * 100)}%)`,
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
              value: T ? 0 : g,
              onChange: N,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const xa = 2500, Zg = {
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
function qg(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Zg[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function Op(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(qg), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Dp(e, t = " + ") {
  return Op(e).join(t);
}
function Hl(e) {
  return Dp(e, "+");
}
const ex = 8;
function tx({
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
  const [v, f] = u.useState([]), [, p] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((g) => ({
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
    if (!y.length || !l || i <= 0) {
      f([]);
      return;
    }
    const g = new AbortController(), T = Math.max(0, l + a - xa), E = l + a + i + xa;
    p(!0);
    const b = y.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${T}&endEpoch=${E}`;
      return fetch(A, { signal: g.signal }).then((k) => k.ok ? k.json() : []).then((k) => (Array.isArray(k) ? k : []).map((N) => ({
        ...N,
        stationId: h.id,
        stationName: h.name
      }))).catch((k) => {
        if (k.name !== "AbortError") return [];
        throw k;
      });
    });
    return Promise.all(b).then((h) => {
      const A = h.flat();
      f(A), p(!1);
    }).catch((h) => {
      h.name !== "AbortError" && (f([]), p(!1));
    }), () => g.abort();
  }, [y, l, a, i, r]);
  const M = r && Array.isArray(r) && r.length > 0 ? r : v, C = u.useMemo(() => {
    if (!M.length || i <= 0 || c <= 0)
      return [];
    const g = l + a, T = g + i, E = [...M].sort((k, N) => k.epochMs - N.epochMs), b = [];
    let h = null, A = -999;
    for (const k of E) {
      const N = k.epochMs + xa;
      if (N < g || N > T)
        continue;
      const D = N - l, W = (D - a) / i * c;
      if (h && W - A < ex) {
        h.events.push(k), h.endOffsetMs = D, h.endEpochMs = N;
        const $ = new Set(h.events.map((F) => F.stationName || "Workstation"));
        h.isMultiStation = $.size > 1, h.stationCount = $.size, A = W;
      } else {
        const $ = (D - a) / i * 100;
        h = {
          id: `kc_${k.epochMs}_${b.length}`,
          startOffsetMs: D,
          endOffsetMs: D,
          startEpochMs: N,
          endEpochMs: N,
          pct: $,
          events: [k],
          isMultiStation: !1,
          stationCount: 1
        }, b.push(h), A = W;
      }
    }
    return b;
  }, [M, l, a, i, c]);
  function _(g) {
    if (!g.events.length) return "";
    if (g.events.length === 1)
      return Hl(g.events[0].keyCombination);
    const T = g.events.find((h) => h.keyCombination.includes("+"));
    if (T) {
      const h = Hl(T.keyCombination);
      return g.events.length > 1 ? `${h} (+${g.events.length - 1})` : h;
    }
    const E = Hl(g.events[0].keyCombination);
    return g.events.every((h) => Hl(h.keyCombination) === E) ? `${E} ×${g.events.length}` : `${E} (+${g.events.length - 1})`;
  }
  function w(g, T = "LOCAL") {
    return jt(g, T);
  }
  function m(g) {
    const T = [];
    for (const E of g) {
      const b = Hl(E.keyCombination);
      T.length && T[T.length - 1].key === b ? T[T.length - 1].count++ : T.push({ key: b, count: 1 });
    }
    return T;
  }
  return C.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: C.map((g) => {
    const T = g.events.length, E = T > 1, b = g.isMultiStation, h = _(g), A = w(g.startEpochMs, o), k = g.pct < 10 ? "edge-left" : g.pct > 90 ? "edge-right" : "", N = {};
    return g.events.forEach((D) => {
      const W = D.stationName || e || "Workstation";
      N[W] || (N[W] = []), N[W].push(D);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${E ? "is-cluster" : "is-single"} ${b ? "is-multi-station" : ""}`,
        style: { left: `${g.pct}%` },
        onClick: (D) => {
          D.stopPropagation(), d && d(g.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${A}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            E && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: b ? `${g.stationCount}S` : T > 9 ? "9+" : T })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${k}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: b ? `MULTICAM KEYSTROKES (${g.stationCount} WORKSTATIONS • ${T} EVT)` : E ? `KEYSTROKE BURST (${T})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([D, W]) => {
              const $ = m(W);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: D }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    W.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  $.slice(0, 6).map((F, se) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    F.key,
                    F.count > 1 ? ` ×${F.count}` : ""
                  ] }, se)),
                  $.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    $.length - 6,
                    " more"
                  ] })
                ] })
              ] }, D);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      g.id
    );
  }) }) : null;
}
const nx = u.memo(tx), Bi = [
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
], sx = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function rx({
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
  showKeystrokes: M = !0,
  keystrokes: C = []
}) {
  const _ = u.useRef(null), [w, m] = u.useState(1e3);
  u.useEffect(() => {
    if (!_.current) return;
    const R = new ResizeObserver((re) => {
      for (let ee of re)
        ee.contentRect.width > 50 && m(ee.contentRect.width);
    });
    return R.observe(_.current), () => R.disconnect();
  }, []);
  const g = u.useCallback((R) => !r || r <= 0 ? "0%" : `${(R - n) / r * 100}%`, [r, n]), T = u.useCallback((R) => {
    const ee = (R - n) / r * 100;
    return ee >= -5 && ee <= 105;
  }, [n, r]), E = (R) => {
    if (!_.current) return;
    const re = _.current.getBoundingClientRect(), ee = Math.max(0, Math.min(R.clientX - re.left, re.width)), J = Math.round(n + ee / re.width * r);
    a && a(J);
  }, b = () => {
    a && a(null);
  }, h = (R) => {
    if (!_.current || !i) return;
    const re = _.current.getBoundingClientRect(), ee = Math.max(0, Math.min(R.clientX - re.left, re.width)), J = Math.round(n + ee / re.width * r);
    i(Math.max(0, Math.min(l, J)));
  }, A = u.useMemo(() => {
    const R = Math.max(3, Math.floor(w / 95)), re = r / R;
    for (let ee of Bi)
      if (ee >= re) return ee;
    return Bi[Bi.length - 1];
  }, [r, w]), k = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const R = e + n, re = R + r, ee = t === "LOCAL" ? Ws(R).offsetMin * 60 * 1e3 : 0, J = R + ee, V = Math.ceil(J / A) * A, $e = [];
    for (let Le = V; Le <= re + ee; Le += A) {
      const ye = Le - ee, ze = (ye - R) / r * 100;
      ze >= 0 && ze <= 100 && $e.push({
        epoch: ye,
        pct: ze,
        label: jt(ye, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return $e;
  }, [e, n, r, A, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const R = e + n, re = R + r;
    return bp(R, re).map((ee) => ({
      ...ee,
      pct: (ee.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), D = u.useMemo(() => {
    if (!r || !e) return [];
    const R = e + n, re = R + r, ee = t === "UTC", J = [], V = ee ? 0 : Ws(R).offsetMin * 60 * 1e3, $e = R + V, Le = re + V, ye = new Date($e);
    for (ye.setUTCHours(0, 0, 0, 0), ye.getTime() < $e && ye.setUTCDate(ye.getUTCDate() + 1); ye.getTime() <= Le; ) {
      const be = ye.getTime() - V, Ie = (be - R) / r * 100, tt = String(ye.getUTCDate()).padStart(2, "0"), it = sx[ye.getUTCMonth()], ie = `${tt} ${it}`;
      J.push({ epoch: be, pct: Ie, dateLabel: ie }), ye.setUTCDate(ye.getUTCDate() + 1);
    }
    return J;
  }, [e, n, r, t]), {
    globalFirstMs: W = v,
    globalLastMs: $ = null,
    currentFirstMs: F = null,
    currentLastMs: se = null
  } = f || { globalFirstMs: v }, ne = W !== null && F !== null && Math.abs(W - F) < 1e3, K = $ !== null && se !== null && Math.abs($ - se) < 1e3, I = u.useMemo(() => {
    const R = [];
    return ne ? T(W) && R.push({
      id: "first-combined",
      ms: W,
      pct: g(W),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${jt(e + W, t)} (Click to jump)`
    }) : (T(W) && R.push({
      id: "first-global",
      ms: W,
      pct: g(W),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${jt(e + W, t)} (Click to jump)`
    }), T(F) && R.push({
      id: "first-current",
      ms: F,
      pct: g(F),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${jt(e + F, t)} (Click to jump)`
    })), K ? T($) && R.push({
      id: "last-combined",
      ms: $,
      pct: g($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${jt(e + $, t)} (Click to jump)`
    }) : (T(se) && R.push({
      id: "last-current",
      ms: se,
      pct: g(se),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${jt(e + se, t)} (Click to jump)`
    }), T($) && R.push({
      id: "last-global",
      ms: $,
      pct: g($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${jt(e + $, t)} (Click to jump)`
    })), R;
  }, [
    W,
    $,
    F,
    se,
    ne,
    K,
    e,
    t,
    y,
    T,
    g
  ]), U = u.useMemo(() => {
    const R = [];
    return typeof c == "number" && T(c) && R.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: g(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${jt(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && T(d) && R.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: g(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${jt(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), R;
  }, [c, d, e, t, T, g]), O = o !== null ? g(o) : null, z = O !== null && O >= 0 && O <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: _,
      className: "timeline-ruler-root",
      onMouseMove: E,
      onMouseLeave: b,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          k.map((R) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${R.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: R.label })
          ] }, R.epoch)),
          M && /* @__PURE__ */ s.jsx(
            nx,
            {
              stationHostname: p,
              activeStationName: y,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: w,
              onSeek: i,
              keystrokes: C
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
          D.map((R) => /* @__PURE__ */ s.jsxs(
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
              onClick: (re) => {
                re.stopPropagation(), i && i(R.ms);
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
              onClick: (re) => {
                re.stopPropagation(), i && i(R.ms);
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
        z && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${O}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: jt(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Kn = (e) => String(e).padStart(2, "0");
function lx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, p] = u.useState(""), [y, M] = u.useState(""), C = u.useCallback((k) => {
    if (!k || isNaN(k) || k <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(k);
      return {
        timeStr: `${Kn($.getUTCHours())}:${Kn($.getUTCMinutes())}:${Kn($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: D } = Ws(k), W = new Date(k + N * 60 * 1e3);
    return {
      timeStr: `${Kn(W.getUTCHours())}:${Kn(W.getUTCMinutes())}:${Kn(W.getUTCSeconds())}`,
      zoneLabel: D
    };
  }, [t]), _ = u.useCallback((k) => {
    if (!k || k < 0) return "00:00:00";
    const N = Math.floor(k / 1e3), D = Math.floor(N / 3600), W = Math.floor(N % 3600 / 60), $ = N % 60;
    return `${Kn(D)}:${Kn(W)}:${Kn($)}`;
  }, []), w = u.useMemo(() => C(e + r), [C, e, r]), m = u.useMemo(() => C(e + o), [C, e, o]), g = u.useMemo(() => _(Math.max(0, o - r)), [_, r, o]), T = u.useCallback((k, N) => {
    if (!k || !k.trim()) return N;
    const W = k.trim().split(" ")[0].split(":").map(Number);
    if (W.length < 2 || W.some(isNaN)) return N;
    const [$, F, se = 0] = W;
    if (t === "UTC") {
      const V = new Date(e);
      V.setUTCHours($, F, se, 0);
      let $e = V.getTime();
      for (; $e < e; ) $e += 864e5;
      for (; $e > e + n + 1e3; ) $e -= 864e5;
      const Le = $e - e;
      return isNaN(Le) ? N : Math.max(0, Math.min(n, Le));
    }
    const { offsetMin: ne } = Ws(e), K = new Date(e + ne * 6e4), I = K.getUTCFullYear(), U = K.getUTCMonth(), O = K.getUTCDate(), z = `${I}-${Kn(U + 1)}-${Kn(O)}`, R = `${Kn($)}:${Kn(F)}:${Kn(se)}`, re = za(z, R);
    let ee;
    if (re.isAmbiguous) {
      const V = e + N, $e = Math.abs(re.firstOccurrenceEpoch - V), Le = Math.abs(re.secondOccurrenceEpoch - V);
      ee = $e <= Le ? re.firstOccurrenceEpoch : re.secondOccurrenceEpoch;
    } else {
      const V = Date.UTC(I, U, O, $, F, se), { offsetMin: $e } = Ws(V - ne * 6e4);
      ee = V - $e * 6e4;
    }
    for (; ee < e; ) ee += 864e5;
    for (; ee > e + n + 1e3; ) ee -= 864e5;
    const J = ee - e;
    return isNaN(J) ? N : Math.max(0, Math.min(n, J));
  }, [e, t, n]), E = () => {
    p(w.timeStr), c(!0);
  }, b = () => {
    if (c(!1), !f || !f.trim() || f.trim() === w.timeStr)
      return;
    const k = T(f.trim(), r);
    k !== null && !isNaN(k) && k < o && l(k);
  }, h = () => {
    M(m.timeStr), v(!0);
  }, A = () => {
    if (v(!1), !y || !y.trim() || y.trim() === m.timeStr)
      return;
    const k = T(y.trim(), o);
    k !== null && !isNaN(k) && k > r && a(k);
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
          onChange: (k) => p(k.target.value),
          onBlur: b,
          onKeyDown: (k) => {
            k.key === "Enter" && b(), k.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: E,
          title: `Click to edit IN time (${w.zoneLabel})`,
          children: [
            w.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: w.zoneLabel })
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
          onChange: (k) => M(k.target.value),
          onBlur: A,
          onKeyDown: (k) => {
            k.key === "Enter" && A(), k.key === "Escape" && v(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: h,
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: g })
    ] })
  ] });
}
function ox({
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
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, p - f), M = Math.max(0, Math.min(100, l / r * 100)), C = Math.max(0, Math.min(100 - M, o / r * 100)), _ = M + C, w = a > 1.05, m = 7, g = y >= 10, T = y >= 16, E = g, b = T, h = E && Math.abs(M - f) < m, A = w && C >= 12 && !h, k = b && Math.abs(_ - p) < m, N = w && C >= 12 && !k;
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
            style: { left: `${f}%`, width: `${y}%` },
            children: [
              E && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: jt(t + i, n) }),
              b && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: jt(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${M}%`, width: `${C}%` },
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
function ax({
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
  const y = (d || "NONE").toUpperCase().replace("-", "_"), M = () => {
    v && v(y === "NONE" || y === "OFF" ? "BURN_IN" : y === "BURN_IN" ? "CAPTION" : "NONE");
  }, C = () => {
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
        onClick: M,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: C() })
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
const rh = 3, ix = 8e3, cx = 80;
function Pp() {
  setTimeout(ux, 0);
}
function ux() {
  var e;
  if (!(kl >= rh || _s.length === 0))
    for (_s = _s.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); kl < rh && _s.length > 0; ) {
      const t = _s.pop();
      !t || (e = t.signal) != null && e.aborted || (kl++, dx(t));
    }
}
async function dx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), kl = Math.max(0, kl - 1), qr.delete(t), Pp());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, ix);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(p, { signal: a });
    if (y.ok && y.status !== 204) {
      const M = await y.blob();
      if (M && M.size > 1500) {
        const C = URL.createObjectURL(M);
        if (As.size >= cx) {
          const _ = As.keys().next().value, w = As.get(_);
          w && URL.revokeObjectURL(w), As.delete(_);
        }
        As.set(t, C), i(C);
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
      }, { once: !0 }), _s.push(d), Pp();
    });
    return qr.set(a, i), i;
  },
  clear() {
    As.forEach((e) => URL.revokeObjectURL(e)), As.clear(), qr.clear(), _s = [], kl = 0;
  }
}, hx = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, ts = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Or = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
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
  isCanvasSummary: M = !1
}) {
  const [C, _] = u.useState({}), w = u.useRef(C);
  w.current = C;
  const m = u.useMemo(() => hx(l), [l]), g = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: D } = m, W = [], $ = o + r, F = $ + l, se = $ - N, ne = F + N, K = [...n].sort((R, re) => ts(R) - ts(re)), I = M ? c || [] : [...c || [], ...d || []], U = (R, re) => !I || I.length === 0 ? !1 : I.some((ee) => {
      const J = ee.startEpochMs ?? ee.startEpoch ?? ee.start ?? 0, V = ee.endEpochMs ?? ee.endEpoch ?? ee.end ?? 0;
      return V <= J ? !1 : Math.max(R, J) < Math.min(re, V);
    }), O = o + a, z = o + i;
    if (K.forEach((R, re) => {
      const ee = Math.round(ts(R)), J = Math.round(Or(R));
      if (J <= ee) return;
      const V = Math.max(ee, O), $e = Math.min(J, z);
      if ($e <= V) return;
      const Le = Math.max(V, se), ye = Math.min($e, ne);
      if (ye <= Le) return;
      const ze = Math.floor(Le / N) * N;
      for (let be = ze; be < ye; be += N) {
        const Ie = be + N, tt = Math.max(V, be), it = Math.min($e, Ie);
        it > tt && !U(tt, it) && W.push({
          key: `${e}_${t}_${tt}_${it}_${D}`,
          sIdx: re,
          startEpoch: tt,
          endEpoch: it,
          framesPerTile: D,
          displayId: t
        });
      }
    }), W.length > 20) {
      const R = o + r + l / 2;
      W.sort((re, ee) => {
        const J = Math.abs((re.startEpoch + re.endEpoch) / 2 - R), V = Math.abs((ee.startEpoch + ee.endEpoch) / 2 - R);
        return J - V;
      }), W.length = 20, W.sort((re, ee) => re.startEpoch - ee.startEpoch);
    }
    return W;
  }, [n, o, e, t, r, l, m, a, i, d, c]);
  u.useEffect(() => {
    if (g.length === 0) return;
    let N = !0;
    const D = new AbortController(), W = [], $ = {};
    let F = !1;
    g.forEach((O) => {
      const z = lh.get(e, O.startEpoch, O.endEpoch, O.framesPerTile, t);
      z ? w.current[O.key] !== z && ($[O.key] = z, F = !0) : W.push(O);
    });
    const se = new Set(g.map((O) => O.key)), ne = w.current, K = {};
    let I = !1;
    if (Object.keys(ne).forEach((O) => {
      se.has(O) ? K[O] = ne[O] : I = !0;
    }), F || I) {
      const O = { ...K, ...$ };
      w.current = O, _(O);
    }
    if (W.length === 0) return () => {
      N = !1;
    };
    const U = setTimeout(() => {
      W.forEach((O) => {
        lh.fetchTile(e, O.startEpoch, O.endEpoch, O.framesPerTile, D.signal, t).then((z) => {
          N && z && (w.current[O.key] = z, _((R) => ({ ...R, [O.key]: z })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(U), D.abort();
    };
  }, [g, e, t]);
  const T = (a - r) / l * 100, E = (i - r) / l * 100, b = u.useMemo(() => {
    if (g.length === 0 || !o || l <= 0) return [];
    const N = r, D = r + l;
    return g.map((W) => {
      const $ = W.startEpoch - o, F = W.endEpoch - o;
      if (F <= N || $ >= D) return null;
      const se = Math.max(N, $), ne = Math.min(D, F);
      return {
        key: W.key,
        spriteUrl: C[W.key] || null,
        leftPct: (se - N) / l * 100,
        widthPct: (ne - se) / l * 100
      };
    }).filter(Boolean);
  }, [g, o, r, l, C]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, D = r + l;
    return n.map((W, $) => {
      const F = Math.round(ts(W)) - o, se = Math.round(Or(W)) - o;
      if (se <= N || F >= D) return null;
      const ne = Math.max(N, F), K = Math.min(D, se);
      return {
        id: $,
        leftPct: (ne - N) / l * 100,
        widthPct: (K - ne) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), A = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((U, O) => ts(U) - ts(O)), D = [], W = r, $ = r + l, F = o + W, se = o + $, ne = o + (a !== void 0 ? a : W), K = o + (i !== void 0 ? i : $);
    if (N.length > 0) {
      const U = ts(N[0]);
      U > F && D.push({ startEpoch: F, endEpoch: U });
    } else l > 0 && D.push({ startEpoch: F, endEpoch: se });
    for (let U = 0; U < N.length - 1; U++) {
      const O = Or(N[U]), z = ts(N[U + 1]);
      z - O > 1e3 && D.push({ startEpoch: O, endEpoch: z });
    }
    if (N.length > 0) {
      const U = Or(N[N.length - 1]);
      U < se && D.push({ startEpoch: U, endEpoch: se });
    }
    const I = [];
    return c && c.length > 0 && c.forEach((U, O) => {
      const z = Math.max(U.startEpochMs ?? U.StartEpochMs, ne), R = Math.min(U.endEpochMs ?? U.EndEpochMs, K);
      if (R > z && R > F && z < se) {
        const re = Math.max(F, z), ee = Math.min(se, R), J = (ee - o - (re - o)) / l * 100;
        J > 0 && I.push({
          id: `global-${O}`,
          type: "global",
          startEpoch: re,
          endEpoch: ee,
          leftPct: (re - o - W) / l * 100,
          widthPct: J,
          durationSec: Math.round((R - z) / 1e3)
        });
      }
    }), M || D.forEach((U, O) => {
      let z = [U];
      c && c.length > 0 && c.forEach((R) => {
        const re = Math.max(R.startEpochMs ?? R.StartEpochMs, ne), ee = Math.min(R.endEpochMs ?? R.EndEpochMs, K);
        if (ee <= re) return;
        const J = [];
        z.forEach((V) => {
          ee <= V.startEpoch || re >= V.endEpoch ? J.push(V) : (re > V.startEpoch && J.push({ startEpoch: V.startEpoch, endEpoch: re }), ee < V.endEpoch && J.push({ startEpoch: ee, endEpoch: V.endEpoch }));
        }), z = J;
      }), z.forEach((R, re) => {
        if (R.endEpoch - R.startEpoch < 1e3 || R.endEpoch <= F || R.startEpoch >= se) return;
        const ee = Math.max(F, R.startEpoch), J = Math.min(se, R.endEpoch), V = (J - o - (ee - o)) / l * 100;
        V > 0 && I.push({
          id: `station-${O}-${re}`,
          type: "station",
          startEpoch: ee,
          endEpoch: J,
          leftPct: (ee - o - W) / l * 100,
          widthPct: V,
          durationSec: Math.round((R.endEpoch - R.startEpoch) / 1e3)
        });
      });
    }), I;
  }, [n, c, o, r, l, a, i, M]), k = u.useMemo(() => {
    if (!p || !f || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), D = r, W = r + l;
    return v.map(($, F) => {
      const se = ($.startEpochMs ?? $.StartEpochMs ?? 0) - o, ne = ($.endEpochMs ?? $.EndEpochMs ?? 0) - o;
      if (ne <= D || se >= W) return null;
      const K = Math.max(D, se), I = Math.min(W, ne), U = (K - D) / l * 100, O = (I - K) / l * 100;
      if (O <= 0) return null;
      const R = ($.targetDisplayId || $.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${F}`,
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
    k.map((N) => N.isFeatured ? /* @__PURE__ */ s.jsx(
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
      y.map((N, D) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${N.dispNum}`,
          style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
          title: `Auto-Director: Screen ${N.dispNum} (${N.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: N.dispNum })
        },
        `stp_${D}`
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
    E < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, E)}%`, right: 0 } })
  ] });
}
function fx({
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
  inPointMs: M = 0,
  outPointMs: C = 36e5,
  baseEpochMs: _ = 0,
  segments: w = [],
  recordingSegments: m = {},
  globalGaps: g = []
}) {
  const T = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", E = (e == null ? void 0 : e.id) || T, b = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var O, z, R;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((O = e == null ? void 0 : e.displayTopology) == null ? void 0 : O.displays) || ((z = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : z.Displays) || ((R = e == null ? void 0 : e.topology) == null ? void 0 : R.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), k = u.useMemo(() => {
    var z, R;
    const O = A.find((re) => re.isPrimary || re.IsPrimary);
    return ((O == null ? void 0 : O.displayId) || (O == null ? void 0 : O.DisplayId) || ((z = A[0]) == null ? void 0 : z.displayId) || ((R = A[0]) == null ? void 0 : R.DisplayId) || "mon-0").toLowerCase();
  }, [A]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), D = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), W = D && D.length > 0, $ = !!(A && A.length > 1), F = !!(t && $), se = u.useMemo(() => {
    let O = m[E] || m[T] || w || [];
    if (!O || O.length === 0) {
      const z = (E || "").toLowerCase(), R = (T || "").toLowerCase();
      for (const [re, ee] of Object.entries(m || {})) {
        const J = re.toLowerCase();
        if (z && J === z || R && J === R) {
          O = ee;
          break;
        }
      }
    }
    if ((!O || O.length === 0) && (O = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !O || O.length === 0)
      for (const z of A) {
        const R = z.segments || z.Segments || [];
        if (R.length > 0) {
          O = R;
          break;
        }
      }
    return (O || []).filter((z) => Or(z) - ts(z) > 0);
  }, [m, w, E, T, e, A]), ne = u.useMemo(() => {
    if (!_ || y <= 0) return [];
    const O = [...se].sort((J, V) => ts(J) - ts(V)), z = [], R = _ + y;
    if (g && g.length > 0 && g.forEach((J) => {
      const V = J.startEpochMs ?? J.StartEpochMs ?? 0, $e = J.endEpochMs ?? J.EndEpochMs ?? 0;
      $e > V && z.push({ startEpoch: V, endEpoch: $e, type: "global" });
    }), O.length === 0)
      return z.push({ startEpoch: _, endEpoch: R, type: "station" }), z;
    const re = Math.round(ts(O[0]));
    re - _ > 2e3 && (z.some((V) => V.type === "global" && V.startEpoch <= _ && V.endEpoch >= re) || z.push({ startEpoch: _, endEpoch: re, type: "station" }));
    for (let J = 0; J < O.length - 1; J++) {
      const V = Math.round(Or(O[J])), $e = Math.round(ts(O[J + 1]));
      $e - V > 2e3 && (z.some((ye) => ye.type === "global" && ye.startEpoch <= V && ye.endEpoch >= $e) || z.push({ startEpoch: V, endEpoch: $e, type: "station" }));
    }
    const ee = Math.round(Or(O[O.length - 1]));
    return R - ee > 2e3 && (z.some((V) => V.type === "global" && V.startEpoch <= ee && V.endEpoch >= R) || z.push({ startEpoch: ee, endEpoch: R, type: "station" })), z;
  }, [se, g, _, y]), K = u.useMemo(() => {
    const O = _ + M, z = _ + C;
    return Xg(D, ne, g, O, z, k);
  }, [D, ne, g, _, M, C, k]), I = u.useMemo(() => {
    if (!W || y <= 0) return null;
    const O = p, z = p + y;
    return K.map((R, re) => {
      const ee = (R.startEpochMs ?? R.StartEpochMs ?? 0) - _, J = (R.endEpochMs ?? R.EndEpochMs ?? 0) - _;
      if (J <= O || ee >= z) return null;
      const V = Math.max(O, ee), $e = Math.min(z, J), Le = (V - O) / y * 100, ye = ($e - V) / y * 100;
      if (ye <= 0) return null;
      const ze = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase(), be = A.findIndex((it) => (it.displayId || it.DisplayId || "").toLowerCase() === ze);
      let Ie = be >= 0 ? be + 1 : null;
      if (!Ie) {
        const it = ze.match(/\d+/);
        Ie = it ? parseInt(it[0], 10) + 1 : 1;
      }
      const tt = be >= 0 ? A[be].displayName || A[be].DisplayName || `Screen ${Ie}` : `Screen ${Ie}`;
      return {
        id: re,
        dispNum: Ie,
        dispLabel: tt,
        leftPct: Le,
        widthPct: ye
      };
    }).filter(Boolean);
  }, [W, K, A, _, p, y]), U = u.useCallback((O) => {
    const z = (O || "mon-0").toLowerCase();
    return o.some((R) => {
      if (R.stationId !== E) return !1;
      const re = (R.displayId || "mon-0").toLowerCase();
      return re === z || re === "auto" && (z === "mon-0" || z === "screen-0");
    });
  }, [o, E]);
  return F ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
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
        $ && l && /* @__PURE__ */ s.jsx(
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
        $ && l && /* @__PURE__ */ s.jsxs(
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: A.map((O, z) => {
      const R = (O.displayId || O.DisplayId || `mon-${z}`).toLowerCase(), re = O.displayNumber || O.DisplayNumber || z + 1, ee = O.displayName || O.DisplayName || "", J = ee && !ee.toLowerCase().includes(T.toLowerCase()) ? ee : `Screen ${re}${O.isPrimary || z === 0 ? " (Main)" : ""}`, V = U(R);
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
                  className: `btn-add-screen-canvas ${V ? "is-on-canvas" : ""}`,
                  onClick: ($e) => {
                    $e.stopPropagation(), a(e.id, R);
                  },
                  title: V ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: V ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Wc,
              {
                hostname: T,
                displayId: R,
                activeSegments: O.segments && O.segments.length > 0 ? O.segments : se,
                viewportStartMs: p,
                viewportDurationMs: y,
                baseEpochMs: _,
                inPointMs: M,
                outPointMs: C,
                globalGaps: g,
                directorSegments: K,
                isAutoDirectorEnabled: r,
                gaps: ne,
                showDirectorCoverage: $
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
        d && d(), $ && n && n();
      },
      onContextMenu: (O) => {
        v && (O.preventDefault(), O.stopPropagation(), v(O, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${$ ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${b}${h ? ` (${h})` : ""} • Click to select${$ ? " / expand" : ""}`,
            children: [
              $ && /* @__PURE__ */ s.jsx(
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
              $ && l && /* @__PURE__ */ s.jsx(
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
            displayId: k,
            activeSegments: se,
            viewportStartMs: p,
            viewportDurationMs: y,
            baseEpochMs: _,
            inPointMs: M,
            outPointMs: C,
            globalGaps: g,
            isAutoDirectorEnabled: r,
            gaps: ne,
            stepperSegments: $ ? I : null
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
}, ta = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function Ka(e, t = 100, n = 24, r = 1, l = {}) {
  const o = l.yCenter !== void 0 ? l.yCenter : n / 2, a = l.maxHalfHeight !== void 0 ? l.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${o} L ${t},${o}`;
  const i = e.length, c = t / Math.max(1, i - 1), d = Math.max(0, Math.min(3, Number(r) || 1));
  let v = "";
  for (let p = 0; p < i; p++) {
    const y = p * c, M = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o - M * a;
    v += p === 0 ? `M ${y.toFixed(2)},${C.toFixed(2)}` : ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  let f = "";
  for (let p = i - 1; p >= 0; p--) {
    const y = p * c, M = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o + M * a;
    f += ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  return `${v}${f} Z`;
}
function px(e, t = 100, n = 24, r = 1) {
  let l = null, o = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (l = e.sys, o = e.mic) : Array.isArray(e) && (l = e.map((c, d) => Math.min(1, Math.max(0.02, c * (1 + 0.12 * Math.sin(d * 0.45))))), o = e.map((c, d) => Math.min(1, Math.max(0.02, c * (0.92 + 0.15 * Math.cos(d * 0.38))))));
  const a = Ka(l, t, n, r, {
    yCenter: n * 0.25,
    maxHalfHeight: n * 0.25 - 1.2
  }), i = Ka(o, t, n, r, {
    yCenter: n * 0.75,
    maxHalfHeight: n * 0.25 - 1.2
  });
  return { sysPath: a, micPath: i };
}
const na = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function _p({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", i = t === "mic", c = u.useMemo(() => !o || !e ? null : px(e, 100, 24, n), [o, e, n]), d = u.useMemo(() => o || !e ? null : Ka(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (o) {
    const f = ta.sys, p = ta.mic;
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
  const v = a ? ta.sys : i ? ta.mic : l || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: d || Ka(e, 100, 24, n),
      fill: v,
      fillOpacity: "0.45",
      stroke: v,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function mx({
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
  const [y, M] = u.useState(() => _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [C, _] = u.useState(!1);
  u.useEffect(() => {
    let F = !0;
    const se = new AbortController(), ne = _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (ne) {
      M(ne), _(!1);
      return;
    }
    return M(null), _(!0), _r.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, se.signal, 250).then((K) => {
      F && (K && M(K), _(!1));
    }).catch(() => {
      F && _(!1);
    }), () => {
      F = !1, se.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const w = e.startEpochMs, m = e.endEpochMs, g = Math.max(1, m - w), T = (e.gain || 1) * (t.gain || 1), E = Math.max(d, w), b = Math.min(d + v, m), h = (E - d) / v * 100, A = (b - E) / v * 100;
  if (A <= 0) return null;
  const k = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, D = e.fadeOutMs ?? 50, W = Math.min(45, N / g * 100), $ = Math.min(45, D / g * 100);
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
      onMouseDown: (F) => {
        !F.target.closest(".trim-handle") && !F.target.closest(".btn-menu-close") && !F.target.closest(".clip-channel-tag") && (i == null || i(F));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${p} [${k.toUpperCase()}] (${jt(w, f, { includeSeconds: !0 })} - ${jt(m, f, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${D}ms
Drag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (F) => a(F, "start"),
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
          _p,
          {
            peaks: y,
            channelMode: k,
            effectiveGain: T,
            isLoadingWaveform: C,
            laneColor: n
          }
        ) }),
        D > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${$}%` },
            title: `Fade Out: ${D}ms`,
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
              className: `clip-channel-tag mode-${k}`,
              onClick: (F) => {
                F.stopPropagation(), c == null || c();
              },
              title: `Channel Mode: ${k.toUpperCase()} (Click to cycle BOTH / SYS / MIC)`,
              children: k.toUpperCase()
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
            onMouseDown: (F) => a(F, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function gx({
  clip: e,
  vpStartEpoch: t,
  viewportDurationMs: n,
  timeMode: r,
  stationName: l,
  onExpand: o
}) {
  const [a, i] = u.useState(() => _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200) || null), [c, d] = u.useState(!1);
  u.useEffect(() => {
    let w = !0;
    const m = new AbortController(), g = _r.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200);
    if (g) {
      i(g), d(!1);
      return;
    }
    return i(null), d(!0), _r.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, m.signal, 200).then((T) => {
      w && (T && i(T), d(!1));
    }).catch(() => {
      w && d(!1);
    }), () => {
      w = !1, m.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const v = e.startEpochMs, f = e.endEpochMs, p = Math.max(t, v), y = Math.min(t + n, f), M = (p - t) / n * 100, C = (y - p) / n * 100;
  if (C <= 0) return null;
  const _ = e.effectiveChannelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip mode-${_}`,
      style: {
        left: `${M}%`,
        width: `${C}%`,
        borderLeftColor: e.laneColor
      },
      onDoubleClick: o,
      title: `Master Audio Bus Stream: ${l} [${_.toUpperCase()}] (${jt(v, r, { includeSeconds: !0 })} - ${jt(f, r, { includeSeconds: !0 })})
Gain: ${Math.round(e.effectiveGain * 100)}%
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          _p,
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
function xx({
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
  const y = u.useRef(null), [M, C] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [_, w] = u.useState(!1), [m, g] = u.useState(null), [T, E] = u.useState(1), [b, h] = u.useState(50), [A, k] = u.useState(50), [N, D] = u.useState([]), [W, $] = u.useState(null), [F, se] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const L = (te) => {
      te.detail && se(te.detail);
    };
    return window.addEventListener("itb-live-audio-level", L), () => window.removeEventListener("itb-live-audio-level", L);
  }, []);
  const ne = u.useCallback(() => {
    C((L) => {
      const te = !L;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(te));
      } catch {
      }
      return te;
    });
  }, []), [K, I] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((L, te) => {
        var Y;
        return {
          id: `clip_${te}_${L.startEpochMs || L.StartEpochMs}`,
          startEpochMs: L.startEpochMs ?? L.StartEpochMs ?? l,
          endEpochMs: L.endEpochMs ?? L.EndEpochMs ?? l + r,
          sourceStationId: L.sourceStationId ?? L.SourceStationId ?? (((Y = t[0]) == null ? void 0 : Y.id) || "station-0"),
          gain: L.gain ?? L.Gain ?? 1,
          channelMode: L.channelMode ?? L.ChannelMode ?? "both",
          fadeInMs: L.fadeInMs ?? L.FadeInMs ?? 50,
          fadeOutMs: L.fadeOutMs ?? L.FadeOutMs ?? 50
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
  ]), U = l + o, O = l + n, z = O + r, R = u.useCallback((L) => {
    if (!p) return;
    const te = [];
    L.forEach((Y) => {
      Y.isMuted || _ || Y.clips.forEach((q) => {
        te.push({
          startEpochMs: q.startEpochMs,
          endEpochMs: q.endEpochMs,
          sourceStationId: q.sourceStationId,
          gain: q.gain * Y.gain,
          channelMode: q.channelMode || Y.channelMode || "both",
          fadeInMs: q.fadeInMs ?? 50,
          fadeOutMs: q.fadeOutMs ?? 50
        });
      });
    }), te.sort((Y, q) => Y.startEpochMs - q.startEpochMs), p({ segments: te });
  }, [p, _]);
  u.useEffect(() => {
    let L = null;
    for (const te of K)
      if (!(te.isMuted || _)) {
        for (const Y of te.clips)
          if (U >= Y.startEpochMs && U <= Y.endEpochMs) {
            const q = t.find((G) => G.id === Y.sourceStationId);
            L = {
              stationId: Y.sourceStationId,
              stationName: q ? q.displayName || q.hostname || q.id : Y.sourceStationId,
              channelMode: Y.channelMode || te.channelMode || "both",
              gain: Y.gain * te.gain,
              isPlaying: F.isPlaying
            };
            break;
          }
        if (L) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: L }));
  }, [K, _, U, t, F.isPlaying]), u.useEffect(() => {
    const L = () => {
      N.length !== 0 && (I((q) => {
        const G = q.map((Q) => ({
          ...Q,
          clips: Q.clips.filter((ce) => !N.includes(ce.id))
        }));
        return R(G), G;
      }), D([]), g(null));
    }, te = (q) => {
      if (q.key === "Delete" || q.key === "Backspace") {
        const G = q.target;
        if (G.tagName === "INPUT" || G.tagName === "TEXTAREA" || G.isContentEditable) return;
        N.length > 0 && (q.preventDefault(), L());
      }
    }, Y = () => L();
    return window.addEventListener("keydown", te), window.addEventListener("itb:studio-delete-selected", Y), () => {
      window.removeEventListener("keydown", te), window.removeEventListener("itb:studio-delete-selected", Y);
    };
  }, [N, R]);
  const re = u.useCallback(() => {
    I((L) => {
      const Y = `A${L.length + 1}`, q = {
        id: Y,
        name: `Track ${Y}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, G = [...L, q];
      return R(G), G;
    });
  }, [R]), ee = u.useCallback((L) => {
    I((te) => {
      if (te.length <= 1) return te;
      const Y = te.filter((q) => q.id !== L);
      return R(Y), Y;
    });
  }, [R]), J = u.useCallback((L) => {
    I((te) => {
      const Y = te.map((q) => q.id === L ? { ...q, isMuted: !q.isMuted } : q);
      return R(Y), Y;
    });
  }, [R]), V = u.useCallback((L) => {
    I((te) => {
      var G;
      const Y = (G = te.find((Q) => Q.id === L)) == null ? void 0 : G.isSolo, q = te.map((Q) => ({
        ...Q,
        isSolo: Q.id === L ? !Y : !1,
        isMuted: Q.id === L ? !1 : !Y
      }));
      return R(q), q;
    });
  }, [R]), $e = u.useCallback((L) => {
    const te = ["both", "sys", "mic"];
    I((Y) => {
      const q = Y.map((G) => {
        if (G.id !== L) return G;
        const Q = G.channelMode || "both", ce = te[(te.indexOf(Q) + 1) % te.length];
        return {
          ...G,
          channelMode: ce,
          clips: G.clips.map((qe) => ({ ...qe, channelMode: ce }))
        };
      });
      return R(q), q;
    });
  }, [R]), Le = u.useCallback((L, te) => {
    const Y = Math.max(0, Math.min(2, Number(te)));
    I((q) => {
      const G = q.map((Q) => Q.id === L ? { ...Q, gain: Y } : Q);
      return R(G), G;
    }), nh(Y);
  }, [R]), ye = u.useCallback((L, te) => {
    te && I((Y) => {
      const q = Y.map((G) => {
        if (G.id !== L) return G;
        if (G.clips.length === 0) {
          const Q = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: te,
            gain: 1,
            channelMode: G.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...G, clips: [Q] };
        }
        return {
          ...G,
          clips: G.clips.map((Q) => ({ ...Q, sourceStationId: te }))
        };
      });
      return R(q), q;
    });
  }, [l, r, R]), ze = u.useCallback((L, te = null, Y = null) => {
    var at;
    const q = te || ((at = t[0]) == null ? void 0 : at.id) || "station-0", G = Y !== null ? Y : U, Q = Math.min(r, 6e4), ce = G + Q, qe = K.find((Ge) => Ge.id === L), De = (qe == null ? void 0 : qe.channelMode) || "both", Xe = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(G),
      endEpochMs: Math.round(ce),
      sourceStationId: q,
      gain: 1,
      channelMode: De,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    I((Ge) => {
      const Tt = Ge.map((Rt) => Rt.id === L ? {
        ...Rt,
        clips: [...Rt.clips, Xe].sort((Lt, Ot) => Lt.startEpochMs - Ot.startEpochMs)
      } : Rt);
      return R(Tt), Tt;
    });
  }, [K, U, r, t, R]), be = u.useCallback((L, te = null) => {
    I((Y) => {
      const q = Y.map((G) => {
        if (L && G.id !== L) return G;
        const Q = [];
        return G.clips.forEach((ce) => {
          (!te || ce.id === te || N.includes(ce.id)) && U > ce.startEpochMs + 500 && U < ce.endEpochMs - 500 ? (Q.push({ ...ce, endEpochMs: U }), Q.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: U,
            endEpochMs: ce.endEpochMs,
            sourceStationId: ce.sourceStationId,
            gain: ce.gain,
            channelMode: ce.channelMode || G.channelMode || "both",
            fadeInMs: ce.fadeInMs ?? 50,
            fadeOutMs: ce.fadeOutMs ?? 50
          })) : Q.push(ce);
        }), { ...G, clips: Q };
      });
      return R(q), q;
    }), g(null);
  }, [U, N, R]), Ie = u.useCallback(() => {
    be(null, null);
  }, [be]), tt = u.useCallback((L, te) => {
    I((Y) => {
      const q = Y.map((G) => G.id !== L ? G : {
        ...G,
        clips: G.clips.filter((Q) => Q.id !== te)
      });
      return R(q), q;
    }), g(null);
  }, [R]), it = u.useCallback((L, te, Y) => {
    I((q) => {
      const G = q.map((Q) => Q.id !== L ? Q : {
        ...Q,
        clips: Q.clips.map((ce) => ce.id === te ? { ...ce, sourceStationId: Y } : ce)
      });
      return R(G), G;
    }), g((q) => q ? { ...q, stationId: Y } : null);
  }, [R]), ie = u.useCallback((L, te, Y) => {
    const q = Math.max(0, Math.min(2.5, Number(Y)));
    E(q), I((G) => {
      const Q = G.map((ce) => ce.id !== L ? ce : {
        ...ce,
        clips: ce.clips.map((qe) => qe.id === te ? { ...qe, gain: q } : qe)
      });
      return R(Q), Q;
    }), nh(q);
  }, [R]), we = u.useCallback((L, te, Y, q) => {
    const G = Math.max(0, Math.min(1e4, Math.round(Number(q) || 0)));
    Y === "in" ? h(G) : k(G), I((Q) => {
      const ce = Q.map((qe) => qe.id !== L ? qe : {
        ...qe,
        clips: qe.clips.map((De) => De.id === te ? Y === "in" ? { ...De, fadeInMs: G } : { ...De, fadeOutMs: G } : De)
      });
      return R(ce), ce;
    }), g((Q) => Q ? Y === "in" ? { ...Q, fadeInMs: G } : { ...Q, fadeOutMs: G } : null);
  }, [R]), Ke = u.useCallback((L, te, Y) => {
    var Lt, Ot;
    if (L.preventDefault(), L.stopPropagation(), L.button !== 0) return;
    const q = K.find((ot) => ot.id === te), G = (Lt = q == null ? void 0 : q.clips) == null ? void 0 : Lt.find((ot) => ot.id === Y);
    if (!G) return;
    const Q = L.clientX, ce = G.startEpochMs, De = G.endEpochMs - ce, Xe = y.current;
    if (!Xe) return;
    const at = (Ot = Xe.querySelector(".audio-lane-timeline")) == null ? void 0 : Ot.getBoundingClientRect();
    if (!at || at.width <= 0) return;
    let Ge = !1;
    const Tt = (ot) => {
      const yt = ot.clientX - Q;
      Math.abs(yt) > 3 && (Ge = !0);
      const Je = yt / at.width * r;
      let Be = Math.round(ce + Je), Nt = Be + De;
      const Dt = 12 / at.width * r;
      Math.abs(Be - U) <= Dt ? (Be = U, Nt = Be + De) : Math.abs(Nt - U) <= Dt && (Nt = U, Be = Nt - De), Be < l && (Be = l, Nt = Be + De), I((an) => an.map((cn) => cn.id !== te ? cn : {
        ...cn,
        clips: cn.clips.map((wn) => wn.id === Y ? { ...wn, startEpochMs: Be, endEpochMs: Nt } : wn)
      }));
    }, Rt = () => {
      window.removeEventListener("mousemove", Tt), window.removeEventListener("mouseup", Rt), Ge && I((ot) => (R(ot), ot));
    };
    window.addEventListener("mousemove", Tt), window.addEventListener("mouseup", Rt);
  }, [K, r, U, l, R]), Ve = u.useCallback((L, te, Y, q) => {
    L.preventDefault(), L.stopPropagation();
    const G = L.clientX, Q = K.find((Ge) => Ge.id === te), ce = Q == null ? void 0 : Q.clips.find((Ge) => Ge.id === Y);
    if (!ce) return;
    const qe = ce.startEpochMs, De = ce.endEpochMs, Xe = (Ge) => {
      var ot;
      const Tt = Ge.clientX - G, Rt = (ot = y.current) == null ? void 0 : ot.querySelector(".audio-lane-timeline");
      if (!Rt) return;
      const Lt = Rt.getBoundingClientRect(), Ot = Tt / Lt.width * r;
      I((yt) => yt.map((Je) => Je.id !== te ? Je : {
        ...Je,
        clips: Je.clips.map((Be) => {
          if (Be.id !== Y) return Be;
          if (q === "start") {
            const Nt = Math.min(De - 500, qe + Ot);
            return { ...Be, startEpochMs: Math.round(Nt) };
          } else {
            const Nt = Math.max(qe + 500, De + Ot);
            return { ...Be, endEpochMs: Math.round(Nt) };
          }
        })
      }));
    }, at = () => {
      window.removeEventListener("mousemove", Xe), window.removeEventListener("mouseup", at), I((Ge) => (R(Ge), Ge));
    };
    window.addEventListener("mousemove", Xe), window.addEventListener("mouseup", at);
  }, [K, r, R]), me = u.useCallback((L, te, Y) => {
    I((q) => {
      const G = q.map((Q) => Q.id !== L ? Q : {
        ...Q,
        clips: Q.clips.map((ce) => ce.id === te ? { ...ce, channelMode: Y } : ce)
      });
      return R(G), G;
    }), g((q) => q ? { ...q, channelMode: Y } : null);
  }, [R]), fe = u.useCallback((L, te) => {
    var De;
    const Y = K.find((Xe) => Xe.id === L), q = (De = Y == null ? void 0 : Y.clips) == null ? void 0 : De.find((Xe) => Xe.id === te);
    if (!q) return;
    const G = q.channelMode || Y.channelMode || "both", Q = ["both", "sys", "mic"], ce = (Q.indexOf(G) + 1) % Q.length, qe = Q[ce];
    me(L, te, qe);
  }, [K, me]), oe = (L, te, Y) => {
    L.preventDefault(), L.stopPropagation();
    const q = 280, G = 390, Q = Math.max(16, Math.min(window.innerWidth - q - 16, L.clientX - q / 2));
    let ce = L.clientY - G - 12;
    ce < 80 && (ce = Math.min(window.innerHeight - G - 16, L.clientY + 24)), E(Y.gain || 1), h(Y.fadeInMs ?? 50), k(Y.fadeOutMs ?? 50), g({
      laneId: te,
      clipId: Y.id,
      s: Y.startEpochMs,
      e: Y.endEpochMs,
      x: Q,
      y: ce,
      stationId: Y.sourceStationId,
      gain: Y.gain || 1,
      channelMode: Y.channelMode || "both",
      fadeInMs: Y.fadeInMs ?? 50,
      fadeOutMs: Y.fadeOutMs ?? 50
    });
  };
  u.useEffect(() => {
    if (!m) return;
    const L = () => g(null), te = (Y) => {
      Y.key === "Escape" && g(null);
    };
    return window.addEventListener("click", L), window.addEventListener("keydown", te), () => {
      window.removeEventListener("click", L), window.removeEventListener("keydown", te);
    };
  }, [m]);
  const Ce = u.useMemo(() => {
    if (_) return [];
    const L = K.some((q) => q.isSolo), te = K.filter((q) => L ? q.isSolo : !q.isMuted), Y = [];
    return te.forEach((q) => {
      const G = na[K.indexOf(q) % na.length];
      q.clips.forEach((Q) => {
        Y.push({
          ...Q,
          laneId: q.id,
          laneName: q.name,
          laneColor: G,
          effectiveChannelMode: Q.channelMode || q.channelMode || "both",
          effectiveGain: (Q.gain || 1) * (q.gain || 1)
        });
      });
    }), Y.sort((q, G) => q.startEpochMs - G.startEpochMs);
  }, [K, _]);
  return !t || t.length === 0 ? null : M ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
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
          K.length,
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
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${F.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: F.db > -55 ? `${F.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (F.peak || 0) * 100))}%`,
                background: F.peak > 0.85 ? "#F43F5E" : F.peak > 0.65 ? "#F59E0B" : "#10B981"
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
              w((L) => {
                const te = !L;
                return R(K), te;
              });
            },
            title: _ ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: _ ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: K.map((L, te) => {
      const Y = na[te % na.length], q = W === L.id, G = t.find((Q) => {
        var ce;
        return Q.id === ((ce = L.clips[0]) == null ? void 0 : ce.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: Y }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: Y }, children: L.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: L.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (G == null ? void 0 : G.id) || "",
              onChange: (Q) => ye(L.id, Q.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((Q) => /* @__PURE__ */ s.jsx("option", { value: Q.id, children: Q.displayName || Q.hostname || Q.id }, Q.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${L.isMuted ? "active" : ""}`,
                onClick: () => J(L.id),
                title: L.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${L.isSolo ? "active" : ""}`,
                onClick: () => V(L.id),
                title: L.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${L.channelMode || "both"}`,
                onClick: () => $e(L.id),
                title: `Discrete Audio Channel: ${(L.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
                children: (L.channelMode || "both").toUpperCase()
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
                value: L.gain,
                onChange: (Q) => Le(L.id, Q.target.value),
                title: `Lane Gain: ${Math.round(L.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(L.gain * 100),
              "%"
            ] })
          ] }),
          K.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => ee(L.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${q ? "is-drag-over" : ""}`,
            onClick: () => D([]),
            onDragOver: (Q) => {
              Q.preventDefault(), Q.dataTransfer.dropEffect = "copy", W !== L.id && $(L.id);
            },
            onDragLeave: () => {
              W === L.id && $(null);
            },
            onDrop: (Q) => {
              Q.preventDefault(), $(null);
              const ce = Q.dataTransfer.getData("text/station-id") || Q.dataTransfer.getData("text/plain");
              if (ce) {
                const qe = Q.currentTarget.getBoundingClientRect(), De = Math.max(0, Math.min(1, (Q.clientX - qe.left) / qe.width)), Xe = Math.round(O + De * r);
                ze(L.id, ce, Xe);
              }
            },
            onDoubleClick: (Q) => {
              var Xe;
              const ce = Q.currentTarget.getBoundingClientRect(), qe = Math.max(0, Math.min(1, (Q.clientX - ce.left) / ce.width)), De = Math.round(O + qe * r);
              ze(L.id, (Xe = t[0]) == null ? void 0 : Xe.id, De);
            },
            children: [
              L.clips.map((Q) => {
                const ce = t.find((De) => De.id === Q.sourceStationId), qe = ce ? ce.displayName || ce.hostname || ce.id : Q.sourceStationId;
                return Q.endEpochMs <= O || Q.startEpochMs >= z ? null : /* @__PURE__ */ s.jsx(
                  mx,
                  {
                    clip: Q,
                    lane: L,
                    laneColor: Y,
                    isSelected: N.includes(Q.id),
                    onSelect: (De) => {
                      De.stopPropagation(), De.ctrlKey || De.metaKey ? D(
                        (Xe) => Xe.includes(Q.id) ? Xe.filter((at) => at !== Q.id) : [...Xe, Q.id]
                      ) : D([Q.id]);
                    },
                    onOpenMenu: (De) => oe(De, L.id, Q),
                    onTrimDrag: (De, Xe) => Ve(De, L.id, Q.id, Xe),
                    onClipMoveDrag: (De) => Ke(De, L.id, Q.id),
                    onToggleChannelMode: () => fe(L.id, Q.id),
                    vpStartEpoch: O,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: qe
                  },
                  Q.id
                );
              }),
              L.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Q;
                    return ze(L.id, (Q = t[0]) == null ? void 0 : Q.id, U);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    L.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, L.id);
    }) }),
    m && Ls.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: m.x, top: m.y },
          onClick: (L) => L.stopPropagation(),
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
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((L) => {
                const te = L.id === m.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${te ? "is-selected" : ""}`,
                    onClick: () => it(m.laneId, m.clipId, L.id),
                    children: L.displayName || L.hostname || L.id
                  },
                  L.id
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
                    className: `btn-channel-chip mode-both ${m.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => me(m.laneId, m.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${m.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => me(m.laneId, m.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${m.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => me(m.laneId, m.clipId, "mic"),
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
                  onChange: (L) => ie(m.laneId, m.clipId, L.target.value),
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
                      onChange: (L) => we(m.laneId, m.clipId, "in", L.target.value),
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
                      onChange: (L) => we(m.laneId, m.clipId, "out", L.target.value),
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
                  onClick: () => be(m.laneId, m.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => tt(m.laneId, m.clipId),
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
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: _ || Ce.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Ce.length > 0 ? `${Ce.length} CLIPS ACTIVE` : _ ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: F.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: (L) => {
              L.target.closest(".collapsed-master-clip") || ne();
            },
            children: Ce.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : Ce.map((L) => {
              const te = t.find((q) => q.id === L.sourceStationId), Y = te ? te.displayName || te.hostname || te.id : L.sourceStationId;
              return L.endEpochMs <= O || L.startEpochMs >= z ? null : /* @__PURE__ */ s.jsx(
                gx,
                {
                  clip: L,
                  vpStartEpoch: O,
                  viewportDurationMs: r,
                  timeMode: f,
                  stationName: Y,
                  onExpand: ne
                },
                `master_${L.id}`
              );
            })
          }
        )
      ]
    }
  );
}
function yx({
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
  timeMode: M = "LOCAL"
}) {
  const C = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [_, w] = u.useState(null), [m, g] = u.useState(null);
  Mo.useEffect(() => {
    if (m === null) return;
    const k = (D) => {
      D.key === "Escape" && g(null);
    }, N = (D) => {
      !D.target.closest(".kf-inspector-popover") && !D.target.closest(".kf-marker-diamond") && g(null);
    };
    return window.addEventListener("keydown", k), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", k), window.removeEventListener("mousedown", N);
    };
  }, [m]);
  const T = d + f, E = d + i, b = E + c, h = (k) => {
    const N = k.currentTarget.getBoundingClientRect(), D = k.clientX - N.left, W = Math.max(0, Math.min(1, D / N.width)), $ = Math.round(E + W * c);
    r && r($);
  }, A = (k, N, D) => {
    if (k.button !== 0) return;
    k.stopPropagation(), k.preventDefault();
    const W = k.clientX, $ = D.timestampEpochMs, F = D.id || `kf_${N}_${$}`, se = k.currentTarget.closest(".track-surface");
    if (!se) return;
    let ne = !1;
    w({
      idx: N,
      kfId: F,
      startClientX: W,
      initialEpoch: $,
      currentEpoch: $
    });
    const K = (U) => {
      const O = U.clientX - W;
      Math.abs(O) > 3 && (ne = !0);
      const z = se.getBoundingClientRect(), R = O / z.width * c;
      let re = Math.round($ + R);
      re = Math.max(d, Math.min(d + v, re));
      const ee = d + p, J = d + y, V = 14 / z.width * c;
      Math.abs(re - T) <= V ? re = T : Math.abs(re - ee) <= V ? re = ee : Math.abs(re - J) <= V && (re = J), w(($e) => $e ? { ...$e, currentEpoch: re } : null);
    }, I = (U) => {
      window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", I), w(null);
      const O = se.getBoundingClientRect(), R = (U.clientX - W) / O.width * c;
      let re = Math.round($ + R);
      re = Math.max(d, Math.min(d + v, re));
      const ee = d + p, J = d + y, V = 14 / O.width * c;
      Math.abs(re - T) <= V ? re = T : Math.abs(re - ee) <= V ? re = ee : Math.abs(re - J) <= V && (re = J), ne ? (o && o(F, re), n && n(N, re)) : (n && n(N, $), g(($e) => $e === N ? null : N));
    };
    window.addEventListener("mousemove", K), window.addEventListener("mouseup", I);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        C.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (k) => {
            k.stopPropagation(), r && r(T);
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
          C.map((k, N) => {
            const D = (_ == null ? void 0 : _.idx) === N, W = D ? _.currentEpoch : k.timestampEpochMs;
            if (W < E - 5e4 || W > b + 5e4) return null;
            const $ = (W - E) / c * 100;
            if ($ < -2 || $ > 102) return null;
            const F = N === t, se = jt(W, M, { includeSeconds: !0 }), ne = `${k.transitionType || "smooth"} (${k.transitionDurationSec ?? 0.5}s)`, K = Math.max(0, (W - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${F ? "is-active" : ""} ${D ? "is-dragging" : ""}`,
                style: { left: `${$}%` },
                onMouseDown: (I) => A(I, N, k),
                onContextMenu: (I) => {
                  I.preventDefault(), I.stopPropagation(), C.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${se} (+${K}s) • ${ne}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  D && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: se }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      K,
                      "s"
                    ] })
                  ] }),
                  m === N && !D && /* @__PURE__ */ s.jsxs(
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
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: se }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (I) => {
                                I.stopPropagation(), g(null);
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
                                  className: `btn-trans-choice ${(k.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${k.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${k.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          k.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((I) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(k.transitionDurationSec ?? 0.5) === I ? "is-active" : ""}`,
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
                                I.stopPropagation(), l && l(N), g(null);
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
function vx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (k) => !r || r <= 0 ? "0%" : `${(k - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), M = Math.max(0, d), C = Math.min(100, v), _ = Math.max(0, C - M), w = (k) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(k, N);
  }, m = d < 1.5, g = v > 98.5, T = d <= 0.2 && d >= -0.2, E = v >= 99.8 && v <= 100.2, b = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => jt(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    _ > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${M}%`, width: `${_}%` },
        onMouseDown: w("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${m ? "flipped" : ""} ${T ? "at-edge" : ""}`,
        style: { left: c(o) },
        onMouseDown: w("in"),
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
        className: `marker out-marker ${g ? "flipped" : ""} ${E ? "at-edge" : ""}`,
        style: { left: c(a) },
        onMouseDown: w("out"),
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
        onMouseDown: w("playhead"),
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
const Nx = Mo.memo(vx);
function kx({
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
function wx({
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
const Ex = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function jx({
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
          const M = await y.json();
          a(M), d.current && d.current(M);
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
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: Ex };
}
function Cx({
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
  const [p, y] = u.useState(null), [M, C] = u.useState(null), _ = (w, m) => {
    y(w), C({
      target: w,
      startX: m.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!p) return;
    const w = e * 0.015, m = (T) => {
      if (p === "minimap-viewport" && (f != null && f.current)) {
        const b = f.current.getBoundingClientRect(), A = Math.max(0, Math.min(T.clientX - b.left, b.width)) / b.width * t, k = Math.max(0, Math.min(A - e / 2, t - e));
        d(k);
        return;
      }
      const E = v(T.clientX);
      if (p === "playhead") {
        let b = E;
        Math.abs(b - l) <= w ? b = l : Math.abs(b - a) <= w && (b = a), r(Math.max(0, Math.min(t, b)));
      } else if (p === "in") {
        const b = a - 1e3;
        o(Math.max(0, Math.min(E, b)));
      } else if (p === "out") {
        const b = l + 1e3;
        i(Math.min(t, Math.max(E, b)));
      } else if (p === "range" && M) {
        const b = E - v(M.startX), h = M.initialOut - M.initialIn;
        let A = M.initialIn + b, k = M.initialOut + b;
        A < 0 ? (A = 0, k = h) : k > t && (k = t, A = t - h), o(A), i(k);
      }
    }, g = () => {
      y(null), C(null);
    };
    return window.addEventListener("mousemove", m), window.addEventListener("mouseup", g), () => {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", g);
    };
  }, [
    p,
    M,
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
function Fp({
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
  setPlayheadMs: M,
  inPointMs: C = 0,
  setInPointMs: _,
  outPointMs: w = 36e5,
  setOutPointMs: m,
  onExport: g,
  recordingSegments: T = {},
  movieBoundaries: E,
  viewportStartMs: b = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: k,
  onJumpViewportTo: N,
  keystrokeMode: D = "BURN_IN",
  onChangeKeystrokeMode: W,
  keystrokes: $ = [],
  showKeystrokes: F = !1,
  showRulerKeystrokes: se = !1,
  onToggleRulerKeystrokes: ne,
  _onSplitDirectorSegment: K,
  _onChangeDirectorSegmentDisplay: I,
  _onResetDirectorSegmentToAuto: U,
  audioRoutingPlan: O,
  onSplitAudioSegment: z,
  onChangeAudioSegmentStation: R,
  onChangeAudioSegmentGain: re,
  onFollowVisualFeed: ee,
  isAutoFollowAudio: J,
  canvasLayoutTimeline: V,
  activeKfIndex: $e = 0,
  onSelectKeyframe: Le,
  onAddKeyframeAtEpoch: ye,
  onDeleteKeyframe: ze,
  onUpdateKeyframeEpoch: be,
  onUpdateKeyframeTransition: Ie,
  onToggleDisplayOnCanvas: tt,
  onUpdateAudioPlan: it
}) {
  var Oe, st;
  const [ie, we] = u.useState(null), [Ke, Ve] = u.useState(0), [me, fe] = u.useState(null), [oe, Ce] = u.useState(!0), L = (ae) => {
    var H, he, pe;
    return ((ae == null ? void 0 : ae.displays) || (ae == null ? void 0 : ae.Displays) || ((H = ae == null ? void 0 : ae.displayTopology) == null ? void 0 : H.displays) || ((he = ae == null ? void 0 : ae.DisplayTopology) == null ? void 0 : he.Displays) || ((pe = ae == null ? void 0 : ae.topology) == null ? void 0 : pe.displays) || []).length;
  }, [te, Y] = u.useState(() => {
    var ae;
    return e.length === 1 && L(e[0]) > 1 ? (ae = e[0]) == null ? void 0 : ae.id : null;
  });
  u.useEffect(() => {
    var ae;
    if (e.length === 1 && !te && ((ae = e[0]) != null && ae.id) && L(e[0]) > 1)
      Y(e[0].id);
    else if (te) {
      const nt = e.find((H) => H.id === te);
      (!nt || L(nt) <= 1) && Y(null);
    }
  }, [e, te]);
  const q = u.useRef(null), G = u.useRef(null), Q = d / Math.max(1, v), ce = Math.ceil(e.length / er) || 1, qe = u.useMemo(() => {
    const ae = Ke * er;
    return e.slice(ae, ae + er);
  }, [e, Ke]);
  u.useEffect(() => {
    if (!t && !te) return;
    const ae = te || t, nt = e.findIndex((H) => H.id === ae);
    if (nt !== -1) {
      const H = Math.floor(nt / er);
      H !== Ke && Ve(H);
    }
  }, [t, te, e, Ke]);
  const De = ((Oe = V == null ? void 0 : V.keyframes) == null ? void 0 : Oe[$e]) || ((st = V == null ? void 0 : V.keyframes) == null ? void 0 : st[0]), Xe = u.useMemo(() => {
    var ae;
    return ((ae = De == null ? void 0 : De.layout) == null ? void 0 : ae.placements) || [];
  }, [De]), at = u.useMemo(() => e.find((ae) => ae.id === t) || null, [e, t]), Ge = (E == null ? void 0 : E.globalFirstMs) ?? null, Tt = (E == null ? void 0 : E.globalLastMs) ?? null, Rt = u.useMemo(() => (C > 500 || w < d - 500) && w - C >= 1e3, [C, w, d]), Lt = u.useMemo(() => e.map((ae) => ae.id).sort().join(","), [e]), { estimateData: Ot, isEstimating: ot, formatEstimateSize: yt } = jx({
    stationIdsKey: Lt,
    inPointMs: C,
    outPointMs: w,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), Je = u.useCallback((ae) => {
    if (!q.current) return b;
    const nt = q.current.getBoundingClientRect(), H = nt.left + 200, he = nt.width - 200 - 58;
    if (he <= 0) return b;
    const pe = Math.max(0, Math.min(ae - H, he));
    return Math.round(b + pe / he * Q);
  }, [b, Q]), { draggingTarget: Be, handleStartDrag: Nt } = Cx({
    viewportDurationMs: Q,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: M,
    inPointMs: C,
    setInPointMs: _,
    outPointMs: w,
    setOutPointMs: m,
    viewportStartMs: b,
    setViewportStartMs: h,
    getMsFromClientX: Je,
    minimapRef: G
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
    const nt = (H) => {
      H.preventDefault(), H.stopPropagation();
      const he = H.ctrlKey || H.shiftKey, pe = Dt.current, Ue = an.current, Ze = cn.current, ut = wn.current;
      if (he) {
        const dt = Math.abs(H.deltaX) > Math.abs(H.deltaY) ? H.deltaX : H.deltaY;
        if (dt === 0) return;
        const et = Ze / Math.max(1, pe), ht = Math.max(0, Ze - et), St = et * 0.08 * (dt > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(ht, Ue + St)));
      } else {
        if (H.deltaY === 0) return;
        const et = H.deltaY < 0 ? 1.25 : 0.8, ht = Math.max(32, Ze / 2e3), St = ae.getBoundingClientRect(), Mt = St.left + 200, Pt = St.width - 200 - 58;
        let rn = 0.5;
        if (Pt > 0)
          if (H.clientX >= Mt && H.clientX <= St.right - 58)
            rn = Math.max(0, Math.min(1, (H.clientX - Mt) / Pt));
          else {
            const gs = Ze / Math.max(1, pe), Ss = (ut - Ue) / gs;
            rn = Ss >= 0 && Ss <= 1 ? Ss : 0.5;
          }
        const _t = Math.max(1, Math.min(ht, Math.round(pe * et * 100) / 100));
        if (_t === pe) return;
        const zt = Ze / pe, dn = Ze / _t, At = Ue + rn * zt - rn * dn, $n = Math.max(0, Ze - dn);
        f == null || f(_t), h == null || h(Math.max(0, Math.min($n, At)));
      }
    };
    return ae.addEventListener("wheel", nt, { passive: !1, capture: !0 }), () => ae.removeEventListener("wheel", nt, { capture: !0 });
  }, [f, h]);
  const Pe = e.length > 0 && Math.abs(w - C) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: q,
      className: "timeline-board-root",
      onContextMenu: (ae) => {
        var H;
        ae.preventDefault();
        const nt = (H = q.current) == null ? void 0 : H.getBoundingClientRect();
        !nt || ae.clientX - nt.left < 200 || ae.clientX > nt.right - 58 || fe({ x: ae.clientX, y: ae.clientY, targetMs: Math.max(0, Math.min(d, Je(ae.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            lx,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: C,
              setInPointMs: _,
              outPointMs: w,
              setOutPointMs: m
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                ox,
                {
                  minimapRef: G,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: b,
                  viewportDurationMs: Q,
                  zoomLevel: v,
                  inPointMs: C,
                  outPointMs: w,
                  playheadMs: y,
                  onStartDragMinimap: Nt
                }
              ),
              /* @__PURE__ */ s.jsx(
                ax,
                {
                  earliestMediaMs: Ge,
                  latestMediaMs: Tt,
                  hasActiveCut: Rt,
                  onJumpToFirst: () => {
                    Ge !== null && (M == null || M(Ge), N == null || N(Ge, "start"));
                  },
                  onJumpToLast: () => {
                    Tt !== null && (M == null || M(Tt), N == null || N(Tt, "end"));
                  },
                  onContextualFit: () => {
                    Rt ? k == null || k(C, w) : Ge !== null && Tt !== null && Tt > Ge ? k == null || k(Ge, Tt) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: D,
                  onChangeKeystrokeMode: W,
                  showRulerKeystrokes: se,
                  onToggleRulerKeystrokes: ne
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              rx,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: b,
                viewportDurationMs: Q,
                totalDurationMs: d,
                hoverMs: ie,
                onHoverChange: we,
                onSeek: (ae) => M == null ? void 0 : M(ae),
                inPointMs: C,
                outPointMs: w,
                earliestMediaMs: Ge,
                movieBoundaries: E,
                stationHostname: (at == null ? void 0 : at.hostname) || (at == null ? void 0 : at.id) || (at == null ? void 0 : at.name),
                activeStationName: (at == null ? void 0 : at.displayName) || (at == null ? void 0 : at.hostname) || (at == null ? void 0 : at.name),
                showKeystrokes: !!(se ?? F),
                keystrokes: $
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
              if (Be || !q.current) return;
              const nt = q.current.getBoundingClientRect();
              ae.clientX >= nt.left + 200 && ae.clientX <= nt.right - 58 ? we(Je(ae.clientX)) : we(null);
            },
            onMouseLeave: () => !Be && we(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => Ce((ae) => !ae), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: oe ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  oe && ce > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
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
                !oe && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => Ce(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (Xe == null ? void 0 : Xe.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var pe, Ue, Ze, ut, dt;
                    const ae = (Xe == null ? void 0 : Xe.find((et) => et.isPrimary || et.isFocused)) || (Xe == null ? void 0 : Xe[0]), nt = (ae == null ? void 0 : ae.stationId) || ((pe = e[0]) == null ? void 0 : pe.hostname) || ((Ue = e[0]) == null ? void 0 : Ue.id), H = (ae == null ? void 0 : ae.displayId) || "mon-0";
                    let he = [];
                    if (Xe && Xe.length > 0) {
                      const et = /* @__PURE__ */ new Map();
                      Xe.forEach((ht) => {
                        var Mt;
                        (T[ht.stationId] || T[(Mt = ht.stationId) == null ? void 0 : Mt.toLowerCase()] || []).forEach((Pt) => {
                          const rn = `${Pt.startEpochMs || Pt.start}_${Pt.endEpochMs || Pt.end}`;
                          et.has(rn) || et.set(rn, Pt);
                        });
                      }), he = Array.from(et.values());
                    }
                    return he.length === 0 && (he = T[(Ze = e[0]) == null ? void 0 : Ze.id] || T[(ut = e[0]) == null ? void 0 : ut.hostname] || ((dt = e[0]) == null ? void 0 : dt.segments) || []), /* @__PURE__ */ s.jsx(
                      Wc,
                      {
                        hostname: nt,
                        displayId: H,
                        activeSegments: he,
                        viewportStartMs: b,
                        viewportDurationMs: Q,
                        baseEpochMs: i,
                        inPointMs: C,
                        outPointMs: w,
                        globalGaps: (Ot == null ? void 0 : Ot.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                oe && (e.length > 0 ? qe.map((ae) => {
                  const nt = !!(t && ae.id === t), H = te === ae.id, he = o ? o[ae.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    fx,
                    {
                      station: ae,
                      isExpanded: H && L(ae) > 1,
                      onToggleExpand: () => {
                        L(ae) > 1 && Y((pe) => pe === ae.id ? null : ae.id);
                      },
                      isAutoDirectorEnabled: he,
                      onToggleAutoDirector: a,
                      canvasPlacements: Xe,
                      onToggleDisplayOnCanvas: tt,
                      directorPlan: ae.directorPlan,
                      isActive: nt,
                      onSelect: () => n == null ? void 0 : n(ae.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: b,
                      viewportDurationMs: Q,
                      inPointMs: C,
                      outPointMs: w,
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
                  xx,
                  {
                    audioPlan: O,
                    stations: e,
                    viewportStartMs: b,
                    viewportDurationMs: Q,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: z,
                    onChangeSegmentStation: R,
                    onChangeSegmentGain: re,
                    onFollowVisualFeed: ee,
                    isAutoFollow: J,
                    timeMode: c,
                    onUpdateAudioPlan: it
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  yx,
                  {
                    canvasLayoutTimeline: V,
                    activeKfIndex: $e,
                    onSelectKeyframe: Le,
                    onAddKeyframeAtEpoch: ye,
                    onDeleteKeyframe: ze,
                    onUpdateKeyframeEpoch: be,
                    onUpdateKeyframeTransition: Ie,
                    viewportStartMs: b,
                    viewportDurationMs: Q,
                    baseEpochMs: i,
                    totalDurationMs: d,
                    playheadMs: y,
                    inPointMs: C,
                    outPointMs: w,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                wx,
                {
                  isRangeValid: Pe,
                  onExport: g,
                  isEstimating: ot,
                  estimateData: Ot,
                  formatEstimateSize: yt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Nx,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: b,
            viewportDurationMs: Q,
            playheadMs: y,
            inPointMs: C,
            outPointMs: w,
            onStartDrag: Nt
          }
        ),
        /* @__PURE__ */ s.jsx(
          kx,
          {
            contextMenu: me,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ae) => {
              me && (ae === "playhead" ? M == null || M(me.targetMs) : ae === "in" ? _ == null || _(Math.max(0, Math.min(me.targetMs, w - 1e3))) : ae === "out" && (m == null || m(Math.min(d, Math.max(me.targetMs, C + 1e3)))), fe(null));
            },
            onClose: () => fe(null)
          }
        )
      ]
    }
  );
}
function Sx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Mx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function bx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Ix({
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
  unselectedInTabCount: M,
  activeTabName: C,
  onSelectAllInScope: _,
  onClearInScope: w,
  viewMode: m = "grid",
  onViewModeChange: g,
  isDrawerMode: T = !1
}) {
  const [E, b] = u.useState(!1), h = v !== "all", A = !C || C.toLowerCase() === "all", k = A ? "Select All" : `Select ${C}`, N = A ? "Clear All" : `Clear ${C}`;
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
            onChange: (D) => t(D.target.value)
          }
        )
      ] }),
      T && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${E ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => b(!E),
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
            className: `btn-view-mode ${m === "grid" ? "active" : ""}`,
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
            className: `btn-view-mode ${m === "table" ? "active" : ""}`,
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
          onChange: (D) => a(D.target.value),
          children: l.map((D) => {
            const W = D.id === "all" ? c.map((F) => F.id) : D.stationIds || [], $ = W.filter((F) => d.includes(F)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: D.id, children: [
              D.name,
              " (",
              $,
              "/",
              W.length,
              ")"
            ] }, D.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: _, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: w, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        i && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((D) => {
        const W = o === D.id, $ = D.id === "all" ? c.map((ne) => ne.id) : D.stationIds || [], F = $.length, se = $.filter((ne) => d.includes(ne)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${W ? "active" : ""}`,
            onClick: () => a(D.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: D.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${se > 0 ? "has-selected" : ""}`, children: [
                se,
                "/",
                F
              ] })
            ]
          },
          D.id
        );
      }) })
    ] })),
    (!T || E) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${T ? "is-collapsed-tray" : ""}`, children: [
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
              M,
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
          k
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: w, children: [
          "✕ ",
          N
        ] })
      ] })
    ] })
  ] });
}
function Tx({
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
    const y = Math.min(n, r), M = Math.min(p, r), C = Math.ceil(r / n), _ = Math.ceil(r / p);
    return y !== M || C !== _;
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
        const y = n === p, M = !f(p);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${M ? "redundant-disabled" : ""}`,
            disabled: M,
            onClick: () => o(p),
            title: M ? `All stations already fit on screen (Total: ${r})` : `Show ${p} per page`,
            children: p
          },
          p
        );
      }) })
    ] })
  ] });
}
function Ax({
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
              onClick: (M) => {
                M.stopPropagation(), n(p.id);
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
const Bp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function ah(e, t, n = Bp) {
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
function $x(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function Rx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Lx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Bp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Rx(e.bytesRecorded) : "--");
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
    const A = Math.max(h.startEpoch, f), k = Math.min(h.endEpoch, p);
    k > A && y.push({ startEpoch: A, endEpoch: k });
  }
  y.sort((h, A) => h.startEpoch - A.endEpoch);
  const M = [];
  for (const h of y)
    if (M.length === 0)
      M.push({ ...h });
    else {
      const A = M[M.length - 1];
      h.startEpoch <= A.endEpoch + 1e3 ? A.endEpoch = Math.max(A.endEpoch, h.endEpoch) : M.push({ ...h });
    }
  let C = 0;
  for (const h of M)
    C += h.endEpoch - h.startEpoch;
  const _ = o > 0 ? C / o * 100 : 0, w = _ > 0 && _ < 1 ? Number(_.toFixed(1)) : Math.min(100, Math.round(_)), m = [];
  let g = f, T = 0;
  for (const h of M) {
    if (h.startEpoch > g + 2e3) {
      const N = (h.startEpoch - g) / o * 100, D = (g - f) / o * 100;
      m.push({
        type: "gap",
        startPct: Math.max(0, D),
        widthPct: Math.min(100, N)
      }), T++;
    }
    const A = (h.endEpoch - h.startEpoch) / o * 100, k = (h.startEpoch - f) / o * 100;
    m.push({
      type: "rec",
      startPct: Math.max(0, k),
      widthPct: Math.min(100, A)
    }), g = h.endEpoch;
  }
  if (g < p - 2e3) {
    const h = (p - g) / o * 100, A = (g - f) / o * 100;
    m.push({
      type: "gap",
      startPct: Math.max(0, A),
      widthPct: Math.min(100, h)
    }), T++;
  }
  const E = T > 0 || w < 100, b = ah(w, E, r);
  return {
    coveragePct: w,
    recordedDuration: $x(C),
    totalRecordedMs: C,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: E,
    gapsCount: T,
    trafficStatus: b,
    segments: m.length > 0 ? m : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Ox = Object.freeze([]), Dx = 12;
function Px({
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
  systemTabs: p = Ox,
  recordingSegments: y = {},
  baseEpochMs: M = 0,
  durationMs: C = 0
}) {
  const [_, w] = u.useState([]), [m, g] = u.useState("all"), [T, E] = u.useState(""), [b, h] = u.useState(!0), [A, k] = u.useState("all"), [N, D] = u.useState(null), [W, $] = u.useState(!1), [F, se] = u.useState(15), [ne, K] = u.useState(8), [I, U] = u.useState(1), O = u.useRef(!1), z = u.useRef(null), R = c && r.length === 0, re = r.length === 0 && !c;
  let ee = "is-closed";
  i || re || R ? ee = "is-full-width" : e && (ee = "is-open"), u.useLayoutEffect(() => {
    const oe = () => {
      if (!z.current) return;
      const L = z.current.clientHeight;
      if (L <= 0) return;
      const te = z.current.querySelector(".station-row, .hub-table-row"), Y = te ? te.offsetHeight : 40;
      if (Y > 0) {
        const G = Math.floor(L / Y) - 2, ce = [5, 10, 15, 20, 25, 30].filter((qe) => qe <= G).pop() || 5;
        se(ce);
      }
      const q = z.current.clientWidth;
      if (q > 0) {
        const ce = Math.max(1, Math.floor((q + 12) / 252)), De = Math.max(1, Math.floor((L + 12) / (175 + 12))), Xe = Math.max(ce * De, ce);
        K(Xe);
      }
    };
    oe(), window.addEventListener("resize", oe);
    const Ce = new ResizeObserver(oe);
    return z.current && Ce.observe(z.current), () => {
      window.removeEventListener("resize", oe), Ce.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      w(p);
      return;
    }
    if (O.current || !e && !i) return;
    O.current = !0;
    let oe = !0;
    return (async () => {
      $(!0);
      try {
        const L = await fetch("/api/v1/dashboard/tabs");
        if (L.ok && oe) {
          const te = await L.json();
          Array.isArray(te) && w(te);
        }
      } catch (L) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", L);
      } finally {
        oe && $(!1);
      }
    })(), () => {
      oe = !1;
    };
  }, [e, i, p]);
  const J = u.useMemo(() => {
    const oe = _.length > 0 ? _ : p;
    if (oe && oe.length > 0) {
      const Ce = oe.map((L) => {
        const te = L.hostnames || L.assignedHostnames || L.stations || L.stationIds || [], Y = r.filter((q) => {
          const G = (q.hostname || q.name || "").trim().toLowerCase();
          return te.some((Q) => typeof Q == "string" ? Q.trim().toLowerCase() === G || G.includes(Q.trim().toLowerCase()) : (Q.hostname || Q.name || "").trim().toLowerCase() === G);
        }).map((q) => q.id);
        return {
          id: String(L.id || L.tabId || L.name),
          name: L.name || "Tab",
          stationIds: Y
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((L) => L.id) },
        ...Ce.filter((L) => L.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Ce) => Ce.id) }];
  }, [_, p, r]), V = u.useMemo(() => J.find((oe) => oe.id === m) || J[0], [J, m]), $e = u.useMemo(() => !V || V.id === "all" ? r.map((oe) => oe.id) : V.stationIds || [], [V, r]), Le = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((oe) => oe.isLoaded || oe.segments && oe.segments.length > 0).length : r.filter((oe) => y[oe.id] !== void 0 || oe.isLoaded).length, [r, y]), ye = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Le < r.length && Object.keys(y).length > 0), [d, c, r.length, Le, y]), ze = u.useMemo(() => {
    const oe = /* @__PURE__ */ new Map(), Ce = { baseEpochMs: M, durationMs: C };
    for (const L of r) {
      const Y = !(y && y[L.id] !== void 0 || L.isLoaded === !0 || L.segments && L.segments.length > 0) && (ye || c || d), q = y && y[L.id] || L.segments || [], G = Lx(L, q, Ce);
      oe.set(L.id, {
        ...G,
        hasAudio: L.hasAudio !== void 0 ? L.hasAudio : G == null ? void 0 : G.hasAudio,
        audioLabel: L.audioLabel || (L.hasAudio ? "AAC" : (G == null ? void 0 : G.audioLabel) || "NONE"),
        audioChannels: L.audioChannels ? L.audioChannels === 1 ? "Mono" : "Stereo" : G == null ? void 0 : G.audioChannels,
        feedSpec: L.feedSpec || (G == null ? void 0 : G.feedSpec) || `${L.resolution || "1080p"} • ${L.fps || 30}fps`,
        resolution: L.resolution || (G == null ? void 0 : G.resolution) || "1080p",
        fps: L.fps || (G == null ? void 0 : G.fps) || 30,
        isLoading: Y
      });
    }
    return oe;
  }, [r, y, M, C, ye, c, d]), be = u.useMemo(() => r.filter((oe) => {
    const Ce = ze.get(oe.id), L = y && y[oe.id] && y[oe.id].length > 0 || oe.segments && oe.segments.length > 0, te = Ce && (Ce.coveragePct > 0 || Ce.totalRecordedMs > 0), Y = typeof oe.recordingsCount == "number" && oe.recordingsCount > 0;
    return Ce && !Ce.isLoading ? te || L : Y || L;
  }), [r, ze, y]), Ie = u.useMemo(() => be.filter((oe) => {
    if (V.id !== "all" && !$e.includes(oe.id) || !(oe.displayName || oe.hostname || oe.name || "").toLowerCase().includes(T.toLowerCase())) return !1;
    const L = l.includes(oe.id), te = ze.get(oe.id);
    return A === "selected" ? L : A === "unselected" ? !L : A === "gaps" ? te == null ? void 0 : te.hasGaps : A === "audio" ? te == null ? void 0 : te.hasAudio : !0;
  }).sort((oe, Ce) => b ? (oe.displayName || oe.hostname || "").localeCompare(Ce.displayName || Ce.hostname || "") : 0), [be, V, $e, T, A, l, b, ze]), tt = u.useMemo(() => N !== null ? N : Ie.length > Dx ? "table" : "grid", [N, Ie.length]), it = tt === "table" ? F : ne, ie = Math.max(1, Math.ceil(Ie.length / it));
  u.useEffect(() => {
    U(1);
  }, [m, T, A, tt]), u.useEffect(() => {
    I > ie && U(ie);
  }, [ie, I]);
  const we = u.useMemo(() => {
    if (ee !== "is-full-width") return Ie;
    const oe = (I - 1) * it;
    return Ie.slice(oe, oe + it);
  }, [Ie, I, it, ee]), Ke = () => {
    if (!a) return;
    const oe = V.id === "all" ? Ie.map((Ce) => Ce.id) : $e;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...oe])));
  }, Ve = () => {
    if (!a) return;
    const oe = new Set(
      V.id === "all" ? Ie.map((Ce) => Ce.id) : $e
    );
    a(l.filter((Ce) => !oe.has(Ce)));
  }, me = $e.filter((oe) => l.includes(oe)).length, fe = Ie.filter((oe) => l.includes(oe.id)).length;
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
            ye && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Le,
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
      ye && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Le / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: R ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : re ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
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
      ee === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${ye ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: ye ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: ye ? `ANALYZING TIMELINE ARCHIVES • ${Le} OF ${be.length} STATIONS SYNCED (${be.length > 0 ? Math.min(100, Math.round(Le / be.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${be.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: ye ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
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
        Ix,
        {
          searchTerm: T,
          onSearchChange: E,
          sortAlpha: b,
          onToggleSort: () => h(!b),
          effectiveTabs: J,
          selectedTabId: m,
          onSelectTab: (oe) => {
            g(oe), D(null);
          },
          isLoadingTabs: W,
          allStations: be,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: k,
          filteredCount: Ie.length,
          selectedInTabCount: me,
          unselectedInTabCount: $e.length - me,
          activeTabName: V.name,
          onSelectAllInScope: Ke,
          onClearInScope: Ve,
          viewMode: tt,
          onViewModeChange: ee === "is-full-width" ? D : null,
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
      ee === "is-full-width" && tt === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          ref: z,
          className: `station-list ${ee === "is-full-width" ? tt === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: we.map((oe) => {
            const Ce = l.includes(oe.id), L = ze.get(oe.id);
            return ee === "is-full-width" ? tt === "grid" ? /* @__PURE__ */ s.jsx(
              Sx,
              {
                station: oe,
                isSelected: Ce,
                onToggle: o,
                meta: L
              },
              oe.id
            ) : /* @__PURE__ */ s.jsx(
              Mx,
              {
                station: oe,
                isSelected: Ce,
                onToggle: o,
                meta: L
              },
              oe.id
            ) : /* @__PURE__ */ s.jsx(
              bx,
              {
                station: oe,
                isSelected: Ce,
                onToggle: o,
                meta: L
              },
              oe.id
            );
          })
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsx(
        Tx,
        {
          currentPage: I,
          totalPages: ie,
          pageSize: it,
          totalItems: Ie.length,
          onPageChange: U,
          onPageSizeChange: (oe) => {
            tt === "table" ? se(oe) : K(oe), U(1);
          },
          viewMode: tt
        }
      ),
      ee === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Ax,
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
const On = (e) => String(e).padStart(2, "0"), _x = [
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
], Fx = [
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
    const k = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, k[0] || 0)),
      m: Math.min(59, Math.max(0, k[1] || 0)),
      s: Math.min(59, Math.max(0, k[2] || 0))
    };
  }, [e]), M = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const C = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((se) => se.length > 0);
    let D = 0, W = 0, $ = 0;
    N.length >= 1 && (D = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (W = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const F = l ? `${On(D)}:${On(W)}:${On($)}` : `${On(D)}:${On(W)}`;
    i(F), t && t(F, { h: D, m: W, s: $ });
  }, _ = (k) => {
    let N = f;
    k === "AM" && f >= 12 ? N = f - 12 : k === "PM" && f < 12 && (N = f + 12);
    const D = l ? `${On(N)}:${On(p)}:${On(y)}` : `${On(N)}:${On(p)}`;
    i(D), t && t(D, { h: N, m: p, s: y });
  }, w = u.useCallback((k, N) => {
    if (!v.current) return null;
    const D = v.current.getBoundingClientRect(), W = D.left + D.width / 2, $ = D.top + D.height / 2, F = k.clientX - W, se = k.clientY - $;
    let ne = Math.atan2(se, F) * 180 / Math.PI + 90;
    if (ne < 0 && (ne += 360), N === "hours") {
      const K = Math.round(ne / 30) % 12;
      return M ? K === 0 ? 12 : K + 12 : K === 0 ? 0 : K;
    }
    return Math.round(ne / 6) % 60;
  }, [M]), m = u.useCallback((k, N) => {
    let D = f, W = p, $ = y;
    k === "hours" ? D = N : k === "minutes" ? W = N : k === "seconds" && ($ = N);
    const F = l ? `${On(D)}:${On(W)}:${On($)}` : `${On(D)}:${On(W)}`;
    i(F), t && t(F, { h: D, m: W, s: $ });
  }, [f, p, y, l, t]), g = (k, N) => {
    N.preventDefault(), N.stopPropagation(), d(k);
    const D = w(N, k);
    D !== null && m(k, D);
  };
  u.useEffect(() => {
    if (!c) return;
    const k = (D) => {
      const W = w(D, c);
      W !== null && m(c, W);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", k), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", N);
    };
  }, [c, w, m]);
  const T = u.useMemo(() => f % 12 * 30, [f]), E = u.useMemo(() => p % 60 * 6, [p]), b = u.useMemo(() => y % 60 * 6, [y]), h = M ? Fx : _x, A = u.useMemo(() => {
    const k = [];
    for (let N = 0; N < 60; N++) {
      const D = (N * 6 - 90) * (Math.PI / 180), W = N % 5 === 0, $ = 104, F = W ? 93 : 98;
      k.push({
        index: N,
        x1: 110 + F * Math.cos(D),
        y1: 110 + F * Math.sin(D),
        x2: 110 + $ * Math.cos(D),
        y2: 110 + $ * Math.sin(D),
        isMajor: W
      });
    }
    return k;
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
              className: `btn-period ${M ? "" : "active"}`,
              onClick: () => _("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${M ? "active" : ""}`,
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
            onChange: (k) => i(k.target.value),
            onBlur: C,
            onKeyDown: (k) => {
              k.key === "Enter" && k.currentTarget.blur();
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
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: A.map((k) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: k.x1,
              y1: k.y1,
              x2: k.x2,
              y2: k.y2,
              className: `dial-tick ${k.isMajor ? "major" : "minor"}`
            },
            `tick-${k.index}`
          )) }),
          h.map((k) => {
            const N = (k.angle - 90) * (Math.PI / 180), D = 76, W = 110 + D * Math.cos(N), $ = 110 + D * Math.sin(N), F = f === k.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: W,
                y: $,
                className: `dial-num ${F ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: k.label
              },
              `dial-h-${k.val}`
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
                    onPointerDown: (k) => g("hours", k)
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
                    onPointerDown: (k) => g("minutes", k)
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
                    onPointerDown: (k) => g("seconds", k)
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
const sa = 7 * 24 * 60 * 60 * 1e3, Yt = (e) => String(e).padStart(2, "0");
function Bx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, p] = u.useState("00:00:00"), [y, M] = u.useState("00:00:00"), [C, _] = u.useState(() => /* @__PURE__ */ new Date()), [w, m] = u.useState(null), [g, T] = u.useState([]), [E, b] = u.useState(!1), [h, A] = u.useState(""), [k, N] = u.useState(1), [D, W] = u.useState(2), [$, F] = u.useState(null), se = u.useCallback(() => {
    try {
      const ie = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (ie) {
        const we = JSON.parse(ie);
        Array.isArray(we) && T(we);
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
    se();
    let ie = n == null ? void 0 : n.startEpochMs, we = n == null ? void 0 : n.endEpochMs;
    if (!ie || isNaN(ie))
      if (n != null && n.start) {
        const me = String(n.start).replace(" ", "T"), fe = new Date(me).getTime();
        ie = isNaN(fe) ? Date.now() - 24 * 3600 * 1e3 : fe;
      } else
        we = Date.now(), ie = we - 24 * 3600 * 1e3;
    if (!we || isNaN(we))
      if (n != null && n.end) {
        const me = String(n.end).replace(" ", "T"), fe = new Date(me).getTime();
        we = isNaN(fe) ? Date.now() : fe;
      } else
        we = ie + 24 * 3600 * 1e3;
    F(null);
    const Ke = Lr(ie, o), Ve = Lr(we, o);
    c(`${Ke.year}-${Yt(Ke.month)}-${Yt(Ke.day)}`), v(`${Ve.year}-${Yt(Ve.month)}-${Yt(Ve.day)}`), p(`${Yt(Ke.hour)}:${Yt(Ke.minute)}:${Yt(Ke.second)}`), M(`${Yt(Ve.hour)}:${Yt(Ve.minute)}:${Yt(Ve.second)}`), _(new Date(Date.UTC(Ke.year, Ke.month - 1, 1)));
  }, [e, n, o, se]);
  const ne = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), K = d || i, I = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), U = u.useMemo(() => K ? `${K}T${y}` : "", [K, y]), O = u.useMemo(() => {
    const ie = {};
    return g.forEach((we) => {
      const Ke = we.startTime || we.start, Ve = we.endTime || we.end || Ke;
      if (!Ke) return;
      const me = String(Ke).substring(0, 10), fe = String(Ve).substring(0, 10), [oe, Ce, L] = me.split("-").map(Number), [te, Y, q] = fe.split("-").map(Number);
      if (isNaN(oe) || isNaN(Ce) || isNaN(L) || isNaN(te) || isNaN(Y) || isNaN(q)) return;
      let G = new Date(Date.UTC(oe, Ce - 1, L));
      const Q = new Date(Date.UTC(te, Y - 1, q));
      for (; G.getTime() <= Q.getTime(); ) {
        const ce = `${G.getUTCFullYear()}-${Yt(G.getUTCMonth() + 1)}-${Yt(G.getUTCDate())}`;
        ie[ce] || (ie[ce] = []), ie[ce].push(we), G.setUTCDate(G.getUTCDate() + 1);
      }
    }), ie;
  }, [g]), z = async (ie, we) => {
    if (we && we.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Ke = g.filter((Ve) => (Ve.id || Ve.startTime) !== ie);
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
    const we = ie.startTime || ie.start, Ke = ie.endTime || ie.end;
    if (!we || !Ke) return;
    const Ve = we.substring(0, 10), me = we.includes("T") ? we.split("T")[1].substring(0, 8) : "00:00:00", fe = Ke.substring(0, 10), oe = Ke.includes("T") ? Ke.split("T")[1].substring(0, 8) : "23:59:59";
    c(Ve), v(fe), p(me), M(oe);
    const [Ce, L] = Ve.split("-").map(Number);
    _(new Date(Date.UTC(Ce, L - 1, 1))), b(!1);
  }, re = (ie) => {
    l ? (l(ie), t && t()) : R(ie);
  }, ee = u.useMemo(() => {
    if (o === "UTC" || !I.includes("T")) return { isAmbiguous: !1 };
    const [ie, we] = I.split("T");
    return za(ie, we);
  }, [I, o]), J = u.useMemo(() => {
    if (o === "UTC" || !U.includes("T")) return { isAmbiguous: !1 };
    const [ie, we] = U.split("T");
    return za(ie, we);
  }, [U, o]), V = u.useMemo(() => {
    if (!i || !K) return null;
    const ie = Oc(i, f, o, k), we = Oc(K, y, o, D);
    return ie === null || we === null || isNaN(ie) || isNaN(we) ? null : { startEpoch: ie, endEpoch: we, durationMs: we - ie };
  }, [i, f, K, y, o, k, D]), $e = u.useMemo(() => !V || V.durationMs <= 0 ? [] : bp(V.startEpoch, V.endEpoch), [V]), Le = u.useMemo(() => {
    if (!V || V.durationMs <= 0) return "0h";
    const ie = V.durationMs / (1e3 * 60 * 60);
    return ie >= 24 ? `${(ie / 24).toFixed(1)}d (${ie.toFixed(0)}h)` : `${ie.toFixed(1)}h`;
  }, [V]), ye = u.useMemo(() => {
    const ie = C.getUTCFullYear(), we = C.getUTCMonth(), Ke = new Date(Date.UTC(ie, we, 1)).getUTCDay(), Ve = new Date(Date.UTC(ie, we + 1, 0)).getUTCDate(), me = [];
    for (let fe = 0; fe < Ke; fe++) me.push(null);
    for (let fe = 1; fe <= Ve; fe++) me.push(`${ie}-${Yt(we + 1)}-${Yt(fe)}`);
    return me;
  }, [C]), ze = (ie) => {
    if (ie) {
      if (F(null), !i || i && d)
        c(ie), v("");
      else if (i && !d)
        if (ie < i)
          c(ie), v("");
        else {
          const we = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ie + "T00:00:00Z")).getTime() - we > sa) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const Ve = new Date(we + sa);
            v(`${Ve.getUTCFullYear()}-${Yt(Ve.getUTCMonth() + 1)}-${Yt(Ve.getUTCDate())}`);
          } else
            v(ie);
        }
    }
  }, be = (ie, we) => {
    F(we);
    const Ke = Date.now(), Ve = Ke - ie, me = Lr(Ve, o), fe = Lr(Ke, o);
    c(`${me.year}-${Yt(me.month)}-${Yt(me.day)}`), v(`${fe.year}-${Yt(fe.month)}-${Yt(fe.day)}`), p(`${Yt(me.hour)}:${Yt(me.minute)}:${Yt(me.second)}`), M(`${Yt(fe.hour)}:${Yt(fe.minute)}:${Yt(fe.second)}`), _(new Date(Date.UTC(me.year, me.month - 1, 1)));
  }, Ie = () => {
    if (ne(), !V || isNaN(V.startEpoch) || isNaN(V.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (V.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (V.durationMs > sa) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: I,
      end: U,
      startEpochMs: V.startEpoch,
      endEpochMs: V.endEpoch,
      durationMs: V.durationMs,
      timeMode: o
    }), t && t();
  }, tt = u.useMemo(() => {
    if (!h.trim()) return g;
    const ie = h.toLowerCase();
    return g.filter(
      (we) => (we.title || we.name || "").toLowerCase().includes(ie) || (we.startTime || "").includes(ie)
    );
  }, [g, h]);
  if (!e) return null;
  const it = o === "UTC";
  return Ls.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ie) => ie.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${it ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: it ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${it ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${it ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${E ? "active" : ""}`,
                onClick: () => b(!E),
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
          /* @__PURE__ */ s.jsx("span", { children: $e.map((ie) => `${ie.description} (${ie.labelBefore} ➔ ${ie.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${$ === "7d" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "3d" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "24h" ? "active" : ""}`,
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
            className: `btn-preset ${$ === "8h" ? "active" : ""}`,
            onClick: () => be(8 * 3600 * 1e3, "8h"),
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
          const we = ie.id || ie.startTime, Ke = ie.title || ie.name || "Untitled Mission", Ve = (ie.startTime || "").replace("T", " "), me = (ie.endTime || "").replace("T", " ");
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
                  onClick: (oe) => {
                    oe.stopPropagation(), R(ie);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (oe) => {
                    oe.stopPropagation(), re(ie);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (oe) => z(we, oe),
                  children: "✕"
                }
              )
            ] })
          ] }, we);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: C.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: ye.map((ie, we) => {
            if (!ie) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${we}`);
            const Ke = parseInt(ie.split("-")[2], 10), Ve = ie === i, me = ie === (d || i), fe = d || w, oe = i && fe && ie > i && ie < fe, Ce = O[ie], L = !!(Ce && Ce.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${Ve ? "start-edge" : ""} ${me ? "end-edge" : ""} ${oe ? "in-range" : ""} ${L ? "has-bookmark" : ""}`,
                onClick: () => ze(ie),
                onMouseEnter: () => !d && i && m(ie),
                onMouseLeave: () => m(null),
                title: L ? `${Ce.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: Ke }),
                  L && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (te) => {
                        te.stopPropagation(), b(!0), A(ie);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Ce.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Ce.length })
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
                ne(), p(ie), F(null);
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
                ne(), M(ie), F(null);
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
                className: k === 1 ? "active" : "",
                onClick: () => N(1),
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
                className: k === 2 ? "active" : "",
                onClick: () => N(2),
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
                className: D === 1 ? "active" : "",
                onClick: () => W(1),
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
                className: D === 2 ? "active" : "",
                onClick: () => W(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: V && V.durationMs > sa ? "#f43f5e" : "#22d3ee" }, children: Le }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: $e.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Ie, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Up = "extractor_incident_bookmarks_fallback", Ux = ["itb_studio_bookmarks", "itb_bookmarks", Up];
function Wx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [p, y] = u.useState(!1), [M, C] = u.useState(null), [_, w] = u.useState(""), m = u.useCallback(($) => {
    Ux.forEach((F) => {
      try {
        localStorage.setItem(F, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), g = u.useCallback(async () => {
    f(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const F = await $.json(), se = Array.isArray(F) ? F : [];
        i(se), m(se);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      f(!1);
    }
    try {
      const $ = localStorage.getItem(Up) || localStorage.getItem("itb_studio_bookmarks");
      $ && i(JSON.parse($));
    } catch {
    }
  }, [m]);
  if (u.useEffect(() => {
    e && g();
  }, [e, g]), !e) return null;
  const T = async () => {
    var ee, J, V, $e, Le, ye;
    if (!c.trim() || p) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ee = n == null ? void 0 : n.timeRange) != null && ee.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), F = (n == null ? void 0 : n.inPointMs) ?? 0, se = (n == null ? void 0 : n.outPointMs) ?? (((J = n == null ? void 0 : n.timeRange) == null ? void 0 : J.durationMs) || 0), ne = (n == null ? void 0 : n.playheadMs) ?? F, K = $ + F, I = $ + se, U = $ + ne, O = (n == null ? void 0 : n.selectedStationIds) || [], z = (n == null ? void 0 : n.selectedStationNames) || [], R = ((V = n == null ? void 0 : n.allStationIds) == null ? void 0 : V.length) > 0 ? n.allStationIds : O, re = {
      title: c.trim(),
      startTime: (($e = n == null ? void 0 : n.timeRange) == null ? void 0 : $e.start) || "",
      endTime: ((Le = n == null ? void 0 : n.timeRange) == null ? void 0 : Le.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: F,
      outPointMs: se,
      playheadMs: ne,
      inEpochMs: K,
      outEpochMs: I,
      playheadEpochMs: U,
      selectedStationIds: O,
      selectedStationNames: z,
      allStationIds: R,
      stationIds: O.length > 0 ? O : R,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const ze = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(re)
      });
      if (ze.ok) {
        const be = await ze.json(), tt = [{
          ...re,
          ...be.bookmark || {},
          inEpochMs: K,
          outEpochMs: I,
          playheadEpochMs: U,
          selectedStationIds: O,
          selectedStationNames: z,
          allStationIds: R,
          id: ((ye = be.bookmark) == null ? void 0 : ye.id) || be.id || `bm_${Date.now()}`
        }, ...a];
        i(tt), m(tt), d("");
      } else
        throw new Error(`Server returned ${ze.status}`);
    } catch (ze) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", ze);
      const Ie = [{
        ...re,
        inEpochMs: K,
        outEpochMs: I,
        playheadEpochMs: U,
        selectedStationIds: O,
        selectedStationNames: z,
        allStationIds: R,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Ie), m(Ie), d("");
    } finally {
      y(!1);
    }
  }, E = async ($, F) => {
    if (F.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const se = a.filter((ne) => (ne.id || ne.startTime) !== $);
    i(se), m(se);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (ne) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", ne);
    }
  }, b = ($, F) => {
    F.stopPropagation(), C($.id || $.startTime), w($.title || $.name || "");
  }, h = async ($, F) => {
    if (F && F.stopPropagation(), !_.trim()) return;
    const se = a.find((I) => (I.id || I.startTime) === $), ne = _.trim(), K = a.map(
      (I) => (I.id || I.startTime) === $ ? { ...I, title: ne, name: ne } : I
    );
    i(K), m(K), C(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...se, title: ne })
      });
    } catch (I) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", I);
    }
  }, A = ($) => {
    $.stopPropagation(), C(null);
  }, k = ($) => !$ || isNaN($) ? "--:--:--" : jt($, o), N = ($) => {
    const F = $.startTime || $.StartTime, se = $.endTime || $.EndTime;
    if (!F) return "--";
    const ne = String(F).replace("T", " ").substring(0, 19), K = se ? String(se).replace("T", " ").substring(0, 19) : ne;
    return `${ne} ➔ ${K}`;
  }, D = ($) => {
    let F = $.inEpochMs || $.InEpochMs, se = $.outEpochMs || $.OutEpochMs;
    if (!F || !se) {
      const ne = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), K = $.inPointMs ?? $.InPointMs, I = $.outPointMs ?? $.OutPointMs;
      ne && typeof K == "number" && typeof I == "number" && (K > 0 || I > 0) && (F = ne + K, se = ne + I);
    }
    if (F && se && !isNaN(F) && !isNaN(se) && F > 0) {
      const ne = k(F), K = k(se), I = Math.max(0, se - F), U = Math.floor(I / 6e4), O = Math.floor(U / 60), z = U % 60, R = O > 0 ? `${O}h ${z}m` : `${U}m`;
      return { timeText: `${ne} ➔ ${K}`, duration: R };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, W = ($) => {
    const F = $.selectedStationNames || [], se = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return F.length > 0 ? F.join(", ") : se.length > 0 ? se.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return Ls.createPortal(
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
        var U, O, z;
        const F = $.id || $.startTime, se = M === F, ne = D($), K = W($), I = ((U = $.allStationIds) == null ? void 0 : U.length) || ((O = $.selectedStationIds) == null ? void 0 : O.length) || ((z = $.stationIds) == null ? void 0 : z.length) || 0;
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
                se ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (R) => R.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: _,
                      onChange: (R) => w(R.target.value),
                      onKeyDown: (R) => {
                        R.key === "Enter" && h(F, R), R.key === "Escape" && A(R);
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
                        onClick: (R) => h(F, R),
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
                    /* @__PURE__ */ s.jsx("strong", { children: N($) })
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
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${K}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: K })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (R) => R.stopPropagation(), children: [
                !se && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (R) => b($, R),
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
                    onClick: (R) => E(F, R),
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
          F
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
function Wp() {
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
function zx(e) {
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
function Hx(e, t) {
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
function Kx({
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
  showWatermark: M = !0,
  directorPlan: C,
  onOverrideDisplay: _,
  onResetOverride: w,
  viewMode: m,
  onViewModeChange: g,
  onOpenFullscreen: T,
  isPipSwapped: E,
  onPipSwapChange: b,
  className: h = ""
}) {
  const A = u.useRef(null), k = u.useRef(null), N = u.useRef(null), D = u.useRef(r), W = u.useRef(r), $ = u.useRef(r), F = u.useRef(!1), se = u.useRef(null), ne = u.useRef(o), K = u.useRef(!1);
  D.current = r;
  const I = e == null ? void 0 : e.id, U = e && (e.hostname || e.name) || "", O = u.useMemo(() => {
    var Ue, Ze, ut, dt;
    const H = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ue = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ue.displays) || ((Ze = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ze.Displays) || ((ut = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : ut.Displays) || ((dt = e == null ? void 0 : e.topology) == null ? void 0 : dt.displays) || [];
    if (!Array.isArray(H) || H.length === 0) return [];
    const he = H.length > 1 && H.every((et) => (et.X ?? et.x ?? 0) === 0 && (et.Y ?? et.y ?? 0) === 0);
    let pe = 0;
    return H.map((et, ht) => {
      const St = et.Width || et.width || 1920, Mt = et.Height || et.height || 1080, Pt = he ? pe : et.X ?? et.x ?? ht * St, rn = he ? 0 : et.Y ?? et.y ?? 0;
      he && (pe += St);
      const _t = (et.displayId ?? et.DisplayId ?? `mon-${ht}`).toLowerCase(), zt = et.displayNumber ?? et.DisplayNumber ?? ht + 1, At = (et.displayName || et.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${zt}`, $n = !!(et.isPrimary ?? et.IsPrimary ?? ht === 0);
      return {
        ...et,
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
  }, [e]), z = O.length > 1, [R, re] = u.useState(() => {
    if (!z) return "mon-0";
    try {
      const H = localStorage.getItem("itb_solo_viewmode");
      if (H) return H;
    } catch {
    }
    return "canvas";
  }), J = z ? m !== void 0 ? m : R : "mon-0", V = u.useCallback((H) => {
    const he = typeof H == "function" ? H(J) : H;
    re(he);
    try {
      localStorage.setItem("itb_solo_viewmode", he);
    } catch {
    }
    g && g(he);
  }, [J, g]), [$e, Le] = u.useState(!1), ye = E !== void 0 ? E : $e, ze = u.useCallback((H) => {
    const he = typeof H == "function" ? H(ye) : H;
    Le(he), b && b(he);
  }, [ye, b]), be = u.useMemo(() => {
    const H = C || (e == null ? void 0 : e.directorPlan);
    if (!H || !H.segments || H.segments.length === 0) return null;
    const he = t + r;
    return H.segments.find((pe) => {
      const Ue = pe.startEpochMs ?? pe.StartEpochMs ?? 0, Ze = pe.endEpochMs ?? pe.EndEpochMs ?? 0;
      return he >= Ue && he <= Ze;
    }) || H.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t, r]), Ie = u.useMemo(() => {
    var H, he;
    if (!z) return "mon-0";
    if (J === "split" || J === "pip" || J === "canvas" || J === "all-displays") {
      const pe = (((H = O[0]) == null ? void 0 : H.displayId) ?? "mon-0").toLowerCase(), Ue = (((he = O[1]) == null ? void 0 : he.displayId) ?? "mon-1").toLowerCase();
      return ye ? Ue : pe;
    }
    return J !== "director" ? J.toLowerCase() : ((be == null ? void 0 : be.targetDisplayId) ?? (be == null ? void 0 : be.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [z, J, be, O, ye]), tt = u.useMemo(() => {
    var he;
    if (!z) return null;
    const H = O.find((pe) => (pe.displayId ?? pe.DisplayId ?? "").toLowerCase() !== Ie);
    return H ? (H.displayId ?? H.DisplayId).toLowerCase() : (((he = O[1]) == null ? void 0 : he.displayId) || "mon-1").toLowerCase();
  }, [z, O, Ie]), it = u.useMemo(() => {
    const H = O.find((pe) => (pe.displayId ?? "").toLowerCase() === (Ie || "").toLowerCase());
    if (H) return H.displayName || `Screen ${H.displayNumber || 1}`;
    if (Ie === "mon-0" || Ie === "0") return "Screen 1";
    if (Ie === "mon-1" || Ie === "1") return "Screen 2";
    const he = (Ie || "").match(/\d+/);
    if (he) {
      const pe = parseInt(he[0], 10);
      return `Screen ${(Ie || "").startsWith("mon-") ? pe + 1 : pe}`;
    }
    return (Ie || "Screen 1").toUpperCase();
  }, [O, Ie]), ie = u.useMemo(() => {
    const H = O.find((he) => (he.displayId ?? "").toLowerCase() === (tt || "").toLowerCase());
    return H ? H.displayName || `Screen ${H.displayNumber || 2}` : "Screen 2";
  }, [O, tt]), we = u.useMemo(() => J !== "director" && J !== "split" && J !== "pip" && J !== "canvas" ? !0 : !!((be == null ? void 0 : be.isManualOverride) ?? (be == null ? void 0 : be.IsManualOverride)), [J, be]), [Ke, Ve] = u.useState({}), me = u.useRef(null), [fe, oe] = u.useState({ width: 0, height: 0 }), Ce = u.useMemo(() => zx(O), [O]);
  u.useEffect(() => {
    if (!z || J !== "canvas" && J !== "all-displays" || o)
      return;
    const H = () => {
      const pe = me.current;
      if (!pe) return;
      const Ue = 48, Ze = 72, ut = Math.max(100, pe.clientWidth - Ue), dt = Math.max(100, pe.clientHeight - Ze), et = Ce.totalWidth || 1920, ht = Ce.totalHeight || 1080, St = et / ht;
      let Mt = ut, Pt = Mt / St;
      Pt > dt && (Pt = dt, Mt = Pt * St), oe({ width: Math.round(Mt), height: Math.round(Pt) });
    };
    H();
    const he = new ResizeObserver(H);
    return me.current && he.observe(me.current), () => he.disconnect();
  }, [z, J, Ce]);
  const L = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!z || J !== "canvas" && J !== "all-displays")
      return;
    let H = !0;
    const he = new AbortController(), pe = L;
    O.forEach((Ze, ut) => {
      const dt = (Ze.displayId ?? Ze.DisplayId ?? `mon-${ut}`).toLowerCase(), et = Dn.get(U, pe, dt);
      et ? Ve((ht) => ({ ...ht, [dt]: et })) : Dn.fetchFrame(U, pe, he.signal, dt).then((ht) => {
        H && ht && Ve((St) => ({ ...St, [dt]: ht }));
      });
    });
    const Ue = Dn.subscribe((Ze, ut, dt, et) => {
      Ze === U && ut === pe && et && H && Ve((ht) => ({ ...ht, [et.toLowerCase()]: dt }));
    });
    return () => {
      H = !1, he.abort(), Ue();
    };
  }, [z, J, O, U, L]);
  const te = u.useRef(Ie), Y = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), q = t + r, G = u.useMemo(() => Y.length === 0 ? !0 : Y.some((H) => {
    const he = (H.startEpochMs ?? H.startEpoch ?? 0) - 2e3, pe = (H.endEpochMs ?? H.endEpoch ?? 0) + 2e3;
    return q >= he && q <= pe;
  }), [Y, q]), Q = !G && Y.length > 0, [ce, qe] = u.useState("A"), [De, Xe] = u.useState(""), [at, Ge] = u.useState(""), [Tt, Rt] = u.useState(""), [Lt, Ot] = u.useState(null), [ot, yt] = u.useState(!1), [Je, Be] = u.useState(!1), [Nt, Dt] = u.useState(() => {
    if (!U) return null;
    const H = Math.round(t + r);
    return Dn.get(U, H, Ie) || null;
  }), [an, cn] = u.useState(null), wn = ce === "A" ? A : k, Pe = u.useCallback(() => {
    const H = Nl();
    A.current && (A.current.volume = H.volume, A.current.muted = ce !== "A" || H.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, ce === "A" && !H.isMuted && Ha(A.current)), k.current && (k.current.volume = H.volume, k.current.muted = ce !== "B" || H.isMuted, k.current.defaultPlaybackRate = i, k.current.playbackRate = i, ce === "B" && !H.isMuted && Ha(k.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [ce, i]);
  u.useEffect(() => {
    const H = (he) => {
      he.detail && (A.current && (A.current.volume = he.detail.volume), k.current && (k.current.volume = he.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", H), () => window.removeEventListener("itb-audio-state-changed", H);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!I || !U) return;
    if (o) {
      ne.current = !0;
      return;
    }
    const H = ne.current;
    ne.current = o;
    let he = !0;
    const pe = new AbortController(), Ue = Math.round(t + r), Ze = Dn.get(U, Ue, Ie);
    if (Ze) {
      Dt(Ze);
      return;
    }
    const dt = setTimeout(() => {
      he && Dn.fetchFrame(U, Ue, pe.signal, Ie).then((ht) => {
        he && ht && Dt(ht);
      });
    }, H ? 25 : 35), et = Dn.subscribe((ht, St, Mt, Pt) => {
      ht === U && St === Ue && (!Pt || Pt === Ie) && he && Dt(Mt);
    });
    return () => {
      he = !1, clearTimeout(dt), pe.abort(), et();
    };
  }, [I, U, t, r, o, ot, Ie]), u.useEffect(() => {
    if (!z || J !== "split" && J !== "pip" || !tt || o) {
      cn(null);
      return;
    }
    let H = !0;
    const he = new AbortController(), pe = Math.round(t + r), Ue = Dn.get(U, pe, tt);
    if (Ue) {
      cn(Ue);
      return;
    }
    const Ze = setTimeout(() => {
      H && Dn.fetchFrame(U, pe, he.signal, tt).then((dt) => {
        H && dt && cn(dt);
      });
    }, 40), ut = Dn.subscribe((dt, et, ht, St) => {
      dt === U && et === pe && (!St || St === tt) && H && cn(ht);
    });
    return () => {
      H = !1, clearTimeout(Ze), he.abort(), ut();
    };
  }, [z, J, tt, I, U, t, r]);
  const Oe = u.useCallback((H, he = Ie) => {
    const pe = Math.round(t), Ue = Math.round(t + n), Ze = Math.min(Ue, Math.max(pe, Math.round(t + H)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(U)}&startEpoch=${pe}&endEpoch=${Ue}&seekEpoch=${Ze}&displayId=${encodeURIComponent(he)}&_t=${Date.now()}`;
  }, [t, n, U, Ie]);
  u.useEffect(() => {
    if (!(!I || !U))
      if (o && G) {
        const H = D.current;
        W.current = H, $.current = H, F.current = !1;
        const he = Oe(H, Ie);
        yt(!1), Be(!0), qe("A"), Xe(he), Ge(""), Ot(null), Rt((J === "split" || J === "pip") && tt ? Oe(H, tt) : "");
      } else o || (se.current && clearTimeout(se.current), F.current = !1, Xe(""), Ge(""), Rt(""), Ot(null), yt(!1), Be(!1), A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause());
  }, [o, I, U, G, Oe, Ie, J, tt]), u.useEffect(() => {
    if (te.current !== Ie && (te.current = Ie, o && G)) {
      const H = D.current;
      W.current = H;
      const he = Oe(H, Ie);
      yt(!1), Be(!0), qe("A"), Xe(he), Ge("");
    }
  }, [Ie, o, G, Oe]), u.useEffect(() => {
    if (!I || !U) return;
    const H = Math.abs(r - $.current);
    if (!o || H < 15) {
      $.current = r;
      return;
    }
    return F.current = !0, $.current = r, W.current = r, A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause(), yt(!1), Be(!0), se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      if (!G) {
        Xe(""), Ge(""), Rt(""), Be(!1), F.current = !1;
        return;
      }
      const he = D.current, pe = Oe(he, Ie);
      qe("A"), Xe(pe), Ge(""), Ot(null), (J === "split" || J === "pip") && tt && Rt(Oe(he, tt));
    }, 75), () => {
      se.current && clearTimeout(se.current);
    };
  }, [r, o, I, U, G, Oe, Ie, J, tt]), u.useEffect(() => {
    if (!o || !ot || Y.length === 0) return;
    const H = t + D.current, he = Y.map((pe) => ({
      start: pe.startEpochMs ?? pe.startEpoch ?? 0,
      end: pe.endEpochMs ?? pe.endEpoch ?? 0
    })).filter((pe) => pe.start > H + 500).sort((pe, Ue) => pe.start - Ue.start)[0];
    if (he && (!Lt || Lt.start !== he.start)) {
      const pe = he.start - t;
      if (pe < v) {
        const Ue = Oe(pe, Ie);
        Ot({ start: he.start, ms: pe }), ce === "A" ? Ge(Ue) : Xe(Ue);
      }
    }
  }, [o, ot, r, t, v, Y, Lt, ce, Oe, Ie]);
  const st = u.useCallback(() => {
    if (Lt) {
      const H = ce === "A" ? "B" : "A", he = H === "A" ? A : k;
      qe(H), W.current = Lt.ms, $.current = Lt.ms, Ot(null), he.current && he.current.play().then(() => {
        Pe();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Lt, ce, Pe, f, d, l, a]), ae = u.useCallback(() => {
    const H = wn.current;
    if (!H || F.current || !o || K.current) return;
    const he = H.currentTime * 1e3, pe = Math.round(W.current + he);
    if (y && y.length > 0) {
      const Ue = t + pe, Ze = y.find((ut) => Ue >= ut.startEpochMs && Ue < ut.endEpochMs);
      if (Ze) {
        K.current = !0;
        const ut = Math.round(Ze.endEpochMs - t) + 10;
        l(ut), setTimeout(() => {
          K.current = !1;
        }, 150);
        return;
      }
    }
    if (pe >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    $.current = pe, l(pe);
  }, [wn, o, t, y, v, f, d, l, a]), nt = Je && o && !Q;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${J} ${h}`, children: [
    z && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (H) => H.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "director" ? "active" : ""}`,
          onClick: () => V("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "canvas" ? "active" : ""}`,
          onClick: () => V("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "split" ? "active" : ""}`,
          onClick: () => V("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${J === "pip" ? "active" : ""}`,
          onClick: () => V("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      O.map((H, he) => {
        const pe = (H.displayId ?? `mon-${he}`).toLowerCase(), Ue = H.displayNumber ?? he + 1, Ze = H.displayName || `Screen ${Ue}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${J === pe ? "active" : ""}`,
            onClick: () => V(pe),
            title: `Pin directly to ${Ze}`,
            children: [
              "🖥️ ",
              Ue
            ]
          },
          pe
        );
      }),
      J === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          O.map((H, he) => {
            const pe = (H.displayId ?? `mon-${he}`).toLowerCase(), Ue = H.displayNumber ?? he + 1, Ze = H.displayName || `Screen ${Ue}`, ut = Ie === pe;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${ut ? "active" : ""} ${we && ut ? "is-override" : ""}`,
                onClick: () => {
                  _ == null || _(I, t + r, pe);
                },
                title: `Punch ${Ze} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ue
                  ] }),
                  ut && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: we ? "✋" : "⚡" })
                ]
              },
              `punch-${pe}`
            );
          }),
          we && w && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                w == null || w(I, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    z && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${we ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: J === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : J === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : J === "pip" ? `🪟 PiP MODE: ${it.toUpperCase()} (HERO)` : `${we ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${it.toUpperCase()}` }),
      we && J === "director" && w && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => w == null ? void 0 : w(I, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    De && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: De,
        className: "feed-video-element",
        style: {
          opacity: ot && ce === "A" ? 1 : 0,
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
          Pe(), o && ce === "A" && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ce === "A" && (F.current = !1, yt(!0), Be(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          ce === "A" && Be(!0);
        },
        onTimeUpdate: () => {
          var H;
          ce === "A" && (!ot && ((H = A.current) == null ? void 0 : H.currentTime) > 0 && (F.current = !1, yt(!0), Be(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), ae());
        },
        onError: () => {
          ce === "A" && (F.current = !1, Be(!1), yt(!1));
        },
        onEnded: () => {
          ce === "A" && st();
        }
      }
    ),
    at && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: k,
        src: at,
        className: "feed-video-element",
        style: {
          opacity: ot && ce === "B" ? 1 : 0,
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
          Pe(), o && ce === "B" && k.current && k.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ce === "B" && (F.current = !1, yt(!0), Be(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i));
        },
        onWaiting: () => {
          ce === "B" && Be(!0);
        },
        onTimeUpdate: () => {
          var H;
          ce === "B" && (!ot && ((H = k.current) == null ? void 0 : H.currentTime) > 0 && (F.current = !1, yt(!0), Be(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i)), ae());
        },
        onError: () => {
          ce === "B" && (F.current = !1, Be(!1), yt(!1));
        },
        onEnded: () => {
          ce === "B" && st();
        }
      }
    ),
    J !== "split" && J !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: ot ? 0 : 2 },
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
    J === "split" && z && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
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
    J === "pip" && z && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (H) => {
          H.stopPropagation(), ze((he) => !he);
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
    (J === "canvas" || J === "all-displays") && z && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: me, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: fe.width ? `${fe.width}px` : "92%",
            height: fe.height ? `${fe.height}px` : "auto",
            aspectRatio: `${Ce.totalWidth} / ${Ce.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: O.map((H, he) => {
            const pe = Hx(H, Ce), Ue = (H.displayId ?? H.DisplayId ?? `mon-${he}`).toLowerCase(), Ze = Ke[Ue] || (Ue === Ie ? Nt : null), ut = !!(H.isPrimary ?? H.IsPrimary);
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
                  dt.stopPropagation(), T ? T(Ue) : V(Ue);
                },
                title: `Display ${he + 1} (${H.width || 1920}x${H.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      ut ? "★ " : "",
                      "🖥 ",
                      he + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: H.displayName || H.DisplayName || Ue.toUpperCase() }),
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
                          dt.stopPropagation(), T(Ue);
                        },
                        title: `Open Display ${he + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Ze && Ze !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Ze,
                      className: "canvas-frame-img",
                      alt: Ue
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      H.displayName || Ue.toUpperCase(),
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
    J === "director" && be && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
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
    z && J !== "canvas" && /* @__PURE__ */ s.jsx(
      Rp,
      {
        displays: O,
        activeDisplayId: Ie,
        mode: we ? "MANUAL" : "AUTO",
        activeTimeRange: be ? `${jt(be.startEpochMs ?? be.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${jt(be.endEpochMs ?? be.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (H) => {
          _ && _(I, t + r, H), V(H);
        }
      }
    ),
    M && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      U
    ] }) })
  ] });
}
const Ui = 2200, Wi = 400;
function Vx({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + xa, f = e - v;
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
    const c = Dp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = Op(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(Mo.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const Yx = [
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
function zp({ isOpen: e, onClose: t }) {
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: Yx.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
function Xx({
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
  viewportStartMs: M = 0,
  onViewportStartChange: C,
  playheadMs: _ = 0,
  playheadEpochMs: w = 0,
  setPlayheadMs: m,
  inPointMs: g = 0,
  setInPointMs: T,
  outPointMs: E = 36e5,
  setOutPointMs: b,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: k,
  isPlaying: N,
  setIsPlaying: D,
  isLooping: W = !0,
  setIsLooping: $,
  playbackSpeed: F,
  setPlaybackSpeed: se,
  keystrokeMode: ne = "BURN_IN",
  onChangeKeystrokeMode: K,
  keystrokes: I = [],
  showRulerKeystrokes: U = !1,
  onToggleRulerKeystrokes: O,
  directorPlan: z,
  onOverrideDisplay: R,
  onSplitDirectorSegment: re,
  onChangeDirectorSegmentDisplay: ee,
  onResetDirectorSegmentToAuto: J
}) {
  var an, cn, wn;
  const [V, $e] = u.useState(!1), Le = N !== void 0 ? N : V, ye = u.useCallback((Pe) => {
    const Oe = typeof Pe == "function" ? Pe(Le) : Pe;
    D ? D(Oe) : $e(Oe), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Oe } }));
  }, [Le, D]), [ze, be] = u.useState(!0), Ie = W !== void 0 ? W : ze, tt = $ || be, [it, ie] = u.useState(1), we = F !== void 0 ? F : it, Ke = se || ie, [Ve, me] = u.useState(null), [fe, oe] = u.useState(!1), [Ce, L] = u.useState(A), te = ((an = t == null ? void 0 : t.displays) == null ? void 0 : an.length) > 1 || ((wn = (cn = t == null ? void 0 : t.topology) == null ? void 0 : cn.displays) == null ? void 0 : wn.length) > 1, [Y, q] = u.useState(() => {
    if (!te) return "mon-0";
    if (n) return n;
    try {
      const Pe = localStorage.getItem("itb_spotlight_viewmode");
      if (Pe) return Pe;
    } catch {
    }
    return "canvas";
  }), G = u.useCallback((Pe) => {
    q((Oe) => {
      const st = typeof Pe == "function" ? Pe(Oe) : Pe;
      try {
        localStorage.setItem("itb_spotlight_viewmode", st);
      } catch {
      }
      return st;
    });
  }, []), [Q, ce] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!te) {
        q("mon-0");
        return;
      }
      if (n)
        q(n);
      else
        try {
          const Pe = localStorage.getItem("itb_spotlight_viewmode");
          q(Pe || "canvas");
        } catch {
          q("canvas");
        }
    }
  }, [e, n, te, t == null ? void 0 : t.id]);
  const qe = u.useRef(null), De = u.useRef(d);
  De.current = d;
  const Xe = u.useRef(M);
  Xe.current = M;
  const at = u.useRef(c);
  at.current = c;
  const Ge = u.useRef(t && t.id);
  u.useEffect(() => {
    var Pe, Oe, st;
    t && t.id && Ge.current !== t.id && (Ge.current = t.id, Ke(1), ((Pe = t.displays) == null ? void 0 : Pe.length) > 1 || ((st = (Oe = t.topology) == null ? void 0 : Oe.displays) == null ? void 0 : st.length) > 1 || G("mon-0"));
  }, [t, Ke]);
  const Tt = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const Pe = qe.current;
    if (!Pe || !v || !C) return;
    const Oe = (st) => {
      st.preventDefault(), st.stopPropagation();
      const ae = st.ctrlKey || st.shiftKey, nt = De.current, H = Xe.current, he = at.current || 36e5;
      if (ae) {
        const pe = Math.abs(st.deltaX) > Math.abs(st.deltaY) ? st.deltaX : st.deltaY;
        if (pe === 0) return;
        const Ue = he / nt, Ze = Math.max(0, he - Ue), ut = Ue * 0.08 * (pe > 0 ? 1 : -1), dt = Math.max(0, Math.min(Ze, H + ut));
        Xe.current = dt, C(dt);
      } else {
        if (st.deltaY === 0) return;
        const Ue = st.deltaY < 0 ? 1.25 : 0.8, Ze = Pe.getBoundingClientRect(), ut = Ze.left + 150, dt = Ze.right - 58, et = Math.max(100, dt - ut);
        let ht = 0.5;
        st.clientX >= ut && st.clientX <= dt ? ht = (st.clientX - ut) / et : Ze.width > 0 && (ht = Math.max(0, Math.min(1, (st.clientX - Ze.left) / Ze.width)));
        const St = Math.max(32, he / 2e3), Mt = Math.max(1, Math.min(St, Math.round(nt * Ue * 100) / 100));
        if (Mt === nt) return;
        const Pt = he / nt, rn = he / Mt, zt = H + ht * Pt - ht * rn, dn = Math.max(0, he - rn), Gt = Math.max(0, Math.min(dn, zt));
        De.current = Mt, Xe.current = Gt, C(Gt), v(Mt);
      }
    };
    return Pe.addEventListener("wheel", Oe, { passive: !1, capture: !0 }), () => Pe.removeEventListener("wheel", Oe, { capture: !0 });
  }, [e, t, v, C]);
  const Rt = u.useCallback(() => {
    f ? f() : (Xe.current = 0, De.current = 1, C == null || C(0), v == null || v(1));
  }, [f, C, v]), Lt = u.useCallback((Pe, Oe) => {
    if (p)
      p(Pe, Oe);
    else {
      const st = Math.max(1e3, Oe - Pe), ae = Math.max(500, st * 0.05), nt = Math.max(0, Pe - ae), he = Math.min(c, Oe + ae) - nt, pe = Math.max(32, c / 2e3), Ue = Math.max(1, Math.min(pe, Number((c / he).toFixed(1)))), Ze = c / Ue, ut = Math.max(0, Math.min(nt, c - Ze));
      Xe.current = ut, De.current = Ue, C == null || C(ut), v == null || v(Ue);
    }
  }, [p, c, C, v]), Ot = u.useCallback((Pe, Oe = "center") => {
    if (y)
      y(Pe, Oe);
    else {
      if (Pe == null) return;
      const st = De.current || 1, ae = c / Math.max(1, st), nt = Oe === "start" ? ae / 4 : ae * 0.75, H = Math.max(0, Math.min(Pe - nt, c - ae));
      Xe.current = H, C == null || C(H);
    }
  }, [y, c, C]), ot = u.useCallback(() => {
    ye((Pe) => !Pe);
  }, [ye]), yt = u.useCallback(async () => {
    var ae;
    if (!t || Math.abs(E - g) < 1e3) return;
    const Pe = (ne || "NONE").toUpperCase().replace("-", "_");
    let Oe;
    Pe === "NONE" || Pe === "OFF" ? Oe = "None" : Pe === "CAPTION" ? Oe = "Caption" : Oe = "BurnIn";
    const st = {
      createdBy: Wp(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(g),
      outEpochMs: a + Math.round(E),
      keystrokeMode: Oe,
      layoutMode: te ? Y : "mon-0",
      targetDisplayId: !te || Y === "mon-0" || Y === "mon-1" || Y.startsWith("mon-") ? te ? Y : "mon-0" : null,
      isPipSwapped: Q,
      directorSegments: te ? (z == null ? void 0 : z.segments) || ((ae = t == null ? void 0 : t.directorPlan) == null ? void 0 : ae.segments) || [] : []
    };
    try {
      k ? await k(st) : (await fetch("/api/v1/extractor-advanced/jobs", {
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
  }, [t, g, E, a, k, ne, Y, Q, z]);
  u.useEffect(() => {
    if (!e || !t) return;
    const Pe = (Oe) => {
      if ((Oe.ctrlKey || Oe.metaKey) && (Oe.key === "e" || Oe.key === "E")) {
        Oe.preventDefault(), yt();
        return;
      }
      if (Oe.key === "?" || Oe.shiftKey && Oe.code === "Slash") {
        Oe.preventDefault(), oe((st) => !st);
        return;
      }
      if (fe) {
        Oe.key === "Escape" && oe(!1);
        return;
      }
      if (Oe.key === "Escape" || Oe.code === "Escape") {
        Oe.preventDefault(), Oe.stopPropagation(), o == null || o();
        return;
      }
      if (Oe.code === "Space") {
        Oe.preventDefault(), ot();
        return;
      }
      if (Oe.code === "KeyI") {
        Oe.preventDefault(), T(Math.max(0, Math.min(_, E - 1e3)));
        return;
      }
      if (Oe.code === "KeyO") {
        Oe.preventDefault(), b(Math.min(c, Math.max(_, g + 1e3)));
        return;
      }
      if (Oe.code === "ArrowLeft" || Oe.code === "ArrowRight") {
        Oe.preventDefault(), ye(!1);
        const st = Oe.code === "ArrowLeft";
        let ae;
        if (Oe.ctrlKey || Oe.metaKey)
          ae = 33;
        else if (Oe.shiftKey)
          ae = 5e3;
        else {
          const nt = Math.max(1, d);
          ae = Math.max(33, Math.round(1e3 / nt));
        }
        m((nt) => {
          const H = st ? nt - ae : nt + ae;
          return Math.max(0, Math.min(c, H));
        });
        return;
      }
      if (Oe.key === "ArrowDown") {
        Oe.preventDefault();
        const st = r.findIndex((ae) => ae.id === t.id);
        if (st !== -1) {
          const ae = (st + 1) % r.length;
          l(r[ae].id);
        }
        return;
      }
      if (Oe.key === "ArrowUp") {
        Oe.preventDefault();
        const st = r.findIndex((ae) => ae.id === t.id);
        if (st !== -1) {
          const ae = (st - 1 + r.length) % r.length;
          l(r[ae].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", Pe, { capture: !0 }), () => window.removeEventListener("keydown", Pe, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    _,
    g,
    E,
    c,
    d,
    T,
    b,
    m,
    yt,
    ot,
    ye,
    fe
  ]);
  const Je = r.findIndex((Pe) => Pe.id === (t && t.id)), Be = r[Je - 1], Nt = r[Je + 1];
  if (!e || !t) return null;
  const Dt = w > 0 ? w : Math.round(a + _);
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
            uh(E - g),
            " (",
            jt(a + g, i),
            " → ",
            jt(a + E, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          Kx,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: _,
            setPlayheadMs: m,
            isPlaying: Le,
            setIsPlaying: ye,
            playbackSpeed: we,
            timeMode: i,
            inPointMs: g,
            outPointMs: E,
            isLooping: Ie,
            recordingSegments: h,
            globalGaps: Ce,
            showWatermark: !0,
            directorPlan: z || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: R,
            onResetOverride: J,
            viewMode: Y,
            onViewModeChange: G,
            isPipSwapped: Q,
            onPipSwapChange: ce
          }
        ),
        /* @__PURE__ */ s.jsx(
          Vx,
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
              onClick: (Pe) => {
                Pe.preventDefault(), Pe.stopPropagation(), o == null || o();
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
              onClick: () => oe(!0),
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
              disabled: !Be,
              onClick: () => Be && l(Be.id),
              title: Be ? `Previous: ${Be.displayName || Be.roleAlias || Be.hostname || Be.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Je + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Le ? "is-playing-dimmed" : ""}`, ref: qe, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: uh(E - g) })
            ] }),
            (() => {
              const Pe = Y === "mon-0" ? "SCREEN 1" : Y === "mon-1" ? "SCREEN 2" : Y.startsWith("mon-") ? `SCREEN ${parseInt(Y.slice(4)) + 1}` : Y.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: yt,
                  title: `Export Selected Cut Window as ${Pe} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: Y === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${Pe})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            Uc,
            {
              activeStationId: t.id,
              isPlaying: Le,
              setIsPlaying: ot,
              isLooping: Ie,
              setIsLooping: tt,
              playbackSpeed: we,
              onChangeSpeed: Ke,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: g,
              setInPointMs: T,
              outPointMs: E,
              setOutPointMs: b,
              onSetInPoint: () => T(Math.max(0, Math.min(_, E - 1e3))),
              onSetOutPoint: () => b(Math.min(c, Math.max(_, g + 1e3))),
              onStepFrameBackward: () => {
                ye(!1), m((Pe) => Math.max(0, Pe - 33));
              },
              onStepFrameForward: () => {
                ye(!1), m((Pe) => Math.min(c, Pe + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: jt(a + _, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Fp,
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
            viewportStartMs: M,
            onViewportStartChange: C,
            playheadMs: _,
            setPlayheadMs: (Pe) => {
              ye(!1), m(Pe);
            },
            inPointMs: g,
            setInPointMs: T,
            outPointMs: E,
            setOutPointMs: b,
            recordingSegments: h,
            onExport: yt,
            onEstimateLoaded: (Pe) => {
              Pe != null && Pe.removedGlobalGaps && L(Pe.removedGlobalGaps);
            },
            keystrokeMode: ne,
            onChangeKeystrokeMode: K,
            keystrokes: I,
            showKeystrokes: U,
            showRulerKeystrokes: U,
            onToggleRulerKeystrokes: O,
            onSplitDirectorSegment: re,
            onChangeDirectorSegmentDisplay: ee,
            onResetDirectorSegmentToAuto: J
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        zp,
        {
          isOpen: fe,
          onClose: () => oe(!1)
        }
      )
    ] }),
    document.body
  );
}
function Hp({ isGlobalHost: e = !1 }) {
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
          const A = await h.json(), k = Array.isArray(A) ? A : [];
          n(k), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: k }));
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
    const k = () => {
      if (!h) return;
      let D = 2500;
      typeof document < "u" && document.hidden ? D = 3e4 : i.current > 0 && (D = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), k();
      }, D);
    }, N = () => {
      !document.hidden && h && (clearTimeout(A), i.current = 0, p().then(k));
    };
    return document.addEventListener("visibilitychange", N), p().then(k), () => {
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
  const M = t.filter((h) => h.status === "Processing" || h.status === "Queued"), C = t.filter((h) => h.status === "Completed" || h.isCompleted), _ = () => {
    d((h) => {
      const A = !h;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String(A));
      } catch {
      }
      return A;
    });
  }, w = () => {
    f(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, m = (h, A) => {
    A.stopPropagation(), !(!h || r.has(h)) && (l((k) => new Set(k).add(h)), setTimeout(() => {
      n((k) => {
        const N = k.filter((D) => (D.jobId || D.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: N })), N;
      }), l((k) => {
        const N = new Set(k);
        return N.delete(h), N;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((k) => console.warn("[ExportJobMonitor] Dismiss failed:", k)));
  }, g = async (h, A) => {
    A.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), p();
    } catch (k) {
      console.warn("[ExportJobMonitor] Bookmark failed:", k);
    }
  }, T = (h, A) => {
    A.stopPropagation();
    const k = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    k && (navigator.clipboard.writeText(k), alert(`UNC Directory Path copied to clipboard:
${k}`));
  }, E = (h) => {
    const A = h.jobId || h.id, k = `/api/v1/extractor-advanced/jobs/${A}/download`, N = document.createElement("a");
    N.href = k, N.download = h.fileName || `archive_${A}.tar`, document.body.appendChild(N), N.click(), document.body.removeChild(N), setTimeout(p, 1e3);
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
          className: `export-floating-hud ${M.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${M.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: M.length > 0 ? `EXPORTS: ${M.length} PACKAGING` : `${C.length} ARCHIVE${C.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${M.length > 0 ? "" : "ready"}`, children: M.length > 0 ? `${M[0].progressPercent}%` : "DOWNLOAD" })
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
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: w, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const A = h.status === "Completed" || h.isCompleted, k = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", D = h.jobId || h.id, W = r.has(D), $ = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
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
                      onClick: (F) => m(D, F),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                (h.notes || h.Notes) && /* @__PURE__ */ s.jsxs("div", { className: "job-notes-callout", title: `Export Note: ${h.notes || h.Notes}`, children: [
                  /* @__PURE__ */ s.jsx("span", { className: "notes-icon", children: "📝" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-label", children: "NOTE:" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-body", children: h.notes || h.Notes })
                ] }),
                N && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
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
                        onClick: (F) => g(D, F),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (F) => T(h, F),
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
                      onClick: () => E(h),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                k && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  h.errorMessage || h.error || "Export failed"
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
function Gx({
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
function Qx({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 1920, a = r.canvasHeight || 1080, i = o / a;
  let c;
  Math.abs(i - 32 / 9) < 0.15 ? c = "32:9 Dual Screen" : Math.abs(i - 21 / 9) < 0.15 ? c = "21:9 Ultrawide" : Math.abs(i - 16 / 10) < 0.15 ? c = "16:10 WUXGA" : Math.abs(i - 4 / 3) < 0.15 ? c = "4:3 Standard" : Math.abs(i - 16 / 9) < 0.15 ? c = "16:9 Broadcast" : c = `${Math.round(i * 100) / 100}:1 Custom`;
  const d = (k) => {
    const N = Math.round(k * i);
    return N - N % 2;
  }, v = (k, N) => {
    const D = Math.round(k * N / 2073600 * 6 * 10) / 10, W = Math.round(D * 60 / 8 * 10) / 10;
    return `~${D} Mbps (~${W} MB/min)`;
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
  ], [p, y] = u.useState("BurnIn"), [M, C] = u.useState(r.resolution || "NATIVE"), [_, w] = u.useState(""), [m, g] = u.useState(!1);
  if (!e) return null;
  const T = async () => {
    g(!0);
    try {
      await n(p, M, _), t();
    } finally {
      g(!1);
    }
  }, E = (r.layout || "DIRECTOR").toUpperCase(), b = r.stationsCount || 1, h = r.audioSegmentsCount || 1, A = f.find((k) => k.id === M) || f[0];
  return Ls.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (k) => k.stopPropagation(), children: [
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
              E,
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
              A.res,
              " (",
              A.badge,
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
            /* @__PURE__ */ s.jsx("span", { className: "value", children: h > 1 ? `DYNAMIC ROUTING (${h} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK & DISPLAY TOPOLOGY HUD)" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "UTC WALL CLOCK:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value enabled", children: [
              "PERMANENT (BURNED-IN AT ",
              Bg(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((k) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${M === k.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: k.id,
              checked: M === k.id,
              onChange: () => C(k.id)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "quality-card-body", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "quality-card-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "quality-badge", children: k.badge }),
              /* @__PURE__ */ s.jsx("span", { className: "quality-res", children: k.res })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-metric", children: k.bitrate }),
            /* @__PURE__ */ s.jsx("div", { className: "quality-desc", children: k.desc })
          ] })
        ] }, k.id)) }),
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
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "MISSION / FORENSIC EXPORT NOTE (OPTIONAL)" }),
        /* @__PURE__ */ s.jsxs("div", { className: "export-notes-wrapper", children: [
          /* @__PURE__ */ s.jsx(
            "textarea",
            {
              className: "export-notes-input",
              placeholder: "Add operational notes or investigation context for team members (e.g. Incident #104 review, Shift handover)...",
              value: _,
              onChange: (k) => w(k.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            _.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: m, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: T, disabled: m, children: m ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${A.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function Jx(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, v] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const p = u.useCallback(async () => {
    if (isNaN(e)) return;
    const C = e + t;
    v(!0);
    try {
      const _ = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(C),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), w = await fetch(`/api/v1/extractor-advanced/stations?${_.toString()}`);
      if (w.ok) {
        const m = w.headers.get("content-type");
        if (m && m.includes("application/json")) {
          const g = await w.json(), E = (Array.isArray(g) ? g : g.stations || g.items || []).filter((b) => (b.recordingsCount || (b.segments ? b.segments.length : 0)) > 0).map((b) => {
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
            if (!b || b.length === 0) return E;
            const h = new Map(b.map((N) => [N.id, N]));
            let A = b.length !== E.length;
            const k = E.map((N) => {
              const D = h.get(N.id);
              return D ? D.isOnline === N.isOnline && D.displayName === N.displayName && D.roleAlias === N.roleAlias && D.feedSpec === N.feedSpec && D.recordingsCount === N.recordingsCount && D.fps === N.fps ? D : (A = !0, { ...D, ...N }) : (A = !0, N);
            });
            return A ? k : b;
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
    const C = /* @__PURE__ */ new Set();
    return o.forEach((_) => {
      _.id && C.add(_.id), _.hostname && C.add(_.hostname);
    }), Array.from(C).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!y || isNaN(e)) {
      c({});
      return;
    }
    let C = !0;
    return (async () => {
      try {
        const w = e + t, m = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${w}`);
        if (m.ok && C) {
          const g = await m.json() || {}, T = {};
          (f.current || []).forEach((E) => {
            const b = g[E.id] || g[E.hostname] || g[E.displayName] || [];
            T[E.id] = b, T[E.hostname] = b;
          }), Object.keys(g).forEach((E) => {
            T[E] || (T[E] = g[E]);
          }), c(T);
        }
      } catch {
        C && c({});
      }
    })(), () => {
      C = !1;
    };
  }, [y, e, t]);
  const M = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let C = 1 / 0, _ = -1 / 0;
    o.forEach((T) => {
      (i[T.id] || i[T.hostname] || T.segments || []).forEach((b) => {
        const h = b.startEpochMs ?? b.startEpoch ?? 0, A = b.endEpochMs ?? b.endEpoch ?? 0;
        h > 0 && h < C && (C = h), A > 0 && A > _ && (_ = A);
      });
    });
    let w = 1 / 0, m = -1 / 0;
    l && (i[l] || []).forEach((E) => {
      const b = E.startEpochMs ?? E.startEpoch ?? 0, h = E.endEpochMs ?? E.endEpoch ?? 0;
      b > 0 && b < w && (w = b), h > 0 && h > m && (m = h);
    });
    const g = (T) => T === 1 / 0 || T === -1 / 0 ? null : Math.max(0, Math.min(t, T - e));
    return {
      globalFirstMs: g(C),
      globalLastMs: g(_),
      currentFirstMs: g(w),
      currentLastMs: g(m)
    };
  }, [o, i, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: i,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: p,
    movieBoundaries: M
  };
}
function Zx({
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
  const [p, y] = u.useState(i), [M, C] = u.useState(c), [_, w] = u.useState(d), [m, g] = u.useState(v), T = u.useRef(null), E = u.useRef(null), b = o || l, h = u.useMemo(() => b ? a[b.id] || b.segments || [] : [], [b, a]), A = h.some((W) => {
    const $ = W.startEpochMs ?? W.startEpoch ?? 0, F = W.endEpochMs ?? W.endEpoch ?? 0, se = e + p;
    return se >= $ && se <= F;
  }), k = !!(!f && b && A);
  u.useEffect(() => {
    y((W) => W < t ? t : W > n ? (C(!1), n) : W);
  }, [t, n]);
  const N = u.useCallback((W) => {
    T.current || (T.current = W);
    const $ = (W - T.current) * m, F = Math.min($, 250 * m);
    T.current = W, y((se) => {
      let ne = se + F;
      if (r && r.length > 0) {
        const K = e + ne, I = r.find((U) => K >= U.startEpochMs && K < U.endEpochMs);
        I && (ne = I.endEpochMs - e);
      }
      return ne >= n && (_ ? ne = t : (C(!1), ne = n)), ne;
    }), M && (!k || f) && (E.current = requestAnimationFrame(N));
  }, [M, _, t, n, r, e, k, m, f]);
  u.useEffect(() => (M && (!k || f) ? (T.current = performance.now(), E.current = requestAnimationFrame(N)) : (E.current && cancelAnimationFrame(E.current), T.current = null), () => {
    E.current && cancelAnimationFrame(E.current);
  }), [M, N, k, f]);
  const D = u.useCallback(() => {
    if (M)
      C(!1);
    else {
      let W = p;
      const $ = e + W, F = r == null ? void 0 : r.find((se) => $ >= se.startEpochMs && $ < se.endEpochMs);
      if (F)
        W = F.endEpochMs - e;
      else if (b && !A) {
        const se = h.map((ne) => ({ start: ne.startEpochMs ?? ne.startEpoch ?? 0, end: ne.endEpochMs ?? ne.endEpoch ?? 0 })).filter((ne) => ne.start > $).sort((ne, K) => ne.start - K.start)[0];
        se && (W = se.start - e);
      }
      W !== p && y(W), C(!0);
    }
  }, [M, p, e, r, b, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: y,
    isPlaying: M,
    setIsPlaying: C,
    isLooping: _,
    setIsLooping: w,
    playbackSpeed: m,
    setPlaybackSpeed: g,
    togglePlaySmart: D
  };
}
function qx(e) {
  return 1 - Math.pow(1 - e, 3);
}
function e1({
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
  const p = Math.max(32, t / 2e3), y = t / l, M = u.useCallback((m, g = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const T = d.current, E = m - T;
    if (Math.abs(E) < 1) return;
    const b = performance.now(), h = (A) => {
      const k = A - b, N = Math.min(1, k / g);
      i(Math.round(T + E * qx(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), C = u.useCallback((m, g) => {
    const T = Math.max(1e3, g - m), E = Math.max(500, T * 0.05), b = Math.max(0, m - E), A = Math.min(t, g + E) - b, k = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), N = t / k, D = Math.max(0, Math.min(b, t - N));
    M(D), o(k);
  }, [t, p, M]), _ = u.useCallback(() => {
    M(0), o(1);
  }, [M]), w = u.useCallback((m, g = "center") => {
    if (m == null) return;
    const T = g === "start" ? y / 4 : y * 0.75, E = Math.max(0, Math.min(m - T, t - y));
    M(E);
  }, [y, t, M]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let m = null;
    const g = (E) => {
      if (E.defaultPrevented) return;
      E.preventDefault(), E.stopPropagation();
      const b = E.ctrlKey || E.shiftKey, h = v.current, A = d.current, k = f.current;
      if (b) {
        const N = Math.abs(E.deltaX) > Math.abs(E.deltaY) ? E.deltaX : E.deltaY;
        if (N === 0) return;
        const D = k / Math.max(1, h), W = Math.max(0, k - D), $ = D * 0.08 * (N > 0 ? 1 : -1);
        i((F) => Math.max(0, Math.min(W, F + $)));
      } else {
        if (E.deltaY === 0) return;
        const D = E.deltaY < 0 ? 1.25 : 0.8, W = Math.max(32, k / 2e3), $ = m ? m.getBoundingClientRect() : { left: 0, width: window.innerWidth }, F = Math.max(0, Math.min($.width, E.clientX - $.left)), se = $.width > 0 ? F / $.width : 0.5;
        o((ne) => {
          const K = Math.max(1, Math.min(W, Math.round(ne * D * 100) / 100));
          if (K === ne) return ne;
          const I = k / ne, U = k / K, z = A + se * I - se * U, R = Math.max(0, k - U);
          return i(Math.max(0, Math.min(R, z))), K;
        });
      }
    }, T = () => {
      const E = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return E && !m ? (m = E, m.addEventListener("wheel", g, { passive: !1, capture: !0 }), !0) : !!m;
    };
    if (!T()) {
      const E = setInterval(() => {
        T() && clearInterval(E);
      }, 100);
      return () => {
        clearInterval(E), m && m.removeEventListener("wheel", g, { capture: !0 });
      };
    }
    return () => {
      m && m.removeEventListener("wheel", g, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: y,
    animateViewportTo: M,
    fitRange: C,
    resetZoom: _,
    jumpViewportTo: w
  };
}
function t1({
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
  togglePlaySmart: M,
  onToggleHelpModal: C,
  onSplitDirectorAtPlayhead: _,
  isModalActive: w = !1,
  hasGridPlacements: m = !0,
  onToggleGridFullscreen: g,
  isGridFullscreen: T = !1,
  onExitGridFullscreen: E
}) {
  u.useEffect(() => {
    const b = (h) => {
      const A = h.target;
      if (!(A.tagName === "INPUT" || A.tagName === "TEXTAREA" || A.tagName === "SELECT" || A.isContentEditable || A.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), C == null || C();
          return;
        }
        if (!(w || t)) {
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
            if (h.preventDefault(), !m) return;
            M();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), g == null || g();
            return;
          }
          if ((h.key === "Escape" || h.code === "Escape") && T) {
            h.preventDefault(), E == null || E();
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
            let D;
            if (h.ctrlKey || h.metaKey)
              D = 33;
            else if (h.shiftKey)
              D = 5e3;
            else {
              const W = Math.max(1, y);
              D = Math.max(33, Math.round(1e3 / W));
            }
            i == null || i((W) => {
              const $ = N ? W - D : W + D;
              return Math.max(0, Math.min(p, $));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const N = n.findIndex((D) => D.id === e);
            if (N === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const D = (N + 1) % n.length;
              l(n[D].id), o(1);
            } else {
              const D = (N - 1 + n.length) % n.length;
              l(n[D].id), o(1);
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
    M,
    C,
    _,
    w,
    m,
    g,
    T,
    E
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
function n1() {
  var $l, Rl;
  const e = u.useMemo(() => $g() || {}, []), [t, n] = u.useState(() => {
    var S, le;
    return (S = e.timeRange) != null && S.startEpochMs && ((le = e.timeRange) != null && le.endEpochMs) ? e.timeRange : dh();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    Cg().catch((S) => console.warn("[Studio] DST init error:", S));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Vl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), p = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, M] = u.useState(e.selectedStationIds || []), [C, _] = u.useState(e.activeStationId || null), [w, m] = u.useState(null), [g, T] = u.useState(null), [E, b] = u.useState([]), [h, A] = u.useState(!1), [k, N] = u.useState(null), [D, W] = u.useState(() => {
    var S;
    return e.compositionScope || (((S = e.selectedStationIds) == null ? void 0 : S.length) > 1 ? "inter-station" : "intra-station");
  }), [$, F] = u.useState(() => {
    try {
      const S = localStorage.getItem("itb_composition_layout");
      if (S) return S;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), se = u.useCallback((S) => {
    F((le) => {
      const de = typeof S == "function" ? S(le) : S;
      try {
        localStorage.setItem("itb_composition_layout", de);
      } catch {
      }
      return de;
    });
  }, []), [ne, K] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [I, U] = u.useState(() => !!e.isPipSwapped), [O, z] = u.useState(() => e.audioRoutingPlan || null), [R, re] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ee, J] = u.useState(!1), [V, $e] = u.useState(null), [Le, ye] = u.useState(() => e.canvasLayoutTimeline || null), [ze, be] = u.useState(0), Ie = u.useCallback((S) => {
    ye((le) => {
      const de = [...(le == null ? void 0 : le.keyframes) || []], ve = de.findIndex((We) => Math.abs(We.timestampEpochMs - S) < 300);
      if (ve >= 0)
        return be(ve), le;
      const Me = de[ze] || de[0], Ee = (Me == null ? void 0 : Me.layout) || V || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Te = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(S),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Ee))
      }, Re = [...de, Te].sort((We, Ye) => We.timestampEpochMs - Ye.timestampEpochMs), Qe = Re.findIndex((We) => We.timestampEpochMs === Math.round(S));
      return be(Qe >= 0 ? Qe : 0), {
        ...le || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: Re
      };
    });
  }, [ze, V]), tt = u.useCallback((S, le) => {
    ye((de) => !(de != null && de.keyframes) || de.keyframes.length === 0 ? de : _c(de, S, le));
  }, []), it = u.useCallback((S) => {
    ye((le) => {
      if (!(le != null && le.keyframes) || le.keyframes.length <= 1) return le;
      const de = le.keyframes.filter((ve, Me) => Me !== S);
      return be((ve) => Math.max(0, ve - 1)), { ...le, keyframes: de };
    });
  }, []), ie = u.useCallback((S, le) => {
    ye((de) => {
      if (!(de != null && de.keyframes) || de.keyframes.length === 0) return de;
      const ve = Math.round(le), Me = typeof S == "number" && de.keyframes[S] ? S : de.keyframes.findIndex((Re) => Re.id === S);
      if (Me === -1) return de;
      const Ee = [...de.keyframes];
      Ee[Me] = {
        ...Ee[Me],
        timestampEpochMs: ve
      }, Ee.sort((Re, Qe) => Re.timestampEpochMs - Qe.timestampEpochMs);
      const Te = Ee.findIndex((Re) => Re.timestampEpochMs === ve);
      return Te >= 0 && be(Te), {
        ...de,
        keyframes: Ee
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [we, Ke] = u.useState({}), Ve = u.useCallback((S) => {
    M((le) => le.filter((de) => de !== S)), C === S && _(null), w === S && m(null), ye((le) => {
      if (!le || !le.keyframes) return le;
      const de = le.keyframes.map((ve) => {
        var Me;
        return {
          ...ve,
          layout: {
            ...ve.layout,
            placements: (((Me = ve.layout) == null ? void 0 : Me.placements) || []).filter((Ee) => Ee.stationId !== S)
          }
        };
      });
      return { ...le, keyframes: de };
    });
  }, [C, w]), me = u.useCallback((S, le) => {
    S.preventDefault(), S.stopPropagation();
    const de = 195, ve = 110, Me = Math.min(S.clientX, window.innerWidth - de - 10), Ee = Math.min(S.clientY, window.innerHeight - ve - 10);
    N({ x: Me, y: Ee, station: le });
  }, []), fe = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, p, v]), oe = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(fe + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(fe + 1e3, Math.min(p, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, v, t.durationMs, fe]), Ce = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : fe, [e.playheadEpochMs, e.playheadMs, f, p, fe]), [L, te] = u.useState(fe), [Y, q] = u.useState(oe);
  u.useEffect(() => {
    if (!f) return;
    const S = Math.round(f + L), le = Math.round(f + Y);
    ye((de) => {
      var Re, Qe;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      let ve = [...de.keyframes], Me = !1, Ee = ve.find((We) => We.tag === "cut-in");
      if (Ee)
        Ee.timestampEpochMs !== S && (Ee.timestampEpochMs = S, Me = !0);
      else {
        const We = ve.find((Ye) => Math.abs(Ye.timestampEpochMs - S) < 500);
        if (We)
          We.tag = "cut-in", We.timestampEpochMs = S, Me = !0;
        else {
          const Ye = ((Re = ve[0]) == null ? void 0 : Re.layout) || V || { width: 1920, height: 1080, placements: [] };
          ve.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: S,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), Me = !0;
        }
      }
      let Te = ve.find((We) => We.tag === "cut-out");
      if (Te)
        Te.timestampEpochMs !== le && (Te.timestampEpochMs = le, Me = !0);
      else {
        const We = ve.find((Ye) => Math.abs(Ye.timestampEpochMs - le) < 500 && Ye.tag !== "cut-in");
        if (We)
          We.tag = "cut-out", We.timestampEpochMs = le, Me = !0;
        else {
          const Ye = ((Qe = ve[ve.length - 1]) == null ? void 0 : Qe.layout) || V || { width: 1920, height: 1080, placements: [] };
          ve.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: le,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), Me = !0;
        }
      }
      return Me ? (ve.sort((We, Ye) => We.timestampEpochMs - Ye.timestampEpochMs), {
        ...de,
        keyframes: ve
      }) : de;
    });
  }, [f, L, Y, V]);
  const { allStations: G, recordingSegments: Q, isLoadingStations: ce, movieBoundaries: qe } = Jx(
    f,
    p,
    t,
    r,
    C
  ), De = u.useMemo(() => G.find((S) => S.id === C) || null, [G, C]), Xe = u.useCallback((S) => {
    Ke((le) => {
      const de = !(le[S] ?? !0);
      return ye((ve) => {
        if (!(ve != null && ve.keyframes)) return ve;
        const Me = ve.keyframes.map((Ee) => {
          var We;
          const Te = ((We = Ee.layout) == null ? void 0 : We.placements) || [];
          let Re = !1;
          const Qe = Te.map((Ye) => {
            if (Ye.stationId === S) {
              if (!de && (Ye.displayId === "auto" || !Ye.displayId)) {
                Re = !0;
                const rt = G.find((lt) => lt.id === S);
                return {
                  ...Ye,
                  displayId: "mon-0",
                  label: `${(rt == null ? void 0 : rt.displayName) || S} - Screen 1 (Main)`
                };
              } else if (de && (Ye.displayId === "mon-0" || !Ye.displayId) && Te.filter((lt) => lt.stationId === S).length === 1) {
                Re = !0;
                const lt = G.find((bt) => bt.id === S);
                return {
                  ...Ye,
                  displayId: "auto",
                  label: `${(lt == null ? void 0 : lt.displayName) || S} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ye;
          });
          return Re ? {
            ...Ee,
            layout: {
              ...Ee.layout,
              placements: Qe
            }
          } : Ee;
        });
        return { ...ve, keyframes: Me };
      }), {
        ...le,
        [S]: de
      };
    });
  }, [G]), at = u.useCallback((S, le) => {
    ye((de) => {
      var Ye, rt;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      const ve = ze >= 0 && ze < de.keyframes.length ? ze : 0, Me = de.keyframes[ve], Ee = ((Ye = Me == null ? void 0 : Me.layout) == null ? void 0 : Ye.placements) || [], Te = (le || "mon-0").toLowerCase(), Re = Ee.findIndex((lt) => {
        if (lt.stationId !== S) return !1;
        const bt = (lt.displayId || "mon-0").toLowerCase();
        return bt === Te || bt === "auto" && (Te === "mon-0" || Te === "screen-0");
      });
      let Qe;
      if (Re >= 0)
        Qe = Ee.filter((lt, bt) => bt !== Re);
      else {
        const lt = G.find((Ll) => Ll.id === S), bt = ((rt = lt == null ? void 0 : lt.displays) == null ? void 0 : rt.find((Ll) => (Ll.displayId || "").toLowerCase() === Te)) || { width: 1920, height: 1080 }, ln = bt.width || 1920, Vt = bt.height || 1080, gn = ln / Vt, xs = gn >= 1 ? 640 : Math.round(360 * gn), Cr = gn >= 1 ? Math.round(640 / gn) : 360, Yr = {
          stationId: S,
          displayId: Te,
          label: `${(lt == null ? void 0 : lt.displayName) || S} - ${bt.displayName || Te}`,
          x: 120 + Ee.length * 40 % 800,
          y: 100 + Ee.length * 40 % 500,
          width: xs,
          height: Cr,
          sourceWidth: ln,
          sourceHeight: Vt,
          nativeAspectRatio: gn,
          aspectRatio: gn,
          zIndex: Ee.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Qe = [...Ee, Yr];
      }
      const We = [...de.keyframes];
      return We[ve] = {
        ...We[ve],
        layout: {
          ...We[ve].layout,
          placements: Qe
        }
      }, { ...de, keyframes: We };
    });
  }, [ze, G]), Ge = u.useMemo(() => !y || y.length === 0 ? [] : G.filter((S) => y.includes(S.id)), [G, y]);
  u.useEffect(() => {
    !f || isNaN(f) || ye((S) => {
      if (S != null && S.keyframes && S.keyframes.length > 0) return S;
      const le = f + (L || 0), de = f + (Y || p || 36e5), ve = V || {
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
            id: `kf_root_${le}`,
            timestampEpochMs: Math.round(le),
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
  }, [f, L, Y, p, V]), u.useEffect(() => {
    if (!Ge || Ge.length === 0 || !f || isNaN(f)) return;
    const S = f + (L || 0), le = f + (Y || p || 36e5);
    le <= S || Ge.forEach((de) => {
      _r.fetchWaveform(de.id, S, le, null, 250);
    });
  }, [Ge, f, L, Y, p]);
  const Tt = u.useMemo(() => G.find((S) => S.id === w) || null, [G, w]), Rt = !!(w && Tt), Lt = u.useRef("grid"), Ot = u.useRef(null), {
    playheadMs: ot,
    setPlayheadMs: yt,
    isPlaying: Je,
    setIsPlaying: Be,
    playbackSpeed: Nt,
    setPlaybackSpeed: Dt,
    isLooping: an,
    setIsLooping: cn,
    togglePlaySmart: wn
  } = Zx({
    timelineBaseEpochMs: f,
    inPointMs: L,
    outPointMs: Y,
    globalGaps: E,
    activeStation: De,
    spotlightStation: Tt,
    recordingSegments: Q,
    initialPlayheadMs: Ce,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !C
  }), {
    zoomLevel: Pe,
    setZoomLevel: Oe,
    viewportStartMs: st,
    setViewportStartMs: ae,
    resetZoom: nt,
    fitRange: H,
    jumpViewportTo: he
  } = e1({
    containerRef: Ot,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [pe, Ue] = u.useState(!1), [Ze, ut] = u.useState(!1), [dt, et] = u.useState(!1), [ht, St] = u.useState(!1), [Mt, Pt] = u.useState(
    !!(e.isWorkspaceActive && (($l = e.selectedStationIds) == null ? void 0 : $l.length) > 0)
  ), [rn, _t] = u.useState([]);
  u.useEffect(() => {
    const S = Rt && Tt || De, le = (S == null ? void 0 : S.hostname) || (S == null ? void 0 : S.displayName) || (S == null ? void 0 : S.id), de = (o || "NONE").toUpperCase().replace("-", "_");
    if (!le || !f || !(de !== "NONE" && de !== "OFF" || i)) {
      _t([]);
      return;
    }
    const Me = Math.max(0, f - 5e3), Ee = f + p + 5e3, Te = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(le)}&startEpoch=${Me}&endEpoch=${Ee}`, { signal: Te.signal }).then((Re) => Re.ok ? Re.json() : []).then((Re) => _t(Array.isArray(Re) ? Re : [])).catch((Re) => {
      Re.name !== "AbortError" && _t([]);
    }), () => Te.abort();
  }, [De, Tt, Rt, f, p, o, i]), u.useEffect(() => {
    ce || (G.length === 0 ? ((y.length > 0 || C || Mt) && (M([]), _(null), m(null), Pt(!1)), St(!0), A(!0)) : (A(!1), M((S) => {
      const le = S.filter((de) => G.some((ve) => ve.id === de));
      return le.length !== S.length ? (le.length === 0 && (Pt(!1), St(!0)), le) : S;
    })));
  }, [ce, G]);
  const zt = u.useCallback((S) => {
    if (S === null) {
      Be(!1), Dt(1), _(null);
      return;
    }
    S !== C && Dt(1), _(S);
  }, [C, Be, Dt]), dn = u.useCallback((S, le = null) => {
    S !== C && Dt(1), Lt.current = y.length <= 1 || C ? "spotlight" : "grid", _(S), m(S), T(le || null);
  }, [C, y.length, Dt]), Gt = u.useCallback(() => {
    m(null), T(null), Lt.current === "grid" && _(null);
  }, []), At = u.useMemo(() => {
    if (O != null && O.segments && O.segments.length > 0)
      return O;
    const S = y[0] || C || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          sourceStationId: S
        }
      ]
    };
  }, [O, y, C, f, p]), $n = u.useCallback((S) => {
    z((le) => {
      const de = le || At, ve = [...de.segments || []], Me = ve.findIndex((rt) => {
        const lt = rt.startEpochMs ?? rt.StartEpochMs ?? 0, bt = rt.endEpochMs ?? rt.EndEpochMs ?? 0;
        return S > lt + 500 && S < bt - 500;
      });
      if (Me === -1) return le;
      const Ee = ve[Me], Te = Ee.startEpochMs ?? Ee.StartEpochMs ?? 0, Re = Ee.endEpochMs ?? Ee.EndEpochMs ?? 0, Qe = Ee.sourceStationId ?? Ee.SourceStationId ?? y[0], We = { startEpochMs: Te, endEpochMs: S, sourceStationId: Qe }, Ye = { startEpochMs: S, endEpochMs: Re, sourceStationId: Qe };
      return ve.splice(Me, 1, We, Ye), { ...de, segments: ve };
    });
  }, [At, y]), gs = u.useCallback((S, le) => {
    z((de) => {
      const ve = de || At, Me = (ve.segments || []).map((Ee) => {
        const Te = Ee.startEpochMs ?? Ee.StartEpochMs ?? 0, Re = Ee.endEpochMs ?? Ee.EndEpochMs ?? 0;
        return S >= Te && S <= Re ? { ...Ee, sourceStationId: le } : Ee;
      });
      return { ...ve, segments: Me };
    }), re(!1);
  }, [At]), Ss = u.useCallback((S, le) => {
    z((de) => {
      const ve = de || At, Me = (ve.segments || []).map((Ee) => {
        const Te = Ee.startEpochMs ?? Ee.StartEpochMs ?? 0, Re = Ee.endEpochMs ?? Ee.EndEpochMs ?? 0;
        return S >= Te && S <= Re ? { ...Ee, gain: le } : Ee;
      });
      return { ...ve, segments: Me };
    });
  }, [At]), Vr = u.useCallback(() => {
    re((S) => !S);
  }, []), [Un, Xs] = u.useState({}), Ft = u.useCallback((S) => {
    if (!S) return null;
    if (Un[S]) return Un[S];
    const le = G.find((de) => de.id === S);
    return le != null && le.directorPlan ? le.directorPlan : {
      stationId: S,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [Un, G, f, p]), Kt = u.useCallback((S, le) => {
    S && Xs((de) => {
      const ve = de[S] || Ft(S), Me = [...ve.segments || []], Ee = Me.findIndex((bt) => {
        const ln = bt.startEpochMs ?? bt.StartEpochMs ?? 0, Vt = bt.endEpochMs ?? bt.EndEpochMs ?? 0;
        return le > ln + 500 && le < Vt - 500;
      });
      if (Ee === -1) return de;
      const Te = Me[Ee], Re = Te.startEpochMs ?? Te.StartEpochMs ?? 0, Qe = Te.endEpochMs ?? Te.EndEpochMs ?? 0, We = Te.targetDisplayId ?? Te.TargetDisplayId ?? "mon-0", Ye = !!(Te.isManualOverride ?? Te.IsManualOverride), rt = { ...Te, startEpochMs: Re, endEpochMs: le, targetDisplayId: We, isManualOverride: Ye }, lt = { ...Te, startEpochMs: le, endEpochMs: Qe, targetDisplayId: We, isManualOverride: Ye };
      return Me.splice(Ee, 1, rt, lt), { ...de, [S]: { ...ve, segments: Me } };
    });
  }, [Ft]), as = u.useCallback((S, le, de) => {
    S && Xs((ve) => {
      const Me = ve[S] || Ft(S), Ee = [...Me.segments || []];
      let Te = Ee.findIndex((Qe) => {
        const We = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ye = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return le > We && le < Ye;
      });
      if (Te === -1 && (Te = Ee.findIndex((Qe) => {
        const We = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ye = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return le >= We && le <= Ye;
      })), Te === -1) return ve;
      const Re = Ee[Te];
      return Ee[Te] = { ...Re, targetDisplayId: de, isManualOverride: !0 }, { ...ve, [S]: { ...Me, segments: Ee } };
    });
  }, [Ft]), Wn = u.useCallback((S, le) => {
    if (!S) return;
    const de = G.find((Me) => Me.id === S), ve = de == null ? void 0 : de.directorPlan;
    Xs((Me) => {
      var ln;
      const Ee = Me[S] || Ft(S), Te = [...Ee.segments || []];
      let Re = Te.findIndex((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return le > gn && le < xs;
      });
      if (Re === -1 && (Re = Te.findIndex((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return le >= gn && le <= xs;
      })), Re === -1) return Me;
      const Qe = Te[Re], We = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ye = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0, rt = (We + Ye) / 2, lt = (ln = ve == null ? void 0 : ve.segments) == null ? void 0 : ln.find((Vt) => {
        const gn = Vt.startEpochMs ?? Vt.StartEpochMs ?? 0, xs = Vt.endEpochMs ?? Vt.EndEpochMs ?? 0;
        return rt >= gn && rt <= xs;
      }), bt = lt ? lt.targetDisplayId ?? lt.TargetDisplayId ?? "mon-0" : "mon-0";
      return Te[Re] = { ...Qe, targetDisplayId: bt, isManualOverride: !1 }, { ...Me, [S]: { ...Ee, segments: Te } };
    });
  }, [G, Ft]);
  u.useEffect(() => {
    if (!Ge || Ge.length === 0 || isNaN(f)) return;
    const S = f + L, le = f + Y;
    if (le <= S) return;
    const de = setTimeout(async () => {
      const ve = Ge.filter((Me) => {
        var Te;
        return (Me.displays || Me.Displays || ((Te = Me.displayTopology) == null ? void 0 : Te.displays) || []).length > 1;
      });
      if (ve.length !== 0)
        for (const Me of ve)
          try {
            const Ee = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(Me.id)}&startEpoch=${S}&endEpoch=${le}`);
            if (Ee.ok) {
              const Te = await Ee.json();
              Te != null && Te.segments && Te.segments.length > 0 && Xs((Re) => {
                const Qe = Re[Me.id] || Me.directorPlan, We = ((Qe == null ? void 0 : Qe.segments) || []).filter((rt) => rt.isManualOverride || rt.IsManualOverride);
                if (We.length === 0)
                  return { ...Re, [Me.id]: Te };
                const Ye = [...Te.segments];
                return We.forEach((rt) => {
                  const lt = rt.startEpochMs ?? rt.StartEpochMs, bt = rt.endEpochMs ?? rt.EndEpochMs;
                  for (let ln = Ye.length - 1; ln >= 0; ln--) {
                    const Vt = Ye[ln].startEpochMs ?? Ye[ln].StartEpochMs, gn = Ye[ln].endEpochMs ?? Ye[ln].EndEpochMs;
                    if (!(gn <= lt || Vt >= bt))
                      if (Vt >= lt && gn <= bt)
                        Ye.splice(ln, 1);
                      else if (Vt < lt && gn > bt) {
                        const xs = { ...Ye[ln], endEpochMs: lt }, Cr = { ...Ye[ln], startEpochMs: bt };
                        Ye.splice(ln, 1, xs, Cr);
                      } else Vt < lt ? Ye[ln].endEpochMs = lt : gn > bt && (Ye[ln].startEpochMs = bt);
                  }
                  Ye.push(rt);
                }), Ye.sort((rt, lt) => (rt.startEpochMs ?? rt.StartEpochMs) - (lt.startEpochMs ?? lt.StartEpochMs)), { ...Re, [Me.id]: { ...Te, segments: Ye } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(de);
  }, [L, Y, Ge, f]);
  const Er = u.useMemo(() => Ge.map((S) => ({
    ...S,
    directorPlan: Un[S.id] || S.directorPlan || Ft(S.id)
  })), [Ge, Un, Ft]), Mn = u.useMemo(() => De ? {
    ...De,
    directorPlan: Un[De.id] || De.directorPlan || Ft(De.id)
  } : null, [De, Un, Ft]), Ms = u.useMemo(() => Tt ? {
    ...Tt,
    directorPlan: Un[Tt.id] || Tt.directorPlan || Ft(Tt.id)
  } : null, [Tt, Un, Ft]), _e = (S, le = 30) => {
    const de = Math.max(0, S), ve = Math.floor(de / 1e3), Me = Math.floor(ve / 3600), Ee = Math.floor(ve % 3600 / 60), Te = ve % 60, Re = Math.floor(de % 1e3 / 1e3 * le), Qe = (We) => String(We).padStart(2, "0");
    return `${Qe(Me)}:${Qe(Ee)}:${Qe(Te)}.${Qe(Re)}`;
  }, [Se, Os] = u.useState(!1), [$o, jr] = u.useState(!0), [Ro, Lo] = u.useState(!1), Jn = u.useRef(null), hn = u.useMemo(() => {
    var ve;
    const S = Le == null ? void 0 : Le.keyframes, le = (S == null ? void 0 : S[ze]) || (S == null ? void 0 : S[0]);
    return (((ve = le == null ? void 0 : le.layout) == null ? void 0 : ve.placements) || (V == null ? void 0 : V.placements) || []).length > 0 || y && y.length > 0;
  }, [Le, ze, V, y]), Zt = u.useCallback(() => {
    Jn.current && clearTimeout(Jn.current), jr(!0), Jn.current = setTimeout(() => {
      Ro || jr(!1);
    }, 2500);
  }, [Ro]);
  u.useEffect(() => {
    if (!Se) {
      jr(!0), Jn.current && clearTimeout(Jn.current);
      return;
    }
    const S = (le) => {
      le.clientY >= window.innerHeight - 280 && jr(!0), Zt();
    };
    return window.addEventListener("mousemove", S, { passive: !0 }), Zt(), () => {
      window.removeEventListener("mousemove", S), Jn.current && clearTimeout(Jn.current);
    };
  }, [Se, Zt]);
  const vn = u.useCallback(() => {
    Os((S) => {
      const le = !S;
      return le ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), le;
    });
  }, []), pn = u.useCallback(() => {
    Os(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const S = () => {
      !document.fullscreenElement && Se && Os(!1);
    };
    return document.addEventListener("fullscreenchange", S), () => document.removeEventListener("fullscreenchange", S);
  }, [Se]), t1({
    activeStationId: C,
    spotlightStationId: w,
    timelineStations: Er,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: zt,
    setPlaybackSpeed: Dt,
    playheadMs: ot,
    setPlayheadMs: yt,
    inPointMs: L,
    setInPointMs: te,
    outPointMs: Y,
    setOutPointMs: q,
    totalTimelineDurationMs: p,
    zoomLevel: Pe,
    togglePlaySmart: wn,
    onToggleHelpModal: () => et((S) => !S),
    onSplitDirectorAtPlayhead: () => {
      var le, de, ve;
      const S = C || (y.length === 1 ? y[0] : null);
      if (S) {
        const Me = G.find((Te) => Te.id === S);
        (((le = Me == null ? void 0 : Me.displays) == null ? void 0 : le.length) > 1 || ((ve = (de = Me == null ? void 0 : Me.topology) == null ? void 0 : de.displays) == null ? void 0 : ve.length) > 1) && Kt(S, f + ot);
      }
    },
    isModalActive: pe || Ze || dt,
    hasGridPlacements: hn,
    onToggleGridFullscreen: vn,
    isGridFullscreen: Se,
    onExitGridFullscreen: pn
  }), u.useEffect(() => {
    const S = f + L, le = f + Y, de = f + ot;
    Ap({
      timeRange: t,
      timeMode: r,
      inPointMs: L,
      outPointMs: Y,
      playheadMs: Math.round(ot),
      inEpochMs: S,
      outEpochMs: le,
      playheadEpochMs: de,
      selectedStationIds: y,
      activeStationId: C,
      zoomLevel: Pe,
      viewportStartMs: st,
      isWorkspaceActive: Mt,
      isLooping: an,
      playbackSpeed: Nt,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: D,
      compositionLayout: $,
      isAutoDirectorEnabled: ne,
      isPipSwapped: I,
      audioRoutingPlan: At,
      isAutoFollowAudio: R,
      canvasLayoutTimeline: Le
    });
  }, [
    t,
    r,
    L,
    Y,
    ot,
    y,
    C,
    Pe,
    st,
    Mt,
    an,
    Nt,
    f,
    o,
    i,
    D,
    $,
    ne,
    I,
    At,
    R,
    Le
  ]);
  const En = u.useCallback((S) => {
    var We, Ye;
    const le = Vl(S.startTime), de = Vl(S.endTime), ve = Math.max(0, de - le) || 144e5, Me = {
      start: S.startTime,
      end: S.endTime,
      durationMs: ve,
      startEpochMs: le,
      endEpochMs: de
    }, Ee = Math.max(6e4, Math.round(ve * 0.05)), Te = le - Ee, Re = ve + 2 * Ee;
    if (n(Me), S.inEpochMs && S.outEpochMs) {
      const rt = Math.max(0, Math.min(Re, S.inEpochMs - Te)), lt = Math.max(rt + 1e3, Math.min(Re, S.outEpochMs - Te)), bt = S.playheadEpochMs ? Math.max(0, Math.min(Re, S.playheadEpochMs - Te)) : rt;
      te(rt), q(lt), yt(bt);
    } else {
      const rt = typeof S.inPointMs == "number" ? S.inPointMs : Ee, lt = typeof S.outPointMs == "number" ? S.outPointMs : Ee + ve, bt = typeof S.playheadMs == "number" ? S.playheadMs : rt;
      te(Math.max(0, Math.min(Re, rt))), q(Math.max(0, Math.min(Re, lt))), yt(Math.max(0, Math.min(Re, bt)));
    }
    const Qe = ((We = S.selectedStationIds) == null ? void 0 : We.length) > 0 ? S.selectedStationIds : ((Ye = S.cutStationIds) == null ? void 0 : Ye.length) > 0 ? S.cutStationIds : S.stationIds;
    if ((Qe == null ? void 0 : Qe.length) > 0) {
      M(Qe);
      const rt = S.spotlightStationId || S.SpotlightStationId || null, lt = S.activeStationId || S.ActiveStationId || null;
      rt && Qe.includes(rt) ? (_(rt), m(rt)) : lt && Qe.includes(lt) ? (_(lt), m(null)) : (_(null), m(null));
    }
    S.keystrokeMode && a(S.keystrokeMode), Pt(!0), St(!1);
  }, []), Oo = u.useCallback((S) => {
    const le = S.startEpochMs || Vl(S.start, null, r), de = S.endEpochMs || Vl(S.end, null, r), ve = Math.max(0, de - le) || 144e5, Me = Math.max(6e4, Math.round(ve * 0.05)), Ee = le - Me, Te = ve + 2 * Me;
    n({
      ...S,
      startEpochMs: le,
      endEpochMs: de,
      durationMs: ve
    }), A(!1), te(Me), q(Me + ve), yt(Me), ye((Re) => {
      if (!(Re != null && Re.keyframes) || Re.keyframes.length === 0) return Re;
      const Qe = Re.keyframes.map((We, Ye) => Ye === 0 ? { ...We, timestampEpochMs: Ee } : We).filter((We) => We.timestampEpochMs >= Ee && We.timestampEpochMs <= Ee + Te);
      return { ...Re, keyframes: Qe };
    }), z((Re) => {
      if (!(Re != null && Re.segments) || Re.segments.length === 0) return Re;
      if (!Re.segments.some((We) => {
        const Ye = We.startEpochMs ?? We.StartEpochMs ?? 0;
        return (We.endEpochMs ?? We.EndEpochMs ?? 0) > Ee && Ye < Ee + Te;
      })) {
        const We = y[0] || C || "station-0";
        return {
          segments: [
            {
              startEpochMs: Ee,
              endEpochMs: Ee + Te,
              sourceStationId: We
            }
          ]
        };
      }
      return Re;
    }), Xs({});
  }, [r, y, C]), mn = u.useCallback(() => {
    if (Ge.map((le) => le.id).length === 0) return alert("No active stations selected in timeline.");
    J(!0);
  }, [Ge]), zn = u.useCallback(async (S, le, de = "") => {
    var Re, Qe, We, Ye;
    const ve = Ge.map((rt) => rt.id);
    if (ve.length === 0) return;
    let Me = S === "None" ? "None" : "BurnIn";
    const Ee = le || "NATIVE", Te = ((Re = Mn == null ? void 0 : Mn.displays) == null ? void 0 : Re.length) > 1 || ((We = (Qe = Mn == null ? void 0 : Mn.topology) == null ? void 0 : Qe.displays) == null ? void 0 : We.length) > 1 ? ((Ye = Mn == null ? void 0 : Mn.directorPlan) == null ? void 0 : Ye.segments) || [] : [];
    try {
      const rt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Wp(),
          notes: (de || "").trim(),
          stationIds: ve,
          inEpochMs: f + L,
          outEpochMs: f + Y,
          keystrokeMode: Me,
          resolution: Ee,
          videoQuality: Ee,
          compositionScope: D,
          layoutMode: "canvas",
          canvasLayout: V,
          canvasLayoutTimeline: Le,
          isPipSwapped: I,
          isAutoDirectorEnabled: ne,
          directorSegments: Te,
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
      if (!rt.ok) throw new Error(`HTTP ${rt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (rt) {
      console.error("[Studio] Export failed:", rt), alert("Failed to launch background master MP4 export job.");
    }
  }, [Ge, f, L, Y, D, V, Le, I, ne, Mn, At]), xe = u.useCallback(() => {
    Rg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const S = dh(), le = Math.max(6e4, Math.round(S.durationMs * 0.05));
    n(S), te(le), q(le + S.durationMs), yt(le), M([]), _(null), m(null), Be(!1), Dt(1), a("BURN_IN"), nt(), Pt(!1), St(!0);
  }, [nt, Be, Dt, yt]), Zn = !Mt || y.length === 0, Rn = f + ot;
  return u.useEffect(() => {
    const S = Le == null ? void 0 : Le.keyframes;
    if (!S || S.length === 0) return;
    let le = 0;
    for (let de = 0; de < S.length && S[de].timestampEpochMs <= Rn + 50; de++)
      le = de;
    le !== ze && be(le);
  }, [Rn, Le == null ? void 0 : Le.keyframes, ze]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Ig,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: C,
          hideBackToGrid: Ge.length <= 1,
          onResetActiveStation: () => zt(null),
          onOpenRangeModal: () => Ue(!0),
          onOpenBookmarksModal: () => ut(!0),
          onOpenHelpModal: () => et(!0),
          onToggleDrawer: () => St(!ht),
          isInitialSetup: Zn,
          selectedCount: y.length,
          totalCount: G.length,
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${Se ? "cinema-fullscreen-mode" : ""}`, children: [
        Se && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${$o ? "" : "is-hud-hidden"}`, children: [
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
                onClick: () => et(!0),
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
              Jg,
              {
                activeStation: Mn,
                timelineStations: Er,
                allStations: G,
                onSelectActiveStation: zt,
                onOpenSpotlight: dn,
                onStationContextMenu: me,
                onDeselectStation: Ve,
                stationAutoDirectorMap: we,
                onToggleStationAutoDirector: Xe,
                onOpenDrawer: () => St(!0),
                baseEpochMs: f,
                playheadMs: ot,
                playheadEpochMs: Rn,
                timeMode: r,
                isPlaying: Rt ? !1 : Je,
                setIsPlaying: Be,
                totalDurationMs: p,
                inPointMs: L,
                outPointMs: Y,
                setPlayheadMs: yt,
                globalGaps: E,
                recordingSegments: Q,
                playbackSpeed: Nt,
                onChangePlaybackSpeed: Dt,
                keystrokeMode: o,
                keystrokes: rn,
                directorPlan: Mn == null ? void 0 : Mn.directorPlan,
                onOverrideDisplay: as,
                onResetOverride: Wn,
                compositionScope: D,
                onChangeCompositionScope: W,
                compositionLayout: $,
                onChangeCompositionLayout: se,
                isAutoDirectorEnabled: ne,
                onToggleAutoDirector: () => K((S) => !S),
                isPipSwapped: I,
                onTogglePipSwap: () => U((S) => !S),
                onUpdateCanvasLayout: $e,
                canvasLayoutTimeline: Le,
                onUpdateCanvasLayoutTimeline: ye,
                activeKfIndex: ze,
                setActiveKfIndex: be,
                isModalOpen: ee || pe || Ze || Rt || dt,
                isGridFullscreen: Se,
                onToggleGridFullscreen: vn
              }
            ),
            !Se && /* @__PURE__ */ s.jsx(
              Uc,
              {
                hasGridPlacements: hn,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: ot,
                setPlayheadMs: yt,
                inPointMs: L,
                setInPointMs: te,
                outPointMs: Y,
                setOutPointMs: q,
                activeStationId: C,
                isPlaying: Je,
                setIsPlaying: wn,
                isLooping: an,
                setIsLooping: cn,
                playbackSpeed: Nt,
                onChangeSpeed: Dt,
                onSetInPoint: () => te(Math.max(0, Math.min(ot, Y - 1e3))),
                onSetOutPoint: () => q(Math.min(p, Math.max(ot, L + 1e3))),
                onStepFrameBackward: () => {
                  Be(!1), yt((S) => Math.max(0, S - 33));
                },
                onStepFrameForward: () => {
                  Be(!1), yt((S) => Math.min(p, S + 33));
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
              className: `studio-bottom-timeline ${Se ? "cinema-timeline-island" : ""} ${Se && !$o ? "dock-hidden" : ""} ${Se && Je ? "is-playing-dimmed" : ""}`,
              ref: Ot,
              onMouseEnter: () => Lo(!0),
              onMouseLeave: () => {
                Lo(!1), Se && Zt();
              },
              children: [
                Se && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: _e(Y - L) })
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
                      playheadMs: ot,
                      setPlayheadMs: yt,
                      inPointMs: L,
                      setInPointMs: te,
                      outPointMs: Y,
                      setOutPointMs: q,
                      activeStationId: C,
                      isPlaying: Je,
                      setIsPlaying: wn,
                      isLooping: an,
                      setIsLooping: cn,
                      playbackSpeed: Nt,
                      onChangeSpeed: Dt,
                      onSetInPoint: () => te(Math.max(0, Math.min(ot, Y - 1e3))),
                      onSetOutPoint: () => q(Math.min(p, Math.max(ot, L + 1e3))),
                      onStepFrameBackward: () => {
                        Be(!1), yt((S) => Math.max(0, S - 33));
                      },
                      onStepFrameForward: () => {
                        Be(!1), yt((S) => Math.min(p, S + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: jt(f + ot, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  Fp,
                  {
                    stations: Er,
                    activeStationId: C,
                    onSelectActiveStation: (S) => zt(y.length <= 1 ? S : S === C ? null : S),
                    onStationContextMenu: me,
                    onDeselectStation: Ve,
                    stationAutoDirectorMap: we,
                    onToggleStationAutoDirector: Xe,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: Pe,
                    onZoomChange: Oe,
                    onZoomReset: nt,
                    onFitRange: H,
                    onJumpViewportTo: he,
                    playheadMs: ot,
                    setPlayheadMs: yt,
                    inPointMs: L,
                    setInPointMs: te,
                    outPointMs: Y,
                    setOutPointMs: q,
                    viewportStartMs: st,
                    onViewportStartChange: ae,
                    onExport: mn,
                    recordingSegments: Q,
                    movieBoundaries: qe,
                    onEstimateLoaded: (S) => (S == null ? void 0 : S.removedGlobalGaps) && b(S.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: rn,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((S) => !S),
                    onSplitDirectorSegment: Kt,
                    onChangeDirectorSegmentDisplay: as,
                    onResetDirectorSegmentToAuto: Wn,
                    audioRoutingPlan: At,
                    onSplitAudioSegment: $n,
                    onChangeAudioSegmentStation: gs,
                    onChangeAudioSegmentGain: Ss,
                    onFollowVisualFeed: Vr,
                    isAutoFollowAudio: R,
                    canvasLayoutTimeline: Le,
                    activeKfIndex: ze,
                    onSelectKeyframe: (S, le) => {
                      be(S), yt(Math.max(0, le - f));
                    },
                    onAddKeyframeAtEpoch: Ie,
                    onDeleteKeyframe: it,
                    onUpdateKeyframeEpoch: ie,
                    onUpdateKeyframeTransition: tt,
                    onToggleDisplayOnCanvas: at,
                    onUpdateAudioPlan: z
                  }
                )
              ]
            }
          )
        ] }),
        !Se && /* @__PURE__ */ s.jsx(
          Px,
          {
            isOpen: ht || Zn,
            onToggle: () => St(!ht),
            onClose: () => St(!1),
            allStations: G,
            selectedStationIds: y,
            onToggleStation: (S) => M((le) => le.includes(S) ? le.filter((de) => de !== S) : [...le, S]),
            onUpdateSelections: M,
            isInitialSetup: Zn,
            isLoadingStations: ce,
            recordingSegments: Q,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (_(null), m(null), Pt(!0), St(!1));
            },
            onOpenRangeModal: () => Ue(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Bx,
      {
        isOpen: pe,
        onClose: () => Ue(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: En,
        onApplyRange: Oo
      }
    ),
    /* @__PURE__ */ s.jsx(
      Wx,
      {
        isOpen: Ze,
        onClose: () => ut(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: ot,
          inPointMs: L,
          outPointMs: Y,
          selectedStationIds: y,
          selectedStationNames: G.filter((S) => y.includes(S.id)).map((S) => S.displayName || S.hostname || S.id),
          allStationIds: G.map((S) => S.id),
          activeStationId: C,
          activeStationName: (De == null ? void 0 : De.displayName) || (De == null ? void 0 : De.hostname) || null,
          spotlightStationId: w,
          keystrokeMode: o
        },
        onLoadBookmark: En
      }
    ),
    /* @__PURE__ */ s.jsx(
      zp,
      {
        isOpen: dt,
        onClose: () => et(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      Xx,
      {
        isOpen: Rt,
        station: Ms,
        initialDisplayId: g,
        allStations: Er,
        onSelectStation: (S) => {
          S !== w && Dt(1), _(S), m(S);
        },
        onClose: Gt,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: Pe,
        onZoomChange: Oe,
        onZoomReset: nt,
        onFitRange: H,
        onJumpViewportTo: he,
        viewportStartMs: st,
        onViewportStartChange: ae,
        playheadMs: ot,
        setPlayheadMs: yt,
        playheadEpochMs: Rn,
        inPointMs: L,
        setInPointMs: te,
        outPointMs: Y,
        setOutPointMs: q,
        recordingSegments: Q,
        globalGaps: E,
        isPlaying: Je,
        setIsPlaying: Be,
        isLooping: an,
        setIsLooping: cn,
        playbackSpeed: Nt,
        setPlaybackSpeed: Dt,
        onExport: mn,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: rn,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((S) => !S),
        directorPlan: Ms == null ? void 0 : Ms.directorPlan,
        onOverrideDisplay: as,
        onSplitDirectorSegment: Kt,
        onChangeDirectorSegmentDisplay: as,
        onResetDirectorSegmentToAuto: Wn
      }
    ),
    /* @__PURE__ */ s.jsx(
      Gx,
      {
        menu: k,
        onClose: () => N(null),
        onDeselect: Ve,
        onFocusSolo: zt
      }
    ),
    /* @__PURE__ */ s.jsx(
      Qx,
      {
        isOpen: ee,
        onClose: () => J(!1),
        onConfirm: zn,
        compositionSummary: {
          scope: D,
          layout: (V == null ? void 0 : V.preset) || $,
          isPipSwapped: I,
          isAutoDirectorEnabled: ne,
          stationsCount: Ge.length,
          audioSegmentsCount: ((Rl = At == null ? void 0 : At.segments) == null ? void 0 : Rl.length) || 1,
          resolution: (Le == null ? void 0 : Le.resolution) || "NATIVE",
          canvasWidth: (V == null ? void 0 : V.width) || 1920,
          canvasHeight: (V == null ? void 0 : V.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Hp, {})
  ] });
}
const hh = "itb-extractor-advanced-theme", fh = "itb-global-export-job-monitor-root";
function Kp() {
  if (!(typeof document > "u") && !document.getElementById(hh)) {
    const e = document.createElement("link");
    e.id = hh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Kp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(fh);
  if (!t) {
    t = document.createElement("div"), t.id = fh, document.body.appendChild(t);
    try {
      ya.createRoot(t).render(Mo.createElement(Hp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function s1(e, t = {}) {
  Kp();
  const n = ya.createRoot(e);
  return n.render(Mo.createElement(n1, t)), () => {
    n.unmount();
  };
}
export {
  Hp as ExportJobMonitor,
  n1 as ExtractorAdvancedStudio,
  n1 as default,
  s1 as mount
};
