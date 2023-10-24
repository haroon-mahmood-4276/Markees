/*!
 * TinyMCE
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 6.4.1
 */
!function() {
    "use strict";
    var t = tinymce.util.Tools.resolve("tinymce.PluginManager");
    const e = (t,e,s)=>{
        const r = "UL" === e ? "InsertUnorderedList" : "InsertOrderedList";
        t.execCommand(r, !1, !1 === s ? null : {
            "list-style-type": s
        })
    }
      , s = t=>e=>e.options.get(t)
      , r = s("advlist_number_styles")
      , n = s("advlist_bullet_styles")
      , l = t=>null == t
      , i = t=>!l(t);
    var o = tinymce.util.Tools.resolve("tinymce.util.Tools");
    class a {
        constructor(t, e) {
            this.tag = t,
            this.value = e
        }
        static some(t) {
            return new a(!0,t)
        }
        static none() {
            return a.singletonNone
        }
        fold(t, e) {
            return this.tag ? e(this.value) : t()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(t) {
            return this.tag ? a.some(t(this.value)) : a.none()
        }
        bind(t) {
            return this.tag ? t(this.value) : a.none()
        }
        exists(t) {
            return this.tag && t(this.value)
        }
        forall(t) {
            return !this.tag || t(this.value)
        }
        filter(t) {
            return !this.tag || t(this.value) ? this : a.none()
        }
        getOr(t) {
            return this.tag ? this.value : t
        }
        or(t) {
            return this.tag ? this : t
        }
        getOrThunk(t) {
            return this.tag ? this.value : t()
        }
        orThunk(t) {
            return this.tag ? this : t()
        }
        getOrDie(t) {
            if (this.tag)
                return this.value;
            throw new Error(null != t ? t : "Called getOrDie on None")
        }
        static from(t) {
            return i(t) ? a.some(t) : a.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(t) {
            this.tag && t(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    a.singletonNone = new a(!1);
    const u = t=>e=>i(e) && t.test(e.nodeName)
      , d = u(/^(OL|UL|DL)$/)
      , g = u(/^(TH|TD)$/)
      , h = t=>l(t) || "default" === t ? "" : t
      , c = (t,e)=>s=>{
        const r = r=>{
            s.setActive(((t,e,s)=>((t,e,s)=>{
                for (let e = 0, n = t.length; e < n; e++) {
                    const n = t[e];
                    if (d(r = n) && !/\btox\-/.test(r.className))
                        return a.some(n);
                    if (s(n, e))
                        break
                }
                var r;
                return a.none()
            }
            )(e, 0, g).exists((e=>e.nodeName === s && ((t,e)=>t.dom.isChildOf(e, t.getBody()))(t, e))))(t, r.parents, e)),
            s.setEnabled(!((t,e)=>{
                const s = t.dom.getParent(e, "ol,ul,dl");
                return ((t,e)=>null !== e && !t.dom.isEditable(e))(t, s)
            }
            )(t, r.element))
        }
        ;
        return t.on("NodeChange", r),
        ()=>t.off("NodeChange", r)
    }
      , m = (t,s,r,n,l,i)=>{
        i.length > 1 ? ((t,s,r,n,l,i)=>{
            t.ui.registry.addSplitButton(s, {
                tooltip: r,
                icon: "OL" === l ? "ordered-list" : "unordered-list",
                presets: "listpreview",
                columns: 3,
                fetch: t=>{
                    t(o.map(i, (t=>{
                        const e = "OL" === l ? "num" : "bull"
                          , s = "disc" === t || "decimal" === t ? "default" : t
                          , r = h(t)
                          , n = (t=>t.replace(/\-/g, " ").replace(/\b\w/g, (t=>t.toUpperCase())))(t);
                        return {
                            type: "choiceitem",
                            value: r,
                            icon: "list-" + e + "-" + s,
                            text: n
                        }
                    }
                    )))
                }
                ,
                onAction: ()=>t.execCommand(n),
                onItemAction: (s,r)=>{
                    e(t, l, r)
                }
                ,
                select: e=>{
                    const s = (t=>{
                        const e = t.dom.getParent(t.selection.getNode(), "ol,ul")
                          , s = t.dom.getStyle(e, "listStyleType");
                        return a.from(s)
                    }
                    )(t);
                    return s.map((t=>e === t)).getOr(!1)
                }
                ,
                onSetup: c(t, l)
            })
        }
        )(t, s, r, n, l, i) : ((t,s,r,n,l,i)=>{
            t.ui.registry.addToggleButton(s, {
                active: !1,
                tooltip: r,
                icon: "OL" === l ? "ordered-list" : "unordered-list",
                onSetup: c(t, l),
                onAction: ()=>t.queryCommandState(n) || "" === i ? t.execCommand(n) : e(t, l, i)
            })
        }
        )(t, s, r, n, l, h(i[0]))
    }
    ;
    t.add("advlist", (t=>{
        t.hasPlugin("lists") ? ((t=>{
            const e = t.options.register;
            e("advlist_number_styles", {
                processor: "string[]",
                default: "default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman".split(",")
            }),
            e("advlist_bullet_styles", {
                processor: "string[]",
                default: "default,circle,square".split(",")
            })
        }
        )(t),
        (t=>{
            m(t, "numlist", "Numbered list", "InsertOrderedList", "OL", r(t)),
            m(t, "bullist", "Bullet list", "InsertUnorderedList", "UL", n(t))
        }
        )(t),
        (t=>{
            t.addCommand("ApplyUnorderedListStyle", ((s,r)=>{
                e(t, "UL", r["list-style-type"])
            }
            )),
            t.addCommand("ApplyOrderedListStyle", ((s,r)=>{
                e(t, "OL", r["list-style-type"])
            }
            ))
        }
        )(t)) : console.error("Please use the Lists plugin together with the Advanced List plugin.")
    }
    ))
}();
