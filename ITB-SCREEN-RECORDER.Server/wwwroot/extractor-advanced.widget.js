function im(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yh = { exports: {} }, St = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Co = Symbol.for("react.element"), cm = Symbol.for("react.portal"), um = Symbol.for("react.fragment"), dm = Symbol.for("react.strict_mode"), hm = Symbol.for("react.profiler"), fm = Symbol.for("react.provider"), pm = Symbol.for("react.context"), mm = Symbol.for("react.forward_ref"), gm = Symbol.for("react.suspense"), xm = Symbol.for("react.memo"), ym = Symbol.for("react.lazy"), Xu = Symbol.iterator;
function vm(e) {
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
var Gu = Array.isArray, Eh = Object.prototype.hasOwnProperty, Xc = { current: null }, jh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ch(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) Eh.call(t, r) && !jh.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Co, type: e, key: o, ref: a, props: l, _owner: Xc.current };
}
function Nm(e, t) {
  return { $$typeof: Co, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Gc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Co;
}
function km(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Qu = /\/+/g;
function fi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? km("" + e.key) : t.toString(36);
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
        case Co:
        case cm:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + fi(a, 0) : r, Gu(l) ? (n = "", e != null && (n = e.replace(Qu, "$&/") + "/"), ra(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Gc(l) && (l = Nm(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Qu, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Gu(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + fi(o, i);
    a += ra(o, t, n, c, l);
  }
  else if (c = vm(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + fi(o, i++), a += ra(o, t, n, c, l);
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
function wm(e) {
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
var _n = { current: null }, la = { transition: null }, Em = { ReactCurrentDispatcher: _n, ReactCurrentBatchConfig: la, ReactCurrentOwner: Xc };
function Sh() {
  throw Error("act(...) is not supported in production builds of React.");
}
St.Children = { map: Po, forEach: function(e, t, n) {
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
St.Component = Tl;
St.Fragment = um;
St.Profiler = hm;
St.PureComponent = Vc;
St.StrictMode = dm;
St.Suspense = gm;
St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Em;
St.act = Sh;
St.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Nh({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = Xc.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) Eh.call(t, c) && !jh.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    i = Array(c);
    for (var d = 0; d < c; d++) i[d] = arguments[d + 2];
    r.children = i;
  }
  return { $$typeof: Co, type: e.type, key: l, ref: o, props: r, _owner: a };
};
St.createContext = function(e) {
  return e = { $$typeof: pm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: fm, _context: e }, e.Consumer = e;
};
St.createElement = Ch;
St.createFactory = function(e) {
  var t = Ch.bind(null, e);
  return t.type = e, t;
};
St.createRef = function() {
  return { current: null };
};
St.forwardRef = function(e) {
  return { $$typeof: mm, render: e };
};
St.isValidElement = Gc;
St.lazy = function(e) {
  return { $$typeof: ym, _payload: { _status: -1, _result: e }, _init: wm };
};
St.memo = function(e, t) {
  return { $$typeof: xm, type: e, compare: t === void 0 ? null : t };
};
St.startTransition = function(e) {
  var t = la.transition;
  la.transition = {};
  try {
    e();
  } finally {
    la.transition = t;
  }
};
St.unstable_act = Sh;
St.useCallback = function(e, t) {
  return _n.current.useCallback(e, t);
};
St.useContext = function(e) {
  return _n.current.useContext(e);
};
St.useDebugValue = function() {
};
St.useDeferredValue = function(e) {
  return _n.current.useDeferredValue(e);
};
St.useEffect = function(e, t) {
  return _n.current.useEffect(e, t);
};
St.useId = function() {
  return _n.current.useId();
};
St.useImperativeHandle = function(e, t, n) {
  return _n.current.useImperativeHandle(e, t, n);
};
St.useInsertionEffect = function(e, t) {
  return _n.current.useInsertionEffect(e, t);
};
St.useLayoutEffect = function(e, t) {
  return _n.current.useLayoutEffect(e, t);
};
St.useMemo = function(e, t) {
  return _n.current.useMemo(e, t);
};
St.useReducer = function(e, t, n) {
  return _n.current.useReducer(e, t, n);
};
St.useRef = function(e) {
  return _n.current.useRef(e);
};
St.useState = function(e) {
  return _n.current.useState(e);
};
St.useSyncExternalStore = function(e, t, n) {
  return _n.current.useSyncExternalStore(e, t, n);
};
St.useTransition = function() {
  return _n.current.useTransition();
};
St.version = "18.3.1";
yh.exports = St;
var u = yh.exports;
const So = /* @__PURE__ */ im(u);
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
  function t(b, W) {
    var O = b.length;
    b.push(W);
    e: for (; 0 < O; ) {
      var H = O - 1 >>> 1, R = b[H];
      if (0 < l(R, W)) b[H] = W, b[O] = R, O = H;
      else break e;
    }
  }
  function n(b) {
    return b.length === 0 ? null : b[0];
  }
  function r(b) {
    if (b.length === 0) return null;
    var W = b[0], O = b.pop();
    if (O !== W) {
      b[0] = O;
      e: for (var H = 0, R = b.length, oe = R >>> 1; H < oe; ) {
        var te = 2 * (H + 1) - 1, Z = b[te], Y = te + 1, Re = b[Y];
        if (0 > l(Z, O)) Y < R && 0 > l(Re, Z) ? (b[H] = Re, b[Y] = O, H = Y) : (b[H] = Z, b[te] = O, H = te);
        else if (Y < R && 0 > l(Re, O)) b[H] = Re, b[Y] = O, H = Y;
        else break e;
      }
    }
    return W;
  }
  function l(b, W) {
    var O = b.sortIndex - W.sortIndex;
    return O !== 0 ? O : b.id - W.id;
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
  var c = [], d = [], v = 1, f = null, p = 3, y = !1, S = !1, C = !1, _ = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function x(b) {
    for (var W = n(d); W !== null; ) {
      if (W.callback === null) r(d);
      else if (W.startTime <= b) r(d), W.sortIndex = W.expirationTime, t(c, W);
      else break;
      W = n(d);
    }
  }
  function I(b) {
    if (C = !1, x(b), !S) if (n(c) !== null) S = !0, se(j);
    else {
      var W = n(d);
      W !== null && V(I, W.startTime - b);
    }
  }
  function j(b, W) {
    S = !1, C && (C = !1, w(A), A = -1), y = !0;
    var O = p;
    try {
      for (x(W), f = n(c); f !== null && (!(f.expirationTime > W) || b && !P()); ) {
        var H = f.callback;
        if (typeof H == "function") {
          f.callback = null, p = f.priorityLevel;
          var R = H(f.expirationTime <= W);
          W = e.unstable_now(), typeof R == "function" ? f.callback = R : f === n(c) && r(c), x(W);
        } else r(c);
        f = n(c);
      }
      if (f !== null) var oe = !0;
      else {
        var te = n(d);
        te !== null && V(I, te.startTime - W), oe = !1;
      }
      return oe;
    } finally {
      f = null, p = O, y = !1;
    }
  }
  var M = !1, h = null, A = -1, k = 5, N = -1;
  function P() {
    return !(e.unstable_now() - N < k);
  }
  function z() {
    if (h !== null) {
      var b = e.unstable_now();
      N = b;
      var W = !0;
      try {
        W = h(!0, b);
      } finally {
        W ? $() : (M = !1, h = null);
      }
    } else M = !1;
  }
  var $;
  if (typeof g == "function") $ = function() {
    g(z);
  };
  else if (typeof MessageChannel < "u") {
    var U = new MessageChannel(), le = U.port2;
    U.port1.onmessage = z, $ = function() {
      le.postMessage(null);
    };
  } else $ = function() {
    _(z, 0);
  };
  function se(b) {
    h = b, M || (M = !0, $());
  }
  function V(b, W) {
    A = _(function() {
      b(e.unstable_now());
    }, W);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(b) {
    b.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, se(j));
  }, e.unstable_forceFrameRate = function(b) {
    0 > b || 125 < b ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : k = 0 < b ? Math.floor(1e3 / b) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(b) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var W = 3;
        break;
      default:
        W = p;
    }
    var O = p;
    p = W;
    try {
      return b();
    } finally {
      p = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(b, W) {
    switch (b) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        b = 3;
    }
    var O = p;
    p = b;
    try {
      return W();
    } finally {
      p = O;
    }
  }, e.unstable_scheduleCallback = function(b, W, O) {
    var H = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? H + O : H) : O = H, b) {
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
    return R = O + R, b = { id: v++, callback: W, priorityLevel: b, startTime: O, expirationTime: R, sortIndex: -1 }, O > H ? (b.sortIndex = O, t(d, b), n(c) === null && b === n(d) && (C ? (w(A), A = -1) : C = !0, V(I, O - H))) : (b.sortIndex = R, t(c, b), S || y || (S = !0, se(j))), b;
  }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(b) {
    var W = p;
    return function() {
      var O = p;
      p = W;
      try {
        return b.apply(this, arguments);
      } finally {
        p = O;
      }
    };
  };
})(Ih);
bh.exports = Ih;
var jm = bh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cm = u, ts = jm;
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
var Ws = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vi = Object.prototype.hasOwnProperty, Sm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ju = {}, Zu = {};
function Mm(e) {
  return Vi.call(Zu, e) ? !0 : Vi.call(Ju, e) ? !1 : Sm.test(e) ? Zu[e] = !0 : (Ju[e] = !0, !1);
}
function bm(e, t, n, r) {
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
function Im(e, t, n, r) {
  if (t === null || typeof t > "u" || bm(e, t, n, r)) return !0;
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
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Im(t, n, l, r) && (n = null), r || l === null ? Mm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vs = Cm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _o = Symbol.for("react.element"), tl = Symbol.for("react.portal"), nl = Symbol.for("react.fragment"), qc = Symbol.for("react.strict_mode"), Yi = Symbol.for("react.profiler"), Ah = Symbol.for("react.provider"), $h = Symbol.for("react.context"), eu = Symbol.for("react.forward_ref"), Xi = Symbol.for("react.suspense"), Gi = Symbol.for("react.suspense_list"), tu = Symbol.for("react.memo"), sr = Symbol.for("react.lazy"), Rh = Symbol.for("react.offscreen"), qu = Symbol.iterator;
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
function Tm(e) {
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
function Am(e) {
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
function $m(e) {
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
  e._valueTracker || (e._valueTracker = $m(e));
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
}, Rm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Jl).forEach(function(e) {
  Rm.forEach(function(t) {
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
var Lm = rn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function nc(e, t) {
  if (t) {
    if (Lm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ke(137, e));
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
function Om(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Zl = !1, Na = null, ka = !1, ac = null, Dm = { onError: function(e) {
  Zl = !0, Na = e;
} };
function Pm(e, t, n, r, l, o, a, i, c) {
  Zl = !1, Na = null, Om.apply(Dm, arguments);
}
function _m(e, t, n, r, l, o, a, i, c) {
  if (Pm.apply(this, arguments), Zl) {
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
function Fm(e) {
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
  return e = Fm(e), e !== null ? Gh(e) : null;
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
var Qh = ts.unstable_scheduleCallback, od = ts.unstable_cancelCallback, Bm = ts.unstable_shouldYield, Um = ts.unstable_requestPaint, un = ts.unstable_now, Wm = ts.unstable_getCurrentPriorityLevel, su = ts.unstable_ImmediatePriority, Jh = ts.unstable_UserBlockingPriority, wa = ts.unstable_NormalPriority, zm = ts.unstable_LowPriority, Zh = ts.unstable_IdlePriority, Va = null, Is = null;
function Hm(e) {
  if (Is && typeof Is.onCommitFiberRoot == "function") try {
    Is.onCommitFiberRoot(Va, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ks = Math.clz32 ? Math.clz32 : Ym, Km = Math.log, Vm = Math.LN2;
function Ym(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Km(e) / Vm | 0) | 0;
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
function Xm(e, t) {
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
function Gm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - ks(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = Xm(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
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
function Qm(e, t) {
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
var tf, lu, nf, sf, rf, cc = !1, zo = [], hr = null, fr = null, pr = null, co = /* @__PURE__ */ new Map(), uo = /* @__PURE__ */ new Map(), ar = [], Jm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
function Zm(e, t, n, r, l) {
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
function qm() {
  cc = !1, hr !== null && oa(hr) && (hr = null), fr !== null && oa(fr) && (fr = null), pr !== null && oa(pr) && (pr = null), co.forEach(id), uo.forEach(id);
}
function _l(e, t) {
  e.blockedOn === t && (e.blockedOn = null, cc || (cc = !0, ts.unstable_scheduleCallback(ts.unstable_NormalPriority, qm)));
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
var xl = Vs.ReactCurrentBatchConfig, ja = !0;
function e0(e, t, n, r) {
  var l = Ft, o = xl.transition;
  xl.transition = null;
  try {
    Ft = 1, ou(e, t, n, r);
  } finally {
    Ft = l, xl.transition = o;
  }
}
function t0(e, t, n, r) {
  var l = Ft, o = xl.transition;
  xl.transition = null;
  try {
    Ft = 4, ou(e, t, n, r);
  } finally {
    Ft = l, xl.transition = o;
  }
}
function ou(e, t, n, r) {
  if (ja) {
    var l = uc(e, t, n, r);
    if (l === null) bi(e, t, r, Ca, n), ad(e, r);
    else if (Zm(l, e, t, n, r)) r.stopPropagation();
    else if (ad(e, r), t & 4 && -1 < Jm.indexOf(e)) {
      for (; l !== null; ) {
        var o = Io(l);
        if (o !== null && tf(o), o = uc(e, t, n, r), o === null && bi(e, t, r, Ca, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else bi(e, t, r, null, n);
  }
}
var Ca = null;
function uc(e, t, n, r) {
  if (Ca = null, e = nu(r), e = Lr(e), e !== null) if (t = Xr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Yh(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ca = e, null;
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
      switch (Wm()) {
        case su:
          return 1;
        case Jh:
          return 4;
        case wa:
        case zm:
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
}, defaultPrevented: 0, isTrusted: 0 }, iu = ss(Al), bo = rn({}, Al, { view: 0, detail: 0 }), n0 = ss(bo), vi, Ni, Fl, Ya = rn({}, bo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Fl && (Fl && e.type === "mousemove" ? (vi = e.screenX - Fl.screenX, Ni = e.screenY - Fl.screenY) : Ni = vi = 0, Fl = e), vi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ni;
} }), ud = ss(Ya), s0 = rn({}, Ya, { dataTransfer: 0 }), r0 = ss(s0), l0 = rn({}, bo, { relatedTarget: 0 }), ki = ss(l0), o0 = rn({}, Al, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), a0 = ss(o0), i0 = rn({}, Al, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), c0 = ss(i0), u0 = rn({}, Al, { data: 0 }), dd = ss(u0), d0 = {
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
}, h0 = {
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
}, f0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function p0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = f0[e]) ? !!t[e] : !1;
}
function cu() {
  return p0;
}
var m0 = rn({}, bo, { key: function(e) {
  if (e.key) {
    var t = d0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ia(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cu, charCode: function(e) {
  return e.type === "keypress" ? ia(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ia(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), g0 = ss(m0), x0 = rn({}, Ya, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hd = ss(x0), y0 = rn({}, bo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cu }), v0 = ss(y0), N0 = rn({}, Al, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), k0 = ss(N0), w0 = rn({}, Ya, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), E0 = ss(w0), j0 = [9, 13, 27, 32], uu = Ws && "CompositionEvent" in window, ql = null;
Ws && "documentMode" in document && (ql = document.documentMode);
var C0 = Ws && "TextEvent" in window && !ql, cf = Ws && (!uu || ql && 8 < ql && 11 >= ql), fd = " ", pd = !1;
function uf(e, t) {
  switch (e) {
    case "keyup":
      return j0.indexOf(t.keyCode) !== -1;
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
function S0(e, t) {
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
function M0(e, t) {
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
var b0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function md(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!b0[e.type] : t === "textarea";
}
function hf(e, t, n, r) {
  Wh(r), t = Sa(t, "onChange"), 0 < t.length && (n = new iu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var eo = null, fo = null;
function I0(e) {
  Ef(e, 0);
}
function Xa(e) {
  var t = ol(e);
  if (Oh(t)) return e;
}
function T0(e, t) {
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
    hf(t, fo, e, nu(e)), Vh(I0, t);
  }
}
function A0(e, t, n) {
  e === "focusin" ? (xd(), eo = t, fo = n, eo.attachEvent("onpropertychange", pf)) : e === "focusout" && xd();
}
function $0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xa(fo);
}
function R0(e, t) {
  if (e === "click") return Xa(t);
}
function L0(e, t) {
  if (e === "input" || e === "change") return Xa(t);
}
function O0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Es = typeof Object.is == "function" ? Object.is : O0;
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
function D0(e) {
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
var P0 = Ws && "documentMode" in document && 11 >= document.documentMode, rl = null, dc = null, to = null, hc = !1;
function Nd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  hc || rl == null || rl !== va(r) || (r = rl, "selectionStart" in r && du(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), to && po(to, r) || (to = r, r = Sa(dc, "onSelect"), 0 < r.length && (t = new iu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = rl)));
}
function Ko(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ll = { animationend: Ko("Animation", "AnimationEnd"), animationiteration: Ko("Animation", "AnimationIteration"), animationstart: Ko("Animation", "AnimationStart"), transitionend: Ko("Transition", "TransitionEnd") }, ji = {}, xf = {};
Ws && (xf = document.createElement("div").style, "AnimationEvent" in window || (delete ll.animationend.animation, delete ll.animationiteration.animation, delete ll.animationstart.animation), "TransitionEvent" in window || delete ll.transitionend.transition);
function Ga(e) {
  if (ji[e]) return ji[e];
  if (!ll[e]) return e;
  var t = ll[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in xf) return ji[e] = t[n];
  return e;
}
var yf = Ga("animationend"), vf = Ga("animationiteration"), Nf = Ga("animationstart"), kf = Ga("transitionend"), wf = /* @__PURE__ */ new Map(), kd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wr(e, t) {
  wf.set(e, t), Yr(t, [e]);
}
for (var Ci = 0; Ci < kd.length; Ci++) {
  var Si = kd[Ci], _0 = Si.toLowerCase(), F0 = Si[0].toUpperCase() + Si.slice(1);
  wr(_0, "on" + F0);
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
var Gl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), B0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Gl));
function wd(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, _m(r, t, void 0, e), e.currentTarget = null;
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
  n.has(r) || (jf(t, e, 2, !1), n.add(r));
}
function Mi(e, t, n) {
  var r = 0;
  t && (r |= 4), jf(n, e, r, t);
}
var Vo = "_reactListening" + Math.random().toString(36).slice(2);
function mo(e) {
  if (!e[Vo]) {
    e[Vo] = !0, Th.forEach(function(n) {
      n !== "selectionchange" && (B0.has(n) || Mi(n, !1, e), Mi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Vo] || (t[Vo] = !0, Mi("selectionchange", !1, t));
  }
}
function jf(e, t, n, r) {
  switch (of(t)) {
    case 1:
      var l = e0;
      break;
    case 4:
      l = t0;
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
        var y = iu, S = e;
        switch (e) {
          case "keypress":
            if (ia(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = g0;
            break;
          case "focusin":
            S = "focus", y = ki;
            break;
          case "focusout":
            S = "blur", y = ki;
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
            y = r0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = v0;
            break;
          case yf:
          case vf:
          case Nf:
            y = a0;
            break;
          case kf:
            y = k0;
            break;
          case "scroll":
            y = n0;
            break;
          case "wheel":
            y = E0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = c0;
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
        var C = (t & 4) !== 0, _ = !C && e === "scroll", w = C ? p !== null ? p + "Capture" : null : p;
        C = [];
        for (var g = d, x; g !== null; ) {
          x = g;
          var I = x.stateNode;
          if (x.tag === 5 && I !== null && (x = I, w !== null && (I = io(g, w), I != null && C.push(go(g, I, x)))), _) break;
          g = g.return;
        }
        0 < C.length && (p = new y(p, S, null, n, v), f.push({ event: p, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== rc && (S = n.relatedTarget || n.fromElement) && (Lr(S) || S[zs])) break e;
        if ((y || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? Lr(S) : null, S !== null && (_ = Xr(S), S !== _ || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (C = ud, I = "onMouseLeave", w = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (C = hd, I = "onPointerLeave", w = "onPointerEnter", g = "pointer"), _ = y == null ? p : ol(y), x = S == null ? p : ol(S), p = new C(I, g + "leave", y, n, v), p.target = _, p.relatedTarget = x, I = null, Lr(v) === d && (C = new C(w, g + "enter", S, n, v), C.target = x, C.relatedTarget = _, I = C), _ = I, y && S) t: {
            for (C = y, w = S, g = 0, x = C; x; x = Gr(x)) g++;
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
          y !== null && Ed(f, p, y, C, !1), S !== null && _ !== null && Ed(f, _, S, C, !0);
        }
      }
      e: {
        if (p = d ? ol(d) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var j = T0;
        else if (md(p)) if (ff) j = L0;
        else {
          j = $0;
          var M = A0;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (j = R0);
        if (j && (j = j(e, d))) {
          hf(f, j, n, v);
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
          if (P0) break;
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
      A && (cf && n.locale !== "ko" && (sl || A !== "onCompositionStart" ? A === "onCompositionEnd" && sl && (h = af()) : (ur = v, au = "value" in ur ? ur.value : ur.textContent, sl = !0)), M = Sa(d, A), 0 < M.length && (A = new dd(A, e, null, n, v), f.push({ event: A, listeners: M }), h ? A.data = h : (h = df(n), h !== null && (A.data = h)))), (h = C0 ? S0(e, n) : M0(e, n)) && (d = Sa(d, "onBeforeInput"), 0 < d.length && (v = new dd("onBeforeInput", "beforeinput", null, n, v), f.push({ event: v, listeners: d }), v.data = h));
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
var U0 = /\r\n?/g, W0 = /\u0000|\uFFFD/g;
function jd(e) {
  return (typeof e == "string" ? e : "" + e).replace(U0, `
`).replace(W0, "");
}
function Yo(e, t, n) {
  if (t = jd(t), jd(e) !== t && n) throw Error(ke(425));
}
function Ma() {
}
var fc = null, pc = null;
function mc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var gc = typeof setTimeout == "function" ? setTimeout : void 0, z0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Cd = typeof Promise == "function" ? Promise : void 0, H0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cd < "u" ? function(e) {
  return Cd.resolve(null).then(e).catch(K0);
} : gc;
function K0(e) {
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
var $l = Math.random().toString(36).slice(2), Ms = "__reactFiber$" + $l, xo = "__reactProps$" + $l, zs = "__reactContainer$" + $l, xc = "__reactEvents$" + $l, V0 = "__reactListeners$" + $l, Y0 = "__reactHandles$" + $l;
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
function jl(e, t) {
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
function Cf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(ke(108, Am(e) || "Unknown", l));
  return rn({}, n, r);
}
function Ia(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kr, Wr = Tn.current, Ht(Tn, e), Ht(Vn, Vn.current), !0;
}
function bd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(ke(169));
  n ? (e = Cf(e, t, Wr), r.__reactInternalMemoizedMergedChildContext = e, Xt(Vn), Xt(Tn), Ht(Tn, e)) : Xt(Vn), Ht(Vn, n);
}
var Ds = null, Ja = !1, Ti = !1;
function Sf(e) {
  Ds === null ? Ds = [e] : Ds.push(e);
}
function X0(e) {
  Ja = !0, Sf(e);
}
function jr() {
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
      throw Ds !== null && (Ds = Ds.slice(e + 1)), Qh(su, jr), l;
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
function Cl() {
  qn = es = null, Jt = !1;
}
function pu(e) {
  vs === null ? vs = [e] : vs.push(e);
}
var G0 = Vs.ReactCurrentBatchConfig;
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
    var j = x.type;
    return j === nl ? v(w, g, x.props.children, I, x.key) : g !== null && (g.elementType === j || typeof j == "object" && j !== null && j.$$typeof === sr && Ad(j) === g.type) ? (I = l(g, x.props), I.ref = Bl(w, g, x), I.return = w, I) : (I = ma(x.type, x.key, x.props, null, w.mode, I), I.ref = Bl(w, g, x), I.return = w, I);
  }
  function d(w, g, x, I) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = _i(x, w.mode, I), g.return = w, g) : (g = l(g, x.children || []), g.return = w, g);
  }
  function v(w, g, x, I, j) {
    return g === null || g.tag !== 7 ? (g = Br(x, w.mode, I, j), g.return = w, g) : (g = l(g, x), g.return = w, g);
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
    var j = g !== null ? g.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return j !== null ? null : i(w, g, "" + x, I);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case _o:
          return x.key === j ? c(w, g, x, I) : null;
        case tl:
          return x.key === j ? d(w, g, x, I) : null;
        case sr:
          return j = x._init, p(
            w,
            g,
            j(x._payload),
            I
          );
      }
      if (Yl(x) || Ol(x)) return j !== null ? null : v(w, g, x, I, null);
      Go(w, x);
    }
    return null;
  }
  function y(w, g, x, I, j) {
    if (typeof I == "string" && I !== "" || typeof I == "number") return w = w.get(x) || null, i(g, w, "" + I, j);
    if (typeof I == "object" && I !== null) {
      switch (I.$$typeof) {
        case _o:
          return w = w.get(I.key === null ? x : I.key) || null, c(g, w, I, j);
        case tl:
          return w = w.get(I.key === null ? x : I.key) || null, d(g, w, I, j);
        case sr:
          var M = I._init;
          return y(w, g, x, M(I._payload), j);
      }
      if (Yl(I) || Ol(I)) return w = w.get(x) || null, v(g, w, I, j, null);
      Go(g, I);
    }
    return null;
  }
  function S(w, g, x, I) {
    for (var j = null, M = null, h = g, A = g = 0, k = null; h !== null && A < x.length; A++) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var N = p(w, h, x[A], I);
      if (N === null) {
        h === null && (h = k);
        break;
      }
      e && h && N.alternate === null && t(w, h), g = o(N, g, A), M === null ? j = N : M.sibling = N, M = N, h = k;
    }
    if (A === x.length) return n(w, h), Jt && Ar(w, A), j;
    if (h === null) {
      for (; A < x.length; A++) h = f(w, x[A], I), h !== null && (g = o(h, g, A), M === null ? j = h : M.sibling = h, M = h);
      return Jt && Ar(w, A), j;
    }
    for (h = r(w, h); A < x.length; A++) k = y(h, w, A, x[A], I), k !== null && (e && k.alternate !== null && h.delete(k.key === null ? A : k.key), g = o(k, g, A), M === null ? j = k : M.sibling = k, M = k);
    return e && h.forEach(function(P) {
      return t(w, P);
    }), Jt && Ar(w, A), j;
  }
  function C(w, g, x, I) {
    var j = Ol(x);
    if (typeof j != "function") throw Error(ke(150));
    if (x = j.call(x), x == null) throw Error(ke(151));
    for (var M = j = null, h = g, A = g = 0, k = null, N = x.next(); h !== null && !N.done; A++, N = x.next()) {
      h.index > A ? (k = h, h = null) : k = h.sibling;
      var P = p(w, h, N.value, I);
      if (P === null) {
        h === null && (h = k);
        break;
      }
      e && h && P.alternate === null && t(w, h), g = o(P, g, A), M === null ? j = P : M.sibling = P, M = P, h = k;
    }
    if (N.done) return n(
      w,
      h
    ), Jt && Ar(w, A), j;
    if (h === null) {
      for (; !N.done; A++, N = x.next()) N = f(w, N.value, I), N !== null && (g = o(N, g, A), M === null ? j = N : M.sibling = N, M = N);
      return Jt && Ar(w, A), j;
    }
    for (h = r(w, h); !N.done; A++, N = x.next()) N = y(h, w, A, N.value, I), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? A : N.key), g = o(N, g, A), M === null ? j = N : M.sibling = N, M = N);
    return e && h.forEach(function(z) {
      return t(w, z);
    }), Jt && Ar(w, A), j;
  }
  function _(w, g, x, I) {
    if (typeof x == "object" && x !== null && x.type === nl && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case _o:
          e: {
            for (var j = x.key, M = g; M !== null; ) {
              if (M.key === j) {
                if (j = x.type, j === nl) {
                  if (M.tag === 7) {
                    n(w, M.sibling), g = l(M, x.props.children), g.return = w, w = g;
                    break e;
                  }
                } else if (M.elementType === j || typeof j == "object" && j !== null && j.$$typeof === sr && Ad(j) === M.type) {
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
          return M = x._init, _(w, g, M(x._payload), I);
      }
      if (Yl(x)) return S(w, g, x, I);
      if (Ol(x)) return C(w, g, x, I);
      Go(w, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(w, g.sibling), g = l(g, x), g.return = w, w = g) : (n(w, g), g = Pi(x, w.mode, I), g.return = w, w = g), a(w)) : n(w, g);
  }
  return _;
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
  if (r = r.shared, bt & 2) {
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
          var S = e, C = i;
          switch (p = t, y = n, C.tag) {
            case 1:
              if (S = C.payload, typeof S == "function") {
                f = S.call(y, f, p);
                break e;
              }
              f = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = C.payload, p = typeof S == "function" ? S.call(y, f, p) : S, p == null) break e;
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
var ua = Vs.ReactCurrentDispatcher, $i = Vs.ReactCurrentBatchConfig, Hr = 0, sn = null, gn = null, Nn = null, Da = !1, no = !1, No = 0, Q0 = 0;
function Mn() {
  throw Error(ke(321));
}
function Eu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Es(e[n], t[n])) return !1;
  return !0;
}
function ju(e, t, n, r, l, o) {
  if (Hr = o, sn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ua.current = e === null || e.memoizedState === null ? eg : tg, e = n(r, l), no) {
    o = 0;
    do {
      if (no = !1, No = 0, 25 <= o) throw Error(ke(301));
      o += 1, Nn = gn = null, t.updateQueue = null, ua.current = ng, e = n(r, l);
    } while (no);
  }
  if (ua.current = Pa, t = gn !== null && gn.next !== null, Hr = 0, Nn = gn = sn = null, Da = !1, t) throw Error(ke(300));
  return e;
}
function Cu() {
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
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ko, lastRenderedState: e }, t.queue = e, e = e.dispatch = q0.bind(null, sn, e), [t.memoizedState, e];
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
function J0(e, t) {
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
function Z0(e, t, n) {
  var r = yr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Jf(e)) Zf(t, n);
  else if (n = $f(e, t, n, r), n !== null) {
    var l = Pn();
    ws(n, e, r, l), qf(n, t, r);
  }
}
function q0(e, t, n) {
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
var Pa = { readContext: hs, useCallback: Mn, useContext: Mn, useEffect: Mn, useImperativeHandle: Mn, useInsertionEffect: Mn, useLayoutEffect: Mn, useMemo: Mn, useReducer: Mn, useRef: Mn, useState: Mn, useDebugValue: Mn, useDeferredValue: Mn, useTransition: Mn, useMutableSource: Mn, useSyncExternalStore: Mn, useId: Mn, unstable_isNewReconciler: !1 }, eg = { readContext: hs, useCallback: function(e, t) {
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
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Z0.bind(null, sn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ss();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ld, useDebugValue: Mu, useDeferredValue: function(e) {
  return Ss().memoizedState = e;
}, useTransition: function() {
  var e = Ld(!1), t = e[0];
  return e = J0.bind(null, e[1]), Ss().memoizedState = e, [t, e];
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
  } else n = Q0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, tg = {
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
}, ng = { readContext: hs, useCallback: Yf, useContext: hs, useEffect: Su, useImperativeHandle: Vf, useInsertionEffect: zf, useLayoutEffect: Hf, useMemo: Xf, useReducer: Li, useRef: Wf, useState: function() {
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
  return typeof o == "object" && o !== null ? o = hs(o) : (l = Yn(t) ? Wr : Tn.current, r = t.contextTypes, o = (r = r != null) ? jl(e, l) : kr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = qa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Pd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && qa.enqueueReplaceState(t, t.state, null);
}
function Ec(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, vu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = hs(o) : (o = Yn(t) ? Wr : Tn.current, l.context = jl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (wc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && qa.enqueueReplaceState(l, l.state, null), La(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function bl(e, t) {
  try {
    var n = "", r = t;
    do
      n += Tm(r), r = r.return;
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
function jc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var sg = typeof WeakMap == "function" ? WeakMap : Map;
function tp(e, t, n) {
  n = Bs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Fa || (Fa = !0, Lc = r), jc(e, t);
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
      jc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    jc(e, t), typeof r != "function" && (xr === null ? xr = /* @__PURE__ */ new Set([this]) : xr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function _d(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new sg();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = xg.bind(null, e, t, n), t.then(e, e));
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
var rg = Vs.ReactCurrentOwner, Kn = !1;
function Dn(e, t, n, r) {
  t.child = e === null ? Af(t, null, n, r) : Sl(t, e.child, n, r);
}
function Ud(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return yl(t, l), r = ju(e, t, n, r, o, l), n = Cu(), e !== null && !Kn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ks(e, t, l)) : (Jt && n && hu(t), t.flags |= 1, Dn(e, t, r, l), t.child);
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
  return Cc(e, t, n, r, l);
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
function Cc(e, t, n, r, l) {
  var o = Yn(n) ? Wr : Tn.current;
  return o = jl(t, o), yl(t, l), n = ju(e, t, n, r, o, l), r = Cu(), e !== null && !Kn ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ks(e, t, l)) : (Jt && r && hu(t), t.flags |= 1, Dn(e, t, n, l), t.child);
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
    typeof d == "object" && d !== null ? d = hs(d) : (d = Yn(n) ? Wr : Tn.current, d = jl(t, d));
    var v = n.getDerivedStateFromProps, f = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Pd(t, a, r, d), rr = !1;
    var p = t.memoizedState;
    a.state = p, La(t, r, a, l), c = t.memoizedState, i !== r || p !== c || Vn.current || rr ? (typeof v == "function" && (wc(t, n, v, r), c = t.memoizedState), (i = rr || Dd(t, n, i, r, p, c, d)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Rf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : xs(t.type, i), a.props = d, f = t.pendingProps, p = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = hs(c) : (c = Yn(n) ? Wr : Tn.current, c = jl(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== f || p !== c) && Pd(t, a, r, c), rr = !1, p = t.memoizedState, a.state = p, La(t, r, a, l);
    var S = t.memoizedState;
    i !== f || p !== S || Vn.current || rr ? (typeof y == "function" && (wc(t, n, y, r), S = t.memoizedState), (d = rr || Dd(t, n, d, r, p, S, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, S, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, S, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), a.props = r, a.state = S, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Sc(e, t, n, r, o, l);
}
function Sc(e, t, n, r, l, o) {
  lp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && bd(t, n, !1), Ks(e, t, o);
  r = t.stateNode, rg.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Sl(t, e.child, null, o), t.child = Sl(t, null, i, o)) : Dn(e, t, i, o), t.memoizedState = r.state, l && bd(t, n, !0), t.child;
}
function op(e) {
  var t = e.stateNode;
  t.pendingContext ? Md(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Md(e, t.context, !1), Nu(e, t.containerInfo);
}
function Hd(e, t, n, r, l) {
  return Cl(), pu(l), t.flags |= 256, Dn(e, t, n, r), t.child;
}
var Mc = { dehydrated: null, treeContext: null, retryLane: 0 };
function bc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ap(e, t, n) {
  var r = t.pendingProps, l = nn.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ht(nn, l & 1), e === null)
    return Nc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = ni(a, r, 0, null), e = Br(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = bc(n), t.memoizedState = Mc, e) : bu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return lg(e, t, a, r, i, l, n);
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
function lg(e, t, n, r, l, o, a) {
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
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = yg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, qn = mr(l.nextSibling), es = t, Jt = !0, vs = null, e !== null && (is[cs++] = _s, is[cs++] = Fs, is[cs++] = zr, _s = e.id, Fs = e.overflow, zr = t), t = bu(t, r.children), t.flags |= 4096, t);
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
function og(e, t, n) {
  switch (t.tag) {
    case 3:
      op(t), Cl();
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
function ag(e, t, n) {
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
        if (Jt && qn !== null && t.mode & 1 && !(t.flags & 128)) If(), Cl(), t.flags |= 98560, o = !1;
        else if (o = Xo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(ke(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(ke(317));
            o[Ms] = t;
          } else Cl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
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
function ig(e, t) {
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
        Cl();
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
var Jo = !1, In = !1, cg = typeof WeakSet == "function" ? WeakSet : Set, We = null;
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
function ug(e, t) {
  if (fc = ja, e = gf(), du(e)) {
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
  for (pc = { focusedElem: e, selectionRange: n }, ja = !1, We = t; We !== null; ) if (t = We, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, We = e;
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
            var C = S.memoizedProps, _ = S.memoizedState, w = t.stateNode, g = w.getSnapshotBeforeUpdate(t.elementType === t.type ? C : xs(t.type, C), _);
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
      e.return = t.return, We = e;
      break;
    }
    We = t.return;
  }
  return S = Vd, Vd = !1, S;
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
  t !== null && (e.alternate = null, hp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ms], delete t[xo], delete t[xc], delete t[V0], delete t[Y0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
var jn = null, ys = !1;
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
      var r = jn, l = ys;
      jn = null, er(e, t, n), jn = r, ys = l, jn !== null && (ys ? (e = jn, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : jn.removeChild(n.stateNode));
      break;
    case 18:
      jn !== null && (ys ? (e = jn, n = n.stateNode, e.nodeType === 8 ? Ii(e.parentNode, n) : e.nodeType === 1 && Ii(e, n), ho(e)) : Ii(jn, n.stateNode));
      break;
    case 4:
      r = jn, l = ys, jn = n.stateNode.containerInfo, ys = !0, er(e, t, n), jn = r, ys = l;
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
    n === null && (n = e.stateNode = new cg()), t.forEach(function(r) {
      var l = vg.bind(null, e, r);
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
            jn = i.stateNode, ys = !1;
            break e;
          case 3:
            jn = i.stateNode.containerInfo, ys = !0;
            break e;
          case 4:
            jn = i.stateNode.containerInfo, ys = !0;
            break e;
        }
        i = i.return;
      }
      if (jn === null) throw Error(ke(160));
      pp(o, a, l), jn = null, ys = !1;
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
      if (gs(t, e), Cs(e), r & 4) {
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
      gs(t, e), Cs(e), r & 512 && n !== null && dl(n, n.return);
      break;
    case 5:
      if (gs(t, e), Cs(e), r & 512 && n !== null && dl(n, n.return), e.flags & 32) {
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
      if (gs(t, e), Cs(e), r & 4) {
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
      if (gs(t, e), Cs(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        ho(t.containerInfo);
      } catch (C) {
        on(e, e.return, C);
      }
      break;
    case 4:
      gs(t, e), Cs(e);
      break;
    case 13:
      gs(t, e), Cs(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Au = un())), r & 4 && Xd(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (In = (d = In) || v, gs(t, e), In = d) : gs(t, e), Cs(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (We = e, v = e.child; v !== null; ) {
          for (f = We = v; We !== null; ) {
            switch (p = We, y = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                so(4, p, p.return);
                break;
              case 1:
                dl(p, p.return);
                var S = p.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
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
            y !== null ? (y.return = p, We = y) : Qd(f);
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
      gs(t, e), Cs(e), r & 4 && Xd(e);
      break;
    case 21:
      break;
    default:
      gs(
        t,
        e
      ), Cs(e);
  }
}
function Cs(e) {
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
function dg(e, t, n) {
  We = e, gp(e);
}
function gp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; We !== null; ) {
    var l = We, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Jo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || In;
        i = Jo;
        var d = In;
        if (Jo = a, (In = c) && !d) for (We = l; We !== null; ) a = We, c = a.child, a.tag === 22 && a.memoizedState !== null ? Jd(l) : c !== null ? (c.return = a, We = c) : Jd(l);
        for (; o !== null; ) We = o, gp(o), o = o.sibling;
        We = l, Jo = i, In = d;
      }
      Gd(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, We = o) : Gd(e);
  }
}
function Gd(e) {
  for (; We !== null; ) {
    var t = We;
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
function Qd(e) {
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
function Jd(e) {
  for (; We !== null; ) {
    var t = We;
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
var hg = Math.ceil, _a = Vs.ReactCurrentDispatcher, Iu = Vs.ReactCurrentOwner, ds = Vs.ReactCurrentBatchConfig, bt = 0, kn = null, pn = null, Cn = 0, Jn = 0, hl = Er(0), xn = 0, Eo = null, Kr = 0, ti = 0, Tu = 0, ro = null, Hn = null, Au = 0, Il = 1 / 0, Os = null, Fa = !1, Lc = null, xr = null, Zo = !1, dr = null, Ba = 0, lo = 0, Oc = null, fa = -1, pa = 0;
function Pn() {
  return bt & 6 ? un() : fa !== -1 ? fa : fa = un();
}
function yr(e) {
  return e.mode & 1 ? bt & 2 && Cn !== 0 ? Cn & -Cn : G0.transition !== null ? (pa === 0 && (pa = qh()), pa) : (e = Ft, e !== 0 || (e = window.event, e = e === void 0 ? 16 : of(e.type)), e) : 1;
}
function ws(e, t, n, r) {
  if (50 < lo) throw lo = 0, Oc = null, Error(ke(185));
  Mo(e, n, r), (!(bt & 2) || e !== kn) && (e === kn && (!(bt & 2) && (ti |= n), xn === 4 && ir(e, Cn)), Xn(e, r), n === 1 && bt === 0 && !(t.mode & 1) && (Il = un() + 500, Ja && jr()));
}
function Xn(e, t) {
  var n = e.callbackNode;
  Gm(e, t);
  var r = Ea(e, e === kn ? Cn : 0);
  if (r === 0) n !== null && od(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && od(n), t === 1) e.tag === 0 ? X0(Zd.bind(null, e)) : Sf(Zd.bind(null, e)), H0(function() {
      !(bt & 6) && jr();
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
      n = jp(n, xp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function xp(e, t) {
  if (fa = -1, pa = 0, bt & 6) throw Error(ke(327));
  var n = e.callbackNode;
  if (vl() && e.callbackNode !== n) return null;
  var r = Ea(e, e === kn ? Cn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ua(e, r);
  else {
    t = r;
    var l = bt;
    bt |= 2;
    var o = vp();
    (kn !== e || Cn !== t) && (Os = null, Il = un() + 500, Fr(e, t));
    do
      try {
        mg();
        break;
      } catch (i) {
        yp(e, i);
      }
    while (!0);
    gu(), _a.current = o, bt = l, pn !== null ? t = 0 : (kn = null, Cn = 0, t = xn);
  }
  if (t !== 0) {
    if (t === 2 && (l = ic(e), l !== 0 && (r = l, t = Dc(e, l))), t === 1) throw n = Eo, Fr(e, 0), ir(e, r), Xn(e, un()), n;
    if (t === 6) ir(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !fg(l) && (t = Ua(e, r), t === 2 && (o = ic(e), o !== 0 && (r = o, t = Dc(e, o))), t === 1)) throw n = Eo, Fr(e, 0), ir(e, r), Xn(e, un()), n;
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
          if (r = l, r = un() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * hg(r / 1960)) - r, 10 < r) {
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
function fg(e) {
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
  if (bt & 6) throw Error(ke(327));
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
  var n = bt;
  bt |= 1;
  try {
    return e(t);
  } finally {
    bt = n, bt === 0 && (Il = un() + 500, Ja && jr());
  }
}
function Vr(e) {
  dr !== null && dr.tag === 0 && !(bt & 6) && vl();
  var t = bt;
  bt |= 1;
  var n = ds.transition, r = Ft;
  try {
    if (ds.transition = null, Ft = 1, e) return e();
  } finally {
    Ft = r, ds.transition = n, bt = t, !(bt & 6) && jr();
  }
}
function Ru() {
  Jn = hl.current, Xt(hl);
}
function Fr(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, z0(n)), pn !== null) for (n = pn.return; n !== null; ) {
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
  if (kn = e, pn = e = vr(e.current, null), Cn = Jn = t, xn = 0, Eo = null, Tu = ti = Kr = 0, Hn = ro = null, Or !== null) {
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
        if (t = Cn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, f = v.tag;
          if (!(v.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Fd(a);
          if (y !== null) {
            y.flags &= -257, Bd(y, a, i, o, t), y.mode & 1 && _d(o, d, t), t = y, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var C = /* @__PURE__ */ new Set();
              C.add(c), t.updateQueue = C;
            } else S.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              _d(o, d, t), Lu();
              break e;
            }
            c = Error(ke(426));
          }
        } else if (Jt && i.mode & 1) {
          var _ = Fd(a);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), Bd(_, a, i, o, t), pu(bl(c, i));
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
    } catch (j) {
      t = j, pn === n && n !== null && (pn = n = n.return);
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
  (xn === 0 || xn === 3 || xn === 2) && (xn = 4), kn === null || !(Kr & 268435455) && !(ti & 268435455) || ir(kn, Cn);
}
function Ua(e, t) {
  var n = bt;
  bt |= 2;
  var r = vp();
  (kn !== e || Cn !== t) && (Os = null, Fr(e, t));
  do
    try {
      pg();
      break;
    } catch (l) {
      yp(e, l);
    }
  while (!0);
  if (gu(), bt = n, _a.current = r, pn !== null) throw Error(ke(261));
  return kn = null, Cn = 0, xn;
}
function pg() {
  for (; pn !== null; ) Np(pn);
}
function mg() {
  for (; pn !== null && !Bm(); ) Np(pn);
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
      if (n = ig(n, t), n !== null) {
        n.flags &= 32767, pn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        xn = 6, pn = null;
        return;
      }
    } else if (n = ag(n, t, Jn), n !== null) {
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
    ds.transition = null, Ft = 1, gg(e, t, n, r);
  } finally {
    ds.transition = l, Ft = r;
  }
  return null;
}
function gg(e, t, n, r) {
  do
    vl();
  while (dr !== null);
  if (bt & 6) throw Error(ke(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(ke(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Qm(e, o), e === kn && (pn = kn = null, Cn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Zo || (Zo = !0, jp(wa, function() {
    return vl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ds.transition, ds.transition = null;
    var a = Ft;
    Ft = 1;
    var i = bt;
    bt |= 4, Iu.current = null, ug(e, n), mp(n, e), D0(pc), ja = !!fc, pc = fc = null, e.current = n, dg(n), Um(), bt = i, Ft = a, ds.transition = o;
  } else e.current = n;
  if (Zo && (Zo = !1, dr = e, Ba = l), o = e.pendingLanes, o === 0 && (xr = null), Hm(n.stateNode), Xn(e, un()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Fa) throw Fa = !1, e = Lc, Lc = null, e;
  return Ba & 1 && e.tag !== 0 && vl(), o = e.pendingLanes, o & 1 ? e === Oc ? lo++ : (lo = 0, Oc = e) : lo = 0, jr(), null;
}
function vl() {
  if (dr !== null) {
    var e = ef(Ba), t = ds.transition, n = Ft;
    try {
      if (ds.transition = null, Ft = 16 > e ? 16 : e, dr === null) var r = !1;
      else {
        if (e = dr, dr = null, Ba = 0, bt & 6) throw Error(ke(331));
        var l = bt;
        for (bt |= 4, We = e.current; We !== null; ) {
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
                      so(8, v, o);
                  }
                  var f = v.child;
                  if (f !== null) f.return = v, We = f;
                  else for (; We !== null; ) {
                    v = We;
                    var p = v.sibling, y = v.return;
                    if (hp(v), v === d) {
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
                var C = S.child;
                if (C !== null) {
                  S.child = null;
                  do {
                    var _ = C.sibling;
                    C.sibling = null, C = _;
                  } while (C !== null);
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
                so(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, We = w;
              break e;
            }
            We = o.return;
          }
        }
        var g = e.current;
        for (We = g; We !== null; ) {
          a = We;
          var x = a.child;
          if (a.subtreeFlags & 2064 && x !== null) x.return = a, We = x;
          else e: for (a = g; We !== null; ) {
            if (i = We, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  ei(9, i);
              }
            } catch (j) {
              on(i, i.return, j);
            }
            if (i === a) {
              We = null;
              break e;
            }
            var I = i.sibling;
            if (I !== null) {
              I.return = i.return, We = I;
              break e;
            }
            We = i.return;
          }
        }
        if (bt = l, jr(), Is && typeof Is.onPostCommitFiberRoot == "function") try {
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
function xg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Pn(), e.pingedLanes |= e.suspendedLanes & n, kn === e && (Cn & n) === n && (xn === 4 || xn === 3 && (Cn & 130023424) === Cn && 500 > un() - Au ? Fr(e, 0) : Tu |= n), Xn(e, t);
}
function wp(e, t) {
  t === 0 && (e.mode & 1 ? (t = Wo, Wo <<= 1, !(Wo & 130023424) && (Wo = 4194304)) : t = 1);
  var n = Pn();
  e = Hs(e, t), e !== null && (Mo(e, t, n), Xn(e, n));
}
function yg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), wp(e, n);
}
function vg(e, t) {
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
    if (!(e.lanes & n) && !(t.flags & 128)) return Kn = !1, og(e, t, n);
    Kn = !!(e.flags & 131072);
  }
  else Kn = !1, Jt && t.flags & 1048576 && Mf(t, Aa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ha(e, t), e = t.pendingProps;
      var l = jl(t, Tn.current);
      yl(t, n), l = ju(null, t, r, e, l, n);
      var o = Cu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Yn(r) ? (o = !0, Ia(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, vu(t), l.updater = qa, t.stateNode = l, l._reactInternals = t, Ec(t, r, e, n), t = Sc(null, t, r, !0, o, n)) : (t.tag = 0, Jt && o && hu(t), Dn(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ha(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = kg(r), e = xs(r, e), l) {
          case 0:
            t = Cc(null, t, r, e, n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : xs(r, l), Cc(e, t, r, l, n);
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
          if (Cl(), r === l) {
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
function jp(e, t) {
  return Qh(e, t);
}
function Ng(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function us(e, t, n, r) {
  return new Ng(e, t, n, r);
}
function Ou(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function kg(e) {
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
function wg(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = yi(0), this.expirationTimes = yi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Du(e, t, n, r, l, o, a, i, c) {
  return e = new wg(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = us(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, vu(o), e;
}
function Eg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: tl, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Cp(e) {
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
    if (Yn(n)) return Cf(e, n, t);
  }
  return t;
}
function Sp(e, t, n, r, l, o, a, i, c) {
  return e = Du(n, r, !0, e, l, o, a, i, c), e.context = Cp(null), n = e.current, r = Pn(), l = yr(n), o = Bs(r, l), o.callback = t ?? null, gr(n, o, l), e.current.lanes = l, Mo(e, l, r), Xn(e, r), e;
}
function si(e, t, n, r) {
  var l = t.current, o = Pn(), a = yr(l);
  return n = Cp(n), t.context === null ? t.context = n : t.pendingContext = n, t = Bs(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = gr(l, t, a), e !== null && (ws(e, l, a, o), ca(e, l, a)), a;
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
function jg() {
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
function Cg(e, t, n, r, l) {
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
  } else a = Cg(n, t, e, l, r);
  return Wa(a);
}
tf = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Xl(t.pendingLanes);
        n !== 0 && (ru(t, n | 1), Xn(t, un()), !(bt & 6) && (Il = un() + 500, jr()));
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
var Sg = { usingClientEntryPoint: !1, Events: [Io, ol, Qa, Wh, zh, $u] }, Wl = { findFiberByHostInstance: Lr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Mg = { bundleType: Wl.bundleType, version: Wl.version, rendererPackageName: Wl.rendererPackageName, rendererConfig: Wl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Vs.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Xh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wl.findFiberByHostInstance || jg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!qo.isDisabled && qo.supportsFiber) try {
    Va = qo.inject(Mg), Is = qo;
  } catch {
  }
}
ns.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sg;
ns.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fu(t)) throw Error(ke(200));
  return Eg(e, t, null, n);
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
var bg = u, Ig = Symbol.for("react.element"), Tg = Symbol.for("react.fragment"), Ag = Object.prototype.hasOwnProperty, $g = bg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Rg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) Ag.call(t, r) && !Rg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ig, type: e, key: o, ref: a, props: l, _owner: $g.current };
}
ai.Fragment = Tg;
ai.jsx = Tp;
ai.jsxs = Tp;
Ip.exports = ai;
var s = Ip.exports;
let cr = [], Ap = 120, Fi = !1;
async function Lg() {
  if (!Fi) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Og(n), Fi = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Fi = !0;
  }
}
function Og(e) {
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
function Dg(e) {
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
function Pg(e) {
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
  return t === "UTC" ? Pg(e) : Dg(e);
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
  let S = v - y * 6e4;
  const C = Us(S);
  return C.offsetMin !== y && (S = v - C.offsetMin * 6e4), S;
}
function _g({
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
  const [C, _] = u.useState(!1);
  u.useEffect(() => {
    if (!C) return;
    const j = (M) => {
      M.key === "Escape" && _(!1);
    };
    return window.addEventListener("keydown", j), () => window.removeEventListener("keydown", j);
  }, [C]);
  const w = u.useMemo(() => {
    const j = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), M = (e == null ? void 0 : e.durationMs) || 0;
    if (!j || M <= 0) return "-- ➔ --";
    const h = j + M, A = (V) => String(V).padStart(2, "0"), k = Pr(j, n), N = Pr(h, n), P = `${k.year}-${A(k.month)}-${A(k.day)}`, z = `${A(k.hour)}:${A(k.minute)}:${A(k.second)}`, $ = `${N.year}-${A(N.month)}-${A(N.day)}`, U = `${A(N.hour)}:${A(N.minute)}:${A(N.second)}`, le = n === "UTC" ? " (UTC)" : k.label ? ` (${k.label})` : "", se = P === $ ? U : `${$} ${U}`;
    return `${P} ${z} ➔ ${se}${le}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = u.useMemo(() => {
    const j = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (j >= 1440) {
      const M = (j / 1440).toFixed(1);
      return `(${M.endsWith(".0") ? parseInt(M, 10) : M}d / ${j}m Total)`;
    }
    return `(${j}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), x = () => {
    _(!1), S == null || S();
  }, I = C ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => _(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (j) => j.stopPropagation(), dir: "ltr", children: [
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
    typeof document < "u" && I && As.createPortal(I, document.body)
  ] });
}
const Qr = (e) => String(e).padStart(2, "0");
function Ct(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const p = new Date(e), y = Qr(p.getUTCHours()), S = Qr(p.getUTCMinutes()), C = Qr(p.getUTCSeconds()), _ = l ? `${y}:${S}:${C}` : `${y}:${S}`;
    return r ? `${_} UTC` : _;
  }
  const { offsetMin: o, label: a } = Us(e), i = new Date(e + o * 60 * 1e3), c = Qr(i.getUTCHours()), d = Qr(i.getUTCMinutes()), v = Qr(i.getUTCSeconds()), f = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${f} ${a}` : f;
}
const Fg = 600, rh = 250, as = /* @__PURE__ */ new Map(), Rr = /* @__PURE__ */ new Map(), Fc = /* @__PURE__ */ new Set(), lh = 4;
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
      !t || (e = t.signal) != null && e.aborted || (Nl++, Bg(t));
    }
}
function ga(e, t, n, r = "mon-0") {
  const l = Bc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (as.size >= Fg) {
    const i = as.keys().next().value, c = as.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), as.delete(i);
  }
  as.set(a, n), Fc.forEach((i) => i(e, l, n, o));
}
async function Bg(e) {
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
function Ug() {
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
function Wg() {
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
function zg(e) {
  try {
    localStorage.setItem(Lp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let lr = null, fl = null, Ui = null, Wn = 0, Jr = 0, ea = -60, jo = 1;
function Hg() {
  if (!lr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (lr = new e());
  }
  return lr && lr.state === "suspended" && lr.resume().catch(() => {
  }), lr;
}
function Ha(e, t = 1) {
  if (!e) return null;
  jo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = Hg();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(jo, n.currentTime), fl = e, Kg(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function oh(e) {
  if (jo = Math.max(0, Number(e) || 1), fl != null && fl.__audioGainNode && lr)
    try {
      fl.__audioGainNode.gain.setValueAtTime(jo, lr.currentTime);
    } catch {
    }
}
function Kg() {
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
        gain: jo,
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
function Vg({
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
    let y = 1 / 0, S = 1 / 0, C = -1 / 0, _ = -1 / 0;
    e.forEach((x) => {
      const I = x.x ?? x.X ?? 0, j = x.y ?? x.Y ?? 0, M = x.width ?? x.Width ?? 1920, h = x.height ?? x.Height ?? 1080;
      y = Math.min(y, I), S = Math.min(S, j), C = Math.max(C, I + M), _ = Math.max(_, j + h);
    });
    const w = Math.max(1, C - y), g = Math.max(1, _ - S);
    return { minX: y, minY: S, totalW: w, totalH: g };
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
              const C = y.displayId ?? y.DisplayId ?? `mon-${S}`, _ = (y.x ?? y.X ?? 0) - a.minX, w = (y.y ?? y.Y ?? 0) - a.minY, g = y.width ?? y.Width ?? 1920, x = y.height ?? y.Height ?? 1080, I = C === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${I ? "is-active" : ""}`,
                  onClick: (j) => {
                    j.stopPropagation(), n == null || n(C);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: _ + 10,
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
                        x: _ + g / 2,
                        y: w + x / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: S + 1
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
function Yg({
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
  directorPlan: C = null,
  isAutoDirectorEnabled: _ = !0,
  targetDisplayId: w = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: x = !1,
  hideDisplayStrip: I = !1
}) {
  var Ye;
  const j = e.hostname || e.name || e.id || "", M = Math.round(t), [h, A] = u.useState(() => !j || !M ? null : On.get(j, M) || null), [k, N] = u.useState(""), [P, z] = u.useState(!1), [$, U] = u.useState(!1), [le, se] = u.useState(!1), V = u.useRef(l), b = u.useRef(null), W = u.useRef(0), O = u.useRef(t - a), H = u.useRef(t - a), R = u.useRef(!1), oe = u.useRef(null), te = u.useRef(!1);
  O.current = t - a;
  const Z = (e == null ? void 0 : e.displays) || ((Ye = e == null ? void 0 : e.topology) == null ? void 0 : Ye.displays) || [], [Y, Re] = u.useState(null);
  u.useEffect(() => {
    Re(null);
  }, [w]);
  const Oe = u.useMemo(() => {
    const ge = C || (e == null ? void 0 : e.directorPlan);
    return !ge || !ge.segments || ge.segments.length === 0 ? null : ge.segments.find((pe) => {
      const ae = pe.startEpochMs ?? pe.StartEpochMs ?? 0, Me = pe.endEpochMs ?? pe.EndEpochMs ?? 0;
      return t >= ae && t <= Me;
    }) || ge.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t]), ve = u.useMemo(() => {
    var ge;
    return Y ? Y.toLowerCase() : w && w !== "auto" && w !== "director" ? w.toLowerCase() : Z.length > 1 && _ !== !1 && Oe ? (Oe.targetDisplayId || Oe.TargetDisplayId || "mon-0").toLowerCase() : (((ge = Z[0]) == null ? void 0 : ge.displayId) || "mon-0").toLowerCase();
  }, [Y, w, Z, _, Oe]), Be = u.useRef(ve), [be, Ie] = u.useState(!1);
  u.useEffect(() => {
    if (Be.current && Be.current !== ve) {
      Ie(!0);
      const ge = setTimeout(() => Ie(!1), 2e3);
      return Be.current = ve, () => clearTimeout(ge);
    }
    Be.current = ve;
  }, [ve]);
  const et = p[e == null ? void 0 : e.id] || p[j] || (e == null ? void 0 : e.segments) || [], at = et.length === 0 || et.some((ge) => {
    const pe = ge.startEpochMs ?? ge.startEpoch ?? 0, ae = ge.endEpochMs ?? ge.endEpoch ?? 0;
    return t >= pe && t <= ae;
  }), ie = !!(r ? !kl().isMuted : S && (e.id === S || j === S)), je = u.useCallback(() => {
    if (!b.current) return;
    const ge = kl();
    if (r)
      b.current.volume = ge.volume, b.current.muted = ge.isMuted, ge.isMuted || Ha(b.current);
    else {
      const pe = !!(S && (e.id === S || j === S));
      b.current.muted = !pe, pe && (b.current.volume = ge.volume, Ha(b.current));
    }
  }, [r, S, e.id, j]);
  u.useEffect(() => {
    je();
  }, [je]), u.useEffect(() => {
    const ge = (pe) => {
      b.current && pe.detail && je();
    };
    return window.addEventListener("itb-audio-state-changed", ge), () => window.removeEventListener("itb-audio-state-changed", ge);
  }, [je]), u.useEffect(() => {
    b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !M || !j) return;
    if (l) {
      V.current = !0;
      return;
    }
    const ge = V.current;
    V.current = l;
    let pe = !0;
    const ae = new AbortController(), Me = On.get(j, M, ve);
    if (Me) {
      A(Me), U(!1), se(!1);
      return;
    }
    se(!0);
    const ne = setTimeout(() => {
      pe && On.fetchFrame(j, M, ae.signal, ve).then((ee) => {
        pe && (se(!1), ee && ee !== "NO_SIGNAL" ? (A(ee), U(!1)) : ee === "NO_SIGNAL" && U(!0));
      });
    }, ge ? 25 : 40), X = On.subscribe((ee, Q, J, de) => {
      ee === j && Q === M && (!de || de === ve) && pe && (se(!1), J && J !== "NO_SIGNAL" ? (A(J), U(!1)) : J === "NO_SIGNAL" && U(!0));
    });
    return () => {
      pe = !1, clearTimeout(ne), ae.abort(), X();
    };
  }, [j, M, n, l, r, P, ve]), u.useEffect(() => {
    if (!j || !(r || l)) {
      l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), z(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load()));
      return;
    }
    let pe = null;
    return l && !v && at ? pe = setTimeout(() => {
      const ae = O.current;
      W.current = ae, H.current = ae, R.current = !1;
      const Me = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(j)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + ae}&displayId=${encodeURIComponent(ve)}&_t=${Date.now()}`;
      z(!1), N(Me);
    }, 80) : l || (oe.current && clearTimeout(oe.current), R.current = !1, N(""), z(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load())), () => {
      pe && clearTimeout(pe);
    };
  }, [l, r, j, a, i, v, at, ve]), u.useEffect(() => {
    if (!j || !(r || l)) return;
    const pe = O.current, ae = Math.abs(pe - H.current);
    if (!l || ae < 800) {
      H.current = pe;
      return;
    }
    return R.current = !0, H.current = pe, W.current = pe, b.current && b.current.pause(), z(!1), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!at || v) {
        N(""), z(!1), R.current = !1;
        return;
      }
      const Me = O.current, L = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(j)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Me}&displayId=${encodeURIComponent(ve)}&_t=${Date.now()}`;
      N(L);
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [t, l, r, j, a, i, v, at, ve]), u.useEffect(() => {
    if (r || !l || !b.current || !P || R.current) return;
    const ge = (O.current - W.current) / 1e3;
    if (ge >= 0) {
      const pe = b.current, ae = pe.currentTime, Me = Math.abs(ae - ge);
      if (Me > 0.35 && Me < 3)
        try {
          pe.currentTime = ge;
        } catch {
        }
    }
  }, [r, l, t, P]), u.useEffect(() => {
    if (!r || !l || !k || !P || v) return;
    let ge = null, pe = b.current ? b.current.currentTime : 0, ae = performance.now(), Me = W.current + Math.round(pe * 1e3);
    const L = () => {
      const ne = b.current;
      if (ne && !ne.paused && !ne.ended && !te.current && !R.current) {
        const X = performance.now(), ee = ne.currentTime;
        Math.abs(ee - pe) > 5e-4 && (pe = ee, ae = X);
        const Q = Math.max(0, (X - ae) / 1e3), J = ne.playbackRate || y || 1, de = pe + Q * J;
        let qe = W.current + Math.round(de * 1e3);
        const _e = qe - Me;
        if (_e < 0 && _e > -300 && (qe = Me), qe >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Xe = a + qe, lt = f == null ? void 0 : f.find((Ge) => Xe >= Ge.startEpochMs && Xe < Ge.endEpochMs);
        if (lt) {
          te.current = !0;
          const Ge = lt.endEpochMs - a;
          d(Ge), W.current = Ge, Me = Ge, H.current = Ge;
          const It = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(j)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Ge}&_t=${Date.now()}`;
          z(!1), N(It), setTimeout(() => {
            te.current = !1;
          }, 300);
          return;
        }
        qe !== Me && (Me = qe, H.current = qe, d == null || d(qe));
      }
      ge = requestAnimationFrame(L);
    };
    return ge = requestAnimationFrame(L), () => {
      ge && cancelAnimationFrame(ge);
    };
  }, [
    r,
    l,
    k,
    P,
    v,
    y,
    c,
    a,
    i,
    j,
    f,
    d,
    o
  ]);
  const ze = () => {
    if (te.current) return;
    const ge = a + O.current, pe = et.map((ae) => ({ start: ae.startEpochMs ?? ae.startEpoch ?? 0, end: ae.endEpochMs ?? ae.endEpoch ?? 0 })).filter((ae) => ae.start > ge + 200).sort((ae, Me) => ae.start - Me.start)[0];
    if (pe && pe.start - a < c) {
      te.current = !0;
      const ae = pe.start - a;
      d(ae), W.current = ae;
      const Me = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(j)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + ae}&_t=${Date.now()}`;
      z(!1), N(Me), setTimeout(() => {
        te.current = !1;
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
        ref: b,
        src: k,
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
          b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onCanPlay: () => {
          je(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y), l && b.current && b.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          R.current = !1, z(!0), je(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onWaiting: () => {
          z(!1);
        },
        onTimeUpdate: () => {
          var ge;
          !P && ((ge = b.current) == null ? void 0 : ge.currentTime) > 0 && (R.current = !1, z(!0));
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
        children: h && !$ ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: h,
            alt: j,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => U(!0)
          }
        ) : (!h || $ || !at) && !k ? /* @__PURE__ */ s.jsx(Dp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && at && !P && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
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
          j
        ] })
      ] })
    ] }) }),
    Z.length > 1 && /* @__PURE__ */ s.jsx(
      Pp,
      {
        displays: Z,
        activeDisplayId: ve,
        onSelectDisplay: (ge) => {
          Re(ge), g == null || g(ge);
        },
        isTransitioning: be,
        mode: _ ? "AUTO" : "MANUAL"
      }
    ),
    !I && /* @__PURE__ */ s.jsx(
      Vg,
      {
        displays: Z,
        activeDisplayId: ve,
        onSelectDisplay: (ge) => {
          Re(ge), g == null || g(ge);
        },
        areAllDisplaysPlaced: x,
        isAutoDirectorEnabled: _
      }
    )
  ] });
}
function Xg({
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
  onSelectActiveStation: C,
  recordingSegments: _ = {},
  playbackSpeed: w = 1,
  activeAudioStationId: g = null,
  onSoloAudio: x,
  directorPlan: I = null,
  isAutoDirectorEnabled: j = !0,
  targetDisplayId: M = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: A = !1,
  _slotIndex: k = 0,
  borderColor: N = null,
  onSwapWithNext: P = null
}) {
  var b;
  const z = !!(g && (e.id === g || e.hostname && e.hostname === g)), $ = (e.hostname || e.name || "").includes("Offline"), U = $ ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((b = e == null ? void 0 : e.topology) == null ? void 0 : b.displays) || []).length > 1;
  const se = () => {
    if (t) {
      const W = M && M !== "auto" && M !== "director" ? M : null;
      S && S(e.id, W);
    } else
      C && C(e.id);
  }, V = (W) => {
    W.preventDefault(), W.stopPropagation(), t && C && (i && i(!1), C(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: se,
      onContextMenu: V,
      className: `camera-card ${U} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
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
                onClick: (W) => {
                  W.stopPropagation(), P();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            x && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${z ? "audio-active" : ""}`,
                onClick: (W) => {
                  W.stopPropagation(), x(z ? null : e.id);
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
            S && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (W) => {
                  W.stopPropagation();
                  const O = M && M !== "auto" && M !== "director" ? M : null;
                  S(e.id, O);
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
                onClick: (W) => {
                  W.stopPropagation(), t && i && i(!1), C(t ? null : e.id);
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
                onClick: (W) => {
                  W.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${$ ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            Yg,
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
              activeAudioStationId: g,
              directorPlan: I,
              isAutoDirectorEnabled: j,
              targetDisplayId: M,
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
          Ct(l, o)
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
function Gg(e) {
  const t = _p(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function Qg({
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
  const y = u.useCallback(($) => {
    $ && ($.preventDefault(), $.stopPropagation());
    let U;
    if (c.isCustom || !Ql.includes(c.preset))
      U = "top-right";
    else {
      const se = (Ql.indexOf(c.preset) + 1) % Ql.length;
      U = Ql[se];
    }
    a(U), p(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", U);
    } catch {
    }
    n && n(U);
  }, [c.isCustom, c.preset, n]), S = u.useCallback(($) => {
    if ($.button !== void 0 && $.button !== 0 || $.target.closest(".btn-cycle-corner")) return;
    const U = r.current;
    if (!U) return;
    const le = U.parentElement;
    if (!le) return;
    const se = U.getBoundingClientRect(), V = le.getBoundingClientRect();
    l.current = {
      startX: $.clientX,
      startY: $.clientY,
      clockWidth: se.width,
      clockHeight: se.height,
      parentRect: V,
      offsetX: $.clientX - se.left,
      offsetY: $.clientY - se.top,
      hasMoved: !1
    };
    const b = (O) => {
      if (!l.current) return;
      const H = l.current, R = Math.hypot(O.clientX - H.startX, O.clientY - H.startY);
      if (!H.hasMoved && R > 4 && (H.hasMoved = !0, v(!0)), !H.hasMoved) return;
      const oe = H.parentRect.width, te = H.parentRect.height, Z = Math.max(1, oe - H.clockWidth - 28), Y = Math.max(1, te - H.clockHeight - 28), Re = O.clientX - H.parentRect.left - H.offsetX - 14, Oe = O.clientY - H.parentRect.top - H.offsetY - 14, ve = Math.max(0, Math.min(Z, Re)), Be = Math.max(0, Math.min(Y, Oe)), be = Math.round(ve / Z * 1e3) / 10, Ie = Math.round(Be / Y * 1e3) / 10;
      p({ xPct: be, yPct: Ie });
    }, W = (O) => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", W), window.removeEventListener("pointercancel", W);
      const H = l.current;
      if (l.current = null, v(!1), !H) return;
      if (!H.hasMoved) {
        y();
        return;
      }
      const R = Math.max(1, H.parentRect.width - H.clockWidth - 28), oe = Math.max(1, H.parentRect.height - H.clockHeight - 28), te = O.clientX - H.parentRect.left - H.offsetX - 14, Z = O.clientY - H.parentRect.top - H.offsetY - 14, Y = Math.max(0, Math.min(R, te)), Re = Math.max(0, Math.min(oe, Z)), Oe = Y / R * 100, ve = Re / oe * 100;
      let Be;
      Oe > 94 && ve < 6 ? Be = "top-right" : Oe < 6 && ve < 6 ? Be = "top-left" : Oe > 94 && ve > 94 ? Be = "bottom-right" : Oe < 6 && ve > 94 ? Be = "bottom-left" : Be = `custom:${Oe.toFixed(1)},${ve.toFixed(1)}`, a(Be);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", Be);
      } catch {
      }
      n && n(Be);
    };
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", W), window.addEventListener("pointercancel", W);
  }, [y, n]), C = new Date(e || Date.now()), _ = C.getUTCFullYear(), w = String(C.getUTCMonth() + 1).padStart(2, "0"), g = String(C.getUTCDate()).padStart(2, "0"), x = String(C.getUTCHours()).padStart(2, "0"), I = String(C.getUTCMinutes()).padStart(2, "0"), j = String(C.getUTCSeconds()).padStart(2, "0"), M = `${_}-${w}-${g}`, h = `${x}:${I}:${j} UTC`, A = f !== null || c.isCustom, k = f || (c.isCustom ? { xPct: c.xPct, yPct: c.yPct } : null);
  let N;
  if (k) {
    const $ = k.xPct / 100, U = k.yPct / 100;
    N = {
      left: `calc(14px + (100% - 28px) * ${$})`,
      top: `calc(14px + (100% - 28px) * ${U})`,
      transform: `translate(-${k.xPct}%, -${k.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const P = !A && c.preset ? `corner-${c.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${P} ${d ? "is-dragging" : ""} ${A ? "is-custom" : ""}`,
      style: N,
      onPointerDown: S,
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
function Jg() {
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
function Zg(e) {
  const t = tn(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function qg(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function ex({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var C, _, w, g, x, I;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let j = 0; j < e.length; j++)
    if (e[j].timestampEpochMs <= t)
      l = e[j], o = e[j + 1] || e[j];
    else {
      o === l && e[j] && (o = e[j]);
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
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const d = (t - c) / a, v = tn(d, 0, 1), f = i === "linear" ? v : Zg(v), p = ((x = l.layout) == null ? void 0 : x.placements) || [], y = ((I = o.layout) == null ? void 0 : I.placements) || [], S = y.map((j) => {
    const M = p.find((z) => z.stationId === j.stationId && z.displayId === j.displayId);
    if (!M)
      return {
        ...j,
        opacity: Math.max(0.05, f)
      };
    const h = Math.round(M.x + (j.x - M.x) * f), A = Math.round(M.y + (j.y - M.y) * f), k = Math.round(M.width + (j.width - M.width) * f), N = Math.round(M.height + (j.height - M.height) * f), P = Number(((M.rotation || 0) + ((j.rotation || 0) - (M.rotation || 0)) * f).toFixed(1));
    return {
      ...j,
      x: h,
      y: A,
      width: k,
      height: N,
      rotation: P,
      opacity: 1
    };
  });
  return p.forEach((j) => {
    y.some((h) => h.stationId === j.stationId && h.displayId === j.displayId) || S.push({
      ...j,
      opacity: Math.max(0, 1 - f)
    });
  }), S;
}
function tx({
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
  }, f = [...c, v].sort((S, C) => S.timestampEpochMs - C.timestampEpochMs), p = f.findIndex((S) => S.id === v.id);
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
function nx(e, t) {
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
function sx(e, t = [], n = [], r = null, l = null, o = "mon-0") {
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
], rx = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function lx(e, t, n) {
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
      const f = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: p, y, width: S, height: C } = or(v * c, 0, c, n, f);
      return {
        ...d,
        x: p,
        y,
        width: S,
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
      return e.slice(0, 3).map((y, S) => {
        const C = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: _, y: w, width: g, height: x } = or(S * p, 0, p, n, C);
        return {
          ...y,
          x: _,
          y: w,
          width: g,
          height: x,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: C,
          aspectRatio: C,
          zIndex: S,
          rotation: 0,
          borderWidth: 2,
          borderColor: jt[S % jt.length],
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
      const S = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: C, cy: _ } = f[y], { x: w, y: g, width: x, height: I } = or(C, _, d, v, S);
      return {
        ...p,
        x: w,
        y: g,
        width: x,
        height: I,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: S,
        aspectRatio: S,
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
      const y = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 1.7777777777777777), { cx: S, cy: C } = v[p], { x: _, y: w, width: g, height: x } = or(S, C, c, d, y);
      return {
        ...f,
        x: _,
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
    const v = d % l, f = Math.floor(d / l), p = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: S, width: C, height: _ } = or(v * a, f * i, a, i, p);
    return {
      ...c,
      x: y,
      y: S,
      width: C,
      height: _,
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
function ox({
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
  totalDurationMs: C,
  inPointMs: _ = 0,
  outPointMs: w,
  setPlayheadMs: g,
  globalGaps: x = [],
  recordingSegments: I = {},
  playbackSpeed: j = 1,
  onChangePlaybackSpeed: M,
  keystrokeMode: h = "BurnIn",
  keystrokes: A = [],
  directorPlan: k = null,
  onOverrideDisplay: N,
  onResetOverride: P,
  compositionLayout: z = "canvas",
  onChangeCompositionLayout: $,
  isAutoDirectorEnabled: U = !0,
  onToggleAutoDirector: le,
  onUpdateCanvasLayout: se,
  canvasLayoutTimeline: V = null,
  onUpdateCanvasLayoutTimeline: b,
  activeKfIndex: W = 0,
  setActiveKfIndex: O,
  isModalOpen: H = !1,
  isGridFullscreen: R = void 0,
  onToggleGridFullscreen: oe = null
}) {
  const te = f > 0 ? f : d + v, [Z, Y] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Re, Oe] = u.useState(() => {
    var m;
    return ((m = t[0]) == null ? void 0 : m.id) || null;
  }), [ve, Be] = u.useState(!1), [be, Ie] = u.useState(null), [et, at] = u.useState({ index: null, position: null }), [ie, je] = u.useState(!1), [ze, Ye] = u.useState(!1), [ge, pe] = u.useState(!1), [ae, Me] = u.useState(!1), [L, ne] = u.useState(""), [X, ee] = u.useState(""), Q = u.useRef(null), [J, de] = u.useState(() => {
    try {
      const m = localStorage.getItem("itb_canvas_saved_presets");
      return m ? JSON.parse(m) : [];
    } catch {
      return [];
    }
  }), qe = (m) => {
    de(m);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(m));
    } catch {
    }
  }, [_e, Xe] = u.useState(!1), lt = R !== void 0 ? R : _e, [Ge, It] = u.useState(!1);
  u.useRef(null);
  const $t = u.useRef(null), Rt = u.useRef(null), Lt = u.useRef(null), [rt, xt] = u.useState({ width: 960, height: 540 }), [He, Fe] = u.useState(0), [vt, Ot] = u.useState(!1), [Gt, Kt] = u.useState(null), [dn, De] = u.useState(""), Le = u.useRef(null), [nt, ce] = u.useState("");
  u.useEffect(() => {
    Gt !== null && Le.current && (Le.current.focus(), Le.current.select());
  }, [Gt]), u.useEffect(() => {
    const m = (E) => {
      E.key === "Escape" && Ot(!1);
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, []);
  const [st, K] = u.useState(!1), [fe, xe] = u.useState(!1), [Ue, Je] = u.useState(!1), [it, ft] = u.useState(!1), [Ze, Nt] = u.useState(!1), [wt, Bt] = u.useState({ vertical: null, horizontal: null }), [Tt, an] = u.useState(!0), [An, wn] = u.useState(!0), [Bn, $s] = u.useState(null), [Dt, Rs] = u.useState({ x: 0, y: 0, isInside: !1 }), Ys = u.useRef(null), Zt = u.useRef(null), $n = u.useRef(!1), [ln, Qt] = u.useState("auto-grid"), Vt = u.useRef([]), rs = u.useRef([]), ls = u.useRef(null), [, Xs] = u.useState(0), js = u.useRef(null), [mn, Cr] = u.useState(null), yn = u.useCallback((m, E = "success", D = "💾") => {
    js.current && clearTimeout(js.current), Cr({ text: m, type: E, icon: D }), js.current = setTimeout(() => {
      Cr(null), js.current = null;
    }, 2200);
  }, []), [kt, ps] = u.useState(() => {
    var D, q, G, B, ue, Te;
    const m = (G = (q = (D = V == null ? void 0 : V.keyframes) == null ? void 0 : D[0]) == null ? void 0 : q.layout) == null ? void 0 : G.width, E = (Te = (ue = (B = V == null ? void 0 : V.keyframes) == null ? void 0 : B[0]) == null ? void 0 : ue.layout) == null ? void 0 : Te.height;
    if (m && E) {
      const ye = os.find((Se) => Se.w === m && Se.h === E);
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
  }, []), Gs = u.useMemo(() => os.find((m) => m.id === kt) || os[0], [kt]), Ae = Gs.w, Pe = Gs.h, ms = Gs.ratio, $o = u.useMemo(() => {
    const m = [], E = Ae >= 3e3 ? 200 : 100, D = E / 2, q = E / 10;
    for (let G = 0; G <= Ae; G += q) {
      const B = G % E === 0, ue = !B && G % D === 0;
      m.push({ val: G, isMajor: B, isMed: ue });
    }
    return m;
  }, [Ae]), Ro = u.useMemo(() => {
    const m = [];
    for (let G = 0; G <= Pe; G += 10) {
      const B = G % 100 === 0, ue = !B && G % 50 === 0;
      m.push({ val: G, isMajor: B, isMed: ue });
    }
    return m;
  }, [Pe]), Lo = u.useCallback((m) => {
    const E = Ys.current || Rt.current;
    if (!E) return;
    const D = E.getBoundingClientRect(), q = tn(Math.round((m.clientX - D.left) / D.width * Ae), 0, Ae), G = tn(Math.round((m.clientY - D.top) / D.height * Pe), 0, Pe);
    Rs({ x: q, y: G, isInside: !0 });
  }, [Ae, Pe]), ii = u.useCallback(() => {
    Rs((m) => ({ ...m, isInside: !1 }));
  }, []), Ls = u.useCallback(() => {
    const m = Lt.current;
    if (!m) return;
    const E = m.getBoundingClientRect(), q = Math.max(320, Math.floor(E.width || 960) - 104 - 16), G = Math.max(180, Math.floor(E.height || 540) - 16);
    let B, ue;
    Gn ? (B = q, ue = Math.round(B / ms)) : q / G >= ms ? (ue = G, B = Math.round(ue * ms)) : (B = q, ue = Math.round(B / ms)), xt((Te) => Te.width === B && Te.height === ue ? Te : { width: B, height: ue });
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
    const D = E.displays && E.displays.length > 0 ? E.displays : E.topology && E.topology.displays && E.topology.displays.length > 0 ? E.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: E.width || 1920, height: E.height || 1080 }], q = D.find((ye) => ye.isPrimary) || D[0], G = q.width || q.Width || E.width || 1920, B = q.height || q.Height || E.height || 1080, ue = G && B ? G / B : 16 / 9, Te = D.length > 1;
    return {
      stationId: E.id,
      displayId: "auto",
      label: `${E.displayName || E.roleAlias || E.hostname || E.name} - ${Te ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: E.displayName || E.roleAlias || E.hostname || E.name,
      stationHostname: E.hostname || E.id,
      isPrimary: !0,
      sourceWidth: G,
      sourceHeight: B,
      nativeAspectRatio: ue,
      aspectRatio: ue,
      width: G,
      height: B
    };
  }), [t, n]), hn = u.useMemo(() => {
    const m = t && t.length > 0 ? t : n, E = [];
    return m.forEach((D) => {
      const q = D.displays && D.displays.length > 0 ? D.displays : D.topology && D.topology.displays && D.topology.displays.length > 0 ? D.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: D.width || 1920, height: D.height || 1080 }], G = q.find((ye) => ye.isPrimary) || q[0], B = G.width || G.Width || D.width || 1920, ue = G.height || G.Height || D.height || 1080, Te = B / ue;
      E.push({
        stationId: D.id,
        displayId: "auto",
        label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${q.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: D.displayName || D.roleAlias || D.hostname || D.name,
        stationHostname: D.hostname || D.id,
        isPrimary: !0,
        sourceWidth: B,
        sourceHeight: ue,
        nativeAspectRatio: Te,
        aspectRatio: Te,
        width: B,
        height: ue
      }), q.length > 1 && q.forEach((ye, Se) => {
        const mt = (ye.displayId || `mon-${Se}`).toLowerCase(), dt = ye.displayNumber || Se + 1, ht = ye.displayName || `Screen ${dt}`, Ne = ye.width || ye.Width || D.width || 1920, ct = ye.height || ye.Height || D.height || 1080, Pt = Ne / ct;
        E.push({
          stationId: D.id,
          displayId: mt,
          label: `${D.displayName || D.roleAlias || D.hostname || D.name} - ${ht}`,
          stationName: D.displayName || D.roleAlias || D.hostname || D.name,
          stationHostname: D.hostname || D.id,
          isPrimary: !!ye.isPrimary,
          sourceWidth: Ne,
          sourceHeight: ct,
          nativeAspectRatio: Pt,
          aspectRatio: Pt,
          width: Ne,
          height: ct
        });
      });
    }), E;
  }, [t, n]), [fn, cn] = u.useState(() => {
    var m;
    if (((m = V == null ? void 0 : V.keyframes) == null ? void 0 : m.length) > 0) {
      const E = JSON.parse(JSON.stringify(V));
      if (t && t.length > 0) {
        const D = new Set(t.map((G) => G.id));
        if (E.keyframes.forEach((G) => {
          var B, ue;
          ((ue = (B = G.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0 && (G.layout.placements = G.layout.placements.filter((Te) => D.has(Te.stationId)));
        }), E.keyframes.some((G) => {
          var B, ue;
          return ((ue = (B = G.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0;
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
    if (((m = V == null ? void 0 : V.keyframes) == null ? void 0 : m.length) > 0) {
      const E = JSON.parse(JSON.stringify(V));
      if (t && t.length > 0) {
        const q = new Set(t.map((G) => G.id));
        E.keyframes.forEach((G) => {
          var B, ue;
          ((ue = (B = G.layout) == null ? void 0 : B.placements) == null ? void 0 : ue.length) > 0 && (G.layout.placements = G.layout.placements.filter((Te) => q.has(Te.stationId)));
        });
      }
      cn(E), E.keyframes.some((q) => {
        var G, B;
        return ((B = (G = q.layout) == null ? void 0 : G.placements) == null ? void 0 : B.length) > 0;
      }) && ($n.current = !0, Qt("custom"));
    }
  }, [V, t]);
  const En = fn.keyframes || [], Rl = u.useMemo(() => qg(En, te), [En, te]), T = tn(
    W ?? Rl,
    0,
    Math.max(0, En.length - 1)
  ), re = En[T] || En[Rl] || En[0], F = u.useMemo(() => {
    var m;
    return ((m = re == null ? void 0 : re.layout) == null ? void 0 : m.placements) || [];
  }, [re]);
  u.useEffect(() => {
    He >= 0 && F[He] ? ce(F[He].label ?? "") : ce("");
  }, [He, F]);
  const me = u.useCallback((m = "Action") => ({
    label: m,
    timeline: JSON.parse(JSON.stringify(fn)),
    aspectId: kt,
    presetId: ln,
    selectedFeedIndex: He
  }), [fn, kt, ln, He]), we = u.useCallback((m = "Action") => {
    const E = me(m);
    Vt.current.push(E), Vt.current.length > 50 && Vt.current.shift(), rs.current = [], Xs((D) => D + 1);
  }, [me]), Ce = u.useCallback(() => {
    ls.current && (Vt.current.push(ls.current), Vt.current.length > 50 && Vt.current.shift(), rs.current = [], ls.current = null, Xs((m) => m + 1));
  }, []), $e = u.useCallback(() => {
    const m = f > 0 ? f : d + v, E = 500;
    if (m <= d + E) return T;
    const D = (re == null ? void 0 : re.layout) || {
      width: Ae,
      height: Pe,
      backgroundColor: "#070A10",
      fps: 30,
      placements: F
    }, { nextTimeline: q, newIndex: G, isNew: B } = ah(fn, m, D, E);
    return B && (cn(q), b && b(q), O && O(G), yn(
      `Keyframe #${G + 1} created at ${Ct(m, p, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), G;
  }, [f, d, v, T, re, Ae, Pe, F, fn, b, O, p, yn]), he = u.useCallback((m, E = null) => {
    E && we(E);
    const D = f > 0 ? f : d + v;
    cn((q) => {
      const { nextTimeline: G, newIndex: B, isNewKeyframe: ue } = tx({
        prevTimeline: q,
        newPlacements: m,
        currentEpochMs: D,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Ae,
        virtualH: Pe,
        fps: 30
      });
      return b && b(G), O && O(B), ue && B > 0 && yn(
        `Keyframe #${B + 1} created at ${Ct(D, p, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), G;
    });
  }, [f, d, v, Ae, Pe, b, O, p, yn, we]);
  u.useEffect(() => {
    if (vn.length > 0 && (!F || F.length === 0) && !$n.current) {
      let m = kt;
      vn.length === 2 && kt === "16:9" && (m = "32:9", ps("32:9"));
      const E = os.find((q) => q.id === m) || os[0], D = tr(vn, E.w, E.h);
      D.length > 0 && (he(D), Qt("auto-grid"));
    }
  }, [vn, F, he, kt]);
  const Qe = u.useRef("");
  u.useEffect(() => {
    const m = (t || []).map((E) => E.id).sort().join(",");
    if (Qe.current === "") {
      Qe.current = m;
      return;
    }
    if (Qe.current !== m && (Qe.current = m, t && t.length > 0)) {
      const E = new Set(t.map((D) => D.id));
      if (ln === "auto-grid" || !$n.current) {
        let D = kt;
        vn.length === 2 && kt === "16:9" && (D = "32:9", ps("32:9"));
        const q = os.find((B) => B.id === D) || os[0], G = tr(vn, q.w, q.h);
        G.length > 0 && he(G);
      } else if (F && F.length > 0) {
        const D = F.filter((q) => E.has(q.stationId));
        if (D.length !== F.length)
          if (D.length === 0) {
            const q = tr(vn, Ae, Pe);
            he(q);
          } else
            he(D);
      }
    }
  }, [t, vn, ln, kt, F, he, Ae, Pe]), u.useEffect(() => {
    se && se({
      width: Ae,
      height: Pe,
      backgroundColor: "#070A10",
      fps: 30,
      placements: F,
      timeline: fn
    });
  }, [F, fn, se, Ae, Pe]);
  const Ke = u.useCallback((m) => {
    const E = Gs, D = os.find((q) => q.id === m) || os[0];
    if (E.id !== D.id)
      if (ps(D.id), $n.current) {
        const q = D.w / E.w, G = D.h / E.h, B = F.map((ue) => ({
          ...ue,
          x: Math.round(ue.x * q),
          y: Math.round(ue.y * G),
          width: Math.round(ue.width * q),
          height: Math.round(ue.height * G)
        }));
        he(B);
      } else {
        const q = vn.length > 0 ? vn : F && F.length > 0 ? F : hn, G = tr(q, D.w, D.h);
        he(G);
      }
  }, [Gs, F, hn, he]), Ve = u.useCallback((m) => {
    const E = F.length > 0 ? Math.max(...F.map((ye) => ye.zIndex || 0)) + 1 : 0, D = jt[F.length % jt.length], q = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 16 / 9), G = q >= 1 ? 640 : Math.round(360 * q), B = q >= 1 ? Math.round(640 / q) : 360, ue = {
      stationId: m.stationId,
      displayId: m.displayId,
      label: m.label,
      x: 100 + F.length * 40 % 800,
      y: 80 + F.length * 40 % 500,
      width: G,
      height: B,
      sourceWidth: m.sourceWidth || 1920,
      sourceHeight: m.sourceHeight || 1080,
      nativeAspectRatio: q,
      aspectRatio: q,
      zIndex: E,
      rotation: 0,
      borderWidth: 2,
      borderColor: D,
      shadowEffect: "deep",
      borderRadius: 0
    }, Te = [...F, ue];
    he(Te), Fe(Te.length - 1);
  }, [F, he]), tt = u.useCallback((m) => {
    const E = F.filter((D, q) => q !== m);
    he(E), Fe((D) => Math.max(0, D - 1));
  }, [F, he]), ot = u.useCallback(() => {
    he([]), Fe(-1);
  }, [he]), Mt = (m) => {
    const E = m.map((q, G) => ({ p: q, origIdx: G }));
    E.sort((q, G) => (q.p.zIndex ?? q.origIdx) - (G.p.zIndex ?? G.origIdx));
    const D = [...m];
    return E.forEach(({ origIdx: q }, G) => {
      D[q] = { ...D[q], zIndex: G + 1 };
    }), D;
  };
  u.useCallback((m = He) => {
    if (m < 0 || !F[m]) return;
    const E = Mt(F), D = E[m].zIndex, q = E.length;
    if (D >= q) return;
    const G = E.map((B, ue) => ue === m ? { ...B, zIndex: q } : B.zIndex > D ? { ...B, zIndex: B.zIndex - 1 } : B);
    he(G);
  }, [He, F, he]), u.useCallback((m = He) => {
    if (m < 0 || !F[m]) return;
    const E = Mt(F), D = E[m].zIndex;
    if (D <= 1) return;
    const q = E.map((G, B) => B === m ? { ...G, zIndex: 1 } : G.zIndex < D ? { ...G, zIndex: G.zIndex + 1 } : G);
    he(q);
  }, [He, F, he]);
  const qt = u.useCallback((m = He) => {
    if (m < 0 || !F[m]) return;
    const E = Mt(F), D = E[m].zIndex, q = D + 1;
    if (q > E.length) return;
    const G = E.map((B, ue) => ue === m ? { ...B, zIndex: q } : B.zIndex === q ? { ...B, zIndex: D } : B);
    he(G);
  }, [He, F, he]), Ut = u.useCallback((m = He) => {
    if (m < 0 || !F[m]) return;
    const E = Mt(F), D = E[m].zIndex, q = D - 1;
    if (q < 1) return;
    const G = E.map((B, ue) => ue === m ? { ...B, zIndex: q } : B.zIndex === q ? { ...B, zIndex: D } : B);
    he(G);
  }, [He, F, he]), en = u.useCallback((m) => {
    if (He < 0 || !F[He]) return;
    const E = F.map((D, q) => q === He ? { ...D, ...m } : D);
    he(E);
  }, [He, F, he]), Un = u.useCallback((m, E, D = !0) => {
    if (m < 0 || !F[m]) return;
    const q = typeof E == "string" ? E.trim() : "", G = q.length > 0 ? q : null;
    if (F[m].label === G) return;
    const B = F.map((ue, Te) => Te === m ? { ...ue, label: G } : ue);
    he(B, D ? "Rename Screen Title" : null);
  }, [F, he]), Mr = u.useCallback((m) => {
    if (m < 0 || !F[m]) {
      Kt(null);
      return;
    }
    Un(m, dn, !0), Kt(null);
  }, [F, dn, Un]), ci = u.useCallback((m = 90) => {
    const E = F[He];
    if (!E) return;
    const q = ((E.rotation || 0) + m) % 360;
    en({ rotation: q });
  }, [He, F, en]), br = u.useCallback((m = He) => {
    if (m < 0 || !F[m]) return;
    const E = F.length, D = F.map((q, G) => G === m ? {
      ...q,
      x: 0,
      y: 0,
      width: Ae,
      height: Pe,
      zIndex: E
    } : q);
    he(D);
  }, [He, F, he, Ae, Pe]), Qs = u.useCallback((m) => {
    let E = [];
    const D = vn.length > 0 ? vn : hn.length > 0 ? hn : F;
    switch (m) {
      case "auto":
      case "auto-grid":
        E = tr(D, Ae, Pe);
        break;
      case "1x1":
        D.length > 0 && (E = [{
          ...D[0],
          x: 0,
          y: 0,
          width: Ae,
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
          const q = Math.round(Ae / 2);
          E = D.slice(0, 2).map((G, B) => {
            const ue = G.nativeAspectRatio || (G.sourceWidth && G.sourceHeight ? G.sourceWidth / G.sourceHeight : 1.7777777777777777), { x: Te, y: ye, width: Se, height: mt } = or(B * q, 0, q, Pe, ue);
            return {
              ...G,
              x: Te,
              y: ye,
              width: Se,
              height: mt,
              sourceWidth: G.sourceWidth || 1920,
              sourceHeight: G.sourceHeight || 1080,
              nativeAspectRatio: ue,
              aspectRatio: ue,
              zIndex: B + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: jt[B % jt.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          E = tr(D, Ae, Pe);
        break;
      case "2x2": {
        const q = Math.round(Ae / 2), G = Math.round(Pe / 2);
        E = D.slice(0, 4).map((B, ue) => ({
          ...B,
          x: ue % 2 * q,
          y: Math.floor(ue / 2) * G,
          width: q,
          height: G,
          zIndex: ue,
          rotation: 0,
          borderWidth: 2,
          borderColor: jt[ue % jt.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (D.length >= 2) {
          E = [
            { ...D[0], x: 0, y: 0, width: Ae, height: Pe, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: jt[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const q = D.slice(1, 4), G = Math.round(Ae * 0.23), B = Math.round(G / (16 / 9));
          q.forEach((ue, Te) => {
            E.push({
              ...ue,
              x: Ae - G - 24,
              y: 24 + Te * (B + 16),
              width: G,
              height: B,
              zIndex: 10 + Te,
              rotation: 0,
              borderWidth: 3,
              borderColor: jt[(Te + 1) % jt.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (D.length >= 3) {
          const q = Math.round(Ae * 0.666), G = Ae - q, B = Math.round(Pe / 2);
          E = [
            { ...D[0], x: 0, y: 0, width: q, height: Pe, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: jt[0], shadowEffect: "deep", borderRadius: 0 },
            { ...D[1], x: q, y: 0, width: G, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: jt[1], shadowEffect: "deep", borderRadius: 0 },
            { ...D[2], x: q, y: B, width: G, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: jt[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (D.length >= 3)
          if (Ae / Pe >= 2.5) {
            const G = Math.round(Ae / 3);
            E = D.slice(0, 3).map((B, ue) => {
              const Te = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 1.7777777777777777), { x: ye, y: Se, width: mt, height: dt } = or(ue * G, 0, G, Pe, Te);
              return {
                ...B,
                x: ye,
                y: Se,
                width: mt,
                height: dt,
                sourceWidth: B.sourceWidth || 1920,
                sourceHeight: B.sourceHeight || 1080,
                nativeAspectRatio: Te,
                aspectRatio: Te,
                zIndex: ue,
                rotation: 0,
                borderWidth: 2,
                borderColor: jt[ue % jt.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const G = Math.round(Ae / 2), B = Math.round(Pe / 2);
            E = [
              { ...D[0], x: 0, y: 0, width: G, height: B, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: jt[0], shadowEffect: "deep", borderRadius: 0 },
              { ...D[1], x: G, y: 0, width: G, height: B, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: jt[1], shadowEffect: "deep", borderRadius: 0 },
              { ...D[2], x: Math.round(G / 2), y: B, width: G, height: B, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: jt[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    E.length > 0 && (he(E), Fe(0), m === "auto" || m === "auto-grid" ? Qt("auto-grid") : (Qt(m), $n.current = !0));
  }, [hn, F, he, Ae, Pe]), Uu = u.useCallback(() => {
    const m = L.trim() || `Custom Layout ${J.length + 1}`, D = [{
      id: `preset-${Date.now()}`,
      name: m,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(F)),
      keyframes: JSON.parse(JSON.stringify(En))
    }, ...J];
    qe(D), ne(""), je(!1);
  }, [L, J, F, En]), Qp = u.useCallback((m) => {
    !m || !m.placements || (he(m.placements), Fe(0), Qt("custom"), $n.current = !0, Ye(!1));
  }, [he]), Jp = u.useCallback((m, E) => {
    E == null || E.stopPropagation();
    const D = J.filter((q) => q.id !== m);
    qe(D);
  }, [J]), Zp = u.useCallback(() => {
    const m = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Ae,
      height: Pe,
      aspectRatio: kt,
      placements: F,
      timeline: fn
    }, E = JSON.stringify(m, null, 2), D = new window.Blob([E], { type: "application/json" }), q = window.URL.createObjectURL(D), G = document.createElement("a"), B = /* @__PURE__ */ new Date(), ue = (ye) => String(ye).padStart(2, "0"), Te = `${B.getFullYear()}${ue(B.getMonth() + 1)}${ue(B.getDate())}_${ue(B.getHours())}${ue(B.getMinutes())}${ue(B.getSeconds())}`;
    G.href = q, G.download = `canvas_layout_${Te}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), window.URL.revokeObjectURL(q);
  }, [F, fn, Ae, Pe, kt]), qp = u.useCallback((m) => {
    var q;
    const E = (q = m.target.files) == null ? void 0 : q[0];
    if (!E) return;
    const D = new window.FileReader();
    D.onload = (G) => {
      var B, ue, Te;
      try {
        const ye = JSON.parse(G.target.result);
        if (ye.width && ye.height) {
          const mt = os.find((dt) => dt.w === ye.width && dt.h === ye.height);
          mt && ps(mt.id);
        } else if (ye.aspectRatio) {
          const mt = os.find((dt) => dt.id === ye.aspectRatio);
          mt && ps(mt.id);
        }
        let Se = null;
        Array.isArray(ye) ? Se = ye : ye.placements && Array.isArray(ye.placements) ? Se = ye.placements : (B = ye.layout) != null && B.placements && Array.isArray(ye.layout.placements) && (Se = ye.layout.placements), Se && Se.length > 0 && (he(Se), Fe(0), Qt("custom"), $n.current = !0), ((Te = (ue = ye.timeline) == null ? void 0 : ue.keyframes) == null ? void 0 : Te.length) > 0 && (cn(ye.timeline), b && b(ye.timeline));
      } catch (ye) {
        console.error("Failed to parse imported canvas JSON:", ye), alert(`Canvas Import Error: ${ye.message}`);
      }
    }, D.readAsText(E), m.target.value = "";
  }, [he, b]), ui = (m, E) => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Fe(E), $n.current = !0, Qt("custom");
    const D = $e(), q = Ys.current || Rt.current;
    if (!q) return;
    const G = q.getBoundingClientRect(), B = F[E];
    if (!B) return;
    ls.current = me("Move Feed"), Zt.current = {
      mode: "drag",
      index: E,
      startX: m.clientX,
      startY: m.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      scaleX: Ae / G.width,
      scaleY: Pe / G.height,
      activeSnapZone: null
    }, ft(!0);
    const ue = (ye) => {
      if (!Zt.current || Zt.current.mode !== "drag") return;
      const Se = Zt.current, mt = Ys.current || Rt.current;
      if (!mt) return;
      const dt = mt.getBoundingClientRect(), ht = (ye.clientX - Se.startX) * Se.scaleX, Ne = (ye.clientY - Se.startY) * Se.scaleY;
      let ct = Math.round(Se.initialX + ht), Pt = Math.round(Se.initialY + Ne);
      ct = tn(ct, 0, Ae - Se.initialW), Pt = tn(Pt, 0, Pe - Se.initialH);
      const gt = An && !ye.altKey;
      let Et = null, Rn = null, Qn = null;
      if (gt) {
        const Wt = ye.clientX - dt.left, At = ye.clientY - dt.top, _t = 32, Ee = Math.round(Ae / 2), yt = Math.round(Pe / 2);
        if (Wt <= _t ? At <= dt.height * 0.22 ? Et = { x: 0, y: 0, width: Ee, height: yt, label: "◰ Top-Left Quarter" } : At >= dt.height * 0.78 ? Et = { x: 0, y: yt, width: Ee, height: yt, label: "◱ Bottom-Left Quarter" } : Et = { x: 0, y: 0, width: Ee, height: Pe, label: "◧ Left Half (50%)" } : Wt >= dt.width - _t ? At <= dt.height * 0.22 ? Et = { x: Ee, y: 0, width: Ee, height: yt, label: "◲ Top-Right Quarter" } : At >= dt.height * 0.78 ? Et = { x: Ee, y: yt, width: Ee, height: yt, label: "◳ Bottom-Right Quarter" } : Et = { x: Ee, y: 0, width: Ee, height: Pe, label: "◨ Right Half (50%)" } : At <= _t && Wt >= dt.width * 0.25 && Wt <= dt.width * 0.75 && (Et = { x: 0, y: 0, width: Ae, height: Pe, label: "🗖 Full Canvas Maximize" }), !Et) {
          const Ir = F.filter((ut, Tr) => Tr !== Se.index), qs = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Ae, targetX: Ae - Se.initialW, guide: 100 },
            { snapTo: Ee, targetX: Ee - Math.round(Se.initialW / 2), guide: 50 }
          ];
          Ir.forEach((ut) => {
            qs.push({ snapTo: ut.x, targetX: ut.x, guide: ut.x / Ae * 100 }), qs.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width - Se.initialW, guide: (ut.x + ut.width) / Ae * 100 }), qs.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width, guide: (ut.x + ut.width) / Ae * 100 }), qs.push({ snapTo: ut.x, targetX: ut.x - Se.initialW, guide: ut.x / Ae * 100 });
          });
          let Vu = 18;
          qs.forEach((ut) => {
            const Tr = Math.abs(ct - ut.targetX);
            Tr < Vu && (Vu = Tr, ct = ut.targetX, Rn = ut.guide);
          });
          const Ll = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Pe, targetY: Pe - Se.initialH, guide: 100 },
            { snapTo: yt, targetY: yt - Math.round(Se.initialH / 2), guide: 50 }
          ];
          Ir.forEach((ut) => {
            Ll.push({ snapTo: ut.y, targetY: ut.y, guide: ut.y / Pe * 100 }), Ll.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height - Se.initialH, guide: (ut.y + ut.height) / Pe * 100 }), Ll.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height, guide: (ut.y + ut.height) / Pe * 100 }), Ll.push({ snapTo: ut.y, targetY: ut.y - Se.initialH, guide: ut.y / Pe * 100 });
          });
          let Yu = 18;
          Ll.forEach((ut) => {
            const Tr = Math.abs(Pt - ut.targetY);
            Tr < Yu && (Yu = Tr, Pt = ut.targetY, Qn = ut.guide);
          });
        }
      }
      Se.activeSnapZone = Et, Se.latestX = ct, Se.latestY = Pt, $s(Et), Bt({ vertical: Rn, horizontal: Qn }), cn((Wt) => {
        const At = [...Wt.keyframes || []], _t = D < At.length ? D : T;
        if (!At[_t]) return Wt;
        const Ee = [...At[_t].layout.placements || []];
        return Ee[Se.index] ? (Ee[Se.index] = { ...Ee[Se.index], x: ct, y: Pt }, At[_t] = {
          ...At[_t],
          layout: { ...At[_t].layout, placements: Ee }
        }, { ...Wt, keyframes: At }) : Wt;
      });
    }, Te = () => {
      var ye;
      if (ft(!1), Bt({ vertical: null, horizontal: null }), (ye = Zt.current) != null && ye.activeSnapZone) {
        const Se = Zt.current.activeSnapZone, mt = Zt.current.index;
        cn((dt) => {
          const ht = [...dt.keyframes || []], Ne = D < ht.length ? D : T;
          if (!ht[Ne]) return dt;
          const ct = [...ht[Ne].layout.placements || []];
          return ct[mt] ? (ct[mt] = {
            ...ct[mt],
            x: Se.x,
            y: Se.y,
            width: Se.width,
            height: Se.height
          }, ht[Ne] = {
            ...ht[Ne],
            layout: { ...ht[Ne].layout, placements: ct }
          }, { ...dt, keyframes: ht }) : dt;
        });
      }
      if (Zt.current) {
        const Se = Zt.current, mt = Se.initialX, dt = Se.initialY, ht = Se.activeSnapZone ? Se.activeSnapZone.x : Se.latestX ?? mt, Ne = Se.activeSnapZone ? Se.activeSnapZone.y : Se.latestY ?? dt;
        ht !== mt || Ne !== dt ? (Ce(), b && cn((ct) => (b(ct), ct))) : ls.current = null;
      }
      $s(null), Zt.current = null, window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", Te);
    };
    window.addEventListener("mousemove", ue), window.addEventListener("mouseup", Te);
  }, Oo = (m, E, D = "br") => {
    if (m.button !== 0) return;
    m.stopPropagation(), m.preventDefault(), Fe(E), $n.current = !0, Qt("custom");
    const q = $e();
    if (!Rt.current) return;
    const G = Rt.current.getBoundingClientRect(), B = F[E];
    if (!B) return;
    ls.current = me("Resize Feed");
    const ue = hn.find((ht) => ht.stationId === B.stationId && ht.displayId === B.displayId), Te = B.sourceWidth || (ue == null ? void 0 : ue.sourceWidth) || 1920, ye = B.sourceHeight || (ue == null ? void 0 : ue.sourceHeight) || 1080, Se = B.nativeAspectRatio || B.aspectRatio || (ue == null ? void 0 : ue.nativeAspectRatio) || Te / ye || B.width / B.height || 16 / 9;
    Zt.current = {
      mode: "resize",
      corner: D,
      index: E,
      startX: m.clientX,
      startY: m.clientY,
      initialX: B.x,
      initialY: B.y,
      initialW: B.width,
      initialH: B.height,
      sourceWidth: Te,
      sourceHeight: ye,
      nativeAspectRatio: Se,
      scaleX: Ae / G.width,
      scaleY: Pe / G.height
    }, Nt(!0);
    const mt = (ht) => {
      if (!Zt.current || Zt.current.mode !== "resize") return;
      const Ne = Zt.current, ct = (ht.clientX - Ne.startX) * Ne.scaleX, Pt = (ht.clientY - Ne.startY) * Ne.scaleY, gt = ht.ctrlKey || ht.shiftKey || ht.metaKey, Et = Ne.nativeAspectRatio > 0 ? Ne.nativeAspectRatio : Ne.initialW / Ne.initialH;
      let Rn = Ne.initialX, Qn = Ne.initialY, Wt = Ne.initialW, At = Ne.initialH;
      if (Ne.corner === "br") {
        const _t = Ae - Ne.initialX, Ee = Pe - Ne.initialY;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(Ne.initialW + ct))), pt = Math.round(yt / Et);
          pt > Ee && (pt = Ee, yt = Math.round(pt * Et)), pt < 90 && (pt = 90, yt = Math.round(pt * Et)), Wt = yt, At = pt;
        } else
          Wt = tn(Math.round(Ne.initialW + ct), 160, _t), At = tn(Math.round(Ne.initialH + Pt), 90, Ee);
      } else if (Ne.corner === "bl") {
        const _t = Ne.initialX + Ne.initialW, Ee = Pe - Ne.initialY;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(Ne.initialW - ct))), pt = Math.round(yt / Et);
          pt > Ee && (pt = Ee, yt = Math.round(pt * Et)), pt < 90 && (pt = 90, yt = Math.round(pt * Et)), Wt = yt, At = pt, Rn = Ne.initialX + Ne.initialW - Wt;
        } else
          Wt = tn(Math.round(Ne.initialW - ct), 160, _t), At = tn(Math.round(Ne.initialH + Pt), 90, Ee), Rn = Ne.initialX + Ne.initialW - Wt;
      } else if (Ne.corner === "tr") {
        const _t = Ae - Ne.initialX, Ee = Ne.initialY + Ne.initialH;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(Ne.initialW + ct))), pt = Math.round(yt / Et);
          pt > Ee && (pt = Ee, yt = Math.round(pt * Et)), pt < 90 && (pt = 90, yt = Math.round(pt * Et)), Wt = yt, At = pt, Qn = Ne.initialY + Ne.initialH - At;
        } else
          Wt = tn(Math.round(Ne.initialW + ct), 160, _t), At = tn(Math.round(Ne.initialH - Pt), 90, Ee), Qn = Ne.initialY + Ne.initialH - At;
      } else if (Ne.corner === "tl") {
        const _t = Ne.initialX + Ne.initialW, Ee = Ne.initialY + Ne.initialH;
        if (gt) {
          let yt = Math.max(160, Math.min(_t, Math.round(Ne.initialW - ct))), pt = Math.round(yt / Et);
          pt > Ee && (pt = Ee, yt = Math.round(pt * Et)), pt < 90 && (pt = 90, yt = Math.round(pt * Et)), Wt = yt, At = pt, Rn = Ne.initialX + Ne.initialW - Wt, Qn = Ne.initialY + Ne.initialH - At;
        } else
          Wt = tn(Math.round(Ne.initialW - ct), 160, _t), At = tn(Math.round(Ne.initialH - Pt), 90, Ee), Rn = Ne.initialX + Ne.initialW - Wt, Qn = Ne.initialY + Ne.initialH - At;
      }
      cn((_t) => {
        const Ee = [..._t.keyframes || []], yt = q < Ee.length ? q : T;
        if (!Ee[yt]) return _t;
        const pt = [...Ee[yt].layout.placements || []];
        return pt[Ne.index] ? (pt[Ne.index] = {
          ...pt[Ne.index],
          x: Rn,
          y: Qn,
          width: Wt,
          height: At,
          sourceWidth: Ne.sourceWidth,
          sourceHeight: Ne.sourceHeight,
          nativeAspectRatio: Ne.nativeAspectRatio,
          aspectRatio: Ne.nativeAspectRatio
        }, Ee[yt] = {
          ...Ee[yt],
          layout: { ...Ee[yt].layout, placements: pt }
        }, { ..._t, keyframes: Ee }) : _t;
      });
    }, dt = () => {
      if (Zt.current) {
        const ht = Zt.current, Ne = ht.latestW ?? ht.initialW, ct = ht.latestH ?? ht.initialH;
        Ne !== ht.initialW || ct !== ht.initialH ? (Ce(), b && cn((Pt) => (b(Pt), Pt))) : ls.current = null;
      }
      Nt(!1), Zt.current = null, window.removeEventListener("mousemove", mt), window.removeEventListener("mouseup", dt);
    };
    window.addEventListener("mousemove", mt), window.addEventListener("mouseup", dt);
  }, em = u.useCallback((m) => {
    const E = F[m];
    if (!E) return;
    const D = hn.find((Te) => Te.stationId === E.stationId && Te.displayId === E.displayId), q = E.nativeAspectRatio || E.aspectRatio || (D == null ? void 0 : D.nativeAspectRatio) || (E.sourceWidth && E.sourceHeight ? E.sourceWidth / E.sourceHeight : 16 / 9);
    let G = E.width, B = Math.round(G / q);
    E.y + B > Pe && (B = Pe - E.y, G = Math.round(B * q)), E.x + G > Ae && (G = Ae - E.x, B = Math.round(G / q));
    const ue = F.map((Te, ye) => ye === m ? {
      ...Te,
      width: Math.max(160, G),
      height: Math.max(90, B),
      sourceWidth: E.sourceWidth || (D == null ? void 0 : D.sourceWidth) || 1920,
      sourceHeight: E.sourceHeight || (D == null ? void 0 : D.sourceHeight) || 1080,
      nativeAspectRatio: q,
      aspectRatio: q
    } : Te);
    he(ue, "Snap Native Aspect");
  }, [F, hn, he]), di = u.useCallback(() => {
    if (Vt.current.length === 0) return;
    const m = me("Redo State");
    rs.current.push(m), rs.current.length > 50 && rs.current.shift();
    const E = Vt.current.pop();
    E && (cn(E.timeline), b && b(E.timeline), E.aspectId && E.aspectId !== kt && ps(E.aspectId), E.presetId && Qt(E.presetId), E.selectedFeedIndex !== void 0 && Fe(E.selectedFeedIndex), $n.current = !0, Xs((D) => D + 1), yn(`Undo: ${E.label || "Previous State"}`, "undo", "↺"));
  }, [me, b, kt, yn]), hi = u.useCallback(() => {
    if (rs.current.length === 0) return;
    const m = me("Undo State");
    Vt.current.push(m), Vt.current.length > 50 && Vt.current.shift();
    const E = rs.current.pop();
    E && (cn(E.timeline), b && b(E.timeline), E.aspectId && E.aspectId !== kt && ps(E.aspectId), E.presetId && Qt(E.presetId), E.selectedFeedIndex !== void 0 && Fe(E.selectedFeedIndex), $n.current = !0, Xs((D) => D + 1), yn(`Redo: ${E.label || "Restored State"}`, "info", "↻"));
  }, [me, b, kt, yn]), Wu = u.useCallback(() => {
    const E = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(F)),
      keyframes: JSON.parse(JSON.stringify(En)),
      aspectId: kt,
      width: Ae,
      height: Pe
    }, ...J.filter((D) => D.id !== "preset-quicksave")];
    qe(E);
    try {
      Op({
        canvasLayoutTimeline: fn,
        selectedAspectId: kt,
        selectedPresetId: ln,
        isFullWidth: Gn
      });
    } catch (D) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", D);
    }
    yn(`State Saved (${Ae}×${Pe} • ${F.length} Feeds)`, "success", "💾");
  }, [F, En, kt, Ae, Pe, J, qe, fn, ln, Gn, yn]);
  u.useEffect(() => {
    const m = () => di(), E = () => hi(), D = () => Wu();
    return window.addEventListener("itb:studio-undo", m), window.addEventListener("itb:studio-redo", E), window.addEventListener("itb:studio-save-now", D), () => {
      window.removeEventListener("itb:studio-undo", m), window.removeEventListener("itb:studio-redo", E), window.removeEventListener("itb:studio-save-now", D);
    };
  }, [di, hi, Wu]);
  const tm = u.useCallback(() => {
    if (oe) {
      oe();
      return;
    }
    Xe((m) => {
      const E = !m;
      if (E) {
        r && r(null);
        const D = $t.current;
        D && D.requestFullscreen && D.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return E;
    });
  }, [oe, r]), nm = u.useCallback(() => {
    const m = f > 0 ? f : d + v, { nextTimeline: E, newIndex: D, isNew: q } = ah(
      fn,
      m,
      (re == null ? void 0 : re.layout) || {
        width: Ae,
        height: Pe,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(F))
      }
    );
    q ? (we("Add Keyframe"), cn(E), b && b(E), O && O(D), yn(`Keyframe #${D + 1} created at ${Ct(m, p, { includeSeconds: !0 })}`, "success", "💎")) : (O && O(D), yn(`Jumped to existing Keyframe #${D + 1}`, "info", "💎"));
  }, [f, d, v, re, F, Ae, Pe, fn, b, O, p, yn, we]);
  u.useCallback(() => {
    if (En.length <= 1 || T === 0) {
      yn("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    we("Delete Keyframe");
    const { nextTimeline: m, success: E, newIndex: D } = nx(fn, T);
    E && (cn(m), b && b(m), O && O(D), yn("Keyframe deleted", "info", "🗑️"));
  }, [En, T, fn, b, O, yn, we]), u.useCallback((m) => {
    T !== 0 && (we("Update Transition Type"), cn((E) => {
      const D = Uc(E, T, { transitionType: m });
      return b && b(D), D;
    }));
  }, [T, b, we]), u.useCallback((m) => {
    T !== 0 && (we("Update Transition Duration"), cn((E) => {
      const D = Uc(E, T, { transitionDurationSec: m });
      return b && b(D), D;
    }));
  }, [T, b, we]), u.useEffect(() => {
    const m = (E) => {
      if (!(E.target.tagName === "INPUT" || E.target.tagName === "TEXTAREA" || E.target.isContentEditable)) {
        if (E.key === "Delete" || E.key === "Backspace") {
          He >= 0 && F[He] && (E.preventDefault(), tt(He));
          return;
        }
        if ((E.code === "Space" || E.key === " ") && S) {
          E.preventDefault(), S((D) => !D);
          return;
        }
        if ((E.key === "k" || E.key === "K") && !E.ctrlKey && !E.metaKey && !E.altKey) {
          E.preventDefault(), nm();
          return;
        }
        if (E.key === "Escape") {
          Be(!1), Ye(!1), xe(!1), K(!1), Je(!1), je(!1);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(E.key)) {
          if (He >= 0 && F[He]) {
            E.preventDefault(), $n.current = !0, Qt("custom");
            const D = E.shiftKey ? 1 : 10;
            let q = 0, G = 0;
            E.key === "ArrowLeft" && (q = -D), E.key === "ArrowRight" && (q = D), E.key === "ArrowUp" && (G = -D), E.key === "ArrowDown" && (G = D);
            const B = F[He], ue = tn(B.x + q, 0, Ae - B.width), Te = tn(B.y + G, 0, Pe - B.height), ye = F.map((Se, mt) => mt === He ? { ...Se, x: ue, y: Te } : Se);
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
  }, [He, F, tt, he, an, wn]);
  const zu = u.useMemo(() => ex({
    keyframes: En,
    currentEpochMs: te,
    currentPlacements: F,
    isEditing: it || Ze
  }), [it, Ze, En, te, F]), sm = u.useMemo(() => zu.map((m, E) => ({ ...m, originalIndex: E })).sort((m, E) => (m.zIndex ?? m.originalIndex) - (E.zIndex ?? E.originalIndex)), [zu]), Js = F[He] || null, { filteredPlaced: Zs, filteredUnplaced: Do } = u.useMemo(() => {
    const m = (X || "").toLowerCase(), E = F.map((B, ue) => {
      const Te = B.zIndex ?? ue + 1, ye = hn.find((Se) => Se.stationId === B.stationId && Se.displayId === B.displayId);
      return {
        type: "placed",
        origIdx: ue,
        placement: B,
        feed: ye,
        stationId: B.stationId,
        displayId: B.displayId,
        label: B.label || (ye == null ? void 0 : ye.label) || `${B.stationId} (${B.displayId})`,
        layerRank: Te,
        isSelected: ue === He,
        sourceWidth: B.sourceWidth || (ye == null ? void 0 : ye.sourceWidth) || 1920,
        sourceHeight: B.sourceHeight || (ye == null ? void 0 : ye.sourceHeight) || 1080
      };
    });
    E.sort((B, ue) => ue.layerRank - B.layerRank);
    const D = hn.filter((B) => !F.some((ue) => ue.stationId === B.stationId && ue.displayId === B.displayId)).map((B) => ({
      type: "unplaced",
      feed: B,
      stationId: B.stationId,
      displayId: B.displayId,
      label: B.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: B.sourceWidth || 1920,
      sourceHeight: B.sourceHeight || 1080
    })), q = m ? E.filter((B) => B.label.toLowerCase().includes(m)) : E, G = m ? D.filter((B) => B.label.toLowerCase().includes(m)) : D;
    return { filteredPlaced: q, filteredUnplaced: G };
  }, [F, hn, He, X]), Hu = u.useCallback((m, E) => {
    m.stopPropagation(), Ie(E), m.dataTransfer.effectAllowed = "copyMove", m.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: E.origIdx,
      type: E.type,
      stationId: E.stationId,
      displayId: E.displayId
    }));
  }, []), rm = u.useCallback((m, E) => {
    m.preventDefault(), m.stopPropagation(), m.dataTransfer.dropEffect = "move";
    const D = m.currentTarget.getBoundingClientRect(), q = D.top + D.height / 2, G = m.clientY < q ? "above" : "below";
    at((B) => B.index === E && B.position === G ? B : { index: E, position: G });
  }, []), lm = u.useCallback((m, E) => {
    m.stopPropagation(), at((D) => D.index === E ? { index: null, position: null } : D);
  }, []), Ku = u.useCallback(() => {
    Ie(null), at({ index: null, position: null });
  }, []), om = u.useCallback((m, E) => {
    m.preventDefault(), m.stopPropagation();
    const D = et;
    at({ index: null, position: null }), Ie(null);
    const q = m.dataTransfer.getData("text/plain");
    if (q)
      try {
        const G = JSON.parse(q);
        if (G.type === "placed") {
          const B = G.origIdx, ue = Zs.findIndex((ht) => ht.origIdx === B);
          if (ue === -1) return;
          let Te = E;
          if (D.position === "below" && (Te += 1), ue < Te && (Te -= 1), ue === Te) return;
          const ye = [...Zs], [Se] = ye.splice(ue, 1);
          ye.splice(Te, 0, Se);
          const mt = ye.length, dt = F.map((ht, Ne) => {
            const ct = ye.findIndex((Pt) => Pt.origIdx === Ne);
            return ct !== -1 ? {
              ...ht,
              zIndex: mt - ct
            } : ht;
          });
          he(dt), Fe(Se.origIdx);
        } else if (G.type === "unplaced") {
          const B = hn.find((Et) => Et.stationId === G.stationId && Et.displayId === G.displayId);
          if (!B) return;
          const ue = B.nativeAspectRatio || (B.sourceWidth && B.sourceHeight ? B.sourceWidth / B.sourceHeight : 16 / 9), Te = ue >= 1 ? 640 : Math.round(360 * ue), ye = ue >= 1 ? Math.round(640 / ue) : 360, Se = jt[F.length % jt.length];
          let mt = E;
          D.position === "below" && (mt += 1);
          const dt = {
            stationId: B.stationId,
            displayId: B.displayId,
            label: B.label,
            x: 100 + F.length * 40 % 800,
            y: 80 + F.length * 40 % 500,
            width: Te,
            height: ye,
            sourceWidth: B.sourceWidth || 1920,
            sourceHeight: B.sourceHeight || 1080,
            nativeAspectRatio: ue,
            aspectRatio: ue,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Se,
            shadowEffect: "deep",
            borderRadius: 0
          }, ht = [...F, dt], Ne = ht.length - 1, ct = [...Zs];
          ct.splice(mt, 0, { origIdx: Ne });
          const Pt = ct.length, gt = ht.map((Et, Rn) => {
            const Qn = ct.findIndex((Wt) => Wt.origIdx === Rn);
            return {
              ...Et,
              zIndex: Qn !== -1 ? Pt - Qn : 1
            };
          });
          he(gt), Fe(Ne);
        }
      } catch (G) {
        console.warn("Failed to handle layer drag drop:", G);
      }
  }, [et, Zs, F, hn, he]), am = u.useCallback((m) => {
    m.preventDefault();
    const E = m.dataTransfer.getData("text/plain");
    if (!(!E || !Rt.current))
      try {
        const D = JSON.parse(E), q = Rt.current.getBoundingClientRect(), G = m.clientX - q.left, B = m.clientY - q.top, ue = tn(Math.round(G / q.width * Ae), 0, Ae - 320), Te = tn(Math.round(B / q.height * Pe), 0, Pe - 180);
        if (D.type === "unplaced") {
          const ye = hn.find((Se) => Se.stationId === D.stationId && Se.displayId === D.displayId);
          if (ye) {
            const Se = ye.nativeAspectRatio || (ye.sourceWidth && ye.sourceHeight ? ye.sourceWidth / ye.sourceHeight : 1.7777777777777777), mt = Se >= 1 ? 640 : Math.round(360 * Se), dt = Se >= 1 ? Math.round(640 / Se) : 360, ht = F.length > 0 ? Math.max(...F.map((gt) => gt.zIndex || 0)) + 1 : 1, Ne = jt[F.length % jt.length], ct = {
              stationId: ye.stationId,
              displayId: ye.displayId,
              label: ye.label,
              x: tn(ue, 0, Ae - mt),
              y: tn(Te, 0, Pe - dt),
              width: mt,
              height: dt,
              sourceWidth: ye.sourceWidth || 1920,
              sourceHeight: ye.sourceHeight || 1080,
              nativeAspectRatio: Se,
              aspectRatio: Se,
              zIndex: ht,
              rotation: 0,
              borderWidth: 2,
              borderColor: Ne,
              shadowEffect: "deep",
              borderRadius: 0
            }, Pt = [...F, ct];
            he(Pt), Fe(Pt.length - 1);
          }
        } else if (D.type === "placed" && D.origIdx !== void 0) {
          const ye = F.map((Se, mt) => mt === D.origIdx ? {
            ...Se,
            x: tn(ue, 0, Ae - Se.width),
            y: tn(Te, 0, Pe - Se.height)
          } : Se);
          he(ye), Fe(D.origIdx);
        }
      } catch (D) {
        console.warn("Canvas drop failed:", D);
      }
  }, [hn, F, he, Ae, Pe]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: $t,
      className: `multicam-viewport-root canvas-grid ${lt ? "fullscreen-grid-active" : ""}`,
      children: [
        (it || Ze) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: it ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        mn && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${mn.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: mn.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: mn.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs("div", { ref: Lt, className: `canvas-stage-wrapper ${Gn ? "is-full-width-mode" : "is-fit-stage-mode"}`, children: [
          ve && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                  F.length,
                  " on canvas"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Be(!1), children: "✕" })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter workstations / displays...",
                value: X,
                onChange: (m) => ee(m.target.value)
              }
            ) }),
            /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
              Zs.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                  /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Zs.length })
                ] }),
                Zs.map((m, E) => {
                  const D = be && be.type === "placed" && be.origIdx === m.origIdx, G = et.index === E ? et.position === "above" ? "drop-above" : "drop-below" : "";
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row ${m.isSelected ? "is-selected" : ""} ${D ? "is-dragging-row" : ""} ${G}`,
                      draggable: !0,
                      onDragStart: (B) => Hu(B, m),
                      onDragOver: (B) => rm(B, E),
                      onDragLeave: (B) => lm(B, E),
                      onDrop: (B) => om(B, E),
                      onDragEnd: Ku,
                      onClick: () => Fe(m.origIdx),
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
                        /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (B) => B.stopPropagation(), children: [
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
                              onClick: () => tt(m.origIdx),
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
                  const E = be && be.type === "unplaced" && be.stationId === m.stationId && be.displayId === m.displayId;
                  return /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: `feed-layer-row unplaced ${E ? "is-dragging-row" : ""}`,
                      draggable: !0,
                      onDragStart: (D) => Hu(D, m),
                      onDragEnd: Ku,
                      onClick: () => Ve(m.feed),
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
                            onClick: () => Ve(m.feed),
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
                  className: `btn-wing-tool ${ve ? "active" : ""}`,
                  onClick: () => Be((m) => !m),
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
                    className: `btn-wing-tool ${ge ? "active" : ""}`,
                    onClick: () => {
                      pe((m) => !m), Me(!1);
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
                      className: `popout-item ${ln === "auto-grid" ? "active" : ""}`,
                      onClick: () => {
                        Qt("auto-grid"), Qs("auto-grid"), pe(!1);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                        /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                          const m = new Set((t && t.length > 0 ? t : n).map((q) => q.id)), E = (F || []).filter((q) => m.has(q.stationId)), D = (t && t.length > 0 ? t : n).filter((q) => !E.some((G) => G.stationId === q.id));
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
                        Qt("1x1"), Qs("1x1"), pe(!1);
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
                        Qt("1x2"), Qs("1x2"), pe(!1);
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
                        Qt("2x2"), Qs("2x2"), pe(!1);
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
                        Qt("1+3-pip"), Qs("1+3-pip"), pe(!1);
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
                        Qt("hero-stacked"), Qs("hero-stacked"), pe(!1);
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
                    className: `btn-wing-tool ${ae ? "active" : ""}`,
                    onClick: () => {
                      Me((m) => !m), pe(!1);
                    },
                    title: `Aspect Ratio: ${kt} (Click to change)`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: kt })
                    ]
                  }
                ),
                ae && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                  /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "EXPORT ASPECT" }),
                  os.map((m) => /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `popout-item ${kt === m.id ? "active" : ""}`,
                      onClick: () => {
                        Ke(m.id), Me(!1);
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
                  className: `btn-wing-tool ${Tt ? "active" : ""}`,
                  onClick: () => an((m) => !m),
                  title: Tt ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
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
                  Rt.current = m, Ys.current = m;
                },
                className: `canvas-master-frame-16-9 ${Gn ? "is-full-width" : "is-fit-stage"}`,
                style: {
                  width: rt.width > 180 ? `${rt.width}px` : "100%",
                  height: rt.height > 100 ? `${rt.height}px` : "auto",
                  aspectRatio: `${Ae} / ${Pe}`
                },
                onMouseMove: Lo,
                onMouseLeave: ii,
                onDragOver: (m) => {
                  m.preventDefault(), m.dataTransfer.dropEffect = "copy";
                },
                onDrop: am,
                onClick: () => Ot(!1),
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
                        left: `${Bn.x / Ae * 100}%`,
                        top: `${Bn.y / Pe * 100}%`,
                        width: `${Bn.width / Ae * 100}%`,
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
                  Tt && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Ae}×${Pe}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Dt.isInside ? `${Dt.x},${Dt.y}` : "px" }) }),
                    /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                      "svg",
                      {
                        className: "canvas-ruler-svg-x",
                        viewBox: `0 0 ${Ae} 20`,
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
                  wt.vertical !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-v",
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${wt.vertical}%`,
                        width: "2px",
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                        zIndex: 9999,
                        pointerEvents: "none"
                      }
                    }
                  ),
                  wt.horizontal !== null && /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      className: "canvas-snap-guide-h",
                      style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${wt.horizontal}%`,
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
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Be(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Qs("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                    ] })
                  ] }),
                  sm.map((m) => {
                    var _t;
                    const E = m.originalIndex, D = He === E, q = it && He === E, G = Ze && He === E, B = (n.length > 0 ? n : t).find(
                      (Ee) => {
                        var yt, pt, Ir, qs;
                        return Ee.id === m.stationId || ((yt = Ee.hostname) == null ? void 0 : yt.toLowerCase()) === ((pt = m.stationId) == null ? void 0 : pt.toLowerCase()) || ((Ir = Ee.id) == null ? void 0 : Ir.toLowerCase()) === ((qs = m.stationId) == null ? void 0 : qs.toLowerCase());
                      }
                    ), ue = hn.find((Ee) => Ee.stationId === m.stationId && Ee.displayId === m.displayId), Te = B || {
                      id: m.stationId,
                      hostname: (ue == null ? void 0 : ue.stationHostname) || m.stationHostname || m.stationId,
                      displayName: (ue == null ? void 0 : ue.stationName) || m.label || m.stationId,
                      displays: ue ? [{ displayId: ue.displayId, width: ue.sourceWidth, height: ue.sourceHeight }] : []
                    }, ye = (Te == null ? void 0 : Te.displays) || ((_t = Te == null ? void 0 : Te.topology) == null ? void 0 : _t.displays) || [], Se = F.filter(
                      (Ee) => Ee.stationId === m.stationId || Te && (Ee.stationId === Te.id || Ee.stationId === Te.hostname)
                    ), mt = ye.length > 1 && Se.length >= ye.length, dt = m.borderColor || jt[E % jt.length], ht = m.borderWidth !== void 0 ? m.borderWidth : 2, Ne = m.rotation || 0, ct = m.shadowEffect || "deep", Pt = m.borderRadius || 0, gt = m.x / Ae * 100, Et = m.y / Pe * 100, Rn = m.width / Ae * 100, Qn = m.height / Pe * 100, Wt = lx(ct, D, dt);
                    m.y < 50, m.x < 100, m.x + m.width > Ae - 100;
                    const At = m.zIndex !== void 0 ? m.zIndex : E + 1;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: `canvas-feed-card-box ${D ? "is-selected" : ""} ${q ? "is-dragging" : ""} ${G ? "is-resizing" : ""}`,
                        style: {
                          position: "absolute",
                          left: `${gt}%`,
                          top: `${Et}%`,
                          width: `${Rn}%`,
                          height: `${Qn}%`,
                          zIndex: At * 10 + (q ? 100 : 0),
                          transformOrigin: "center center",
                          border: `${ht}px solid ${dt}`,
                          borderRadius: `${Pt}px`,
                          boxShadow: Wt,
                          opacity: m.opacity !== void 0 ? m.opacity : 1,
                          pointerEvents: m.opacity !== void 0 && m.opacity < 0.1 ? "none" : "auto",
                          cursor: q ? "grabbing" : "grab",
                          transition: q || G ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                        },
                        onMouseDown: (Ee) => ui(Ee, E),
                        onContextMenu: (Ee) => {
                          Ee.preventDefault(), Ee.stopPropagation(), Fe(E), Ot(!0);
                        },
                        children: [
                          /* @__PURE__ */ s.jsxs(
                            "div",
                            {
                              className: "box-header-badge",
                              onMouseDown: (Ee) => ui(Ee, E),
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
                                      onClick: (Ee) => Ee.stopPropagation(),
                                      onMouseDown: (Ee) => Ee.stopPropagation(),
                                      onDoubleClick: (Ee) => Ee.stopPropagation(),
                                      children: [
                                        /* @__PURE__ */ s.jsx(
                                          "input",
                                          {
                                            ref: Le,
                                            type: "text",
                                            className: "badge-title-input",
                                            value: dn,
                                            placeholder: `${Te.displayName || m.stationId} (${m.displayId})`,
                                            onChange: (Ee) => De(Ee.target.value),
                                            onKeyDown: (Ee) => {
                                              Ee.stopPropagation(), Ee.key === "Enter" ? (Ee.preventDefault(), Mr(E)) : Ee.key === "Escape" && (Ee.preventDefault(), Kt(null));
                                            },
                                            onBlur: () => Mr(E)
                                          }
                                        ),
                                        /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: "btn-edit-title is-saving",
                                            onClick: (Ee) => {
                                              Ee.stopPropagation(), Mr(E);
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
                                        onDoubleClick: (Ee) => {
                                          Ee.stopPropagation(), Kt(E), De(m.label || "");
                                        },
                                        title: "Double-click to rename screen (burned into video)",
                                        children: m.label || `${Te.displayName || m.stationId} (${m.displayId})`
                                      }
                                    ),
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: "btn-edit-title",
                                        onClick: (Ee) => {
                                          Ee.stopPropagation(), Kt(E), De(m.label || "");
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
                                  Ne !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                    "📐",
                                    Ne,
                                    "°"
                                  ] })
                                ] }),
                                /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${At}`, children: [
                                  "#$",
                                  At
                                ] }),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-badge-action-inspector ${D && vt ? "active" : ""}`,
                                    onClick: (Ee) => {
                                      Ee.stopPropagation(), Fe(E), Ot((yt) => !yt || He !== E);
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
                                  transition: q ? "none" : "transform 0.2s ease-out"
                                },
                                children: /* @__PURE__ */ s.jsx(
                                  Xg,
                                  {
                                    station: Te,
                                    isSolo: !1,
                                    currentEpochMs: te,
                                    timeMode: p,
                                    isPlaying: y,
                                    setIsPlaying: S,
                                    baseEpochMs: d,
                                    totalDurationMs: C,
                                    outPointMs: w,
                                    setPlayheadMs: g,
                                    globalGaps: x,
                                    onOpenSpotlight: l,
                                    onSelectActiveStation: null,
                                    recordingSegments: I,
                                    playbackSpeed: j,
                                    activeAudioStationId: Re,
                                    onSoloAudio: Oe,
                                    directorPlan: k || (Te == null ? void 0 : Te.directorPlan),
                                    isAutoDirectorEnabled: i ? i[Te.id] ?? !0 : !0,
                                    stationsCount: t.length,
                                    onDeselectStation: a,
                                    targetDisplayId: m.displayId,
                                    onSelectDisplayId: (Ee) => {
                                      const yt = F.map((pt, Ir) => Ir === E ? { ...pt, displayId: Ee } : pt);
                                      he(yt);
                                    },
                                    areAllDisplaysPlaced: mt,
                                    slotIndex: E,
                                    borderColor: dt
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "card-drag-surface",
                                onMouseDown: (Ee) => ui(Ee, E),
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
                                onMouseDown: (Ee) => Oo(Ee, E, "tl"),
                                title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-tr",
                                onMouseDown: (Ee) => Oo(Ee, E, "tr"),
                                title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-bl",
                                onMouseDown: (Ee) => Oo(Ee, E, "bl"),
                                title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${Zr(m.sourceWidth, m.sourceHeight)})`
                              }
                            ),
                            /* @__PURE__ */ s.jsx(
                              "div",
                              {
                                className: "resize-handle-corner resize-handle-br",
                                onMouseDown: (Ee) => Oo(Ee, E, "br"),
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
                  !H && vt && He !== null && Js && (() => {
                    const m = Js, E = He, D = m.borderColor || jt[E % jt.length], q = m.borderWidth !== void 0 ? m.borderWidth : 2, G = m.rotation || 0, B = m.shadowEffect || "deep", ue = m.zIndex !== void 0 ? m.zIndex : E + 1, Te = m.x / Ae * 100, ye = m.width / Ae * 100, Se = Te + ye / 2;
                    let mt = `${Se}%`, dt = "translateX(-50%)";
                    Se < 28 ? (mt = `${Math.max(1, Te)}%`, dt = "none") : Se > 72 && (mt = `${Math.min(99, Te + ye)}%`, dt = "translateX(-100%)");
                    const ht = m.y + m.height + 8;
                    let Ne;
                    ht + 45 > Pe ? Ne = `${Math.max(20, (m.y + m.height - 44) / Pe * 100)}%` : Ne = `${ht / Pe * 100}%`;
                    const ct = (n.length > 0 ? n : t).find(
                      (gt) => {
                        var Et, Rn;
                        return gt.id === m.stationId || ((Et = gt.hostname) == null ? void 0 : Et.toLowerCase()) === ((Rn = m.stationId) == null ? void 0 : Rn.toLowerCase());
                      }
                    ), Pt = ct ? ct.id : m.stationId;
                    return /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        className: "floating-feed-inspector compact-hud-inspector",
                        style: {
                          position: "absolute",
                          left: mt,
                          top: Ne,
                          transform: dt,
                          zIndex: 99999
                        },
                        onMouseDown: (gt) => gt.stopPropagation(),
                        onClick: (gt) => gt.stopPropagation(),
                        children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${m.label || Pt} • Layer #${ue}`, children: [
                            "🎛️ #$",
                            ue
                          ] }),
                          /* @__PURE__ */ s.jsxs("div", { className: "inspector-group title-rename-group", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "inspector-group-label", children: "TITLE:" }),
                            /* @__PURE__ */ s.jsx(
                              "input",
                              {
                                type: "text",
                                className: "inspector-title-input",
                                value: nt,
                                placeholder: `${(ct == null ? void 0 : ct.displayName) || m.stationId} (${m.displayId})`,
                                onChange: (gt) => ce(gt.target.value),
                                onKeyDown: (gt) => {
                                  gt.key === "Enter" && (gt.preventDefault(), Un(He, nt));
                                },
                                onBlur: () => {
                                  Un(He, nt);
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
                                onClick: () => Je((gt) => !gt),
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
                            Ue && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: rx.map((gt) => /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: `btn-color-dot ${D === gt ? "is-active" : ""}`,
                                style: { backgroundColor: gt === "transparent" ? "#1E293B" : gt },
                                onClick: () => {
                                  en({ borderColor: gt }), Je(!1);
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
                                const gt = [0, 2, 4, 8], Et = gt[(gt.indexOf(q) + 1) % gt.length];
                                en({ borderWidth: Et });
                              },
                              title: `Border Width: ${q}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                              children: [
                                "📏 ",
                                q,
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
                                const gt = ["none", "deep", "glow-cyan", "glow-emerald"], Et = gt[(gt.indexOf(B) + 1) % gt.length];
                                en({ shadowEffect: Et });
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
                              title: `Rotate: Step 90° clockwise (Current: ${G}°)`,
                              children: "↺ 90°"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool highlight",
                              onClick: () => em(E),
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
                              onClick: () => tt(E),
                              title: "Remove Screen from Canvas",
                              children: "🗑️"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-mini-tool btn-close-inspector",
                              onClick: () => Fe(null),
                              title: "Close Menu (Esc)",
                              children: "✕"
                            }
                          )
                        ]
                      }
                    );
                  })(),
                  /* @__PURE__ */ s.jsx(
                    Qg,
                    {
                      currentEpochMs: te,
                      position: Z,
                      onPositionChange: (m) => {
                        Y(m);
                        try {
                          localStorage.setItem("itb_canvas_utc_clock_pos", m);
                        } catch {
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx(Jg, {})
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
              /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-wing-tool highlight-emerald",
                  onClick: () => je(!0),
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
                    onClick: () => Ye((m) => !m),
                    title: `Saved Presets Library (${J.length})`,
                    children: [
                      /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: J.length }),
                      /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                    ]
                  }
                ),
                ze && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                    /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => Ye(!1), children: "✕" })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: J.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : J.map((m) => {
                    var E;
                    return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                      Qp(m), Ye(!1);
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
                          onClick: (D) => Jp(m.id, D),
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
                  onClick: Zp,
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
                    return (m = Q.current) == null ? void 0 : m.click();
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
                  ref: Q,
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: qp
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
                    const m = vn.length > 0 ? vn : hn, E = tr(m, Ae, Pe), D = {
                      id: "canvas-timeline-root",
                      keyframes: [
                        {
                          id: "kf_root_0",
                          timestampEpochMs: d,
                          transitionDurationSec: 0.5,
                          transitionType: "smooth",
                          layout: {
                            width: Ae,
                            height: Pe,
                            backgroundColor: "#070A10",
                            fps: 30,
                            placements: E
                          }
                        }
                      ]
                    };
                    cn(D), b && b(D), Fe(0);
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
                  onClick: tm,
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
        ] }) }),
        " ",
        ie && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => je(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => je(!1), children: "✕" })
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
                onChange: (m) => ne(m.target.value),
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
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => je(!1), children: "Cancel" }),
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
  onChangeSpeed: S,
  onSetInPoint: C,
  onSetOutPoint: _
}) {
  const [w, g] = u.useState(() => kl()), { volume: x, isMuted: I } = w, j = !!(v && d > 0);
  u.useEffect(() => {
    const V = (b) => {
      b.detail && g(b.detail);
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []);
  const M = u.useCallback((V, b, W) => {
    const O = {
      volume: typeof V == "number" ? V : x,
      isMuted: typeof b == "boolean" ? b : I,
      channelMode: W || w.channelMode || "both"
    };
    g(O), zg(O);
  }, [x, I, w.channelMode]), h = (V) => {
    V == null || V.stopPropagation(), j && n(!t);
  }, A = (V) => {
    if (V == null || V.stopPropagation(), !j || !S) return;
    const b = Wi.indexOf(y), W = b === -1 ? 1 : (b + 1) % Wi.length;
    S(Wi[W]);
  }, k = (V) => {
    V == null || V.stopPropagation(), I ? M(x === 0 ? 0.5 : x, !1) : M(x, !0);
  }, N = (V) => {
    V.stopPropagation();
    const b = parseFloat(V.target.value);
    b === 0 ? M(0, !0) : M(b, !1);
  }, P = (V) => {
    const b = u.useRef(null), W = u.useRef(null), O = u.useRef(0), H = u.useCallback(() => {
      b.current && clearTimeout(b.current), W.current && clearInterval(W.current), b.current = null, W.current = null;
    }, []), R = u.useCallback((te = 1) => {
      if (n && n(!1), a) {
        const Z = 33 * te;
        a((Y) => {
          const Re = V === "forward" ? Y + Z : Y - Z;
          return Math.max(0, Math.min(d, Re));
        });
      } else V === "forward" && f ? f() : V === "backward" && p && p();
    }, [V]), oe = u.useCallback((te) => {
      te.preventDefault(), te.stopPropagation(), j && (H(), R(1), O.current = performance.now(), b.current = setTimeout(() => {
        W.current = setInterval(() => {
          const Z = performance.now() - O.current, Y = Z > 2500 ? 4 : Z > 1e3 ? 2 : 1;
          R(Y);
        }, 50);
      }, 280));
    }, [R, H]);
    return u.useEffect(() => H, [H]), {
      onMouseDown: oe,
      onMouseUp: H,
      onMouseLeave: H,
      onTouchStart: oe,
      onTouchEnd: H
    };
  }, z = P("backward"), $ = P("forward"), U = (V) => {
    V.stopPropagation(), j && (n && n(!1), a && a(i));
  }, le = (V) => {
    V.stopPropagation(), j && (n && n(!1), a && a(c));
  }, se = () => I || x === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
      className: `transport-bar-root ${j ? "is-expanded" : "is-compact-disabled"}`,
      title: j ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !j,
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
            onClick: (V) => {
              V.stopPropagation(), C == null || C();
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
              disabled: !j,
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
              disabled: !j,
              onClick: U,
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
              disabled: !j,
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
              disabled: !j,
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
              disabled: !j,
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
              disabled: !j,
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
        j && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${I || x === 0 ? "is-muted" : ""}`,
              onClick: k,
              title: I ? "Unmute" : `Mute (${Math.round(x * 100)}%)`,
              children: se()
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
const xa = 2500, ax = {
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
function ix(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return ax[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function Fp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(ix), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Bp(e, t = " + ") {
  return Fp(e).join(t);
}
function zl(e) {
  return Bp(e, "+");
}
const cx = 8;
function ux({
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
    const x = new AbortController(), I = Math.max(0, l + a - xa), j = l + a + i + xa;
    p(!0);
    const M = y.map((h) => {
      const A = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${I}&endEpoch=${j}`;
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
  const S = r && Array.isArray(r) && r.length > 0 ? r : v, C = u.useMemo(() => {
    if (!S.length || i <= 0 || c <= 0)
      return [];
    const x = l + a, I = x + i, j = [...S].sort((k, N) => k.epochMs - N.epochMs), M = [];
    let h = null, A = -999;
    for (const k of j) {
      const N = k.epochMs + xa;
      if (N < x || N > I)
        continue;
      const P = N - l, z = (P - a) / i * c;
      if (h && z - A < cx) {
        h.events.push(k), h.endOffsetMs = P, h.endEpochMs = N;
        const $ = new Set(h.events.map((U) => U.stationName || "Workstation"));
        h.isMultiStation = $.size > 1, h.stationCount = $.size, A = z;
      } else {
        const $ = (P - a) / i * 100;
        h = {
          id: `kc_${k.epochMs}_${M.length}`,
          startOffsetMs: P,
          endOffsetMs: P,
          startEpochMs: N,
          endEpochMs: N,
          pct: $,
          events: [k],
          isMultiStation: !1,
          stationCount: 1
        }, M.push(h), A = z;
      }
    }
    return M;
  }, [S, l, a, i, c]);
  function _(x) {
    if (!x.events.length) return "";
    if (x.events.length === 1)
      return zl(x.events[0].keyCombination);
    const I = x.events.find((h) => h.keyCombination.includes("+"));
    if (I) {
      const h = zl(I.keyCombination);
      return x.events.length > 1 ? `${h} (+${x.events.length - 1})` : h;
    }
    const j = zl(x.events[0].keyCombination);
    return x.events.every((h) => zl(h.keyCombination) === j) ? `${j} ×${x.events.length}` : `${j} (+${x.events.length - 1})`;
  }
  function w(x, I = "LOCAL") {
    return Ct(x, I);
  }
  function g(x) {
    const I = [];
    for (const j of x) {
      const M = zl(j.keyCombination);
      I.length && I[I.length - 1].key === M ? I[I.length - 1].count++ : I.push({ key: M, count: 1 });
    }
    return I;
  }
  return C.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: C.map((x) => {
    const I = x.events.length, j = I > 1, M = x.isMultiStation, h = _(x), A = w(x.startEpochMs, o), k = x.pct < 10 ? "edge-left" : x.pct > 90 ? "edge-right" : "", N = {};
    return x.events.forEach((P) => {
      const z = P.stationName || e || "Workstation";
      N[z] || (N[z] = []), N[z].push(P);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${j ? "is-cluster" : "is-single"} ${M ? "is-multi-station" : ""}`,
        style: { left: `${x.pct}%` },
        onClick: (P) => {
          P.stopPropagation(), d && d(x.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${A}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            j && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: M ? `${x.stationCount}S` : I > 9 ? "9+" : I })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${k}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: M ? `MULTICAM KEYSTROKES (${x.stationCount} WORKSTATIONS • ${I} EVT)` : j ? `KEYSTROKE BURST (${I})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: A })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([P, z]) => {
              const $ = g(z);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: P }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    z.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  $.slice(0, 6).map((U, le) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    U.key,
                    U.count > 1 ? ` ×${U.count}` : ""
                  ] }, le)),
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
      x.id
    );
  }) }) : null;
}
const dx = u.memo(ux), zi = [
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
], hx = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function fx({
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
  keystrokes: C = []
}) {
  const _ = u.useRef(null), [w, g] = u.useState(1e3);
  u.useEffect(() => {
    if (!_.current) return;
    const R = new ResizeObserver((oe) => {
      for (let te of oe)
        te.contentRect.width > 50 && g(te.contentRect.width);
    });
    return R.observe(_.current), () => R.disconnect();
  }, []);
  const x = u.useCallback((R) => !r || r <= 0 ? "0%" : `${(R - n) / r * 100}%`, [r, n]), I = u.useCallback((R) => {
    const te = (R - n) / r * 100;
    return te >= -5 && te <= 105;
  }, [n, r]), j = (R) => {
    if (!_.current) return;
    const oe = _.current.getBoundingClientRect(), te = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), Z = Math.round(n + te / oe.width * r);
    a && a(Z);
  }, M = () => {
    a && a(null);
  }, h = (R) => {
    if (!_.current || !i) return;
    const oe = _.current.getBoundingClientRect(), te = Math.max(0, Math.min(R.clientX - oe.left, oe.width)), Z = Math.round(n + te / oe.width * r);
    i(Math.max(0, Math.min(l, Z)));
  }, A = u.useMemo(() => {
    const R = Math.max(3, Math.floor(w / 95)), oe = r / R;
    for (let te of zi)
      if (te >= oe) return te;
    return zi[zi.length - 1];
  }, [r, w]), k = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const R = e + n, oe = R + r, te = t === "LOCAL" ? Us(R).offsetMin * 60 * 1e3 : 0, Z = R + te, Y = Math.ceil(Z / A) * A, Re = [];
    for (let Oe = Y; Oe <= oe + te; Oe += A) {
      const ve = Oe - te, Be = (ve - R) / r * 100;
      Be >= 0 && Be <= 100 && Re.push({
        epoch: ve,
        pct: Be,
        label: Ct(ve, t, {
          includeSeconds: A < 6e4
        })
      });
    }
    return Re;
  }, [e, n, r, A, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const R = e + n, oe = R + r;
    return $p(R, oe).map((te) => ({
      ...te,
      pct: (te.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), P = u.useMemo(() => {
    if (!r || !e) return [];
    const R = e + n, oe = R + r, te = t === "UTC", Z = [], Y = te ? 0 : Us(R).offsetMin * 60 * 1e3, Re = R + Y, Oe = oe + Y, ve = new Date(Re);
    for (ve.setUTCHours(0, 0, 0, 0), ve.getTime() < Re && ve.setUTCDate(ve.getUTCDate() + 1); ve.getTime() <= Oe; ) {
      const be = ve.getTime() - Y, Ie = (be - R) / r * 100, et = String(ve.getUTCDate()).padStart(2, "0"), at = hx[ve.getUTCMonth()], ie = `${et} ${at}`;
      Z.push({ epoch: be, pct: Ie, dateLabel: ie }), ve.setUTCDate(ve.getUTCDate() + 1);
    }
    return Z;
  }, [e, n, r, t]), {
    globalFirstMs: z = v,
    globalLastMs: $ = null,
    currentFirstMs: U = null,
    currentLastMs: le = null
  } = f || { globalFirstMs: v }, se = z !== null && U !== null && Math.abs(z - U) < 1e3, V = $ !== null && le !== null && Math.abs($ - le) < 1e3, b = u.useMemo(() => {
    const R = [];
    return se ? I(z) && R.push({
      id: "first-combined",
      ms: z,
      pct: x(z),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${Ct(e + z, t)} (Click to jump)`
    }) : (I(z) && R.push({
      id: "first-global",
      ms: z,
      pct: x(z),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${Ct(e + z, t)} (Click to jump)`
    }), I(U) && R.push({
      id: "first-current",
      ms: U,
      pct: x(U),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${Ct(e + U, t)} (Click to jump)`
    })), V ? I($) && R.push({
      id: "last-combined",
      ms: $,
      pct: x($),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${Ct(e + $, t)} (Click to jump)`
    }) : (I(le) && R.push({
      id: "last-current",
      ms: le,
      pct: x(le),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${Ct(e + le, t)} (Click to jump)`
    }), I($) && R.push({
      id: "last-global",
      ms: $,
      pct: x($),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${Ct(e + $, t)} (Click to jump)`
    })), R;
  }, [
    z,
    $,
    U,
    le,
    se,
    V,
    e,
    t,
    y,
    I,
    x
  ]), W = u.useMemo(() => {
    const R = [];
    return typeof c == "number" && I(c) && R.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: x(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${Ct(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && I(d) && R.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: x(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${Ct(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), R;
  }, [c, d, e, t, I, x]), O = o !== null ? x(o) : null, H = O !== null && O >= 0 && O <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: _,
      className: "timeline-ruler-root",
      onMouseMove: j,
      onMouseLeave: M,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          k.map((R) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${R.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: R.label })
          ] }, R.epoch)),
          S && /* @__PURE__ */ s.jsx(
            dx,
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
          b.map((R) => /* @__PURE__ */ s.jsxs(
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
          W.map((R) => /* @__PURE__ */ s.jsxs(
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
        H && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${O}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: Ct(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const zn = (e) => String(e).padStart(2, "0");
function px({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [f, p] = u.useState(""), [y, S] = u.useState(""), C = u.useCallback((k) => {
    if (!k || isNaN(k) || k <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const $ = new Date(k);
      return {
        timeStr: `${zn($.getUTCHours())}:${zn($.getUTCMinutes())}:${zn($.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: P } = Us(k), z = new Date(k + N * 60 * 1e3);
    return {
      timeStr: `${zn(z.getUTCHours())}:${zn(z.getUTCMinutes())}:${zn(z.getUTCSeconds())}`,
      zoneLabel: P
    };
  }, [t]), _ = u.useCallback((k) => {
    if (!k || k < 0) return "00:00:00";
    const N = Math.floor(k / 1e3), P = Math.floor(N / 3600), z = Math.floor(N % 3600 / 60), $ = N % 60;
    return `${zn(P)}:${zn(z)}:${zn($)}`;
  }, []), w = u.useMemo(() => C(e + r), [C, e, r]), g = u.useMemo(() => C(e + o), [C, e, o]), x = u.useMemo(() => _(Math.max(0, o - r)), [_, r, o]), I = u.useCallback((k, N) => {
    if (!k || !k.trim()) return N;
    const z = k.trim().split(" ")[0].split(":").map(Number);
    if (z.length < 2 || z.some(isNaN)) return N;
    const [$, U, le = 0] = z;
    if (t === "UTC") {
      const Y = new Date(e);
      Y.setUTCHours($, U, le, 0);
      let Re = Y.getTime();
      for (; Re < e; ) Re += 864e5;
      for (; Re > e + n + 1e3; ) Re -= 864e5;
      const Oe = Re - e;
      return isNaN(Oe) ? N : Math.max(0, Math.min(n, Oe));
    }
    const { offsetMin: se } = Us(e), V = new Date(e + se * 6e4), b = V.getUTCFullYear(), W = V.getUTCMonth(), O = V.getUTCDate(), H = `${b}-${zn(W + 1)}-${zn(O)}`, R = `${zn($)}:${zn(U)}:${zn(le)}`, oe = za(H, R);
    let te;
    if (oe.isAmbiguous) {
      const Y = e + N, Re = Math.abs(oe.firstOccurrenceEpoch - Y), Oe = Math.abs(oe.secondOccurrenceEpoch - Y);
      te = Re <= Oe ? oe.firstOccurrenceEpoch : oe.secondOccurrenceEpoch;
    } else {
      const Y = Date.UTC(b, W, O, $, U, le), { offsetMin: Re } = Us(Y - se * 6e4);
      te = Y - Re * 6e4;
    }
    for (; te < e; ) te += 864e5;
    for (; te > e + n + 1e3; ) te -= 864e5;
    const Z = te - e;
    return isNaN(Z) ? N : Math.max(0, Math.min(n, Z));
  }, [e, t, n]), j = () => {
    p(w.timeStr), c(!0);
  }, M = () => {
    if (c(!1), !f || !f.trim() || f.trim() === w.timeStr)
      return;
    const k = I(f.trim(), r);
    k !== null && !isNaN(k) && k < o && l(k);
  }, h = () => {
    S(g.timeStr), v(!0);
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
          onClick: j,
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
          onChange: (k) => S(k.target.value),
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
function mx({
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
  const f = Math.max(0, Math.min(100, i / r * 100)), p = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, p - f), S = Math.max(0, Math.min(100, l / r * 100)), C = Math.max(0, Math.min(100 - S, o / r * 100)), _ = S + C, w = a > 1.05, g = 7, x = y >= 10, I = y >= 16, j = x, M = I, h = j && Math.abs(S - f) < g, A = w && C >= 12 && !h, k = M && Math.abs(_ - p) < g, N = w && C >= 12 && !k;
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
              j && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: Ct(t + i, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: Ct(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${S}%`, width: `${C}%` },
            children: [
              A && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: Ct(t + l, n) }),
              N && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: Ct(t + l + o, n) })
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
function gx({
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
        onClick: S,
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
        title: `Jump playhead to first media (${Ct(i + e, c)})`,
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
        title: `Jump playhead to last media (${Ct(i + t, c)})`,
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
const ih = 3, xx = 8e3, yx = 80;
function Up() {
  setTimeout(vx, 0);
}
function vx() {
  var e;
  if (!(wl >= ih || Ps.length === 0))
    for (Ps = Ps.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); wl < ih && Ps.length > 0; ) {
      const t = Ps.pop();
      !t || (e = t.signal) != null && e.aborted || (wl++, Nx(t));
    }
}
async function Nx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const f = () => {
    d || (d = !0, v && clearTimeout(v), wl = Math.max(0, wl - 1), el.delete(t), Up());
  };
  v = setTimeout(() => {
    f(), i(null);
  }, xx);
  try {
    const p = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(p, { signal: a });
    if (y.ok && y.status !== 204) {
      const S = await y.blob();
      if (S && S.size > 1500) {
        const C = URL.createObjectURL(S);
        if (bs.size >= yx) {
          const _ = bs.keys().next().value, w = bs.get(_);
          w && URL.revokeObjectURL(w), bs.delete(_);
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
      }, { once: !0 }), Ps.push(d), Up();
    });
    return el.set(a, i), i;
  },
  clear() {
    bs.forEach((e) => URL.revokeObjectURL(e)), bs.clear(), el.clear(), Ps = [], wl = 0;
  }
}, kx = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Zn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, _r = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
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
  isCanvasSummary: S = !1
}) {
  const [C, _] = u.useState({}), w = u.useRef(C);
  w.current = C;
  const g = u.useMemo(() => kx(l), [l]), x = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: P } = g, z = [], $ = o + r, U = $ + l, le = $ - N, se = U + N, V = [...n].sort((R, oe) => Zn(R) - Zn(oe)), b = S ? c || [] : [...c || [], ...d || []], W = (R, oe) => !b || b.length === 0 ? !1 : b.some((te) => {
      const Z = te.startEpochMs ?? te.startEpoch ?? te.start ?? 0, Y = te.endEpochMs ?? te.endEpoch ?? te.end ?? 0;
      return Y <= Z ? !1 : Math.max(R, Z) < Math.min(oe, Y);
    }), O = o + a, H = o + i;
    if (V.forEach((R, oe) => {
      const te = Math.round(Zn(R)), Z = Math.round(_r(R));
      if (Z <= te) return;
      const Y = Math.max(te, O), Re = Math.min(Z, H);
      if (Re <= Y) return;
      const Oe = Math.max(Y, le), ve = Math.min(Re, se);
      if (ve <= Oe) return;
      const Be = Math.floor(Oe / N) * N;
      for (let be = Be; be < ve; be += N) {
        const Ie = be + N, et = Math.max(Y, be), at = Math.min(Re, Ie);
        at > et && !W(et, at) && z.push({
          key: `${e}_${t}_${et}_${at}_${P}`,
          sIdx: oe,
          startEpoch: et,
          endEpoch: at,
          framesPerTile: P,
          displayId: t
        });
      }
    }), z.length > 20) {
      const R = o + r + l / 2;
      z.sort((oe, te) => {
        const Z = Math.abs((oe.startEpoch + oe.endEpoch) / 2 - R), Y = Math.abs((te.startEpoch + te.endEpoch) / 2 - R);
        return Z - Y;
      }), z.length = 20, z.sort((oe, te) => oe.startEpoch - te.startEpoch);
    }
    return z;
  }, [n, o, e, t, r, l, g, a, i, d, c]);
  u.useEffect(() => {
    if (x.length === 0) return;
    let N = !0;
    const P = new AbortController(), z = [], $ = {};
    let U = !1;
    x.forEach((O) => {
      const H = ch.get(e, O.startEpoch, O.endEpoch, O.framesPerTile, t);
      H ? w.current[O.key] !== H && ($[O.key] = H, U = !0) : z.push(O);
    });
    const le = new Set(x.map((O) => O.key)), se = w.current, V = {};
    let b = !1;
    if (Object.keys(se).forEach((O) => {
      le.has(O) ? V[O] = se[O] : b = !0;
    }), U || b) {
      const O = { ...V, ...$ };
      w.current = O, _(O);
    }
    if (z.length === 0) return () => {
      N = !1;
    };
    const W = setTimeout(() => {
      z.forEach((O) => {
        ch.fetchTile(e, O.startEpoch, O.endEpoch, O.framesPerTile, P.signal, t).then((H) => {
          N && H && (w.current[O.key] = H, _((R) => ({ ...R, [O.key]: H })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(W), P.abort();
    };
  }, [x, e, t]);
  const I = (a - r) / l * 100, j = (i - r) / l * 100, M = u.useMemo(() => {
    if (x.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return x.map((z) => {
      const $ = z.startEpoch - o, U = z.endEpoch - o;
      if (U <= N || $ >= P) return null;
      const le = Math.max(N, $), se = Math.min(P, U);
      return {
        key: z.key,
        spriteUrl: C[z.key] || null,
        leftPct: (le - N) / l * 100,
        widthPct: (se - le) / l * 100
      };
    }).filter(Boolean);
  }, [x, o, r, l, C]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, P = r + l;
    return n.map((z, $) => {
      const U = Math.round(Zn(z)) - o, le = Math.round(_r(z)) - o;
      if (le <= N || U >= P) return null;
      const se = Math.max(N, U), V = Math.min(P, le);
      return {
        id: $,
        leftPct: (se - N) / l * 100,
        widthPct: (V - se) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), A = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((W, O) => Zn(W) - Zn(O)), P = [], z = r, $ = r + l, U = o + z, le = o + $, se = o + (a !== void 0 ? a : z), V = o + (i !== void 0 ? i : $);
    if (N.length > 0) {
      const W = Zn(N[0]);
      W > U && P.push({ startEpoch: U, endEpoch: W });
    } else l > 0 && P.push({ startEpoch: U, endEpoch: le });
    for (let W = 0; W < N.length - 1; W++) {
      const O = _r(N[W]), H = Zn(N[W + 1]);
      H - O > 1e3 && P.push({ startEpoch: O, endEpoch: H });
    }
    if (N.length > 0) {
      const W = _r(N[N.length - 1]);
      W < le && P.push({ startEpoch: W, endEpoch: le });
    }
    const b = [];
    return c && c.length > 0 && c.forEach((W, O) => {
      const H = Math.max(W.startEpochMs ?? W.StartEpochMs, se), R = Math.min(W.endEpochMs ?? W.EndEpochMs, V);
      if (R > H && R > U && H < le) {
        const oe = Math.max(U, H), te = Math.min(le, R), Z = (te - o - (oe - o)) / l * 100;
        Z > 0 && b.push({
          id: `global-${O}`,
          type: "global",
          startEpoch: oe,
          endEpoch: te,
          leftPct: (oe - o - z) / l * 100,
          widthPct: Z,
          durationSec: Math.round((R - H) / 1e3)
        });
      }
    }), S || P.forEach((W, O) => {
      let H = [W];
      c && c.length > 0 && c.forEach((R) => {
        const oe = Math.max(R.startEpochMs ?? R.StartEpochMs, se), te = Math.min(R.endEpochMs ?? R.EndEpochMs, V);
        if (te <= oe) return;
        const Z = [];
        H.forEach((Y) => {
          te <= Y.startEpoch || oe >= Y.endEpoch ? Z.push(Y) : (oe > Y.startEpoch && Z.push({ startEpoch: Y.startEpoch, endEpoch: oe }), te < Y.endEpoch && Z.push({ startEpoch: te, endEpoch: Y.endEpoch }));
        }), H = Z;
      }), H.forEach((R, oe) => {
        if (R.endEpoch - R.startEpoch < 1e3 || R.endEpoch <= U || R.startEpoch >= le) return;
        const te = Math.max(U, R.startEpoch), Z = Math.min(le, R.endEpoch), Y = (Z - o - (te - o)) / l * 100;
        Y > 0 && b.push({
          id: `station-${O}-${oe}`,
          type: "station",
          startEpoch: te,
          endEpoch: Z,
          leftPct: (te - o - z) / l * 100,
          widthPct: Y,
          durationSec: Math.round((R.endEpoch - R.startEpoch) / 1e3)
        });
      });
    }), b;
  }, [n, c, o, r, l, a, i, S]), k = u.useMemo(() => {
    if (!p || !f || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), P = r, z = r + l;
    return v.map(($, U) => {
      const le = ($.startEpochMs ?? $.StartEpochMs ?? 0) - o, se = ($.endEpochMs ?? $.EndEpochMs ?? 0) - o;
      if (se <= P || le >= z) return null;
      const V = Math.max(P, le), b = Math.min(z, se), W = (V - P) / l * 100, O = (b - V) / l * 100;
      if (O <= 0) return null;
      const R = ($.targetDisplayId || $.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${U}`,
        isFeatured: R,
        leftPct: W,
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
    I > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, I)}%` } }),
    j < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, j)}%`, right: 0 } })
  ] });
}
function wx({
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
  outPointMs: C = 36e5,
  baseEpochMs: _ = 0,
  segments: w = [],
  recordingSegments: g = {},
  globalGaps: x = []
}) {
  const I = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", j = (e == null ? void 0 : e.id) || I, M = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", A = u.useMemo(() => {
    var O, H, R;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((O = e == null ? void 0 : e.displayTopology) == null ? void 0 : O.displays) || ((H = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : H.Displays) || ((R = e == null ? void 0 : e.topology) == null ? void 0 : R.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), k = u.useMemo(() => {
    var H, R;
    const O = A.find((oe) => oe.isPrimary || oe.IsPrimary);
    return ((O == null ? void 0 : O.displayId) || (O == null ? void 0 : O.DisplayId) || ((H = A[0]) == null ? void 0 : H.displayId) || ((R = A[0]) == null ? void 0 : R.DisplayId) || "mon-0").toLowerCase();
  }, [A]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), P = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), z = P && P.length > 0, $ = !!(A && A.length > 1), U = !!(t && $), le = u.useMemo(() => {
    let O = g[j] || g[I] || w || [];
    if (!O || O.length === 0) {
      const H = (j || "").toLowerCase(), R = (I || "").toLowerCase();
      for (const [oe, te] of Object.entries(g || {})) {
        const Z = oe.toLowerCase();
        if (H && Z === H || R && Z === R) {
          O = te;
          break;
        }
      }
    }
    if ((!O || O.length === 0) && (O = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !O || O.length === 0)
      for (const H of A) {
        const R = H.segments || H.Segments || [];
        if (R.length > 0) {
          O = R;
          break;
        }
      }
    return (O || []).filter((H) => _r(H) - Zn(H) > 0);
  }, [g, w, j, I, e, A]), se = u.useMemo(() => {
    if (!_ || y <= 0) return [];
    const O = [...le].sort((Z, Y) => Zn(Z) - Zn(Y)), H = [], R = _ + y;
    if (x && x.length > 0 && x.forEach((Z) => {
      const Y = Z.startEpochMs ?? Z.StartEpochMs ?? 0, Re = Z.endEpochMs ?? Z.EndEpochMs ?? 0;
      Re > Y && H.push({ startEpoch: Y, endEpoch: Re, type: "global" });
    }), O.length === 0)
      return H.push({ startEpoch: _, endEpoch: R, type: "station" }), H;
    const oe = Math.round(Zn(O[0]));
    oe - _ > 2e3 && (H.some((Y) => Y.type === "global" && Y.startEpoch <= _ && Y.endEpoch >= oe) || H.push({ startEpoch: _, endEpoch: oe, type: "station" }));
    for (let Z = 0; Z < O.length - 1; Z++) {
      const Y = Math.round(_r(O[Z])), Re = Math.round(Zn(O[Z + 1]));
      Re - Y > 2e3 && (H.some((ve) => ve.type === "global" && ve.startEpoch <= Y && ve.endEpoch >= Re) || H.push({ startEpoch: Y, endEpoch: Re, type: "station" }));
    }
    const te = Math.round(_r(O[O.length - 1]));
    return R - te > 2e3 && (H.some((Y) => Y.type === "global" && Y.startEpoch <= te && Y.endEpoch >= R) || H.push({ startEpoch: te, endEpoch: R, type: "station" })), H;
  }, [le, x, _, y]), V = u.useMemo(() => {
    const O = _ + S, H = _ + C;
    return sx(P, se, x, O, H, k);
  }, [P, se, x, _, S, C, k]), b = u.useMemo(() => {
    if (!z || y <= 0) return null;
    const O = p, H = p + y;
    return V.map((R, oe) => {
      const te = (R.startEpochMs ?? R.StartEpochMs ?? 0) - _, Z = (R.endEpochMs ?? R.EndEpochMs ?? 0) - _;
      if (Z <= O || te >= H) return null;
      const Y = Math.max(O, te), Re = Math.min(H, Z), Oe = (Y - O) / y * 100, ve = (Re - Y) / y * 100;
      if (ve <= 0) return null;
      const Be = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase(), be = A.findIndex((at) => (at.displayId || at.DisplayId || "").toLowerCase() === Be);
      let Ie = be >= 0 ? be + 1 : null;
      if (!Ie) {
        const at = Be.match(/\d+/);
        Ie = at ? parseInt(at[0], 10) + 1 : 1;
      }
      const et = be >= 0 ? A[be].displayName || A[be].DisplayName || `Screen ${Ie}` : `Screen ${Ie}`;
      return {
        id: oe,
        dispNum: Ie,
        dispLabel: et,
        leftPct: Oe,
        widthPct: ve
      };
    }).filter(Boolean);
  }, [z, V, A, _, p, y]), W = u.useCallback((O) => {
    const H = (O || "mon-0").toLowerCase();
    return o.some((R) => {
      if (R.stationId !== j) return !1;
      const oe = (R.displayId || "mon-0").toLowerCase();
      return oe === H || oe === "auto" && (H === "mon-0" || H === "screen-0");
    });
  }, [o, j]);
  return U ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
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
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: M, children: M }),
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
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: A.map((O, H) => {
      const R = (O.displayId || O.DisplayId || `mon-${H}`).toLowerCase(), oe = O.displayNumber || O.DisplayNumber || H + 1, te = O.displayName || O.DisplayName || "", Z = te && !te.toLowerCase().includes(I.toLowerCase()) ? te : `Screen ${oe}${O.isPrimary || H === 0 ? " (Main)" : ""}`, Y = W(R);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${Z} (${O.width || 1920}×${O.height || 1080})`, children: Z }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${Y ? "is-on-canvas" : ""}`,
                  onClick: (Re) => {
                    Re.stopPropagation(), a(e.id, R);
                  },
                  title: Y ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: Y ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Kc,
              {
                hostname: I,
                displayId: R,
                activeSegments: O.segments && O.segments.length > 0 ? O.segments : le,
                viewportStartMs: p,
                viewportDurationMs: y,
                baseEpochMs: _,
                inPointMs: S,
                outPointMs: C,
                globalGaps: x,
                directorSegments: V,
                isAutoDirectorEnabled: r,
                gaps: se,
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
            title: `Workstation: ${M}${h ? ` (${h})` : ""} • Click to select${$ ? " / expand" : ""}`,
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
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: M, children: M }),
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
                  title: `Remove ${M} from project`,
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
          Kc,
          {
            hostname: I,
            displayId: k,
            activeSegments: le,
            viewportStartMs: p,
            viewportDurationMs: y,
            baseEpochMs: _,
            inPointMs: S,
            outPointMs: C,
            globalGaps: x,
            isAutoDirectorEnabled: r,
            gaps: se,
            stepperSegments: $ ? b : null
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
    const y = p * c, S = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o - S * a;
    v += p === 0 ? `M ${y.toFixed(2)},${C.toFixed(2)}` : ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  let f = "";
  for (let p = i - 1; p >= 0; p--) {
    const y = p * c, S = Math.min(1, Math.max(0.02, (e[p] || 0) * d)), C = o + S * a;
    f += ` L ${y.toFixed(2)},${C.toFixed(2)}`;
  }
  return `${v}${f} Z`;
}
function Ex(e, t = 100, n = 24, r = 1) {
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
function Wp({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", i = t === "mic", c = u.useMemo(() => !o || !e ? null : Ex(e, 100, 24, n), [o, e, n]), d = u.useMemo(() => o || !e ? null : Ka(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
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
function jx({
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
  const [y, S] = u.useState(() => Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [C, _] = u.useState(!1);
  u.useEffect(() => {
    let U = !0;
    const le = new AbortController(), se = Ur.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (se) {
      S(se), _(!1);
      return;
    }
    return S(null), _(!0), Ur.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, le.signal, 250).then((V) => {
      U && (V && S(V), _(!1));
    }).catch(() => {
      U && _(!1);
    }), () => {
      U = !1, le.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const w = e.startEpochMs, g = e.endEpochMs, x = Math.max(1, g - w), I = (e.gain || 1) * (t.gain || 1), j = Math.max(d, w), M = Math.min(d + v, g), h = (j - d) / v * 100, A = (M - j) / v * 100;
  if (A <= 0) return null;
  const k = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, P = e.fadeOutMs ?? 50, z = Math.min(45, N / x * 100), $ = Math.min(45, P / x * 100);
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
      onMouseDown: (U) => {
        !U.target.closest(".trim-handle") && !U.target.closest(".btn-menu-close") && !U.target.closest(".clip-channel-tag") && (i == null || i(U));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${p} [${k.toUpperCase()}] (${Ct(w, f, { includeSeconds: !0 })} - ${Ct(g, f, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${P}ms
Drag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (U) => a(U, "start"),
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
          Wp,
          {
            peaks: y,
            channelMode: k,
            effectiveGain: I,
            isLoadingWaveform: C,
            laneColor: n
          }
        ) }),
        P > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${$}%` },
            title: `Fade Out: ${P}ms`,
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
              onClick: (U) => {
                U.stopPropagation(), c == null || c();
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
            onMouseDown: (U) => a(U, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function Cx({
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
  const v = e.startEpochMs, f = e.endEpochMs, p = Math.max(t, v), y = Math.min(t + n, f), S = (p - t) / n * 100, C = (y - p) / n * 100;
  if (C <= 0) return null;
  const _ = e.effectiveChannelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip mode-${_}`,
      style: {
        left: `${S}%`,
        width: `${C}%`,
        borderLeftColor: e.laneColor
      },
      onDoubleClick: o,
      title: `Master Audio Bus Stream: ${l} [${_.toUpperCase()}] (${Ct(v, r, { includeSeconds: !0 })} - ${Ct(f, r, { includeSeconds: !0 })})
Gain: ${Math.round(e.effectiveGain * 100)}%
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Wp,
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
function Sx({
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
  const y = u.useRef(null), [S, C] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [_, w] = u.useState(!1), [g, x] = u.useState(null), [I, j] = u.useState(1), [M, h] = u.useState(50), [A, k] = u.useState(50), [N, P] = u.useState([]), [z, $] = u.useState(null), [U, le] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const L = (ne) => {
      ne.detail && le(ne.detail);
    };
    return window.addEventListener("itb-live-audio-level", L), () => window.removeEventListener("itb-live-audio-level", L);
  }, []);
  const se = u.useCallback(() => {
    C((L) => {
      const ne = !L;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(ne));
      } catch {
      }
      return ne;
    });
  }, []), [V, b] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((L, ne) => {
        var X;
        return {
          id: `clip_${ne}_${L.startEpochMs || L.StartEpochMs}`,
          startEpochMs: L.startEpochMs ?? L.StartEpochMs ?? l,
          endEpochMs: L.endEpochMs ?? L.EndEpochMs ?? l + r,
          sourceStationId: L.sourceStationId ?? L.SourceStationId ?? (((X = t[0]) == null ? void 0 : X.id) || "station-0"),
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
  ]), W = l + o, O = l + n, H = O + r, R = u.useCallback((L) => {
    if (!p) return;
    const ne = [];
    L.forEach((X) => {
      X.isMuted || _ || X.clips.forEach((ee) => {
        ne.push({
          startEpochMs: ee.startEpochMs,
          endEpochMs: ee.endEpochMs,
          sourceStationId: ee.sourceStationId,
          gain: ee.gain * X.gain,
          channelMode: ee.channelMode || X.channelMode || "both",
          fadeInMs: ee.fadeInMs ?? 50,
          fadeOutMs: ee.fadeOutMs ?? 50
        });
      });
    }), ne.sort((X, ee) => X.startEpochMs - ee.startEpochMs), p({ segments: ne });
  }, [p, _]);
  u.useEffect(() => {
    let L = null;
    for (const ne of V)
      if (!(ne.isMuted || _)) {
        for (const X of ne.clips)
          if (W >= X.startEpochMs && W <= X.endEpochMs) {
            const ee = t.find((Q) => Q.id === X.sourceStationId);
            L = {
              stationId: X.sourceStationId,
              stationName: ee ? ee.displayName || ee.hostname || ee.id : X.sourceStationId,
              channelMode: X.channelMode || ne.channelMode || "both",
              gain: X.gain * ne.gain,
              isPlaying: U.isPlaying
            };
            break;
          }
        if (L) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: L }));
  }, [V, _, W, t, U.isPlaying]), u.useEffect(() => {
    const L = () => {
      N.length !== 0 && (b((ee) => {
        const Q = ee.map((J) => ({
          ...J,
          clips: J.clips.filter((de) => !N.includes(de.id))
        }));
        return R(Q), Q;
      }), P([]), x(null));
    }, ne = (ee) => {
      if (ee.key === "Delete" || ee.key === "Backspace") {
        const Q = ee.target;
        if (Q.tagName === "INPUT" || Q.tagName === "TEXTAREA" || Q.isContentEditable) return;
        N.length > 0 && (ee.preventDefault(), L());
      }
    }, X = () => L();
    return window.addEventListener("keydown", ne), window.addEventListener("itb:studio-delete-selected", X), () => {
      window.removeEventListener("keydown", ne), window.removeEventListener("itb:studio-delete-selected", X);
    };
  }, [N, R]);
  const oe = u.useCallback(() => {
    b((L) => {
      const X = `A${L.length + 1}`, ee = {
        id: X,
        name: `Track ${X}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, Q = [...L, ee];
      return R(Q), Q;
    });
  }, [R]), te = u.useCallback((L) => {
    b((ne) => {
      if (ne.length <= 1) return ne;
      const X = ne.filter((ee) => ee.id !== L);
      return R(X), X;
    });
  }, [R]), Z = u.useCallback((L) => {
    b((ne) => {
      const X = ne.map((ee) => ee.id === L ? { ...ee, isMuted: !ee.isMuted } : ee);
      return R(X), X;
    });
  }, [R]), Y = u.useCallback((L) => {
    b((ne) => {
      var Q;
      const X = (Q = ne.find((J) => J.id === L)) == null ? void 0 : Q.isSolo, ee = ne.map((J) => ({
        ...J,
        isSolo: J.id === L ? !X : !1,
        isMuted: J.id === L ? !1 : !X
      }));
      return R(ee), ee;
    });
  }, [R]), Re = u.useCallback((L) => {
    const ne = ["both", "sys", "mic"];
    b((X) => {
      const ee = X.map((Q) => {
        if (Q.id !== L) return Q;
        const J = Q.channelMode || "both", de = ne[(ne.indexOf(J) + 1) % ne.length];
        return {
          ...Q,
          channelMode: de,
          clips: Q.clips.map((qe) => ({ ...qe, channelMode: de }))
        };
      });
      return R(ee), ee;
    });
  }, [R]), Oe = u.useCallback((L, ne) => {
    const X = Math.max(0, Math.min(2, Number(ne)));
    b((ee) => {
      const Q = ee.map((J) => J.id === L ? { ...J, gain: X } : J);
      return R(Q), Q;
    }), oh(X);
  }, [R]), ve = u.useCallback((L, ne) => {
    ne && b((X) => {
      const ee = X.map((Q) => {
        if (Q.id !== L) return Q;
        if (Q.clips.length === 0) {
          const J = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: ne,
            gain: 1,
            channelMode: Q.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...Q, clips: [J] };
        }
        return {
          ...Q,
          clips: Q.clips.map((J) => ({ ...J, sourceStationId: ne }))
        };
      });
      return R(ee), ee;
    });
  }, [l, r, R]), Be = u.useCallback((L, ne = null, X = null) => {
    var lt;
    const ee = ne || ((lt = t[0]) == null ? void 0 : lt.id) || "station-0", Q = X !== null ? X : W, J = Math.min(r, 6e4), de = Q + J, qe = V.find((Ge) => Ge.id === L), _e = (qe == null ? void 0 : qe.channelMode) || "both", Xe = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(Q),
      endEpochMs: Math.round(de),
      sourceStationId: ee,
      gain: 1,
      channelMode: _e,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    b((Ge) => {
      const It = Ge.map(($t) => $t.id === L ? {
        ...$t,
        clips: [...$t.clips, Xe].sort((Rt, Lt) => Rt.startEpochMs - Lt.startEpochMs)
      } : $t);
      return R(It), It;
    });
  }, [V, W, r, t, R]), be = u.useCallback((L, ne = null) => {
    b((X) => {
      const ee = X.map((Q) => {
        if (L && Q.id !== L) return Q;
        const J = [];
        return Q.clips.forEach((de) => {
          (!ne || de.id === ne || N.includes(de.id)) && W > de.startEpochMs + 500 && W < de.endEpochMs - 500 ? (J.push({ ...de, endEpochMs: W }), J.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: W,
            endEpochMs: de.endEpochMs,
            sourceStationId: de.sourceStationId,
            gain: de.gain,
            channelMode: de.channelMode || Q.channelMode || "both",
            fadeInMs: de.fadeInMs ?? 50,
            fadeOutMs: de.fadeOutMs ?? 50
          })) : J.push(de);
        }), { ...Q, clips: J };
      });
      return R(ee), ee;
    }), x(null);
  }, [W, N, R]), Ie = u.useCallback(() => {
    be(null, null);
  }, [be]), et = u.useCallback((L, ne) => {
    b((X) => {
      const ee = X.map((Q) => Q.id !== L ? Q : {
        ...Q,
        clips: Q.clips.filter((J) => J.id !== ne)
      });
      return R(ee), ee;
    }), x(null);
  }, [R]), at = u.useCallback((L, ne, X) => {
    b((ee) => {
      const Q = ee.map((J) => J.id !== L ? J : {
        ...J,
        clips: J.clips.map((de) => de.id === ne ? { ...de, sourceStationId: X } : de)
      });
      return R(Q), Q;
    }), x((ee) => ee ? { ...ee, stationId: X } : null);
  }, [R]), ie = u.useCallback((L, ne, X) => {
    const ee = Math.max(0, Math.min(2.5, Number(X)));
    j(ee), b((Q) => {
      const J = Q.map((de) => de.id !== L ? de : {
        ...de,
        clips: de.clips.map((qe) => qe.id === ne ? { ...qe, gain: ee } : qe)
      });
      return R(J), J;
    }), oh(ee);
  }, [R]), je = u.useCallback((L, ne, X, ee) => {
    const Q = Math.max(0, Math.min(1e4, Math.round(Number(ee) || 0)));
    X === "in" ? h(Q) : k(Q), b((J) => {
      const de = J.map((qe) => qe.id !== L ? qe : {
        ...qe,
        clips: qe.clips.map((_e) => _e.id === ne ? X === "in" ? { ..._e, fadeInMs: Q } : { ..._e, fadeOutMs: Q } : _e)
      });
      return R(de), de;
    }), x((J) => J ? X === "in" ? { ...J, fadeInMs: Q } : { ...J, fadeOutMs: Q } : null);
  }, [R]), ze = u.useCallback((L, ne, X) => {
    var Rt, Lt;
    if (L.preventDefault(), L.stopPropagation(), L.button !== 0) return;
    const ee = V.find((rt) => rt.id === ne), Q = (Rt = ee == null ? void 0 : ee.clips) == null ? void 0 : Rt.find((rt) => rt.id === X);
    if (!Q) return;
    const J = L.clientX, de = Q.startEpochMs, _e = Q.endEpochMs - de, Xe = y.current;
    if (!Xe) return;
    const lt = (Lt = Xe.querySelector(".audio-lane-timeline")) == null ? void 0 : Lt.getBoundingClientRect();
    if (!lt || lt.width <= 0) return;
    let Ge = !1;
    const It = (rt) => {
      const xt = rt.clientX - J;
      Math.abs(xt) > 3 && (Ge = !0);
      const He = xt / lt.width * r;
      let Fe = Math.round(de + He), vt = Fe + _e;
      const Ot = 12 / lt.width * r;
      Math.abs(Fe - W) <= Ot ? (Fe = W, vt = Fe + _e) : Math.abs(vt - W) <= Ot && (vt = W, Fe = vt - _e), Fe < l && (Fe = l, vt = Fe + _e), b((Gt) => Gt.map((Kt) => Kt.id !== ne ? Kt : {
        ...Kt,
        clips: Kt.clips.map((dn) => dn.id === X ? { ...dn, startEpochMs: Fe, endEpochMs: vt } : dn)
      }));
    }, $t = () => {
      window.removeEventListener("mousemove", It), window.removeEventListener("mouseup", $t), Ge && b((rt) => (R(rt), rt));
    };
    window.addEventListener("mousemove", It), window.addEventListener("mouseup", $t);
  }, [V, r, W, l, R]), Ye = u.useCallback((L, ne, X, ee) => {
    L.preventDefault(), L.stopPropagation();
    const Q = L.clientX, J = V.find((Ge) => Ge.id === ne), de = J == null ? void 0 : J.clips.find((Ge) => Ge.id === X);
    if (!de) return;
    const qe = de.startEpochMs, _e = de.endEpochMs, Xe = (Ge) => {
      var rt;
      const It = Ge.clientX - Q, $t = (rt = y.current) == null ? void 0 : rt.querySelector(".audio-lane-timeline");
      if (!$t) return;
      const Rt = $t.getBoundingClientRect(), Lt = It / Rt.width * r;
      b((xt) => xt.map((He) => He.id !== ne ? He : {
        ...He,
        clips: He.clips.map((Fe) => {
          if (Fe.id !== X) return Fe;
          if (ee === "start") {
            const vt = Math.min(_e - 500, qe + Lt);
            return { ...Fe, startEpochMs: Math.round(vt) };
          } else {
            const vt = Math.max(qe + 500, _e + Lt);
            return { ...Fe, endEpochMs: Math.round(vt) };
          }
        })
      }));
    }, lt = () => {
      window.removeEventListener("mousemove", Xe), window.removeEventListener("mouseup", lt), b((Ge) => (R(Ge), Ge));
    };
    window.addEventListener("mousemove", Xe), window.addEventListener("mouseup", lt);
  }, [V, r, R]), ge = u.useCallback((L, ne, X) => {
    b((ee) => {
      const Q = ee.map((J) => J.id !== L ? J : {
        ...J,
        clips: J.clips.map((de) => de.id === ne ? { ...de, channelMode: X } : de)
      });
      return R(Q), Q;
    }), x((ee) => ee ? { ...ee, channelMode: X } : null);
  }, [R]), pe = u.useCallback((L, ne) => {
    var _e;
    const X = V.find((Xe) => Xe.id === L), ee = (_e = X == null ? void 0 : X.clips) == null ? void 0 : _e.find((Xe) => Xe.id === ne);
    if (!ee) return;
    const Q = ee.channelMode || X.channelMode || "both", J = ["both", "sys", "mic"], de = (J.indexOf(Q) + 1) % J.length, qe = J[de];
    ge(L, ne, qe);
  }, [V, ge]), ae = (L, ne, X) => {
    L.preventDefault(), L.stopPropagation();
    const ee = 280, Q = 390, J = Math.max(16, Math.min(window.innerWidth - ee - 16, L.clientX - ee / 2));
    let de = L.clientY - Q - 12;
    de < 80 && (de = Math.min(window.innerHeight - Q - 16, L.clientY + 24)), j(X.gain || 1), h(X.fadeInMs ?? 50), k(X.fadeOutMs ?? 50), x({
      laneId: ne,
      clipId: X.id,
      s: X.startEpochMs,
      e: X.endEpochMs,
      x: J,
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
    const L = () => x(null), ne = (X) => {
      X.key === "Escape" && x(null);
    };
    return window.addEventListener("click", L), window.addEventListener("keydown", ne), () => {
      window.removeEventListener("click", L), window.removeEventListener("keydown", ne);
    };
  }, [g]);
  const Me = u.useMemo(() => {
    if (_) return [];
    const L = V.some((ee) => ee.isSolo), ne = V.filter((ee) => L ? ee.isSolo : !ee.isMuted), X = [];
    return ne.forEach((ee) => {
      const Q = na[V.indexOf(ee) % na.length];
      ee.clips.forEach((J) => {
        X.push({
          ...J,
          laneId: ee.id,
          laneName: ee.name,
          laneColor: Q,
          effectiveChannelMode: J.channelMode || ee.channelMode || "both",
          effectiveGain: (J.gain || 1) * (ee.gain || 1)
        });
      });
    }), X.sort((ee, Q) => ee.startEpochMs - Q.startEpochMs);
  }, [V, _]);
  return !t || t.length === 0 ? null : S ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: se,
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
            onClick: Ie,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${U.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: U.db > -55 ? `${U.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (U.peak || 0) * 100))}%`,
                background: U.peak > 0.85 ? "#F43F5E" : U.peak > 0.65 ? "#F59E0B" : "#10B981"
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
                const ne = !L;
                return R(V), ne;
              });
            },
            title: _ ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: _ ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: V.map((L, ne) => {
      const X = na[ne % na.length], ee = z === L.id, Q = t.find((J) => {
        var de;
        return J.id === ((de = L.clips[0]) == null ? void 0 : de.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: X }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: X }, children: L.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: L.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (Q == null ? void 0 : Q.id) || "",
              onChange: (J) => ve(L.id, J.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((J) => /* @__PURE__ */ s.jsx("option", { value: J.id, children: J.displayName || J.hostname || J.id }, J.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${L.isMuted ? "active" : ""}`,
                onClick: () => Z(L.id),
                title: L.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${L.isSolo ? "active" : ""}`,
                onClick: () => Y(L.id),
                title: L.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${L.channelMode || "both"}`,
                onClick: () => Re(L.id),
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
                onChange: (J) => Oe(L.id, J.target.value),
                title: `Lane Gain: ${Math.round(L.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(L.gain * 100),
              "%"
            ] })
          ] }),
          V.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => te(L.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${ee ? "is-drag-over" : ""}`,
            onClick: () => P([]),
            onDragOver: (J) => {
              J.preventDefault(), J.dataTransfer.dropEffect = "copy", z !== L.id && $(L.id);
            },
            onDragLeave: () => {
              z === L.id && $(null);
            },
            onDrop: (J) => {
              J.preventDefault(), $(null);
              const de = J.dataTransfer.getData("text/station-id") || J.dataTransfer.getData("text/plain");
              if (de) {
                const qe = J.currentTarget.getBoundingClientRect(), _e = Math.max(0, Math.min(1, (J.clientX - qe.left) / qe.width)), Xe = Math.round(O + _e * r);
                Be(L.id, de, Xe);
              }
            },
            onDoubleClick: (J) => {
              var Xe;
              const de = J.currentTarget.getBoundingClientRect(), qe = Math.max(0, Math.min(1, (J.clientX - de.left) / de.width)), _e = Math.round(O + qe * r);
              Be(L.id, (Xe = t[0]) == null ? void 0 : Xe.id, _e);
            },
            children: [
              L.clips.map((J) => {
                const de = t.find((_e) => _e.id === J.sourceStationId), qe = de ? de.displayName || de.hostname || de.id : J.sourceStationId;
                return J.endEpochMs <= O || J.startEpochMs >= H ? null : /* @__PURE__ */ s.jsx(
                  jx,
                  {
                    clip: J,
                    lane: L,
                    laneColor: X,
                    isSelected: N.includes(J.id),
                    onSelect: (_e) => {
                      _e.stopPropagation(), _e.ctrlKey || _e.metaKey ? P(
                        (Xe) => Xe.includes(J.id) ? Xe.filter((lt) => lt !== J.id) : [...Xe, J.id]
                      ) : P([J.id]);
                    },
                    onOpenMenu: (_e) => ae(_e, L.id, J),
                    onTrimDrag: (_e, Xe) => Ye(_e, L.id, J.id, Xe),
                    onClipMoveDrag: (_e) => ze(_e, L.id, J.id),
                    onToggleChannelMode: () => pe(L.id, J.id),
                    vpStartEpoch: O,
                    viewportDurationMs: r,
                    timeMode: f,
                    stationName: qe
                  },
                  J.id
                );
              }),
              L.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var J;
                    return Be(L.id, (J = t[0]) == null ? void 0 : J.id, W);
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
    g && As.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: g.x, top: g.y },
          onClick: (L) => L.stopPropagation(),
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
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((L) => {
                const ne = L.id === g.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${ne ? "is-selected" : ""}`,
                    onClick: () => at(g.laneId, g.clipId, L.id),
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
                    className: `btn-channel-chip mode-both ${g.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => ge(g.laneId, g.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${g.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => ge(g.laneId, g.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${g.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => ge(g.laneId, g.clipId, "mic"),
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
                  onChange: (L) => ie(g.laneId, g.clipId, L.target.value),
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
                      onChange: (L) => je(g.laneId, g.clipId, "in", L.target.value),
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
                      onChange: (L) => je(g.laneId, g.clipId, "out", L.target.value),
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
                  onClick: () => be(g.laneId, g.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => et(g.laneId, g.clipId),
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
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", onClick: se, children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: _ || Me.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: Me.length > 0 ? `${Me.length} CLIPS ACTIVE` : _ ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: U.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: (L) => {
              L.target.closest(".collapsed-master-clip") || se();
            },
            children: Me.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : Me.map((L) => {
              const ne = t.find((ee) => ee.id === L.sourceStationId), X = ne ? ne.displayName || ne.hostname || ne.id : L.sourceStationId;
              return L.endEpochMs <= O || L.startEpochMs >= H ? null : /* @__PURE__ */ s.jsx(
                Cx,
                {
                  clip: L,
                  vpStartEpoch: O,
                  viewportDurationMs: r,
                  timeMode: f,
                  stationName: X,
                  onExpand: se
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
function Mx({
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
  const C = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [_, w] = u.useState(null), [g, x] = u.useState(null);
  So.useEffect(() => {
    if (g === null) return;
    const k = (P) => {
      P.key === "Escape" && x(null);
    }, N = (P) => {
      !P.target.closest(".kf-inspector-popover") && !P.target.closest(".kf-marker-diamond") && x(null);
    };
    return window.addEventListener("keydown", k), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", k), window.removeEventListener("mousedown", N);
    };
  }, [g]);
  const I = d + f, j = d + i, M = j + c, h = (k) => {
    const N = k.currentTarget.getBoundingClientRect(), P = k.clientX - N.left, z = Math.max(0, Math.min(1, P / N.width)), $ = Math.round(j + z * c);
    r && r($);
  }, A = (k, N, P) => {
    if (k.button !== 0) return;
    k.stopPropagation(), k.preventDefault();
    const z = k.clientX, $ = P.timestampEpochMs, U = P.id || `kf_${N}_${$}`, le = k.currentTarget.closest(".track-surface");
    if (!le) return;
    let se = !1;
    w({
      idx: N,
      kfId: U,
      startClientX: z,
      initialEpoch: $,
      currentEpoch: $
    });
    const V = (W) => {
      const O = W.clientX - z;
      Math.abs(O) > 3 && (se = !0);
      const H = le.getBoundingClientRect(), R = O / H.width * c;
      let oe = Math.round($ + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const te = d + p, Z = d + y, Y = 14 / H.width * c;
      Math.abs(oe - I) <= Y ? oe = I : Math.abs(oe - te) <= Y ? oe = te : Math.abs(oe - Z) <= Y && (oe = Z), w((Re) => Re ? { ...Re, currentEpoch: oe } : null);
    }, b = (W) => {
      window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", b), w(null);
      const O = le.getBoundingClientRect(), R = (W.clientX - z) / O.width * c;
      let oe = Math.round($ + R);
      oe = Math.max(d, Math.min(d + v, oe));
      const te = d + p, Z = d + y, Y = 14 / O.width * c;
      Math.abs(oe - I) <= Y ? oe = I : Math.abs(oe - te) <= Y ? oe = te : Math.abs(oe - Z) <= Y && (oe = Z), se ? (o && o(U, oe), n && n(N, oe)) : (n && n(N, $), x((Re) => Re === N ? null : N));
    };
    window.addEventListener("mousemove", V), window.addEventListener("mouseup", b);
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
            const P = (_ == null ? void 0 : _.idx) === N, z = P ? _.currentEpoch : k.timestampEpochMs;
            if (z < j - 5e4 || z > M + 5e4) return null;
            const $ = (z - j) / c * 100;
            if ($ < -2 || $ > 102) return null;
            const U = N === t, le = Ct(z, S, { includeSeconds: !0 }), se = `${k.transitionType || "smooth"} (${k.transitionDurationSec ?? 0.5}s)`, V = Math.max(0, (z - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${U ? "is-active" : ""} ${P ? "is-dragging" : ""}`,
                style: { left: `${$}%` },
                onMouseDown: (b) => A(b, N, k),
                onContextMenu: (b) => {
                  b.preventDefault(), b.stopPropagation(), C.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${le} (+${V}s) • ${se}
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
                  g === N && !P && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (b) => b.stopPropagation(),
                      onMouseDown: (b) => b.stopPropagation(),
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
                              onClick: (b) => {
                                b.stopPropagation(), x(null);
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
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((b) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(k.transitionDurationSec ?? 0.5) === b ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(N, { transitionDurationSec: b }),
                                children: [
                                  b,
                                  "s"
                                ]
                              },
                              b
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (b) => {
                                b.stopPropagation(), l && l(N), x(null);
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
function bx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (k) => !r || r <= 0 ? "0%" : `${(k - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, f = (l - n) / r * 100, p = f >= -0.2 && f <= 100.2, y = Math.max(0, Math.min(100, f)), S = Math.max(0, d), C = Math.min(100, v), _ = Math.max(0, C - S), w = (k) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(k, N);
  }, g = d < 1.5, x = v > 98.5, I = d <= 0.2 && d >= -0.2, j = v >= 99.8 && v <= 100.2, M = f >= -0.2 && f < 3.5, h = f > 96.5 && f <= 100.2, A = u.useMemo(() => Ct(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    _ > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${S}%`, width: `${_}%` },
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
        className: `marker out-marker ${x ? "flipped" : ""} ${j ? "at-edge" : ""}`,
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
const Ix = So.memo(bx);
function Tx({
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
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: Ct(t + e.targetMs, n) })
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
function Ax({
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
const $x = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Rx({
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
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: $x };
}
function Lx({
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
  const [p, y] = u.useState(null), [S, C] = u.useState(null), _ = (w, g) => {
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
      const j = v(I.clientX);
      if (p === "playhead") {
        let M = j;
        Math.abs(M - l) <= w ? M = l : Math.abs(M - a) <= w && (M = a), r(Math.max(0, Math.min(t, M)));
      } else if (p === "in") {
        const M = a - 1e3;
        o(Math.max(0, Math.min(j, M)));
      } else if (p === "out") {
        const M = l + 1e3;
        i(Math.min(t, Math.max(j, M)));
      } else if (p === "range" && S) {
        const M = j - v(S.startX), h = S.initialOut - S.initialIn;
        let A = S.initialIn + M, k = S.initialOut + M;
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
const nr = 4;
function zp({
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
  inPointMs: C = 0,
  setInPointMs: _,
  outPointMs: w = 36e5,
  setOutPointMs: g,
  onExport: x,
  recordingSegments: I = {},
  movieBoundaries: j,
  viewportStartMs: M = 0,
  onViewportStartChange: h,
  onEstimateLoaded: A,
  onFitRange: k,
  onJumpViewportTo: N,
  keystrokeMode: P = "BURN_IN",
  onChangeKeystrokeMode: z,
  keystrokes: $ = [],
  showKeystrokes: U = !1,
  showRulerKeystrokes: le = !1,
  onToggleRulerKeystrokes: se,
  _onSplitDirectorSegment: V,
  _onChangeDirectorSegmentDisplay: b,
  _onResetDirectorSegmentToAuto: W,
  audioRoutingPlan: O,
  onSplitAudioSegment: H,
  onChangeAudioSegmentStation: R,
  onChangeAudioSegmentGain: oe,
  onFollowVisualFeed: te,
  isAutoFollowAudio: Z,
  canvasLayoutTimeline: Y,
  activeKfIndex: Re = 0,
  onSelectKeyframe: Oe,
  onAddKeyframeAtEpoch: ve,
  onDeleteKeyframe: Be,
  onUpdateKeyframeEpoch: be,
  onUpdateKeyframeTransition: Ie,
  onToggleDisplayOnCanvas: et,
  onUpdateAudioPlan: at
}) {
  var Le, nt;
  const [ie, je] = u.useState(null), [ze, Ye] = u.useState(0), [ge, pe] = u.useState(null), [ae, Me] = u.useState(!0), L = (ce) => {
    var K, fe, xe;
    return ((ce == null ? void 0 : ce.displays) || (ce == null ? void 0 : ce.Displays) || ((K = ce == null ? void 0 : ce.displayTopology) == null ? void 0 : K.displays) || ((fe = ce == null ? void 0 : ce.DisplayTopology) == null ? void 0 : fe.Displays) || ((xe = ce == null ? void 0 : ce.topology) == null ? void 0 : xe.displays) || []).length;
  }, [ne, X] = u.useState(() => {
    var ce;
    return e.length === 1 && L(e[0]) > 1 ? (ce = e[0]) == null ? void 0 : ce.id : null;
  });
  u.useEffect(() => {
    var ce;
    if (e.length === 1 && !ne && ((ce = e[0]) != null && ce.id) && L(e[0]) > 1)
      X(e[0].id);
    else if (ne) {
      const st = e.find((K) => K.id === ne);
      (!st || L(st) <= 1) && X(null);
    }
  }, [e, ne]);
  const ee = u.useRef(null), Q = u.useRef(null), J = d / Math.max(1, v), de = Math.ceil(e.length / nr) || 1, qe = u.useMemo(() => {
    const ce = ze * nr;
    return e.slice(ce, ce + nr);
  }, [e, ze]);
  u.useEffect(() => {
    if (!t && !ne) return;
    const ce = ne || t, st = e.findIndex((K) => K.id === ce);
    if (st !== -1) {
      const K = Math.floor(st / nr);
      K !== ze && Ye(K);
    }
  }, [t, ne, e, ze]);
  const _e = ((Le = Y == null ? void 0 : Y.keyframes) == null ? void 0 : Le[Re]) || ((nt = Y == null ? void 0 : Y.keyframes) == null ? void 0 : nt[0]), Xe = u.useMemo(() => {
    var ce;
    return ((ce = _e == null ? void 0 : _e.layout) == null ? void 0 : ce.placements) || [];
  }, [_e]), lt = u.useMemo(() => e.find((ce) => ce.id === t) || null, [e, t]), Ge = (j == null ? void 0 : j.globalFirstMs) ?? null, It = (j == null ? void 0 : j.globalLastMs) ?? null, $t = u.useMemo(() => (C > 500 || w < d - 500) && w - C >= 1e3, [C, w, d]), Rt = u.useMemo(() => e.map((ce) => ce.id).sort().join(","), [e]), { estimateData: Lt, isEstimating: rt, formatEstimateSize: xt } = Rx({
    stationIdsKey: Rt,
    inPointMs: C,
    outPointMs: w,
    baseEpochMs: i,
    onEstimateLoaded: A
  }), He = u.useCallback((ce) => {
    if (!ee.current) return M;
    const st = ee.current.getBoundingClientRect(), K = st.left + 200, fe = st.width - 200 - 58;
    if (fe <= 0) return M;
    const xe = Math.max(0, Math.min(ce - K, fe));
    return Math.round(M + xe / fe * J);
  }, [M, J]), { draggingTarget: Fe, handleStartDrag: vt } = Lx({
    viewportDurationMs: J,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: S,
    inPointMs: C,
    setInPointMs: _,
    outPointMs: w,
    setOutPointMs: g,
    viewportStartMs: M,
    setViewportStartMs: h,
    getMsFromClientX: He,
    minimapRef: Q
  }), Ot = u.useRef(v);
  Ot.current = v;
  const Gt = u.useRef(M);
  Gt.current = M;
  const Kt = u.useRef(d);
  Kt.current = d;
  const dn = u.useRef(y);
  dn.current = y, u.useEffect(() => {
    const ce = ee.current;
    if (!ce) return;
    const st = (K) => {
      K.preventDefault(), K.stopPropagation();
      const fe = K.ctrlKey || K.shiftKey, xe = Ot.current, Ue = Gt.current, Je = Kt.current, it = dn.current;
      if (fe) {
        const ft = Math.abs(K.deltaX) > Math.abs(K.deltaY) ? K.deltaX : K.deltaY;
        if (ft === 0) return;
        const Ze = Je / Math.max(1, xe), Nt = Math.max(0, Je - Ze), wt = Ze * 0.08 * (ft > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(Nt, Ue + wt)));
      } else {
        if (K.deltaY === 0) return;
        const Ze = K.deltaY < 0 ? 1.25 : 0.8, Nt = Math.max(32, Je / 2e3), wt = ce.getBoundingClientRect(), Bt = wt.left + 200, Tt = wt.width - 200 - 58;
        let an = 0.5;
        if (Tt > 0)
          if (K.clientX >= Bt && K.clientX <= wt.right - 58)
            an = Math.max(0, Math.min(1, (K.clientX - Bt) / Tt));
          else {
            const Ys = Je / Math.max(1, xe), Zt = (it - Ue) / Ys;
            an = Zt >= 0 && Zt <= 1 ? Zt : 0.5;
          }
        const An = Math.max(1, Math.min(Nt, Math.round(xe * Ze * 100) / 100));
        if (An === xe) return;
        const wn = Je / xe, Bn = Je / An, Dt = Ue + an * wn - an * Bn, Rs = Math.max(0, Je - Bn);
        f == null || f(An), h == null || h(Math.max(0, Math.min(Rs, Dt)));
      }
    };
    return ce.addEventListener("wheel", st, { passive: !1, capture: !0 }), () => ce.removeEventListener("wheel", st, { capture: !0 });
  }, [f, h]);
  const De = e.length > 0 && Math.abs(w - C) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: ee,
      className: "timeline-board-root",
      onContextMenu: (ce) => {
        var K;
        ce.preventDefault();
        const st = (K = ee.current) == null ? void 0 : K.getBoundingClientRect();
        !st || ce.clientX - st.left < 200 || ce.clientX > st.right - 58 || pe({ x: ce.clientX, y: ce.clientY, targetMs: Math.max(0, Math.min(d, He(ce.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            px,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: C,
              setInPointMs: _,
              outPointMs: w,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                mx,
                {
                  minimapRef: Q,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: M,
                  viewportDurationMs: J,
                  zoomLevel: v,
                  inPointMs: C,
                  outPointMs: w,
                  playheadMs: y,
                  onStartDragMinimap: vt
                }
              ),
              /* @__PURE__ */ s.jsx(
                gx,
                {
                  earliestMediaMs: Ge,
                  latestMediaMs: It,
                  hasActiveCut: $t,
                  onJumpToFirst: () => {
                    Ge !== null && (S == null || S(Ge), N == null || N(Ge, "start"));
                  },
                  onJumpToLast: () => {
                    It !== null && (S == null || S(It), N == null || N(It, "end"));
                  },
                  onContextualFit: () => {
                    $t ? k == null || k(C, w) : Ge !== null && It !== null && It > Ge ? k == null || k(Ge, It) : p == null || p();
                  },
                  onResetZoom: p,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: P,
                  onChangeKeystrokeMode: z,
                  showRulerKeystrokes: le,
                  onToggleRulerKeystrokes: se
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              fx,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: M,
                viewportDurationMs: J,
                totalDurationMs: d,
                hoverMs: ie,
                onHoverChange: je,
                onSeek: (ce) => S == null ? void 0 : S(ce),
                inPointMs: C,
                outPointMs: w,
                earliestMediaMs: Ge,
                movieBoundaries: j,
                stationHostname: (lt == null ? void 0 : lt.hostname) || (lt == null ? void 0 : lt.id) || (lt == null ? void 0 : lt.name),
                activeStationName: (lt == null ? void 0 : lt.displayName) || (lt == null ? void 0 : lt.hostname) || (lt == null ? void 0 : lt.name),
                showKeystrokes: !!(le ?? U),
                keystrokes: $
              }
            ) })
          ] })
        ] }),
        de > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ze === 0,
              onClick: () => Ye((ce) => Math.max(0, ce - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            ze * nr + 1,
            "–",
            Math.min(e.length, (ze + 1) * nr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: ze >= de - 1,
              onClick: () => Ye((ce) => Math.min(de - 1, ce + 1)),
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
            onMouseMove: (ce) => {
              if (Fe || !ee.current) return;
              const st = ee.current.getBoundingClientRect();
              ce.clientX >= st.left + 200 && ce.clientX <= st.right - 58 ? je(He(ce.clientX)) : je(null);
            },
            onMouseLeave: () => !Fe && je(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => Me((ce) => !ce), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: ae ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  ae && de > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ze === 0,
                        onClick: (ce) => {
                          ce.stopPropagation(), Ye((st) => Math.max(0, st - 1));
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
                      de,
                      " (",
                      ze * nr + 1,
                      "–",
                      Math.min(e.length, (ze + 1) * nr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: ze >= de - 1,
                        onClick: (ce) => {
                          ce.stopPropagation(), Ye((st) => Math.min(de - 1, st + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !ae && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => Me(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (Xe == null ? void 0 : Xe.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var xe, Ue, Je, it, ft;
                    const ce = (Xe == null ? void 0 : Xe.find((Ze) => Ze.isPrimary || Ze.isFocused)) || (Xe == null ? void 0 : Xe[0]), st = (ce == null ? void 0 : ce.stationId) || ((xe = e[0]) == null ? void 0 : xe.hostname) || ((Ue = e[0]) == null ? void 0 : Ue.id), K = (ce == null ? void 0 : ce.displayId) || "mon-0";
                    let fe = [];
                    if (Xe && Xe.length > 0) {
                      const Ze = /* @__PURE__ */ new Map();
                      Xe.forEach((Nt) => {
                        var Bt;
                        (I[Nt.stationId] || I[(Bt = Nt.stationId) == null ? void 0 : Bt.toLowerCase()] || []).forEach((Tt) => {
                          const an = `${Tt.startEpochMs || Tt.start}_${Tt.endEpochMs || Tt.end}`;
                          Ze.has(an) || Ze.set(an, Tt);
                        });
                      }), fe = Array.from(Ze.values());
                    }
                    return fe.length === 0 && (fe = I[(Je = e[0]) == null ? void 0 : Je.id] || I[(it = e[0]) == null ? void 0 : it.hostname] || ((ft = e[0]) == null ? void 0 : ft.segments) || []), /* @__PURE__ */ s.jsx(
                      Kc,
                      {
                        hostname: st,
                        displayId: K,
                        activeSegments: fe,
                        viewportStartMs: M,
                        viewportDurationMs: J,
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
                ae && (e.length > 0 ? qe.map((ce) => {
                  const st = !!(t && ce.id === t), K = ne === ce.id, fe = o ? o[ce.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    wx,
                    {
                      station: ce,
                      isExpanded: K && L(ce) > 1,
                      onToggleExpand: () => {
                        L(ce) > 1 && X((xe) => xe === ce.id ? null : ce.id);
                      },
                      isAutoDirectorEnabled: fe,
                      onToggleAutoDirector: a,
                      canvasPlacements: Xe,
                      onToggleDisplayOnCanvas: et,
                      directorPlan: ce.directorPlan,
                      isActive: st,
                      onSelect: () => n == null ? void 0 : n(ce.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: M,
                      viewportDurationMs: J,
                      inPointMs: C,
                      outPointMs: w,
                      baseEpochMs: i,
                      segments: I[ce.id] || I[ce.hostname] || ce.segments || [],
                      recordingSegments: I,
                      globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || []
                    },
                    ce.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Sx,
                  {
                    audioPlan: O,
                    stations: e,
                    viewportStartMs: M,
                    viewportDurationMs: J,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: H,
                    onChangeSegmentStation: R,
                    onChangeSegmentGain: oe,
                    onFollowVisualFeed: te,
                    isAutoFollow: Z,
                    timeMode: c,
                    onUpdateAudioPlan: at
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  Mx,
                  {
                    canvasLayoutTimeline: Y,
                    activeKfIndex: Re,
                    onSelectKeyframe: Oe,
                    onAddKeyframeAtEpoch: ve,
                    onDeleteKeyframe: Be,
                    onUpdateKeyframeEpoch: be,
                    onUpdateKeyframeTransition: Ie,
                    viewportStartMs: M,
                    viewportDurationMs: J,
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
                Ax,
                {
                  isRangeValid: De,
                  onExport: x,
                  isEstimating: rt,
                  estimateData: Lt,
                  formatEstimateSize: xt,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ix,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: M,
            viewportDurationMs: J,
            playheadMs: y,
            inPointMs: C,
            outPointMs: w,
            onStartDrag: vt
          }
        ),
        /* @__PURE__ */ s.jsx(
          Tx,
          {
            contextMenu: ge,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ce) => {
              ge && (ce === "playhead" ? S == null || S(ge.targetMs) : ce === "in" ? _ == null || _(Math.max(0, Math.min(ge.targetMs, w - 1e3))) : ce === "out" && (g == null || g(Math.min(d, Math.max(ge.targetMs, C + 1e3)))), pe(null));
            },
            onClose: () => pe(null)
          }
        )
      ]
    }
  );
}
function Ox({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Dx({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function Px({ station: e, isSelected: t, onToggle: n, meta: r }) {
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
function _x({
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
  activeTabName: C,
  onSelectAllInScope: _,
  onClearInScope: w,
  viewMode: g = "grid",
  onViewModeChange: x,
  isDrawerMode: I = !1
}) {
  const [j, M] = u.useState(!1), h = v !== "all", A = !C || C.toLowerCase() === "all", k = A ? "Select All" : `Select ${C}`, N = A ? "Clear All" : `Clear ${C}`;
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
            onChange: (P) => t(P.target.value)
          }
        )
      ] }),
      I && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${j ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => M(!j),
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
          onChange: (P) => a(P.target.value),
          children: l.map((P) => {
            const z = P.id === "all" ? c.map((U) => U.id) : P.stationIds || [], $ = z.filter((U) => d.includes(U)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: P.id, children: [
              P.name,
              " (",
              $,
              "/",
              z.length,
              ")"
            ] }, P.id);
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
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((P) => {
        const z = o === P.id, $ = P.id === "all" ? c.map((se) => se.id) : P.stationIds || [], U = $.length, le = $.filter((se) => d.includes(se)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${z ? "active" : ""}`,
            onClick: () => a(P.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: P.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${le > 0 ? "has-selected" : ""}`, children: [
                le,
                "/",
                U
              ] })
            ]
          },
          P.id
        );
      }) })
    ] })),
    (!I || j) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${I ? "is-collapsed-tray" : ""}`, children: [
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
      !I && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
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
function Fx({
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
    const y = Math.min(n, r), S = Math.min(p, r), C = Math.ceil(r / n), _ = Math.ceil(r / p);
    return y !== S || C !== _;
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
function Bx({
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
const Hp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function dh(e, t, n = Hp) {
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
function Ux(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function Wx(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function zx(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Hp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? Wx(e.bytesRecorded) : "--");
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
  const S = [];
  for (const h of y)
    if (S.length === 0)
      S.push({ ...h });
    else {
      const A = S[S.length - 1];
      h.startEpoch <= A.endEpoch + 1e3 ? A.endEpoch = Math.max(A.endEpoch, h.endEpoch) : S.push({ ...h });
    }
  let C = 0;
  for (const h of S)
    C += h.endEpoch - h.startEpoch;
  const _ = o > 0 ? C / o * 100 : 0, w = _ > 0 && _ < 1 ? Number(_.toFixed(1)) : Math.min(100, Math.round(_)), g = [];
  let x = f, I = 0;
  for (const h of S) {
    if (h.startEpoch > x + 2e3) {
      const N = (h.startEpoch - x) / o * 100, P = (x - f) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, P),
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
  const j = I > 0 || w < 100, M = dh(w, j, r);
  return {
    coveragePct: w,
    recordedDuration: Ux(C),
    totalRecordedMs: C,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: j,
    gapsCount: I,
    trafficStatus: M,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const Hx = Object.freeze([]), Kx = 12;
function Vx({
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
  systemTabs: p = Hx,
  recordingSegments: y = {},
  baseEpochMs: S = 0,
  durationMs: C = 0
}) {
  const [_, w] = u.useState([]), [g, x] = u.useState("all"), [I, j] = u.useState(""), [M, h] = u.useState(!0), [A, k] = u.useState("all"), [N, P] = u.useState(null), [z, $] = u.useState(!1), [U, le] = u.useState(15), [se, V] = u.useState(8), [b, W] = u.useState(1), O = u.useRef(!1), H = u.useRef(null), R = c && r.length === 0, oe = r.length === 0 && !c;
  let te = "is-closed";
  i || oe || R ? te = "is-full-width" : e && (te = "is-open"), u.useLayoutEffect(() => {
    const ae = () => {
      if (!H.current) return;
      const L = H.current.clientHeight;
      if (L <= 0) return;
      const ne = H.current.querySelector(".station-row, .hub-table-row"), X = ne ? ne.offsetHeight : 40;
      if (X > 0) {
        const Q = Math.floor(L / X) - 2, de = [5, 10, 15, 20, 25, 30].filter((qe) => qe <= Q).pop() || 5;
        le(de);
      }
      const ee = H.current.clientWidth;
      if (ee > 0) {
        const de = Math.max(1, Math.floor((ee + 12) / 252)), _e = Math.max(1, Math.floor((L + 12) / (175 + 12))), Xe = Math.max(de * _e, de);
        V(Xe);
      }
    };
    ae(), window.addEventListener("resize", ae);
    const Me = new ResizeObserver(ae);
    return H.current && Me.observe(H.current), () => {
      window.removeEventListener("resize", ae), Me.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (p && p.length > 0) {
      w(p);
      return;
    }
    if (O.current || !e && !i) return;
    O.current = !0;
    let ae = !0;
    return (async () => {
      $(!0);
      try {
        const L = await fetch("/api/v1/dashboard/tabs");
        if (L.ok && ae) {
          const ne = await L.json();
          Array.isArray(ne) && w(ne);
        }
      } catch (L) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", L);
      } finally {
        ae && $(!1);
      }
    })(), () => {
      ae = !1;
    };
  }, [e, i, p]);
  const Z = u.useMemo(() => {
    const ae = _.length > 0 ? _ : p;
    if (ae && ae.length > 0) {
      const Me = ae.map((L) => {
        const ne = L.hostnames || L.assignedHostnames || L.stations || L.stationIds || [], X = r.filter((ee) => {
          const Q = (ee.hostname || ee.name || "").trim().toLowerCase();
          return ne.some((J) => typeof J == "string" ? J.trim().toLowerCase() === Q || Q.includes(J.trim().toLowerCase()) : (J.hostname || J.name || "").trim().toLowerCase() === Q);
        }).map((ee) => ee.id);
        return {
          id: String(L.id || L.tabId || L.name),
          name: L.name || "Tab",
          stationIds: X
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((L) => L.id) },
        ...Me.filter((L) => L.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((Me) => Me.id) }];
  }, [_, p, r]), Y = u.useMemo(() => Z.find((ae) => ae.id === g) || Z[0], [Z, g]), Re = u.useMemo(() => !Y || Y.id === "all" ? r.map((ae) => ae.id) : Y.stationIds || [], [Y, r]), Oe = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((ae) => ae.isLoaded || ae.segments && ae.segments.length > 0).length : r.filter((ae) => y[ae.id] !== void 0 || ae.isLoaded).length, [r, y]), ve = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && Oe < r.length && Object.keys(y).length > 0), [d, c, r.length, Oe, y]), Be = u.useMemo(() => {
    const ae = /* @__PURE__ */ new Map(), Me = { baseEpochMs: S, durationMs: C };
    for (const L of r) {
      const X = !(y && y[L.id] !== void 0 || L.isLoaded === !0 || L.segments && L.segments.length > 0) && (ve || c || d), ee = y && y[L.id] || L.segments || [], Q = zx(L, ee, Me);
      ae.set(L.id, {
        ...Q,
        hasAudio: L.hasAudio !== void 0 ? L.hasAudio : Q == null ? void 0 : Q.hasAudio,
        audioLabel: L.audioLabel || (L.hasAudio ? "AAC" : (Q == null ? void 0 : Q.audioLabel) || "NONE"),
        audioChannels: L.audioChannels ? L.audioChannels === 1 ? "Mono" : "Stereo" : Q == null ? void 0 : Q.audioChannels,
        feedSpec: L.feedSpec || (Q == null ? void 0 : Q.feedSpec) || `${L.resolution || "1080p"} • ${L.fps || 30}fps`,
        resolution: L.resolution || (Q == null ? void 0 : Q.resolution) || "1080p",
        fps: L.fps || (Q == null ? void 0 : Q.fps) || 30,
        isLoading: X
      });
    }
    return ae;
  }, [r, y, S, C, ve, c, d]), be = u.useMemo(() => r.filter((ae) => {
    const Me = Be.get(ae.id), L = y && y[ae.id] && y[ae.id].length > 0 || ae.segments && ae.segments.length > 0, ne = Me && (Me.coveragePct > 0 || Me.totalRecordedMs > 0), X = typeof ae.recordingsCount == "number" && ae.recordingsCount > 0;
    return Me && !Me.isLoading ? ne || L : X || L;
  }), [r, Be, y]), Ie = u.useMemo(() => be.filter((ae) => {
    if (Y.id !== "all" && !Re.includes(ae.id) || !(ae.displayName || ae.hostname || ae.name || "").toLowerCase().includes(I.toLowerCase())) return !1;
    const L = l.includes(ae.id), ne = Be.get(ae.id);
    return A === "selected" ? L : A === "unselected" ? !L : A === "gaps" ? ne == null ? void 0 : ne.hasGaps : A === "audio" ? ne == null ? void 0 : ne.hasAudio : !0;
  }).sort((ae, Me) => M ? (ae.displayName || ae.hostname || "").localeCompare(Me.displayName || Me.hostname || "") : 0), [be, Y, Re, I, A, l, M, Be]), et = u.useMemo(() => N !== null ? N : Ie.length > Kx ? "table" : "grid", [N, Ie.length]), at = et === "table" ? U : se, ie = Math.max(1, Math.ceil(Ie.length / at));
  u.useEffect(() => {
    W(1);
  }, [g, I, A, et]), u.useEffect(() => {
    b > ie && W(ie);
  }, [ie, b]);
  const je = u.useMemo(() => {
    if (te !== "is-full-width") return Ie;
    const ae = (b - 1) * at;
    return Ie.slice(ae, ae + at);
  }, [Ie, b, at, te]), ze = () => {
    if (!a) return;
    const ae = Y.id === "all" ? Ie.map((Me) => Me.id) : Re;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...ae])));
  }, Ye = () => {
    if (!a) return;
    const ae = new Set(
      Y.id === "all" ? Ie.map((Me) => Me.id) : Re
    );
    a(l.filter((Me) => !ae.has(Me)));
  }, ge = Re.filter((ae) => l.includes(ae)).length, pe = Ie.filter((ae) => l.includes(ae.id)).length;
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
            ve && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              Oe,
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
            onClick: ze,
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
            onClick: Ye,
            disabled: pe === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                pe,
                ")"
              ] })
            ]
          }
        )
      ] }),
      ve && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? Oe / r.length * 100 : 0}%` }
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
      te === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${ve ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: ve ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: ve ? `ANALYZING TIMELINE ARCHIVES • ${Oe} OF ${be.length} STATIONS SYNCED (${be.length > 0 ? Math.min(100, Math.round(Oe / be.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${be.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: ve ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round(Oe / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        _x,
        {
          searchTerm: I,
          onSearchChange: j,
          sortAlpha: M,
          onToggleSort: () => h(!M),
          effectiveTabs: Z,
          selectedTabId: g,
          onSelectTab: (ae) => {
            x(ae), P(null);
          },
          isLoadingTabs: z,
          allStations: be,
          selectedStationIds: l,
          filterMode: A,
          onFilterModeChange: k,
          filteredCount: Ie.length,
          selectedInTabCount: ge,
          unselectedInTabCount: Re.length - ge,
          activeTabName: Y.name,
          onSelectAllInScope: ze,
          onClearInScope: Ye,
          viewMode: et,
          onViewModeChange: te === "is-full-width" ? P : null,
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
              onClick: ze,
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
              onClick: Ye,
              disabled: pe === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  pe,
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
      te === "is-full-width" && et === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
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
          className: `station-list ${te === "is-full-width" ? et === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: je.map((ae) => {
            const Me = l.includes(ae.id), L = Be.get(ae.id);
            return te === "is-full-width" ? et === "grid" ? /* @__PURE__ */ s.jsx(
              Ox,
              {
                station: ae,
                isSelected: Me,
                onToggle: o,
                meta: L
              },
              ae.id
            ) : /* @__PURE__ */ s.jsx(
              Dx,
              {
                station: ae,
                isSelected: Me,
                onToggle: o,
                meta: L
              },
              ae.id
            ) : /* @__PURE__ */ s.jsx(
              Px,
              {
                station: ae,
                isSelected: Me,
                onToggle: o,
                meta: L
              },
              ae.id
            );
          })
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsx(
        Fx,
        {
          currentPage: b,
          totalPages: ie,
          pageSize: at,
          totalItems: Ie.length,
          onPageChange: W,
          onPageSizeChange: (ae) => {
            et === "table" ? le(ae) : V(ae), W(1);
          },
          viewMode: et
        }
      ),
      te === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          Bx,
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
const Ln = (e) => String(e).padStart(2, "0"), Yx = [
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
], Xx = [
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
  }, [e]), S = u.useMemo(() => f >= 12, [f]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const C = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((le) => le.length > 0);
    let P = 0, z = 0, $ = 0;
    N.length >= 1 && (P = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (z = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && ($ = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const U = l ? `${Ln(P)}:${Ln(z)}:${Ln($)}` : `${Ln(P)}:${Ln(z)}`;
    i(U), t && t(U, { h: P, m: z, s: $ });
  }, _ = (k) => {
    let N = f;
    k === "AM" && f >= 12 ? N = f - 12 : k === "PM" && f < 12 && (N = f + 12);
    const P = l ? `${Ln(N)}:${Ln(p)}:${Ln(y)}` : `${Ln(N)}:${Ln(p)}`;
    i(P), t && t(P, { h: N, m: p, s: y });
  }, w = u.useCallback((k, N) => {
    if (!v.current) return null;
    const P = v.current.getBoundingClientRect(), z = P.left + P.width / 2, $ = P.top + P.height / 2, U = k.clientX - z, le = k.clientY - $;
    let se = Math.atan2(le, U) * 180 / Math.PI + 90;
    if (se < 0 && (se += 360), N === "hours") {
      const V = Math.round(se / 30) % 12;
      return S ? V === 0 ? 12 : V + 12 : V === 0 ? 0 : V;
    }
    return Math.round(se / 6) % 60;
  }, [S]), g = u.useCallback((k, N) => {
    let P = f, z = p, $ = y;
    k === "hours" ? P = N : k === "minutes" ? z = N : k === "seconds" && ($ = N);
    const U = l ? `${Ln(P)}:${Ln(z)}:${Ln($)}` : `${Ln(P)}:${Ln(z)}`;
    i(U), t && t(U, { h: P, m: z, s: $ });
  }, [f, p, y, l, t]), x = (k, N) => {
    N.preventDefault(), N.stopPropagation(), d(k);
    const P = w(N, k);
    P !== null && g(k, P);
  };
  u.useEffect(() => {
    if (!c) return;
    const k = (P) => {
      const z = w(P, c);
      z !== null && g(c, z);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", k), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", N);
    };
  }, [c, w, g]);
  const I = u.useMemo(() => f % 12 * 30, [f]), j = u.useMemo(() => p % 60 * 6, [p]), M = u.useMemo(() => y % 60 * 6, [y]), h = S ? Xx : Yx, A = u.useMemo(() => {
    const k = [];
    for (let N = 0; N < 60; N++) {
      const P = (N * 6 - 90) * (Math.PI / 180), z = N % 5 === 0, $ = 104, U = z ? 93 : 98;
      k.push({
        index: N,
        x1: 110 + U * Math.cos(P),
        y1: 110 + U * Math.sin(P),
        x2: 110 + $ * Math.cos(P),
        y2: 110 + $ * Math.sin(P),
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
            const N = (k.angle - 90) * (Math.PI / 180), P = 76, z = 110 + P * Math.cos(N), $ = 110 + P * Math.sin(N), U = f === k.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: z,
                y: $,
                className: `dial-num ${U ? "selected" : ""}`,
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
              transform: `rotate(${j} 110 110)`,
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
function Gx({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [f, p] = u.useState("00:00:00"), [y, S] = u.useState("00:00:00"), [C, _] = u.useState(() => /* @__PURE__ */ new Date()), [w, g] = u.useState(null), [x, I] = u.useState([]), [j, M] = u.useState(!1), [h, A] = u.useState(""), [k, N] = u.useState(1), [P, z] = u.useState(2), [$, U] = u.useState(null), le = u.useCallback(() => {
    try {
      const ie = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (ie) {
        const je = JSON.parse(ie);
        Array.isArray(je) && I(je);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((ie) => ie.ok ? ie.json() : null).then((ie) => {
      Array.isArray(ie) && ie.length > 0 && I(ie);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    le();
    let ie = n == null ? void 0 : n.startEpochMs, je = n == null ? void 0 : n.endEpochMs;
    if (!ie || isNaN(ie))
      if (n != null && n.start) {
        const ge = String(n.start).replace(" ", "T"), pe = new Date(ge).getTime();
        ie = isNaN(pe) ? Date.now() - 24 * 3600 * 1e3 : pe;
      } else
        je = Date.now(), ie = je - 24 * 3600 * 1e3;
    if (!je || isNaN(je))
      if (n != null && n.end) {
        const ge = String(n.end).replace(" ", "T"), pe = new Date(ge).getTime();
        je = isNaN(pe) ? Date.now() : pe;
      } else
        je = ie + 24 * 3600 * 1e3;
    U(null);
    const ze = Pr(ie, o), Ye = Pr(je, o);
    c(`${ze.year}-${zt(ze.month)}-${zt(ze.day)}`), v(`${Ye.year}-${zt(Ye.month)}-${zt(Ye.day)}`), p(`${zt(ze.hour)}:${zt(ze.minute)}:${zt(ze.second)}`), S(`${zt(Ye.hour)}:${zt(Ye.minute)}:${zt(Ye.second)}`), _(new Date(Date.UTC(ze.year, ze.month - 1, 1)));
  }, [e, n, o, le]);
  const se = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), V = d || i, b = u.useMemo(() => i ? `${i}T${f}` : "", [i, f]), W = u.useMemo(() => V ? `${V}T${y}` : "", [V, y]), O = u.useMemo(() => {
    const ie = {};
    return x.forEach((je) => {
      const ze = je.startTime || je.start, Ye = je.endTime || je.end || ze;
      if (!ze) return;
      const ge = String(ze).substring(0, 10), pe = String(Ye).substring(0, 10), [ae, Me, L] = ge.split("-").map(Number), [ne, X, ee] = pe.split("-").map(Number);
      if (isNaN(ae) || isNaN(Me) || isNaN(L) || isNaN(ne) || isNaN(X) || isNaN(ee)) return;
      let Q = new Date(Date.UTC(ae, Me - 1, L));
      const J = new Date(Date.UTC(ne, X - 1, ee));
      for (; Q.getTime() <= J.getTime(); ) {
        const de = `${Q.getUTCFullYear()}-${zt(Q.getUTCMonth() + 1)}-${zt(Q.getUTCDate())}`;
        ie[de] || (ie[de] = []), ie[de].push(je), Q.setUTCDate(Q.getUTCDate() + 1);
      }
    }), ie;
  }, [x]), H = async (ie, je) => {
    if (je && je.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const ze = x.filter((Ye) => (Ye.id || Ye.startTime) !== ie);
    I(ze);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(ze)), localStorage.setItem("itb_bookmarks", JSON.stringify(ze)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: ze }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${ie}`, { method: "DELETE" });
    } catch {
    }
  }, R = (ie) => {
    const je = ie.startTime || ie.start, ze = ie.endTime || ie.end;
    if (!je || !ze) return;
    const Ye = je.substring(0, 10), ge = je.includes("T") ? je.split("T")[1].substring(0, 8) : "00:00:00", pe = ze.substring(0, 10), ae = ze.includes("T") ? ze.split("T")[1].substring(0, 8) : "23:59:59";
    c(Ye), v(pe), p(ge), S(ae);
    const [Me, L] = Ye.split("-").map(Number);
    _(new Date(Date.UTC(Me, L - 1, 1))), M(!1);
  }, oe = (ie) => {
    l ? (l(ie), t && t()) : R(ie);
  }, te = u.useMemo(() => {
    if (o === "UTC" || !b.includes("T")) return { isAmbiguous: !1 };
    const [ie, je] = b.split("T");
    return za(ie, je);
  }, [b, o]), Z = u.useMemo(() => {
    if (o === "UTC" || !W.includes("T")) return { isAmbiguous: !1 };
    const [ie, je] = W.split("T");
    return za(ie, je);
  }, [W, o]), Y = u.useMemo(() => {
    if (!i || !V) return null;
    const ie = _c(i, f, o, k), je = _c(V, y, o, P);
    return ie === null || je === null || isNaN(ie) || isNaN(je) ? null : { startEpoch: ie, endEpoch: je, durationMs: je - ie };
  }, [i, f, V, y, o, k, P]), Re = u.useMemo(() => !Y || Y.durationMs <= 0 ? [] : $p(Y.startEpoch, Y.endEpoch), [Y]), Oe = u.useMemo(() => {
    if (!Y || Y.durationMs <= 0) return "0h";
    const ie = Y.durationMs / (1e3 * 60 * 60);
    return ie >= 24 ? `${(ie / 24).toFixed(1)}d (${ie.toFixed(0)}h)` : `${ie.toFixed(1)}h`;
  }, [Y]), ve = u.useMemo(() => {
    const ie = C.getUTCFullYear(), je = C.getUTCMonth(), ze = new Date(Date.UTC(ie, je, 1)).getUTCDay(), Ye = new Date(Date.UTC(ie, je + 1, 0)).getUTCDate(), ge = [];
    for (let pe = 0; pe < ze; pe++) ge.push(null);
    for (let pe = 1; pe <= Ye; pe++) ge.push(`${ie}-${zt(je + 1)}-${zt(pe)}`);
    return ge;
  }, [C]), Be = (ie) => {
    if (ie) {
      if (U(null), !i || i && d)
        c(ie), v("");
      else if (i && !d)
        if (ie < i)
          c(ie), v("");
        else {
          const je = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ie + "T00:00:00Z")).getTime() - je > sa) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const Ye = new Date(je + sa);
            v(`${Ye.getUTCFullYear()}-${zt(Ye.getUTCMonth() + 1)}-${zt(Ye.getUTCDate())}`);
          } else
            v(ie);
        }
    }
  }, be = (ie, je) => {
    U(je);
    const ze = Date.now(), Ye = ze - ie, ge = Pr(Ye, o), pe = Pr(ze, o);
    c(`${ge.year}-${zt(ge.month)}-${zt(ge.day)}`), v(`${pe.year}-${zt(pe.month)}-${zt(pe.day)}`), p(`${zt(ge.hour)}:${zt(ge.minute)}:${zt(ge.second)}`), S(`${zt(pe.hour)}:${zt(pe.minute)}:${zt(pe.second)}`), _(new Date(Date.UTC(ge.year, ge.month - 1, 1)));
  }, Ie = () => {
    if (se(), !Y || isNaN(Y.startEpoch) || isNaN(Y.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (Y.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (Y.durationMs > sa) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: b,
      end: W,
      startEpochMs: Y.startEpoch,
      endEpochMs: Y.endEpoch,
      durationMs: Y.durationMs,
      timeMode: o
    }), t && t();
  }, et = u.useMemo(() => {
    if (!h.trim()) return x;
    const ie = h.toLowerCase();
    return x.filter(
      (je) => (je.title || je.name || "").toLowerCase().includes(ie) || (je.startTime || "").includes(ie)
    );
  }, [x, h]);
  if (!e) return null;
  const at = o === "UTC";
  return As.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ie) => ie.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${at ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: at ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${at ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${at ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${j ? "active" : ""}`,
                onClick: () => M(!j),
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
      Re.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Re.map((ie) => `${ie.description} (${ie.labelBefore} ➔ ${ie.labelAfter})`).join(", ") })
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
      j && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
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
            et.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: et.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : et.map((ie) => {
          var pe;
          const je = ie.id || ie.startTime, ze = ie.title || ie.name || "Untitled Mission", Ye = (ie.startTime || "").replace("T", " "), ge = (ie.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => R(ie), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: ze }),
                ie.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  ie.cutStationName
                ] }),
                ((pe = ie.stationIds) == null ? void 0 : pe.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  ie.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                Ye,
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
                  onClick: (ae) => {
                    ae.stopPropagation(), R(ie);
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
                    ae.stopPropagation(), oe(ie);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (ae) => H(je, ae),
                  children: "✕"
                }
              )
            ] })
          ] }, je);
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
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: ve.map((ie, je) => {
            if (!ie) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${je}`);
            const ze = parseInt(ie.split("-")[2], 10), Ye = ie === i, ge = ie === (d || i), pe = d || w, ae = i && pe && ie > i && ie < pe, Me = O[ie], L = !!(Me && Me.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${Ye ? "start-edge" : ""} ${ge ? "end-edge" : ""} ${ae ? "in-range" : ""} ${L ? "has-bookmark" : ""}`,
                onClick: () => Be(ie),
                onMouseEnter: () => !d && i && g(ie),
                onMouseLeave: () => g(null),
                title: L ? `${Me.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: ze }),
                  L && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (ne) => {
                        ne.stopPropagation(), M(!0), A(ie);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        Me.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: Me.length })
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
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: se, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            hh,
            {
              label: "START TIME (FROM)",
              value: f,
              onChange: (ie) => {
                se(), p(ie), U(null);
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
              onChange: (ie) => {
                se(), S(ie), U(null);
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
                className: P === 1 ? "active" : "",
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
                className: P === 2 ? "active" : "",
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
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: Y && Y.durationMs > sa ? "#f43f5e" : "#22d3ee" }, children: Oe }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Re.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Ie, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const Kp = "extractor_incident_bookmarks_fallback", Qx = ["itb_studio_bookmarks", "itb_bookmarks", Kp];
function Jx({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, f] = u.useState(!1), [p, y] = u.useState(!1), [S, C] = u.useState(null), [_, w] = u.useState(""), g = u.useCallback(($) => {
    Qx.forEach((U) => {
      try {
        localStorage.setItem(U, JSON.stringify($));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: $ }));
  }, []), x = u.useCallback(async () => {
    f(!0);
    try {
      const $ = await fetch("/api/v1/extractor-advanced/bookmarks");
      if ($.ok) {
        const U = await $.json(), le = Array.isArray(U) ? U : [];
        i(le), g(le);
        return;
      }
    } catch ($) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", $);
    } finally {
      f(!1);
    }
    try {
      const $ = localStorage.getItem(Kp) || localStorage.getItem("itb_studio_bookmarks");
      $ && i(JSON.parse($));
    } catch {
    }
  }, [g]);
  if (u.useEffect(() => {
    e && x();
  }, [e, x]), !e) return null;
  const I = async () => {
    var te, Z, Y, Re, Oe, ve;
    if (!c.trim() || p) return;
    const $ = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((te = n == null ? void 0 : n.timeRange) != null && te.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), U = (n == null ? void 0 : n.inPointMs) ?? 0, le = (n == null ? void 0 : n.outPointMs) ?? (((Z = n == null ? void 0 : n.timeRange) == null ? void 0 : Z.durationMs) || 0), se = (n == null ? void 0 : n.playheadMs) ?? U, V = $ + U, b = $ + le, W = $ + se, O = (n == null ? void 0 : n.selectedStationIds) || [], H = (n == null ? void 0 : n.selectedStationNames) || [], R = ((Y = n == null ? void 0 : n.allStationIds) == null ? void 0 : Y.length) > 0 ? n.allStationIds : O, oe = {
      title: c.trim(),
      startTime: ((Re = n == null ? void 0 : n.timeRange) == null ? void 0 : Re.start) || "",
      endTime: ((Oe = n == null ? void 0 : n.timeRange) == null ? void 0 : Oe.end) || "",
      baseEpochMs: $,
      timelineBaseEpochMs: $,
      inPointMs: U,
      outPointMs: le,
      playheadMs: se,
      inEpochMs: V,
      outEpochMs: b,
      playheadEpochMs: W,
      selectedStationIds: O,
      selectedStationNames: H,
      allStationIds: R,
      stationIds: O.length > 0 ? O : R,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const Be = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(oe)
      });
      if (Be.ok) {
        const be = await Be.json(), et = [{
          ...oe,
          ...be.bookmark || {},
          inEpochMs: V,
          outEpochMs: b,
          playheadEpochMs: W,
          selectedStationIds: O,
          selectedStationNames: H,
          allStationIds: R,
          id: ((ve = be.bookmark) == null ? void 0 : ve.id) || be.id || `bm_${Date.now()}`
        }, ...a];
        i(et), g(et), d("");
      } else
        throw new Error(`Server returned ${Be.status}`);
    } catch (Be) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Be);
      const Ie = [{
        ...oe,
        inEpochMs: V,
        outEpochMs: b,
        playheadEpochMs: W,
        selectedStationIds: O,
        selectedStationNames: H,
        allStationIds: R,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Ie), g(Ie), d("");
    } finally {
      y(!1);
    }
  }, j = async ($, U) => {
    if (U.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const le = a.filter((se) => (se.id || se.startTime) !== $);
    i(le), g(le);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, { method: "DELETE" });
    } catch (se) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", se);
    }
  }, M = ($, U) => {
    U.stopPropagation(), C($.id || $.startTime), w($.title || $.name || "");
  }, h = async ($, U) => {
    if (U && U.stopPropagation(), !_.trim()) return;
    const le = a.find((b) => (b.id || b.startTime) === $), se = _.trim(), V = a.map(
      (b) => (b.id || b.startTime) === $ ? { ...b, title: se, name: se } : b
    );
    i(V), g(V), C(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${$}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...le, title: se })
      });
    } catch (b) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", b);
    }
  }, A = ($) => {
    $.stopPropagation(), C(null);
  }, k = ($) => !$ || isNaN($) ? "--:--:--" : Ct($, o), N = ($) => {
    const U = $.startTime || $.StartTime, le = $.endTime || $.EndTime;
    if (!U) return "--";
    const se = String(U).replace("T", " ").substring(0, 19), V = le ? String(le).replace("T", " ").substring(0, 19) : se;
    return `${se} ➔ ${V}`;
  }, P = ($) => {
    let U = $.inEpochMs || $.InEpochMs, le = $.outEpochMs || $.OutEpochMs;
    if (!U || !le) {
      const se = $.timelineBaseEpochMs || $.baseEpochMs || ($.startTime ? new Date(String($.startTime).replace(" ", "T")).getTime() : 0), V = $.inPointMs ?? $.InPointMs, b = $.outPointMs ?? $.OutPointMs;
      se && typeof V == "number" && typeof b == "number" && (V > 0 || b > 0) && (U = se + V, le = se + b);
    }
    if (U && le && !isNaN(U) && !isNaN(le) && U > 0) {
      const se = k(U), V = k(le), b = Math.max(0, le - U), W = Math.floor(b / 6e4), O = Math.floor(W / 60), H = W % 60, R = O > 0 ? `${O}h ${H}m` : `${W}m`;
      return { timeText: `${se} ➔ ${V}`, duration: R };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, z = ($) => {
    const U = $.selectedStationNames || [], le = $.selectedStationIds || $.cutStationIds || $.stationIds || [];
    return U.length > 0 ? U.join(", ") : le.length > 0 ? le.join(", ") : $.cutStationName ? $.cutStationName : $.activeStationName ? $.activeStationName : "All Stations in Scope";
  };
  return As.createPortal(
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
              onKeyDown: ($) => $.key === "Enter" && I(),
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
      ] }) : a.map(($) => {
        var W, O, H;
        const U = $.id || $.startTime, le = S === U, se = P($), V = z($), b = ((W = $.allStationIds) == null ? void 0 : W.length) || ((O = $.selectedStationIds) == null ? void 0 : O.length) || ((H = $.stationIds) == null ? void 0 : H.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${le ? "is-editing" : ""}`,
            onClick: () => {
              le || (r && r($), t());
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
                      onChange: (R) => w(R.target.value),
                      onKeyDown: (R) => {
                        R.key === "Enter" && h(U, R), R.key === "Escape" && A(R);
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
                        onClick: (R) => h(U, R),
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
                  b > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    b,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: se.timeText }),
                    se.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      se.duration,
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
                    onClick: (R) => M($, R),
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
                    onClick: (R) => j(U, R),
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
const fh = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function Vp() {
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
function Zx(e) {
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
function qx(e, t) {
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
function ey({
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
  directorPlan: C,
  onOverrideDisplay: _,
  onResetOverride: w,
  viewMode: g,
  onViewModeChange: x,
  onOpenFullscreen: I,
  isPipSwapped: j,
  onPipSwapChange: M,
  className: h = ""
}) {
  const A = u.useRef(null), k = u.useRef(null), N = u.useRef(null), P = u.useRef(r), z = u.useRef(r), $ = u.useRef(r), U = u.useRef(!1), le = u.useRef(null), se = u.useRef(o), V = u.useRef(!1);
  P.current = r;
  const b = e == null ? void 0 : e.id, W = e && (e.hostname || e.name) || "", O = u.useMemo(() => {
    var Ue, Je, it, ft;
    const K = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((Ue = e == null ? void 0 : e.displayTopology) == null ? void 0 : Ue.displays) || ((Je = e == null ? void 0 : e.displayTopology) == null ? void 0 : Je.Displays) || ((it = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : it.Displays) || ((ft = e == null ? void 0 : e.topology) == null ? void 0 : ft.displays) || [];
    if (!Array.isArray(K) || K.length === 0) return [];
    const fe = K.length > 1 && K.every((Ze) => (Ze.X ?? Ze.x ?? 0) === 0 && (Ze.Y ?? Ze.y ?? 0) === 0);
    let xe = 0;
    return K.map((Ze, Nt) => {
      const wt = Ze.Width || Ze.width || 1920, Bt = Ze.Height || Ze.height || 1080, Tt = fe ? xe : Ze.X ?? Ze.x ?? Nt * wt, an = fe ? 0 : Ze.Y ?? Ze.y ?? 0;
      fe && (xe += wt);
      const An = (Ze.displayId ?? Ze.DisplayId ?? `mon-${Nt}`).toLowerCase(), wn = Ze.displayNumber ?? Ze.DisplayNumber ?? Nt + 1, Dt = (Ze.displayName || Ze.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${wn}`, Rs = !!(Ze.isPrimary ?? Ze.IsPrimary ?? Nt === 0);
      return {
        ...Ze,
        displayId: An,
        DisplayId: An,
        displayIndex: Nt,
        displayNumber: wn,
        DisplayNumber: wn,
        displayName: Dt,
        DisplayName: Dt,
        isPrimary: Rs,
        IsPrimary: Rs,
        x: Tt,
        y: an,
        X: Tt,
        Y: an,
        width: wt,
        height: Bt,
        Width: wt,
        Height: Bt
      };
    });
  }, [e]), H = O.length > 1, [R, oe] = u.useState(() => {
    if (!H) return "mon-0";
    try {
      const K = localStorage.getItem("itb_solo_viewmode");
      if (K) return K;
    } catch {
    }
    return "canvas";
  }), Z = H ? g !== void 0 ? g : R : "mon-0", Y = u.useCallback((K) => {
    const fe = typeof K == "function" ? K(Z) : K;
    oe(fe);
    try {
      localStorage.setItem("itb_solo_viewmode", fe);
    } catch {
    }
    x && x(fe);
  }, [Z, x]), [Re, Oe] = u.useState(!1), ve = j !== void 0 ? j : Re, Be = u.useCallback((K) => {
    const fe = typeof K == "function" ? K(ve) : K;
    Oe(fe), M && M(fe);
  }, [ve, M]), be = u.useMemo(() => {
    const K = C || (e == null ? void 0 : e.directorPlan);
    if (!K || !K.segments || K.segments.length === 0) return null;
    const fe = t + r;
    return K.segments.find((xe) => {
      const Ue = xe.startEpochMs ?? xe.StartEpochMs ?? 0, Je = xe.endEpochMs ?? xe.EndEpochMs ?? 0;
      return fe >= Ue && fe <= Je;
    }) || K.segments[0];
  }, [C, e == null ? void 0 : e.directorPlan, t, r]), Ie = u.useMemo(() => {
    var K, fe;
    if (!H) return "mon-0";
    if (Z === "split" || Z === "pip" || Z === "canvas" || Z === "all-displays") {
      const xe = (((K = O[0]) == null ? void 0 : K.displayId) ?? "mon-0").toLowerCase(), Ue = (((fe = O[1]) == null ? void 0 : fe.displayId) ?? "mon-1").toLowerCase();
      return ve ? Ue : xe;
    }
    return Z !== "director" ? Z.toLowerCase() : ((be == null ? void 0 : be.targetDisplayId) ?? (be == null ? void 0 : be.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [H, Z, be, O, ve]), et = u.useMemo(() => {
    var fe;
    if (!H) return null;
    const K = O.find((xe) => (xe.displayId ?? xe.DisplayId ?? "").toLowerCase() !== Ie);
    return K ? (K.displayId ?? K.DisplayId).toLowerCase() : (((fe = O[1]) == null ? void 0 : fe.displayId) || "mon-1").toLowerCase();
  }, [H, O, Ie]), at = u.useMemo(() => {
    const K = O.find((xe) => (xe.displayId ?? "").toLowerCase() === (Ie || "").toLowerCase());
    if (K) return K.displayName || `Screen ${K.displayNumber || 1}`;
    if (Ie === "mon-0" || Ie === "0") return "Screen 1";
    if (Ie === "mon-1" || Ie === "1") return "Screen 2";
    const fe = (Ie || "").match(/\d+/);
    if (fe) {
      const xe = parseInt(fe[0], 10);
      return `Screen ${(Ie || "").startsWith("mon-") ? xe + 1 : xe}`;
    }
    return (Ie || "Screen 1").toUpperCase();
  }, [O, Ie]), ie = u.useMemo(() => {
    const K = O.find((fe) => (fe.displayId ?? "").toLowerCase() === (et || "").toLowerCase());
    return K ? K.displayName || `Screen ${K.displayNumber || 2}` : "Screen 2";
  }, [O, et]), je = u.useMemo(() => Z !== "director" && Z !== "split" && Z !== "pip" && Z !== "canvas" ? !0 : !!((be == null ? void 0 : be.isManualOverride) ?? (be == null ? void 0 : be.IsManualOverride)), [Z, be]), [ze, Ye] = u.useState({}), ge = u.useRef(null), [pe, ae] = u.useState({ width: 0, height: 0 }), Me = u.useMemo(() => Zx(O), [O]);
  u.useEffect(() => {
    if (!H || Z !== "canvas" && Z !== "all-displays" || o)
      return;
    const K = () => {
      const xe = ge.current;
      if (!xe) return;
      const Ue = 48, Je = 72, it = Math.max(100, xe.clientWidth - Ue), ft = Math.max(100, xe.clientHeight - Je), Ze = Me.totalWidth || 1920, Nt = Me.totalHeight || 1080, wt = Ze / Nt;
      let Bt = it, Tt = Bt / wt;
      Tt > ft && (Tt = ft, Bt = Tt * wt), ae({ width: Math.round(Bt), height: Math.round(Tt) });
    };
    K();
    const fe = new ResizeObserver(K);
    return ge.current && fe.observe(ge.current), () => fe.disconnect();
  }, [H, Z, Me]);
  const L = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!H || Z !== "canvas" && Z !== "all-displays")
      return;
    let K = !0;
    const fe = new AbortController(), xe = L;
    O.forEach((Je, it) => {
      const ft = (Je.displayId ?? Je.DisplayId ?? `mon-${it}`).toLowerCase(), Ze = On.get(W, xe, ft);
      Ze ? Ye((Nt) => ({ ...Nt, [ft]: Ze })) : On.fetchFrame(W, xe, fe.signal, ft).then((Nt) => {
        K && Nt && Ye((wt) => ({ ...wt, [ft]: Nt }));
      });
    });
    const Ue = On.subscribe((Je, it, ft, Ze) => {
      Je === W && it === xe && Ze && K && Ye((Nt) => ({ ...Nt, [Ze.toLowerCase()]: ft }));
    });
    return () => {
      K = !1, fe.abort(), Ue();
    };
  }, [H, Z, O, W, L]);
  const ne = u.useRef(Ie), X = u.useMemo(() => e ? p[e.id] || p[e.hostname] || e.segments || [] : [], [e, p]), ee = t + r, Q = u.useMemo(() => X.length === 0 ? !0 : X.some((K) => {
    const fe = (K.startEpochMs ?? K.startEpoch ?? 0) - 2e3, xe = (K.endEpochMs ?? K.endEpoch ?? 0) + 2e3;
    return ee >= fe && ee <= xe;
  }), [X, ee]), J = !Q && X.length > 0, [de, qe] = u.useState("A"), [_e, Xe] = u.useState(""), [lt, Ge] = u.useState(""), [It, $t] = u.useState(""), [Rt, Lt] = u.useState(null), [rt, xt] = u.useState(!1), [He, Fe] = u.useState(!1), [vt, Ot] = u.useState(() => {
    if (!W) return null;
    const K = Math.round(t + r);
    return On.get(W, K, Ie) || null;
  }), [Gt, Kt] = u.useState(null), dn = de === "A" ? A : k, De = u.useCallback(() => {
    const K = kl();
    A.current && (A.current.volume = K.volume, A.current.muted = de !== "A" || K.isMuted, A.current.defaultPlaybackRate = i, A.current.playbackRate = i, de === "A" && !K.isMuted && Ha(A.current)), k.current && (k.current.volume = K.volume, k.current.muted = de !== "B" || K.isMuted, k.current.defaultPlaybackRate = i, k.current.playbackRate = i, de === "B" && !K.isMuted && Ha(k.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [de, i]);
  u.useEffect(() => {
    const K = (fe) => {
      fe.detail && (A.current && (A.current.volume = fe.detail.volume), k.current && (k.current.volume = fe.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", K), () => window.removeEventListener("itb-audio-state-changed", K);
  }, []), u.useEffect(() => {
    A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!b || !W) return;
    if (o) {
      se.current = !0;
      return;
    }
    const K = se.current;
    se.current = o;
    let fe = !0;
    const xe = new AbortController(), Ue = Math.round(t + r), Je = On.get(W, Ue, Ie);
    if (Je) {
      Ot(Je);
      return;
    }
    const ft = setTimeout(() => {
      fe && On.fetchFrame(W, Ue, xe.signal, Ie).then((Nt) => {
        fe && Nt && Ot(Nt);
      });
    }, K ? 25 : 35), Ze = On.subscribe((Nt, wt, Bt, Tt) => {
      Nt === W && wt === Ue && (!Tt || Tt === Ie) && fe && Ot(Bt);
    });
    return () => {
      fe = !1, clearTimeout(ft), xe.abort(), Ze();
    };
  }, [b, W, t, r, o, rt, Ie]), u.useEffect(() => {
    if (!H || Z !== "split" && Z !== "pip" || !et || o) {
      Kt(null);
      return;
    }
    let K = !0;
    const fe = new AbortController(), xe = Math.round(t + r), Ue = On.get(W, xe, et);
    if (Ue) {
      Kt(Ue);
      return;
    }
    const Je = setTimeout(() => {
      K && On.fetchFrame(W, xe, fe.signal, et).then((ft) => {
        K && ft && Kt(ft);
      });
    }, 40), it = On.subscribe((ft, Ze, Nt, wt) => {
      ft === W && Ze === xe && (!wt || wt === et) && K && Kt(Nt);
    });
    return () => {
      K = !1, clearTimeout(Je), fe.abort(), it();
    };
  }, [H, Z, et, b, W, t, r]);
  const Le = u.useCallback((K, fe = Ie) => {
    const xe = Math.round(t), Ue = Math.round(t + n), Je = Math.min(Ue, Math.max(xe, Math.round(t + K)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(W)}&startEpoch=${xe}&endEpoch=${Ue}&seekEpoch=${Je}&displayId=${encodeURIComponent(fe)}&_t=${Date.now()}`;
  }, [t, n, W, Ie]);
  u.useEffect(() => {
    if (!(!b || !W))
      if (o && Q) {
        const K = P.current;
        z.current = K, $.current = K, U.current = !1;
        const fe = Le(K, Ie);
        xt(!1), Fe(!0), qe("A"), Xe(fe), Ge(""), Lt(null), $t((Z === "split" || Z === "pip") && et ? Le(K, et) : "");
      } else o || (le.current && clearTimeout(le.current), U.current = !1, Xe(""), Ge(""), $t(""), Lt(null), xt(!1), Fe(!1), A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause());
  }, [o, b, W, Q, Le, Ie, Z, et]), u.useEffect(() => {
    if (ne.current !== Ie && (ne.current = Ie, o && Q)) {
      const K = P.current;
      z.current = K;
      const fe = Le(K, Ie);
      xt(!1), Fe(!0), qe("A"), Xe(fe), Ge("");
    }
  }, [Ie, o, Q, Le]), u.useEffect(() => {
    if (!b || !W) return;
    const K = Math.abs(r - $.current);
    if (!o || K < 15) {
      $.current = r;
      return;
    }
    return U.current = !0, $.current = r, z.current = r, A.current && A.current.pause(), k.current && k.current.pause(), N.current && N.current.pause(), xt(!1), Fe(!0), le.current && clearTimeout(le.current), le.current = setTimeout(() => {
      if (!Q) {
        Xe(""), Ge(""), $t(""), Fe(!1), U.current = !1;
        return;
      }
      const fe = P.current, xe = Le(fe, Ie);
      qe("A"), Xe(xe), Ge(""), Lt(null), (Z === "split" || Z === "pip") && et && $t(Le(fe, et));
    }, 75), () => {
      le.current && clearTimeout(le.current);
    };
  }, [r, o, b, W, Q, Le, Ie, Z, et]), u.useEffect(() => {
    if (!o || !rt || X.length === 0) return;
    const K = t + P.current, fe = X.map((xe) => ({
      start: xe.startEpochMs ?? xe.startEpoch ?? 0,
      end: xe.endEpochMs ?? xe.endEpoch ?? 0
    })).filter((xe) => xe.start > K + 500).sort((xe, Ue) => xe.start - Ue.start)[0];
    if (fe && (!Rt || Rt.start !== fe.start)) {
      const xe = fe.start - t;
      if (xe < v) {
        const Ue = Le(xe, Ie);
        Lt({ start: fe.start, ms: xe }), de === "A" ? Ge(Ue) : Xe(Ue);
      }
    }
  }, [o, rt, r, t, v, X, Rt, de, Le, Ie]);
  const nt = u.useCallback(() => {
    if (Rt) {
      const K = de === "A" ? "B" : "A", fe = K === "A" ? A : k;
      qe(K), z.current = Rt.ms, $.current = Rt.ms, Lt(null), fe.current && fe.current.play().then(() => {
        De();
      }).catch(() => {
      });
    } else
      f ? l(d) : a(!1);
  }, [Rt, de, De, f, d, l, a]), ce = u.useCallback(() => {
    const K = dn.current;
    if (!K || U.current || !o || V.current) return;
    const fe = K.currentTime * 1e3, xe = Math.round(z.current + fe);
    if (y && y.length > 0) {
      const Ue = t + xe, Je = y.find((it) => Ue >= it.startEpochMs && Ue < it.endEpochMs);
      if (Je) {
        V.current = !0;
        const it = Math.round(Je.endEpochMs - t) + 10;
        l(it), setTimeout(() => {
          V.current = !1;
        }, 150);
        return;
      }
    }
    if (xe >= v) {
      f ? l(d) : (a(!1), l(v));
      return;
    }
    $.current = xe, l(xe);
  }, [dn, o, t, y, v, f, d, l, a]), st = He && o && !J;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${Z} ${h}`, children: [
    H && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (K) => K.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "director" ? "active" : ""}`,
          onClick: () => Y("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "canvas" ? "active" : ""}`,
          onClick: () => Y("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "split" ? "active" : ""}`,
          onClick: () => Y("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${Z === "pip" ? "active" : ""}`,
          onClick: () => Y("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      O.map((K, fe) => {
        const xe = (K.displayId ?? `mon-${fe}`).toLowerCase(), Ue = K.displayNumber ?? fe + 1, Je = K.displayName || `Screen ${Ue}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${Z === xe ? "active" : ""}`,
            onClick: () => Y(xe),
            title: `Pin directly to ${Je}`,
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
          O.map((K, fe) => {
            const xe = (K.displayId ?? `mon-${fe}`).toLowerCase(), Ue = K.displayNumber ?? fe + 1, Je = K.displayName || `Screen ${Ue}`, it = Ie === xe;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${it ? "active" : ""} ${je && it ? "is-override" : ""}`,
                onClick: () => {
                  _ == null || _(b, t + r, xe);
                },
                title: `Punch ${Je} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    Ue
                  ] }),
                  it && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: je ? "✋" : "⚡" })
                ]
              },
              `punch-${xe}`
            );
          }),
          je && w && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                w == null || w(b, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    H && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${je ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: Z === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : Z === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : Z === "pip" ? `🪟 PiP MODE: ${at.toUpperCase()} (HERO)` : `${je ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${at.toUpperCase()}` }),
      je && Z === "director" && w && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => w == null ? void 0 : w(b, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    _e && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: A,
        src: _e,
        className: "feed-video-element",
        style: {
          opacity: rt && de === "A" ? 1 : 0,
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
          de === "A" && (U.current = !1, xt(!0), Fe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i));
        },
        onWaiting: () => {
          de === "A" && Fe(!0);
        },
        onTimeUpdate: () => {
          var K;
          de === "A" && (!rt && ((K = A.current) == null ? void 0 : K.currentTime) > 0 && (U.current = !1, xt(!0), Fe(!1), A.current && (A.current.defaultPlaybackRate = i, A.current.playbackRate = i)), ce());
        },
        onError: () => {
          de === "A" && (U.current = !1, Fe(!1), xt(!1));
        },
        onEnded: () => {
          de === "A" && nt();
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
          opacity: rt && de === "B" ? 1 : 0,
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
          de === "B" && (U.current = !1, xt(!0), Fe(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i));
        },
        onWaiting: () => {
          de === "B" && Fe(!0);
        },
        onTimeUpdate: () => {
          var K;
          de === "B" && (!rt && ((K = k.current) == null ? void 0 : K.currentTime) > 0 && (U.current = !1, xt(!0), Fe(!1), k.current && (k.current.defaultPlaybackRate = i, k.current.playbackRate = i)), ce());
        },
        onError: () => {
          de === "B" && (U.current = !1, Fe(!1), xt(!1));
        },
        onEnded: () => {
          de === "B" && nt();
        }
      }
    ),
    Z !== "split" && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: rt ? 0 : 2 },
        children: J ? /* @__PURE__ */ s.jsx(Dp, { isPlaying: o }) : vt && vt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
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
    Z === "split" && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
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
    Z === "pip" && H && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (K) => {
          K.stopPropagation(), Be((fe) => !fe);
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
          Gt && Gt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Gt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (Z === "canvas" || Z === "all-displays") && H && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: ge, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: pe.width ? `${pe.width}px` : "92%",
            height: pe.height ? `${pe.height}px` : "auto",
            aspectRatio: `${Me.totalWidth} / ${Me.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: O.map((K, fe) => {
            const xe = qx(K, Me), Ue = (K.displayId ?? K.DisplayId ?? `mon-${fe}`).toLowerCase(), Je = ze[Ue] || (Ue === Ie ? vt : null), it = !!(K.isPrimary ?? K.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${it ? "is-primary" : ""}`,
                style: {
                  left: `${xe.leftPct}%`,
                  top: `${xe.topPct}%`,
                  width: `${xe.widthPct}%`,
                  height: `${xe.heightPct}%`
                },
                onClick: (ft) => {
                  ft.stopPropagation(), I ? I(Ue) : Y(Ue);
                },
                title: `Display ${fe + 1} (${K.width || 1920}x${K.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      it ? "★ " : "",
                      "🖥 ",
                      fe + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: K.displayName || K.DisplayName || Ue.toUpperCase() }),
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
                        onClick: (ft) => {
                          ft.stopPropagation(), I(Ue);
                        },
                        title: `Open Display ${fe + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  Je && Je !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: Je,
                      className: "canvas-frame-img",
                      alt: Ue
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      K.displayName || Ue.toUpperCase(),
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
    st && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
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
          W,
          " • ",
          Ie.toUpperCase()
        ] })
      ] })
    ] }) }),
    Z === "director" && be && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Ie.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        Ct(be.startEpochMs ?? be.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        Ct(be.endEpochMs ?? be.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    H && Z !== "canvas" && /* @__PURE__ */ s.jsx(
      Pp,
      {
        displays: O,
        activeDisplayId: Ie,
        mode: je ? "MANUAL" : "AUTO",
        activeTimeRange: be ? `${Ct(be.startEpochMs ?? be.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${Ct(be.endEpochMs ?? be.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (K) => {
          _ && _(b, t + r, K), Y(K);
        }
      }
    ),
    S && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      W
    ] }) })
  ] });
}
const Hi = 2200, Ki = 400;
function ty({
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
    const c = Bp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = Fp(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(So.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const ny = [
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
function Yp({ isOpen: e, onClose: t }) {
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
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: ny.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
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
function sy({
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
  onViewportStartChange: C,
  playheadMs: _ = 0,
  playheadEpochMs: w = 0,
  setPlayheadMs: g,
  inPointMs: x = 0,
  setInPointMs: I,
  outPointMs: j = 36e5,
  setOutPointMs: M,
  recordingSegments: h = {},
  globalGaps: A = [],
  onExport: k,
  isPlaying: N,
  setIsPlaying: P,
  isLooping: z = !0,
  setIsLooping: $,
  playbackSpeed: U,
  setPlaybackSpeed: le,
  keystrokeMode: se = "BURN_IN",
  onChangeKeystrokeMode: V,
  keystrokes: b = [],
  showRulerKeystrokes: W = !1,
  onToggleRulerKeystrokes: O,
  directorPlan: H,
  onOverrideDisplay: R,
  onSplitDirectorSegment: oe,
  onChangeDirectorSegmentDisplay: te,
  onResetDirectorSegmentToAuto: Z
}) {
  var Gt, Kt, dn;
  const [Y, Re] = u.useState(!1), Oe = N !== void 0 ? N : Y, ve = u.useCallback((De) => {
    const Le = typeof De == "function" ? De(Oe) : De;
    P ? P(Le) : Re(Le), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Le } }));
  }, [Oe, P]), [Be, be] = u.useState(!0), Ie = z !== void 0 ? z : Be, et = $ || be, [at, ie] = u.useState(1), je = U !== void 0 ? U : at, ze = le || ie, [Ye, ge] = u.useState(null), [pe, ae] = u.useState(!1), [Me, L] = u.useState(A), ne = ((Gt = t == null ? void 0 : t.displays) == null ? void 0 : Gt.length) > 1 || ((dn = (Kt = t == null ? void 0 : t.topology) == null ? void 0 : Kt.displays) == null ? void 0 : dn.length) > 1, [X, ee] = u.useState(() => {
    if (!ne) return "mon-0";
    if (n) return n;
    try {
      const De = localStorage.getItem("itb_spotlight_viewmode");
      if (De) return De;
    } catch {
    }
    return "canvas";
  }), Q = u.useCallback((De) => {
    ee((Le) => {
      const nt = typeof De == "function" ? De(Le) : De;
      try {
        localStorage.setItem("itb_spotlight_viewmode", nt);
      } catch {
      }
      return nt;
    });
  }, []), [J, de] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!ne) {
        ee("mon-0");
        return;
      }
      if (n)
        ee(n);
      else
        try {
          const De = localStorage.getItem("itb_spotlight_viewmode");
          ee(De || "canvas");
        } catch {
          ee("canvas");
        }
    }
  }, [e, n, ne, t == null ? void 0 : t.id]);
  const qe = u.useRef(null), _e = u.useRef(d);
  _e.current = d;
  const Xe = u.useRef(S);
  Xe.current = S;
  const lt = u.useRef(c);
  lt.current = c;
  const Ge = u.useRef(t && t.id);
  u.useEffect(() => {
    var De, Le, nt;
    t && t.id && Ge.current !== t.id && (Ge.current = t.id, ze(1), ((De = t.displays) == null ? void 0 : De.length) > 1 || ((nt = (Le = t.topology) == null ? void 0 : Le.displays) == null ? void 0 : nt.length) > 1 || Q("mon-0"));
  }, [t, ze]);
  const It = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const De = qe.current;
    if (!De || !v || !C) return;
    const Le = (nt) => {
      nt.preventDefault(), nt.stopPropagation();
      const ce = nt.ctrlKey || nt.shiftKey, st = _e.current, K = Xe.current, fe = lt.current || 36e5;
      if (ce) {
        const xe = Math.abs(nt.deltaX) > Math.abs(nt.deltaY) ? nt.deltaX : nt.deltaY;
        if (xe === 0) return;
        const Ue = fe / st, Je = Math.max(0, fe - Ue), it = Ue * 0.08 * (xe > 0 ? 1 : -1), ft = Math.max(0, Math.min(Je, K + it));
        Xe.current = ft, C(ft);
      } else {
        if (nt.deltaY === 0) return;
        const Ue = nt.deltaY < 0 ? 1.25 : 0.8, Je = De.getBoundingClientRect(), it = Je.left + 150, ft = Je.right - 58, Ze = Math.max(100, ft - it);
        let Nt = 0.5;
        nt.clientX >= it && nt.clientX <= ft ? Nt = (nt.clientX - it) / Ze : Je.width > 0 && (Nt = Math.max(0, Math.min(1, (nt.clientX - Je.left) / Je.width)));
        const wt = Math.max(32, fe / 2e3), Bt = Math.max(1, Math.min(wt, Math.round(st * Ue * 100) / 100));
        if (Bt === st) return;
        const Tt = fe / st, an = fe / Bt, wn = K + Nt * Tt - Nt * an, Bn = Math.max(0, fe - an), $s = Math.max(0, Math.min(Bn, wn));
        _e.current = Bt, Xe.current = $s, C($s), v(Bt);
      }
    };
    return De.addEventListener("wheel", Le, { passive: !1, capture: !0 }), () => De.removeEventListener("wheel", Le, { capture: !0 });
  }, [e, t, v, C]);
  const $t = u.useCallback(() => {
    f ? f() : (Xe.current = 0, _e.current = 1, C == null || C(0), v == null || v(1));
  }, [f, C, v]), Rt = u.useCallback((De, Le) => {
    if (p)
      p(De, Le);
    else {
      const nt = Math.max(1e3, Le - De), ce = Math.max(500, nt * 0.05), st = Math.max(0, De - ce), fe = Math.min(c, Le + ce) - st, xe = Math.max(32, c / 2e3), Ue = Math.max(1, Math.min(xe, Number((c / fe).toFixed(1)))), Je = c / Ue, it = Math.max(0, Math.min(st, c - Je));
      Xe.current = it, _e.current = Ue, C == null || C(it), v == null || v(Ue);
    }
  }, [p, c, C, v]), Lt = u.useCallback((De, Le = "center") => {
    if (y)
      y(De, Le);
    else {
      if (De == null) return;
      const nt = _e.current || 1, ce = c / Math.max(1, nt), st = Le === "start" ? ce / 4 : ce * 0.75, K = Math.max(0, Math.min(De - st, c - ce));
      Xe.current = K, C == null || C(K);
    }
  }, [y, c, C]), rt = u.useCallback(() => {
    ve((De) => !De);
  }, [ve]), xt = u.useCallback(async () => {
    var ce;
    if (!t || Math.abs(j - x) < 1e3) return;
    const De = (se || "NONE").toUpperCase().replace("-", "_");
    let Le;
    De === "NONE" || De === "OFF" ? Le = "None" : De === "CAPTION" ? Le = "Caption" : Le = "BurnIn";
    const nt = {
      createdBy: Vp(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(x),
      outEpochMs: a + Math.round(j),
      keystrokeMode: Le,
      layoutMode: ne ? X : "mon-0",
      targetDisplayId: !ne || X === "mon-0" || X === "mon-1" || X.startsWith("mon-") ? ne ? X : "mon-0" : null,
      isPipSwapped: J,
      directorSegments: ne ? (H == null ? void 0 : H.segments) || ((ce = t == null ? void 0 : t.directorPlan) == null ? void 0 : ce.segments) || [] : []
    };
    try {
      k ? await k(nt) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nt)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nt)
      });
    } catch (st) {
      console.warn("[SoloSpotlightModal] Export trigger error:", st);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, x, j, a, k, se, X, J, H]);
  u.useEffect(() => {
    if (!e || !t) return;
    const De = (Le) => {
      if ((Le.ctrlKey || Le.metaKey) && (Le.key === "e" || Le.key === "E")) {
        Le.preventDefault(), xt();
        return;
      }
      if (Le.key === "?" || Le.shiftKey && Le.code === "Slash") {
        Le.preventDefault(), ae((nt) => !nt);
        return;
      }
      if (pe) {
        Le.key === "Escape" && ae(!1);
        return;
      }
      if (Le.key === "Escape" || Le.code === "Escape") {
        Le.preventDefault(), Le.stopPropagation(), o == null || o();
        return;
      }
      if (Le.code === "Space") {
        Le.preventDefault(), rt();
        return;
      }
      if (Le.code === "KeyI") {
        Le.preventDefault(), I(Math.max(0, Math.min(_, j - 1e3)));
        return;
      }
      if (Le.code === "KeyO") {
        Le.preventDefault(), M(Math.min(c, Math.max(_, x + 1e3)));
        return;
      }
      if (Le.code === "ArrowLeft" || Le.code === "ArrowRight") {
        Le.preventDefault(), ve(!1);
        const nt = Le.code === "ArrowLeft";
        let ce;
        if (Le.ctrlKey || Le.metaKey)
          ce = 33;
        else if (Le.shiftKey)
          ce = 5e3;
        else {
          const st = Math.max(1, d);
          ce = Math.max(33, Math.round(1e3 / st));
        }
        g((st) => {
          const K = nt ? st - ce : st + ce;
          return Math.max(0, Math.min(c, K));
        });
        return;
      }
      if (Le.key === "ArrowDown") {
        Le.preventDefault();
        const nt = r.findIndex((ce) => ce.id === t.id);
        if (nt !== -1) {
          const ce = (nt + 1) % r.length;
          l(r[ce].id);
        }
        return;
      }
      if (Le.key === "ArrowUp") {
        Le.preventDefault();
        const nt = r.findIndex((ce) => ce.id === t.id);
        if (nt !== -1) {
          const ce = (nt - 1 + r.length) % r.length;
          l(r[ce].id);
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
    _,
    x,
    j,
    c,
    d,
    I,
    M,
    g,
    xt,
    rt,
    ve,
    pe
  ]);
  const He = r.findIndex((De) => De.id === (t && t.id)), Fe = r[He - 1], vt = r[He + 1];
  if (!e || !t) return null;
  const Ot = w > 0 ? w : Math.round(a + _);
  return As.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      Ye && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${Ye.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          Ye.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          Ye.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          Ye.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: Ye.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            ph(j - x),
            " (",
            Ct(a + x, i),
            " → ",
            Ct(a + j, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          ey,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: _,
            setPlayheadMs: g,
            isPlaying: Oe,
            setIsPlaying: ve,
            playbackSpeed: je,
            timeMode: i,
            inPointMs: x,
            outPointMs: j,
            isLooping: Ie,
            recordingSegments: h,
            globalGaps: Me,
            showWatermark: !0,
            directorPlan: H || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: R,
            onResetOverride: Z,
            viewMode: X,
            onViewModeChange: Q,
            isPipSwapped: J,
            onPipSwapChange: de
          }
        ),
        /* @__PURE__ */ s.jsx(
          ty,
          {
            currentEpochMs: Ot,
            keystrokes: b,
            keystrokeMode: se
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
              disabled: !Fe,
              onClick: () => Fe && l(Fe.id),
              title: Fe ? `Previous: ${Fe.displayName || Fe.roleAlias || Fe.hostname || Fe.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            He + 1,
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
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${Oe ? "is-playing-dimmed" : ""}`, ref: qe, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: ph(j - x) })
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
              isPlaying: Oe,
              setIsPlaying: rt,
              isLooping: Ie,
              setIsLooping: et,
              playbackSpeed: je,
              onChangeSpeed: ze,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: x,
              setInPointMs: I,
              outPointMs: j,
              setOutPointMs: M,
              onSetInPoint: () => I(Math.max(0, Math.min(_, j - 1e3))),
              onSetOutPoint: () => M(Math.min(c, Math.max(_, x + 1e3))),
              onStepFrameBackward: () => {
                ve(!1), g((De) => Math.max(0, De - 33));
              },
              onStepFrameForward: () => {
                ve(!1), g((De) => Math.min(c, De + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: Ct(a + _, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          zp,
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
            onZoomReset: $t,
            onFitRange: Rt,
            onJumpViewportTo: Lt,
            viewportStartMs: S,
            onViewportStartChange: C,
            playheadMs: _,
            setPlayheadMs: (De) => {
              ve(!1), g(De);
            },
            inPointMs: x,
            setInPointMs: I,
            outPointMs: j,
            setOutPointMs: M,
            recordingSegments: h,
            onExport: xt,
            onEstimateLoaded: (De) => {
              De != null && De.removedGlobalGaps && L(De.removedGlobalGaps);
            },
            keystrokeMode: se,
            onChangeKeystrokeMode: V,
            keystrokes: b,
            showKeystrokes: W,
            showRulerKeystrokes: W,
            onToggleRulerKeystrokes: O,
            onSplitDirectorSegment: oe,
            onChangeDirectorSegmentDisplay: te,
            onResetDirectorSegmentToAuto: Z
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Yp,
        {
          isOpen: pe,
          onClose: () => ae(!1)
        }
      )
    ] }),
    document.body
  );
}
function Xp({ isGlobalHost: e = !1 }) {
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
      let P = 2500;
      typeof document < "u" && document.hidden ? P = 3e4 : i.current > 0 && (P = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), A = setTimeout(async () => {
        await p(), k();
      }, P);
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
  const S = t.filter((h) => h.status === "Processing" || h.status === "Queued"), C = t.filter((h) => h.status === "Completed" || h.isCompleted), _ = () => {
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
        const N = k.filter((P) => (P.jobId || P.id) !== h);
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
  }, j = (h) => {
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
          className: `export-floating-hud ${S.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => f(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${S.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: S.length > 0 ? `EXPORTS: ${S.length} PACKAGING` : `${C.length} ARCHIVE${C.length > 1 ? "S" : ""} READY` }),
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
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: w, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const A = h.status === "Completed" || h.isCompleted, k = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", P = h.jobId || h.id, z = r.has(P), $ = A ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
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
                      onClick: (U) => g(P, U),
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
                        onClick: (U) => x(P, U),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (U) => I(h, U),
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
                      onClick: () => j(h),
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
            P
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function ry({
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
function ly({
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
    const P = Math.round(k * N / 2073600 * 6 * 10) / 10, z = Math.round(P * 60 / 8 * 10) / 10;
    return `~${P} Mbps (~${z} MB/min)`;
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
  ], [p, y] = u.useState("BurnIn"), [S, C] = u.useState(r.resolution || "NATIVE"), [_, w] = u.useState(""), [g, x] = u.useState(!1);
  if (!e) return null;
  const I = async () => {
    x(!0);
    try {
      await n(p, S, _), t();
    } finally {
      x(!1);
    }
  }, j = (r.layout || "DIRECTOR").toUpperCase(), M = r.stationsCount || 1, h = r.audioSegmentsCount || 1, A = f.find((k) => k.id === S) || f[0];
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
              j,
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
              Gg(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT EXPORT QUALITY & RESOLUTION" }),
        /* @__PURE__ */ s.jsx("div", { className: "quality-grid", children: f.map((k) => /* @__PURE__ */ s.jsxs("label", { className: `quality-card ${S === k.id ? "active" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "radio",
              name: "videoQuality",
              value: k.id,
              checked: S === k.id,
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
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: g, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: I, disabled: g, children: g ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${A.res})` })
      ] })
    ] }) }),
    document.body
  );
}
function oy(e, t, n, r, l = null) {
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
        const g = w.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const x = await w.json(), j = (Array.isArray(x) ? x : x.stations || x.items || []).filter((M) => (M.recordingsCount || (M.segments ? M.segments.length : 0)) > 0).map((M) => {
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
            if (!M || M.length === 0) return j;
            const h = new Map(M.map((N) => [N.id, N]));
            let A = M.length !== j.length;
            const k = j.map((N) => {
              const P = h.get(N.id);
              return P ? P.isOnline === N.isOnline && P.displayName === N.displayName && P.roleAlias === N.roleAlias && P.feedSpec === N.feedSpec && P.recordingsCount === N.recordingsCount && P.fps === N.fps ? P : (A = !0, { ...P, ...N }) : (A = !0, N);
            });
            return A ? k : M;
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
        const w = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${w}`);
        if (g.ok && C) {
          const x = await g.json() || {}, I = {};
          (f.current || []).forEach((j) => {
            const M = x[j.id] || x[j.hostname] || x[j.displayName] || [];
            I[j.id] = M, I[j.hostname] = M;
          }), Object.keys(x).forEach((j) => {
            I[j] || (I[j] = x[j]);
          }), c(I);
        }
      } catch {
        C && c({});
      }
    })(), () => {
      C = !1;
    };
  }, [y, e, t]);
  const S = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let C = 1 / 0, _ = -1 / 0;
    o.forEach((I) => {
      (i[I.id] || i[I.hostname] || I.segments || []).forEach((M) => {
        const h = M.startEpochMs ?? M.startEpoch ?? 0, A = M.endEpochMs ?? M.endEpoch ?? 0;
        h > 0 && h < C && (C = h), A > 0 && A > _ && (_ = A);
      });
    });
    let w = 1 / 0, g = -1 / 0;
    l && (i[l] || []).forEach((j) => {
      const M = j.startEpochMs ?? j.startEpoch ?? 0, h = j.endEpochMs ?? j.endEpoch ?? 0;
      M > 0 && M < w && (w = M), h > 0 && h > g && (g = h);
    });
    const x = (I) => I === 1 / 0 || I === -1 / 0 ? null : Math.max(0, Math.min(t, I - e));
    return {
      globalFirstMs: x(C),
      globalLastMs: x(_),
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
    movieBoundaries: S
  };
}
function ay({
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
  const [p, y] = u.useState(i), [S, C] = u.useState(c), [_, w] = u.useState(d), [g, x] = u.useState(v), I = u.useRef(null), j = u.useRef(null), M = o || l, h = u.useMemo(() => M ? a[M.id] || M.segments || [] : [], [M, a]), A = h.some((z) => {
    const $ = z.startEpochMs ?? z.startEpoch ?? 0, U = z.endEpochMs ?? z.endEpoch ?? 0, le = e + p;
    return le >= $ && le <= U;
  }), k = !!(!f && M && A);
  u.useEffect(() => {
    y((z) => z < t ? t : z > n ? (C(!1), n) : z);
  }, [t, n]);
  const N = u.useCallback((z) => {
    I.current || (I.current = z);
    const $ = (z - I.current) * g, U = Math.min($, 250 * g);
    I.current = z, y((le) => {
      let se = le + U;
      if (r && r.length > 0) {
        const V = e + se, b = r.find((W) => V >= W.startEpochMs && V < W.endEpochMs);
        b && (se = b.endEpochMs - e);
      }
      return se >= n && (_ ? se = t : (C(!1), se = n)), se;
    }), S && (!k || f) && (j.current = requestAnimationFrame(N));
  }, [S, _, t, n, r, e, k, g, f]);
  u.useEffect(() => (S && (!k || f) ? (I.current = performance.now(), j.current = requestAnimationFrame(N)) : (j.current && cancelAnimationFrame(j.current), I.current = null), () => {
    j.current && cancelAnimationFrame(j.current);
  }), [S, N, k, f]);
  const P = u.useCallback(() => {
    if (S)
      C(!1);
    else {
      let z = p;
      const $ = e + z, U = r == null ? void 0 : r.find((le) => $ >= le.startEpochMs && $ < le.endEpochMs);
      if (U)
        z = U.endEpochMs - e;
      else if (M && !A) {
        const le = h.map((se) => ({ start: se.startEpochMs ?? se.startEpoch ?? 0, end: se.endEpochMs ?? se.endEpoch ?? 0 })).filter((se) => se.start > $).sort((se, V) => se.start - V.start)[0];
        le && (z = le.start - e);
      }
      z !== p && y(z), C(!0);
    }
  }, [S, p, e, r, M, A, h]);
  return {
    playheadMs: p,
    setPlayheadMs: y,
    isPlaying: S,
    setIsPlaying: C,
    isLooping: _,
    setIsLooping: w,
    playbackSpeed: g,
    setPlaybackSpeed: x,
    togglePlaySmart: P
  };
}
function iy(e) {
  return 1 - Math.pow(1 - e, 3);
}
function cy({
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
  const p = Math.max(32, t / 2e3), y = t / l, S = u.useCallback((g, x = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const I = d.current, j = g - I;
    if (Math.abs(j) < 1) return;
    const M = performance.now(), h = (A) => {
      const k = A - M, N = Math.min(1, k / x);
      i(Math.round(I + j * iy(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), C = u.useCallback((g, x) => {
    const I = Math.max(1e3, x - g), j = Math.max(500, I * 0.05), M = Math.max(0, g - j), A = Math.min(t, x + j) - M, k = Math.max(1, Math.min(p, Number((t / A).toFixed(1)))), N = t / k, P = Math.max(0, Math.min(M, t - N));
    S(P), o(k);
  }, [t, p, S]), _ = u.useCallback(() => {
    S(0), o(1);
  }, [S]), w = u.useCallback((g, x = "center") => {
    if (g == null) return;
    const I = x === "start" ? y / 4 : y * 0.75, j = Math.max(0, Math.min(g - I, t - y));
    S(j);
  }, [y, t, S]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let g = null;
    const x = (j) => {
      if (j.defaultPrevented) return;
      j.preventDefault(), j.stopPropagation();
      const M = j.ctrlKey || j.shiftKey, h = v.current, A = d.current, k = f.current;
      if (M) {
        const N = Math.abs(j.deltaX) > Math.abs(j.deltaY) ? j.deltaX : j.deltaY;
        if (N === 0) return;
        const P = k / Math.max(1, h), z = Math.max(0, k - P), $ = P * 0.08 * (N > 0 ? 1 : -1);
        i((U) => Math.max(0, Math.min(z, U + $)));
      } else {
        if (j.deltaY === 0) return;
        const P = j.deltaY < 0 ? 1.25 : 0.8, z = Math.max(32, k / 2e3), $ = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, U = Math.max(0, Math.min($.width, j.clientX - $.left)), le = $.width > 0 ? U / $.width : 0.5;
        o((se) => {
          const V = Math.max(1, Math.min(z, Math.round(se * P * 100) / 100));
          if (V === se) return se;
          const b = k / se, W = k / V, H = A + le * b - le * W, R = Math.max(0, k - W);
          return i(Math.max(0, Math.min(R, H))), V;
        });
      }
    }, I = () => {
      const j = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return j && !g ? (g = j, g.addEventListener("wheel", x, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!I()) {
      const j = setInterval(() => {
        I() && clearInterval(j);
      }, 100);
      return () => {
        clearInterval(j), g && g.removeEventListener("wheel", x, { capture: !0 });
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
    animateViewportTo: S,
    fitRange: C,
    resetZoom: _,
    jumpViewportTo: w
  };
}
function uy({
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
  onToggleHelpModal: C,
  onSplitDirectorAtPlayhead: _,
  isModalActive: w = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: x,
  isGridFullscreen: I = !1,
  onExitGridFullscreen: j
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
            if (h.preventDefault(), !g) return;
            S();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), x == null || x();
            return;
          }
          if ((h.key === "Escape" || h.code === "Escape") && I) {
            h.preventDefault(), j == null || j();
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
              const z = Math.max(1, y);
              P = Math.max(33, Math.round(1e3 / z));
            }
            i == null || i((z) => {
              const $ = N ? z - P : z + P;
              return Math.max(0, Math.min(p, $));
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
    S,
    C,
    _,
    w,
    g,
    x,
    I,
    j
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
function dy() {
  var En, Rl;
  const e = u.useMemo(() => Ug() || {}, []), [t, n] = u.useState(() => {
    var T, re;
    return (T = e.timeRange) != null && T.startEpochMs && ((re = e.timeRange) != null && re.endEpochMs) ? e.timeRange : mh();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    Lg().catch((T) => console.warn("[Studio] DST init error:", T));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Kl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), f = u.useMemo(() => d - v, [d, v]), p = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, S] = u.useState(e.selectedStationIds || []), [C, _] = u.useState(e.activeStationId || null), [w, g] = u.useState(null), [x, I] = u.useState(null), [j, M] = u.useState([]), [h, A] = u.useState(!1), [k, N] = u.useState(null), [P, z] = u.useState(() => {
    var T;
    return e.compositionScope || (((T = e.selectedStationIds) == null ? void 0 : T.length) > 1 ? "inter-station" : "intra-station");
  }), [$, U] = u.useState(() => {
    try {
      const T = localStorage.getItem("itb_composition_layout");
      if (T) return T;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), le = u.useCallback((T) => {
    U((re) => {
      const F = typeof T == "function" ? T(re) : T;
      try {
        localStorage.setItem("itb_composition_layout", F);
      } catch {
      }
      return F;
    });
  }, []), [se, V] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [b, W] = u.useState(() => !!e.isPipSwapped), [O, H] = u.useState(() => e.audioRoutingPlan || null), [R, oe] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [te, Z] = u.useState(!1), [Y, Re] = u.useState(null), [Oe, ve] = u.useState(() => e.canvasLayoutTimeline || null), [Be, be] = u.useState(0), Ie = u.useCallback((T) => {
    ve((re) => {
      const F = [...(re == null ? void 0 : re.keyframes) || []], me = F.findIndex((Ke) => Math.abs(Ke.timestampEpochMs - T) < 300);
      if (me >= 0)
        return be(me), re;
      const we = F[Be] || F[0], Ce = (we == null ? void 0 : we.layout) || Y || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, $e = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(T),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(Ce))
      }, he = [...F, $e].sort((Ke, Ve) => Ke.timestampEpochMs - Ve.timestampEpochMs), Qe = he.findIndex((Ke) => Ke.timestampEpochMs === Math.round(T));
      return be(Qe >= 0 ? Qe : 0), {
        ...re || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: he
      };
    });
  }, [Be, Y]), et = u.useCallback((T, re) => {
    ve((F) => !(F != null && F.keyframes) || F.keyframes.length === 0 ? F : Uc(F, T, re));
  }, []), at = u.useCallback((T) => {
    ve((re) => {
      if (!(re != null && re.keyframes) || re.keyframes.length <= 1) return re;
      const F = re.keyframes.filter((me, we) => we !== T);
      return be((me) => Math.max(0, me - 1)), { ...re, keyframes: F };
    });
  }, []), ie = u.useCallback((T, re) => {
    ve((F) => {
      if (!(F != null && F.keyframes) || F.keyframes.length === 0) return F;
      const me = Math.round(re), we = typeof T == "number" && F.keyframes[T] ? T : F.keyframes.findIndex((he) => he.id === T);
      if (we === -1) return F;
      const Ce = [...F.keyframes];
      Ce[we] = {
        ...Ce[we],
        timestampEpochMs: me
      }, Ce.sort((he, Qe) => he.timestampEpochMs - Qe.timestampEpochMs);
      const $e = Ce.findIndex((he) => he.timestampEpochMs === me);
      return $e >= 0 && be($e), {
        ...F,
        keyframes: Ce
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [je, ze] = u.useState({}), Ye = u.useCallback((T) => {
    S((re) => re.filter((F) => F !== T)), C === T && _(null), w === T && g(null), ve((re) => {
      if (!re || !re.keyframes) return re;
      const F = re.keyframes.map((me) => {
        var we;
        return {
          ...me,
          layout: {
            ...me.layout,
            placements: (((we = me.layout) == null ? void 0 : we.placements) || []).filter((Ce) => Ce.stationId !== T)
          }
        };
      });
      return { ...re, keyframes: F };
    });
  }, [C, w]), ge = u.useCallback((T, re) => {
    T.preventDefault(), T.stopPropagation();
    const F = 195, me = 110, we = Math.min(T.clientX, window.innerWidth - F - 10), Ce = Math.min(T.clientY, window.innerHeight - me - 10);
    N({ x: we, y: Ce, station: re });
  }, []), pe = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(p, e.inEpochMs - f)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(p, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, f, p, v]), ae = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(pe + 1e3, Math.min(p, e.outEpochMs - f)) : typeof e.outPointMs == "number" ? Math.max(pe + 1e3, Math.min(p, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, f, p, v, t.durationMs, pe]), Me = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(p, e.playheadEpochMs - f)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(p, e.playheadMs)) : pe, [e.playheadEpochMs, e.playheadMs, f, p, pe]), [L, ne] = u.useState(pe), [X, ee] = u.useState(ae);
  u.useEffect(() => {
    if (!f) return;
    const T = Math.round(f + L), re = Math.round(f + X);
    ve((F) => {
      var he, Qe;
      if (!F || !F.keyframes || F.keyframes.length === 0) return F;
      let me = [...F.keyframes], we = !1, Ce = me.find((Ke) => Ke.tag === "cut-in");
      if (Ce)
        Ce.timestampEpochMs !== T && (Ce.timestampEpochMs = T, we = !0);
      else {
        const Ke = me.find((Ve) => Math.abs(Ve.timestampEpochMs - T) < 500);
        if (Ke)
          Ke.tag = "cut-in", Ke.timestampEpochMs = T, we = !0;
        else {
          const Ve = ((he = me[0]) == null ? void 0 : he.layout) || Y || { width: 1920, height: 1080, placements: [] };
          me.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: T,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ve))
          }), we = !0;
        }
      }
      let $e = me.find((Ke) => Ke.tag === "cut-out");
      if ($e)
        $e.timestampEpochMs !== re && ($e.timestampEpochMs = re, we = !0);
      else {
        const Ke = me.find((Ve) => Math.abs(Ve.timestampEpochMs - re) < 500 && Ve.tag !== "cut-in");
        if (Ke)
          Ke.tag = "cut-out", Ke.timestampEpochMs = re, we = !0;
        else {
          const Ve = ((Qe = me[me.length - 1]) == null ? void 0 : Qe.layout) || Y || { width: 1920, height: 1080, placements: [] };
          me.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: re,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Ve))
          }), we = !0;
        }
      }
      return we ? (me.sort((Ke, Ve) => Ke.timestampEpochMs - Ve.timestampEpochMs), {
        ...F,
        keyframes: me
      }) : F;
    });
  }, [f, L, X, Y]);
  const { allStations: Q, recordingSegments: J, isLoadingStations: de, movieBoundaries: qe } = oy(
    f,
    p,
    t,
    r,
    C
  ), _e = u.useMemo(() => Q.find((T) => T.id === C) || null, [Q, C]), Xe = u.useCallback((T) => {
    ze((re) => {
      const F = !(re[T] ?? !0);
      return ve((me) => {
        if (!(me != null && me.keyframes)) return me;
        const we = me.keyframes.map((Ce) => {
          var Ke;
          const $e = ((Ke = Ce.layout) == null ? void 0 : Ke.placements) || [];
          let he = !1;
          const Qe = $e.map((Ve) => {
            if (Ve.stationId === T) {
              if (!F && (Ve.displayId === "auto" || !Ve.displayId)) {
                he = !0;
                const tt = Q.find((ot) => ot.id === T);
                return {
                  ...Ve,
                  displayId: "mon-0",
                  label: `${(tt == null ? void 0 : tt.displayName) || T} - Screen 1 (Main)`
                };
              } else if (F && (Ve.displayId === "mon-0" || !Ve.displayId) && $e.filter((ot) => ot.stationId === T).length === 1) {
                he = !0;
                const ot = Q.find((Mt) => Mt.id === T);
                return {
                  ...Ve,
                  displayId: "auto",
                  label: `${(ot == null ? void 0 : ot.displayName) || T} - Central Composition (Auto-Director)`
                };
              }
            }
            return Ve;
          });
          return he ? {
            ...Ce,
            layout: {
              ...Ce.layout,
              placements: Qe
            }
          } : Ce;
        });
        return { ...me, keyframes: we };
      }), {
        ...re,
        [T]: F
      };
    });
  }, [Q]), lt = u.useCallback((T, re) => {
    ve((F) => {
      var Ve, tt;
      if (!F || !F.keyframes || F.keyframes.length === 0) return F;
      const me = Be >= 0 && Be < F.keyframes.length ? Be : 0, we = F.keyframes[me], Ce = ((Ve = we == null ? void 0 : we.layout) == null ? void 0 : Ve.placements) || [], $e = (re || "mon-0").toLowerCase(), he = Ce.findIndex((ot) => {
        if (ot.stationId !== T) return !1;
        const Mt = (ot.displayId || "mon-0").toLowerCase();
        return Mt === $e || Mt === "auto" && ($e === "mon-0" || $e === "screen-0");
      });
      let Qe;
      if (he >= 0)
        Qe = Ce.filter((ot, Mt) => Mt !== he);
      else {
        const ot = Q.find((br) => br.id === T), Mt = ((tt = ot == null ? void 0 : ot.displays) == null ? void 0 : tt.find((br) => (br.displayId || "").toLowerCase() === $e)) || { width: 1920, height: 1080 }, qt = Mt.width || 1920, Ut = Mt.height || 1080, en = qt / Ut, Un = en >= 1 ? 640 : Math.round(360 * en), Mr = en >= 1 ? Math.round(640 / en) : 360, ci = {
          stationId: T,
          displayId: $e,
          label: `${(ot == null ? void 0 : ot.displayName) || T} - ${Mt.displayName || $e}`,
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
        Qe = [...Ce, ci];
      }
      const Ke = [...F.keyframes];
      return Ke[me] = {
        ...Ke[me],
        layout: {
          ...Ke[me].layout,
          placements: Qe
        }
      }, { ...F, keyframes: Ke };
    });
  }, [Be, Q]), Ge = u.useMemo(() => !y || y.length === 0 ? [] : Q.filter((T) => y.includes(T.id)), [Q, y]);
  u.useEffect(() => {
    !f || isNaN(f) || ve((T) => {
      if (T != null && T.keyframes && T.keyframes.length > 0) return T;
      const re = f + (L || 0), F = f + (X || p || 36e5), me = Y || {
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
  }, [f, L, X, p, Y]), u.useEffect(() => {
    if (!Ge || Ge.length === 0 || !f || isNaN(f)) return;
    const T = f + (L || 0), re = f + (X || p || 36e5);
    re <= T || Ge.forEach((F) => {
      Ur.fetchWaveform(F.id, T, re, null, 250);
    });
  }, [Ge, f, L, X, p]);
  const It = u.useMemo(() => Q.find((T) => T.id === w) || null, [Q, w]), $t = !!(w && It), Rt = u.useRef("grid"), Lt = u.useRef(null), {
    playheadMs: rt,
    setPlayheadMs: xt,
    isPlaying: He,
    setIsPlaying: Fe,
    playbackSpeed: vt,
    setPlaybackSpeed: Ot,
    isLooping: Gt,
    setIsLooping: Kt,
    togglePlaySmart: dn
  } = ay({
    timelineBaseEpochMs: f,
    inPointMs: L,
    outPointMs: X,
    globalGaps: j,
    activeStation: _e,
    spotlightStation: It,
    recordingSegments: J,
    initialPlayheadMs: Me,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !C
  }), {
    zoomLevel: De,
    setZoomLevel: Le,
    viewportStartMs: nt,
    setViewportStartMs: ce,
    resetZoom: st,
    fitRange: K,
    jumpViewportTo: fe
  } = cy({
    containerRef: Lt,
    totalTimelineDurationMs: p,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [xe, Ue] = u.useState(!1), [Je, it] = u.useState(!1), [ft, Ze] = u.useState(!1), [Nt, wt] = u.useState(!1), [Bt, Tt] = u.useState(
    !!(e.isWorkspaceActive && ((En = e.selectedStationIds) == null ? void 0 : En.length) > 0)
  ), [an, An] = u.useState([]);
  u.useEffect(() => {
    const T = $t && It || _e, re = (T == null ? void 0 : T.hostname) || (T == null ? void 0 : T.displayName) || (T == null ? void 0 : T.id), F = (o || "NONE").toUpperCase().replace("-", "_");
    if (!re || !f || !(F !== "NONE" && F !== "OFF" || i)) {
      An([]);
      return;
    }
    const we = Math.max(0, f - 5e3), Ce = f + p + 5e3, $e = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(re)}&startEpoch=${we}&endEpoch=${Ce}`, { signal: $e.signal }).then((he) => he.ok ? he.json() : []).then((he) => An(Array.isArray(he) ? he : [])).catch((he) => {
      he.name !== "AbortError" && An([]);
    }), () => $e.abort();
  }, [_e, It, $t, f, p, o, i]), u.useEffect(() => {
    de || (Q.length === 0 ? ((y.length > 0 || C || Bt) && (S([]), _(null), g(null), Tt(!1)), wt(!0), A(!0)) : (A(!1), S((T) => {
      const re = T.filter((F) => Q.some((me) => me.id === F));
      return re.length !== T.length ? (re.length === 0 && (Tt(!1), wt(!0)), re) : T;
    })));
  }, [de, Q]);
  const wn = u.useCallback((T) => {
    if (T === null) {
      Fe(!1), Ot(1), _(null);
      return;
    }
    T !== C && Ot(1), _(T);
  }, [C, Fe, Ot]), Bn = u.useCallback((T, re = null) => {
    T !== C && Ot(1), Rt.current = y.length <= 1 || C ? "spotlight" : "grid", _(T), g(T), I(re || null);
  }, [C, y.length, Ot]), $s = u.useCallback(() => {
    g(null), I(null), Rt.current === "grid" && _(null);
  }, []), Dt = u.useMemo(() => {
    if (O != null && O.segments && O.segments.length > 0)
      return O;
    const T = y[0] || C || "mon-0";
    return {
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          sourceStationId: T
        }
      ]
    };
  }, [O, y, C, f, p]), Rs = u.useCallback((T) => {
    H((re) => {
      const F = re || Dt, me = [...F.segments || []], we = me.findIndex((tt) => {
        const ot = tt.startEpochMs ?? tt.StartEpochMs ?? 0, Mt = tt.endEpochMs ?? tt.EndEpochMs ?? 0;
        return T > ot + 500 && T < Mt - 500;
      });
      if (we === -1) return re;
      const Ce = me[we], $e = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0, Qe = Ce.sourceStationId ?? Ce.SourceStationId ?? y[0], Ke = { startEpochMs: $e, endEpochMs: T, sourceStationId: Qe }, Ve = { startEpochMs: T, endEpochMs: he, sourceStationId: Qe };
      return me.splice(we, 1, Ke, Ve), { ...F, segments: me };
    });
  }, [Dt, y]), Ys = u.useCallback((T, re) => {
    H((F) => {
      const me = F || Dt, we = (me.segments || []).map((Ce) => {
        const $e = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0;
        return T >= $e && T <= he ? { ...Ce, sourceStationId: re } : Ce;
      });
      return { ...me, segments: we };
    }), oe(!1);
  }, [Dt]), Zt = u.useCallback((T, re) => {
    H((F) => {
      const me = F || Dt, we = (me.segments || []).map((Ce) => {
        const $e = Ce.startEpochMs ?? Ce.StartEpochMs ?? 0, he = Ce.endEpochMs ?? Ce.EndEpochMs ?? 0;
        return T >= $e && T <= he ? { ...Ce, gain: re } : Ce;
      });
      return { ...me, segments: we };
    });
  }, [Dt]), $n = u.useCallback(() => {
    oe((T) => !T);
  }, []), [ln, Qt] = u.useState({}), Vt = u.useCallback((T) => {
    if (!T) return null;
    if (ln[T]) return ln[T];
    const re = Q.find((F) => F.id === T);
    return re != null && re.directorPlan ? re.directorPlan : {
      stationId: T,
      segments: [
        {
          startEpochMs: f,
          endEpochMs: f + p,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [ln, Q, f, p]), rs = u.useCallback((T, re) => {
    T && Qt((F) => {
      const me = F[T] || Vt(T), we = [...me.segments || []], Ce = we.findIndex((Mt) => {
        const qt = Mt.startEpochMs ?? Mt.StartEpochMs ?? 0, Ut = Mt.endEpochMs ?? Mt.EndEpochMs ?? 0;
        return re > qt + 500 && re < Ut - 500;
      });
      if (Ce === -1) return F;
      const $e = we[Ce], he = $e.startEpochMs ?? $e.StartEpochMs ?? 0, Qe = $e.endEpochMs ?? $e.EndEpochMs ?? 0, Ke = $e.targetDisplayId ?? $e.TargetDisplayId ?? "mon-0", Ve = !!($e.isManualOverride ?? $e.IsManualOverride), tt = { ...$e, startEpochMs: he, endEpochMs: re, targetDisplayId: Ke, isManualOverride: Ve }, ot = { ...$e, startEpochMs: re, endEpochMs: Qe, targetDisplayId: Ke, isManualOverride: Ve };
      return we.splice(Ce, 1, tt, ot), { ...F, [T]: { ...me, segments: we } };
    });
  }, [Vt]), ls = u.useCallback((T, re, F) => {
    T && Qt((me) => {
      const we = me[T] || Vt(T), Ce = [...we.segments || []];
      let $e = Ce.findIndex((Qe) => {
        const Ke = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ve = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return re > Ke && re < Ve;
      });
      if ($e === -1 && ($e = Ce.findIndex((Qe) => {
        const Ke = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ve = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0;
        return re >= Ke && re <= Ve;
      })), $e === -1) return me;
      const he = Ce[$e];
      return Ce[$e] = { ...he, targetDisplayId: F, isManualOverride: !0 }, { ...me, [T]: { ...we, segments: Ce } };
    });
  }, [Vt]), Xs = u.useCallback((T, re) => {
    if (!T) return;
    const F = Q.find((we) => we.id === T), me = F == null ? void 0 : F.directorPlan;
    Qt((we) => {
      var qt;
      const Ce = we[T] || Vt(T), $e = [...Ce.segments || []];
      let he = $e.findIndex((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return re > en && re < Un;
      });
      if (he === -1 && (he = $e.findIndex((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return re >= en && re <= Un;
      })), he === -1) return we;
      const Qe = $e[he], Ke = Qe.startEpochMs ?? Qe.StartEpochMs ?? 0, Ve = Qe.endEpochMs ?? Qe.EndEpochMs ?? 0, tt = (Ke + Ve) / 2, ot = (qt = me == null ? void 0 : me.segments) == null ? void 0 : qt.find((Ut) => {
        const en = Ut.startEpochMs ?? Ut.StartEpochMs ?? 0, Un = Ut.endEpochMs ?? Ut.EndEpochMs ?? 0;
        return tt >= en && tt <= Un;
      }), Mt = ot ? ot.targetDisplayId ?? ot.TargetDisplayId ?? "mon-0" : "mon-0";
      return $e[he] = { ...Qe, targetDisplayId: Mt, isManualOverride: !1 }, { ...we, [T]: { ...Ce, segments: $e } };
    });
  }, [Q, Vt]);
  u.useEffect(() => {
    if (!Ge || Ge.length === 0 || isNaN(f)) return;
    const T = f + L, re = f + X;
    if (re <= T) return;
    const F = setTimeout(async () => {
      const me = Ge.filter((we) => {
        var $e;
        return (we.displays || we.Displays || (($e = we.displayTopology) == null ? void 0 : $e.displays) || []).length > 1;
      });
      if (me.length !== 0)
        for (const we of me)
          try {
            const Ce = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(we.id)}&startEpoch=${T}&endEpoch=${re}`);
            if (Ce.ok) {
              const $e = await Ce.json();
              $e != null && $e.segments && $e.segments.length > 0 && Qt((he) => {
                const Qe = he[we.id] || we.directorPlan, Ke = ((Qe == null ? void 0 : Qe.segments) || []).filter((tt) => tt.isManualOverride || tt.IsManualOverride);
                if (Ke.length === 0)
                  return { ...he, [we.id]: $e };
                const Ve = [...$e.segments];
                return Ke.forEach((tt) => {
                  const ot = tt.startEpochMs ?? tt.StartEpochMs, Mt = tt.endEpochMs ?? tt.EndEpochMs;
                  for (let qt = Ve.length - 1; qt >= 0; qt--) {
                    const Ut = Ve[qt].startEpochMs ?? Ve[qt].StartEpochMs, en = Ve[qt].endEpochMs ?? Ve[qt].EndEpochMs;
                    if (!(en <= ot || Ut >= Mt))
                      if (Ut >= ot && en <= Mt)
                        Ve.splice(qt, 1);
                      else if (Ut < ot && en > Mt) {
                        const Un = { ...Ve[qt], endEpochMs: ot }, Mr = { ...Ve[qt], startEpochMs: Mt };
                        Ve.splice(qt, 1, Un, Mr);
                      } else Ut < ot ? Ve[qt].endEpochMs = ot : en > Mt && (Ve[qt].startEpochMs = Mt);
                  }
                  Ve.push(tt);
                }), Ve.sort((tt, ot) => (tt.startEpochMs ?? tt.StartEpochMs) - (ot.startEpochMs ?? ot.StartEpochMs)), { ...he, [we.id]: { ...$e, segments: Ve } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(F);
  }, [L, X, Ge, f]);
  const js = u.useMemo(() => Ge.map((T) => ({
    ...T,
    directorPlan: ln[T.id] || T.directorPlan || Vt(T.id)
  })), [Ge, ln, Vt]), mn = u.useMemo(() => _e ? {
    ..._e,
    directorPlan: ln[_e.id] || _e.directorPlan || Vt(_e.id)
  } : null, [_e, ln, Vt]), Cr = u.useMemo(() => It ? {
    ...It,
    directorPlan: ln[It.id] || It.directorPlan || Vt(It.id)
  } : null, [It, ln, Vt]), yn = (T, re = 30) => {
    const F = Math.max(0, T), me = Math.floor(F / 1e3), we = Math.floor(me / 3600), Ce = Math.floor(me % 3600 / 60), $e = me % 60, he = Math.floor(F % 1e3 / 1e3 * re), Qe = (Ke) => String(Ke).padStart(2, "0");
    return `${Qe(we)}:${Qe(Ce)}:${Qe($e)}.${Qe(he)}`;
  }, [kt, ps] = u.useState(!1), [Gn, Sr] = u.useState(!0), [Ao, Gs] = u.useState(!1), Ae = u.useRef(null), Pe = u.useMemo(() => {
    var me;
    const T = Oe == null ? void 0 : Oe.keyframes, re = (T == null ? void 0 : T[Be]) || (T == null ? void 0 : T[0]);
    return (((me = re == null ? void 0 : re.layout) == null ? void 0 : me.placements) || (Y == null ? void 0 : Y.placements) || []).length > 0 || y && y.length > 0;
  }, [Oe, Be, Y, y]), ms = u.useCallback(() => {
    Ae.current && clearTimeout(Ae.current), Sr(!0), Ae.current = setTimeout(() => {
      Ao || Sr(!1);
    }, 2500);
  }, [Ao]);
  u.useEffect(() => {
    if (!kt) {
      Sr(!0), Ae.current && clearTimeout(Ae.current);
      return;
    }
    const T = (re) => {
      re.clientY >= window.innerHeight - 280 && Sr(!0), ms();
    };
    return window.addEventListener("mousemove", T, { passive: !0 }), ms(), () => {
      window.removeEventListener("mousemove", T), Ae.current && clearTimeout(Ae.current);
    };
  }, [kt, ms]);
  const $o = u.useCallback(() => {
    ps((T) => {
      const re = !T;
      return re ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), re;
    });
  }, []), Ro = u.useCallback(() => {
    ps(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const T = () => {
      !document.fullscreenElement && kt && ps(!1);
    };
    return document.addEventListener("fullscreenchange", T), () => document.removeEventListener("fullscreenchange", T);
  }, [kt]), uy({
    activeStationId: C,
    spotlightStationId: w,
    timelineStations: js,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: wn,
    setPlaybackSpeed: Ot,
    playheadMs: rt,
    setPlayheadMs: xt,
    inPointMs: L,
    setInPointMs: ne,
    outPointMs: X,
    setOutPointMs: ee,
    totalTimelineDurationMs: p,
    zoomLevel: De,
    togglePlaySmart: dn,
    onToggleHelpModal: () => Ze((T) => !T),
    onSplitDirectorAtPlayhead: () => {
      var re, F, me;
      const T = C || (y.length === 1 ? y[0] : null);
      if (T) {
        const we = Q.find(($e) => $e.id === T);
        (((re = we == null ? void 0 : we.displays) == null ? void 0 : re.length) > 1 || ((me = (F = we == null ? void 0 : we.topology) == null ? void 0 : F.displays) == null ? void 0 : me.length) > 1) && rs(T, f + rt);
      }
    },
    isModalActive: xe || Je || ft,
    hasGridPlacements: Pe,
    onToggleGridFullscreen: $o,
    isGridFullscreen: kt,
    onExitGridFullscreen: Ro
  }), u.useEffect(() => {
    const T = f + L, re = f + X, F = f + rt;
    Op({
      timeRange: t,
      timeMode: r,
      inPointMs: L,
      outPointMs: X,
      playheadMs: Math.round(rt),
      inEpochMs: T,
      outEpochMs: re,
      playheadEpochMs: F,
      selectedStationIds: y,
      activeStationId: C,
      zoomLevel: De,
      viewportStartMs: nt,
      isWorkspaceActive: Bt,
      isLooping: Gt,
      playbackSpeed: vt,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: P,
      compositionLayout: $,
      isAutoDirectorEnabled: se,
      isPipSwapped: b,
      audioRoutingPlan: Dt,
      isAutoFollowAudio: R,
      canvasLayoutTimeline: Oe
    });
  }, [
    t,
    r,
    L,
    X,
    rt,
    y,
    C,
    De,
    nt,
    Bt,
    Gt,
    vt,
    f,
    o,
    i,
    P,
    $,
    se,
    b,
    Dt,
    R,
    Oe
  ]);
  const Lo = u.useCallback((T) => {
    var Ke, Ve;
    const re = Kl(T.startTime), F = Kl(T.endTime), me = Math.max(0, F - re) || 144e5, we = {
      start: T.startTime,
      end: T.endTime,
      durationMs: me,
      startEpochMs: re,
      endEpochMs: F
    }, Ce = Math.max(6e4, Math.round(me * 0.05)), $e = re - Ce, he = me + 2 * Ce;
    if (n(we), T.inEpochMs && T.outEpochMs) {
      const tt = Math.max(0, Math.min(he, T.inEpochMs - $e)), ot = Math.max(tt + 1e3, Math.min(he, T.outEpochMs - $e)), Mt = T.playheadEpochMs ? Math.max(0, Math.min(he, T.playheadEpochMs - $e)) : tt;
      ne(tt), ee(ot), xt(Mt);
    } else {
      const tt = typeof T.inPointMs == "number" ? T.inPointMs : Ce, ot = typeof T.outPointMs == "number" ? T.outPointMs : Ce + me, Mt = typeof T.playheadMs == "number" ? T.playheadMs : tt;
      ne(Math.max(0, Math.min(he, tt))), ee(Math.max(0, Math.min(he, ot))), xt(Math.max(0, Math.min(he, Mt)));
    }
    const Qe = ((Ke = T.selectedStationIds) == null ? void 0 : Ke.length) > 0 ? T.selectedStationIds : ((Ve = T.cutStationIds) == null ? void 0 : Ve.length) > 0 ? T.cutStationIds : T.stationIds;
    if ((Qe == null ? void 0 : Qe.length) > 0) {
      S(Qe);
      const tt = T.spotlightStationId || T.SpotlightStationId || null, ot = T.activeStationId || T.ActiveStationId || null;
      tt && Qe.includes(tt) ? (_(tt), g(tt)) : ot && Qe.includes(ot) ? (_(ot), g(null)) : (_(null), g(null));
    }
    T.keystrokeMode && a(T.keystrokeMode), Tt(!0), wt(!1);
  }, []), ii = u.useCallback((T) => {
    const re = T.startEpochMs || Kl(T.start, null, r), F = T.endEpochMs || Kl(T.end, null, r), me = Math.max(0, F - re) || 144e5, we = Math.max(6e4, Math.round(me * 0.05)), Ce = re - we, $e = me + 2 * we;
    n({
      ...T,
      startEpochMs: re,
      endEpochMs: F,
      durationMs: me
    }), A(!1), ne(we), ee(we + me), xt(we), ve((he) => {
      if (!(he != null && he.keyframes) || he.keyframes.length === 0) return he;
      const Qe = he.keyframes.map((Ke, Ve) => Ve === 0 ? { ...Ke, timestampEpochMs: Ce } : Ke).filter((Ke) => Ke.timestampEpochMs >= Ce && Ke.timestampEpochMs <= Ce + $e);
      return { ...he, keyframes: Qe };
    }), H((he) => {
      if (!(he != null && he.segments) || he.segments.length === 0) return he;
      if (!he.segments.some((Ke) => {
        const Ve = Ke.startEpochMs ?? Ke.StartEpochMs ?? 0;
        return (Ke.endEpochMs ?? Ke.EndEpochMs ?? 0) > Ce && Ve < Ce + $e;
      })) {
        const Ke = y[0] || C || "station-0";
        return {
          segments: [
            {
              startEpochMs: Ce,
              endEpochMs: Ce + $e,
              sourceStationId: Ke
            }
          ]
        };
      }
      return he;
    }), Qt({});
  }, [r, y, C]), Ls = u.useCallback(() => {
    if (Ge.map((re) => re.id).length === 0) return alert("No active stations selected in timeline.");
    Z(!0);
  }, [Ge]), vn = u.useCallback(async (T, re, F = "") => {
    var he, Qe, Ke, Ve;
    const me = Ge.map((tt) => tt.id);
    if (me.length === 0) return;
    let we = T === "None" ? "None" : "BurnIn";
    const Ce = re || "NATIVE", $e = ((he = mn == null ? void 0 : mn.displays) == null ? void 0 : he.length) > 1 || ((Ke = (Qe = mn == null ? void 0 : mn.topology) == null ? void 0 : Qe.displays) == null ? void 0 : Ke.length) > 1 ? ((Ve = mn == null ? void 0 : mn.directorPlan) == null ? void 0 : Ve.segments) || [] : [];
    try {
      const tt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: Vp(),
          notes: (F || "").trim(),
          stationIds: me,
          inEpochMs: f + L,
          outEpochMs: f + X,
          keystrokeMode: we,
          resolution: Ce,
          videoQuality: Ce,
          compositionScope: P,
          layoutMode: "canvas",
          canvasLayout: Y,
          canvasLayoutTimeline: Oe,
          isPipSwapped: b,
          isAutoDirectorEnabled: se,
          directorSegments: $e,
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
      if (!tt.ok) throw new Error(`HTTP ${tt.status}`);
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (tt) {
      console.error("[Studio] Export failed:", tt), alert("Failed to launch background master MP4 export job.");
    }
  }, [Ge, f, L, X, P, Y, Oe, b, se, mn, Dt]), hn = u.useCallback(() => {
    Wg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const T = mh(), re = Math.max(6e4, Math.round(T.durationMs * 0.05));
    n(T), ne(re), ee(re + T.durationMs), xt(re), S([]), _(null), g(null), Fe(!1), Ot(1), a("BURN_IN"), st(), Tt(!1), wt(!0);
  }, [st, Fe, Ot, xt]), fn = !Bt || y.length === 0, cn = f + rt;
  return u.useEffect(() => {
    const T = Oe == null ? void 0 : Oe.keyframes;
    if (!T || T.length === 0) return;
    let re = 0;
    for (let F = 0; F < T.length && T[F].timestampEpochMs <= cn + 50; F++)
      re = F;
    re !== Be && be(re);
  }, [cn, Oe == null ? void 0 : Oe.keyframes, Be]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        _g,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: C,
          hideBackToGrid: Ge.length <= 1,
          onResetActiveStation: () => wn(null),
          onOpenRangeModal: () => Ue(!0),
          onOpenBookmarksModal: () => it(!0),
          onOpenHelpModal: () => Ze(!0),
          onToggleDrawer: () => wt(!Nt),
          isInitialSetup: fn,
          selectedCount: y.length,
          totalCount: Q.length,
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
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${kt ? "cinema-fullscreen-mode" : ""}`, children: [
        kt && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${Gn ? "" : "is-hud-hidden"}`, children: [
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
                onClick: () => Ze(!0),
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
              js.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !fn && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              ox,
              {
                activeStation: mn,
                timelineStations: js,
                allStations: Q,
                onSelectActiveStation: wn,
                onOpenSpotlight: Bn,
                onStationContextMenu: ge,
                onDeselectStation: Ye,
                stationAutoDirectorMap: je,
                onToggleStationAutoDirector: Xe,
                onOpenDrawer: () => wt(!0),
                baseEpochMs: f,
                playheadMs: rt,
                playheadEpochMs: cn,
                timeMode: r,
                isPlaying: $t ? !1 : He,
                setIsPlaying: Fe,
                totalDurationMs: p,
                inPointMs: L,
                outPointMs: X,
                setPlayheadMs: xt,
                globalGaps: j,
                recordingSegments: J,
                playbackSpeed: vt,
                onChangePlaybackSpeed: Ot,
                keystrokeMode: o,
                keystrokes: an,
                directorPlan: mn == null ? void 0 : mn.directorPlan,
                onOverrideDisplay: ls,
                onResetOverride: Xs,
                compositionScope: P,
                onChangeCompositionScope: z,
                compositionLayout: $,
                onChangeCompositionLayout: le,
                isAutoDirectorEnabled: se,
                onToggleAutoDirector: () => V((T) => !T),
                isPipSwapped: b,
                onTogglePipSwap: () => W((T) => !T),
                onUpdateCanvasLayout: Re,
                canvasLayoutTimeline: Oe,
                onUpdateCanvasLayoutTimeline: ve,
                activeKfIndex: Be,
                setActiveKfIndex: be,
                isModalOpen: te || xe || Je || $t || ft,
                isGridFullscreen: kt,
                onToggleGridFullscreen: $o
              }
            ),
            !kt && /* @__PURE__ */ s.jsx(
              Hc,
              {
                hasGridPlacements: Pe,
                baseEpochMs: f,
                timeMode: r,
                totalDurationMs: p,
                playheadMs: rt,
                setPlayheadMs: xt,
                inPointMs: L,
                setInPointMs: ne,
                outPointMs: X,
                setOutPointMs: ee,
                activeStationId: C,
                isPlaying: He,
                setIsPlaying: dn,
                isLooping: Gt,
                setIsLooping: Kt,
                playbackSpeed: vt,
                onChangeSpeed: Ot,
                onSetInPoint: () => ne(Math.max(0, Math.min(rt, X - 1e3))),
                onSetOutPoint: () => ee(Math.min(p, Math.max(rt, L + 1e3))),
                onStepFrameBackward: () => {
                  Fe(!1), xt((T) => Math.max(0, T - 33));
                },
                onStepFrameForward: () => {
                  Fe(!1), xt((T) => Math.min(p, T + 33));
                }
              }
            )
          ] }),
          kt && /* @__PURE__ */ s.jsx(
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
              className: `studio-bottom-timeline ${kt ? "cinema-timeline-island" : ""} ${kt && !Gn ? "dock-hidden" : ""} ${kt && He ? "is-playing-dimmed" : ""}`,
              ref: Lt,
              onMouseEnter: () => Gs(!0),
              onMouseLeave: () => {
                Gs(!1), kt && ms();
              },
              children: [
                kt && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: yn(X - L) })
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
                      playheadMs: rt,
                      setPlayheadMs: xt,
                      inPointMs: L,
                      setInPointMs: ne,
                      outPointMs: X,
                      setOutPointMs: ee,
                      activeStationId: C,
                      isPlaying: He,
                      setIsPlaying: dn,
                      isLooping: Gt,
                      setIsLooping: Kt,
                      playbackSpeed: vt,
                      onChangeSpeed: Ot,
                      onSetInPoint: () => ne(Math.max(0, Math.min(rt, X - 1e3))),
                      onSetOutPoint: () => ee(Math.min(p, Math.max(rt, L + 1e3))),
                      onStepFrameBackward: () => {
                        Fe(!1), xt((T) => Math.max(0, T - 33));
                      },
                      onStepFrameForward: () => {
                        Fe(!1), xt((T) => Math.min(p, T + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: Ct(f + rt, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  zp,
                  {
                    stations: js,
                    activeStationId: C,
                    onSelectActiveStation: (T) => wn(y.length <= 1 ? T : T === C ? null : T),
                    onStationContextMenu: ge,
                    onDeselectStation: Ye,
                    stationAutoDirectorMap: je,
                    onToggleStationAutoDirector: Xe,
                    baseEpochMs: f,
                    timeMode: r,
                    totalDurationMs: p,
                    zoomLevel: De,
                    onZoomChange: Le,
                    onZoomReset: st,
                    onFitRange: K,
                    onJumpViewportTo: fe,
                    playheadMs: rt,
                    setPlayheadMs: xt,
                    inPointMs: L,
                    setInPointMs: ne,
                    outPointMs: X,
                    setOutPointMs: ee,
                    viewportStartMs: nt,
                    onViewportStartChange: ce,
                    onExport: Ls,
                    recordingSegments: J,
                    movieBoundaries: qe,
                    onEstimateLoaded: (T) => (T == null ? void 0 : T.removedGlobalGaps) && M(T.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: an,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((T) => !T),
                    onSplitDirectorSegment: rs,
                    onChangeDirectorSegmentDisplay: ls,
                    onResetDirectorSegmentToAuto: Xs,
                    audioRoutingPlan: Dt,
                    onSplitAudioSegment: Rs,
                    onChangeAudioSegmentStation: Ys,
                    onChangeAudioSegmentGain: Zt,
                    onFollowVisualFeed: $n,
                    isAutoFollowAudio: R,
                    canvasLayoutTimeline: Oe,
                    activeKfIndex: Be,
                    onSelectKeyframe: (T, re) => {
                      be(T), xt(Math.max(0, re - f));
                    },
                    onAddKeyframeAtEpoch: Ie,
                    onDeleteKeyframe: at,
                    onUpdateKeyframeEpoch: ie,
                    onUpdateKeyframeTransition: et,
                    onToggleDisplayOnCanvas: lt,
                    onUpdateAudioPlan: H
                  }
                )
              ]
            }
          )
        ] }),
        !kt && /* @__PURE__ */ s.jsx(
          Vx,
          {
            isOpen: Nt || fn,
            onToggle: () => wt(!Nt),
            onClose: () => wt(!1),
            allStations: Q,
            selectedStationIds: y,
            onToggleStation: (T) => S((re) => re.includes(T) ? re.filter((F) => F !== T) : [...re, T]),
            onUpdateSelections: S,
            isInitialSetup: fn,
            isLoadingStations: de,
            recordingSegments: J,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (_(null), g(null), Tt(!0), wt(!1));
            },
            onOpenRangeModal: () => Ue(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      Gx,
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
      Jx,
      {
        isOpen: Je,
        onClose: () => it(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: f,
          timelineBaseEpochMs: f,
          playheadMs: rt,
          inPointMs: L,
          outPointMs: X,
          selectedStationIds: y,
          selectedStationNames: Q.filter((T) => y.includes(T.id)).map((T) => T.displayName || T.hostname || T.id),
          allStationIds: Q.map((T) => T.id),
          activeStationId: C,
          activeStationName: (_e == null ? void 0 : _e.displayName) || (_e == null ? void 0 : _e.hostname) || null,
          spotlightStationId: w,
          keystrokeMode: o
        },
        onLoadBookmark: Lo
      }
    ),
    /* @__PURE__ */ s.jsx(
      Yp,
      {
        isOpen: ft,
        onClose: () => Ze(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      sy,
      {
        isOpen: $t,
        station: Cr,
        initialDisplayId: x,
        allStations: js,
        onSelectStation: (T) => {
          T !== w && Ot(1), _(T), g(T);
        },
        onClose: $s,
        baseEpochMs: f,
        timeMode: r,
        totalDurationMs: p,
        zoomLevel: De,
        onZoomChange: Le,
        onZoomReset: st,
        onFitRange: K,
        onJumpViewportTo: fe,
        viewportStartMs: nt,
        onViewportStartChange: ce,
        playheadMs: rt,
        setPlayheadMs: xt,
        playheadEpochMs: cn,
        inPointMs: L,
        setInPointMs: ne,
        outPointMs: X,
        setOutPointMs: ee,
        recordingSegments: J,
        globalGaps: j,
        isPlaying: He,
        setIsPlaying: Fe,
        isLooping: Gt,
        setIsLooping: Kt,
        playbackSpeed: vt,
        setPlaybackSpeed: Ot,
        onExport: Ls,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: an,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((T) => !T),
        directorPlan: Cr == null ? void 0 : Cr.directorPlan,
        onOverrideDisplay: ls,
        onSplitDirectorSegment: rs,
        onChangeDirectorSegmentDisplay: ls,
        onResetDirectorSegmentToAuto: Xs
      }
    ),
    /* @__PURE__ */ s.jsx(
      ry,
      {
        menu: k,
        onClose: () => N(null),
        onDeselect: Ye,
        onFocusSolo: wn
      }
    ),
    /* @__PURE__ */ s.jsx(
      ly,
      {
        isOpen: te,
        onClose: () => Z(!1),
        onConfirm: vn,
        compositionSummary: {
          scope: P,
          layout: (Y == null ? void 0 : Y.preset) || $,
          isPipSwapped: b,
          isAutoDirectorEnabled: se,
          stationsCount: Ge.length,
          audioSegmentsCount: ((Rl = Dt == null ? void 0 : Dt.segments) == null ? void 0 : Rl.length) || 1,
          resolution: (Oe == null ? void 0 : Oe.resolution) || "NATIVE",
          canvasWidth: (Y == null ? void 0 : Y.width) || 1920,
          canvasHeight: (Y == null ? void 0 : Y.height) || 1080
        }
      }
    ),
    /* @__PURE__ */ s.jsx(Xp, {})
  ] });
}
const gh = "itb-extractor-advanced-theme", xh = "itb-global-export-job-monitor-root";
function Gp() {
  if (!(typeof document > "u") && !document.getElementById(gh)) {
    const e = document.createElement("link");
    e.id = gh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
Gp();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(xh);
  if (!t) {
    t = document.createElement("div"), t.id = xh, document.body.appendChild(t);
    try {
      ya.createRoot(t).render(So.createElement(Xp, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function hy(e, t = {}) {
  Gp();
  const n = ya.createRoot(e);
  return n.render(So.createElement(dy, t)), () => {
    n.unmount();
  };
}
export {
  Xp as ExportJobMonitor,
  dy as ExtractorAdvancedStudio,
  dy as default,
  hy as mount
};
