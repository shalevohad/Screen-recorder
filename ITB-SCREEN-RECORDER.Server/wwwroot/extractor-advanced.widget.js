function um(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yh = { exports: {} }, Mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jo = Symbol.for("react.element"), dm = Symbol.for("react.portal"), hm = Symbol.for("react.fragment"), fm = Symbol.for("react.strict_mode"), pm = Symbol.for("react.profiler"), mm = Symbol.for("react.provider"), gm = Symbol.for("react.context"), xm = Symbol.for("react.forward_ref"), ym = Symbol.for("react.suspense"), vm = Symbol.for("react.memo"), Nm = Symbol.for("react.lazy"), Xu = Symbol.iterator;
function km(e) {
  return e === null || typeof e != "object" ? null : (e = Xu && e[Xu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var vh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Nh = Object.assign, kh = {};
function Tl(e, t, n) {
  this.props = e, this.context = t, this.refs = kh, this.updater = n || vh;
}
Tl.prototype.isReactComponent = {};
Tl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Tl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function wh() {
}
wh.prototype = Tl.prototype;
function Vc(e, t, n) {
  this.props = e, this.context = t, this.refs = kh, this.updater = n || vh;
}
var Yc = Vc.prototype = new wh();
Yc.constructor = Vc;
Nh(Yc, Tl.prototype);
Yc.isPureReactComponent = !0;
var Gu = Array.isArray, Eh = Object.prototype.hasOwnProperty, Xc = { current: null }, Ch = { key: !0, ref: !0, __self: !0, __source: !0 };
function jh(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) Eh.call(t, r) && !Ch.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: jo, type: e, key: o, ref: a, props: l, _owner: Xc.current };
}
function wm(e, t) {
  return { $$typeof: jo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Gc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === jo;
}
function Em(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Qu = /\/+/g;
function fi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Em("" + e.key) : t.toString(36);
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
        case jo:
        case dm:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + fi(a, 0) : r, Gu(l) ? (n = "", e != null && (n = e.replace(Qu, "$&/") + "/"), ra(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Gc(l) && (l = wm(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Qu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Gu(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + fi(o, i);
    a += ra(o, t, n, c, l);
  }
  else if (c = km(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + fi(o, i++), a += ra(o, t, n, c, l);
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
function Cm(e) {
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
var _n = { current: null }, la = { transition: null }, jm = { ReactCurrentDispatcher: _n, ReactCurrentBatchConfig: la, ReactCurrentOwner: Xc };
function Sh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Mt.Children = { map: Po, forEach: function(e, t, n) {
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
  if (!Gc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Mt.Component = Tl;
Mt.Fragment = hm;
Mt.Profiler = pm;
Mt.PureComponent = Vc;
Mt.StrictMode = fm;
Mt.Suspense = ym;
Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jm;
Mt.act = Sh;
Mt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Nh({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = Xc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) Eh.call(t, c) && !Ch.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
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
Mt.createContext = function(e) {
  return e = { $$typeof: gm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: mm, _context: e }, e.Consumer = e;
};
Mt.createElement = jh;
Mt.createFactory = function(e) {
  var t = jh.bind(null, e);
  return t.type = e, t;
};
Mt.createRef = function() {
  return { current: null };
};
Mt.forwardRef = function(e) {
  return { $$typeof: xm, render: e };
};
Mt.isValidElement = Gc;
Mt.lazy = function(e) {
  return { $$typeof: Nm, _payload: { _status: -1, _result: e }, _init: Cm };
};
Mt.memo = function(e, t) {
  return { $$typeof: vm, type: e, compare: t === void 0 ? null : t };
};
Mt.startTransition = function(e) {
  var t = la.transition;
  la.transition = {};
  try {
    e();
  } finally {
    la.transition = t;
  }
};
Mt.unstable_act = Sh;
Mt.useCallback = function(e, t) {
  return _n.current.useCallback(e, t);
};
Mt.useContext = function(e) {
  return _n.current.useContext(e);
};
Mt.useDebugValue = function() {
};
Mt.useDeferredValue = function(e) {
  return _n.current.useDeferredValue(e);
};
Mt.useEffect = function(e, t) {
  return _n.current.useEffect(e, t);
};
Mt.useId = function() {
  return _n.current.useId();
};
Mt.useImperativeHandle = function(e, t, n) {
  return _n.current.useImperativeHandle(e, t, n);
};
Mt.useInsertionEffect = function(e, t) {
  return _n.current.useInsertionEffect(e, t);
};
Mt.useLayoutEffect = function(e, t) {
  return _n.current.useLayoutEffect(e, t);
};
Mt.useMemo = function(e, t) {
  return _n.current.useMemo(e, t);
};
Mt.useReducer = function(e, t, n) {
  return _n.current.useReducer(e, t, n);
};
Mt.useRef = function(e) {
  return _n.current.useRef(e);
};
Mt.useState = function(e) {
  return _n.current.useState(e);
};
Mt.useSyncExternalStore = function(e, t, n) {
  return _n.current.useSyncExternalStore(e, t, n);
};
Mt.useTransition = function() {
  return _n.current.useTransition();
};
Mt.version = "18.3.1";
yh.exports = Mt;
var u = yh.exports;
const So = /* @__PURE__ */ um(u);
var ya = {}, Mh = { exports: {} }, ns = {}, bh = { exports: {} }, Ih = {};
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
  function t(O, H) {
    var b = O.length;
    O.push(H);
    e: for (; 0 < b; ) {
      var U = b - 1 >>> 1, L = O[U];
      if (0 < l(L, H)) O[U] = H, O[b] = L, b = U;
      else break e;
    }
  }
  function n(O) {
    return O.length === 0 ? null : O[0];
  }
  function r(O) {
    if (O.length === 0) return null;
    var H = O[0], b = O.pop();
    if (b !== H) {
      O[0] = b;
      e: for (var U = 0, L = O.length, ae = L >>> 1; U < ae; ) {
        var te = 2 * (U + 1) - 1, Z = O[te], K = te + 1, Ie = O[K];
        if (0 > l(Z, b)) K < L && 0 > l(Ie, Z) ? (O[U] = Ie, O[K] = b, U = K) : (O[U] = Z, O[te] = b, U = te);
        else if (K < L && 0 > l(Ie, b)) O[U] = Ie, O[K] = b, U = K;
        else break e;
      }
    }
    return H;
  }
  function l(O, H) {
    var b = O.sortIndex - H.sortIndex;
    return b !== 0 ? b : O.id - H.id;
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
  var c = [], d = [], v = 1, f = null, p = 3, y = !1, j = !1, C = !1, P = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function x(O) {
    for (var H = n(d); H !== null; ) {
      if (H.callback === null) r(d);
      else if (H.startTime <= O) r(d), H.sortIndex = H.expirationTime, t(c, H);
      else break;
      H = n(d);
    }
  }
  function I(O) {
    if (C = !1, x(O), !j) if (n(c) !== null) j = !0, re(S);
    else {
      var H = n(d);
      H !== null && G(I, H.startTime - O);
    }
  }
  function S(O, H) {
    j = !1, C && (C = !1, w(A), A = -1), y = !0;
    var b = p;
    try {
      for (x(H), f = n(c); f !== null && (!(f.expirationTime > H) || O && !_()); ) {
        var U = f.callback;
        if (typeof U == "function") {
          f.callback = null, p = f.priorityLevel;
          var L = U(f.expirationTime <= H);
          H = e.unstable_now(), typeof L == "function" ? f.callback = L : f === n(c) && r(c), x(H);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var ae = !0;
      else {
        var te = n(d);
        te !== null && G(I, te.startTime - H), ae = !1;
      }
      return ae;
    } finally {
      f = null, p = b, y = !1;
    }
  }
  var M = !1, h = null, A = -1, k = 5, N = -1;
  function _() {
    return !(e.unstable_now() - N < k);
  }
  function z() {
    if (h !== null) {
      var O = e.unstable_now();
      N = O;
      var H = !0;
      try {
        H = h(!0, O);
      } finally {
        H ? R() : (M = !1, h = null);
      }
    } else M = !1;
  }
  var R;
  if (typeof g == "function") R = function() {
    g(z);
  };
  else if (typeof MessageChannel < "u") {
    var B = new MessageChannel(), oe = B.port2;
    B.port1.onmessage = z, R = function() {
      oe.postMessage(null);
    };
  } else R = function() {
    P(z, 0);
  };
  function re(O) {
    h = O, M || (M = !0, R());
  }
  function G(O, H) {
    A = P(function() {
      O(e.unstable_now());
    }, H);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(O) {
    O.callback = null;
  }, e.unstable_continueExecution = function() {
    j || y || (j = !0, re(S));
  }, e.unstable_forceFrameRate = function(O) {
    0 > O || 125 < O ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : k = 0 < O ? Math.floor(1e3 / O) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(O) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var H = 3;
        break;
      default:
        H = p;
    }
    var b = p;
    p = H;
    try {
      return O();
    } finally {
      p = b;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(O, H) {
    switch (O) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        O = 3;
    }
    var b = p;
    p = O;
    try {
      return H();
    } finally {
      p = b;
    }
  }, e.unstable_scheduleCallback = function(O, H, b) {
    var U = e.unstable_now();
    switch (typeof b == "object" && b !== null ? (b = b.delay, b = typeof b == "number" && 0 < b ? U + b : U) : b = U, O) {
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
    return L = b + L, O = { id: v++, callback: H, priorityLevel: O, startTime: b, expirationTime: L, sortIndex: -1 }, b > U ? (O.sortIndex = b, t(d, O), n(c) === null && O === n(d) && (C ? (w(A), A = -1) : C = !0, G(I, b - U))) : (O.sortIndex = L, t(c, O), j || y || (j = !0, re(S))), O;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(O) {
    var H = p;
    return function() {
      var b = p;
      p = H;
      try {
        return O.apply(this, arguments);
      } finally {
        p = b;
      }
    };
  };
})(Ih);
bh.exports = Ih;
var Sm = bh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mm = u, ts = Sm;
function ke(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Th = /* @__PURE__ */ new Set(), oo = {};
function Yr(e, t) {
  El(e, t), El(e + "Capture", t);
}
function El(e, t) {
  for (oo[e] = t, e = 0; e < t.length; e++) Th.add(t[e]);
}
var Ws = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vi = Object.prototype.hasOwnProperty, bm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ju = {}, Zu = {};
function Im(e) {
  return Vi.call(Zu, e) ? !0 : Vi.call(Ju, e) ? !1 : bm.test(e) ? Zu[e] = !0 : (Ju[e] = !0, !1);
}
function Tm(e, t, n, r) {
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
function Am(e, t, n, r) {
  if (t === null || typeof t > "u" || Tm(e, t, n, r)) return !0;
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
var Sn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Sn[e] = new Fn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Sn[t] = new Fn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Sn[e] = new Fn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Sn[e] = new Fn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Sn[e] = new Fn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Sn[e] = new Fn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Sn[e] = new Fn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Sn[e] = new Fn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Sn[e] = new Fn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Qc = /[\-:]([a-z])/g;
function Jc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Qc,
    Jc
  );
  Sn[t] = new Fn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Qc, Jc);
  Sn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Qc, Jc);
  Sn[t] = new Fn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Sn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Sn.xlinkHref = new Fn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Sn[e] = new Fn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Zc(e, t, n, r) {
  var l = Sn.hasOwnProperty(t) ? Sn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Am(t, n, l, r) && (n = null), r || l === null ? Im(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vs = Mm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _o = Symbol.for("react.element"), tl = Symbol.for("react.portal"), nl = Symbol.for("react.fragment"), qc = Symbol.for("react.strict_mode"), Yi = Symbol.for("react.profiler"), Ah = Symbol.for("react.provider"), $h = Symbol.for("react.context"), eu = Symbol.for("react.forward_ref"), Xi = Symbol.for("react.suspense"), Gi = Symbol.for("react.suspense_list"), tu = Symbol.for("react.memo"), sr = Symbol.for("react.lazy"), Rh = Symbol.for("react.offscreen"), qu = Symbol.iterator;
function Ol(e) {
  return e === null || typeof e != "object" ? null : (e = qu && e[qu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var rn = Object.assign, pi;
function Vl(e) {
  if (pi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    pi = t && t[1] || "";
  }
  return `
` + pi + e;
}
var mi = !1;
function gi(e, t) {
  if (!e || mi) return "";
  mi = !0;
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
    mi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Vl(e) : "";
}
function $m(e) {
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
      return e = gi(e.type, !1), e;
    case 11:
      return e = gi(e.type.render, !1), e;
    case 1:
      return e = gi(e.type, !0), e;
    default:
      return "";
  }
}
function Qi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case nl:
      return "Fragment";
    case tl:
      return "Portal";
    case Yi:
      return "Profiler";
    case qc:
      return "StrictMode";
    case Xi:
      return "Suspense";
    case Gi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case $h:
      return (e.displayName || "Context") + ".Consumer";
    case Ah:
      return (e._context.displayName || "Context") + ".Provider";
    case eu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case tu:
      return t = e.displayName || null, t !== null ? t : Qi(e.type) || "Memo";
    case sr:
      t = e._payload, e = e._init;
      try {
        return Qi(e(t));
      } catch {
      }
  }
  return null;
}
function Rm(e) {
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
      return Qi(t);
    case 8:
      return t === qc ? "StrictMode" : "Mode";
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
function Nr(e) {
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
function Lh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Lm(e) {
  var t = Lh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = Lm(e));
}
function Oh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Lh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function va(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ji(e, t) {
  var n = t.checked;
  return rn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ed(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Nr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Dh(e, t) {
  t = t.checked, t != null && Zc(e, "checked", t, !1);
}
function Zi(e, t) {
  Dh(e, t);
  var n = Nr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? qi(e, t.type, n) : t.hasOwnProperty("defaultValue") && qi(e, t.type, Nr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function td(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function qi(e, t, n) {
  (t !== "number" || va(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Yl = Array.isArray;
function pl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Nr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ec(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ke(91));
  return rn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function nd(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(ke(92));
      if (Yl(n)) {
        if (1 < n.length) throw Error(ke(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Nr(n) };
}
function Ph(e, t) {
  var n = Nr(t.value), r = Nr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function sd(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _h(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function tc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? _h(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Bo, Fh = function(e) {
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
}, Om = ["Webkit", "ms", "Moz", "O"];
Object.keys(Jl).forEach(function(e) {
  Om.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Jl[t] = Jl[e];
  });
});
function Bh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Jl.hasOwnProperty(e) && Jl[e] ? ("" + t).trim() : t + "px";
}
function Uh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Bh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Dm = rn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function nc(e, t) {
  if (t) {
    if (Dm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ke(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ke(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ke(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ke(62));
  }
}
function sc(e, t) {
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
var rc = null;
function nu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var lc = null, ml = null, gl = null;
function rd(e) {
  if (e = Io(e)) {
    if (typeof lc != "function") throw Error(ke(280));
    var t = e.stateNode;
    t && (t = Qa(t), lc(e.stateNode, e.type, t));
  }
}
function Wh(e) {
  ml ? gl ? gl.push(e) : gl = [e] : ml = e;
}
function zh() {
  if (ml) {
    var e = ml, t = gl;
    if (gl = ml = null, rd(e), t) for (e = 0; e < t.length; e++) rd(t[e]);
  }
}
function Hh(e, t) {
  return e(t);
}
function Kh() {
}
var xi = !1;
function Vh(e, t, n) {
  if (xi) return e(t, n);
  xi = !0;
  try {
    return Hh(e, t, n);
  } finally {
    xi = !1, (ml !== null || gl !== null) && (Kh(), zh());
  }
}
function io(e, t) {
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
var oc = !1;
if (Ws) try {
  var Dl = {};
  Object.defineProperty(Dl, "passive", { get: function() {
    oc = !0;
  } }), window.addEventListener("test", Dl, Dl), window.removeEventListener("test", Dl, Dl);
} catch {
  oc = !1;
}
function Pm(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Zl = !1, Na = null, ka = !1, ac = null, _m = { onError: function(e) {
  Zl = !0, Na = e;
} };
function Fm(e, t, n, r, l, o, a, i, c) {
  Zl = !1, Na = null, Pm.apply(_m, arguments);
}
function Bm(e, t, n, r, l, o, a, i, c) {
  if (Fm.apply(this, arguments), Zl) {
    if (Zl) {
      var d = Na;
      Zl = !1, Na = null;
    } else throw Error(ke(198));
    ka || (ka = !0, ac = d);
  }
}
function Xr(e) {
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
function Yh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ld(e) {
  if (Xr(e) !== e) throw Error(ke(188));
}
function Um(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Xr(e), t === null) throw Error(ke(188));
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
        if (o === n) return ld(l), e;
        if (o === r) return ld(l), t;
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
function Xh(e) {
  return e = Um(e), e !== null ? Gh(e) : null;
}
function Gh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Gh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qh = ts.unstable_scheduleCallback, od = ts.unstable_cancelCallback, Wm = ts.unstable_shouldYield, zm = ts.unstable_requestPaint, un = ts.unstable_now, Hm = ts.unstable_getCurrentPriorityLevel, su = ts.unstable_ImmediatePriority, Jh = ts.unstable_UserBlockingPriority, wa = ts.unstable_NormalPriority, Km = ts.unstable_LowPriority, Zh = ts.unstable_IdlePriority, Va = null, Is = null;
function Vm(e) {
  if (Is && typeof Is.onCommitFiberRoot == "function") try {
    Is.onCommitFiberRoot(Va, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ks = Math.clz32 ? Math.clz32 : Gm, Ym = Math.log, Xm = Math.LN2;
function Gm(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ym(e) / Xm | 0) | 0;
}
var Uo = 64, Wo = 4194304;
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
function Ea(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Xl(i) : (o &= a, o !== 0 && (r = Xl(o)));
  } else a = n & ~l, a !== 0 ? r = Xl(a) : o !== 0 && (r = Xl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ks(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Qm(e, t) {
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
function Jm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - ks(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = Qm(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function ic(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function qh() {
  var e = Uo;
  return Uo <<= 1, !(Uo & 4194240) && (Uo = 64), e;
}
function yi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Mo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ks(t), e[t] = n;
}
function Zm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ks(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ru(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ks(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Ft = 0;
function ef(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var tf, lu, nf, sf, rf, cc = !1, zo = [], hr = null, fr = null, pr = null, co = /* @__PURE__ */ new Map(), uo = /* @__PURE__ */ new Map(), ar = [], qm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ad(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      hr = null;
      break;
    case "dragenter":
    case "dragleave":
      fr = null;
      break;
    case "mouseover":
    case "mouseout":
      pr = null;
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
function Pl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Io(t), t !== null && lu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function e0(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return hr = Pl(hr, e, t, n, r, l), !0;
    case "dragenter":
      return fr = Pl(fr, e, t, n, r, l), !0;
    case "mouseover":
      return pr = Pl(pr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return co.set(o, Pl(co.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, uo.set(o, Pl(uo.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function lf(e) {
  var t = Lr(e.target);
  if (t !== null) {
    var n = Xr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Yh(n), t !== null) {
          e.blockedOn = t, rf(e.priority, function() {
            nf(n);
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
    var n = uc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      rc = r, n.target.dispatchEvent(r), rc = null;
    } else return t = Io(n), t !== null && lu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function id(e, t, n) {
  oa(e) && n.delete(t);
}
function t0() {
  cc = !1, hr !== null && oa(hr) && (hr = null), fr !== null && oa(fr) && (fr = null), pr !== null && oa(pr) && (pr = null), co.forEach(id), uo.forEach(id);
}
function _l(e, t) {
  e.blockedOn === t && (e.blockedOn = null, cc || (cc = !0, ts.unstable_scheduleCallback(ts.unstable_NormalPriority, t0)));
}
function ho(e) {
  function t(l) {
    return _l(l, e);
  }
  if (0 < zo.length) {
    _l(zo[0], e);
    for (var n = 1; n < zo.length; n++) {
      var r = zo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (hr !== null && _l(hr, e), fr !== null && _l(fr, e), pr !== null && _l(pr, e), co.forEach(t), uo.forEach(t), n = 0; n < ar.length; n++) r = ar[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ar.length && (n = ar[0], n.blockedOn === null); ) lf(n), n.blockedOn === null && ar.shift();
}
var xl = Vs.ReactCurrentBatchConfig, Ca = !0;
function n0(e, t, n, r) {
  var l = Ft, o = xl.transition;
  xl.transition = null;
  try {
    Ft = 1, ou(e, t, n, r);
  } finally {
    Ft = l, xl.transition = o;
  }
}
function s0(e, t, n, r) {
  var l = Ft, o = xl.transition;
  xl.transition = null;
  try {
    Ft = 4, ou(e, t, n, r);
  } finally {
    Ft = l, xl.transition = o;
  }
}
function ou(e, t, n, r) {
  if (Ca) {
    var l = uc(e, t, n, r);
    if (l === null) bi(e, t, r, ja, n), ad(e, r);
    else if (e0(l, e, t, n, r)) r.stopPropagation();
    else if (ad(e, r), t & 4 && -1 < qm.indexOf(e)) {
      for (; l !== null; ) {
        var o = Io(l);
        if (o !== null && tf(o), o = uc(e, t, n, r), o === null && bi(e, t, r, ja, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else bi(e, t, r, null, n);
  }
}
var ja = null;
function uc(e, t, n, r) {
  if (ja = null, e = nu(r), e = Lr(e), e !== null) if (t = Xr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Yh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ja = e, null;
}
function of(e) {
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
      switch (Hm()) {
        case su:
          return 1;
        case Jh:
          return 4;
        case wa:
        case Km:
          return 16;
        case Zh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ur = null, au = null, aa = null;
function af() {
  if (aa) return aa;
  var e, t = au, n = t.length, r, l = "value" in ur ? ur.value : ur.textContent, o = l.length;
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
function cd() {
  return !1;
}
function ss(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ho : cd, this.isPropagationStopped = cd, this;
  }
  return rn(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ho);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ho);
  }, persist: function() {
  }, isPersistent: Ho }), t;
}
var Al = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, iu = ss(Al), bo = rn({}, Al, { view: 0, detail: 0 }), r0 = ss(bo), vi, Ni, Fl, Ya = rn({}, bo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Fl && (Fl && e.type === "mousemove" ? (vi = e.screenX - Fl.screenX, Ni = e.screenY - Fl.screenY) : Ni = vi = 0, Fl = e), vi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ni;
} }), ud = ss(Ya), l0 = rn({}, Ya, { dataTransfer: 0 }), o0 = ss(l0), a0 = rn({}, bo, { relatedTarget: 0 }), ki = ss(a0), i0 = rn({}, Al, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), c0 = ss(i0), u0 = rn({}, Al, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), d0 = ss(u0), h0 = rn({}, Al, { data: 0 }), dd = ss(h0), f0 = {
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
}, p0 = {
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
}, m0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function g0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = m0[e]) ? !!t[e] : !1;
}
function cu() {
  return g0;
}
var x0 = rn({}, bo, { key: function(e) {
  if (e.key) {
    var t = f0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ia(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? p0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cu, charCode: function(e) {
  return e.type === "keypress" ? ia(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ia(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), y0 = ss(x0), v0 = rn({}, Ya, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hd = ss(v0), N0 = rn({}, bo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cu }), k0 = ss(N0), w0 = rn({}, Al, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), E0 = ss(w0), C0 = rn({}, Ya, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), j0 = ss(C0), S0 = [9, 13, 27, 32], uu = Ws && "CompositionEvent" in window, ql = null;
Ws && "documentMode" in document && (ql = document.documentMode);
var M0 = Ws && "TextEvent" in window && !ql, cf = Ws && (!uu || ql && 8 < ql && 11 >= ql), fd = " ", pd = !1;
function uf(e, t) {
  switch (e) {
    case "keyup":
      return S0.indexOf(t.keyCode) !== -1;
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
function df(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var sl = !1;
function b0(e, t) {
  switch (e) {
    case "compositionend":
      return df(t);
    case "keypress":
      return t.which !== 32 ? null : (pd = !0, fd);
    case "textInput":
      return e = t.data, e === fd && pd ? null : e;
    default:
      return null;
  }
}
function I0(e, t) {
  if (sl) return e === "compositionend" || !uu && uf(e, t) ? (e = af(), aa = au = ur = null, sl = !1, e) : null;
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
      return cf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var T0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function md(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!T0[e.type] : t === "textarea";
}
function hf(e, t, n, r) {
  Wh(r), t = Sa(t, "onChange"), 0 < t.length && (n = new iu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var eo = null, fo = null;
function A0(e) {
  Ef(e, 0);
}
function Xa(e) {
  var t = ol(e);
  if (Oh(t)) return e;
}
function $0(e, t) {
  if (e === "change") return t;
}
var ff = !1;
if (Ws) {
  var wi;
  if (Ws) {
    var Ei = "oninput" in document;
    if (!Ei) {
      var gd = document.createElement("div");
      gd.setAttribute("oninput", "return;"), Ei = typeof gd.oninput == "function";
    }
    wi = Ei;
  } else wi = !1;
  ff = wi && (!document.documentMode || 9 < document.documentMode);
}
function xd() {
  eo && (eo.detachEvent("onpropertychange", pf), fo = eo = null);
}
function pf(e) {
  if (e.propertyName === "value" && Xa(fo)) {
    var t = [];
    hf(t, fo, e, nu(e)), Vh(A0, t);
  }
}
function R0(e, t, n) {
  e === "focusin" ? (xd(), eo = t, fo = n, eo.attachEvent("onpropertychange", pf)) : e === "focusout" && xd();
}
function L0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xa(fo);
}
function O0(e, t) {
  if (e === "click") return Xa(t);
}
function D0(e, t) {
  if (e === "input" || e === "change") return Xa(t);
}
function P0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Es = typeof Object.is == "function" ? Object.is : P0;
function po(e, t) {
  if (Es(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Vi.call(t, l) || !Es(e[l], t[l])) return !1;
  }
  return !0;
}
function yd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function vd(e, t) {
  var n = yd(e);
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
    n = yd(n);
  }
}
function mf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function gf() {
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
function du(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function _0(e) {
  var t = gf(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && mf(n.ownerDocument.documentElement, n)) {
    if (r !== null && du(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = vd(n, o);
        var a = vd(
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
var F0 = Ws && "documentMode" in document && 11 >= document.documentMode, rl = null, dc = null, to = null, hc = !1;
function Nd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  hc || rl == null || rl !== va(r) || (r = rl, "selectionStart" in r && du(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), to && po(to, r) || (to = r, r = Sa(dc, "onSelect"), 0 < r.length && (t = new iu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = rl)));
}
function Ko(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ll = { animationend: Ko("Animation", "AnimationEnd"), animationiteration: Ko("Animation", "AnimationIteration"), animationstart: Ko("Animation", "AnimationStart"), transitionend: Ko("Transition", "TransitionEnd") }, Ci = {}, xf = {};
Ws && (xf = document.createElement("div").style, "AnimationEvent" in window || (delete ll.animationend.animation, delete ll.animationiteration.animation, delete ll.animationstart.animation), "TransitionEvent" in window || delete ll.transitionend.transition);
function Ga(e) {
  if (Ci[e]) return Ci[e];
  if (!ll[e]) return e;
  var t = ll[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in xf) return Ci[e] = t[n];
  return e;
}
var yf = Ga("animationend"), vf = Ga("animationiteration"), Nf = Ga("animationstart"), kf = Ga("transitionend"), wf = /* @__PURE__ */ new Map(), kd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wr(e, t) {
  wf.set(e, t), Yr(t, [e]);
}
for (var ji = 0; ji < kd.length; ji++) {
  var Si = kd[ji], B0 = Si.toLowerCase(), U0 = Si[0].toUpperCase() + Si.slice(1);
  wr(B0, "on" + U0);
}
wr(yf, "onAnimationEnd");
wr(vf, "onAnimationIteration");
wr(Nf, "onAnimationStart");
wr("dblclick", "onDoubleClick");
wr("focusin", "onFocus");
wr("focusout", "onBlur");
wr(kf, "onTransitionEnd");
El("onMouseEnter", ["mouseout", "mouseover"]);
El("onMouseLeave", ["mouseout", "mouseover"]);
El("onPointerEnter", ["pointerout", "pointerover"]);
El("onPointerLeave", ["pointerout", "pointerover"]);
Yr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Yr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Yr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Yr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Yr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Yr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Gl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), W0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Gl));
function wd(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Bm(r, t, void 0, e), e.currentTarget = null;
}
function Ef(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var i = r[a], c = i.instance, d = i.currentTarget;
        if (i = i.listener, c !== o && l.isPropagationStopped()) break e;
        wd(l, i, d), o = c;
      }
      else for (a = 0; a < r.length; a++) {
        if (i = r[a], c = i.instance, d = i.currentTarget, i = i.listener, c !== o && l.isPropagationStopped()) break e;
        wd(l, i, d), o = c;
      }
    }
  }
  if (ka) throw e = ac, ka = !1, ac = null, e;
}
function Yt(e, t) {
  var n = t[xc];
  n === void 0 && (n = t[xc] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Cf(t, e, 2, !1), n.add(r));
}
function Mi(e, t, n) {
  var r = 0;
  t && (r |= 4), Cf(n, e, r, t);
}
var Vo = "_reactListening" + Math.random().toString(36).slice(2);
function mo(e) {
  if (!e[Vo]) {
    e[Vo] = !0, Th.forEach(function(n) {
      n !== "selectionchange" && (W0.has(n) || Mi(n, !1, e), Mi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Vo] || (t[Vo] = !0, Mi("selectionchange", !1, t));
  }
}
function Cf(e, t, n, r) {
  switch (of(t)) {
    case 1:
      var l = n0;
      break;
    case 4:
      l = s0;
      break;
    default:
      l = ou;
  }
  n = l.bind(null, t, n, e), l = void 0, !oc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function bi(e, t, n, r, l) {
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
        if (a = Lr(i), a === null) return;
        if (c = a.tag, c === 5 || c === 6) {
          r = o = a;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  Vh(function() {
    var d = o, v = nu(n), f = [];
    e: {
      var p = wf.get(e);
      if (p !== void 0) {
        var y = iu, j = e;
        switch (e) {
          case "keypress":
            if (ia(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = y0;
            break;
          case "focusin":
            j = "focus", y = ki;
            break;
          case "focusout":
            j = "blur", y = ki;
            break;
          case "beforeblur":
          case "afterblur":
            y = ki;
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
            y = ud;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = o0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = k0;
            break;
          case yf:
          case vf:
          case Nf:
            y = c0;
            break;
          case kf:
            y = E0;
            break;
          case "scroll":
            y = r0;
            break;
          case "wheel":
            y = j0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = d0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = hd;
        }
        var C = (t & 4) !== 0, P = !C && e === "scroll", w = C ? p !== null ? p + "Capture" : null : p;
        C = [];
        for (var g = d, x; g !== null; ) {
          x = g;
          var I = x.stateNode;
          if (x.tag === 5 && I !== null && (x = I, w !== null && (I = io(g, w), I != null && C.push(go(g, I, x)))), P) break;
          g = g.return;
        }
        0 < C.length && (p = new y(p, j, null, n, v), f.push({ event: p, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== rc && (j = n.relatedTarget || n.fromElement) && (Lr(j) || j[zs])) break e;
        if ((y || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (j = n.relatedTarget || n.toElement, y = d, j = j ? Lr(j) : null, j !== null && (P = Xr(j), j !== P || j.tag !== 5 && j.tag !== 6) && (j = null)) : (y = null, j = d), y !== j)) {
          if (C = ud, I = "onMouseLeave", w = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (C = hd, I = "onPointerLeave", w = "onPointerEnter", g = "pointer"), P = y == null ? p : ol(y), x = j == null ? p : ol(j), p = new C(I, g + "leave", y, n, v), p.target = P, p.relatedTarget = x, I = null, Lr(v) === d && (C = new C(w, g + "enter", j, n, v), C.target = x, C.relatedTarget = P, I = C), P = I, y && j) t: {
            for (C = y, w = j, g = 0, x = C; x; x = Gr(x)) g++;
            for (x = 0, I = w; I; I = Gr(I)) x++;
            for (; 0 < g - x; ) C = Gr(C), g--;
            for (; 0 < x - g; ) w = Gr(w), x--;
            for (; g--; ) {
              if (C === w || w !== null && C === w.alternate) break t;
              C = Gr(C), w = Gr(w);
            }
            C = null;
          }
          else C = null;
          y !== null && Ed(f, p, y, C, !1), j !== null && P !== null && Ed(f, P, j, C, !0);
        }
      }
      e: {
        if (p = d ? ol(d) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var S = $0;
        else if (md(p)) if (ff) S = D0;
        else {
          S = L0;
          var M = R0;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (S = O0);
        if (S && (S = S(e, d))) {
          hf(f, S, n, v);
          break e;
        }
        M && M(e, p, d), e === "focusout" && (M = p._wrapperState) && M.controlled && p.type === "number" && qi(p, "number", p.value);
      }
      switch (M = d ? ol(d) : window, e) {
        case "focusin":
          (md(M) || M.contentEditable === "true") && (rl = M, dc = d, to = null);
          break;
        case "focusout":
          to = dc = rl = null;
          break;
        case "mousedown":
          hc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          hc = !1, Nd(f, n, v);
          break;
        case "selectionchange":
          if (F0) break;
        case "keydown":
        case "keyup":
          Nd(f, n, v);
      }
      var h;
      if (uu) e: {
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
      else sl ? uf(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && (cf && n.locale !== "ko" && (sl || A !== "onCompositionStart" ? A === "onCompositionEnd" && sl && (h = af()) : (ur = v, au = "value" in ur ? ur.value : ur.textContent, sl = !0)), M = Sa(d, A), 0 < M.length && (A = new dd(A, e, null, n, v), f.push({ event: A, listeners: M }), h ? A.data = h : (h = df(n), h !== null && (A.data = h)))), (h = M0 ? b0(e, n) : I0(e, n)) && (d = Sa(d, "onBeforeInput"), 0 < d.length && (v = new dd("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = h));
    }
    Ef(f, t);
  });
}
function go(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Sa(e, t) {
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
function Ed(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var i = n, c = i.alternate, d = i.stateNode;
    if (c !== null && c === r) break;
    i.tag === 5 && d !== null && (i = d, l ? (c = io(n, o), c != null && a.unshift(go(n, c, i))) : l || (c = io(n, o), c != null && a.push(go(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var z0 = /\r\n?/g, H0 = /\u0000|\uFFFD/g;
function Cd(e) {
  return (typeof e == "string" ? e : "" + e).replace(z0, `
`).replace(H0, "");
}
function Yo(e, t, n) {
  if (t = Cd(t), Cd(e) !== t && n) throw Error(ke(425));
}
function Ma() {
}
var fc = null, pc = null;
function mc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var gc = typeof setTimeout == "function" ? setTimeout : void 0, K0 = typeof clearTimeout == "function" ? clearTimeout : void 0, jd = typeof Promise == "function" ? Promise : void 0, V0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jd < "u" ? function(e) {
  return jd.resolve(null).then(e).catch(Y0);
} : gc;
function Y0(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ii(e, t) {
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
function mr(e) {
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
function Sd(e) {
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
var $l = Math.random().toString(36).slice(2), Ms = "__reactFiber$" + $l, xo = "__reactProps$" + $l, zs = "__reactContainer$" + $l, xc = "__reactEvents$" + $l, X0 = "__reactListeners$" + $l, G0 = "__reactHandles$" + $l;
function Lr(e) {
  var t = e[Ms];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[zs] || n[Ms]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sd(e); e !== null; ) {
        if (n = e[Ms]) return n;
        e = Sd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Io(e) {
  return e = e[Ms] || e[zs], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ol(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ke(33));
}
function Qa(e) {
  return e[xo] || null;
}
var yc = [], al = -1;
function Er(e) {
  return { current: e };
}
function Xt(e) {
  0 > al || (e.current = yc[al], yc[al] = null, al--);
}
function Ht(e, t) {
  al++, yc[al] = e.current, e.current = t;
}
var kr = {}, Tn = Er(kr), Vn = Er(!1), Wr = kr;
function Cl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Yn(e) {
  return e = e.childContextTypes, e != null;
}
function ba() {
  Xt(Vn), Xt(Tn);
}
function Md(e, t, n) {
  if (Tn.current !== kr) throw Error(ke(168));
  Ht(Tn, t), Ht(Vn, n);
}
function jf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ke(108, Rm(e) || "Unknown", l));
  return rn({}, n, r);
}
function Ia(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kr, Wr = Tn.current, Ht(Tn, e), Ht(Vn, Vn.current), !0;
}
function bd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ke(169));
  n ? (e = jf(e, t, Wr), r.__reactInternalMemoizedMergedChildContext = e, Xt(Vn), Xt(Tn), Ht(Tn, e)) : Xt(Vn), Ht(Vn, n);
}
var Ds = null, Ja = !1, Ti = !1;
function Sf(e) {
  Ds === null ? Ds = [e] : Ds.push(e);
}
function Q0(e) {
  Ja = !0, Sf(e);
}
function Cr() {
  if (!Ti && Ds !== null) {
    Ti = !0;
    var e = 0, t = Ft;
    try {
      var n = Ds;
      for (Ft = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ds = null, Ja = !1;
    } catch (l) {
      throw Ds !== null && (Ds = Ds.slice(e + 1)), Qh(su, Cr), l;
    } finally {
      Ft = t, Ti = !1;
    }
  }
  return null;
}
var il = [], cl = 0, Ta = null, Aa = 0, is = [], cs = 0, zr = null, _s = 1, Fs = "";
function Ar(e, t) {
  il[cl++] = Aa, il[cl++] = Ta, Ta = e, Aa = t;
}
function Mf(e, t, n) {
  is[cs++] = _s, is[cs++] = Fs, is[cs++] = zr, zr = e;
  var r = _s;
  e = Fs;
  var l = 32 - ks(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ks(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, _s = 1 << 32 - ks(t) + l | n << l | r, Fs = o + e;
  } else _s = 1 << o | n << l | r, Fs = e;
}
function hu(e) {
  e.return !== null && (Ar(e, 1), Mf(e, 1, 0));
}
function fu(e) {
  for (; e === Ta; ) Ta = il[--cl], il[cl] = null, Aa = il[--cl], il[cl] = null;
  for (; e === zr; ) zr = is[--cs], is[cs] = null, Fs = is[--cs], is[cs] = null, _s = is[--cs], is[cs] = null;
}
var es = null, qn = null, Jt = !1, vs = null;
function bf(e, t) {
  var n = us(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Id(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, es = e, qn = mr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, es = e, qn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = zr !== null ? { id: _s, overflow: Fs } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = us(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, es = e, qn = null, !0) : !1;
    default:
      return !1;
  }
}
function vc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Nc(e) {
  if (Jt) {
    var t = qn;
    if (t) {
      var n = t;
      if (!Id(e, t)) {
        if (vc(e)) throw Error(ke(418));
        t = mr(n.nextSibling);
        var r = es;
        t && Id(e, t) ? bf(r, n) : (e.flags = e.flags & -4097 | 2, Jt = !1, es = e);
      }
    } else {
      if (vc(e)) throw Error(ke(418));
      e.flags = e.flags & -4097 | 2, Jt = !1, es = e;
    }
  }
}
function Td(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  es = e;
}
function Xo(e) {
  if (e !== es) return !1;
  if (!Jt) return Td(e), Jt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !mc(e.type, e.memoizedProps)), t && (t = qn)) {
    if (vc(e)) throw If(), Error(ke(418));
    for (; t; ) bf(e, t), t = mr(t.nextSibling);
  }
  if (Td(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ke(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              qn = mr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      qn = null;
    }
  } else qn = es ? mr(e.stateNode.nextSibling) : null;
  return !0;
}
function If() {
  for (var e = qn; e; ) e = mr(e.nextSibling);
}
function jl() {
  qn = es = null, Jt = !1;
}
function pu(e) {
  vs === null ? vs = [e] : vs.push(e);
}
var J0 = Vs.ReactCurrentBatchConfig;
function Bl(e, t, n) {
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
function Ad(e) {
  var t = e._init;
  return t(e._payload);
}
function Tf(e) {
  function t(w, g) {
    if (e) {
      var x = w.deletions;
      x === null ? (w.deletions = [g], w.flags |= 16) : x.push(g);
    }
  }
  function n(w, g) {
    if (!e) return null;
    for (; g !== null; ) t(w, g), g = g.sibling;
    return null;
  }
  function r(w, g) {
    for (w = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? w.set(g.key, g) : w.set(g.index, g), g = g.sibling;
    return w;
  }
  function l(w, g) {
    return w = vr(w, g), w.index = 0, w.sibling = null, w;
  }
  function o(w, g, x) {
    return w.index = x, e ? (x = w.alternate, x !== null ? (x = x.index, x < g ? (w.flags |= 2, g) : x) : (w.flags |= 2, g)) : (w.flags |= 1048576, g);
  }
  function a(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function i(w, g, x, I) {
    return g === null || g.tag !== 6 ? (g = Pi(x, w.mode, I), g.return = w, g) : (g = l(g, x), g.return = w, g);
  }
  function c(w, g, x, I) {
    var S = x.type;
    return S === nl ? v(w, g, x.props.children, I, x.key) : g !== null && (g.elementType === S || typeof S == "object" && S !== null && S.$$typeof === sr && Ad(S) === g.type) ? (I = l(g, x.props), I.ref = Bl(w, g, x), I.return = w, I) : (I = ma(x.type, x.key, x.props, null, w.mode, I), I.ref = Bl(w, g, x), I.return = w, I);
  }
  function d(w, g, x, I) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = _i(x, w.mode, I), g.return = w, g) : (g = l(g, x.children || []), g.return = w, g);
  }
  function v(w, g, x, I, S) {
    return g === null || g.tag !== 7 ? (g = Br(x, w.mode, I, S), g.return = w, g) : (g = l(g, x), g.return = w, g);
  }
  function f(w, g, x) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = Pi("" + g, w.mode, x), g.return = w, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case _o:
          return x = ma(g.type, g.key, g.props, null, w.mode, x), x.ref = Bl(w, null, g), x.return = w, x;
        case tl:
          return g = _i(g, w.mode, x), g.return = w, g;
        case sr:
          var I = g._init;
          return f(w, I(g._payload), x);
      }
      if (Yl(g) || Ol(g)) return g = Br(g, w.mode, x, null), g.return = w, g;
      Go(w, g);
    }
    return null;
  }
  function p(w, g, x, I) {
    var S = g !== null ? g.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return S !== null ? null : i(w, g, "" + x, I);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case _o:
          return x.key === S ? c(w, g, x, I) : null;
        case tl:
          return x.key === S ? d(w, g, x, I) : null;
        case sr:
          return S = x._init, p(
            w,
            g,
            S(x._payload),
            I
          );
      }
      if (Yl(x) || Ol(x)) return S !== null ? null : v(w, g, x, I, null);
      Go(w, x);
    }
    return null;
  }
  function y(w, g, x, I, S) {
    if (typeof I == "string" && I !== "" || typeof I == "number") return w = w.get(x) || null, i(g, w, "" + I, S);
    if (typeof I == "object" && I !== null) {
      switch (I.$$typeof) {
        case _o:
          return w = w.get(I.key === null ? x : I.key) || null, c(g, w, I, S);
        case tl:
          return w = w.get(I.key === null ? x : I.key) || null, d(g, w, I, S);
        case sr:
          var M = I._init;
          return y(w, g, x, M(I._payload), S);
      }
      if (Yl(I) || Ol(I)) return w = w.get(x) || null, v(g, w, I, S, null);
      Go(g, I);
    }
    return null;
  }
  function j(w, g, x, I) {
    for (var S = null, M = null, h = g, A = g = 0, k = null; h !== null && A < x.length; A++) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var N = p(w, h, x[A], I);
      if (N === null) {
        h === null && (h = k);
        break;
      }
      e && h && N.alternate === null && t(w, h), g = o(N, g, A), M === null ? S = N : M.sibling = N, M = N, h = k;
    }
    if (A === x.length) return n(w, h), Jt && Ar(w, A), S;
    if (h === null) {
      for (; A < x.length; A++) h = f(w, x[A], I), h !== null && (g = o(h, g, A), M === null ? S = h : M.sibling = h, M = h);
      return Jt && Ar(w, A), S;
    }
    for (h = r(w, h); A < x.length; A++) k = y(h, w, A, x[A], I), k !== null && (e && k.alternate !== null && h.delete(k.key === null ? A : k.key), g = o(k, g, A), M === null ? S = k : M.sibling = k, M = k);
    return e && h.forEach(function(_) {
      return t(w, _);
    }), Jt && Ar(w, A), S;
  }
  function C(w, g, x, I) {
    var S = Ol(x);
    if (typeof S != "function") throw Error(ke(150));
    if (x = S.call(x), x == null) throw Error(ke(151));
    for (var M = S = null, h = g, A = g = 0, k = null, N = x.next(); h !== null && !N.done; A++, N = x.next()) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var _ = p(w, h, N.value, I);
      if (_ === null) {
        h === null && (h = k);
        break;
      }
      e && h && _.alternate === null && t(w, h), g = o(_, g, A), M === null ? S = _ : M.sibling = _, M = _, h = k;
    }
    if (N.done) return n(
      w,
      h
    ), Jt && Ar(w, A), S;
    if (h === null) {
      for (; !N.done; A++, N = x.next()) N = f(w, N.value, I), N !== null && (g = o(N, g, A), M === null ? S = N : M.sibling = N, M = N);
      return Jt && Ar(w, A), S;
    }
    for (h = r(w, h); !N.done; A++, N = x.next()) N = y(h, w, A, N.value, I), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? A : N.key), g = o(N, g, A), M === null ? S = N : M.sibling = N, M = N);
    return e && h.forEach(function(z) {
      return t(w, z);
    }), Jt && Ar(w, A), S;
  }
  function P(w, g, x, I) {
    if (typeof x == "object" && x !== null && x.type === nl && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case _o:
          e: {
            for (var S = x.key, M = g; M !== null; ) {
              if (M.key === S) {
                if (S = x.type, S === nl) {
                  if (M.tag === 7) {
                    n(w, M.sibling), g = l(M, x.props.children), g.return = w, w = g;
                    break e;
                  }
                } else if (M.elementType === S || typeof S == "object" && S !== null && S.$$typeof === sr && Ad(S) === M.type) {
                  n(w, M.sibling), g = l(M, x.props), g.ref = Bl(w, M, x), g.return = w, w = g;
                  break e;
                }
                n(w, M);
                break;
              } else t(w, M);
              M = M.sibling;
            }
            x.type === nl ? (g = Br(x.props.children, w.mode, I, x.key), g.return = w, w = g) : (I = ma(x.type, x.key, x.props, null, w.mode, I), I.ref = Bl(w, g, x), I.return = w, w = I);
          }
          return a(w);
        case tl:
          e: {
            for (M = x.key; g !== null; ) {
              if (g.key === M) if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                n(w, g.sibling), g = l(g, x.children || []), g.return = w, w = g;
                break e;
              } else {
                n(w, g);
                break;
              }
              else t(w, g);
              g = g.sibling;
            }
            g = _i(x, w.mode, I), g.return = w, w = g;
          }
          return a(w);
        case sr:
          return M = x._init, P(w, g, M(x._payload), I);
      }
      if (Yl(x)) return j(w, g, x, I);
      if (Ol(x)) return C(w, g, x, I);
      Go(w, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(w, g.sibling), g = l(g, x), g.return = w, w = g) : (n(w, g), g = Pi(x, w.mode, I), g.return = w, w = g), a(w)) : n(w, g);
  }
  return P;
}
var Sl = Tf(!0), Af = Tf(!1), $a = Er(null), Ra = null, ul = null, mu = null;
function gu() {
  mu = ul = Ra = null;
}
function xu(e) {
  var t = $a.current;
  Xt($a), e._currentValue = t;
}
function kc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function yl(e, t) {
  Ra = e, mu = ul = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Kn = !0), e.firstContext = null);
}
function hs(e) {
  var t = e._currentValue;
  if (mu !== e) if (e = { context: e, memoizedValue: t, next: null }, ul === null) {
    if (Ra === null) throw Error(ke(308));
    ul = e, Ra.dependencies = { lanes: 0, firstContext: e };
  } else ul = ul.next = e;
  return t;
}
var Or = null;
function yu(e) {
  Or === null ? Or = [e] : Or.push(e);
}
function $f(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, yu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Hs(e, r);
}
function Hs(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rr = !1;
function vu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Rf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Bs(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function gr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, $t & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Hs(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, yu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Hs(e, n);
}
function ca(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ru(e, n);
  }
}
function $d(e, t) {
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
  rr = !1;
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
          var j = e, C = i;
          switch (p = t, y = n, C.tag) {
            case 1:
              if (j = C.payload, typeof j == "function") {
                f = j.call(y, f, p);
                break e;
              }
              f = j;
              break e;
            case 3:
              j.flags = j.flags & -65537 | 128;
            case 0:
              if (j = C.payload, p = typeof j == "function" ? j.call(y, f, p) : j, p == null) break e;
              f = rn({}, f, p);
              break e;
            case 2:
              rr = !0;
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
    Kr |= a, e.lanes = a, e.memoizedState = f;
  }
}
function Rd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(ke(191, l));
      l.call(r);
    }
  }
}
var To = {}, Ts = Er(To), yo = Er(To), vo = Er(To);
function Dr(e) {
  if (e === To) throw Error(ke(174));
  return e;
}
function Nu(e, t) {
  switch (Ht(vo, t), Ht(yo, e), Ht(Ts, To), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : tc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = tc(t, e);
  }
  Xt(Ts), Ht(Ts, t);
}
function Ml() {
  Xt(Ts), Xt(yo), Xt(vo);
}
function Lf(e) {
  Dr(vo.current);
  var t = Dr(Ts.current), n = tc(t, e.type);
  t !== n && (Ht(yo, e), Ht(Ts, n));
}
function ku(e) {
  yo.current === e && (Xt(Ts), Xt(yo));
}
var nn = Er(0);
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
var Ai = [];
function wu() {
  for (var e = 0; e < Ai.length; e++) Ai[e]._workInProgressVersionPrimary = null;
  Ai.length = 0;
}
var ua = Vs.ReactCurrentDispatcher, $i = Vs.ReactCurrentBatchConfig, Hr = 0, sn = null, gn = null, Nn = null, Da = !1, no = !1, No = 0, Z0 = 0;
function Mn() {
  throw Error(ke(321));
}
function Eu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Es(e[n], t[n])) return !1;
  return !0;
}
function Cu(e, t, n, r, l, o) {
  if (Hr = o, sn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ua.current = e === null || e.memoizedState === null ? ng : sg, e = n(r, l), no) {
    o = 0;
    do {
      if (no = !1, No = 0, 25 <= o) throw Error(ke(301));
      o += 1, Nn = gn = null, t.updateQueue = null, ua.current = rg, e = n(r, l);
    } while (no);
  }
  if (ua.current = Pa, t = gn !== null && gn.next !== null, Hr = 0, Nn = gn = sn = null, Da = !1, t) throw Error(ke(300));
  return e;
}
function ju() {
  var e = No !== 0;
  return No = 0, e;
}
function Ss() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Nn === null ? sn.memoizedState = Nn = e : Nn = Nn.next = e, Nn;
}
function fs() {
  if (gn === null) {
    var e = sn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = gn.next;
  var t = Nn === null ? sn.memoizedState : Nn.next;
  if (t !== null) Nn = t, gn = e;
  else {
    if (e === null) throw Error(ke(310));
    gn = e, e = { memoizedState: gn.memoizedState, baseState: gn.baseState, baseQueue: gn.baseQueue, queue: gn.queue, next: null }, Nn === null ? sn.memoizedState = Nn = e : Nn = Nn.next = e;
  }
  return Nn;
}
function ko(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ri(e) {
  var t = fs(), n = t.queue;
  if (n === null) throw Error(ke(311));
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
      if ((Hr & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var f = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = f, a = r) : c = c.next = f, sn.lanes |= v, Kr |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, Es(r, t.memoizedState) || (Kn = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, sn.lanes |= o, Kr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Li(e) {
  var t = fs(), n = t.queue;
  if (n === null) throw Error(ke(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Es(o, t.memoizedState) || (Kn = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Of() {
}
function Df(e, t) {
  var n = sn, r = fs(), l = t(), o = !Es(r.memoizedState, l);
  if (o && (r.memoizedState = l, Kn = !0), r = r.queue, Su(Ff.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Nn !== null && Nn.memoizedState.tag & 1) {
    if (n.flags |= 2048, wo(9, _f.bind(null, n, r, l, t), void 0, null), kn === null) throw Error(ke(349));
    Hr & 30 || Pf(n, t, l);
  }
  return l;
}
function Pf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = sn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, sn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function _f(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Bf(t) && Uf(e);
}
function Ff(e, t, n) {
  return n(function() {
    Bf(t) && Uf(e);
  });
}
function Bf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Es(e, n);
  } catch {
    return !0;
  }
}
function Uf(e) {
  var t = Hs(e, 1);
  t !== null && ws(t, e, 1, -1);
}
function Ld(e) {
  var t = Ss();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ko, lastRenderedState: e }, t.queue = e, e = e.dispatch = tg.bind(null, sn, e), [t.memoizedState, e];
}
function wo(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = sn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, sn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Wf() {
  return fs().memoizedState;
}
function da(e, t, n, r) {
  var l = Ss();
  sn.flags |= e, l.memoizedState = wo(1 | t, n, void 0, r === void 0 ? null : r);
}
function Za(e, t, n, r) {
  var l = fs();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (gn !== null) {
    var a = gn.memoizedState;
    if (o = a.destroy, r !== null && Eu(r, a.deps)) {
      l.memoizedState = wo(t, n, o, r);
      return;
    }
  }
  sn.flags |= e, l.memoizedState = wo(1 | t, n, o, r);
}
function Od(e, t) {
  return da(8390656, 8, e, t);
}
function Su(e, t) {
  return Za(2048, 8, e, t);
}
function zf(e, t) {
  return Za(4, 2, e, t);
}
function Hf(e, t) {
  return Za(4, 4, e, t);
}
function Kf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Vf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Za(4, 4, Kf.bind(null, t, e), n);
}
function Mu() {
}
function Yf(e, t) {
  var n = fs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Eu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Xf(e, t) {
  var n = fs();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Eu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Gf(e, t, n) {
  return Hr & 21 ? (Es(n, t) || (n = qh(), sn.lanes |= n, Kr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Kn = !0), e.memoizedState = n);
}
function q0(e, t) {
  var n = Ft;
  Ft = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = $i.transition;
  $i.transition = {};
  try {
    e(!1), t();
  } finally {
    Ft = n, $i.transition = r;
  }
}
function Qf() {
  return fs().memoizedState;
}
function eg(e, t, n) {
  var r = yr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Jf(e)) Zf(t, n);
  else if (n = $f(e, t, n, r), n !== null) {
    var l = Pn();
    ws(n, e, r, l), qf(n, t, r);
  }
}
function tg(e, t, n) {
  var r = yr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Jf(e)) Zf(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, i = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = i, Es(i, a)) {
        var c = t.interleaved;
        c === null ? (l.next = l, yu(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = $f(e, t, l, r), n !== null && (l = Pn(), ws(n, e, r, l), qf(n, t, r));
  }
}
function Jf(e) {
  var t = e.alternate;
  return e === sn || t !== null && t === sn;
}
function Zf(e, t) {
  no = Da = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function qf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ru(e, n);
  }
}
var Pa = { readContext: hs, useCallback: Mn, useContext: Mn, useEffect: Mn, useImperativeHandle: Mn, useInsertionEffect: Mn, useLayoutEffect: Mn, useMemo: Mn, useReducer: Mn, useRef: Mn, useState: Mn, useDebugValue: Mn, useDeferredValue: Mn, useTransition: Mn, useMutableSource: Mn, useSyncExternalStore: Mn, useId: Mn, unstable_isNewReconciler: !1 }, ng = { readContext: hs, useCallback: function(e, t) {
  return Ss().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: hs, useEffect: Od, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, da(
    4194308,
    4,
    Kf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return da(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return da(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ss();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ss();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = eg.bind(null, sn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ss();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ld, useDebugValue: Mu, useDeferredValue: function(e) {
  return Ss().memoizedState = e;
}, useTransition: function() {
  var e = Ld(!1), t = e[0];
  return e = q0.bind(null, e[1]), Ss().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = sn, l = Ss();
  if (Jt) {
    if (n === void 0) throw Error(ke(407));
    n = n();
  } else {
    if (n = t(), kn === null) throw Error(ke(349));
    Hr & 30 || Pf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Od(Ff.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, wo(9, _f.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ss(), t = kn.identifierPrefix;
  if (Jt) {
    var n = Fs, r = _s;
    n = (r & ~(1 << 32 - ks(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = No++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Z0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, sg = {
  readContext: hs,
  useCallback: Yf,
  useContext: hs,
  useEffect: Su,
  useImperativeHandle: Vf,
  useInsertionEffect: zf,
  useLayoutEffect: Hf,
  useMemo: Xf,
  useReducer: Ri,
  useRef: Wf,
  useState: function() {
    return Ri(ko);
  },
  useDebugValue: Mu,
  useDeferredValue: function(e) {
    var t = fs();
    return Gf(t, gn.memoizedState, e);
  },
  useTransition: function() {
    var e = Ri(ko)[0], t = fs().memoizedState;
    return [e, t];
  },
  useMutableSource: Of,
  useSyncExternalStore: Df,
  useId: Qf,
  unstable_isNewReconciler: !1
}, rg = { readContext: hs, useCallback: Yf, useContext: hs, useEffect: Su, useImperativeHandle: Vf, useInsertionEffect: zf, useLayoutEffect: Hf, useMemo: Xf, useReducer: Li, useRef: Wf, useState: function() {
  return Li(ko);
}, useDebugValue: Mu, useDeferredValue: function(e) {
  var t = fs();
  return gn === null ? t.memoizedState = e : Gf(t, gn.memoizedState, e);
}, useTransition: function() {
  var e = Li(ko)[0], t = fs().memoizedState;
  return [e, t];
}, useMutableSource: Of, useSyncExternalStore: Df, useId: Qf, unstable_isNewReconciler: !1 };
function xs(e, t) {
  if (e && e.defaultProps) {
    t = rn({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function wc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : rn({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var qa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Xr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Pn(), l = yr(e), o = Bs(r, l);
  o.payload = t, n != null && (o.callback = n), t = gr(e, o, l), t !== null && (ws(t, e, l, r), ca(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Pn(), l = yr(e), o = Bs(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = gr(e, o, l), t !== null && (ws(t, e, l, r), ca(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Pn(), r = yr(e), l = Bs(n, r);
  l.tag = 2, t != null && (l.callback = t), t = gr(e, l, r), t !== null && (ws(t, e, r, n), ca(t, e, r));
} };
function Dd(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !po(n, r) || !po(l, o) : !0;
}
function ep(e, t, n) {
  var r = !1, l = kr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = hs(o) : (l = Yn(t) ? Wr : Tn.current, r = t.contextTypes, o = (r = r != null) ? Cl(e, l) : kr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = qa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Pd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && qa.enqueueReplaceState(t, t.state, null);
}
function Ec(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, vu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = hs(o) : (o = Yn(t) ? Wr : Tn.current, l.context = Cl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (wc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && qa.enqueueReplaceState(l, l.state, null), La(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function bl(e, t) {
  try {
    var n = "", r = t;
    do
      n += $m(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Oi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Cc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var lg = typeof WeakMap == "function" ? WeakMap : Map;
function tp(e, t, n) {
  n = Bs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Fa || (Fa = !0, Lc = r), Cc(e, t);
  }, n;
}
function np(e, t, n) {
  n = Bs(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Cc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Cc(e, t), typeof r != "function" && (xr === null ? xr = /* @__PURE__ */ new Set([this]) : xr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function _d(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new lg();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = vg.bind(null, e, t, n), t.then(e, e));
}
function Fd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Bd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Bs(-1, 1), t.tag = 2, gr(n, t, 1))), n.lanes |= 1), e);
}
var og = Vs.ReactCurrentOwner, Kn = !1;
function Dn(e, t, n, r) {
  t.child = e === null ? Af(t, null, n, r) : Sl(t, e.child, n, r);
}
function Ud(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return yl(t, l), r = Cu(e, t, n, r, o, l), n = ju(), e !== null && !Kn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ks(e, t, l)) : (Jt && n && hu(t), t.flags |= 1, Dn(e, t, r, l), t.child);
}
function Wd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ou(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, sp(e, t, o, r, l)) : (e = ma(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : po, n(a, r) && e.ref === t.ref) return Ks(e, t, l);
  }
  return t.flags |= 1, e = vr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function sp(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (po(o, r) && e.ref === t.ref) if (Kn = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Kn = !0);
    else return t.lanes = e.lanes, Ks(e, t, l);
  }
  return jc(e, t, n, r, l);
}
function rp(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ht(hl, Jn), Jn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ht(hl, Jn), Jn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Ht(hl, Jn), Jn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Ht(hl, Jn), Jn |= r;
  return Dn(e, t, l, n), t.child;
}
function lp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function jc(e, t, n, r, l) {
  var o = Yn(n) ? Wr : Tn.current;
  return o = Cl(t, o), yl(t, l), n = Cu(e, t, n, r, o, l), r = ju(), e !== null && !Kn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ks(e, t, l)) : (Jt && r && hu(t), t.flags |= 1, Dn(e, t, n, l), t.child);
}
function zd(e, t, n, r, l) {
  if (Yn(n)) {
    var o = !0;
    Ia(t);
  } else o = !1;
  if (yl(t, l), t.stateNode === null) ha(e, t), ep(t, n, r), Ec(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = hs(d) : (d = Yn(n) ? Wr : Tn.current, d = Cl(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Pd(t, a, r, d), rr = !1;
    var p = t.memoizedState;
    a.state = p, La(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Vn.current || rr ? (typeof v == "function" && (wc(t, n, v, r), c = t.memoizedState), (i = rr || Dd(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Rf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : xs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = hs(c) : (c = Yn(n) ? Wr : Tn.current, c = Cl(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Pd(t, a, r, c), rr = !1, p = t.memoizedState, a.state = p, La(t, r, a, l);
    var j = t.memoizedState;
    i !== f || p !== j || Vn.current || rr ? (typeof y == "function" && (wc(t, n, y, r), j = t.memoizedState), (d = rr || Dd(t, n, d, r, p, j, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, j, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, j, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = j), a.props = r, a.state = j, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Sc(e, t, n, r, o, l);
}
function Sc(e, t, n, r, l, o) {
  lp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && bd(t, n, !1), Ks(e, t, o);
  r = t.stateNode, og.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Sl(t, e.child, null, o), t.child = Sl(t, null, i, o)) : Dn(e, t, i, o), t.memoizedState = r.state, l && bd(t, n, !0), t.child;
}
function op(e) {
  var t = e.stateNode;
  t.pendingContext ? Md(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Md(e, t.context, !1), Nu(e, t.containerInfo);
}
function Hd(e, t, n, r, l) {
  return jl(), pu(l), t.flags |= 256, Dn(e, t, n, r), t.child;
}
var Mc = { dehydrated: null, treeContext: null, retryLane: 0 };
function bc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ap(e, t, n) {
  var r = t.pendingProps, l = nn.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ht(nn, l & 1), e === null)
    return Nc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = ni(a, r, 0, null), e = Br(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = bc(n), t.memoizedState = Mc, e) : bu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return ag(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = vr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = vr(i, o) : (o = Br(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? bc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Mc, r;
  }
  return o = e.child, e = o.sibling, r = vr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function bu(e, t) {
  return t = ni({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Qo(e, t, n, r) {
  return r !== null && pu(r), Sl(t, e.child, null, n), e = bu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function ag(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Oi(Error(ke(422))), Qo(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = ni({ mode: "visible", children: r.children }, l, 0, null), o = Br(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Sl(t, e.child, null, a), t.child.memoizedState = bc(a), t.memoizedState = Mc, o);
  if (!(t.mode & 1)) return Qo(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(ke(419)), r = Oi(o, r, void 0), Qo(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Kn || i) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Hs(e, l), ws(r, e, l, -1));
    }
    return Lu(), r = Oi(Error(ke(421))), Qo(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Ng.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, qn = mr(l.nextSibling), es = t, Jt = !0, vs = null, e !== null && (is[cs++] = _s, is[cs++] = Fs, is[cs++] = zr, _s = e.id, Fs = e.overflow, zr = t), t = bu(t, r.children), t.flags |= 4096, t);
}
function Kd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), kc(e.return, t, n);
}
function Di(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function ip(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Dn(e, t, r.children, n), r = nn.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Kd(e, n, t);
      else if (e.tag === 19) Kd(e, n, t);
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
  if (Ht(nn, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Oa(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Di(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Oa(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Di(t, !0, n, null, o);
      break;
    case "together":
      Di(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ha(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ks(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Kr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ke(153));
  if (t.child !== null) {
    for (e = t.child, n = vr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function ig(e, t, n) {
  switch (t.tag) {
    case 3:
      op(t), jl();
      break;
    case 5:
      Lf(t);
      break;
    case 1:
      Yn(t.type) && Ia(t);
      break;
    case 4:
      Nu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Ht($a, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Ht(nn, nn.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ap(e, t, n) : (Ht(nn, nn.current & 1), e = Ks(e, t, n), e !== null ? e.sibling : null);
      Ht(nn, nn.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ip(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ht(nn, nn.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, rp(e, t, n);
  }
  return Ks(e, t, n);
}
var cp, Ic, up, dp;
cp = function(e, t) {
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
Ic = function() {
};
up = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Dr(Ts.current);
    var o = null;
    switch (n) {
      case "input":
        l = Ji(e, l), r = Ji(e, r), o = [];
        break;
      case "select":
        l = rn({}, l, { value: void 0 }), r = rn({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ec(e, l), r = ec(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ma);
    }
    nc(n, r);
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
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (oo.hasOwnProperty(d) ? (c != null && d === "onScroll" && Yt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
dp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ul(e, t) {
  if (!Jt) switch (e.tailMode) {
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
function cg(e, t, n) {
  var r = t.pendingProps;
  switch (fu(t), t.tag) {
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
      return Yn(t.type) && ba(), bn(t), null;
    case 3:
      return r = t.stateNode, Ml(), Xt(Vn), Xt(Tn), wu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Xo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, vs !== null && (Pc(vs), vs = null))), Ic(e, t), bn(t), null;
    case 5:
      ku(t);
      var l = Dr(vo.current);
      if (n = t.type, e !== null && t.stateNode != null) up(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(ke(166));
          return bn(t), null;
        }
        if (e = Dr(Ts.current), Xo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ms] = t, r[xo] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Yt("cancel", r), Yt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Yt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Gl.length; l++) Yt(Gl[l], r);
              break;
            case "source":
              Yt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Yt(
                "error",
                r
              ), Yt("load", r);
              break;
            case "details":
              Yt("toggle", r);
              break;
            case "input":
              ed(r, o), Yt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Yt("invalid", r);
              break;
            case "textarea":
              nd(r, o), Yt("invalid", r);
          }
          nc(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Yo(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Yo(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : oo.hasOwnProperty(a) && i != null && a === "onScroll" && Yt("scroll", r);
          }
          switch (n) {
            case "input":
              Fo(r), td(r, o, !0);
              break;
            case "textarea":
              Fo(r), sd(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ma);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = _h(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ms] = t, e[xo] = r, cp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = sc(n, r), n) {
              case "dialog":
                Yt("cancel", e), Yt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Yt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Gl.length; l++) Yt(Gl[l], e);
                l = r;
                break;
              case "source":
                Yt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Yt(
                  "error",
                  e
                ), Yt("load", e), l = r;
                break;
              case "details":
                Yt("toggle", e), l = r;
                break;
              case "input":
                ed(e, r), l = Ji(e, r), Yt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = rn({}, r, { value: void 0 }), Yt("invalid", e);
                break;
              case "textarea":
                nd(e, r), l = ec(e, r), Yt("invalid", e);
                break;
              default:
                l = r;
            }
            nc(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Uh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Fh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && ao(e, c) : typeof c == "number" && ao(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (oo.hasOwnProperty(o) ? c != null && o === "onScroll" && Yt("scroll", e) : c != null && Zc(e, o, c, a));
            }
            switch (n) {
              case "input":
                Fo(e), td(e, r, !1);
                break;
              case "textarea":
                Fo(e), sd(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Nr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? pl(e, !!r.multiple, o, !1) : r.defaultValue != null && pl(
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
      return bn(t), null;
    case 6:
      if (e && t.stateNode != null) dp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(ke(166));
        if (n = Dr(vo.current), Dr(Ts.current), Xo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ms] = t, (o = r.nodeValue !== n) && (e = es, e !== null)) switch (e.tag) {
            case 3:
              Yo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Yo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ms] = t, t.stateNode = r;
      }
      return bn(t), null;
    case 13:
      if (Xt(nn), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Jt && qn !== null && t.mode & 1 && !(t.flags & 128)) If(), jl(), t.flags |= 98560, o = !1;
        else if (o = Xo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ke(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ke(317));
            o[Ms] = t;
          } else jl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          bn(t), o = !1;
        } else vs !== null && (Pc(vs), vs = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || nn.current & 1 ? xn === 0 && (xn = 3) : Lu())), t.updateQueue !== null && (t.flags |= 4), bn(t), null);
    case 4:
      return Ml(), Ic(e, t), e === null && mo(t.stateNode.containerInfo), bn(t), null;
    case 10:
      return xu(t.type._context), bn(t), null;
    case 17:
      return Yn(t.type) && ba(), bn(t), null;
    case 19:
      if (Xt(nn), o = t.memoizedState, o === null) return bn(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Ul(o, !1);
      else {
        if (xn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = Oa(e), a !== null) {
            for (t.flags |= 128, Ul(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Ht(nn, nn.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && un() > Il && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Oa(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ul(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Jt) return bn(t), null;
        } else 2 * un() - o.renderingStartTime > Il && n !== 1073741824 && (t.flags |= 128, r = !0, Ul(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = un(), t.sibling = null, n = nn.current, Ht(nn, r ? n & 1 | 2 : n & 1), t) : (bn(t), null);
    case 22:
    case 23:
      return Ru(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Jn & 1073741824 && (bn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : bn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ke(156, t.tag));
}
function ug(e, t) {
  switch (fu(t), t.tag) {
    case 1:
      return Yn(t.type) && ba(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Ml(), Xt(Vn), Xt(Tn), wu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ku(t), null;
    case 13:
      if (Xt(nn), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ke(340));
        jl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Xt(nn), null;
    case 4:
      return Ml(), null;
    case 10:
      return xu(t.type._context), null;
    case 22:
    case 23:
      return Ru(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jo = !1, In = !1, dg = typeof WeakSet == "function" ? WeakSet : Set, He = null;
function dl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    on(e, t, r);
  }
  else n.current = null;
}
function Tc(e, t, n) {
  try {
    n();
  } catch (r) {
    on(e, t, r);
  }
}
var Vd = !1;
function hg(e, t) {
  if (fc = Ca, e = gf(), du(e)) {
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
  for (pc = { focusedElem: e, selectionRange: n }, Ca = !1, He = t; He !== null; ) if (t = He, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, He = e;
  else for (; He !== null; ) {
    t = He;
    try {
      var j = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (j !== null) {
            var C = j.memoizedProps, P = j.memoizedState, w = t.stateNode, g = w.getSnapshotBeforeUpdate(t.elementType === t.type ? C : xs(t.type, C), P);
            w.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var x = t.stateNode.containerInfo;
          x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ke(163));
      }
    } catch (I) {
      on(t, t.return, I);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, He = e;
      break;
    }
    He = t.return;
  }
  return j = Vd, Vd = !1, j;
}
function so(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Tc(t, n, o);
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
function Ac(e) {
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
function hp(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, hp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ms], delete t[xo], delete t[xc], delete t[X0], delete t[G0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function fp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Yd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || fp(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function $c(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ma));
  else if (r !== 4 && (e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null; ) $c(e, t, n), e = e.sibling;
}
function Rc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Rc(e, t, n), e = e.sibling; e !== null; ) Rc(e, t, n), e = e.sibling;
}
var Cn = null, ys = !1;
function er(e, t, n) {
  for (n = n.child; n !== null; ) pp(e, t, n), n = n.sibling;
}
function pp(e, t, n) {
  if (Is && typeof Is.onCommitFiberUnmount == "function") try {
    Is.onCommitFiberUnmount(Va, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      In || dl(n, t);
    case 6:
      var r = Cn, l = ys;
      Cn = null, er(e, t, n), Cn = r, ys = l, Cn !== null && (ys ? (e = Cn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Cn.removeChild(n.stateNode));
      break;
    case 18:
      Cn !== null && (ys ? (e = Cn, n = n.stateNode, e.nodeType === 8 ? Ii(e.parentNode, n) : e.nodeType === 1 && Ii(e, n), ho(e)) : Ii(Cn, n.stateNode));
      break;
    case 4:
      r = Cn, l = ys, Cn = n.stateNode.containerInfo, ys = !0, er(e, t, n), Cn = r, ys = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!In && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Tc(n, t, a), l = l.next;
        } while (l !== r);
      }
      er(e, t, n);
      break;
    case 1:
      if (!In && (dl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        on(n, t, i);
      }
      er(e, t, n);
      break;
    case 21:
      er(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (In = (r = In) || n.memoizedState !== null, er(e, t, n), In = r) : er(e, t, n);
      break;
    default:
      er(e, t, n);
  }
}
function Xd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new dg()), t.forEach(function(r) {
      var l = kg.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function gs(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, i = a;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            Cn = i.stateNode, ys = !1;
            break e;
          case 3:
            Cn = i.stateNode.containerInfo, ys = !0;
            break e;
          case 4:
            Cn = i.stateNode.containerInfo, ys = !0;
            break e;
        }
        i = i.return;
      }
      if (Cn === null) throw Error(ke(160));
      pp(o, a, l), Cn = null, ys = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      on(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) mp(t, e), t = t.sibling;
}
function mp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (gs(t, e), js(e), r & 4) {
        try {
          so(3, e, e.return), ei(3, e);
        } catch (C) {
          on(e, e.return, C);
        }
        try {
          so(5, e, e.return);
        } catch (C) {
          on(e, e.return, C);
        }
      }
      break;
    case 1:
      gs(t, e), js(e), r & 512 && n !== null && dl(n, n.return);
      break;
    case 5:
      if (gs(t, e), js(e), r & 512 && n !== null && dl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          ao(l, "");
        } catch (C) {
          on(e, e.return, C);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && Dh(l, o), sc(i, a);
          var d = sc(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], f = c[a + 1];
            v === "style" ? Uh(l, f) : v === "dangerouslySetInnerHTML" ? Fh(l, f) : v === "children" ? ao(l, f) : Zc(l, v, f, d);
          }
          switch (i) {
            case "input":
              Zi(l, o);
              break;
            case "textarea":
              Ph(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? pl(l, !!o.multiple, y, !1) : p !== !!o.multiple && (o.defaultValue != null ? pl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : pl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[xo] = o;
        } catch (C) {
          on(e, e.return, C);
        }
      }
      break;
    case 6:
      if (gs(t, e), js(e), r & 4) {
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
      if (gs(t, e), js(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        ho(t.containerInfo);
      } catch (C) {
        on(e, e.return, C);
      }
      break;
    case 4:
      gs(t, e), js(e);
      break;
    case 13:
      gs(t, e), js(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Au = un())), r & 4 && Xd(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (In = (d = In) || v, gs(t, e), In = d) : gs(t, e), js(e), r & 8192) {
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
                dl(p, p.return);
                var j = p.stateNode;
                if (typeof j.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, j.props = t.memoizedProps, j.state = t.memoizedState, j.componentWillUnmount();
                  } catch (C) {
                    on(r, n, C);
                  }
                }
                break;
              case 5:
                dl(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Qd(f);
                  continue;
                }
            }
            y !== null ? (y.return = p, He = y) : Qd(f);
          }
          v = v.sibling;
        }
        e: for (v = null, f = e; ; ) {
          if (f.tag === 5) {
            if (v === null) {
              v = f;
              try {
                l = f.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = f.stateNode, c = f.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Bh("display", a));
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
      gs(t, e), js(e), r & 4 && Xd(e);
      break;
    case 21:
      break;
    default:
      gs(
        t,
        e
      ), js(e);
  }
}
function js(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (fp(n)) {
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
          r.flags & 32 && (ao(l, ""), r.flags &= -33);
          var o = Yd(e);
          Rc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = Yd(e);
          $c(e, i, a);
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
function fg(e, t, n) {
  He = e, gp(e);
}
function gp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; He !== null; ) {
    var l = He, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Jo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || In;
        i = Jo;
        var d = In;
        if (Jo = a, (In = c) && !d) for (He = l; He !== null; ) a = He, c = a.child, a.tag === 22 && a.memoizedState !== null ? Jd(l) : c !== null ? (c.return = a, He = c) : Jd(l);
        for (; o !== null; ) He = o, gp(o), o = o.sibling;
        He = l, Jo = i, In = d;
      }
      Gd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, He = o) : Gd(e);
  }
}
function Gd(e) {
  for (; He !== null; ) {
    var t = He;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            In || ei(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !In) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : xs(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Rd(t, o, r);
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
              Rd(t, a, n);
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
            throw Error(ke(163));
        }
        In || t.flags & 512 && Ac(t);
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
function Qd(e) {
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
function Jd(e) {
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
            Ac(t);
          } catch (c) {
            on(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Ac(t);
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
var pg = Math.ceil, _a = Vs.ReactCurrentDispatcher, Iu = Vs.ReactCurrentOwner, ds = Vs.ReactCurrentBatchConfig, $t = 0, kn = null, pn = null, jn = 0, Jn = 0, hl = Er(0), xn = 0, Eo = null, Kr = 0, ti = 0, Tu = 0, ro = null, Hn = null, Au = 0, Il = 1 / 0, Os = null, Fa = !1, Lc = null, xr = null, Zo = !1, dr = null, Ba = 0, lo = 0, Oc = null, fa = -1, pa = 0;
function Pn() {
  return $t & 6 ? un() : fa !== -1 ? fa : fa = un();
}
function yr(e) {
  return e.mode & 1 ? $t & 2 && jn !== 0 ? jn & -jn : J0.transition !== null ? (pa === 0 && (pa = qh()), pa) : (e = Ft, e !== 0 || (e = window.event, e = e === void 0 ? 16 : of(e.type)), e) : 1;
}
function ws(e, t, n, r) {
  if (50 < lo) throw lo = 0, Oc = null, Error(ke(185));
  Mo(e, n, r), (!($t & 2) || e !== kn) && (e === kn && (!($t & 2) && (ti |= n), xn === 4 && ir(e, jn)), Xn(e, r), n === 1 && $t === 0 && !(t.mode & 1) && (Il = un() + 500, Ja && Cr()));
}
function Xn(e, t) {
  var n = e.callbackNode;
  Jm(e, t);
  var r = Ea(e, e === kn ? jn : 0);
  if (r === 0) n !== null && od(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && od(n), t === 1) e.tag === 0 ? Q0(Zd.bind(null, e)) : Sf(Zd.bind(null, e)), V0(function() {
      !($t & 6) && Cr();
    }), n = null;
    else {
      switch (ef(r)) {
        case 1:
          n = su;
          break;
        case 4:
          n = Jh;
          break;
        case 16:
          n = wa;
          break;
        case 536870912:
          n = Zh;
          break;
        default:
          n = wa;
      }
      n = Cp(n, xp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function xp(e, t) {
  if (fa = -1, pa = 0, $t & 6) throw Error(ke(327));
  var n = e.callbackNode;
  if (vl() && e.callbackNode !== n) return null;
  var r = Ea(e, e === kn ? jn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ua(e, r);
  else {
    t = r;
    var l = $t;
    $t |= 2;
    var o = vp();
    (kn !== e || jn !== t) && (Os = null, Il = un() + 500, Fr(e, t));
    do
      try {
        xg();
        break;
      } catch (i) {
        yp(e, i);
      }
    while (!0);
    gu(), _a.current = o, $t = l, pn !== null ? t = 0 : (kn = null, jn = 0, t = xn);
  }
  if (t !== 0) {
    if (t === 2 && (l = ic(e), l !== 0 && (r = l, t = Dc(e, l))), t === 1) throw n = Eo, Fr(e, 0), ir(e, r), Xn(e, un()), n;
    if (t === 6) ir(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !mg(l) && (t = Ua(e, r), t === 2 && (o = ic(e), o !== 0 && (r = o, t = Dc(e, o))), t === 1)) throw n = Eo, Fr(e, 0), ir(e, r), Xn(e, un()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(ke(345));
        case 2:
          $r(e, Hn, Os);
          break;
        case 3:
          if (ir(e, r), (r & 130023424) === r && (t = Au + 500 - un(), 10 < t)) {
            if (Ea(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Pn(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = gc($r.bind(null, e, Hn, Os), t);
            break;
          }
          $r(e, Hn, Os);
          break;
        case 4:
          if (ir(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - ks(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = un() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * pg(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = gc($r.bind(null, e, Hn, Os), r);
            break;
          }
          $r(e, Hn, Os);
          break;
        case 5:
          $r(e, Hn, Os);
          break;
        default:
          throw Error(ke(329));
      }
    }
  }
  return Xn(e, un()), e.callbackNode === n ? xp.bind(null, e) : null;
}
function Dc(e, t) {
  var n = ro;
  return e.current.memoizedState.isDehydrated && (Fr(e, t).flags |= 256), e = Ua(e, t), e !== 2 && (t = Hn, Hn = n, t !== null && Pc(t)), e;
}
function Pc(e) {
  Hn === null ? Hn = e : Hn.push.apply(Hn, e);
}
function mg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Es(o(), l)) return !1;
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
function ir(e, t) {
  for (t &= ~Tu, t &= ~ti, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ks(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Zd(e) {
  if ($t & 6) throw Error(ke(327));
  vl();
  var t = Ea(e, 0);
  if (!(t & 1)) return Xn(e, un()), null;
  var n = Ua(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ic(e);
    r !== 0 && (t = r, n = Dc(e, r));
  }
  if (n === 1) throw n = Eo, Fr(e, 0), ir(e, t), Xn(e, un()), n;
  if (n === 6) throw Error(ke(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, $r(e, Hn, Os), Xn(e, un()), null;
}
function $u(e, t) {
  var n = $t;
  $t |= 1;
  try {
    return e(t);
  } finally {
    $t = n, $t === 0 && (Il = un() + 500, Ja && Cr());
  }
}
function Vr(e) {
  dr !== null && dr.tag === 0 && !($t & 6) && vl();
  var t = $t;
  $t |= 1;
  var n = ds.transition, r = Ft;
  try {
    if (ds.transition = null, Ft = 1, e) return e();
  } finally {
    Ft = r, ds.transition = n, $t = t, !($t & 6) && Cr();
  }
}
function Ru() {
  Jn = hl.current, Xt(hl);
}
function Fr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, K0(n)), pn !== null) for (n = pn.return; n !== null; ) {
    var r = n;
    switch (fu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ba();
        break;
      case 3:
        Ml(), Xt(Vn), Xt(Tn), wu();
        break;
      case 5:
        ku(r);
        break;
      case 4:
        Ml();
        break;
      case 13:
        Xt(nn);
        break;
      case 19:
        Xt(nn);
        break;
      case 10:
        xu(r.type._context);
        break;
      case 22:
      case 23:
        Ru();
    }
    n = n.return;
  }
  if (kn = e, pn = e = vr(e.current, null), jn = Jn = t, xn = 0, Eo = null, Tu = ti = Kr = 0, Hn = ro = null, Or !== null) {
    for (t = 0; t < Or.length; t++) if (n = Or[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    Or = null;
  }
  return e;
}
function yp(e, t) {
  do {
    var n = pn;
    try {
      if (gu(), ua.current = Pa, Da) {
        for (var r = sn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Da = !1;
      }
      if (Hr = 0, Nn = gn = sn = null, no = !1, No = 0, Iu.current = null, n === null || n.return === null) {
        xn = 1, Eo = t, pn = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = jn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, f = v.tag;
          if (!(v.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Fd(a);
          if (y !== null) {
            y.flags &= -257, Bd(y, a, i, o, t), y.mode & 1 && _d(o, d, t), t = y, c = d;
            var j = t.updateQueue;
            if (j === null) {
              var C = /* @__PURE__ */ new Set();
              C.add(c), t.updateQueue = C;
            } else j.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              _d(o, d, t), Lu();
              break e;
            }
            c = Error(ke(426));
          }
        } else if (Jt && i.mode & 1) {
          var P = Fd(a);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), Bd(P, a, i, o, t), pu(bl(c, i));
            break e;
          }
        }
        o = c = bl(c, i), xn !== 4 && (xn = 2), ro === null ? ro = [o] : ro.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = tp(o, c, t);
              $d(o, w);
              break e;
            case 1:
              i = c;
              var g = o.type, x = o.stateNode;
              if (!(o.flags & 128) && (typeof g.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (xr === null || !xr.has(x)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var I = np(o, i, t);
                $d(o, I);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      kp(n);
    } catch (S) {
      t = S, pn === n && n !== null && (pn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function vp() {
  var e = _a.current;
  return _a.current = Pa, e === null ? Pa : e;
}
function Lu() {
  (xn === 0 || xn === 3 || xn === 2) && (xn = 4), kn === null || !(Kr & 268435455) && !(ti & 268435455) || ir(kn, jn);
}
function Ua(e, t) {
  var n = $t;
  $t |= 2;
  var r = vp();
  (kn !== e || jn !== t) && (Os = null, Fr(e, t));
  do
    try {
      gg();
      break;
    } catch (l) {
      yp(e, l);
    }
  while (!0);
  if (gu(), $t = n, _a.current = r, pn !== null) throw Error(ke(261));
  return kn = null, jn = 0, xn;
}
function gg() {
  for (; pn !== null; ) Np(pn);
}
function xg() {
  for (; pn !== null && !Wm(); ) Np(pn);
}
function Np(e) {
  var t = Ep(e.alternate, e, Jn);
  e.memoizedProps = e.pendingProps, t === null ? kp(e) : pn = t, Iu.current = null;
}
function kp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = ug(n, t), n !== null) {
        n.flags &= 32767, pn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        xn = 6, pn = null;
        return;
      }
    } else if (n = cg(n, t, Jn), n !== null) {
      pn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      pn = t;
      return;
    }
    pn = t = e;
  } while (t !== null);
  xn === 0 && (xn = 5);
}
function $r(e, t, n) {
  var r = Ft, l = ds.transition;
  try {
    ds.transition = null, Ft = 1, yg(e, t, n, r);
  } finally {
    ds.transition = l, Ft = r;
  }
  return null;
}
function yg(e, t, n, r) {
  do
    vl();
  while (dr !== null);
  if ($t & 6) throw Error(ke(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ke(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Zm(e, o), e === kn && (pn = kn = null, jn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Zo || (Zo = !0, Cp(wa, function() {
    return vl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ds.transition, ds.transition = null;
    var a = Ft;
    Ft = 1;
    var i = $t;
    $t |= 4, Iu.current = null, hg(e, n), mp(n, e), _0(pc), Ca = !!fc, pc = fc = null, e.current = n, fg(n), zm(), $t = i, Ft = a, ds.transition = o;
  } else e.current = n;
  if (Zo && (Zo = !1, dr = e, Ba = l), o = e.pendingLanes, o === 0 && (xr = null), Vm(n.stateNode), Xn(e, un()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Fa) throw Fa = !1, e = Lc, Lc = null, e;
  return Ba & 1 && e.tag !== 0 && vl(), o = e.pendingLanes, o & 1 ? e === Oc ? lo++ : (lo = 0, Oc = e) : lo = 0, Cr(), null;
}
function vl() {
  if (dr !== null) {
    var e = ef(Ba), t = ds.transition, n = Ft;
    try {
      if (ds.transition = null, Ft = 16 > e ? 16 : e, dr === null) var r = !1;
      else {
        if (e = dr, dr = null, Ba = 0, $t & 6) throw Error(ke(331));
        var l = $t;
        for ($t |= 4, He = e.current; He !== null; ) {
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
                    if (hp(v), v === d) {
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
              var j = o.alternate;
              if (j !== null) {
                var C = j.child;
                if (C !== null) {
                  j.child = null;
                  do {
                    var P = C.sibling;
                    C.sibling = null, C = P;
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
                so(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, He = w;
              break e;
            }
            He = o.return;
          }
        }
        var g = e.current;
        for (He = g; He !== null; ) {
          a = He;
          var x = a.child;
          if (a.subtreeFlags & 2064 && x !== null) x.return = a, He = x;
          else e: for (a = g; He !== null; ) {
            if (i = He, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  ei(9, i);
              }
            } catch (S) {
              on(i, i.return, S);
            }
            if (i === a) {
              He = null;
              break e;
            }
            var I = i.sibling;
            if (I !== null) {
              I.return = i.return, He = I;
              break e;
            }
            He = i.return;
          }
        }
        if ($t = l, Cr(), Is && typeof Is.onPostCommitFiberRoot == "function") try {
          Is.onPostCommitFiberRoot(Va, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Ft = n, ds.transition = t;
    }
  }
  return !1;
}
function qd(e, t, n) {
  t = bl(n, t), t = tp(e, t, 1), e = gr(e, t, 1), t = Pn(), e !== null && (Mo(e, 1, t), Xn(e, t));
}
function on(e, t, n) {
  if (e.tag === 3) qd(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      qd(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xr === null || !xr.has(r))) {
        e = bl(n, e), e = np(t, e, 1), t = gr(t, e, 1), e = Pn(), t !== null && (Mo(t, 1, e), Xn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function vg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Pn(), e.pingedLanes |= e.suspendedLanes & n, kn === e && (jn & n) === n && (xn === 4 || xn === 3 && (jn & 130023424) === jn && 500 > un() - Au ? Fr(e, 0) : Tu |= n), Xn(e, t);
}
function wp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Wo, Wo <<= 1, !(Wo & 130023424) && (Wo = 4194304)) : t = 1);
  var n = Pn();
  e = Hs(e, t), e !== null && (Mo(e, t, n), Xn(e, n));
}
function Ng(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), wp(e, n);
}
function kg(e, t) {
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
  r !== null && r.delete(t), wp(e, n);
}
var Ep;
Ep = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Vn.current) Kn = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Kn = !1, ig(e, t, n);
    Kn = !!(e.flags & 131072);
  }
  else Kn = !1, Jt && t.flags & 1048576 && Mf(t, Aa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ha(e, t), e = t.pendingProps;
      var l = Cl(t, Tn.current);
      yl(t, n), l = Cu(null, t, r, e, l, n);
      var o = ju();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Yn(r) ? (o = !0, Ia(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, vu(t), l.updater = qa, t.stateNode = l, l._reactInternals = t, Ec(t, r, e, n), t = Sc(null, t, r, !0, o, n)) : (t.tag = 0, Jt && o && hu(t), Dn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ha(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Eg(r), e = xs(r, e), l) {
          case 0:
            t = jc(null, t, r, e, n);
            break e;
          case 1:
            t = zd(null, t, r, e, n);
            break e;
          case 11:
            t = Ud(null, t, r, e, n);
            break e;
          case 14:
            t = Wd(null, t, r, xs(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : xs(r, l), jc(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : xs(r, l), zd(e, t, r, l, n);
    case 3:
      e: {
        if (op(t), e === null) throw Error(ke(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Rf(e, t), La(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = bl(Error(ke(423)), t), t = Hd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = bl(Error(ke(424)), t), t = Hd(e, t, r, n, l);
          break e;
        } else for (qn = mr(t.stateNode.containerInfo.firstChild), es = t, Jt = !0, vs = null, n = Af(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (jl(), r === l) {
            t = Ks(e, t, n);
            break e;
          }
          Dn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Lf(t), e === null && Nc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, mc(r, l) ? a = null : o !== null && mc(r, o) && (t.flags |= 32), lp(e, t), Dn(e, t, a, n), t.child;
    case 6:
      return e === null && Nc(t), null;
    case 13:
      return ap(e, t, n);
    case 4:
      return Nu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Sl(t, null, r, n) : Dn(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : xs(r, l), Ud(e, t, r, l, n);
    case 7:
      return Dn(e, t, t.pendingProps, n), t.child;
    case 8:
      return Dn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Dn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Ht($a, r._currentValue), r._currentValue = a, o !== null) if (Es(o.value, a)) {
          if (o.children === l.children && !Vn.current) {
            t = Ks(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            a = o.child;
            for (var c = i.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Bs(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), kc(
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
            a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), kc(a, n, t), a = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, yl(t, n), l = hs(l), r = r(l), t.flags |= 1, Dn(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = xs(r, t.pendingProps), l = xs(r.type, l), Wd(e, t, r, l, n);
    case 15:
      return sp(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : xs(r, l), ha(e, t), t.tag = 1, Yn(r) ? (e = !0, Ia(t)) : e = !1, yl(t, n), ep(t, r, l), Ec(t, r, l, n), Sc(null, t, r, !0, e, n);
    case 19:
      return ip(e, t, n);
    case 22:
      return rp(e, t, n);
  }
  throw Error(ke(156, t.tag));
};
function Cp(e, t) {
  return Qh(e, t);
}
function wg(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function us(e, t, n, r) {
  return new wg(e, t, n, r);
}
function Ou(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Eg(e) {
  if (typeof e == "function") return Ou(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === eu) return 11;
    if (e === tu) return 14;
  }
  return 2;
}
function vr(e, t) {
  var n = e.alternate;
  return n === null ? (n = us(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ma(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") Ou(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case nl:
      return Br(n.children, l, o, t);
    case qc:
      a = 8, l |= 8;
      break;
    case Yi:
      return e = us(12, n, t, l | 2), e.elementType = Yi, e.lanes = o, e;
    case Xi:
      return e = us(13, n, t, l), e.elementType = Xi, e.lanes = o, e;
    case Gi:
      return e = us(19, n, t, l), e.elementType = Gi, e.lanes = o, e;
    case Rh:
      return ni(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ah:
          a = 10;
          break e;
        case $h:
          a = 9;
          break e;
        case eu:
          a = 11;
          break e;
        case tu:
          a = 14;
          break e;
        case sr:
          a = 16, r = null;
          break e;
      }
      throw Error(ke(130, e == null ? e : typeof e, ""));
  }
  return t = us(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Br(e, t, n, r) {
  return e = us(7, e, r, t), e.lanes = n, e;
}
function ni(e, t, n, r) {
  return e = us(22, e, r, t), e.elementType = Rh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Pi(e, t, n) {
  return e = us(6, e, null, t), e.lanes = n, e;
}
function _i(e, t, n) {
  return t = us(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Cg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = yi(0), this.expirationTimes = yi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Du(e, t, n, r, l, o, a, i, c) {
  return e = new Cg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = us(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, vu(o), e;
}
function jg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: tl, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function jp(e) {
  if (!e) return kr;
  e = e._reactInternals;
  e: {
    if (Xr(e) !== e || e.tag !== 1) throw Error(ke(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Yn(t.type)) {
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
    if (Yn(n)) return jf(e, n, t);
  }
  return t;
}
function Sp(e, t, n, r, l, o, a, i, c) {
  return e = Du(n, r, !0, e, l, o, a, i, c), e.context = jp(null), n = e.current, r = Pn(), l = yr(n), o = Bs(r, l), o.callback = t ?? null, gr(n, o, l), e.current.lanes = l, Mo(e, l, r), Xn(e, r), e;
}
function si(e, t, n, r) {
  var l = t.current, o = Pn(), a = yr(l);
  return n = jp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Bs(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = gr(l, t, a), e !== null && (ws(e, l, a, o), ca(e, l, a)), a;
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
function eh(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Pu(e, t) {
  eh(e, t), (e = e.alternate) && eh(e, t);
}
function Sg() {
  return null;
}
var Mp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function _u(e) {
  this._internalRoot = e;
}
ri.prototype.render = _u.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ke(409));
  si(e, t, null, null);
};
ri.prototype.unmount = _u.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Vr(function() {
      si(null, e, null, null);
    }), t[zs] = null;
  }
};
function ri(e) {
  this._internalRoot = e;
}
ri.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = sf();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ar.length && t !== 0 && t < ar[n].priority; n++) ;
    ar.splice(n, 0, e), n === 0 && lf(e);
  }
};
function Fu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function li(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function th() {
}
function Mg(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = Wa(a);
        o.call(d);
      };
    }
    var a = Sp(t, r, e, 0, null, !1, !1, "", th);
    return e._reactRootContainer = a, e[zs] = a.current, mo(e.nodeType === 8 ? e.parentNode : e), Vr(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = Wa(c);
      i.call(d);
    };
  }
  var c = Du(e, 0, !1, null, null, !1, !1, "", th);
  return e._reactRootContainer = c, e[zs] = c.current, mo(e.nodeType === 8 ? e.parentNode : e), Vr(function() {
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
  } else a = Mg(n, t, e, l, r);
  return Wa(a);
}
tf = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Xl(t.pendingLanes);
        n !== 0 && (ru(t, n | 1), Xn(t, un()), !($t & 6) && (Il = un() + 500, Cr()));
      }
      break;
    case 13:
      Vr(function() {
        var r = Hs(e, 1);
        if (r !== null) {
          var l = Pn();
          ws(r, e, 1, l);
        }
      }), Pu(e, 1);
  }
};
lu = function(e) {
  if (e.tag === 13) {
    var t = Hs(e, 134217728);
    if (t !== null) {
      var n = Pn();
      ws(t, e, 134217728, n);
    }
    Pu(e, 134217728);
  }
};
nf = function(e) {
  if (e.tag === 13) {
    var t = yr(e), n = Hs(e, t);
    if (n !== null) {
      var r = Pn();
      ws(n, e, t, r);
    }
    Pu(e, t);
  }
};
sf = function() {
  return Ft;
};
rf = function(e, t) {
  var n = Ft;
  try {
    return Ft = e, t();
  } finally {
    Ft = n;
  }
};
lc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Zi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Qa(r);
            if (!l) throw Error(ke(90));
            Oh(r), Zi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ph(e, n);
      break;
    case "select":
      t = n.value, t != null && pl(e, !!n.multiple, t, !1);
  }
};
Hh = $u;
Kh = Vr;
var bg = { usingClientEntryPoint: !1, Events: [Io, ol, Qa, Wh, zh, $u] }, Wl = { findFiberByHostInstance: Lr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ig = { bundleType: Wl.bundleType, version: Wl.version, rendererPackageName: Wl.rendererPackageName, rendererConfig: Wl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Vs.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Xh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wl.findFiberByHostInstance || Sg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!qo.isDisabled && qo.supportsFiber) try {
    Va = qo.inject(Ig), Is = qo;
  } catch {
  }
}
ns.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bg;
ns.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fu(t)) throw Error(ke(200));
  return jg(e, t, null, n);
};
ns.createRoot = function(e, t) {
  if (!Fu(e)) throw Error(ke(299));
  var n = !1, r = "", l = Mp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Du(e, 1, !1, null, null, n, !1, r, l), e[zs] = t.current, mo(e.nodeType === 8 ? e.parentNode : e), new _u(t);
};
ns.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ke(188)) : (e = Object.keys(e).join(","), Error(ke(268, e)));
  return e = Xh(t), e = e === null ? null : e.stateNode, e;
};
ns.flushSync = function(e) {
  return Vr(e);
};
ns.hydrate = function(e, t, n) {
  if (!li(t)) throw Error(ke(200));
  return oi(null, e, t, !0, n);
};
ns.hydrateRoot = function(e, t, n) {
  if (!Fu(e)) throw Error(ke(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = Mp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Sp(t, null, e, 1, n ?? null, l, !1, o, a), e[zs] = t.current, mo(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new ri(t);
};
ns.render = function(e, t, n) {
  if (!li(t)) throw Error(ke(200));
  return oi(null, e, t, !1, n);
};
ns.unmountComponentAtNode = function(e) {
  if (!li(e)) throw Error(ke(40));
  return e._reactRootContainer ? (Vr(function() {
    oi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[zs] = null;
    });
  }), !0) : !1;
};
ns.unstable_batchedUpdates = $u;
ns.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!li(n)) throw Error(ke(200));
  if (e == null || e._reactInternals === void 0) throw Error(ke(38));
  return oi(e, t, n, !1, r);
};
ns.version = "18.3.1-next-f1338f8080-20240426";
function bp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bp);
    } catch (e) {
      console.error(e);
    }
}
bp(), Mh.exports = ns;
var As = Mh.exports, nh = As;
ya.createRoot = nh.createRoot, ya.hydrateRoot = nh.hydrateRoot;
var Ip = { exports: {} }, ai = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tg = u, Ag = Symbol.for("react.element"), $g = Symbol.for("react.fragment"), Rg = Object.prototype.hasOwnProperty, Lg = Tg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Og = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) Rg.call(t, r) && !Og.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ag, type: e, key: o, ref: a, props: l, _owner: Lg.current };
}
ai.Fragment = $g;
ai.jsx = Tp;
ai.jsxs = Tp;
Ip.exports = ai;
var s = Ip.exports;
let cr = [], Ap = 120, Fi = !1;
async function Dg() {
  if (!Fi) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Pg(n), Fi = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Fi = !0;
  }
}
function Pg(e) {
  Array.isArray(e) && (cr = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Us(e) {
  for (let t = cr.length - 1; t >= 0; t--) {
    const n = cr[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return cr.length > 0 ? {
    offsetMin: cr[0].offsetBeforeMin,
    label: cr[0].labelBefore
  } : { offsetMin: Ap, label: "LOCAL" };
}
function $p(e, t) {
  return cr.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function za(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, i] = t.split(":").map(Number);
  for (const c of cr)
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
function _g(e) {
  const { offsetMin: t, label: n } = Us(e), r = e + t * 60 * 1e3, l = new Date(r);
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
function Fg(e) {
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
function Pr(e, t = "LOCAL") {
  return t === "UTC" ? Fg(e) : _g(e);
}
function sh(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Pr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function _c(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [i, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(i) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return v;
  const f = za(e, t);
  if (f.isAmbiguous)
    return r === 2 ? f.secondOccurrenceEpoch : f.firstOccurrenceEpoch;
  const p = v - Ap * 6e4, { offsetMin: y } = Us(p);
  let j = v - y * 6e4;
  const C = Us(j);
  return C.offsetMin !== y && (j = v - C.offsetMin * 6e4), j;
}
function Bg({
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
  onResetStudio: j
}) {
  const [C, P] = u.useState(!1);
  u.useEffect(() => {
    if (!C) return;
    const S = (M) => {
      M.key === "Escape" && P(!1);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [C]);
  const w = u.useMemo(() => {
    const S = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), M = (e == null ? void 0 : e.durationMs) || 0;
    if (!S || M <= 0) return "-- ➔ --";
    const h = S + M, A = (G) => String(G).padStart(2, "0"), k = Pr(S, n), N = Pr(h, n), _ = `${k.year}-${A(k.month)}-${A(k.day)}`, z = `${A(k.hour)}:${A(k.minute)}:${A(k.second)}`, R = `${N.year}-${A(N.month)}-${A(N.day)}`, B = `${A(N.hour)}:${A(N.minute)}:${A(N.second)}`, oe = n === "UTC" ? " (UTC)" : k.label ? ` (${k.label})` : "", re = _ === R ? B : `${R} ${B}`;
    return `${_} ${z} ➔ ${re}${oe}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = u.useMemo(() => {
    const S = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (S >= 1440) {
      const M = (S / 1440).toFixed(1);
      return `(${M.endsWith(".0") ? parseInt(M, 10) : M}d / ${S}m Total)`;
    }
    return `(${S}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), x = () => {
    P(!1), j == null || j();
  }, I = C ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => P(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (S) => S.stopPropagation(), dir: "ltr", children: [
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
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: x, children: [
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
    typeof document < "u" && I && As.createPortal(I, document.body)
  ] });
}
const Qr = (e) => String(e).padStart(2, "0");
function St(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), y = Qr(p.getUTCHours()), j = Qr(p.getUTCMinutes()), C = Qr(p.getUTCSeconds()), P = l ? `${y}:${j}:${C}` : `${y}:${j}`;
    return r ? `${P} UTC` : P;
  }
  const { offsetMin: o, label: a } = Us(e), i = new Date(e + o * 60 * 1e3), c = Qr(i.getUTCHours()), d = Qr(i.getUTCMinutes()), v = Qr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Ug = 600, rh = 250, as = /* @__PURE__ */ new Map(), Rr = /* @__PURE__ */ new Map(), Fc = /* @__PURE__ */ new Set(), lh = 4;
let Nl = 0, Ns = [];
function Bc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / rh) * rh;
}
function Rp() {
  var e;
  if (!(Nl >= lh || Ns.length === 0))
    for (Ns = Ns.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Nl < lh && Ns.length > 0; ) {
      const t = Ns.pop();
      !t || (e = t.signal) != null && e.aborted || (Nl++, Wg(t));
    }
}
function ga(e, t, n, r = "mon-0") {
  const l = Bc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (as.size >= Ug) {
    const i = as.keys().next().value, c = as.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), as.delete(i);
  }
  as.set(a, n), Fc.forEach((i) => i(e, l, n, o));
}
async function Wg(e) {
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
    Nl = Math.max(0, Nl - 1), Rr.delete(t), Rp();
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
    const r = Bc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!as.has(o)) return null;
    const a = as.get(o);
    return as.delete(o), as.set(o, a), a;
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
    as.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), as.clear(), Rr.clear(), Ns = [], Nl = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Fc.add(e), () => Fc.delete(e);
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
    const l = Bc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (as.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Rr.has(a))
      return Rr.get(a);
    const i = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      Ns = Ns.filter((v) => v.hostname === e && v.displayId === o && v.key !== a ? (Rr.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        Ns = Ns.filter((v) => v.key !== a), Rr.delete(a), c(null);
      }, { once: !0 }), Ns.push(d), Rp();
    });
    return Rr.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  On.clearAll();
});
const Bu = "ITB_STUDIO_SESSION_CACHE_V2", Lp = "itb_player_audio_settings";
let Bi = null;
function zg() {
  try {
    const e = localStorage.getItem(Bu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Op(e) {
  e && (Bi && clearTimeout(Bi), Bi = setTimeout(() => {
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
      localStorage.setItem(Bu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Hg() {
  try {
    localStorage.removeItem(Bu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function kl() {
  try {
    const e = localStorage.getItem(Lp);
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
function Kg(e) {
  try {
    localStorage.setItem(Lp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let lr = null, fl = null, Ui = null, Wn = 0, Jr = 0, ea = -60, Co = 1;
function Vg() {
  if (!lr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (lr = new e());
  }
  return lr && lr.state === "suspended" && lr.resume().catch(() => {
  }), lr;
}
function Ha(e, t = 1) {
  if (!e) return null;
  Co = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Vg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(Co, n.currentTime), fl = e, Yg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function oh(e) {
  if (Co = Math.max(0, Number(e) || 1), fl != null && fl.__audioGainNode && lr)
    try {
      fl.__audioGainNode.gain.setValueAtTime(Co, lr.currentTime);
    } catch {
    }
}
function Yg() {
  if (Ui) return;
  const e = new Uint8Array(256), t = () => {
    const n = fl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Wn *= 0.85, Jr *= 0.85, Wn < 1e-3 && (Wn = 0), Jr < 1e-3 && (Jr = 0), ea = Wn > 1e-3 ? 20 * Math.log10(Wn) : -60;
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
        Wn = a > Wn ? Wn * 0.3 + a * 0.7 : Wn * 0.85 + a * 0.15, Jr = Math.max(Wn, o), ea = Wn > 1e-4 ? 20 * Math.log10(Wn) : -60;
      } catch {
        Wn = 0, Jr = 0, ea = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Wn,
        peak: Jr,
        db: ea,
        gain: Co,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Ui = requestAnimationFrame(t);
  };
  Ui = requestAnimationFrame(t);
}
function Dp({ isPlaying: e = !1 }) {
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
function Xg({
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
              onClick: (j) => {
                j.stopPropagation(), n == null || n(d);
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
function Pp({
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
    let y = 1 / 0, j = 1 / 0, C = -1 / 0, P = -1 / 0;
    e.forEach((x) => {
      const I = x.x ?? x.X ?? 0, S = x.y ?? x.Y ?? 0, M = x.width ?? x.Width ?? 1920, h = x.height ?? x.Height ?? 1080;
      y = Math.min(y, I), j = Math.min(j, S), C = Math.max(C, I + M), P = Math.max(P, S + h);
    });
    const w = Math.max(1, C - y), g = Math.max(1, P - j);
    return { minX: y, minY: j, totalW: w, totalH: g };
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
            children: e.map((y, j) => {
              const C = y.displayId ?? y.DisplayId ?? `mon-${j}`, P = (y.x ?? y.X ?? 0) - a.minX, w = (y.y ?? y.Y ?? 0) - a.minY, g = y.width ?? y.Width ?? 1920, x = y.height ?? y.Height ?? 1080, I = C === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${I ? "is-active" : ""}`,
                  onClick: (S) => {
                    S.stopPropagation(), n == null || n(C);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: P + 10,
                        y: w + 10,
                        width: Math.max(10, g - 20),
                        height: Math.max(10, x - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: P + g / 2,
                        y: w + x / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: j + 1
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
function Gg({
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
  activeAudioStationId: j = null,
  directorPlan: C = null,
  isAutoDirectorEnabled: P = !0,
  targetDisplayId: w = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: x = !1,
  hideDisplayStrip: I = !1,
  isDecoderAllowed: S = !0,
  maxHeight: M = null
}) {
  var _e;
  const h = e.hostname || e.name || e.id || "", A = Math.round(t), [k, N] = u.useState(() => !h || !A ? null : On.get(h, A) || null), [_, z] = u.useState(""), [R, B] = u.useState(!1), [oe, re] = u.useState(!1), [G, O] = u.useState(!1), H = u.useRef(l), b = u.useRef(null), U = u.useRef(0), L = u.useRef(t - a), ae = u.useRef(t - a), te = u.useRef(!1), Z = u.useRef(null), K = u.useRef(!1);
  L.current = t - a;
  const Ie = (e == null ? void 0 : e.displays) || ((_e = e == null ? void 0 : e.topology) == null ? void 0 : _e.displays) || [], [Le, Me] = u.useState(null);
  u.useEffect(() => {
    Me(null);
  }, [w]);
  const Fe = u.useMemo(() => {
    const se = C || (e == null ? void 0 : e.directorPlan);
    return !se || !se.segments || se.segments.length === 0 ? null : se.segments.find((pe) => {
      const T = pe.startEpochMs ?? pe.StartEpochMs ?? 0, J = pe.endEpochMs ?? pe.EndEpochMs ?? 0;
      return t >= T && t <= J;
    }) || se.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t]), ge = u.useMemo(() => {
    var se;
    return Le ? Le.toLowerCase() : w && w !== "auto" && w !== "director" ? w.toLowerCase() : Ie.length > 1 && P !== !1 && Fe ? (Fe.targetDisplayId || Fe.TargetDisplayId || "mon-0").toLowerCase() : (((se = Ie[0]) == null ? void 0 : se.displayId) || "mon-0").toLowerCase();
  }, [Le, w, Ie, P, Fe]), Se = u.useRef(ge), [tt, pt] = u.useState(!1);
  u.useEffect(() => {
    if (Se.current && Se.current !== ge) {
      pt(!0);
      const se = setTimeout(() => pt(!1), 2e3);
      return Se.current = ge, () => clearTimeout(se);
    }
    Se.current = ge;
  }, [ge]);
  const ce = p[e == null ? void 0 : e.id] || p[h] || (e == null ? void 0 : e.segments) || [], Ee = ce.length === 0 || ce.some((se) => {
    const pe = se.startEpochMs ?? se.startEpoch ?? 0, T = se.endEpochMs ?? se.endEpoch ?? 0;
    return t >= pe && t <= T;
  }), Ke = !!(r ? !kl().isMuted : j && (e.id === j || h === j)), We = u.useCallback(() => {
    if (!b.current) return;
    const se = kl();
    if (r)
      b.current.volume = se.volume, b.current.muted = se.isMuted, se.isMuted || Ha(b.current);
    else {
      const pe = !!(j && (e.id === j || h === j));
      b.current.muted = !pe, pe && (b.current.volume = se.volume, Ha(b.current));
    }
  }, [r, j, e.id, h]);
  u.useEffect(() => {
    We();
  }, [We]), u.useEffect(() => {
    const se = (pe) => {
      b.current && pe.detail && We();
    };
    return window.addEventListener("itb-audio-state-changed", se), () => window.removeEventListener("itb-audio-state-changed", se);
  }, [We]), u.useEffect(() => {
    b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !A || !h) return;
    if (l && S) {
      H.current = !0;
      return;
    }
    const se = H.current;
    H.current = l;
    let pe = !0;
    const T = new AbortController(), J = On.get(h, A, ge);
    if (J) {
      N(J), re(!1), O(!1);
      return;
    }
    O(!0);
    const ne = setTimeout(() => {
      pe && On.fetchFrame(h, A, T.signal, ge).then((Q) => {
        pe && (O(!1), Q && Q !== "NO_SIGNAL" ? (N(Q), re(!1)) : Q === "NO_SIGNAL" && re(!0));
      });
    }, l ? 180 : se ? 25 : 40), q = On.subscribe((Q, de, Je, Oe) => {
      Q === h && de === A && (!Oe || Oe === ge) && pe && (O(!1), Je && Je !== "NO_SIGNAL" ? (N(Je), re(!1)) : Je === "NO_SIGNAL" && re(!0));
    });
    return () => {
      pe = !1, clearTimeout(ne), T.abort(), q();
    };
  }, [h, A, n, l, r, R, ge, S]), u.useEffect(() => {
    if (!h || !(r || l && S)) {
      (!l || !S) && (Z.current && clearTimeout(Z.current), te.current = !1, z(""), B(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load()));
      return;
    }
    let pe = null;
    return l && !v && Ee ? pe = setTimeout(() => {
      const T = L.current;
      U.current = T, ae.current = T, te.current = !1;
      const J = M && M < 1080 ? `&maxHeight=${M}` : "", X = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + T}&displayId=${encodeURIComponent(ge)}${J}&_t=${Date.now()}`;
      B(!1), z(X);
    }, 80) : l || (Z.current && clearTimeout(Z.current), te.current = !1, z(""), B(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load())), () => {
      pe && clearTimeout(pe);
    };
  }, [l, r, h, a, i, v, Ee, ge, S, M]), u.useEffect(() => {
    if (!h || !(r || l)) return;
    const pe = L.current, T = Math.abs(pe - ae.current);
    if (!l || T < 800) {
      ae.current = pe;
      return;
    }
    return te.current = !0, ae.current = pe, U.current = pe, b.current && b.current.pause(), B(!1), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => {
      if (!Ee || v) {
        z(""), B(!1), te.current = !1;
        return;
      }
      const J = L.current, X = M && M < 1080 ? `&maxHeight=${M}` : "", ne = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + J}&displayId=${encodeURIComponent(ge)}${X}&_t=${Date.now()}`;
      z(ne);
    }, 75), () => {
      Z.current && clearTimeout(Z.current);
    };
  }, [t, l, r, h, a, i, v, Ee, ge, S, M]), u.useEffect(() => {
    if (r || !l || !b.current || !R || te.current) return;
    const se = (L.current - U.current) / 1e3;
    if (se >= 0) {
      const pe = b.current, T = pe.currentTime, J = Math.abs(T - se);
      if (J > 0.35 && J < 3)
        try {
          pe.currentTime = se;
        } catch {
        }
    }
  }, [r, l, t, R]), u.useEffect(() => {
    if (!r || !l || !_ || !R || v) return;
    let se = null, pe = b.current ? b.current.currentTime : 0, T = performance.now(), J = U.current + Math.round(pe * 1e3);
    const X = () => {
      const ne = b.current;
      if (ne && !ne.paused && !ne.ended && !K.current && !te.current) {
        const q = performance.now(), Q = ne.currentTime;
        Math.abs(Q - pe) > 5e-4 && (pe = Q, T = q);
        const de = Math.max(0, (q - T) / 1e3), Je = ne.playbackRate || y || 1, Oe = pe + de * Je;
        let Be = U.current + Math.round(Oe * 1e3);
        const lt = Be - J;
        if (lt < 0 && lt > -300 && (Be = J), Be >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Ze = a + Be, It = f == null ? void 0 : f.find((kt) => Ze >= kt.startEpochMs && Ze < kt.endEpochMs);
        if (It) {
          K.current = !0;
          const kt = It.endEpochMs - a;
          d(kt), U.current = kt, J = kt, ae.current = kt;
          const Tt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + kt}&_t=${Date.now()}`;
          B(!1), z(Tt), setTimeout(() => {
            K.current = !1;
          }, 300);
          return;
        }
        Be !== J && (J = Be, ae.current = Be, d == null || d(Be));
      }
      se = requestAnimationFrame(X);
    };
    return se = requestAnimationFrame(X), () => {
      se && cancelAnimationFrame(se);
    };
  }, [
    r,
    l,
    _,
    R,
    v,
    y,
    c,
    a,
    i,
    h,
    f,
    d,
    o
  ]);
  const nt = () => {
    if (K.current) return;
    const se = a + L.current, pe = ce.map((T) => ({ start: T.startEpochMs ?? T.startEpoch ?? 0, end: T.endEpochMs ?? T.endEpoch ?? 0 })).filter((T) => T.start > se + 200).sort((T, J) => T.start - J.start)[0];
    if (pe && pe.start - a < c) {
      K.current = !0;
      const T = pe.start - a;
      d(T), U.current = T;
      const J = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + T}&_t=${Date.now()}`;
      B(!1), z(J), setTimeout(() => {
        K.current = !1;
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
    (r || l) && _ && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: b,
        src: _,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: R ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: R ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !Ke,
        onLoadedData: () => {
          b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onCanPlay: () => {
          We(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y), l && b.current && b.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          te.current = !1, B(!0), We(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onWaiting: () => {
          B(!1);
        },
        onTimeUpdate: () => {
          var se;
          !R && ((se = b.current) == null ? void 0 : se.currentTime) > 0 && (te.current = !1, B(!0));
        },
        onEnded: nt
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && R && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: k && !oe ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: k,
            alt: h,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => re(!0)
          }
        ) : (!k || oe || !Ee) && !_ ? /* @__PURE__ */ s.jsx(Dp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && Ee && !R && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          h
        ] })
      ] })
    ] }) }),
    Ie.length > 1 && /* @__PURE__ */ s.jsx(
      Pp,
      {
        displays: Ie,
        activeDisplayId: ge,
        onSelectDisplay: (se) => {
          Me(se), g == null || g(se);
        },
        isTransitioning: tt,
        mode: P ? "AUTO" : "MANUAL"
      }
    ),
    !I && /* @__PURE__ */ s.jsx(
      Xg,
      {
        displays: Ie,
        activeDisplayId: ge,
        onSelectDisplay: (se) => {
          Me(se), g == null || g(se);
        },
        areAllDisplaysPlaced: x,
        isAutoDirectorEnabled: P
      }
    )
  ] });
}
function Qg({
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
  onOpenSpotlight: j,
  onSelectActiveStation: C,
  recordingSegments: P = {},
  playbackSpeed: w = 1,
  activeAudioStationId: g = null,
  onSoloAudio: x,
  directorPlan: I = null,
  isAutoDirectorEnabled: S = !0,
  targetDisplayId: M = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: k = 0,
  borderColor: N = null,
  onSwapWithNext: _ = null,
  isDecoderAllowed: z = !0,
  maxHeight: R = null
}) {
  var b;
  const B = !!(g && (e.id === g || e.hostname && e.hostname === g)), oe = (e.hostname || e.name || "").includes("Offline"), re = oe ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((b = e == null ? void 0 : e.topology) == null ? void 0 : b.displays) || []).length > 1;
  const O = () => {
    if (t) {
      const U = M && M !== "auto" && M !== "director" ? M : null;
      j && j(e.id, U);
    } else
      C && C(e.id);
  }, H = (U) => {
    U.preventDefault(), U.stopPropagation(), t && C && (i && i(!1), C(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: O,
      onContextMenu: H,
      className: `camera-card ${re} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${re}` }),
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
            x && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${B ? "audio-active" : ""}`,
                onClick: (U) => {
                  U.stopPropagation(), x(B ? null : e.id);
                },
                title: B ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: B ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            j && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (U) => {
                  U.stopPropagation();
                  const L = M && M !== "auto" && M !== "director" ? M : null;
                  j(e.id, L);
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
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${oe ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Gg,
            {
              station: e,
              currentEpochMs: l,
              isOffline: oe,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: i,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: v,
              setPlayheadMs: f,
              isSpotlightActive: p,
              globalGaps: y,
              recordingSegments: P,
              playbackSpeed: w,
              activeAudioStationId: g,
              directorPlan: I,
              isAutoDirectorEnabled: S,
              targetDisplayId: M,
              onSelectDisplayId: h,
              areAllDisplaysPlaced: A,
              hideDisplayStrip: !0,
              isDecoderAllowed: z,
              maxHeight: R
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
        !oe && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
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
const Ql = ["top-right", "bottom-right", "bottom-left", "top-left"];
function _p(e) {
  if (!e || typeof e != "string")
    return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
  const t = e.trim().toLowerCase();
  if (Ql.includes(t)) {
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
function Jg(e) {
  const t = _p(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Zg({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var z;
  const r = u.useRef(null), l = u.useRef(null), [o, a] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), i = t || o, c = _p(i), [d, v] = u.useState(!1), [f, p] = u.useState(null);
  u.useEffect(() => {
    d || (c.isCustom ? p({ xPct: c.xPct, yPct: c.yPct }) : p(null));
  }, [i, d, c.isCustom, c.xPct, c.yPct]);
  const y = u.useCallback((R) => {
    R && (R.preventDefault(), R.stopPropagation());
    let B;
    if (c.isCustom || !Ql.includes(c.preset))
      B = "top-right";
    else {
      const re = (Ql.indexOf(c.preset) + 1) % Ql.length;
      B = Ql[re];
    }
    a(B), p(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", B);
    } catch {
    }
    n && n(B);
  }, [c.isCustom, c.preset, n]), j = u.useCallback((R) => {
    if (R.button !== void 0 && R.button !== 0 || R.target.closest(".btn-cycle-corner")) return;
    const B = r.current;
    if (!B) return;
    const oe = B.parentElement;
    if (!oe) return;
    const re = B.getBoundingClientRect(), G = oe.getBoundingClientRect();
    l.current = {
      startX: R.clientX,
      startY: R.clientY,
      clockWidth: re.width,
      clockHeight: re.height,
      parentRect: G,
      offsetX: R.clientX - re.left,
      offsetY: R.clientY - re.top,
      hasMoved: !1
    };
    const O = (b) => {
      if (!l.current) return;
      const U = l.current, L = Math.hypot(b.clientX - U.startX, b.clientY - U.startY);
      if (!U.hasMoved && L > 4 && (U.hasMoved = !0, v(!0)), !U.hasMoved) return;
      const ae = U.parentRect.width, te = U.parentRect.height, Z = Math.max(1, ae - U.clockWidth - 28), K = Math.max(1, te - U.clockHeight - 28), Ie = b.clientX - U.parentRect.left - U.offsetX - 14, Le = b.clientY - U.parentRect.top - U.offsetY - 14, Me = Math.max(0, Math.min(Z, Ie)), Fe = Math.max(0, Math.min(K, Le)), ge = Math.round(Me / Z * 1e3) / 10, Se = Math.round(Fe / K * 1e3) / 10;
      p({ xPct: ge, yPct: Se });
    }, H = (b) => {
      window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", H);
      const U = l.current;
      if (l.current = null, v(!1), !U) return;
      if (!U.hasMoved) {
        y();
        return;
      }
      const L = Math.max(1, U.parentRect.width - U.clockWidth - 28), ae = Math.max(1, U.parentRect.height - U.clockHeight - 28), te = b.clientX - U.parentRect.left - U.offsetX - 14, Z = b.clientY - U.parentRect.top - U.offsetY - 14, K = Math.max(0, Math.min(L, te)), Ie = Math.max(0, Math.min(ae, Z)), Le = K / L * 100, Me = Ie / ae * 100;
      let Fe;
      Le > 94 && Me < 6 ? Fe = "top-right" : Le < 6 && Me < 6 ? Fe = "top-left" : Le > 94 && Me > 94 ? Fe = "bottom-right" : Le < 6 && Me > 94 ? Fe = "bottom-left" : Fe = `custom:${Le.toFixed(1)},${Me.toFixed(1)}`, a(Fe);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", Fe);
      } catch {
      }
      n && n(Fe);
    };
    window.addEventListener("pointermove", O), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", H);
  }, [y, n]), C = new Date(e || Date.now()), P = C.getUTCFullYear(), w = String(C.getUTCMonth() + 1).padStart(2, "0"), g = String(C.getUTCDate()).padStart(2, "0"), x = String(C.getUTCHours()).padStart(2, "0"), I = String(C.getUTCMinutes()).padStart(2, "0"), S = String(C.getUTCSeconds()).padStart(2, "0"), M = `${P}-${w}-${g}`, h = `${x}:${I}:${S} UTC`, A = f !== null || c.isCustom, k = f || (c.isCustom ? { xPct: c.xPct, yPct: c.yPct } : null);
  let N;
  if (k) {
    const R = k.xPct / 100, B = k.yPct / 100;
    N = {
      left: `calc(14px + (100% - 28px) * ${R})`,
      top: `calc(14px + (100% - 28px) * ${B})`,
      transform: `translate(-${k.xPct}%, -${k.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const _ = !A && c.preset ? `corner-${c.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${_} ${d ? "is-dragging" : ""} ${A ? "is-custom" : ""}`,
      style: N,
      onPointerDown: j,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: M }),
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
            title: A ? `Custom Position (${Math.round((k == null ? void 0 : k.xPct) || 0)}%, ${Math.round((k == null ? void 0 : k.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((z = c.preset) == null ? void 0 : z.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function qg() {
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
function ex(e) {
  const t = tn(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function tx(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function nx({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var C, P, w, g, x, I;
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
    return ((C = l.layout) == null ? void 0 : C.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((P = l.layout) == null ? void 0 : P.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((w = o.layout) == null ? void 0 : w.placements) || n;
  if (i === "cut")
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const d = (t - c) / a, v = tn(d, 0, 1), f = i === "linear" ? v : ex(v), p = ((x = l.layout) == null ? void 0 : x.placements) || [], y = ((I = o.layout) == null ? void 0 : I.placements) || [], j = y.map((S) => {
    const M = p.find((z) => z.stationId === S.stationId && z.displayId === S.displayId);
    if (!M)
      return {
        ...S,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(M.x + (S.x - M.x) * f), A = Math.round(M.y + (S.y - M.y) * f), k = Math.round(M.width + (S.width - M.width) * f), N = Math.round(M.height + (S.height - M.height) * f), _ = Number(((M.rotation || 0) + ((S.rotation || 0) - (M.rotation || 0)) * f).toFixed(1));
    return {
      ...S,
      x: h,
      y: A,
      width: k,
      height: N,
      rotation: _,
      opacity: 1
    };
  });
  return p.forEach((S) => {
    y.some((h) => h.stationId === S.stationId && h.displayId === S.displayId) || j.push({
      ...S,
      opacity: Math.max(0, 1 - f)
    });
  }), j;
}
function sx({
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
    const j = {
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
      nextTimeline: { ...e || {}, keyframes: [j] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: j
    };
  }
  const d = c.findIndex((j) => Math.abs(j.timestampEpochMs - n) <= l);
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
  }, f = [...c, v].sort((j, C) => j.timestampEpochMs - C.timestampEpochMs), p = f.findIndex((j) => j.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: f },
    newIndex: p >= 0 ? p : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function Uc(e, t, { transitionType: n, transitionDurationSec: r }) {
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
function rx(e, t) {
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
function ah(e, t, n, r = 500) {
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
function lx(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
const Fp = 4;
function ox(e, t) {
  return !t || t <= 0 ? null : t <= 360 ? 360 : t <= 540 ? 480 : t <= 750 ? 720 : null;
}
function ax(e, {
  maxConcurrentDecoders: t = Fp,
  activeAudioStationId: n = null,
  selectedFeedIndex: r = null,
  hoveredFeedIndex: l = null
} = {}) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  if (e.length <= t)
    return e.map(() => !0);
  const a = e.map((c, d) => {
    var C, P;
    const v = c.width || 1920, f = c.height || 1080;
    let p = v * f;
    const y = (c.stationId || c.hostname || ((C = c.station) == null ? void 0 : C.id) || ((P = c.station) == null ? void 0 : P.hostname) || "").toLowerCase(), j = (n || "").toLowerCase();
    return j && (y === j || y.includes(j) || j.includes(y)) && (p += 1e8), r === d && (p += 5e7), l === d && (p += 25e6), { idx: d, score: p };
  });
  a.sort((c, d) => d.score - c.score);
  const i = new Set(a.slice(0, t).map((c) => c.idx));
  return e.map((c, d) => i.has(d));
}
const os = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 1920, h: 1080 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 3840, h: 1080 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 2560, h: 1080 },
  { id: "16:10", label: "16:10 WUXGA", ratio: 16 / 10, w: 1920, h: 1200 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1440, h: 1080 }
], Wc = 1920, zc = 1080, jt = [
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
], ix = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function cx(e, t, n) {
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
function Zr(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
function or(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let i, c, d, v;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), v = t), { x: d, y: v, width: i, height: c };
}
function tr(e, t = Wc, n = zc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: f, width: p, height: y } = or(0, 0, t, n, d);
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
      borderColor: jt[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: p, y, width: j, height: C } = or(v * c, 0, c, n, f);
      return {
        ...d,
        x: p,
        y,
        width: j,
        height: C,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: f,
        aspectRatio: f,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: jt[v % jt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const p = Math.round(t / 3);
      return e.slice(0, 3).map((y, j) => {
        const C = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: P, y: w, width: g, height: x } = or(j * p, 0, p, n, C);
        return {
          ...y,
          x: P,
          y: w,
          width: g,
          height: x,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: C,
          aspectRatio: C,
          zIndex: j,
          rotation: 0,
          borderWidth: 2,
          borderColor: jt[j % jt.length],
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
      const j = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: C, cy: P } = f[y], { x: w, y: g, width: x, height: I } = or(C, P, d, v, j);
      return {
        ...p,
        x: w,
        y: g,
        width: x,
        height: I,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: j,
        aspectRatio: j,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: jt[y % jt.length],
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
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: j, cy: C } = v[p], { x: P, y: w, width: g, height: x } = or(j, C, c, d, y);
      return {
        ...f,
        x: P,
        y: w,
        width: g,
        height: x,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: p,
        rotation: 0,
        borderWidth: 2,
        borderColor: jt[p % jt.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), i = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, f = Math.floor(d / l), p = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: j, width: C, height: P } = or(v * a, f * i, a, i, p);
    return {
      ...c,
      x: y,
      y: j,
      width: C,
      height: P,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: p,
      aspectRatio: p,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: jt[d % jt.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function ux({
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
  setIsPlaying: j,
  totalDurationMs: C,
  inPointMs: P = 0,
  outPointMs: w,
  setPlayheadMs: g,
  globalGaps: x = [],
  recordingSegments: I = {},
  playbackSpeed: S = 1,
  onChangePlaybackSpeed: M,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: k = null,
  onOverrideDisplay: N,
  onResetOverride: _,
  compositionLayout: z = "canvas",
  onChangeCompositionLayout: R,
  isAutoDirectorEnabled: B = !0,
  onToggleAutoDirector: oe,
  onUpdateCanvasLayout: re,
  canvasLayoutTimeline: G = null,
  onUpdateCanvasLayoutTimeline: O,
  activeKfIndex: H = 0,
  setActiveKfIndex: b,
  isModalOpen: U = !1,
  isGridFullscreen: L = void 0,
  onToggleGridFullscreen: ae = null
}) {
  const te = f > 0 ? f : d + v, [Z, K] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Ie, Le] = u.useState(() => {
    var m;
    return ((m = t[0]) == null ? void 0 : m.id) || null;
  }), [Me, Fe] = u.useState(!1), [ge, Se] = u.useState(null), [tt, pt] = u.useState({ index: null, position: null }), [ce, Ee] = u.useState(!1), [Ke, We] = u.useState(!1), [nt, _e] = u.useState(!1), [se, pe] = u.useState(!1), [T, J] = u.useState(""), [X, ne] = u.useState(""), q = u.useRef(null), [Q, de] = u.useState(() => {
    try {
      const m = localStorage.getItem("itb_canvas_saved_presets");
      return m ? JSON.parse(m) : [];
    } catch {
      return [];
    }
  }), Je = (m) => {
    de(m);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(m));
    } catch {
    }
  }, [Oe, Be] = u.useState(!1), lt = L !== void 0 ? L : Oe, [Ze, It] = u.useState(!1);
  u.useRef(null);
  const kt = u.useRef(null), Tt = u.useRef(null), Lt = u.useRef(null), [qe, xt] = u.useState({ width: 960, height: 540 }), [ze, Re] = u.useState(null), [vt, At] = u.useState(!1), [Gt, Kt] = u.useState(null), [dn, De] = u.useState(""), $e = u.useRef(null), [st, ue] = u.useState("");
  u.useEffect(() => {
    Gt !== null && $e.current && ($e.current.focus(), $e.current.select());
  }, [Gt]), u.useEffect(() => {
    const m = (E) => {
      E.key === "Escape" && (At(!1), Re(null));
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, []);
  const [rt, V] = u.useState(!1), [fe, xe] = u.useState(!1), [Ue, Ge] = u.useState(!1), [at, ht] = u.useState(!1), [Qe, Nt] = u.useState(!1), [Et, Bt] = u.useState({ vertical: null, horizontal: null }), [Ot, an] = u.useState(!0), [An, wn] = u.useState(!0), [Bn, $s] = u.useState(null), [Dt, Rs] = u.useState({ x: 0, y: 0, isInside: !1 }), Ys = u.useRef(null), Zt = u.useRef(null), $n = u.useRef(!1), [ln, Qt] = u.useState("auto-grid"), Vt = u.useRef([]), rs = u.useRef([]), ls = u.useRef(null), [, Xs] = u.useState(0), Cs = u.useRef(null), [mn, jr] = u.useState(null), yn = u.useCallback((m, E = "success", D = "💾") => {
    Cs.current && clearTimeout(Cs.current), jr({ text: m, type: E, icon: D }), Cs.current = setTimeout(() => {
      jr(null), Cs.current = null;
    }, 2200);
  }, []), [wt, ps] = u.useState(() => {
    var D, ee, Y, W, ie, be;
    const m = (Y = (ee = (D = G == null ? void 0 : G.keyframes) == null ? void 0 : D[0]) == null ? void 0 : ee.layout) == null ? void 0 : Y.width, E = (be = (ie = (W = G == null ? void 0 : G.keyframes) == null ? void 0 : W[0]) == null ? void 0 : ie.layout) == null ? void 0 : be.height;
    if (m && E) {
      const ye = os.find((je) => je.w === m && je.h === E);
      if (ye) return ye.id;
    }
    return "16:9";
  }), [Gn, Sr] = u.useState(() => {
    try {
      const m = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (m !== null) return m === "true";
    } catch {
    }
    return !1;
  }), Ao = u.useCallback(() => {
    Sr((m) => {
      const E = !m;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(E));
      } catch {
      }
      return E;
    });
  }, []), Gs = u.useMemo(() => os.find((m) => m.id === wt) || os[0], [wt]), Te = Gs.w, Pe = Gs.h, ms = Gs.ratio, $o = u.useMemo(() => {
    const m = [], E = Te >= 3e3 ? 200 : 100, D = E / 2, ee = E / 10;
    for (let Y = 0; Y <= Te; Y += ee) {
      const W = Y % E === 0, ie = !W && Y % D === 0;
      m.push({ val: Y, isMajor: W, isMed: ie });
    }
    return m;
  }, [Te]), Ro = u.useMemo(() => {
    const m = [];
    for (let Y = 0; Y <= Pe; Y += 10) {
      const W = Y % 100 === 0, ie = !W && Y % 50 === 0;
      m.push({ val: Y, isMajor: W, isMed: ie });
    }
    return m;
  }, [Pe]), Lo = u.useCallback((m) => {
    const E = Ys.current || Tt.current;
    if (!E) return;
    const D = E.getBoundingClientRect(), ee = tn(Math.round((m.clientX - D.left) / D.width * Te), 0, Te), Y = tn(Math.round((m.clientY - D.top) / D.height * Pe), 0, Pe);
    Rs({ x: ee, y: Y, isInside: !0 });
  }, [Te, Pe]), ii = u.useCallback(() => {
    Rs((m) => ({ ...m, isInside: !1 }));
  }, []), Ls = u.useCallback(() => {
    const m = Lt.current;
    if (!m) return;
    const E = m.getBoundingClientRect(), ee = Math.max(320, Math.floor(E.width || 960) - 104 - 16), Y = Math.max(180, Math.floor(E.height || 540) - 16);
    let W, ie;
    Gn ? (W = ee, ie = Math.round(W / ms)) : ee / Y >= ms ? (ie = Y, W = Math.round(ie * ms)) : (W = ee, ie = Math.round(W / ms)), xt((be) => be.width === W && be.height === ie ? be : { width: W, height: ie });
  }, [Gn, ms]);
  u.useEffect(() => {
    const m = Lt.current;
    if (!m) return;
    Ls();
    let E = null;
    return typeof ResizeObserver < "u" && (E = new ResizeObserver(() => {
      Ls();
    }), E.observe(m)), window.addEventListener("resize", Ls), () => {
      E && E.disconnect(), window.removeEventListener("resize", Ls);
    };
  }, [Ls]);
  const vn = u.useMemo(() => (t && t.length > 0 ? t : n).map((E) => {
    const D = E.displays && E.displays.length > 0 ? E.displays : E.topology && E.topology.displays && E.topology.displays.length > 0 ? E.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: E.width || 1920, height: E.height || 1080 }], ee = D.find((ye) => ye.isPrimary) || D[0], Y = ee.width || ee.Width || E.width || 1920, W = ee.height || ee.Height || E.height || 1080, ie = Y && W ? Y / W : 16 / 9, be = D.length > 1;
    return {
      stationId: E.id,
      displayId: "auto",
      label: `${E.displayName || E.roleAlias || E.hostname || E.name} - ${be ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: E.displayName || E.roleAlias || E.hostname || E.name,
      stationHostname: E.hostname || E.id,
      isPrimary: !0,
      sourceWidth: Y,
      sourceHeight: W,
      nativeAspectRatio: ie,
      aspectRatio: ie,
      width: Y,
      height: W
    };
  }), [t, n]), hn = u.useMemo(() => {
    const m = t && t.length > 0 ? t : n, E = [];
    return m.forEach((D) => {
      const ee = D.displays && D.displays.length > 0 ? D.displays : D.topology && D.topology.displays && D.topology.displays.length > 0 ? D.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: D.width || 1920, height: D.height || 1080 }], Y = ee.find((ye) => ye.isPrimary) || ee[0], W = Y.width || Y.Width || D.width || 1920, ie = Y.height || Y.Height || D.height || 1080, be = W / ie;
      E.push({
        stationId: D.id,
        displayId: "auto",
        label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${ee.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: D.displayName || D.roleAlias || D.hostname || D.name,
        stationHostname: D.hostname || D.id,
        isPrimary: !0,
        sourceWidth: W,
        sourceHeight: ie,
        nativeAspectRatio: be,
        aspectRatio: be,
        width: W,
        height: ie
      }), ee.length > 1 && ee.forEach((ye, je) => {
        const mt = (ye.displayId || `mon-${je}`).toLowerCase(), ut = ye.displayNumber || je + 1, dt = ye.displayName || `Screen ${ut}`, ve = ye.width || ye.Width || D.width || 1920, it = ye.height || ye.Height || D.height || 1080, Pt = ve / it;
        E.push({
          stationId: D.id,
          displayId: mt,
          label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${dt}`,
          stationName: D.displayName || D.roleAlias || D.hostname || D.name,
          stationHostname: D.hostname || D.id,
          isPrimary: !!ye.isPrimary,
          sourceWidth: ve,
          sourceHeight: it,
          nativeAspectRatio: Pt,
          aspectRatio: Pt,
          width: ve,
          height: it
        });
      });
    }), E;
  }, [t, n]), [fn, cn] = u.useState(() => {
    var m;
    if (((m = G == null ? void 0 : G.keyframes) == null ? void 0 : m.length) > 0) {
      const E = JSON.parse(JSON.stringify(G));
      if (t && t.length > 0) {
        const D = new Set(t.map((Y) => Y.id));
        if (E.keyframes.forEach((Y) => {
          var W, ie;
          ((ie = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ie.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((be) => D.has(be.stationId)));
        }), E.keyframes.some((Y) => {
          var W, ie;
          return ((ie = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ie.length) > 0;
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
            width: Wc,
            height: zc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: tr(vn, Wc, zc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var m;
    if (((m = G == null ? void 0 : G.keyframes) == null ? void 0 : m.length) > 0) {
      const E = JSON.parse(JSON.stringify(G));
      if (t && t.length > 0) {
        const ee = new Set(t.map((Y) => Y.id));
        E.keyframes.forEach((Y) => {
          var W, ie;
          ((ie = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ie.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((be) => ee.has(be.stationId)));
        });
      }
      cn(E), E.keyframes.some((ee) => {
        var Y, W;
        return ((W = (Y = ee.layout) == null ? void 0 : Y.placements) == null ? void 0 : W.length) > 0;
      }) && ($n.current = !0, Qt("custom"));
    }
  }, [G, t]);
  const En = fn.keyframes || [], Rl = u.useMemo(() => tx(En, te), [En, te]), $ = tn(
    H ?? Rl,
    0,
    Math.max(0, En.length - 1)
  ), le = En[$] || En[Rl] || En[0], F = u.useMemo(() => {
    var m;
    return ((m = le == null ? void 0 : le.layout) == null ? void 0 : m.placements) || [];
  }, [le]);
  u.useEffect(() => {
    ze >= 0 && F[ze] ? ue(F[ze].label ?? "") : ue("");
  }, [ze, F]);
  const me = u.useCallback((m = "Action") => ({
    label: m,
    timeline: JSON.parse(JSON.stringify(fn)),
    aspectId: wt,
    presetId: ln,
    selectedFeedIndex: ze
  }), [fn, wt, ln, ze]), we = u.useCallback((m = "Action") => {
    const E = me(m);
    Vt.current.push(E), Vt.current.length > 50 && Vt.current.shift(), rs.current = [], Xs((D) => D + 1);
  }, [me]), Ce = u.useCallback(() => {
    ls.current && (Vt.current.push(ls.current), Vt.current.length > 50 && Vt.current.shift(), rs.current = [], ls.current = null, Xs((m) => m + 1));
  }, []), Ae = u.useCallback(() => {
    const m = f > 0 ? f : d + v, E = 500;
    if (m <= d + E) return $;
    const D = (le == null ? void 0 : le.layout) || {
      width: Te,
      height: Pe,
      backgroundColor: "#070A10",
      fps: 30,
      placements: F
    }, { nextTimeline: ee, newIndex: Y, isNew: W } = ah(fn, m, D, E);
    return W && (cn(ee), O && O(ee), b && b(Y), yn(
      `Keyframe #${Y + 1} created at ${St(m, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), Y;
  }, [f, d, v, $, le, Te, Pe, F, fn, O, b, p, yn]), he = u.useCallback((m, E = null) => {
    E && we(E);
    const D = f > 0 ? f : d + v;
    cn((ee) => {
      const { nextTimeline: Y, newIndex: W, isNewKeyframe: ie } = sx({
        prevTimeline: ee,
        newPlacements: m,
        currentEpochMs: D,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Te,
        virtualH: Pe,
        fps: 30
      });
      return O && O(Y), b && b(W), ie && W > 0 && yn(
        `Keyframe #${W + 1} created at ${St(D, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), Y;
    });
  }, [f, d, v, Te, Pe, O, b, p, yn, we]);
  u.useEffect(() => {
    if (vn.length > 0 && (!F || F.length === 0) && !$n.current) {
      let m = wt;
      vn.length === 2 && wt === "16:9" && (m = "32:9", ps("32:9"));
      const E = os.find((ee) => ee.id === m) || os[0], D = tr(vn, E.w, E.h);
      D.length > 0 && (he(D), Qt("auto-grid"));
    }
  }, [vn, F, he, wt]);
  const Xe = u.useRef("");
  u.useEffect(() => {
    const m = (t || []).map((E) => E.id).sort().join(",");
    if (Xe.current === "") {
      Xe.current = m;
      return;
    }
    if (Xe.current !== m && (Xe.current = m, t && t.length > 0)) {
      const E = new Set(t.map((D) => D.id));
      if (ln === "auto-grid" || !$n.current) {
        let D = wt;
        vn.length === 2 && wt === "16:9" && (D = "32:9", ps("32:9"));
        const ee = os.find((W) => W.id === D) || os[0], Y = tr(vn, ee.w, ee.h);
        Y.length > 0 && he(Y);
      } else if (F && F.length > 0) {
        const D = F.filter((ee) => E.has(ee.stationId));
        if (D.length !== F.length)
          if (D.length === 0) {
            const ee = tr(vn, Te, Pe);
            he(ee);
          } else
            he(D);
      }
    }
  }, [t, vn, ln, wt, F, he, Te, Pe]), u.useEffect(() => {
    re && re({
      width: Te,
      height: Pe,
      backgroundColor: "#070A10",
      fps: 30,
      placements: F,
      timeline: fn
    });
  }, [F, fn, re, Te, Pe]);
  const Ve = u.useCallback((m) => {
    const E = Gs, D = os.find((ee) => ee.id === m) || os[0];
    if (E.id !== D.id)
      if (ps(D.id), $n.current) {
        const ee = D.w / E.w, Y = D.h / E.h, W = F.map((ie) => ({
          ...ie,
          x: Math.round(ie.x * ee),
          y: Math.round(ie.y * Y),
          width: Math.round(ie.width * ee),
          height: Math.round(ie.height * Y)
        }));
        he(W);
      } else {
        const ee = vn.length > 0 ? vn : F && F.length > 0 ? F : hn, Y = tr(ee, D.w, D.h);
        he(Y);
      }
  }, [Gs, F, hn, he]), Ye = u.useCallback((m) => {
    const E = F.length > 0 ? Math.max(...F.map((ye) => ye.zIndex || 0)) + 1 : 0, D = jt[F.length % jt.length], ee = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 16 / 9), Y = ee >= 1 ? 640 : Math.round(360 * ee), W = ee >= 1 ? Math.round(640 / ee) : 360, ie = {
      stationId: m.stationId,
      displayId: m.displayId,
      label: m.label,
      x: 100 + F.length * 40 % 800,
      y: 80 + F.length * 40 % 500,
      width: Y,
      height: W,
      sourceWidth: m.sourceWidth || 1920,
      sourceHeight: m.sourceHeight || 1080,
      nativeAspectRatio: ee,
      aspectRatio: ee,
      zIndex: E,
      rotation: 0,
      borderWidth: 2,
      borderColor: D,
      shadowEffect: "deep",
      borderRadius: 0
    }, be = [...F, ie];
    he(be), Re(be.length - 1);
  }, [F, he]), et = u.useCallback((m) => {
    const E = F.filter((D, ee) => ee !== m);
    he(E), Re((D) => E.length === 0 ? null : D !== null ? Math.min(D, E.length - 1) : null);
  }, [F, he]), ot = u.useCallback(() => {
    he([]), Re(null);
  }, [he]), bt = (m) => {
    const E = m.map((ee, Y) => ({ p: ee, origIdx: Y }));
    E.sort((ee, Y) => (ee.p.zIndex ?? ee.origIdx) - (Y.p.zIndex ?? Y.origIdx));
    const D = [...m];
    return E.forEach(({ origIdx: ee }, Y) => {
      D[ee] = { ...D[ee], zIndex: Y + 1 };
    }), D;
  };
  u.useCallback((m = ze) => {
    if (m < 0 || !F[m]) return;
    const E = bt(F), D = E[m].zIndex, ee = E.length;
    if (D >= ee) return;
    const Y = E.map((W, ie) => ie === m ? { ...W, zIndex: ee } : W.zIndex > D ? { ...W, zIndex: W.zIndex - 1 } : W);
    he(Y);
  }, [ze, F, he]), u.useCallback((m = ze) => {
    if (m < 0 || !F[m]) return;
    const E = bt(F), D = E[m].zIndex;
    if (D <= 1) return;
    const ee = E.map((Y, W) => W === m ? { ...Y, zIndex: 1 } : Y.zIndex < D ? { ...Y, zIndex: Y.zIndex + 1 } : Y);
    he(ee);
  }, [ze, F, he]);
  const qt = u.useCallback((m = ze) => {
    if (m < 0 || !F[m]) return;
    const E = bt(F), D = E[m].zIndex, ee = D + 1;
    if (ee > E.length) return;
    const Y = E.map((W, ie) => ie === m ? { ...W, zIndex: ee } : W.zIndex === ee ? { ...W, zIndex: D } : W);
    he(Y);
  }, [ze, F, he]), Ut = u.useCallback((m = ze) => {
    if (m < 0 || !F[m]) return;
    const E = bt(F), D = E[m].zIndex, ee = D - 1;
    if (ee < 1) return;
    const Y = E.map((W, ie) => ie === m ? { ...W, zIndex: ee } : W.zIndex === ee ? { ...W, zIndex: D } : W);
    he(Y);
  }, [ze, F, he]), en = u.useCallback((m) => {
    if (ze < 0 || !F[ze]) return;
    const E = F.map((D, ee) => ee === ze ? { ...D, ...m } : D);
    he(E);
  }, [ze, F, he]), Un = u.useCallback((m, E, D = !0) => {
    if (m < 0 || !F[m]) return;
    const ee = typeof E == "string" ? E.trim() : "", Y = ee.length > 0 ? ee : null;
    if (F[m].label === Y) return;
    const W = F.map((ie, be) => be === m ? { ...ie, label: Y } : ie);
    he(W, D ? "Rename Screen Title" : null);
  }, [F, he]), Mr = u.useCallback((m) => {
    if (m < 0 || !F[m]) {
      Kt(null);
      return;
    }
    Un(m, dn, !0), Kt(null);
  }, [F, dn, Un]), ci = u.useCallback((m = 90) => {
    const E = F[ze];
    if (!E) return;
    const ee = ((E.rotation || 0) + m) % 360;
    en({ rotation: ee });
  }, [ze, F, en]), br = u.useCallback((m = ze) => {
    if (m < 0 || !F[m]) return;
    const E = F.length, D = F.map((ee, Y) => Y === m ? {
      ...ee,
      x: 0,
      y: 0,
      width: Te,
      height: Pe,
      zIndex: E
    } : ee);
    he(D);
  }, [ze, F, he, Te, Pe]), Qs = u.useCallback((m) => {
    let E = [];
    const D = vn.length > 0 ? vn : hn.length > 0 ? hn : F;
    switch (m) {
      case "auto":
      case "auto-grid":
        E = tr(D, Te, Pe);
        break;
      case "1x1":
        D.length > 0 && (E = [{
          ...D[0],
          x: 0,
          y: 0,
          width: Te,
          height: Pe,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: jt[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (D.length >= 2) {
          const ee = Math.round(Te / 2);
          E = D.slice(0, 2).map((Y, W) => {
            const ie = Y.nativeAspectRatio || (Y.sourceWidth && Y.sourceHeight ? Y.sourceWidth / Y.sourceHeight : 1.7777777777777777), { x: be, y: ye, width: je, height: mt } = or(W * ee, 0, ee, Pe, ie);
            return {
              ...Y,
              x: be,
              y: ye,
              width: je,
              height: mt,
              sourceWidth: Y.sourceWidth || 1920,
              sourceHeight: Y.sourceHeight || 1080,
              nativeAspectRatio: ie,
              aspectRatio: ie,
              zIndex: W + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: jt[W % jt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          E = tr(D, Te, Pe);
        break;
      case "2x2": {
        const ee = Math.round(Te / 2), Y = Math.round(Pe / 2);
        E = D.slice(0, 4).map((W, ie) => ({
          ...W,
          x: ie % 2 * ee,
          y: Math.floor(ie / 2) * Y,
          width: ee,
          height: Y,
          zIndex: ie,
          rotation: 0,
          borderWidth: 2,
          borderColor: jt[ie % jt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (D.length >= 2) {
          E = [
            { ...D[0], x: 0, y: 0, width: Te, height: Pe, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: jt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const ee = D.slice(1, 4), Y = Math.round(Te * 0.23), W = Math.round(Y / (16 / 9));
          ee.forEach((ie, be) => {
            E.push({
              ...ie,
              x: Te - Y - 24,
              y: 24 + be * (W + 16),
              width: Y,
              height: W,
              zIndex: 10 + be,
              rotation: 0,
              borderWidth: 3,
              borderColor: jt[(be + 1) % jt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (D.length >= 3) {
          const ee = Math.round(Te * 0.666), Y = Te - ee, W = Math.round(Pe / 2);
          E = [
            { ...D[0], x: 0, y: 0, width: ee, height: Pe, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: jt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...D[1], x: ee, y: 0, width: Y, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: jt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...D[2], x: ee, y: W, width: Y, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: jt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (D.length >= 3)
          if (Te / Pe >= 2.5) {
            const Y = Math.round(Te / 3);
            E = D.slice(0, 3).map((W, ie) => {
              const be = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 1.7777777777777777), { x: ye, y: je, width: mt, height: ut } = or(ie * Y, 0, Y, Pe, be);
              return {
                ...W,
                x: ye,
                y: je,
                width: mt,
                height: ut,
                sourceWidth: W.sourceWidth || 1920,
                sourceHeight: W.sourceHeight || 1080,
                nativeAspectRatio: be,
                aspectRatio: be,
                zIndex: ie,
                rotation: 0,
                borderWidth: 2,
                borderColor: jt[ie % jt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const Y = Math.round(Te / 2), W = Math.round(Pe / 2);
            E = [
              { ...D[0], x: 0, y: 0, width: Y, height: W, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: jt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...D[1], x: Y, y: 0, width: Y, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: jt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...D[2], x: Math.round(Y / 2), y: W, width: Y, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: jt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    E.length > 0 && (he(E), Re(0), m === "auto" || m === "auto-grid" ? Qt("auto-grid") : (Qt(m), $n.current = !0));
  }, [hn, F, he, Te, Pe]), Uu = u.useCallback(() => {
    const m = T.trim() || `Custom Layout ${Q.length + 1}`, D = [{
      id: `preset-${Date.now()}`,
      name: m,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(F)),
      keyframes: JSON.parse(JSON.stringify(En))
    }, ...Q];
    Je(D), J(""), Ee(!1);
  }, [T, Q, F, En]), Jp = u.useCallback((m) => {
    !m || !m.placements || (he(m.placements), Re(0), Qt("custom"), $n.current = !0, We(!1));
  }, [he]), Zp = u.useCallback((m, E) => {
    E == null || E.stopPropagation();
    const D = Q.filter((ee) => ee.id !== m);
    Je(D);
  }, [Q]), qp = u.useCallback(() => {
    const m = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Te,
      height: Pe,
      aspectRatio: wt,
      placements: F,
      timeline: fn
    }, E = JSON.stringify(m, null, 2), D = new window.Blob([E], { type: "application/json" }), ee = window.URL.createObjectURL(D), Y = document.createElement("a"), W = /* @__PURE__ */ new Date(), ie = (ye) => String(ye).padStart(2, "0"), be = `${W.getFullYear()}${ie(W.getMonth() + 1)}${ie(W.getDate())}_${ie(W.getHours())}${ie(W.getMinutes())}${ie(W.getSeconds())}`;
    Y.href = ee, Y.download = `canvas_layout_${be}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), window.URL.revokeObjectURL(ee);
  }, [F, fn, Te, Pe, wt]), em = u.useCallback((m) => {
    var ee;
    const E = (ee = m.target.files) == null ? void 0 : ee[0];
    if (!E) return;
    const D = new window.FileReader();
    D.onload = (Y) => {
      var W, ie, be;
      try {
        const ye = JSON.parse(Y.target.result);
        if (ye.width && ye.height) {
          const mt = os.find((ut) => ut.w === ye.width && ut.h === ye.height);
          mt && ps(mt.id);
        } else if (ye.aspectRatio) {
          const mt = os.find((ut) => ut.id === ye.aspectRatio);
          mt && ps(mt.id);
        }
        let je = null;
        Array.isArray(ye) ? je = ye : ye.placements && Array.isArray(ye.placements) ? je = ye.placements : (W = ye.layout) != null && W.placements && Array.isArray(ye.layout.placements) && (je = ye.layout.placements), je && je.length > 0 && (he(je), Re(0), Qt("custom"), $n.current = !0), ((be = (ie = ye.timeline) == null ? void 0 : ie.keyframes) == null ? void 0 : be.length) > 0 && (cn(ye.timeline), O && O(ye.timeline));
      } catch (ye) {
        console.error("Failed to parse imported canvas JSON:", ye), alert(`Canvas Import Error: ${ye.message}`);
      }
    }, D.readAsText(E), m.target.value = "";
  }, [he, O]), ui = (m, E) => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Re(E), $n.current = !0, Qt("custom");
    const D = Ae(), ee = Ys.current || Tt.current;
    if (!ee) return;
    const Y = ee.getBoundingClientRect(), W = F[E];
    if (!W) return;
    ls.current = me("Move Feed"), Zt.current = {
      mode: "drag",
      index: E,
      startX: m.clientX,
      startY: m.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      scaleX: Te / Y.width,
      scaleY: Pe / Y.height,
      activeSnapZone: null
    }, ht(!0);
    const ie = (ye) => {
      if (!Zt.current || Zt.current.mode !== "drag") return;
      const je = Zt.current, mt = Ys.current || Tt.current;
      if (!mt) return;
      const ut = mt.getBoundingClientRect(), dt = (ye.clientX - je.startX) * je.scaleX, ve = (ye.clientY - je.startY) * je.scaleY;
      let it = Math.round(je.initialX + dt), Pt = Math.round(je.initialY + ve);
      it = tn(it, 0, Te - je.initialW), Pt = tn(Pt, 0, Pe - je.initialH);
      const gt = An && !ye.altKey;
      let Ct = null, Rn = null, Qn = null;
      if (gt) {
        const Wt = ye.clientX - ut.left, Rt = ye.clientY - ut.top, _t = 32, Ne = Math.round(Te / 2), yt = Math.round(Pe / 2);
        if (Wt <= _t ? Rt <= ut.height * 0.22 ? Ct = { x: 0, y: 0, width: Ne, height: yt, label: "◰ Top-Left Quarter" } : Rt >= ut.height * 0.78 ? Ct = { x: 0, y: yt, width: Ne, height: yt, label: "◱ Bottom-Left Quarter" } : Ct = { x: 0, y: 0, width: Ne, height: Pe, label: "◧ Left Half (50%)" } : Wt >= ut.width - _t ? Rt <= ut.height * 0.22 ? Ct = { x: Ne, y: 0, width: Ne, height: yt, label: "◲ Top-Right Quarter" } : Rt >= ut.height * 0.78 ? Ct = { x: Ne, y: yt, width: Ne, height: yt, label: "◳ Bottom-Right Quarter" } : Ct = { x: Ne, y: 0, width: Ne, height: Pe, label: "◨ Right Half (50%)" } : Rt <= _t && Wt >= ut.width * 0.25 && Wt <= ut.width * 0.75 && (Ct = { x: 0, y: 0, width: Te, height: Pe, label: "🗖 Full Canvas Maximize" }), !Ct) {
          const Ir = F.filter((ct, Tr) => Tr !== je.index), qs = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Te, targetX: Te - je.initialW, guide: 100 },
            { snapTo: Ne, targetX: Ne - Math.round(je.initialW / 2), guide: 50 }
          ];
          Ir.forEach((ct) => {
            qs.push({ snapTo: ct.x, targetX: ct.x, guide: ct.x / Te * 100 }), qs.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width - je.initialW, guide: (ct.x + ct.width) / Te * 100 }), qs.push({ snapTo: ct.x + ct.width, targetX: ct.x + ct.width, guide: (ct.x + ct.width) / Te * 100 }), qs.push({ snapTo: ct.x, targetX: ct.x - je.initialW, guide: ct.x / Te * 100 });
          });
          let Vu = 18;
          qs.forEach((ct) => {
            const Tr = Math.abs(it - ct.targetX);
            Tr < Vu && (Vu = Tr, it = ct.targetX, Rn = ct.guide);
          });
          const Ll = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Pe, targetY: Pe - je.initialH, guide: 100 },
            { snapTo: yt, targetY: yt - Math.round(je.initialH / 2), guide: 50 }
          ];
          Ir.forEach((ct) => {
            Ll.push({ snapTo: ct.y, targetY: ct.y, guide: ct.y / Pe * 100 }), Ll.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height - je.initialH, guide: (ct.y + ct.height) / Pe * 100 }), Ll.push({ snapTo: ct.y + ct.height, targetY: ct.y + ct.height, guide: (ct.y + ct.height) / Pe * 100 }), Ll.push({ snapTo: ct.y, targetY: ct.y - je.initialH, guide: ct.y / Pe * 100 });
          });
          let Yu = 18;
          Ll.forEach((ct) => {
            const Tr = Math.abs(Pt - ct.targetY);
            Tr < Yu && (Yu = Tr, Pt = ct.targetY, Qn = ct.guide);
          });
        }
      }
      je.activeSnapZone = Ct, je.latestX = it, je.latestY = Pt, $s(Ct), Bt({ vertical: Rn, horizontal: Qn }), cn((Wt) => {
        const Rt = [...Wt.keyframes || []], _t = D < Rt.length ? D : $;
        if (!Rt[_t]) return Wt;
        const Ne = [...Rt[_t].layout.placements || []];
        return Ne[je.index] ? (Ne[je.index] = { ...Ne[je.index], x: it, y: Pt }, Rt[_t] = {
          ...Rt[_t],
          layout: { ...Rt[_t].layout, placements: Ne }
        }, { ...Wt, keyframes: Rt }) : Wt;
      });
    }, be = () => {
      var ye;
      if (ht(!1), Bt({ vertical: null, horizontal: null }), (ye = Zt.current) != null && ye.activeSnapZone) {
        const je = Zt.current.activeSnapZone, mt = Zt.current.index;
        cn((ut) => {
          const dt = [...ut.keyframes || []], ve = D < dt.length ? D : $;
          if (!dt[ve]) return ut;
          const it = [...dt[ve].layout.placements || []];
          return it[mt] ? (it[mt] = {
            ...it[mt],
            x: je.x,
            y: je.y,
            width: je.width,
            height: je.height
          }, dt[ve] = {
            ...dt[ve],
            layout: { ...dt[ve].layout, placements: it }
          }, { ...ut, keyframes: dt }) : ut;
        });
      }
      if (Zt.current) {
        const je = Zt.current, mt = je.initialX, ut = je.initialY, dt = je.activeSnapZone ? je.activeSnapZone.x : je.latestX ?? mt, ve = je.activeSnapZone ? je.activeSnapZone.y : je.latestY ?? ut;
        dt !== mt || ve !== ut ? (Ce(), O && cn((it) => (O(it), it))) : ls.current = null;
      }
      $s(null), Zt.current = null, window.removeEventListener("mousemove", ie), window.removeEventListener("mouseup", be);
    };
    window.addEventListener("mousemove", ie), window.addEventListener("mouseup", be);
  }, Oo = (m, E, D = "br") => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Re(E), $n.current = !0, Qt("custom");
    const ee = Ae();
    if (!Tt.current) return;
    const Y = Tt.current.getBoundingClientRect(), W = F[E];
    if (!W) return;
    ls.current = me("Resize Feed");
    const ie = hn.find((dt) => dt.stationId === W.stationId && dt.displayId === W.displayId), be = W.sourceWidth || (ie == null ? void 0 : ie.sourceWidth) || 1920, ye = W.sourceHeight || (ie == null ? void 0 : ie.sourceHeight) || 1080, je = W.nativeAspectRatio || W.aspectRatio || (ie == null ? void 0 : ie.nativeAspectRatio) || be / ye || W.width / W.height || 16 / 9;
    Zt.current = {
      mode: "resize",
      corner: D,
      index: E,
      startX: m.clientX,
      startY: m.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      sourceWidth: be,
      sourceHeight: ye,
      nativeAspectRatio: je,
      scaleX: Te / Y.width,
      scaleY: Pe / Y.height
    }, Nt(!0);
    const mt = (dt) => {
      if (!Zt.current || Zt.current.mode !== "resize") return;
      const ve = Zt.current, it = (dt.clientX - ve.startX) * ve.scaleX, Pt = (dt.clientY - ve.startY) * ve.scaleY, gt = dt.ctrlKey || dt.shiftKey || dt.metaKey, Ct = ve.nativeAspectRatio > 0 ? ve.nativeAspectRatio : ve.initialW / ve.initialH;
      let Rn = ve.initialX, Qn = ve.initialY, Wt = ve.initialW, Rt = ve.initialH;
      if (ve.corner === "br") {
        const _t = Te - ve.initialX, Ne = Pe - ve.initialY;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(ve.initialW + it))), ft = Math.round(yt / Ct);
          ft > Ne && (ft = Ne, yt = Math.round(ft * Ct)), ft < 90 && (ft = 90, yt = Math.round(ft * Ct)), Wt = yt, Rt = ft;
        } else
          Wt = tn(Math.round(ve.initialW + it), 160, _t), Rt = tn(Math.round(ve.initialH + Pt), 90, Ne);
      } else if (ve.corner === "bl") {
        const _t = ve.initialX + ve.initialW, Ne = Pe - ve.initialY;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(ve.initialW - it))), ft = Math.round(yt / Ct);
          ft > Ne && (ft = Ne, yt = Math.round(ft * Ct)), ft < 90 && (ft = 90, yt = Math.round(ft * Ct)), Wt = yt, Rt = ft, Rn = ve.initialX + ve.initialW - Wt;
        } else
          Wt = tn(Math.round(ve.initialW - it), 160, _t), Rt = tn(Math.round(ve.initialH + Pt), 90, Ne), Rn = ve.initialX + ve.initialW - Wt;
      } else if (ve.corner === "tr") {
        const _t = Te - ve.initialX, Ne = ve.initialY + ve.initialH;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(ve.initialW + it))), ft = Math.round(yt / Ct);
          ft > Ne && (ft = Ne, yt = Math.round(ft * Ct)), ft < 90 && (ft = 90, yt = Math.round(ft * Ct)), Wt = yt, Rt = ft, Qn = ve.initialY + ve.initialH - Rt;
        } else
          Wt = tn(Math.round(ve.initialW + it), 160, _t), Rt = tn(Math.round(ve.initialH - Pt), 90, Ne), Qn = ve.initialY + ve.initialH - Rt;
      } else if (ve.corner === "tl") {
        const _t = ve.initialX + ve.initialW, Ne = ve.initialY + ve.initialH;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(ve.initialW - it))), ft = Math.round(yt / Ct);
          ft > Ne && (ft = Ne, yt = Math.round(ft * Ct)), ft < 90 && (ft = 90, yt = Math.round(ft * Ct)), Wt = yt, Rt = ft, Rn = ve.initialX + ve.initialW - Wt, Qn = ve.initialY + ve.initialH - Rt;
        } else
          Wt = tn(Math.round(ve.initialW - it), 160, _t), Rt = tn(Math.round(ve.initialH - Pt), 90, Ne), Rn = ve.initialX + ve.initialW - Wt, Qn = ve.initialY + ve.initialH - Rt;
      }
      cn((_t) => {
        const Ne = [..._t.keyframes || []], yt = ee < Ne.length ? ee : $;
        if (!Ne[yt]) return _t;
        const ft = [...Ne[yt].layout.placements || []];
        return ft[ve.index] ? (ft[ve.index] = {
          ...ft[ve.index],
          x: Rn,
          y: Qn,
          width: Wt,
          height: Rt,
          sourceWidth: ve.sourceWidth,
          sourceHeight: ve.sourceHeight,
          nativeAspectRatio: ve.nativeAspectRatio,
          aspectRatio: ve.nativeAspectRatio
        }, Ne[yt] = {
          ...Ne[yt],
          layout: { ...Ne[yt].layout, placements: ft }
        }, { ..._t, keyframes: Ne }) : _t;
      });
    }, ut = () => {
      if (Zt.current) {
        const dt = Zt.current, ve = dt.latestW ?? dt.initialW, it = dt.latestH ?? dt.initialH;
        ve !== dt.initialW || it !== dt.initialH ? (Ce(), O && cn((Pt) => (O(Pt), Pt))) : ls.current = null;
      }
      Nt(!1), Zt.current = null, window.removeEventListener("mousemove", mt), window.removeEventListener("mouseup", ut);
    };
    window.addEventListener("mousemove", mt), window.addEventListener("mouseup", ut);
  }, tm = u.useCallback((m) => {
    const E = F[m];
    if (!E) return;
    const D = hn.find((be) => be.stationId === E.stationId && be.displayId === E.displayId), ee = E.nativeAspectRatio || E.aspectRatio || (D == null ? void 0 : D.nativeAspectRatio) || (E.sourceWidth && E.sourceHeight ? E.sourceWidth / E.sourceHeight : 16 / 9);
    let Y = E.width, W = Math.round(Y / ee);
    E.y + W > Pe && (W = Pe - E.y, Y = Math.round(W * ee)), E.x + Y > Te && (Y = Te - E.x, W = Math.round(Y / ee));
    const ie = F.map((be, ye) => ye === m ? {
      ...be,
      width: Math.max(160, Y),
      height: Math.max(90, W),
      sourceWidth: E.sourceWidth || (D == null ? void 0 : D.sourceWidth) || 1920,
      sourceHeight: E.sourceHeight || (D == null ? void 0 : D.sourceHeight) || 1080,
      nativeAspectRatio: ee,
      aspectRatio: ee
    } : be);
    he(ie, "Snap Native Aspect");
  }, [F, hn, he]), di = u.useCallback(() => {
    if (Vt.current.length === 0) return;
    const m = me("Redo State");
    rs.current.push(m), rs.current.length > 50 && rs.current.shift();
    const E = Vt.current.pop();
    E && (cn(E.timeline), O && O(E.timeline), E.aspectId && E.aspectId !== wt && ps(E.aspectId), E.presetId && Qt(E.presetId), E.selectedFeedIndex !== void 0 && Re(E.selectedFeedIndex), $n.current = !0, Xs((D) => D + 1), yn(`Undo: ${E.label || "Previous State"}`, "undo", "↺"));
  }, [me, O, wt, yn]), hi = u.useCallback(() => {
    if (rs.current.length === 0) return;
    const m = me("Undo State");
    Vt.current.push(m), Vt.current.length > 50 && Vt.current.shift();
    const E = rs.current.pop();
    E && (cn(E.timeline), O && O(E.timeline), E.aspectId && E.aspectId !== wt && ps(E.aspectId), E.presetId && Qt(E.presetId), E.selectedFeedIndex !== void 0 && Re(E.selectedFeedIndex), $n.current = !0, Xs((D) => D + 1), yn(`Redo: ${E.label || "Restored State"}`, "info", "↻"));
  }, [me, O, wt, yn]), Wu = u.useCallback(() => {
    const E = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(F)),
      keyframes: JSON.parse(JSON.stringify(En)),
      aspectId: wt,
      width: Te,
      height: Pe
    }, ...Q.filter((D) => D.id !== "preset-quicksave")];
    Je(E);
    try {
      Op({
        canvasLayoutTimeline: fn,
        selectedAspectId: wt,
        selectedPresetId: ln,
        isFullWidth: Gn
      });
    } catch (D) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", D);
    }
    yn(`State Saved (${Te}×${Pe} • ${F.length} Feeds)`, "success", "💾");
  }, [F, En, wt, Te, Pe, Q, Je, fn, ln, Gn, yn]);
  u.useEffect(() => {
    const m = () => di(), E = () => hi(), D = () => Wu();
    return window.addEventListener("itb:studio-undo", m), window.addEventListener("itb:studio-redo", E), window.addEventListener("itb:studio-save-now", D), () => {
      window.removeEventListener("itb:studio-undo", m), window.removeEventListener("itb:studio-redo", E), window.removeEventListener("itb:studio-save-now", D);
    };
  }, [di, hi, Wu]);
  const nm = u.useCallback(() => {
    if (ae) {
      ae();
      return;
    }
    Be((m) => {
      const E = !m;
      if (E) {
        r && r(null);
        const D = kt.current;
        D && D.requestFullscreen && D.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return E;
    });
  }, [ae, r]), sm = u.useCallback(() => {
    const m = f > 0 ? f : d + v, { nextTimeline: E, newIndex: D, isNew: ee } = ah(
      fn,
      m,
      (le == null ? void 0 : le.layout) || {
        width: Te,
        height: Pe,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(F))
      }
    );
    ee ? (we("Add Keyframe"), cn(E), O && O(E), b && b(D), yn(`Keyframe #${D + 1} created at ${St(m, p, { includeSeconds: !0 })}`, "success", "💎")) : (b && b(D), yn(`Jumped to existing Keyframe #${D + 1}`, "info", "💎"));
  }, [f, d, v, le, F, Te, Pe, fn, O, b, p, yn, we]);
  u.useCallback(() => {
    if (En.length <= 1 || $ === 0) {
      yn("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    we("Delete Keyframe");
    const { nextTimeline: m, success: E, newIndex: D } = rx(fn, $);
    E && (cn(m), O && O(m), b && b(D), yn("Keyframe deleted", "info", "🗑️"));
  }, [En, $, fn, O, b, yn, we]), u.useCallback((m) => {
    $ !== 0 && (we("Update Transition Type"), cn((E) => {
      const D = Uc(E, $, { transitionType: m });
      return O && O(D), D;
    }));
  }, [$, O, we]), u.useCallback((m) => {
    $ !== 0 && (we("Update Transition Duration"), cn((E) => {
      const D = Uc(E, $, { transitionDurationSec: m });
      return O && O(D), D;
    }));
  }, [$, O, we]), u.useEffect(() => {
    const m = (E) => {
      if (!(E.target.tagName === "INPUT" || E.target.tagName === "TEXTAREA" || E.target.isContentEditable)) {
        if (E.key === "Delete" || E.key === "Backspace") {
          ze >= 0 && F[ze] && (E.preventDefault(), et(ze));
          return;
        }
        if ((E.code === "Space" || E.key === " ") && j) {
          E.preventDefault(), j((D) => !D);
          return;
        }
        if ((E.key === "k" || E.key === "K") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), sm();
          return;
        }
        if (E.key === "Escape") {
          Fe(!1), We(!1), xe(!1), V(!1), Ge(!1), Ee(!1), At(!1), Re(null);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(E.key)) {
          if (ze >= 0 && F[ze]) {
            E.preventDefault(), $n.current = !0, Qt("custom");
            const D = E.shiftKey ? 1 : 10;
            let ee = 0, Y = 0;
            E.key === "ArrowLeft" && (ee = -D), E.key === "ArrowRight" && (ee = D), E.key === "ArrowUp" && (Y = -D), E.key === "ArrowDown" && (Y = D);
            const W = F[ze], ie = tn(W.x + ee, 0, Te - W.width), be = tn(W.y + Y, 0, Pe - W.height), ye = F.map((je, mt) => mt === ze ? { ...je, x: ie, y: be } : je);
            he(ye);
          }
          return;
        }
        if ((E.key === "r" || E.key === "R") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), an((D) => !D);
          return;
        }
        if ((E.key === "s" || E.key === "S") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), wn((D) => !D);
          return;
        }
      }
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [ze, F, et, he, an, wn]);
  const zu = u.useMemo(() => nx({
    keyframes: En,
    currentEpochMs: te,
    currentPlacements: F,
    isEditing: at || Qe
  }), [at, Qe, En, te, F]), rm = u.useMemo(() => zu.map((m, E) => ({ ...m, originalIndex: E })).sort((m, E) => (m.zIndex ?? m.originalIndex) - (E.zIndex ?? E.originalIndex)), [zu]), lm = u.useMemo(() => ax(F, {
    maxConcurrentDecoders: Fp,
    activeAudioStationId: Ie,
    selectedFeedIndex: ze
  }), [F, Ie, ze]), Js = F[ze] || null, { filteredPlaced: Zs, filteredUnplaced: Do } = u.useMemo(() => {
    const m = (X || "").toLowerCase(), E = F.map((W, ie) => {
      const be = W.zIndex ?? ie + 1, ye = hn.find((je) => je.stationId === W.stationId && je.displayId === W.displayId);
      return {
        type: "placed",
        origIdx: ie,
        placement: W,
        feed: ye,
        stationId: W.stationId,
        displayId: W.displayId,
        label: W.label || (ye == null ? void 0 : ye.label) || `${W.stationId} (${W.displayId})`,
        layerRank: be,
        isSelected: ie === ze,
        sourceWidth: W.sourceWidth || (ye == null ? void 0 : ye.sourceWidth) || 1920,
        sourceHeight: W.sourceHeight || (ye == null ? void 0 : ye.sourceHeight) || 1080
      };
    });
    E.sort((W, ie) => ie.layerRank - W.layerRank);
    const D = hn.filter((W) => !F.some((ie) => ie.stationId === W.stationId && ie.displayId === W.displayId)).map((W) => ({
      type: "unplaced",
      feed: W,
      stationId: W.stationId,
      displayId: W.displayId,
      label: W.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: W.sourceWidth || 1920,
      sourceHeight: W.sourceHeight || 1080
    })), ee = m ? E.filter((W) => W.label.toLowerCase().includes(m)) : E, Y = m ? D.filter((W) => W.label.toLowerCase().includes(m)) : D;
    return { filteredPlaced: ee, filteredUnplaced: Y };
  }, [F, hn, ze, X]), Hu = u.useCallback((m, E) => {
    m.stopPropagation(), Se(E), m.dataTransfer.effectAllowed = "copyMove", m.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: E.origIdx,
      type: E.type,
      stationId: E.stationId,
      displayId: E.displayId
    }));
  }, []), om = u.useCallback((m, E) => {
    m.preventDefault(), m.stopPropagation(), m.dataTransfer.dropEffect = "move";
    const D = m.currentTarget.getBoundingClientRect(), ee = D.top + D.height / 2, Y = m.clientY < ee ? "above" : "below";
    pt((W) => W.index === E && W.position === Y ? W : { index: E, position: Y });
  }, []), am = u.useCallback((m, E) => {
    m.stopPropagation(), pt((D) => D.index === E ? { index: null, position: null } : D);
  }, []), Ku = u.useCallback(() => {
    Se(null), pt({ index: null, position: null });
  }, []), im = u.useCallback((m, E) => {
    m.preventDefault(), m.stopPropagation();
    const D = tt;
    pt({ index: null, position: null }), Se(null);
    const ee = m.dataTransfer.getData("text/plain");
    if (ee)
      try {
        const Y = JSON.parse(ee);
        if (Y.type === "placed") {
          const W = Y.origIdx, ie = Zs.findIndex((dt) => dt.origIdx === W);
          if (ie === -1) return;
          let be = E;
          if (D.position === "below" && (be += 1), ie < be && (be -= 1), ie === be) return;
          const ye = [...Zs], [je] = ye.splice(ie, 1);
          ye.splice(be, 0, je);
          const mt = ye.length, ut = F.map((dt, ve) => {
            const it = ye.findIndex((Pt) => Pt.origIdx === ve);
            return it !== -1 ? {
              ...dt,
              zIndex: mt - it
            } : dt;
          });
          he(ut), Re(je.origIdx);
        } else if (Y.type === "unplaced") {
          const W = hn.find((Ct) => Ct.stationId === Y.stationId && Ct.displayId === Y.displayId);
          if (!W) return;
          const ie = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 16 / 9), be = ie >= 1 ? 640 : Math.round(360 * ie), ye = ie >= 1 ? Math.round(640 / ie) : 360, je = jt[F.length % jt.length];
          let mt = E;
          D.position === "below" && (mt += 1);
          const ut = {
            stationId: W.stationId,
            displayId: W.displayId,
            label: W.label,
            x: 100 + F.length * 40 % 800,
            y: 80 + F.length * 40 % 500,
            width: be,
            height: ye,
            sourceWidth: W.sourceWidth || 1920,
            sourceHeight: W.sourceHeight || 1080,
            nativeAspectRatio: ie,
            aspectRatio: ie,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: je,
            shadowEffect: "deep",
            borderRadius: 0
          }, dt = [...F, ut], ve = dt.length - 1, it = [...Zs];
          it.splice(mt, 0, { origIdx: ve });
          const Pt = it.length, gt = dt.map((Ct, Rn) => {
            const Qn = it.findIndex((Wt) => Wt.origIdx === Rn);
            return {
              ...Ct,
              zIndex: Qn !== -1 ? Pt - Qn : 1
            };
          });
          he(gt), Re(ve);
        }
      } catch (Y) {
        console.warn("Failed to handle layer drag drop:", Y);
      }
  }, [tt, Zs, F, hn, he]), cm = u.useCallback((m) => {
    m.preventDefault();
    const E = m.dataTransfer.getData("text/plain");
    if (!(!E || !Tt.current))
      try {
        const D = JSON.parse(E), ee = Tt.current.getBoundingClientRect(), Y = m.clientX - ee.left, W = m.clientY - ee.top, ie = tn(Math.round(Y / ee.width * Te), 0, Te - 320), be = tn(Math.round(W / ee.height * Pe), 0, Pe - 180);
        if (D.type === "unplaced") {
          const ye = hn.find((je) => je.stationId === D.stationId && je.displayId === D.displayId);
          if (ye) {
            const je = ye.nativeAspectRatio || (ye.sourceWidth && ye.sourceHeight ? ye.sourceWidth / ye.sourceHeight : 1.7777777777777777), mt = je >= 1 ? 640 : Math.round(360 * je), ut = je >= 1 ? Math.round(640 / je) : 360, dt = F.length > 0 ? Math.max(...F.map((gt) => gt.zIndex || 0)) + 1 : 1, ve = jt[F.length % jt.length], it = {
              stationId: ye.stationId,
              displayId: ye.displayId,
              label: ye.label,
              x: tn(ie, 0, Te - mt),
              y: tn(be, 0, Pe - ut),
              width: mt,
              height: ut,
              sourceWidth: ye.sourceWidth || 1920,
              sourceHeight: ye.sourceHeight || 1080,
              nativeAspectRatio: je,
              aspectRatio: je,
              zIndex: dt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ve,
              shadowEffect: "deep",
              borderRadius: 0
            }, Pt = [...F, it];
            he(Pt), Re(Pt.length - 1);
          }
        } else if (D.type === "placed" && D.origIdx !== void 0) {
          const ye = F.map((je, mt) => mt === D.origIdx ? {
            ...je,
            x: tn(ie, 0, Te - je.width),
            y: tn(be, 0, Pe - je.height)
          } : je);
          he(ye), Re(D.origIdx);
        }
      } catch (D) {
        console.warn("Canvas drop failed:", D);
      }
  }, [hn, F, he, Te, Pe]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: kt,
      className: `multicam-viewport-root canvas-grid ${lt ? "fullscreen-grid-active" : ""}`,
      children: [
        (at || Qe) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: at ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        mn && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${mn.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: mn.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: mn.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs(
          "div",
          {
            ref: Lt,
            className: `canvas-stage-wrapper ${Gn ? "is-full-width-mode" : "is-fit-stage-mode"}`,
            onClick: (m) => {
              var E, D;
              (m.target === Lt.current || (D = (E = m.target) == null ? void 0 : E.classList) != null && D.contains("canvas-stage-wrapper")) && (Re(null), At(!1));
            },
            children: [
              Me && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                      F.length,
                      " on canvas"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Fe(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filter workstations / displays...",
                    value: X,
                    onChange: (m) => ne(m.target.value)
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                  Zs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Zs.length })
                    ] }),
                    Zs.map((m, E) => {
                      const D = ge && ge.type === "placed" && ge.origIdx === m.origIdx, Y = tt.index === E ? tt.position === "above" ? "drop-above" : "drop-below" : "";
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row ${m.isSelected ? "is-selected" : ""} ${D ? "is-dragging-row" : ""} ${Y}`,
                          draggable: !0,
                          onDragStart: (W) => Hu(W, m),
                          onDragOver: (W) => om(W, E),
                          onDragLeave: (W) => am(W, E),
                          onDrop: (W) => im(W, E),
                          onDragEnd: Ku,
                          onClick: () => Re(m.origIdx),
                          title: `Drag to reorder layer (${m.label})`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                            /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${m.layerRank}`, children: [
                              "#",
                              m.layerRank
                            ] }),
                            /* @__PURE__ */ s.jsx("span", { className: `status-dot ${m.isSelected ? "active" : ""}` }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: m.label, children: m.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              m.sourceWidth,
                              "×",
                              m.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (W) => W.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => qt(m.origIdx),
                                  title: "Bring Forward (Layer +1)",
                                  children: "⬆️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => Ut(m.origIdx),
                                  title: "Send Backward (Layer -1)",
                                  children: "⬇️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-remove-row",
                                  onClick: () => et(m.origIdx),
                                  title: "Remove from canvas",
                                  children: "✕"
                                }
                              )
                            ] })
                          ]
                        },
                        `feed-layer-${m.stationId}-${m.displayId}-${m.origIdx}`
                      );
                    })
                  ] }),
                  Do.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Do.length })
                    ] }),
                    Do.map((m) => {
                      const E = ge && ge.type === "unplaced" && ge.stationId === m.stationId && ge.displayId === m.displayId;
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row unplaced ${E ? "is-dragging-row" : ""}`,
                          draggable: !0,
                          onDragStart: (D) => Hu(D, m),
                          onDragEnd: Ku,
                          onClick: () => Ye(m.feed),
                          title: `Drag onto canvas or layers, or click to add ${m.label}`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                            /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                            /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: m.label, children: m.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              m.sourceWidth,
                              "×",
                              m.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (D) => D.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-add-row",
                                onClick: () => Ye(m.feed),
                                title: "Add to canvas",
                                children: "＋ ADD"
                              }
                            ) })
                          ]
                        },
                        `unplaced-feed-${m.stationId}-${m.displayId}`
                      );
                    })
                  ] }),
                  Zs.length === 0 && Do.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Qs("auto"), children: "⊞ ADD ALL FEEDS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: ot, children: "🗑️ CLEAR CANVAS" })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
                /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Me ? "active" : ""}`,
                      onClick: () => Fe((m) => !m),
                      title: `Feeds & Layers Palette (${F.length}/${hn.length} on canvas)`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: F.length }),
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
                        className: `btn-wing-tool ${nt ? "active" : ""}`,
                        onClick: () => {
                          _e((m) => !m), pe(!1);
                        },
                        title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                        ]
                      }
                    ),
                    nt && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                      /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "auto-grid" ? "active" : ""}`,
                          onClick: () => {
                            Qt("auto-grid"), Qs("auto-grid"), _e(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                            /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                              const m = new Set((t && t.length > 0 ? t : n).map((ee) => ee.id)), E = (F || []).filter((ee) => m.has(ee.stationId)), D = (t && t.length > 0 ? t : n).filter((ee) => !E.some((Y) => Y.stationId === ee.id));
                              return E.length > 0 ? E.length + D.length : vn.length;
                            })() })
                          ]
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "1x1" ? "active" : ""}`,
                          onClick: () => {
                            Qt("1x1"), Qs("1x1"), _e(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "1x2" ? "active" : ""}`,
                          onClick: () => {
                            Qt("1x2"), Qs("1x2"), _e(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "2x2" ? "active" : ""}`,
                          onClick: () => {
                            Qt("2x2"), Qs("2x2"), _e(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "1+3-pip" ? "active" : ""}`,
                          onClick: () => {
                            Qt("1+3-pip"), Qs("1+3-pip"), _e(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${ln === "hero-stacked" ? "active" : ""}`,
                          onClick: () => {
                            Qt("hero-stacked"), Qs("hero-stacked"), _e(!1);
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
                        className: `btn-wing-tool ${se ? "active" : ""}`,
                        onClick: () => {
                          pe((m) => !m), _e(!1);
                        },
                        title: `Aspect Ratio: ${wt} (Click to change)`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: wt })
                        ]
                      }
                    ),
                    se && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                      os.map((m) => /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${wt === m.id ? "active" : ""}`,
                          onClick: () => {
                            Ve(m.id), pe(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: m.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                              m.w,
                              "×",
                              m.h
                            ] })
                          ]
                        },
                        m.id
                      ))
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Gn ? "highlight-emerald" : "highlight-cyan"}`,
                      onClick: Ao,
                      title: Gn ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Gn ? "↔" : "⊞" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Gn ? "100%" : "FIT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${An ? "active" : ""}`,
                      onClick: () => wn((m) => !m),
                      title: An ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
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
                      className: `btn-wing-tool ${Ot ? "active" : ""}`,
                      onClick: () => an((m) => !m),
                      title: Ot ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                      onClick: di,
                      disabled: Vt.current.length === 0,
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
                      onClick: hi,
                      disabled: rs.current.length === 0,
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
                    ref: (m) => {
                      Tt.current = m, Ys.current = m;
                    },
                    className: `canvas-master-frame-16-9 ${Gn ? "is-full-width" : "is-fit-stage"}`,
                    style: {
                      width: qe.width > 180 ? `${qe.width}px` : "100%",
                      height: qe.height > 100 ? `${qe.height}px` : "auto",
                      aspectRatio: `${Te} / ${Pe}`
                    },
                    onMouseMove: Lo,
                    onMouseLeave: ii,
                    onDragOver: (m) => {
                      m.preventDefault(), m.dataTransfer.dropEffect = "copy";
                    },
                    onDrop: cm,
                    onClick: (m) => {
                      var E, D, ee, Y, W, ie;
                      (m.target === Tt.current || (D = (E = m.target) == null ? void 0 : E.classList) != null && D.contains("canvas-master-frame-16-9") || (Y = (ee = m.target) == null ? void 0 : ee.classList) != null && Y.contains("corner-accent") || (ie = (W = m.target) == null ? void 0 : W.classList) != null && ie.contains("canvas-work-surface")) && (Re(null), At(!1));
                    },
                    children: [
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                      Bn && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-ghost-preview",
                          style: {
                            position: "absolute",
                            left: `${Bn.x / Te * 100}%`,
                            top: `${Bn.y / Pe * 100}%`,
                            width: `${Bn.width / Te * 100}%`,
                            height: `${Bn.height / Pe * 100}%`,
                            zIndex: 9990,
                            pointerEvents: "none"
                          },
                          children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                            /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Bn.label })
                          ] })
                        }
                      ),
                      Ot && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                        /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Te}×${Pe}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Dt.isInside ? `${Dt.x},${Dt.y}` : "px" }) }),
                        /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-x",
                            viewBox: `0 0 ${Te} 20`,
                            preserveAspectRatio: "none",
                            children: [
                              Js && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: Js.x,
                                  y: "0",
                                  width: Js.width,
                                  height: "20",
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              $o.map((m) => m.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "0", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: m.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: m.val })
                              ] }, `rx-${m.val}`) : m.isMed ? /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "8", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${m.val}`) : /* @__PURE__ */ s.jsx("line", { x1: m.val, y1: "13", x2: m.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${m.val}`)),
                              Dt.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: Dt.x,
                                  y1: "0",
                                  x2: Dt.x,
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
                            viewBox: `0 0 20 ${Pe}`,
                            preserveAspectRatio: "none",
                            children: [
                              Js && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: Js.y,
                                  width: "20",
                                  height: Js.height,
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              Ro.map((m) => m.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: "0", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: "2", y: m.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: m.val })
                              ] }, `ry-${m.val}`) : m.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${m.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: m.val, x2: "18", y2: m.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${m.val}`)),
                              Dt.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: "0",
                                  y1: Dt.y,
                                  x2: "20",
                                  y2: Dt.y,
                                  stroke: "#06B6D4",
                                  strokeWidth: "2"
                                }
                              )
                            ]
                          }
                        ) })
                      ] }),
                      Et.vertical !== null && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-guide-v",
                          style: {
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${Et.vertical}%`,
                            width: "2px",
                            background: "#06B6D4",
                            boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                            zIndex: 9999,
                            pointerEvents: "none"
                          }
                        }
                      ),
                      Et.horizontal !== null && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-guide-h",
                          style: {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: `${Et.horizontal}%`,
                            height: "2px",
                            background: "#06B6D4",
                            boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                            zIndex: 9999,
                            pointerEvents: "none"
                          }
                        }
                      ),
                      F.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                        /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                        /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                        /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                        /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Fe(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Qs("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                        ] })
                      ] }),
                      rm.map((m) => {
                        var _t;
                        const E = m.originalIndex, D = ze === E, ee = at && ze === E, Y = Qe && ze === E, W = (n.length > 0 ? n : t).find(
                          (Ne) => {
                            var yt, ft, Ir, qs;
                            return Ne.id === m.stationId || ((yt = Ne.hostname) == null ? void 0 : yt.toLowerCase()) === ((ft = m.stationId) == null ? void 0 : ft.toLowerCase()) || ((Ir = Ne.id) == null ? void 0 : Ir.toLowerCase()) === ((qs = m.stationId) == null ? void 0 : qs.toLowerCase());
                          }
                        ), ie = hn.find((Ne) => Ne.stationId === m.stationId && Ne.displayId === m.displayId), be = W || {
                          id: m.stationId,
                          hostname: (ie == null ? void 0 : ie.stationHostname) || m.stationHostname || m.stationId,
                          displayName: (ie == null ? void 0 : ie.stationName) || m.label || m.stationId,
                          displays: ie ? [{ displayId: ie.displayId, width: ie.sourceWidth, height: ie.sourceHeight }] : []
                        }, ye = (be == null ? void 0 : be.displays) || ((_t = be == null ? void 0 : be.topology) == null ? void 0 : _t.displays) || [], je = F.filter(
                          (Ne) => Ne.stationId === m.stationId || be && (Ne.stationId === be.id || Ne.stationId === be.hostname)
                        ), mt = ye.length > 1 && je.length >= ye.length, ut = m.borderColor || jt[E % jt.length], dt = m.borderWidth !== void 0 ? m.borderWidth : 2, ve = m.rotation || 0, it = m.shadowEffect || "deep", Pt = m.borderRadius || 0, gt = m.x / Te * 100, Ct = m.y / Pe * 100, Rn = m.width / Te * 100, Qn = m.height / Pe * 100, Wt = cx(it, D, ut);
                        m.y < 50, m.x < 100, m.x + m.width > Te - 100;
                        const Rt = m.zIndex !== void 0 ? m.zIndex : E + 1;
                        return /* @__PURE__ */ s.jsxs(
                          "div",
                          {
                            className: `canvas-feed-card-box ${D ? "is-selected" : ""} ${ee ? "is-dragging" : ""} ${Y ? "is-resizing" : ""}`,
                            style: {
                              position: "absolute",
                              left: `${gt}%`,
                              top: `${Ct}%`,
                              width: `${Rn}%`,
                              height: `${Qn}%`,
                              zIndex: ee || Y ? 2e3 : D ? 1e3 + Rt * 10 : Rt * 10,
                              transformOrigin: "center center",
                              border: `${dt}px solid ${ut}`,
                              borderRadius: `${Pt}px`,
                              boxShadow: Wt,
                              opacity: m.opacity !== void 0 ? m.opacity : 1,
                              pointerEvents: m.opacity !== void 0 && m.opacity < 0.1 ? "none" : "auto",
                              cursor: ee ? "grabbing" : "grab",
                              transition: ee || Y ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                            },
                            onMouseDown: (Ne) => ui(Ne, E),
                            onContextMenu: (Ne) => {
                              Ne.preventDefault(), Ne.stopPropagation(), Re(E), At(!0);
                            },
                            onClick: (Ne) => {
                              Ne.stopPropagation(), Re(E);
                            },
                            children: [
                              /* @__PURE__ */ s.jsxs(
                                "div",
                                {
                                  className: "box-header-badge",
                                  onMouseDown: (Ne) => ui(Ne, E),
                                  onDoubleClick: () => br(E),
                                  title: "Click and drag to move window (Double-click to expand 1x1)",
                                  children: [
                                    /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                      /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                      /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                      Gt === E ? /* @__PURE__ */ s.jsxs(
                                        "span",
                                        {
                                          className: "badge-title-edit-container",
                                          onClick: (Ne) => Ne.stopPropagation(),
                                          onMouseDown: (Ne) => Ne.stopPropagation(),
                                          onDoubleClick: (Ne) => Ne.stopPropagation(),
                                          children: [
                                            /* @__PURE__ */ s.jsx(
                                              "input",
                                              {
                                                ref: $e,
                                                type: "text",
                                                className: "badge-title-input",
                                                value: dn,
                                                placeholder: `${be.displayName || m.stationId} (${m.displayId})`,
                                                onChange: (Ne) => De(Ne.target.value),
                                                onKeyDown: (Ne) => {
                                                  Ne.stopPropagation(), Ne.key === "Enter" ? (Ne.preventDefault(), Mr(E)) : Ne.key === "Escape" && (Ne.preventDefault(), Kt(null));
                                                },
                                                onBlur: () => Mr(E)
                                              }
                                            ),
                                            /* @__PURE__ */ s.jsx(
                                              "button",
                                              {
                                                type: "button",
                                                className: "btn-edit-title is-saving",
                                                onClick: (Ne) => {
                                                  Ne.stopPropagation(), Mr(E);
                                                },
                                                title: "Save screen title (Enter)",
                                                children: "✓"
                                              }
                                            )
                                          ]
                                        }
                                      ) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                        /* @__PURE__ */ s.jsx(
                                          "span",
                                          {
                                            className: "badge-title-text",
                                            onDoubleClick: (Ne) => {
                                              Ne.stopPropagation(), Kt(E), De(m.label || "");
                                            },
                                            title: "Double-click to rename screen (burned into video)",
                                            children: m.label || `${be.displayName || m.stationId} (${m.displayId})`
                                          }
                                        ),
                                        /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: "btn-edit-title",
                                            onClick: (Ne) => {
                                              Ne.stopPropagation(), Kt(E), De(m.label || "");
                                            },
                                            title: "Rename screen title (burned into video)",
                                            children: "✏️"
                                          }
                                        )
                                      ] })
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                      Math.round(m.width),
                                      "×",
                                      Math.round(m.height),
                                      " (",
                                      Zr(m.width, m.height),
                                      ") @ (",
                                      Math.round(m.x),
                                      ",",
                                      Math.round(m.y),
                                      ")",
                                      ve !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                        "📐",
                                        ve,
                                        "°"
                                      ] })
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Rt}`, children: [
                                      "#$",
                                      Rt
                                    ] }),
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-badge-action-inspector ${D && vt ? "active" : ""}`,
                                        onClick: (Ne) => {
                                          Ne.stopPropagation(), Re(E), At((yt) => !yt || ze !== E);
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
                                      transform: ve ? `rotate(${ve}deg)` : void 0,
                                      transformOrigin: "center center",
                                      transition: ee ? "none" : "transform 0.2s ease-out"
                                    },
                                    children: /* @__PURE__ */ s.jsx(
                                      Qg,
                                      {
                                        station: be,
                                        isSolo: !1,
                                        currentEpochMs: te,
                                        timeMode: p,
                                        isPlaying: y,
                                        setIsPlaying: j,
                                        baseEpochMs: d,
                                        totalDurationMs: C,
                                        outPointMs: w,
                                        setPlayheadMs: g,
                                        globalGaps: x,
                                        onOpenSpotlight: l,
                                        onSelectActiveStation: null,
                                        recordingSegments: I,
                                        playbackSpeed: S,
                                        activeAudioStationId: Ie,
                                        onSoloAudio: Le,
                                        directorPlan: k || (be == null ? void 0 : be.directorPlan),
                                        isAutoDirectorEnabled: i ? i[be.id] ?? !0 : !0,
                                        stationsCount: t.length,
                                        onDeselectStation: a,
                                        targetDisplayId: m.displayId,
                                        onSelectDisplayId: (Ne) => {
                                          const yt = F.map((ft, Ir) => Ir === E ? { ...ft, displayId: Ne } : ft);
                                          he(yt);
                                        },
                                        areAllDisplaysPlaced: mt,
                                        slotIndex: E,
                                        borderColor: ut,
                                        isDecoderAllowed: lm[E] ?? !0,
                                        maxHeight: ox(
                                          Math.round((m.width || 1920) * (((qe == null ? void 0 : qe.width) || 960) / Te)),
                                          Math.round((m.height || 1080) * (((qe == null ? void 0 : qe.height) || 540) / Pe))
                                        )
                                      }
                                    )
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "card-drag-surface",
                                    onMouseDown: (Ne) => ui(Ne, E),
                                    onDoubleClick: () => br(E),
                                    title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                                  }
                                )
                              ] }),
                              D && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-tl",
                                    onMouseDown: (Ne) => Oo(Ne, E, "tl"),
                                    title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-tr",
                                    onMouseDown: (Ne) => Oo(Ne, E, "tr"),
                                    title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-bl",
                                    onMouseDown: (Ne) => Oo(Ne, E, "bl"),
                                    title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-br",
                                    onMouseDown: (Ne) => Oo(Ne, E, "br"),
                                    title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`,
                                    children: "↘"
                                  }
                                )
                              ] })
                            ]
                          },
                          `feed-${m.stationId}-${m.displayId}-${E}`
                        );
                      }),
                      !U && vt && ze !== null && Js && (() => {
                        const m = Js, E = ze, D = m.borderColor || jt[E % jt.length], ee = m.borderWidth !== void 0 ? m.borderWidth : 2, Y = m.rotation || 0, W = m.shadowEffect || "deep", ie = m.zIndex !== void 0 ? m.zIndex : E + 1, be = m.x / Te * 100, ye = m.width / Te * 100, je = be + ye / 2;
                        let mt = `${je}%`, ut = "translateX(-50%)";
                        je < 28 ? (mt = `${Math.max(1, be)}%`, ut = "none") : je > 72 && (mt = `${Math.min(99, be + ye)}%`, ut = "translateX(-100%)");
                        const dt = m.y + m.height + 8;
                        let ve;
                        dt + 45 > Pe ? ve = `${Math.max(20, (m.y + m.height - 44) / Pe * 100)}%` : ve = `${dt / Pe * 100}%`;
                        const it = (n.length > 0 ? n : t).find(
                          (gt) => {
                            var Ct, Rn;
                            return gt.id === m.stationId || ((Ct = gt.hostname) == null ? void 0 : Ct.toLowerCase()) === ((Rn = m.stationId) == null ? void 0 : Rn.toLowerCase());
                          }
                        ), Pt = it ? it.id : m.stationId;
                        return /* @__PURE__ */ s.jsxs(
                          "div",
                          {
                            className: "floating-feed-inspector compact-hud-inspector",
                            style: {
                              position: "absolute",
                              left: mt,
                              top: ve,
                              transform: ut,
                              zIndex: 99999
                            },
                            onMouseDown: (gt) => gt.stopPropagation(),
                            onClick: (gt) => gt.stopPropagation(),
                            children: [
                              /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${m.label || Pt} • Layer #${ie}`, children: [
                                "🎛️ #$",
                                ie
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "inspector-group title-rename-group", children: [
                                /* @__PURE__ */ s.jsx("span", { className: "inspector-group-label", children: "TITLE:" }),
                                /* @__PURE__ */ s.jsx(
                                  "input",
                                  {
                                    type: "text",
                                    className: "inspector-title-input",
                                    value: st,
                                    placeholder: `${(it == null ? void 0 : it.displayName) || m.stationId} (${m.displayId})`,
                                    onChange: (gt) => ue(gt.target.value),
                                    onKeyDown: (gt) => {
                                      gt.key === "Enter" && (gt.preventDefault(), Un(ze, st));
                                    },
                                    onBlur: () => {
                                      Un(ze, st);
                                    },
                                    title: "Rename screen feed (displayed on canvas and burned into exported video)"
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool color-swatch-trigger",
                                    onClick: () => Ge((gt) => !gt),
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
                                Ue && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: ix.map((gt) => /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-color-dot ${D === gt ? "is-active" : ""}`,
                                    style: { backgroundColor: gt === "transparent" ? "#1E293B" : gt },
                                    onClick: () => {
                                      en({ borderColor: gt }), Ge(!1);
                                    },
                                    title: gt === "transparent" ? "No Border (Transparent)" : `Border Color: ${gt}`
                                  },
                                  gt
                                )) })
                              ] }),
                              /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool",
                                  onClick: () => {
                                    const gt = [0, 2, 4, 8], Ct = gt[(gt.indexOf(ee) + 1) % gt.length];
                                    en({ borderWidth: Ct });
                                  },
                                  title: `Border Width: ${ee}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                                  children: [
                                    "📏 ",
                                    ee,
                                    "px"
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-mini-tool ${W !== "none" ? "highlight-glow" : ""}`,
                                  onClick: () => {
                                    const gt = ["none", "deep", "glow-cyan", "glow-emerald"], Ct = gt[(gt.indexOf(W) + 1) % gt.length];
                                    en({ shadowEffect: Ct });
                                  },
                                  title: `Shadow Effect: ${W} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                                  children: "🌑"
                                }
                              ),
                              /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool",
                                    onClick: () => qt(E),
                                    title: "Step Layer Up (+1)",
                                    children: "▲"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool",
                                    onClick: () => Ut(E),
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
                                  onClick: () => ci(90),
                                  title: `Rotate: Step 90° clockwise (Current: ${Y}°)`,
                                  children: "↺ 90°"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool highlight",
                                  onClick: () => tm(E),
                                  title: `Snap to Native Recorded Aspect (${Zr(m.sourceWidth, m.sourceHeight)})`,
                                  children: "📐 NATIVE"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool highlight",
                                  onClick: () => br(E),
                                  title: "1x1 Focus Mode (Double-click window to toggle)",
                                  children: "⛶ 1x1"
                                }
                              ),
                              l && /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool",
                                  onClick: () => l(Pt, m.displayId),
                                  title: "Deep Forensic Multi-Angle Spotlight",
                                  children: "🔍"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool btn-del-feed",
                                  onClick: () => et(E),
                                  title: "Remove Screen from Canvas",
                                  children: "🗑️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool btn-close-inspector",
                                  onClick: () => {
                                    Re(null), At(!1);
                                  },
                                  title: "Deselect & Finish Editing (Esc)",
                                  children: "✕"
                                }
                              )
                            ]
                          }
                        );
                      })(),
                      /* @__PURE__ */ s.jsx(
                        Zg,
                        {
                          currentEpochMs: te,
                          position: Z,
                          onPositionChange: (m) => {
                            K(m);
                            try {
                              localStorage.setItem("itb_canvas_utc_clock_pos", m);
                            } catch {
                            }
                          }
                        }
                      ),
                      /* @__PURE__ */ s.jsx(qg, {})
                    ]
                  }
                ),
                /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-emerald",
                      onClick: () => Ee(!0),
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
                        onClick: () => We((m) => !m),
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
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => We(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Q.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Q.map((m) => {
                        var E;
                        return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                          Jp(m), We(!1);
                        }, children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: m.name }),
                            /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                              ((E = m.placements) == null ? void 0 : E.length) || 0,
                              " screens • ",
                              m.dateStr
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-del-preset",
                              onClick: (D) => Zp(m.id, D),
                              title: "Delete saved preset",
                              children: "🗑️"
                            }
                          )
                        ] }, m.id);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: qp,
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
                        var m;
                        return (m = q.current) == null ? void 0 : m.click();
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
                      ref: q,
                      type: "file",
                      accept: ".json",
                      style: { display: "none" },
                      onChange: em
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-rose",
                      onClick: () => {
                        $n.current = !1, Qt("auto-grid");
                        const m = vn.length > 0 ? vn : hn, E = tr(m, Te, Pe), D = {
                          id: "canvas-timeline-root",
                          keyframes: [
                            {
                              id: "kf_root_0",
                              timestampEpochMs: d,
                              transitionDurationSec: 0.5,
                              transitionType: "smooth",
                              layout: {
                                width: Te,
                                height: Pe,
                                backgroundColor: "#070A10",
                                fps: 30,
                                placements: E
                              }
                            }
                          ]
                        };
                        cn(D), O && O(D), Re(0);
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
                      onClick: ot,
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
                      className: `btn-wing-tool ${lt ? "active" : ""}`,
                      onClick: nm,
                      title: "Fullscreen Canvas Grid (F)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: lt ? "⤓" : "⛶" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: lt ? "EXIT" : "FULL" })
                      ]
                    }
                  )
                ] })
              ] }),
              " "
            ]
          }
        ) }),
        " ",
        ce && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => Ee(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => Ee(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: T,
                onChange: (m) => J(m.target.value),
                autoFocus: !0,
                onKeyDown: (m) => {
                  m.key === "Enter" && Uu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              F.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => Ee(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Uu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Wi = [0.5, 1, 1.25, 1.5, 2, 4];
function Hc({
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
  onChangeSpeed: j,
  onSetInPoint: C,
  onSetOutPoint: P
}) {
  const [w, g] = u.useState(() => kl()), { volume: x, isMuted: I } = w, S = !!(v && d > 0);
  u.useEffect(() => {
    const G = (O) => {
      O.detail && g(O.detail);
    };
    return window.addEventListener("itb-audio-state-changed", G), () => window.removeEventListener("itb-audio-state-changed", G);
  }, []);
  const M = u.useCallback((G, O, H) => {
    const b = {
      volume: typeof G == "number" ? G : x,
      isMuted: typeof O == "boolean" ? O : I,
      channelMode: H || w.channelMode || "both"
    };
    g(b), Kg(b);
  }, [x, I, w.channelMode]), h = (G) => {
    G == null || G.stopPropagation(), S && n(!t);
  }, A = (G) => {
    if (G == null || G.stopPropagation(), !S || !j) return;
    const O = Wi.indexOf(y), H = O === -1 ? 1 : (O + 1) % Wi.length;
    j(Wi[H]);
  }, k = (G) => {
    G == null || G.stopPropagation(), I ? M(x === 0 ? 0.5 : x, !1) : M(x, !0);
  }, N = (G) => {
    G.stopPropagation();
    const O = parseFloat(G.target.value);
    O === 0 ? M(0, !0) : M(O, !1);
  }, _ = (G) => {
    const O = u.useRef(null), H = u.useRef(null), b = u.useRef(0), U = u.useCallback(() => {
      O.current && clearTimeout(O.current), H.current && clearInterval(H.current), O.current = null, H.current = null;
    }, []), L = u.useCallback((te = 1) => {
      if (n && n(!1), a) {
        const Z = 33 * te;
        a((K) => {
          const Ie = G === "forward" ? K + Z : K - Z;
          return Math.max(0, Math.min(d, Ie));
        });
      } else G === "forward" && f ? f() : G === "backward" && p && p();
    }, [G]), ae = u.useCallback((te) => {
      te.preventDefault(), te.stopPropagation(), S && (U(), L(1), b.current = performance.now(), O.current = setTimeout(() => {
        H.current = setInterval(() => {
          const Z = performance.now() - b.current, K = Z > 2500 ? 4 : Z > 1e3 ? 2 : 1;
          L(K);
        }, 50);
      }, 280));
    }, [L, U]);
    return u.useEffect(() => U, [U]), {
      onMouseDown: ae,
      onMouseUp: U,
      onMouseLeave: U,
      onTouchStart: ae,
      onTouchEnd: U
    };
  }, z = _("backward"), R = _("forward"), B = (G) => {
    G.stopPropagation(), S && (n && n(!1), a && a(i));
  }, oe = (G) => {
    G.stopPropagation(), S && (n && n(!1), a && a(c));
  }, re = () => I || x === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : x < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
            onClick: (G) => {
              G.stopPropagation(), C == null || C();
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
              onClick: (G) => {
                G.stopPropagation(), l && l(!r);
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
              disabled: !S,
              ...z,
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
              disabled: !S,
              ...R,
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
              onClick: oe,
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
            disabled: !P,
            onClick: (G) => {
              G.stopPropagation(), P == null || P();
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
              className: `btn-audio-mute ${I || x === 0 ? "is-muted" : ""}`,
              onClick: k,
              title: I ? "Unmute" : `Mute (${Math.round(x * 100)}%)`,
              children: re()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: I ? 0 : x,
              onChange: N,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const xa = 2500, dx = {
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
function hx(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return dx[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function Bp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(hx), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Up(e, t = " + ") {
  return Bp(e).join(t);
}
function zl(e) {
  return Up(e, "+");
}
const fx = 8;
function px({
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
  const [v, f] = u.useState([]), [, p] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((x) => ({
    id: x.id,
    name: x.displayName || x.hostname || x.name || x.id,
    hostname: x.hostname || x.id
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
    const x = new AbortController(), I = Math.max(0, l + a - xa), S = l + a + i + xa;
    p(!0);
    const M = y.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${I}&endEpoch=${S}`;
      return fetch(A, { signal: x.signal }).then((k) => k.ok ? k.json() : []).then((k) => (Array.isArray(k) ? k : []).map((N) => ({
        ...N,
        stationId: h.id,
        stationName: h.name
      }))).catch((k) => {
        if (k.name !== "AbortError") return [];
        throw k;
      });
    });
    return Promise.all(M).then((h) => {
      const A = h.flat();
      f(A), p(!1);
    }).catch((h) => {
      h.name !== "AbortError" && (f([]), p(!1));
    }), () => x.abort();
  }, [y, l, a, i, r]);
  const j = r && Array.isArray(r) && r.length > 0 ? r : v, C = u.useMemo(() => {
    if (!j.length || i <= 0 || c <= 0)
      return [];
    const x = l + a, I = x + i, S = [...j].sort((k, N) => k.epochMs - N.epochMs), M = [];
    let h = null, A = -999;
    for (const k of S) {
      const N = k.epochMs + xa;
      if (N < x || N > I)
        continue;
      const _ = N - l, z = (_ - a) / i * c;
      if (h && z - A < fx) {
        h.events.push(k), h.endOffsetMs = _, h.endEpochMs = N;
        const R = new Set(h.events.map((B) => B.stationName || "Workstation"));
        h.isMultiStation = R.size > 1, h.stationCount = R.size, A = z;
      } else {
        const R = (_ - a) / i * 100;
        h = {
          id: `kc_${k.epochMs}_${M.length}`,
          startOffsetMs: _,
          endOffsetMs: _,
          startEpochMs: N,
          endEpochMs: N,
          pct: R,
          events: [k],
          isMultiStation: !1,
          stationCount: 1
        }, M.push(h), A = z;
      }
    }
    return M;
  }, [j, l, a, i, c]);
  function P(x) {
    if (!x.events.length) return "";
    if (x.events.length === 1)
      return zl(x.events[0].keyCombination);
    const I = x.events.find((h) => h.keyCombination.includes("+"));
    if (I) {
      const h = zl(I.keyCombination);
      return x.events.length > 1 ? `${h} (+${x.events.length - 1})` : h;
    }
    const S = zl(x.events[0].keyCombination);
    return x.events.every((h) => zl(h.keyCombination) === S) ? `${S} ×${x.events.length}` : `${S} (+${x.events.length - 1})`;
  }
  function w(x, I = "LOCAL") {
    return St(x, I);
  }
  function g(x) {
    const I = [];
    for (const S of x) {
      const M = zl(S.keyCombination);
      I.length && I[I.length - 1].key === M ? I[I.length - 1].count++ : I.push({ key: M, count: 1 });
    }
    return I;
  }
  return C.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: C.map((x) => {
    const I = x.events.length, S = I > 1, M = x.isMultiStation, h = P(x), A = w(x.startEpochMs, o), k = x.pct < 10 ? "edge-left" : x.pct > 90 ? "edge-right" : "", N = {};
    return x.events.forEach((_) => {
      const z = _.stationName || e || "Workstation";
      N[z] || (N[z] = []), N[z].push(_);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${S ? "is-cluster" : "is-single"} ${M ? "is-multi-station" : ""}`,
        style: { left: `${x.pct}%` },
        onClick: (_) => {
          _.stopPropagation(), d && d(x.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${A}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            S && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: M ? `${x.stationCount}S` : I > 9 ? "9+" : I })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${k}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: M ? `MULTICAM KEYSTROKES (${x.stationCount} WORKSTATIONS • ${I} EVT)` : S ? `KEYSTROKE BURST (${I})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([_, z]) => {
              const R = g(z);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: _ }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    z.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  R.slice(0, 6).map((B, oe) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    B.key,
                    B.count > 1 ? ` ×${B.count}` : ""
                  ] }, oe)),
                  R.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    R.length - 6,
                    " more"
                  ] })
                ] })
              ] }, _);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      x.id
    );
  }) }) : null;
}
const mx = u.memo(px), zi = [
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
], gx = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function xx({
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
  showKeystrokes: j = !0,
  keystrokes: C = []
}) {
  const P = u.useRef(null), [w, g] = u.useState(1e3);
  u.useEffect(() => {
    if (!P.current) return;
    const L = new ResizeObserver((ae) => {
      for (let te of ae)
        te.contentRect.width > 50 && g(te.contentRect.width);
    });
    return L.observe(P.current), () => L.disconnect();
  }, []);
  const x = u.useCallback((L) => !r || r <= 0 ? "0%" : `${(L - n) / r * 100}%`, [r, n]), I = u.useCallback((L) => {
    const te = (L - n) / r * 100;
    return te >= -5 && te <= 105;
  }, [n, r]), S = (L) => {
    if (!P.current) return;
    const ae = P.current.getBoundingClientRect(), te = Math.max(0, Math.min(L.clientX - ae.left, ae.width)), Z = Math.round(n + te / ae.width * r);
    a && a(Z);
  }, M = () => {
    a && a(null);
  }, h = (L) => {
    if (!P.current || !i) return;
    const ae = P.current.getBoundingClientRect(), te = Math.max(0, Math.min(L.clientX - ae.left, ae.width)), Z = Math.round(n + te / ae.width * r);
    i(Math.max(0, Math.min(l, Z)));
  }, A = u.useMemo(() => {
    const L = Math.max(3, Math.floor(w / 95)), ae = r / L;
    for (let te of zi)
      if (te >= ae) return te;
    return zi[zi.length - 1];
  }, [r, w]), k = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const L = e + n, ae = L + r, te = t === "LOCAL" ? Us(L).offsetMin * 60 * 1e3 : 0, Z = L + te, K = Math.ceil(Z / A) * A, Ie = [];
    for (let Le = K; Le <= ae + te; Le += A) {
      const Me = Le - te, Fe = (Me - L) / r * 100;
      Fe >= 0 && Fe <= 100 && Ie.push({
        epoch: Me,
        pct: Fe,
        label: St(Me, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return Ie;
  }, [e, n, r, A, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const L = e + n, ae = L + r;
    return $p(L, ae).map((te) => ({
      ...te,
      pct: (te.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), _ = u.useMemo(() => {
    if (!r || !e) return [];
    const L = e + n, ae = L + r, te = t === "UTC", Z = [], K = te ? 0 : Us(L).offsetMin * 60 * 1e3, Ie = L + K, Le = ae + K, Me = new Date(Ie);
    for (Me.setUTCHours(0, 0, 0, 0), Me.getTime() < Ie && Me.setUTCDate(Me.getUTCDate() + 1); Me.getTime() <= Le; ) {
      const ge = Me.getTime() - K, Se = (ge - L) / r * 100, tt = String(Me.getUTCDate()).padStart(2, "0"), pt = gx[Me.getUTCMonth()], ce = `${tt} ${pt}`;
      Z.push({ epoch: ge, pct: Se, dateLabel: ce }), Me.setUTCDate(Me.getUTCDate() + 1);
    }
    return Z;
  }, [e, n, r, t]), {
    globalFirstMs: z = v,
    globalLastMs: R = null,
    currentFirstMs: B = null,
    currentLastMs: oe = null
  } = f || { globalFirstMs: v }, re = z !== null && B !== null && Math.abs(z - B) < 1e3, G = R !== null && oe !== null && Math.abs(R - oe) < 1e3, O = u.useMemo(() => {
    const L = [];
    return re ? I(z) && L.push({
      id: "first-combined",
      ms: z,
      pct: x(z),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${St(e + z, t)} (Click to jump)`
    }) : (I(z) && L.push({
      id: "first-global",
      ms: z,
      pct: x(z),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${St(e + z, t)} (Click to jump)`
    }), I(B) && L.push({
      id: "first-current",
      ms: B,
      pct: x(B),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${St(e + B, t)} (Click to jump)`
    })), G ? I(R) && L.push({
      id: "last-combined",
      ms: R,
      pct: x(R),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${St(e + R, t)} (Click to jump)`
    }) : (I(oe) && L.push({
      id: "last-current",
      ms: oe,
      pct: x(oe),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${St(e + oe, t)} (Click to jump)`
    }), I(R) && L.push({
      id: "last-global",
      ms: R,
      pct: x(R),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${St(e + R, t)} (Click to jump)`
    })), L;
  }, [
    z,
    R,
    B,
    oe,
    re,
    G,
    e,
    t,
    y,
    I,
    x
  ]), H = u.useMemo(() => {
    const L = [];
    return typeof c == "number" && I(c) && L.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: x(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${St(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && I(d) && L.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: x(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${St(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), L;
  }, [c, d, e, t, I, x]), b = o !== null ? x(o) : null, U = b !== null && b >= 0 && b <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: P,
      className: "timeline-ruler-root",
      onMouseMove: S,
      onMouseLeave: M,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          k.map((L) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${L.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: L.label })
          ] }, L.epoch)),
          j && /* @__PURE__ */ s.jsx(
            mx,
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
          N.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${L.pct}%` },
              title: `${L.description} (${L.labelBefore} ➔ ${L.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: L.description })
                ] })
              ]
            },
            L.switchEpochMs
          )),
          _.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${L.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: L.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            L.epoch
          )),
          O.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: L.className,
              style: { left: `${L.pct}` },
              onClick: (ae) => {
                ae.stopPropagation(), i && i(L.ms);
              },
              title: L.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: L.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            L.id
          )),
          H.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${L.type}-cut-tick`,
              style: { left: `${L.pct}` },
              onClick: (ae) => {
                ae.stopPropagation(), i && i(L.ms);
              },
              title: L.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: L.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: L.shortLabel })
                ] })
              ]
            },
            L.id
          ))
        ] }),
        U && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${b}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: St(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const zn = (e) => String(e).padStart(2, "0");
function yx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, p] = u.useState(""), [y, j] = u.useState(""), C = u.useCallback((k) => {
    if (!k || isNaN(k) || k <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const R = new Date(k);
      return {
        timeStr: `${zn(R.getUTCHours())}:${zn(R.getUTCMinutes())}:${zn(R.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: _ } = Us(k), z = new Date(k + N * 60 * 1e3);
    return {
      timeStr: `${zn(z.getUTCHours())}:${zn(z.getUTCMinutes())}:${zn(z.getUTCSeconds())}`,
      zoneLabel: _
    };
  }, [t]), P = u.useCallback((k) => {
    if (!k || k < 0) return "00:00:00";
    const N = Math.floor(k / 1e3), _ = Math.floor(N / 3600), z = Math.floor(N % 3600 / 60), R = N % 60;
    return `${zn(_)}:${zn(z)}:${zn(R)}`;
  }, []), w = u.useMemo(() => C(e + r), [C, e, r]), g = u.useMemo(() => C(e + o), [C, e, o]), x = u.useMemo(() => P(Math.max(0, o - r)), [P, r, o]), I = u.useCallback((k, N) => {
    if (!k || !k.trim()) return N;
    const z = k.trim().split(" ")[0].split(":").map(Number);
    if (z.length < 2 || z.some(isNaN)) return N;
    const [R, B, oe = 0] = z;
    if (t === "UTC") {
      const K = new Date(e);
      K.setUTCHours(R, B, oe, 0);
      let Ie = K.getTime();
      for (; Ie < e; ) Ie += 864e5;
      for (; Ie > e + n + 1e3; ) Ie -= 864e5;
      const Le = Ie - e;
      return isNaN(Le) ? N : Math.max(0, Math.min(n, Le));
    }
    const { offsetMin: re } = Us(e), G = new Date(e + re * 6e4), O = G.getUTCFullYear(), H = G.getUTCMonth(), b = G.getUTCDate(), U = `${O}-${zn(H + 1)}-${zn(b)}`, L = `${zn(R)}:${zn(B)}:${zn(oe)}`, ae = za(U, L);
    let te;
    if (ae.isAmbiguous) {
      const K = e + N, Ie = Math.abs(ae.firstOccurrenceEpoch - K), Le = Math.abs(ae.secondOccurrenceEpoch - K);
      te = Ie <= Le ? ae.firstOccurrenceEpoch : ae.secondOccurrenceEpoch;
    } else {
      const K = Date.UTC(O, H, b, R, B, oe), { offsetMin: Ie } = Us(K - re * 6e4);
      te = K - Ie * 6e4;
    }
    for (; te < e; ) te += 864e5;
    for (; te > e + n + 1e3; ) te -= 864e5;
    const Z = te - e;
    return isNaN(Z) ? N : Math.max(0, Math.min(n, Z));
  }, [e, t, n]), S = () => {
    p(w.timeStr), c(!0);
  }, M = () => {
    if (c(!1), !f || !f.trim() || f.trim() === w.timeStr)
      return;
    const k = I(f.trim(), r);
    k !== null && !isNaN(k) && k < o && l(k);
  }, h = () => {
    j(g.timeStr), v(!0);
  }, A = () => {
    if (v(!1), !y || !y.trim() || y.trim() === g.timeStr)
      return;
    const k = I(y.trim(), o);
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
          onBlur: M,
          onKeyDown: (k) => {
            k.key === "Enter" && M(), k.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: S,
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
          onChange: (k) => j(k.target.value),
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
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: x })
    ] })
  ] });
}
function vx({
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
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, p - f), j = Math.max(0, Math.min(100, l / r * 100)), C = Math.max(0, Math.min(100 - j, o / r * 100)), P = j + C, w = a > 1.05, g = 7, x = y >= 10, I = y >= 16, S = x, M = I, h = S && Math.abs(j - f) < g, A = w && C >= 12 && !h, k = M && Math.abs(P - p) < g, N = w && C >= 12 && !k;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (_) => v && v("minimap-viewport", _),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${f}%`, width: `${y}%` },
            children: [
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: St(t + i, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: St(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${j}%`, width: `${C}%` },
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
function Nx({
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
  const y = (d || "NONE").toUpperCase().replace("-", "_"), j = () => {
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
        onClick: j,
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
const bs = /* @__PURE__ */ new Map(), el = /* @__PURE__ */ new Map();
let Ps = [], wl = 0;
const ih = 3, kx = 8e3, wx = 80;
function Wp() {
  setTimeout(Ex, 0);
}
function Ex() {
  var e;
  if (!(wl >= ih || Ps.length === 0))
    for (Ps = Ps.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); wl < ih && Ps.length > 0; ) {
      const t = Ps.pop();
      !t || (e = t.signal) != null && e.aborted || (wl++, Cx(t));
    }
}
async function Cx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), wl = Math.max(0, wl - 1), el.delete(t), Wp());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, kx);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(p, { signal: a });
    if (y.ok && y.status !== 204) {
      const j = await y.blob();
      if (j && j.size > 1500) {
        const C = URL.createObjectURL(j);
        if (bs.size >= wx) {
          const P = bs.keys().next().value, w = bs.get(P);
          w && URL.revokeObjectURL(w), bs.delete(P);
        }
        bs.set(t, C), i(C);
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
const ch = {
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
    return bs.get(o);
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
    if (bs.has(a))
      return Promise.resolve(bs.get(a));
    if (el.has(a))
      return el.get(a);
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
        Ps = Ps.filter((v) => v.key !== a), el.delete(a), c(null);
      }, { once: !0 }), Ps.push(d), Wp();
    });
    return el.set(a, i), i;
  },
  clear() {
    bs.forEach((e) => URL.revokeObjectURL(e)), bs.clear(), el.clear(), Ps = [], wl = 0;
  }
}, jx = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Zn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, _r = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Kc({
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
  isCanvasSummary: j = !1
}) {
  const [C, P] = u.useState({}), w = u.useRef(C);
  w.current = C;
  const g = u.useMemo(() => jx(l), [l]), x = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: _ } = g, z = [], R = o + r, B = R + l, oe = R - N, re = B + N, G = [...n].sort((L, ae) => Zn(L) - Zn(ae)), O = j ? c || [] : [...c || [], ...d || []], H = (L, ae) => !O || O.length === 0 ? !1 : O.some((te) => {
      const Z = te.startEpochMs ?? te.startEpoch ?? te.start ?? 0, K = te.endEpochMs ?? te.endEpoch ?? te.end ?? 0;
      return K <= Z ? !1 : Math.max(L, Z) < Math.min(ae, K);
    }), b = o + a, U = o + i;
    if (G.forEach((L, ae) => {
      const te = Math.round(Zn(L)), Z = Math.round(_r(L));
      if (Z <= te) return;
      const K = Math.max(te, b), Ie = Math.min(Z, U);
      if (Ie <= K) return;
      const Le = Math.max(K, oe), Me = Math.min(Ie, re);
      if (Me <= Le) return;
      const Fe = Math.floor(Le / N) * N;
      for (let ge = Fe; ge < Me; ge += N) {
        const Se = ge + N, tt = Math.max(K, ge), pt = Math.min(Ie, Se);
        pt > tt && !H(tt, pt) && z.push({
          key: `${e}_${t}_${tt}_${pt}_${_}`,
          sIdx: ae,
          startEpoch: tt,
          endEpoch: pt,
          framesPerTile: _,
          displayId: t
        });
      }
    }), z.length > 20) {
      const L = o + r + l / 2;
      z.sort((ae, te) => {
        const Z = Math.abs((ae.startEpoch + ae.endEpoch) / 2 - L), K = Math.abs((te.startEpoch + te.endEpoch) / 2 - L);
        return Z - K;
      }), z.length = 20, z.sort((ae, te) => ae.startEpoch - te.startEpoch);
    }
    return z;
  }, [n, o, e, t, r, l, g, a, i, d, c]);
  u.useEffect(() => {
    if (x.length === 0) return;
    let N = !0;
    const _ = new AbortController(), z = [], R = {};
    let B = !1;
    x.forEach((b) => {
      const U = ch.get(e, b.startEpoch, b.endEpoch, b.framesPerTile, t);
      U ? w.current[b.key] !== U && (R[b.key] = U, B = !0) : z.push(b);
    });
    const oe = new Set(x.map((b) => b.key)), re = w.current, G = {};
    let O = !1;
    if (Object.keys(re).forEach((b) => {
      oe.has(b) ? G[b] = re[b] : O = !0;
    }), B || O) {
      const b = { ...G, ...R };
      w.current = b, P(b);
    }
    if (z.length === 0) return () => {
      N = !1;
    };
    const H = setTimeout(() => {
      z.forEach((b) => {
        ch.fetchTile(e, b.startEpoch, b.endEpoch, b.framesPerTile, _.signal, t).then((U) => {
          N && U && (w.current[b.key] = U, P((L) => ({ ...L, [b.key]: U })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(H), _.abort();
    };
  }, [x, e, t]);
  const I = (a - r) / l * 100, S = (i - r) / l * 100, M = u.useMemo(() => {
    if (x.length === 0 || !o || l <= 0) return [];
    const N = r, _ = r + l;
    return x.map((z) => {
      const R = z.startEpoch - o, B = z.endEpoch - o;
      if (B <= N || R >= _) return null;
      const oe = Math.max(N, R), re = Math.min(_, B);
      return {
        key: z.key,
        spriteUrl: C[z.key] || null,
        leftPct: (oe - N) / l * 100,
        widthPct: (re - oe) / l * 100
      };
    }).filter(Boolean);
  }, [x, o, r, l, C]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, _ = r + l;
    return n.map((z, R) => {
      const B = Math.round(Zn(z)) - o, oe = Math.round(_r(z)) - o;
      if (oe <= N || B >= _) return null;
      const re = Math.max(N, B), G = Math.min(_, oe);
      return {
        id: R,
        leftPct: (re - N) / l * 100,
        widthPct: (G - re) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), A = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((H, b) => Zn(H) - Zn(b)), _ = [], z = r, R = r + l, B = o + z, oe = o + R, re = o + (a !== void 0 ? a : z), G = o + (i !== void 0 ? i : R);
    if (N.length > 0) {
      const H = Zn(N[0]);
      H > B && _.push({ startEpoch: B, endEpoch: H });
    } else l > 0 && _.push({ startEpoch: B, endEpoch: oe });
    for (let H = 0; H < N.length - 1; H++) {
      const b = _r(N[H]), U = Zn(N[H + 1]);
      U - b > 1e3 && _.push({ startEpoch: b, endEpoch: U });
    }
    if (N.length > 0) {
      const H = _r(N[N.length - 1]);
      H < oe && _.push({ startEpoch: H, endEpoch: oe });
    }
    const O = [];
    return c && c.length > 0 && c.forEach((H, b) => {
      const U = Math.max(H.startEpochMs ?? H.StartEpochMs, re), L = Math.min(H.endEpochMs ?? H.EndEpochMs, G);
      if (L > U && L > B && U < oe) {
        const ae = Math.max(B, U), te = Math.min(oe, L), Z = (te - o - (ae - o)) / l * 100;
        Z > 0 && O.push({
          id: `global-${b}`,
          type: "global",
          startEpoch: ae,
          endEpoch: te,
          leftPct: (ae - o - z) / l * 100,
          widthPct: Z,
          durationSec: Math.round((L - U) / 1e3)
        });
      }
    }), j || _.forEach((H, b) => {
      let U = [H];
      c && c.length > 0 && c.forEach((L) => {
        const ae = Math.max(L.startEpochMs ?? L.StartEpochMs, re), te = Math.min(L.endEpochMs ?? L.EndEpochMs, G);
        if (te <= ae) return;
        const Z = [];
        U.forEach((K) => {
          te <= K.startEpoch || ae >= K.endEpoch ? Z.push(K) : (ae > K.startEpoch && Z.push({ startEpoch: K.startEpoch, endEpoch: ae }), te < K.endEpoch && Z.push({ startEpoch: te, endEpoch: K.endEpoch }));
        }), U = Z;
      }), U.forEach((L, ae) => {
        if (L.endEpoch - L.startEpoch < 1e3 || L.endEpoch <= B || L.startEpoch >= oe) return;
        const te = Math.max(B, L.startEpoch), Z = Math.min(oe, L.endEpoch), K = (Z - o - (te - o)) / l * 100;
        K > 0 && O.push({
          id: `station-${b}-${ae}`,
          type: "station",
          startEpoch: te,
          endEpoch: Z,
          leftPct: (te - o - z) / l * 100,
          widthPct: K,
          durationSec: Math.round((L.endEpoch - L.startEpoch) / 1e3)
        });
      });
    }), O;
  }, [n, c, o, r, l, a, i, j]), k = u.useMemo(() => {
    if (!p || !f || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), _ = r, z = r + l;
    return v.map((R, B) => {
      const oe = (R.startEpochMs ?? R.StartEpochMs ?? 0) - o, re = (R.endEpochMs ?? R.EndEpochMs ?? 0) - o;
      if (re <= _ || oe >= z) return null;
      const G = Math.max(_, oe), O = Math.min(z, re), H = (G - _) / l * 100, b = (O - G) / l * 100;
      if (b <= 0) return null;
      const L = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${B}`,
        isFeatured: L,
        leftPct: H,
        widthPct: b
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
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: M.map((N) => /* @__PURE__ */ s.jsx(
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
      y.map((N, _) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${N.dispNum}`,
          style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
          title: `Auto-Director: Screen ${N.dispNum} (${N.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: N.dispNum })
        },
        `stp_${_}`
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
    I > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, I)}%` } }),
    S < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, S)}%`, right: 0 } })
  ] });
}
function Sx({
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
  inPointMs: j = 0,
  outPointMs: C = 36e5,
  baseEpochMs: P = 0,
  segments: w = [],
  recordingSegments: g = {},
  globalGaps: x = []
}) {
  const I = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", S = (e == null ? void 0 : e.id) || I, M = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var b, U, L;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((b = e == null ? void 0 : e.displayTopology) == null ? void 0 : b.displays) || ((U = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : U.Displays) || ((L = e == null ? void 0 : e.topology) == null ? void 0 : L.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), k = u.useMemo(() => {
    var U, L;
    const b = A.find((ae) => ae.isPrimary || ae.IsPrimary);
    return ((b == null ? void 0 : b.displayId) || (b == null ? void 0 : b.DisplayId) || ((U = A[0]) == null ? void 0 : U.displayId) || ((L = A[0]) == null ? void 0 : L.DisplayId) || "mon-0").toLowerCase();
  }, [A]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), _ = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), z = _ && _.length > 0, R = !!(A && A.length > 1), B = !!(t && R), oe = u.useMemo(() => {
    let b = g[S] || g[I] || w || [];
    if (!b || b.length === 0) {
      const U = (S || "").toLowerCase(), L = (I || "").toLowerCase();
      for (const [ae, te] of Object.entries(g || {})) {
        const Z = ae.toLowerCase();
        if (U && Z === U || L && Z === L) {
          b = te;
          break;
        }
      }
    }
    if ((!b || b.length === 0) && (b = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !b || b.length === 0)
      for (const U of A) {
        const L = U.segments || U.Segments || [];
        if (L.length > 0) {
          b = L;
          break;
        }
      }
    return (b || []).filter((U) => _r(U) - Zn(U) > 0);
  }, [g, w, S, I, e, A]), re = u.useMemo(() => {
    if (!P || y <= 0) return [];
    const b = [...oe].sort((Z, K) => Zn(Z) - Zn(K)), U = [], L = P + y;
    if (x && x.length > 0 && x.forEach((Z) => {
      const K = Z.startEpochMs ?? Z.StartEpochMs ?? 0, Ie = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      Ie > K && U.push({ startEpoch: K, endEpoch: Ie, type: "global" });
    }), b.length === 0)
      return U.push({ startEpoch: P, endEpoch: L, type: "station" }), U;
    const ae = Math.round(Zn(b[0]));
    ae - P > 2e3 && (U.some((K) => K.type === "global" && K.startEpoch <= P && K.endEpoch >= ae) || U.push({ startEpoch: P, endEpoch: ae, type: "station" }));
    for (let Z = 0; Z < b.length - 1; Z++) {
      const K = Math.round(_r(b[Z])), Ie = Math.round(Zn(b[Z + 1]));
      Ie - K > 2e3 && (U.some((Me) => Me.type === "global" && Me.startEpoch <= K && Me.endEpoch >= Ie) || U.push({ startEpoch: K, endEpoch: Ie, type: "station" }));
    }
    const te = Math.round(_r(b[b.length - 1]));
    return L - te > 2e3 && (U.some((K) => K.type === "global" && K.startEpoch <= te && K.endEpoch >= L) || U.push({ startEpoch: te, endEpoch: L, type: "station" })), U;
  }, [oe, x, P, y]), G = u.useMemo(() => {
    const b = P + j, U = P + C;
    return lx(_, re, x, b, U, k);
  }, [_, re, x, P, j, C, k]), O = u.useMemo(() => {
    if (!z || y <= 0) return null;
    const b = p, U = p + y;
    return G.map((L, ae) => {
      const te = (L.startEpochMs ?? L.StartEpochMs ?? 0) - P, Z = (L.endEpochMs ?? L.EndEpochMs ?? 0) - P;
      if (Z <= b || te >= U) return null;
      const K = Math.max(b, te), Ie = Math.min(U, Z), Le = (K - b) / y * 100, Me = (Ie - K) / y * 100;
      if (Me <= 0) return null;
      const Fe = (L.targetDisplayId || L.TargetDisplayId || "mon-0").toLowerCase(), ge = A.findIndex((pt) => (pt.displayId || pt.DisplayId || "").toLowerCase() === Fe);
      let Se = ge >= 0 ? ge + 1 : null;
      if (!Se) {
        const pt = Fe.match(/\d+/);
        Se = pt ? parseInt(pt[0], 10) + 1 : 1;
      }
      const tt = ge >= 0 ? A[ge].displayName || A[ge].DisplayName || `Screen ${Se}` : `Screen ${Se}`;
      return {
        id: ae,
        dispNum: Se,
        dispLabel: tt,
        leftPct: Le,
        widthPct: Me
      };
    }).filter(Boolean);
  }, [z, G, A, P, p, y]), H = u.useCallback((b) => {
    const U = (b || "mon-0").toLowerCase();
    return o.some((L) => {
      if (L.stationId !== S) return !1;
      const ae = (L.displayId || "mon-0").toLowerCase();
      return ae === U || ae === "auto" && (U === "mon-0" || U === "screen-0");
    });
  }, [o, S]);
  return B ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (b) => {
              b.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: M, children: M }),
        R && l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (b) => {
              b.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
            children: r ? "⚡ AUTO" : "✋ OFF"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        R && l && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (b) => {
              b.stopPropagation(), l(e.id);
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
            onClick: (b) => {
              b.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: A.map((b, U) => {
      const L = (b.displayId || b.DisplayId || `mon-${U}`).toLowerCase(), ae = b.displayNumber || b.DisplayNumber || U + 1, te = b.displayName || b.DisplayName || "", Z = te && !te.toLowerCase().includes(I.toLowerCase()) ? te : `Screen ${ae}${b.isPrimary || U === 0 ? " (Main)" : ""}`, K = H(L);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${Z} (${b.width || 1920}×${b.height || 1080})`, children: Z }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${K ? "is-on-canvas" : ""}`,
                  onClick: (Ie) => {
                    Ie.stopPropagation(), a(e.id, L);
                  },
                  title: K ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: K ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Kc,
              {
                hostname: I,
                displayId: L,
                activeSegments: b.segments && b.segments.length > 0 ? b.segments : oe,
                viewportStartMs: p,
                viewportDurationMs: y,
                baseEpochMs: P,
                inPointMs: j,
                outPointMs: C,
                globalGaps: x,
                directorSegments: G,
                isAutoDirectorEnabled: r,
                gaps: re,
                showDirectorCoverage: R
              }
            )
          ]
        },
        `${e.id}-${L}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), R && n && n();
      },
      onContextMenu: (b) => {
        v && (b.preventDefault(), b.stopPropagation(), v(b, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${R ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${M}${h ? ` (${h})` : ""} • Click to select${R ? " / expand" : ""}`,
            children: [
              R && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (b) => {
                    b.stopPropagation(), n == null || n();
                  },
                  title: "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: M, children: M }),
              R && l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (b) => {
                    b.stopPropagation(), l(e.id);
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
                  title: `Remove ${M} from project`,
                  onClick: (b) => {
                    b.stopPropagation(), f(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Kc,
          {
            hostname: I,
            displayId: k,
            activeSegments: oe,
            viewportStartMs: p,
            viewportDurationMs: y,
            baseEpochMs: P,
            inPointMs: j,
            outPointMs: C,
            globalGaps: x,
            isAutoDirectorEnabled: r,
            gaps: re,
            stepperSegments: R ? O : null
          }
        )
      ]
    }
  );
}
const qr = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Map();
function uh(e, t, n, r = 250) {
  return `${(e || "").replace(/^live\//i, "").toLowerCase().trim()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const Ur = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = uh(e, t, n, r);
    return qr.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = uh(e, t, n, l);
    if (qr.has(a))
      return qr.get(a);
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
          return qr.set(a, v), v;
      } catch (c) {
        if (c.name !== "AbortError") {
          const d = new Array(l).fill(0.02);
          return qr.set(a, d), d;
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
    qr.clear(), Hl.clear();
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
    const y = p * c, j = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o - j * a;
    v += p === 0 ? `M ${y.toFixed(2)},${C.toFixed(2)}` : ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  let f = "";
  for (let p = i - 1; p >= 0; p--) {
    const y = p * c, j = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o + j * a;
    f += ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  return `${v}${f} Z`;
}
function Mx(e, t = 100, n = 24, r = 1) {
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
function zp({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", i = t === "mic", c = u.useMemo(() => !o || !e ? null : Mx(e, 100, 24, n), [o, e, n]), d = u.useMemo(() => o || !e ? null : Ka(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
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
function bx({
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
  const [y, j] = u.useState(() => Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [C, P] = u.useState(!1);
  u.useEffect(() => {
    let B = !0;
    const oe = new AbortController(), re = Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (re) {
      j(re), P(!1);
      return;
    }
    return j(null), P(!0), Ur.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, oe.signal, 250).then((G) => {
      B && (G && j(G), P(!1));
    }).catch(() => {
      B && P(!1);
    }), () => {
      B = !1, oe.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const w = e.startEpochMs, g = e.endEpochMs, x = Math.max(1, g - w), I = (e.gain || 1) * (t.gain || 1), S = Math.max(d, w), M = Math.min(d + v, g), h = (S - d) / v * 100, A = (M - S) / v * 100;
  if (A <= 0) return null;
  const k = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, _ = e.fadeOutMs ?? 50, z = Math.min(45, N / x * 100), R = Math.min(45, _ / x * 100);
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
      title: `Audio Clip: ${p} [${k.toUpperCase()}] (${St(w, f, { includeSeconds: !0 })} - ${St(g, f, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${_}ms
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
            style: { width: `${z}%` },
            title: `Fade In: ${N}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          zp,
          {
            peaks: y,
            channelMode: k,
            effectiveGain: I,
            isLoadingWaveform: C,
            laneColor: n
          }
        ) }),
        _ > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${R}%` },
            title: `Fade Out: ${_}ms`,
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
              onClick: (B) => {
                B.stopPropagation(), c == null || c();
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
            onMouseDown: (B) => a(B, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function Ix({
  clip: e,
  vpStartEpoch: t,
  viewportDurationMs: n,
  timeMode: r,
  stationName: l,
  onExpand: o
}) {
  const [a, i] = u.useState(() => Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200) || null), [c, d] = u.useState(!1);
  u.useEffect(() => {
    let w = !0;
    const g = new AbortController(), x = Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200);
    if (x) {
      i(x), d(!1);
      return;
    }
    return i(null), d(!0), Ur.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, g.signal, 200).then((I) => {
      w && (I && i(I), d(!1));
    }).catch(() => {
      w && d(!1);
    }), () => {
      w = !1, g.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const v = e.startEpochMs, f = e.endEpochMs, p = Math.max(t, v), y = Math.min(t + n, f), j = (p - t) / n * 100, C = (y - p) / n * 100;
  if (C <= 0) return null;
  const P = e.effectiveChannelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip mode-${P}`,
      style: {
        left: `${j}%`,
        width: `${C}%`,
        borderLeftColor: e.laneColor
      },
      onDoubleClick: o,
      title: `Master Audio Bus Stream: ${l} [${P.toUpperCase()}] (${St(v, r, { includeSeconds: !0 })} - ${St(f, r, { includeSeconds: !0 })})
Gain: ${Math.round(e.effectiveGain * 100)}%
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          zp,
          {
            peaks: a,
            channelMode: P,
            effectiveGain: e.effectiveGain,
            isLoadingWaveform: c,
            laneColor: e.laneColor
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "collapsed-clip-info", children: [
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-clip-station", children: l }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${P}`, children: P.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "collapsed-clip-gain", children: [
            Math.round(e.effectiveGain * 100),
            "%"
          ] })
        ] })
      ]
    }
  );
}
function Tx({
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
  const y = u.useRef(null), [j, C] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [P, w] = u.useState(!1), [g, x] = u.useState(null), [I, S] = u.useState(1), [M, h] = u.useState(50), [A, k] = u.useState(50), [N, _] = u.useState([]), [z, R] = u.useState(null), [B, oe] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const T = (J) => {
      J.detail && oe(J.detail);
    };
    return window.addEventListener("itb-live-audio-level", T), () => window.removeEventListener("itb-live-audio-level", T);
  }, []);
  const re = u.useCallback(() => {
    C((T) => {
      const J = !T;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(J));
      } catch {
      }
      return J;
    });
  }, []), [G, O] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((T, J) => {
        var X;
        return {
          id: `clip_${J}_${T.startEpochMs || T.StartEpochMs}`,
          startEpochMs: T.startEpochMs ?? T.StartEpochMs ?? l,
          endEpochMs: T.endEpochMs ?? T.EndEpochMs ?? l + r,
          sourceStationId: T.sourceStationId ?? T.SourceStationId ?? (((X = t[0]) == null ? void 0 : X.id) || "station-0"),
          gain: T.gain ?? T.Gain ?? 1,
          channelMode: T.channelMode ?? T.ChannelMode ?? "both",
          fadeInMs: T.fadeInMs ?? T.FadeInMs ?? 50,
          fadeOutMs: T.fadeOutMs ?? T.FadeOutMs ?? 50
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
  ]), H = l + o, b = l + n, U = b + r, L = u.useCallback((T) => {
    if (!p) return;
    const J = [];
    T.forEach((X) => {
      X.isMuted || P || X.clips.forEach((ne) => {
        J.push({
          startEpochMs: ne.startEpochMs,
          endEpochMs: ne.endEpochMs,
          sourceStationId: ne.sourceStationId,
          gain: ne.gain * X.gain,
          channelMode: ne.channelMode || X.channelMode || "both",
          fadeInMs: ne.fadeInMs ?? 50,
          fadeOutMs: ne.fadeOutMs ?? 50
        });
      });
    }), J.sort((X, ne) => X.startEpochMs - ne.startEpochMs), p({ segments: J });
  }, [p, P]);
  u.useEffect(() => {
    let T = null;
    for (const J of G)
      if (!(J.isMuted || P)) {
        for (const X of J.clips)
          if (H >= X.startEpochMs && H <= X.endEpochMs) {
            const ne = t.find((q) => q.id === X.sourceStationId);
            T = {
              stationId: X.sourceStationId,
              stationName: ne ? ne.displayName || ne.hostname || ne.id : X.sourceStationId,
              channelMode: X.channelMode || J.channelMode || "both",
              gain: X.gain * J.gain,
              isPlaying: B.isPlaying
            };
            break;
          }
        if (T) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: T }));
  }, [G, P, H, t, B.isPlaying]), u.useEffect(() => {
    const T = () => {
      N.length !== 0 && (O((ne) => {
        const q = ne.map((Q) => ({
          ...Q,
          clips: Q.clips.filter((de) => !N.includes(de.id))
        }));
        return L(q), q;
      }), _([]), x(null));
    }, J = (ne) => {
      if (ne.key === "Delete" || ne.key === "Backspace") {
        const q = ne.target;
        if (q.tagName === "INPUT" || q.tagName === "TEXTAREA" || q.isContentEditable) return;
        N.length > 0 && (ne.preventDefault(), T());
      }
    }, X = () => T();
    return window.addEventListener("keydown", J), window.addEventListener("itb:studio-delete-selected", X), () => {
      window.removeEventListener("keydown", J), window.removeEventListener("itb:studio-delete-selected", X);
    };
  }, [N, L]);
  const ae = u.useCallback(() => {
    O((T) => {
      const X = `A${T.length + 1}`, ne = {
        id: X,
        name: `Track ${X}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, q = [...T, ne];
      return L(q), q;
    });
  }, [L]), te = u.useCallback((T) => {
    O((J) => {
      if (J.length <= 1) return J;
      const X = J.filter((ne) => ne.id !== T);
      return L(X), X;
    });
  }, [L]), Z = u.useCallback((T) => {
    O((J) => {
      const X = J.map((ne) => ne.id === T ? { ...ne, isMuted: !ne.isMuted } : ne);
      return L(X), X;
    });
  }, [L]), K = u.useCallback((T) => {
    O((J) => {
      var q;
      const X = (q = J.find((Q) => Q.id === T)) == null ? void 0 : q.isSolo, ne = J.map((Q) => ({
        ...Q,
        isSolo: Q.id === T ? !X : !1,
        isMuted: Q.id === T ? !1 : !X
      }));
      return L(ne), ne;
    });
  }, [L]), Ie = u.useCallback((T) => {
    const J = ["both", "sys", "mic"];
    O((X) => {
      const ne = X.map((q) => {
        if (q.id !== T) return q;
        const Q = q.channelMode || "both", de = J[(J.indexOf(Q) + 1) % J.length];
        return {
          ...q,
          channelMode: de,
          clips: q.clips.map((Je) => ({ ...Je, channelMode: de }))
        };
      });
      return L(ne), ne;
    });
  }, [L]), Le = u.useCallback((T, J) => {
    const X = Math.max(0, Math.min(2, Number(J)));
    O((ne) => {
      const q = ne.map((Q) => Q.id === T ? { ...Q, gain: X } : Q);
      return L(q), q;
    }), oh(X);
  }, [L]), Me = u.useCallback((T, J) => {
    J && O((X) => {
      const ne = X.map((q) => {
        if (q.id !== T) return q;
        if (q.clips.length === 0) {
          const Q = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: J,
            gain: 1,
            channelMode: q.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...q, clips: [Q] };
        }
        return {
          ...q,
          clips: q.clips.map((Q) => ({ ...Q, sourceStationId: J }))
        };
      });
      return L(ne), ne;
    });
  }, [l, r, L]), Fe = u.useCallback((T, J = null, X = null) => {
    var lt;
    const ne = J || ((lt = t[0]) == null ? void 0 : lt.id) || "station-0", q = X !== null ? X : H, Q = Math.min(r, 6e4), de = q + Q, Je = G.find((Ze) => Ze.id === T), Oe = (Je == null ? void 0 : Je.channelMode) || "both", Be = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(q),
      endEpochMs: Math.round(de),
      sourceStationId: ne,
      gain: 1,
      channelMode: Oe,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    O((Ze) => {
      const It = Ze.map((kt) => kt.id === T ? {
        ...kt,
        clips: [...kt.clips, Be].sort((Tt, Lt) => Tt.startEpochMs - Lt.startEpochMs)
      } : kt);
      return L(It), It;
    });
  }, [G, H, r, t, L]), ge = u.useCallback((T, J = null) => {
    O((X) => {
      const ne = X.map((q) => {
        if (T && q.id !== T) return q;
        const Q = [];
        return q.clips.forEach((de) => {
          (!J || de.id === J || N.includes(de.id)) && H > de.startEpochMs + 500 && H < de.endEpochMs - 500 ? (Q.push({ ...de, endEpochMs: H }), Q.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: H,
            endEpochMs: de.endEpochMs,
            sourceStationId: de.sourceStationId,
            gain: de.gain,
            channelMode: de.channelMode || q.channelMode || "both",
            fadeInMs: de.fadeInMs ?? 50,
            fadeOutMs: de.fadeOutMs ?? 50
          })) : Q.push(de);
        }), { ...q, clips: Q };
      });
      return L(ne), ne;
    }), x(null);
  }, [H, N, L]), Se = u.useCallback(() => {
    ge(null, null);
  }, [ge]), tt = u.useCallback((T, J) => {
    O((X) => {
      const ne = X.map((q) => q.id !== T ? q : {
        ...q,
        clips: q.clips.filter((Q) => Q.id !== J)
      });
      return L(ne), ne;
    }), x(null);
  }, [L]), pt = u.useCallback((T, J, X) => {
    O((ne) => {
      const q = ne.map((Q) => Q.id !== T ? Q : {
        ...Q,
        clips: Q.clips.map((de) => de.id === J ? { ...de, sourceStationId: X } : de)
      });
      return L(q), q;
    }), x((ne) => ne ? { ...ne, stationId: X } : null);
  }, [L]), ce = u.useCallback((T, J, X) => {
    const ne = Math.max(0, Math.min(2.5, Number(X)));
    S(ne), O((q) => {
      const Q = q.map((de) => de.id !== T ? de : {
        ...de,
        clips: de.clips.map((Je) => Je.id === J ? { ...Je, gain: ne } : Je)
      });
      return L(Q), Q;
    }), oh(ne);
  }, [L]), Ee = u.useCallback((T, J, X, ne) => {
    const q = Math.max(0, Math.min(1e4, Math.round(Number(ne) || 0)));
    X === "in" ? h(q) : k(q), O((Q) => {
      const de = Q.map((Je) => Je.id !== T ? Je : {
        ...Je,
        clips: Je.clips.map((Oe) => Oe.id === J ? X === "in" ? { ...Oe, fadeInMs: q } : { ...Oe, fadeOutMs: q } : Oe)
      });
      return L(de), de;
    }), x((Q) => Q ? X === "in" ? { ...Q, fadeInMs: q } : { ...Q, fadeOutMs: q } : null);
  }, [L]), Ke = u.useCallback((T, J, X) => {
    var Tt, Lt;
    if (T.preventDefault(), T.stopPropagation(), T.button !== 0) return;
    const ne = G.find((qe) => qe.id === J), q = (Tt = ne == null ? void 0 : ne.clips) == null ? void 0 : Tt.find((qe) => qe.id === X);
    if (!q) return;
    const Q = T.clientX, de = q.startEpochMs, Oe = q.endEpochMs - de, Be = y.current;
    if (!Be) return;
    const lt = (Lt = Be.querySelector(".audio-lane-timeline")) == null ? void 0 : Lt.getBoundingClientRect();
    if (!lt || lt.width <= 0) return;
    let Ze = !1;
    const It = (qe) => {
      const xt = qe.clientX - Q;
      Math.abs(xt) > 3 && (Ze = !0);
      const ze = xt / lt.width * r;
      let Re = Math.round(de + ze), vt = Re + Oe;
      const At = 12 / lt.width * r;
      Math.abs(Re - H) <= At ? (Re = H, vt = Re + Oe) : Math.abs(vt - H) <= At && (vt = H, Re = vt - Oe), Re < l && (Re = l, vt = Re + Oe), O((Gt) => Gt.map((Kt) => Kt.id !== J ? Kt : {
        ...Kt,
        clips: Kt.clips.map((dn) => dn.id === X ? { ...dn, startEpochMs: Re, endEpochMs: vt } : dn)
      }));
    }, kt = () => {
      window.removeEventListener("mousemove", It), window.removeEventListener("mouseup", kt), Ze && O((qe) => (L(qe), qe));
    };
    window.addEventListener("mousemove", It), window.addEventListener("mouseup", kt);
  }, [G, r, H, l, L]), We = u.useCallback((T, J, X, ne) => {
    T.preventDefault(), T.stopPropagation();
    const q = T.clientX, Q = G.find((Ze) => Ze.id === J), de = Q == null ? void 0 : Q.clips.find((Ze) => Ze.id === X);
    if (!de) return;
    const Je = de.startEpochMs, Oe = de.endEpochMs, Be = (Ze) => {
      var qe;
      const It = Ze.clientX - q, kt = (qe = y.current) == null ? void 0 : qe.querySelector(".audio-lane-timeline");
      if (!kt) return;
      const Tt = kt.getBoundingClientRect(), Lt = It / Tt.width * r;
      O((xt) => xt.map((ze) => ze.id !== J ? ze : {
        ...ze,
        clips: ze.clips.map((Re) => {
          if (Re.id !== X) return Re;
          if (ne === "start") {
            const vt = Math.min(Oe - 500, Je + Lt);
            return { ...Re, startEpochMs: Math.round(vt) };
          } else {
            const vt = Math.max(Je + 500, Oe + Lt);
            return { ...Re, endEpochMs: Math.round(vt) };
          }
        })
      }));
    }, lt = () => {
      window.removeEventListener("mousemove", Be), window.removeEventListener("mouseup", lt), O((Ze) => (L(Ze), Ze));
    };
    window.addEventListener("mousemove", Be), window.addEventListener("mouseup", lt);
  }, [G, r, L]), nt = u.useCallback((T, J, X) => {
    O((ne) => {
      const q = ne.map((Q) => Q.id !== T ? Q : {
        ...Q,
        clips: Q.clips.map((de) => de.id === J ? { ...de, channelMode: X } : de)
      });
      return L(q), q;
    }), x((ne) => ne ? { ...ne, channelMode: X } : null);
  }, [L]), _e = u.useCallback((T, J) => {
    var Oe;
    const X = G.find((Be) => Be.id === T), ne = (Oe = X == null ? void 0 : X.clips) == null ? void 0 : Oe.find((Be) => Be.id === J);
    if (!ne) return;
    const q = ne.channelMode || X.channelMode || "both", Q = ["both", "sys", "mic"], de = (Q.indexOf(q) + 1) % Q.length, Je = Q[de];
    nt(T, J, Je);
  }, [G, nt]), se = (T, J, X) => {
    T.preventDefault(), T.stopPropagation();
    const ne = 280, q = 390, Q = Math.max(16, Math.min(window.innerWidth - ne - 16, T.clientX - ne / 2));
    let de = T.clientY - q - 12;
    de < 80 && (de = Math.min(window.innerHeight - q - 16, T.clientY + 24)), S(X.gain || 1), h(X.fadeInMs ?? 50), k(X.fadeOutMs ?? 50), x({
      laneId: J,
      clipId: X.id,
      s: X.startEpochMs,
      e: X.endEpochMs,
      x: Q,
      y: de,
      stationId: X.sourceStationId,
      gain: X.gain || 1,
      channelMode: X.channelMode || "both",
      fadeInMs: X.fadeInMs ?? 50,
      fadeOutMs: X.fadeOutMs ?? 50
    });
  };
  u.useEffect(() => {
    if (!g) return;
    const T = () => x(null), J = (X) => {
      X.key === "Escape" && x(null);
    };
    return window.addEventListener("click", T), window.addEventListener("keydown", J), () => {
      window.removeEventListener("click", T), window.removeEventListener("keydown", J);
    };
  }, [g]);
  const pe = u.useMemo(() => {
    if (P) return [];
    const T = G.some((ne) => ne.isSolo), J = G.filter((ne) => T ? ne.isSolo : !ne.isMuted), X = [];
    return J.forEach((ne) => {
      const q = na[G.indexOf(ne) % na.length];
      ne.clips.forEach((Q) => {
        X.push({
          ...Q,
          laneId: ne.id,
          laneName: ne.name,
          laneColor: q,
          effectiveChannelMode: Q.channelMode || ne.channelMode || "both",
          effectiveGain: (Q.gain || 1) * (ne.gain || 1)
        });
      });
    }), X.sort((ne, q) => ne.startEpochMs - q.startEpochMs);
  }, [G, P]);
  return !t || t.length === 0 ? null : j ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: re,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          G.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: ae,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Se,
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
            className: `btn-master-mute ${P ? "is-muted" : ""}`,
            onClick: () => {
              w((T) => {
                const J = !T;
                return L(G), J;
              });
            },
            title: P ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: P ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: G.map((T, J) => {
      const X = na[J % na.length], ne = z === T.id, q = t.find((Q) => {
        var de;
        return Q.id === ((de = T.clips[0]) == null ? void 0 : de.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: X }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: X }, children: T.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: T.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (q == null ? void 0 : q.id) || "",
              onChange: (Q) => Me(T.id, Q.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((Q) => /* @__PURE__ */ s.jsx("option", { value: Q.id, children: Q.displayName || Q.hostname || Q.id }, Q.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${T.isMuted ? "active" : ""}`,
                onClick: () => Z(T.id),
                title: T.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${T.isSolo ? "active" : ""}`,
                onClick: () => K(T.id),
                title: T.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${T.channelMode || "both"}`,
                onClick: () => Ie(T.id),
                title: `Discrete Audio Channel: ${(T.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
                children: (T.channelMode || "both").toUpperCase()
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
                value: T.gain,
                onChange: (Q) => Le(T.id, Q.target.value),
                title: `Lane Gain: ${Math.round(T.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(T.gain * 100),
              "%"
            ] })
          ] }),
          G.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => te(T.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${ne ? "is-drag-over" : ""}`,
            onClick: () => _([]),
            onDragOver: (Q) => {
              Q.preventDefault(), Q.dataTransfer.dropEffect = "copy", z !== T.id && R(T.id);
            },
            onDragLeave: () => {
              z === T.id && R(null);
            },
            onDrop: (Q) => {
              Q.preventDefault(), R(null);
              const de = Q.dataTransfer.getData("text/station-id") || Q.dataTransfer.getData("text/plain");
              if (de) {
                const Je = Q.currentTarget.getBoundingClientRect(), Oe = Math.max(0, Math.min(1, (Q.clientX - Je.left) / Je.width)), Be = Math.round(b + Oe * r);
                Fe(T.id, de, Be);
              }
            },
            onDoubleClick: (Q) => {
              var Be;
              const de = Q.currentTarget.getBoundingClientRect(), Je = Math.max(0, Math.min(1, (Q.clientX - de.left) / de.width)), Oe = Math.round(b + Je * r);
              Fe(T.id, (Be = t[0]) == null ? void 0 : Be.id, Oe);
            },
            children: [
              T.clips.map((Q) => {
                const de = t.find((Oe) => Oe.id === Q.sourceStationId), Je = de ? de.displayName || de.hostname || de.id : Q.sourceStationId;
                return Q.endEpochMs <= b || Q.startEpochMs >= U ? null : /* @__PURE__ */ s.jsx(
                  bx,
                  {
                    clip: Q,
                    lane: T,
                    laneColor: X,
                    isSelected: N.includes(Q.id),
                    onSelect: (Oe) => {
                      Oe.stopPropagation(), Oe.ctrlKey || Oe.metaKey ? _(
                        (Be) => Be.includes(Q.id) ? Be.filter((lt) => lt !== Q.id) : [...Be, Q.id]
                      ) : _([Q.id]);
                    },
                    onOpenMenu: (Oe) => se(Oe, T.id, Q),
                    onTrimDrag: (Oe, Be) => We(Oe, T.id, Q.id, Be),
                    onClipMoveDrag: (Oe) => Ke(Oe, T.id, Q.id),
                    onToggleChannelMode: () => _e(T.id, Q.id),
                    vpStartEpoch: b,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: Je
                  },
                  Q.id
                );
              }),
              T.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var Q;
                    return Fe(T.id, (Q = t[0]) == null ? void 0 : Q.id, H);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    T.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, T.id);
    }) }),
    g && As.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: g.x, top: g.y },
          onClick: (T) => T.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-close",
                  onClick: () => x(null),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((T) => {
                const J = T.id === g.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${J ? "is-selected" : ""}`,
                    onClick: () => pt(g.laneId, g.clipId, T.id),
                    children: T.displayName || T.hostname || T.id
                  },
                  T.id
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
                    onClick: () => nt(g.laneId, g.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${g.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => nt(g.laneId, g.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${g.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => nt(g.laneId, g.clipId, "mic"),
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
                  onChange: (T) => ce(g.laneId, g.clipId, T.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  M,
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
                      value: M,
                      onChange: (T) => Ee(g.laneId, g.clipId, "in", T.target.value),
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
                      onChange: (T) => Ee(g.laneId, g.clipId, "out", T.target.value),
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
                  onClick: () => ge(g.laneId, g.clipId),
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
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", onClick: re, children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: P || pe.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: pe.length > 0 ? `${pe.length} CLIPS ACTIVE` : P ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: B.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: (T) => {
              T.target.closest(".collapsed-master-clip") || re();
            },
            children: pe.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : pe.map((T) => {
              const J = t.find((ne) => ne.id === T.sourceStationId), X = J ? J.displayName || J.hostname || J.id : T.sourceStationId;
              return T.endEpochMs <= b || T.startEpochMs >= U ? null : /* @__PURE__ */ s.jsx(
                Ix,
                {
                  clip: T,
                  vpStartEpoch: b,
                  viewportDurationMs: r,
                  timeMode: f,
                  stationName: X,
                  onExpand: re
                },
                `master_${T.id}`
              );
            })
          }
        )
      ]
    }
  );
}
function Ax({
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
  timeMode: j = "LOCAL"
}) {
  const C = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [P, w] = u.useState(null), [g, x] = u.useState(null);
  So.useEffect(() => {
    if (g === null) return;
    const k = (_) => {
      _.key === "Escape" && x(null);
    }, N = (_) => {
      !_.target.closest(".kf-inspector-popover") && !_.target.closest(".kf-marker-diamond") && x(null);
    };
    return window.addEventListener("keydown", k), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", k), window.removeEventListener("mousedown", N);
    };
  }, [g]);
  const I = d + f, S = d + i, M = S + c, h = (k) => {
    const N = k.currentTarget.getBoundingClientRect(), _ = k.clientX - N.left, z = Math.max(0, Math.min(1, _ / N.width)), R = Math.round(S + z * c);
    r && r(R);
  }, A = (k, N, _) => {
    if (k.button !== 0) return;
    k.stopPropagation(), k.preventDefault();
    const z = k.clientX, R = _.timestampEpochMs, B = _.id || `kf_${N}_${R}`, oe = k.currentTarget.closest(".track-surface");
    if (!oe) return;
    let re = !1;
    w({
      idx: N,
      kfId: B,
      startClientX: z,
      initialEpoch: R,
      currentEpoch: R
    });
    const G = (H) => {
      const b = H.clientX - z;
      Math.abs(b) > 3 && (re = !0);
      const U = oe.getBoundingClientRect(), L = b / U.width * c;
      let ae = Math.round(R + L);
      ae = Math.max(d, Math.min(d + v, ae));
      const te = d + p, Z = d + y, K = 14 / U.width * c;
      Math.abs(ae - I) <= K ? ae = I : Math.abs(ae - te) <= K ? ae = te : Math.abs(ae - Z) <= K && (ae = Z), w((Ie) => Ie ? { ...Ie, currentEpoch: ae } : null);
    }, O = (H) => {
      window.removeEventListener("mousemove", G), window.removeEventListener("mouseup", O), w(null);
      const b = oe.getBoundingClientRect(), L = (H.clientX - z) / b.width * c;
      let ae = Math.round(R + L);
      ae = Math.max(d, Math.min(d + v, ae));
      const te = d + p, Z = d + y, K = 14 / b.width * c;
      Math.abs(ae - I) <= K ? ae = I : Math.abs(ae - te) <= K ? ae = te : Math.abs(ae - Z) <= K && (ae = Z), re ? (o && o(B, ae), n && n(N, ae)) : (n && n(N, R), x((Ie) => Ie === N ? null : N));
    };
    window.addEventListener("mousemove", G), window.addEventListener("mouseup", O);
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
            k.stopPropagation(), r && r(I);
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
            const _ = (P == null ? void 0 : P.idx) === N, z = _ ? P.currentEpoch : k.timestampEpochMs;
            if (z < S - 5e4 || z > M + 5e4) return null;
            const R = (z - S) / c * 100;
            if (R < -2 || R > 102) return null;
            const B = N === t, oe = St(z, j, { includeSeconds: !0 }), re = `${k.transitionType || "smooth"} (${k.transitionDurationSec ?? 0.5}s)`, G = Math.max(0, (z - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${B ? "is-active" : ""} ${_ ? "is-dragging" : ""}`,
                style: { left: `${R}%` },
                onMouseDown: (O) => A(O, N, k),
                onContextMenu: (O) => {
                  O.preventDefault(), O.stopPropagation(), C.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${oe} (+${G}s) • ${re}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  _ && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: oe }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      G,
                      "s"
                    ] })
                  ] }),
                  g === N && !_ && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (O) => O.stopPropagation(),
                      onMouseDown: (O) => O.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            N + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: oe }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (O) => {
                                O.stopPropagation(), x(null);
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
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((O) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(k.transitionDurationSec ?? 0.5) === O ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(N, { transitionDurationSec: O }),
                                children: [
                                  O,
                                  "s"
                                ]
                              },
                              O
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (O) => {
                                O.stopPropagation(), l && l(N), x(null);
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
function $x({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (k) => !r || r <= 0 ? "0%" : `${(k - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), j = Math.max(0, d), C = Math.min(100, v), P = Math.max(0, C - j), w = (k) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(k, N);
  }, g = d < 1.5, x = v > 98.5, I = d <= 0.2 && d >= -0.2, S = v >= 99.8 && v <= 100.2, M = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => St(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    P > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${j}%`, width: `${P}%` },
        onMouseDown: w("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${I ? "at-edge" : ""}`,
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
        className: `marker out-marker ${x ? "flipped" : ""} ${S ? "at-edge" : ""}`,
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
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${M ? "edge-left" : ""} ${h ? "edge-right" : ""}`, children: A }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const Rx = So.memo($x);
function Lx({
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
  return As.createPortal(v, document.body);
}
function Ox({
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
const Dx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Px({
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
          const j = await y.json();
          a(j), d.current && d.current(j);
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
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: Dx };
}
function _x({
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
  const [p, y] = u.useState(null), [j, C] = u.useState(null), P = (w, g) => {
    y(w), C({
      target: w,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!p) return;
    const w = e * 0.015, g = (I) => {
      if (p === "minimap-viewport" && (f != null && f.current)) {
        const M = f.current.getBoundingClientRect(), A = Math.max(0, Math.min(I.clientX - M.left, M.width)) / M.width * t, k = Math.max(0, Math.min(A - e / 2, t - e));
        d(k);
        return;
      }
      const S = v(I.clientX);
      if (p === "playhead") {
        let M = S;
        Math.abs(M - l) <= w ? M = l : Math.abs(M - a) <= w && (M = a), r(Math.max(0, Math.min(t, M)));
      } else if (p === "in") {
        const M = a - 1e3;
        o(Math.max(0, Math.min(S, M)));
      } else if (p === "out") {
        const M = l + 1e3;
        i(Math.min(t, Math.max(S, M)));
      } else if (p === "range" && j) {
        const M = S - v(j.startX), h = j.initialOut - j.initialIn;
        let A = j.initialIn + M, k = j.initialOut + M;
        A < 0 ? (A = 0, k = h) : k > t && (k = t, A = t - h), o(A), i(k);
      }
    }, x = () => {
      y(null), C(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", x), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", x);
    };
  }, [
    p,
    j,
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
  ]), { draggingTarget: p, handleStartDrag: P };
}
const nr = 4;
function Hp({
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
  setPlayheadMs: j,
  inPointMs: C = 0,
  setInPointMs: P,
  outPointMs: w = 36e5,
  setOutPointMs: g,
  onExport: x,
  recordingSegments: I = {},
  movieBoundaries: S,
  viewportStartMs: M = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: k,
  onJumpViewportTo: N,
  keystrokeMode: _ = "BURN_IN",
  onChangeKeystrokeMode: z,
  keystrokes: R = [],
  showKeystrokes: B = !1,
  showRulerKeystrokes: oe = !1,
  onToggleRulerKeystrokes: re,
  _onSplitDirectorSegment: G,
  _onChangeDirectorSegmentDisplay: O,
  _onResetDirectorSegmentToAuto: H,
  audioRoutingPlan: b,
  onSplitAudioSegment: U,
  onChangeAudioSegmentStation: L,
  onChangeAudioSegmentGain: ae,
  onFollowVisualFeed: te,
  isAutoFollowAudio: Z,
  canvasLayoutTimeline: K,
  activeKfIndex: Ie = 0,
  onSelectKeyframe: Le,
  onAddKeyframeAtEpoch: Me,
  onDeleteKeyframe: Fe,
  onUpdateKeyframeEpoch: ge,
  onUpdateKeyframeTransition: Se,
  onToggleDisplayOnCanvas: tt,
  onUpdateAudioPlan: pt
}) {
  var $e, st;
  const [ce, Ee] = u.useState(null), [Ke, We] = u.useState(0), [nt, _e] = u.useState(null), [se, pe] = u.useState(!0), T = (ue) => {
    var V, fe, xe;
    return ((ue == null ? void 0 : ue.displays) || (ue == null ? void 0 : ue.Displays) || ((V = ue == null ? void 0 : ue.displayTopology) == null ? void 0 : V.displays) || ((fe = ue == null ? void 0 : ue.DisplayTopology) == null ? void 0 : fe.Displays) || ((xe = ue == null ? void 0 : ue.topology) == null ? void 0 : xe.displays) || []).length;
  }, [J, X] = u.useState(() => {
    var ue;
    return e.length === 1 && T(e[0]) > 1 ? (ue = e[0]) == null ? void 0 : ue.id : null;
  });
  u.useEffect(() => {
    var ue;
    if (e.length === 1 && !J && ((ue = e[0]) != null && ue.id) && T(e[0]) > 1)
      X(e[0].id);
    else if (J) {
      const rt = e.find((V) => V.id === J);
      (!rt || T(rt) <= 1) && X(null);
    }
  }, [e, J]);
  const ne = u.useRef(null), q = u.useRef(null), Q = d / Math.max(1, v), de = Math.ceil(e.length / nr) || 1, Je = u.useMemo(() => {
    const ue = Ke * nr;
    return e.slice(ue, ue + nr);
  }, [e, Ke]);
  u.useEffect(() => {
    if (!t && !J) return;
    const ue = J || t, rt = e.findIndex((V) => V.id === ue);
    if (rt !== -1) {
      const V = Math.floor(rt / nr);
      V !== Ke && We(V);
    }
  }, [t, J, e, Ke]);
  const Oe = (($e = K == null ? void 0 : K.keyframes) == null ? void 0 : $e[Ie]) || ((st = K == null ? void 0 : K.keyframes) == null ? void 0 : st[0]), Be = u.useMemo(() => {
    var ue;
    return ((ue = Oe == null ? void 0 : Oe.layout) == null ? void 0 : ue.placements) || [];
  }, [Oe]), lt = u.useMemo(() => e.find((ue) => ue.id === t) || null, [e, t]), Ze = (S == null ? void 0 : S.globalFirstMs) ?? null, It = (S == null ? void 0 : S.globalLastMs) ?? null, kt = u.useMemo(() => (C > 500 || w < d - 500) && w - C >= 1e3, [C, w, d]), Tt = u.useMemo(() => e.map((ue) => ue.id).sort().join(","), [e]), { estimateData: Lt, isEstimating: qe, formatEstimateSize: xt } = Px({
    stationIdsKey: Tt,
    inPointMs: C,
    outPointMs: w,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), ze = u.useCallback((ue) => {
    if (!ne.current) return M;
    const rt = ne.current.getBoundingClientRect(), V = rt.left + 200, fe = rt.width - 200 - 58;
    if (fe <= 0) return M;
    const xe = Math.max(0, Math.min(ue - V, fe));
    return Math.round(M + xe / fe * Q);
  }, [M, Q]), { draggingTarget: Re, handleStartDrag: vt } = _x({
    viewportDurationMs: Q,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: j,
    inPointMs: C,
    setInPointMs: P,
    outPointMs: w,
    setOutPointMs: g,
    viewportStartMs: M,
    setViewportStartMs: h,
    getMsFromClientX: ze,
    minimapRef: q
  }), At = u.useRef(v);
  At.current = v;
  const Gt = u.useRef(M);
  Gt.current = M;
  const Kt = u.useRef(d);
  Kt.current = d;
  const dn = u.useRef(y);
  dn.current = y, u.useEffect(() => {
    const ue = ne.current;
    if (!ue) return;
    const rt = (V) => {
      V.preventDefault(), V.stopPropagation();
      const fe = V.ctrlKey || V.shiftKey, xe = At.current, Ue = Gt.current, Ge = Kt.current, at = dn.current;
      if (fe) {
        const ht = Math.abs(V.deltaX) > Math.abs(V.deltaY) ? V.deltaX : V.deltaY;
        if (ht === 0) return;
        const Qe = Ge / Math.max(1, xe), Nt = Math.max(0, Ge - Qe), Et = Qe * 0.08 * (ht > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(Nt, Ue + Et)));
      } else {
        if (V.deltaY === 0) return;
        const Qe = V.deltaY < 0 ? 1.25 : 0.8, Nt = Math.max(32, Ge / 2e3), Et = ue.getBoundingClientRect(), Bt = Et.left + 200, Ot = Et.width - 200 - 58;
        let an = 0.5;
        if (Ot > 0)
          if (V.clientX >= Bt && V.clientX <= Et.right - 58)
            an = Math.max(0, Math.min(1, (V.clientX - Bt) / Ot));
          else {
            const Ys = Ge / Math.max(1, xe), Zt = (at - Ue) / Ys;
            an = Zt >= 0 && Zt <= 1 ? Zt : 0.5;
          }
        const An = Math.max(1, Math.min(Nt, Math.round(xe * Qe * 100) / 100));
        if (An === xe) return;
        const wn = Ge / xe, Bn = Ge / An, Dt = Ue + an * wn - an * Bn, Rs = Math.max(0, Ge - Bn);
        f == null || f(An), h == null || h(Math.max(0, Math.min(Rs, Dt)));
      }
    };
    return ue.addEventListener("wheel", rt, { passive: !1, capture: !0 }), () => ue.removeEventListener("wheel", rt, { capture: !0 });
  }, [f, h]);
  const De = e.length > 0 && Math.abs(w - C) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: ne,
      className: "timeline-board-root",
      onContextMenu: (ue) => {
        var V;
        ue.preventDefault();
        const rt = (V = ne.current) == null ? void 0 : V.getBoundingClientRect();
        !rt || ue.clientX - rt.left < 200 || ue.clientX > rt.right - 58 || _e({ x: ue.clientX, y: ue.clientY, targetMs: Math.max(0, Math.min(d, ze(ue.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            yx,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: C,
              setInPointMs: P,
              outPointMs: w,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                vx,
                {
                  minimapRef: q,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: M,
                  viewportDurationMs: Q,
                  zoomLevel: v,
                  inPointMs: C,
                  outPointMs: w,
                  playheadMs: y,
                  onStartDragMinimap: vt
                }
              ),
              /* @__PURE__ */ s.jsx(
                Nx,
                {
                  earliestMediaMs: Ze,
                  latestMediaMs: It,
                  hasActiveCut: kt,
                  onJumpToFirst: () => {
                    Ze !== null && (j == null || j(Ze), N == null || N(Ze, "start"));
                  },
                  onJumpToLast: () => {
                    It !== null && (j == null || j(It), N == null || N(It, "end"));
                  },
                  onContextualFit: () => {
                    kt ? k == null || k(C, w) : Ze !== null && It !== null && It > Ze ? k == null || k(Ze, It) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: _,
                  onChangeKeystrokeMode: z,
                  showRulerKeystrokes: oe,
                  onToggleRulerKeystrokes: re
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              xx,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: M,
                viewportDurationMs: Q,
                totalDurationMs: d,
                hoverMs: ce,
                onHoverChange: Ee,
                onSeek: (ue) => j == null ? void 0 : j(ue),
                inPointMs: C,
                outPointMs: w,
                earliestMediaMs: Ze,
                movieBoundaries: S,
                stationHostname: (lt == null ? void 0 : lt.hostname) || (lt == null ? void 0 : lt.id) || (lt == null ? void 0 : lt.name),
                activeStationName: (lt == null ? void 0 : lt.displayName) || (lt == null ? void 0 : lt.hostname) || (lt == null ? void 0 : lt.name),
                showKeystrokes: !!(oe ?? B),
                keystrokes: R
              }
            ) })
          ] })
        ] }),
        de > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ke === 0,
              onClick: () => We((ue) => Math.max(0, ue - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Ke * nr + 1,
            "–",
            Math.min(e.length, (Ke + 1) * nr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ke >= de - 1,
              onClick: () => We((ue) => Math.min(de - 1, ue + 1)),
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
            onMouseMove: (ue) => {
              if (Re || !ne.current) return;
              const rt = ne.current.getBoundingClientRect();
              ue.clientX >= rt.left + 200 && ue.clientX <= rt.right - 58 ? Ee(ze(ue.clientX)) : Ee(null);
            },
            onMouseLeave: () => !Re && Ee(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => pe((ue) => !ue), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: se ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  se && de > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ke === 0,
                        onClick: (ue) => {
                          ue.stopPropagation(), We((rt) => Math.max(0, rt - 1));
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
                      de,
                      " (",
                      Ke * nr + 1,
                      "–",
                      Math.min(e.length, (Ke + 1) * nr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ke >= de - 1,
                        onClick: (ue) => {
                          ue.stopPropagation(), We((rt) => Math.min(de - 1, rt + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !se && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => pe(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (Be == null ? void 0 : Be.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var xe, Ue, Ge, at, ht;
                    const ue = (Be == null ? void 0 : Be.find((Qe) => Qe.isPrimary || Qe.isFocused)) || (Be == null ? void 0 : Be[0]), rt = (ue == null ? void 0 : ue.stationId) || ((xe = e[0]) == null ? void 0 : xe.hostname) || ((Ue = e[0]) == null ? void 0 : Ue.id), V = (ue == null ? void 0 : ue.displayId) || "mon-0";
                    let fe = [];
                    if (Be && Be.length > 0) {
                      const Qe = /* @__PURE__ */ new Map();
                      Be.forEach((Nt) => {
                        var Bt;
                        (I[Nt.stationId] || I[(Bt = Nt.stationId) == null ? void 0 : Bt.toLowerCase()] || []).forEach((Ot) => {
                          const an = `${Ot.startEpochMs || Ot.start}_${Ot.endEpochMs || Ot.end}`;
                          Qe.has(an) || Qe.set(an, Ot);
                        });
                      }), fe = Array.from(Qe.values());
                    }
                    return fe.length === 0 && (fe = I[(Ge = e[0]) == null ? void 0 : Ge.id] || I[(at = e[0]) == null ? void 0 : at.hostname] || ((ht = e[0]) == null ? void 0 : ht.segments) || []), /* @__PURE__ */ s.jsx(
                      Kc,
                      {
                        hostname: rt,
                        displayId: V,
                        activeSegments: fe,
                        viewportStartMs: M,
                        viewportDurationMs: Q,
                        baseEpochMs: i,
                        inPointMs: C,
                        outPointMs: w,
                        globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                se && (e.length > 0 ? Je.map((ue) => {
                  const rt = !!(t && ue.id === t), V = J === ue.id, fe = o ? o[ue.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Sx,
                    {
                      station: ue,
                      isExpanded: V && T(ue) > 1,
                      onToggleExpand: () => {
                        T(ue) > 1 && X((xe) => xe === ue.id ? null : ue.id);
                      },
                      isAutoDirectorEnabled: fe,
                      onToggleAutoDirector: a,
                      canvasPlacements: Be,
                      onToggleDisplayOnCanvas: tt,
                      directorPlan: ue.directorPlan,
                      isActive: rt,
                      onSelect: () => n == null ? void 0 : n(ue.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: M,
                      viewportDurationMs: Q,
                      inPointMs: C,
                      outPointMs: w,
                      baseEpochMs: i,
                      segments: I[ue.id] || I[ue.hostname] || ue.segments || [],
                      recordingSegments: I,
                      globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || []
                    },
                    ue.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Tx,
                  {
                    audioPlan: b,
                    stations: e,
                    viewportStartMs: M,
                    viewportDurationMs: Q,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: U,
                    onChangeSegmentStation: L,
                    onChangeSegmentGain: ae,
                    onFollowVisualFeed: te,
                    isAutoFollow: Z,
                    timeMode: c,
                    onUpdateAudioPlan: pt
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  Ax,
                  {
                    canvasLayoutTimeline: K,
                    activeKfIndex: Ie,
                    onSelectKeyframe: Le,
                    onAddKeyframeAtEpoch: Me,
                    onDeleteKeyframe: Fe,
                    onUpdateKeyframeEpoch: ge,
                    onUpdateKeyframeTransition: Se,
                    viewportStartMs: M,
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
                Ox,
                {
                  isRangeValid: De,
                  onExport: x,
                  isEstimating: qe,
                  estimateData: Lt,
                  formatEstimateSize: xt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Rx,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: M,
            viewportDurationMs: Q,
            playheadMs: y,
            inPointMs: C,
            outPointMs: w,
            onStartDrag: vt
          }
        ),
        /* @__PURE__ */ s.jsx(
          Lx,
          {
            contextMenu: nt,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ue) => {
              nt && (ue === "playhead" ? j == null || j(nt.targetMs) : ue === "in" ? P == null || P(Math.max(0, Math.min(nt.targetMs, w - 1e3))) : ue === "out" && (g == null || g(Math.min(d, Math.max(nt.targetMs, C + 1e3)))), _e(null));
            },
            onClose: () => _e(null)
          }
        )
      ]
    }
  );
}
function Fx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Bx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Ux({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Wx({
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
  unselectedInTabCount: j,
  activeTabName: C,
  onSelectAllInScope: P,
  onClearInScope: w,
  viewMode: g = "grid",
  onViewModeChange: x,
  isDrawerMode: I = !1
}) {
  const [S, M] = u.useState(!1), h = v !== "all", A = !C || C.toLowerCase() === "all", k = A ? "Select All" : `Select ${C}`, N = A ? "Clear All" : `Clear ${C}`;
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
            onChange: (_) => t(_.target.value)
          }
        )
      ] }),
      I && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${S ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => M(!S),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            h && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !I && x && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
            onClick: () => x("grid"),
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
            onClick: () => x("table"),
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
          onChange: (_) => a(_.target.value),
          children: l.map((_) => {
            const z = _.id === "all" ? c.map((B) => B.id) : _.stationIds || [], R = z.filter((B) => d.includes(B)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: _.id, children: [
              _.name,
              " (",
              R,
              "/",
              z.length,
              ")"
            ] }, _.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: P, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: w, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        i && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((_) => {
        const z = o === _.id, R = _.id === "all" ? c.map((re) => re.id) : _.stationIds || [], B = R.length, oe = R.filter((re) => d.includes(re)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${z ? "active" : ""}`,
            onClick: () => a(_.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: _.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${oe > 0 ? "has-selected" : ""}`, children: [
                oe,
                "/",
                B
              ] })
            ]
          },
          _.id
        );
      }) })
    ] })),
    (!I || S) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${I ? "is-collapsed-tray" : ""}`, children: [
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
              j,
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
      !I && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: P, children: [
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
function zx({
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
    const y = Math.min(n, r), j = Math.min(p, r), C = Math.ceil(r / n), P = Math.ceil(r / p);
    return y !== j || C !== P;
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
        const y = n === p, j = !f(p);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${j ? "redundant-disabled" : ""}`,
            disabled: j,
            onClick: () => o(p),
            title: j ? `All stations already fit on screen (Total: ${r})` : `Show ${p} per page`,
            children: p
          },
          p
        );
      }) })
    ] })
  ] });
}
function Hx({
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
              onClick: (j) => {
                j.stopPropagation(), n(p.id);
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
const Kp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function dh(e, t, n = Kp) {
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
function Kx(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function Vx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function Yx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Kp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Vx(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const h = dh(0, !0, r);
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
  const j = [];
  for (const h of y)
    if (j.length === 0)
      j.push({ ...h });
    else {
      const A = j[j.length - 1];
      h.startEpoch <= A.endEpoch + 1e3 ? A.endEpoch = Math.max(A.endEpoch, h.endEpoch) : j.push({ ...h });
    }
  let C = 0;
  for (const h of j)
    C += h.endEpoch - h.startEpoch;
  const P = o > 0 ? C / o * 100 : 0, w = P > 0 && P < 1 ? Number(P.toFixed(1)) : Math.min(100, Math.round(P)), g = [];
  let x = f, I = 0;
  for (const h of j) {
    if (h.startEpoch > x + 2e3) {
      const N = (h.startEpoch - x) / o * 100, _ = (x - f) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, _),
        widthPct: Math.min(100, N)
      }), I++;
    }
    const A = (h.endEpoch - h.startEpoch) / o * 100, k = (h.startEpoch - f) / o * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, k),
      widthPct: Math.min(100, A)
    }), x = h.endEpoch;
  }
  if (x < p - 2e3) {
    const h = (p - x) / o * 100, A = (x - f) / o * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, A),
      widthPct: Math.min(100, h)
    }), I++;
  }
  const S = I > 0 || w < 100, M = dh(w, S, r);
  return {
    coveragePct: w,
    recordedDuration: Kx(C),
    totalRecordedMs: C,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: S,
    gapsCount: I,
    trafficStatus: M,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Xx = Object.freeze([]), Gx = 12;
function Qx({
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
  systemTabs: p = Xx,
  recordingSegments: y = {},
  baseEpochMs: j = 0,
  durationMs: C = 0
}) {
  const [P, w] = u.useState([]), [g, x] = u.useState("all"), [I, S] = u.useState(""), [M, h] = u.useState(!0), [A, k] = u.useState("all"), [N, _] = u.useState(null), [z, R] = u.useState(!1), [B, oe] = u.useState(15), [re, G] = u.useState(8), [O, H] = u.useState(1), b = u.useRef(!1), U = u.useRef(null), L = c && r.length === 0, ae = r.length === 0 && !c;
  let te = "is-closed";
  i || ae || L ? te = "is-full-width" : e && (te = "is-open"), u.useLayoutEffect(() => {
    const se = () => {
      if (!U.current) return;
      const T = U.current.clientHeight;
      if (T <= 0) return;
      const J = U.current.querySelector(".station-row, .hub-table-row"), X = J ? J.offsetHeight : 40;
      if (X > 0) {
        const q = Math.floor(T / X) - 2, de = [5, 10, 15, 20, 25, 30].filter((Je) => Je <= q).pop() || 5;
        oe(de);
      }
      const ne = U.current.clientWidth;
      if (ne > 0) {
        const de = Math.max(1, Math.floor((ne + 12) / 252)), Oe = Math.max(1, Math.floor((T + 12) / (175 + 12))), Be = Math.max(de * Oe, de);
        G(Be);
      }
    };
    se(), window.addEventListener("resize", se);
    const pe = new ResizeObserver(se);
    return U.current && pe.observe(U.current), () => {
      window.removeEventListener("resize", se), pe.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      w(p);
      return;
    }
    if (b.current || !e && !i) return;
    b.current = !0;
    let se = !0;
    return (async () => {
      R(!0);
      try {
        const T = await fetch("/api/v1/dashboard/tabs");
        if (T.ok && se) {
          const J = await T.json();
          Array.isArray(J) && w(J);
        }
      } catch (T) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", T);
      } finally {
        se && R(!1);
      }
    })(), () => {
      se = !1;
    };
  }, [e, i, p]);
  const Z = u.useMemo(() => {
    const se = P.length > 0 ? P : p;
    if (se && se.length > 0) {
      const pe = se.map((T) => {
        const J = T.hostnames || T.assignedHostnames || T.stations || T.stationIds || [], X = r.filter((ne) => {
          const q = (ne.hostname || ne.name || "").trim().toLowerCase();
          return J.some((Q) => typeof Q == "string" ? Q.trim().toLowerCase() === q || q.includes(Q.trim().toLowerCase()) : (Q.hostname || Q.name || "").trim().toLowerCase() === q);
        }).map((ne) => ne.id);
        return {
          id: String(T.id || T.tabId || T.name),
          name: T.name || "Tab",
          stationIds: X
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((T) => T.id) },
        ...pe.filter((T) => T.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((pe) => pe.id) }];
  }, [P, p, r]), K = u.useMemo(() => Z.find((se) => se.id === g) || Z[0], [Z, g]), Ie = u.useMemo(() => !K || K.id === "all" ? r.map((se) => se.id) : K.stationIds || [], [K, r]), Le = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((se) => se.isLoaded || se.segments && se.segments.length > 0).length : r.filter((se) => y[se.id] !== void 0 || se.isLoaded).length, [r, y]), Me = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Le < r.length && Object.keys(y).length > 0), [d, c, r.length, Le, y]), Fe = u.useMemo(() => {
    const se = /* @__PURE__ */ new Map(), pe = { baseEpochMs: j, durationMs: C };
    for (const T of r) {
      const X = !(y && y[T.id] !== void 0 || T.isLoaded === !0 || T.segments && T.segments.length > 0) && (Me || c || d), ne = y && y[T.id] || T.segments || [], q = Yx(T, ne, pe);
      se.set(T.id, {
        ...q,
        hasAudio: T.hasAudio !== void 0 ? T.hasAudio : q == null ? void 0 : q.hasAudio,
        audioLabel: T.audioLabel || (T.hasAudio ? "AAC" : (q == null ? void 0 : q.audioLabel) || "NONE"),
        audioChannels: T.audioChannels ? T.audioChannels === 1 ? "Mono" : "Stereo" : q == null ? void 0 : q.audioChannels,
        feedSpec: T.feedSpec || (q == null ? void 0 : q.feedSpec) || `${T.resolution || "1080p"} • ${T.fps || 30}fps`,
        resolution: T.resolution || (q == null ? void 0 : q.resolution) || "1080p",
        fps: T.fps || (q == null ? void 0 : q.fps) || 30,
        isLoading: X
      });
    }
    return se;
  }, [r, y, j, C, Me, c, d]), ge = u.useMemo(() => r.filter((se) => {
    const pe = Fe.get(se.id), T = y && y[se.id] && y[se.id].length > 0 || se.segments && se.segments.length > 0, J = pe && (pe.coveragePct > 0 || pe.totalRecordedMs > 0), X = typeof se.recordingsCount == "number" && se.recordingsCount > 0;
    return pe && !pe.isLoading ? J || T : X || T;
  }), [r, Fe, y]), Se = u.useMemo(() => ge.filter((se) => {
    if (K.id !== "all" && !Ie.includes(se.id) || !(se.displayName || se.hostname || se.name || "").toLowerCase().includes(I.toLowerCase())) return !1;
    const T = l.includes(se.id), J = Fe.get(se.id);
    return A === "selected" ? T : A === "unselected" ? !T : A === "gaps" ? J == null ? void 0 : J.hasGaps : A === "audio" ? J == null ? void 0 : J.hasAudio : !0;
  }).sort((se, pe) => M ? (se.displayName || se.hostname || "").localeCompare(pe.displayName || pe.hostname || "") : 0), [ge, K, Ie, I, A, l, M, Fe]), tt = u.useMemo(() => N !== null ? N : Se.length > Gx ? "table" : "grid", [N, Se.length]), pt = tt === "table" ? B : re, ce = Math.max(1, Math.ceil(Se.length / pt));
  u.useEffect(() => {
    H(1);
  }, [g, I, A, tt]), u.useEffect(() => {
    O > ce && H(ce);
  }, [ce, O]);
  const Ee = u.useMemo(() => {
    if (te !== "is-full-width") return Se;
    const se = (O - 1) * pt;
    return Se.slice(se, se + pt);
  }, [Se, O, pt, te]), Ke = () => {
    if (!a) return;
    const se = K.id === "all" ? Se.map((pe) => pe.id) : Ie;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...se])));
  }, We = () => {
    if (!a) return;
    const se = new Set(
      K.id === "all" ? Se.map((pe) => pe.id) : Ie
    );
    a(l.filter((pe) => !se.has(pe)));
  }, nt = Ie.filter((se) => l.includes(se)).length, _e = Se.filter((se) => l.includes(se.id)).length;
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
            Me && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Le,
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
            onClick: We,
            disabled: _e === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                _e,
                ")"
              ] })
            ]
          }
        )
      ] }),
      Me && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Le / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: L ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : ae ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
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
      te === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Me ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Me ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Me ? `ANALYZING TIMELINE ARCHIVES • ${Le} OF ${ge.length} STATIONS SYNCED (${ge.length > 0 ? Math.min(100, Math.round(Le / ge.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${ge.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Me ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
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
        Wx,
        {
          searchTerm: I,
          onSearchChange: S,
          sortAlpha: M,
          onToggleSort: () => h(!M),
          effectiveTabs: Z,
          selectedTabId: g,
          onSelectTab: (se) => {
            x(se), _(null);
          },
          isLoadingTabs: z,
          allStations: ge,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: k,
          filteredCount: Se.length,
          selectedInTabCount: nt,
          unselectedInTabCount: Ie.length - nt,
          activeTabName: K.name,
          onSelectAllInScope: Ke,
          onClearInScope: We,
          viewMode: tt,
          onViewModeChange: te === "is-full-width" ? _ : null,
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
              onClick: We,
              disabled: _e === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  _e,
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
          ref: U,
          className: `station-list ${te === "is-full-width" ? tt === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: Ee.map((se) => {
            const pe = l.includes(se.id), T = Fe.get(se.id);
            return te === "is-full-width" ? tt === "grid" ? /* @__PURE__ */ s.jsx(
              Fx,
              {
                station: se,
                isSelected: pe,
                onToggle: o,
                meta: T
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              Bx,
              {
                station: se,
                isSelected: pe,
                onToggle: o,
                meta: T
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              Ux,
              {
                station: se,
                isSelected: pe,
                onToggle: o,
                meta: T
              },
              se.id
            );
          })
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsx(
        zx,
        {
          currentPage: O,
          totalPages: ce,
          pageSize: pt,
          totalItems: Se.length,
          onPageChange: H,
          onPageSizeChange: (se) => {
            tt === "table" ? oe(se) : G(se), H(1);
          },
          viewMode: tt
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Hx,
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
const Ln = (e) => String(e).padStart(2, "0"), Jx = [
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
], Zx = [
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
function hh({
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
  }, [e]), j = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const C = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((oe) => oe.length > 0);
    let _ = 0, z = 0, R = 0;
    N.length >= 1 && (_ = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (z = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && (R = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const B = l ? `${Ln(_)}:${Ln(z)}:${Ln(R)}` : `${Ln(_)}:${Ln(z)}`;
    i(B), t && t(B, { h: _, m: z, s: R });
  }, P = (k) => {
    let N = f;
    k === "AM" && f >= 12 ? N = f - 12 : k === "PM" && f < 12 && (N = f + 12);
    const _ = l ? `${Ln(N)}:${Ln(p)}:${Ln(y)}` : `${Ln(N)}:${Ln(p)}`;
    i(_), t && t(_, { h: N, m: p, s: y });
  }, w = u.useCallback((k, N) => {
    if (!v.current) return null;
    const _ = v.current.getBoundingClientRect(), z = _.left + _.width / 2, R = _.top + _.height / 2, B = k.clientX - z, oe = k.clientY - R;
    let re = Math.atan2(oe, B) * 180 / Math.PI + 90;
    if (re < 0 && (re += 360), N === "hours") {
      const G = Math.round(re / 30) % 12;
      return j ? G === 0 ? 12 : G + 12 : G === 0 ? 0 : G;
    }
    return Math.round(re / 6) % 60;
  }, [j]), g = u.useCallback((k, N) => {
    let _ = f, z = p, R = y;
    k === "hours" ? _ = N : k === "minutes" ? z = N : k === "seconds" && (R = N);
    const B = l ? `${Ln(_)}:${Ln(z)}:${Ln(R)}` : `${Ln(_)}:${Ln(z)}`;
    i(B), t && t(B, { h: _, m: z, s: R });
  }, [f, p, y, l, t]), x = (k, N) => {
    N.preventDefault(), N.stopPropagation(), d(k);
    const _ = w(N, k);
    _ !== null && g(k, _);
  };
  u.useEffect(() => {
    if (!c) return;
    const k = (_) => {
      const z = w(_, c);
      z !== null && g(c, z);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", k), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", N);
    };
  }, [c, w, g]);
  const I = u.useMemo(() => f % 12 * 30, [f]), S = u.useMemo(() => p % 60 * 6, [p]), M = u.useMemo(() => y % 60 * 6, [y]), h = j ? Zx : Jx, A = u.useMemo(() => {
    const k = [];
    for (let N = 0; N < 60; N++) {
      const _ = (N * 6 - 90) * (Math.PI / 180), z = N % 5 === 0, R = 104, B = z ? 93 : 98;
      k.push({
        index: N,
        x1: 110 + B * Math.cos(_),
        y1: 110 + B * Math.sin(_),
        x2: 110 + R * Math.cos(_),
        y2: 110 + R * Math.sin(_),
        isMajor: z
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
              className: `btn-period ${j ? "" : "active"}`,
              onClick: () => P("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${j ? "active" : ""}`,
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
            const N = (k.angle - 90) * (Math.PI / 180), _ = 76, z = 110 + _ * Math.cos(N), R = 110 + _ * Math.sin(N), B = f === k.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: z,
                y: R,
                className: `dial-num ${B ? "selected" : ""}`,
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
                    onPointerDown: (k) => x("hours", k)
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
                    onPointerDown: (k) => x("minutes", k)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${c === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${M} 110 110)`,
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
                    onPointerDown: (k) => x("seconds", k)
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
const sa = 7 * 24 * 60 * 60 * 1e3, zt = (e) => String(e).padStart(2, "0");
function qx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, p] = u.useState("00:00:00"), [y, j] = u.useState("00:00:00"), [C, P] = u.useState(() => /* @__PURE__ */ new Date()), [w, g] = u.useState(null), [x, I] = u.useState([]), [S, M] = u.useState(!1), [h, A] = u.useState(""), [k, N] = u.useState(1), [_, z] = u.useState(2), [R, B] = u.useState(null), oe = u.useCallback(() => {
    try {
      const ce = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (ce) {
        const Ee = JSON.parse(ce);
        Array.isArray(Ee) && I(Ee);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((ce) => ce.ok ? ce.json() : null).then((ce) => {
      Array.isArray(ce) && ce.length > 0 && I(ce);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    oe();
    let ce = n == null ? void 0 : n.startEpochMs, Ee = n == null ? void 0 : n.endEpochMs;
    if (!ce || isNaN(ce))
      if (n != null && n.start) {
        const nt = String(n.start).replace(" ", "T"), _e = new Date(nt).getTime();
        ce = isNaN(_e) ? Date.now() - 24 * 3600 * 1e3 : _e;
      } else
        Ee = Date.now(), ce = Ee - 24 * 3600 * 1e3;
    if (!Ee || isNaN(Ee))
      if (n != null && n.end) {
        const nt = String(n.end).replace(" ", "T"), _e = new Date(nt).getTime();
        Ee = isNaN(_e) ? Date.now() : _e;
      } else
        Ee = ce + 24 * 3600 * 1e3;
    B(null);
    const Ke = Pr(ce, o), We = Pr(Ee, o);
    c(`${Ke.year}-${zt(Ke.month)}-${zt(Ke.day)}`), v(`${We.year}-${zt(We.month)}-${zt(We.day)}`), p(`${zt(Ke.hour)}:${zt(Ke.minute)}:${zt(Ke.second)}`), j(`${zt(We.hour)}:${zt(We.minute)}:${zt(We.second)}`), P(new Date(Date.UTC(Ke.year, Ke.month - 1, 1)));
  }, [e, n, o, oe]);
  const re = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), G = d || i, O = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), H = u.useMemo(() => G ? `${G}T${y}` : "", [G, y]), b = u.useMemo(() => {
    const ce = {};
    return x.forEach((Ee) => {
      const Ke = Ee.startTime || Ee.start, We = Ee.endTime || Ee.end || Ke;
      if (!Ke) return;
      const nt = String(Ke).substring(0, 10), _e = String(We).substring(0, 10), [se, pe, T] = nt.split("-").map(Number), [J, X, ne] = _e.split("-").map(Number);
      if (isNaN(se) || isNaN(pe) || isNaN(T) || isNaN(J) || isNaN(X) || isNaN(ne)) return;
      let q = new Date(Date.UTC(se, pe - 1, T));
      const Q = new Date(Date.UTC(J, X - 1, ne));
      for (; q.getTime() <= Q.getTime(); ) {
        const de = `${q.getUTCFullYear()}-${zt(q.getUTCMonth() + 1)}-${zt(q.getUTCDate())}`;
        ce[de] || (ce[de] = []), ce[de].push(Ee), q.setUTCDate(q.getUTCDate() + 1);
      }
    }), ce;
  }, [x]), U = async (ce, Ee) => {
    if (Ee && Ee.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Ke = x.filter((We) => (We.id || We.startTime) !== ce);
    I(Ke);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(Ke)), localStorage.setItem("itb_bookmarks", JSON.stringify(Ke)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: Ke }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${ce}`, { method: "DELETE" });
    } catch {
    }
  }, L = (ce) => {
    const Ee = ce.startTime || ce.start, Ke = ce.endTime || ce.end;
    if (!Ee || !Ke) return;
    const We = Ee.substring(0, 10), nt = Ee.includes("T") ? Ee.split("T")[1].substring(0, 8) : "00:00:00", _e = Ke.substring(0, 10), se = Ke.includes("T") ? Ke.split("T")[1].substring(0, 8) : "23:59:59";
    c(We), v(_e), p(nt), j(se);
    const [pe, T] = We.split("-").map(Number);
    P(new Date(Date.UTC(pe, T - 1, 1))), M(!1);
  }, ae = (ce) => {
    l ? (l(ce), t && t()) : L(ce);
  }, te = u.useMemo(() => {
    if (o === "UTC" || !O.includes("T")) return { isAmbiguous: !1 };
    const [ce, Ee] = O.split("T");
    return za(ce, Ee);
  }, [O, o]), Z = u.useMemo(() => {
    if (o === "UTC" || !H.includes("T")) return { isAmbiguous: !1 };
    const [ce, Ee] = H.split("T");
    return za(ce, Ee);
  }, [H, o]), K = u.useMemo(() => {
    if (!i || !G) return null;
    const ce = _c(i, f, o, k), Ee = _c(G, y, o, _);
    return ce === null || Ee === null || isNaN(ce) || isNaN(Ee) ? null : { startEpoch: ce, endEpoch: Ee, durationMs: Ee - ce };
  }, [i, f, G, y, o, k, _]), Ie = u.useMemo(() => !K || K.durationMs <= 0 ? [] : $p(K.startEpoch, K.endEpoch), [K]), Le = u.useMemo(() => {
    if (!K || K.durationMs <= 0) return "0h";
    const ce = K.durationMs / (1e3 * 60 * 60);
    return ce >= 24 ? `${(ce / 24).toFixed(1)}d (${ce.toFixed(0)}h)` : `${ce.toFixed(1)}h`;
  }, [K]), Me = u.useMemo(() => {
    const ce = C.getUTCFullYear(), Ee = C.getUTCMonth(), Ke = new Date(Date.UTC(ce, Ee, 1)).getUTCDay(), We = new Date(Date.UTC(ce, Ee + 1, 0)).getUTCDate(), nt = [];
    for (let _e = 0; _e < Ke; _e++) nt.push(null);
    for (let _e = 1; _e <= We; _e++) nt.push(`${ce}-${zt(Ee + 1)}-${zt(_e)}`);
    return nt;
  }, [C]), Fe = (ce) => {
    if (ce) {
      if (B(null), !i || i && d)
        c(ce), v("");
      else if (i && !d)
        if (ce < i)
          c(ce), v("");
        else {
          const Ee = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ce + "T00:00:00Z")).getTime() - Ee > sa) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const We = new Date(Ee + sa);
            v(`${We.getUTCFullYear()}-${zt(We.getUTCMonth() + 1)}-${zt(We.getUTCDate())}`);
          } else
            v(ce);
        }
    }
  }, ge = (ce, Ee) => {
    B(Ee);
    const Ke = Date.now(), We = Ke - ce, nt = Pr(We, o), _e = Pr(Ke, o);
    c(`${nt.year}-${zt(nt.month)}-${zt(nt.day)}`), v(`${_e.year}-${zt(_e.month)}-${zt(_e.day)}`), p(`${zt(nt.hour)}:${zt(nt.minute)}:${zt(nt.second)}`), j(`${zt(_e.hour)}:${zt(_e.minute)}:${zt(_e.second)}`), P(new Date(Date.UTC(nt.year, nt.month - 1, 1)));
  }, Se = () => {
    if (re(), !K || isNaN(K.startEpoch) || isNaN(K.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (K.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (K.durationMs > sa) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: O,
      end: H,
      startEpochMs: K.startEpoch,
      endEpochMs: K.endEpoch,
      durationMs: K.durationMs,
      timeMode: o
    }), t && t();
  }, tt = u.useMemo(() => {
    if (!h.trim()) return x;
    const ce = h.toLowerCase();
    return x.filter(
      (Ee) => (Ee.title || Ee.name || "").toLowerCase().includes(ce) || (Ee.startTime || "").includes(ce)
    );
  }, [x, h]);
  if (!e) return null;
  const pt = o === "UTC";
  return As.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ce) => ce.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${pt ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: pt ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${pt ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${pt ? "active" : ""}`,
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
                onClick: () => M(!S),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: x.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Ie.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Ie.map((ce) => `${ce.description} (${ce.labelBefore} ➔ ${ce.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "7d" ? "active" : ""}`,
            onClick: () => ge(7 * 24 * 3600 * 1e3, "7d"),
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
            onClick: () => ge(3 * 24 * 3600 * 1e3, "3d"),
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
            onClick: () => ge(24 * 3600 * 1e3, "24h"),
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
            onClick: () => ge(8 * 3600 * 1e3, "8h"),
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
                value: h,
                onChange: (ce) => A(ce.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            tt.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: tt.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : tt.map((ce) => {
          var _e;
          const Ee = ce.id || ce.startTime, Ke = ce.title || ce.name || "Untitled Mission", We = (ce.startTime || "").replace("T", " "), nt = (ce.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => L(ce), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: Ke }),
                ce.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  ce.cutStationName
                ] }),
                ((_e = ce.stationIds) == null ? void 0 : _e.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  ce.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                We,
                " ➔ ",
                nt
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (se) => {
                    se.stopPropagation(), L(ce);
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
                    se.stopPropagation(), ae(ce);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (se) => U(Ee, se),
                  children: "✕"
                }
              )
            ] })
          ] }, Ee);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: C.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((ce) => new Date(Date.UTC(ce.getUTCFullYear(), ce.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((ce) => new Date(Date.UTC(ce.getUTCFullYear(), ce.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Me.map((ce, Ee) => {
            if (!ce) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Ee}`);
            const Ke = parseInt(ce.split("-")[2], 10), We = ce === i, nt = ce === (d || i), _e = d || w, se = i && _e && ce > i && ce < _e, pe = b[ce], T = !!(pe && pe.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${We ? "start-edge" : ""} ${nt ? "end-edge" : ""} ${se ? "in-range" : ""} ${T ? "has-bookmark" : ""}`,
                onClick: () => Fe(ce),
                onMouseEnter: () => !d && i && g(ce),
                onMouseLeave: () => g(null),
                title: T ? `${pe.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: Ke }),
                  T && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (J) => {
                        J.stopPropagation(), M(!0), A(ce);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        pe.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: pe.length })
                      ]
                    }
                  )
                ]
              },
              ce
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: re, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            hh,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (ce) => {
                re(), p(ce), B(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            hh,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (ce) => {
                re(), j(ce), B(null);
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
                className: k === 1 ? "active" : "",
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
                className: k === 2 ? "active" : "",
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
                className: _ === 1 ? "active" : "",
                onClick: () => z(1),
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
                className: _ === 2 ? "active" : "",
                onClick: () => z(2),
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: K && K.durationMs > sa ? "#f43f5e" : "#22d3ee" }, children: Le }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Ie.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Se, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Vp = "extractor_incident_bookmarks_fallback", ey = ["itb_studio_bookmarks", "itb_bookmarks", Vp];
function ty({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [p, y] = u.useState(!1), [j, C] = u.useState(null), [P, w] = u.useState(""), g = u.useCallback((R) => {
    ey.forEach((B) => {
      try {
        localStorage.setItem(B, JSON.stringify(R));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: R }));
  }, []), x = u.useCallback(async () => {
    f(!0);
    try {
      const R = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (R.ok) {
        const B = await R.json(), oe = Array.isArray(B) ? B : [];
        i(oe), g(oe);
        return;
      }
    } catch (R) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", R);
    } finally {
      f(!1);
    }
    try {
      const R = localStorage.getItem(Vp) || localStorage.getItem("itb_studio_bookmarks");
      R && i(JSON.parse(R));
    } catch {
    }
  }, [g]);
  if (u.useEffect(() => {
    e && x();
  }, [e, x]), !e) return null;
  const I = async () => {
    var te, Z, K, Ie, Le, Me;
    if (!c.trim() || p) return;
    const R = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((te = n == null ? void 0 : n.timeRange) != null && te.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), B = (n == null ? void 0 : n.inPointMs) ?? 0, oe = (n == null ? void 0 : n.outPointMs) ?? (((Z = n == null ? void 0 : n.timeRange) == null ? void 0 : Z.durationMs) || 0), re = (n == null ? void 0 : n.playheadMs) ?? B, G = R + B, O = R + oe, H = R + re, b = (n == null ? void 0 : n.selectedStationIds) || [], U = (n == null ? void 0 : n.selectedStationNames) || [], L = ((K = n == null ? void 0 : n.allStationIds) == null ? void 0 : K.length) > 0 ? n.allStationIds : b, ae = {
      title: c.trim(),
      startTime: ((Ie = n == null ? void 0 : n.timeRange) == null ? void 0 : Ie.start) || "",
      endTime: ((Le = n == null ? void 0 : n.timeRange) == null ? void 0 : Le.end) || "",
      baseEpochMs: R,
      timelineBaseEpochMs: R,
      inPointMs: B,
      outPointMs: oe,
      playheadMs: re,
      inEpochMs: G,
      outEpochMs: O,
      playheadEpochMs: H,
      selectedStationIds: b,
      selectedStationNames: U,
      allStationIds: L,
      stationIds: b.length > 0 ? b : L,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const Fe = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ae)
      });
      if (Fe.ok) {
        const ge = await Fe.json(), tt = [{
          ...ae,
          ...ge.bookmark || {},
          inEpochMs: G,
          outEpochMs: O,
          playheadEpochMs: H,
          selectedStationIds: b,
          selectedStationNames: U,
          allStationIds: L,
          id: ((Me = ge.bookmark) == null ? void 0 : Me.id) || ge.id || `bm_${Date.now()}`
        }, ...a];
        i(tt), g(tt), d("");
      } else
        throw new Error(`Server returned ${Fe.status}`);
    } catch (Fe) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Fe);
      const Se = [{
        ...ae,
        inEpochMs: G,
        outEpochMs: O,
        playheadEpochMs: H,
        selectedStationIds: b,
        selectedStationNames: U,
        allStationIds: L,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Se), g(Se), d("");
    } finally {
      y(!1);
    }
  }, S = async (R, B) => {
    if (B.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const oe = a.filter((re) => (re.id || re.startTime) !== R);
    i(oe), g(oe);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, { method: "DELETE" });
    } catch (re) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", re);
    }
  }, M = (R, B) => {
    B.stopPropagation(), C(R.id || R.startTime), w(R.title || R.name || "");
  }, h = async (R, B) => {
    if (B && B.stopPropagation(), !P.trim()) return;
    const oe = a.find((O) => (O.id || O.startTime) === R), re = P.trim(), G = a.map(
      (O) => (O.id || O.startTime) === R ? { ...O, title: re, name: re } : O
    );
    i(G), g(G), C(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...oe, title: re })
      });
    } catch (O) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", O);
    }
  }, A = (R) => {
    R.stopPropagation(), C(null);
  }, k = (R) => !R || isNaN(R) ? "--:--:--" : St(R, o), N = (R) => {
    const B = R.startTime || R.StartTime, oe = R.endTime || R.EndTime;
    if (!B) return "--";
    const re = String(B).replace("T", " ").substring(0, 19), G = oe ? String(oe).replace("T", " ").substring(0, 19) : re;
    return `${re} ➔ ${G}`;
  }, _ = (R) => {
    let B = R.inEpochMs || R.InEpochMs, oe = R.outEpochMs || R.OutEpochMs;
    if (!B || !oe) {
      const re = R.timelineBaseEpochMs || R.baseEpochMs || (R.startTime ? new Date(String(R.startTime).replace(" ", "T")).getTime() : 0), G = R.inPointMs ?? R.InPointMs, O = R.outPointMs ?? R.OutPointMs;
      re && typeof G == "number" && typeof O == "number" && (G > 0 || O > 0) && (B = re + G, oe = re + O);
    }
    if (B && oe && !isNaN(B) && !isNaN(oe) && B > 0) {
      const re = k(B), G = k(oe), O = Math.max(0, oe - B), H = Math.floor(O / 6e4), b = Math.floor(H / 60), U = H % 60, L = b > 0 ? `${b}h ${U}m` : `${H}m`;
      return { timeText: `${re} ➔ ${G}`, duration: L };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, z = (R) => {
    const B = R.selectedStationNames || [], oe = R.selectedStationIds || R.cutStationIds || R.stationIds || [];
    return B.length > 0 ? B.join(", ") : oe.length > 0 ? oe.join(", ") : R.cutStationName ? R.cutStationName : R.activeStationName ? R.activeStationName : "All Stations in Scope";
  };
  return As.createPortal(
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
              disabled: p,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !p ? "active" : ""}`,
            onClick: I,
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
      ] }) : a.map((R) => {
        var H, b, U;
        const B = R.id || R.startTime, oe = j === B, re = _(R), G = z(R), O = ((H = R.allStationIds) == null ? void 0 : H.length) || ((b = R.selectedStationIds) == null ? void 0 : b.length) || ((U = R.stationIds) == null ? void 0 : U.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${oe ? "is-editing" : ""}`,
            onClick: () => {
              oe || (r && r(R), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                oe ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (L) => L.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: P,
                      onChange: (L) => w(L.target.value),
                      onKeyDown: (L) => {
                        L.key === "Enter" && h(B, L), L.key === "Escape" && A(L);
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
                        onClick: (L) => h(B, L),
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
                    /* @__PURE__ */ s.jsx("strong", { children: N(R) })
                  ] }),
                  O > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    O,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: re.timeText }),
                    re.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      re.duration,
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
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (L) => L.stopPropagation(), children: [
                !oe && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (L) => M(R, L),
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
                    onClick: (L) => S(B, L),
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
const fh = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function Yp() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(fh.USER) || localStorage.getItem(fh.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function ny(e) {
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
function sy(e, t) {
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
function ry({
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
  showWatermark: j = !0,
  directorPlan: C,
  onOverrideDisplay: P,
  onResetOverride: w,
  viewMode: g,
  onViewModeChange: x,
  onOpenFullscreen: I,
  isPipSwapped: S,
  onPipSwapChange: M,
  className: h = ""
}) {
  const A = u.useRef(null), k = u.useRef(null), N = u.useRef(null), _ = u.useRef(r), z = u.useRef(r), R = u.useRef(r), B = u.useRef(!1), oe = u.useRef(null), re = u.useRef(o), G = u.useRef(!1);
  _.current = r;
  const O = e == null ? void 0 : e.id, H = e && (e.hostname || e.name) || "", b = u.useMemo(() => {
    var Ue, Ge, at, ht;
    const V = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ue = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ue.displays) || ((Ge = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ge.Displays) || ((at = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : at.Displays) || ((ht = e == null ? void 0 : e.topology) == null ? void 0 : ht.displays) || [];
    if (!Array.isArray(V) || V.length === 0) return [];
    const fe = V.length > 1 && V.every((Qe) => (Qe.X ?? Qe.x ?? 0) === 0 && (Qe.Y ?? Qe.y ?? 0) === 0);
    let xe = 0;
    return V.map((Qe, Nt) => {
      const Et = Qe.Width || Qe.width || 1920, Bt = Qe.Height || Qe.height || 1080, Ot = fe ? xe : Qe.X ?? Qe.x ?? Nt * Et, an = fe ? 0 : Qe.Y ?? Qe.y ?? 0;
      fe && (xe += Et);
      const An = (Qe.displayId ?? Qe.DisplayId ?? `mon-${Nt}`).toLowerCase(), wn = Qe.displayNumber ?? Qe.DisplayNumber ?? Nt + 1, Dt = (Qe.displayName || Qe.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${wn}`, Rs = !!(Qe.isPrimary ?? Qe.IsPrimary ?? Nt === 0);
      return {
        ...Qe,
        displayId: An,
        DisplayId: An,
        displayIndex: Nt,
        displayNumber: wn,
        DisplayNumber: wn,
        displayName: Dt,
        DisplayName: Dt,
        isPrimary: Rs,
        IsPrimary: Rs,
        x: Ot,
        y: an,
        X: Ot,
        Y: an,
        width: Et,
        height: Bt,
        Width: Et,
        Height: Bt
      };
    });
  }, [e]), U = b.length > 1, [L, ae] = u.useState(() => {
    if (!U) return "mon-0";
    try {
      const V = localStorage.getItem("itb_solo_viewmode");
      if (V) return V;
    } catch {
    }
    return "canvas";
  }), Z = U ? g !== void 0 ? g : L : "mon-0", K = u.useCallback((V) => {
    const fe = typeof V == "function" ? V(Z) : V;
    ae(fe);
    try {
      localStorage.setItem("itb_solo_viewmode", fe);
    } catch {
    }
    x && x(fe);
  }, [Z, x]), [Ie, Le] = u.useState(!1), Me = S !== void 0 ? S : Ie, Fe = u.useCallback((V) => {
    const fe = typeof V == "function" ? V(Me) : V;
    Le(fe), M && M(fe);
  }, [Me, M]), ge = u.useMemo(() => {
    const V = C || (e == null ? void 0 : e.directorPlan);
    if (!V || !V.segments || V.segments.length === 0) return null;
    const fe = t + r;
    return V.segments.find((xe) => {
      const Ue = xe.startEpochMs ?? xe.StartEpochMs ?? 0, Ge = xe.endEpochMs ?? xe.EndEpochMs ?? 0;
      return fe >= Ue && fe <= Ge;
    }) || V.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t, r]), Se = u.useMemo(() => {
    var V, fe;
    if (!U) return "mon-0";
    if (Z === "split" || Z === "pip" || Z === "canvas" || Z === "all-displays") {
      const xe = (((V = b[0]) == null ? void 0 : V.displayId) ?? "mon-0").toLowerCase(), Ue = (((fe = b[1]) == null ? void 0 : fe.displayId) ?? "mon-1").toLowerCase();
      return Me ? Ue : xe;
    }
    return Z !== "director" ? Z.toLowerCase() : ((ge == null ? void 0 : ge.targetDisplayId) ?? (ge == null ? void 0 : ge.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [U, Z, ge, b, Me]), tt = u.useMemo(() => {
    var fe;
    if (!U) return null;
    const V = b.find((xe) => (xe.displayId ?? xe.DisplayId ?? "").toLowerCase() !== Se);
    return V ? (V.displayId ?? V.DisplayId).toLowerCase() : (((fe = b[1]) == null ? void 0 : fe.displayId) || "mon-1").toLowerCase();
  }, [U, b, Se]), pt = u.useMemo(() => {
    const V = b.find((xe) => (xe.displayId ?? "").toLowerCase() === (Se || "").toLowerCase());
    if (V) return V.displayName || `Screen ${V.displayNumber || 1}`;
    if (Se === "mon-0" || Se === "0") return "Screen 1";
    if (Se === "mon-1" || Se === "1") return "Screen 2";
    const fe = (Se || "").match(/\d+/);
    if (fe) {
      const xe = parseInt(fe[0], 10);
      return `Screen ${(Se || "").startsWith("mon-") ? xe + 1 : xe}`;
    }
    return (Se || "Screen 1").toUpperCase();
  }, [b, Se]), ce = u.useMemo(() => {
    const V = b.find((fe) => (fe.displayId ?? "").toLowerCase() === (tt || "").toLowerCase());
    return V ? V.displayName || `Screen ${V.displayNumber || 2}` : "Screen 2";
  }, [b, tt]), Ee = u.useMemo(() => Z !== "director" && Z !== "split" && Z !== "pip" && Z !== "canvas" ? !0 : !!((ge == null ? void 0 : ge.isManualOverride) ?? (ge == null ? void 0 : ge.IsManualOverride)), [Z, ge]), [Ke, We] = u.useState({}), nt = u.useRef(null), [_e, se] = u.useState({ width: 0, height: 0 }), pe = u.useMemo(() => ny(b), [b]);
  u.useEffect(() => {
    if (!U || Z !== "canvas" && Z !== "all-displays" || o)
      return;
    const V = () => {
      const xe = nt.current;
      if (!xe) return;
      const Ue = 48, Ge = 72, at = Math.max(100, xe.clientWidth - Ue), ht = Math.max(100, xe.clientHeight - Ge), Qe = pe.totalWidth || 1920, Nt = pe.totalHeight || 1080, Et = Qe / Nt;
      let Bt = at, Ot = Bt / Et;
      Ot > ht && (Ot = ht, Bt = Ot * Et), se({ width: Math.round(Bt), height: Math.round(Ot) });
    };
    V();
    const fe = new ResizeObserver(V);
    return nt.current && fe.observe(nt.current), () => fe.disconnect();
  }, [U, Z, pe]);
  const T = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!U || Z !== "canvas" && Z !== "all-displays")
      return;
    let V = !0;
    const fe = new AbortController(), xe = T;
    b.forEach((Ge, at) => {
      const ht = (Ge.displayId ?? Ge.DisplayId ?? `mon-${at}`).toLowerCase(), Qe = On.get(H, xe, ht);
      Qe ? We((Nt) => ({ ...Nt, [ht]: Qe })) : On.fetchFrame(H, xe, fe.signal, ht).then((Nt) => {
        V && Nt && We((Et) => ({ ...Et, [ht]: Nt }));
      });
    });
    const Ue = On.subscribe((Ge, at, ht, Qe) => {
      Ge === H && at === xe && Qe && V && We((Nt) => ({ ...Nt, [Qe.toLowerCase()]: ht }));
    });
    return () => {
      V = !1, fe.abort(), Ue();
    };
  }, [U, Z, b, H, T]);
  const J = u.useRef(Se), X = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), ne = t + r, q = u.useMemo(() => X.length === 0 ? !0 : X.some((V) => {
    const fe = (V.startEpochMs ?? V.startEpoch ?? 0) - 2e3, xe = (V.endEpochMs ?? V.endEpoch ?? 0) + 2e3;
    return ne >= fe && ne <= xe;
  }), [X, ne]), Q = !q && X.length > 0, [de, Je] = u.useState("A"), [Oe, Be] = u.useState(""), [lt, Ze] = u.useState(""), [It, kt] = u.useState(""), [Tt, Lt] = u.useState(null), [qe, xt] = u.useState(!1), [ze, Re] = u.useState(!1), [vt, At] = u.useState(() => {
    if (!H) return null;
    const V = Math.round(t + r);
    return On.get(H, V, Se) || null;
  }), [Gt, Kt] = u.useState(null), dn = de === "A" ? A : k, De = u.useCallback(() => {
    const V = kl();
    A.current && (A.current.volume = V.volume, A.current.muted = de !== "A" || V.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, de === "A" && !V.isMuted && Ha(A.current)), k.current && (k.current.volume = V.volume, k.current.muted = de !== "B" || V.isMuted, k.current.defaultPlaybackRate = i, k.current.playbackRate = i, de === "B" && !V.isMuted && Ha(k.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [de, i]);
  u.useEffect(() => {
    const V = (fe) => {
      fe.detail && (A.current && (A.current.volume = fe.detail.volume), k.current && (k.current.volume = fe.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!O || !H) return;
    if (o) {
      re.current = !0;
      return;
    }
    const V = re.current;
    re.current = o;
    let fe = !0;
    const xe = new AbortController(), Ue = Math.round(t + r), Ge = On.get(H, Ue, Se);
    if (Ge) {
      At(Ge);
      return;
    }
    const ht = setTimeout(() => {
      fe && On.fetchFrame(H, Ue, xe.signal, Se).then((Nt) => {
        fe && Nt && At(Nt);
      });
    }, V ? 25 : 35), Qe = On.subscribe((Nt, Et, Bt, Ot) => {
      Nt === H && Et === Ue && (!Ot || Ot === Se) && fe && At(Bt);
    });
    return () => {
      fe = !1, clearTimeout(ht), xe.abort(), Qe();
    };
  }, [O, H, t, r, o, qe, Se]), u.useEffect(() => {
    if (!U || Z !== "split" && Z !== "pip" || !tt || o) {
      Kt(null);
      return;
    }
    let V = !0;
    const fe = new AbortController(), xe = Math.round(t + r), Ue = On.get(H, xe, tt);
    if (Ue) {
      Kt(Ue);
      return;
    }
    const Ge = setTimeout(() => {
      V && On.fetchFrame(H, xe, fe.signal, tt).then((ht) => {
        V && ht && Kt(ht);
      });
    }, 40), at = On.subscribe((ht, Qe, Nt, Et) => {
      ht === H && Qe === xe && (!Et || Et === tt) && V && Kt(Nt);
    });
    return () => {
      V = !1, clearTimeout(Ge), fe.abort(), at();
    };
  }, [U, Z, tt, O, H, t, r]);
  const $e = u.useCallback((V, fe = Se) => {
    const xe = Math.round(t), Ue = Math.round(t + n), Ge = Math.min(Ue, Math.max(xe, Math.round(t + V)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(H)}&startEpoch=${xe}&endEpoch=${Ue}&seekEpoch=${Ge}&displayId=${encodeURIComponent(fe)}&_t=${Date.now()}`;
  }, [t, n, H, Se]);
  u.useEffect(() => {
    if (!(!O || !H))
      if (o && q) {
        const V = _.current;
        z.current = V, R.current = V, B.current = !1;
        const fe = $e(V, Se);
        xt(!1), Re(!0), Je("A"), Be(fe), Ze(""), Lt(null), kt((Z === "split" || Z === "pip") && tt ? $e(V, tt) : "");
      } else o || (oe.current && clearTimeout(oe.current), B.current = !1, Be(""), Ze(""), kt(""), Lt(null), xt(!1), Re(!1), A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause());
  }, [o, O, H, q, $e, Se, Z, tt]), u.useEffect(() => {
    if (J.current !== Se && (J.current = Se, o && q)) {
      const V = _.current;
      z.current = V;
      const fe = $e(V, Se);
      xt(!1), Re(!0), Je("A"), Be(fe), Ze("");
    }
  }, [Se, o, q, $e]), u.useEffect(() => {
    if (!O || !H) return;
    const V = Math.abs(r - R.current);
    if (!o || V < 15) {
      R.current = r;
      return;
    }
    return B.current = !0, R.current = r, z.current = r, A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause(), xt(!1), Re(!0), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!q) {
        Be(""), Ze(""), kt(""), Re(!1), B.current = !1;
        return;
      }
      const fe = _.current, xe = $e(fe, Se);
      Je("A"), Be(xe), Ze(""), Lt(null), (Z === "split" || Z === "pip") && tt && kt($e(fe, tt));
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [r, o, O, H, q, $e, Se, Z, tt]), u.useEffect(() => {
    if (!o || !qe || X.length === 0) return;
    const V = t + _.current, fe = X.map((xe) => ({
      start: xe.startEpochMs ?? xe.startEpoch ?? 0,
      end: xe.endEpochMs ?? xe.endEpoch ?? 0
    })).filter((xe) => xe.start > V + 500).sort((xe, Ue) => xe.start - Ue.start)[0];
    if (fe && (!Tt || Tt.start !== fe.start)) {
      const xe = fe.start - t;
      if (xe < v) {
        const Ue = $e(xe, Se);
        Lt({ start: fe.start, ms: xe }), de === "A" ? Ze(Ue) : Be(Ue);
      }
    }
  }, [o, qe, r, t, v, X, Tt, de, $e, Se]);
  const st = u.useCallback(() => {
    if (Tt) {
      const V = de === "A" ? "B" : "A", fe = V === "A" ? A : k;
      Je(V), z.current = Tt.ms, R.current = Tt.ms, Lt(null), fe.current && fe.current.play().then(() => {
        De();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Tt, de, De, f, d, l, a]), ue = u.useCallback(() => {
    const V = dn.current;
    if (!V || B.current || !o || G.current) return;
    const fe = V.currentTime * 1e3, xe = Math.round(z.current + fe);
    if (y && y.length > 0) {
      const Ue = t + xe, Ge = y.find((at) => Ue >= at.startEpochMs && Ue < at.endEpochMs);
      if (Ge) {
        G.current = !0;
        const at = Math.round(Ge.endEpochMs - t) + 10;
        l(at), setTimeout(() => {
          G.current = !1;
        }, 150);
        return;
      }
    }
    if (xe >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    R.current = xe, l(xe);
  }, [dn, o, t, y, v, f, d, l, a]), rt = ze && o && !Q;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${Z} ${h}`, children: [
    U && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (V) => V.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "director" ? "active" : ""}`,
          onClick: () => K("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "canvas" ? "active" : ""}`,
          onClick: () => K("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "split" ? "active" : ""}`,
          onClick: () => K("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "pip" ? "active" : ""}`,
          onClick: () => K("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      b.map((V, fe) => {
        const xe = (V.displayId ?? `mon-${fe}`).toLowerCase(), Ue = V.displayNumber ?? fe + 1, Ge = V.displayName || `Screen ${Ue}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${Z === xe ? "active" : ""}`,
            onClick: () => K(xe),
            title: `Pin directly to ${Ge}`,
            children: [
              "🖥️ ",
              Ue
            ]
          },
          xe
        );
      }),
      Z === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          b.map((V, fe) => {
            const xe = (V.displayId ?? `mon-${fe}`).toLowerCase(), Ue = V.displayNumber ?? fe + 1, Ge = V.displayName || `Screen ${Ue}`, at = Se === xe;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${at ? "active" : ""} ${Ee && at ? "is-override" : ""}`,
                onClick: () => {
                  P == null || P(O, t + r, xe);
                },
                title: `Punch ${Ge} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ue
                  ] }),
                  at && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: Ee ? "✋" : "⚡" })
                ]
              },
              `punch-${xe}`
            );
          }),
          Ee && w && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                w == null || w(O, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    U && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${Ee ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: Z === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : Z === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : Z === "pip" ? `🪟 PiP MODE: ${pt.toUpperCase()} (HERO)` : `${Ee ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${pt.toUpperCase()}` }),
      Ee && Z === "director" && w && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => w == null ? void 0 : w(O, t + r),
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
          opacity: qe && de === "A" ? 1 : 0,
          zIndex: de === "A" ? 3 : 1,
          pointerEvents: de === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: de === "A",
        preload: "auto",
        muted: de !== "A" || kl().isMuted,
        onCanPlay: () => {
          De(), o && de === "A" && A.current && A.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          de === "A" && (B.current = !1, xt(!0), Re(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          de === "A" && Re(!0);
        },
        onTimeUpdate: () => {
          var V;
          de === "A" && (!qe && ((V = A.current) == null ? void 0 : V.currentTime) > 0 && (B.current = !1, xt(!0), Re(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), ue());
        },
        onError: () => {
          de === "A" && (B.current = !1, Re(!1), xt(!1));
        },
        onEnded: () => {
          de === "A" && st();
        }
      }
    ),
    lt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: k,
        src: lt,
        className: "feed-video-element",
        style: {
          opacity: qe && de === "B" ? 1 : 0,
          zIndex: de === "B" ? 3 : 1,
          pointerEvents: de === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: de === "B",
        preload: "auto",
        muted: de !== "B" || kl().isMuted,
        onCanPlay: () => {
          De(), o && de === "B" && k.current && k.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          de === "B" && (B.current = !1, xt(!0), Re(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i));
        },
        onWaiting: () => {
          de === "B" && Re(!0);
        },
        onTimeUpdate: () => {
          var V;
          de === "B" && (!qe && ((V = k.current) == null ? void 0 : V.currentTime) > 0 && (B.current = !1, xt(!0), Re(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i)), ue());
        },
        onError: () => {
          de === "B" && (B.current = !1, Re(!1), xt(!1));
        },
        onEnded: () => {
          de === "B" && st();
        }
      }
    ),
    Z !== "split" && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: qe ? 0 : 2 },
        children: Q ? /* @__PURE__ */ s.jsx(Dp, { isPlaying: o }) : vt && vt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: vt,
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
    Z === "split" && U && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        vt && vt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: vt, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Gt && Gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Gt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    Z === "pip" && U && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (V) => {
          V.stopPropagation(), Fe((fe) => !fe);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              ce.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Gt && Gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Gt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (Z === "canvas" || Z === "all-displays") && U && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: nt, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: _e.width ? `${_e.width}px` : "92%",
            height: _e.height ? `${_e.height}px` : "auto",
            aspectRatio: `${pe.totalWidth} / ${pe.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: b.map((V, fe) => {
            const xe = sy(V, pe), Ue = (V.displayId ?? V.DisplayId ?? `mon-${fe}`).toLowerCase(), Ge = Ke[Ue] || (Ue === Se ? vt : null), at = !!(V.isPrimary ?? V.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${at ? "is-primary" : ""}`,
                style: {
                  left: `${xe.leftPct}%`,
                  top: `${xe.topPct}%`,
                  width: `${xe.widthPct}%`,
                  height: `${xe.heightPct}%`
                },
                onClick: (ht) => {
                  ht.stopPropagation(), I ? I(Ue) : K(Ue);
                },
                title: `Display ${fe + 1} (${V.width || 1920}x${V.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      at ? "★ " : "",
                      "🖥 ",
                      fe + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: V.displayName || V.DisplayName || Ue.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      V.width || 1920,
                      "x",
                      V.height || 1080
                    ] }),
                    I && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (ht) => {
                          ht.stopPropagation(), I(Ue);
                        },
                        title: `Open Display ${fe + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Ge && Ge !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Ge,
                      className: "canvas-frame-img",
                      alt: Ue
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      V.displayName || Ue.toUpperCase(),
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
    rt && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          H,
          " • ",
          Se.toUpperCase()
        ] })
      ] })
    ] }) }),
    Z === "director" && ge && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Se.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        St(ge.startEpochMs ?? ge.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        St(ge.endEpochMs ?? ge.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    U && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      Pp,
      {
        displays: b,
        activeDisplayId: Se,
        mode: Ee ? "MANUAL" : "AUTO",
        activeTimeRange: ge ? `${St(ge.startEpochMs ?? ge.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${St(ge.endEpochMs ?? ge.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (V) => {
          P && P(O, t + r, V), K(V);
        }
      }
    ),
    j && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      H
    ] }) })
  ] });
}
const Hi = 2200, Ki = 400;
function ly({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + xa, f = e - v;
      if (f >= 0 && f <= Hi)
        return {
          ...d,
          elapsed: f
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let a = 1;
  if (o.elapsed > Hi - Ki) {
    const c = (o.elapsed - (Hi - Ki)) / Ki;
    a = Math.max(0, 1 - c);
  }
  if (a <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Up(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = Bp(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(So.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const oy = [
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
function Xp({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? As.createPortal(
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: oy.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
const ph = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, i = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(a)}.${c(i)}`;
};
function ay({
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
  viewportStartMs: j = 0,
  onViewportStartChange: C,
  playheadMs: P = 0,
  playheadEpochMs: w = 0,
  setPlayheadMs: g,
  inPointMs: x = 0,
  setInPointMs: I,
  outPointMs: S = 36e5,
  setOutPointMs: M,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: k,
  isPlaying: N,
  setIsPlaying: _,
  isLooping: z = !0,
  setIsLooping: R,
  playbackSpeed: B,
  setPlaybackSpeed: oe,
  keystrokeMode: re = "BURN_IN",
  onChangeKeystrokeMode: G,
  keystrokes: O = [],
  showRulerKeystrokes: H = !1,
  onToggleRulerKeystrokes: b,
  directorPlan: U,
  onOverrideDisplay: L,
  onSplitDirectorSegment: ae,
  onChangeDirectorSegmentDisplay: te,
  onResetDirectorSegmentToAuto: Z
}) {
  var Gt, Kt, dn;
  const [K, Ie] = u.useState(!1), Le = N !== void 0 ? N : K, Me = u.useCallback((De) => {
    const $e = typeof De == "function" ? De(Le) : De;
    _ ? _($e) : Ie($e), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: $e } }));
  }, [Le, _]), [Fe, ge] = u.useState(!0), Se = z !== void 0 ? z : Fe, tt = R || ge, [pt, ce] = u.useState(1), Ee = B !== void 0 ? B : pt, Ke = oe || ce, [We, nt] = u.useState(null), [_e, se] = u.useState(!1), [pe, T] = u.useState(A), J = ((Gt = t == null ? void 0 : t.displays) == null ? void 0 : Gt.length) > 1 || ((dn = (Kt = t == null ? void 0 : t.topology) == null ? void 0 : Kt.displays) == null ? void 0 : dn.length) > 1, [X, ne] = u.useState(() => {
    if (!J) return "mon-0";
    if (n) return n;
    try {
      const De = localStorage.getItem("itb_spotlight_viewmode");
      if (De) return De;
    } catch {
    }
    return "canvas";
  }), q = u.useCallback((De) => {
    ne(($e) => {
      const st = typeof De == "function" ? De($e) : De;
      try {
        localStorage.setItem("itb_spotlight_viewmode", st);
      } catch {
      }
      return st;
    });
  }, []), [Q, de] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!J) {
        ne("mon-0");
        return;
      }
      if (n)
        ne(n);
      else
        try {
          const De = localStorage.getItem("itb_spotlight_viewmode");
          ne(De || "canvas");
        } catch {
          ne("canvas");
        }
    }
  }, [e, n, J, t == null ? void 0 : t.id]);
  const Je = u.useRef(null), Oe = u.useRef(d);
  Oe.current = d;
  const Be = u.useRef(j);
  Be.current = j;
  const lt = u.useRef(c);
  lt.current = c;
  const Ze = u.useRef(t && t.id);
  u.useEffect(() => {
    var De, $e, st;
    t && t.id && Ze.current !== t.id && (Ze.current = t.id, Ke(1), ((De = t.displays) == null ? void 0 : De.length) > 1 || ((st = ($e = t.topology) == null ? void 0 : $e.displays) == null ? void 0 : st.length) > 1 || q("mon-0"));
  }, [t, Ke]);
  const It = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const De = Je.current;
    if (!De || !v || !C) return;
    const $e = (st) => {
      st.preventDefault(), st.stopPropagation();
      const ue = st.ctrlKey || st.shiftKey, rt = Oe.current, V = Be.current, fe = lt.current || 36e5;
      if (ue) {
        const xe = Math.abs(st.deltaX) > Math.abs(st.deltaY) ? st.deltaX : st.deltaY;
        if (xe === 0) return;
        const Ue = fe / rt, Ge = Math.max(0, fe - Ue), at = Ue * 0.08 * (xe > 0 ? 1 : -1), ht = Math.max(0, Math.min(Ge, V + at));
        Be.current = ht, C(ht);
      } else {
        if (st.deltaY === 0) return;
        const Ue = st.deltaY < 0 ? 1.25 : 0.8, Ge = De.getBoundingClientRect(), at = Ge.left + 150, ht = Ge.right - 58, Qe = Math.max(100, ht - at);
        let Nt = 0.5;
        st.clientX >= at && st.clientX <= ht ? Nt = (st.clientX - at) / Qe : Ge.width > 0 && (Nt = Math.max(0, Math.min(1, (st.clientX - Ge.left) / Ge.width)));
        const Et = Math.max(32, fe / 2e3), Bt = Math.max(1, Math.min(Et, Math.round(rt * Ue * 100) / 100));
        if (Bt === rt) return;
        const Ot = fe / rt, an = fe / Bt, wn = V + Nt * Ot - Nt * an, Bn = Math.max(0, fe - an), $s = Math.max(0, Math.min(Bn, wn));
        Oe.current = Bt, Be.current = $s, C($s), v(Bt);
      }
    };
    return De.addEventListener("wheel", $e, { passive: !1, capture: !0 }), () => De.removeEventListener("wheel", $e, { capture: !0 });
  }, [e, t, v, C]);
  const kt = u.useCallback(() => {
    f ? f() : (Be.current = 0, Oe.current = 1, C == null || C(0), v == null || v(1));
  }, [f, C, v]), Tt = u.useCallback((De, $e) => {
    if (p)
      p(De, $e);
    else {
      const st = Math.max(1e3, $e - De), ue = Math.max(500, st * 0.05), rt = Math.max(0, De - ue), fe = Math.min(c, $e + ue) - rt, xe = Math.max(32, c / 2e3), Ue = Math.max(1, Math.min(xe, Number((c / fe).toFixed(1)))), Ge = c / Ue, at = Math.max(0, Math.min(rt, c - Ge));
      Be.current = at, Oe.current = Ue, C == null || C(at), v == null || v(Ue);
    }
  }, [p, c, C, v]), Lt = u.useCallback((De, $e = "center") => {
    if (y)
      y(De, $e);
    else {
      if (De == null) return;
      const st = Oe.current || 1, ue = c / Math.max(1, st), rt = $e === "start" ? ue / 4 : ue * 0.75, V = Math.max(0, Math.min(De - rt, c - ue));
      Be.current = V, C == null || C(V);
    }
  }, [y, c, C]), qe = u.useCallback(() => {
    Me((De) => !De);
  }, [Me]), xt = u.useCallback(async () => {
    var ue;
    if (!t || Math.abs(S - x) < 1e3) return;
    const De = (re || "NONE").toUpperCase().replace("-", "_");
    let $e;
    De === "NONE" || De === "OFF" ? $e = "None" : De === "CAPTION" ? $e = "Caption" : $e = "BurnIn";
    const st = {
      createdBy: Yp(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(x),
      outEpochMs: a + Math.round(S),
      keystrokeMode: $e,
      layoutMode: J ? X : "mon-0",
      targetDisplayId: !J || X === "mon-0" || X === "mon-1" || X.startsWith("mon-") ? J ? X : "mon-0" : null,
      isPipSwapped: Q,
      directorSegments: J ? (U == null ? void 0 : U.segments) || ((ue = t == null ? void 0 : t.directorPlan) == null ? void 0 : ue.segments) || [] : []
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
    } catch (rt) {
      console.warn("[SoloSpotlightModal] Export trigger error:", rt);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, x, S, a, k, re, X, Q, U]);
  u.useEffect(() => {
    if (!e || !t) return;
    const De = ($e) => {
      if (($e.ctrlKey || $e.metaKey) && ($e.key === "e" || $e.key === "E")) {
        $e.preventDefault(), xt();
        return;
      }
      if ($e.key === "?" || $e.shiftKey && $e.code === "Slash") {
        $e.preventDefault(), se((st) => !st);
        return;
      }
      if (_e) {
        $e.key === "Escape" && se(!1);
        return;
      }
      if ($e.key === "Escape" || $e.code === "Escape") {
        $e.preventDefault(), $e.stopPropagation(), o == null || o();
        return;
      }
      if ($e.code === "Space") {
        $e.preventDefault(), qe();
        return;
      }
      if ($e.code === "KeyI") {
        $e.preventDefault(), I(Math.max(0, Math.min(P, S - 1e3)));
        return;
      }
      if ($e.code === "KeyO") {
        $e.preventDefault(), M(Math.min(c, Math.max(P, x + 1e3)));
        return;
      }
      if ($e.code === "ArrowLeft" || $e.code === "ArrowRight") {
        $e.preventDefault(), Me(!1);
        const st = $e.code === "ArrowLeft";
        let ue;
        if ($e.ctrlKey || $e.metaKey)
          ue = 33;
        else if ($e.shiftKey)
          ue = 5e3;
        else {
          const rt = Math.max(1, d);
          ue = Math.max(33, Math.round(1e3 / rt));
        }
        g((rt) => {
          const V = st ? rt - ue : rt + ue;
          return Math.max(0, Math.min(c, V));
        });
        return;
      }
      if ($e.key === "ArrowDown") {
        $e.preventDefault();
        const st = r.findIndex((ue) => ue.id === t.id);
        if (st !== -1) {
          const ue = (st + 1) % r.length;
          l(r[ue].id);
        }
        return;
      }
      if ($e.key === "ArrowUp") {
        $e.preventDefault();
        const st = r.findIndex((ue) => ue.id === t.id);
        if (st !== -1) {
          const ue = (st - 1 + r.length) % r.length;
          l(r[ue].id);
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
    P,
    x,
    S,
    c,
    d,
    I,
    M,
    g,
    xt,
    qe,
    Me,
    _e
  ]);
  const ze = r.findIndex((De) => De.id === (t && t.id)), Re = r[ze - 1], vt = r[ze + 1];
  if (!e || !t) return null;
  const At = w > 0 ? w : Math.round(a + P);
  return As.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      We && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${We.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          We.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          We.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          We.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: We.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            ph(S - x),
            " (",
            St(a + x, i),
            " → ",
            St(a + S, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          ry,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: P,
            setPlayheadMs: g,
            isPlaying: Le,
            setIsPlaying: Me,
            playbackSpeed: Ee,
            timeMode: i,
            inPointMs: x,
            outPointMs: S,
            isLooping: Se,
            recordingSegments: h,
            globalGaps: pe,
            showWatermark: !0,
            directorPlan: U || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: L,
            onResetOverride: Z,
            viewMode: X,
            onViewModeChange: q,
            isPipSwapped: Q,
            onPipSwapChange: de
          }
        ),
        /* @__PURE__ */ s.jsx(
          ly,
          {
            currentEpochMs: At,
            keystrokes: O,
            keystrokeMode: re
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
              disabled: !Re,
              onClick: () => Re && l(Re.id),
              title: Re ? `Previous: ${Re.displayName || Re.roleAlias || Re.hostname || Re.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            ze + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !vt,
              onClick: () => vt && l(vt.id),
              title: vt ? `Next: ${vt.displayName || vt.roleAlias || vt.hostname || vt.name} (↓)` : "Last station",
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Le ? "is-playing-dimmed" : ""}`, ref: Je, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: ph(S - x) })
            ] }),
            (() => {
              const De = X === "mon-0" ? "SCREEN 1" : X === "mon-1" ? "SCREEN 2" : X.startsWith("mon-") ? `SCREEN ${parseInt(X.slice(4)) + 1}` : X.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: xt,
                  title: `Export Selected Cut Window as ${De} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: X === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${De})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            Hc,
            {
              activeStationId: t.id,
              isPlaying: Le,
              setIsPlaying: qe,
              isLooping: Se,
              setIsLooping: tt,
              playbackSpeed: Ee,
              onChangeSpeed: Ke,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: x,
              setInPointMs: I,
              outPointMs: S,
              setOutPointMs: M,
              onSetInPoint: () => I(Math.max(0, Math.min(P, S - 1e3))),
              onSetOutPoint: () => M(Math.min(c, Math.max(P, x + 1e3))),
              onStepFrameBackward: () => {
                Me(!1), g((De) => Math.max(0, De - 33));
              },
              onStepFrameForward: () => {
                Me(!1), g((De) => Math.min(c, De + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(a + P, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Hp,
          {
            stations: It,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: kt,
            onFitRange: Tt,
            onJumpViewportTo: Lt,
            viewportStartMs: j,
            onViewportStartChange: C,
            playheadMs: P,
            setPlayheadMs: (De) => {
              Me(!1), g(De);
            },
            inPointMs: x,
            setInPointMs: I,
            outPointMs: S,
            setOutPointMs: M,
            recordingSegments: h,
            onExport: xt,
            onEstimateLoaded: (De) => {
              De != null && De.removedGlobalGaps && T(De.removedGlobalGaps);
            },
            keystrokeMode: re,
            onChangeKeystrokeMode: G,
            keystrokes: O,
            showKeystrokes: H,
            showRulerKeystrokes: H,
            onToggleRulerKeystrokes: b,
            onSplitDirectorSegment: ae,
            onChangeDirectorSegmentDisplay: te,
            onResetDirectorSegmentToAuto: Z
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Xp,
        {
          isOpen: _e,
          onClose: () => se(!1)
        }
      )
    ] }),
    document.body
  );
}
function Gp({ isGlobalHost: e = !1 }) {
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
      let _ = 2500;
      typeof document < "u" && document.hidden ? _ = 3e4 : i.current > 0 && (_ = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), k();
      }, _);
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
  const j = t.filter((h) => h.status === "Processing" || h.status === "Queued"), C = t.filter((h) => h.status === "Completed" || h.isCompleted), P = () => {
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
  }, g = (h, A) => {
    A.stopPropagation(), !(!h || r.has(h)) && (l((k) => new Set(k).add(h)), setTimeout(() => {
      n((k) => {
        const N = k.filter((_) => (_.jobId || _.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: N })), N;
      }), l((k) => {
        const N = new Set(k);
        return N.delete(h), N;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((k) => console.warn("[ExportJobMonitor] Dismiss failed:", k)));
  }, x = async (h, A) => {
    A.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), p();
    } catch (k) {
      console.warn("[ExportJobMonitor] Bookmark failed:", k);
    }
  }, I = (h, A) => {
    A.stopPropagation();
    const k = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    k && (navigator.clipboard.writeText(k), alert(`UNC Directory Path copied to clipboard:
${k}`));
  }, S = (h) => {
    const A = h.jobId || h.id, k = `/api/v1/extractor-advanced/jobs/${A}/download`, N = document.createElement("a");
    N.href = k, N.download = h.fileName || `archive_${A}.tar`, document.body.appendChild(N), N.click(), document.body.removeChild(N), setTimeout(p, 1e3);
  }, M = (h) => {
    if (!h || h <= 0) return "0 B";
    const A = h / (1024 * 1024);
    return A >= 1e3 ? `${(A / 1024).toFixed(2)} GB` : `${A.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : As.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${j.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${j.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: j.length > 0 ? `EXPORTS: ${j.length} PACKAGING` : `${C.length} ARCHIVE${C.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${j.length > 0 ? "" : "ready"}`, children: j.length > 0 ? `${j[0].progressPercent}%` : "DOWNLOAD" })
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
                onClick: P,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: w, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const A = h.status === "Completed" || h.isCompleted, k = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", _ = h.jobId || h.id, z = r.has(_), R = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${h.status.toLowerCase()} ${h.isBookmarked ? "is-bookmarked" : ""} ${z ? "is-dismissing" : ""}`,
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
                      onClick: (B) => g(_, B),
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
                      R,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, R)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      M(h.fileSizeBytes)
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
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: M(h.fileSizeBytes) })
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
                        onClick: (B) => x(_, B),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (B) => I(h, B),
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
                      onClick: () => S(h),
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
            _
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function iy({
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
function cy({
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
    const _ = Math.round(k * N / 2073600 * 6 * 10) / 10, z = Math.round(_ * 60 / 8 * 10) / 10;
    return `~${_} Mbps (~${z} MB/min)`;
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
  ], [p, y] = u.useState("BurnIn"), [j, C] = u.useState(r.resolution || "NATIVE"), [P, w] = u.useState(""), [g, x] = u.useState(!1);
  if (!e) return null;
  const I = async () => {
    x(!0);
    try {
      await n(p, j, P), t();
    } finally {
      x(!1);
    }
  }, S = (r.layout || "DIRECTOR").toUpperCase(), M = r.stationsCount || 1, h = r.audioSegmentsCount || 1, A = f.find((k) => k.id === j) || f[0];
  return As.createPortal(
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
              S,
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
              M,
              " WORKSTATION",
              M > 1 ? "S" : ""
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
              Jg(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((k) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${j === k.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: k.id,
              checked: j === k.id,
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
              value: P,
              onChange: (k) => w(k.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            P.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: g, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: I, disabled: g, children: g ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${A.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function uy(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, v] = u.useState(!1), f = u.useRef(o);
  f.current = o;
  const p = u.useCallback(async () => {
    if (isNaN(e)) return;
    const C = e + t;
    v(!0);
    try {
      const P = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(C),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), w = await fetch(`/api/v1/extractor-advanced/stations?${P.toString()}`);
      if (w.ok) {
        const g = w.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const x = await w.json(), S = (Array.isArray(x) ? x : x.stations || x.items || []).filter((M) => (M.recordingsCount || (M.segments ? M.segments.length : 0)) > 0).map((M) => {
            var h, A;
            return {
              id: String(M.id || M.stationId || M.agentId || M.hostname),
              hostname: M.hostname || "Station",
              roleAlias: M.roleAlias || null,
              roleHistory: M.roleHistory || [],
              displayName: M.displayName || M.roleAlias || M.hostname || "Station",
              isOnline: M.isOnline !== void 0 ? M.isOnline : !0,
              recordingsCount: M.recordingsCount || 0,
              segments: M.segments || [],
              displays: M.displays || M.Displays || ((h = M.displayTopology) == null ? void 0 : h.displays) || ((A = M.DisplayTopology) == null ? void 0 : A.Displays) || [],
              displayTopology: M.displayTopology || M.DisplayTopology || null,
              directorPlan: M.directorPlan || M.DirectorPlan || null,
              hasAudio: !!M.hasAudio,
              audioCodec: M.audioCodec || "",
              audioChannels: M.audioChannels || 0,
              audioLabel: M.audioLabel || (M.hasAudio ? "AAC" : "NONE"),
              width: M.width || 1920,
              height: M.height || 1080,
              fps: M.fps || 30,
              isVfr: !!M.isVfr,
              resolution: M.resolution || "1080p",
              feedSpec: M.feedSpec || "1080p • 30fps"
            };
          });
          a((M) => {
            if (!M || M.length === 0) return S;
            const h = new Map(M.map((N) => [N.id, N]));
            let A = M.length !== S.length;
            const k = S.map((N) => {
              const _ = h.get(N.id);
              return _ ? _.isOnline === N.isOnline && _.displayName === N.displayName && _.roleAlias === N.roleAlias && _.feedSpec === N.feedSpec && _.recordingsCount === N.recordingsCount && _.fps === N.fps ? _ : (A = !0, { ..._, ...N }) : (A = !0, N);
            });
            return A ? k : M;
          });
        }
      }
    } catch (P) {
      console.warn("[useStudioData] Failed fetching active stations:", P);
    } finally {
      v(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    p();
  }, [p]);
  const y = u.useMemo(() => {
    const C = /* @__PURE__ */ new Set();
    return o.forEach((P) => {
      P.id && C.add(P.id), P.hostname && C.add(P.hostname);
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
        const w = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${w}`);
        if (g.ok && C) {
          const x = await g.json() || {}, I = {};
          (f.current || []).forEach((S) => {
            const M = x[S.id] || x[S.hostname] || x[S.displayName] || [];
            I[S.id] = M, I[S.hostname] = M;
          }), Object.keys(x).forEach((S) => {
            I[S] || (I[S] = x[S]);
          }), c(I);
        }
      } catch {
        C && c({});
      }
    })(), () => {
      C = !1;
    };
  }, [y, e, t]);
  const j = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let C = 1 / 0, P = -1 / 0;
    o.forEach((I) => {
      (i[I.id] || i[I.hostname] || I.segments || []).forEach((M) => {
        const h = M.startEpochMs ?? M.startEpoch ?? 0, A = M.endEpochMs ?? M.endEpoch ?? 0;
        h > 0 && h < C && (C = h), A > 0 && A > P && (P = A);
      });
    });
    let w = 1 / 0, g = -1 / 0;
    l && (i[l] || []).forEach((S) => {
      const M = S.startEpochMs ?? S.startEpoch ?? 0, h = S.endEpochMs ?? S.endEpoch ?? 0;
      M > 0 && M < w && (w = M), h > 0 && h > g && (g = h);
    });
    const x = (I) => I === 1 / 0 || I === -1 / 0 ? null : Math.max(0, Math.min(t, I - e));
    return {
      globalFirstMs: x(C),
      globalLastMs: x(P),
      currentFirstMs: x(w),
      currentLastMs: x(g)
    };
  }, [o, i, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: i,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: p,
    movieBoundaries: j
  };
}
function dy({
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
  const [p, y] = u.useState(i), [j, C] = u.useState(c), [P, w] = u.useState(d), [g, x] = u.useState(v), I = u.useRef(null), S = u.useRef(null), M = o || l, h = u.useMemo(() => M ? a[M.id] || M.segments || [] : [], [M, a]), A = h.some((z) => {
    const R = z.startEpochMs ?? z.startEpoch ?? 0, B = z.endEpochMs ?? z.endEpoch ?? 0, oe = e + p;
    return oe >= R && oe <= B;
  }), k = !!(!f && M && A);
  u.useEffect(() => {
    y((z) => z < t ? t : z > n ? (C(!1), n) : z);
  }, [t, n]);
  const N = u.useCallback((z) => {
    I.current || (I.current = z);
    const R = (z - I.current) * g, B = Math.min(R, 250 * g);
    I.current = z, y((oe) => {
      let re = oe + B;
      if (r && r.length > 0) {
        const G = e + re, O = r.find((H) => G >= H.startEpochMs && G < H.endEpochMs);
        O && (re = O.endEpochMs - e);
      }
      return re >= n && (P ? re = t : (C(!1), re = n)), re;
    }), j && (!k || f) && (S.current = requestAnimationFrame(N));
  }, [j, P, t, n, r, e, k, g, f]);
  u.useEffect(() => (j && (!k || f) ? (I.current = performance.now(), S.current = requestAnimationFrame(N)) : (S.current && cancelAnimationFrame(S.current), I.current = null), () => {
    S.current && cancelAnimationFrame(S.current);
  }), [j, N, k, f]);
  const _ = u.useCallback(() => {
    if (j)
      C(!1);
    else {
      let z = p;
      const R = e + z, B = r == null ? void 0 : r.find((oe) => R >= oe.startEpochMs && R < oe.endEpochMs);
      if (B)
        z = B.endEpochMs - e;
      else if (M && !A) {
        const oe = h.map((re) => ({ start: re.startEpochMs ?? re.startEpoch ?? 0, end: re.endEpochMs ?? re.endEpoch ?? 0 })).filter((re) => re.start > R).sort((re, G) => re.start - G.start)[0];
        oe && (z = oe.start - e);
      }
      z !== p && y(z), C(!0);
    }
  }, [j, p, e, r, M, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: y,
    isPlaying: j,
    setIsPlaying: C,
    isLooping: P,
    setIsLooping: w,
    playbackSpeed: g,
    setPlaybackSpeed: x,
    togglePlaySmart: _
  };
}
function hy(e) {
  return 1 - Math.pow(1 - e, 3);
}
function fy({
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
  const p = Math.max(32, t / 2e3), y = t / l, j = u.useCallback((g, x = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const I = d.current, S = g - I;
    if (Math.abs(S) < 1) return;
    const M = performance.now(), h = (A) => {
      const k = A - M, N = Math.min(1, k / x);
      i(Math.round(I + S * hy(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), C = u.useCallback((g, x) => {
    const I = Math.max(1e3, x - g), S = Math.max(500, I * 0.05), M = Math.max(0, g - S), A = Math.min(t, x + S) - M, k = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), N = t / k, _ = Math.max(0, Math.min(M, t - N));
    j(_), o(k);
  }, [t, p, j]), P = u.useCallback(() => {
    j(0), o(1);
  }, [j]), w = u.useCallback((g, x = "center") => {
    if (g == null) return;
    const I = x === "start" ? y / 4 : y * 0.75, S = Math.max(0, Math.min(g - I, t - y));
    j(S);
  }, [y, t, j]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let g = null;
    const x = (S) => {
      if (S.defaultPrevented) return;
      S.preventDefault(), S.stopPropagation();
      const M = S.ctrlKey || S.shiftKey, h = v.current, A = d.current, k = f.current;
      if (M) {
        const N = Math.abs(S.deltaX) > Math.abs(S.deltaY) ? S.deltaX : S.deltaY;
        if (N === 0) return;
        const _ = k / Math.max(1, h), z = Math.max(0, k - _), R = _ * 0.08 * (N > 0 ? 1 : -1);
        i((B) => Math.max(0, Math.min(z, B + R)));
      } else {
        if (S.deltaY === 0) return;
        const _ = S.deltaY < 0 ? 1.25 : 0.8, z = Math.max(32, k / 2e3), R = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, B = Math.max(0, Math.min(R.width, S.clientX - R.left)), oe = R.width > 0 ? B / R.width : 0.5;
        o((re) => {
          const G = Math.max(1, Math.min(z, Math.round(re * _ * 100) / 100));
          if (G === re) return re;
          const O = k / re, H = k / G, U = A + oe * O - oe * H, L = Math.max(0, k - H);
          return i(Math.max(0, Math.min(L, U))), G;
        });
      }
    }, I = () => {
      const S = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return S && !g ? (g = S, g.addEventListener("wheel", x, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!I()) {
      const S = setInterval(() => {
        I() && clearInterval(S);
      }, 100);
      return () => {
        clearInterval(S), g && g.removeEventListener("wheel", x, { capture: !0 });
      };
    }
    return () => {
      g && g.removeEventListener("wheel", x, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: y,
    animateViewportTo: j,
    fitRange: C,
    resetZoom: P,
    jumpViewportTo: w
  };
}
function py({
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
  togglePlaySmart: j,
  onToggleHelpModal: C,
  onSplitDirectorAtPlayhead: P,
  isModalActive: w = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: x,
  isGridFullscreen: I = !1,
  onExitGridFullscreen: S
}) {
  u.useEffect(() => {
    const M = (h) => {
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
            if (h.preventDefault(), !g) return;
            j();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), x == null || x();
            return;
          }
          if ((h.key === "Escape" || h.code === "Escape") && I) {
            h.preventDefault(), S == null || S();
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
            let _;
            if (h.ctrlKey || h.metaKey)
              _ = 33;
            else if (h.shiftKey)
              _ = 5e3;
            else {
              const z = Math.max(1, y);
              _ = Math.max(33, Math.round(1e3 / z));
            }
            i == null || i((z) => {
              const R = N ? z - _ : z + _;
              return Math.max(0, Math.min(p, R));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const N = n.findIndex((_) => _.id === e);
            if (N === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const _ = (N + 1) % n.length;
              l(n[_].id), o(1);
            } else {
              const _ = (N - 1 + n.length) % n.length;
              l(n[_].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", M, { capture: !0 }), () => window.removeEventListener("keydown", M, { capture: !0 });
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
    j,
    C,
    P,
    w,
    g,
    x,
    I,
    S
  ]);
}
const mh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = sh(n, e), l = sh(t, e);
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
    const c = o.substring(0, 8), d = _c(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), i = new Date(a).getTime();
  return isNaN(i) ? Date.now() : i;
};
function my() {
  var En, Rl;
  const e = u.useMemo(() => zg() || {}, []), [t, n] = u.useState(() => {
    var $, le;
    return ($ = e.timeRange) != null && $.startEpochMs && ((le = e.timeRange) != null && le.endEpochMs) ? e.timeRange : mh();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    Dg().catch(($) => console.warn("[Studio] DST init error:", $));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Kl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), p = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, j] = u.useState(e.selectedStationIds || []), [C, P] = u.useState(e.activeStationId || null), [w, g] = u.useState(null), [x, I] = u.useState(null), [S, M] = u.useState([]), [h, A] = u.useState(!1), [k, N] = u.useState(null), [_, z] = u.useState(() => {
    var $;
    return e.compositionScope || ((($ = e.selectedStationIds) == null ? void 0 : $.length) > 1 ? "inter-station" : "intra-station");
  }), [R, B] = u.useState(() => {
    try {
      const $ = localStorage.getItem("itb_composition_layout");
      if ($) return $;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), oe = u.useCallback(($) => {
    B((le) => {
      const F = typeof $ == "function" ? $(le) : $;
      try {
        localStorage.setItem("itb_composition_layout", F);
      } catch {
      }
      return F;
    });
  }, []), [re, G] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [O, H] = u.useState(() => !!e.isPipSwapped), [b, U] = u.useState(() => e.audioRoutingPlan || null), [L, ae] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [te, Z] = u.useState(!1), [K, Ie] = u.useState(null), [Le, Me] = u.useState(() => e.canvasLayoutTimeline || null), [Fe, ge] = u.useState(0), Se = u.useCallback(($) => {
    Me((le) => {
      const F = [...(le == null ? void 0 : le.keyframes) || []], me = F.findIndex((Ve) => Math.abs(Ve.timestampEpochMs - $) < 300);
      if (me >= 0)
        return ge(me), le;
      const we = F[Fe] || F[0], Ce = (we == null ? void 0 : we.layout) || K || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Ae = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round($),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Ce))
      }, he = [...F, Ae].sort((Ve, Ye) => Ve.timestampEpochMs - Ye.timestampEpochMs), Xe = he.findIndex((Ve) => Ve.timestampEpochMs === Math.round($));
      return ge(Xe >= 0 ? Xe : 0), {
        ...le || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: he
      };
    });
  }, [Fe, K]), tt = u.useCallback(($, le) => {
    Me((F) => !(F != null && F.keyframes) || F.keyframes.length === 0 ? F : Uc(F, $, le));
  }, []), pt = u.useCallback(($) => {
    Me((le) => {
      if (!(le != null && le.keyframes) || le.keyframes.length <= 1) return le;
      const F = le.keyframes.filter((me, we) => we !== $);
      return ge((me) => Math.max(0, me - 1)), { ...le, keyframes: F };
    });
  }, []), ce = u.useCallback(($, le) => {
    Me((F) => {
      if (!(F != null && F.keyframes) || F.keyframes.length === 0) return F;
      const me = Math.round(le), we = typeof $ == "number" && F.keyframes[$] ? $ : F.keyframes.findIndex((he) => he.id === $);
      if (we === -1) return F;
      const Ce = [...F.keyframes];
      Ce[we] = {
        ...Ce[we],
        timestampEpochMs: me
      }, Ce.sort((he, Xe) => he.timestampEpochMs - Xe.timestampEpochMs);
      const Ae = Ce.findIndex((he) => he.timestampEpochMs === me);
      return Ae >= 0 && ge(Ae), {
        ...F,
        keyframes: Ce
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [Ee, Ke] = u.useState({}), We = u.useCallback(($) => {
    j((le) => le.filter((F) => F !== $)), C === $ && P(null), w === $ && g(null), Me((le) => {
      if (!le || !le.keyframes) return le;
      const F = le.keyframes.map((me) => {
        var we;
        return {
          ...me,
          layout: {
            ...me.layout,
            placements: (((we = me.layout) == null ? void 0 : we.placements) || []).filter((Ce) => Ce.stationId !== $)
          }
        };
      });
      return { ...le, keyframes: F };
    });
  }, [C, w]), nt = u.useCallback(($, le) => {
    $.preventDefault(), $.stopPropagation();
    const F = 195, me = 110, we = Math.min($.clientX, window.innerWidth - F - 10), Ce = Math.min($.clientY, window.innerHeight - me - 10);
    N({ x: we, y: Ce, station: le });
  }, []), _e = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, p, v]), se = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(_e + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(_e + 1e3, Math.min(p, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, v, t.durationMs, _e]), pe = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : _e, [e.playheadEpochMs, e.playheadMs, f, p, _e]), [T, J] = u.useState(_e), [X, ne] = u.useState(se);
  u.useEffect(() => {
    if (!f) return;
    const $ = Math.round(f + T), le = Math.round(f + X);
    Me((F) => {
      var he, Xe;
      if (!F || !F.keyframes || F.keyframes.length === 0) return F;
      let me = [...F.keyframes], we = !1, Ce = me.find((Ve) => Ve.tag === "cut-in");
      if (Ce)
        Ce.timestampEpochMs !== $ && (Ce.timestampEpochMs = $, we = !0);
      else {
        const Ve = me.find((Ye) => Math.abs(Ye.timestampEpochMs - $) < 500);
        if (Ve)
          Ve.tag = "cut-in", Ve.timestampEpochMs = $, we = !0;
        else {
          const Ye = ((he = me[0]) == null ? void 0 : he.layout) || K || { width: 1920, height: 1080, placements: [] };
          me.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: $,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), we = !0;
        }
      }
      let Ae = me.find((Ve) => Ve.tag === "cut-out");
      if (Ae)
        Ae.timestampEpochMs !== le && (Ae.timestampEpochMs = le, we = !0);
      else {
        const Ve = me.find((Ye) => Math.abs(Ye.timestampEpochMs - le) < 500 && Ye.tag !== "cut-in");
        if (Ve)
          Ve.tag = "cut-out", Ve.timestampEpochMs = le, we = !0;
        else {
          const Ye = ((Xe = me[me.length - 1]) == null ? void 0 : Xe.layout) || K || { width: 1920, height: 1080, placements: [] };
          me.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: le,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ye))
          }), we = !0;
        }
      }
      return we ? (me.sort((Ve, Ye) => Ve.timestampEpochMs - Ye.timestampEpochMs), {
        ...F,
        keyframes: me
      }) : F;
    });
  }, [f, T, X, K]);
  const { allStations: q, recordingSegments: Q, isLoadingStations: de, movieBoundaries: Je } = uy(
    f,
    p,
    t,
    r,
    C
  ), Oe = u.useMemo(() => q.find(($) => $.id === C) || null, [q, C]), Be = u.useCallback(($) => {
    Ke((le) => {
      const F = !(le[$] ?? !0);
      return Me((me) => {
        if (!(me != null && me.keyframes)) return me;
        const we = me.keyframes.map((Ce) => {
          var Ve;
          const Ae = ((Ve = Ce.layout) == null ? void 0 : Ve.placements) || [];
          let he = !1;
          const Xe = Ae.map((Ye) => {
            if (Ye.stationId === $) {
              if (!F && (Ye.displayId === "auto" || !Ye.displayId)) {
                he = !0;
                const et = q.find((ot) => ot.id === $);
                return {
                  ...Ye,
                  displayId: "mon-0",
                  label: `${(et == null ? void 0 : et.displayName) || $} - Screen 1 (Main)`
                };
              } else if (F && (Ye.displayId === "mon-0" || !Ye.displayId) && Ae.filter((ot) => ot.stationId === $).length === 1) {
                he = !0;
                const ot = q.find((bt) => bt.id === $);
                return {
                  ...Ye,
                  displayId: "auto",
                  label: `${(ot == null ? void 0 : ot.displayName) || $} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ye;
          });
          return he ? {
            ...Ce,
            layout: {
              ...Ce.layout,
              placements: Xe
            }
          } : Ce;
        });
        return { ...me, keyframes: we };
      }), {
        ...le,
        [$]: F
      };
    });
  }, [q]), lt = u.useCallback(($, le) => {
    Me((F) => {
      var Ye, et;
      if (!F || !F.keyframes || F.keyframes.length === 0) return F;
      const me = Fe >= 0 && Fe < F.keyframes.length ? Fe : 0, we = F.keyframes[me], Ce = ((Ye = we == null ? void 0 : we.layout) == null ? void 0 : Ye.placements) || [], Ae = (le || "mon-0").toLowerCase(), he = Ce.findIndex((ot) => {
        if (ot.stationId !== $) return !1;
        const bt = (ot.displayId || "mon-0").toLowerCase();
        return bt === Ae || bt === "auto" && (Ae === "mon-0" || Ae === "screen-0");
      });
      let Xe;
      if (he >= 0)
        Xe = Ce.filter((ot, bt) => bt !== he);
      else {
        const ot = q.find((br) => br.id === $), bt = ((et = ot == null ? void 0 : ot.displays) == null ? void 0 : et.find((br) => (br.displayId || "").toLowerCase() === Ae)) || { width: 1920, height: 1080 }, qt = bt.width || 1920, Ut = bt.height || 1080, en = qt / Ut, Un = en >= 1 ? 640 : Math.round(360 * en), Mr = en >= 1 ? Math.round(640 / en) : 360, ci = {
          stationId: $,
          displayId: Ae,
          label: `${(ot == null ? void 0 : ot.displayName) || $} - ${bt.displayName || Ae}`,
          x: 120 + Ce.length * 40 % 800,
          y: 100 + Ce.length * 40 % 500,
          width: Un,
          height: Mr,
          sourceWidth: qt,
          sourceHeight: Ut,
          nativeAspectRatio: en,
          aspectRatio: en,
          zIndex: Ce.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Xe = [...Ce, ci];
      }
      const Ve = [...F.keyframes];
      return Ve[me] = {
        ...Ve[me],
        layout: {
          ...Ve[me].layout,
          placements: Xe
        }
      }, { ...F, keyframes: Ve };
    });
  }, [Fe, q]), Ze = u.useMemo(() => !y || y.length === 0 ? [] : q.filter(($) => y.includes($.id)), [q, y]);
  u.useEffect(() => {
    !f || isNaN(f) || Me(($) => {
      if ($ != null && $.keyframes && $.keyframes.length > 0) return $;
      const le = f + (T || 0), F = f + (X || p || 36e5), me = K || {
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
            layout: JSON.parse(JSON.stringify(me))
          },
          {
            id: `kf_out_${F}`,
            timestampEpochMs: Math.round(F),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(me))
          }
        ]
      };
    });
  }, [f, T, X, p, K]), u.useEffect(() => {
    if (!Ze || Ze.length === 0 || !f || isNaN(f)) return;
    const $ = f + (T || 0), le = f + (X || p || 36e5);
    le <= $ || Ze.forEach((F) => {
      Ur.fetchWaveform(F.id, $, le, null, 250);
    });
  }, [Ze, f, T, X, p]);
  const It = u.useMemo(() => q.find(($) => $.id === w) || null, [q, w]), kt = !!(w && It), Tt = u.useRef("grid"), Lt = u.useRef(null), {
    playheadMs: qe,
    setPlayheadMs: xt,
    isPlaying: ze,
    setIsPlaying: Re,
    playbackSpeed: vt,
    setPlaybackSpeed: At,
    isLooping: Gt,
    setIsLooping: Kt,
    togglePlaySmart: dn
  } = dy({
    timelineBaseEpochMs: f,
    inPointMs: T,
    outPointMs: X,
    globalGaps: S,
    activeStation: Oe,
    spotlightStation: It,
    recordingSegments: Q,
    initialPlayheadMs: pe,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !C
  }), {
    zoomLevel: De,
    setZoomLevel: $e,
    viewportStartMs: st,
    setViewportStartMs: ue,
    resetZoom: rt,
    fitRange: V,
    jumpViewportTo: fe
  } = fy({
    containerRef: Lt,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [xe, Ue] = u.useState(!1), [Ge, at] = u.useState(!1), [ht, Qe] = u.useState(!1), [Nt, Et] = u.useState(!1), [Bt, Ot] = u.useState(
    !!(e.isWorkspaceActive && ((En = e.selectedStationIds) == null ? void 0 : En.length) > 0)
  ), [an, An] = u.useState([]);
  u.useEffect(() => {
    const $ = kt && It || Oe, le = ($ == null ? void 0 : $.hostname) || ($ == null ? void 0 : $.displayName) || ($ == null ? void 0 : $.id), F = (o || "NONE").toUpperCase().replace("-", "_");
    if (!le || !f || !(F !== "NONE" && F !== "OFF" || i)) {
      An([]);
      return;
    }
    const we = Math.max(0, f - 5e3), Ce = f + p + 5e3, Ae = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(le)}&startEpoch=${we}&endEpoch=${Ce}`, { signal: Ae.signal }).then((he) => he.ok ? he.json() : []).then((he) => An(Array.isArray(he) ? he : [])).catch((he) => {
      he.name !== "AbortError" && An([]);
    }), () => Ae.abort();
  }, [Oe, It, kt, f, p, o, i]), u.useEffect(() => {
    de || (q.length === 0 ? ((y.length > 0 || C || Bt) && (j([]), P(null), g(null), Ot(!1)), Et(!0), A(!0)) : (A(!1), j(($) => {
      const le = $.filter((F) => q.some((me) => me.id === F));
      return le.length !== $.length ? (le.length === 0 && (Ot(!1), Et(!0)), le) : $;
    })));
  }, [de, q]);
  const wn = u.useCallback(($) => {
    if ($ === null) {
      Re(!1), At(1), P(null);
      return;
    }
    $ !== C && At(1), P($);
  }, [C, Re, At]), Bn = u.useCallback(($, le = null) => {
    $ !== C && At(1), Tt.current = y.length <= 1 || C ? "spotlight" : "grid", P($), g($), I(le || null);
  }, [C, y.length, At]), $s = u.useCallback(() => {
    g(null), I(null), Tt.current === "grid" && P(null);
  }, []), Dt = u.useMemo(() => {
    if (b != null && b.segments && b.segments.length > 0)
      return b;
    const $ = y[0] || C || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          sourceStationId: $
        }
      ]
    };
  }, [b, y, C, f, p]), Rs = u.useCallback(($) => {
    U((le) => {
      const F = le || Dt, me = [...F.segments || []], we = me.findIndex((et) => {
        const ot = et.startEpochMs ?? et.StartEpochMs ?? 0, bt = et.endEpochMs ?? et.EndEpochMs ?? 0;
        return $ > ot + 500 && $ < bt - 500;
      });
      if (we === -1) return le;
      const Ce = me[we], Ae = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0, Xe = Ce.sourceStationId ?? Ce.SourceStationId ?? y[0], Ve = { startEpochMs: Ae, endEpochMs: $, sourceStationId: Xe }, Ye = { startEpochMs: $, endEpochMs: he, sourceStationId: Xe };
      return me.splice(we, 1, Ve, Ye), { ...F, segments: me };
    });
  }, [Dt, y]), Ys = u.useCallback(($, le) => {
    U((F) => {
      const me = F || Dt, we = (me.segments || []).map((Ce) => {
        const Ae = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0;
        return $ >= Ae && $ <= he ? { ...Ce, sourceStationId: le } : Ce;
      });
      return { ...me, segments: we };
    }), ae(!1);
  }, [Dt]), Zt = u.useCallback(($, le) => {
    U((F) => {
      const me = F || Dt, we = (me.segments || []).map((Ce) => {
        const Ae = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0;
        return $ >= Ae && $ <= he ? { ...Ce, gain: le } : Ce;
      });
      return { ...me, segments: we };
    });
  }, [Dt]), $n = u.useCallback(() => {
    ae(($) => !$);
  }, []), [ln, Qt] = u.useState({}), Vt = u.useCallback(($) => {
    if (!$) return null;
    if (ln[$]) return ln[$];
    const le = q.find((F) => F.id === $);
    return le != null && le.directorPlan ? le.directorPlan : {
      stationId: $,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [ln, q, f, p]), rs = u.useCallback(($, le) => {
    $ && Qt((F) => {
      const me = F[$] || Vt($), we = [...me.segments || []], Ce = we.findIndex((bt) => {
        const qt = bt.startEpochMs ?? bt.StartEpochMs ?? 0, Ut = bt.endEpochMs ?? bt.EndEpochMs ?? 0;
        return le > qt + 500 && le < Ut - 500;
      });
      if (Ce === -1) return F;
      const Ae = we[Ce], he = Ae.startEpochMs ?? Ae.StartEpochMs ?? 0, Xe = Ae.endEpochMs ?? Ae.EndEpochMs ?? 0, Ve = Ae.targetDisplayId ?? Ae.TargetDisplayId ?? "mon-0", Ye = !!(Ae.isManualOverride ?? Ae.IsManualOverride), et = { ...Ae, startEpochMs: he, endEpochMs: le, targetDisplayId: Ve, isManualOverride: Ye }, ot = { ...Ae, startEpochMs: le, endEpochMs: Xe, targetDisplayId: Ve, isManualOverride: Ye };
      return we.splice(Ce, 1, et, ot), { ...F, [$]: { ...me, segments: we } };
    });
  }, [Vt]), ls = u.useCallback(($, le, F) => {
    $ && Qt((me) => {
      const we = me[$] || Vt($), Ce = [...we.segments || []];
      let Ae = Ce.findIndex((Xe) => {
        const Ve = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, Ye = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0;
        return le > Ve && le < Ye;
      });
      if (Ae === -1 && (Ae = Ce.findIndex((Xe) => {
        const Ve = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, Ye = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0;
        return le >= Ve && le <= Ye;
      })), Ae === -1) return me;
      const he = Ce[Ae];
      return Ce[Ae] = { ...he, targetDisplayId: F, isManualOverride: !0 }, { ...me, [$]: { ...we, segments: Ce } };
    });
  }, [Vt]), Xs = u.useCallback(($, le) => {
    if (!$) return;
    const F = q.find((we) => we.id === $), me = F == null ? void 0 : F.directorPlan;
    Qt((we) => {
      var qt;
      const Ce = we[$] || Vt($), Ae = [...Ce.segments || []];
      let he = Ae.findIndex((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return le > en && le < Un;
      });
      if (he === -1 && (he = Ae.findIndex((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return le >= en && le <= Un;
      })), he === -1) return we;
      const Xe = Ae[he], Ve = Xe.startEpochMs ?? Xe.StartEpochMs ?? 0, Ye = Xe.endEpochMs ?? Xe.EndEpochMs ?? 0, et = (Ve + Ye) / 2, ot = (qt = me == null ? void 0 : me.segments) == null ? void 0 : qt.find((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return et >= en && et <= Un;
      }), bt = ot ? ot.targetDisplayId ?? ot.TargetDisplayId ?? "mon-0" : "mon-0";
      return Ae[he] = { ...Xe, targetDisplayId: bt, isManualOverride: !1 }, { ...we, [$]: { ...Ce, segments: Ae } };
    });
  }, [q, Vt]);
  u.useEffect(() => {
    if (!Ze || Ze.length === 0 || isNaN(f)) return;
    const $ = f + T, le = f + X;
    if (le <= $) return;
    const F = setTimeout(async () => {
      const me = Ze.filter((we) => {
        var Ae;
        return (we.displays || we.Displays || ((Ae = we.displayTopology) == null ? void 0 : Ae.displays) || []).length > 1;
      });
      if (me.length !== 0)
        for (const we of me)
          try {
            const Ce = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(we.id)}&startEpoch=${$}&endEpoch=${le}`);
            if (Ce.ok) {
              const Ae = await Ce.json();
              Ae != null && Ae.segments && Ae.segments.length > 0 && Qt((he) => {
                const Xe = he[we.id] || we.directorPlan, Ve = ((Xe == null ? void 0 : Xe.segments) || []).filter((et) => et.isManualOverride || et.IsManualOverride);
                if (Ve.length === 0)
                  return { ...he, [we.id]: Ae };
                const Ye = [...Ae.segments];
                return Ve.forEach((et) => {
                  const ot = et.startEpochMs ?? et.StartEpochMs, bt = et.endEpochMs ?? et.EndEpochMs;
                  for (let qt = Ye.length - 1; qt >= 0; qt--) {
                    const Ut = Ye[qt].startEpochMs ?? Ye[qt].StartEpochMs, en = Ye[qt].endEpochMs ?? Ye[qt].EndEpochMs;
                    if (!(en <= ot || Ut >= bt))
                      if (Ut >= ot && en <= bt)
                        Ye.splice(qt, 1);
                      else if (Ut < ot && en > bt) {
                        const Un = { ...Ye[qt], endEpochMs: ot }, Mr = { ...Ye[qt], startEpochMs: bt };
                        Ye.splice(qt, 1, Un, Mr);
                      } else Ut < ot ? Ye[qt].endEpochMs = ot : en > bt && (Ye[qt].startEpochMs = bt);
                  }
                  Ye.push(et);
                }), Ye.sort((et, ot) => (et.startEpochMs ?? et.StartEpochMs) - (ot.startEpochMs ?? ot.StartEpochMs)), { ...he, [we.id]: { ...Ae, segments: Ye } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(F);
  }, [T, X, Ze, f]);
  const Cs = u.useMemo(() => Ze.map(($) => ({
    ...$,
    directorPlan: ln[$.id] || $.directorPlan || Vt($.id)
  })), [Ze, ln, Vt]), mn = u.useMemo(() => Oe ? {
    ...Oe,
    directorPlan: ln[Oe.id] || Oe.directorPlan || Vt(Oe.id)
  } : null, [Oe, ln, Vt]), jr = u.useMemo(() => It ? {
    ...It,
    directorPlan: ln[It.id] || It.directorPlan || Vt(It.id)
  } : null, [It, ln, Vt]), yn = ($, le = 30) => {
    const F = Math.max(0, $), me = Math.floor(F / 1e3), we = Math.floor(me / 3600), Ce = Math.floor(me % 3600 / 60), Ae = me % 60, he = Math.floor(F % 1e3 / 1e3 * le), Xe = (Ve) => String(Ve).padStart(2, "0");
    return `${Xe(we)}:${Xe(Ce)}:${Xe(Ae)}.${Xe(he)}`;
  }, [wt, ps] = u.useState(!1), [Gn, Sr] = u.useState(!0), [Ao, Gs] = u.useState(!1), Te = u.useRef(null), Pe = u.useMemo(() => {
    var me;
    const $ = Le == null ? void 0 : Le.keyframes, le = ($ == null ? void 0 : $[Fe]) || ($ == null ? void 0 : $[0]);
    return (((me = le == null ? void 0 : le.layout) == null ? void 0 : me.placements) || (K == null ? void 0 : K.placements) || []).length > 0 || y && y.length > 0;
  }, [Le, Fe, K, y]), ms = u.useCallback(() => {
    Te.current && clearTimeout(Te.current), Sr(!0), Te.current = setTimeout(() => {
      Ao || Sr(!1);
    }, 2500);
  }, [Ao]);
  u.useEffect(() => {
    if (!wt) {
      Sr(!0), Te.current && clearTimeout(Te.current);
      return;
    }
    const $ = (le) => {
      le.clientY >= window.innerHeight - 280 && Sr(!0), ms();
    };
    return window.addEventListener("mousemove", $, { passive: !0 }), ms(), () => {
      window.removeEventListener("mousemove", $), Te.current && clearTimeout(Te.current);
    };
  }, [wt, ms]);
  const $o = u.useCallback(() => {
    ps(($) => {
      const le = !$;
      return le ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), le;
    });
  }, []), Ro = u.useCallback(() => {
    ps(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const $ = () => {
      !document.fullscreenElement && wt && ps(!1);
    };
    return document.addEventListener("fullscreenchange", $), () => document.removeEventListener("fullscreenchange", $);
  }, [wt]), py({
    activeStationId: C,
    spotlightStationId: w,
    timelineStations: Cs,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: wn,
    setPlaybackSpeed: At,
    playheadMs: qe,
    setPlayheadMs: xt,
    inPointMs: T,
    setInPointMs: J,
    outPointMs: X,
    setOutPointMs: ne,
    totalTimelineDurationMs: p,
    zoomLevel: De,
    togglePlaySmart: dn,
    onToggleHelpModal: () => Qe(($) => !$),
    onSplitDirectorAtPlayhead: () => {
      var le, F, me;
      const $ = C || (y.length === 1 ? y[0] : null);
      if ($) {
        const we = q.find((Ae) => Ae.id === $);
        (((le = we == null ? void 0 : we.displays) == null ? void 0 : le.length) > 1 || ((me = (F = we == null ? void 0 : we.topology) == null ? void 0 : F.displays) == null ? void 0 : me.length) > 1) && rs($, f + qe);
      }
    },
    isModalActive: xe || Ge || ht,
    hasGridPlacements: Pe,
    onToggleGridFullscreen: $o,
    isGridFullscreen: wt,
    onExitGridFullscreen: Ro
  }), u.useEffect(() => {
    const $ = f + T, le = f + X, F = f + qe;
    Op({
      timeRange: t,
      timeMode: r,
      inPointMs: T,
      outPointMs: X,
      playheadMs: Math.round(qe),
      inEpochMs: $,
      outEpochMs: le,
      playheadEpochMs: F,
      selectedStationIds: y,
      activeStationId: C,
      zoomLevel: De,
      viewportStartMs: st,
      isWorkspaceActive: Bt,
      isLooping: Gt,
      playbackSpeed: vt,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: _,
      compositionLayout: R,
      isAutoDirectorEnabled: re,
      isPipSwapped: O,
      audioRoutingPlan: Dt,
      isAutoFollowAudio: L,
      canvasLayoutTimeline: Le
    });
  }, [
    t,
    r,
    T,
    X,
    qe,
    y,
    C,
    De,
    st,
    Bt,
    Gt,
    vt,
    f,
    o,
    i,
    _,
    R,
    re,
    O,
    Dt,
    L,
    Le
  ]);
  const Lo = u.useCallback(($) => {
    var Ve, Ye;
    const le = Kl($.startTime), F = Kl($.endTime), me = Math.max(0, F - le) || 144e5, we = {
      start: $.startTime,
      end: $.endTime,
      durationMs: me,
      startEpochMs: le,
      endEpochMs: F
    }, Ce = Math.max(6e4, Math.round(me * 0.05)), Ae = le - Ce, he = me + 2 * Ce;
    if (n(we), $.inEpochMs && $.outEpochMs) {
      const et = Math.max(0, Math.min(he, $.inEpochMs - Ae)), ot = Math.max(et + 1e3, Math.min(he, $.outEpochMs - Ae)), bt = $.playheadEpochMs ? Math.max(0, Math.min(he, $.playheadEpochMs - Ae)) : et;
      J(et), ne(ot), xt(bt);
    } else {
      const et = typeof $.inPointMs == "number" ? $.inPointMs : Ce, ot = typeof $.outPointMs == "number" ? $.outPointMs : Ce + me, bt = typeof $.playheadMs == "number" ? $.playheadMs : et;
      J(Math.max(0, Math.min(he, et))), ne(Math.max(0, Math.min(he, ot))), xt(Math.max(0, Math.min(he, bt)));
    }
    const Xe = ((Ve = $.selectedStationIds) == null ? void 0 : Ve.length) > 0 ? $.selectedStationIds : ((Ye = $.cutStationIds) == null ? void 0 : Ye.length) > 0 ? $.cutStationIds : $.stationIds;
    if ((Xe == null ? void 0 : Xe.length) > 0) {
      j(Xe);
      const et = $.spotlightStationId || $.SpotlightStationId || null, ot = $.activeStationId || $.ActiveStationId || null;
      et && Xe.includes(et) ? (P(et), g(et)) : ot && Xe.includes(ot) ? (P(ot), g(null)) : (P(null), g(null));
    }
    $.keystrokeMode && a($.keystrokeMode), Ot(!0), Et(!1);
  }, []), ii = u.useCallback(($) => {
    const le = $.startEpochMs || Kl($.start, null, r), F = $.endEpochMs || Kl($.end, null, r), me = Math.max(0, F - le) || 144e5, we = Math.max(6e4, Math.round(me * 0.05)), Ce = le - we, Ae = me + 2 * we;
    n({
      ...$,
      startEpochMs: le,
      endEpochMs: F,
      durationMs: me
    }), A(!1), J(we), ne(we + me), xt(we), Me((he) => {
      if (!(he != null && he.keyframes) || he.keyframes.length === 0) return he;
      const Xe = he.keyframes.map((Ve, Ye) => Ye === 0 ? { ...Ve, timestampEpochMs: Ce } : Ve).filter((Ve) => Ve.timestampEpochMs >= Ce && Ve.timestampEpochMs <= Ce + Ae);
      return { ...he, keyframes: Xe };
    }), U((he) => {
      if (!(he != null && he.segments) || he.segments.length === 0) return he;
      if (!he.segments.some((Ve) => {
        const Ye = Ve.startEpochMs ?? Ve.StartEpochMs ?? 0;
        return (Ve.endEpochMs ?? Ve.EndEpochMs ?? 0) > Ce && Ye < Ce + Ae;
      })) {
        const Ve = y[0] || C || "station-0";
        return {
          segments: [
            {
              startEpochMs: Ce,
              endEpochMs: Ce + Ae,
              sourceStationId: Ve
            }
          ]
        };
      }
      return he;
    }), Qt({});
  }, [r, y, C]), Ls = u.useCallback(() => {
    if (Ze.map((le) => le.id).length === 0) return alert("No active stations selected in timeline.");
    Z(!0);
  }, [Ze]), vn = u.useCallback(async ($, le, F = "") => {
    var he, Xe, Ve, Ye;
    const me = Ze.map((et) => et.id);
    if (me.length === 0) return;
    let we = $ === "None" ? "None" : "BurnIn";
    const Ce = le || "NATIVE", Ae = ((he = mn == null ? void 0 : mn.displays) == null ? void 0 : he.length) > 1 || ((Ve = (Xe = mn == null ? void 0 : mn.topology) == null ? void 0 : Xe.displays) == null ? void 0 : Ve.length) > 1 ? ((Ye = mn == null ? void 0 : mn.directorPlan) == null ? void 0 : Ye.segments) || [] : [];
    try {
      const et = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Yp(),
          notes: (F || "").trim(),
          stationIds: me,
          inEpochMs: f + T,
          outEpochMs: f + X,
          keystrokeMode: we,
          resolution: Ce,
          videoQuality: Ce,
          compositionScope: _,
          layoutMode: "canvas",
          canvasLayout: K,
          canvasLayoutTimeline: Le,
          isPipSwapped: O,
          isAutoDirectorEnabled: re,
          directorSegments: Ae,
          audioRoutingSegments: Dt.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!et.ok) throw new Error(`HTTP ${et.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (et) {
      console.error("[Studio] Export failed:", et), alert("Failed to launch background master MP4 export job.");
    }
  }, [Ze, f, T, X, _, K, Le, O, re, mn, Dt]), hn = u.useCallback(() => {
    Hg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const $ = mh(), le = Math.max(6e4, Math.round($.durationMs * 0.05));
    n($), J(le), ne(le + $.durationMs), xt(le), j([]), P(null), g(null), Re(!1), At(1), a("BURN_IN"), rt(), Ot(!1), Et(!0);
  }, [rt, Re, At, xt]), fn = !Bt || y.length === 0, cn = f + qe;
  return u.useEffect(() => {
    const $ = Le == null ? void 0 : Le.keyframes;
    if (!$ || $.length === 0) return;
    let le = 0;
    for (let F = 0; F < $.length && $[F].timestampEpochMs <= cn + 50; F++)
      le = F;
    le !== Fe && ge(le);
  }, [cn, Le == null ? void 0 : Le.keyframes, Fe]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Bg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: C,
          hideBackToGrid: Ze.length <= 1,
          onResetActiveStation: () => wn(null),
          onOpenRangeModal: () => Ue(!0),
          onOpenBookmarksModal: () => at(!0),
          onOpenHelpModal: () => Qe(!0),
          onToggleDrawer: () => Et(!Nt),
          isInitialSetup: fn,
          selectedCount: y.length,
          totalCount: q.length,
          onResetStudio: hn
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${wt ? "cinema-fullscreen-mode" : ""}`, children: [
        wt && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${Gn ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: Ro,
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
                onClick: () => Qe(!0),
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
              Cs.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !fn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              ux,
              {
                activeStation: mn,
                timelineStations: Cs,
                allStations: q,
                onSelectActiveStation: wn,
                onOpenSpotlight: Bn,
                onStationContextMenu: nt,
                onDeselectStation: We,
                stationAutoDirectorMap: Ee,
                onToggleStationAutoDirector: Be,
                onOpenDrawer: () => Et(!0),
                baseEpochMs: f,
                playheadMs: qe,
                playheadEpochMs: cn,
                timeMode: r,
                isPlaying: kt ? !1 : ze,
                setIsPlaying: Re,
                totalDurationMs: p,
                inPointMs: T,
                outPointMs: X,
                setPlayheadMs: xt,
                globalGaps: S,
                recordingSegments: Q,
                playbackSpeed: vt,
                onChangePlaybackSpeed: At,
                keystrokeMode: o,
                keystrokes: an,
                directorPlan: mn == null ? void 0 : mn.directorPlan,
                onOverrideDisplay: ls,
                onResetOverride: Xs,
                compositionScope: _,
                onChangeCompositionScope: z,
                compositionLayout: R,
                onChangeCompositionLayout: oe,
                isAutoDirectorEnabled: re,
                onToggleAutoDirector: () => G(($) => !$),
                isPipSwapped: O,
                onTogglePipSwap: () => H(($) => !$),
                onUpdateCanvasLayout: Ie,
                canvasLayoutTimeline: Le,
                onUpdateCanvasLayoutTimeline: Me,
                activeKfIndex: Fe,
                setActiveKfIndex: ge,
                isModalOpen: te || xe || Ge || kt || ht,
                isGridFullscreen: wt,
                onToggleGridFullscreen: $o
              }
            ),
            !wt && /* @__PURE__ */ s.jsx(
              Hc,
              {
                hasGridPlacements: Pe,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: qe,
                setPlayheadMs: xt,
                inPointMs: T,
                setInPointMs: J,
                outPointMs: X,
                setOutPointMs: ne,
                activeStationId: C,
                isPlaying: ze,
                setIsPlaying: dn,
                isLooping: Gt,
                setIsLooping: Kt,
                playbackSpeed: vt,
                onChangeSpeed: At,
                onSetInPoint: () => J(Math.max(0, Math.min(qe, X - 1e3))),
                onSetOutPoint: () => ne(Math.min(p, Math.max(qe, T + 1e3))),
                onStepFrameBackward: () => {
                  Re(!1), xt(($) => Math.max(0, $ - 33));
                },
                onStepFrameForward: () => {
                  Re(!1), xt(($) => Math.min(p, $ + 33));
                }
              }
            )
          ] }),
          wt && /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "cinema-bottom-sensor-strip",
              onMouseEnter: () => {
                Sr(!0), ms();
              }
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `studio-bottom-timeline ${wt ? "cinema-timeline-island" : ""} ${wt && !Gn ? "dock-hidden" : ""} ${wt && ze ? "is-playing-dimmed" : ""}`,
              ref: Lt,
              onMouseEnter: () => Gs(!0),
              onMouseLeave: () => {
                Gs(!1), wt && ms();
              },
              children: [
                wt && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: yn(X - T) })
                    ] }),
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "btn-export-cut-hero",
                        onClick: Ls,
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
                    Hc,
                    {
                      hasGridPlacements: Pe,
                      baseEpochMs: f,
                      timeMode: r,
                      totalDurationMs: p,
                      playheadMs: qe,
                      setPlayheadMs: xt,
                      inPointMs: T,
                      setInPointMs: J,
                      outPointMs: X,
                      setOutPointMs: ne,
                      activeStationId: C,
                      isPlaying: ze,
                      setIsPlaying: dn,
                      isLooping: Gt,
                      setIsLooping: Kt,
                      playbackSpeed: vt,
                      onChangeSpeed: At,
                      onSetInPoint: () => J(Math.max(0, Math.min(qe, X - 1e3))),
                      onSetOutPoint: () => ne(Math.min(p, Math.max(qe, T + 1e3))),
                      onStepFrameBackward: () => {
                        Re(!1), xt(($) => Math.max(0, $ - 33));
                      },
                      onStepFrameForward: () => {
                        Re(!1), xt(($) => Math.min(p, $ + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(f + qe, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  Hp,
                  {
                    stations: Cs,
                    activeStationId: C,
                    onSelectActiveStation: ($) => wn(y.length <= 1 ? $ : $ === C ? null : $),
                    onStationContextMenu: nt,
                    onDeselectStation: We,
                    stationAutoDirectorMap: Ee,
                    onToggleStationAutoDirector: Be,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: De,
                    onZoomChange: $e,
                    onZoomReset: rt,
                    onFitRange: V,
                    onJumpViewportTo: fe,
                    playheadMs: qe,
                    setPlayheadMs: xt,
                    inPointMs: T,
                    setInPointMs: J,
                    outPointMs: X,
                    setOutPointMs: ne,
                    viewportStartMs: st,
                    onViewportStartChange: ue,
                    onExport: Ls,
                    recordingSegments: Q,
                    movieBoundaries: Je,
                    onEstimateLoaded: ($) => ($ == null ? void 0 : $.removedGlobalGaps) && M($.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: an,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c(($) => !$),
                    onSplitDirectorSegment: rs,
                    onChangeDirectorSegmentDisplay: ls,
                    onResetDirectorSegmentToAuto: Xs,
                    audioRoutingPlan: Dt,
                    onSplitAudioSegment: Rs,
                    onChangeAudioSegmentStation: Ys,
                    onChangeAudioSegmentGain: Zt,
                    onFollowVisualFeed: $n,
                    isAutoFollowAudio: L,
                    canvasLayoutTimeline: Le,
                    activeKfIndex: Fe,
                    onSelectKeyframe: ($, le) => {
                      ge($), xt(Math.max(0, le - f));
                    },
                    onAddKeyframeAtEpoch: Se,
                    onDeleteKeyframe: pt,
                    onUpdateKeyframeEpoch: ce,
                    onUpdateKeyframeTransition: tt,
                    onToggleDisplayOnCanvas: lt,
                    onUpdateAudioPlan: U
                  }
                )
              ]
            }
          )
        ] }),
        !wt && /* @__PURE__ */ s.jsx(
          Qx,
          {
            isOpen: Nt || fn,
            onToggle: () => Et(!Nt),
            onClose: () => Et(!1),
            allStations: q,
            selectedStationIds: y,
            onToggleStation: ($) => j((le) => le.includes($) ? le.filter((F) => F !== $) : [...le, $]),
            onUpdateSelections: j,
            isInitialSetup: fn,
            isLoadingStations: de,
            recordingSegments: Q,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (P(null), g(null), Ot(!0), Et(!1));
            },
            onOpenRangeModal: () => Ue(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      qx,
      {
        isOpen: xe,
        onClose: () => Ue(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: Lo,
        onApplyRange: ii
      }
    ),
    /* @__PURE__ */ s.jsx(
      ty,
      {
        isOpen: Ge,
        onClose: () => at(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: qe,
          inPointMs: T,
          outPointMs: X,
          selectedStationIds: y,
          selectedStationNames: q.filter(($) => y.includes($.id)).map(($) => $.displayName || $.hostname || $.id),
          allStationIds: q.map(($) => $.id),
          activeStationId: C,
          activeStationName: (Oe == null ? void 0 : Oe.displayName) || (Oe == null ? void 0 : Oe.hostname) || null,
          spotlightStationId: w,
          keystrokeMode: o
        },
        onLoadBookmark: Lo
      }
    ),
    /* @__PURE__ */ s.jsx(
      Xp,
      {
        isOpen: ht,
        onClose: () => Qe(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      ay,
      {
        isOpen: kt,
        station: jr,
        initialDisplayId: x,
        allStations: Cs,
        onSelectStation: ($) => {
          $ !== w && At(1), P($), g($);
        },
        onClose: $s,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: De,
        onZoomChange: $e,
        onZoomReset: rt,
        onFitRange: V,
        onJumpViewportTo: fe,
        viewportStartMs: st,
        onViewportStartChange: ue,
        playheadMs: qe,
        setPlayheadMs: xt,
        playheadEpochMs: cn,
        inPointMs: T,
        setInPointMs: J,
        outPointMs: X,
        setOutPointMs: ne,
        recordingSegments: Q,
        globalGaps: S,
        isPlaying: ze,
        setIsPlaying: Re,
        isLooping: Gt,
        setIsLooping: Kt,
        playbackSpeed: vt,
        setPlaybackSpeed: At,
        onExport: Ls,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: an,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c(($) => !$),
        directorPlan: jr == null ? void 0 : jr.directorPlan,
        onOverrideDisplay: ls,
        onSplitDirectorSegment: rs,
        onChangeDirectorSegmentDisplay: ls,
        onResetDirectorSegmentToAuto: Xs
      }
    ),
    /* @__PURE__ */ s.jsx(
      iy,
      {
        menu: k,
        onClose: () => N(null),
        onDeselect: We,
        onFocusSolo: wn
      }
    ),
    /* @__PURE__ */ s.jsx(
      cy,
      {
        isOpen: te,
        onClose: () => Z(!1),
        onConfirm: vn,
        compositionSummary: {
          scope: _,
          layout: (K == null ? void 0 : K.preset) || R,
          isPipSwapped: O,
          isAutoDirectorEnabled: re,
          stationsCount: Ze.length,
          audioSegmentsCount: ((Rl = Dt == null ? void 0 : Dt.segments) == null ? void 0 : Rl.length) || 1,
          resolution: (Le == null ? void 0 : Le.resolution) || "NATIVE",
          canvasWidth: (K == null ? void 0 : K.width) || 1920,
          canvasHeight: (K == null ? void 0 : K.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Gp, {})
  ] });
}
const gh = "itb-extractor-advanced-theme", xh = "itb-global-export-job-monitor-root";
function Qp() {
  if (!(typeof document > "u") && !document.getElementById(gh)) {
    const e = document.createElement("link");
    e.id = gh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Qp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(xh);
  if (!t) {
    t = document.createElement("div"), t.id = xh, document.body.appendChild(t);
    try {
      ya.createRoot(t).render(So.createElement(Gp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function gy(e, t = {}) {
  Qp();
  const n = ya.createRoot(e);
  return n.render(So.createElement(my, t)), () => {
    n.unmount();
  };
}
export {
  Gp as ExportJobMonitor,
  my as ExtractorAdvancedStudio,
  my as default,
  gy as mount
};
