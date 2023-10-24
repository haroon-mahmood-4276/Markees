/*!
 * TinyMCE
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 6.4.1
 */
! function () {
    "use strict";
    const e = Object.getPrototypeOf,
        t = (e, t, o) => {
            var n;
            return !!o(e, t.prototype) || (null === (n = e.constructor) || void 0 === n ? void 0 : n.name) === t.name
        },
        o = e => o => (e => {
            const o = typeof e;
            return null === e ? "null" : "object" === o && Array.isArray(e) ? "array" : "object" === o && t(e, String, ((e, t) => t.isPrototypeOf(e))) ? "string" : o
        })(o) === e,
        n = e => t => typeof t === e,
        r = e => t => e === t,
        s = o("string"),
        a = o("object"),
        i = o => ((o, n) => a(o) && t(o, n, ((t, o) => e(t) === o)))(o, Object),
        l = o("array"),
        c = r(null),
        d = n("boolean"),
        u = r(void 0),
        m = e => null == e,
        g = e => !m(e),
        p = n("function"),
        h = n("number"),
        f = (e, t) => {
            if (l(e)) {
                for (let o = 0, n = e.length; o < n; ++o)
                    if (!t(e[o])) return !1;
                return !0
            }
            return !1
        },
        b = () => {},
        v = e => () => e(),
        y = (e, t) => (...o) => e(t.apply(null, o)),
        x = e => () => e,
        w = e => e,
        S = (e, t) => e === t;

    function k(e, ...t) {
        return (...o) => {
            const n = t.concat(o);
            return e.apply(null, n)
        }
    }
    const C = e => t => !e(t),
        O = e => () => {
            throw new Error(e)
        },
        _ = e => e(),
        T = x(!1),
        E = x(!0);
    class A {
        constructor(e, t) {
            this.tag = e, this.value = t
        }
        static some(e) {
            return new A(!0, e)
        }
        static none() {
            return A.singletonNone
        }
        fold(e, t) {
            return this.tag ? t(this.value) : e()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(e) {
            return this.tag ? A.some(e(this.value)) : A.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : A.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : A.none()
        }
        getOr(e) {
            return this.tag ? this.value : e
        }
        or(e) {
            return this.tag ? this : e
        }
        getOrThunk(e) {
            return this.tag ? this.value : e()
        }
        orThunk(e) {
            return this.tag ? this : e()
        }
        getOrDie(e) {
            if (this.tag) return this.value;
            throw new Error(null != e ? e : "Called getOrDie on None")
        }
        static from(e) {
            return g(e) ? A.some(e) : A.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(e) {
            this.tag && e(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    A.singletonNone = new A(!1);
    const M = Array.prototype.slice,
        D = Array.prototype.indexOf,
        B = Array.prototype.push,
        F = (e, t) => D.call(e, t),
        I = (e, t) => {
            const o = F(e, t);
            return -1 === o ? A.none() : A.some(o)
        },
        R = (e, t) => F(e, t) > -1,
        N = (e, t) => {
            for (let o = 0, n = e.length; o < n; o++)
                if (t(e[o], o)) return !0;
            return !1
        },
        V = (e, t) => {
            const o = [];
            for (let n = 0; n < e; n++) o.push(t(n));
            return o
        },
        z = (e, t) => {
            const o = [];
            for (let n = 0; n < e.length; n += t) {
                const r = M.call(e, n, n + t);
                o.push(r)
            }
            return o
        },
        H = (e, t) => {
            const o = e.length,
                n = new Array(o);
            for (let r = 0; r < o; r++) {
                const o = e[r];
                n[r] = t(o, r)
            }
            return n
        },
        L = (e, t) => {
            for (let o = 0, n = e.length; o < n; o++) t(e[o], o)
        },
        P = (e, t) => {
            const o = [],
                n = [];
            for (let r = 0, s = e.length; r < s; r++) {
                const s = e[r];
                (t(s, r) ? o : n).push(s)
            }
            return {
                pass: o,
                fail: n
            }
        },
        U = (e, t) => {
            const o = [];
            for (let n = 0, r = e.length; n < r; n++) {
                const r = e[n];
                t(r, n) && o.push(r)
            }
            return o
        },
        W = (e, t, o) => (((e, t) => {
            for (let o = e.length - 1; o >= 0; o--) t(e[o], o)
        })(e, ((e, n) => {
            o = t(o, e, n)
        })), o),
        j = (e, t, o) => (L(e, ((e, n) => {
            o = t(o, e, n)
        })), o),
        G = (e, t) => ((e, t, o) => {
            for (let n = 0, r = e.length; n < r; n++) {
                const r = e[n];
                if (t(r, n)) return A.some(r);
                if (o(r, n)) break
            }
            return A.none()
        })(e, t, T),
        $ = (e, t) => {
            for (let o = 0, n = e.length; o < n; o++)
                if (t(e[o], o)) return A.some(o);
            return A.none()
        },
        q = e => {
            const t = [];
            for (let o = 0, n = e.length; o < n; ++o) {
                if (!l(e[o])) throw new Error("Arr.flatten item " + o + " was not an array, input: " + e);
                B.apply(t, e[o])
            }
            return t
        },
        X = (e, t) => q(H(e, t)),
        K = (e, t) => {
            for (let o = 0, n = e.length; o < n; ++o)
                if (!0 !== t(e[o], o)) return !1;
            return !0
        },
        Y = e => {
            const t = M.call(e, 0);
            return t.reverse(), t
        },
        J = (e, t) => U(e, (e => !R(t, e))),
        Z = (e, t) => {
            const o = {};
            for (let n = 0, r = e.length; n < r; n++) {
                const r = e[n];
                o[String(r)] = t(r, n)
            }
            return o
        },
        Q = e => [e],
        ee = (e, t) => {
            const o = M.call(e, 0);
            return o.sort(t), o
        },
        te = (e, t) => t >= 0 && t < e.length ? A.some(e[t]) : A.none(),
        oe = e => te(e, 0),
        ne = e => te(e, e.length - 1),
        re = p(Array.from) ? Array.from : e => M.call(e),
        se = (e, t) => {
            for (let o = 0; o < e.length; o++) {
                const n = t(e[o], o);
                if (n.isSome()) return n
            }
            return A.none()
        },
        ae = Object.keys,
        ie = Object.hasOwnProperty,
        le = (e, t) => {
            const o = ae(e);
            for (let n = 0, r = o.length; n < r; n++) {
                const r = o[n];
                t(e[r], r)
            }
        },
        ce = (e, t) => de(e, ((e, o) => ({
            k: o,
            v: t(e, o)
        }))),
        de = (e, t) => {
            const o = {};
            return le(e, ((e, n) => {
                const r = t(e, n);
                o[r.k] = r.v
            })), o
        },
        ue = e => (t, o) => {
            e[o] = t
        },
        me = (e, t, o, n) => {
            le(e, ((e, r) => {
                (t(e, r) ? o : n)(e, r)
            }))
        },
        ge = (e, t) => {
            const o = {};
            return me(e, t, ue(o), b), o
        },
        pe = (e, t) => {
            const o = [];
            return le(e, ((e, n) => {
                o.push(t(e, n))
            })), o
        },
        he = (e, t) => {
            const o = ae(e);
            for (let n = 0, r = o.length; n < r; n++) {
                const r = o[n],
                    s = e[r];
                if (t(s, r, e)) return A.some(s)
            }
            return A.none()
        },
        fe = e => pe(e, w),
        be = (e, t) => ve(e, t) ? A.from(e[t]) : A.none(),
        ve = (e, t) => ie.call(e, t),
        ye = (e, t) => ve(e, t) && void 0 !== e[t] && null !== e[t],
        xe = (e, t, o = S) => e.exists((e => o(e, t))),
        we = e => {
            const t = [],
                o = e => {
                    t.push(e)
                };
            for (let t = 0; t < e.length; t++) e[t].each(o);
            return t
        },
        Se = (e, t, o) => e.isSome() && t.isSome() ? A.some(o(e.getOrDie(), t.getOrDie())) : A.none(),
        ke = (e, t) => null != e ? A.some(t(e)) : A.none(),
        Ce = (e, t) => e ? A.some(t) : A.none(),
        Oe = (e, t, o) => "" === t || e.length >= t.length && e.substr(o, o + t.length) === t,
        _e = (e, t) => Ee(e, t) ? ((e, t) => e.substring(t))(e, t.length) : e,
        Te = (e, t, o = 0, n) => {
            const r = e.indexOf(t, o);
            return -1 !== r && (!!u(n) || r + t.length <= n)
        },
        Ee = (e, t) => Oe(e, t, 0),
        Ae = (e, t) => Oe(e, t, e.length - t.length),
        Me = (Ao = /^\s+|\s+$/g, e => e.replace(Ao, "")),
        De = e => e.length > 0,
        Be = e => void 0 !== e.style && p(e.style.getPropertyValue),
        Fe = e => {
            if (null == e) throw new Error("Node cannot be null or undefined");
            return {
                dom: e
            }
        },
        Ie = (e, t) => {
            const o = (t || document).createElement("div");
            if (o.innerHTML = e, !o.hasChildNodes() || o.childNodes.length > 1) {
                const t = "HTML does not have a single root node";
                throw console.error(t, e), new Error(t)
            }
            return Fe(o.childNodes[0])
        },
        Re = (e, t) => {
            const o = (t || document).createElement(e);
            return Fe(o)
        },
        Ne = (e, t) => {
            const o = (t || document).createTextNode(e);
            return Fe(o)
        },
        Ve = Fe,
        ze = "undefined" != typeof window ? window : Function("return this;")(),
        He = (e, t) => ((e, t) => {
            let o = null != t ? t : ze;
            for (let t = 0; t < e.length && null != o; ++t) o = o[e[t]];
            return o
        })(e.split("."), t),
        Le = Object.getPrototypeOf,
        Pe = e => {
            const t = He("ownerDocument.defaultView", e);
            return a(e) && ((e => ((e, t) => {
                const o = ((e, t) => He(e, t))(e, t);
                if (null == o) throw new Error(e + " not available on this browser");
                return o
            })("HTMLElement", e))(t).prototype.isPrototypeOf(e) || /^HTML\w*Element$/.test(Le(e).constructor.name))
        },
        Ue = e => e.dom.nodeName.toLowerCase(),
        We = e => t => (e => e.dom.nodeType)(t) === e,
        je = e => Ge(e) && Pe(e.dom),
        Ge = We(1),
        $e = We(3),
        qe = We(9),
        Xe = We(11),
        Ke = e => t => Ge(t) && Ue(t) === e,
        Ye = (e, t) => {
            const o = e.dom;
            if (1 !== o.nodeType) return !1; {
                const e = o;
                if (void 0 !== e.matches) return e.matches(t);
                if (void 0 !== e.msMatchesSelector) return e.msMatchesSelector(t);
                if (void 0 !== e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
                if (void 0 !== e.mozMatchesSelector) return e.mozMatchesSelector(t);
                throw new Error("Browser lacks native selectors")
            }
        },
        Je = e => 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount,
        Ze = (e, t) => e.dom === t.dom,
        Qe = (e, t) => {
            const o = e.dom,
                n = t.dom;
            return o !== n && o.contains(n)
        },
        et = e => Ve(e.dom.ownerDocument),
        tt = e => qe(e) ? e : et(e),
        ot = e => Ve(tt(e).dom.documentElement),
        nt = e => Ve(tt(e).dom.defaultView),
        rt = e => A.from(e.dom.parentNode).map(Ve),
        st = e => A.from(e.dom.parentElement).map(Ve),
        at = e => A.from(e.dom.offsetParent).map(Ve),
        it = e => H(e.dom.childNodes, Ve),
        lt = (e, t) => {
            const o = e.dom.childNodes;
            return A.from(o[t]).map(Ve)
        },
        ct = e => lt(e, 0),
        dt = (e, t) => ({
            element: e,
            offset: t
        }),
        ut = (e, t) => {
            const o = it(e);
            return o.length > 0 && t < o.length ? dt(o[t], 0) : dt(e, t)
        },
        mt = e => Xe(e) && g(e.dom.host),
        gt = p(Element.prototype.attachShadow) && p(Node.prototype.getRootNode),
        pt = x(gt),
        ht = gt ? e => Ve(e.dom.getRootNode()) : tt,
        ft = e => mt(e) ? e : Ve(tt(e).dom.body),
        bt = e => {
            const t = ht(e);
            return mt(t) ? A.some(t) : A.none()
        },
        vt = e => Ve(e.dom.host),
        yt = e => {
            const t = $e(e) ? e.dom.parentNode : e.dom;
            if (null == t || null === t.ownerDocument) return !1;
            const o = t.ownerDocument;
            return bt(Ve(t)).fold((() => o.body.contains(t)), (n = yt, r = vt, e => n(r(e))));
            var n, r
        },
        xt = () => wt(Ve(document)),
        wt = e => {
            const t = e.dom.body;
            if (null == t) throw new Error("Body is not available yet");
            return Ve(t)
        },
        St = (e, t, o) => {
            if (!(s(o) || d(o) || h(o))) throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", o, ":: Element ", e), new Error("Attribute value was not simple");
            e.setAttribute(t, o + "")
        },
        kt = (e, t, o) => {
            St(e.dom, t, o)
        },
        Ct = (e, t) => {
            const o = e.dom;
            le(t, ((e, t) => {
                St(o, t, e)
            }))
        },
        Ot = (e, t) => {
            const o = e.dom.getAttribute(t);
            return null === o ? void 0 : o
        },
        _t = (e, t) => A.from(Ot(e, t)),
        Tt = (e, t) => {
            const o = e.dom;
            return !(!o || !o.hasAttribute) && o.hasAttribute(t)
        },
        Et = (e, t) => {
            e.dom.removeAttribute(t)
        },
        At = (e, t, o) => {
            if (!s(o)) throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", o, ":: Element ", e), new Error("CSS value must be a string: " + o);
            Be(e) && e.style.setProperty(t, o)
        },
        Mt = (e, t) => {
            Be(e) && e.style.removeProperty(t)
        },
        Dt = (e, t, o) => {
            const n = e.dom;
            At(n, t, o)
        },
        Bt = (e, t) => {
            const o = e.dom;
            le(t, ((e, t) => {
                At(o, t, e)
            }))
        },
        Ft = (e, t) => {
            const o = e.dom;
            le(t, ((e, t) => {
                e.fold((() => {
                    Mt(o, t)
                }), (e => {
                    At(o, t, e)
                }))
            }))
        },
        It = (e, t) => {
            const o = e.dom,
                n = window.getComputedStyle(o).getPropertyValue(t);
            return "" !== n || yt(e) ? n : Rt(o, t)
        },
        Rt = (e, t) => Be(e) ? e.style.getPropertyValue(t) : "",
        Nt = (e, t) => {
            const o = e.dom,
                n = Rt(o, t);
            return A.from(n).filter((e => e.length > 0))
        },
        Vt = e => {
            const t = {},
                o = e.dom;
            if (Be(o))
                for (let e = 0; e < o.style.length; e++) {
                    const n = o.style.item(e);
                    t[n] = o.style[n]
                }
            return t
        },
        zt = (e, t, o) => {
            const n = Re(e);
            return Dt(n, t, o), Nt(n, t).isSome()
        },
        Ht = (e, t) => {
            const o = e.dom;
            Mt(o, t), xe(_t(e, "style").map(Me), "") && Et(e, "style")
        },
        Lt = e => e.dom.offsetWidth,
        Pt = (e, t) => {
            const o = o => {
                    const n = t(o);
                    if (n <= 0 || null === n) {
                        const t = It(o, e);
                        return parseFloat(t) || 0
                    }
                    return n
                },
                n = (e, t) => j(t, ((t, o) => {
                    const n = It(e, o),
                        r = void 0 === n ? 0 : parseInt(n, 10);
                    return isNaN(r) ? t : t + r
                }), 0);
            return {
                set: (t, o) => {
                    if (!h(o) && !o.match(/^[0-9]+$/)) throw new Error(e + ".set accepts only positive integer values. Value was " + o);
                    const n = t.dom;
                    Be(n) && (n.style[e] = o + "px")
                },
                get: o,
                getOuter: o,
                aggregate: n,
                max: (e, t, o) => {
                    const r = n(e, o);
                    return t > r ? t - r : 0
                }
            }
        },
        Ut = Pt("height", (e => {
            const t = e.dom;
            return yt(e) ? t.getBoundingClientRect().height : t.offsetHeight
        })),
        Wt = e => Ut.get(e),
        jt = e => Ut.getOuter(e),
        Gt = (e, t) => ({
            left: e,
            top: t,
            translate: (o, n) => Gt(e + o, t + n)
        }),
        $t = Gt,
        qt = (e, t) => void 0 !== e ? e : void 0 !== t ? t : 0,
        Xt = e => {
            const t = e.dom.ownerDocument,
                o = t.body,
                n = t.defaultView,
                r = t.documentElement;
            if (o === e.dom) return $t(o.offsetLeft, o.offsetTop);
            const s = qt(null == n ? void 0 : n.pageYOffset, r.scrollTop),
                a = qt(null == n ? void 0 : n.pageXOffset, r.scrollLeft),
                i = qt(r.clientTop, o.clientTop),
                l = qt(r.clientLeft, o.clientLeft);
            return Kt(e).translate(a - l, s - i)
        },
        Kt = e => {
            const t = e.dom,
                o = t.ownerDocument.body;
            return o === t ? $t(o.offsetLeft, o.offsetTop) : yt(e) ? (e => {
                const t = e.getBoundingClientRect();
                return $t(t.left, t.top)
            })(t) : $t(0, 0)
        },
        Yt = Pt("width", (e => e.dom.offsetWidth)),
        Jt = e => Yt.get(e),
        Zt = e => Yt.getOuter(e),
        Qt = e => {
            let t, o = !1;
            return (...n) => (o || (o = !0, t = e.apply(null, n)), t)
        },
        eo = () => to(0, 0),
        to = (e, t) => ({
            major: e,
            minor: t
        }),
        oo = {
            nu: to,
            detect: (e, t) => {
                const o = String(t).toLowerCase();
                return 0 === e.length ? eo() : ((e, t) => {
                    const o = ((e, t) => {
                        for (let o = 0; o < e.length; o++) {
                            const n = e[o];
                            if (n.test(t)) return n
                        }
                    })(e, t);
                    if (!o) return {
                        major: 0,
                        minor: 0
                    };
                    const n = e => Number(t.replace(o, "$" + e));
                    return to(n(1), n(2))
                })(e, o)
            },
            unknown: eo
        },
        no = (e, t) => {
            const o = String(t).toLowerCase();
            return G(e, (e => e.search(o)))
        },
        ro = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        so = e => t => Te(t, e),
        ao = [{
            name: "Edge",
            versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
            search: e => Te(e, "edge/") && Te(e, "chrome") && Te(e, "safari") && Te(e, "applewebkit")
        }, {
            name: "Chromium",
            brand: "Chromium",
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, ro],
            search: e => Te(e, "chrome") && !Te(e, "chromeframe")
        }, {
            name: "IE",
            versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
            search: e => Te(e, "msie") || Te(e, "trident")
        }, {
            name: "Opera",
            versionRegexes: [ro, /.*?opera\/([0-9]+)\.([0-9]+).*/],
            search: so("opera")
        }, {
            name: "Firefox",
            versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
            search: so("firefox")
        }, {
            name: "Safari",
            versionRegexes: [ro, /.*?cpu os ([0-9]+)_([0-9]+).*/],
            search: e => (Te(e, "safari") || Te(e, "mobile/")) && Te(e, "applewebkit")
        }],
        io = [{
            name: "Windows",
            search: so("win"),
            versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "iOS",
            search: e => Te(e, "iphone") || Te(e, "ipad"),
            versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
        }, {
            name: "Android",
            search: so("android"),
            versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "macOS",
            search: so("mac os x"),
            versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
        }, {
            name: "Linux",
            search: so("linux"),
            versionRegexes: []
        }, {
            name: "Solaris",
            search: so("sunos"),
            versionRegexes: []
        }, {
            name: "FreeBSD",
            search: so("freebsd"),
            versionRegexes: []
        }, {
            name: "ChromeOS",
            search: so("cros"),
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
        }],
        lo = {
            browsers: x(ao),
            oses: x(io)
        },
        co = "Edge",
        uo = "Chromium",
        mo = "Opera",
        go = "Firefox",
        po = "Safari",
        ho = e => {
            const t = e.current,
                o = e.version,
                n = e => () => t === e;
            return {
                current: t,
                version: o,
                isEdge: n(co),
                isChromium: n(uo),
                isIE: n("IE"),
                isOpera: n(mo),
                isFirefox: n(go),
                isSafari: n(po)
            }
        },
        fo = () => ho({
            current: void 0,
            version: oo.unknown()
        }),
        bo = ho,
        vo = (x(co), x(uo), x("IE"), x(mo), x(go), x(po), "Windows"),
        yo = "Android",
        xo = "Linux",
        wo = "macOS",
        So = "Solaris",
        ko = "FreeBSD",
        Co = "ChromeOS",
        Oo = e => {
            const t = e.current,
                o = e.version,
                n = e => () => t === e;
            return {
                current: t,
                version: o,
                isWindows: n(vo),
                isiOS: n("iOS"),
                isAndroid: n(yo),
                isMacOS: n(wo),
                isLinux: n(xo),
                isSolaris: n(So),
                isFreeBSD: n(ko),
                isChromeOS: n(Co)
            }
        },
        _o = () => Oo({
            current: void 0,
            version: oo.unknown()
        }),
        To = Oo,
        Eo = (x(vo), x("iOS"), x(yo), x(xo), x(wo), x(So), x(ko), x(Co), e => window.matchMedia(e).matches);
    var Ao;
    let Mo = Qt((() => ((e, t, o) => {
        const n = lo.browsers(),
            r = lo.oses(),
            s = t.bind((e => ((e, t) => se(t.brands, (t => {
                const o = t.brand.toLowerCase();
                return G(e, (e => {
                    var t;
                    return o === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
                })).map((e => ({
                    current: e.name,
                    version: oo.nu(parseInt(t.version, 10), 0)
                })))
            })))(n, e))).orThunk((() => ((e, t) => no(e, t).map((e => {
                const o = oo.detect(e.versionRegexes, t);
                return {
                    current: e.name,
                    version: o
                }
            })))(n, e))).fold(fo, bo),
            a = ((e, t) => no(e, t).map((e => {
                const o = oo.detect(e.versionRegexes, t);
                return {
                    current: e.name,
                    version: o
                }
            })))(r, e).fold(_o, To),
            i = ((e, t, o, n) => {
                const r = e.isiOS() && !0 === /ipad/i.test(o),
                    s = e.isiOS() && !r,
                    a = e.isiOS() || e.isAndroid(),
                    i = a || n("(pointer:coarse)"),
                    l = r || !s && a && n("(min-device-width:768px)"),
                    c = s || a && !l,
                    d = t.isSafari() && e.isiOS() && !1 === /safari/i.test(o),
                    u = !c && !l && !d;
                return {
                    isiPad: x(r),
                    isiPhone: x(s),
                    isTablet: x(l),
                    isPhone: x(c),
                    isTouch: x(i),
                    isAndroid: e.isAndroid,
                    isiOS: e.isiOS,
                    isWebView: x(d),
                    isDesktop: x(u)
                }
            })(a, s, e, o);
        return {
            browser: s,
            os: a,
            deviceType: i
        }
    })(navigator.userAgent, A.from(navigator.userAgentData), Eo)));
    const Do = () => Mo(),
        Bo = e => {
            const t = Ve((e => {
                    if (pt() && g(e.target)) {
                        const t = Ve(e.target);
                        if (Ge(t) && (e => g(e.dom.shadowRoot))(t) && e.composed && e.composedPath) {
                            const t = e.composedPath();
                            if (t) return oe(t)
                        }
                    }
                    return A.from(e.target)
                })(e).getOr(e.target)),
                o = () => e.stopPropagation(),
                n = () => e.preventDefault(),
                r = y(n, o);
            return ((e, t, o, n, r, s, a) => ({
                target: e,
                x: t,
                y: o,
                stop: n,
                prevent: r,
                kill: s,
                raw: a
            }))(t, e.clientX, e.clientY, o, n, r, e)
        },
        Fo = (e, t, o, n, r) => {
            const s = ((e, t) => o => {
                e(o) && t(Bo(o))
            })(o, n);
            return e.dom.addEventListener(t, s, r), {
                unbind: k(Io, e, t, s, r)
            }
        },
        Io = (e, t, o, n) => {
            e.dom.removeEventListener(t, o, n)
        },
        Ro = (e, t) => {
            rt(e).each((o => {
                o.dom.insertBefore(t.dom, e.dom)
            }))
        },
        No = (e, t) => {
            const o = (e => A.from(e.dom.nextSibling).map(Ve))(e);
            o.fold((() => {
                rt(e).each((e => {
                    zo(e, t)
                }))
            }), (e => {
                Ro(e, t)
            }))
        },
        Vo = (e, t) => {
            ct(e).fold((() => {
                zo(e, t)
            }), (o => {
                e.dom.insertBefore(t.dom, o.dom)
            }))
        },
        zo = (e, t) => {
            e.dom.appendChild(t.dom)
        },
        Ho = (e, t) => {
            L(t, (t => {
                zo(e, t)
            }))
        },
        Lo = e => {
            e.dom.textContent = "", L(it(e), (e => {
                Po(e)
            }))
        },
        Po = e => {
            const t = e.dom;
            null !== t.parentNode && t.parentNode.removeChild(t)
        },
        Uo = e => {
            const t = void 0 !== e ? e.dom : document,
                o = t.body.scrollLeft || t.documentElement.scrollLeft,
                n = t.body.scrollTop || t.documentElement.scrollTop;
            return $t(o, n)
        },
        Wo = (e, t, o) => {
            const n = (void 0 !== o ? o.dom : document).defaultView;
            n && n.scrollTo(e, t)
        },
        jo = (e, t, o, n) => ({
            x: e,
            y: t,
            width: o,
            height: n,
            right: e + o,
            bottom: t + n
        }),
        Go = e => {
            const t = void 0 === e ? window : e,
                o = t.document,
                n = Uo(Ve(o));
            return (e => {
                const t = void 0 === e ? window : e;
                return Do().browser.isFirefox() ? A.none() : A.from(t.visualViewport)
            })(t).fold((() => {
                const e = t.document.documentElement,
                    o = e.clientWidth,
                    r = e.clientHeight;
                return jo(n.left, n.top, o, r)
            }), (e => jo(Math.max(e.pageLeft, n.left), Math.max(e.pageTop, n.top), e.width, e.height)))
        },
        $o = () => Ve(document),
        qo = (e, t) => e.view(t).fold(x([]), (t => {
            const o = e.owner(t),
                n = qo(e, o);
            return [t].concat(n)
        }));
    var Xo = Object.freeze({
        __proto__: null,
        view: e => {
            var t;
            return (e.dom === document ? A.none() : A.from(null === (t = e.dom.defaultView) || void 0 === t ? void 0 : t.frameElement)).map(Ve)
        },
        owner: e => et(e)
    });
    const Ko = e => {
            const t = $o(),
                o = Uo(t),
                n = ((e, t) => {
                    const o = t.owner(e),
                        n = qo(t, o);
                    return A.some(n)
                })(e, Xo);
            return n.fold(k(Xt, e), (t => {
                const n = Kt(e),
                    r = W(t, ((e, t) => {
                        const o = Kt(t);
                        return {
                            left: e.left + o.left,
                            top: e.top + o.top
                        }
                    }), {
                        left: 0,
                        top: 0
                    });
                return $t(r.left + n.left + o.left, r.top + n.top + o.top)
            }))
        },
        Yo = (e, t, o, n) => ({
            x: e,
            y: t,
            width: o,
            height: n,
            right: e + o,
            bottom: t + n
        }),
        Jo = e => {
            const t = Xt(e),
                o = Zt(e),
                n = jt(e);
            return Yo(t.left, t.top, o, n)
        },
        Zo = e => {
            const t = Ko(e),
                o = Zt(e),
                n = jt(e);
            return Yo(t.left, t.top, o, n)
        },
        Qo = (e, t) => {
            const o = Math.max(e.x, t.x),
                n = Math.max(e.y, t.y),
                r = Math.min(e.right, t.right),
                s = Math.min(e.bottom, t.bottom);
            return Yo(o, n, r - o, s - n)
        },
        en = () => Go(window);
    var tn = tinymce.util.Tools.resolve("tinymce.ThemeManager");
    const on = e => {
            const t = t => t(e),
                o = x(e),
                n = () => r,
                r = {
                    tag: !0,
                    inner: e,
                    fold: (t, o) => o(e),
                    isValue: E,
                    isError: T,
                    map: t => rn.value(t(e)),
                    mapError: n,
                    bind: t,
                    exists: t,
                    forall: t,
                    getOr: o,
                    or: n,
                    getOrThunk: o,
                    orThunk: n,
                    getOrDie: o,
                    each: t => {
                        t(e)
                    },
                    toOptional: () => A.some(e)
                };
            return r
        },
        nn = e => {
            const t = () => o,
                o = {
                    tag: !1,
                    inner: e,
                    fold: (t, o) => t(e),
                    isValue: T,
                    isError: E,
                    map: t,
                    mapError: t => rn.error(t(e)),
                    bind: t,
                    exists: T,
                    forall: E,
                    getOr: w,
                    or: w,
                    getOrThunk: _,
                    orThunk: _,
                    getOrDie: O(String(e)),
                    each: b,
                    toOptional: A.none
                };
            return o
        },
        rn = {
            value: on,
            error: nn,
            fromOption: (e, t) => e.fold((() => nn(t)), on)
        };
    var sn;
    ! function (e) {
        e[e.Error = 0] = "Error", e[e.Value = 1] = "Value"
    }(sn || (sn = {}));
    const an = (e, t, o) => e.stype === sn.Error ? t(e.serror) : o(e.svalue),
        ln = e => ({
            stype: sn.Value,
            svalue: e
        }),
        cn = e => ({
            stype: sn.Error,
            serror: e
        }),
        dn = ln,
        un = cn,
        mn = an,
        gn = (e, t, o, n) => ({
            tag: "field",
            key: e,
            newKey: t,
            presence: o,
            prop: n
        }),
        pn = (e, t, o) => {
            switch (e.tag) {
                case "field":
                    return t(e.key, e.newKey, e.presence, e.prop);
                case "custom":
                    return o(e.newKey, e.instantiator)
            }
        },
        hn = e => (...t) => {
            if (0 === t.length) throw new Error("Can't merge zero objects");
            const o = {};
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                for (const t in r) ve(r, t) && (o[t] = e(o[t], r[t]))
            }
            return o
        },
        fn = hn(((e, t) => i(e) && i(t) ? fn(e, t) : t)),
        bn = hn(((e, t) => t)),
        vn = e => ({
            tag: "defaultedThunk",
            process: e
        }),
        yn = e => vn(x(e)),
        xn = e => ({
            tag: "mergeWithThunk",
            process: e
        }),
        wn = e => {
            const t = (e => {
                const t = [],
                    o = [];
                return L(e, (e => {
                    an(e, (e => o.push(e)), (e => t.push(e)))
                })), {
                    values: t,
                    errors: o
                }
            })(e);
            return t.errors.length > 0 ? (o = t.errors, y(un, q)(o)) : dn(t.values);
            var o
        },
        Sn = e => a(e) && ae(e).length > 100 ? " removed due to size" : JSON.stringify(e, null, 2),
        kn = (e, t) => un([{
            path: e,
            getErrorInfo: t
        }]),
        Cn = e => ({
            extract: (t, o) => ((e, t) => e.stype === sn.Error ? t(e.serror) : e)(e(o), (e => ((e, t) => kn(e, x(t)))(t, e))),
            toString: x("val")
        }),
        On = Cn(dn),
        _n = (e, t, o, n) => n(be(e, t).getOrThunk((() => o(e)))),
        Tn = (e, t, o, n, r) => {
            const s = e => r.extract(t.concat([n]), e),
                a = e => e.fold((() => dn(A.none())), (e => ((e, t) => e.stype === sn.Value ? {
                    stype: sn.Value,
                    svalue: t(e.svalue)
                } : e)(r.extract(t.concat([n]), e), A.some)));
            switch (e.tag) {
                case "required":
                    return ((e, t, o, n) => be(t, o).fold((() => ((e, t, o) => kn(e, (() => 'Could not find valid *required* value for "' + t + '" in ' + Sn(o))))(e, o, t)), n))(t, o, n, s);
                case "defaultedThunk":
                    return _n(o, n, e.process, s);
                case "option":
                    return ((e, t, o) => o(be(e, t)))(o, n, a);
                case "defaultedOptionThunk":
                    return ((e, t, o, n) => n(be(e, t).map((t => !0 === t ? o(e) : t))))(o, n, e.process, a);
                case "mergeWithThunk":
                    return _n(o, n, x({}), (t => {
                        const n = fn(e.process(o), t);
                        return s(n)
                    }))
            }
        },
        En = e => ({
            extract: (t, o) => e().extract(t, o),
            toString: () => e().toString()
        }),
        An = e => ae(ge(e, g)),
        Mn = e => {
            const t = Dn(e),
                o = W(e, ((e, t) => pn(t, (t => fn(e, {
                    [t]: !0
                })), x(e))), {});
            return {
                extract: (e, n) => {
                    const r = d(n) ? [] : An(n),
                        s = U(r, (e => !ye(o, e)));
                    return 0 === s.length ? t.extract(e, n) : ((e, t) => kn(e, (() => "There are unsupported fields: [" + t.join(", ") + "] specified")))(e, s)
                },
                toString: t.toString
            }
        },
        Dn = e => ({
            extract: (t, o) => ((e, t, o) => {
                const n = {},
                    r = [];
                for (const s of o) pn(s, ((o, s, a, i) => {
                    const l = Tn(a, e, t, o, i);
                    mn(l, (e => {
                        r.push(...e)
                    }), (e => {
                        n[s] = e
                    }))
                }), ((e, o) => {
                    n[e] = o(t)
                }));
                return r.length > 0 ? un(r) : dn(n)
            })(t, o, e),
            toString: () => {
                const t = H(e, (e => pn(e, ((e, t, o, n) => e + " -> " + n.toString()), ((e, t) => "state(" + e + ")"))));
                return "obj{\n" + t.join("\n") + "}"
            }
        }),
        Bn = e => ({
            extract: (t, o) => {
                const n = H(o, ((o, n) => e.extract(t.concat(["[" + n + "]"]), o)));
                return wn(n)
            },
            toString: () => "array(" + e.toString() + ")"
        }),
        Fn = (e, t) => {
            const o = void 0 !== t ? t : w;
            return {
                extract: (t, n) => {
                    const r = [];
                    for (const s of e) {
                        const e = s.extract(t, n);
                        if (e.stype === sn.Value) return {
                            stype: sn.Value,
                            svalue: o(e.svalue)
                        };
                        r.push(e)
                    }
                    return wn(r)
                },
                toString: () => "oneOf(" + H(e, (e => e.toString())).join(", ") + ")"
            }
        },
        In = (e, t) => ({
            extract: (o, n) => {
                const r = ae(n),
                    s = ((t, o) => Bn(Cn(e)).extract(t, o))(o, r);
                return ((e, t) => e.stype === sn.Value ? t(e.svalue) : e)(s, (e => {
                    const r = H(e, (e => gn(e, e, {
                        tag: "required",
                        process: {}
                    }, t)));
                    return Dn(r).extract(o, n)
                }))
            },
            toString: () => "setOf(" + t.toString() + ")"
        }),
        Rn = y(Bn, Dn),
        Nn = x(On),
        Vn = (e, t) => Cn((o => {
            const n = typeof o;
            return e(o) ? dn(o) : un(`Expected type: ${t} but got: ${n}`)
        })),
        zn = Vn(h, "number"),
        Hn = Vn(s, "string"),
        Ln = Vn(d, "boolean"),
        Pn = Vn(p, "function"),
        Un = e => {
            if (Object(e) !== e) return !0;
            switch ({}.toString.call(e).slice(8, -1)) {
                case "Boolean":
                case "Number":
                case "String":
                case "Date":
                case "RegExp":
                case "Blob":
                case "FileList":
                case "ImageData":
                case "ImageBitmap":
                case "ArrayBuffer":
                    return !0;
                case "Array":
                case "Object":
                    return Object.keys(e).every((t => Un(e[t])));
                default:
                    return !1
            }
        },
        Wn = Cn((e => Un(e) ? dn(e) : un("Expected value to be acceptable for sending via postMessage"))),
        jn = (e, t) => ({
            extract: (o, n) => be(n, e).fold((() => ((e, t) => kn(e, (() => 'Choice schema did not contain choice key: "' + t + '"')))(o, e)), (e => ((e, t, o, n) => be(o, n).fold((() => ((e, t, o) => kn(e, (() => 'The chosen schema: "' + o + '" did not exist in branches: ' + Sn(t))))(e, o, n)), (o => o.extract(e.concat(["branch: " + n]), t))))(o, n, t, e))),
            toString: () => "chooseOn(" + e + "). Possible values: " + ae(t)
        }),
        Gn = e => Cn((t => e(t).fold(un, dn))),
        $n = (e, t) => In((t => e(t).fold(cn, ln)), t),
        qn = (e, t, o) => {
            return n = ((e, t, o) => ((e, t) => e.stype === sn.Error ? {
                stype: sn.Error,
                serror: t(e.serror)
            } : e)(t.extract([e], o), (e => ({
                input: o,
                errors: e
            }))))(e, t, o), an(n, rn.error, rn.value);
            var n
        },
        Xn = e => e.fold((e => {
            throw new Error(Yn(e))
        }), w),
        Kn = (e, t, o) => Xn(qn(e, t, o)),
        Yn = e => "Errors: \n" + (e => {
            const t = e.length > 10 ? e.slice(0, 10).concat([{
                path: [],
                getErrorInfo: x("... (only showing first ten failures)")
            }]) : e;
            return H(t, (e => "Failed path: (" + e.path.join(" > ") + ")\n" + e.getErrorInfo()))
        })(e.errors).join("\n") + "\n\nInput object: " + Sn(e.input),
        Jn = (e, t) => jn(e, ce(t, Dn)),
        Zn = (e, t) => ((e, t) => {
            const o = Qt(t);
            return {
                extract: (e, t) => o().extract(e, t),
                toString: () => o().toString()
            }
        })(0, t),
        Qn = gn,
        er = (e, t) => ({
            tag: "custom",
            newKey: e,
            instantiator: t
        }),
        tr = e => Gn((t => R(e, t) ? rn.value(t) : rn.error(`Unsupported value: "${t}", choose one of "${e.join(", ")}".`))),
        or = e => Qn(e, e, {
            tag: "required",
            process: {}
        }, Nn()),
        nr = (e, t) => Qn(e, e, {
            tag: "required",
            process: {}
        }, t),
        rr = e => nr(e, zn),
        sr = e => nr(e, Hn),
        ar = (e, t) => Qn(e, e, {
            tag: "required",
            process: {}
        }, tr(t)),
        ir = e => nr(e, Pn),
        lr = (e, t) => Qn(e, e, {
            tag: "required",
            process: {}
        }, Dn(t)),
        cr = (e, t) => Qn(e, e, {
            tag: "required",
            process: {}
        }, Rn(t)),
        dr = (e, t) => Qn(e, e, {
            tag: "required",
            process: {}
        }, Bn(t)),
        ur = e => Qn(e, e, {
            tag: "option",
            process: {}
        }, Nn()),
        mr = (e, t) => Qn(e, e, {
            tag: "option",
            process: {}
        }, t),
        gr = e => mr(e, zn),
        pr = e => mr(e, Hn),
        hr = (e, t) => mr(e, tr(t)),
        fr = e => mr(e, Pn),
        br = (e, t) => mr(e, Bn(t)),
        vr = (e, t) => mr(e, Dn(t)),
        yr = (e, t) => Qn(e, e, yn(t), Nn()),
        xr = (e, t, o) => Qn(e, e, yn(t), o),
        wr = (e, t) => xr(e, t, zn),
        Sr = (e, t) => xr(e, t, Hn),
        kr = (e, t, o) => xr(e, t, tr(o)),
        Cr = (e, t) => xr(e, t, Ln),
        Or = (e, t) => xr(e, t, Pn),
        _r = (e, t, o) => xr(e, t, Bn(o)),
        Tr = (e, t, o) => xr(e, t, Dn(o)),
        Er = e => {
            let t = e;
            return {
                get: () => t,
                set: e => {
                    t = e
                }
            }
        },
        Ar = e => {
            if (!l(e)) throw new Error("cases must be an array");
            if (0 === e.length) throw new Error("there must be at least one case");
            const t = [],
                o = {};
            return L(e, ((n, r) => {
                const s = ae(n);
                if (1 !== s.length) throw new Error("one and only one name per case");
                const a = s[0],
                    i = n[a];
                if (void 0 !== o[a]) throw new Error("duplicate key detected:" + a);
                if ("cata" === a) throw new Error("cannot have a case named cata (sorry)");
                if (!l(i)) throw new Error("case arguments must be an array");
                t.push(a), o[a] = (...o) => {
                    const n = o.length;
                    if (n !== i.length) throw new Error("Wrong number of arguments to case " + a + ". Expected " + i.length + " (" + i + "), got " + n);
                    return {
                        fold: (...t) => {
                            if (t.length !== e.length) throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                            return t[r].apply(null, o)
                        },
                        match: e => {
                            const n = ae(e);
                            if (t.length !== n.length) throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + n.join(","));
                            if (!K(t, (e => R(n, e)))) throw new Error("Not all branches were specified when using match. Specified: " + n.join(", ") + "\nRequired: " + t.join(", "));
                            return e[a].apply(null, o)
                        },
                        log: e => {
                            console.log(e, {
                                constructors: t,
                                constructor: a,
                                params: o
                            })
                        }
                    }
                }
            })), o
        };
    Ar([{
        bothErrors: ["error1", "error2"]
    }, {
        firstError: ["error1", "value2"]
    }, {
        secondError: ["value1", "error2"]
    }, {
        bothValues: ["value1", "value2"]
    }]);
    const Mr = (e, t) => ((e, t) => ({
            [e]: t
        }))(e, t),
        Dr = e => (e => {
            const t = {};
            return L(e, (e => {
                t[e.key] = e.value
            })), t
        })(e),
        Br = e => p(e) ? e : T,
        Fr = (e, t, o) => {
            let n = e.dom;
            const r = Br(o);
            for (; n.parentNode;) {
                n = n.parentNode;
                const e = Ve(n),
                    o = t(e);
                if (o.isSome()) return o;
                if (r(e)) break
            }
            return A.none()
        },
        Ir = (e, t, o) => {
            const n = t(e),
                r = Br(o);
            return n.orThunk((() => r(e) ? A.none() : Fr(e, t, r)))
        },
        Rr = (e, t) => Ze(e.element, t.event.target),
        Nr = {
            can: E,
            abort: T,
            run: b
        },
        Vr = e => {
            if (!ye(e, "can") && !ye(e, "abort") && !ye(e, "run")) throw new Error("EventHandler defined by: " + JSON.stringify(e, null, 2) + " does not have can, abort, or run!");
            return {
                ...Nr,
                ...e
            }
        },
        zr = x,
        Hr = zr("touchstart"),
        Lr = zr("touchmove"),
        Pr = zr("touchend"),
        Ur = zr("touchcancel"),
        Wr = zr("mousedown"),
        jr = zr("mousemove"),
        Gr = zr("mouseout"),
        $r = zr("mouseup"),
        qr = zr("mouseover"),
        Xr = zr("focusin"),
        Kr = zr("focusout"),
        Yr = zr("keydown"),
        Jr = zr("keyup"),
        Zr = zr("input"),
        Qr = zr("change"),
        es = zr("click"),
        ts = zr("transitioncancel"),
        os = zr("transitionend"),
        ns = zr("transitionstart"),
        rs = zr("selectstart"),
        ss = e => x("alloy." + e),
        as = {
            tap: ss("tap")
        },
        is = ss("focus"),
        ls = ss("blur.post"),
        cs = ss("paste.post"),
        ds = ss("receive"),
        us = ss("execute"),
        ms = ss("focus.item"),
        gs = as.tap,
        ps = ss("longpress"),
        hs = ss("sandbox.close"),
        fs = ss("typeahead.cancel"),
        bs = ss("system.init"),
        vs = ss("system.touchmove"),
        ys = ss("system.touchend"),
        xs = ss("system.scroll"),
        ws = ss("system.resize"),
        Ss = ss("system.attached"),
        ks = ss("system.detached"),
        Cs = ss("system.dismissRequested"),
        Os = ss("system.repositionRequested"),
        _s = ss("focusmanager.shifted"),
        Ts = ss("slotcontainer.visibility"),
        Es = ss("system.external.element.scroll"),
        As = ss("change.tab"),
        Ms = ss("dismiss.tab"),
        Ds = ss("highlight"),
        Bs = ss("dehighlight"),
        Fs = (e, t) => {
            Vs(e, e.element, t, {})
        },
        Is = (e, t, o) => {
            Vs(e, e.element, t, o)
        },
        Rs = e => {
            Fs(e, us())
        },
        Ns = (e, t, o) => {
            Vs(e, t, o, {})
        },
        Vs = (e, t, o, n) => {
            const r = {
                target: t,
                ...n
            };
            e.getSystem().triggerEvent(o, t, r)
        },
        zs = (e, t, o, n) => {
            e.getSystem().triggerEvent(o, t, n.event)
        },
        Hs = e => Dr(e),
        Ls = (e, t) => ({
            key: e,
            value: Vr({
                abort: t
            })
        }),
        Ps = e => ({
            key: e,
            value: Vr({
                run: (e, t) => {
                    t.event.prevent()
                }
            })
        }),
        Us = (e, t) => ({
            key: e,
            value: Vr({
                run: t
            })
        }),
        Ws = (e, t, o) => ({
            key: e,
            value: Vr({
                run: (e, n) => {
                    t.apply(void 0, [e, n].concat(o))
                }
            })
        }),
        js = e => t => ({
            key: e,
            value: Vr({
                run: (e, o) => {
                    Rr(e, o) && t(e, o)
                }
            })
        }),
        Gs = (e, t, o) => ((e, t) => Us(e, ((o, n) => {
            o.getSystem().getByUid(t).each((t => {
                zs(t, t.element, e, n)
            }))
        })))(e, t.partUids[o]),
        $s = (e, t) => Us(e, ((e, o) => {
            const n = o.event,
                r = e.getSystem().getByDom(n.target).getOrThunk((() => Ir(n.target, (t => e.getSystem().getByDom(t).toOptional()), T).getOr(e)));
            t(e, r, o)
        })),
        qs = e => Us(e, ((e, t) => {
            t.cut()
        })),
        Xs = e => Us(e, ((e, t) => {
            t.stop()
        })),
        Ks = (e, t) => js(e)(t),
        Ys = js(Ss()),
        Js = js(ks()),
        Zs = js(bs()),
        Qs = (sa = us(), e => Us(sa, e)),
        ea = e => e.dom.innerHTML,
        ta = (e, t) => {
            const o = et(e).dom,
                n = Ve(o.createDocumentFragment()),
                r = ((e, t) => {
                    const o = (t || document).createElement("div");
                    return o.innerHTML = e, it(Ve(o))
                })(t, o);
            Ho(n, r), Lo(e), zo(e, n)
        },
        oa = e => mt(e) ? "#shadow-root" : (e => {
            const t = Re("div"),
                o = Ve(e.dom.cloneNode(!0));
            return zo(t, o), ea(t)
        })((e => ((e, t) => Ve(e.dom.cloneNode(!1)))(e))(e)),
        na = e => oa(e),
        ra = Hs([((e, t) => ({
            key: e,
            value: Vr({
                can: (e, t) => {
                    const o = t.event,
                        n = o.originator,
                        r = o.target;
                    return !((e, t, o) => Ze(t, e.element) && !Ze(t, o))(e, n, r) || (console.warn(is() + " did not get interpreted by the desired target. \nOriginator: " + na(n) + "\nTarget: " + na(r) + "\nCheck the " + is() + " event handlers"), !1)
                }
            })
        }))(is())]);
    var sa, aa = Object.freeze({
        __proto__: null,
        events: ra
    });
    let ia = 0;
    const la = e => {
            const t = (new Date).getTime(),
                o = Math.floor(1e9 * Math.random());
            return ia++, e + "_" + o + ia + String(t)
        },
        ca = x("alloy-id-"),
        da = x("data-alloy-id"),
        ua = ca(),
        ma = da(),
        ga = (e, t) => {
            Object.defineProperty(e.dom, ma, {
                value: t,
                writable: !0
            })
        },
        pa = e => {
            const t = Ge(e) ? e.dom[ma] : null;
            return A.from(t)
        },
        ha = e => la(e),
        fa = w,
        ba = e => {
            const t = t => `The component must be in a context to execute: ${t}` + (e ? "\n" + na(e().element) + " is not in context." : ""),
                o = e => () => {
                    throw new Error(t(e))
                },
                n = e => () => {
                    console.warn(t(e))
                };
            return {
                debugInfo: x("fake"),
                triggerEvent: n("triggerEvent"),
                triggerFocus: n("triggerFocus"),
                triggerEscape: n("triggerEscape"),
                broadcast: n("broadcast"),
                broadcastOn: n("broadcastOn"),
                broadcastEvent: n("broadcastEvent"),
                build: o("build"),
                buildOrPatch: o("buildOrPatch"),
                addToWorld: o("addToWorld"),
                removeFromWorld: o("removeFromWorld"),
                addToGui: o("addToGui"),
                removeFromGui: o("removeFromGui"),
                getByUid: o("getByUid"),
                getByDom: o("getByDom"),
                isConnected: T
            }
        },
        va = ba(),
        ya = e => H(e, (e => Ae(e, "/*") ? e.substring(0, e.length - "/*".length) : e)),
        xa = (e, t) => {
            const o = e.toString(),
                n = o.indexOf(")") + 1,
                r = o.indexOf("("),
                s = o.substring(r + 1, n - 1).split(/,\s*/);
            return e.toFunctionAnnotation = () => ({
                name: t,
                parameters: ya(s)
            }), e
        },
        wa = la("alloy-premade"),
        Sa = e => (Object.defineProperty(e.element.dom, wa, {
            value: e.uid,
            writable: !0
        }), Mr(wa, e)),
        ka = e => be(e, wa),
        Ca = e => ((e, t) => {
            const o = t.toString(),
                n = o.indexOf(")") + 1,
                r = o.indexOf("("),
                s = o.substring(r + 1, n - 1).split(/,\s*/);
            return e.toFunctionAnnotation = () => ({
                name: "OVERRIDE",
                parameters: ya(s.slice(1))
            }), e
        })(((t, ...o) => e(t.getApis(), t, ...o)), e),
        Oa = {
            init: () => _a({
                readState: x("No State required")
            })
        },
        _a = e => e,
        Ta = (e, t) => {
            const o = {};
            return le(e, ((e, n) => {
                le(e, ((e, r) => {
                    const s = be(o, r).getOr([]);
                    o[r] = s.concat([t(n, e)])
                }))
            })), o
        },
        Ea = e => ({
            classes: u(e.classes) ? [] : e.classes,
            attributes: u(e.attributes) ? {} : e.attributes,
            styles: u(e.styles) ? {} : e.styles
        }),
        Aa = e => e.cHandler,
        Ma = (e, t) => ({
            name: e,
            handler: t
        }),
        Da = (e, t) => {
            const o = {};
            return L(e, (e => {
                o[e.name()] = e.handlers(t)
            })), o
        },
        Ba = (e, t, o) => {
            const n = t[o];
            return n ? ((e, t, o, n) => {
                try {
                    const t = ee(o, ((t, o) => {
                        const r = t.name,
                            s = o.name,
                            a = n.indexOf(r),
                            i = n.indexOf(s);
                        if (-1 === a) throw new Error("The ordering for " + e + " does not have an entry for " + r + ".\nOrder specified: " + JSON.stringify(n, null, 2));
                        if (-1 === i) throw new Error("The ordering for " + e + " does not have an entry for " + s + ".\nOrder specified: " + JSON.stringify(n, null, 2));
                        return a < i ? -1 : i < a ? 1 : 0
                    }));
                    return rn.value(t)
                } catch (e) {
                    return rn.error([e])
                }
            })("Event: " + o, 0, e, n).map((e => (e => {
                const t = ((e, t) => (...t) => j(e, ((e, o) => e && (e => e.can)(o).apply(void 0, t)), !0))(e),
                    o = ((e, t) => (...t) => j(e, ((e, o) => e || (e => e.abort)(o).apply(void 0, t)), !1))(e);
                return {
                    can: t,
                    abort: o,
                    run: (...t) => {
                        L(e, (e => {
                            e.run.apply(void 0, t)
                        }))
                    }
                }
            })(H(e, (e => e.handler))))) : ((e, t) => rn.error(["The event (" + e + ') has more than one behaviour that listens to it.\nWhen this occurs, you must specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that can trigger it are: ' + JSON.stringify(H(t, (e => e.name)), null, 2)]))(o, e)
        },
        Fa = (e, t) => ((e, t) => {
            const o = (e => {
                const t = [],
                    o = [];
                return L(e, (e => {
                    e.fold((e => {
                        t.push(e)
                    }), (e => {
                        o.push(e)
                    }))
                })), {
                    errors: t,
                    values: o
                }
            })(e);
            return o.errors.length > 0 ? (n = o.errors, rn.error(q(n))) : ((e, t) => 0 === e.length ? rn.value(t) : rn.value(fn(t, bn.apply(void 0, e))))(o.values, t);
            var n
        })(pe(e, ((e, o) => (1 === e.length ? rn.value(e[0].handler) : Ba(e, t, o)).map((n => {
            const r = (e => {
                    const t = (e => p(e) ? {
                        can: E,
                        abort: T,
                        run: e
                    } : e)(e);
                    return (e, o, ...n) => {
                        const r = [e, o].concat(n);
                        t.abort.apply(void 0, r) ? o.stop() : t.can.apply(void 0, r) && t.run.apply(void 0, r)
                    }
                })(n),
                s = e.length > 1 ? U(t[o], (t => N(e, (e => e.name === t)))).join(" > ") : e[0].name;
            return Mr(o, ((e, t) => ({
                handler: e,
                purpose: t
            }))(r, s))
        })))), {}),
        Ia = "alloy.base.behaviour",
        Ra = Dn([Qn("dom", "dom", {
            tag: "required",
            process: {}
        }, Dn([or("tag"), yr("styles", {}), yr("classes", []), yr("attributes", {}), ur("value"), ur("innerHtml")])), or("components"), or("uid"), yr("events", {}), yr("apis", {}), Qn("eventOrder", "eventOrder", (ii = {
            [us()]: ["disabling", Ia, "toggling", "typeaheadevents"],
            [is()]: [Ia, "focusing", "keying"],
            [bs()]: [Ia, "disabling", "toggling", "representing"],
            [Zr()]: [Ia, "representing", "streaming", "invalidating"],
            [ks()]: [Ia, "representing", "item-events", "tooltipping"],
            [Wr()]: ["focusing", Ia, "item-type-events"],
            [Hr()]: ["focusing", Ia, "item-type-events"],
            [qr()]: ["item-type-events", "tooltipping"],
            [ds()]: ["receiving", "reflecting", "tooltipping"]
        }, xn(x(ii))), Nn()), ur("domModification")]),
        Na = e => e.events,
        Va = (e, t) => {
            const o = Ot(e, t);
            return void 0 === o || "" === o ? [] : o.split(" ")
        },
        za = e => void 0 !== e.dom.classList,
        Ha = e => Va(e, "class"),
        La = (e, t) => {
            za(e) ? e.dom.classList.add(t) : ((e, t) => {
                ((e, t, o) => {
                    const n = Va(e, t).concat([o]);
                    kt(e, t, n.join(" "))
                })(e, "class", t)
            })(e, t)
        },
        Pa = (e, t) => {
            za(e) ? e.dom.classList.remove(t) : ((e, t) => {
                ((e, t, o) => {
                    const n = U(Va(e, t), (e => e !== o));
                    n.length > 0 ? kt(e, t, n.join(" ")) : Et(e, t)
                })(e, "class", t)
            })(e, t), (e => {
                0 === (za(e) ? e.dom.classList : Ha(e)).length && Et(e, "class")
            })(e)
        },
        Ua = (e, t) => za(e) && e.dom.classList.contains(t),
        Wa = (e, t) => {
            L(t, (t => {
                La(e, t)
            }))
        },
        ja = (e, t) => {
            L(t, (t => {
                Pa(e, t)
            }))
        },
        Ga = (e, t) => K(t, (t => Ua(e, t))),
        $a = e => e.dom.value,
        qa = (e, t) => {
            if (void 0 === t) throw new Error("Value.set was undefined");
            e.dom.value = t
        },
        Xa = (e, t, o) => {
            o.fold((() => zo(e, t)), (e => {
                Ze(e, t) || (Ro(e, t), Po(e))
            }))
        },
        Ka = (e, t, o) => {
            const n = H(t, o),
                r = it(e);
            return L(r.slice(n.length), Po), n
        },
        Ya = (e, t, o, n) => {
            const r = lt(e, t),
                s = n(o, r),
                a = ((e, t, o) => lt(e, t).map((e => {
                    if (o.exists((t => !Ze(t, e)))) {
                        const t = o.map(Ue).getOr("span"),
                            n = Re(t);
                        return Ro(e, n), n
                    }
                    return e
                })))(e, t, r);
            return Xa(e, s.element, a), s
        },
        Ja = (e, t) => {
            const o = ae(e),
                n = ae(t),
                r = J(n, o),
                s = ((e, o) => {
                    const n = {},
                        r = {};
                    return me(e, ((e, o) => !ve(t, o) || e !== t[o]), ue(n), ue(r)), {
                        t: n,
                        f: r
                    }
                })(e).t;
            return {
                toRemove: r,
                toSet: s
            }
        },
        Za = (e, t) => {
            const {
                class: o,
                style: n,
                ...r
            } = (e => j(e.dom.attributes, ((e, t) => (e[t.name] = t.value, e)), {}))(t), {
                toSet: s,
                toRemove: a
            } = Ja(e.attributes, r), i = Vt(t), {
                toSet: l,
                toRemove: c
            } = Ja(e.styles, i), d = (e => za(e) ? (e => {
                const t = e.dom.classList,
                    o = new Array(t.length);
                for (let e = 0; e < t.length; e++) {
                    const n = t.item(e);
                    null !== n && (o[e] = n)
                }
                return o
            })(e) : Ha(e))(t), u = J(d, e.classes), m = J(e.classes, d);
            return L(a, (e => Et(t, e))), Ct(t, s), Wa(t, m), ja(t, u), L(c, (e => Ht(t, e))), Bt(t, l), e.innerHtml.fold((() => {
                const o = e.domChildren;
                ((e, t) => {
                    Ka(e, t, ((t, o) => {
                        const n = lt(e, o);
                        return Xa(e, t, n), t
                    }))
                })(t, o)
            }), (e => {
                ta(t, e)
            })), (() => {
                const o = t,
                    n = e.value.getOrUndefined();
                n !== $a(o) && qa(o, null != n ? n : "")
            })(), t
        },
        Qa = e => {
            const t = (e => {
                const t = be(e, "behaviours").getOr({});
                return X(ae(t), (e => {
                    const o = t[e];
                    return g(o) ? [o.me] : []
                }))
            })(e);
            return ((e, t) => ((e, t) => {
                const o = H(t, (e => vr(e.name(), [or("config"), yr("state", Oa)]))),
                    n = qn("component.behaviours", Dn(o), e.behaviours).fold((t => {
                        throw new Error(Yn(t) + "\nComplete spec:\n" + JSON.stringify(e, null, 2))
                    }), w);
                return {
                    list: t,
                    data: ce(n, (e => {
                        const t = e.map((e => ({
                            config: e.config,
                            state: e.state.init(e.config)
                        })));
                        return x(t)
                    }))
                }
            })(e, t))(e, t)
        },
        ei = (e, t) => {
            const o = () => m,
                n = Er(va),
                r = Xn((e => qn("custom.definition", Ra, e))(e)),
                s = Qa(e),
                a = (e => e.list)(s),
                i = (e => e.data)(s),
                l = ((e, t, o) => {
                    const n = {
                        ...(r = e).dom,
                        uid: r.uid,
                        domChildren: H(r.components, (e => e.element))
                    };
                    var r;
                    const s = (e => e.domModification.fold((() => Ea({})), Ea))(e),
                        a = {
                            "alloy.base.modification": s
                        },
                        i = t.length > 0 ? ((e, t, o, n) => {
                            const r = {
                                ...t
                            };
                            L(o, (t => {
                                r[t.name()] = t.exhibit(e, n)
                            }));
                            const s = Ta(r, ((e, t) => ({
                                    name: e,
                                    modification: t
                                }))),
                                a = e => W(e, ((e, t) => ({
                                    ...t.modification,
                                    ...e
                                })), {}),
                                i = W(s.classes, ((e, t) => t.modification.concat(e)), []),
                                l = a(s.attributes),
                                c = a(s.styles);
                            return Ea({
                                classes: i,
                                attributes: l,
                                styles: c
                            })
                        })(o, a, t, n) : s;
                    return l = n, c = i, {
                        ...l,
                        attributes: {
                            ...l.attributes,
                            ...c.attributes
                        },
                        styles: {
                            ...l.styles,
                            ...c.styles
                        },
                        classes: l.classes.concat(c.classes)
                    };
                    var l, c
                })(r, a, i),
                c = ((e, t) => {
                    const o = t.filter((t => Ue(t) === e.tag && !(e => e.innerHtml.isSome() && e.domChildren.length > 0)(e) && !(e => ve(e.dom, wa))(t))).bind((t => ((e, t) => {
                        try {
                            const o = Za(e, t);
                            return A.some(o)
                        } catch (e) {
                            return A.none()
                        }
                    })(e, t))).getOrThunk((() => (e => {
                        const t = Re(e.tag);
                        Ct(t, e.attributes), Wa(t, e.classes), Bt(t, e.styles), e.innerHtml.each((e => ta(t, e)));
                        const o = e.domChildren;
                        return Ho(t, o), e.value.each((e => {
                            qa(t, e)
                        })), t
                    })(e)));
                    return ga(o, e.uid), o
                })(l, t),
                d = ((e, t, o) => {
                    const n = {
                        "alloy.base.behaviour": Na(e)
                    };
                    return ((e, t, o, n) => {
                        const r = ((e, t, o) => {
                            const n = {
                                ...o,
                                ...Da(t, e)
                            };
                            return Ta(n, Ma)
                        })(e, o, n);
                        return Fa(r, t)
                    })(o, e.eventOrder, t, n).getOrDie()
                })(r, a, i),
                u = Er(r.components),
                m = {
                    uid: e.uid,
                    getSystem: n.get,
                    config: t => {
                        const o = i;
                        return (p(o[t.name()]) ? o[t.name()] : () => {
                            throw new Error("Could not find " + t.name() + " in " + JSON.stringify(e, null, 2))
                        })()
                    },
                    hasConfigured: e => p(i[e.name()]),
                    spec: e,
                    readState: e => i[e]().map((e => e.state.readState())).getOr("not enabled"),
                    getApis: () => r.apis,
                    connect: e => {
                        n.set(e)
                    },
                    disconnect: () => {
                        n.set(ba(o))
                    },
                    element: c,
                    syncComponents: () => {
                        const e = it(c),
                            t = X(e, (e => n.get().getByDom(e).fold((() => []), Q)));
                        u.set(t)
                    },
                    components: u.get,
                    events: d
                };
            return m
        },
        ti = e => {
            const t = Ne(e);
            return oi({
                element: t
            })
        },
        oi = e => {
            const t = Kn("external.component", Mn([or("element"), ur("uid")]), e),
                o = Er(ba()),
                n = t.uid.getOrThunk((() => ha("external")));
            ga(t.element, n);
            const r = {
                uid: n,
                getSystem: o.get,
                config: A.none,
                hasConfigured: T,
                connect: e => {
                    o.set(e)
                },
                disconnect: () => {
                    o.set(ba((() => r)))
                },
                getApis: () => ({}),
                element: t.element,
                spec: e,
                readState: x("No state"),
                syncComponents: b,
                components: x([]),
                events: {}
            };
            return Sa(r)
        },
        ni = ha,
        ri = (e, t) => ka(e).getOrThunk((() => ((e, t) => {
            const {
                events: o,
                ...n
            } = fa(e), r = ((e, t) => {
                const o = be(e, "components").getOr([]);
                return t.fold((() => H(o, si)), (e => H(o, ((t, o) => ri(t, lt(e, o))))))
            })(n, t), s = {
                ...n,
                events: {
                    ...aa,
                    ...o
                },
                components: r
            };
            return rn.value(ei(s, t))
        })((e => ve(e, "uid"))(e) ? e : {
            uid: ni(""),
            ...e
        }, t).getOrDie())),
        si = e => ri(e, A.none()),
        ai = Sa;
    var ii, li = (e, t, o, n, r) => e(o, n) ? A.some(o) : p(r) && r(o) ? A.none() : t(o, n, r);
    const ci = (e, t, o) => {
            let n = e.dom;
            const r = p(o) ? o : T;
            for (; n.parentNode;) {
                n = n.parentNode;
                const e = Ve(n);
                if (t(e)) return A.some(e);
                if (r(e)) break
            }
            return A.none()
        },
        di = (e, t, o) => li(((e, t) => t(e)), ci, e, t, o),
        ui = (e, t, o) => di(e, t, o).isSome(),
        mi = (e, t, o) => ci(e, (e => Ye(e, t)), o),
        gi = (e, t) => ((e, o) => G(e.dom.childNodes, (e => {
            return o = Ve(e), Ye(o, t);
            var o
        })).map(Ve))(e),
        pi = (e, t) => ((e, t) => {
            const o = void 0 === t ? document : t.dom;
            return Je(o) ? A.none() : A.from(o.querySelector(e)).map(Ve)
        })(t, e),
        hi = (e, t, o) => li(((e, t) => Ye(e, t)), mi, e, t, o),
        fi = "aria-controls",
        bi = () => {
            const e = la(fi);
            return {
                id: e,
                link: t => {
                    kt(t, fi, e)
                },
                unlink: e => {
                    Et(e, fi)
                }
            }
        },
        vi = (e, t) => ui(t, (t => Ze(t, e.element)), T) || ((e, t) => (e => di(e, (e => {
            if (!Ge(e)) return !1;
            const t = Ot(e, "id");
            return void 0 !== t && t.indexOf(fi) > -1
        })).bind((e => {
            const t = Ot(e, "id"),
                o = ht(e);
            return pi(o, `[${fi}="${t}"]`)
        })))(t).exists((t => vi(e, t))))(e, t);
    var yi;
    ! function (e) {
        e[e.STOP = 0] = "STOP", e[e.NORMAL = 1] = "NORMAL", e[e.LOGGING = 2] = "LOGGING"
    }(yi || (yi = {}));
    const xi = Er({}),
        wi = ["alloy/data/Fields", "alloy/debugging/Debugging"],
        Si = (e, t, o) => ((e, t, o) => {
            switch (be(xi.get(), e).orThunk((() => {
                const t = ae(xi.get());
                return se(t, (t => e.indexOf(t) > -1 ? A.some(xi.get()[t]) : A.none()))
            })).getOr(yi.NORMAL)) {
                case yi.NORMAL:
                    return o(ki());
                case yi.LOGGING: {
                    const n = ((e, t) => {
                            const o = [],
                                n = (new Date).getTime();
                            return {
                                logEventCut: (e, t, n) => {
                                    o.push({
                                        outcome: "cut",
                                        target: t,
                                        purpose: n
                                    })
                                },
                                logEventStopped: (e, t, n) => {
                                    o.push({
                                        outcome: "stopped",
                                        target: t,
                                        purpose: n
                                    })
                                },
                                logNoParent: (e, t, n) => {
                                    o.push({
                                        outcome: "no-parent",
                                        target: t,
                                        purpose: n
                                    })
                                },
                                logEventNoHandlers: (e, t) => {
                                    o.push({
                                        outcome: "no-handlers-left",
                                        target: t
                                    })
                                },
                                logEventResponse: (e, t, n) => {
                                    o.push({
                                        outcome: "response",
                                        purpose: n,
                                        target: t
                                    })
                                },
                                write: () => {
                                    const r = (new Date).getTime();
                                    R(["mousemove", "mouseover", "mouseout", bs()], e) || console.log(e, {
                                        event: e,
                                        time: r - n,
                                        target: t.dom,
                                        sequence: H(o, (e => R(["cut", "stopped", "response"], e.outcome) ? "{" + e.purpose + "} " + e.outcome + " at (" + na(e.target) + ")" : e.outcome))
                                    })
                                }
                            }
                        })(e, t),
                        r = o(n);
                    return n.write(), r
                }
                case yi.STOP:
                    return !0
            }
        })(e, t, o),
        ki = x({
            logEventCut: b,
            logEventStopped: b,
            logNoParent: b,
            logEventNoHandlers: b,
            logEventResponse: b,
            write: b
        }),
        Ci = x([or("menu"), or("selectedMenu")]),
        Oi = x([or("item"), or("selectedItem")]);
    x(Dn(Oi().concat(Ci())));
    const _i = x(Dn(Oi())),
        Ti = lr("initSize", [or("numColumns"), or("numRows")]),
        Ei = () => lr("markers", [or("backgroundMenu")].concat(Ci()).concat(Oi())),
        Ai = e => lr("markers", H(e, or)),
        Mi = (e, t, o) => ((() => {
            const e = new Error;
            if (void 0 !== e.stack) {
                const t = e.stack.split("\n");
                G(t, (e => e.indexOf("alloy") > 0 && !N(wi, (t => e.indexOf(t) > -1)))).getOr("unknown")
            }
        })(), Qn(t, t, o, Gn((e => rn.value(((...t) => e.apply(void 0, t))))))),
        Di = e => Mi(0, e, yn(b)),
        Bi = e => Mi(0, e, yn(A.none)),
        Fi = e => Mi(0, e, {
            tag: "required",
            process: {}
        }),
        Ii = e => Mi(0, e, {
            tag: "required",
            process: {}
        }),
        Ri = (e, t) => er(e, x(t)),
        Ni = e => er(e, w),
        Vi = x(Ti),
        zi = (e, t, o, n, r, s, a, i = !1) => ({
            x: e,
            y: t,
            bubble: o,
            direction: n,
            placement: r,
            restriction: s,
            label: `${a}-${r}`,
            alwaysFit: i
        }),
        Hi = Ar([{
            southeast: []
        }, {
            southwest: []
        }, {
            northeast: []
        }, {
            northwest: []
        }, {
            south: []
        }, {
            north: []
        }, {
            east: []
        }, {
            west: []
        }]),
        Li = Hi.southeast,
        Pi = Hi.southwest,
        Ui = Hi.northeast,
        Wi = Hi.northwest,
        ji = Hi.south,
        Gi = Hi.north,
        $i = Hi.east,
        qi = Hi.west,
        Xi = (e, t, o, n) => {
            const r = e + t;
            return r > n ? o : r < o ? n : r
        },
        Ki = (e, t, o) => Math.min(Math.max(e, t), o),
        Yi = (e, t) => Z(["left", "right", "top", "bottom"], (o => be(t, o).map((t => ((e, t) => {
            switch (t) {
                case 1:
                    return e.x;
                case 0:
                    return e.x + e.width;
                case 2:
                    return e.y;
                case 3:
                    return e.y + e.height
            }
        })(e, t))))),
        Ji = "layout",
        Zi = e => e.x,
        Qi = (e, t) => e.x + e.width / 2 - t.width / 2,
        el = (e, t) => e.x + e.width - t.width,
        tl = (e, t) => e.y - t.height,
        ol = e => e.y + e.height,
        nl = (e, t) => e.y + e.height / 2 - t.height / 2,
        rl = (e, t, o) => zi(Zi(e), ol(e), o.southeast(), Li(), "southeast", Yi(e, {
            left: 1,
            top: 3
        }), Ji),
        sl = (e, t, o) => zi(el(e, t), ol(e), o.southwest(), Pi(), "southwest", Yi(e, {
            right: 0,
            top: 3
        }), Ji),
        al = (e, t, o) => zi(Zi(e), tl(e, t), o.northeast(), Ui(), "northeast", Yi(e, {
            left: 1,
            bottom: 2
        }), Ji),
        il = (e, t, o) => zi(el(e, t), tl(e, t), o.northwest(), Wi(), "northwest", Yi(e, {
            right: 0,
            bottom: 2
        }), Ji),
        ll = (e, t, o) => zi(Qi(e, t), tl(e, t), o.north(), Gi(), "north", Yi(e, {
            bottom: 2
        }), Ji),
        cl = (e, t, o) => zi(Qi(e, t), ol(e), o.south(), ji(), "south", Yi(e, {
            top: 3
        }), Ji),
        dl = (e, t, o) => zi((e => e.x + e.width)(e), nl(e, t), o.east(), $i(), "east", Yi(e, {
            left: 0
        }), Ji),
        ul = (e, t, o) => zi(((e, t) => e.x - t.width)(e, t), nl(e, t), o.west(), qi(), "west", Yi(e, {
            right: 1
        }), Ji),
        ml = () => [rl, sl, al, il, cl, ll, dl, ul],
        gl = () => [sl, rl, il, al, cl, ll, dl, ul],
        pl = () => [al, il, rl, sl, ll, cl],
        hl = () => [il, al, sl, rl, ll, cl],
        fl = () => [rl, sl, al, il, cl, ll],
        bl = () => [sl, rl, il, al, cl, ll];
    var vl = Object.freeze({
            __proto__: null,
            events: e => Hs([Us(ds(), ((t, o) => {
                const n = e.channels,
                    r = ae(n),
                    s = o,
                    a = ((e, t) => t.universal ? e : U(e, (e => R(t.channels, e))))(r, s);
                L(a, (e => {
                    const o = n[e],
                        r = o.schema,
                        a = Kn("channel[" + e + "] data\nReceiver: " + na(t.element), r, s.data);
                    o.onReceive(t, a)
                }))
            }))])
        }),
        yl = [nr("channels", $n(rn.value, Mn([Fi("onReceive"), yr("schema", Nn())])))];
    const xl = (e, t, o) => Zs(((n, r) => {
            o(n, e, t)
        })),
        wl = e => ({
            key: e,
            value: void 0
        }),
        Sl = (e, t, o, n, r, s, a) => {
            const i = e => ye(e, o) ? e[o]() : A.none(),
                l = ce(r, ((e, t) => ((e, t, o) => ((e, t, o) => {
                    const n = o.toString(),
                        r = n.indexOf(")") + 1,
                        s = n.indexOf("("),
                        a = n.substring(s + 1, r - 1).split(/,\s*/);
                    return e.toFunctionAnnotation = () => ({
                        name: t,
                        parameters: ya(a.slice(0, 1).concat(a.slice(3)))
                    }), e
                })(((n, ...r) => {
                    const s = [n].concat(r);
                    return n.config({
                        name: x(e)
                    }).fold((() => {
                        throw new Error("We could not find any behaviour configuration for: " + e + ". Using API: " + o)
                    }), (e => {
                        const o = Array.prototype.slice.call(s, 1);
                        return t.apply(void 0, [n, e.config, e.state].concat(o))
                    }))
                }), o, t))(o, e, t))),
                c = {
                    ...ce(s, ((e, t) => xa(e, t))),
                    ...l,
                    revoke: k(wl, o),
                    config: t => {
                        const n = Kn(o + "-config", e, t);
                        return {
                            key: o,
                            value: {
                                config: n,
                                me: c,
                                configAsRaw: Qt((() => Kn(o + "-config", e, t))),
                                initialConfig: t,
                                state: a
                            }
                        }
                    },
                    schema: x(t),
                    exhibit: (e, t) => Se(i(e), be(n, "exhibit"), ((e, o) => o(t, e.config, e.state))).getOrThunk((() => Ea({}))),
                    name: x(o),
                    handlers: e => i(e).map((e => be(n, "events").getOr((() => ({})))(e.config, e.state))).getOr({})
                };
            return c
        },
        kl = e => Dr(e),
        Cl = Mn([or("fields"), or("name"), yr("active", {}), yr("apis", {}), yr("state", Oa), yr("extra", {})]),
        Ol = e => {
            const t = Kn("Creating behaviour: " + e.name, Cl, e);
            return ((e, t, o, n, r, s) => {
                const a = Mn(e),
                    i = vr(t, [("config", l = e, mr("config", Mn(l)))]);
                var l;
                return Sl(a, i, t, o, n, r, s)
            })(t.fields, t.name, t.active, t.apis, t.extra, t.state)
        },
        _l = Mn([or("branchKey"), or("branches"), or("name"), yr("active", {}), yr("apis", {}), yr("state", Oa), yr("extra", {})]),
        Tl = e => {
            const t = Kn("Creating behaviour: " + e.name, _l, e);
            return ((e, t, o, n, r, s) => {
                const a = e,
                    i = vr(t, [mr("config", e)]);
                return Sl(a, i, t, o, n, r, s)
            })(Jn(t.branchKey, t.branches), t.name, t.active, t.apis, t.extra, t.state)
        },
        El = x(void 0),
        Al = Ol({
            fields: yl,
            name: "receiving",
            active: vl
        });
    var Ml = Object.freeze({
        __proto__: null,
        exhibit: (e, t) => Ea({
            classes: [],
            styles: t.useFixed() ? {} : {
                position: "relative"
            }
        })
    });
    const Dl = e => e.dom.focus(),
        Bl = e => e.dom.blur(),
        Fl = e => {
            const t = ht(e).dom;
            return e.dom === t.activeElement
        },
        Il = (e = $o()) => A.from(e.dom.activeElement).map(Ve),
        Rl = e => Il(ht(e)).filter((t => e.dom.contains(t.dom))),
        Nl = (e, t) => {
            const o = ht(t),
                n = Il(o).bind((e => {
                    const o = t => Ze(e, t);
                    return o(t) ? A.some(t) : ((e, t) => {
                        const o = e => {
                            for (let n = 0; n < e.childNodes.length; n++) {
                                const r = Ve(e.childNodes[n]);
                                if (t(r)) return A.some(r);
                                const s = o(e.childNodes[n]);
                                if (s.isSome()) return s
                            }
                            return A.none()
                        };
                        return o(e.dom)
                    })(t, o)
                })),
                r = e(t);
            return n.each((e => {
                Il(o).filter((t => Ze(t, e))).fold((() => {
                    Dl(e)
                }), b)
            })), r
        },
        Vl = (e, t, o, n, r) => {
            const s = e => e + "px";
            return {
                position: e,
                left: t.map(s),
                top: o.map(s),
                right: n.map(s),
                bottom: r.map(s)
            }
        },
        zl = (e, t) => {
            Ft(e, (e => ({
                ...e,
                position: A.some(e.position)
            }))(t))
        },
        Hl = Ar([{
            none: []
        }, {
            relative: ["x", "y", "width", "height"]
        }, {
            fixed: ["x", "y", "width", "height"]
        }]),
        Ll = (e, t, o, n, r, s) => {
            const a = t.rect,
                i = a.x - o,
                l = a.y - n,
                c = r - (i + a.width),
                d = s - (l + a.height),
                u = A.some(i),
                m = A.some(l),
                g = A.some(c),
                p = A.some(d),
                h = A.none();
            return t.direction.fold((() => Vl(e, u, m, h, h)), (() => Vl(e, h, m, g, h)), (() => Vl(e, u, h, h, p)), (() => Vl(e, h, h, g, p)), (() => Vl(e, u, m, h, h)), (() => Vl(e, u, h, h, p)), (() => Vl(e, u, m, h, h)), (() => Vl(e, h, m, g, h)))
        },
        Pl = (e, t) => e.fold((() => {
            const e = t.rect;
            return Vl("absolute", A.some(e.x), A.some(e.y), A.none(), A.none())
        }), ((e, o, n, r) => Ll("absolute", t, e, o, n, r)), ((e, o, n, r) => Ll("fixed", t, e, o, n, r))),
        Ul = (e, t) => {
            const o = k(Ko, t),
                n = e.fold(o, o, (() => {
                    const e = Uo();
                    return Ko(t).translate(-e.left, -e.top)
                })),
                r = Zt(t),
                s = jt(t);
            return Yo(n.left, n.top, r, s)
        },
        Wl = (e, t) => t.fold((() => e.fold(en, en, Yo)), (t => e.fold(x(t), x(t), (() => {
            const o = jl(e, t.x, t.y);
            return Yo(o.left, o.top, t.width, t.height)
        })))),
        jl = (e, t, o) => {
            const n = $t(t, o);
            return e.fold(x(n), x(n), (() => {
                const e = Uo();
                return n.translate(-e.left, -e.top)
            }))
        };
    Hl.none;
    const Gl = Hl.relative,
        $l = Hl.fixed,
        ql = "data-alloy-placement",
        Xl = e => _t(e, ql),
        Kl = Ar([{
            fit: ["reposition"]
        }, {
            nofit: ["reposition", "visibleW", "visibleH", "isVisible"]
        }]),
        Yl = (e, t, o, n) => {
            const r = e.bubble,
                s = r.offset,
                a = ((e, t, o) => {
                    const n = (n, r) => t[n].map((t => {
                            const s = "top" === n || "bottom" === n,
                                a = s ? o.top : o.left,
                                i = ("left" === n || "top" === n ? Math.max : Math.min)(t, r) + a;
                            return s ? Ki(i, e.y, e.bottom) : Ki(i, e.x, e.right)
                        })).getOr(r),
                        r = n("left", e.x),
                        s = n("top", e.y),
                        a = n("right", e.right),
                        i = n("bottom", e.bottom);
                    return Yo(r, s, a - r, i - s)
                })(n, e.restriction, s),
                i = e.x + s.left,
                l = e.y + s.top,
                c = Yo(i, l, t, o),
                {
                    originInBounds: d,
                    sizeInBounds: u,
                    visibleW: m,
                    visibleH: g
                } = ((e, t) => {
                    const {
                        x: o,
                        y: n,
                        right: r,
                        bottom: s
                    } = t, {
                        x: a,
                        y: i,
                        right: l,
                        bottom: c,
                        width: d,
                        height: u
                    } = e;
                    return {
                        originInBounds: a >= o && a <= r && i >= n && i <= s,
                        sizeInBounds: l <= r && l >= o && c <= s && c >= n,
                        visibleW: Math.min(d, a >= o ? r - a : l - o),
                        visibleH: Math.min(u, i >= n ? s - i : c - n)
                    }
                })(c, a),
                p = d && u,
                h = p ? c : ((e, t) => {
                    const {
                        x: o,
                        y: n,
                        right: r,
                        bottom: s
                    } = t, {
                        x: a,
                        y: i,
                        width: l,
                        height: c
                    } = e, d = Math.max(o, r - l), u = Math.max(n, s - c), m = Ki(a, o, d), g = Ki(i, n, u), p = Math.min(m + l, r) - m, h = Math.min(g + c, s) - g;
                    return Yo(m, g, p, h)
                })(c, a),
                f = h.width > 0 && h.height > 0,
                {
                    maxWidth: b,
                    maxHeight: v
                } = ((e, t, o) => {
                    const n = x(t.bottom - o.y),
                        r = x(o.bottom - t.y),
                        s = ((e, t, o, n) => e.fold(t, t, n, n, t, n, o, o))(e, r, r, n),
                        a = x(t.right - o.x),
                        i = x(o.right - t.x),
                        l = ((e, t, o, n) => e.fold(t, n, t, n, o, o, t, n))(e, i, i, a);
                    return {
                        maxWidth: l,
                        maxHeight: s
                    }
                })(e.direction, h, n),
                y = {
                    rect: h,
                    maxHeight: v,
                    maxWidth: b,
                    direction: e.direction,
                    placement: e.placement,
                    classes: {
                        on: r.classesOn,
                        off: r.classesOff
                    },
                    layout: e.label,
                    testY: l
                };
            return p || e.alwaysFit ? Kl.fit(y) : Kl.nofit(y, m, g, f)
        },
        Jl = e => {
            const t = Er(A.none()),
                o = () => t.get().each(e);
            return {
                clear: () => {
                    o(), t.set(A.none())
                },
                isSet: () => t.get().isSome(),
                get: () => t.get(),
                set: e => {
                    o(), t.set(A.some(e))
                }
            }
        },
        Zl = () => Jl((e => e.unbind())),
        Ql = () => {
            const e = Jl(b);
            return {
                ...e,
                on: t => e.get().each(t)
            }
        },
        ec = E,
        tc = (e, t, o) => ((e, t, o, n) => Fo(e, t, o, n, !1))(e, t, ec, o),
        oc = (e, t, o) => ((e, t, o, n) => Fo(e, t, o, n, !0))(e, t, ec, o),
        nc = Bo,
        rc = ["top", "bottom", "right", "left"],
        sc = "data-alloy-transition-timer",
        ac = (e, t, o, n, r, a) => {
            const i = ((e, t, o) => o.exists((o => {
                const n = e.mode;
                return "all" === n || o[n] !== t[n]
            })))(n, r, a);
            if (i || ((e, t) => Ga(e, t.classes))(e, n)) {
                Dt(e, "position", o.position);
                const a = Ul(t, e),
                    l = Pl(t, {
                        ...r,
                        rect: a
                    }),
                    c = Z(rc, (e => l[e]));
                ((e, t) => {
                    const o = e => parseFloat(e).toFixed(3);
                    return he(t, ((t, n) => !((e, t, o = S) => Se(e, t, o).getOr(e.isNone() && t.isNone()))(e[n].map(o), t.map(o)))).isSome()
                })(o, c) && (Ft(e, c), i && ((e, t) => {
                    Wa(e, t.classes), _t(e, sc).each((t => {
                        clearTimeout(parseInt(t, 10)), Et(e, sc)
                    })), ((e, t) => {
                        const o = Zl(),
                            n = Zl();
                        let r;
                        const a = t => {
                                var o;
                                const n = null !== (o = t.raw.pseudoElement) && void 0 !== o ? o : "";
                                return Ze(t.target, e) && !De(n) && R(rc, t.raw.propertyName)
                            },
                            i = s => {
                                if (m(s) || a(s)) {
                                    o.clear(), n.clear();
                                    const a = null == s ? void 0 : s.raw.type;
                                    (m(a) || a === os()) && (clearTimeout(r), Et(e, sc), ja(e, t.classes))
                                }
                            },
                            l = tc(e, ns(), (t => {
                                a(t) && (l.unbind(), o.set(tc(e, os(), i)), n.set(tc(e, ts(), i)))
                            })),
                            c = (e => {
                                const t = t => {
                                        const o = It(e, t).split(/\s*,\s*/);
                                        return U(o, De)
                                    },
                                    o = e => {
                                        if (s(e) && /^[\d.]+/.test(e)) {
                                            const t = parseFloat(e);
                                            return Ae(e, "ms") ? t : 1e3 * t
                                        }
                                        return 0
                                    },
                                    n = t("transition-delay"),
                                    r = t("transition-duration");
                                return j(r, ((e, t, r) => {
                                    const s = o(n[r]) + o(t);
                                    return Math.max(e, s)
                                }), 0)
                            })(e);
                        requestAnimationFrame((() => {
                            r = setTimeout(i, c + 17), kt(e, sc, r)
                        }))
                    })(e, t)
                })(e, n), Lt(e))
            } else ja(e, n.classes)
        },
        ic = (e, t) => {
            ((e, t) => {
                const o = Ut.max(e, t, ["margin-top", "border-top-width", "padding-top", "padding-bottom", "border-bottom-width", "margin-bottom"]);
                Dt(e, "max-height", o + "px")
            })(e, Math.floor(t))
        },
        lc = x(((e, t) => {
            ic(e, t), Bt(e, {
                "overflow-x": "hidden",
                "overflow-y": "auto"
            })
        })),
        cc = x(((e, t) => {
            ic(e, t)
        })),
        dc = (e, t, o) => void 0 === e[t] ? o : e[t],
        uc = (e, t, o, n) => {
            const r = ((e, t, o, n) => {
                Ht(t, "max-height"), Ht(t, "max-width");
                const r = {
                    width: Zt(s = t),
                    height: jt(s)
                };
                var s;
                return ((e, t, o, n, r, s) => {
                    const a = n.width,
                        i = n.height,
                        l = (t, l, c, d, u) => {
                            const m = t(o, n, r, e, s),
                                g = Yl(m, a, i, s);
                            return g.fold(x(g), ((e, t, o, n) => (u === n ? o > d || t > c : !u && n) ? g : Kl.nofit(l, c, d, u)))
                        };
                    return j(t, ((e, t) => {
                        const o = k(l, t);
                        return e.fold(x(e), o)
                    }), Kl.nofit({
                        rect: o,
                        maxHeight: n.height,
                        maxWidth: n.width,
                        direction: Li(),
                        placement: "southeast",
                        classes: {
                            on: [],
                            off: []
                        },
                        layout: "none",
                        testY: o.y
                    }, -1, -1, !1)).fold(w, w)
                })(t, n.preference, e, r, o, n.bounds)
            })(e, t, o, n);
            return ((e, t, o) => {
                const n = Pl(o.origin, t);
                o.transition.each((r => {
                    ac(e, o.origin, n, r, t, o.lastPlacement)
                })), zl(e, n)
            })(t, r, n), ((e, t) => {
                ((e, t) => {
                    kt(e, ql, t)
                })(e, t.placement)
            })(t, r), ((e, t) => {
                const o = t.classes;
                ja(e, o.off), Wa(e, o.on)
            })(t, r), ((e, t, o) => {
                (0, o.maxHeightFunction)(e, t.maxHeight)
            })(t, r, n), ((e, t, o) => {
                (0, o.maxWidthFunction)(e, t.maxWidth)
            })(t, r, n), {
                layout: r.layout,
                placement: r.placement
            }
        },
        mc = ["valignCentre", "alignLeft", "alignRight", "alignCentre", "top", "bottom", "left", "right", "inset"],
        gc = (e, t, o, n = 1) => {
            const r = e * n,
                s = t * n,
                a = e => be(o, e).getOr([]),
                i = (e, t, o) => {
                    const n = J(mc, o);
                    return {
                        offset: $t(e, t),
                        classesOn: X(o, a),
                        classesOff: X(n, a)
                    }
                };
            return {
                southeast: () => i(-e, t, ["top", "alignLeft"]),
                southwest: () => i(e, t, ["top", "alignRight"]),
                south: () => i(-e / 2, t, ["top", "alignCentre"]),
                northeast: () => i(-e, -t, ["bottom", "alignLeft"]),
                northwest: () => i(e, -t, ["bottom", "alignRight"]),
                north: () => i(-e / 2, -t, ["bottom", "alignCentre"]),
                east: () => i(e, -t / 2, ["valignCentre", "left"]),
                west: () => i(-e, -t / 2, ["valignCentre", "right"]),
                insetNortheast: () => i(r, s, ["top", "alignLeft", "inset"]),
                insetNorthwest: () => i(-r, s, ["top", "alignRight", "inset"]),
                insetNorth: () => i(-r / 2, s, ["top", "alignCentre", "inset"]),
                insetSoutheast: () => i(r, -s, ["bottom", "alignLeft", "inset"]),
                insetSouthwest: () => i(-r, -s, ["bottom", "alignRight", "inset"]),
                insetSouth: () => i(-r / 2, -s, ["bottom", "alignCentre", "inset"]),
                insetEast: () => i(-r, -s / 2, ["valignCentre", "right", "inset"]),
                insetWest: () => i(r, -s / 2, ["valignCentre", "left", "inset"])
            }
        },
        pc = () => gc(0, 0, {}),
        hc = w,
        fc = (e, t) => o => "rtl" === bc(o) ? t : e,
        bc = e => "rtl" === It(e, "direction") ? "rtl" : "ltr";
    var vc;
    ! function (e) {
        e.TopToBottom = "toptobottom", e.BottomToTop = "bottomtotop"
    }(vc || (vc = {}));
    const yc = "data-alloy-vertical-dir",
        xc = e => ui(e, (e => Ge(e) && Ot(e, "data-alloy-vertical-dir") === vc.BottomToTop)),
        wc = () => vr("layouts", [or("onLtr"), or("onRtl"), ur("onBottomLtr"), ur("onBottomRtl")]),
        Sc = (e, t, o, n, r, s, a) => {
            const i = a.map(xc).getOr(!1),
                l = t.layouts.map((t => t.onLtr(e))),
                c = t.layouts.map((t => t.onRtl(e))),
                d = i ? t.layouts.bind((t => t.onBottomLtr.map((t => t(e))))).or(l).getOr(r) : l.getOr(o),
                u = i ? t.layouts.bind((t => t.onBottomRtl.map((t => t(e))))).or(c).getOr(s) : c.getOr(n);
            return fc(d, u)(e)
        };
    var kc = [or("hotspot"), ur("bubble"), yr("overrides", {}), wc(), Ri("placement", ((e, t, o) => {
            const n = t.hotspot,
                r = Ul(o, n.element),
                s = Sc(e.element, t, fl(), bl(), pl(), hl(), A.some(t.hotspot.element));
            return A.some(hc({
                anchorBox: r,
                bubble: t.bubble.getOr(pc()),
                overrides: t.overrides,
                layouts: s
            }))
        }))],
        Cc = [or("x"), or("y"), yr("height", 0), yr("width", 0), yr("bubble", pc()), yr("overrides", {}), wc(), Ri("placement", ((e, t, o) => {
            const n = jl(o, t.x, t.y),
                r = Yo(n.left, n.top, t.width, t.height),
                s = Sc(e.element, t, ml(), gl(), ml(), gl(), A.none());
            return A.some(hc({
                anchorBox: r,
                bubble: t.bubble,
                overrides: t.overrides,
                layouts: s
            }))
        }))];
    const Oc = Ar([{
            screen: ["point"]
        }, {
            absolute: ["point", "scrollLeft", "scrollTop"]
        }]),
        _c = e => e.fold(w, ((e, t, o) => e.translate(-t, -o))),
        Tc = e => e.fold(w, w),
        Ec = e => j(e, ((e, t) => e.translate(t.left, t.top)), $t(0, 0)),
        Ac = e => {
            const t = H(e, Tc);
            return Ec(t)
        },
        Mc = Oc.screen,
        Dc = Oc.absolute,
        Bc = (e, t, o) => {
            const n = et(e.element),
                r = Uo(n),
                s = ((e, t, o) => {
                    const n = nt(o.root).dom;
                    return A.from(n.frameElement).map(Ve).filter((t => {
                        const o = et(t),
                            n = et(e.element);
                        return Ze(o, n)
                    })).map(Xt)
                })(e, 0, o).getOr(r);
            return Dc(s, r.left, r.top)
        },
        Fc = (e, t, o, n) => {
            const r = Mc($t(e, t));
            return A.some(((e, t, o) => ({
                point: e,
                width: t,
                height: o
            }))(r, o, n))
        },
        Ic = (e, t, o, n, r) => e.map((e => {
            const s = [t, e.point],
                a = (i = () => Ac(s), l = () => Ac(s), c = () => (e => {
                    const t = H(e, _c);
                    return Ec(t)
                })(s), n.fold(i, l, c));
            var i, l, c;
            const d = (p = a.left, h = a.top, f = e.width, b = e.height, {
                    x: p,
                    y: h,
                    width: f,
                    height: b
                }),
                u = o.showAbove ? pl() : fl(),
                m = o.showAbove ? hl() : bl(),
                g = Sc(r, o, u, m, u, m, A.none());
            var p, h, f, b;
            return hc({
                anchorBox: d,
                bubble: o.bubble.getOr(pc()),
                overrides: o.overrides,
                layouts: g
            })
        }));
    var Rc = [or("node"), or("root"), ur("bubble"), wc(), yr("overrides", {}), yr("showAbove", !1), Ri("placement", ((e, t, o) => {
        const n = Bc(e, 0, t);
        return t.node.filter(yt).bind((r => {
            const s = r.dom.getBoundingClientRect(),
                a = Fc(s.left, s.top, s.width, s.height),
                i = t.node.getOr(e.element);
            return Ic(a, n, t, o, i)
        }))
    }))];
    const Nc = (e, t, o, n) => ({
            start: e,
            soffset: t,
            finish: o,
            foffset: n
        }),
        Vc = Ar([{
            before: ["element"]
        }, {
            on: ["element", "offset"]
        }, {
            after: ["element"]
        }]),
        zc = (Vc.before, Vc.on, Vc.after, e => e.fold(w, w, w)),
        Hc = Ar([{
            domRange: ["rng"]
        }, {
            relative: ["startSitu", "finishSitu"]
        }, {
            exact: ["start", "soffset", "finish", "foffset"]
        }]),
        Lc = {
            domRange: Hc.domRange,
            relative: Hc.relative,
            exact: Hc.exact,
            exactFromRange: e => Hc.exact(e.start, e.soffset, e.finish, e.foffset),
            getWin: e => {
                const t = (e => e.match({
                    domRange: e => Ve(e.startContainer),
                    relative: (e, t) => zc(e),
                    exact: (e, t, o, n) => e
                }))(e);
                return nt(t)
            },
            range: Nc
        },
        Pc = (e, t, o) => {
            const n = e.document.createRange();
            var r;
            return r = n, t.fold((e => {
                r.setStartBefore(e.dom)
            }), ((e, t) => {
                r.setStart(e.dom, t)
            }), (e => {
                r.setStartAfter(e.dom)
            })), ((e, t) => {
                t.fold((t => {
                    e.setEndBefore(t.dom)
                }), ((t, o) => {
                    e.setEnd(t.dom, o)
                }), (t => {
                    e.setEndAfter(t.dom)
                }))
            })(n, o), n
        },
        Uc = (e, t, o, n, r) => {
            const s = e.document.createRange();
            return s.setStart(t.dom, o), s.setEnd(n.dom, r), s
        },
        Wc = e => ({
            left: e.left,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            width: e.width,
            height: e.height
        }),
        jc = Ar([{
            ltr: ["start", "soffset", "finish", "foffset"]
        }, {
            rtl: ["start", "soffset", "finish", "foffset"]
        }]),
        Gc = (e, t, o) => t(Ve(o.startContainer), o.startOffset, Ve(o.endContainer), o.endOffset),
        $c = (e, t) => ((e, t) => {
            const o = ((e, t) => t.match({
                domRange: e => ({
                    ltr: x(e),
                    rtl: A.none
                }),
                relative: (t, o) => ({
                    ltr: Qt((() => Pc(e, t, o))),
                    rtl: Qt((() => A.some(Pc(e, o, t))))
                }),
                exact: (t, o, n, r) => ({
                    ltr: Qt((() => Uc(e, t, o, n, r))),
                    rtl: Qt((() => A.some(Uc(e, n, r, t, o))))
                })
            }))(e, t);
            return ((e, t) => {
                const o = t.ltr();
                return o.collapsed ? t.rtl().filter((e => !1 === e.collapsed)).map((e => jc.rtl(Ve(e.endContainer), e.endOffset, Ve(e.startContainer), e.startOffset))).getOrThunk((() => Gc(0, jc.ltr, o))) : Gc(0, jc.ltr, o)
            })(0, o)
        })(e, t).match({
            ltr: (t, o, n, r) => {
                const s = e.document.createRange();
                return s.setStart(t.dom, o), s.setEnd(n.dom, r), s
            },
            rtl: (t, o, n, r) => {
                const s = e.document.createRange();
                return s.setStart(n.dom, r), s.setEnd(t.dom, o), s
            }
        });
    jc.ltr, jc.rtl;
    const qc = (e, t) => ((e, t) => {
            const o = void 0 === t ? document : t.dom;
            return Je(o) ? [] : H(o.querySelectorAll(e), Ve)
        })(t, e),
        Xc = e => {
            if (e.rangeCount > 0) {
                const t = e.getRangeAt(0),
                    o = e.getRangeAt(e.rangeCount - 1);
                return A.some(Nc(Ve(t.startContainer), t.startOffset, Ve(o.endContainer), o.endOffset))
            }
            return A.none()
        },
        Kc = e => {
            if (null === e.anchorNode || null === e.focusNode) return Xc(e); {
                const t = Ve(e.anchorNode),
                    o = Ve(e.focusNode);
                return ((e, t, o, n) => {
                    const r = ((e, t, o, n) => {
                            const r = et(e).dom.createRange();
                            return r.setStart(e.dom, t), r.setEnd(o.dom, n), r
                        })(e, t, o, n),
                        s = Ze(e, o) && t === n;
                    return r.collapsed && !s
                })(t, e.anchorOffset, o, e.focusOffset) ? A.some(Nc(t, e.anchorOffset, o, e.focusOffset)) : Xc(e)
            }
        },
        Yc = (e, t) => (e => {
            const t = e.getClientRects(),
                o = t.length > 0 ? t[0] : e.getBoundingClientRect();
            return o.width > 0 || o.height > 0 ? A.some(o).map(Wc) : A.none()
        })($c(e, t)),
        Jc = ((e, t) => {
            const o = t => e(t) ? A.from(t.dom.nodeValue) : A.none();
            return {
                get: t => {
                    if (!e(t)) throw new Error("Can only get text value of a text node");
                    return o(t).getOr("")
                },
                getOption: o,
                set: (t, o) => {
                    if (!e(t)) throw new Error("Can only set raw text value of a text node");
                    t.dom.nodeValue = o
                }
            }
        })($e),
        Zc = (e, t) => ({
            element: e,
            offset: t
        }),
        Qc = (e, t) => $e(e) ? Zc(e, t) : ((e, t) => {
            const o = it(e);
            if (0 === o.length) return Zc(e, t);
            if (t < o.length) return Zc(o[t], 0); {
                const e = o[o.length - 1],
                    t = $e(e) ? (e => Jc.get(e))(e).length : it(e).length;
                return Zc(e, t)
            }
        })(e, t),
        ed = (e, t) => t.getSelection.getOrThunk((() => () => (e => (e => A.from(e.getSelection()))(e).filter((e => e.rangeCount > 0)).bind(Kc))(e)))().map((e => {
            const t = Qc(e.start, e.soffset),
                o = Qc(e.finish, e.foffset);
            return Lc.range(t.element, t.offset, o.element, o.offset)
        }));
    var td = [ur("getSelection"), or("root"), ur("bubble"), wc(), yr("overrides", {}), yr("showAbove", !1), Ri("placement", ((e, t, o) => {
        const n = nt(t.root).dom,
            r = Bc(e, 0, t),
            s = ed(n, t).bind((e => {
                const t = ((e, t) => (e => {
                    const t = e.getBoundingClientRect();
                    return t.width > 0 || t.height > 0 ? A.some(t).map(Wc) : A.none()
                })($c(e, t)))(n, Lc.exactFromRange(e)).orThunk((() => {
                    const t = Ne("\ufeff");
                    Ro(e.start, t);
                    const o = Yc(n, Lc.exact(t, 0, t, 1));
                    return Po(t), o
                }));
                return t.bind((e => Fc(e.left, e.top, e.width, e.height)))
            })),
            a = ed(n, t).bind((e => Ge(e.start) ? A.some(e.start) : st(e.start))).getOr(e.element);
        return Ic(s, r, t, o, a)
    }))];
    const od = "link-layout",
        nd = e => e.x + e.width,
        rd = (e, t) => e.x - t.width,
        sd = (e, t) => e.y - t.height + e.height,
        ad = e => e.y,
        id = (e, t, o) => zi(nd(e), ad(e), o.southeast(), Li(), "southeast", Yi(e, {
            left: 0,
            top: 2
        }), od),
        ld = (e, t, o) => zi(rd(e, t), ad(e), o.southwest(), Pi(), "southwest", Yi(e, {
            right: 1,
            top: 2
        }), od),
        cd = (e, t, o) => zi(nd(e), sd(e, t), o.northeast(), Ui(), "northeast", Yi(e, {
            left: 0,
            bottom: 3
        }), od),
        dd = (e, t, o) => zi(rd(e, t), sd(e, t), o.northwest(), Wi(), "northwest", Yi(e, {
            right: 1,
            bottom: 3
        }), od),
        ud = () => [id, ld, cd, dd],
        md = () => [ld, id, dd, cd];
    var gd = [or("item"), wc(), yr("overrides", {}), Ri("placement", ((e, t, o) => {
            const n = Ul(o, t.item.element),
                r = Sc(e.element, t, ud(), md(), ud(), md(), A.none());
            return A.some(hc({
                anchorBox: n,
                bubble: pc(),
                overrides: t.overrides,
                layouts: r
            }))
        }))],
        pd = Jn("type", {
            selection: td,
            node: Rc,
            hotspot: kc,
            submenu: gd,
            makeshift: Cc
        });
    const hd = [dr("classes", Hn), kr("mode", "all", ["all", "layout", "placement"])],
        fd = [yr("useFixed", T), ur("getBounds")],
        bd = [nr("anchor", pd), vr("transition", hd)],
        vd = (e, t, o, n, r, s) => {
            const a = Kn("placement.info", Dn(bd), r),
                i = a.anchor,
                l = n.element,
                c = o.get(n.uid);
            Nl((() => {
                Dt(l, "position", "fixed");
                const r = Nt(l, "visibility");
                Dt(l, "visibility", "hidden");
                const d = t.useFixed() ? (() => {
                    const e = document.documentElement;
                    return $l(0, 0, e.clientWidth, e.clientHeight)
                })() : (e => {
                    const t = Xt(e.element),
                        o = e.element.dom.getBoundingClientRect();
                    return Gl(t.left, t.top, o.width, o.height)
                })(e);
                i.placement(e, i, d).each((e => {
                    const r = s.orThunk((() => t.getBounds.map(_))),
                        i = ((e, t, o, n, r, s) => ((e, t, o, n, r, s, a, i) => {
                            const l = dc(a, "maxHeightFunction", lc()),
                                c = dc(a, "maxWidthFunction", b),
                                d = e.anchorBox,
                                u = e.origin,
                                m = {
                                    bounds: Wl(u, s),
                                    origin: u,
                                    preference: n,
                                    maxHeightFunction: l,
                                    maxWidthFunction: c,
                                    lastPlacement: r,
                                    transition: i
                                };
                            return uc(d, t, o, m)
                        })(((e, t) => ((e, t) => ({
                            anchorBox: e,
                            origin: t
                        }))(e, t))(t.anchorBox, e), n.element, t.bubble, t.layouts, r, o, t.overrides, s))(d, e, r, n, c, a.transition);
                    o.set(n.uid, i)
                })), r.fold((() => {
                    Ht(l, "visibility")
                }), (e => {
                    Dt(l, "visibility", e)
                })), Nt(l, "left").isNone() && Nt(l, "top").isNone() && Nt(l, "right").isNone() && Nt(l, "bottom").isNone() && xe(Nt(l, "position"), "fixed") && Ht(l, "position")
            }), l)
        };
    var yd = Object.freeze({
        __proto__: null,
        position: (e, t, o, n, r) => {
            const s = A.none();
            vd(e, t, o, n, r, s)
        },
        positionWithinBounds: vd,
        getMode: (e, t, o) => t.useFixed() ? "fixed" : "absolute",
        reset: (e, t, o, n) => {
            const r = n.element;
            L(["position", "left", "right", "top", "bottom"], (e => Ht(r, e))), (e => {
                Et(e, ql)
            })(r), o.clear(n.uid)
        }
    });
    const xd = Ol({
            fields: fd,
            name: "positioning",
            active: Ml,
            apis: yd,
            state: Object.freeze({
                __proto__: null,
                init: () => {
                    let e = {};
                    return _a({
                        readState: () => e,
                        clear: t => {
                            g(t) ? delete e[t] : e = {}
                        },
                        set: (t, o) => {
                            e[t] = o
                        },
                        get: t => be(e, t)
                    })
                }
            })
        }),
        wd = e => e.getSystem().isConnected(),
        Sd = e => {
            Fs(e, ks());
            const t = e.components();
            L(t, Sd)
        },
        kd = e => {
            const t = e.components();
            L(t, kd), Fs(e, Ss())
        },
        Cd = (e, t) => {
            e.getSystem().addToWorld(t), yt(e.element) && kd(t)
        },
        Od = e => {
            Sd(e), e.getSystem().removeFromWorld(e)
        },
        _d = (e, t) => {
            zo(e.element, t.element)
        },
        Td = (e, t) => {
            Ed(e, t, zo)
        },
        Ed = (e, t, o) => {
            e.getSystem().addToWorld(t), o(e.element, t.element), yt(e.element) && kd(t), e.syncComponents()
        },
        Ad = e => {
            Sd(e), Po(e.element), e.getSystem().removeFromWorld(e)
        },
        Md = e => {
            const t = rt(e.element).bind((t => e.getSystem().getByDom(t).toOptional()));
            Ad(e), t.each((e => {
                e.syncComponents()
            }))
        },
        Dd = e => {
            const t = e.components();
            L(t, Ad), Lo(e.element), e.syncComponents()
        },
        Bd = (e, t) => {
            Id(e, t, zo)
        },
        Fd = (e, t) => {
            Id(e, t, No)
        },
        Id = (e, t, o) => {
            o(e, t.element);
            const n = it(t.element);
            L(n, (e => {
                t.getByDom(e).each(kd)
            }))
        },
        Rd = e => {
            const t = it(e.element);
            L(t, (t => {
                e.getByDom(t).each(Sd)
            })), Po(e.element)
        },
        Nd = (e, t, o, n) => {
            o.get().each((t => {
                Dd(e)
            }));
            const r = t.getAttachPoint(e);
            Td(r, e);
            const s = e.getSystem().build(n);
            return Td(e, s), o.set(s), s
        },
        Vd = (e, t, o, n) => {
            const r = Nd(e, t, o, n);
            return t.onOpen(e, r), r
        },
        zd = (e, t, o) => {
            o.get().each((n => {
                Dd(e), Md(e), t.onClose(e, n), o.clear()
            }))
        },
        Hd = (e, t, o) => o.isOpen(),
        Ld = (e, t, o) => {
            const n = t.getAttachPoint(e);
            Dt(e.element, "position", xd.getMode(n)), ((e, t, o, n) => {
                Nt(e.element, t).fold((() => {
                    Et(e.element, o)
                }), (t => {
                    kt(e.element, o, t)
                })), Dt(e.element, t, "hidden")
            })(e, "visibility", t.cloakVisibilityAttr)
        },
        Pd = (e, t, o) => {
            (e => N(["top", "left", "right", "bottom"], (t => Nt(e, t).isSome())))(e.element) || Ht(e.element, "position"), ((e, t, o) => {
                _t(e.element, o).fold((() => Ht(e.element, t)), (o => Dt(e.element, t, o)))
            })(e, "visibility", t.cloakVisibilityAttr)
        };
    var Ud = Object.freeze({
            __proto__: null,
            cloak: Ld,
            decloak: Pd,
            open: Vd,
            openWhileCloaked: (e, t, o, n, r) => {
                Ld(e, t), Vd(e, t, o, n), r(), Pd(e, t)
            },
            close: zd,
            isOpen: Hd,
            isPartOf: (e, t, o, n) => Hd(0, 0, o) && o.get().exists((o => t.isPartOf(e, o, n))),
            getState: (e, t, o) => o.get(),
            setContent: (e, t, o, n) => o.get().map((() => Nd(e, t, o, n)))
        }),
        Wd = Object.freeze({
            __proto__: null,
            events: (e, t) => Hs([Us(hs(), ((o, n) => {
                zd(o, e, t)
            }))])
        }),
        jd = [Di("onOpen"), Di("onClose"), or("isPartOf"), or("getAttachPoint"), yr("cloakVisibilityAttr", "data-precloak-visibility")],
        Gd = Object.freeze({
            __proto__: null,
            init: () => {
                const e = Ql(),
                    t = x("not-implemented");
                return _a({
                    readState: t,
                    isOpen: e.isSet,
                    clear: e.clear,
                    set: e.set,
                    get: e.get
                })
            }
        });
    const $d = Ol({
            fields: jd,
            name: "sandboxing",
            active: Wd,
            apis: Ud,
            state: Gd
        }),
        qd = x("dismiss.popups"),
        Xd = x("reposition.popups"),
        Kd = x("mouse.released"),
        Yd = Mn([yr("isExtraPart", T), vr("fireEventInstead", [yr("event", Cs())])]),
        Jd = e => {
            const t = Kn("Dismissal", Yd, e);
            return {
                [qd()]: {
                    schema: Mn([or("target")]),
                    onReceive: (e, o) => {
                        $d.isOpen(e) && ($d.isPartOf(e, o.target) || t.isExtraPart(e, o.target) || t.fireEventInstead.fold((() => $d.close(e)), (t => Fs(e, t.event))))
                    }
                }
            }
        },
        Zd = Mn([vr("fireEventInstead", [yr("event", Os())]), ir("doReposition")]),
        Qd = e => {
            const t = Kn("Reposition", Zd, e);
            return {
                [Xd()]: {
                    onReceive: e => {
                        $d.isOpen(e) && t.fireEventInstead.fold((() => t.doReposition(e)), (t => Fs(e, t.event)))
                    }
                }
            }
        },
        eu = (e, t, o) => {
            t.store.manager.onLoad(e, t, o)
        },
        tu = (e, t, o) => {
            t.store.manager.onUnload(e, t, o)
        };
    var ou = Object.freeze({
            __proto__: null,
            onLoad: eu,
            onUnload: tu,
            setValue: (e, t, o, n) => {
                t.store.manager.setValue(e, t, o, n)
            },
            getValue: (e, t, o) => t.store.manager.getValue(e, t, o),
            getState: (e, t, o) => o
        }),
        nu = Object.freeze({
            __proto__: null,
            events: (e, t) => {
                const o = e.resetOnDom ? [Ys(((o, n) => {
                    eu(o, e, t)
                })), Js(((o, n) => {
                    tu(o, e, t)
                }))] : [xl(e, t, eu)];
                return Hs(o)
            }
        });
    const ru = () => {
            const e = Er(null);
            return _a({
                set: e.set,
                get: e.get,
                isNotSet: () => null === e.get(),
                clear: () => {
                    e.set(null)
                },
                readState: () => ({
                    mode: "memory",
                    value: e.get()
                })
            })
        },
        su = () => {
            const e = Er({}),
                t = Er({});
            return _a({
                readState: () => ({
                    mode: "dataset",
                    dataByValue: e.get(),
                    dataByText: t.get()
                }),
                lookup: o => be(e.get(), o).orThunk((() => be(t.get(), o))),
                update: o => {
                    const n = e.get(),
                        r = t.get(),
                        s = {},
                        a = {};
                    L(o, (e => {
                        s[e.value] = e, be(e, "meta").each((t => {
                            be(t, "text").each((t => {
                                a[t] = e
                            }))
                        }))
                    })), e.set({
                        ...n,
                        ...s
                    }), t.set({
                        ...r,
                        ...a
                    })
                },
                clear: () => {
                    e.set({}), t.set({})
                }
            })
        };
    var au = Object.freeze({
        __proto__: null,
        memory: ru,
        dataset: su,
        manual: () => _a({
            readState: b
        }),
        init: e => e.store.manager.state(e)
    });
    const iu = (e, t, o, n) => {
        const r = t.store;
        o.update([n]), r.setValue(e, n), t.onSetValue(e, n)
    };
    var lu = [ur("initialValue"), or("getFallbackEntry"), or("getDataKey"), or("setValue"), Ri("manager", {
            setValue: iu,
            getValue: (e, t, o) => {
                const n = t.store,
                    r = n.getDataKey(e);
                return o.lookup(r).getOrThunk((() => n.getFallbackEntry(r)))
            },
            onLoad: (e, t, o) => {
                t.store.initialValue.each((n => {
                    iu(e, t, o, n)
                }))
            },
            onUnload: (e, t, o) => {
                o.clear()
            },
            state: su
        })],
        cu = [or("getValue"), yr("setValue", b), ur("initialValue"), Ri("manager", {
            setValue: (e, t, o, n) => {
                t.store.setValue(e, n), t.onSetValue(e, n)
            },
            getValue: (e, t, o) => t.store.getValue(e),
            onLoad: (e, t, o) => {
                t.store.initialValue.each((o => {
                    t.store.setValue(e, o)
                }))
            },
            onUnload: b,
            state: Oa.init
        })],
        du = [ur("initialValue"), Ri("manager", {
            setValue: (e, t, o, n) => {
                o.set(n), t.onSetValue(e, n)
            },
            getValue: (e, t, o) => o.get(),
            onLoad: (e, t, o) => {
                t.store.initialValue.each((e => {
                    o.isNotSet() && o.set(e)
                }))
            },
            onUnload: (e, t, o) => {
                o.clear()
            },
            state: ru
        })],
        uu = [xr("store", {
            mode: "memory"
        }, Jn("mode", {
            memory: du,
            manual: cu,
            dataset: lu
        })), Di("onSetValue"), yr("resetOnDom", !1)];
    const mu = Ol({
            fields: uu,
            name: "representing",
            active: nu,
            apis: ou,
            extra: {
                setValueFrom: (e, t) => {
                    const o = mu.getValue(t);
                    mu.setValue(e, o)
                }
            },
            state: au
        }),
        gu = (e, t) => Tr(e, {}, H(t, (t => {
            return o = t.name(), n = "Cannot configure " + t.name() + " for " + e, Qn(o, o, {
                tag: "option",
                process: {}
            }, Cn((e => un("The field: " + o + " is forbidden. " + n))));
            var o, n
        })).concat([er("dump", w)])),
        pu = e => e.dump,
        hu = (e, t) => ({
            ...kl(t),
            ...e.dump
        }),
        fu = gu,
        bu = hu,
        vu = "placeholder",
        yu = Ar([{
            single: ["required", "valueThunk"]
        }, {
            multiple: ["required", "valueThunks"]
        }]),
        xu = e => ve(e, "uiType"),
        wu = (e, t, o, n) => ((e, t, o, n) => xu(o) && o.uiType === vu ? ((e, t, o, n) => e.exists((e => e !== o.owner)) ? yu.single(!0, x(o)) : be(n, o.name).fold((() => {
            throw new Error("Unknown placeholder component: " + o.name + "\nKnown: [" + ae(n) + "]\nNamespace: " + e.getOr("none") + "\nSpec: " + JSON.stringify(o, null, 2))
        }), (e => e.replace())))(e, 0, o, n) : yu.single(!1, x(o)))(e, 0, o, n).fold(((r, s) => {
            const a = xu(o) ? s(t, o.config, o.validated) : s(t),
                i = be(a, "components").getOr([]),
                l = X(i, (o => wu(e, t, o, n)));
            return [{
                ...a,
                components: l
            }]
        }), ((e, n) => {
            if (xu(o)) {
                const e = n(t, o.config, o.validated);
                return o.validated.preprocess.getOr(w)(e)
            }
            return n(t)
        })),
        Su = yu.single,
        ku = yu.multiple,
        Cu = x(vu),
        Ou = Ar([{
            required: ["data"]
        }, {
            external: ["data"]
        }, {
            optional: ["data"]
        }, {
            group: ["data"]
        }]),
        _u = yr("factory", {
            sketch: w
        }),
        Tu = yr("schema", []),
        Eu = or("name"),
        Au = Qn("pname", "pname", vn((e => "<alloy." + la(e.name) + ">")), Nn()),
        Mu = er("schema", (() => [ur("preprocess")])),
        Du = yr("defaults", x({})),
        Bu = yr("overrides", x({})),
        Fu = Dn([_u, Tu, Eu, Au, Du, Bu]),
        Iu = Dn([_u, Tu, Eu, Du, Bu]),
        Ru = Dn([_u, Tu, Eu, Au, Du, Bu]),
        Nu = Dn([_u, Mu, Eu, or("unit"), Au, Du, Bu]),
        Vu = e => e.fold(A.some, A.none, A.some, A.some),
        zu = e => {
            const t = e => e.name;
            return e.fold(t, t, t, t)
        },
        Hu = (e, t) => o => {
            const n = Kn("Converting part type", t, o);
            return e(n)
        },
        Lu = Hu(Ou.required, Fu),
        Pu = Hu(Ou.external, Iu),
        Uu = Hu(Ou.optional, Ru),
        Wu = Hu(Ou.group, Nu),
        ju = x("entirety");
    var Gu = Object.freeze({
        __proto__: null,
        required: Lu,
        external: Pu,
        optional: Uu,
        group: Wu,
        asNamedPart: Vu,
        name: zu,
        asCommon: e => e.fold(w, w, w, w),
        original: ju
    });
    const $u = (e, t, o, n) => fn(t.defaults(e, o, n), o, {
            uid: e.partUids[t.name]
        }, t.overrides(e, o, n)),
        qu = (e, t) => {
            const o = {};
            return L(t, (t => {
                Vu(t).each((t => {
                    const n = Xu(e, t.pname);
                    o[t.name] = o => {
                        const r = Kn("Part: " + t.name + " in " + e, Dn(t.schema), o);
                        return {
                            ...n,
                            config: o,
                            validated: r
                        }
                    }
                }))
            })), o
        },
        Xu = (e, t) => ({
            uiType: Cu(),
            owner: e,
            name: t
        }),
        Ku = (e, t, o) => ({
            uiType: Cu(),
            owner: e,
            name: t,
            config: o,
            validated: {}
        }),
        Yu = e => X(e, (e => e.fold(A.none, A.some, A.none, A.none).map((e => lr(e.name, e.schema.concat([Ni(ju())])))).toArray())),
        Ju = e => H(e, zu),
        Zu = (e, t, o) => ((e, t, o) => {
            const n = {},
                r = {};
            return L(o, (e => {
                e.fold((e => {
                    n[e.pname] = Su(!0, ((t, o, n) => e.factory.sketch($u(t, e, o, n))))
                }), (e => {
                    const o = t.parts[e.name];
                    r[e.name] = x(e.factory.sketch($u(t, e, o[ju()]), o))
                }), (e => {
                    n[e.pname] = Su(!1, ((t, o, n) => e.factory.sketch($u(t, e, o, n))))
                }), (e => {
                    n[e.pname] = ku(!0, ((t, o, n) => {
                        const r = t[e.name];
                        return H(r, (o => e.factory.sketch(fn(e.defaults(t, o, n), o, e.overrides(t, o)))))
                    }))
                }))
            })), {
                internals: x(n),
                externals: x(r)
            }
        })(0, t, o),
        Qu = (e, t, o) => ((e, t, o, n) => {
            const r = ce(n, ((e, t) => ((e, t) => {
                    let o = !1;
                    return {
                        name: x(e),
                        required: () => t.fold(((e, t) => e), ((e, t) => e)),
                        used: () => o,
                        replace: () => {
                            if (o) throw new Error("Trying to use the same placeholder more than once: " + e);
                            return o = !0, t
                        }
                    }
                })(t, e))),
                s = ((e, t, o, n) => X(o, (o => wu(e, t, o, n))))(e, t, o, r);
            return le(r, (o => {
                if (!1 === o.used() && o.required()) throw new Error("Placeholder: " + o.name() + " was not found in components list\nNamespace: " + e.getOr("none") + "\nComponents: " + JSON.stringify(t.components, null, 2))
            })), s
        })(A.some(e), t, t.components, o),
        em = (e, t, o) => {
            const n = t.partUids[o];
            return e.getSystem().getByUid(n).toOptional()
        },
        tm = (e, t, o) => em(e, t, o).getOrDie("Could not find part: " + o),
        om = (e, t, o) => {
            const n = {},
                r = t.partUids,
                s = e.getSystem();
            return L(o, (e => {
                n[e] = x(s.getByUid(r[e]))
            })), n
        },
        nm = (e, t) => {
            const o = e.getSystem();
            return ce(t.partUids, ((e, t) => x(o.getByUid(e))))
        },
        rm = e => ae(e.partUids),
        sm = (e, t, o) => {
            const n = {},
                r = t.partUids,
                s = e.getSystem();
            return L(o, (e => {
                n[e] = x(s.getByUid(r[e]).getOrDie())
            })), n
        },
        am = (e, t) => {
            const o = Ju(t);
            return Dr(H(o, (t => ({
                key: t,
                value: e + "-" + t
            }))))
        },
        im = e => Qn("partUids", "partUids", xn((t => am(t.uid, e))), Nn());
    var lm = Object.freeze({
        __proto__: null,
        generate: qu,
        generateOne: Ku,
        schemas: Yu,
        names: Ju,
        substitutes: Zu,
        components: Qu,
        defaultUids: am,
        defaultUidsSchema: im,
        getAllParts: nm,
        getAllPartNames: rm,
        getPart: em,
        getPartOrDie: tm,
        getParts: om,
        getPartsOrDie: sm
    });
    const cm = (e, t, o, n, r) => {
            const s = ((e, t) => (e.length > 0 ? [lr("parts", e)] : []).concat([or("uid"), yr("dom", {}), yr("components", []), Ni("originalSpec"), yr("debug.sketcher", {})]).concat(t))(n, r);
            return Kn(e + " [SpecSchema]", Mn(s.concat(t)), o)
        },
        dm = (e, t, o, n, r) => {
            const s = um(r),
                a = Yu(o),
                i = im(o),
                l = cm(e, t, s, a, [i]),
                c = Zu(0, l, o);
            return n(l, Qu(e, l, c.internals()), s, c.externals())
        },
        um = e => (e => ve(e, "uid"))(e) ? e : {
            ...e,
            uid: ha("uid")
        },
        mm = Mn([or("name"), or("factory"), or("configFields"), yr("apis", {}), yr("extraApis", {})]),
        gm = Mn([or("name"), or("factory"), or("configFields"), or("partFields"), yr("apis", {}), yr("extraApis", {})]),
        pm = e => {
            const t = Kn("Sketcher for " + e.name, mm, e),
                o = ce(t.apis, Ca),
                n = ce(t.extraApis, ((e, t) => xa(e, t)));
            return {
                name: t.name,
                configFields: t.configFields,
                sketch: e => ((e, t, o, n) => {
                    const r = um(n);
                    return o(cm(e, t, r, [], []), r)
                })(t.name, t.configFields, t.factory, e),
                ...o,
                ...n
            }
        },
        hm = e => {
            const t = Kn("Sketcher for " + e.name, gm, e),
                o = qu(t.name, t.partFields),
                n = ce(t.apis, Ca),
                r = ce(t.extraApis, ((e, t) => xa(e, t)));
            return {
                name: t.name,
                partFields: t.partFields,
                configFields: t.configFields,
                sketch: e => dm(t.name, t.configFields, t.partFields, t.factory, e),
                parts: o,
                ...n,
                ...r
            }
        },
        fm = e => Ke("input")(e) && "radio" !== Ot(e, "type") || Ke("textarea")(e);
    var bm = Object.freeze({
        __proto__: null,
        getCurrent: (e, t, o) => t.find(e)
    });
    const vm = [or("find")],
        ym = Ol({
            fields: vm,
            name: "composing",
            apis: bm
        }),
        xm = ["input", "button", "textarea", "select"],
        wm = (e, t, o) => {
            (t.disabled() ? Tm : Em)(e, t)
        },
        Sm = (e, t) => !0 === t.useNative && R(xm, Ue(e.element)),
        km = e => {
            kt(e.element, "disabled", "disabled")
        },
        Cm = e => {
            Et(e.element, "disabled")
        },
        Om = e => {
            kt(e.element, "aria-disabled", "true")
        },
        _m = e => {
            kt(e.element, "aria-disabled", "false")
        },
        Tm = (e, t, o) => {
            t.disableClass.each((t => {
                La(e.element, t)
            })), (Sm(e, t) ? km : Om)(e), t.onDisabled(e)
        },
        Em = (e, t, o) => {
            t.disableClass.each((t => {
                Pa(e.element, t)
            })), (Sm(e, t) ? Cm : _m)(e), t.onEnabled(e)
        },
        Am = (e, t) => Sm(e, t) ? (e => Tt(e.element, "disabled"))(e) : (e => "true" === Ot(e.element, "aria-disabled"))(e);
    var Mm = Object.freeze({
            __proto__: null,
            enable: Em,
            disable: Tm,
            isDisabled: Am,
            onLoad: wm,
            set: (e, t, o, n) => {
                (n ? Tm : Em)(e, t)
            }
        }),
        Dm = Object.freeze({
            __proto__: null,
            exhibit: (e, t) => Ea({
                classes: t.disabled() ? t.disableClass.toArray() : []
            }),
            events: (e, t) => Hs([Ls(us(), ((t, o) => Am(t, e))), xl(e, t, wm)])
        }),
        Bm = [Or("disabled", T), yr("useNative", !0), ur("disableClass"), Di("onDisabled"), Di("onEnabled")];
    const Fm = Ol({
            fields: Bm,
            name: "disabling",
            active: Dm,
            apis: Mm
        }),
        Im = (e, t, o, n) => {
            const r = qc(e.element, "." + t.highlightClass);
            L(r, (o => {
                N(n, (e => Ze(e.element, o))) || (Pa(o, t.highlightClass), e.getSystem().getByDom(o).each((o => {
                    t.onDehighlight(e, o), Fs(o, Bs())
                })))
            }))
        },
        Rm = (e, t, o, n) => {
            Im(e, t, 0, [n]), Nm(e, t, o, n) || (La(n.element, t.highlightClass), t.onHighlight(e, n), Fs(n, Ds()))
        },
        Nm = (e, t, o, n) => Ua(n.element, t.highlightClass),
        Vm = (e, t, o) => pi(e.element, "." + t.itemClass).bind((t => e.getSystem().getByDom(t).toOptional())),
        zm = (e, t, o) => {
            const n = qc(e.element, "." + t.itemClass);
            return (n.length > 0 ? A.some(n[n.length - 1]) : A.none()).bind((t => e.getSystem().getByDom(t).toOptional()))
        },
        Hm = (e, t, o, n) => {
            const r = qc(e.element, "." + t.itemClass);
            return $(r, (e => Ua(e, t.highlightClass))).bind((t => {
                const o = Xi(t, n, 0, r.length - 1);
                return e.getSystem().getByDom(r[o]).toOptional()
            }))
        },
        Lm = (e, t, o) => {
            const n = qc(e.element, "." + t.itemClass);
            return we(H(n, (t => e.getSystem().getByDom(t).toOptional())))
        };
    var Pm = Object.freeze({
            __proto__: null,
            dehighlightAll: (e, t, o) => Im(e, t, 0, []),
            dehighlight: (e, t, o, n) => {
                Nm(e, t, o, n) && (Pa(n.element, t.highlightClass), t.onDehighlight(e, n), Fs(n, Bs()))
            },
            highlight: Rm,
            highlightFirst: (e, t, o) => {
                Vm(e, t).each((n => {
                    Rm(e, t, o, n)
                }))
            },
            highlightLast: (e, t, o) => {
                zm(e, t).each((n => {
                    Rm(e, t, o, n)
                }))
            },
            highlightAt: (e, t, o, n) => {
                ((e, t, o, n) => {
                    const r = qc(e.element, "." + t.itemClass);
                    return A.from(r[n]).fold((() => rn.error(new Error("No element found with index " + n))), e.getSystem().getByDom)
                })(e, t, 0, n).fold((e => {
                    throw e
                }), (n => {
                    Rm(e, t, o, n)
                }))
            },
            highlightBy: (e, t, o, n) => {
                const r = Lm(e, t);
                G(r, n).each((n => {
                    Rm(e, t, o, n)
                }))
            },
            isHighlighted: Nm,
            getHighlighted: (e, t, o) => pi(e.element, "." + t.highlightClass).bind((t => e.getSystem().getByDom(t).toOptional())),
            getFirst: Vm,
            getLast: zm,
            getPrevious: (e, t, o) => Hm(e, t, 0, -1),
            getNext: (e, t, o) => Hm(e, t, 0, 1),
            getCandidates: Lm
        }),
        Um = [or("highlightClass"), or("itemClass"), Di("onHighlight"), Di("onDehighlight")];
    const Wm = Ol({
            fields: Um,
            name: "highlighting",
            apis: Pm
        }),
        jm = [8],
        Gm = [9],
        $m = [13],
        qm = [27],
        Xm = [32],
        Km = [37],
        Ym = [38],
        Jm = [39],
        Zm = [40],
        Qm = (e, t, o) => {
            const n = Y(e.slice(0, t)),
                r = Y(e.slice(t + 1));
            return G(n.concat(r), o)
        },
        eg = (e, t, o) => {
            const n = Y(e.slice(0, t));
            return G(n, o)
        },
        tg = (e, t, o) => {
            const n = e.slice(0, t),
                r = e.slice(t + 1);
            return G(r.concat(n), o)
        },
        og = (e, t, o) => {
            const n = e.slice(t + 1);
            return G(n, o)
        },
        ng = e => t => {
            const o = t.raw;
            return R(e, o.which)
        },
        rg = e => t => K(e, (e => e(t))),
        sg = e => !0 === e.raw.shiftKey,
        ag = e => !0 === e.raw.ctrlKey,
        ig = C(sg),
        lg = (e, t) => ({
            matches: e,
            classification: t
        }),
        cg = (e, t, o) => {
            t.exists((e => o.exists((t => Ze(t, e))))) || Is(e, _s(), {
                prevFocus: t,
                newFocus: o
            })
        },
        dg = () => {
            const e = e => Rl(e.element);
            return {
                get: e,
                set: (t, o) => {
                    const n = e(t);
                    t.getSystem().triggerFocus(o, t.element);
                    const r = e(t);
                    cg(t, n, r)
                }
            }
        },
        ug = () => {
            const e = e => Wm.getHighlighted(e).map((e => e.element));
            return {
                get: e,
                set: (t, o) => {
                    const n = e(t);
                    t.getSystem().getByDom(o).fold(b, (e => {
                        Wm.highlight(t, e)
                    }));
                    const r = e(t);
                    cg(t, n, r)
                }
            }
        };
    var mg;
    ! function (e) {
        e.OnFocusMode = "onFocus", e.OnEnterOrSpaceMode = "onEnterOrSpace", e.OnApiMode = "onApi"
    }(mg || (mg = {}));
    const gg = (e, t, o, n, r) => {
            const s = (e, t, o, n, r) => {
                    return (s = o(e, t, n, r), a = t.event, G(s, (e => e.matches(a))).map((e => e.classification))).bind((o => o(e, t, n, r)));
                    var s, a
                },
                a = {
                    schema: () => e.concat([yr("focusManager", dg()), xr("focusInside", "onFocus", Gn((e => R(["onFocus", "onEnterOrSpace", "onApi"], e) ? rn.value(e) : rn.error("Invalid value for focusInside")))), Ri("handler", a), Ri("state", t), Ri("sendFocusIn", r)]),
                    processKey: s,
                    toEvents: (e, t) => {
                        const a = e.focusInside !== mg.OnFocusMode ? A.none() : r(e).map((o => Us(is(), ((n, r) => {
                                o(n, e, t), r.stop()
                            })))),
                            i = [Us(Yr(), ((n, a) => {
                                s(n, a, o, e, t).fold((() => {
                                    ((o, n) => {
                                        const s = ng(Xm.concat($m))(n.event);
                                        e.focusInside === mg.OnEnterOrSpaceMode && s && Rr(o, n) && r(e).each((r => {
                                            r(o, e, t), n.stop()
                                        }))
                                    })(n, a)
                                }), (e => {
                                    a.stop()
                                }))
                            })), Us(Jr(), ((o, r) => {
                                s(o, r, n, e, t).each((e => {
                                    r.stop()
                                }))
                            }))];
                        return Hs(a.toArray().concat(i))
                    }
                };
            return a
        },
        pg = e => {
            const t = [ur("onEscape"), ur("onEnter"), yr("selector", '[data-alloy-tabstop="true"]:not(:disabled)'), yr("firstTabstop", 0), yr("useTabstopAt", E), ur("visibilitySelector")].concat([e]),
                o = (e, t) => {
                    const o = e.visibilitySelector.bind((e => hi(t, e))).getOr(t);
                    return Wt(o) > 0
                },
                n = (e, t, n) => {
                    ((e, t) => {
                        const n = qc(e.element, t.selector),
                            r = U(n, (e => o(t, e)));
                        return A.from(r[t.firstTabstop])
                    })(e, t).each((o => {
                        t.focusManager.set(e, o)
                    }))
                },
                r = (e, t, n, r) => {
                    const s = qc(e.element, n.selector);
                    return ((e, t) => t.focusManager.get(e).bind((e => hi(e, t.selector))))(e, n).bind((t => $(s, k(Ze, t)).bind((t => ((e, t, n, r, s) => s(t, n, (e => ((e, t) => o(e, t) && e.useTabstopAt(t))(r, e))).fold((() => r.cyclic ? A.some(!0) : A.none()), (t => (r.focusManager.set(e, t), A.some(!0)))))(e, s, t, n, r)))))
                },
                s = x([lg(rg([sg, ng(Gm)]), ((e, t, o) => {
                    const n = o.cyclic ? Qm : eg;
                    return r(e, 0, o, n)
                })), lg(ng(Gm), ((e, t, o) => {
                    const n = o.cyclic ? tg : og;
                    return r(e, 0, o, n)
                })), lg(rg([ig, ng($m)]), ((e, t, o) => o.onEnter.bind((o => o(e, t)))))]),
                a = x([lg(ng(qm), ((e, t, o) => o.onEscape.bind((o => o(e, t)))))]);
            return gg(t, Oa.init, s, a, (() => A.some(n)))
        };
    var hg = pg(er("cyclic", T)),
        fg = pg(er("cyclic", E));
    const bg = (e, t, o) => fm(o) && ng(Xm)(t.event) ? A.none() : ((e, t, o) => (Ns(e, o, us()), A.some(!0)))(e, 0, o),
        vg = (e, t) => A.some(!0),
        yg = [yr("execute", bg), yr("useSpace", !1), yr("useEnter", !0), yr("useControlEnter", !1), yr("useDown", !1)],
        xg = (e, t, o) => o.execute(e, t, e.element);
    var wg = gg(yg, Oa.init, ((e, t, o, n) => {
        const r = o.useSpace && !fm(e.element) ? Xm : [],
            s = o.useEnter ? $m : [],
            a = o.useDown ? Zm : [],
            i = r.concat(s).concat(a);
        return [lg(ng(i), xg)].concat(o.useControlEnter ? [lg(rg([ag, ng($m)]), xg)] : [])
    }), ((e, t, o, n) => o.useSpace && !fm(e.element) ? [lg(ng(Xm), vg)] : []), (() => A.none()));
    const Sg = () => {
        const e = Ql();
        return _a({
            readState: () => e.get().map((e => ({
                numRows: String(e.numRows),
                numColumns: String(e.numColumns)
            }))).getOr({
                numRows: "?",
                numColumns: "?"
            }),
            setGridSize: (t, o) => {
                e.set({
                    numRows: t,
                    numColumns: o
                })
            },
            getNumRows: () => e.get().map((e => e.numRows)),
            getNumColumns: () => e.get().map((e => e.numColumns))
        })
    };
    var kg = Object.freeze({
        __proto__: null,
        flatgrid: Sg,
        init: e => e.state(e)
    });
    const Cg = e => (t, o, n, r) => {
            const s = e(t.element);
            return Eg(s, t, o, n, r)
        },
        Og = (e, t) => {
            const o = fc(e, t);
            return Cg(o)
        },
        _g = (e, t) => {
            const o = fc(t, e);
            return Cg(o)
        },
        Tg = e => (t, o, n, r) => Eg(e, t, o, n, r),
        Eg = (e, t, o, n, r) => n.focusManager.get(t).bind((o => e(t.element, o, n, r))).map((e => (n.focusManager.set(t, e), !0))),
        Ag = Tg,
        Mg = Tg,
        Dg = Tg,
        Bg = e => !(e => e.offsetWidth <= 0 && e.offsetHeight <= 0)(e.dom),
        Fg = (e, t, o) => {
            const n = qc(e, o);
            return ((e, o) => $(e, (e => Ze(e, t))).map((t => ({
                index: t,
                candidates: e
            }))))(U(n, Bg))
        },
        Ig = (e, t) => $(e, (e => Ze(t, e))),
        Rg = (e, t, o, n) => n(Math.floor(t / o), t % o).bind((t => {
            const n = t.row * o + t.column;
            return n >= 0 && n < e.length ? A.some(e[n]) : A.none()
        })),
        Ng = (e, t, o, n, r) => Rg(e, t, n, ((t, s) => {
            const a = t === o - 1 ? e.length - t * n : n,
                i = Xi(s, r, 0, a - 1);
            return A.some({
                row: t,
                column: i
            })
        })),
        Vg = (e, t, o, n, r) => Rg(e, t, n, ((t, s) => {
            const a = Xi(t, r, 0, o - 1),
                i = a === o - 1 ? e.length - a * n : n,
                l = Ki(s, 0, i - 1);
            return A.some({
                row: a,
                column: l
            })
        })),
        zg = [or("selector"), yr("execute", bg), Bi("onEscape"), yr("captureTab", !1), Vi()],
        Hg = (e, t, o) => {
            pi(e.element, t.selector).each((o => {
                t.focusManager.set(e, o)
            }))
        },
        Lg = e => (t, o, n, r) => Fg(t, o, n.selector).bind((t => e(t.candidates, t.index, r.getNumRows().getOr(n.initSize.numRows), r.getNumColumns().getOr(n.initSize.numColumns)))),
        Pg = (e, t, o) => o.captureTab ? A.some(!0) : A.none(),
        Ug = Lg(((e, t, o, n) => Ng(e, t, o, n, -1))),
        Wg = Lg(((e, t, o, n) => Ng(e, t, o, n, 1))),
        jg = Lg(((e, t, o, n) => Vg(e, t, o, n, -1))),
        Gg = Lg(((e, t, o, n) => Vg(e, t, o, n, 1))),
        $g = x([lg(ng(Km), Og(Ug, Wg)), lg(ng(Jm), _g(Ug, Wg)), lg(ng(Ym), Ag(jg)), lg(ng(Zm), Mg(Gg)), lg(rg([sg, ng(Gm)]), Pg), lg(rg([ig, ng(Gm)]), Pg), lg(ng(Xm.concat($m)), ((e, t, o, n) => ((e, t) => t.focusManager.get(e).bind((e => hi(e, t.selector))))(e, o).bind((n => o.execute(e, t, n)))))]),
        qg = x([lg(ng(qm), ((e, t, o) => o.onEscape(e, t))), lg(ng(Xm), vg)]);
    var Xg = gg(zg, Sg, $g, qg, (() => A.some(Hg)));
    const Kg = (e, t, o, n, r) => {
            const s = (e, t, o) => r(e, t, n, 0, o.length - 1, o[t], (t => {
                return n = o[t], "button" === Ue(n) && "disabled" === Ot(n, "disabled") ? s(e, t, o) : A.from(o[t]);
                var n
            }));
            return Fg(e, o, t).bind((e => {
                const t = e.index,
                    o = e.candidates;
                return s(t, t, o)
            }))
        },
        Yg = (e, t, o, n) => Kg(e, t, o, n, ((e, t, o, n, r, s, a) => {
            const i = Ki(t + o, n, r);
            return i === e ? A.from(s) : a(i)
        })),
        Jg = (e, t, o, n) => Kg(e, t, o, n, ((e, t, o, n, r, s, a) => {
            const i = Xi(t, o, n, r);
            return i === e ? A.none() : a(i)
        })),
        Zg = [or("selector"), yr("getInitial", A.none), yr("execute", bg), Bi("onEscape"), yr("executeOnMove", !1), yr("allowVertical", !0), yr("allowHorizontal", !0), yr("cycles", !0)],
        Qg = (e, t, o) => ((e, t) => t.focusManager.get(e).bind((e => hi(e, t.selector))))(e, o).bind((n => o.execute(e, t, n))),
        ep = (e, t, o) => {
            t.getInitial(e).orThunk((() => pi(e.element, t.selector))).each((o => {
                t.focusManager.set(e, o)
            }))
        },
        tp = (e, t, o) => (o.cycles ? Jg : Yg)(e, o.selector, t, -1),
        op = (e, t, o) => (o.cycles ? Jg : Yg)(e, o.selector, t, 1),
        np = e => (t, o, n, r) => e(t, o, n, r).bind((() => n.executeOnMove ? Qg(t, o, n) : A.some(!0))),
        rp = x([lg(ng(Xm), vg), lg(ng(qm), ((e, t, o) => o.onEscape(e, t)))]);
    var sp = gg(Zg, Oa.init, ((e, t, o, n) => {
        const r = [...o.allowHorizontal ? Km : []].concat(o.allowVertical ? Ym : []),
            s = [...o.allowHorizontal ? Jm : []].concat(o.allowVertical ? Zm : []);
        return [lg(ng(r), np(Og(tp, op))), lg(ng(s), np(_g(tp, op))), lg(ng($m), Qg), lg(ng(Xm), Qg)]
    }), rp, (() => A.some(ep)));
    const ap = (e, t, o) => A.from(e[t]).bind((e => A.from(e[o]).map((e => ({
            rowIndex: t,
            columnIndex: o,
            cell: e
        }))))),
        ip = (e, t, o, n) => {
            const r = e[t].length,
                s = Xi(o, n, 0, r - 1);
            return ap(e, t, s)
        },
        lp = (e, t, o, n) => {
            const r = Xi(o, n, 0, e.length - 1),
                s = e[r].length,
                a = Ki(t, 0, s - 1);
            return ap(e, r, a)
        },
        cp = (e, t, o, n) => {
            const r = e[t].length,
                s = Ki(o + n, 0, r - 1);
            return ap(e, t, s)
        },
        dp = (e, t, o, n) => {
            const r = Ki(o + n, 0, e.length - 1),
                s = e[r].length,
                a = Ki(t, 0, s - 1);
            return ap(e, r, a)
        },
        up = [lr("selectors", [or("row"), or("cell")]), yr("cycles", !0), yr("previousSelector", A.none), yr("execute", bg)],
        mp = (e, t, o) => {
            t.previousSelector(e).orThunk((() => {
                const o = t.selectors;
                return pi(e.element, o.cell)
            })).each((o => {
                t.focusManager.set(e, o)
            }))
        },
        gp = (e, t) => (o, n, r) => {
            const s = r.cycles ? e : t;
            return hi(n, r.selectors.row).bind((e => {
                const t = qc(e, r.selectors.cell);
                return Ig(t, n).bind((t => {
                    const n = qc(o, r.selectors.row);
                    return Ig(n, e).bind((e => {
                        const o = ((e, t) => H(e, (e => qc(e, t.selectors.cell))))(n, r);
                        return s(o, e, t).map((e => e.cell))
                    }))
                }))
            }))
        },
        pp = gp(((e, t, o) => ip(e, t, o, -1)), ((e, t, o) => cp(e, t, o, -1))),
        hp = gp(((e, t, o) => ip(e, t, o, 1)), ((e, t, o) => cp(e, t, o, 1))),
        fp = gp(((e, t, o) => lp(e, o, t, -1)), ((e, t, o) => dp(e, o, t, -1))),
        bp = gp(((e, t, o) => lp(e, o, t, 1)), ((e, t, o) => dp(e, o, t, 1))),
        vp = x([lg(ng(Km), Og(pp, hp)), lg(ng(Jm), _g(pp, hp)), lg(ng(Ym), Ag(fp)), lg(ng(Zm), Mg(bp)), lg(ng(Xm.concat($m)), ((e, t, o) => Rl(e.element).bind((n => o.execute(e, t, n)))))]),
        yp = x([lg(ng(Xm), vg)]);
    var xp = gg(up, Oa.init, vp, yp, (() => A.some(mp)));
    const wp = [or("selector"), yr("execute", bg), yr("moveOnTab", !1)],
        Sp = (e, t, o) => o.focusManager.get(e).bind((n => o.execute(e, t, n))),
        kp = (e, t, o) => {
            pi(e.element, t.selector).each((o => {
                t.focusManager.set(e, o)
            }))
        },
        Cp = (e, t, o) => Jg(e, o.selector, t, -1),
        Op = (e, t, o) => Jg(e, o.selector, t, 1),
        _p = x([lg(ng(Ym), Dg(Cp)), lg(ng(Zm), Dg(Op)), lg(rg([sg, ng(Gm)]), ((e, t, o, n) => o.moveOnTab ? Dg(Cp)(e, t, o, n) : A.none())), lg(rg([ig, ng(Gm)]), ((e, t, o, n) => o.moveOnTab ? Dg(Op)(e, t, o, n) : A.none())), lg(ng($m), Sp), lg(ng(Xm), Sp)]),
        Tp = x([lg(ng(Xm), vg)]);
    var Ep = gg(wp, Oa.init, _p, Tp, (() => A.some(kp)));
    const Ap = [Bi("onSpace"), Bi("onEnter"), Bi("onShiftEnter"), Bi("onLeft"), Bi("onRight"), Bi("onTab"), Bi("onShiftTab"), Bi("onUp"), Bi("onDown"), Bi("onEscape"), yr("stopSpaceKeyup", !1), ur("focusIn")];
    var Mp = gg(Ap, Oa.init, ((e, t, o) => [lg(ng(Xm), o.onSpace), lg(rg([ig, ng($m)]), o.onEnter), lg(rg([sg, ng($m)]), o.onShiftEnter), lg(rg([sg, ng(Gm)]), o.onShiftTab), lg(rg([ig, ng(Gm)]), o.onTab), lg(ng(Ym), o.onUp), lg(ng(Zm), o.onDown), lg(ng(Km), o.onLeft), lg(ng(Jm), o.onRight), lg(ng(Xm), o.onSpace)]), ((e, t, o) => [...o.stopSpaceKeyup ? [lg(ng(Xm), vg)] : [], lg(ng(qm), o.onEscape)]), (e => e.focusIn));
    const Dp = hg.schema(),
        Bp = fg.schema(),
        Fp = sp.schema(),
        Ip = Xg.schema(),
        Rp = xp.schema(),
        Np = wg.schema(),
        Vp = Ep.schema(),
        zp = Mp.schema(),
        Hp = Tl({
            branchKey: "mode",
            branches: Object.freeze({
                __proto__: null,
                acyclic: Dp,
                cyclic: Bp,
                flow: Fp,
                flatgrid: Ip,
                matrix: Rp,
                execution: Np,
                menu: Vp,
                special: zp
            }),
            name: "keying",
            active: {
                events: (e, t) => e.handler.toEvents(e, t)
            },
            apis: {
                focusIn: (e, t, o) => {
                    t.sendFocusIn(t).fold((() => {
                        e.getSystem().triggerFocus(e.element, e.element)
                    }), (n => {
                        n(e, t, o)
                    }))
                },
                setGridSize: (e, t, o, n, r) => {
                    (e => ye(e, "setGridSize"))(o) ? o.setGridSize(n, r): console.error("Layout does not support setGridSize")
                }
            },
            state: kg
        }),
        Lp = (e, t) => {
            Nl((() => {
                ((e, t, o) => {
                    const n = e.components();
                    (e => {
                        L(e.components(), (e => Po(e.element))), Lo(e.element), e.syncComponents()
                    })(e);
                    const r = o(t),
                        s = J(n, r);
                    L(s, (t => {
                        Sd(t), e.getSystem().removeFromWorld(t)
                    })), L(r, (t => {
                        wd(t) ? _d(e, t) : (e.getSystem().addToWorld(t), _d(e, t), yt(e.element) && kd(t))
                    })), e.syncComponents()
                })(e, t, (() => H(t, e.getSystem().build)))
            }), e.element)
        },
        Pp = (e, t) => {
            Nl((() => {
                ((o, n, r) => {
                    const s = o.components(),
                        a = X(n, (e => ka(e).toArray()));
                    L(s, (e => {
                        R(a, e) || Od(e)
                    }));
                    const i = ((e, t, o) => Ka(e, t, ((t, n) => Ya(e, n, t, o))))(e.element, t, e.getSystem().buildOrPatch),
                        l = J(s, i);
                    L(l, (e => {
                        wd(e) && Od(e)
                    })), L(i, (e => {
                        wd(e) || Cd(o, e)
                    })), o.syncComponents()
                })(e, t)
            }), e.element)
        },
        Up = (e, t, o, n) => {
            Od(t);
            const r = Ya(e.element, o, n, e.getSystem().buildOrPatch);
            Cd(e, r), e.syncComponents()
        },
        Wp = (e, t, o) => {
            const n = e.getSystem().build(o);
            Ed(e, n, t)
        },
        jp = (e, t, o, n) => {
            Md(t), Wp(e, ((e, t) => ((e, t, o) => {
                lt(e, o).fold((() => {
                    zo(e, t)
                }), (e => {
                    Ro(e, t)
                }))
            })(e, t, o)), n)
        },
        Gp = (e, t) => e.components(),
        $p = (e, t, o, n, r) => {
            const s = Gp(e);
            return A.from(s[n]).map((o => (r.fold((() => Md(o)), (r => {
                (t.reuseDom ? Up : jp)(e, o, n, r)
            })), o)))
        };
    var qp = Object.freeze({
        __proto__: null,
        append: (e, t, o, n) => {
            Wp(e, zo, n)
        },
        prepend: (e, t, o, n) => {
            Wp(e, Vo, n)
        },
        remove: (e, t, o, n) => {
            const r = Gp(e),
                s = G(r, (e => Ze(n.element, e.element)));
            s.each(Md)
        },
        replaceAt: $p,
        replaceBy: (e, t, o, n, r) => {
            const s = Gp(e);
            return $(s, n).bind((o => $p(e, t, 0, o, r)))
        },
        set: (e, t, o, n) => (t.reuseDom ? Pp : Lp)(e, n),
        contents: Gp
    });
    const Xp = Ol({
            fields: [Cr("reuseDom", !0)],
            name: "replacing",
            apis: qp
        }),
        Kp = (e, t) => {
            const o = ((e, t) => {
                const o = Hs(t);
                return Ol({
                    fields: [or("enabled")],
                    name: e,
                    active: {
                        events: x(o)
                    }
                })
            })(e, t);
            return {
                key: e,
                value: {
                    config: {},
                    me: o,
                    configAsRaw: x({}),
                    initialConfig: {},
                    state: Oa
                }
            }
        },
        Yp = (e, t) => {
            t.ignore || (Dl(e.element), t.onFocus(e))
        };
    var Jp = Object.freeze({
            __proto__: null,
            focus: Yp,
            blur: (e, t) => {
                t.ignore || Bl(e.element)
            },
            isFocused: e => Fl(e.element)
        }),
        Zp = Object.freeze({
            __proto__: null,
            exhibit: (e, t) => {
                const o = t.ignore ? {} : {
                    attributes: {
                        tabindex: "-1"
                    }
                };
                return Ea(o)
            },
            events: e => Hs([Us(is(), ((t, o) => {
                Yp(t, e), o.stop()
            }))].concat(e.stopMousedown ? [Us(Wr(), ((e, t) => {
                t.event.prevent()
            }))] : []))
        }),
        Qp = [Di("onFocus"), yr("stopMousedown", !1), yr("ignore", !1)];
    const eh = Ol({
            fields: Qp,
            name: "focusing",
            active: Zp,
            apis: Jp
        }),
        th = (e, t, o, n) => {
            const r = o.get();
            o.set(n), ((e, t, o) => {
                t.toggleClass.each((t => {
                    o.get() ? La(e.element, t) : Pa(e.element, t)
                }))
            })(e, t, o), ((e, t, o) => {
                const n = t.aria;
                n.update(e, n, o.get())
            })(e, t, o), r !== n && t.onToggled(e, n)
        },
        oh = (e, t, o) => {
            th(e, t, o, !o.get())
        },
        nh = (e, t, o) => {
            th(e, t, o, t.selected)
        };
    var rh = Object.freeze({
            __proto__: null,
            onLoad: nh,
            toggle: oh,
            isOn: (e, t, o) => o.get(),
            on: (e, t, o) => {
                th(e, t, o, !0)
            },
            off: (e, t, o) => {
                th(e, t, o, !1)
            },
            set: th
        }),
        sh = Object.freeze({
            __proto__: null,
            exhibit: () => Ea({}),
            events: (e, t) => {
                const o = (n = e, r = t, s = oh, Qs((e => {
                    s(e, n, r)
                })));
                var n, r, s;
                const a = xl(e, t, nh);
                return Hs(q([e.toggleOnExecute ? [o] : [],
                    [a]
                ]))
            }
        });
    const ah = (e, t, o) => {
        kt(e.element, "aria-expanded", o)
    };
    var ih = [yr("selected", !1), ur("toggleClass"), yr("toggleOnExecute", !0), Di("onToggled"), xr("aria", {
        mode: "none"
    }, Jn("mode", {
        pressed: [yr("syncWithExpanded", !1), Ri("update", ((e, t, o) => {
            kt(e.element, "aria-pressed", o), t.syncWithExpanded && ah(e, 0, o)
        }))],
        checked: [Ri("update", ((e, t, o) => {
            kt(e.element, "aria-checked", o)
        }))],
        expanded: [Ri("update", ah)],
        selected: [Ri("update", ((e, t, o) => {
            kt(e.element, "aria-selected", o)
        }))],
        none: [Ri("update", b)]
    }))];
    const lh = Ol({
        fields: ih,
        name: "toggling",
        active: sh,
        apis: rh,
        state: (!1, {
            init: () => {
                const e = Er(false);
                return {
                    get: () => e.get(),
                    set: t => e.set(t),
                    clear: () => e.set(false),
                    readState: () => e.get()
                }
            }
        })
    });
    const ch = () => {
            const e = (e, t) => {
                t.stop(), Rs(e)
            };
            return [Us(es(), e), Us(gs(), e), qs(Hr()), qs(Wr())]
        },
        dh = e => Hs(q([e.map((e => Qs(((t, o) => {
            e(t), o.stop()
        })))).toArray(), ch()])),
        uh = "alloy.item-hover",
        mh = "alloy.item-focus",
        gh = "alloy.item-toggled",
        ph = e => {
            (Rl(e.element).isNone() || eh.isFocused(e)) && (eh.isFocused(e) || eh.focus(e), Is(e, uh, {
                item: e
            }))
        },
        hh = e => {
            Is(e, mh, {
                item: e
            })
        },
        fh = x(uh),
        bh = x(mh),
        vh = x(gh),
        yh = e => e.toggling.map((e => e.exclusive ? "menuitemradio" : "menuitemcheckbox")).getOr("menuitem"),
        xh = [or("data"), or("components"), or("dom"), yr("hasSubmenu", !1), ur("toggling"), fu("itemBehaviours", [lh, eh, Hp, mu]), yr("ignoreFocus", !1), yr("domModification", {}), Ri("builder", (e => ({
            dom: e.dom,
            domModification: {
                ...e.domModification,
                attributes: {
                    role: yh(e),
                    ...e.domModification.attributes,
                    "aria-haspopup": e.hasSubmenu,
                    ...e.hasSubmenu ? {
                        "aria-expanded": !1
                    } : {}
                }
            },
            behaviours: bu(e.itemBehaviours, [e.toggling.fold(lh.revoke, (e => lh.config((e => ({
                aria: {
                    mode: "checked"
                },
                ...ge(e, ((e, t) => "exclusive" !== t)),
                onToggled: (t, o) => {
                    p(e.onToggled) && e.onToggled(t, o), ((e, t) => {
                        Is(e, gh, {
                            item: e,
                            state: t
                        })
                    })(t, o)
                }
            }))(e)))), eh.config({
                ignore: e.ignoreFocus,
                stopMousedown: e.ignoreFocus,
                onFocus: e => {
                    hh(e)
                }
            }), Hp.config({
                mode: "execution"
            }), mu.config({
                store: {
                    mode: "memory",
                    initialValue: e.data
                }
            }), Kp("item-type-events", [...ch(), Us(qr(), ph), Us(ms(), eh.focus)])]),
            components: e.components,
            eventOrder: e.eventOrder
        }))), yr("eventOrder", {})],
        wh = [or("dom"), or("components"), Ri("builder", (e => ({
            dom: e.dom,
            components: e.components,
            events: Hs([Xs(ms())])
        })))],
        Sh = x("item-widget"),
        kh = x([Lu({
            name: "widget",
            overrides: e => ({
                behaviours: kl([mu.config({
                    store: {
                        mode: "manual",
                        getValue: t => e.data,
                        setValue: b
                    }
                })])
            })
        })]),
        Ch = [or("uid"), or("data"), or("components"), or("dom"), yr("autofocus", !1), yr("ignoreFocus", !1), fu("widgetBehaviours", [mu, eh, Hp]), yr("domModification", {}), im(kh()), Ri("builder", (e => {
            const t = Zu(Sh(), e, kh()),
                o = Qu(Sh(), e, t.internals()),
                n = t => em(t, e, "widget").map((e => (Hp.focusIn(e), e))),
                r = (t, o) => fm(o.event.target) ? A.none() : e.autofocus ? (o.setSource(t.element), A.none()) : A.none();
            return {
                dom: e.dom,
                components: o,
                domModification: e.domModification,
                events: Hs([Qs(((e, t) => {
                    n(e).each((e => {
                        t.stop()
                    }))
                })), Us(qr(), ph), Us(ms(), ((t, o) => {
                    e.autofocus ? n(t) : eh.focus(t)
                }))]),
                behaviours: bu(e.widgetBehaviours, [mu.config({
                    store: {
                        mode: "memory",
                        initialValue: e.data
                    }
                }), eh.config({
                    ignore: e.ignoreFocus,
                    onFocus: e => {
                        hh(e)
                    }
                }), Hp.config({
                    mode: "special",
                    focusIn: e.autofocus ? e => {
                        n(e)
                    } : El(),
                    onLeft: r,
                    onRight: r,
                    onEscape: (t, o) => eh.isFocused(t) || e.autofocus ? e.autofocus ? (o.setSource(t.element), A.none()) : A.none() : (eh.focus(t), A.some(!0))
                })])
            }
        }))],
        Oh = Jn("type", {
            widget: Ch,
            item: xh,
            separator: wh
        }),
        _h = x([Wu({
            factory: {
                sketch: e => {
                    const t = Kn("menu.spec item", Oh, e);
                    return t.builder(t)
                }
            },
            name: "items",
            unit: "item",
            defaults: (e, t) => ve(t, "uid") ? t : {
                ...t,
                uid: ha("item")
            },
            overrides: (e, t) => ({
                type: t.type,
                ignoreFocus: e.fakeFocus,
                domModification: {
                    classes: [e.markers.item]
                }
            })
        })]),
        Th = x([or("value"), or("items"), or("dom"), or("components"), yr("eventOrder", {}), gu("menuBehaviours", [Wm, mu, ym, Hp]), xr("movement", {
            mode: "menu",
            moveOnTab: !0
        }, Jn("mode", {
            grid: [Vi(), Ri("config", ((e, t) => ({
                mode: "flatgrid",
                selector: "." + e.markers.item,
                initSize: {
                    numColumns: t.initSize.numColumns,
                    numRows: t.initSize.numRows
                },
                focusManager: e.focusManager
            })))],
            matrix: [Ri("config", ((e, t) => ({
                mode: "matrix",
                selectors: {
                    row: t.rowSelector,
                    cell: "." + e.markers.item
                },
                previousSelector: t.previousSelector,
                focusManager: e.focusManager
            }))), or("rowSelector"), yr("previousSelector", A.none)],
            menu: [yr("moveOnTab", !0), Ri("config", ((e, t) => ({
                mode: "menu",
                selector: "." + e.markers.item,
                moveOnTab: t.moveOnTab,
                focusManager: e.focusManager
            })))]
        })), nr("markers", _i()), yr("fakeFocus", !1), yr("focusManager", dg()), Di("onHighlight"), Di("onDehighlight")]),
        Eh = x("alloy.menu-focus"),
        Ah = hm({
            name: "Menu",
            configFields: Th(),
            partFields: _h(),
            factory: (e, t, o, n) => ({
                uid: e.uid,
                dom: e.dom,
                markers: e.markers,
                behaviours: hu(e.menuBehaviours, [Wm.config({
                    highlightClass: e.markers.selectedItem,
                    itemClass: e.markers.item,
                    onHighlight: e.onHighlight,
                    onDehighlight: e.onDehighlight
                }), mu.config({
                    store: {
                        mode: "memory",
                        initialValue: e.value
                    }
                }), ym.config({
                    find: A.some
                }), Hp.config(e.movement.config(e, e.movement))]),
                events: Hs([Us(bh(), ((e, t) => {
                    const o = t.event;
                    e.getSystem().getByDom(o.target).each((o => {
                        Wm.highlight(e, o), t.stop(), Is(e, Eh(), {
                            menu: e,
                            item: o
                        })
                    }))
                })), Us(fh(), ((e, t) => {
                    const o = t.event.item;
                    Wm.highlight(e, o)
                })), Us(vh(), ((e, t) => {
                    const {
                        item: o,
                        state: n
                    } = t.event;
                    n && "menuitemradio" === Ot(o.element, "role") && ((e, t) => {
                        const o = qc(e.element, '[role="menuitemradio"][aria-checked="true"]');
                        L(o, (o => {
                            Ze(o, t.element) || e.getSystem().getByDom(o).each((e => {
                                lh.off(e)
                            }))
                        }))
                    })(e, o)
                }))]),
                components: t,
                eventOrder: e.eventOrder,
                domModification: {
                    attributes: {
                        role: "menu"
                    }
                }
            })
        }),
        Mh = (e, t, o, n) => be(o, n).bind((n => be(e, n).bind((n => {
            const r = Mh(e, t, o, n);
            return A.some([n].concat(r))
        })))).getOr([]),
        Dh = e => "prepared" === e.type ? A.some(e.menu) : A.none(),
        Bh = () => {
            const e = Er({}),
                t = Er({}),
                o = Er({}),
                n = Ql(),
                r = Er({}),
                s = e => a(e).bind(Dh),
                a = e => be(t.get(), e),
                i = t => be(e.get(), t);
            return {
                setMenuBuilt: (e, o) => {
                    t.set({
                        ...t.get(),
                        [e]: {
                            type: "prepared",
                            menu: o
                        }
                    })
                },
                setContents: (s, a, i, l) => {
                    n.set(s), e.set(i), t.set(a), r.set(l);
                    const c = ((e, t) => {
                        const o = {};
                        le(e, ((e, t) => {
                            L(e, (e => {
                                o[e] = t
                            }))
                        }));
                        const n = t,
                            r = de(t, ((e, t) => ({
                                k: e,
                                v: t
                            }))),
                            s = ce(r, ((e, t) => [t].concat(Mh(o, n, r, t))));
                        return ce(o, (e => be(s, e).getOr([e])))
                    })(l, i);
                    o.set(c)
                },
                expand: t => be(e.get(), t).map((e => {
                    const n = be(o.get(), t).getOr([]);
                    return [e].concat(n)
                })),
                refresh: e => be(o.get(), e),
                collapse: e => be(o.get(), e).bind((e => e.length > 1 ? A.some(e.slice(1)) : A.none())),
                lookupMenu: a,
                lookupItem: i,
                otherMenus: e => {
                    const t = r.get();
                    return J(ae(t), e)
                },
                getPrimary: () => n.get().bind(s),
                getMenus: () => t.get(),
                clear: () => {
                    e.set({}), t.set({}), o.set({}), n.clear()
                },
                isClear: () => n.get().isNone(),
                getTriggeringPath: (t, r) => {
                    const a = U(i(t).toArray(), (e => s(e).isSome()));
                    return be(o.get(), t).bind((t => {
                        const o = Y(a.concat(t));
                        return (e => {
                            const t = [];
                            for (let o = 0; o < e.length; o++) {
                                const n = e[o];
                                if (!n.isSome()) return A.none();
                                t.push(n.getOrDie())
                            }
                            return A.some(t)
                        })(X(o, ((t, a) => ((t, o, n) => s(t).bind((r => (t => he(e.get(), ((e, o) => e === t)))(t).bind((e => o(e).map((e => ({
                            triggeredMenu: r,
                            triggeringItem: e,
                            triggeringPath: n
                        }))))))))(t, r, o.slice(0, a + 1)).fold((() => xe(n.get(), t) ? [] : [A.none()]), (e => [A.some(e)])))))
                    }))
                }
            }
        },
        Fh = Dh,
        Ih = la("tiered-menu-item-highlight"),
        Rh = la("tiered-menu-item-dehighlight");
    var Nh;
    ! function (e) {
        e[e.HighlightMenuAndItem = 0] = "HighlightMenuAndItem", e[e.HighlightJustMenu = 1] = "HighlightJustMenu", e[e.HighlightNone = 2] = "HighlightNone"
    }(Nh || (Nh = {}));
    const Vh = x("collapse-item"),
        zh = pm({
            name: "TieredMenu",
            configFields: [Ii("onExecute"), Ii("onEscape"), Fi("onOpenMenu"), Fi("onOpenSubmenu"), Di("onRepositionMenu"), Di("onCollapseMenu"), yr("highlightOnOpen", Nh.HighlightMenuAndItem), lr("data", [or("primary"), or("menus"), or("expansions")]), yr("fakeFocus", !1), Di("onHighlightItem"), Di("onDehighlightItem"), Di("onHover"), Ei(), or("dom"), yr("navigateOnHover", !0), yr("stayInDom", !1), gu("tmenuBehaviours", [Hp, Wm, ym, Xp]), yr("eventOrder", {})],
            apis: {
                collapseMenu: (e, t) => {
                    e.collapseMenu(t)
                },
                highlightPrimary: (e, t) => {
                    e.highlightPrimary(t)
                },
                repositionMenus: (e, t) => {
                    e.repositionMenus(t)
                }
            },
            factory: (e, t) => {
                const o = Ql(),
                    n = Bh(),
                    r = e => mu.getValue(e).value,
                    s = t => ce(e.data.menus, ((e, t) => X(e.items, (e => "separator" === e.type ? [] : [e.data.value])))),
                    a = Wm.highlight,
                    i = (t, o) => {
                        a(t, o), Wm.getHighlighted(o).orThunk((() => Wm.getFirst(o))).each((n => {
                            e.fakeFocus ? Wm.highlight(o, n) : Ns(t, n.element, ms())
                        }))
                    },
                    l = (e, t) => we(H(t, (t => e.lookupMenu(t).bind((e => "prepared" === e.type ? A.some(e.menu) : A.none()))))),
                    c = (t, o, n) => {
                        const r = l(o, o.otherMenus(n));
                        L(r, (o => {
                            ja(o.element, [e.markers.backgroundMenu]), e.stayInDom || Xp.remove(t, o)
                        }))
                    },
                    d = (t, n) => {
                        const s = (t => o.get().getOrThunk((() => {
                            const n = {},
                                s = qc(t.element, `.${e.markers.item}`),
                                a = U(s, (e => "true" === Ot(e, "aria-haspopup")));
                            return L(a, (e => {
                                t.getSystem().getByDom(e).each((e => {
                                    const t = r(e);
                                    n[t] = e
                                }))
                            })), o.set(n), n
                        })))(t);
                        le(s, ((e, t) => {
                            const o = R(n, t);
                            kt(e.element, "aria-expanded", o)
                        }))
                    },
                    u = (t, o, n) => A.from(n[0]).bind((r => o.lookupMenu(r).bind((r => {
                        if ("notbuilt" === r.type) return A.none(); {
                            const s = r.menu,
                                a = l(o, n.slice(1));
                            return L(a, (t => {
                                La(t.element, e.markers.backgroundMenu)
                            })), yt(s.element) || Xp.append(t, ai(s)), ja(s.element, [e.markers.backgroundMenu]), i(t, s), c(t, o, n), A.some(s)
                        }
                    }))));
                let m;
                ! function (e) {
                    e[e.HighlightSubmenu = 0] = "HighlightSubmenu", e[e.HighlightParent = 1] = "HighlightParent"
                }(m || (m = {}));
                const g = (t, o, s = m.HighlightSubmenu) => {
                        if (o.hasConfigured(Fm) && Fm.isDisabled(o)) return A.some(o); {
                            const a = r(o);
                            return n.expand(a).bind((r => (d(t, r), A.from(r[0]).bind((a => n.lookupMenu(a).bind((i => {
                                const l = ((e, t, o) => {
                                    if ("notbuilt" === o.type) {
                                        const r = e.getSystem().build(o.nbMenu());
                                        return n.setMenuBuilt(t, r), r
                                    }
                                    return o.menu
                                })(t, a, i);
                                return yt(l.element) || Xp.append(t, ai(l)), e.onOpenSubmenu(t, o, l, Y(r)), s === m.HighlightSubmenu ? (Wm.highlightFirst(l), u(t, n, r)) : (Wm.dehighlightAll(l), A.some(o))
                            })))))))
                        }
                    },
                    p = (t, o) => {
                        const s = r(o);
                        return n.collapse(s).bind((r => (d(t, r), u(t, n, r).map((n => (e.onCollapseMenu(t, o, n), n))))))
                    },
                    h = t => (o, n) => hi(n.getSource(), `.${e.markers.item}`).bind((e => o.getSystem().getByDom(e).toOptional().bind((e => t(o, e).map(E))))),
                    f = Hs([Us(Eh(), ((e, t) => {
                        const o = t.event.item;
                        n.lookupItem(r(o)).each((() => {
                            const o = t.event.menu;
                            Wm.highlight(e, o);
                            const s = r(t.event.item);
                            n.refresh(s).each((t => c(e, n, t)))
                        }))
                    })), Qs(((t, o) => {
                        const n = o.event.target;
                        t.getSystem().getByDom(n).each((o => {
                            0 === r(o).indexOf("collapse-item") && p(t, o), g(t, o, m.HighlightSubmenu).fold((() => {
                                e.onExecute(t, o)
                            }), b)
                        }))
                    })), Ys(((t, o) => {
                        (t => {
                            const o = ((t, o, n) => ce(n, ((n, r) => {
                                    const s = () => Ah.sketch({
                                        ...n,
                                        value: r,
                                        markers: e.markers,
                                        fakeFocus: e.fakeFocus,
                                        onHighlight: (e, t) => {
                                            Is(e, Ih, {
                                                menuComp: e,
                                                itemComp: t
                                            })
                                        },
                                        onDehighlight: (e, t) => {
                                            Is(e, Rh, {
                                                menuComp: e,
                                                itemComp: t
                                            })
                                        },
                                        focusManager: e.fakeFocus ? ug() : dg()
                                    });
                                    return r === o ? {
                                        type: "prepared",
                                        menu: t.getSystem().build(s())
                                    } : {
                                        type: "notbuilt",
                                        nbMenu: s
                                    }
                                })))(t, e.data.primary, e.data.menus),
                                r = s();
                            return n.setContents(e.data.primary, o, e.data.expansions, r), n.getPrimary()
                        })(t).each((o => {
                            Xp.append(t, ai(o)), e.onOpenMenu(t, o), e.highlightOnOpen === Nh.HighlightMenuAndItem ? i(t, o) : e.highlightOnOpen === Nh.HighlightJustMenu && a(t, o)
                        }))
                    })), Us(Ih, ((t, o) => {
                        e.onHighlightItem(t, o.event.menuComp, o.event.itemComp)
                    })), Us(Rh, ((t, o) => {
                        e.onDehighlightItem(t, o.event.menuComp, o.event.itemComp)
                    })), ...e.navigateOnHover ? [Us(fh(), ((t, o) => {
                        const s = o.event.item;
                        ((e, t) => {
                            const o = r(t);
                            n.refresh(o).bind((t => (d(e, t), u(e, n, t))))
                        })(t, s), g(t, s, m.HighlightParent), e.onHover(t, s)
                    }))] : []]),
                    v = e => Wm.getHighlighted(e).bind(Wm.getHighlighted),
                    y = {
                        collapseMenu: e => {
                            v(e).each((t => {
                                p(e, t)
                            }))
                        },
                        highlightPrimary: e => {
                            n.getPrimary().each((t => {
                                i(e, t)
                            }))
                        },
                        repositionMenus: t => {
                            const o = n.getPrimary().bind((e => v(t).bind((e => {
                                const t = r(e),
                                    o = fe(n.getMenus()),
                                    s = we(H(o, Fh));
                                return n.getTriggeringPath(t, (e => ((e, t, o) => se(t, (e => {
                                    if (!e.getSystem().isConnected()) return A.none();
                                    const t = Wm.getCandidates(e);
                                    return G(t, (e => r(e) === o))
                                })))(0, s, e)))
                            })).map((t => ({
                                primary: e,
                                triggeringPath: t
                            })))));
                            o.fold((() => {
                                (e => A.from(e.components()[0]).filter((e => "menu" === Ot(e.element, "role"))))(t).each((o => {
                                    e.onRepositionMenu(t, o, [])
                                }))
                            }), (({
                                primary: o,
                                triggeringPath: n
                            }) => {
                                e.onRepositionMenu(t, o, n)
                            }))
                        }
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    markers: e.markers,
                    behaviours: hu(e.tmenuBehaviours, [Hp.config({
                        mode: "special",
                        onRight: h(((e, t) => fm(t.element) ? A.none() : g(e, t, m.HighlightSubmenu))),
                        onLeft: h(((e, t) => fm(t.element) ? A.none() : p(e, t))),
                        onEscape: h(((t, o) => p(t, o).orThunk((() => e.onEscape(t, o).map((() => t)))))),
                        focusIn: (e, t) => {
                            n.getPrimary().each((t => {
                                Ns(e, t.element, ms())
                            }))
                        }
                    }), Wm.config({
                        highlightClass: e.markers.selectedMenu,
                        itemClass: e.markers.menu
                    }), ym.config({
                        find: e => Wm.getHighlighted(e)
                    }), Xp.config({})]),
                    eventOrder: e.eventOrder,
                    apis: y,
                    events: f
                }
            },
            extraApis: {
                tieredData: (e, t, o) => ({
                    primary: e,
                    menus: t,
                    expansions: o
                }),
                singleData: (e, t) => ({
                    primary: e,
                    menus: Mr(e, t),
                    expansions: {}
                }),
                collapseItem: e => ({
                    value: la(Vh()),
                    meta: {
                        text: e
                    }
                })
            }
        }),
        Hh = pm({
            name: "InlineView",
            configFields: [or("lazySink"), Di("onShow"), Di("onHide"), fr("onEscape"), gu("inlineBehaviours", [$d, mu, Al]), vr("fireDismissalEventInstead", [yr("event", Cs())]), vr("fireRepositionEventInstead", [yr("event", Os())]), yr("getRelated", A.none), yr("isExtraPart", T), yr("eventOrder", A.none)],
            factory: (e, t) => {
                const o = (t, o, n, r) => {
                        const s = e.lazySink(t).getOrDie();
                        $d.openWhileCloaked(t, o, (() => xd.positionWithinBounds(s, t, n, r()))), mu.setValue(t, A.some({
                            mode: "position",
                            config: n,
                            getBounds: r
                        }))
                    },
                    n = (t, o, n, r) => {
                        const s = ((e, t, o, n, r) => {
                            const s = () => e.lazySink(t),
                                a = "horizontal" === n.type ? {
                                    layouts: {
                                        onLtr: () => fl(),
                                        onRtl: () => bl()
                                    }
                                } : {},
                                i = e => (e => 2 === e.length)(e) ? a : {};
                            return zh.sketch({
                                dom: {
                                    tag: "div"
                                },
                                data: n.data,
                                markers: n.menu.markers,
                                highlightOnOpen: n.menu.highlightOnOpen,
                                fakeFocus: n.menu.fakeFocus,
                                onEscape: () => ($d.close(t), e.onEscape.map((e => e(t))), A.some(!0)),
                                onExecute: () => A.some(!0),
                                onOpenMenu: (e, t) => {
                                    xd.positionWithinBounds(s().getOrDie(), t, o, r())
                                },
                                onOpenSubmenu: (e, t, o, n) => {
                                    const r = s().getOrDie();
                                    xd.position(r, o, {
                                        anchor: {
                                            type: "submenu",
                                            item: t,
                                            ...i(n)
                                        }
                                    })
                                },
                                onRepositionMenu: (e, t, n) => {
                                    const a = s().getOrDie();
                                    xd.positionWithinBounds(a, t, o, r()), L(n, (e => {
                                        const t = i(e.triggeringPath);
                                        xd.position(a, e.triggeredMenu, {
                                            anchor: {
                                                type: "submenu",
                                                item: e.triggeringItem,
                                                ...t
                                            }
                                        })
                                    }))
                                }
                            })
                        })(e, t, o, n, r);
                        $d.open(t, s), mu.setValue(t, A.some({
                            mode: "menu",
                            menu: s
                        }))
                    },
                    r = t => {
                        $d.isOpen(t) && mu.getValue(t).each((o => {
                            switch (o.mode) {
                                case "menu":
                                    $d.getState(t).each(zh.repositionMenus);
                                    break;
                                case "position":
                                    const n = e.lazySink(t).getOrDie();
                                    xd.positionWithinBounds(n, t, o.config, o.getBounds())
                            }
                        }))
                    },
                    s = {
                        setContent: (e, t) => {
                            $d.setContent(e, t)
                        },
                        showAt: (e, t, n) => {
                            const r = A.none;
                            o(e, t, n, r)
                        },
                        showWithinBounds: o,
                        showMenuAt: (e, t, o) => {
                            n(e, t, o, A.none)
                        },
                        showMenuWithinBounds: n,
                        hide: e => {
                            $d.isOpen(e) && (mu.setValue(e, A.none()), $d.close(e))
                        },
                        getContent: e => $d.getState(e),
                        reposition: r,
                        isOpen: $d.isOpen
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    behaviours: hu(e.inlineBehaviours, [$d.config({
                        isPartOf: (t, o, n) => vi(o, n) || ((t, o) => e.getRelated(t).exists((e => vi(e, o))))(t, n),
                        getAttachPoint: t => e.lazySink(t).getOrDie(),
                        onOpen: t => {
                            e.onShow(t)
                        },
                        onClose: t => {
                            e.onHide(t)
                        }
                    }), mu.config({
                        store: {
                            mode: "memory",
                            initialValue: A.none()
                        }
                    }), Al.config({
                        channels: {
                            ...Jd({
                                isExtraPart: t.isExtraPart,
                                ...e.fireDismissalEventInstead.map((e => ({
                                    fireEventInstead: {
                                        event: e.event
                                    }
                                }))).getOr({})
                            }),
                            ...Qd({
                                ...e.fireRepositionEventInstead.map((e => ({
                                    fireEventInstead: {
                                        event: e.event
                                    }
                                }))).getOr({}),
                                doReposition: r
                            })
                        }
                    })]),
                    eventOrder: e.eventOrder,
                    apis: s
                }
            },
            apis: {
                showAt: (e, t, o, n) => {
                    e.showAt(t, o, n)
                },
                showWithinBounds: (e, t, o, n, r) => {
                    e.showWithinBounds(t, o, n, r)
                },
                showMenuAt: (e, t, o, n) => {
                    e.showMenuAt(t, o, n)
                },
                showMenuWithinBounds: (e, t, o, n, r) => {
                    e.showMenuWithinBounds(t, o, n, r)
                },
                hide: (e, t) => {
                    e.hide(t)
                },
                isOpen: (e, t) => e.isOpen(t),
                getContent: (e, t) => e.getContent(t),
                setContent: (e, t, o) => {
                    e.setContent(t, o)
                },
                reposition: (e, t) => {
                    e.reposition(t)
                }
            }
        });
    var Lh = tinymce.util.Tools.resolve("tinymce.util.Delay");
    const Ph = pm({
            name: "Button",
            factory: e => {
                const t = dh(e.action),
                    o = e.dom.tag,
                    n = t => be(e.dom, "attributes").bind((e => be(e, t)));
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: e.components,
                    events: t,
                    behaviours: bu(e.buttonBehaviours, [eh.config({}), Hp.config({
                        mode: "execution",
                        useSpace: !0,
                        useEnter: !0
                    })]),
                    domModification: {
                        attributes: "button" === o ? {
                            type: n("type").getOr("button"),
                            ...n("role").map((e => ({
                                role: e
                            }))).getOr({})
                        } : {
                            role: e.role.getOr(n("role").getOr("button"))
                        }
                    },
                    eventOrder: e.eventOrder
                }
            },
            configFields: [yr("uid", void 0), or("dom"), yr("components", []), fu("buttonBehaviours", [eh, Hp]), ur("action"), ur("role"), yr("eventOrder", {})]
        }),
        Uh = e => {
            const t = (e => void 0 !== e.uid)(e) && ye(e, "uid") ? e.uid : ha("memento");
            return {
                get: e => e.getSystem().getByUid(t).getOrDie(),
                getOpt: e => e.getSystem().getByUid(t).toOptional(),
                asSpec: () => ({
                    ...e,
                    uid: t
                })
            }
        };
    var Wh = tinymce.util.Tools.resolve("tinymce.util.I18n");
    const jh = {
            indent: !0,
            outdent: !0,
            "table-insert-column-after": !0,
            "table-insert-column-before": !0,
            "paste-column-after": !0,
            "paste-column-before": !0,
            "unordered-list": !0,
            "list-bull-circle": !0,
            "list-bull-default": !0,
            "list-bull-square": !0
        },
        Gh = "temporary-placeholder",
        $h = e => () => be(e, Gh).getOr("!not found!"),
        qh = (e, t) => {
            const o = e.toLowerCase();
            if (Wh.isRtl()) {
                const e = ((e, t) => Ae(e, t) ? e : ((e, t) => e + "-rtl")(e))(o, "-rtl");
                return ve(t, e) ? e : o
            }
            return o
        },
        Xh = (e, t) => be(t, qh(e, t)),
        Kh = (e, t) => {
            const o = t();
            return Xh(e, o).getOrThunk($h(o))
        },
        Yh = () => Kp("add-focusable", [Ys((e => {
            gi(e.element, "svg").each((e => kt(e, "focusable", "false")))
        }))]),
        Jh = (e, t, o, n) => {
            var r, s;
            const a = (e => !!Wh.isRtl() && ve(jh, e))(t) ? ["tox-icon--flip"] : [],
                i = be(o, qh(t, o)).or(n).getOrThunk($h(o));
            return {
                dom: {
                    tag: e.tag,
                    attributes: null !== (r = e.attributes) && void 0 !== r ? r : {},
                    classes: e.classes.concat(a),
                    innerHtml: i
                },
                behaviours: kl([...null !== (s = e.behaviours) && void 0 !== s ? s : [], Yh()])
            }
        },
        Zh = (e, t, o, n = A.none()) => Jh(t, e, o(), n),
        Qh = {
            success: "checkmark",
            error: "warning",
            err: "error",
            warning: "warning",
            warn: "warning",
            info: "info"
        },
        ef = pm({
            name: "Notification",
            factory: e => {
                const t = Uh({
                        dom: {
                            tag: "p",
                            innerHtml: e.translationProvider(e.text)
                        },
                        behaviours: kl([Xp.config({})])
                    }),
                    o = e => ({
                        dom: {
                            tag: "div",
                            classes: ["tox-bar"],
                            styles: {
                                width: `${e}%`
                            }
                        }
                    }),
                    n = e => ({
                        dom: {
                            tag: "div",
                            classes: ["tox-text"],
                            innerHtml: `${e}%`
                        }
                    }),
                    r = Uh({
                        dom: {
                            tag: "div",
                            classes: e.progress ? ["tox-progress-bar", "tox-progress-indicator"] : ["tox-progress-bar"]
                        },
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-bar-container"]
                            },
                            components: [o(0)]
                        }, n(0)],
                        behaviours: kl([Xp.config({})])
                    }),
                    s = {
                        updateProgress: (e, t) => {
                            e.getSystem().isConnected() && r.getOpt(e).each((e => {
                                Xp.set(e, [{
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-bar-container"]
                                    },
                                    components: [o(t)]
                                }, n(t)])
                            }))
                        },
                        updateText: (e, o) => {
                            if (e.getSystem().isConnected()) {
                                const n = t.get(e);
                                Xp.set(n, [ti(o)])
                            }
                        }
                    },
                    a = q([e.icon.toArray(), e.level.toArray(), e.level.bind((e => A.from(Qh[e]))).toArray()]),
                    i = Uh(Ph.sketch({
                        dom: {
                            tag: "button",
                            classes: ["tox-notification__dismiss", "tox-button", "tox-button--naked", "tox-button--icon"]
                        },
                        components: [Zh("close", {
                            tag: "div",
                            classes: ["tox-icon"],
                            attributes: {
                                "aria-label": e.translationProvider("Close")
                            }
                        }, e.iconProvider)],
                        action: t => {
                            e.onAction(t)
                        }
                    })),
                    l = ((e, t, o) => {
                        const n = o(),
                            r = G(e, (e => ve(n, qh(e, n))));
                        return Jh({
                            tag: "div",
                            classes: ["tox-notification__icon"]
                        }, r.getOr(Gh), n, A.none())
                    })(a, 0, e.iconProvider),
                    c = [l, {
                        dom: {
                            tag: "div",
                            classes: ["tox-notification__body"]
                        },
                        components: [t.asSpec()],
                        behaviours: kl([Xp.config({})])
                    }];
                return {
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        attributes: {
                            role: "alert"
                        },
                        classes: e.level.map((e => ["tox-notification", "tox-notification--in", `tox-notification--${e}`])).getOr(["tox-notification", "tox-notification--in"])
                    },
                    behaviours: kl([eh.config({}), Kp("notification-events", [Us(Xr(), (e => {
                        i.getOpt(e).each(eh.focus)
                    }))])]),
                    components: c.concat(e.progress ? [r.asSpec()] : []).concat(e.closeButton ? [i.asSpec()] : []),
                    apis: s
                }
            },
            configFields: [ur("level"), or("progress"), ur("icon"), or("onAction"), or("text"), or("iconProvider"), or("translationProvider"), Cr("closeButton", !0)],
            apis: {
                updateProgress: (e, t, o) => {
                    e.updateProgress(t, o)
                },
                updateText: (e, t, o) => {
                    e.updateText(t, o)
                }
            }
        });
    var tf, of , nf = tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),
        rf = tinymce.util.Tools.resolve("tinymce.EditorManager"),
        sf = tinymce.util.Tools.resolve("tinymce.Env");
    ! function (e) {
        e.default = "wrap", e.floating = "floating", e.sliding = "sliding", e.scrolling = "scrolling"
    }(tf || (tf = {})),
    function (e) {
        e.auto = "auto", e.top = "top", e.bottom = "bottom"
    }( of || ( of = {}));
    const af = e => t => t.options.get(e),
        lf = e => t => A.from(e(t)),
        cf = e => {
            const t = sf.deviceType.isPhone(),
                o = sf.deviceType.isTablet() || t,
                n = e.options.register,
                r = e => s(e) || !1 === e,
                a = e => s(e) || h(e);
            n("skin", {
                processor: e => s(e) || !1 === e,
                default: "oxide"
            }), n("skin_url", {
                processor: "string"
            }), n("height", {
                processor: a,
                default: Math.max(e.getElement().offsetHeight, 400)
            }), n("width", {
                processor: a,
                default: nf.DOM.getStyle(e.getElement(), "width")
            }), n("min_height", {
                processor: "number",
                default: 100
            }), n("min_width", {
                processor: "number"
            }), n("max_height", {
                processor: "number"
            }), n("max_width", {
                processor: "number"
            }), n("style_formats", {
                processor: "object[]"
            }), n("style_formats_merge", {
                processor: "boolean",
                default: !1
            }), n("style_formats_autohide", {
                processor: "boolean",
                default: !1
            }), n("line_height_formats", {
                processor: "string",
                default: "1 1.1 1.2 1.3 1.4 1.5 2"
            }), n("font_family_formats", {
                processor: "string",
                default: "Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats"
            }), n("font_size_formats", {
                processor: "string",
                default: "8pt 10pt 12pt 14pt 18pt 24pt 36pt"
            }), n("font_size_input_default_unit", {
                processor: "string",
                default: "pt"
            }), n("block_formats", {
                processor: "string",
                default: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre"
            }), n("content_langs", {
                processor: "object[]"
            }), n("removed_menuitems", {
                processor: "string",
                default: ""
            }), n("menubar", {
                processor: e => s(e) || d(e),
                default: !t
            }), n("menu", {
                processor: "object",
                default: {}
            }), n("toolbar", {
                processor: e => d(e) || s(e) || l(e) ? {
                    value: e,
                    valid: !0
                } : {
                    valid: !1,
                    message: "Must be a boolean, string or array."
                },
                default: !0
            }), V(9, (e => {
                n("toolbar" + (e + 1), {
                    processor: "string"
                })
            })), n("toolbar_mode", {
                processor: "string",
                default: o ? "scrolling" : "floating"
            }), n("toolbar_groups", {
                processor: "object",
                default: {}
            }), n("toolbar_location", {
                processor: "string",
                default: of .auto
            }), n("toolbar_persist", {
                processor: "boolean",
                default: !1
            }), n("toolbar_sticky", {
                processor: "boolean",
                default: e.inline
            }), n("toolbar_sticky_offset", {
                processor: "number",
                default: 0
            }), n("fixed_toolbar_container", {
                processor: "string",
                default: ""
            }), n("fixed_toolbar_container_target", {
                processor: "object"
            }), n("ui_mode", {
                processor: "string",
                default: "combined"
            }), n("file_picker_callback", {
                processor: "function"
            }), n("file_picker_validator_handler", {
                processor: "function"
            }), n("file_picker_types", {
                processor: "string"
            }), n("typeahead_urls", {
                processor: "boolean",
                default: !0
            }), n("anchor_top", {
                processor: r,
                default: "#top"
            }), n("anchor_bottom", {
                processor: r,
                default: "#bottom"
            }), n("draggable_modal", {
                processor: "boolean",
                default: !1
            }), n("statusbar", {
                processor: "boolean",
                default: !0
            }), n("elementpath", {
                processor: "boolean",
                default: !0
            }), n("branding", {
                processor: "boolean",
                default: !0
            }), n("promotion", {
                processor: "boolean",
                default: !0
            }), n("resize", {
                processor: e => "both" === e || d(e),
                default: !sf.deviceType.isTouch()
            }), n("sidebar_show", {
                processor: "string"
            })
        },
        df = af("readonly"),
        uf = af("height"),
        mf = af("width"),
        gf = lf(af("min_width")),
        pf = lf(af("min_height")),
        hf = lf(af("max_width")),
        ff = lf(af("max_height")),
        bf = lf(af("style_formats")),
        vf = af("style_formats_merge"),
        yf = af("style_formats_autohide"),
        xf = af("content_langs"),
        wf = af("removed_menuitems"),
        Sf = af("toolbar_mode"),
        kf = af("toolbar_groups"),
        Cf = af("toolbar_location"),
        Of = af("fixed_toolbar_container"),
        _f = af("fixed_toolbar_container_target"),
        Tf = af("toolbar_persist"),
        Ef = af("toolbar_sticky_offset"),
        Af = af("menubar"),
        Mf = af("toolbar"),
        Df = af("file_picker_callback"),
        Bf = af("file_picker_validator_handler"),
        Ff = af("font_size_input_default_unit"),
        If = af("file_picker_types"),
        Rf = af("typeahead_urls"),
        Nf = af("anchor_top"),
        Vf = af("anchor_bottom"),
        zf = af("draggable_modal"),
        Hf = af("statusbar"),
        Lf = af("elementpath"),
        Pf = af("branding"),
        Uf = af("resize"),
        Wf = af("paste_as_text"),
        jf = af("sidebar_show"),
        Gf = af("promotion"),
        $f = e => !1 === e.options.get("skin"),
        qf = e => !1 !== e.options.get("menubar"),
        Xf = e => {
            const t = e.options.get("skin_url");
            if ($f(e)) return t;
            if (t) return e.documentBaseURI.toAbsolute(t); {
                const t = e.options.get("skin");
                return rf.baseURL + "/skins/ui/" + t
            }
        },
        Kf = e => e.options.get("line_height_formats").split(" "),
        Yf = e => {
            const t = Mf(e),
                o = s(t),
                n = l(t) && t.length > 0;
            return !Zf(e) && (n || o || !0 === t)
        },
        Jf = e => {
            const t = V(9, (t => e.options.get("toolbar" + (t + 1)))),
                o = U(t, s);
            return Ce(o.length > 0, o)
        },
        Zf = e => Jf(e).fold((() => {
            const t = Mf(e);
            return f(t, s) && t.length > 0
        }), E),
        Qf = e => Cf(e) === of .bottom,
        eb = e => {
            var t;
            if (!e.inline) return A.none();
            const o = null !== (t = Of(e)) && void 0 !== t ? t : "";
            if (o.length > 0) return pi(xt(), o);
            const n = _f(e);
            return g(n) ? A.some(Ve(n)) : A.none()
        },
        tb = e => e.inline && eb(e).isSome(),
        ob = e => eb(e).getOrThunk((() => ft(ht(Ve(e.getElement()))))),
        nb = e => e.inline && !qf(e) && !Yf(e) && !Zf(e),
        rb = e => (e.options.get("toolbar_sticky") || e.inline) && !tb(e) && !nb(e),
        sb = e => !tb(e) && "split" === e.options.get("ui_mode"),
        ab = e => {
            const t = e.options.get("menu");
            return ce(t, (e => ({
                ...e,
                items: e.items
            })))
        };
    var ib = Object.freeze({
        __proto__: null,
        get ToolbarMode() {
            return tf
        },
        get ToolbarLocation() {
            return of
        },
        register: cf,
        getSkinUrl: Xf,
        isReadOnly: df,
        isSkinDisabled: $f,
        getHeightOption: uf,
        getWidthOption: mf,
        getMinWidthOption: gf,
        getMinHeightOption: pf,
        getMaxWidthOption: hf,
        getMaxHeightOption: ff,
        getUserStyleFormats: bf,
        shouldMergeStyleFormats: vf,
        shouldAutoHideStyleFormats: yf,
        getLineHeightFormats: Kf,
        getContentLanguages: xf,
        getRemovedMenuItems: wf,
        isMenubarEnabled: qf,
        isMultipleToolbars: Zf,
        isToolbarEnabled: Yf,
        isToolbarPersist: Tf,
        getMultipleToolbarsOption: Jf,
        getUiContainer: ob,
        useFixedContainer: tb,
        isSplitUiMode: sb,
        getToolbarMode: Sf,
        isDraggableModal: zf,
        isDistractionFree: nb,
        isStickyToolbar: rb,
        getStickyToolbarOffset: Ef,
        getToolbarLocation: Cf,
        isToolbarLocationBottom: Qf,
        getToolbarGroups: kf,
        getMenus: ab,
        getMenubar: Af,
        getToolbar: Mf,
        getFilePickerCallback: Df,
        getFilePickerTypes: If,
        useTypeaheadUrls: Rf,
        getAnchorTop: Nf,
        getAnchorBottom: Vf,
        getFilePickerValidatorHandler: Bf,
        getFontSizeInputDefaultUnit: Ff,
        useStatusBar: Hf,
        useElementPath: Lf,
        promotionEnabled: Gf,
        useBranding: Pf,
        getResize: Uf,
        getPasteAsText: Wf,
        getSidebarShow: jf
    });
    const lb = "[data-mce-autocompleter]",
        cb = e => hi(e, lb);
    var db;
    ! function (e) {
        e[e.CLOSE_ON_EXECUTE = 0] = "CLOSE_ON_EXECUTE", e[e.BUBBLE_TO_SANDBOX = 1] = "BUBBLE_TO_SANDBOX"
    }(db || (db = {}));
    var ub = db;
    const mb = "tox-menu-nav__js",
        gb = "tox-collection__item",
        pb = {
            normal: mb,
            color: "tox-swatch"
        },
        hb = "tox-collection__item--enabled",
        fb = "tox-collection__item-icon",
        bb = "tox-collection__item-label",
        vb = "tox-collection__item-caret",
        yb = "tox-collection__item--active",
        xb = "tox-collection__item-container",
        wb = "tox-collection__item-container--row",
        Sb = e => be(pb, e).getOr(mb),
        kb = e => "color" === e ? "tox-swatches" : "tox-menu",
        Cb = e => ({
            backgroundMenu: "tox-background-menu",
            selectedMenu: "tox-selected-menu",
            selectedItem: "tox-collection__item--active",
            hasIcons: "tox-menu--has-icons",
            menu: kb(e),
            tieredMenu: "tox-tiered-menu"
        }),
        Ob = e => {
            const t = Cb(e);
            return {
                backgroundMenu: t.backgroundMenu,
                selectedMenu: t.selectedMenu,
                menu: t.menu,
                selectedItem: t.selectedItem,
                item: Sb(e)
            }
        },
        _b = (e, t, o) => {
            const n = Cb(o);
            return {
                tag: "div",
                classes: q([
                    [n.menu, `tox-menu-${t}-column`], e ? [n.hasIcons] : []
                ])
            }
        },
        Tb = [Ah.parts.items({})],
        Eb = (e, t, o) => {
            const n = Cb(o);
            return {
                dom: {
                    tag: "div",
                    classes: q([
                        [n.tieredMenu]
                    ])
                },
                markers: Ob(o)
            }
        },
        Ab = x([ur("data"), yr("inputAttributes", {}), yr("inputStyles", {}), yr("tag", "input"), yr("inputClasses", []), Di("onSetValue"), yr("styles", {}), yr("eventOrder", {}), gu("inputBehaviours", [mu, eh]), yr("selectOnFocus", !0)]),
        Mb = e => kl([eh.config({
            onFocus: e.selectOnFocus ? e => {
                const t = e.element,
                    o = $a(t);
                t.dom.setSelectionRange(0, o.length)
            } : b
        })]),
        Db = e => ({
            ...Mb(e),
            ...hu(e.inputBehaviours, [mu.config({
                store: {
                    mode: "manual",
                    ...e.data.map((e => ({
                        initialValue: e
                    }))).getOr({}),
                    getValue: e => $a(e.element),
                    setValue: (e, t) => {
                        $a(e.element) !== t && qa(e.element, t)
                    }
                },
                onSetValue: e.onSetValue
            })])
        }),
        Bb = e => ({
            tag: e.tag,
            attributes: {
                type: "text",
                ...e.inputAttributes
            },
            styles: e.inputStyles,
            classes: e.inputClasses
        }),
        Fb = pm({
            name: "Input",
            configFields: Ab(),
            factory: (e, t) => ({
                uid: e.uid,
                dom: Bb(e),
                components: [],
                behaviours: Db(e),
                eventOrder: e.eventOrder
            })
        }),
        Ib = la("refetch-trigger-event"),
        Rb = la("redirect-menu-item-interaction"),
        Nb = e => pi(e.element, ".tox-menu__searcher").bind((t => e.getSystem().getByDom(t).toOptional())),
        Vb = Nb,
        zb = e => ({
            fetchPattern: mu.getValue(e),
            selectionStart: e.element.dom.selectionStart,
            selectionEnd: e.element.dom.selectionEnd
        }),
        Hb = e => {
            const t = (e, t) => (t.cut(), A.none()),
                o = (e, t) => {
                    const o = {
                        interactionEvent: t.event,
                        eventType: t.event.raw.type
                    };
                    return Is(e, Rb, o), A.some(!0)
                },
                n = "searcher-events";
            return {
                dom: {
                    tag: "div",
                    classes: [gb]
                },
                components: [Fb.sketch({
                    inputClasses: ["tox-menu__searcher", "tox-textfield"],
                    inputAttributes: {
                        ...e.placeholder.map((t => ({
                            placeholder: e.i18n(t)
                        }))).getOr({}),
                        type: "search",
                        "aria-autocomplete": "list"
                    },
                    inputBehaviours: kl([Kp(n, [Us(Zr(), (e => {
                        Fs(e, Ib)
                    })), Us(Yr(), ((e, t) => {
                        "Escape" === t.event.raw.key && t.stop()
                    }))]), Hp.config({
                        mode: "special",
                        onLeft: t,
                        onRight: t,
                        onSpace: t,
                        onEnter: o,
                        onEscape: o,
                        onUp: o,
                        onDown: o
                    })]),
                    eventOrder: {
                        keydown: [n, Hp.name()]
                    }
                })]
            }
        },
        Lb = "tox-collection--results__js",
        Pb = e => {
            var t;
            return e.dom ? {
                ...e,
                dom: {
                    ...e.dom,
                    attributes: {
                        ...null !== (t = e.dom.attributes) && void 0 !== t ? t : {},
                        id: la("aria-item-search-result-id"),
                        "aria-selected": "false"
                    }
                }
            } : e
        },
        Ub = (e, t) => o => {
            const n = z(o, t);
            return H(n, (t => ({
                dom: e,
                components: t
            })))
        },
        Wb = (e, t) => {
            const o = [];
            let n = [];
            return L(e, ((e, r) => {
                t(e, r) ? (n.length > 0 && o.push(n), n = [], (ve(e.dom, "innerHtml") || e.components && e.components.length > 0) && n.push(e)) : n.push(e)
            })), n.length > 0 && o.push(n), H(o, (e => ({
                dom: {
                    tag: "div",
                    classes: ["tox-collection__group"]
                },
                components: e
            })))
        },
        jb = (e, t, o) => Ah.parts.items({
            preprocess: n => {
                const r = H(n, o);
                return "auto" !== e && e > 1 ? Ub({
                    tag: "div",
                    classes: ["tox-collection__group"]
                }, e)(r) : Wb(r, ((e, o) => "separator" === t[o].type))
            }
        }),
        Gb = (e, t, o = !0) => ({
            dom: {
                tag: "div",
                classes: ["tox-menu", "tox-collection"].concat(1 === e ? ["tox-collection--list"] : ["tox-collection--grid"])
            },
            components: [jb(e, t, w)]
        }),
        $b = e => N(e, (e => "icon" in e && void 0 !== e.icon)),
        qb = e => (console.error(Yn(e)), console.log(e), A.none()),
        Xb = (e, t, o, n, r) => {
            const s = (a = o, {
                dom: {
                    tag: "div",
                    classes: ["tox-collection", "tox-collection--horizontal"]
                },
                components: [Ah.parts.items({
                    preprocess: e => Wb(e, ((e, t) => "separator" === a[t].type))
                })]
            });
            var a;
            return {
                value: e,
                dom: s.dom,
                components: s.components,
                items: o
            }
        },
        Kb = (e, t, o, n, r) => {
            if ("color" === r.menuType) {
                const t = (e => ({
                    dom: {
                        tag: "div",
                        classes: ["tox-menu", "tox-swatches-menu"]
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-swatches"]
                        },
                        components: [Ah.parts.items({
                            preprocess: "auto" !== e ? Ub({
                                tag: "div",
                                classes: ["tox-swatches__row"]
                            }, e) : w
                        })]
                    }]
                }))(n);
                return {
                    value: e,
                    dom: t.dom,
                    components: t.components,
                    items: o
                }
            }
            if ("normal" === r.menuType && "auto" === n) {
                const t = Gb(n, o);
                return {
                    value: e,
                    dom: t.dom,
                    components: t.components,
                    items: o
                }
            }
            if ("normal" === r.menuType || "searchable" === r.menuType) {
                const t = "searchable" !== r.menuType ? Gb(n, o) : "search-with-field" === r.searchMode.searchMode ? ((e, t, o) => {
                    const n = la("aria-controls-search-results");
                    return {
                        dom: {
                            tag: "div",
                            classes: ["tox-menu", "tox-collection"].concat(1 === e ? ["tox-collection--list"] : ["tox-collection--grid"])
                        },
                        components: [Hb({
                            i18n: Wh.translate,
                            placeholder: o.placeholder
                        }), {
                            dom: {
                                tag: "div",
                                classes: [...1 === e ? ["tox-collection--list"] : ["tox-collection--grid"], Lb],
                                attributes: {
                                    id: n
                                }
                            },
                            components: [jb(e, t, Pb)]
                        }]
                    }
                })(n, o, r.searchMode) : ((e, t, o = !0) => {
                    const n = la("aria-controls-search-results");
                    return {
                        dom: {
                            tag: "div",
                            classes: ["tox-menu", "tox-collection", Lb].concat(1 === e ? ["tox-collection--list"] : ["tox-collection--grid"]),
                            attributes: {
                                id: n
                            }
                        },
                        components: [jb(e, t, Pb)]
                    }
                })(n, o);
                return {
                    value: e,
                    dom: t.dom,
                    components: t.components,
                    items: o
                }
            }
            if ("listpreview" === r.menuType && "auto" !== n) {
                const t = (e => ({
                    dom: {
                        tag: "div",
                        classes: ["tox-menu", "tox-collection", "tox-collection--toolbar", "tox-collection--toolbar-lg"]
                    },
                    components: [Ah.parts.items({
                        preprocess: Ub({
                            tag: "div",
                            classes: ["tox-collection__group"]
                        }, e)
                    })]
                }))(n);
                return {
                    value: e,
                    dom: t.dom,
                    components: t.components,
                    items: o
                }
            }
            return {
                value: e,
                dom: _b(t, n, r.menuType),
                components: Tb,
                items: o
            }
        },
        Yb = sr("type"),
        Jb = sr("name"),
        Zb = sr("label"),
        Qb = sr("text"),
        ev = sr("title"),
        tv = sr("icon"),
        ov = sr("value"),
        nv = ir("fetch"),
        rv = ir("getSubmenuItems"),
        sv = ir("onAction"),
        av = ir("onItemAction"),
        iv = Or("onSetup", (() => b)),
        lv = pr("name"),
        cv = pr("text"),
        dv = pr("icon"),
        uv = pr("tooltip"),
        mv = pr("label"),
        gv = pr("shortcut"),
        pv = fr("select"),
        hv = Cr("active", !1),
        fv = Cr("borderless", !1),
        bv = Cr("enabled", !0),
        vv = Cr("primary", !1),
        yv = e => yr("columns", e),
        xv = yr("meta", {}),
        wv = Or("onAction", b),
        Sv = e => Sr("type", e),
        kv = e => Qn("name", "name", vn((() => la(`${e}-name`))), Hn),
        Cv = Dn([Yb, cv]),
        Ov = Dn([Sv("autocompleteitem"), hv, bv, xv, ov, cv, dv]),
        _v = [bv, uv, dv, cv, iv],
        Tv = Dn([Yb, sv].concat(_v)),
        Ev = e => qn("toolbarbutton", Tv, e),
        Av = [hv].concat(_v),
        Mv = Dn(Av.concat([Yb, sv])),
        Dv = e => qn("ToggleButton", Mv, e),
        Bv = [Or("predicate", T), kr("scope", "node", ["node", "editor"]), kr("position", "selection", ["node", "selection", "line"])],
        Fv = _v.concat([Sv("contextformbutton"), vv, sv, er("original", w)]),
        Iv = Av.concat([Sv("contextformbutton"), vv, sv, er("original", w)]),
        Rv = _v.concat([Sv("contextformbutton")]),
        Nv = Av.concat([Sv("contextformtogglebutton")]),
        Vv = Jn("type", {
            contextformbutton: Fv,
            contextformtogglebutton: Iv
        }),
        zv = Dn([Sv("contextform"), Or("initValue", x("")), mv, dr("commands", Vv), mr("launch", Jn("type", {
            contextformbutton: Rv,
            contextformtogglebutton: Nv
        }))].concat(Bv)),
        Hv = Dn([Sv("contexttoolbar"), sr("items")].concat(Bv)),
        Lv = [Yb, sr("src"), pr("alt"), _r("classes", [], Hn)],
        Pv = Dn(Lv),
        Uv = [Yb, Qb, lv, _r("classes", ["tox-collection__item-label"], Hn)],
        Wv = Dn(Uv),
        jv = En((() => jn("type", {
            cardimage: Pv,
            cardtext: Wv,
            cardcontainer: Gv
        }))),
        Gv = Dn([Yb, Sr("direction", "horizontal"), Sr("align", "left"), Sr("valign", "middle"), dr("items", jv)]),
        $v = [bv, cv, gv, ("menuitem", Qn("value", "value", vn((() => la("menuitem-value"))), Nn())), xv];
    const qv = Dn([Yb, mv, dr("items", jv), iv, wv].concat($v)),
        Xv = Dn([Yb, hv, dv].concat($v)),
        Kv = [Yb, sr("fancytype"), wv],
        Yv = [yr("initData", {})].concat(Kv),
        Jv = [fr("select"), Tr("initData", {}, [Cr("allowCustomColors", !0), Sr("storageKey", "default"), br("colors", Nn())])].concat(Kv),
        Zv = Jn("fancytype", {
            inserttable: Yv,
            colorswatch: Jv
        }),
        Qv = Dn([Yb, iv, wv, dv].concat($v)),
        ey = Dn([Yb, rv, iv, dv].concat($v)),
        ty = Dn([Yb, dv, hv, iv, sv].concat($v)),
        oy = (e, t, o) => {
            const n = qc(e.element, "." + o);
            if (n.length > 0) {
                const e = $(n, (e => {
                    const o = e.dom.getBoundingClientRect().top,
                        r = n[0].dom.getBoundingClientRect().top;
                    return Math.abs(o - r) > t
                })).getOr(n.length);
                return A.some({
                    numColumns: e,
                    numRows: Math.ceil(n.length / e)
                })
            }
            return A.none()
        },
        ny = e => ((e, t) => kl([Kp(e, t)]))(la("unnamed-events"), e),
        ry = la("tooltip.exclusive"),
        sy = la("tooltip.show"),
        ay = la("tooltip.hide"),
        iy = (e, t, o) => {
            e.getSystem().broadcastOn([ry], {})
        };
    var ly = Object.freeze({
            __proto__: null,
            hideAllExclusive: iy,
            setComponents: (e, t, o, n) => {
                o.getTooltip().each((e => {
                    e.getSystem().isConnected() && Xp.set(e, n)
                }))
            }
        }),
        cy = Object.freeze({
            __proto__: null,
            events: (e, t) => {
                const o = o => {
                    t.getTooltip().each((n => {
                        Md(n), e.onHide(o, n), t.clearTooltip()
                    })), t.clearTimer()
                };
                return Hs(q([
                    [Us(sy, (o => {
                        t.resetTimer((() => {
                            (o => {
                                if (!t.isShowing()) {
                                    iy(o);
                                    const n = e.lazySink(o).getOrDie(),
                                        r = o.getSystem().build({
                                            dom: e.tooltipDom,
                                            components: e.tooltipComponents,
                                            events: Hs("normal" === e.mode ? [Us(qr(), (e => {
                                                Fs(o, sy)
                                            })), Us(Gr(), (e => {
                                                Fs(o, ay)
                                            }))] : []),
                                            behaviours: kl([Xp.config({})])
                                        });
                                    t.setTooltip(r), Td(n, r), e.onShow(o, r), xd.position(n, r, {
                                        anchor: e.anchor(o)
                                    })
                                }
                            })(o)
                        }), e.delay)
                    })), Us(ay, (n => {
                        t.resetTimer((() => {
                            o(n)
                        }), e.delay)
                    })), Us(ds(), ((e, t) => {
                        const n = t;
                        n.universal || R(n.channels, ry) && o(e)
                    })), Js((e => {
                        o(e)
                    }))], "normal" === e.mode ? [Us(Xr(), (e => {
                        Fs(e, sy)
                    })), Us(ls(), (e => {
                        Fs(e, ay)
                    })), Us(qr(), (e => {
                        Fs(e, sy)
                    })), Us(Gr(), (e => {
                        Fs(e, ay)
                    }))] : [Us(Ds(), ((e, t) => {
                        Fs(e, sy)
                    })), Us(Bs(), (e => {
                        Fs(e, ay)
                    }))]
                ]))
            }
        }),
        dy = [or("lazySink"), or("tooltipDom"), yr("exclusive", !0), yr("tooltipComponents", []), yr("delay", 300), kr("mode", "normal", ["normal", "follow-highlight"]), yr("anchor", (e => ({
            type: "hotspot",
            hotspot: e,
            layouts: {
                onLtr: x([cl, ll, rl, al, sl, il]),
                onRtl: x([cl, ll, rl, al, sl, il])
            }
        }))), Di("onHide"), Di("onShow")],
        uy = Object.freeze({
            __proto__: null,
            init: () => {
                const e = Ql(),
                    t = Ql(),
                    o = () => {
                        e.on(clearTimeout)
                    },
                    n = x("not-implemented");
                return _a({
                    getTooltip: t.get,
                    isShowing: t.isSet,
                    setTooltip: t.set,
                    clearTooltip: t.clear,
                    clearTimer: o,
                    resetTimer: (t, n) => {
                        o(), e.set(setTimeout(t, n))
                    },
                    readState: n
                })
            }
        });
    const my = Ol({
            fields: dy,
            name: "tooltipping",
            active: cy,
            state: uy,
            apis: ly
        }),
        gy = "silver.readonly",
        py = Dn([("readonly", nr("readonly", Ln))]);
    const hy = (e, t) => {
            const o = e.mainUi.outerContainer.element,
                n = [e.mainUi.mothership, ...e.uiMotherships];
            t && L(n, (e => {
                e.broadcastOn([qd()], {
                    target: o
                })
            })), L(n, (e => {
                e.broadcastOn([gy], {
                    readonly: t
                })
            }))
        },
        fy = (e, t) => {
            e.on("init", (() => {
                e.mode.isReadOnly() && hy(t, !0)
            })), e.on("SwitchMode", (() => hy(t, e.mode.isReadOnly()))), df(e) && e.mode.set("readonly")
        },
        by = () => Al.config({
            channels: {
                [gy]: {
                    schema: py,
                    onReceive: (e, t) => {
                        Fm.set(e, t.readonly)
                    }
                }
            }
        }),
        vy = e => Fm.config({
            disabled: e
        }),
        yy = e => Fm.config({
            disabled: e,
            disableClass: "tox-tbtn--disabled"
        }),
        xy = e => Fm.config({
            disabled: e,
            disableClass: "tox-tbtn--disabled",
            useNative: !1
        }),
        wy = (e, t) => {
            const o = e.getApi(t);
            return e => {
                e(o)
            }
        },
        Sy = (e, t) => Ys((o => {
            wy(e, o)((o => {
                const n = e.onSetup(o);
                p(n) && t.set(n)
            }))
        })),
        ky = (e, t) => Js((o => wy(e, o)(t.get()))),
        Cy = (e, t) => Qs(((o, n) => {
            wy(e, o)(e.onAction), e.triggersSubmenu || t !== ub.CLOSE_ON_EXECUTE || (o.getSystem().isConnected() && Fs(o, hs()), n.stop())
        })),
        Oy = {
            [us()]: ["disabling", "alloy.base.behaviour", "toggling", "item-events"]
        },
        _y = we,
        Ty = (e, t, o, n) => {
            const r = Er(b);
            return {
                type: "item",
                dom: t.dom,
                components: _y(t.optComponents),
                data: e.data,
                eventOrder: Oy,
                hasSubmenu: e.triggersSubmenu,
                itemBehaviours: kl([Kp("item-events", [Cy(e, o), Sy(e, r), ky(e, r)]), (s = () => !e.enabled || n.isDisabled(), Fm.config({
                    disabled: s,
                    disableClass: "tox-collection__item--state-disabled"
                })), by(), Xp.config({})].concat(e.itemBehaviours))
            };
            var s
        },
        Ey = e => ({
            value: e.value,
            meta: {
                text: e.text.getOr(""),
                ...e.meta
            }
        }),
        Ay = e => {
            const t = sf.os.isMacOS() || sf.os.isiOS(),
                o = t ? {
                    alt: "\u2325",
                    ctrl: "\u2303",
                    shift: "\u21e7",
                    meta: "\u2318",
                    access: "\u2303\u2325"
                } : {
                    meta: "Ctrl",
                    access: "Shift+Alt"
                },
                n = e.split("+"),
                r = H(n, (e => {
                    const t = e.toLowerCase().trim();
                    return ve(o, t) ? o[t] : e
                }));
            return t ? r.join("") : r.join("+")
        },
        My = (e, t, o = [fb]) => Zh(e, {
            tag: "div",
            classes: o
        }, t),
        Dy = e => ({
            dom: {
                tag: "div",
                classes: [bb]
            },
            components: [ti(Wh.translate(e))]
        }),
        By = (e, t) => ({
            dom: {
                tag: "div",
                classes: t,
                innerHtml: e
            }
        }),
        Fy = (e, t) => ({
            dom: {
                tag: "div",
                classes: [bb]
            },
            components: [{
                dom: {
                    tag: e.tag,
                    styles: e.styles
                },
                components: [ti(Wh.translate(t))]
            }]
        }),
        Iy = e => ({
            dom: {
                tag: "div",
                classes: ["tox-collection__item-accessory"]
            },
            components: [ti(Ay(e))]
        }),
        Ry = e => My("checkmark", e, ["tox-collection__item-checkmark"]),
        Ny = e => {
            const t = e.map((e => ({
                attributes: {
                    title: Wh.translate(e)
                }
            }))).getOr({});
            return {
                tag: "div",
                classes: [mb, gb],
                ...t
            }
        },
        Vy = (e, t, o, n = A.none()) => "color" === e.presets ? ((e, t, o) => {
            const n = e.ariaLabel,
                r = e.value,
                s = e.iconContent.map((e => ((e, t, o) => {
                    const n = t();
                    return Xh(e, n).or(o).getOrThunk($h(n))
                })(e, t.icons, o)));
            return {
                dom: (() => {
                    const e = s.getOr(""),
                        o = n.map((e => ({
                            title: t.translate(e)
                        }))).getOr({}),
                        a = {
                            tag: "div",
                            attributes: o,
                            classes: ["tox-swatch"]
                        };
                    return "custom" === r ? {
                        ...a,
                        tag: "button",
                        classes: [...a.classes, "tox-swatches__picker-btn"],
                        innerHtml: e
                    } : "remove" === r ? {
                        ...a,
                        classes: [...a.classes, "tox-swatch--remove"],
                        innerHtml: e
                    } : g(r) ? {
                        ...a,
                        attributes: {
                            ...a.attributes,
                            "data-mce-color": r
                        },
                        styles: {
                            "background-color": r
                        },
                        innerHtml: e
                    } : a
                })(),
                optComponents: []
            }
        })(e, t, n) : ((e, t, o, n) => {
            const r = {
                    tag: "div",
                    classes: [fb]
                },
                s = o ? e.iconContent.map((e => Zh(e, r, t.icons, n))).orThunk((() => A.some({
                    dom: r
                }))) : A.none(),
                a = e.checkMark,
                i = A.from(e.meta).fold((() => Dy), (e => ve(e, "style") ? k(Fy, e.style) : Dy)),
                l = e.htmlContent.fold((() => e.textContent.map(i)), (e => A.some(By(e, [bb]))));
            return {
                dom: Ny(e.ariaLabel),
                optComponents: [s, l, e.shortcutContent.map(Iy), a, e.caret]
            }
        })(e, t, o, n),
        zy = (e, t) => be(e, "tooltipWorker").map((e => [my.config({
            lazySink: t.getSink,
            tooltipDom: {
                tag: "div",
                classes: ["tox-tooltip-worker-container"]
            },
            tooltipComponents: [],
            anchor: e => ({
                type: "submenu",
                item: e,
                overrides: {
                    maxHeightFunction: cc
                }
            }),
            mode: "follow-highlight",
            onShow: (t, o) => {
                e((e => {
                    my.setComponents(t, [oi({
                        element: Ve(e)
                    })])
                }))
            }
        })])).getOr([]),
        Hy = (e, t) => {
            const o = (e => nf.DOM.encode(e))(Wh.translate(e));
            if (t.length > 0) {
                const e = new RegExp((e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))(t), "gi");
                return o.replace(e, (e => `<span class="tox-autocompleter-highlight">${e}</span>`))
            }
            return o
        },
        Ly = (e, t) => H(e, (e => {
            switch (e.type) {
                case "cardcontainer":
                    return ((e, t) => {
                        const o = "vertical" === e.direction ? "tox-collection__item-container--column" : wb,
                            n = "left" === e.align ? "tox-collection__item-container--align-left" : "tox-collection__item-container--align-right";
                        return {
                            dom: {
                                tag: "div",
                                classes: [xb, o, n, (() => {
                                    switch (e.valign) {
                                        case "top":
                                            return "tox-collection__item-container--valign-top";
                                        case "middle":
                                            return "tox-collection__item-container--valign-middle";
                                        case "bottom":
                                            return "tox-collection__item-container--valign-bottom"
                                    }
                                })()]
                            },
                            components: t
                        }
                    })(e, Ly(e.items, t));
                case "cardimage":
                    return ((e, t, o) => ({
                        dom: {
                            tag: "img",
                            classes: t,
                            attributes: {
                                src: e,
                                alt: o.getOr("")
                            }
                        }
                    }))(e.src, e.classes, e.alt);
                case "cardtext":
                    const o = e.name.exists((e => R(t.cardText.highlightOn, e))),
                        n = o ? A.from(t.cardText.matchText).getOr("") : "";
                    return By(Hy(e.text, n), e.classes)
            }
        })),
        Py = qu(Sh(), kh()),
        Uy = e => ({
            value: $y(e)
        }),
        Wy = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        jy = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
        Gy = e => Wy.test(e) || jy.test(e),
        $y = e => _e(e, "#").toUpperCase(),
        qy = e => {
            const t = e.toString(16);
            return (1 === t.length ? "0" + t : t).toUpperCase()
        },
        Xy = e => {
            const t = qy(e.red) + qy(e.green) + qy(e.blue);
            return Uy(t)
        },
        Ky = Math.min,
        Yy = Math.max,
        Jy = Math.round,
        Zy = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i,
        Qy = /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i,
        ex = (e, t, o, n) => ({
            red: e,
            green: t,
            blue: o,
            alpha: n
        }),
        tx = e => {
            const t = parseInt(e, 10);
            return t.toString() === e && t >= 0 && t <= 255
        },
        ox = e => {
            let t, o, n;
            const r = (e.hue || 0) % 360;
            let s = e.saturation / 100,
                a = e.value / 100;
            if (s = Yy(0, Ky(s, 1)), a = Yy(0, Ky(a, 1)), 0 === s) return t = o = n = Jy(255 * a), ex(t, o, n, 1);
            const i = r / 60,
                l = a * s,
                c = l * (1 - Math.abs(i % 2 - 1)),
                d = a - l;
            switch (Math.floor(i)) {
                case 0:
                    t = l, o = c, n = 0;
                    break;
                case 1:
                    t = c, o = l, n = 0;
                    break;
                case 2:
                    t = 0, o = l, n = c;
                    break;
                case 3:
                    t = 0, o = c, n = l;
                    break;
                case 4:
                    t = c, o = 0, n = l;
                    break;
                case 5:
                    t = l, o = 0, n = c;
                    break;
                default:
                    t = o = n = 0
            }
            return t = Jy(255 * (t + d)), o = Jy(255 * (o + d)), n = Jy(255 * (n + d)), ex(t, o, n, 1)
        },
        nx = e => {
            const t = (e => {
                    const t = (e => {
                            const t = e.value.replace(Wy, ((e, t, o, n) => t + t + o + o + n + n));
                            return {
                                value: t
                            }
                        })(e),
                        o = jy.exec(t.value);
                    return null === o ? ["FFFFFF", "FF", "FF", "FF"] : o
                })(e),
                o = parseInt(t[1], 16),
                n = parseInt(t[2], 16),
                r = parseInt(t[3], 16);
            return ex(o, n, r, 1)
        },
        rx = (e, t, o, n) => {
            const r = parseInt(e, 10),
                s = parseInt(t, 10),
                a = parseInt(o, 10),
                i = parseFloat(n);
            return ex(r, s, a, i)
        },
        sx = e => {
            if ("transparent" === e) return A.some(ex(0, 0, 0, 0));
            const t = Zy.exec(e);
            if (null !== t) return A.some(rx(t[1], t[2], t[3], "1"));
            const o = Qy.exec(e);
            return null !== o ? A.some(rx(o[1], o[2], o[3], o[4])) : A.none()
        },
        ax = e => `rgba(${e.red},${e.green},${e.blue},${e.alpha})`,
        ix = ex(255, 0, 0, 1),
        lx = (e, t) => {
            e.dispatch("ResizeContent", t)
        },
        cx = (e, t) => {
            e.dispatch("TextColorChange", t)
        },
        dx = (e, t) => e.dispatch("ResolveName", {
            name: t.nodeName.toLowerCase(),
            target: t
        });
    var ux = tinymce.util.Tools.resolve("tinymce.util.LocalStorage");
    const mx = {},
        gx = e => be(mx, e).getOrThunk((() => {
            const t = `tinymce-custom-colors-${e}`,
                o = ux.getItem(t);
            if (m(o)) {
                const e = ux.getItem("tinymce-custom-colors");
                ux.setItem(t, g(e) ? e : "[]")
            }
            const n = ((e, t = 10) => {
                const o = ux.getItem(e),
                    n = s(o) ? JSON.parse(o) : [],
                    r = t - (a = n).length < 0 ? a.slice(0, t) : a;
                var a;
                const i = e => {
                    r.splice(e, 1)
                };
                return {
                    add: o => {
                        I(r, o).each(i), r.unshift(o), r.length > t && r.pop(), ux.setItem(e, JSON.stringify(r))
                    },
                    state: () => r.slice(0)
                }
            })(t, 10);
            return mx[e] = n, n
        })),
        px = (e, t) => {
            gx(e).add(t)
        },
        hx = (e, t, o) => ({
            hue: e,
            saturation: t,
            value: o
        }),
        fx = e => {
            let t = 0,
                o = 0,
                n = 0;
            const r = e.red / 255,
                s = e.green / 255,
                a = e.blue / 255,
                i = Math.min(r, Math.min(s, a)),
                l = Math.max(r, Math.max(s, a));
            return i === l ? (n = i, hx(0, 0, 100 * n)) : (t = r === i ? 3 : a === i ? 1 : 5, t = 60 * (t - (r === i ? s - a : a === i ? r - s : a - r) / (l - i)), o = (l - i) / l, n = l, hx(Math.round(t), Math.round(100 * o), Math.round(100 * n)))
        },
        bx = e => Xy(ox(e)),
        vx = e => {
            return (t = e, Gy(t) ? A.some({
                value: $y(t)
            }) : A.none()).orThunk((() => sx(e).map(Xy))).getOrThunk((() => {
                const t = document.createElement("canvas");
                t.height = 1, t.width = 1;
                const o = t.getContext("2d");
                o.clearRect(0, 0, t.width, t.height), o.fillStyle = "#FFFFFF", o.fillStyle = e, o.fillRect(0, 0, 1, 1);
                const n = o.getImageData(0, 0, 1, 1).data,
                    r = n[0],
                    s = n[1],
                    a = n[2],
                    i = n[3];
                return Xy(ex(r, s, a, i))
            }));
            var t
        },
        yx = "forecolor",
        xx = "hilitecolor",
        wx = e => Math.max(5, Math.ceil(Math.sqrt(e))),
        Sx = (e, t) => {
            const o = wx(t),
                n = Cx("color_cols")(e);
            return 5 === o ? n : o
        },
        kx = e => {
            const t = [];
            for (let o = 0; o < e.length; o += 2) t.push({
                text: e[o + 1],
                value: "#" + vx(e[o]).value,
                icon: "checkmark",
                type: "choiceitem"
            });
            return t
        },
        Cx = e => t => t.options.get(e),
        Ox = "#000000",
        _x = (e, t) => {
            const o = ((e, t) => t === yx ? Cx("color_cols_foreground")(e) : t === xx ? Cx("color_cols_background")(e) : Cx("color_cols")(e))(e, t);
            return o > 0 ? o : 5
        },
        Tx = Cx("custom_colors"),
        Ex = (e, t) => t === yx && e.options.isSet("color_map_foreground") ? Cx("color_map_foreground")(e) : t === xx && e.options.isSet("color_map_background") ? Cx("color_map_background")(e) : Cx("color_map")(e),
        Ax = Cx("color_default_foreground"),
        Mx = Cx("color_default_background"),
        Dx = (e, t) => {
            const o = Ve(e.selection.getStart()),
                n = "hilitecolor" === t ? Ir(o, (e => {
                    if (Ge(e)) {
                        const t = It(e, "background-color");
                        return Ce(sx(t).exists((e => 0 !== e.alpha)), t)
                    }
                    return A.none()
                })).getOr("rgba(0, 0, 0, 0)") : It(o, "color");
            return sx(n).map((e => "#" + Xy(e).value))
        },
        Bx = e => {
            const t = "choiceitem",
                o = {
                    type: t,
                    text: "Remove color",
                    icon: "color-swatch-remove-color",
                    value: "remove"
                };
            return e ? [o, {
                type: t,
                text: "Custom color",
                icon: "color-picker",
                value: "custom"
            }] : [o]
        },
        Fx = (e, t, o, n) => {
            "custom" === o ? Lx(e)((o => {
                o.each((o => {
                    px(t, o), e.execCommand("mceApplyTextcolor", t, o), n(o)
                }))
            }), Dx(e, t).getOr(Ox)) : "remove" === o ? (n(""), e.execCommand("mceRemoveTextcolor", t)) : (n(o), e.execCommand("mceApplyTextcolor", t, o))
        },
        Ix = (e, t, o) => e.concat((e => H(gx(e).state(), (e => ({
            type: "choiceitem",
            text: e,
            icon: "checkmark",
            value: e
        }))))(t).concat(Bx(o))),
        Rx = (e, t, o) => n => {
            n(Ix(e, t, o))
        },
        Nx = (e, t, o) => {
            const n = "forecolor" === t ? "tox-icon-text-color__color" : "tox-icon-highlight-bg-color__color";
            e.setIconFill(n, o)
        },
        Vx = (e, t) => o => {
            const n = Dx(e, t);
            return xe(n, o.toUpperCase())
        },
        zx = (e, t, o, n, r) => {
            e.ui.registry.addSplitButton(t, {
                tooltip: n,
                presets: "color",
                icon: "forecolor" === t ? "text-color" : "highlight-bg-color",
                select: Vx(e, o),
                columns: _x(e, o),
                fetch: Rx(Ex(e, o), o, Tx(e)),
                onAction: t => {
                    Fx(e, o, r.get(), b)
                },
                onItemAction: (n, s) => {
                    Fx(e, o, s, (o => {
                        r.set(o), cx(e, {
                            name: t,
                            color: o
                        })
                    }))
                },
                onSetup: o => {
                    Nx(o, t, r.get());
                    const n = e => {
                        e.name === t && Nx(o, e.name, e.color)
                    };
                    return e.on("TextColorChange", n), () => {
                        e.off("TextColorChange", n)
                    }
                }
            })
        },
        Hx = (e, t, o, n, r) => {
            e.ui.registry.addNestedMenuItem(t, {
                text: n,
                icon: "forecolor" === t ? "text-color" : "highlight-bg-color",
                onSetup: e => (Nx(e, t, r.get()), b),
                getSubmenuItems: () => [{
                    type: "fancymenuitem",
                    fancytype: "colorswatch",
                    select: Vx(e, o),
                    initData: {
                        storageKey: o
                    },
                    onAction: n => {
                        Fx(e, o, n.value, (o => {
                            r.set(o), cx(e, {
                                name: t,
                                color: o
                            })
                        }))
                    }
                }]
            })
        },
        Lx = e => (t, o) => {
            let n = !1;
            const r = {
                colorpicker: o
            };
            e.windowManager.open({
                title: "Color Picker",
                size: "normal",
                body: {
                    type: "panel",
                    items: [{
                        type: "colorpicker",
                        name: "colorpicker",
                        label: "Color"
                    }]
                },
                buttons: [{
                    type: "cancel",
                    name: "cancel",
                    text: "Cancel"
                }, {
                    type: "submit",
                    name: "save",
                    text: "Save",
                    primary: !0
                }],
                initialData: r,
                onAction: (e, t) => {
                    "hex-valid" === t.name && (n = t.value)
                },
                onSubmit: o => {
                    const r = o.getData().colorpicker;
                    n ? (t(A.from(r)), o.close()) : e.windowManager.alert(e.translate(["Invalid hex color code: {0}", r]))
                },
                onClose: b,
                onCancel: () => {
                    t(A.none())
                }
            })
        },
        Px = (e, t, o, n, r, s, a, i) => {
            const l = $b(t),
                c = Ux(t, o, n, "color" !== r ? "normal" : "color", s, a, i);
            return Kb(e, l, c, n, {
                menuType: r
            })
        },
        Ux = (e, t, o, n, r, s, a) => we(H(e, (i => {
            return "choiceitem" === i.type ? (l = i, qn("choicemenuitem", Xv, l)).fold(qb, (i => A.some(((e, t, o, n, r, s, a, i = !0) => {
                const l = Vy({
                    presets: o,
                    textContent: t ? e.text : A.none(),
                    htmlContent: A.none(),
                    ariaLabel: e.text,
                    iconContent: e.icon,
                    shortcutContent: t ? e.shortcut : A.none(),
                    checkMark: t ? A.some(Ry(a.icons)) : A.none(),
                    caret: A.none(),
                    value: e.value
                }, a, i);
                return fn(Ty({
                    data: Ey(e),
                    enabled: e.enabled,
                    getApi: e => ({
                        setActive: t => {
                            lh.set(e, t)
                        },
                        isActive: () => lh.isOn(e),
                        isEnabled: () => !Fm.isDisabled(e),
                        setEnabled: t => Fm.set(e, !t)
                    }),
                    onAction: t => n(e.value),
                    onSetup: e => (e.setActive(r), b),
                    triggersSubmenu: !1,
                    itemBehaviours: []
                }, l, s, a), {
                    toggling: {
                        toggleClass: hb,
                        toggleOnExecute: !1,
                        selected: e.active,
                        exclusive: !0
                    }
                })
            })(i, 1 === o, n, t, s(i.value), r, a, $b(e))))) : A.none();
            var l
        }))),
        Wx = (e, t) => {
            const o = Ob(t);
            return 1 === e ? {
                mode: "menu",
                moveOnTab: !0
            } : "auto" === e ? {
                mode: "grid",
                selector: "." + o.item,
                initSize: {
                    numColumns: 1,
                    numRows: 1
                }
            } : {
                mode: "matrix",
                rowSelector: "." + ("color" === t ? "tox-swatches__row" : "tox-collection__group"),
                previousSelector: e => "color" === t ? pi(e.element, "[aria-checked=true]") : A.none()
            }
        },
        jx = la("cell-over"),
        Gx = la("cell-execute"),
        $x = (e, t, o) => {
            const n = o => Is(o, Gx, {
                    row: e,
                    col: t
                }),
                r = (e, t) => {
                    t.stop(), n(e)
                };
            return si({
                dom: {
                    tag: "div",
                    attributes: {
                        role: "button",
                        "aria-labelledby": o
                    }
                },
                behaviours: kl([Kp("insert-table-picker-cell", [Us(qr(), eh.focus), Us(us(), n), Us(es(), r), Us(gs(), r)]), lh.config({
                    toggleClass: "tox-insert-table-picker__selected",
                    toggleOnExecute: !1
                }), eh.config({
                    onFocus: o => Is(o, jx, {
                        row: e,
                        col: t
                    })
                })])
            })
        },
        qx = e => X(e, (e => H(e, ai))),
        Xx = (e, t) => ti(`${t}x${e}`),
        Kx = {
            inserttable: e => {
                const t = la("size-label"),
                    o = ((e, t, o) => {
                        const n = [];
                        for (let t = 0; t < 10; t++) {
                            const o = [];
                            for (let n = 0; n < 10; n++) o.push($x(t, n, e));
                            n.push(o)
                        }
                        return n
                    })(t),
                    n = Xx(0, 0),
                    r = Uh({
                        dom: {
                            tag: "span",
                            classes: ["tox-insert-table-picker__label"],
                            attributes: {
                                id: t
                            }
                        },
                        components: [n],
                        behaviours: kl([Xp.config({})])
                    });
                return {
                    type: "widget",
                    data: {
                        value: la("widget-id")
                    },
                    dom: {
                        tag: "div",
                        classes: ["tox-fancymenuitem"]
                    },
                    autofocus: !0,
                    components: [Py.widget({
                        dom: {
                            tag: "div",
                            classes: ["tox-insert-table-picker"]
                        },
                        components: qx(o).concat(r.asSpec()),
                        behaviours: kl([Kp("insert-table-picker", [Ys((e => {
                            Xp.set(r.get(e), [n])
                        })), $s(jx, ((e, t, n) => {
                            const {
                                row: s,
                                col: a
                            } = n.event;
                            ((e, t, o, n, r) => {
                                for (let n = 0; n < 10; n++)
                                    for (let r = 0; r < 10; r++) lh.set(e[n][r], n <= t && r <= o)
                            })(o, s, a), Xp.set(r.get(e), [Xx(s + 1, a + 1)])
                        })), $s(Gx, ((t, o, n) => {
                            const {
                                row: r,
                                col: s
                            } = n.event;
                            e.onAction({
                                numRows: r + 1,
                                numColumns: s + 1
                            }), Fs(t, hs())
                        }))]), Hp.config({
                            initSize: {
                                numRows: 10,
                                numColumns: 10
                            },
                            mode: "flatgrid",
                            selector: '[role="button"]'
                        })])
                    })]
                }
            },
            colorswatch: (e, t) => {
                const o = ((e, t) => {
                        const o = e.initData.allowCustomColors && t.colorinput.hasCustomColors();
                        return e.initData.colors.fold((() => Ix(t.colorinput.getColors(e.initData.storageKey), e.initData.storageKey, o)), (e => e.concat(Bx(o))))
                    })(e, t),
                    n = t.colorinput.getColorCols(e.initData.storageKey),
                    r = "color",
                    s = {
                        ...Px(la("menu-value"), o, (t => {
                            e.onAction({
                                value: t
                            })
                        }), n, r, ub.CLOSE_ON_EXECUTE, e.select.getOr(T), t.shared.providers),
                        markers: Ob(r),
                        movement: Wx(n, r)
                    };
                return {
                    type: "widget",
                    data: {
                        value: la("widget-id")
                    },
                    dom: {
                        tag: "div",
                        classes: ["tox-fancymenuitem"]
                    },
                    autofocus: !0,
                    components: [Py.widget(Ah.sketch(s))]
                }
            }
        },
        Yx = e => ({
            type: "separator",
            dom: {
                tag: "div",
                classes: [gb, "tox-collection__group-heading"]
            },
            components: e.text.map(ti).toArray()
        });
    var Jx = Object.freeze({
            __proto__: null,
            getCoupled: (e, t, o, n) => o.getOrCreate(e, t, n),
            getExistingCoupled: (e, t, o, n) => o.getExisting(e, t, n)
        }),
        Zx = [nr("others", $n(rn.value, Nn()))],
        Qx = Object.freeze({
            __proto__: null,
            init: () => {
                const e = {},
                    t = (t, o) => {
                        if (0 === ae(t.others).length) throw new Error("Cannot find any known coupled components");
                        return be(e, o)
                    },
                    o = x({});
                return _a({
                    readState: o,
                    getExisting: (e, o, n) => t(o, n).orThunk((() => (be(o.others, n).getOrDie("No information found for coupled component: " + n), A.none()))),
                    getOrCreate: (o, n, r) => t(n, r).getOrThunk((() => {
                        const t = be(n.others, r).getOrDie("No information found for coupled component: " + r)(o),
                            s = o.getSystem().build(t);
                        return e[r] = s, s
                    }))
                })
            }
        });
    const ew = Ol({
            fields: Zx,
            name: "coupling",
            apis: Jx,
            state: Qx
        }),
        tw = e => {
            let t = A.none(),
                o = [];
            const n = e => {
                    r() ? s(e) : o.push(e)
                },
                r = () => t.isSome(),
                s = e => {
                    t.each((t => {
                        setTimeout((() => {
                            e(t)
                        }), 0)
                    }))
                };
            return e((e => {
                r() || (t = A.some(e), L(o, s), o = [])
            })), {
                get: n,
                map: e => tw((t => {
                    n((o => {
                        t(e(o))
                    }))
                })),
                isReady: r
            }
        },
        ow = {
            nu: tw,
            pure: e => tw((t => {
                t(e)
            }))
        },
        nw = e => {
            setTimeout((() => {
                throw e
            }), 0)
        },
        rw = e => {
            const t = t => {
                e().then(t, nw)
            };
            return {
                map: t => rw((() => e().then(t))),
                bind: t => rw((() => e().then((e => t(e).toPromise())))),
                anonBind: t => rw((() => e().then((() => t.toPromise())))),
                toLazy: () => ow.nu(t),
                toCached: () => {
                    let t = null;
                    return rw((() => (null === t && (t = e()), t)))
                },
                toPromise: e,
                get: t
            }
        },
        sw = e => rw((() => new Promise(e))),
        aw = e => rw((() => Promise.resolve(e))),
        iw = x("sink"),
        lw = x(Uu({
            name: iw(),
            overrides: x({
                dom: {
                    tag: "div"
                },
                behaviours: kl([xd.config({
                    useFixed: E
                })]),
                events: Hs([qs(Yr()), qs(Wr()), qs(es())])
            })
        })),
        cw = (e, t) => {
            const o = e.getHotspot(t).getOr(t),
                n = "hotspot",
                r = e.getAnchorOverrides();
            return e.layouts.fold((() => ({
                type: n,
                hotspot: o,
                overrides: r
            })), (e => ({
                type: n,
                hotspot: o,
                overrides: r,
                layouts: e
            })))
        },
        dw = (e, t, o, n, r, s, a) => {
            const i = ((e, t, o, n, r, s, a) => {
                const i = ((e, t, o) => (0, e.fetch)(o).map(t))(e, t, n),
                    l = gw(n, e);
                return i.map((e => e.bind((e => A.from(zh.sketch({
                    ...s.menu(),
                    uid: ha(""),
                    data: e,
                    highlightOnOpen: a,
                    onOpenMenu: (e, t) => {
                        const n = l().getOrDie();
                        xd.position(n, t, {
                            anchor: o
                        }), $d.decloak(r)
                    },
                    onOpenSubmenu: (e, t, o) => {
                        const n = l().getOrDie();
                        xd.position(n, o, {
                            anchor: {
                                type: "submenu",
                                item: t
                            }
                        }), $d.decloak(r)
                    },
                    onRepositionMenu: (e, t, n) => {
                        const r = l().getOrDie();
                        xd.position(r, t, {
                            anchor: o
                        }), L(n, (e => {
                            xd.position(r, e.triggeredMenu, {
                                anchor: {
                                    type: "submenu",
                                    item: e.triggeringItem
                                }
                            })
                        }))
                    },
                    onEscape: () => (eh.focus(n), $d.close(r), A.some(!0))
                }))))))
            })(e, t, cw(e, o), o, n, r, a);
            return i.map((e => (e.fold((() => {
                $d.isOpen(n) && $d.close(n)
            }), (e => {
                $d.cloak(n), $d.open(n, e), s(n)
            })), n)))
        },
        uw = (e, t, o, n, r, s, a) => ($d.close(n), aw(n)),
        mw = (e, t, o, n, r, s) => {
            const a = ew.getCoupled(o, "sandbox");
            return ($d.isOpen(a) ? uw : dw)(e, t, o, a, n, r, s)
        },
        gw = (e, t) => e.getSystem().getByUid(t.uid + "-" + iw()).map((e => () => rn.value(e))).getOrThunk((() => t.lazySink.fold((() => () => rn.error(new Error("No internal sink is specified, nor could an external sink be found"))), (t => () => t(e))))),
        pw = e => {
            $d.getState(e).each((e => {
                zh.repositionMenus(e)
            }))
        },
        hw = (e, t, o) => {
            const n = bi(),
                r = gw(t, e);
            return {
                dom: {
                    tag: "div",
                    classes: e.sandboxClasses,
                    attributes: {
                        id: n.id,
                        role: "listbox"
                    }
                },
                behaviours: bu(e.sandboxBehaviours, [mu.config({
                    store: {
                        mode: "memory",
                        initialValue: t
                    }
                }), $d.config({
                    onOpen: (r, s) => {
                        const a = cw(e, t);
                        n.link(t.element), e.matchWidth && ((e, t, o) => {
                            const n = ym.getCurrent(t).getOr(t),
                                r = Jt(e.element);
                            o ? Dt(n.element, "min-width", r + "px") : ((e, t) => {
                                Yt.set(e, t)
                            })(n.element, r)
                        })(a.hotspot, s, e.useMinWidth), e.onOpen(a, r, s), void 0 !== o && void 0 !== o.onOpen && o.onOpen(r, s)
                    },
                    onClose: (e, r) => {
                        n.unlink(t.element), void 0 !== o && void 0 !== o.onClose && o.onClose(e, r)
                    },
                    isPartOf: (e, o, n) => vi(o, n) || vi(t, n),
                    getAttachPoint: () => r().getOrDie()
                }), ym.config({
                    find: e => $d.getState(e).bind((e => ym.getCurrent(e)))
                }), Al.config({
                    channels: {
                        ...Jd({
                            isExtraPart: T
                        }),
                        ...Qd({
                            doReposition: pw
                        })
                    }
                })])
            }
        },
        fw = e => {
            const t = ew.getCoupled(e, "sandbox");
            pw(t)
        },
        bw = () => [yr("sandboxClasses", []), fu("sandboxBehaviours", [ym, Al, $d, mu])],
        vw = x([or("dom"), or("fetch"), Di("onOpen"), Bi("onExecute"), yr("getHotspot", A.some), yr("getAnchorOverrides", x({})), wc(), gu("dropdownBehaviours", [lh, ew, Hp, eh]), or("toggleClass"), yr("eventOrder", {}), ur("lazySink"), yr("matchWidth", !1), yr("useMinWidth", !1), ur("role")].concat(bw())),
        yw = x([Pu({
            schema: [Ei(), yr("fakeFocus", !1)],
            name: "menu",
            defaults: e => ({
                onExecute: e.onExecute
            })
        }), lw()]),
        xw = hm({
            name: "Dropdown",
            configFields: vw(),
            partFields: yw(),
            factory: (e, t, o, n) => {
                const r = e => {
                        $d.getState(e).each((e => {
                            zh.highlightPrimary(e)
                        }))
                    },
                    s = (t, o, r) => mw(e, w, t, n, o, r),
                    a = {
                        expand: e => {
                            lh.isOn(e) || s(e, b, Nh.HighlightNone).get(b)
                        },
                        open: e => {
                            lh.isOn(e) || s(e, b, Nh.HighlightMenuAndItem).get(b)
                        },
                        refetch: t => ew.getExistingCoupled(t, "sandbox").fold((() => s(t, b, Nh.HighlightMenuAndItem).map(b)), (o => dw(e, w, t, o, n, b, Nh.HighlightMenuAndItem).map(b))),
                        isOpen: lh.isOn,
                        close: e => {
                            lh.isOn(e) && s(e, b, Nh.HighlightMenuAndItem).get(b)
                        },
                        repositionMenus: e => {
                            lh.isOn(e) && fw(e)
                        }
                    },
                    i = (e, t) => (Rs(e), A.some(!0));
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: hu(e.dropdownBehaviours, [lh.config({
                        toggleClass: e.toggleClass,
                        aria: {
                            mode: "expanded"
                        }
                    }), ew.config({
                        others: {
                            sandbox: t => hw(e, t, {
                                onOpen: () => lh.on(t),
                                onClose: () => lh.off(t)
                            })
                        }
                    }), Hp.config({
                        mode: "special",
                        onSpace: i,
                        onEnter: i,
                        onDown: (e, t) => {
                            if (xw.isOpen(e)) {
                                const t = ew.getCoupled(e, "sandbox");
                                r(t)
                            } else xw.open(e);
                            return A.some(!0)
                        },
                        onEscape: (e, t) => xw.isOpen(e) ? (xw.close(e), A.some(!0)) : A.none()
                    }), eh.config({})]),
                    events: dh(A.some((e => {
                        s(e, r, Nh.HighlightMenuAndItem).get(b)
                    }))),
                    eventOrder: {
                        ...e.eventOrder,
                        [us()]: ["disabling", "toggling", "alloy.base.behaviour"]
                    },
                    apis: a,
                    domModification: {
                        attributes: {
                            "aria-haspopup": "true",
                            ...e.role.fold((() => ({})), (e => ({
                                role: e
                            }))),
                            ..."button" === e.dom.tag ? {
                                type: ("type", be(e.dom, "attributes").bind((e => be(e, "type")))).getOr("button")
                            } : {}
                        }
                    }
                }
            },
            apis: {
                open: (e, t) => e.open(t),
                refetch: (e, t) => e.refetch(t),
                expand: (e, t) => e.expand(t),
                close: (e, t) => e.close(t),
                isOpen: (e, t) => e.isOpen(t),
                repositionMenus: (e, t) => e.repositionMenus(t)
            }
        }),
        ww = (e, t, o) => {
            Vb(e).each((e => {
                var n;
                ((e, t) => {
                    _t(t.element, "id").each((t => kt(e.element, "aria-activedescendant", t)))
                })(e, o), (Ua((n = t).element, Lb) ? A.some(n.element) : pi(n.element, "." + Lb)).each((t => {
                    _t(t, "id").each((t => kt(e.element, "aria-controls", t)))
                }))
            })), kt(o.element, "aria-selected", "true")
        },
        Sw = (e, t, o) => {
            kt(o.element, "aria-selected", "false")
        },
        kw = e => ew.getExistingCoupled(e, "sandbox").bind(Nb).map(zb).map((e => e.fetchPattern)).getOr("");
    var Cw;
    ! function (e) {
        e[e.ContentFocus = 0] = "ContentFocus", e[e.UiFocus = 1] = "UiFocus"
    }(Cw || (Cw = {}));
    const Ow = (e, t, o, n, r) => {
            const s = o.shared.providers,
                a = e => r ? {
                    ...e,
                    shortcut: A.none(),
                    icon: e.text.isSome() ? A.none() : e.icon
                } : e;
            switch (e.type) {
                case "menuitem":
                    return (i = e, qn("menuitem", Qv, i)).fold(qb, (e => A.some(((e, t, o, n = !0) => {
                        const r = Vy({
                            presets: "normal",
                            iconContent: e.icon,
                            textContent: e.text,
                            htmlContent: A.none(),
                            ariaLabel: e.text,
                            caret: A.none(),
                            checkMark: A.none(),
                            shortcutContent: e.shortcut
                        }, o, n);
                        return Ty({
                            data: Ey(e),
                            getApi: e => ({
                                isEnabled: () => !Fm.isDisabled(e),
                                setEnabled: t => Fm.set(e, !t)
                            }),
                            enabled: e.enabled,
                            onAction: e.onAction,
                            onSetup: e.onSetup,
                            triggersSubmenu: !1,
                            itemBehaviours: []
                        }, r, t, o)
                    })(a(e), t, s, n))));
                case "nestedmenuitem":
                    return (e => qn("nestedmenuitem", ey, e))(e).fold(qb, (e => A.some(((e, t, o, n = !0, r = !1) => {
                        const s = r ? (a = o.icons, My("chevron-down", a, [vb])) : (e => My("chevron-right", e, [vb]))(o.icons);
                        var a;
                        const i = Vy({
                            presets: "normal",
                            iconContent: e.icon,
                            textContent: e.text,
                            htmlContent: A.none(),
                            ariaLabel: e.text,
                            caret: A.some(s),
                            checkMark: A.none(),
                            shortcutContent: e.shortcut
                        }, o, n);
                        return Ty({
                            data: Ey(e),
                            getApi: e => ({
                                isEnabled: () => !Fm.isDisabled(e),
                                setEnabled: t => Fm.set(e, !t),
                                setIconFill: (t, o) => {
                                    pi(e.element, `svg path[id="${t}"], rect[id="${t}"]`).each((e => {
                                        kt(e, "fill", o)
                                    }))
                                }
                            }),
                            enabled: e.enabled,
                            onAction: b,
                            onSetup: e.onSetup,
                            triggersSubmenu: !0,
                            itemBehaviours: []
                        }, i, t, o)
                    })(a(e), t, s, n, r))));
                case "togglemenuitem":
                    return (e => qn("togglemenuitem", ty, e))(e).fold(qb, (e => A.some(((e, t, o, n = !0) => {
                        const r = Vy({
                            iconContent: e.icon,
                            textContent: e.text,
                            htmlContent: A.none(),
                            ariaLabel: e.text,
                            checkMark: A.some(Ry(o.icons)),
                            caret: A.none(),
                            shortcutContent: e.shortcut,
                            presets: "normal",
                            meta: e.meta
                        }, o, n);
                        return fn(Ty({
                            data: Ey(e),
                            enabled: e.enabled,
                            getApi: e => ({
                                setActive: t => {
                                    lh.set(e, t)
                                },
                                isActive: () => lh.isOn(e),
                                isEnabled: () => !Fm.isDisabled(e),
                                setEnabled: t => Fm.set(e, !t)
                            }),
                            onAction: e.onAction,
                            onSetup: e.onSetup,
                            triggersSubmenu: !1,
                            itemBehaviours: []
                        }, r, t, o), {
                            toggling: {
                                toggleClass: hb,
                                toggleOnExecute: !1,
                                selected: e.active
                            }
                        })
                    })(a(e), t, s, n))));
                case "separator":
                    return (e => qn("separatormenuitem", Cv, e))(e).fold(qb, (e => A.some(Yx(e))));
                case "fancymenuitem":
                    return (e => qn("fancymenuitem", Zv, e))(e).fold(qb, (e => ((e, t) => be(Kx, e.fancytype).map((o => o(e, t))))(e, o)));
                default:
                    return console.error("Unknown item in general menu", e), A.none()
            }
            var i
        },
        _w = (e, t, o, n, r, s, a) => {
            const i = 1 === n,
                l = !i || $b(e);
            return we(H(e, (e => {
                switch (e.type) {
                    case "separator":
                        return (n = e, qn("Autocompleter.Separator", Cv, n)).fold(qb, (e => A.some(Yx(e))));
                    case "cardmenuitem":
                        return (e => qn("cardmenuitem", qv, e))(e).fold(qb, (e => A.some(((e, t, o, n) => {
                            const r = {
                                dom: Ny(e.label),
                                optComponents: [A.some({
                                    dom: {
                                        tag: "div",
                                        classes: [xb, wb]
                                    },
                                    components: Ly(e.items, n)
                                })]
                            };
                            return Ty({
                                data: Ey({
                                    text: A.none(),
                                    ...e
                                }),
                                enabled: e.enabled,
                                getApi: e => ({
                                    isEnabled: () => !Fm.isDisabled(e),
                                    setEnabled: t => {
                                        Fm.set(e, !t), L(qc(e.element, "*"), (o => {
                                            e.getSystem().getByDom(o).each((e => {
                                                e.hasConfigured(Fm) && Fm.set(e, !t)
                                            }))
                                        }))
                                    }
                                }),
                                onAction: e.onAction,
                                onSetup: e.onSetup,
                                triggersSubmenu: !1,
                                itemBehaviours: A.from(n.itemBehaviours).getOr([])
                            }, r, t, o.providers)
                        })({
                            ...e,
                            onAction: t => {
                                e.onAction(t), o(e.value, e.meta)
                            }
                        }, r, s, {
                            itemBehaviours: zy(e.meta, s),
                            cardText: {
                                matchText: t,
                                highlightOn: a
                            }
                        }))));
                    default:
                        return (e => qn("Autocompleter.Item", Ov, e))(e).fold(qb, (e => A.some(((e, t, o, n, r, s, a, i = !0) => {
                            const l = Vy({
                                presets: n,
                                textContent: A.none(),
                                htmlContent: o ? e.text.map((e => Hy(e, t))) : A.none(),
                                ariaLabel: e.text,
                                iconContent: e.icon,
                                shortcutContent: A.none(),
                                checkMark: A.none(),
                                caret: A.none(),
                                value: e.value
                            }, a.providers, i, e.icon);
                            return Ty({
                                data: Ey(e),
                                enabled: e.enabled,
                                getApi: x({}),
                                onAction: t => r(e.value, e.meta),
                                onSetup: x(b),
                                triggersSubmenu: !1,
                                itemBehaviours: zy(e.meta, a)
                            }, l, s, a.providers)
                        })(e, t, i, "normal", o, r, s, l))))
                }
                var n
            })))
        },
        Tw = (e, t, o, n, r, s) => {
            const a = $b(t),
                i = we(H(t, (e => {
                    const t = e => Ow(e, o, n, (e => r ? !ve(e, "text") : a)(e), r);
                    return "nestedmenuitem" === e.type && e.getSubmenuItems().length <= 0 ? t({
                        ...e,
                        enabled: !1
                    }) : t(e)
                }))),
                l = (e => "no-search" === e.searchMode ? {
                    menuType: "normal"
                } : {
                    menuType: "searchable",
                    searchMode: e
                })(s);
            return (r ? Xb : Kb)(e, a, i, 1, l)
        },
        Ew = e => zh.singleData(e.value, e),
        Aw = (e, t) => {
            const o = Er(!1),
                n = Er(!1),
                r = si(Hh.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-autocompleter"]
                    },
                    components: [],
                    fireDismissalEventInstead: {},
                    inlineBehaviours: kl([Kp("dismissAutocompleter", [Us(Cs(), (() => c()))])]),
                    lazySink: t.getSink
                })),
                s = () => Hh.isOpen(r),
                a = n.get,
                i = () => {
                    s() && Hh.hide(r)
                },
                l = () => Hh.getContent(r).bind((e => te(e.components(), 0))),
                c = () => e.execCommand("mceAutocompleterClose"),
                d = n => {
                    const s = (n => {
                        const r = se(n, (e => A.from(e.columns))).getOr(1);
                        return X(n, (n => {
                            const s = n.items;
                            return _w(s, n.matchText, ((t, r) => {
                                const s = e.selection.getRng();
                                ((e, t) => cb(Ve(t.startContainer)).map((t => {
                                    const o = e.createRng();
                                    return o.selectNode(t.dom), o
                                })))(e.dom, s).each((s => {
                                    const a = {
                                        hide: () => c(),
                                        reload: t => {
                                            i(), e.execCommand("mceAutocompleterReload", !1, {
                                                fetchOptions: t
                                            })
                                        }
                                    };
                                    o.set(!0), n.onAction(a, s, t, r), o.set(!1)
                                }))
                            }), r, ub.BUBBLE_TO_SANDBOX, t, n.highlightOn)
                        }))
                    })(n);
                    s.length > 0 ? ((t, o) => {
                        var n;
                        (n = Ve(e.getBody()), pi(n, lb)).each((n => {
                            const s = se(t, (e => A.from(e.columns))).getOr(1);
                            Hh.showMenuAt(r, {
                                anchor: {
                                    type: "node",
                                    root: Ve(e.getBody()),
                                    node: A.from(n)
                                }
                            }, ((e, t, o, n) => {
                                const r = Wx(t, n),
                                    s = Ob(n);
                                return {
                                    data: Ew({
                                        ...e,
                                        movement: r,
                                        menuBehaviours: ny("auto" !== t ? [] : [Ys(((e, t) => {
                                            oy(e, 4, s.item).each((({
                                                numColumns: t,
                                                numRows: o
                                            }) => {
                                                Hp.setGridSize(e, o, t)
                                            }))
                                        }))])
                                    }),
                                    menu: {
                                        markers: Ob(n),
                                        fakeFocus: o === Cw.ContentFocus
                                    }
                                }
                            })(Kb("autocompleter-value", !0, o, s, {
                                menuType: "normal"
                            }), s, Cw.ContentFocus, "normal"))
                        })), l().each(Wm.highlightFirst)
                    })(n, s) : i()
                };
            e.on("AutocompleterStart", (({
                lookupData: e
            }) => {
                n.set(!0), o.set(!1), d(e)
            })), e.on("AutocompleterUpdate", (({
                lookupData: e
            }) => d(e))), e.on("AutocompleterEnd", (() => {
                i(), n.set(!1), o.set(!1)
            }));
            ((e, t) => {
                const o = (e, t) => {
                        Is(e, Yr(), {
                            raw: t
                        })
                    },
                    n = () => e.getMenu().bind(Wm.getHighlighted);
                t.on("keydown", (t => {
                    const r = t.which;
                    e.isActive() && (e.isMenuOpen() ? 13 === r ? (n().each(Rs), t.preventDefault()) : 40 === r ? (n().fold((() => {
                        e.getMenu().each(Wm.highlightFirst)
                    }), (e => {
                        o(e, t)
                    })), t.preventDefault(), t.stopImmediatePropagation()) : 37 !== r && 38 !== r && 39 !== r || n().each((e => {
                        o(e, t), t.preventDefault(), t.stopImmediatePropagation()
                    })) : 13 !== r && 38 !== r && 40 !== r || e.cancelIfNecessary())
                })), t.on("NodeChange", (t => {
                    e.isActive() && !e.isProcessingAction() && cb(Ve(t.element)).isNone() && e.cancelIfNecessary()
                }))
            })({
                cancelIfNecessary: c,
                isMenuOpen: s,
                isActive: a,
                isProcessingAction: o.get,
                getMenu: l
            }, e)
        },
        Mw = ["visible", "hidden"],
        Dw = e => {
            if (je(e)) {
                const t = It(e, "overflow");
                return Me(t).length > 0 && !R(Mw, t)
            }
            return !1
        },
        Bw = (e, t) => sb(e) ? (e => {
            const t = (o = Dw, U(((e, t) => {
                const o = p(t) ? t : T;
                let n = e.dom;
                const r = [];
                for (; null !== n.parentNode && void 0 !== n.parentNode;) {
                    const e = n.parentNode,
                        t = Ve(e);
                    if (r.push(t), !0 === o(t)) break;
                    n = e
                }
                return r
            })(e, n), o));
            var o, n;
            return oe(t).map((e => ({
                element: e,
                others: t.slice(1)
            })))
        })(t) : A.none(),
        Fw = e => {
            const t = [...H(e.others, Jo), en()];
            return ((e, t) => j(t, ((e, t) => Qo(e, t)), e))(Jo(e.element), t)
        },
        Iw = (e, t, o) => hi(e, t, o).isSome(),
        Rw = (e, t) => {
            let o = null;
            return {
                cancel: () => {
                    null !== o && (clearTimeout(o), o = null)
                },
                schedule: (...n) => {
                    o = setTimeout((() => {
                        e.apply(null, n), o = null
                    }), t)
                }
            }
        },
        Nw = e => {
            const t = e.raw;
            return void 0 === t.touches || 1 !== t.touches.length ? A.none() : A.some(t.touches[0])
        },
        Vw = (e, t) => {
            const o = {
                    stopBackspace: !0,
                    ...t
                },
                n = (e => {
                    const t = Ql(),
                        o = Er(!1),
                        n = Rw((t => {
                            e.triggerEvent(ps(), t), o.set(!0)
                        }), 400),
                        r = Dr([{
                            key: Hr(),
                            value: e => (Nw(e).each((r => {
                                n.cancel();
                                const s = {
                                    x: r.clientX,
                                    y: r.clientY,
                                    target: e.target
                                };
                                n.schedule(e), o.set(!1), t.set(s)
                            })), A.none())
                        }, {
                            key: Lr(),
                            value: e => (n.cancel(), Nw(e).each((e => {
                                t.on((o => {
                                    ((e, t) => {
                                        const o = Math.abs(e.clientX - t.x),
                                            n = Math.abs(e.clientY - t.y);
                                        return o > 5 || n > 5
                                    })(e, o) && t.clear()
                                }))
                            })), A.none())
                        }, {
                            key: Pr(),
                            value: r => (n.cancel(), t.get().filter((e => Ze(e.target, r.target))).map((t => o.get() ? (r.prevent(), !1) : e.triggerEvent(gs(), r))))
                        }]);
                    return {
                        fireIfReady: (e, t) => be(r, t).bind((t => t(e)))
                    }
                })(o),
                r = H(["touchstart", "touchmove", "touchend", "touchcancel", "gesturestart", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout", "click"].concat(["selectstart", "input", "contextmenu", "change", "transitionend", "transitioncancel", "drag", "dragstart", "dragend", "dragenter", "dragleave", "dragover", "drop", "keyup"]), (t => tc(e, t, (e => {
                    n.fireIfReady(e, t).each((t => {
                        t && e.kill()
                    })), o.triggerEvent(t, e) && e.kill()
                })))),
                s = Ql(),
                a = tc(e, "paste", (e => {
                    n.fireIfReady(e, "paste").each((t => {
                        t && e.kill()
                    })), o.triggerEvent("paste", e) && e.kill(), s.set(setTimeout((() => {
                        o.triggerEvent(cs(), e)
                    }), 0))
                })),
                i = tc(e, "keydown", (e => {
                    o.triggerEvent("keydown", e) ? e.kill() : o.stopBackspace && (e => e.raw.which === jm[0] && !R(["input", "textarea"], Ue(e.target)) && !Iw(e.target, '[contenteditable="true"]'))(e) && e.prevent()
                })),
                l = tc(e, "focusin", (e => {
                    o.triggerEvent("focusin", e) && e.kill()
                })),
                c = Ql(),
                d = tc(e, "focusout", (e => {
                    o.triggerEvent("focusout", e) && e.kill(), c.set(setTimeout((() => {
                        o.triggerEvent(ls(), e)
                    }), 0))
                }));
            return {
                unbind: () => {
                    L(r, (e => {
                        e.unbind()
                    })), i.unbind(), l.unbind(), d.unbind(), a.unbind(), s.on(clearTimeout), c.on(clearTimeout)
                }
            }
        },
        zw = (e, t) => {
            const o = be(e, "target").getOr(t);
            return Er(o)
        },
        Hw = Ar([{
            stopped: []
        }, {
            resume: ["element"]
        }, {
            complete: []
        }]),
        Lw = (e, t, o, n, r, s) => {
            const a = e(t, n),
                i = ((e, t) => {
                    const o = Er(!1),
                        n = Er(!1);
                    return {
                        stop: () => {
                            o.set(!0)
                        },
                        cut: () => {
                            n.set(!0)
                        },
                        isStopped: o.get,
                        isCut: n.get,
                        event: e,
                        setSource: t.set,
                        getSource: t.get
                    }
                })(o, r);
            return a.fold((() => (s.logEventNoHandlers(t, n), Hw.complete())), (e => {
                const o = e.descHandler;
                return Aa(o)(i), i.isStopped() ? (s.logEventStopped(t, e.element, o.purpose), Hw.stopped()) : i.isCut() ? (s.logEventCut(t, e.element, o.purpose), Hw.complete()) : rt(e.element).fold((() => (s.logNoParent(t, e.element, o.purpose), Hw.complete())), (n => (s.logEventResponse(t, e.element, o.purpose), Hw.resume(n))))
            }))
        },
        Pw = (e, t, o, n, r, s) => Lw(e, t, o, n, r, s).fold(E, (n => Pw(e, t, o, n, r, s)), T),
        Uw = (e, t, o, n, r) => {
            const s = zw(o, n);
            return Pw(e, t, o, n, s, r)
        },
        Ww = () => {
            const e = (() => {
                    const e = {};
                    return {
                        registerId: (t, o, n) => {
                            le(n, ((n, r) => {
                                const s = void 0 !== e[r] ? e[r] : {};
                                s[o] = ((e, t) => ({
                                    cHandler: k.apply(void 0, [e.handler].concat(t)),
                                    purpose: e.purpose
                                }))(n, t), e[r] = s
                            }))
                        },
                        unregisterId: t => {
                            le(e, ((e, o) => {
                                ve(e, t) && delete e[t]
                            }))
                        },
                        filterByType: t => be(e, t).map((e => pe(e, ((e, t) => ((e, t) => ({
                            id: e,
                            descHandler: t
                        }))(t, e))))).getOr([]),
                        find: (t, o, n) => be(e, o).bind((e => Ir(n, (t => ((e, t) => pa(t).bind((t => be(e, t))).map((e => ((e, t) => ({
                            element: e,
                            descHandler: t
                        }))(t, e))))(e, t)), t)))
                    }
                })(),
                t = {},
                o = o => {
                    pa(o.element).each((o => {
                        delete t[o], e.unregisterId(o)
                    }))
                };
            return {
                find: (t, o, n) => e.find(t, o, n),
                filter: t => e.filterByType(t),
                register: n => {
                    const r = (e => {
                        const t = e.element;
                        return pa(t).getOrThunk((() => ((e, t) => {
                            const o = la(ua + "uid-");
                            return ga(t, o), o
                        })(0, e.element)))
                    })(n);
                    ye(t, r) && ((e, n) => {
                        const r = t[n];
                        if (r !== e) throw new Error('The tagId "' + n + '" is already used by: ' + na(r.element) + "\nCannot use it for: " + na(e.element) + "\nThe conflicting element is" + (yt(r.element) ? " " : " not ") + "already in the DOM");
                        o(e)
                    })(n, r);
                    const s = [n];
                    e.registerId(s, r, n.events), t[r] = n
                },
                unregister: o,
                getById: e => be(t, e)
            }
        },
        jw = pm({
            name: "Container",
            factory: e => {
                const {
                    attributes: t,
                    ...o
                } = e.dom;
                return {
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        attributes: {
                            role: "presentation",
                            ...t
                        },
                        ...o
                    },
                    components: e.components,
                    behaviours: pu(e.containerBehaviours),
                    events: e.events,
                    domModification: e.domModification,
                    eventOrder: e.eventOrder
                }
            },
            configFields: [yr("components", []), gu("containerBehaviours", []), yr("events", {}), yr("domModification", {}), yr("eventOrder", {})]
        }),
        Gw = e => {
            const t = t => rt(e.element).fold(E, (e => Ze(t, e))),
                o = Ww(),
                n = (e, n) => o.find(t, e, n),
                r = Vw(e.element, {
                    triggerEvent: (e, t) => Si(e, t.target, (o => ((e, t, o, n) => Uw(e, t, o, o.target, n))(n, e, t, o)))
                }),
                s = {
                    debugInfo: x("real"),
                    triggerEvent: (e, t, o) => {
                        Si(e, t, (r => Uw(n, e, o, t, r)))
                    },
                    triggerFocus: (e, t) => {
                        pa(e).fold((() => {
                            Dl(e)
                        }), (o => {
                            Si(is(), e, (o => (((e, t, o, n, r) => {
                                const s = zw(o, n);
                                Lw(e, t, o, n, s, r)
                            })(n, is(), {
                                originator: t,
                                kill: b,
                                prevent: b,
                                target: e
                            }, e, o), !1)))
                        }))
                    },
                    triggerEscape: (e, t) => {
                        s.triggerEvent("keydown", e.element, t.event)
                    },
                    getByUid: e => p(e),
                    getByDom: e => h(e),
                    build: si,
                    buildOrPatch: ri,
                    addToGui: e => {
                        l(e)
                    },
                    removeFromGui: e => {
                        c(e)
                    },
                    addToWorld: e => {
                        a(e)
                    },
                    removeFromWorld: e => {
                        i(e)
                    },
                    broadcast: e => {
                        u(e)
                    },
                    broadcastOn: (e, t) => {
                        m(e, t)
                    },
                    broadcastEvent: (e, t) => {
                        g(e, t)
                    },
                    isConnected: E
                },
                a = e => {
                    e.connect(s), $e(e.element) || (o.register(e), L(e.components(), a), s.triggerEvent(bs(), e.element, {
                        target: e.element
                    }))
                },
                i = e => {
                    $e(e.element) || (L(e.components(), i), o.unregister(e)), e.disconnect()
                },
                l = t => {
                    Td(e, t)
                },
                c = e => {
                    Md(e)
                },
                d = e => {
                    const t = o.filter(ds());
                    L(t, (t => {
                        const o = t.descHandler;
                        Aa(o)(e)
                    }))
                },
                u = e => {
                    d({
                        universal: !0,
                        data: e
                    })
                },
                m = (e, t) => {
                    d({
                        universal: !1,
                        channels: e,
                        data: t
                    })
                },
                g = (e, t) => ((e, t, o) => {
                    const n = (e => {
                        const t = Er(!1);
                        return {
                            stop: () => {
                                t.set(!0)
                            },
                            cut: b,
                            isStopped: t.get,
                            isCut: T,
                            event: e,
                            setSource: O("Cannot set source of a broadcasted event"),
                            getSource: O("Cannot get source of a broadcasted event")
                        }
                    })(t);
                    return L(e, (e => {
                        const t = e.descHandler;
                        Aa(t)(n)
                    })), n.isStopped()
                })(o.filter(e), t),
                p = e => o.getById(e).fold((() => rn.error(new Error('Could not find component with uid: "' + e + '" in system.'))), rn.value),
                h = e => {
                    const t = pa(e).getOr("not found");
                    return p(t)
                };
            return a(e), {
                root: e,
                element: e.element,
                destroy: () => {
                    r.unbind(), Po(e.element)
                },
                add: l,
                remove: c,
                getByUid: p,
                getByDom: h,
                addToWorld: a,
                removeFromWorld: i,
                broadcast: u,
                broadcastOn: m,
                broadcastEvent: g
            }
        },
        $w = x([yr("prefix", "form-field"), gu("fieldBehaviours", [ym, mu])]),
        qw = x([Uu({
            schema: [or("dom")],
            name: "label"
        }), Uu({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "span",
                        styles: {
                            display: "none"
                        },
                        attributes: {
                            "aria-hidden": "true"
                        },
                        innerHtml: e.text
                    }
                })
            },
            schema: [or("text")],
            name: "aria-descriptor"
        }), Lu({
            factory: {
                sketch: e => {
                    const t = ((e, t) => {
                        const o = {};
                        return le(e, ((e, n) => {
                            R(t, n) || (o[n] = e)
                        })), o
                    })(e, ["factory"]);
                    return e.factory.sketch(t)
                }
            },
            schema: [or("factory")],
            name: "field"
        })]),
        Xw = hm({
            name: "FormField",
            configFields: $w(),
            partFields: qw(),
            factory: (e, t, o, n) => {
                const r = hu(e.fieldBehaviours, [ym.config({
                        find: t => em(t, e, "field")
                    }), mu.config({
                        store: {
                            mode: "manual",
                            getValue: e => ym.getCurrent(e).bind(mu.getValue),
                            setValue: (e, t) => {
                                ym.getCurrent(e).each((e => {
                                    mu.setValue(e, t)
                                }))
                            }
                        }
                    })]),
                    s = Hs([Ys(((t, o) => {
                        const n = om(t, e, ["label", "field", "aria-descriptor"]);
                        n.field().each((t => {
                            const o = la(e.prefix);
                            n.label().each((e => {
                                kt(e.element, "for", o), kt(t.element, "id", o)
                            })), n["aria-descriptor"]().each((o => {
                                const n = la(e.prefix);
                                kt(o.element, "id", n), kt(t.element, "aria-describedby", n)
                            }))
                        }))
                    }))]),
                    a = {
                        getField: t => em(t, e, "field"),
                        getLabel: t => em(t, e, "label")
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: r,
                    events: s,
                    apis: a
                }
            },
            apis: {
                getField: (e, t) => e.getField(t),
                getLabel: (e, t) => e.getLabel(t)
            }
        });
    var Kw = Object.freeze({
            __proto__: null,
            exhibit: (e, t) => Ea({
                attributes: Dr([{
                    key: t.tabAttr,
                    value: "true"
                }])
            })
        }),
        Yw = [yr("tabAttr", "data-alloy-tabstop")];
    const Jw = Ol({
        fields: Yw,
        name: "tabstopping",
        active: Kw
    });
    var Zw = tinymce.util.Tools.resolve("tinymce.html.Entities");
    const Qw = (e, t, o, n) => {
            const r = eS(e, t, o, n);
            return Xw.sketch(r)
        },
        eS = (e, t, o, n) => ({
            dom: tS(o),
            components: e.toArray().concat([t]),
            fieldBehaviours: kl(n)
        }),
        tS = e => ({
            tag: "div",
            classes: ["tox-form__group"].concat(e)
        }),
        oS = (e, t) => Xw.parts.label({
            dom: {
                tag: "label",
                classes: ["tox-label"]
            },
            components: [ti(t.translate(e))]
        }),
        nS = la("form-component-change"),
        rS = la("form-close"),
        sS = la("form-cancel"),
        aS = la("form-action"),
        iS = la("form-submit"),
        lS = la("form-block"),
        cS = la("form-unblock"),
        dS = la("form-tabchange"),
        uS = la("form-resize"),
        mS = ["input", "textarea"],
        gS = e => {
            const t = Ue(e);
            return R(mS, t)
        },
        pS = (e, t) => {
            const o = t.getRoot(e).getOr(e.element);
            Pa(o, t.invalidClass), t.notify.each((t => {
                gS(e.element) && kt(e.element, "aria-invalid", !1), t.getContainer(e).each((e => {
                    ta(e, t.validHtml)
                })), t.onValid(e)
            }))
        },
        hS = (e, t, o, n) => {
            const r = t.getRoot(e).getOr(e.element);
            La(r, t.invalidClass), t.notify.each((t => {
                gS(e.element) && kt(e.element, "aria-invalid", !0), t.getContainer(e).each((e => {
                    ta(e, n)
                })), t.onInvalid(e, n)
            }))
        },
        fS = (e, t, o) => t.validator.fold((() => aw(rn.value(!0))), (t => t.validate(e))),
        bS = (e, t, o) => (t.notify.each((t => {
            t.onValidate(e)
        })), fS(e, t).map((o => e.getSystem().isConnected() ? o.fold((o => (hS(e, t, 0, o), rn.error(o))), (o => (pS(e, t), rn.value(o)))) : rn.error("No longer in system"))));
    var vS = Object.freeze({
            __proto__: null,
            markValid: pS,
            markInvalid: hS,
            query: fS,
            run: bS,
            isInvalid: (e, t) => {
                const o = t.getRoot(e).getOr(e.element);
                return Ua(o, t.invalidClass)
            }
        }),
        yS = Object.freeze({
            __proto__: null,
            events: (e, t) => e.validator.map((t => Hs([Us(t.onEvent, (t => {
                bS(t, e).get(w)
            }))].concat(t.validateOnLoad ? [Ys((t => {
                bS(t, e).get(b)
            }))] : [])))).getOr({})
        }),
        xS = [or("invalidClass"), yr("getRoot", A.none), vr("notify", [yr("aria", "alert"), yr("getContainer", A.none), yr("validHtml", ""), Di("onValid"), Di("onInvalid"), Di("onValidate")]), vr("validator", [or("validate"), yr("onEvent", "input"), yr("validateOnLoad", !0)])];
    const wS = Ol({
            fields: xS,
            name: "invalidating",
            active: yS,
            apis: vS,
            extra: {
                validation: e => t => {
                    const o = mu.getValue(t);
                    return aw(e(o))
                }
            }
        }),
        SS = Ol({
            fields: [],
            name: "unselecting",
            active: Object.freeze({
                __proto__: null,
                events: () => Hs([Ls(rs(), E)]),
                exhibit: () => Ea({
                    styles: {
                        "-webkit-user-select": "none",
                        "user-select": "none",
                        "-ms-user-select": "none",
                        "-moz-user-select": "-moz-none"
                    },
                    attributes: {
                        unselectable: "on"
                    }
                })
            })
        }),
        kS = la("color-input-change"),
        CS = la("color-swatch-change"),
        OS = la("color-picker-cancel"),
        _S = Uu({
            schema: [or("dom")],
            name: "label"
        }),
        TS = e => Uu({
            name: e + "-edge",
            overrides: t => t.model.manager.edgeActions[e].fold((() => ({})), (e => ({
                events: Hs([Ws(Hr(), ((t, o, n) => e(t, n)), [t]), Ws(Wr(), ((t, o, n) => e(t, n)), [t]), Ws(jr(), ((t, o, n) => {
                    n.mouseIsDown.get() && e(t, n)
                }), [t])])
            })))
        }),
        ES = TS("top-left"),
        AS = TS("top"),
        MS = TS("top-right"),
        DS = TS("right"),
        BS = TS("bottom-right"),
        FS = TS("bottom"),
        IS = TS("bottom-left");
    var RS = [_S, TS("left"), DS, AS, FS, ES, MS, IS, BS, Lu({
        name: "thumb",
        defaults: x({
            dom: {
                styles: {
                    position: "absolute"
                }
            }
        }),
        overrides: e => ({
            events: Hs([Gs(Hr(), e, "spectrum"), Gs(Lr(), e, "spectrum"), Gs(Pr(), e, "spectrum"), Gs(Wr(), e, "spectrum"), Gs(jr(), e, "spectrum"), Gs($r(), e, "spectrum")])
        })
    }), Lu({
        schema: [er("mouseIsDown", (() => Er(!1)))],
        name: "spectrum",
        overrides: e => {
            const t = e.model.manager,
                o = (o, n) => t.getValueFromEvent(n).map((n => t.setValueFrom(o, e, n)));
            return {
                behaviours: kl([Hp.config({
                    mode: "special",
                    onLeft: o => t.onLeft(o, e),
                    onRight: o => t.onRight(o, e),
                    onUp: o => t.onUp(o, e),
                    onDown: o => t.onDown(o, e)
                }), eh.config({})]),
                events: Hs([Us(Hr(), o), Us(Lr(), o), Us(Wr(), o), Us(jr(), ((t, n) => {
                    e.mouseIsDown.get() && o(t, n)
                }))])
            }
        }
    })];
    const NS = x("slider.change.value"),
        VS = e => {
            const t = e.event.raw;
            if ((e => -1 !== e.type.indexOf("touch"))(t)) {
                const e = t;
                return void 0 !== e.touches && 1 === e.touches.length ? A.some(e.touches[0]).map((e => $t(e.clientX, e.clientY))) : A.none()
            } {
                const e = t;
                return void 0 !== e.clientX ? A.some(e).map((e => $t(e.clientX, e.clientY))) : A.none()
            }
        },
        zS = e => e.model.minX,
        HS = e => e.model.minY,
        LS = e => e.model.minX - 1,
        PS = e => e.model.minY - 1,
        US = e => e.model.maxX,
        WS = e => e.model.maxY,
        jS = e => e.model.maxX + 1,
        GS = e => e.model.maxY + 1,
        $S = (e, t, o) => t(e) - o(e),
        qS = e => $S(e, US, zS),
        XS = e => $S(e, WS, HS),
        KS = e => qS(e) / 2,
        YS = e => XS(e) / 2,
        JS = e => e.stepSize,
        ZS = e => e.snapToGrid,
        QS = e => e.snapStart,
        ek = e => e.rounded,
        tk = (e, t) => void 0 !== e[t + "-edge"],
        ok = e => tk(e, "left"),
        nk = e => tk(e, "right"),
        rk = e => tk(e, "top"),
        sk = e => tk(e, "bottom"),
        ak = e => e.model.value.get(),
        ik = (e, t) => ({
            x: e,
            y: t
        }),
        lk = (e, t) => {
            Is(e, NS(), {
                value: t
            })
        },
        ck = (e, t, o, n) => e < t ? e : e > o ? o : e === t ? t - 1 : Math.max(t, e - n),
        dk = (e, t, o, n) => e > o ? e : e < t ? t : e === o ? o + 1 : Math.min(o, e + n),
        uk = (e, t, o) => Math.max(t, Math.min(o, e)),
        mk = e => {
            const {
                min: t,
                max: o,
                range: n,
                value: r,
                step: s,
                snap: a,
                snapStart: i,
                rounded: l,
                hasMinEdge: c,
                hasMaxEdge: d,
                minBound: u,
                maxBound: m,
                screenRange: g
            } = e, p = c ? t - 1 : t, h = d ? o + 1 : o;
            if (r < u) return p;
            if (r > m) return h; {
                const e = ((e, t, o) => Math.min(o, Math.max(e, t)) - t)(r, u, m),
                    c = uk(e / g * n + t, p, h);
                return a && c >= t && c <= o ? ((e, t, o, n, r) => r.fold((() => {
                    const r = e - t,
                        s = Math.round(r / n) * n;
                    return uk(t + s, t - 1, o + 1)
                }), (t => {
                    const r = (e - t) % n,
                        s = Math.round(r / n),
                        a = Math.floor((e - t) / n),
                        i = Math.floor((o - t) / n),
                        l = t + Math.min(i, a + s) * n;
                    return Math.max(t, l)
                })))(c, t, o, s, i) : l ? Math.round(c) : c
            }
        },
        gk = e => {
            const {
                min: t,
                max: o,
                range: n,
                value: r,
                hasMinEdge: s,
                hasMaxEdge: a,
                maxBound: i,
                maxOffset: l,
                centerMinEdge: c,
                centerMaxEdge: d
            } = e;
            return r < t ? s ? 0 : c : r > o ? a ? i : d : (r - t) / n * l
        },
        pk = "top",
        hk = "right",
        fk = "bottom",
        bk = "left",
        vk = e => e.element.dom.getBoundingClientRect(),
        yk = (e, t) => e[t],
        xk = e => {
            const t = vk(e);
            return yk(t, bk)
        },
        wk = e => {
            const t = vk(e);
            return yk(t, hk)
        },
        Sk = e => {
            const t = vk(e);
            return yk(t, pk)
        },
        kk = e => {
            const t = vk(e);
            return yk(t, fk)
        },
        Ck = e => {
            const t = vk(e);
            return yk(t, "width")
        },
        Ok = e => {
            const t = vk(e);
            return yk(t, "height")
        },
        _k = (e, t, o) => (e + t) / 2 - o,
        Tk = (e, t) => {
            const o = vk(e),
                n = vk(t),
                r = yk(o, bk),
                s = yk(o, hk),
                a = yk(n, bk);
            return _k(r, s, a)
        },
        Ek = (e, t) => {
            const o = vk(e),
                n = vk(t),
                r = yk(o, pk),
                s = yk(o, fk),
                a = yk(n, pk);
            return _k(r, s, a)
        },
        Ak = (e, t) => {
            Is(e, NS(), {
                value: t
            })
        },
        Mk = (e, t, o) => {
            const n = {
                min: zS(t),
                max: US(t),
                range: qS(t),
                value: o,
                step: JS(t),
                snap: ZS(t),
                snapStart: QS(t),
                rounded: ek(t),
                hasMinEdge: ok(t),
                hasMaxEdge: nk(t),
                minBound: xk(e),
                maxBound: wk(e),
                screenRange: Ck(e)
            };
            return mk(n)
        },
        Dk = e => (t, o) => ((e, t, o) => {
            const n = (e > 0 ? dk : ck)(ak(o), zS(o), US(o), JS(o));
            return Ak(t, n), A.some(n)
        })(e, t, o).map(E),
        Bk = (e, t, o, n, r, s) => {
            const a = ((e, t, o, n, r) => {
                const s = Ck(e),
                    a = n.bind((t => A.some(Tk(t, e)))).getOr(0),
                    i = r.bind((t => A.some(Tk(t, e)))).getOr(s),
                    l = {
                        min: zS(t),
                        max: US(t),
                        range: qS(t),
                        value: o,
                        hasMinEdge: ok(t),
                        hasMaxEdge: nk(t),
                        minBound: xk(e),
                        minOffset: 0,
                        maxBound: wk(e),
                        maxOffset: s,
                        centerMinEdge: a,
                        centerMaxEdge: i
                    };
                return gk(l)
            })(t, s, o, n, r);
            return xk(t) - xk(e) + a
        },
        Fk = Dk(-1),
        Ik = Dk(1),
        Rk = A.none,
        Nk = A.none,
        Vk = {
            "top-left": A.none(),
            top: A.none(),
            "top-right": A.none(),
            right: A.some(((e, t) => {
                lk(e, jS(t))
            })),
            "bottom-right": A.none(),
            bottom: A.none(),
            "bottom-left": A.none(),
            left: A.some(((e, t) => {
                lk(e, LS(t))
            }))
        };
    var zk = Object.freeze({
        __proto__: null,
        setValueFrom: (e, t, o) => {
            const n = Mk(e, t, o);
            return Ak(e, n), n
        },
        setToMin: (e, t) => {
            const o = zS(t);
            Ak(e, o)
        },
        setToMax: (e, t) => {
            const o = US(t);
            Ak(e, o)
        },
        findValueOfOffset: Mk,
        getValueFromEvent: e => VS(e).map((e => e.left)),
        findPositionOfValue: Bk,
        setPositionFromValue: (e, t, o, n) => {
            const r = ak(o),
                s = Bk(e, n.getSpectrum(e), r, n.getLeftEdge(e), n.getRightEdge(e), o),
                a = Jt(t.element) / 2;
            Dt(t.element, "left", s - a + "px")
        },
        onLeft: Fk,
        onRight: Ik,
        onUp: Rk,
        onDown: Nk,
        edgeActions: Vk
    });
    const Hk = (e, t) => {
            Is(e, NS(), {
                value: t
            })
        },
        Lk = (e, t, o) => {
            const n = {
                min: HS(t),
                max: WS(t),
                range: XS(t),
                value: o,
                step: JS(t),
                snap: ZS(t),
                snapStart: QS(t),
                rounded: ek(t),
                hasMinEdge: rk(t),
                hasMaxEdge: sk(t),
                minBound: Sk(e),
                maxBound: kk(e),
                screenRange: Ok(e)
            };
            return mk(n)
        },
        Pk = e => (t, o) => ((e, t, o) => {
            const n = (e > 0 ? dk : ck)(ak(o), HS(o), WS(o), JS(o));
            return Hk(t, n), A.some(n)
        })(e, t, o).map(E),
        Uk = (e, t, o, n, r, s) => {
            const a = ((e, t, o, n, r) => {
                const s = Ok(e),
                    a = n.bind((t => A.some(Ek(t, e)))).getOr(0),
                    i = r.bind((t => A.some(Ek(t, e)))).getOr(s),
                    l = {
                        min: HS(t),
                        max: WS(t),
                        range: XS(t),
                        value: o,
                        hasMinEdge: rk(t),
                        hasMaxEdge: sk(t),
                        minBound: Sk(e),
                        minOffset: 0,
                        maxBound: kk(e),
                        maxOffset: s,
                        centerMinEdge: a,
                        centerMaxEdge: i
                    };
                return gk(l)
            })(t, s, o, n, r);
            return Sk(t) - Sk(e) + a
        },
        Wk = A.none,
        jk = A.none,
        Gk = Pk(-1),
        $k = Pk(1),
        qk = {
            "top-left": A.none(),
            top: A.some(((e, t) => {
                lk(e, PS(t))
            })),
            "top-right": A.none(),
            right: A.none(),
            "bottom-right": A.none(),
            bottom: A.some(((e, t) => {
                lk(e, GS(t))
            })),
            "bottom-left": A.none(),
            left: A.none()
        };
    var Xk = Object.freeze({
        __proto__: null,
        setValueFrom: (e, t, o) => {
            const n = Lk(e, t, o);
            return Hk(e, n), n
        },
        setToMin: (e, t) => {
            const o = HS(t);
            Hk(e, o)
        },
        setToMax: (e, t) => {
            const o = WS(t);
            Hk(e, o)
        },
        findValueOfOffset: Lk,
        getValueFromEvent: e => VS(e).map((e => e.top)),
        findPositionOfValue: Uk,
        setPositionFromValue: (e, t, o, n) => {
            const r = ak(o),
                s = Uk(e, n.getSpectrum(e), r, n.getTopEdge(e), n.getBottomEdge(e), o),
                a = Wt(t.element) / 2;
            Dt(t.element, "top", s - a + "px")
        },
        onLeft: Wk,
        onRight: jk,
        onUp: Gk,
        onDown: $k,
        edgeActions: qk
    });
    const Kk = (e, t) => {
            Is(e, NS(), {
                value: t
            })
        },
        Yk = (e, t) => ({
            x: e,
            y: t
        }),
        Jk = (e, t) => (o, n) => ((e, t, o, n) => {
            const r = e > 0 ? dk : ck,
                s = t ? ak(n).x : r(ak(n).x, zS(n), US(n), JS(n)),
                a = t ? r(ak(n).y, HS(n), WS(n), JS(n)) : ak(n).y;
            return Kk(o, Yk(s, a)), A.some(s)
        })(e, t, o, n).map(E),
        Zk = Jk(-1, !1),
        Qk = Jk(1, !1),
        eC = Jk(-1, !0),
        tC = Jk(1, !0),
        oC = {
            "top-left": A.some(((e, t) => {
                lk(e, ik(LS(t), PS(t)))
            })),
            top: A.some(((e, t) => {
                lk(e, ik(KS(t), PS(t)))
            })),
            "top-right": A.some(((e, t) => {
                lk(e, ik(jS(t), PS(t)))
            })),
            right: A.some(((e, t) => {
                lk(e, ik(jS(t), YS(t)))
            })),
            "bottom-right": A.some(((e, t) => {
                lk(e, ik(jS(t), GS(t)))
            })),
            bottom: A.some(((e, t) => {
                lk(e, ik(KS(t), GS(t)))
            })),
            "bottom-left": A.some(((e, t) => {
                lk(e, ik(LS(t), GS(t)))
            })),
            left: A.some(((e, t) => {
                lk(e, ik(LS(t), YS(t)))
            }))
        };
    var nC = Object.freeze({
        __proto__: null,
        setValueFrom: (e, t, o) => {
            const n = Mk(e, t, o.left),
                r = Lk(e, t, o.top),
                s = Yk(n, r);
            return Kk(e, s), s
        },
        setToMin: (e, t) => {
            const o = zS(t),
                n = HS(t);
            Kk(e, Yk(o, n))
        },
        setToMax: (e, t) => {
            const o = US(t),
                n = WS(t);
            Kk(e, Yk(o, n))
        },
        getValueFromEvent: e => VS(e),
        setPositionFromValue: (e, t, o, n) => {
            const r = ak(o),
                s = Bk(e, n.getSpectrum(e), r.x, n.getLeftEdge(e), n.getRightEdge(e), o),
                a = Uk(e, n.getSpectrum(e), r.y, n.getTopEdge(e), n.getBottomEdge(e), o),
                i = Jt(t.element) / 2,
                l = Wt(t.element) / 2;
            Dt(t.element, "left", s - i + "px"), Dt(t.element, "top", a - l + "px")
        },
        onLeft: Zk,
        onRight: Qk,
        onUp: eC,
        onDown: tC,
        edgeActions: oC
    });
    const rC = hm({
            name: "Slider",
            configFields: [yr("stepSize", 1), yr("onChange", b), yr("onChoose", b), yr("onInit", b), yr("onDragStart", b), yr("onDragEnd", b), yr("snapToGrid", !1), yr("rounded", !0), ur("snapStart"), nr("model", Jn("mode", {
                x: [yr("minX", 0), yr("maxX", 100), er("value", (e => Er(e.mode.minX))), or("getInitialValue"), Ri("manager", zk)],
                y: [yr("minY", 0), yr("maxY", 100), er("value", (e => Er(e.mode.minY))), or("getInitialValue"), Ri("manager", Xk)],
                xy: [yr("minX", 0), yr("maxX", 100), yr("minY", 0), yr("maxY", 100), er("value", (e => Er({
                    x: e.mode.minX,
                    y: e.mode.minY
                }))), or("getInitialValue"), Ri("manager", nC)]
            })), gu("sliderBehaviours", [Hp, mu]), er("mouseIsDown", (() => Er(!1)))],
            partFields: RS,
            factory: (e, t, o, n) => {
                const r = t => tm(t, e, "thumb"),
                    s = t => tm(t, e, "spectrum"),
                    a = t => em(t, e, "left-edge"),
                    i = t => em(t, e, "right-edge"),
                    l = t => em(t, e, "top-edge"),
                    c = t => em(t, e, "bottom-edge"),
                    d = e.model,
                    u = d.manager,
                    m = (t, o) => {
                        u.setPositionFromValue(t, o, e, {
                            getLeftEdge: a,
                            getRightEdge: i,
                            getTopEdge: l,
                            getBottomEdge: c,
                            getSpectrum: s
                        })
                    },
                    g = (e, t) => {
                        d.value.set(t);
                        const o = r(e);
                        m(e, o)
                    },
                    p = t => {
                        const o = e.mouseIsDown.get();
                        e.mouseIsDown.set(!1), o && em(t, e, "thumb").each((o => {
                            const n = d.value.get();
                            e.onChoose(t, o, n)
                        }))
                    },
                    h = (t, o) => {
                        o.stop(), e.mouseIsDown.set(!0), e.onDragStart(t, r(t))
                    },
                    f = (t, o) => {
                        o.stop(), e.onDragEnd(t, r(t)), p(t)
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: hu(e.sliderBehaviours, [Hp.config({
                        mode: "special",
                        focusIn: t => em(t, e, "spectrum").map(Hp.focusIn).map(E)
                    }), mu.config({
                        store: {
                            mode: "manual",
                            getValue: e => d.value.get(),
                            setValue: g
                        }
                    }), Al.config({
                        channels: {
                            [Kd()]: {
                                onReceive: p
                            }
                        }
                    })]),
                    events: Hs([Us(NS(), ((t, o) => {
                        ((t, o) => {
                            g(t, o);
                            const n = r(t);
                            e.onChange(t, n, o), A.some(!0)
                        })(t, o.event.value)
                    })), Ys(((t, o) => {
                        const n = d.getInitialValue();
                        d.value.set(n);
                        const a = r(t);
                        m(t, a);
                        const i = s(t);
                        e.onInit(t, a, i, d.value.get())
                    })), Us(Hr(), h), Us(Pr(), f), Us(Wr(), h), Us($r(), f)]),
                    apis: {
                        resetToMin: t => {
                            u.setToMin(t, e)
                        },
                        resetToMax: t => {
                            u.setToMax(t, e)
                        },
                        setValue: g,
                        refresh: m
                    },
                    domModification: {
                        styles: {
                            position: "relative"
                        }
                    }
                }
            },
            apis: {
                setValue: (e, t, o) => {
                    e.setValue(t, o)
                },
                resetToMin: (e, t) => {
                    e.resetToMin(t)
                },
                resetToMax: (e, t) => {
                    e.resetToMax(t)
                },
                refresh: (e, t) => {
                    e.refresh(t)
                }
            }
        }),
        sC = la("rgb-hex-update"),
        aC = la("slider-update"),
        iC = la("palette-update"),
        lC = "form",
        cC = [gu("formBehaviours", [mu])],
        dC = e => "<alloy.field." + e + ">",
        uC = (e, t) => ({
            uid: e.uid,
            dom: e.dom,
            components: t,
            behaviours: hu(e.formBehaviours, [mu.config({
                store: {
                    mode: "manual",
                    getValue: t => {
                        const o = nm(t, e);
                        return ce(o, ((e, t) => e().bind((e => {
                            return o = ym.getCurrent(e), n = new Error(`Cannot find a current component to extract the value from for form part '${t}': ` + na(e.element)), o.fold((() => rn.error(n)), rn.value);
                            var o, n
                        })).map(mu.getValue)))
                    },
                    setValue: (t, o) => {
                        le(o, ((o, n) => {
                            em(t, e, n).each((e => {
                                ym.getCurrent(e).each((e => {
                                    mu.setValue(e, o)
                                }))
                            }))
                        }))
                    }
                }
            })]),
            apis: {
                getField: (t, o) => em(t, e, o).bind(ym.getCurrent)
            }
        }),
        mC = {
            getField: Ca(((e, t, o) => e.getField(t, o))),
            sketch: e => {
                const t = (() => {
                        const e = [];
                        return {
                            field: (t, o) => (e.push(t), Ku(lC, dC(t), o)),
                            record: x(e)
                        }
                    })(),
                    o = e(t),
                    n = t.record(),
                    r = H(n, (e => Lu({
                        name: e,
                        pname: dC(e)
                    })));
                return dm(lC, cC, r, uC, o)
            }
        },
        gC = la("valid-input"),
        pC = la("invalid-input"),
        hC = la("validating-input"),
        fC = "colorcustom.rgb.",
        bC = (e, t, o, n) => {
            const r = (o, n) => wS.config({
                    invalidClass: t("invalid"),
                    notify: {
                        onValidate: e => {
                            Is(e, hC, {
                                type: o
                            })
                        },
                        onValid: e => {
                            Is(e, gC, {
                                type: o,
                                value: mu.getValue(e)
                            })
                        },
                        onInvalid: e => {
                            Is(e, pC, {
                                type: o,
                                value: mu.getValue(e)
                            })
                        }
                    },
                    validator: {
                        validate: t => {
                            const o = mu.getValue(t),
                                r = n(o) ? rn.value(!0) : rn.error(e("aria.input.invalid"));
                            return aw(r)
                        },
                        validateOnLoad: !1
                    }
                }),
                s = (o, n, s, a, i) => {
                    const l = e("colorcustom.rgb.range"),
                        c = Xw.parts.label({
                            dom: {
                                tag: "label",
                                attributes: {
                                    "aria-label": a
                                }
                            },
                            components: [ti(s)]
                        }),
                        d = Xw.parts.field({
                            data: i,
                            factory: Fb,
                            inputAttributes: {
                                type: "text",
                                ..."hex" === n ? {
                                    "aria-live": "polite"
                                } : {}
                            },
                            inputClasses: [t("textfield")],
                            inputBehaviours: kl([r(n, o), Jw.config({})]),
                            onSetValue: e => {
                                wS.isInvalid(e) && wS.run(e).get(b)
                            }
                        }),
                        u = [c, d],
                        m = "hex" !== n ? [Xw.parts["aria-descriptor"]({
                            text: l
                        })] : [];
                    return {
                        dom: {
                            tag: "div",
                            attributes: {
                                role: "presentation"
                            }
                        },
                        components: u.concat(m)
                    }
                },
                a = (e, t) => {
                    const o = t.red,
                        n = t.green,
                        r = t.blue;
                    mu.setValue(e, {
                        red: o,
                        green: n,
                        blue: r
                    })
                },
                i = Uh({
                    dom: {
                        tag: "div",
                        classes: [t("rgba-preview")],
                        styles: {
                            "background-color": "white"
                        },
                        attributes: {
                            role: "presentation"
                        }
                    }
                }),
                l = (e, t) => {
                    i.getOpt(e).each((e => {
                        Dt(e.element, "background-color", "#" + t.value)
                    }))
                },
                c = pm({
                    factory: () => {
                        const r = {
                                red: Er(A.some(255)),
                                green: Er(A.some(255)),
                                blue: Er(A.some(255)),
                                hex: Er(A.some("ffffff"))
                            },
                            c = e => r[e].get(),
                            d = (e, t) => {
                                r[e].set(t)
                            },
                            u = e => {
                                const t = e.red,
                                    o = e.green,
                                    n = e.blue;
                                d("red", A.some(t)), d("green", A.some(o)), d("blue", A.some(n))
                            },
                            m = (e, t) => {
                                const o = t.event;
                                "hex" !== o.type ? d(o.type, A.none()) : n(e)
                            },
                            g = (e, t) => {
                                const n = t.event;
                                (e => "hex" === e.type)(n) ? ((e, t) => {
                                    o(e);
                                    const n = Uy(t);
                                    d("hex", A.some(n.value));
                                    const r = nx(n);
                                    a(e, r), u(r), Is(e, sC, {
                                        hex: n
                                    }), l(e, n)
                                })(e, n.value) : ((e, t, o) => {
                                    const n = parseInt(o, 10);
                                    d(t, A.some(n)), c("red").bind((e => c("green").bind((t => c("blue").map((o => ex(e, t, o, 1))))))).each((t => {
                                        const o = ((e, t) => {
                                            const o = Xy(t);
                                            return mC.getField(e, "hex").each((t => {
                                                eh.isFocused(t) || mu.setValue(e, {
                                                    hex: o.value
                                                })
                                            })), o
                                        })(e, t);
                                        Is(e, sC, {
                                            hex: o
                                        }), l(e, o)
                                    }))
                                })(e, n.type, n.value)
                            },
                            p = t => ({
                                label: e(fC + t + ".label"),
                                description: e(fC + t + ".description")
                            }),
                            h = p("red"),
                            f = p("green"),
                            b = p("blue"),
                            v = p("hex");
                        return fn(mC.sketch((o => ({
                            dom: {
                                tag: "form",
                                classes: [t("rgb-form")],
                                attributes: {
                                    "aria-label": e("aria.color.picker")
                                }
                            },
                            components: [o.field("red", Xw.sketch(s(tx, "red", h.label, h.description, 255))), o.field("green", Xw.sketch(s(tx, "green", f.label, f.description, 255))), o.field("blue", Xw.sketch(s(tx, "blue", b.label, b.description, 255))), o.field("hex", Xw.sketch(s(Gy, "hex", v.label, v.description, "ffffff"))), i.asSpec()],
                            formBehaviours: kl([wS.config({
                                invalidClass: t("form-invalid")
                            }), Kp("rgb-form-events", [Us(gC, g), Us(pC, m), Us(hC, m)])])
                        }))), {
                            apis: {
                                updateHex: (e, t) => {
                                    mu.setValue(e, {
                                        hex: t.value
                                    }), ((e, t) => {
                                        const o = nx(t);
                                        a(e, o), u(o)
                                    })(e, t), l(e, t)
                                }
                            }
                        })
                    },
                    name: "RgbForm",
                    configFields: [],
                    apis: {
                        updateHex: (e, t, o) => {
                            e.updateHex(t, o)
                        }
                    },
                    extraApis: {}
                });
            return c
        },
        vC = (e, t) => {
            const o = pm({
                name: "ColourPicker",
                configFields: [or("dom"), yr("onValidHex", b), yr("onInvalidHex", b)],
                factory: o => {
                    const n = bC(e, t, o.onValidHex, o.onInvalidHex),
                        r = ((e, t) => {
                            const o = rC.parts.spectrum({
                                    dom: {
                                        tag: "canvas",
                                        attributes: {
                                            role: "presentation"
                                        },
                                        classes: [t("sv-palette-spectrum")]
                                    }
                                }),
                                n = rC.parts.thumb({
                                    dom: {
                                        tag: "div",
                                        attributes: {
                                            role: "presentation"
                                        },
                                        classes: [t("sv-palette-thumb")],
                                        innerHtml: `<div class=${t("sv-palette-inner-thumb")} role="presentation"></div>`
                                    }
                                }),
                                r = (e, t) => {
                                    const {
                                        width: o,
                                        height: n
                                    } = e, r = e.getContext("2d");
                                    if (null === r) return;
                                    r.fillStyle = t, r.fillRect(0, 0, o, n);
                                    const s = r.createLinearGradient(0, 0, o, 0);
                                    s.addColorStop(0, "rgba(255,255,255,1)"), s.addColorStop(1, "rgba(255,255,255,0)"), r.fillStyle = s, r.fillRect(0, 0, o, n);
                                    const a = r.createLinearGradient(0, 0, 0, n);
                                    a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(1, "rgba(0,0,0,1)"), r.fillStyle = a, r.fillRect(0, 0, o, n)
                                };
                            return pm({
                                factory: e => {
                                    const s = x({
                                            x: 0,
                                            y: 0
                                        }),
                                        a = kl([ym.config({
                                            find: A.some
                                        }), eh.config({})]);
                                    return rC.sketch({
                                        dom: {
                                            tag: "div",
                                            attributes: {
                                                role: "presentation"
                                            },
                                            classes: [t("sv-palette")]
                                        },
                                        model: {
                                            mode: "xy",
                                            getInitialValue: s
                                        },
                                        rounded: !1,
                                        components: [o, n],
                                        onChange: (e, t, o) => {
                                            Is(e, iC, {
                                                value: o
                                            })
                                        },
                                        onInit: (e, t, o, n) => {
                                            r(o.element.dom, ax(ix))
                                        },
                                        sliderBehaviours: a
                                    })
                                },
                                name: "SaturationBrightnessPalette",
                                configFields: [],
                                apis: {
                                    setHue: (e, t, o) => {
                                        ((e, t) => {
                                            const o = e.components()[0].element.dom,
                                                n = hx(t, 100, 100),
                                                s = ox(n);
                                            r(o, ax(s))
                                        })(t, o)
                                    },
                                    setThumb: (e, t, o) => {
                                        ((e, t) => {
                                            const o = fx(nx(t));
                                            rC.setValue(e, {
                                                x: o.saturation,
                                                y: 100 - o.value
                                            })
                                        })(t, o)
                                    }
                                },
                                extraApis: {}
                            })
                        })(0, t),
                        s = {
                            paletteRgba: Er(ix),
                            paletteHue: Er(0)
                        },
                        a = Uh(((e, t) => {
                            const o = rC.parts.spectrum({
                                    dom: {
                                        tag: "div",
                                        classes: [t("hue-slider-spectrum")],
                                        attributes: {
                                            role: "presentation"
                                        }
                                    }
                                }),
                                n = rC.parts.thumb({
                                    dom: {
                                        tag: "div",
                                        classes: [t("hue-slider-thumb")],
                                        attributes: {
                                            role: "presentation"
                                        }
                                    }
                                });
                            return rC.sketch({
                                dom: {
                                    tag: "div",
                                    classes: [t("hue-slider")],
                                    attributes: {
                                        role: "presentation"
                                    }
                                },
                                rounded: !1,
                                model: {
                                    mode: "y",
                                    getInitialValue: x(0)
                                },
                                components: [o, n],
                                sliderBehaviours: kl([eh.config({})]),
                                onChange: (e, t, o) => {
                                    Is(e, aC, {
                                        value: o
                                    })
                                }
                            })
                        })(0, t)),
                        i = Uh(r.sketch({})),
                        l = Uh(n.sketch({})),
                        c = (e, t, o) => {
                            i.getOpt(e).each((e => {
                                r.setHue(e, o)
                            }))
                        },
                        d = (e, t) => {
                            l.getOpt(e).each((e => {
                                n.updateHex(e, t)
                            }))
                        },
                        u = (e, t, o) => {
                            a.getOpt(e).each((e => {
                                rC.setValue(e, (e => 100 - e / 360 * 100)(o))
                            }))
                        },
                        m = (e, t) => {
                            i.getOpt(e).each((e => {
                                r.setThumb(e, t)
                            }))
                        },
                        g = (e, t, o, n) => {
                            ((e, t) => {
                                const o = nx(e);
                                s.paletteRgba.set(o), s.paletteHue.set(t)
                            })(t, o), L(n, (n => {
                                n(e, t, o)
                            }))
                        };
                    return {
                        uid: o.uid,
                        dom: o.dom,
                        components: [i.asSpec(), a.asSpec(), l.asSpec()],
                        behaviours: kl([Kp("colour-picker-events", [Us(sC, (() => {
                            const e = [c, u, m];
                            return (t, o) => {
                                const n = o.event.hex,
                                    r = (e => fx(nx(e)))(n);
                                g(t, n, r.hue, e)
                            }
                        })()), Us(iC, (() => {
                            const e = [d];
                            return (t, o) => {
                                const n = o.event.value,
                                    r = s.paletteHue.get(),
                                    a = hx(r, n.x, 100 - n.y),
                                    i = bx(a);
                                g(t, i, r, e)
                            }
                        })()), Us(aC, (() => {
                            const e = [c, d];
                            return (t, o) => {
                                const n = (e => (100 - e) / 100 * 360)(o.event.value),
                                    r = s.paletteRgba.get(),
                                    a = fx(r),
                                    i = hx(n, a.saturation, a.value),
                                    l = bx(i);
                                g(t, l, n, e)
                            }
                        })())]), ym.config({
                            find: e => l.getOpt(e)
                        }), Hp.config({
                            mode: "acyclic"
                        })])
                    }
                }
            });
            return o
        },
        yC = () => ym.config({
            find: A.some
        }),
        xC = e => ym.config({
            find: t => lt(t.element, e).bind((e => t.getSystem().getByDom(e).toOptional()))
        }),
        wC = Dn([yr("preprocess", w), yr("postprocess", w)]),
        SC = (e, t, o) => mu.config({
            store: {
                mode: "manual",
                ...e.map((e => ({
                    initialValue: e
                }))).getOr({}),
                getValue: t,
                setValue: o
            }
        }),
        kC = (e, t, o) => SC(e, (e => t(e.element)), ((e, t) => o(e.element, t))),
        CC = (e, t) => {
            const o = Kn("RepresentingConfigs.memento processors", wC, t);
            return mu.config({
                store: {
                    mode: "manual",
                    getValue: t => {
                        const n = e.get(t),
                            r = mu.getValue(n);
                        return o.postprocess(r)
                    },
                    setValue: (t, n) => {
                        const r = o.preprocess(n),
                            s = e.get(t);
                        mu.setValue(s, r)
                    }
                }
            })
        },
        OC = kC,
        _C = SC,
        TC = e => mu.config({
            store: {
                mode: "memory",
                initialValue: e
            }
        }),
        EC = {
            "colorcustom.rgb.red.label": "R",
            "colorcustom.rgb.red.description": "Red component",
            "colorcustom.rgb.green.label": "G",
            "colorcustom.rgb.green.description": "Green component",
            "colorcustom.rgb.blue.label": "B",
            "colorcustom.rgb.blue.description": "Blue component",
            "colorcustom.rgb.hex.label": "#",
            "colorcustom.rgb.hex.description": "Hex color code",
            "colorcustom.rgb.range": "Range 0 to 255",
            "aria.color.picker": "Color Picker",
            "aria.input.invalid": "Invalid input"
        };
    var AC = tinymce.util.Tools.resolve("tinymce.Resource"),
        MC = tinymce.util.Tools.resolve("tinymce.util.Tools");
    const DC = la("alloy-fake-before-tabstop"),
        BC = la("alloy-fake-after-tabstop"),
        FC = e => ({
            dom: {
                tag: "div",
                styles: {
                    width: "1px",
                    height: "1px",
                    outline: "none"
                },
                attributes: {
                    tabindex: "0"
                },
                classes: e
            },
            behaviours: kl([eh.config({
                ignore: !0
            }), Jw.config({})])
        }),
        IC = e => ({
            dom: {
                tag: "div",
                classes: ["tox-navobj"]
            },
            components: [FC([DC]), e, FC([BC])],
            behaviours: kl([xC(1)])
        }),
        RC = (e, t) => {
            Is(e, Yr(), {
                raw: {
                    which: 9,
                    shiftKey: t
                }
            })
        },
        NC = (e, t) => {
            const o = t.element;
            Ua(o, DC) ? RC(e, !0) : Ua(o, BC) && RC(e, !1)
        },
        VC = e => Iw(e, ["." + DC, "." + BC].join(","), T),
        zC = la("toolbar.button.execute"),
        HC = la("common-button-display-events"),
        LC = {
            [us()]: ["disabling", "alloy.base.behaviour", "toggling", "toolbar-button-events"],
            [Ss()]: ["toolbar-button-events", HC],
            [Wr()]: ["focusing", "alloy.base.behaviour", HC]
        },
        PC = e => Dt(e.element, "width", It(e.element, "width")),
        UC = (e, t, o) => Zh(e, {
            tag: "span",
            classes: ["tox-icon", "tox-tbtn__icon-wrap"],
            behaviours: o
        }, t),
        WC = (e, t) => UC(e, t, []),
        jC = (e, t) => UC(e, t, [Xp.config({})]),
        GC = (e, t, o) => ({
            dom: {
                tag: "span",
                classes: [`${t}__select-label`]
            },
            components: [ti(o.translate(e))],
            behaviours: kl([Xp.config({})])
        }),
        $C = la("update-menu-text"),
        qC = la("update-menu-icon"),
        XC = (e, t, o) => {
            const n = Er(b),
                r = e.text.map((e => Uh(GC(e, t, o.providers)))),
                s = e.icon.map((e => Uh(jC(e, o.providers.icons)))),
                a = (e, t) => {
                    const o = mu.getValue(e);
                    return eh.focus(o), Is(o, "keydown", {
                        raw: t.event.raw
                    }), xw.close(o), A.some(!0)
                },
                i = e.role.fold((() => ({})), (e => ({
                    role: e
                }))),
                l = e.tooltip.fold((() => ({})), (e => {
                    const t = o.providers.translate(e);
                    return {
                        title: t,
                        "aria-label": t
                    }
                })),
                c = Zh("chevron-down", {
                    tag: "div",
                    classes: [`${t}__select-chevron`]
                }, o.providers.icons),
                d = la("common-button-display-events"),
                u = Uh(xw.sketch({
                    ...e.uid ? {
                        uid: e.uid
                    } : {},
                    ...i,
                    dom: {
                        tag: "button",
                        classes: [t, `${t}--select`].concat(H(e.classes, (e => `${t}--${e}`))),
                        attributes: {
                            ...l
                        }
                    },
                    components: _y([s.map((e => e.asSpec())), r.map((e => e.asSpec())), A.some(c)]),
                    matchWidth: !0,
                    useMinWidth: !0,
                    onOpen: (t, o, n) => {
                        e.searchable && (e => {
                            Vb(e).each((e => eh.focus(e)))
                        })(n)
                    },
                    dropdownBehaviours: kl([...e.dropdownBehaviours, vy((() => e.disabled || o.providers.isDisabled())), by(), SS.config({}), Xp.config({}), Kp("dropdown-events", [Sy(e, n), ky(e, n)]), Kp(d, [Ys(((e, t) => PC(e)))]), Kp("menubutton-update-display-text", [Us($C, ((e, t) => {
                        r.bind((t => t.getOpt(e))).each((e => {
                            Xp.set(e, [ti(o.providers.translate(t.event.text))])
                        }))
                    })), Us(qC, ((e, t) => {
                        s.bind((t => t.getOpt(e))).each((e => {
                            Xp.set(e, [jC(t.event.icon, o.providers.icons)])
                        }))
                    }))])]),
                    eventOrder: fn(LC, {
                        mousedown: ["focusing", "alloy.base.behaviour", "item-type-events", "normal-dropdown-events"],
                        [Ss()]: ["toolbar-button-events", "dropdown-events", d]
                    }),
                    sandboxBehaviours: kl([Hp.config({
                        mode: "special",
                        onLeft: a,
                        onRight: a
                    }), Kp("dropdown-sandbox-events", [Us(Ib, ((e, t) => {
                        (e => {
                            const t = mu.getValue(e),
                                o = Nb(e).map(zb);
                            xw.refetch(t).get((() => {
                                const e = ew.getCoupled(t, "sandbox");
                                o.each((t => Nb(e).each((e => ((e, t) => {
                                    mu.setValue(e, t.fetchPattern), e.element.dom.selectionStart = t.selectionStart, e.element.dom.selectionEnd = t.selectionEnd
                                })(e, t)))))
                            }))
                        })(e), t.stop()
                    })), Us(Rb, ((e, t) => {
                        ((e, t) => {
                            (e => $d.getState(e).bind(Wm.getHighlighted).bind(Wm.getHighlighted))(e).each((o => {
                                ((e, t, o, n) => {
                                    const r = {
                                        ...n,
                                        target: t
                                    };
                                    e.getSystem().triggerEvent(o, t, r)
                                })(e, o.element, t.event.eventType, t.event.interactionEvent)
                            }))
                        })(e, t), t.stop()
                    }))])]),
                    lazySink: o.getSink,
                    toggleClass: `${t}--active`,
                    parts: {
                        menu: {
                            ...Eb(0, e.columns, e.presets),
                            fakeFocus: e.searchable,
                            onHighlightItem: ww,
                            onCollapseMenu: (e, t, o) => {
                                Wm.getHighlighted(o).each((t => {
                                    ww(e, o, t)
                                }))
                            },
                            onDehighlightItem: Sw
                        }
                    },
                    fetch: t => sw(k(e.fetch, t))
                }));
            return u.asSpec()
        },
        KC = e => "separator" === e.type,
        YC = {
            type: "separator"
        },
        JC = (e, t) => {
            const o = ((e, t) => {
                const o = j(e, ((e, o) => (e => s(e))(o) ? "" === o ? e : "|" === o ? e.length > 0 && !KC(e[e.length - 1]) ? e.concat([YC]) : e : ve(t, o.toLowerCase()) ? e.concat([t[o.toLowerCase()]]) : e : e.concat([o])), []);
                return o.length > 0 && KC(o[o.length - 1]) && o.pop(), o
            })(s(e) ? e.split(" ") : e, t);
            return W(o, ((e, o) => {
                if ((e => ve(e, "getSubmenuItems"))(o)) {
                    const n = (e => {
                            const t = be(e, "value").getOrThunk((() => la("generated-menu-item")));
                            return fn({
                                value: t
                            }, e)
                        })(o),
                        r = ((e, t) => {
                            const o = e.getSubmenuItems(),
                                n = JC(o, t);
                            return {
                                item: e,
                                menus: fn(n.menus, {
                                    [e.value]: n.items
                                }),
                                expansions: fn(n.expansions, {
                                    [e.value]: e.value
                                })
                            }
                        })(n, t);
                    return {
                        menus: fn(e.menus, r.menus),
                        items: [r.item, ...e.items],
                        expansions: fn(e.expansions, r.expansions)
                    }
                }
                return {
                    ...e,
                    items: [o, ...e.items]
                }
            }), {
                menus: {},
                expansions: {},
                items: []
            })
        },
        ZC = (e, t, o, n) => {
            const r = la("primary-menu"),
                s = JC(e, o.shared.providers.menuItems());
            if (0 === s.items.length) return A.none();
            const a = (e => e.search.fold((() => ({
                    searchMode: "no-search"
                })), (e => ({
                    searchMode: "search-with-field",
                    placeholder: e.placeholder
                }))))(n),
                i = Tw(r, s.items, t, o, n.isHorizontalMenu, a),
                l = (e => e.search.fold((() => ({
                    searchMode: "no-search"
                })), (e => ({
                    searchMode: "search-with-results"
                }))))(n),
                c = ce(s.menus, ((e, n) => Tw(n, e, t, o, !1, l))),
                d = fn(c, Mr(r, i));
            return A.from(zh.tieredData(r, d, s.expansions))
        },
        QC = e => !ve(e, "items"),
        eO = "data-value",
        tO = (e, t, o, n) => H(o, (o => QC(o) ? {
            type: "togglemenuitem",
            text: o.text,
            value: o.value,
            active: o.value === n,
            onAction: () => {
                mu.setValue(e, o.value), Is(e, nS, {
                    name: t
                }), eh.focus(e)
            }
        } : {
            type: "nestedmenuitem",
            text: o.text,
            getSubmenuItems: () => tO(e, t, o.items, n)
        })),
        oO = (e, t) => se(e, (e => QC(e) ? Ce(e.value === t, e) : oO(e.items, t))),
        nO = pm({
            name: "HtmlSelect",
            configFields: [or("options"), gu("selectBehaviours", [eh, mu]), yr("selectClasses", []), yr("selectAttributes", {}), ur("data")],
            factory: (e, t) => {
                const o = H(e.options, (e => ({
                        dom: {
                            tag: "option",
                            value: e.value,
                            innerHtml: e.text
                        }
                    }))),
                    n = e.data.map((e => Mr("initialValue", e))).getOr({});
                return {
                    uid: e.uid,
                    dom: {
                        tag: "select",
                        classes: e.selectClasses,
                        attributes: e.selectAttributes
                    },
                    components: o,
                    behaviours: hu(e.selectBehaviours, [eh.config({}), mu.config({
                        store: {
                            mode: "manual",
                            getValue: e => $a(e.element),
                            setValue: (t, o) => {
                                G(e.options, (e => e.value === o)).isSome() && qa(t.element, o)
                            },
                            ...n
                        }
                    })])
                }
            }
        }),
        rO = x([yr("field1Name", "field1"), yr("field2Name", "field2"), Fi("onLockedChange"), Ai(["lockClass"]), yr("locked", !1), fu("coupledFieldBehaviours", [ym, mu])]),
        sO = (e, t) => Lu({
            factory: Xw,
            name: e,
            overrides: e => ({
                fieldBehaviours: kl([Kp("coupled-input-behaviour", [Us(Zr(), (o => {
                    ((e, t, o) => em(e, t, o).bind(ym.getCurrent))(o, e, t).each((t => {
                        em(o, e, "lock").each((n => {
                            lh.isOn(n) && e.onLockedChange(o, t, n)
                        }))
                    }))
                }))])])
            })
        }),
        aO = x([sO("field1", "field2"), sO("field2", "field1"), Lu({
            factory: Ph,
            schema: [or("dom")],
            name: "lock",
            overrides: e => ({
                buttonBehaviours: kl([lh.config({
                    selected: e.locked,
                    toggleClass: e.markers.lockClass,
                    aria: {
                        mode: "pressed"
                    }
                })])
            })
        })]),
        iO = hm({
            name: "FormCoupledInputs",
            configFields: rO(),
            partFields: aO(),
            factory: (e, t, o, n) => ({
                uid: e.uid,
                dom: e.dom,
                components: t,
                behaviours: bu(e.coupledFieldBehaviours, [ym.config({
                    find: A.some
                }), mu.config({
                    store: {
                        mode: "manual",
                        getValue: t => {
                            const o = sm(t, e, ["field1", "field2"]);
                            return {
                                [e.field1Name]: mu.getValue(o.field1()),
                                [e.field2Name]: mu.getValue(o.field2())
                            }
                        },
                        setValue: (t, o) => {
                            const n = sm(t, e, ["field1", "field2"]);
                            ye(o, e.field1Name) && mu.setValue(n.field1(), o[e.field1Name]), ye(o, e.field2Name) && mu.setValue(n.field2(), o[e.field2Name])
                        }
                    }
                })]),
                apis: {
                    getField1: t => em(t, e, "field1"),
                    getField2: t => em(t, e, "field2"),
                    getLock: t => em(t, e, "lock")
                }
            }),
            apis: {
                getField1: (e, t) => e.getField1(t),
                getField2: (e, t) => e.getField2(t),
                getLock: (e, t) => e.getLock(t)
            }
        }),
        lO = e => {
            const t = /^\s*(\d+(?:\.\d+)?)\s*(|cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)\s*$/.exec(e);
            if (null !== t) {
                const e = parseFloat(t[1]),
                    o = t[2];
                return rn.value({
                    value: e,
                    unit: o
                })
            }
            return rn.error(e)
        },
        cO = (e, t) => {
            const o = {
                    "": 96,
                    px: 96,
                    pt: 72,
                    cm: 2.54,
                    pc: 12,
                    mm: 25.4,
                    in: 1
                },
                n = e => ve(o, e);
            return e.unit === t ? A.some(e.value) : n(e.unit) && n(t) ? o[e.unit] === o[t] ? A.some(e.value) : A.some(e.value / o[e.unit] * o[t]) : A.none()
        },
        dO = e => A.none(),
        uO = (e, t) => {
            const o = e.label.map((e => oS(e, t))),
                n = [Fm.config({
                    disabled: () => e.disabled || t.isDisabled()
                }), by(), Hp.config({
                    mode: "execution",
                    useEnter: !0 !== e.multiline,
                    useControlEnter: !0 === e.multiline,
                    execute: e => (Fs(e, iS), A.some(!0))
                }), Kp("textfield-change", [Us(Zr(), ((t, o) => {
                    Is(t, nS, {
                        name: e.name
                    })
                })), Us(cs(), ((t, o) => {
                    Is(t, nS, {
                        name: e.name
                    })
                }))]), Jw.config({})],
                r = e.validation.map((e => wS.config({
                    getRoot: e => st(e.element),
                    invalidClass: "tox-invalid",
                    validator: {
                        validate: t => {
                            const o = mu.getValue(t),
                                n = e.validator(o);
                            return aw(!0 === n ? rn.value(o) : rn.error(n))
                        },
                        validateOnLoad: e.validateOnLoad
                    }
                }))).toArray(),
                s = {
                    ...e.placeholder.fold(x({}), (e => ({
                        placeholder: t.translate(e)
                    }))),
                    ...e.inputMode.fold(x({}), (e => ({
                        inputmode: e
                    })))
                },
                a = Xw.parts.field({
                    tag: !0 === e.multiline ? "textarea" : "input",
                    ...e.data.map((e => ({
                        data: e
                    }))).getOr({}),
                    inputAttributes: s,
                    inputClasses: [e.classname],
                    inputBehaviours: kl(q([n, r])),
                    selectOnFocus: !1,
                    factory: Fb
                }),
                i = e.multiline ? {
                    dom: {
                        tag: "div",
                        classes: ["tox-textarea-wrap"]
                    },
                    components: [a]
                } : a,
                l = (e.flex ? ["tox-form__group--stretched"] : []).concat(e.maximized ? ["tox-form-group--maximize"] : []),
                c = [Fm.config({
                    disabled: () => e.disabled || t.isDisabled(),
                    onDisabled: e => {
                        Xw.getField(e).each(Fm.disable)
                    },
                    onEnabled: e => {
                        Xw.getField(e).each(Fm.enable)
                    }
                }), by()];
            return Qw(o, i, l, c)
        },
        mO = (e, t) => t.getAnimationRoot.fold((() => e.element), (t => t(e))),
        gO = e => e.dimension.property,
        pO = (e, t) => e.dimension.getDimension(t),
        hO = (e, t) => {
            const o = mO(e, t);
            ja(o, [t.shrinkingClass, t.growingClass])
        },
        fO = (e, t) => {
            Pa(e.element, t.openClass), La(e.element, t.closedClass), Dt(e.element, gO(t), "0px"), Lt(e.element)
        },
        bO = (e, t) => {
            Pa(e.element, t.closedClass), La(e.element, t.openClass), Ht(e.element, gO(t))
        },
        vO = (e, t, o, n) => {
            o.setCollapsed(), Dt(e.element, gO(t), pO(t, e.element)), hO(e, t), fO(e, t), t.onStartShrink(e), t.onShrunk(e)
        },
        yO = (e, t, o, n) => {
            const r = n.getOrThunk((() => pO(t, e.element)));
            o.setCollapsed(), Dt(e.element, gO(t), r), Lt(e.element);
            const s = mO(e, t);
            Pa(s, t.growingClass), La(s, t.shrinkingClass), fO(e, t), t.onStartShrink(e)
        },
        xO = (e, t, o) => {
            const n = pO(t, e.element);
            ("0px" === n ? vO : yO)(e, t, o, A.some(n))
        },
        wO = (e, t, o) => {
            const n = mO(e, t),
                r = Ua(n, t.shrinkingClass),
                s = pO(t, e.element);
            bO(e, t);
            const a = pO(t, e.element);
            (r ? () => {
                Dt(e.element, gO(t), s), Lt(e.element)
            } : () => {
                fO(e, t)
            })(), Pa(n, t.shrinkingClass), La(n, t.growingClass), bO(e, t), Dt(e.element, gO(t), a), o.setExpanded(), t.onStartGrow(e)
        },
        SO = (e, t, o) => {
            const n = mO(e, t);
            return !0 === Ua(n, t.growingClass)
        },
        kO = (e, t, o) => {
            const n = mO(e, t);
            return !0 === Ua(n, t.shrinkingClass)
        };
    var CO = Object.freeze({
            __proto__: null,
            refresh: (e, t, o) => {
                if (o.isExpanded()) {
                    Ht(e.element, gO(t));
                    const o = pO(t, e.element);
                    Dt(e.element, gO(t), o)
                }
            },
            grow: (e, t, o) => {
                o.isExpanded() || wO(e, t, o)
            },
            shrink: (e, t, o) => {
                o.isExpanded() && xO(e, t, o)
            },
            immediateShrink: (e, t, o) => {
                o.isExpanded() && vO(e, t, o)
            },
            hasGrown: (e, t, o) => o.isExpanded(),
            hasShrunk: (e, t, o) => o.isCollapsed(),
            isGrowing: SO,
            isShrinking: kO,
            isTransitioning: (e, t, o) => SO(e, t) || kO(e, t),
            toggleGrow: (e, t, o) => {
                (o.isExpanded() ? xO : wO)(e, t, o)
            },
            disableTransitions: hO,
            immediateGrow: (e, t, o) => {
                o.isExpanded() || (bO(e, t), Dt(e.element, gO(t), pO(t, e.element)), hO(e, t), o.setExpanded(), t.onStartGrow(e), t.onGrown(e))
            }
        }),
        OO = Object.freeze({
            __proto__: null,
            exhibit: (e, t, o) => {
                const n = t.expanded;
                return Ea(n ? {
                    classes: [t.openClass],
                    styles: {}
                } : {
                    classes: [t.closedClass],
                    styles: Mr(t.dimension.property, "0px")
                })
            },
            events: (e, t) => Hs([Ks(os(), ((o, n) => {
                n.event.raw.propertyName === e.dimension.property && (hO(o, e), t.isExpanded() && Ht(o.element, e.dimension.property), (t.isExpanded() ? e.onGrown : e.onShrunk)(o))
            }))])
        }),
        _O = [or("closedClass"), or("openClass"), or("shrinkingClass"), or("growingClass"), ur("getAnimationRoot"), Di("onShrunk"), Di("onStartShrink"), Di("onGrown"), Di("onStartGrow"), yr("expanded", !1), nr("dimension", Jn("property", {
            width: [Ri("property", "width"), Ri("getDimension", (e => Jt(e) + "px"))],
            height: [Ri("property", "height"), Ri("getDimension", (e => Wt(e) + "px"))]
        }))];
    const TO = Ol({
            fields: _O,
            name: "sliding",
            active: OO,
            apis: CO,
            state: Object.freeze({
                __proto__: null,
                init: e => {
                    const t = Er(e.expanded);
                    return _a({
                        isExpanded: () => !0 === t.get(),
                        isCollapsed: () => !1 === t.get(),
                        setCollapsed: k(t.set, !1),
                        setExpanded: k(t.set, !0),
                        readState: () => "expanded: " + t.get()
                    })
                }
            })
        }),
        EO = e => ({
            isEnabled: () => !Fm.isDisabled(e),
            setEnabled: t => Fm.set(e, !t),
            setActive: t => {
                const o = e.element;
                t ? (La(o, "tox-tbtn--enabled"), kt(o, "aria-pressed", !0)) : (Pa(o, "tox-tbtn--enabled"), Et(o, "aria-pressed"))
            },
            isActive: () => Ua(e.element, "tox-tbtn--enabled"),
            setText: t => {
                Is(e, $C, {
                    text: t
                })
            },
            setIcon: t => Is(e, qC, {
                icon: t
            })
        }),
        AO = (e, t, o, n, r = !0) => XC({
            text: e.text,
            icon: e.icon,
            tooltip: e.tooltip,
            searchable: e.search.isSome(),
            role: n,
            fetch: (t, n) => {
                const r = {
                    pattern: e.search.isSome() ? kw(t) : ""
                };
                e.fetch((t => {
                    n(ZC(t, ub.CLOSE_ON_EXECUTE, o, {
                        isHorizontalMenu: !1,
                        search: e.search
                    }))
                }), r, EO(t))
            },
            onSetup: e.onSetup,
            getApi: EO,
            columns: 1,
            presets: "normal",
            classes: [],
            dropdownBehaviours: [...r ? [Jw.config({})] : []]
        }, t, o.shared),
        MO = (e, t, o) => {
            const n = e => n => {
                    const r = !n.isActive();
                    n.setActive(r), e.storage.set(r), o.shared.getSink().each((o => {
                        t().getOpt(o).each((t => {
                            Dl(t.element), Is(t, aS, {
                                name: e.name,
                                value: e.storage.get()
                            })
                        }))
                    }))
                },
                r = e => t => {
                    t.setActive(e.storage.get())
                };
            return t => {
                t(H(e, (e => {
                    const t = e.text.fold((() => ({})), (e => ({
                        text: e
                    })));
                    return {
                        type: e.type,
                        active: !1,
                        ...t,
                        onAction: n(e),
                        onSetup: r(e)
                    }
                })))
            }
        },
        DO = e => ({
            dom: {
                tag: "span",
                classes: ["tox-tree__label"],
                attributes: {
                    title: e,
                    "aria-label": e
                }
            },
            components: [ti(e)]
        }),
        BO = la("leaf-label-event-id"),
        FO = ({
            leaf: e,
            onLeafAction: t,
            visible: o,
            treeId: n,
            backstage: r
        }) => {
            const s = e.menu.map((e => AO(e, "tox-mbtn", r, A.none(), o))),
                a = [DO(e.title)];
            return s.each((e => a.push(e))), Ph.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-tree--leaf__label", "tox-trbtn"].concat(o ? ["tox-tree--leaf__label--visible"] : [])
                },
                components: a,
                role: "treeitem",
                action: o => {
                    t(e.id), o.getSystem().broadcastOn([`update-active-item-${n}`], {
                        value: e.id
                    })
                },
                eventOrder: {
                    [Yr()]: [BO, "keying"]
                },
                buttonBehaviours: kl([...o ? [Jw.config({})] : [], lh.config({
                    toggleClass: "tox-trbtn--enabled",
                    toggleOnExecute: !1,
                    aria: {
                        mode: "selected"
                    }
                }), Al.config({
                    channels: {
                        [`update-active-item-${n}`]: {
                            onReceive: (t, o) => {
                                (o.value === e.id ? lh.on : lh.off)(t)
                            }
                        }
                    }
                }), Kp(BO, [Us(Yr(), ((e, t) => {
                    const o = "ArrowLeft" === t.event.raw.code,
                        n = "ArrowRight" === t.event.raw.code;
                    o ? (mi(e.element, ".tox-tree--directory").each((t => {
                        e.getSystem().getByDom(t).each((e => {
                            gi(t, ".tox-tree--directory__label").each((t => {
                                e.getSystem().getByDom(t).each(eh.focus)
                            }))
                        }))
                    })), t.stop()) : n && t.stop()
                }))])])
            })
        },
        IO = la("directory-label-event-id"),
        RO = ({
            directory: e,
            visible: t,
            noChildren: o,
            backstage: n
        }) => {
            const r = e.menu.map((e => AO(e, "tox-mbtn", n, A.none()))),
                s = [{
                    dom: {
                        tag: "div",
                        classes: ["tox-chevron"]
                    },
                    components: [(a = "chevron-right", i = n.shared.providers.icons, ((e, t, o) => Zh(e, {
                        tag: "span",
                        classes: ["tox-tree__icon-wrap", "tox-icon"],
                        behaviours: []
                    }, t))(a, i))]
                }, DO(e.title)];
            var a, i;
            r.each((e => {
                s.push(e)
            }));
            const l = e => {
                mi(e.element, ".tox-tree--directory").each((t => {
                    e.getSystem().getByDom(t).each((e => lh.toggle(e)))
                }))
            };
            return Ph.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-tree--directory__label", "tox-trbtn"].concat(t ? ["tox-tree--directory__label--visible"] : [])
                },
                components: s,
                action: l,
                eventOrder: {
                    [Yr()]: [IO, "keying"]
                },
                buttonBehaviours: kl([...t ? [Jw.config({})] : [], Kp(IO, [Us(Yr(), ((e, t) => {
                    const n = "ArrowRight" === t.event.raw.code,
                        r = "ArrowLeft" === t.event.raw.code;
                    n && o && t.stop(), (n || r) && mi(e.element, ".tox-tree--directory").each((o => {
                        e.getSystem().getByDom(o).each((o => {
                            !lh.isOn(o) && n || lh.isOn(o) && r ? (l(e), t.stop()) : r && !lh.isOn(o) && (mi(o.element, ".tox-tree--directory").each((e => {
                                gi(e, ".tox-tree--directory__label").each((e => {
                                    o.getSystem().getByDom(e).each(eh.focus)
                                }))
                            })), t.stop())
                        }))
                    }))
                }))])])
            })
        },
        NO = ({
            children: e,
            onLeafAction: t,
            visible: o,
            treeId: n,
            backstage: r
        }) => ({
            dom: {
                tag: "div",
                classes: ["tox-tree--directory__children"]
            },
            components: e.map((e => "leaf" === e.type ? FO({
                leaf: e,
                onLeafAction: t,
                visible: o,
                treeId: n,
                backstage: r
            }) : VO({
                directory: e,
                onLeafAction: t,
                labelTabstopping: o,
                treeId: n,
                backstage: r
            }))),
            behaviours: kl([TO.config({
                dimension: {
                    property: "height"
                },
                closedClass: "tox-tree--directory__children--closed",
                openClass: "tox-tree--directory__children--open",
                growingClass: "tox-tree--directory__children--growing",
                shrinkingClass: "tox-tree--directory__children--shrinking"
            }), Xp.config({})])
        }),
        VO = ({
            directory: e,
            onLeafAction: t,
            labelTabstopping: o,
            treeId: n,
            backstage: r
        }) => {
            const {
                children: s
            } = e;
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-tree--directory"],
                    attributes: {
                        role: "treeitem"
                    }
                },
                components: [RO({
                    directory: e,
                    visible: o,
                    noChildren: 0 === e.children.length,
                    backstage: r
                }), NO({
                    children: s,
                    onLeafAction: t,
                    visible: !1,
                    treeId: n,
                    backstage: r
                })],
                behaviours: kl([lh.config({
                    ...e.children.length > 0 ? {
                        aria: {
                            mode: "expanded"
                        }
                    } : {},
                    toggleClass: "tox-tree--directory--expanded",
                    onToggled: (e, o) => {
                        const a = e.components()[1],
                            i = (l = o, s.map((e => "leaf" === e.type ? FO({
                                leaf: e,
                                onLeafAction: t,
                                visible: l,
                                treeId: n,
                                backstage: r
                            }) : VO({
                                directory: e,
                                onLeafAction: t,
                                labelTabstopping: l,
                                treeId: n,
                                backstage: r
                            }))));
                        var l;
                        o ? TO.grow(a) : TO.shrink(a), Xp.set(a, i)
                    }
                })])
            }
        };
    var zO = Object.freeze({
        __proto__: null,
        events: (e, t) => {
            const o = e.stream.streams.setup(e, t);
            return Hs([Us(e.event, o), Js((() => t.cancel()))].concat(e.cancelEvent.map((e => [Us(e, (() => t.cancel()))])).getOr([])))
        }
    });
    const HO = (e, t) => {
            let o = null;
            const n = () => {
                c(o) || (clearTimeout(o), o = null)
            };
            return {
                cancel: n,
                throttle: (...r) => {
                    n(), o = setTimeout((() => {
                        o = null, e.apply(null, r)
                    }), t)
                }
            }
        },
        LO = e => {
            const t = Er(null);
            return _a({
                readState: () => ({
                    timer: null !== t.get() ? "set" : "unset"
                }),
                setTimer: e => {
                    t.set(e)
                },
                cancel: () => {
                    const e = t.get();
                    null !== e && e.cancel()
                }
            })
        };
    var PO = Object.freeze({
            __proto__: null,
            throttle: LO,
            init: e => e.stream.streams.state(e)
        }),
        UO = [nr("stream", Jn("mode", {
            throttle: [or("delay"), yr("stopEvent", !0), Ri("streams", {
                setup: (e, t) => {
                    const o = e.stream,
                        n = HO(e.onStream, o.delay);
                    return t.setTimer(n), (e, t) => {
                        n.throttle(e, t), o.stopEvent && t.stop()
                    }
                },
                state: LO
            })]
        })), yr("event", "input"), ur("cancelEvent"), Fi("onStream")];
    const WO = Ol({
            fields: UO,
            name: "streaming",
            active: zO,
            state: PO
        }),
        jO = (e, t, o) => {
            const n = mu.getValue(o);
            mu.setValue(t, n), $O(t)
        },
        GO = (e, t) => {
            const o = e.element,
                n = $a(o),
                r = o.dom;
            "number" !== Ot(o, "type") && t(r, n)
        },
        $O = e => {
            GO(e, ((e, t) => e.setSelectionRange(t.length, t.length)))
        },
        qO = x("alloy.typeahead.itemexecute"),
        XO = x([ur("lazySink"), or("fetch"), yr("minChars", 5), yr("responseTime", 1e3), Di("onOpen"), yr("getHotspot", A.some), yr("getAnchorOverrides", x({})), yr("layouts", A.none()), yr("eventOrder", {}), Tr("model", {}, [yr("getDisplayText", (e => void 0 !== e.meta && void 0 !== e.meta.text ? e.meta.text : e.value)), yr("selectsOver", !0), yr("populateFromBrowse", !0)]), Di("onSetValue"), Bi("onExecute"), Di("onItemExecute"), yr("inputClasses", []), yr("inputAttributes", {}), yr("inputStyles", {}), yr("matchWidth", !0), yr("useMinWidth", !1), yr("dismissOnBlur", !0), Ai(["openClass"]), ur("initialData"), gu("typeaheadBehaviours", [eh, mu, WO, Hp, lh, ew]), er("lazyTypeaheadComp", (() => Er(A.none))), er("previewing", (() => Er(!0)))].concat(Ab()).concat(bw())),
        KO = x([Pu({
            schema: [Ei()],
            name: "menu",
            overrides: e => ({
                fakeFocus: !0,
                onHighlightItem: (t, o, n) => {
                    e.previewing.get() ? e.lazyTypeaheadComp.get().each((t => {
                        ((e, t, o) => {
                            if (e.selectsOver) {
                                const n = mu.getValue(t),
                                    r = e.getDisplayText(n),
                                    s = mu.getValue(o);
                                return 0 === e.getDisplayText(s).indexOf(r) ? A.some((() => {
                                    jO(0, t, o), ((e, t) => {
                                        GO(e, ((e, o) => e.setSelectionRange(t, o.length)))
                                    })(t, r.length)
                                })) : A.none()
                            }
                            return A.none()
                        })(e.model, t, n).fold((() => {
                            e.model.selectsOver ? (Wm.dehighlight(o, n), e.previewing.set(!0)) : e.previewing.set(!1)
                        }), (t => {
                            t(), e.previewing.set(!1)
                        }))
                    })) : e.lazyTypeaheadComp.get().each((t => {
                        e.model.populateFromBrowse && jO(e.model, t, n)
                    }))
                },
                onExecute: (t, o) => e.lazyTypeaheadComp.get().map((e => (Is(e, qO(), {
                    item: o
                }), !0))),
                onHover: (t, o) => {
                    e.previewing.set(!1), e.lazyTypeaheadComp.get().each((t => {
                        e.model.populateFromBrowse && jO(e.model, t, o)
                    }))
                }
            })
        })]),
        YO = hm({
            name: "Typeahead",
            configFields: XO(),
            partFields: KO(),
            factory: (e, t, o, n) => {
                const r = (t, o, r) => {
                        e.previewing.set(!1);
                        const s = ew.getCoupled(t, "sandbox");
                        if ($d.isOpen(s)) ym.getCurrent(s).each((e => {
                            Wm.getHighlighted(e).fold((() => {
                                r(e)
                            }), (() => {
                                zs(s, e.element, "keydown", o)
                            }))
                        }));
                        else {
                            const o = e => {
                                ym.getCurrent(e).each(r)
                            };
                            dw(e, a(t), t, s, n, o, Nh.HighlightMenuAndItem).get(b)
                        }
                    },
                    s = Mb(e),
                    a = e => t => t.map((t => {
                        const o = fe(t.menus),
                            n = X(o, (e => U(e.items, (e => "item" === e.type))));
                        return mu.getState(e).update(H(n, (e => e.data))), t
                    })),
                    i = e => ym.getCurrent(e),
                    l = "typeaheadevents",
                    c = [eh.config({}), mu.config({
                        onSetValue: e.onSetValue,
                        store: {
                            mode: "dataset",
                            getDataKey: e => $a(e.element),
                            getFallbackEntry: e => ({
                                value: e,
                                meta: {}
                            }),
                            setValue: (t, o) => {
                                qa(t.element, e.model.getDisplayText(o))
                            },
                            ...e.initialData.map((e => Mr("initialValue", e))).getOr({})
                        }
                    }), WO.config({
                        stream: {
                            mode: "throttle",
                            delay: e.responseTime,
                            stopEvent: !1
                        },
                        onStream: (t, o) => {
                            const r = ew.getCoupled(t, "sandbox");
                            if (eh.isFocused(t) && $a(t.element).length >= e.minChars) {
                                const o = i(r).bind((e => Wm.getHighlighted(e).map(mu.getValue)));
                                e.previewing.set(!0);
                                const s = t => {
                                    i(r).each((t => {
                                        o.fold((() => {
                                            e.model.selectsOver && Wm.highlightFirst(t)
                                        }), (e => {
                                            Wm.highlightBy(t, (t => mu.getValue(t).value === e.value)), Wm.getHighlighted(t).orThunk((() => (Wm.highlightFirst(t), A.none())))
                                        }))
                                    }))
                                };
                                dw(e, a(t), t, r, n, s, Nh.HighlightJustMenu).get(b)
                            }
                        },
                        cancelEvent: fs()
                    }), Hp.config({
                        mode: "special",
                        onDown: (e, t) => (r(e, t, Wm.highlightFirst), A.some(!0)),
                        onEscape: e => {
                            const t = ew.getCoupled(e, "sandbox");
                            return $d.isOpen(t) ? ($d.close(t), A.some(!0)) : A.none()
                        },
                        onUp: (e, t) => (r(e, t, Wm.highlightLast), A.some(!0)),
                        onEnter: t => {
                            const o = ew.getCoupled(t, "sandbox"),
                                n = $d.isOpen(o);
                            if (n && !e.previewing.get()) return i(o).bind((e => Wm.getHighlighted(e))).map((e => (Is(t, qO(), {
                                item: e
                            }), !0))); {
                                const r = mu.getValue(t);
                                return Fs(t, fs()), e.onExecute(o, t, r), n && $d.close(o), A.some(!0)
                            }
                        }
                    }), lh.config({
                        toggleClass: e.markers.openClass,
                        aria: {
                            mode: "expanded"
                        }
                    }), ew.config({
                        others: {
                            sandbox: t => hw(e, t, {
                                onOpen: () => lh.on(t),
                                onClose: () => lh.off(t)
                            })
                        }
                    }), Kp(l, [Ys((t => {
                        e.lazyTypeaheadComp.set(A.some(t))
                    })), Js((t => {
                        e.lazyTypeaheadComp.set(A.none())
                    })), Qs((t => {
                        const o = b;
                        mw(e, a(t), t, n, o, Nh.HighlightMenuAndItem).get(b)
                    })), Us(qO(), ((t, o) => {
                        const n = ew.getCoupled(t, "sandbox");
                        jO(e.model, t, o.event.item), Fs(t, fs()), e.onItemExecute(t, n, o.event.item, mu.getValue(t)), $d.close(n), $O(t)
                    }))].concat(e.dismissOnBlur ? [Us(ls(), (e => {
                        const t = ew.getCoupled(e, "sandbox");
                        Rl(t.element).isNone() && $d.close(t)
                    }))] : []))],
                    d = {
                        [ks()]: [mu.name(), WO.name(), l],
                        ...e.eventOrder
                    };
                return {
                    uid: e.uid,
                    dom: Bb(fn(e, {
                        inputAttributes: {
                            role: "combobox",
                            "aria-autocomplete": "list",
                            "aria-haspopup": "true"
                        }
                    })),
                    behaviours: {
                        ...s,
                        ...hu(e.typeaheadBehaviours, c)
                    },
                    eventOrder: d
                }
            }
        }),
        JO = e => ({
            ...e,
            toCached: () => JO(e.toCached()),
            bindFuture: t => JO(e.bind((e => e.fold((e => aw(rn.error(e))), (e => t(e)))))),
            bindResult: t => JO(e.map((e => e.bind(t)))),
            mapResult: t => JO(e.map((e => e.map(t)))),
            mapError: t => JO(e.map((e => e.mapError(t)))),
            foldResult: (t, o) => e.map((e => e.fold(t, o))),
            withTimeout: (t, o) => JO(sw((n => {
                let r = !1;
                const s = setTimeout((() => {
                    r = !0, n(rn.error(o()))
                }), t);
                e.get((e => {
                    r || (clearTimeout(s), n(e))
                }))
            })))
        }),
        ZO = e => JO(sw(e)),
        QO = (e, t, o = [], n, r, s) => {
            const a = t.fold((() => ({})), (e => ({
                    action: e
                }))),
                i = {
                    buttonBehaviours: kl([vy((() => !e.enabled || s.isDisabled())), by(), Jw.config({}), Kp("button press", [Ps("click"), Ps("mousedown")])].concat(o)),
                    eventOrder: {
                        click: ["button press", "alloy.base.behaviour"],
                        mousedown: ["button press", "alloy.base.behaviour"]
                    },
                    ...a
                },
                l = fn(i, {
                    dom: n
                });
            return fn(l, {
                components: r
            })
        },
        e_ = (e, t, o, n = []) => {
            const r = {
                    tag: "button",
                    classes: ["tox-tbtn"],
                    attributes: e.tooltip.map((e => ({
                        "aria-label": o.translate(e),
                        title: o.translate(e)
                    }))).getOr({})
                },
                s = e.icon.map((e => WC(e, o.icons))),
                a = _y([s]);
            return QO(e, t, n, r, a, o)
        },
        t_ = e => {
            switch (e) {
                case "primary":
                    return ["tox-button"];
                case "toolbar":
                    return ["tox-tbtn"];
                default:
                    return ["tox-button", "tox-button--secondary"]
            }
        },
        o_ = (e, t, o, n = [], r = []) => {
            const s = o.translate(e.text),
                a = e.icon.map((e => WC(e, o.icons))),
                i = [a.getOrThunk((() => ti(s)))],
                l = e.buttonType.getOr(e.primary || e.borderless ? "primary" : "secondary"),
                c = [...t_(l), ...a.isSome() ? ["tox-button--icon"] : [], ...e.borderless ? ["tox-button--naked"] : [], ...r];
            return QO(e, t, n, {
                tag: "button",
                classes: c,
                attributes: {
                    title: s
                }
            }, i, o)
        },
        n_ = (e, t, o, n = [], r = []) => {
            const s = o_(e, A.some(t), o, n, r);
            return Ph.sketch(s)
        },
        r_ = (e, t) => o => {
            "custom" === t ? Is(o, aS, {
                name: e,
                value: {}
            }) : "submit" === t ? Fs(o, iS) : "cancel" === t ? Fs(o, sS) : console.error("Unknown button type: ", t)
        },
        s_ = (e, t, o) => {
            if (((e, t) => "menu" === t)(0, t)) {
                const t = () => s,
                    n = e,
                    r = {
                        ...e,
                        type: "menubutton",
                        search: A.none(),
                        onSetup: t => (t.setEnabled(e.enabled), b),
                        fetch: MO(n.items, t, o)
                    },
                    s = Uh(AO(r, "tox-tbtn", o, A.none()));
                return s.asSpec()
            }
            if (((e, t) => "custom" === t || "cancel" === t || "submit" === t)(0, t)) {
                const n = r_(e.name, t),
                    r = {
                        ...e,
                        borderless: !1
                    };
                return n_(r, n, o.shared.providers, [])
            }
            if (((e, t) => "togglebutton" === t)(0, t)) return ((e, t) => {
                var o, n, r;
                const s = A.from(e.icon).map((e => jC(e, t.icons))).map(Uh),
                    a = {
                        ...e,
                        name: null !== (o = e.name) && void 0 !== o ? o : "",
                        primary: "primary" === e.buttonType,
                        buttonType: A.from(e.buttonType),
                        tooltip: A.from(e.tooltip),
                        icon: A.from(e.name),
                        enabled: null !== (n = e.enabled) && void 0 !== n && n,
                        borderless: !1
                    },
                    i = a.tooltip.map((e => ({
                        "aria-label": t.translate(e),
                        title: t.translate(e)
                    }))).getOr({}),
                    l = t_(null !== (r = e.buttonType) && void 0 !== r ? r : "secondary"),
                    c = !!e.icon && !!e.text,
                    d = {
                        tag: "button",
                        classes: [...l.concat(["tox-button--icon"]), ...e.active ? ["tox-button--enabled"] : [], ...c ? ["tox-button--icon-and-text"] : []],
                        attributes: i
                    },
                    u = t.translate(e.text),
                    m = ti(u),
                    g = [..._y([s.map((e => e.asSpec()))]), ...c ? [m] : []],
                    p = QO(a, A.some((o => {
                        Is(o, aS, {
                            name: e.name,
                            value: {
                                setIcon: e => {
                                    s.map((n => n.getOpt(o).each((o => {
                                        Xp.set(o, [jC(e, t.icons)])
                                    }))))
                                }
                            }
                        })
                    })), [], d, g, t);
                return Ph.sketch(p)
            })({
                ...e,
                tooltip: e.tooltip,
                text: e.text.getOrUndefined(),
                buttonType: e.buttonType.getOrUndefined()
            }, o.shared.providers);
            throw console.error("Unknown footer button type: ", t), new Error("Unknown footer button type")
        },
        a_ = {
            type: "separator"
        },
        i_ = e => ({
            type: "menuitem",
            value: e.url,
            text: e.title,
            meta: {
                attach: e.attach
            },
            onAction: b
        }),
        l_ = (e, t) => ({
            type: "menuitem",
            value: t,
            text: e,
            meta: {
                attach: void 0
            },
            onAction: b
        }),
        c_ = (e, t) => (e => H(e, i_))(((e, t) => U(t, (t => t.type === e)))(e, t)),
        d_ = e => c_("header", e.targets),
        u_ = e => c_("anchor", e.targets),
        m_ = e => A.from(e.anchorTop).map((e => l_("<top>", e))).toArray(),
        g_ = e => A.from(e.anchorBottom).map((e => l_("<bottom>", e))).toArray(),
        p_ = (e, t) => {
            const o = e.toLowerCase();
            return U(t, (e => {
                var t;
                const n = void 0 !== e.meta && void 0 !== e.meta.text ? e.meta.text : e.text,
                    r = null !== (t = e.value) && void 0 !== t ? t : "";
                return Te(n.toLowerCase(), o) || Te(r.toLowerCase(), o)
            }))
        },
        h_ = la("aria-invalid"),
        f_ = (e, t) => {
            e.dom.checked = t
        },
        b_ = e => e.dom.checked,
        v_ = e => (t, o, n, r) => be(o, "name").fold((() => e(o, r, A.none())), (s => t.field(s, e(o, r, be(n, s))))),
        y_ = {
            bar: v_(((e, t) => ((e, t) => ({
                dom: {
                    tag: "div",
                    classes: ["tox-bar", "tox-form__controls-h-stack"]
                },
                components: H(e.items, t.interpreter)
            }))(e, t.shared))),
            collection: v_(((e, t, o) => ((e, t, o) => {
                const n = e.label.map((e => oS(e, t))),
                    r = e => (t, o) => {
                        hi(o.event.target, "[data-collection-item-value]").each((n => {
                            e(t, o, n, Ot(n, "data-collection-item-value"))
                        }))
                    },
                    s = r(((o, n, r, s) => {
                        n.stop(), t.isDisabled() || Is(o, aS, {
                            name: e.name,
                            value: s
                        })
                    })),
                    a = [Us(qr(), r(((e, t, o) => {
                        Dl(o)
                    }))), Us(es(), s), Us(gs(), s), Us(Xr(), r(((e, t, o) => {
                        pi(e.element, "." + yb).each((e => {
                            Pa(e, yb)
                        })), La(o, yb)
                    }))), Us(Kr(), r((e => {
                        pi(e.element, "." + yb).each((e => {
                            Pa(e, yb)
                        }))
                    }))), Qs(r(((t, o, n, r) => {
                        Is(t, aS, {
                            name: e.name,
                            value: r
                        })
                    })))],
                    i = (e, t) => H(qc(e.element, ".tox-collection__item"), t),
                    l = Xw.parts.field({
                        dom: {
                            tag: "div",
                            classes: ["tox-collection"].concat(1 !== e.columns ? ["tox-collection--grid"] : ["tox-collection--list"])
                        },
                        components: [],
                        factory: {
                            sketch: w
                        },
                        behaviours: kl([Fm.config({
                            disabled: t.isDisabled,
                            onDisabled: e => {
                                i(e, (e => {
                                    La(e, "tox-collection__item--state-disabled"), kt(e, "aria-disabled", !0)
                                }))
                            },
                            onEnabled: e => {
                                i(e, (e => {
                                    Pa(e, "tox-collection__item--state-disabled"), Et(e, "aria-disabled")
                                }))
                            }
                        }), by(), Xp.config({}), mu.config({
                            store: {
                                mode: "memory",
                                initialValue: o.getOr([])
                            },
                            onSetValue: (o, n) => {
                                ((o, n) => {
                                    const r = H(n, (o => {
                                            const n = Wh.translate(o.text),
                                                r = 1 === e.columns ? `<div class="tox-collection__item-label">${n}</div>` : "",
                                                s = `<div class="tox-collection__item-icon">${o.icon}</div>`,
                                                a = {
                                                    _: " ",
                                                    " - ": " ",
                                                    "-": " "
                                                },
                                                i = n.replace(/\_| \- |\-/g, (e => a[e]));
                                            return `<div class="tox-collection__item${t.isDisabled()?" tox-collection__item--state-disabled":""}" tabindex="-1" data-collection-item-value="${Zw.encodeAllRaw(o.value)}" title="${i}" aria-label="${i}">${s}${r}</div>`
                                        })),
                                        s = "auto" !== e.columns && e.columns > 1 ? z(r, e.columns) : [r],
                                        a = H(s, (e => `<div class="tox-collection__group">${e.join("")}</div>`));
                                    ta(o.element, a.join(""))
                                })(o, n), "auto" === e.columns && oy(o, 5, "tox-collection__item").each((({
                                    numRows: e,
                                    numColumns: t
                                }) => {
                                    Hp.setGridSize(o, e, t)
                                })), Fs(o, uS)
                            }
                        }), Jw.config({}), Hp.config((c = e.columns, 1 === c ? {
                            mode: "menu",
                            moveOnTab: !1,
                            selector: ".tox-collection__item"
                        } : "auto" === c ? {
                            mode: "flatgrid",
                            selector: ".tox-collection__item",
                            initSize: {
                                numColumns: 1,
                                numRows: 1
                            }
                        } : {
                            mode: "matrix",
                            selectors: {
                                row: ".tox-collection__group",
                                cell: `.${gb}`
                            }
                        })), Kp("collection-events", a)]),
                        eventOrder: {
                            [us()]: ["disabling", "alloy.base.behaviour", "collection-events"]
                        }
                    });
                var c;
                return Qw(n, l, ["tox-form__group--collection"], [])
            })(e, t.shared.providers, o))),
            alertbanner: v_(((e, t) => ((e, t) => jw.sketch({
                dom: {
                    tag: "div",
                    attributes: {
                        role: "alert"
                    },
                    classes: ["tox-notification", "tox-notification--in", `tox-notification--${e.level}`]
                },
                components: [{
                    dom: {
                        tag: "div",
                        classes: ["tox-notification__icon"]
                    },
                    components: [Ph.sketch({
                        dom: {
                            tag: "button",
                            classes: ["tox-button", "tox-button--naked", "tox-button--icon"],
                            innerHtml: Kh(e.icon, t.icons),
                            attributes: {
                                title: t.translate(e.iconTooltip)
                            }
                        },
                        action: t => {
                            Is(t, aS, {
                                name: "alert-banner",
                                value: e.url
                            })
                        },
                        buttonBehaviours: kl([Yh()])
                    })]
                }, {
                    dom: {
                        tag: "div",
                        classes: ["tox-notification__body"],
                        innerHtml: t.translate(e.text)
                    }
                }]
            }))(e, t.shared.providers))),
            input: v_(((e, t, o) => ((e, t, o) => uO({
                name: e.name,
                multiline: !1,
                label: e.label,
                inputMode: e.inputMode,
                placeholder: e.placeholder,
                flex: !1,
                disabled: !e.enabled,
                classname: "tox-textfield",
                validation: A.none(),
                maximized: e.maximized,
                data: o
            }, t))(e, t.shared.providers, o))),
            textarea: v_(((e, t, o) => ((e, t, o) => uO({
                name: e.name,
                multiline: !0,
                label: e.label,
                inputMode: A.none(),
                placeholder: e.placeholder,
                flex: !0,
                disabled: !e.enabled,
                classname: "tox-textarea",
                validation: A.none(),
                maximized: e.maximized,
                data: o
            }, t))(e, t.shared.providers, o))),
            label: v_(((e, t) => ((e, t) => {
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: [{
                        dom: {
                            tag: "label",
                            classes: ["tox-label"]
                        },
                        components: [ti(t.providers.translate(e.label))]
                    }, ...H(e.items, t.interpreter)],
                    behaviours: kl([yC(), Xp.config({}), (o = A.none(), kC(o, ea, ta)), Hp.config({
                        mode: "acyclic"
                    })])
                };
                var o
            })(e, t.shared))),
            iframe: (jT = (e, t, o) => ((e, t, o) => {
                const n = e.sandboxed,
                    r = e.transparent,
                    s = "tox-dialog__iframe",
                    a = {
                        ...e.label.map((e => ({
                            title: e
                        }))).getOr({}),
                        ...o.map((e => ({
                            srcdoc: e
                        }))).getOr({}),
                        ...n ? {
                            sandbox: "allow-scripts allow-same-origin"
                        } : {}
                    },
                    i = (e => {
                        const t = Er(e.getOr(""));
                        return {
                            getValue: e => t.get(),
                            setValue: (e, o) => {
                                t.get() !== o && kt(e.element, "srcdoc", o), t.set(o)
                            }
                        }
                    })(o),
                    l = e.label.map((e => oS(e, t))),
                    c = Xw.parts.field({
                        factory: {
                            sketch: e => IC({
                                uid: e.uid,
                                dom: {
                                    tag: "iframe",
                                    attributes: a,
                                    classes: r ? [s] : [s, `${s}--opaque`]
                                },
                                behaviours: kl([Jw.config({}), eh.config({}), _C(o, i.getValue, i.setValue)])
                            })
                        }
                    });
                return Qw(l, c, ["tox-form__group--stretched"], [])
            })(e, t.shared.providers, o), (e, t, o, n) => {
                const r = fn(t, {
                    source: "dynamic"
                });
                return v_(jT)(e, r, o, n)
            }),
            button: v_(((e, t) => ((e, t) => {
                const o = r_(e.name, "custom");
                return n = A.none(), r = Xw.parts.field({
                    factory: Ph,
                    ...o_(e, A.some(o), t, [TC(""), yC()])
                }), Qw(n, r, [], []);
                var n, r
            })(e, t.shared.providers))),
            checkbox: v_(((e, t, o) => ((e, t, o) => {
                const n = e => (e.element.dom.click(), A.some(!0)),
                    r = Xw.parts.field({
                        factory: {
                            sketch: w
                        },
                        dom: {
                            tag: "input",
                            classes: ["tox-checkbox__input"],
                            attributes: {
                                type: "checkbox"
                            }
                        },
                        behaviours: kl([yC(), Fm.config({
                            disabled: () => !e.enabled || t.isDisabled()
                        }), Jw.config({}), eh.config({}), OC(o, b_, f_), Hp.config({
                            mode: "special",
                            onEnter: n,
                            onSpace: n,
                            stopSpaceKeyup: !0
                        }), Kp("checkbox-events", [Us(Qr(), ((t, o) => {
                            Is(t, nS, {
                                name: e.name
                            })
                        }))])])
                    }),
                    s = Xw.parts.label({
                        dom: {
                            tag: "span",
                            classes: ["tox-checkbox__label"]
                        },
                        components: [ti(t.translate(e.label))],
                        behaviours: kl([SS.config({})])
                    }),
                    a = e => Zh("checked" === e ? "selected" : "unselected", {
                        tag: "span",
                        classes: ["tox-icon", "tox-checkbox-icon__" + e]
                    }, t.icons),
                    i = Uh({
                        dom: {
                            tag: "div",
                            classes: ["tox-checkbox__icons"]
                        },
                        components: [a("checked"), a("unchecked")]
                    });
                return Xw.sketch({
                    dom: {
                        tag: "label",
                        classes: ["tox-checkbox"]
                    },
                    components: [r, i.asSpec(), s],
                    fieldBehaviours: kl([Fm.config({
                        disabled: () => !e.enabled || t.isDisabled(),
                        disableClass: "tox-checkbox--disabled",
                        onDisabled: e => {
                            Xw.getField(e).each(Fm.disable)
                        },
                        onEnabled: e => {
                            Xw.getField(e).each(Fm.enable)
                        }
                    }), by()])
                })
            })(e, t.shared.providers, o))),
            colorinput: v_(((e, t, o) => ((e, t, o, n) => {
                const r = Xw.parts.field({
                        factory: Fb,
                        inputClasses: ["tox-textfield"],
                        data: n,
                        onSetValue: e => wS.run(e).get(b),
                        inputBehaviours: kl([Fm.config({
                            disabled: t.providers.isDisabled
                        }), by(), Jw.config({}), wS.config({
                            invalidClass: "tox-textbox-field-invalid",
                            getRoot: e => st(e.element),
                            notify: {
                                onValid: e => {
                                    const t = mu.getValue(e);
                                    Is(e, kS, {
                                        color: t
                                    })
                                }
                            },
                            validator: {
                                validateOnLoad: !1,
                                validate: e => {
                                    const t = mu.getValue(e);
                                    if (0 === t.length) return aw(rn.value(!0)); {
                                        const e = Re("span");
                                        Dt(e, "background-color", t);
                                        const o = Nt(e, "background-color").fold((() => rn.error("blah")), (e => rn.value(t)));
                                        return aw(o)
                                    }
                                }
                            }
                        })]),
                        selectOnFocus: !1
                    }),
                    s = e.label.map((e => oS(e, t.providers))),
                    a = (e, t) => {
                        Is(e, CS, {
                            value: t
                        })
                    },
                    i = Uh(((e, t) => xw.sketch({
                        dom: e.dom,
                        components: e.components,
                        toggleClass: "mce-active",
                        dropdownBehaviours: kl([vy(t.providers.isDisabled), by(), SS.config({}), Jw.config({})]),
                        layouts: e.layouts,
                        sandboxClasses: ["tox-dialog__popups"],
                        lazySink: t.getSink,
                        fetch: o => sw((t => e.fetch(t))).map((n => A.from(Ew(fn(Px(la("menu-value"), n, (t => {
                            e.onItemAction(o, t)
                        }), e.columns, e.presets, ub.CLOSE_ON_EXECUTE, T, t.providers), {
                            movement: Wx(e.columns, e.presets)
                        }))))),
                        parts: {
                            menu: Eb(0, 0, e.presets)
                        }
                    }))({
                        dom: {
                            tag: "span",
                            attributes: {
                                "aria-label": t.providers.translate("Color swatch")
                            }
                        },
                        layouts: {
                            onRtl: () => [sl, rl, cl],
                            onLtr: () => [rl, sl, cl]
                        },
                        components: [],
                        fetch: Rx(o.getColors(e.storageKey), e.storageKey, o.hasCustomColors()),
                        columns: o.getColorCols(e.storageKey),
                        presets: "color",
                        onItemAction: (t, n) => {
                            i.getOpt(t).each((t => {
                                "custom" === n ? o.colorPicker((o => {
                                    o.fold((() => Fs(t, OS)), (o => {
                                        a(t, o), px(e.storageKey, o)
                                    }))
                                }), "#ffffff") : a(t, "remove" === n ? "" : n)
                            }))
                        }
                    }, t));
                return Xw.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: s.toArray().concat([{
                        dom: {
                            tag: "div",
                            classes: ["tox-color-input"]
                        },
                        components: [r, i.asSpec()]
                    }]),
                    fieldBehaviours: kl([Kp("form-field-events", [Us(kS, ((t, o) => {
                        i.getOpt(t).each((e => {
                            Dt(e.element, "background-color", o.event.color)
                        })), Is(t, nS, {
                            name: e.name
                        })
                    })), Us(CS, ((e, t) => {
                        Xw.getField(e).each((o => {
                            mu.setValue(o, t.event.value), ym.getCurrent(e).each(eh.focus)
                        }))
                    })), Us(OS, ((e, t) => {
                        Xw.getField(e).each((t => {
                            ym.getCurrent(e).each(eh.focus)
                        }))
                    }))])])
                })
            })(e, t.shared, t.colorinput, o))),
            colorpicker: v_(((e, t, o) => ((e, t, o) => {
                const n = e => "tox-" + e,
                    r = vC((e => t => e.translate(EC[t]))(t), n),
                    s = Uh(r.sketch({
                        dom: {
                            tag: "div",
                            classes: [n("color-picker-container")],
                            attributes: {
                                role: "presentation"
                            }
                        },
                        onValidHex: e => {
                            Is(e, aS, {
                                name: "hex-valid",
                                value: !0
                            })
                        },
                        onInvalidHex: e => {
                            Is(e, aS, {
                                name: "hex-valid",
                                value: !1
                            })
                        }
                    }));
                return {
                    dom: {
                        tag: "div"
                    },
                    components: [s.asSpec()],
                    behaviours: kl([_C(o, (e => {
                        const t = s.get(e);
                        return ym.getCurrent(t).bind((e => mu.getValue(e).hex)).map((e => "#" + _e(e, "#"))).getOr("")
                    }), ((e, t) => {
                        const o = A.from(/^#([a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?)/.exec(t)).bind((e => te(e, 1))),
                            n = s.get(e);
                        ym.getCurrent(n).fold((() => {
                            console.log("Can not find form")
                        }), (e => {
                            mu.setValue(e, {
                                hex: o.getOr("")
                            }), mC.getField(e, "hex").each((e => {
                                Fs(e, Zr())
                            }))
                        }))
                    })), yC()])
                }
            })(0, t.shared.providers, o))),
            dropzone: v_(((e, t, o) => ((e, t, o) => {
                const n = (e, t) => {
                        t.stop()
                    },
                    r = e => (t, o) => {
                        L(e, (e => {
                            e(t, o)
                        }))
                    },
                    s = (e, t) => {
                        var o;
                        if (!Fm.isDisabled(e)) {
                            const n = t.event.raw;
                            i(e, null === (o = n.dataTransfer) || void 0 === o ? void 0 : o.files)
                        }
                    },
                    a = (e, t) => {
                        const o = t.event.raw.target;
                        i(e, o.files)
                    },
                    i = (o, n) => {
                        n && (mu.setValue(o, ((e, t) => {
                            const o = MC.explode(t.getOption("images_file_types"));
                            return U(re(e), (e => N(o, (t => Ae(e.name.toLowerCase(), `.${t.toLowerCase()}`)))))
                        })(n, t)), Is(o, nS, {
                            name: e.name
                        }))
                    },
                    l = Uh({
                        dom: {
                            tag: "input",
                            attributes: {
                                type: "file",
                                accept: "image/*"
                            },
                            styles: {
                                display: "none"
                            }
                        },
                        behaviours: kl([Kp("input-file-events", [qs(es()), qs(gs())])])
                    }),
                    c = e.label.map((e => oS(e, t))),
                    d = Xw.parts.field({
                        factory: {
                            sketch: e => ({
                                uid: e.uid,
                                dom: {
                                    tag: "div",
                                    classes: ["tox-dropzone-container"]
                                },
                                behaviours: kl([TC(o.getOr([])), yC(), Fm.config({}), lh.config({
                                    toggleClass: "dragenter",
                                    toggleOnExecute: !1
                                }), Kp("dropzone-events", [Us("dragenter", r([n, lh.toggle])), Us("dragleave", r([n, lh.toggle])), Us("dragover", n), Us("drop", r([n, s])), Us(Qr(), a)])]),
                                components: [{
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-dropzone"],
                                        styles: {}
                                    },
                                    components: [{
                                        dom: {
                                            tag: "p"
                                        },
                                        components: [ti(t.translate("Drop an image here"))]
                                    }, Ph.sketch({
                                        dom: {
                                            tag: "button",
                                            styles: {
                                                position: "relative"
                                            },
                                            classes: ["tox-button", "tox-button--secondary"]
                                        },
                                        components: [ti(t.translate("Browse for an image")), l.asSpec()],
                                        action: e => {
                                            l.get(e).element.dom.click()
                                        },
                                        buttonBehaviours: kl([Jw.config({}), vy(t.isDisabled), by()])
                                    })]
                                }]
                            })
                        }
                    });
                return Qw(c, d, ["tox-form__group--stretched"], [])
            })(e, t.shared.providers, o))),
            grid: v_(((e, t) => ((e, t) => ({
                dom: {
                    tag: "div",
                    classes: ["tox-form__grid", `tox-form__grid--${e.columns}col`]
                },
                components: H(e.items, t.interpreter)
            }))(e, t.shared))),
            listbox: v_(((e, t, o) => ((e, t, o) => {
                const n = t.shared.providers,
                    r = o.bind((t => oO(e.items, t))).orThunk((() => oe(e.items).filter(QC))),
                    s = e.label.map((e => oS(e, n))),
                    a = Xw.parts.field({
                        dom: {},
                        factory: {
                            sketch: o => XC({
                                uid: o.uid,
                                text: r.map((e => e.text)),
                                icon: A.none(),
                                tooltip: e.label,
                                role: A.none(),
                                fetch: (o, n) => {
                                    const r = tO(o, e.name, e.items, mu.getValue(o));
                                    n(ZC(r, ub.CLOSE_ON_EXECUTE, t, {
                                        isHorizontalMenu: !1,
                                        search: A.none()
                                    }))
                                },
                                onSetup: x(b),
                                getApi: x({}),
                                columns: 1,
                                presets: "normal",
                                classes: [],
                                dropdownBehaviours: [Jw.config({}), _C(r.map((e => e.value)), (e => Ot(e.element, eO)), ((t, o) => {
                                    oO(e.items, o).each((e => {
                                        kt(t.element, eO, e.value), Is(t, $C, {
                                            text: e.text
                                        })
                                    }))
                                }))]
                            }, "tox-listbox", t.shared)
                        }
                    }),
                    i = {
                        dom: {
                            tag: "div",
                            classes: ["tox-listboxfield"]
                        },
                        components: [a]
                    };
                return Xw.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: q([s.toArray(), [i]]),
                    fieldBehaviours: kl([Fm.config({
                        disabled: x(!e.enabled),
                        onDisabled: e => {
                            Xw.getField(e).each(Fm.disable)
                        },
                        onEnabled: e => {
                            Xw.getField(e).each(Fm.enable)
                        }
                    })])
                })
            })(e, t, o))),
            selectbox: v_(((e, t, o) => ((e, t, o) => {
                const n = H(e.items, (e => ({
                        text: t.translate(e.text),
                        value: e.value
                    }))),
                    r = e.label.map((e => oS(e, t))),
                    s = Xw.parts.field({
                        dom: {},
                        ...o.map((e => ({
                            data: e
                        }))).getOr({}),
                        selectAttributes: {
                            size: e.size
                        },
                        options: n,
                        factory: nO,
                        selectBehaviours: kl([Fm.config({
                            disabled: () => !e.enabled || t.isDisabled()
                        }), Jw.config({}), Kp("selectbox-change", [Us(Qr(), ((t, o) => {
                            Is(t, nS, {
                                name: e.name
                            })
                        }))])])
                    }),
                    a = e.size > 1 ? A.none() : A.some(Zh("chevron-down", {
                        tag: "div",
                        classes: ["tox-selectfield__icon-js"]
                    }, t.icons)),
                    i = {
                        dom: {
                            tag: "div",
                            classes: ["tox-selectfield"]
                        },
                        components: q([
                            [s], a.toArray()
                        ])
                    };
                return Xw.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: q([r.toArray(), [i]]),
                    fieldBehaviours: kl([Fm.config({
                        disabled: () => !e.enabled || t.isDisabled(),
                        onDisabled: e => {
                            Xw.getField(e).each(Fm.disable)
                        },
                        onEnabled: e => {
                            Xw.getField(e).each(Fm.enable)
                        }
                    }), by()])
                })
            })(e, t.shared.providers, o))),
            sizeinput: v_(((e, t) => ((e, t) => {
                let o = dO;
                const n = la("ratio-event"),
                    r = e => Zh(e, {
                        tag: "span",
                        classes: ["tox-icon", "tox-lock-icon__" + e]
                    }, t.icons),
                    s = iO.parts.lock({
                        dom: {
                            tag: "button",
                            classes: ["tox-lock", "tox-button", "tox-button--naked", "tox-button--icon"],
                            attributes: {
                                title: t.translate(e.label.getOr("Constrain proportions"))
                            }
                        },
                        components: [r("lock"), r("unlock")],
                        buttonBehaviours: kl([Fm.config({
                            disabled: () => !e.enabled || t.isDisabled()
                        }), by(), Jw.config({})])
                    }),
                    a = e => ({
                        dom: {
                            tag: "div",
                            classes: ["tox-form__group"]
                        },
                        components: e
                    }),
                    i = o => Xw.parts.field({
                        factory: Fb,
                        inputClasses: ["tox-textfield"],
                        inputBehaviours: kl([Fm.config({
                            disabled: () => !e.enabled || t.isDisabled()
                        }), by(), Jw.config({}), Kp("size-input-events", [Us(Xr(), ((e, t) => {
                            Is(e, n, {
                                isField1: o
                            })
                        })), Us(Qr(), ((t, o) => {
                            Is(t, nS, {
                                name: e.name
                            })
                        }))])]),
                        selectOnFocus: !1
                    }),
                    l = e => ({
                        dom: {
                            tag: "label",
                            classes: ["tox-label"]
                        },
                        components: [ti(t.translate(e))]
                    }),
                    c = iO.parts.field1(a([Xw.parts.label(l("Width")), i(!0)])),
                    d = iO.parts.field2(a([Xw.parts.label(l("Height")), i(!1)]));
                return iO.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-form__controls-h-stack"]
                        },
                        components: [c, d, a([l("\xa0"), s])]
                    }],
                    field1Name: "width",
                    field2Name: "height",
                    locked: !0,
                    markers: {
                        lockClass: "tox-locked"
                    },
                    onLockedChange: (e, t, n) => {
                        lO(mu.getValue(e)).each((e => {
                            o(e).each((e => {
                                mu.setValue(t, (e => {
                                    const t = {
                                        "": 0,
                                        px: 0,
                                        pt: 1,
                                        mm: 1,
                                        pc: 2,
                                        ex: 2,
                                        em: 2,
                                        ch: 2,
                                        rem: 2,
                                        cm: 3,
                                        in: 4,
                                        "%": 4
                                    };
                                    let o = e.value.toFixed((n = e.unit) in t ? t[n] : 1);
                                    var n;
                                    return -1 !== o.indexOf(".") && (o = o.replace(/\.?0*$/, "")), o + e.unit
                                })(e))
                            }))
                        }))
                    },
                    coupledFieldBehaviours: kl([Fm.config({
                        disabled: () => !e.enabled || t.isDisabled(),
                        onDisabled: e => {
                            iO.getField1(e).bind(Xw.getField).each(Fm.disable), iO.getField2(e).bind(Xw.getField).each(Fm.disable), iO.getLock(e).each(Fm.disable)
                        },
                        onEnabled: e => {
                            iO.getField1(e).bind(Xw.getField).each(Fm.enable), iO.getField2(e).bind(Xw.getField).each(Fm.enable), iO.getLock(e).each(Fm.enable)
                        }
                    }), by(), Kp("size-input-events2", [Us(n, ((e, t) => {
                        const n = t.event.isField1,
                            r = n ? iO.getField1(e) : iO.getField2(e),
                            s = n ? iO.getField2(e) : iO.getField1(e),
                            a = r.map(mu.getValue).getOr(""),
                            i = s.map(mu.getValue).getOr("");
                        o = ((e, t) => {
                            const o = lO(e).toOptional(),
                                n = lO(t).toOptional();
                            return Se(o, n, ((e, t) => cO(e, t.unit).map((e => t.value / e)).map((e => {
                                return o = e, n = t.unit, e => cO(e, n).map((e => ({
                                    value: e * o,
                                    unit: n
                                })));
                                var o, n
                            })).getOr(dO))).getOr(dO)
                        })(a, i)
                    }))])])
                })
            })(e, t.shared.providers))),
            slider: v_(((e, t, o) => ((e, t, o) => {
                const n = rC.parts.label({
                        dom: {
                            tag: "label",
                            classes: ["tox-label"]
                        },
                        components: [ti(t.translate(e.label))]
                    }),
                    r = rC.parts.spectrum({
                        dom: {
                            tag: "div",
                            classes: ["tox-slider__rail"],
                            attributes: {
                                role: "presentation"
                            }
                        }
                    }),
                    s = rC.parts.thumb({
                        dom: {
                            tag: "div",
                            classes: ["tox-slider__handle"],
                            attributes: {
                                role: "presentation"
                            }
                        }
                    });
                return rC.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-slider"],
                        attributes: {
                            role: "presentation"
                        }
                    },
                    model: {
                        mode: "x",
                        minX: e.min,
                        maxX: e.max,
                        getInitialValue: x(o.getOrThunk((() => (Math.abs(e.max) - Math.abs(e.min)) / 2)))
                    },
                    components: [n, r, s],
                    sliderBehaviours: kl([yC(), eh.config({})]),
                    onChoose: (t, o, n) => {
                        Is(t, nS, {
                            name: e.name,
                            value: n
                        })
                    }
                })
            })(e, t.shared.providers, o))),
            urlinput: v_(((e, t, o) => ((e, t, o, n) => {
                const r = t.shared.providers,
                    s = t => {
                        const n = mu.getValue(t);
                        o.addToHistory(n.value, e.filetype)
                    },
                    a = {
                        ...n.map((e => ({
                            initialData: e
                        }))).getOr({}),
                        dismissOnBlur: !0,
                        inputClasses: ["tox-textfield"],
                        sandboxClasses: ["tox-dialog__popups"],
                        inputAttributes: {
                            "aria-errormessage": h_,
                            type: "url"
                        },
                        minChars: 0,
                        responseTime: 0,
                        fetch: n => {
                            const r = ((e, t, o) => {
                                    const n = mu.getValue(t),
                                        r = void 0 !== n.meta.text ? n.meta.text : n.value;
                                    return o.getLinkInformation().fold((() => []), (t => {
                                        const n = p_(r, (e => H(e, (e => l_(e, e))))(o.getHistory(e)));
                                        return "file" === e ? (s = [n, p_(r, d_(t)), p_(r, q([m_(t), u_(t), g_(t)]))], j(s, ((e, t) => 0 === e.length || 0 === t.length ? e.concat(t) : e.concat(a_, t)), [])) : n;
                                        var s
                                    }))
                                })(e.filetype, n, o),
                                s = ZC(r, ub.BUBBLE_TO_SANDBOX, t, {
                                    isHorizontalMenu: !1,
                                    search: A.none()
                                });
                            return aw(s)
                        },
                        getHotspot: e => g.getOpt(e),
                        onSetValue: (e, t) => {
                            e.hasConfigured(wS) && wS.run(e).get(b)
                        },
                        typeaheadBehaviours: kl([...o.getValidationHandler().map((t => wS.config({
                            getRoot: e => st(e.element),
                            invalidClass: "tox-control-wrap--status-invalid",
                            notify: {
                                onInvalid: (e, t) => {
                                    c.getOpt(e).each((e => {
                                        kt(e.element, "title", r.translate(t))
                                    }))
                                }
                            },
                            validator: {
                                validate: o => {
                                    const n = mu.getValue(o);
                                    return ZO((o => {
                                        t({
                                            type: e.filetype,
                                            url: n.value
                                        }, (e => {
                                            if ("invalid" === e.status) {
                                                const t = rn.error(e.message);
                                                o(t)
                                            } else {
                                                const t = rn.value(e.message);
                                                o(t)
                                            }
                                        }))
                                    }))
                                },
                                validateOnLoad: !1
                            }
                        }))).toArray(), Fm.config({
                            disabled: () => !e.enabled || r.isDisabled()
                        }), Jw.config({}), Kp("urlinput-events", [Us(Zr(), (t => {
                            const o = $a(t.element),
                                n = o.trim();
                            n !== o && qa(t.element, n), "file" === e.filetype && Is(t, nS, {
                                name: e.name
                            })
                        })), Us(Qr(), (t => {
                            Is(t, nS, {
                                name: e.name
                            }), s(t)
                        })), Us(cs(), (t => {
                            Is(t, nS, {
                                name: e.name
                            }), s(t)
                        }))])]),
                        eventOrder: {
                            [Zr()]: ["streaming", "urlinput-events", "invalidating"]
                        },
                        model: {
                            getDisplayText: e => e.value,
                            selectsOver: !1,
                            populateFromBrowse: !1
                        },
                        markers: {
                            openClass: "tox-textfield--popup-open"
                        },
                        lazySink: t.shared.getSink,
                        parts: {
                            menu: Eb(0, 0, "normal")
                        },
                        onExecute: (e, t, o) => {
                            Is(t, iS, {})
                        },
                        onItemExecute: (t, o, n, r) => {
                            s(t), Is(t, nS, {
                                name: e.name
                            })
                        }
                    },
                    i = Xw.parts.field({
                        ...a,
                        factory: YO
                    }),
                    l = e.label.map((e => oS(e, r))),
                    c = Uh(((e, t, o = e, n = e) => Zh(o, {
                        tag: "div",
                        classes: ["tox-icon", "tox-control-wrap__status-icon-" + e],
                        attributes: {
                            title: r.translate(n),
                            "aria-live": "polite",
                            ...t.fold((() => ({})), (e => ({
                                id: e
                            })))
                        }
                    }, r.icons))("invalid", A.some(h_), "warning")),
                    d = Uh({
                        dom: {
                            tag: "div",
                            classes: ["tox-control-wrap__status-icon-wrap"]
                        },
                        components: [c.asSpec()]
                    }),
                    u = o.getUrlPicker(e.filetype),
                    m = la("browser.url.event"),
                    g = Uh({
                        dom: {
                            tag: "div",
                            classes: ["tox-control-wrap"]
                        },
                        components: [i, d.asSpec()],
                        behaviours: kl([Fm.config({
                            disabled: () => !e.enabled || r.isDisabled()
                        })])
                    }),
                    p = Uh(n_({
                        name: e.name,
                        icon: A.some("browse"),
                        text: e.label.getOr(""),
                        enabled: e.enabled,
                        primary: !1,
                        buttonType: A.none(),
                        borderless: !0
                    }, (e => Fs(e, m)), r, [], ["tox-browse-url"]));
                return Xw.sketch({
                    dom: tS([]),
                    components: l.toArray().concat([{
                        dom: {
                            tag: "div",
                            classes: ["tox-form__controls-h-stack"]
                        },
                        components: q([
                            [g.asSpec()], u.map((() => p.asSpec())).toArray()
                        ])
                    }]),
                    fieldBehaviours: kl([Fm.config({
                        disabled: () => !e.enabled || r.isDisabled(),
                        onDisabled: e => {
                            Xw.getField(e).each(Fm.disable), p.getOpt(e).each(Fm.disable)
                        },
                        onEnabled: e => {
                            Xw.getField(e).each(Fm.enable), p.getOpt(e).each(Fm.enable)
                        }
                    }), by(), Kp("url-input-events", [Us(m, (t => {
                        ym.getCurrent(t).each((o => {
                            const n = mu.getValue(o),
                                r = {
                                    fieldname: e.name,
                                    ...n
                                };
                            u.each((n => {
                                n(r).get((n => {
                                    mu.setValue(o, n), Is(t, nS, {
                                        name: e.name
                                    })
                                }))
                            }))
                        }))
                    }))])])
                })
            })(e, t, t.urlinput, o))),
            customeditor: v_((e => {
                const t = Ql(),
                    o = Uh({
                        dom: {
                            tag: e.tag
                        }
                    }),
                    n = Ql();
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-custom-editor"]
                    },
                    behaviours: kl([Kp("custom-editor-events", [Ys((r => {
                        o.getOpt(r).each((o => {
                            ((e => ve(e, "init"))(e) ? e.init(o.element.dom) : AC.load(e.scriptId, e.scriptUrl).then((t => t(o.element.dom, e.settings)))).then((e => {
                                n.on((t => {
                                    e.setValue(t)
                                })), n.clear(), t.set(e)
                            }))
                        }))
                    }))]), _C(A.none(), (() => t.get().fold((() => n.get().getOr("")), (e => e.getValue()))), ((e, o) => {
                        t.get().fold((() => n.set(o)), (e => e.setValue(o)))
                    })), yC()]),
                    components: [o.asSpec()]
                }
            })),
            htmlpanel: v_((e => "presentation" === e.presets ? jw.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-form__group"],
                    innerHtml: e.html
                }
            }) : jw.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-form__group"],
                    innerHtml: e.html,
                    attributes: {
                        role: "document"
                    }
                },
                containerBehaviours: kl([Jw.config({}), eh.config({})])
            }))),
            imagepreview: v_(((e, t, o) => ((e, t) => {
                const o = Er(t.getOr({
                        url: ""
                    })),
                    n = Uh({
                        dom: {
                            tag: "img",
                            classes: ["tox-imagepreview__image"],
                            attributes: t.map((e => ({
                                src: e.url
                            }))).getOr({})
                        }
                    }),
                    r = Uh({
                        dom: {
                            tag: "div",
                            classes: ["tox-imagepreview__container"],
                            attributes: {
                                role: "presentation"
                            }
                        },
                        components: [n.asSpec()]
                    }),
                    s = {};
                e.height.each((e => s.height = e));
                const a = t.map((e => ({
                    url: e.url,
                    zoom: A.from(e.zoom),
                    cachedWidth: A.from(e.cachedWidth),
                    cachedHeight: A.from(e.cachedHeight)
                })));
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-imagepreview"],
                        styles: s,
                        attributes: {
                            role: "presentation"
                        }
                    },
                    components: [r.asSpec()],
                    behaviours: kl([yC(), _C(a, (() => o.get()), ((e, t) => {
                        const s = {
                            url: t.url
                        };
                        t.zoom.each((e => s.zoom = e)), t.cachedWidth.each((e => s.cachedWidth = e)), t.cachedHeight.each((e => s.cachedHeight = e)), o.set(s);
                        const a = () => {
                            const {
                                cachedWidth: t,
                                cachedHeight: o,
                                zoom: n
                            } = s;
                            if (!u(t) && !u(o)) {
                                if (u(n)) {
                                    const n = ((e, t, o) => {
                                        const n = Jt(e),
                                            r = Wt(e);
                                        return Math.min(n / t, r / o, 1)
                                    })(e.element, t, o);
                                    s.zoom = n
                                }
                                const a = ((e, t, o, n, r) => {
                                    const s = o * r,
                                        a = n * r,
                                        i = Math.max(0, e / 2 - s / 2),
                                        l = Math.max(0, t / 2 - a / 2);
                                    return {
                                        left: i.toString() + "px",
                                        top: l.toString() + "px",
                                        width: s.toString() + "px",
                                        height: a.toString() + "px"
                                    }
                                })(Jt(e.element), Wt(e.element), t, o, s.zoom);
                                r.getOpt(e).each((e => {
                                    Bt(e.element, a)
                                }))
                            }
                        };
                        n.getOpt(e).each((o => {
                            const n = o.element;
                            var r;
                            t.url !== Ot(n, "src") && (kt(n, "src", t.url), Pa(e.element, "tox-imagepreview__loaded")), a(), (r = n, new Promise(((e, t) => {
                                const o = () => {
                                        s(), e(r)
                                    },
                                    n = [tc(r, "load", o), tc(r, "error", (() => {
                                        s(), t("Unable to load data from image: " + r.dom.src)
                                    }))],
                                    s = () => L(n, (e => e.unbind()));
                                r.dom.complete && o()
                            }))).then((t => {
                                e.getSystem().isConnected() && (La(e.element, "tox-imagepreview__loaded"), s.cachedWidth = t.dom.naturalWidth, s.cachedHeight = t.dom.naturalHeight, a())
                            }))
                        }))
                    }))])
                }
            })(e, o))),
            table: v_(((e, t) => ((e, t) => {
                const o = e => ({
                    dom: {
                        tag: "td",
                        innerHtml: t.translate(e)
                    }
                });
                return {
                    dom: {
                        tag: "table",
                        classes: ["tox-dialog__table"]
                    },
                    components: [(r = e.header, {
                        dom: {
                            tag: "thead"
                        },
                        components: [{
                            dom: {
                                tag: "tr"
                            },
                            components: H(r, (e => ({
                                dom: {
                                    tag: "th",
                                    innerHtml: t.translate(e)
                                }
                            })))
                        }]
                    }), (n = e.cells, {
                        dom: {
                            tag: "tbody"
                        },
                        components: H(n, (e => ({
                            dom: {
                                tag: "tr"
                            },
                            components: H(e, o)
                        })))
                    })],
                    behaviours: kl([Jw.config({}), eh.config({})])
                };
                var n, r
            })(e, t.shared.providers))),
            tree: v_(((e, t) => ((e, t) => {
                const o = e.onLeafAction.getOr(b),
                    n = la("tree-id");
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-tree"],
                        attributes: {
                            role: "tree"
                        }
                    },
                    components: e.items.map((e => "leaf" === e.type ? FO({
                        leaf: e,
                        onLeafAction: o,
                        visible: !0,
                        treeId: n,
                        backstage: t
                    }) : VO({
                        directory: e,
                        onLeafAction: o,
                        labelTabstopping: !0,
                        treeId: n,
                        backstage: t
                    }))),
                    behaviours: kl([Hp.config({
                        mode: "flow",
                        selector: ".tox-tree--leaf__label--visible, .tox-tree--directory__label--visible",
                        cycles: !1
                    })])
                }
            })(e, t))),
            panel: v_(((e, t) => ((e, t) => ({
                dom: {
                    tag: "div",
                    classes: e.classes
                },
                components: H(e.items, t.shared.interpreter)
            }))(e, t)))
        },
        x_ = {
            field: (e, t) => t,
            record: x([])
        },
        w_ = (e, t, o, n) => {
            const r = fn(n, {
                shared: {
                    interpreter: t => S_(e, t, o, r)
                }
            });
            return S_(e, t, o, r)
        },
        S_ = (e, t, o, n) => be(y_, t.type).fold((() => (console.error(`Unknown factory type "${t.type}", defaulting to container: `, t), t)), (r => r(e, t, o, n))),
        k_ = (e, t, o) => S_(x_, e, t, o),
        C_ = "layout-inset",
        O_ = e => e.x,
        __ = (e, t) => e.x + e.width / 2 - t.width / 2,
        T_ = (e, t) => e.x + e.width - t.width,
        E_ = e => e.y,
        A_ = (e, t) => e.y + e.height - t.height,
        M_ = (e, t) => e.y + e.height / 2 - t.height / 2,
        D_ = (e, t, o) => zi(T_(e, t), A_(e, t), o.insetSouthwest(), Wi(), "southwest", Yi(e, {
            right: 0,
            bottom: 3
        }), C_),
        B_ = (e, t, o) => zi(O_(e), A_(e, t), o.insetSoutheast(), Ui(), "southeast", Yi(e, {
            left: 1,
            bottom: 3
        }), C_),
        F_ = (e, t, o) => zi(T_(e, t), E_(e), o.insetNorthwest(), Pi(), "northwest", Yi(e, {
            right: 0,
            top: 2
        }), C_),
        I_ = (e, t, o) => zi(O_(e), E_(e), o.insetNortheast(), Li(), "northeast", Yi(e, {
            left: 1,
            top: 2
        }), C_),
        R_ = (e, t, o) => zi(__(e, t), E_(e), o.insetNorth(), ji(), "north", Yi(e, {
            top: 2
        }), C_),
        N_ = (e, t, o) => zi(__(e, t), A_(e, t), o.insetSouth(), Gi(), "south", Yi(e, {
            bottom: 3
        }), C_),
        V_ = (e, t, o) => zi(T_(e, t), M_(e, t), o.insetEast(), qi(), "east", Yi(e, {
            right: 0
        }), C_),
        z_ = (e, t, o) => zi(O_(e), M_(e, t), o.insetWest(), $i(), "west", Yi(e, {
            left: 1
        }), C_),
        H_ = e => {
            switch (e) {
                case "north":
                    return R_;
                case "northeast":
                    return I_;
                case "northwest":
                    return F_;
                case "south":
                    return N_;
                case "southeast":
                    return B_;
                case "southwest":
                    return D_;
                case "east":
                    return V_;
                case "west":
                    return z_
            }
        },
        L_ = (e, t, o, n, r) => Xl(n).map(H_).getOr(R_)(e, t, o, n, r),
        P_ = e => {
            switch (e) {
                case "north":
                    return N_;
                case "northeast":
                    return B_;
                case "northwest":
                    return D_;
                case "south":
                    return R_;
                case "southeast":
                    return I_;
                case "southwest":
                    return F_;
                case "east":
                    return z_;
                case "west":
                    return V_
            }
        },
        U_ = (e, t, o, n, r) => Xl(n).map(P_).getOr(R_)(e, t, o, n, r),
        W_ = {
            valignCentre: [],
            alignCentre: [],
            alignLeft: [],
            alignRight: [],
            right: [],
            left: [],
            bottom: [],
            top: []
        },
        j_ = (e, t, o) => {
            const n = {
                maxHeightFunction: cc()
            };
            return () => o() ? {
                type: "node",
                root: ft(ht(e())),
                node: A.from(e()),
                bubble: gc(12, 12, W_),
                layouts: {
                    onRtl: () => [I_],
                    onLtr: () => [F_]
                },
                overrides: n
            } : {
                type: "hotspot",
                hotspot: t(),
                bubble: gc(-12, 12, W_),
                layouts: {
                    onRtl: () => [rl, sl, cl],
                    onLtr: () => [sl, rl, cl]
                },
                overrides: n
            }
        },
        G_ = (e, t, o) => () => o() ? {
            type: "node",
            root: ft(ht(e())),
            node: A.from(e()),
            layouts: {
                onRtl: () => [R_],
                onLtr: () => [R_]
            }
        } : {
            type: "hotspot",
            hotspot: t(),
            layouts: {
                onRtl: () => [cl],
                onLtr: () => [cl]
            }
        },
        $_ = (e, t) => () => ({
            type: "selection",
            root: t(),
            getSelection: () => {
                const t = e.selection.getRng();
                return A.some(Lc.range(Ve(t.startContainer), t.startOffset, Ve(t.endContainer), t.endOffset))
            }
        }),
        q_ = e => t => ({
            type: "node",
            root: e(),
            node: t
        }),
        X_ = (e, t, o) => {
            const n = tb(e),
                r = () => Ve(e.getBody()),
                s = () => Ve(e.getContentAreaContainer()),
                a = () => n || !o();
            return {
                inlineDialog: j_(s, t, a),
                banner: G_(s, t, a),
                cursor: $_(e, r),
                node: q_(r)
            }
        },
        K_ = e => (t, o) => {
            Lx(e)(t, o)
        },
        Y_ = e => () => Tx(e),
        J_ = e => t => Ex(e, t),
        Z_ = e => t => _x(e, t),
        Q_ = e => () => zf(e),
        eT = e => ye(e, "items"),
        tT = e => ye(e, "format"),
        oT = [{
            title: "Headings",
            items: [{
                title: "Heading 1",
                format: "h1"
            }, {
                title: "Heading 2",
                format: "h2"
            }, {
                title: "Heading 3",
                format: "h3"
            }, {
                title: "Heading 4",
                format: "h4"
            }, {
                title: "Heading 5",
                format: "h5"
            }, {
                title: "Heading 6",
                format: "h6"
            }]
        }, {
            title: "Inline",
            items: [{
                title: "Bold",
                format: "bold"
            }, {
                title: "Italic",
                format: "italic"
            }, {
                title: "Underline",
                format: "underline"
            }, {
                title: "Strikethrough",
                format: "strikethrough"
            }, {
                title: "Superscript",
                format: "superscript"
            }, {
                title: "Subscript",
                format: "subscript"
            }, {
                title: "Code",
                format: "code"
            }]
        }, {
            title: "Blocks",
            items: [{
                title: "Paragraph",
                format: "p"
            }, {
                title: "Blockquote",
                format: "blockquote"
            }, {
                title: "Div",
                format: "div"
            }, {
                title: "Pre",
                format: "pre"
            }]
        }, {
            title: "Align",
            items: [{
                title: "Left",
                format: "alignleft"
            }, {
                title: "Center",
                format: "aligncenter"
            }, {
                title: "Right",
                format: "alignright"
            }, {
                title: "Justify",
                format: "alignjustify"
            }]
        }],
        nT = e => j(e, ((e, t) => {
            if (ve(t, "items")) {
                const o = nT(t.items);
                return {
                    customFormats: e.customFormats.concat(o.customFormats),
                    formats: e.formats.concat([{
                        title: t.title,
                        items: o.formats
                    }])
                }
            }
            if (ve(t, "inline") || (e => ve(e, "block"))(t) || (e => ve(e, "selector"))(t)) {
                const o = `custom-${s(t.name)?t.name:t.title.toLowerCase()}`;
                return {
                    customFormats: e.customFormats.concat([{
                        name: o,
                        format: t
                    }]),
                    formats: e.formats.concat([{
                        title: t.title,
                        format: o,
                        icon: t.icon
                    }])
                }
            }
            return {
                ...e,
                formats: e.formats.concat(t)
            }
        }), {
            customFormats: [],
            formats: []
        }),
        rT = e => bf(e).map((t => {
            const o = ((e, t) => {
                const o = nT(t),
                    n = t => {
                        L(t, (t => {
                            e.formatter.has(t.name) || e.formatter.register(t.name, t.format)
                        }))
                    };
                return e.formatter ? n(o.customFormats) : e.on("init", (() => {
                    n(o.customFormats)
                })), o.formats
            })(e, t);
            return vf(e) ? oT.concat(o) : o
        })).getOr(oT),
        sT = (e, t, o) => ({
            ...e,
            type: "formatter",
            isSelected: t(e.format),
            getStylePreview: o(e.format)
        }),
        aT = (e, t, o, n) => {
            const r = t => H(t, (t => eT(t) ? (e => {
                const t = r(e.items);
                return {
                    ...e,
                    type: "submenu",
                    getStyleItems: x(t)
                }
            })(t) : tT(t) ? (e => sT(e, o, n))(t) : (e => {
                const t = ae(e);
                return 1 === t.length && R(t, "title")
            })(t) ? {
                ...t,
                type: "separator"
            } : (t => {
                const r = s(t.name) ? t.name : la(t.title),
                    a = `custom-${r}`,
                    i = {
                        ...t,
                        type: "formatter",
                        format: a,
                        isSelected: o(a),
                        getStylePreview: n(a)
                    };
                return e.formatter.register(r, i), i
            })(t)));
            return r(t)
        },
        iT = MC.trim,
        lT = e => t => {
            if ((e => g(e) && 1 === e.nodeType)(t)) {
                if (t.contentEditable === e) return !0;
                if (t.getAttribute("data-mce-contenteditable") === e) return !0
            }
            return !1
        },
        cT = lT("true"),
        dT = lT("false"),
        uT = (e, t, o, n, r) => ({
            type: e,
            title: t,
            url: o,
            level: n,
            attach: r
        }),
        mT = e => e.innerText || e.textContent,
        gT = e => (e => e && "A" === e.nodeName && void 0 !== (e.id || e.name))(e) && hT(e),
        pT = e => e && /^(H[1-6])$/.test(e.nodeName),
        hT = e => (e => {
            let t = e;
            for (; t = t.parentNode;) {
                const e = t.contentEditable;
                if (e && "inherit" !== e) return cT(t)
            }
            return !1
        })(e) && !dT(e),
        fT = e => pT(e) && hT(e),
        bT = e => {
            var t;
            const o = (e => e.id ? e.id : la("h"))(e);
            return uT("header", null !== (t = mT(e)) && void 0 !== t ? t : "", "#" + o, (e => pT(e) ? parseInt(e.nodeName.substr(1), 10) : 0)(e), (() => {
                e.id = o
            }))
        },
        vT = e => {
            const t = e.id || e.name,
                o = mT(e);
            return uT("anchor", o || "#" + t, "#" + t, 0, b)
        },
        yT = e => iT(e.title).length > 0,
        xT = e => {
            const t = (e => {
                const t = H(qc(Ve(e), "h1,h2,h3,h4,h5,h6,a:not([href])"), (e => e.dom));
                return t
            })(e);
            return U((e => H(U(e, fT), bT))(t).concat((e => H(U(e, gT), vT))(t)), yT)
        },
        wT = "tinymce-url-history",
        ST = e => s(e) && /^https?/.test(e),
        kT = e => a(e) && he(e, (e => {
            return !(l(t = e) && t.length <= 5 && K(t, ST));
            var t
        })).isNone(),
        CT = () => {
            const e = ux.getItem(wT);
            if (null === e) return {};
            let t;
            try {
                t = JSON.parse(e)
            } catch (e) {
                if (e instanceof SyntaxError) return console.log("Local storage " + wT + " was not valid JSON", e), {};
                throw e
            }
            return kT(t) ? t : (console.log("Local storage " + wT + " was not valid format", t), {})
        },
        OT = e => {
            const t = CT();
            return be(t, e).getOr([])
        },
        _T = (e, t) => {
            if (!ST(e)) return;
            const o = CT(),
                n = be(o, t).getOr([]),
                r = U(n, (t => t !== e));
            o[t] = [e].concat(r).slice(0, 5), (e => {
                if (!kT(e)) throw new Error("Bad format for history:\n" + JSON.stringify(e));
                ux.setItem(wT, JSON.stringify(e))
            })(o)
        },
        TT = e => !!e,
        ET = e => ce(MC.makeMap(e, /[, ]/), TT),
        AT = e => A.from(Df(e)),
        MT = e => A.from(e).filter(s).getOrUndefined(),
        DT = e => ({
            getHistory: OT,
            addToHistory: _T,
            getLinkInformation: () => (e => Rf(e) ? A.some({
                targets: xT(e.getBody()),
                anchorTop: MT(Nf(e)),
                anchorBottom: MT(Vf(e))
            }) : A.none())(e),
            getValidationHandler: () => (e => A.from(Bf(e)))(e),
            getUrlPicker: t => ((e, t) => ((e, t) => {
                const o = (e => {
                    const t = A.from(If(e)).filter(TT).map(ET);
                    return AT(e).fold(T, (e => t.fold(E, (e => ae(e).length > 0 && e))))
                })(e);
                return d(o) ? o ? AT(e) : A.none() : o[t] ? AT(e) : A.none()
            })(e, t).map((o => n => sw((r => {
                const i = {
                    filetype: t,
                    fieldname: n.fieldname,
                    ...A.from(n.meta).getOr({})
                };
                o.call(e, ((e, t) => {
                    if (!s(e)) throw new Error("Expected value to be string");
                    if (void 0 !== t && !a(t)) throw new Error("Expected meta to be a object");
                    r({
                        value: e,
                        meta: t
                    })
                }), n.value, i)
            })))))(e, t)
        }),
        BT = lm,
        FT = Gu,
        IT = x([yr("shell", !1), or("makeItem"), yr("setupItem", b), fu("listBehaviours", [Xp])]),
        RT = Uu({
            name: "items",
            overrides: () => ({
                behaviours: kl([Xp.config({})])
            })
        }),
        NT = x([RT]),
        VT = hm({
            name: x("CustomList")(),
            configFields: IT(),
            partFields: NT(),
            factory: (e, t, o, n) => {
                const r = e.shell ? {
                    behaviours: [Xp.config({})],
                    components: []
                } : {
                    behaviours: [],
                    components: t
                };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: r.components,
                    behaviours: hu(e.listBehaviours, r.behaviours),
                    apis: {
                        setItems: (t, o) => {
                            var n;
                            (n = t, e.shell ? A.some(n) : em(n, e, "items")).fold((() => {
                                throw console.error("Custom List was defined to not be a shell, but no item container was specified in components"), new Error("Custom List was defined to not be a shell, but no item container was specified in components")
                            }), (n => {
                                const r = Xp.contents(n),
                                    s = o.length,
                                    a = s - r.length,
                                    i = a > 0 ? V(a, (() => e.makeItem())) : [],
                                    l = r.slice(s);
                                L(l, (e => Xp.remove(n, e))), L(i, (e => Xp.append(n, e)));
                                const c = Xp.contents(n);
                                L(c, ((n, r) => {
                                    e.setupItem(t, n, o[r], r)
                                }))
                            }))
                        }
                    }
                }
            },
            apis: {
                setItems: (e, t, o) => {
                    e.setItems(t, o)
                }
            }
        }),
        zT = x([or("dom"), yr("shell", !0), gu("toolbarBehaviours", [Xp])]),
        HT = x([Uu({
            name: "groups",
            overrides: () => ({
                behaviours: kl([Xp.config({})])
            })
        })]),
        LT = hm({
            name: "Toolbar",
            configFields: zT(),
            partFields: HT(),
            factory: (e, t, o, n) => {
                const r = e.shell ? {
                    behaviours: [Xp.config({})],
                    components: []
                } : {
                    behaviours: [],
                    components: t
                };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: r.components,
                    behaviours: hu(e.toolbarBehaviours, r.behaviours),
                    apis: {
                        setGroups: (t, o) => {
                            var n;
                            (n = t, e.shell ? A.some(n) : em(n, e, "groups")).fold((() => {
                                throw console.error("Toolbar was defined to not be a shell, but no groups container was specified in components"), new Error("Toolbar was defined to not be a shell, but no groups container was specified in components")
                            }), (e => {
                                Xp.set(e, o)
                            }))
                        }
                    },
                    domModification: {
                        attributes: {
                            role: "group"
                        }
                    }
                }
            },
            apis: {
                setGroups: (e, t, o) => {
                    e.setGroups(t, o)
                }
            }
        }),
        PT = b,
        UT = T,
        WT = x([]);
    var jT, GT = Object.freeze({
        __proto__: null,
        setup: PT,
        isDocked: UT,
        getBehaviours: WT
    });
    const $T = e => (xe(Nt(e, "position"), "fixed") ? A.none() : at(e)).orThunk((() => {
            const t = Re("span");
            return rt(e).bind((e => {
                zo(e, t);
                const o = at(t);
                return Po(t), o
            }))
        })),
        qT = e => $T(e).map(Xt).getOrThunk((() => $t(0, 0))),
        XT = (e, t) => {
            const o = e.element;
            La(o, t.transitionClass), Pa(o, t.fadeOutClass), La(o, t.fadeInClass), t.onShow(e)
        },
        KT = (e, t) => {
            const o = e.element;
            La(o, t.transitionClass), Pa(o, t.fadeInClass), La(o, t.fadeOutClass), t.onHide(e)
        },
        YT = (e, t) => e.y >= t.y,
        JT = (e, t) => e.bottom <= t.bottom,
        ZT = (e, t, o) => ({
            location: "top",
            leftX: t,
            topY: o.bounds.y - e.y
        }),
        QT = (e, t, o) => ({
            location: "bottom",
            leftX: t,
            bottomY: e.bottom - o.bounds.bottom
        }),
        eE = e => e.box.x - e.win.x,
        tE = (e, t, o) => o.getInitialPos().map((o => {
            const n = ((e, t) => {
                const o = t.optScrollEnv.fold(x(e.bounds.y), (t => t.scrollElmTop + (e.bounds.y - t.currentScrollTop)));
                return $t(e.bounds.x, o)
            })(o, t);
            return {
                box: Yo(n.left, n.top, Jt(e), Wt(e)),
                location: o.location
            }
        })),
        oE = (e, t, o, n, r) => {
            const s = ((e, t) => {
                    const o = t.optScrollEnv.fold(x(e.y), (t => e.y + t.currentScrollTop - t.scrollElmTop));
                    return $t(e.x, o)
                })(t, o),
                a = Yo(s.left, s.top, t.width, t.height);
            n.setInitialPos({
                style: Vt(e),
                position: It(e, "position") || "static",
                bounds: a,
                location: r.location
            })
        },
        nE = (e, t, o) => o.getInitialPos().bind((n => {
            var r;
            switch (o.clearInitialPos(), n.position) {
                case "static":
                    return A.some({
                        morph: "static"
                    });
                case "absolute":
                    const o = $T(e).getOr(xt()),
                        s = Jo(o),
                        a = null !== (r = o.dom.scrollTop) && void 0 !== r ? r : 0;
                    return A.some({
                        morph: "absolute",
                        positionCss: Vl("absolute", be(n.style, "left").map((e => t.x - s.x)), be(n.style, "top").map((e => t.y - s.y + a)), be(n.style, "right").map((e => s.right - t.right)), be(n.style, "bottom").map((e => s.bottom - t.bottom)))
                    });
                default:
                    return A.none()
            }
        })),
        rE = e => {
            switch (e.location) {
                case "top":
                    return A.some({
                        morph: "fixed",
                        positionCss: Vl("fixed", A.some(e.leftX), A.some(e.topY), A.none(), A.none())
                    });
                case "bottom":
                    return A.some({
                        morph: "fixed",
                        positionCss: Vl("fixed", A.some(e.leftX), A.none(), A.none(), A.some(e.bottomY))
                    });
                default:
                    return A.none()
            }
        },
        sE = (e, t, o) => {
            const n = e.element;
            return xe(Nt(n, "position"), "fixed") ? ((e, t, o) => ((e, t, o) => tE(e, t, o).filter((({
                box: e
            }) => ((e, t, o) => K(e, (e => {
                switch (e) {
                    case "bottom":
                        return JT(t, o.bounds);
                    case "top":
                        return YT(t, o.bounds)
                }
            })))(o.getModes(), e, t))).bind((({
                box: t
            }) => nE(e, t, o))))(e, t, o).orThunk((() => t.optScrollEnv.bind((n => tE(e, t, o))).bind((({
                box: e,
                location: o
            }) => {
                const n = en(),
                    r = eE({
                        win: n,
                        box: e
                    }),
                    s = "top" === o ? ZT(n, r, t) : QT(n, r, t);
                return rE(s)
            })))))(n, t, o) : ((e, t, o) => {
                const n = Jo(e),
                    r = en(),
                    s = ((e, t, o) => {
                        const n = t.win,
                            r = t.box,
                            s = eE(t);
                        return se(e, (e => {
                            switch (e) {
                                case "bottom":
                                    return JT(r, o.bounds) ? A.none() : A.some(QT(n, s, o));
                                case "top":
                                    return YT(r, o.bounds) ? A.none() : A.some(ZT(n, s, o));
                                default:
                                    return A.none()
                            }
                        })).getOr({
                            location: "no-dock"
                        })
                    })(o.getModes(), {
                        win: r,
                        box: n
                    }, t);
                return "top" === s.location || "bottom" === s.location ? (oE(e, n, t, o, s), rE(s)) : A.none()
            })(n, t, o)
        },
        aE = (e, t, o) => {
            o.setDocked(!1), L(["left", "right", "top", "bottom", "position"], (t => Ht(e.element, t))), t.onUndocked(e)
        },
        iE = (e, t, o, n) => {
            const r = "fixed" === n.position;
            o.setDocked(r), zl(e.element, n), (r ? t.onDocked : t.onUndocked)(e)
        },
        lE = (e, t, o, n, r = !1) => {
            t.contextual.each((t => {
                t.lazyContext(e).each((s => {
                    const a = ((e, t) => e.y < t.bottom && e.bottom > t.y)(s, n.bounds);
                    a !== o.isVisible() && (o.setVisible(a), r && !a ? (Wa(e.element, [t.fadeOutClass]), t.onHide(e)) : (a ? XT : KT)(e, t))
                }))
            }))
        },
        cE = (e, t, o, n, r) => {
            lE(e, t, o, n, !0), iE(e, t, o, r.positionCss)
        },
        dE = (e, t, o) => {
            e.getSystem().isConnected() && ((e, t, o) => {
                const n = t.lazyViewport(e);
                lE(e, t, o, n), sE(e, n, o).each((r => {
                    ((e, t, o, n, r) => {
                        switch (r.morph) {
                            case "static":
                                return aE(e, t, o);
                            case "absolute":
                                return iE(e, t, o, r.positionCss);
                            case "fixed":
                                cE(e, t, o, n, r)
                        }
                    })(e, t, o, n, r)
                }))
            })(e, t, o)
        },
        uE = (e, t, o) => {
            o.isDocked() && ((e, t, o) => {
                const n = e.element;
                o.setDocked(!1);
                const r = t.lazyViewport(e);
                ((e, t, o) => {
                    const n = e.element;
                    return tE(n, t, o).bind((({
                        box: e
                    }) => nE(n, e, o)))
                })(e, r, o).each((n => {
                    switch (n.morph) {
                        case "static":
                            aE(e, t, o);
                            break;
                        case "absolute":
                            iE(e, t, o, n.positionCss)
                    }
                })), o.setVisible(!0), t.contextual.each((t => {
                    ja(n, [t.fadeInClass, t.fadeOutClass, t.transitionClass]), t.onShow(e)
                })), dE(e, t, o)
            })(e, t, o)
        },
        mE = e => (t, o, n) => {
            const r = o.lazyViewport(t);
            ((e, t, o, n) => {
                const r = Jo(e),
                    s = en(),
                    a = n(s, eE({
                        win: s,
                        box: r
                    }), t);
                return "bottom" === a.location || "top" === a.location ? (((e, t, o, n, r) => {
                    n.getInitialPos().fold((() => oE(e, t, o, n, r)), (() => b))
                })(e, r, t, o, a), rE(a)) : A.none()
            })(t.element, r, n, e).each((e => {
                cE(t, o, n, r, e)
            }))
        },
        gE = mE(ZT),
        pE = mE(QT);
    var hE = Object.freeze({
            __proto__: null,
            refresh: dE,
            reset: uE,
            isDocked: (e, t, o) => o.isDocked(),
            getModes: (e, t, o) => o.getModes(),
            setModes: (e, t, o, n) => o.setModes(n),
            forceDockToTop: gE,
            forceDockToBottom: pE
        }),
        fE = Object.freeze({
            __proto__: null,
            events: (e, t) => Hs([Ks(os(), ((o, n) => {
                e.contextual.each((e => {
                    Ua(o.element, e.transitionClass) && (ja(o.element, [e.transitionClass, e.fadeInClass]), (t.isVisible() ? e.onShown : e.onHidden)(o)), n.stop()
                }))
            })), Us(xs(), ((o, n) => {
                dE(o, e, t)
            })), Us(Es(), ((o, n) => {
                dE(o, e, t)
            })), Us(ws(), ((o, n) => {
                uE(o, e, t)
            }))])
        }),
        bE = [vr("contextual", [sr("fadeInClass"), sr("fadeOutClass"), sr("transitionClass"), ir("lazyContext"), Di("onShow"), Di("onShown"), Di("onHide"), Di("onHidden")]), Or("lazyViewport", (() => ({
            bounds: en(),
            optScrollEnv: A.none()
        }))), _r("modes", ["top", "bottom"], Hn), Di("onDocked"), Di("onUndocked")];
    const vE = Ol({
            fields: bE,
            name: "docking",
            active: fE,
            apis: hE,
            state: Object.freeze({
                __proto__: null,
                init: e => {
                    const t = Er(!1),
                        o = Er(!0),
                        n = Ql(),
                        r = Er(e.modes);
                    return _a({
                        isDocked: t.get,
                        setDocked: t.set,
                        getInitialPos: n.get,
                        setInitialPos: n.set,
                        clearInitialPos: n.clear,
                        isVisible: o.get,
                        setVisible: o.set,
                        getModes: r.get,
                        setModes: r.set,
                        readState: () => `docked:  ${t.get()}, visible: ${o.get()}, modes: ${r.get().join(",")}`
                    })
                }
            })
        }),
        yE = x(la("toolbar-height-change")),
        xE = {
            fadeInClass: "tox-editor-dock-fadein",
            fadeOutClass: "tox-editor-dock-fadeout",
            transitionClass: "tox-editor-dock-transition"
        },
        wE = "tox-tinymce--toolbar-sticky-on",
        SE = "tox-tinymce--toolbar-sticky-off",
        kE = (e, t) => R(vE.getModes(e), t),
        CE = e => {
            const t = e.element;
            st(t).each((o => {
                const n = "padding-" + vE.getModes(e)[0];
                if (vE.isDocked(e)) {
                    const e = Jt(o);
                    Dt(t, "width", e + "px"), Dt(o, n, (e => jt(e) + (parseInt(It(e, "margin-top"), 10) || 0) + (parseInt(It(e, "margin-bottom"), 10) || 0))(t) + "px")
                } else Ht(t, "width"), Ht(o, n)
            }))
        },
        OE = (e, t) => {
            t ? (Pa(e, xE.fadeOutClass), Wa(e, [xE.transitionClass, xE.fadeInClass])) : (Pa(e, xE.fadeInClass), Wa(e, [xE.fadeOutClass, xE.transitionClass]))
        },
        _E = (e, t) => {
            const o = Ve(e.getContainer());
            t ? (La(o, wE), Pa(o, SE)) : (La(o, SE), Pa(o, wE))
        },
        TE = (e, t) => {
            const o = Ql(),
                n = t.getSink,
                r = e => {
                    n().each((t => e(t.element)))
                },
                s = t => {
                    e.inline || CE(t), _E(e, vE.isDocked(t)), t.getSystem().broadcastOn([Xd()], {}), n().each((e => e.getSystem().broadcastOn([Xd()], {})))
                },
                a = e.inline ? [] : [Al.config({
                    channels: {
                        [yE()]: {
                            onReceive: CE
                        }
                    }
                })];
            return [eh.config({}), vE.config({
                contextual: {
                    lazyContext: t => {
                        const o = jt(t.element),
                            n = e.inline ? e.getContentAreaContainer() : e.getContainer();
                        return A.from(n).map((n => {
                            const r = Jo(Ve(n));
                            return Bw(e, t.element).fold((() => {
                                const e = r.height - o,
                                    n = r.y + (kE(t, "top") ? 0 : o);
                                return Yo(r.x, n, r.width, e)
                            }), (e => {
                                const t = Qo(r, Fw(e));
                                return Yo(t.x, t.y, t.width, t.height - o)
                            }))
                        }))
                    },
                    onShow: () => {
                        r((e => OE(e, !0)))
                    },
                    onShown: e => {
                        r((e => ja(e, [xE.transitionClass, xE.fadeInClass]))), o.get().each((t => {
                            ((e, t) => {
                                const o = et(t);
                                Il(o).filter((e => !Ze(t, e))).filter((t => Ze(t, Ve(o.dom.body)) || Qe(e, t))).each((() => Dl(t)))
                            })(e.element, t), o.clear()
                        }))
                    },
                    onHide: e => {
                        ((e, t) => Rl(e).orThunk((() => t().toOptional().bind((e => Rl(e.element))))))(e.element, n).fold(o.clear, o.set), r((e => OE(e, !1)))
                    },
                    onHidden: () => {
                        r((e => ja(e, [xE.transitionClass])))
                    },
                    ...xE
                },
                lazyViewport: t => Bw(e, t.element).fold((() => {
                    const o = en(),
                        n = Ef(e),
                        r = o.y + (kE(t, "top") ? n : 0),
                        s = o.height - (kE(t, "bottom") ? n : 0);
                    return {
                        bounds: Yo(o.x, r, o.width, s),
                        optScrollEnv: A.none()
                    }
                }), (e => ({
                    bounds: Fw(e),
                    optScrollEnv: A.some({
                        currentScrollTop: e.element.dom.scrollTop,
                        scrollElmTop: Xt(e.element).top
                    })
                }))),
                modes: [t.header.getDockingMode()],
                onDocked: s,
                onUndocked: s
            }), ...a]
        };
    var EE = Object.freeze({
        __proto__: null,
        setup: (e, t, o) => {
            e.inline || (t.header.isPositionedAtTop() || e.on("ResizeEditor", (() => {
                o().each(vE.reset)
            })), e.on("ResizeWindow ResizeEditor", (() => {
                o().each(CE)
            })), e.on("SkinLoaded", (() => {
                o().each((e => {
                    vE.isDocked(e) ? vE.reset(e) : vE.refresh(e)
                }))
            })), e.on("FullscreenStateChanged", (() => {
                o().each(vE.reset)
            }))), e.on("AfterScrollIntoView", (e => {
                o().each((t => {
                    vE.refresh(t);
                    const o = t.element;
                    Bg(o) && ((e, t) => {
                        const o = et(t),
                            n = nt(t).dom.innerHeight,
                            r = Uo(o),
                            s = Ve(e.elm),
                            a = Zo(s),
                            i = Wt(s),
                            l = a.y,
                            c = l + i,
                            d = Xt(t),
                            u = Wt(t),
                            m = d.top,
                            g = m + u,
                            p = Math.abs(m - r.top) < 2,
                            h = Math.abs(g - (r.top + n)) < 2;
                        if (p && l < g) Wo(r.left, l - u, o);
                        else if (h && c > m) {
                            const e = l - n + i + u;
                            Wo(r.left, e, o)
                        }
                    })(e, o)
                }))
            })), e.on("PostRender", (() => {
                _E(e, !1)
            }))
        },
        isDocked: e => e().map(vE.isDocked).getOr(!1),
        getBehaviours: TE
    });
    const AE = Dn([Yb, nr("items", Fn([Rn([Jb, dr("items", Hn)]), Hn]))].concat(_v)),
        ME = [pr("text"), pr("tooltip"), pr("icon"), xr("search", !1, Fn([Ln, Dn([pr("placeholder")])], (e => d(e) ? e ? A.some({
            placeholder: A.none()
        }) : A.none() : A.some(e)))), ir("fetch"), Or("onSetup", (() => b))],
        DE = Dn([Yb, ...ME]),
        BE = e => qn("menubutton", DE, e),
        FE = Dn([Yb, uv, dv, cv, pv, nv, iv, kr("presets", "normal", ["normal", "color", "listpreview"]), yv(1), sv, av]);
    var IE = pm({
        factory: (e, t) => {
            const o = {
                focus: Hp.focusIn,
                setMenus: (e, o) => {
                    const n = H(o, (e => {
                        const o = {
                                type: "menubutton",
                                text: e.text,
                                fetch: t => {
                                    t(e.getItems())
                                }
                            },
                            n = BE(o).mapError((e => Yn(e))).getOrDie();
                        return AO(n, "tox-mbtn", t.backstage, A.some("menuitem"))
                    }));
                    Xp.set(e, n)
                }
            };
            return {
                uid: e.uid,
                dom: e.dom,
                components: [],
                behaviours: kl([Xp.config({}), Kp("menubar-events", [Ys((t => {
                    e.onSetup(t)
                })), Us(qr(), ((e, t) => {
                    pi(e.element, ".tox-mbtn--active").each((o => {
                        hi(t.event.target, ".tox-mbtn").each((t => {
                            Ze(o, t) || e.getSystem().getByDom(o).each((o => {
                                e.getSystem().getByDom(t).each((e => {
                                    xw.expand(e), xw.close(o), eh.focus(e)
                                }))
                            }))
                        }))
                    }))
                })), Us(_s(), ((e, t) => {
                    t.event.prevFocus.bind((t => e.getSystem().getByDom(t).toOptional())).each((o => {
                        t.event.newFocus.bind((t => e.getSystem().getByDom(t).toOptional())).each((e => {
                            xw.isOpen(o) && (xw.expand(e), xw.close(o))
                        }))
                    }))
                }))]), Hp.config({
                    mode: "flow",
                    selector: ".tox-mbtn",
                    onEscape: t => (e.onEscape(t), A.some(!0))
                }), Jw.config({})]),
                apis: o,
                domModification: {
                    attributes: {
                        role: "menubar"
                    }
                }
            }
        },
        name: "silver.Menubar",
        configFields: [or("dom"), or("uid"), or("onEscape"), or("backstage"), yr("onSetup", b)],
        apis: {
            focus: (e, t) => {
                e.focus(t)
            },
            setMenus: (e, t, o) => {
                e.setMenus(t, o)
            }
        }
    });
    const RE = "container",
        NE = [gu("slotBehaviours", [])],
        VE = e => "<alloy.field." + e + ">",
        zE = (e, t) => {
            const o = t => rm(e),
                n = (t, o) => (n, r) => em(n, e, r).map((e => t(e, r))).getOr(o),
                r = (e, t) => "true" !== Ot(e.element, "aria-hidden"),
                s = n(r, !1),
                a = n(((e, t) => {
                    if (r(e)) {
                        const o = e.element;
                        Dt(o, "display", "none"), kt(o, "aria-hidden", "true"), Is(e, Ts(), {
                            name: t,
                            visible: !1
                        })
                    }
                })),
                i = (e => (t, o) => {
                    L(o, (o => e(t, o)))
                })(a),
                l = n(((e, t) => {
                    if (!r(e)) {
                        const o = e.element;
                        Ht(o, "display"), Et(o, "aria-hidden"), Is(e, Ts(), {
                            name: t,
                            visible: !0
                        })
                    }
                })),
                c = {
                    getSlotNames: o,
                    getSlot: (t, o) => em(t, e, o),
                    isShowing: s,
                    hideSlot: a,
                    hideAllSlots: e => i(e, o()),
                    showSlot: l
                };
            return {
                uid: e.uid,
                dom: e.dom,
                components: t,
                behaviours: pu(e.slotBehaviours),
                apis: c
            }
        },
        HE = ce({
            getSlotNames: (e, t) => e.getSlotNames(t),
            getSlot: (e, t, o) => e.getSlot(t, o),
            isShowing: (e, t, o) => e.isShowing(t, o),
            hideSlot: (e, t, o) => e.hideSlot(t, o),
            hideAllSlots: (e, t) => e.hideAllSlots(t),
            showSlot: (e, t, o) => e.showSlot(t, o)
        }, (e => Ca(e))),
        LE = {
            ...HE,
            sketch: e => {
                const t = (() => {
                        const e = [];
                        return {
                            slot: (t, o) => (e.push(t), Ku(RE, VE(t), o)),
                            record: x(e)
                        }
                    })(),
                    o = e(t),
                    n = t.record(),
                    r = H(n, (e => Lu({
                        name: e,
                        pname: VE(e)
                    })));
                return dm(RE, NE, r, zE, o)
            }
        },
        PE = Dn([dv, uv, Or("onShow", b), Or("onHide", b), iv]),
        UE = e => ({
            element: () => e.element.dom
        }),
        WE = (e, t) => {
            const o = H(ae(t), (e => {
                const o = t[e],
                    n = Xn((e => qn("sidebar", PE, e))(o));
                return {
                    name: e,
                    getApi: UE,
                    onSetup: n.onSetup,
                    onShow: n.onShow,
                    onHide: n.onHide
                }
            }));
            return H(o, (t => {
                const n = Er(b);
                return e.slot(t.name, {
                    dom: {
                        tag: "div",
                        classes: ["tox-sidebar__pane"]
                    },
                    behaviours: ny([Sy(t, n), ky(t, n), Us(Ts(), ((e, t) => {
                        const n = t.event,
                            r = G(o, (e => e.name === n.name));
                        r.each((t => {
                            (n.visible ? t.onShow : t.onHide)(t.getApi(e))
                        }))
                    }))])
                })
            }))
        },
        jE = e => LE.sketch((t => ({
            dom: {
                tag: "div",
                classes: ["tox-sidebar__pane-container"]
            },
            components: WE(t, e),
            slotBehaviours: ny([Ys((e => LE.hideAllSlots(e)))])
        }))),
        GE = (e, t) => {
            kt(e, "role", t)
        },
        $E = e => ym.getCurrent(e).bind((e => TO.isGrowing(e) || TO.hasGrown(e) ? ym.getCurrent(e).bind((e => G(LE.getSlotNames(e), (t => LE.isShowing(e, t))))) : A.none())),
        qE = la("FixSizeEvent"),
        XE = la("AutoSizeEvent");
    var KE = Object.freeze({
            __proto__: null,
            block: (e, t, o, n) => {
                kt(e.element, "aria-busy", !0);
                const r = t.getRoot(e).getOr(e),
                    s = kl([Hp.config({
                        mode: "special",
                        onTab: () => A.some(!0),
                        onShiftTab: () => A.some(!0)
                    }), eh.config({})]),
                    a = n(r, s),
                    i = r.getSystem().build(a);
                Xp.append(r, ai(i)), i.hasConfigured(Hp) && t.focus && Hp.focusIn(i), o.isBlocked() || t.onBlock(e), o.blockWith((() => Xp.remove(r, i)))
            },
            unblock: (e, t, o) => {
                Et(e.element, "aria-busy"), o.isBlocked() && t.onUnblock(e), o.clear()
            }
        }),
        YE = [Or("getRoot", A.none), Cr("focus", !0), Di("onBlock"), Di("onUnblock")];
    const JE = Ol({
            fields: YE,
            name: "blocking",
            apis: KE,
            state: Object.freeze({
                __proto__: null,
                init: () => {
                    const e = Jl((e => e.destroy()));
                    return _a({
                        readState: e.isSet,
                        blockWith: t => {
                            e.set({
                                destroy: t
                            })
                        },
                        clear: e.clear,
                        isBlocked: e.isSet
                    })
                }
            })
        }),
        ZE = e => {
            const t = Ie(e),
                o = it(t),
                n = (e => {
                    const t = void 0 !== e.dom.attributes ? e.dom.attributes : [];
                    return j(t, ((e, t) => "class" === t.name ? e : {
                        ...e,
                        [t.name]: t.value
                    }), {})
                })(t),
                r = (e => Array.prototype.slice.call(e.dom.classList, 0))(t),
                s = 0 === o.length ? {} : {
                    innerHtml: ea(t)
                };
            return {
                tag: Ue(t),
                classes: r,
                attributes: n,
                ...s
            }
        },
        QE = e => ym.getCurrent(e).each((e => Dl(e.element))),
        eA = (e, t, o) => {
            const n = Er(!1),
                r = Ql(),
                s = o => {
                    var r;
                    n.get() && (!(e => "focusin" === e.type)(r = o) || !(r.composed ? oe(r.composedPath()) : A.from(r.target)).map(Ve).filter(Ge).exists((e => Ua(e, "mce-pastebin")))) && (o.preventDefault(), QE(t()), e.editorManager.setActive(e))
                };
            e.inline || e.on("PreInit", (() => {
                e.dom.bind(e.getWin(), "focusin", s), e.on("BeforeExecCommand", (e => {
                    "mcefocus" === e.command.toLowerCase() && !0 !== e.value && s(e)
                }))
            }));
            const a = r => {
                r !== n.get() && (n.set(r), ((e, t, o, n) => {
                    const r = t.element;
                    if (((e, t) => {
                            const o = "tabindex",
                                n = "data-mce-tabindex";
                            A.from(e.iframeElement).map(Ve).each((e => {
                                t ? (_t(e, o).each((t => kt(e, n, t))), kt(e, o, -1)) : (Et(e, o), _t(e, n).each((t => {
                                    kt(e, o, t), Et(e, n)
                                })))
                            }))
                        })(e, o), o) JE.block(t, (e => (t, o) => ({
                        dom: {
                            tag: "div",
                            attributes: {
                                "aria-label": e.translate("Loading..."),
                                tabindex: "0"
                            },
                            classes: ["tox-throbber__busy-spinner"]
                        },
                        components: [{
                            dom: ZE('<div class="tox-spinner"><div></div><div></div><div></div></div>')
                        }]
                    }))(n)), Ht(r, "display"), Et(r, "aria-hidden"), e.hasFocus() && QE(t);
                    else {
                        const o = ym.getCurrent(t).exists((e => Fl(e.element)));
                        JE.unblock(t), Dt(r, "display", "none"), kt(r, "aria-hidden", "true"), o && e.focus()
                    }
                })(e, t(), r, o.providers), ((e, t) => {
                    e.dispatch("AfterProgressState", {
                        state: t
                    })
                })(e, r))
            };
            e.on("ProgressState", (t => {
                if (r.on(clearTimeout), h(t.time)) {
                    const o = Lh.setEditorTimeout(e, (() => a(t.state)), t.time);
                    r.set(o)
                } else a(t.state), r.clear()
            }))
        },
        tA = (e, t, o) => ({
            within: e,
            extra: t,
            withinWidth: o
        }),
        oA = (e, t, o) => {
            const n = j(e, ((e, t) => ((e, t) => {
                    const n = o(e);
                    return A.some({
                        element: e,
                        start: t,
                        finish: t + n,
                        width: n
                    })
                })(t, e.len).fold(x(e), (t => ({
                    len: t.finish,
                    list: e.list.concat([t])
                })))), {
                    len: 0,
                    list: []
                }).list,
                r = U(n, (e => e.finish <= t)),
                s = W(r, ((e, t) => e + t.width), 0);
            return {
                within: r,
                extra: n.slice(r.length),
                withinWidth: s
            }
        },
        nA = e => H(e, (e => e.element)),
        rA = (e, t) => {
            const o = H(t, (e => ai(e)));
            LT.setGroups(e, o)
        },
        sA = (e, t, o) => {
            const n = t.builtGroups.get();
            if (0 === n.length) return;
            const r = tm(e, t, "primary"),
                s = ew.getCoupled(e, "overflowGroup");
            Dt(r.element, "visibility", "hidden");
            const a = n.concat([s]),
                i = se(a, (e => Rl(e.element).bind((t => e.getSystem().getByDom(t).toOptional()))));
            o([]), rA(r, a);
            const l = ((e, t, o, n) => {
                const r = ((e, t, o) => {
                        const n = oA(t, e, o);
                        return 0 === n.extra.length ? A.some(n) : A.none()
                    })(e, t, o).getOrThunk((() => oA(t, e - o(n), o))),
                    s = r.within,
                    a = r.extra,
                    i = r.withinWidth;
                return 1 === a.length && a[0].width <= o(n) ? ((e, t, o) => {
                    const n = nA(e.concat(t));
                    return tA(n, [], o)
                })(s, a, i) : a.length >= 1 ? ((e, t, o, n) => {
                    const r = nA(e).concat([o]);
                    return tA(r, nA(t), n)
                })(s, a, n, i) : ((e, t, o) => tA(nA(e), [], o))(s, 0, i)
            })(Jt(r.element), t.builtGroups.get(), (e => Jt(e.element)), s);
            0 === l.extra.length ? (Xp.remove(r, s), o([])) : (rA(r, l.within), o(l.extra)), Ht(r.element, "visibility"), Lt(r.element), i.each(eh.focus)
        },
        aA = x([gu("splitToolbarBehaviours", [ew]), er("builtGroups", (() => Er([])))]),
        iA = x([Ai(["overflowToggledClass"]), fr("getOverflowBounds"), or("lazySink"), er("overflowGroups", (() => Er([]))), Di("onOpened"), Di("onClosed")].concat(aA())),
        lA = x([Lu({
            factory: LT,
            schema: zT(),
            name: "primary"
        }), Pu({
            schema: zT(),
            name: "overflow"
        }), Pu({
            name: "overflow-button"
        }), Pu({
            name: "overflow-group"
        })]),
        cA = x(((e, t) => {
            ((e, t) => {
                const o = Yt.max(e, t, ["margin-left", "border-left-width", "padding-left", "padding-right", "border-right-width", "margin-right"]);
                Dt(e, "max-width", o + "px")
            })(e, Math.floor(t))
        })),
        dA = x([Ai(["toggledClass"]), or("lazySink"), ir("fetch"), fr("getBounds"), vr("fireDismissalEventInstead", [yr("event", Cs())]), wc(), Di("onToggled")]),
        uA = x([Pu({
            name: "button",
            overrides: e => ({
                dom: {
                    attributes: {
                        "aria-haspopup": "true"
                    }
                },
                buttonBehaviours: kl([lh.config({
                    toggleClass: e.markers.toggledClass,
                    aria: {
                        mode: "expanded"
                    },
                    toggleOnExecute: !1,
                    onToggled: e.onToggled
                })])
            })
        }), Pu({
            factory: LT,
            schema: zT(),
            name: "toolbar",
            overrides: e => ({
                toolbarBehaviours: kl([Hp.config({
                    mode: "cyclic",
                    onEscape: t => (em(t, e, "button").each(eh.focus), A.none())
                })])
            })
        })]),
        mA = Ql(),
        gA = (e, t) => {
            const o = ew.getCoupled(e, "toolbarSandbox");
            $d.isOpen(o) ? $d.close(o) : $d.open(o, t.toolbar())
        },
        pA = (e, t, o, n) => {
            const r = o.getBounds.map((e => e())),
                s = o.lazySink(e).getOrDie();
            xd.positionWithinBounds(s, t, {
                anchor: {
                    type: "hotspot",
                    hotspot: e,
                    layouts: n,
                    overrides: {
                        maxWidthFunction: cA()
                    }
                }
            }, r)
        },
        hA = (e, t, o, n, r) => {
            LT.setGroups(t, r), pA(e, t, o, n), lh.on(e)
        },
        fA = hm({
            name: "FloatingToolbarButton",
            factory: (e, t, o, n) => ({
                ...Ph.sketch({
                    ...n.button(),
                    action: e => {
                        gA(e, n)
                    },
                    buttonBehaviours: bu({
                        dump: n.button().buttonBehaviours
                    }, [ew.config({
                        others: {
                            toolbarSandbox: t => ((e, t, o) => {
                                const n = bi();
                                return {
                                    dom: {
                                        tag: "div",
                                        attributes: {
                                            id: n.id
                                        }
                                    },
                                    behaviours: kl([Hp.config({
                                        mode: "special",
                                        onEscape: e => ($d.close(e), A.some(!0))
                                    }), $d.config({
                                        onOpen: (r, s) => {
                                            const a = mA.get().getOr(!1);
                                            o.fetch().get((r => {
                                                hA(e, s, o, t.layouts, r), n.link(e.element), a || Hp.focusIn(s)
                                            }))
                                        },
                                        onClose: () => {
                                            lh.off(e), mA.get().getOr(!1) || eh.focus(e), n.unlink(e.element)
                                        },
                                        isPartOf: (t, o, n) => vi(o, n) || vi(e, n),
                                        getAttachPoint: () => o.lazySink(e).getOrDie()
                                    }), Al.config({
                                        channels: {
                                            ...Jd({
                                                isExtraPart: T,
                                                ...o.fireDismissalEventInstead.map((e => ({
                                                    fireEventInstead: {
                                                        event: e.event
                                                    }
                                                }))).getOr({})
                                            }),
                                            ...Qd({
                                                doReposition: () => {
                                                    $d.getState(ew.getCoupled(e, "toolbarSandbox")).each((n => {
                                                        pA(e, n, o, t.layouts)
                                                    }))
                                                }
                                            })
                                        }
                                    })])
                                }
                            })(t, o, e)
                        }
                    })])
                }),
                apis: {
                    setGroups: (t, n) => {
                        $d.getState(ew.getCoupled(t, "toolbarSandbox")).each((r => {
                            hA(t, r, e, o.layouts, n)
                        }))
                    },
                    reposition: t => {
                        $d.getState(ew.getCoupled(t, "toolbarSandbox")).each((n => {
                            pA(t, n, e, o.layouts)
                        }))
                    },
                    toggle: e => {
                        gA(e, n)
                    },
                    toggleWithoutFocusing: e => {
                        ((e, t) => {
                            mA.set(!0), gA(e, t), mA.clear()
                        })(e, n)
                    },
                    getToolbar: e => $d.getState(ew.getCoupled(e, "toolbarSandbox")),
                    isOpen: e => $d.isOpen(ew.getCoupled(e, "toolbarSandbox"))
                }
            }),
            configFields: dA(),
            partFields: uA(),
            apis: {
                setGroups: (e, t, o) => {
                    e.setGroups(t, o)
                },
                reposition: (e, t) => {
                    e.reposition(t)
                },
                toggle: (e, t) => {
                    e.toggle(t)
                },
                toggleWithoutFocusing: (e, t) => {
                    e.toggleWithoutFocusing(t)
                },
                getToolbar: (e, t) => e.getToolbar(t),
                isOpen: (e, t) => e.isOpen(t)
            }
        }),
        bA = x([or("items"), Ai(["itemSelector"]), gu("tgroupBehaviours", [Hp])]),
        vA = x([Wu({
            name: "items",
            unit: "item"
        })]),
        yA = hm({
            name: "ToolbarGroup",
            configFields: bA(),
            partFields: vA(),
            factory: (e, t, o, n) => ({
                uid: e.uid,
                dom: e.dom,
                components: t,
                behaviours: hu(e.tgroupBehaviours, [Hp.config({
                    mode: "flow",
                    selector: e.markers.itemSelector
                })]),
                domModification: {
                    attributes: {
                        role: "toolbar"
                    }
                }
            })
        }),
        xA = e => H(e, (e => ai(e))),
        wA = (e, t, o) => {
            sA(e, o, (n => {
                o.overflowGroups.set(n), t.getOpt(e).each((e => {
                    fA.setGroups(e, xA(n))
                }))
            }))
        },
        SA = hm({
            name: "SplitFloatingToolbar",
            configFields: iA(),
            partFields: lA(),
            factory: (e, t, o, n) => {
                const r = Uh(fA.sketch({
                    fetch: () => sw((t => {
                        t(xA(e.overflowGroups.get()))
                    })),
                    layouts: {
                        onLtr: () => [sl, rl],
                        onRtl: () => [rl, sl],
                        onBottomLtr: () => [il, al],
                        onBottomRtl: () => [al, il]
                    },
                    getBounds: o.getOverflowBounds,
                    lazySink: e.lazySink,
                    fireDismissalEventInstead: {},
                    markers: {
                        toggledClass: e.markers.overflowToggledClass
                    },
                    parts: {
                        button: n["overflow-button"](),
                        toolbar: n.overflow()
                    },
                    onToggled: (t, o) => e[o ? "onOpened" : "onClosed"](t)
                }));
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: hu(e.splitToolbarBehaviours, [ew.config({
                        others: {
                            overflowGroup: () => yA.sketch({
                                ...n["overflow-group"](),
                                items: [r.asSpec()]
                            })
                        }
                    })]),
                    apis: {
                        setGroups: (t, o) => {
                            e.builtGroups.set(H(o, t.getSystem().build)), wA(t, r, e)
                        },
                        refresh: t => wA(t, r, e),
                        toggle: e => {
                            r.getOpt(e).each((e => {
                                fA.toggle(e)
                            }))
                        },
                        toggleWithoutFocusing: e => {
                            r.getOpt(e).each(fA.toggleWithoutFocusing)
                        },
                        isOpen: e => r.getOpt(e).map(fA.isOpen).getOr(!1),
                        reposition: e => {
                            r.getOpt(e).each((e => {
                                fA.reposition(e)
                            }))
                        },
                        getOverflow: e => r.getOpt(e).bind(fA.getToolbar)
                    },
                    domModification: {
                        attributes: {
                            role: "group"
                        }
                    }
                }
            },
            apis: {
                setGroups: (e, t, o) => {
                    e.setGroups(t, o)
                },
                refresh: (e, t) => {
                    e.refresh(t)
                },
                reposition: (e, t) => {
                    e.reposition(t)
                },
                toggle: (e, t) => {
                    e.toggle(t)
                },
                toggleWithoutFocusing: (e, t) => {
                    e.toggle(t)
                },
                isOpen: (e, t) => e.isOpen(t),
                getOverflow: (e, t) => e.getOverflow(t)
            }
        }),
        kA = x([Ai(["closedClass", "openClass", "shrinkingClass", "growingClass", "overflowToggledClass"]), Di("onOpened"), Di("onClosed")].concat(aA())),
        CA = x([Lu({
            factory: LT,
            schema: zT(),
            name: "primary"
        }), Lu({
            factory: LT,
            schema: zT(),
            name: "overflow",
            overrides: e => ({
                toolbarBehaviours: kl([TO.config({
                    dimension: {
                        property: "height"
                    },
                    closedClass: e.markers.closedClass,
                    openClass: e.markers.openClass,
                    shrinkingClass: e.markers.shrinkingClass,
                    growingClass: e.markers.growingClass,
                    onShrunk: t => {
                        em(t, e, "overflow-button").each((e => {
                            lh.off(e), eh.focus(e)
                        })), e.onClosed(t)
                    },
                    onGrown: t => {
                        Hp.focusIn(t), e.onOpened(t)
                    },
                    onStartGrow: t => {
                        em(t, e, "overflow-button").each(lh.on)
                    }
                }), Hp.config({
                    mode: "acyclic",
                    onEscape: t => (em(t, e, "overflow-button").each(eh.focus), A.some(!0))
                })])
            })
        }), Pu({
            name: "overflow-button",
            overrides: e => ({
                buttonBehaviours: kl([lh.config({
                    toggleClass: e.markers.overflowToggledClass,
                    aria: {
                        mode: "pressed"
                    },
                    toggleOnExecute: !1
                })])
            })
        }), Pu({
            name: "overflow-group"
        })]),
        OA = (e, t) => {
            em(e, t, "overflow-button").bind((() => em(e, t, "overflow"))).each((o => {
                _A(e, t), TO.toggleGrow(o)
            }))
        },
        _A = (e, t) => {
            em(e, t, "overflow").each((o => {
                sA(e, t, (e => {
                    const t = H(e, (e => ai(e)));
                    LT.setGroups(o, t)
                })), em(e, t, "overflow-button").each((e => {
                    TO.hasGrown(o) && lh.on(e)
                })), TO.refresh(o)
            }))
        },
        TA = hm({
            name: "SplitSlidingToolbar",
            configFields: kA(),
            partFields: CA(),
            factory: (e, t, o, n) => {
                const r = "alloy.toolbar.toggle";
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: hu(e.splitToolbarBehaviours, [ew.config({
                        others: {
                            overflowGroup: e => yA.sketch({
                                ...n["overflow-group"](),
                                items: [Ph.sketch({
                                    ...n["overflow-button"](),
                                    action: t => {
                                        Fs(e, r)
                                    }
                                })]
                            })
                        }
                    }), Kp("toolbar-toggle-events", [Us(r, (t => {
                        OA(t, e)
                    }))])]),
                    apis: {
                        setGroups: (t, o) => {
                            ((t, o) => {
                                const n = H(o, t.getSystem().build);
                                e.builtGroups.set(n)
                            })(t, o), _A(t, e)
                        },
                        refresh: t => _A(t, e),
                        toggle: t => OA(t, e),
                        isOpen: t => ((e, t) => em(e, t, "overflow").map(TO.hasGrown).getOr(!1))(t, e)
                    },
                    domModification: {
                        attributes: {
                            role: "group"
                        }
                    }
                }
            },
            apis: {
                setGroups: (e, t, o) => {
                    e.setGroups(t, o)
                },
                refresh: (e, t) => {
                    e.refresh(t)
                },
                toggle: (e, t) => {
                    e.toggle(t)
                },
                isOpen: (e, t) => e.isOpen(t)
            }
        }),
        EA = e => {
            const t = e.title.fold((() => ({})), (e => ({
                attributes: {
                    title: e
                }
            })));
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-toolbar__group"],
                    ...t
                },
                components: [yA.parts.items({})],
                items: e.items,
                markers: {
                    itemSelector: "*:not(.tox-split-button) > .tox-tbtn:not([disabled]), .tox-split-button:not([disabled]), .tox-toolbar-nav-js:not([disabled]), .tox-number-input:not([disabled])"
                },
                tgroupBehaviours: kl([Jw.config({}), eh.config({})])
            }
        },
        AA = e => yA.sketch(EA(e)),
        MA = (e, t) => {
            const o = Ys((t => {
                const o = H(e.initGroups, AA);
                LT.setGroups(t, o)
            }));
            return kl([xy(e.providers.isDisabled), by(), Hp.config({
                mode: t,
                onEscape: e.onEscape,
                selector: ".tox-toolbar__group"
            }), Kp("toolbar-events", [o])])
        },
        DA = e => {
            const t = e.cyclicKeying ? "cyclic" : "acyclic";
            return {
                uid: e.uid,
                dom: {
                    tag: "div",
                    classes: ["tox-toolbar-overlord"]
                },
                parts: {
                    "overflow-group": EA({
                        title: A.none(),
                        items: []
                    }),
                    "overflow-button": e_({
                        name: "more",
                        icon: A.some("more-drawer"),
                        enabled: !0,
                        tooltip: A.some("More..."),
                        primary: !1,
                        buttonType: A.none(),
                        borderless: !1
                    }, A.none(), e.providers)
                },
                splitToolbarBehaviours: MA(e, t)
            }
        },
        BA = e => {
            const t = DA(e),
                o = SA.parts.primary({
                    dom: {
                        tag: "div",
                        classes: ["tox-toolbar__primary"]
                    }
                });
            return SA.sketch({
                ...t,
                lazySink: e.getSink,
                getOverflowBounds: () => {
                    const t = e.moreDrawerData.lazyHeader().element,
                        o = Zo(t),
                        n = ot(t),
                        r = Zo(n),
                        s = Math.max(n.dom.scrollHeight, r.height);
                    return Yo(o.x + 4, r.y, o.width - 8, s)
                },
                parts: {
                    ...t.parts,
                    overflow: {
                        dom: {
                            tag: "div",
                            classes: ["tox-toolbar__overflow"],
                            attributes: e.attributes
                        }
                    }
                },
                components: [o],
                markers: {
                    overflowToggledClass: "tox-tbtn--enabled"
                },
                onOpened: t => e.onToggled(t, !0),
                onClosed: t => e.onToggled(t, !1)
            })
        },
        FA = e => {
            const t = TA.parts.primary({
                    dom: {
                        tag: "div",
                        classes: ["tox-toolbar__primary"]
                    }
                }),
                o = TA.parts.overflow({
                    dom: {
                        tag: "div",
                        classes: ["tox-toolbar__overflow"]
                    }
                }),
                n = DA(e);
            return TA.sketch({
                ...n,
                components: [t, o],
                markers: {
                    openClass: "tox-toolbar__overflow--open",
                    closedClass: "tox-toolbar__overflow--closed",
                    growingClass: "tox-toolbar__overflow--growing",
                    shrinkingClass: "tox-toolbar__overflow--shrinking",
                    overflowToggledClass: "tox-tbtn--enabled"
                },
                onOpened: t => {
                    t.getSystem().broadcastOn([yE()], {
                        type: "opened"
                    }), e.onToggled(t, !0)
                },
                onClosed: t => {
                    t.getSystem().broadcastOn([yE()], {
                        type: "closed"
                    }), e.onToggled(t, !1)
                }
            })
        },
        IA = e => {
            const t = e.cyclicKeying ? "cyclic" : "acyclic";
            return LT.sketch({
                uid: e.uid,
                dom: {
                    tag: "div",
                    classes: ["tox-toolbar"].concat(e.type === tf.scrolling ? ["tox-toolbar--scrolling"] : [])
                },
                components: [LT.parts.groups({})],
                toolbarBehaviours: MA(e, t)
            })
        },
        RA = [cv, dv, pr("tooltip"), kr("buttonType", "secondary", ["primary", "secondary"]), Cr("borderless", !1), ir("onAction")],
        NA = {
            button: [...RA, Qb, ar("type", ["button"])],
            togglebutton: [...RA, Cr("active", !1), ar("type", ["togglebutton"])]
        },
        VA = [ar("type", ["group"]), _r("buttons", [], Jn("type", NA))],
        zA = Jn("type", {
            ...NA,
            group: VA
        }),
        HA = Dn([_r("buttons", [], zA), ir("onShow"), ir("onHide")]),
        LA = (e, t) => ((e, t) => {
            var o, n;
            const r = "togglebutton" === e.type,
                s = e.icon.map((e => jC(e, t.icons))).map(Uh),
                a = {
                    ...e,
                    name: r ? e.text.getOr(e.icon.getOr("")) : null !== (o = e.text) && void 0 !== o ? o : e.icon.getOr(""),
                    primary: "primary" === e.buttonType,
                    buttonType: A.from(e.buttonType),
                    tooltip: e.tooltip,
                    icon: e.icon,
                    enabled: !0,
                    borderless: e.borderless
                },
                i = t_(null !== (n = e.buttonType) && void 0 !== n ? n : "secondary"),
                l = r ? e.text.map(t.translate) : A.some(t.translate(e.text)),
                c = l.map(ti),
                d = a.tooltip.or(l).map((e => ({
                    "aria-label": t.translate(e),
                    title: t.translate(e)
                }))).getOr({}),
                u = s.map((e => e.asSpec())),
                m = _y([u, c]),
                g = e.icon.isSome() && c.isSome(),
                p = {
                    tag: "button",
                    classes: i.concat(...e.icon.isSome() && !g ? ["tox-button--icon"] : []).concat(...g ? ["tox-button--icon-and-text"] : []).concat(...e.borderless ? ["tox-button--naked"] : []).concat(..."togglebutton" === e.type && e.active ? ["tox-button--enabled"] : []),
                    attributes: d
                },
                h = QO(a, A.some((o => {
                    const n = e => {
                        s.map((n => n.getOpt(o).each((o => {
                            Xp.set(o, [jC(e, t.icons)])
                        }))))
                    };
                    return r ? e.onAction({
                        setIcon: n,
                        setActive: e => {
                            const t = o.element;
                            e ? (La(t, "tox-button--enabled"), kt(t, "aria-pressed", !0)) : (Pa(t, "tox-button--enabled"), Et(t, "aria-pressed"))
                        },
                        isActive: () => Ua(o.element, "tox-button--enabled")
                    }) : "button" === e.type ? e.onAction({
                        setIcon: n
                    }) : void 0
                })), [], p, m, t);
            return Ph.sketch(h)
        })(e, t),
        PA = Do().deviceType,
        UA = PA.isPhone(),
        WA = PA.isTablet();
    var jA = hm({
        name: "silver.View",
        configFields: [or("viewConfig")],
        partFields: [Uu({
            factory: {
                sketch: e => {
                    let t = !1;
                    const o = H(e.buttons, (o => "group" === o.type ? (t = !0, ((e, t) => ({
                        dom: {
                            tag: "div",
                            classes: ["tox-view__toolbar__group"]
                        },
                        components: H(e.buttons, (e => LA(e, t)))
                    }))(o, e.providers)) : LA(o, e.providers)));
                    return {
                        uid: e.uid,
                        dom: {
                            tag: "div",
                            classes: [t ? "tox-view__toolbar" : "tox-view__header", ...UA || WA ? ["tox-view--mobile", "tox-view--scrolling"] : []]
                        },
                        behaviours: kl([eh.config({}), Hp.config({
                            mode: "flow",
                            selector: "button, .tox-button",
                            focusInside: mg.OnEnterOrSpaceMode
                        })]),
                        components: t ? o : [jw.sketch({
                            dom: {
                                tag: "div",
                                classes: ["tox-view__header-start"]
                            },
                            components: []
                        }), jw.sketch({
                            dom: {
                                tag: "div",
                                classes: ["tox-view__header-end"]
                            },
                            components: o
                        })]
                    }
                }
            },
            schema: [or("buttons"), or("providers")],
            name: "header"
        }), Uu({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        classes: ["tox-view__pane"]
                    }
                })
            },
            schema: [],
            name: "pane"
        })],
        factory: (e, t, o, n) => {
            const r = {
                getPane: t => BT.getPart(t, e, "pane"),
                getOnShow: t => e.viewConfig.onShow,
                getOnHide: t => e.viewConfig.onHide
            };
            return {
                uid: e.uid,
                dom: e.dom,
                components: t,
                apis: r
            }
        },
        apis: {
            getPane: (e, t) => e.getPane(t),
            getOnShow: (e, t) => e.getOnShow(t),
            getOnHide: (e, t) => e.getOnHide(t)
        }
    });
    const GA = (e, t, o) => pe(t, ((t, n) => {
            const r = Xn(qn("view", HA, t));
            return e.slot(n, jA.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-view"]
                },
                viewConfig: r,
                components: [...r.buttons.length > 0 ? [jA.parts.header({
                    buttons: r.buttons,
                    providers: o
                })] : [], jA.parts.pane({})]
            }))
        })),
        $A = (e, t) => LE.sketch((o => ({
            dom: {
                tag: "div",
                classes: ["tox-view-wrap__slot-container"]
            },
            components: GA(o, e, t),
            slotBehaviours: ny([Ys((e => LE.hideAllSlots(e)))])
        }))),
        qA = e => G(LE.getSlotNames(e), (t => LE.isShowing(e, t))),
        XA = (e, t, o) => {
            LE.getSlot(e, t).each((e => {
                jA.getPane(e).each((t => {
                    var n;
                    o(e)((n = t.element.dom, {
                        getContainer: x(n)
                    }))
                }))
            }))
        };
    var KA = pm({
        factory: (e, t) => {
            const o = {
                setViews: (e, o) => {
                    Xp.set(e, [$A(o, t.backstage.shared.providers)])
                },
                whichView: e => ym.getCurrent(e).bind(qA),
                toggleView: (e, t, o, n) => ym.getCurrent(e).exists((r => {
                    const s = qA(r),
                        a = s.exists((e => n === e)),
                        i = LE.getSlot(r, n).isSome();
                    return i && (LE.hideAllSlots(r), a ? ((e => {
                        const t = e.element;
                        Dt(t, "display", "none"), kt(t, "aria-hidden", "true")
                    })(e), t()) : (o(), (e => {
                        const t = e.element;
                        Ht(t, "display"), Et(t, "aria-hidden")
                    })(e), LE.showSlot(r, n), ((e, t) => {
                        XA(e, t, jA.getOnShow)
                    })(r, n)), s.each((e => ((e, t) => XA(e, t, jA.getOnHide))(r, e)))), i
                }))
            };
            return {
                uid: e.uid,
                dom: {
                    tag: "div",
                    classes: ["tox-view-wrap"],
                    attributes: {
                        "aria-hidden": "true"
                    },
                    styles: {
                        display: "none"
                    }
                },
                components: [],
                behaviours: kl([Xp.config({}), ym.config({
                    find: e => {
                        const t = Xp.contents(e);
                        return oe(t)
                    }
                })]),
                apis: o
            }
        },
        name: "silver.ViewWrapper",
        configFields: [or("backstage")],
        apis: {
            setViews: (e, t, o) => e.setViews(t, o),
            toggleView: (e, t, o, n, r) => e.toggleView(t, o, n, r),
            whichView: (e, t) => e.whichView(t)
        }
    });
    const YA = FT.optional({
            factory: IE,
            name: "menubar",
            schema: [or("backstage")]
        }),
        JA = FT.optional({
            factory: {
                sketch: e => VT.sketch({
                    uid: e.uid,
                    dom: e.dom,
                    listBehaviours: kl([Hp.config({
                        mode: "acyclic",
                        selector: ".tox-toolbar"
                    })]),
                    makeItem: () => IA({
                        type: e.type,
                        uid: la("multiple-toolbar-item"),
                        cyclicKeying: !1,
                        initGroups: [],
                        providers: e.providers,
                        onEscape: () => (e.onEscape(), A.some(!0))
                    }),
                    setupItem: (e, t, o, n) => {
                        LT.setGroups(t, o)
                    },
                    shell: !0
                })
            },
            name: "multiple-toolbar",
            schema: [or("dom"), or("onEscape")]
        }),
        ZA = FT.optional({
            factory: {
                sketch: e => {
                    const t = (e => e.type === tf.sliding ? FA : e.type === tf.floating ? BA : IA)(e);
                    return t({
                        type: e.type,
                        uid: e.uid,
                        onEscape: () => (e.onEscape(), A.some(!0)),
                        onToggled: (t, o) => e.onToolbarToggled(o),
                        cyclicKeying: !1,
                        initGroups: [],
                        getSink: e.getSink,
                        providers: e.providers,
                        moreDrawerData: {
                            lazyToolbar: e.lazyToolbar,
                            lazyMoreButton: e.lazyMoreButton,
                            lazyHeader: e.lazyHeader
                        },
                        attributes: e.attributes
                    })
                }
            },
            name: "toolbar",
            schema: [or("dom"), or("onEscape"), or("getSink")]
        }),
        QA = FT.optional({
            factory: {
                sketch: e => {
                    const t = e.editor,
                        o = e.sticky ? TE : WT;
                    return {
                        uid: e.uid,
                        dom: e.dom,
                        components: e.components,
                        behaviours: kl(o(t, e.sharedBackstage))
                    }
                }
            },
            name: "header",
            schema: [or("dom")]
        }),
        eM = FT.optional({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: e.dom,
                    components: [{
                        dom: {
                            tag: "a",
                            attributes: {
                                href: "https://www.tiny.cloud/tinymce-self-hosted-premium-features/?utm_source=TinyMCE&utm_medium=SPAP&utm_campaign=SPAP&utm_id=editorreferral",
                                rel: "noopener",
                                target: "_blank",
                                "aria-hidden": "true"
                            },
                            classes: ["tox-promotion-link"],
                            innerHtml: "\u26a1\ufe0fUpgrade"
                        }
                    }]
                })
            },
            name: "promotion",
            schema: [or("dom")]
        }),
        tM = FT.optional({
            name: "socket",
            schema: [or("dom")]
        }),
        oM = FT.optional({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        classes: ["tox-sidebar"],
                        attributes: {
                            role: "presentation"
                        }
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-sidebar__slider"]
                        },
                        components: [],
                        behaviours: kl([Jw.config({}), eh.config({}), TO.config({
                            dimension: {
                                property: "width"
                            },
                            closedClass: "tox-sidebar--sliding-closed",
                            openClass: "tox-sidebar--sliding-open",
                            shrinkingClass: "tox-sidebar--sliding-shrinking",
                            growingClass: "tox-sidebar--sliding-growing",
                            onShrunk: e => {
                                ym.getCurrent(e).each(LE.hideAllSlots), Fs(e, XE)
                            },
                            onGrown: e => {
                                Fs(e, XE)
                            },
                            onStartGrow: e => {
                                Is(e, qE, {
                                    width: Nt(e.element, "width").getOr("")
                                })
                            },
                            onStartShrink: e => {
                                Is(e, qE, {
                                    width: Jt(e.element) + "px"
                                })
                            }
                        }), Xp.config({}), ym.config({
                            find: e => {
                                const t = Xp.contents(e);
                                return oe(t)
                            }
                        })])
                    }],
                    behaviours: kl([xC(0), Kp("sidebar-sliding-events", [Us(qE, ((e, t) => {
                        Dt(e.element, "width", t.event.width)
                    })), Us(XE, ((e, t) => {
                        Ht(e.element, "width")
                    }))])])
                })
            },
            name: "sidebar",
            schema: [or("dom")]
        }),
        nM = FT.optional({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        attributes: {
                            "aria-hidden": "true"
                        },
                        classes: ["tox-throbber"],
                        styles: {
                            display: "none"
                        }
                    },
                    behaviours: kl([Xp.config({}), JE.config({
                        focus: !1
                    }), ym.config({
                        find: e => oe(e.components())
                    })]),
                    components: []
                })
            },
            name: "throbber",
            schema: [or("dom")]
        }),
        rM = FT.optional({
            factory: KA,
            name: "viewWrapper",
            schema: [or("backstage")]
        }),
        sM = FT.optional({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "div",
                        classes: ["tox-editor-container"]
                    },
                    components: e.components
                })
            },
            name: "editorContainer",
            schema: []
        });
    var aM = hm({
        name: "OuterContainer",
        factory: (e, t, o) => {
            let n = !1;
            const r = {
                getSocket: t => BT.getPart(t, e, "socket"),
                setSidebar: (t, o, n) => {
                    BT.getPart(t, e, "sidebar").each((e => ((e, t, o) => {
                        ym.getCurrent(e).each((n => {
                            Xp.set(n, [jE(t)]);
                            const r = null == o ? void 0 : o.toLowerCase();
                            s(r) && ve(t, r) && ym.getCurrent(n).each((t => {
                                LE.showSlot(t, r), TO.immediateGrow(n), Ht(n.element, "width"), GE(e.element, "region")
                            }))
                        }))
                    })(e, o, n)))
                },
                toggleSidebar: (t, o) => {
                    BT.getPart(t, e, "sidebar").each((e => ((e, t) => {
                        ym.getCurrent(e).each((o => {
                            ym.getCurrent(o).each((n => {
                                TO.hasGrown(o) ? LE.isShowing(n, t) ? (TO.shrink(o), GE(e.element, "presentation")) : (LE.hideAllSlots(n), LE.showSlot(n, t), GE(e.element, "region")) : (LE.hideAllSlots(n), LE.showSlot(n, t), TO.grow(o), GE(e.element, "region"))
                            }))
                        }))
                    })(e, o)))
                },
                whichSidebar: t => BT.getPart(t, e, "sidebar").bind($E).getOrNull(),
                getHeader: t => BT.getPart(t, e, "header"),
                getToolbar: t => BT.getPart(t, e, "toolbar"),
                setToolbar: (t, o) => {
                    BT.getPart(t, e, "toolbar").each((e => {
                        const t = H(o, AA);
                        e.getApis().setGroups(e, t)
                    }))
                },
                setToolbars: (t, o) => {
                    BT.getPart(t, e, "multiple-toolbar").each((e => {
                        const t = H(o, (e => H(e, AA)));
                        VT.setItems(e, t)
                    }))
                },
                refreshToolbar: t => {
                    BT.getPart(t, e, "toolbar").each((e => e.getApis().refresh(e)))
                },
                toggleToolbarDrawer: t => {
                    BT.getPart(t, e, "toolbar").each((e => {
                        ke(e.getApis().toggle, (t => t(e)))
                    }))
                },
                toggleToolbarDrawerWithoutFocusing: t => {
                    BT.getPart(t, e, "toolbar").each((e => {
                        ke(e.getApis().toggleWithoutFocusing, (t => t(e)))
                    }))
                },
                isToolbarDrawerToggled: t => BT.getPart(t, e, "toolbar").bind((e => A.from(e.getApis().isOpen).map((t => t(e))))).getOr(!1),
                getThrobber: t => BT.getPart(t, e, "throbber"),
                focusToolbar: t => {
                    BT.getPart(t, e, "toolbar").orThunk((() => BT.getPart(t, e, "multiple-toolbar"))).each((e => {
                        Hp.focusIn(e)
                    }))
                },
                setMenubar: (t, o) => {
                    BT.getPart(t, e, "menubar").each((e => {
                        IE.setMenus(e, o)
                    }))
                },
                focusMenubar: t => {
                    BT.getPart(t, e, "menubar").each((e => {
                        IE.focus(e)
                    }))
                },
                setViews: (t, o) => {
                    BT.getPart(t, e, "viewWrapper").each((e => {
                        KA.setViews(e, o)
                    }))
                },
                toggleView: (t, o) => BT.getPart(t, e, "viewWrapper").exists((e => KA.toggleView(e, (() => r.showMainView(t)), (() => r.hideMainView(t)), o))),
                whichView: t => BT.getPart(t, e, "viewWrapper").bind(KA.whichView).getOrNull(),
                hideMainView: t => {
                    n = r.isToolbarDrawerToggled(t), n && r.toggleToolbarDrawer(t), BT.getPart(t, e, "editorContainer").each((e => {
                        const t = e.element;
                        Dt(t, "display", "none"), kt(t, "aria-hidden", "true")
                    }))
                },
                showMainView: t => {
                    n && r.toggleToolbarDrawer(t), BT.getPart(t, e, "editorContainer").each((e => {
                        const t = e.element;
                        Ht(t, "display"), Et(t, "aria-hidden")
                    })), r.refreshToolbar(t)
                }
            };
            return {
                uid: e.uid,
                dom: e.dom,
                components: t,
                apis: r,
                behaviours: e.behaviours
            }
        },
        configFields: [or("dom"), or("behaviours")],
        partFields: [QA, YA, ZA, JA, tM, oM, eM, nM, rM, sM],
        apis: {
            getSocket: (e, t) => e.getSocket(t),
            setSidebar: (e, t, o, n) => {
                e.setSidebar(t, o, n)
            },
            toggleSidebar: (e, t, o) => {
                e.toggleSidebar(t, o)
            },
            whichSidebar: (e, t) => e.whichSidebar(t),
            getHeader: (e, t) => e.getHeader(t),
            getToolbar: (e, t) => e.getToolbar(t),
            setToolbar: (e, t, o) => {
                e.setToolbar(t, o)
            },
            setToolbars: (e, t, o) => {
                e.setToolbars(t, o)
            },
            refreshToolbar: (e, t) => e.refreshToolbar(t),
            toggleToolbarDrawer: (e, t) => {
                e.toggleToolbarDrawer(t)
            },
            toggleToolbarDrawerWithoutFocusing: (e, t) => {
                e.toggleToolbarDrawerWithoutFocusing(t)
            },
            isToolbarDrawerToggled: (e, t) => e.isToolbarDrawerToggled(t),
            getThrobber: (e, t) => e.getThrobber(t),
            setMenubar: (e, t, o) => {
                e.setMenubar(t, o)
            },
            focusMenubar: (e, t) => {
                e.focusMenubar(t)
            },
            focusToolbar: (e, t) => {
                e.focusToolbar(t)
            },
            setViews: (e, t, o) => {
                e.setViews(t, o)
            },
            toggleView: (e, t, o) => e.toggleView(t, o),
            whichView: (e, t) => e.whichView(t)
        }
    });
    const iM = {
            file: {
                title: "File",
                items: "newdocument restoredraft | preview | export print | deleteallconversations"
            },
            edit: {
                title: "Edit",
                items: "undo redo | cut copy paste pastetext | selectall | searchreplace"
            },
            view: {
                title: "View",
                items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"
            },
            insert: {
                title: "Insert",
                items: "image link media addcomment pageembed template inserttemplate codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents footnotes | mergetags | insertdatetime"
            },
            format: {
                title: "Format",
                items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat"
            },
            tools: {
                title: "Tools",
                items: "spellchecker spellcheckerlanguage | autocorrect capitalization | a11ycheck code typography wordcount addtemplate"
            },
            table: {
                title: "Table",
                items: "inserttable | cell row column | advtablesort | tableprops deletetable"
            },
            help: {
                title: "Help",
                items: "help"
            }
        },
        lM = e => e.split(" "),
        cM = (e, t) => {
            const o = {
                    ...iM,
                    ...t.menus
                },
                n = ae(t.menus).length > 0,
                r = void 0 === t.menubar || !0 === t.menubar ? lM("file edit view insert format tools table help") : lM(!1 === t.menubar ? "" : t.menubar),
                a = U(r, (e => {
                    const o = ve(iM, e);
                    return n ? o || be(t.menus, e).exists((e => ve(e, "items"))) : o
                })),
                i = H(a, (n => {
                    const r = o[n];
                    return ((e, t, o) => {
                        const n = wf(o).split(/[ ,]/);
                        return {
                            text: e.title,
                            getItems: () => X(e.items, (e => {
                                const o = e.toLowerCase();
                                return 0 === o.trim().length || N(n, (e => e === o)) ? [] : "separator" === o || "|" === o ? [{
                                    type: "separator"
                                }] : t.menuItems[o] ? [t.menuItems[o]] : []
                            }))
                        }
                    })({
                        title: r.title,
                        items: lM(r.items)
                    }, t, e)
                }));
            return U(i, (e => e.getItems().length > 0 && N(e.getItems(), (e => s(e) || "separator" !== e.type))))
        },
        dM = e => {
            const t = () => {
                e._skinLoaded = !0, (e => {
                    e.dispatch("SkinLoaded")
                })(e)
            };
            return () => {
                e.initialized ? t() : e.on("init", t)
            }
        },
        uM = (e, t, o) => (e.on("remove", (() => o.unload(t))), o.load(t)),
        mM = (e, t) => uM(e, t + "/skin.min.css", e.ui.styleSheetLoader),
        gM = (e, t) => {
            var o;
            return o = Ve(e.getElement()), bt(o).isSome() ? uM(e, t + "/skin.shadowdom.min.css", nf.DOM.styleSheetLoader) : Promise.resolve()
        },
        pM = (e, t) => {
            const o = Xf(t);
            return o && t.contentCSS.push(o + (e ? "/content.inline" : "/content") + ".min.css"), !$f(t) && s(o) ? Promise.all([mM(t, o), gM(t, o)]).then(dM(t), ((e, t) => () => ((e, t) => {
                e.dispatch("SkinLoadError", t)
            })(e, {
                message: "Skin could not be loaded"
            }))(t)) : Promise.resolve(dM(t)())
        },
        hM = k(pM, !1),
        fM = k(pM, !0),
        bM = (e, t) => o => {
            const n = Zl(),
                r = () => {
                    o.setActive(e.formatter.match(t));
                    const r = e.formatter.formatChanged(t, o.setActive);
                    n.set(r)
                };
            return e.initialized ? r() : e.once("init", r), () => {
                e.off("init", r), n.clear()
            }
        },
        vM = (e, t, o) => n => {
            const r = () => o(n),
                s = () => {
                    o(n), e.on(t, r)
                };
            return e.initialized ? s() : e.once("init", s), () => {
                e.off("init", s), e.off(t, r)
            }
        },
        yM = e => t => () => {
            e.undoManager.transact((() => {
                e.focus(), e.execCommand("mceToggleFormat", !1, t.format)
            }))
        },
        xM = (e, t) => () => e.execCommand(t),
        wM = (e, t, o) => {
            const n = (e, n, s, a) => {
                    const i = t.shared.providers.translate(e.title);
                    if ("separator" === e.type) return A.some({
                        type: "separator",
                        text: i
                    });
                    if ("submenu" === e.type) {
                        const t = X(e.getStyleItems(), (e => r(e, n, a)));
                        return 0 === n && t.length <= 0 ? A.none() : A.some({
                            type: "nestedmenuitem",
                            text: i,
                            enabled: t.length > 0,
                            getSubmenuItems: () => X(e.getStyleItems(), (e => r(e, n, a)))
                        })
                    }
                    return A.some({
                        type: "togglemenuitem",
                        text: i,
                        icon: e.icon,
                        active: e.isSelected(a),
                        enabled: !s,
                        onAction: o.onAction(e),
                        ...e.getStylePreview().fold((() => ({})), (e => ({
                            meta: {
                                style: e
                            }
                        })))
                    })
                },
                r = (e, t, r) => {
                    const s = "formatter" === e.type && o.isInvalid(e);
                    return 0 === t ? s ? [] : n(e, t, !1, r).toArray() : n(e, t, s, r).toArray()
                },
                s = e => {
                    const t = o.getCurrentValue(),
                        n = o.shouldHide ? 0 : 1;
                    return X(e, (e => r(e, n, t)))
                };
            return {
                validateItems: s,
                getFetch: (e, t) => (o, n) => {
                    const r = t(),
                        a = s(r);
                    n(ZC(a, ub.CLOSE_ON_EXECUTE, e, {
                        isHorizontalMenu: !1,
                        search: A.none()
                    }))
                }
            }
        },
        SM = (e, t, o) => {
            const n = o.dataset,
                r = "basic" === n.type ? () => H(n.data, (e => sT(e, o.isSelectedFor, o.getPreviewFor))) : n.getData;
            return {
                items: wM(0, t, o),
                getStyleItems: r
            }
        },
        kM = (e, t, o) => {
            const {
                items: n,
                getStyleItems: r
            } = SM(0, t, o), s = vM(e, "NodeChange", (e => {
                const t = e.getComponent();
                o.updateText(t)
            }));
            return XC({
                text: o.icon.isSome() ? A.none() : o.text,
                icon: o.icon,
                tooltip: A.from(o.tooltip),
                role: A.none(),
                fetch: n.getFetch(t, r),
                onSetup: s,
                getApi: e => ({
                    getComponent: x(e)
                }),
                columns: 1,
                presets: "normal",
                classes: o.icon.isSome() ? [] : ["bespoke"],
                dropdownBehaviours: []
            }, "tox-tbtn", t.shared)
        };
    var CM;
    ! function (e) {
        e[e.SemiColon = 0] = "SemiColon", e[e.Space = 1] = "Space"
    }(CM || (CM = {}));
    const OM = (e, t, o) => {
            const n = (r = ((e, t) => t === CM.SemiColon ? e.replace(/;$/, "").split(";") : e.split(" "))(e.options.get(t), o), H(r, (e => {
                let t = e,
                    o = e;
                const n = e.split("=");
                return n.length > 1 && (t = n[0], o = n[1]), {
                    title: t,
                    format: o
                }
            })));
            var r;
            return {
                type: "basic",
                data: n
            }
        },
        _M = [{
            title: "Left",
            icon: "align-left",
            format: "alignleft",
            command: "JustifyLeft"
        }, {
            title: "Center",
            icon: "align-center",
            format: "aligncenter",
            command: "JustifyCenter"
        }, {
            title: "Right",
            icon: "align-right",
            format: "alignright",
            command: "JustifyRight"
        }, {
            title: "Justify",
            icon: "align-justify",
            format: "alignjustify",
            command: "JustifyFull"
        }],
        TM = e => {
            const t = {
                type: "basic",
                data: _M
            };
            return {
                tooltip: "Align",
                text: A.none(),
                icon: A.some("align-left"),
                isSelectedFor: t => () => e.formatter.match(t),
                getCurrentValue: A.none,
                getPreviewFor: e => A.none,
                onAction: t => () => G(_M, (e => e.format === t.format)).each((t => e.execCommand(t.command))),
                updateText: t => {
                    const o = G(_M, (t => e.formatter.match(t.format))).fold(x("left"), (e => e.title.toLowerCase()));
                    Is(t, qC, {
                        icon: `align-${o}`
                    })
                },
                dataset: t,
                shouldHide: !1,
                isInvalid: t => !e.formatter.canApply(t.format)
            }
        },
        EM = (e, t) => {
            const o = t(),
                n = H(o, (e => e.format));
            return A.from(e.formatter.closest(n)).bind((e => G(o, (t => t.format === e)))).orThunk((() => Ce(e.formatter.match("p"), {
                title: "Paragraph",
                format: "p"
            })))
        },
        AM = e => {
            const t = "Paragraph",
                o = OM(e, "block_formats", CM.SemiColon);
            return {
                tooltip: "Blocks",
                text: A.some(t),
                icon: A.none(),
                isSelectedFor: t => () => e.formatter.match(t),
                getCurrentValue: A.none,
                getPreviewFor: t => () => {
                    const o = e.formatter.get(t);
                    return o ? A.some({
                        tag: o.length > 0 && (o[0].inline || o[0].block) || "div",
                        styles: e.dom.parseStyle(e.formatter.getCssText(t))
                    }) : A.none()
                },
                onAction: yM(e),
                updateText: n => {
                    const r = EM(e, (() => o.data)).fold(x(t), (e => e.title));
                    Is(n, $C, {
                        text: r
                    })
                },
                dataset: o,
                shouldHide: !1,
                isInvalid: t => !e.formatter.canApply(t.format)
            }
        },
        MM = ["-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
        DM = e => {
            const t = e.split(/\s*,\s*/);
            return H(t, (e => e.replace(/^['"]+|['"]+$/g, "")))
        },
        BM = e => {
            const t = "System Font",
                o = () => {
                    const o = e => e ? DM(e)[0] : "",
                        r = e.queryCommandValue("FontName"),
                        s = n.data,
                        a = r ? r.toLowerCase() : "",
                        i = G(s, (e => {
                            const t = e.format;
                            return t.toLowerCase() === a || o(t).toLowerCase() === o(a).toLowerCase()
                        })).orThunk((() => Ce((e => 0 === e.indexOf("-apple-system") && (() => {
                            const t = DM(e.toLowerCase());
                            return K(MM, (e => t.indexOf(e.toLowerCase()) > -1))
                        })())(a), {
                            title: t,
                            format: a
                        })));
                    return {
                        matchOpt: i,
                        font: r
                    }
                },
                n = OM(e, "font_family_formats", CM.SemiColon);
            return {
                tooltip: "Fonts",
                text: A.some(t),
                icon: A.none(),
                isSelectedFor: e => t => t.exists((t => t.format === e)),
                getCurrentValue: () => {
                    const {
                        matchOpt: e
                    } = o();
                    return e
                },
                getPreviewFor: e => () => A.some({
                    tag: "div",
                    styles: -1 === e.indexOf("dings") ? {
                        "font-family": e
                    } : {}
                }),
                onAction: t => () => {
                    e.undoManager.transact((() => {
                        e.focus(), e.execCommand("FontName", !1, t.format)
                    }))
                },
                updateText: e => {
                    const {
                        matchOpt: t,
                        font: n
                    } = o(), r = t.fold(x(n), (e => e.title));
                    Is(e, $C, {
                        text: r
                    })
                },
                dataset: n,
                shouldHide: !1,
                isInvalid: T
            }
        },
        FM = {
            tab: x(9),
            escape: x(27),
            enter: x(13),
            backspace: x(8),
            delete: x(46),
            left: x(37),
            up: x(38),
            right: x(39),
            down: x(40),
            space: x(32),
            home: x(36),
            end: x(35),
            pageUp: x(33),
            pageDown: x(34)
        },
        IM = {
            unsupportedLength: ["em", "ex", "cap", "ch", "ic", "rem", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px"],
            fixed: ["px", "pt"],
            relative: ["%"],
            empty: [""]
        },
        RM = (() => {
            const e = "[0-9]+",
                t = "[eE][+-]?[0-9]+",
                o = e => `(?:${e})?`,
                n = ["Infinity", "[0-9]+\\." + o(e) + o(t), "\\.[0-9]+" + o(t), e + o(t)].join("|");
            return new RegExp(`^([+-]?(?:${n}))(.*)$`)
        })(),
        NM = (e, t) => A.from(RM.exec(e)).bind((e => {
            const o = Number(e[1]),
                n = e[2];
            return ((e, t) => N(t, (t => N(IM[t], (t => e === t)))))(n, t) ? A.some({
                value: o,
                unit: n
            }) : A.none()
        })),
        VM = {
            "8pt": "1",
            "10pt": "2",
            "12pt": "3",
            "14pt": "4",
            "18pt": "5",
            "24pt": "6",
            "36pt": "7"
        },
        zM = {
            "xx-small": "7pt",
            "x-small": "8pt",
            small: "10pt",
            medium: "12pt",
            large: "14pt",
            "x-large": "18pt",
            "xx-large": "24pt"
        },
        HM = (e, t) => /[0-9.]+px$/.test(e) ? ((e, t) => {
            const o = Math.pow(10, t);
            return Math.round(e * o) / o
        })(72 * parseInt(e, 10) / 96, t || 0) + "pt" : be(zM, e).getOr(e),
        LM = e => be(VM, e).getOr(""),
        PM = e => {
            const t = () => {
                    let t = A.none();
                    const o = n.data,
                        r = e.queryCommandValue("FontSize");
                    if (r)
                        for (let e = 3; t.isNone() && e >= 0; e--) {
                            const n = HM(r, e),
                                s = LM(n);
                            t = G(o, (e => e.format === r || e.format === n || e.format === s))
                        }
                    return {
                        matchOpt: t,
                        size: r
                    }
                },
                o = x(A.none),
                n = OM(e, "font_size_formats", CM.Space);
            return {
                tooltip: "Font sizes",
                text: A.some("12pt"),
                icon: A.none(),
                isSelectedFor: e => t => t.exists((t => t.format === e)),
                getPreviewFor: o,
                getCurrentValue: () => {
                    const {
                        matchOpt: e
                    } = t();
                    return e
                },
                onAction: t => () => {
                    e.undoManager.transact((() => {
                        e.focus(), e.execCommand("FontSize", !1, t.format)
                    }))
                },
                updateText: e => {
                    const {
                        matchOpt: o,
                        size: n
                    } = t(), r = o.fold(x(n), (e => e.title));
                    Is(e, $C, {
                        text: r
                    })
                },
                dataset: n,
                shouldHide: !1,
                isInvalid: T
            }
        },
        UM = e => {
            var t;
            return null !== (t = {
                em: {
                    step: .1
                },
                cm: {
                    step: .1
                },
                in: {
                    step: .1
                },
                pc: {
                    step: .1
                },
                ch: {
                    step: .1
                },
                rem: {
                    step: .1
                }
            } [e]) && void 0 !== t ? t : {
                step: 1
            }
        },
        WM = (e, t) => {
            const o = "Paragraph";
            return {
                tooltip: "Formats",
                text: A.some(o),
                icon: A.none(),
                isSelectedFor: t => () => e.formatter.match(t),
                getCurrentValue: A.none,
                getPreviewFor: t => () => {
                    const o = e.formatter.get(t);
                    return void 0 !== o ? A.some({
                        tag: o.length > 0 && (o[0].inline || o[0].block) || "div",
                        styles: e.dom.parseStyle(e.formatter.getCssText(t))
                    }) : A.none()
                },
                onAction: yM(e),
                updateText: t => {
                    const n = e => eT(e) ? X(e.items, n) : tT(e) ? [{
                            title: e.title,
                            format: e.format
                        }] : [],
                        r = X(rT(e), n),
                        s = EM(e, x(r)).fold(x(o), (e => e.title));
                    Is(t, $C, {
                        text: s
                    })
                },
                shouldHide: yf(e),
                isInvalid: t => !e.formatter.canApply(t.format),
                dataset: t
            }
        },
        jM = x([or("toggleClass"), or("fetch"), Fi("onExecute"), yr("getHotspot", A.some), yr("getAnchorOverrides", x({})), wc(), Fi("onItemExecute"), ur("lazySink"), or("dom"), Di("onOpen"), gu("splitDropdownBehaviours", [ew, Hp, eh]), yr("matchWidth", !1), yr("useMinWidth", !1), yr("eventOrder", {}), ur("role")].concat(bw())),
        GM = Lu({
            factory: Ph,
            schema: [or("dom")],
            name: "arrow",
            defaults: () => ({
                buttonBehaviours: kl([eh.revoke()])
            }),
            overrides: e => ({
                dom: {
                    tag: "span",
                    attributes: {
                        role: "presentation"
                    }
                },
                action: t => {
                    t.getSystem().getByUid(e.uid).each(Rs)
                },
                buttonBehaviours: kl([lh.config({
                    toggleOnExecute: !1,
                    toggleClass: e.toggleClass
                })])
            })
        }),
        $M = Lu({
            factory: Ph,
            schema: [or("dom")],
            name: "button",
            defaults: () => ({
                buttonBehaviours: kl([eh.revoke()])
            }),
            overrides: e => ({
                dom: {
                    tag: "span",
                    attributes: {
                        role: "presentation"
                    }
                },
                action: t => {
                    t.getSystem().getByUid(e.uid).each((o => {
                        e.onExecute(o, t)
                    }))
                }
            })
        }),
        qM = x([GM, $M, Uu({
            factory: {
                sketch: e => ({
                    uid: e.uid,
                    dom: {
                        tag: "span",
                        styles: {
                            display: "none"
                        },
                        attributes: {
                            "aria-hidden": "true"
                        },
                        innerHtml: e.text
                    }
                })
            },
            schema: [or("text")],
            name: "aria-descriptor"
        }), Pu({
            schema: [Ei()],
            name: "menu",
            defaults: e => ({
                onExecute: (t, o) => {
                    t.getSystem().getByUid(e.uid).each((n => {
                        e.onItemExecute(n, t, o)
                    }))
                }
            })
        }), lw()]),
        XM = hm({
            name: "SplitDropdown",
            configFields: jM(),
            partFields: qM(),
            factory: (e, t, o, n) => {
                const r = e => {
                        ym.getCurrent(e).each((e => {
                            Wm.highlightFirst(e), Hp.focusIn(e)
                        }))
                    },
                    s = t => {
                        mw(e, w, t, n, r, Nh.HighlightMenuAndItem).get(b)
                    },
                    a = t => {
                        const o = tm(t, e, "button");
                        return Rs(o), A.some(!0)
                    },
                    i = {
                        ...Hs([Ys(((t, o) => {
                            em(t, e, "aria-descriptor").each((e => {
                                const o = la("aria");
                                kt(e.element, "id", o), kt(t.element, "aria-describedby", o)
                            }))
                        }))]),
                        ...dh(A.some(s))
                    },
                    l = {
                        repositionMenus: e => {
                            lh.isOn(e) && fw(e)
                        }
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    apis: l,
                    eventOrder: {
                        ...e.eventOrder,
                        [us()]: ["disabling", "toggling", "alloy.base.behaviour"]
                    },
                    events: i,
                    behaviours: hu(e.splitDropdownBehaviours, [ew.config({
                        others: {
                            sandbox: t => {
                                const o = tm(t, e, "arrow");
                                return hw(e, t, {
                                    onOpen: () => {
                                        lh.on(o), lh.on(t)
                                    },
                                    onClose: () => {
                                        lh.off(o), lh.off(t)
                                    }
                                })
                            }
                        }
                    }), Hp.config({
                        mode: "special",
                        onSpace: a,
                        onEnter: a,
                        onDown: e => (s(e), A.some(!0))
                    }), eh.config({}), lh.config({
                        toggleOnExecute: !1,
                        aria: {
                            mode: "expanded"
                        }
                    })]),
                    domModification: {
                        attributes: {
                            role: e.role.getOr("button"),
                            "aria-haspopup": !0
                        }
                    }
                }
            },
            apis: {
                repositionMenus: (e, t) => e.repositionMenus(t)
            }
        }),
        KM = e => ({
            isEnabled: () => !Fm.isDisabled(e),
            setEnabled: t => Fm.set(e, !t),
            setText: t => Is(e, $C, {
                text: t
            }),
            setIcon: t => Is(e, qC, {
                icon: t
            })
        }),
        YM = e => ({
            setActive: t => {
                lh.set(e, t)
            },
            isActive: () => lh.isOn(e),
            isEnabled: () => !Fm.isDisabled(e),
            setEnabled: t => Fm.set(e, !t),
            setText: t => Is(e, $C, {
                text: t
            }),
            setIcon: t => Is(e, qC, {
                icon: t
            })
        }),
        JM = (e, t) => e.map((e => ({
            "aria-label": t.translate(e),
            title: t.translate(e)
        }))).getOr({}),
        ZM = la("focus-button"),
        QM = (e, t, o, n, r) => {
            const s = t.map((e => Uh(GC(e, "tox-tbtn", r)))),
                a = e.map((e => Uh(jC(e, r.icons))));
            return {
                dom: {
                    tag: "button",
                    classes: ["tox-tbtn"].concat(t.isSome() ? ["tox-tbtn--select"] : []),
                    attributes: JM(o, r)
                },
                components: _y([a.map((e => e.asSpec())), s.map((e => e.asSpec()))]),
                eventOrder: {
                    [Wr()]: ["focusing", "alloy.base.behaviour", HC],
                    [Ss()]: [HC, "toolbar-group-button-events"]
                },
                buttonBehaviours: kl([xy(r.isDisabled), by(), Kp(HC, [Ys(((e, t) => PC(e))), Us($C, ((e, t) => {
                    s.bind((t => t.getOpt(e))).each((e => {
                        Xp.set(e, [ti(r.translate(t.event.text))])
                    }))
                })), Us(qC, ((e, t) => {
                    a.bind((t => t.getOpt(e))).each((e => {
                        Xp.set(e, [jC(t.event.icon, r.icons)])
                    }))
                })), Us(Wr(), ((e, t) => {
                    t.event.prevent(), Fs(e, ZM)
                }))])].concat(n.getOr([])))
            }
        },
        eD = (e, t, o) => {
            var n;
            const r = Er(b),
                s = QM(e.icon, e.text, e.tooltip, A.none(), o);
            return Ph.sketch({
                dom: s.dom,
                components: s.components,
                eventOrder: LC,
                buttonBehaviours: {
                    ...kl([Kp("toolbar-button-events", [(a = {
                        onAction: e.onAction,
                        getApi: t.getApi
                    }, Qs(((e, t) => {
                        wy(a, e)((t => {
                            Is(e, zC, {
                                buttonApi: t
                            }), a.onAction(t)
                        }))
                    }))), Sy(t, r), ky(t, r)]), xy((() => !e.enabled || o.isDisabled())), by()].concat(t.toolbarButtonBehaviours)),
                    [HC]: null === (n = s.buttonBehaviours) || void 0 === n ? void 0 : n[HC]
                }
            });
            var a
        },
        tD = (e, t, o) => eD(e, {
            toolbarButtonBehaviours: o.length > 0 ? [Kp("toolbarButtonWith", o)] : [],
            getApi: KM,
            onSetup: e.onSetup
        }, t),
        oD = (e, t, o) => eD(e, {
            toolbarButtonBehaviours: [Xp.config({}), lh.config({
                toggleClass: "tox-tbtn--enabled",
                aria: {
                    mode: "pressed"
                },
                toggleOnExecute: !1
            })].concat(o.length > 0 ? [Kp("toolbarToggleButtonWith", o)] : []),
            getApi: YM,
            onSetup: e.onSetup
        }, t),
        nD = (e, t, o) => n => sw((e => t.fetch(e))).map((r => A.from(Ew(fn(Px(la("menu-value"), r, (o => {
            t.onItemAction(e(n), o)
        }), t.columns, t.presets, ub.CLOSE_ON_EXECUTE, t.select.getOr(T), o), {
            movement: Wx(t.columns, t.presets),
            menuBehaviours: ny("auto" !== t.columns ? [] : [Ys(((e, o) => {
                oy(e, 4, Sb(t.presets)).each((({
                    numRows: t,
                    numColumns: o
                }) => {
                    Hp.setGridSize(e, t, o)
                }))
            }))])
        }))))),
        rD = [{
            name: "history",
            items: ["undo", "redo"]
        }, {
            name: "styles",
            items: ["styles"]
        }, {
            name: "formatting",
            items: ["bold", "italic"]
        }, {
            name: "alignment",
            items: ["alignleft", "aligncenter", "alignright", "alignjustify"]
        }, {
            name: "indentation",
            items: ["outdent", "indent"]
        }, {
            name: "permanent pen",
            items: ["permanentpen"]
        }, {
            name: "comments",
            items: ["addcomment"]
        }],
        sD = (e, t) => (o, n, r) => {
            const s = e(o).mapError((e => Yn(e))).getOrDie();
            return t(s, n, r)
        },
        aD = {
            button: sD(Ev, ((e, t) => {
                return o = e, n = t.shared.providers, tD(o, n, []);
                var o, n
            })),
            togglebutton: sD(Dv, ((e, t) => {
                return o = e, n = t.shared.providers, oD(o, n, []);
                var o, n
            })),
            menubutton: sD(BE, ((e, t) => AO(e, "tox-tbtn", t, A.none()))),
            splitbutton: sD((e => qn("SplitButton", FE, e)), ((e, t) => ((e, t) => {
                const o = e => ({
                        isEnabled: () => !Fm.isDisabled(e),
                        setEnabled: t => Fm.set(e, !t),
                        setIconFill: (t, o) => {
                            pi(e.element, `svg path[id="${t}"], rect[id="${t}"]`).each((e => {
                                kt(e, "fill", o)
                            }))
                        },
                        setActive: t => {
                            kt(e.element, "aria-pressed", t), pi(e.element, "span").each((o => {
                                e.getSystem().getByDom(o).each((e => lh.set(e, t)))
                            }))
                        },
                        isActive: () => pi(e.element, "span").exists((t => e.getSystem().getByDom(t).exists(lh.isOn))),
                        setText: t => pi(e.element, "span").each((o => e.getSystem().getByDom(o).each((e => Is(e, $C, {
                            text: t
                        }))))),
                        setIcon: t => pi(e.element, "span").each((o => e.getSystem().getByDom(o).each((e => Is(e, qC, {
                            icon: t
                        })))))
                    }),
                    n = Er(b),
                    r = {
                        getApi: o,
                        onSetup: e.onSetup
                    };
                return XM.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-split-button"],
                        attributes: {
                            "aria-pressed": !1,
                            ...JM(e.tooltip, t.providers)
                        }
                    },
                    onExecute: t => {
                        const n = o(t);
                        n.isEnabled() && e.onAction(n)
                    },
                    onItemExecute: (e, t, o) => {},
                    splitDropdownBehaviours: kl([yy(t.providers.isDisabled), by(), Kp("split-dropdown-events", [Ys(((e, t) => PC(e))), Us(ZM, eh.focus), Sy(r, n), ky(r, n)]), SS.config({})]),
                    eventOrder: {
                        [Ss()]: ["alloy.base.behaviour", "split-dropdown-events"]
                    },
                    toggleClass: "tox-tbtn--enabled",
                    lazySink: t.getSink,
                    fetch: nD(o, e, t.providers),
                    parts: {
                        menu: Eb(0, e.columns, e.presets)
                    },
                    components: [XM.parts.button(QM(e.icon, e.text, A.none(), A.some([lh.config({
                        toggleClass: "tox-tbtn--enabled",
                        toggleOnExecute: !1
                    })]), t.providers)), XM.parts.arrow({
                        dom: {
                            tag: "button",
                            classes: ["tox-tbtn", "tox-split-button__chevron"],
                            innerHtml: Kh("chevron-down", t.providers.icons)
                        },
                        buttonBehaviours: kl([yy(t.providers.isDisabled), by(), Yh()])
                    }), XM.parts["aria-descriptor"]({
                        text: t.providers.translate("To open the popup, press Shift+Enter")
                    })]
                })
            })(e, t.shared))),
            grouptoolbarbutton: sD((e => qn("GroupToolbarButton", AE, e)), ((e, t, o) => {
                const n = o.ui.registry.getAll().buttons,
                    r = {
                        [yc]: t.shared.header.isPositionedAtTop() ? vc.TopToBottom : vc.BottomToTop
                    };
                if (Sf(o) === tf.floating) return ((e, t, o, n) => {
                    const r = t.shared,
                        s = Er(b),
                        a = {
                            toolbarButtonBehaviours: [],
                            getApi: KM,
                            onSetup: e.onSetup
                        },
                        i = [Kp("toolbar-group-button-events", [Sy(a, s), ky(a, s)])];
                    return fA.sketch({
                        lazySink: r.getSink,
                        fetch: () => sw((t => {
                            t(H(o(e.items), AA))
                        })),
                        markers: {
                            toggledClass: "tox-tbtn--enabled"
                        },
                        parts: {
                            button: QM(e.icon, e.text, e.tooltip, A.some(i), r.providers),
                            toolbar: {
                                dom: {
                                    tag: "div",
                                    classes: ["tox-toolbar__overflow"],
                                    attributes: n
                                }
                            }
                        }
                    })
                })(e, t, (e => lD(o, {
                    buttons: n,
                    toolbar: e,
                    allowToolbarGroups: !1
                }, t, A.none())), r);
                throw new Error("Toolbar groups are only supported when using floating toolbar mode")
            }))
        },
        iD = {
            styles: (e, t) => {
                const o = {
                    type: "advanced",
                    ...t.styles
                };
                return kM(e, t, WM(e, o))
            },
            fontsize: (e, t) => kM(e, t, PM(e)),
            fontsizeinput: (e, t) => ((e, t, o) => {
                let n = A.none();
                const r = vM(e, "NodeChange", (e => {
                        const t = e.getComponent();
                        n = A.some(t), o.updateInputValue(t)
                    })),
                    s = e => ({
                        getComponent: x(e)
                    }),
                    a = Er(b),
                    i = la("custom-number-input-events"),
                    l = (t, r, s) => {
                        const a = n.map((e => mu.getValue(e))).getOr(""),
                            i = NM(a, ["unsupportedLength", "empty"]),
                            l = i.map((e => e.value)).getOr(0),
                            c = Ff(e),
                            d = i.map((e => e.unit)).filter((e => "" !== e)).getOr(c),
                            u = t(l, o.getConfigFromUnit(d).step),
                            m = `${(e=>e>=0)(u)?u:l}${d}`,
                            g = `${l}${d}`.length - `${m}`.length,
                            p = n.map((e => e.element.dom.selectionStart - g)),
                            h = n.map((e => e.element.dom.selectionEnd - g));
                        o.onAction(m, s), n.each((e => {
                            mu.setValue(e, m), r && (p.each((t => e.element.dom.selectionStart = t)), h.each((t => e.element.dom.selectionEnd = t)))
                        }))
                    },
                    c = (e, t) => l(((e, t) => e - t), e, t),
                    d = (e, t) => l(((e, t) => e + t), e, t),
                    u = e => st(e.element).fold(A.none, (e => (Dl(e), A.some(!0)))),
                    m = e => Fl(e.element) ? (ct(e.element).each((e => Dl(e))), A.some(!0)) : A.none(),
                    g = (e, o, n, r) => {
                        const s = t.shared.providers.translate(n),
                            a = la("altExecuting"),
                            i = () => e(!0);
                        return Ph.sketch({
                            dom: {
                                tag: "button",
                                attributes: {
                                    title: s,
                                    "aria-label": s
                                },
                                classes: r.concat(o)
                            },
                            components: [WC(o, t.shared.providers.icons)],
                            buttonBehaviours: kl([Kp(a, [Us(Yr(), ((t, o) => {
                                o.event.raw.keyCode !== FM.space() && o.event.raw.keyCode !== FM.enter() || e(!1)
                            })), Us(es(), i), Us(Pr(), i)])]),
                            eventOrder: {
                                [Yr()]: [a, "keying"],
                                [es()]: [a, "alloy.base.behaviour"],
                                [Pr()]: [a, "alloy.base.behaviour"]
                            }
                        })
                    },
                    p = Uh(g((e => c(!1, e)), "minus", "Decrease font size", ["highlight-on-focus"])),
                    h = Uh(g((e => d(!1, e)), "plus", "Increase font size", ["highlight-on-focus"])),
                    f = Uh({
                        dom: {
                            tag: "div",
                            classes: ["tox-input-wrapper", "highlight-on-focus"]
                        },
                        components: [Fb.sketch({
                            inputBehaviours: kl([Kp(i, [Sy({
                                onSetup: r,
                                getApi: s
                            }, a), ky({
                                getApi: s
                            }, a)]), Kp("input-update-display-text", [Us($C, ((e, t) => {
                                mu.setValue(e, t.event.text)
                            })), Us(Kr(), (e => {
                                o.onAction(mu.getValue(e))
                            })), Us(Qr(), (e => {
                                o.onAction(mu.getValue(e))
                            }))]), Hp.config({
                                mode: "special",
                                onEnter: e => (l(w, !0, !0), A.some(!0)),
                                onEscape: u,
                                onUp: e => (d(!0, !1), A.some(!0)),
                                onDown: e => (c(!0, !1), A.some(!0)),
                                onLeft: (e, t) => (t.cut(), A.none()),
                                onRight: (e, t) => (t.cut(), A.none())
                            })])
                        })],
                        behaviours: kl([eh.config({}), Hp.config({
                            mode: "special",
                            onEnter: m,
                            onSpace: m,
                            onEscape: u
                        }), Kp("input-wrapper-events", [Us(qr(), (e => {
                            L([p, h], (t => {
                                const o = Ve(t.get(e).element.dom);
                                Fl(o) && Bl(o)
                            }))
                        }))])])
                    });
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-number-input"]
                    },
                    components: [p.asSpec(), f.asSpec(), h.asSpec()],
                    behaviours: kl([eh.config({}), Hp.config({
                        mode: "flow",
                        focusInside: mg.OnEnterOrSpaceMode,
                        cycles: !1,
                        selector: "button, .tox-input-wrapper",
                        onEscape: e => Fl(e.element) ? A.none() : (Dl(e.element), A.some(!0))
                    })])
                }
            })(e, t, (e => ({
                updateInputValue: t => Is(t, $C, {
                    text: e.queryCommandValue("FontSize")
                }),
                getConfigFromUnit: UM,
                onAction: (t, o) => e.execCommand("FontSize", !1, t, {
                    skip_focus: !o
                })
            }))(e)),
            fontfamily: (e, t) => kM(e, t, BM(e)),
            blocks: (e, t) => kM(e, t, AM(e)),
            align: (e, t) => kM(e, t, TM(e))
        },
        lD = (e, t, o, n) => {
            const r = (e => {
                    const t = e.toolbar,
                        o = e.buttons;
                    return !1 === t ? [] : void 0 === t || !0 === t ? (e => {
                        const t = H(rD, (t => {
                            const o = U(t.items, (t => ve(e, t) || ve(iD, t)));
                            return {
                                name: t.name,
                                items: o
                            }
                        }));
                        return U(t, (e => e.items.length > 0))
                    })(o) : s(t) ? (e => {
                        const t = e.split("|");
                        return H(t, (e => ({
                            items: e.trim().split(" ")
                        })))
                    })(t) : (e => f(e, (e => ve(e, "name") && ve(e, "items"))))(t) ? t : (console.error("Toolbar type should be string, string[], boolean or ToolbarGroup[]"), [])
                })(t),
                a = H(r, (r => {
                    const s = X(r.items, (r => 0 === r.trim().length ? [] : ((e, t, o, n, r, s) => be(t, o.toLowerCase()).orThunk((() => s.bind((e => se(e, (e => be(t, e + o.toLowerCase()))))))).fold((() => be(iD, o.toLowerCase()).map((t => t(e, r)))), (t => "grouptoolbarbutton" !== t.type || n ? ((e, t, o) => be(aD, e.type).fold((() => (console.error("skipping button defined by", e), A.none())), (n => A.some(n(e, t, o)))))(t, r, e) : (console.warn(`Ignoring the '${o}' toolbar button. Group toolbar buttons are only supported when using floating toolbar mode and cannot be nested.`), A.none()))))(e, t.buttons, r, t.allowToolbarGroups, o, n).toArray()));
                    return {
                        title: A.from(e.translate(r.name)),
                        items: s
                    }
                }));
            return U(a, (e => e.items.length > 0))
        },
        cD = (e, t, o, n) => {
            const r = t.mainUi.outerContainer,
                a = o.toolbar,
                i = o.buttons;
            if (f(a, s)) {
                const t = a.map((t => {
                    const r = {
                        toolbar: t,
                        buttons: i,
                        allowToolbarGroups: o.allowToolbarGroups
                    };
                    return lD(e, r, n, A.none())
                }));
                aM.setToolbars(r, t)
            } else aM.setToolbar(r, lD(e, o, n, A.none()))
        },
        dD = Do(),
        uD = dD.os.isiOS() && dD.os.version.major <= 12;
    var mD = Object.freeze({
        __proto__: null,
        render: async (e, t, o, n, r) => {
            const {
                mainUi: s,
                uiMotherships: a
            } = t, i = Er(0), l = s.outerContainer;
            await hM(e);
            const d = Ve(r.targetNode),
                u = ft(ht(d));
            Fd(d, s.mothership), ((e, t, o) => {
                sb(e) && Fd(o.mainUi.mothership.element, o.popupUi.mothership), Bd(t, o.dialogUi.mothership)
            })(e, u, t), e.on("PostRender", (() => {
                aM.setSidebar(l, o.sidebar, jf(e)), cD(e, t, o, n), i.set(e.getWin().innerWidth), aM.setMenubar(l, cM(e, o)), aM.setViews(l, o.views), ((e, t) => {
                    const {
                        uiMotherships: o
                    } = t, n = e.dom;
                    let r = e.getWin();
                    const s = e.getDoc().documentElement,
                        a = Er($t(r.innerWidth, r.innerHeight)),
                        i = Er($t(s.offsetWidth, s.offsetHeight)),
                        l = () => {
                            const t = a.get();
                            t.left === r.innerWidth && t.top === r.innerHeight || (a.set($t(r.innerWidth, r.innerHeight)), lx(e))
                        },
                        c = () => {
                            const t = e.getDoc().documentElement,
                                o = i.get();
                            o.left === t.offsetWidth && o.top === t.offsetHeight || (i.set($t(t.offsetWidth, t.offsetHeight)), lx(e))
                        },
                        d = t => {
                            ((e, t) => {
                                e.dispatch("ScrollContent", t)
                            })(e, t)
                        };
                    n.bind(r, "resize", l), n.bind(r, "scroll", d);
                    const u = oc(Ve(e.getBody()), "load", c);
                    e.on("hide", (() => {
                        L(o, (e => {
                            Dt(e.element, "display", "none")
                        }))
                    })), e.on("show", (() => {
                        L(o, (e => {
                            Ht(e.element, "display")
                        }))
                    })), e.on("NodeChange", c), e.on("remove", (() => {
                        u.unbind(), n.unbind(r, "resize", l), n.unbind(r, "scroll", d), r = null
                    }))
                })(e, t)
            }));
            const m = aM.getSocket(l).getOrDie("Could not find expected socket element");
            if (uD) {
                Bt(m.element, {
                    overflow: "scroll",
                    "-webkit-overflow-scrolling": "touch"
                });
                const t = ((e, t) => {
                        let o = null;
                        return {
                            cancel: () => {
                                c(o) || (clearTimeout(o), o = null)
                            },
                            throttle: (...t) => {
                                c(o) && (o = setTimeout((() => {
                                    o = null, e.apply(null, t)
                                }), 20))
                            }
                        }
                    })((() => {
                        e.dispatch("ScrollContent")
                    })),
                    o = tc(m.element, "scroll", t.throttle);
                e.on("remove", o.unbind)
            }
            fy(e, t), e.addCommand("ToggleSidebar", ((t, o) => {
                aM.toggleSidebar(l, o), e.dispatch("ToggleSidebar")
            })), e.addQueryValueHandler("ToggleSidebar", (() => {
                var e;
                return null !== (e = aM.whichSidebar(l)) && void 0 !== e ? e : ""
            })), e.addCommand("ToggleView", ((t, o) => {
                if (aM.toggleView(l, o)) {
                    const t = l.element;
                    s.mothership.broadcastOn([qd()], {
                        target: t
                    }), L(a, (e => {
                        e.broadcastOn([qd()], {
                            target: t
                        })
                    })), c(aM.whichView(l)) && (e.focus(), e.nodeChanged())
                }
            })), e.addQueryValueHandler("ToggleView", (() => {
                var e;
                return null !== (e = aM.whichView(l)) && void 0 !== e ? e : ""
            }));
            const g = Sf(e);
            g !== tf.sliding && g !== tf.floating || e.on("ResizeWindow ResizeEditor ResizeContent", (() => {
                const o = e.getWin().innerWidth;
                o !== i.get() && (aM.refreshToolbar(t.mainUi.outerContainer), i.set(o))
            }));
            const p = {
                setEnabled: e => {
                    hy(t, !e)
                },
                isEnabled: () => !Fm.isDisabled(l)
            };
            return {
                iframeContainer: m.element.dom,
                editorContainer: l.element.dom,
                api: p
            }
        }
    });
    const gD = e => /^[0-9\.]+(|px)$/i.test("" + e) ? A.some(parseInt("" + e, 10)) : A.none(),
        pD = e => h(e) ? e + "px" : e,
        hD = (e, t, o) => {
            const n = t.filter((t => e < t)),
                r = o.filter((t => e > t));
            return n.or(r).getOr(e)
        },
        fD = e => {
            const t = mf(e),
                o = gf(e),
                n = hf(e);
            return gD(t).map((e => hD(e, o, n)))
        },
        {
            ToolbarLocation: bD,
            ToolbarMode: vD
        } = ib,
        yD = (e, t, o, n, r) => {
            const {
                mainUi: s,
                uiMotherships: a
            } = o, i = nf.DOM, l = tb(e), c = rb(e), d = hf(e).or(fD(e)), u = n.shared.header, m = u.isPositionedAtTop, g = Sf(e), p = g === vD.sliding || g === vD.floating, h = Er(!1), f = () => h.get() && !e.removed, b = e => p ? e.fold(x(0), (e => e.components().length > 1 ? Wt(e.components()[1].element) : 0)) : 0, v = () => {
                L(a, (e => {
                    e.broadcastOn([Xd()], {})
                }))
            }, y = o => {
                if (!f()) return;
                l || r.on((e => {
                    const o = d.getOrThunk((() => {
                        const e = gD(It(xt(), "margin-left")).getOr(0);
                        return Jt(xt()) - Xt(t).left + e
                    }));
                    Dt(e.element, "max-width", o + "px")
                }));
                const n = l ? A.none() : (() => {
                    if (l) return A.none();
                    if (Xt(s.outerContainer.element).left + Zt(s.outerContainer.element) >= window.innerWidth - 40 || Nt(s.outerContainer.element, "width").isSome()) {
                        Dt(s.outerContainer.element, "position", "absolute"), Dt(s.outerContainer.element, "left", "0px"), Ht(s.outerContainer.element, "width");
                        const e = Zt(s.outerContainer.element);
                        return A.some(e)
                    }
                    return A.none()
                })();
                p && aM.refreshToolbar(s.outerContainer), l || (o => {
                    r.on((n => {
                        const r = aM.getToolbar(s.outerContainer),
                            a = b(r),
                            i = Jo(t),
                            {
                                top: l,
                                left: c
                            } = ((e, t) => sb(e) ? $T(t) : A.none())(e, s.outerContainer.element).fold((() => ({
                                top: m() ? Math.max(i.y - Wt(n.element) + a, 0) : i.bottom,
                                left: i.x
                            })), (e => {
                                var t;
                                const o = Jo(e),
                                    r = null !== (t = e.dom.scrollTop) && void 0 !== t ? t : 0,
                                    s = Ze(e, xt()),
                                    l = s ? Math.max(i.y - Wt(n.element) + a, 0) : i.y - o.y + r - Wt(n.element) + a;
                                return {
                                    top: m() ? l : i.bottom,
                                    left: s ? i.x : i.x - o.x
                                }
                            })),
                            d = {
                                position: "absolute",
                                left: Math.round(c) + "px",
                                top: Math.round(l) + "px"
                            },
                            u = o.map((e => {
                                const t = Uo(),
                                    o = window.innerWidth - (c - t.left);
                                return {
                                    width: Math.max(Math.min(e, o), 150) + "px"
                                }
                            })).getOr({});
                        Bt(s.outerContainer.element, {
                            ...d,
                            ...u
                        })
                    }))
                })(n), c && r.on(o), v()
            }, w = () => !(l || !c || !f()) && r.get().exists((o => {
                const n = u.getDockingMode(),
                    a = (o => {
                        switch (Cf(e)) {
                            case bD.auto:
                                const e = aM.getToolbar(s.outerContainer),
                                    n = b(e),
                                    r = Wt(o.element) - n,
                                    a = Jo(t);
                                if (a.y > r) return "top"; {
                                    const e = ot(t),
                                        o = Math.max(e.dom.scrollHeight, Wt(e));
                                    return a.bottom < o - r || en().bottom < a.bottom - r ? "bottom" : "top"
                                }
                                case bD.bottom:
                                    return "bottom";
                                case bD.top:
                                default:
                                    return "top"
                        }
                    })(o);
                return a !== n && (i = a, r.on((e => {
                    vE.setModes(e, [i]), u.setDockingMode(i);
                    const t = m() ? vc.TopToBottom : vc.BottomToTop;
                    kt(e.element, yc, t)
                })), !0);
                var i
            }));
            return {
                isVisible: f,
                isPositionedAtTop: m,
                show: () => {
                    h.set(!0), Dt(s.outerContainer.element, "display", "flex"), i.addClass(e.getBody(), "mce-edit-focus"), L(a, (e => {
                        Ht(e.element, "display")
                    })), w(), sb(e) ? y((e => vE.isDocked(e) ? vE.reset(e) : vE.refresh(e))) : y(vE.refresh)
                },
                hide: () => {
                    h.set(!1), Dt(s.outerContainer.element, "display", "none"), i.removeClass(e.getBody(), "mce-edit-focus"), L(a, (e => {
                        Dt(e.element, "display", "none")
                    }))
                },
                update: y,
                updateMode: () => {
                    w() && y(vE.reset)
                },
                repositionPopups: v
            }
        },
        xD = (e, t) => {
            const o = Jo(e);
            return {
                pos: t ? o.y : o.bottom,
                bounds: o
            }
        };
    var wD = Object.freeze({
        __proto__: null,
        render: async (e, t, o, n, r) => {
            const {
                mainUi: s
            } = t, a = Ql(), i = Ve(r.targetNode), l = yD(e, i, t, n, a), c = Tf(e);
            await fM(e);
            const d = () => {
                if (a.isSet()) return void l.show();
                a.set(aM.getHeader(s.outerContainer).getOrDie());
                const r = ob(e);
                sb(e) ? (Fd(i, s.mothership), Fd(i, t.popupUi.mothership)) : Bd(r, s.mothership), Bd(r, t.dialogUi.mothership), cD(e, t, o, n), aM.setMenubar(s.outerContainer, cM(e, o)), l.show(), ((e, t, o, n) => {
                    const r = Er(xD(t, o.isPositionedAtTop())),
                        s = n => {
                            const {
                                pos: s,
                                bounds: a
                            } = xD(t, o.isPositionedAtTop()), {
                                pos: i,
                                bounds: l
                            } = r.get(), c = a.height !== l.height || a.width !== l.width;
                            r.set({
                                pos: s,
                                bounds: a
                            }), c && lx(e, n), o.isVisible() && (i !== s ? o.update(vE.reset) : c && (o.updateMode(), o.repositionPopups()))
                        };
                    n || (e.on("activate", o.show), e.on("deactivate", o.hide)), e.on("SkinLoaded ResizeWindow", (() => o.update(vE.reset))), e.on("NodeChange keydown", (e => {
                        requestAnimationFrame((() => s(e)))
                    }));
                    let a = 0;
                    const i = HO((() => o.update(vE.refresh)), 33);
                    e.on("ScrollWindow", (() => {
                        const e = Uo().left;
                        e !== a && (a = e, i.throttle()), o.updateMode()
                    })), sb(e) && e.on("ElementScroll", (e => {
                        o.update(vE.refresh)
                    }));
                    const l = Zl();
                    l.set(oc(Ve(e.getBody()), "load", (e => s(e.raw)))), e.on("remove", (() => {
                        l.clear()
                    }))
                })(e, i, l, c), e.nodeChanged()
            };
            e.on("show", d), e.on("hide", l.hide), c || (e.on("focus", d), e.on("blur", l.hide)), e.on("init", (() => {
                (e.hasFocus() || c) && d()
            })), fy(e, t);
            const u = {
                show: d,
                hide: l.hide,
                setEnabled: e => {
                    hy(t, !e)
                },
                isEnabled: () => !Fm.isDisabled(s.outerContainer)
            };
            return {
                editorContainer: s.outerContainer.element.dom,
                api: u
            }
        }
    });
    const SD = "contexttoolbar-hide",
        kD = (e, t) => Us(zC, ((o, n) => {
            const r = (e => ({
                hide: () => Fs(e, hs()),
                getValue: () => mu.getValue(e)
            }))(e.get(o));
            t.onAction(r, n.event.buttonApi)
        })),
        CD = (e, t) => {
            const o = e.label.fold((() => ({})), (e => ({
                    "aria-label": e
                }))),
                n = Uh(Fb.sketch({
                    inputClasses: ["tox-toolbar-textfield", "tox-toolbar-nav-js"],
                    data: e.initValue(),
                    inputAttributes: o,
                    selectOnFocus: !0,
                    inputBehaviours: kl([Hp.config({
                        mode: "special",
                        onEnter: e => r.findPrimary(e).map((e => (Rs(e), !0))),
                        onLeft: (e, t) => (t.cut(), A.none()),
                        onRight: (e, t) => (t.cut(), A.none())
                    })])
                })),
                r = ((e, t, o) => {
                    const n = H(t, (t => Uh(((e, t, o) => (e => "contextformtogglebutton" === e.type)(t) ? ((e, t, o) => {
                        const {
                            primary: n,
                            ...r
                        } = t.original, s = Xn(Dv({
                            ...r,
                            type: "togglebutton",
                            onAction: b
                        }));
                        return oD(s, o, [kD(e, t)])
                    })(e, t, o) : ((e, t, o) => {
                        const {
                            primary: n,
                            ...r
                        } = t.original, s = Xn(Ev({
                            ...r,
                            type: "button",
                            onAction: b
                        }));
                        return tD(s, o, [kD(e, t)])
                    })(e, t, o))(e, t, o))));
                    return {
                        asSpecs: () => H(n, (e => e.asSpec())),
                        findPrimary: e => se(t, ((t, o) => t.primary ? A.from(n[o]).bind((t => t.getOpt(e))).filter(C(Fm.isDisabled)) : A.none()))
                    }
                })(n, e.commands, t);
            return [{
                title: A.none(),
                items: [n.asSpec()]
            }, {
                title: A.none(),
                items: r.asSpecs()
            }]
        },
        OD = (e, t, o) => t.bottom - e.y >= o && e.bottom - t.y >= o,
        _D = e => {
            const t = (e => {
                const t = e.getBoundingClientRect();
                if (t.height <= 0 && t.width <= 0) {
                    const o = ut(Ve(e.startContainer), e.startOffset).element;
                    return ($e(o) ? rt(o) : A.some(o)).filter(Ge).map((e => e.dom.getBoundingClientRect())).getOr(t)
                }
                return t
            })(e.selection.getRng());
            if (e.inline) {
                const e = Uo();
                return Yo(e.left + t.left, e.top + t.top, t.width, t.height)
            } {
                const o = Zo(Ve(e.getBody()));
                return Yo(o.x + t.left, o.y + t.top, t.width, t.height)
            }
        },
        TD = (e, t, o, n = 0) => {
            const r = Go(window),
                s = Jo(Ve(e.getContentAreaContainer())),
                a = qf(e) || Yf(e) || Zf(e),
                {
                    x: i,
                    width: l
                } = ((e, t, o) => {
                    const n = Math.max(e.x + o, t.x);
                    return {
                        x: n,
                        width: Math.min(e.right - o, t.right) - n
                    }
                })(s, r, n);
            if (e.inline && !a) return Yo(i, r.y, l, r.height); {
                const a = t.header.isPositionedAtTop(),
                    {
                        y: c,
                        bottom: d
                    } = ((e, t, o, n, r, s) => {
                        const a = Ve(e.getContainer()),
                            i = pi(a, ".tox-editor-header").getOr(a),
                            l = Jo(i),
                            c = l.y >= t.bottom,
                            d = n && !c;
                        if (e.inline && d) return {
                            y: Math.max(l.bottom + s, o.y),
                            bottom: o.bottom
                        };
                        if (e.inline && !d) return {
                            y: o.y,
                            bottom: Math.min(l.y - s, o.bottom)
                        };
                        const u = "line" === r ? Jo(a) : t;
                        return d ? {
                            y: Math.max(l.bottom + s, o.y),
                            bottom: Math.min(u.bottom - s, o.bottom)
                        } : {
                            y: Math.max(u.y + s, o.y),
                            bottom: Math.min(l.y - s, o.bottom)
                        }
                    })(e, s, r, a, o, n);
                return Yo(i, c, l, d - c)
            }
        },
        ED = {
            valignCentre: [],
            alignCentre: [],
            alignLeft: ["tox-pop--align-left"],
            alignRight: ["tox-pop--align-right"],
            right: ["tox-pop--right"],
            left: ["tox-pop--left"],
            bottom: ["tox-pop--bottom"],
            top: ["tox-pop--top"],
            inset: ["tox-pop--inset"]
        },
        AD = {
            maxHeightFunction: cc(),
            maxWidthFunction: cA()
        },
        MD = e => "node" === e,
        DD = (e, t, o, n, r) => {
            const s = _D(e),
                a = n.lastElement().exists((e => Ze(o, e)));
            return ((e, t) => {
                const o = e.selection.getRng(),
                    n = ut(Ve(o.startContainer), o.startOffset);
                return o.startContainer === o.endContainer && o.startOffset === o.endOffset - 1 && Ze(n.element, t)
            })(e, o) ? a ? L_ : R_ : a ? ((e, o, r) => {
                const a = Nt(e, "position");
                Dt(e, "position", o);
                const i = OD(s, Jo(t), -20) && !n.isReposition() ? U_ : L_;
                return a.each((t => Dt(e, "position", t))), i
            })(t, n.getMode()) : ("fixed" === n.getMode() ? r.y + Uo().top : r.y) + (Wt(t) + 12) <= s.y ? R_ : N_
        },
        BD = (e, t, o, n) => {
            const r = t => (n, r, s, a, i) => ({
                    ...DD(e, a, t, o, i)({
                        ...n,
                        y: i.y,
                        height: i.height
                    }, r, s, a, i),
                    alwaysFit: !0
                }),
                s = e => MD(n) ? [r(e)] : [];
            return t ? {
                onLtr: e => [cl, rl, sl, al, il, ll].concat(s(e)),
                onRtl: e => [cl, sl, rl, il, al, ll].concat(s(e))
            } : {
                onLtr: e => [ll, cl, al, rl, il, sl].concat(s(e)),
                onRtl: e => [ll, cl, il, sl, al, rl].concat(s(e))
            }
        },
        FD = (e, t) => {
            const o = U(t, (t => t.predicate(e.dom))),
                {
                    pass: n,
                    fail: r
                } = P(o, (e => "contexttoolbar" === e.type));
            return {
                contextToolbars: n,
                contextForms: r
            }
        },
        ID = (e, t) => {
            const o = {},
                n = [],
                r = [],
                s = {},
                a = {},
                i = ae(e);
            return L(i, (i => {
                const l = e[i];
                "contextform" === l.type ? ((e, i) => {
                    const l = Xn(qn("ContextForm", zv, i));
                    o[e] = l, l.launch.map((o => {
                        s["form:" + e] = {
                            ...i.launch,
                            type: "contextformtogglebutton" === o.type ? "togglebutton" : "button",
                            onAction: () => {
                                t(l)
                            }
                        }
                    })), "editor" === l.scope ? r.push(l) : n.push(l), a[e] = l
                })(i, l) : "contexttoolbar" === l.type && ((e, t) => {
                    var o;
                    (o = t, qn("ContextToolbar", Hv, o)).each((o => {
                        "editor" === t.scope ? r.push(o) : n.push(o), a[e] = o
                    }))
                })(i, l)
            })), {
                forms: o,
                inNodeScope: n,
                inEditorScope: r,
                lookupTable: a,
                formNavigators: s
            }
        },
        RD = la("forward-slide"),
        ND = la("backward-slide"),
        VD = la("change-slide-event"),
        zD = "tox-pop--resizing",
        HD = "tox-pop--transition",
        LD = (e, t, o, n) => {
            const r = n.backstage,
                s = r.shared,
                a = Do().deviceType.isTouch,
                i = Ql(),
                l = Ql(),
                c = Ql(),
                d = si((e => {
                    const t = Er([]);
                    return Hh.sketch({
                        dom: {
                            tag: "div",
                            classes: ["tox-pop"]
                        },
                        fireDismissalEventInstead: {
                            event: "doNotDismissYet"
                        },
                        onShow: e => {
                            t.set([]), Hh.getContent(e).each((e => {
                                Ht(e.element, "visibility")
                            })), Pa(e.element, zD), Ht(e.element, "width")
                        },
                        inlineBehaviours: kl([Kp("context-toolbar-events", [Ks(os(), ((e, t) => {
                            "width" === t.event.raw.propertyName && (Pa(e.element, zD), Ht(e.element, "width"))
                        })), Us(VD, ((e, t) => {
                            const o = e.element;
                            Ht(o, "width");
                            const n = Jt(o);
                            Hh.setContent(e, t.event.contents), La(o, zD);
                            const r = Jt(o);
                            Dt(o, "width", n + "px"), Hh.getContent(e).each((e => {
                                t.event.focus.bind((e => (Dl(e), Rl(o)))).orThunk((() => (Hp.focusIn(e), Il(ht(o)))))
                            })), setTimeout((() => {
                                Dt(e.element, "width", r + "px")
                            }), 0)
                        })), Us(RD, ((e, o) => {
                            Hh.getContent(e).each((o => {
                                t.set(t.get().concat([{
                                    bar: o,
                                    focus: Il(ht(e.element))
                                }]))
                            })), Is(e, VD, {
                                contents: o.event.forwardContents,
                                focus: A.none()
                            })
                        })), Us(ND, ((e, o) => {
                            ne(t.get()).each((o => {
                                t.set(t.get().slice(0, t.get().length - 1)), Is(e, VD, {
                                    contents: ai(o.bar),
                                    focus: o.focus
                                })
                            }))
                        }))]), Hp.config({
                            mode: "special",
                            onEscape: o => ne(t.get()).fold((() => e.onEscape()), (e => (Fs(o, ND), A.some(!0))))
                        })]),
                        lazySink: () => rn.value(e.sink)
                    })
                })({
                    sink: o,
                    onEscape: () => (e.focus(), A.some(!0))
                })),
                u = () => {
                    const t = c.get().getOr("node"),
                        o = MD(t) ? 1 : 0;
                    return TD(e, s, t, o)
                },
                m = () => !(e.removed || a() && r.isContextMenuOpen()),
                g = () => {
                    if (m()) {
                        const t = u(),
                            o = xe(c.get(), "node") ? ((e, t) => t.filter((e => yt(e) && je(e))).map(Zo).getOrThunk((() => _D(e))))(e, i.get()) : _D(e);
                        return t.height <= 0 || !OD(o, t, .01)
                    }
                    return !0
                },
                p = () => {
                    i.clear(), l.clear(), c.clear(), Hh.hide(d)
                },
                h = () => {
                    if (Hh.isOpen(d)) {
                        const e = d.element;
                        Ht(e, "display"), g() ? Dt(e, "display", "none") : (l.set(0), Hh.reposition(d))
                    }
                },
                f = t => ({
                    dom: {
                        tag: "div",
                        classes: ["tox-pop__dialog"]
                    },
                    components: [t],
                    behaviours: kl([Hp.config({
                        mode: "acyclic"
                    }), Kp("pop-dialog-wrap-events", [Ys((t => {
                        e.shortcuts.add("ctrl+F9", "focus statusbar", (() => Hp.focusIn(t)))
                    })), Js((t => {
                        e.shortcuts.remove("ctrl+F9")
                    }))])])
                }),
                v = Qt((() => ID(t, (e => {
                    const t = y([e]);
                    Is(d, RD, {
                        forwardContents: f(t)
                    })
                })))),
                y = t => {
                    const {
                        buttons: o
                    } = e.ui.registry.getAll(), r = {
                        ...o,
                        ...v().formNavigators
                    }, a = Sf(e) === tf.scrolling ? tf.scrolling : tf.default, i = q(H(t, (t => "contexttoolbar" === t.type ? ((t, o) => lD(e, {
                        buttons: t,
                        toolbar: o.items,
                        allowToolbarGroups: !1
                    }, n.backstage, A.some(["form:"])))(r, t) : ((e, t) => CD(e, t))(t, s.providers))));
                    return IA({
                        type: a,
                        uid: la("context-toolbar"),
                        initGroups: i,
                        onEscape: A.none,
                        cyclicKeying: !0,
                        providers: s.providers
                    })
                },
                x = (t, n) => {
                    if (S.cancel(), !m()) return;
                    const r = y(t),
                        p = t[0].position,
                        h = ((t, n) => {
                            const r = "node" === t ? s.anchors.node(n) : s.anchors.cursor(),
                                c = ((e, t, o, n) => "line" === t ? {
                                    bubble: gc(12, 0, ED),
                                    layouts: {
                                        onLtr: () => [dl],
                                        onRtl: () => [ul]
                                    },
                                    overrides: AD
                                } : {
                                    bubble: gc(0, 12, ED, 1 / 12),
                                    layouts: BD(e, o, n, t),
                                    overrides: AD
                                })(e, t, a(), {
                                    lastElement: i.get,
                                    isReposition: () => xe(l.get(), 0),
                                    getMode: () => xd.getMode(o)
                                });
                            return fn(r, c)
                        })(p, n);
                    c.set(p), l.set(1);
                    const b = d.element;
                    Ht(b, "display"), (e => xe(Se(e, i.get(), Ze), !0))(n) || (Pa(b, HD), xd.reset(o, d)), Hh.showWithinBounds(d, f(r), {
                        anchor: h,
                        transition: {
                            classes: [HD],
                            mode: "placement"
                        }
                    }, (() => A.some(u()))), n.fold(i.clear, i.set), g() && Dt(b, "display", "none")
                };
            let w = !1;
            const S = HO((() => {
                !e.hasFocus() || e.removed || w || (Ua(d.element, HD) ? S.throttle() : ((e, t) => {
                    const o = Ve(t.getBody()),
                        n = e => Ze(e, o),
                        r = Ve(t.selection.getNode());
                    return (e => !n(e) && !Qe(o, e))(r) ? A.none() : ((e, t, o) => {
                        const n = FD(e, t);
                        if (n.contextForms.length > 0) return A.some({
                            elem: e,
                            toolbars: [n.contextForms[0]]
                        }); {
                            const t = FD(e, o);
                            if (t.contextForms.length > 0) return A.some({
                                elem: e,
                                toolbars: [t.contextForms[0]]
                            });
                            if (n.contextToolbars.length > 0 || t.contextToolbars.length > 0) {
                                const o = (e => {
                                    if (e.length <= 1) return e; {
                                        const t = t => N(e, (e => e.position === t)),
                                            o = t => U(e, (e => e.position === t)),
                                            n = t("selection"),
                                            r = t("node");
                                        if (n || r) {
                                            if (r && n) {
                                                const e = o("node"),
                                                    t = H(o("selection"), (e => ({
                                                        ...e,
                                                        position: "node"
                                                    })));
                                                return e.concat(t)
                                            }
                                            return o(n ? "selection" : "node")
                                        }
                                        return o("line")
                                    }
                                })(n.contextToolbars.concat(t.contextToolbars));
                                return A.some({
                                    elem: e,
                                    toolbars: o
                                })
                            }
                            return A.none()
                        }
                    })(r, e.inNodeScope, e.inEditorScope).orThunk((() => ((e, t, o) => e(t) ? A.none() : Fr(t, (e => {
                        if (Ge(e)) {
                            const {
                                contextToolbars: t,
                                contextForms: n
                            } = FD(e, o.inNodeScope), r = n.length > 0 ? n : (e => {
                                if (e.length <= 1) return e; {
                                    const t = t => G(e, (e => e.position === t));
                                    return t("selection").orThunk((() => t("node"))).orThunk((() => t("line"))).map((e => e.position)).fold((() => []), (t => U(e, (e => e.position === t))))
                                }
                            })(t);
                            return r.length > 0 ? A.some({
                                elem: e,
                                toolbars: r
                            }) : A.none()
                        }
                        return A.none()
                    }), e))(n, r, e)))
                })(v(), e).fold(p, (e => {
                    x(e.toolbars, A.some(e.elem))
                })))
            }), 17);
            e.on("init", (() => {
                e.on("remove", p), e.on("ScrollContent ScrollWindow ObjectResized ResizeEditor longpress", h), e.on("click keyup focus SetContent", S.throttle), e.on(SD, p), e.on("contexttoolbar-show", (t => {
                    const o = v();
                    be(o.lookupTable, t.toolbarKey).each((o => {
                        x([o], Ce(t.target !== e, t.target)), Hh.getContent(d).each(Hp.focusIn)
                    }))
                })), e.on("focusout", (t => {
                    Lh.setEditorTimeout(e, (() => {
                        Rl(o.element).isNone() && Rl(d.element).isNone() && p()
                    }), 0)
                })), e.on("SwitchMode", (() => {
                    e.mode.isReadOnly() && p()
                })), e.on("AfterProgressState", (t => {
                    t.state ? p() : e.hasFocus() && S.throttle()
                })), e.on("dragstart", (() => {
                    w = !0
                })), e.on("dragend drop", (() => {
                    w = !1
                })), e.on("NodeChange", (e => {
                    Rl(d.element).fold(S.throttle, b)
                }))
            }))
        },
        PD = (e, t) => {
            const o = () => {
                const o = t.getOptions(e),
                    n = t.getCurrent(e).map(t.hash),
                    r = Ql();
                return H(o, (o => ({
                    type: "togglemenuitem",
                    text: t.display(o),
                    onSetup: s => {
                        const a = e => {
                            e && (r.on((e => e.setActive(!1))), r.set(s)), s.setActive(e)
                        };
                        a(xe(n, t.hash(o)));
                        const i = t.watcher(e, o, a);
                        return () => {
                            r.clear(), i()
                        }
                    },
                    onAction: () => t.setCurrent(e, o)
                })))
            };
            e.ui.registry.addMenuButton(t.name, {
                tooltip: t.text,
                icon: t.icon,
                fetch: e => e(o()),
                onSetup: t.onToolbarSetup
            }), e.ui.registry.addNestedMenuItem(t.name, {
                type: "nestedmenuitem",
                text: t.text,
                getSubmenuItems: o,
                onSetup: t.onMenuSetup
            })
        },
        UD = {
            name: "lineheight",
            text: "Line height",
            icon: "line-height",
            getOptions: Kf,
            hash: e => ((e, t) => NM(e, ["fixed", "relative", "empty"]).map((({
                value: e,
                unit: t
            }) => e + t)))(e).getOr(e),
            display: w,
            watcher: (e, t, o) => e.formatter.formatChanged("lineheight", o, !1, {
                value: t
            }).unbind,
            getCurrent: e => A.from(e.queryCommandValue("LineHeight")),
            setCurrent: (e, t) => e.execCommand("LineHeight", !1, t)
        },
        WD = e => vM(e, "NodeChange", (t => {
            t.setEnabled(e.queryCommandState("outdent"))
        })),
        jD = (e, t) => o => {
            o.setActive(t.get());
            const n = e => {
                t.set(e.state), o.setActive(e.state)
            };
            return e.on("PastePlainTextToggle", n), () => e.off("PastePlainTextToggle", n)
        },
        GD = (e, t) => () => {
            e.execCommand("mceToggleFormat", !1, t)
        },
        $D = e => {
            (e => {
                (e => {
                    MC.each([{
                        name: "bold",
                        text: "Bold",
                        icon: "bold"
                    }, {
                        name: "italic",
                        text: "Italic",
                        icon: "italic"
                    }, {
                        name: "underline",
                        text: "Underline",
                        icon: "underline"
                    }, {
                        name: "strikethrough",
                        text: "Strikethrough",
                        icon: "strike-through"
                    }, {
                        name: "subscript",
                        text: "Subscript",
                        icon: "subscript"
                    }, {
                        name: "superscript",
                        text: "Superscript",
                        icon: "superscript"
                    }], ((t, o) => {
                        e.ui.registry.addToggleButton(t.name, {
                            tooltip: t.text,
                            icon: t.icon,
                            onSetup: bM(e, t.name),
                            onAction: GD(e, t.name)
                        })
                    }));
                    for (let t = 1; t <= 6; t++) {
                        const o = "h" + t;
                        e.ui.registry.addToggleButton(o, {
                            text: o.toUpperCase(),
                            tooltip: "Heading " + t,
                            onSetup: bM(e, o),
                            onAction: GD(e, o)
                        })
                    }
                })(e), (e => {
                    MC.each([{
                        name: "cut",
                        text: "Cut",
                        action: "Cut",
                        icon: "cut"
                    }, {
                        name: "copy",
                        text: "Copy",
                        action: "Copy",
                        icon: "copy"
                    }, {
                        name: "paste",
                        text: "Paste",
                        action: "Paste",
                        icon: "paste"
                    }, {
                        name: "help",
                        text: "Help",
                        action: "mceHelp",
                        icon: "help"
                    }, {
                        name: "selectall",
                        text: "Select all",
                        action: "SelectAll",
                        icon: "select-all"
                    }, {
                        name: "newdocument",
                        text: "New document",
                        action: "mceNewDocument",
                        icon: "new-document"
                    }, {
                        name: "removeformat",
                        text: "Clear formatting",
                        action: "RemoveFormat",
                        icon: "remove-formatting"
                    }, {
                        name: "remove",
                        text: "Remove",
                        action: "Delete",
                        icon: "remove"
                    }, {
                        name: "print",
                        text: "Print",
                        action: "mcePrint",
                        icon: "print"
                    }, {
                        name: "hr",
                        text: "Horizontal line",
                        action: "InsertHorizontalRule",
                        icon: "horizontal-rule"
                    }], (t => {
                        e.ui.registry.addButton(t.name, {
                            tooltip: t.text,
                            icon: t.icon,
                            onAction: xM(e, t.action)
                        })
                    }))
                })(e), (e => {
                    MC.each([{
                        name: "blockquote",
                        text: "Blockquote",
                        action: "mceBlockQuote",
                        icon: "quote"
                    }], (t => {
                        e.ui.registry.addToggleButton(t.name, {
                            tooltip: t.text,
                            icon: t.icon,
                            onAction: xM(e, t.action),
                            onSetup: bM(e, t.name)
                        })
                    }))
                })(e)
            })(e), (e => {
                MC.each([{
                    name: "bold",
                    text: "Bold",
                    action: "Bold",
                    icon: "bold",
                    shortcut: "Meta+B"
                }, {
                    name: "italic",
                    text: "Italic",
                    action: "Italic",
                    icon: "italic",
                    shortcut: "Meta+I"
                }, {
                    name: "underline",
                    text: "Underline",
                    action: "Underline",
                    icon: "underline",
                    shortcut: "Meta+U"
                }, {
                    name: "strikethrough",
                    text: "Strikethrough",
                    action: "Strikethrough",
                    icon: "strike-through"
                }, {
                    name: "subscript",
                    text: "Subscript",
                    action: "Subscript",
                    icon: "subscript"
                }, {
                    name: "superscript",
                    text: "Superscript",
                    action: "Superscript",
                    icon: "superscript"
                }, {
                    name: "removeformat",
                    text: "Clear formatting",
                    action: "RemoveFormat",
                    icon: "remove-formatting"
                }, {
                    name: "newdocument",
                    text: "New document",
                    action: "mceNewDocument",
                    icon: "new-document"
                }, {
                    name: "cut",
                    text: "Cut",
                    action: "Cut",
                    icon: "cut",
                    shortcut: "Meta+X"
                }, {
                    name: "copy",
                    text: "Copy",
                    action: "Copy",
                    icon: "copy",
                    shortcut: "Meta+C"
                }, {
                    name: "paste",
                    text: "Paste",
                    action: "Paste",
                    icon: "paste",
                    shortcut: "Meta+V"
                }, {
                    name: "selectall",
                    text: "Select all",
                    action: "SelectAll",
                    icon: "select-all",
                    shortcut: "Meta+A"
                }, {
                    name: "print",
                    text: "Print...",
                    action: "mcePrint",
                    icon: "print",
                    shortcut: "Meta+P"
                }, {
                    name: "hr",
                    text: "Horizontal line",
                    action: "InsertHorizontalRule",
                    icon: "horizontal-rule"
                }], (t => {
                    e.ui.registry.addMenuItem(t.name, {
                        text: t.text,
                        icon: t.icon,
                        shortcut: t.shortcut,
                        onAction: xM(e, t.action)
                    })
                })), e.ui.registry.addMenuItem("codeformat", {
                    text: "Code",
                    icon: "sourcecode",
                    onAction: GD(e, "code")
                })
            })(e)
        },
        qD = (e, t) => vM(e, "Undo Redo AddUndo TypingUndo ClearUndos SwitchMode", (o => {
            o.setEnabled(!e.mode.isReadOnly() && e.undoManager[t]())
        })),
        XD = e => vM(e, "VisualAid", (t => {
            t.setActive(e.hasVisual)
        })),
        KD = (e, t) => {
            (e => {
                L([{
                    name: "alignleft",
                    text: "Align left",
                    cmd: "JustifyLeft",
                    icon: "align-left"
                }, {
                    name: "aligncenter",
                    text: "Align center",
                    cmd: "JustifyCenter",
                    icon: "align-center"
                }, {
                    name: "alignright",
                    text: "Align right",
                    cmd: "JustifyRight",
                    icon: "align-right"
                }, {
                    name: "alignjustify",
                    text: "Justify",
                    cmd: "JustifyFull",
                    icon: "align-justify"
                }], (t => {
                    e.ui.registry.addToggleButton(t.name, {
                        tooltip: t.text,
                        icon: t.icon,
                        onAction: xM(e, t.cmd),
                        onSetup: bM(e, t.name)
                    })
                })), e.ui.registry.addButton("alignnone", {
                    tooltip: "No alignment",
                    icon: "align-none",
                    onAction: xM(e, "JustifyNone")
                })
            })(e), $D(e), ((e, t) => {
                ((e, t) => {
                    const o = SM(0, t, TM(e));
                    e.ui.registry.addNestedMenuItem("align", {
                        text: t.shared.providers.translate("Align"),
                        getSubmenuItems: () => o.items.validateItems(o.getStyleItems())
                    })
                })(e, t), ((e, t) => {
                    const o = SM(0, t, BM(e));
                    e.ui.registry.addNestedMenuItem("fontfamily", {
                        text: t.shared.providers.translate("Fonts"),
                        getSubmenuItems: () => o.items.validateItems(o.getStyleItems())
                    })
                })(e, t), ((e, t) => {
                    const o = {
                            type: "advanced",
                            ...t.styles
                        },
                        n = SM(0, t, WM(e, o));
                    e.ui.registry.addNestedMenuItem("styles", {
                        text: "Formats",
                        getSubmenuItems: () => n.items.validateItems(n.getStyleItems())
                    })
                })(e, t), ((e, t) => {
                    const o = SM(0, t, AM(e));
                    e.ui.registry.addNestedMenuItem("blocks", {
                        text: "Blocks",
                        getSubmenuItems: () => o.items.validateItems(o.getStyleItems())
                    })
                })(e, t), ((e, t) => {
                    const o = SM(0, t, PM(e));
                    e.ui.registry.addNestedMenuItem("fontsize", {
                        text: "Font sizes",
                        getSubmenuItems: () => o.items.validateItems(o.getStyleItems())
                    })
                })(e, t)
            })(e, t), (e => {
                (e => {
                    e.ui.registry.addMenuItem("undo", {
                        text: "Undo",
                        icon: "undo",
                        shortcut: "Meta+Z",
                        onSetup: qD(e, "hasUndo"),
                        onAction: xM(e, "undo")
                    }), e.ui.registry.addMenuItem("redo", {
                        text: "Redo",
                        icon: "redo",
                        shortcut: "Meta+Y",
                        onSetup: qD(e, "hasRedo"),
                        onAction: xM(e, "redo")
                    })
                })(e), (e => {
                    e.ui.registry.addButton("undo", {
                        tooltip: "Undo",
                        icon: "undo",
                        enabled: !1,
                        onSetup: qD(e, "hasUndo"),
                        onAction: xM(e, "undo")
                    }), e.ui.registry.addButton("redo", {
                        tooltip: "Redo",
                        icon: "redo",
                        enabled: !1,
                        onSetup: qD(e, "hasRedo"),
                        onAction: xM(e, "redo")
                    })
                })(e)
            })(e), (e => {
                (e => {
                    e.addCommand("mceApplyTextcolor", ((t, o) => {
                        ((e, t, o) => {
                            e.undoManager.transact((() => {
                                e.focus(), e.formatter.apply(t, {
                                    value: o
                                }), e.nodeChanged()
                            }))
                        })(e, t, o)
                    })), e.addCommand("mceRemoveTextcolor", (t => {
                        ((e, t) => {
                            e.undoManager.transact((() => {
                                e.focus(), e.formatter.remove(t, {
                                    value: null
                                }, void 0, !0), e.nodeChanged()
                            }))
                        })(e, t)
                    }))
                })(e);
                const t = Ax(e),
                    o = Mx(e),
                    n = Er(t),
                    r = Er(o);
                zx(e, "forecolor", "forecolor", "Text color", n), zx(e, "backcolor", "hilitecolor", "Background color", r), Hx(e, "forecolor", "forecolor", "Text color", n), Hx(e, "backcolor", "hilitecolor", "Background color", r)
            })(e), (e => {
                (e => {
                    e.ui.registry.addButton("visualaid", {
                        tooltip: "Visual aids",
                        text: "Visual aids",
                        onAction: xM(e, "mceToggleVisualAid")
                    })
                })(e), (e => {
                    e.ui.registry.addToggleMenuItem("visualaid", {
                        text: "Visual aids",
                        onSetup: XD(e),
                        onAction: xM(e, "mceToggleVisualAid")
                    })
                })(e)
            })(e), (e => {
                (e => {
                    e.ui.registry.addButton("outdent", {
                        tooltip: "Decrease indent",
                        icon: "outdent",
                        onSetup: WD(e),
                        onAction: xM(e, "outdent")
                    }), e.ui.registry.addButton("indent", {
                        tooltip: "Increase indent",
                        icon: "indent",
                        onAction: xM(e, "indent")
                    })
                })(e)
            })(e), (e => {
                PD(e, UD), (e => A.from(xf(e)).map((t => ({
                    name: "language",
                    text: "Language",
                    icon: "language",
                    getOptions: x(t),
                    hash: e => u(e.customCode) ? e.code : `${e.code}/${e.customCode}`,
                    display: e => e.title,
                    watcher: (e, t, o) => {
                        var n;
                        return e.formatter.formatChanged("lang", o, !1, {
                            value: t.code,
                            customValue: null !== (n = t.customCode) && void 0 !== n ? n : null
                        }).unbind
                    },
                    getCurrent: e => {
                        const t = Ve(e.selection.getNode());
                        return Ir(t, (e => A.some(e).filter(Ge).bind((e => _t(e, "lang").map((t => ({
                            code: t,
                            customCode: _t(e, "data-mce-lang").getOrUndefined(),
                            title: ""
                        })))))))
                    },
                    setCurrent: (e, t) => e.execCommand("Lang", !1, t),
                    onToolbarSetup: t => {
                        const o = Zl();
                        return t.setActive(e.formatter.match("lang", {}, void 0, !0)), o.set(e.formatter.formatChanged("lang", t.setActive, !0)), o.clear
                    }
                }))))(e).each((t => PD(e, t)))
            })(e), (e => {
                const t = Er(Wf(e)),
                    o = () => e.execCommand("mceTogglePlainTextPaste");
                e.ui.registry.addToggleButton("pastetext", {
                    active: !1,
                    icon: "paste-text",
                    tooltip: "Paste as text",
                    onAction: o,
                    onSetup: jD(e, t)
                }), e.ui.registry.addToggleMenuItem("pastetext", {
                    text: "Paste as text",
                    icon: "paste-text",
                    onAction: o,
                    onSetup: jD(e, t)
                })
            })(e)
        },
        YD = e => s(e) ? e.split(/[ ,]/) : e,
        JD = e => t => t.options.get(e),
        ZD = JD("contextmenu_never_use_native"),
        QD = JD("contextmenu_avoid_overlap"),
        eB = e => {
            const t = e.ui.registry.getAll().contextMenus,
                o = e.options.get("contextmenu");
            return e.options.isSet("contextmenu") ? o : U(o, (e => ve(t, e)))
        },
        tB = (e, t) => ({
            type: "makeshift",
            x: e,
            y: t
        }),
        oB = e => "longpress" === e.type || 0 === e.type.indexOf("touch"),
        nB = (e, t) => "contextmenu" === t.type || "longpress" === t.type ? e.inline ? (e => {
            if (oB(e)) {
                const t = e.touches[0];
                return tB(t.pageX, t.pageY)
            }
            return tB(e.pageX, e.pageY)
        })(t) : ((e, t) => {
            const o = nf.DOM.getPos(e);
            return ((e, t, o) => tB(e.x + t, e.y + o))(t, o.x, o.y)
        })(e.getContentAreaContainer(), (e => {
            if (oB(e)) {
                const t = e.touches[0];
                return tB(t.clientX, t.clientY)
            }
            return tB(e.clientX, e.clientY)
        })(t)) : rB(e),
        rB = e => ({
            type: "selection",
            root: Ve(e.selection.getNode())
        }),
        sB = (e, t, o) => {
            switch (o) {
                case "node":
                    return (e => ({
                        type: "node",
                        node: A.some(Ve(e.selection.getNode())),
                        root: Ve(e.getBody())
                    }))(e);
                case "point":
                    return nB(e, t);
                case "selection":
                    return rB(e)
            }
        },
        aB = (e, t, o, n, r, s) => {
            const a = o(),
                i = sB(e, t, s);
            ZC(a, ub.CLOSE_ON_EXECUTE, n, {
                isHorizontalMenu: !1,
                search: A.none()
            }).map((e => {
                t.preventDefault(), Hh.showMenuAt(r, {
                    anchor: i
                }, {
                    menu: {
                        markers: Ob("normal")
                    },
                    data: e
                })
            }))
        },
        iB = {
            onLtr: () => [cl, rl, sl, al, il, ll, R_, N_, I_, B_, F_, D_],
            onRtl: () => [cl, sl, rl, il, al, ll, R_, N_, F_, D_, I_, B_]
        },
        lB = {
            valignCentre: [],
            alignCentre: [],
            alignLeft: ["tox-pop--align-left"],
            alignRight: ["tox-pop--align-right"],
            right: ["tox-pop--right"],
            left: ["tox-pop--left"],
            bottom: ["tox-pop--bottom"],
            top: ["tox-pop--top"]
        },
        cB = (e, t, o, n, r, s) => {
            const a = Do(),
                i = a.os.isiOS(),
                l = a.os.isMacOS(),
                c = a.os.isAndroid(),
                d = a.deviceType.isTouch(),
                u = () => {
                    const a = o();
                    ((e, t, o, n, r, s, a) => {
                        const i = ((e, t, o) => {
                            const n = sB(e, t, o);
                            return {
                                bubble: gc(0, "point" === o ? 12 : 0, lB),
                                layouts: iB,
                                overrides: {
                                    maxWidthFunction: cA(),
                                    maxHeightFunction: cc()
                                },
                                ...n
                            }
                        })(e, t, s);
                        ZC(o, ub.CLOSE_ON_EXECUTE, n, {
                            isHorizontalMenu: !0,
                            search: A.none()
                        }).map((o => {
                            t.preventDefault();
                            const l = a ? Nh.HighlightMenuAndItem : Nh.HighlightNone;
                            Hh.showMenuWithinBounds(r, {
                                anchor: i
                            }, {
                                menu: {
                                    markers: Ob("normal"),
                                    highlightOnOpen: l
                                },
                                data: o,
                                type: "horizontal"
                            }, (() => A.some(TD(e, n.shared, "node" === s ? "node" : "selection")))), e.dispatch(SD)
                        }))
                    })(e, t, a, n, r, s, !(c || i || l && d))
                };
            if ((l || i) && "node" !== s) {
                const o = () => {
                    (e => {
                        const t = e.selection.getRng(),
                            o = () => {
                                Lh.setEditorTimeout(e, (() => {
                                    e.selection.setRng(t)
                                }), 10), s()
                            };
                        e.once("touchend", o);
                        const n = e => {
                            e.preventDefault(), e.stopImmediatePropagation()
                        };
                        e.on("mousedown", n, !0);
                        const r = () => s();
                        e.once("longpresscancel", r);
                        const s = () => {
                            e.off("touchend", o), e.off("longpresscancel", r), e.off("mousedown", n)
                        }
                    })(e), u()
                };
                ((e, t) => {
                    const o = e.selection;
                    if (o.isCollapsed() || t.touches.length < 1) return !1; {
                        const n = t.touches[0],
                            r = o.getRng();
                        return Yc(e.getWin(), Lc.domRange(r)).exists((e => e.left <= n.clientX && e.right >= n.clientX && e.top <= n.clientY && e.bottom >= n.clientY))
                    }
                })(e, t) ? o(): (e.once("selectionchange", o), e.once("touchend", (() => e.off("selectionchange", o))))
            } else u()
        },
        dB = e => s(e) ? "|" === e : "separator" === e.type,
        uB = {
            type: "separator"
        },
        mB = e => {
            const t = e => ({
                text: e.text,
                icon: e.icon,
                enabled: e.enabled,
                shortcut: e.shortcut
            });
            if (s(e)) return e;
            switch (e.type) {
                case "separator":
                    return uB;
                case "submenu":
                    return {
                        type: "nestedmenuitem", ...t(e), getSubmenuItems: () => {
                            const t = e.getSubmenuItems();
                            return s(t) ? t : H(t, mB)
                        }
                    };
                default:
                    const o = e;
                    return {
                        type: "menuitem", ...t(o), onAction: v(o.onAction)
                    }
            }
        },
        gB = (e, t) => {
            if (0 === t.length) return e;
            const o = ne(e).filter((e => !dB(e))).fold((() => []), (e => [uB]));
            return e.concat(o).concat(t).concat([uB])
        },
        pB = (e, t) => !(e => "longpress" === e.type || ve(e, "touches"))(t) && (2 !== t.button || t.target === e.getBody() && "" === t.pointerType),
        hB = (e, t) => pB(e, t) ? e.selection.getStart(!0) : t.target,
        fB = (e, t, o) => {
            const n = Do().deviceType.isTouch,
                r = si(Hh.sketch({
                    dom: {
                        tag: "div"
                    },
                    lazySink: t,
                    onEscape: () => e.focus(),
                    onShow: () => o.setContextMenuState(!0),
                    onHide: () => o.setContextMenuState(!1),
                    fireDismissalEventInstead: {},
                    inlineBehaviours: kl([Kp("dismissContextMenu", [Us(Cs(), ((t, o) => {
                        $d.close(t), e.focus()
                    }))])])
                })),
                a = () => Hh.hide(r),
                i = t => {
                    if (ZD(e) && t.preventDefault(), ((e, t) => t.ctrlKey && !ZD(e))(e, t) || (e => 0 === eB(e).length)(e)) return;
                    const a = ((e, t) => {
                        const o = QD(e),
                            n = pB(e, t) ? "selection" : "point";
                        if (De(o)) {
                            const r = hB(e, t);
                            return Iw(Ve(r), o) ? "node" : n
                        }
                        return n
                    })(e, t);
                    (n() ? cB : aB)(e, t, (() => {
                        const o = hB(e, t),
                            n = e.ui.registry.getAll(),
                            r = eB(e);
                        return ((e, t, o) => {
                            const n = j(t, ((t, n) => be(e, n.toLowerCase()).map((e => {
                                const n = e.update(o);
                                if (s(n)) return gB(t, n.split(" "));
                                if (n.length > 0) {
                                    const e = H(n, mB);
                                    return gB(t, e)
                                }
                                return t
                            })).getOrThunk((() => t.concat([n])))), []);
                            return n.length > 0 && dB(n[n.length - 1]) && n.pop(), n
                        })(n.contextMenus, r, o)
                    }), o, r, a)
                };
            e.on("init", (() => {
                const t = "ResizeEditor ScrollContent ScrollWindow longpresscancel" + (n() ? "" : " ResizeWindow");
                e.on(t, a), e.on("longpress contextmenu", i)
            }))
        },
        bB = Ar([{
            offset: ["x", "y"]
        }, {
            absolute: ["x", "y"]
        }, {
            fixed: ["x", "y"]
        }]),
        vB = e => t => t.translate(-e.left, -e.top),
        yB = e => t => t.translate(e.left, e.top),
        xB = e => (t, o) => j(e, ((e, t) => t(e)), $t(t, o)),
        wB = (e, t, o) => e.fold(xB([yB(o), vB(t)]), xB([vB(t)]), xB([])),
        SB = (e, t, o) => e.fold(xB([yB(o)]), xB([]), xB([yB(t)])),
        kB = (e, t, o) => e.fold(xB([]), xB([vB(o)]), xB([yB(t), vB(o)])),
        CB = (e, t, o) => {
            const n = e.fold(((e, t) => ({
                position: A.some("absolute"),
                left: A.some(e + "px"),
                top: A.some(t + "px")
            })), ((e, t) => ({
                position: A.some("absolute"),
                left: A.some(e - o.left + "px"),
                top: A.some(t - o.top + "px")
            })), ((e, t) => ({
                position: A.some("fixed"),
                left: A.some(e + "px"),
                top: A.some(t + "px")
            })));
            return {
                right: A.none(),
                bottom: A.none(),
                ...n
            }
        },
        OB = (e, t, o, n) => {
            const r = (e, r) => (s, a) => {
                const i = e(t, o, n);
                return r(s.getOr(i.left), a.getOr(i.top))
            };
            return e.fold(r(kB, _B), r(SB, TB), r(wB, EB))
        },
        _B = bB.offset,
        TB = bB.absolute,
        EB = bB.fixed,
        AB = (e, t) => {
            const o = Ot(e, t);
            return u(o) ? NaN : parseInt(o, 10)
        },
        MB = (e, t, o, n, r, s) => {
            const a = ((e, t, o, n) => ((e, t) => {
                    const o = e.element,
                        n = AB(o, t.leftAttr),
                        r = AB(o, t.topAttr);
                    return isNaN(n) || isNaN(r) ? A.none() : A.some($t(n, r))
                })(e, t).fold((() => o), (e => EB(e.left + n.left, e.top + n.top))))(e, t, o, n),
                i = t.mustSnap ? BB(e, t, a, r, s) : FB(e, t, a, r, s),
                l = wB(a, r, s);
            return ((e, t, o) => {
                const n = e.element;
                kt(n, t.leftAttr, o.left + "px"), kt(n, t.topAttr, o.top + "px")
            })(e, t, l), i.fold((() => ({
                coord: EB(l.left, l.top),
                extra: A.none()
            })), (e => ({
                coord: e.output,
                extra: e.extra
            })))
        },
        DB = (e, t, o, n) => se(e, (e => {
            const r = e.sensor,
                s = ((e, t, o, n, r, s) => {
                    const a = SB(e, r, s),
                        i = SB(t, r, s);
                    return Math.abs(a.left - i.left) <= o && Math.abs(a.top - i.top) <= n
                })(t, r, e.range.left, e.range.top, o, n);
            return s ? A.some({
                output: OB(e.output, t, o, n),
                extra: e.extra
            }) : A.none()
        })),
        BB = (e, t, o, n, r) => {
            const s = t.getSnapPoints(e);
            return DB(s, o, n, r).orThunk((() => {
                const e = j(s, ((e, t) => {
                    const s = t.sensor,
                        a = ((e, t, o, n, r, s) => {
                            const a = SB(e, r, s),
                                i = SB(t, r, s),
                                l = Math.abs(a.left - i.left),
                                c = Math.abs(a.top - i.top);
                            return $t(l, c)
                        })(o, s, t.range.left, t.range.top, n, r);
                    return e.deltas.fold((() => ({
                        deltas: A.some(a),
                        snap: A.some(t)
                    })), (o => (a.left + a.top) / 2 <= (o.left + o.top) / 2 ? {
                        deltas: A.some(a),
                        snap: A.some(t)
                    } : e))
                }), {
                    deltas: A.none(),
                    snap: A.none()
                });
                return e.snap.map((e => ({
                    output: OB(e.output, o, n, r),
                    extra: e.extra
                })))
            }))
        },
        FB = (e, t, o, n, r) => {
            const s = t.getSnapPoints(e);
            return DB(s, o, n, r)
        };
    var IB = Object.freeze({
        __proto__: null,
        snapTo: (e, t, o, n) => {
            const r = t.getTarget(e.element);
            if (t.repositionTarget) {
                const t = et(e.element),
                    o = Uo(t),
                    s = qT(r),
                    a = ((e, t, o) => ({
                        coord: OB(e.output, e.output, t, o),
                        extra: e.extra
                    }))(n, o, s),
                    i = CB(a.coord, 0, s);
                Ft(r, i)
            }
        }
    });
    const RB = "data-initial-z-index",
        NB = (e, t) => {
            e.getSystem().addToGui(t), (e => {
                rt(e.element).filter(Ge).each((t => {
                    Nt(t, "z-index").each((e => {
                        kt(t, RB, e)
                    })), Dt(t, "z-index", It(e.element, "z-index"))
                }))
            })(t)
        },
        VB = e => {
            (e => {
                rt(e.element).filter(Ge).each((e => {
                    _t(e, RB).fold((() => Ht(e, "z-index")), (t => Dt(e, "z-index", t))), Et(e, RB)
                }))
            })(e), e.getSystem().removeFromGui(e)
        },
        zB = (e, t, o) => e.getSystem().build(jw.sketch({
            dom: {
                styles: {
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    "z-index": "1000000000000000"
                },
                classes: [t]
            },
            events: o
        }));
    var HB = vr("snaps", [or("getSnapPoints"), Di("onSensor"), or("leftAttr"), or("topAttr"), yr("lazyViewport", en), yr("mustSnap", !1)]);
    const LB = [yr("useFixed", T), or("blockerClass"), yr("getTarget", w), yr("onDrag", b), yr("repositionTarget", !0), yr("onDrop", b), Or("getBounds", en), HB],
        PB = e => {
            return (t = Nt(e, "left"), o = Nt(e, "top"), n = Nt(e, "position"), t.isSome() && o.isSome() && n.isSome() ? A.some(((e, t, o) => ("fixed" === o ? EB : _B)(parseInt(e, 10), parseInt(t, 10)))(t.getOrDie(), o.getOrDie(), n.getOrDie())) : A.none()).getOrThunk((() => {
                const t = Xt(e);
                return TB(t.left, t.top)
            }));
            var t, o, n
        },
        UB = (e, t) => ({
            bounds: e.getBounds(),
            height: jt(t.element),
            width: Zt(t.element)
        }),
        WB = (e, t, o, n, r) => {
            const s = o.update(n, r),
                a = o.getStartData().getOrThunk((() => UB(t, e)));
            s.each((o => {
                ((e, t, o, n) => {
                    const r = t.getTarget(e.element);
                    if (t.repositionTarget) {
                        const s = et(e.element),
                            a = Uo(s),
                            i = qT(r),
                            l = PB(r),
                            c = ((e, t, o, n, r, s, a) => ((e, t, o, n, r) => {
                                const s = r.bounds,
                                    a = SB(t, o, n),
                                    i = Ki(a.left, s.x, s.x + s.width - r.width),
                                    l = Ki(a.top, s.y, s.y + s.height - r.height),
                                    c = TB(i, l);
                                return t.fold((() => {
                                    const e = kB(c, o, n);
                                    return _B(e.left, e.top)
                                }), x(c), (() => {
                                    const e = wB(c, o, n);
                                    return EB(e.left, e.top)
                                }))
                            })(0, t.fold((() => {
                                const e = (t = o, a = s.left, i = s.top, t.fold(((e, t) => _B(e + a, t + i)), ((e, t) => TB(e + a, t + i)), ((e, t) => EB(e + a, t + i))));
                                var t, a, i;
                                const l = wB(e, n, r);
                                return EB(l.left, l.top)
                            }), (t => {
                                const a = MB(e, t, o, s, n, r);
                                return a.extra.each((o => {
                                    t.onSensor(e, o)
                                })), a.coord
                            })), n, r, a))(e, t.snaps, l, a, i, n, o),
                            d = CB(c, 0, i);
                        Ft(r, d)
                    }
                    t.onDrag(e, r, n)
                })(e, t, a, o)
            }))
        },
        jB = (e, t, o, n) => {
            t.each(VB), o.snaps.each((t => {
                ((e, t) => {
                    ((e, t) => {
                        const o = e.element;
                        Et(o, t.leftAttr), Et(o, t.topAttr)
                    })(e, t)
                })(e, t)
            }));
            const r = o.getTarget(e.element);
            n.reset(), o.onDrop(e, r)
        },
        GB = e => (t, o) => {
            const n = e => {
                o.setStartData(UB(t, e))
            };
            return Hs([Us(xs(), (e => {
                o.getStartData().each((() => n(e)))
            })), ...e(t, o, n)])
        };
    var $B = Object.freeze({
        __proto__: null,
        getData: e => A.from($t(e.x, e.y)),
        getDelta: (e, t) => $t(t.left - e.left, t.top - e.top)
    });
    const qB = (e, t, o) => [Us(Wr(), ((n, r) => {
            if (0 !== r.event.raw.button) return;
            r.stop();
            const s = () => jB(n, A.some(l), e, t),
                a = Rw(s, 200),
                i = {
                    drop: s,
                    delayDrop: a.schedule,
                    forceDrop: s,
                    move: o => {
                        a.cancel(), WB(n, e, t, $B, o)
                    }
                },
                l = zB(n, e.blockerClass, (e => Hs([Us(Wr(), e.forceDrop), Us($r(), e.drop), Us(jr(), ((t, o) => {
                    e.move(o.event)
                })), Us(Gr(), e.delayDrop)]))(i));
            o(n), NB(n, l)
        }))],
        XB = [...LB, Ri("dragger", {
            handlers: GB(qB)
        })];
    var KB = Object.freeze({
        __proto__: null,
        getData: e => {
            const t = e.raw.touches;
            return 1 === t.length ? (e => {
                const t = e[0];
                return A.some($t(t.clientX, t.clientY))
            })(t) : A.none()
        },
        getDelta: (e, t) => $t(t.left - e.left, t.top - e.top)
    });
    const YB = (e, t, o) => {
            const n = Ql(),
                r = o => {
                    jB(o, n.get(), e, t), n.clear()
                };
            return [Us(Hr(), ((s, a) => {
                a.stop();
                const i = () => r(s),
                    l = {
                        drop: i,
                        delayDrop: b,
                        forceDrop: i,
                        move: o => {
                            WB(s, e, t, KB, o)
                        }
                    },
                    c = zB(s, e.blockerClass, (e => Hs([Us(Hr(), e.forceDrop), Us(Pr(), e.drop), Us(Ur(), e.drop), Us(Lr(), ((t, o) => {
                        e.move(o.event)
                    }))]))(l));
                n.set(c), o(s), NB(s, c)
            })), Us(Lr(), ((o, n) => {
                n.stop(), WB(o, e, t, KB, n.event)
            })), Us(Pr(), ((e, t) => {
                t.stop(), r(e)
            })), Us(Ur(), r)]
        },
        JB = XB,
        ZB = [...LB, Ri("dragger", {
            handlers: GB(YB)
        })],
        QB = [...LB, Ri("dragger", {
            handlers: GB(((e, t, o) => [...qB(e, t, o), ...YB(e, t, o)]))
        })];
    var eF = Object.freeze({
            __proto__: null,
            mouse: JB,
            touch: ZB,
            mouseOrTouch: QB
        }),
        tF = Object.freeze({
            __proto__: null,
            init: () => {
                let e = A.none(),
                    t = A.none();
                const o = x({});
                return _a({
                    readState: o,
                    reset: () => {
                        e = A.none(), t = A.none()
                    },
                    update: (t, o) => t.getData(o).bind((o => ((t, o) => {
                        const n = e.map((e => t.getDelta(e, o)));
                        return e = A.some(o), n
                    })(t, o))),
                    getStartData: () => t,
                    setStartData: e => {
                        t = A.some(e)
                    }
                })
            }
        });
    const oF = Tl({
            branchKey: "mode",
            branches: eF,
            name: "dragging",
            active: {
                events: (e, t) => e.dragger.handlers(e, t)
            },
            extra: {
                snap: e => ({
                    sensor: e.sensor,
                    range: e.range,
                    output: e.output,
                    extra: A.from(e.extra)
                })
            },
            state: tF,
            apis: IB
        }),
        nF = (e, t, o, n, r, s) => e.fold((() => oF.snap({
            sensor: TB(o - 20, n - 20),
            range: $t(r, s),
            output: TB(A.some(o), A.some(n)),
            extra: {
                td: t
            }
        })), (e => {
            const r = o - 20,
                s = n - 20,
                a = e.element.dom.getBoundingClientRect();
            return oF.snap({
                sensor: TB(r, s),
                range: $t(40, 40),
                output: TB(A.some(o - a.width / 2), A.some(n - a.height / 2)),
                extra: {
                    td: t
                }
            })
        })),
        rF = (e, t, o) => ({
            getSnapPoints: e,
            leftAttr: "data-drag-left",
            topAttr: "data-drag-top",
            onSensor: (e, n) => {
                const r = n.td;
                ((e, t) => e.exists((e => Ze(e, t))))(t.get(), r) || (t.set(r), o(r))
            },
            mustSnap: !0
        }),
        sF = e => Uh(Ph.sketch({
            dom: {
                tag: "div",
                classes: ["tox-selector"]
            },
            buttonBehaviours: kl([oF.config({
                mode: "mouseOrTouch",
                blockerClass: "blocker",
                snaps: e
            }), SS.config({})]),
            eventOrder: {
                mousedown: ["dragging", "alloy.base.behaviour"],
                touchstart: ["dragging", "alloy.base.behaviour"]
            }
        })),
        aF = (e, t) => {
            const o = Er([]),
                n = Er([]),
                r = Er(!1),
                s = Ql(),
                a = Ql(),
                i = e => {
                    const o = Zo(e);
                    return nF(u.getOpt(t), e, o.x, o.y, o.width, o.height)
                },
                l = e => {
                    const o = Zo(e);
                    return nF(m.getOpt(t), e, o.right, o.bottom, o.width, o.height)
                },
                c = rF((() => H(o.get(), (e => i(e)))), s, (t => {
                    a.get().each((o => {
                        e.dispatch("TableSelectorChange", {
                            start: t,
                            finish: o
                        })
                    }))
                })),
                d = rF((() => H(n.get(), (e => l(e)))), a, (t => {
                    s.get().each((o => {
                        e.dispatch("TableSelectorChange", {
                            start: o,
                            finish: t
                        })
                    }))
                })),
                u = sF(c),
                m = sF(d),
                g = si(u.asSpec()),
                p = si(m.asSpec()),
                h = (t, o, n, r) => {
                    const s = n(o);
                    oF.snapTo(t, s), ((t, o, n, s) => {
                        const a = o.dom.getBoundingClientRect();
                        Ht(t.element, "display");
                        const i = nt(Ve(e.getBody())).dom.innerHeight,
                            l = a[r] < 0,
                            c = ((e, t) => e[r] > t)(a, i);
                        (l || c) && Dt(t.element, "display", "none")
                    })(t, o)
                },
                f = e => h(g, e, i, "top"),
                b = e => h(p, e, l, "bottom");
            Do().deviceType.isTouch() && (e.on("TableSelectionChange", (e => {
                r.get() || (Td(t, g), Td(t, p), r.set(!0)), s.set(e.start), a.set(e.finish), e.otherCells.each((t => {
                    o.set(t.upOrLeftCells), n.set(t.downOrRightCells), f(e.start), b(e.finish)
                }))
            })), e.on("ResizeEditor ResizeWindow ScrollContent", (() => {
                s.get().each(f), a.get().each(b)
            })), e.on("TableSelectionClear", (() => {
                r.get() && (Md(g), Md(p), r.set(!1)), s.clear(), a.clear()
            })))
        },
        iF = (e, t, o) => {
            var n;
            const r = null !== (n = t.delimiter) && void 0 !== n ? n : "\u203a";
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-statusbar__path"],
                    attributes: {
                        role: "navigation"
                    }
                },
                behaviours: kl([Hp.config({
                    mode: "flow",
                    selector: "div[role=button]"
                }), Fm.config({
                    disabled: o.isDisabled
                }), by(), Jw.config({}), Xp.config({}), Kp("elementPathEvents", [Ys(((t, n) => {
                    e.shortcuts.add("alt+F11", "focus statusbar elementpath", (() => Hp.focusIn(t))), e.on("NodeChange", (n => {
                        const s = (t => {
                                const o = [];
                                let n = t.length;
                                for (; n-- > 0;) {
                                    const s = t[n];
                                    if (1 === s.nodeType && "BR" !== (r = s).nodeName && !r.getAttribute("data-mce-bogus") && "bookmark" !== r.getAttribute("data-mce-type")) {
                                        const t = dx(e, s);
                                        if (t.isDefaultPrevented() || o.push({
                                                name: t.name,
                                                element: s
                                            }), t.isPropagationStopped()) break
                                    }
                                }
                                var r;
                                return o
                            })(n.parents),
                            a = s.length > 0 ? j(s, ((t, n, s) => {
                                const a = ((t, n, r) => Ph.sketch({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-statusbar__path-item"],
                                        attributes: {
                                            "data-index": r,
                                            "aria-level": r + 1
                                        }
                                    },
                                    components: [ti(t)],
                                    action: t => {
                                        e.focus(), e.selection.select(n), e.nodeChanged()
                                    },
                                    buttonBehaviours: kl([vy(o.isDisabled), by()])
                                }))(n.name, n.element, s);
                                return 0 === s ? t.concat([a]) : t.concat([{
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-statusbar__path-divider"],
                                        attributes: {
                                            "aria-hidden": !0
                                        }
                                    },
                                    components: [ti(` ${r} `)]
                                }, a])
                            }), []) : [];
                        Xp.set(t, a)
                    }))
                }))])]),
                components: []
            }
        };
    var lF;
    ! function (e) {
        e[e.None = 0] = "None", e[e.Both = 1] = "Both", e[e.Vertical = 2] = "Vertical"
    }(lF || (lF = {}));
    const cF = (e, t, o) => {
            const n = Ve(e.getContainer()),
                r = ((e, t, o, n, r) => {
                    const s = {
                        height: hD(n + t.top, pf(e), ff(e))
                    };
                    return o === lF.Both && (s.width = hD(r + t.left, gf(e), hf(e))), s
                })(e, t, o, Wt(n), Jt(n));
            le(r, ((e, t) => {
                h(e) && Dt(n, t, pD(e))
            })), (e => {
                e.dispatch("ResizeEditor")
            })(e)
        },
        dF = (e, t, o, n) => {
            const r = $t(20 * o, 20 * n);
            return cF(e, r, t), A.some(!0)
        },
        uF = (e, t) => ({
            dom: {
                tag: "div",
                classes: ["tox-statusbar"]
            },
            components: (() => {
                const o = (() => {
                        const o = [];
                        return Lf(e) && o.push(iF(e, {}, t)), e.hasPlugin("wordcount") && o.push(((e, t) => {
                            const o = (e, o, n) => Xp.set(e, [ti(t.translate(["{0} " + n, o[n]]))]);
                            return Ph.sketch({
                                dom: {
                                    tag: "button",
                                    classes: ["tox-statusbar__wordcount"]
                                },
                                components: [],
                                buttonBehaviours: kl([vy(t.isDisabled), by(), Jw.config({}), Xp.config({}), mu.config({
                                    store: {
                                        mode: "memory",
                                        initialValue: {
                                            mode: "words",
                                            count: {
                                                words: 0,
                                                characters: 0
                                            }
                                        }
                                    }
                                }), Kp("wordcount-events", [Qs((e => {
                                    const t = mu.getValue(e),
                                        n = "words" === t.mode ? "characters" : "words";
                                    mu.setValue(e, {
                                        mode: n,
                                        count: t.count
                                    }), o(e, t.count, n)
                                })), Ys((t => {
                                    e.on("wordCountUpdate", (e => {
                                        const {
                                            mode: n
                                        } = mu.getValue(t);
                                        mu.setValue(t, {
                                            mode: n,
                                            count: e.wordCount
                                        }), o(t, e.wordCount, n)
                                    }))
                                }))])]),
                                eventOrder: {
                                    [us()]: ["disabling", "alloy.base.behaviour", "wordcount-events"]
                                }
                            })
                        })(e, t)), Pf(e) && o.push({
                            dom: {
                                tag: "span",
                                classes: ["tox-statusbar__branding"]
                            },
                            components: [{
                                dom: {
                                    tag: "a",
                                    attributes: {
                                        href: "https://www.tiny.cloud/powered-by-tiny?utm_campaign=editor_referral&utm_medium=poweredby&utm_source=tinymce&utm_content=v6",
                                        rel: "noopener",
                                        target: "_blank",
                                        "aria-label": Wh.translate(["Powered by {0}", "Tiny"])
                                    },
                                    innerHtml: '<svg width="50px" height="16px" viewBox="0 0 50 16" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.143 0c2.608.015 5.186 2.178 5.186 5.331 0 0 .077 3.812-.084 4.87-.361 2.41-2.164 4.074-4.65 4.496-1.453.284-2.523.49-3.212.623-.373.071-.634.122-.785.152-.184.038-.997.145-1.35.145-2.732 0-5.21-2.04-5.248-5.33 0 0 0-3.514.03-4.442.093-2.4 1.758-4.342 4.926-4.963 0 0 3.875-.752 4.036-.782.368-.07.775-.1 1.15-.1Zm1.826 2.8L5.83 3.989v2.393l-2.455.475v5.968l6.137-1.189V9.243l2.456-.476V2.8ZM5.83 6.382l3.682-.713v3.574l-3.682.713V6.382Zm27.173-1.64-.084-1.066h-2.226v9.132h2.456V7.743c-.008-1.151.998-2.064 2.149-2.072 1.15-.008 1.987.92 1.995 2.072v5.065h2.455V7.359c-.015-2.18-1.657-3.929-3.837-3.913a3.993 3.993 0 0 0-2.908 1.296Zm-6.3-4.266L29.16 0v2.387l-2.456.475V.476Zm0 3.2v9.132h2.456V3.676h-2.456Zm18.179 11.787L49.11 3.676H46.58l-1.612 4.527-.46 1.382-.384-1.382-1.611-4.527H39.98l3.3 9.132L42.15 16l2.732-.537ZM22.867 9.738c0 .752.568 1.075.921 1.075.353 0 .668-.047.998-.154l.537 1.765c-.23.154-.92.537-2.225.537-1.305 0-2.655-.997-2.686-2.686a136.877 136.877 0 0 1 0-4.374H18.8V3.676h1.612v-1.98l2.455-.476v2.456h2.302V5.9h-2.302v3.837Z"/>\n</svg>\n'.trim()
                                },
                                behaviours: kl([eh.config({})])
                            }]
                        }), o.length > 0 ? [{
                            dom: {
                                tag: "div",
                                classes: ["tox-statusbar__text-container"]
                            },
                            components: o
                        }] : []
                    })(),
                    n = ((e, t) => {
                        const o = (e => {
                            const t = Uf(e);
                            return !1 === t ? lF.None : "both" === t ? lF.Both : lF.Vertical
                        })(e);
                        return o === lF.None ? A.none() : A.some(Zh("resize-handle", {
                            tag: "div",
                            classes: ["tox-statusbar__resize-handle"],
                            attributes: {
                                title: t.translate("Resize")
                            },
                            behaviours: [oF.config({
                                mode: "mouse",
                                repositionTarget: !1,
                                onDrag: (t, n, r) => cF(e, r, o),
                                blockerClass: "tox-blocker"
                            }), Hp.config({
                                mode: "special",
                                onLeft: () => dF(e, o, -1, 0),
                                onRight: () => dF(e, o, 1, 0),
                                onUp: () => dF(e, o, 0, -1),
                                onDown: () => dF(e, o, 0, 1)
                            }), Jw.config({}), eh.config({})]
                        }, t.icons))
                    })(e, t);
                return o.concat(n.toArray())
            })()
        }),
        mF = (e, t) => t.get().getOrDie(`UI for ${e} has not been rendered`),
        gF = (e, t) => {
            const o = e.inline,
                n = o ? wD : mD,
                r = rb(e) ? EE : GT,
                s = (() => {
                    const e = Ql(),
                        t = Ql(),
                        o = Ql();
                    return {
                        dialogUi: e,
                        popupUi: t,
                        mainUi: o,
                        getUiMotherships: () => {
                            const o = e.get().map((e => e.mothership)),
                                n = t.get().map((e => e.mothership));
                            return o.fold((() => n.toArray()), (e => n.fold((() => [e]), (t => Ze(e.element, t.element) ? [e] : [e, t]))))
                        },
                        lazyGetInOuterOrDie: (e, t) => () => o.get().bind((e => t(e.outerContainer))).getOrDie(`Could not find ${e} element in OuterContainer`)
                    }
                })(),
                a = Ql(),
                i = Ql(),
                l = Ql(),
                c = Do().deviceType.isTouch() ? ["tox-platform-touch"] : [],
                d = Qf(e),
                u = Sf(e),
                m = Uh({
                    dom: {
                        tag: "div",
                        classes: ["tox-anchorbar"]
                    }
                }),
                g = () => s.mainUi.get().map((e => e.outerContainer)).bind(aM.getHeader),
                p = s.lazyGetInOuterOrDie("anchor bar", m.getOpt),
                h = s.lazyGetInOuterOrDie("toolbar", aM.getToolbar),
                f = s.lazyGetInOuterOrDie("throbber", aM.getThrobber),
                b = ((e, t, o) => {
                    const n = Er(!1),
                        r = (e => {
                            const t = Er(Qf(e) ? "bottom" : "top");
                            return {
                                isPositionedAtTop: () => "top" === t.get(),
                                getDockingMode: t.get,
                                setDockingMode: t.set
                            }
                        })(t),
                        s = {
                            icons: () => t.ui.registry.getAll().icons,
                            menuItems: () => t.ui.registry.getAll().menuItems,
                            translate: Wh.translate,
                            isDisabled: () => t.mode.isReadOnly() || !t.ui.isEnabled(),
                            getOption: t.options.get
                        },
                        a = DT(t),
                        i = (e => {
                            const t = t => () => e.formatter.match(t),
                                o = t => () => {
                                    const o = e.formatter.get(t);
                                    return void 0 !== o ? A.some({
                                        tag: o.length > 0 && (o[0].inline || o[0].block) || "div",
                                        styles: e.dom.parseStyle(e.formatter.getCssText(t))
                                    }) : A.none()
                                },
                                n = Er([]),
                                r = Er([]),
                                s = Er(!1);
                            return e.on("PreInit", (r => {
                                const s = rT(e),
                                    a = aT(e, s, t, o);
                                n.set(a)
                            })), e.on("addStyleModifications", (n => {
                                const a = aT(e, n.items, t, o);
                                r.set(a), s.set(n.replace)
                            })), {
                                getData: () => {
                                    const e = s.get() ? [] : n.get(),
                                        t = r.get();
                                    return e.concat(t)
                                }
                            }
                        })(t),
                        l = (e => ({
                            colorPicker: K_(e),
                            hasCustomColors: Y_(e),
                            getColors: J_(e),
                            getColorCols: Z_(e)
                        }))(t),
                        c = (e => ({
                            isDraggableModal: Q_(e)
                        }))(t),
                        d = {
                            shared: {
                                providers: s,
                                anchors: X_(t, o, r.isPositionedAtTop),
                                header: r
                            },
                            urlinput: a,
                            styles: i,
                            colorinput: l,
                            dialog: c,
                            isContextMenuOpen: () => n.get(),
                            setContextMenuState: e => n.set(e)
                        },
                        u = {
                            ...d,
                            shared: {
                                ...d.shared,
                                interpreter: e => k_(e, {}, u),
                                getSink: e.popup
                            }
                        },
                        m = {
                            ...d,
                            shared: {
                                ...d.shared,
                                interpreter: e => k_(e, {}, m),
                                getSink: e.dialog
                            }
                        };
                    return {
                        popup: u,
                        dialog: m
                    }
                })({
                    popup: () => rn.fromOption(s.popupUi.get().map((e => e.sink)), "(popup) UI has not been rendered"),
                    dialog: () => rn.fromOption(s.dialogUi.get().map((e => e.sink)), "UI has not been rendered")
                }, e, p),
                v = () => {
                    const t = (() => {
                            const t = {
                                    attributes: {
                                        [yc]: d ? vc.BottomToTop : vc.TopToBottom
                                    }
                                },
                                o = aM.parts.menubar({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-menubar"]
                                    },
                                    backstage: b.popup,
                                    onEscape: () => {
                                        e.focus()
                                    }
                                }),
                                n = aM.parts.toolbar({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-toolbar"]
                                    },
                                    getSink: b.popup.shared.getSink,
                                    providers: b.popup.shared.providers,
                                    onEscape: () => {
                                        e.focus()
                                    },
                                    onToolbarToggled: t => {
                                        ((e, t) => {
                                            e.dispatch("ToggleToolbarDrawer", {
                                                state: t
                                            })
                                        })(e, t)
                                    },
                                    type: u,
                                    lazyToolbar: h,
                                    lazyHeader: () => g().getOrDie("Could not find header element"),
                                    ...t
                                }),
                                r = aM.parts["multiple-toolbar"]({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-toolbar-overlord"]
                                    },
                                    providers: b.popup.shared.providers,
                                    onEscape: () => {
                                        e.focus()
                                    },
                                    type: u
                                }),
                                s = Zf(e),
                                a = Yf(e),
                                i = qf(e),
                                l = Gf(e),
                                c = aM.parts.promotion({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-promotion"]
                                    }
                                }),
                                p = s || a || i,
                                f = l ? [c, o] : [o];
                            return aM.parts.header({
                                dom: {
                                    tag: "div",
                                    classes: ["tox-editor-header"].concat(p ? [] : ["tox-editor-header--empty"]),
                                    ...t
                                },
                                components: q([i ? f : [], s ? [r] : a ? [n] : [], tb(e) ? [] : [m.asSpec()]]),
                                sticky: rb(e),
                                editor: e,
                                sharedBackstage: b.popup.shared
                            })
                        })(),
                        n = {
                            dom: {
                                tag: "div",
                                classes: ["tox-sidebar-wrap"]
                            },
                            components: [aM.parts.socket({
                                dom: {
                                    tag: "div",
                                    classes: ["tox-edit-area"]
                                }
                            }), aM.parts.sidebar({
                                dom: {
                                    tag: "div",
                                    classes: ["tox-sidebar"]
                                }
                            })]
                        },
                        r = aM.parts.throbber({
                            dom: {
                                tag: "div",
                                classes: ["tox-throbber"]
                            },
                            backstage: b.popup
                        }),
                        s = aM.parts.viewWrapper({
                            backstage: b.popup
                        }),
                        i = Hf(e) && !o ? A.some(uF(e, b.popup.shared.providers)) : A.none(),
                        l = q([d ? [] : [t], o ? [] : [n], d ? [t] : []]),
                        p = aM.parts.editorContainer({
                            components: q([l, o ? [] : i.toArray()])
                        }),
                        f = nb(e),
                        v = {
                            role: "application",
                            ...Wh.isRtl() ? {
                                dir: "rtl"
                            } : {},
                            ...f ? {
                                "aria-hidden": "true"
                            } : {}
                        },
                        y = si(aM.sketch({
                            dom: {
                                tag: "div",
                                classes: ["tox", "tox-tinymce"].concat(o ? ["tox-tinymce-inline"] : []).concat(d ? ["tox-tinymce--toolbar-bottom"] : []).concat(c),
                                styles: {
                                    visibility: "hidden",
                                    ...f ? {
                                        opacity: "0",
                                        border: "0"
                                    } : {}
                                },
                                attributes: v
                            },
                            components: [p, ...o ? [] : [s], r],
                            behaviours: kl([by(), Fm.config({
                                disableClass: "tox-tinymce--disabled"
                            }), Hp.config({
                                mode: "cyclic",
                                selector: ".tox-menubar, .tox-toolbar, .tox-toolbar__primary, .tox-toolbar__overflow--open, .tox-sidebar__overflow--open, .tox-statusbar__path, .tox-statusbar__wordcount, .tox-statusbar__branding a, .tox-statusbar__resize-handle"
                            })])
                        })),
                        x = Gw(y);
                    return a.set(x), {
                        mothership: x,
                        outerContainer: y
                    }
                },
                y = t => {
                    const o = pD((e => {
                            const t = (e => {
                                const t = uf(e),
                                    o = pf(e),
                                    n = ff(e);
                                return gD(t).map((e => hD(e, o, n)))
                            })(e);
                            return t.getOr(uf(e))
                        })(e)),
                        n = pD((e => fD(e).getOr(mf(e)))(e));
                    return e.inline || (zt("div", "width", n) && Dt(t.element, "width", n), zt("div", "height", o) ? Dt(t.element, "height", o) : Dt(t.element, "height", "400px")), o
                };
            return {
                popups: {
                    backstage: b.popup,
                    getMothership: () => mF("popups", l)
                },
                dialogs: {
                    backstage: b.dialog,
                    getMothership: () => mF("dialogs", i)
                },
                renderUI: () => {
                    const o = v(),
                        a = (() => {
                            const t = ob(e),
                                o = Ze(xt(), t) && "grid" === It(t, "display"),
                                n = {
                                    dom: {
                                        tag: "div",
                                        classes: ["tox", "tox-silver-sink", "tox-tinymce-aux"].concat(c),
                                        attributes: {
                                            ...Wh.isRtl() ? {
                                                dir: "rtl"
                                            } : {}
                                        }
                                    },
                                    behaviours: kl([xd.config({
                                        useFixed: () => r.isDocked(g)
                                    })])
                                },
                                s = {
                                    dom: {
                                        styles: {
                                            width: document.body.clientWidth + "px"
                                        }
                                    },
                                    events: Hs([Us(ws(), (e => {
                                        Dt(e.element, "width", document.body.clientWidth + "px")
                                    }))])
                                },
                                a = si(fn(n, o ? s : {})),
                                l = Gw(a);
                            return i.set(l), {
                                sink: a,
                                mothership: l
                            }
                        })(),
                        d = sb(e) ? (() => {
                            const e = {
                                    dom: {
                                        tag: "div",
                                        classes: ["tox", "tox-silver-sink", "tox-silver-popup-sink", "tox-tinymce-aux"].concat(c),
                                        attributes: {
                                            ...Wh.isRtl() ? {
                                                dir: "rtl"
                                            } : {}
                                        }
                                    },
                                    behaviours: kl([xd.config({
                                        useFixed: () => r.isDocked(g),
                                        getBounds: () => t.getPopupSinkBounds()
                                    })])
                                },
                                o = si(e),
                                n = Gw(o);
                            return l.set(n), {
                                sink: o,
                                mothership: n
                            }
                        })() : (e => (l.set(e.mothership), e))(a);
                    s.dialogUi.set(a), s.popupUi.set(d), s.mainUi.set(o);
                    return (t => {
                        const {
                            mainUi: o,
                            popupUi: s,
                            uiMotherships: a
                        } = t;
                        ce(kf(e), ((t, o) => {
                            e.ui.registry.addGroupToolbarButton(o, t)
                        }));
                        const {
                            buttons: i,
                            menuItems: l,
                            contextToolbars: c,
                            sidebars: d,
                            views: m
                        } = e.ui.registry.getAll(), p = Jf(e), h = {
                            menuItems: l,
                            menus: ab(e),
                            menubar: Af(e),
                            toolbar: p.getOrThunk((() => Mf(e))),
                            allowToolbarGroups: u === tf.floating,
                            buttons: i,
                            sidebar: d,
                            views: m
                        };
                        var v;
                        v = o.outerContainer, e.addShortcut("alt+F9", "focus menubar", (() => {
                            aM.focusMenubar(v)
                        })), e.addShortcut("alt+F10", "focus toolbar", (() => {
                            aM.focusToolbar(v)
                        })), e.addCommand("ToggleToolbarDrawer", ((e, t) => {
                            (null == t ? void 0 : t.skipFocus) ? aM.toggleToolbarDrawerWithoutFocusing(v): aM.toggleToolbarDrawer(v)
                        })), e.addQueryStateHandler("ToggleToolbarDrawer", (() => aM.isToolbarDrawerToggled(v))), ((e, t, o) => {
                            const n = (e, n) => {
                                    L([t, ...o], (t => {
                                        t.broadcastEvent(e, n)
                                    }))
                                },
                                r = (e, n) => {
                                    L([t, ...o], (t => {
                                        t.broadcastOn([e], n)
                                    }))
                                },
                                s = e => r(qd(), {
                                    target: e.target
                                }),
                                a = $o(),
                                i = tc(a, "touchstart", s),
                                l = tc(a, "touchmove", (e => n(vs(), e))),
                                c = tc(a, "touchend", (e => n(ys(), e))),
                                d = tc(a, "mousedown", s),
                                u = tc(a, "mouseup", (e => {
                                    0 === e.raw.button && r(Kd(), {
                                        target: e.target
                                    })
                                })),
                                m = e => r(qd(), {
                                    target: Ve(e.target)
                                }),
                                g = e => {
                                    0 === e.button && r(Kd(), {
                                        target: Ve(e.target)
                                    })
                                },
                                p = () => {
                                    L(e.editorManager.get(), (t => {
                                        e !== t && t.dispatch("DismissPopups", {
                                            relatedTarget: e
                                        })
                                    }))
                                },
                                h = e => n(xs(), nc(e)),
                                f = e => {
                                    r(Xd(), {}), n(ws(), nc(e))
                                },
                                b = ht(Ve(e.getElement())),
                                v = oc(b, "scroll", (o => {
                                    requestAnimationFrame((() => {
                                        if (null != e.getContainer()) {
                                            const r = Bw(e, t.element).map((e => [e.element, ...e.others])).getOr([]);
                                            N(r, (e => Ze(e, o.target))) && (e.dispatch("ElementScroll", {
                                                target: o.target.dom
                                            }), n(Es(), o))
                                        }
                                    }))
                                })),
                                y = () => r(Xd(), {}),
                                x = t => {
                                    t.state && r(qd(), {
                                        target: Ve(e.getContainer())
                                    })
                                },
                                w = e => {
                                    r(qd(), {
                                        target: Ve(e.relatedTarget.getContainer())
                                    })
                                };
                            e.on("PostRender", (() => {
                                e.on("click", m), e.on("tap", m), e.on("mouseup", g), e.on("mousedown", p), e.on("ScrollWindow", h), e.on("ResizeWindow", f), e.on("ResizeEditor", y), e.on("AfterProgressState", x), e.on("DismissPopups", w)
                            })), e.on("remove", (() => {
                                e.off("click", m), e.off("tap", m), e.off("mouseup", g), e.off("mousedown", p), e.off("ScrollWindow", h), e.off("ResizeWindow", f), e.off("ResizeEditor", y), e.off("AfterProgressState", x), e.off("DismissPopups", w), d.unbind(), i.unbind(), l.unbind(), c.unbind(), u.unbind(), v.unbind()
                            })), e.on("detach", (() => {
                                L([t, ...o], Rd), L([t, ...o], (e => e.destroy()))
                            }))
                        })(e, o.mothership, a), r.setup(e, b.popup.shared, g), KD(e, b.popup), fB(e, b.popup.shared.getSink, b.popup), (e => {
                            const {
                                sidebars: t
                            } = e.ui.registry.getAll();
                            L(ae(t), (o => {
                                const n = t[o],
                                    r = () => xe(A.from(e.queryCommandValue("ToggleSidebar")), o);
                                e.ui.registry.addToggleButton(o, {
                                    icon: n.icon,
                                    tooltip: n.tooltip,
                                    onAction: t => {
                                        e.execCommand("ToggleSidebar", !1, o), t.setActive(r())
                                    },
                                    onSetup: t => {
                                        t.setActive(r());
                                        const o = () => t.setActive(r());
                                        return e.on("ToggleSidebar", o), () => {
                                            e.off("ToggleSidebar", o)
                                        }
                                    }
                                })
                            }))
                        })(e), eA(e, f, b.popup.shared), LD(e, c, s.sink, {
                            backstage: b.popup
                        }), aF(e, s.sink);
                        const x = {
                            targetNode: e.getElement(),
                            height: y(o.outerContainer)
                        };
                        return n.render(e, t, h, b.popup, x)
                    })({
                        popupUi: d,
                        dialogUi: a,
                        mainUi: o,
                        uiMotherships: s.getUiMotherships()
                    })
                }
            }
        },
        pF = x([or("lazySink"), ur("dragBlockClass"), Or("getBounds", en), yr("useTabstopAt", E), yr("firstTabstop", 0), yr("eventOrder", {}), gu("modalBehaviours", [Hp]), Bi("onExecute"), Ii("onEscape")]),
        hF = {
            sketch: w
        },
        fF = x([Uu({
            name: "draghandle",
            overrides: (e, t) => ({
                behaviours: kl([oF.config({
                    mode: "mouse",
                    getTarget: e => mi(e, '[role="dialog"]').getOr(e),
                    blockerClass: e.dragBlockClass.getOrDie(new Error("The drag blocker class was not specified for a dialog with a drag handle: \n" + JSON.stringify(t, null, 2)).message),
                    getBounds: e.getDragBounds
                })])
            })
        }), Lu({
            schema: [or("dom")],
            name: "title"
        }), Lu({
            factory: hF,
            schema: [or("dom")],
            name: "close"
        }), Lu({
            factory: hF,
            schema: [or("dom")],
            name: "body"
        }), Uu({
            factory: hF,
            schema: [or("dom")],
            name: "footer"
        }), Pu({
            factory: {
                sketch: (e, t) => ({
                    ...e,
                    dom: t.dom,
                    components: t.components
                })
            },
            schema: [yr("dom", {
                tag: "div",
                styles: {
                    position: "fixed",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px"
                }
            }), yr("components", [])],
            name: "blocker"
        })]),
        bF = hm({
            name: "ModalDialog",
            configFields: pF(),
            partFields: fF(),
            factory: (e, t, o, n) => {
                const r = Ql(),
                    s = la("modal-events"),
                    a = {
                        ...e.eventOrder,
                        [Ss()]: [s].concat(e.eventOrder["alloy.system.attached"] || [])
                    };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    apis: {
                        show: t => {
                            r.set(t);
                            const o = e.lazySink(t).getOrDie(),
                                s = n.blocker(),
                                a = o.getSystem().build({
                                    ...s,
                                    components: s.components.concat([ai(t)]),
                                    behaviours: kl([eh.config({}), Kp("dialog-blocker-events", [Ks(Xr(), (() => {
                                        Hp.focusIn(t)
                                    }))])])
                                });
                            Td(o, a), Hp.focusIn(t)
                        },
                        hide: e => {
                            r.clear(), rt(e.element).each((t => {
                                e.getSystem().getByDom(t).each((e => {
                                    Md(e)
                                }))
                            }))
                        },
                        getBody: t => tm(t, e, "body"),
                        getFooter: t => tm(t, e, "footer"),
                        setIdle: e => {
                            JE.unblock(e)
                        },
                        setBusy: (e, t) => {
                            JE.block(e, t)
                        }
                    },
                    eventOrder: a,
                    domModification: {
                        attributes: {
                            role: "dialog",
                            "aria-modal": "true"
                        }
                    },
                    behaviours: hu(e.modalBehaviours, [Xp.config({}), Hp.config({
                        mode: "cyclic",
                        onEnter: e.onExecute,
                        onEscape: e.onEscape,
                        useTabstopAt: e.useTabstopAt,
                        firstTabstop: e.firstTabstop
                    }), JE.config({
                        getRoot: r.get
                    }), Kp(s, [Ys((t => {
                        ((e, t) => {
                            const o = _t(e, "id").fold((() => {
                                const e = la("dialog-label");
                                return kt(t, "id", e), e
                            }), w);
                            kt(e, "aria-labelledby", o)
                        })(t.element, tm(t, e, "title").element), ((e, t) => {
                            const o = A.from(Ot(e, "id")).fold((() => {
                                const e = la("dialog-describe");
                                return kt(t, "id", e), e
                            }), w);
                            kt(e, "aria-describedby", o)
                        })(t.element, tm(t, e, "body").element)
                    }))])])
                }
            },
            apis: {
                show: (e, t) => {
                    e.show(t)
                },
                hide: (e, t) => {
                    e.hide(t)
                },
                getBody: (e, t) => e.getBody(t),
                getFooter: (e, t) => e.getFooter(t),
                setBusy: (e, t, o) => {
                    e.setBusy(t, o)
                },
                setIdle: (e, t) => {
                    e.setIdle(t)
                }
            }
        }),
        vF = Dn([Yb, Jb].concat($v)),
        yF = Ln,
        xF = [kv("button"), dv, kr("align", "end", ["start", "end"]), vv, bv, hr("buttonType", ["primary", "secondary"])],
        wF = [...xF, Qb],
        SF = [ar("type", ["submit", "cancel", "custom"]), ...wF],
        kF = [ar("type", ["menu"]), cv, uv, dv, dr("items", vF), ...xF],
        CF = [...xF, ar("type", ["togglebutton"]), sr("tooltip"), tv, cv, Cr("active", !1)],
        OF = Jn("type", {
            submit: SF,
            cancel: SF,
            custom: SF,
            menu: kF,
            togglebutton: CF
        }),
        _F = [Yb, Qb, ar("level", ["info", "warn", "error", "success"]), tv, yr("url", "")],
        TF = Dn(_F),
        EF = [Yb, Qb, bv, kv("button"), dv, fv, hr("buttonType", ["primary", "secondary", "toolbar"]), vv],
        AF = Dn(EF),
        MF = [Yb, Jb],
        DF = MF.concat([mv]),
        BF = MF.concat([Zb, bv]),
        FF = Dn(BF),
        IF = Ln,
        RF = DF.concat([yv("auto")]),
        NF = Dn(RF),
        VF = Rn([ov, Qb, tv]),
        zF = DF.concat([Sr("storageKey", "default")]),
        HF = Dn(zF),
        LF = Hn,
        PF = Dn(DF),
        UF = Hn,
        WF = MF.concat([Sr("tag", "textarea"), sr("scriptId"), sr("scriptUrl"), xr("settings", void 0, Wn)]),
        jF = MF.concat([Sr("tag", "textarea"), ir("init")]),
        GF = Gn((e => qn("customeditor.old", Mn(jF), e).orThunk((() => qn("customeditor.new", Mn(WF), e))))),
        $F = Hn,
        qF = Dn(DF),
        XF = Bn(On),
        KF = e => [Yb, rr("columns"), e],
        YF = [Yb, sr("html"), kr("presets", "presentation", ["presentation", "document"])],
        JF = Dn(YF),
        ZF = DF.concat([Cr("sandboxed", !0), Cr("transparent", !0)]),
        QF = Dn(ZF),
        eI = Hn,
        tI = Dn(MF.concat([pr("height")])),
        oI = Dn([sr("url"), gr("zoom"), gr("cachedWidth"), gr("cachedHeight")]),
        nI = DF.concat([pr("inputMode"), pr("placeholder"), Cr("maximized", !1), bv]),
        rI = Dn(nI),
        sI = Hn,
        aI = e => [Yb, Zb, e],
        iI = [Qb, ov],
        lI = [Qb, dr("items", Zn(0, (() => cI)))],
        cI = Fn([Dn(iI), Dn(lI)]),
        dI = DF.concat([dr("items", cI), bv]),
        uI = Dn(dI),
        mI = Hn,
        gI = DF.concat([cr("items", [Qb, ov]), wr("size", 1), bv]),
        pI = Dn(gI),
        hI = Hn,
        fI = DF.concat([Cr("constrain", !0), bv]),
        bI = Dn(fI),
        vI = Dn([sr("width"), sr("height")]),
        yI = MF.concat([Zb, wr("min", 0), wr("max", 0)]),
        xI = Dn(yI),
        wI = zn,
        SI = [Yb, dr("header", Hn), dr("cells", Bn(Hn))],
        kI = Dn(SI),
        CI = DF.concat([pr("placeholder"), Cr("maximized", !1), bv]),
        OI = Dn(CI),
        _I = Hn,
        TI = [ar("type", ["directory", "leaf"]), ev, sr("id"), mr("menu", DE)],
        EI = Dn(TI),
        AI = TI.concat([dr("children", Zn(0, (() => jn("type", {
            directory: MI,
            leaf: EI
        }))))]),
        MI = Dn(AI),
        DI = jn("type", {
            directory: MI,
            leaf: EI
        }),
        BI = [Yb, dr("items", DI), fr("onLeafAction")],
        FI = Dn(BI),
        II = DF.concat([kr("filetype", "file", ["image", "media", "file"]), bv]),
        RI = Dn(II),
        NI = Dn([ov, xv]),
        VI = e => Qn("items", "items", {
            tag: "required",
            process: {}
        }, Bn(Gn((t => qn(`Checking item of ${e}`, zI, t).fold((e => rn.error(Yn(e))), (e => rn.value(e))))))),
        zI = En((() => {
            return jn("type", {
                alertbanner: TF,
                bar: Dn((e = VI("bar"), [Yb, e])),
                button: AF,
                checkbox: FF,
                colorinput: HF,
                colorpicker: PF,
                dropzone: qF,
                grid: Dn(KF(VI("grid"))),
                iframe: QF,
                input: rI,
                listbox: uI,
                selectbox: pI,
                sizeinput: bI,
                slider: xI,
                textarea: OI,
                urlinput: RI,
                customeditor: GF,
                htmlpanel: JF,
                imagepreview: tI,
                collection: NF,
                label: Dn(aI(VI("label"))),
                table: kI,
                tree: FI,
                panel: LI
            });
            var e
        })),
        HI = [Yb, yr("classes", []), dr("items", zI)],
        LI = Dn(HI),
        PI = [kv("tab"), ev, dr("items", zI)],
        UI = [Yb, cr("tabs", PI)],
        WI = Dn(UI),
        jI = wF,
        GI = OF,
        $I = Dn([sr("title"), nr("body", jn("type", {
            panel: LI,
            tabpanel: WI
        })), Sr("size", "normal"), dr("buttons", GI), yr("initialData", {}), Or("onAction", b), Or("onChange", b), Or("onSubmit", b), Or("onClose", b), Or("onCancel", b), Or("onTabChange", b)]),
        qI = Dn([ar("type", ["cancel", "custom"]), ...jI]),
        XI = Dn([sr("title"), sr("url"), gr("height"), gr("width"), br("buttons", qI), Or("onAction", b), Or("onCancel", b), Or("onClose", b), Or("onMessage", b)]),
        KI = e => a(e) ? [e].concat(X(fe(e), KI)) : l(e) ? X(e, KI) : [],
        YI = e => s(e.type) && s(e.name),
        JI = {
            checkbox: IF,
            colorinput: LF,
            colorpicker: UF,
            dropzone: XF,
            input: sI,
            iframe: eI,
            imagepreview: oI,
            selectbox: hI,
            sizeinput: vI,
            slider: wI,
            listbox: mI,
            size: vI,
            textarea: _I,
            urlinput: NI,
            customeditor: $F,
            collection: VF,
            togglemenuitem: yF
        },
        ZI = e => {
            const t = (e => U(KI(e), YI))(e),
                o = X(t, (e => (e => A.from(JI[e.type]))(e).fold((() => []), (t => [nr(e.name, t)]))));
            return Dn(o)
        },
        QI = e => {
            var t;
            return {
                internalDialog: Xn(qn("dialog", $I, e)),
                dataValidator: ZI(e),
                initialData: null !== (t = e.initialData) && void 0 !== t ? t : {}
            }
        },
        eR = {
            open: (e, t) => {
                const o = QI(t);
                return e(o.internalDialog, o.initialData, o.dataValidator)
            },
            openUrl: (e, t) => e(Xn(qn("dialog", XI, t))),
            redial: e => QI(e)
        };
    var tR = Object.freeze({
            __proto__: null,
            events: (e, t) => {
                const o = (o, n) => {
                    e.updateState.each((e => {
                        const r = e(o, n);
                        t.set(r)
                    })), e.renderComponents.each((r => {
                        const s = r(n, t.get());
                        (e.reuseDom ? Pp : Lp)(o, s)
                    }))
                };
                return Hs([Us(ds(), ((t, n) => {
                    const r = n;
                    if (!r.universal) {
                        const n = e.channel;
                        R(r.channels, n) && o(t, r.data)
                    }
                })), Ys(((t, n) => {
                    e.initialData.each((e => {
                        o(t, e)
                    }))
                }))])
            }
        }),
        oR = Object.freeze({
            __proto__: null,
            getState: (e, t, o) => o
        }),
        nR = [or("channel"), ur("renderComponents"), ur("updateState"), ur("initialData"), Cr("reuseDom", !0)];
    const rR = Ol({
            fields: nR,
            name: "reflecting",
            active: tR,
            apis: oR,
            state: Object.freeze({
                __proto__: null,
                init: () => {
                    const e = Er(A.none());
                    return {
                        readState: () => e.get().getOr("none"),
                        get: e.get,
                        set: e.set,
                        clear: () => e.set(A.none())
                    }
                }
            })
        }),
        sR = e => {
            const t = [],
                o = {};
            return le(e, ((e, n) => {
                e.fold((() => {
                    t.push(n)
                }), (e => {
                    o[n] = e
                }))
            })), t.length > 0 ? rn.error(t) : rn.value(o)
        },
        aR = (e, t, o) => {
            const n = Uh(mC.sketch((n => ({
                dom: {
                    tag: "div",
                    classes: ["tox-form"].concat(e.classes)
                },
                components: H(e.items, (e => w_(n, e, t, o)))
            }))));
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__body"]
                },
                components: [{
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog__body-content"]
                    },
                    components: [n.asSpec()]
                }],
                behaviours: kl([Hp.config({
                    mode: "acyclic",
                    useTabstopAt: C(VC)
                }), (r = n, ym.config({
                    find: r.getOpt
                })), CC(n, {
                    postprocess: e => sR(e).fold((e => (console.error(e), {})), w)
                })])
            };
            var r
        },
        iR = pm({
            name: "TabButton",
            configFields: [yr("uid", void 0), or("value"), Qn("dom", "dom", xn((() => ({
                attributes: {
                    role: "tab",
                    id: la("aria"),
                    "aria-selected": "false"
                }
            }))), Nn()), ur("action"), yr("domModification", {}), gu("tabButtonBehaviours", [eh, Hp, mu]), or("view")],
            factory: (e, t) => ({
                uid: e.uid,
                dom: e.dom,
                components: e.components,
                events: dh(e.action),
                behaviours: hu(e.tabButtonBehaviours, [eh.config({}), Hp.config({
                    mode: "execution",
                    useSpace: !0,
                    useEnter: !0
                }), mu.config({
                    store: {
                        mode: "memory",
                        initialValue: e.value
                    }
                })]),
                domModification: e.domModification
            })
        }),
        lR = x([or("tabs"), or("dom"), yr("clickToDismiss", !1), gu("tabbarBehaviours", [Wm, Hp]), Ai(["tabClass", "selectedClass"])]),
        cR = Wu({
            factory: iR,
            name: "tabs",
            unit: "tab",
            overrides: e => {
                const t = (e, t) => {
                        Wm.dehighlight(e, t), Is(e, Ms(), {
                            tabbar: e,
                            button: t
                        })
                    },
                    o = (e, t) => {
                        Wm.highlight(e, t), Is(e, As(), {
                            tabbar: e,
                            button: t
                        })
                    };
                return {
                    action: n => {
                        const r = n.getSystem().getByUid(e.uid).getOrDie(),
                            s = Wm.isHighlighted(r, n);
                        (s && e.clickToDismiss ? t : s ? b : o)(r, n)
                    },
                    domModification: {
                        classes: [e.markers.tabClass]
                    }
                }
            }
        }),
        dR = x([cR]),
        uR = hm({
            name: "Tabbar",
            configFields: lR(),
            partFields: dR(),
            factory: (e, t, o, n) => ({
                uid: e.uid,
                dom: e.dom,
                components: t,
                "debug.sketcher": "Tabbar",
                domModification: {
                    attributes: {
                        role: "tablist"
                    }
                },
                behaviours: hu(e.tabbarBehaviours, [Wm.config({
                    highlightClass: e.markers.selectedClass,
                    itemClass: e.markers.tabClass,
                    onHighlight: (e, t) => {
                        kt(t.element, "aria-selected", "true")
                    },
                    onDehighlight: (e, t) => {
                        kt(t.element, "aria-selected", "false")
                    }
                }), Hp.config({
                    mode: "flow",
                    getInitial: e => Wm.getHighlighted(e).map((e => e.element)),
                    selector: "." + e.markers.tabClass,
                    executeOnMove: !0
                })])
            })
        }),
        mR = pm({
            name: "Tabview",
            configFields: [gu("tabviewBehaviours", [Xp])],
            factory: (e, t) => ({
                uid: e.uid,
                dom: e.dom,
                behaviours: hu(e.tabviewBehaviours, [Xp.config({})]),
                domModification: {
                    attributes: {
                        role: "tabpanel"
                    }
                }
            })
        }),
        gR = x([yr("selectFirst", !0), Di("onChangeTab"), Di("onDismissTab"), yr("tabs", []), gu("tabSectionBehaviours", [])]),
        pR = Lu({
            factory: uR,
            schema: [or("dom"), lr("markers", [or("tabClass"), or("selectedClass")])],
            name: "tabbar",
            defaults: e => ({
                tabs: e.tabs
            })
        }),
        hR = Lu({
            factory: mR,
            name: "tabview"
        }),
        fR = x([pR, hR]),
        bR = hm({
            name: "TabSection",
            configFields: gR(),
            partFields: fR(),
            factory: (e, t, o, n) => {
                const r = (t, o) => {
                    em(t, e, "tabbar").each((e => {
                        o(e).each(Rs)
                    }))
                };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    behaviours: pu(e.tabSectionBehaviours),
                    events: Hs(q([e.selectFirst ? [Ys(((e, t) => {
                            r(e, Wm.getFirst)
                        }))] : [],
                        [Us(As(), ((t, o) => {
                            (t => {
                                const o = mu.getValue(t);
                                em(t, e, "tabview").each((n => {
                                    G(e.tabs, (e => e.value === o)).each((o => {
                                        const r = o.view();
                                        _t(t.element, "id").each((e => {
                                            kt(n.element, "aria-labelledby", e)
                                        })), Xp.set(n, r), e.onChangeTab(n, t, r)
                                    }))
                                }))
                            })(o.event.button)
                        })), Us(Ms(), ((t, o) => {
                            const n = o.event.button;
                            e.onDismissTab(t, n)
                        }))]
                    ])),
                    apis: {
                        getViewItems: t => em(t, e, "tabview").map((e => Xp.contents(e))).getOr([]),
                        showTab: (e, t) => {
                            r(e, (e => {
                                const o = Wm.getCandidates(e);
                                return G(o, (e => mu.getValue(e) === t)).filter((t => !Wm.isHighlighted(e, t)))
                            }))
                        }
                    }
                }
            },
            apis: {
                getViewItems: (e, t) => e.getViewItems(t),
                showTab: (e, t, o) => {
                    e.showTab(t, o)
                }
            }
        }),
        vR = (e, t) => {
            Dt(e, "height", t + "px"), Dt(e, "flex-basis", t + "px")
        },
        yR = (e, t, o) => {
            mi(e, '[role="dialog"]').each((e => {
                pi(e, '[role="tablist"]').each((n => {
                    o.get().map((o => (Dt(t, "height", "0"), Dt(t, "flex-basis", "0"), Math.min(o, ((e, t, o) => {
                        const n = ot(e).dom,
                            r = mi(e, ".tox-dialog-wrap").getOr(e);
                        let s;
                        s = "fixed" === It(r, "position") ? Math.max(n.clientHeight, window.innerHeight) : Math.max(n.offsetHeight, n.scrollHeight);
                        const a = Wt(t),
                            i = t.dom.offsetLeft >= o.dom.offsetLeft + Jt(o) ? Math.max(Wt(o), a) : a,
                            l = parseInt(It(e, "margin-top"), 10) || 0,
                            c = parseInt(It(e, "margin-bottom"), 10) || 0;
                        return s - (Wt(e) + l + c - i)
                    })(e, t, n))))).each((e => {
                        vR(t, e)
                    }))
                }))
            }))
        },
        xR = e => pi(e, '[role="tabpanel"]'),
        wR = "send-data-to-section",
        SR = "send-data-to-view",
        kR = (e, t, o) => {
            const n = Er({}),
                r = e => {
                    const t = mu.getValue(e),
                        o = sR(t).getOr({}),
                        r = n.get(),
                        s = fn(r, o);
                    n.set(s)
                },
                s = e => {
                    const t = n.get();
                    mu.setValue(e, t)
                },
                a = Er(null),
                i = H(e.tabs, (e => ({
                    value: e.name,
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog__body-nav-item"]
                    },
                    components: [ti(o.shared.providers.translate(e.title))],
                    view: () => [mC.sketch((n => ({
                        dom: {
                            tag: "div",
                            classes: ["tox-form"]
                        },
                        components: H(e.items, (e => w_(n, e, t, o))),
                        formBehaviours: kl([Hp.config({
                            mode: "acyclic",
                            useTabstopAt: C(VC)
                        }), Kp("TabView.form.events", [Ys(s), Js(r)]), Al.config({
                            channels: Dr([{
                                key: wR,
                                value: {
                                    onReceive: r
                                }
                            }, {
                                key: SR,
                                value: {
                                    onReceive: s
                                }
                            }])
                        })])
                    })))]
                }))),
                l = (e => {
                    const t = Ql(),
                        o = [Ys((o => {
                            const n = o.element;
                            xR(n).each((r => {
                                Dt(r, "visibility", "hidden"), o.getSystem().getByDom(r).toOptional().each((o => {
                                    const n = ((e, t, o) => H(e, ((n, r) => {
                                            Xp.set(o, e[r].view());
                                            const s = t.dom.getBoundingClientRect();
                                            return Xp.set(o, []), s.height
                                        })))(e, r, o),
                                        s = (e => oe(ee(e, ((e, t) => e > t ? -1 : e < t ? 1 : 0))))(n);
                                    s.fold(t.clear, t.set)
                                })), yR(n, r, t), Ht(r, "visibility"), ((e, t) => {
                                    oe(e).each((e => bR.showTab(t, e.value)))
                                })(e, o), requestAnimationFrame((() => {
                                    yR(n, r, t)
                                }))
                            }))
                        })), Us(ws(), (e => {
                            const o = e.element;
                            xR(o).each((e => {
                                yR(o, e, t)
                            }))
                        })), Us(uS, ((e, o) => {
                            const n = e.element;
                            xR(n).each((e => {
                                const o = Il(ht(e));
                                Dt(e, "visibility", "hidden");
                                const r = Nt(e, "height").map((e => parseInt(e, 10)));
                                Ht(e, "height"), Ht(e, "flex-basis");
                                const s = e.dom.getBoundingClientRect().height;
                                r.forall((e => s > e)) ? (t.set(s), yR(n, e, t)) : r.each((t => {
                                    vR(e, t)
                                })), Ht(e, "visibility"), o.each(Dl)
                            }))
                        }))];
                    return {
                        extraEvents: o,
                        selectFirst: !1
                    }
                })(i);
            return bR.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__body"]
                },
                onChangeTab: (e, t, o) => {
                    const n = mu.getValue(t);
                    Is(e, dS, {
                        name: n,
                        oldName: a.get()
                    }), a.set(n)
                },
                tabs: i,
                components: [bR.parts.tabbar({
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog__body-nav"]
                    },
                    components: [uR.parts.tabs({})],
                    markers: {
                        tabClass: "tox-tab",
                        selectedClass: "tox-dialog__body-nav-item--active"
                    },
                    tabbarBehaviours: kl([Jw.config({})])
                }), bR.parts.tabview({
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog__body-content"]
                    }
                })],
                selectFirst: l.selectFirst,
                tabSectionBehaviours: kl([Kp("tabpanel", l.extraEvents), Hp.config({
                    mode: "acyclic"
                }), ym.config({
                    find: e => oe(bR.getViewItems(e))
                }), _C(A.none(), (e => (e.getSystem().broadcastOn([wR], {}), n.get())), ((e, t) => {
                    n.set(t), e.getSystem().broadcastOn([SR], {})
                }))])
            })
        },
        CR = la("update-dialog"),
        OR = la("update-title"),
        _R = la("update-body"),
        TR = la("update-footer"),
        ER = la("body-send-message"),
        AR = (e, t, o, n, r) => ({
            dom: {
                tag: "div",
                classes: ["tox-dialog__content-js"],
                attributes: {
                    ...o.map((e => ({
                        id: e
                    }))).getOr({}),
                    ...r ? {
                        "aria-live": "polite"
                    } : {}
                }
            },
            components: [],
            behaviours: kl([xC(0), rR.config({
                channel: `${_R}-${t}`,
                updateState: (e, t) => A.some({
                    isTabPanel: () => "tabpanel" === t.body.type
                }),
                renderComponents: e => {
                    const t = e.body;
                    return "tabpanel" === t.type ? [kR(t, e.initialData, n)] : [aR(t, e.initialData, n)]
                },
                initialData: e
            })])
        });

    function MR(e) {
        return MR = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, MR(e)
    }

    function DR(e, t) {
        return DR = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        }, DR(e, t)
    }

    function BR() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
        } catch (e) {
            return !1
        }
    }

    function FR(e, t, o) {
        return FR = BR() ? Reflect.construct : function (e, t, o) {
            var n = [null];
            n.push.apply(n, t);
            var r = new(Function.bind.apply(e, n));
            return o && DR(r, o.prototype), r
        }, FR.apply(null, arguments)
    }

    function IR(e) {
        return function (e) {
            if (Array.isArray(e)) return RR(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || function (e, t) {
            if (e) {
                if ("string" == typeof e) return RR(e, t);
                var o = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === o && e.constructor && (o = e.constructor.name), "Map" === o || "Set" === o ? Array.from(e) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? RR(e, t) : void 0
            }
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function RR(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
        return n
    }
    var NR = Object.hasOwnProperty,
        VR = Object.setPrototypeOf,
        zR = Object.isFrozen,
        HR = Object.getPrototypeOf,
        LR = Object.getOwnPropertyDescriptor,
        PR = Object.freeze,
        UR = Object.seal,
        WR = Object.create,
        jR = "undefined" != typeof Reflect && Reflect,
        GR = jR.apply,
        $R = jR.construct;
    GR || (GR = function (e, t, o) {
        return e.apply(t, o)
    }), PR || (PR = function (e) {
        return e
    }), UR || (UR = function (e) {
        return e
    }), $R || ($R = function (e, t) {
        return FR(e, IR(t))
    });
    var qR, XR = rN(Array.prototype.forEach),
        KR = rN(Array.prototype.pop),
        YR = rN(Array.prototype.push),
        JR = rN(String.prototype.toLowerCase),
        ZR = rN(String.prototype.match),
        QR = rN(String.prototype.replace),
        eN = rN(String.prototype.indexOf),
        tN = rN(String.prototype.trim),
        oN = rN(RegExp.prototype.test),
        nN = (qR = TypeError, function () {
            for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
            return $R(qR, t)
        });

    function rN(e) {
        return function (t) {
            for (var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) n[r - 1] = arguments[r];
            return GR(e, t, n)
        }
    }

    function sN(e, t) {
        VR && VR(e, null);
        for (var o = t.length; o--;) {
            var n = t[o];
            if ("string" == typeof n) {
                var r = JR(n);
                r !== n && (zR(t) || (t[o] = r), n = r)
            }
            e[n] = !0
        }
        return e
    }

    function aN(e) {
        var t, o = WR(null);
        for (t in e) GR(NR, e, [t]) && (o[t] = e[t]);
        return o
    }

    function iN(e, t) {
        for (; null !== e;) {
            var o = LR(e, t);
            if (o) {
                if (o.get) return rN(o.get);
                if ("function" == typeof o.value) return rN(o.value)
            }
            e = HR(e)
        }
        return function (e) {
            return console.warn("fallback value for", e), null
        }
    }
    var lN = PR(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
        cN = PR(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
        dN = PR(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
        uN = PR(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
        mN = PR(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]),
        gN = PR(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
        pN = PR(["#text"]),
        hN = PR(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
        fN = PR(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
        bN = PR(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
        vN = PR(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
        yN = UR(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
        xN = UR(/<%[\w\W]*|[\w\W]*%>/gm),
        wN = UR(/^data-[\-\w.\u00B7-\uFFFF]/),
        SN = UR(/^aria-[\-\w]+$/),
        kN = UR(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
        CN = UR(/^(?:\w+script|data):/i),
        ON = UR(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
        _N = UR(/^html$/i),
        TN = function () {
            return "undefined" == typeof window ? null : window
        },
        EN = function (e, t) {
            if ("object" !== MR(e) || "function" != typeof e.createPolicy) return null;
            var o = null,
                n = "data-tt-policy-suffix";
            t.currentScript && t.currentScript.hasAttribute(n) && (o = t.currentScript.getAttribute(n));
            var r = "dompurify" + (o ? "#" + o : "");
            try {
                return e.createPolicy(r, {
                    createHTML: function (e) {
                        return e
                    }
                })
            } catch (e) {
                return console.warn("TrustedTypes policy " + r + " could not be created."), null
            }
        },
        AN = function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : TN(),
                o = function (t) {
                    return e(t)
                };
            if (o.version = "2.3.8", o.removed = [], !t || !t.document || 9 !== t.document.nodeType) return o.isSupported = !1, o;
            var n = t.document,
                r = t.document,
                s = t.DocumentFragment,
                a = t.HTMLTemplateElement,
                i = t.Node,
                l = t.Element,
                c = t.NodeFilter,
                d = t.NamedNodeMap,
                u = void 0 === d ? t.NamedNodeMap || t.MozNamedAttrMap : d,
                m = t.HTMLFormElement,
                g = t.DOMParser,
                p = t.trustedTypes,
                h = l.prototype,
                f = iN(h, "cloneNode"),
                b = iN(h, "nextSibling"),
                v = iN(h, "childNodes"),
                y = iN(h, "parentNode");
            if ("function" == typeof a) {
                var x = r.createElement("template");
                x.content && x.content.ownerDocument && (r = x.content.ownerDocument)
            }
            var w = EN(p, n),
                S = w ? w.createHTML("") : "",
                k = r,
                C = k.implementation,
                O = k.createNodeIterator,
                _ = k.createDocumentFragment,
                T = k.getElementsByTagName,
                E = n.importNode,
                A = {};
            try {
                A = aN(r).documentMode ? r.documentMode : {}
            } catch (e) {}
            var M = {};
            o.isSupported = "function" == typeof y && C && void 0 !== C.createHTMLDocument && 9 !== A;
            var D, B, F = yN,
                I = xN,
                R = wN,
                N = SN,
                V = CN,
                z = ON,
                H = kN,
                L = null,
                P = sN({}, [].concat(IR(lN), IR(cN), IR(dN), IR(mN), IR(pN))),
                U = null,
                W = sN({}, [].concat(IR(hN), IR(fN), IR(bN), IR(vN))),
                j = Object.seal(Object.create(null, {
                    tagNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    attributeNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    allowCustomizedBuiltInElements: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: !1
                    }
                })),
                G = null,
                $ = null,
                q = !0,
                X = !0,
                K = !1,
                Y = !1,
                J = !1,
                Z = !1,
                Q = !1,
                ee = !1,
                te = !1,
                oe = !1,
                ne = !0,
                re = !0,
                se = !1,
                ae = {},
                ie = null,
                le = sN({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]),
                ce = null,
                de = sN({}, ["audio", "video", "img", "source", "image", "track"]),
                ue = null,
                me = sN({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
                ge = "http://www.w3.org/1998/Math/MathML",
                pe = "http://www.w3.org/2000/svg",
                he = "http://www.w3.org/1999/xhtml",
                fe = he,
                be = !1,
                ve = ["application/xhtml+xml", "text/html"],
                ye = "text/html",
                xe = null,
                we = r.createElement("form"),
                Se = function (e) {
                    return e instanceof RegExp || e instanceof Function
                },
                ke = function (e) {
                    xe && xe === e || (e && "object" === MR(e) || (e = {}), e = aN(e), L = "ALLOWED_TAGS" in e ? sN({}, e.ALLOWED_TAGS) : P, U = "ALLOWED_ATTR" in e ? sN({}, e.ALLOWED_ATTR) : W, ue = "ADD_URI_SAFE_ATTR" in e ? sN(aN(me), e.ADD_URI_SAFE_ATTR) : me, ce = "ADD_DATA_URI_TAGS" in e ? sN(aN(de), e.ADD_DATA_URI_TAGS) : de, ie = "FORBID_CONTENTS" in e ? sN({}, e.FORBID_CONTENTS) : le, G = "FORBID_TAGS" in e ? sN({}, e.FORBID_TAGS) : {}, $ = "FORBID_ATTR" in e ? sN({}, e.FORBID_ATTR) : {}, ae = "USE_PROFILES" in e && e.USE_PROFILES, q = !1 !== e.ALLOW_ARIA_ATTR, X = !1 !== e.ALLOW_DATA_ATTR, K = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Y = e.SAFE_FOR_TEMPLATES || !1, J = e.WHOLE_DOCUMENT || !1, ee = e.RETURN_DOM || !1, te = e.RETURN_DOM_FRAGMENT || !1, oe = e.RETURN_TRUSTED_TYPE || !1, Q = e.FORCE_BODY || !1, ne = !1 !== e.SANITIZE_DOM, re = !1 !== e.KEEP_CONTENT, se = e.IN_PLACE || !1, H = e.ALLOWED_URI_REGEXP || H, fe = e.NAMESPACE || he, e.CUSTOM_ELEMENT_HANDLING && Se(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (j.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Se(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (j.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (j.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), D = D = -1 === ve.indexOf(e.PARSER_MEDIA_TYPE) ? ye : e.PARSER_MEDIA_TYPE, B = "application/xhtml+xml" === D ? function (e) {
                        return e
                    } : JR, Y && (X = !1), te && (ee = !0), ae && (L = sN({}, IR(pN)), U = [], !0 === ae.html && (sN(L, lN), sN(U, hN)), !0 === ae.svg && (sN(L, cN), sN(U, fN), sN(U, vN)), !0 === ae.svgFilters && (sN(L, dN), sN(U, fN), sN(U, vN)), !0 === ae.mathMl && (sN(L, mN), sN(U, bN), sN(U, vN))), e.ADD_TAGS && (L === P && (L = aN(L)), sN(L, e.ADD_TAGS)), e.ADD_ATTR && (U === W && (U = aN(U)), sN(U, e.ADD_ATTR)), e.ADD_URI_SAFE_ATTR && sN(ue, e.ADD_URI_SAFE_ATTR), e.FORBID_CONTENTS && (ie === le && (ie = aN(ie)), sN(ie, e.FORBID_CONTENTS)), re && (L["#text"] = !0), J && sN(L, ["html", "head", "body"]), L.table && (sN(L, ["tbody"]), delete G.tbody), PR && PR(e), xe = e)
                },
                Ce = sN({}, ["mi", "mo", "mn", "ms", "mtext"]),
                Oe = sN({}, ["foreignobject", "desc", "title", "annotation-xml"]),
                _e = sN({}, ["title", "style", "font", "a", "script"]),
                Te = sN({}, cN);
            sN(Te, dN), sN(Te, uN);
            var Ee = sN({}, mN);
            sN(Ee, gN);
            var Ae = function (e) {
                    var t = y(e);
                    t && t.tagName || (t = {
                        namespaceURI: he,
                        tagName: "template"
                    });
                    var o = JR(e.tagName),
                        n = JR(t.tagName);
                    return e.namespaceURI === pe ? t.namespaceURI === he ? "svg" === o : t.namespaceURI === ge ? "svg" === o && ("annotation-xml" === n || Ce[n]) : Boolean(Te[o]) : e.namespaceURI === ge ? t.namespaceURI === he ? "math" === o : t.namespaceURI === pe ? "math" === o && Oe[n] : Boolean(Ee[o]) : e.namespaceURI === he && !(t.namespaceURI === pe && !Oe[n]) && !(t.namespaceURI === ge && !Ce[n]) && !Ee[o] && (_e[o] || !Te[o])
                },
                Me = function (e) {
                    YR(o.removed, {
                        element: e
                    });
                    try {
                        e.parentNode.removeChild(e)
                    } catch (t) {
                        try {
                            e.outerHTML = S
                        } catch (t) {
                            e.remove()
                        }
                    }
                },
                De = function (e, t) {
                    try {
                        YR(o.removed, {
                            attribute: t.getAttributeNode(e),
                            from: t
                        })
                    } catch (e) {
                        YR(o.removed, {
                            attribute: null,
                            from: t
                        })
                    }
                    if (t.removeAttribute(e), "is" === e && !U[e])
                        if (ee || te) try {
                            Me(t)
                        } catch (e) {} else try {
                            t.setAttribute(e, "")
                        } catch (e) {}
                },
                Be = function (e) {
                    var t, o;
                    if (Q) e = "<remove></remove>" + e;
                    else {
                        var n = ZR(e, /^[\r\n\t ]+/);
                        o = n && n[0]
                    }
                    "application/xhtml+xml" === D && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                    var s = w ? w.createHTML(e) : e;
                    if (fe === he) try {
                        t = (new g).parseFromString(s, D)
                    } catch (e) {}
                    if (!t || !t.documentElement) {
                        t = C.createDocument(fe, "template", null);
                        try {
                            t.documentElement.innerHTML = be ? "" : s
                        } catch (e) {}
                    }
                    var a = t.body || t.documentElement;
                    return e && o && a.insertBefore(r.createTextNode(o), a.childNodes[0] || null), fe === he ? T.call(t, J ? "html" : "body")[0] : J ? t.documentElement : a
                },
                Fe = function (e) {
                    return O.call(e.ownerDocument || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT, null, !1)
                },
                Ie = function (e) {
                    return e instanceof m && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof u) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore)
                },
                Re = function (e) {
                    return "object" === MR(i) ? e instanceof i : e && "object" === MR(e) && "number" == typeof e.nodeType && "string" == typeof e.nodeName
                },
                Ne = function (e, t, n) {
                    M[e] && XR(M[e], (function (e) {
                        e.call(o, t, n, xe)
                    }))
                },
                Ve = function (e) {
                    var t;
                    if (Ne("beforeSanitizeElements", e, null), Ie(e)) return Me(e), !0;
                    if (oN(/[\u0080-\uFFFF]/, e.nodeName)) return Me(e), !0;
                    var n = B(e.nodeName);
                    if (Ne("uponSanitizeElement", e, {
                            tagName: n,
                            allowedTags: L
                        }), e.hasChildNodes() && !Re(e.firstElementChild) && (!Re(e.content) || !Re(e.content.firstElementChild)) && oN(/<[/\w]/g, e.innerHTML) && oN(/<[/\w]/g, e.textContent)) return Me(e), !0;
                    if ("select" === n && oN(/<template/i, e.innerHTML)) return Me(e), !0;
                    if (!L[n] || G[n]) {
                        if (!G[n] && He(n)) {
                            if (j.tagNameCheck instanceof RegExp && oN(j.tagNameCheck, n)) return !1;
                            if (j.tagNameCheck instanceof Function && j.tagNameCheck(n)) return !1
                        }
                        if (re && !ie[n]) {
                            var r = y(e) || e.parentNode,
                                s = v(e) || e.childNodes;
                            if (s && r)
                                for (var a = s.length - 1; a >= 0; --a) r.insertBefore(f(s[a], !0), b(e))
                        }
                        return Me(e), !0
                    }
                    return e instanceof l && !Ae(e) ? (Me(e), !0) : "noscript" !== n && "noembed" !== n || !oN(/<\/no(script|embed)/i, e.innerHTML) ? (Y && 3 === e.nodeType && (t = e.textContent, t = QR(t, F, " "), t = QR(t, I, " "), e.textContent !== t && (YR(o.removed, {
                        element: e.cloneNode()
                    }), e.textContent = t)), Ne("afterSanitizeElements", e, null), !1) : (Me(e), !0)
                },
                ze = function (e, t, o) {
                    if (ne && ("id" === t || "name" === t) && (o in r || o in we)) return !1;
                    if (X && !$[t] && oN(R, t));
                    else if (q && oN(N, t));
                    else if (!U[t] || $[t]) {
                        if (!(He(e) && (j.tagNameCheck instanceof RegExp && oN(j.tagNameCheck, e) || j.tagNameCheck instanceof Function && j.tagNameCheck(e)) && (j.attributeNameCheck instanceof RegExp && oN(j.attributeNameCheck, t) || j.attributeNameCheck instanceof Function && j.attributeNameCheck(t)) || "is" === t && j.allowCustomizedBuiltInElements && (j.tagNameCheck instanceof RegExp && oN(j.tagNameCheck, o) || j.tagNameCheck instanceof Function && j.tagNameCheck(o)))) return !1
                    } else if (ue[t]);
                    else if (oN(H, QR(o, z, "")));
                    else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== eN(o, "data:") || !ce[e])
                        if (K && !oN(V, QR(o, z, "")));
                        else if (o) return !1;
                    return !0
                },
                He = function (e) {
                    return e.indexOf("-") > 0
                },
                Le = function (e) {
                    var t, o, n, r;
                    Ne("beforeSanitizeAttributes", e, null);
                    var s = e.attributes;
                    if (s) {
                        var a = {
                            attrName: "",
                            attrValue: "",
                            keepAttr: !0,
                            allowedAttributes: U
                        };
                        for (r = s.length; r--;) {
                            var i = t = s[r],
                                l = i.name,
                                c = i.namespaceURI;
                            o = "value" === l ? t.value : tN(t.value), n = B(l);
                            var d = o;
                            if (a.attrName = n, a.attrValue = o, a.keepAttr = !0, a.forceKeepAttr = void 0, Ne("uponSanitizeAttribute", e, a), o = a.attrValue, !a.forceKeepAttr)
                                if (a.keepAttr)
                                    if (oN(/\/>/i, o)) De(l, e);
                                    else {
                                        Y && (o = QR(o, F, " "), o = QR(o, I, " "));
                                        var u = B(e.nodeName);
                                        if (ze(u, n, o)) {
                                            if (o !== d) try {
                                                c ? e.setAttributeNS(c, l, o) : e.setAttribute(l, o)
                                            } catch (t) {
                                                De(l, e)
                                            }
                                        } else De(l, e)
                                    }
                            else De(l, e)
                        }
                        Ne("afterSanitizeAttributes", e, null)
                    }
                },
                Pe = function e(t) {
                    var o, n = Fe(t);
                    for (Ne("beforeSanitizeShadowDOM", t, null); o = n.nextNode();) Ne("uponSanitizeShadowNode", o, null), Ve(o) || (o.content instanceof s && e(o.content), Le(o));
                    Ne("afterSanitizeShadowDOM", t, null)
                };
            return o.sanitize = function (e, r) {
                var a, l, c, d, u;
                if ((be = !e) && (e = "\x3c!--\x3e"), "string" != typeof e && !Re(e)) {
                    if ("function" != typeof e.toString) throw nN("toString is not a function");
                    if ("string" != typeof (e = e.toString())) throw nN("dirty is not a string, aborting")
                }
                if (!o.isSupported) {
                    if ("object" === MR(t.toStaticHTML) || "function" == typeof t.toStaticHTML) {
                        if ("string" == typeof e) return t.toStaticHTML(e);
                        if (Re(e)) return t.toStaticHTML(e.outerHTML)
                    }
                    return e
                }
                if (Z || ke(r), o.removed = [], "string" == typeof e && (se = !1), se) {
                    if (e.nodeName) {
                        var m = B(e.nodeName);
                        if (!L[m] || G[m]) throw nN("root node is forbidden and cannot be sanitized in-place")
                    }
                } else if (e instanceof i) 1 === (l = (a = Be("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === l.nodeName || "HTML" === l.nodeName ? a = l : a.appendChild(l);
                else {
                    if (!ee && !Y && !J && -1 === e.indexOf("<")) return w && oe ? w.createHTML(e) : e;
                    if (!(a = Be(e))) return ee ? null : oe ? S : ""
                }
                a && Q && Me(a.firstChild);
                for (var g = Fe(se ? e : a); c = g.nextNode();) 3 === c.nodeType && c === d || Ve(c) || (c.content instanceof s && Pe(c.content), Le(c), d = c);
                if (d = null, se) return e;
                if (ee) {
                    if (te)
                        for (u = _.call(a.ownerDocument); a.firstChild;) u.appendChild(a.firstChild);
                    else u = a;
                    return U.shadowroot && (u = E.call(n, u, !0)), u
                }
                var p = J ? a.outerHTML : a.innerHTML;
                return J && L["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && oN(_N, a.ownerDocument.doctype.name) && (p = "<!DOCTYPE " + a.ownerDocument.doctype.name + ">\n" + p), Y && (p = QR(p, F, " "), p = QR(p, I, " ")), w && oe ? w.createHTML(p) : p
            }, o.setConfig = function (e) {
                ke(e), Z = !0
            }, o.clearConfig = function () {
                xe = null, Z = !1
            }, o.isValidAttribute = function (e, t, o) {
                xe || ke({});
                var n = B(e),
                    r = B(t);
                return ze(n, r, o)
            }, o.addHook = function (e, t) {
                "function" == typeof t && (M[e] = M[e] || [], YR(M[e], t))
            }, o.removeHook = function (e) {
                if (M[e]) return KR(M[e])
            }, o.removeHooks = function (e) {
                M[e] && (M[e] = [])
            }, o.removeAllHooks = function () {
                M = {}
            }, o
        }();
    const MN = e => AN().sanitize(e),
        DN = sf.deviceType.isTouch(),
        BN = (e, t) => ({
            dom: {
                tag: "div",
                styles: {
                    display: "none"
                },
                classes: ["tox-dialog__header"]
            },
            components: [e, t]
        }),
        FN = (e, t) => bF.parts.close(Ph.sketch({
            dom: {
                tag: "button",
                classes: ["tox-button", "tox-button--icon", "tox-button--naked"],
                attributes: {
                    type: "button",
                    "aria-label": t.translate("Close")
                }
            },
            action: e,
            buttonBehaviours: kl([Jw.config({})])
        })),
        IN = () => bF.parts.title({
            dom: {
                tag: "div",
                classes: ["tox-dialog__title"],
                innerHtml: "",
                styles: {
                    display: "none"
                }
            }
        }),
        RN = (e, t) => bF.parts.body({
            dom: {
                tag: "div",
                classes: ["tox-dialog__body"]
            },
            components: [{
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__body-content"]
                },
                components: [{
                    dom: ZE(`<p>${MN(t.translate(e))}</p>`)
                }]
            }]
        }),
        NN = e => bF.parts.footer({
            dom: {
                tag: "div",
                classes: ["tox-dialog__footer"]
            },
            components: e
        }),
        VN = (e, t) => [jw.sketch({
            dom: {
                tag: "div",
                classes: ["tox-dialog__footer-start"]
            },
            components: e
        }), jw.sketch({
            dom: {
                tag: "div",
                classes: ["tox-dialog__footer-end"]
            },
            components: t
        })],
        zN = e => {
            const t = "tox-dialog",
                o = t + "-wrap",
                n = o + "__backdrop",
                r = t + "__disable-scroll";
            return bF.sketch({
                lazySink: e.lazySink,
                onEscape: t => (e.onEscape(t), A.some(!0)),
                useTabstopAt: e => !VC(e),
                firstTabstop: e.firstTabstop,
                dom: {
                    tag: "div",
                    classes: [t].concat(e.extraClasses),
                    styles: {
                        position: "relative",
                        ...e.extraStyles
                    }
                },
                components: [e.header, e.body, ...e.footer.toArray()],
                parts: {
                    blocker: {
                        dom: ZE(`<div class="${o}"></div>`),
                        components: [{
                            dom: {
                                tag: "div",
                                classes: DN ? [n, n + "--opaque"] : [n]
                            }
                        }]
                    }
                },
                dragBlockClass: o,
                modalBehaviours: kl([eh.config({}), Kp("dialog-events", e.dialogEvents.concat([Ks(Xr(), ((e, t) => {
                    Hp.focusIn(e)
                }))])), Kp("scroll-lock", [Ys((() => {
                    La(xt(), r)
                })), Js((() => {
                    Pa(xt(), r)
                }))]), ...e.extraBehaviours]),
                eventOrder: {
                    [us()]: ["dialog-events"],
                    [Ss()]: ["scroll-lock", "dialog-events", "alloy.base.behaviour"],
                    [ks()]: ["alloy.base.behaviour", "dialog-events", "scroll-lock"],
                    ...e.eventOrder
                }
            })
        },
        HN = e => Ph.sketch({
            dom: {
                tag: "button",
                classes: ["tox-button", "tox-button--icon", "tox-button--naked"],
                attributes: {
                    type: "button",
                    "aria-label": e.translate("Close"),
                    title: e.translate("Close")
                }
            },
            buttonBehaviours: kl([Jw.config({})]),
            components: [Zh("close", {
                tag: "div",
                classes: ["tox-icon"]
            }, e.icons)],
            action: e => {
                Fs(e, sS)
            }
        }),
        LN = (e, t, o, n) => ({
            dom: {
                tag: "div",
                classes: ["tox-dialog__title"],
                attributes: {
                    ...o.map((e => ({
                        id: e
                    }))).getOr({})
                }
            },
            components: [],
            behaviours: kl([rR.config({
                channel: `${OR}-${t}`,
                initialData: e,
                renderComponents: e => [ti(n.translate(e.title))]
            })])
        }),
        PN = () => ({
            dom: ZE('<div class="tox-dialog__draghandle"></div>')
        }),
        UN = (e, t, o) => ((e, t, o) => {
            const n = bF.parts.title(LN(e, t, A.none(), o)),
                r = bF.parts.draghandle(PN()),
                s = bF.parts.close(HN(o)),
                a = [n].concat(e.draggable ? [r] : []).concat([s]);
            return jw.sketch({
                dom: ZE('<div class="tox-dialog__header"></div>'),
                components: a
            })
        })({
            title: o.shared.providers.translate(e),
            draggable: o.dialog.isDraggableModal()
        }, t, o.shared.providers),
        WN = (e, t, o) => ({
            dom: {
                tag: "div",
                classes: ["tox-dialog__busy-spinner"],
                attributes: {
                    "aria-label": o.translate(e)
                },
                styles: {
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    top: "0px",
                    position: "absolute"
                }
            },
            behaviours: t,
            components: [{
                dom: ZE('<div class="tox-spinner"><div></div><div></div><div></div></div>')
            }]
        }),
        jN = (e, t, o) => ({
            onClose: () => o.closeWindow(),
            onBlock: o => {
                bF.setBusy(e(), ((e, n) => WN(o.message, n, t)))
            },
            onUnblock: () => {
                bF.setIdle(e())
            }
        }),
        GN = (e, t, o, n) => si(zN({
            ...e,
            firstTabstop: 1,
            lazySink: n.shared.getSink,
            extraBehaviours: [rR.config({
                channel: `${CR}-${e.id}`,
                updateState: (e, t) => A.some(t),
                initialData: t
            }), TC({}), ...e.extraBehaviours],
            onEscape: e => {
                Fs(e, sS)
            },
            dialogEvents: o,
            eventOrder: {
                [ds()]: [rR.name(), Al.name()],
                [Ss()]: ["scroll-lock", rR.name(), "messages", "dialog-events", "alloy.base.behaviour"],
                [ks()]: ["alloy.base.behaviour", "dialog-events", "messages", rR.name(), "scroll-lock"]
            }
        })),
        $N = (e, t = {}) => H(e, (e => "menu" === e.type ? (e => {
            const o = H(e.items, (e => {
                const o = be(t, e.name).getOr(Er(!1));
                return {
                    ...e,
                    storage: o
                }
            }));
            return {
                ...e,
                items: o
            }
        })(e) : e)),
        qN = e => j(e, ((e, t) => "menu" === t.type ? j(t.items, ((e, t) => (e[t.name] = t.storage, e)), e) : e), {}),
        XN = (e, t) => [$s(Xr(), NC), e(rS, ((e, o, n, r) => {
            Il(ht(r.element)).fold(b, Bl), t.onClose(), o.onClose()
        })), e(sS, ((e, t, o, n) => {
            t.onCancel(e), Fs(n, rS)
        })), Us(cS, ((e, o) => t.onUnblock())), Us(lS, ((e, o) => t.onBlock(o.event)))],
        KN = (e, t, o) => {
            const n = (t, o) => Us(t, ((t, n) => {
                    r(t, ((r, s) => {
                        o(e(), r, n.event, t)
                    }))
                })),
                r = (e, t) => {
                    rR.getState(e).get().each((o => {
                        t(o.internalDialog, e)
                    }))
                };
            return [...XN(n, t), n(iS, ((e, t) => t.onSubmit(e))), n(nS, ((e, t, o) => {
                t.onChange(e, {
                    name: o.name
                })
            })), n(aS, ((e, t, n, r) => {
                const s = () => Hp.focusIn(r),
                    a = e => Tt(e, "disabled") || _t(e, "aria-disabled").exists((e => "true" === e)),
                    i = ht(r.element),
                    l = Il(i);
                t.onAction(e, {
                    name: n.name,
                    value: n.value
                }), Il(i).fold(s, (e => {
                    a(e) || l.exists((t => Qe(e, t) && a(t))) ? s() : o().toOptional().filter((t => !Qe(t.element, e))).each(s)
                }))
            })), n(dS, ((e, t, o) => {
                t.onTabChange(e, {
                    newTabName: o.name,
                    oldTabName: o.oldName
                })
            })), Js((t => {
                const o = e();
                mu.setValue(t, o.getData())
            }))]
        },
        YN = (e, t) => {
            const o = t.map((e => e.footerButtons)).getOr([]),
                n = P(o, (e => "start" === e.align)),
                r = (e, t) => jw.sketch({
                    dom: {
                        tag: "div",
                        classes: [`tox-dialog__footer-${e}`]
                    },
                    components: H(t, (e => e.memento.asSpec()))
                });
            return [r("start", n.pass), r("end", n.fail)]
        },
        JN = (e, t, o) => ({
            dom: ZE('<div class="tox-dialog__footer"></div>'),
            components: [],
            behaviours: kl([rR.config({
                channel: `${TR}-${t}`,
                initialData: e,
                updateState: (e, t) => {
                    const n = H(t.buttons, (e => {
                        const t = Uh(((e, t) => s_(e, e.type, t))(e, o));
                        return {
                            name: e.name,
                            align: e.align,
                            memento: t
                        }
                    }));
                    return A.some({
                        lookupByName: t => ((e, t, o) => G(t, (e => e.name === o)).bind((t => t.memento.getOpt(e))))(e, n, t),
                        footerButtons: n
                    })
                },
                renderComponents: YN
            })])
        }),
        ZN = (e, t, o) => bF.parts.footer(JN(e, t, o)),
        QN = (e, t) => {
            if (e.getRoot().getSystem().isConnected()) {
                const o = ym.getCurrent(e.getFormWrapper()).getOr(e.getFormWrapper());
                return mC.getField(o, t).orThunk((() => {
                    const o = e.getFooter();
                    return rR.getState(o).get().bind((e => e.lookupByName(t)))
                }))
            }
            return A.none()
        },
        eV = (e, t, o) => {
            const n = t => {
                    const o = e.getRoot();
                    o.getSystem().isConnected() && t(o)
                },
                r = {
                    getData: () => {
                        const t = e.getRoot(),
                            n = t.getSystem().isConnected() ? e.getFormWrapper() : t;
                        return {
                            ...mu.getValue(n),
                            ...ce(o, (e => e.get()))
                        }
                    },
                    setData: t => {
                        n((n => {
                            const s = r.getData(),
                                a = fn(s, t),
                                i = ((e, t) => {
                                    const o = e.getRoot();
                                    return rR.getState(o).get().map((e => Xn(qn("data", e.dataValidator, t)))).getOr(t)
                                })(e, a),
                                l = e.getFormWrapper();
                            mu.setValue(l, i), le(o, ((e, t) => {
                                ve(a, t) && e.set(a[t])
                            }))
                        }))
                    },
                    setEnabled: (t, o) => {
                        QN(e, t).each(o ? Fm.enable : Fm.disable)
                    },
                    focus: t => {
                        QN(e, t).each(eh.focus)
                    },
                    block: e => {
                        if (!s(e)) throw new Error("The dialogInstanceAPI.block function should be passed a blocking message of type string as an argument");
                        n((t => {
                            Is(t, lS, {
                                message: e
                            })
                        }))
                    },
                    unblock: () => {
                        n((e => {
                            Fs(e, cS)
                        }))
                    },
                    showTab: t => {
                        n((o => {
                            const n = e.getBody();
                            rR.getState(n).get().exists((e => e.isTabPanel())) && ym.getCurrent(n).each((e => {
                                bR.showTab(e, t)
                            }))
                        }))
                    },
                    redial: s => {
                        n((n => {
                            const a = e.getId(),
                                i = t(s),
                                l = $N(i.internalDialog.buttons, o);
                            n.getSystem().broadcastOn([`${CR}-${a}`], i), n.getSystem().broadcastOn([`${OR}-${a}`], i.internalDialog), n.getSystem().broadcastOn([`${_R}-${a}`], i.internalDialog), n.getSystem().broadcastOn([`${TR}-${a}`], {
                                ...i.internalDialog,
                                buttons: l
                            }), r.setData(i.initialData)
                        }))
                    },
                    close: () => {
                        n((e => {
                            Fs(e, rS)
                        }))
                    },
                    toggleFullscreen: e.toggleFullscreen
                };
            return r
        };
    var tV = tinymce.util.Tools.resolve("tinymce.util.URI");
    const oV = ["insertContent", "setContent", "execCommand", "close", "block", "unblock"],
        nV = e => a(e) && -1 !== oV.indexOf(e.mceAction),
        rV = (e, t, o, n) => {
            const r = la("dialog"),
                i = UN(e.title, r, n),
                l = (e => {
                    const t = {
                        dom: {
                            tag: "div",
                            classes: ["tox-dialog__content-js"]
                        },
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-dialog__body-iframe"]
                            },
                            components: [IC({
                                dom: {
                                    tag: "iframe",
                                    attributes: {
                                        src: e.url
                                    }
                                },
                                behaviours: kl([Jw.config({}), eh.config({})])
                            })]
                        }],
                        behaviours: kl([Hp.config({
                            mode: "acyclic",
                            useTabstopAt: C(VC)
                        })])
                    };
                    return bF.parts.body(t)
                })(e),
                c = e.buttons.bind((e => 0 === e.length ? A.none() : A.some(ZN({
                    buttons: e
                }, r, n)))),
                u = ((e, t) => {
                    const o = (t, o) => Us(t, ((t, r) => {
                            n(t, ((n, s) => {
                                o(e(), n, r.event, t)
                            }))
                        })),
                        n = (e, t) => {
                            rR.getState(e).get().each((o => {
                                t(o, e)
                            }))
                        };
                    return [...XN(o, t), o(aS, ((e, t, o) => {
                        t.onAction(e, {
                            name: o.name
                        })
                    }))]
                })((() => x), jN((() => y), n.shared.providers, t)),
                m = {
                    ...e.height.fold((() => ({})), (e => ({
                        height: e + "px",
                        "max-height": e + "px"
                    }))),
                    ...e.width.fold((() => ({})), (e => ({
                        width: e + "px",
                        "max-width": e + "px"
                    })))
                },
                p = e.width.isNone() && e.height.isNone() ? ["tox-dialog--width-lg"] : [],
                h = new tV(e.url, {
                    base_uri: new tV(window.location.href)
                }),
                f = `${h.protocol}://${h.host}${h.port?":"+h.port:""}`,
                b = Zl(),
                v = [Kp("messages", [Ys((() => {
                    const t = tc(Ve(window), "message", (t => {
                        if (h.isSameOrigin(new tV(t.raw.origin))) {
                            const n = t.raw.data;
                            nV(n) ? ((e, t, o) => {
                                switch (o.mceAction) {
                                    case "insertContent":
                                        e.insertContent(o.content);
                                        break;
                                    case "setContent":
                                        e.setContent(o.content);
                                        break;
                                    case "execCommand":
                                        const n = !!d(o.ui) && o.ui;
                                        e.execCommand(o.cmd, n, o.value);
                                        break;
                                    case "close":
                                        t.close();
                                        break;
                                    case "block":
                                        t.block(o.message);
                                        break;
                                    case "unblock":
                                        t.unblock()
                                }
                            })(o, x, n) : (e => !nV(e) && a(e) && ve(e, "mceAction"))(n) && e.onMessage(x, n)
                        }
                    }));
                    b.set(t)
                })), Js(b.clear)]), Al.config({
                    channels: {
                        [ER]: {
                            onReceive: (e, t) => {
                                pi(e.element, "iframe").each((e => {
                                    const o = e.dom.contentWindow;
                                    g(o) && o.postMessage(t, f)
                                }))
                            }
                        }
                    }
                })],
                y = GN({
                    id: r,
                    header: i,
                    body: l,
                    footer: c,
                    extraClasses: p,
                    extraBehaviours: v,
                    extraStyles: m
                }, e, u, n),
                x = (e => {
                    const t = t => {
                        e.getSystem().isConnected() && t(e)
                    };
                    return {
                        block: e => {
                            if (!s(e)) throw new Error("The urlDialogInstanceAPI.block function should be passed a blocking message of type string as an argument");
                            t((t => {
                                Is(t, lS, {
                                    message: e
                                })
                            }))
                        },
                        unblock: () => {
                            t((e => {
                                Fs(e, cS)
                            }))
                        },
                        close: () => {
                            t((e => {
                                Fs(e, rS)
                            }))
                        },
                        sendMessage: e => {
                            t((t => {
                                t.getSystem().broadcastOn([ER], e)
                            }))
                        }
                    }
                })(y);
            return {
                dialog: y,
                instanceApi: x
            }
        },
        sV = (e, t, o) => t && o ? [] : [vE.config({
            contextual: {
                lazyContext: () => A.some(Jo(Ve(e.getContentAreaContainer()))),
                fadeInClass: "tox-dialog-dock-fadein",
                fadeOutClass: "tox-dialog-dock-fadeout",
                transitionClass: "tox-dialog-dock-transition"
            },
            modes: ["top"],
            lazyViewport: t => Bw(e, t.element).map((e => ({
                bounds: Fw(e),
                optScrollEnv: A.some({
                    currentScrollTop: e.element.dom.scrollTop,
                    scrollElmTop: Xt(e.element).top
                })
            }))).getOrThunk((() => ({
                bounds: en(),
                optScrollEnv: A.none()
            })))
        })],
        aV = e => {
            const t = e.editor,
                o = rb(t),
                n = (e => {
                    const t = e.shared;
                    return {
                        open: (o, n) => {
                            const r = () => {
                                    bF.hide(l), n()
                                },
                                s = Uh(s_({
                                    name: "close-alert",
                                    text: "OK",
                                    primary: !0,
                                    buttonType: A.some("primary"),
                                    align: "end",
                                    enabled: !0,
                                    icon: A.none()
                                }, "cancel", e)),
                                a = IN(),
                                i = FN(r, t.providers),
                                l = si(zN({
                                    lazySink: () => t.getSink(),
                                    header: BN(a, i),
                                    body: RN(o, t.providers),
                                    footer: A.some(NN(VN([], [s.asSpec()]))),
                                    onEscape: r,
                                    extraClasses: ["tox-alert-dialog"],
                                    extraBehaviours: [],
                                    extraStyles: {},
                                    dialogEvents: [Us(sS, r)],
                                    eventOrder: {}
                                }));
                            bF.show(l);
                            const c = s.get(l);
                            eh.focus(c)
                        }
                    }
                })(e.backstages.dialog),
                r = (e => {
                    const t = e.shared;
                    return {
                        open: (o, n) => {
                            const r = e => {
                                    bF.hide(c), n(e)
                                },
                                s = Uh(s_({
                                    name: "yes",
                                    text: "Yes",
                                    primary: !0,
                                    buttonType: A.some("primary"),
                                    align: "end",
                                    enabled: !0,
                                    icon: A.none()
                                }, "submit", e)),
                                a = s_({
                                    name: "no",
                                    text: "No",
                                    primary: !1,
                                    buttonType: A.some("secondary"),
                                    align: "end",
                                    enabled: !0,
                                    icon: A.none()
                                }, "cancel", e),
                                i = IN(),
                                l = FN((() => r(!1)), t.providers),
                                c = si(zN({
                                    lazySink: () => t.getSink(),
                                    header: BN(i, l),
                                    body: RN(o, t.providers),
                                    footer: A.some(NN(VN([], [a, s.asSpec()]))),
                                    onEscape: () => r(!1),
                                    extraClasses: ["tox-confirm-dialog"],
                                    extraBehaviours: [],
                                    extraStyles: {},
                                    dialogEvents: [Us(sS, (() => r(!1))), Us(iS, (() => r(!0)))],
                                    eventOrder: {}
                                }));
                            bF.show(c);
                            const d = s.get(c);
                            eh.focus(d)
                        }
                    }
                })(e.backstages.dialog),
                s = (t, o) => eR.open(((t, n, r) => {
                    const s = n,
                        a = ((e, t, o) => {
                            const n = la("dialog"),
                                r = e.internalDialog,
                                s = UN(r.title, n, o),
                                a = ((e, t, o) => {
                                    const n = AR(e, t, A.none(), o, !1);
                                    return bF.parts.body(n)
                                })({
                                    body: r.body,
                                    initialData: r.initialData
                                }, n, o),
                                i = $N(r.buttons),
                                l = qN(i),
                                c = ZN({
                                    buttons: i
                                }, n, o),
                                d = KN((() => h), jN((() => g), o.shared.providers, t), o.shared.getSink),
                                u = (e => {
                                    switch (e) {
                                        case "large":
                                            return ["tox-dialog--width-lg"];
                                        case "medium":
                                            return ["tox-dialog--width-md"];
                                        default:
                                            return []
                                    }
                                })(r.size),
                                m = {
                                    id: n,
                                    header: s,
                                    body: a,
                                    footer: A.some(c),
                                    extraClasses: u,
                                    extraBehaviours: [],
                                    extraStyles: {}
                                },
                                g = GN(m, e, d, o),
                                p = {
                                    getId: x(n),
                                    getRoot: x(g),
                                    getBody: () => bF.getBody(g),
                                    getFooter: () => bF.getFooter(g),
                                    getFormWrapper: () => {
                                        const e = bF.getBody(g);
                                        return ym.getCurrent(e).getOr(e)
                                    },
                                    toggleFullscreen: () => {
                                        const e = "tox-dialog--fullscreen",
                                            t = Ve(g.element.dom);
                                        Ua(t, e) ? (Pa(t, e), Wa(t, u)) : (ja(t, u), La(t, e))
                                    }
                                },
                                h = eV(p, t.redial, l);
                            return {
                                dialog: g,
                                instanceApi: h
                            }
                        })({
                            dataValidator: r,
                            initialData: s,
                            internalDialog: t
                        }, {
                            redial: eR.redial,
                            closeWindow: () => {
                                bF.hide(a.dialog), o(a.instanceApi)
                            }
                        }, e.backstages.dialog);
                    return bF.show(a.dialog), a.instanceApi.setData(s), a.instanceApi
                }), t),
                a = (n, r, s, a = !1) => eR.open(((n, i, l) => {
                    const c = Xn(qn("data", l, i)),
                        d = Ql(),
                        u = e.backstages.popup.shared.header.isPositionedAtTop(),
                        m = () => d.on((e => {
                            Hh.reposition(e), vE.refresh(e)
                        })),
                        g = ((e, t, o, n) => {
                            const r = la("dialog"),
                                s = la("dialog-label"),
                                a = la("dialog-content"),
                                i = e.internalDialog,
                                l = Uh(((e, t, o, n) => jw.sketch({
                                    dom: ZE('<div class="tox-dialog__header"></div>'),
                                    components: [LN(e, t, A.some(o), n), PN(), HN(n)],
                                    containerBehaviours: kl([oF.config({
                                        mode: "mouse",
                                        blockerClass: "blocker",
                                        getTarget: e => hi(e, '[role="dialog"]').getOrDie(),
                                        snaps: {
                                            getSnapPoints: () => [],
                                            leftAttr: "data-drag-left",
                                            topAttr: "data-drag-top"
                                        }
                                    })])
                                }))({
                                    title: i.title,
                                    draggable: !0
                                }, r, s, o.shared.providers)),
                                c = Uh(((e, t, o, n, r) => AR(e, t, A.some(o), n, r))({
                                    body: i.body,
                                    initialData: i.initialData
                                }, r, a, o, n)),
                                d = $N(i.buttons),
                                u = qN(d),
                                m = Uh(((e, t, o) => JN(e, t, o))({
                                    buttons: d
                                }, r, o)),
                                g = KN((() => f), {
                                    onBlock: e => {
                                        JE.block(h, ((t, n) => WN(e.message, n, o.shared.providers)))
                                    },
                                    onUnblock: () => {
                                        JE.unblock(h)
                                    },
                                    onClose: () => t.closeWindow()
                                }, o.shared.getSink),
                                p = "tox-dialog-inline",
                                h = si({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-dialog", p],
                                        attributes: {
                                            role: "dialog",
                                            "aria-labelledby": s,
                                            "aria-describedby": a
                                        }
                                    },
                                    eventOrder: {
                                        [ds()]: [rR.name(), Al.name()],
                                        [us()]: ["execute-on-form"],
                                        [Ss()]: ["reflecting", "execute-on-form"]
                                    },
                                    behaviours: kl([Hp.config({
                                        mode: "cyclic",
                                        onEscape: e => (Fs(e, rS), A.some(!0)),
                                        useTabstopAt: e => !VC(e) && ("button" !== Ue(e) || "disabled" !== Ot(e, "disabled")),
                                        firstTabstop: 1
                                    }), rR.config({
                                        channel: `${CR}-${r}`,
                                        updateState: (e, t) => A.some(t),
                                        initialData: e
                                    }), eh.config({}), Kp("execute-on-form", g.concat([Ks(Xr(), ((e, t) => {
                                        Hp.focusIn(e)
                                    }))])), JE.config({
                                        getRoot: () => A.some(h)
                                    }), Xp.config({}), TC({})]),
                                    components: [l.asSpec(), c.asSpec(), m.asSpec()]
                                }),
                                f = eV({
                                    getId: x(r),
                                    getRoot: x(h),
                                    getFooter: () => m.get(h),
                                    getBody: () => c.get(h),
                                    getFormWrapper: () => {
                                        const e = c.get(h);
                                        return ym.getCurrent(e).getOr(e)
                                    },
                                    toggleFullscreen: () => {
                                        const e = "tox-dialog--fullscreen",
                                            t = Ve(h.element.dom);
                                        Ga(t, [e]) ? (ja(t, [e]), Wa(t, [p])) : (ja(t, [p]), Wa(t, [e]))
                                    }
                                }, t.redial, u);
                            return {
                                dialog: h,
                                instanceApi: f
                            }
                        })({
                            dataValidator: l,
                            initialData: c,
                            internalDialog: n
                        }, {
                            redial: eR.redial,
                            closeWindow: () => {
                                d.on(Hh.hide), t.off("ResizeEditor", m), d.clear(), s(g.instanceApi)
                            }
                        }, e.backstages.popup, a),
                        p = si(Hh.sketch({
                            lazySink: e.backstages.popup.shared.getSink,
                            dom: {
                                tag: "div",
                                classes: []
                            },
                            fireDismissalEventInstead: {},
                            ...u ? {} : {
                                fireRepositionEventInstead: {}
                            },
                            inlineBehaviours: kl([Kp("window-manager-inline-events", [Us(Cs(), ((e, t) => {
                                Fs(g.dialog, sS)
                            }))]), ...sV(t, o, u)]),
                            isExtraPart: (e, t) => (e => Iw(e, ".tox-alert-dialog") || Iw(e, ".tox-confirm-dialog"))(t)
                        }));
                    return d.set(p), Hh.showWithinBounds(p, ai(g.dialog), {
                        anchor: r
                    }, (() => {
                        const e = t.inline ? xt() : Ve(t.getContainer()),
                            o = Jo(e);
                        return A.some(o)
                    })), o && u || (vE.refresh(p), t.on("ResizeEditor", m)), g.instanceApi.setData(c), Hp.focusIn(g.dialog), g.instanceApi
                }), n);
            return {
                open: (t, o, n) => void 0 !== o && "toolbar" === o.inline ? a(t, e.backstages.popup.shared.anchors.inlineDialog(), n, o.ariaAttrs) : void 0 !== o && "cursor" === o.inline ? a(t, e.backstages.popup.shared.anchors.cursor(), n, o.ariaAttrs) : s(t, n),
                openUrl: (o, n) => ((o, n) => eR.openUrl((o => {
                    const r = rV(o, {
                        closeWindow: () => {
                            bF.hide(r.dialog), n(r.instanceApi)
                        }
                    }, t, e.backstages.dialog);
                    return bF.show(r.dialog), r.instanceApi
                }), o))(o, n),
                alert: (e, t) => {
                    n.open(e, t)
                },
                close: e => {
                    e.close()
                },
                confirm: (e, t) => {
                    r.open(e, t)
                }
            }
        };
    tn.add("silver", (e => {
        (e => {
            cf(e), (e => {
                const t = e.options.register,
                    o = e => f(e, s) ? {
                        value: kx(e),
                        valid: !0
                    } : {
                        valid: !1,
                        message: "Must be an array of strings."
                    };
                t("color_map", {
                    processor: o,
                    default: ["#BFEDD2", "Light Green", "#FBEEB8", "Light Yellow", "#F8CAC6", "Light Red", "#ECCAFA", "Light Purple", "#C2E0F4", "Light Blue", "#2DC26B", "Green", "#F1C40F", "Yellow", "#E03E2D", "Red", "#B96AD9", "Purple", "#3598DB", "Blue", "#169179", "Dark Turquoise", "#E67E23", "Orange", "#BA372A", "Dark Red", "#843FA1", "Dark Purple", "#236FA1", "Dark Blue", "#ECF0F1", "Light Gray", "#CED4D9", "Medium Gray", "#95A5A6", "Gray", "#7E8C8D", "Dark Gray", "#34495E", "Navy Blue", "#000000", "Black", "#ffffff", "White"]
                }), t("color_map_background", {
                    processor: o
                }), t("color_map_foreground", {
                    processor: o
                }), t("color_cols", {
                    processor: "number",
                    default: wx(Ex(e, "default").length)
                }), t("color_cols_foreground", {
                    processor: "number",
                    default: Sx(e, Ex(e, yx).length)
                }), t("color_cols_background", {
                    processor: "number",
                    default: Sx(e, Ex(e, xx).length)
                }), t("custom_colors", {
                    processor: "boolean",
                    default: !0
                }), t("color_default_foreground", {
                    processor: "string",
                    default: Ox
                }), t("color_default_background", {
                    processor: "string",
                    default: Ox
                })
            })(e), (e => {
                const t = e.options.register;
                t("contextmenu_avoid_overlap", {
                    processor: "string",
                    default: ""
                }), t("contextmenu_never_use_native", {
                    processor: "boolean",
                    default: !1
                }), t("contextmenu", {
                    processor: e => !1 === e ? {
                        value: [],
                        valid: !0
                    } : s(e) || f(e, s) ? {
                        value: YD(e),
                        valid: !0
                    } : {
                        valid: !1,
                        message: "Must be false or a string."
                    },
                    default: "link linkchecker image editimage table spellchecker configurepermanentpen"
                })
            })(e)
        })(e);
        let t = () => en();
        const {
            dialogs: o,
            popups: n,
            renderUI: r
        } = gF(e, {
            getPopupSinkBounds: () => t()
        });
        Aw(e, n.backstage.shared);
        const a = aV({
            editor: e,
            backstages: {
                popup: n.backstage,
                dialog: o.backstage
            }
        });
        return {
            renderUI: async () => {
                const o = await r();
                return Bw(e, n.getMothership().element).each((e => {
                    t = () => Fw(e)
                })), o
            },
            getWindowManagerImpl: x(a),
            getNotificationManagerImpl: () => ((e, t, o) => {
                const n = t.backstage.shared,
                    r = () => {
                        const t = Jo(Ve(e.getContentAreaContainer())),
                            o = en(),
                            n = Ki(o.x, t.x, t.right),
                            r = Ki(o.y, t.y, t.bottom),
                            s = Math.max(t.right, o.right),
                            a = Math.max(t.bottom, o.bottom);
                        return A.some(Yo(n, r, s - n, a - r))
                    };
                return {
                    open: (t, s) => {
                        const a = () => {
                                s(), Hh.hide(l)
                            },
                            i = si(ef.sketch({
                                text: t.text,
                                level: R(["success", "error", "warning", "warn", "info"], t.type) ? t.type : void 0,
                                progress: !0 === t.progressBar,
                                icon: t.icon,
                                closeButton: t.closeButton,
                                onAction: a,
                                iconProvider: n.providers.icons,
                                translationProvider: n.providers.translate
                            })),
                            l = si(Hh.sketch({
                                dom: {
                                    tag: "div",
                                    classes: ["tox-notifications-container"]
                                },
                                lazySink: n.getSink,
                                fireDismissalEventInstead: {},
                                ...n.header.isPositionedAtTop() ? {} : {
                                    fireRepositionEventInstead: {}
                                }
                            }));
                        o.add(l), h(t.timeout) && t.timeout > 0 && Lh.setEditorTimeout(e, (() => {
                            a()
                        }), t.timeout);
                        const c = {
                            close: a,
                            reposition: () => {
                                const t = ai(i),
                                    o = {
                                        maxHeightFunction: cc()
                                    },
                                    s = e.notificationManager.getNotifications();
                                if (s[0] === c) {
                                    const e = {
                                        ...n.anchors.banner(),
                                        overrides: o
                                    };
                                    Hh.showWithinBounds(l, t, {
                                        anchor: e
                                    }, r)
                                } else I(s, c).each((e => {
                                    const n = s[e - 1].getEl(),
                                        a = {
                                            type: "node",
                                            root: xt(),
                                            node: A.some(Ve(n)),
                                            overrides: o,
                                            layouts: {
                                                onRtl: () => [cl],
                                                onLtr: () => [cl]
                                            }
                                        };
                                    Hh.showWithinBounds(l, t, {
                                        anchor: a
                                    }, r)
                                }))
                            },
                            text: e => {
                                ef.updateText(i, e)
                            },
                            settings: t,
                            getEl: () => i.element.dom,
                            progressBar: {
                                value: e => {
                                    ef.updateProgress(i, e)
                                }
                            }
                        };
                        return c
                    },
                    close: e => {
                        e.close()
                    },
                    getArgs: e => e.settings
                }
            })(e, {
                backstage: n.backstage
            }, n.getMothership())
        }
    }))
}();
