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
    var e = tinymce.util.Tools.resolve("tinymce.PluginManager");
    const t = e => t => (e => {
            const t = typeof e;
            return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (o = l = e,
                (n = String).prototype.isPrototypeOf(o) || (null === (r = l.constructor) || void 0 === r ? void 0 : r.name) === n.name) ? "string" : t;
            var o, l, n, r
        })(t) === e,
        o = e => t => typeof t === e,
        l = t("string"),
        n = t("array"),
        r = o("boolean"),
        a = (void 0,
            e => undefined === e);
    const s = e => !(e => null == e)(e),
        c = o("function"),
        i = o("number"),
        m = () => {},
        d = e => () => e,
        u = e => e,
        p = (e, t) => e === t;

    function b(e, ...t) {
        return (...o) => {
            const l = t.concat(o);
            return e.apply(null, l)
        }
    }
    const g = e => {
            e()
        },
        h = d(!1),
        f = d(!0);
    class y {
        constructor(e, t) {
            this.tag = e,
                this.value = t
        }
        static some(e) {
            return new y(!0, e)
        }
        static none() {
            return y.singletonNone
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
            return this.tag ? y.some(e(this.value)) : y.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : y.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : y.none()
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
            if (this.tag)
                return this.value;
            throw new Error(null != e ? e : "Called getOrDie on None")
        }
        static from(e) {
            return s(e) ? y.some(e) : y.none()
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
    y.singletonNone = new y(!1);
    const w = Object.keys,
        S = Object.hasOwnProperty,
        C = (e, t) => {
            const o = w(e);
            for (let l = 0, n = o.length; l < n; l++) {
                const n = o[l];
                t(e[n], n)
            }
        },
        v = (e, t) => {
            const o = {};
            var l;
            return ((e, t, o, l) => {
                    C(e, ((e, n) => {
                        (t(e, n) ? o : l)(e, n)
                    }))
                })(e, t, (l = o,
                    (e, t) => {
                        l[t] = e
                    }
                ), m),
                o
        },
        T = e => w(e).length,
        x = (e, t) => A(e, t) ? y.from(e[t]) : y.none(),
        A = (e, t) => S.call(e, t),
        R = (e, t) => A(e, t) && void 0 !== e[t] && null !== e[t],
        O = Array.prototype.indexOf,
        _ = Array.prototype.push,
        D = (e, t) => ((e, t) => O.call(e, t))(e, t) > -1,
        I = (e, t) => {
            for (let o = 0, l = e.length; o < l; o++)
                if (t(e[o], o))
                    return !0;
            return !1
        },
        M = (e, t) => {
            const o = [];
            for (let l = 0; l < e; l++)
                o.push(t(l));
            return o
        },
        N = (e, t) => {
            const o = e.length,
                l = new Array(o);
            for (let n = 0; n < o; n++) {
                const o = e[n];
                l[n] = t(o, n)
            }
            return l
        },
        P = (e, t) => {
            for (let o = 0, l = e.length; o < l; o++)
                t(e[o], o)
        },
        k = (e, t) => {
            const o = [];
            for (let l = 0, n = e.length; l < n; l++) {
                const n = e[l];
                t(n, l) && o.push(n)
            }
            return o
        },
        B = (e, t, o) => (P(e, ((e, l) => {
                o = t(o, e, l)
            })),
            o),
        E = (e, t) => ((e, t, o) => {
            for (let l = 0, n = e.length; l < n; l++) {
                const n = e[l];
                if (t(n, l))
                    return y.some(n);
                if (o(n, l))
                    break
            }
            return y.none()
        })(e, t, h),
        F = (e, t) => (e => {
            const t = [];
            for (let o = 0, l = e.length; o < l; ++o) {
                if (!n(e[o]))
                    throw new Error("Arr.flatten item " + o + " was not an array, input: " + e);
                _.apply(t, e[o])
            }
            return t
        })(N(e, t)),
        q = (e, t) => {
            for (let o = 0, l = e.length; o < l; ++o)
                if (!0 !== t(e[o], o))
                    return !1;
            return !0
        },
        L = (e, t) => t >= 0 && t < e.length ? y.some(e[t]) : y.none(),
        H = (e, t) => {
            for (let o = 0; o < e.length; o++) {
                const l = t(e[o], o);
                if (l.isSome())
                    return l
            }
            return y.none()
        },
        j = e => {
            if (null == e)
                throw new Error("Node cannot be null or undefined");
            return {
                dom: e
            }
        },
        V = {
            fromHtml: (e, t) => {
                const o = (t || document).createElement("div");
                if (o.innerHTML = e,
                    !o.hasChildNodes() || o.childNodes.length > 1) {
                    const t = "HTML does not have a single root node";
                    throw console.error(t, e),
                        new Error(t)
                }
                return j(o.childNodes[0])
            },
            fromTag: (e, t) => {
                const o = (t || document).createElement(e);
                return j(o)
            },
            fromText: (e, t) => {
                const o = (t || document).createTextNode(e);
                return j(o)
            },
            fromDom: j,
            fromPoint: (e, t, o) => y.from(e.dom.elementFromPoint(t, o)).map(j)
        },
        z = (e, t) => {
            const o = e.dom;
            if (1 !== o.nodeType)
                return !1; {
                const e = o;
                if (void 0 !== e.matches)
                    return e.matches(t);
                if (void 0 !== e.msMatchesSelector)
                    return e.msMatchesSelector(t);
                if (void 0 !== e.webkitMatchesSelector)
                    return e.webkitMatchesSelector(t);
                if (void 0 !== e.mozMatchesSelector)
                    return e.mozMatchesSelector(t);
                throw new Error("Browser lacks native selectors")
            }
        },
        W = e => 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount,
        $ = (e, t) => e.dom === t.dom,
        U = z;
    "undefined" != typeof window ? window : Function("return this;")();
    const G = e => e.dom.nodeName.toLowerCase(),
        K = e => e.dom.nodeType,
        J = e => t => K(t) === e,
        Q = J(1),
        X = J(3),
        Y = J(9),
        Z = J(11),
        ee = e => t => Q(t) && G(t) === e,
        te = e => Y(e) ? e : V.fromDom(e.dom.ownerDocument),
        oe = e => y.from(e.dom.parentNode).map(V.fromDom),
        le = e => y.from(e.dom.nextSibling).map(V.fromDom),
        ne = e => N(e.dom.childNodes, V.fromDom),
        re = c(Element.prototype.attachShadow) && c(Node.prototype.getRootNode) ? e => V.fromDom(e.dom.getRootNode()) : te,
        ae = e => V.fromDom(e.dom.host),
        se = e => {
            const t = X(e) ? e.dom.parentNode : e.dom;
            if (null == t || null === t.ownerDocument)
                return !1;
            const o = t.ownerDocument;
            return (e => {
                const t = re(e);
                return Z(o = t) && s(o.dom.host) ? y.some(t) : y.none();
                var o
            })(V.fromDom(t)).fold((() => o.body.contains(t)), (l = se,
                n = ae,
                e => l(n(e))));
            var l, n
        };
    var ce = (e, t, o, l, n) => e(o, l) ? y.some(o) : c(n) && n(o) ? y.none() : t(o, l, n);
    const ie = (e, t, o) => {
            let l = e.dom;
            const n = c(o) ? o : h;
            for (; l.parentNode;) {
                l = l.parentNode;
                const e = V.fromDom(l);
                if (t(e))
                    return y.some(e);
                if (n(e))
                    break
            }
            return y.none()
        },
        me = (e, t, o) => ie(e, (e => z(e, t)), o),
        de = (e, t) => ((e, o) => E(e.dom.childNodes, (e => {
            return o = V.fromDom(e),
                z(o, t);
            var o
        })).map(V.fromDom))(e),
        ue = (e, t) => ((e, t) => {
            const o = void 0 === t ? document : t.dom;
            return W(o) ? y.none() : y.from(o.querySelector(e)).map(V.fromDom)
        })(t, e),
        pe = (e, t, o) => ce(((e, t) => z(e, t)), me, e, t, o),
        be = (e, t = !1) => {
            return se(e) ? e.dom.isContentEditable : (o = e,
                pe(o, "[contenteditable]")).fold(d(t), (e => "true" === ge(e)));
            var o
        },
        ge = e => e.dom.contentEditable,
        he = e => t => $(t, (e => V.fromDom(e.getBody()))(e)),
        fe = e => /^\d+(\.\d+)?$/.test(e) ? e + "px" : e,
        ye = e => V.fromDom(e.selection.getStart()),
        we = (e, t) => {
            let o = [];
            return P(ne(e), (e => {
                    t(e) && (o = o.concat([e])),
                        o = o.concat(we(e, t))
                })),
                o
        },
        Se = (e, t) => ((e, o) => k(ne(e), (e => z(e, t))))(e),
        Ce = (e, t) => ((e, t) => {
            const o = void 0 === t ? document : t.dom;
            return W(o) ? [] : N(o.querySelectorAll(e), V.fromDom)
        })(t, e),
        ve = (e, t, o) => {
            if (!(l(o) || r(o) || i(o)))
                throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", o, ":: Element ", e),
                    new Error("Attribute value was not simple");
            e.setAttribute(t, o + "")
        },
        Te = (e, t) => {
            const o = e.dom.getAttribute(t);
            return null === o ? void 0 : o
        },
        xe = (e, t) => y.from(Te(e, t)),
        Ae = (e, t) => {
            e.dom.removeAttribute(t)
        },
        Re = (e, t, o = p) => e.exists((e => o(e, t))),
        Oe = (e, t, o) => e.isSome() && t.isSome() ? y.some(o(e.getOrDie(), t.getOrDie())) : y.none(),
        _e = (e, t) => ((e, t, o) => "" === t || e.length >= t.length && e.substr(0, 0 + t.length) === t)(e, t),
        De = (Ie = /^\s+|\s+$/g,
            e => e.replace(Ie, ""));
    var Ie;
    const Me = e => e.length > 0,
        Ne = (e, t = 10) => {
            const o = parseInt(e, t);
            return isNaN(o) ? y.none() : y.some(o)
        },
        Pe = e => void 0 !== e.style && c(e.style.getPropertyValue),
        ke = (e, t) => {
            const o = e.dom,
                l = window.getComputedStyle(o).getPropertyValue(t);
            return "" !== l || se(e) ? l : Be(o, t)
        },
        Be = (e, t) => Pe(e) ? e.style.getPropertyValue(t) : "",
        Ee = (e, t) => {
            const o = e.dom,
                l = Be(o, t);
            return y.from(l).filter((e => e.length > 0))
        },
        Fe = (e, t, o = 0) => xe(e, t).map((e => parseInt(e, 10))).getOr(o),
        qe = (e, t) => Le(e, t, f),
        Le = (e, t, o) => F(ne(e), (e => z(e, t) ? o(e) ? [e] : [] : Le(e, t, o))),
        He = ["tfoot", "thead", "tbody", "colgroup"],
        je = (e, t, o) => ({
            element: e,
            rowspan: t,
            colspan: o
        }),
        Ve = (e, t, o) => ({
            element: e,
            cells: t,
            section: o
        }),
        ze = (e, t) => pe(e, "table", t),
        We = e => qe(e, "tr"),
        $e = e => ze(e).fold(d([]), (e => Se(e, "colgroup"))),
        Ue = e => oe(e).map((e => {
            const t = G(e);
            return (e => D(He, e))(t) ? t : "tbody"
        })).getOr("tbody"),
        Ge = e => xe(e, "data-snooker-locked-cols").bind((e => y.from(e.match(/\d+/g)))).map((e => ((e, t) => {
            const o = {};
            for (let l = 0, n = e.length; l < n; l++) {
                const n = e[l];
                o[String(n)] = t(n, l)
            }
            return o
        })(e, f))),
        Ke = (e, t) => e + "," + t,
        Je = e => {
            const t = {},
                o = [];
            var l;
            const n = (l = e,
                L(l, 0)).map((e => e.element)).bind(ze).bind(Ge).getOr({});
            let r = 0,
                a = 0,
                s = 0;
            const {
                pass: c,
                fail: i
            } = ((e, t) => {
                const o = [],
                    l = [];
                for (let t = 0, r = e.length; t < r; t++) {
                    const r = e[t];
                    (n = r,
                        "colgroup" === n.section ? o : l).push(r)
                }
                var n;
                return {
                    pass: o,
                    fail: l
                }
            })(e);
            P(i, (e => {
                const l = [];
                P(e.cells, (e => {
                        let o = 0;
                        for (; void 0 !== t[Ke(s, o)];)
                            o++;
                        const r = R(n, o.toString()),
                            c = ((e, t, o, l, n, r) => ({
                                element: e,
                                rowspan: t,
                                colspan: o,
                                row: l,
                                column: n,
                                isLocked: r
                            }))(e.element, e.rowspan, e.colspan, s, o, r);
                        for (let l = 0; l < e.colspan; l++)
                            for (let n = 0; n < e.rowspan; n++) {
                                const e = o + l,
                                    r = Ke(s + n, e);
                                t[r] = c,
                                    a = Math.max(a, e + 1)
                            }
                        l.push(c)
                    })),
                    r++,
                    o.push(Ve(e.element, l, e.section)),
                    s++
            }));
            const {
                columns: m,
                colgroups: d
            } = (e => L(e, e.length - 1))(c).map((e => {
                const t = (e => {
                        const t = {};
                        let o = 0;
                        return P(e.cells, (e => {
                                const l = e.colspan;
                                M(l, (n => {
                                        const r = o + n;
                                        t[r] = ((e, t, o) => ({
                                            element: e,
                                            colspan: t,
                                            column: o
                                        }))(e.element, l, r)
                                    })),
                                    o += l
                            })),
                            t
                    })(e),
                    o = ((e, t) => ({
                        element: e,
                        columns: t
                    }))(e.element, ((e, t) => {
                        const o = [];
                        return C(e, ((e, l) => {
                                o.push(t(e, l))
                            })),
                            o
                    })(t, u));
                return {
                    colgroups: [o],
                    columns: t
                }
            })).getOrThunk((() => ({
                colgroups: [],
                columns: {}
            }))), p = ((e, t) => ({
                rows: e,
                columns: t
            }))(r, a);
            return {
                grid: p,
                access: t,
                all: o,
                columns: m,
                colgroups: d
            }
        },
        Qe = e => {
            const t = (e => {
                const t = We(e);
                return ((e, t) => N(e, (e => {
                    if ("colgroup" === G(e)) {
                        const t = N((e => z(e, "colgroup") ? Se(e, "col") : F($e(e), (e => Se(e, "col"))))(e), (e => {
                            const t = Fe(e, "span", 1);
                            return je(e, 1, t)
                        }));
                        return Ve(e, t, "colgroup")
                    } {
                        const o = N((e => qe(e, "th,td"))(e), (e => {
                            const t = Fe(e, "rowspan", 1),
                                o = Fe(e, "colspan", 1);
                            return je(e, t, o)
                        }));
                        return Ve(e, o, t(e))
                    }
                })))([...$e(e), ...t], Ue)
            })(e);
            return Je(t)
        },
        Xe = (e, t, o) => y.from(e.access[Ke(t, o)]),
        Ye = (e, t, o) => {
            const l = ((e, t) => {
                const o = F(e.all, (e => e.cells));
                return k(o, t)
            })(e, (e => o(t, e.element)));
            return l.length > 0 ? y.some(l[0]) : y.none()
        },
        Ze = (e, t) => y.from(e.columns[t]);
    var et = tinymce.util.Tools.resolve("tinymce.util.Tools");
    const tt = (e, t, o) => {
            const l = e.select("td,th", t);
            let n;
            for (let t = 0; t < l.length; t++) {
                const r = e.getStyle(l[t], o);
                if (a(n) && (n = r),
                    n !== r)
                    return ""
            }
            return n
        },
        ot = (e, t, o) => {
            et.each("left center right".split(" "), (l => {
                    l !== o && e.formatter.remove("align" + l, {}, t)
                })),
                o && e.formatter.apply("align" + o, {}, t)
        },
        lt = (e, t, o) => {
            e.dispatch("TableModified", {
                ...o,
                table: t
            })
        },
        nt = (e, t, o) => ((e, t) => (e => {
            const t = parseFloat(e);
            return isNaN(t) ? y.none() : y.some(t)
        })(e).getOr(t))(ke(e, t), o),
        rt = e => ((e, t) => {
            const o = e.dom,
                l = o.getBoundingClientRect().width || o.offsetWidth;
            return "border-box" === t ? l : ((e, t, o, l) => t - nt(e, "padding-left", 0) - nt(e, "padding-right", 0) - nt(e, "border-left-width", 0) - nt(e, "border-right-width", 0))(e, l)
        })(e, "content-box");
    var at = tinymce.util.Tools.resolve("tinymce.Env");
    const st = M(5, (e => {
            const t = `${e + 1}px`;
            return {
                title: t,
                value: t
            }
        })),
        ct = N(["Solid", "Dotted", "Dashed", "Double", "Groove", "Ridge", "Inset", "Outset", "None", "Hidden"], (e => ({
            title: e,
            value: e.toLowerCase()
        }))),
        it = "100%",
        mt = e => {
            var t;
            const o = e.dom,
                l = null !== (t = o.getParent(e.selection.getStart(), o.isBlock)) && void 0 !== t ? t : e.getBody();
            return rt(V.fromDom(l)) + "px"
        },
        dt = e => t => t.options.get(e),
        ut = dt("table_sizing_mode"),
        pt = dt("table_border_widths"),
        bt = dt("table_border_styles"),
        gt = dt("table_cell_advtab"),
        ht = dt("table_row_advtab"),
        ft = dt("table_advtab"),
        yt = dt("table_appearance_options"),
        wt = dt("table_grid"),
        St = dt("table_style_by_css"),
        Ct = dt("table_cell_class_list"),
        vt = dt("table_row_class_list"),
        Tt = dt("table_class_list"),
        xt = dt("table_toolbar"),
        At = dt("table_background_color_map"),
        Rt = dt("table_border_color_map"),
        Ot = e => "fixed" === ut(e),
        _t = e => "responsive" === ut(e),
        Dt = e => {
            const t = e.options,
                o = t.get("table_default_styles");
            return t.isSet("table_default_styles") ? o : ((e, t) => _t(e) || !St(e) ? t : Ot(e) ? {
                ...t,
                width: mt(e)
            } : {
                ...t,
                width: it
            })(e, o)
        },
        It = e => {
            const t = e.options,
                o = t.get("table_default_attributes");
            return t.isSet("table_default_attributes") ? o : ((e, t) => _t(e) || St(e) ? t : Ot(e) ? {
                ...t,
                width: mt(e)
            } : {
                ...t,
                width: it
            })(e, o)
        },
        Mt = (e, t) => t.column >= e.startCol && t.column + t.colspan - 1 <= e.finishCol && t.row >= e.startRow && t.row + t.rowspan - 1 <= e.finishRow,
        Nt = (e, t, o) => ((e, t, o) => {
            const l = Ye(e, t, $),
                n = Ye(e, o, $);
            return l.bind((e => n.map((t => {
                return o = e,
                    l = t, {
                        startRow: Math.min(o.row, l.row),
                        startCol: Math.min(o.column, l.column),
                        finishRow: Math.max(o.row + o.rowspan - 1, l.row + l.rowspan - 1),
                        finishCol: Math.max(o.column + o.colspan - 1, l.column + l.colspan - 1)
                    };
                var o, l
            }))))
        })(e, t, o).bind((t => ((e, t) => {
            let o = !0;
            const l = b(Mt, t);
            for (let n = t.startRow; n <= t.finishRow; n++)
                for (let r = t.startCol; r <= t.finishCol; r++)
                    o = o && Xe(e, n, r).exists(l);
            return o ? y.some(t) : y.none()
        })(e, t))),
        Pt = Qe,
        kt = (e, t) => {
            oe(e).each((o => {
                o.dom.insertBefore(t.dom, e.dom)
            }))
        },
        Bt = (e, t) => {
            le(e).fold((() => {
                oe(e).each((e => {
                    Et(e, t)
                }))
            }), (e => {
                kt(e, t)
            }))
        },
        Et = (e, t) => {
            e.dom.appendChild(t.dom)
        },
        Ft = (e, t) => {
            P(t, ((o, l) => {
                const n = 0 === l ? e : t[l - 1];
                Bt(n, o)
            }))
        },
        qt = e => {
            const t = e.dom;
            null !== t.parentNode && t.parentNode.removeChild(t)
        },
        Lt = ((e, t) => {
            const o = t => e(t) ? y.from(t.dom.nodeValue) : y.none();
            return {
                get: t => {
                    if (!e(t))
                        throw new Error("Can only get text value of a text node");
                    return o(t).getOr("")
                },
                getOption: o,
                set: (t, o) => {
                    if (!e(t))
                        throw new Error("Can only set raw text value of a text node");
                    t.dom.nodeValue = o
                }
            }
        })(X);
    var Ht = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    const jt = (e, t, o, l) => {
            const n = t(e, o);
            return r = (o, l) => {
                    const n = t(e, l);
                    return Vt(e, o, n)
                },
                a = n,
                ((e, t) => {
                    for (let o = e.length - 1; o >= 0; o--)
                        t(e[o], o)
                })(l, ((e, t) => {
                    a = r(a, e)
                })),
                a;
            var r, a
        },
        Vt = (e, t, o) => t.bind((t => o.filter(b(e.eq, t)))),
        zt = {
            up: d({
                selector: me,
                closest: pe,
                predicate: ie,
                all: (e, t) => {
                    const o = c(t) ? t : h;
                    let l = e.dom;
                    const n = [];
                    for (; null !== l.parentNode && void 0 !== l.parentNode;) {
                        const e = l.parentNode,
                            t = V.fromDom(e);
                        if (n.push(t),
                            !0 === o(t))
                            break;
                        l = e
                    }
                    return n
                }
            }),
            down: d({
                selector: Ce,
                predicate: we
            }),
            styles: d({
                get: ke,
                getRaw: Ee,
                set: (e, t, o) => {
                    ((e, t, o) => {
                        if (!l(o))
                            throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", o, ":: Element ", e),
                                new Error("CSS value must be a string: " + o);
                        Pe(e) && e.style.setProperty(t, o)
                    })(e.dom, t, o)
                },
                remove: (e, t) => {
                    ((e, t) => {
                        Pe(e) && e.style.removeProperty(t)
                    })(e.dom, t),
                    Re(xe(e, "style").map(De), "") && Ae(e, "style")
                }
            }),
            attrs: d({
                get: Te,
                set: (e, t, o) => {
                    ve(e.dom, t, o)
                },
                remove: Ae,
                copyTo: (e, t) => {
                    ((e, t) => {
                        const o = e.dom;
                        C(t, ((e, t) => {
                            ve(o, t, e)
                        }))
                    })(t, B(e.dom.attributes, ((e, t) => (e[t.name] = t.value,
                        e)), {}))
                }
            }),
            insert: d({
                before: kt,
                after: Bt,
                afterAll: Ft,
                append: Et,
                appendAll: (e, t) => {
                    P(t, (t => {
                        Et(e, t)
                    }))
                },
                prepend: (e, t) => {
                    (e => ((e, t) => {
                        const o = e.dom.childNodes;
                        return y.from(o[0]).map(V.fromDom)
                    })(e))(e).fold((() => {
                        Et(e, t)
                    }), (o => {
                        e.dom.insertBefore(t.dom, o.dom)
                    }))
                },
                wrap: (e, t) => {
                    kt(e, t),
                        Et(t, e)
                }
            }),
            remove: d({
                unwrap: e => {
                    const t = ne(e);
                    t.length > 0 && Ft(e, t),
                        qt(e)
                },
                remove: qt
            }),
            create: d({
                nu: V.fromTag,
                clone: e => V.fromDom(e.dom.cloneNode(!1)),
                text: V.fromText
            }),
            query: d({
                comparePosition: (e, t) => e.dom.compareDocumentPosition(t.dom),
                prevSibling: e => y.from(e.dom.previousSibling).map(V.fromDom),
                nextSibling: le
            }),
            property: d({
                children: ne,
                name: G,
                parent: oe,
                document: e => te(e).dom,
                isText: X,
                isComment: e => 8 === K(e) || "#comment" === G(e),
                isElement: Q,
                isSpecial: e => {
                    const t = G(e);
                    return D(["script", "noscript", "iframe", "noframes", "noembed", "title", "style", "textarea", "xmp"], t)
                },
                getLanguage: e => Q(e) ? xe(e, "lang") : y.none(),
                getText: e => Lt.get(e),
                setText: (e, t) => Lt.set(e, t),
                isBoundary: e => !!Q(e) && ("body" === G(e) || D(Ht, G(e))),
                isEmptyTag: e => !!Q(e) && D(["br", "img", "hr", "input"], G(e)),
                isNonEditable: e => Q(e) && "false" === Te(e, "contenteditable")
            }),
            eq: $,
            is: U
        },
        Wt = e => me(e, "table"),
        $t = (e, t, o) => ue(e, t).bind((t => ue(e, o).bind((e => {
            return (o = Wt,
                l = [t, e],
                ((e, t, o) => o.length > 0 ? ((e, t, o, l) => l(e, t, o[0], o.slice(1)))(e, t, o, jt) : y.none())(zt, ((e, t) => o(t)), l)).map((o => ({
                first: t,
                last: e,
                table: o
            })));
            var o, l
        })))),
        Ut = e => N(e, V.fromDom),
        Gt = {
            selected: "data-mce-selected",
            selectedSelector: "td[data-mce-selected],th[data-mce-selected]",
            firstSelected: "data-mce-first-selected",
            firstSelectedSelector: "td[data-mce-first-selected],th[data-mce-first-selected]",
            lastSelected: "data-mce-last-selected",
            lastSelectedSelector: "td[data-mce-last-selected],th[data-mce-last-selected]"
        },
        Kt = e => (t, o) => {
            const l = G(t),
                n = "col" === l || "colgroup" === l ? ze(r = t).bind((e => ((e, t) => ((e, t) => {
                    const o = Ce(e, t);
                    return o.length > 0 ? y.some(o) : y.none()
                })(e, t))(e, Gt.firstSelectedSelector))).fold(d(r), (e => e[0])) : t;
            var r;
            return pe(n, e, o)
        },
        Jt = Kt("th,td,caption"),
        Qt = Kt("th,td"),
        Xt = e => Ut(e.model.table.getSelectedCells()),
        Yt = (e, t) => {
            const o = Qt(e),
                l = o.bind((e => ze(e))).map((e => We(e)));
            return Oe(o, l, ((e, o) => k(o, (o => I(Ut(o.dom.cells), (o => "1" === Te(o, t) || $(o, e))))))).getOr([])
        },
        Zt = [{
            text: "None",
            value: ""
        }, {
            text: "Top",
            value: "top"
        }, {
            text: "Middle",
            value: "middle"
        }, {
            text: "Bottom",
            value: "bottom"
        }],
        eo = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        to = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
        oo = e => {
            return (t = e,
                "#",
                _e(t, "#") ? ((e, t) => e.substring(t))(t, "#".length) : t).toUpperCase();
            var t
        },
        lo = e => {
            const t = e.toString(16);
            return (1 === t.length ? "0" + t : t).toUpperCase()
        },
        no = e => {
            return t = lo(e.red) + lo(e.green) + lo(e.blue), {
                value: oo(t)
            };
            var t
        },
        ro = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i,
        ao = /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i,
        so = (e, t, o, l) => ({
            red: e,
            green: t,
            blue: o,
            alpha: l
        }),
        co = (e, t, o, l) => {
            const n = parseInt(e, 10),
                r = parseInt(t, 10),
                a = parseInt(o, 10),
                s = parseFloat(l);
            return so(n, r, a, s)
        },
        io = e => {
            if ("transparent" === e)
                return y.some(so(0, 0, 0, 0));
            const t = ro.exec(e);
            if (null !== t)
                return y.some(co(t[1], t[2], t[3], "1"));
            const o = ao.exec(e);
            return null !== o ? y.some(co(o[1], o[2], o[3], o[4])) : y.none()
        },
        mo = e => {
            let t = e;
            return {
                get: () => t,
                set: e => {
                    t = e
                }
            }
        },
        uo = (e, t, o) => l => {
            const n = (e => {
                    const t = mo(y.none()),
                        o = () => t.get().each(e);
                    return {
                        clear: () => {
                            o(),
                                t.set(y.none())
                        },
                        isSet: () => t.get().isSome(),
                        get: () => t.get(),
                        set: e => {
                            o(),
                                t.set(y.some(e))
                        }
                    }
                })((e => e.unbind())),
                r = !Me(o),
                a = () => {
                    const a = Xt(e),
                        s = l => e.formatter.match(t, {
                            value: o
                        }, l.dom, r);
                    r ? (l.setActive(!I(a, s)),
                        n.set(e.formatter.formatChanged(t, (e => l.setActive(!e)), !0))) : (l.setActive(q(a, s)),
                        n.set(e.formatter.formatChanged(t, l.setActive, !1, {
                            value: o
                        })))
                };
            return e.initialized ? a() : e.on("init", a),
                n.clear
        },
        po = e => R(e, "menu"),
        bo = e => N(e, (e => {
            const t = e.text || e.title || "";
            return po(e) ? {
                text: t,
                items: bo(e.menu)
            } : {
                text: t,
                value: e.value
            }
        })),
        go = (e, t, o, l) => N(t, (t => {
            const n = t.text || t.title;
            return po(t) ? {
                type: "nestedmenuitem",
                text: n,
                getSubmenuItems: () => go(e, t.menu, o, l)
            } : {
                text: n,
                type: "togglemenuitem",
                onAction: () => l(t.value),
                onSetup: uo(e, o, t.value)
            }
        })),
        ho = (e, t) => o => {
            e.execCommand("mceTableApplyCellStyle", !1, {
                [t]: o
            })
        },
        fo = e => F(e, (e => po(e) ? [{
            ...e,
            menu: fo(e.menu)
        }] : Me(e.value) ? [e] : [])),
        yo = (e, t, o, l) => n => n(go(e, t, o, l)),
        wo = (e, t, o) => {
            const l = N(t, (e => {
                return {
                    text: e.title,
                    value: "#" + (o = e.value,
                        (t = o,
                            (e => eo.test(e) || to.test(e))(t) ? y.some({
                                value: oo(t)
                            }) : y.none()).orThunk((() => io(o).map(no))).getOrThunk((() => {
                            const e = document.createElement("canvas");
                            e.height = 1,
                                e.width = 1;
                            const t = e.getContext("2d");
                            t.clearRect(0, 0, e.width, e.height),
                                t.fillStyle = "#FFFFFF",
                                t.fillStyle = o,
                                t.fillRect(0, 0, 1, 1);
                            const l = t.getImageData(0, 0, 1, 1).data,
                                n = l[0],
                                r = l[1],
                                a = l[2],
                                s = l[3];
                            return no(so(n, r, a, s))
                        }))).value,
                    type: "choiceitem"
                };
                var t, o
            }));
            return [{
                type: "fancymenuitem",
                fancytype: "colorswatch",
                initData: {
                    colors: l.length > 0 ? l : void 0,
                    allowCustomColors: !1
                },
                onAction: t => {
                    const l = "remove" === t.value ? "" : t.value;
                    e.execCommand("mceTableApplyCellStyle", !1, {
                        [o]: l
                    })
                }
            }]
        },
        So = e => () => {
            const t = "header" === e.queryCommandValue("mceTableRowType") ? "body" : "header";
            e.execCommand("mceTableRowType", !1, {
                type: t
            })
        },
        Co = e => () => {
            const t = "th" === e.queryCommandValue("mceTableColType") ? "td" : "th";
            e.execCommand("mceTableColType", !1, {
                type: t
            })
        },
        vo = [{
            name: "width",
            type: "input",
            label: "Width"
        }, {
            name: "height",
            type: "input",
            label: "Height"
        }, {
            name: "celltype",
            type: "listbox",
            label: "Cell type",
            items: [{
                text: "Cell",
                value: "td"
            }, {
                text: "Header cell",
                value: "th"
            }]
        }, {
            name: "scope",
            type: "listbox",
            label: "Scope",
            items: [{
                text: "None",
                value: ""
            }, {
                text: "Row",
                value: "row"
            }, {
                text: "Column",
                value: "col"
            }, {
                text: "Row group",
                value: "rowgroup"
            }, {
                text: "Column group",
                value: "colgroup"
            }]
        }, {
            name: "halign",
            type: "listbox",
            label: "Horizontal align",
            items: [{
                text: "None",
                value: ""
            }, {
                text: "Left",
                value: "left"
            }, {
                text: "Center",
                value: "center"
            }, {
                text: "Right",
                value: "right"
            }]
        }, {
            name: "valign",
            type: "listbox",
            label: "Vertical align",
            items: Zt
        }],
        To = e => vo.concat((e => {
            const t = bo(Ct(e));
            return t.length > 0 ? y.some({
                name: "class",
                type: "listbox",
                label: "Class",
                items: t
            }) : y.none()
        })(e).toArray()),
        xo = (e, t) => {
            const o = [{
                name: "borderstyle",
                type: "listbox",
                label: "Border style",
                items: [{
                    text: "Select...",
                    value: ""
                }].concat(bo(bt(e)))
            }, {
                name: "bordercolor",
                type: "colorinput",
                label: "Border color"
            }, {
                name: "backgroundcolor",
                type: "colorinput",
                label: "Background color"
            }];
            return {
                title: "Advanced",
                name: "advanced",
                items: "cell" === t ? [{
                    name: "borderwidth",
                    type: "input",
                    label: "Border width"
                }].concat(o) : o
            }
        },
        Ao = (e, t) => {
            const o = e.dom;
            return {
                setAttrib: (e, l) => {
                    o.setAttrib(t, e, l)
                },
                setStyle: (e, l) => {
                    o.setStyle(t, e, l)
                },
                setFormat: (o, l) => {
                    "" === l ? e.formatter.remove(o, {
                        value: null
                    }, t, !0) : e.formatter.apply(o, {
                        value: l
                    }, t)
                }
            }
        },
        Ro = ee("th"),
        Oo = (e, t) => e && t ? "sectionCells" : e ? "section" : "cells",
        _o = e => {
            const t = N(e, (e => (e => {
                    const t = "thead" === e.section,
                        o = Re((e => {
                            const t = k(e, (e => Ro(e.element)));
                            return 0 === t.length ? y.some("td") : t.length === e.length ? y.some("th") : y.none()
                        })(e.cells), "th");
                    return "tfoot" === e.section ? {
                        type: "footer"
                    } : t || o ? {
                        type: "header",
                        subType: Oo(t, o)
                    } : {
                        type: "body"
                    }
                })(e).type)),
                o = D(t, "header"),
                l = D(t, "footer");
            if (o || l) {
                const e = D(t, "body");
                return !o || e || l ? o || e || !l ? y.none() : y.some("footer") : y.some("header")
            }
            return y.some("body")
        },
        Do = (e, t) => H(e.all, (e => E(e.cells, (e => $(t, e.element))))),
        Io = (e, t, o) => {
            const l = (e => {
                const t = [],
                    o = e => {
                        t.push(e)
                    };
                for (let t = 0; t < e.length; t++)
                    e[t].each(o);
                return t
            })(N(t.selection, (t => {
                return (l = t,
                    ((e, t, o = h) => o(t) ? y.none() : D(e, G(t)) ? y.some(t) : me(t, e.join(","), (e => z(e, "table") || o(e))))(["td", "th"], l, n)).bind((t => Do(e, t))).filter(o);
                var l, n
            })));
            return n = l,
                l.length > 0 ? y.some(n) : y.none();
            var n
        },
        Mo = (e, t) => Io(e, t, f),
        No = (e, t) => q(t, (t => ((e, t) => Do(e, t).exists((e => !e.isLocked)))(e, t))),
        Po = (e, t) => ((e, t) => t.mergable)(0, t).filter((t => No(e, t.cells))),
        ko = (e, t) => ((e, t) => t.unmergable)(0, t).filter((t => No(e, t))),
        Bo = ((e => {
                if (!n(e))
                    throw new Error("cases must be an array");
                if (0 === e.length)
                    throw new Error("there must be at least one case");
                const t = [],
                    o = {};
                P(e, ((l, r) => {
                    const a = w(l);
                    if (1 !== a.length)
                        throw new Error("one and only one name per case");
                    const s = a[0],
                        c = l[s];
                    if (void 0 !== o[s])
                        throw new Error("duplicate key detected:" + s);
                    if ("cata" === s)
                        throw new Error("cannot have a case named cata (sorry)");
                    if (!n(c))
                        throw new Error("case arguments must be an array");
                    t.push(s),
                        o[s] = (...o) => {
                            const l = o.length;
                            if (l !== c.length)
                                throw new Error("Wrong number of arguments to case " + s + ". Expected " + c.length + " (" + c + "), got " + l);
                            return {
                                fold: (...t) => {
                                    if (t.length !== e.length)
                                        throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                                    return t[r].apply(null, o)
                                },
                                match: e => {
                                    const l = w(e);
                                    if (t.length !== l.length)
                                        throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + l.join(","));
                                    if (!q(t, (e => D(l, e))))
                                        throw new Error("Not all branches were specified when using match. Specified: " + l.join(", ") + "\nRequired: " + t.join(", "));
                                    return e[s].apply(null, o)
                                },
                                log: e => {
                                    console.log(e, {
                                        constructors: t,
                                        constructor: s,
                                        params: o
                                    })
                                }
                            }
                        }
                }))
            })([{
                none: []
            }, {
                only: ["index"]
            }, {
                left: ["index", "next"]
            }, {
                middle: ["prev", "index", "next"]
            }, {
                right: ["prev", "index"]
            }]),
            (e, t) => {
                const o = Qe(e);
                return Mo(o, t).bind((e => {
                    const t = e[e.length - 1],
                        l = e[0].row,
                        n = t.row + t.rowspan,
                        r = o.all.slice(l, n);
                    return _o(r)
                })).getOr("")
            }
        ),
        Eo = e => {
            return _e(e, "rgb") ? io(t = e).map(no).map((e => "#" + e.value)).getOr(t) : e;
            var t
        },
        Fo = e => {
            const t = V.fromDom(e);
            return {
                borderwidth: Ee(t, "border-width").getOr(""),
                borderstyle: Ee(t, "border-style").getOr(""),
                bordercolor: Ee(t, "border-color").map(Eo).getOr(""),
                backgroundcolor: Ee(t, "background-color").map(Eo).getOr("")
            }
        },
        qo = e => {
            const t = e[0],
                o = e.slice(1);
            return P(o, (e => {
                    P(w(t), (o => {
                        C(e, ((e, l) => {
                            const n = t[o];
                            "" !== n && o === l && n !== e && (t[o] = "")
                        }))
                    }))
                })),
                t
        },
        Lo = (e, t, o, l) => E(e, (e => !a(o.formatter.matchNode(l, t + e)))).getOr(""),
        Ho = b(Lo, ["left", "center", "right"], "align"),
        jo = b(Lo, ["top", "middle", "bottom"], "valign"),
        Vo = e => ze(V.fromDom(e)).map((t => {
            const o = {
                selection: Ut(e.cells)
            };
            return Bo(t, o)
        })).getOr(""),
        zo = (e, t) => {
            const o = Qe(e),
                l = (e => F(e.all, (e => e.cells)))(o),
                n = k(l, (e => I(t, (t => $(e.element, t)))));
            return N(n, (e => ({
                element: e.element.dom,
                column: Ze(o, e.column).map((e => e.element.dom))
            })))
        },
        Wo = (e, t, o, l) => {
            const n = l.getData();
            l.close(),
                e.undoManager.transact((() => {
                    ((e, t, o, l) => {
                        const n = v(l, ((e, t) => o[t] !== e));
                        T(n) > 0 && t.length >= 1 && ze(t[0]).each((o => {
                            const r = zo(o, t),
                                a = T(v(n, ((e, t) => "scope" !== t && "celltype" !== t))) > 0,
                                s = A(n, "celltype");
                            (a || A(n, "scope")) && ((e, t, o, l) => {
                                const n = 1 === t.length;
                                P(t, (t => {
                                    const r = t.element,
                                        a = n ? f : l,
                                        s = Ao(e, r);
                                    ((e, t, o, l) => {
                                        l("scope") && e.setAttrib("scope", o.scope),
                                            l("class") && e.setAttrib("class", o.class),
                                            l("height") && e.setStyle("height", fe(o.height)),
                                            l("width") && t.setStyle("width", fe(o.width))
                                    })(s, t.column.map((t => Ao(e, t))).getOr(s), o, a),
                                    gt(e) && ((e, t, o) => {
                                            o("backgroundcolor") && e.setFormat("tablecellbackgroundcolor", t.backgroundcolor),
                                                o("bordercolor") && e.setFormat("tablecellbordercolor", t.bordercolor),
                                                o("borderstyle") && e.setFormat("tablecellborderstyle", t.borderstyle),
                                                o("borderwidth") && e.setFormat("tablecellborderwidth", fe(t.borderwidth))
                                        })(s, o, a),
                                        l("halign") && ot(e, r, o.halign),
                                        l("valign") && ((e, t, o) => {
                                            et.each("top middle bottom".split(" "), (l => {
                                                    l !== o && e.formatter.remove("valign" + l, {}, t)
                                                })),
                                                o && e.formatter.apply("valign" + o, {}, t)
                                        })(e, r, o.valign)
                                }))
                            })(e, r, l, b(A, n)),
                            s && ((e, t) => {
                                    e.execCommand("mceTableCellType", !1, {
                                        type: t.celltype,
                                        no_events: !0
                                    })
                                })(e, l),
                                lt(e, o.dom, {
                                    structure: s,
                                    style: a
                                })
                        }))
                    })(e, t, o, n),
                    e.focus()
                }))
        },
        $o = e => {
            const t = Xt(e);
            if (0 === t.length)
                return;
            const o = ((e, t) => {
                    const o = ze(t[0]).map((o => N(zo(o, t), (t => ((e, t, o, l) => {
                        const n = e.dom,
                            r = (e, t) => n.getStyle(e, t) || n.getAttrib(e, t);
                        return {
                            width: r(l.getOr(t), "width"),
                            height: r(t, "height"),
                            scope: n.getAttrib(t, "scope"),
                            celltype: (a = t,
                                a.nodeName.toLowerCase()),
                            class: n.getAttrib(t, "class", ""),
                            halign: Ho(e, t),
                            valign: jo(e, t),
                            ...o ? Fo(t) : {}
                        };
                        var a
                    })(e, t.element, gt(e), t.column)))));
                    return qo(o.getOrDie())
                })(e, t),
                l = {
                    type: "tabpanel",
                    tabs: [{
                        title: "General",
                        name: "general",
                        items: To(e)
                    }, xo(e, "cell")]
                },
                n = {
                    type: "panel",
                    items: [{
                        type: "grid",
                        columns: 2,
                        items: To(e)
                    }]
                };
            e.windowManager.open({
                title: "Cell Properties",
                size: "normal",
                body: gt(e) ? l : n,
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
                initialData: o,
                onSubmit: b(Wo, e, t, o)
            })
        },
        Uo = [{
            type: "listbox",
            name: "type",
            label: "Row type",
            items: [{
                text: "Header",
                value: "header"
            }, {
                text: "Body",
                value: "body"
            }, {
                text: "Footer",
                value: "footer"
            }]
        }, {
            type: "listbox",
            name: "align",
            label: "Alignment",
            items: [{
                text: "None",
                value: ""
            }, {
                text: "Left",
                value: "left"
            }, {
                text: "Center",
                value: "center"
            }, {
                text: "Right",
                value: "right"
            }]
        }, {
            label: "Height",
            name: "height",
            type: "input"
        }],
        Go = e => Uo.concat((e => {
            const t = bo(vt(e));
            return t.length > 0 ? y.some({
                name: "class",
                type: "listbox",
                label: "Class",
                items: t
            }) : y.none()
        })(e).toArray()),
        Ko = (e, t, o, l) => {
            const n = l.getData();
            l.close(),
                e.undoManager.transact((() => {
                    ((e, t, o, l) => {
                        const n = v(l, ((e, t) => o[t] !== e));
                        if (T(n) > 0) {
                            const o = A(n, "type"),
                                r = !o || T(n) > 1;
                            r && ((e, t, o, l) => {
                                    const n = 1 === t.length ? f : l;
                                    P(t, (t => {
                                        const r = Ao(e, t);
                                        ((e, t, o) => {
                                            o("class") && e.setAttrib("class", t.class),
                                                o("height") && e.setStyle("height", fe(t.height))
                                        })(r, o, n),
                                        ht(e) && ((e, t, o) => {
                                                o("backgroundcolor") && e.setStyle("background-color", t.backgroundcolor),
                                                    o("bordercolor") && e.setStyle("border-color", t.bordercolor),
                                                    o("borderstyle") && e.setStyle("border-style", t.borderstyle)
                                            })(r, o, n),
                                            l("align") && ot(e, t, o.align)
                                    }))
                                })(e, t, l, b(A, n)),
                                o && ((e, t) => {
                                    e.execCommand("mceTableRowType", !1, {
                                        type: t.type,
                                        no_events: !0
                                    })
                                })(e, l),
                                ze(V.fromDom(t[0])).each((t => lt(e, t.dom, {
                                    structure: o,
                                    style: r
                                })))
                        }
                    })(e, t, o, n),
                    e.focus()
                }))
        },
        Jo = e => {
            const t = Yt(ye(e), Gt.selected);
            if (0 === t.length)
                return;
            const o = N(t, (t => ((e, t, o) => {
                    const l = e.dom;
                    return {
                        height: l.getStyle(t, "height") || l.getAttrib(t, "height"),
                        class: l.getAttrib(t, "class", ""),
                        type: Vo(t),
                        align: Ho(e, t),
                        ...o ? Fo(t) : {}
                    }
                })(e, t.dom, ht(e)))),
                l = qo(o),
                n = {
                    type: "tabpanel",
                    tabs: [{
                        title: "General",
                        name: "general",
                        items: Go(e)
                    }, xo(e, "row")]
                },
                r = {
                    type: "panel",
                    items: [{
                        type: "grid",
                        columns: 2,
                        items: Go(e)
                    }]
                };
            e.windowManager.open({
                title: "Row Properties",
                size: "normal",
                body: ht(e) ? n : r,
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
                initialData: l,
                onSubmit: b(Ko, e, N(t, (e => e.dom)), l)
            })
        },
        Qo = (e, t, o) => {
            const l = o ? [{
                    type: "input",
                    name: "cols",
                    label: "Cols",
                    inputMode: "numeric"
                }, {
                    type: "input",
                    name: "rows",
                    label: "Rows",
                    inputMode: "numeric"
                }] : [],
                n = yt(e) ? [{
                    type: "input",
                    name: "cellspacing",
                    label: "Cell spacing",
                    inputMode: "numeric"
                }, {
                    type: "input",
                    name: "cellpadding",
                    label: "Cell padding",
                    inputMode: "numeric"
                }, {
                    type: "input",
                    name: "border",
                    label: "Border width"
                }, {
                    type: "label",
                    label: "Caption",
                    items: [{
                        type: "checkbox",
                        name: "caption",
                        label: "Show caption"
                    }]
                }] : [],
                r = t.length > 0 ? [{
                    type: "listbox",
                    name: "class",
                    label: "Class",
                    items: t
                }] : [];
            return l.concat([{
                type: "input",
                name: "width",
                label: "Width"
            }, {
                type: "input",
                name: "height",
                label: "Height"
            }]).concat(n).concat([{
                type: "listbox",
                name: "align",
                label: "Alignment",
                items: [{
                    text: "None",
                    value: ""
                }, {
                    text: "Left",
                    value: "left"
                }, {
                    text: "Center",
                    value: "center"
                }, {
                    text: "Right",
                    value: "right"
                }]
            }]).concat(r)
        },
        Xo = (e, t, o, n) => {
            if ("TD" === t.tagName || "TH" === t.tagName)
                l(o) && s(n) ? e.setStyle(t, o, n) : e.setStyles(t, o);
            else if (t.children)
                for (let l = 0; l < t.children.length; l++)
                    Xo(e, t.children[l], o, n)
        },
        Yo = (e, t, o, l) => {
            const n = e.dom,
                r = l.getData(),
                s = v(r, ((e, t) => o[t] !== e));
            l.close(),
                "" === r.class && delete r.class,
                e.undoManager.transact((() => {
                    if (!t) {
                        const o = Ne(r.cols).getOr(1),
                            l = Ne(r.rows).getOr(1);
                        e.execCommand("mceInsertTable", !1, {
                                rows: l,
                                columns: o
                            }),
                            t = Qt(ye(e), he(e)).bind((t => ze(t, he(e)))).map((e => e.dom)).getOrDie()
                    }
                    if (T(s) > 0) {
                        ((e, t, o) => {
                            const l = e.dom,
                                n = {},
                                r = {};
                            if (a(o.class) || (n.class = o.class),
                                r.height = fe(o.height),
                                St(e) ? r.width = fe(o.width) : l.getAttrib(t, "width") && (n.width = (e => e ? e.replace(/px$/, "") : "")(o.width)),
                                St(e) ? (r["border-width"] = fe(o.border),
                                    r["border-spacing"] = fe(o.cellspacing)) : (n.border = o.border,
                                    n.cellpadding = o.cellpadding,
                                    n.cellspacing = o.cellspacing),
                                St(e) && t.children)
                                for (let n = 0; n < t.children.length; n++)
                                    Xo(l, t.children[n], {
                                        "border-width": fe(o.border),
                                        padding: fe(o.cellpadding)
                                    }),
                                    ft(e) && Xo(l, t.children[n], {
                                        "border-color": o.bordercolor
                                    });
                            if (ft(e)) {
                                const e = o;
                                r["background-color"] = e.backgroundcolor,
                                    r["border-color"] = e.bordercolor,
                                    r["border-style"] = e.borderstyle
                            }
                            n.style = l.serializeStyle({
                                    ...Dt(e),
                                    ...r
                                }),
                                l.setAttribs(t, {
                                    ...It(e),
                                    ...n
                                })
                        })(e, t, r);
                        const o = n.select("caption", t)[0];
                        (o && !r.caption || !o && r.caption) && e.execCommand("mceTableToggleCaption"),
                            ot(e, t, r.align)
                    }
                    if (e.focus(),
                        e.addVisual(),
                        T(s) > 0) {
                        const o = A(s, "caption"),
                            l = !o || T(s) > 1;
                        lt(e, t, {
                            structure: o,
                            style: l
                        })
                    }
                }))
        },
        Zo = (e, t) => {
            const o = e.dom;
            let l, n = ((e, t) => {
                const o = Dt(e),
                    l = It(e),
                    n = t ? {
                        borderstyle: x(o, "border-style").getOr(""),
                        bordercolor: Eo(x(o, "border-color").getOr("")),
                        backgroundcolor: Eo(x(o, "background-color").getOr(""))
                    } : {};
                return {
                    height: "",
                    width: "100%",
                    cellspacing: "",
                    cellpadding: "",
                    caption: !1,
                    class: "",
                    align: "",
                    border: "",
                    ...o,
                    ...l,
                    ...n,
                    ...(() => {
                        const t = o["border-width"];
                        return St(e) && t ? {
                            border: t
                        } : x(l, "border").fold((() => ({})), (e => ({
                            border: e
                        })))
                    })(),
                    ...{
                        ...x(o, "border-spacing").or(x(l, "cellspacing")).fold((() => ({})), (e => ({
                            cellspacing: e
                        }))),
                        ...x(o, "border-padding").or(x(l, "cellpadding")).fold((() => ({})), (e => ({
                            cellpadding: e
                        })))
                    }
                }
            })(e, ft(e));
            t ? (n.cols = "1",
                n.rows = "1",
                ft(e) && (n.borderstyle = "",
                    n.bordercolor = "",
                    n.backgroundcolor = "")) : (l = o.getParent(e.selection.getStart(), "table", e.getBody()),
                l ? n = ((e, t, o) => {
                    const l = e.dom,
                        n = St(e) ? l.getStyle(t, "border-spacing") || l.getAttrib(t, "cellspacing") : l.getAttrib(t, "cellspacing") || l.getStyle(t, "border-spacing"),
                        r = St(e) ? tt(l, t, "padding") || l.getAttrib(t, "cellpadding") : l.getAttrib(t, "cellpadding") || tt(l, t, "padding");
                    return {
                        width: l.getStyle(t, "width") || l.getAttrib(t, "width"),
                        height: l.getStyle(t, "height") || l.getAttrib(t, "height"),
                        cellspacing: null != n ? n : "",
                        cellpadding: null != r ? r : "",
                        border: ((t, o) => {
                            const l = Ee(V.fromDom(o), "border-width");
                            return St(e) && l.isSome() ? l.getOr("") : t.getAttrib(o, "border") || tt(e.dom, o, "border-width") || tt(e.dom, o, "border") || ""
                        })(l, t),
                        caption: !!l.select("caption", t)[0],
                        class: l.getAttrib(t, "class", ""),
                        align: Ho(e, t),
                        ...o ? Fo(t) : {}
                    }
                })(e, l, ft(e)) : ft(e) && (n.borderstyle = "",
                    n.bordercolor = "",
                    n.backgroundcolor = ""));
            const r = bo(Tt(e));
            r.length > 0 && n.class && (n.class = n.class.replace(/\s*mce\-item\-table\s*/g, ""));
            const a = {
                    type: "grid",
                    columns: 2,
                    items: Qo(e, r, t)
                },
                s = ft(e) ? {
                    type: "tabpanel",
                    tabs: [{
                        title: "General",
                        name: "general",
                        items: [a]
                    }, xo(e, "table")]
                } : {
                    type: "panel",
                    items: [a]
                };
            e.windowManager.open({
                title: "Table Properties",
                size: "normal",
                body: s,
                onSubmit: b(Yo, e, l, n),
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
                initialData: n
            })
        },
        el = e => {
            C({
                mceTableProps: b(Zo, e, !1),
                mceTableRowProps: b(Jo, e),
                mceTableCellProps: b($o, e),
                mceInsertTableDialog: b(Zo, e, !0)
            }, ((t, o) => e.addCommand(o, (() => {
                return o = t,
                    void((e => {
                        return (t = e,
                            o = ee("table"),
                            ce(((e, t) => t(e)), ie, t, o, void 0)).forall(be);
                        var t, o
                    })(ye(e)) && o());
                var o
            }))))
        },
        tl = u,
        ol = e => {
            const t = (e, t) => xe(e, t).exists((e => parseInt(e, 10) > 1));
            return e.length > 0 && q(e, (e => t(e, "rowspan") || t(e, "colspan"))) ? y.some(e) : y.none()
        },
        ll = (e, t, o) => {
            return t.length <= 1 ? y.none() : (l = e,
                n = o.firstSelectedSelector,
                r = o.lastSelectedSelector,
                $t(l, n, r).bind((e => {
                    const t = e => $(l, e),
                        o = "thead,tfoot,tbody,table",
                        n = me(e.first, o, t),
                        r = me(e.last, o, t);
                    return n.bind((t => r.bind((o => $(t, o) ? ((e, t, o) => {
                        const l = Pt(e);
                        return Nt(l, t, o)
                    })(e.table, e.first, e.last) : y.none()))))
                }))).map((e => ({
                bounds: e,
                cells: t
            })));
            var l, n, r
        },
        nl = e => {
            const t = mo(y.none()),
                o = mo([]);
            let l = y.none();
            const n = ee("caption"),
                r = e => l.forall((t => !t[e])),
                a = () => Jt(ye(e), he(e)).bind((t => {
                    return o = Oe(ze(t), Jt((e => V.fromDom(e.selection.getEnd()))(e), he(e)).bind(ze), ((o, l) => $(o, l) ? n(t) ? y.some((e => ({
                            element: e,
                            mergable: y.none(),
                            unmergable: y.none(),
                            selection: [e]
                        }))(t)) : y.some(((e, t, o) => ({
                            element: o,
                            mergable: ll(t, e, Gt),
                            unmergable: ol(e),
                            selection: tl(e)
                        }))(Xt(e), o, t)) : y.none())),
                        o.bind(u);
                    var o
                })),
                s = e => ze(e.element).map((t => {
                    const o = Qe(t),
                        l = Mo(o, e).getOr([]),
                        n = B(l, ((e, t) => (t.isLocked && (e.onAny = !0,
                                0 === t.column ? e.onFirst = !0 : t.column + t.colspan >= o.grid.columns && (e.onLast = !0)),
                            e)), {
                            onAny: !1,
                            onFirst: !1,
                            onLast: !1
                        });
                    return {
                        mergeable: Po(o, e).isSome(),
                        unmergeable: ko(o, e).isSome(),
                        locked: n
                    }
                })),
                c = () => {
                    t.set((e => {
                            let t, o = !1;
                            return (...l) => (o || (o = !0,
                                    t = e.apply(null, l)),
                                t)
                        })(a)()),
                        l = t.get().bind(s),
                        P(o.get(), g)
                },
                i = e => (e(),
                    o.set(o.get().concat([e])),
                    () => {
                        o.set(k(o.get(), (t => t !== e)))
                    }
                ),
                m = (e, o) => i((() => t.get().fold((() => {
                    e.setEnabled(!1)
                }), (t => {
                    e.setEnabled(!o(t))
                })))),
                d = (e, o, l) => i((() => t.get().fold((() => {
                    e.setEnabled(!1),
                        e.setActive(!1)
                }), (t => {
                    e.setEnabled(!o(t)),
                        e.setActive(l(t))
                })))),
                p = e => l.exists((t => t.locked[e])),
                b = (t, o) => l => d(l, (e => n(e.element)), (() => e.queryCommandValue(t) === o)),
                f = b("mceTableRowType", "header"),
                w = b("mceTableColType", "th");
            return e.on("NodeChange ExecCommand TableSelectorChange", c), {
                onSetupTable: e => m(e, (e => !1)),
                onSetupCellOrRow: e => m(e, (e => n(e.element))),
                onSetupColumn: e => t => m(t, (t => n(t.element) || p(e))),
                onSetupPasteable: e => t => m(t, (t => n(t.element) || e().isNone())),
                onSetupPasteableColumn: (e, t) => o => m(o, (o => n(o.element) || e().isNone() || p(t))),
                onSetupMergeable: e => m(e, (e => r("mergeable"))),
                onSetupUnmergeable: e => m(e, (e => r("unmergeable"))),
                resetTargets: c,
                onSetupTableWithCaption: t => d(t, h, (t => ze(t.element, he(e)).exists((e => de(e, "caption").isSome())))),
                onSetupTableRowHeaders: f,
                onSetupTableColumnHeaders: w,
                targets: t.get
            }
        };
    var rl = tinymce.util.Tools.resolve("tinymce.FakeClipboard");
    const al = e => {
            var t;
            const o = null !== (t = rl.read()) && void 0 !== t ? t : [];
            return H(o, (t => y.from(t.getType(e))))
        },
        sl = () => al("x-tinymce/dom-table-rows"),
        cl = () => al("x-tinymce/dom-table-columns");
    e.add("table", (e => {
        const t = nl(e);
        (e => {
            const t = e.options.register;
            t("table_border_widths", {
                    processor: "object[]",
                    default: st
                }),
                t("table_border_styles", {
                    processor: "object[]",
                    default: ct
                }),
                t("table_cell_advtab", {
                    processor: "boolean",
                    default: !0
                }),
                t("table_row_advtab", {
                    processor: "boolean",
                    default: !0
                }),
                t("table_advtab", {
                    processor: "boolean",
                    default: !0
                }),
                t("table_appearance_options", {
                    processor: "boolean",
                    default: !0
                }),
                t("table_grid", {
                    processor: "boolean",
                    default: !at.deviceType.isTouch()
                }),
                t("table_cell_class_list", {
                    processor: "object[]",
                    default: []
                }),
                t("table_row_class_list", {
                    processor: "object[]",
                    default: []
                }),
                t("table_class_list", {
                    processor: "object[]",
                    default: []
                }),
                t("table_toolbar", {
                    processor: "string",
                    default: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
                }),
                t("table_background_color_map", {
                    processor: "object[]",
                    default: []
                }),
                t("table_border_color_map", {
                    processor: "object[]",
                    default: []
                })
        })(e),
        el(e),
            ((e, t) => {
                const o = t => () => e.execCommand(t),
                    l = (t, l) => !!e.queryCommandSupported(l.command) && (e.ui.registry.addMenuItem(t, {
                            ...l,
                            onAction: c(l.onAction) ? l.onAction : o(l.command)
                        }),
                        !0),
                    n = (t, l) => {
                        e.queryCommandSupported(l.command) && e.ui.registry.addToggleMenuItem(t, {
                            ...l,
                            onAction: c(l.onAction) ? l.onAction : o(l.command)
                        })
                    },
                    r = t => {
                        e.execCommand("mceInsertTable", !1, {
                            rows: t.numRows,
                            columns: t.numColumns
                        })
                    },
                    a = [l("tableinsertrowbefore", {
                        text: "Insert row before",
                        icon: "table-insert-row-above",
                        command: "mceTableInsertRowBefore",
                        onSetup: t.onSetupCellOrRow
                    }), l("tableinsertrowafter", {
                        text: "Insert row after",
                        icon: "table-insert-row-after",
                        command: "mceTableInsertRowAfter",
                        onSetup: t.onSetupCellOrRow
                    }), l("tabledeleterow", {
                        text: "Delete row",
                        icon: "table-delete-row",
                        command: "mceTableDeleteRow",
                        onSetup: t.onSetupCellOrRow
                    }), l("tablerowprops", {
                        text: "Row properties",
                        icon: "table-row-properties",
                        command: "mceTableRowProps",
                        onSetup: t.onSetupCellOrRow
                    }), l("tablecutrow", {
                        text: "Cut row",
                        icon: "cut-row",
                        command: "mceTableCutRow",
                        onSetup: t.onSetupCellOrRow
                    }), l("tablecopyrow", {
                        text: "Copy row",
                        icon: "duplicate-row",
                        command: "mceTableCopyRow",
                        onSetup: t.onSetupCellOrRow
                    }), l("tablepasterowbefore", {
                        text: "Paste row before",
                        icon: "paste-row-before",
                        command: "mceTablePasteRowBefore",
                        onSetup: t.onSetupPasteable(sl)
                    }), l("tablepasterowafter", {
                        text: "Paste row after",
                        icon: "paste-row-after",
                        command: "mceTablePasteRowAfter",
                        onSetup: t.onSetupPasteable(sl)
                    })],
                    s = [l("tableinsertcolumnbefore", {
                        text: "Insert column before",
                        icon: "table-insert-column-before",
                        command: "mceTableInsertColBefore",
                        onSetup: t.onSetupColumn("onFirst")
                    }), l("tableinsertcolumnafter", {
                        text: "Insert column after",
                        icon: "table-insert-column-after",
                        command: "mceTableInsertColAfter",
                        onSetup: t.onSetupColumn("onLast")
                    }), l("tabledeletecolumn", {
                        text: "Delete column",
                        icon: "table-delete-column",
                        command: "mceTableDeleteCol",
                        onSetup: t.onSetupColumn("onAny")
                    }), l("tablecutcolumn", {
                        text: "Cut column",
                        icon: "cut-column",
                        command: "mceTableCutCol",
                        onSetup: t.onSetupColumn("onAny")
                    }), l("tablecopycolumn", {
                        text: "Copy column",
                        icon: "duplicate-column",
                        command: "mceTableCopyCol",
                        onSetup: t.onSetupColumn("onAny")
                    }), l("tablepastecolumnbefore", {
                        text: "Paste column before",
                        icon: "paste-column-before",
                        command: "mceTablePasteColBefore",
                        onSetup: t.onSetupPasteableColumn(cl, "onFirst")
                    }), l("tablepastecolumnafter", {
                        text: "Paste column after",
                        icon: "paste-column-after",
                        command: "mceTablePasteColAfter",
                        onSetup: t.onSetupPasteableColumn(cl, "onLast")
                    })],
                    i = [l("tablecellprops", {
                        text: "Cell properties",
                        icon: "table-cell-properties",
                        command: "mceTableCellProps",
                        onSetup: t.onSetupCellOrRow
                    }), l("tablemergecells", {
                        text: "Merge cells",
                        icon: "table-merge-cells",
                        command: "mceTableMergeCells",
                        onSetup: t.onSetupMergeable
                    }), l("tablesplitcells", {
                        text: "Split cell",
                        icon: "table-split-cells",
                        command: "mceTableSplitCells",
                        onSetup: t.onSetupUnmergeable
                    })];
                wt(e) ? e.ui.registry.addNestedMenuItem("inserttable", {
                        text: "Table",
                        icon: "table",
                        getSubmenuItems: () => [{
                            type: "fancymenuitem",
                            fancytype: "inserttable",
                            onAction: r
                        }]
                    }) : e.ui.registry.addMenuItem("inserttable", {
                        text: "Table",
                        icon: "table",
                        onAction: o("mceInsertTableDialog")
                    }),
                    e.ui.registry.addMenuItem("inserttabledialog", {
                        text: "Insert table",
                        icon: "table",
                        onAction: o("mceInsertTableDialog")
                    }),
                    l("tableprops", {
                        text: "Table properties",
                        onSetup: t.onSetupTable,
                        command: "mceTableProps"
                    }),
                    l("deletetable", {
                        text: "Delete table",
                        icon: "table-delete-table",
                        onSetup: t.onSetupTable,
                        command: "mceTableDelete"
                    }),
                    D(a, !0) && e.ui.registry.addNestedMenuItem("row", {
                        type: "nestedmenuitem",
                        text: "Row",
                        getSubmenuItems: d("tableinsertrowbefore tableinsertrowafter tabledeleterow tablerowprops | tablecutrow tablecopyrow tablepasterowbefore tablepasterowafter")
                    }),
                    D(s, !0) && e.ui.registry.addNestedMenuItem("column", {
                        type: "nestedmenuitem",
                        text: "Column",
                        getSubmenuItems: d("tableinsertcolumnbefore tableinsertcolumnafter tabledeletecolumn | tablecutcolumn tablecopycolumn tablepastecolumnbefore tablepastecolumnafter")
                    }),
                    D(i, !0) && e.ui.registry.addNestedMenuItem("cell", {
                        type: "nestedmenuitem",
                        text: "Cell",
                        getSubmenuItems: d("tablecellprops tablemergecells tablesplitcells")
                    }),
                    e.ui.registry.addContextMenu("table", {
                        update: () => (t.resetTargets(),
                            t.targets().fold(d(""), (e => "caption" === G(e.element) ? "tableprops deletetable" : "cell row column | advtablesort | tableprops deletetable")))
                    });
                const m = fo(Tt(e));
                0 !== m.length && e.queryCommandSupported("mceTableToggleClass") && e.ui.registry.addNestedMenuItem("tableclass", {
                    icon: "table-classes",
                    text: "Table styles",
                    getSubmenuItems: () => go(e, m, "tableclass", (t => e.execCommand("mceTableToggleClass", !1, t))),
                    onSetup: t.onSetupTable
                });
                const u = fo(Ct(e));
                0 !== u.length && e.queryCommandSupported("mceTableCellToggleClass") && e.ui.registry.addNestedMenuItem("tablecellclass", {
                        icon: "table-cell-classes",
                        text: "Cell styles",
                        getSubmenuItems: () => go(e, u, "tablecellclass", (t => e.execCommand("mceTableCellToggleClass", !1, t))),
                        onSetup: t.onSetupCellOrRow
                    }),
                    e.queryCommandSupported("mceTableApplyCellStyle") && (e.ui.registry.addNestedMenuItem("tablecellvalign", {
                            icon: "vertical-align",
                            text: "Vertical align",
                            getSubmenuItems: () => go(e, Zt, "tablecellverticalalign", ho(e, "vertical-align")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addNestedMenuItem("tablecellborderwidth", {
                            icon: "border-width",
                            text: "Border width",
                            getSubmenuItems: () => go(e, pt(e), "tablecellborderwidth", ho(e, "border-width")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addNestedMenuItem("tablecellborderstyle", {
                            icon: "border-style",
                            text: "Border style",
                            getSubmenuItems: () => go(e, bt(e), "tablecellborderstyle", ho(e, "border-style")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addNestedMenuItem("tablecellbackgroundcolor", {
                            icon: "cell-background-color",
                            text: "Background color",
                            getSubmenuItems: () => wo(e, At(e), "background-color"),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addNestedMenuItem("tablecellbordercolor", {
                            icon: "cell-border-color",
                            text: "Border color",
                            getSubmenuItems: () => wo(e, Rt(e), "border-color"),
                            onSetup: t.onSetupCellOrRow
                        })),
                    n("tablecaption", {
                        icon: "table-caption",
                        text: "Table caption",
                        command: "mceTableToggleCaption",
                        onSetup: t.onSetupTableWithCaption
                    }),
                    n("tablerowheader", {
                        text: "Row header",
                        icon: "table-top-header",
                        command: "mceTableRowType",
                        onAction: So(e),
                        onSetup: t.onSetupTableRowHeaders
                    }),
                    n("tablecolheader", {
                        text: "Column header",
                        icon: "table-left-header",
                        command: "mceTableColType",
                        onAction: Co(e),
                        onSetup: t.onSetupTableRowHeaders
                    })
            })(e, t),
            ((e, t) => {
                e.ui.registry.addMenuButton("table", {
                    tooltip: "Table",
                    icon: "table",
                    fetch: e => e("inserttable | cell row column | advtablesort | tableprops deletetable")
                });
                const o = t => () => e.execCommand(t),
                    l = (t, l) => {
                        e.queryCommandSupported(l.command) && e.ui.registry.addButton(t, {
                            ...l,
                            onAction: c(l.onAction) ? l.onAction : o(l.command)
                        })
                    },
                    n = (t, l) => {
                        e.queryCommandSupported(l.command) && e.ui.registry.addToggleButton(t, {
                            ...l,
                            onAction: c(l.onAction) ? l.onAction : o(l.command)
                        })
                    };
                l("tableprops", {
                        tooltip: "Table properties",
                        command: "mceTableProps",
                        icon: "table",
                        onSetup: t.onSetupTable
                    }),
                    l("tabledelete", {
                        tooltip: "Delete table",
                        command: "mceTableDelete",
                        icon: "table-delete-table",
                        onSetup: t.onSetupTable
                    }),
                    l("tablecellprops", {
                        tooltip: "Cell properties",
                        command: "mceTableCellProps",
                        icon: "table-cell-properties",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tablemergecells", {
                        tooltip: "Merge cells",
                        command: "mceTableMergeCells",
                        icon: "table-merge-cells",
                        onSetup: t.onSetupMergeable
                    }),
                    l("tablesplitcells", {
                        tooltip: "Split cell",
                        command: "mceTableSplitCells",
                        icon: "table-split-cells",
                        onSetup: t.onSetupUnmergeable
                    }),
                    l("tableinsertrowbefore", {
                        tooltip: "Insert row before",
                        command: "mceTableInsertRowBefore",
                        icon: "table-insert-row-above",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tableinsertrowafter", {
                        tooltip: "Insert row after",
                        command: "mceTableInsertRowAfter",
                        icon: "table-insert-row-after",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tabledeleterow", {
                        tooltip: "Delete row",
                        command: "mceTableDeleteRow",
                        icon: "table-delete-row",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tablerowprops", {
                        tooltip: "Row properties",
                        command: "mceTableRowProps",
                        icon: "table-row-properties",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tableinsertcolbefore", {
                        tooltip: "Insert column before",
                        command: "mceTableInsertColBefore",
                        icon: "table-insert-column-before",
                        onSetup: t.onSetupColumn("onFirst")
                    }),
                    l("tableinsertcolafter", {
                        tooltip: "Insert column after",
                        command: "mceTableInsertColAfter",
                        icon: "table-insert-column-after",
                        onSetup: t.onSetupColumn("onLast")
                    }),
                    l("tabledeletecol", {
                        tooltip: "Delete column",
                        command: "mceTableDeleteCol",
                        icon: "table-delete-column",
                        onSetup: t.onSetupColumn("onAny")
                    }),
                    l("tablecutrow", {
                        tooltip: "Cut row",
                        command: "mceTableCutRow",
                        icon: "cut-row",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tablecopyrow", {
                        tooltip: "Copy row",
                        command: "mceTableCopyRow",
                        icon: "duplicate-row",
                        onSetup: t.onSetupCellOrRow
                    }),
                    l("tablepasterowbefore", {
                        tooltip: "Paste row before",
                        command: "mceTablePasteRowBefore",
                        icon: "paste-row-before",
                        onSetup: t.onSetupPasteable(sl)
                    }),
                    l("tablepasterowafter", {
                        tooltip: "Paste row after",
                        command: "mceTablePasteRowAfter",
                        icon: "paste-row-after",
                        onSetup: t.onSetupPasteable(sl)
                    }),
                    l("tablecutcol", {
                        tooltip: "Cut column",
                        command: "mceTableCutCol",
                        icon: "cut-column",
                        onSetup: t.onSetupColumn("onAny")
                    }),
                    l("tablecopycol", {
                        tooltip: "Copy column",
                        command: "mceTableCopyCol",
                        icon: "duplicate-column",
                        onSetup: t.onSetupColumn("onAny")
                    }),
                    l("tablepastecolbefore", {
                        tooltip: "Paste column before",
                        command: "mceTablePasteColBefore",
                        icon: "paste-column-before",
                        onSetup: t.onSetupPasteableColumn(cl, "onFirst")
                    }),
                    l("tablepastecolafter", {
                        tooltip: "Paste column after",
                        command: "mceTablePasteColAfter",
                        icon: "paste-column-after",
                        onSetup: t.onSetupPasteableColumn(cl, "onLast")
                    }),
                    l("tableinsertdialog", {
                        tooltip: "Insert table",
                        command: "mceInsertTableDialog",
                        icon: "table"
                    });
                const r = fo(Tt(e));
                0 !== r.length && e.queryCommandSupported("mceTableToggleClass") && e.ui.registry.addMenuButton("tableclass", {
                    icon: "table-classes",
                    tooltip: "Table styles",
                    fetch: yo(e, r, "tableclass", (t => e.execCommand("mceTableToggleClass", !1, t))),
                    onSetup: t.onSetupTable
                });
                const a = fo(Ct(e));
                0 !== a.length && e.queryCommandSupported("mceTableCellToggleClass") && e.ui.registry.addMenuButton("tablecellclass", {
                        icon: "table-cell-classes",
                        tooltip: "Cell styles",
                        fetch: yo(e, a, "tablecellclass", (t => e.execCommand("mceTableCellToggleClass", !1, t))),
                        onSetup: t.onSetupCellOrRow
                    }),
                    e.queryCommandSupported("mceTableApplyCellStyle") && (e.ui.registry.addMenuButton("tablecellvalign", {
                            icon: "vertical-align",
                            tooltip: "Vertical align",
                            fetch: yo(e, Zt, "tablecellverticalalign", ho(e, "vertical-align")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addMenuButton("tablecellborderwidth", {
                            icon: "border-width",
                            tooltip: "Border width",
                            fetch: yo(e, pt(e), "tablecellborderwidth", ho(e, "border-width")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addMenuButton("tablecellborderstyle", {
                            icon: "border-style",
                            tooltip: "Border style",
                            fetch: yo(e, bt(e), "tablecellborderstyle", ho(e, "border-style")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addMenuButton("tablecellbackgroundcolor", {
                            icon: "cell-background-color",
                            tooltip: "Background color",
                            fetch: t => t(wo(e, At(e), "background-color")),
                            onSetup: t.onSetupCellOrRow
                        }),
                        e.ui.registry.addMenuButton("tablecellbordercolor", {
                            icon: "cell-border-color",
                            tooltip: "Border color",
                            fetch: t => t(wo(e, Rt(e), "border-color")),
                            onSetup: t.onSetupCellOrRow
                        })),
                    n("tablecaption", {
                        tooltip: "Table caption",
                        icon: "table-caption",
                        command: "mceTableToggleCaption",
                        onSetup: t.onSetupTableWithCaption
                    }),
                    n("tablerowheader", {
                        tooltip: "Row header",
                        icon: "table-top-header",
                        command: "mceTableRowType",
                        onAction: So(e),
                        onSetup: t.onSetupTableRowHeaders
                    }),
                    n("tablecolheader", {
                        tooltip: "Column header",
                        icon: "table-left-header",
                        command: "mceTableColType",
                        onAction: Co(e),
                        onSetup: t.onSetupTableColumnHeaders
                    })
            })(e, t),
            (e => {
                const t = xt(e);
                t.length > 0 && e.ui.registry.addContextToolbar("table", {
                    predicate: t => e.dom.is(t, "table") && e.getBody().contains(t),
                    items: t,
                    scope: "node",
                    position: "node"
                })
            })(e)
    }))
}();
